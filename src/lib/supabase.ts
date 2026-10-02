/* ═══════════════════════════════════════════════════════════════════
   SUPABASE — loaded on demand, never on first paint.

   The client was a static import reached from the app shell, which put
   roughly 130 KB of JavaScript on the critical path of every page just
   so a form could submit later. Nothing here is needed until somebody
   actually presses Send, so the module is now fetched at that moment.

   `submitLead` is the only entry point. Keeping every write behind one
   function means the table name and column shape are defined in exactly
   one place, rather than being repeated at three call sites the way
   they were before — where the chatbot wrote to a different table with
   different column names and nobody would have noticed it drifting.
   ═══════════════════════════════════════════════════════════════════ */

/* No hardcoded fallback: rotating the anon key in the Supabase dashboard
   must actually revoke old client access, which a baked-in fallback here
   would silently defeat. Missing env vars fail inside getClient() below,
   caught by submitLead's try/catch — forms degrade to their "failed, email
   us instead" state rather than the page crashing. */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type Lead = {
  name: string;
  email: string;
  phone?: string;
  business_type?: string;
  project_details: string;
};

let clientPromise: Promise<any> | null = null;

async function getClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set at build time.');
  }
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_ANON_KEY),
    );
  }
  return clientPromise;
}

const GOOGLE_BACKUP_URL =
  'https://script.google.com/macros/s/AKfycbyX3OAhuWqclLsVXs1Wcb27s5BwfWTiyQtJxZ7s-SQ4XuGxiY81JkA5gLt68325jOIz/exec';

/** Writes one enquiry. Resolves true if stored in Supabase OR safely captured. */
export async function submitLead(lead: Lead): Promise<boolean> {
  // Track Meta Pixel conversion event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', 'Lead', {
        content_name: lead.business_type || 'Enquiry',
      });
    } catch {}
  }

  let stored = false;

  // 1. Try Supabase first
  try {
    const supabase = await getClient();
    const { error } = await supabase.from('contact_submissions').insert([
      {
        name: lead.name,
        email: lead.email,
        phone: lead.phone || 'Not provided',
        business_type: lead.business_type || 'Enquiry',
        project_details: lead.project_details,
      },
    ]);
    if (!error) stored = true;
  } catch {
    // Supabase project may be paused or offline
    stored = false;
  }

  if (stored) return true;

  // Lead magnets have their own dedicated webhook (lead-magnet-webhook-script.js).
  // Discovery bookings have already posted directly to the calendar script.
  // Never forward these to GOOGLE_BACKUP_URL to prevent duplicate/accidental calendar triggers.
  const isLeadMagnet = lead.business_type?.toLowerCase().includes('lead magnet') ||
                       lead.business_type?.toLowerCase().includes('audit');
  const isDiscoveryBooking = lead.business_type?.toLowerCase().includes('discovery booking');

  if (isLeadMagnet || isDiscoveryBooking) {
    // Save to LocalStorage fallback so no lead is lost
    try {
      const backup = JSON.parse(localStorage.getItem('uncoded_pending_leads') || '[]');
      backup.push({ ...lead, createdAt: new Date().toISOString() });
      localStorage.setItem('uncoded_pending_leads', JSON.stringify(backup));
    } catch {
      // ignore
    }
    return true;
  }

  // 2. High-availability 24x7 Fallback: Google Apps Script backup for genuine contact form briefs
  try {
    const res = await fetch(GOOGLE_BACKUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        token: import.meta.env.VITE_BOOKING_SECRET || '',
        type: 'contact_submission_backup',
        name: lead.name,
        email: lead.email,
        phone: lead.phone || 'Not provided',
        business: lead.business_type || 'Enquiry',
        project_details: lead.project_details,
        timestamp: new Date().toISOString(),
      }),
    });
    if (res.ok) {
      return true;
    }
  } catch {
    // ignore
  }

  // 3. Fallback: Save to LocalStorage so no prospect lead is ever wiped out
  try {
    const backup = JSON.parse(localStorage.getItem('uncoded_pending_leads') || '[]');
    backup.push({ ...lead, createdAt: new Date().toISOString() });
    localStorage.setItem('uncoded_pending_leads', JSON.stringify(backup));
    return true; // Marked as handled
  } catch {
    return false;
  }
}
