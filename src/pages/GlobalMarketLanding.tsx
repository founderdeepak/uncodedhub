import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Reveal, Shell } from '../components/primitives';
import { GLOBAL_MARKETS_DATA, GlobalMarket } from '../data/globalMarketsData';

interface GlobalMarketLandingProps {
  onBook?: () => void;
}

export default function GlobalMarketLanding({ onBook }: GlobalMarketLandingProps) {
  const { market } = useParams<{ market: string }>();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const data: GlobalMarket | undefined = market ? GLOBAL_MARKETS_DATA[market.toLowerCase()] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!data) {
      navigate('/', { replace: true });
    }
  }, [market, data, navigate]);

  if (!data) return null;

  const canonicalUrl = `https://uncodedhub.com/markets/${data.slug}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Uncoded Hub — ${data.countryName} Web Design Studio`,
    description: data.metaDescription,
    url: canonicalUrl,
    areaServed: {
      '@type': 'Country',
      name: data.countryName,
    },
    currenciesAccepted: data.currencyCode,
    priceRange: `${data.pricing.foundational} - ${data.pricing.bespoke}`,
    founder: [
      {
        '@type': 'Person',
        name: 'Deepak Ravi',
        jobTitle: 'Lead Software Architect',
      },
      {
        '@type': 'Person',
        name: 'Geetha',
        jobTitle: 'Design & Conversion Strategist',
      },
    ],
    provider: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
    },
    serviceType: 'Bespoke Web Design & 7-Day Sprints',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const otherMarkets = Object.values(GLOBAL_MARKETS_DATA).filter((m) => m.slug !== data.slug);

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-canvas text-ink pt-28 sm:pt-36 pb-24">
        {/* ── Breadcrumb & International Notice ────────────────────────────── */}
        <Shell>
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-rule/50">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted">
                <Link to="/" className="hover:text-ink transition-colors">Home</Link>
                <span>/</span>
                <span className="text-ink-soft">International Markets</span>
                <span>/</span>
                <span className="text-signal font-semibold">{data.countryName}</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/20 text-xs font-mono text-signal">
                <span>{data.flag}</span>
                <span>Direct Currency Invoicing in {data.currencyCode}</span>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* ── Hero Section ────────────────────────────────────────────── */}
        <section className="pt-12 sm:pt-16 pb-16 sm:pb-20">
          <Shell>
            <Reveal>
              <div className="max-w-4xl">
                <div className="inline-block text-[11px] font-mono tracking-widest uppercase text-signal bg-signal/5 border border-signal/20 px-3 py-1 rounded-[2px] mb-6">
                  {data.complianceBadge}
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-ink tracking-tight leading-[1.1] mb-6">
                  {data.headline}
                </h1>
                <p className="text-lg sm:text-xl text-ink-soft font-sans font-light leading-relaxed mb-10 max-w-3xl">
                  {data.subheadline}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  {onBook ? (
                    <button
                      onClick={onBook}
                      className="btn-primary !px-8 !py-4 text-base font-medium shadow-sm hover:shadow transition-all"
                    >
                      Book a Discovery Call
                    </button>
                  ) : (
                    <Link
                      to="/contact/"
                      className="btn-primary !px-8 !py-4 text-base font-medium shadow-sm hover:shadow transition-all"
                    >
                      Book a Discovery Call
                    </Link>
                  )}
                  <a
                    href="#comparison"
                    className="px-6 py-4 border border-rule hover:border-ink/40 text-ink-soft hover:text-ink rounded-[3px] text-sm font-medium transition-colors"
                  >
                    Compare Local vs Uncoded Hub ↓
                  </a>
                  <a
                    href="https://wa.me/918073801261?text=Hi%20Deepak,%20I'm%20based%20in%20the%20${data.countryName}%20and%20interested%20in%20a%207-day%20web%20sprint."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 px-4 py-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Quick Chat on WhatsApp
                  </a>
                </div>

                {/* Micro Guarantees */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 mt-12 border-t border-rule/60 text-xs font-mono text-ink-muted">
                  <div>
                    <span className="block text-ink font-semibold text-sm">7 Days</span>
                    <span>Guaranteed Delivery</span>
                  </div>
                  <div>
                    <span className="block text-ink font-semibold text-sm">&lt; 0.7s LCP</span>
                    <span>Global Edge CDN</span>
                  </div>
                  <div>
                    <span className="block text-ink font-semibold text-sm">Late Means Free</span>
                    <span>Contractual Guarantee</span>
                  </div>
                  <div>
                    <span className="block text-ink font-semibold text-sm">100% Code Handover</span>
                    <span>Zero CMS Lock-In</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Comparison Table (Local Agency vs Uncoded Hub) ────────────── */}
        <section id="comparison" className="py-16 sm:py-20 bg-paper/60 border-y border-rule scroll-mt-24">
          <Shell>
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-mono uppercase tracking-widest text-signal block mb-2">
                    Transparent Economics
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-light text-ink">
                    Why {data.countryName} Businesses Work With Us
                  </h2>
                  <p className="text-sm sm:text-base text-ink-soft mt-3">
                    Skip bloated agency overhead, layers of non-technical account managers, and endless billing delays.
                  </p>
                </div>

                <div className="bg-canvas border border-rule rounded-[4px] shadow-sm overflow-hidden">
                  <div className="grid grid-cols-2 divide-x divide-rule">
                    <div className="p-6 sm:p-8 bg-paper/40">
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted block mb-1">
                        Traditional {data.countryName} Agency
                      </span>
                      <p className="text-xl sm:text-2xl font-serif text-ink mb-6">The High-Overhead Model</p>
                      <ul className="space-y-4 text-sm text-ink-soft">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✕</span>
                          <span><strong>Cost:</strong> {data.localComparison.localAgencyRate}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✕</span>
                          <span><strong>Timeline:</strong> {data.localComparison.localTimeline}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✕</span>
                          <span>Layers of project managers, account executives, and junior offshore handoffs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✕</span>
                          <span>Heavy WordPress/Webflow plugins requiring constant paid maintenance</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-6 sm:p-8 bg-signal/5 border-l-2 border-l-signal">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono uppercase tracking-wider text-signal font-semibold">
                          Uncoded Hub 7-Day Sprint
                        </span>
                        <span className="text-[10px] font-mono bg-signal text-paper px-2 py-0.5 rounded-[2px]">
                          FASTER &amp; LEANER
                        </span>
                      </div>
                      <p className="text-xl sm:text-2xl font-serif text-ink mb-6">Direct Founder Engineering</p>
                      <ul className="space-y-4 text-sm text-ink">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span><strong>Fixed Rate:</strong> {data.localComparison.uncodedHubRate}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span><strong>Timeline:</strong> {data.localComparison.uncodedHubTimeline}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>Work directly with Deepak (lead architect) &amp; Geetha (conversion lead)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>Zero CMS bloat: Handcrafted React, 100/100 Lighthouse, full git ownership</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-signal text-paper px-6 py-4 text-center font-mono text-xs sm:text-sm font-medium tracking-wide">
                    🎯 Bottom Line: {data.localComparison.savings}
                  </div>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Top Priority Sectors ─────────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <Shell>
            <Reveal>
              <div className="max-w-2xl mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-signal block mb-2">
                  Specialized Industry Practice
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-light text-ink">
                  High-Ticket Sectors We Engineer in {data.countryName}
                </h2>
                <p className="text-sm sm:text-base text-ink-soft mt-3">
                  Tailored information architecture, booking funnels, and compliance protocols designed specifically for high-revenue service providers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.topSectors.map((sector, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 bg-paper border border-rule hover:border-ink/30 transition-all rounded-[4px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-signal">Sector #{idx + 1}</span>
                        <span className="text-[11px] font-mono text-ink-muted">7-Day Deliverable</span>
                      </div>
                      <h3 className="text-xl font-serif text-ink mb-2">{sector.name}</h3>
                      <p className="text-sm text-ink-soft leading-relaxed mb-6">{sector.summary}</p>
                    </div>
                    <div className="pt-4 border-t border-rule/50 flex items-center justify-between">
                      <span className="text-xs font-mono text-ink-muted italic">"{sector.query}"</span>
                      <Link
                        to="/portfolio/"
                        className="text-xs font-mono text-signal hover:underline inline-flex items-center gap-1"
                      >
                        View Specimen →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Timezone & Communication Transparency ────────────────────── */}
        <section className="py-16 sm:py-20 bg-paper/40 border-t border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="p-8 sm:p-12 bg-canvas border border-rule rounded-[4px] relative overflow-hidden">
                  <div className="inline-block text-xs font-mono uppercase tracking-widest text-signal mb-3">
                    Asynchronous Precision
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink mb-4">
                    Zero Timezone Friction Guarantee
                  </h2>
                  <p className="text-sm sm:text-base text-ink-soft leading-relaxed mb-6">
                    {data.timezoneProtocol}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-rule/60 text-xs font-mono">
                    <div className="p-4 bg-paper/60 border border-rule/40 rounded-[2px]">
                      <span className="text-signal block font-semibold mb-1">1. Daily Loom Briefings</span>
                      <span className="text-ink-soft">Recorded 5-minute video demos showing live screen progress every evening.</span>
                    </div>
                    <div className="p-4 bg-paper/60 border border-rule/40 rounded-[2px]">
                      <span className="text-signal block font-semibold mb-1">2. Overlap Windows</span>
                      <span className="text-ink-soft">Dedicated live Zoom kickoff and final handover aligned with your working morning.</span>
                    </div>
                    <div className="p-4 bg-paper/60 border border-rule/40 rounded-[2px]">
                      <span className="text-signal block font-semibold mb-1">3. Direct WhatsApp/Slack</span>
                      <span className="text-ink-soft">No ticketing queues. Chat directly with your lead engineers in real time.</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Transparent Pricing in Local Currency ────────────────────── */}
        <section className="py-16 sm:py-24">
          <Shell>
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-mono uppercase tracking-widest text-signal block mb-2">
                  Fixed Pricing · {data.currencyCode}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-light text-ink">
                  Guaranteed 7-Day Sprint Packages
                </h2>
                <p className="text-sm sm:text-base text-ink-soft mt-3">
                  100% fixed-fee contract. No hourly change-order surprises, no monthly retainer traps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Foundational */}
                <div className="p-8 bg-paper border border-rule rounded-[4px] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block mb-1">
                      Foundational Sprint
                    </span>
                    <p className="text-2xl sm:text-3xl font-serif text-ink font-normal mb-2">
                      {data.pricing.foundational}
                    </p>
                    <p className="text-xs text-ink-soft mb-6 pb-6 border-b border-rule">
                      High-converting 5-page digital flagship for independent consultants, clinics, or studios.
                    </p>
                    <ul className="space-y-3 text-xs text-ink-soft font-mono">
                      <li className="flex items-center gap-2">✓ Hand-coded React + Vite</li>
                      <li className="flex items-center gap-2">✓ Sub-0.7s Mobile LCP</li>
                      <li className="flex items-center gap-2">✓ 7-Day Delivery Guarantee</li>
                      <li className="flex items-center gap-2">✓ 1-Tap Booking / Form UX</li>
                      <li className="flex items-center gap-2">✓ Full Code Ownership Handover</li>
                    </ul>
                  </div>
                  <div className="pt-8">
                    <Link
                      to="/contact/"
                      className="block w-full text-center py-3 px-4 border border-ink/20 hover:border-ink text-xs font-mono uppercase tracking-wider text-ink rounded-[2px] transition-colors"
                    >
                      Book Foundational Sprint
                    </Link>
                  </div>
                </div>

                {/* Growth (Featured) */}
                <div className="p-8 bg-paper border-2 border-signal shadow-md rounded-[4px] flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-signal text-paper px-3 py-0.5 rounded-[2px] text-[10px] font-mono tracking-wider uppercase font-semibold">
                    Most Popular for {data.countryName}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-1">
                      Commercial Growth Sprint
                    </span>
                    <p className="text-2xl sm:text-3xl font-serif text-ink font-normal mb-2">
                      {data.pricing.growth}
                    </p>
                    <p className="text-xs text-ink-soft mb-6 pb-6 border-b border-rule">
                      Complete authority engine with localized programmatic SEO hubs and automated intake.
                    </p>
                    <ul className="space-y-3 text-xs text-ink font-mono">
                      <li className="flex items-center gap-2">✓ <strong>Everything in Foundational</strong></li>
                      <li className="flex items-center gap-2">✓ High-Ticket Case Study Monograph</li>
                      <li className="flex items-center gap-2">✓ Interactive Specimen / Calculator</li>
                      <li className="flex items-center gap-2">✓ Localized Schema JSON-LD</li>
                      <li className="flex items-center gap-2">✓ Stripe / CRM Webhook Integration</li>
                      <li className="flex items-center gap-2">✓ 30 Days Post-Launch Support</li>
                    </ul>
                  </div>
                  <div className="pt-8">
                    <Link
                      to="/contact/"
                      className="block w-full text-center py-3 px-4 bg-signal hover:bg-signal-bright text-xs font-mono uppercase tracking-wider text-paper font-semibold rounded-[2px] transition-colors shadow-xs"
                    >
                      Book Growth Sprint
                    </Link>
                  </div>
                </div>

                {/* Bespoke */}
                <div className="p-8 bg-paper border border-rule rounded-[4px] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block mb-1">
                      Enterprise &amp; Bespoke
                    </span>
                    <p className="text-2xl sm:text-3xl font-serif text-ink font-normal mb-2">
                      {data.pricing.bespoke}
                    </p>
                    <p className="text-xs text-ink-soft mb-6 pb-6 border-b border-rule">
                      Multi-location platforms, custom interactive 3D visualizers, or custom web portals.
                    </p>
                    <ul className="space-y-3 text-xs text-ink-soft font-mono">
                      <li className="flex items-center gap-2">✓ <strong>Everything in Growth</strong></li>
                      <li className="flex items-center gap-2">✓ Custom Interactive 3D / WebGL</li>
                      <li className="flex items-center gap-2">✓ Multi-Region Suburb Architecture</li>
                      <li className="flex items-center gap-2">✓ Headless CMS / Custom API</li>
                      <li className="flex items-center gap-2">✓ 60 Days Founder Advisory</li>
                    </ul>
                  </div>
                  <div className="pt-8">
                    <Link
                      to="/contact/"
                      className="block w-full text-center py-3 px-4 border border-ink/20 hover:border-ink text-xs font-mono uppercase tracking-wider text-ink rounded-[2px] transition-colors"
                    >
                      Discuss Enterprise Scope
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Why Choose Us ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-paper/60 border-y border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <span className="text-xs font-mono uppercase tracking-widest text-signal block mb-2 text-center">
                  Founder Engineering Standards
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink text-center mb-12">
                  Built for Speed, Ownership &amp; Return on Investment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.whyUs.map((item, idx) => (
                    <div key={idx} className="p-6 bg-canvas border border-rule rounded-[3px]">
                      <span className="text-xs font-mono text-signal block mb-2">Pillar 0{idx + 1}</span>
                      <h3 className="text-lg font-serif text-ink mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── FAQ Section ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <Shell>
            <Reveal>
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-xs font-mono uppercase tracking-widest text-signal block mb-2">
                    Direct Answers
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink">
                    Frequently Asked Questions ({data.countryName})
                  </h2>
                </div>

                <div className="space-y-4">
                  {data.faq.map((item, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-rule rounded-[3px] bg-paper overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full py-4 px-6 text-left flex items-center justify-between gap-4"
                        >
                          <span className="text-sm sm:text-base font-serif text-ink">{item.question}</span>
                          <span className="text-xs font-mono text-signal">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-rule/50 pt-3">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Explore Other International Hubs ─────────────────────────── */}
        <section className="py-12 border-t border-rule/60 bg-paper/30">
          <Shell>
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                Other Global Practice Hubs:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {otherMarkets.map((m) => (
                  <Link
                    key={m.slug}
                    to={`/markets/${m.slug}/`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border border-rule hover:border-signal/40 text-xs font-mono text-ink rounded-[3px] transition-colors"
                  >
                    <span>{m.flag}</span>
                    <span>{m.countryName}</span>
                  </Link>
                ))}
                <Link
                  to="/web-design/bangalore/"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border border-rule hover:border-signal/40 text-xs font-mono text-ink rounded-[3px] transition-colors"
                >
                  <span>🇮🇳</span>
                  <span>Bangalore Tech Corridor</span>
                </Link>
              </div>
            </div>
          </Shell>
        </section>

        {/* ── Final Direct Call To Action ─────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-ink text-paper">
          <Shell>
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-signal block mb-3">
                  Ready to Launch in 7 Calendar Days?
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-light mb-6 tracking-tight">
                  Stop Waiting on 12-Week Agency Timelines.
                </h2>
                <p className="text-paper/70 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                  Get your custom, sub-second web platform live in exactly one week. Transparent {data.currencyCode} pricing, direct founder communication, and our strict "Late Means Free" contractual guarantee.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact/"
                    className="btn-primary !bg-signal !text-paper hover:!bg-signal-bright !px-8 !py-4 text-base font-medium shadow-md transition-all"
                  >
                    Schedule Your Free Discovery Call
                  </Link>
                  <a
                    href="https://wa.me/918073801261?text=Hi%20Deepak,%20I'm%20based%20in%20the%20${data.countryName}%20and%20interested%20in%20a%207-day%20web%20sprint."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 border border-white/20 hover:border-white/60 text-paper rounded-[3px] text-sm font-mono transition-colors"
                  >
                    WhatsApp Founder Directly
                  </a>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>
      </main>
    </>
  );
}

