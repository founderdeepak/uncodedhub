/**
 * Uncoded Hub Supabase Lead Alerts Webhook Apps Script
 * 
 * Instructions:
 * 1. Open Google Apps Script (https://script.google.com)
 * 2. Create a new project (separate from the booking scheduler) and paste this code into "Code.gs".
 * 3. Click "Deploy" > "New deployment".
 * 4. Select type: "Web app".
 * 5. Set "Execute as" to: "Me (your-google-account)".
 * 6. Set "Who has access" to: "Anyone".
 * 7. Click "Deploy", authorize permissions, and copy the Web App URL.
 * 8. In the Supabase Dashboard, go to "Database" > "Webhooks" and create an insert webhook targeting this Web App URL for:
 *    - `chatbot_leads`
 *    - `contact_submissions`
 *    - `leads_backup`
 */

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    if (payload.type !== "INSERT") return ContentService.createTextOutput("Ignored");

    var record = payload.record;
    var table = payload.table;
    
    // ----------------------------------------------------
    // 1. PERFECTLY CLASSIFY THE LEAD SOURCE
    // ----------------------------------------------------
    var emailTitle = "🔥 New Lead Alert";
    var sourceLabel = "Unknown Form";
    var extraDataBody = "";

    if (table === "chatbot_leads") {
      emailTitle = "🤖 AI Chatbot Lead";
      sourceLabel = "Floating WhatsApp Bot";
      
      extraDataBody = `
        <tr><td style="padding: 10px 0; font-weight: 600; color: #00f0ff;" colspan="2">Chat Bot Automation Answers:</td></tr>
        <tr><td style="padding: 6px 15px; color: #00f0ff; font-weight: 600;" colspan="2">Q1 (Goal): <span style="color: #ffffff !important; font-weight: 400;">${record.q1_answer || 'N/A'}</span></td></tr>
        <tr><td style="padding: 6px 15px; color: #00f0ff; font-weight: 600;" colspan="2">Q2 (Timeline): <span style="color: #ffffff !important; font-weight: 400;">${record.q2_answer || 'N/A'}</span></td></tr>
        <tr><td style="padding: 6px 15px; color: #00f0ff; font-weight: 600; border-bottom: 1px solid #ffffff1a;" colspan="2">Q3 (Budget): <span style="color: #ffffff !important; font-weight: 400;">${record.q3_answer || 'N/A'}</span></td></tr>
      `;
    } else if (table === "contact_submissions") {
      // Bookings write to this same table via submitLead() so a copy is
      // kept in the lead history, but booking-google-script.js already
      // sends a proper, immediate "New Discovery Call Booked" email the
      // moment someone books — this webhook firing too would be a second,
      // differently-formatted email about the exact same booking.
      var isBooking = record.project_details &&
        record.project_details.toLowerCase().indexOf('discovery call with') !== -1;
      if (isBooking) {
        return ContentService.createTextOutput("Ignored — booking notified separately");
      }
      emailTitle = "📧 Contact Form Entry";
      sourceLabel = "Contact Us Page";
    } else if (table === "leads_backup") {
      // Detect if this is from the Header 'Start Project' Modal
      if (record.project_details && record.project_details.indexOf("Start Project") !== -1) {
        emailTitle = "🚀 Quick 'Start Project' Lead";
        sourceLabel = "Global Header Modal";
      } else {
        // If it's just a backup copy from the Contact form, ignore it so you don't get 2 emails!
        return ContentService.createTextOutput("Ignored Backup Duplicate"); 
      }
    }

    // ----------------------------------------------------
    // 2. BUILD THE HIGH-END HTML EMAIL
    // ----------------------------------------------------
    var htmlBody = `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #222; border-radius: 12px; overflow: hidden; background-color: #0b0e23;">
        <div style="background: linear-gradient(to right, #00f0ff, #b026ff); padding: 4px;"></div>
        <div style="padding: 30px; text-align: center; border-bottom: 1px solid #ffffff1a;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">` + emailTitle + `</h2>
          <span style="background: #ffffff1a; color: #00f0ff; padding: 4px 10px; border-radius: 12px; font-size: 12px; margin-top: 10px; display: inline-block;">Captured via: ` + sourceLabel + `</span>
        </div>
        <div style="padding: 30px; color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr style="border-bottom: 1px solid #ffffff1a;">
              <td style="padding: 12px 0; font-weight: 600; width: 30%; color: #00f0ff;">Name:</td>
              <td style="padding: 12px 0; color: #ffffff !important; font-weight: 500;">${record.name || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ffffff1a;">
              <td style="padding: 12px 0; font-weight: 600; color: #00f0ff;">Email:</td>
              <td style="padding: 12px 0;"><a href="mailto:${record.email}" style="color: #ffffff !important; text-decoration: underline; font-weight: 500;">${record.email || 'N/A'}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #ffffff1a;">
              <td style="padding: 12px 0; font-weight: 600; color: #00f0ff;">Phone:</td>
              <td style="padding: 12px 0; color: #ffffff !important; font-weight: 500;">${record.phone || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ffffff1a;">
              <td style="padding: 12px 0; font-weight: 600; color: #00f0ff;">Business:</td>
              <td style="padding: 12px 0; color: #ffffff !important; font-weight: 500;">${record.business_type || record.department || 'N/A'}</td>
            </tr>
            
            ${extraDataBody}

            <tr>
              <td style="padding: 15px 0 5px 0; font-weight: 600; color: #00f0ff;" colspan="2">Raw Message/Details:</td>
            </tr>
            <tr>
              <td style="padding: 15px; background: #ffffff0a; border-radius: 8px; line-height: 1.5; border: 1px solid #ffffff1a; color: #ffffff !important; font-style: italic; font-weight: 500;" colspan="2">
                 "${record.project_details || record.initial_message || 'User provided no additional details.'}"
              </td>
            </tr>
          </table>
          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${record.email}" style="background: #00f0ff; color: #0b0e23; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to Lead</a>
          </div>
        </div>
      </div>
    `;

    // ----------------------------------------------------
    // 3. SEND EMAIL
    // ----------------------------------------------------
    MailApp.sendEmail({
      to: "theuncodedhub@gmail.com", // <-- Configured to send to theuncodedhub@gmail.com
      subject: emailTitle + " - " + (record.name || 'Unknown User'),
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput("Success");
  } catch (error) {
    return ContentService.createTextOutput(error.toString());
  }
}
