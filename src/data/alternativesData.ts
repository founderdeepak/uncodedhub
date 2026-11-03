export interface ComparisonRow {
  criterion: string;
  uncodedHub: string;
  competitor: string;
  advantage: 'uncoded' | 'neutral';
}

export interface InDepthPoint {
  title: string;
  description: string;
  stat: string;
}

export interface AlternativeFaq {
  question: string;
  answer: string;
}

export interface AlternativeItem {
  slug: string;
  competitorName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  verdictSummary: string;
  primaryStat: { value: string; label: string };
  matrix: ComparisonRow[];
  points: InDepthPoint[];
  faq: AlternativeFaq[];
}

export const ALTERNATIVES_DATA: Record<string, AlternativeItem> = {
  wordpress: {
    slug: 'wordpress',
    competitorName: 'WordPress & Page Builders (Elementor, Divi)',
    tagline: 'Hand-Coded Architecture vs Monolithic PHP Bloat',
    metaTitle: 'Hand-Coded React vs WordPress Web Design for Small Business | Uncoded Hub',
    metaDescription:
      'Compare custom hand-coded web development vs WordPress. Zero PHP plugin vulnerabilities, sub-second 100/100 Lighthouse speed, and no monthly maintenance retainers.',
    headline: 'Why High-Ticket Businesses Migrate from WordPress to Hand-Coded Sprints.',
    subheadline:
      'WordPress was built in 2003 for blogging. When loaded with 28 plugins, page builders, and shared SQL databases, it collapses on mobile. Here is how hand-coded React and Vite transforms your conversion rate.',
    verdictSummary:
      'If you need a simple personal blog, WordPress is fine. But for a business demanding sub-second speeds, zero monthly maintenance retainers, and bulletproof security, hand-coded engineering delivers a 4x higher ROI within 12 months.',
    primaryStat: {
      value: '0.6s vs 4.8s',
      label: 'Average Mobile Page Load Speed',
    },
    matrix: [
      {
        criterion: 'Mobile Load Speed (LCP)',
        uncodedHub: '⚡ 0.6s to 0.8s (Instant edge cached)',
        competitor: '🐢 3.8s to 6.5s (Heavy PHP execution)',
        advantage: 'uncoded',
      },
      {
        criterion: 'Plugin & Security Maintenance',
        uncodedHub: '🛡️ 0 Plugins, 0 DB vulnerabilities',
        competitor: '⚠️ 20-40 plugins needing weekly updates',
        advantage: 'uncoded',
      },
      {
        criterion: 'Google Core Web Vitals',
        uncodedHub: '🟢 98–100/100 Lighthouse on all devices',
        competitor: '🔴 35–65/100 on real mobile devices',
        advantage: 'uncoded',
      },
      {
        criterion: 'Code Ownership & Portability',
        uncodedHub: '💼 100% clean static assets you own outright',
        competitor: '🔒 Locked into specific WordPress themes & plugins',
        advantage: 'uncoded',
      },
      {
        criterion: 'Ongoing Monthly Cost',
        uncodedHub: '✨ ₹0/mo compulsory maintenance fees',
        competitor: '💸 ₹5,000–₹15,000/mo retainer to fix broken plugins',
        advantage: 'uncoded',
      },
      {
        criterion: 'Hosting Requirements',
        uncodedHub: '🚀 Any free or low-cost CDN (Cloudflare, Vercel)',
        competitor: '🖥️ Expensive dedicated PHP/MySQL servers',
        advantage: 'uncoded',
      },
    ],
    points: [
      {
        title: 'The Plugin Rot Trap',
        description:
          'Every WordPress plugin adds external CSS, JavaScript, and database queries. Eventually, a single plugin update conflicts with your theme, breaking your contact forms or crashing your checkout silently.',
        stat: '94% of web hacks target WordPress plugin exploits',
      },
      {
        title: 'Sub-Second Mobile Execution',
        description:
          'Our hand-coded sites execute pure vanilla HTML5, Tailwind CSS, and optimized React components directly on the browser edge. There is no SQL database query to wait for, resulting in immediate page delivery.',
        stat: '1 second delay drops conversions by 7%',
      },
      {
        title: 'Zero Forced Retainers',
        description:
          'With WordPress, agencies charge ₹10,000 every month just to click "update" on plugins and backup your database. With Uncoded Hub, once your site is deployed, it remains fast, stable, and immune to decay.',
        stat: 'Save ₹1.2L+ annually on redundant maintenance',
      },
    ],
    faq: [
      {
        question: 'Can I still edit my content without WordPress?',
        answer:
          'Yes. We configure lightweight headless content files (Markdown or Supabase) or provide a simple git-backed workflow where updating text or images takes seconds, without slowing down the site.',
      },
      {
        question: 'Can you migrate my existing WordPress website to custom code?',
        answer:
          'Yes. We preserve your existing URLs, 301 redirects, and SEO rankings while completely rebuilding the front-end to achieve 100/100 Core Web Vitals in a 7-day sprint.',
      },
    ],
  },

  'wix-squarespace': {
    slug: 'wix-squarespace',
    competitorName: 'Squarespace, Wix & Webflow',
    tagline: 'Custom Code vs Drag-and-Drop Template Builders',
    metaTitle: 'Custom Web Design vs Squarespace & Wix: The SEO & Speed Guide | Uncoded Hub',
    metaDescription:
      'Why high-ticket service businesses switch from Squarespace and Wix to custom code. Overcome poor Core Web Vitals, limited local schema markup, and design lock-in.',
    headline: 'Why Growing Practices Outgrow Squarespace and Wix.',
    subheadline:
      'Website builders are great for hobbyists. But when you are competing for high-value clients who judge your credibility in 3 seconds, proprietary builder code holds you back.',
    verdictSummary:
      'Wix and Squarespace charge recurring monthly subscription fees while serving thousands of lines of bloated JavaScript that hurt your organic search rankings. Custom code offers total design freedom, sub-second speed, and permanent asset ownership.',
    primaryStat: {
      value: '100% vs 0%',
      label: 'True Code Portability & Ownership',
    },
    matrix: [
      {
        criterion: 'Page Architecture & DOM Cleanliness',
        uncodedHub: '⚡ Semantic, clean HTML5 parsed instantly',
        competitor: '🐢 Heavily nested div soup and runtime JS',
        advantage: 'uncoded',
      },
      {
        criterion: 'Local SEO & Schema Markup Control',
        uncodedHub: '🟢 100% custom JSON-LD (Physician, Legal, Service)',
        competitor: '⚠️ Generic templates with restricted schema customization',
        advantage: 'uncoded',
      },
      {
        criterion: 'Subscription Lock-in',
        uncodedHub: '✨ ₹0 platform subscription lock-in',
        competitor: '🔒 Recurring monthly fees forever; export is impossible',
        advantage: 'uncoded',
      },
      {
        criterion: 'Design Uniqueness',
        uncodedHub: '🎨 Bespoke visual identity crafted for your brand',
        competitor: '📋 Recognized templates used by thousands of competitors',
        advantage: 'uncoded',
      },
      {
        criterion: 'Form & Booking Flexibility',
        uncodedHub: '📱 Direct WhatsApp, Supabase, or Custom CRM API',
        competitor: '⚠️ Limited to proprietary widgets or expensive app store add-ons',
        advantage: 'uncoded',
      },
    ],
    points: [
      {
        title: 'The Proprietary Wall',
        description:
          'When you build on Wix or Squarespace, you do not own your website. You cannot download your code and host it elsewhere. If you ever leave their platform, your entire website must be rebuilt from scratch.',
        stat: 'Zero export options on proprietary builders',
      },
      {
        title: 'Mobile Performance Penalty',
        description:
          'Builders must load their entire visual editor library on every page visit just to render a button. This inflates bundle size above 2.5MB on mobile phones, failing Google’s Core Web Vitals thresholds.',
        stat: 'Failing Core Web Vitals degrades Google mobile rankings',
      },
      {
        title: 'Tailored Conversion Funnels',
        description:
          'Instead of clunky multi-step popups and third-party iframe calendars, we build custom single-tap WhatsApp booking flows and interactive price calculators that match the exact way your clients buy.',
        stat: '3x higher form completion on custom native inputs',
      },
    ],
    faq: [
      {
        question: 'Is Squarespace not good enough for SEO?',
        answer:
          'Squarespace can rank for low-competition branded terms. But for competitive local commercial queries (e.g. "custom dental clinic Indiranagar"), its slow server response time and bloated client-side JavaScript put you at an algorithmic disadvantage.',
      },
      {
        question: 'Do I have to pay hosting fees if I switch to Uncoded Hub?',
        answer:
          'No. Static hand-coded websites can be hosted for virtually free on global CDNs like Cloudflare Pages or GitHub Pages with global SSL and DDOS protection included.',
      },
    ],
  },

  'traditional-agencies': {
    slug: 'traditional-agencies',
    competitorName: 'Traditional Digital Agencies',
    tagline: '7-Day Senior Founder Sprint vs 12-Week Agency Bureaucracy',
    metaTitle: '7-Day Web Design Sprint vs Traditional Digital Agencies | Uncoded Hub',
    metaDescription:
      'Compare Uncoded Hub’s 7-day transparent web sprint vs traditional 12-week design agency retainers. Direct founder access, fixed pricing, zero bureaucracy.',
    headline: 'Eliminate the 3-Month Agency Drag. Ship in 7 Days.',
    subheadline:
      'Traditional agencies assign junior designers, hide behind account managers, and charge ₹2 Lakh retainers for bloated deliverables. We operate as senior engineer-founders delivering production-ready platforms in 7 business days.',
    verdictSummary:
      'Traditional agencies spend weeks on slide decks, discovery questionnaires, and account management meetings. We eliminate bureaucratic overhead: you work directly with Deepak and Geetha to build and launch your high-converting platform in one 7-day sprint.',
    primaryStat: {
      value: '7 Days vs 90 Days',
      label: 'Average Time from Deposit to Live Launch',
    },
    matrix: [
      {
        criterion: 'Project Timeline',
        uncodedHub: '⚡ Fixed 7 business days from start to launch',
        competitor: '🐢 8 to 16 weeks of endless review rounds',
        advantage: 'uncoded',
      },
      {
        criterion: 'Who Actually Builds Your Site',
        uncodedHub: '👨‍💻 Senior Founders (Deepak & Geetha) directly',
        competitor: '👤 Junior interns or outsourced freelance sub-contractors',
        advantage: 'uncoded',
      },
      {
        criterion: 'Pricing Transparency',
        uncodedHub: '🏷️ Fixed scope: ₹35k, ₹45k, or ₹85k (Zero surprises)',
        competitor: '❓ Open-ended hourly retainers and "scope creep" change fees',
        advantage: 'uncoded',
      },
      {
        criterion: 'Code Quality',
        uncodedHub: '💎 Hand-crafted React, Vite, and Semantic HTML',
        competitor: '⚠️ Bloated WordPress theme or off-the-shelf theme forest template',
        advantage: 'uncoded',
      },
      {
        criterion: 'Communication Channel',
        uncodedHub: '💬 Direct WhatsApp and Loom updates daily',
        competitor: '📧 Formal email tickets routed through account managers',
        advantage: 'uncoded',
      },
    ],
    points: [
      {
        title: 'Zero Account Manager Overhead',
        description:
          'At a typical agency, 50% of your fee pays for project managers, account coordinators, and overhead. At Uncoded Hub, every rupee goes directly into engineering, conversion copy, and visual craftsmanship.',
        stat: '0 intermediaries between you and the lead engineer',
      },
      {
        title: 'Guaranteed 7-Day Sprint Commitment',
        description:
          'We take on only 2 clients per sprint window. This ensures 100% of our focus is dedicated to shipping your production website in 7 days, backed by our penalty-guaranteed delivery commitment.',
        stat: '100% on-time delivery record across all client sprints',
      },
      {
        title: 'Permanent Sovereign Code Ownership',
        description:
          'Traditional agencies hold your domain or CMS hostage with complex maintenance agreements. We hand over the complete GitHub repository and deploy it to your own sovereign hosting on day 7.',
        stat: 'You own 100% of code, domain, and assets on handover',
      },
    ],
    faq: [
      {
        question: 'How can you deliver a custom website in just 7 days?',
        answer:
          'We do not start from scratch or write boilerplate code. We have engineered a rock-solid, component-driven design system. We focus 100% of our time on your unique copy, conversion angles, and high-performance design.',
      },
      {
        question: 'What do you need from me before the sprint starts?',
        answer:
          'Just your brand assets (logo, high-res photos if available) and 45 minutes on an onboarding call. We handle all copywriting, architectural wireframing, development, and deployment.',
      },
    ],
  },
};

