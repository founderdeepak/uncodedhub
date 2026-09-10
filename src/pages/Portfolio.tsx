import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';

/* ═══════════════════════════════════════════════════════════════════
   WORK

   This page previously carried four case studies — Apex Dental, Kavya
   Organics, Vanguard Capital, Velocity SaaS — with metrics such as
   "+140% Monthly Appointments" and "28.4% Opt-In Conversion". None of
   them were real. They have been removed.

   Fabricated proof is not a small sin for a studio that sells trust:
   it is advertising exposure under India's Consumer Protection Act and
   the ASCI code, and it collapses the moment a serious prospect asks
   for a reference. Making Websites Win puts credibility-building among
   its core principles — but credibility means evidence, and inventing
   the evidence inverts the principle rather than satisfying it.

   What replaces it is the honest version of the same argument: publish
   the standards, publish the method, and hand the visitor something
   they can verify without taking our word for anything.

   ── ADDING REAL WORK ────────────────────────────────────────────────
   When a client ships and agrees to be named, add an entry to PROJECTS
   below and the grid renders automatically. Only ever add: a real
   client, a real URL, and numbers you can produce evidence for.
   ═══════════════════════════════════════════════════════════════════ */

type Project = {
  client: string;
  url: string;
  sector: string;
  year: string;
  summary: string;
  /* Only include a result you could defend with a screenshot of the
     analytics account. If you cannot, leave it out entirely. */
  result?: string;
};

const PROJECTS: Project[] = [];

const SPECIMEN = [
  {
    n: '01',
    label: 'Speed',
    body: 'Run Lighthouse on this page. There is no 3D scene, no animation library, and no third-party script beyond analytics — because every one of those is paid for in seconds of someone else’s time.',
  },
  {
    n: '02',
    label: 'Typography',
    body: 'Three typefaces, one accent colour, and a scale that runs from 11px to 120px. Hierarchy here is made from size and space. If a site needs gradients to tell you what matters, the layout is not working.',
  },
  {
    n: '03',
    label: 'Structure',
    body: 'Real headings in order, landmarks, a skip link, visible focus on every control, and text that passes AA contrast throughout. Open it with a keyboard and never touch the mouse.',
  },
  {
    n: '04',
    label: 'Copy',
    body: 'Read the homepage and count the times we describe ourselves as world-class, cutting-edge, or premium. The count is zero. Claims on this site are things you can check.',
  },
];

const SEQUENCE = [
  {
    step: 'Before you pay anything',
    body: 'A twenty-minute call and a written scope: the pages, the features, the price, and the date. If we think a week is the wrong shape for your project, that is the conversation where we say so.',
  },
  {
    step: 'Before you pay the balance',
    body: 'The full copy deck on day two and the complete design on day four. You see the real thing, with your real words in it, while there is still time to change direction.',
  },
  {
    step: 'Before it goes live',
    body: 'A staging link you can send to anyone whose opinion you trust, and the performance report against the standards on the homepage.',
  },
  {
    step: 'After it goes live',
    body: 'Thirty days of support, a recorded walkthrough so you can edit it yourself, and the files. The site is yours — there is no platform you have to keep renting from us.',
  },
];

export default function Work({ onBook }: { onBook: () => void }) {
  const hasProjects = PROJECTS.length > 0;

  return (
    <>
      <Helmet>
        <title>Work — Uncoded Hub</title>
        <meta
          name="description"
          content="What a young studio can honestly show you: the standards every site we ship has to meet, the method, and what you see before you commit."
        />
        <link rel="canonical" href="https://uncodedhub.com/portfolio" />
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-16">
        <Shell>
          <Reveal>
            <p className="label text-signal">Work</p>
            <h1 className="font-display text-hero mt-8 max-w-[16ch]">
              We would rather show you nothing than show you{' '}
              <em className="italic hero-signal">someone else's.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-10 max-w-2xl">
              This studio is new. We could fill this page with stock mockups and invented
              percentages the way most agencies at our stage do, and you would have no way of
              checking a single one of them. Instead, here is what you can actually verify.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── Real projects, once there are any ──────────────────── */}
      {hasProjects && (
        <Section size="default">
          <Shell>
            <SectionHead index="00" eyebrow="Selected projects" title="Shipped work." />
            <div className="grid md:grid-cols-2 gap-px bg-rule mt-16 border border-rule">
              {PROJECTS.map((p) => (
                <Reveal key={p.client} className="bg-paper p-8 md:p-10 card-lift">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="label text-signal">{p.sector}</span>
                    <span className="label text-muted">{p.year}</span>
                  </div>
                  <h3 className="font-display text-title mt-6">{p.client}</h3>
                  <p className="text-muted leading-relaxed mt-4">{p.summary}</p>
                  {p.result && (
                    <p className="text-[0.9375rem] mt-5 pt-5 border-t border-rule">{p.result}</p>
                  )}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-ink mt-6 inline-flex"
                  >
                    Visit the site →
                  </a>
                </Reveal>
              ))}
            </div>
          </Shell>
        </Section>
      )}

      {/* ── Specimen: this site ────────────────────────────────── */}
      <Section tone="ink" size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="01"
              eyebrow="Specimen"
              inverted
              title="The site you are on is the sample."
              intro="It is the one piece of our work you can inspect down to the source without asking our permission or taking our word for it. Everything we would build for you, we did here first."
            />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-px bg-rule-on-ink mt-20 border border-rule-on-ink">
            {SPECIMEN.map((s, i) => (
              <Reveal key={s.n} delay={i * 70} className="bg-ink p-8 md:p-10 card-lift-inv">
                <div className="flex items-baseline gap-4">
                  <span className="label text-signal-bright">{s.n}</span>
                  <span className="label text-on-ink-muted">{s.label}</span>
                </div>
                <p className="text-on-ink leading-relaxed mt-6">{s.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="text-on-ink-muted leading-relaxed mt-14 max-w-2xl">
              If you looked at this page and thought it was worth the click, that is the entire
              argument. It is the same team, the same standards, and the same week.
            </p>
          </Reveal>
        </Shell>
      </Section>

      {/* ── What you see before you commit ─────────────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="02"
              eyebrow="Risk"
              title="You see the work before you are committed to it."
              intro="Hiring a studio with no public portfolio is a real risk, and pretending otherwise would be insulting. So the project is structured so that you are never far from an exit."
            />
          </Reveal>

          <div className="mt-20 border-t border-rule-strong">
            {SEQUENCE.map((s, i) => (
              <Reveal
                key={s.step}
                delay={i * 70}
                className="grid md:grid-cols-12 gap-x-10 gap-y-3 py-9 border-b border-rule"
              >
                <div className="md:col-span-1">
                  <span className="label text-signal">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lead font-medium">{s.step}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-muted leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── The early-client position ──────────────────────────── */}
      <Section tone="sunk">
        <Shell width="narrow">
          <Reveal>
            <SectionHead
              index="03"
              eyebrow="Being early"
              align="center"
              title="What you get for going first."
            />
            <div className="flex items-center justify-center gap-5 mt-10">
              <span className="font-display text-title">First projects</span>
              <span className="w-10 h-px bg-signal" aria-hidden="true" />
              <span className="font-display text-title text-muted">Everyone else</span>
            </div>
            <p className="text-lead text-muted mt-8 text-center">
              Early clients take a risk that later ones will not have to, and it is fair that
              they get something for it.
            </p>
            <div className="mt-14 bg-paper-raised border border-rule divide-y divide-rule">
              {[
                ['Founding rate', 'Held for the first projects in each sector we work in, and honoured on any future work you bring us.'],
                ['Direct access', 'Both founders on WhatsApp for the duration of the build. Not a ticket queue.'],
                ['Your say in the case study', 'If we write your project up, you approve every word and every number before it is published — and you can decline entirely.'],
              ].map(([k, v]) => (
                <div key={k} className="p-7 md:p-8">
                  <span className="label text-signal">{k}</span>
                  <p className="text-ink-soft leading-relaxed mt-3">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* ── Close ──────────────────────────────────────────────── */}
      <Section tone="ink" size="loose">
        <Shell width="narrow" className="text-center">
          <Reveal>
            <h2 className="font-display text-display">Ask us the hard question on the call.</h2>
            <p className="text-lead text-on-ink-muted mt-8">
              “Who else have you built this for?” is a fair question and we will answer it
              straight. Bring it.
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
