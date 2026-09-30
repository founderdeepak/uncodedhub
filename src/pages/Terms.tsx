import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   TERMS OF SERVICE & SPRINT CONTRACT
   Cloaked-style plain-English legal agreement
   ═══════════════════════════════════════════════════════════════════ */

const TERMS_SECTIONS = [
  {
    index: '01',
    title: 'Sprint commitment & scope boundaries',
    tag: 'Agreement & scope',
    points: [
      'Every project begins with a 20-minute discovery call directly with Deepak & Geetha, followed by a written one-page scope document.',
      'The scope sheet itemizes every single page, interactive component, form integration, and performance benchmark included in your build.',
      'The 7-day sprint begins on the morning of the agreed calendar date after deposit confirmation and initial content handover.',
      'Any feature or page not explicitly specified in the signed scope is considered outside scope. Additional requests during the sprint are quoted as a separate add-on or scheduled in a follow-up phase so your launch date is never compromised.',
    ],
  },
  {
    index: '02',
    title: 'The 50% "Late means free" delivery guarantee',
    tag: 'Guarantee & accountability',
    points: [
      'We commit to delivering your fully functional staging website within seven working days from the scheduled kickoff date.',
      'If Uncoded Hub misses the agreed launch milestone due to our own delay, we immediately apply a 50% discount to your final invoice.',
      'Delays caused by missing client assets (e.g. text copy, high-resolution photography, domain DNS access, payment gateway approvals) or client-requested mid-sprint scope changes pause the sprint timer until provided.',
    ],
  },
  {
    index: '03',
    title: '100% code & intellectual property ownership',
    tag: 'Ownership & zero lock-in',
    points: [
      'Upon settlement of the final invoice, full and unencumbered ownership of all custom code, stylesheets, typography licenses (where client-supplied), and bespoke design assets transfers entirely to you.',
      'We do not lock your business into proprietary agency platforms, closed website builders, or mandatory hosting retainers.',
      'You are free to host your site on any modern infrastructure (Hostinger, Vercel, Netlify, Cloudflare, AWS) or hand the codebase to any developer in the future.',
    ],
  },
  {
    index: '04',
    title: 'Payment schedule & retainers',
    tag: 'Transparency & billing',
    points: [
      'A 50% reservation deposit is required to lock your project cohort on Deepak & Geetha’s calendar. Because we only take two sprints per month, this reservation is non-refundable once sprint preparations begin.',
      'The remaining 50% balance is payable upon completion of staging review and prior to public DNS switchover or source repository transfer.',
      'We do not charge recurring monthly management retainers unless you explicitly request an ongoing maintenance and content management retainer.',
    ],
  },
  {
    index: '05',
    title: 'Revisions & 30-day post-launch warranty',
    tag: 'Quality & post-launch',
    points: [
      'Every build includes two structured revision cycles during the sprint to adjust visual treatments, typography, wording, and mobile layout nuances.',
      'Every launch is backed by a 30-day warranty starting on DNS switchover. If any technical defect, broken link, or browser rendering inconsistency surfaces during this period, we fix it promptly at zero additional charge.',
      'The post-launch warranty covers bug fixes and minor copy tweaks, but does not extend to building new features, third-party API changes, or client-side code alterations.',
    ],
  },
  {
    index: '06',
    title: 'Client responsibilities & assets',
    tag: 'Cooperation & prerequisites',
    points: [
      'To maintain our 7-day velocity, clients agree to provide necessary assets (brand logos, photography, business credentials, and domain registrar access) prior to kickoff.',
      'Clients designate a single primary decision-maker to provide consolidated feedback within 24 hours of each milestone review.',
    ],
  },
  {
    index: '07',
    title: 'Governing law & jurisdiction',
    tag: 'Legal jurisdiction',
    points: [
      'These terms and any disputes arising out of our work are governed by the laws of India, with exclusive jurisdiction in the courts of Bengaluru, Karnataka.',
      'Any notices or formal inquiries regarding these terms may be directed to hello@uncodedhub.com.',
    ],
  },
];

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions — Uncoded Hub</title>
        <meta
          name="description"
          content="Plain-English terms of service and sprint delivery commitments for Uncoded Hub. Clear scope, 50% late guarantee, and 100% code ownership."
        />
        <link rel="canonical" href="https://uncodedhub.com/terms" />
      </Helmet>

      {/* ── Editorial Hero ──────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
              <div className="lg:col-span-8">
                <p className="label text-signal mb-4">Legal agreement · Last updated September 2026</p>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05]">
                  Terms of Service & Sprint Contract
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  Plain-English contractual commitments between <strong className="text-ink font-semibold">Uncoded Hub (Deepak & Geetha)</strong> and our clients. No 40-page agency boilerplate.
                </p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Terms Bento Sections ────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken">
        <Shell>
          <div className="space-y-8">
            {TERMS_SECTIONS.map((sec, i) => (
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
                    Clean terms, zero retainers.<br />
                    <span className="text-signal-bright italic">Direct with Deepak & Geetha.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    Have questions about our contract terms, payment milestones, or 7-day guarantee? We answer every question directly on the discovery call.
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
                    20-minute discovery
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Ready to define your build?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Book a free discovery call directly with Deepak & Geetha. You leave with an exact written scope and fixed price.
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
                    to="/privacy"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Review our Privacy Policy →
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
