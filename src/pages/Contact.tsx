import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { BookingCalendar, HOSTS, Host } from '../components/ui/BookingCalendar';
import { submitLead } from '../lib/supabase';

/* ═══════════════════════════════════════════════════════════════════
   CONTACT

   The host used to be picked with Math.random() on mount, which meant
   the page told a returning visitor they were speaking to a different
   person each time they loaded it. The visitor now chooses, with a
   sensible default, and ?host=geetha still works for campaign links.
   ═══════════════════════════════════════════════════════════════════ */

const NEXT = [
  ['Right now', 'You pick a slot and get a calendar invitation with a video link. Nothing to install.'],
  ['On the call', 'Twenty minutes. What your business does, who you sell to, and what the site has to achieve. We look at whatever you have now, live.'],
  ['Within a day', 'A written scope: the pages, the features, a fixed price, and a launch date. One page, no deck.'],
  ['If you go ahead', 'The seven days start the next morning. If you do not, we part on good terms and there is no follow-up sequence.'],
];

export default function Contact() {
  const location = useLocation();
  const [host, setHost] = useState<Host>(HOSTS[0]);

  useEffect(() => {
    const param = new URLSearchParams(location.search).get('host')?.toLowerCase();
    const found = HOSTS.find((h) => h.name.toLowerCase() === param);
    if (found) setHost(found);
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Book a Call — Uncoded Hub</title>
        <meta
          name="description"
          content="Book a free twenty-minute discovery call with Uncoded Hub, or send a project brief. Slots are shown in your timezone."
        />
        <link rel="canonical" href="https://uncodedhub.com/contact" />
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-14">
        <Shell>
          <Reveal>
            <p className="label text-signal">Contact</p>
            <h1 className="font-display text-hero mt-8 max-w-[15ch]">
              Twenty minutes, and you will know either way.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-10 max-w-2xl">
              No deck, no discovery workshop, no five-stage sales process. One call with the two
              people who would build it, and a written scope and price the next day.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── Booking ────────────────────────────────────────────── */}
      <Section id="book" size="tight">
        <Shell>
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pb-6 border-b border-rule">
              <span className="label text-muted">Speak with</span>
              {HOSTS.map((h) => (
                <button
                  key={h.name}
                  onClick={() => setHost(h)}
                  aria-pressed={host.name === h.name}
                  className={`text-[0.9375rem] link-quiet ${
                    host.name === h.name ? 'text-signal' : 'text-muted hover:text-ink'
                  }`}
                >
                  {h.name} — {h.role.replace('Co-founder, ', '')}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            {/* Remounted per host so the picker resets cleanly. */}
            <BookingCalendar key={host.name} host={host} />
          </Reveal>
        </Shell>
      </Section>

      {/* ── Other channels ─────────────────────────────────────── */}
      <Section tone="sunk" size="default">
        <Shell>
          <Reveal>
            <SectionHead index="01" eyebrow="Other ways" title="If a call is not how you work." />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-rule mt-14 border border-rule">
            {[
              {
                k: 'WhatsApp',
                v: '+91 86608 19023',
                note: 'Fastest. Usually answered inside the hour during working hours.',
                href: 'https://wa.me/918660819023',
              },
              {
                k: 'Email',
                v: 'hello@uncodedhub.com',
                note: 'Best for a detailed brief or an RFP. Replies within one working day.',
                href: 'mailto:hello@uncodedhub.com',
              },
              {
                k: 'Hours',
                v: '08:00 – 20:00 IST',
                note: 'Seven days a week. Outside those hours, leave a message and it is answered first thing.',
              },
            ].map((c) => (
              <Reveal key={c.k} className="bg-paper-raised p-8 card-lift">
                <span className="label text-signal">{c.k}</span>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer noopener"
                    className="block font-display text-title mt-4 link-quiet w-fit max-w-full break-words"
                  >
                    {c.v}
                  </a>
                ) : (
                  <p className="font-display text-title mt-4 break-words">{c.v}</p>
                )}
                <p className="text-muted leading-relaxed mt-4 text-[0.9375rem]">{c.note}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── Brief + what happens next ──────────────────────────── */}
      <Section size="loose">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <SectionHead index="02" eyebrow="Send a brief" title="Or write it down instead." />
              <div className="mt-12">
                <BriefForm />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <SectionHead index="03" eyebrow="What happens next" title="No mystery." />
              <div className="mt-12 border-t border-rule-strong">
                {NEXT.map(([k, v], i) => (
                  <div key={k} className="flex gap-6 py-6 border-b border-rule">
                    <span className="label text-signal pt-1 shrink-0 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-medium">{k}</h3>
                      <p className="text-muted leading-relaxed mt-2 text-[0.9375rem]">{v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */

function BriefForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    dial: '+91',
    phone: '',
    business: '',
    details: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [trap, setTrap] = useState('');
  const startedAt = useRef(Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return;
    if (Date.now() - startedAt.current < 3000) return;
    setStatus('sending');

    const ok = await submitLead({
      name: form.name,
      email: form.email,
      phone: `${form.dial} ${form.phone}`,
      business_type: form.business,
      project_details: form.details,
    });
    setStatus(ok ? 'sent' : 'error');
  };

  if (status === 'sent') {
    return (
      <div className="border border-rule-strong bg-paper-raised p-10 md:p-14">
        <span className="label text-signal">Received</span>
        <h3 className="font-display text-display mt-5">Thanks, {form.name.split(' ')[0]}.</h3>
        <p className="text-muted leading-relaxed mt-6 max-w-md">
          We read every brief ourselves. You will hear back within one working day with either a
          scope and a price, or a question we need answered first.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <BriefField label="Your name" name="name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <BriefField label="Email" name="email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="brief-phone" className="label text-muted block mb-2">
            Phone <span className="text-signal">*</span>
          </label>
          <div className="flex gap-2">
            <select
              aria-label="Country dialling code"
              value={form.dial}
              onChange={(e) => setForm({ ...form, dial: e.target.value })}
              className="w-28 bg-paper border border-rule-strong px-3 py-2.5 text-[0.9375rem] rounded-[3px] focus:border-ink transition-colors"
            >
              {['+91', '+1', '+44', '+61', '+971', '+65'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <input
              id="brief-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="flex-1 min-w-0 bg-paper border border-rule-strong px-3.5 py-2.5 text-[0.9375rem] rounded-[3px] focus:border-ink transition-colors"
            />
          </div>
        </div>
        <BriefField
          label="What does your business do?"
          name="business"
          value={form.business}
          onChange={(v) => setForm({ ...form, business: v })}
        />
      </div>

      <div>
        <label htmlFor="brief-details" className="label text-muted block mb-2">
          What do you need, and by when? <span className="text-signal">*</span>
        </label>
        <textarea
          id="brief-details"
          required
          rows={6}
          placeholder="What you sell, who buys it, what is wrong with the site you have now, and any date you are working towards."
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          className="w-full bg-paper border border-rule-strong px-3.5 py-3 text-[0.9375rem] rounded-[3px] resize-y focus:border-ink transition-colors placeholder:text-rule-strong"
        />
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="brief-url">Website</label>
        <input id="brief-url" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>

      {status === 'error' && (
        <p className="text-[0.875rem] text-signal" role="alert">
          That did not send. Email hello@uncodedhub.com and we will pick it up there.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-55">
          {status === 'sending' ? 'Sending…' : 'Send the brief'}
        </button>
        <p className="label text-muted">Replies within one working day</p>
      </div>
    </form>
  );
}

function BriefField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = `brief-${name}`;
  return (
    <div>
      <label htmlFor={id} className="label text-muted block mb-2">
        {label}
        {required && <span className="text-signal"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-paper border border-rule-strong px-3.5 py-2.5 text-[0.9375rem] rounded-[3px] focus:border-ink transition-colors"
      />
    </div>
  );
}
