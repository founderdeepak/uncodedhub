import { useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   LEAD MAGNET FORM — The Pre-Sold Prospects Audit

   Native form, no third-party form service. Kit/ConvertKit has been
   fully removed from this flow. Submitting POSTs directly from the
   browser to the Apps Script webhook (lead-magnet-webhook-script.js),
   which fires a Resend event (`lead_magnet.audit_signup`) that triggers
   the "Pre-Sold Prospects Audit" automation already configured in the
   Resend dashboard — the nurture email sequence itself lives there, not
   in this codebase. That script's header has the deploy steps and the
   CORS notes for the text/plain POST trick below (same one
   BookingCalendar.tsx uses against the same kind of endpoint).
   ═══════════════════════════════════════════════════════════════════ */

const LEAD_MAGNET_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxjs7uylG1UuDne9_rCCd8YfZKp9RRE5vIFK9_Ctq8MMWfur0100fBDwAaTZd2l3_iq/exec'; // see lead-magnet-webhook-script.js header for deploy steps

/* Sent as `token` in the POST body; the Apps Script checks it against its
   own WEBHOOK_SHARED_SECRET script property (see lead-magnet-webhook-script.js).
   Visible to anyone who reads the bundle, so it is not real auth — it only
   raises the bar above a blind scanner hitting the URL. Real abuse defense
   is the hourly/per-email send caps enforced server-side in that script. */
const LEAD_MAGNET_SECRET = import.meta.env.VITE_LEAD_MAGNET_SECRET || '';

export function LeadMagnetForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [trap, setTrap] = useState('');
  const startedAt = useRef(Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return;
    if (Date.now() - startedAt.current < 3000) return;
    setStatus('sending');

    try {
      const trimmedEmail = email.trim();
      const trimmedFirstName = firstName.trim();
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
      setStatus(json?.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="bg-paper border border-rule-strong p-6 md:p-8">
        <span className="label text-signal">Sent</span>
        <h3 className="font-display text-display mt-3">Check your inbox.</h3>
        <p className="text-muted leading-relaxed mt-4">
          The Pre-Sold Prospects Audit is on its way to {email}. If it doesn't show up in a
          couple of minutes, check spam — or email{' '}
          <a href="mailto:hello@uncodedhub.com?subject=AUDIT" className="link-quiet text-ink">
            hello@uncodedhub.com
          </a>{' '}
          and we'll send it directly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper border border-rule-strong p-6 md:p-8">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            aria-label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-paper border border-rule-strong px-3.5 py-2.5 text-[0.9375rem] rounded-[3px] focus:border-ink transition-colors"
          />
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-paper border border-rule-strong px-3.5 py-2.5 text-[0.9375rem] rounded-[3px] focus:border-ink transition-colors"
          />
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
          <p className="text-[0.875rem] text-signal" role="alert">
            That didn't send. Email hello@uncodedhub.com with "AUDIT" and we'll send it directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary w-full disabled:opacity-55"
        >
          {status === 'sending' && <span className="spinner" aria-hidden="true" />}
          {status === 'sending' ? 'Sending…' : 'Grab Your FREE "Pre-Sold Prospects Audit" Now'}
        </button>
      </form>

      <p className="label text-muted mt-5">
        No spam. One practical email every few days. Unsubscribe anytime.
      </p>
      <p className="text-[0.8125rem] text-muted mt-3 leading-relaxed">
        Form not loading? Email{' '}
        <a href="mailto:hello@uncodedhub.com?subject=AUDIT" className="link-quiet text-ink">
          hello@uncodedhub.com
        </a>{' '}
        with "AUDIT" and we'll send it directly.
      </p>
    </div>
  );
}
