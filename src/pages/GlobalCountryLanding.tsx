import { useEffect, useMemo } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Reveal, Shell } from '../components/primitives';
import { GLOBAL_MARKETS_DATA, type GlobalMarket } from '../data/globalMarketsData';

interface GlobalCountryLandingProps {
  onBook?: () => void;
  countryCode?: string;
}

export default function GlobalCountryLanding({ onBook, countryCode }: GlobalCountryLandingProps) {
  const { country } = useParams<{ country?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Resolve country code from props, route params, or top-level path (/us, /uk, etc.)
  const resolvedCode = useMemo(() => {
    if (countryCode) return countryCode.toLowerCase();
    if (country) return country.toLowerCase();
    const segment = location.pathname.split('/')[1]?.toLowerCase();
    if (segment && segment in GLOBAL_MARKETS_DATA) return segment;
    return 'us';
  }, [countryCode, country, location.pathname]);

  const data: GlobalMarket | undefined = GLOBAL_MARKETS_DATA[resolvedCode];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!data) {
      navigate('/global/', { replace: true });
    }
  }, [resolvedCode, data, navigate]);

  if (!data) return null;

  const canonicalUrl = `https://uncodedhub.com/${data.slug}/`;

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
    areaServed: {
      '@type': 'Country',
      name: data.countryName,
    },
    offers: {
      '@type': 'Offer',
      price: data.pricing.foundational.replace(/[^0-9]/g, ''),
      priceCurrency: data.currencyCode,
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
              <Link to="/global/" className="hover:text-ink transition-colors">
                Global Markets
              </Link>
              <span>/</span>
              <span className="text-signal font-medium">
                {data.flag} {data.countryName}
              </span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/25 text-[11px] font-mono text-signal mb-6 tracking-wide">
                <span>{data.complianceBadge}</span>
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

        {/* Edward Sturm Intent Discovery Box (First 100 Words) */}
        <Shell className="mt-4">
          <Reveal>
            <div className="p-6 sm:p-8 rounded-2xl bg-signal/5 border border-signal/20 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono text-signal font-medium uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>The Global Value Equation</span>
              </div>
              <p className="text-base sm:text-lg text-ink font-medium leading-relaxed">
                Why pay local agencies in {data.countryName} upwards of {data.localComparison.localAgencyRate} for a 3-month WordPress project when you can launch a hand-coded, sub-second React platform with Deepak and Geetha in a fixed 7-day sprint for {data.pricing.foundational}?
              </p>
              <div className="mt-4 pt-4 border-t border-signal/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-muted">
                <span>{data.timezoneProtocol}</span>
                <span className="text-signal font-medium">100% On-Time Guarantee</span>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Local Agency Comparison Box */}
        <Shell className="mt-16 sm:mt-20">
          <Reveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-paper-raised border border-rule">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
                  Market Economic Comparison
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                  Traditional {data.countryName} Agencies vs Uncoded Hub Sprint
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-canvas border border-rule/70">
                  <span className="text-xs font-mono text-red-500 block mb-2">Traditional Local Agency</span>
                  <div className="font-display text-3xl text-ink mb-1">{data.localComparison.localAgencyRate}</div>
                  <span className="text-xs font-mono text-muted block mb-4">Average Timeline: {data.localComparison.localTimeline}</span>
                  <ul className="text-xs text-muted space-y-2">
                    <li>❌ Bloated account managers and multi-layered bureaucracy</li>
                    <li>❌ WordPress/PHP templates requiring monthly maintenance</li>
                    <li>❌ Unpredictable hourly billing and scope change invoices</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-signal/10 border border-signal/30">
                  <span className="text-xs font-mono text-signal font-medium block mb-2">⚡ Uncoded Hub Sprint</span>
                  <div className="font-display text-3xl text-signal mb-1">{data.pricing.foundational} – {data.pricing.bespoke}</div>
                  <span className="text-xs font-mono text-ink font-medium block mb-4">Fixed Timeline: {data.localComparison.uncodedHubTimeline}</span>
                  <ul className="text-xs text-ink space-y-2">
                    <li>✓ Direct collaboration with technical founders (Deepak & Geetha)</li>
                    <li>✓ Hand-coded React/HTML with 100/100 Core Web Vitals</li>
                    <li>✓ 100% transparent fixed pricing and complete GitHub source code handover</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* Key Sectors in this Market */}
        <Shell className="mt-16 sm:mt-20">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-2">
              Industry Specialization
            </span>
            <h2 className="font-display text-3xl text-ink font-normal">
              High-Ticket {data.countryName} Sectors We Engineer For.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.topSectors.map((sec, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="p-6 sm:p-8 rounded-2xl bg-paper-raised border border-rule flex flex-col justify-between h-full shadow-2xs">
                  <div>
                    <h3 className="font-display text-xl text-ink font-normal mb-2">
                      {sec.name}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      {sec.summary}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-signal font-medium">
                    Targeted Query: &ldquo;{sec.query}&rdquo;
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>

        {/* Why Us Cards */}
        <Shell className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.whyUs.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="p-6 sm:p-8 rounded-2xl bg-paper-raised border border-rule h-full flex flex-col justify-between">
                  <h3 className="font-display text-lg text-ink font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.description}
                  </p>
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
                  Questions From {data.countryName} Clients.
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
                  Schedule your {data.countryName} discovery call.
                </h3>
                <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed">
                  Book a 20-minute Zoom with Deepak and Geetha to review your scope and lock in your sprint delivery window.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <button
                  type="button"
                  onClick={onBook}
                  className="px-6 py-4 rounded-full bg-signal text-ink font-mono text-xs font-semibold hover:bg-signal-bright transition-all shadow-md"
                >
                  Schedule Discovery Call →
                </button>
                <Link
                  to="/global/"
                  className="px-6 py-4 rounded-full border border-white/20 hover:border-signal text-paper font-mono text-xs transition-colors text-center"
                >
                  View All Markets
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </main>
    </>
  );
}
