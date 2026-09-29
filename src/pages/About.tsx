import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   STUDIO (ABOUT)
   Cloaked-inspired design:
   - High-contrast editorial hero with announcement badge
   - Rounded squircle founder cards (rounded-[28px])
   - Cinematic dark chapter: "Who Does What" (Deepak & Geetha)
   - 4 Commitments in squircle bento blocks
   - Colophon & dual-card closing CTA module
   ═══════════════════════════════════════════════════════════════════ */

const COMMITMENTS = [
  {
    n: '01',
    h: 'We will tell you when you do not need us',
    p: 'If a one-page site does what a five-page site would have done, we will quote the one-page site. We would rather have the smaller invoice and the glowing reference than the larger invoice and a client who worked out later that they overbought.',
    badge: 'Honest Scoping',
  },
  {
    n: '02',
    h: 'The people on the call are the people doing the work',
    p: 'There is no hidden junior team behind us that you have not met. Two founders, both on every project. This limits how much work we can take, and we would rather be the studio that is booked out than the one that quietly subcontracts.',
    badge: 'Senior Delivery',
  },
  {
    n: '03',
    h: 'You own everything, including the exit',
    p: 'The domain, the hosting account, the code, the content. Set up in your own name from day one. If you want to move to another studio in a year, nothing here is designed to make that expensive or difficult.',
    badge: 'Total Freedom',
  },
  {
    n: '04',
    h: 'We will not invent numbers to sell you',
    p: 'No borrowed logos, no case studies from clients we never had, no conversion percentages we cannot produce an analytics screenshot for. This is a low bar, and a surprising number of agencies do not clear it.',
    badge: 'Verified Truth',
  },
];

export default function About({ onBook }: { onBook: () => void }) {
  return (
    <>
      <Helmet>
        <title>Studio — Uncoded Hub</title>
        <meta
          name="description"
          content="A two-person web design and development studio in Bengaluru. Who does the work, how we work, and what we commit to before you hire us."
        />
        <link rel="canonical" href="https://uncodedhub.com/about" />
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="pt-10 md:pt-16 pb-14">
        <Shell>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-raised border border-rule-strong text-ink text-xs font-mono mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-signal" aria-hidden="true" />
              <span className="font-semibold text-signal">THE STUDIO</span>
              <span className="text-muted">·</span>
              <span className="text-muted">Deepak & Geetha</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink max-w-[17ch] leading-[1.08] tracking-tight">
              Two people, one week at a time, in{' '}
              <em className="italic hero-signal font-normal">Bengaluru.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-6 max-w-2xl leading-relaxed">
              Uncoded Hub is a brother and sister who got tired of watching competent, high-quality businesses
              lose work to worse competitors simply because the competitor had a faster, clearer website.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── Origin / Why this exists ────────────────────────────── */}
      <Section size="default">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Dual Founder Squircle Cards */}
            <Reveal className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[24px] overflow-hidden border border-rule-strong bg-paper-raised shadow-sm">
                  <picture className="w-full aspect-[3/4] block">
                    <source media="(max-width: 767px)" srcSet="/deepak-mobile.webp" />
                    <img
                      src="/deepak.webp"
                      alt="Deepak, co-founder"
                      width={540}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="photo-hover w-full h-full object-cover grayscale"
                    />
                  </picture>
                  <div className="p-3 text-center border-t border-rule bg-paper">
                    <strong className="text-xs text-ink block font-sans">Deepak</strong>
                    <span className="text-[10px] text-muted font-mono">Engineering</span>
                  </div>
                </div>

                <div className="rounded-[24px] overflow-hidden border border-rule-strong bg-paper-raised shadow-sm">
                  <picture className="w-full aspect-[3/4] block">
                    <source media="(max-width: 767px)" srcSet="/geetha-mobile.webp" />
                    <img
                      src="/geetha.webp"
                      alt="Geetha, co-founder"
                      width={700}
                      height={700}
                      loading="lazy"
                      decoding="async"
                      className="photo-hover w-full h-full object-cover object-top grayscale"
                    />
                  </picture>
                  <div className="p-3 text-center border-t border-rule bg-paper">
                    <strong className="text-xs text-ink block font-sans">Geetha</strong>
                    <span className="text-[10px] text-muted font-mono">Design & Copy</span>
                  </div>
                </div>
              </div>
              <p className="label text-muted mt-4 text-center">Deepak &amp; Geetha · Working Remotely Worldwide</p>
            </Reveal>

            {/* Right: Narrative */}
            <Reveal delay={100} className="lg:col-span-7">
              <span className="label text-signal font-semibold uppercase tracking-wider block mb-2">
                01 · THE ORIGIN
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight mb-6">
                The same failure, over and over.
              </h2>
              <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                <p>
                  The pattern was always identical. A business that genuinely knew what it was doing —
                  a clinic, an architecture firm, a renovation contractor with twenty years behind it —
                  losing high-ticket enquiries to a younger competitor. Not because the competitor was
                  better. Because their site loaded in one second and clearly stated what they did in the first sentence.
                </p>
                <p>
                  A proper website from a traditional agency took three months and cost more than most
                  businesses could justify. So they bought a bloated WordPress template and let it rot.
                </p>
                <p>
                  We built Uncoded Hub to eliminate that trade-off: agency-grade design and engineering,
                  delivered in seven working days at a transparent, fixed price.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── Cinematic Dark Chapter: Who Does What ───────────────── */}
      <section className="bg-ink text-paper py-20 md:py-28 relative overflow-hidden border-y border-white/10">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/3 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none"
        />

        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-signal-bright text-xs font-mono mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
                SENIOR CRAFT
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-paper font-normal leading-tight">
                Design and engineering,{' '}
                <span className="text-signal-bright italic font-normal">split cleanly.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Deepak */}
            <Reveal>
              <div className="p-8 sm:p-10 rounded-[28px] bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-signal-bright font-mono text-xs font-semibold uppercase tracking-wider">
                      Co-founder · Engineering
                    </span>
                    <span className="text-[10px] font-mono text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">
                      Build & Architecture
                    </span>
                  </div>
                  <h3 className="font-display text-3xl text-paper font-medium mb-4">Deepak</h3>
                  <div className="space-y-4 text-on-ink-muted text-xs sm:text-sm leading-relaxed">
                    <p>
                      Runs discovery, information architecture, performance engineering, and full deployment.
                      He is the one who decides how your site is structured, what it is built with, and why it scores 99+ on Lighthouse.
                    </p>
                    <p>
                      His working principle: a website that does not bring you business is a digital brochure
                      you are paying hosting for. Every line of code gets measured against whether it moves a client closer to enquiring.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[11px] font-mono text-white/60 block mb-1">Away from the desk:</span>
                  <p className="text-xs text-paper/80 leading-relaxed">
                    Climbed Velliangiri alone, slept on the hill, and reached the summit at dawn. Holds that the most useful decisions arrive in silence rather than in spreadsheets.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Geetha */}
            <Reveal delay={100}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-signal-bright font-mono text-xs font-semibold uppercase tracking-wider">
                      Co-founder · Design
                    </span>
                    <span className="text-[10px] font-mono text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">
                      Visuals & Copy
                    </span>
                  </div>
                  <h3 className="font-display text-3xl text-paper font-medium mb-4">Geetha</h3>
                  <div className="space-y-4 text-on-ink-muted text-xs sm:text-sm leading-relaxed">
                    <p>
                      Runs brand positioning, typographic hierarchy, responsive pacing, and turnkey copy.
                      She shapes the hundred small visual signals that tell a prospective client whether a business is trustworthy before they have read a single paragraph.
                    </p>
                    <p>
                      Her working principle: design is not decoration, it is persuasion. If a layout cannot explain why it is arranged the way it is, it gets redesigned until it can.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[11px] font-mono text-white/60 block mb-1">Away from the desk:</span>
                  <p className="text-xs text-paper/80 leading-relaxed">
                    The calmest person in any project channel, which turns out to be a remarkably useful professional trait when a live launch is 48 hours away.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── Commitments Bento Cards ──────────────────────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="label text-signal font-semibold uppercase tracking-wider block mb-2">
                03 · CONTRACTUAL TRUTH
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                Four commitments we hold to.
              </h2>
              <p className="text-muted text-base max-w-xl mx-auto mt-4">
                Not empty values. Values are free. These are the commitments that hold us accountable.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.n} delay={i * 70}>
                <div className="bg-paper-raised p-8 rounded-[24px] border border-rule-strong shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-full bg-signal/10 text-signal font-mono font-bold text-xs flex items-center justify-center">
                        {c.n}
                      </span>
                      <span className="text-[10px] font-mono text-signal bg-signal-wash px-2.5 py-0.5 rounded-full border border-signal/20">
                        {c.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-ink font-medium mb-3">{c.h}</h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">{c.p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── Colophon ─────────────────────────────────────────────── */}
      <Section tone="sunk" size="default">
        <Shell width="narrow">
          <Reveal>
            <div className="text-center border-t border-rule-strong pt-14">
              <span className="label text-muted">Colophon</span>
              <p className="font-display text-2xl sm:text-3xl text-ink mt-8 leading-[1.35]">
                என் செயலாவது யாதொன்றும் இல்லை — இனித் தெய்வமே உன்செயலே என்று உணரப் பெற்றேன்
              </p>
              <div className="w-10 h-px bg-signal mx-auto my-6" />
              <p className="text-muted italic text-sm leading-relaxed max-w-lg mx-auto">
                “I have realised that nothing I do is truly mine. From now on, O God — everything
                that happens is only Your doing.”
              </p>
              <p className="text-muted text-xs leading-relaxed mt-6 max-w-lg mx-auto">
                We are grateful for the work, and we strive to be worthy of it on every project.
              </p>
            </div>
          </Reveal>
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
                    Come and ask us anything.<br />
                    <span className="text-signal-bright italic">Direct conversation with Deepak & Geetha.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    Twenty minutes with the two people who will write, design, and code your website. No intermediate account managers.
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
                    CO-FOUNDER DISCOVERY
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Let's see if we're the right fit.
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Book a free discovery call. If we think a week is the wrong shape for your build, that's where we say so.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onBook}
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Schedule 20-Minute Call</span>
                    <span>→</span>
                  </button>
                  <Link
                    to="/portfolio"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Or explore our 6 interactive demos
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
