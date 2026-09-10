/**
 * Uncoded Hub Discovery Call Booking Apps Script
 *
 * Instructions:
 * 1. Open Google Apps Script (https://script.google.com)
 * 2. Create a new project and paste this code into "Code.gs".
 * 3. In the left sidebar, click the "+" next to "Services", select "Calendar API", and click "Add".
 * 4. Click "Deploy" > "Manage deployments" (if this project already has a deployment the
 *    frontend points at) > edit the existing deployment > "New version" > Deploy.
 *    If this is the first deployment instead, use "Deploy" > "New deployment", type "Web app",
 *    "Execute as" = "Me", "Who has access" = "Anyone", then copy the Web App URL into
 *    GOOGLE_SCRIPT_URL in src/components/ui/BookingCalendar.tsx.
 * 5. First real request will need you to re-authorize permissions (this version reads
 *    Calendar events and creates a Sheet the first time it runs) — accept the prompt once.
 *
 * TWO REAL BUGS THIS VERSION FIXES (both confirmed via direct live testing)
 * 1. Every response in the previous version ended in
 *    `ContentService.createTextOutput(...).setMimeType(...).setHeaders(headers)` —
 *    but TextOutput has no `.setHeaders()` method; it never did. That line threw a
 *    TypeError on every single request, *after* the calendar event and emails had
 *    already gone out, so the frontend never received a valid response for a booking
 *    that had actually succeeded on the backend. Apps Script's own infrastructure
 *    already sends `Access-Control-Allow-Origin: *` on ContentService responses on
 *    its own, so the fix is simply to stop calling a method that doesn't exist.
 * 2. The client confirmation email was sent via `GmailApp.sendEmail()`, which (along
 *    with `GmailApp.getAliases()`, used to try sending from an admin@uncodedhub.com
 *    alias) needs a broad Gmail permission scope this script was never authorized
 *    for. It silently failed every time — the host team's alert email (sent via the
 *    less-privileged `MailApp`) always worked, masking the fact that the client never
 *    got their confirmation. Fixed by sending the client email via `MailApp` too, and
 *    dropping alias-based sending since it isn't worth the extra permission scope.
 *
 * WHAT CHANGED IN THIS VERSION
 * - doGet(e): given ?date=YYYY-MM-DD (an IST calendar day), returns the busy time ranges
 *   already on the calendar that day, so the frontend can grey out taken slots.
 * - doPost(e): re-checks the calendar for a conflict immediately before creating the event —
 *   this is the check that actually prevents a double-booking, since two people could both
 *   see a slot as free a second before one of them submits.
 * - Quiz answers (niche, current website status, timeline) are now included in the event
 *   description, the host notification email, and a row appended to a Google Sheet that this
 *   script creates for itself the first time it runs (its ID is stored in Script Properties,
 *   so nothing needs to be configured by hand).
 */

function doGet(e) {
  try {
    var dateStr = e.parameter.date; // "YYYY-MM-DD", an IST calendar day
    if (!dateStr) throw new Error("Missing 'date' query parameter");

    var parts = dateStr.split('-');
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10) - 1; // JS/Apps Script months are 0-indexed
    var d = parseInt(parts[2], 10);

    // Same IST->UTC math as the frontend (src/components/ui/BookingCalendar.tsx,
    // istToInstant): the day boundary has to be computed the same way on both
    // sides or a slot the frontend thinks is at 8:00 PM IST could get checked
    // against the wrong day's events here.
    var IST_OFFSET_MS = 330 * 60 * 1000;
    var dayStart = new Date(Date.UTC(y, m, d, 0, 0, 0) - IST_OFFSET_MS);
    var dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    var calendar = CalendarApp.getDefaultCalendar();
    var events = calendar.getEvents(dayStart, dayEnd);
    var busy = events.map(function (ev) {
      return { start: ev.getStartTime().toISOString(), end: ev.getEndTime().toISOString() };
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success", busy: busy }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // Fail soft: an empty busy list means the frontend just shows every
    // computed slot as before, rather than breaking the booking flow.
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString(), busy: [] })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // Parse incoming JSON body
    var data = JSON.parse(e.postData.contents);
    var name = data.name;
    var email = data.email;
    var business = data.business;
    var dateStr = data.date; // Format: YYYY-MM-DD
    var timeStr = data.time; // Format: HH:MM (24-hour style, e.g., "14:00")
    var host = data.host || "Deepak";

    // Quiz answers — all optional, all default to "Not specified" so an
    // older frontend build (or a request that skipped the quiz) never
    // breaks the booking itself.
    var niche = data.niche || "Not specified";
    var hasWebsite = data.hasWebsite || "Not specified";
    var timeline = data.timeline || "Not specified";

    // 1. Calculate Start and End Times
    var startTime;
    if (data.start_time) {
      startTime = new Date(data.start_time);
    } else {
      // Robust fallback for legacy format
      var time24 = timeStr || "08:00";
      if (time24.indexOf('AM') > -1 || time24.indexOf('PM') > -1) {
        var parts = time24.split(' ');
        var timeParts = parts[0].split(':');
        var hours = parseInt(timeParts[0]);
        var minutes = parseInt(timeParts[1]);
        var ampm = parts[1];
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        time24 = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
      }
      var dateTimeStr = dateStr + 'T' + time24 + ':00';
      startTime = new Date(dateTimeStr);
    }

    // Default meeting duration: 20 minutes
    var endTime = new Date(startTime.getTime() + 20 * 60 * 1000);

    var calendar = CalendarApp.getDefaultCalendar();

    // Re-check for a conflict right before creating the event. The
    // frontend already hides busy slots, but that is only a UX nicety —
    // this is the check that actually prevents a double-booking if two
    // people picked the same open slot within moments of each other.
    var conflicting = calendar.getEvents(startTime, endTime);
    if (conflicting.length > 0) {
      return ContentService.createTextOutput(JSON.stringify({ status: "conflict" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Format dates for host display (Deepak / Geetha) - always in IST
    var hostTimeZone = "Asia/Kolkata";
    var hostFormattedDate = Utilities.formatDate(startTime, hostTimeZone, "EEEE, MMMM d, yyyy");
    var hostFormattedTime = Utilities.formatDate(startTime, hostTimeZone, "h:mm a") + " (IST)";

    // Format dates for client display - in client's detected timezone
    var clientTimeZone = data.timezone || "Asia/Kolkata";
    var clientFormattedDate = Utilities.formatDate(startTime, clientTimeZone, "EEEE, MMMM d, yyyy");
    var clientTimeZoneLabel = clientTimeZone.split('/').pop().replace('_', ' ');
    var clientFormattedTime = Utilities.formatDate(startTime, clientTimeZone, "h:mm a") + " (" + clientTimeZoneLabel + ")";

    // 2. Create the Calendar Event and invite guests (Host, Client, and main inbox)
    var eventTitle = "Discovery Call with " + host + ": " + name + " (" + business + ")";

    // Determine host's email to add as a guest
    var hostEmailAddress = "";
    if (host.toLowerCase() === "deepak") {
      hostEmailAddress = "deepak@uncodedhub.com";
    } else if (host.toLowerCase() === "geetha") {
      hostEmailAddress = "geetha@uncodedhub.com";
    }

    // Combine guests: client email, specific host email, and main uncoded hub inbox
    var guestListArray = [email.trim(), "theuncodedhub@gmail.com"];
    if (hostEmailAddress) {
      guestListArray.push(hostEmailAddress);
    }
    var guestList = guestListArray.join(", ");

    var event = calendar.createEvent(eventTitle, startTime, endTime, {
      description: "Discovery Call scheduled via Uncoded Hub website.\n\n" +
                   "Host: " + host + " (" + (hostEmailAddress || "theuncodedhub@gmail.com") + ")\n" +
                   "Client Name: " + name + "\n" +
                   "Email: " + email + "\n" +
                   "Business/Brand: " + business + "\n" +
                   "Niche: " + niche + "\n" +
                   "Has a website already: " + hasWebsite + "\n" +
                   "Timeline: " + timeline + "\n" +
                   "Host Local Time (IST): " + hostFormattedDate + " at " + hostFormattedTime + "\n" +
                   "Client Local Time: " + clientFormattedDate + " at " + clientFormattedTime,
      guests: guestList,
      sendInvites: true // Automatically dispatch calendar invites to all guests
    });

    var meetLink = "";
    var eventId = event.getId().split('@')[0];

    // Try to attach Google Meet link using Calendar API (Advanced Service)
    try {
      var resource = {
        conferenceData: {
          createRequest: {
            requestId: Utilities.getUuid(),
            conferenceSolutionKey: {
              type: "hangoutsMeet"
            }
          }
        }
      };

      var patchedEvent = Calendar.Events.patch(resource, "primary", eventId, {
        conferenceDataVersion: 1
      });

      if (patchedEvent.conferenceData && patchedEvent.conferenceData.entryPoints) {
        meetLink = patchedEvent.conferenceData.entryPoints[0].uri;
      }
    } catch (err) {
      Logger.log("Google Meet generation failed (Make sure Calendar API is enabled under Services): " + err.message);
    }

    // 3. Email details to Uncoded Hub Team (deepak@uncodedhub.com, geetha@uncodedhub.com, mr.deepakr8@gmail.com)
    var hostEmail = "deepak@uncodedhub.com, geetha@uncodedhub.com, mr.deepakr8@gmail.com, theuncodedhub@gmail.com";
    var hostSubject = "📅 New Discovery Call Booked with " + host + ": " + name + " (" + business + ")";
    var hostHtml = `
      <div style="font-family: Arial, sans-serif; padding: 25px; color: #11142a; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <h2 style="color: #00e5ff; font-weight: bold; margin-top: 0; border-bottom: 2px solid #f0f4f8; padding-bottom: 15px;">New Booking Alert!</h2>
        <p style="font-size: 16px; line-height: 1.5;">A new 20-minute discovery call has been successfully scheduled.</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096; width: 170px;">Host Name:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;">${host}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096;">Client Name:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096;">Email Address:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;"><a href="mailto:${email}" style="color: #9e00e6; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096;">Business/Brand:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;">${business}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096;">Niche:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;">${niche}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096;">Has a website already:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;">${hasWebsite}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096;">Timeline:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;">${timeline}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096;">Host Local Time (IST):</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;">${hostFormattedDate} at ${hostFormattedTime}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f4f8;">
            <td style="padding: 10px 0; font-weight: bold; color: #718096;">Client Local Time:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a202c;">${clientFormattedDate} at ${clientFormattedTime}</td>
          </tr>
          ${meetLink ? `
          <tr>
            <td style="padding: 15px 0; font-weight: bold; color: #00e5ff;">Google Meet Link:</td>
            <td style="padding: 15px 0;"><a href="${meetLink}" style="background-color: #00e5ff; color: #11142a; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Join Google Meet</a></td>
          </tr>` : ''}
        </table>

        <p style="font-size: 12px; color: #a0aec0; margin-top: 30px; border-top: 1px solid #f0f4f8; padding-top: 15px;">Sent automatically from the Uncoded Hub website scheduler.</p>
      </div>
    `;

    MailApp.sendEmail({
      to: hostEmail,
      subject: hostSubject,
      htmlBody: hostHtml
    });

    // 4. Send Confirmation Email to Client (who booked) from admin@uncodedhub.com
    var clientSubject = "Confirmed: Discovery Call with " + host + " - Uncoded Hub";
    var clientHtml = `
      <div style="font-family: Arial, sans-serif; padding: 25px; color: #11142a; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <h2 style="color: #00e5ff; font-weight: bold; margin-top: 0; border-bottom: 2px solid #f0f4f8; padding-bottom: 15px;">Your Discovery Call is Confirmed!</h2>
        <p style="font-size: 16px; line-height: 1.5;">Hi ${name},</p>
        <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">Thank you for scheduling a discovery call with ${host} from Uncoded Hub. We are excited to learn more about your business goals and discuss how we can build a high-converting online presence for you.</p>

        <div style="background-color: #f7fafc; padding: 20px; border-radius: 12px; margin: 25px 0; border: 1px solid #edf2f7;">
          <h3 style="margin-top: 0; color: #11142a; font-size: 16px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;">Meeting Summary:</h3>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Host:</strong> ${host}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Date:</strong> ${clientFormattedDate}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Time:</strong> ${clientFormattedTime}</p>
          ${meetLink ? `<p style="margin: 15px 0 0 0; font-size: 15px;"><strong>Google Meet URL:</strong> <a href="${meetLink}" style="color: #00e5ff; font-weight: bold; text-decoration: underline;">Join Meeting Here</a></p>` : ''}
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">If you need to reschedule or have any questions beforehand, please reply directly to this email or send us a message on WhatsApp at <strong>+91 8660819023</strong>.</p>

        <p style="margin-top: 40px; border-top: 1px solid #f0f4f8; padding-top: 20px; font-size: 15px; line-height: 1.5; color: #2d3748;">
          Best regards,<br>
          <strong>The Uncoded Hub Team</strong><br>
          <a href="https://uncodedhub.com" style="color: #9e00e6; text-decoration: none; font-weight: bold;">uncodedhub.com</a>
        </p>
      </div>
    `;

    // Create iCalendar (.ics) file so client can add the meeting to their calendar
    var dateStamp = Utilities.formatDate(new Date(), "GMT", "yyyyMMdd'T'HHmmss'Z'");
    var startStamp = Utilities.formatDate(startTime, "GMT", "yyyyMMdd'T'HHmmss'Z'");
    var endStamp = Utilities.formatDate(endTime, "GMT", "yyyyMMdd'T'HHmmss'Z'");

    var icsDesc = "Discovery Call with " + host + " (Uncoded Hub)\n\n" +
                  "Host: " + host + "\n" +
                  "Client Name: " + name + "\n" +
                  "Business/Brand: " + business + "\n" +
                  "Google Meet: " + (meetLink || "Google Meet link in invite details");

    // Escape line breaks for iCalendar format
    var escapedDesc = icsDesc.replace(/\r?\n/g, "\\n");

    var icsContent = "BEGIN:VCALENDAR\n" +
                     "VERSION:2.0\n" +
                     "PRODID:-//Uncoded Hub//Booking System//EN\n" +
                     "METHOD:PUBLISH\n" +
                     "BEGIN:VEVENT\n" +
                     "UID:" + eventId + "@uncodedhub.com\n" +
                     "DTSTAMP:" + dateStamp + "\n" +
                     "DTSTART:" + startStamp + "\n" +
                     "DTEND:" + endStamp + "\n" +
                     "SUMMARY:Discovery Call: " + name + " - Uncoded Hub\n" +
                     "DESCRIPTION:" + escapedDesc + "\n" +
                     "LOCATION:" + (meetLink || "Google Meet") + "\n" +
                     "END:VEVENT\n" +
                     "END:VCALENDAR";

    var icsAttachment = Utilities.newBlob(icsContent, "text/calendar", "invite.ics");

    // Sent via MailApp, not GmailApp. Confirmed by direct testing:
    // GmailApp.sendEmail()/getAliases() need a broad Gmail permission
    // scope (full mail access) this script isn't authorized for, purely
    // to support sending "from" a verified alias — MailApp has no alias
    // support, but needs none of that scope, and is already proven
    // working (it's what sends the host team's notification above).
    // replyTo still routes replies to admin@uncodedhub.com even though
    // the visible "from" is whatever account the script runs under.
    // Isolated in its own try/catch, same pattern as the Meet-link block
    // above — this email failing must never take down the Sheet logging
    // or the response, since the booking itself already succeeded.
    try {
      MailApp.sendEmail({
        to: email.trim(),
        subject: clientSubject,
        htmlBody: clientHtml,
        attachments: [icsAttachment],
        bcc: "theuncodedhub@gmail.com",
        replyTo: "admin@uncodedhub.com",
        name: "Uncoded Hub"
      });
    } catch (err) {
      Logger.log("Client confirmation email failed: " + err.toString());
    }

    // 5. Log the booking to a Sheet this script owns. Never lets a
    // spreadsheet problem fail the booking itself — the calendar event
    // and the emails above are the part that actually matters.
    appendBookingRow([
      new Date(),
      host,
      name,
      email,
      business,
      niche,
      hasWebsite,
      timeline,
      hostFormattedDate,
      hostFormattedTime,
      clientTimeZone
    ]);

    // Return successful response payload to the frontend
    var responseData = {
      status: "success",
      meetLink: meetLink
    };

    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    var errorResponse = {
      status: "error",
      message: err.toString()
    };

    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Appends one row to a Sheet this script owns. The Sheet is created on
 * the very first booking and its ID is remembered in Script Properties —
 * nobody has to create or share a spreadsheet by hand for this to work.
 */
function appendBookingRow(row) {
  try {
    var props = PropertiesService.getScriptProperties();
    var sheetId = props.getProperty('BOOKINGS_SHEET_ID');
    var ss = null;

    if (sheetId) {
      try {
        ss = SpreadsheetApp.openById(sheetId);
      } catch (e) {
        ss = null; // stored ID is stale (sheet deleted) — recreate below
      }
    }

    if (!ss) {
      ss = SpreadsheetApp.create('Uncoded Hub — Discovery Call Bookings');
      props.setProperty('BOOKINGS_SHEET_ID', ss.getId());
      var sheet = ss.getSheets()[0];
      sheet.appendRow([
        'Booked at', 'Host', 'Client name', 'Email', 'Business',
        'Niche', 'Has website already', 'Timeline',
        'Date (IST)', 'Time (IST)', 'Client timezone'
      ]);
      sheet.setFrozenRows(1);
    }

    ss.getSheets()[0].appendRow(row);
  } catch (err) {
    Logger.log('Sheet logging failed (booking itself still succeeded): ' + err.message);
  }
}
