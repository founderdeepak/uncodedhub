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
  result?: string;
  themes: string;
  nicheSlug: string;
};

const PROJECTS: Project[] = [
  {
    client: 'Meridian Architecture & Interiors',
    url: '/demos/interior-design.html',
    sector: 'Interior Architecture & Studios',
    year: '7-Day Sprint Build',
    summary:
      'Turnkey residential interior architecture and private home sanctuaries. Features photorealistic 3D render-to-reality comparisons, 100% transparent trade pricing fee structure, and an interactive 3-style visual theme switcher.',
    result: '⚡ 0.8s LCP · 100% Lighthouse Performance · Full Diagnostic Booking Funnel',
    themes: 'Warm Heritage · Obsidian Luxe · Avant-Garde Grid',
    nicheSlug: '/blog/niche/interior-designers',
  },
  {
    client: 'Marlow & Co. Private Real Estate',
    url: '/demos/real-estate.html',
    sector: 'Prime Real Estate & Private Advisory',
    year: '7-Day Sprint Build',
    summary:
      'Independent prime property advisory and off-market residential acquisitions. Features a capped 8-client roster model, 14-point legal title verification checklist, and strict client NDA confidentiality booking.',
    result: '⚡ 0.7s LCP · Zero Developer Bias · Verified Title Audit Funnel',
    themes: 'Heritage Estate · Nocturne Penthouse HUD · Swiss Architectural',
    nicheSlug: '/blog/niche/real-estate',
  },
  {
    client: 'Willowmere Dental & Facial Aesthetics',
    url: '/demos/dental-clinic.html',
    sector: 'Dental Clinics & Facial Aesthetics',
    year: '7-Day Sprint Build',
    summary:
      'Specialized anxiety-free dental practice and smile aesthetics website. Built with a patient stop-signal protocol, upfront written treatment fee estimates, Class-B autoclave sterilisation badges, and zero-judgment consultation booking.',
    result: '⚡ 0.8s LCP · Anxiety-Free Protocol · Complete Pricing Transparency',
    themes: 'Nordic Sanctuary · Harley Med-Luxe · Swiss Radiance Grid',
    nicheSlug: '/blog/niche/dental-clinics',
  },
  {
    client: 'Alder & Wren Fine-Art Wedding Films',
    url: '/demos/wedding-photography.html',
    sector: 'Wedding Photographers & Films',
    year: '7-Day Sprint Build',
    summary:
      'Documentary destination wedding photography and cinematic film studio. Anchored by a strictly 1-wedding-per-weekend contract commitment, guaranteed 48-hour sneak peek delivery, and 4-week full gallery handoff.',
    result: '⚡ 0.8s LCP · 1-Wedding Rule · 4-Week Delivery Contract Guarantee',
    themes: 'Fine-Art Editorial · Cinematic Nocturne · Vogue Minimalist',
    nicheSlug: '/blog/niche/wedding-photographers',
  },
  {
    client: 'Halbrook Studio Precision Renovation',
    url: '/demos/home-renovation.html',
    sector: 'Modular Kitchens & Full Renovation',
    year: '7-Day Sprint Build',
    summary:
      'Precision engineered modular kitchens and civil renovations. Highlights 100% IS:710 Marine BWP plywood standards, Blum German hardware certifications, 10-year written warranty seals, and free laser survey booking.',
    result: '⚡ 0.8s LCP · IS:710 Marine Plywood · 10-Year Warranty Commitment',
    themes: 'Industrial Craft · Obsidian Copper · Nordic Living Grid',
    nicheSlug: '/blog/niche/home-renovation',
  },
  {
    client: 'Naomi Reyes Executive Advisory',
    url: '/demos/executive-coaching.html',
    sector: 'Executive Coaching & Advisory',
    year: '7-Day Sprint Build',
    summary:
      'Strategic executive sparring and 90-day scaling architecture for high-growth founders and C-suite leaders. Built around diagnostic-first intake, zero-pitch exploratory calls, and capped 6-client quarterly rosters.',
    result: '⚡ 0.7s LCP · Diagnostic-First Architecture · Zero-Pitch Protocol',
    themes: 'Bespoke Executive · Thought Leader · Tech Monolith HUD',
    nicheSlug: '/blog/niche/coaches-consultants',
  },
];

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
        <title>Work &amp; Interactive Specimen Builds — Uncoded Hub</title>
        <meta
          name="description"
          content="Explore six live, interactive specimen websites handcrafted by Uncoded Hub across our core commercial niches. Test speed, multi-theme switchers, and conversion funnels."
        />
        <link rel="canonical" href="https://uncodedhub.com/portfolio" />
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-16">
        <Shell>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-signal/10 border border-signal/25 text-signal text-xs font-mono font-medium rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
              6 INTERACTIVE SPECIMEN BUILDS AVAILABLE
            </div>
            <p className="label text-signal">Work &amp; Live Demos</p>
            <h1 className="font-display text-hero mt-6 max-w-[18ch]">
              {"Live builds you can test, inspect, and verify "}
              <em className="italic hero-signal">before you commit.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-8 max-w-2xl leading-relaxed">
              We build custom, zero-bloat web systems in seven working days. Below are six fully interactive specimen builds across our core commercial niches—each featuring three live aesthetic switcher themes, verified Lighthouse performance, and tailored conversion funnels.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── Real projects / Interactive Demos ──────────────────── */}
      {hasProjects && (
        <Section size="default">
          <Shell>
            <SectionHead 
              index="00" 
              eyebrow="Interactive Specimen Builds" 
              title="Test the builds live." 
              intro="Each demo below is a fully functional web application built to our production standards. Click into any build to test live theme switching, inspect layout pacing, and explore the conversion flow."
            />
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              {PROJECTS.map((p, idx) => (
                <Reveal key={p.client} delay={idx * 60} className="bg-paper p-8 md:p-10 border border-rule-strong card-lift flex flex-col justify-between rounded-[2px]">
                  <div>
                    <div className="flex items-baseline justify-between gap-4 flex-wrap pb-4 border-b border-rule">
                      <span className="label text-signal font-semibold tracking-wide">{p.sector}</span>
                      <span className="label text-muted text-xs bg-paper-raised px-2.5 py-1 border border-rule rounded-[2px]">{p.year}</span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl text-ink mt-6 font-medium leading-snug">
                      {p.client}
                    </h3>

                    <p className="text-muted leading-relaxed mt-4 text-[0.9375rem]">
                      {p.summary}
                    </p>

                    <div className="mt-6 p-4 bg-paper-raised/60 border-l-2 border-signal border border-rule text-xs space-y-2">
                      <div className="flex items-center gap-2 text-ink font-mono font-medium">
                        <span>{p.result}</span>
                      </div>
                      <div className="text-muted text-[11px]">
                        <strong className="text-ink-soft">3-Theme Switcher:</strong> {p.themes}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-rule flex items-center justify-between gap-4 flex-wrap">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-primary !py-2.5 !px-5 text-xs inline-flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Explore Live Demo</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                    </a>
                    <Link
                      to={p.nicheSlug}
                      className="text-xs text-muted hover:text-signal transition-colors inline-flex items-center gap-1 link-underline"
                    >
                      Read Industry Blueprint →
                    </Link>
                  </div>
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
                className="row-hover grid md:grid-cols-12 gap-x-10 gap-y-3 py-9 px-3 -mx-3 border-b border-rule"
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
                <div key={k} className="row-hover p-7 md:p-8">
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
