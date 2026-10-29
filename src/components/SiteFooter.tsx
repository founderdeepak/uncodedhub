import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';
import { hasBlogPosts } from '../lib/blogNav';

const LEAD_MAGNET_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxjs7uylG1UuDne9_rCCd8YfZKp9RRE5vIFK9_Ctq8MMWfur0100fBDwAaTZd2l3_iq/exec';
const LEAD_MAGNET_SECRET = import.meta.env.VITE_LEAD_MAGNET_SECRET || '';

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   Includes the compact Short Version of the Lead Magnet ("The Pre-Sold
   Prospects Audit") at the top of the footer so visitors on any route
   can grab the 10-point diagnostic checklist in one step.
   ═══════════════════════════════════════════════════════════════════ */

const NAV = [
  { label: 'Work', to: '/portfolio' },
  { label: 'Web Design', to: '/web-design/' },
  { label: 'Services', to: '/services' },
  { label: 'Studio', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  ...(hasBlogPosts ? [{ label: 'Blogs', to: '/blog' }] : []),
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Contact', to: '/contact' },
];

const NICHE_LINKS = [
  { label: 'Interior Designers', to: '/web-design/interior-designers/' },
  { label: 'Real Estate Brokers', to: '/web-design/real-estate/' },
  { label: 'Dental Clinics', to: '/web-design/dental-clinics/' },
  { label: 'Wedding Photographers', to: '/web-design/wedding-photographers/' },
  { label: 'Home Renovation', to: '/web-design/home-renovation/' },
  { label: 'Coaches & Consultants', to: '/web-design/coaches-consultants/' },
  { label: 'Educational Academies', to: '/web-design/educational-academy/' },
  { label: 'Gyms & Fitness Clubs', to: '/web-design/gym-fitness-club/' },
  { label: 'Corporate Advisory', to: '/web-design/business-portfolio/' },
  { label: 'Spas & Wellness', to: '/web-design/spa-wellness/' },
  { label: 'Salons & Bridal Beauty', to: '/web-design/salon-beauty/' },
  { label: 'Fitness Coaches', to: '/web-design/fitness-coach/' },
  { label: 'Yoga & Meditation', to: '/web-design/yoga-meditation/' },
  { label: 'Creative Studios', to: '/web-design/creative-portfolio/' },
  { label: 'Pathology Diagnostics', to: '/web-design/healthcare-diagnostics/' },
  { label: 'Polyclinics', to: '/web-design/clinic-polyclinic/' },
  { label: 'Specialist Doctors', to: '/web-design/doctor-specialist/' },
];

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/uncodedhub/' },
  { label: 'X', href: 'https://x.com/uncodedhub' },
  { label: 'Instagram', href: 'https://www.instagram.com/uncodedhub/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@uncodedhub' },
  { label: 'Threads', href: 'https://www.threads.com/@uncodedhub' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61580702457181' },
  { label: 'GitHub', href: 'https://github.com/uncodedhub/' },
  { label: 'Behance', href: 'https://www.behance.net/uncodedhub' },
  { label: 'ProductHunt', href: 'https://www.producthunt.com/@uncodedhub' },
  { label: 'Pinterest', href: 'https://in.pinterest.com/uncodedhub/' },
  { label: 'Reddit', href: 'https://www.reddit.com/user/uncodedhub/' },
  { label: 'Google Maps', href: 'https://maps.app.goo.gl/fwvgEPkguRSfkcC49' },
];

export default function SiteFooter() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [trap, setTrap] = useState('');
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
    <footer className="on-ink pt-16 md:pt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Short Lead Magnet Strip (The 10-Point Audit) ─────────── */}
        <div className="mb-16 p-6 sm:p-8 rounded-[24px] bg-white/[0.04] border border-white/12 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="label text-signal-bright block mb-2">
              Free 10-point diagnostic
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-on-ink font-normal leading-tight">
              The Pre-Sold Prospects Audit
            </h2>
            <p className="text-on-ink-muted text-xs sm:text-sm leading-relaxed mt-2">
              Score your site against our 10-point conversion checklist before booking a call. Sent to your inbox in 60 seconds.
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
                    <strong className="font-medium text-paper block">Audit on its way to {email}</strong>
                    <span className="text-xs text-on-ink-muted">
                      Check your inbox in the next 60 seconds, or open the checklist right now:
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
                    className="sm:w-40 bg-white/[0.06] border border-white/15 text-paper placeholder:text-on-ink-muted/70 px-3.5 py-2.5 text-sm rounded-[8px] focus:border-signal-bright focus:outline-none transition-colors"
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
                    className="flex-1 bg-white/[0.06] border border-white/15 text-paper placeholder:text-on-ink-muted/70 px-3.5 py-2.5 text-sm rounded-[8px] focus:border-signal-bright focus:outline-none transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm px-5 py-2.5 rounded-[8px] transition-colors shrink-0 cursor-pointer disabled:opacity-60"
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
                    Couldn't send right now — email{' '}
                    <a href="mailto:hello@uncodedhub.com?subject=AUDIT" className="underline">
                      hello@uncodedhub.com
                    </a>{' '}
                    with "AUDIT" and we'll send it directly.
                  </p>
                ) : (
                  <p className="text-[11px] text-on-ink-muted font-mono">
                    PDF checklist · Zero spam · Unsubscribe anytime
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-rule-on-ink">
          {/* Studio */}
          <div className="md:col-span-4">
            <span className="inline-flex items-center gap-3">
              <LogoMark size={44} />
              <span className="font-display text-[1.375rem] leading-none">Uncoded Hub</span>
            </span>
            <p className="text-on-ink-muted leading-relaxed mt-6 max-w-sm text-sm">
              A two-person web design and development studio in Bengaluru, working with
              businesses in India and abroad. Fixed price, seven-day schedule, terms published
              in full.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer Pages" className="md:col-span-2">
            <h2 className="label text-on-ink-muted">Pages</h2>
            <ul className="mt-6 space-y-2.5 text-sm">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-quiet text-on-ink hover:text-signal-bright">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries */}
          <nav aria-label="Industries" className="md:col-span-3">
            <h2 className="label text-on-ink-muted">Industries</h2>
            <ul className="mt-6 space-y-2 text-xs">
              {NICHE_LINKS.slice(0, 8).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-quiet text-on-ink hover:text-signal-bright">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/portfolio/" className="text-signal-bright font-mono text-[11px] hover:underline">
                  View All 17 Demos →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-3">
            <h2 className="label text-on-ink-muted">Get in touch</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="mailto:hello@uncodedhub.com"
                  className="link-quiet text-on-ink hover:text-signal-bright"
                >
                  hello@uncodedhub.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918660819023"
                  className="link-quiet text-on-ink hover:text-signal-bright"
                >
                  +91 86608 19023
                </a>
              </li>
              <li className="text-on-ink-muted">Bengaluru, India · Working remotely</li>
              <li className="text-on-ink-muted">Calls 8:00–20:00 IST, seven days</li>
            </ul>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-8">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label text-on-ink-muted hover:text-signal-bright transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bengaluru Locality Hubs SEO Corridor */}
        <div className="py-8 border-b border-rule-on-ink text-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-bright" />
              <span className="label text-on-ink font-semibold">Bengaluru Web Design Hub &amp; Local Corridors</span>
            </div>
            <Link
              to="/web-design/bangalore/"
              className="text-signal-bright font-mono text-[11px] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Master Bangalore Hub (All 25 Localities)</span>
              <span>→</span>
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-on-ink-muted">
            {[
              { name: 'Indiranagar', slug: 'indiranagar' },
              { name: 'Koramangala', slug: 'koramangala' },
              { name: 'Whitefield', slug: 'whitefield' },
              { name: 'HSR Layout', slug: 'hsr-layout' },
              { name: 'Jayanagar', slug: 'jayanagar' },
              { name: 'MG Road', slug: 'mg-road' },
              { name: 'Bellandur', slug: 'bellandur' },
              { name: 'Marathahalli', slug: 'marathahalli' },
              { name: 'Domlur', slug: 'domlur' },
              { name: 'Malleshwaram', slug: 'malleshwaram' },
              { name: 'Electronic City', slug: 'electronic-city' },
              { name: 'Sadashivanagar', slug: 'sadashivanagar' },
              { name: 'Hebbal', slug: 'hebbal' },
              { name: 'Sarjapur Road', slug: 'sarjapur-road' },
              { name: 'Richmond Town', slug: 'richmond-town' },
              { name: 'Halasuru', slug: 'halasuru' },
              { name: 'BTM Layout', slug: 'btm-layout' },
              { name: 'Banashankari', slug: 'banashankari' },
              { name: 'Rajajinagar', slug: 'rajajinagar' },
              { name: 'Kalyan Nagar', slug: 'kalyan-nagar' },
            ].map((loc) => (
              <Link
                key={loc.slug}
                to={`/web-design/bangalore/${loc.slug}/`}
                className="hover:text-signal-bright transition-colors"
              >
                Web Design {loc.name}
              </Link>
            ))}
            <Link
              to="/web-design/bangalore/"
              className="text-signal-bright font-medium hover:underline"
            >
              + 5 More Localities →
            </Link>
          </div>
        </div>

        {/* Closing wordmark — static SVG graphic so decorative low-opacity watermark never trips WCAG text contrast. */}
        <div className="pt-14 pb-10 select-none" aria-hidden="true">
          <svg
            viewBox="0 0 680 110"
            className="w-full max-w-[46rem] h-auto block overflow-visible"
            role="presentation"
            aria-hidden="true"
          >
            <text
              x="0"
              y="92"
              fill="currentColor"
              fillOpacity="0.14"
              className="font-display text-on-ink"
              style={{ fontSize: '112px', letterSpacing: '-0.03em' }}
            >
              Uncoded Hub
            </text>
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-12 border-t border-rule-on-ink pt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="label text-on-ink-muted">
              {`© ${new Date().getFullYear()} Uncoded Hub`}
            </p>
            <span className="text-on-ink-muted/40 text-xs hidden sm:inline">·</span>
            <Link to="/terms/" className="label text-on-ink-muted hover:text-signal-bright transition-colors">
              Terms &amp; Guarantee
            </Link>
            <span className="text-on-ink-muted/40 text-xs">·</span>
            <Link to="/privacy/" className="label text-on-ink-muted hover:text-signal-bright transition-colors">
              Privacy Policy
            </Link>
            <span className="text-on-ink-muted text-xs" aria-hidden="true">·</span>
            <a
              href="/rss.xml"
              className="label text-on-ink-muted hover:text-signal-bright transition-colors"
            >
              RSS Feed
            </a>
          </div>
          <p className="label text-on-ink-muted">Designed and built in-house</p>
        </div>
      </div>
    </footer>
  );
}
