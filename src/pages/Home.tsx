import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { LeadMagnetForm } from '../components/ui/LeadMagnetForm';
import {
  IconGauge,
  IconTimer,
  IconQuill,
  IconBolt,
  IconCompass,
  IconChat,
  IconCalendar,
  IconDeviceMobile,
  IconLayoutGrid,
  IconEye,
  IconHierarchy,
  IconFunnel,
  IconMapPin,
  IconGlobe,
} from '../components/Glyphs';
import { PROJECTS, Project } from '../data/projects';

/* ═══════════════════════════════════════════════════════════════════
   UNCODED HUB — HOMEPAGE
   Enforces UNSLOP_DESIGN_RULES.md (All 20 Rules):
   - Zero emojis; single-stroke bespoke SVG glyphs only
   - Zero purple/rainbow gradients or ambient radial glow blobs
   - Solid grounded surfaces (no glassmorphism or floating orbs)
   - Confident headline typography without fake italic serif suffixes
   - Single decisive primary CTA in hero
   - Mathematically matched inner/outer border radiuses
   - WCAG AA 4.5:1+ contrast across all surfaces
   - Clean hairline neutral borders (no neon/colored card borders)
   - Real working sprint milestone roadmap (no generic 1-2-3 stages)
   - Woven proof metrics instead of arbitrary vanity stat banners
   - Text wrap balance on headlines & text wrap pretty on copy
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
    a: 'We offer transparent, fixed pricing published upfront. In India, single-page websites start from ₹12,000, custom business websites start from ₹20,000, e-commerce stores start from ₹50,000, and website redesigns start from ₹10,000. For international clients, sprints start from $600 to $2,400 USD (or equivalent in GBP, EUR, AED, AUD). There are no hidden fees, hourly surprises, or monthly maintenance lock-ins.',
  },
  {
    q: 'How does the seven-working-day process work?',
    a: 'Once we align on your scope and receive your core assets on Day 1, your sprint begins. Day 1 is strategic planning and positioning. Days 2–5 are visual design and custom engineering with daily 5-minute video updates. Days 6–7 are cross-device testing, speed audits, and live launch. You work directly with founders Deepak and Geetha throughout.',
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
    priceRange: 'Starts from ₹12,000 / $600 USD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '13th Cross Rd, Basavanagara',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560037',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9698,
      longitude: 77.6974,
    },
    hasMap: 'https://maps.app.goo.gl/fwvgEPkguRSfkcC49',
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
      <section id="hero" className="pt-12 sm:pt-18 pb-16 sm:pb-24 bg-paper relative overflow-hidden border-b border-rule">
        <Shell>
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Column: Heading, Subhead, Single Primary Booking CTA */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="text-xs font-mono text-signal mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
                  <span>Direct founder sprint · 7 working days · Deepak &amp; Geetha</span>
                </div>

                {/* Rule 4: No italic serif word on the end. Rule 16: text-wrap balance */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.08] tracking-tight font-normal [text-wrap:balance]">
                  Let your website sell before you do.
                </h1>

                {/* Rule 16: text-wrap pretty */}
                <p className="text-lead text-muted max-w-lg mt-6 leading-relaxed [text-wrap:pretty]">
                  You can&apos;t close clients who bounce before your page finishes loading. We build
                  custom, high-conversion websites for ambitious businesses in seven working days.
                  Work directly with founders Deepak and Geetha. On time, or your build is 100% free.
                </p>

                {/* Rule 6: Single decisive primary CTA button */}
                <div className="mt-8 flex flex-col items-start gap-4">
                  <button
                    type="button"
                    onClick={handleBooking}
                    className="btn-hero-cta group cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-paper/90" aria-hidden="true" />
                      <span>Book Your Free 20-Min Call</span>
                    </span>
                    <span className="btn-hero-cta-badge" aria-hidden="true">
                      →
                    </span>
                  </button>

                  {/* Direct Founder Trust Indicators */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-muted">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-signal shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                      <span>Direct call with Deepak &amp; Geetha</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-signal shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                      <span>No sales pitch · Pure diagnosis</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-signal shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                      <span>On time or 100% free</span>
                    </span>
                  </div>

                  {/* Inspection Link */}
                  <div className="pt-2">
                    <a
                      href="#demos"
                      className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-ink-soft hover:text-signal transition-colors py-1.5 px-3.5 rounded-full hover:bg-paper-raised border border-rule/60 hover:border-rule-strong"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
                      <span>Prefer to inspect live builds first? Explore 50 live demos</span>
                      <span className="group-hover:translate-y-0.5 transition-transform text-signal" aria-hidden="true">↓</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Grounded Specimen Card (Rule 7: matched radius, Rule 9: no glow shadows, Rule 12: no glassmorphism) */}
              <div className="lg:col-span-6">
                <div className="relative bg-paper-raised border border-rule-strong rounded-[24px] overflow-hidden shadow-sm">
                  {/* Browser chrome top bar: matched inner radius */}
                  <div className="bg-ink px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      <span className="font-mono text-[11px] text-white/80">
                        Client Specimen · Verified 7-Day Sprint Build
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-signal-bright font-semibold">VERIFIED</span>
                  </div>

                  {/* Visual Media with Solid Grounded Metric Cards */}
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

                    {/* Gradient scrim for legibility */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent pointer-events-none"
                    />

                    {/* Floating Solid Gauge Card (Rule 1: solid stroke, Rule 12: solid dark bg) */}
                    <div className="absolute top-4 right-4 bg-[#12141a] border border-white/15 p-3.5 rounded-xl text-paper shadow-md max-w-[200px]">
                      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
                        <span className="text-[10px] font-semibold text-white/80">Lighthouse Score</span>
                        <span className="text-[10px] font-semibold text-emerald-400 font-mono">99 / 100</span>
                      </div>
                      <div className="relative w-full h-11 flex items-center justify-center">
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
                            stroke="#10b981"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute bottom-0 text-center">
                          <span className="text-xs font-mono font-medium text-white">Pre-Sold Standard</span>
                        </div>
                      </div>
                      <p className="text-[9px] text-white/70 text-center mt-1">Verified on 4G cellular networks</p>
                    </div>

                    {/* Floating Bottom Metric Bar */}
                    <div className="absolute bottom-4 left-4 right-4 bg-paper border border-rule-strong p-3 rounded-xl shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-signal/10 text-signal flex items-center justify-center shrink-0">
                          <IconGauge className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-ink leading-tight">Lighthouse 99 · 0.8s Load Speed</p>
                          <p className="text-[11px] text-muted">Zero bloatware · Handcrafted React &amp; Vite</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-ink text-paper px-2.5 py-1 rounded-md font-mono font-medium">
                        0.8s FCP
                      </span>
                    </div>
                  </div>

                  {/* Bottom editorial info strip */}
                  <div className="px-5 py-3 bg-paper border-t border-rule flex items-center justify-between text-xs">
                    <span className="text-muted flex items-center gap-1.5">
                      <IconTimer className="w-3.5 h-3.5 text-signal" />
                      <span>7 working days sprint</span>
                    </span>
                    <span className="font-mono text-signal font-semibold">On time or 100% free</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rule 14: Instead of floating vanity stat boxes, a grounded editorial commitments strip */}
            <div className="mt-12 pt-8 border-t border-rule grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-lg text-ink font-medium">7-Working-Day Delivery</span>
                <p className="text-xs text-muted leading-relaxed font-sans [text-wrap:pretty]">
                  Defined sprint scope, locked Day 1 architecture, and contractual launch on Day 7. On time or completely free.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-lg text-ink font-medium">100% Client Ownership</span>
                <p className="text-xs text-muted leading-relaxed font-sans [text-wrap:pretty]">
                  Full clean React repository, domain configuration, and assets transferred outright. Zero vendor lock-in.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-lg text-ink font-medium">Direct Founder Execution</span>
                <p className="text-xs text-muted leading-relaxed font-sans [text-wrap:pretty]">
                  Deepak codes the system; Geetha directs design and messaging. Zero junior delegates or outsourced middlemen.
                </p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 02. The Customer Problem (Grounded Solid Obsidian Surface) ── */}
      {/* Rule 9: No glow orbs. Rule 17: Pure solid ink surface. Rule 12: No glassmorphism. Rule 5: No headline badge. */}
      <section className="py-24 sm:py-32 bg-ink text-paper relative border-b border-white/10">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="text-xs font-mono text-signal-bright mb-3">Why We Built Uncoded Hub</div>
              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight mb-6 [text-wrap:balance]">
                Getting a good website shouldn&apos;t be this difficult.
              </h2>
              <div className="text-base sm:text-lg text-white/80 leading-relaxed space-y-4 font-normal [text-wrap:pretty]">
                <p>
                  You&apos;ve probably heard the stories. Projects that take months. Prices that
                  keep changing. People who sell you the project but disappear when the actual work
                  begins.
                </p>
                <p>
                  <strong className="text-signal-bright font-medium">That&apos;s not how we work.</strong> You
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

          {/* Rule 10: Clean neutral hairline borders. Rule 11: Varied layout cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.05}>
              <div className="p-7 rounded-2xl bg-[#14161c] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-mono text-signal-bright block mb-2 font-medium">
                    01 · Direct Contact
                  </span>
                  <h3 className="font-display text-xl text-paper font-medium mb-3">
                    Direct Founder Accountability
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed [text-wrap:pretty]">
                    You never deal with account executives or junior middlemen. You collaborate
                    directly with the two senior specialists who write every line of code and design
                    every screen.
                  </p>
                </div>
                <div className="pt-5 mt-6 border-t border-white/10 text-xs font-mono text-white/90 flex items-center gap-2">
                  <span className="text-signal-bright">✓</span>
                  <span>Direct Slack &amp; Loom check-ins</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl bg-[#14161c] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-mono text-signal-bright block mb-2 font-medium">
                    02 · Fixed Schedule
                  </span>
                  <h3 className="font-display text-xl text-paper font-medium mb-3">
                    Fixed 7-Day Sprint Protocol
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed [text-wrap:pretty]">
                    Instead of dragging your project across 4 months of status calls, we agree on a
                    tight, fixed scope and deliver your complete website in seven working days.
                  </p>
                </div>
                <div className="pt-5 mt-6 border-t border-white/10 text-xs font-mono text-white/90 flex items-center gap-2">
                  <span className="text-signal-bright">✓</span>
                  <span>On time or 100% free guarantee</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-7 rounded-2xl bg-[#14161c] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-mono text-signal-bright block mb-2 font-medium">
                    03 · Zero Lock-In
                  </span>
                  <h3 className="font-display text-xl text-paper font-medium mb-3">
                    100% Client Ownership
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed [text-wrap:pretty]">
                    We don&apos;t hold your digital assets hostage. You receive your complete clean
                    GitHub repository, domain credentials, and design files with zero monthly maintenance
                    traps.
                  </p>
                </div>
                <div className="pt-5 mt-6 border-t border-white/10 text-xs font-mono text-white/90 flex items-center gap-2">
                  <span className="text-signal-bright">✓</span>
                  <span>Full source code &amp; IP transfer</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 03. The Uncoded Hub Solution (3 Clear Benefits) ──────────── */}
      {/* Rule 2: Clean SVG icons. Rule 5: No badge. Rule 10: Neutral borders. */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="text-xs font-mono text-signal mb-2">What You Get</div>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight [text-wrap:balance]">
                A website built around your business goals.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed [text-wrap:pretty]">
                Technical excellence is our delivery method. A digital presence that builds trust
                and wins more customers is what you&apos;re actually buying.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.05}>
              <div className="p-7 rounded-2xl bg-paper-sunken border border-rule h-full flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-paper border border-rule text-signal flex items-center justify-center mb-6">
                    <IconQuill className="w-5 h-5 text-signal" />
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Your message, made clear
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                    We help explain what your business does, who you help, and why customers should
                    choose you. Clear headlines, persuasive positioning, and zero confusing buzzwords.
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-rule text-xs font-mono text-ink-soft">
                  Positioning · Value proposition · Actionable CTAs
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl bg-paper-sunken border border-rule h-full flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-paper border border-rule text-signal flex items-center justify-center mb-6">
                    <IconBolt className="w-5 h-5 text-signal" />
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    A fast, well-built website
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                    We build custom websites that work smoothly across phones, tablets, and
                    computers. Hand-coded modern React with next-generation WebP images that load in
                    under a second without bloated plugins.
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-rule text-xs font-mono text-ink-soft">
                  Mobile-first · Sub-second speed · Accessible UX
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-7 rounded-2xl bg-paper-sunken border border-rule h-full flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-paper border border-rule text-signal flex items-center justify-center mb-6">
                    <IconCompass className="w-5 h-5 text-signal" />
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    A clear process from start to finish
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                    You know the price, scope, timeline, and who is responsible for the work before
                    we begin. No surprise invoices, no scope creep, and no missed deadlines.
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-rule text-xs font-mono text-ink-soft">
                  Fixed pricing · Agreed scope · 7-day milestone
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 04. Sample Enquiry Demonstration ─────────────────────────── */}
      {/* Rule 2: Clean SVG icons. Rule 10: Clean hairline borders. Rule 5: No badge. */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono text-signal mb-2">Conversion in Action</div>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight mb-3 [text-wrap:balance]">
                Example of how your website enquiries could look.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
                Sample demonstrations showing how modern booking flows and instant WhatsApp
                enquiries connect qualified customers directly to your business without friction.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* WhatsApp Notification Card */}
            <Reveal delay={0.05}>
              <div className="p-6 sm:p-7 rounded-2xl bg-paper border border-rule shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <IconChat className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-ink font-medium">
                      Direct WhatsApp Enquiry
                    </h3>
                    <span className="text-[11px] font-mono text-muted">
                      Sample visitor enquiry flow
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-paper-sunken border border-rule text-xs sm:text-sm text-ink leading-relaxed">
                  <p className="text-muted italic mb-1.5">Incoming WhatsApp message:</p>
                  <p className="font-medium text-ink">
                    &ldquo;Hi! I reviewed your clinic&apos;s treatment cases on your website and would
                    like to book a consultation this Thursday afternoon.&rdquo;
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span>1-tap pre-filled intent</span>
                  </span>
                  <span className="text-emerald-700 font-semibold">Instant conversion</span>
                </div>
              </div>
            </Reveal>

            {/* Calendar Booking Card */}
            <Reveal delay={0.1}>
              <div className="p-6 sm:p-7 rounded-2xl bg-paper border border-rule shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-signal/10 text-signal flex items-center justify-center">
                    <IconCalendar className="w-4 h-4 text-signal" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-ink font-medium">
                      Automated Calendar Booking
                    </h3>
                    <span className="text-[11px] font-mono text-muted">
                      Sample appointment confirmation
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-paper-sunken border border-rule text-xs sm:text-sm text-ink leading-relaxed">
                  <p className="text-muted italic mb-1.5">Calendar booking notification:</p>
                  <p className="font-medium text-ink">
                    &ldquo;New 20-min consultation booked with Dr. Sarah Jenkins for Architecture
                    Consultation via Google Meet.&rdquo;
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
                    <span>Synced to your Google Calendar</span>
                  </span>
                  <span className="text-signal font-semibold">Zero back-and-forth</span>
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
                <div className="text-xs font-mono text-signal mb-2">Live Specimens</div>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight [text-wrap:balance]">
                  Don&apos;t just imagine your new website. See it.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed [text-wrap:pretty]">
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
                  <div className="group h-full rounded-2xl bg-paper-sunken border border-rule hover:border-ink/30 transition-all flex flex-col justify-between overflow-hidden shadow-xs">
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 border-b border-rule">
                        <img
                          src={thumbnail}
                          alt={demo.client}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-ink text-paper text-[10px] font-mono uppercase tracking-wider">
                          {demo.sector}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-display text-xl text-ink font-medium mb-2">
                          {demo.client}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 mb-4 [text-wrap:pretty]">
                          {demo.summary}
                        </p>
                        <div className="text-[11px] font-mono text-ink-soft bg-paper px-3 py-1.5 rounded-md border border-rule inline-block mb-2">
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
                        className="inline-flex items-center justify-between w-full p-3 rounded-lg bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium shadow-xs"
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

      {/* ── 06. How It Works (Rule 15: Tangible 7-Day Sprint Roadmap) ──── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-2xl mb-14">
              <div className="text-xs font-mono text-signal mb-2">The Sprint Protocol</div>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-3 [text-wrap:balance]">
                Your new website, day by day.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
                The seven-working-day timeline applies to projects that fit the agreed scope and
                start conditions. Here is the exact schedule we commit to in writing.
              </p>
            </div>
          </Reveal>

          {/* Rule 15: Concrete sprint schedule with deliverables instead of Stage 01/02/03 clones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Reveal delay={0.05}>
              <div className="p-7 rounded-2xl bg-paper border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-signal">Day 1</span>
                    <span className="text-[11px] font-mono text-muted">Alignment &amp; Architecture</span>
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Positioning &amp; Wireframe
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                    Focused 20-minute kickoff. We map your value proposition, customer journey, and conversion paths. Scope, price, and launch date are locked in writing before work begins.
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-rule text-xs font-mono text-ink-soft">
                  Deliverable: Scope sign-off &amp; IA blueprint
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl bg-paper border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-signal">Days 2–5</span>
                    <span className="text-[11px] font-mono text-muted">Engineering &amp; Design</span>
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Handcrafted React &amp; Content
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                    Geetha directs typography, layout, and messaging. Deepak writes clean, semantic React code and builds interactive booking flows. You receive daily 5-minute Loom video updates.
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-rule text-xs font-mono text-ink-soft">
                  Deliverable: Daily progress video check-ins
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-7 rounded-2xl bg-paper border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-signal">Days 6–7</span>
                    <span className="text-[11px] font-mono text-muted">Testing &amp; Handover</span>
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    QA, Domain &amp; Launch
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                    Cross-device testing across iOS, Android, and desktop. Speed optimization, DNS records pointing, and complete handover of clean source code and credentials.
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-rule text-xs font-mono text-signal">
                  Deliverable: 100% asset handover &amp; live URL
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contractual Guarantee Callout (Solid Obsidian Card, Rule 9 & 10 applied) */}
          <Reveal>
            <div className="relative p-8 sm:p-10 rounded-2xl bg-ink text-paper border border-white/15 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="text-xs font-mono text-signal-bright mb-2">Contractual On-Time Guarantee</div>
                  <h3 className="font-display text-2xl sm:text-3xl text-paper font-normal mb-3 [text-wrap:balance]">
                    On time, or your entire build is free.
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed [text-wrap:pretty]">
                    We agree on the project scope and timeline before work begins. If we fail to
                    deliver the agreed website within seven working days due to a delay on our side,
                    you pay nothing for the build. No excuses. No hidden conditions. Just a promise
                    we stand behind.
                  </p>
                </div>

                <div className="text-xs font-mono text-white/80 shrink-0 space-y-2.5 bg-[#14161c] p-5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-signal-bright font-bold">✓</span>
                    <span>Written contractual guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-signal-bright font-bold">✓</span>
                    <span>Fixed launch milestone</span>
                  </div>
                  <Link to="/terms/" className="text-signal-bright hover:underline block pt-2 font-medium border-t border-white/10">
                    Read Full Terms &amp; Conditions →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 07. Proof & Engineering Standards (Rule 14: Woven proof ledger) ─── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-mono text-signal mb-2">Craft Over Claims · Measurable Standards</div>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4 [text-wrap:balance]">
                We believe in showing our work.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
                We&apos;re a young studio, so we won&apos;t fill this page with borrowed client logos
                or made-up results. Instead, you can inspect the actual technical performance of our builds,
                test how fast they load on your phone, and see our concrete benchmarks.
              </p>
            </div>
          </Reveal>

          {/* Rule 14: Meaningful Technical Commitments Ledger instead of giant vanity stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-7 rounded-2xl bg-paper-sunken border border-rule flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-signal font-medium block mb-2">Speed Architecture</span>
                <h3 className="font-display text-2xl text-ink font-medium mb-3">&lt; 1.0s Real Load Speed</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                  Handcrafted React and Vite with pre-rendered HTML and next-generation WebP images. Zero heavy WordPress plugins or third-party bloat.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-ink-soft">
                Benchmark: Lighthouse 95–100 Mobile
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-paper-sunken border border-rule flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-signal font-medium block mb-2">Timeline Precision</span>
                <h3 className="font-display text-2xl text-ink font-medium mb-3">7 Working Days</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                  Fixed scope agreement upfront. Days 1 through 7 mapped hour by hour with daily Loom check-ins. On time or 100% free under our published policy.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-ink-soft">
                Contractual on-time delivery guarantee
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-paper-sunken border border-rule flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-signal font-medium block mb-2">Digital Autonomy</span>
                <h3 className="font-display text-2xl text-ink font-medium mb-3">100% Client Ownership</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed [text-wrap:pretty]">
                  You own every line of code, your domain credentials, and your design assets outright. No monthly holding fees or proprietary lock-ins.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-ink-soft">
                Clean GitHub repository transfer
              </div>
            </div>
          </div>

          {/* Rule 2: 5 Verifiable Standards with clean SVG icons, no emojis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-xl bg-paper-sunken border border-rule hover:border-rule-strong transition-colors">
              <span className="text-signal block mb-3">
                <IconDeviceMobile className="w-5 h-5" />
              </span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Mobile Performance</h4>
              <p className="text-xs text-muted leading-relaxed [text-wrap:pretty]">
                Optimized for sub-second mobile loading on cellular networks.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-paper-sunken border border-rule hover:border-rule-strong transition-colors">
              <span className="text-signal block mb-3">
                <IconLayoutGrid className="w-5 h-5" />
              </span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Responsive Layouts</h4>
              <p className="text-xs text-muted leading-relaxed [text-wrap:pretty]">
                Fluid design that looks intentional on every screen size.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-paper-sunken border border-rule hover:border-rule-strong transition-colors">
              <span className="text-signal block mb-3">
                <IconEye className="w-5 h-5" />
              </span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Accessibility Basics</h4>
              <p className="text-xs text-muted leading-relaxed [text-wrap:pretty]">
                High-contrast readable typography and intuitive keyboard navigation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-paper-sunken border border-rule hover:border-rule-strong transition-colors">
              <span className="text-signal block mb-3">
                <IconHierarchy className="w-5 h-5" />
              </span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Clear Hierarchy</h4>
              <p className="text-xs text-muted leading-relaxed [text-wrap:pretty]">
                Semantic HTML structure that visitors and Google understand immediately.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-paper-sunken border border-rule hover:border-rule-strong transition-colors">
              <span className="text-signal block mb-3">
                <IconFunnel className="w-5 h-5" />
              </span>
              <h4 className="font-display text-base text-ink font-medium mb-1">Working Funnels</h4>
              <p className="text-xs text-muted leading-relaxed [text-wrap:pretty]">
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
                <div className="text-xs font-mono text-signal mb-2">The Studio</div>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-6 [text-wrap:balance]">
                  Two people. Both of them on your project.
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-normal [text-wrap:pretty]">
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

              {/* Founder Photos Side (Rule 7: matched radius) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-paper border border-rule shadow-xs text-center">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-ink/5">
                    <img
                      src="/deepak.webp"
                      alt="Deepak - Co-Founder & Systems Architect"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-base text-ink font-medium">Deepak Ravi</h3>
                  <span className="text-[11px] font-mono text-muted block">Engineering &amp; Code</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-paper border border-rule shadow-xs text-center">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-ink/5">
                    <img
                      src="/geetha.webp"
                      alt="Geetha - Co-Founder & Creative Director"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-base text-ink font-medium">Geetha</h3>
                  <span className="text-[11px] font-mono text-muted block">Design &amp; Layout</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 09. Regional Hubs (Rule 2: clean SVG icons, no emojis) ────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-xs font-mono text-signal mb-2">Global Reach · Local Roots</div>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-3 [text-wrap:balance]">
                A Bengaluru web design studio, working worldwide.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
                We&apos;re based in Bengaluru, India, and work with businesses across India and around
                the world. Whether you&apos;re in Indiranagar, Whitefield, London, Dubai, or
                elsewhere, you work directly with Deepak and Geetha.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Bengaluru Hub Card */}
            <Reveal delay={0.05}>
              <div className="p-7 rounded-2xl bg-paper-sunken border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-paper border border-rule text-signal flex items-center justify-center mb-4">
                    <IconMapPin className="w-5 h-5 text-signal" />
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">
                    Bengaluru Web Design Studio
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 [text-wrap:pretty]">
                    Serving 100 Bengaluru commercial corridors across Indiranagar, Koramangala,
                    Whitefield, and HSR Layout. Local GST tax invoicing and in-person discovery meetings
                    available.
                  </p>
                </div>
                <Link
                  to="/web-design/bangalore/"
                  className="inline-flex items-center justify-between w-full p-3 rounded-lg bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium"
                >
                  <span>Explore Bengaluru Studio &amp; Corridors</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>

            {/* Global Hub Card */}
            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl bg-paper-sunken border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-paper border border-rule text-signal flex items-center justify-center mb-4">
                    <IconGlobe className="w-5 h-5 text-signal" />
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">
                    Global Markets (20 Countries)
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 [text-wrap:pretty]">
                    Dedicated country editions for the US, UK, Australia, UAE, Canada, and Europe.
                    Native currency invoicing (USD, GBP, EUR, AED, AUD) and asynchronous timezone
                    delivery.
                  </p>
                </div>
                <Link
                  to="/markets/"
                  className="inline-flex items-center justify-between w-full p-3 rounded-lg bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium"
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
              <div className="text-xs font-mono text-signal mb-2">Clarity First</div>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight [text-wrap:balance]">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed [text-wrap:pretty]">
                Clear answers on pricing, our 7-working-day timeline, deliverables, and code
                ownership.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-3.5 mb-10">
            {HOMEPAGE_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-xl bg-paper border border-rule transition-colors shadow-xs"
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
                    <p className="text-xs sm:text-sm text-muted mt-3 leading-relaxed pt-3 border-t border-rule font-sans [text-wrap:pretty]">
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
              <div className="text-xs font-mono text-signal mb-2">Free 10-Point Checklist</div>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight mb-3 [text-wrap:balance]">
                Is your website giving visitors a reason to contact you?
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
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

      {/* ── 12. Final Closing Call-to-Action (Solid Obsidian Surface) ──── */}
      {/* Rule 9: No glow orbs. Rule 17: Pure solid ink surface. Rule 12: No glassmorphism. Rule 5: No badge. */}
      <section className="py-24 sm:py-32 bg-ink text-paper text-center relative border-t border-white/10">
        <Shell width="narrow">
          <Reveal>
            <div className="max-w-2xl mx-auto relative z-10">
              <div className="text-xs font-mono text-signal-bright mb-3">Get Started</div>

              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight leading-tight mb-6 [text-wrap:balance]">
                Ready for a website that works harder for your business?
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-10 [text-wrap:pretty]">
                Let&apos;s talk about your business, what your customers need, and what your website
                should help you achieve. You&apos;ll leave with a clear idea of the right approach,
                the price, and the next steps — even if we&apos;re not the right fit.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-hero-cta group cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-paper/90" aria-hidden="true" />
                    <span>Book Your Free 20-Minute Call</span>
                  </span>
                  <span className="btn-hero-cta-badge" aria-hidden="true">
                    →
                  </span>
                </button>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-paper font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 bg-[#181c24]"
                >
                  <span>WhatsApp Co-Founders Directly</span>
                  <span>↗</span>
                </a>
              </div>

              <p className="text-xs font-mono text-white/70 mb-8">
                Prefer to explain your project in writing?{' '}
                <Link to="/contact/" className="text-signal-bright underline">
                  Send us a project brief →
                </Link>
              </p>

              <div className="pt-6 border-t border-white/10 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center -space-x-2">
                  <img
                    src="/deepak.webp"
                    alt="Deepak, Co-Founder"
                    className="w-10 h-10 rounded-full object-cover border-2 border-signal shadow-sm"
                    width={40}
                    height={40}
                  />
                  <img
                    src="/geetha.webp"
                    alt="Geetha, Co-Founder"
                    className="w-10 h-10 rounded-full object-cover border-2 border-signal shadow-sm"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="text-xs font-mono text-white/70">
                  Deepak &amp; Geetha · Bengaluru, India · Working worldwide
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
