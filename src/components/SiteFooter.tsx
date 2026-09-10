import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

/* ═══════════════════════════════════════════════════════════════════
   FOOTER

   The previous footer ended in a mouse-tracked SVG wordmark with a
   radial cyan/magenta gradient that followed the cursor — desktop only,
   and re-rendering an SVG gradient on every mousemove. The large closing
   wordmark was a good editorial instinct, so it is kept; the neon and
   the per-frame state are not. It is now a static serif lockup that
   costs nothing and reads on every device.

   Note also that /portfolio is linked from here and from the header.
   Previously it was routed and listed in sitemap.xml but linked from
   nowhere except one hero button — an orphaned page carrying the entire
   proof argument.
   ═══════════════════════════════════════════════════════════════════ */

const NAV = [
  { label: 'Work', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Studio', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/uncodedhub/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/uncodedhub/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@uncodedhub' },
  { label: 'Threads', href: 'https://www.threads.com/@uncodedhub' },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Uncoded-Hub/61580702457181/' },
];

export default function SiteFooter() {
  return (
    <footer className="on-ink pt-20 md:pt-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-10 pb-16 border-b border-rule-on-ink">
          {/* Studio */}
          <div className="md:col-span-5">
            <span className="inline-flex items-center gap-3">
              <LogoMark size={44} />
              <span className="font-display text-[1.375rem] leading-none">Uncoded Hub</span>
            </span>
            <p className="text-on-ink-muted leading-relaxed mt-6 max-w-sm">
              A two-person web design and development studio in Bengaluru, working with
              businesses in India and abroad. Fixed price, seven-day schedule, terms published
              in full.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="label text-on-ink-muted">Pages</h2>
            <ul className="mt-6 space-y-3">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-quiet text-on-ink hover:text-signal-bright">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
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

        {/* Closing wordmark — static, no cursor tracking, no gradient. */}
        <div className="pt-14 pb-10 select-none" aria-hidden="true">
          <span
            className="font-display block text-on-ink/[0.14] leading-[0.8] tracking-[-0.03em]"
            /* Kept deliberately larger than any headline on the page —
               it is a closing flourish, not a heading — but scaled back
               to roughly twice the hero when the type scale was retuned,
               rather than the 3.5× it had drifted to. */
            style={{ fontSize: 'clamp(2.75rem, 9vw, 8.5rem)' }}
          >
            Uncoded Hub
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-12 border-t border-rule-on-ink pt-8">
          <p className="label text-on-ink-muted">
            © {new Date().getFullYear()} Uncoded Hub
          </p>
          <p className="label text-on-ink-muted">Designed and built in-house</p>
        </div>
      </div>
    </footer>
  );
}
