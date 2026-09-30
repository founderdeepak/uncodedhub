import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   404 NOT FOUND — Cloaked-Style Editorial Recovery Page
   ═══════════════════════════════════════════════════════════════════ */

const DESTINATIONS = [
  {
    tag: 'Starting point',
    title: 'Homepage',
    desc: 'The complete architectural overview: our 7-day sprint model, verified Lighthouse scores, and client teardowns.',
    to: '/',
    cta: 'Go to Homepage →',
  },
  {
    tag: 'Live specimens',
    title: 'Portfolio & Demos',
    desc: 'Test 6 fully interactive specimen websites with live theme switchers, audit scores, and booking funnels.',
    to: '/portfolio',
    cta: 'Test 6 Live Demos →',
  },
  {
    tag: 'Turnkey scopes',
    title: 'Services & Delivery',
    desc: 'Three fixed-scope packages: single page, business website, and online store. On time or 50% discount.',
    to: '/services',
    cta: 'Review 3 Scopes →',
  },
  {
    tag: 'Direct access',
    title: 'Contact Deepak & Geetha',
    desc: 'Book a free twenty-minute discovery call directly with the two founders who will build your website.',
    to: '/contact',
    cta: 'Book Discovery Call →',
  },
];

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found — Uncoded Hub</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="The page you requested could not be located. Explore our 7-day website sprint services, portfolio demos, or book a discovery call."
        />
        <link rel="canonical" href="https://uncodedhub.com/404" />
      </Helmet>

      {/* ── Editorial Hero ──────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
              <div className="lg:col-span-8">
                <p className="label text-signal mb-4">Error 404 · Broken or moved link</p>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05]">
                  This page has moved or never existed.
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  Either the link is outdated, or we relocated something without a permanent redirect. You are not stranded — explore our primary working sections below.
                </p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Navigation Bento Grid ───────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="label text-signal mb-2">
                  Navigation directory
                </p>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-medium">
                  Where would you like to go next?
                </h2>
              </div>
              <p className="text-muted text-xs sm:text-sm max-w-md">
                Fast links to every core area of Uncoded Hub.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {DESTINATIONS.map((d, i) => (
              <Reveal key={d.title} delay={i * 60}>
                <Link
                  to={d.to}
                  className="group bg-paper-raised p-8 sm:p-10 rounded-[28px] border border-rule-strong shadow-xs hover:border-ink/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <span className="card-tag mb-4">
                      {d.tag}
                    </span>

                    <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium group-hover:text-signal transition-colors mb-3">
                      {d.title}
                    </h3>

                    <p className="text-muted text-xs sm:text-sm leading-relaxed">
                      {d.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-rule text-xs text-signal group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 font-sans font-semibold">
                    <span>{d.cta}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

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
                    Let's build your website.<br />
                    <span className="text-signal-bright italic">Direct with Deepak & Geetha.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    Looking for a bespoke website delivered in 7 working days? Book a 20-minute discovery call and leave with an exact scope and fixed price.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-mono text-on-ink-muted">
                  <span>● Deepak & Geetha</span>
                  <span>·</span>
                  <span>Bengaluru, India</span>
                  <span>·</span>
                  <span>Direct Delivery</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-signal-bright block mb-2">
                    Discovery call · 20 minutes
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Ready to schedule a call?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Slots are scheduled in your local timezone. Zero pitch decks, zero high-pressure sales reps.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Schedule 20-Minute Call</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/portfolio"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Or test our 6 live client demos first →
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
