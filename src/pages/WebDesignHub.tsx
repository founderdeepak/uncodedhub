import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { NICHES, NICHE_PILLAR_SLUGS } from '../lib/blog';
import { NICHE_LANDING_DATA } from '../data/nicheLandingData';
import { BANGALORE_LOCALITIES } from '../data/bangaloreLocalities';
import { PROJECTS } from '../data/projects';

/* ═══════════════════════════════════════════════════════════════════
   WEB DESIGN HUB — Master Silo Apex for 17 Specialized Industries
   Canonical: https://uncodedhub.com/web-design/
   ═══════════════════════════════════════════════════════════════════ */

interface WebDesignHubProps {
  onBook?: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All 17 Industries' },
  { id: 'design-realestate', label: 'Architecture & Real Estate' },
  { id: 'healthcare', label: 'Healthcare & Clinics' },
  { id: 'lifestyle-wellness', label: 'Wellness & Fitness' },
  { id: 'coaching-advisory', label: 'Advisory & Academies' },
  { id: 'creative-events', label: 'Creative & Events' },
];

const NICHE_CATEGORY_MAP: Record<string, string> = {
  'interior-designers': 'design-realestate',
  'real-estate': 'design-realestate',
  'home-renovation': 'design-realestate',
  'dental-clinics': 'healthcare',
  'doctor-specialist': 'healthcare',
  'clinic-polyclinic': 'healthcare',
  'healthcare-diagnostics': 'healthcare',
  'spa-wellness': 'lifestyle-wellness',
  'yoga-meditation': 'lifestyle-wellness',
  'gym-fitness-club': 'lifestyle-wellness',
  'fitness-coach': 'lifestyle-wellness',
  'salon-beauty': 'lifestyle-wellness',
  'coaches-consultants': 'coaching-advisory',
  'business-portfolio': 'coaching-advisory',
  'educational-academy': 'coaching-advisory',
  'wedding-photographers': 'creative-events',
  'creative-portfolio': 'creative-events',
};

const INDUSTRY_ICONS: Record<string, string> = {
  'interior-designers': '📐',
  'real-estate': '🏛️',
  'dental-clinics': '🦷',
  'wedding-photographers': '📷',
  'home-renovation': '🔨',
  'coaches-consultants': '🎯',
  'educational-academy': '🎓',
  'gym-fitness-club': '⚡',
  'business-portfolio': '💼',
  'spa-wellness': '🌿',
  'salon-beauty': '✨',
  'fitness-coach': '🏋️',
  'yoga-meditation': '🧘',
  'creative-portfolio': '🎨',
  'healthcare-diagnostics': '🔬',
  'clinic-polyclinic': '🏥',
  'doctor-specialist': '🩺',
};

export default function WebDesignHub({ onBook: _onBook }: WebDesignHubProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allNiches = useMemo(() => {
    return Object.keys(NICHE_LANDING_DATA) as (keyof typeof NICHE_LANDING_DATA)[];
  }, []);

  const filteredNiches = useMemo(() => {
    return allNiches.filter((key) => {
      const config = NICHE_LANDING_DATA[key];
      const name = NICHES[key] || '';
      const category = NICHE_CATEGORY_MAP[key] || 'all';

      const matchesCat = selectedCategory === 'all' || category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        config.subheadline.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [allNiches, selectedCategory, searchQuery]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Specialized Web Design Sprints by Industry — Uncoded Hub',
    description:
      'Explore bespoke, sub-second web design and development platforms engineered for 17 high-ticket industries in India and worldwide.',
    url: 'https://uncodedhub.com/web-design/',
    itemListElement: allNiches.map((key, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: NICHES[key],
      url: `https://uncodedhub.com/web-design/${key}/`,
    })),
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
    ],
  };

  return (
    <>
      <Helmet>
        <title>Web Design Sprints for High-Ticket Industries — Uncoded Hub</title>
        <meta
          name="description"
          content="Bespoke, hand-coded React web platforms engineered for 17 high-ticket service industries. 7-day fixed delivery sprint, 99+ Core Web Vitals, 100% code ownership."
        />
        <link rel="canonical" href="https://uncodedhub.com/web-design/" />
        <meta property="og:title" content="Web Design Sprints for High-Ticket Industries — Uncoded Hub" />
        <meta
          property="og:description"
          content="Sub-second, custom-coded React platforms delivered in 7 working days — guaranteed on time, or 100% free."
        />
        <meta property="og:url" content="https://uncodedhub.com/web-design/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/web-design-hub.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="17 Specialized Industry Web Design Silos — Uncoded Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Sprints for High-Ticket Industries — Uncoded Hub" />
        <meta
          name="twitter:description"
          content="Bespoke, hand-coded React web platforms engineered for 17 high-ticket service industries."
        />
        <meta name="twitter:image" content="https://uncodedhub.com/og/web-design-hub.jpg" />
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
              <span className="text-ink font-medium">Web Design</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/web-design/bangalore/"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 hover:bg-signal/20 text-signal font-mono text-[11px] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                <span>📍 Bangalore Local Studio &amp; 25 Localities →</span>
              </Link>
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-rule text-muted font-mono text-[11px]">
                <span>17 Industry Silos · 7-Day Guarantee</span>
              </div>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── Editorial Hero ───────────────────────────────────────── */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <p className="label text-signal mb-4">INDUSTRY-SPECIFIC DIGITAL ARCHITECTURE</p>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05] mb-6">
                Websites engineered for high-ticket industries.
              </h1>
              <p className="text-muted text-base sm:text-xl leading-relaxed max-w-3xl mb-10">
                A clinic needs instant 2-tap appointment booking. An architect needs 3D render-to-reality
                showcases with sub-second image loading. A law firm needs verifiable partner credentials.
                We design bespoke, hand-coded platforms tailored to the commercial realities of your business.
              </p>

              {/* Guarantees strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-rule font-mono text-xs">
                <div>
                  <span className="text-signal font-semibold block text-sm sm:text-base">7 Working Days</span>
                  <span className="text-muted">Discovery to Live Launch</span>
                </div>
                <div>
                  <span className="text-signal font-semibold block text-sm sm:text-base">On Time or Free</span>
                  <span className="text-muted">Contractual Guarantee</span>
                </div>
                <div>
                  <span className="text-signal font-semibold block text-sm sm:text-base">99+ Lighthouse</span>
                  <span className="text-muted">Sub-Second Mobile Speed</span>
                </div>
                <div>
                  <span className="text-signal font-semibold block text-sm sm:text-base">100% Code Transfer</span>
                  <span className="text-muted">Zero Monthly Retainers</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Filter & Search Controls ─────────────────────────────── */}
      <section className="py-8 bg-paper-sunken border-b border-rule sticky top-[4.25rem] z-30 backdrop-blur-md bg-paper/95">
        <Shell>
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Category Pills - No horizontal scroller, all categories visible */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-ink text-paper font-semibold shadow-xs'
                      : 'bg-paper border border-rule text-muted hover:text-ink hover:border-rule-strong'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <input
                type="text"
                placeholder="Search industry or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-paper border border-rule rounded-full focus:outline-none focus:border-signal text-ink placeholder:text-muted"
              />
              <span className="absolute left-3 top-2.5 text-muted text-xs">🔍</span>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 17 Industries Grid ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper">
        <Shell>
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-rule">
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight">
              17 Specialized High-Ticket Industry Platforms
            </h2>
            <span className="font-mono text-xs text-signal hidden sm:inline">Deepak &amp; Geetha Personal Delivery</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNiches.map((key, idx) => {
              const config = NICHE_LANDING_DATA[key];
              const pillarSlug = NICHE_PILLAR_SLUGS[key];
              const icon = INDUSTRY_ICONS[key] || '⚡';
              const project = PROJECTS.find((p) => p.id === config.projectId);
              const thumbnail = project?.themes[0]?.image;

              return (
                <Reveal key={key} delay={idx * 30}>
                  <div className="p-6 sm:p-7 rounded-[26px] bg-paper-raised border border-rule-strong hover:border-signal/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      {/* Visual Specimen Preview Window */}
                      {thumbnail && (
                        <Link
                          to={`/web-design/${key}/`}
                          className="relative aspect-[16/10] w-full rounded-[16px] overflow-hidden bg-ink border border-rule-strong mb-5 group-hover:border-signal/40 block shadow-xs transition-colors"
                        >
                          {/* Mini Browser Bar */}
                          <div className="absolute top-0 inset-x-0 h-5 bg-ink/90 backdrop-blur-xs px-2.5 flex items-center justify-between z-20 border-b border-white/10 select-none">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-signal inline-block" />
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 inline-block" />
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 inline-block" />
                            </div>
                            <span className="text-[9px] font-mono text-white/70">
                              {key}.uncodedhub.com
                            </span>
                            <span className="text-[9px] font-mono text-signal-bright font-semibold">
                              LIVE DEMO
                            </span>
                          </div>

                          <img
                            src={thumbnail}
                            alt={`${NICHES[key]} specimen web platform`}
                            width={480}
                            height={300}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-top pt-5 transition-transform duration-500 ease-out group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center pt-4">
                            <span className="bg-signal text-paper text-xs font-mono font-semibold px-3 py-1 rounded-full shadow-md">
                              View {NICHES[key]} Demo ↗
                            </span>
                          </div>
                        </Link>
                      )}

                      {/* Top Meta Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-xl bg-paper-sunken border border-rule flex items-center justify-center text-lg">
                          {icon}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-signal/10 text-signal font-mono text-[10px] font-semibold uppercase tracking-wider">
                          7-Day Sprint
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl text-ink font-medium mb-3 group-hover:text-signal transition-colors">
                        <Link to={`/web-design/${key}/`}>{NICHES[key]}</Link>
                      </h3>

                      {/* Subheadline / Commercial Pitch */}
                      <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                        {config.subheadline}
                      </p>

                      {/* Key Industry Metric / Capability */}
                      <div className="p-3.5 rounded-xl bg-paper-sunken border border-rule mb-6">
                        <span className="text-[10px] font-mono uppercase text-muted tracking-wider block mb-1">
                          Core Capability
                        </span>
                        <span className="text-xs font-mono text-ink font-medium block">
                          {config.stats[0]?.label || 'Sub-second mobile speed'} ({config.stats[0]?.value})
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="pt-4 border-t border-rule flex flex-col gap-2.5 font-mono text-xs">
                      <Link
                        to={`/web-design/${key}/`}
                        className="btn-primary !py-2.5 !px-4 text-center justify-center w-full !text-xs rounded-xl shadow-xs"
                      >
                        Explore 7-Day Sprint & Demo →
                      </Link>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-muted">
                        {pillarSlug && (
                          <Link
                            to={`/blog/${pillarSlug}/`}
                            className="hover:text-signal transition-colors"
                          >
                            Read Master Guide ↗
                          </Link>
                        )}
                        <Link
                          to={`/blog/industries/${key}/`}
                          className="hover:text-ink transition-colors"
                        >
                          Silo Guides →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Shell>
      </section>

      {/* ── Bengaluru City & 25 Localities Showcase ───────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-t border-rule">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="card-tag mb-3">HYPERLOCAL BENGALURU WEB ENGINEERING</span>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                  Web design across 25 Bangalore localities.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                  Headquartered in Bengaluru, senior founders Deepak &amp; Geetha build bespoke, sub-second React platforms for local clinics, interior design studios, real estate brokerages, and tech firms across every major commercial corridor in the city.
                </p>
              </div>

              <Link
                to="/web-design/bangalore/"
                className="btn-primary !py-3 !px-6 text-xs rounded-full inline-flex items-center gap-2 self-start md:self-auto shrink-0 shadow-xs"
              >
                <span>Explore Bangalore Master Hub</span>
                <span>→</span>
              </Link>
            </div>

            {/* Top Localities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {Object.values(BANGALORE_LOCALITIES).map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/web-design/bangalore/${loc.slug}/`}
                  className="p-4 rounded-2xl bg-paper-raised border border-rule hover:border-signal/50 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-1.5">
                      <span>{loc.pincode}</span>
                      <span className="text-[10px] text-signal/80 font-serif">{loc.kannadaName}</span>
                    </div>
                    <span className="font-display text-base text-ink font-medium group-hover:text-signal transition-colors block">
                      {loc.name}
                    </span>
                    <span className="text-[11px] text-muted block mt-1 line-clamp-1">
                      {loc.techParksAndHubs[0] || loc.keyLandmarks[0]}
                    </span>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-rule/60 flex items-center justify-between text-[10px] font-mono text-muted">
                    <span>{loc.niches.length} Sectors</span>
                    <span className="text-signal group-hover:translate-x-0.5 transition-transform">View →</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-paper border border-rule flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <span className="text-muted">
                ⚡ <strong>7-Day Delivery Contract:</strong> Every Bengaluru locality sprint is delivered directly by Deepak &amp; Geetha with on-time or 100% free guarantee.
              </span>
              <Link
                to="/web-design/bangalore/"
                className="text-signal hover:underline shrink-0 font-medium"
              >
                View Bengaluru Hub &amp; Interactive Map →
              </Link>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Cinematic Dark Chapter: Why Industry-Specific Design Matters ── */}
      <section className="py-24 sm:py-32 bg-[#0E0C0A] text-paper relative overflow-hidden border-t border-white/10">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-signal/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <p className="label text-signal mb-3">CONVERSION PSYCHOLOGY</p>
              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight mb-6">
                Why generic agency templates cost you high-ticket clients.
              </h2>
              <p className="text-paper/70 text-base sm:text-lg leading-relaxed">
                When a luxury property buyer visits an agent's website, they demand verified land titles,
                walkthrough video streaming, and direct WhatsApp advisor routing. When a patient in severe tooth
                pain searches on Google Maps, they need transparent procedure pricing and appointment booking in 2 taps.
                A template cannot do this. We engineer custom architectures from first principles.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[24px] bg-white/5 border border-white/10">
              <span className="text-signal font-mono text-xs font-semibold uppercase tracking-wider block mb-2">
                01 · Zero Bloatware
              </span>
              <h3 className="text-paper text-lg font-medium mb-3">Handcrafted React & Vite</h3>
              <p className="text-paper/60 text-xs sm:text-sm leading-relaxed">
                Zero WordPress plugins, zero heavy builders (Elementor/Divi), zero database round-trips. Your
                site loads in under 1 second on mobile 4G anywhere in the world.
              </p>
            </div>

            <div className="p-8 rounded-[24px] bg-white/5 border border-white/10">
              <span className="text-signal font-mono text-xs font-semibold uppercase tracking-wider block mb-2">
                02 · The 7-Day Sprint
              </span>
              <h3 className="text-paper text-lg font-medium mb-3">Late Means 100% Free</h3>
              <p className="text-paper/60 text-xs sm:text-sm leading-relaxed">
                We work single-threaded. When we take on your sprint, Deepak and Geetha dedicate 7 full
                working days exclusively to your platform. If we miss our agreed deadline, the entire build is free.
              </p>
            </div>

            <div className="p-8 rounded-[24px] bg-white/5 border border-white/10">
              <span className="text-signal font-mono text-xs font-semibold uppercase tracking-wider block mb-2">
                03 · Total Ownership
              </span>
              <h3 className="text-paper text-lg font-medium mb-3">100% Code & Asset Transfer</h3>
              <p className="text-paper/60 text-xs sm:text-sm leading-relaxed">
                You receive full GitHub repository transfer, clean documentation, and recorded video tutorials.
                Zero monthly software subscriptions, zero hostage holding.
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-paper border-t border-rule text-center">
        <Shell>
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <span className="w-12 h-12 rounded-2xl bg-signal/10 text-signal inline-flex items-center justify-center font-mono text-xl mb-6">
                ⚡
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                Ready to commission your 7-day website sprint?
              </h2>
              <p className="text-muted text-base mb-8">
                Book a 20-minute discovery call directly with Deepak & Geetha to review your industry
                specimen and reserve your sprint date.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact/"
                  className="btn-primary !px-8 !py-4 text-sm rounded-full shadow-md cursor-pointer"
                >
                  Book Discovery Call →
                </Link>
                <a
                  href="https://wa.me/918778427958?text=Hi%20Deepak%20and%20Geetha,%20I%20would%20like%20to%20discuss%20a%207-day%20website%20sprint."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-rule hover:border-ink text-ink font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
