import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { SOLUTIONS_DATA } from '../data/solutionsData';

interface SolutionsHubProps {
  onBook?: () => void;
}

export default function SolutionsHub({ onBook }: SolutionsHubProps) {
  const solutions = Object.values(SOLUTIONS_DATA);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Web Engineering Solutions for Business Problems | Uncoded Hub',
    description:
      'Engineered web solutions for common business problems: website redesign for outdated sites, conversion architecture for lead generation, and appointment booking websites.',
    url: 'https://uncodedhub.com/solutions/',
    publisher: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
    },
  };

  return (
    <>
      <Helmet>
        <title>Web Solutions: Website Redesign, Lead Generation & Booking Systems | Uncoded Hub</title>
        <meta
          name="description"
          content="Solve real website problems: outdated site redesigns, websites not generating leads, appointment booking functionality, and high-converting landing pages. Hand-coded in 7-day sprints."
        />
        <link rel="canonical" href="https://uncodedhub.com/solutions/" />
        <meta property="og:title" content="Web Solutions & Engineering Architecture | Uncoded Hub" />
        <meta
          property="og:description"
          content="High-performance web solutions solving real business bottlenecks: outdated designs, bouncing traffic, zero leads, and manual booking friction."
        />
        <meta property="og:url" content="https://uncodedhub.com/solutions/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-canvas text-ink pt-28 sm:pt-36 pb-24">
        {/* Hero Section */}
        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/25 text-[11px] font-mono text-signal mb-6 tracking-wide">
                <span>⚡ PROBLEM-BASED ENGINEERING SOLUTIONS · 7-DAY DELIVERY</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl text-ink font-normal tracking-tight leading-[1.08] mb-6">
                Web Architecture Built Around{' '}
                <span className="italic font-normal font-serif text-muted">
                  Solving Your Specific Business Bottleneck.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted font-normal leading-relaxed max-w-3xl mb-8">
                You don&apos;t just need a &ldquo;pretty website.&rdquo; You need to fix a tangible business failure: an outdated site that embarrasses you in front of clients, traffic that bounces without calling, or hours wasted chasing appointment confirmations. Here is how we solve each bottleneck.
              </p>
            </div>
          </Reveal>
        </Shell>

        {/* 4 Solutions Bento Grid */}
        <Shell className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-paper-raised border border-rule hover:border-signal/50 transition-all flex flex-col justify-between group shadow-xs">
                  <div>
                    <span className="text-[11px] font-mono text-signal tracking-widest uppercase block mb-3">
                      {item.badge}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal mb-3 group-hover:text-signal transition-colors">
                      {item.headline}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {item.subheadline}
                    </p>
                    <div className="p-4 rounded-xl bg-canvas border border-rule/70 mb-6 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-muted uppercase block">Core Benchmark</span>
                        <span className="text-xs text-ink font-medium block mt-0.5">
                          {item.stat.label}
                        </span>
                      </div>
                      <span className="font-display text-2xl text-signal font-medium">
                        {item.stat.value}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/solutions/${item.slug}/`}
                    className="inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium"
                  >
                    <span>Explore Solution Architecture</span>
                    <span>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>

        {/* Diagnosis Framework */}
        <Shell className="mt-20 sm:mt-28">
          <Reveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-paper-raised border border-rule">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
                  System Diagnostic
                </span>
                <h3 className="font-display text-3xl text-ink font-normal">
                  Identify Which Solution Your Business Needs Today.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-canvas border border-rule/70 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-signal block mb-2">01 · Trust Problem</span>
                    <h4 className="font-display text-lg text-ink font-medium mb-2">
                      &ldquo;My site looks 5 years old.&rdquo;
                    </h4>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      Slow, clunky WordPress template with broken plugins. You avoid sending the link to enterprise clients.
                    </p>
                  </div>
                  <Link
                    to="/solutions/website-redesign/"
                    className="text-xs font-mono text-signal hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    Website Redesign →
                  </Link>
                </div>

                <div className="p-6 rounded-2xl bg-canvas border border-rule/70 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-signal block mb-2">02 · Conversion Problem</span>
                    <h4 className="font-display text-lg text-ink font-medium mb-2">
                      &ldquo;I have visitors, but no inquiries.&rdquo;
                    </h4>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      People browse your portfolio or Instagram link, but nobody fills out the contact form or initiates a chat.
                    </p>
                  </div>
                  <Link
                    to="/solutions/lead-generation-websites/"
                    className="text-xs font-mono text-signal hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    Lead Gen Architecture →
                  </Link>
                </div>

                <div className="p-6 rounded-2xl bg-canvas border border-rule/70 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-signal block mb-2">03 · Operational Problem</span>
                    <h4 className="font-display text-lg text-ink font-medium mb-2">
                      &ldquo;Booking clients is pure chaos.&rdquo;
                    </h4>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      Constant back-and-forth WhatsApp messages trying to find mutual availability, resulting in dropped clients.
                    </p>
                  </div>
                  <Link
                    to="/solutions/booking-websites/"
                    className="text-xs font-mono text-signal hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    Booking Platforms →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Action Banner */}
        <Shell className="mt-20">
          <Reveal>
            <div className="p-8 sm:p-14 rounded-3xl bg-ink text-paper relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs font-mono text-signal tracking-widest uppercase block mb-3">
                  Fixed 7-Day Sprint Guarantee
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight mb-4">
                  Have a specific website challenge? Let&apos;s solve it.
                </h3>
                <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed">
                  We review your existing site or campaign live, identify the exact bottleneck costing you money, and give you an actionable plan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <button
                  type="button"
                  onClick={onBook}
                  className="px-6 py-4 rounded-full bg-signal text-ink font-mono text-xs font-semibold hover:bg-signal-bright transition-all shadow-md"
                >
                  Schedule Solution Call →
                </button>
                <Link
                  to="/services/"
                  className="px-6 py-4 rounded-full border border-white/20 hover:border-signal text-paper font-mono text-xs transition-colors text-center"
                >
                  View Fixed Pricing
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </main>
    </>
  );
}
