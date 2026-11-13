import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';

/* ═══════════════════════════════════════════════════════════════════
   UNCODED HUB — CLIENT-CENTRIC SERVICE ARCHITECTURE & BUYING DECISION GUIDE
   Organized strictly by what clients BUY, not by internal developer tools:
   1. Website Design (UI/UX, Responsive, Custom Visual Architecture)
   2. Website Development (Clean React, Zero Bloat, Custom Integrations)
   3. Website Redesign (Modernization, 1:1 SEO Preservation, Migration)
   4. Landing Pages (High-Intent PPC, Google Ads, Lead Generation)
   5. E-Commerce (Direct WhatsApp/UPI Checkout, Catalogues, Stores)
   6. Website Optimization (Sub-0.8s LCP, Core Web Vitals, Conversion Tuning)
   7. Website Maintenance (Zero-Retainer Care, Uptime, Security Backups)
   
   Featuring an authoritative Buying-Decision & Pricing Guide targeting:
   - website design cost for small business
   - business website development cost
   - website design packages for businesses
   - custom website development pricing
   - affordable website design packages
   - website development quotation
   - hire a website design agency
   - website designer hourly rate
   - website redesign cost
   - professional website design packages
   ═══════════════════════════════════════════════════════════════════ */

interface ServiceCategory {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  tagline: string;
  whatClientsBuy: string;
  deliverables: string[];
  idealFor: string;
  timeline: string;
  investmentTier: string;
}

const CLIENT_SERVICES: ServiceCategory[] = [
  {
    id: 'website-design',
    num: '01',
    title: 'Website Design (UI/UX & Brand Aesthetics)',
    shortDesc: 'Custom visual identity, responsive multi-breakpoint layouts, and high-conversion design systems.',
    tagline: 'Visual Certainty in the First 50 Milliseconds',
    whatClientsBuy:
      'High-ticket clients do not buy design for art’s sake; they buy visual authority that eliminates the fear of making an expensive mistake. We craft bespoke typography lockups, palette harmonies, and 3 distinct aesthetic options tailored to your market.',
    deliverables: [
      'Bespoke desktop, tablet, and mobile Figma / browser UI layouts',
      '3 distinct visual aesthetic directions (Obsidian Luxe, Heritage Light, Avant-Garde)',
      'Custom typography hierarchy and high-contrast accessibility tokens',
      'Interactive prototype walkthrough with zero generic template defaults',
    ],
    idealFor: 'Practices, luxury studios, boutique agencies, and high-ticket service firms.',
    timeline: 'Included in 7-Day Sprint',
    investmentTier: 'Part of all Core Packages',
  },
  {
    id: 'website-development',
    num: '02',
    title: 'Website Development (Hand-Coded & Custom Engineering)',
    shortDesc: 'Custom hand-coded React architecture, private database hooks, and seamless third-party integrations.',
    tagline: 'Zero Bloatware · Sub-Second Performance',
    whatClientsBuy:
      'Enterprise-grade speed and reliability without the technical debt of 45 conflicting WordPress plugins. Clean, semantic React code that loads in under 0.8 seconds on 4G phones and costs ₹0/month to host on global edge servers.',
    deliverables: [
      'Hand-crafted semantic React + Tailwind CSS code base',
      'Zero server vulnerabilities, zero PHP interpreters, zero database crashes',
      'Direct API integrations (Supabase, Calendly, WhatsApp webhooks, CRM)',
      '100% full source code ownership transferred via clean Git repository',
    ],
    idealFor: 'Businesses wanting a durable, ultra-fast platform they own 100% forever.',
    timeline: 'Included in 7-Day Sprint',
    investmentTier: 'From ₹35,000 to ₹85,000+',
  },
  {
    id: 'website-redesign',
    num: '03',
    title: 'Website Redesign & Platform Migration',
    shortDesc: 'Modernizing outdated, sluggish websites with guaranteed 1:1 SEO ranking preservation.',
    tagline: 'From Clunky WordPress to Lightning-Fast React',
    whatClientsBuy:
      'A complete modernization of an old, embarrassing website without losing a single organic Google keyword or backlink. We audit existing URL structures, map 301 redirects, and replace slow page builders with instant-load React architecture.',
    deliverables: [
      'Comprehensive pre-migration SEO crawl and URL redirect mapping',
      'Sub-0.8s mobile Core Web Vitals score (LCP, INP, CLS)',
      'Modern editorial layout overhaul with elevated positioning copy',
      'Preservation of all legacy Google Search Console rankings and authority',
    ],
    idealFor: 'Businesses with 3+ year old sites losing conversions to modern rivals.',
    timeline: '7 to 10 Working Days',
    investmentTier: 'Website Redesign Package: ₹45,000 – ₹75,000',
  },
  {
    id: 'landing-pages',
    num: '04',
    title: 'High-Converting Landing Pages (Lead Generation)',
    shortDesc: 'Laser-focused single-destination campaign pages engineered for Google Ads and paid campaigns.',
    tagline: 'Zero Leakage · High Commercial Intent Funnels',
    whatClientsBuy:
      'A focused conversion machine that turns expensive Google Ads or social campaign clicks into qualified phone calls and WhatsApp inquiries. Zero distracting navigation menus, compelling hook copy, and immediate interactive booking.',
    deliverables: [
      'Single bespoke high-intent page with dynamic headline matching',
      'Direct click-to-WhatsApp and calendar consultation scheduling',
      'Google Tag Manager, Meta Pixel, and conversion event tracking',
      'Tested across real 4G mobile devices for zero drop-off speed',
    ],
    idealFor: 'Ad campaigns, new service launches, and single-offer high-intent funnels.',
    timeline: '3 Working Days',
    investmentTier: 'Starter Campaign: ₹35,000 (≈ $490 USD)',
  },
  {
    id: 'ecommerce',
    num: '05',
    title: 'E-Commerce & Digital Storefronts',
    shortDesc: 'High-speed product catalogues, 1-click Express WhatsApp checkout, and payment gateway integration.',
    tagline: 'Frictionless Checkout · Zero Monthly Shopify App Rent',
    whatClientsBuy:
      'A sleek, mobile-optimized online store that does not suffer from sluggish Shopify app bloat. Direct Razorpay, Stripe, and UPI payment processing with automated instant order confirmations via WhatsApp and email.',
    deliverables: [
      'Lightning-fast product catalog, category filters, and live search',
      'Razorpay, Stripe & UPI payment gateway integrations',
      '1-Click WhatsApp Express Order option for frictionless Indian buyer checkout',
      'Admin training session and clean order management dashboard',
    ],
    idealFor: 'D2C boutique brands, artisanal bakeries, jewellery designers, and specialty retailers.',
    timeline: '2 to 3 Weeks (Quoted per catalog size)',
    investmentTier: 'Bespoke Store: ₹75,000 – ₹1,20,000+',
  },
  {
    id: 'website-optimization',
    num: '06',
    title: 'Website Speed & Conversion Optimization',
    shortDesc: 'Core Web Vitals acceleration, mobile UX friction audits, and high-ticket conversion tuning.',
    tagline: 'Lighthouse 95+ · Sub-0.8s LCP Guarantee',
    whatClientsBuy:
      'Slashing bounce rates by cutting page load times from 6 seconds down to under 1 second. We audit user friction, optimize heavy images into modern WebP format, streamline checkout funnels, and boost Google SEO signals.',
    deliverables: [
      'Complete Core Web Vitals diagnostic (LCP, FID/INP, CLS)',
      'Next-gen image compression, asset minification, and edge caching',
      'Mobile viewport friction audit and tap-target usability fix',
      'Written performance guarantee: 95+ mobile Lighthouse rating',
    ],
    idealFor: 'Existing websites with high traffic but disappointing inquiry rates.',
    timeline: '3 to 5 Working Days',
    investmentTier: 'Speed & Conversion Audit Sprint: ₹25,000 – ₹45,000',
  },
  {
    id: 'website-maintenance',
    num: '07',
    title: 'Website Care & Ongoing Platform Support',
    shortDesc: 'Optional proactive uptime monitoring, automated cloud backups, and content updates.',
    tagline: 'Zero Retainer Traps · 100% Client Independence',
    whatClientsBuy:
      'Total peace of mind with zero mandatory monthly retainers. Because our static React platforms have no databases to crash or plugins to hack, ongoing maintenance is minimal. We offer optional care plans for busy founders who want priority content updates.',
    deliverables: [
      '24/7 uptime monitoring with instant DNS failover protection',
      'Automated weekly code and asset cloud backups',
      'Dedicated priority turnaround for monthly copy, image, and service updates',
      'Zero cancellation penalties—cancel or pause anytime with 1 click',
    ],
    idealFor: 'Busy business owners who want a dedicated webmaster without hiring full-time staff.',
    timeline: 'Continuous Ongoing Support',
    investmentTier: 'Optional Peace of Mind: ₹5,000 / month (or ₹0 with self-hosting)',
  },
];

const PRICING_PACKAGES = [
  {
    tier: 'Tier 01 · Single Page / Campaign',
    name: 'Starter Launchpad',
    priceINR: '₹35,000',
    priceUSD: '≈ $490 USD',
    timeline: '3 Working Days',
    scopeDesc: 'One offer, one audience, one high-intent action. Ideal for ad campaigns or launching an initial high-credibility flagship.',
    features: [
      'Single bespoke high-converting page (Mobile + Desktop)',
      'Custom copy deck written by us from your discovery intake',
      'Sub-0.8s mobile LCP performance guarantee',
      'Direct WhatsApp click-to-chat & calendar booking funnel',
      'On-page technical SEO & Schema.org LocalBusiness markup',
      '100% full source code ownership in clean Git repository',
      '30-Day post-launch priority bug warranty',
    ],
    ctaText: 'Book Starter Sprint',
  },
  {
    tier: 'Tier 02 · Full Business Platform (Most Popular)',
    name: 'Authority Growth Engine',
    priceINR: '₹55,000',
    priceUSD: '≈ $750 USD',
    timeline: '7 Working Days (Contractual Guarantee)',
    scopeDesc: 'The definitive digital flagship for established businesses, practices, and studios that need to dominate their local market.',
    popular: true,
    features: [
      'Full multi-page architecture (Up to 5 bespoke pages)',
      'Complete high-ticket copy deck crafted before visual design begins',
      'Interactive conversion feature (Booking / Cost Estimator / Menu)',
      '3 Switchable visual aesthetic themes (e.g. Obsidian Luxe vs Heritage)',
      '100% Bangalore Local SEO & Google Business Profile alignment',
      'Google Search Console & Google Analytics 4 tracking configured',
      'Recorded video walkthrough so your team can update text easily',
      'Contractual 7-day guarantee: Live on time or the build is 100% free',
      '30 Days of direct founder support with Deepak & Geetha',
    ],
    ctaText: 'Claim 7-Day Sprint Slot',
  },
  {
    tier: 'Tier 03 · Bespoke Application / Multi-Location',
    name: 'Enterprise Bespoke',
    priceINR: '₹85,000+',
    priceUSD: '≈ $1,150+ USD',
    timeline: '14 Working Days',
    scopeDesc: 'Advanced web application architecture for multi-location clinics, large firms, or high-volume custom portals.',
    features: [
      'Unlimited custom pages and multi-location directory routing',
      'Headless CMS or dynamic database architecture (Supabase / PostgreSQL)',
      'Custom client document vault or secure encrypted file upload portal',
      'Third-party ERP, CRM, and webhook automation pipeline',
      'Corporate Karnataka GST tax invoice with full ITC compliance',
      'Full E-E-A-T topical authority sitemap & structured schema',
      '60 Days of priority SLA founder warranty and quarterly strategy reviews',
    ],
    ctaText: 'Discuss Enterprise Scope',
  },
];

const PRICING_FAQS = [
  {
    q: 'What is the real website design cost for small business in 2026?',
    a: 'In India, low-end freelancers charge ₹10,000 to ₹25,000 for slow, generic WordPress templates that fail to convert high-ticket clients. Traditional agencies charge ₹1,50,000 to ₹5,00,000 with 3-month delays and monthly retainers. At Uncoded Hub, our professional website design packages range from ₹35,000 (single campaign launchpad) to ₹55,000 (complete 5-page business flagship in a 7-day sprint), with zero ongoing retainer traps. You get hand-coded React performance, bespoke copy, and 100% asset ownership.',
  },
  {
    q: 'How does a fixed-price sprint compare to a website designer hourly rate?',
    a: 'Hiring on an hourly rate ($40 to $120/hour or ₹1,500 to ₹4,500/hour) creates an inherent conflict of interest: the slower the designer or developer works, the more money they make. Scope creep and unexpected revisions quickly double your initial budget. Uncoded Hub operates strictly on fixed-price project milestones: you agree to one fixed quotation before any work begins, and that number never changes whether the sprint takes 4 days or 9 days.',
  },
  {
    q: 'What does a website redesign cost, and will I lose my Google rankings?',
    a: 'A typical business website redesign at Uncoded Hub costs between ₹45,000 and ₹75,000 depending on page count. Crucially, we enforce 1:1 technical SEO preservation: every legacy indexed URL is preserved or mapped via 301 server redirects, title tags and meta descriptions are carried over, and rich Schema.org structured data is added. Your site modernizes from a sluggish 5-second WordPress site to a 0.4s React platform without dropping organic rank.',
  },
  {
    q: 'How do I get an exact website development quotation for my business?',
    a: 'You can receive an exact, itemized written quotation in a single 20-minute discovery call with co-founders Deepak and Geetha. We do not send vague 40-page sales decks. We review your current assets, map the exact conversion path you need, and provide a fixed price and a contractual launch date before you commit a single rupee.',
  },
  {
    q: 'Are there any hidden fees or ongoing monthly charges after launch?',
    a: 'None. Traditional agencies charge ₹5,000 to ₹15,000 every month for "plugin updates and maintenance." Because Uncoded Hub hand-codes clean React without vulnerable plugins or heavy databases, your site can be hosted completely free on global edge networks (Cloudflare or Vercel) forever. You own the code, the domain, and the hosting account in your own name.',
  },
  {
    q: 'Why should I hire a website design agency like Uncoded Hub instead of a cheap freelancer or DIY builder (Wix/Squarespace)?',
    a: 'DIY builders (Wix, Squarespace) trap you in proprietary subscriptions, output bloated JavaScript that loads slowly on mobile, and prevent you from ever exporting your code. Low-cost freelancers often abandon projects midway or produce broken mobile layouts. Uncoded Hub gives you senior co-founder delivery (Deepak on engineering, Geetha on design), sub-second mobile speeds, and a binding 7-day completion guarantee: if we are late by even one hour, your build is 100% free.',
  },
];

export default function Services({ onBook }: { onBook: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
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
          'Explore our 7 client-centric web design and development services. Transparent pricing packages from ₹35,000 to ₹85,000 with a 7-day contractual delivery guarantee.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://uncodedhub.com/#website',
          url: 'https://uncodedhub.com/',
          name: 'Uncoded Hub',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: PRICING_FAQS.map((faq) => ({
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
        <title>Website Design Services, Packages & Costs — Uncoded Hub</title>
        <meta
          name="description"
          content="Explore our 7 client-focused website services: custom design, development, redesign, landing pages, e-commerce, speed optimization & maintenance. Transparent pricing packages from ₹35,000."
        />
        <meta
          name="keywords"
          content="website design services, website development company, website redesign services, landing page design, ecommerce website development, website speed optimization, website design cost for small business, business website development cost, website design packages for businesses, custom website development pricing, affordable website design packages, website development quotation, hire a website design agency, website designer hourly rate, website redesign cost, professional website design packages"
        />
        <link rel="canonical" href="https://uncodedhub.com/services/" />
        <meta property="og:title" content="Website Design Services, Packages & Costs — Uncoded Hub" />
        <meta
          property="og:description"
          content="7 client-focused web design services with fixed-price packages from ₹35,000. 7-Day sprint guarantee, zero retainers, 100% code ownership."
        />
        <meta property="og:url" content="https://uncodedhub.com/services/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/services.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Website Design Services & Pricing Packages — Uncoded Hub" />
        <meta
          name="twitter:description"
          content="Organized by what clients buy: design, development, redesign, landing pages, e-commerce & speed optimization."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Editorial Header ─────────────────────────────────────────── */}
      <section className="pt-10 md:pt-16 pb-16 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <span className="label text-signal font-semibold block mb-3">
              Client-First Service Architecture · Fixed-Price Sprints
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink max-w-[18ch] leading-[1.08] tracking-tight">
              Organized by what you buy. <br />
              <em className="italic hero-signal font-medium">Zero technical mystery.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-6 max-w-3xl leading-relaxed">
              Most web agencies organize their services around developer jargon and billable hours. We structure our offerings strictly around <strong>business outcomes</strong>: acquiring customers, establishing undeniable authority, modernizing outdated systems, and speeding up slow mobile funnels.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#pricing-guide"
                className="btn-primary !py-3 !px-6 text-xs sm:text-sm rounded-full inline-flex items-center gap-2 shadow-sm"
              >
                <span>View Pricing &amp; Package Costs</span>
                <span>↓</span>
              </a>
              <button
                type="button"
                onClick={onBook}
                className="border border-rule-strong hover:border-signal text-ink font-mono text-xs py-3 px-6 rounded-full transition-colors bg-paper-raised cursor-pointer"
              >
                Request Fixed Quotation →
              </button>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 7 Client-Facing Service Categories ──────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule" id="service-catalog">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="label text-signal font-semibold block mb-2.5">
                The 7 Core Service Offerings
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                Everything your business needs to win online.
              </h2>
              <p className="text-muted text-base mt-4 leading-relaxed">
                Whether you need a full digital flagship, an urgent campaign landing page, a WordPress-to-React migration, or an e-commerce storefront, every service is delivered in our focused 7-day senior sprint model.
              </p>
            </div>
          </Reveal>

          <div className="space-y-10">
            {CLIENT_SERVICES.map((s, idx) => (
              <Reveal key={s.id} delay={idx * 50}>
                <div
                  id={s.id}
                  className="bg-paper-raised border border-rule-strong rounded-[28px] p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                >
                  {/* Left Column: Outcome, Who Buys & Timeline */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="card-tag">{s.tagline}</span>
                        <span className="font-mono text-xs text-muted font-bold">Service {s.num}</span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mt-1 leading-snug">
                        {s.title}
                      </h3>

                      <p className="text-xs font-mono text-signal mt-2">{s.investmentTier}</p>

                      <p className="text-muted leading-relaxed mt-4 text-sm">
                        {s.whatClientsBuy}
                      </p>

                      <div className="mt-5 p-4 rounded-xl bg-paper-sunken border border-rule">
                        <span className="text-[11px] font-semibold text-ink block mb-1">
                          Ideal Profile:
                        </span>
                        <p className="text-xs text-muted leading-relaxed mb-0">{s.idealFor}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-rule flex items-center justify-between">
                      <span className="text-xs font-mono text-muted">
                        Timeline: <strong className="text-ink">{s.timeline}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={onBook}
                        className="bg-signal hover:bg-signal-bright text-paper font-mono text-xs py-2 px-4 rounded-full transition-colors cursor-pointer"
                      >
                        Inquire →
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Key Deliverables Included */}
                  <div className="lg:col-span-7 bg-paper p-6 sm:p-8 rounded-[22px] border border-rule">
                    <span className="label text-signal font-semibold text-xs block mb-4">
                      Tangible Deliverables Included
                    </span>
                    <ul className="space-y-3.5">
                      {s.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex gap-3 items-start text-xs sm:text-sm text-ink-soft leading-relaxed">
                          <span className="w-4 h-4 rounded-full bg-signal/10 text-signal flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── Pricing & Buying Decision Guide (Master Commercial BOFU Section) ── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule scroll-mt-24" id="pricing-guide">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="label text-signal font-semibold block mb-2.5">
                Pricing &amp; Buying-Decision Guide
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                Transparent website design packages &amp; costs.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Whether evaluating <strong>website design cost for small business</strong>, comparing <strong>professional website design packages</strong>, or replacing hourly developer rates with predictable fixed sprints, here is our 100% transparent pricing structure.
              </p>
            </div>
          </Reveal>

          {/* 3 Core Fixed-Price Packages */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {PRICING_PACKAGES.map((pkg, idx) => (
              <Reveal key={pkg.name} delay={idx * 80}>
                <div
                  className={`p-8 sm:p-10 rounded-[28px] h-full flex flex-col justify-between transition-all ${
                    pkg.popular
                      ? 'bg-paper-raised border-2 border-signal relative shadow-xl'
                      : 'bg-paper border border-rule hover:border-signal/50 shadow-xs'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-signal text-paper font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      ★ Most Popular · Highest ROI
                    </div>
                  )}

                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-2">
                      {pkg.tier}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-3">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-muted mb-6 leading-relaxed">
                      {pkg.scopeDesc}
                    </p>

                    <div className="mb-6 pb-6 border-b border-rule">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-bold text-ink">
                          {pkg.priceINR}
                        </span>
                        <span className="text-xs font-mono text-muted">/ one-time</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-signal mt-1">
                        <span>{pkg.priceUSD}</span>
                        <span className="text-muted">⏱ {pkg.timeline}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-ink/90 font-mono mb-8">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 leading-snug">
                          <span className="text-signal font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={onBook}
                    className={`w-full py-3.5 rounded-full font-mono text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer text-center ${
                      pkg.popular
                        ? 'bg-signal text-paper hover:bg-ink shadow-md'
                        : 'bg-paper-raised border border-rule-strong hover:border-ink text-ink'
                    }`}
                  >
                    {pkg.ctaText} →
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Market Comparison Matrix: Hourly Rate vs Agency vs Uncoded Hub ── */}
          <Reveal>
            <div className="max-w-4xl mx-auto bg-paper border border-rule rounded-[28px] p-6 sm:p-10 shadow-xs mb-20">
              <div className="mb-8">
                <span className="label text-signal font-semibold block mb-1">
                  Buying Decision Economics
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                  Website Designer Hourly Rate vs. Fixed-Price Sprint
                </h3>
                <p className="text-muted text-xs sm:text-sm mt-2 leading-relaxed">
                  Why traditional time-and-materials billing hurts clients, and why fixed-scope deliverables deliver guaranteed ROI.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-rule bg-paper-sunken text-xs font-mono uppercase tracking-wider text-muted">
                      <th className="p-4 font-semibold">Model</th>
                      <th className="p-4 font-semibold">Typical Cost Range</th>
                      <th className="p-4 font-semibold">Timeline Risk</th>
                      <th className="p-4 font-semibold">Incentive Alignment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    <tr>
                      <td className="p-4 font-semibold text-ink">Freelancer Hourly Rate</td>
                      <td className="p-4 font-mono text-muted">₹1,500 – ₹4,000 / hr ($40–$100/hr)</td>
                      <td className="p-4 text-muted">High (No hard delivery cap)</td>
                      <td className="p-4 text-red-600 font-medium">Misaligned: Slower work generates higher bills</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-ink">Traditional Digital Agency</td>
                      <td className="p-4 font-mono text-muted">₹1,50,000 – ₹5,00,000 + ₹15k/mo retainers</td>
                      <td className="p-4 text-muted">8 to 16 weeks of bureaucratic delays</td>
                      <td className="p-4 text-amber-600 font-medium">Complex scopes to lock in long-term retainer fees</td>
                    </tr>
                    <tr className="bg-signal/5">
                      <td className="p-4 font-bold text-signal">⚡ Uncoded Hub 7-Day Sprint</td>
                      <td className="p-4 font-mono font-bold text-signal">₹35,000 – ₹55,000 (Fixed Milestone)</td>
                      <td className="p-4 font-bold text-signal">Guaranteed 7 Days (Late means 100% free)</td>
                      <td className="p-4 text-emerald-700 font-semibold">100% Aligned: Fast, flawless delivery before final 50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* ── Comprehensive Buying & Pricing FAQs (Accordion) ───────── */}
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="label text-signal font-semibold block mb-2">
                  Transparent Answers
                </span>
                <h3 className="font-display text-2xl sm:text-4xl text-ink font-normal">
                  Common questions on costs, quotations &amp; hiring.
                </h3>
              </div>
            </Reveal>

            <div className="space-y-4">
              {PRICING_FAQS.map((faq, idx) => {
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
                      <p className="text-xs sm:text-sm text-muted mt-4 leading-relaxed pt-4 border-t border-rule">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Shell>
      </section>

      {/* ── Specialized Industry Silos & Locality Cross-Links ─────────── */}
      <section className="py-16 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[24px] bg-paper-sunken border border-rule flex flex-col justify-between">
                <div>
                  <span className="card-tag mb-2">50 COMMERCIAL NICHES</span>
                  <h3 className="font-display text-2xl text-ink font-medium">
                    Industry-Specific Website Solutions
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-2 leading-relaxed">
                    Dental clinics need patient triage; architects need 3D render-to-reality showcases; restaurants need zero-commission table holds. Explore our 50 bespoke industry platforms with live interactive specimens.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/web-design/"
                    className="btn-primary !py-2.5 !px-5 text-xs rounded-full inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Browse 50 Industry Niches</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              <div className="p-8 rounded-[24px] bg-paper-sunken border border-rule flex flex-col justify-between">
                <div>
                  <span className="card-tag mb-2">LOCAL BENGALURU HUBS</span>
                  <h3 className="font-display text-2xl text-ink font-medium">
                    Web Design in Bangalore
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-2 leading-relaxed">
                    Targeted commercial sprints across 100 Bangalore localities including Indiranagar, Koramangala, Whitefield, HSR Layout, Jayanagar, and MG Road.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/web-design/bangalore/"
                    className="border border-rule-strong hover:border-signal text-ink hover:text-signal font-mono text-xs py-2.5 px-5 rounded-full transition-colors bg-paper inline-flex items-center gap-1.5"
                  >
                    <span>Explore 100 Bangalore Localities</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Closing Dual-Card CTA ────────────────────────────────────── */}
      <section className="bg-ink text-paper py-20 border-t border-white/10">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-[32px] p-8 sm:p-12">
              <div className="md:col-span-8">
                <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-signal/20 text-signal-bright mb-3">
                  Direct Founder Discovery
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight">
                  Ready for a website that works as hard as your business?
                </h2>
                <p className="text-on-ink-muted text-sm sm:text-base mt-4 leading-relaxed max-w-xl">
                  Leave the 20-minute discovery call with a fixed written scope, an exact transparent quotation, and a contractual 7-day launch date. No account managers, no junior handoffs.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
                <button
                  type="button"
                  onClick={onBook}
                  className="bg-signal hover:bg-signal-bright text-paper font-mono text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-colors font-semibold text-center cursor-pointer shadow-md"
                >
                  Book Discovery Call →
                </button>
                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20%26%20Geetha,%20I%20reviewed%20your%20services%20and%20want%20to%20request%20a%20fixed%20quotation%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 hover:border-white text-paper font-mono text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-colors text-center"
                >
                  WhatsApp Direct Desk ↗
                </a>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
