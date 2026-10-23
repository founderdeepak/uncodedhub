import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { PROJECTS } from '../data/projects';
import { getAllPosts, NICHES, NICHE_PILLAR_SLUGS } from '../lib/blog';
import { getNicheLandingData, NICHE_LANDING_DATA } from '../data/nicheLandingData';

interface NicheLandingProps {
  onBook?: () => void;
}

const SPRINT_STEPS = [
  {
    day: 'Day 1',
    title: 'Discovery & Architecture Blueprint',
    detail: 'Kickoff call, asset intake, URL hierarchy mapping, and information architecture signoff.',
  },
  {
    day: 'Day 2',
    title: 'Bespoke UI Design & Typography Lockup',
    detail: 'Custom mobile & desktop screens by Geetha. Custom typography, brand palette, and layout signoff.',
  },
  {
    day: 'Day 3',
    title: 'Clean Semantic React Build',
    detail: 'Deepak hand-codes clean React components. Sub-second performance, zero page builders, zero bloat.',
  },
  {
    day: 'Day 4',
    title: 'High-Ticket Copy & Conversion Triggers',
    detail: 'Placing clear value propositions, trust credentials, transparent pricing, and booking intake funnels.',
  },
  {
    day: 'Day 5',
    title: 'CRM, WhatsApp & Booking Webhooks',
    detail: 'Connecting calendar booking, anti-spam inquiry forms, and instant WhatsApp notifications.',
  },
  {
    day: 'Day 6',
    title: 'Performance Profiling & QA',
    detail: 'Rigorous cross-device testing on iOS & Android. 100/100 Lighthouse audit and Core Web Vitals verification.',
  },
  {
    day: 'Day 7',
    title: 'Live DNS Handover & 100% Code Transfer',
    detail: 'Domain launch, recorded video CMS walkthrough, and full git repository ownership transfer. Zero retainers.',
  },
];

// Topic Segregation Clusters for All 17 Niches (Silo Architecture)
const NICHE_TOPIC_CLUSTERS: Record<string, { topic1: string; topic2: string }> = {
  'interior-designers': {
    topic1: 'Design Economics, High-End Client Positioning & Fee Transparency',
    topic2: 'Visual Performance, 3D Renders, Speed & Local Search Authority',
  },
  'real-estate': {
    topic1: 'High-Ticket Client Acquisition, Trust Engineering & Inflow Funnels',
    topic2: 'Property Portals, Speed Optimization & Hyperlocal SEO Dominance',
  },
  'dental-clinics': {
    topic1: 'Clinical Trust, High-Value Treatments & Patient Conversion Funnels',
    topic2: 'Local Search Authority, Booking Workflows & Practice Operations',
  },
  'home-renovation': {
    topic1: 'Commercial Scope Transparency, Estimation Calculators & Trust',
    topic2: 'Hyperlocal Community SEO, Material Proof & High-Speed Mobile UX',
  },
  'wedding-photographers': {
    topic1: 'High-Ticket Booking Psychology, Package Pricing & Client Inquiry Funnels',
    topic2: '4K Media Streaming, Proofing Galleries & Organic Destination Search',
  },
  'coaches-consultants': {
    topic1: 'Executive Positioning, Retainer Pricing Models & Application Funnels',
    topic2: 'Authority Content Strategy, Community Portals & High-Conversion UX',
  },
  'business-portfolio': {
    topic1: 'Enterprise B2B Positioning, Advisory Retainers & Executive Authority',
    topic2: 'Compliance, RFP Shortlist Architecture & Corporate SEO Strategy',
  },
  'clinic-polyclinic': {
    topic1: 'Multi-Specialty Patient Triage, OPD Scheduling & Fee Transparency',
    topic2: 'Local Map Pack Domination, Emergency UX & Clinical Infrastructure',
  },
  'creative-portfolio': {
    topic1: 'Agency Prestige, Retainer Pricing Banding & Interactive Showcases',
    topic2: 'Sub-Second Performance, Studio Authority & Global Client Delivery',
  },
  'doctor-specialist': {
    topic1: 'Surgical E-E-A-T Authority, Clinical Portals & Credential Storytelling',
    topic2: 'AI Overviews, Second-Opinion Funnels & International Patient Care',
  },
  'educational-academy': {
    topic1: 'Admission Conversion Funnels, Result Transparency & Parent Psychology',
    topic2: 'Branch SEO, Sub-Second Result Infrastructure & Mobile Admissions',
  },
  'fitness-coach': {
    topic1: 'High-Ticket Transformation Pricing, Application Funnels & Nutrition Credibility',
    topic2: 'Zero-Lag Performance, Verified Case Studies & Executive Retention',
  },
  'gym-fitness-club': {
    topic1: 'Membership Acquisition Funnels, Tiered Pricing & Churn Reduction',
    topic2: 'Local Pack SEO, Virtual Floor Equipment Tours & B2B Wellness Retainers',
  },
  'healthcare-diagnostics': {
    topic1: 'Home Collection Automation, Transparent Test Menus & Patient Trust',
    topic2: 'NABL Quality Badging, Hyperlocal Search & Rapid Report Delivery',
  },
  'salon-beauty': {
    topic1: 'Bridal Date Bookings, Transparent Package Tiers & Lookbook Portals',
    topic2: 'Local Map Domination, 4G Gallery Acceleration & Client Retention',
  },
  'spa-wellness': {
    topic1: 'Luxury Experience Architecture, Ritual Menus & Rejuvenation Packages',
    topic2: 'Local Luxury SEO, Sensory Aesthetics & Direct VIP Reservation Systems',
  },
  'yoga-meditation': {
    topic1: 'Teacher Training Curriculum Funnels, Shala Lineage & Student Retention',
    topic2: 'Mindful Visual Architecture, Retainer Workshops & Hybrid Streaming',
  },
};

export default function NicheLanding({ onBook }: NicheLandingProps) {
  const { niche: routeSlug } = useParams<{ niche: string }>();
  const navigate = useNavigate();

  // Scroll to top when changing niche
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [routeSlug]);

  // Lookup niche configuration
  const config = useMemo(() => {
    if (!routeSlug) return undefined;
    return getNicheLandingData(routeSlug);
  }, [routeSlug]);

  // Redirect or show not found if invalid
  useEffect(() => {
    if (!config && routeSlug) {
      navigate('/portfolio/', { replace: true });
    }
  }, [config, routeSlug, navigate]);

  // Find matching demo project
  const project = useMemo(() => {
    if (!config) return undefined;
    return PROJECTS.find((p) => p.id === config.projectId);
  }, [config]);

  // Active theme index for demo specimen
  const [activeTheme, setActiveTheme] = useState(0);

  // Get articles belonging to this niche silo
  const allPosts = useMemo(() => getAllPosts(), []);
  const nichePosts = useMemo(() => {
    if (!config) return [];
    return allPosts.filter((p) => p.niche === config.key);
  }, [allPosts, config]);

  // Master pillar and spoke order: ensure master pillar is #1, followed by rest
  const orderedPosts = useMemo(() => {
    if (!config) return [];
    const masterSlug = NICHE_PILLAR_SLUGS[config.key];
    const master = nichePosts.find((p) => p.slug === masterSlug);
    const rest = nichePosts.filter((p) => p.slug !== masterSlug);
    return master ? [master, ...rest] : nichePosts;
  }, [nichePosts, config]);

  // Split into 2 parallel topic clusters (e.g. 1..20 and 21..40/41, or 1..9 and 10..18)
  const splitIndex = useMemo(() => {
    if (orderedPosts.length >= 40) {
      return 20;
    }
    return Math.ceil(orderedPosts.length / 2);
  }, [orderedPosts.length]);

  const topic1Posts = useMemo(() => orderedPosts.slice(0, splitIndex), [orderedPosts, splitIndex]);
  const topic2Posts = useMemo(() => orderedPosts.slice(splitIndex), [orderedPosts, splitIndex]);

  const topicCluster = useMemo(() => {
    if (!config) return { topic1: 'Conversion Architecture & Positioning', topic2: 'Technical Authority & Acquisition' };
    return NICHE_TOPIC_CLUSTERS[config.key] || {
      topic1: 'Conversion Architecture & Client Positioning',
      topic2: 'Technical Authority, SEO & Acquisition',
    };
  }, [config]);

  // Other niches for footer exploration
  const otherNiches = useMemo(() => {
    if (!config) return [];
    return Object.values(NICHE_LANDING_DATA)
      .filter((item) => item.key !== config.key)
      .slice(0, 6);
  }, [config]);

  if (!config || !project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted font-mono text-sm">Loading bespoke industry blueprint...</p>
      </div>
    );
  }

  const currentTheme = project.themes[activeTheme] || project.themes[0];

  const handleBooking = () => {
    if (onBook) {
      onBook();
    } else {
      navigate('/contact/');
      window.requestAnimationFrame(() => {
        document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const canonicalUrl = `https://uncodedhub.com/web-design/${config.key}/`;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Bespoke Web Development for ${NICHES[config.key]}`,
    serviceType: 'High-Performance Web Design and Custom Engineering',
    provider: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com',
      logo: 'https://uncodedhub.com/favicon.svg',
      founders: [
        { '@type': 'Person', name: 'Deepak', jobTitle: 'Lead Systems Architect' },
        { '@type': 'Person', name: 'Geetha', jobTitle: 'Design & Conversion Strategist' },
      ],
    },
    areaServed: 'Worldwide',
    description: config.metaDescription,
    url: canonicalUrl,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '7-Day Web Production Sprint',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `${NICHES[config.key]} 7-Day Web Platform Build`,
            description: config.subheadline,
          },
        },
      ],
    },
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
        name: NICHES[config.key],
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="keywords" content={config.keywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://uncodedhub.com/og/niche-${config.key}.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${NICHES[config.key]} 7-Day Web Design Platform — Uncoded Hub`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.metaTitle} />
        <meta name="twitter:description" content={config.metaDescription} />
        <meta name="twitter:image" content={`https://uncodedhub.com/og/niche-${config.key}.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* ── Breadcrumb & Announcement Bar ────────────────────────── */}
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
              <span className="text-ink font-medium">{NICHES[config.key]}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 text-signal font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
              <span>7-Day Fixed Sprint · Capped Client Capacity</span>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── Editorial Hero ───────────────────────────────────────── */}
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-24 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <p className="label text-signal mb-4">{config.heroBadge}</p>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05] mb-6">
                {config.headline}
              </h1>
              <p className="text-muted text-base sm:text-xl leading-relaxed max-w-3xl mb-10">
                {config.subheadline}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-14">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="px-7 py-4 rounded-full bg-ink text-paper font-mono text-xs tracking-wider uppercase hover:bg-signal hover:text-paper transition-all shadow-md cursor-pointer flex items-center gap-3 font-semibold"
                >
                  <span>Book 20-Min Discovery Sprint</span>
                  <span>→</span>
                </button>

                <a
                  href="#demo-specimen"
                  className="px-7 py-4 rounded-full bg-paper-raised border border-rule-strong text-ink font-mono text-xs tracking-wider uppercase hover:border-ink transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Inspect Live Demo Preview</span>
                  <span>↓</span>
                </a>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 rounded-full text-muted hover:text-ink font-mono text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Open Fullscreen Demo</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-rule">
                {config.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                      {stat.value}
                    </span>
                    <span className="text-xs font-mono text-muted mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Who This Is Built For ─────────────────────────────────── */}
      <section className="py-14 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4">
                <p className="label text-signal mb-2">Ideal Client Profile</p>
                <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal leading-tight">
                  Who we engineer this platform for.
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="grid sm:grid-cols-2 gap-3">
                  {config.targetAudience.map((target, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-paper border border-rule flex items-start gap-3 shadow-xs"
                    >
                      <span className="text-signal font-mono text-sm font-semibold select-none">
                        ✓
                      </span>
                      <span className="text-xs sm:text-sm text-ink leading-snug font-medium">
                        {target}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Interactive Demo Showcase (The Specimen Engine) ──────── */}
      <section id="demo-specimen" className="py-20 sm:py-28 bg-paper border-b border-rule scroll-mt-24">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="label text-signal mb-3">Live Interactive Specimen · {project.client}</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                Test the actual platform architecture before you commit.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Every build is 100% hand-crafted in React and Tailwind CSS. Switch between visual
                themes below to inspect the typography lockups, color harmony, and sub-second
                loading states.
              </p>
            </div>
          </Reveal>

          {/* Studio Browser Chrome Showcase */}
          <div className="max-w-5xl mx-auto bg-paper-raised border border-rule-strong rounded-[28px] overflow-hidden shadow-xl">
            {/* Window Top Bar */}
            <div className="px-6 py-4 bg-paper border-b border-rule flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-3 font-mono text-xs text-muted hidden sm:inline">
                  https://uncodedhub.com{project.url}
                </span>
              </div>

              {/* Theme Switcher Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {project.themes.map((theme, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTheme(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                      activeTheme === idx
                        ? 'bg-ink text-paper font-medium shadow-xs'
                        : 'bg-paper border border-rule text-muted hover:text-ink hover:border-ink'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: theme.accentHex }}
                    />
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specimen Preview Canvas */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#0E0C0A] overflow-hidden flex items-center justify-center group">
              <img
                src={currentTheme.image}
                alt={`${project.client} - ${currentTheme.name} Theme Preview`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />

              {/* Floating Live Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-ink/80 backdrop-blur-md text-paper font-mono text-[11px] border border-white/10 flex items-center gap-2 shadow-lg">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentTheme.accentHex }}
                />
                <span>Aesthetic: {currentTheme.style}</span>
              </div>

              {/* Hover Trigger to Launch Fullscreen */}
              <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-paper text-ink font-mono text-xs uppercase tracking-wider font-semibold shadow-2xl hover:bg-signal hover:text-paper transition-all flex items-center gap-2"
                >
                  <span>Launch Interactive Live Demo</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Specimen Footer Details */}
            <div className="p-6 sm:p-8 bg-paper flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-rule">
              <div>
                <p className="font-mono text-xs text-signal uppercase tracking-wider mb-1 font-semibold">
                  Conversion Engine Highlight
                </p>
                <h3 className="font-display text-lg sm:text-xl text-ink font-normal">
                  {project.conversionEngine}
                </h3>
                <p className="text-xs font-mono text-muted mt-1">{project.result}</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none text-center px-5 py-3 rounded-full bg-paper-raised border border-rule-strong hover:border-ink font-mono text-xs text-ink transition-colors"
                >
                  Open Demo ↗
                </a>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="flex-1 sm:flex-none text-center px-6 py-3 rounded-full bg-ink text-paper font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors font-semibold cursor-pointer"
                >
                  Get This Build
                </button>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 4 Commercial Pain Points & Uncoded Hub Solutions ─────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <p className="label text-signal mb-3">Commercial Reality Audit</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                4 reasons generic agency websites fail for {NICHES[config.key]}.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Most agencies deploy one-size-fits-all WordPress templates that look pretty in
                mockups but collapse when high-value clients attempt to evaluate your credibility on
                a mobile phone.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {config.problems.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="bg-paper p-8 rounded-[24px] border border-rule hover:border-signal/50 transition-all shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-paper-sunken border border-rule text-muted">
                        Problem {item.num}
                      </span>
                      <span className="font-mono text-xs text-signal font-medium">
                        {item.metric}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-medium text-ink mb-3 leading-snug">
                      "{item.problem}"
                    </h3>

                    <div className="pt-4 mt-4 border-t border-rule">
                      <p className="font-mono text-xs text-signal uppercase tracking-wider mb-1 font-semibold">
                        The Uncoded Hub Solution
                      </p>
                      <p className="text-sm text-muted leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 3 Conversion Architecture Pillars ────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="label text-signal mb-3">Conversion Engineering</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                The 3 pillars built into your {NICHES[config.key]} platform.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Every component is intentionally architected to pre-qualify prospects, eliminate
                hesitation, and position your practice as the undisputed premier choice.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {config.conversionPillars.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="bg-paper-raised p-8 rounded-[28px] border border-rule-strong flex flex-col justify-between h-full hover:border-signal/50 transition-all">
                  <div>
                    <span className="w-10 h-10 rounded-2xl bg-signal/10 text-signal flex items-center justify-center font-mono text-sm font-semibold mb-6">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-xl text-ink font-normal mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">{pillar.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-rule font-mono text-xs text-signal">
                    Deliverable: {pillar.deliverable}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── The 7-Day Sprint Roadmap ──────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <p className="label text-signal mb-3">Predictable Delivery</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                From kickoff to live domain in 7 days.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                No 4-month agency delays. We run a disciplined, single-threaded 7-day production
                sprint with Deepak and Geetha personally engineering your platform.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPRINT_STEPS.slice(0, 4).map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-paper border border-rule flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-signal uppercase tracking-wider mb-2 block">
                    {step.day}
                  </span>
                  <h3 className="font-medium text-ink text-sm sm:text-base mb-2">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            {SPRINT_STEPS.slice(4).map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-paper border border-rule flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-signal uppercase tracking-wider mb-2 block">
                    {step.day}
                  </span>
                  <h3 className="font-medium text-ink text-sm sm:text-base mb-2">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── Deep Knowledge Silo & Master Pillar Hub (SEO Core) ────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="label text-signal mb-3">Topical Silo Architecture · Complete Knowledge Base</p>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                  {NICHES[config.key]} Strategic Playbooks & Topical Silos
                </h2>
              </div>
              <Link
                to={`/blog/industries/${config.key}/`}
                className="font-mono text-xs text-signal hover:text-ink transition-colors flex items-center gap-1.5"
              >
                <span>Browse all {orderedPosts.length} tactical guides</span>
                <span>→</span>
              </Link>
            </div>
          </Reveal>

          {/* Parallel Topic Segregation Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Topic 1 Column */}
            <div className="bg-paper-raised p-6 sm:p-8 rounded-[28px] border border-rule hover:border-signal/40 transition-all shadow-xs flex flex-col">
              <div className="mb-6 pb-4 border-b border-rule">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] font-semibold text-signal uppercase tracking-wider">
                    Topic 01 · Guides 01–{String(topic1Posts.length).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    {topic1Posts.length} Guides
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-ink font-normal leading-snug">
                  {topicCluster.topic1}
                </h3>
              </div>

              <ol className="divide-y divide-rule/60">
                {topic1Posts.map((post, idx) => {
                  const num = idx + 1;
                  const isMaster = post.slug === NICHE_PILLAR_SLUGS[config.key];
                  return (
                    <li key={post.slug} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3.5 group">
                      <span className="font-mono text-xs font-semibold text-signal w-7 pt-0.5 shrink-0 select-none">
                        {String(num).padStart(2, '0')}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/blog/${post.slug}/`}
                          className="text-xs sm:text-sm text-ink/90 group-hover:text-signal transition-colors leading-relaxed font-medium block"
                        >
                          {post.title}
                          {isMaster && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-signal/10 text-signal font-mono text-[10px] font-semibold uppercase tracking-wider align-middle">
                              ★ Master Pillar
                            </span>
                          )}
                        </Link>
                      </div>
                      <span className="text-[11px] font-mono text-muted/40 group-hover:text-signal opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-1 pt-0.5">
                        →
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Topic 2 Column */}
            <div className="bg-paper-raised p-6 sm:p-8 rounded-[28px] border border-rule hover:border-signal/40 transition-all shadow-xs flex flex-col">
              <div className="mb-6 pb-4 border-b border-rule">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] font-semibold text-signal uppercase tracking-wider">
                    Topic 02 · Guides {String(splitIndex + 1).padStart(2, '0')}–{String(orderedPosts.length).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    {topic2Posts.length} Guides
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-ink font-normal leading-snug">
                  {topicCluster.topic2}
                </h3>
              </div>

              <ol start={splitIndex + 1} className="divide-y divide-rule/60">
                {topic2Posts.map((post, idx) => {
                  const num = splitIndex + idx + 1;
                  return (
                    <li key={post.slug} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3.5 group">
                      <span className="font-mono text-xs font-semibold text-muted group-hover:text-signal w-7 pt-0.5 shrink-0 select-none transition-colors">
                        {String(num).padStart(2, '0')}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/blog/${post.slug}/`}
                          className="text-xs sm:text-sm text-ink/90 group-hover:text-signal transition-colors leading-relaxed font-medium block"
                        >
                          {post.title}
                        </Link>
                      </div>
                      <span className="text-[11px] font-mono text-muted/40 group-hover:text-signal opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-1 pt-0.5">
                        →
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── Closing Commercial Conversion CTA ────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#0E0C0A] text-paper relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-signal/10 via-transparent to-transparent opacity-40 pointer-events-none" />

        <Shell>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="w-12 h-12 rounded-2xl bg-white/10 text-signal inline-flex items-center justify-center font-mono text-xl mb-6">
                ⚡
              </span>

              <h2 className="font-display text-4xl sm:text-6xl text-paper font-normal tracking-tight mb-6 leading-tight">
                Let your website sell before you do.
              </h2>

              <p className="text-paper/70 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Ready to commission a bespoke, high-converting digital platform for your{' '}
                {NICHES[config.key].toLowerCase()} practice? Schedule a 20-minute architecture
                discovery call with Deepak and Geetha.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="px-8 py-4 rounded-full bg-signal text-paper font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white hover:text-ink transition-all shadow-xl cursor-pointer"
                >
                  Schedule 20-Min Discovery Sprint →
                </button>

                <a
                  href={`https://wa.me/919940191835?text=${encodeURIComponent(
                    `Hi Deepak, I run a ${NICHES[config.key]} practice and would like to discuss a 7-day website sprint.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-paper font-mono text-xs uppercase tracking-wider transition-all border border-white/10 flex items-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-paper/50">
                <span>✓ 7-Day Fixed Sprint</span>
                <span>✓ Zero Monthly Retainers</span>
                <span>✓ 100% Code Ownership</span>
                <span>✓ Sub-Second Core Web Vitals</span>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Explore Other Client Niches ───────────────────────────── */}
      <section className="py-16 bg-paper border-t border-rule">
        <Shell>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <p className="font-mono text-xs text-muted uppercase tracking-wider">
              Explore Other Specialized Client Industries
            </p>
            <Link
              to="/portfolio/"
              className="font-mono text-xs text-signal hover:text-ink transition-colors"
            >
              View all 17 interactive live demos →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {otherNiches.map((niche) => (
              <Link
                key={niche.key}
                to={`/web-design/${niche.key}/`}
                className="p-4 rounded-xl bg-paper-sunken border border-rule hover:border-signal/50 hover:bg-paper transition-all text-center flex flex-col items-center justify-center group"
              >
                <span className="font-display text-sm text-ink group-hover:text-signal transition-colors font-medium">
                  {NICHES[niche.key]}
                </span>
                <span className="font-mono text-[10px] text-muted mt-1">7-Day Sprint →</span>
              </Link>
            ))}
          </div>
        </Shell>
      </section>
    </>
  );
}
