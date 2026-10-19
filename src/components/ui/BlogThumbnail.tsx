import { NICHES, type NicheKey } from '../../lib/blog';

/* ═══════════════════════════════════════════════════════════════════
   BLOG THUMBNAIL — Cloaked-Style Editorial Generative Tile
   ═══════════════════════════════════════════════════════════════════ */

const THUMB_THEMES: Record<
  NicheKey,
  {
    gradient: string;
    pillBg: string;
    pillText: string;
    ghostText: string;
    code: string;
    motif: string;
  }
> = {
  studio: {
    gradient: 'from-[#1a1714] via-[#0e0c0a] to-[#251f1a]',
    pillBg: 'bg-signal/20 border-signal/40',
    pillText: 'text-signal-bright',
    ghostText: 'Studio',
    code: 'SYS.00',
    motif: 'Engineering & Craft',
  },
  'coaches-consultants': {
    gradient: 'from-[#181a20] via-[#0f1117] to-[#21242e]',
    pillBg: 'bg-blue-500/20 border-blue-400/40',
    pillText: 'text-blue-300',
    ghostText: 'Advisory',
    code: 'ADV.01',
    motif: 'Authority & Funnels',
  },
  'dental-clinics': {
    gradient: 'from-[#141d1a] via-[#0c1411] to-[#1a2822]',
    pillBg: 'bg-emerald-500/20 border-emerald-400/40',
    pillText: 'text-emerald-300',
    ghostText: 'Clinic',
    code: 'MED.02',
    motif: 'Trust & Patient UX',
  },
  'home-renovation': {
    gradient: 'from-[#221c17] via-[#14100c] to-[#2e2319]',
    pillBg: 'bg-amber-500/20 border-amber-400/40',
    pillText: 'text-amber-300',
    ghostText: 'Renovate',
    code: 'REN.03',
    motif: 'Scope & Costing',
  },
  'interior-designers': {
    gradient: 'from-[#21161d] via-[#140c11] to-[#2d1b26]',
    pillBg: 'bg-fuchsia-500/20 border-fuchsia-400/40',
    pillText: 'text-fuchsia-300',
    ghostText: 'Interior',
    code: 'ARC.04',
    motif: 'Visual Persuasion',
  },
  'real-estate': {
    gradient: 'from-[#131b23] via-[#0c1218] to-[#1b2633]',
    pillBg: 'bg-cyan-500/20 border-cyan-400/40',
    pillText: 'text-cyan-300',
    ghostText: 'Property',
    code: 'EST.05',
    motif: 'Hyperlocal Authority',
  },
  'wedding-photographers': {
    gradient: 'from-[#24171a] via-[#140b0e] to-[#301c22]',
    pillBg: 'bg-rose-500/20 border-rose-400/40',
    pillText: 'text-rose-300',
    ghostText: 'Cinema',
    code: 'FLM.06',
    motif: 'Emotional Lead Flow',
  },
  'educational-academy': {
    gradient: 'from-[#171a26] via-[#0d101a] to-[#202538]',
    pillBg: 'bg-indigo-500/20 border-indigo-400/40',
    pillText: 'text-indigo-300',
    ghostText: 'Academy',
    code: 'EDU.07',
    motif: 'Curriculum & Admissions',
  },
  'gym-fitness-club': {
    gradient: 'from-[#1c1d14] via-[#10120c] to-[#27291a]',
    pillBg: 'bg-lime-500/20 border-lime-400/40',
    pillText: 'text-lime-300',
    ghostText: 'Fitness',
    code: 'GYM.08',
    motif: 'Pass Engines & Retention',
  },
  'business-portfolio': {
    gradient: 'from-[#1a1b1f] via-[#0f1014] to-[#24262d]',
    pillBg: 'bg-slate-400/20 border-slate-300/40',
    pillText: 'text-slate-200',
    ghostText: 'Advisory',
    code: 'B2B.09',
    motif: 'Prestige & RFP Wins',
  },
  'spa-wellness': {
    gradient: 'from-[#141d18] via-[#0c1410] to-[#1a2921]',
    pillBg: 'bg-teal-500/20 border-teal-400/40',
    pillText: 'text-teal-300',
    ghostText: 'Sanctuary',
    code: 'SPA.10',
    motif: 'Sensory Ritual Portals',
  },
  'salon-beauty': {
    gradient: 'from-[#23171d] via-[#140b10] to-[#301c27]',
    pillBg: 'bg-pink-500/20 border-pink-400/40',
    pillText: 'text-pink-300',
    ghostText: 'Bridal',
    code: 'BLT.11',
    motif: 'Lookbooks & Artist Proof',
  },
  'fitness-coach': {
    gradient: 'from-[#221614] via-[#140b0a] to-[#301c18]',
    pillBg: 'bg-orange-500/20 border-orange-400/40',
    pillText: 'text-orange-300',
    ghostText: 'Coaching',
    code: 'FIT.12',
    motif: 'Transformation Funnels',
  },
  'yoga-meditation': {
    gradient: 'from-[#221a16] via-[#140e0c] to-[#30221c]',
    pillBg: 'bg-amber-600/20 border-amber-500/40',
    pillText: 'text-amber-300',
    ghostText: 'Shala',
    code: 'YOG.13',
    motif: 'Timetables & Community',
  },
  'creative-portfolio': {
    gradient: 'from-[#151928] via-[#0b0e1a] to-[#1c223a]',
    pillBg: 'bg-violet-500/20 border-violet-400/40',
    pillText: 'text-violet-300',
    ghostText: 'Creative',
    code: 'AGN.14',
    motif: 'Kinetic Showcases & Briefs',
  },
  'healthcare-diagnostics': {
    gradient: 'from-[#131d22] via-[#0a1317] to-[#192830]',
    pillBg: 'bg-sky-500/20 border-sky-400/40',
    pillText: 'text-sky-300',
    ghostText: 'Pathology',
    code: 'LAB.15',
    motif: 'Sample Booking & Reports',
  },
  'clinic-polyclinic': {
    gradient: 'from-[#131e1c] via-[#0a1412] to-[#1a2b27]',
    pillBg: 'bg-emerald-600/20 border-emerald-500/40',
    pillText: 'text-emerald-300',
    ghostText: 'Clinical',
    code: 'OPD.16',
    motif: 'OPD Matrices & Triage',
  },
  'doctor-specialist': {
    gradient: 'from-[#141926] via-[#0c0f1c] to-[#1c2438]',
    pillBg: 'bg-blue-600/20 border-blue-500/40',
    pillText: 'text-blue-200',
    ghostText: 'Surgical',
    code: 'SUR.17',
    motif: 'Authority & Second Opinions',
  },
};

export default function BlogThumbnail({
  niche,
  size = 'card',
  className = '',
}: {
  niche: NicheKey;
  size?: 'card' | 'hero';
  className?: string;
}) {
  const theme = THUMB_THEMES[niche] || THUMB_THEMES.studio;
  const isHero = size === 'hero';

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} border border-white/10 ${
        isHero ? 'rounded-[28px] aspect-[21/9]' : 'rounded-[20px] aspect-[16/10]'
      } p-6 sm:p-8 flex flex-col justify-between group-hover:border-signal/40 transition-all duration-500 ${className}`}
      aria-hidden="true"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      {/* Glow Orb */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-signal/15 rounded-full blur-[70px] pointer-events-none" />

      {/* Oversized Ghost Wordmark */}
      <span
        className="font-display absolute -right-2 -bottom-4 text-white/[0.06] select-none whitespace-nowrap pointer-events-none tracking-tighter"
        style={{
          fontSize: isHero ? 'clamp(4rem, 14vw, 11rem)' : 'clamp(3rem, 10vw, 6.5rem)',
          lineHeight: 0.85,
        }}
      >
        {theme.ghostText}
      </span>

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${theme.pillBg} ${theme.pillText}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {NICHES[niche]}
        </span>

        <span className="text-[10px] font-mono text-white/40 tracking-widest">
          {theme.code}
        </span>
      </div>

      {/* Bottom Row */}
      <div className="relative z-10 pt-6">
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block mb-1">
          {theme.motif}
        </span>
        <span className="font-display text-lg sm:text-xl text-white/90 font-medium">
          Architectural Blueprint
        </span>
      </div>
    </div>
  );
}
