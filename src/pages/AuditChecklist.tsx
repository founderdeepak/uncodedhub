import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shell, Section, Reveal } from '../components/primitives';
import { LogoMark } from '../components/Logo';

interface AuditItem {
  id: number;
  title: string;
  question: string;
  guidance: string;
  action: string;
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: 1,
    title: 'The 5-Second Test',
    question: 'Does your homepage headline name your exact ideal client and their specific problem — or could it sit on any competitor\'s site with the logo swapped?',
    guidance: 'Weak: "Quality service, trusted by many." Strong: Names who this is for and what is actually broken in their situation right now.',
    action: 'Rewrite your homepage headline to name your exact ideal client and their specific problem.',
  },
  {
    id: 2,
    title: 'The Proof-Before-Promise Test',
    question: 'Do you show evidence a skeptical prospect can actually verify — a real process, a real guarantee, real work samples, a live demo — or do you mostly just claim to be good?',
    guidance: 'Claims are free. Anyone can write "quality craftsmanship." Verifiable specifics are what a burned-before buyer is actually scanning for.',
    action: 'Add one piece of real, checkable proof above the fold — a guarantee, a real number, or a live demo link.',
  },
  {
    id: 3,
    title: 'The Objection Pre-Empt Test',
    question: 'Does your site answer, unprompted, the 2–3 objections a serious prospect is silently thinking before they will message you (price uncertainty, delivery accountability, why you vs the cheaper option)?',
    guidance: 'If the only place objections get addressed is on a live call, you rely on prospects being brave enough to ask — most just leave quietly instead.',
    action: 'Write out your top 2–3 buyer objections and answer them directly on your primary service page.',
  },
  {
    id: 4,
    title: 'The Single Path Test',
    question: 'Is there one obvious next step on every page — or does a visitor have to figure out whether to call, email, fill a form, or DM you?',
    guidance: 'A confused visitor does not pick the "best" option. They pick none, and leave.',
    action: 'Pick ONE primary call-to-action on every page and remove competing, confusing options.',
  },
  {
    id: 5,
    title: 'The Zero-Friction Contact Test',
    question: 'Can a ready prospect reach you in one click — WhatsApp, a live booking calendar, a direct call button — or do they have to find a contact page and wait 24 hours?',
    guidance: 'Over 60% of mobile users contact businesses directly from instant links. Every extra step bleeds prospects who were already sold.',
    action: 'Add a 1-tap WhatsApp consultation or booking calendar link prominently on mobile screens.',
  },
  {
    id: 6,
    title: 'The Patience Test (Speed)',
    question: 'Does your site load in under ~2.5 seconds on a real phone connection — or have you actually timed it on Google PageSpeed Insights?',
    guidance: 'Bounce rates jump from roughly 9% to 38% once a page crosses 3 seconds. A slow site loses prospects before they have read a single word.',
    action: 'Test your site on PageSpeed Insights on mobile data. Eliminate bloated third-party plugins and oversized images.',
  },
  {
    id: 7,
    title: 'The Findability Test (Local SEO)',
    question: 'If someone is actively searching for exactly what you offer in your city or area — can they actually find you (Google Business Profile claimed and current, clean schema)?',
    guidance: 'Being world-class and being invisible produces the same revenue as being average and easy to find: none, from the people you never reached.',
    action: 'Claim and update your Google Business Profile with active photos, reviews, and services.',
  },
  {
    id: 8,
    title: 'The Risk-Reversal Test',
    question: 'Is there anything on your site that removes the prospect\'s risk of choosing wrong — a written guarantee, transparent conditions, a fixed-scope policy — or are they taking your word for it entirely?',
    guidance: 'The less risk a prospect feels, the less convincing you have to do on the call that follows.',
    action: 'Publish a clear guarantee, transparent milestone policy, or "on-time or free" commitment.',
  },
  {
    id: 9,
    title: 'The Outcome-Over-Feature Test',
    question: 'Does your copy talk mostly about what you do (deliverables, features, technical tools) — or about the outcome the client\'s own business feels afterward?',
    guidance: '"12-page website with contact form" is a feature. "Prospects stop disappearing after a discovery call" is an outcome. Prospects buy the second one.',
    action: 'Rewrite your top 3 service descriptions as customer outcomes rather than internal agency tasks.',
  },
  {
    id: 10,
    title: 'The Stranger Test',
    question: 'Can an objective person who has never met you review your homepage for 20 seconds and repeat back who it is for and why they would reach out in one sentence?',
    guidance: 'If they cannot, no amount of advertising traffic will fix that page. This is the single test everything else feeds into.',
    action: 'Hand your phone to someone outside your industry for 20 seconds and ask them what you sell and who it is for.',
  },
];

export default function AuditChecklist() {
  const [scores, setScores] = useState<Record<number, number>>({
    1: 1, 2: 1, 3: 0, 4: 1, 5: 1, 6: 1, 7: 1, 8: 0, 9: 1, 10: 1,
  });
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({});

  const setItemScore = (id: number, val: number) => {
    setScores((prev) => ({ ...prev, [id]: val }));
  };

  const toggleAction = (id: number) => {
    setCheckedActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const getScoreBand = (score: number) => {
    if (score <= 8) {
      return {
        label: 'Silent Loss Zone',
        color: 'text-signal',
        bg: 'bg-signal/10 border-signal/30',
        badge: 'Critical Trust Deficit',
        desc: 'Good, qualified prospects are almost certainly choosing competitors right now, and you have no way of knowing how many — because they never tell you, they just disappear silently.',
        priority: 'Start with Points #1, #2, and #5 immediately. Clarifying your headline and adding 1-tap WhatsApp will stop the worst bleed.',
      };
    }
    if (score <= 14) {
      return {
        label: 'Leaking, Not Broken',
        color: 'text-amber-600',
        bg: 'bg-amber-500/10 border-amber-500/30',
        badge: 'Conversion Gaps Identified',
        desc: 'Your site is doing some of the work, but specific, identifiable friction gaps are costing you bookings at exactly the moments that matter most.',
        priority: 'Focus on Points #3, #4, and #8. Pre-empt silent buyer objections and eliminate competing calls-to-action on your key pages.',
      };
    }
    return {
      label: 'Close to Your Ceiling',
      color: 'text-emerald-700',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      badge: 'High Conversion Read',
      desc: 'Your trust layer is largely working. The highest-leverage lever left is probably volume and reach, not the website\'s ability to convert visitors who already arrive.',
      priority: 'Refine Points #6 and #9. Focus on extreme mobile performance speeds and amplifying client outcome case studies.',
    };
  };

  const band = getScoreBand(totalScore);

  return (
    <>
      <Helmet>
        <title>The Pre-Sold Prospects Audit: 10-Point Trust Diagnostic | Uncoded Hub</title>
        <meta
          name="description"
          content="Score your website against the 10-point conversion and trust diagnostic Uncoded Hub runs for paying clients. Free interactive calculator & 20-minute action checklist."
        />
        <link rel="canonical" href="https://uncodedhub.com/audit-checklist" />
      </Helmet>

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="bg-paper border-b border-rule pt-28 pb-16 sm:pt-36 sm:pb-20">
        <Shell>
          <Reveal>
            <div className="max-w-3xl">
              <span className="label text-signal block mb-3 font-mono">
                Diagnostic Matrix · Self-Serve Version
              </span>
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-ink font-normal leading-[1.1] tracking-tight">
                The Pre-Sold Prospects Audit
              </h1>
              <p className="text-lead text-muted mt-5 max-w-2xl leading-relaxed">
                A 10-point diagnostic to find out how many good prospects your website is silently losing — before you lose another one. Built from the exact discovery process we run for every client.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
                <span className="flex items-center gap-1.5 text-ink font-medium">
                  <LogoMark size={16} />
                  <span>By Deepak &amp; Geetha · Uncoded Hub</span>
                </span>
                <span>·</span>
                <span>30–40 min review</span>
                <span>·</span>
                <span>Scored out of 20</span>
                <span>·</span>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 text-signal hover:underline cursor-pointer"
                >
                  ⎙ Print / Save as PDF
                </button>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Interactive Score Bar Sticky Header ───────────────────────── */}
      <div className="sticky top-16 z-30 bg-paper-raised/95 backdrop-blur-md border-b border-rule py-3.5 shadow-xs">
        <Shell>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-mono text-muted uppercase">Your Score:</span>
                <span className="font-display text-2xl font-bold text-ink">{totalScore}</span>
                <span className="text-xs font-mono text-muted">/ 20</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${band.bg} ${band.color}`}>
                {band.label}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-rule-strong text-xs font-mono text-ink hover:border-ink transition-colors"
              >
                <span>Save PDF</span>
              </button>
              <Link
                to="/contact"
                className="bg-signal hover:bg-signal-bright text-paper font-sans text-xs font-medium px-4 py-1.5 rounded-full transition-colors"
              >
                Review Score with Founders (20 min) →
              </Link>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── Diagnostic Matrix ────────────────────────────────────────── */}
      <Section tone="paper" size="default">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left: 10 Items */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border-b border-rule pb-4 mb-2">
                <h2 className="font-display text-xl text-ink font-medium">The 10 Forensic Trust Points</h2>
                <p className="text-xs text-muted mt-1">
                  Score each dimension honestly: <strong>0 (Missing)</strong>, <strong>1 (Attempted but weak)</strong>, or <strong>2 (Nailed)</strong>.
                </p>
              </div>

              {AUDIT_ITEMS.map((item) => {
                const current = scores[item.id] ?? 0;
                return (
                  <Reveal key={item.id}>
                    <div className="bg-paper-raised border border-rule-strong rounded-[20px] p-6 shadow-xs transition-all hover:border-ink/20">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-mono font-semibold text-signal uppercase tracking-wider block mb-1">
                            Point #{item.id}
                          </span>
                          <h3 className="font-display text-lg text-ink font-medium">
                            {item.title}
                          </h3>
                        </div>

                        {/* 0, 1, 2 Score Selector */}
                        <div className="inline-flex p-1 bg-paper rounded-full border border-rule-strong shrink-0">
                          {[
                            { val: 0, label: '0: Missing' },
                            { val: 1, label: '1: Weak' },
                            { val: 2, label: '2: Nailed' },
                          ].map((opt) => (
                            <button
                              key={opt.val}
                              type="button"
                              onClick={() => setItemScore(item.id, opt.val)}
                              className={`px-3 py-1 text-xs font-mono rounded-full transition-all cursor-pointer ${
                                current === opt.val
                                  ? 'bg-ink text-paper font-bold shadow-xs'
                                  : 'text-muted hover:text-ink'
                              }`}
                            >
                              {opt.label.split(':')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      <p className="text-ink text-sm leading-relaxed mt-3">
                        {item.question}
                      </p>

                      <div className="mt-4 p-3 bg-paper rounded-[12px] border border-rule text-xs text-muted leading-relaxed">
                        <strong className="text-ink font-medium">Evaluation benchmark: </strong>
                        {item.guidance}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Right: Score Summary & Action Plan Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-32 space-y-6">
                {/* Result Card */}
                <div className={`p-6 rounded-[24px] border ${band.bg}`}>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold block mb-1 text-muted">
                    Your Website Result
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-4xl font-normal text-ink">{totalScore}</span>
                    <span className="text-sm font-mono text-muted">/ 20 Points</span>
                  </div>
                  <h3 className={`font-display text-xl font-medium ${band.color} mb-3`}>
                    {band.label}
                  </h3>
                  <p className="text-ink text-xs leading-relaxed mb-4">
                    {band.desc}
                  </p>
                  <div className="p-3.5 bg-paper rounded-[12px] border border-rule text-xs text-ink">
                    <strong className="text-signal block mb-1">Recommended Next Move:</strong>
                    {band.priority}
                  </div>

                  <div className="mt-6 pt-4 border-t border-rule space-y-2.5">
                    <Link
                      to="/contact"
                      className="btn-primary w-full text-center text-xs py-3 rounded-full"
                    >
                      Book 20-Min Founder Review →
                    </Link>
                    <a
                      href={`https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I%20just%20scored%20${totalScore}/20%20on%20the%20Pre-Sold%20Prospects%20Audit.`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block text-center text-xs text-muted hover:text-ink font-mono py-1 transition-colors"
                    >
                      Send Score to WhatsApp (+91 86608 19023) →
                    </a>
                  </div>
                </div>

                {/* 20-Minute Action Checklist Box */}
                <div className="bg-paper-raised border border-rule-strong rounded-[24px] p-6 shadow-xs">
                  <h4 className="font-display text-base text-ink font-medium mb-1">
                    20-Minute Action Checklist
                  </h4>
                  <p className="text-[11px] text-muted mb-4">
                    One tactical fix per diagnostic point. Check them off as you execute:
                  </p>

                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {AUDIT_ITEMS.map((item) => {
                      const isDone = !!checkedActions[item.id];
                      return (
                        <label
                          key={item.id}
                          className="flex items-start gap-2.5 text-xs text-ink cursor-pointer hover:text-signal transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleAction(item.id)}
                            className="mt-0.5 rounded border-rule-strong text-signal focus:ring-signal"
                          />
                          <span className={isDone ? 'line-through text-muted' : 'leading-snug'}>
                            <strong>#{item.id}:</strong> {item.action}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </Section>

      {/* ── Closing Guarantee Banner ─────────────────────────────────── */}
      <section className="bg-ink text-paper py-20 border-t border-white/10">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center bg-white/[0.04] p-8 sm:p-12 rounded-[32px] border border-white/10">
              <div className="md:col-span-8">
                <span className="label text-signal-bright block mb-2 font-mono">
                  Fixed scope · 7-Day Sprint
                </span>
                <h3 className="font-display text-2xl sm:text-4xl text-paper font-normal leading-tight">
                  Want our team to rebuild your site against this 10-point standard?
                </h3>
                <p className="text-on-ink-muted text-sm leading-relaxed mt-3 max-w-xl">
                  Deepak writes the engineering, Geetha designs the interface. We launch verified high-converting sites in exactly 7 working days, with our late-means-free guarantee.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
                <Link
                  to="/contact"
                  className="bg-signal hover:bg-signal-bright text-paper font-medium text-sm py-3.5 px-6 rounded-full text-center transition-colors shadow-lg"
                >
                  Schedule Your 20-Min Slot →
                </Link>
                <Link
                  to="/portfolio"
                  className="border border-white/20 hover:border-white/40 text-paper text-xs py-3 px-6 rounded-full text-center font-mono transition-colors"
                >
                  Inspect Live Client Demos
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
