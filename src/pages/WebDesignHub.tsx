import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { NICHES, NICHE_PILLAR_SLUGS } from '../lib/blog';
import { NICHE_LANDING_DATA } from '../data/nicheLandingData';
import { BANGALORE_LOCALITIES } from '../data/bangaloreLocalities';
import { GLOBAL_MARKETS_DATA } from '../data/globalMarketsData';
import { useGeoPricing } from '../lib/geoPricing';

/* ═══════════════════════════════════════════════════════════════════
   UNCODED HUB — MASTER WEB DESIGN SALES PAGE & 7-DAY SPRINT HUB
   Canonical: https://uncodedhub.com/web-design/

   Core Positioning:
   "Custom Websites. Built for Businesses That Think Bigger."
   "Your Business Deserves a Website That Looks as Good as the Work You Do."

   Dual-Market Structure:
   - India (Domestic): INR ₹, UPI/Razorpay, WhatsApp, Karnataka GST ITC invoice.
   - International (Global): USD/GBP/EUR/AUD, Stripe/Wise, Time-zone friendly, Remote delivery.
   ═══════════════════════════════════════════════════════════════════ */

interface WebDesignHubProps {
  onBook?: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All 50 Industries' },
  { id: 'healthcare-clinical', label: 'Healthcare & Medical' },
  { id: 'architecture-realestate', label: 'Architecture & Real Estate' },
  { id: 'hospitality-food', label: 'Hospitality & Dining' },
  { id: 'wellness-lifestyle', label: 'Wellness & Fitness' },
  { id: 'corporate-legal-finance', label: 'Corporate, Legal & Finance' },
  { id: 'services-industrial-retail', label: 'Services, Industry & Retail' },
];

const NICHE_CATEGORY_MAP: Record<string, string> = {
  // Architecture & Real Estate (9)
  'interior-designers': 'architecture-realestate',
  'real-estate': 'architecture-realestate',
  'architects': 'architecture-realestate',
  'construction-companies': 'architecture-realestate',
  'home-renovation': 'architecture-realestate',
  'home-services': 'architecture-realestate',
  'landscaping': 'architecture-realestate',
  'solar-companies': 'architecture-realestate',
  'hvac-contractors': 'architecture-realestate',

  // Healthcare & Medical (6)
  'dental-clinics': 'healthcare-clinical',
  'doctor-specialist': 'healthcare-clinical',
  'clinic-polyclinic': 'healthcare-clinical',
  'healthcare-diagnostics': 'healthcare-clinical',
  'veterinary-clinics': 'healthcare-clinical',
  'optometry-eyewear': 'healthcare-clinical',

  // Hospitality & Dining (5)
  'restaurants': 'hospitality-food',
  'hotels-resorts': 'hospitality-food',
  'bakeries-patisseries': 'hospitality-food',
  'breweries-bars': 'hospitality-food',
  'caterers': 'hospitality-food',

  // Wellness, Beauty & Fitness (5)
  'spa-wellness': 'wellness-lifestyle',
  'yoga-meditation': 'wellness-lifestyle',
  'gym-fitness-club': 'wellness-lifestyle',
  'fitness-coach': 'wellness-lifestyle',
  'salon-beauty': 'wellness-lifestyle',

  // Corporate, Legal & Finance (10)
  'law-firms': 'corporate-legal-finance',
  'accounting-firms': 'corporate-legal-finance',
  'financial-advisors': 'corporate-legal-finance',
  'business-portfolio': 'corporate-legal-finance',
  'recruitment-agencies': 'corporate-legal-finance',
  'immigration-consultants': 'corporate-legal-finance',
  'marketing-agencies': 'corporate-legal-finance',
  'coworking-spaces': 'corporate-legal-finance',
  'coaches-consultants': 'corporate-legal-finance',
  'educational-academy': 'corporate-legal-finance',

  // Services, Industry & Retail (15)
  'wedding-photographers': 'services-industrial-retail',
  'event-planners': 'services-industrial-retail',
  'creative-portfolio': 'services-industrial-retail',
  'ecommerce-brands': 'services-industrial-retail',
  'jewellery-stores': 'services-industrial-retail',
  'cleaning-services': 'services-industrial-retail',
  'pest-control': 'services-industrial-retail',
  'packers-movers': 'services-industrial-retail',
  'automotive-garages': 'services-industrial-retail',
  'manufacturing-oems': 'services-industrial-retail',
  'logistics-transport': 'services-industrial-retail',
  'security-surveillance': 'services-industrial-retail',
  'daycares-preschools': 'services-industrial-retail',
  'driving-schools': 'services-industrial-retail',
  'astrology-vastu': 'services-industrial-retail',
};

const INDUSTRY_ICONS: Record<string, string> = {
  'interior-designers': '📐',
  'real-estate': '🏛️',
  'architects': '🏛️',
  'construction-companies': '🏗️',
  'home-renovation': '🔨',
  'home-services': '💧',
  'landscaping': '🌳',
  'solar-companies': '☀️',
  'hvac-contractors': '❄️',
  'dental-clinics': '🦷',
  'doctor-specialist': '🩺',
  'clinic-polyclinic': '🏥',
  'healthcare-diagnostics': '🔬',
  'veterinary-clinics': '🐾',
  'optometry-eyewear': '👓',
  'restaurants': '🍽️',
  'hotels-resorts': '🏨',
  'bakeries-patisseries': '🥐',
  'breweries-bars': '🍺',
  'caterers': '🍱',
  'spa-wellness': '🌿',
  'yoga-meditation': '🧘',
  'gym-fitness-club': '⚡',
  'fitness-coach': '🏋️',
  'salon-beauty': '✨',
  'law-firms': '⚖️',
  'accounting-firms': '📊',
  'financial-advisors': '📈',
  'business-portfolio': '💼',
  'recruitment-agencies': '🤝',
  'immigration-consultants': '✈️',
  'marketing-agencies': '🚀',
  'coworking-spaces': '🏢',
  'coaches-consultants': '🎯',
  'educational-academy': '🎓',
  'wedding-photographers': '📷',
  'event-planners': '🎉',
  'creative-portfolio': '🎨',
  'ecommerce-brands': '🛍️',
  'jewellery-stores': '💎',
  'cleaning-services': '✨',
  'pest-control': '🛡️',
  'packers-movers': '📦',
  'automotive-garages': '🏎️',
  'manufacturing-oems': '⚙️',
  'logistics-transport': '🚛',
  'security-surveillance': '📹',
  'daycares-preschools': '🧸',
  'driving-schools': '🚗',
  'astrology-vastu': '🔮',
};

const SPRINT_DAYS = [
  {
    day: 'Day 01',
    phase: 'Discovery & Strategic Positioning',
    summary: 'Brand intake, customer avatar mapping, conversion goal alignment, and sitemap lock.',
    details: 'We audit your existing assets, research local rivals, and define the exact buyer journey that turns casual traffic into committed inquiries.',
  },
  {
    day: 'Day 02',
    phase: 'Design Direction & Visual Identity',
    summary: 'Typography pairing, palette harmonies, layout structure, and 3 distinct visual directions.',
    details: 'You review 3 tailored visual aesthetic directions (e.g. Obsidian Luxe, Heritage Light, Avant-Garde) to lock in your brand certainty.',
  },
  {
    day: 'Days 03–04',
    phase: 'Custom Development & Engineering',
    summary: 'Handcrafted semantic React & Vite codebase with zero WordPress bloat and zero plugins.',
    details: 'Hand-coded architecture optimized for mobile speed, responsive breakpoints, accessible markup, and sub-0.8s load times on real 4G networks.',
  },
  {
    day: 'Day 05',
    phase: 'Content Architecture & Conversion Funnels',
    summary: 'Compelling positioning copy, high-resolution WebP imagery, booking engines, and inquiry forms.',
    details: 'Every section is engineered to eliminate buyer skepticism, showcase verifiable proof, and offer frictionless 2-tap contact routing.',
  },
  {
    day: 'Day 06',
    phase: 'Rigorous Testing & Performance Polish',
    summary: 'Cross-browser verification, mobile 4G stress testing, 99+ Core Web Vitals audit, and SEO schema.',
    details: 'We test across Safari, Chrome, Firefox, iOS, and Android to guarantee pixel perfection, flawless interactive forms, and Schema.org compliance.',
  },
  {
    day: 'Day 07',
    phase: 'Live Production Launch & Handover',
    summary: 'Domain DNS deployment, SSL encryption, Google Search Console indexing, and 100% Git transfer.',
    details: 'Your platform goes live to the world. You receive full GitHub repository transfer, clean documentation, and recorded founder video walkthroughs.',
  },
];

const SALES_FAQS = [
  {
    q: 'How is it possible to design, build, and launch a custom website in only 7 working days?',
    a: 'Most web design projects drag on for 3 to 6 months because agencies juggle 20 clients simultaneously, rely on multiple junior layers, and suffer from committee paralysis. At Uncoded Hub, co-founders Deepak and Geetha work single-threaded. We accept only two client sprints at a time and dedicate 7 consecutive working days exclusively to your platform. With zero bureaucratic handoffs and modern hand-crafted React tooling, we accomplish in a week what bloated agencies fail to deliver in a quarter.',
  },
  {
    q: 'Why do you offer two distinct buying paths for India and international clients?',
    a: 'We serve ambitious businesses both in our home market (India) and globally (US, UK, Australia, UAE, Europe, Singapore). Indian clients need local INR pricing, WhatsApp communication, Indian payment rails (UPI/Razorpay/NetBanking), and Karnataka GST B2B tax invoices with full Input Tax Credit. International clients need country-specific pricing, time-zone friendly remote workflows, Stripe/Wise international billing, and remote delivery. However, the quality of our design thinking, custom code, and senior founder attention is 100% identical regardless of location.',
  },
  {
    q: 'How does the contractual "On Time or 100% Free" guarantee work?',
    a: 'Before we accept your deposit, we agree on a fixed launch date and written project scope. If we fail to deliver your production-ready platform on or before that agreed date, you receive a 100% full refund of your deposit, and you keep the complete source code, assets, and design files completely free. We have maintained a 100% on-time delivery record because our single-threaded sprint model eliminates bottlenecks.',
  },
  {
    q: 'What do I need to prepare before the 7-day sprint begins?',
    a: 'Very little. During our 20-minute discovery call, we collect your logo, brand colors (if you have them), service list, and any existing photos. If you don’t have professional copy or imagery, we write conversion-focused copy decks for you and source or generate high-resolution editorial assets. Once the intake is approved, you sit back while we build.',
  },
  {
    q: 'Do I actually own 100% of my website after launch?',
    a: 'Yes, completely and unconditionally. Unlike agencies that trap you in proprietary CMS platforms or monthly hosting retainers, we hand over full GitHub source code, design assets, and credentials. Because our hand-coded React sites require no heavy databases or vulnerable PHP plugins, you can host your site for ₹0 to $5/month on global edge networks like Cloudflare or Vercel forever.',
  },
  {
    q: 'How does Uncoded Hub compare to hiring a traditional agency or an hourly freelancer?',
    a: 'Freelancers on hourly rates ($40–$100/hr or ₹1,500–₹4,000/hr) have misaligned incentives: the slower they work, the more you pay, and they frequently abandon projects midway. Traditional agencies charge ₹2,00,000 to ₹6,00,000 ($5,000 to $15,000+ abroad), assign your project to junior interns, and lock you into ₹10,000/month maintenance retainers. Uncoded Hub gives you senior co-founder delivery, sub-second mobile speed, fixed milestone pricing, and a binding 7-day completion guarantee.',
  },
];

export default function WebDesignHub({ onBook }: WebDesignHubProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeMarketPath, setActiveMarketPath] = useState<'india' | 'international'>('india');

  const { region, selectRegion, allRegions, isInternational } = useGeoPricing();

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleBooking = () => {
    if (onBook) {
      onBook();
    } else {
      window.location.href = '/contact/#book';
    }
  };

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

  // Top International Hubs for showcase
  const topGlobalMarkets = useMemo(() => {
    const featuredSlugs = ['us', 'uk', 'au', 'ae', 'ca', 'de', 'sg'];
    return featuredSlugs
      .map((slug) => GLOBAL_MARKETS_DATA[slug])
      .filter(Boolean);
  }, []);

  // Top Bangalore Localities for showcase
  const topBangaloreLocalities = useMemo(() => {
    const featuredSlugs = [
      'indiranagar',
      'koramangala',
      'whitefield',
      'hsr-layout',
      'jayanagar',
      'mg-road',
      'electronic-city',
      'bellandur',
      'jp-nagar',
      'malleswaram',
    ];
    return featuredSlugs
      .map((slug) => BANGALORE_LOCALITIES[slug])
      .filter(Boolean);
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://uncodedhub.com/web-design/',
        url: 'https://uncodedhub.com/web-design/',
        name: 'Custom Web Design & 7-Day Sprints — Uncoded Hub',
        description:
          'Uncoded Hub builds custom, high-performance websites for ambitious businesses in India and worldwide. 7-Day sprints, transparent pricing, 100% code ownership.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://uncodedhub.com/#website',
          url: 'https://uncodedhub.com/',
          name: 'Uncoded Hub',
        },
      },
      {
        '@type': 'Service',
        name: '7-Day Custom Web Design Sprint',
        provider: {
          '@type': 'Organization',
          name: 'Uncoded Hub',
          url: 'https://uncodedhub.com/',
          telephone: '+918660819023',
        },
        serviceType: 'Web Design & Development',
        areaServed: ['IN', 'US', 'GB', 'AU', 'AE', 'CA', 'DE', 'SG'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Custom Website Packages',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Essential Website',
              price: '35000',
              priceCurrency: 'INR',
              description: 'Custom responsive design, core pages, mobile-first performance, inquiry forms.',
            },
            {
              '@type': 'Offer',
              name: 'Growth Website (Recommended)',
              price: '55000',
              priceCurrency: 'INR',
              description: 'Complete digital flagship, interactive conversion feature, 3 visual aesthetic styles, 7-day guarantee.',
            },
            {
              '@type': 'Offer',
              name: 'Bespoke Digital Experience',
              price: '85000',
              priceCurrency: 'INR',
              description: 'Advanced custom application, dynamic database, client portal, multi-location routing.',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: SALES_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
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
    ],
  };

  return (
    <>
      <Helmet>
        <title>Custom Web Design & 7-Day Sprints — Uncoded Hub</title>
        <meta
          name="description"
          content="Your business deserves a website that looks as good as the work you do. Custom, high-performance websites for ambitious businesses in India and worldwide. 7-Day delivery guarantee: on time or free."
        />
        <meta
          name="keywords"
          content="custom web design, web design agency, 7 day website sprint, high performance websites, web design bangalore, international web development studio, React web design, boutique web agency"
        />
        <link rel="canonical" href="https://uncodedhub.com/web-design/" />
        <meta property="og:title" content="Custom Web Design & 7-Day Sprints — Uncoded Hub" />
        <meta
          property="og:description"
          content="Custom websites. Built for businesses that think bigger. 7-Day delivery guarantee: on time or 100% free."
        />
        <meta property="og:url" content="https://uncodedhub.com/web-design/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/web-design-hub.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Custom Web Design & 7-Day Sprints — Uncoded Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Web Design & 7-Day Sprints — Uncoded Hub" />
        <meta
          name="twitter:description"
          content="Custom websites. Built for businesses that think bigger. 7-Day delivery guarantee: on time or 100% free."
        />
        <meta name="twitter:image" content="https://uncodedhub.com/og/web-design-hub.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* ── Breadcrumb & Global Location Ribbon ────────────────────────── */}
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

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link
                to="/web-design/bangalore/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/10 hover:bg-signal/20 text-signal font-mono text-[11px] transition-colors"
              >
                <span>📍 Bangalore Studio &amp; 100 Localities →</span>
              </Link>
              <Link
                to="/markets/"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-rule hover:border-signal/50 text-muted hover:text-ink font-mono text-[11px] transition-colors"
              >
                <span>🌐 Global Delivery in 20+ Countries →</span>
              </Link>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-rule text-ink font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>7-Day Guarantee: On Time or Free</span>
              </div>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── 01. Central Customer-Centric Hero Section ─────────────────── */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-sunken border border-rule text-signal font-mono text-[11px] uppercase tracking-wider mb-6">
                <span>⚡ Custom Websites · Built for Businesses That Think Bigger</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05] mb-6">
                Your business deserves a website that looks as good as the work you do.
              </h1>

              <p className="text-muted text-base sm:text-xl leading-relaxed max-w-3xl mb-6">
                We build custom, high-performance websites for ambitious businesses that want to stand out, earn trust, and turn more visitors into enquiries.
              </p>

              <div className="p-5 rounded-2xl bg-paper-sunken border border-rule mb-10 max-w-3xl">
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-0 font-sans">
                  <strong>We combine thoughtful design, custom development, and conversion-focused experiences</strong> to help businesses build credibility and win customers. This works whether you are a premium dental clinic in Bengaluru, an architecture studio in London, a corporate law firm in New York, a boutique hospitality resort in Dubai, or a fast-growing brand in Australia.
                </p>
              </div>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-8 !py-4 text-sm rounded-full shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book a Free Discovery Call</span>
                  <span>→</span>
                </button>

                <a
                  href="#fifty-industries"
                  className="px-6 py-4 rounded-full border border-rule-strong hover:border-signal text-ink font-mono text-xs uppercase tracking-wider transition-colors bg-paper-raised inline-flex items-center gap-2"
                >
                  <span>Explore 50 Live Demos</span>
                  <span>↓</span>
                </a>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20project%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted hover:text-signal transition-colors inline-flex items-center gap-1.5 px-3 py-2"
                >
                  <span>💬 WhatsApp: +91 86608 19023</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Guarantees strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-rule font-mono text-xs">
                <div>
                  <span className="text-signal font-semibold block text-sm sm:text-base">50 Live Demos</span>
                  <span className="text-muted">Interactive Functional Builds</span>
                </div>
                <div>
                  <span className="text-signal font-semibold block text-sm sm:text-base">7 Working Days</span>
                  <span className="text-muted">Discovery to Live Launch</span>
                </div>
                <div>
                  <span className="text-signal font-semibold block text-sm sm:text-base">On Time or Free</span>
                  <span className="text-muted">Contractual Guarantee</span>
                </div>
                <div>
                  <span className="text-signal font-semibold block text-sm sm:text-base">100% Code Ownership</span>
                  <span className="text-muted">Zero Monthly Retainer Traps</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 02. Two Clear Buying Paths (One Studio, Two Markets) ──────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule" id="buying-paths">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">ONE STUDIO · TWO CLEAR BUYING PATHS</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Two ways to work with Uncoded Hub. One standard of quality.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Whether you are an ambitious business in India or an established company overseas, you get the exact same senior design thinking, development quality, and personal attention from our team. Your location determines the currency, communication channel, and payment options—never the quality of the work.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Path 1: India Domestic */}
            <Reveal delay={50}>
              <div
                onClick={() => {
                  setActiveMarketPath('india');
                  selectRegion('in');
                }}
                className={`p-8 sm:p-10 rounded-[28px] bg-paper border transition-all h-full flex flex-col justify-between cursor-pointer ${
                  activeMarketPath === 'india'
                    ? 'border-2 border-signal shadow-lg ring-4 ring-signal/5'
                    : 'border-rule hover:border-signal/50 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">🇮🇳</span>
                    <span className="px-3 py-1 rounded-full bg-signal/10 text-signal font-mono text-xs font-semibold uppercase tracking-wider">
                      India · Domestic
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-2">
                    India Projects (INR ₹)
                  </h3>
                  <p className="text-xs font-mono text-signal mb-4">
                    Transparent milestone packages starting from ₹12,000
                  </p>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                    Tailored for ambitious Indian private clinics, architecture studios, law practices, D2C brands, and tech firms wanting to dominate their local market.
                  </p>

                  <ul className="space-y-3 font-mono text-xs text-ink/90 mb-8 border-t border-rule pt-6">
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>INR transparent pricing:</strong> Fixed quotes with zero surprise invoices</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Direct WhatsApp desk:</strong> Real-time updates with founders Deepak &amp; Geetha</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Indian payment rails:</strong> UPI, NetBanking, Razorpay, NEFT/RTGS</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Karnataka GST Tax Invoice:</strong> Full B2B input tax credit (ITC) compliance</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Bangalore studio access:</strong> In-person alignment across 100 city localities</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-rule flex flex-col gap-3">
                  <a
                    href="#pricing-tiers"
                    onClick={() => selectRegion('in')}
                    className="btn-primary !py-3 !px-5 text-center justify-center text-xs rounded-full shadow-xs"
                  >
                    View Indian INR Packages →
                  </a>
                  <Link
                    to="/web-design/bangalore/"
                    className="text-xs font-mono text-center text-muted hover:text-signal transition-colors"
                  >
                    Explore Bangalore Local Hub &amp; 100 Localities ↗
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Path 2: International Global */}
            <Reveal delay={100}>
              <div
                onClick={() => {
                  setActiveMarketPath('international');
                  selectRegion('us');
                }}
                className={`p-8 sm:p-10 rounded-[28px] bg-paper border transition-all h-full flex flex-col justify-between cursor-pointer ${
                  activeMarketPath === 'international'
                    ? 'border-2 border-signal shadow-lg ring-4 ring-signal/5'
                    : 'border-rule hover:border-signal/50 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">🌐</span>
                    <span className="px-3 py-1 rounded-full bg-paper-sunken border border-rule text-ink font-mono text-xs font-semibold uppercase tracking-wider">
                      International · Global
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-2">
                    Global Projects (USD / GBP / EUR / AUD)
                  </h3>
                  <p className="text-xs font-mono text-signal mb-4">
                    Country-specific packages from $490 to $1,150+ USD
                  </p>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                    Engineered for private practices, boutique agencies, consultancies, and luxury brands in the US, UK, Australia, UAE, Europe, and Canada.
                  </p>

                  <ul className="space-y-3 font-mono text-xs text-ink/90 mb-8 border-t border-rule pt-6">
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Country-specific pricing:</strong> Localized currency rates tailored to your economy</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Time-zone friendly communication:</strong> Responsive across US, UK, UAE &amp; Australian hours</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Frictionless global payments:</strong> Stripe, Wise, international credit cards &amp; wire</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Remote project delivery:</strong> Async video walkthroughs, Loom updates &amp; Git repository</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Agency-grade quality, 65% savings:</strong> Compare with $5,000–$15,000 London or NYC fees</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-rule flex flex-col gap-3">
                  <a
                    href="#pricing-tiers"
                    onClick={() => selectRegion('us')}
                    className="btn-primary !py-3 !px-5 text-center justify-center text-xs rounded-full shadow-xs"
                  >
                    View Global Packages →
                  </a>
                  <Link
                    to="/markets/"
                    className="text-xs font-mono text-center text-muted hover:text-signal transition-colors"
                  >
                    Explore US, UK, Australia &amp; Global Hubs ↗
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 03. 50 Industries: Built Around How Your Business Works ──── */}
      <section className="py-20 sm:py-28 bg-paper" id="fifty-industries">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">CUSTOM DIGITAL ARCHITECTURE</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                A website built around the way your business works.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Every business has different customers, different challenges, and different ways of making money. A dental clinic needs a simple 2-tap appointment journey. An architect needs a breathtaking way to showcase projects. A manufacturer needs a clear way to present technical products and generate enquiries.
              </p>
              <p className="text-ink-soft text-sm sm:text-base mt-2 font-medium">
                We don’t believe in forcing every business into the same generic website template. We design around what your customers need to see, understand, and do.
              </p>
            </div>
          </Reveal>

          {/* Filter & Search Bar */}
          <div className="p-4 rounded-2xl bg-paper-sunken border border-rule mb-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
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
            <div className="relative w-full md:w-64 shrink-0">
              <input
                type="text"
                placeholder="Search industry or niche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-paper border border-rule rounded-full focus:outline-none focus:border-signal text-ink placeholder:text-muted"
              />
              <span className="absolute left-3 top-2.5 text-muted text-xs">🔍</span>
            </div>
          </div>

          {/* 50 Niches Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNiches.map((key, idx) => {
              const config = NICHE_LANDING_DATA[key];
              const pillarSlug = NICHE_PILLAR_SLUGS[key];
              const icon = INDUSTRY_ICONS[key] || '⚡';

              return (
                <Reveal key={key} delay={Math.min(idx * 20, 200)}>
                  <div className="p-7 rounded-[24px] bg-paper-raised border border-rule hover:border-signal/50 hover:shadow-lg transition-all flex flex-col justify-between h-full group">
                    <div>
                      {/* Meta header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-xl bg-paper-sunken border border-rule flex items-center justify-center text-lg">
                          {icon}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-paper border border-rule text-muted font-mono text-[9px] uppercase tracking-wider">
                            3 Themes
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-signal/10 text-signal font-mono text-[10px] font-semibold uppercase tracking-wider">
                            7-Day Sprint
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl sm:text-2xl text-ink font-medium mb-2.5 group-hover:text-signal transition-colors">
                        <Link to={`/web-design/${key}/`}>{NICHES[key]}</Link>
                      </h3>

                      {/* Subheadline / Commercial Pitch */}
                      <p className="text-muted text-xs leading-relaxed mb-5 line-clamp-3">
                        {config.subheadline}
                      </p>

                      {/* Key Industry Metric / Capability */}
                      <div className="p-3 rounded-xl bg-paper-sunken border border-rule mb-5">
                        <span className="text-[10px] font-mono uppercase text-muted tracking-wider block mb-0.5">
                          Core Capability
                        </span>
                        <span className="text-xs font-mono text-ink font-medium block">
                          {config.stats[0]?.label || 'Sub-second mobile speed'} ({config.stats[0]?.value})
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="pt-4 border-t border-rule flex flex-col gap-2 font-mono text-xs">
                      <Link
                        to={`/web-design/${key}/`}
                        className="btn-primary !py-2.5 !px-4 text-center justify-center w-full !text-xs rounded-xl shadow-xs"
                      >
                        Explore 7-Day Sprint →
                      </Link>

                      <a
                        href={`/demos/${key}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-paper border border-rule hover:border-signal/50 text-ink hover:text-signal text-center text-xs font-mono transition-colors flex items-center justify-center gap-1.5 group/demo"
                      >
                        <span>🎮 Test Live Demo (3 Themes)</span>
                        <span className="text-signal group-hover/demo:translate-x-0.5 transition-transform">↗</span>
                      </a>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-muted">
                        {pillarSlug && (
                          <Link
                            to={`/blog/${pillarSlug}/`}
                            className="hover:text-signal transition-colors"
                          >
                            Read Guide ↗
                          </Link>
                        )}
                        <Link
                          to={`/blog/industries/${key}/`}
                          className="hover:text-ink transition-colors"
                        >
                          Silo Details →
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

      {/* ── 04. Signature Seven-Day Sprint Breakdown ───────────────────── */}
      <section className="py-20 sm:py-28 bg-[#0E0C0A] text-paper relative overflow-hidden border-t border-white/10" id="sprint-process">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-signal/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="text-signal font-mono text-xs font-semibold uppercase tracking-wider block mb-3">
                OUR SIGNATURE OFFER · SINGLE-THREADED EXECUTION
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight mb-4">
                The 7-Day Sprint: From Intake to Live Launch.
              </h2>
              <p className="text-paper/70 text-sm sm:text-base leading-relaxed">
                Most web agencies take 3 to 6 months of endless revision cycles and account manager meetings. We work single-threaded with absolute discipline. In seven working days, your platform is conceived, designed, coded, tested, and published to the world.
              </p>
            </div>
          </Reveal>

          {/* 6 Step Roadmap */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {SPRINT_DAYS.map((step, idx) => (
              <Reveal key={step.day} delay={idx * 40}>
                <div className="p-7 rounded-[22px] bg-white/[0.04] border border-white/10 h-full flex flex-col justify-between hover:border-signal/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-signal font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20">
                        {step.day}
                      </span>
                      <span className="text-paper/40 font-mono text-xs">Phase 0{idx + 1}</span>
                    </div>

                    <h3 className="text-paper font-display text-xl font-medium mb-2">
                      {step.phase}
                    </h3>

                    <p className="text-paper/80 text-xs sm:text-sm font-medium mb-3 leading-relaxed">
                      {step.summary}
                    </p>

                    <p className="text-paper/50 text-xs leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Contractual On-Time Guarantee Box */}
          <Reveal>
            <div className="p-8 sm:p-10 rounded-[28px] bg-white/[0.06] border-2 border-signal/60 max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div>
                <span className="px-3 py-1 rounded-full bg-signal text-paper font-mono text-[11px] font-bold uppercase tracking-wider inline-block mb-3">
                  Contractual Guarantee
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-paper font-normal">
                  Delivered on time, or 100% free.
                </h3>
                <p className="text-paper/70 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                  Before we accept your deposit, we establish a binding launch date. If we fail to deliver your production-ready platform on or before that agreed date, you receive a full 100% refund of your deposit, and you keep the full codebase for free.
                </p>
              </div>

              <button
                type="button"
                onClick={handleBooking}
                className="btn-primary !py-3.5 !px-6 text-xs rounded-full shrink-0 shadow-lg cursor-pointer"
              >
                Claim Next Sprint Slot →
              </button>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 05. Three Structured Offer Tiers (Dual Pricing) ───────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule scroll-mt-24" id="pricing-tiers">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="card-tag mb-3">TRANSPARENT PRICING · NO HIDDEN FEES</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Three ways to build. Zero guesswork.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Choose the scope that matches your business stage. Every package is delivered directly by senior founders Deepak &amp; Geetha with 100% source code ownership.
              </p>

              {/* Dynamic Currency Switcher */}
              <div className="mt-8 inline-flex items-center gap-3 p-1.5 sm:px-4 sm:py-2 rounded-full bg-paper-raised border border-rule-strong shadow-xs">
                <span className="text-xs font-mono text-muted flex items-center gap-1.5">
                  <span className="text-base">{region.flag}</span>
                  <span className="hidden sm:inline">Pricing currency:</span>
                </span>
                <select
                  aria-label="Select pricing currency"
                  value={region.code}
                  onChange={(e) => {
                    selectRegion(e.target.value);
                    setActiveMarketPath(e.target.value === 'in' ? 'india' : 'international');
                  }}
                  className="bg-transparent font-mono text-xs text-ink font-semibold border-none outline-none cursor-pointer"
                >
                  {allRegions.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.flag} {r.name} ({r.currencyCode})
                    </option>
                  ))}
                </select>
                {isInternational ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-signal/10 text-signal font-bold uppercase">
                    Global Delivery
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-signal/10 text-signal font-bold uppercase">
                    Domestic India
                  </span>
                )}
              </div>
            </div>
          </Reveal>

          {/* 3 Packaged Tiers */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Tier 01: Essential Website */}
            <Reveal delay={50}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper-raised border border-rule hover:border-signal/50 shadow-xs h-full flex flex-col justify-between transition-all">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-2">
                    Tier 01 · Launchpad
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-3">
                    Essential Website
                  </h3>
                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    Custom responsive design and focused conversion architecture for solopreneurs, single-service campaigns, or new practice launches.
                  </p>

                  <div className="mb-6 pb-6 border-b border-rule">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-ink">
                        {region.pricing.starter}
                      </span>
                      <span className="text-xs font-mono text-muted">/ one-time</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-signal mt-1">
                      <span>{isInternational ? `${region.currencyCode} · Remote Delivery` : 'Starts from ₹12,000 INR (GST Eligible)'}</span>
                      <span className="text-muted">⏱ 3–5 Working Days</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-ink/90 font-mono mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Custom mobile-first layout (up to 3 pages)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Bespoke copy deck written from your discovery intake</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Sub-0.8s mobile LCP performance guarantee</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Direct WhatsApp click-to-chat &amp; inquiry forms</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>On-page technical SEO &amp; Schema.org markup</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>100% full source code transfer via clean Git repo</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full py-3.5 rounded-full font-mono text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer text-center bg-paper border border-rule-strong hover:border-ink text-ink"
                >
                  Book Essential Sprint →
                </button>
              </div>
            </Reveal>

            {/* Tier 02: Growth Website (Signature / Recommended) */}
            <Reveal delay={100}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper-raised border-2 border-signal relative shadow-xl h-full flex flex-col justify-between transition-all">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-signal text-paper font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  ★ Recommended · Signature Sprint
                </div>

                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold block mb-2">
                    Tier 02 · Full Business Platform
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-3">
                    Growth Website
                  </h3>
                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    The definitive digital flagship for established businesses, practices, and studios that want to dominate their market and convert high-ticket clients.
                  </p>

                  <div className="mb-6 pb-6 border-b border-rule">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-ink">
                        {region.pricing.growth}
                      </span>
                      <span className="text-xs font-mono text-muted">/ one-time</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-signal mt-1">
                      <span>{isInternational ? `${region.currencyCode} · Direct Founder Sprint` : 'Starts from ₹20,000 INR (GST Eligible)'}</span>
                      <span className="text-muted">⏱ 7 Days (On Time or Free)</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-ink/90 font-mono mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Full multi-page architecture (Up to 5–8 bespoke pages)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>High-ticket positioning copy crafted before design begins</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Interactive conversion tool (Booking / Cost Estimator / Menu)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>3 Switchable visual aesthetic styles (e.g. Obsidian vs Heritage)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Full Local / International SEO &amp; Google Analytics 4 tracking</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span><strong>Contractual 7-day guarantee:</strong> On time or 100% free</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>30 Days of direct founder support with Deepak &amp; Geetha</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full py-3.5 rounded-full font-mono text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer text-center bg-signal text-paper hover:bg-ink shadow-md"
                >
                  Claim 7-Day Sprint Slot →
                </button>
              </div>
            </Reveal>

            {/* Tier 03: Bespoke Digital Experience */}
            <Reveal delay={150}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper-raised border border-rule hover:border-signal/50 shadow-xs h-full flex flex-col justify-between transition-all">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-2">
                    Tier 03 · Application / Multi-Location
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-3">
                    Bespoke Digital Experience
                  </h3>
                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    Advanced web application architecture for multi-location clinics, large firms, or high-volume transactional platforms requiring bespoke engineering.
                  </p>

                  <div className="mb-6 pb-6 border-b border-rule">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-ink">
                        {region.pricing.bespoke}
                      </span>
                      <span className="text-xs font-mono text-muted">/ one-time</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-signal mt-1">
                      <span>{isInternational ? `${region.currencyCode} · Custom Architecture` : 'Starts from ₹50,000 INR (GST Eligible)'}</span>
                      <span className="text-muted">⏱ 10–14 Working Days</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-ink/90 font-mono mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Unlimited custom pages and multi-location directory routing</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Headless CMS or dynamic database architecture (Supabase / Postgres)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Custom client portal or secure encrypted document upload vault</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Third-party ERP, CRM, webhook, and payment automation pipeline</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>Topical authority sitemap &amp; deep structured data markup</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>60 Days of priority SLA founder warranty &amp; technical handover</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full py-3.5 rounded-full font-mono text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer text-center bg-paper border border-rule-strong hover:border-ink text-ink"
                >
                  Discuss Bespoke Scope →
                </button>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 06. Founders' Presence & Radical Accountability ───────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule" id="founders-presence">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="card-tag mb-3">SENIOR EXECUTION · ZERO JUNIOR HANDOFFS</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Direct senior delivery. Zero account managers.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                When you hire Uncoded Hub, you work directly with the people who actually design and build your website. No account managers playing telephone, no outsourced contractors, and no junior interns learning on your dime.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Deepak */}
            <Reveal delay={50}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper border border-rule hover:border-signal/50 transition-all shadow-xs flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-signal/10 border border-signal/20 flex items-center justify-center font-display text-2xl font-bold text-signal">
                      D
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-ink font-medium">Deepak</h3>
                      <p className="text-xs font-mono text-signal uppercase tracking-wider">
                        Co-Founder &amp; Technical Architect
                      </p>
                    </div>
                  </div>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                    Leads all custom frontend engineering, clean React architecture, sub-second speed optimization, and edge infrastructure. Deepak personally ensures every line of code is semantic, lightweight, and engineered for 99+ Core Web Vitals.
                  </p>

                  <div className="p-4 rounded-xl bg-paper-sunken border border-rule text-xs font-mono text-ink-soft">
                    <span className="text-signal font-bold block mb-1">Focus Areas:</span>
                    <span>Sub-second mobile speed · Clean Git codebases · Zero bloatware · Edge DNS &amp; Cloudflare</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Geetha */}
            <Reveal delay={100}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper border border-rule hover:border-signal/50 transition-all shadow-xs flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-signal/10 border border-signal/20 flex items-center justify-center font-display text-2xl font-bold text-signal">
                      G
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-ink font-medium">Geetha</h3>
                      <p className="text-xs font-mono text-signal uppercase tracking-wider">
                        Co-Founder &amp; Head of Design
                      </p>
                    </div>
                  </div>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                    Leads visual brand identity, typography systems, responsive UX architecture, and commercial conversion layout psychology. Geetha crafts the visual authority that makes your business look undeniably premium in the first 50 milliseconds.
                  </p>

                  <div className="p-4 rounded-xl bg-paper-sunken border border-rule text-xs font-mono text-ink-soft">
                    <span className="text-signal font-bold block mb-1">Focus Areas:</span>
                    <span>Editorial typography · 3 visual aesthetic themes · Conversion funnels · High-trust UX layout</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Direct Studio Commitments */}
          <div className="p-6 sm:p-8 rounded-2xl bg-paper border border-rule max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
            <div className="text-muted">
              ⚡ <strong>Radical Accountability:</strong> We run single-threaded. Maximum 2 active client sprints simultaneously. Direct WhatsApp &amp; phone line to both founders: <strong className="text-ink">+91 86608 19023</strong>.
            </div>
            <button
              type="button"
              onClick={handleBooking}
              className="btn-primary !py-2.5 !px-5 text-xs rounded-full shrink-0 shadow-xs cursor-pointer"
            >
              Book Discovery With Founders →
            </button>
          </div>
        </Shell>
      </section>

      {/* ── 07. Local Bangalore & Global Market Hubs ───────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Bangalore Studio Spotlight */}
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper-raised border border-rule flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="card-tag">LOCAL BENGALURU STUDIO</span>
                    <span className="text-xs font-mono text-signal font-semibold">100 Localities</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-3">
                    Web Design in Bangalore
                  </h3>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                    Headquartered in Bengaluru, we build custom React websites for local clinics, interior design studios, real estate firms, and technology companies across Indiranagar, Koramangala, Whitefield, HSR Layout, Jayanagar, and MG Road.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {topBangaloreLocalities.slice(0, 6).map((loc) => (
                      <Link
                        key={loc.slug}
                        to={`/web-design/bangalore/${loc.slug}/`}
                        className="p-2.5 rounded-xl bg-paper-sunken border border-rule hover:border-signal/50 text-xs font-mono text-ink-soft hover:text-signal transition-colors flex items-center justify-between"
                      >
                        <span>{loc.name}</span>
                        <span className="text-[10px] text-muted">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/web-design/bangalore/"
                  className="btn-primary !py-3 !px-5 text-center justify-center text-xs rounded-full shadow-xs"
                >
                  Explore All 100 Bangalore Localities →
                </Link>
              </div>

              {/* International Hub Spotlight */}
              <div className="p-8 sm:p-10 rounded-[28px] bg-paper-raised border border-rule flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="card-tag">GLOBAL DELIVERY</span>
                    <span className="text-xs font-mono text-signal font-semibold">20+ Countries</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-3">
                    International Web Design Hubs
                  </h3>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                    Delivering world-class digital platforms for ambitious private practices, law firms, and boutique agencies worldwide. Remote delivery with async Loom updates, Stripe/Wise invoicing, and 65% cost savings over local agencies.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {topGlobalMarkets.slice(0, 6).map((m) => (
                      <Link
                        key={m.slug}
                        to={`/markets/${m.slug}/`}
                        className="p-2.5 rounded-xl bg-paper-sunken border border-rule hover:border-signal/50 text-xs font-mono text-ink-soft hover:text-signal transition-colors flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{m.flag}</span>
                          <span>{m.countryName}</span>
                        </span>
                        <span className="text-[10px] text-muted">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/markets/"
                  className="border border-rule-strong hover:border-signal text-ink hover:text-signal font-mono text-xs py-3 px-5 rounded-full transition-colors bg-paper text-center justify-center inline-flex items-center gap-2"
                >
                  Explore International Client Hubs →
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 08. Comprehensive Sales & Buying FAQs ────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="card-tag mb-3">RADICAL CLARITY</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Everything you need to know about our 7-day sprint model, dual-market pricing, on-time guarantee, and code ownership.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {SALES_FAQS.map((faq, idx) => {
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

      {/* ── 09. Closing High-Converting Hero CTA ──────────────────────── */}
      <section className="py-24 sm:py-32 bg-paper text-center">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-signal/10 text-signal inline-flex items-center justify-center font-mono text-2xl mb-6 border border-signal/20">
                ⚡
              </div>

              <h2 className="font-display text-4xl sm:text-6xl text-ink font-normal tracking-tight mb-6 leading-tight">
                Ready to build a website that looks as good as the work you do?
              </h2>

              <p className="text-muted text-base sm:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                Book a free 20-minute discovery call directly with Deepak &amp; Geetha. We’ll review your business, explore live specimens in your industry, and give you an exact written scope and launch date before you commit a single rupee or dollar.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-9 !py-4 text-sm rounded-full shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book Free Discovery Call</span>
                  <span>→</span>
                </button>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I%20would%20like%20to%20discuss%20a%207-day%20website%20sprint."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-rule-strong hover:border-ink text-ink font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 bg-paper-raised"
                >
                  <span>WhatsApp Co-Founders Directly</span>
                  <span>↗</span>
                </a>
              </div>

              <p className="text-muted font-mono text-xs mt-6">
                Direct phone: +91 86608 19023 · 100% Free Consultation · Zero Pressure
              </p>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
