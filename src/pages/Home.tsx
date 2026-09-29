import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { FaqAccordion } from '../components/ui/faq-accordion';
import { LeadMagnetForm } from '../components/ui/LeadMagnetForm';
import { FloatingLeadMagnetBanner } from '../components/ui/FloatingLeadMagnetBanner';
import {
  IconCompass,
  IconBrackets,
  IconLaunch,
  IconTimer,
  IconGauge,
  IconLayers,
  IconContrast,
  IconKeyboard,
  IconCode,
} from '../components/Glyphs';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   UNCODED HUB — HOMEPAGE
   Structure inspired by Cloaked's high-contrast, editorial SaaS architecture:
   - 50/50 Asymmetric Hero with Interactive Audit Pill & Live Health Meter
   - Cinematic Dark Chapter: "The Agency Reality / 3 Traps"
   - 3-Pillar Solution with Split Interactive Notification Showcase
   - Credential Verification Strip
   - High-Voltage Signal Bento Cards (7 Days / 100% / 99+ Speed)
   - Interactive Live Demo Specimen Showcase
   - The Better Enquiry Blueprint & Guarantee Terms
   - Studio Founders (Deepak & Geetha)
   - Lead Magnet 10-Point Audit
   - Cloaked-Style Dual-Card Closing CTA Module
   ═══════════════════════════════════════════════════════════════════ */

const TRUST_BAR = [
  { label: 'Mobile Performance', value: '99/100 Lighthouse', sub: 'Zero bloatware' },
  { label: 'Contractual Delivery', value: '7 Working Days', sub: 'Late means free' },
  { label: 'Total Ownership', value: '100% Client Owned', sub: 'Zero license lock-in' },
  { label: 'Senior Founders', value: 'Deepak & Geetha', sub: 'No junior hand-off' },
];

const AGENCY_TRAPS = [
  {
    id: 'junior-dev',
    tag: 'THE BAIT & SWITCH',
    title: 'The Junior Dev Hand-off',
    description:
      'Agency founders pitch you with charisma, polished case studies, and corporate charisma. The moment the contract is signed, the senior team vanishes. Your project is assigned to a 22-year-old intern who is juggling eight client accounts simultaneously.',
    contrast: 'With Uncoded Hub: Geetha designs, Deepak builds. The people on the discovery call build your website.',
    badge: 'INTERN ASSIGNED',
    badgeTone: 'signal',
  },
  {
    id: 'timeline-creep',
    tag: 'THE SCHEDULE DELAY',
    title: 'The 4-Month Timeline Creep',
    description:
      'A standard 5-page site stretches into endless review cycles, missing launch deadlines, and vague excuses about "internal bandwidth." You spend months chasing updates instead of closing high-value clients.',
    contrast: 'With Uncoded Hub: Exactly 7 working days. If we miss our agreed deadline, the entire build is 100% free.',
    badge: 'DELAYED 12 WEEKS',
    badgeTone: 'warning',
  },
  {
    id: 'plugin-patchwork',
    tag: 'THE MAINTENANCE TRAP',
    title: 'The WordPress Plugin Patchwork',
    description:
      'Agencies assemble 35+ third-party WordPress plugins that fight each other, slow mobile load times to 6+ seconds, and break every time an update runs. Then they lock you into a ₹25,000/month "maintenance contract" just to fix bugs.',
    contrast: 'With Uncoded Hub: Handcrafted React & Vite architecture. 0.8s load times. Zero plugins, zero security patching.',
    badge: '38 ACTIVE PLUGINS',
    badgeTone: 'error',
  },
];

const THREE_PILLARS = [
  {
    num: '01',
    title: 'Turnkey Copywriting & Positioning',
    p: 'We write your entire site from a single 20-minute discovery call. No questionnaires, no blank screens, and no generic marketing fluff. We articulate your exact competitive edge.',
    pill: 'Zero Blank Screens',
  },
  {
    num: '02',
    title: 'Zero-Bloat Speed Architecture',
    p: 'Engineered with clean React, Vite, and modern semantic CSS. Scores 99+ on Google Lighthouse and loads in under 1 second on mobile 4G anywhere in the world.',
    pill: 'Sub-1.0s Mobile Load',
  },
  {
    num: '03',
    title: '7-Day Contractual Guarantee',
    p: 'A fixed timeline, a fixed price agreed in writing, and a contractual promise: if we are late by even one day, the build is 100% free and you keep everything.',
    pill: 'Late Means Free',
  },
];

const DEMO_SPECIMENS = [
  {
    client: 'Meridian Architecture & Interiors',
    url: '/demos/interior-design.html',
    thumbnail: '/demos/thumbnails/interior-design.webp',
    sector: 'Interior Architecture & Studios',
    summary: 'Turnkey residential interior architecture with photorealistic render comparisons and transparent trade fee breakdowns.',
  },
  {
    client: 'Marlow & Co. Private Real Estate',
    url: '/demos/real-estate.html',
    thumbnail: '/demos/thumbnails/real-estate.webp',
    sector: 'Prime Real Estate & Advisory',
    summary: 'Independent property advisory with a capped 8-client roster model, 14-point title verification, and strict NDA booking.',
  },
  {
    client: 'Willowmere Dental & Facial Aesthetics',
    url: '/demos/dental-clinic.html',
    thumbnail: '/demos/thumbnails/dental-clinic.webp',
    sector: 'Dental Clinics & Aesthetics',
    summary: 'Boutique cosmetic dental practice featuring anxiety-first patient protocols, pricing brackets, and CBCT 3D diagnostics.',
  },
  {
    client: 'Alder & Wren Fine-Art Wedding Films',
    url: '/demos/wedding-photography.html',
    thumbnail: '/demos/thumbnails/wedding-photography.webp',
    sector: 'Wedding Photographers & Films',
    summary: 'Cinematic destination wedding films with 4K color grade previews, unbundled package scopes, and date check.',
  },
  {
    client: 'Halbrook Studio Precision Renovation',
    url: '/demos/home-renovation.html',
    thumbnail: '/demos/thumbnails/home-renovation.webp',
    sector: 'Modular Kitchens & Full Renovation',
    summary: 'Turnkey modular living spaces with daily photographic site logs, itemized BOQ estimates, and delay penalties.',
  },
  {
    client: 'Naomi Reyes Executive Advisory',
    url: '/demos/executive-coaching.html',
    thumbnail: '/demos/thumbnails/executive-coaching.webp',
    sector: 'Executive Coaching & Advisory',
    summary: 'Confidential 1-on-1 advisory for venture-backed founders and C-suite leaders navigating critical transition windows.',
  },
];

const BUDGET = [
  { metric: 'Largest Contentful Paint', target: 'Under 1.5s on a 4G connection', value: '<1.5s', Icon: IconTimer },
  { metric: 'Lighthouse performance', target: '90 or above on mobile', value: '99+', Icon: IconGauge },
  { metric: 'Cumulative Layout Shift', target: 'Under 0.1', value: '<0.05', Icon: IconLayers },
  { metric: 'Colour contrast', target: 'WCAG AA on every text style', value: 'AA', Icon: IconContrast },
  { metric: 'Keyboard access', target: 'Every control reachable and visibly focused', value: '100%', Icon: IconKeyboard },
  { metric: 'Third-party scripts', target: 'None beyond analytics, unless you ask', value: '0', Icon: IconCode },
];

export default function Home({ onBook }: { onBook: () => void }) {
  const [auditUrl, setAuditUrl] = useState('');
  const [activeTrap, setActiveTrap] = useState<string | null>('junior-dev');
  const [activeDemoIdx, setActiveDemoIdx] = useState(0);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl.trim()) {
      onBook();
      return;
    }
    // Scroll smoothly to lead magnet form and transfer URL
    const el = document.getElementById('lead-magnet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // prefill the website field in form if present
      const siteInput = document.querySelector('input[name="website"]') as HTMLInputElement;
      if (siteInput) {
        siteInput.value = auditUrl;
        siteInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } else {
      onBook();
    }
  };

  const [isDemoPaused, setIsDemoPaused] = useState(false);

  /* Auto-rotate Live Demo Specimens smoothly with fixed duration (4.5s) */
  useEffect(() => {
    if (isDemoPaused) return;
    const timer = setInterval(() => {
      setActiveDemoIdx((prev) => (prev + 1) % DEMO_SPECIMENS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isDemoPaused]);

  const nextDemo = () => {
    setActiveDemoIdx((prev) => (prev + 1) % DEMO_SPECIMENS.length);
  };

  const prevDemo = () => {
    setActiveDemoIdx((prev) => (prev - 1 + DEMO_SPECIMENS.length) % DEMO_SPECIMENS.length);
  };

  return (
    <>
      <Helmet>
        <title>Uncoded Hub — Let Your Website Sell Before You Do</title>
        <meta
          name="description"
          content="Fixed-price, 7-day websites for high-value local businesses — interior designers, real estate agents, clinics, photographers &amp; consultants. On time or free."
        />
        <link rel="canonical" href="https://uncodedhub.com/" />
      </Helmet>

      {/* ── Hero Section (Cloaked 50/50 Layout) ─────────────────── */}
      <section id="hero" className="relative overflow-hidden pt-10 md:pt-16 pb-16 md:pb-24">
        {/* Subtle warm ambient tint */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-1/4 w-[38rem] h-[38rem] bg-signal/5 rounded-full blur-3xl pointer-events-none"
        />

        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading, Subhead, Single-Action Audit Pill */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-raised border border-rule-strong text-ink text-xs font-mono mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-signal" aria-hidden="true" />
                  <span className="font-semibold text-signal">7-DAY SPRINT BUILDS</span>
                  <span className="text-muted">·</span>
                  <span className="text-muted">Zero Bloatware</span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.08] tracking-tight font-normal">
                  Let your website <br />
                  <em className="italic hero-signal font-normal">sell before you do.</em>
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="text-lead text-muted max-w-lg mt-6 leading-relaxed">
                  You can't close clients who bounce before your page finishes loading. We build
                  custom, high-conversion websites for high-ticket local businesses in seven working days.
                  On time, or the build is free.
                </p>
              </Reveal>

              {/* Cloaked-style Interactive Single-Action Capture Widget */}
              <Reveal delay={200}>
                <form
                  onSubmit={handleAuditSubmit}
                  className="mt-8 relative max-w-lg bg-paper-raised p-1.5 rounded-full border border-rule-strong shadow-[0_12px_36px_rgba(0,0,0,0.06)] focus-within:border-signal focus-within:ring-2 focus-within:ring-signal/20 transition-all flex items-center gap-2"
                >
                  <div className="pl-4 text-muted flex items-center shrink-0" aria-hidden="true">
                    <svg className="w-5 h-5 text-signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={auditUrl}
                    onChange={(e) => setAuditUrl(e.target.value)}
                    placeholder="Enter your website URL (e.g. yourstudio.com)"
                    className="w-full bg-transparent text-ink placeholder:text-muted/70 text-sm font-sans px-2 py-2 focus:outline-none"
                    aria-label="Website URL for free audit"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-signal hover:bg-signal-bright text-paper font-sans text-xs md:text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>Instant Audit</span>
                    <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                  </button>
                </form>

                {/* Micro trust indicators */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[0.8125rem] text-muted">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-signal shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    <span>Free 60-second diagnostic</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-signal shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    <span>No sales pitch</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-signal shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    <span>Late-means-free guarantee</span>
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Cloaked-Style Squircle Hero Card with Conversion Health Meter */}
            <div className="lg:col-span-6">
              <Reveal delay={180}>
                <div className="relative group">
                  {/* Outer Ambient Glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2 bg-gradient-to-tr from-signal/20 via-transparent to-transparent rounded-[32px] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
                  />

                  {/* Main Rounded Squircle Card */}
                  <div className="relative bg-paper-raised border border-rule-strong rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.09)] transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                    {/* Browser chrome top bar */}
                    <div className="bg-ink px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span className="w-2.5 h-2.5 rounded-full bg-signal" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                        <span className="font-mono text-[11px] text-white/70">
                          uncodedhub.com · live production specimen
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-signal-bright font-semibold">7-DAY BUILD</span>
                    </div>

                    {/* Visual Media with Conversion Health Meter Overlay */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-paper">
                      <picture>
                        <source media="(max-width: 767px)" srcSet="/hero-section-mobile.webp" />
                        <img
                          src="/hero-section.webp"
                          alt="Business owner reviewing his high-converting custom website delivered by Uncoded Hub"
                          width={1200}
                          height={800}
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                          className="w-full h-full object-cover object-[70%_25%]"
                        />
                      </picture>

                      {/* Gradient scrim for overlay contrast */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent pointer-events-none"
                      />

                      {/* Floating Cloaked-Style "Conversion Health" Gauge Meter */}
                      <div className="absolute top-4 right-4 bg-ink/90 backdrop-blur-md border border-white/15 p-3 rounded-[16px] text-paper shadow-xl max-w-[200px] animate-fade-in">
                        <div className="flex items-center justify-between pb-1 mb-2 border-b border-white/10">
                          <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">Site Health</span>
                          <span className="text-[10px] font-mono font-semibold text-emerald-400">99 / 100</span>
                        </div>
                        {/* Gauge Arc */}
                        <div className="relative w-full h-12 flex items-center justify-center">
                          <svg className="w-24 h-12 overflow-visible" viewBox="0 0 100 50">
                            <path
                              d="M 10 50 A 40 40 0 0 1 90 50"
                              fill="none"
                              stroke="rgba(255,255,255,0.15)"
                              strokeWidth="8"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 10 50 A 40 40 0 0 1 88 45"
                              fill="none"
                              stroke="url(#gaugeGrad)"
                              strokeWidth="8"
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#c7074b" />
                                <stop offset="70%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#34d399" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute bottom-0 text-center">
                            <span className="text-xs font-mono font-bold text-white">Safe & Pre-Sold</span>
                          </div>
                        </div>
                        <p className="text-[9px] text-white/60 text-center mt-1">Ready to take client enquiries</p>
                      </div>

                      {/* Floating Bottom Metric Bar */}
                      <div className="absolute bottom-4 left-4 right-4 bg-paper/95 backdrop-blur-md border border-rule-strong/80 p-3 rounded-[14px] shadow-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-signal-wash text-signal flex items-center justify-center shrink-0">
                            <IconGauge className="w-4 h-4" />
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-ink leading-tight">Lighthouse 99 · 0.8s Load Speed</p>
                            <p className="text-[11px] text-muted">Zero bloatware · Handcrafted React & Vite</p>
                          </div>
                        </div>
                        <span className="label text-[10px] bg-signal text-paper px-2.5 py-1 rounded-full font-semibold">
                          VERIFIED
                        </span>
                      </div>
                    </div>

                    {/* Bottom editorial info strip */}
                    <div className="px-5 py-3 bg-paper border-t border-rule flex items-center justify-between text-xs">
                      <span className="text-muted flex items-center gap-1.5">
                        <IconTimer className="w-3.5 h-3.5 text-signal" />
                        <span>Delivery: <strong className="text-ink font-medium">7 working days</strong></span>
                      </span>
                      <span className="text-muted">
                        Guarantee: <strong className="text-signal font-medium">Late means free</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* 4-Pillar Trust Strip under Hero */}
          <Reveal delay={260}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
              {TRUST_BAR.map((t) => (
                <div key={t.label} className="bg-paper-raised p-4 rounded-[16px] border border-rule-strong shadow-xs flex flex-col justify-between">
                  <span className="label text-[10px] text-signal font-semibold tracking-wider uppercase">{t.label}</span>
                  <div className="font-display text-xl text-ink font-medium mt-1">{t.value}</div>
                  <div className="text-xs text-muted mt-0.5">{t.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── SECTION 2: The Cinematic Dark Chapter ("The Agency Reality") ──
          Directly inspired by Cloaked's dark "Data Parasites" section:
          High contrast pitch background, 3 floating glass cards with warning states. */}
      <section className="bg-ink text-paper py-20 md:py-28 relative overflow-hidden border-y border-white/10">
        {/* Ambient atmospheric red orb in dark space */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/3 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none"
        />

        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-signal-bright text-xs font-mono mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
                THE AGENCY REALITY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-paper font-normal leading-tight tracking-tight">
                Traditional web agencies put your business{' '}
                <span className="text-signal-bright italic font-normal">at risk.</span>
              </h2>
              <p className="text-on-ink-muted text-base md:text-lg mt-5 leading-relaxed">
                You do great work. But traditional agencies make getting a website painful, expensive,
                and notoriously unreliable. Here is what happens behind the glossy sales deck:
              </p>
            </div>
          </Reveal>

          {/* 3 Dark Floating Glass Bento Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {AGENCY_TRAPS.map((trap, idx) => {
              const isSelected = activeTrap === trap.id;
              return (
                <Reveal key={trap.id} delay={idx * 90}>
                  <div
                    onClick={() => setActiveTrap(isSelected ? null : trap.id)}
                    className={`relative p-6 sm:p-8 rounded-[24px] bg-white/[0.04] backdrop-blur-md border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ${
                      isSelected
                        ? 'border-signal ring-1 ring-signal/40 bg-white/[0.07] shadow-[0_20px_40px_rgba(199,7,75,0.2)]'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div>
                      {/* Card Header & Badge */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="text-[10px] font-mono text-signal-bright uppercase tracking-wider">
                          {trap.tag}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                            trap.badgeTone === 'signal'
                              ? 'bg-signal/20 text-signal-bright border-signal/40'
                              : trap.badgeTone === 'warning'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-red-500/20 text-red-300 border-red-500/40'
                          }`}
                        >
                          {trap.badge}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl text-paper font-medium mb-3">{trap.title}</h3>
                      <p className="text-on-ink-muted text-sm leading-relaxed">{trap.description}</p>
                    </div>

                    {/* Uncoded Hub Contrast Box */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-2">
                      <span className="text-signal-bright font-bold shrink-0">✓</span>
                      <p className="text-xs text-paper/90 font-medium leading-relaxed">{trap.contrast}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom Free Audit Strip inside Dark Section */}
          <Reveal delay={280}>
            <div className="mt-14 max-w-2xl mx-auto p-6 rounded-[24px] bg-white/[0.03] border border-white/10 text-center">
              <p className="text-paper text-sm font-medium">
                Find out how much revenue your current website is quietly leaking.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onBook}
                  className="bg-signal hover:bg-signal-bright text-paper text-xs md:text-sm font-medium px-6 py-2.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Schedule 20-min Discovery Call</span>
                  <span>→</span>
                </button>
                <Link
                  to="/portfolio"
                  className="text-on-ink-muted hover:text-paper text-xs md:text-sm font-medium px-4 py-2 transition-colors"
                >
                  Inspect our 6 live demos first
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── SECTION 3: The 3-Pillar Solution & Interactive App Mockup ──
          Cloaked Section 3: "Cloaked lets you take back control" */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="label text-signal font-semibold tracking-wider uppercase mb-2 block">
                02 · THE UNCODED HUB SYSTEM
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                Uncoded Hub gives you back your{' '}
                <em className="italic hero-signal font-normal">competitive edge.</em>
              </h2>
              <p className="text-lead text-muted mt-5 max-w-xl mx-auto">
                Everything you need to turn cold visitors into pre-sold enquiries — without you having
                to write copy, manage developers, or wait months.
              </p>
            </div>
          </Reveal>

          {/* 3 Pillar Columns with soft salmon badges */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {THREE_PILLARS.map((p, idx) => (
              <Reveal key={p.num} delay={idx * 80}>
                <div className="bg-paper-raised p-8 rounded-[24px] border border-rule-strong shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-8 h-8 rounded-full bg-signal/10 text-signal font-mono font-bold text-xs flex items-center justify-center">
                        {p.num}
                      </span>
                      <span className="text-[11px] font-mono text-signal bg-signal-wash px-2.5 py-0.5 rounded-full border border-signal/20">
                        {p.pill}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-ink font-medium mb-3">{p.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{p.p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Split Interactive Showcase (Cloaked Lifestyle + Notification Pills) */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Customer inquiry notification mockup */}
            <Reveal delay={120} className="lg:col-span-7">
              <div className="relative h-full min-h-[380px] rounded-[28px] overflow-hidden border border-rule-strong bg-paper-sunk p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <picture className="absolute inset-0 block w-full h-full">
                  <source media="(max-width: 767px)" srcSet="/our-service-mobile.webp" />
                  <img
                    src="/our-service.webp"
                    alt="Responsive website working across all devices"
                    className="w-full h-full object-cover grayscale opacity-25"
                  />
                </picture>

                <div className="relative z-10">
                  <span className="label text-signal font-semibold uppercase tracking-wider block mb-2">
                    REAL-TIME INQUIRY NOTIFICATIONS
                  </span>
                  <h4 className="font-display text-2xl text-ink font-medium max-w-md">
                    Inquiries that arrive educated, qualified, and ready to buy.
                  </h4>
                </div>

                {/* Floating Notification Cards (Cloaked style) */}
                <div className="relative z-10 space-y-3 mt-6">
                  {/* WhatsApp Lead Notification */}
                  <div className="bg-paper/95 backdrop-blur-md p-4 rounded-[16px] border border-rule-strong shadow-md flex items-start gap-3 max-w-md">
                    <span className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      WA
                    </span>
                    <div className="text-xs">
                      <div className="flex items-center justify-between gap-4">
                        <strong className="text-ink font-semibold">WhatsApp Inquiry · High Ticket</strong>
                        <span className="text-[10px] text-muted">2m ago</span>
                      </div>
                      <p className="text-muted mt-1 leading-normal">
                        "Hi Deepak! Saw your interior architecture portfolio. We're closing on a 4BHK villa in Indiranagar. Budget ₹45L. Can we do a concept diagnostic call Thursday?"
                      </p>
                    </div>
                  </div>

                  {/* Direct Calendar Booking */}
                  <div className="bg-paper/95 backdrop-blur-md p-4 rounded-[16px] border border-rule-strong shadow-md flex items-start gap-3 max-w-md ml-auto">
                    <span className="w-9 h-9 rounded-full bg-signal text-white flex items-center justify-center font-bold text-xs shrink-0">
                      CAL
                    </span>
                    <div className="text-xs">
                      <div className="flex items-center justify-between gap-4">
                        <strong className="text-ink font-semibold">Calendar Booking Confirmed</strong>
                        <span className="text-[10px] text-muted">Just now</span>
                      </div>
                      <p className="text-muted mt-1 leading-normal">
                        Pre-Sold Discovery Session booked for Friday at 11:30 AM IST. All intake questions answered.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Card: 7-Day Guarantee Spotlight */}
            <Reveal delay={180} className="lg:col-span-5">
              <div className="h-full rounded-[28px] overflow-hidden border border-rule-strong bg-paper-raised p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-full bg-signal/10 text-signal flex items-center justify-center mb-6">
                    <IconTimer className="w-6 h-6" />
                  </div>
                  <span className="label text-signal font-semibold uppercase tracking-wider block mb-1">
                    CONTRACTUAL DEADLINE
                  </span>
                  <h4 className="font-display text-3xl text-ink font-medium leading-snug">
                    If we are late, you do not pay.
                  </h4>
                  <p className="text-muted text-sm leading-relaxed mt-4">
                    Not a voucher, not a discount on your next project. If your site is not live
                    by the end of day seven under our published conditions, the build is free and you keep everything.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-rule flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-muted block">Signed by co-founders:</span>
                    <strong className="text-ink font-medium">Deepak & Geetha</strong>
                  </div>
                  <button onClick={onBook} className="btn-primary text-xs py-2 px-4">
                    Schedule call →
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── SECTION 4: High-Voltage Stat Bento Cards ──
          Cloaked Section 6: Massive solid orange/vermilion stat blocks */}
      <section className="py-20 bg-paper-sunk border-y border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="label text-signal font-semibold uppercase tracking-wider block mb-2">
                MEASURABLE STANDARDS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                Built for business owners who demand results.
              </h2>
            </div>
          </Reveal>

          {/* 3 High-Impact Solid Vermilion/Crimson Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={60}>
              <div className="bg-signal text-paper p-8 sm:p-10 rounded-[28px] shadow-lg flex flex-col justify-between h-full">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-paper/80 block mb-2">
                    Turnaround Timeline
                  </span>
                  <div className="font-display text-6xl sm:text-7xl font-bold tracking-tight text-paper">
                    7 Days
                  </div>
                </div>
                <p className="text-paper/90 text-sm mt-6 leading-relaxed font-sans">
                  From discovery call to live production deployment. No open-ended months of waiting.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-signal text-paper p-8 sm:p-10 rounded-[28px] shadow-lg flex flex-col justify-between h-full">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-paper/80 block mb-2">
                    On-Time Guarantee
                  </span>
                  <div className="font-display text-6xl sm:text-7xl font-bold tracking-tight text-paper">
                    100%
                  </div>
                </div>
                <p className="text-paper/90 text-sm mt-6 leading-relaxed font-sans">
                  Contractual delivery rate under our published guarantee. On time, or the build is free.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="bg-signal text-paper p-8 sm:p-10 rounded-[28px] shadow-lg flex flex-col justify-between h-full">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-paper/80 block mb-2">
                    Google PageSpeed
                  </span>
                  <div className="font-display text-6xl sm:text-7xl font-bold tracking-tight text-paper">
                    99+
                  </div>
                </div>
                <p className="text-paper/90 text-sm mt-6 leading-relaxed font-sans">
                  Verified mobile performance. Loads in under 1 second on real 4G devices worldwide.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── SECTION 5: Live Specimen Builds Carousel (The 6 Demos) ── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-sunken border border-rule mb-3">
                  <span className="w-2 h-2 rounded-full bg-signal animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-[10px] text-signal font-semibold uppercase tracking-wider">
                    03 · LIVE DEMO SPECIMENS
                  </span>
                  <span className="text-muted text-[10px] hidden sm:inline">· Auto-advancing (4.5s)</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                  Test the builds live before you commit.
                </h2>
                <p className="text-muted text-base max-w-xl mt-3">
                  Each build below is a complete, fully functional web application built to our production
                  standards. Click into any build to test live 3-theme switching and examine the conversion funnel.
                </p>
              </div>

              {/* Carousel navigation buttons and pause toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDemoPaused(!isDemoPaused)}
                  className="px-3 py-2 rounded-full border border-rule text-[11px] font-mono text-muted hover:text-ink transition-colors cursor-pointer"
                  title={isDemoPaused ? 'Resume auto-advance' : 'Pause auto-advance'}
                >
                  {isDemoPaused ? '▶ RESUME' : '❚❚ PAUSE'}
                </button>
                <button
                  onClick={prevDemo}
                  className="w-11 h-11 rounded-full border border-rule-strong bg-paper hover:bg-paper-raised text-ink flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous demo"
                >
                  ←
                </button>
                <button
                  onClick={nextDemo}
                  className="w-11 h-11 rounded-full border border-rule-strong bg-paper hover:bg-paper-raised text-ink flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next demo"
                >
                  →
                </button>
              </div>
            </div>

            {/* 6 Auto-Scroll Sector Tab Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
              {DEMO_SPECIMENS.map((demo, idx) => {
                const isActive = activeDemoIdx === idx;
                return (
                  <button
                    key={demo.client}
                    onClick={() => setActiveDemoIdx(idx)}
                    className={`px-3 py-2.5 rounded-[16px] border text-left transition-all cursor-pointer relative overflow-hidden ${
                      isActive
                        ? 'bg-paper-raised border-signal/80 text-ink shadow-sm'
                        : 'bg-paper-sunken/60 border-rule text-ink-muted hover:text-ink hover:border-rule-strong'
                    }`}
                  >
                    {isActive && !isDemoPaused && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-signal animate-progress"
                        style={{ animationDuration: '4500ms' }}
                      />
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-signal font-semibold">0{idx + 1}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
                      )}
                    </div>
                    <span className="text-xs font-medium block truncate text-ink">{demo.sector}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Current Active Demo Spotlight Card (Pauses auto-scroll on hover) */}
          <Reveal delay={100}>
            {(() => {
              const currentDemo = DEMO_SPECIMENS[activeDemoIdx];
              return (
                <div
                  onMouseEnter={() => setIsDemoPaused(true)}
                  onMouseLeave={() => setIsDemoPaused(false)}
                  className="bg-paper-raised border border-rule-strong rounded-[28px] overflow-hidden shadow-lg grid lg:grid-cols-12 gap-0 items-center transition-all duration-300"
                >
                  {/* Left: Thumbnail Browser Window */}
                  <div className="lg:col-span-7 bg-ink p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-rule-strong">
                    <div className="rounded-[16px] overflow-hidden border border-white/15 bg-paper">
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-ink text-paper text-[10px] font-mono border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-signal" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        </div>
                        <span className="text-white/60">specimen 0{activeDemoIdx + 1} of 06 · {currentDemo.sector}</span>
                        <span className="text-signal-bright font-semibold">3 THEMES</span>
                      </div>
                      <a href={currentDemo.url} target="_blank" rel="noreferrer noopener" className="block relative group">
                        <img
                          key={currentDemo.thumbnail}
                          src={currentDemo.thumbnail}
                          alt={currentDemo.client}
                          className="w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 animate-fade-in"
                        />
                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-ink/90 text-paper text-xs font-mono px-4 py-2 rounded-full shadow-lg">
                            Open Live Demo ↗
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Right: Specimen Details & Launch */}
                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="label text-signal font-semibold tracking-wider uppercase">
                          {currentDemo.sector}
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                          Specimen 0{activeDemoIdx + 1} / 06
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mt-1 mb-4">
                        {currentDemo.client}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed mb-6">
                        {currentDemo.summary}
                      </p>
                      <div className="space-y-2 text-xs text-ink/80">
                        <div className="flex items-center gap-2">
                          <span className="text-signal font-bold">✓</span>
                          <span>Interactive 3-style visual theme switcher</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-signal font-bold">✓</span>
                          <span>Tailored lead conversion questionnaire</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-signal font-bold">✓</span>
                          <span>99+ Verified Lighthouse mobile performance</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-rule flex items-center justify-between gap-4">
                      <a
                        href={currentDemo.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
                      >
                        <span>Test this demo live</span>
                        <span>↗</span>
                      </a>
                      <Link to="/portfolio" className="text-xs text-muted hover:text-ink font-medium">
                        View all 6 demos →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Reveal>
        </Shell>
      </Section>

      {/* ── SECTION 04: The 7-Day Sprint Blueprint (The Process) ────────────────── */}
      <section className="py-20 md:py-28 bg-paper-sunken/40 border-y border-rule relative overflow-hidden">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paper-raised border border-rule-strong mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-signal" aria-hidden="true" />
                <span className="font-mono text-xs text-ink uppercase tracking-wider font-semibold">
                  04 · 7-DAY DELIVERY SYSTEM
                </span>
              </div>
              <p className="label text-signal font-mono text-xs tracking-wider mb-2">
                TRANSPARENT CLIENT PROCESS
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                The 7-Day Sprint Blueprint.
              </h2>
              <p className="text-lead text-muted mt-4 max-w-2xl mx-auto">
                Three clear, predictable milestones — the client's-eye view, not the internal production schedule.
                You always know what is being built, who is building it, and exactly when it goes live.
              </p>
            </div>
          </Reveal>

          {/* 3 Cloaked-Style Bento Step Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 */}
            <Reveal delay={60}>
              <div className="bg-paper-raised p-8 sm:p-9 rounded-[28px] border border-rule-strong shadow-sm hover:shadow-md hover:border-ink/30 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-signal/10 text-signal font-mono font-bold text-sm flex items-center justify-center border border-signal/20 group-hover:scale-105 transition-transform">
                        01
                      </span>
                      <div className="w-8 h-8 rounded-full bg-paper-sunken border border-rule flex items-center justify-center text-signal">
                        <IconCompass className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-signal bg-signal-wash px-2.5 py-0.5 rounded-full border border-signal/20">
                      DAY 01 · SCOPE LOCK
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Schedule &amp; Scope
                  </h3>
                  <p className="text-muted leading-relaxed text-sm mb-6">
                    Book your 20-minute discovery call directly with Deepak &amp; Geetha. We identify your high-margin offerings, diagnose why visitors currently bounce, and lock your scope sheet.
                  </p>

                  <ul className="space-y-2 text-xs text-ink/80 pt-4 border-t border-rule">
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>20-minute founder discovery call</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>Fixed-price written scope sheet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>Wireframe &amp; narrative direction</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-rule bg-paper-sunken/60 -mx-8 -mb-8 p-5 sm:p-6 rounded-b-[28px]">
                  <p className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    <span className="text-signal">⚡</span>
                    <span>Benefit: Absolute clarity before a single line of code is written.</span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={120}>
              <div className="bg-paper-raised p-8 sm:p-9 rounded-[28px] border border-rule-strong shadow-sm hover:shadow-md hover:border-ink/30 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-signal/10 text-signal font-mono font-bold text-sm flex items-center justify-center border border-signal/20 group-hover:scale-105 transition-transform">
                        02
                      </span>
                      <div className="w-8 h-8 rounded-full bg-paper-sunken border border-rule flex items-center justify-center text-signal">
                        <IconBrackets className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-signal bg-signal-wash px-2.5 py-0.5 rounded-full border border-signal/20">
                      DAYS 02–05 · BUILD
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Design &amp; Engineering
                  </h3>
                  <p className="text-muted leading-relaxed text-sm mb-6">
                    Geetha crafts the custom editorial design system and typography; Deepak engineers sub-1.0s fast React &amp; Vite code with seamless lead capture hooks.
                  </p>

                  <ul className="space-y-2 text-xs text-ink/80 pt-4 border-t border-rule">
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>100% bespoke design (zero templates)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>Next-gen React 19 &amp; Vite speed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>Calendar, WhatsApp &amp; CRM hooks</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-rule bg-paper-sunken/60 -mx-8 -mb-8 p-5 sm:p-6 rounded-b-[28px]">
                  <p className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    <span className="text-signal">⚡</span>
                    <span>Benefit: You don't have to write copy or manage a developer.</span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={180}>
              <div className="bg-paper-raised p-8 sm:p-9 rounded-[28px] border border-rule-strong shadow-sm hover:shadow-md hover:border-ink/30 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-signal/10 text-signal font-mono font-bold text-sm flex items-center justify-center border border-signal/20 group-hover:scale-105 transition-transform">
                        03
                      </span>
                      <div className="w-8 h-8 rounded-full bg-paper-sunken border border-rule flex items-center justify-center text-signal">
                        <IconLaunch className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-signal bg-signal-wash px-2.5 py-0.5 rounded-full border border-signal/20">
                      DAYS 06–07 · LAUNCH
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Verification &amp; Handover
                  </h3>
                  <p className="text-muted leading-relaxed text-sm mb-6">
                    We run rigorous cross-device audits, verify 95+ Lighthouse mobile benchmarks, point your DNS live, and hand over 100% of your source code repository.
                  </p>

                  <ul className="space-y-2 text-xs text-ink/80 pt-4 border-t border-rule">
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>95+ Google Lighthouse verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>100% full Git code ownership</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-signal font-bold">✓</span>
                      <span>30-day post-launch warranty</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-rule bg-paper-sunken/60 -mx-8 -mb-8 p-5 sm:p-6 rounded-b-[28px]">
                  <p className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    <span className="text-signal">⚡</span>
                    <span>Benefit: Serious prospects are pre-sold before they ever message you.</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom Commitment Strip */}
          <Reveal delay={240}>
            <div className="mt-14 max-w-4xl mx-auto p-4 sm:p-5 rounded-[20px] bg-paper-raised border border-rule-strong shadow-xs flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-mono text-ink">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>Fixed price in writing</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>7 working days contractual</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>Late means free guarantee</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>100% client code ownership</span>
              </span>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── SECTION 05: Standards & Performance ─────────────────────── */}
      <section className="py-20 md:py-28 bg-paper">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading & Evidence Argument */}
            <Reveal className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paper-sunken border border-rule mb-4">
                <span className="w-2 h-2 rounded-full bg-signal" aria-hidden="true" />
                <span className="font-mono text-xs text-ink uppercase tracking-wider font-semibold">
                  05 · ENGINEERING STANDARDS
                </span>
              </div>

              <p className="label text-signal font-mono text-xs tracking-wider mb-2">
                EMPIRICAL VERIFICATION
              </p>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight leading-[1.08]">
                The numbers we hold ourselves to.
              </h2>

              <p className="text-muted leading-relaxed mt-6 text-sm sm:text-base">
                We are a young studio, so we don't show you a wall of borrowed client logos.
                Instead, we publish the exact engineering standards every single site we ship is contractually verified against.
              </p>

              <p className="text-muted leading-relaxed mt-4 text-sm sm:text-base">
                Open your browser's developer tools, run Google Lighthouse on this page, and check the
                numbers yourself. That is a vastly more honest signal than any agency sales pitch.
              </p>

              {/* Lab Audit Badge */}
              <div className="mt-8 p-4 rounded-[18px] bg-paper-sunken/80 border border-rule-strong flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-ink">Lighthouse 99 / 100</span>
                  </div>
                  <span className="text-[11px] text-muted block mt-0.5">Tested on live 4G mobile emulation</span>
                </div>
                <Link to="/portfolio" className="btn-primary text-xs py-2 px-4 shrink-0">
                  Inspect Demos →
                </Link>
              </div>
            </Reveal>

            {/* Right Column: 6 Bento Metric Specimen Cards */}
            <Reveal delay={120} className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {BUDGET.map((b) => (
                  <div
                    key={b.metric}
                    className="bg-paper-raised p-5 sm:p-6 rounded-[24px] border border-rule-strong shadow-xs hover:shadow-md hover:border-signal/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-full bg-signal/10 text-signal flex items-center justify-center mb-4">
                        <b.Icon className="w-4 h-4" />
                      </div>
                      <span className="font-display text-3xl sm:text-4xl font-bold text-ink block tracking-tight">
                        {b.value}
                      </span>
                      <span className="text-xs font-semibold text-ink leading-snug block mt-1">
                        {b.metric}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-signal bg-signal-wash px-2 py-0.5 rounded-full inline-block mt-4 border border-signal/20 w-fit">
                      {b.target}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── SECTION 8: Studio Founders (Deepak & Geetha) ───────────── */}
      <Section tone="sunk">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[20px] overflow-hidden border border-rule-strong bg-paper shadow-sm">
                  <picture className="w-full aspect-[3/4] block">
                    <source media="(max-width: 767px)" srcSet="/deepak-mobile.webp" />
                    <img
                      src="/deepak.webp"
                      alt="Deepak, co-founder"
                      width={540}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale"
                    />
                  </picture>
                  <div className="p-3 text-center border-t border-rule">
                    <strong className="text-xs text-ink block">Deepak</strong>
                    <span className="text-[10px] text-muted">Development</span>
                  </div>
                </div>

                <div className="rounded-[20px] overflow-hidden border border-rule-strong bg-paper shadow-sm">
                  <picture className="w-full aspect-[3/4] block">
                    <source media="(max-width: 767px)" srcSet="/geetha-mobile.webp" />
                    <img
                      src="/geetha.webp"
                      alt="Geetha, co-founder"
                      width={700}
                      height={700}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top grayscale"
                    />
                  </picture>
                  <div className="p-3 text-center border-t border-rule">
                    <strong className="text-xs text-ink block">Geetha</strong>
                    <span className="text-[10px] text-muted">Design & Copy</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <SectionHead index="06" eyebrow="The studio" title="Two people. Both of them on your project." />
              <p className="text-muted leading-relaxed mt-6 max-w-xl">
                We are Deepak and Geetha, a brother and sister running a two-person studio in
                Bengaluru. Geetha designs, Deepak builds, and the person you meet on the discovery
                call is the person who does the work. There is no account manager between you and
                the people making decisions about your site.
              </p>
              <p className="text-muted leading-relaxed mt-4 max-w-xl">
                It also means we take on a capped number of builds per month. That is a real
                quality constraint, not an artificial marketing scarcity tactic.
              </p>
              <div className="mt-8">
                <Link to="/about" className="link-underline text-ink text-sm font-medium">
                  More about how we work →
                </Link>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── SECTION 9: FAQ Accordion ──────────────────────────────── */}
      <Section>
        <Shell width="narrow">
          <Reveal>
            <SectionHead index="07" eyebrow="Questions" title="Asked before every project." />
          </Reveal>
          <div className="mt-14">
            <FaqAccordion />
          </div>
        </Shell>
      </Section>

      {/* ── SECTION 10: Lead Magnet (The 10-Point Audit) ───────────── */}
      <Section id="lead-magnet" tone="ink" size="default">
        <Shell>
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="label text-signal-bright">08</span>
              <span className="label text-on-ink-muted">Free diagnostic resource</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-end mb-12">
              <h2 className="font-display text-3xl sm:text-4xl text-on-ink font-normal">
                Score your own site.<br />
                <em className="italic text-signal-bright font-normal">Before</em> you book a call.
              </h2>
              <p className="text-lead text-on-ink-muted leading-relaxed">
                The Pre-Sold Prospects Audit — the same 10-point trust diagnostic we run for every client, now in your hands.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Cover card */}
            <Reveal className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative bg-paper-raised border border-rule-strong rounded-[24px] overflow-hidden shadow-2xl p-3 flex items-center justify-center">
                <img
                  src="/lead-magnet-cover.webp"
                  alt="The Pre-Sold Prospects Audit"
                  className="w-full h-auto object-contain rounded-[18px]"
                  width={1200}
                  height={680}
                  loading="lazy"
                />
              </div>

              <div>
                <p className="label text-on-ink-muted mb-4">What's inside</p>
                <ul className="space-y-3">
                  {[
                    { label: 'The 10-point trust test', sub: 'We score every client site against this before we start.' },
                    { label: 'Your scoring band', sub: 'Silent Loss, Leaking, or Near Your Ceiling.' },
                    { label: 'The silent objections', sub: 'What a skeptical prospect thinks before they message you.' },
                    { label: '20-minute action checklist', sub: 'One fix per point, ordered by where you scored lowest.' },
                  ].map(({ label, sub }) => (
                    <li key={label} className="flex gap-3 items-start text-xs">
                      <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-signal/20 text-signal-bright flex items-center justify-center font-bold">
                        ✓
                      </span>
                      <span>
                        <strong className="text-on-ink font-medium block">{label}</strong>
                        <span className="text-on-ink-muted">{sub}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Right: Form card */}
            <Reveal delay={120} className="lg:col-span-7">
              <div className="bg-paper-raised border border-rule-strong rounded-[24px] overflow-hidden shadow-2xl">
                <div className="bg-signal px-6 py-4 flex items-center gap-3">
                  <span className="text-paper font-bold text-sm">⚡</span>
                  <p className="font-sans font-semibold text-paper text-sm">
                    Get the free audit — lands in your inbox in 60 seconds
                  </p>
                </div>
                <div className="p-6 md:p-8">
                  <LeadMagnetForm embedded />
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── SECTION 11: Cloaked-Style Modern Dual-Card Closing Lead Capture CTA ── */}
      <section className="bg-paper-sunken/70 text-ink py-20 sm:py-28 border-t border-rule">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center bg-ink text-paper border border-white/10 rounded-[32px] p-8 sm:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
              {/* Left Brand Mark */}
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <LogoMark size={48} />
                    <span className="font-display text-2xl text-paper font-medium">Uncoded Hub</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight">
                    Fixed price. Seven working days.<br />
                    <span className="text-signal-bright italic">On time or free.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    No deck and no sales pitch. Book a 20-minute call to see if your business is
                    the right fit for our seven-day sprint.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-mono text-on-ink-muted">
                  <span>● Deepak &amp; Geetha</span>
                  <span>·</span>
                  <span>Bengaluru, India</span>
                  <span>·</span>
                  <span>Working globally</span>
                </div>
              </div>

              {/* Right CTA Action Card */}
              <div className="md:col-span-6 bg-white/[0.06] p-6 sm:p-8 rounded-[24px] border border-white/15 flex flex-col justify-between shadow-inner">
                <div>
                  <span className="text-[11px] font-mono text-signal-bright uppercase tracking-wider block mb-2 font-semibold">
                    RESERVE YOUR BUILD COHORT
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Ready to let your website sell before you do?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Leave with a written scope, a fixed price, and a defined delivery date — or an honest recommendation if you need something else.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onBook}
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Schedule My FREE 20-Minute Call</span>
                    <span>→</span>
                  </button>
                  <Link
                    to="/contact"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Or send us a written brief instead
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      <FloatingLeadMagnetBanner />
    </>
  );
}
