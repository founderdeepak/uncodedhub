import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { GLOBAL_MARKETS_DATA } from '../data/globalMarketsData';

interface GlobalHubProps {
  onBook?: () => void;
}

export default function GlobalHub({ onBook }: GlobalHubProps) {
  const markets = Object.values(GLOBAL_MARKETS_DATA);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Global Web Design Sprints for International Businesses | Uncoded Hub',
    description:
      'Fixed 7-day bespoke web development sprints for businesses in the US, UK, UAE, and Australia. Sub-second speed, local compliance, and direct founder engineering.',
    url: 'https://uncodedhub.com/global/',
    publisher: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
    },
  };

  return (
    <>
      <Helmet>
        <title>Global Web Design Sprints: US, UK, UAE & Australia | Uncoded Hub</title>
        <meta
          name="description"
          content="Bespoke 7-day web design sprints for businesses in the US, UK, UAE, and Australia. Sub-second global edge performance, transparent local currency pricing, and direct founder collaboration."
        />
        <link rel="canonical" href="https://uncodedhub.com/global/" />
        <meta property="og:title" content="Global Web Design Sprints | Uncoded Hub" />
        <meta
          property="og:description"
          content="Custom hand-coded websites for international businesses in 7 calendar days. Native USD, GBP, AED, and AUD pricing with local compliance."
        />
        <meta property="og:url" content="https://uncodedhub.com/global/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-canvas text-ink pt-28 sm:pt-36 pb-24">
        {/* Hero Section */}
        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/25 text-[11px] font-mono text-signal mb-6 tracking-wide">
                <span>🌍 THE GLOBAL SPRINT MODEL · SENIOR FOUNDER DELIVERY</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl text-ink font-normal tracking-tight leading-[1.08] mb-6">
                Institutional Web Craft,{' '}
                <span className="italic font-normal font-serif text-muted">
                  Shipped to the World in 7 Days.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted font-normal leading-relaxed max-w-3xl mb-8">
                Traditional agencies in New York, London, and Sydney quote \$15,000 to \$30,000 and drag projects across 4 months of account management meetings. We build technically superior, sub-second web platforms in a fixed 7-day sprint with direct founder engineering.
              </p>
            </div>
          </Reveal>
        </Shell>

        {/* Global Edge Latency Matrix */}
        <Shell className="mt-8">
          <Reveal>
            <div className="p-6 sm:p-8 rounded-2xl bg-signal/5 border border-signal/20 mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-signal font-medium uppercase tracking-wider block mb-1">
                    ⚡ Global Edge CDN Architecture
                  </span>
                  <p className="text-sm text-ink font-medium">
                    Every Uncoded Hub site is deployed across 300+ Cloudflare edge nodes globally, ensuring immediate sub-0.8s mobile execution anywhere in the world.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-muted shrink-0">
                  <span className="text-signal">NYC: 0.6s</span>
                  <span className="text-signal">LON: 0.5s</span>
                  <span className="text-signal">DXB: 0.6s</span>
                  <span className="text-signal">SYD: 0.7s</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* 4 Country Market Cards */}
        <Shell>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {markets.map((m, idx) => (
              <Reveal key={m.slug} delay={idx * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-paper-raised border border-rule hover:border-signal/50 transition-all flex flex-col justify-between group shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{m.flag}</span>
                      <span className="text-xs font-mono text-signal font-medium px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20">
                        From {m.pricing.foundational}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal mb-3 group-hover:text-signal transition-colors">
                      {m.countryName} Edition
                    </h2>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {m.subheadline}
                    </p>
                    <div className="p-4 rounded-xl bg-canvas border border-rule/70 mb-6 space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Local Agency Typical:</span>
                        <span className="text-red-500 line-through">{m.localComparison.localAgencyRate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Uncoded Hub Sprint:</span>
                        <span className="text-signal font-medium">{m.pricing.foundational} – {m.pricing.bespoke}</span>
                      </div>
                      <div className="pt-2 border-t border-rule/60 text-signal font-medium">
                        ✓ {m.localComparison.savings}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/${m.slug}/`}
                    className="inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium"
                  >
                    <span>View {m.countryName} Sprint Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>

        {/* The 4 Principles of Working with Uncoded Hub Globally */}
        <Shell className="mt-20 sm:mt-28">
          <Reveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-paper-raised border border-rule">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
                  Operating Standard
                </span>
                <h3 className="font-display text-3xl text-ink font-normal">
                  How We Deliver Across 4 Continents With Zero Friction.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-canvas border border-rule/70">
                  <span className="text-xs font-mono text-signal block mb-2">01 · Async First</span>
                  <h4 className="font-display text-lg text-ink font-medium mb-2">
                    Loom Check-Ins In Your Timezone
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    No 2-hour Zoom marathons. Every business day, you receive a concise Loom video showing running code and design updates, ready when you wake up.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-canvas border border-rule/70">
                  <span className="text-xs font-mono text-signal block mb-2">02 · Sovereign Code</span>
                  <h4 className="font-display text-lg text-ink font-medium mb-2">
                    100% IP & GitHub Handover
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    You own the entire repository, all domain records, and assets outright. Zero proprietary lock-in, zero hostage retainers.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-canvas border border-rule/70">
                  <span className="text-xs font-mono text-signal block mb-2">03 · Seamless Invoicing</span>
                  <h4 className="font-display text-lg text-ink font-medium mb-2">
                    Local Currency & Cards
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Invoice and pay seamlessly in USD, GBP, AED, or AUD via Stripe or international wire with instant business VAT/tax compliance.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Global CTA */}
        <Shell className="mt-20">
          <Reveal>
            <div className="p-8 sm:p-14 rounded-3xl bg-ink text-paper relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs font-mono text-signal tracking-widest uppercase block mb-3">
                  Fixed 7-Day Sprint Guarantee
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight mb-4">
                  Ready to launch your platform in 7 days?
                </h3>
                <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed">
                  Join founders, clinic directors, and partners in New York, London, Dubai, and Sydney who chose hand-coded speed over agency bloat.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <button
                  type="button"
                  onClick={onBook}
                  className="px-6 py-4 rounded-full bg-signal text-ink font-mono text-xs font-semibold hover:bg-signal-bright transition-all shadow-md"
                >
                  Schedule Global Discovery Call →
                </button>
                <Link
                  to="/services/"
                  className="px-6 py-4 rounded-full border border-white/20 hover:border-signal text-paper font-mono text-xs transition-colors text-center"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </main>
    </>
  );
}

