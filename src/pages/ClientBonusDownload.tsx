import { Helmet } from 'react-helmet-async';
import { Shell, Section, Reveal } from '../components/primitives';

export default function ClientBonusDownload() {
  const assets = [
    {
      num: '00',
      title: 'Local Inbound Authority Master Playbook',
      badge: 'UNIFIED MASTER EDITION',
      desc: 'The complete end-to-end blueprint compiling all 4 pillars, weekly execution checklists, and a 30-day implementation roadmap to dominate local Google search.',
      filename: 'Uncoded_Hub_Local_Inbound_Authority_Master_Playbook.pdf',
      size: '361 KB',
      color: 'from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-500/40',
      accent: 'text-cyan-400',
      btnBg: 'bg-cyan-500 hover:bg-cyan-400 text-black',
    },
    {
      num: '01',
      title: 'Google Business Profile 3-Pack Blueprint',
      badge: 'PILLAR 01 &bull; LOCAL MAPS DOMINANCE',
      desc: 'Step-by-step SOP for Google Business Profile category hierarchy, 30-day geo-tagged visual schedule, top 25 high-authority citations, and weekly post templates.',
      filename: '01_GBP_3_Pack_Ranking_Blueprint.pdf',
      size: '275 KB',
      color: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/40',
      accent: 'text-blue-400',
      btnBg: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    {
      num: '02',
      title: 'WhatsApp 5-Star Review Funnel SOP',
      badge: 'PILLAR 02 &bull; SOCIAL PROOF AUTOMATION',
      desc: '1-click review link creation, 5 word-for-word WhatsApp message scripts by industry, customer objection handling, and SEO-optimized owner response formulas.',
      filename: '02_WhatsApp_5_Star_Review_Funnel.pdf',
      size: '264 KB',
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/40',
      accent: 'text-emerald-400',
      btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    {
      num: '03',
      title: 'Inbound Lead Conversion Scripts',
      badge: 'PILLAR 03 &bull; HIGH-TICKET SALES CONVERSION',
      desc: 'The 15-minute response rule, 7 word-for-word high-ticket conversion scripts for WhatsApp and phone, lead triage matrix, and polite disqualification scripts.',
      filename: '03_Inbound_Lead_Conversion_Scripts.pdf',
      size: '245 KB',
      color: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/40',
      accent: 'text-purple-400',
      btnBg: 'bg-purple-600 hover:bg-purple-500 text-white',
    },
    {
      num: '04',
      title: 'Local Competitor Vulnerability Audit',
      badge: 'PILLAR 04 &bull; STRATEGIC MARKET INTELLIGENCE',
      desc: 'The 7 fatal digital vulnerabilities of local incumbent businesses and a 10-minute diagnostic audit worksheet to spot untapped ranking and revenue opportunities.',
      filename: '04_Local_Competitor_Vulnerability_Audit.pdf',
      size: '260 KB',
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/40',
      accent: 'text-amber-400',
      btnBg: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
  ];

  return (
    <Shell>
      <Helmet>
        <title>Client Growth Asset Vault | Uncoded Hub</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      {/* Hero Header */}
      <Section className="pt-32 pb-16 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Confidential &bull; Client Growth Asset Vault
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              The Local Inbound Authority &amp;{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                5-Star Review Machine
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Your complimentary ₹15,000 growth system. Engineered to pair with your high-speed Uncoded Hub website and dominate local Google search.
            </p>
          </Reveal>

          {/* Master Download Box */}
          <Reveal delay={300}>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#131B2E] to-[#0B1120] border border-cyan-500/40 shadow-2xl shadow-cyan-950/40 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black text-xs font-bold tracking-wider uppercase rounded-bl-xl">
                Master Bundle Package
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    Complete Download Package &bull; All 5 Guides Included
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Download The Complete Asset Vault (.ZIP)
                  </h2>
                  <p className="text-sm text-slate-400 max-w-xl">
                    Contains all 4 core pillars plus the unified Master Playbook in high-resolution, print-ready PDF format. Includes field checklists, WhatsApp message templates, and the 30-day implementation roadmap.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Format: ZIP (5 PDFs)
                    </span>
                    <span>&bull;</span>
                    <span>Size: ~906 KB</span>
                    <span>&bull;</span>
                    <span className="text-emerald-400 font-semibold">Immediate Offline Access</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href="/downloads/uncodedhub-client-bonus-inbound-authority.zip"
                    download="uncodedhub-client-bonus-inbound-authority.zip"
                    rel="nofollow"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-black font-extrabold text-base tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Master ZIP
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Welcome Note from Founders */}
      <Section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal delay={100}>
            <div className="p-6 md:p-8 rounded-xl bg-[#0E1526]/80 border border-slate-800 text-slate-300 leading-relaxed text-sm md:text-base">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-400 text-sm">
                  DG
                </div>
                <div>
                  <div className="text-white font-semibold">Deepak &amp; Geetha</div>
                  <div className="text-xs text-slate-400">Founders &amp; Web Architects, Uncoded Hub</div>
                </div>
              </div>
              <p className="mb-3">
                <strong>Dear Client,</strong>
              </p>
              <p className="mb-3">
                When we build your website at Uncoded Hub, we engineer it for raw speed (sub-second load times) and maximum conversion. But a high-converting website needs high-intent traffic to fulfill its true revenue potential.
              </p>
              <p className="mb-0">
                This Client Asset Vault contains our internal proprietary SOPs. By following the 30-day action steps outlined in these guides, you will climb into Google’s Local 3-Pack, harvest effortless 5-star reviews via WhatsApp, and respond to inbound leads with closing scripts that convert inquiries into premium paying clients.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Individual Guides Grid */}
      <Section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Explore or Download Individual Pillar Guides
            </h2>
            <p className="text-sm text-slate-400">
              Need to read on mobile or share a specific SOP with your front-desk or operations team? Download any guide individually below.
            </p>
          </div>

          <div className="space-y-4">
            {assets.map((item, index) => (
              <Reveal key={item.filename} delay={100 * (index + 1)}>
                <div className={`p-6 rounded-xl bg-gradient-to-r ${item.color} border ${item.border} hover:border-white/30 transition-all duration-200`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold tracking-wider uppercase ${item.accent}`}>
                          {item.badge}
                        </span>
                        <span className="text-slate-500 text-xs">&bull;</span>
                        <span className="text-xs font-mono text-slate-400">{item.size}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <a
                        href={`/downloads/${item.filename}`}
                        download={item.filename}
                        rel="nofollow"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all shadow-md ${item.btnBg}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        PDF ({item.size})
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Assistance & WhatsApp Help */}
          <Reveal delay={500}>
            <div className="mt-12 p-6 rounded-xl bg-[#090D18] border border-cyan-500/20 text-center">
              <h3 className="text-base font-bold text-white mb-2">Need Guidance Implementing These Blueprints?</h3>
              <p className="text-xs md:text-sm text-slate-400 mb-4 max-w-xl mx-auto">
                As an active client of Uncoded Hub, our team is always available to review your Google Business Profile configuration, review links, or response scripts.
              </p>
              <a
                href="https://wa.me/919902621743?text=Hi%20Deepak%2C%20I%20have%20a%20question%20regarding%20the%20Client%20Bonus%20Vault."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-emerald-900/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                WhatsApp Deepak Directly
              </a>
              <div className="mt-4 text-[11px] text-slate-500 font-mono">
                Client Confidential &bull; Licensed Exclusively to Active Clients of Uncoded Hub
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </Shell>
  );
}
