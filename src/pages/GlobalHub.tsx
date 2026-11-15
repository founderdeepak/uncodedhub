import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { GLOBAL_MARKETS_DATA, GlobalMarket } from '../data/globalMarketsData';

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL WEB DESIGN HUB — UNCODED HUB
   Canonical: https://uncodedhub.com/markets/
   Routes: /markets/, /markets, /global/, /global

   Core Positioning:
   "Global Web Design Sprints: 20 Countries, One Standard of Craft."
   "Your Custom Website, Built & Launched in 7 Working Days."

   Architecture:
   1. Customer-Centric Hero & Plain English Outcomes
   2. Global Edge Latency Matrix (300+ Edge Nodes, <0.8s Global Speed)
   3. Why International Businesses Choose Uncoded Hub (The Founder Advantage)
   4. Interactive Region Filter & Country Search (All 20 Markets)
   5. 20 Country Hub Cards Grid (Local Currency, Agency Savings, Sectors, Compliance)
   6. 5-Stage Asynchronous Sprint Protocol Across 12 Timezones
   7. International Buying FAQs
   8. Master Global Booking CTA (Deepak & Geetha Direct Delivery)
   ═══════════════════════════════════════════════════════════════════ */

interface GlobalHubProps {
  onBook?: () => void;
}

type RegionId = 'all' | 'na' | 'eu' | 'me' | 'apac';

interface RegionFilter {
  id: RegionId;
  label: string;
  count: number;
}

const REGIONS: RegionFilter[] = [
  { id: 'all', label: 'All 20 Countries', count: 20 },
  { id: 'na', label: 'North America', count: 2 },
  { id: 'eu', label: 'UK & Europe', count: 8 },
  { id: 'me', label: 'Middle East & GCC', count: 5 },
  { id: 'apac', label: 'Asia-Pacific & Africa', count: 5 },
];

const MARKET_REGIONS: Record<string, { region: RegionId; regionName: string }> = {
  us: { region: 'na', regionName: 'North America' },
  ca: { region: 'na', regionName: 'North America' },
  uk: { region: 'eu', regionName: 'United Kingdom & Europe' },
  ie: { region: 'eu', regionName: 'United Kingdom & Europe' },
  de: { region: 'eu', regionName: 'United Kingdom & Europe' },
  ch: { region: 'eu', regionName: 'United Kingdom & Europe' },
  nl: { region: 'eu', regionName: 'United Kingdom & Europe' },
  se: { region: 'eu', regionName: 'United Kingdom & Europe' },
  no: { region: 'eu', regionName: 'United Kingdom & Europe' },
  dk: { region: 'eu', regionName: 'United Kingdom & Europe' },
  uae: { region: 'me', regionName: 'Middle East & GCC' },
  qa: { region: 'me', regionName: 'Middle East & GCC' },
  sa: { region: 'me', regionName: 'Middle East & GCC' },
  kw: { region: 'me', regionName: 'Middle East & GCC' },
  bh: { region: 'me', regionName: 'Middle East & GCC' },
  au: { region: 'apac', regionName: 'Asia-Pacific & Africa' },
  nz: { region: 'apac', regionName: 'Asia-Pacific & Africa' },
  sg: { region: 'apac', regionName: 'Asia-Pacific & Africa' },
  my: { region: 'apac', regionName: 'Asia-Pacific & Africa' },
  za: { region: 'apac', regionName: 'Asia-Pacific & Africa' },
};

const EDGE_LATENCY_METRICS = [
  { city: 'London', code: 'LHR', country: 'United Kingdom', ping: '0.5s', flag: '🇬🇧' },
  { city: 'New York', code: 'JFK', country: 'United States', ping: '0.6s', flag: '🇺🇸' },
  { city: 'Frankfurt', code: 'FRA', country: 'Germany', ping: '0.5s', flag: '🇩🇪' },
  { city: 'Zurich', code: 'ZRH', country: 'Switzerland', ping: '0.5s', flag: '🇨🇭' },
  { city: 'Dubai', code: 'DXB', country: 'United Arab Emirates', ping: '0.6s', flag: '🇦🇪' },
  { city: 'Singapore', code: 'SIN', country: 'Singapore', ping: '0.4s', flag: '🇸🇬' },
  { city: 'Sydney', code: 'SYD', country: 'Australia', ping: '0.7s', flag: '🇦🇺' },
  { city: 'Toronto', code: 'YYZ', country: 'Canada', ping: '0.6s', flag: '🇨🇦' },
];

const GLOBAL_FAQS = [
  {
    q: 'How do timezone differences work when collaborating from London, New York, or Sydney?',
    a: 'We operate an asynchronous-first sprint model designed specifically for international clients. Every business day, you receive a crisp 5-minute Loom video walking through running code, UI interactions, and daily sprint progress, waiting in your inbox when you start your working day. For kickoff and milestone reviews, we schedule discovery calls across US Eastern/Pacific, UK/CET, GST, or AEST working hours.',
  },
  {
    q: 'How does international invoicing and payment work?',
    a: 'We invoice transparently in your native currency (USD, GBP, EUR, AUD, CAD, AED, SGD, or CHF). Payments are settled securely via Stripe using international corporate credit cards, Apple Pay, or direct Wise / SWIFT wire transfers. You receive a compliant digital commercial invoice with itemized tax and sprint terms.',
  },
  {
    q: 'What is the contractual 7-day on-time guarantee for international clients?',
    a: 'Our guarantee is written into our sprint agreement: we launch your approved custom website within 7 working days from asset intake, or you pay 100% nothing ($0 / £0 / €0). We take only 2 client sprints at any given time so founders Deepak and Geetha can dedicate 100% of their focus to your platform.',
  },
  {
    q: 'Do you ensure compliance with local regulations like ADA, GDPR, DSGVO, or HIPAA?',
    a: 'Yes. Every international build is custom-tailored to local legal and privacy standards: ADA Title III and WCAG 2.1 AA accessibility in the United States, strict GDPR and cookie consent in the UK and Ireland, DSGVO and Impressum compliance in Germany and Switzerland, and PDPA privacy controls in Singapore. We build privacy and accessibility into the source code from Day 1.',
  },
  {
    q: 'Who owns the website source code, domain, and digital assets after launch?',
    a: 'You own 100% of everything outright from Day 7. On completion, we transfer the complete GitHub code repository to your organization, connect your custom domain on your preferred DNS, and hand over all Figma and WebP assets. There is zero vendor lock-in, zero hostage retainers, and zero proprietary platforms.',
  },
  {
    q: 'Can we hire Uncoded Hub for post-launch updates or ongoing support?',
    a: 'Every sprint includes 30 days of direct founder warranty for any bug fixes, technical adjustments, and handover assistance. After that, you are completely free: because we write clean, standardized modern React and Tailwind, any competent developer in the world can maintain it. We also offer optional fixed-price monthly care plans and on-demand feature sprints for clients who prefer our direct craftsmanship.',
  },
];

export default function GlobalHub({ onBook }: GlobalHubProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionId>('all');
  const [searchQuery, setSearchQuery] = useState('');
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

  // All 20 markets sorted consistently
  const allMarkets = useMemo(() => {
    return Object.values(GLOBAL_MARKETS_DATA);
  }, []);

  // Filtered markets based on region and search query
  const filteredMarkets = useMemo(() => {
    return allMarkets.filter((market: GlobalMarket) => {
      const regionData = MARKET_REGIONS[market.slug];
      const matchesRegion = selectedRegion === 'all' || regionData?.region === selectedRegion;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        market.countryName.toLowerCase().includes(q) ||
        market.currencyCode.toLowerCase().includes(q) ||
        market.currencySymbol.includes(q) ||
        market.headline.toLowerCase().includes(q) ||
        market.subheadline.toLowerCase().includes(q) ||
        market.topSectors.some(
          (s) => s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)
        );

      return matchesRegion && matchesSearch;
    });
  }, [allMarkets, selectedRegion, searchQuery]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Uncoded Hub — Global Web Design Sprints & International Studios',
    url: 'https://uncodedhub.com/markets/',
    description:
      'Global web design sprints across 20 countries. Bespoke, sub-second web platforms engineered in 7 working days by senior founders Deepak & Geetha with a contractual on-time guarantee.',
    priceRange: '$1,800 - $3,800 USD / £1,450 - £3,200 GBP',
    telephone: '+91 86608 19023',
    areaServed: allMarkets.map((m) => ({
      '@type': 'Country',
      name: m.countryName,
    })),
    founder: [
      {
        '@type': 'Person',
        name: 'Deepak',
        jobTitle: 'Technical Co-Founder & Web Systems Architect',
      },
      {
        '@type': 'Person',
        name: 'Geetha',
        jobTitle: 'Design Co-Founder & Creative Director',
      },
    ],
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://uncodedhub.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Web Design',
        item: 'https://uncodedhub.com/web-design/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Global Hub (20 Countries)',
        item: 'https://uncodedhub.com/markets/',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Global Web Design Sprints: 20 Countries, One Standard of Craft | Uncoded Hub</title>
        <meta
          name="description"
          content="Bespoke 7-day web design sprints for ambitious businesses across 20 countries. Hand-crafted by senior founders Deepak & Geetha with sub-second edge latency and an on-time guarantee."
        />
        <link rel="canonical" href="https://uncodedhub.com/markets/" />
        <meta
          property="og:title"
          content="Global Web Design Sprints: 20 Countries, One Standard of Craft | Uncoded Hub"
        />
        <meta
          property="og:description"
          content="Custom hand-coded web platforms for international businesses in 7 calendar days. Native USD, GBP, EUR, AED, AUD pricing with local compliance."
        />
        <meta property="og:url" content="https://uncodedhub.com/markets/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* ── Breadcrumb Ribbon ────────────────────────────────────────── */}
      <div className="bg-paper border-b border-rule pt-20 sm:pt-24 pb-3">
        <Shell>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-muted">
              <Link to="/" className="hover:text-ink transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/web-design/" className="hover:text-ink transition-colors">
                Web Design
              </Link>
              <span>/</span>
              <span className="text-ink font-medium">Global Hub (20 Countries)</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link
                to="/web-design/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/10 hover:bg-signal/20 text-signal font-mono text-[11px] transition-colors"
              >
                <span>← All 50 Industry Silos</span>
              </Link>
              <Link
                to="/web-design/bangalore/"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-rule hover:border-signal/50 text-muted hover:text-ink font-mono text-[11px] transition-colors"
              >
                <span>📍 Bangalore Studio &amp; 100 Localities →</span>
              </Link>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-rule text-ink font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>7-Day Guarantee: On Time or Free</span>
              </div>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── 01. Customer-Centric Hero Section ────────────────────────── */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="card-tag">GLOBAL WEB DESIGN HUBS · 20 COUNTRIES</span>
                <span className="text-xs font-mono text-muted">·</span>
                <span className="text-xs font-mono text-signal">Deepak &amp; Geetha Direct Delivery</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05] mb-6">
                Global Web Design Sprints. <br />
                <span className="text-signal italic font-serif">20 Countries, One Standard of Craft.</span>
              </h1>

              <p className="text-base sm:text-xl text-muted font-normal leading-relaxed max-w-3xl mb-8">
                Traditional agencies in London, New York, Sydney, and Dubai quote \$15,000 to \$30,000 and drag projects across 16 weeks of account management meetings. We engineer custom, sub-second web platforms in a disciplined 7-day sprint with direct founder engineering, transparent local currency pricing, and a contractual on-time guarantee.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-8 !py-4 text-xs sm:text-sm rounded-full shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Schedule Global Discovery Call (20 Min)</span>
                  <span>→</span>
                </button>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20sprint%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-full border border-rule hover:border-signal text-ink font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 bg-paper-sunken"
                >
                  <span>Chat on WhatsApp (+91 86608 19023)</span>
                  <span>↗</span>
                </a>
              </div>

              {/* 4 Proof Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-rule">
                <div>
                  <span className="font-display text-2xl sm:text-3xl text-ink font-normal block mb-1">
                    20 Countries
                  </span>
                  <span className="text-xs text-muted font-mono">
                    Native currency pricing &amp; compliance
                  </span>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl text-signal font-normal block mb-1">
                    7 Working Days
                  </span>
                  <span className="text-xs text-muted font-mono">
                    Contractual sprint delivery schedule
                  </span>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl text-ink font-normal block mb-1">
                    &lt; 0.8s Global Speed
                  </span>
                  <span className="text-xs text-muted font-mono">
                    300+ Cloudflare edge nodes globally
                  </span>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl text-emerald-600 font-normal block mb-1">
                    100% Free
                  </span>
                  <span className="text-xs text-muted font-mono">
                    If we miss day 7, you pay ₹0 / $0
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 02. Global Edge CDN Latency Telemetry Matrix ─────────────── */}
      <section className="py-16 sm:py-20 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
              <div className="max-w-2xl">
                <span className="card-tag mb-2">INFRASTRUCTURE BENCHMARK</span>
                <h2 className="font-display text-2xl sm:text-4xl text-ink font-normal tracking-tight">
                  Sub-Second Mobile Execution Across 300+ Edge Nodes
                </h2>
                <p className="text-muted text-sm sm:text-base mt-2 leading-relaxed">
                  While typical local agency WordPress builds suffer from 5 to 8 seconds of plugin lag, every Uncoded Hub website compiles into static React distributed to the nearest edge datacenter to your customer.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-paper border border-rule text-xs font-mono text-muted space-y-1.5 shrink-0 shadow-xs">
                <div className="flex items-center gap-2 text-ink font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Cloudflare Enterprise Edge Delivery</span>
                </div>
                <div>⚡ TTFB: &lt; 85ms Globally</div>
                <div>🔒 Automatic HSTS &amp; SSL Encryption</div>
              </div>
            </div>

            {/* Edge Latency Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {EDGE_LATENCY_METRICS.map((node) => (
                <div
                  key={node.code}
                  className="p-4 rounded-2xl bg-paper border border-rule hover:border-signal/40 transition-all text-center shadow-xs"
                >
                  <span className="text-xl block mb-1">{node.flag}</span>
                  <span className="font-display text-sm text-ink font-medium block truncate">
                    {node.city}
                  </span>
                  <span className="text-[10px] font-mono text-muted block mb-2">{node.code}</span>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-signal/10 border border-signal/25 text-signal font-mono text-[11px] font-semibold">
                    {node.ping}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 03. Why International Businesses Choose Uncoded Hub ──────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="card-tag mb-3">THE FOUNDER-LED ADVANTAGE</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Why Ambitious Brands Replace Bloated Agencies With Our 7-Day Sprint.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                You get the technical rigor of senior enterprise engineers and the design finesse of boutique craftsmen — without the 6-figure overhead.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal delay={0.05}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-paper-sunken border border-rule flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-signal block mb-3">01 · Direct Founders</span>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Deepak &amp; Geetha Direct Engineering
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    No bait-and-switch. The senior minds pitching your project are the exact two people who write every line of code, design every screen, and optimize every funnel.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule/60 text-xs font-mono text-muted">
                  Zero junior handoffs · Direct Slack/Loom access
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-paper-sunken border border-rule flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-signal block mb-3">02 · Fixed 7 Days</span>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Contractual Sprint Protocol
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Local agencies in London, New York, or Sydney drag projects across 16 weeks of endless status calls. We work in a closed, hyper-focused 7-day sprint from intake to public launch.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule/60 text-xs font-mono text-signal font-medium">
                  On time, or 100% free guarantee
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-paper-sunken border border-rule flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-signal block mb-3">03 · Transparent Rates</span>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Native Currency Savings
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Save $10,000 to $25,000 compared to local design firms. Fixed fees published in your local currency (USD, GBP, EUR, AED, AUD, CAD) with zero hidden change-orders.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule/60 text-xs font-mono text-muted">
                  Stripe, Wise &amp; SWIFT compliant invoicing
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-paper-sunken border border-rule flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-signal block mb-3">04 · Sovereign IP</span>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    100% Clean GitHub Ownership
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    You own the entire repository, all domain records, and Figma assets outright. Zero lock-in, zero monthly maintenance hostages, and full freedom to host anywhere.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule/60 text-xs font-mono text-muted">
                  Complete repository transfer on Day 7
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 04. Interactive Region Filter & Country Search ───────────── */}
      <section id="directory" className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="card-tag mb-3">20 COUNTRY EDITIONS</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Explore Your Local Country Edition
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                Every country edition includes tailored local currency pricing, regulatory compliance (ADA, GDPR, DSGVO, HIPAA), and industry benchmarks built for your market.
              </p>
            </div>
          </Reveal>

          {/* Region Tabs & Search Controls */}
          <div className="space-y-4 mb-10">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {REGIONS.map((r) => {
                const isActive = selectedRegion === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRegion(r.id)}
                    className={`px-4 py-2 rounded-full text-xs font-mono cursor-pointer transition-all ${
                      isActive
                        ? 'bg-ink text-paper shadow-xs font-medium'
                        : 'bg-paper border border-rule text-muted hover:text-ink hover:border-signal/50'
                    }`}
                  >
                    <span>{r.label}</span>
                    <span className="ml-1.5 opacity-60">({r.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country, currency (USD, GBP, AED, EUR...), or sector..."
                className="w-full px-5 py-3 rounded-full bg-paper border border-rule text-xs font-mono text-ink placeholder:text-muted/60 focus:outline-none focus:border-signal shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-center text-xs font-mono text-muted">
              Showing {filteredMarkets.length} of 20 countries
            </div>
          </div>

          {/* ── 05. 20 Country Hub Cards Grid ─────────────────────────── */}
          {filteredMarkets.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-paper border border-rule max-w-lg mx-auto">
              <span className="text-3xl mb-3 block">🌍</span>
              <h3 className="font-display text-xl text-ink font-medium mb-2">No countries found</h3>
              <p className="text-xs text-muted mb-4">
                We couldn't find a country matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedRegion('all');
                  setSearchQuery('');
                }}
                className="btn-primary !py-2 !px-4 text-xs rounded-full"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market: GlobalMarket, idx: number) => {
                const regionInfo = MARKET_REGIONS[market.slug];
                return (
                  <Reveal key={market.slug} delay={Math.min(idx * 0.05, 0.3)}>
                    <div className="h-full p-6 sm:p-8 rounded-3xl bg-paper border border-rule hover:border-signal/50 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md">
                      <div>
                        {/* Header: Flag, Country & Region */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="text-3xl" aria-hidden="true">
                              {market.flag}
                            </span>
                            <div>
                              <h3 className="font-display text-xl text-ink font-medium group-hover:text-signal transition-colors">
                                {market.countryName}
                              </h3>
                              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                                {regionInfo?.regionName || 'Global Market'}
                              </span>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-signal font-semibold px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 shrink-0">
                            From {market.pricing.foundational}
                          </span>
                        </div>

                        {/* Subheadline Excerpt */}
                        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-5 line-clamp-2">
                          {market.subheadline}
                        </p>

                        {/* Local Agency Comparison Box */}
                        <div className="p-4 rounded-2xl bg-paper-sunken border border-rule mb-5 space-y-2 text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-muted">Local Agency Typical:</span>
                            <span className="text-red-500 line-through">
                              {market.localComparison.localAgencyRate}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted">Uncoded Hub Sprint:</span>
                            <span className="text-signal font-semibold">
                              {market.pricing.foundational} – {market.pricing.bespoke}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-rule/60 text-[11px] text-emerald-600 font-medium">
                            ✓ {market.localComparison.savings}
                          </div>
                        </div>

                        {/* Top Sectors Served */}
                        <div className="mb-5">
                          <span className="text-[10px] font-mono text-muted uppercase tracking-wider block mb-2">
                            Key Industry Pillars
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {market.topSectors.slice(0, 3).map((sector) => (
                              <span
                                key={sector.name}
                                className="px-2 py-0.5 rounded-md bg-paper-sunken border border-rule text-[11px] font-sans text-ink"
                              >
                                {sector.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Compliance & Standards Badge */}
                        <div className="p-2.5 rounded-xl bg-signal/5 border border-signal/15 text-[10px] font-mono text-signal mb-6 leading-tight flex items-center gap-1.5">
                          <span>🛡️</span>
                          <span className="truncate">{market.complianceBadge}</span>
                        </div>
                      </div>

                      {/* Action Link */}
                      <Link
                        to={`/markets/${market.slug}/`}
                        className="inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium shadow-xs"
                      >
                        <span>Explore {market.countryName} Edition</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Shell>
      </section>

      {/* ── 06. 5-Stage Remote Sprint Protocol Across 12 Timezones ──── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="p-8 sm:p-14 rounded-3xl bg-paper-sunken border border-rule">
              <div className="max-w-2xl mb-12">
                <span className="card-tag mb-2">OPERATING DISCIPLINE</span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                  How We Deliver Across 12 Timezones With Zero Friction.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-2 leading-relaxed">
                  No 2-hour Zoom marathons or endless email chains. Our asynchronous sprint protocol gives you complete transparency while respecting your working hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-paper border border-rule">
                  <span className="text-xs font-mono text-signal block mb-2">Stage 01 · Day 1</span>
                  <h3 className="font-display text-lg text-ink font-medium mb-2">
                    20-Min Alignment &amp; Blueprint
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    We align on your commercial positioning, audience priorities, and brand assets during your working hours. Scope is strictly locked to prevent deadline drift.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-paper border border-rule">
                  <span className="text-xs font-mono text-signal block mb-2">Stage 02 · Days 2–5</span>
                  <h3 className="font-display text-lg text-ink font-medium mb-2">
                    Daily Asynchronous Loom Videos
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Every morning, a concise 5-minute video walkthrough is waiting in your inbox showing running code, mobile responsiveness, and design updates ready for feedback.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-paper border border-rule">
                  <span className="text-xs font-mono text-signal block mb-2">Stage 03 · Days 6–7</span>
                  <h3 className="font-display text-lg text-ink font-medium mb-2">
                    QA, Edge Deployment &amp; Handover
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Comprehensive cross-device QA, DNS propagation across 300+ Cloudflare edge nodes, and complete 100% transfer of your GitHub repository.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 07. International Buying FAQs ────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="card-tag mb-3">GLOBAL CLARITY</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                Answers to common questions from international business owners, managing partners, and clinic directors.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {GLOBAL_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-[20px] bg-paper-sunken border border-rule transition-all shadow-xs"
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
        </Shell>
      </section>

      {/* ── 08. Master Global Closing CTA ─────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-ink text-paper text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        <Shell width="narrow">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <span className="label text-signal-bright block mb-4 font-mono text-xs uppercase tracking-wider">
                INTERNATIONAL SPRINT ONBOARDING
              </span>

              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight leading-tight mb-6">
                Ready to launch your platform in 7 working days?
              </h2>

              <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed mb-10">
                Book a free 20-minute discovery call directly with founders Deepak &amp; Geetha. We’ll analyze your international competitive market, verify your requirements, and provide a fixed scope, price, and launch date.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-9 !py-4 text-sm rounded-full shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Schedule Global Discovery Call (20 Min)</span>
                  <span>→</span>
                </button>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20an%20international%20website%20sprint."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-paper font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 bg-white/[0.04]"
                >
                  <span>WhatsApp Co-Founders Directly</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-on-ink-muted">
                <span>✓ Fixed 7-Day Sprint</span>
                <span>·</span>
                <span>✓ On Time or 100% Free</span>
                <span>·</span>
                <span>✓ Native Currency Invoicing</span>
                <span>·</span>
                <span>✓ 100% GitHub Sovereignty</span>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
