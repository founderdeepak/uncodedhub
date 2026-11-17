import { useState, useEffect, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';
import { LogoMark } from '../components/Logo';
import {
  IconEye,
  IconSearch,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceDesktop,
} from '../components/Glyphs';
import { PROJECTS, type Project, type ThemeItem } from '../data/projects';
export type { Project, ThemeItem };

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO MASTER LANDING PAGE: 3-TIER CURATED SHOWCASE
   
   Structure:
   1. Customer-Focused Hero & Manifesto:
      "Your Business Deserves a Website That Looks as Good as the Work You Do."
   2. Foundational Proof Pillars:
      50 Live Demonstrations · 150 Unique Themes · Sub-0.8s LCP · Zero Bloat
   3. Level 1: Three Curated Flagship Showcases (Storytelling Format)
      - The Challenge, Our Approach, What Makes This Special, Honest Concept Label
   4. Mid-Page Interstitial Discovery CTA
   5. Level 2: Curated Industry Buying Suites (6 Core Luxury Sectors)
   6. Level 3: Complete 50-Project Live Demo Vault with Real-Time Search
   7. Verifiable Performance & DevTools Inspection Proof
   8. Our 7-Day Sprint Delivery Process
   9. Frequently Asked Questions & Radical Honesty
   10. Direct Founder Closing CTA (Deepak & Geetha · +91 86608 19023)
   ═══════════════════════════════════════════════════════════════════ */

export interface LuxurySector {
  id: string;
  label: string;
  shortLabel: string;
  count: number;
  headline: string;
  description: string;
  projectIds: string[];
}

export const LUXURY_SECTORS: LuxurySector[] = [
  {
    id: 'all',
    label: 'All 50 Demos',
    shortLabel: 'All 50 Builds',
    count: 50,
    headline: '50 Working Production Websites Engineered with Zero Theme or Plugin Bloat',
    description:
      'Explore the entire suite of fifty live production builds, featuring 150 unique aesthetic themes, custom typography tokens, and high-conversion client acquisition engines.',
    projectIds: PROJECTS.map((p) => p.id),
  },
  {
    id: 'healthcare',
    label: 'Medical, Dental & Specialty Healthcare',
    shortLabel: 'Medical & Healthcare',
    count: 7,
    headline: 'High-Trust Clinical Systems That Overcome Patient Price Anxiety',
    description:
      'Speciality dental clinics, facial aesthetics, orthopaedic surgeons, diagnostic pathology, optometry studios, and 24/7 veterinary hospitals with clear pricing calculators and instant consultation booking.',
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
    headline: 'Visual Authority Systems for High-Ticket Property & Civil Contracts',
    description:
      'Turnkey residential interior architecture, off-market prime estate advisory, modular renovation studios, civil contracting, landscape gardens, solar EPCs, and biophilic coworking.',
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
    headline: 'Commanding Institutional Web Systems for High-Stakes Retainers',
    description:
      'Commercial litigation chambers, statutory chartered accountancy, fiduciary wealth management, C-suite executive search, performance growth marketing, and sovereign immigration.',
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
    headline: 'Zero-Commission Guest Inbound for Prime Hospitality & Venues',
    description:
      'Wood-fired charcoal kitchens, boutique heritage sanctuaries, artisanal French boulangeries, craft microbreweries, destination galas, gourmet banquets, and fine-art wedding films.',
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
    headline: 'Atmospheric Brand Portals for High-AOV Retail & Personal Wellness',
    description:
      'Hallmarked heirloom diamond ateliers, high-end bridal beauty lounges, private strength clubs, authentic yoga shalas, D2C apothecary skincare, and kinetic design studios.',
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
    headline: 'Mission-Critical Digital Frontlines for B2B Operations & Services',
    description:
      'Precision aerospace OEM tooling, interstate freight cold-chain, VRV thermal HVAC engineering, eco pest control, zero-damage relocation, early Montessori learning, and driving academies.',
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
    body: 'Run Google Lighthouse or WebPageTest on any of the 50 specimens. Zero bloat, zero heavy tracking scripts, and zero runtime dependencies beyond analytics. Every byte is dedicated to immediate prospect engagement.',
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
    body: 'Strict semantic HTML5 landmarks, native skip navigation, visible focus indicators on every control, and 100% compliant contrast ratios throughout. Fully navigable via keyboard, screen reader, or touch gestures.',
  },
  {
    n: '04',
    label: 'Zero-Fluff Conversion Architecture',
    badge: 'Direct Inbound Engine',
    body: 'Every demo is powered by a real client acquisition mechanism: interactive treatment retainers, 14-point title verification audits, or zero-commission table booking systems with zero placeholder text.',
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

const PORTFOLIO_FAQS = [
  {
    q: 'Are these 50 websites real clients or live demonstrations?',
    a: 'These 50 websites are live, fully functional concept demonstrations handcrafted by Uncoded Hub to prove our standards across fifty high-ticket industries before you commit a single rupee. Every layout, calculator, and theme switcher is 100% real code that you can test and inspect right now. When you partner with us, we build a 100% bespoke web system tailored specifically to your business, your brand voice, and your conversion goals.',
  },
  {
    q: 'How can you deliver a complete custom website in just seven working days?',
    a: 'We eliminate the traditional agency bloat. You work directly with our founding engineering team (Deepak & Geetha) on a focused, capped sprint schedule. There are no junior account managers, no endless committee meetings, and zero bloated WordPress plugins to debug. We write clean, custom semantic code with a proven design system, delivering your copy on Day 2, full design on Day 4, and production launch on Day 7.',
  },
  {
    q: 'What happens if I do not approve the design direction?',
    a: 'We offer an ironclad 100% money-back guarantee. You see the full, interactive visual design and written copy on Day 4. If you feel the direction does not match your vision or standards, you receive an immediate, no-questions-asked refund of your deposit before paying the balance. You carry zero financial risk.',
  },
  {
    q: 'Do I own the code, design, and domain after launch?',
    a: 'Yes, 100%. Unlike agencies that trap you on proprietary CMS platforms with recurring monthly maintenance ransoms, Uncoded Hub hands over all clean source code, production assets, and DNS control on Day 7. There is zero vendor lock-in and zero ongoing platform tax.',
  },
];

/* ───────────────────────────────────────────────────────────────────
   LEVEL 1: FLAGSHIP SHOWCASE CARD (DEEP STORYTELLING CASE STUDY)
   ─────────────────────────────────────────────────────────────────── */
function FlagshipCaseStudyCard({
  project,
  onOpenPreview,
  badgeText,
  headline,
  challenge,
  approach,
  whySpecial,
}: {
  project: Project;
  onOpenPreview: (project: Project, themeIdx: number) => void;
  badgeText: string;
  headline: string;
  challenge: string;
  approach: string;
  whySpecial: string;
}) {
  const [activeTheme, setActiveTheme] = useState(0);
  const currentTheme = project.themes[activeTheme] || project.themes[0];

  return (
    <div className="bg-paper-raised border border-rule-strong rounded-[32px] p-6 sm:p-10 shadow-sm hover:border-signal/50 transition-all duration-300">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Story & Architecture */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="inline-block text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-signal/15 text-signal border border-signal/25">
                {badgeText}
              </span>
              <span className="text-xs font-mono text-muted">Specimen #{project.num}</span>
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Live Concept Build
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal leading-tight">
              {project.client}
            </h3>

            <p className="text-ink font-medium text-sm sm:text-base mt-2 leading-snug">
              {headline}
            </p>
          </div>

          {/* Storytelling Breakdown: The Challenge & Approach */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 bg-paper rounded-[16px] border border-rule">
              <strong className="text-signal block font-mono text-[11px] uppercase tracking-wider mb-1">
                The Business Challenge:
              </strong>
              <p className="text-muted leading-relaxed">{challenge}</p>
            </div>

            <div className="p-3.5 bg-paper rounded-[16px] border border-rule">
              <strong className="text-ink-soft block font-mono text-[11px] uppercase tracking-wider mb-1">
                Our Strategic Approach:
              </strong>
              <p className="text-muted leading-relaxed">{approach}</p>
            </div>

            <div className="p-3.5 bg-paper rounded-[16px] border border-rule">
              <strong className="text-emerald-700 block font-mono text-[11px] uppercase tracking-wider mb-1">
                Why This Wins Clients:
              </strong>
              <p className="text-muted leading-relaxed">{whySpecial}</p>
            </div>
          </div>

          {/* Theme Palette & Selector */}
          <div>
            <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Switch Aesthetic Theme:</span>
              <span className="text-signal font-semibold">{currentTheme.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {project.themes.map((t, idx) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveTheme(idx)}
                  className={`py-2 px-2.5 rounded-[12px] text-xs font-sans flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTheme === idx
                      ? 'bg-ink text-paper font-semibold shadow-xs'
                      : 'bg-paper text-muted hover:text-ink border border-rule hover:border-signal/40'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: t.accentHex }}
                  />
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary !py-3 !px-6 text-xs inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Explore Live Demonstration</span>
              <span>↗</span>
            </a>
            <button
              type="button"
              onClick={() => onOpenPreview(project, activeTheme)}
              className="btn-secondary !py-3 !px-4 text-xs inline-flex items-center gap-1.5 cursor-pointer bg-paper border border-rule-strong hover:border-signal"
            >
              <IconEye className="w-3.5 h-3.5" />
              <span>Inspect Viewport</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Frame */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-ink border border-rule-strong shadow-md group">
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-ink text-paper text-[11px] font-mono border-b border-white/10 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{project.id}.uncodedhub.com</span>
              </div>
              <span className="text-[10px] text-signal-bright font-mono">
                {currentTheme.style}
              </span>
            </div>

            {/* Cross-fading theme images */}
            {project.themes.map((theme, idx) => (
              <img
                key={theme.name}
                src={theme.image}
                alt={`${project.client} — ${theme.name} Theme`}
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 top-8 w-full h-[calc(100%-2rem)] object-cover object-top transition-all duration-700 ease-out ${
                  activeTheme === idx
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-[1.03] z-0 pointer-events-none'
                }`}
              />
            ))}

            {/* Hover Floating Overlay */}
            <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-signal hover:bg-signal-bright text-paper text-xs font-semibold px-5 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Live Demonstration</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────
   LEVEL 3: SPECIMEN CARD IN THE 50-BUILD LIBRARY
   ─────────────────────────────────────────────────────────────────── */
function SpecimenCard({
  project,
  onOpenPreview,
}: {
  project: Project;
  onOpenPreview: (project: Project, themeIdx: number) => void;
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
      className="bg-paper-raised p-6 sm:p-8 border border-rule-strong hover:border-signal/50 card-lift flex flex-col justify-between rounded-[28px] group shadow-sm transition-all duration-300 relative"
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
              <div className="bg-ink px-3 py-1.5 rounded-full border border-white/15 text-[11px] text-paper flex items-center gap-2 shadow-md">
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

              <div className="bg-ink px-2.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 shadow-md">
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
            <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-signal hover:bg-signal-bright text-paper text-xs font-semibold px-4 py-2.5 rounded-full shadow-md transition-transform transform hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Live ↗</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenPreview(project, activeTheme)}
                className="bg-ink hover:bg-[#1f2430] text-paper text-xs font-medium px-4 py-2.5 rounded-full shadow-md transition-transform transform hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer border border-white/20"
              >
                <IconEye className="w-3.5 h-3.5" />
                <span>Inspect Viewport</span>
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
            <IconEye className="w-3.5 h-3.5" />
            <span>Inspect</span>
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

export default function Work({ onBook }: { onBook: () => void }) {
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // In-Page Viewport Modal State
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const collectionsRef = useRef<HTMLElement>(null);

  // 3 Curated Flagship Showcases with Storytelling
  const flagshipProjects = useMemo(() => {
    const dental = PROJECTS.find((p) => p.id === 'dental-clinic') || PROJECTS[2];
    const interior = PROJECTS.find((p) => p.id === 'interior-design') || PROJECTS[0];
    const law = PROJECTS.find((p) => p.id === 'law-firm') || PROJECTS[18];

    return [
      {
        project: dental,
        badge: 'Featured Case Study 01 · Clinical Practice Authority',
        headline: 'Helping dental and aesthetic practices turn nervous visitors into booked, confident patients.',
        challenge:
          'Many prospective patients feel acute anxiety about unexpected treatment costs and intimidating clinical jargon. Standard medical templates push visitors away with sterile imagery and generic contact forms.',
        approach:
          'We engineered a calming Nordic aesthetic, an upfront interactive smile fee calculator, patient stop-signal comfort protocols, and a low-friction consultation booking flow.',
        whySpecial:
          'Designed around patient psychological reassurance and transparent cost clarity, generating significantly higher qualified patient bookings than standard medical websites.',
      },
      {
        project: interior,
        badge: 'Featured Case Study 02 · Luxury Architecture & Estates',
        headline: 'Giving residential interior architecture studios the visual gravitas needed to command ₹50L+ retainers.',
        challenge:
          'High-net-worth homeowners refuse to hire studios using generic web templates. They demand verifiable proof of craftsmanship, photorealistic accuracy, and full trade-cost procurement transparency.',
        approach:
          'We built an interactive 3D render-to-reality comparison slider, a 100% itemized trade-cost procurement breakdown (zero contractor kickbacks), and 3 distinct luxury aesthetic themes.',
        whySpecial:
          'Eliminates client budget anxiety through radical trade transparency and elevates the studio to an exclusive, capped 4-client annual roster positioning.',
      },
      {
        project: law,
        badge: 'Featured Case Study 03 · Commercial Litigation & Corporate Retainers',
        headline: 'Positioning commercial litigation chambers for high-stakes enterprise retainers.',
        challenge:
          'Corporate legal boards and enterprise founders do not hire law firms from template websites. They require instant institutional stature, verifiable practice area expertise, and strict conflict-of-interest confidentiality.',
        approach:
          'We architected a Judicial Navy and Parchment editorial layout, a confidential conflict-check intake funnel, a statutory litigation retainer calculator, and direct partner counsel profiles.',
        whySpecial:
          'Commands immediate institutional authority with sub-0.5s loading speed and verified compliance with Bar Council ethical presentation guidelines.',
      },
    ];
  }, []);

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

  const activeSectorData = useMemo(() => {
    return LUXURY_SECTORS.find((s) => s.id === selectedSector) || LUXURY_SECTORS[0];
  }, [selectedSector]);

  const handleOpenPreview = (project: Project) => {
    setPreviewProject(project);
    setPreviewDevice('desktop');
  };

  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Website Portfolio &amp; 50 Live Production Demos — Uncoded Hub</title>
        <meta
          name="description"
          content="Your business deserves a website that looks as good as the work you do. Explore 50 live website demonstrations across 50 industries handcrafted by Uncoded Hub."
        />
        <link rel="canonical" href="https://uncodedhub.com/portfolio/" />
        <meta property="og:title" content="Portfolio &amp; 50 Live Production Demos — Uncoded Hub" />
        <meta
          property="og:description"
          content="Explore 50 live, fully functioning website demonstrations across 50 industries handcrafted with 150 unique themes."
        />
        <meta property="og:url" content="https://uncodedhub.com/portfolio/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/portfolio.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="50 Live Interactive Specimen Websites — Uncoded Hub Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio &amp; 50 Live Production Demos — Uncoded Hub" />
        <meta
          name="twitter:description"
          content="Explore 50 live, fully functioning website demonstrations across 50 industries handcrafted with 150 unique themes."
        />
        <meta name="twitter:image" content="https://uncodedhub.com/og/portfolio.jpg" />
      </Helmet>

      {/* ── CHAPTER 0: CUSTOMER-FOCUSED HERO & VALUE PROPOSITION ── */}
      <section className="pt-12 md:pt-20 pb-16 border-b border-rule/60 relative overflow-hidden bg-gradient-to-b from-paper to-paper-raised/40">
        <Shell>
          <Reveal>
            <div className="flex items-center gap-2.5 mb-5 flex-wrap">
              <span className="label text-signal font-semibold">
                Custom Web Engineering · 7-Day Sprint Guarantee
              </span>
              <span className="text-muted text-xs">·</span>
              <span className="text-xs font-mono text-muted bg-paper px-3 py-1 rounded-full border border-rule">
                50 Production Demonstrations
              </span>
              <span className="text-muted text-xs">·</span>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                150 Hand-Coded Visual Themes
              </span>
            </div>

            {/* Recommended Customer-Centric Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl text-ink max-w-[20ch] leading-[1.05] tracking-tight">
              Your business deserves a website{' '}
              <em className="italic hero-signal font-medium">that looks as good as the work you do.</em>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-lead text-muted mt-6 max-w-3xl leading-relaxed text-base sm:text-lg">
              We build custom, sub-second web systems for ambitious businesses that want to stand out,
              earn institutional trust, and turn more visitors into qualified enquiries. Explore fifty
              live, fully functioning website demonstrations across fifty industries. See the design,
              test the interactive features, and experience what is possible for your business before you
              commit a single rupee.
            </p>
          </Reveal>

          {/* Hero CTAs */}
          <Reveal delay={150}>
            <div className="flex items-center gap-4 mt-8 flex-wrap">
              <button
                type="button"
                onClick={scrollToCollections}
                className="btn-primary !py-3.5 !px-7 text-sm inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explore Our Work (50 Live Demos)</span>
                <span>↓</span>
              </button>
              <button
                type="button"
                onClick={onBook}
                className="btn-secondary !py-3.5 !px-6 text-sm inline-flex items-center gap-2 cursor-pointer bg-paper border border-rule-strong hover:border-signal"
              >
                <span>Schedule a Free 20-Min Discovery</span>
                <span>→</span>
              </button>
            </div>
          </Reveal>

          {/* Four Foundational Proof Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-rule/80">
            <div className="p-4 bg-paper rounded-[18px] border border-rule">
              <span className="font-mono text-xs text-signal block mb-1">01 · Real Proof</span>
              <strong className="text-ink font-display text-lg block">50 Live Demos</strong>
              <span className="text-muted text-xs">Zero static Behance screenshots. Working code you can test.</span>
            </div>

            <div className="p-4 bg-paper rounded-[18px] border border-rule">
              <span className="font-mono text-xs text-signal block mb-1">02 · Style Variety</span>
              <strong className="text-ink font-display text-lg block">150 Unique Themes</strong>
              <span className="text-muted text-xs">3 distinct visual aesthetics hand-coded for each industry.</span>
            </div>

            <div className="p-4 bg-paper rounded-[18px] border border-rule">
              <span className="font-mono text-xs text-signal block mb-1">03 · Verified Speed</span>
              <strong className="text-ink font-display text-lg block">0.4s – 0.8s LCP</strong>
              <span className="text-muted text-xs">100/100 Google Lighthouse Core Web Vitals on real 4G networks.</span>
            </div>

            <div className="p-4 bg-paper rounded-[18px] border border-rule">
              <span className="font-mono text-xs text-signal block mb-1">04 · Full Ownership</span>
              <strong className="text-ink font-display text-lg block">Zero Platform Tax</strong>
              <span className="text-muted text-xs">100% clean source code ownership. Zero recurring plugin fees.</span>
            </div>
          </div>
        </Shell>
      </section>

      {/* ── LEVEL 1: THE THREE FEATURED FLAGSHIP CASE STUDIES ───── */}
      <section className="py-16 md:py-24 border-b border-rule/60 bg-paper">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="label text-signal block mb-3">
                Level 01 · Featured Case Studies
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal leading-tight">
                Three benchmarks in{' '}
                <em className="text-signal italic font-medium">understanding the customer's business.</em>
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed mt-4">
                Before exploring the entire 50-build library, study three flagship systems. Notice how each
                aesthetic theme, typography choice, and interactive conversion tool is engineered around
                resolving customer hesitation and driving enquiries.
              </p>
            </div>
          </Reveal>

          <div className="space-y-12">
            {flagshipProjects.map((flagship, idx) => (
              <Reveal key={flagship.project.id} delay={idx * 80}>
                <FlagshipCaseStudyCard
                  project={flagship.project}
                  onOpenPreview={handleOpenPreview}
                  badgeText={flagship.badge}
                  headline={flagship.headline}
                  challenge={flagship.challenge}
                  approach={flagship.approach}
                  whySpecial={flagship.whySpecial}
                />
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── MID-PAGE INTERSTITIAL TRUST CTA ─────────────────────── */}
      <section className="py-12 bg-ink text-paper border-y border-white/10">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="label text-signal-bright block mb-1">
                  Ready to upgrade your business online?
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-paper font-normal">
                  Love what you see? We can engineer a custom web system for your business in 7 days.
                </h3>
                <p className="text-on-ink-muted text-xs sm:text-sm mt-1 max-w-2xl">
                  Written scope on Day 1, full copy deck on Day 2, interactive design on Day 4, and live launch on Day 7.
                  Backed by our published 100% money-back guarantee.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={onBook}
                  className="btn-primary !bg-signal hover:!bg-signal-bright !py-3.5 !px-6 text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Book Free 20-Min Discovery</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── LEVEL 2: CURATED INDUSTRY BUYING SUITES ─────────────── */}
      <section ref={collectionsRef} className="py-16 border-b border-rule/60 bg-paper-raised/30">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="label text-signal block mb-2">
                  Level 02 · Industry Collections
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
                  Explore by Your Industry
                </h2>
                <p className="text-muted text-sm mt-2 max-w-xl">
                  Browse demonstrations tailored to your specific field. Every build includes interactive features,
                  sub-second speed, and three distinct design aesthetics.
                </p>
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full md:w-80">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 50 industries, features, or styles..."
                  className="w-full text-xs font-sans px-4 py-2.5 pl-9 rounded-full bg-paper border border-rule-strong focus:border-signal focus:outline-hidden text-ink placeholder:text-muted/70 transition-colors shadow-xs"
                />
                <span className="absolute left-3 top-3 text-xs text-muted pointer-events-none">
                  <IconSearch className="w-3.5 h-3.5" />
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-muted hover:text-ink cursor-pointer"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Sector Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              {LUXURY_SECTORS.map((s) => {
                const isActive = selectedSector === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSector(s.id)}
                    className={`text-xs font-sans px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-signal text-paper font-semibold shadow-md'
                        : 'bg-paper border border-rule-strong text-ink hover:text-signal hover:border-signal/50 shadow-xs'
                    }`}
                  >
                    <span>{s.shortLabel}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-paper-raised text-muted'
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
                  className="text-xs font-mono text-signal hover:text-ink underline ml-3 cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Sector Overview Banner */}
            <div className="p-6 bg-paper rounded-[24px] border border-rule shadow-xs mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono text-signal uppercase tracking-wider block mb-1">
                    Sector Suite · {activeSectorData.count} Working Demonstrations
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl text-ink font-medium">
                    {activeSectorData.headline}
                  </h3>
                  <p className="text-muted text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
                    {activeSectorData.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-mono text-xs text-muted block">Active Results:</span>
                  <span className="font-display text-2xl text-signal font-medium">
                    {filteredProjects.length} / 50
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── LEVEL 3: COMPLETE 50-PROJECT LIVE DEMO VAULT ───────── */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-paper rounded-[28px] border border-rule-strong p-8">
              <span className="w-12 h-12 rounded-full bg-paper-raised border border-rule flex items-center justify-center mx-auto mb-4 text-muted">
                <IconSearch className="w-5 h-5 text-signal" />
              </span>
              <h3 className="font-display text-2xl text-ink font-medium">No matching demonstrations found</h3>
              <p className="text-muted text-sm max-w-md mx-auto mt-2">
                We did not find any demonstration matching "{searchQuery}". You can reset filters or request a bespoke 7-day build for your specific industry.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('all');
                    setSearchQuery('');
                  }}
                  className="btn-secondary !py-2.5 !px-5 text-xs cursor-pointer"
                >
                  Clear search query
                </button>
                <button
                  type="button"
                  onClick={onBook}
                  className="btn-primary !py-2.5 !px-5 text-xs cursor-pointer"
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
                  />
                </Reveal>
              ))}
            </div>
          )}
        </Shell>
      </section>

      {/* ── CHAPTER 4: VERIFIABLE PERFORMANCE PROOF ─────────────── */}
      <section className="bg-ink text-paper py-20 md:py-28 relative overflow-hidden border-y border-white/10">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/4 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none"
        />

        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="label text-signal-bright block mb-3">
                Verifiable Engineering Proof
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-paper font-normal leading-tight [text-wrap:balance]">
                The four engineering standards{' '}
                <span className="text-signal-bright font-medium">you can verify in your console.</span>
              </h2>
              <p className="text-on-ink-muted text-sm md:text-base leading-relaxed mt-5">
                Every website we deliver is held to measurable, uncompromising engineering standards.
                You don't need to take our word for it — open Chrome DevTools (F12), inspect the network payloads,
                and run a Google Lighthouse audit on any of our 50 live production builds.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIMEN_STANDARDS.map((s, idx) => (
              <Reveal key={s.n} delay={idx * 70}>
                <div className="p-6 sm:p-8 rounded-[20px] bg-[#14161c] border border-white/10 flex flex-col justify-between h-full">
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

      {/* ── CHAPTER 5: THE 7-DAY SPRINT DELIVERY PROCESS ─────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="02"
              eyebrow="Our Delivery Process"
              title="You see the real website before committing the balance."
              intro="Hiring an agency without seeing proof of execution is a real risk. Our 7-day sprint is architected so that you are never trapped and hold 100% control over the outcome."
            />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {SPRINT_SEQUENCE.map((s, i) => (
              <Reveal key={s.step} delay={i * 70}>
                <div className="bg-paper-raised p-8 rounded-[24px] border border-rule-strong shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="card-tag">{s.step}</span>
                      <span className="text-[11px] font-mono text-signal bg-signal/10 px-2.5 py-0.5 rounded-full">
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

      {/* ── CHAPTER 6: FREQUENTLY ASKED QUESTIONS ───────────────── */}
      <section className="py-16 md:py-24 border-t border-rule/60 bg-paper-raised/40">
        <Shell>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="label text-signal block mb-3">
                Radical Transparency
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed mt-4">
                We believe in total upfront honesty about our process, our 50 demonstration builds, and how we deliver for paying clients.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-6">
            {PORTFOLIO_FAQS.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="p-6 sm:p-8 bg-paper rounded-[24px] border border-rule-strong shadow-xs">
                  <h4 className="font-display text-lg sm:text-xl text-ink font-medium mb-3">
                    {faq.q}
                  </h4>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── IN-PAGE VIEWPORT MODAL SIMULATOR ─────────────────────── */}
      {previewProject && (
        <div
          className="fixed inset-0 z-[99999] bg-ink/90 flex flex-col items-center justify-center p-3 sm:p-6"
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
                    Live Production Demonstration · {previewProject.sector}
                  </span>
                </div>
              </div>

              {/* Device Selector Controls */}
              <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-full border border-white/15">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    previewDevice === 'desktop'
                      ? 'bg-signal text-paper font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <IconDeviceDesktop className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    previewDevice === 'tablet'
                      ? 'bg-signal text-paper font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <IconDeviceTablet className="w-3.5 h-3.5" />
                  <span>Tablet (768px)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    previewDevice === 'mobile'
                      ? 'bg-signal text-paper font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <IconDeviceMobile className="w-3.5 h-3.5" />
                  <span>Mobile (390px)</span>
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

      {/* ── CHAPTER 7: DIRECT FOUNDER ACCOUNTABILITY CLOSING CTA ── */}
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
                    "Can you build something this good for my business?" is the right question.
                    We will give you a straight answer, an honest written scope, and a fixed price.
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
