import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';

/* ═══════════════════════════════════════════════════════════════════
   FREQUENTLY ASKED QUESTIONS (28 DETAILED ANSWERS)
   Cloaked-style editorial UI with live category filter & search
   ═══════════════════════════════════════════════════════════════════ */

interface FaqItem {
  id: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  /* Category 1: Sprint & Timeline (5) */
  {
    id: 'sprint-how-7-days',
    category: 'sprint',
    categoryLabel: 'SPRINT · TIMELINE',
    question: 'How can a custom business website truly be designed and built in just 7 days?',
    answer: [
      'Most web agencies take 8 to 16 weeks not because building a high-performing site takes 500 hours, but because projects get bogged down in endless email chains, middle-manager approvals, and fragmented junior teams juggling dozens of accounts simultaneously.',
      'At Uncoded Hub, you work directly with founders Deepak (engineering) and Geetha (design). We book only two sprint cohorts per month. During your 7-day sprint window, your project receives our dedicated, uninterrupted focus with zero agency bureaucracy.',
    ],
  },
  {
    id: 'sprint-day-by-day',
    category: 'sprint',
    categoryLabel: 'SPRINT · PROCESS',
    question: 'What exact day-by-day milestones happen during the 7 days?',
    answer: [
      'Day 1: Kickoff call, brand asset audit, architecture map, and high-fidelity homepage layout direction.',
      'Day 2: Full interactive UI design approval, typography pairing, and design system lockup.',
      'Day 3: Clean semantic frontend component development and responsive layout architecture.',
      'Day 4: Content population, typography refinement, interactive components, and lead funnel assembly.',
      'Day 5: Form routing, CRM/WhatsApp hooks, database configuration, and technical integrations.',
      'Day 6: Deep performance benchmarking (Core Web Vitals, 95+ Lighthouse score), cross-browser audits, and on-page SEO schema verification.',
      'Day 7: Final staging walkthrough, revision touch-ups, production deployment, and domain DNS switchover.',
    ],
  },
  {
    id: 'sprint-client-prerequisites',
    category: 'sprint',
    categoryLabel: 'SPRINT · PREREQUISITES',
    question: 'What do I need to provide before Day 1 begins?',
    answer: [
      'To guarantee delivery within 7 calendar days, we complete a pre-sprint checklist before your scheduled kickoff date. This includes your vector logo, brand guidelines or preferred color palette, high-resolution photography or project portfolio images, key text copy (or bulleted outlines we refine together), and domain registrar access.',
      'Once this asset pack is confirmed in our shared portal, your sprint date is officially locked and the 7-day clock begins.',
    ],
  },
  {
    id: 'sprint-revisions',
    category: 'sprint',
    categoryLabel: 'SPRINT · REVISIONS',
    question: 'Can we request revisions during the 7-day sprint?',
    answer: [
      'Yes. Revisions are baked directly into the sprint workflow. On Day 2 you review and approve the design system and editorial aesthetics; on Day 5 and 6 you test the fully interactive staging build.',
      'Because you communicate directly with Geetha and Deepak via a private Slack or WhatsApp channel with real-time feedback cycles, adjustments happen in minutes rather than days.',
    ],
  },
  {
    id: 'sprint-client-delay',
    category: 'sprint',
    categoryLabel: 'SPRINT · ACCOUNTABILITY',
    question: 'What happens if our team is slow to provide feedback during the sprint?',
    answer: [
      'The 7-day timeline relies on same-day client feedback at key milestone gates (specifically Design Approval on Day 2 and Staging Review on Day 6).',
      'If your internal team requires additional days to gather stakeholder signoffs or supply missing content, the sprint timer simply pauses and resumes immediately once feedback is submitted.',
    ],
  },

  /* Category 2: Pricing & Guarantee (5) */
  {
    id: 'pricing-cost',
    category: 'pricing',
    categoryLabel: 'PRICING · TRANSPARENCY',
    question: 'How much does a typical 7-day custom website build cost?',
    answer: [
      'We quote fixed, transparent project fees based on your specific scope sheet during our initial 20-minute discovery call with Deepak & Geetha.',
      'Unlike traditional agencies that quote open-ended hourly billing or charge surprise invoices for every revision, our proposal specifies a single fixed price that includes custom design, clean frontend development, performance tuning, on-page SEO groundwork, and 30 days of warranty.',
    ],
  },
  {
    id: 'pricing-guarantee-details',
    category: 'pricing',
    categoryLabel: 'GUARANTEE · ACCOUNTABILITY',
    question: 'How does the 50% "Late Means Free" Delivery Guarantee actually work?',
    answer: [
      'Our guarantee is simple, contractual, and published in full in our Terms of Service.',
      'If Uncoded Hub fails to deliver your fully functional staging website within seven working days due to our own delay, we instantly discount 50% off your final invoice. We put our own revenue on the line to prove our commitment to execution discipline.',
    ],
  },
  {
    id: 'pricing-hidden-fees',
    category: 'pricing',
    categoryLabel: 'PRICING · NO SURPRISES',
    question: 'Are there any hidden fees, monthly retainer lock-ins, or surprise hosting markups?',
    answer: [
      'None. Zero monthly lock-in, zero proprietary platform fees, and zero hosting markups. You pay only the agreed project fee.',
      'You host your website directly on your own infrastructure (Hostinger, Cloudflare, Vercel, or AWS) where standard hosting costs typically range from $3 to $10/month directly to the provider. You maintain complete direct billing control.',
    ],
  },
  {
    id: 'pricing-milestone-schedule',
    category: 'pricing',
    categoryLabel: 'PAYMENTS · MILESTONES',
    question: 'What is your payment milestone structure?',
    answer: [
      'We work on a straightforward 50/50 milestone model:',
      '• 50% reservation deposit upon signing the scope sheet to reserve your dedicated 7-day sprint cohort.',
      '• 50% final balance upon completion of staging review, prior to public DNS switchover or source code repository transfer.',
    ],
  },
  {
    id: 'pricing-refunds',
    category: 'pricing',
    categoryLabel: 'PAYMENTS · REFUNDS',
    question: 'Do you offer refunds if we change our mind before work starts?',
    answer: [
      'Because we strictly reserve two sprints per month and turn away other clients for your scheduled calendar slot, reservation deposits are non-refundable once sprint onboarding and asset preparation begin.',
      'However, if you notify us at least 10 business days before your scheduled kickoff date, you may reschedule your sprint cohort to any available opening within 90 days at zero penalty.',
    ],
  },

  /* Category 3: Design & Aesthetics (5) */
  {
    id: 'design-no-templates',
    category: 'design',
    categoryLabel: 'DESIGN · BESPOKE',
    question: 'Do you use pre-made WordPress or Webflow templates?',
    answer: [
      'Never. Every single Uncoded Hub website is designed bespoke by Geetha from an empty canvas, crafted specifically around your business narrative, your high-value offerings, and your target clientele.',
      'We deliberately avoid generic template tropes — like floating stock photos, meaningless placeholder illustrations, and chaotic multi-colored buttons — in favor of calm, high-contrast editorial typography, architectural hierarchy, and squircle bento structure.',
    ],
  },
  {
    id: 'design-brand-guidelines',
    category: 'design',
    categoryLabel: 'DESIGN · IDENTITY',
    question: 'Can you match or elevate our existing brand identity and guidelines?',
    answer: [
      'Yes. If you already have established brand guidelines, typography standards, or color palettes, we follow them rigorously while elevating them into modern, responsive digital design tokens.',
      'If you do not have an established design system, Geetha will curate a refined typographic hierarchy and tailored color palette suited to your industry authority.',
    ],
  },
  {
    id: 'design-responsive',
    category: 'design',
    categoryLabel: 'DESIGN · RESPONSIVE',
    question: 'How do you ensure the website looks great on mobile, tablet, and ultra-wide screens?',
    answer: [
      'Every layout is engineered mobile-first with adaptive fluid typography and proportional rem spacing. We test across physical iPhones, Android devices, iPads, laptops, and 4K displays.',
      'Navigation drawers, touch targets, legible font sizes, and image aspect ratios are optimized so mobile visitors experience an app-quality, effortless browsing flow.',
    ],
  },
  {
    id: 'design-preview-approval',
    category: 'design',
    categoryLabel: 'DESIGN · APPROVALS',
    question: 'Can we see a live design preview before the code is finalized?',
    answer: [
      'Yes. On Day 2 of your sprint, you receive high-fidelity interactive design previews of key hero lockups, typography scales, and core sections before full code assembly.',
      'This guarantees you have complete visual alignment early in the week before deep frontend engineering proceeds.',
    ],
  },
  {
    id: 'design-editorial-advantage',
    category: 'design',
    categoryLabel: 'DESIGN · CONVERSION',
    question: 'What makes your editorial Cloaked-style aesthetics convert better than traditional corporate sites?',
    answer: [
      'Modern high-ticket buyers are fatigued by flashy, cartoonish marketing templates with generic stock photography. Clean editorial design communicates quiet confidence, institutional trust, and prestige.',
      'By using disciplined black/white contrast, tactile paper surfaces, generous whitespace, and sharp micro-copy, your website signals immediate authority that justifies premium pricing.',
    ],
  },

  /* Category 4: Technology & Performance (5) */
  {
    id: 'tech-stack-why-not-wordpress',
    category: 'tech',
    categoryLabel: 'TECH · ARCHITECTURE',
    question: 'What technology stack do you build with, and why not WordPress?',
    answer: [
      'We build with modern React 19, TypeScript, Vite, and clean Vanilla Tailwind CSS tokens, rendered as prerendered static HTML.',
      'Unlike WordPress, which requires 30+ plugins that frequently conflict, run slow SQL queries on every page load, and create recurring security vulnerabilities, our static architecture has zero server-side database bottlenecks, loads in under a second, and cannot be hacked through PHP exploits.',
    ],
  },
  {
    id: 'tech-lighthouse-scores',
    category: 'tech',
    categoryLabel: 'TECH · PERFORMANCE',
    question: 'Why does Uncoded Hub achieve 95–100/100 Google Lighthouse scores?',
    answer: [
      'We achieve near-perfect performance scores because every asset is strictly engineered: zero render-blocking third-party scripts, self-hosted next-gen WOFF2 fonts with unicode subsets, responsive WebP images with explicit width/height dimensions, and prerendered static HTML that paints instantaneously on the first TCP packet.',
    ],
  },
  {
    id: 'tech-hosting-options',
    category: 'tech',
    categoryLabel: 'TECH · HOSTING',
    question: 'Where is the website hosted, and what are the ongoing server costs?',
    answer: [
      'Because our sites compile to pure static HTML/CSS/JS, they can run on any modern web host: Hostinger, Cloudflare Pages, Vercel, Netlify, or Apache/Nginx web servers.',
      'Ongoing hosting costs are negligible — typically $0 (on Cloudflare Pages or Vercel hobby tiers) or $2 to $5/month on Hostinger shared premium hosting.',
    ],
  },
  {
    id: 'tech-integrations',
    category: 'tech',
    categoryLabel: 'TECH · INTEGRATIONS',
    question: 'Can you integrate custom third-party tools like CRM, Calendly, WhatsApp, or analytics?',
    answer: [
      'Yes. We seamlessly connect Calendly/Cal.com booking widgets, direct WhatsApp click-to-chat triggers, Supabase or Airtable lead capture tables, Google Analytics 4 (deferred to preserve 100/100 Lighthouse), and custom webhook endpoints for HubSpot, Make.com, or Zapier.',
    ],
  },
  {
    id: 'tech-accessibility',
    category: 'tech',
    categoryLabel: 'TECH · ACCESSIBILITY',
    question: 'Is the website accessible (WCAG compliant) and responsive?',
    answer: [
      'Yes. We adhere to WCAG 2.1 AA standards: high contrast text-to-background ratios, keyboard-navigable interactive controls, proper semantic heading hierarchies (single H1 per page), descriptive ARIA landmarks, and alt text on all informative visual assets.',
    ],
  },

  /* Category 5: SEO & Conversion (4) */
  {
    id: 'seo-included',
    category: 'seo',
    categoryLabel: 'SEO · FOUNDATION',
    question: 'Is on-page SEO included in the 7-day build?',
    answer: [
      'Yes, comprehensive technical on-page SEO is built into every page: bespoke meta titles, keyword-optimized meta descriptions, canonical URLs, XML sitemaps with real git commit lastmod dates, robots.txt directives, and OpenGraph/Twitter social share preview cards.',
    ],
  },
  {
    id: 'seo-schema-markup',
    category: 'seo',
    categoryLabel: 'SEO · STRUCTURED DATA',
    question: 'Do you include structured data (JSON-LD Schema) for Google rich search results?',
    answer: [
      'Yes. We embed rich JSON-LD schema tailored to your business model: ProfessionalService, LocalBusiness, Organization, Service, and FAQPage schemas.',
      'This helps Google understand your exact location, founders, service offerings, and enables rich search features like FAQ dropdown accordions in Google search results.',
    ],
  },
  {
    id: 'seo-conversion-focus',
    category: 'seo',
    categoryLabel: 'CONVERSION · STRATEGY',
    question: 'How do you optimize the site to turn visitors into booked inquiries and leads?',
    answer: [
      'Every section is structured around conversion psychology: an above-the-fold value proposition that answers "What do you do and why should I care?", quantifiable social proof, interactive specimen demos, transparent deliverables, and persistent, friction-free calls to action.',
    ],
  },
  {
    id: 'seo-ai-search-engines',
    category: 'seo',
    categoryLabel: 'SEO · AI DISCOVERY',
    question: 'Will our website be indexable by modern AI search engines like Perplexity, ChatGPT, and Claude?',
    answer: [
      'Yes. Because every single page is prerendered to raw semantic static HTML on disk, AI search engine crawlers (PerplexityBot, GPTBot, ClaudeBot) read your exact text copy, pricing terms, and service specifications immediately without needing complex JavaScript execution.',
    ],
  },

  /* Category 6: Ownership & Support (4) */
  {
    id: 'ownership-source-code',
    category: 'ownership',
    categoryLabel: 'OWNERSHIP · 100% YOURS',
    question: 'Who owns the source code, design assets, and intellectual property?',
    answer: [
      'You do. 100%. Upon payment of the final invoice, full ownership of the clean Git repository, custom design assets, stylesheets, and code transfers entirely to you.',
      'We do not retain proprietary holdbacks or license keys. Any developer in the world can open your codebase and maintain it effortlessly.',
    ],
  },
  {
    id: 'ownership-post-launch-warranty',
    category: 'ownership',
    categoryLabel: 'SUPPORT · 30-DAY WARRANTY',
    question: 'What happens after launch? Is there a warranty period?',
    answer: [
      'Every project includes a 30-day post-launch warranty at zero additional cost. If any layout bug, broken link, or form submission failure occurs, Deepak & Geetha fix it with priority turnaround.',
      'We also provide an asynchronous Loom walkthrough video showing your team how everything operates.',
    ],
  },
  {
    id: 'ownership-updating-content',
    category: 'ownership',
    categoryLabel: 'MAINTENANCE · CMS',
    question: 'Can our team update text, blog posts, and images without knowing how to code?',
    answer: [
      'Yes. Our blog architecture uses clean, human-readable Markdown files where adding a new article or modifying copy is as simple as typing in a text file.',
      'If your team prefers a visual CMS, we can connect headless systems like Decap CMS or Sanity so non-technical staff can edit content safely in a browser dashboard.',
    ],
  },
  {
    id: 'ownership-security-ssl',
    category: 'ownership',
    categoryLabel: 'SECURITY · HYGIENE',
    question: 'How do you handle security, SSL encryption, and spam prevention?',
    answer: [
      'Our static architecture has zero exposed WordPress admin panels, SQL injection vectors, or PHP backend vulnerabilities. All domains enforce HSTS Strict-Transport-Security, X-Content-Type-Options: nosniff, and SSL encryption.',
      'Lead forms feature silent honeypot anti-spam traps and client-side time-on-page validation to block automated bots without forcing annoying captchas on real customers.',
    ],
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Questions', count: FAQ_ITEMS.length },
  { key: 'sprint', label: 'Sprint & Timeline', count: 5 },
  { key: 'pricing', label: 'Pricing & Guarantee', count: 5 },
  { key: 'design', label: 'Design & Aesthetics', count: 5 },
  { key: 'tech', label: 'Tech & Performance', count: 5 },
  { key: 'seo', label: 'SEO & Conversion', count: 4 },
  { key: 'ownership', label: 'Ownership & Support', count: 4 },
];

export default function Faq({ onBook }: { onBook?: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'sprint-how-7-days': true,
    'pricing-guarantee-details': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    FAQ_ITEMS.forEach((item) => (all[item.id] = true));
    setOpenIds(all);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.some((line) => line.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  /* Build JSON-LD FAQPage Schema */
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer.join(' '),
        },
      })),
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions — Uncoded Hub | 7-Day Web Design Studio</title>
        <meta
          name="description"
          content="28 clear, plain-English answers about Uncoded Hub's 7-day custom website sprint, 50% late guarantee, pricing transparency, code ownership, tech stack, and working directly with Deepak & Geetha."
        />
        <link rel="canonical" href="https://uncodedhub.com/faq/" />
        <meta property="og:title" content="Frequently Asked Questions — Uncoded Hub" />
        <meta
          property="og:description"
          content="28 detailed answers on our 7-day sprint model, 50% late delivery guarantee, tech stack, pricing, and code ownership."
        />
        <meta property="og:url" content="https://uncodedhub.com/faq" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── Page Hero ─────────────────────────────────────────── */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-rule-subtle bg-paper">
        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <span className="label text-signal font-semibold block mb-3">
                Knowledge base · 28 detailed answers
              </span>

              <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.06]">
                Frequently asked questions.
              </h1>

              <div className="mt-6 text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
                <p>
                  No sales talk, no agency jargon. Plain answers on our seven-day sprint model,
                  the 50% late delivery guarantee, code ownership, tech stack, and working directly with{' '}
                  <strong className="text-ink font-semibold">Deepak &amp; Geetha</strong>.
                </p>
              </div>

              {/* Live Search & Fast Filter Bar */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center max-w-2xl">
                <div className="relative flex-1">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any question (e.g. guarantee, WordPress, pricing)..."
                    className="w-full px-4 py-3 pl-10 rounded-[14px] bg-paper-raised border border-rule-strong text-ink text-sm placeholder:text-ink-muted/50 focus:outline-none focus:border-ink transition-colors shadow-sm"
                  />
                  <svg
                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-ink-muted hover:text-ink"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-medium">
                  <button
                    onClick={expandAll}
                    className="px-3 py-2.5 rounded-[12px] bg-paper-sunken border border-rule hover:border-ink transition-colors text-ink"
                  >
                    Expand all
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-3 py-2.5 rounded-[12px] bg-paper-sunken border border-rule hover:border-ink transition-colors text-ink-muted hover:text-ink"
                  >
                    Collapse
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-ink text-paper shadow-sm'
                          : 'bg-paper-sunken text-ink-muted hover:text-ink border border-rule'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-white/20 text-paper' : 'bg-paper-raised text-ink-muted'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── FAQ Bento Accordion List ──────────────────────────── */}
      <section className="py-12 sm:py-16 bg-paper-sunken/40">
        <Shell>
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredItems.length === 0 ? (
              <div className="bg-paper-raised border border-rule-strong rounded-[24px] p-10 text-center">
                <p className="font-display text-2xl text-ink mb-2">No matching questions found.</p>
                <p className="text-ink-muted text-sm mb-6">
                  Try clearing your search query or switching categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="btn-primary"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isOpen = !!openIds[item.id];
                return (
                  <Reveal key={item.id} delay={Math.min(idx * 20, 200)}>
                    <div
                      className={`bg-paper-raised border transition-all duration-200 rounded-[20px] overflow-hidden ${
                        isOpen
                          ? 'border-ink/40 shadow-[0_8px_24px_rgba(0,0,0,0.04)]'
                          : 'border-rule hover:border-rule-strong'
                      }`}
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="space-y-1.5 flex-1 pr-2">
                          <span className="card-tag">
                            {item.categoryLabel.charAt(0) + item.categoryLabel.slice(1).toLowerCase()}
                          </span>
                          <h2 className="font-display text-lg sm:text-xl md:text-[1.375rem] text-ink leading-snug tracking-tight mt-1">
                            {item.question}
                          </h2>
                        </div>

                        {/* Chevron Indicator */}
                        <div
                          className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                            isOpen
                              ? 'bg-ink text-paper border-ink rotate-180'
                              : 'bg-paper-sunken text-ink border-rule group-hover:border-ink'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Accordion Content — Kept in DOM for AI Answer Engines & Prerender Answerability */}
                      <div
                        id={`faq-panel-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${item.id}`}
                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-1 border-t border-rule/60">
                            <div className="space-y-3 pt-3">
                              {item.answer.map((para, pIdx) => (
                                <p key={pIdx} className="text-sm sm:text-base text-ink-muted leading-relaxed">
                                  {para}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })
            )}
          </div>
        </Shell>
      </section>

      {/* ── Closing Dual Bento CTA ───────────────────────────── */}
      <section className="py-16 sm:py-24 bg-paper border-t border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Card 1: Still have a question? */}
                <div className="bg-paper-raised border border-rule-strong rounded-[24px] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="card-tag mb-3">
                      Direct inquiry
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink leading-tight tracking-tight">
                      Have a specific question not covered here?
                    </h3>
                    <p className="text-ink-muted text-sm leading-relaxed mt-4">
                      Send us an email or message us directly on WhatsApp. You will receive a direct reply
                      from Deepak or Geetha within a few hours.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-rule flex flex-col sm:flex-row gap-3">
                    <a
                      href="mailto:hello@uncodedhub.com"
                      className="px-4 py-2.5 rounded-[12px] bg-paper-sunken border border-rule hover:border-ink transition-colors text-xs font-medium text-ink text-center"
                    >
                      hello@uncodedhub.com ↗
                    </a>
                    <a
                      href="https://wa.me/918660819023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-[12px] bg-paper-sunken border border-rule hover:border-ink transition-colors text-xs font-medium text-ink text-center"
                    >
                      WhatsApp: +91 86608 19023 ↗
                    </a>
                  </div>
                </div>

                {/* Card 2: Ready to build? */}
                <div className="bg-ink text-paper rounded-[24px] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
                  <div>
                    <span className="label text-signal-bright font-semibold block mb-3">
                      Reserve your cohort
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-paper leading-tight tracking-tight">
                      Ready to launch your high-converting website in 7 days?
                    </h3>
                    <p className="text-on-ink-muted text-sm leading-relaxed mt-4">
                      Book a free 20-minute discovery call directly on our calendar. We will review your current
                      site, outline your scope sheet, and confirm your sprint kickoff date.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={onBook}
                      className="btn-primary w-full text-center"
                    >
                      Schedule Discovery Call
                    </button>
                    <Link
                      to="/portfolio/"
                      className="px-4 py-2.5 rounded-[12px] bg-white/10 hover:bg-white/20 transition-colors text-xs font-mono text-paper text-center border border-white/15"
                    >
                      Inspect Live Demos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
