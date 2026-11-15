import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Reveal, Shell } from '../components/primitives';
import { getCityData, getCitiesForMarket, GlobalCity } from '../data/globalCityData';
import { GLOBAL_MARKETS_DATA } from '../data/globalMarketsData';
import { PROJECTS } from '../data/projects';
import { getWhatsAppUrl } from '../lib/whatsapp';

interface GlobalCityLandingProps {
  onBook?: () => void;
}

export default function GlobalCityLanding({ onBook }: GlobalCityLandingProps) {
  const { market, city } = useParams<{ market: string; city: string }>();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTheme, setActiveTheme] = useState(0);

  const cityData: GlobalCity | undefined = market && city ? getCityData(market, city) : undefined;
  const parentMarket = market ? GLOBAL_MARKETS_DATA[market.toLowerCase()] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!cityData || !parentMarket) {
      navigate('/', { replace: true });
    }
  }, [market, city, cityData, parentMarket, navigate]);

  // Compute live sprint calendar dates
  const sprintDates = useMemo(() => {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const kickoff = new Date(now);
    const day3Staging = new Date(now);
    day3Staging.setDate(day3Staging.getDate() + 3);
    const day7Launch = new Date(now);
    day7Launch.setDate(day7Launch.getDate() + 7);

    const fmt = (d: Date) => `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}`;

    return {
      kickoff: fmt(kickoff),
      day3: fmt(day3Staging),
      day7: fmt(day7Launch),
    };
  }, []);

  if (!cityData || !parentMarket) return null;

  const canonicalUrl = `https://uncodedhub.com/markets/${cityData.countrySlug}/${cityData.slug}/`;
  const sisterCities = getCitiesForMarket(cityData.countrySlug).filter((c) => c.slug !== cityData.slug);
  const featuredProject = PROJECTS[0] || {
    client: 'Apex Global',
    url: '/portfolio/',
    themes: [
      { name: 'Obsidian Luxe', accentHex: '#D4AF37', image: '/media/work-1.jpg' },
      { name: 'Minimal Editorial', accentHex: '#2563EB', image: '/media/work-2.jpg' },
      { name: 'High-Contrast', accentHex: '#10B981', image: '/media/work-3.jpg' },
    ],
  };
  const currentTheme = featuredProject.themes[activeTheme] || featuredProject.themes[0];

  const cityFaqs = [
    {
      q: `Why should a ${cityData.cityName} business hire Uncoded Hub instead of a local ${cityData.cityName} agency?`,
      a: `In ${cityData.cityName}, traditional design agencies charge ${cityData.localAgencyRate} with 12 to 16-week delivery queues and junior account managers. Uncoded Hub delivers senior founder engineering (Deepak on React systems, Geetha on conversion design) for ${cityData.uncodedHubSprintPrice}. You get 100/100 Core Web Vitals speed, 100% source code ownership, and our binding 7-day contractual guarantee: live on time or 100% free.`,
    },
    {
      q: `How do we coordinate across timezones between ${cityData.cityName} and your studio?`,
      a: `We eliminate timezone friction completely through our Asynchronous Precision Protocol. You receive daily 5-minute recorded Loom video demonstrations of live screen progress waiting on your desk every morning in ${cityData.timezoneCode}. For live syncs, we have a daily dedicated overlap window (${cityData.overlapHours}) plus direct instant WhatsApp and Slack access with Deepak and Geetha.`,
    },
    {
      q: `What regulatory compliance and speed standards are enforced for ${cityData.cityName} websites?`,
      a: `Every platform we engineer adheres strictly to ${parentMarket.complianceBadge}. We write clean semantic React without vulnerable third-party plugins, enforce automated SSL and CSP headers, and deploy to edge server nodes resulting in sub-0.8s mobile LCP load times worldwide.`,
    },
    {
      q: `How does the contractual 7-day delivery guarantee work?`,
      a: `If you lock in your sprint slot today (${sprintDates.kickoff}), your live staging link is delivered on ${sprintDates.day3}, and final launch is locked for ${sprintDates.day7}. If your platform is late by even one hour due to our delay, your entire sprint is 100% free—we refund your initial milestone deposit immediately.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Uncoded Hub — ${cityData.cityName} Web Design Studio`,
    description: cityData.metaDescription,
    url: canonicalUrl,
    areaServed: [
      {
        '@type': 'City',
        name: cityData.cityName,
      },
      {
        '@type': 'Country',
        name: cityData.countryName,
      },
    ],
    currenciesAccepted: cityData.currencyCode,
    priceRange: `${parentMarket.pricing.foundational} - ${parentMarket.pricing.bespoke}`,
    founder: [
      {
        '@type': 'Person',
        name: 'Deepak Ravi',
        jobTitle: 'Lead Software Architect',
      },
      {
        '@type': 'Person',
        name: 'Geetha',
        jobTitle: 'Design & Conversion Strategist',
      },
    ],
    provider: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
    },
    serviceType: 'Bespoke React Web Design & 7-Day Sprints',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cityFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const handleConsultation = () => {
    if (onBook) {
      onBook();
    } else {
      const waUrl = getWhatsAppUrl(
        `/markets/${cityData.countrySlug}/${cityData.slug}/?msg=${encodeURIComponent(
          `Hi Deepak & Geetha, I am reviewing your ${cityData.cityName} web design sprint packages and would like to lock in a 7-day milestone.`
        )}`
      );
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Helmet>
        <title>{cityData.metaTitle}</title>
        <meta name="description" content={cityData.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={cityData.metaTitle} />
        <meta property="og:description" content={cityData.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-canvas text-ink pt-28 sm:pt-36 pb-24">
        {/* ── Breadcrumb & Local Metro Notice ─────────────────────────── */}
        <Shell>
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-rule/50">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted">
                <Link to="/" className="hover:text-ink transition-colors">Home</Link>
                <span>/</span>
                <Link to="/markets/" className="hover:text-ink transition-colors">Global Markets</Link>
                <span>/</span>
                <Link to={`/markets/${cityData.countrySlug}/`} className="hover:text-ink transition-colors">
                  {cityData.countryName}
                </Link>
                <span>/</span>
                <span className="text-signal font-semibold">{cityData.cityName}</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-rule text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-ink-soft">
                  {cityData.flag} Active in {cityData.cityName} · {cityData.timezoneCode}
                </span>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* ── Hero Section ────────────────────────────────────────────── */}
        <section className="pt-12 sm:pt-20 pb-16">
          <Shell>
            <Reveal>
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-signal/10 border border-signal/20 text-signal font-mono text-xs font-semibold uppercase tracking-wider mb-6">
                  <span>{cityData.flag}</span>
                  <span>{cityData.cityName} Web Architecture · 7-Day Sprints</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-ink tracking-tight leading-[1.1] mb-6">
                  {cityData.heroTagline}
                </h1>

                <p className="text-base sm:text-xl text-ink-soft leading-relaxed max-w-3xl mb-8 font-light">
                  Hand-crafted React web design engineered by senior founders Deepak &amp; Geetha.
                  Replacing {cityData.cityName}&rsquo;s traditional agency overhead with our focused 7-working-day sprint. Projects typically start from{' '}
                  <strong className="text-ink font-medium">{cityData.uncodedHubSprintPrice}</strong> with an exact written fixed quote agreed after our 20-minute discovery call.
                </p>

                {/* Key Corridors Pill Grid */}
                <div className="mb-10 p-5 rounded-[20px] bg-paper border border-rule">
                  <span className="font-mono text-xs text-muted block mb-3 uppercase tracking-wider font-semibold">
                    Covering {cityData.cityName} Economic Corridors &amp; Commercial Districts:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cityData.corridors.map((c, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-canvas border border-rule text-xs font-mono text-ink font-medium"
                      >
                        📍 {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleConsultation}
                    className="bg-signal hover:bg-signal-bright text-paper font-mono text-xs tracking-wider uppercase font-semibold py-4 px-8 rounded-full transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                  >
                    Book Free 20-Min Discovery Call →
                  </button>
                  <Link
                    to="/portfolio/"
                    className="bg-paper hover:bg-paper-raised text-ink border border-rule font-mono text-xs py-4 px-6 rounded-full transition-colors flex items-center gap-2"
                  >
                    <span>View 50 Live Industry Demos</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Live Sprint Calendar Lock (Dates & Timings) ────────────── */}
        <section className="py-14 bg-paper-sunken border-y border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="label text-signal font-semibold block mb-1">
                      Calendar Commitment · {cityData.timezoneCode}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                      Exact 7-Day Sprint Milestones for {cityData.cityName}
                    </h2>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-mono font-semibold">
                    ⚡ 2 Founder Slots Open This Month
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-[20px] bg-paper border border-rule">
                    <span className="w-8 h-8 rounded-xl bg-signal/10 text-signal font-mono text-xs font-bold flex items-center justify-center mb-4">
                      01
                    </span>
                    <span className="font-mono text-xs text-signal font-semibold block mb-1">
                      Kickoff &amp; Architecture Lock
                    </span>
                    <h3 className="font-display text-xl text-ink font-medium mb-2">
                      {sprintDates.kickoff}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed mb-0">
                      Discovery brief, information architecture map, and high-ticket copy deck intake.
                    </p>
                  </div>

                  <div className="p-6 rounded-[20px] bg-paper border border-rule">
                    <span className="w-8 h-8 rounded-xl bg-signal/10 text-signal font-mono text-xs font-bold flex items-center justify-center mb-4">
                      02
                    </span>
                    <span className="font-mono text-xs text-signal font-semibold block mb-1">
                      Private Staging Walkthrough
                    </span>
                    <h3 className="font-display text-xl text-ink font-medium mb-2">
                      {sprintDates.day3}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed mb-0">
                      Interactive React staging URL and 5-min Loom briefing showing desktop &amp; mobile responsiveness.
                    </p>
                  </div>

                  <div className="p-6 rounded-[20px] bg-paper-raised border-2 border-signal relative shadow-sm">
                    <span className="w-8 h-8 rounded-xl bg-signal text-paper font-mono text-xs font-bold flex items-center justify-center mb-4">
                      03
                    </span>
                    <span className="font-mono text-xs text-signal font-bold block mb-1">
                      Live Handover &amp; Cutover
                    </span>
                    <h3 className="font-display text-xl text-ink font-bold mb-2">
                      {sprintDates.day7}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed mb-0">
                      Zero-downtime DNS deployment, Google Search Console audit, and 100% clean Git repository transfer.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-rule flex flex-wrap items-center justify-between text-xs font-mono text-muted">
                  <span>⏱ Overlap: {cityData.overlapHours}</span>
                  <span className="text-signal font-semibold">Contractual Guarantee: Live in 7 working days or 100% Free</span>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Buying Decision Economics: Local Agency vs Uncoded Hub ── */}
        <section className="py-20 sm:py-24 bg-paper border-b border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-4xl mx-auto mb-16">
                <span className="label text-signal font-semibold block mb-2">
                  Transparent Buying Economics · {cityData.cityName}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                  Local {cityData.cityName} Agency Rates vs. Uncoded Hub Fixed Sprint
                </h2>
                <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                  Why traditional hourly billing and agency retainers hurt {cityData.cityName} practices, and how our fixed milestone sprint delivers guaranteed ROI.
                </p>
              </div>

              <div className="max-w-4xl mx-auto overflow-x-auto bg-paper-raised border border-rule-strong rounded-[24px] shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-rule bg-paper-sunken text-xs font-mono uppercase tracking-wider text-muted">
                      <th className="p-4 font-semibold">Model</th>
                      <th className="p-4 font-semibold">Cost Expectation</th>
                      <th className="p-4 font-semibold">Timeline Risk</th>
                      <th className="p-4 font-semibold">Incentive Alignment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    <tr>
                      <td className="p-4 font-semibold text-ink">Freelancer Hourly Rate</td>
                      <td className="p-4 font-mono text-muted">
                        $50 – $120 / hr ({cityData.currencyCode})
                      </td>
                      <td className="p-4 text-muted">High (No hard completion cap)</td>
                      <td className="p-4 text-red-600 font-medium">Misaligned: Slower work creates bigger invoices</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-ink">
                        Traditional {cityData.cityName} Agency
                      </td>
                      <td className="p-4 font-mono text-muted">{cityData.localAgencyRate}</td>
                      <td className="p-4 text-muted">12 to 16 weeks of endless meetings</td>
                      <td className="p-4 text-amber-600 font-medium">Bloated scopes to sell mandatory ongoing retainers</td>
                    </tr>
                    <tr className="bg-signal/5">
                      <td className="p-4 font-bold text-signal">⚡ Uncoded Hub 7-Day Sprint</td>
                      <td className="p-4 font-mono font-bold text-signal">
                        Typically from {cityData.uncodedHubSprintPrice}*
                      </td>
                      <td className="p-4 font-bold text-signal">Guaranteed 7 Working Days (Late = 100% Free)</td>
                      <td className="p-4 text-emerald-700 font-semibold">
                        100% Aligned: {cityData.savings}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-4 bg-paper-sunken border-t border-rule text-center text-xs font-mono text-muted">
                  *Estimated starting guidelines — exact fixed quote agreed in writing after 20-min discovery call based on your scope.
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Interactive Specimen Demo Engine ────────────────────────── */}
        <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
          <Shell>
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="label text-signal font-semibold block mb-2">
                  Live Interactive Specimen · 3 Switchable Aesthetic Themes
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-4">
                  Test the actual architecture before commissioning your sprint.
                </h2>
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  Every build is 100% hand-crafted in React and Tailwind CSS. Switch between visual themes below to inspect the typography lockups, color harmony, and sub-second loading states.
                </p>
              </div>

              {/* Theme Switcher Bar */}
              <div className="max-w-4xl mx-auto bg-paper border border-rule-strong rounded-[24px] overflow-hidden shadow-xl">
                <div className="px-6 py-4 bg-paper-sunken border-b border-rule flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-3 font-mono text-xs text-muted">
                      https://uncodedhub.com{featuredProject.url}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {featuredProject.themes.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTheme(idx)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                          activeTheme === idx
                            ? 'bg-ink text-paper font-semibold shadow-xs'
                            : 'bg-paper border border-rule text-muted hover:text-ink'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: t.accentHex }}
                        />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#0E0C0A] overflow-hidden flex items-center justify-center">
                  <img
                    src={currentTheme.image}
                    alt={`${featuredProject.client} - ${currentTheme.name} Theme`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/portfolio/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper border border-rule text-xs font-mono text-ink hover:text-signal transition-colors shadow-xs"
                >
                  <span>Explore All 50 Industry Demos in Portfolio</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Asynchronous Precision & Timezone Protocol ───────────────── */}
        <section className="py-20 bg-paper border-b border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="p-8 sm:p-12 bg-paper-raised border border-rule-strong rounded-[28px] relative overflow-hidden">
                  <span className="label text-signal font-semibold block mb-2">
                    Asynchronous Collaboration
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl text-ink font-normal mb-4">
                    Zero Timezone Delay in {cityData.cityName}
                  </h2>
                  <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
                    You do not need to stay up late or wait 48 hours for an email response. We use structured asynchronous workflows so your project moves forward while you sleep.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-5 rounded-[18px] bg-paper border border-rule">
                      <span className="font-mono text-signal text-xs font-bold block mb-1">
                        1. Daily Loom Briefings
                      </span>
                      <p className="text-xs text-muted leading-relaxed mb-0">
                        Every evening, we record a 5-minute video demo showing exact UI progress waiting for your morning review.
                      </p>
                    </div>

                    <div className="p-5 rounded-[18px] bg-paper border border-rule">
                      <span className="font-mono text-signal text-xs font-bold block mb-1">
                        2. Daily Overlap Window
                      </span>
                      <p className="text-xs text-muted leading-relaxed mb-0">
                        {cityData.overlapHours} for live screen-sharing kickoffs and final handovers.
                      </p>
                    </div>

                    <div className="p-5 rounded-[18px] bg-paper border border-rule">
                      <span className="font-mono text-signal text-xs font-bold block mb-1">
                        3. Direct WhatsApp Desk
                      </span>
                      <p className="text-xs text-muted leading-relaxed mb-0">
                        Zero ticketing delays. Chat directly with founders Deepak &amp; Geetha via dedicated chat channel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Localized FAQ Accordion ─────────────────────────────────── */}
        <section className="py-20 sm:py-24 bg-paper-sunken border-b border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="label text-signal font-semibold block mb-2">
                  Frequently Asked Questions
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
                  Common questions from {cityData.cityName} clients.
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {cityFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[20px] bg-paper border border-rule hover:border-signal/50 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full text-left flex items-center justify-between gap-4 font-display text-lg text-ink font-medium cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="text-signal font-mono text-sm shrink-0">
                        {activeFaq === idx ? '−' : '+'}
                      </span>
                    </button>
                    {activeFaq === idx && (
                      <p className="text-muted text-sm leading-relaxed mt-4 pt-4 border-t border-rule mb-0">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── Sister Cities & Parent Country Hub Navigation ───────────── */}
        <section className="py-20 bg-paper">
          <Shell>
            <Reveal>
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-rule">
                  <div>
                    <span className="label text-signal font-semibold block mb-1">
                      National Network · {cityData.countryName}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-ink font-normal">
                      Explore Other Premier Metros in {cityData.countryName}
                    </h3>
                  </div>

                  <Link
                    to={`/markets/${cityData.countrySlug}/`}
                    className="text-xs font-mono font-semibold text-signal hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>View Master {cityData.countryName} Hub</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
                  {sisterCities.map((sc) => (
                    <Link
                      key={sc.slug}
                      to={`/markets/${sc.countrySlug}/${sc.slug}/`}
                      className="p-3.5 rounded-xl bg-paper-raised border border-rule hover:border-signal hover:text-signal transition-all group flex flex-col justify-between"
                    >
                      <span className="font-medium text-ink group-hover:text-signal transition-colors block truncate">
                        {sc.cityName}
                      </span>
                      <span className="font-mono text-[11px] text-muted truncate mt-1">
                        {sc.stateOrRegion}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>
      </main>
    </>
  );
}

