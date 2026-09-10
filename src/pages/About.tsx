import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';

/* ═══════════════════════════════════════════════════════════════════
   STUDIO

   Two notes on what changed here.

   1. The six "What We Stand For" cards — Speed Without Compromise,
      Transparency & Honesty, Continuous Learning, and so on — were
      removed. Values nobody would ever claim the opposite of are not
      positioning; they are filler, and a page of them is one of the
      clearest signals that copy was generated rather than decided.
      What replaces them are commitments that cost something to make.

   2. The devotional card that opened the founders grid, headed "GOD /
      The True Founder of Uncoded Hub", has been kept but moved. It sat
      above and larger than both founder profiles, which put a visitor's
      first encounter with the studio's faith ahead of any information
      about who does the work. It now closes the page as a colophon,
      which is where a personal statement of this kind carries weight
      without standing between a prospect and the sale. The wording is
      untouched — only the placement and the scale changed.
   ═══════════════════════════════════════════════════════════════════ */

const COMMITMENTS = [
  {
    n: '01',
    h: 'We will tell you when you do not need us',
    p: 'If a one-page site does what a five-page site would have done, we will quote the one-page site. We would rather have the smaller invoice and the reference than the larger invoice and a client who worked out later that they overbought.',
  },
  {
    n: '02',
    h: 'The people on the call are the people doing the work',
    p: 'There is no team behind us that you have not met. Two founders, both on every project. This limits how much work we can take, and we would rather be the studio that is booked out than the one that quietly subcontracts.',
  },
  {
    n: '03',
    h: 'You own everything, including the exit',
    p: 'The domain, the hosting account, the code, the content. Set up in your name from day one. If you want to move to another studio in a year, nothing here is designed to make that expensive.',
  },
  {
    n: '04',
    h: 'We will not invent numbers to sell you',
    p: 'No borrowed logos, no case studies from clients we never had, no conversion percentages we cannot produce an analytics screenshot for. This is a low bar, and a surprising number of studios at our stage do not clear it.',
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
      <section className="pt-36 md:pt-44 pb-16">
        <Shell>
          <Reveal>
            <p className="label text-signal">Studio</p>
            <h1 className="font-display text-hero mt-8 max-w-[16ch]">
              Two people, one week at a time, in <em className="italic hero-signal">Bengaluru.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-10 max-w-2xl">
              Uncoded Hub is a brother and sister who got tired of watching competent businesses
              lose work to worse competitors with better websites.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── Origin ─────────────────────────────────────────────── */}
      <Section size="default">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <Reveal className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-rule-strong border border-rule-strong">
                <img
                  src="/deepak.webp"
                  alt="Deepak, co-founder"
                  width={540}
                  height={540}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[3/4] object-cover bg-paper grayscale"
                />
                <img
                  src="/geetha.webp"
                  alt="Geetha, co-founder"
                  width={700}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[3/4] object-cover object-top bg-paper grayscale"
                />
              </div>
              <p className="label text-muted mt-4">Deepak &amp; Geetha · Bengaluru</p>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7">
              <SectionHead index="01" eyebrow="Why this exists" title="The same failure, over and over." />
              <div className="mt-8 space-y-5 text-muted leading-relaxed max-w-xl">
                <p>
                  The pattern was always identical. A business that genuinely knew what it was
                  doing — a clinic, a manufacturer, a firm with twenty years behind it — losing
                  enquiries to a younger, thinner competitor. Not because the competitor was
                  better. Because their site loaded in one second and said what they did in the
                  first sentence.
                </p>
                <p>
                  The reason it kept happening is unglamorous. A proper website from a proper
                  agency took three months and cost more than most of these businesses could
                  justify for something they could not measure. So they either bought a template
                  and let it rot, or they did nothing.
                </p>
                <p>
                  We built the studio around removing that trade-off: the standard of work an
                  agency would produce, on a schedule and at a price a real small business can
                  actually say yes to. The seven days is not a gimmick. It is what falls out of
                  two people who do this full time, working to a fixed scope, with no meetings to
                  attend but yours.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── The two of us ──────────────────────────────────────── */}
      <Section tone="ink" size="loose">
        <Shell>
          <Reveal>
            <SectionHead index="02" eyebrow="Who does what" title="Design and build, split cleanly." inverted />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-px bg-rule-on-ink mt-20 border border-rule-on-ink">
            <Reveal className="bg-ink p-8 md:p-12 card-lift-inv">
              <span className="label text-signal-bright">Co-founder · Engineering</span>
              <h3 className="font-display text-display mt-5">Deepak</h3>
              <div className="mt-8 space-y-5 text-on-ink-muted leading-relaxed">
                <p>
                  Runs discovery, information architecture, and the build. He is the one who
                  decides how your site is structured, what it is made of, and why it loads as
                  fast as it does.
                </p>
                <p>
                  His working rule: a website that does not bring you business is a brochure you
                  are paying hosting for. Every structural decision on a project gets measured
                  against whether it moves someone closer to enquiring.
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-rule-on-ink">
                <span className="label text-on-ink-muted">Away from the desk</span>
                <p className="text-on-ink leading-relaxed mt-3">
                  Climbed Velliangiri alone, slept on the hill, and reached the summit at dawn.
                  Holds that the useful decisions arrive in silence rather than in spreadsheets.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100} className="bg-ink p-8 md:p-12 card-lift-inv">
              <span className="label text-signal-bright">Co-founder · Design</span>
              <h3 className="font-display text-display mt-5">Geetha</h3>
              <div className="mt-8 space-y-5 text-on-ink-muted leading-relaxed">
                <p>
                  Runs design and delivery. Typography, spacing, colour, and the hundred small
                  signals that tell a visitor whether a business is serious before they have read
                  a single sentence.
                </p>
                <p>
                  Her working rule: design is not decoration, it is argument. If a layout cannot
                  explain why it is arranged the way it is, it gets rearranged until it can.
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-rule-on-ink">
                <span className="label text-on-ink-muted">Away from the desk</span>
                <p className="text-on-ink leading-relaxed mt-3">
                  The calmest person in any project channel, which turns out to be a more useful
                  professional trait than it sounds when a launch is two days out.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── Commitments ────────────────────────────────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="03"
              eyebrow="Commitments"
              title="Four things we will hold to."
              intro="Not values. Values are free. These are the ones that occasionally cost us money."
            />
          </Reveal>

          <div className="mt-20 grid md:grid-cols-2 gap-px bg-rule border border-rule">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.n} delay={i * 70} className="bg-paper p-8 md:p-10 card-lift">
                <span className="label text-signal">{c.n}</span>
                <h3 className="font-display text-title mt-6">{c.h}</h3>
                <p className="text-muted leading-relaxed mt-5">{c.p}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── Colophon ───────────────────────────────────────────────
          A personal statement, given its own quiet ground at the close
          of the page rather than the loudest card at the top of it. */}
      <Section tone="sunk" size="default">
        <Shell width="narrow">
          <Reveal>
            <div className="text-center border-t border-rule-strong pt-14">
              <span className="label text-muted">Colophon</span>
              <p className="font-display text-title mt-10 leading-[1.35]">
                என் செயலாவது யாதொன்றும் இல்லை — இனித் தெய்வமே உன்செயலே என்று உணரப் பெற்றேன்
              </p>
              <div className="w-10 h-px bg-rule-strong mx-auto my-8" />
              <p className="text-muted italic leading-relaxed max-w-lg mx-auto">
                “I have realised that nothing I do is truly mine. From now on, O God — everything
                that happens is only Your doing.”
              </p>
              <p className="text-muted leading-relaxed mt-8 max-w-lg mx-auto">
                We are grateful for the work, and we try to be worth it. Everything above is what
                that looks like on a Tuesday.
              </p>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* ── Close ──────────────────────────────────────────────── */}
      <Section tone="ink" size="loose">
        <Shell width="narrow" className="text-center">
          <Reveal>
            <h2 className="font-display text-display">Come and ask us anything.</h2>
            <p className="text-lead text-on-ink-muted mt-8">
              Twenty minutes with the two people who would actually build it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <button onClick={onBook} className="btn-primary-inv">
                Book a 20-minute call
              </button>
              <Link to="/services" className="btn-ghost-inv">
                See what it costs
              </Link>
            </div>
          </Reveal>
        </Shell>
      </Section>
    </>
  );
}
