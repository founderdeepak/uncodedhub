import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { BANGALORE_LOCALITIES } from '../data/bangaloreLocalities';

/* ═══════════════════════════════════════════════════════════════════
   BENGALURU WEB DESIGN HUB — UNCODED HUB
   Canonical: https://uncodedhub.com/web-design/bangalore/

   Core Positioning:
   "Web Design Company in Bangalore. Your Website, Built in 7 Working Days."
   "We help Bengaluru businesses get custom websites that look professional, load fast, and turn more visitors into enquiries."

   Architecture:
   1. Customer-Centric Hero & Plain English Outcomes
   2. Why Choose a Bengaluru Web Design Studio? (Local Founder Advantage)
   3. What Makes Uncoded Hub Different (Focusing on Our Strengths)
   4. 12 Featured Premier Localities
   5. Searchable Directory for All 100 Localities
   6. Contractual 7-Day Guarantee: On Time or 100% Free
   7. Bengaluru Buying FAQs
   8. Focused Single CTA (Book 20-Min Discovery Call)
   ═══════════════════════════════════════════════════════════════════ */

interface BangaloreHubProps {
  onBook?: () => void;
}

const FEATURED_LOCALITY_SLUGS = [
  'indiranagar',
  'koramangala',
  'whitefield',
  'hsr-layout',
  'jayanagar',
  'mg-road',
  'electronic-city',
  'malleswaram',
  'bellandur',
  'jp-nagar',
  'sadashivanagar',
  'hebbal',
];

const ZONES = [
  { id: 'all', label: 'All Localities' },
  { id: 'East', label: 'East (Indiranagar, Whitefield, Bellandur)' },
  { id: 'South', label: 'South (Koramangala, HSR, Jayanagar, JP Nagar)' },
  { id: 'Central', label: 'Central (MG Road, Lavelle Rd, Sadashivanagar)' },
  { id: 'North', label: 'North (Hebbal, Malleswaram, Yelahanka)' },
];

const BANGALORE_FAQS = [
  {
    q: 'Can we meet in person in Bengaluru before starting the project?',
    a: 'Yes. While most of our discovery and sprint check-ins happen efficiently over Google Meet or WhatsApp, we are based right here in Bengaluru. For established local clinics, studios, and firms, we are happy to meet in person across Indiranagar, Koramangala, Whitefield, or the CBD to review your project scope.',
  },
  {
    q: 'How does the 7-day website sprint work for a Bangalore business?',
    a: 'Once we complete our 20-minute discovery call and confirm your basic assets (logo, services, and photos), your sprint begins. Day 1 is strategic architecture, Day 2 is visual design direction, Days 3–4 are custom engineering, Day 5 is copy and enquiry funnels, Day 6 is mobile testing across Airtel/Jio networks, and Day 7 is live launch. You work directly with founders Deepak and Geetha throughout the week.',
  },
  {
    q: 'Do you provide a Karnataka GST tax invoice?',
    a: 'Yes, 100%. Uncoded Hub provides a compliant Karnataka GST B2B tax invoice with every project, allowing registered companies and practices to claim full Input Tax Credit (ITC).',
  },
  {
    q: 'What makes your custom React websites faster than local WordPress agencies?',
    a: 'Most local agencies sell bloated WordPress or Elementor templates that load 30+ conflicting plugins, causing 5 to 8 second delays on mobile phones. We hand-code clean React with next-generation WebP images and zero bloatware. Your site loads in under a second on mobile networks, giving visitors an effortless browsing experience and improving your local Google ranking.',
  },
  {
    q: 'Will our website rank on Google for local searches in our Bangalore neighborhood?',
    a: 'Yes. Every page includes comprehensive technical on-page SEO: localized title tags, structured Schema.org markup (LocalBusiness, Organization, and Service), canonical tags, and Google Search Console indexing. This signals to Google exactly where your business is located and which services you provide in your neighborhood.',
  },
  {
    q: 'What happens if we need updates or changes after launch?',
    a: 'Every sprint includes 30 days of direct founder support for bug fixes and minor adjustments. After that, you are in complete control: you own 100% of the clean source code and can edit text yourself, hire any developer, or commission small fixed-price mini-sprints with us. We also offer optional care plans for busy founders.',
  },
];

export default function BangaloreHub({ onBook }: BangaloreHubProps) {
  const [selectedZone, setSelectedZone] = useState('all');
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

  // 12 Curated Featured Localities
  const featuredLocalities = useMemo(() => {
    return FEATURED_LOCALITY_SLUGS.map((slug) => BANGALORE_LOCALITIES[slug]).filter(Boolean);
  }, []);

  // Filtered list for the full searchable directory
  const allLocalitiesList = useMemo(() => {
    return Object.values(BANGALORE_LOCALITIES).filter((loc) => {
      const matchesZone = selectedZone === 'all' || loc.zone.includes(selectedZone);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        loc.name.toLowerCase().includes(q) ||
        loc.pincode.includes(q) ||
        loc.keyLandmarks.some((l) => l.toLowerCase().includes(q)) ||
        loc.niches.some((n) => n.name.toLowerCase().includes(q));
      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchQuery]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Uncoded Hub — Web Design Company in Bangalore',
    url: 'https://uncodedhub.com/web-design/bangalore/',
    description:
      'Web design company in Bangalore. Custom, high-performance websites built in 7 working days by senior founders Deepak & Geetha in Bengaluru. Contractual on-time guarantee.',
    priceRange: '₹35,000 - ₹85,000',
    telephone: '+91 86608 19023',
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
          content="Web design company in Bangalore. Your custom website built in 7 working days by senior founders Deepak & Geetha. Fast mobile speed, local SEO, on-time guarantee."
        />
        <link rel="canonical" href="https://uncodedhub.com/web-design/bangalore/" />
        <meta property="og:title" content="Web Design Company in Bangalore | 7-Day Sprint — Uncoded Hub" />
        <meta
          property="og:description"
          content="We help Bengaluru businesses get custom websites that look professional, load fast, and turn more visitors into enquiries."
        />
        <meta property="og:url" content="https://uncodedhub.com/web-design/bangalore/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/bangalore-hub.jpg" />
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
              <span className="text-ink font-medium">Bangalore Studio</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link
                to="/web-design/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/10 hover:bg-signal/20 text-signal font-mono text-[11px] transition-colors"
              >
                <span>← All 50 Industry Silos</span>
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
                <span className="card-tag">BENGALURU LOCAL WEB STUDIO</span>
                <span className="text-xs font-mono text-muted">·</span>
                <span className="text-xs font-mono text-signal">Deepak &amp; Geetha Direct Delivery</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05] mb-6">
                Web Design Company in Bangalore. <br />
                <span className="text-signal italic font-serif">Your Website, Built in 7 Working Days.</span>
              </h1>

              <p className="text-lead text-muted text-base sm:text-xl leading-relaxed max-w-3xl mb-6">
                We help Bengaluru businesses get custom websites that look professional, load fast, and turn more visitors into enquiries.
              </p>

              <div className="p-5 rounded-2xl bg-paper-sunken border border-rule mb-10 max-w-3xl">
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-0 font-sans">
                  <strong>Work directly with founders Deepak and Geetha.</strong> No junior hand-offs. No confusing process. Just a clear plan, a fixed scope, and a website built around your business.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-8 !py-4 text-sm rounded-full shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book a Free 20-Minute Discovery Call</span>
                  <span>→</span>
                </button>

                <a
                  href="#featured-localities"
                  className="px-6 py-4 rounded-full border border-rule-strong hover:border-signal text-ink font-mono text-xs uppercase tracking-wider transition-colors bg-paper-raised inline-flex items-center gap-2"
                >
                  <span>View Bangalore Localities</span>
                  <span>↓</span>
                </a>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20Bangalore%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted hover:text-signal transition-colors inline-flex items-center gap-1.5 px-3 py-2"
                >
                  <span>💬 WhatsApp: +91 86608 19023</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Realistic Grounded Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-rule text-xs font-mono">
                <div>
                  <p className="text-muted uppercase tracking-wider text-[10px]">Mobile Performance</p>
                  <p className="font-display text-2xl text-ink mt-1">Sub-Second</p>
                  <p className="text-muted text-[11px]">Tested on Airtel &amp; Jio 4G</p>
                </div>
                <div>
                  <p className="text-muted uppercase tracking-wider text-[10px]">Delivery Sprint</p>
                  <p className="font-display text-2xl text-signal mt-1">7 Working Days</p>
                  <p className="text-muted text-[11px]">On time, or 100% free</p>
                </div>
                <div>
                  <p className="text-muted uppercase tracking-wider text-[10px]">Direct Founders</p>
                  <p className="font-display text-2xl text-ink mt-1">Deepak &amp; Geetha</p>
                  <p className="text-muted text-[11px]">Direct build, zero interns</p>
                </div>
                <div>
                  <p className="text-muted uppercase tracking-wider text-[10px]">B2B Tax Compliance</p>
                  <p className="font-display text-2xl text-ink mt-1">Karnataka GST</p>
                  <p className="text-muted text-[11px]">Full input tax credit (ITC)</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 02. Why Choose a Bengaluru Web Design Studio? ─────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">LOCAL ADVANTAGE</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Why choose a Bengaluru web design studio?
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                When you hire Uncoded Hub, you work with founders who live and build right here in Bengaluru. You gain genuine local advantages that distant agencies simply cannot match:
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-[24px] bg-paper border border-rule shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-4">🤝</span>
                <h3 className="font-display text-xl text-ink font-medium mb-2">
                  Direct Founder Access
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Speak directly with Deepak and Geetha. Meet on Google Meet or in-person in Bengaluru. No time-zone friction or junior middlemen.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-[24px] bg-paper border border-rule shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-4">📍</span>
                <h3 className="font-display text-xl text-ink font-medium mb-2">
                  Deep Local Context
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  We understand the unique differences between clients on 100ft Road Indiranagar, tech founders in HSR, and families in Jayanagar.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-[24px] bg-paper border border-rule shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-4">⚡</span>
                <h3 className="font-display text-xl text-ink font-medium mb-2">
                  Built for Indian 4G/5G
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  We test every website on real Android and iOS devices on Airtel and Jio networks to ensure instant mobile loading without lag.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-[24px] bg-paper border border-rule shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-4">💼</span>
                <h3 className="font-display text-xl text-ink font-medium mb-2">
                  Karnataka GST Invoicing
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Receive a compliant Karnataka B2B tax invoice with every project, allowing your business to claim full Input Tax Credit (ITC).
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 03. What Makes Uncoded Hub Different ──────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">OUR EXECUTION DISCIPLINE</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                What makes Uncoded Hub different.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Whether you run an aesthetic clinic, an architecture practice, a tech startup, or a commercial firm, here is why Bengaluru businesses choose our studio:
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[24px] bg-paper-raised border border-rule hover:border-signal/50 shadow-xs flex flex-col justify-between transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-signal uppercase tracking-wider block mb-2">
                  01 · Fixed 7-Day Sprint
                </span>
                <h3 className="font-display text-xl text-ink font-medium mb-3">
                  A Clear, Reliable Schedule
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  We work single-threaded with dedicated attention. Instead of dragging a project across months, your website is designed, built, and launched in exactly 7 working days.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-signal">
                Contractual guarantee: On time or 100% free.
              </div>
            </div>

            <div className="p-8 rounded-[24px] bg-paper-raised border border-rule hover:border-signal/50 shadow-xs flex flex-col justify-between transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-signal uppercase tracking-wider block mb-2">
                  02 · Senior Founders
                </span>
                <h3 className="font-display text-xl text-ink font-medium mb-3">
                  Direct Founder Craft
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  The people who meet you on the discovery call are the exact two people who design and code your website. Geetha directs design; Deepak architects the code.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-signal">
                Zero junior interns, zero subcontracting.
              </div>
            </div>

            <div className="p-8 rounded-[24px] bg-paper-raised border border-rule hover:border-signal/50 shadow-xs flex flex-col justify-between transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-signal uppercase tracking-wider block mb-2">
                  03 · Custom React Speed
                </span>
                <h3 className="font-display text-xl text-ink font-medium mb-3">
                  Zero Template Bloat
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Clean, modern React code that compiles to static HTML with next-gen WebP images. Your site loads in under a second on mobile and costs virtually ₹0/month to host.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rule text-xs font-mono text-signal">
                100% full source code ownership.
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 04. 12 Featured Premier Localities ────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule" id="featured-localities">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="card-tag mb-3">FEATURED HUBS</span>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                  Web design across Bengaluru's premier commercial corridors.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-3">
                  Explore how we tailor digital architectures to the specific commercial realities of Bengaluru's most active business neighborhoods:
                </p>
              </div>

              <a
                href="#all-localities"
                className="text-xs font-mono text-signal hover:underline shrink-0"
              >
                Search all 100 localities ↓
              </a>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLocalities.map((loc, idx) => (
              <Reveal key={loc.slug} delay={Math.min(idx * 30, 200)}>
                <div className="p-7 rounded-[24px] bg-paper border border-rule hover:border-signal/50 shadow-xs transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-signal/10 text-signal font-semibold">
                        PIN: {loc.pincode}
                      </span>
                      <span className="text-muted">{loc.zone}</span>
                    </div>

                    <h3 className="font-display text-2xl text-ink font-medium mb-1">
                      <Link
                        to={`/web-design/bangalore/${loc.slug}/`}
                        className="hover:text-signal transition-colors flex items-center gap-2"
                      >
                        <span>{loc.name}</span>
                        <span className="text-xs font-normal text-muted font-serif italic">({loc.kannadaName})</span>
                      </Link>
                    </h3>

                    <p className="text-muted text-xs leading-relaxed mt-2 line-clamp-2">
                      {loc.commercialProfile}
                    </p>

                    <div className="mt-5 pt-4 border-t border-rule">
                      <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">
                        Top Local Business Sectors:
                      </p>
                      <div className="space-y-1">
                        {loc.niches.slice(0, 3).map((niche) => (
                          <Link
                            key={niche.nicheKey}
                            to={`/web-design/bangalore/${loc.slug}/${niche.nicheKey}/`}
                            className="flex items-center justify-between text-xs font-mono text-ink-soft hover:text-signal transition-colors py-1 px-2 rounded-lg hover:bg-paper-sunken"
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

                  <div className="mt-5 pt-3 border-t border-rule flex items-center justify-between text-xs font-mono">
                    <span className="text-muted text-[11px] truncate max-w-[150px]">
                      {loc.keyLandmarks[0]}
                    </span>
                    <Link
                      to={`/web-design/bangalore/${loc.slug}/`}
                      className="text-signal hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <span>Explore Hub</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 05. Searchable Directory for All 100 Localities ───────────── */}
      <section id="all-localities" className="py-20 sm:py-28 bg-paper border-b border-rule scroll-mt-24">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-10">
              <span className="card-tag mb-3">HYPERLOCAL DIRECTORY</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Search all 100 Bangalore localities.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3">
                Looking for web design in your specific neighborhood? Search by area name, landmark, or pincode below:
              </p>
            </div>

            {/* Controls Bar */}
            <div className="p-4 rounded-2xl bg-paper-sunken border border-rule mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Zone Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {ZONES.map((zone) => (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZone(zone.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      selectedZone === zone.id
                        ? 'bg-ink text-paper font-semibold shadow-xs'
                        : 'bg-paper text-muted hover:text-ink border border-rule'
                    }`}
                  >
                    {zone.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="w-full md:w-72 shrink-0">
                <input
                  type="text"
                  placeholder="Search locality, pincode, landmark..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 text-xs font-mono bg-paper border border-rule rounded-full focus:outline-none focus:border-signal text-ink placeholder:text-muted"
                />
              </div>
            </div>

            {/* Compact Grid of Localities */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {allLocalitiesList.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/web-design/bangalore/${loc.slug}/`}
                  className="p-3.5 rounded-xl bg-paper-raised border border-rule hover:border-signal/50 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-1">
                      <span>{loc.pincode}</span>
                      <span className="text-signal/80 font-serif">{loc.kannadaName}</span>
                    </div>
                    <span className="font-display text-sm text-ink font-medium group-hover:text-signal transition-colors block truncate">
                      {loc.name}
                    </span>
                    <span className="text-[10px] text-muted block mt-0.5 truncate">
                      {loc.keyLandmarks[0] || loc.zone}
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-rule/50 flex items-center justify-between text-[10px] font-mono text-muted">
                    <span>{loc.niches.length} Sectors</span>
                    <span className="text-signal group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>

            {allLocalitiesList.length === 0 && (
              <div className="text-center py-12 text-muted font-mono text-xs">
                No localities matching "{searchQuery}". Try searching by area name, pincode, or landmark.
              </div>
            )}
          </Reveal>
        </Shell>
      </section>

      {/* ── 06. Contractual 7-Day Guarantee ───────────────────────────── */}
      <section className="py-16 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="p-8 sm:p-12 rounded-[28px] bg-paper border-2 border-signal/60 max-w-4xl mx-auto shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-signal text-paper font-mono text-[11px] font-bold uppercase tracking-wider inline-block mb-3">
                    Contractual Commitment
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                    Delivered in 7 Working Days. On Time, or 100% Free.
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
                    Before we accept your deposit, we establish a binding launch date. If Uncoded Hub misses the agreed launch milestone due to our own delay, you receive an immediate <strong>100% refund of your deposit</strong>, and you retain the complete codebase, design files, and platform assets free of charge.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !py-3.5 !px-6 text-xs rounded-full shrink-0 shadow-xs cursor-pointer self-start md:self-auto"
                >
                  Reserve Your Sprint Slot →
                </button>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 07. Bengaluru Buying FAQs ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="card-tag mb-3">LOCAL CLARITY</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                Common questions from Bangalore business owners on timelines, in-person meetings, and local SEO.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {BANGALORE_FAQS.map((faq, idx) => {
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
                    <h4 className="font-display text-base sm:text-lg text-ink font-medium">
                      {faq.q}
                    </h4>
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

      {/* ── 08. Focused Closing CTA ───────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-ink text-paper text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        <Shell width="narrow">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <span className="label text-signal-bright block mb-4 font-mono text-xs uppercase tracking-wider">
                BENGALURU DISCOVERY CALL
              </span>

              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight leading-tight mb-6">
                Ready to build a website that does justice to your Bangalore business?
              </h2>

              <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed mb-10">
                Book a free 20-minute discovery call directly with Deepak &amp; Geetha. We’ll review your business, analyze your local competition, and give you an exact written scope and launch date before you commit a single rupee.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-9 !py-4 text-sm rounded-full shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book Free 20-Minute Discovery Call</span>
                  <span>→</span>
                </button>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20Bangalore%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-paper font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 bg-white/[0.04]"
                >
                  <span>WhatsApp Co-Founders Directly</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-on-ink-muted">
                <span>✓ 7-Day Sprint</span>
                <span>·</span>
                <span>✓ On Time or 100% Free</span>
                <span>·</span>
                <span>✓ Karnataka GST Invoice</span>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
