import { useState, useEffect, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { LogoMark } from '../components/Logo';
import { PROJECTS, type Project, type ThemeItem } from '../data/projects';
export type { Project, ThemeItem };

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO & 50 LIVE INTERACTIVE SPECIMEN BUILDS
   Ultra-Luxury Editorial Showcase for High-Ticket Buying Groups:
   - 7 Curated Luxury Industry Sectors covering all 50 live demos
   - Real-time instant search & keyword filtering
   - 50 Visual Specimen Index Matrix with 3s live theme cross-fades
   - 150 Unique hand-coded themes with authentic color swatches
   - In-Page Interactive Viewport Modal (Desktop 1440px / Tablet 768px / Mobile 390px)
   - The 4 Production Engineering Standards (Lighthouse speed, copy, structure, zero bloat)
   - Direct founder engagement closing CTA
   ═══════════════════════════════════════════════════════════════════ */

export interface LuxurySector {
  id: string;
  label: string;
  shortLabel: string;
  count: number;
  description: string;
  projectIds?: string[];
}

export const LUXURY_SECTORS: LuxurySector[] = [
  {
    id: 'all',
    label: 'All 50 Demos',
    shortLabel: 'All Demos',
    count: 50,
    description: 'Complete collection of 50 production-grade live specimens with 150 unique aesthetic themes',
  },
  {
    id: 'healthcare',
    label: 'Medical, Clinics & Healthcare',
    shortLabel: 'Medical & Clinics',
    count: 7,
    description: 'Dental studios, multi-speciality polyclinics, surgical orthopaedics, diagnostic imaging & vet hospitals',
    projectIds: [
      'dental-clinic',
      'clinic-polyclinic',
      'doctor-specialist',
      'healthcare-diagnostics',
      'veterinary-clinics',
      'optometry-eyewear',
      'spa-wellness',
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture, Estates & Development',
    shortLabel: 'Architecture & Estates',
    count: 8,
    description: 'Turnkey interior architecture, prime estates, civil contracting, landscape design & flex coworking',
    projectIds: [
      'interior-design',
      'real-estate',
      'home-renovation',
      'construction',
      'architects',
      'landscaping',
      'coworking-spaces',
      'solar-companies',
    ],
  },
  {
    id: 'corporate',
    label: 'Corporate, Legal & Capital Advisory',
    shortLabel: 'Legal & Capital',
    count: 8,
    description: 'Commercial litigation, statutory chartered accountancy, fiduciary wealth, executive search & global visas',
    projectIds: [
      'executive-coaching',
      'business-portfolio',
      'law-firm',
      'accounting-firm',
      'marketing-agencies',
      'recruitment-agencies',
      'financial-advisors',
      'immigration-consultants',
    ],
  },
  {
    id: 'hospitality',
    label: 'Hospitality, Dining & Celebrations',
    shortLabel: 'Hospitality & Dining',
    count: 7,
    description: 'Wood-fired charcoal kitchens, boutique heritage resorts, French boulangeries, craft breweries & luxury weddings',
    projectIds: [
      'restaurant',
      'hotels-resorts',
      'event-planners',
      'bakeries-patisseries',
      'breweries-bars',
      'caterers',
      'wedding-photography',
    ],
  },
  {
    id: 'lifestyle',
    label: 'Luxury Retail, Beauty & Wellness',
    shortLabel: 'Luxury & Wellness',
    count: 7,
    description: 'Hallmarked jewellery ateliers, luxury bridal aesthetics, elite strength clubs, authentic yoga shalas & D2C apothecary',
    projectIds: [
      'gym-fitness-club',
      'salon-beauty',
      'fitness-coach',
      'yoga-meditation',
      'creative-portfolio',
      'ecommerce-brands',
      'jewellery-stores',
    ],
  },
  {
    id: 'services',
    label: 'Industrial, Logistics & Prime Services',
    shortLabel: 'Industrial & Trade',
    count: 13,
    description: 'Aerospace CNC tooling, interstate freight logistics, cleanroom sanitization, VRV HVAC, zero-damage moving & academies',
    projectIds: [
      'astrology',
      'automotive-garages',
      'cleaning-services',
      'manufacturing-oems',
      'logistics-transport',
      'security-surveillance',
      'hvac-contractors',
      'pest-control',
      'packers-movers',
      'daycares-preschools',
      'driving-schools',
      'home-services',
      'educational-academy',
    ],
  },
];

const SPECIMEN_STANDARDS = [
  {
    n: '01',
    label: 'Sub-Second Speed',
    badge: '0.4s – 0.8s LCP',
    body: 'Run Google Lighthouse or WebPageTest on any of the 50 specimens. Zero bloat, zero heavy tracking scripts, and zero unnecessary runtime dependencies. Every byte is dedicated to immediate prospect engagement.',
  },
  {
    n: '02',
    label: 'Bespoke Editorial Typography',
    badge: 'Dual-Scale Hierarchy',
    body: 'Deliberate typography pairing (Fraunces & Inter) with calibrated optical sizes, fluid line heights, and mathematically harmonized whitespace. Hierarchy is earned through proportion rather than visual clutter.',
  },
  {
    n: '03',
    label: 'Semantic Accessibility & Structure',
    badge: 'WCAG AA Compliant',
    body: 'Strict semantic HTML5 landmarks, native skip navigation, visible focus indicators on every control, and 100% compliant contrast ratios. Fully navigable via keyboard, screen reader, or touch gestures.',
  },
  {
    n: '04',
    label: 'Zero-Fluff Conversion Architecture',
    badge: 'Direct Inbound Engine',
    body: 'Every demo is powered by a real client acquisition mechanism: interactive fee calculators, title verification intake, WhatsApp table reservation engines, or multi-step discovery flows with zero placeholder text.',
  },
];

const SPRINT_SEQUENCE = [
  {
    step: 'Day 01 — Strategic Scope & Discovery',
    badge: 'Zero Rupee Risk',
    body: 'A focused twenty-minute discovery consultation and a written scope: required pages, technical conversion engine, fixed-price contract, and guaranteed launch date. If a 7-day sprint is not the right fit, we state it upfront.',
  },
  {
    step: 'Day 02–04 — Copy Deck & Visual Architecture',
    badge: 'Interactive Review',
    body: 'You review the full industry copy deck on day two and the complete responsive UI layout on day four. You test real specimen flows and messaging while strategic revisions can still be made seamlessly.',
  },
  {
    step: 'Day 05–06 — Staging & Core Web Vitals Audit',
    badge: 'Private Staging',
    body: 'A private staging link delivered directly to your device for team review, cross-browser verification across iOS, Android, and Desktop, complete with verified 100/100 Google Lighthouse performance audits.',
  },
  {
    step: 'Day 07 — Production Deployment & Handover',
    badge: '100% Code Ownership',
    body: 'DNS switch, SSL certification, Google Search Console indexing verification, 30 days of priority founder support, and all clean source code. Zero ongoing platform tax, zero vendor lock-in.',
  },
];

/* ───────────────────────────────────────────────────────────────────
   SPECIMEN CARD WITH CONTINUOUS 3-SECOND THEME CHANGEOVER
   - 3-segment progress indicator
   - Cross-fading 100% unique thumbnail images
   - Interactive manual theme buttons with accent swatches
   - Direct live demo link + in-page viewport simulator trigger
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
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, project.themes.length]);

  const currentTheme = project.themes[activeTheme] || project.themes[0];

  return (
    <div
      id={`specimen-${project.id}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`bg-paper-raised p-6 sm:p-8 border border-rule-strong hover:border-signal/50 card-lift flex flex-col justify-between rounded-[28px] group shadow-sm transition-all duration-300 relative ${
        isHighlighted ? 'ring-2 ring-signal ring-offset-4 ring-offset-paper scale-[1.01]' : ''
      }`}
    >
      <div>
        {/* Studio Window Chrome Header */}
        <div className="relative mb-5 overflow-hidden border border-rule-strong rounded-[20px] bg-paper shadow-sm group-hover:border-signal/40 transition-colors">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-ink text-paper text-[10px] font-mono border-b border-white/10 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 inline-block" />
            </div>

            <div className="flex items-center gap-2 text-white/80">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate max-w-[150px] sm:max-w-[220px]">
                {project.id}.uncodedhub.com
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-signal-bright font-semibold tracking-wider font-mono">
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
                title={`Theme ${idx + 1}: ${t.name} (${t.style})`}
              >
                {activeTheme === idx ? (
                  <div
                    key={`active-${activeTheme}`}
                    className="h-full bg-signal-bright animate-specimen-progress rounded-full"
                  />
                ) : activeTheme > idx ? (
                  <div className="h-full bg-white/70 rounded-full" />
                ) : (
                  <div className="h-full bg-transparent" />
                )}
              </div>
            ))}
          </div>

          {/* Cross-Fading Unique Thumbnail Stack */}
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
                <span className="font-medium text-white truncate max-w-[120px] sm:max-w-none">
                  {currentTheme.name}
                </span>
                <span className="text-white/60 text-[10px] hidden sm:inline">
                  ({currentTheme.style})
                </span>
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
            <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-3 backdrop-blur-[2px]">
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
            <span>3 Handcrafted Theme Variations:</span>
            <span className="text-signal font-semibold">Auto-Cycles every 3s</span>
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
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: t.accentHex }}
                />
                <span className="truncate">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sector Tag & Client Title */}
        <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
          <span className="card-tag font-mono text-[11px]">{project.sector}</span>
          <span className="text-muted/60 font-mono text-xs">Specimen #{project.num}</span>
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
            to={
              project.nicheSlug.startsWith('/web-design/')
                ? project.nicheSlug
                : `/web-design/${project.nicheSlug.replace('/blog/industries/', '')}/`
            }
            className="text-signal hover:text-ink font-mono font-medium transition-colors inline-flex items-center gap-1"
          >
            <span>Bespoke 7-Day Sprint</span>
            <span>→</span>
          </Link>
          <span className="text-muted/40">·</span>
          <Link
            to={
              project.nicheSlug.startsWith('/blog/industries/')
                ? project.nicheSlug
                : `/blog/industries/${project.id}`
            }
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
   INDEX TILE IN THE 50-SPECIMEN DIRECTORY MATRIX
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
    }, 3200);
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
            style={{ backgroundColor: project.themes[activeTheme]?.accentHex || '#2563EB' }}
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
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // In-Page Viewport Modal State
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter projects based on selected luxury sector and live search query
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return PROJECTS.filter((p) => {
      // 1. Sector match
      let sectorMatch = true;
      if (selectedSector !== 'all') {
        const sector = LUXURY_SECTORS.find((s) => s.id === selectedSector);
        if (sector && sector.projectIds) {
          sectorMatch = sector.projectIds.includes(p.id);
        } else {
          sectorMatch = p.category === selectedSector;
        }
      }

      if (!sectorMatch) return false;

      // 2. Query search
      if (!q) return true;

      const searchableText = [
        p.id,
        p.client,
        p.shortName,
        p.sector,
        p.category,
        p.summary,
        p.result,
        p.conversionEngine,
        ...p.themes.map((t) => `${t.name} ${t.style}`),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [selectedSector, searchQuery]);

  const handleIndexClick = (project: Project) => {
    // If the project is filtered out by sector or search, reset filters
    const currentSector = LUXURY_SECTORS.find((s) => s.id === selectedSector);
    const isVisible =
      (selectedSector === 'all' || (currentSector?.projectIds?.includes(project.id) ?? false)) &&
      (!searchQuery ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.sector.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!isVisible) {
      setSelectedSector('all');
      setSearchQuery('');
    }

    setTimeout(() => {
      const el = document.getElementById(`specimen-${project.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedId(project.id);
        setTimeout(() => setHighlightedId(null), 2500);
      }
    }, 100);
  };

  const handleOpenPreview = (project: Project) => {
    setPreviewProject(project);
    setPreviewDevice('desktop');
  };

  return (
    <>
      <Helmet>
        <title>Website Portfolio &amp; 50 Live Interactive Demos — Uncoded Hub</title>
        <meta
          name="description"
          content="Explore fifty live interactive website specimens handcrafted by Uncoded Hub across 50 high-ticket industries. 150 unique aesthetic themes, sub-second speed, zero platform lock-in."
        />
        <link rel="canonical" href="https://uncodedhub.com/portfolio/" />
        <meta property="og:title" content="Work &amp; 50 Interactive Specimen Builds — Uncoded Hub" />
        <meta
          property="og:description"
          content="Fifty live, interactive specimen websites handcrafted by Uncoded Hub with 150 unique themes across high-ticket industries."
        />
        <meta property="og:url" content="https://uncodedhub.com/portfolio/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/portfolio.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="50 Live Interactive Specimen Websites — Uncoded Hub Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work &amp; 50 Interactive Specimen Builds — Uncoded Hub" />
        <meta
          name="twitter:description"
          content="Fifty live, interactive specimen websites handcrafted by Uncoded Hub with 150 unique themes across high-ticket industries."
        />
        <meta name="twitter:image" content="https://uncodedhub.com/og/portfolio.jpg" />
      </Helmet>

      {/* ── Editorial Header ───────────────────────────────────── */}
      <section className="pt-10 md:pt-14 pb-8">
        <Shell>
          <Reveal>
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <span className="label text-signal font-semibold">
                50 Live Production Builds · 150 Unique Themes
              </span>
              <span className="text-muted text-xs">·</span>
              <span className="text-xs font-mono text-muted bg-paper-raised px-2.5 py-0.5 rounded-full border border-rule">
                3-Second Continuous Theme Cycling
              </span>
              <span className="text-muted text-xs">·</span>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Unique Visual Assets
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink max-w-[20ch] leading-[1.08] tracking-tight">
              Fifty live builds you can test, inspect, and verify{' '}
              <em className="italic hero-signal font-medium">before you commit a single rupee.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-5 max-w-3xl leading-relaxed">
              We engineer zero-bloat, bespoke web systems in seven working days. Below is our complete archive of
              fifty fully interactive production specimens spanning premium healthcare, architecture, legal advisory,
              fine dining, luxury retail, and industrial services. Every specimen features an automatic{' '}
              <strong>3-second continuous theme changeover</strong> (150 completely unique aesthetic themes with
              dedicated color palettes), sub-0.8s Lighthouse performance, and direct client acquisition architecture.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── 50 SPECIMEN DIRECTORY INDEX MATRIX ─────────────────── */}
      <section className="pb-12 pt-2">
        <Shell>
          <Reveal delay={120}>
            <div className="bg-paper-raised p-5 sm:p-7 rounded-[26px] border border-rule-strong shadow-xs">
              {/* Matrix Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-rule">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
                    <h2 className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                      The 50 Specimen Index Matrix
                    </h2>
                    <span className="text-[11px] font-mono text-signal bg-signal/10 px-2 py-0.5 rounded-full">
                      50 Live Builds + 1 Custom Slot
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    Visual Directory: Click any thumbnail to jump to its live demo card &amp; 3-theme studio, or request a custom build.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-muted flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    100% Mobile 4G Verified
                  </span>
                  <span>·</span>
                  <span className="text-ink font-medium">150 Unique Themes (3 Per Build)</span>
                </div>
              </div>

              {/* 50 Interactive Demo Tiles + 1 Custom Slot */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
                {PROJECTS.map((p) => (
                  <IndexTile key={p.id} project={p} onClick={handleIndexClick} />
                ))}

                {/* 51st Slot: Custom Sprint Booking Tile */}
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

      {/* ── Luxury Sectors Filter & Live Command Search Deck ─────── */}
      <section className="pb-8 sticky top-16 z-30 bg-paper/95 backdrop-blur-md pt-2 border-b border-rule/50">
        <Shell>
          <Reveal delay={150}>
            {/* Top row: Sector labels + Search bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono text-muted uppercase tracking-wider block">
                  Curated High-Ticket Industry Sectors:
                </span>
                <span className="text-xs text-ink-soft">
                  Showing {filteredProjects.length} of {PROJECTS.length} specimens across 7 buying groups
                </span>
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full md:w-80">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 50 industries, engines, or styles..."
                  className="w-full text-xs font-sans px-3.5 py-2 pl-8 rounded-full bg-paper-raised border border-rule-strong focus:border-signal focus:outline-hidden text-ink placeholder:text-muted/70 transition-colors shadow-xs"
                />
                <span className="absolute left-3 top-2.5 text-xs text-muted pointer-events-none">🔍</span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2 text-xs text-muted hover:text-ink cursor-pointer"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Sector Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {LUXURY_SECTORS.map((s) => {
                const isActive = selectedSector === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSector(s.id)}
                    className={`text-xs font-sans px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-signal text-paper font-semibold shadow-sm'
                        : 'bg-paper-raised border border-rule-strong text-ink-soft hover:text-ink hover:border-signal/40'
                    }`}
                  >
                    <span>{s.shortLabel}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/25 text-white' : 'bg-paper text-muted'
                      }`}
                    >
                      {s.count}
                    </span>
                  </button>
                );
              })}

              {(selectedSector !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-mono text-signal hover:text-ink underline ml-2 cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Active Sector Description Banner */}
            {selectedSector !== 'all' && (
              <div className="mt-3 p-3 bg-paper rounded-[16px] border border-rule text-xs text-muted flex items-center justify-between gap-3">
                <span>
                  <strong className="text-ink">
                    {LUXURY_SECTORS.find((s) => s.id === selectedSector)?.label}:
                  </strong>{' '}
                  {LUXURY_SECTORS.find((s) => s.id === selectedSector)?.description}
                </span>
                <span className="font-mono text-[11px] text-signal shrink-0">
                  {filteredProjects.length} Specimens Active
                </span>
              </div>
            )}
          </Reveal>
        </Shell>
      </section>

      {/* ── Real projects / Interactive Demos Bento Grid ─────────── */}
      <Section size="default">
        <Shell>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-paper-raised rounded-[28px] border border-rule-strong p-8">
              <span className="text-3xl mb-3 block">🔍</span>
              <h3 className="font-display text-2xl text-ink font-medium">No matching specimens found</h3>
              <p className="text-muted text-sm max-w-md mx-auto mt-2">
                We did not find any specimen matching "{searchQuery}". You can reset filters or request a bespoke 7-day build for your specific industry.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('all');
                    setSearchQuery('');
                  }}
                  className="btn-secondary !py-2 !px-4 text-xs cursor-pointer"
                >
                  Clear search query
                </button>
                <button
                  type="button"
                  onClick={onBook}
                  className="btn-primary !py-2 !px-4 text-xs cursor-pointer"
                >
                  Request Custom Specimen →
                </button>
              </div>
            </div>
          ) : (
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
          )}
        </Shell>
      </Section>

      {/* ── In-Page Viewport Modal (Desktop / Tablet / Mobile) ─────── */}
      {previewProject && (
        <div
          className="fixed inset-0 z-[99999] bg-ink/80 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
          onClick={() => setPreviewProject(null)}
        >
          <div
            className="w-full max-w-6xl h-[92vh] bg-paper-raised rounded-[24px] border border-rule-strong shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
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
                  📱 Tablet (768px)
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
                  📲 Mobile (390px)
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
                  title="Close Dialog (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Iframe Viewport Frame */}
            <div className="flex-1 bg-paper-sunk flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
              <div
                className={`h-full bg-paper rounded-[14px] overflow-hidden shadow-lg border border-rule transition-all duration-300 relative ${
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
                Zero fabricated claims
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-paper font-normal leading-tight">
                The four engineering standards{' '}
                <em className="text-signal-bright italic font-medium">you can verify in your console.</em>
              </h2>
              <p className="text-on-ink-muted text-sm md:text-base leading-relaxed mt-5">
                Every site we build is held to stated performance and positioning standards.
                You don't have to take our word for it — open Chrome DevTools, inspect the network payloads,
                and run an audit on any of our 50 live specimens.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIMEN_STANDARDS.map((s, idx) => (
              <Reveal key={s.n} delay={idx * 70}>
                <div className="p-6 sm:p-8 rounded-[24px] bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright">
                        {s.label}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">{s.badge}</span>
                    </div>
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
              eyebrow="Zero Risk Engineering"
              title="You see the work before you are committed to it."
              intro="Hiring a studio with no public portfolio is a real risk, and pretending otherwise would be insulting. So the project is structured so that you are never far from an exit."
            />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {SPRINT_SEQUENCE.map((s, i) => (
              <Reveal key={s.step} delay={i * 70}>
                <div className="bg-paper-raised p-8 rounded-[24px] border border-rule-strong shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="card-tag">{s.step}</span>
                      <span className="text-[11px] font-mono text-signal bg-signal/10 px-2 py-0.5 rounded-full">
                        {s.badge}
                      </span>
                    </div>
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
                    Judge us by our 50 live specimens and our published 100% money-back guarantee.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs text-on-ink-muted">
                  <span>● Deepak &amp; Geetha</span>
                  <span>·</span>
                  <span>Direct delivery</span>
                  <span>·</span>
                  <span>+91 86608 19023</span>
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
