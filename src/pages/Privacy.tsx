import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   PRIVACY POLICY & DATA STEWARDSHIP
   Cloaked-style transparent privacy agreement
   ═══════════════════════════════════════════════════════════════════ */

const PRIVACY_SECTIONS = [
  {
    index: '01',
    title: 'Information we collect',
    tag: 'Data collection',
    points: [
      'Discovery Call Bookings: When you schedule a 20-minute call with Deepak or Geetha, we collect your name, email address, phone number, and answers to preliminary business qualification questions.',
      'Project Briefs: When you send a written brief via our contact form, we collect your contact information, company name, industry niche, and project requirements.',
      'Website Audit Tool: When you run a diagnostic on our homepage, we collect your site URL to analyze public performance, Core Web Vitals, and mobile responsiveness metrics.',
      'Automated Telemetry: Standard, non-personally identifiable server telemetry including IP address, browser user-agent, and pages visited to ensure site stability and DDoS defense.',
    ],
  },
  {
    index: '02',
    title: 'How we use your information',
    tag: 'Purpose & usage',
    points: [
      'To schedule, conduct, and follow up on your 20-minute discovery consultation.',
      'To draft your customized one-page architectural scope and fixed-price sprint proposal.',
      'To send transaction receipts, project milestone updates, and staging preview links.',
      'We do not send unsolicited marketing drip emails or aggressive newsletter sales pitches. If you do not hire us after a call, we do not follow up with automated spam.',
    ],
  },
  {
    index: '03',
    title: 'Zero data selling or renting',
    tag: 'Strict commitment',
    points: [
      'Uncoded Hub will never sell, rent, license, or monetize your contact information, business data, or website metrics to third-party ad brokers or lead aggregators.',
      'Your information is accessed exclusively by Deepak & Geetha for the direct purpose of executing your web project.',
    ],
  },
  {
    index: '04',
    title: 'Data storage & infrastructure security',
    tag: 'Security & encryption',
    points: [
      'Lead submissions and discovery records are encrypted in transit via TLS 1.3 and stored in secure Supabase PostgreSQL databases with row-level security (RLS) policies.',
      'We maintain strict least-privilege administrative access, requiring multi-factor authentication for all cloud environments.',
      'Client source code and deployment keys are managed in private GitHub repositories and isolated server keychains.',
    ],
  },
  {
    index: '05',
    title: 'Cookies & analytics',
    tag: 'Minimal tracking',
    points: [
      'We use minimal, privacy-conscious session cookies to manage interface preferences (e.g. theme switchers on demo sites).',
      'We do not deploy intrusive third-party cross-site behavioral retargeting trackers or invasive ad pixels.',
    ],
  },
  {
    index: '06',
    title: 'Your rights & contacting us',
    tag: 'Your control',
    points: [
      'You hold full rights to inspect, update, export, or request the immediate permanent deletion of all personal data held by Uncoded Hub.',
      'To exercise any privacy right or ask a question regarding your data, email Deepak & Geetha directly at hello@uncodedhub.com.',
      'Data Controller: Uncoded Hub, Bengaluru, Karnataka, India.',
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Uncoded Hub</title>
        <meta
          name="description"
          content="Privacy policy and data protection commitments for Uncoded Hub. Zero data selling, secure encrypted storage, and direct founder accountability."
        />
        <link rel="canonical" href="https://uncodedhub.com/privacy/" />
      </Helmet>

      {/* ── Editorial Hero ──────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
              <div className="lg:col-span-8">
                <p className="label text-signal mb-4">Privacy & trust · Last updated September 2026</p>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05]">
                  Privacy Policy & Data Stewardship
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  How <strong className="text-ink font-semibold">Uncoded Hub</strong> collects, processes, and protects your information. Zero data sales, zero tracking bloat, and total transparency.
                </p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Privacy Bento Sections ──────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken">
        <Shell>
          <div className="space-y-8">
            {PRIVACY_SECTIONS.map((sec, i) => (
              <Reveal key={sec.index} delay={i * 40}>
                <div className="bg-paper-raised border border-rule-strong rounded-[28px] p-8 sm:p-12 shadow-xs hover:border-ink/30 transition-all duration-300">
                  <div className="pb-6 mb-8 border-b border-rule">
                    <span className="card-tag mb-3">
                      {sec.tag}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-ink font-medium">
                      {sec.title}
                    </h2>
                  </div>

                  <ul className="space-y-4 text-muted text-sm sm:text-base leading-relaxed">
                    {sec.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2.5 shrink-0" />
                        <span className="text-ink/80">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                    Your data is safe with us.<br />
                    <span className="text-signal-bright italic">Direct with Deepak & Geetha.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    Questions about data protection, privacy rights, or NDAs? We gladly execute mutual NDAs prior to reviewing proprietary client data.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-mono text-on-ink-muted">
                  <span>● Deepak & Geetha</span>
                  <span>·</span>
                  <span>hello@uncodedhub.com</span>
                  <span>·</span>
                  <span>Bengaluru, India</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-signal-bright block mb-2">
                    Discovery call · 20 minutes
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Have questions about privacy?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Reach out directly to Deepak & Geetha or book a twenty-minute consultation call.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/contact/"
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Book Discovery Call</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/terms/"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Review our Terms & Guarantee →
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
