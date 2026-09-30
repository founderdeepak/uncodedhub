import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO & INTERACTIVE SPECIMEN BUILDS
   Cloaked-inspired design:
   - High-contrast editorial hero with announcement badge
   - Sector filter pill row
   - Squircle bento specimen cards (rounded-[28px]) with studio chrome
   - Cinematic dark chapter: "The 4 Specimen Standards"
   - Early client position bento
   - Dual-card closing CTA module
   ═══════════════════════════════════════════════════════════════════ */

type Project = {
  client: string;
  url: string;
  thumbnail: string;
  sector: string;
  category: string;
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
    thumbnail: '/demos/thumbnails/interior-design.webp',
    sector: 'Interior Architecture & Studios',
    category: 'interiors',
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
    thumbnail: '/demos/thumbnails/real-estate.webp',
    sector: 'Prime Real Estate & Private Advisory',
    category: 'real-estate',
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
    thumbnail: '/demos/thumbnails/dental-clinic.webp',
    sector: 'Dental Clinics & Facial Aesthetics',
    category: 'clinics',
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
    thumbnail: '/demos/thumbnails/wedding-photography.webp',
    sector: 'Wedding Photographers & Films',
    category: 'photographers',
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
    thumbnail: '/demos/thumbnails/home-renovation.webp',
    sector: 'Modular Kitchens & Full Renovation',
    category: 'renovation',
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
    thumbnail: '/demos/thumbnails/executive-coaching.webp',
    sector: 'Executive Coaching & Advisory',
    category: 'coaching',
    year: '7-Day Sprint Build',
    summary:
      'Strategic executive sparring and 90-day scaling architecture for high-growth founders and C-suite leaders navigating critical transition windows. Built around diagnostic-first intake and zero-pitch exploratory calls.',
    result: '⚡ 0.7s LCP · Diagnostic-First Architecture · Zero-Pitch Protocol',
    themes: 'Bespoke Executive · Thought Leader · Tech Monolith HUD',
    nicheSlug: '/blog/niche/coaches-consultants',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Demos (6)' },
  { id: 'interiors', label: 'Interiors' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'clinics', label: 'Clinics' },
  { id: 'photographers', label: 'Wedding Films' },
  { id: 'renovation', label: 'Renovation' },
  { id: 'coaching', label: 'Advisory' },
];

const SPECIMEN = [
  {
    n: '01',
    label: 'Speed',
    body: 'Run Google Lighthouse on any demo. There is no 3D scene, no bloated animation framework, and no third-party script beyond analytics — because every extra byte is paid for in seconds of your prospect’s attention.',
  },
  {
    n: '02',
    label: 'Typography',
    body: 'Two typefaces — Fraunces for headlines and data values, Inter for everything else — and one accent colour. Hierarchy here is made from deliberate size and whitespace.',
  },
  {
    n: '03',
    label: 'Structure',
    body: 'Semantic HTML landmarks, a skip link, visible focus states on every control, and text that passes WCAG AA contrast throughout. You can navigate the entire build with a keyboard alone.',
  },
  {
    n: '04',
    label: 'Copy',
    body: 'Read any demo copy and count the times we use empty words like "world-class", "cutting-edge", or "bespoke solutions". The count is zero. Every claim is concrete and verifiable.',
  },
];

const SEQUENCE = [
  {
    step: 'Before you pay anything',
    body: 'A twenty-minute discovery call and a written scope: the pages, the features, the fixed price, and the launch date. If we think a week is the wrong shape for your project, that is the conversation where we say so.',
  },
  {
    step: 'Before you pay the balance',
    body: 'The full copy deck on day two and the complete design on day four. You see the real website, with your real words in it, while there is still time to adjust direction.',
  },
  {
    step: 'Before it goes live',
    body: 'A private staging link you can test on your own phone and send to anyone whose opinion you trust, plus verified Google Lighthouse performance reports.',
  },
  {
    step: 'After it goes live',
    body: 'Thirty days of priority support, a recorded walkthrough so you can edit content yourself, and all source code. The site is yours — zero platform lock-in.',
  },
];

export default function Work({ onBook }: { onBook: () => void }) {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredProjects =
    selectedCat === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCat);

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
      <section className="pt-10 md:pt-16 pb-14">
        <Shell>
          <Reveal>
            <span className="label text-signal font-semibold block mb-3">
              6 interactive demos · 3 themes each
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink max-w-[18ch] leading-[1.08] tracking-tight">
              Live builds you can test, inspect, and verify{' '}
              <em className="italic hero-signal font-medium">before you commit.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-6 max-w-2xl leading-relaxed">
              We build custom, zero-bloat web systems in seven working days. Below are six fully
              interactive specimen builds across our core commercial niches — each featuring three
              live aesthetic switcher themes, verified Lighthouse performance, and tailored conversion funnels.
            </p>

            {/* Category Filter Pills (Cloaked style) */}
            <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-rule">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCat(c.id)}
                  className={`text-xs font-sans px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    selectedCat === c.id
                      ? 'bg-signal text-paper font-semibold shadow-sm'
                      : 'bg-paper-raised border border-rule-strong text-ink-soft hover:text-ink hover:border-signal/40'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Real projects / Interactive Demos Bento Grid ─────────── */}
      <Section size="default">
        <Shell>
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((p, idx) => (
              <Reveal
                key={p.client}
                delay={idx * 60}
                className="bg-paper-raised p-6 sm:p-8 border border-rule-strong hover:border-signal/40 card-lift flex flex-col justify-between rounded-[28px] group shadow-sm"
              >
                <div>
                  {/* Thumbnail Studio Window */}
                  <div className="relative mb-6 overflow-hidden border border-rule-strong rounded-[20px] bg-paper shadow-sm group-hover:border-signal/50 transition-colors">
                    <div className="flex items-center justify-between px-3.5 py-2 bg-ink text-paper text-[10px] font-mono border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-signal" />
                        <span className="w-2 h-2 rounded-full bg-white/20" />
                        <span className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                      <span className="text-white/60 text-[10px]">live specimen · {p.sector}</span>
                      <span className="text-[10px] text-signal-bright font-semibold">3 THEMES</span>
                    </div>
                    <a href={p.url} target="_blank" rel="noreferrer noopener" className="block overflow-hidden relative">
                      <img
                        src={p.thumbnail}
                        alt={`${p.client} — 7-Day Sprint Live Specimen Demo`}
                        width={1280}
                        height={720}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[16/9] object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-ink/90 text-paper text-xs font-mono px-4 py-2 rounded-full shadow-lg">
                          Test Demo Live ↗
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="mb-3">
                    <span className="card-tag">{p.sector}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-ink mt-5 font-medium leading-snug">
                    <a href={p.url} target="_blank" rel="noreferrer noopener" className="hover:text-signal transition-colors inline-flex items-center gap-1.5">
                      <span>{p.client}</span>
                      <span className="text-xs text-muted">↗</span>
                    </a>
                  </h3>

                  <p className="text-muted leading-relaxed mt-4 text-xs sm:text-sm">
                    {p.summary}
                  </p>

                  <div className="mt-6 p-4 bg-paper rounded-[16px] border border-rule text-xs space-y-2">
                    <div className="flex items-center gap-2 text-ink font-mono font-medium">
                      <span>{p.result}</span>
                    </div>
                    <div className="text-muted text-[11px]">
                      <strong className="text-ink-soft">3 Themes Switcher:</strong> {p.themes}
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
                    <span>Launch Live Specimen</span>
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

      {/* ── Cinematic Dark Chapter: Specimen Standards ──────────── */}
      <section className="bg-ink text-paper py-20 md:py-28 relative overflow-hidden border-y border-white/10">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/4 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none"
        />

        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="label text-signal-bright block mb-3">
                Zero fabricated proof
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-paper font-normal leading-tight">
                The engineering standards{' '}
                <em className="text-signal-bright italic font-medium">you can verify.</em>
              </h2>
              <p className="text-on-ink-muted text-sm md:text-base leading-relaxed mt-5">
                Every site we build is held to stated performance and positioning standards.
                You don't have to take our word for it — open your browser console and inspect the source.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIMEN.map((s, idx) => (
              <Reveal key={s.n} delay={idx * 70}>
                <div className="p-6 sm:p-8 rounded-[24px] bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col justify-between h-full">
                  <div>
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright mb-4">
                      {s.label}
                    </span>
                    <p className="text-on-ink-muted text-xs sm:text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── Sequence: What you see before you commit ─────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="02"
              eyebrow="Zero risk"
              title="You see the work before you are committed to it."
              intro="Hiring a studio with no public portfolio is a real risk, and pretending otherwise would be insulting. So the project is structured so that you are never far from an exit."
            />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {SEQUENCE.map((s, i) => (
              <Reveal key={s.step} delay={i * 70}>
                <div className="bg-paper-raised p-8 rounded-[24px] border border-rule-strong shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <span className="card-tag mb-4">{s.step}</span>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">{s.body}</p>
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
                    Ask us the hard questions on the call.<br />
                    <em className="text-signal-bright italic font-medium">Direct conversation with founders.</em>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    "Who else have you built this for?" is a fair question and we will answer it straight.
                    Judge us by our live specimens and our published guarantee.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs text-on-ink-muted">
                  <span>● Deepak &amp; Geetha</span>
                  <span>·</span>
                  <span>Direct delivery</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="label text-signal-bright block mb-2">
                    Free 20-min discovery
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Ready to see your business in 7 days?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Leave the call with a written scope, a fixed price, and a defined delivery date — or an honest recommendation if you need something else.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onBook}
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Schedule 20-Minute Discovery Call</span>
                    <span>→</span>
                  </button>
                  <Link
                    to="/services"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Review our 3 defined scopes first
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
