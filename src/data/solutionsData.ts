export interface SolutionProblemCheck {
  symptom: string;
  cause: string;
  cure: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
  deliverable: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionItem {
  slug: string;
  badge: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  verdictSummary: string;
  stat: { value: string; label: string };
  diagnosticTitle: string;
  diagnostics: SolutionProblemCheck[];
  features: SolutionFeature[];
  faq: SolutionFaq[];
}

export const SOLUTIONS_DATA: Record<string, SolutionItem> = {
  'website-redesign': {
    slug: 'website-redesign',
    badge: '⚡ OUTDATED WEBSITE MODERNIZATION SPRINT',
    targetKeyword: 'website redesign services',
    metaTitle: 'Website Redesign Services for Outdated Business Websites | Uncoded Hub',
    metaDescription:
      'Professional website redesign services for businesses with outdated sites. Transform slow, broken WordPress sites into sub-second, high-converting platforms in 7 days.',
    headline: 'Redesign Your Outdated Website Into a Sub-Second Conversion Engine.',
    subheadline:
      'Your website is the first place high-ticket prospects look to verify your credibility. If it takes 5 seconds to load or looks stuck in 2019, you are silently losing your best clients to competitors.',
    verdictSummary:
      'A successful website redesign is not just a cosmetic visual coat of paint. We rebuild your architecture from the ground up in modern React and semantic HTML, eliminating plugin debt while preserving 100% of your existing Google rankings and backlink authority.',
    stat: {
      value: '7 Days',
      label: 'Complete Turnkey Redesign Sprint',
    },
    diagnosticTitle: 'Signs Your Current Website Needs Immediate Modernization',
    diagnostics: [
      {
        symptom: 'Page takes more than 3 seconds to load on mobile data.',
        cause: 'Bloated page builder templates (Elementor/Divi) executing megabytes of redundant CSS/JS.',
        cure: 'Hand-coded Vite + Tailwind architecture loading in under 0.8 seconds on 4G.',
      },
      {
        symptom: 'Contact forms occasionally fail or send spam submissions.',
        cause: 'Unmaintained PHP plugins conflicting with server versions or lacking native honeypots.',
        cure: 'Serverless edge forms with direct WhatsApp dispatch and cryptographic spam shields.',
      },
      {
        symptom: 'You hesitate to share your website link with high-value prospects.',
        cause: 'Visual identity no longer reflects the premium quality or scale of your actual services.',
        cure: 'Bespoke editorial typography, verified case studies, and modern interactive proof blocks.',
      },
    ],
    features: [
      {
        title: 'Zero SEO Ranking Drop (1:1 Redirect Preservation)',
        description:
          'We map every existing URL to its exact new equivalent with 301 permanent redirects, preserving all domain authority, historical backlinks, and Google search positions.',
        deliverable: 'Complete 301 redirect map & Search Console audit',
      },
      {
        title: '100/100 Core Web Vitals Overhaul',
        description:
          'Eliminate Cumulative Layout Shift (CLS), optimize Largest Contentful Paint (LCP) below 1 second, and achieve perfect green scores across all Google Lighthouse metrics.',
        deliverable: 'Performance audit guarantee report',
      },
      {
        title: 'Mobile-First Conversion UX',
        description:
          'Over 75% of your buyers research on their phones. We engineer sticky mobile drawers, thumb-friendly tap targets, and frictionless consultation scheduling.',
        deliverable: 'Custom responsive design system',
      },
    ],
    faq: [
      {
        question: 'Will I lose my existing Google rankings during a redesign?',
        answer:
          'No. When executed correctly, a redesign actually increases rankings. We perform a strict 1:1 URL and metadata audit, maintain your exact heading hierarchy, and improve page speed, which Google actively rewards with higher crawl frequency.',
      },
      {
        question: 'Can you migrate my existing blog posts or portfolio projects?',
        answer:
          'Yes. We export your historical content and port it cleanly into fast Markdown or structured headless CMS format, stripping out legacy styling bloat in the process.',
      },
    ],
  },

  'lead-generation-websites': {
    slug: 'lead-generation-websites',
    badge: '⚡ CONVERSION ARCHITECTURE & INQUIRY INFLOW',
    targetKeyword: 'website design for lead generation',
    metaTitle: 'Conversion-Focused Website Design for Lead Generation | Uncoded Hub',
    metaDescription:
      'High-converting website design for lead generation. Fix websites not generating leads with multi-step qualification funnels, WhatsApp booking, and sub-second speed.',
    headline: 'Turn Unproductive Web Traffic Into High-Intent Client Inquiries.',
    subheadline:
      'Getting traffic is useless if visitors leave without contacting you. We engineer lead-generation websites that filter tire-kickers and guide serious buyers directly into booked calls.',
    verdictSummary:
      'If your website is not generating leads, the problem is rarely your pricing. It is usually cognitive friction: hidden contact forms, slow mobile loading, and zero upfront scope clarity. We solve this with clear value transparency and direct 1-tap engagement paths.',
    stat: {
      value: '3.4x',
      label: 'Average Inquiry Conversion Lift',
    },
    diagnosticTitle: 'Why 90% of Business Websites Fail to Generate Inquiries',
    diagnostics: [
      {
        symptom: 'High visitor count in Google Analytics, but zero inquiries.',
        cause: 'Generic "Contact Us" page with 8 intimidating text fields that visitors abandon.',
        cure: 'Low-friction 2-step qualification funnel or 1-tap WhatsApp consultation launch.',
      },
      {
        symptom: 'Inquiries that do arrive ask for unrealistic discounts.',
        cause: 'No upfront price guidance or scope transparency, attracting low-budget browsers.',
        cure: 'Interactive price estimator and deliverables matrix that pre-qualifies budgets.',
      },
      {
        symptom: 'Prospects say "I will think about it" and disappear.',
        cause: 'Lack of tangible proof, testimonials, and verified technical credentials on-page.',
        cure: 'Before/after sliders, client video proof, and verified trust guarantees.',
      },
    ],
    features: [
      {
        title: 'Frictionless 1-Tap WhatsApp Consultation Engine',
        description:
          'Pre-populate intelligent WhatsApp messages tailored to the exact service page the prospect was viewing, closing the gap between search and conversation.',
        deliverable: 'Context-aware WhatsApp routing engine',
      },
      {
        title: 'Interactive Scope & Investment Estimator',
        description:
          'Let serious prospects calculate an estimated project scope in 3 clicks. Educates the client on costs while collecting qualified requirements before the first call.',
        deliverable: 'Custom interactive pricing calculator',
      },
      {
        title: 'Sticky Mobile Conversion Drawer',
        description:
          'An omnipresent, non-intrusive bottom drawer displaying current availability and instant booking options, keeping the call-to-action within thumb reach at all times.',
        deliverable: 'High-visibility mobile action drawer',
      },
    ],
    faq: [
      {
        question: 'How do you prevent spam leads from cluttering my inbox?',
        answer:
          'We implement multi-stage honeypot fields, time-delay submission analysis, and intelligent input screening without annoying visitors with intrusive CAPTCHA puzzles.',
      },
      {
        question: 'Does lead generation design work for luxury and high-ticket services?',
        answer:
          'Yes, especially for luxury and high-ticket services. High-net-worth clients value their time above all else. Clear scope, immediate speed, and seamless scheduling signal institutional credibility.',
      },
    ],
  },

  'booking-websites': {
    slug: 'booking-websites',
    badge: '⚡ DIRECT APPOINTMENT BOOKING ARCHITECTURE',
    targetKeyword: 'website design with booking functionality',
    metaTitle: 'Appointment Booking Website Development for Businesses | Uncoded Hub',
    metaDescription:
      'Custom website design with appointment booking functionality. Real-time slot management, WhatsApp confirmation, and zero third-party iframe friction.',
    headline: 'Websites With Native Booking That Fill Your Calendar Automatically.',
    subheadline:
      'Eliminate phone tag, missed calls, and double-booking. We build bespoke booking websites for clinics, wellness studios, consultants, and contractors that let clients reserve slots in 30 seconds.',
    verdictSummary:
      'Most booking widgets are ugly third-party iframes (like generic Calendly embeds) that take 4 seconds to load and crash on mobile. We build seamless, native booking workflows directly into your website with instant Google Calendar sync and automated WhatsApp reminders.',
    stat: {
      value: '30s',
      label: 'Average Booking Completion Time',
    },
    diagnosticTitle: 'The Fatal Flaws of Generic Booking Plugins & Iframes',
    diagnostics: [
      {
        symptom: 'Booking calendar takes 4+ seconds to appear on screen.',
        cause: 'Third-party script loading heavy tracking libraries and external styling.',
        cure: 'Native lightweight UI components integrated directly into the front-end code.',
      },
      {
        symptom: 'High booking abandonment rate halfway through the date selector.',
        cause: 'Forced account registration, confusing timezone selectors, or clunky date pickers.',
        cure: 'Clean 3-step slot picker with auto-detected timezone and phone-only authentication.',
      },
      {
        symptom: 'Patients or clients forget appointments, causing no-shows.',
        cause: 'Confirmation emails land in the spam folder without instant chat follow-up.',
        cure: 'Automated instant WhatsApp confirmation and Google Calendar invite generation.',
      },
    ],
    features: [
      {
        title: 'Native Slot Picker (Zero Third-Party Iframes)',
        description:
          'Render available consultation dates and service slots instantly inside the page layout without external redirects or slow widget popups.',
        deliverable: 'Bespoke appointment calendar module',
      },
      {
        title: 'Automated WhatsApp & Calendar Confirmation',
        description:
          'Instantly generate an "Add to Google Calendar / Apple Calendar" pass and trigger an automated WhatsApp confirmation message to the client.',
        deliverable: 'Multi-channel appointment dispatch system',
      },
      {
        title: 'Service-Specific Deposit & Payment Gates',
        description:
          'Optional integration with Razorpay, Stripe, or UPI for businesses requiring an upfront consultation fee or booking advance to eliminate no-shows.',
        deliverable: 'Secure checkout & deposit gateway',
      },
    ],
    faq: [
      {
        question: 'Can this sync with my existing Google Calendar or Outlook?',
        answer:
          'Yes. We synchronize appointment slots with your Google Calendar, Outlook, or practice management system via webhook APIs so you never get double-booked.',
      },
      {
        question: 'Can different staff members have their own booking schedules?',
        answer:
          'Yes. We support multi-specialist routing (e.g., choosing Doctor A vs Doctor B, or Trainer 1 vs Trainer 2) with individual operational hours and buffer times.',
      },
    ],
  },

  'high-converting-landing-pages': {
    slug: 'high-converting-landing-pages',
    badge: '⚡ PERFORMANCE ADS & CAMPAIGN CONVERSION PLATFORM',
    targetKeyword: 'high converting landing page design',
    metaTitle: 'High Converting Landing Page Design for Paid Campaigns | Uncoded Hub',
    metaDescription:
      'High converting landing page design engineered for Google Ads and Meta campaigns. 0.6s mobile load speed, 100/100 Quality Score, and high-margin conversion copy.',
    headline: 'High-Converting Landing Pages Engineered to Lower Your Ad Spend.',
    subheadline:
      'When you are spending ₹50,000 to ₹5,00,000 monthly on Google Ads or Meta, every second of load lag burns real money. We engineer sub-second landing pages that maximize Quality Scores and ROI.',
    verdictSummary:
      'A landing page built on WordPress or ClickFunnels often loads in 4 to 6 seconds on mobile, driving up your Google Ads Cost Per Click (CPC) and causing 50%+ of paid clicks to bounce before seeing your offer. Our hand-coded landing pages load in 0.6 seconds, delivering maximum Quality Scores and immediate conversion.',
    stat: {
      value: '0.6s',
      label: 'Average Mobile Load Time on Paid Clicks',
    },
    diagnosticTitle: 'Why Your Paid Ad Campaigns Are Burning Cash',
    diagnostics: [
      {
        symptom: 'High Cost-Per-Click (CPC) and poor Google Ads Quality Scores.',
        cause: 'Landing page fails Google Core Web Vitals and has poor mobile page experience metrics.',
        cure: '100/100 Lighthouse performance landing page with instant above-the-fold delivery.',
      },
      {
        symptom: '50%+ bounce rate from Instagram and Facebook ad traffic.',
        cause: 'Page takes 4 seconds to open inside in-app web views (Instagram/FB browsers).',
        cure: 'Zero external script bloat, inline critical styles, and instant rendering in in-app browsers.',
      },
      {
        symptom: 'Visitors get distracted by menus and leave without converting.',
        cause: 'Landing page has standard navigation links and external social media distractions.',
        cure: 'Strict standalone single-offer layout with isolated conversion pathways.',
      },
    ],
    features: [
      {
        title: 'Sub-Second In-App Browser Acceleration',
        description:
          'Engineered specifically to render instantaneously inside Instagram, Facebook, and LinkedIn in-app browsers where 80% of social ad traffic lands.',
        deliverable: 'In-app browser optimized build',
      },
      {
        title: 'Scientific Objection-Handling Layout',
        description:
          'A proven visual hierarchy: Hero offer, immediate value proposition, social proof logos, interactive calculation, objection handling, and persistent CTA.',
        deliverable: 'High-conversion copy & visual wireframe',
      },
      {
        title: 'Native Pixel & Server-Side Event Tracking',
        description:
          'Configure Meta Conversions API (CAPI) and Google Ads enhanced conversion tracking to bypass browser ad-blockers and iOS privacy restrictions with 100% accuracy.',
        deliverable: 'Full conversion tracking setup',
      },
    ],
    faq: [
      {
        question: 'Can you build a landing page for our active Google Ads campaign in 7 days?',
        answer:
          'Yes. Our 7-day sprint includes copy review, high-performance hand-coded development, tracking pixel verification, and live deployment on your custom domain.',
      },
      {
        question: 'Can we A/B test different headlines or offers?',
        answer:
          'Yes. Because our code is modular, we can spin up variant URLs (e.g. `/offer-a/` and `/offer-b/`) with zero maintenance overhead for clean split testing.',
      },
    ],
  },
};

