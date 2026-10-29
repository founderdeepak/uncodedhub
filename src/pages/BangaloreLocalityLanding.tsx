import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { BANGALORE_LOCALITIES, BangaloreLocality } from '../data/bangaloreLocalities';

interface BangaloreLocalityLandingProps {
  onBook?: () => void;
}

export default function BangaloreLocalityLanding({ onBook: _onBook }: BangaloreLocalityLandingProps) {
  const { locality: localitySlug, niche: nicheSlug } = useParams<{ locality: string; niche?: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const locality = localitySlug ? BANGALORE_LOCALITIES[localitySlug.toLowerCase()] : null;

  const neighboringLocalities = useMemo(() => {
    if (!locality) return [];
    const sameZone = Object.values(BANGALORE_LOCALITIES).filter(
      (l) => l.slug !== locality.slug && l.zone === locality.zone
    );
    const otherZones = Object.values(BANGALORE_LOCALITIES).filter(
      (l) => l.slug !== locality.slug && l.zone !== locality.zone
    );
    return [...sameZone, ...otherZones].slice(0, 4);
  }, [locality]);

  if (!locality) {
    return <Navigate to="/web-design/bangalore/" replace />;
  }

  // If a niche param is passed, find the matching niche config in this locality
  const activeNiche = nicheSlug
    ? locality.niches.find((n) => n.nicheKey === nicheSlug.toLowerCase()) || null
    : null;

  const pageUrl = activeNiche
    ? `https://uncodedhub.com/web-design/bangalore/${locality.slug}/${activeNiche.nicheKey}/`
    : `https://uncodedhub.com/web-design/bangalore/${locality.slug}/`;

  const pageTitle = activeNiche
    ? `${activeNiche.name} Website Design in ${locality.name}, Bangalore — Uncoded Hub`
    : `Web Design Company in ${locality.name}, Bangalore | 7-Day Sprint — Uncoded Hub`;

  const pageDesc = activeNiche
    ? `Handcrafted ${activeNiche.name.toLowerCase()} websites in ${locality.name}, Bengaluru (${locality.pincode}). Sub-second mobile speed, 7-day launch sprint, zero WordPress bloat. Late means free.`
    : `Custom high-performance web design for businesses in ${locality.name}, Bengaluru (${locality.pincode}). Hand-coded React by Deepak & Geetha, 0.8s mobile speed, 7-day delivery guarantee.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: activeNiche
      ? `Uncoded Hub — ${activeNiche.name} Website Design ${locality.name}`
      : `Uncoded Hub — Web Design ${locality.name}, Bangalore`,
    url: pageUrl,
    description: pageDesc,
    priceRange: activeNiche ? activeNiche.targetPrice : '₹30,000 - ₹55,000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality.name,
      addressRegion: 'Karnataka',
      postalCode: locality.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: locality.coordinates.lat,
      longitude: locality.coordinates.lng,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${locality.name}, Bengaluru`,
      postalCode: locality.pincode,
    },
    founder: [
      { '@type': 'Person', name: 'Deepak', jobTitle: 'Technical Co-Founder' },
      { '@type': 'Person', name: 'Geetha', jobTitle: 'Design Co-Founder' },
    ],
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://uncodedhub.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Web Design',
        item: 'https://uncodedhub.com/web-design/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Bangalore',
        item: 'https://uncodedhub.com/web-design/bangalore/',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: locality.name,
        item: `https://uncodedhub.com/web-design/bangalore/${locality.slug}/`,
      },
      ...(activeNiche
        ? [
            {
              '@type': 'ListItem',
              position: 5,
              name: activeNiche.name,
              item: pageUrl,
            },
          ]
        : []),
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locality.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        {/* OpenGraph */}
        <meta property="og:site_name" content="Uncoded Hub" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* ── Locality Header / Hero ── */}
      <section className="pt-24 sm:pt-32 pb-16 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-signal/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            {/* Breadcrumb row */}
            <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs font-mono mb-6 flex-wrap">
              <Link to="/" className="text-muted hover:text-ink transition-colors">
                Home
              </Link>
              <span className="text-rule-strong">/</span>
              <Link to="/web-design/" className="text-muted hover:text-ink transition-colors">
                Web Design
              </Link>
              <span className="text-rule-strong">/</span>
              <Link to="/web-design/bangalore/" className="text-muted hover:text-ink transition-colors">
                Bangalore
              </Link>
              <span className="text-rule-strong">/</span>
              <Link
                to={`/web-design/bangalore/${locality.slug}/`}
                className={activeNiche ? 'text-muted hover:text-ink transition-colors' : 'text-ink font-medium'}
              >
                {locality.name}
              </Link>
              {activeNiche && (
                <>
                  <span className="text-rule-strong">/</span>
                  <span className="text-ink font-medium">{activeNiche.name}</span>
                </>
              )}
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="card-tag">PIN: {locality.pincode}</span>
              <span className="text-xs font-mono text-muted">·</span>
              <span className="text-xs font-mono text-signal">{locality.zone}</span>
              <span className="text-xs font-mono text-muted">·</span>
              <span className="text-xs font-mono text-muted">GPS: {locality.coordinates.lat.toFixed(4)}° N, {locality.coordinates.lng.toFixed(4)}° E</span>
            </div>

            {/* Headings */}
            {activeNiche ? (
              <>
                <h1 className="font-display text-4xl sm:text-6xl text-ink font-normal tracking-tight leading-[1.08] max-w-4xl">
                  {activeNiche.headline} in{' '}
                  <span className="text-signal italic font-serif">{locality.name}</span>.
                </h1>
                <p className="text-muted text-base sm:text-xl max-w-2xl mt-5 leading-relaxed">
                  {activeNiche.subheadline} Handcrafted in Bengaluru by Deepak & Geetha with a contractual 7-day launch guarantee.
                </p>
              </>
            ) : (
              <>
                <h1 className="font-display text-4xl sm:text-6xl text-ink font-normal tracking-tight leading-[1.08] max-w-4xl">
                  Web design company in{' '}
                  <span className="text-signal italic font-serif">{locality.name}</span>, Bangalore.
                </h1>
                <p className="text-muted text-base sm:text-xl max-w-2xl mt-5 leading-relaxed">
                  Bespoke, sub-second web architecture for businesses across {locality.name}. Handcrafted React by senior founders Deepak & Geetha. On time in 7 days, or your build is 100% free.
                </p>
              </>
            )}

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact/"
                className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-4 px-8 rounded-full transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Book a 20-min {locality.name} discovery call</span>
                <span>→</span>
              </Link>
              {activeNiche ? (
                <Link
                  to={`/web-design/${activeNiche.nicheKey}/`}
                  className="border border-rule-strong hover:border-ink text-ink font-mono text-xs py-4 px-6 rounded-full transition-colors bg-paper-raised"
                >
                  View Full {activeNiche.name} Platform Demo →
                </Link>
              ) : (
                <a
                  href="#sectors"
                  className="border border-rule-strong hover:border-ink text-ink font-mono text-xs py-4 px-6 rounded-full transition-colors bg-paper-raised"
                >
                  View Top {locality.niches.length} {locality.name} Sectors ↓
                </a>
              )}
            </div>

            {/* Local Context Strip */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-rule text-xs font-mono">
              <div>
                <p className="text-muted uppercase tracking-wider text-[10px]">Key Landmarks</p>
                <p className="text-ink mt-1 font-medium">{locality.keyLandmarks.slice(0, 3).join(', ')}</p>
              </div>
              <div>
                <p className="text-muted uppercase tracking-wider text-[10px]">Tech Parks & Commercial Hubs</p>
                <p className="text-ink mt-1 font-medium">{locality.techParksAndHubs.join(', ')}</p>
              </div>
              <div>
                <p className="text-muted uppercase tracking-wider text-[10px]">Metro Transit</p>
                <p className="text-ink mt-1 font-medium">{locality.metroLine}</p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Active Niche Showcase (When in Niche view) ── */}
      {activeNiche && (
        <section className="py-16 bg-paper-sunken border-b border-rule">
          <Shell>
            <Reveal>
              <div className="p-8 sm:p-12 rounded-[28px] bg-paper-raised border border-rule-strong shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeNiche.icon}</span>
                    <div>
                      <span className="card-tag">LOCALIZED COMMERCIAL PLATFORM</span>
                      <h2 className="font-display text-2xl sm:text-3xl text-ink font-medium mt-1">
                        {activeNiche.name} in {locality.name}
                      </h2>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <p className="text-muted">Target Investment</p>
                    <p className="text-signal text-lg font-bold">{activeNiche.targetPrice} all-inclusive</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-rule">
                  <div>
                    <h3 className="font-display text-lg text-ink font-medium">The {locality.name} Local Challenge:</h3>
                    <p className="text-muted text-xs sm:text-sm mt-2 leading-relaxed">
                      {activeNiche.localHook}
                    </p>
                    <p className="text-muted text-xs sm:text-sm mt-3 leading-relaxed">
                      {locality.painPointHook}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-lg text-ink font-medium">The Uncoded Hub Solution:</h3>
                    <ul className="space-y-2 mt-3 text-xs sm:text-sm text-ink/90 font-mono">
                      <li className="flex items-start gap-2">
                        <span className="text-signal">✓</span>
                        <span>Sub-0.8s mobile load time on local Airtel & Jio 4G/5G networks.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-signal">✓</span>
                        <span>Zero WordPress bloat, zero vulnerable plugins, zero maintenance headaches.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-signal">✓</span>
                        <span>Pre-configured WhatsApp click-to-chat routing and calendar appointment intake.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-signal">✓</span>
                        <span>Complete Karnataka GST tax invoice with full corporate input tax credit (ITC).</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-rule flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to={`/web-design/${activeNiche.nicheKey}/`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-signal hover:underline font-medium"
                  >
                    <span>Inspect architectural blueprints for {activeNiche.name}</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to={`/web-design/bangalore/${locality.slug}/`}
                    className="text-xs font-mono text-muted hover:text-ink transition-colors"
                  >
                    ← Browse all {locality.niches.length} sectors in {locality.name}
                  </Link>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>
      )}

      {/* ── 5 Flagship Sectors in this Locality ── */}
      <section id="sectors" className="py-20 bg-paper border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">HIGH-TICKET LOCAL PILLARS</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                The {locality.niches.length} core sectors we build for in {locality.name}.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                We engineer high-converting web platforms tailored to the exact commercial reality of {locality.name}. Select an industry below to view localized specs and benchmarks:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {locality.niches.map((niche) => {
                const isSelected = activeNiche?.nicheKey === niche.nicheKey;
                return (
                  <div
                    key={niche.nicheKey}
                    className={`p-8 rounded-[24px] border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-paper-raised border-signal shadow-md ring-1 ring-signal/30'
                        : 'bg-paper-raised border-rule-strong hover:border-signal/40 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{niche.icon}</span>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal">
                          {niche.statBadge}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl text-ink font-medium">
                        <Link
                          to={`/web-design/bangalore/${locality.slug}/${niche.nicheKey}/`}
                          className="hover:text-signal transition-colors"
                        >
                          {niche.name}
                        </Link>
                      </h3>

                      <p className="text-muted text-xs sm:text-sm mt-3 leading-relaxed">
                        {niche.subheadline}
                      </p>

                      <p className="text-xs font-mono text-ink/80 mt-4 p-3 rounded-xl bg-paper-sunken border border-rule">
                        📍 <strong>{locality.name} Focus:</strong> {niche.localHook}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-rule flex items-center justify-between text-xs font-mono">
                      <span className="text-muted">Target: {niche.targetPrice}</span>
                      <Link
                        to={`/web-design/bangalore/${locality.slug}/${niche.nicheKey}/`}
                        className="text-signal hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        <span>View {niche.name} Platform</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── 7-Day Sprint Protocol ── */}
      <section className="py-20 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="card-tag mb-3">7-DAY BENGALURU SPRINT PROTOCOL</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal leading-tight">
                How we take your {locality.name} business live in 7 business days.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { day: 'Day 1–2', title: 'Blueprint & Bespoke Design', desc: 'Architecture kickoff call, URL structure mapping, and custom UI design by Geetha.' },
                { day: 'Day 3–4', title: 'React Build & Copywriting', desc: 'Deepak hand-codes clean semantic React. High-ticket positioning copy locked.' },
                { day: 'Day 5', title: 'Integrations & Local SEO', desc: 'WhatsApp routing, calendar scheduling, Karnataka GST invoicing, and Schema markup.' },
                { day: 'Day 6–7', title: 'Performance QA & Handover', desc: 'Cross-device mobile testing, 100/100 Lighthouse verification, and complete code transfer.' },
              ].map((step) => (
                <div key={step.day} className="p-6 rounded-[20px] bg-paper-raised border border-rule-strong shadow-xs">
                  <span className="text-xs font-mono text-signal font-bold">{step.day}</span>
                  <h3 className="font-display text-lg text-ink font-medium mt-2">{step.title}</h3>
                  <p className="text-muted text-xs mt-2 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Localized FAQs ── */}
      <section className="py-20 bg-paper border-b border-rule">
        <Shell width="narrow">
          <Reveal>
            <div className="text-center mb-12">
              <span className="card-tag mb-3">FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                Got questions about web design in {locality.name}?
              </h2>
            </div>

            <div className="space-y-4">
              {locality.faqs.map((faq, i) => (
                <div
                  key={faq.question}
                  className="rounded-[20px] bg-paper-raised border border-rule-strong overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-display text-lg text-ink font-medium">{faq.question}</span>
                    <span className="text-xs font-mono text-signal shrink-0">
                      {activeFaq === i ? '[−]' : '[+]'}
                    </span>
                  </button>
                  {activeFaq === i && (
                    <div className="px-6 pb-6 pt-1 text-muted text-xs sm:text-sm leading-relaxed border-t border-rule/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Nearby Localities Cross-Links ── */}
      <section className="py-16 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="card-tag mb-1">LOCALITY CLUSTERS</span>
                <h3 className="font-display text-2xl text-ink font-medium">
                  Web design in neighboring Bengaluru corridors.
                </h3>
              </div>
              <Link
                to="/web-design/bangalore/"
                className="font-mono text-xs text-signal hover:underline inline-flex items-center gap-1"
              >
                <span>View all 25 Bangalore hubs</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {neighboringLocalities.map((neighbor: BangaloreLocality) => (
                <Link
                  key={neighbor.slug}
                  to={`/web-design/bangalore/${neighbor.slug}/`}
                  className="p-5 rounded-2xl bg-paper-raised border border-rule hover:border-signal/50 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-1">
                      <span>{neighbor.zone}</span>
                      <span className="text-signal/80 font-serif">{neighbor.kannadaName}</span>
                    </div>
                    <span className="font-display text-base text-ink font-medium group-hover:text-signal transition-colors block">
                      {neighbor.name}
                    </span>
                    <span className="text-[11px] text-muted block mt-1 line-clamp-1">
                      {neighbor.keyLandmarks[0]}
                    </span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-rule/60 flex items-center justify-between text-[10px] font-mono text-muted">
                    <span>{neighbor.niches.length} Sectors</span>
                    <span className="text-signal group-hover:translate-x-0.5 transition-transform">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>

            {activeNiche && (
              <div className="mt-8 p-4 rounded-xl bg-paper border border-rule flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="text-muted">
                  Looking for our full national {activeNiche.name} capabilities and case studies?
                </span>
                <Link
                  to={`/web-design/${activeNiche.nicheKey}/`}
                  className="text-signal hover:underline shrink-0 font-medium inline-flex items-center gap-1"
                >
                  <span>National {activeNiche.name} Platform</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </Reveal>
        </Shell>
      </section>

      {/* ── Closing Call-To-Action ── */}
      <section className="py-20 bg-ink text-paper relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        <Shell width="narrow">
          <Reveal>
            <div className="text-center">
              <span className="label text-signal-bright block mb-4">
                {locality.name.toUpperCase()} · 7-DAY DELIVERY CONTRACT
              </span>

              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal tracking-tight leading-tight">
                Launch a market-leading website for your {locality.name} business next week.
              </h2>

              <p className="text-on-ink-muted text-sm sm:text-base max-w-xl mx-auto mt-6 leading-relaxed">
                Book a 20-minute discovery call with Deepak & Geetha. We examine your local competition, inspect your performance bottleneck, and lock your fixed 7-day sprint.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact/"
                  className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-4 px-8 rounded-full transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Schedule your 20-min call</span>
                  <span>→</span>
                </Link>
                <Link
                  to="/web-design/bangalore/"
                  className="border border-white/20 hover:border-signal text-paper font-mono text-xs py-4 px-6 rounded-full transition-colors"
                >
                  Browse all 25 Bangalore Hubs →
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-on-ink-muted">
                <span>✓ On time in 7 days or 100% free</span>
                <span>·</span>
                <span>✓ Hand-coded by senior founders</span>
                <span>·</span>
                <span>✓ 100% code ownership</span>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
