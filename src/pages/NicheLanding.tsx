import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { PROJECTS } from '../data/projects';
import { getAllPosts, NICHES, NICHE_PILLAR_SLUGS } from '../lib/blog';
import { getNicheLandingData, NICHE_LANDING_DATA } from '../data/nicheLandingData';
import { BANGALORE_LOCALITIES } from '../data/bangaloreLocalities';

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

// Topic Segregation Clusters for Specialized Industry Niches (Silo Architecture)
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
  'home-services': {
    topic1: 'Emergency Dispatch UX, Transparent Quotations & Contractor Trust',
    topic2: 'Hyperlocal Local Pack Domination, Before/After Proof & WhatsApp Booking',
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
    if (!config) return PROJECTS[0];
    return (
      PROJECTS.find((p) => p.id === config.projectId) ||
      PROJECTS.find((p) => p.id === 'home-renovation') ||
      PROJECTS[0]
    );
  }, [config]);

  // Active theme index for demo specimen
  const [activeTheme, setActiveTheme] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const bangaloreLocalitiesForNiche = useMemo(() => {
    return Object.values(BANGALORE_LOCALITIES).filter((loc) =>
      loc.niches.some((n) => n.nicheKey === config.key)
    );
  }, [config.key]);

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

      {/* ── 4 Website Architecture Typologies ────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <p className="label text-signal mb-3">Architectural Blueprint</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                The 4 website architectures we engineer for {NICHES[config.key]}.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                A high-converting website is never an arbitrary arrangement of pretty images. Depending on your current revenue model and growth bottlenecks, we engineer your platform around one of four proven architectural frameworks:
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={0.05}>
              <div className="bg-paper-raised p-8 rounded-[28px] border border-rule-strong h-full flex flex-col justify-between hover:border-signal/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal font-semibold">
                      Model 01 · Acquisition Funnel
                    </span>
                    <span className="font-mono text-xs text-muted">Direct ROI Focus</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    High-Converting Landing Page &amp; Campaign Engine
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    A hyper-focused, single-destination conversion machine engineered specifically for Google Ads, Meta campaigns, and high-intent buyer search queries. Eliminates distracting multi-tier navigation in favor of a single clear narrative: Problem, Villain, Solution, Proof, and frictionless WhatsApp / Calendar booking.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-ink/80 mb-6">
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Zero navigational leaks or bounce friction</li>
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Dynamic headline matching your exact PPC keywords</li>
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Sticky mobile conversion bar with click-to-WhatsApp</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-rule font-mono text-xs text-signal">
                  Ideal for: Rapid customer acquisition &amp; targeted service promotions
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-paper-raised p-8 rounded-[28px] border border-rule-strong h-full flex flex-col justify-between hover:border-signal/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal font-semibold">
                      Model 02 · Enterprise Authority
                    </span>
                    <span className="font-mono text-xs text-muted">Brand &amp; E-E-A-T Pillar</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Corporate Authority Flagship Headquarters
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    A comprehensive multi-page digital headquarters designed to position your {NICHES[config.key].toLowerCase()} practice as the undisputed premier authority in your geographic corridor. Houses deep practitioner credentials, case study dossiers, methodology teardowns, and Google Helpful Content topic silos.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-ink/80 mb-6">
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Structured schema markup for Google Knowledge Graph</li>
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Deep case study proof dossiers with quantifiable outcomes</li>
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Dedicated pages for every specialized sub-service</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-rule font-mono text-xs text-signal">
                  Ideal for: High-ticket retainers, multi-partner firms &amp; premium practices
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-paper-raised p-8 rounded-[28px] border border-rule-strong h-full flex flex-col justify-between hover:border-signal/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal font-semibold">
                      Model 03 · Operational Speed
                    </span>
                    <span className="font-mono text-xs text-muted">Zero Phone Delay</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Direct Interactive Booking &amp; Dispatch Engine
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    Eliminates the dreaded phone-tag barrier by letting prospective clients self-qualify, select time slots, and confirm appointments 24/7. Equipped with automated reminder sequences, timezone handling, and instant WhatsApp booking notifications directly to your management desk.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-ink/80 mb-6">
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Synchronized with Google Calendar / Outlook in real-time</li>
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Pre-qualification intake questionnaire before confirmation</li>
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Automated WhatsApp SMS confirmation &amp; reminder pings</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-rule font-mono text-xs text-signal">
                  Ideal for: Clinics, consultation practices, salons &amp; reservation venues
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-paper-raised p-8 rounded-[28px] border border-rule-strong h-full flex flex-col justify-between hover:border-signal/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal font-semibold">
                      Model 04 · Trust Engineering
                    </span>
                    <span className="font-mono text-xs text-muted">Client Onboarding</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">
                    Client Document Vault &amp; Estimation Portal
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    Empowers prospective clients to calculate fee estimates, explore transparent rate cards, or upload project blueprints and diagnostic records securely. Drastically reduces sales cycle friction by answering the #1 unspoken question: "How much will this cost me, and how does it work?"
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-ink/80 mb-6">
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Interactive cost calculator tailored to your service tiers</li>
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> End-to-end encrypted file intake for drawings &amp; briefs</li>
                    <li className="flex items-center gap-2"><span className="text-signal font-bold">✓</span> Automated PDF proposal or scope generation on submission</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-rule font-mono text-xs text-signal">
                  Ideal for: Contractors, legal advocates, CA firms &amp; bespoke studios
                </div>
              </div>
            </Reveal>
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

      {/* ── Head-to-Head Comparison Matrix ────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <p className="label text-signal mb-3">Architectural Reality Check</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                Why bespoke hand-coded React crushes WordPress and DIY builders.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Most agencies push WordPress because it lets junior freelancers stack 40 plugins and bill you monthly maintenance retainers forever. Here is the unvarnished engineering reality:
              </p>
            </div>
          </Reveal>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-paper rounded-[24px] overflow-hidden border border-rule shadow-xs">
              <thead>
                <tr className="border-b border-rule bg-paper-raised text-xs font-mono uppercase tracking-wider text-muted">
                  <th className="p-5 sm:p-6 font-semibold">Evaluation Criteria</th>
                  <th className="p-5 sm:p-6 font-semibold text-signal bg-signal/5 border-x border-rule">
                    ⚡ Uncoded Hub (Hand-Coded React)
                  </th>
                  <th className="p-5 sm:p-6 font-semibold">Traditional WordPress Agency</th>
                  <th className="p-5 sm:p-6 font-semibold">DIY Builders (Wix / Squarespace)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule text-xs sm:text-sm">
                <tr>
                  <td className="p-5 sm:p-6 font-medium text-ink">
                    Mobile Page Speed (LCP)
                    <span className="block text-xs font-mono text-muted mt-1">First impression on 4G/5G phones</span>
                  </td>
                  <td className="p-5 sm:p-6 font-mono font-bold text-signal bg-signal/5 border-x border-rule">
                    ⚡ 0.4s – 0.8s (Instantaneous)
                  </td>
                  <td className="p-5 sm:p-6 font-mono text-muted">4.2s – 9.5s (High bounce rate)</td>
                  <td className="p-5 sm:p-6 font-mono text-muted">3.5s – 6.0s (Heavy JavaScript)</td>
                </tr>
                <tr>
                  <td className="p-5 sm:p-6 font-medium text-ink">
                    Security &amp; Vulnerabilities
                    <span className="block text-xs font-mono text-muted mt-1">Vulnerability to malware &amp; hacks</span>
                  </td>
                  <td className="p-5 sm:p-6 font-mono font-bold text-signal bg-signal/5 border-x border-rule">
                    🔒 Zero Databases · Zero Plugin CVEs
                  </td>
                  <td className="p-5 sm:p-6 font-mono text-muted">High Risk · 30+ Vulnerable Plugins</td>
                  <td className="p-5 sm:p-6 font-mono text-muted">Proprietary Closed Garden</td>
                </tr>
                <tr>
                  <td className="p-5 sm:p-6 font-medium text-ink">
                    Code &amp; Asset Ownership
                    <span className="block text-xs font-mono text-muted mt-1">Can you take your site anywhere?</span>
                  </td>
                  <td className="p-5 sm:p-6 font-mono font-bold text-signal bg-signal/5 border-x border-rule">
                    ✓ 100% Yours Forever (Clean Git Repo)
                  </td>
                  <td className="p-5 sm:p-6 font-mono text-muted">Held hostage to agency hosting</td>
                  <td className="p-5 sm:p-6 font-mono text-muted">Zero code export · 100% lock-in</td>
                </tr>
                <tr>
                  <td className="p-5 sm:p-6 font-medium text-ink">
                    Ongoing Monthly Retainers
                    <span className="block text-xs font-mono text-muted mt-1">Hidden maintenance expenses</span>
                  </td>
                  <td className="p-5 sm:p-6 font-mono font-bold text-signal bg-signal/5 border-x border-rule">
                    ₹0 / month (Hosted on global edge)
                  </td>
                  <td className="p-5 sm:p-6 font-mono text-muted">₹5,000 – ₹15,000 / mo maintenance</td>
                  <td className="p-5 sm:p-6 font-mono text-muted">₹1,500 – ₹3,500 / mo subscription</td>
                </tr>
                <tr>
                  <td className="p-5 sm:p-6 font-medium text-ink">
                    Technical SEO &amp; Schema
                    <span className="block text-xs font-mono text-muted mt-1">Google rich snippet indexation</span>
                  </td>
                  <td className="p-5 sm:p-6 font-mono font-bold text-signal bg-signal/5 border-x border-rule">
                    ✓ Hand-Crafted JSON-LD Schema
                  </td>
                  <td className="p-5 sm:p-6 font-mono text-muted">Bloated generic Yoast output</td>
                  <td className="p-5 sm:p-6 font-mono text-muted">Limited automated metadata</td>
                </tr>
                <tr>
                  <td className="p-5 sm:p-6 font-medium text-ink">
                    Production Delivery Speed
                    <span className="block text-xs font-mono text-muted mt-1">Kickoff call to live domain</span>
                  </td>
                  <td className="p-5 sm:p-6 font-mono font-bold text-signal bg-signal/5 border-x border-rule">
                    🚀 Guaranteed 7 Days (Late means free)
                  </td>
                  <td className="p-5 sm:p-6 font-mono text-muted">6 to 14 weeks of agency delays</td>
                  <td className="p-5 sm:p-6 font-mono text-muted">DIY: 3 months of trial &amp; error</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Shell>
      </section>

      {/* ── Transparent 3-Tier Investment Packages ────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="label text-signal mb-3">Transparent Commercial Investment</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                Fixed-scope pricing. Zero surprise invoices.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                We believe in 100% upfront pricing transparency. Choose the tier that matches your current growth stage. Every tier comes with our 7-day delivery guarantee, zero monthly retainers, and 100% source code ownership.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tier 1: Starter Launchpad */}
            <Reveal delay={0.05}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper border border-rule h-full flex flex-col justify-between hover:border-signal/50 transition-all shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">Tier 01</span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-paper-sunken border border-rule text-muted">7-Day Sprint</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">Starter Launchpad</h3>
                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    Perfect for emerging {NICHES[config.key].toLowerCase()} practitioners seeking an immediate, credibility-establishing digital presence.
                  </p>
                  <div className="mb-6 pb-6 border-b border-rule">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-ink">₹35,000</span>
                      <span className="text-xs font-mono text-muted">/ one-time</span>
                    </div>
                    <span className="text-xs font-mono text-signal mt-1 block">≈ $490 USD · Zero ongoing fees</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-ink/90 font-mono mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Single high-converting flagship page</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Sub-0.8s mobile LCP guarantee</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Direct WhatsApp click-to-chat funnel</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Google Business Local schema markup</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>100% clean Git repository handover</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full py-3.5 rounded-full bg-paper-raised border border-rule-strong hover:border-ink text-ink font-mono text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer text-center"
                >
                  Commission Starter Sprint →
                </button>
              </div>
            </Reveal>

            {/* Tier 2: Authority Growth Engine (Recommended) */}
            <Reveal delay={0.1}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper-raised border-2 border-signal relative h-full flex flex-col justify-between shadow-xl">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-signal text-paper font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  ★ Most Popular · Highest ROI
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">Tier 02</span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal font-semibold">7–10 Day Sprint</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">Authority Growth Engine</h3>
                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    Our flagship end-to-end platform engineered for established {NICHES[config.key].toLowerCase()} practices that need to capture market dominance.
                  </p>
                  <div className="mb-6 pb-6 border-b border-rule">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-ink">₹55,000</span>
                      <span className="text-xs font-mono text-muted">/ one-time</span>
                    </div>
                    <span className="text-xs font-mono text-signal mt-1 block">≈ $750 USD · Zero ongoing fees</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-ink/90 font-mono mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Full multi-page platform (Up to 5 Pages)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Interactive conversion tool (Booking / Estimator / Menu)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Complete E-E-A-T Schema &amp; Google Rich Snippets</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Verified Google Review badge integration</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Google Search Console &amp; Analytics setup</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>14 Days dedicated founder post-launch support</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full py-4 rounded-full bg-signal text-paper font-mono text-xs tracking-wider uppercase font-semibold hover:bg-ink transition-all cursor-pointer text-center shadow-md"
                >
                  Commission Growth Engine →
                </button>
              </div>
            </Reveal>

            {/* Tier 3: Bespoke Enterprise Platform */}
            <Reveal delay={0.15}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper border border-rule h-full flex flex-col justify-between hover:border-signal/50 transition-all shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">Tier 03</span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-paper-sunken border border-rule text-muted">14-Day Sprint</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">Bespoke Enterprise</h3>
                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    Custom web application architecture for multi-location groups, high-volume clinics, and corporate enterprises.
                  </p>
                  <div className="mb-6 pb-6 border-b border-rule">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-ink">₹85,000+</span>
                      <span className="text-xs font-mono text-muted">/ bespoke</span>
                    </div>
                    <span className="text-xs font-mono text-signal mt-1 block">≈ $1,150+ USD · Milestone scope</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-ink/90 font-mono mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Multi-location / multi-practitioner directory routing</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Custom client portal &amp; encrypted file upload vault</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Headless CMS or dynamic database architecture</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Custom CRM, ERP, and payment gateway webhooks</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Full corporate Karnataka GST tax invoice with ITC</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>30-Day priority founder SLA &amp; growth warranty</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full py-3.5 rounded-full bg-paper-raised border border-rule-strong hover:border-ink text-ink font-mono text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer text-center"
                >
                  Discuss Enterprise Scope →
                </button>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 3-Step Simple Buying Plan ─────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="label text-signal mb-3">Frictionless Path to Delivery</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                3 simple steps to your new {NICHES[config.key]} platform.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Zero sales reps. Zero endless bureaucratic meetings. You collaborate directly with Deepak (lead systems engineer) and Geetha (conversion designer) from Day 1 to live launch.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.05}>
              <div className="bg-paper-raised p-8 rounded-[28px] border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="w-12 h-12 rounded-2xl bg-signal/10 text-signal flex items-center justify-center font-mono text-lg font-bold mb-6">
                    01
                  </span>
                  <p className="font-mono text-xs text-signal uppercase tracking-wider font-semibold mb-2">Step 01 · 20 Minutes</p>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    20-Min Architecture Discovery Sprint
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    We audit your current website or new venture concept, pinpoint your conversion leaks, map your ideal customer profile, and confirm your 7-day sprint calendar lock. Zero sales pressure.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule text-xs font-mono text-muted">
                  Output: Scope Document &amp; Fixed-Price Agreement
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-paper-raised p-8 rounded-[28px] border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="w-12 h-12 rounded-2xl bg-signal/10 text-signal flex items-center justify-center font-mono text-lg font-bold mb-6">
                    02
                  </span>
                  <p className="font-mono text-xs text-signal uppercase tracking-wider font-semibold mb-2">Step 02 · 7 Days</p>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    7-Day Precision Sprint Execution
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Geetha crafts the bespoke visual typography and layout; Deepak codes the clean React components. You receive a private live development staging link on Day 3 to review progress in real-time.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule text-xs font-mono text-muted">
                  Output: 100% Hand-Crafted React Platform Staging
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-paper-raised p-8 rounded-[28px] border border-rule h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="w-12 h-12 rounded-2xl bg-signal/10 text-signal flex items-center justify-center font-mono text-lg font-bold mb-6">
                    03
                  </span>
                  <p className="font-mono text-xs text-signal uppercase tracking-wider font-semibold mb-2">Step 03 · Launch Day</p>
                  <h3 className="font-display text-xl text-ink font-medium mb-3">
                    Sub-Second Launch &amp; Handover
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Zero-downtime DNS cutover, Google Search Console indexing, JSON-LD schema verification, and 100% code repository handover to you. If we're late by even one hour, your build is 100% free.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-rule text-xs font-mono text-muted">
                  Output: Live Domain, Google Indexing &amp; Git Repository
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── Deep Knowledge Silo & Master Pillar Hub (SEO Core) ────── */}
      {orderedPosts.length > 0 && (
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
      )}

      {/* ── Comprehensive BOFU Objection-Busting FAQs ────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <p className="label text-signal mb-3">Honest Engineering Answers</p>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                Frequently asked questions for {NICHES[config.key]} web design.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Everything you need to know about our technology, deliverables, timelines, and commercial guarantees before you commission your build.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl space-y-4">
            {[
              {
                q: `Why hand-coded React instead of WordPress, Elementor, or Webflow for my ${NICHES[config.key]} website?`,
                a: `WordPress and visual page builders load between 35 and 60 bloated JavaScript and CSS files on every page visit, resulting in sluggish 4 to 8-second mobile load times. Google penalizes slow websites in search rankings, and over 53% of mobile users abandon pages that take more than 3 seconds. By hand-coding in React with Tailwind CSS, we eliminate all databases, PHP interpreters, and vulnerable plugins. Your site loads in 0.4 to 0.8 seconds on 4G mobile devices, has zero security vulnerabilities, and costs ₹0/month to host on global edge networks.`,
              },
              {
                q: `How can you genuinely build a custom ${NICHES[config.key]} website in just 7 days without cutting corners?`,
                a: `Traditional agencies take 3 to 6 months because of endless bureaucracy, account managers, and junior interns juggling 15 client projects simultaneously. At Uncoded Hub, Deepak and Geetha take on a maximum of two client production sprints at any given time. Because we operate in single-threaded focus without agency overhead, we accomplish in 7 days what fragmented agencies drag out over a quarter. We provide a binding contract guarantee: if your website is not live on your domain in 7 days, your entire build is 100% free.`,
              },
              {
                q: `What materials or assets do I need to prepare before our 7-day sprint begins?`,
                a: `During our 20-minute kickoff discovery call on Day 1, we guide you through our simple asset checklist. All we need is your logo (or brand name), high-resolution photos of your practice, clinic, projects, or team (if available; otherwise we source bespoke editorial photography), your primary service list, and any existing credentials. We write all the high-converting copy and craft the conversion strategy for you.`,
              },
              {
                q: `Do you charge ongoing monthly maintenance, hosting, or retainer fees?`,
                a: `No. Unlike WordPress agencies that lock you into ₹5,000 to ₹15,000 monthly maintenance contracts just to update plugins and prevent site crashes, our static React platforms have zero server moving parts, zero database vulnerabilities, and require zero routine maintenance. We deploy your site on high-speed global edge networks (Vercel or Cloudflare CDN) where standard hosting is completely free forever.`,
              },
              {
                q: `Who owns the domain, code, design, and intellectual property once completed?`,
                a: `You own 100% of everything, forever. Upon final delivery and launch, we hand over the full clean Git source code repository, all graphic assets, and DNS configurations. You are never trapped in a proprietary walled garden or forced into a retainer. If you ever want your in-house team to update it in the future, any modern web developer can read our clean, well-commented code.`,
              },
              {
                q: `How does this website rank on Google and attract high-ticket ${NICHES[config.key]} clients?`,
                a: `Every build incorporates our proprietary high-commercial-intent bottom-of-funnel search optimization architecture. We target non-branded, buyer-intent queries (such as "${NICHES[config.key].toLowerCase()} website design", "hire specialist for ${NICHES[config.key].toLowerCase()}", and local geography permutations). We inject full LocalBusiness, ProfessionalService, and Service schema markup in JSON-LD, ensure 100/100 Core Web Vitals, and architect the site to rank in both traditional Google Search and AI Overviews.`,
              },
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-paper-raised border border-rule overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-paper transition-colors"
                  >
                    <span className="font-display text-lg text-ink font-medium leading-snug">
                      {faq.q}
                    </span>
                    <span className="font-mono text-lg text-signal shrink-0 w-8 h-8 rounded-full bg-paper-sunken border border-rule flex items-center justify-center font-bold">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-rule/60 text-xs sm:text-sm text-muted leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
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
                  href={`https://wa.me/918660819023?text=${encodeURIComponent(
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

      {/* ── Hyperlocal Bengaluru Presence for this Niche ───────────── */}
      <section className="py-16 bg-paper-sunken border-t border-rule">
        <Shell>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-xs text-signal uppercase tracking-wider font-semibold">
                📍 Bengaluru Local Studio
              </p>
              <h3 className="font-display text-2xl text-ink font-medium mt-1">
                Looking for {NICHES[config.key]} web design in Bangalore?
              </h3>
            </div>
            <Link
              to="/web-design/bangalore/"
              className="btn-primary !py-2.5 !px-5 text-xs rounded-full inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
            >
              <span>Explore Bangalore Master Hub</span>
              <span>→</span>
            </Link>
          </div>

          <p className="text-muted text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed">
            Headquartered in Bengaluru, Deepak &amp; Geetha engineer high-speed digital platforms tailored to local commercial regulations, local landmarks, and high-intent patients &amp; clients across Bangalore.
          </p>

          {bangaloreLocalitiesForNiche.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {bangaloreLocalitiesForNiche.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/web-design/bangalore/${loc.slug}/${config.key}/`}
                  className="p-4 rounded-xl bg-paper-raised border border-rule hover:border-signal/50 hover:bg-paper transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-muted block mb-1">
                      {loc.zone} · PIN {loc.pincode}
                    </span>
                    <span className="font-display text-sm text-ink group-hover:text-signal transition-colors font-medium block">
                      {loc.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-signal mt-3 block">
                    View Local Spoke →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-paper-raised border border-rule flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <span className="text-muted">
                We deliver 7-day sprints for {NICHES[config.key]} across all 100 commercial corridors in Bangalore including Indiranagar, Whitefield, Koramangala, and HSR Layout.
              </span>
              <Link
                to="/web-design/bangalore/"
                className="text-signal hover:underline shrink-0 font-medium"
              >
                Browse All 100 Localities →
              </Link>
            </div>
          )}
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
              View all 50 interactive live demos →
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
