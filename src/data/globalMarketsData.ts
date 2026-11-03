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
  us: {
    slug: 'us',
    countryName: 'United States',
    flag: '🇺🇸',
    currencySymbol: '$',
    currencyCode: 'USD',
    metaTitle: 'Custom Web Design & 7-Day Sprints for US Businesses | Uncoded Hub',
    metaDescription:
      'Hand-coded custom web development for US private practices, clinics, and studios. Sub-second speed, ADA & HIPAA compliant, delivered in 7 days for $1,800–$3,500.',
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
      localAgencyRate: '$12,000 – $25,000',
      localTimeline: '10 to 16 Weeks',
      uncodedHubRate: '$1,800 – $3,500',
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
          'We invoice via Stripe in USD ($). You can pay seamlessly using any US business credit card, ACH bank transfer, or wire transfer with instant tax-compliant invoicing.',
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

  uk: {
    slug: 'uk',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    currencySymbol: '£',
    currencyCode: 'GBP',
    metaTitle: 'Bespoke Web Design & 7-Day Sprints for UK Businesses | Uncoded Hub',
    metaDescription:
      'Hand-crafted custom web development for UK private clinics, solicitors, and architects. Sub-second speed, GDPR-compliant, delivered in 7 days for £1,500–£2,800.',
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
      localAgencyRate: '£8,000 – £18,000',
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
        summary: 'FCA/SRA compliant presentation, partner profiles, and high-trust fee transparency.',
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
          'Because our hand-coded platforms contain 0 third-party tracking scripts or surveillance bloat, your UK visitors experience pure, uninterrupted page speed without cookie modal popups.',
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
          'Yes. We accept UK bank transfers (BACS/Faster Payments) via Wise and major credit cards via Stripe, denominated in GBP (£) with VAT-compliant invoicing.',
      },
      {
        question: 'What is the working hour overlap with the UK?',
        answer:
          'India is just 4.5 hours ahead of GMT (or 3.5 hours during British Summer Time). Our afternoons directly mirror your UK morning working hours, ensuring swift real-time Slack/WhatsApp communication.',
      },
    ],
  },

  uae: {
    slug: 'uae',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    currencySymbol: 'AED',
    currencyCode: 'AED',
    metaTitle: 'Luxury Web Design & 7-Day Sprints in Dubai & UAE | Uncoded Hub',
    metaDescription:
      'High-performance luxury web development for Dubai and UAE real estate, aesthetic clinics, and elite family offices. Direct WhatsApp booking, delivered in 7 days for 6,500–12,000 AED.',
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
      {
        name: 'Luxury Concierge & High-End Events',
        query: 'luxury event planner website design uae',
        summary: 'Avant-garde styling, private RSVP portals, and sensory visual presentation.',
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
      {
        title: 'Zero WordPress Lag on Gulf 5G Networks',
        description:
          'Dubai has the world’s fastest mobile networks; an unoptimized, 4-second WordPress site feels broken to local users. Our sites load in under 0.6 seconds.',
      },
    ],
    faq: [
      {
        question: 'Can UAE businesses pay locally?',
        answer:
          'Yes. We accept international corporate wire transfers, Stripe credit cards, and Wise transfers in AED with formal business invoices.',
      },
      {
        question: 'Do you build bilingual English and Arabic websites?',
        answer:
          'Yes. We support RTL (Right-to-Left) Arabic layouts alongside English with seamless language toggle and dedicated localized SEO tags.',
      },
    ],
  },

  au: {
    slug: 'au',
    countryName: 'Australia',
    flag: '🇦🇺',
    currencySymbol: '$',
    currencyCode: 'AUD',
    metaTitle: 'Custom Web Design & 7-Day Sprints for Australian Businesses | Uncoded Hub',
    metaDescription:
      'Hand-coded bespoke web design for Australian practices, builders, and studios in Sydney, Melbourne, and Brisbane. 0.6s speed, delivered in 7 days for $2,500–$4,500 AUD.',
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
      localAgencyRate: '$10,000 – $22,000 AUD',
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
      {
        name: 'Professional Advisory & Wealth Firms',
        query: 'financial advisory website design brisbane',
        summary: 'ASIC-compliant presentation, fee transparency, and high-ticket client intake.',
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
      {
        title: 'Fixed Pricing Guarantee',
        description:
          'No unexpected hourly invoices or surprise maintenance charges. Your 7-day sprint scope is 100% fixed.',
      },
    ],
    faq: [
      {
        question: 'Can Australian clients pay in AUD?',
        answer:
          'Yes. Invoicing is processed directly in Australian Dollars (AUD) via Stripe or international bank transfer.',
      },
      {
        question: 'Who will I actually communicate with during the sprint?',
        answer:
          'You work directly with Deepak (technical founder) and Geetha (conversion strategist). We do not assign junior account managers or outsource code.',
      },
    ],
  },
};

