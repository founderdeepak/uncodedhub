import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { FaqAccordion } from '../components/ui/faq-accordion';
import { LeadMagnetForm } from '../components/ui/LeadMagnetForm';
import { FloatingLeadMagnetBanner } from '../components/ui/FloatingLeadMagnetBanner';
import {
  IconCompass,
  IconBrackets,
  IconLaunch,
  IconTimer,
  IconGauge,
  IconLayers,
  IconContrast,
  IconKeyboard,
  IconCode,
} from '../components/Glyphs';

/* ═══════════════════════════════════════════════════════════════════
   HOME

   Copy sourced from the completed Customer Saga Workbook
   (Customer Saga/uncodedhub_Full_copy.md) — every section below traces
   back to a specific workbook conclusion: the big bad (silent loss of
   good prospects), the ultimate want (pre-sold prospects), the
   objections (skepticism from being burned before), and the six
   commercial promises the whole offer is built on. Nothing here claims
   a track record, client count, or testimonial the studio doesn't have
   — proof is carried by the process, the standards, the guarantee, and
   the demo-before-payment model instead.
   ═══════════════════════════════════════════════════════════════════ */

const TRUST = [
  { k: 'Fixed price', v: 'Agreed before we start' },
  { k: 'Fixed timeline', v: 'Seven working days' },
  { k: 'Senior-only delivery', v: 'No account manager, no handoff' },
  { k: 'You own everything', v: 'Hosting, domain, code' },
];

/* The six niches, as a list rather than buried in a run-on sentence —
   this is the one place a visitor checks whether the studio works with
   businesses like theirs, so it has to be scannable in a glance. */
const NICHES = [
  'Interior designers & architects',
  'Real estate agents & builders',
  'Dental & aesthetic clinics',
  'Wedding photographers & event planners',
  'Home renovation & modular kitchen studios',
  'Coaches & consultants',
];

const SOLUTION_ITEMS = [
  {
    h: 'Built to earn trust',
    p: 'Your work gets the spotlight. We structure the site around the proof, positioning, and information a serious prospect needs before they’re ready to enquire.',
  },
  {
    h: 'Built without the usual uncertainty',
    p: 'You know the price before we start. You know the delivery date. You know what happens each day. And if we miss our agreed deadline under the guarantee terms, the build is free.',
  },
  {
    h: 'Built so you stay in control',
    p: 'Your hosting and domain are yours. Your enquiries go where you choose. And after launch, we show you how to manage your own content.',
  },
];

const BLUEPRINT = [
  {
    n: '01',
    title: 'Schedule your call',
    body: 'Book your FREE 20-minute call. Tell us what you do, who you want to attract, and what’s happening with your current online presence.',
    benefit: 'You leave with clarity on what you actually need.',
    Icon: IconCompass,
  },
  {
    n: '02',
    title: 'We build your site',
    body: 'We handle the copy, design, development, testing, and launch. Your price is agreed before we begin, your timeline is defined upfront, and you don’t have to manage a developer.',
    benefit: 'You know what you’re paying and when it’s going live.',
    Icon: IconBrackets,
  },
  {
    n: '03',
    title: 'Start winning better enquiries',
    body: 'Your new website gives serious prospects the proof and confidence they need before they reach out.',
    benefit: 'You spend less time convincing every lead from scratch.',
    Icon: IconLaunch,
  },
];

const FEATURES = [
  {
    h: 'Designed around your business',
    p: 'Every page is designed individually for your business — not dropped into a generic template. We write the copy from our discovery conversation, so you don’t have to figure out how to explain your value yourself.',
  },
  {
    h: 'Make it easy to enquire',
    p: 'Your website includes clear enquiry paths, WhatsApp click-to-chat, and booking or appointment flows where appropriate. Serious prospects don’t have to hunt for the next step.',
  },
  {
    h: 'Know what is actually working',
    p: 'Analytics and conversion goals are configured from the start, with essential on-page and local SEO groundwork included. You’ll know what your website is doing rather than simply having another online brochure.',
  },
  {
    h: 'No developer chasing',
    p: 'You get a published day-by-day schedule, a fixed price agreed before work begins, and a defined delivery window. You shouldn’t have to keep asking when your website will be finished.',
  },
  {
    h: 'Built to measurable standards',
    p: 'We work to stated performance and accessibility standards, including a sub-1.5-second load target, a 90+ Lighthouse target, and WCAG AA contrast and keyboard-accessibility requirements.',
  },
  {
    h: 'You own it',
    p: 'Your hosting and domain are registered in your own name. You can leave whenever you want. After launch, you get a recorded walkthrough so you can make your own content changes.',
  },
];

const PROOF_POINTS = [
  {
    h: 'And if we’re late?',
    p: 'Under the published guarantee terms, late means free.',
  },
  {
    h: 'Proof before purchase',
    p: 'As the five-niche rollout begins, we’ll build a live demo using your own logo and real business information — before you pay. You don’t have to believe we’re the right studio. You can see it.',
  },
];

const OBJECTIONS = [
  {
    q: '“Seven days sounds too fast.”',
    a: 'It isn’t an open-ended promise to build every possible website in seven days. The timeline is tied to a defined scope and a published process, so you know what happens, what we need from you, and when the site is expected to go live.',
  },
  {
    q: '“How do I know the price won’t change?”',
    a: 'You don’t have to guess. The price is agreed in writing before work begins. No hourly billing, setup fees, per-page charges, or licence fees.',
  },
  {
    q: '“What if you disappear halfway through?”',
    a: 'We’re the two people you meet and the two people who do the work. Geetha designs. Deepak builds. There’s no junior handoff or account manager standing between you and the people actually delivering the site.',
  },
  {
    q: '“What if I’ve already paid for a website that didn’t bring enquiries?”',
    a: 'That’s exactly why we don’t position this as simply a prettier website. The build is structured around helping serious prospects understand, trust, and contact your business before you have to personally convince them. We won’t promise a specific number of leads or sales — we will build the website to give those prospects a better reason to choose you.',
  },
  {
    q: '“You don’t have years of case studies in my industry.”',
    a: 'That’s true — and we’re not going to pretend otherwise. Instead, as we roll into each niche, you’ll be able to see a live working demo built around your own business before you pay. Judge the work. Don’t take our word for it.',
  },
  {
    q: '“Do I actually own the website?”',
    a: 'Yes. Your hosting and domain are registered in your own account. You’re not locked into us just to keep control of your website.',
  },
  {
    q: '“What if you’re late?”',
    a: 'That’s where the guarantee matters. Under the published guarantee terms, if we’re late, the build is free.',
  },
];

const PROMISES = [
  'A defined process',
  'A fixed price',
  'A defined timeline',
  'Measurable standards',
  'Direct delivery',
  'Client ownership',
  'Proof before purchase',
];

const OUTCOMES = [
  'Serious prospects arrive already convinced.',
  'Your growth relies less on personal selling.',
  'Your expertise gets the respect it deserves.',
  'Your website becomes an asset that keeps working for the business.',
];

const BUDGET = [
  { metric: 'Largest Contentful Paint', target: 'Under 1.5s on a 4G connection', value: '<1.5s', Icon: IconTimer },
  { metric: 'Lighthouse performance', target: '90 or above on mobile', value: '90+', Icon: IconGauge },
  { metric: 'Cumulative Layout Shift', target: 'Under 0.1', value: '<0.1', Icon: IconLayers },
  { metric: 'Colour contrast', target: 'WCAG AA on every text style', value: 'AA', Icon: IconContrast },
  { metric: 'Keyboard access', target: 'Every control reachable and visibly focused', value: '100%', Icon: IconKeyboard },
  { metric: 'Third-party scripts', target: 'None beyond analytics, unless you ask', value: '0', Icon: IconCode },
];

export default function Home({ onBook }: { onBook: () => void }) {
  return (
    <>
      <Helmet>
        <title>Uncoded Hub — Let Your Website Sell Before You Do</title>
        <meta
          name="description"
          content="Fixed-price, fixed-timeline websites for high-value businesses — interior designers, real estate agents, dental &amp; aesthetic clinics, wedding photographers, renovation studios, and coaches &amp; consultants. Live in seven working days, or the build is free."
        />
        <link rel="canonical" href="https://uncodedhub.com/" />
      </Helmet>

      {/* ── Hero ───────────────────────────────────────────────────
          Sized to fit one laptop screen. A visitor should be able to
          read what this is, who it is for, and what it costs them to
          find out — without scrolling once. Everything here is
          measured against that, which is why the headline is set at
          the scale it is and the image is capped rather than left to
          its natural aspect. */}
      <section id="hero" className="relative overflow-hidden pt-28 md:pt-32 pb-14 md:pb-16">
        <Shell>
          <Reveal>
            <p className="label text-signal">Websites for high-value local service businesses</p>
          </Reveal>

          <div className="mt-7 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
            <div className="lg:col-span-7">
              <Reveal delay={80}>
                <h1 className="font-display text-hero max-w-[17ch]">
                  Let your website <em className="italic hero-signal">sell before you do.</em>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-lead text-muted max-w-lg mt-6">
                  You do great work. Your website should make that obvious before a serious
                  prospect ever calls — at a fixed price, on a fixed timeline, with a real
                  late-means-free guarantee.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-7">
                  <button onClick={onBook} className="btn-primary">
                    Schedule my FREE 20-minute call
                  </button>
                  <Link to="/services" className="btn-ghost">
                    See what it costs
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={220} className="lg:col-span-5">
              <picture className="w-full h-56 sm:h-64 lg:h-80 block">
                <source media="(max-width: 767px)" srcSet="/hero-section-mobile.webp" />
                <img
                  src="/hero-section.webp"
                  alt="A business owner reviewing his newly redesigned website on a laptop, pleased with how it turned out"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-[70%_25%] grayscale border border-rule-strong"
                />
              </picture>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule mt-10">
              {TRUST.map((t) => (
                <div key={t.k} className="tile-hover bg-paper py-4 px-4 md:px-5">
                  <div className="tile-hover-accent text-[0.9375rem] font-medium">{t.k}</div>
                  <div className="label text-muted mt-1.5">{t.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── The problem ────────────────────────────────────────── */}
      <Section tone="ink" size="loose">
        <Shell width="narrow">
          <Reveal>
            <SectionHead
              index="01"
              eyebrow="The problem"
              inverted
              align="center"
              title="You shouldn't have to sell your business twice."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-14 space-y-6 text-center">
              <p className="text-lead text-on-ink-muted">
                Your work is good. Your prospects just don't get enough time to see it.
              </p>
              <p className="text-on-ink-muted leading-relaxed max-w-xl mx-auto">
                A serious buyer finds you on Google, Instagram, or a referral. Then they check your
                website. In a few seconds, they're deciding whether you look like the business they
                can trust with a high-value project.
              </p>
              <p className="text-on-ink-muted leading-relaxed max-w-xl mx-auto">
                If your site doesn't make that decision easy, they move on.
              </p>
              <p className="text-on-ink-muted leading-relaxed max-w-xl mx-auto">
                You never hear the rejection. You don't know what you lost. And you end up spending
                more of your own time chasing, explaining, and convincing the people who do
                enquire.
              </p>
            </div>
          </Reveal>
          <Reveal delay={130}>
            <picture className="mt-12 w-full h-64 md:h-80 block">
              <source media="(max-width: 767px)" srcSet="/problem-mobile.webp" />
              <img
                src="/problem.webp"
                alt="A business owner overwhelmed by unanswered enquiries arriving across WhatsApp, email, Instagram, and missed calls, unable to keep up with them all"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top grayscale border border-rule-on-ink"
              />
            </picture>
            <p className="label text-on-ink-muted mt-4 text-center">
              What it feels like when the enquiries you wanted arrive faster than you can answer them
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead mt-14 text-center max-w-2xl mx-auto">
              We know how frustrating it is to watch serious prospects disappear without ever
              knowing why — especially when you've built genuinely great work. We've seen
              firsthand how often the first few seconds online decide whether they ever give you
              the chance to prove it.
            </p>
          </Reveal>
        </Shell>
      </Section>

      {/* ── The solution ───────────────────────────────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="02"
              eyebrow="What we believe"
              title="Your website should make the quality of your work impossible to miss."
              intro={
                <>
                  Not force you to compete with businesses that simply look better online. It
                  should make the right prospect think, <em className="italic">"These are the
                  people I want to work with."</em>
                </>
              }
            />
          </Reveal>

          {/* Image and the who-we-build-for list sit side by side: it
              splits what was one dense left-aligned block into two
              scannable halves, and lets the image run at its own 3:2
              aspect in a narrower column — shown whole, never cropped. */}
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center mt-14">
            <Reveal delay={120} className="lg:col-span-6">
              <picture className="w-full aspect-[3/2] block">
                <source media="(max-width: 767px)" srcSet="/our-service-mobile.webp" />
                <img
                  src="/our-service.webp"
                  alt="A responsive website design shown across a desktop monitor, laptop, tablet, and phone"
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale border border-rule"
                />
              </picture>
              <p className="label text-muted mt-4">
                One design, considered at every width your prospects actually use
              </p>
            </Reveal>

            <Reveal delay={180} className="lg:col-span-6">
              <span className="label text-signal">Who we build for</span>
              <ul className="mt-6 border-t border-rule">
                {NICHES.map((n) => (
                  <li
                    key={n}
                    className="flex items-baseline gap-4 py-3.5 border-b border-rule text-[0.9375rem]"
                  >
                    <span className="text-signal shrink-0" aria-hidden="true">
                      —
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
              <p className="text-muted leading-relaxed mt-7">
                We handle the strategy, copy, design, development, conversion paths, and
                local-search groundwork — so your website does the convincing before you have to.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-rule mt-16 border border-rule">
            {SOLUTION_ITEMS.map((item, i) => (
              <Reveal key={item.h} delay={i * 80} className="bg-paper-raised p-8 md:p-10 card-lift">
                <span className="label text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-title mt-6">{item.h}</h3>
                <p className="text-ink-soft leading-relaxed mt-5">{item.p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220}>
            <p className="text-lead mt-16 text-center max-w-2xl mx-auto">
              We don't ask you to take our word for it — we show you exactly what you're getting,
              build it with you directly, and put our seven-day delivery promise behind a real
              "late means free" guarantee.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="font-display text-title mt-8 text-center">
              The goal isn't another website. It's fewer prospects you have to convince from
              scratch.
            </p>
          </Reveal>
        </Shell>
      </Section>

      {/* ── The Better Enquiry Blueprint ───────────────────────── */}
      <Section tone="sunk" size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="03"
              eyebrow="The process"
              title="The Better Enquiry Blueprint."
              intro="Three steps, published in full — the client's-eye view, not the internal production schedule."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-rule-strong mt-16 border border-rule-strong">
            {BLUEPRINT.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} className="bg-paper p-8 md:p-10 card-lift">
                <div className="flex items-center justify-between">
                  <span className="label text-signal">{s.n}</span>
                  <s.Icon className="w-6 h-6 text-muted" />
                </div>
                <h3 className="font-display text-title mt-6">{s.title}</h3>
                <p className="text-muted leading-relaxed mt-5">{s.body}</p>
                <p className="text-[0.9375rem] font-medium mt-6 pt-5 border-t border-rule">
                  {s.benefit}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={280}>
            <p className="label text-center mt-14">
              Fixed price · Fixed timeline · Built by us · Owned by you
            </p>
          </Reveal>
        </Shell>
      </Section>

      {/* ── The guarantee, with its actual terms ───────────────── */}
      <Section tone="sunk" size="default">
        <Shell width="narrow">
          <Reveal className="text-center">
            <picture className="w-full max-w-lg mx-auto block">
              <source media="(max-width: 767px)" srcSet="/guarantee-mobile.webp" />
              <img
                src="/guarantee.webp"
                alt="Uncoded Hub's seven-day delivery guarantee certificate: on time or free, signed by Deepak and Geetha"
                width={1200}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-auto border border-rule"
              />
            </picture>
          </Reveal>
          <Reveal delay={60}>
            <SectionHead
              index="04"
              eyebrow="The guarantee"
              align="center"
              title="If we are late, you do not pay."
            />
          </Reveal>

          <Reveal delay={100}>
            <p className="text-lead text-muted mt-8 text-center">
              Not a discount, not a credit toward future work. If your site is not live by the end
              of day seven, the build is free and you keep it.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-14 bg-paper-raised border border-rule p-8 md:p-10">
              <span className="label text-muted">The conditions, in full</span>
              <ul className="mt-6 space-y-4">
                {[
                  'The seven days start the morning after the discovery call, once we have your brand assets and domain access.',
                  'If we are waiting on feedback or content from you, the clock pauses. It restarts when we hear back.',
                  'It covers the scope agreed in writing before we start. New pages or features requested mid-build are quoted separately and do not count against the guarantee.',
                  'It is our deadline, not a rush job. If your project genuinely needs longer than a week, we will tell you that on the call rather than take the work.',
                ].map((c, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="label text-signal pt-1.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-ink-soft leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* ── Features & proof ───────────────────────────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="05"
              eyebrow="Built for you"
              title="Built around what matters to you."
              intro="A website shouldn't create another job for the business owner. It should remove work, uncertainty, and friction."
            />
          </Reveal>
          <div className="mt-16 border-t border-rule-strong">
            {FEATURES.map((f, i) => (
              <Reveal
                key={f.h}
                delay={i * 50}
                className="grid md:grid-cols-12 gap-x-10 gap-y-2 py-7 border-b border-rule"
              >
                <h3 className="md:col-span-4 text-lead font-medium">{f.h}</h3>
                <p className="md:col-span-8 text-muted leading-relaxed">{f.p}</p>
              </Reveal>
            ))}
          </div>

          {/* The guarantee and the pre-purchase demo are the two strongest
              proof points the offer has — a young studio's credibility
              rests on them more than on any sentence about them, so they
              get visual weight the rest of the list doesn't. */}
          <div className="grid md:grid-cols-2 gap-px bg-ink mt-px border border-ink">
            {PROOF_POINTS.map((f, i) => (
              <Reveal key={f.h} delay={i * 70} className="bg-ink p-8 md:p-10 card-lift-inv">
                <h3 className="font-display text-title text-signal-bright">{f.h}</h3>
                <p className="text-on-ink-muted leading-relaxed mt-4">{f.p}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── Standards ──────────────────────────────────────────── */}
      <Section tone="sunk" size="loose">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHead
                index="06"
                eyebrow="Standards"
                title="The numbers we hold ourselves to."
              />
              <p className="text-muted leading-relaxed mt-8">
                We are a young studio, so we are not going to show you a wall of borrowed logos.
                What we can do is publish the standard every site we ship has to meet, and invite
                you to test this page against it right now.
              </p>
              <p className="text-muted leading-relaxed mt-5">
                Open your browser's developer tools, run Lighthouse on this page, and check the
                numbers yourself. That is a more useful signal than anything we could write here.
              </p>
              <div className="mt-10">
                <Link to="/portfolio" className="link-underline text-ink">
                  How we prove it without a portfolio →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-rule border border-rule mb-10">
                {BUDGET.map((b) => (
                  <div key={b.metric} className="tile-hover bg-paper-raised p-5">
                    <b.Icon className="tile-hover-accent w-6 h-6 text-signal" />
                    <span className="font-display text-title block mt-4">{b.value}</span>
                    <span className="text-xs text-muted leading-snug block mt-1">{b.metric}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-rule-strong">
                {BUDGET.map((b) => (
                  <div
                    key={b.metric}
                    className="row-hover grid grid-cols-[2fr_3fr] gap-6 py-5 px-2 -mx-2 border-b border-rule items-center"
                  >
                    <div className="text-[0.9375rem] font-medium">{b.metric}</div>
                    <div className="font-mono text-[0.8125rem] text-muted text-right text-balance">
                      {b.target}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── Objections & trust ─────────────────────────────────── */}
      <Section tone="ink" size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="07"
              eyebrow="Worth asking"
              inverted
              title="Still wondering if this will actually work?"
              intro="Good. You should be careful about who you trust with your business."
            />
          </Reveal>
          <div className="mt-16 border-t border-rule-on-ink">
            {OBJECTIONS.map((o, i) => (
              <Reveal
                key={o.q}
                delay={i * 50}
                className="grid md:grid-cols-12 gap-x-10 gap-y-3 py-7 border-b border-rule-on-ink"
              >
                <h3 className="md:col-span-4 text-lead font-medium">{o.q}</h3>
                <p className="md:col-span-8 text-on-ink-muted leading-relaxed">{o.a}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={380}>
            <div className="mt-14 bg-ink p-8 md:p-10 border border-rule-on-ink">
              <span className="label text-signal-bright">No empty promises</span>
              <p className="text-on-ink-muted leading-relaxed mt-4 max-w-2xl">
                We don't have testimonials to manufacture or impressive numbers to put on a page
                just because they look reassuring. Instead, we show you what can actually be
                checked.
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2 mt-6" aria-hidden="false">
                {PROMISES.map((p, i) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="label text-on-ink">{p}</span>
                    {i < PROMISES.length - 1 && (
                      <span className="w-1 h-1 rounded-full bg-rule-on-ink" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* ── Stakes → positive transformation ───────────────────── */}
      <Section size="loose">
        <Shell width="narrow">
          <Reveal>
            <SectionHead
              index="08"
              eyebrow="What happens next"
              align="center"
              title="Every month you wait, the same prospects are still choosing."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 space-y-5 text-center">
              <p className="text-lead text-muted">Doing nothing doesn't make the problem disappear.</p>
              <p className="text-muted leading-relaxed max-w-xl mx-auto">
                The serious prospect who finds you online is still deciding between you and your
                competitors. If your website doesn't give them enough reason to trust you, they can
                choose someone else before you ever get the chance to speak.
              </p>
              <p className="text-muted leading-relaxed max-w-xl mx-auto">
                And your personal selling remains the ceiling. More growth means more chasing. More
                explaining. More follow-ups. More time away from the work you're actually good at.
              </p>
            </div>
          </Reveal>

        </Shell>

        {/* Shown whole and uncropped, at its own 3:2 aspect. A wider
            full-bleed crop looked more dramatic but sliced both faces
            out of frame — and this image only works if you can read the
            two panels against each other, which is the comparison the
            copy either side of it is making. */}
        <Reveal delay={150}>
          <div className="px-6 md:px-10">
            <picture className="mt-14 w-full max-w-3xl mx-auto aspect-[3/2] block">
              <source media="(max-width: 767px)" srcSet="/before-after-mobile.webp" />
              <img
                src="/before-after.webp"
                alt="Before: a business owner overwhelmed by scattered enquiries piling up. After: the same business owner, relaxed, with a website doing the work for him"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale border border-rule-strong"
              />
            </picture>
            <p className="label text-muted mt-4 text-center">
              The same business, on either side of one working website
            </p>
          </div>
        </Reveal>

        <Shell width="narrow">
          <Reveal delay={180}>
            <div className="mt-16 text-center">
              <p className="text-lead max-w-xl mx-auto">
                Here's what changes once your website is actually doing that job: the right
                prospects find you and understand your value before they ever contact you. They've
                seen the work. They understand what you do. They already trust what they're
                seeing.
              </p>
              <p className="font-display text-title mt-10 max-w-lg mx-auto">
                You're no longer starting with "Let me convince you." You're starting with "Let's
                see if we're the right fit."
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-16 space-y-3 text-center">
              {OUTCOMES.map((o) => (
                <p key={o} className="font-display text-title">
                  {o}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="font-display text-display mt-16 text-center">A better first conversation.</p>
          </Reveal>
        </Shell>
      </Section>

      {/* ── Studio ─────────────────────────────────────────────── */}
      <Section tone="sunk">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <Reveal className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-rule-strong border border-rule-strong">
                <picture className="w-full aspect-[3/4] block">
                  <source media="(max-width: 767px)" srcSet="/deepak-mobile.webp" />
                  <img
                    src="/deepak.webp"
                    alt="Deepak, co-founder"
                    width={540}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    className="photo-hover w-full h-full object-cover bg-paper grayscale"
                  />
                </picture>
                <picture className="w-full aspect-[3/4] block">
                  <source media="(max-width: 767px)" srcSet="/geetha-mobile.webp" />
                  <img
                    src="/geetha.webp"
                    alt="Geetha, co-founder"
                    width={700}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    className="photo-hover w-full h-full object-cover object-top bg-paper grayscale"
                  />
                </picture>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <SectionHead index="09" eyebrow="The studio" title="Two people. Both of them on your project." />
              <p className="text-muted leading-relaxed mt-8 max-w-xl">
                We are Deepak and Geetha, a brother and sister running a two-person studio out of
                Bengaluru. Geetha designs, Deepak builds, and the person you meet on the discovery
                call is the person who does the work. There is no account manager between you and
                the people making decisions about your site, because at two people there is no room
                for one.
              </p>
              <p className="text-muted leading-relaxed mt-5 max-w-xl">
                It also means we take on a limited number of builds at a time. That is a real
                constraint, not a scarcity tactic.
              </p>
              <div className="mt-10">
                <Link to="/about" className="link-underline text-ink">
                  More about how we work →
                </Link>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <Section>
        <Shell width="narrow">
          <Reveal>
            <SectionHead index="10" eyebrow="Questions" title="Asked before every project." />
          </Reveal>
          <div className="mt-16">
            <FaqAccordion />
          </div>
        </Shell>
      </Section>

      {/* ── Lead magnet ────────────────────────────────────────── */}
      <Section id="lead-magnet" tone="ink" size="default">
        <Shell>
          {/* Header */}
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="label text-signal-bright">11</span>
              <span className="label text-on-ink-muted">Free resource</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-8 items-end mb-14">
              <h2 className="font-display text-display text-on-ink">
                Score your own site.<br />
                <em>Before</em> you book a call.
              </h2>
              <p className="text-lead text-on-ink-muted leading-relaxed">
                The Pre-Sold Prospects Audit — the same 10-point trust diagnostic we run for every client, now in your hands.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* LEFT: Cover mock + bullet benefits */}
            <Reveal className="lg:col-span-5 flex flex-col gap-8">

              {/* Book cover card */}
              <div className="relative bg-ink-raised border border-rule-on-ink rounded-[4px] overflow-hidden flex items-center justify-center p-8 aspect-[4/3]">
                {/* Subtle radial glow behind cover */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 60% 40%, rgba(219,10,84,0.18) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Mock audit document */}
                <div className="relative z-10 w-52 bg-paper rounded-[3px] shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                  {/* Doc header strip */}
                  <div className="bg-signal px-4 py-2.5">
                    <p className="label text-paper text-[0.55rem] leading-snug">Uncoded Hub</p>
                    <p className="font-sans font-semibold text-paper text-[0.72rem] leading-tight mt-0.5">Pre-Sold Prospects Audit</p>
                  </div>
                  <img
                    src="/audit-cover.jpg"
                    alt="Pre-Sold Prospects Audit cover illustration"
                    className="w-full object-cover"
                    width={208}
                    height={156}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Doc footer strip */}
                  <div className="px-4 py-2 border-t border-rule">
                    <p className="label text-muted text-[0.55rem]">10-point trust diagnostic · Free</p>
                  </div>
                </div>

                {/* FREE badge */}
                <div className="absolute top-4 right-4 bg-signal text-paper label text-[0.6rem] px-2.5 py-1 rounded-[2px] shadow-md">
                  FREE
                </div>
              </div>

              {/* What you get */}
              <div>
                <p className="label text-on-ink-muted mb-5">What's inside</p>
                <ul className="space-y-3.5">
                  {[
                    { label: 'The 10-point trust test', sub: 'We score every client site against this before we start.' },
                    { label: 'Your scoring band', sub: 'Silent Loss, Leaking, or Near Your Ceiling.' },
                    { label: 'The silent objections', sub: 'What a skeptical prospect thinks before they message you.' },
                    { label: '20-minute action checklist', sub: 'One fix per point, ordered by where you scored lowest.' },
                  ].map(({ label, sub }) => (
                    <li key={label} className="flex gap-3 items-start">
                      <span
                        aria-hidden="true"
                        className="shrink-0 mt-0.5 w-4 h-4 rounded-full border border-signal flex items-center justify-center"
                        style={{ color: 'var(--color-signal-bright)' }}
                      >
                        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" aria-hidden="true">
                          <path d="M1 3.5L3 5.5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>
                        <span className="text-on-ink text-[0.9375rem] font-medium leading-snug">{label}</span>
                        <span className="text-on-ink-muted text-[0.8125rem] leading-relaxed block mt-0.5">{sub}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* RIGHT: Form card */}
            <Reveal delay={120} className="lg:col-span-7">
              <div className="bg-paper-raised border border-rule-strong rounded-[4px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                {/* Form card header */}
                <div className="bg-signal px-6 md:px-8 py-4 flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M9 2L10.854 6.764L16 7.09L12.2 10.526L13.416 16L9 13.2L4.584 16L5.8 10.526L2 7.09L7.146 6.764L9 2Z" fill="white"/>
                  </svg>
                  <p className="font-sans font-semibold text-paper text-[0.9375rem] leading-tight">
                    Get the free audit — land in your inbox in minutes
                  </p>
                </div>

                {/* Form body */}
                <div className="px-6 md:px-8 py-6 md:py-8">
                  <LeadMagnetForm embedded />
                </div>
              </div>

              {/* Trust signals below form */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 px-1">
                {[
                  'No spam, ever',
                  'Instant delivery',
                  'Unsubscribe anytime',
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 label text-on-ink-muted">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeOpacity="0.5"/>
                      <path d="M2.5 5L4 6.5L7.5 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── Close ──────────────────────────────────────────────── */}
      <Section tone="sunk" size="loose">
        <Shell width="narrow" className="text-center">
          <Reveal>
            <h2 className="font-display text-display">
              Let your website start selling before you do.
            </h2>
            <p className="text-lead text-muted mt-8 max-w-xl mx-auto">
              No deck and no pitch. We ask what your business does, look at what you have now, and
              tell you plainly whether we can help — including when the answer is no.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <button onClick={onBook} className="btn-primary">
                Schedule my FREE 20-minute call
              </button>
              <Link to="/contact" className="btn-ghost">
                Send a brief instead
              </Link>
            </div>
            <p className="label text-muted mt-10">
              Free · No obligation · We reply within one working day
            </p>
          </Reveal>
        </Shell>
      </Section>

      <FloatingLeadMagnetBanner />
    </>
  );
}
