import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Reveal, Shell } from '../components/primitives';
import { SOLUTIONS_DATA } from '../data/solutionsData';

interface SolutionLandingProps {
  onBook?: () => void;
}

export default function SolutionLanding({ onBook }: SolutionLandingProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const data = slug ? SOLUTIONS_DATA[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!data) {
      navigate('/solutions/', { replace: true });
    }
  }, [slug, data, navigate]);

  if (!data) return null;

  const canonicalUrl = `https://uncodedhub.com/solutions/${data.slug}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.metaTitle,
    description: data.metaDescription,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
    },
    serviceType: data.targetKeyword,
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
        <meta property="og:type" content="website" />
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
              <Link to="/solutions/" className="hover:text-ink transition-colors">
                Solutions
              </Link>
              <span>/</span>
              <span className="text-signal font-medium truncate max-w-[240px]">
                {data.targetKeyword}
              </span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/25 text-[11px] font-mono text-signal mb-6 tracking-wide">
                <span>{data.badge}</span>
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

        {/* High-Intent Discovery Box (First 100 Words Core Verdict) */}
        <Shell className="mt-4">
          <Reveal>
            <div className="p-6 sm:p-8 rounded-2xl bg-signal/5 border border-signal/20 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono text-signal font-medium uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>The Core Engineering Verdict</span>
              </div>
              <p className="text-base sm:text-lg text-ink font-medium leading-relaxed">
                {data.verdictSummary}
              </p>
              <div className="mt-4 pt-4 border-t border-signal/15 flex items-center justify-between text-xs font-mono text-muted">
                <span>Targeted Deliverable: {data.targetKeyword}</span>
                <span className="text-signal font-medium">Sprint Benchmark: {data.stat.value} {data.stat.label}</span>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Diagnostic Problem / Cause / Cure Framework */}
        <Shell className="mt-16 sm:mt-20">
          <Reveal>
            <div className="p-6 sm:p-10 rounded-3xl bg-paper-raised border border-rule">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
                  Diagnostic Breakdown
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                  {data.diagnosticTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.diagnostics.map((diag, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-canvas border border-rule/70 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-medium mb-2">
                        <span>⚠️ Symptom {idx + 1}</span>
                      </div>
                      <h3 className="font-display text-base text-ink font-medium mb-3">
                        &ldquo;{diag.symptom}&rdquo;
                      </h3>
                      <div className="mb-4">
                        <span className="text-[11px] font-mono text-muted uppercase block">Root Cause</span>
                        <p className="text-xs text-muted leading-relaxed mt-1">
                          {diag.cause}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-rule/60">
                      <span className="text-[11px] font-mono text-signal uppercase block">The Engineering Cure</span>
                      <p className="text-xs text-ink font-medium leading-relaxed mt-1">
                        {diag.cure}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Core Engineered Capabilities */}
        <Shell className="mt-16 sm:mt-20">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
              Deliverables Matrix
            </span>
            <h2 className="font-display text-3xl text-ink font-normal">
              What Is Engineered Into Your 7-Day Sprint.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.features.map((feat, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-paper-raised border border-rule flex flex-col justify-between shadow-2xs">
                  <div>
                    <h3 className="font-display text-xl text-ink font-normal mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {feat.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-rule text-xs font-mono text-signal font-medium">
                    ✓ {feat.deliverable}
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
                  Got Questions About This Solution?
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
                  Fixed 7-Day Sprint Guarantee
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight mb-4">
                  Fix your website bottleneck in 7 days.
                </h3>
                <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed">
                  Deepak and Geetha engineer your entire solution with transparent fixed pricing (from ₹35,000), direct WhatsApp updates, and zero hidden retainers.
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
                  to="/solutions/"
                  className="px-6 py-4 rounded-full border border-white/20 hover:border-signal text-paper font-mono text-xs transition-colors text-center"
                >
                  View All Solutions
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </main>
    </>
  );
}

