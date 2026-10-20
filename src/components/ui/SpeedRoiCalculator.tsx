import { useState, useId } from 'react';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════
   SPEED ROI & LOST REVENUE CALCULATOR
   Interactive economic modeling component based on Google, Akamai,
   and Amazon web performance research:
   - 53% of mobile visits are abandoned if a page takes >3s to load
   - Every 100ms latency increase costs ~1% in conversions
   - Hand-crafted React/Vite SSG (0.8s) recovers lost pipeline value
   ═══════════════════════════════════════════════════════════════════ */

interface SpeedTier {
  id: string;
  label: string;
  speedSec: number;
  sub: string;
  bounceMultiplier: number;
}

const SPEED_TIERS: SpeedTier[] = [
  { id: 'wordpress-avg', label: '3.8s · Typical WordPress', speedSec: 3.8, sub: 'Elementor / Divi with 25+ plugins', bounceMultiplier: 0.32 },
  { id: 'heavy-bloat', label: '6.2s · Slow Theme', speedSec: 6.2, sub: 'Heavy uncompressed images & trackers', bounceMultiplier: 0.54 },
  { id: 'critical-lag', label: '8.5s+ · Broken Mobile', speedSec: 8.5, sub: 'Budget shared hosting & bloated PHP', bounceMultiplier: 0.72 },
  { id: 'custom-fast', label: '1.8s · Modern Standard', speedSec: 1.8, sub: 'Average optimized custom stack', bounceMultiplier: 0.12 },
];

export function SpeedRoiCalculator({ onBookCall }: { onBookCall?: () => void }) {
  const visitorsId = useId();
  const dealValueId = useId();
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(3500);
  const [dealValue, setDealValue] = useState<number>(30000); // INR or USD value
  const [selectedSpeed, setSelectedSpeed] = useState<SpeedTier>(SPEED_TIERS[0]);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Economic calculations:
  // Baseline conversion rate for business sites: ~2.5%
  const baselineConvRate = 0.025;
  
  // Uncoded Hub operates at ~0.8s (near-zero speed penalty, ~3% bounce loss)
  const uncodedBounceLoss = 0.04;
  
  // Net bounce loss differential compared to Uncoded Hub
  const excessBounceLoss = Math.max(0, selectedSpeed.bounceMultiplier - uncodedBounceLoss);
  
  // Monthly visitors lost before reaching headline
  const lostVisitorsMonthly = Math.round(monthlyVisitors * excessBounceLoss);
  
  // Monthly lost inquiries/leads (assuming baseline conversion of abandoned traffic)
  const lostLeadsMonthly = Math.max(1, Math.round(lostVisitorsMonthly * baselineConvRate));
  
  // Annual lost revenue
  const annualLostRevenue = lostLeadsMonthly * dealValue * 12;

  const formatCurrency = (val: number) => {
    if (currency === 'INR') {
      return `₹${val.toLocaleString('en-IN')}`;
    }
    return `$${val.toLocaleString('en-US')}`;
  };

  return (
    <div className="w-full bg-ink text-paper rounded-[32px] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
      {/* Background ambient lighting */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 bg-signal/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true" 
      />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[11px] font-mono text-signal-bright uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            <span>Interactive Economic Model</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl text-paper font-normal tracking-tight">
            The True Cost of a Slow Website
          </h3>
          <p className="text-on-ink-muted text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            Every additional second of mobile latency causes qualified clients to bounce to your competitors before they ever read your copy.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="inline-flex items-center bg-white/[0.05] p-1 rounded-xl border border-white/10 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => { setCurrency('INR'); setDealValue(30000); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              currency === 'INR' ? 'bg-signal text-paper' : 'text-on-ink-muted hover:text-paper'
            }`}
          >
            INR (₹)
          </button>
          <button
            type="button"
            onClick={() => { setCurrency('USD'); setDealValue(1500); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              currency === 'USD' ? 'bg-signal text-paper' : 'text-on-ink-muted hover:text-paper'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Main Grid: Controls Left, ROI Projection Right */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 pt-8">
        {/* Left Column: Interactive Sliders & Tiers */}
        <div className="lg:col-span-7 space-y-8">
          {/* Slider 1: Monthly Traffic */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
              <label htmlFor={visitorsId} className="text-on-ink-muted">Estimated Monthly Visitors</label>
              <span className="text-signal-bright font-bold text-base">
                {monthlyVisitors.toLocaleString()} <span className="text-xs text-on-ink-muted font-normal">visitors/mo</span>
              </span>
            </div>
            <input
              id={visitorsId}
              type="range"
              min={500}
              max={30000}
              step={250}
              value={monthlyVisitors}
              onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
              aria-label="Estimated Monthly Visitors"
              className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#c7074b]"
            />
            <div className="flex justify-between text-[11px] font-mono text-on-ink-muted">
              <span>500</span>
              <span>10,000</span>
              <span>20,000</span>
              <span>30,000+</span>
            </div>
          </div>

          {/* Slider 2: Average Client / Project Value */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
              <label htmlFor={dealValueId} className="text-on-ink-muted">Average Client / Project Value</label>
              <span className="text-signal-bright font-bold text-base">
                {formatCurrency(dealValue)} <span className="text-xs text-on-ink-muted font-normal">per client</span>
              </span>
            </div>
            <input
              id={dealValueId}
              type="range"
              min={currency === 'INR' ? 5000 : 250}
              max={currency === 'INR' ? 200000 : 10000}
              step={currency === 'INR' ? 5000 : 250}
              value={dealValue}
              onChange={(e) => setDealValue(Number(e.target.value))}
              aria-label="Average Client or Project Value"
              className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#c7074b]"
            />
            <div className="flex justify-between text-[11px] font-mono text-on-ink-muted">
              <span>{currency === 'INR' ? '₹5K' : '$250'}</span>
              <span>{currency === 'INR' ? '₹75K' : '$3.5K'}</span>
              <span>{currency === 'INR' ? '₹1.5L' : '$7K'}</span>
              <span>{currency === 'INR' ? '₹2L+' : '$10K+'}</span>
            </div>
          </div>

          {/* Speed Tier Selector */}
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-mono text-on-ink-muted block">
              Current Website Loading Speed on Mobile
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPEED_TIERS.map((tier) => {
                const isActive = selectedSpeed.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedSpeed(tier)}
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-signal/15 border-signal text-paper shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-on-ink-muted hover:border-white/25 hover:text-paper'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-semibold text-paper">
                        {tier.label}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-signal" />
                      )}
                    </div>
                    <div className="text-[11px] text-on-ink-muted leading-tight">
                      {tier.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Impact & Guarantee Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white/[0.04] border border-white/10 rounded-[28px] p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-on-ink-muted">
                Calculated Revenue Leakage
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {(selectedSpeed.bounceMultiplier * 100).toFixed(0)}% Abandonment Rate
              </span>
            </div>

            {/* Big Number */}
            <div className="space-y-1 mb-6">
              <div className="text-xs font-mono text-on-ink-muted uppercase">
                Estimated Annual Lost Pipeline
              </div>
              <div className="font-display text-3xl sm:text-5xl text-rose-400 font-semibold tracking-tight">
                {formatCurrency(annualLostRevenue)}
                <span className="text-xs sm:text-sm font-mono text-on-ink-muted font-normal block mt-1">
                  leaked to competitors every year
                </span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 mb-6 text-left">
              <div>
                <div className="text-[11px] font-mono text-on-ink-muted">Lost Mobile Visitors</div>
                <div className="text-lg font-display text-paper font-medium mt-0.5">
                  ~{lostVisitorsMonthly.toLocaleString()}/mo
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-on-ink-muted">Lost Qualified Leads</div>
                <div className="text-lg font-display text-paper font-medium mt-0.5">
                  ~{lostLeadsMonthly * 12}/year
                </div>
              </div>
            </div>

            {/* Uncoded Hub Difference */}
            <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-1">
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>With Uncoded Hub (0.8s Handcrafted SSG)</span>
              </div>
              <p className="text-[12px] text-emerald-200/90 leading-relaxed">
                Zero WordPress plugin drag. Pre-baked HTML loads instantly on 4G, converting visitors before they lose patience.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            {onBookCall ? (
              <button
                type="button"
                onClick={onBookCall}
                className="w-full bg-signal hover:bg-signal-bright text-paper font-medium text-sm py-3.5 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-signal/25"
              >
                <span>Recover Lost Pipeline · Book 7-Day Sprint</span>
                <span>→</span>
              </button>
            ) : (
              <Link
                to="/contact/"
                className="w-full bg-signal hover:bg-signal-bright text-paper font-medium text-sm py-3.5 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-signal/25"
              >
                <span>Recover Lost Pipeline · Book 7-Day Sprint</span>
                <span>→</span>
              </Link>
            )}

            <div className="text-center">
              <a
                href={`https://wa.me/918778427958?text=${encodeURIComponent(
                  `Hi Deepak, I calculated an estimated annual pipeline loss of ${formatCurrency(
                    annualLostRevenue
                  )} due to my slow website (${selectedSpeed.label}). Can we discuss building a fast 7-day website for my business?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-on-ink-muted hover:text-paper transition-colors py-1"
              >
                <svg className="w-3.5 h-3.5 fill-current text-emerald-400" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.587 1.956.884 3.091.884 3.185 0 5.772-2.587 5.772-5.769.001-3.181-2.587-5.767-5.772-5.767zm7.653 5.767c0 4.22-3.432 7.65-7.653 7.65-1.341 0-2.6-.35-3.697-.965l-4.334 1.137 1.157-4.226a7.616 7.616 0 01-1.077-3.996c0-4.22 3.432-7.65 7.653-7.65 4.222 0 7.651 3.43 7.651 7.65z" />
                </svg>
                <span>Or send these numbers directly to Deepak on WhatsApp →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
