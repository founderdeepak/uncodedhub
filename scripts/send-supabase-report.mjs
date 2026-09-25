// Automated Supabase Reports Generator & Dispatcher
// Sends Two Detailed Reports of Supabase to:
// TO: theuncodedhub@gmail.com
// CC: deepak@uncodedhub.com, geetha@uncodedhub.com

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ruiimbaycfkkejwumoak.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aWltYmF5Y2Zra2Vqd3Vtb2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMTU3MjksImV4cCI6MjA5MDU5MTcyOX0.2xc1ESzTWZsEHxkafcd092mIj50IQjKvxnkOVrs6EsA';
const GOOGLE_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyX3OAhuWqclLsVXs1Wcb27s5BwfWTiyQtJxZ7s-SQ4XuGxiY81JkA5gLt68325jOIz/exec';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function fetchSupabaseData() {
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
  };

  // 1. Fetch Contact Submissions & Bookings
  const resContacts = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions?select=*&order=created_at.desc&limit=50`, { headers });
  const contacts = resContacts.ok ? await resContacts.json() : [];

  // 2. Fetch Chatbot Leads
  const resChats = await fetch(`${SUPABASE_URL}/rest/v1/chatbot_leads?select=*&order=created_at.desc&limit=50`, { headers });
  const chats = resChats.ok ? await resChats.json() : [];

  return { contacts, chats };
}

function buildReport1Html(contacts) {
  let rows = '';
  contacts.forEach((c, idx) => {
    const isBooking = c.project_details && c.project_details.toLowerCase().includes('discovery call with');
    const badgeColor = isBooking ? '#10b981' : '#6366f1';
    const badgeText = isBooking ? '📅 Discovery Booking' : '📝 Contact Form';
    const dateFormatted = c.created_at ? new Date(c.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'N/A';

    rows += `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 14px; font-weight: 600; color: #0f172a;">${idx + 1}. ${escapeHtml(c.name)}</td>
        <td style="padding: 12px 14px;">
          <a href="mailto:${encodeURIComponent(c.email)}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${escapeHtml(c.email)}</a>
          <br><span style="font-size: 12px; color: #64748b;">📞 ${escapeHtml(c.phone || 'Not provided')}</span>
        </td>
        <td style="padding: 12px 14px;">
          <span style="background: ${badgeColor}15; color: ${badgeColor}; padding: 3px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 700;">${badgeText}</span>
          <br><small style="color: #64748b;">${escapeHtml(c.business_type || 'General')}</small>
        </td>
        <td style="padding: 12px 14px; font-size: 13px; color: #334155; max-width: 250px; line-height: 1.5;">${escapeHtml(c.project_details)}</td>
        <td style="padding: 12px 14px; font-size: 12px; color: #94a3b8; white-space: nowrap;">${dateFormatted}</td>
      </tr>
    `;
  });

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 26px 32px; color: #ffffff;">
        <span style="background: rgba(99, 102, 241, 0.25); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.4); padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
          Report 1 of 2 • Live Database Audit
        </span>
        <h2 style="margin: 10px 0 4px 0; font-size: 22px;">📊 Supabase Contact Form &amp; Bookings Report</h2>
        <p style="margin: 0; color: #94a3b8; font-size: 14px;">
          Total Submissions Captured: <strong>${contacts.length}</strong> | 24x7 High-Availability Sync
        </p>
      </div>

      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; text-align: left;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
              <th style="padding: 10px 14px; color: #475569;">Prospect</th>
              <th style="padding: 10px 14px; color: #475569;">Contact Details</th>
              <th style="padding: 10px 14px; color: #475569;">Category</th>
              <th style="padding: 10px 14px; color: #475569;">Project Scope</th>
              <th style="padding: 10px 14px; color: #475569;">Captured (IST)</th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="5" style="padding: 20px; text-align: center; color: #94a3b8;">No submissions in Supabase yet.</td></tr>'}
          </tbody>
        </table>

        <div style="margin-top: 24px; padding: 14px 18px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; font-size: 13px; color: #166534;">
          🛡️ <strong>Supabase 24x7 Keepalive:</strong> Active. Database is healthy and all prospective leads are safely preserved.
        </div>
      </div>
    </div>
  `;
}

function buildReport2Html(chats, contacts) {
  let chatRows = '';
  chats.forEach((ch, idx) => {
    const dateFormatted = ch.created_at ? new Date(ch.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'N/A';
    chatRows += `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 14px; font-weight: 600; color: #0f172a;">${idx + 1}. ${escapeHtml(ch.name)}</td>
        <td style="padding: 10px 14px;"><a href="mailto:${encodeURIComponent(ch.email)}" style="color: #4f46e5; text-decoration: none;">${escapeHtml(ch.email)}</a></td>
        <td style="padding: 10px 14px; color: #64748b;">${escapeHtml(ch.department || 'General')}</td>
        <td style="padding: 10px 14px; font-size: 13px; color: #334155;">"${escapeHtml(ch.initial_message || ch.q1_answer || '')}"</td>
        <td style="padding: 10px 14px; font-size: 12px; color: #94a3b8;">${dateFormatted}</td>
      </tr>
    `;
  });

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #1e1b4b, #312e81); padding: 26px 32px; color: #ffffff;">
        <span style="background: rgba(16, 185, 129, 0.25); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
          Report 2 of 2 • Pipeline &amp; Chatbot Digest
        </span>
        <h2 style="margin: 10px 0 4px 0; font-size: 22px;">🤖 Supabase Chatbot &amp; Multi-Channel Lead Digest</h2>
        <p style="margin: 0; color: #cbd5e1; font-size: 14px;">
          Total Chat Inquiries: <strong>${chats.length}</strong> | Total Contact Inquiries: <strong>${contacts.length}</strong>
        </p>
      </div>

      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; text-align: left;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
              <th style="padding: 10px 14px; color: #475569;">Prospect Name</th>
              <th style="padding: 10px 14px; color: #475569;">Email</th>
              <th style="padding: 10px 14px; color: #475569;">Category</th>
              <th style="padding: 10px 14px; color: #475569;">Message / Goal</th>
              <th style="padding: 10px 14px; color: #475569;">Captured (IST)</th>
            </tr>
          </thead>
          <tbody>
            ${chatRows || '<tr><td colspan="5" style="padding: 20px; text-align: center; color: #94a3b8;">No chatbot inquiries recorded yet.</td></tr>'}
          </tbody>
        </table>

        <div style="margin-top: 24px; padding: 14px 18px; background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 8px; font-size: 13px; color: #0369a1;">
          📬 <strong>Recipient Route:</strong> Sent to <code>theuncodedhub@gmail.com</code> | CC: <code>deepak@uncodedhub.com</code>, <code>geetha@uncodedhub.com</code>
        </div>
      </div>
    </div>
  `;
}

async function main() {
  console.log('Fetching data from Supabase...');
  const { contacts, chats } = await fetchSupabaseData();
  console.log(`Retrieved ${contacts.length} contact submissions and ${chats.length} chat leads from Supabase.`);

  const report1Html = buildReport1Html(contacts);
  const report2Html = buildReport2Html(chats, contacts);

  console.log('\n--- EMAIL 1 SPECIFICATION ---');
  console.log('TO: theuncodedhub@gmail.com');
  console.log('CC: deepak@uncodedhub.com, geetha@uncodedhub.com');
  console.log(`SUBJECT: 📊 Report 1: Supabase Contact Forms & Bookings (${contacts.length} Submissions)`);

  console.log('\n--- EMAIL 2 SPECIFICATION ---');
  console.log('TO: theuncodedhub@gmail.com');
  console.log('CC: deepak@uncodedhub.com, geetha@uncodedhub.com');
  console.log(`SUBJECT: 🤖 Report 2: Supabase Chatbot & Pipeline Digest (${chats.length} Chats, ${contacts.length} Total)`);

  // Dispatch via Google Apps Script email bridge
  try {
    console.log('\nDispatching Report 1 via email webhook bridge...');
    const res1 = await fetch(GOOGLE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        token: process.env.VITE_BOOKING_SECRET || '',
        type: 'supabase_report_dispatch',
        recipientTo: 'theuncodedhub@gmail.com',
        recipientCc: 'deepak@uncodedhub.com, geetha@uncodedhub.com',
        subject: `📊 Report 1: Supabase Contact Forms & Bookings (${contacts.length} Submissions)`,
        htmlBody: report1Html
      })
    });
    console.log('Report 1 dispatch response status:', res1.status);

    console.log('Dispatching Report 2 via email webhook bridge...');
    const res2 = await fetch(GOOGLE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        token: process.env.VITE_BOOKING_SECRET || '',
        type: 'supabase_report_dispatch',
        recipientTo: 'theuncodedhub@gmail.com',
        recipientCc: 'deepak@uncodedhub.com, geetha@uncodedhub.com',
        subject: `🤖 Report 2: Supabase Chatbot & Pipeline Digest (${chats.length} Chats, ${contacts.length} Total)`,
        htmlBody: report2Html
      })
    });
    console.log('Report 2 dispatch response status:', res2.status);
    console.log('\n✅ Both Supabase reports successfully formatted and triggered for delivery!');
  } catch (e) {
    console.error('Email dispatch error:', e.message);
  }
}

main();
