import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';

/* ═══════════════════════════════════════════════════════════════════
   FREQUENTLY ASKED QUESTIONS — UNCODED HUB
   Canonical: https://uncodedhub.com/faq/

   Customer-Centric Architecture:
   - Plain English answers focused on business outcomes, not developer jargon.
   - Curated high-priority buying questions at the top.
   - Clear, honest explanations of the 7-day sprint, pricing, guarantee, and founder delivery.
   - Inline CTAs on key commercial questions.
   - Full Schema.org FAQPage structured data for Google Search.
   ═══════════════════════════════════════════════════════════════════ */

interface FaqItem {
  id: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string[];
  hasCta?: boolean;
}

const FAQ_ITEMS: FaqItem[] = [
  /* ── 01. Sprint & Process ── */
  {
    id: 'sprint-how-7-days',
    category: 'sprint',
    categoryLabel: 'Process & Timeline',
    question: 'How does your 7-day website sprint actually work?',
    answer: [
      'Most web agencies take 3 to 6 months not because building a great website takes hundreds of hours, but because projects get buried under agency meetings, account managers, and junior developers juggling 15 clients at once.',
      'At Uncoded Hub, we work single-threaded. We accept only two client sprints at a time. During your 7-day sprint, co-founders Deepak (engineering) and Geetha (design) dedicate their full, uninterrupted attention exclusively to your website.',
      'From Monday kickoff to Sunday evening, we move sequentially: Day 1 strategy and intake, Day 2 visual design direction, Days 3–4 custom development, Day 5 content and conversion funnels, Day 6 testing and mobile speed audit, and Day 7 live launch.',
    ],
    hasCta: true,
  },
  {
    id: 'sprint-client-prerequisites',
    category: 'sprint',
    categoryLabel: 'Process & Timeline',
    question: 'What do I need to prepare before the sprint begins?',
    answer: [
      'Very little. Before kickoff, we complete a simple pre-sprint checklist with you. All we need is your logo (or brand name), high-resolution photos of your work, team, or practice (if available), your primary service list, and access to your domain registrar.',
      'If you don’t have professional copy, we write high-converting copy for you during the discovery phase. Once your assets are confirmed, your sprint date is officially locked and our 7-day clock begins.',
    ],
  },
  {
    id: 'sprint-client-delays',
    category: 'sprint',
    categoryLabel: 'Process & Timeline',
    question: 'What happens if my team is delayed in providing feedback?',
    answer: [
      'The 7-day timeline relies on prompt feedback at two key moments: Design Direction on Day 2, and Staging Review on Day 6.',
      'If your team needs extra days to consult internal partners or gather additional photos, the sprint timer simply pauses without penalty. It resumes as soon as you are ready, ensuring no rushed decisions.',
    ],
  },
  {
    id: 'sprint-revisions',
    category: 'sprint',
    categoryLabel: 'Process & Timeline',
    question: 'Can I request changes and revisions during the sprint?',
    answer: [
      'Yes. Revisions are built directly into the sprint. On Day 2, you review and approve the design direction, typography, and visual style. On Day 6, you test the fully interactive staging site on your phone and computer.',
      'Because you communicate directly with Deepak and Geetha on a private WhatsApp channel, adjustments happen in minutes rather than days.',
    ],
  },
  {
    id: 'sprint-capacity',
    category: 'sprint',
    categoryLabel: 'Process & Timeline',
    question: 'How many projects do you take on each month?',
    answer: [
      'Exactly two client sprints per month. That is a deliberate choice.',
      'Because Deepak and Geetha personally design and code every project, limiting our client intake is the only way to guarantee senior attention, sub-second performance, and 100% on-time delivery.',
    ],
  },

  /* ── 02. Pricing & Guarantees ── */
  {
    id: 'pricing-cost',
    category: 'pricing',
    categoryLabel: 'Pricing & Guarantee',
    question: 'How much does a website cost, and are there any hidden fees?',
    answer: [
      'We offer three clear starting points: Essential Website from ₹35,000 INR (≈ $490 USD), Business Website from ₹55,000 INR (≈ $750 USD), and Online Store from ₹85,000+ INR (≈ $1,150+ USD).',
      'During your free 20-minute discovery call, we review your exact requirements and provide one fixed written quote. That number never changes.',
      'There are zero hidden agency fees, zero markup on hosting, and zero mandatory monthly retainers. You pay only the agreed project price.',
    ],
    hasCta: true,
  },
  {
    id: 'pricing-guarantee',
    category: 'pricing',
    categoryLabel: 'Pricing & Guarantee',
    question: 'How does the "On Time, or 100% Free" delivery guarantee work?',
    answer: [
      'Our guarantee is contractual, binding, and published in our Terms of Service.',
      'Before we accept your deposit, we agree on a fixed launch date in writing. If Uncoded Hub misses the agreed launch milestone due to our own delay, you receive an immediate 100% full refund of your deposit, and you keep the complete codebase, design files, and platform assets free of charge.',
      'We put our own revenue on the line because our single-threaded sprint model eliminates agency bottlenecks.',
    ],
    hasCta: true,
  },
  {
    id: 'pricing-payment-schedule',
    category: 'pricing',
    categoryLabel: 'Pricing & Guarantee',
    question: 'What is your payment milestone structure?',
    answer: [
      'We work on a straightforward 50/50 milestone structure:',
      '• 50% reservation deposit upon signing the scope sheet to lock your dedicated sprint slot on our calendar.',
      '• 50% final balance upon completion of staging review, prior to public DNS switchover and final repository transfer.',
      'For Indian businesses, we provide a Karnataka GST tax invoice with full B2B Input Tax Credit (ITC). For international clients, we accept Stripe, Wise, and international cards.',
    ],
  },
  {
    id: 'pricing-international',
    category: 'pricing',
    categoryLabel: 'Pricing & Guarantee',
    question: 'Do you work with businesses outside India?',
    answer: [
      'Yes. Approximately half of our clients are based in the United States, United Kingdom, Australia, United Arab Emirates, Europe, and Canada.',
      'We provide country-specific currency pricing, time-zone friendly communication, and remote delivery with recorded video walkthroughs. You receive boutique agency quality with approximately 65% cost savings compared to domestic agencies in London or New York.',
    ],
  },

  /* ── 03. Working with Deepak & Geetha ── */
  {
    id: 'team-direct-founders',
    category: 'team',
    categoryLabel: 'Working with Us',
    question: 'Will I work directly with Deepak and Geetha?',
    answer: [
      'Yes, 100%. When you hire Uncoded Hub, you work directly with the two senior founders who actually design and build your website.',
      'There are no junior interns learning on your project, no outsourced contractors, and no account managers acting as middlemen. Deepak handles technical architecture and code; Geetha directs visual design and messaging.',
    ],
    hasCta: true,
  },
  {
    id: 'team-why-uncoded-hub',
    category: 'team',
    categoryLabel: 'Working with Us',
    question: 'Why should I choose Uncoded Hub over a traditional agency or a freelancer?',
    answer: [
      'Freelancers on hourly rates have misaligned incentives: the slower they work, the more you pay, and they frequently disappear midway through a build.',
      'Traditional agencies charge ₹2,00,000 to ₹6,00,000 ($5,000–$15,000+ abroad), take months to deliver, and hand your project off to junior staff.',
      'Uncoded Hub gives you senior co-founder delivery, sub-second mobile speed, one fixed price agreed in writing, and a binding 7-day completion guarantee: on time, or 100% free.',
    ],
  },
  {
    id: 'team-existing-brand',
    category: 'team',
    categoryLabel: 'Working with Us',
    question: 'Can you work with our existing brand guidelines, logo, and photography?',
    answer: [
      'Yes. If you have established brand guidelines, typography standards, or color palettes, we follow them rigorously while elevating them into a modern, high-contrast digital experience.',
      'If you do not have an established brand, Geetha will curate a refined typographic hierarchy and tailored color palette suited to your market authority.',
    ],
  },
  {
    id: 'team-copywriting-included',
    category: 'team',
    categoryLabel: 'Working with Us',
    question: 'What if we don’t have written copy ready for the website?',
    answer: [
      'We write the copy for you. You never have to stare at a blank screen or fill out endless questionnaires.',
      'During our 20-minute discovery call, we ask specific questions about your services, your ideal clients, and what sets you apart. We then craft persuasive, customer-focused copy decks designed to build trust and drive enquiries.',
    ],
  },

  /* ── 04. Design, Speed & Technology ── */
  {
    id: 'tech-mobile-speed',
    category: 'tech',
    categoryLabel: 'Design & Performance',
    question: 'Will my website load fast and work well on mobile phones?',
    answer: [
      'Yes, exceptionally fast. Most websites are bloated with dozens of plugins, uncompressed images, and heavy page builders that take 5 to 8 seconds to load on mobile phones.',
      'We hand-code clean React with next-generation WebP images and zero bloatware. Your website loads in under a second on mobile 4G, keeping visitors engaged and significantly improving your Google ranking signals.',
    ],
    hasCta: true,
  },
  {
    id: 'tech-no-templates',
    category: 'tech',
    categoryLabel: 'Design & Performance',
    question: 'Do you use pre-made WordPress or Webflow templates?',
    answer: [
      'Never. Every Uncoded Hub website is designed from a blank canvas, tailored specifically to your business model, customer journey, and competitive strengths.',
      'We avoid generic template clichés—such as cheesy stock photos, meaningless animations, and confusing navigation—in favor of clean, high-contrast editorial design that immediately communicates authority.',
    ],
  },
  {
    id: 'tech-stack-why-not-wordpress',
    category: 'tech',
    categoryLabel: 'Design & Performance',
    question: 'What technology do you build with, and why not WordPress?',
    answer: [
      'We build with modern, hand-crafted React and Tailwind CSS, deployed on global edge networks.',
      'Unlike WordPress, which requires 30+ plugins that frequently conflict, slow down pages, and require weekly security updates, our custom code has zero plugin vulnerabilities, requires no database maintenance, and cannot be hacked through PHP exploits.',
    ],
  },
  {
    id: 'tech-hosting-costs',
    category: 'tech',
    categoryLabel: 'Design & Performance',
    question: 'Where is the website hosted, and what are the ongoing server costs?',
    answer: [
      'Because our websites compile to clean static code, they can be hosted on modern global edge platforms like Cloudflare Pages or Vercel.',
      'Ongoing hosting costs are virtually zero—typically ₹0 to $5/month directly to the provider. You retain direct billing control in your own account with zero agency markups.',
    ],
  },
  {
    id: 'tech-seo-included',
    category: 'tech',
    categoryLabel: 'Design & Performance',
    question: 'Is SEO included to help our business rank on Google?',
    answer: [
      'Yes. Technical on-page SEO is built into every page: optimized title tags, meta descriptions, canonical URLs, XML sitemaps, OpenGraph social share cards, and rich Schema.org structured data (LocalBusiness, Organization, Service, and FAQPage).',
      'This ensures Google and modern AI search engines (ChatGPT, Perplexity) immediately understand your business, services, and location.',
    ],
  },

  /* ── 05. Ownership & After Launch ── */
  {
    id: 'ownership-source-code',
    category: 'ownership',
    categoryLabel: 'Ownership & Support',
    question: 'Will I actually own 100% of my website and code after launch?',
    answer: [
      'Yes, completely and unconditionally. Upon settlement of the final invoice, full ownership of the clean GitHub repository, design assets, and files transfers entirely to you.',
      'We do not retain proprietary holdbacks or licensing keys. Any developer in the world can inspect, edit, or maintain your codebase in the future.',
    ],
  },
  {
    id: 'ownership-post-launch-support',
    category: 'ownership',
    categoryLabel: 'Ownership & Support',
    question: 'What happens after launch? Is there ongoing support?',
    answer: [
      'Every project includes a 30-day post-launch warranty with direct support from Deepak & Geetha. If any display bug, broken link, or form issue occurs, we resolve it promptly at zero cost.',
      'We also provide recorded video walkthroughs showing your team how everything works. If you need updates or new pages later, we can quote them as small, transparent mini-sprints, or you can opt for an optional website care plan.',
    ],
    hasCta: true,
  },
  {
    id: 'ownership-updating-content',
    category: 'ownership',
    categoryLabel: 'Ownership & Support',
    question: 'Can our team update text and images easily without knowing how to code?',
    answer: [
      'Yes. For text and articles, our system uses simple, human-readable Markdown files where updating text is as easy as editing a text document.',
      'If your team prefers a visual dashboard, we can connect a headless CMS (such as Decap CMS or Sanity) so non-technical staff can update content safely in a browser.',
    ],
  },
  {
    id: 'ownership-redesign-vs-rescue',
    category: 'ownership',
    categoryLabel: 'Ownership & Support',
    question: 'What is the difference between a planned website redesign and a broken-site rescue?',
    answer: [
      'We gladly do planned website modernizations—migrating an established business from an outdated, slow WordPress or Wix site to modern React while preserving 1:1 Google rankings and backlinks.',
      'However, we decline taking over broken, hacked, or abandoned spaghetti-code websites for piecemeal bug patching. In our experience, patching fragile legacy code wastes money; a clean, fresh build is faster, cheaper, and far more reliable.',
    ],
  },

  /* ── 06. Industry Solutions & Niches ── */
  {
    id: 'niche-medical-clinics',
    category: 'industries',
    categoryLabel: 'Industry Solutions',
    question: 'How do you design for medical clinics and healthcare practices?',
    answer: [
      'We build patient-first digital experiences with friction-free 2-tap appointment booking, doctor credentials, department triage, and clear procedure guides.',
      'Patients in pain or seeking a specialist get immediate reassurance, transparent clinic timings, and direct WhatsApp routing without telephone delays.',
    ],
  },
  {
    id: 'niche-architecture-estates',
    category: 'industries',
    categoryLabel: 'Industry Solutions',
    question: 'How do you showcase projects for architects, interior designers, and contractors?',
    answer: [
      'Instead of sluggish image galleries, we build high-definition project case studies that load in 400 milliseconds, featuring before/after sliders, material specifications, and client briefs.',
      'High-net-worth clients experience your craftsmanship with full-bleed visual authority on mobile and desktop displays.',
    ],
  },
  {
    id: 'niche-corporate-legal',
    category: 'industries',
    categoryLabel: 'Industry Solutions',
    question: 'How do you position corporate advisory, law, and financial consultancies?',
    answer: [
      'We build authoritative corporate flagships designed to win enterprise decision-maker trust, featuring partner credentials, practice area breakdowns, verified case results, and confidential enquiry funnels.',
      'Quiet, editorial typography and sub-second performance signal prestige and institutional credibility.',
    ],
  },
  {
    id: 'niche-hospitality-dining',
    category: 'industries',
    categoryLabel: 'Industry Solutions',
    question: 'How do you build for restaurants, hospitality, and luxury resorts?',
    answer: [
      'We replace clunky PDF menus with interactive seasonal menus, zero-commission table hold reservations, room showcase carousels, and direct concierge WhatsApp links.',
      'Guests can view dining selections and reserve reservations in seconds on their smartphones.',
    ],
  },
  {
    id: 'niche-wellness-beauty',
    category: 'industries',
    categoryLabel: 'Industry Solutions',
    question: 'How do you build for boutique salons, wellness retreats, and fitness clubs?',
    answer: [
      'We build sensory digital sanctuaries with treatment menus, stylist lookbooks, instant day-pass claims, and peak-season reservation funnels.',
      'Clients get visual clarity on services and can book consultations or memberships effortlessly.',
    ],
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Questions', count: FAQ_ITEMS.length },
  { key: 'sprint', label: 'Process & Timeline', count: 5 },
  { key: 'pricing', label: 'Pricing & Guarantee', count: 4 },
  { key: 'team', label: 'Working with Us', count: 4 },
  { key: 'tech', label: 'Design & Performance', count: 5 },
  { key: 'ownership', label: 'Ownership & Support', count: 4 },
  { key: 'industries', label: 'Industry Solutions', count: 5 },
];

export default function Faq({ onBook }: { onBook?: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'sprint-how-7-days': true,
    'pricing-cost': true,
    'pricing-guarantee': true,
  });

  const handleBooking = () => {
    if (onBook) {
      onBook();
    } else {
      window.location.href = '/contact/#book';
    }
  };

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
        <title>Frequently Asked Questions &amp; 7-Day Sprints — Uncoded Hub</title>
        <meta
          name="description"
          content="Clear answers on our 7-day website sprint, transparent pricing, contractual on-time guarantee, custom design, code ownership, and working with Deepak & Geetha."
        />
        <link rel="canonical" href="https://uncodedhub.com/faq/" />
        <meta property="og:title" content="Frequently Asked Questions — Uncoded Hub" />
        <meta
          property="og:description"
          content="Clear answers on our 7-day sprint model, transparent pricing, on-time or 100% free guarantee, code ownership, and founder delivery."
        />
        <meta property="og:url" content="https://uncodedhub.com/faq/" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── Breadcrumb Ribbon ────────────────────────────────────────── */}
      <div className="bg-paper border-b border-rule pt-20 sm:pt-24 pb-3">
        <Shell>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-muted">
              <Link to="/" className="hover:text-ink transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-ink font-medium">Frequently Asked Questions</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/10 text-signal font-mono text-[11px]">
                <span>⚡ Plain English Answers · Zero Developer Jargon</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-rule text-ink font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>On Time or 100% Free Guarantee</span>
              </div>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── Page Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-rule bg-paper">
        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <span className="label text-signal font-semibold block mb-3">
                KNOWLEDGE BASE · RADICAL CLARITY
              </span>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.06] mb-4">
                Frequently Asked Questions.
              </h1>

              <div className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
                <p>
                  No sales talk, no agency jargon. Plain answers on our seven-day sprint model, fixed pricing, the contractual on-time guarantee, complete code ownership, and working directly with{' '}
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
                    placeholder="Search any question (e.g. pricing, guarantee, timeline, WordPress)..."
                    className="w-full px-4 py-3 pl-10 rounded-[14px] bg-paper-raised border border-rule-strong text-ink text-sm placeholder:text-muted/60 focus:outline-none focus:border-signal transition-colors shadow-xs"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none">
                    🔍
                  </span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted hover:text-ink cursor-pointer"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <button
                    onClick={expandAll}
                    className="px-3.5 py-3 rounded-[12px] bg-paper-sunken border border-rule hover:border-ink transition-colors text-ink cursor-pointer"
                  >
                    Expand all
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-3.5 py-3 rounded-[12px] bg-paper-sunken border border-rule hover:border-ink transition-colors text-muted hover:text-ink cursor-pointer"
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
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-ink text-paper shadow-xs font-semibold'
                          : 'bg-paper-sunken text-muted hover:text-ink border border-rule'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-white/20 text-paper' : 'bg-paper-raised text-muted'
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

      {/* ── FAQ Bento Accordion List ─────────────────────────────────── */}
      <section className="py-12 sm:py-20 bg-paper-sunken">
        <Shell>
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredItems.length === 0 ? (
              <div className="bg-paper-raised border border-rule-strong rounded-[24px] p-10 text-center">
                <p className="font-display text-2xl text-ink mb-2">No matching questions found.</p>
                <p className="text-muted text-sm mb-6">
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
                      className={`bg-paper border transition-all duration-200 rounded-[20px] overflow-hidden ${
                        isOpen
                          ? 'border-signal/50 shadow-sm ring-1 ring-signal/10'
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
                            {item.categoryLabel}
                          </span>
                          <h2 className="font-display text-lg sm:text-xl text-ink leading-snug tracking-tight mt-1">
                            {item.question}
                          </h2>
                        </div>

                        {/* Chevron Indicator */}
                        <div
                          className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                            isOpen
                              ? 'bg-signal text-paper border-signal rotate-180'
                              : 'bg-paper-sunken text-ink border-rule group-hover:border-ink'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Accordion Content */}
                      <div
                        id={`faq-panel-${item.id}`}
                        role="region"
                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-1 border-t border-rule">
                            <div className="space-y-3 pt-3">
                              {item.answer.map((para, pIdx) => (
                                <p key={pIdx} className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-0 font-sans">
                                  {para}
                                </p>
                              ))}

                              {/* Helpful Inline CTA for high-intent questions */}
                              {item.hasCta && (
                                <div className="mt-4 pt-3 border-t border-rule flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                                  <span className="text-muted">
                                    Still have questions about your specific project?
                                  </span>
                                  <button
                                    type="button"
                                    onClick={handleBooking}
                                    className="text-signal hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
                                  >
                                    <span>Let's talk for 20 minutes →</span>
                                  </button>
                                </div>
                              )}
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

      {/* ── Closing Dual Bento CTA ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper border-t border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Card 1: Have a specific question? */}
                <div className="bg-paper-raised border border-rule-strong rounded-[24px] p-8 sm:p-10 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="card-tag mb-3">DIRECT INQUIRY</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink leading-tight tracking-tight">
                      Have a specific question not covered here?
                    </h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed mt-4">
                      Message us directly on WhatsApp or send an email. You will receive a direct reply from Deepak or Geetha within a few hours.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-rule flex flex-col sm:flex-row gap-3 font-mono text-xs">
                    <a
                      href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I%20have%20a%20question%20about%20your%20website%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-full bg-signal text-paper font-semibold hover:bg-signal-bright transition-colors text-center shadow-xs"
                    >
                      WhatsApp: +91 86608 19023 ↗
                    </a>
                    <a
                      href="mailto:hello@uncodedhub.com"
                      className="px-4 py-3 rounded-full bg-paper border border-rule hover:border-ink transition-colors text-ink text-center"
                    >
                      hello@uncodedhub.com ↗
                    </a>
                  </div>
                </div>

                {/* Card 2: Ready to talk? */}
                <div className="bg-ink text-paper rounded-[24px] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
                  <div>
                    <span className="label text-signal-bright font-semibold block mb-3 font-mono text-xs">
                      CO-FOUNDER DISCOVERY
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-paper leading-tight tracking-tight">
                      Ready to launch your custom website in 7 days?
                    </h3>
                    <p className="text-on-ink-muted text-xs sm:text-sm leading-relaxed mt-4">
                      Book a free 20-minute discovery call directly on our calendar. We will review your current site, outline your scope sheet, and confirm your sprint kickoff date.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleBooking}
                      className="btn-primary w-full text-center text-xs py-3.5 rounded-full cursor-pointer shadow-md"
                    >
                      Schedule Discovery Call →
                    </button>
                    <Link
                      to="/portfolio/"
                      className="px-4 py-3.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xs font-mono text-paper text-center border border-white/15"
                    >
                      Inspect Live Demos ↗
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
