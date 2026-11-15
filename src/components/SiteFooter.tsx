import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

/* ═══════════════════════════════════════════════════════════════════
   SITE FOOTER — UNCODED HUB
   Clean, architectural 4-column footer:
   1. Brand, Co-Founders, and Core Guarantee
   2. Explore: Work, Web Design, Services, Bengaluru, Global Hub
   3. Company: About, FAQs, Blog, Terms, Privacy, Audit Checklist
   4. Get in Touch: Direct WhatsApp (+91 86608 19023), Email, Office
   ═══════════════════════════════════════════════════════════════════ */

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-paper border-t border-white/10 pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Philosophy (spans 2 columns on lg) */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-paper hover:text-signal transition-colors mb-4"
            >
              <LogoMark className="w-7 h-7 text-signal" />
              <span className="font-display text-xl tracking-tight font-medium">Uncoded Hub</span>
            </Link>
            <p className="text-on-ink-muted text-sm leading-relaxed max-w-sm mb-6">
              Custom websites. Clear process. Direct founder involvement. Built by Deepak &amp;
              Geetha in Bengaluru, serving ambitious businesses across India and around the world.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-signal">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
              <span>Contractual 7-day sprint · On time or 100% free</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-paper/80 font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-on-ink-muted">
              <li>
                <Link to="/portfolio/" className="hover:text-paper transition-colors">
                  Work &amp; 50 Live Demos
                </Link>
              </li>
              <li>
                <Link to="/web-design/" className="hover:text-paper transition-colors">
                  Web Design Studio
                </Link>
              </li>
              <li>
                <Link to="/services/" className="hover:text-paper transition-colors">
                  Services &amp; Pricing Guide
                </Link>
              </li>
              <li>
                <Link to="/web-design/bangalore/" className="hover:text-paper transition-colors">
                  Bengaluru Studio &amp; Corridors
                </Link>
              </li>
              <li>
                <Link to="/markets/" className="hover:text-paper transition-colors">
                  Global Hub &amp; 20 Countries
                </Link>
              </li>
              <li>
                <Link to="/alternatives/" className="hover:text-paper transition-colors">
                  Compare Alternatives
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-paper/80 font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-on-ink-muted">
              <li>
                <Link to="/about/" className="hover:text-paper transition-colors">
                  About Deepak &amp; Geetha
                </Link>
              </li>
              <li>
                <Link to="/faq/" className="hover:text-paper transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/blog/" className="hover:text-paper transition-colors">
                  Articles &amp; Field Notes
                </Link>
              </li>
              <li>
                <Link to="/terms/" className="hover:text-paper transition-colors">
                  Terms &amp; Guarantee
                </Link>
              </li>
              <li>
                <Link to="/privacy/" className="hover:text-paper transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/audit-checklist/" className="hover:text-paper transition-colors">
                  10-Point Website Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-paper/80 font-semibold mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-on-ink-muted">
              <li>
                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-signal transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-emerald-400">●</span>
                  <span>WhatsApp Co-Founders</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@uncodedhub.com" className="hover:text-paper transition-colors">
                  hello@uncodedhub.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918660819023"
                  className="hover:text-paper transition-colors font-mono"
                >
                  +91 86608 19023
                </a>
              </li>
              <li className="pt-2 text-on-ink-muted/80">
                Bengaluru, Karnataka, India
              </li>
              <li className="pt-2">
                <Link
                  to="/contact/#book"
                  className="inline-flex items-center gap-1 text-signal hover:underline font-mono text-[11px]"
                >
                  <span>Book Free 20-Min Call →</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-on-ink-muted">
          <p>© {new Date().getFullYear()} Uncoded Hub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms/" className="hover:text-paper transition-colors">
              Terms
            </Link>
            <Link to="/privacy/" className="hover:text-paper transition-colors">
              Privacy
            </Link>
            <Link to="/sitemap.xml" className="hover:text-paper transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
