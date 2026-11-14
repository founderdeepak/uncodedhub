export interface GlobalSector {
  name: string;
  query: string;
  summary: string;
}

export interface GlobalMarket {
  slug: string;
  countryName: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  complianceBadge: string;
  timezoneProtocol: string;
  pricing: {
    foundational: string;
    growth: string;
    bespoke: string;
  };
  localComparison: {
    localAgencyRate: string;
    localTimeline: string;
    uncodedHubRate: string;
    uncodedHubTimeline: string;
    savings: string;
  };
  topSectors: GlobalSector[];
  whyUs: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const GLOBAL_MARKETS_DATA: Record<string, GlobalMarket> = {
  // ── 01. United States ──
  us: {
    slug: 'us',
    countryName: 'United States',
    flag: '🇺🇸',
    currencySymbol: '$',
    currencyCode: 'USD',
    metaTitle: 'Custom Web Design & 7-Day Sprints for US Businesses | Uncoded Hub',
    metaDescription:
      'Hand-coded custom web development for US private practices, clinics, and studios. Sub-second speed, ADA & HIPAA compliant, delivered in 7 days for $1,800–$3,800.',
    headline: 'Bespoke 7-Day Web Design Sprints for US Businesses.',
    subheadline:
      'Skip the $15,000 quote and 12-week drag of traditional US digital agencies. We engineer custom, sub-second web platforms for American clinics, architects, and founders in 7 calendar days.',
    complianceBadge: '🛡️ ADA & WCAG 2.1 AA COMPLIANT · HIPAA-READY PATIENT ARCHITECTURE',
    timezoneProtocol:
      'Asynchronous sprint delivery with daily 5-minute Loom video updates recorded for US Eastern (EST) and Pacific (PST) morning review.',
    pricing: {
      foundational: '$1,800 USD',
      growth: '$2,600 USD',
      bespoke: '$3,800 USD',
    },
    localComparison: {
      localAgencyRate: '$12,000 – $30,000',
      localTimeline: '10 to 16 Weeks',
      uncodedHubRate: '$1,800 – $3,800',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save $10,000+ & Launch 8 Weeks Faster',
    },
    topSectors: [
      {
        name: 'Private Healthcare & Dental Clinics',
        query: 'custom dental clinic website design',
        summary: 'HIPAA-friendly patient booking, sub-second mobile triage, and aesthetic smile galleries.',
      },
      {
        name: 'Luxury Interior Design & Architecture',
        query: 'luxury interior architecture website designer',
        summary: 'High-res monograph portfolios, interactive render-to-reality sliders, and zero lag.',
      },
      {
        name: 'B2B Tech Startups & SaaS',
        query: 'hand coded website design agency for startups',
        summary: 'Pure semantic React, 100/100 Lighthouse score, and high-converting marketing funnels.',
      },
      {
        name: 'Boutique Law & Advisory Firms',
        query: 'law firm website design sprint',
        summary: 'Institutional credibility, attorney partner profiles, and verified case outcome storytelling.',
      },
    ],
    whyUs: [
      {
        title: 'Direct Founder Engineering (No Account Managers)',
        description:
          'In US agencies, 60% of your fee funds account executives and project coordinators. At Uncoded Hub, you collaborate directly with Deepak (lead engineer) and Geetha (conversion strategist).',
      },
      {
        title: 'Global Edge CDN Delivery (<0.7s in North America)',
        description:
          'Deployed on Cloudflare global edge servers located in New York, Chicago, Dallas, and San Jose. Your website opens in under 700ms on 4G cellular across the United States.',
      },
      {
        title: 'Full Intellectual Property & GitHub Handover',
        description:
          'No recurring builder tax or proprietary CMS traps. On day 7, you receive the full clean source code repository with 100% ownership.',
      },
    ],
    faq: [
      {
        question: 'How do payments work for US clients?',
        answer:
          'We invoice via Stripe in USD ($). You can pay seamlessly using any US business credit card, ACH bank transfer, or wire transfer with instant tax-compliant invoicing and W-8BEN compliance.',
      },
      {
        question: 'How do you handle timezone communication between the US and your studio?',
        answer:
          'We operate an async-first workflow. Every evening US time, you receive a concise Loom video walkthrough showing exactly what was built that day. We also hold live Zoom onboarding and final handover calls scheduled during US morning hours.',
      },
      {
        question: 'Are your websites ADA / WCAG compliant for US law?',
        answer:
          'Yes. We enforce semantic HTML5, keyboard navigation tab-stops, high-contrast ratios, and screen-reader accessibility labels to satisfy WCAG 2.1 AA standards and mitigate digital accessibility liability.',
      },
    ],
  },

  // ── 02. United Kingdom ──
  uk: {
    slug: 'uk',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    currencySymbol: '£',
    currencyCode: 'GBP',
    metaTitle: 'Bespoke Web Design & 7-Day Sprints for UK Businesses | Uncoded Hub',
    metaDescription:
      'Hand-crafted custom web development for UK private clinics, solicitors, and architects. Sub-second speed, GDPR-compliant, delivered in 7 days for £1,500–£2,900.',
    headline: 'Bespoke 7-Day Web Design Sprints for UK Businesses.',
    subheadline:
      'Avoid London agency retainers and multi-month delays. We deliver high-performance, hand-coded websites for British practices, ateliers, and consulting firms in a fixed 7-day sprint.',
    complianceBadge: '🛡️ GDPR-NATIVE ARCHITECTURE · ZERO COOKIE-BANNER BLOAT · PRIVACY FIRST',
    timezoneProtocol:
      'Synchronous 3.5-hour afternoon working overlap with London (GMT/BST), plus comprehensive morning Loom status reports.',
    pricing: {
      foundational: '£1,500 GBP',
      growth: '£2,100 GBP',
      bespoke: '£2,900 GBP',
    },
    localComparison: {
      localAgencyRate: '£8,000 – £22,000',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: '£1,500 – £2,900',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save £6,000+ & Launch 2 Months Ahead',
    },
    topSectors: [
      {
        name: 'Private Harley Street Clinics & Dentists',
        query: 'private clinic website design london',
        summary: 'Direct consultation booking, private patient privacy standards, and sub-second mobile access.',
      },
      {
        name: 'Architectural Ateliers & Spatial Designers',
        query: 'architect portfolio website design uk',
        summary: 'Editorial layout typography, award-winning project archiving, and crisp imagery.',
      },
      {
        name: 'Boutique Solicitors & Financial Advisers',
        query: 'solicitors firm website design sprint',
        summary: 'SRA compliant presentation, partner profiles, and high-trust fee transparency.',
      },
      {
        name: 'Specialist Renovation & Joinery Contractors',
        query: 'bespoke joinery website design uk',
        summary: 'High-precision craftsmanship portfolios, architectural hardware disclosure, and quotation funnels.',
      },
    ],
    whyUs: [
      {
        title: 'Zero Cookie Banner Hassle (GDPR-Clean)',
        description:
          'Because our hand-coded platforms contain zero third-party tracking scripts or surveillance bloat, your UK visitors experience pure, uninterrupted page speed without cookie modal popups.',
      },
      {
        title: 'Sub-600ms UK Latency (London Edge Node)',
        description:
          'Edge-rendered through London and Manchester data centres. Pages load before the visitor can finish their tap.',
      },
      {
        title: 'Transparent Fixed-Price Deliverable',
        description:
          'UK agencies routinely bill £120/hr for change requests. Our scopes are 100% fixed with guaranteed delivery timelines.',
      },
    ],
    faq: [
      {
        question: 'Can UK businesses pay via BACS or card?',
        answer:
          'Yes. We accept UK bank transfers (BACS/Faster Payments) via Wise and major credit cards via Stripe, denominated in GBP (£) with reverse-charge VAT-compliant invoicing.',
      },
      {
        question: 'What is the working hour overlap with the UK?',
        answer:
          'India is just 4.5 hours ahead of GMT (3.5 hours during BST). Our afternoons directly mirror your UK morning working hours, ensuring swift real-time Slack/WhatsApp communication.',
      },
    ],
  },

  // ── 03. Canada ──
  ca: {
    slug: 'ca',
    countryName: 'Canada',
    flag: '🇨🇦',
    currencySymbol: '$',
    currencyCode: 'CAD',
    metaTitle: 'Custom Web Design & 7-Day Sprints for Canadian Businesses | Uncoded Hub',
    metaDescription:
      'High-speed, hand-coded web design for Canadian practices, builders, and professionals in Toronto, Vancouver, and Calgary. Delivered in 7 days for $2,500–$4,800 CAD.',
    headline: 'Bespoke 7-Day Web Design Sprints for Canadian Businesses.',
    subheadline:
      'Tired of Toronto agency quotes exceeding $20,000 CAD? We deliver hand-crafted, sub-second React platforms for Canadian builders, clinics, and professional firms in 7 calendar days.',
    complianceBadge: '🛡️ PIPEDA COMPLIANT · AODA ACCESSIBILITY READY · ZERO BLOATWARE',
    timezoneProtocol:
      'Seamless timezone coordination across Eastern (EST) and Pacific (PST) with daily video updates and scheduled morning sync calls.',
    pricing: {
      foundational: '$2,500 CAD',
      growth: '$3,600 CAD',
      bespoke: '$4,800 CAD',
    },
    localComparison: {
      localAgencyRate: '$14,000 – $28,000 CAD',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: '$2,500 – $4,800 CAD',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save $10,000+ CAD with Fixed Guarantees',
    },
    topSectors: [
      {
        name: 'Custom Home Builders & Architects',
        query: 'custom home builder website design toronto',
        summary: 'High-resolution project monographs, construction milestone transparency, and trade spec proof.',
      },
      {
        name: 'Medical, Dental & Cosmetic Clinics',
        query: 'medical clinic website design vancouver',
        summary: 'AODA accessibility certified, sub-second mobile appointment intake, and clean provider profiles.',
      },
      {
        name: 'Immigration & Corporate Law Firms',
        query: 'immigration law firm website design canada',
        summary: 'High-credibility assessment funnels, multilingual readiness, and partner credential authority.',
      },
    ],
    whyUs: [
      {
        title: 'Canadian Edge Infrastructure (Toronto & Montreal)',
        description:
          'Locally routed through Canadian data centers in Toronto and Montreal, delivering sub-600ms load times from Halifax to Vancouver.',
      },
      {
        title: 'Fixed Pricing in CAD ($)',
        description:
          'No currency conversion risk. Invoices are issued directly in Canadian Dollars (CAD) via Stripe or EFT wire.',
      },
    ],
    faq: [
      {
        question: 'Are your websites compliant with Ontario’s AODA requirements?',
        answer:
          'Yes. All our codebases comply with WCAG 2.0/2.1 Level AA as required by Ontario’s Accessibility for Ontarians with Disabilities Act (AODA).',
      },
    ],
  },

  // ── 04. Australia ──
  au: {
    slug: 'au',
    countryName: 'Australia',
    flag: '🇦🇺',
    currencySymbol: '$',
    currencyCode: 'AUD',
    metaTitle: 'Custom Web Design & 7-Day Sprints for Australian Businesses | Uncoded Hub',
    metaDescription:
      'Hand-coded bespoke web design for Australian practices, builders, and studios in Sydney, Melbourne, and Brisbane. 0.6s speed, delivered in 7 days for $2,500–$4,800 AUD.',
    headline: 'Bespoke 7-Day Web Design Sprints for Australian Businesses.',
    subheadline:
      'Skip Australian agency retainers and offshore freelancer horror stories. We build high-converting, sub-second web platforms for clinics, architects, and contractors in 7 days.',
    complianceBadge: '⚡ SUB-600MS SYDNEY EDGE CDN · 100/100 LIGHTHOUSE PERFORMANCE',
    timezoneProtocol:
      'Australia/Sydney time (AEST) overlap: we receive your morning feedback and execute overnight, delivering daily progress before you start work.',
    pricing: {
      foundational: '$2,500 AUD',
      growth: '$3,600 AUD',
      bespoke: '$4,800 AUD',
    },
    localComparison: {
      localAgencyRate: '$10,000 – $25,000 AUD',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: '$2,500 – $4,800 AUD',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save $8,000+ AUD with Fixed Guarantees',
    },
    topSectors: [
      {
        name: 'Allied Health & Medical Practices',
        query: 'allied health clinic website development sydney',
        summary: 'Direct patient scheduling, Medicare item transparency, and high-speed mobile accessibility.',
      },
      {
        name: 'Custom Builders & Architectural Designers',
        query: 'custom home builder website design melbourne',
        summary: 'High-res residential showcases, build-timeline commitment, and trade specification proof.',
      },
      {
        name: 'Commercial Contractors & Trade Services',
        query: 'custom landing page designer for contractors',
        summary: '1-tap quote calculators, suburb territory selectors, and emergency dispatch UX.',
      },
    ],
    whyUs: [
      {
        title: 'Overnight Development Advantage',
        description:
          'When your Australian workday ends at 5 PM, our studio is in peak afternoon execution. You review fresh updates when you open your laptop the next morning.',
      },
      {
        title: 'Sub-600ms Speed in Sydney & Melbourne',
        description:
          'Locally edge-cached in Equinix and NextDC data centres in Sydney and Melbourne, ensuring instant mobile load times across Australia.',
      },
    ],
    faq: [
      {
        question: 'Can Australian clients pay in AUD?',
        answer:
          'Yes. Invoicing is processed directly in Australian Dollars (AUD) via Stripe or international bank transfer.',
      },
    ],
  },

  // ── 05. New Zealand ──
  nz: {
    slug: 'nz',
    countryName: 'New Zealand',
    flag: '🇳🇿',
    currencySymbol: '$',
    currencyCode: 'NZD',
    metaTitle: 'High-Speed Web Design & 7-Day Sprints for New Zealand Businesses | Uncoded Hub',
    metaDescription:
      'Custom React web design for Kiwi builders, architects, and healthcare practices in Auckland and Wellington. Fixed 7-day sprints for $2,800–$5,200 NZD.',
    headline: 'Bespoke 7-Day Web Design Sprints for New Zealand Businesses.',
    subheadline:
      'Avoid high Auckland studio fees and sluggish agency timelines. We build handcrafted, high-converting digital flagships for New Zealand businesses with a contractual 7-day delivery guarantee.',
    complianceBadge: '🛡️ PRIVACY ACT COMPLIANT · AUCKLAND EDGE CACHED · SUB-SECOND LCP',
    timezoneProtocol:
      'NZST / NZDT timezone coordination: overnight execution guarantees daily progress review every morning in Auckland.',
    pricing: {
      foundational: '$2,800 NZD',
      growth: '$3,900 NZD',
      bespoke: '$5,200 NZD',
    },
    localComparison: {
      localAgencyRate: '$9,000 – $20,000 NZD',
      localTimeline: '8 to 12 Weeks',
      uncodedHubRate: '$2,800 – $5,200 NZD',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save $6,000+ NZD & Launch On Time',
    },
    topSectors: [
      {
        name: 'Boutique Construction & Architects',
        query: 'boutique architecture website design auckland',
        summary: 'Architectural craftsmanship archives, spatial render showcases, and project cost calculators.',
      },
      {
        name: 'Luxury Lodges & Eco-Tourism',
        query: 'luxury lodge website design new zealand',
        summary: 'Immersive visual storytelling, direct commission-free reservation booking, and 4K media streaming.',
      },
      {
        name: 'Specialist Healthcare & Dental',
        query: 'dental clinic website design wellington',
        summary: 'Frictionless mobile booking, transparent treatment breakdowns, and patient trust proof.',
      },
    ],
    whyUs: [
      {
        title: 'Auckland Local Edge Nodes',
        description: 'Served from Cloudflare Auckland edge servers, delivering under 0.6s response times across the North and South Islands.',
      },
    ],
    faq: [
      {
        question: 'Can New Zealand businesses pay in NZD?',
        answer: 'Yes. Invoices are denominated in NZD ($) and payable via credit card or direct bank transfer.',
      },
    ],
  },

  // ── 06. Ireland ──
  ie: {
    slug: 'ie',
    countryName: 'Ireland',
    flag: '🇮🇪',
    currencySymbol: '€',
    currencyCode: 'EUR',
    metaTitle: 'Bespoke Web Design & 7-Day Sprints for Irish Businesses | Uncoded Hub',
    metaDescription:
      'High-performance web development for Irish tech firms, solicitors, and medical clinics in Dublin, Cork, and Galway. Delivered in 7 days for €1,600–€3,200 EUR.',
    headline: 'Bespoke 7-Day Web Design Sprints for Irish Businesses.',
    subheadline:
      'Skip overpriced Dublin digital agencies. Senior founders Deepak & Geetha engineer hand-coded React web platforms with sub-second speeds in a guaranteed 7-day sprint.',
    complianceBadge: '🛡️ EU GDPR NATIVE · ZERO THIRD-PARTY COOKIES · DUBLIN EDGE HOSTED',
    timezoneProtocol:
      'Convenient 4.5-hour timezone difference allowing comprehensive afternoon synchronous working overlap with Dublin.',
    pricing: {
      foundational: '€1,600 EUR',
      growth: '€2,300 EUR',
      bespoke: '€3,200 EUR',
    },
    localComparison: {
      localAgencyRate: '€8,000 – €20,000 EUR',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: '€1,600 – €3,200 EUR',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save €6,000+ & Launch 2 Months Sooner',
    },
    topSectors: [
      {
        name: 'B2B Tech Startups & Scaleups',
        query: 'b2b tech startup website design dublin',
        summary: 'Modern developer-grade typography, frictionless demo booking, and 100/100 Core Web Vitals.',
      },
      {
        name: 'Solicitors & Corporate Advisory',
        query: 'solicitor website design fixed price ireland',
        summary: 'Law Society compliance, partner profiles, and high-trust consultation scheduling.',
      },
      {
        name: 'Private Medical & Aesthetic Clinics',
        query: 'private aesthetic clinic website design cork',
        summary: 'Direct consultation calendar, procedure transparency, and sub-second mobile access.',
      },
    ],
    whyUs: [
      {
        title: 'Dublin Cloudflare Edge Routing',
        description: 'Hosted on European edge infrastructure in Dublin, loading in under 500ms for visitors across Ireland and the EU.',
      },
    ],
    faq: [
      {
        question: 'Are invoices compliant with Irish and EU VAT regulations?',
        answer: 'Yes. Invoices are issued in EUR (€) with reverse charge VAT mechanisms for EU businesses.',
      },
    ],
  },

  // ── 07. United Arab Emirates ──
  uae: {
    slug: 'uae',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    currencySymbol: 'AED',
    currencyCode: 'AED',
    metaTitle: 'Luxury Web Design & 7-Day Sprints in Dubai & UAE | Uncoded Hub',
    metaDescription:
      'High-performance luxury web development for Dubai and UAE real estate, aesthetic clinics, and elite family offices. Direct WhatsApp booking, delivered in 7 days for 6,500–14,000 AED.',
    headline: 'High-Performance Web Design for Dubai & UAE Businesses.',
    subheadline:
      'In the UAE market, speed and visual prestige dictate deal flow. We craft bespoke, hand-coded digital flagships for Dubai developers, aesthetic clinics, and luxury service providers in 7 days.',
    complianceBadge: '⚡ 1-TAP WHATSAPP VIP CONCIERGE · BILINGUAL ARABIC/ENGLISH READY',
    timezoneProtocol:
      'Near-identical timezone (UAE is just 1.5 hours behind India), enabling real-time collaboration throughout your working day.',
    pricing: {
      foundational: '6,500 AED',
      growth: '9,500 AED',
      bespoke: '14,000 AED',
    },
    localComparison: {
      localAgencyRate: '25,000 – 60,000 AED',
      localTimeline: '8 to 12 Weeks',
      uncodedHubRate: '6,500 – 14,000 AED',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 20,000+ AED & Zero Freelance Flake',
    },
    topSectors: [
      {
        name: 'Luxury Real Estate & Villa Brokers',
        query: 'real estate developer portfolio website design dubai',
        summary: 'High-ticket penthouse visualizers, 4K walkthroughs, and instant WhatsApp inquiry routing.',
      },
      {
        name: 'Aesthetic & Dermatology Clinics',
        query: 'aesthetic clinic website development uae',
        summary: 'VIP treatment menus, before/after aesthetic sliders, and direct consultant scheduling.',
      },
      {
        name: 'Corporate Advisory & Free Zone Services',
        query: 'corporate services website design dubai',
        summary: 'Institutional credibility, company formation cost matrices, and client trust architecture.',
      },
    ],
    whyUs: [
      {
        title: 'Aligned Timezone (1.5 Hour Difference)',
        description:
          'Dubai (GST) and India (IST) share almost identical business hours. You get immediate answers and daily check-ins without late-night delays.',
      },
      {
        title: 'Built for the UAE WhatsApp Economy',
        description:
          'Business in the Gulf closes on WhatsApp. We engineer context-aware WhatsApp booking funnels that pre-fill property or consultation details automatically.',
      },
    ],
    faq: [
      {
        question: 'Can UAE businesses pay locally in AED?',
        answer:
          'Yes. We accept corporate wire transfers, Stripe credit cards, and Wise transfers in AED with formal tax invoices.',
      },
      {
        question: 'Do you build bilingual English and Arabic websites?',
        answer:
          'Yes. We support RTL (Right-to-Left) Arabic layouts alongside English with seamless language toggle and localized SEO tags.',
      },
    ],
  },

  // ── 08. Singapore ──
  sg: {
    slug: 'sg',
    countryName: 'Singapore',
    flag: '🇸🇬',
    currencySymbol: '$',
    currencyCode: 'SGD',
    metaTitle: 'Bespoke Web Design & 7-Day Sprints for Singapore Businesses | Uncoded Hub',
    metaDescription:
      'Ultra-fast, hand-coded web design for Singapore family offices, clinics, and tech scaleups. Delivered in 7 days for $2,500–$4,800 SGD.',
    headline: 'Bespoke 7-Day Web Design Sprints for Singapore Businesses.',
    subheadline:
      'Skip Singapore agency fees of $15,000+ SGD. We engineer sub-second React platforms for Singapore clinics, wealth managers, and corporate advisory firms in a fixed 7-day sprint.',
    complianceBadge: '⚡ SUB-500MS APAC REGIONAL CDN · PDPA COMPLIANT · ZERO BLOAT',
    timezoneProtocol:
      'Singapore (SGT) is just 2.5 hours ahead of India. Seamless synchronous working hours throughout the business day.',
    pricing: {
      foundational: '$2,500 SGD',
      growth: '$3,600 SGD',
      bespoke: '$4,800 SGD',
    },
    localComparison: {
      localAgencyRate: '$10,000 – $25,000 SGD',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: '$2,500 – $4,800 SGD',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save $8,000+ SGD with Fixed Deliverables',
    },
    topSectors: [
      {
        name: 'Family Offices & Wealth Management',
        query: 'wealth management website design singapore',
        summary: 'Institutional authority, regulatory disclosure hygiene, and elite private client intake.',
      },
      {
        name: 'Medical Specialists (Mount Elizabeth / Gleneagles)',
        query: 'specialist clinic website designer singapore',
        summary: 'Direct appointment scheduling, transparent procedure guides, and mobile speed.',
      },
      {
        name: 'Regional Tech HQs & FinTech',
        query: 'fintech website development agency singapore',
        summary: 'High-speed landing pages, compliance disclosures, and high-converting B2B lead generation.',
      },
    ],
    whyUs: [
      {
        title: 'Singapore Regional Edge Routing',
        description: 'Hosted on Cloudflare Singapore edge servers, ensuring under 0.4s response times across Singapore and Southeast Asia.',
      },
    ],
    faq: [
      {
        question: 'Can Singapore companies pay in SGD via PayNow or FAST?',
        answer: 'Yes. Invoices are denominated in SGD ($) with direct PayNow / FAST corporate transfer and Stripe card options.',
      },
    ],
  },

  // ── 09. Qatar ──
  qa: {
    slug: 'qa',
    countryName: 'Qatar',
    flag: '🇶🇦',
    currencySymbol: 'QAR',
    currencyCode: 'QAR',
    metaTitle: 'Luxury Web Design & 7-Day Sprints in Doha, Qatar | Uncoded Hub',
    metaDescription:
      'Bespoke web development for Doha luxury real estate, architectural consultants, and healthcare clinics. 7-day sprint delivery for 6,500–13,000 QAR.',
    headline: 'High-End Web Architecture for Doha & Qatar Businesses.',
    subheadline:
      'Deliver the visual prestige your Qatar clients expect. We build custom-coded, ultra-fast web platforms for Doha developers, aesthetic clinics, and consulting firms in 7 days.',
    complianceBadge: '⚡ LUXURY CONCIERGE WHATSAPP · 0.6S GULF 5G RESPONSE TIME',
    timezoneProtocol:
      'Qatar (AST) is 2.5 hours behind India, allowing continuous daytime communication and immediate feedback cycles.',
    pricing: {
      foundational: '6,500 QAR',
      growth: '9,500 QAR',
      bespoke: '13,000 QAR',
    },
    localComparison: {
      localAgencyRate: '25,000 – 55,000 QAR',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: '6,500 – 13,000 QAR',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 18,000+ QAR & Launch in 7 Days',
    },
    topSectors: [
      {
        name: 'Architecture & Interior Consultancy',
        query: 'luxury interior design website doha',
        summary: 'High-res spatial project portfolios, 3D walkthroughs, and VIP client inquiry routing.',
      },
      {
        name: 'Engineering & Contracting Companies',
        query: 'contractor portfolio website qatar',
        summary: 'Tender-ready company credentials, mega-project case studies, and safety compliance proof.',
      },
    ],
    whyUs: [
      {
        title: 'Zero Lag on Gulf Cellular Networks',
        description: 'Built with pure React and Vite for instantaneous loading on Ooredoo and Vodafone 5G networks in Doha.',
      },
    ],
    faq: [
      {
        question: 'How do payments work for Qatar clients?',
        answer: 'Payments are accepted in QAR via international wire transfer or Stripe corporate cards with formal commercial invoices.',
      },
    ],
  },

  // ── 10. Saudi Arabia ──
  sa: {
    slug: 'sa',
    countryName: 'Saudi Arabia',
    flag: '🇸🇦',
    currencySymbol: 'SAR',
    currencyCode: 'SAR',
    metaTitle: 'Custom Web Design & 7-Day Sprints for Saudi Businesses | Uncoded Hub',
    metaDescription:
      'Hand-crafted digital platforms for Riyadh and Jeddah contracting, medical, and corporate consulting firms. Bilingual ready, delivered in 7 days for 7,000–15,000 SAR.',
    headline: 'High-Speed Web Platforms for Saudi Arabia’s Vision 2030 Boom.',
    subheadline:
      'Elevate your commercial profile in Riyadh and Jeddah. We engineer high-performance, bilingual web platforms for contractors, clinics, and advisory firms in 7 calendar days.',
    complianceBadge: '🇸🇦 VISION 2030 ENTERPRISE STANDARDS · BILINGUAL ARABIC/ENGLISH',
    timezoneProtocol:
      'Saudi Arabia (AST) is 2.5 hours behind India, providing full workday collaboration throughout Riyadh and Jeddah business hours.',
    pricing: {
      foundational: '7,000 SAR',
      growth: '10,500 SAR',
      bespoke: '15,000 SAR',
    },
    localComparison: {
      localAgencyRate: '25,000 – 65,000 SAR',
      localTimeline: '8 to 16 Weeks',
      uncodedHubRate: '7,000 – 15,000 SAR',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 20,000+ SAR & Fixed Deadlines',
    },
    topSectors: [
      {
        name: 'Contracting & Industrial EPC',
        query: 'contracting company profile website riyadh',
        summary: 'Institutional credibility for ministerial tenders, safety milestones, and project execution portfolios.',
      },
      {
        name: 'Private Medical & Dental Polyclinics',
        query: 'medical clinic website jeddah',
        summary: 'Fast patient booking, doctor profiles, and bilingual medical service descriptions.',
      },
    ],
    whyUs: [
      {
        title: 'Bilingual RTL Architecture',
        description: 'Engineered for seamless English and Arabic typography with instant layout flipping.',
      },
    ],
    faq: [
      {
        question: 'Can Saudi companies pay via SAR bank transfer?',
        answer: 'Yes. We support direct international wire transfers in SAR and major corporate cards with commercial invoices.',
      },
    ],
  },

  // ── 11. Kuwait ──
  kw: {
    slug: 'kw',
    countryName: 'Kuwait',
    flag: '🇰🇼',
    currencySymbol: 'KWD',
    currencyCode: 'KWD',
    metaTitle: 'Bespoke Web Design & 7-Day Sprints for Kuwait Businesses | Uncoded Hub',
    metaDescription:
      'Hand-coded luxury web design for Kuwait City clinics, retail boutiques, and corporate enterprises. Delivered in 7 days for 550–1,200 KWD.',
    headline: 'Luxury Web Platforms for Kuwait Businesses.',
    subheadline:
      'Leverage the world’s strongest currency for maximum engineering return. We build high-speed, custom-coded web flagships for Kuwait clinics, luxury retailers, and consultancies in 7 days.',
    complianceBadge: '⚡ SUB-0.5S MOBILE SPEED · WHATSAPP EXPRESS SALES INTEGRATION',
    timezoneProtocol:
      'Kuwait (AST) is 2.5 hours behind India, ensuring smooth real-time communication during all Kuwait business hours.',
    pricing: {
      foundational: '550 KWD',
      growth: '850 KWD',
      bespoke: '1,200 KWD',
    },
    localComparison: {
      localAgencyRate: '2,500 – 6,500 KWD',
      localTimeline: '8 to 12 Weeks',
      uncodedHubRate: '550 – 1,200 KWD',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 1,800+ KWD with Guaranteed 7-Day Launch',
    },
    topSectors: [
      {
        name: 'Private Dermatology & Dental Centers',
        query: 'private clinic website design kuwait',
        summary: 'VIP consultation intake, procedure galleries, and WhatsApp appointment booking.',
      },
      {
        name: 'Artisanal Food Concepts & Luxury Boutiques',
        query: 'luxury brand storefront kuwait',
        summary: 'High-end visual showcase, direct online ordering, and social commerce integration.',
      },
    ],
    whyUs: [
      {
        title: 'Direct Founder Execution',
        description: 'Senior founders Deepak and Geetha handle design and engineering directly with zero junior intermediaries.',
      },
    ],
    faq: [
      {
        question: 'How do Kuwait businesses remit payment?',
        answer: 'We accept international wire transfers in KWD/USD and all major corporate credit cards via Stripe.',
      },
    ],
  },

  // ── 12. Bahrain ──
  bh: {
    slug: 'bh',
    countryName: 'Bahrain',
    flag: '🇧🇭',
    currencySymbol: 'BHD',
    currencyCode: 'BHD',
    metaTitle: 'Custom Web Design & 7-Day Sprints in Bahrain | Uncoded Hub',
    metaDescription:
      'Bespoke web development for Manama FinTech, legal, and medical practices. Sub-second speed, delivered in 7 days for 700–1,500 BHD.',
    headline: 'High-Performance Web Platforms for Bahrain Businesses.',
    subheadline:
      'Skip traditional Manama agency delays. We engineer custom-coded, ultra-fast web platforms for Bahrain FinTech, legal, and healthcare companies in a fixed 7-day sprint.',
    complianceBadge: '⚡ GULF EDGE CDN · INSTANT WHATSAPP LEAD INTAKE',
    timezoneProtocol:
      'Bahrain (AST) is 2.5 hours behind India, allowing continuous daytime communication and real-time collaboration.',
    pricing: {
      foundational: '700 BHD',
      growth: '1,050 BHD',
      bespoke: '1,500 BHD',
    },
    localComparison: {
      localAgencyRate: '3,000 – 7,500 BHD',
      localTimeline: '8 to 12 Weeks',
      uncodedHubRate: '700 – 1,500 BHD',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 2,200+ BHD & Launch On Time',
    },
    topSectors: [
      {
        name: 'FinTech & Corporate Law Firms',
        query: 'fintech website design manama',
        summary: 'Regulatory credential authority, client onboarding portals, and partner profiles.',
      },
      {
        name: 'Logistics & Specialty Services',
        query: 'logistics company web development bahrain',
        summary: 'Fast quote request forms, fleet capability showcases, and client portal access.',
      },
    ],
    whyUs: [
      {
        title: 'Transparent Fixed Scope',
        description: '100% fixed cost with zero hourly creep and contractual on-time guarantee.',
      },
    ],
    faq: [
      {
        question: 'Can Bahrain clients pay in BHD?',
        answer: 'Yes. Invoices are denominated in BHD or USD with direct wire and card payment options.',
      },
    ],
  },

  // ── 13. Switzerland ──
  ch: {
    slug: 'ch',
    countryName: 'Switzerland',
    flag: '🇨🇭',
    currencySymbol: 'CHF',
    currencyCode: 'CHF',
    metaTitle: 'Precision Web Design & 7-Day Sprints for Swiss Businesses | Uncoded Hub',
    metaDescription:
      'Swiss precision web development for Zurich and Geneva private wealth, biotech, and luxury ateliers. Hand-coded React in 7 days for 2,000–4,500 CHF.',
    headline: 'Swiss-Grade Precision Web Engineering in 7 Days.',
    subheadline:
      'Swiss digital agencies charge 15,000 to 35,000 CHF for routine websites. We engineer hand-coded, sub-second React platforms for Zurich wealth managers, biotech innovators, and luxury ateliers in 7 days.',
    complianceBadge: '🛡️ SWISS FADP & EU GDPR COMPLIANT · ZERO SURVEILLANCE COOKIES · 100/100 CWV',
    timezoneProtocol:
      'Zurich/Geneva (CET/CEST) timezone allows a comfortable 3.5 to 4.5-hour working overlap every afternoon.',
    pricing: {
      foundational: '2,000 CHF',
      growth: '3,100 CHF',
      bespoke: '4,500 CHF',
    },
    localComparison: {
      localAgencyRate: '12,000 – 35,000 CHF',
      localTimeline: '10 to 16 Weeks',
      uncodedHubRate: '2,000 – 4,500 CHF',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 10,000+ CHF with Guaranteed Launch Date',
    },
    topSectors: [
      {
        name: 'Private Wealth Management & Family Offices',
        query: 'private wealth management website zurich',
        summary: 'FINMA regulatory compliance presentation, discreet private portal gateways, and bespoke typography.',
      },
      {
        name: 'Biotech & Life Sciences Innovations',
        query: 'biotech firm website design geneva',
        summary: 'Clinical pipeline data visualization, investor portals, and scientific authority.',
      },
      {
        name: 'Luxury Horology & Craft Ateliers',
        query: 'luxury atelier website design switzerland',
        summary: 'Artisanal visual monographs, interactive material showcases, and sub-second asset streaming.',
      },
    ],
    whyUs: [
      {
        title: 'Swiss Precision Engineering',
        description: 'Zero third-party trackers, zero bloatware, and absolute technical excellence.',
      },
    ],
    faq: [
      {
        question: 'Can Swiss companies pay in CHF via IBAN transfer?',
        answer: 'Yes. We provide Swiss IBAN bank transfer details and Stripe card payments in CHF with commercial invoices.',
      },
    ],
  },

  // ── 14. Germany ──
  de: {
    slug: 'de',
    countryName: 'Germany',
    flag: '🇩🇪',
    currencySymbol: '€',
    currencyCode: 'EUR',
    metaTitle: 'Custom Web Design & 7-Day Sprints for German Businesses | Uncoded Hub',
    metaDescription:
      'Hand-coded React web platforms for German B2B SaaS, industrial OEMs, and medical practices in Berlin, Munich, and Frankfurt. Delivered in 7 days for €1,800–€3,800 EUR.',
    headline: 'High-Performance Web Platforms for German Enterprises.',
    subheadline:
      'Escape German agency bureaucracy and 16-week lead times. We engineer clean, hand-coded React web platforms for German Mittelstand OEMs, medical practices, and B2B leaders in 7 days.',
    complianceBadge: '🛡️ DSGVO / GDPR 100% COMPLIANT · IMPRESSUM READY · ZERO TRACKING BLOAT',
    timezoneProtocol:
      'Synchronous 3.5 to 4.5-hour afternoon working overlap with Berlin and Frankfurt (CET/CEST).',
    pricing: {
      foundational: '€1,800 EUR',
      growth: '€2,600 EUR',
      bespoke: '€3,800 EUR',
    },
    localComparison: {
      localAgencyRate: '€10,000 – €28,000 EUR',
      localTimeline: '10 to 16 Weeks',
      uncodedHubRate: '€1,800 – €3,800 EUR',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save €8,000+ EUR & Launch 2 Months Sooner',
    },
    topSectors: [
      {
        name: 'Precision Engineering & Industrial OEMs',
        query: 'industrial oem website design germany',
        summary: 'CAD/spec sheet downloads, certification authority (ISO/DIN), and international inquiry funnels.',
      },
      {
        name: 'B2B SaaS & Tech Innovators',
        query: 'b2b saas website development berlin',
        summary: 'Developer-grade typography, interactive product tours, and high conversion velocity.',
      },
      {
        name: 'Private Medical Specialists & Clinics',
        query: 'arzt praxis website redesign munich',
        summary: 'Sub-second mobile triage, online booking, and DS-GVO compliant patient privacy.',
      },
    ],
    whyUs: [
      {
        title: 'DSGVO Compliance Native',
        description: 'Clean code containing 0 Google Fonts external calls or unnecessary tracking cookies, guaranteeing complete legal compliance.',
      },
    ],
    faq: [
      {
        question: 'Do you provide legally required German Impressum and Datenschutz templates?',
        answer: 'Yes. Every German platform includes dedicated, compliant Impressum and Datenschutz structures ready for your legal counsel.',
      },
    ],
  },

  // ── 15. Netherlands ──
  nl: {
    slug: 'nl',
    countryName: 'Netherlands',
    flag: '🇳🇱',
    currencySymbol: '€',
    currencyCode: 'EUR',
    metaTitle: 'Bespoke Web Design & 7-Day Sprints for Dutch Businesses | Uncoded Hub',
    metaDescription:
      'Hand-coded custom web development for Dutch design studios, logistics firms, and clinics in Amsterdam and Rotterdam. Delivered in 7 days for €1,600–€3,400 EUR.',
    headline: 'Bespoke 7-Day Web Design Sprints for Dutch Businesses.',
    subheadline:
      'Avoid high Amsterdam agency rates and endless meetings. We engineer sub-second, custom-coded digital flagships for Dutch creative studios, logistics companies, and clinics in 7 days.',
    complianceBadge: '🛡️ EU GDPR NATIVE · SUB-0.5S AMSTERDAM INTERNET EXCHANGE ROUTING',
    timezoneProtocol:
      'CET/CEST timezone alignment offers seamless 3.5 to 4.5-hour synchronous afternoon collaboration with Amsterdam.',
    pricing: {
      foundational: '€1,600 EUR',
      growth: '€2,400 EUR',
      bespoke: '€3,400 EUR',
    },
    localComparison: {
      localAgencyRate: '€8,000 – €22,000 EUR',
      localTimeline: '8 to 12 Weeks',
      uncodedHubRate: '€1,600 – €3,400 EUR',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save €6,000+ EUR & Zero Freelancer Flake',
    },
    topSectors: [
      {
        name: 'Design Studios & Architecture Ateliers',
        query: 'design studio portfolio website amsterdam',
        summary: 'Avant-garde grid layouts, high-res visual storytelling, and bespoke cursor micro-interactions.',
      },
      {
        name: 'Logistics & Maritime Freight Leaders',
        query: 'logistics web development rotterdam',
        summary: 'Direct freight quote inquiry funnels, port service breakdowns, and tracking integrations.',
      },
    ],
    whyUs: [
      {
        title: 'Amsterdam AMS-IX Edge Routing',
        description: 'Hosted through the Amsterdam Internet Exchange, delivering under 400ms mobile speed across the Netherlands.',
      },
    ],
    faq: [
      {
        question: 'Can Dutch companies pay via iDEAL or SEPA?',
        answer: 'Yes. Invoices are in EUR (€) and can be settled via SEPA bank transfer or corporate card with reverse-charge VAT.',
      },
    ],
  },

  // ── 16. Sweden ──
  se: {
    slug: 'se',
    countryName: 'Sweden',
    flag: '🇸🇪',
    currencySymbol: 'SEK',
    currencyCode: 'SEK',
    metaTitle: 'Minimalist Web Design & 7-Day Sprints for Swedish Businesses | Uncoded Hub',
    metaDescription:
      'Scandinavian minimalist web engineering for Stockholm tech startups, architects, and clinics. 7-day fixed sprint delivery for 20,000–42,000 SEK.',
    headline: 'Scandinavian Minimalist Web Design for Swedish Innovators.',
    subheadline:
      'Embrace pure performance without Stockholm agency retainers. We craft hand-coded, sub-second React platforms for Swedish startups, architects, and clinics in 7 days.',
    complianceBadge: '🇸🇪 NORDIC MINIMALISM · 100/100 LIGHTHOUSE · ZERO COOKIE POPUP NUISANCE',
    timezoneProtocol:
      'Stockholm (CET/CEST) timezone allows seamless daily afternoon communication and real-time collaboration.',
    pricing: {
      foundational: '20,000 SEK',
      growth: '30,000 SEK',
      bespoke: '42,000 SEK',
    },
    localComparison: {
      localAgencyRate: '90,000 – 240,000 SEK',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: '20,000 – 42,000 SEK',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 70,000+ SEK with Guaranteed Delivery',
    },
    topSectors: [
      {
        name: 'Tech Scale-ups & SaaS Pioneers',
        query: 'tech startup website development stockholm',
        summary: 'Clean Scandinavian typography, developer documentation aesthetics, and frictionless product signups.',
      },
      {
        name: 'Sustainable Architecture & Design',
        query: 'architectural firm website sweden',
        summary: 'Minimalist monographs, wood and stone texture presentation, and environmental milestone proof.',
      },
    ],
    whyUs: [
      {
        title: 'Pure Scandinavian Aesthetic',
        description: 'Uncluttered visual hierarchy, hyper-legible typography, and sub-second page transitions.',
      },
    ],
    faq: [
      {
        question: 'Can Swedish businesses pay in SEK via Bankgiro or card?',
        answer: 'Yes. Invoices are denominated in SEK (or EUR) with international wire and Stripe corporate card options.',
      },
    ],
  },

  // ── 17. Norway ──
  no: {
    slug: 'no',
    countryName: 'Norway',
    flag: '🇳🇴',
    currencySymbol: 'NOK',
    currencyCode: 'NOK',
    metaTitle: 'Custom Web Design & 7-Day Sprints for Norwegian Businesses | Uncoded Hub',
    metaDescription:
      'High-performance web development for Oslo maritime, clean energy, and healthcare enterprises. Delivered in 7 days for 20,000–45,000 NOK.',
    headline: 'Bespoke 7-Day Web Design Sprints for Norwegian Enterprises.',
    subheadline:
      'Skip high Norwegian consultancy rates. We engineer custom-coded, ultra-fast web platforms for Oslo clean energy innovators, commercial builders, and private clinics in 7 days.',
    complianceBadge: '⚡ SUB-500MS OSLO EDGE HOSTING · NORDIC DESIGN RIGOR',
    timezoneProtocol:
      'Oslo (CET/CEST) allows 3.5 to 4.5 hours of real-time overlap every single working afternoon.',
    pricing: {
      foundational: '20,000 NOK',
      growth: '31,000 NOK',
      bespoke: '45,000 NOK',
    },
    localComparison: {
      localAgencyRate: '90,000 – 250,000 NOK',
      localTimeline: '10 to 14 Weeks',
      uncodedHubRate: '20,000 – 45,000 NOK',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 70,000+ NOK with Fixed Guarantees',
    },
    topSectors: [
      {
        name: 'Clean Energy & Maritime Tech',
        query: 'energy technology website design oslo',
        summary: 'Offshore innovation showcases, environmental credential disclosures, and enterprise partner portals.',
      },
      {
        name: 'Commercial Real Estate & Architecture',
        query: 'commercial real estate portal norway',
        summary: 'High-res building visualizers, floorplan exploration, and direct broker contact routing.',
      },
    ],
    whyUs: [
      {
        title: 'Overnight Speed & Precision',
        description: 'Fixed 7-day delivery guaranteed in writing — if we miss the agreed deadline, the platform is 100% free.',
      },
    ],
    faq: [
      {
        question: 'Can Norwegian clients pay in NOK?',
        answer: 'Yes. Invoices are denominated in NOK with direct IBAN wire transfer and Stripe card payments.',
      },
    ],
  },

  // ── 18. Denmark ──
  dk: {
    slug: 'dk',
    countryName: 'Denmark',
    flag: '🇩🇰',
    currencySymbol: 'DKK',
    currencyCode: 'DKK',
    metaTitle: 'Bespoke Web Design & 7-Day Sprints for Danish Businesses | Uncoded Hub',
    metaDescription:
      'Danish design aesthetics with sub-second React engineering for Copenhagen brands, clinics, and studios. Delivered in 7 days for 14,000–30,000 DKK.',
    headline: 'Danish Design Aesthetics with Sub-Second Web Speed.',
    subheadline:
      'Elevate your digital presence with world-renowned Danish aesthetic restraint. We craft hand-coded web flagships for Copenhagen lifestyle brands, clinics, and architects in 7 days.',
    complianceBadge: '🇩🇰 COPENHAGEN DESIGN EXCELLENCE · ZERO BLOATWARE · GDPR NATIVE',
    timezoneProtocol:
      'Copenhagen (CET/CEST) allows 3.5 to 4.5 hours of seamless afternoon communication with our founders.',
    pricing: {
      foundational: '14,000 DKK',
      growth: '21,000 DKK',
      bespoke: '30,000 DKK',
    },
    localComparison: {
      localAgencyRate: '60,000 – 170,000 DKK',
      localTimeline: '8 to 12 Weeks',
      uncodedHubRate: '14,000 – 30,000 DKK',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save 45,000+ DKK & Launch in 7 Days',
    },
    topSectors: [
      {
        name: 'Architectural Hardware & Furniture Brands',
        query: 'interior design brand website copenhagen',
        summary: 'Editorial layout grids, tactile product photography presentation, and distributor locators.',
      },
      {
        name: 'Life Sciences & Biotech Ateliers',
        query: 'biotech website design denmark',
        summary: 'Clinical trial transparency, investor presentation decks, and scientific leadership profiles.',
      },
    ],
    whyUs: [
      {
        title: 'Copenhagen Edge Caching',
        description: 'Locally served from Cloudflare Copenhagen data centers, loading before the user finishes tapping.',
      },
    ],
    faq: [
      {
        question: 'Can Danish companies pay in DKK?',
        answer: 'Yes. Invoicing is processed in DKK via international bank wire or Stripe with reverse-charge VAT.',
      },
    ],
  },

  // ── 19. South Africa ──
  za: {
    slug: 'za',
    countryName: 'South Africa',
    flag: '🇿🇦',
    currencySymbol: 'R',
    currencyCode: 'ZAR',
    metaTitle: 'Custom Web Design & 7-Day Sprints for South African Businesses | Uncoded Hub',
    metaDescription:
      'Bespoke web platforms for Cape Town and Johannesburg private clinics, luxury lodges, and property developers. Delivered in 7 days for R32,000–R68,000 ZAR.',
    headline: 'High-Converting Web Platforms for South African Leaders.',
    subheadline:
      'Overcome unreliable freelancers and overpriced Cape Town agencies. Senior founders Deepak & Geetha build bespoke, sub-second React platforms for private practices and luxury brands in 7 days.',
    complianceBadge: '🇿🇦 POPIA COMPLIANT · JOHANNESBURG & CAPE TOWN EDGE ROUTED',
    timezoneProtocol:
      'South Africa (SAST) is only 3.5 hours behind India, allowing convenient same-day working communication throughout the day.',
    pricing: {
      foundational: 'R32,000 ZAR',
      growth: 'R48,000 ZAR',
      bespoke: 'R68,000 ZAR',
    },
    localComparison: {
      localAgencyRate: 'R80,000 – R240,000 ZAR',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: 'R32,000 – R68,000 ZAR',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save R50,000+ ZAR with Guaranteed Launch',
    },
    topSectors: [
      {
        name: 'Luxury Safari Lodges & Boutique Hotels',
        query: 'luxury safari lodge website design cape town',
        summary: 'Sensory visual storytelling, commission-free booking engines, and multi-currency rates.',
      },
      {
        name: 'Private Specialist Healthcare & Surgery',
        query: 'bespoke medical practice website johannesburg',
        summary: 'POPIA compliant patient intake, medical aid transparency, and sub-second mobile triage.',
      },
    ],
    whyUs: [
      {
        title: 'Africa Edge CDN Speed',
        description: 'Edge-cached in Teraco data centers in Johannesburg and Cape Town for instant cellular speed on MTN and Vodacom.',
      },
    ],
    faq: [
      {
        question: 'Can South African clients pay via EFT in ZAR?',
        answer: 'Yes. Invoices are denominated in ZAR (or USD) with EFT bank transfer and credit card options.',
      },
    ],
  },

  // ── 20. Malaysia ──
  my: {
    slug: 'my',
    countryName: 'Malaysia',
    flag: '🇲🇾',
    currencySymbol: 'RM',
    currencyCode: 'MYR',
    metaTitle: 'Custom Web Design & 7-Day Sprints for Malaysian Businesses | Uncoded Hub',
    metaDescription:
      'High-performance web development for Kuala Lumpur medical tourism, property developers, and tech firms. Delivered in 7 days for RM7,500–RM16,500 MYR.',
    headline: 'Bespoke 7-Day Web Design Sprints for Malaysian Enterprises.',
    subheadline:
      'Skip sluggish local agency delivery. We engineer custom-coded, ultra-fast web platforms for Kuala Lumpur clinics, property developers, and tech innovators in 7 calendar days.',
    complianceBadge: '🇲🇾 PDPA COMPLIANT · KUALA LUMPUR EDGE ROUTED · WHATSAPP EQUIPPED',
    timezoneProtocol:
      'Malaysia (MYT) is 2.5 hours ahead of India, ensuring synchronous working alignment throughout your normal business day.',
    pricing: {
      foundational: 'RM7,500 MYR',
      growth: 'RM11,500 MYR',
      bespoke: 'RM16,500 MYR',
    },
    localComparison: {
      localAgencyRate: 'RM25,000 – RM65,000 MYR',
      localTimeline: '8 to 14 Weeks',
      uncodedHubRate: 'RM7,500 – RM16,500 MYR',
      uncodedHubTimeline: 'Fixed 7 Calendar Days',
      savings: 'Save RM15,000+ MYR with Contractual 7-Day Launch',
    },
    topSectors: [
      {
        name: 'Medical Tourism & Aesthetic Clinics',
        query: 'medical tourism clinic website kuala lumpur',
        summary: 'Multilingual treatment guides, WhatsApp international patient coordinator intake, and procedure menus.',
      },
      {
        name: 'Property Developers & Commercial Real Estate',
        query: 'property developer portal malaysia',
        summary: 'High-res unit visualizers, location masterplan maps, and digital brochure downloads.',
      },
    ],
    whyUs: [
      {
        title: 'WhatsApp Express Integration',
        description: 'Optimized for the Malaysian business culture with context-aware WhatsApp lead capture pre-filling customer inquiries.',
      },
    ],
    faq: [
      {
        question: 'Can Malaysian businesses pay in MYR via DuitNow or wire?',
        answer: 'Yes. Invoices are in MYR or USD with direct bank transfer and credit card options.',
      },
    ],
  },
};
