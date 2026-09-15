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
