import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { ALTERNATIVES_DATA } from '../data/alternativesData';

interface AlternativesHubProps {
  onBook?: () => void;
}

export default function AlternativesHub({ onBook }: AlternativesHubProps) {
  const alternatives = Object.values(ALTERNATIVES_DATA);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Web Design Alternatives & Architectural Comparisons | Uncoded Hub',
    description:
      'Compare custom hand-coded web development vs WordPress, Wix, Squarespace, and traditional design agencies. Discover how 7-day engineering sprints deliver sub-second speed.',
    url: 'https://uncodedhub.com/alternatives/',
    publisher: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
    },
  };

  return (
    <>
      <Helmet>
        <title>Web Design Alternatives: Custom Code vs WordPress, Wix & Agencies | Uncoded Hub</title>
        <meta
          name="description"
          content="Compare custom hand-coded web development vs WordPress, Wix, Squarespace, and traditional design agencies. Discover how 7-day engineering sprints save cost and deliver sub-second speed."
        />
        <link rel="canonical" href="https://uncodedhub.com/alternatives/" />
        <meta property="og:title" content="Web Design Alternatives & Comparisons | Uncoded Hub" />
        <meta
          property="og:description"
          content="Architectural comparison: Custom hand-coded websites vs WordPress plugins, drag-and-drop builders, and bloated 3-month agency retainers."
        />
        <meta property="og:url" content="https://uncodedhub.com/alternatives/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-canvas text-ink pt-28 sm:pt-36 pb-24">
        {/* Hero Section */}
        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/25 text-[11px] font-mono text-signal mb-6 tracking-wide">
                <span>⚡ THE UNCODED HUB COMPARISON ENGINE · BOFU EVALUATION</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl text-ink font-normal tracking-tight leading-[1.08] mb-6">
                Architectural Truth:{' '}
                <span className="italic font-normal font-serif text-muted">
                  How Custom Code Compares to the Alternatives.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted font-normal leading-relaxed max-w-3xl mb-8">
                Most businesses get stuck in one of three traps: bloated WordPress plugins that break monthly, restrictive drag-and-drop builders that throttle SEO, or expensive agencies billing ₹3 Lakh over 12 weeks. Here is how our hand-coded 7-day engineering sprint stacks up side by side.
              </p>
            </div>
          </Reveal>
        </Shell>

        {/* 3 Core Alternatives Bento Cards */}
        <Shell className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternatives.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-paper-raised border border-rule hover:border-signal/50 transition-all flex flex-col justify-between group shadow-xs">
                  <div>
                    <span className="text-[11px] font-mono text-signal tracking-widest uppercase block mb-3">
                      VS {item.competitorName.split('(')[0].trim()}
                    </span>
                    <h2 className="font-display text-2xl text-ink font-normal mb-3 group-hover:text-signal transition-colors">
                      {item.tagline}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {item.subheadline}
                    </p>
                    <div className="p-4 rounded-xl bg-canvas border border-rule/70 mb-6">
                      <span className="text-[11px] font-mono text-muted uppercase block">Core Metric Advantage</span>
                      <span className="font-display text-2xl text-ink font-medium block mt-1">
                        {item.primaryStat.value}
                      </span>
                      <span className="text-xs text-muted block mt-0.5">
                        {item.primaryStat.label}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/alternatives/${item.slug}/`}
                    className="inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-ink text-paper hover:bg-signal transition-colors text-xs font-mono font-medium"
                  >
                    <span>Read Full Breakdown</span>
                    <span>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>

        {/* Master Comparison Matrix */}
        <Shell className="mt-20 sm:mt-28">
          <Reveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-paper-raised border border-rule">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
                  System Level Audit
                </span>
                <h3 className="font-display text-3xl text-ink font-normal">
                  The Complete Comparison At A Glance.
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-rule text-xs font-mono text-muted uppercase tracking-wider">
                      <th className="py-4 px-4 font-medium">Evaluation Criterion</th>
                      <th className="py-4 px-4 font-semibold text-signal">⚡ Uncoded Hub</th>
                      <th className="py-4 px-4 font-medium">WordPress / Elementor</th>
                      <th className="py-4 px-4 font-medium">Squarespace / Wix</th>
                      <th className="py-4 px-4 font-medium">Traditional Agencies</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-rule font-normal">
                    <tr>
                      <td className="py-4 px-4 font-medium text-ink">Mobile Load Speed</td>
                      <td className="py-4 px-4 font-mono text-signal font-medium">0.6s – 0.8s (Instant)</td>
                      <td className="py-4 px-4 text-muted">3.5s – 6.0s (Slow)</td>
                      <td className="py-4 px-4 text-muted">2.8s – 4.5s (Bloated)</td>
                      <td className="py-4 px-4 text-muted">Variable (3.0s+)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-ink">Lighthouse Performance</td>
                      <td className="py-4 px-4 font-mono text-signal font-medium">98–100 / 100</td>
                      <td className="py-4 px-4 text-muted">35–65 / 100</td>
                      <td className="py-4 px-4 text-muted">45–70 / 100</td>
                      <td className="py-4 px-4 text-muted">50–80 / 100</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-ink">Delivery Timeline</td>
                      <td className="py-4 px-4 font-mono text-signal font-medium">Fixed 7 Business Days</td>
                      <td className="py-4 px-4 text-muted">3–6 Weeks</td>
                      <td className="py-4 px-4 text-muted">DIY or 2–4 Weeks</td>
                      <td className="py-4 px-4 text-muted">8–16 Weeks</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-ink">Plugin Vulnerabilities</td>
                      <td className="py-4 px-4 font-mono text-signal font-medium">0 Plugins (Zero Risk)</td>
                      <td className="py-4 px-4 text-muted">High (Weekly patches)</td>
                      <td className="py-4 px-4 text-muted">Low (Walled garden)</td>
                      <td className="py-4 px-4 text-muted">Moderate to High</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-ink">Forced Monthly Retainers</td>
                      <td className="py-4 px-4 font-mono text-signal font-medium">₹0 / month</td>
                      <td className="py-4 px-4 text-muted">₹5k – ₹15k / month</td>
                      <td className="py-4 px-4 text-muted">Monthly Subscriptions</td>
                      <td className="py-4 px-4 text-muted">₹25k – ₹100k / month</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-ink">Code Ownership</td>
                      <td className="py-4 px-4 font-mono text-signal font-medium">100% Sovereign (GitHub)</td>
                      <td className="py-4 px-4 text-muted">Database & Theme tied</td>
                      <td className="py-4 px-4 text-muted">0% (Vendor locked)</td>
                      <td className="py-4 px-4 text-muted">Often retained by agency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Conversion Action */}
        <Shell className="mt-20">
          <Reveal>
            <div className="p-8 sm:p-14 rounded-3xl bg-ink text-paper relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs font-mono text-signal tracking-widest uppercase block mb-3">
                  Sovereign Engineering Sprint
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight mb-4">
                  Ready to stop paying the builder tax?
                </h3>
                <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed">
                  Join forward-thinking clinic founders, architects, and business leaders who moved to custom, sub-second web platforms delivered in 7 days.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <button
                  type="button"
                  onClick={onBook}
                  className="px-6 py-4 rounded-full bg-signal text-ink font-mono text-xs font-semibold hover:bg-signal-bright transition-all shadow-md"
                >
                  Schedule 7-Day Sprint →
                </button>
                <Link
                  to="/services/"
                  className="px-6 py-4 rounded-full border border-white/20 hover:border-signal text-paper font-mono text-xs transition-colors text-center"
                >
                  View All Scopes
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </main>
    </>
  );
}
