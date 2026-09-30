/**
 * Uncoded Hub — Lead Magnet Delivery Apps Script (Pre-Sold Prospects Audit)
 *
 * WHAT THIS IS FOR
 * The "Grab Your FREE Pre-Sold Prospects Audit" form on the site
 * (src/components/ui/LeadMagnetForm.tsx) is a native form that POSTs
 * directly here from the browser — no Kit/ConvertKit involved anywhere in
 * this flow. This script's only job is to validate the request and fire a
 * Resend event (`lead_magnet.audit_signup`); the actual audit email —
 * along with the rest of the 6-email nurture sequence — is sent by the
 * Resend Automation already configured in the Resend dashboard
 * (Automations → Pre-Sold Prospects Audit). This script does not build or
 * send any email content itself.
 *
 * WHY THIS SCRIPT EXISTS AT ALL
 * Resend's API key is a full-access secret (unlike Kit's public form
 * endpoint, Resend has no browser-safe public endpoint) — if it sat in the
 * site's JS bundle, anyone could read it out of the bundle and send email
 * or read contacts through your Resend account. This script is the small
 * server that holds that key so the browser never sees it.
 *
 * WHY THIS SCRIPT SETS THE CONTACT'S NAME ITSELF
 * The automation's "Send email" step uses {{FIRST_NAME}}, which is a
 * reserved template variable read from the Resend Contact record, not
 * from the event payload — so this script upserts the contact's
 * first_name via Resend's plain Contacts API (upsertContact() below)
 * before firing the event, rather than relying on a "contact_update" step
 * inside the automation. That step type exists in Resend's automation
 * builder but its variable-binding config (documented as
 * `{"var": "event.first_name"}`) did not reliably resolve when tested —
 * it either wrote the literal string instead of substituting it, or
 * failed to find the contact at all (`contact_id: "none"`) depending on
 * the exact config shape tried. The plain Contacts API has none of that
 * ambiguity: it is a direct, synchronous field write.
 *
 * SETUP (one-time, in script.google.com — nothing in this repo can deploy
 * this directly; see booking-google-script.js's header for why)
 * 1. https://script.google.com → New project → paste this file in as
 *    "Code.gs" (replacing the default content). If a deployment from an
 *    earlier version of this script already exists, edit that same
 *    project instead so the Web App URL doesn't change.
 * 2. Project Settings (gear icon) → Script Properties → add two properties:
 *      RESEND_API_KEY        = the secret value for the Resend API key
 *                               named "Lead Magnet Webhook (Apps Script)"
 *                               in the Resend dashboard (Resend only shows
 *                               a key's value once, at creation — if it was
 *                               never copied down, delete that key in
 *                               Resend and create a fresh one, then use
 *                               that value here instead).
 *      WEBHOOK_SHARED_SECRET  = any random string you make up (e.g. a
 *                               password generator's output). This is
 *                               sent as `token` in the POST body from the
 *                               browser (see LEAD_MAGNET_SECRET in
 *                               LeadMagnetForm.tsx). It is bundled into the
 *                               frontend build, so it does not stop someone
 *                               who reads the JS bundle, but it does stop
 *                               generic scanners/bots hitting this URL
 *                               blind — the real abuse defense is
 *                               withinAuditLimits() below.
 * 3. Deploy → New deployment (or, if editing an existing deployment,
 *    Manage deployments → edit → New version) → type "Web app" →
 *    Execute as "Me", Who has access "Anyone" → Deploy. Authorize the
 *    permissions prompt (this script only calls an external URL).
 * 4. Copy the deployment's Web App URL into LEAD_MAGNET_SCRIPT_URL in
 *    src/components/ui/LeadMagnetForm.tsx, and put the same
 *    WEBHOOK_SHARED_SECRET value into VITE_LEAD_MAGNET_SECRET (see
 *    .env.example) for every environment that builds the frontend.
 *
 * CORS
 * The browser POSTs with `Content-Type: text/plain;charset=utf-8` (see
 * LeadMagnetForm.tsx) specifically so this stays a CORS "simple request"
 * and never triggers a preflight OPTIONS call, which Apps Script Web Apps
 * don't handle. ContentService responses already carry
 * `Access-Control-Allow-Origin: *` on their own (confirmed via
 * booking-google-script.js's live testing), so no extra CORS handling is
 * needed here.
 */

var RESEND_EVENT_NAME = 'lead_magnet.audit_signup';

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Strips line breaks so a submitted name can't inject extra lines into a
 *  single-line context. */
function singleLine(value) {
  return String(value == null ? '' : value).replace(/[\r\n]+/g, ' ').trim();
}

function resendRequest(apiKey, method, path, body) {
  return UrlFetchApp.fetch('https://api.resend.com' + path, {
    method: method,
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + apiKey },
    payload: body ? JSON.stringify(body) : undefined,
    muteHttpExceptions: true
  });
}

/** Sets the contact's first_name via Resend's plain Contacts API — POST to
 *  create, falling back to PATCH if the contact already exists (email must
 *  be unique, so POST 409s for a returning subscriber). This is what makes
 *  {{FIRST_NAME}} resolve correctly in the automation's emails; skipped
 *  entirely (not an error) when no first name was submitted, so it never
 *  overwrites an existing name with blank. */
function upsertContact(apiKey, email, firstName) {
  if (!firstName) return;

  var payload = { email: email, first_name: firstName, firstName: firstName };
  var createResponse = resendRequest(apiKey, 'post', '/contacts', payload);
  var createCode = createResponse.getResponseCode();
  if (createCode >= 200 && createCode < 300) return;

  var updatePayload = { first_name: firstName, firstName: firstName };
  var updateResponse = resendRequest(apiKey, 'patch', '/contacts/' + encodeURIComponent(email), updatePayload);
  var updateCode = updateResponse.getResponseCode();
  if (updateCode < 200 || updateCode >= 300) {
    Logger.log('Resend contact update notice: create ' + createCode + ': ' + createResponse.getContentText() +
      ' | update ' + updateCode + ': ' + updateResponse.getContentText());
  }
}

/** Sends the complete Pre-Sold Prospects Audit checklist directly to the recipient */
function sendAuditDirectEmail(apiKey, email, firstName) {
  var nameGreeting = firstName ? firstName : 'there';
  var subject = "Your Pre-Sold Prospects Audit (+ 10-Point Conversion Checklist)";

  var htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #17161A; line-height: 1.6; padding: 24px; background: #FFFFFF; border: 1px solid #E6E2D8; border-radius: 16px;">
      <div style="border-bottom: 2px solid #C21E56; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #C21E56;">UNCODED HUB · DIAGNOSTIC SUITE</span>
        <h1 style="font-size: 24px; font-weight: 600; color: #17161A; margin: 8px 0 4px 0;">The Pre-Sold Prospects Audit</h1>
        <p style="font-size: 14px; color: #6B6860; margin: 0;">A 10-point diagnostic to find out how many good prospects your website is silently losing.</p>
      </div>

      <p style="font-size: 15px;">Hey ${escapeHtml(nameGreeting)},</p>
      <p style="font-size: 15px;">Here is the 10-Point Pre-Sold Prospects Audit you requested — the same trust diagnostic we run for every paying client before writing or designing a single line of their website.</p>

      <div style="background: #F3F0EA; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #17161A;">Interactive Web Version Available</h3>
        <p style="font-size: 13.5px; color: #45433E; margin: 0 0 16px 0;">You can score your website interactively in your browser with our instant live scorecard calculator:</p>
        <a href="https://uncodedhub.com/audit-checklist" style="display: inline-block; background: #C21E56; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 9999px;">Open Interactive Scorecard & PDF →</a>
      </div>

      <h2 style="font-size: 18px; border-bottom: 1px solid #E6E2D8; padding-bottom: 8px; margin-top: 32px; color: #17161A;">The 10-Point Trust Diagnostic (Score: 0, 1, or 2)</h2>
      <p style="font-size: 13px; color: #6B6860;">Score each point 0 (Missing), 1 (Attempted but weak), or 2 (Nailed).</p>

      <div style="margin: 20px 0;">
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>1. The 5-Second Test:</strong> Does your headline name your exact ideal client and their specific problem within 5 seconds?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>2. Proof Before Promise:</strong> Do you show checkable proof (guarantees, metrics, real work) or just claims?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>3. Objection Pre-Empt:</strong> Does your site answer the 2–3 silent objections (price, delivery, credibility) unprompted?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>4. The Single Path:</strong> Is there ONE obvious next step on every page, or competing friction buttons?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>5. Zero-Friction Contact:</strong> Can a mobile user reach you in 1 tap (WhatsApp or instant booking link)?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>6. The Patience Test:</strong> Does your site load in under 2.5s on mobile data, or does it lag?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>7. Findability:</strong> Is your Google Business Profile claimed, verified, and ranking locally?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>8. Risk Reversal:</strong> Is there a clear guarantee or transparent terms removing the prospect's risk?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>9. Outcome Over Feature:</strong> Does your copy focus on the customer's transformation rather than agency deliverables?
        </div>
        <div style="padding: 12px 0; border-bottom: 1px solid #F3F0EA;">
          <strong>10. The Stranger Test:</strong> Can someone outside your industry understand what you do in 20 seconds?
        </div>
      </div>

      <div style="background: #FAFAFA; border: 1px solid #E6E2D8; border-radius: 10px; padding: 18px; margin: 24px 0;">
        <h3 style="margin-top: 0; font-size: 16px;">What Your Score Means (Total out of 20):</h3>
        <p style="margin: 6px 0; font-size: 13.5px;"><strong>0–8: Silent Loss Zone.</strong> Good prospects are choosing competitors without ever telling you why.</p>
        <p style="margin: 6px 0; font-size: 13.5px;"><strong>9–14: Leaking, Not Broken.</strong> Specific gaps are costing you bookings at crucial conversion moments.</p>
        <p style="margin: 6px 0; font-size: 13.5px;"><strong>15–20: Near Your Ceiling.</strong> Your trust layer works well; focus on traffic volume and reach.</p>
      </div>

      <h2 style="font-size: 18px; border-bottom: 1px solid #E6E2D8; padding-bottom: 8px; margin-top: 32px; color: #17161A;">Your 20-Minute Action Checklist</h2>
      <ul style="font-size: 14px; padding-left: 20px; color: #333;">
        <li style="margin-bottom: 8px;">Rewrite your homepage headline to name your exact client and problem.</li>
        <li style="margin-bottom: 8px;">Add one piece of verifiable proof above the fold (guarantee, case metric).</li>
        <li style="margin-bottom: 8px;">Answer your top 2 silent buyer objections directly on your primary service page.</li>
        <li style="margin-bottom: 8px;">Pick ONE primary call to action and remove competing links.</li>
        <li style="margin-bottom: 8px;">Add 1-tap WhatsApp consultation access for mobile visitors.</li>
        <li style="margin-bottom: 8px;">Audit mobile Core Web Vitals speed (aim for LCP &lt; 2.0s).</li>
      </ul>

      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E6E2D8; font-size: 13.5px; color: #6B6860;">
        <p>Want us to audit your website live on a 20-minute call?<br />
        <a href="https://uncodedhub.com/contact" style="color: #C21E56; font-weight: 600;">Schedule a 20-min slot with Deepak or Geetha →</a></p>
        <p style="margin-top: 16px;">— <strong>Deepak &amp; Geetha</strong><br />Founders, Uncoded Hub<br />Bengaluru, India · <a href="https://uncodedhub.com" style="color: #6B6860;">uncodedhub.com</a></p>
      </div>
    </div>
  `;

  var emailSent = false;

  // 1. Try Resend direct /emails API
  if (apiKey) {
    try {
      var res = resendRequest(apiKey, 'post', '/emails', {
        from: 'Uncoded Hub <hello@uncodedhub.com>',
        to: [email],
        subject: subject,
        html: htmlBody,
        bcc: ['theuncodedhub@gmail.com']
      });
      var code = res.getResponseCode();
      if (code >= 200 && code < 300) {
        emailSent = true;
      } else {
        Logger.log('Resend /emails response: ' + code + ' ' + res.getContentText());
      }
    } catch (e) {
      Logger.log('Resend /emails failed: ' + e.toString());
    }
  }

  // 2. High-availability Fallback: Google Apps Script native MailApp
  if (!emailSent) {
    try {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: htmlBody,
        bcc: 'theuncodedhub@gmail.com',
        name: 'Uncoded Hub'
      });
      emailSent = true;
    } catch (e) {
      Logger.log('MailApp fallback failed: ' + e.toString());
    }
  }

  return emailSent;
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || '{}');

    var expectedToken = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SHARED_SECRET');
    if (expectedToken && data.token && data.token !== expectedToken) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var email = data.email;
    var firstName = singleLine(data.first_name || data.firstName || data.name || '');

    if (!isValidEmail(email)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'invalid or missing email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    email = email.trim();

    if (!withinAuditLimits(email)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'too many requests — please try again later' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var apiKey = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY') || '';

    // 1. Deliver the full audit checklist email directly to recipient
    sendAuditDirectEmail(apiKey, email, firstName);

    // 2. Upsert contact and dispatch event to Resend if API key is active
    if (apiKey) {
      try {
        upsertContact(apiKey, email, firstName);
        sendAuditEvent(apiKey, email, firstName);
      } catch (err) {
        Logger.log('Resend background sync notice: ' + err.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
