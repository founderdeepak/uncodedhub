import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Reveal, Shell } from '../../components/primitives';
import { SERVICES_DATA, GRAND_SLAM_BONUS, CORE_FOUNDER_GUARANTEES } from '../../data/servicesData';
import { useGeoPricing } from '../../lib/geoPricing';

interface ServiceDetailPageProps {
  onBook?: () => void;
  serviceKey?: string;
}

export default function ServiceDetailPage({ onBook, serviceKey }: ServiceDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isInternational } = useGeoPricing();

  const key = serviceKey || slug;
  const service = key ? SERVICES_DATA[key] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!service) {
      navigate('/services/', { replace: true });
    }
  }, [key, service, navigate]);

  if (!service) return null;

  const canonicalUrl = `https://uncodedhub.com/services/${service.slug}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
      founders: [
        { '@type': 'Person', name: 'Deepak' },
        { '@type': 'Person', name: 'Geetha' }
      ]
    },
    offers: {
      '@type': 'Offer',
      price: service.priceRangeInr.split('–')[0].replace(/[^0-9]/g, ''),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  const priceDisplay = isInternational ? service.priceRangeUsd : service.priceRangeInr;

  return (
    <>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-canvas text-ink pt-28 sm:pt-36 pb-24">
        
        {/* ── 01. Breadcrumb & Header ────────────────────────────────────── */}
        <Shell>
          <Reveal>
            <nav className="flex items-center gap-2 text-xs font-mono text-muted mb-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink transition-colors">Home</Link>
              <span>/</span>
              <Link to="/services/" className="hover:text-ink transition-colors">Services</Link>
              <span>/</span>
              <span className="text-ink font-semibold">{service.name}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/25 text-signal font-mono text-xs font-bold uppercase tracking-wider mb-5">
                <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                <span>{service.badge}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight leading-[1.12] mb-6 [text-wrap:balance]">
                {service.headline}
              </h1>

              <p className="text-muted text-base sm:text-lg leading-relaxed max-w-3xl mb-8 [text-wrap:pretty]">
                {service.tagline}
              </p>

              {/* Key Specs Pill Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-paper border border-rule-strong mb-10 shadow-xs">
                <div>
                  <span className="block text-[10px] font-mono text-muted uppercase tracking-wider">Fixed Pricing</span>
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">{priceDisplay}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted uppercase tracking-wider">Sprint Timeline</span>
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">{service.timeline}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted uppercase tracking-wider">Speed Standard</span>
                  <span className="font-display text-lg sm:text-xl font-bold text-emerald-600">Sub-0.8s LCP</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted uppercase tracking-wider">Free Bonus Included</span>
                  <span className="font-display text-lg sm:text-xl font-bold text-signal">₹15,000 Free</span>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onBook}
                  className="btn-primary !py-4 !px-8 text-sm rounded-full shadow-sm inline-flex items-center gap-2.5 cursor-pointer font-semibold"
                >
                  <span>Book Free 20-Min Discovery Call</span>
                  <span>→</span>
                </button>

                <a
                  href={`https://wa.me/918660819023?text=${encodeURIComponent(`Hi Deepak & Geetha, I am interested in discussing your ${service.name} scope for my business.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-4 !px-7 text-sm rounded-full border border-rule-strong inline-flex items-center gap-2 text-ink hover:text-signal transition-colors font-medium"
                >
                  <span>Chat on WhatsApp</span>
                  <span>↗</span>
                </a>

                <a
                  href={service.matchedDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted hover:text-ink underline underline-offset-4 py-2 px-3"
                >
                  Inspect matching live demo ({service.matchedDemoName}) ↗
                </a>
              </div>
            </div>
          </Reveal>
        </Shell>

        {/* ── 02. The Hormozi "Stupid to Say No" Risk Reversal ───────────── */}
        <section className="mt-20 py-16 bg-paper border-y border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="p-8 sm:p-10 rounded-3xl bg-[#0f1422] text-white border border-signal/30 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <svg className="w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-signal text-black font-mono text-[11px] font-bold uppercase tracking-wider mb-4 inline-block">
                    OUR ZERO-RISK CLIENT PROMISE
                  </span>
                  
                  <h2 className="font-display text-2xl sm:text-4xl font-normal text-white mb-4 [text-wrap:balance]">
                    Test Your Custom Live Demo Before Paying a Single Rupee.
                  </h2>

                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 [text-wrap:pretty]">
                    Most web design agencies ask for thousands of dollars upfront based on abstract mockups or generic templates. We do the exact opposite. After our 20-minute discovery call, <strong>we build a working interactive demo specifically for your business</strong> to test on your own phone.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-white/15 text-xs font-mono">
                    <div className="flex items-start gap-2">
                      <span className="text-signal text-base">✓</span>
                      <span>Zero upfront fee to review your custom demo</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-signal text-base">✓</span>
                      <span>100% on-time delivery or your sprint is FREE</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-signal text-base">✓</span>
                      <span>100% source code ownership, zero monthly lock-in</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── 03. Core Deliverables In Depth ────────────────────────────── */}
        <section className="py-20 sm:py-28 border-b border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-3xl mb-14">
                <span className="card-tag mb-3">WHAT YOU RECEIVE</span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                  Everything Included in the {service.name}.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                  Every deliverable is engineered by founders Deepak & Geetha with zero junior outsourcing. Here is the exact scope breakdown:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-16">
                {service.deliverablesDetail.map((item, idx) => (
                  <div key={item.title} className="p-7 rounded-2xl bg-paper border border-rule hover:border-rule-strong transition-all shadow-xs">
                    <span className="font-mono text-xs text-signal font-bold mb-2 block">DELIVERABLE 0{idx + 1}</span>
                    <h3 className="font-display text-xl text-ink font-medium mb-2.5">{item.title}</h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Complete Checklist */}
              <div className="p-8 rounded-2xl bg-paper-sunken border border-rule">
                <h4 className="font-display text-lg text-ink font-medium mb-4">Complete Technical Specifications Checklist:</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono text-muted">
                  {service.coreDeliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                      <span className="text-ink">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── 04. The ₹15,000 Grand Slam Bonus (Matthew's Logic) ─────────── */}
        <section className="py-20 sm:py-24 bg-paper border-b border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                    {GRAND_SLAM_BONUS.commercialValue}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight mb-3">
                    {GRAND_SLAM_BONUS.title}
                  </h2>
                  <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    {GRAND_SLAM_BONUS.tagline}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-10">
                  {GRAND_SLAM_BONUS.components.map((comp) => (
                    <div key={comp.num} className="p-6 rounded-2xl bg-canvas border border-rule hover:border-signal/40 transition-all">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="px-2 py-0.5 rounded bg-signal/10 text-signal font-mono text-[10px] font-bold">
                          BONUS {comp.num}
                        </span>
                        <h3 className="font-display text-base font-semibold text-ink">{comp.title}</h3>
                      </div>
                      <p className="text-muted text-xs leading-relaxed">{comp.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-signal/5 border border-signal/20 text-center text-xs font-mono text-ink">
                  💡 <strong>Why we include this for free:</strong> A beautiful website is only step one. By equipping your business with our proven Google local review and lead conversion playbook, you start booking customers immediately after launch.
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── 05. The Day-by-Day Sprint Roadmap ──────────────────────────── */}
        <section className="py-20 sm:py-28 border-b border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-3xl mb-14">
                <span className="card-tag mb-3">TRANSPARENT PROCESS</span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                  How Your {service.timeline} Sprint Unfolds.
                </h2>
                <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
                  Single-threaded founder execution means zero delays, daily 5-minute video progress updates, and a guaranteed live launch date.
                </p>
              </div>

              <div className="space-y-6">
                {service.roadmap.map((step) => (
                  <div key={step.day} className="p-6 sm:p-8 rounded-2xl bg-paper border border-rule flex flex-col sm:flex-row items-start gap-5 shadow-xs">
                    <span className="px-3 py-1.5 rounded-lg bg-ink text-paper font-mono text-xs font-bold uppercase shrink-0">
                      {step.day}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-ink font-medium mb-2">{step.title}</h3>
                      <p className="text-muted text-xs sm:text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── 06. The 6 Direct Founder Guarantees ────────────────────────── */}
        <section className="py-20 sm:py-24 bg-paper border-b border-rule">
          <Shell>
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="card-tag mb-3">WHY AMBITIOUS BUSINESSES CHOOSE UNCODED HUB</span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                  Six Uncompromising Standards Built Into Every Build.
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CORE_FOUNDER_GUARANTEES.map((g) => (
                  <div key={g.title} className="p-6 rounded-2xl bg-canvas border border-rule">
                    <h3 className="font-display text-lg text-ink font-semibold mb-2">{g.title}</h3>
                    <p className="text-muted text-xs leading-relaxed">{g.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── 07. Frequently Asked Questions ─────────────────────────────── */}
        <section className="py-20 sm:py-28 border-b border-rule">
          <Shell>
            <Reveal>
              <div className="max-w-3xl mb-12">
                <span className="card-tag mb-3">QUESTIONS ANSWERED</span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                  Frequently Asked Questions about the {service.name}.
                </h2>
              </div>

              <div className="space-y-4 max-w-3xl">
                {service.faqs.map((faq) => (
                  <details key={faq.q} className="group p-6 rounded-2xl bg-paper border border-rule open:border-rule-strong transition-all cursor-pointer">
                    <summary className="font-display text-lg font-medium text-ink list-none flex items-center justify-between">
                      <span>{faq.q}</span>
                      <span className="text-muted group-open:rotate-180 transition-transform">↓</span>
                    </summary>
                    <p className="mt-4 text-xs sm:text-sm text-muted leading-relaxed pt-3 border-t border-rule/50">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* ── 08. Final Conversion Desk ──────────────────────────────────── */}
        <section className="pt-20">
          <Shell>
            <Reveal>
              <div className="p-10 sm:p-14 rounded-3xl bg-ink text-paper text-center max-w-4xl mx-auto shadow-xl">
                <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-3 font-bold">
                  DIRECT FOUNDER CALENDAR OPEN
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal mb-4 [text-wrap:balance]">
                  Ready to Build Your {service.name}?
                </h2>
                <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-8 [text-wrap:pretty]">
                  Book a direct 20-minute strategy call with Deepak & Geetha. We will review your goals and build your custom working demo with zero obligation.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={onBook}
                    className="btn-primary !py-4 !px-8 text-sm rounded-full shadow-md cursor-pointer font-semibold"
                  >
                    <span>Claim Your Sprint Slot</span>
                    <span>→</span>
                  </button>

                  <a
                    href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I%20would%20like%20to%20discuss%20my%20website%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 rounded-full border border-white/20 text-white hover:text-signal hover:border-signal text-sm font-mono transition-colors"
                  >
                    Chat on WhatsApp (+91 86608 19023) ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

      </main>
    </>
  );
}
