import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   SERVICES & SCOPES
   Cloaked-inspired design:
   - High-contrast editorial hero with announcement badge
   - Rounded squircle bento scope cards (rounded-[28px])
   - Interactive Day-by-Day Sprint Scrubber (Day 1 to 7)
   - Cinematic dark chapter: "How Pricing Works" (pitch espresso #0e0c0a)
   - "What We Turn Down" filter cards
   - Dual-card closing CTA module
   ═══════════════════════════════════════════════════════════════════ */

const SPRINT_DAYS = [
  {
    day: 'Day 1',
    phase: 'DISCOVERY & ARCHITECTURE',
    title: 'Brand Assets & Wireframe Blueprint',
    owner: 'Geetha (Design) & Deepak (Architecture)',
    deliverable: 'Approved Information Architecture & Homepage Layout Direction',
    details:
      'We run the 60-minute kickoff discovery call, audit your vector logos and portfolio assets, finalize the URL structure, and map the exact client enquiry conversion path.',
    checkpoints: [
      'Pre-sprint asset checklist validated',
      'Sitemap and content hierarchy locked',
      'Homepage layout wireframe reviewed',
    ],
  },
  {
    day: 'Day 2',
    phase: 'VISUAL SYSTEM & DESIGN',
    title: 'Bespoke UI Design & Typography Lockup',
    owner: 'Geetha (Co-Founder, Design)',
    deliverable: 'Full Interactive Desktop & Mobile Figma UI Signoff',
    details:
      'Geetha crafts bespoke mobile and desktop screens tailored specifically to your high-ticket service. No generic templates — custom typography, editorial layout, and brand color harmony.',
    checkpoints: [
      'Desktop & mobile screens presented',
      'Typography & color contrast verified',
      'Client revision feedback incorporated same-day',
    ],
  },
  {
    day: 'Day 3',
    phase: 'FRONTEND ENGINEERING',
    title: 'Clean Semantic React Component Build',
    owner: 'Deepak (Co-Founder, Engineering)',
    deliverable: 'Zero-Bloatware Semantic DOM & Responsive Architecture',
    details:
      'Deepak hand-codes clean React components using Tailwind CSS. Zero third-party page builder bloat, zero heavy WordPress plugins, zero license lock-in.',
    checkpoints: [
      'Accessible semantic HTML5 structure',
      'Fluid responsive breakpoints tested',
      'Sub-100KB initial bundle optimization',
    ],
  },
  {
    day: 'Day 4',
    phase: 'CONTENT & CONVERSION',
    title: 'Copy Deck & High-Ticket Lead Funnels',
    owner: 'Geetha & Deepak (Joint Review)',
    deliverable: 'All Service Pages Populated & Conversion Triggers Placed',
    details:
      'We populate approved sales copy, client proof case studies, pricing clarity tiers, and prominent call-to-actions designed to qualify and pre-sell clients before they call.',
    checkpoints: [
      'Service scope breakdowns populated',
      'Trust credentials and founder proof embedded',
      'Micro-animations & entrance transitions tuned',
    ],
  },
  {
    day: 'Day 5',
    phase: 'SYSTEMS & INTEGRATIONS',
    title: 'Database, CRM & WhatsApp Webhooks',
    owner: 'Deepak (Co-Founder, Engineering)',
    deliverable: 'Live Database Hooks & Spam-Protected Forms',
    details:
      'Forms are wired straight to your private database and inbox, complete with Google Sheets backup redundancy and instant WhatsApp click-to-chat routing.',
    checkpoints: [
      'Supabase database table routing tested',
      'Dual-redundancy email & Sheets backup active',
      'Honeypot anti-spam defense configured',
    ],
  },
  {
    day: 'Day 6',
    phase: 'PERFORMANCE & SEO',
    title: 'Core Web Vitals & On-Page SEO Groundwork',
    owner: 'Deepak (Co-Founder, Engineering)',
    deliverable: 'Contractual 95+ Mobile Lighthouse Audit Verification',
    details:
      'We run rigorous audits simulating slow mobile 4G. Images converted to next-gen WebP, fonts self-hosted with font-display swap, and structured JSON-LD schemas validated.',
    checkpoints: [
      'Lighthouse 95+ verified on mobile emulation',
      'Open Graph & Twitter card previews generated',
      'Schema.org ProfessionalService structured data active',
    ],
  },
  {
    day: 'Day 7',
    phase: 'WALKTHROUGH & GO-LIVE',
    title: 'Client Review, DNS Switch & Handoff',
    owner: 'Deepak & Geetha (With Client)',
    deliverable: 'Production Domain Live + 30-Day Post-Launch Support',
    details:
      'Final staging walkthrough with Deepak & Geetha. We switch DNS records, deploy SSL, hand over full source code ownership, and record a walkthrough tutorial so you can edit with ease.',
    checkpoints: [
      'Production DNS & SSL switchover',
      'Recorded editorial walkthrough delivered',
      '30 days of direct priority warranty begins',
    ],
  },
];

type Scope = {
  id: string;
  name: string;
  forWho: string;
  timeline: string;
  tag: string;
  price?: string;
  includes: string[];
};

const SCOPES: Scope[] = [
  {
    id: '01',
    name: 'Single page',
    tag: 'Campaign / Fast launch',
    forWho:
      'One offer, one audience, one action. Usually the landing page behind an ad campaign, or a first site for a business that does not need five pages pretending it does.',
    timeline: 'Three working days',
    includes: [
      'One bespoke page, designed at mobile and desktop widths',
      'Copy written by us from the discovery call, not filled in by you afterwards',
      'Enquiry form wired to your inbox and to a database you own',
      'WhatsApp click-to-chat, if that is how your customers reach you',
      'Analytics installed and a conversion goal configured',
      'On-page SEO groundwork: titles, descriptions, structured data, sitemap',
      'One round of revisions and launch checklist verification',
    ],
  },
  {
    id: '02',
    name: 'Business website',
    tag: 'Most popular · 7-day sprint',
    forWho:
      'The default. A business that needs to explain what it does, prove it can be trusted, and take enquiries — which is nearly every business that is not selling online.',
    timeline: 'Seven working days',
    includes: [
      'Up to five pages, each designed rather than filled from a template',
      'Full copy deck written and approved before design begins',
      'Enquiry form and booking flow, both connected to your inbox and a database',
      'Local SEO groundwork, including Google Business Profile setup',
      'Analytics, conversion goals, and a monthly report you can actually read',
      'A recorded walkthrough so you can edit content yourself',
      'Two rounds of revisions and thirty days of post-launch support',
    ],
  },
  {
    id: '03',
    name: 'Online store',
    tag: 'Ecommerce architecture',
    forWho:
      'Selling physical or digital products directly, with real inventory and real payments. This is the one scope where seven days is not a promise we will make.',
    timeline: 'Two to three weeks, quoted per catalogue',
    includes: [
      'Product catalogue, categories, search, and stock handling',
      'Payments through Razorpay or Stripe, including UPI',
      'Automated order confirmation by email and WhatsApp',
      'Abandoned-cart recovery workflows',
      'Admin training session, recorded, plus written documentation',
      'Thirty days of priority support after launch',
    ],
  },
];

const NOT_US = [
  {
    k: 'Mobile apps',
    v: 'We build for the modern web. If you need native iOS and Android apps, we are the wrong studio and will say so immediately on the call.',
    pill: 'Web Focused Only',
  },
  {
    k: 'SEO retainers',
    v: 'We do the technical on-page and local groundwork that lets you rank. We do not sell monthly link-building packages, and we would be suspicious of anyone who does.',
    pill: 'Zero Retainers',
  },
  {
    k: 'Paid ads management',
    v: 'We build the high-conversion landing page your campaign needs and wire up the tracking. Running the ad campaign is someone else’s job.',
    pill: 'Conversion Only',
  },
  {
    k: 'Rescuing broken sites',
    v: 'Taking over another developer’s unfinished or plugin-riddled WordPress site almost always costs more than starting clean, and we would rather tell you that upfront.',
    pill: 'Clean Builds Only',
  },
  {
    k: 'Twelve-page sites in a week',
    v: 'The seven-day guarantee holds strictly for our defined 5-page scope. Larger builds receive a longer, honestly quoted schedule.',
    pill: 'Strict Integrity',
  },
];

const ONGOING = [
  {
    title: 'Hosting and domain',
    desc: 'We set it up in your own name, on your own account. You own everything, and you can leave whenever you like.',
    badge: '100% Client Owned',
  },
  {
    title: 'Care plan',
    desc: 'Optional. Performance monitoring, security backups, uptime tracking, and a set number of content updates each month.',
    badge: 'Optional Peace of Mind',
  },
  {
    title: 'Future additions',
    desc: 'Priced per project at the transparent rate you were originally quoted, for as long as you are a client.',
    badge: 'Locked-in Rate',
  },
];

export default function Services({ onBook }: { onBook: () => void }) {
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  return (
    <>
      <Helmet>
        <title>Services and Scopes — Uncoded Hub</title>
        <meta
          name="description"
          content="Three scopes, what each one includes in full, what we do not take on, and how pricing works. Fixed price agreed before any work starts."
        />
        <link rel="canonical" href="https://uncodedhub.com/services" />
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="pt-10 md:pt-16 pb-16">
        <Shell>
          <Reveal>
            <span className="label text-signal font-semibold block mb-3">
              3 turnkey scopes · Zero bloatware
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink max-w-[16ch] leading-[1.08] tracking-tight">
              Three scopes. <br />
              <em className="italic hero-signal font-medium">No surprises.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-6 max-w-2xl leading-relaxed">
              Below is everything each scope includes, written out in detail rather than summarised into a
              vague tick list you have to interpret. You leave the discovery call with a fixed written scope,
              a defined price, and a contractual launch date.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── Scopes Bento Cards ───────────────────────────────────── */}
      <Section size="default">
        <Shell>
          <div className="space-y-10">
            {SCOPES.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <div className="bg-paper-raised border border-rule-strong rounded-[28px] p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Scope Info & CTA */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <span className="card-tag mb-4">
                        {s.tag}
                      </span>

                      <h2 className="font-display text-3xl sm:text-4xl text-ink font-medium mt-1">{s.name}</h2>
                      
                      <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted bg-paper-sunk/80 px-3 py-1 rounded-full border border-rule">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                        <span>Timeline: <strong className="text-ink font-medium">{s.timeline}</strong></span>
                      </div>

                      <p className="text-muted leading-relaxed mt-5 text-sm">{s.forWho}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-rule">
                      <button
                        onClick={onBook}
                        className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-xs md:text-sm py-3 px-6 rounded-full transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <span>Schedule 20-min Discovery Call</span>
                        <span>→</span>
                      </button>
                      <span className="text-[11px] text-muted block mt-2">
                        Get a written scope and quote on the call
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Included Deliverables */}
                  <div className="lg:col-span-7 bg-paper p-6 sm:p-8 rounded-[20px] border border-rule">
                    <span className="label text-signal font-semibold text-xs block mb-4">
                      Included in full
                    </span>
                    <ul className="space-y-3.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex gap-3 items-start text-xs sm:text-sm text-ink-soft leading-relaxed">
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
      </Section>

      {/* ── Interactive Day-by-Day Sprint Execution Scrubber ───── */}
      <section className="py-16 md:py-24 bg-paper-sunken/40 border-y border-rule-subtle">
        <Shell>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="label text-signal font-semibold block mb-2.5">
                  Execution protocol · Day 1 to 7
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                  What happens on each day.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                  No mystery, no weeks of silence. Here is the exact daily progression from the Day 1 kickoff to your production DNS switchover on Day 7.
                </p>
              </div>
            </Reveal>

            {/* Day Selector Navigation Pills */}
            <Reveal delay={80}>
              <div className="flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 bg-paper-raised border border-rule-strong rounded-full overflow-x-auto shadow-xs mb-8">
                {SPRINT_DAYS.map((d, idx) => (
                  <button
                    key={d.day}
                    onClick={() => setActiveDayIdx(idx)}
                    className={`flex-1 min-w-[72px] sm:min-w-0 py-2.5 px-3 rounded-full text-xs text-center transition-all cursor-pointer ${
                      activeDayIdx === idx
                        ? 'bg-signal text-paper font-semibold shadow-sm scale-[1.02]'
                        : 'text-ink-soft hover:text-ink hover:bg-paper font-medium'
                    }`}
                  >
                    <span>{d.day}</span>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Active Day Detail Display Card (Cloaked Squircle) */}
            <Reveal delay={120}>
              {(() => {
                const day = SPRINT_DAYS[activeDayIdx];
                return (
                  <div className="bg-paper-raised border border-rule-strong rounded-[28px] p-6 sm:p-10 shadow-sm relative overflow-hidden transition-all duration-300">
                    {/* Top Bar with Phase Badge and Owner */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-rule">
                      <span className="card-tag">
                        {day.day} · {day.phase.charAt(0) + day.phase.slice(1).toLowerCase()}
                      </span>
                      <div className="text-xs text-muted flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Owner: <strong className="text-ink font-medium">{day.owner}</strong></span>
                      </div>
                    </div>

                    {/* Headline and Details */}
                    <div className="mt-6">
                      <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium">
                        {day.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted mt-3 leading-relaxed">
                        {day.details}
                      </p>
                    </div>

                    {/* Milestone Deliverable Box */}
                    <div className="mt-8 p-5 rounded-[18px] bg-paper-sunken border border-rule-strong flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-semibold text-signal block">
                          Primary day deliverable
                        </span>
                        <strong className="text-ink text-sm sm:text-base block mt-0.5">
                          {day.deliverable}
                        </strong>
                      </div>
                      <span className="card-tag shrink-0">
                        Verified gate ✓
                      </span>
                    </div>

                    {/* Daily Checkpoints List */}
                    <div className="mt-6 pt-6 border-t border-rule">
                      <span className="text-xs font-semibold text-ink-muted block mb-3">
                        Day-specific checkpoints:
                      </span>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {day.checkpoints.map((cp) => (
                          <div
                            key={cp}
                            className="p-3 rounded-[14px] bg-paper border border-rule text-xs text-ink-soft flex items-start gap-2"
                          >
                            <span className="text-signal font-bold mt-0.5">✓</span>
                            <span>{cp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── Cinematic Dark Chapter: How Pricing Works ──────────── */}
      <section className="bg-ink text-paper py-20 md:py-28 relative overflow-hidden border-y border-white/10">
        <div
          aria-hidden="true"
          className="absolute -top-24 right-1/4 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none"
        />

        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-5">
              <span className="label text-signal-bright block mb-3">
                Pricing integrity
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-paper font-normal leading-tight">
                One number, agreed in writing,{' '}
                <em className="text-signal-bright italic font-medium">before anything starts.</em>
              </h2>
              <p className="text-on-ink-muted text-sm md:text-base leading-relaxed mt-6">
                We do not bill by the hour. You are quoted a single fixed figure for the scope, and
                that figure is what you pay — whether the build takes us four days or nine.
              </p>
              <div className="mt-8">
                <button
                  onClick={onBook}
                  className="bg-signal hover:bg-signal-bright text-paper text-xs md:text-sm font-medium px-6 py-3 rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Book 20-min Scope Call</span>
                  <span>→</span>
                </button>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'How it is set',
                    desc: 'From the scope agreed on the discovery call: the number of pages, custom features, and third-party integrations. Nothing else moves it.',
                    badge: 'Scope-based',
                  },
                  {
                    title: 'When it can change',
                    desc: 'Only if you explicitly request something outside the agreed written scope. We quote the addition separately and you decide before we build it.',
                    badge: 'Zero surprises',
                  },
                  {
                    title: 'How it is paid',
                    desc: 'Half to start the sprint, half on the day your website goes live in production. Never before.',
                    badge: '50 / 50 milestone',
                  },
                  {
                    title: 'What is never added',
                    desc: 'No setup fees, no per-page charges, no license fees, and zero charges for the revision rounds included in your scope.',
                    badge: 'Zero hidden fees',
                  },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-[24px] bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright mb-3">
                        {item.badge}
                      </span>
                      <h3 className="font-display text-xl text-paper font-medium mb-2">{item.title}</h3>
                      <p className="text-on-ink-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── What we don't do (Out of Scope) ─────────────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="label text-signal font-semibold block mb-2.5">
                Filtering the work
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                What we will turn down.
              </h2>
              <p className="text-muted text-base max-w-xl mx-auto mt-4">
                A studio that says yes to everything is telling you something about how carefully it says yes.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NOT_US.map((item, idx) => (
              <Reveal key={item.k} delay={idx * 60}>
                <div className="bg-paper-raised p-6 sm:p-8 rounded-[24px] border border-rule-strong shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <span className="card-tag mb-3">{item.pill}</span>
                    <h3 className="font-display text-xl text-ink font-medium mb-2">{item.k}</h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">{item.v}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── After launch ───────────────────────────────────────── */}
      <Section tone="sunk">
        <Shell>
          <Reveal>
            <SectionHead index="05" eyebrow="After launch" title="What happens once it is live." />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {ONGOING.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="bg-paper p-8 rounded-[24px] border border-rule-strong shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <span className="card-tag mb-3">
                      {item.badge}
                    </span>
                    <h3 className="font-display text-2xl text-ink font-medium mb-3">{item.title}</h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── Cloaked-Style Dual-Card Closing CTA ─────────────────── */}
      <section className="bg-ink text-paper py-20 border-t border-white/10">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-[32px] p-8 sm:p-12">
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <LogoMark size={48} />
                    <span className="font-display text-2xl text-paper font-medium">Uncoded Hub</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight">
                    Get the fixed number on the first call.<br />
                    <span className="text-signal-bright italic">Twenty minutes, no pitch deck.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    You leave with a clear scope, a defined price, and a contractual launch date — or an honest explanation if we're not the right studio.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-mono text-on-ink-muted">
                  <span>● Deepak & Geetha</span>
                  <span>·</span>
                  <span>Direct delivery</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-signal-bright uppercase tracking-wider block mb-2">
                    7-DAY COHORT RESERVATION
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Ready to define your build?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Book a free discovery call with Deepak & Geetha. Slots are scheduled in your local timezone.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onBook}
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Book a 20-Minute Discovery Call</span>
                    <span>→</span>
                  </button>
                  <Link
                    to="/portfolio"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Or test our 6 live demos first
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
