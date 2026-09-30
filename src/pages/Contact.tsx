import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { BookingCalendar, HOSTS, Host } from '../components/ui/BookingCalendar';
import { submitLead } from '../lib/supabase';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   CONTACT & DISCOVERY
   Cloaked-inspired design:
   - High-contrast editorial hero with announcement badge
   - Rounded squircle calendar bento card (rounded-[28px])
   - Visual host selector tabs (Deepak & Geetha)
   - Alternative channels bento grid
   - Cinematic dark chapter: "The 4-Step Handover Protocol" (#0e0c0a)
   - Written brief form in squircle container
   - Dual-card closing CTA module
   ═══════════════════════════════════════════════════════════════════ */

const PROTOCOL = [
  {
    step: '01',
    timing: 'Right now',
    title: 'Instant calendar confirmation',
    desc: 'You select a slot and immediately receive a Google Meet video invitation with automated timezone conversion. Zero software to install.',
    tag: 'Step 1 · Instant',
  },
  {
    step: '02',
    timing: 'On the call',
    title: '20-minute live architecture teardown',
    desc: 'We examine your business model, customer journey, and existing site or competitor benchmark live on screen. Pure engineering insight, zero sales slides.',
    tag: 'Step 2 · 20 minutes',
  },
  {
    step: '03',
    timing: 'Within 24 hours',
    title: 'Fixed scope & delivery contract',
    desc: 'A written one-page specification: every page itemized, performance targets locked, fixed all-inclusive investment, and an exact launch date.',
    tag: 'Step 3 · 24 hours',
  },
  {
    step: '04',
    timing: 'If you go ahead',
    title: 'The 7-day sprint commences',
    desc: 'Development starts the next morning. If our proposal is not a fit, we part as friends and you will never receive an automated drip email sequence.',
    tag: 'Step 4 · No spam',
  },
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
        <title>Book a Discovery Call — Uncoded Hub</title>
        <meta
          name="description"
          content="Book a free twenty-minute discovery call directly with Deepak & Geetha, or send a project brief. Slots are displayed in your local timezone."
        />
        <link rel="canonical" href="https://uncodedhub.com/contact" />
      </Helmet>

      {/* ── Editorial Hero ──────────────────────────────────────── */}
      <section className="pt-10 sm:pt-16 pb-16 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
              <div className="lg:col-span-8">
                <p className="label text-signal mb-3">Direct founder discovery · Local timezone</p>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05]">
                  Twenty minutes, and you will know either way.
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  No pitch decks, no junior account managers, no five-stage sales process. One call directly with <strong className="text-ink font-semibold">Deepak &amp; Geetha</strong> — the two founders who build your website.
                </p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Interactive Booking Bento ───────────────────────────── */}
      <Section id="book" size="tight" className="bg-paper-sunken">
        <Shell>
          <Reveal>
            {/* Host Toggle Tabs */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rule">
              <div>
                <span className="label text-signal block mb-1">
                  Choose your host
                </span>
                <p className="text-ink font-medium text-sm">
                  Both founders attend and deliver every project together. Pick who you'd like to lead discovery:
                </p>
              </div>

              <div className="inline-flex p-1.5 bg-paper rounded-full border border-rule-strong shadow-xs gap-1.5">
                {HOSTS.map((h) => {
                  const active = host.name === h.name;
                  return (
                    <button
                      key={h.name}
                      onClick={() => setHost(h)}
                      aria-pressed={active}
                      className={`px-5 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                        active
                          ? 'bg-ink text-paper font-medium shadow-xs'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-signal-bright' : 'bg-rule-strong'}`} />
                      <span>{h.name}</span>
                      <span className="hidden sm:inline text-[10px] opacity-70">
                        ({h.name === 'Deepak' ? 'Engineering' : 'Design'})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Calendar Squircle Card */}
          <Reveal delay={80}>
            <div className="bg-paper-raised border border-rule-strong rounded-[28px] p-6 sm:p-10 shadow-xs relative">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-rule text-xs font-mono text-muted">
                <span className="flex items-center gap-2 text-ink font-medium">
                  <span className="w-2 h-2 rounded-full bg-signal" />
                  Live Slot Booking with {host.name} ({host.role.replace('Co-founder, ', '')})
                </span>
                <span className="hidden sm:inline text-[11px]">Duration: 20 Minutes · Video (Google Meet)</span>
              </div>

              {/* Remounted per host so the picker resets cleanly. */}
              <BookingCalendar key={host.name} host={host} />
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* ── Other Direct Channels Bento ─────────────────────────── */}
      <Section tone="sunk" size="default">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <SectionHead index="01" eyebrow="Alternative channels" title="If a call is not how you work." />
              </div>
              <p className="text-muted text-xs sm:text-sm max-w-md">
                Reach Deepak &amp; Geetha directly through WhatsApp or Email. We answer messages ourselves without ticketing systems.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                k: 'WhatsApp',
                v: '+91 86608 19023',
                pill: 'Under 1 hour response',
                note: 'Fastest for urgent questions or quick voice notes. Answered directly by Deepak & Geetha during active hours.',
                href: 'https://wa.me/918660819023',
                action: 'Open WhatsApp Chat →',
              },
              {
                k: 'Email',
                v: 'hello@uncodedhub.com',
                pill: 'Under 24 hours response',
                note: 'Best for detailed project briefs, RFP specifications, design Figma links, or existing website audits.',
                href: 'mailto:hello@uncodedhub.com',
                action: 'Send an Email →',
              },
              {
                k: 'Operating hours',
                v: '08:00 – 20:00 IST',
                pill: '7 days a week',
                note: 'Bengaluru, India standard time. Messages sent overnight are reviewed first thing at 08:00 IST.',
                action: 'Timezone: UTC +5:30',
              },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 80}>
                <div className="bg-paper-raised p-8 rounded-[24px] border border-rule-strong shadow-xs h-full flex flex-col justify-between hover:border-ink/30 transition-all duration-300">
                  <div>
                    <span className="card-tag mb-4">
                      {c.k} · {c.pill}
                    </span>

                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer noopener"
                        className="block font-display text-2xl sm:text-3xl text-ink font-medium mt-1 hover:text-signal transition-colors break-words"
                      >
                        {c.v}
                      </a>
                    ) : (
                      <p className="font-display text-2xl sm:text-3xl text-ink font-medium mt-1 break-words">
                        {c.v}
                      </p>
                    )}

                    <p className="text-muted leading-relaxed mt-4 text-xs sm:text-sm">
                      {c.note}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-rule text-xs font-medium text-signal">
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer noopener"
                        className="hover:underline flex items-center gap-1.5"
                      >
                        <span>{c.action}</span>
                      </a>
                    ) : (
                      <span className="text-muted">{c.action}</span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Official Profiles & Social Channels ──────────── */}
          <div className="mt-16 pt-12 border-t border-rule">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="label text-signal block mb-2">Verified studio presence</span>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                    Official channels &amp; profiles
                  </h3>
                </div>
                <p className="text-muted text-xs sm:text-sm max-w-md">
                  Follow our live website teardowns, speed benchmarks, design notes, and verified company registry across the web.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'LinkedIn',
                  handle: '/company/uncodedhub',
                  desc: 'Executive updates, case studies & founder articles',
                  href: 'https://www.linkedin.com/company/uncodedhub/',
                  tag: 'Company Page',
                },
                {
                  name: 'X (Twitter)',
                  handle: '@uncodedhub',
                  desc: 'Real-time engineering notes & web design benchmarks',
                  href: 'https://x.com/uncodedhub',
                  tag: 'Real-time',
                },
                {
                  name: 'Instagram',
                  handle: '@uncodedhub',
                  desc: 'Visual site teardowns, aesthetic layouts & typography',
                  href: 'https://www.instagram.com/uncodedhub/',
                  tag: 'Visual Craft',
                },
                {
                  name: 'YouTube',
                  handle: '@uncodedhub',
                  desc: 'Long-form website audits & 7-day sprint walk-throughs',
                  href: 'https://www.youtube.com/@uncodedhub',
                  tag: 'Video Audits',
                },
                {
                  name: 'Threads',
                  handle: '@uncodedhub',
                  desc: 'Behind-the-scenes thoughts on web craft & studio life',
                  href: 'https://www.threads.com/@uncodedhub',
                  tag: 'Microblog',
                },
                {
                  name: 'Facebook',
                  handle: 'Uncoded Hub',
                  desc: 'Official business page, announcements & community',
                  href: 'https://www.facebook.com/profile.php?id=61580702457181',
                  tag: 'Community',
                },
                {
                  name: 'Pinterest',
                  handle: 'uncodedhub',
                  desc: 'Curated editorial web boards, typography & monographs',
                  href: 'https://www.pinterest.com/uncodedhub/',
                  tag: 'Moodboards',
                },
                {
                  name: 'Reddit',
                  handle: 'u/uncodedhub',
                  desc: 'Discussions on web performance, Core Web Vitals & code',
                  href: 'https://www.reddit.com/user/uncodedhub/',
                  tag: 'Technical Forum',
                },
                {
                  name: 'Google Maps',
                  handle: 'Uncoded Hub · Bengaluru',
                  desc: 'Verified studio location, directions & Google reviews',
                  href: 'https://maps.app.goo.gl/fwvgEPkguRSfkcC49',
                  tag: 'Verified Location',
                },
              ].map((s, idx) => (
                <Reveal key={s.name} delay={idx * 35}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group bg-paper-raised p-5 rounded-[20px] border border-rule-strong shadow-xs flex flex-col justify-between hover:border-ink/40 hover:shadow-sm transition-all duration-200 h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="font-display text-lg text-ink font-medium group-hover:text-signal transition-colors">
                          {s.name}
                        </span>
                        <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-paper-sunken border border-rule text-muted uppercase">
                          {s.tag}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-signal mb-1.5">{s.handle}</p>
                      <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-rule/60 flex items-center justify-between text-xs text-muted group-hover:text-ink transition-colors font-medium">
                      <span>Visit profile</span>
                      <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Shell>
      </Section>

      {/* ── Cinematic Dark Chapter: Handover Protocol ───────────── */}
      <section className="bg-ink text-paper py-24 sm:py-32 relative overflow-hidden border-y border-white/10">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-signal/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="label text-signal-bright block mb-3">
                Zero sales mystery
              </span>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-paper font-normal leading-[1.1] tracking-tight">
                The 4-step handover protocol
              </h2>
              <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed mt-6 max-w-xl">
                What actually occurs after you schedule your slot. No hidden discovery phases, no high-pressure close, no endless pitch decks.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROTOCOL.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <div className="bg-white/[0.04] p-8 rounded-[24px] border border-white/10 flex flex-col justify-between h-full hover:border-white/20 transition-all duration-300">
                  <div>
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright mb-4">
                      {p.tag}
                    </span>
                    <h3 className="font-display text-xl text-paper font-medium mb-3 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-on-ink-muted text-xs leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── Brief + What Happens Next ──────────────────────────── */}
      <Section size="loose" className="bg-paper">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <div className="mb-10">
                <SectionHead index="02" eyebrow="Send a brief" title="Or write it down instead." />
                <p className="text-muted text-xs sm:text-sm mt-3">
                  Prefer not to speak on a call yet? Share your business requirements in written form. We review every brief personally and reply within one business day.
                </p>
              </div>

              <div className="bg-paper-raised border border-rule-strong rounded-[28px] p-6 sm:p-10 shadow-xs">
                <BriefForm />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="mb-10">
                <SectionHead index="03" eyebrow="Our guarantee" title="Direct founder accountability." />
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Deepak writes the architecture',
                    desc: 'Full TypeScript, Vite, zero bloated plugins, instant sub-second page loads, and 100/100 Lighthouse performance.',
                  },
                  {
                    title: 'Geetha designs the interface',
                    desc: 'Distinctive typography, bespoke visual layouts, customer-first conversion hierarchy, and frictionless interaction models.',
                  },
                  {
                    title: 'Fixed all-inclusive quote',
                    desc: 'No hourly rate overruns. The number on the scope sheet is the exact number on the invoice.',
                  },
                  {
                    title: '7-day contractual delivery',
                    desc: 'If we commit to launching on day seven, it launches on day seven. If we miss it without agreed scope creep, we discount 50%.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-6 bg-paper-sunken border border-rule rounded-[20px] hover:border-rule-strong transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                      <h4 className="font-medium text-sm text-ink">{item.title}</h4>
                    </div>
                    <p className="text-muted text-xs leading-relaxed pl-3.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── Cloaked-Style Dual-Card Closing CTA ─────────────────── */}
      <section className="bg-ink text-paper py-20 border-t border-white/10">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-[32px] p-8 sm:p-12">
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <LogoMark size={48} />
                    <span className="font-display text-2xl text-paper font-medium">Uncoded Hub</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight">
                    Start your 7-day sprint.<br />
                    <span className="text-signal-bright italic">Direct with Deepak & Geetha.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    We only take two sprint builds per month to maintain 100% founder attention. Secure your discovery slot or explore our verified builds.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-mono text-on-ink-muted">
                  <span>● Deepak & Geetha</span>
                  <span>·</span>
                  <span>Zero Sales Reps</span>
                  <span>·</span>
                  <span>Bengaluru, India</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="label text-signal-bright block mb-2">
                    Discovery call · 20 minutes
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Ready to discuss your site?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Pick a 20-minute slot on the calendar above, or jump straight to inspecting our 6 interactive sector demos.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="#book"
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Jump to Slot Selector</span>
                    <span>↑</span>
                  </a>
                  <Link
                    to="/portfolio"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Or test our 6 live client demos first →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
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
      <div className="pop-in bg-paper-sunken border border-rule-strong rounded-[24px] p-8 md:p-12 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 text-signal font-mono text-xs uppercase tracking-wider mb-4">
          ✓ BRIEF RECEIVED
        </span>
        <h3 className="font-display text-3xl text-ink font-medium">Thanks, {form.name.split(' ')[0]}.</h3>
        <p className="text-muted leading-relaxed mt-4 max-w-md mx-auto text-sm">
          Deepak & Geetha read every brief personally. You will hear back within one working day with either a detailed scope and fixed price, or a specific question we need clarified first.
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
            Phone / WhatsApp <span className="text-signal">*</span>
          </label>
          <div className="flex gap-2">
            <select
              aria-label="Country dialling code"
              value={form.dial}
              onChange={(e) => setForm({ ...form, dial: e.target.value })}
              className="w-24 bg-paper border border-rule-strong px-2.5 py-2.5 text-xs font-mono rounded-xl focus:border-ink transition-colors"
            >
              {['+91', '+1', '+44', '+61', '+971', '+65'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <input
              id="brief-phone"
              type="tel"
              required
              placeholder="98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="flex-1 min-w-0 bg-paper border border-rule-strong px-3.5 py-2.5 text-sm rounded-xl focus:border-ink transition-colors"
            />
          </div>
        </div>
        <BriefField
          label="What does your business do?"
          name="business"
          placeholder="e.g. Interior studio, Dental clinic"
          value={form.business}
          onChange={(v) => setForm({ ...form, business: v })}
        />
      </div>

      <div>
        <label htmlFor="brief-details" className="label text-muted block mb-2">
          What do you need built, and by when? <span className="text-signal">*</span>
        </label>
        <textarea
          id="brief-details"
          required
          rows={5}
          placeholder="What you sell, who buys it, what is broken on your current website, and any target launch date you have in mind."
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          className="w-full bg-paper border border-rule-strong px-4 py-3 text-sm rounded-xl resize-y focus:border-ink transition-colors placeholder:text-muted/50"
        />
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="brief-url">Website</label>
        <input id="brief-url" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>

      {status === 'error' && (
        <p className="text-xs text-signal font-mono" role="alert">
          Unable to submit form right now. Please email hello@uncodedhub.com directly.
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary py-3 px-8 rounded-full disabled:opacity-55 cursor-pointer shadow-xs text-sm"
        >
          {status === 'sending' && <span className="spinner mr-2" aria-hidden="true" />}
          {status === 'sending' ? 'Transmitting…' : 'Send Project Brief →'}
        </button>
        <span className="text-[11px] font-mono text-muted">
          ● Replies guaranteed within 1 working day
        </span>
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
  placeholder = '',
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-paper border border-rule-strong px-3.5 py-2.5 text-sm rounded-xl focus:border-ink transition-colors placeholder:text-muted/50"
      />
    </div>
  );
}
