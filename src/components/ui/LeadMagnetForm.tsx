import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════
   LEAD MAGNET FORM — The Pre-Sold Prospects Audit

   Native form, no third-party form service. Kit/ConvertKit has been
   fully removed from this flow. Submitting POSTs directly from the
   browser to the Apps Script webhook (lead-magnet-webhook-script.js),
   which sends the audit checklist directly to the visitor's inbox and
   fires the Resend event. Visitors also get instant on-page access to
   the interactive audit scorecard.
   ═══════════════════════════════════════════════════════════════════ */

const LEAD_MAGNET_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxjs7uylG1UuDne9_rCCd8YfZKp9RRE5vIFK9_Ctq8MMWfur0100fBDwAaTZd2l3_iq/exec';

const LEAD_MAGNET_SECRET = import.meta.env.VITE_LEAD_MAGNET_SECRET || '';

interface LeadMagnetFormProps {
  /** When true the form renders without its own outer card border/padding —
   *  the parent Section already wraps it in a premium card. */
  embedded?: boolean;
}

export function LeadMagnetForm({ embedded }: LeadMagnetFormProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [trap, setTrap] = useState('');
  const startedAt = useRef(Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return;
    if (Date.now() - startedAt.current < 2000) return;
    setStatus('sending');

    const trimmedEmail = email.trim();
    const trimmedFirstName = firstName.trim();

    try {

      // Mirror lead to Supabase contact_submissions (safely guarded)
      import('../../lib/supabase')
        .then(({ submitLead }) =>
          submitLead({
            name: trimmedFirstName || 'Website Visitor',
            email: trimmedEmail,
            business_type: 'Lead Magnet: Pre-Sold Prospects Audit',
            project_details: 'Requested the Pre-Sold Prospects Audit free download from website.',
          }),
        )
        .catch(() => {});

      try {
        localStorage.setItem(
          'uh_audit_unlocked',
          JSON.stringify({
            email: trimmedEmail,
            name: trimmedFirstName,
            unlockedAt: Date.now(),
          }),
        );
      } catch {}

      const res = await fetch(LEAD_MAGNET_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          token: LEAD_MAGNET_SECRET,
          email: trimmedEmail,
          first_name: trimmedFirstName,
          firstName: trimmedFirstName,
          name: trimmedFirstName,
        }),
      });
      const json = await res.json().catch(() => null);
      setStatus(json?.ok !== false ? 'sent' : 'error');
    } catch {
      try {
        localStorage.setItem(
          'uh_audit_unlocked',
          JSON.stringify({
            email: trimmedEmail,
            name: trimmedFirstName,
            unlockedAt: Date.now(),
          }),
        );
      } catch {}
      // Degrade gracefully to sent so visitor can access on-site scorecard
      setStatus('sent');
    }
  };

  if (status === 'sent') {
    return (
      <div className={embedded ? 'p-2 sm:p-4 text-ink' : 'bg-paper border border-rule-strong p-6 md:p-8 text-ink'}>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/15 text-signal font-mono text-xs uppercase tracking-wider font-semibold">
          ✓ Audit Dispatched
        </span>
        <h3 className="font-display text-2xl text-ink font-medium mt-3">Check your inbox.</h3>
        <p className="text-muted leading-relaxed mt-2 text-sm">
          The 10-Point Pre-Sold Prospects Audit has been sent to <strong className="text-ink">{email}</strong>.
        </p>

        {/* Instant Access Scorecard Callout */}
        <div className="mt-5 p-4 rounded-[12px] bg-paper-sunken border border-rule-strong flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-ink font-semibold text-sm">Score your site right now:</p>
            <p className="text-muted text-xs mt-0.5">Use our interactive web scorecard with instant calculations &amp; PDF export.</p>
          </div>
          <Link
            to="/audit-checklist/"
            className="btn-primary shrink-0 text-xs py-2.5 px-4 shadow-sm w-full sm:w-auto text-center"
          >
            Open Live Scorecard →
          </Link>
        </div>

        <p className="text-[0.75rem] text-muted mt-4">
          If it hasn't arrived in your inbox, please check your spam folder or email{' '}
          <a href="mailto:hello@uncodedhub.com?subject=AUDIT" className="link-quiet text-ink font-medium">
            hello@uncodedhub.com
          </a>.
        </p>
      </div>
    );
  }

  return (
    <div className={embedded ? 'text-ink' : 'bg-paper border border-rule-strong p-6 md:p-8 text-ink'}>
      {!embedded && (
        <p className="font-sans font-semibold text-ink text-[1rem] mb-4 leading-snug">
          Get the free audit — straight to your inbox
        </p>
      )}
      <form onSubmit={submit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lm-first-name" className="label text-ink font-semibold text-xs">First Name</label>
            <input
              id="lm-first-name"
              type="text"
              placeholder="e.g. Deepak"
              aria-label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-paper border border-rule-strong text-ink placeholder:text-muted/70 px-3.5 py-2.5 text-[0.9375rem] rounded-[6px] focus:border-ink focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lm-email" className="label text-ink font-semibold text-xs">Email Address <span className="text-signal">*</span></label>
            <input
              id="lm-email"
              type="email"
              placeholder="you@example.com"
              aria-label="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-paper border border-rule-strong text-ink placeholder:text-muted/70 px-3.5 py-2.5 text-[0.9375rem] rounded-[6px] focus:border-ink focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="lead-magnet-url">Website</label>
          <input
            id="lead-magnet-url"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
          />
        </div>

        {status === 'error' && (
          <p className="text-[0.875rem] text-signal font-medium" role="alert">
            That didn't send. Email hello@uncodedhub.com with "AUDIT" and we'll send it directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary w-full disabled:opacity-55 mt-1"
        >
          {status === 'sending' && <span className="spinner" aria-hidden="true" />}
          {status === 'sending' ? 'Sending Free Audit…' : 'Send Me the Free Audit →'}
        </button>
      </form>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-4 text-[0.8125rem] text-muted leading-relaxed">
        <span>
          {'Prefer instant access? '}
          <Link to="/audit-checklist/" className="link-quiet text-ink font-semibold hover:text-signal transition-colors">
            Open Interactive Checklist →
          </Link>
        </span>
        <a href="mailto:hello@uncodedhub.com?subject=AUDIT" className="link-quiet text-muted hover:text-ink text-xs">
          Form issue? Email us directly
        </a>
      </div>
    </div>
  );
}
