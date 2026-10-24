import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  rating: string;
  reviews: number;
  address: string;
  maps_link: string;
  demo_template: string;
  demo_url: string;
  whatsapp_pitch: string;
  phone_call_script: string;
}

interface NicheMeta {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  demo_file: string;
  hook: string;
}

const NICHES: NicheMeta[] = [
  {
    id: '01_interior_designers',
    name: 'Interior Designers & Architects',
    shortName: 'Interior Designers',
    icon: '🎨',
    demo_file: 'interior-design.html',
    hook: 'high-end visual before/after project showcase, 3D floor plan explorer, and instant client inquiry capture',
  },
  {
    id: '02_real_estate_agents',
    name: 'Real Estate Agents & Realtors',
    shortName: 'Real Estate',
    icon: '🏢',
    demo_file: 'real-estate.html',
    hook: 'verified property listings, virtual walkthrough requests, neighborhood guides, and instant WhatsApp booking',
  },
  {
    id: '03_dental_aesthetic_clinics',
    name: 'Dental & Aesthetic Clinics',
    shortName: 'Dental Clinics',
    icon: '🦷',
    demo_file: 'dental-clinic.html',
    hook: 'instant patient appointment scheduling, before/after smile transformations, and doctor credential profiles',
  },
  {
    id: '04_wedding_photographers',
    name: 'Wedding Photographers & Videographers',
    shortName: 'Wedding Photographers',
    icon: '📷',
    demo_file: 'wedding-photography.html',
    hook: 'full-bleed photo galleries, 4K wedding films reel, package pricing guides, and live date availability checker',
  },
  {
    id: '05_home_renovation_modular_kitchens',
    name: 'Home Renovation & Modular Kitchens',
    shortName: 'Home Renovation',
    icon: '🔨',
    demo_file: 'home-renovation.html',
    hook: 'kitchen & wardrobe material visualizer, instant renovation cost estimator, and site inspection booking',
  },
  {
    id: '06_coaches_consultants',
    name: 'Coaches & Business Consultants',
    shortName: 'Coaches & Consultants',
    icon: '🎯',
    demo_file: 'executive-coaching.html',
    hook: '1-on-1 strategy call booking, client transformation case studies, program frameworks, and free lead magnet funnel',
  },
  {
    id: '07_educational_academies',
    name: 'Educational Academies & Coaching',
    shortName: 'Academies',
    icon: '🎓',
    demo_file: 'educational-academy.html',
    hook: 'exam ranker results showcase, batch seat countdown timer, interactive curriculum explorer, and WhatsApp counseling triage',
  },
  {
    id: '08_commercial_gyms',
    name: 'Commercial Gyms & Fitness Clubs',
    shortName: 'Commercial Gyms',
    icon: '🏋️',
    demo_file: 'gym-fitness-club.html',
    hook: 'instant 1-tap workout trial pass, interactive class timetable, virtual equipment tour, and membership calculator',
  },
  {
    id: '09_b2b_corporate_advisory',
    name: 'Enterprise B2B & Corporate Advisory',
    shortName: 'Enterprise B2B',
    icon: '💼',
    demo_file: 'business-portfolio.html',
    hook: 'executive credentials showcase, B2B diagnostic assessment, confidential case studies, and C-level inquiry intake',
  },
  {
    id: '10_luxury_spas_wellness',
    name: 'Luxury Spas & Wellness Retreats',
    shortName: 'Spas & Wellness',
    icon: '🌿',
    demo_file: 'spa-wellness.html',
    hook: 'interactive treatment ritual menu, couple retreat calculator, botanical ingredient transparency, and VIP advance reservation',
  },
  {
    id: '11_salons_bridal_beauty',
    name: 'Salons & Bridal Beauty Studios',
    shortName: 'Bridal Salons',
    icon: '💄',
    demo_file: 'salon-beauty.html',
    hook: 'before/after bridal beauty slider, high-res lookbook, wedding date availability engine, and trial booking funnel',
  },
  {
    id: '12_fitness_coaches',
    name: 'Private Fitness Coaches & Trainers',
    shortName: 'Fitness Coaches',
    icon: '🏃',
    demo_file: 'fitness-coach.html',
    hook: '1-on-1 transformation application funnel, verified DEXA case studies, and macro calculator lead magnet',
  },
  {
    id: '13_yoga_meditation',
    name: 'Yoga Shalas & Meditation Sanctuaries',
    shortName: 'Yoga Shalas',
    icon: '🧘',
    demo_file: 'yoga-meditation.html',
    hook: 'weekly class timetable grid, 200-hour TTC curriculum breakdown, teacher lineage philosophy, and drop-in trial pass',
  },
  {
    id: '14_creative_studios',
    name: 'Creative Studios & Design Agencies',
    shortName: 'Creative Studios',
    icon: '🚀',
    demo_file: 'creative-portfolio.html',
    hook: 'interactive case studies, brand identity before/after slider, deliverable pricing bands, and sub-second visual portfolio',
  },
  {
    id: '15_pathology_diagnostic_labs',
    name: 'Pathology Labs & Diagnostic Centers',
    shortName: 'Diagnostic Labs',
    icon: '🔬',
    demo_file: 'healthcare-diagnostics.html',
    hook: '1-click home sample collection booking, transparent test price menu, turnaround time guarantees, and WhatsApp report delivery',
  },
  {
    id: '16_polyclinics_outpatient',
    name: 'Multi-Specialty Polyclinics',
    shortName: 'Polyclinics',
    icon: '🏥',
    demo_file: 'clinic-polyclinic.html',
    hook: 'department symptom triage, multi-doctor OPD schedules, cashless insurance guides, and emergency triage speed',
  },
  {
    id: '17_doctor_specialists',
    name: 'Super-Specialist Doctors & Surgeons',
    shortName: 'Doctor Specialists',
    icon: '🩺',
    demo_file: 'doctor-specialist.html',
    hook: 'surgical case volume proof, ethical patient recovery guides, second-opinion teleconsultations, and NMC compliance',
  },
];

// Valid Founder PIN codes
const VALID_PINS = ['2026', '9940', '19835'];

export default function TeamOutreach() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('uncodedhub_team_auth') === 'verified';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // App State
  const [activeNicheId, setActiveNicheId] = useState('01_interior_designers');
  const [cityFilter, setCityFilter] = useState<'ALL' | 'Bengaluru' | 'Chennai'>('ALL');
  const [contactedFilter, setContactedFilter] = useState<'ALL' | 'UNCONTACTED' | 'CONTACTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedScriptId, setExpandedScriptId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Contacted storage map
  const [contactedMap, setContactedMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('team_contacted_') && localStorage.getItem(key) === 'true') {
        map[key.replace('team_contacted_', '')] = true;
      }
    }
    return map;
  });

  const activeNiche = useMemo(() => {
    return NICHES.find((n) => n.id === activeNicheId) || NICHES[0];
  }, [activeNicheId]);

  // Load leads for current niche
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    fetch(`/data/outreach/${activeNicheId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load niche leads');
        return res.json();
      })
      .then((data: Lead[]) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLeads([]);
        setLoading(false);
      });
  }, [activeNicheId, isAuthenticated]);

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (VALID_PINS.includes(pinInput.trim())) {
      localStorage.setItem('uncodedhub_team_auth', 'verified');
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('uncodedhub_team_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const toggleContacted = (leadId: string) => {
    const nextVal = !contactedMap[leadId];
    if (nextVal) {
      localStorage.setItem(`team_contacted_${leadId}`, 'true');
    } else {
      localStorage.removeItem(`team_contacted_${leadId}`);
    }
    setContactedMap((prev) => ({
      ...prev,
      [leadId]: nextVal,
    }));
  };

  const handleCopyPitch = (lead: Lead) => {
    navigator.clipboard.writeText(lead.whatsapp_pitch);
    setCopiedId(lead.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Format phone number for WhatsApp link
  const sanitizePhoneForWhatsApp = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) return '91' + digits;
    if (digits.length === 11 && digits.startsWith('0')) return '91' + digits.substring(1);
    if (digits.length === 12 && digits.startsWith('91')) return digits;
    return digits.length >= 10 ? digits : null;
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (cityFilter !== 'ALL' && lead.city !== cityFilter) return false;

      const isContacted = Boolean(contactedMap[lead.id]);
      if (contactedFilter === 'UNCONTACTED' && isContacted) return false;
      if (contactedFilter === 'CONTACTED' && !isContacted) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = lead.name.toLowerCase().includes(q);
        const matchPhone = lead.phone.includes(q);
        const matchAddr = lead.address.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchAddr) return false;
      }
      return true;
    });
  }, [leads, cityFilter, contactedFilter, searchQuery, contactedMap]);

  // Overall statistics
  const currentNicheContactedCount = useMemo(() => {
    return leads.filter((l) => Boolean(contactedMap[l.id])).length;
  }, [leads, contactedMap]);

  const totalContactedCount = useMemo(() => {
    return Object.keys(contactedMap).length;
  }, [contactedMap]);

  // ── PIN AUTHENTICATION GATE SCREEN ──────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090B10] text-[#F8FAFC] flex items-center justify-center p-4">
        <Helmet>
          <title>Team Outreach Login | Uncoded Hub</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="max-w-md w-full bg-[#121622]/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-signal to-amber-500 mx-auto flex items-center justify-center text-3xl mb-6 shadow-lg shadow-signal/20">
            🔐
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight mb-2 text-white">
            Founder & Team Outreach
          </h1>
          <p className="text-xs font-mono text-muted mb-8">
            Restricted Command Center for Deepak & Geetha
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label htmlFor="pin-input" className="block text-xs font-mono text-muted uppercase tracking-wider mb-2">
                Enter 4-Digit Access PIN
              </label>
              <input
                id="pin-input"
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••"
                autoFocus
                className={`w-full py-4 text-center font-mono text-3xl tracking-[0.5em] bg-[#090B10] border ${
                  pinError ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/10 focus:border-signal'
                } rounded-2xl text-white outline-none transition-all`}
              />
            </div>

            {pinError && (
              <p className="text-xs font-mono text-red-400">
                ⚠️ Invalid PIN. Please enter your founder access code.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-signal text-paper font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white hover:text-ink transition-all shadow-lg shadow-signal/20 cursor-pointer"
            >
              Unlock Command Center →
            </button>
          </form>

          <p className="text-[11px] font-mono text-muted/60 mt-6">
            Default Founder PIN: <code className="text-white/80">2026</code>
          </p>
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED COMMAND CENTER ────────────────────────────
  return (
    <div className="min-h-screen bg-[#090B10] text-[#F8FAFC]">
      <Helmet>
        <title>Team Outreach Command Center (3,400 Leads) | Uncoded Hub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#090B10]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-signal text-paper flex items-center justify-center font-mono font-bold text-lg">
              ⚡
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-bold text-white tracking-tight">
                  Team Outreach Command Center
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-signal/20 text-signal font-mono text-[10px] font-semibold">
                  LIVE 3,400 LEADS
                </span>
              </div>
              <p className="text-xs font-mono text-muted">
                Active Session: Deepak & Geetha · 17 High-Ticket Industry Silos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-semibold">
              ✓ {totalContactedCount} Total Contacted
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer"
            >
              🔒 Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* KPI Summary Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#121622] border border-white/10">
            <span className="font-mono text-xs text-muted block mb-1">Total Pipeline</span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-white">3,400 Leads</span>
            <span className="text-[11px] font-mono text-emerald-400 block mt-1">100% Zero Website</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#121622] border border-white/10">
            <span className="font-mono text-xs text-muted block mb-1">Current Niche Queue</span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-white">200 Leads</span>
            <span className="text-[11px] font-mono text-signal block mt-1">
              100 BLR · 100 CHN
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#121622] border border-white/10">
            <span className="font-mono text-xs text-muted block mb-1">Niche Contact Progress</span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-white">
              {currentNicheContactedCount} / 200
            </span>
            <span className="text-[11px] font-mono text-amber-400 block mt-1">
              {Math.round((currentNicheContactedCount / 200) * 100)}% Completed
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#121622] border border-white/10 flex flex-col justify-between">
            <span className="font-mono text-xs text-muted block mb-1">Working Specimen</span>
            <a
              href={`/demos/${activeNiche.demo_file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-signal hover:underline"
            >
              <span>Preview Demo Specimen</span>
              <span>↗</span>
            </a>
            <span className="text-[11px] font-mono text-muted/80 block mt-1 truncate">
              {activeNiche.demo_file}
            </span>
          </div>
        </div>

        {/* 17 Niche Tabs */}
        <div className="mb-8">
          <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">
            Select Target Industry ({NICHES.length} Niches Available):
          </p>
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin">
            {NICHES.map((niche) => {
              const isActive = niche.id === activeNicheId;
              return (
                <button
                  key={niche.id}
                  type="button"
                  onClick={() => setActiveNicheId(niche.id)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-signal text-paper border-signal font-bold shadow-lg shadow-signal/20'
                      : 'bg-[#121622] text-muted hover:text-white border-white/10 hover:border-white/20'
                  }`}
                >
                  <span>{niche.icon}</span>
                  <span>{niche.shortName}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${isActive ? 'bg-black/20 text-white' : 'bg-white/5 text-muted'}`}>
                    200
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#121622] p-4 sm:p-6 rounded-2xl border border-white/10 mb-8 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-muted mr-1">City:</span>
            <button
              type="button"
              onClick={() => setCityFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border ${
                cityFilter === 'ALL'
                  ? 'bg-white text-ink border-white font-semibold'
                  : 'bg-[#090B10] text-muted border-white/10 hover:text-white'
              }`}
            >
              All Cities (200)
            </button>
            <button
              type="button"
              onClick={() => setCityFilter('Bengaluru')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border ${
                cityFilter === 'Bengaluru'
                  ? 'bg-white text-ink border-white font-semibold'
                  : 'bg-[#090B10] text-muted border-white/10 hover:text-white'
              }`}
            >
              📍 Bengaluru (100)
            </button>
            <button
              type="button"
              onClick={() => setCityFilter('Chennai')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border ${
                cityFilter === 'Chennai'
                  ? 'bg-white text-ink border-white font-semibold'
                  : 'bg-[#090B10] text-muted border-white/10 hover:text-white'
              }`}
            >
              📍 Chennai (100)
            </button>

            <span className="text-xs font-mono text-muted mx-2 hidden sm:inline">|</span>

            <span className="text-xs font-mono text-muted mr-1">Status:</span>
            <button
              type="button"
              onClick={() => setContactedFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border ${
                contactedFilter === 'ALL'
                  ? 'bg-signal/20 text-signal border-signal/40 font-semibold'
                  : 'bg-[#090B10] text-muted border-white/10 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setContactedFilter('UNCONTACTED')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border ${
                contactedFilter === 'UNCONTACTED'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                  : 'bg-[#090B10] text-muted border-white/10 hover:text-white'
              }`}
            >
              Uncontacted
            </button>
            <button
              type="button"
              onClick={() => setContactedFilter('CONTACTED')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border ${
                contactedFilter === 'CONTACTED'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                  : 'bg-[#090B10] text-muted border-white/10 hover:text-white'
              }`}
            >
              Contacted
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search business name, phone, area..."
              className="w-full lg:w-72 px-4 py-2 bg-[#090B10] border border-white/10 rounded-xl text-xs font-mono text-white placeholder-muted outline-none focus:border-signal"
            />
          </div>
        </div>

        {/* Lead Grid Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-xs text-muted">
            Showing <strong className="text-white">{filteredLeads.length}</strong> of{' '}
            {leads.length} leads in <span className="text-signal">{activeNiche.name}</span>
          </p>

          <a
            href={`/demos/${activeNiche.demo_file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-signal hover:underline flex items-center gap-1"
          >
            <span>Live Demo: {activeNiche.demo_file}</span>
            <span>↗</span>
          </a>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="p-20 text-center font-mono text-xs text-muted">
            Loading leads for {activeNiche.name}...
          </div>
        )}

        {/* Leads Cards Grid */}
        {!loading && filteredLeads.length === 0 && (
          <div className="p-16 text-center font-mono text-xs text-muted bg-[#121622] rounded-2xl border border-white/10">
            No leads match the current filters.
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLeads.map((lead) => {
              const isContacted = Boolean(contactedMap[lead.id]);
              const isScriptExpanded = expandedScriptId === lead.id;
              const waNumber = sanitizePhoneForWhatsApp(lead.phone);
              const waLink = waNumber
                ? `https://wa.me/${waNumber}?text=${encodeURIComponent(lead.whatsapp_pitch)}`
                : null;

              return (
                <div
                  key={lead.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isContacted
                      ? 'bg-[#121622]/40 border-emerald-500/20 opacity-80'
                      : 'bg-[#121622] border-white/10 hover:border-signal/50 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-mono text-[10px] font-semibold border border-amber-500/20">
                          🌟 ZERO WEBSITE (GOLD)
                        </span>
                        <span className="font-mono text-xs text-muted">📍 {lead.city}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-white leading-tight">
                        {lead.name}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-semibold text-emerald-400 block">
                        ⭐ {lead.rating}
                      </span>
                      <span className="font-mono text-[10px] text-muted">
                        {lead.reviews} Reviews
                      </span>
                    </div>
                  </div>

                  {/* Commercial Address Snippet */}
                  <p className="text-xs text-muted/80 leading-relaxed mb-4 line-clamp-2">
                    {lead.address}
                  </p>

                  {/* Direct Contact Info Row */}
                  <div className="p-3 rounded-xl bg-[#090B10] border border-white/5 flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-white">
                      <span className="text-muted">📞</span>
                      <span className="font-semibold">{lead.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors"
                      >
                        Call
                      </a>
                      <a
                        href={lead.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-white font-mono text-[11px] transition-colors"
                      >
                        Maps ↗
                      </a>
                    </div>
                  </div>

                  {/* Pitch Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (!isContacted) toggleContacted(lead.id);
                        }}
                        className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>💬 Send WhatsApp</span>
                        <span>↗</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCopyPitch(lead)}
                      className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer"
                    >
                      {copiedId === lead.id ? '✓ Copied' : '📋 Copy Pitch'}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedScriptId(isScriptExpanded ? null : lead.id)
                      }
                      className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer"
                    >
                      {isScriptExpanded ? 'Hide Script' : '📞 Phone Script'}
                    </button>
                  </div>

                  {/* Expandable Phone Call Script */}
                  {isScriptExpanded && (
                    <div className="mt-3 p-4 rounded-xl bg-[#090B10] border border-signal/20 text-xs font-mono text-paper/90 whitespace-pre-line leading-relaxed mb-4">
                      <p className="text-signal font-semibold mb-2">
                        📞 Word-for-Word Phone Script:
                      </p>
                      {lead.phone_call_script}
                    </div>
                  )}

                  {/* Card Bottom / Mark Contacted */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-mono text-muted cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isContacted}
                        onChange={() => toggleContacted(lead.id)}
                        className="w-4 h-4 rounded bg-[#090B10] border-white/20 text-signal focus:ring-0 cursor-pointer"
                      />
                      <span>Mark Contacted</span>
                    </label>

                    {isContacted && (
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        ✓ Outreach Dispatched
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
