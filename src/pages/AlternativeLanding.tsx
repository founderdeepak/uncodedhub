import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Reveal, Shell } from '../components/primitives';
import { ALTERNATIVES_DATA } from '../data/alternativesData';

interface AlternativeLandingProps {
  onBook?: () => void;
}

export default function AlternativeLanding({ onBook }: AlternativeLandingProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const data = slug ? ALTERNATIVES_DATA[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!data) {
      navigate('/alternatives/', { replace: true });
    }
  }, [slug, data, navigate]);

  if (!data) return null;

  const canonicalUrl = `https://uncodedhub.com/alternatives/${data.slug}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: data.headline,
    description: data.metaDescription,
    url: canonicalUrl,
    author: {
      '@type': 'Person',
      name: 'Deepak & Geetha',
      url: 'https://uncodedhub.com/about/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-canvas text-ink pt-28 sm:pt-36 pb-24">
        {/* Breadcrumb & Navigation */}
        <Shell>
          <Reveal>
            <nav className="flex items-center gap-2 text-xs font-mono text-muted mb-8">
              <Link to="/" className="hover:text-ink transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/alternatives/" className="hover:text-ink transition-colors">
                Alternatives
              </Link>
              <span>/</span>
              <span className="text-signal font-medium truncate max-w-[240px]">
                {data.competitorName.split('(')[0].trim()}
              </span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/25 text-[11px] font-mono text-signal mb-6 tracking-wide">
                <span>⚡ {data.tagline.toUpperCase()}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl text-ink font-normal tracking-tight leading-[1.08] mb-6">
                {data.headline}
              </h1>
              <p className="text-lg sm:text-xl text-muted font-normal leading-relaxed max-w-3xl mb-8">
                {data.subheadline}
              </p>
            </div>
          </Reveal>
        </Shell>

        {/* Edward Sturm Intent Discovery Box (First 100 Words Core Verdict) */}
        <Shell className="mt-4">
          <Reveal>
            <div className="p-6 sm:p-8 rounded-2xl bg-signal/5 border border-signal/20 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono text-signal font-medium uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>The Short Answer · Executive Verdict</span>
              </div>
              <p className="text-base sm:text-lg text-ink font-medium leading-relaxed">
                {data.verdictSummary}
              </p>
              <div className="mt-4 pt-4 border-t border-signal/15 flex items-center justify-between text-xs font-mono text-muted">
                <span>Verified Architectural Comparison</span>
                <span className="text-signal">7-Day Sprint Guarantee</span>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Side-by-Side Architectural Matrix */}
        <Shell className="mt-16 sm:mt-20">
          <Reveal>
            <div className="p-6 sm:p-10 rounded-3xl bg-paper-raised border border-rule">
              <div className="mb-6">
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
                  Head-to-Head Matrix
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                  Custom Engineering vs {data.competitorName.split('(')[0].trim()}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[580px]">
                  <thead>
                    <tr className="border-b border-rule text-xs font-mono text-muted uppercase tracking-wider">
                      <th className="py-4 px-4 font-medium">Metric</th>
                      <th className="py-4 px-4 font-semibold text-signal">⚡ Uncoded Hub</th>
                      <th className="py-4 px-4 font-medium text-muted">{data.competitorName.split('(')[0].trim()}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-rule font-normal">
                    {data.matrix.map((row, idx) => (
                      <tr key={idx} className="hover:bg-paper/50 transition-colors">
                        <td className="py-4 px-4 font-medium text-ink">{row.criterion}</td>
                        <td className="py-4 px-4 font-mono text-signal font-medium">{row.uncodedHub}</td>
                        <td className="py-4 px-4 text-muted">{row.competitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Deep Dive Problem Cards */}
        <Shell className="mt-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
              System Breakdown
            </span>
            <h2 className="font-display text-3xl text-ink font-normal">
              Why the Difference Compound Over 12 Months.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.points.map((pt, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-paper-raised border border-rule flex flex-col justify-between shadow-2xs">
                  <div>
                    <h3 className="font-display text-xl text-ink font-normal mb-3">
                      {pt.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {pt.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-rule text-xs font-mono text-signal font-medium">
                    {pt.stat}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>

        {/* FAQ Section */}
        <Shell className="mt-16 sm:mt-24">
          <Reveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-paper-raised border border-rule">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
                  Frequently Asked Questions
                </span>
                <h3 className="font-display text-3xl text-ink font-normal">
                  Common Migration Questions.
                </h3>
              </div>

              <div className="space-y-6">
                {data.faq.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-canvas border border-rule/70">
                    <h4 className="font-display text-lg text-ink font-medium mb-2">
                      {item.question}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Bottom CTA Banner */}
        <Shell className="mt-20">
          <Reveal>
            <div className="p-8 sm:p-14 rounded-3xl bg-ink text-paper relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs font-mono text-signal tracking-widest uppercase block mb-3">
                  Fixed 7-Day Sprint Delivery
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight mb-4">
                  Upgrade to high-performance code in 7 days.
                </h3>
                <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed">
                  Deepak and Geetha build and deploy your entire bespoke platform with zero plugin bloat, transparent pricing, and 100/100 Core Web Vitals.
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
                  to="/alternatives/"
                  className="px-6 py-4 rounded-full border border-white/20 hover:border-signal text-paper font-mono text-xs transition-colors text-center"
                >
                  View All Comparisons
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </main>
    </>
  );
}
