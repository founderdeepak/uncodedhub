import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { LeadMagnetForm } from '../components/ui/LeadMagnetForm';
import { PROJECTS, Project } from '../data/projects';

/* ═══════════════════════════════════════════════════════════════════
   UNCODED HUB — HOMEPAGE
   Customer-focused, grounded, high-trust studio homepage:
   01 Header: Clean navigation & single booking CTA (in App.tsx)
   02 Hero: Customer desire, solution, and clear 20-min call CTA
   03 Trust Strip: 3 clean metrics (7 Days*, 100% Ownership, 2 Founders)
   04 Customer Problem: Why getting a good website shouldn't be difficult
   05 The Uncoded Hub Solution: 3 clear customer benefits
   06 Sample Enquiry Demonstration: Realistic WhatsApp & booking flows
   07 Featured Demos: 6 diverse industry examples + link to all 50
   08 How It Works: 3 simple stages + contractual on-time guarantee
   09 Proof & Engineering Standards: Real tests & genuine work
   10 Meet the Founders: Deepak & Geetha, authentic story
   11 Regional Hubs: Bengaluru & Global markets introduction
   12 Homepage FAQs: 8 essential buying questions
   13 Free Website Audit: Single, high-value lead magnet
   14 Final CTA: Book 20-min call or send project brief
   ═══════════════════════════════════════════════════════════════════ */

interface HomeProps {
  onBook?: () => void;
}

const FEATURED_DEMO_IDS = [
  'interior-design',
  'dental-clinic',
  'gym-fitness-club',
  'financial-advisors',
  'caterers',
  'real-estate',
];

const HOMEPAGE_FAQS = [
  {
    q: 'What does Uncoded Hub build?',
    a: 'We design and build bespoke, high-converting websites for ambitious service businesses, medical clinics, architecture practices, and growing companies in India and around the world. Every site is custom hand-coded using modern React with tailored copywriting, mobile-first design, and conversion-focused booking flows.',
  },
  {
    q: 'How much does a website cost?',
    a: 'We offer transparent, fixed pricing published upfront. In India, our sprints range from ₹35,000 for single-page flagships to ₹85,000 for full custom business platforms. For international clients, sprints range from $1,800 to $3,800 USD (or equivalent in GBP, EUR, AED, AUD). There are no hidden fees, hourly surprises, or monthly maintenance lock-ins.',
  },
  {
    q: 'How does the seven-working-day process work?',
    a: 'Once we align on your scope and receive your core assets on Day 1, your sprint begins. Day 1 is strategic planning and architecture. Days 2–5 are visual design and custom engineering with daily 5-minute video updates. Days 6–7 are cross-device testing, speed audits, and live launch. You work directly with founders Deepak and Geetha throughout.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Very little. We start with a focused 20-minute discovery call to understand your business, ideal customers, and goals. After that, we just need your logo, high-resolution photos (or we source curated imagery), service details, and domain access. We handle the copywriting, layout, and technical build.',
  },
  {
    q: 'Who will actually work on my website?',
    a: 'Deepak and Geetha directly. Geetha handles the design direction, visual typography, and messaging. Deepak handles the engineering, speed architecture, and interactive features. We do not use account managers, junior temps, or outsourced agencies.',
  },
  {
    q: 'Who owns my website and code?',
    a: 'You do — 100%. Upon completion, we hand over the full clean source code, connect your custom domain, and transfer all assets. You own everything outright with zero vendor lock-in and zero hostage retainers.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes. Over half of our work is for international clients across the US, UK, Australia, UAE, Canada, and Europe. We invoice in your native currency (USD, GBP, EUR, AED, AUD) and communicate asynchronously via Loom video updates and scheduled meetings in your timezone.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes 30 days of direct founder support for any minor tweaks, questions, or bug fixes. Because our code is clean and standardized, any competent developer in the world can maintain it, or you can hire us for ongoing feature sprints.',
  },
];

export default function Home({ onBook }: HomeProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleBooking = () => {
    if (onBook) {
      onBook();
    } else {
      window.location.href = '/contact/#book';
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // 6 Featured Demos for the clean homepage grid
  const featuredDemos = useMemo(() => {
    return FEATURED_DEMO_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(
      Boolean
    ) as Project[];
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Uncoded Hub',
    description:
      'Custom websites built for ambitious businesses in India and around the world. Direct senior founder engineering by Deepak & Geetha in a 7-working-day sprint.',
    url: 'https://uncodedhub.com/',
    telephone: '+91 86608 19023',
    priceRange: '₹35,000 - ₹85,000 / $1,800 - $3,800 USD',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    founder: [
      {
        '@type': 'Person',
        name: 'Deepak Ravi',
        jobTitle: 'Co-Founder & Web Systems Architect',
      },
      {
        '@type': 'Person',
        name: 'Geetha',
        jobTitle: 'Co-Founder & Creative Director',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Uncoded Hub — Custom Websites Built for Businesses That Think Bigger</title>
        <meta
          name="description"
          content="We build custom websites for ambitious businesses in India and around the world. Work directly with founders Deepak & Geetha in a focused 7-working-day sprint. On time or 100% free."
        />
        <link rel="canonical" href="https://uncodedhub.com/" />
        <meta property="og:title" content="Uncoded Hub — Custom Websites Built for Businesses That Think Bigger" />
        <meta
          property="og:description"
          content="Work directly with founders Deepak & Geetha. Fixed scope, fixed price, and a focused 7-working-day build. Explore 50 live industry demos."
        />
        <meta property="og:url" content="https://uncodedhub.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── 01. Hero Section ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="card-tag">FOUNDER-LED WEB STUDIO</span>
                <span className="text-xs font-mono text-muted">·</span>
                <span className="text-xs font-mono text-signal">Deepak &amp; Geetha Direct Delivery</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.08] mb-6">
                Let your website sell <br />
                <span className="text-signal italic font-serif">before you do.</span>
              </h1>

              <p className="text-base sm:text-xl text-muted font-normal leading-relaxed max-w-3xl mb-8">
                Your website should build trust, explain why customers should choose you, and make
                it easy for them to get in touch. We build custom websites for ambitious businesses
                in India and around the world. Work directly with founders Deepak and Geetha, with a
                clear scope, fixed price, and a focused seven-working-day build for projects that fit
                the sprint.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-8 !py-4 text-xs sm:text-sm rounded-full shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book Your Free 20-Minute Call</span>
                  <span>→</span>
                </button>

                <a
                  href="#demos"
                  className="px-6 py-4 rounded-full border border-rule hover:border-signal text-ink font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 bg-paper-sunken"
                >
                  <span>Explore Our 50 Live Demos</span>
                  <span>↓</span>
                </a>
              </div>

              <p className="text-xs font-mono text-muted mb-10">
                No sales pitch. Just an honest conversation about what your business needs.
              </p>

              {/* 3 Clean Proof Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-rule">
                <div className="p-4 rounded-2xl bg-paper-sunken border border-rule">
                  <span className="font-display text-3xl text-signal font-normal block mb-1">
                    7 Working Days*
                  </span>
                  <span className="text-xs text-muted font-mono leading-relaxed block">
                    *For projects that fit the agreed sprint scope. On time or 100% free.
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-paper-sunken border border-rule">
                  <span className="font-display text-3xl text-ink font-normal block mb-1">
                    100% Client Ownership
                  </span>
                  <span className="text-xs text-muted font-mono leading-relaxed block">
                    You own all clean code, domain records, and Figma assets outright.
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-paper-sunken border border-rule">
                  <span className="font-display text-3xl text-ink font-normal block mb-1">
                    2 Founders
                  </span>
                  <span className="text-xs text-muted font-mono leading-relaxed block">
                    Deepak &amp; Geetha personally design and code your project. Zero junior handoffs.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 02. The Customer Problem (Agency Reality) ────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">WHY WE BUILT UNCODED HUB</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-6">
                Getting a good website shouldn&apos;t be this difficult.
              </h2>
              <div className="text-base sm:text-lg text-muted leading-relaxed space-y-4 font-normal">
                <p>
                  You&apos;ve probably heard the stories. Projects that take months. Prices that
                  keep changing. People who sell you the project but disappear when the actual work
                  begins.
                </p>
                <p>
                  <strong className="text-ink font-medium">That&apos;s not how we work.</strong> You
                  speak directly with the people building your website. Deepak handles the
                  engineering. Geetha handles the design. Your scope and price are agreed before work
                  begins. Your website belongs to you.
                </p>
                <p>
                  No unnecessary hand-offs. No confusing process. Just two people taking
                  responsibility for your project.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 3 Contrast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.05}>
              <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-rule h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-signal block mb-2">01 · Direct Contact</span>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Direct Founder Accountability
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    You never deal with account executives or junior middlemen. You collaborate
                    directly with the two senior specialists who write every line of code and design
                    every screen.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule text-xs font-mono text-signal">
                  ✓ Direct Slack &amp; Loom communication
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-rule h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-signal block mb-2">02 · Fixed Schedule</span>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Fixed 7-Day Sprint Protocol
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Instead of dragging your project across 4 months of status calls, we agree on a
                    tight, fixed scope and deliver your complete website in seven working days.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule text-xs font-mono text-signal">
                  ✓ On time or 100% free guarantee
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-rule h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-signal block mb-2">03 · Zero Lock-In</span>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    100% Client Ownership
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    We don&apos;t hold your digital assets hostage. You receive your complete clean
                    GitHub repository, domain credentials, and design files with zero monthly maintenance
                    traps.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule text-xs font-mono text-signal">
                  ✓ Full source code &amp; IP transfer
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 03. The Uncoded Hub Solution (3 Clear Benefits) ──────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="card-tag mb-3">WHAT YOU GET</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                A website built around your business goals.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                Technical excellence is our delivery method. A digital presence that builds trust
                and wins more customers is what you&apos;re actually buying.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.05}>
              <div className="p-8 rounded-3xl bg-paper-sunken border border-rule h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-signal/10 border border-signal/20 text-signal flex items-center justify-center text-xl mb-6">
                    ✍️
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Your message, made clear
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    We help explain what your business does, who you help, and why customers should
                    choose you. Clear headlines, persuasive positioning, and zero confusing buzzwords.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-rule text-xs font-mono text-ink-soft">
                  Positioning · Value proposition · Actionable CTAs
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-8 rounded-3xl bg-paper-sunken border border-rule h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-signal/10 border border-signal/20 text-signal flex items-center justify-center text-xl mb-6">
                    ⚡
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    A fast, well-built website
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    We build custom websites that work smoothly across phones, tablets, and
                    computers. Hand-coded modern React with next-generation WebP images that load in
                    under a second without bloated plugins.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-rule text-xs font-mono text-ink-soft">
                  Mobile-first · Sub-second speed · Accessible UX
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-8 rounded-3xl bg-paper-sunken border border-rule h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-signal/10 border border-signal/20 text-signal flex items-center justify-center text-xl mb-6">
                    🧭
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    A clear process from start to finish
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    You know the price, scope, timeline, and who is responsible for the work before
                    we begin. No surprise invoices, no scope creep, and no missed deadlines.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-rule text-xs font-mono text-ink-soft">
                  Fixed pricing · Agreed scope · 7-day milestone
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 04. Sample Enquiry Demonstration ─────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-2xl mb-12">
              <span className="card-tag mb-3">CONVERSION IN ACTION</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight mb-3">
                Example of how your website enquiries could look.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Sample demonstrations showing how modern booking flows and instant WhatsApp
                enquiries connect qualified customers directly to your business without friction.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* WhatsApp Notification Card */}
            <Reveal delay={0.05}>
              <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-rule shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-lg font-bold">
                    💬
                  </div>
                  <div>
                    <h4 className="font-display text-base text-ink font-medium">
                      Direct WhatsApp Enquiry
                    </h4>
                    <span className="text-[11px] font-mono text-muted">
                      Sample visitor enquiry flow
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-paper-sunken border border-rule text-xs sm:text-sm text-ink font-sans leading-relaxed">
                  <p className="text-muted italic mb-2">Incoming WhatsApp message:</p>
                  <p className="font-medium">
                    &ldquo;Hi! I reviewed your clinic&apos;s treatment cases on your website and would
                    like to book a consultation this Thursday afternoon.&rdquo;
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-muted">
                  <span>✓ 1-tap pre-filled intent</span>
                  <span className="text-emerald-600 font-medium">Instant conversion</span>
                </div>
              </div>
            </Reveal>

            {/* Calendar Booking Card */}
            <Reveal delay={0.1}>
              <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-rule shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-signal/10 text-signal flex items-center justify-center text-lg font-bold">
                    📅
                  </div>
                  <div>
                    <h4 className="font-display text-base text-ink font-medium">
                      Automated Calendar Booking
                    </h4>
                    <span className="text-[11px] font-mono text-muted">
                      Sample appointment confirmation
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-paper-sunken border border-rule text-xs sm:text-sm text-ink font-sans leading-relaxed">
                  <p className="text-muted italic mb-2">Calendar booking notification:</p>
                  <p className="font-medium">
                    &ldquo;New 20-min consultation booked with Dr. Sarah Jenkins for Architecture
                    Consultation via Google Meet.&rdquo;
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-muted">
                  <span>✓ Synced to your Google Calendar</span>
                  <span className="text-signal font-medium">Zero back-and-forth</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 05. Featured Demos (6 Diverse Examples + Link to 50) ─────── */}
      <section id="demos" className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <span className="card-tag mb-3">LIVE SPECIMENS</span>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                  Don&apos;t just imagine your new website. See it.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                  We&apos;ve created 50 live website demos for different industries. Explore the
                  design, test the features, and see how your website could be built around your
                  business. Every demo is a sample concept, not a claim of completed client work.
                </p>
              </div>

              <Link
                to="/portfolio/"
                className="btn-primary !py-3.5 !px-6 text-xs rounded-full shrink-0 shadow-xs inline-flex items-center gap-2 self-start md:self-auto"
              >
                <span>Explore All 50 Demos</span>
                <span>→</span>
              </Link>
            </div>
          </Reveal>

          {/* 6 Curated Demos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredDemos.map((demo) => {
              const thumbnail =
                demo.themes?.[0]?.image || '/demos/thumbnails/interior-design-theme1.webp';
              return (
                <Reveal key={demo.id}>
                  <div className="group h-full rounded-3xl bg-paper-sunken border border-rule hover:border-signal/50 transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md">
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 border-b border-rule">
                        <img
                          src={thumbnail}
                          alt={demo.client}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink/80 text-paper backdrop-blur-md text-[10px] font-mono uppercase tracking-wider">
                          {demo.sector}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-display text-xl text-ink font-medium group-hover:text-signal transition-colors mb-2">
                          {demo.client}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                          {demo.summary}
                        </p>
                        <div className="text-[11px] font-mono text-signal bg-signal/10 px-3 py-1.5 rounded-lg border border-signal/20 inline-block mb-2">
                          {demo.conversionEngine}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="p-6 pt-0">
                      <a
                        href={demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium shadow-xs"
                      >
                        <span>Open Live Demo</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/portfolio/"
              className="inline-flex items-center gap-2 text-xs font-mono text-signal hover:underline"
            >
              <span>View all 50 industry demos across Medical, Legal, Architecture &amp; More →</span>
            </Link>
          </div>
        </Shell>
      </section>

      {/* ── 06. How It Works (The 7-Day Sprint Blueprint) ────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-2xl mb-14">
              <span className="card-tag mb-3">THE SPRINT PROTOCOL</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-3">
                Your new website, step by step.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                The seven-working-day timeline applies to projects that fit the agreed scope and
                start conditions. Here is exactly what happens during your sprint week.
              </p>
            </div>
          </Reveal>

          {/* 3 Simple Stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Reveal delay={0.05}>
              <div className="p-8 rounded-3xl bg-paper border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-xs font-mono text-signal block mb-3">Stage 01 · Day 1</span>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">Plan</h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    We discuss your business, your customers, and what your website needs to achieve
                    on a focused 20-minute call. You receive a clear scope, fixed price, and agreed
                    launch date before work begins.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-rule text-xs font-mono text-muted">
                  Alignment · Asset intake · Scope sign-off
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-8 rounded-3xl bg-paper border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-xs font-mono text-signal block mb-3">Stage 02 · Days 2–5</span>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Design and Build
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Geetha works on the design direction, typography, and content. Deepak builds the
                    clean React code and interactive features. You get daily 5-minute video updates
                    to review progress along the way.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-rule text-xs font-mono text-muted">
                  Daily Loom check-ins · Direct founder execution
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-8 rounded-3xl bg-paper border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-xs font-mono text-signal block mb-3">Stage 03 · Days 6–7</span>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Test and Launch
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    We check the website across phones, tablets, and computers, make the agreed final
                    refinements, point your domain, and hand over complete ownership of your code and
                    assets.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-rule text-xs font-mono text-signal">
                  Cross-device QA · Domain connection · 100% handover
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contractual Guarantee Callout */}
          <Reveal>
            <div className="p-8 sm:p-10 rounded-3xl bg-paper border-2 border-signal/30 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 text-signal font-mono text-xs uppercase tracking-wider mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                    <span>Contractual On-Time Guarantee</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal mb-2">
                    On time, or your entire build is free.
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    We agree on the project scope and timeline before work begins. If we fail to
                    deliver the agreed website within seven working days due to a delay on our side,
                    you pay nothing for the build. No excuses. No hidden conditions. Just a promise
                    we stand behind.
                  </p>
                </div>

                <div className="text-xs font-mono text-muted shrink-0 space-y-1">
                  <div>✓ Written contractual guarantee</div>
                  <div>✓ Fixed launch milestone</div>
                  <Link to="/terms/" className="text-signal hover:underline block pt-1">
                    Read Full Terms &amp; Conditions →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 07. Proof & Engineering Standards ────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">CRAFT OVER CLAIMS</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                We believe in showing our work.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                We&apos;re a young studio, so we won&apos;t fill this page with borrowed client logos
                or made-up results. Instead, you can explore our 50 live demos, test how fast they
                load on your phone, and inspect the quality of the websites we build.
              </p>
            </div>
          </Reveal>

          {/* 5 Verifiable Standards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-paper-sunken border border-rule">
              <span className="text-xl block mb-2">📱</span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Mobile Performance</h4>
              <p className="text-xs text-muted leading-relaxed">
                Optimized for sub-second mobile loading on cellular networks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-paper-sunken border border-rule">
              <span className="text-xl block mb-2">📐</span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Responsive Layouts</h4>
              <p className="text-xs text-muted leading-relaxed">
                Fluid design that looks intentional on every screen size.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-paper-sunken border border-rule">
              <span className="text-xl block mb-2">👁️</span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Accessibility Basics</h4>
              <p className="text-xs text-muted leading-relaxed">
                High-contrast readable typography and intuitive keyboard navigation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-paper-sunken border border-rule">
              <span className="text-xl block mb-2">🧱</span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Clear Page Hierarchy</h4>
              <p className="text-xs text-muted leading-relaxed">
                Semantic HTML structure that visitors and Google understand immediately.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-paper-sunken border border-rule">
              <span className="text-xl block mb-2">📬</span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Working Funnels</h4>
              <p className="text-xs text-muted leading-relaxed">
                Verified WhatsApp buttons, appointment booking, and tested forms.
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 08. Meet the Founders (Deepak & Geetha) ──────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="card-tag mb-3">THE STUDIO</span>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-6">
                  Two people. Both of them on your project.
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-normal">
                  <p>
                    We&apos;re Deepak and Geetha, a brother-and-sister team based in Bengaluru.
                  </p>
                  <p>
                    Geetha takes care of the design, layout, and visual experience. Deepak handles
                    the planning, engineering, and development.
                  </p>
                  <p>
                    When you speak with us, you&apos;re speaking directly with the people who will
                    work on your website. We keep our team small because we believe good work starts
                    with clear communication and personal responsibility.
                  </p>
                  <p className="font-medium text-ink">
                    No hand-offs. No mystery team. Just us, working with you.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/about/"
                    className="btn-primary !py-3 !px-6 text-xs rounded-full inline-flex items-center gap-2"
                  >
                    <span>Read Our Story &amp; Principles</span>
                    <span>→</span>
                  </Link>

                  <a
                    href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border border-rule hover:border-signal text-ink font-mono text-xs transition-colors bg-paper"
                  >
                    WhatsApp Co-Founders ↗
                  </a>
                </div>
              </div>

              {/* Founder Photos Side */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-3xl bg-paper border border-rule shadow-xs text-center">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-ink/5">
                    <img
                      src="/deepak.webp"
                      alt="Deepak - Co-Founder & Systems Architect"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-display text-base text-ink font-medium">Deepak Ravi</h4>
                  <span className="text-[11px] font-mono text-muted block">Engineering &amp; Code</span>
                </div>

                <div className="p-3 rounded-3xl bg-paper border border-rule shadow-xs text-center">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-ink/5">
                    <img
                      src="/geetha.webp"
                      alt="Geetha - Co-Founder & Creative Director"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-display text-base text-ink font-medium">Geetha</h4>
                  <span className="text-[11px] font-mono text-muted block">Design &amp; Layout</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 09. Regional Hubs (Bengaluru & Global Markets) ────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="card-tag mb-3">GLOBAL REACH · LOCAL ROOTS</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-3">
                A Bengaluru web design studio, working worldwide.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                We&apos;re based in Bengaluru, India, and work with businesses across India and around
                the world. Whether you&apos;re in Indiranagar, Whitefield, London, Dubai, or
                elsewhere, you work directly with Deepak and Geetha.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Bengaluru Hub Card */}
            <Reveal delay={0.05}>
              <div className="p-8 rounded-3xl bg-paper-sunken border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-2xl block mb-3">📍</span>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">
                    Bengaluru Web Design Studio
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    Serving 100 Bengaluru commercial corridors across Indiranagar, Koramangala,
                    Whitefield, and HSR Layout. Local GST tax invoicing and in-person discovery meetings
                    available.
                  </p>
                </div>
                <Link
                  to="/web-design/bangalore/"
                  className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium"
                >
                  <span>Explore Bengaluru Studio &amp; Corridors</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>

            {/* Global Hub Card */}
            <Reveal delay={0.1}>
              <div className="p-8 rounded-3xl bg-paper-sunken border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-2xl block mb-3">🌍</span>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">
                    Global Markets (20 Countries)
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    Dedicated country editions for the US, UK, Australia, UAE, Canada, and Europe.
                    Native currency invoicing (USD, GBP, EUR, AED, AUD) and asynchronous timezone
                    delivery.
                  </p>
                </div>
                <Link
                  to="/markets/"
                  className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium"
                >
                  <span>Explore 20 Global Country Editions</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 10. Homepage FAQs (8 Essential Buying Questions) ──────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="card-tag mb-3">CLARITY FIRST</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                Clear answers on pricing, our 7-working-day timeline, deliverables, and code
                ownership.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-4 mb-10">
            {HOMEPAGE_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-[20px] bg-paper border border-rule transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <h3 className="font-display text-base sm:text-lg text-ink font-medium">
                      {faq.q}
                    </h3>
                    <span className="text-signal text-lg font-mono shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-muted mt-4 leading-relaxed pt-4 border-t border-rule font-sans">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/faq/"
              className="btn-primary !py-3 !px-6 text-xs rounded-full inline-flex items-center gap-2"
            >
              <span>View All Frequently Asked Questions</span>
              <span>→</span>
            </Link>
          </div>
        </Shell>
      </section>

      {/* ── 11. Free Website Audit (Single, High-Value Lead Magnet) ──── */}
      <section id="audit" className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="card-tag mb-3">FREE 10-POINT CHECKLIST</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight mb-3">
                Is your website giving visitors a reason to contact you?
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Use our free 10-point website audit to check how clearly your website explains your
                business, builds trust, and guides visitors towards taking action. Enter your
                details and get the audit delivered to your inbox.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <LeadMagnetForm />
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 12. Final Closing Call-to-Action ──────────────────────────── */}
      <section className="py-24 sm:py-32 bg-ink text-paper text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        <Shell width="narrow">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <span className="label text-signal-bright block mb-4 font-mono text-xs uppercase tracking-wider">
                GET STARTED
              </span>

              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight leading-tight mb-6">
                Ready for a website that works harder for your business?
              </h2>

              <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed mb-10">
                Let&apos;s talk about your business, what your customers need, and what your website
                should help you achieve. You&apos;ll leave with a clear idea of the right approach,
                the price, and the next steps — even if we&apos;re not the right fit.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-9 !py-4 text-sm rounded-full shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book Your Free 20-Minute Call</span>
                  <span>→</span>
                </button>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-paper font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 bg-white/[0.04]"
                >
                  <span>WhatsApp Co-Founders Directly</span>
                  <span>↗</span>
                </a>
              </div>

              <p className="text-xs font-mono text-on-ink-muted mb-8">
                Prefer to explain your project in writing?{' '}
                <Link to="/contact/" className="text-signal-bright underline">
                  Send us a project brief →
                </Link>
              </p>

              <div className="text-xs font-mono text-on-ink-muted/80 pt-6 border-t border-white/10">
                Deepak &amp; Geetha · Bengaluru, India · Working worldwide
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
