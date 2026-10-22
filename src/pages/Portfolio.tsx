import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO & INTERACTIVE SPECIMEN BUILDS
   World-Class Client Acquisition Experience:
   - High-contrast editorial hero
   - 8:2 Specimen Index Grid (Command Deck Quick Jump)
   - 17 Live Specimen Builds with Continuous 3-Second 3-Theme Changeover
   - Segmented visual progress bars for each theme
   - In-Page Interactive Viewport Modal (Desktop / Tablet / Mobile)
   - The 4 Specimen Standards (Lighthouse speed, copy, semantic markup)
   - Cloaked-style dual-card founder closing CTA
   ═══════════════════════════════════════════════════════════════════ */
import { PROJECTS, type Project, type ThemeItem } from '../data/projects';
export type { Project, ThemeItem };


const CATEGORIES = [
  { id: 'all', label: 'All Specimen Demos (17)' },
  { id: 'clinics', label: 'Clinics & Polyclinics' },
  { id: 'healthcare', label: 'Surgeons & Diagnostics' },
  { id: 'wellness', label: 'Spa & Yoga Studios' },
  { id: 'fitness', label: 'Gyms & Private Coaches' },
  { id: 'beauty', label: 'Luxury Salons & Bridal' },
  { id: 'education', label: 'Academies & Prep' },
  { id: 'business', label: 'B2B Advisory & Coaching' },
  { id: 'interiors', label: 'Architects & Renovation' },
  { id: 'real-estate', label: 'Prime Real Estate' },
  { id: 'photographers', label: 'Wedding Films' },
  { id: 'creative', label: 'Creative Design Studios' },
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

/* ───────────────────────────────────────────────────────────────────
   SPECIMEN CARD WITH CONTINUOUS 3-SECOND THEME CHANGEOVER
   - 3-segment progress bar filling across 3s
   - Stacked cross-fading preview images
   - Interactive manual theme buttons
   - Direct launch & in-page viewport preview triggers
   ─────────────────────────────────────────────────────────────────── */
function SpecimenCard({
  project,
  onOpenPreview,
  isHighlighted,
}: {
  project: Project;
  onOpenPreview: (project: Project, themeIdx: number) => void;
  isHighlighted?: boolean;
}) {
  const [activeTheme, setActiveTheme] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % project.themes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, project.themes.length]);

  const currentTheme = project.themes[activeTheme];

  return (
    <div
      id={`specimen-${project.id}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`bg-paper-raised p-6 sm:p-8 border border-rule-strong hover:border-signal/50 card-lift flex flex-col justify-between rounded-[28px] group shadow-sm transition-all duration-300 relative ${
        isHighlighted ? 'ring-2 ring-signal ring-offset-4 ring-offset-paper' : ''
      }`}
    >
      <div>
        {/* Studio Window Chrome Header */}
        <div className="relative mb-5 overflow-hidden border border-rule-strong rounded-[20px] bg-paper shadow-sm group-hover:border-signal/40 transition-colors">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-ink text-paper text-[10px] font-mono border-b border-white/10 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-signal inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate max-w-[150px] sm:max-w-[220px]">
                {project.id}.uncodedhub.com
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-signal-bright font-semibold tracking-wider">
                AUTO 3s
              </span>
            </div>
          </div>

          {/* 3-Segment Progress Indicator Bar */}
          <div className="grid grid-cols-3 gap-1 px-3 py-1.5 bg-ink/95 border-b border-white/10">
            {project.themes.map((t, idx) => (
              <div
                key={t.name}
                onClick={() => setActiveTheme(idx)}
                className="h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer relative"
                title={`Theme ${idx + 1}: ${t.name}`}
              >
                {activeTheme === idx ? (
                  <div
                    key={`active-${activeTheme}`}
                    className="h-full bg-signal-bright animate-specimen-progress rounded-full"
                  />
                ) : activeTheme > idx ? (
                  <div className="h-full bg-white/60 rounded-full" />
                ) : (
                  <div className="h-full bg-transparent" />
                )}
              </div>
            ))}
          </div>

          {/* Cross-Fading Thumbnail Preview Stack */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink">
            {project.themes.map((theme, idx) => (
              <img
                key={theme.name}
                src={theme.image}
                alt={`${project.client} — ${theme.name} Theme`}
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                  activeTheme === idx
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-[1.03] z-0 pointer-events-none'
                }`}
              />
            ))}

            {/* Bottom floating theme identifier pill inside thumbnail */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
              <div className="bg-ink/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[11px] text-paper flex items-center gap-2 shadow-lg">
                <span className="font-mono text-signal-bright font-semibold">
                  Theme 0{activeTheme + 1}/03:
                </span>
                <span className="font-medium text-white">{currentTheme.name}</span>
                <span className="text-white/50 text-[10px]">({currentTheme.style})</span>
              </div>

              <div className="bg-ink/85 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 shadow-lg">
                {currentTheme.palette.map((color, cIdx) => (
                  <span
                    key={cIdx}
                    className="w-2.5 h-2.5 rounded-full border border-white/30"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-3 backdrop-blur-[2px]">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-signal hover:bg-signal-bright text-paper text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Live ↗</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenPreview(project, activeTheme)}
                className="bg-ink/90 hover:bg-ink text-paper text-xs font-medium px-4 py-2.5 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer border border-white/20"
              >
                <span>Test Viewport 👁</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tactile 3-Theme Switcher Buttons */}
        <div className="mb-4">
          <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>3 Themes Built Into Specimen:</span>
            <span className="text-signal font-semibold">Auto-Cycle every 3s</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-paper rounded-[14px] border border-rule">
            {project.themes.map((t, idx) => (
              <button
                key={t.name}
                type="button"
                onClick={() => {
                  setActiveTheme(idx);
                  setIsPaused(true);
                }}
                className={`py-1.5 px-2 rounded-[10px] text-[11px] font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTheme === idx
                    ? 'bg-ink text-paper font-semibold shadow-xs'
                    : 'text-muted hover:text-ink hover:bg-paper-raised'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: t.accentHex }}
                />
                <span className="truncate">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sector Tag & Client Title */}
        <div className="mb-3">
          <span className="card-tag font-mono">{project.sector}</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium leading-snug">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-signal transition-colors inline-flex items-center gap-1.5"
          >
            <span>{project.client}</span>
            <span className="text-xs text-muted">↗</span>
          </a>
        </h3>

        <p className="text-muted leading-relaxed mt-3 text-xs sm:text-sm">
          {project.summary}
        </p>

        {/* Value Proof & Conversion Architecture Box */}
        <div className="mt-5 p-4 bg-paper rounded-[18px] border border-rule text-xs space-y-2.5">
          <div className="flex items-center gap-2 text-ink font-mono font-medium">
            <span>{project.result}</span>
          </div>
          <div className="text-muted text-[11px] leading-relaxed pt-2 border-t border-rule/60">
            <strong className="text-ink-soft">Client Acquisition Engine:</strong>{' '}
            {project.conversionEngine}
          </div>
        </div>
      </div>

      {/* Action Footnotes */}
      <div className="mt-7 pt-5 border-t border-rule flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary !py-2.5 !px-5 text-xs inline-flex items-center gap-2 group cursor-pointer shadow-sm"
          >
            <span>Launch Live Specimen</span>
            <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
          </a>
          <button
            type="button"
            onClick={() => onOpenPreview(project, activeTheme)}
            className="btn-secondary !py-2.5 !px-3.5 text-xs inline-flex items-center gap-1.5 cursor-pointer bg-paper border border-rule-strong hover:border-signal"
            title="Interactive in-page viewport test"
          >
            <span>Viewport 👁</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link
            to={`/web-design/${project.nicheSlug.replace('/blog/industries/', '')}/`}
            className="text-signal hover:text-ink font-mono font-medium transition-colors inline-flex items-center gap-1"
          >
            <span>Bespoke 7-Day Sprint</span>
            <span>→</span>
          </Link>
          <span className="text-muted/40">·</span>
          <Link
            to={project.nicheSlug}
            className="text-muted hover:text-signal transition-colors inline-flex items-center gap-1 link-underline"
          >
            <span>Research Silo</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────
   8:2 INDEX GRID TILE WITH MINI VISUAL THUMBNAIL
   - Live visual screenshot thumbnail
   - Continuous 3-second theme changeover
   - Miniature browser chrome with #num
   - Quick jump to specimen card on click
   ─────────────────────────────────────────────────────────────────── */
function IndexTile({
  project,
  onClick,
}: {
  project: Project;
  onClick: (project: Project) => void;
}) {
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % project.themes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [project.themes.length]);

  return (
    <button
      type="button"
      onClick={() => onClick(project)}
      className="group p-2 sm:p-2.5 rounded-[18px] bg-paper border border-rule hover:border-signal hover:bg-paper-raised transition-all text-left flex flex-col justify-between cursor-pointer hover:shadow-md hover:-translate-y-1 active:translate-y-0 overflow-hidden"
    >
      {/* Mini Visual Thumbnail Window */}
      <div className="relative aspect-[16/10] w-full rounded-[10px] overflow-hidden bg-ink border border-rule/60 mb-2">
        {/* Studio Window Mini Chrome Bar */}
        <div className="absolute top-0 inset-x-0 h-4 bg-ink/90 backdrop-blur-xs px-1.5 flex items-center justify-between z-20 border-b border-white/10 select-none">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[8px] font-mono text-white/70">#{project.num}</span>
        </div>

        {/* Cross-fading 3 Theme Screenshots */}
        {project.themes.map((theme, idx) => (
          <img
            key={theme.name}
            src={theme.image}
            alt={`${project.client} — ${theme.name}`}
            width={320}
            height={200}
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover object-top pt-4 transition-all duration-700 ease-out group-hover:scale-105 ${
              activeTheme === idx
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        ))}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center pt-3">
          <span className="bg-signal text-paper text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full shadow-md">
            Jump to Demo ↗
          </span>
        </div>

        {/* Live Theme Dot Indicator in corner */}
        <div className="absolute bottom-1 right-1 z-20 flex items-center gap-1 bg-ink/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] font-mono text-white/90 border border-white/10">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.themes[activeTheme].accentHex }}
          />
          <span className="text-[7.5px] uppercase font-medium">T{activeTheme + 1}</span>
        </div>
      </div>

      {/* Info labels */}
      <div className="px-0.5 pb-0.5">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className="font-sans font-semibold text-xs text-ink group-hover:text-signal transition-colors truncate">
            {project.shortName}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted">
          <span className="truncate max-w-[65px]">{project.category}</span>
          <span className="text-signal font-mono text-[9px] font-medium shrink-0">
            3 Themes
          </span>
        </div>
      </div>
    </button>
  );
}

export default function Work({ onBook }: { onBook: () => void }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // In-Page Viewport Modal State
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const filteredProjects =
    selectedCat === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCat);

  const handleIndexClick = (project: Project) => {
    // If the category is filtered out, reveal it
    if (selectedCat !== 'all' && project.category !== selectedCat) {
      setSelectedCat('all');
    }

    setTimeout(() => {
      const el = document.getElementById(`specimen-${project.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedId(project.id);
        setTimeout(() => setHighlightedId(null), 2400);
      }
    }, 80);
  };

  const handleOpenPreview = (project: Project) => {
    setPreviewProject(project);
    setPreviewDevice('desktop');
  };

  return (
    <>
      <Helmet>
        <title>Work &amp; Interactive Specimen Builds — Uncoded Hub</title>
        <meta
          name="description"
          content="Explore seventeen live, interactive specimen websites handcrafted by Uncoded Hub across high-ticket niches. Experience continuous 3-theme changeovers, verified Lighthouse performance, and custom conversion funnels."
        />
        <link rel="canonical" href="https://uncodedhub.com/portfolio/" />
        <meta property="og:title" content="Work &amp; Interactive Specimen Builds — Uncoded Hub" />
        <meta
          property="og:description"
          content="Explore seventeen live, interactive specimen websites handcrafted by Uncoded Hub across high-ticket niches."
        />
        <meta property="og:url" content="https://uncodedhub.com/portfolio/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/portfolio.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="17 Live Interactive Specimen Websites — Uncoded Hub Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work &amp; Interactive Specimen Builds — Uncoded Hub" />
        <meta
          name="twitter:description"
          content="Explore seventeen live, interactive specimen websites handcrafted by Uncoded Hub across high-ticket niches."
        />
        <meta name="twitter:image" content="https://uncodedhub.com/og/portfolio.jpg" />
      </Helmet>

      {/* ── Editorial Header ───────────────────────────────────── */}
      <section className="pt-10 md:pt-14 pb-8">
        <Shell>
          <Reveal>
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <span className="label text-signal font-semibold">
                17 Live Specimen Builds · 51 Theme Variations
              </span>
              <span className="text-muted text-xs">·</span>
              <span className="text-xs font-mono text-muted bg-paper-raised px-2.5 py-0.5 rounded-full border border-rule">
                3-Second Continuous Theme Cycling
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink max-w-[20ch] leading-[1.08] tracking-tight">
              Live builds you can test, inspect, and verify{' '}
              <em className="italic hero-signal font-medium">before you commit a single rupee.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-5 max-w-3xl leading-relaxed">
              We engineer zero-bloat, bespoke web systems in seven working days. Below are seventeen
              fully interactive production specimens across high-ticket service industries. Each
              specimen features an automatic <strong>3-second continuous theme changeover</strong> (warm
              heritage, dark luxury, and minimalist grid), sub-0.8s Lighthouse performance, and
              direct client acquisition architecture.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── 6:3 SPECIMEN DIRECTORY INDEX MATRIX ─────────────────── */}
      <section className="pb-12 pt-2">
        <Shell>
          <Reveal delay={120}>
            <div className="bg-paper-raised p-5 sm:p-7 rounded-[26px] border border-rule-strong shadow-xs">
              {/* Matrix Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-rule">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
                    <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                      The 6:3 Specimen Index Matrix
                    </span>
                    <span className="text-[11px] font-mono text-signal bg-signal/10 px-2 py-0.5 rounded-full">
                      18 Visual Slots (17 Live Builds + Custom)
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    Visual Directory: Click any thumbnail to jump to its live demo card &amp; 3-theme studio, or request a custom build.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    100% Mobile 4G Verified
                  </span>
                  <span>·</span>
                  <span className="text-ink font-medium">51 Themes Total</span>
                </div>
              </div>

              {/* 6 Columns x 3 Rows Grid Layout with Visual Thumbnails (18 Slots Total) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
                {PROJECTS.map((p) => (
                  <IndexTile
                    key={p.id}
                    project={p}
                    onClick={handleIndexClick}
                  />
                ))}

                {/* 18th Slot: Complete 6:3 Grid with Custom Sprint CTA */}
                <button
                  type="button"
                  onClick={onBook}
                  className="group p-2 sm:p-2.5 rounded-[18px] bg-ink text-paper border border-signal/40 hover:border-signal transition-all text-left flex flex-col justify-between cursor-pointer hover:shadow-lg hover:-translate-y-1 active:translate-y-0 overflow-hidden relative"
                >
                  <div className="relative aspect-[16/10] w-full rounded-[10px] overflow-hidden bg-white/[0.06] border border-white/10 mb-2 flex flex-col items-center justify-center p-2.5 text-center">
                    <div className="w-7 h-7 rounded-full bg-signal/20 border border-signal/50 flex items-center justify-center text-signal-bright font-bold text-sm mb-1 group-hover:scale-110 transition-transform">
                      +
                    </div>
                    <span className="text-[10px] font-mono text-signal-bright font-semibold uppercase tracking-wider">
                      Your Specimen
                    </span>
                    <span className="text-[9px] text-white/60">7-Day Turnaround</span>
                  </div>

                  <div className="px-0.5 pb-0.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-sans font-semibold text-xs text-paper group-hover:text-signal-bright transition-colors truncate">
                        Custom Business
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-signal-bright shrink-0" />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-white/60">
                      <span className="truncate">Your Industry</span>
                      <span className="text-signal-bright font-mono text-[9px] font-medium shrink-0">
                        Book Free →
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Category Filter Pills ──────────────────────────────── */}
      <section className="pb-8">
        <Shell>
          <Reveal delay={150}>
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Filter by Industry Sector:
              </span>
              <span className="text-xs text-muted">
                Showing {filteredProjects.length} of {PROJECTS.length} specimens
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
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
            {filteredProjects.map((p) => (
              <Reveal key={p.id}>
                <SpecimenCard
                  project={p}
                  onOpenPreview={handleOpenPreview}
                  isHighlighted={highlightedId === p.id}
                />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── In-Page Viewport Modal ─────────────────────────────── */}
      {previewProject && (
        <div
          className="fixed inset-0 z-[99999] bg-ink/80 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
          onClick={() => setPreviewProject(null)}
        >
          <div
            className="w-full max-w-6xl h-[92vh] bg-paper-raised rounded-[24px] border border-rule-strong shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-ink text-paper flex items-center justify-between gap-4 border-b border-white/10 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-signal inline-block" />
                <div>
                  <h4 className="font-display text-base text-paper font-medium leading-none">
                    {previewProject.client}
                  </h4>
                  <span className="text-[11px] font-mono text-white/60">
                    Live 7-Day Sprint Build · {previewProject.sector}
                  </span>
                </div>
              </div>

              {/* Device Selector Controls */}
              <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-full border border-white/15">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-signal text-paper font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  🖥 Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    previewDevice === 'tablet'
                      ? 'bg-signal text-paper font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Tablet (768px)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-signal text-paper font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  📱 Mobile (390px)
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={previewProject.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs bg-white/15 hover:bg-white/25 text-white px-3.5 py-1.5 rounded-full transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Full Window</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-signal text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                  title="Close Dialog"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Iframe Viewport Frame */}
            <div className="flex-1 bg-paper-sunk flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <div
                className={`h-full bg-paper rounded-[14px] overflow-hidden shadow-lg border border-rule transition-all duration-300 ${
                  previewDevice === 'desktop'
                    ? 'w-full'
                    : previewDevice === 'tablet'
                    ? 'w-[768px]'
                    : 'w-[390px]'
                }`}
              >
                <iframe
                  src={previewProject.url}
                  title={`${previewProject.client} Live Preview`}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
                    to="/services/"
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
