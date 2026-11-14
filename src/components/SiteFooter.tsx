import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoMark } from './Logo';
import { hasBlogPosts } from '../lib/blogNav';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { NICHES } from '../lib/blog';
import { BANGALORE_LOCALITIES } from '../data/bangaloreLocalities';

const LEAD_MAGNET_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxjs7uylG1UuDne9_rCCd8YfZKp9RRE5vIFK9_Ctq8MMWfur0100fBDwAaTZd2l3_iq/exec';
const LEAD_MAGNET_SECRET = import.meta.env.VITE_LEAD_MAGNET_SECRET || '';

/* ═══════════════════════════════════════════════════════════════════
   SITE FOOTER — LUXURY ARCHITECTURAL INDEX ARCHITECTURE (OPTION 4)
   Crafted with editorial precision: curated top navigation, dedicated
   7 client services, premier portfolio demo gateway, and an expandable
   architectural drawer housing 50 industry silos & 100 Bengaluru corridors.
   ═══════════════════════════════════════════════════════════════════ */

const SERVICE_LINKS = [
  { label: 'Custom Website Design (UI/UX)', to: '/services/#design' },
  { label: 'Custom Web Development', to: '/services/#development' },
  { label: 'Website Redesign & Migration', to: '/services/#redesign' },
  { label: 'Landing Pages & Lead Funnels', to: '/services/#landing-pages' },
  { label: 'E-Commerce Storefronts', to: '/services/#ecommerce' },
  { label: 'Speed & Core Web Vitals (100 CWV)', to: '/services/#optimization' },
  { label: 'Website Care & Support', to: '/services/#maintenance' },
];

const COMPANY_LINKS = [
  { label: 'Work & Portfolio', to: '/portfolio/' },
  { label: 'About Deepak & Geetha', to: '/about/' },
  { label: 'Compare Alternatives', to: '/alternatives/' },
  { label: 'Problem Solutions', to: '/solutions/' },
  { label: 'Pricing & Sprints', to: '/services/#pricing' },
  { label: '10-Point Pre-Sold Audit', to: '/audit-checklist/' },
  ...(hasBlogPosts ? [{ label: 'Master Pillar Guides', to: '/blog/' }] : []),
  { label: 'Contact Studio', to: '/contact/' },
];

const ALTERNATIVE_LINKS = [
  { label: 'Webflow Alternative (Zero Lock-In)', to: '/alternatives/webflow/' },
  { label: 'Framer Alternative (Zero Hydration Lag)', to: '/alternatives/framer/' },
  { label: 'WordPress vs Custom React Code', to: '/alternatives/wordpress/' },
  { label: 'Shopify Alternative (Zero App Subscriptions)', to: '/alternatives/shopify/' },
  { label: 'Wix & Squarespace Alternatives', to: '/alternatives/wix-squarespace/' },
  { label: 'Traditional Agency Alternative (7-Day Sprints)', to: '/alternatives/traditional-agencies/' },
  { label: 'Freelancer Marketplaces Alternative', to: '/alternatives/freelancer-marketplaces/' },
  { label: 'HubSpot CMS Alternative (Zero Enterprise Tax)', to: '/alternatives/hubspot-cms/' },
  { label: 'Offshore Dev Shops Alternative (Co-Founder Led)', to: '/alternatives/offshore-dev-shops/' },
  { label: 'In-House Developer Alternative (On-Demand Team)', to: '/alternatives/in-house-developer/' },
];

const SOLUTION_LINKS = [
  { label: 'Website Speed Optimization (100/100 CWV)', to: '/solutions/speed-optimization/' },
  { label: 'Outdated Website Redesign', to: '/solutions/website-redesign/' },
  { label: 'Lead Generation Conversion Architecture', to: '/solutions/lead-generation-websites/' },
  { label: 'Appointment & Booking Engine Websites', to: '/solutions/booking-websites/' },
  { label: 'Paid Ad Landing Page Optimization', to: '/solutions/high-converting-landing-pages/' },
  { label: 'Local SEO & Geo-Targeted Architecture', to: '/solutions/local-seo-architecture/' },
  { label: 'Enterprise & Corporate B2B Websites', to: '/solutions/corporate-b2b-websites/' },
  { label: 'Multi-Location & Franchise Web Architecture', to: '/solutions/multi-location-websites/' },
  { label: 'Payment-Enabled & Direct Checkout Websites', to: '/solutions/payment-enabled-websites/' },
  { label: 'High-Ticket Portfolio & Case Study Showcase', to: '/solutions/portfolio-websites/' },
];

const INDUSTRY_LINKS = [
  { label: 'Dental & Aesthetic Clinics', to: '/web-design/dental-clinics/' },
  { label: 'Real Estate & Builders', to: '/web-design/real-estate/' },
  { label: 'Interior Designers & Architects', to: '/web-design/interior-designers/' },
  { label: 'Restaurants & Hospitality', to: '/web-design/restaurants/' },
  { label: 'Law Firms & Legal Advocates', to: '/web-design/law-firms/' },
  { label: 'Home Renovation & Services', to: '/web-design/home-renovation/' },
  { label: 'Doctors & Super-Specialists', to: '/web-design/doctor-specialist/' },
  { label: 'Gyms, Fitness & Wellness', to: '/web-design/gym-fitness-club/' },
];

const ALL_50_NICHES = (Object.keys(NICHES) as (keyof typeof NICHES)[])
  .filter((k) => k !== 'studio')
  .map((k) => ({
    slug: k,
    name: NICHES[k],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const ALL_BENGALURU_LOCALITIES = Object.values(BANGALORE_LOCALITIES).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default function SiteFooter() {
  const location = useLocation();
  const whatsappUrl = getWhatsAppUrl(location.pathname);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [trap, setTrap] = useState('');
  const [indexTab, setIndexTab] = useState<'niches' | 'localities'>('niches');
  const [isIndexExpanded, setIsIndexExpanded] = useState(false);
  const startedAt = useRef(Date.now());

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return;
    if (Date.now() - startedAt.current < 1500) return;
    setStatus('sending');

    try {
      const trimmedEmail = email.trim();
      const trimmedName = firstName.trim();

      import('../lib/supabase')
        .then(({ submitLead }) =>
          submitLead({
            name: trimmedName || 'Footer Subscriber',
            email: trimmedEmail,
            business_type: 'Footer Lead Magnet: Pre-Sold Prospects Audit',
            project_details: 'Requested the Pre-Sold Prospects Audit from the compact footer form.',
          }),
        )
        .catch(() => {});

      try {
        localStorage.setItem(
          'uh_audit_unlocked',
          JSON.stringify({
            email: trimmedEmail,
            name: trimmedName,
            unlockedAt: Date.now(),
          }),
        );
      } catch {}

      const res = await fetch(LEAD_MAGNET_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          token: LEAD_MAGNET_SECRET,
          email: trimmedEmail,
          first_name: trimmedName,
          firstName: trimmedName,
          name: trimmedName,
        }),
      });
      const json = await res.json().catch(() => null);
      setStatus(json?.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="on-ink pt-16 md:pt-24 border-t border-rule-on-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* ── 1. Compact Lead Magnet Bar (The 10-Point Diagnostic) ── */}
        <div className="mb-16 p-6 sm:p-8 rounded-[24px] bg-white/[0.04] border border-white/12 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-signal-bright block mb-2">
              Free 10-Point Conversion Diagnostic
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-on-ink font-normal leading-tight">
              The Pre-Sold Prospects Audit
            </h2>
            <p className="text-on-ink-muted text-sm leading-relaxed mt-2">
              Score your website against our 10-point buyer conversion checklist before hiring an agency. Delivered instantly in 60 seconds.
            </p>
          </div>

          <div className="lg:col-span-7">
            {status === 'sent' ? (
              <div className="p-4 sm:p-5 rounded-[16px] bg-white/[0.06] border border-white/15 text-sm text-on-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-signal text-paper flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong className="font-medium text-paper block">Audit dispatched to {email}</strong>
                    <span className="text-xs text-on-ink-muted">
                      Check your inbox, or jump straight into the full interactive checklist:
                    </span>
                  </div>
                </div>
                <Link
                  to="/audit-checklist/"
                  className="bg-signal hover:bg-signal-bright text-paper text-xs font-semibold px-4 py-2.5 rounded-full transition-colors shrink-0 text-center"
                >
                  View Checklist Now →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <label htmlFor="footer-lm-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="footer-lm-name"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="sm:w-44 bg-white/[0.06] border border-white/15 text-paper placeholder:text-on-ink-muted/70 px-4 py-2.5 text-sm rounded-[10px] focus:border-signal-bright focus:outline-none transition-colors"
                  />

                  <label htmlFor="footer-lm-email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="footer-lm-email"
                    type="email"
                    required
                    placeholder="Your work email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/[0.06] border border-white/15 text-paper placeholder:text-on-ink-muted/70 px-4 py-2.5 text-sm rounded-[10px] focus:border-signal-bright focus:outline-none transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm px-6 py-2.5 rounded-[10px] transition-colors shrink-0 cursor-pointer disabled:opacity-60 font-semibold"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Free Audit →'}
                  </button>
                </div>

                {/* Honeypot */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="footer-lm-trap">Website</label>
                  <input
                    id="footer-lm-trap"
                    tabIndex={-1}
                    autoComplete="off"
                    value={trap}
                    onChange={(e) => setTrap(e.target.value)}
                  />
                </div>

                {status === 'error' ? (
                  <p className="text-xs text-signal-bright" role="alert">
                    Couldn't dispatch right now — email{' '}
                    <a href="mailto:hello@uncodedhub.com?subject=AUDIT" className="underline">
                      hello@uncodedhub.com
                    </a>{' '}
                    with "AUDIT" and we will send it directly.
                  </p>
                ) : (
                  <p className="text-xs text-on-ink-muted font-mono">
                    Free PDF diagnostic · Zero spam · 100% actionable
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* ── 2. Primary 5-Column Navigation Matrix ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          
          {/* Column 1: Studio Identity & Bio (4 cols) */}
          <div className="lg:col-span-4 pr-0 lg:pr-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <LogoMark size={40} />
              <div>
                <span className="font-display text-2xl text-on-ink block leading-none">Uncoded Hub</span>
                <span className="text-[10px] font-mono text-on-ink-muted uppercase tracking-wider mt-1 block">
                  Web Engineering Studio
                </span>
              </div>
            </Link>

            <p className="text-on-ink-muted text-sm leading-relaxed mt-6 max-w-sm">
              Custom, ultra-fast React web platforms for high-ticket service businesses in Bengaluru and global hubs. Zero WordPress bloat. Contractual 7-day sprint protocol.
            </p>

            {/* Social Channels Row */}
            <div className="mt-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-on-ink-muted block mb-3">
                Connect with the Founders
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    name: 'WhatsApp',
                    href: whatsappUrl,
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'LinkedIn',
                    href: 'https://www.linkedin.com/company/uncodedhub/',
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'X (Twitter)',
                    href: 'https://x.com/uncodedhub',
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'GitHub',
                    href: 'https://github.com/uncodedhub/',
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'YouTube',
                    href: 'https://www.youtube.com/@uncodedhub',
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'Instagram',
                    href: 'https://www.instagram.com/uncodedhub/',
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/12 flex items-center justify-center text-on-ink-muted hover:text-signal-bright hover:border-signal-bright transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: What We Build — Services (2 cols) */}
          <nav aria-label="Services" className="lg:col-span-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-on-ink block mb-5">
              Services
            </span>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-on-ink-muted hover:text-signal-bright transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Specialized Platforms (2 cols) */}
          <nav aria-label="Industries" className="lg:col-span-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-on-ink block mb-5">
              Platforms
            </span>
            <ul className="space-y-3">
              {INDUSTRY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-on-ink-muted hover:text-signal-bright transition-colors block truncate"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 flex flex-col gap-1.5 border-t border-white/10">
                <Link
                  to="/portfolio/"
                  className="text-xs font-mono text-signal-bright hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>All 50 Demos (3 Themes)</span>
                  <span>→</span>
                </Link>
                <Link
                  to="/web-design/"
                  className="text-xs font-mono text-on-ink-muted hover:text-signal-bright inline-flex items-center gap-1 font-medium"
                >
                  <span>All 50 Industry Silos</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4: Company & Trust (2 cols) */}
          <nav aria-label="Company Links" className="lg:col-span-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-on-ink block mb-5">
              Company
            </span>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-on-ink-muted hover:text-signal-bright transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 5: Direct Verification & Channels (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-on-ink block mb-5">
              Direct Channels
            </span>

            <div className="space-y-2.5">
              {/* Google Maps Card */}
              <a
                href="https://maps.app.goo.gl/fwvgEPkguRSfkcC49"
                target="_blank"
                rel="noreferrer noopener"
                className="p-3 rounded-[14px] bg-white/[0.04] border border-white/12 hover:border-signal-bright flex items-center gap-3 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-full bg-signal/15 text-signal-bright flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-4.198 0-8 3.402-8 7.602 0 4.884 7.031 15.421 7.33 15.867.168.25.45.399.75.399.299 0 .582-.149.75-.399.299-.446 7.33-10.983 7.33-15.867 0-4.2-3.802-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-on-ink group-hover:text-signal-bright block leading-tight">
                    Google Maps
                  </span>
                  <span className="text-[10px] text-on-ink-muted block truncate">
                    Verified Studio
                  </span>
                </div>
              </a>

              {/* Direct WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="p-3 rounded-[14px] bg-white/[0.04] border border-white/12 hover:border-signal-bright flex items-center gap-3 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-full bg-signal/15 text-signal-bright flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-on-ink group-hover:text-signal-bright block leading-tight">
                    WhatsApp Chat
                  </span>
                  <span className="text-[10px] text-on-ink-muted block truncate">
                    Direct Founder Line
                  </span>
                </div>
              </a>
            </div>

            {/* Direct Studio Metadata */}
            <div className="mt-5 pt-4 border-t border-white/10 text-xs text-on-ink-muted space-y-1.5 font-mono">
              <a href="tel:+918660819023" className="block hover:text-signal-bright transition-colors">
                📞 +91 86608 19023
              </a>
              <a href="mailto:hello@uncodedhub.com" className="block hover:text-signal-bright transition-colors">
                ✉️ hello@uncodedhub.com
              </a>
              <p className="text-[11px] text-on-ink-muted/80 pt-1">
                📍 Bengaluru · 08:00–20:00 IST
              </p>
            </div>
          </div>
        </div>

        {/* ── 2b. Solutions & Alternatives Matrix (Vertical Side-by-Side) ── */}
        <div className="py-10 border-t border-rule-on-ink text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            
            {/* Column 1: Problem-Based Solutions */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-on-ink flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-signal-bright" />
                  Engineered Web Solutions
                </span>
                <Link
                  to="/solutions/"
                  className="text-signal-bright font-mono text-xs hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Solutions Hub</span>
                  <span>→</span>
                </Link>
              </div>

              <ul className="space-y-2.5">
                {SOLUTION_LINKS.map((sol) => (
                  <li key={sol.to}>
                    <Link
                      to={sol.to}
                      className="text-sm text-on-ink-muted hover:text-signal-bright transition-colors flex items-center justify-between group py-0.5"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{sol.label}</span>
                      <span className="text-on-ink-muted/30 group-hover:text-signal-bright text-xs">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Architectural Comparisons & Alternatives */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-on-ink flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-signal-bright" />
                  Compare Alternatives
                </span>
                <Link
                  to="/alternatives/"
                  className="text-signal-bright font-mono text-xs hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Alternatives Hub</span>
                  <span>→</span>
                </Link>
              </div>

              <ul className="space-y-2.5">
                {ALTERNATIVE_LINKS.map((alt) => (
                  <li key={alt.to}>
                    <Link
                      to={alt.to}
                      className="text-sm text-on-ink-muted hover:text-signal-bright transition-colors flex items-center justify-between group py-0.5"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{alt.label}</span>
                      <span className="text-on-ink-muted/30 group-hover:text-signal-bright text-xs">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── 3. Architectural Index Drawer: 50 Niches & 100 Corridors (Option 4) ── */}
        <div className="py-12 border-t border-rule-on-ink text-xs">
          
          {/* Live Demos Showcase Strip — One Premier Link to All 50 Demos */}
          <div className="mb-8 p-4 sm:p-5 rounded-[18px] bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-signal/15 text-signal-bright flex items-center justify-center shrink-0 font-mono text-sm">
                🎮
              </span>
              <div>
                <span className="text-on-ink font-medium block">
                  Interactive Specimen Showcase: 50 Live Industry Demos
                </span>
                <span className="text-[11px] text-on-ink-muted">
                  Every industry platform includes 3 live switchable visual themes (Modern Luxe, Minimal Editorial, High-Contrast).
                </span>
              </div>
            </div>

            <Link
              to="/portfolio/"
              className="bg-white/10 hover:bg-signal-bright hover:text-paper text-on-ink px-4 py-2 rounded-full font-mono text-xs transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Explore All 50 Demos in Portfolio</span>
              <span>→</span>
            </Link>
          </div>

          {/* Directory Header with Luxury Tab Switcher & Drawer Toggle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-signal-bright block mb-1">
                ARCHITECTURAL DIRECTORY
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-on-ink font-normal tracking-tight">
                50 Specialized Industry Silos &amp; 100 Bengaluru Corridors
              </h3>
              <p className="text-on-ink-muted text-xs mt-1">
                Bespoke React platforms engineered by senior founders Deepak &amp; Geetha with 7-day guarantee.
              </p>
            </div>

            {/* Interactive Tab Switcher & Drawer Toggle */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10">
                <button
                  type="button"
                  onClick={() => setIndexTab('niches')}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    indexTab === 'niches'
                      ? 'bg-signal-bright text-paper font-semibold shadow-xs'
                      : 'text-on-ink-muted hover:text-on-ink'
                  }`}
                >
                  50 Industry Silos ({ALL_50_NICHES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setIndexTab('localities')}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    indexTab === 'localities'
                      ? 'bg-signal-bright text-paper font-semibold shadow-xs'
                      : 'text-on-ink-muted hover:text-on-ink'
                  }`}
                >
                  100 Bengaluru Corridors ({ALL_BENGALURU_LOCALITIES.length})
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsIndexExpanded(!isIndexExpanded)}
                className="px-3.5 py-1.5 rounded-full border border-white/15 text-on-ink-muted hover:text-on-ink hover:border-white/30 font-mono text-xs transition-colors cursor-pointer"
              >
                {isIndexExpanded ? 'Collapse ↑' : 'Expand All ↓'}
              </button>
            </div>
          </div>

          {/* 50 Industry Niches Container */}
          <div className={indexTab === 'niches' ? 'block' : 'hidden'}>
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-on-ink-muted">
              <span>National &amp; Global Industry Specializations</span>
              <Link to="/web-design/" className="text-signal-bright hover:underline">
                View Master Web Design Hub →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2 text-xs">
              {(isIndexExpanded ? ALL_50_NICHES : ALL_50_NICHES.slice(0, 15)).map((niche) => (
                <Link
                  key={niche.slug}
                  to={`/web-design/${niche.slug}/`}
                  className="text-on-ink-muted hover:text-signal-bright transition-colors truncate flex items-center gap-1.5 py-0.5 group"
                  title={niche.name}
                >
                  <span className="text-signal-bright/40 group-hover:text-signal-bright text-[10px] font-mono transition-colors shrink-0">
                    📐
                  </span>
                  <span className="truncate">{niche.name}</span>
                </Link>
              ))}
            </div>

            {!isIndexExpanded && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsIndexExpanded(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-signal-bright text-xs text-on-ink-muted hover:text-on-ink font-mono transition-colors cursor-pointer"
                >
                  <span>+35 More Specialized Industry Silos</span>
                  <span className="text-signal-bright">↓ Expand Complete Directory</span>
                </button>
              </div>
            )}
          </div>

          {/* 100 Bengaluru Localities Container */}
          <div className={indexTab === 'localities' ? 'block' : 'hidden'}>
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-on-ink-muted">
              <span>Serving Pincodes 560001–560103 Across All 5 Zones</span>
              <Link to="/web-design/bangalore/" className="text-signal-bright hover:underline">
                View Master Bangalore Hub &amp; Map →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2 text-xs">
              {(isIndexExpanded ? ALL_BENGALURU_LOCALITIES : ALL_BENGALURU_LOCALITIES.slice(0, 20)).map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/web-design/bangalore/${loc.slug}/`}
                  className="text-on-ink-muted hover:text-signal-bright transition-colors truncate flex items-center gap-1.5 py-0.5 group"
                  title={`${loc.name}, Bengaluru (${loc.pincode})`}
                >
                  <span className="text-signal-bright/40 group-hover:text-signal-bright text-[10px] font-mono transition-colors shrink-0">
                    📍
                  </span>
                  <span className="truncate">{loc.name}</span>
                </Link>
              ))}
            </div>

            {!isIndexExpanded && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsIndexExpanded(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-signal-bright text-xs text-on-ink-muted hover:text-on-ink font-mono transition-colors cursor-pointer"
                >
                  <span>+80 More Bengaluru Neighborhoods</span>
                  <span className="text-signal-bright">↓ Expand Complete Directory</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* ── 4. Decorative Studio Wordmark Graphic ── */}
        <div className="pt-10 pb-8 select-none" aria-hidden="true">
          <svg
            viewBox="0 0 680 110"
            className="w-full max-w-[44rem] h-auto block overflow-visible"
            role="presentation"
            aria-hidden="true"
          >
            <text
              x="0"
              y="92"
              fill="currentColor"
              fillOpacity="0.10"
              className="font-display text-on-ink"
              style={{ fontSize: '106px', letterSpacing: '-0.03em' }}
            >
              Uncoded Hub
            </text>
          </svg>
        </div>

        {/* ── 5. Bottom Legal, Copyright & Guarantee Bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 border-t border-rule-on-ink text-xs text-on-ink-muted">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-mono">
              {`© ${new Date().getFullYear()} Uncoded Hub · Bengaluru, Karnataka`}
            </p>
            <span className="text-on-ink-muted/40 hidden sm:inline">·</span>
            <Link to="/terms/" className="hover:text-signal-bright transition-colors font-mono">
              Terms &amp; 7-Day Guarantee
            </Link>
            <span className="text-on-ink-muted/40">·</span>
            <Link to="/privacy/" className="hover:text-signal-bright transition-colors font-mono">
              Privacy Policy
            </Link>
            <span className="text-on-ink-muted/40">·</span>
            <a href="/rss.xml" className="hover:text-signal-bright transition-colors font-mono">
              RSS Feeds
            </a>
          </div>
          <p className="font-mono text-[11px] text-on-ink-muted/80">
            Handcrafted with semantic React · 100% Client Ownership
          </p>
        </div>

      </div>
    </footer>
  );
}
