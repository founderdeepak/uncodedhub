import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { BANGALORE_LOCALITIES } from '../data/bangaloreLocalities';

interface BangaloreHubProps {
  onBook?: () => void;
}

const ZONES = [
  { id: 'all', label: 'All 25 Localities' },
  { id: 'East Bengaluru', label: 'East (Indiranagar, Whitefield, ORR)' },
  { id: 'South Bengaluru', label: 'South (Koramangala, HSR, Jayanagar)' },
  { id: 'Central Bengaluru', label: 'Central (MG Road, CBD, Lavelle Rd)' },
  { id: 'North Bengaluru', label: 'North (Hebbal, Sadashivanagar, HRBR)' },
];

export default function BangaloreHub({ onBook: _onBook }: BangaloreHubProps) {
  const [selectedZone, setSelectedZone] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const localities = useMemo(() => {
    return Object.values(BANGALORE_LOCALITIES).filter((loc) => {
      const matchesZone = selectedZone === 'all' || loc.zone.includes(selectedZone.replace(' Bengaluru', ''));
      const matchesSearch =
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.pincode.includes(searchQuery) ||
        loc.keyLandmarks.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
        loc.niches.some((n) => n.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchQuery]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Uncoded Hub — Web Design Company in Bangalore',
    url: 'https://uncodedhub.com/web-design/bangalore/',
    description:
      'Bespoke, sub-second business websites built in 7 business days by senior founders Deepak & Geetha in Bengaluru. Zero WordPress bloat, built-in local SEO, late-means-free guarantee.',
    priceRange: '₹30,000 - ₹55,000',
    telephone: '+91-80-UNCODED',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560038',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    areaServed: Object.values(BANGALORE_LOCALITIES).map((loc) => ({
      '@type': 'AdministrativeArea',
      name: `${loc.name}, Bengaluru`,
      postalCode: loc.pincode,
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
        name: 'Bangalore Web Design Hub',
        item: 'https://uncodedhub.com/web-design/bangalore/',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Web Design Company in Bangalore | 7-Day Sprint — Uncoded Hub</title>
        <meta
          name="description"
          content="Bespoke, high-performance websites for Bengaluru businesses launched in 7 days. Handcrafted React code, sub-0.8s mobile speed, built-in SEO. Late means 100% free."
        />
        <link rel="canonical" href="https://uncodedhub.com/web-design/bangalore/" />
        {/* OpenGraph */}
        <meta property="og:site_name" content="Uncoded Hub" />
        <meta property="og:title" content="Web Design Company in Bangalore | 7-Day Sprint — Uncoded Hub" />
        <meta
          property="og:description"
          content="Bespoke, high-performance websites for Bengaluru businesses launched in 7 days. Handcrafted React code, sub-0.8s mobile speed, built-in SEO."
        />
        <meta property="og:url" content="https://uncodedhub.com/web-design/bangalore/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* ── Breadcrumb Navigation ────────────────────────────────── */}
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
              <span className="text-ink font-medium">Bangalore Hub</span>
            </nav>

            <Link
              to="/web-design/"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/10 hover:bg-signal/20 text-signal font-mono text-[11px] transition-colors"
            >
              <span>← All 17 National Industry Sprints</span>
            </Link>
          </div>
        </Shell>
      </div>

      {/* ── Editorial Bangalore Hero ── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-signal/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="card-tag">BENGALURU LOCAL WEB ENGINEERING</span>
              <span className="text-xs font-mono text-muted">·</span>
              <span className="text-xs font-mono text-signal">25 High-Ticket Localities</span>
              <span className="text-xs font-mono text-muted">·</span>
              <span className="text-xs font-mono text-muted">7-Day Contractual Sprints</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.06] max-w-4xl">
              Web design company in{' '}
              <span className="text-signal italic font-serif">Bangalore</span> that launches in 7 days.
            </h1>

            <p className="text-muted text-base sm:text-xl max-w-2xl mt-6 leading-relaxed">
              Zero WordPress plugin bloat. Zero junior developer hand-offs. Deepak & Geetha build bespoke, sub-second React websites for Bengaluru’s top clinics, architects, tech startups, and luxury businesses. On time, or your build is free.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact/"
                className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-4 px-8 rounded-full transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Book a 20-minute discovery call</span>
                <span>→</span>
              </Link>
              <a
                href="#localities"
                className="border border-rule-strong hover:border-ink text-ink font-mono text-xs py-4 px-6 rounded-full transition-colors bg-paper-raised"
              >
                Explore 25 Bangalore Localities ↓
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-rule text-xs font-mono">
              <div>
                <p className="text-muted uppercase tracking-wider text-[10px]">Mobile Benchmark</p>
                <p className="font-display text-2xl text-ink mt-1">0.8s LCP</p>
                <p className="text-muted text-[11px]">Sub-second on Airtel/Jio 4G</p>
              </div>
              <div>
                <p className="text-muted uppercase tracking-wider text-[10px]">Delivery Window</p>
                <p className="font-display text-2xl text-signal mt-1">7 Business Days</p>
                <p className="text-muted text-[11px]">Contractual late-means-free</p>
              </div>
              <div>
                <p className="text-muted uppercase tracking-wider text-[10px]">Senior Founders</p>
                <p className="font-display text-2xl text-ink mt-1">Deepak & Geetha</p>
                <p className="text-muted text-[11px]">Direct build, zero interns</p>
              </div>
              <div>
                <p className="text-muted uppercase tracking-wider text-[10px]">Compliance</p>
                <p className="font-display text-2xl text-ink mt-1">Karnataka GST</p>
                <p className="text-muted text-[11px]">Full B2B tax input credit</p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── The Bangalore Agency Reality ── */}
      <section className="py-20 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">THE BENGALURU AGENCY REALITY</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal leading-tight">
                Why Bangalore businesses fire their web design agencies and hire Uncoded Hub.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Whether you run a cosmetic dental center in Indiranagar, a luxury villa brokerage in Whitefield, or a SaaS company in HSR Layout, traditional web agencies fail you in three predictable ways:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-8 rounded-[24px] bg-paper-raised border border-rule-strong shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-signal/10 border border-signal/20 text-signal flex items-center justify-center font-mono text-sm mb-6">
                    01
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium">The 4-Month Timeline Trap</h3>
                  <p className="text-muted text-xs sm:text-sm mt-3 leading-relaxed">
                    A standard 6-page site stretches into endless review cycles, missing launch deadlines, and excuses about "internal team bandwidth." You spend months chasing status updates while competitors take your market share.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-signal">
                  Uncoded Hub: Exactly 7 business days or 100% free.
                </div>
              </div>

              <div className="p-8 rounded-[24px] bg-paper-raised border border-rule-strong shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-signal/10 border border-signal/20 text-signal flex items-center justify-center font-mono text-sm mb-6">
                    02
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium">The Intern Hand-Off</h3>
                  <p className="text-muted text-xs sm:text-sm mt-3 leading-relaxed">
                    Agency executives sell you on polished case studies during your discovery meeting. The moment the advance invoice is paid, your project is handed to a junior intern juggling 12 client accounts simultaneously.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-signal">
                  Uncoded Hub: Geetha designs, Deepak codes. Direct senior attention.
                </div>
              </div>

              <div className="p-8 rounded-[24px] bg-paper-raised border border-rule-strong shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-signal/10 border border-signal/20 text-signal flex items-center justify-center font-mono text-sm mb-6">
                    03
                  </div>
                  <h3 className="font-display text-xl text-ink font-medium">The 35-Plugin WordPress Bloat</h3>
                  <p className="text-muted text-xs sm:text-sm mt-3 leading-relaxed">
                    Slow, stitched-together Elementor templates that take 5+ seconds to load on mobile phones. When an update runs, plugins conflict and break your inquiry forms, followed by hefty monthly maintenance bills.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-signal">
                  Uncoded Hub: Hand-coded React + Vite. 0.8s mobile LCP. Zero plugins.
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 25 Localities Directory ── */}
      <section id="localities" className="py-20 bg-paper">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="card-tag mb-3">HYPERLOCAL BENGALURU COVERAGE</span>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                  Choose your Bangalore locality.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-3 max-w-xl">
                  Each locality hub features genuine Bangalore coordinates, nearby business landmarks, tech parks, and our top 4 dedicated industry platforms.
                </p>
              </div>

              {/* Search Box */}
              <div className="w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search locality, pincode, landmark..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-paper-raised border border-rule-strong text-xs font-mono placeholder:text-muted focus:outline-none focus:border-signal transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Zone Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-rule">
              {ZONES.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZone(zone.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    selectedZone === zone.id
                      ? 'bg-ink text-paper font-medium shadow-xs'
                      : 'bg-paper-raised text-muted hover:text-ink border border-rule hover:border-rule-strong'
                  }`}
                >
                  {zone.label}
                </button>
              ))}
            </div>

            {/* Localities Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {localities.map((loc) => (
                <div
                  key={loc.slug}
                  className="p-8 rounded-[24px] bg-paper-raised border border-rule-strong shadow-xs hover:border-signal/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal">
                        PIN: {loc.pincode}
                      </span>
                      <span className="text-xs font-mono text-muted">{loc.zone}</span>
                    </div>

                    <h3 className="font-display text-2xl text-ink font-medium">
                      <Link
                        to={`/web-design/bangalore/${loc.slug}/`}
                        className="hover:text-signal transition-colors flex items-center gap-2"
                      >
                        <span>{loc.name}</span>
                        <span className="text-xs font-normal text-muted font-serif italic">({loc.kannadaName})</span>
                      </Link>
                    </h3>

                    <p className="text-muted text-xs sm:text-sm mt-3 line-clamp-2 leading-relaxed">
                      {loc.commercialProfile}
                    </p>

                    {/* 5 Flagship Niches in this Locality */}
                    <div className="mt-6 pt-4 border-t border-rule">
                      <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2.5">
                        Top 5 Local Sectors:
                      </p>
                      <div className="space-y-1.5">
                        {loc.niches.map((niche) => (
                          <Link
                            key={niche.nicheKey}
                            to={`/web-design/bangalore/${loc.slug}/${niche.nicheKey}/`}
                            className="flex items-center justify-between text-xs font-mono text-ink/80 hover:text-signal transition-colors py-1 px-2 rounded-lg hover:bg-paper-sunken"
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <span>{niche.icon}</span>
                              <span className="truncate">{niche.name}</span>
                            </span>
                            <span className="text-[10px] text-muted shrink-0">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rule flex items-center justify-between text-xs font-mono">
                    <span className="text-muted truncate max-w-[160px]">{loc.keyLandmarks[0]}</span>
                    <Link
                      to={`/web-design/bangalore/${loc.slug}/`}
                      className="text-signal hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>Explore Hub</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {localities.length === 0 && (
              <div className="text-center py-16 text-muted font-mono text-sm">
                No localities matching "{searchQuery}". Try searching by area name, landmark, or pincode.
              </div>
            )}
          </Reveal>
        </Shell>
      </section>

      {/* ── National Industry Sprints Cross-Link ── */}
      <section className="py-16 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="p-8 rounded-[24px] bg-paper-raised border border-rule-strong flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="card-tag mb-2">LOOKING BEYOND BENGALURU?</span>
                <h3 className="font-display text-2xl text-ink font-medium">
                  We build specialized web platforms for 17 high-ticket industries pan-India.
                </h3>
                <p className="text-muted text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                  From aesthetic dental practices and luxury interior studios to corporate advisory firms and coaching businesses, explore our 17 bespoke national industry silos.
                </p>
              </div>

              <Link
                to="/web-design/"
                className="btn-primary !py-3 !px-6 text-xs rounded-full whitespace-nowrap inline-flex items-center gap-2 shrink-0 shadow-xs"
              >
                <span>Explore All 17 Industries</span>
                <span>→</span>
              </Link>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Closing CTA Module ── */}
      <section className="py-20 bg-ink text-paper relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        <Shell width="narrow">
          <Reveal>
            <div className="text-center">
              <span className="label text-signal-bright block mb-4">
                BENGALURU WEBSITE LAUNCH PROTOCOL
              </span>

              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight leading-tight">
                Ready to dominate Google rankings in your Bangalore neighborhood?
              </h2>

              <p className="text-on-ink-muted text-sm sm:text-base max-w-xl mx-auto mt-6 leading-relaxed">
                Book a 20-minute architecture discovery teardown. We will analyze your competitors, inspect your existing speed, and map out a fixed 7-day launch contract.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact/"
                  className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-4 px-8 rounded-full transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Book a 20-minute discovery call</span>
                  <span>→</span>
                </Link>
                <Link
                  to="/portfolio/"
                  className="border border-white/20 hover:border-signal text-paper font-mono text-xs py-4 px-6 rounded-full transition-colors"
                >
                  View 17 Industry Live Demos →
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-on-ink-muted">
                <span>✓ Contractual 7-day sprint</span>
                <span>·</span>
                <span>✓ Late means 100% free</span>
                <span>·</span>
                <span>✓ 100% code ownership</span>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
