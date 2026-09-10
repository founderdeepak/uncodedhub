import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { submitLead } from '../lib/supabase';

/* ═══════════════════════════════════════════════════════════════════
   ENQUIRY DOCK

   This replaces the floating "AI chatbot".

   That component was presented as an AI assistant — a bot avatar, a
   typing indicator, a 1.2-second fake "thinking" delay — and it was a
   hardcoded three-question script with no model behind it. The site
   simultaneously sold "AI chatbot integration" as a headline deliverable.
   For a studio whose website is its own product demo, that is the worst
   possible place to overstate a capability: the prospect is looking
   directly at the evidence while reading the claim.

   So this is simply what it is. A short form, honestly labelled, that
   reaches a human. If a real model is wired up later, the label can
   change then.

   It stays hidden on /contact, where the full form already lives.
   ═══════════════════════════════════════════════════════════════════ */

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function EnquiryDock() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  /* Spam controls for a form that writes straight to the database from
     the browser: an off-screen field bots fill and humans cannot see,
     and a minimum time-on-form. Neither is a substitute for a rate limit
     at the database, which is noted in the handover. */
  const [trap, setTrap] = useState('');
  const openedAt = useRef<number>(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  /* Deferred so it never competes with the first paint. */
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    openedAt.current = Date.now();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    panelRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!mounted || location.pathname === '/contact') return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return; // bot
    if (Date.now() - openedAt.current < 2500) return; // filled impossibly fast
    setStatus('sending');

    const ok = await submitLead({
      name: form.name,
      email: form.email,
      business_type: 'Quick enquiry',
      project_details: form.message,
    });
    setStatus(ok ? 'sent' : 'error');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end print:hidden">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Send a message"
          className="mb-3 w-[min(22rem,calc(100vw-2.5rem))] bg-paper-raised border border-rule-strong shadow-[0_18px_50px_-12px_rgba(20,19,15,0.28)]"
        >
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-rule">
            <div>
              <h2 className="font-display text-[1.375rem] leading-tight">Send a message</h2>
              <p className="label text-muted mt-2">Goes to Deepak &amp; Geetha</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="label text-muted hover:text-ink transition-colors pt-1"
            >
              Close
            </button>
          </div>

          {status === 'sent' ? (
            <div className="px-6 py-10 text-center">
              <p className="font-display text-title">Got it.</p>
              <p className="text-muted leading-relaxed mt-4">
                We reply within one working day — usually the same afternoon.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="px-6 py-6 space-y-4">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <div>
                <label
                  htmlFor="dock-message"
                  className="label text-muted block mb-2"
                >
                  What do you need?
                </label>
                <textarea
                  id="dock-message"
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-paper border border-rule-strong px-3.5 py-2.5 text-[0.9375rem] rounded-[3px] resize-none focus:border-ink transition-colors"
                />
              </div>

              {/* Honeypot — off-screen rather than display:none, which some
                  bots detect, and excluded from the tab order. */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="company-website">Company website</label>
                <input
                  id="company-website"
                  name="company-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
              </div>

              {status === 'error' && (
                <p className="text-[0.8125rem] text-signal" role="alert">
                  That did not send. Email hello@uncodedhub.com and we will pick it up there.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full !py-3 disabled:opacity-55"
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
              <p className="label text-muted text-center">Replies within one working day</p>
            </form>
          )}
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-ink text-paper px-5 py-3 rounded-[3px] text-[0.9375rem] font-medium shadow-[0_10px_30px_-8px_rgba(20,19,15,0.45)] hover:bg-signal transition-colors"
        >
          Send a message
        </button>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const id = `dock-${name}`;
  return (
    <div>
      <label htmlFor={id} className="label text-muted block mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-paper border border-rule-strong px-3.5 py-2.5 text-[0.9375rem] rounded-[3px] focus:border-ink transition-colors"
      />
    </div>
  );
}
