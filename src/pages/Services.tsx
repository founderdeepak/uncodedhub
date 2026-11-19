import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { useGeoPricing } from '../lib/geoPricing';
import { GRAND_SLAM_BONUS } from '../data/servicesData';

/* ═══════════════════════════════════════════════════════════════════
   UNCODED HUB — SERVICES & PRICING BUYING GUIDE
   Canonical: https://uncodedhub.com/services/

   Core Positioning:
   "Four Scopes. No Surprises."
   "A Clear Plan. A Fixed Price. A Website Built Around Your Business."
   ═══════════════════════════════════════════════════════════════════ */

interface ServicesProps {
  onBook?: () => void;
}

const SERVICE_PACKAGES = [
  {
    id: 'single-page',
    slug: 'single-page-website',
    path: '/services/single-page-website/',
    tierNum: '01 · Fast Launch',
    name: 'Single Page Website Sprint',
    tagline: 'For one clear offer, paid ad campaigns, and fast market validation.',
    priceInr: '₹20,000 – ₹35,000',
    priceUsd: '$990 – $1,800',
    timeline: '3 Working Days',
    idealFor: 'Landing pages, Google Ads campaigns, single service offers, and fast MVP launches.',
    deliverables: [
      'One custom-designed responsive page (mobile + tablet + desktop)',
      'High-converting sales copywriting written from your discovery call',
      'Enquiry form & direct click-to-WhatsApp routing',
      'Google Analytics 4 & on-page technical SEO groundwork',
      'Sub-0.8s mobile LCP speed guarantee (95+ Lighthouse)',
      '₹15,000 Local Inbound Authority & Review Machine Bonus (FREE)',
      '100% source code ownership in clean Git repository',
    ],
    popular: false,
    ctaText: 'Explore Single Page Spec',
  },
  {
    id: 'business-website',
    slug: 'business-website',
    path: '/services/business-website/',
    tierNum: '02 · Most Popular',
    name: 'Custom Business Website',
    tagline: 'For practices, studios, and high-ticket service firms wanting local market authority.',
    priceInr: '₹35,000 – ₹55,000',
    priceUsd: '$1,800 – $2,800',
    timeline: '7 Working Days (Contractual Guarantee)',
    idealFor: 'Clinics, architecture studios, interior firms, law practices, and premium local service firms.',
    deliverables: [
      'Up to 5–8 custom responsive pages (Home, Services, Case Studies, Contact)',
      'Complete end-to-end copywriting crafted from customer psychology',
      'Interactive conversion mechanism (Project Cost Calculator / Booking Flow)',
      '3 switchable visual aesthetic styles (e.g. Obsidian vs Warm Heritage)',
      'Complete Local SEO Schema.org architecture & Search Console setup',
      'Contractual 7-day guarantee: On time or 100% free',
      '₹15,000 Local Inbound Authority & Review Machine Bonus (FREE)',
      '30-day post-launch direct founder support',
    ],
    popular: true,
    ctaText: 'Explore Business Spec',
  },
  {
    id: 'online-store',
    slug: 'ecommerce-website',
    path: '/services/ecommerce-website/',
    tierNum: '03 · E-Commerce',
    name: 'Custom D2C Online Store',
    tagline: 'High-speed storefront with sub-second checkout and zero sluggish app bloat.',
    priceInr: '₹85,000 – ₹1,25,000',
    priceUsd: '$2,800 – $4,200',
    timeline: '2–3 Weeks',
    idealFor: 'D2C boutique brands, artisanal bakeries, jewellery designers, and specialty retailers.',
    deliverables: [
      'High-speed product catalogue with live search & instant filters',
      'Razorpay, Stripe, UPI & International card payment gateway integrations',
      '1-Click WhatsApp Express Order option for frictionless checkout',
      'Automated instant order notifications (email & WhatsApp)',
      'Automated abandoned-cart recovery funnels',
      'Clean inventory admin dashboard & staff video walkthrough',
      '₹15,000 Local Inbound Authority & Review Machine Bonus (FREE)',
      '30-day priority post-launch founder warranty',
    ],
    popular: false,
    ctaText: 'Explore Online Store Spec',
  },
  {
    id: 'website-redesign',
    slug: 'website-redesign',
    path: '/services/website-redesign/',
    tierNum: '04 · Modernization',
    name: 'Website Redesign & Speed Sprint',
    tagline: 'Modernize outdated WordPress/Wix sites with 100% guaranteed SEO rank preservation.',
    priceInr: '₹15,000 – ₹25,000',
    priceUsd: '$750 – $1,250',
    timeline: '5 Working Days',
    idealFor: 'Businesses losing leads to competitors due to slow, broken WordPress or Wix websites.',
    deliverables: [
      'Comprehensive pre-migration audit of URLs, rankings & backlinks',
      '100% SEO rank preservation with meticulous 1:1 301 redirect map',
      'Sub-0.8s mobile speed guarantee (eliminates Core Web Vitals penalties)',
      'Modernized WhatsApp & enquiry booking flows',
      'Elimination of vulnerable WordPress plugins & PHP maintenance',
      '₹15,000 Local Inbound Authority & Review Machine Bonus (FREE)',
      '30-day post-launch zero-traffic-drop monitoring warranty',
    ],
    popular: false,
    ctaText: 'Explore Redesign Spec',
  },
];

const PROJECT_PATHWAYS = [
  {
    situation: 'Starting a new business or practice?',
    recommendation: 'Business Website (7 Days)',
    path: '/services/business-website/',
    badge: 'Authority Flagship',
    summary: 'Get a professional website that explains what you do, builds trust, and helps high-ticket customers contact you.',
  },
  {
    situation: 'Running a campaign or launching a single offer?',
    recommendation: 'Single Page Website (3 Days)',
    path: '/services/single-page-website/',
    badge: 'Conversion Funnel',
    summary: 'Get a focused landing page designed around one offer and one clear customer action, optimized for paid ads.',
  },
  {
    situation: 'Ready to sell products directly online?',
    recommendation: 'Online Store (2–3 Weeks)',
    path: '/services/ecommerce-website/',
    badge: 'Frictionless E-Commerce',
    summary: 'Build an ultra-fast online store with product catalogues, inventory, seamless payments, and automated notifications.',
  },
  {
    situation: 'Need a fresh start or complete website redesign?',
    recommendation: 'Website Redesign (5 Days)',
    path: '/services/website-redesign/',
    badge: '1:1 SEO Preservation',
    summary: 'Audit your existing website, modernize into ultra-fast React, and preserve 100% of accumulated Google SEO rankings with exact 301 redirects.',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery Call',
    duration: '20-Minute Video Call',
    desc: 'We learn about your business, customer saga, and conversion goals. Direct with founders Deepak & Geetha.',
  },
  {
    num: '02',
    title: 'Interactive Working Demo',
    duration: 'Zero Upfront Cost',
    desc: 'We build an interactive working demo tailored specifically for your business to test on your phone with zero upfront payment and zero obligation.',
  },
  {
    num: '03',
    title: 'Fixed Scope & Sprint',
    duration: 'Binding Milestone',
    desc: 'We confirm the exact scope, deliverable schedule, and contractual delivery guarantee in writing: on time or 100% free.',
  },
  {
    num: '04',
    title: 'Design & Engineering',
    duration: 'Single-Threaded Focus',
    desc: 'Geetha designs bespoke aesthetics; Deepak hand-codes the custom React components, animations, and speed optimizations.',
  },
  {
    num: '05',
    title: 'Launch & Bonus Handover',
    duration: 'Production Deployment',
    desc: 'We launch to your domain, configure Google Search Console, and hand over the ₹15,000 Local Inbound Authority machine bonus.',
  },
];

const BOUNDARIES = [
  {
    title: 'Native Mobile Apps',
    desc: 'We focus strictly on websites and responsive web applications, not native iOS or Android app store applications.',
  },
  {
    title: 'Monthly SEO Link-Building Retainers',
    desc: 'We build rock-solid technical SEO foundations and Schema.org markup, but do not sell recurring backlink packages.',
  },
  {
    title: 'Paid Advertising Campaign Management',
    desc: 'We build high-converting landing pages and tracking systems, but do not manage monthly Google or Meta ad spend.',
  },
  {
    title: 'Broken Website Takeovers & Patchwork',
    desc: 'We assess existing sites, but decline patching fragile legacy codebases. When repairing an old site is impractical, a fresh build saves time and money.',
  },
  {
    title: 'Oversized Multi-Month Software',
    desc: 'If your project requires an ERP or massive complex system outside our standard scopes, we will tell you honestly and create a separate phase-based plan.',
  },
];

const SERVICES_FAQS = [
  {
    q: 'How does your fixed-price policy work? Are there really no surprise additions?',
    a: 'Every project receives one fixed price based on an agreed written scope sheet before any work begins. That number never changes. If you request additional pages or custom features during the build, we quote those as separate add-ons and only begin once you approve. You will always know what you are paying for.',
  },
  {
    q: 'What is the payment milestone structure?',
    a: 'We work on a straightforward 50/50 milestone model: 50% reservation deposit upon signing the scope sheet to reserve your dedicated sprint slot on our calendar, and the remaining 50% balance is payable upon completion of staging review, prior to public DNS switchover and final repository transfer.',
  },
  {
    q: 'How does the contractual 7-day guarantee work?',
    a: 'Before we accept your deposit, we establish a binding launch date. If Uncoded Hub misses the agreed launch milestone due to our own delay, you receive an immediate 100% full refund of your deposit, and you retain the complete codebase, design files, and platform assets completely free.',
  },
  {
    q: 'Do I actually own 100% of my website after launch?',
    a: 'Yes, completely and unconditionally. Unlike agencies that lock you into proprietary CMS builders or monthly hosting retainers, your domain, hosting account, and clean GitHub repository are in your own name. Because our React sites have no heavy databases or PHP plugins, you can host your site for ₹0 to $5/month on global edge networks like Cloudflare or Vercel forever.',
  },
  {
    q: 'What is the difference between a planned website redesign and a broken-site takeover?',
    a: 'We gladly accept planned website modernizations—migrating an established business from a sluggish WordPress or Wix site to modern React while preserving 1:1 Google rankings and backlinks. However, we decline taking over broken, hacked, or abandoned spaghetti-code websites for piecemeal bug patching; such sites are far better served by a clean, fresh build.',
  },
  {
    q: 'What happens after launch if I need changes or ongoing updates?',
    a: 'Every package includes 30 days of direct founder support for bug fixes and adjustments. After that, you are completely free: you own the code and can edit it yourself, hire any developer, or commission small fixed-price mini-sprints with us. We also offer optional website care plans for busy founders who want priority updates.',
  },
];

export default function Services({ onBook }: ServicesProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://uncodedhub.com/services/',
        url: 'https://uncodedhub.com/services/',
        name: 'Website Design & Development Services & Pricing Packages — Uncoded Hub',
        description:
          'Three scopes. No surprises. Transparent website design and development packages: Single Page (3 days), Business Website (7 days), and Online Store (2–3 weeks).',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://uncodedhub.com/#website',
          url: 'https://uncodedhub.com/',
          name: 'Uncoded Hub',
        },
      },
      {
        '@type': 'OfferCatalog',
        name: 'Uncoded Hub Website Packages',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Single Page Website Sprint',
            price: '20000',
            priceCurrency: 'INR',
            description: 'One custom-designed page, copywriting, WhatsApp routing, delivered in 3 working days.',
            url: 'https://uncodedhub.com/services/single-page-website/',
          },
          {
            '@type': 'Offer',
            name: 'Custom Business Website (Flagship)',
            price: '35000',
            priceCurrency: 'INR',
            description: 'Complete digital flagship, booking flows, 3 themes, 7-day contractual guarantee.',
            url: 'https://uncodedhub.com/services/business-website/',
          },
          {
            '@type': 'Offer',
            name: 'Custom D2C Online Store',
            price: '85000',
            priceCurrency: 'INR',
            description: 'High-speed product catalogue, payment gateways, automated notifications, 2–3 weeks.',
            url: 'https://uncodedhub.com/services/ecommerce-website/',
          },
          {
            '@type': 'Offer',
            name: 'Website Redesign & Speed Sprint',
            price: '15000',
            priceCurrency: 'INR',
            description: 'Modernize WordPress/Wix to sub-second React with 100% SEO preservation in 5 working days.',
            url: 'https://uncodedhub.com/services/website-redesign/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICES_FAQS.map((faq) => ({
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

  return (
    <>
      <Helmet>
        <title>Website Design Services, Packages & Fixed Pricing — Uncoded Hub</title>
        <meta
          name="description"
          content="Three scopes. No surprises. Fixed-price web design packages: Single Page (3 days), Business Website (7 days), and Online Store (2–3 weeks). Delivered directly by Deepak & Geetha."
        />
        <meta
          name="keywords"
          content="website design services, fixed price website packages, 7 day website sprint, business website cost, website development pricing, single page website, ecommerce development, Uncoded Hub services"
        />
        <link rel="canonical" href="https://uncodedhub.com/services/" />
        <meta property="og:title" content="Website Design Services, Packages & Fixed Pricing — Uncoded Hub" />
        <meta
          property="og:description"
          content="Three scopes. No surprises. A clear plan, a fixed price, and a website built around your business."
        />
        <meta property="og:url" content="https://uncodedhub.com/services/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/services.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Website Design Services & Pricing Packages — Uncoded Hub" />
        <meta
          name="twitter:description"
          content="Three scopes. No surprises. Fixed-price website design and development packages."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Breadcrumb & Ribbon ────────────────────────────────────────── */}
      <div className="bg-paper border-b border-rule pt-20 sm:pt-24 pb-3">
        <Shell>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-muted">
              <Link to="/" className="hover:text-ink transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-ink font-medium">Services &amp; Pricing</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/10 text-signal font-mono text-[11px]">
                <span>⚡ Fixed Project Price · 50/50 Payment Terms</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-rule text-ink font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>On Time or 100% Free Guarantee</span>
              </div>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── 01. Hero: Three Scopes. No Surprises. ────────────────────── */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <span className="label text-signal font-semibold block mb-3">
                PRODUCTIZED BOUTIQUE STUDIO · FIXED-PRICE PACKAGES
              </span>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05] mb-4">
                Four Scopes. No Surprises.
              </h1>

              <p className="font-display text-2xl sm:text-3xl text-signal font-normal mb-6">
                A Clear Plan. A Fixed Price. A Website Built Around Your Business.
              </p>

              <p className="text-muted text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
                Whether you need a focused landing page, a complete business website, an online store, or an SEO-safe redesign, we make the process simple. We agree on exactly what is included, how long it will take, and what it will cost before work begins. No confusing hourly bills, no surprise charges, and zero endless agency delays.
              </p>

              {/* Four Ways to Work Summary Chips */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                <a
                  href="#single-page"
                  className="p-4 rounded-2xl bg-paper-sunken border border-rule hover:border-signal/50 transition-colors flex flex-col justify-between group"
                >
                  <span className="text-[11px] font-mono uppercase text-muted tracking-wider block mb-1">
                    01 · Single Page
                  </span>
                  <span className="font-display text-base text-ink font-medium group-hover:text-signal transition-colors block">
                    3 Working Days
                  </span>
                  <span className="text-xs text-muted block mt-1">One focused page for one clear offer.</span>
                </a>

                <a
                  href="#business-website"
                  className="p-4 rounded-2xl bg-paper-sunken border-2 border-signal/40 hover:border-signal transition-colors flex flex-col justify-between group relative"
                >
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-signal text-paper font-mono text-[9px] uppercase tracking-wider font-bold">
                    Recommended
                  </span>
                  <span className="text-[11px] font-mono uppercase text-signal tracking-wider block mb-1">
                    02 · Business Website
                  </span>
                  <span className="font-display text-base text-ink font-medium group-hover:text-signal transition-colors block">
                    7 Working Days
                  </span>
                  <span className="text-xs text-muted block mt-1">Complete custom digital flagship.</span>
                </a>

                <a
                  href="#online-store"
                  className="p-4 rounded-2xl bg-paper-sunken border border-rule hover:border-signal/50 transition-colors flex flex-col justify-between group"
                >
                  <span className="text-[11px] font-mono uppercase text-muted tracking-wider block mb-1">
                    03 · Online Store
                  </span>
                  <span className="font-display text-base text-ink font-medium group-hover:text-signal transition-colors block">
                    2–3 Weeks
                  </span>
                  <span className="text-xs text-muted block mt-1">Frictionless e-commerce storefront.</span>
                </a>

                <a
                  href="#website-redesign"
                  className="p-4 rounded-2xl bg-paper-sunken border border-rule hover:border-signal/50 transition-colors flex flex-col justify-between group"
                >
                  <span className="text-[11px] font-mono uppercase text-muted tracking-wider block mb-1">
                    04 · Redesign
                  </span>
                  <span className="font-display text-base text-ink font-medium group-hover:text-signal transition-colors block">
                    5 Working Days
                  </span>
                  <span className="text-xs text-muted block mt-1">100% SEO rank preservation.</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-8 !py-4 text-sm rounded-full shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book Your Free 20-Minute Discovery Call</span>
                  <span>→</span>
                </button>

                <a
                  href="#packages-comparison"
                  className="px-6 py-4 rounded-full border border-rule-strong hover:border-signal text-ink font-mono text-xs uppercase tracking-wider transition-colors bg-paper-raised inline-flex items-center gap-2"
                >
                  <span>Compare Packages &amp; Pricing</span>
                  <span>↓</span>
                </a>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20which%20website%20package%20fits%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted hover:text-signal transition-colors inline-flex items-center gap-1.5 px-3 py-2"
                >
                  <span>💬 WhatsApp: +91 86608 19023</span>
                  <span>↗</span>
                </a>
              </div>

              <p className="text-xs font-mono text-muted">
                Not sure which one is right for you? That’s what the free discovery call is for.
              </p>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 02. Choose Your Pathway (Find the Right Starting Point) ─────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule" id="pathways">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">DECISION ARCHITECTURE</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Not sure which website you need? Start here.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Every business is at a different stage. Here is how our three core scopes map directly to your commercial situation:
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {PROJECT_PATHWAYS.map((p, idx) => (
              <Reveal key={p.situation} delay={idx * 40}>
                <div className="p-7 rounded-[24px] bg-paper border border-rule hover:border-signal/50 transition-all shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-signal/10 text-signal font-mono text-[10px] uppercase font-bold tracking-wider">
                        {p.badge}
                      </span>
                      <span className="text-xs font-mono text-muted">Situation 0{idx + 1}</span>
                    </div>

                    <h3 className="font-display text-xl text-ink font-medium mb-3">
                      {p.situation}
                    </h3>

                    <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                      {p.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-rule flex items-center justify-between text-xs font-mono">
                    <span className="text-muted">
                      Recommended: <strong className="text-ink">{p.recommendation}</strong>
                    </span>
                    <Link
                      to={p.path}
                      className="text-signal hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Explore Dedicated Page</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-paper border border-rule text-xs font-mono text-muted max-w-4xl mx-auto flex items-start gap-3">
            <span className="text-signal text-base shrink-0">💡</span>
            <p className="mb-0 leading-relaxed">
              <strong>Planning a website redesign?</strong> We audit your existing website’s performance, keyword rankings, and URL structure first to ensure guaranteed 1:1 SEO ranking preservation. We decline patching fragile legacy code, but we execute smooth, flawless modernizations into fast React.
            </p>
          </div>
        </Shell>
      </section>

      {/* ── 03. Four Packages Side-by-Side Comparison ─────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule scroll-mt-24" id="packages-comparison">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="card-tag mb-3">FOUR PROVEN OFFERS</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Choose the right website for your business.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Whether you need a focused landing page, a complete business website, an online store, or an SEO-safe redesign, we provide a clear, fixed-price sprint with direct founder execution.
              </p>

              {/* Currency & Region Switcher */}
              <div className="mt-8 inline-flex items-center gap-3 p-1.5 sm:px-4 sm:py-2 rounded-full bg-paper-raised border border-rule-strong shadow-xs">
                <span className="text-xs font-mono text-muted flex items-center gap-1.5">
                  <span className="text-base">{region.flag}</span>
                  <span className="hidden sm:inline">Indicative pricing currency:</span>
                </span>
                <select
                  aria-label="Select pricing currency"
                  value={region.code}
                  onChange={(e) => selectRegion(e.target.value)}
                  className="bg-transparent font-mono text-xs text-ink font-semibold border-none outline-none cursor-pointer"
                >
                  {allRegions.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.flag} {r.name} ({r.currencyCode})
                    </option>
                  ))}
                </select>
                {isInternational && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-signal/10 text-signal font-bold uppercase">
                    International Sprint
                  </span>
                )}
              </div>
            </div>
          </Reveal>

          {/* Four Packages Cards - Expanded Full Width */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 mb-16">
            {SERVICE_PACKAGES.map((pkg, idx) => {
              const displayPrice = isInternational ? pkg.priceUsd : pkg.priceInr;

              return (
                <Reveal key={pkg.id} delay={idx * 50}>
                  <div
                    id={pkg.id}
                    className={`p-6 sm:p-7 rounded-[26px] h-full flex flex-col justify-between transition-all scroll-mt-28 ${
                      pkg.popular
                        ? 'bg-paper-raised border-2 border-signal relative shadow-xl ring-4 ring-signal/5'
                        : 'bg-paper border border-rule hover:border-signal/50 shadow-xs'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-signal text-paper font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                        ★ Most Popular · Highest ROI
                      </div>
                    )}

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1">
                        {pkg.tierNum}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl text-ink font-medium mb-1">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-signal font-mono mb-3">{pkg.timeline}</p>

                      <p className="text-muted text-xs mb-5 leading-relaxed">
                        {pkg.tagline}
                      </p>

                      <div className="mb-5 pb-5 border-b border-rule">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display text-2xl sm:text-3xl font-bold text-ink">
                            {displayPrice}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-muted block mt-1">
                          Exact fixed price confirmed in writing on discovery call
                        </span>
                      </div>

                      <div className="mb-5 p-3 rounded-xl bg-paper-sunken border border-rule text-xs font-mono text-ink-soft">
                        <strong className="block text-ink text-[11px] mb-0.5">Ideal For:</strong>
                        <span className="text-[11px] leading-snug">{pkg.idealFor}</span>
                      </div>

                      <span className="label text-signal font-semibold text-[11px] block mb-2.5">
                        Deliverables Included:
                      </span>
                      <ul className="space-y-2 text-xs text-ink/90 font-mono mb-6">
                        {pkg.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 leading-snug">
                            <span className="text-signal font-bold shrink-0">✓</span>
                            <span className="text-[11px]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={handleBooking}
                        className={`w-full py-3 rounded-full font-mono text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer text-center ${
                          pkg.popular
                            ? 'bg-signal text-paper hover:bg-ink shadow-md'
                            : 'bg-paper-raised border border-rule-strong hover:border-ink text-ink'
                        }`}
                      >
                        Claim Sprint Slot →
                      </button>

                      <Link
                        to={pkg.path}
                        className="w-full py-2 block text-center font-mono text-[11px] text-muted hover:text-signal transition-colors underline-offset-4 hover:underline"
                      >
                        View Full Specification Page →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Universal ₹15,000 Client Asset Bonus Showcase */}
          <Reveal>
            <div className="mb-14 p-8 sm:p-10 rounded-[28px] bg-paper-sunken border-2 border-signal/30 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-rule">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 text-signal font-mono text-xs font-bold uppercase tracking-wider mb-3">
                    <span>🎁 Universal Client Bonus · Worth ₹15,000</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl text-ink font-normal tracking-tight">
                    {GRAND_SLAM_BONUS.title}
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                    {GRAND_SLAM_BONUS.tagline} Included <strong>100% free</strong> with every website sprint, regardless of package tier.
                  </p>
                </div>
                <div className="shrink-0 p-4 rounded-2xl bg-paper border border-rule text-center">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-signal block">
                    ₹15,000 FREE
                  </span>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                    Included With Every Sprint
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {GRAND_SLAM_BONUS.components.map((comp) => (
                  <div
                    key={comp.num}
                    className="p-5 rounded-2xl bg-paper border border-rule flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-signal block mb-1.5">
                        Pillar {comp.num}
                      </span>
                      <h4 className="font-display text-base text-ink font-medium mb-2 leading-snug">
                        {comp.title}
                      </h4>
                      <p className="text-muted text-xs leading-relaxed">
                        {comp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Zero-Risk Pre-Payment Demo Guarantee */}
          <Reveal>
            <div className="p-8 sm:p-10 rounded-[28px] bg-gradient-to-br from-paper to-paper-sunken border-2 border-signal/40 max-w-5xl mx-auto shadow-lg mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <span>🛡️ Zero-Risk Pre-Payment Guarantee</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                    Inspect Your Live Demo Before Paying a Single Rupee.
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
                    We make our offer so good you would feel stupid saying no. After our 20-minute discovery call, we build a <strong>working interactive demo</strong> tailored specifically to your business. You test it on your own phone before committing to a contract or paying any advance.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-ink">
                    <span className="inline-flex items-center gap-1.5 text-signal font-semibold">
                      ✓ Zero upfront payment to view demo
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-signal font-semibold">
                      ✓ Contractual 7-day on-time guarantee
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-signal font-semibold">
                      ✓ 100% Direct senior founder execution
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !py-4 !px-8 text-xs rounded-full shrink-0 shadow-md cursor-pointer self-start md:self-auto"
                >
                  Book Discovery &amp; Claim Demo →
                </button>
              </div>
            </div>
          </Reveal>

          {/* Reassurance Callout Box */}
          <Reveal>
            <div className="p-6 sm:p-8 rounded-2xl bg-paper-sunken border border-rule max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
              <div className="text-muted leading-relaxed">
                🛡️ <strong>Get a fixed price for your project:</strong> Your exact price depends on the agreed pages, features, and integrations. We will provide an exact, itemized written quote during your free 20-minute discovery call before you commit to anything.
              </div>
              <button
                type="button"
                onClick={handleBooking}
                className="btn-primary !py-2.5 !px-5 text-xs rounded-full shrink-0 shadow-xs cursor-pointer"
              >
                Request Written Quote →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04. Our 5-Step Process (From Discovery to Launch) ─────────── */}
      <section className="py-20 sm:py-28 bg-[#0E0C0A] text-paper relative overflow-hidden border-t border-white/10" id="our-process">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-signal/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="text-signal font-mono text-xs font-semibold uppercase tracking-wider block mb-3">
                EXECUTION RIGOR · ZERO BUREAUCRACY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight mb-4">
                What happens after you get in touch?
              </h2>
              <p className="text-paper/70 text-sm sm:text-base leading-relaxed">
                We believe in extreme transparency. Here is the exact step-by-step path from your initial inquiry to a fully live, high-performing website.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
            {PROCESS_STEPS.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 40}>
                <div className="p-6 rounded-[20px] bg-white/[0.04] border border-white/10 h-full flex flex-col justify-between hover:border-signal/40 transition-colors">
                  <div>
                    <span className="text-signal font-mono text-xl font-bold block mb-2">
                      {step.num}
                    </span>
                    <h3 className="text-paper font-display text-lg font-medium mb-1">
                      {step.title}
                    </h3>
                    <span className="text-paper/40 font-mono text-[11px] block mb-3">
                      {step.duration}
                    </span>
                    <p className="text-paper/60 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="p-8 rounded-[24px] bg-white/[0.06] border border-white/10 max-w-3xl mx-auto text-center">
              <h3 className="font-display text-2xl text-paper font-normal mb-3">
                Ready to take Step 01?
              </h3>
              <p className="text-paper/70 text-xs sm:text-sm mb-6 leading-relaxed">
                Book a 20-minute discovery call directly with Deepak &amp; Geetha. No sales decks, no junior reps.
              </p>
              <button
                type="button"
                onClick={handleBooking}
                className="btn-primary !py-3.5 !px-8 text-xs rounded-full shadow-lg cursor-pointer"
              >
                Schedule Step 01 Discovery Call →
              </button>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 05. Clear Pricing: Fixed Price and 50/50 Terms ────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule" id="pricing-terms">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <span className="card-tag mb-3">PAYMENT ARCHITECTURE</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Clear pricing. No surprises.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                We don’t believe in confusing hourly bills, open-ended time-and-materials contracts, or unexpected charges. Every project starts with a clear discussion about what you need, followed by one fixed written price covering the agreed scope.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-[22px] bg-paper-sunken border border-rule">
              <span className="w-8 h-8 rounded-full bg-signal/10 text-signal flex items-center justify-center font-mono font-bold text-xs mb-4">
                01
              </span>
              <h3 className="font-display text-lg text-ink font-medium mb-2">
                One Fixed Project Price
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                Know exactly what your website will cost before work begins. One number, agreed in writing.
              </p>
            </div>

            <div className="p-6 rounded-[22px] bg-paper-sunken border border-rule">
              <span className="w-8 h-8 rounded-full bg-signal/10 text-signal flex items-center justify-center font-mono font-bold text-xs mb-4">
                02
              </span>
              <h3 className="font-display text-lg text-ink font-medium mb-2">
                50% to Get Started
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                Your first payment reserves your dedicated sprint slot in our calendar and initiates asset intake.
              </p>
            </div>

            <div className="p-6 rounded-[22px] bg-paper-sunken border border-rule">
              <span className="w-8 h-8 rounded-full bg-signal/10 text-signal flex items-center justify-center font-mono font-bold text-xs mb-4">
                03
              </span>
              <h3 className="font-display text-lg text-ink font-medium mb-2">
                50% After Staging Review
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                Pay the remaining balance only upon completion of staging review, prior to public live launch.
              </p>
            </div>

            <div className="p-6 rounded-[22px] bg-paper-sunken border border-rule">
              <span className="w-8 h-8 rounded-full bg-signal/10 text-signal flex items-center justify-center font-mono font-bold text-xs mb-4">
                04
              </span>
              <h3 className="font-display text-lg text-ink font-medium mb-2">
                No Surprise Additions
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                Any work outside the original scope is quoted separately and only begins with your explicit approval.
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 06. Contractual 7-Day Guarantee: On Time or Free ──────────── */}
      <section className="py-16 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="p-8 sm:p-12 rounded-[28px] bg-paper border-2 border-signal/60 max-w-4xl mx-auto shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-signal text-paper font-mono text-[11px] font-bold uppercase tracking-wider inline-block mb-3">
                    Contractual Commitment
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                    Our 7-Day Delivery Guarantee: On Time, or 100% Free.
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
                    Before we accept your deposit, we establish a binding launch milestone. If Uncoded Hub misses the agreed launch milestone due to our own delay, you receive an immediate <strong>100% refund of your deposit</strong>, and you retain the complete codebase, design files, and platform assets free of charge.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !py-3.5 !px-6 text-xs rounded-full shrink-0 shadow-xs cursor-pointer self-start md:self-auto"
                >
                  Reserve Your Sprint Cohort →
                </button>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 07. Where We Draw the Line (What We Don't Offer) ───────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule" id="boundaries">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">SELECTIVE SPECIALIZATION</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                We're a specialist web studio. Here's where we draw the line.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                We believe that doing everything makes an agency mediocre at everything. By maintaining strict boundaries, we deliver world-class websites with guaranteed speed and zero bloat.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOUNDARIES.map((b, idx) => (
              <Reveal key={b.title} delay={idx * 30}>
                <div className="p-6 rounded-[22px] bg-paper-sunken border border-rule h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                        ✕
                      </span>
                      <h3 className="font-display text-lg text-ink font-medium">
                        {b.title}
                      </h3>
                    </div>
                    <p className="text-muted text-xs leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            <div className="p-6 rounded-[22px] bg-signal/5 border border-signal/20 h-full flex flex-col justify-between">
              <div>
                <span className="text-signal font-mono text-xs uppercase font-bold tracking-wider block mb-2">
                  ⚡ What We Excel At
                </span>
                <h3 className="font-display text-lg text-ink font-medium mb-2">
                  High-Performance Custom Websites
                </h3>
                <p className="text-ink-soft text-xs leading-relaxed">
                  Sub-second mobile speed, editorial design, high-converting enquiry funnels, and 100% clean code ownership.
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 08. After Launch: Your Website. Your Business. Your Control. ─ */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule" id="after-launch">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">CLIENT INDEPENDENCE</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Your Website. Your Business. Your Control.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                We don’t want you to feel dependent on us just to own and operate your website. You get complete independence from day one.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[24px] bg-paper border border-rule shadow-xs">
              <span className="text-signal font-mono text-xs font-semibold uppercase tracking-wider block mb-3">
                01 · Total Ownership
              </span>
              <h3 className="font-display text-xl text-ink font-medium mb-3">
                You Own Your Website
              </h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                Your domain, hosting account, and complete GitHub repository are registered in your own name. No proprietary platform lock-in, and zero hostage holding.
              </p>
            </div>

            <div className="p-8 rounded-[24px] bg-paper border border-rule shadow-xs">
              <span className="text-signal font-mono text-xs font-semibold uppercase tracking-wider block mb-3">
                02 · Included Warranty
              </span>
              <h3 className="font-display text-xl text-ink font-medium mb-3">
                30-Day Post-Launch Support
              </h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                Every project includes 30 days of direct founder support with Deepak &amp; Geetha for bug fixes, adjustments, and team questions.
              </p>
            </div>

            <div className="p-8 rounded-[24px] bg-paper border border-rule shadow-xs">
              <span className="text-signal font-mono text-xs font-semibold uppercase tracking-wider block mb-3">
                03 · Room to Grow
              </span>
              <h3 className="font-display text-xl text-ink font-medium mb-3">
                Transparent Future Work
              </h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                Need new pages, features, or integrations later? We quote those as small, transparent mini-sprints. Optional monthly care plans are available for busy founders.
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 09. Why Uncoded Hub: Direct Senior Execution ───────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule" id="why-uncoded-hub">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <span className="card-tag mb-3">BOUTIQUE FOUNDER DELIVERY</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Why Uncoded Hub: Direct senior execution.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                When you hire Uncoded Hub, you work directly with the two senior founders who personally craft your website.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-[26px] bg-paper-sunken border border-rule flex items-start gap-5">
              <img
                src="/deepak.webp"
                alt="Deepak, Co-Founder & Technical Architect"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-signal/30 shadow-md shrink-0"
                width={80}
                height={80}
              />
              <div>
                <h3 className="font-display text-xl text-ink font-medium">Deepak</h3>
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2 font-semibold">
                  Co-Founder &amp; Technical Architect
                </span>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Deepak personally engineers your custom React codebase, tunes performance for 99+ Core Web Vitals, sets up edge hosting, and ensures zero bloatware.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[26px] bg-paper-sunken border border-rule flex items-start gap-5">
              <img
                src="/geetha.webp"
                alt="Geetha, Co-Founder & Head of Design"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-signal/30 shadow-md shrink-0"
                width={80}
                height={80}
              />
              <div>
                <h3 className="font-display text-xl text-ink font-medium">Geetha</h3>
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2 font-semibold">
                  Co-Founder &amp; Head of Design
                </span>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Geetha personally directs your visual brand identity, bespoke typography lockups, palette harmonies, 3 switchable aesthetic themes, and conversion psychology.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-rule text-xs font-mono text-muted text-center max-w-2xl mx-auto">
            ⚡ <strong>Single-Threaded Production:</strong> We accept a maximum of 2 active sprints at any time to guarantee undivided attention and flawless on-time delivery.
          </div>
        </Shell>
      </section>

      {/* ── 10. Supporting Industry & Locality Hubs ───────────────────── */}
      <section className="py-16 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[24px] bg-paper border border-rule flex flex-col justify-between">
                <div>
                  <span className="card-tag mb-2">50 INDUSTRY PLATFORMS</span>
                  <h3 className="font-display text-2xl text-ink font-medium">
                    A Website Built Around How Your Business Works
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-2 leading-relaxed">
                    Explore our 50 specialized industry platforms featuring 3 switchable visual themes, interactive functional tools, and live working specimens.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/web-design/"
                    className="btn-primary !py-2.5 !px-5 text-xs rounded-full inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Browse 50 Industry Demonstrations</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              <div className="p-8 rounded-[24px] bg-paper border border-rule flex flex-col justify-between">
                <div>
                  <span className="card-tag mb-2">LOCAL BENGALURU STUDIO</span>
                  <h3 className="font-display text-2xl text-ink font-medium">
                    Web Design Across 100 Bangalore Localities
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-2 leading-relaxed">
                    Headquartered in Bengaluru, we offer local studio alignment across Indiranagar, Koramangala, Whitefield, HSR Layout, Jayanagar, and MG Road.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/web-design/bangalore/"
                    className="border border-rule-strong hover:border-signal text-ink hover:text-signal font-mono text-xs py-2.5 px-5 rounded-full transition-colors bg-paper inline-flex items-center gap-1.5"
                  >
                    <span>Explore Bangalore Local Hub</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 11. Frequently Asked Questions ───────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="card-tag mb-3">TRANSPARENT ANSWERS</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                Clear answers on pricing, payment terms, delivery guarantees, and project scopes.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {SERVICES_FAQS.map((faq, idx) => {
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

      {/* ── 12. Closing Conversion CTA ───────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-paper text-center">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center -space-x-3">
                  <img
                    src="/deepak.webp"
                    alt="Deepak, Co-Founder"
                    className="w-14 h-14 rounded-full object-cover border-2 border-signal shadow-md"
                    width={56}
                    height={56}
                  />
                  <img
                    src="/geetha.webp"
                    alt="Geetha, Co-Founder"
                    className="w-14 h-14 rounded-full object-cover border-2 border-signal shadow-md"
                    width={56}
                    height={56}
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm font-display font-medium text-ink">
                    Deepak &amp; Geetha
                  </div>
                  <div className="text-xs font-mono text-signal font-semibold">
                    Co-Founders · Direct Senior Execution
                  </div>
                </div>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl text-ink font-normal tracking-tight mb-4 leading-tight">
                Let's work out what your business needs.
              </h2>

              <p className="text-muted text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Twenty minutes with Deepak and Geetha. Tell us about your business, what you’re trying to achieve, and what you need from your website. You’ll leave with a clear direction, an agreed scope, a fixed price, and a proposed delivery date. Or we’ll tell you honestly if we’re not the right fit.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-9 !py-4 text-sm rounded-full shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book Your Free 20-Minute Discovery Call</span>
                  <span>→</span>
                </button>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20project%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-rule-strong hover:border-ink text-ink font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 bg-paper-raised"
                >
                  <span>WhatsApp Co-Founders Directly</span>
                  <span>↗</span>
                </a>
              </div>

              <p className="text-muted font-mono text-xs mt-6">
                Direct phone: +91 86608 19023 · 100% Free Consultation · Zero Obligation
              </p>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
