export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceSprintDay {
  day: string;
  title: string;
  description: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  tierNum: string;
  name: string;
  headline: string;
  tagline: string;
  badge: string;
  priceRangeInr: string;
  priceRangeUsd: string;
  timeline: string;
  idealFor: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  coreDeliverables: string[];
  deliverablesDetail: ServiceDeliverable[];
  roadmap: ServiceSprintDay[];
  matchedDemoUrl: string;
  matchedDemoName: string;
  faqs: ServiceFaq[];
}

export const GRAND_SLAM_BONUS = {
  title: "The Local Inbound Authority & 5-Star Review Machine",
  commercialValue: "₹15,000 Value · Included 100% Free with Every Sprint",
  tagline: "The complete post-launch growth operating system to dominate local Google search and multiply qualified inbound inquiries.",
  components: [
    {
      num: "01",
      title: "Google Business Profile (GBP) 3-Pack Ranking Blueprint",
      desc: "Step-by-step optimization SOP: category hierarchy, service menu tagging, citation audit, and local geo-signal architecture to outrank competitors on Google Maps."
    },
    {
      num: "02",
      title: "Automated 1-Click WhatsApp 5-Star Review Funnel",
      desc: "Pre-written customer review request scripts and direct 1-tap review link generators that multiply positive Google reviews in 30 days without getting flagged."
    },
    {
      num: "03",
      title: "High-Intent Inbound Lead Conversion Script Pack",
      desc: "7 battle-tested WhatsApp and phone response scripts designed to qualify and close website inquiries in under 15 minutes before competitors respond."
    },
    {
      num: "04",
      title: "Local Competitor Vulnerability Teardown",
      desc: "A personalized audit revealing exactly where your top 3 local competitors are leaking customers and how your new website captures that traffic."
    }
  ]
};

export const CORE_FOUNDER_GUARANTEES = [
  {
    title: "Direct Founder Execution",
    desc: "Co-founders Deepak & Geetha design, write, and engineer your website personally. Zero junior account managers or outsourced subcontractors."
  },
  {
    title: "Psychological Copywriting",
    desc: "Every headline and paragraph is crafted from scratch based on consumer intent and high-ticket trust building. Zero filler text or client homework."
  },
  {
    title: "Bespoke Clean Architecture",
    desc: "Hand-coded modern React and semantic HTML with switchable aesthetic themes. 100% source code ownership with zero monthly theme lock-ins."
  },
  {
    title: "Sub-0.8s Speed Guarantee",
    desc: "95+ Google Lighthouse speed score. Sub-second mobile LCP ensures zero bounced visitors on 4G and 5G connections."
  },
  {
    title: "Zero-Risk Pre-Payment Demo",
    desc: "After our 20-minute discovery call, we build a working interactive demo specifically for your business to inspect before you pay a single rupee."
  },
  {
    title: "Contractual Delivery Guarantee",
    desc: "Your website is fully tested, audited, and deployed on time—or your project sprint is 100% free."
  }
];

export const SERVICES_DATA: Record<string, ServiceItem> = {
  'single-page-website': {
    id: 'single-page',
    slug: 'single-page-website',
    tierNum: '01 · Fast Launch',
    name: 'Single Page Website Sprint',
    headline: 'One Focused Offer. One Clear Action. Sub-Second Conversion Speed.',
    tagline: 'Engineered for paid ad campaigns, fast product launches, and businesses that need an authoritative online presence without unnecessary multi-page complexity.',
    badge: '3-DAY FAST SPRINT',
    priceRangeInr: '₹20,000 – ₹35,000',
    priceRangeUsd: '$990 – $1,800',
    timeline: '3 Working Days',
    idealFor: 'Google Ads landing pages, single high-ticket service offers, startup MVPs, event registrations, and professionals needing a focused digital flagship.',
    metaTitle: 'Single Page Website Design Sprint (3 Days) | Uncoded Hub',
    metaDescription: 'High-converting single page websites and landing pages engineered for paid ads, Google campaigns, and focused service offers. Launch in 3 days with fixed pricing.',
    summary: 'A single page website sprint strips away all digital clutter to focus your visitor on a single, compelling value proposition. We craft the copy, build custom responsive sections, integrate direct WhatsApp routing, and guarantee sub-0.8s mobile load speeds.',
    coreDeliverables: [
      'Custom single-page responsive layout (mobile + tablet + desktop)',
      'High-converting sales copywriting written from your discovery intake',
      'Direct click-to-WhatsApp routing & lead capture form',
      'Sub-0.8s mobile LCP performance guarantee (95+ Lighthouse)',
      'On-page technical SEO & Schema.org LocalBusiness markup',
      'Google Analytics 4 & Search Console configuration',
      '₹15,000 Local Inbound Authority & Review Machine Bonus (FREE)',
      '100% source code ownership with zero monthly theme lock-in'
    ],
    deliverablesDetail: [
      {
        title: "Bespoke Single-Page Layout",
        description: "Zero generic templates. We build custom hero sections, problem agitations, proof metrics, testimonials, and interactive FAQ accordions designed specifically for your offer."
      },
      {
        title: "Conversion Copywriting",
        description: "Full professional copywriting written by founders. We distill your unique value proposition into clear, punchy copy that guides visitors directly to the inquiry button."
      },
      {
        title: "Frictionless Lead Routing",
        description: "Enquiries land directly in your WhatsApp inbox with pre-filled context, alongside secure email notifications so you never miss a hot lead."
      },
      {
        title: "Technical SEO & Schema Groundwork",
        description: "Complete OpenGraph metadata, structured JSON-LD data, and clean semantic markup so Google indexes your offer accurately from day one."
      }
    ],
    roadmap: [
      {
        day: "Day 01",
        title: "Strategic Discovery & Copywriting",
        description: "20-minute discovery call to extract your core offer. We draft full sales copy, headline hooks, and layout blueprints on Day 1."
      },
      {
        day: "Day 02",
        title: "Bespoke Design & React Engineering",
        description: "Geetha designs the visual direction; Deepak hand-codes the React components, micro-interactions, and mobile responsiveness. You receive a private preview link."
      },
      {
        day: "Day 03",
        title: "Speed Audit, SEO & Live Production Launch",
        description: "We run Lighthouse audits, configure domain DNS, connect WhatsApp routing, and launch live to your custom domain with 30-day warranty."
      }
    ],
    matchedDemoUrl: "/demos/business-portfolio.html",
    matchedDemoName: "Vanguard Corporate & Business Showcase",
    faqs: [
      {
        q: "Who is a single page website ideal for?",
        a: "It is perfect for businesses running Google or Meta Ads, consultants with a clear signature service, or companies launching a new product who need an authoritative digital face without spending weeks building a 10-page site."
      },
      {
        q: "Can I expand this website into multiple pages later?",
        a: "Yes, 100%. Because we build on clean, modular React, adding dedicated sub-pages, a portfolio gallery, or a blog in the future takes zero architectural refactoring."
      },
      {
        q: "How does the pre-payment demo guarantee work?",
        a: "After our 20-minute discovery call, we build a working interactive demo specifically for your business to inspect on your own phone. You pay nothing until you verify the quality and choose to move forward."
      }
    ]
  },

  'business-website': {
    id: 'business-website',
    slug: 'business-website',
    tierNum: '02 · Most Popular',
    name: 'Custom Business Website (Flagship)',
    headline: 'Establish Unshakable Market Authority & Generate Consistent Qualified Inquiries.',
    tagline: 'Our signature 7-working-day turnkey sprint for practices, studios, clinics, and high-ticket service firms wanting undisputed local authority.',
    badge: '7-DAY CONTRACTUAL SPRINT',
    priceRangeInr: '₹35,000 – ₹55,000',
    priceRangeUsd: '$1,800 – $2,800',
    timeline: '7 Working Days (On Time or 100% Free)',
    idealFor: 'Medical clinics, architecture studios, interior designers, commercial law practices, engineering firms, and premium local service companies.',
    metaTitle: 'Custom Business Website Design (7-Day Sprint) | Uncoded Hub',
    metaDescription: 'Our flagship 7-day custom business website sprint for clinics, practices, studios, and high-ticket service firms. Built by founders Deepak & Geetha with 100% speed guarantee.',
    summary: 'A complete, high-authority digital presence engineered from scratch to build immediate credibility with high-ticket prospects. Up to 8 custom pages, tailored copywriting, interactive quote engines, 3 switchable visual themes, and local SEO schema groundwork.',
    coreDeliverables: [
      'Up to 5–8 custom responsive pages (Home, About, Services, Case Studies, Contact)',
      'Complete end-to-end copywriting crafted from customer psychology',
      'Interactive conversion engine (e.g. Project Cost Estimator or Treatment Selector)',
      '3 switchable visual aesthetic styles (e.g. Obsidian Luxe vs Warm Heritage)',
      'Sub-0.8s mobile LCP performance guarantee (100% Lighthouse audit)',
      'Complete Local SEO Schema.org architecture & Google Search Console setup',
      'Contractual 7-day delivery guarantee: On time or 100% free',
      '₹15,000 Local Inbound Authority & Review Machine Bonus (FREE)',
      '30-day post-launch direct founder warranty & 100% code ownership'
    ],
    deliverablesDetail: [
      {
        title: "Comprehensive Multi-Page Architecture",
        description: "Dedicated deep-dive pages for every core service, an authoritative studio/founder story, proof-driven case studies, and a conversion-focused contact desk."
      },
      {
        title: "Interactive Conversion Mechanism",
        description: "We build an engaging interactive widget (such as a multi-step project cost calculator or timeline planner) that pre-qualifies prospects before they reach your inbox."
      },
      {
        title: "3 Switchable Aesthetic Themes",
        description: "Clients can explore your work through three curated aesthetic modes (e.g. Warm Heritage, Obsidian Monolith, Avant-Garde Grid) establishing instant design superiority."
      },
      {
        title: "Local Search Domination Groundwork",
        description: "Deep structured schema markup linking your website to your Google Business Profile, local service areas, customer reviews, and operating hours."
      }
    ],
    roadmap: [
      {
        day: "Day 01",
        title: "Discovery, Positioning & Information Architecture",
        description: "20-minute strategic discovery call. We map user journeys, page architecture, and write high-converting copy for all core pages."
      },
      {
        day: "Days 02–03",
        title: "Design System & Responsive Component Engineering",
        description: "Geetha designs the tailored aesthetic; Deepak builds clean React components, typography hierarchy, and interactive conversion mechanisms."
      },
      {
        day: "Days 04–05",
        title: "Staging Preview & Interactive Review Round",
        description: "You receive a private staging link to test your website on your desktop and phone. We execute your feedback within agreed revision rounds."
      },
      {
        day: "Days 06–07",
        title: "Cross-Device Speed Audits, SEO Verification & Launch",
        description: "Strict cross-browser verification, sub-0.8s speed benchmarks, domain DNS cutover, Google indexing submission, and project file handover."
      }
    ],
    matchedDemoUrl: "/demos/interior-design.html",
    matchedDemoName: "Meridian Architecture & Interior Studio",
    faqs: [
      {
        q: "What makes the 7-day guarantee real?",
        a: "We work single-threaded. When you book a 7-day sprint, Deepak and Geetha dedicate focused engineering hours exclusively to your project. If we miss the agreed Day 7 launch date, your entire website build is 100% free."
      },
      {
        q: "Do I have to write the text for all pages?",
        a: "No. You don't write a single sentence. We conduct a 20-minute discovery call, study your target customers, and write 100% of the copywriting from scratch."
      },
      {
        q: "Are there any recurring monthly maintenance fees?",
        a: "None. You own 100% of your source code and hosting. We host on fast, reliable, low-cost static infrastructure with zero mandatory monthly retainers."
      }
    ]
  },

  'ecommerce-website': {
    id: 'online-store',
    slug: 'ecommerce-website',
    tierNum: '03 · E-Commerce',
    name: 'Custom D2C E-Commerce Store',
    headline: 'High-Speed Online Storefront with Sub-Second Checkout & Zero App Bloat.',
    tagline: 'Built for D2C brands, boutique studios, specialty food creators, and retailers ready to sell products online without paying 15 Shopify plugin subscription fees.',
    badge: 'D2C SCALE SPRINT',
    priceRangeInr: '₹85,000 – ₹1,25,000',
    priceRangeUsd: '$2,800 – $4,200',
    timeline: '2–3 Weeks',
    idealFor: 'Direct-to-consumer lifestyle brands, artisanal bakeries, jewellery designers, wellness products, and specialty manufacturers selling directly to buyers.',
    metaTitle: 'Custom E-Commerce & D2C Online Store Development | Uncoded Hub',
    metaDescription: 'High-speed online stores with zero sluggish Shopify app bloat. Instant search, Razorpay/Stripe checkout, 1-click WhatsApp express ordering, and automated abandoned-cart recovery.',
    summary: 'Most e-commerce stores fail because slow plugin bloat makes mobile checkout frustrating. We build clean, lightning-fast storefronts with instant product filtering, 1-click WhatsApp ordering, secure Razorpay and Stripe gateways, and automated transactional workflows.',
    coreDeliverables: [
      'High-speed product catalogue with live instant search & facet filters',
      'Razorpay, Stripe, UPI & International credit card payment integrations',
      '1-Click WhatsApp Express Order option for frictionless Indian mobile buying',
      'Automated order confirmations & shipping updates via WhatsApp and Email',
      'Abandoned-cart automated recovery sequence',
      'Clean inventory and order management dashboard with staff video training',
      'Sub-1.0s mobile checkout speed guarantee',
      '₹15,000 Local Inbound Authority & Review Machine Bonus (FREE)',
      '30-day priority founder post-launch warranty'
    ],
    deliverablesDetail: [
      {
        title: "Sub-Second Product Catalogue",
        description: "Zero loading spinners. Customers can filter by collection, size, material, or price with instant client-side responsiveness."
      },
      {
        title: "1-Click WhatsApp Express Checkout",
        description: "For Indian customers who dislike lengthy checkout forms, a single tap sends their selected items and address directly into your WhatsApp business desk."
      },
      {
        title: "Frictionless Payment Gateways",
        description: "Pre-integrated with Razorpay, Stripe, UPI, net banking, and international credit cards with zero recurring platform commissions."
      },
      {
        title: "Automated Customer Retention",
        description: "Built-in abandoned-cart recovery emails and automated WhatsApp order dispatch notifications that increase repeat customer lifetime value."
      }
    ],
    roadmap: [
      {
        day: "Week 01",
        title: "Catalogue Architecture & Storefront UX",
        description: "Discovery call to map product taxonomy, pricing tiers, shipping rules, and brand visual guidelines. We produce complete storefront layouts."
      },
      {
        day: "Week 02",
        title: "Storefront Engineering & Gateway Integration",
        description: "Developing the responsive product catalog, cart state engine, checkout flows, and connecting Razorpay/Stripe payment webhooks."
      },
      {
        day: "Week 03",
        title: "End-to-End Test Transactions & Live Launch",
        description: "Simulating live purchases, testing WhatsApp notifications, verifying inventory management, training your team, and launching to production."
      }
    ],
    matchedDemoUrl: "/demos/jewellery-stores.html",
    matchedDemoName: "AuraJewels Fine Jewellery & Gemstones",
    faqs: [
      {
        q: "Why is a custom store better than standard Shopify?",
        a: "Standard Shopify stores quickly require 10–20 paid apps for search, reviews, and popups, which slows down the site to 6–8 seconds and costs ₹10,000/month in app subscriptions. Our custom stores load in under 1 second with all essential features built natively."
      },
      {
        q: "How do I manage my products and orders after launch?",
        a: "We provide an intuitive admin dashboard where you can add products, update prices, view orders, and manage stock in seconds. We also include a personalized 15-minute video walkthrough."
      },
      {
        q: "What payment gateways are supported?",
        a: "We support Razorpay, Cashfree, PayU, and PhonePe for Indian UPI/NetBanking, plus Stripe for global multi-currency credit card transactions."
      }
    ]
  },

  'website-redesign': {
    id: 'website-redesign',
    slug: 'website-redesign',
    tierNum: '04 · Modernization',
    name: 'Website Redesign & Speed Sprint',
    headline: 'Modernize Outdated WordPress or Wix Sites with Guaranteed 100% SEO Rank Preservation.',
    tagline: 'Transform a slow, bloated, outdated website into a sub-second, high-converting digital platform in 5 working days without losing your existing Google rankings.',
    badge: '5-DAY MODERNIZATION SPRINT',
    priceRangeInr: '₹15,000 – ₹25,000',
    priceRangeUsd: '$750 – $1,250',
    timeline: '5 Working Days',
    idealFor: 'Established businesses with slow, broken WordPress, Wix, or Joomla sites whose traffic and inquiries have slumped due to slow load times and outdated design.',
    metaTitle: 'Website Redesign & WordPress to React Migration | Uncoded Hub',
    metaDescription: 'Transform your slow, outdated WordPress or Wix site into a sub-second, modern React platform in 5 days. Guaranteed 100% SEO ranking and backlink preservation.',
    summary: 'If your existing website takes 5+ seconds to load or looks stuck in 2018, prospects leave before reading your offer. We perform a full architectural rebuild into ultra-fast React, preserving 100% of your existing Google rankings with meticulous 1:1 redirect mapping.',
    coreDeliverables: [
      'Comprehensive pre-migration audit of existing rankings, URLs & backlink profile',
      '100% SEO rank preservation with meticulous 1:1 301 redirect map',
      'Complete visual overhaul adhering to modern editorial Unslop design standards',
      'Migration away from slow plugins and vulnerable PHP to clean static React',
      'Sub-0.8s mobile speed guarantee (eliminates Core Web Vitals penalties)',
      'Modernized WhatsApp & mobile enquiry booking flows',
      '₹15,000 Local Inbound Authority & Review Machine Bonus (FREE)',
      '30-day post-launch zero-traffic-drop monitoring warranty'
    ],
    deliverablesDetail: [
      {
        title: "Guaranteed 1:1 SEO Preservation",
        description: "We crawl your entire website before touching any code. Every indexed page, keyword ranking, and external backlink is mapped with exact 301 redirects so your Google traffic never drops."
      },
      {
        title: "Elimination of Plugin Security Debt",
        description: "Say goodbye to hacked WordPress plugins, weekly update crashes, and expensive hosting servers. We deploy on lightning-fast, ultra-secure static hosting."
      },
      {
        title: "Core Web Vitals Perfection",
        description: "Transform failing 25/100 mobile Google speed scores into 95+/100 green scores, improving your organic Google rankings and ad quality scores."
      },
      {
        title: "Editorial Aesthetic Upgrade",
        description: "We swap outdated templates for character-rich typography, authentic imagery, high-contrast layouts, and mobile-friendly word integrity."
      }
    ],
    roadmap: [
      {
        day: "Day 01",
        title: "Sitemap Crawl & SEO Traffic Architecture Audit",
        description: "Deep crawl of your existing site to extract all indexed URLs, ranking keywords, meta tags, and high-performing content."
      },
      {
        day: "Days 02–03",
        title: "Bespoke Modern Design & React Component Engineering",
        description: "Rebuilding your site from the ground up in modern React with fresh typography, improved conversion pathways, and mobile optimization."
      },
      {
        day: "Day 04",
        title: "Staging Comparison & 301 Redirect Mapping",
        description: "You compare the new sub-second staging site side-by-side with your old site. We configure 100% exact 301 server redirects."
      },
      {
        day: "Day 05",
        title: "Live Production Cutover & Search Console Verification",
        description: "Seamless domain cutover with zero downtime, instant XML sitemap resubmission to Google, and speed audit verification."
      }
    ],
    matchedDemoUrl: "/demos/home-renovation.html",
    matchedDemoName: "Halbrook Studio Precision Renovation",
    faqs: [
      {
        q: "Will my Google rankings drop during a redesign?",
        a: "No. With amateur redesigns rankings often crash because URLs change and create 404 errors. We prevent this completely by crawling every existing URL and mapping exact 1:1 301 redirects, preserving 100% of your accumulated Google authority."
      },
      {
        q: "What if I want to keep my existing content and blog posts?",
        a: "We migrate all your valuable articles, client case studies, and service copy into the new fast architecture, cleaning up formatting and broken links in the process."
      },
      {
        q: "How does the free pre-payment redesign demo work?",
        a: "After our 20-minute discovery call, we rebuild a working live preview of your homepage so you can test the dramatic speed and design jump on your phone before paying."
      }
    ]
  }
};
