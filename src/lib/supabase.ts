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

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://ruiimbaycfkkejwumoak.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aWltYmF5Y2Zra2Vqd3Vtb2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMTU3MjksImV4cCI6MjA5MDU5MTcyOX0.2xc1ESzTWZsEHxkafcd092mIj50IQjKvxnkOVrs6EsA';

export type Lead = {
  name: string;
  email: string;
  phone?: string;
  business_type?: string;
  project_details: string;
};

let clientPromise: Promise<any> | null = null;

async function getClient() {
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_ANON_KEY),
    );
  }
  return clientPromise;
}

/** Writes one enquiry. Resolves true only if the row was actually stored. */
export async function submitLead(lead: Lead): Promise<boolean> {
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
    return !error;
  } catch {
    return false;
  }
}
