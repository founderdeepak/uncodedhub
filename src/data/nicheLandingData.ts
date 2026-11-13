import { type NicheKey } from '../lib/blog';

export interface CommercialProblem {
  num: string;
  problem: string;
  solution: string;
  metric: string;
}

export interface ConversionPillar {
  title: string;
  desc: string;
  deliverable: string;
}

export interface NicheLandingConfig {
  key: NicheKey;
  projectId: string;
  heroBadge: string;
  headline: string;
  subheadline: string;
  targetAudience: string[];
  stats: { value: string; label: string }[];
  problems: CommercialProblem[];
  conversionPillars: ConversionPillar[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const NICHE_LANDING_DATA: Record<Exclude<NicheKey, 'studio'>, NicheLandingConfig> = {
  'interior-designers': {
    key: 'interior-designers',
    projectId: 'interior-design',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · INTERIOR ARCHITECTURE',
    headline: 'Websites for Interior Architects That Sell Your Craft Before You Speak.',
    subheadline:
      'Bespoke, hand-coded digital flagships engineered for luxury interior design studios and architects. 3D render-to-reality comparisons, itemized trade-cost transparency, and zero WordPress bloat.',
    targetAudience: [
      'High-end residential interior architecture studios',
      'Turnkey modular home & spatial designers',
      'Bespoke commercial hospitality ateliers',
      'Architects with capped client rosters',
    ],
    stats: [
      { value: '0.8s LCP', label: 'High-res gallery load speed' },
      { value: '100%', label: 'Itemized trade fee transparency' },
      { value: '7 Days', label: 'Discovery to live deployment' },
      { value: '0 Plugins', label: 'Zero page builders or vulnerabilities' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Generic WordPress themes crash mobile devices when loading 4K render galleries.',
        solution: 'Custom WebP/AVIF responsive picture elements served via edge CDN with 0.8s Largest Contentful Paint.',
        metric: 'Sub-second mobile speed on 4G',
      },
      {
        num: '02',
        problem: 'Tire-kickers flood Instagram DMs asking for free 3D renders and vague square-foot pricing.',
        solution: 'Built-in interactive trade fee estimator and pre-qualification questionnaire that filters for serious high-ticket commissions.',
        metric: '4x higher inquiry qualification',
      },
      {
        num: '03',
        problem: 'Clients doubt whether photorealistic 3D concepts match finished real-world carpentry execution.',
        solution: 'Interactive 3D Render-to-Reality slider showcasing exact material matching, grain alignment, and craftsmanship.',
        metric: 'Instant structural credibility',
      },
      {
        num: '04',
        problem: 'Web agencies charge monthly retainers and take weeks to upload a single completed site photo.',
        solution: '100% full source code ownership in clean semantic React, with simple self-serve image upload documentation.',
        metric: 'Zero monthly lock-in fees',
      },
    ],
    conversionPillars: [
      {
        title: '3D Render-to-Reality Proof',
        desc: 'Interactive comparison sliders allowing prospective homeowners to slide between architectural render and real executed photograph.',
        deliverable: 'Touch-optimized interactive comparison module',
      },
      {
        title: 'Itemized Trade Fee Transparency',
        desc: 'Upfront breakdown of structural design fees vs trade execution procurement, eliminating awkward budget negotiations.',
        deliverable: 'Interactive commercial scope calculator',
      },
      {
        title: 'Capped-Roster Inquiry Intake',
        desc: 'Exclusivity mechanism highlighting limited concurrent projects (e.g. 4 homes per quarter) to command higher design fees.',
        deliverable: 'Automated consultation calendar integration',
      },
    ],
    metaTitle: 'Luxury Interior Architecture Website Designer | Uncoded Hub',
    metaDescription:
      'Luxury interior architecture website design engineered for sub-second speed, 3D render-to-reality showcases, and monograph-grade portfolio rendering in 7 days.',
    keywords: [
      'interior design website',
      'architect portfolio website',
      'luxury interior architecture web design',
      'fast portfolio for designers',
      'interior designer website design 7 days',
    ],
  },

  'real-estate': {
    key: 'real-estate',
    projectId: 'real-estate',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · PRIME PROPERTY ADVISORY',
    headline: 'Independent Property Websites That Command Multi-Crore Trust.',
    subheadline:
      'Break free from 99acres and MagicBricks portals. Custom digital flagships for private property consultants, luxury brokerages, and off-market residential acquisitions.',
    targetAudience: [
      'Independent luxury real estate brokers & advisors',
      'Off-market high-net-worth property consultants',
      'Boutique residential brokerage founders',
      'Commercial real estate acquisition firms',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Property tour mobile speed' },
      { value: '14-Point', label: 'Legal title verification badge' },
      { value: '100%', label: 'Strict client NDA confidentiality' },
      { value: '7 Days', label: 'Fixed sprint launch guarantee' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Portal dependency leaves luxury brokers competing on discount commissions alongside spam listings.',
        solution: 'Sovereign private brokerage flagship highlighting exclusive mandates, verified titles, and bespoke buyer advocacy.',
        metric: '100% commission retention',
      },
      {
        num: '02',
        problem: 'Buyers distrust online property listings due to fake photos, unauthorized layouts, and hidden legal disputes.',
        solution: '14-Point legal title verification checklist, RERA verification badges, and sanction document downloads.',
        metric: 'Eliminates buyer skepticism',
      },
      {
        num: '03',
        problem: 'Bloated MLS widgets and slow video embeds take 10+ seconds to load on mobile buyer devices.',
        solution: 'Native HLS streaming video player and responsive architectural floorplan viewer loading in under 700ms.',
        metric: '0.7s Core Web Vitals speed',
      },
      {
        num: '04',
        problem: 'High-net-worth buyers refuse to submit phone numbers into public portals that sell data to spam telemarketers.',
        solution: 'Encrypted consultation intake protocol with explicit privacy covenants and direct founder booking.',
        metric: 'Confidential client acquisition',
      },
    ],
    conversionPillars: [
      {
        title: '14-Point Title Verification Audit',
        desc: 'Interactive document checklist demonstrating Encumbrance Certificate, Land Use Sanctions, and RERA approvals.',
        deliverable: 'Verified legal audit badge & downloadable summary',
      },
      {
        title: 'Off-Market Vault & NDA Intake',
        desc: 'Private gated section for trophy assets requiring NDA signature before revealing address and floor plans.',
        deliverable: 'Client qualification & confidentiality workflow',
      },
      {
        title: 'Bespoke Buyer Advisory Matrix',
        desc: 'Clear comparison table highlighting the commercial difference between developer-biased brokers and independent buyer advocates.',
        deliverable: 'Pre-consultation education module',
      },
    ],
    metaTitle: 'Real Estate Developer Portfolio Website Design | Uncoded Hub',
    metaDescription:
      'Real estate developer portfolio website design engineered to command multi-crore trust. High-net-worth buyer funnels, 14-point title proof, and 7-day launch.',
    keywords: [
      'real estate website design',
      'luxury property consultant website',
      'independent broker website',
      'real estate portfolio 7 day sprint',
      'fast real estate web platform',
    ],
  },

  'dental-clinics': {
    key: 'dental-clinics',
    projectId: 'dental-clinic',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · DENTAL & FACIAL AESTHETICS',
    headline: 'Dental Websites Engineered to Dissolve Patient Anxiety and Price Fear.',
    subheadline:
      'High-converting digital chambers for cosmetic dentists, implantologists, and aesthetic clinics. Featuring patient stop-signal protocols, upfront fee calculators, and hospital-grade sterilisation transparency.',
    targetAudience: [
      'Cosmetic dentists & smile makeover specialists',
      'Dental implant & full-mouth rehabilitation clinics',
      'Facial aesthetics & orthodontic practices',
      'Multi-chair family dental centres',
    ],
    stats: [
      { value: '0.8s LCP', label: 'Instant mobile clinic loading' },
      { value: '100%', label: 'Upfront treatment pricing transparency' },
      { value: 'Class-B', label: 'Autoclave sterilisation proof' },
      { value: '7 Days', label: 'Turnkey delivery timeline' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Deep dental anxiety and fear of painful procedures cause 60% of prospective patients to abandon dental websites.',
        solution: 'Patient Stop-Signal Protocol prominent on every page, with video walkthroughs of painless anaesthesia technology.',
        metric: 'Dissolves dental anxiety',
      },
      {
        num: '02',
        problem: 'Hidden add-on fees and "call for quote" pricing create immediate patient distrust before the first appointment.',
        solution: 'Interactive treatment fee calculator with itemized cost ranges for veneers, aligners, and implants.',
        metric: '3x higher consultation bookings',
      },
      {
        num: '03',
        problem: 'Post-pandemic hygiene skepticism regarding instrument sterilisation and cross-contamination risks.',
        solution: 'Class-B vacuum autoclave sterilisation disclosures, sealed pouch protocols, and air filtration transparency.',
        metric: 'Hospital-grade trust badge',
      },
      {
        num: '04',
        problem: 'Patients booking through phone calls during clinic hours often result in 35% no-show rates.',
        solution: 'Automated 1-tap WhatsApp consultation confirmation with Google Calendar sync and appointment deposit options.',
        metric: 'Near-zero clinic no-shows',
      },
    ],
    conversionPillars: [
      {
        title: 'Patient Stop-Signal Guarantee',
        desc: 'Written promise that patients have total control during procedures, immediately stopping treatment whenever they raise a hand.',
        deliverable: 'Comfort & pain-free protocol banner',
      },
      {
        title: 'Interactive Treatment Fee Calculator',
        desc: 'Transparent pricing estimator covering porcelain veneers, clear aligners, and CBCT-guided dental implants.',
        deliverable: 'Interactive pricing breakdown calculator',
      },
      {
        title: 'Doctor Credential & Case Vault',
        desc: 'Unretouched before-and-after smile transformation sliders showing real gum health and tooth texture under clinical lighting.',
        deliverable: 'Clinical-grade aesthetic comparison grid',
      },
    ],
    metaTitle: 'Custom Dental Clinic Website Design | 7-Day Sprint | Uncoded Hub',
    metaDescription:
      'Custom dental clinic website design engineered to dissolve patient anxiety. Upfront treatment fee calculators, 2-tap WhatsApp booking, and sub-second mobile speed.',
    keywords: [
      'dental clinic website design',
      'cosmetic dentist web platform',
      'dental implant website',
      'dental practice website 7 days',
      'clinic website with price calculator',
    ],
  },

  'wedding-photographers': {
    key: 'wedding-photographers',
    projectId: 'wedding-photography',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · LUXURY WEDDING CINEMATOGRAPHY',
    headline: 'Cinematic Websites That Command High-Ticket Wedding Retainers.',
    subheadline:
      'High-fashion digital ateliers for destination wedding filmmakers and photographers. Sub-second 4K photo masonry, HLS video streaming, and real-time wedding season availability calendars.',
    targetAudience: [
      'Destination wedding photographers & filmmakers',
      'Luxury bridal portrait ateliers',
      'Fine-art wedding documentation studios',
      'High-end celebration & event cinematographers',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Full 4K gallery load speed' },
      { value: '0 Lag', label: 'HLS adaptive video streaming' },
      { value: '100%', label: 'Capped wedding season calendar' },
      { value: '7 Days', label: 'From assets to live platform' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Heavy uncompressed photo galleries take 8+ seconds to load, losing impatient couples on mobile.',
        solution: 'Next-gen responsive picture markup with progressive WebP loading and lazy-loaded masonry grids.',
        metric: '0.7s LCP on mobile connections',
      },
      {
        num: '02',
        problem: 'Price-shopping couples treat you like an hourly vendor because your site looks like an Instagram feed.',
        solution: 'Editorial storytelling layout framing your work as timeless heirloom art, anchoring high-ticket packages.',
        metric: '2.5x higher average booking value',
      },
      {
        num: '03',
        problem: 'Couples inquiring about dates you are already booked for waste hours of administrative email back-and-forth.',
        solution: 'Interactive wedding season availability tracker showing open calendar dates across key destination wedding months.',
        metric: 'Eliminates redundant date inquiries',
      },
      {
        num: '04',
        problem: 'Sharing Vimeo or YouTube links looks amateur and exposes couples to competing vendor recommendations.',
        solution: 'Self-hosted cinematic video stage with custom audio controls and distraction-free full-width playback.',
        metric: '100% brand immersion',
      },
    ],
    conversionPillars: [
      {
        title: 'Story-Driven Editorial Chapters',
        desc: 'Multi-image emotional photo essays combining candid portraits, decor details, and family rituals into a cinematic narrative.',
        deliverable: 'Dynamic editorial photo layout',
      },
      {
        title: 'Seasonal Date Reservation Calendar',
        desc: 'Interactive calendar indicating booked wedding weekends and accepting priority waitlist inquiries for open dates.',
        deliverable: 'Real-time wedding date inquiry funnel',
      },
      {
        title: 'Transparent Investment Guide',
        desc: 'Upfront breakdown of two-day and three-day wedding coverage, deliverables, raw footage terms, and drone cinematography.',
        deliverable: 'Pre-qualification wedding pricing tier matrix',
      },
    ],
    metaTitle: 'Wedding Photographer Portfolio Website Design | Uncoded Hub',
    metaDescription:
      'Wedding photographer portfolio website design engineered for 4K video reel streaming without lag, package tiering, and custom lab framing visualizers in 7 days.',
    keywords: [
      'wedding photographer website design',
      'destination wedding portfolio',
      'cinematographer web design',
      'wedding photography website 7 days',
      'fast photo portfolio website',
    ],
  },

  'home-renovation': {
    key: 'home-renovation',
    projectId: 'home-renovation',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · RENOVATION & MODULAR INTERIORS',
    headline: 'Websites for Renovation Contractors That Eliminate Skepticism.',
    subheadline:
      'Turnkey digital platforms for modular kitchen specialists, full-home renovation contractors, and civil remodelers. Complete material brand transparency, fixed-timeline guarantees, and hyper-local society landing pages.',
    targetAudience: [
      'Full-home renovation & remodeling contractors',
      'Modular kitchen & wardrobe manufacturing studios',
      'Civil refurbishment & bathroom renovation firms',
      'Bespoke architectural woodworking ateliers',
    ],
    stats: [
      { value: '0.8s LCP', label: 'Instant mobile quote engine' },
      { value: '100%', label: 'Brand transparency (Hafele/Blum)' },
      { value: '10-Yr', label: 'Written warranty showcase' },
      { value: '7 Days', label: 'Turnkey website deployment' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Homeowners are terrified of rogue contractors, cost overruns, and endless handover delays.',
        solution: 'Prominent written milestone payment schedules, penalty-backed timeline commitments, and live project trackers.',
        metric: 'Eliminates homeowner fear',
      },
      {
        num: '02',
        problem: 'Unclear material specifications make homeowners suspect low-grade commercial plywood is being substituted.',
        solution: 'Interactive material matrix detailing IS 710 BWP plywood, 1mm virgin laminates, and genuine Blum/Hafele hardware.',
        metric: 'Verifiable material authenticity',
      },
      {
        num: '03',
        problem: 'Before/after galleries on social media look fake or lack context on actual structural challenges solved.',
        solution: 'Interactive before/after dual-slider with itemized civil scope notes, plumbing repairs, and total execution cost.',
        metric: 'Transparent proof of capability',
      },
      {
        num: '04',
        problem: 'Contractors waste days travelling to measure homes outside their geographic execution zone.',
        solution: 'Hyper-local apartment society selector that routes inquiries exclusively within your preferred operational clusters.',
        metric: 'Cuts wasted travel time by 70%',
      },
    ],
    conversionPillars: [
      {
        title: 'Interactive Before/After Renovation Sliders',
        desc: 'Split-screen interactive sliders allowing homeowners to drag across gut-rehab kitchens and bathrooms to view transformed spaces.',
        deliverable: 'High-precision before/after comparison tool',
      },
      {
        title: 'Hardware & Core Material Vault',
        desc: 'Clear visual disclosure of hardware hinges, drawer channels, surface finishes, and termite-proof core materials.',
        deliverable: 'Interactive specification guide',
      },
      {
        title: 'Apartment Society Project Showcase',
        desc: 'Dedicated case study blocks organized by local residential societies demonstrating familiarity with local RWAs.',
        deliverable: 'Hyperlocal residential credibility modules',
      },
    ],
    metaTitle: 'Modular Kitchen Manufacturer Website Design | Uncoded Hub',
    metaDescription:
      'Modular kitchen manufacturer website design with interactive trade fee calculators, factory CNC virtual tours, and sub-second mobile quotation funnels.',
    keywords: [
      'renovation contractor website design',
      'modular kitchen website',
      'home remodeling web platform',
      'renovation business website 7 days',
      'modular interior contractor portfolio',
    ],
  },

  'home-services': {
    key: 'home-services',
    projectId: 'home-services',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · HOME SERVICES & CONTRACTORS',
    headline: 'Websites for Home Service Contractors That Turn Urgent Searches Into Booked Jobs.',
    subheadline:
      'High-speed, hand-coded digital booking platforms for water tank cleaners, swimming pool maintenance, HVAC technicians, and property contractors. Direct WhatsApp booking, upfront price estimators, and verified proof.',
    targetAudience: [
      'Water tank & underground sump cleaning contractors',
      'Swimming pool maintenance & filtration specialists',
      'HVAC, AC repair & deep cleaning technicians',
      'Waterproofing, plumbing & civil maintenance contractors',
    ],
    stats: [
      { value: '0.6s LCP', label: 'Instant emergency mobile load' },
      { value: '1-Tap', label: 'Direct WhatsApp booking engine' },
      { value: '100%', label: 'Upfront rate card transparency' },
      { value: '7 Days', label: 'Turnkey website deployment' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Homeowners and apartment RWAs are wary of unverified, fly-by-night workers who arrive without safety gear or insurance.',
        solution: 'Prominent display of verified technician safety protocols, commercial equipment badging, and client insurance coverage.',
        metric: 'Eliminates contractor mistrust',
      },
      {
        num: '02',
        problem: 'Tired of endless phone tag and vague "I will visit and quote" answers that lead to customer drop-off.',
        solution: 'Interactive service cost calculator with transparent per-litre or square-foot pricing and instant WhatsApp quote delivery.',
        metric: 'Instant price clarity',
      },
      {
        num: '03',
        problem: 'Before/after photos on WhatsApp look blurry and fail to convince luxury villa owners and residential society boards.',
        solution: 'High-resolution before/after interactive cleaning sliders showing real sludge descaling and crystal-clear water results.',
        metric: 'Unmistakable visual proof',
      },
      {
        num: '04',
        problem: 'Contractors waste money driving to low-ticket jobs located across the city.',
        solution: 'Hyperlocal locality cluster filters routing inquiries specifically to your targeted high-density residential corridors.',
        metric: 'Cuts wasted travel by 65%',
      },
    ],
    conversionPillars: [
      {
        title: 'Scientific 6-Stage Process Showcase',
        desc: 'Visual breakdown of high-pressure jet descaling, sludge vacuuming, and food-grade UV/antibacterial sanitization.',
        deliverable: 'Scientific procedure credibility modules',
      },
      {
        title: 'Instant WhatsApp One-Tap Quote',
        desc: 'Smart booking engine capturing tank capacity, location, and preferred slot with zero friction.',
        deliverable: 'High-conversion booking funnel',
      },
      {
        title: 'Apartment Society & Commercial Roster',
        desc: 'Dedicated section detailing past completed residential societies, building trust with facility managers and RWAs.',
        deliverable: 'Hyperlocal commercial proof blocks',
      },
    ],
    metaTitle: 'Home Services Website Design & Emergency Booking Systems | Uncoded Hub',
    metaDescription:
      'Home services website design with 1-tap emergency booking, upfront service rate cards, before/after proof sliders, and sub-second mobile performance.',
    keywords: [
      'home services website design',
      'water tank cleaning website',
      'contractor website design',
      'swimming pool cleaning website',
      'hvac website development',
      'pest control website design',
      'plumber website design',
      'high converting contractor landing page',
    ],
  },

  'coaches-consultants': {
    key: 'coaches-consultants',
    projectId: 'executive-coaching',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · EXECUTIVE ADVISORY & COACHING',
    headline: 'Executive Websites That Pre-Sell Your Retainers Before the Zoom Call.',
    subheadline:
      'High-authority sovereign platforms for executive coaches, management consultants, and boutique advisory founders. Multi-step application funnels, proprietary framework showcases, and zero Calendly spam.',
    targetAudience: [
      'Executive & C-suite leadership coaches',
      'Management & organizational strategy consultants',
      'B2B sales & revenue growth advisors',
      'High-ticket mastermind & cohort leaders',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Instant mobile authority platform' },
      { value: '100%', label: 'Application pre-screening funnel' },
      { value: '0 Spam', label: 'Zero open public Calendly links' },
      { value: '7 Days', label: 'Sprint from copy to live launch' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Sharing open Calendly links attracts unqualified tire-kickers who waste your limited calendar hours.',
        solution: 'Multi-stage application intake funnel that filters applicants by revenue, team size, and immediate readiness.',
        metric: '100% pre-qualified discovery calls',
      },
      {
        num: '02',
        problem: 'Looking like a generic "life coach" destroys your ability to command 5-figure executive advisory retainers.',
        solution: 'Swiss editorial typography, proprietary diagnostic frameworks, and published client ROI case studies.',
        metric: 'Instant C-suite credibility',
      },
      {
        num: '03',
        problem: 'Reliance on rented platforms (Substack, LinkedIn) leaves your client pipeline vulnerable to algorithm bans.',
        solution: 'Sovereign web flagship with native newsletter capture, client alumni vaults, and full data ownership.',
        metric: '100% platform independence',
      },
      {
        num: '04',
        problem: 'Prospects hesitate because they cannot visualize what working with you actually looks like week-to-week.',
        solution: 'Clear 90-day engagement roadmap illustrating milestone check-ins, executive 360 reviews, and ROI benchmarks.',
        metric: 'Demystifies high-ticket advisory',
      },
    ],
    conversionPillars: [
      {
        title: 'High-Ticket Application Funnel',
        desc: 'Structured questionnaire replacing generic contact forms, qualifying prospective clients on budget and urgency before booking.',
        deliverable: 'Custom multi-step client qualification engine',
      },
      {
        title: 'Proprietary Methodology Blueprint',
        desc: 'Interactive visual breakdown of your advisory framework, proving systematic results rather than ad-hoc advice.',
        deliverable: 'Visual advisory methodology diagram',
      },
      {
        title: 'Executive Case Study Proof',
        desc: 'Documented client outcomes highlighting revenue expansion, leadership retention, and strategic clarity with CEO testimonials.',
        deliverable: 'Proof-driven client case study library',
      },
    ],
    metaTitle: 'Executive Coaching Website Design Sprint | 7 Days | Uncoded Hub',
    metaDescription:
      'Executive coaching website design sprint engineered for C-suite authority. Application funnels, quantified ROI proof, and zero developer babysitting.',
    keywords: [
      'executive coach website design',
      'consultant portfolio website',
      'high ticket coaching web platform',
      'consulting website 7 days',
      'advisory firm website development',
    ],
  },

  'educational-academy': {
    key: 'educational-academy',
    projectId: 'educational-academy',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · EDUCATIONAL ACADEMIES',
    headline: 'Academy Websites That Turn Anxious Parents Into Confirmed Admissions.',
    subheadline:
      'Modern, lightning-fast digital campus hubs for competitive coaching institutes, language schools, and professional academies. Real-time batch capacity, faculty credential vaults, and verified student rank lists.',
    targetAudience: [
      'Competitive exam coaching institutes (IIT-JEE, NEET, UPSC)',
      'Language learning & IELTS preparation academies',
      'Executive skill-building & tech bootcamps',
      'Private tutoring & academic enrichment centres',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Loads instantly on budget smartphones' },
      { value: '100%', label: 'Verified roll-number student rank lists' },
      { value: '1-Tap', label: 'Demo lecture seat reservation' },
      { value: '7 Days', label: 'Live academy deployment' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Cluttered PDF brochures lose 75% of prospective parents who view on mobile phones.',
        solution: 'Interactive mobile syllabus browser with exam milestone breakdowns and printable course modules.',
        metric: 'Zero PDF friction on mobile',
      },
      {
        num: '02',
        problem: 'Parents suspect student ranks and testimonials are fabricated or purchased from other institutes.',
        solution: 'Verified ranker wall with exam roll numbers, video interviews, and authenticated scorecards.',
        metric: 'Total parental trust',
      },
      {
        num: '03',
        problem: 'Students drop out before attending because signing up for a demo class requires filling long paper forms.',
        solution: 'Instant 1-tap WhatsApp demo seat reservation that delivers classroom directions and lecture reminder alerts.',
        metric: '40% increase in demo attendance',
      },
      {
        num: '04',
        problem: 'Heavy legacy websites crash during board results and admission season traffic surges.',
        solution: 'Serverless static React architecture served on edge nodes, capable of handling 50,000 concurrent visitors.',
        metric: 'Zero crashes during admission rush',
      },
    ],
    conversionPillars: [
      {
        title: 'Interactive Batch & Fee Navigator',
        desc: 'Clear breakdown of batch schedules, student-to-mentor ratios, scholarship discount slabs, and installment plans.',
        deliverable: 'Interactive admission fee matrix',
      },
      {
        title: 'Verified Ranker & Results Vault',
        desc: 'Searchable repository of past student ranks, university selections, and verified entrance scorecards.',
        deliverable: 'Audited student success directory',
      },
      {
        title: '1-Tap Demo Lecture Pass',
        desc: 'Friction-free intake form sending automated WhatsApp classroom passes with Google Maps directions.',
        deliverable: 'Instant demo reservation funnel',
      },
    ],
    metaTitle: 'Coaching Institute Website Design | Zero Crash | Uncoded Hub',
    metaDescription:
      'Coaching institute website design with zero-crash admission servers, batch countdown funnels, and student ranker showcases built in 7 working days.',
    keywords: [
      'educational institute website design',
      'coaching academy web platform',
      'admissions website for school',
      'coaching institute web design 7 days',
      'fast academy website',
    ],
  },

  'gym-fitness-club': {
    key: 'gym-fitness-club',
    projectId: 'gym-fitness-club',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · COMMERCIAL GYMS & CLUBS',
    headline: 'Gym Websites That Fill Your Floor Without Discounting Memberships.',
    subheadline:
      'High-intensity athletic digital engines for strength clubs, CrossFit boxes, and commercial gyms. Real-time peak-hour capacity HUDs, Eleiko equipment tours, and instant 1-day VIP pass activators.',
    targetAudience: [
      'Commercial strength gyms & athletic facilities',
      'CrossFit boxes & functional fitness spaces',
      'Boutique boxing & combat sports clubs',
      '24/7 fitness franchise operators',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Instant mobile member portal' },
      { value: 'Live HUD', label: 'Peak-hour floor capacity tracking' },
      { value: '1-Day', label: 'Instant VIP trial pass activator' },
      { value: '7 Days', label: 'Turnkey club deployment' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Overcrowded peak hours frustrate existing members and deter serious high-paying athletes.',
        solution: 'Live floor capacity indicator displaying low, medium, and peak training hours in real-time.',
        metric: 'Transparent floor crowd control',
      },
      {
        num: '02',
        problem: '"Call for membership pricing" irritates prospects and causes 80% to bounce immediately.',
        solution: 'Upfront transparent tier matrix detailing annual, quarterly, and personal coaching packages.',
        metric: 'Cuts price bounce rates by 65%',
      },
      {
        num: '03',
        problem: 'Generic stock photos fail to prove you have Olympic barbells, calibrated plates, and premium turf.',
        solution: 'Itemized equipment directory showcasing Eleiko bars, Rogue rigs, and Hammer Strength machinery.',
        metric: 'Attracts dedicated lifting athletes',
      },
      {
        num: '04',
        problem: 'Forcing walk-ins to download a bloated app just to tour the facility destroys walk-in conversions.',
        solution: 'Browser-native 1-tap VIP pass activator stored directly in Apple Wallet or delivered via SMS.',
        metric: 'Zero-app friction trial passes',
      },
    ],
    conversionPillars: [
      {
        title: '1-Day VIP Trial Pass Generator',
        desc: 'Instant lead magnet capturing name and fitness goal, generating a digital barcode pass for front-desk check-in.',
        deliverable: 'Automated trial pass activation system',
      },
      {
        title: 'Floor Spec & Barbell Inventory',
        desc: 'Detailed breakdown of equipment brands, lifting platforms, dumbbell racks, and functional turf tracks.',
        deliverable: 'Interactive gym equipment tour',
      },
      {
        title: 'Transparent Membership Tiers',
        desc: 'No hidden locker or registration charges—clear annual, student, and couple tier cards with instant sign-up links.',
        deliverable: 'Membership pricing comparison table',
      },
    ],
    metaTitle: 'Commercial Gym Website Design | Membership Booking | Uncoded Hub',
    metaDescription:
      'Commercial gym website design engineered with virtual facility tours, membership booking engines, and frictionless day-pass trials in 7 days.',
    keywords: [
      'gym website design',
      'fitness club web platform',
      'crossfit box website',
      'gym web design 7 days',
      'fast fitness website with trial pass',
    ],
  },

  'business-portfolio': {
    key: 'business-portfolio',
    projectId: 'business-portfolio',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · B2B ADVISORY & CONSULTING',
    headline: 'Corporate Advisory Websites That Command C-Suite Respect.',
    subheadline:
      'Institutional digital flagships for mid-market M&A advisors, corporate finance boutiques, and enterprise management firms. Deal transaction tombstones, NDA covenants, and 6-pillar business diagnostic scorecards.',
    targetAudience: [
      'Mid-market M&A and investment banking boutiques',
      'Corporate restructuring & turnaround advisors',
      'B2B management consulting partnerships',
      'Enterprise risk & regulatory advisory firms',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Institutional speed & stability' },
      { value: '6-Pillar', label: 'Interactive C-suite diagnostic' },
      { value: '100%', label: 'Confidential deal history tombstones' },
      { value: '7 Days', label: 'Fixed delivery guarantee' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Flashy startup templates destroy credibility when pitching conservative boardrooms and PE investors.',
        solution: 'Understated Swiss typography, refined navy palettes, and formal transactional tombstone layouts.',
        metric: 'Institutional gravitas',
      },
      {
        num: '02',
        problem: 'Client confidentiality agreements prevent naming deal parties, making case studies look vague.',
        solution: 'Anonymized transaction tombstones detailing EBITDA multiples, deal structure, and enterprise value generated.',
        metric: 'Verifiable transaction track record',
      },
      {
        num: '03',
        problem: 'C-Suite buyers have zero time for generic marketing fluff and demand immediate diagnostic clarity.',
        solution: 'Interactive 6-pillar enterprise diagnostic scorecard that delivers immediate situational insight.',
        metric: 'High-value board lead capture',
      },
      {
        num: '04',
        problem: 'Corporate websites fail standard enterprise accessibility (WCAG) and security compliance audits.',
        solution: '100% semantic HTML, zero tracking cookies, strict CSP headers, and verified WCAG AA compliance.',
        metric: 'Passes corporate compliance audits',
      },
    ],
    conversionPillars: [
      {
        title: 'Deal Transaction Tombstone Vault',
        desc: 'Structured transaction cards displaying deal size, sector, role (Sell-Side/Buy-Side/Debt), and closing year.',
        deliverable: 'Audited corporate transaction tombstone library',
      },
      {
        title: 'C-Suite Diagnostic Scorecard',
        desc: '6-question interactive diagnostic evaluating operational margin, governance posture, and market readiness.',
        deliverable: 'Interactive enterprise audit tool',
      },
      {
        title: 'Partner Roster & Credentials',
        desc: 'Senior leadership profiles highlighting past bulge-bracket experience, board seats, and sector publications.',
        deliverable: 'Senior leadership credibility module',
      },
    ],
    metaTitle: 'Hand Coded Website Design Agency for B2B | Uncoded Hub',
    metaDescription:
      'Hand coded website design agency for enterprise B2B and corporate advisory. Swiss typography, partner credentials, and RFP intake funnels in 7 days.',
    keywords: [
      'corporate advisory website design',
      'management consulting web platform',
      'b2b consulting website',
      'm&a firm website design 7 days',
      'institutional business website',
    ],
  },

  'spa-wellness': {
    key: 'spa-wellness',
    projectId: 'spa-wellness',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · LUXURY SPA & WELLNESS',
    headline: 'Spa Websites That Induce Calm and Fill Treatment Rooms.',
    subheadline:
      'Sensory digital sanctuaries for luxury Ayurvedic retreats, holistic spas, and day bathhouses. Interactive tension-zone ritual builders, private couple suite previews, and upfront treatment menu clarity.',
    targetAudience: [
      'Luxury Ayurvedic & holistic wellness retreats',
      'Five-star urban day spas & thermal bathhouses',
      'Meditation & restorative sound healing centres',
      'Boutique floatation & hydrotherapy sanctuaries',
    ],
    stats: [
      { value: '0.8s LCP', label: 'Silky smooth mobile loading' },
      { value: '100%', label: 'Herbal ingredient transparency' },
      { value: '24/7', label: 'Seamless ritual reservation' },
      { value: '7 Days', label: 'Sanctuary website delivery' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Sterile or clunky websites destroy the sense of sensory luxury before the guest ever visits.',
        solution: 'Warm earthy palettes, fluid micro-interactions, and ambient typography that evokes immediate relaxation.',
        metric: 'Instant sensory immersion',
      },
      {
        num: '02',
        problem: 'Guests feel overwhelmed by exotic Sanskrit or foreign treatment names and abandon the booking.',
        solution: 'Interactive tension-zone selector that matches body stiffness, stress levels, or sleep debt to the ideal ritual.',
        metric: 'Guides guests to the right treatment',
      },
      {
        num: '03',
        problem: 'Vague pricing and hidden taxes cause guests to suspect bait-and-switch billing.',
        solution: 'Completely transparent treatment menu with exact duration, included herbal oils, and all-inclusive pricing.',
        metric: 'Eliminates billing hesitation',
      },
      {
        num: '04',
        problem: 'Guests wishing to book late at night cannot reach front-desk reception, losing evening reservations.',
        solution: '24/7 automated appointment reservation system with instant confirmation and therapist preferences.',
        metric: 'Recovers 45% of night-time bookings',
      },
    ],
    conversionPillars: [
      {
        title: 'Tension-Zone Ritual Builder',
        desc: 'Interactive body map allowing guests to tap neck, lower back, or mental exhaustion to reveal curated therapies.',
        deliverable: 'Interactive wellness diagnostic selector',
      },
      {
        title: 'Sanctuary Suite Previews',
        desc: 'High-definition 360-degree photography of couples suites, private steam showers, and stone soaking tubs.',
        deliverable: 'Virtual retreat suite inspection gallery',
      },
      {
        title: 'Transparent Ritual Menu',
        desc: 'Itemized duration, herbal infusion details, contraindications, and transparent pricing for every spa therapy.',
        deliverable: 'Comprehensive luxury spa treatment menu',
      },
    ],
    metaTitle: 'Luxury Wellness Retreat Website Design | Calm UX | Uncoded Hub',
    metaDescription:
      'Luxury wellness retreat website design with tranquil aesthetic, appointment deposit workflows, and signature package showcases built in 7 days.',
    keywords: [
      'spa website design',
      'luxury wellness retreat website',
      'ayurvedic spa web platform',
      'spa web design 7 days',
      'fast spa booking website',
    ],
  },

  'salon-beauty': {
    key: 'salon-beauty',
    projectId: 'salon-beauty',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · SALONS & BRIDAL BEAUTY',
    headline: 'Salon Websites That Turn Instagram Views Into Paid Chairs.',
    subheadline:
      'High-fashion digital ateliers for Balayage artists, luxury hair salons, and bridal makeup studios. Unretouched skin-texture sliders, interactive bridal quote estimators, and 1-tap WhatsApp slot booking.',
    targetAudience: [
      'High-end Balayage & colour specialist salons',
      'Bridal makeup artists & aesthetic lounges',
      'Keratin & hair restoration ateliers',
      'Boutique nail & lash cosmetic studios',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Instant high-res hair gallery' },
      { value: '100%', label: 'Raw skin texture honesty' },
      { value: '1-Tap', label: 'Direct WhatsApp booking flow' },
      { value: '7 Days', label: 'From concept to live site' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Heavy Instagram filters cause brides to expect unrealistic skin texture, leading to wedding day disputes.',
        solution: 'Raw, unretouched 4K bridal portrait sliders demonstrating genuine skin finish under natural sunlight.',
        metric: 'Sets honest bridal expectations',
      },
      {
        num: '02',
        problem: 'Clients fear chemical hair bleach damage from inexperienced salon staff.',
        solution: 'Detailed science breakdown of K18 molecular repair, Olaplex bonding, and ammonia-free colour formulations.',
        metric: 'Overcomes hair damage anxiety',
      },
      {
        num: '03',
        problem: 'Brides waste days messaging back-and-forth about bridesmaid makeup charges and early-morning fees.',
        solution: 'Interactive bridal package calculator generating instant itemized estimates including drape and hairstyling.',
        metric: 'Instant bridal package transparency',
      },
      {
        num: '04',
        problem: 'Salon chairs sit empty during mid-week morning slots due to lack of local search dominance.',
        solution: 'Hyper-local salon SEO targeting "best balayage near me" and direct 1-tap WhatsApp chair reservation.',
        metric: 'Fills off-peak salon chairs',
      },
    ],
    conversionPillars: [
      {
        title: 'Interactive Bridal Package Estimator',
        desc: 'Customizer allowing brides to select reception look, sangeet makeup, bridesmaid add-ons, and destination travel fees.',
        deliverable: 'Real-time bridal quote calculator',
      },
      {
        title: 'Hair Colour Science & Transformation Slider',
        desc: 'Before/after sliders showing transitions from box dye to creamy dimensional blonde without breakage.',
        deliverable: 'Interactive colour correction case studies',
      },
      {
        title: 'Stylist Roster & Specialties',
        desc: 'Senior stylist bios detailing cutting certifications, brand masterclasses, and portfolio lookbooks.',
        deliverable: 'Individual stylist credibility profiles',
      },
    ],
    metaTitle: 'Bridal Beauty Salon Website Design | Bookings | Uncoded Hub',
    metaDescription:
      'Bridal beauty salon website design engineered with portfolio lookbooks, bridal package consultation calendars, and instant WhatsApp booking in 7 days.',
    keywords: [
      'salon website design',
      'bridal makeup artist website',
      'hair salon web platform',
      'beauty salon website 7 days',
      'fast hair salon booking website',
    ],
  },

  'fitness-coach': {
    key: 'fitness-coach',
    projectId: 'fitness-coach',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · PRIVATE FITNESS COACHING',
    headline: 'Coaching Websites That Fill Your 20-Client Roster at High Tickets.',
    subheadline:
      'Elite digital platforms for biomechanical personal trainers and online transformation coaches. DEXA-verified progress logs, intake readiness audits, and capped-roster waitlist funnels.',
    targetAudience: [
      'Executive private personal trainers',
      'Online body recomposition specialists',
      'Strength & sports performance coaches',
      'Corrective exercise & posture kinesiologists',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Lightning-fast mobile coaching site' },
      { value: '20 Clients', label: 'Capped roster exclusivity model' },
      { value: 'DEXA', label: 'Verified fat-loss & muscle gain proof' },
      { value: '7 Days', label: 'Turnkey personal coach launch' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Treated as a commoditized gym trainer competing on cheap hourly rates.',
        solution: 'Executive positioning emphasizing biomechanical movement screening, bloodwork analysis, and lifestyle ergonomics.',
        metric: 'Commands 3x higher monthly retainer',
      },
      {
        num: '02',
        problem: 'Prospects suspect online transformation photos are fake or achieved via unhealthy crash diets.',
        solution: 'DEXA-verified body composition reports showing genuine visceral fat loss and lean tissue gains over 16 weeks.',
        metric: 'Ironclad scientific proof',
      },
      {
        num: '03',
        problem: 'Flooded DMs from tire-kickers asking for free diet charts and generic workout splits.',
        solution: 'Intake readiness audit filtering for budget, gym access, and genuine psychological commitment.',
        metric: 'Only speak to committed clients',
      },
      {
        num: '04',
        problem: 'Taking on too many low-paying clients leads to coaching burnout and degraded client results.',
        solution: 'Capped 20-client roster framework creating natural urgency and a lucrative waitlist system.',
        metric: 'Sustainable high-ticket coaching practice',
      },
    ],
    conversionPillars: [
      {
        title: 'Intake Readiness Screener',
        desc: 'Interactive 4-step assessment evaluating training age, medical history, and weekly accountability commitment.',
        deliverable: 'High-ticket client qualification quiz',
      },
      {
        title: 'DEXA-Verified Transformation Vault',
        desc: 'Documented client journeys pairing front/back progress photos with real medical body scan data and nutrition logs.',
        deliverable: 'Scientific transformation proof gallery',
      },
      {
        title: 'Coaching Architecture Roadmap',
        desc: 'Visual blueprint showing what happens across Month 1 (Mobility), Month 2 (Hypertrophy), and Month 3 (Metabolic Conditioning).',
        deliverable: '12-week transformation methodology breakdown',
      },
    ],
    metaTitle: 'Private Fitness Coach Website Design | High Ticket | Uncoded Hub',
    metaDescription:
      'Private fitness coach website design engineered for high-ticket 1-on-1 client acquisition, application intake, and transformation proof in 7 days.',
    keywords: [
      'fitness coach website design',
      'personal trainer website',
      'online fitness coach web platform',
      'fitness coaching website 7 days',
      'fast personal trainer portfolio',
    ],
  },

  'yoga-meditation': {
    key: 'yoga-meditation',
    projectId: 'yoga-meditation',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · YOGA SHALAS & MINDFULNESS',
    headline: 'Yoga Websites That Honour Lineage and Pack Daily Mats.',
    subheadline:
      'Soulful digital sanctuaries for traditional Hatha, Ashtanga, and breathwork shalas. Real-time class capacity filters, 200hr/300hr teacher training curriculum explorers, and 1-tap trial mat reservations.',
    targetAudience: [
      'Traditional Hatha & Ashtanga yoga shalas',
      'Sound bath & breathwork meditation sanctuaries',
      'Yoga alliance certified teacher training schools',
      'Boutique restorative & aerial yoga studios',
    ],
    stats: [
      { value: '0.8s LCP', label: 'Serene, zero-lag timetable loading' },
      { value: 'RYS-300', label: 'Yoga Alliance curriculum proof' },
      { value: '1-Tap', label: 'Friction-free trial mat booking' },
      { value: '7 Days', label: 'Shala website deployment' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Generic gym-style fitness templates feel commercialized and alienate traditional yoga practitioners.',
        solution: 'Vedic-inspired earth palettes, clean Sanskrit terminology, and respectful lineage documentation.',
        metric: 'Authentic spiritual atmosphere',
      },
      {
        num: '02',
        problem: 'Beginners feel intimidated by advanced inversions and leave without trying a class.',
        solution: 'Clear visual intensity scale (Gentle, Moderate, Dynamic) for every class on the schedule.',
        metric: 'Demystifies yoga for beginners',
      },
      {
        num: '03',
        problem: 'Students looking to enroll in 200hr/300hr Teacher Training Courses (TTC) drop out due to vague curriculum outlines.',
        solution: 'Detailed weekly breakdown of anatomy, philosophy, alignment, and teaching practicum with Yoga Alliance credentials.',
        metric: 'Fills high-ticket teacher training batches',
      },
      {
        num: '04',
        problem: 'Forcing newcomers to download a third-party app just to book a trial mat causes high drop-offs.',
        solution: 'Browser-native 1-tap mat reservation with instant confirmation and Google Calendar sync.',
        metric: '50% higher trial class bookings',
      },
    ],
    conversionPillars: [
      {
        title: 'Interactive Shala Schedule Filter',
        desc: 'Filter daily classes by time of day, intensity level, and teacher lineage with real-time open mat counters.',
        deliverable: 'Dynamic yoga class timetable engine',
      },
      {
        title: '200hr/300hr TTC Curriculum Explorer',
        desc: 'Interactive syllabus covering pranayama, functional anatomy, hands-on adjustments, and teaching ethics.',
        deliverable: 'Teacher training accreditation portal',
      },
      {
        title: 'First-Mat Welcome Protocol',
        desc: 'Guidance on what to wear, arriving 10 minutes early, shala etiquette, and loaner yoga mats.',
        deliverable: 'New student orientation guide',
      },
    ],
    metaTitle: 'Yoga Studio Website Design with Class Schedule | Uncoded Hub',
    metaDescription:
      'Yoga studio website design with live class schedules, teacher lineage bios, drop-in pass booking, and calming aesthetic built in 7 working days.',
    keywords: [
      'yoga studio website design',
      'yoga shala web platform',
      'meditation retreat website',
      'yoga teacher training website 7 days',
      'fast yoga timetable website',
    ],
  },

  'creative-portfolio': {
    key: 'creative-portfolio',
    projectId: 'creative-portfolio',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · DESIGN STUDIOS & AGENCIES',
    headline: 'Creative Agency Websites That Win High-Ticket Client Briefs.',
    subheadline:
      'Award-calibre digital portfolios for brand engineering studios, digital agencies, and independent creative directors. 100% Lighthouse performance, interactive sprint scope estimators, and deep commercial case study breakdowns.',
    targetAudience: [
      'Independent brand identity & graphic design studios',
      'UI/UX design agencies & product design boutiques',
      'Creative direction & interactive digital firms',
      'Motion graphics & 3D visualization studios',
    ],
    stats: [
      { value: '0.8s LCP', label: 'Instant award-calibre showcase' },
      { value: '100/100', label: 'Perfect Google Lighthouse score' },
      { value: '2-Week', label: 'Productized sprint scope estimator' },
      { value: '7 Days', label: 'From design freeze to live URL' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Over-engineered WebGL sites that take 12 seconds to load on client laptops and overheat batteries.',
        solution: 'Hardware-accelerated CSS micro-animations and zero-bloat semantic markup achieving a perfect 100 Lighthouse score.',
        metric: 'Silky smooth 60fps performance',
      },
      {
        num: '02',
        problem: 'Portfolios only show mockups without explaining business impact, losing serious enterprise CMOs.',
        solution: 'Problem-to-outcome case study structure showing revenue growth, conversion deltas, and brand equity created.',
        metric: 'Attracts commercial enterprise briefs',
      },
      {
        num: '03',
        problem: 'Clients with shoestring budgets waste weeks of your senior leadership team’s pitch time.',
        solution: 'Interactive sprint scope estimator that sets an upfront minimum engagement budget threshold.',
        metric: 'Eliminates low-budget RFP time sinks',
      },
      {
        num: '04',
        problem: 'Agencies get trapped in endless custom scope creep on hourly billing models.',
        solution: 'Productized 2-week and 4-week sprint packages with fixed deliverables and upfront milestone billing.',
        metric: 'Predictable high-margin agency revenue',
      },
    ],
    conversionPillars: [
      {
        title: 'Commercial Impact Case Studies',
        desc: 'Deep-dive client retrospectives highlighting strategic problem, typographic execution, and commercial results.',
        deliverable: 'Award-standard project showcase template',
      },
      {
        title: 'Brand Sprint Scope Estimator',
        desc: 'Interactive selector for visual identity, web architecture, and design systems, establishing clear budget parameters.',
        deliverable: 'Pre-pitch agency scope calculator',
      },
      {
        title: 'Team & Studio Philosophy',
        desc: 'Behind-the-scenes insights into your design process, software stack, and transparent studio culture.',
        deliverable: 'Studio manifesto & client onboarding guide',
      },
    ],
    metaTitle: 'Boutique Design Studio Portfolio Website Design | Uncoded Hub',
    metaDescription:
      'Boutique design studio portfolio website design with dark-mode editorial typography, interactive client case studies, and sub-second speed in 7 days.',
    keywords: [
      'creative agency website design',
      'design studio portfolio',
      'brand agency web platform',
      'creative portfolio website 7 days',
      'fast agency portfolio design',
    ],
  },

  'healthcare-diagnostics': {
    key: 'healthcare-diagnostics',
    projectId: 'healthcare-diagnostics',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · PATHOLOGY & DIAGNOSTIC LABS',
    headline: 'Diagnostic Lab Websites That Build Absolute Patient Confidence.',
    subheadline:
      'Medical-grade digital platforms for NABL & CAP accredited pathology centres, imaging facilities, and clinical labs. Barcode-tracked sample chains, 6-hour digital report turnarounds, and home phlebotomy booking engines.',
    targetAudience: [
      'NABL / CAP accredited pathology laboratories',
      'Medical imaging & radiology scan centres',
      'Specialized genetic & molecular diagnostic labs',
      'Home blood collection & preventive health networks',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Instant mobile medical portal' },
      { value: '6 Hours', label: 'Guaranteed digital report turnaround' },
      { value: '1-Tap', label: 'Home phlebotomy visit booking' },
      { value: '7 Days', label: 'Turnkey laboratory deployment' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Patients fear sample mix-ups and inaccurate test results from low-cost unregulated labs.',
        solution: 'Transparent barcode-tracked sample chain of custody and fully automated analyzer equipment showcases.',
        metric: 'NABL clinical-grade trust',
      },
      {
        num: '02',
        problem: 'Delayed paper reports create intense anxiety for patients awaiting urgent doctor consultations.',
        solution: 'Guaranteed 6-hour digital PDF report delivery commitment delivered via SMS and encrypted WhatsApp.',
        metric: 'Rapid digital report delivery',
      },
      {
        num: '03',
        problem: 'Patients arrive unprepared (not fasting or taking medications), resulting in canceled test runs.',
        solution: 'Smart preparation instructions automatically displayed for every selected pathology panel.',
        metric: 'Zero sample collection errors',
      },
      {
        num: '04',
        problem: 'Elderly or bedridden patients struggle to visit physical collection centres.',
        solution: '1-tap home phlebotomist visit booking with address pinpointing and technician identity verification.',
        metric: 'Expands home collection volume by 80%',
      },
    ],
    conversionPillars: [
      {
        title: 'Home Phlebotomy Package Selector',
        desc: 'Interactive selector for comprehensive full-body checkups, cardiac risk profiles, and diabetic monitoring panels.',
        deliverable: 'Home blood test reservation engine',
      },
      {
        title: 'Automated Sample Chain Simulator',
        desc: 'Visual flowchart explaining barcoded vacutainer tubes, cold-chain transport, and automated Roche/Abbott analyzers.',
        deliverable: 'Quality assurance protocol showcase',
      },
      {
        title: 'Doctor Portal & Fast PDF Downloads',
        desc: 'Secure portal for referring physicians to access historical patient trends and download signed lab reports.',
        deliverable: 'Encrypted patient report lookup portal',
      },
    ],
    metaTitle: 'Diagnostic Lab Website Design with Home Collection | Uncoded Hub',
    metaDescription:
      'Diagnostic lab website design with home blood sample collection booking, NABL accreditation badges, and instant test report downloads in 7 days.',
    keywords: [
      'diagnostic lab website design',
      'pathology lab web platform',
      'blood test booking website',
      'diagnostic center web design 7 days',
      'fast pathology website with report portal',
    ],
  },

  'clinic-polyclinic': {
    key: 'clinic-polyclinic',
    projectId: 'clinic-polyclinic',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · MULTI-SPECIALTY POLYCLINICS',
    headline: 'Polyclinic Websites That Eliminate Crowded Waiting Rooms.',
    subheadline:
      'High-throughput digital hubs for multi-specialty clinics, day-care surgical centres, and outpatient polyclinics. Real-time OPD doctor schedules, department filters, and guaranteed zero-wait appointment engines.',
    targetAudience: [
      'Multi-specialty outpatient polyclinics',
      'Day-care surgical & endoscopy centres',
      'Paediatric & women’s health clinics',
      'Physiotherapy & rehabilitation institutes',
    ],
    stats: [
      { value: '0.8s LCP', label: 'Instant doctor roster loading' },
      { value: '6 Depts', label: 'Unified outpatient navigation' },
      { value: '0 Wait', label: 'Timed appointment booking system' },
      { value: '7 Days', label: 'Turnkey polyclinic launch' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Chaotic waiting rooms and 2-hour delays lead to furious patients and bad Google reviews.',
        solution: 'Live doctor schedule filter with confirmed 15-minute time slots, eliminating clinic congestion.',
        metric: 'Eliminates waiting room chaos',
      },
      {
        num: '02',
        problem: 'Patients with overlapping symptoms do not know which specialist department to book.',
        solution: 'Interactive symptom-to-specialist guide directing patients to internal medicine, orthopaedics, or cardiology.',
        metric: 'Accurate doctor routing',
      },
      {
        num: '03',
        problem: 'Patients assume polyclinics lack emergency or pharmacy facilities and travel to big hospitals instead.',
        solution: 'Comprehensive overview showcasing in-house digital pharmacy, minor OT, and diagnostic ECG/X-ray.',
        metric: 'Establishes full-service capability',
      },
      {
        num: '04',
        problem: 'Patients doubt visiting doctors’ qualifications and cancel consultations.',
        solution: 'Detailed physician profile cards displaying MBBS/MD qualifications, hospital attachments, and clinical experience.',
        metric: 'Physician credibility verification',
      },
    ],
    conversionPillars: [
      {
        title: 'Live OPD Doctor Schedule Filter',
        desc: 'Interactive department filter displaying consulting days, available time slots, and consultation fees per physician.',
        deliverable: 'Real-time OPD doctor roster engine',
      },
      {
        title: 'Symptom-to-Specialist Guide',
        desc: 'Simple triage tool helping patients match headaches, joint pain, or stomach discomfort to the correct specialist.',
        deliverable: 'Patient self-triage navigation tool',
      },
      {
        title: 'Integrated Care Overview',
        desc: 'Visual walkthrough of outpatient consultation, on-site diagnostics, digital pharmacy, and day-care observation beds.',
        deliverable: 'Full-service facility walkthrough',
      },
    ],
    metaTitle: 'Multispecialty Clinic Website Development | Uncoded Hub',
    metaDescription:
      'Multispecialty clinic website development engineered with department symptom triage, multi-doctor OPD matrices, and 1-tap booking in 7 days.',
    keywords: [
      'polyclinic website design',
      'multi specialty clinic web platform',
      'doctor appointment website',
      'clinic website design 7 days',
      'fast outpatient clinic web platform',
    ],
  },

  'doctor-specialist': {
    key: 'doctor-specialist',
    projectId: 'doctor-specialist',
    heroBadge: '⚡ 7-DAY BESPOKE PRODUCTION SPRINT · SUPER-SPECIALIST PRACTICES',
    headline: 'Surgical & Specialist Websites That Command Highest Referral Authority.',
    subheadline:
      'Prestige digital chambers for super-specialist surgeons, interventional cardiologists, and robotic joint replacement experts. Pre-consultation symptom screeners, transparent hospital fee guides, and cashless TPA insurance desks.',
    targetAudience: [
      'Robotic joint replacement & orthopaedic surgeons',
      'Interventional cardiologists & vascular specialists',
      'Neurosurgeons & spine care consultants',
      'Bariatric & advanced laparoscopic surgeons',
    ],
    stats: [
      { value: '0.7s LCP', label: 'Loads instantly on mobile' },
      { value: '100%', label: 'Cashless TPA insurance guidance' },
      { value: 'Pre-Screen', label: 'Mobility symptom triage funnel' },
      { value: '7 Days', label: 'Doctor chamber website deployment' },
    ],
    problems: [
      {
        num: '01',
        problem: 'Super-specialist doctors are buried under general hospital listings, losing personal brand authority.',
        solution: 'Independent high-prestige digital chamber highlighting fellowship credentials, robotic techniques, and publications.',
        metric: 'Sovereign specialist authority',
      },
      {
        num: '02',
        problem: 'Patients are terrified of surgery, hospital stays, and painful rehabilitation periods.',
        solution: 'Clear step-by-step minimally invasive procedural guides explaining same-day walking and robotic precision.',
        metric: 'Overcomes surgical dread',
      },
      {
        num: '03',
        problem: 'Unclear surgical package costs and health insurance tie-ups cause patients to seek second opinions.',
        solution: 'Transparent surgical cost guide with dedicated cashless insurance desk assistance across major TPAs.',
        metric: 'Smooth cashless hospital admission',
      },
      {
        num: '04',
        problem: 'Doctor’s limited consultation time is wasted taking basic medical history from scratch.',
        solution: 'Pre-consultation symptom screener that organizes patient pain points and imaging history before they enter the room.',
        metric: 'Maximizes high-value clinical consultation',
      },
    ],
    conversionPillars: [
      {
        title: 'Symptom & Joint Mobility Screener',
        desc: 'Interactive 3-minute self-test allowing patients to specify pain severity, range of motion limits, and past X-rays.',
        deliverable: 'Pre-consultation clinical intake triage',
      },
      {
        title: 'Cashless Insurance & Hospital Package Desk',
        desc: 'Clear disclosure of empanelled hospital partners, TPA claim pre-authorizations, and surgery package estimates.',
        deliverable: 'Transparent surgical cost & TPA guide',
      },
      {
        title: 'Academic Fellowship & Surgical Heritage',
        desc: 'Curated dossier of international surgical fellowships, robotic certifications, live surgery demos, and peer-reviewed papers.',
        deliverable: 'Surgical authority & academic credentials vault',
      },
    ],
    metaTitle: 'Specialist Surgeon Private Practice Website Design | Uncoded Hub',
    metaDescription:
      'Specialist surgeon private practice website design with medical schema, surgical CV credentials, second-opinion intake, and ethical proof in 7 days.',
    keywords: [
      'doctor website design',
      'surgeon portfolio website',
      'specialist doctor web platform',
      'medical practice website 7 days',
      'orthopaedic surgeon website design',
    ],
  },

  'restaurants': {
  "key": "restaurants",
  "projectId": "restaurant",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · RESTAURANT & HOSPITALITY",
  "headline": "Websites for Fine Dining & Craft Restaurants That Fill Tables Without 30% Commissions.",
  "subheadline": "Bespoke, sub-second digital flagships engineered for independent restaurants, cafes, and hospitality venues. Fast HTML mobile menus, zero-commission direct table reservations, and zero PDF download lag.",
  "targetAudience": [
    "Chef-driven fine dining restaurants and tasting rooms",
    "Artisanal craft cafes and specialty roasteries",
    "High-volume urban gastro-pubs and craft cocktail lounges",
    "Multi-location restaurant groups eliminating third-party commissions"
  ],
  "stats": [
    {
      "value": "0.4s LCP",
      "label": "Mobile menu open time"
    },
    {
      "value": "0% Fees",
      "label": "Third-party delivery commission saved"
    },
    {
      "value": "7 Days",
      "label": "Kickoff to live production deployment"
    },
    {
      "value": "100%",
      "label": "Direct guest data & reservation ownership"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Clunky 15MB PDF food menus take 12 seconds to load on mobile, losing hungry diners to competitors.",
      "solution": "Ultra-fast, semantic HTML/WebP responsive food menus with real-time dietary filters that render in 400ms.",
      "metric": "Zero-lag mobile browsing on 4G"
    },
    {
      "num": "02",
      "problem": "Surrendering 25%–35% margins to third-party delivery apps and losing customer contact data.",
      "solution": "Direct table reservation and takeaway pre-order system routing straight to kitchen WhatsApp and POS.",
      "metric": "100% gross profit retention"
    },
    {
      "num": "03",
      "problem": "Generic WordPress restaurant themes break during weekend dinner rushes and fail local Google Map pack SEO.",
      "solution": "Zero-database static HTML architecture with structured LocalBusiness and Menu Schema markup.",
      "metric": "Rank #1 for local dining searches"
    }
  ],
  "conversionPillars": [
    {
      "title": "Instant Mobile Menu Viewer",
      "desc": "Interactive, searchable digital menu categorized by course with high-res food previews and dietary tags.",
      "deliverable": "Sub-second responsive HTML food menu"
    },
    {
      "title": "Zero-Commission Table Reservation",
      "desc": "Direct booking integration via WhatsApp or TableCheck, capturing diner names, party size, and dietary notes.",
      "deliverable": "Direct VIP guest reservation engine"
    },
    {
      "title": "Private Event & Buyout Funnel",
      "desc": "Dedicated landing page for corporate dinners, birthdays, and wedding buyouts with automated guest minimums.",
      "deliverable": "High-ticket private dining inquiry form"
    }
  ],
  "metaTitle": "Restaurant Website Design Company | Custom Food Menu & Table Booking Web Development",
  "metaDescription": "Custom, high-speed website design for restaurants, fine dining, and cafes. Sub-second HTML food menus, direct table reservations, and zero third-party commissions.",
  "keywords": [
    "restaurant website design",
    "website designer for restaurants",
    "restaurant web design agency",
    "restaurant website development",
    "custom website for restaurants",
    "restaurant website design company",
    "professional website for fine dining",
    "restaurant website redesign",
    "cafe website design bangalore",
    "fine dining web design agency"
  ]
},
  'architects': {
  "key": "architects",
  "projectId": "architects",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · ARCHITECTURAL STUDIOS",
  "headline": "Websites for Architects That Prove Your Structural Vision Before You Present.",
  "subheadline": "Bespoke, publication-grade digital portfolios engineered for architectural ateliers and urban planners. Full-screen 4K project monographs, 3D CAD/render-to-reality sliders, and sub-second image loading.",
  "targetAudience": [
    "Luxury residential architects designing ₹2Cr+ bespoke villas",
    "Commercial master planning & institutional architecture firms",
    "Sustainable biophilic and net-zero energy architectural studios",
    "Award-winning architectural practices with selective client rosters"
  ],
  "stats": [
    {
      "value": "0.8s LCP",
      "label": "Full-screen 4K monograph load time"
    },
    {
      "value": "100%",
      "label": "Architectural dimension & layout accuracy"
    },
    {
      "value": "7 Days",
      "label": "Brief to live global deployment"
    },
    {
      "value": "0 Bloat",
      "label": "Zero page builders or layout shifts"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Generic website builders compress 4K CAD renders and architectural photographs into blurry, degraded pixels.",
      "solution": "Edge-served AVIF/WebP image pipeline delivering razor-sharp architectural detail at 0.8s load speed.",
      "metric": "Architectural Digest grade image fidelity"
    },
    {
      "num": "02",
      "problem": "Clients struggle to understand spatial design from static blueprints, leading to prolonged sales negotiations.",
      "solution": "Interactive before/after sliders comparing 3D BIM renders against finished constructed reality.",
      "metric": "Instant proof of execution competence"
    },
    {
      "num": "03",
      "problem": "Unqualified inquiries asking for cheap plan drafting waste principal architects’ billable hours.",
      "solution": "Architectural commission inquiry questionnaire establishing site plot size, budget tier, and design ethos.",
      "metric": "Pre-qualify ₹1Cr+ construction budgets"
    }
  ],
  "conversionPillars": [
    {
      "title": "Editorial Project Monographs",
      "desc": "Magazine-quality case studies highlighting spatial philosophy, structural materials, and daylight analysis.",
      "deliverable": "Custom responsive architectural monograph template"
    },
    {
      "title": "3D Render-to-Reality Interactive Slider",
      "desc": "Interactive dual-layer viewer allowing clients to glide between 3D conceptualization and finished physical structure.",
      "deliverable": "Precision render-vs-reality comparison widget"
    },
    {
      "title": "Principal Architect Commission Portal",
      "desc": "Bespoke intake questionnaire filtering incoming inquiries by project typology, site location, and investment budget.",
      "deliverable": "High-ticket architectural commission intake funnel"
    }
  ],
  "metaTitle": "Architect Website Design Company | Custom Web Development for Architecture Firms",
  "metaDescription": "Publication-grade, bespoke website design for architects and architectural studios. 4K project monographs, 3D render-to-reality sliders, and sub-second performance.",
  "keywords": [
    "architecture website design",
    "website designer for architects",
    "architectural firm web design agency",
    "architecture website development",
    "custom website for architects",
    "architect website design company",
    "professional website for architecture studios",
    "architect website redesign",
    "luxury villa architect website design",
    "architecture portfolio web design"
  ]
},
  'law-firms': {
  "key": "law-firms",
  "projectId": "law-firm",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · LEGAL & ADVOCACY",
  "headline": "Websites for Law Firms That Win High-Stakes Retainers and Honor Bar Ethics.",
  "subheadline": "Prestigious, dispassionate digital platforms hand-crafted for corporate law firms, advocates, and legal consultancies. Strict Bar Council compliance, discrete partner case intake, and military-grade security.",
  "targetAudience": [
    "Corporate M&A, private equity, and commercial law firms",
    "High Court and Supreme Court litigation advocates",
    "Intellectual property, patent, and trademark attorney firms",
    "Specialized tax, arbitration, and regulatory defense chambers"
  ],
  "stats": [
    {
      "value": "100%",
      "label": "Bar Council & legal ethics compliance"
    },
    {
      "value": "0 Vulnerabilities",
      "label": "Static code immunity to SQL injection"
    },
    {
      "value": "7 Days",
      "label": "Discovery to live encrypted deployment"
    },
    {
      "value": "256-Bit",
      "label": "End-to-end client privilege intake encryption"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Flamboyant agency designs violate Bar Council advertising restrictions and damage professional prestige.",
      "solution": "Understated, scholarly typographic design with compliant legal disclaimers and practice area boundaries.",
      "metric": "100% regulatory and ethical compliance"
    },
    {
      "num": "02",
      "problem": "WordPress security vulnerabilities expose confidential client case documents and litigation inquiries to leaks.",
      "solution": "Zero-database serverless architecture with encrypted form dispatch straight to senior partners’ secure mailboxes.",
      "metric": "Military-grade client confidentiality"
    },
    {
      "num": "03",
      "problem": "Corporate General Counsels bounce off generic lawyer directories unable to verify real partner track records.",
      "solution": "Detailed partner curriculum vitae, landmark judgments, published law review articles, and practice areas.",
      "metric": "Instant institutional credibility"
    }
  ],
  "conversionPillars": [
    {
      "title": "Institutional Practice Area Taxonomy",
      "desc": "Rigorous categorization of legal specializations with relevant statutes, judicial precedents, and case studies.",
      "deliverable": "Structured legal practice area architecture"
    },
    {
      "title": "Confidential Counsel Intake Gateway",
      "desc": "Privileged communication portal with encrypted field inputs and automatic jurisdictional disclaimers.",
      "deliverable": "Secure enterprise legal inquiry funnel"
    },
    {
      "title": "Partner Seniority & Judicial Standing Showcase",
      "desc": "Curated partner dossiers highlighting bar admissions, High Court appearances, and academic publications.",
      "deliverable": "Senior partner authority profile modules"
    }
  ],
  "metaTitle": "Law Firm Website Design Company | Custom Web Development for Lawyers & Advocates",
  "metaDescription": "Prestigious, Bar Council-compliant website design for law firms, corporate advocates, and legal chambers. High-trust typography, practice area taxonomy, and secure intake.",
  "keywords": [
    "law firm website design",
    "website designer for lawyers",
    "law firm web design agency",
    "law firm website development",
    "custom website for law firms",
    "law firm website design company",
    "professional website for advocates",
    "law firm website redesign",
    "corporate law firm website design",
    "litigation advocate website development"
  ]
},
  'accounting-firms': {
  "key": "accounting-firms",
  "projectId": "accounting-firm",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · ACCOUNTING & AUDIT",
  "headline": "Websites for Chartered Accountants That Establish Authority and Streamline Audits.",
  "subheadline": "Bespoke, ultra-secure digital platforms engineered for Chartered Accountants, CPA firms, and tax consultancies. Statutory compliance trackers, secure client document vaults, and statutory audit lead capture.",
  "targetAudience": [
    "Chartered Accountancy firms handling statutory and forensic audits",
    "Cross-border corporate tax and transfer pricing consultancies",
    "Fractional CFO and virtual finance departments for startups",
    "GST litigation and corporate restructuring advisory practices"
  ],
  "stats": [
    {
      "value": "100% Uptime",
      "label": "Zero downtime during tax filing deadlines"
    },
    {
      "value": "0.6s LCP",
      "label": "Sub-second document portal response"
    },
    {
      "value": "7 Days",
      "label": "Kickoff to live verified production"
    },
    {
      "value": "Zero Retainers",
      "label": "100% full source code ownership"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Outdated websites with broken links make enterprise CFOs doubt a firm’s modern financial competence.",
      "solution": "Crisp, contemporary financial interface with modern typography, partner credentials, and regulatory insight hubs.",
      "metric": "Enterprise-grade financial branding"
    },
    {
      "num": "02",
      "problem": "Clients miss critical GST and income tax deadlines because firms lack automated website notice trackers.",
      "solution": "Live statutory compliance calendar with automated deadline alerts and downloadable tax guides.",
      "metric": "Eliminate compliance penalty risks"
    },
    {
      "num": "03",
      "problem": "Emailing financial spreadsheets back and forth creates massive data privacy liabilities and lost files.",
      "solution": "Secure client portal gateway and structured audit scope request forms with document upload.",
      "metric": "Streamlined audit intake workflows"
    }
  ],
  "conversionPillars": [
    {
      "title": "Statutory Tax & Compliance Ticker",
      "desc": "Dynamic compliance radar listing upcoming MCA, GST, TDS, and Advance Tax deadlines with actionable advisory notes.",
      "deliverable": "Live statutory tax calendar component"
    },
    {
      "title": "Audit & Advisory Scope Estimator",
      "desc": "Interactive questionnaire calculating required audit scope, turnover brackets, and statutory filing packages.",
      "deliverable": "High-intent corporate audit inquiry funnel"
    },
    {
      "title": "Partner Seniority & Sector Credentials",
      "desc": "Showcase of partner FCA/CPA qualifications, sector expertise (Fintech, Real Estate, Healthcare), and case histories.",
      "deliverable": "Partner credential dossiers & ICAI compliance"
    }
  ],
  "metaTitle": "Accounting Firm Website Design Company | Custom CA & CPA Web Development Agency",
  "metaDescription": "Bespoke website design for Chartered Accountants, CPA firms, and corporate tax advisors. Statutory compliance trackers, partner profiles, and audit intake funnels.",
  "keywords": [
    "accounting firm website design",
    "website designer for accountants",
    "ca firm web design company",
    "accounting firm website development",
    "custom website for chartered accountants",
    "accounting website design agency",
    "professional website for cpa firms",
    "accounting firm website redesign",
    "tax consultant website design",
    "forensic audit firm website design"
  ]
},
  'construction-companies': {
  "key": "construction-companies",
  "projectId": "construction",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · CIVIL CONSTRUCTION",
  "headline": "Websites for Construction Companies That Win Tenders and Prove Plant Capabilities.",
  "subheadline": "Heavy-duty, high-speed digital assets engineered for civil engineering contractors, commercial builders, and turnkey EPC firms. Live construction site progress feeds, machinery inventories, and BOQ quote estimators.",
  "targetAudience": [
    "General civil engineering contractors building commercial infrastructure",
    "Turnkey luxury villa and residential enclave builders",
    "Industrial warehouse and pre-engineered steel building (PEB) fabricators",
    "Government infrastructure and institutional EPC contractors"
  ],
  "stats": [
    {
      "value": "100% Proof",
      "label": "Machinery & heavy equipment verification"
    },
    {
      "value": "0.8s LCP",
      "label": "Fast high-res drone photo streaming"
    },
    {
      "value": "7 Days",
      "label": "From contract to live public deployment"
    },
    {
      "value": "0 Page Builders",
      "label": "Zero Elementor bloat or security gaps"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Institutional tender evaluation committees reject contractors whose websites lack verified machinery and safety credentials.",
      "solution": "Detailed plant & machinery inventory tables, safety metrics (lost-time injury free hours), and ISO/OHSAS badges.",
      "metric": "Prequalify for institutional tenders"
    },
    {
      "num": "02",
      "problem": "Clients doubt construction timelines and worry about abandoned projects or material corner-cutting.",
      "solution": "Monthly drone milestone visual logs and time-lapse video embeds proving continuous on-site velocity.",
      "metric": "Eliminate client delivery anxiety"
    },
    {
      "num": "03",
      "problem": "Unstructured lead forms send vague inquiries like \"need building\" without plot size, budget, or architectural drawings.",
      "solution": "Comprehensive Bill of Quantities (BOQ) intake form allowing clients to upload architectural drawings and plot specs.",
      "metric": "Capture pre-qualified multi-crore bids"
    }
  ],
  "conversionPillars": [
    {
      "title": "Heavy Equipment & Fleet Asset Showcase",
      "desc": "Interactive equipment catalog detailing excavator tonnages, batching plant capacities, and crane boom lengths.",
      "deliverable": "Plant & equipment capability directory"
    },
    {
      "title": "Drone Progress & Milestone Gallery",
      "desc": "Zero-lag high-resolution aerial photo and video showcase tracking projects from excavation to turnkey occupancy.",
      "deliverable": "Civil construction milestone showcase"
    },
    {
      "title": "Tender & Commercial BOQ Intake Portal",
      "desc": "High-security procurement gateway for architects and developers to submit RFP documents and structural drawings.",
      "deliverable": "Commercial construction tender inquiry engine"
    }
  ],
  "metaTitle": "Construction Company Website Design | Custom Civil Builder Web Development Agency",
  "metaDescription": "Heavy-duty, high-performance website design for construction companies, civil contractors, and industrial builders. Equipment showcases, milestone tracking, and tender RFQs.",
  "keywords": [
    "construction company website design",
    "website designer for construction companies",
    "civil contractor web design company",
    "construction website development",
    "custom website for construction companies",
    "construction company website design agency",
    "professional website for builders",
    "construction company website redesign",
    "commercial builder website design",
    "turnkey civil contractor web development"
  ]
},
  'astrology-vastu': {
  "key": "astrology-vastu",
  "projectId": "astrology",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · ASTROLOGY & VASTU",
  "headline": "Websites for Astrologers & Vastu Masters That Fill Consultation Calendars Globally.",
  "subheadline": "Sacred, high-converting digital sanctuaries crafted for Vedic astrologers, numerologists, and Vastu consultants. Birth chart (Kundali) intake engines, floorplan upload portals, and international payments.",
  "targetAudience": [
    "Vedic astrology masters with global NRI client bases",
    "Commercial and residential Vastu architectural consultants",
    "Celebrity numerologists and gemstone advisors",
    "Spiritual wellness coaches and tarot master practitioners"
  ],
  "stats": [
    {
      "value": "100% Private",
      "label": "Confidential birth data & chart intake"
    },
    {
      "value": "Multi-Currency",
      "label": "Global payment gateway (INR, USD, AED, GBP)"
    },
    {
      "value": "7 Days",
      "label": "Discovery sprint to live global launch"
    },
    {
      "value": "0% Drop-Off",
      "label": "Frictionless 1-click WhatsApp booking"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Wasting hours chasing clients over WhatsApp for birth date, exact birth time, and birth city coordinates.",
      "solution": "Integrated Kundali intake engine capturing exact coordinates and automatically calculating timezone offsets.",
      "metric": "Save 15 hours of manual admin per week"
    },
    {
      "num": "02",
      "problem": "International NRI clients in the US, UK, and UAE struggle to pay consultation fees due to failed local gateways.",
      "solution": "Automated multi-currency payment checkout via Stripe and Razorpay with instant calendar slot confirmation.",
      "metric": "Double international consultation revenue"
    },
    {
      "num": "03",
      "problem": "Cheap, garish temple templates make educated corporate professionals question your astrological credentials.",
      "solution": "Sophisticated, sacred minimalist design honoring Vedic traditions with scholarly elegance.",
      "metric": "Attract high-paying executive clients"
    }
  ],
  "conversionPillars": [
    {
      "title": "Precision Kundali Birth Intake Engine",
      "desc": "Interactive form capturing birth date, exact time, geographic location, and primary life consultation concerns.",
      "deliverable": "Vedic birth chart intake workflow"
    },
    {
      "title": "Vastu Architectural Blueprint Portal",
      "desc": "Secure portal for homeowners and industrialists to upload residential or factory floorplans for directional analysis.",
      "deliverable": "Commercial Vastu consultation intake desk"
    },
    {
      "title": "Global Video Consultation Calendar",
      "desc": "Automated booking calendar syncing timezones between India and clients worldwide with instant Zoom links.",
      "deliverable": "Multi-timezone consultation booking system"
    }
  ],
  "metaTitle": "Astrology Website Design Company | Custom Vedic Astrologer & Vastu Web Development",
  "metaDescription": "Sacred, high-converting website design for Vedic astrologers, numerologists, and Vastu consultants. Kundali intake forms, multi-currency checkout, and consultation booking.",
  "keywords": [
    "astrology website design",
    "website designer for astrologers",
    "astrology web design company",
    "astrology website development",
    "custom website for astrologers",
    "vastu consultant website design",
    "professional website for vedic astrologers",
    "astrology website redesign",
    "numerology consultant website design",
    "online horoscope consultation website"
  ]
},
  'hotels-resorts': {
  "key": "hotels-resorts",
  "projectId": "hotels-resorts",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · LUXURY HOSPITALITY",
  "headline": "Websites for Luxury Boutique Resorts That Win Direct Bookings and Slash OTA Fees.",
  "subheadline": "Bespoke, cinematic digital destinations engineered for boutique luxury resorts, heritage palaces, and private villas. Direct reservation engines, 360-degree virtual suite tours, and zero OTA commissions.",
  "targetAudience": [
    "Eco-luxury wilderness resorts and wildlife safari lodges",
    "Heritage palaces, forts, and restored colonial boutique hotels",
    "Private beach villas, cliffside retreats, and island getaways",
    "Independent luxury hotels escaping 20% Booking.com commissions"
  ],
  "stats": [
    {
      "value": "0.8s LCP",
      "label": "High-res suite video & gallery streaming"
    },
    {
      "value": "20% Saved",
      "label": "Eliminate OTA commissions on direct stays"
    },
    {
      "value": "7 Days",
      "label": "Sprint start to live direct booking domain"
    },
    {
      "value": "100%",
      "label": "Direct guest communication and loyalty data"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Surrendering 18%–25% of top-line revenue to Online Travel Agencies (OTAs) on every single guest stay.",
      "solution": "Direct booking engine with \"Best Rate Guaranteed\" incentives, package perks, and seamless payment.",
      "metric": "Recapture ₹15L–₹50L in annual OTA cuts"
    },
    {
      "num": "02",
      "problem": "Slow WordPress resort themes take 8 seconds to load heavy property photos, driving travelers back to Google.",
      "solution": "Sub-second static React architecture delivering 4K panoramic room views at lightning speed.",
      "metric": "Keep affluent travelers engaged"
    },
    {
      "num": "03",
      "problem": "Guests arrive unprepared or book wrong room categories because websites lack spatial transparency.",
      "solution": "360-degree virtual walkthroughs, floor plans, amenity checklists, and curated day-by-day itineraries.",
      "metric": "Maximize guest satisfaction & average stay value"
    }
  ],
  "conversionPillars": [
    {
      "title": "Direct Reservation Engine with Price Parity",
      "desc": "Frictionless room selection widget showing direct booking perks (free breakfast, late checkout, spa credits).",
      "deliverable": "Direct boutique booking engine"
    },
    {
      "title": "Cinematic Suite & Villa Showcases",
      "desc": "Full-screen visual narratives detailing square footage, view angles, private plunge pools, and luxury amenities.",
      "deliverable": "High-conversion room category monographs"
    },
    {
      "title": "Destination Experience & Dining Itineraries",
      "desc": "Interactive guides covering fine-dining venues, private romantic dinners, spa therapies, and local excursions.",
      "deliverable": "Curated resort experience directory"
    }
  ],
  "metaTitle": "Hotel Website Design Company | Custom Resort & Boutique Stay Web Development",
  "metaDescription": "Cinematic, high-conversion website design for luxury boutique resorts, heritage hotels, and private villas. Direct reservation engines, zero OTA fees, and 360 suite tours.",
  "keywords": [
    "hotel website development",
    "website designer for hotels",
    "resort web design agency",
    "hotel website design company",
    "custom website for boutique resorts",
    "luxury hotel website design",
    "professional website for resorts",
    "hotel website redesign",
    "boutique hotel booking web design",
    "villa resort direct booking website"
  ]
},
  'marketing-agencies': {
  "key": "marketing-agencies",
  "projectId": "marketing-agencies",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · AGENCY DIGITAL ASSETS",
  "headline": "Websites for Marketing Agencies That Prove Your ROI Before You Pitch.",
  "subheadline": "High-performance, editorial digital platforms engineered for digital marketing, performance media, and creative agencies. Verified ROAS case studies, interactive retainer calculators, and zero-lag animations.",
  "targetAudience": [
    "Performance marketing and paid media agencies scaling D2C brands",
    "B2B demand generation and pipeline acceleration agencies",
    "Creative branding, social content, and influencer studios",
    "SEO and technical growth consultancies serving global enterprises"
  ],
  "stats": [
    {
      "value": "100/100",
      "label": "Google Core Web Vitals audit score"
    },
    {
      "value": "0.5s LCP",
      "label": "Sub-second interactive case study load"
    },
    {
      "value": "7 Days",
      "label": "Sprint kickoff to live agency deployment"
    },
    {
      "value": "Zero Lag",
      "label": "Fluid animations without FPS frame drops"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Pitching clients on digital excellence while the agency’s own website fails basic PageSpeed audits.",
      "solution": "Flawless 100/100 Core Web Vitals score proving your technical mastery before the first discovery call.",
      "metric": "Total technical credibility"
    },
    {
      "num": "02",
      "problem": "Generic agency case studies show pretty mockups without hard financial metrics, losing enterprise CMOs.",
      "solution": "Interactive data-backed case tear-downs highlighting CAC, ROAS, pipeline value, and conversion deltas.",
      "metric": "Win high-ticket ₹2L–₹10L/mo retainers"
    },
    {
      "num": "03",
      "problem": "Inbound inquiries from micro-businesses with ₹10,000 budgets clog up agency founders’ calendars.",
      "solution": "Smart agency intake funnel filtering prospects by monthly media spend and required service scope.",
      "metric": "Filter out low-budget tire-kickers"
    }
  ],
  "conversionPillars": [
    {
      "title": "ROAS & Pipeline Case Study Tear-Downs",
      "desc": "Structured growth case studies pairing creative assets with verified client analytics and revenue milestones.",
      "deliverable": "High-impact agency case study framework"
    },
    {
      "title": "Retainer Scope & Service Matrix",
      "desc": "Interactive service selector detailing exact deliverables, team allocations, and monthly engagement tiers.",
      "deliverable": "Transparent agency retainer configurator"
    },
    {
      "title": "Enterprise CMO Discovery Gateway",
      "desc": "Pre-qualification intake form capturing company stage, current CAC, advertising budget, and growth targets.",
      "deliverable": "High-ticket inbound agency lead funnel"
    }
  ],
  "metaTitle": "Marketing Agency Website Design | Custom Web Development for Digital Agencies",
  "metaDescription": "High-performance, editorial website design for digital marketing, creative, and performance agencies. Verified ROAS case studies, 100/100 speed, and retainer funnels.",
  "keywords": [
    "marketing agency website design",
    "website designer for marketing agencies",
    "digital agency web design company",
    "marketing agency website development",
    "custom website for digital agencies",
    "creative agency website design company",
    "professional website for advertising agencies",
    "marketing agency website redesign",
    "performance marketing agency website",
    "b2b growth agency web design"
  ]
},
  'recruitment-agencies': {
  "key": "recruitment-agencies",
  "projectId": "recruitment-agencies",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · RECRUITMENT & STAFFING",
  "headline": "Websites for Recruitment Agencies That Attract Top Employers and Elite Candidates.",
  "subheadline": "Dual-track, ultra-responsive digital platforms engineered for executive search firms, IT staffing agencies, and global headhunters. Employer talent inquiry funnels, searchable live job boards, and 1-click resume apply.",
  "targetAudience": [
    "C-suite executive search and leadership headhunting boutiques",
    "High-volume IT staffing and engineering contract recruitment firms",
    "Specialized healthcare, finance, and legal recruitment agencies",
    "Global workforce solutions and overseas talent mobility consultancies"
  ],
  "stats": [
    {
      "value": "Dual-Track",
      "label": "Segregated Employer vs Candidate UX"
    },
    {
      "value": "0.6s LCP",
      "label": "Instant job search and filter response"
    },
    {
      "value": "7 Days",
      "label": "Discovery to fully operational launch"
    },
    {
      "value": "1-Click",
      "label": "Seamless mobile resume application"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Confusing homepages that muddle enterprise employers and job seekers, causing both to bounce.",
      "solution": "Clear dual-track conversion architecture instantly guiding employers to hire and candidates to apply.",
      "metric": "Double conversion on both funnels"
    },
    {
      "num": "02",
      "problem": "Clunky PDF resume uploads that fail on mobile devices, losing top-tier passive candidates.",
      "solution": "1-click mobile application engine with LinkedIn integration and instant resume parsing.",
      "metric": "Capture 3x more qualified candidate profiles"
    },
    {
      "num": "03",
      "problem": "Enterprise HR heads doubt staffing capabilities due to lack of sector-specific placement proof.",
      "solution": "Industry practice group showcases detailing time-to-hire metrics, salary guides, and placement rosters.",
      "metric": "Win corporate recruitment retainers"
    }
  ],
  "conversionPillars": [
    {
      "title": "Dual-Funnel Enterprise Conversion Hero",
      "desc": "Split-action hero instantly routing corporate hiring managers to \"Request Talent\" and candidates to \"Browse Jobs\".",
      "deliverable": "Segregated recruitment conversion layout"
    },
    {
      "title": "Live Searchable Career Board",
      "desc": "High-speed job directory filterable by industry, seniority, location, and salary band with mobile apply.",
      "deliverable": "Integrated job board and candidate intake"
    },
    {
      "title": "Corporate Talent Requisition Desk",
      "desc": "Enterprise brief intake form capturing role specifications, headcount requirements, and urgency timelines.",
      "deliverable": "Employer talent acquisition funnel"
    }
  ],
  "metaTitle": "Recruitment Agency Website Design | Custom Staffing Web Development Company",
  "metaDescription": "Dual-track, high-converting website design for recruitment agencies, staffing firms, and executive headhunters. Live job boards, resume parsing, and employer intake funnels.",
  "keywords": [
    "recruitment agency website design",
    "website designer for recruitment agencies",
    "staffing company web design agency",
    "recruitment website development",
    "custom website for staffing agencies",
    "recruitment agency website design company",
    "professional website for headhunters",
    "recruitment website redesign",
    "executive search firm website design",
    "it staffing agency website development"
  ]
},
  'ecommerce-brands': {
  "key": "ecommerce-brands",
  "projectId": "ecommerce-brands",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · D2C E-COMMERCE",
  "headline": "Storefronts for D2C Brands That Eliminate Cart Abandonment with Sub-Second Speed.",
  "subheadline": "Headless, ultra-fast e-commerce platforms engineered for direct-to-consumer lifestyle, wellness, and luxury goods brands. Instant mobile checkouts, zero app bloat, and sub-second product pages.",
  "targetAudience": [
    "Fast-growing D2C wellness, skincare, and beauty brands",
    "Artisanal specialty food, coffee, and beverage makers",
    "High-ticket luxury apparel, footwear, and leathercraft brands",
    "Shopify store owners frustrated with slow 5-second app-bloated themes"
  ],
  "stats": [
    {
      "value": "0.4s LCP",
      "label": "Product page load speed"
    },
    {
      "value": "+35% CVR",
      "label": "Average checkout conversion lift"
    },
    {
      "value": "7 Days",
      "label": "From design to live payment deployment"
    },
    {
      "value": "0 App Lag",
      "label": "Zero third-party script slowdowns"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Shopify stores bloated with 20 plugins take 6 seconds to load, killing mobile ad conversion.",
      "solution": "Hand-coded static React / headless storefront loading product pages in 400ms.",
      "metric": "Double return on ad spend (ROAS)"
    },
    {
      "num": "02",
      "problem": "Clunky checkout funnels with unexpected steps cause 70%+ of mobile shoppers to abandon their carts.",
      "solution": "Streamlined 1-click mobile checkout with instant UPI, Apple Pay, and Google Pay integrations.",
      "metric": "Cut cart abandonment by 40%"
    },
    {
      "num": "03",
      "problem": "Generic themes make brands look like cheap drop-shippers, preventing premium pricing.",
      "solution": "Editorial typography, full-screen ingredient stories, and verified photo review galleries.",
      "metric": "Command 2x–3x higher average order values"
    }
  ],
  "conversionPillars": [
    {
      "title": "Sub-Second Product Detail Page (PDP)",
      "desc": "Blazing-fast product showcase with fluid image zoom, variant selectors, and real-time inventory counters.",
      "deliverable": "High-conversion responsive product template"
    },
    {
      "title": "Sticky 1-Click Mobile Checkout",
      "desc": "Persistent mobile buy bar with instant express checkout routing directly to UPI, credit card, or COD.",
      "deliverable": "Zero-friction mobile checkout flow"
    },
    {
      "title": "Verified Customer Proof & Review Wall",
      "desc": "User-generated photo reviews, video testimonials, and trust badges seamlessly integrated without script lag.",
      "deliverable": "Social proof review gallery module"
    }
  ],
  "metaTitle": "E-Commerce Website Design Company | Custom D2C Storefront Web Development",
  "metaDescription": "Headless, sub-second e-commerce website design for D2C brands. Ultra-fast product pages, 1-click mobile checkout, and zero plugin bloat to maximize conversion.",
  "keywords": [
    "ecommerce website development",
    "website designer for ecommerce brands",
    "d2c web design agency",
    "ecommerce website design company",
    "custom website for d2c brands",
    "shopify plus website redesign",
    "professional website for online stores",
    "headless ecommerce web development",
    "fast loading ecommerce website",
    "luxury d2c website design"
  ]
},
  'landscaping': {
  "key": "landscaping",
  "projectId": "landscaping",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · LANDSCAPE & OUTDOOR",
  "headline": "Websites for Landscape Architects That Showcase Living Art and Win Estate Projects.",
  "subheadline": "Bespoke, visual-first digital portfolios hand-crafted for landscape architects, outdoor living designers, and garden contractors. Day-to-night lighting sliders, climate plant encyclopedias, and estate project intake.",
  "targetAudience": [
    "Luxury residential estate landscape architects",
    "Commercial tech park and institutional green space designers",
    "Rooftop sky garden and urban terrace living specialists",
    "High-end swimming pool, pergola, and outdoor kitchen builders"
  ],
  "stats": [
    {
      "value": "0.8s LCP",
      "label": "High-res landscape photography load"
    },
    {
      "value": "Day / Night",
      "label": "Architectural lighting visualizer"
    },
    {
      "value": "7 Days",
      "label": "Discovery to live production launch"
    },
    {
      "value": "100%",
      "label": "Mobile responsiveness on all devices"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Landscape photos look flat on generic websites because clients cannot experience night-time lighting.",
      "solution": "Interactive day-to-night visualizer sliders showcasing architectural garden illumination and water features.",
      "metric": "Showcase full emotional impact of outdoor living"
    },
    {
      "num": "02",
      "problem": "Clients worry about plant survival, irrigation maintenance, and long-term garden upkeep costs.",
      "solution": "Indigenous plant encyclopedia detailing water requirements, growth stages, and seasonal flowering cycles.",
      "metric": "Eliminate homeowner maintenance hesitation"
    },
    {
      "num": "03",
      "problem": "Inquiries for minor lawn mowing waste principal landscape designers’ consulting time.",
      "solution": "Estate project qualification questionnaire establishing plot acreage, budget tier, and architectural plans.",
      "metric": "Target ₹10L–₹50L turnkey landscaping projects"
    }
  ],
  "conversionPillars": [
    {
      "title": "Day-to-Night Architectural Lighting Visualizer",
      "desc": "Interactive dual-exposure slider revealing garden landscapes by daylight and illuminated by night.",
      "deliverable": "Day/night landscape interaction slider"
    },
    {
      "title": "Living Botanical & Material Palette",
      "desc": "Visual directory of curated flora, natural stone pavers, water feature materials, and automated irrigation specs.",
      "deliverable": "Landscape material & plant palette guide"
    },
    {
      "title": "Turnkey Estate Project Intake Desk",
      "desc": "Comprehensive inquiry portal capturing plot dimensions, soil conditions, architectural style, and budget allocation.",
      "deliverable": "High-ticket landscape project inquiry funnel"
    }
  ],
  "metaTitle": "Landscaping Website Design Company | Custom Landscape Architect Web Development",
  "metaDescription": "Visual-first, publication-grade website design for landscape architects and outdoor living contractors. Day-to-night sliders, botanical guides, and estate project funnels.",
  "keywords": [
    "landscaping website design",
    "website designer for landscape architects",
    "landscape web design agency",
    "landscaping website development",
    "custom website for landscape contractors",
    "garden design company website design",
    "professional website for outdoor living",
    "landscaping website redesign",
    "luxury estate landscape web design",
    "terrace garden website development"
  ]
},
  'event-planners': {
  "key": "event-planners",
  "projectId": "event-planners",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · EVENT PRODUCTION",
  "headline": "Websites for Luxury Event Planners That Sell Grandeur and Secure Mega-Budgets.",
  "subheadline": "Cinematic, high-conversion digital assets engineered for luxury wedding planners, corporate summit producers, and event scenographers. Full-screen highlight reels, venue capacity matrices, and live date checkers.",
  "targetAudience": [
    "Multi-day destination wedding planners managing ₹50L+ weddings",
    "Corporate summit, annual conference, and gala dinner producers",
    "Experiential brand launch and luxury pop-up scenographers",
    "Concert, exhibition, and large-scale festival organizers"
  ],
  "stats": [
    {
      "value": "0.8s LCP",
      "label": "Cinematic event film streaming speed"
    },
    {
      "value": "100% Mobile",
      "label": "Frictionless bridal inquiry intake"
    },
    {
      "value": "7 Days",
      "label": "Kickoff to live verified launch"
    },
    {
      "value": "Zero Buffering",
      "label": "Optimized 4K video reel embeds"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Couples and corporate brands cannot visualize event scale from low-res social media photo carousels.",
      "solution": "Full-bleed cinematic highlight film embeds and categorized experiential photo stories with zero buffering.",
      "metric": "Captivate high-net-worth event buyers"
    },
    {
      "num": "02",
      "problem": "Wasting endless hours answering messages for wedding dates that are already fully booked.",
      "solution": "Interactive calendar availability checker allowing clients to instantly see open weekend dates.",
      "metric": "Save 10 hours of booking administration"
    },
    {
      "num": "03",
      "problem": "Inbound inquiries with micro-budgets expect grand palace decor, wasting consultation time.",
      "solution": "Transparent budget tier indicator helping clients align expectations on guest counts and decor scale.",
      "metric": "Attract pre-qualified multi-day clients"
    }
  ],
  "conversionPillars": [
    {
      "title": "Experiential Event Production Showcase",
      "desc": "Filterable portfolio categorized by celebration type (Cocktail, Sangeet, Mandap, Reception, Summit) with behind-the-scenes reels.",
      "deliverable": "Thematic event production portfolio"
    },
    {
      "title": "Wedding Date & Calendar Checker",
      "desc": "Visual date selector allowing couples to check seasonal availability and lock priority dates via WhatsApp.",
      "deliverable": "Event date availability checker"
    },
    {
      "title": "Grand Production Budget Estimator",
      "desc": "Interactive scope questionnaire capturing guest headcount, venue destination, hospitality scope, and entertainment tiers.",
      "deliverable": "High-ticket event inquiry intake funnel"
    }
  ],
  "metaTitle": "Event Planner Website Design Company | Custom Wedding Planner Web Development",
  "metaDescription": "Cinematic, high-converting website design for luxury event planners, wedding producers, and scenographers. Highlight reels, date availability checkers, and budget estimators.",
  "keywords": [
    "event management website design",
    "website designer for event planners",
    "wedding planner web design agency",
    "event planner website development",
    "custom website for wedding decorators",
    "event production website design company",
    "professional website for event organizers",
    "event management website redesign",
    "destination wedding planner website design",
    "luxury event decorator web design"
  ]
},
  'veterinary-clinics': {
  "key": "veterinary-clinics",
  "projectId": "veterinary-clinics",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · VETERINARY & ANIMAL CARE",
  "headline": "Websites for Veterinary Hospitals That Comfort Anxious Pet Parents and Book Consults.",
  "subheadline": "Compassionate, clinical digital platforms hand-crafted for veterinary hospitals, pet surgical clinics, and 24/7 animal care centers. Emergency triage hotlines, pet vaccination trackers, and online appointment booking.",
  "targetAudience": [
    "24/7 emergency veterinary trauma hospitals",
    "Specialized veterinary orthopedic and dental surgical centers",
    "Feline-friendly certified private cat clinics",
    "Exotic pet, avian, and small animal veterinary practices"
  ],
  "stats": [
    {
      "value": "24/7 Ready",
      "label": "Emergency triage button always visible"
    },
    {
      "value": "0.5s LCP",
      "label": "Sub-second mobile emergency access"
    },
    {
      "value": "7 Days",
      "label": "Discovery to live clinical deployment"
    },
    {
      "value": "100%",
      "label": "Vaccination and medical records access"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Pet owners panicking in medical emergencies cannot find doctor phone numbers on cluttered websites.",
      "solution": "Prominent, 1-click emergency call button and live hospital directions permanently anchored on mobile.",
      "metric": "Instant life-saving emergency response"
    },
    {
      "num": "02",
      "problem": "Pet owners doubt veterinary surgical standards and fear poor sanitation or substandard equipment.",
      "solution": "Virtual tour of veterinary surgical OT, digital X-ray suites, in-house pathology lab, and recovery wards.",
      "metric": "Establish total clinical trust"
    },
    {
      "num": "03",
      "problem": "Receptionists overwhelmed by repetitive phone inquiries about vaccination schedules and neutering packages.",
      "solution": "Interactive vaccination timeline guide and transparent surgical package cards with online booking.",
      "metric": "Cut reception phone load by 50%"
    }
  ],
  "conversionPillars": [
    {
      "title": "Emergency 24/7 Triage Navigation",
      "desc": "High-visibility emergency banner featuring instant phone dialer, WhatsApp coordinator, and Google Maps directions.",
      "deliverable": "Mobile emergency veterinary triage bar"
    },
    {
      "title": "Veterinary Surgical & Facility Tour",
      "desc": "Photographic walkthrough showcasing sterilized surgical suites, oxygen therapy cages, and diagnostic imaging.",
      "deliverable": "Hospital facility and OT showcase"
    },
    {
      "title": "Pet Vaccination & Health Plan Engine",
      "desc": "Interactive schedule for puppies, kittens, and senior pets detailing essential immunizations and wellness exams.",
      "deliverable": "Preventive pet wellness booking funnel"
    }
  ],
  "metaTitle": "Veterinary Clinic Website Design | Custom Animal Hospital Web Development Agency",
  "metaDescription": "Compassionate, high-trust website design for veterinary hospitals, pet clinics, and animal surgeons. 24/7 emergency buttons, surgical showcases, and vaccination booking.",
  "keywords": [
    "veterinary clinic website design",
    "website designer for veterinary clinics",
    "animal hospital web design agency",
    "veterinary website development",
    "custom website for pet clinics",
    "veterinary clinic website design company",
    "professional website for veterinarians",
    "veterinary website redesign",
    "24 hour pet hospital website design",
    "veterinary surgical clinic web development"
  ]
},
  'automotive-garages': {
  "key": "automotive-garages",
  "projectId": "automotive-garages",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · AUTOMOTIVE & DETAILING",
  "headline": "Websites for Luxury Automotive Studios That Sell High-Ticket PPF & Precision Repairs.",
  "subheadline": "Precision, high-octane digital platforms engineered for luxury car detailing studios, European car workshops, and performance tuners. Paint correction before/after sliders, PPF package calculators, and service booking.",
  "targetAudience": [
    "Paint Protection Film (PPF) and ceramic coating detailing studios",
    "Independent European luxury car specialists (BMW, Audi, Mercedes, Porsche)",
    "Performance ECU remapping and dyno tuning workshops",
    "Classic, vintage, and bespoke automobile restoration garages"
  ],
  "stats": [
    {
      "value": "0.6s LCP",
      "label": "Sub-second paint correction gallery load"
    },
    {
      "value": "3-Tier",
      "label": "Transparent ceramic & PPF pricing tiers"
    },
    {
      "value": "7 Days",
      "label": "Sprint start to live operational launch"
    },
    {
      "value": "100%",
      "label": "OEM diagnostic tool and equipment proof"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Car enthusiasts don’t trust low-end garages with their ₹80L+ German luxury cars based on social media claims.",
      "solution": "Detailed facility showcase featuring dust-free cleanroom detailing bays, OEM diagnostic scanners, and hydraulic lifts.",
      "metric": "Command high-trust enthusiast credibility"
    },
    {
      "num": "02",
      "problem": "Customers have no idea why one PPF package costs ₹60,000 and another ₹1,80,000, leading to stalled deals.",
      "solution": "Interactive 3-tier detailing comparison matrix highlighting TPU film microns, self-healing warranties, and hydrophobic tests.",
      "metric": "Upsell high-margin premium packages"
    },
    {
      "num": "03",
      "problem": "Static photos fail to prove paint correction mastery on black swirl-marked supercar panels.",
      "solution": "Interactive split-screen micro-zoom slider revealing swirl removal under direct LED inspection lights.",
      "metric": "Undeniable visual proof of craftsmanship"
    }
  ],
  "conversionPillars": [
    {
      "title": "Interactive Paint Correction Split-Slider",
      "desc": "High-definition macro slider demonstrating swirl-mark defect removal on damaged luxury paint surfaces.",
      "deliverable": "Before/after paint restoration slider"
    },
    {
      "title": "Ceramic & PPF Tiered Package Matrix",
      "desc": "Transparent pricing cards breaking down surface prep, film brand (XPEL, Stek, Llumar), and multi-year warranties.",
      "deliverable": "Automotive detailing package configurator"
    },
    {
      "title": "Luxury Vehicle Service Booking Intake",
      "desc": "Service scheduler capturing vehicle make, model, year, current mileage, and specific performance or repair concerns.",
      "deliverable": "European auto service booking funnel"
    }
  ],
  "metaTitle": "Car Detailing Website Design | Custom Automotive Garage Web Development Agency",
  "metaDescription": "High-octane, precision website design for luxury car detailing studios, PPF installers, and European auto workshops. Paint correction sliders, package calculators, and booking.",
  "keywords": [
    "car detailing website design",
    "website designer for automotive garages",
    "car repair web design agency",
    "automotive website development",
    "custom website for detailing studios",
    "car detailing website design company",
    "professional website for auto workshops",
    "automotive website redesign",
    "paint protection film ppf website design",
    "luxury car garage web development"
  ]
},
  'cleaning-services': {
  "key": "cleaning-services",
  "projectId": "cleaning-services",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · FACILITY & CLEANING",
  "headline": "Websites for Deep Cleaning Companies That Close Residential & Commercial AMCs.",
  "subheadline": "Spotless, high-converting digital platforms engineered for professional deep cleaning companies and facility management providers. Instant square-foot pricing calculators, staff verification badges, and recurring booking.",
  "targetAudience": [
    "Turnkey residential deep cleaning and move-in/move-out services",
    "Commercial office, retail, and corporate facility management firms",
    "Specialized sofa, mattress, and industrial steam sanitization teams",
    "Post-construction and renovation site deep cleaning contractors"
  ],
  "stats": [
    {
      "value": "Instant Quote",
      "label": "Real-time square foot price calculator"
    },
    {
      "value": "100% Verified",
      "label": "Police background verified staff badges"
    },
    {
      "value": "7 Days",
      "label": "From concept to live booking deployment"
    },
    {
      "value": "0.5s LCP",
      "label": "Instant mobile service selection response"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Homeowners are hesitant to invite cleaning crews into their homes without safety and background verification.",
      "solution": "Prominent staff verification badges, police clearance certifications, and insurance coverage guarantees.",
      "metric": "Eliminate homeowner safety hesitation"
    },
    {
      "num": "02",
      "problem": "Forcing customers to wait 4 hours for a manual phone quote causes 60% to book on competing aggregator apps.",
      "solution": "Instant online price calculator based on BHK configuration, square footage, and cleaning depth.",
      "metric": "Capture immediate booking intent"
    },
    {
      "num": "03",
      "problem": "One-off cleanings have high customer acquisition costs and leave revenue unpredictable month to month.",
      "solution": "Recurring subscription booking engine offering discounts for bi-weekly and monthly maintenance contracts.",
      "metric": "Build predictable monthly recurring revenue"
    }
  ],
  "conversionPillars": [
    {
      "title": "Instant Square-Foot Price Calculator",
      "desc": "Interactive selector generating immediate, transparent quotes based on property type, BHK count, and add-on services.",
      "deliverable": "Dynamic cleaning cost calculator"
    },
    {
      "title": "10-Point Cleaning Checklist Showcase",
      "desc": "Detailed room-by-room breakdown detailing vacuuming, steam sanitization, acid-free tile cleaning, and degreasing.",
      "deliverable": "Transparent cleaning scope checklist"
    },
    {
      "title": "Commercial Corporate AMC Request Desk",
      "desc": "Dedicated procurement funnel for office facility managers requesting weekly janitorial service and annual contracts.",
      "deliverable": "Commercial facility contract intake funnel"
    }
  ],
  "metaTitle": "Cleaning Service Website Design | Custom Deep Cleaning Web Development Agency",
  "metaDescription": "High-converting, professional website design for deep cleaning companies and facility services. Instant square-foot calculators, verified staff trust badges, and AMC booking.",
  "keywords": [
    "cleaning company website design",
    "website designer for cleaning services",
    "deep cleaning web design agency",
    "cleaning service website development",
    "custom website for cleaning companies",
    "cleaning company website design company",
    "professional website for facility services",
    "cleaning service website redesign",
    "office cleaning website design",
    "residential deep cleaning web development"
  ]
},
  'manufacturing-oems': {
  "key": "manufacturing-oems",
  "projectId": "manufacturing-oems",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · INDUSTRIAL MANUFACTURING",
  "headline": "Websites for Industrial Manufacturers That Win Global RFQs and Pass Vendor Audits.",
  "subheadline": "Engineered, high-performance digital flagships hand-crafted for precision manufacturing plants, machine shops, and industrial OEMs. Machine capacity tables, ISO/AS9100 certificate downloads, and secure CAD drawing RFQs.",
  "targetAudience": [
    "Precision CNC machining, milling, and multi-axis turning facilities",
    "Custom sheet metal fabrication, laser cutting, and stamping plants",
    "Industrial electrical switchgear, transformer, and panel OEMs",
    "Contract packaging machinery and automated material handling fabricators"
  ],
  "stats": [
    {
      "value": "AS9100 / ISO",
      "label": "Verified quality audit certification"
    },
    {
      "value": "±0.005mm",
      "label": "Tolerance and technical capacity tables"
    },
    {
      "value": "7 Days",
      "label": "Discovery to live production launch"
    },
    {
      "value": "CAD Secure",
      "label": "Encrypted STEP/IGES engineering upload"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Global procurement managers bounce off outdated websites unable to verify real machine bed sizes and tolerances.",
      "solution": "Exhaustive machine capability matrix detailing multi-axis travels, spindle RPMs, and micron tolerances.",
      "metric": "Prequalify for Fortune 500 supply chains"
    },
    {
      "num": "02",
      "problem": "Heavy 50MB PDF product catalogs crash mobile browsers when plant engineers inspect equipment on the factory floor.",
      "solution": "Searchable, sub-second HTML technical specification tables with instant PDF spec-sheet single-page downloads.",
      "metric": "Fast mobile engineering reference"
    },
    {
      "num": "03",
      "problem": "Unsecured email file attachments bounce 100MB 3D CAD files, stalling high-value quotation timelines.",
      "solution": "Encrypted engineering intake portal supporting direct upload of large STEP, IGES, and DWG 3D drawing files.",
      "metric": "Accelerate million-dollar RFQ cycles"
    }
  ],
  "conversionPillars": [
    {
      "title": "Plant Machinery & Capacity Matrix",
      "desc": "Interactive table cataloging CNC axes, bed dimensions, laser wattages, CMM inspection tools, and batch capacities.",
      "deliverable": "Comprehensive industrial capacity matrix"
    },
    {
      "title": "Secure Engineering CAD RFQ Portal",
      "desc": "Industrial intake gateway allowing procurement directors to upload drawing files with NDA confidentiality assurances.",
      "deliverable": "Encrypted CAD drawing submission funnel"
    },
    {
      "title": "Quality & Compliance Verification Vault",
      "desc": "Centralized directory of downloadable audit certificates (ISO 9001, AS9100D, IATF 16949, CE) with validation IDs.",
      "deliverable": "Quality compliance verification center"
    }
  ],
  "metaTitle": "Manufacturing Website Design Company | Custom Industrial B2B Web Development",
  "metaDescription": "Engineered, high-performance website design for industrial manufacturers, CNC machine shops, and OEMs. Machine capacity matrices, CAD drawing RFQs, and ISO compliance.",
  "keywords": [
    "manufacturing website design",
    "website designer for manufacturers",
    "industrial web design agency",
    "manufacturing website development",
    "custom website for industrial oems",
    "manufacturing company website design",
    "professional website for precision engineering",
    "manufacturing website redesign",
    "cnc machine shop website design",
    "b2b industrial manufacturing web development"
  ]
},
  'financial-advisors': {
  "key": "financial-advisors",
  "projectId": "financial-advisors",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · WEALTH & ADVISORY",
  "headline": "Websites for Wealth Managers That Inspire Fiduciary Trust and Grow High-Net-Worth AUM.",
  "subheadline": "Sober, prestigious digital platforms hand-crafted for Registered Investment Advisors (RIAs), wealth managers, and family office consultancies. Fiduciary disclosures, retirement runway calculators, and confidential HNI intake.",
  "targetAudience": [
    "SEBI / SEC Registered Investment Advisors managing ₹25Cr+ AUM",
    "Multi-family office consultancies and estate succession planners",
    "Discretionary Portfolio Management Services (PMS) boutiques",
    "Independent financial planners serving corporate executives and doctors"
  ],
  "stats": [
    {
      "value": "100% Fiduciary",
      "label": "Transparent fee-only advisory model"
    },
    {
      "value": "0 Vulnerabilities",
      "label": "Zero-database financial security"
    },
    {
      "value": "7 Days",
      "label": "Brief to live verified production"
    },
    {
      "value": "SEBI / SEC",
      "label": "Strict regulatory disclosure compliance"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Flamboyant designs with promised returns violate financial regulations and damage institutional trust.",
      "solution": "Dignified, editorial typographic aesthetic with transparent fee disclosures and strict regulatory compliance.",
      "metric": "100% regulatory compliance"
    },
    {
      "num": "02",
      "problem": "High-Net-Worth Individuals (HNIs) bounce off generic templates unable to verify an advisor’s investment philosophy.",
      "solution": "In-depth capital allocation manifestos, risk management principles, and historical market cycle whitepapers.",
      "metric": "Attract sophisticated ₹1Cr+ investors"
    },
    {
      "num": "03",
      "problem": "Potential clients have no idea whether they qualify for an advisor’s minimum portfolio threshold.",
      "solution": "Interactive wealth assessment tool evaluating portfolio size, retirement timeline, and asset allocation needs.",
      "metric": "Pre-qualify accredited investor leads"
    }
  ],
  "conversionPillars": [
    {
      "title": "Transparent Fiduciary Charter",
      "desc": "Prominent declaration of fee-only fiduciary commitment, zero commission kickbacks, and regulatory registration IDs.",
      "deliverable": "Fiduciary trust & compliance framework"
    },
    {
      "title": "Retirement Runway & Wealth Milestone Tool",
      "desc": "Interactive financial modeling widget calculating inflation-adjusted post-retirement cash flow requirements.",
      "deliverable": "High-net-worth wealth assessment tool"
    },
    {
      "title": "Confidential HNI Discovery Consultation Desk",
      "desc": "Discreet consultation booking form with strict privacy non-disclosure guarantees routing directly to senior partners.",
      "deliverable": "Private wealth advisory booking funnel"
    }
  ],
  "metaTitle": "Financial Advisor Website Design | Custom Wealth Management Web Development",
  "metaDescription": "Prestigious, fiduciary-aligned website design for wealth managers, RIAs, and family offices. Transparent fee disclosures, wealth calculators, and confidential HNI consultation intake.",
  "keywords": [
    "financial advisor website design",
    "website designer for financial advisors",
    "wealth management web design agency",
    "financial advisory website development",
    "custom website for investment advisors",
    "financial planning website design company",
    "professional website for wealth managers",
    "financial advisor website redesign",
    "fee only financial planner website design",
    "family office website development"
  ]
},
  'logistics-transport': {
  "key": "logistics-transport",
  "projectId": "logistics-transport",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · SUPPLY CHAIN & FREIGHT",
  "headline": "Websites for Logistics Companies That Win Enterprise Shipping Contracts.",
  "subheadline": "Industrial, high-velocity digital platforms engineered for freight forwarders, third-party logistics (3PL) providers, and transport fleets. Real-time shipment tracking, freight quote calculators, and port network maps.",
  "targetAudience": [
    "International freight forwarders handling air, ocean, and customs clearance",
    "Domestic 3PL warehousing and supply chain fulfillment operators",
    "Inter-state commercial fleet operators and heavy machinery transport",
    "Cold-chain logistics and pharmaceutical temperature-controlled transport"
  ],
  "stats": [
    {
      "value": "0.5s LCP",
      "label": "Sub-second shipment tracking lookup"
    },
    {
      "value": "Global Reach",
      "label": "Interactive trade lane and port maps"
    },
    {
      "value": "7 Days",
      "label": "Kickoff to live operations deployment"
    },
    {
      "value": "100% Reliable",
      "label": "Zero downtime during peak shipping seasons"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Corporate supply chain directors bounce off logistics sites that lack real-time container and airway bill tracking.",
      "solution": "Integrated shipment tracking portal allowing shippers to input AWB/Container numbers for instant status.",
      "metric": "Eliminate manual tracking phone calls"
    },
    {
      "num": "02",
      "problem": "Lengthy 48-hour delays in generating freight quotes cause shippers to book with automated digital aggregators.",
      "solution": "Instant freight rate estimator capturing origin, destination, container type, cargo weight, and Incoterms.",
      "metric": "Shorten quotation response to minutes"
    },
    {
      "num": "03",
      "problem": "Shippers worry about cargo damage, theft, and temperature excursions during transit.",
      "solution": "Detailed fleet specifications highlighting GPS telematics, temperature monitoring sensors, and cargo insurance.",
      "metric": "Win high-value pharmaceutical contracts"
    }
  ],
  "conversionPillars": [
    {
      "title": "Real-Time AWB & Container Tracking Hub",
      "desc": "Prominent header tracking input enabling shippers and consignees to verify live cargo status in one click.",
      "deliverable": "Live shipment tracking integration"
    },
    {
      "title": "Global Trade Lane & Port Network Directory",
      "desc": "Interactive map displaying covered sea ports, air hubs, customs bonded warehouses, and transit turnaround times.",
      "deliverable": "Global trade lane network showcase"
    },
    {
      "title": "Freight Rate & Cargo RFQ Estimator",
      "desc": "Multi-modal inquiry form capturing volume CBM, gross weight, hazardous cargo classes, and delivery deadlines.",
      "deliverable": "High-volume commercial freight inquiry funnel"
    }
  ],
  "metaTitle": "Logistics Website Design Company | Custom Freight Forwarder Web Development",
  "metaDescription": "Industrial, high-velocity website design for logistics companies, freight forwarders, and 3PL providers. Live shipment tracking, freight quote estimators, and fleet showcases.",
  "keywords": [
    "logistics company website design",
    "website designer for logistics companies",
    "freight forwarding web design agency",
    "logistics website development",
    "custom website for freight forwarders",
    "transport company website design",
    "professional website for supply chain firms",
    "logistics website redesign",
    "3pl warehousing website design",
    "cold chain logistics web development"
  ]
},
  'jewellery-stores': {
  "key": "jewellery-stores",
  "projectId": "jewellery-stores",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · FINE JEWELLERY",
  "headline": "Websites for Fine Jewellery Ateliers That Radiate Luxury and Book Bridal Consults.",
  "subheadline": "Bespoke, luminous digital flagships crafted for certified diamond jewellers, heritage gold boutiques, and bespoke bridal ateliers. Ultra-crisp 4K macro zoom, live gold rate tickers, and private salon appointments.",
  "targetAudience": [
    "Solitaire diamond ateliers and custom engagement ring craftsmen",
    "Heritage handcrafted Polki, Kundan, and antique temple jewelry stores",
    "High-end designer jewelry brands catering to luxury bridal weddings",
    "Boutique gemstone and custom birthstone jewelry designers"
  ],
  "stats": [
    {
      "value": "4K Macro",
      "label": "Ultra-crisp gemstone facet clarity"
    },
    {
      "value": "Live Rates",
      "label": "Real-time 22K/24K gold price ticker"
    },
    {
      "value": "7 Days",
      "label": "Design sprint to live boutique launch"
    },
    {
      "value": "GIA / IGI",
      "label": "Direct certificate lookup integration"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Compressed low-res photos make ₹5L+ diamond necklaces look dull, driving brides to competitor showrooms.",
      "solution": "Ultra-crisp 4K macro zoom viewers revealing diamond cuts, clarity facets, and hallmark gold stamps.",
      "metric": "Radiate authentic luxury craftsmanship"
    },
    {
      "num": "02",
      "problem": "Fluctuating gold prices cause constant client confusion and outdated catalog prices.",
      "solution": "Live automated gold and platinum rate ticker updating daily bullion rates across 18K, 22K, and 24K.",
      "metric": "Eliminate pricing discrepancies"
    },
    {
      "num": "03",
      "problem": "Brides hesitate to purchase high-ticket bridal sets online without personal styling advice.",
      "solution": "Private VIP salon appointment booking engine connecting brides directly to master jewelry stylists.",
      "metric": "Fill weekend bridal consultation rooms"
    }
  ],
  "conversionPillars": [
    {
      "title": "4K Gemstone Macro Zoom Showcase",
      "desc": "High-fidelity visualizer allowing clients to inspect diamond clarity, prong settings, and intricate filigree work.",
      "deliverable": "Luxury macro jewelry viewer component"
    },
    {
      "title": "Live Bullion & Diamond Certificate Checker",
      "desc": "Automated daily market gold rate banner paired with GIA/IGI certificate verification lookup tool.",
      "deliverable": "Gold rate ticker and certificate lookup"
    },
    {
      "title": "Private Bridal Styling Appointment Desk",
      "desc": "VIP salon booking form capturing wedding dates, bridal outfit color palettes, and jewelry budget preferences.",
      "deliverable": "High-ticket bridal jewelry consultation funnel"
    }
  ],
  "metaTitle": "Jewellery Website Design Company | Custom Diamond & Gold Boutique Web Development",
  "metaDescription": "Luminous, high-converting website design for fine jewelry stores, diamond ateliers, and bridal boutiques. 4K macro zoom, live gold rate tickers, and VIP bridal appointments.",
  "keywords": [
    "jewellery website design",
    "website designer for jewellery stores",
    "diamond jewelry web design agency",
    "jewellery website development",
    "custom website for jewellery boutiques",
    "jewelry store website design company",
    "professional website for fine jewelry",
    "jewellery website redesign",
    "bridal jewelry boutique website design",
    "custom diamond atelier web development"
  ]
},
  'coworking-spaces': {
  "key": "coworking-spaces",
  "projectId": "coworking-spaces",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · SHARED WORKSPACES",
  "headline": "Websites for Co-Working Spaces That Fill Desks and Book Meeting Rooms.",
  "subheadline": "Vibrant, high-conversion digital platforms engineered for co-working operators, serviced offices, and managed business hubs. 360-degree virtual cabin tours, real-time meeting room booking, and day pass checkout.",
  "targetAudience": [
    "Boutique co-working spaces catering to founders and tech startups",
    "Enterprise managed office operators providing 100+ seat dedicated floors",
    "Creative hubs offering podcast studios, photography spaces, and hot desks",
    "Franchised flexible workspace operators expanding across tier-1 cities"
  ],
  "stats": [
    {
      "value": "360° Tours",
      "label": "Virtual private cabin walkthroughs"
    },
    {
      "value": "Instant Pass",
      "label": "1-click day pass mobile purchase"
    },
    {
      "value": "7 Days",
      "label": "Sprint start to live operational launch"
    },
    {
      "value": "0% Drop-Off",
      "label": "Frictionless meeting room booking"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Founders bounce off static websites because they cannot visualize the energy, natural lighting, and desk layouts.",
      "solution": "Immersive 360-degree virtual tours and high-resolution photo walkthroughs of hot desks and private offices.",
      "metric": "Double in-person space tour requests"
    },
    {
      "num": "02",
      "problem": "Losing hourly meeting room revenue because clients cannot check live room availability and pay online.",
      "solution": "Automated hourly conference room booking calendar with instant online payment and Google Calendar sync.",
      "metric": "Monetize empty meeting rooms 24/7"
    },
    {
      "num": "03",
      "problem": "Corporate enterprise leads looking for 50–200 seats get lost in generic hot-desk inquiry forms.",
      "solution": "Dedicated enterprise managed office intake portal capturing team size, move-in date, and custom IT needs.",
      "metric": "Close high-ticket annual corporate leases"
    }
  ],
  "conversionPillars": [
    {
      "title": "360° Virtual Workspace Tour",
      "desc": "Interactive panoramic viewer showcasing ergonomic hot-desk zones, soundproof phone booths, and breakout lounges.",
      "deliverable": "Virtual co-working space walkthrough"
    },
    {
      "title": "Instant Day Pass & Hot-Desk Checkout",
      "desc": "Frictionless mobile booking engine enabling remote workers to purchase day passes with instant Wi-Fi access codes.",
      "deliverable": "1-click day pass booking workflow"
    },
    {
      "title": "Enterprise Managed Office Requisition Desk",
      "desc": "High-value inquiry funnel for companies requiring private team suites, custom branding, and dedicated leased lines.",
      "deliverable": "Corporate enterprise seating inquiry funnel"
    }
  ],
  "metaTitle": "Coworking Space Website Design | Custom Shared Office Web Development Agency",
  "metaDescription": "High-conversion, dynamic website design for co-working spaces and managed offices. 360 virtual cabin tours, meeting room booking, and enterprise lease funnels.",
  "keywords": [
    "coworking space website design",
    "website designer for coworking spaces",
    "shared office web design agency",
    "coworking website development",
    "custom website for coworking spaces",
    "managed office website design company",
    "professional website for business centers",
    "coworking website redesign",
    "flexible workspace website design",
    "meeting room booking web development"
  ]
},
  'immigration-consultants': {
  "key": "immigration-consultants",
  "projectId": "immigration-consultants",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · IMMIGRATION & VISAS",
  "headline": "Websites for Immigration Consultants That Prove Visa Success and Sign Retainers.",
  "subheadline": "Authoritative, high-trust digital platforms engineered for immigration consultants, visa attorneys, and study abroad advisors. Interactive CRS points calculators, verified passport visa logs, and consultation booking.",
  "targetAudience": [
    "Canada PR (Express Entry / PNP) and Australia PR immigration agencies",
    "US investor visa (EB-5, L-1, E-2) and corporate relocation attorneys",
    "Study abroad educational consultancies placing students in US/UK/Canada",
    "European Golden Visa and citizenship-by-investment advisory firms"
  ],
  "stats": [
    {
      "value": "100% Certified",
      "label": "ICCRC / MARA / OISC licensing proof"
    },
    {
      "value": "Instant Score",
      "label": "Automated points eligibility calculator"
    },
    {
      "value": "7 Days",
      "label": "Brief to live global verified deployment"
    },
    {
      "value": "0% Fraud Fear",
      "label": "Verified visa stamp success case logs"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Immigration is flooded with fly-by-night operators; clients won’t pay ₹1L+ fees without verified licensing proof.",
      "solution": "Prominent licensing badges (ICCRC, MARA) with direct verification links to government immigration registries.",
      "metric": "Establish instant institutional legitimacy"
    },
    {
      "num": "02",
      "problem": "Consultants spend hours answering repetitive basic eligibility questions from unqualified applicants.",
      "solution": "Automated country points calculator (CRS/EAP) that pre-screens candidates before booking consultations.",
      "metric": "Filter out non-eligible applicants"
    },
    {
      "num": "03",
      "problem": "Generic stock photos of passports make agencies look fraudulent and kill overseas client conversions.",
      "solution": "Anonymized real visa approval letters, passport stamping proof, and video client testimonial reels.",
      "metric": "Double consultation booking conversion"
    }
  ],
  "conversionPillars": [
    {
      "title": "Interactive Visa Points Calculator",
      "desc": "Smart evaluation quiz calculating applicant age, education, language scores (IELTS), and work experience points.",
      "deliverable": "Instant immigration eligibility calculator"
    },
    {
      "title": "Verified Visa Grant Proof Gallery",
      "desc": "Structured case archive showcasing recent PR approvals, student visas, and work permits with timeline transparency.",
      "deliverable": "Visa approval evidence showcase"
    },
    {
      "title": "Senior Immigration Counsel Booking Desk",
      "desc": "Paid consultation scheduling engine syncing timezones and collecting applicant CVs prior to strategy calls.",
      "deliverable": "Pre-qualified immigration consultation funnel"
    }
  ],
  "metaTitle": "Immigration Consultant Website Design | Custom Visa Consultancy Web Development",
  "metaDescription": "Authoritative, high-trust website design for immigration consultants and visa agencies. Points calculators, verified visa grant proof, and consultation booking funnels.",
  "keywords": [
    "immigration consultant website design",
    "website designer for visa consultants",
    "immigration web design agency",
    "visa consultancy website development",
    "custom website for immigration agencies",
    "study abroad website design company",
    "professional website for visa attorneys",
    "immigration website redesign",
    "canada pr consultant website design",
    "australia visa consultant web development"
  ]
},
  'solar-companies': {
  "key": "solar-companies",
  "projectId": "solar-companies",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · SOLAR & RENEWABLES",
  "headline": "Websites for Solar EPCs That Calculate Bill Savings and Close Rooftop Contracts.",
  "subheadline": "Engineering-grade, high-conversion digital assets engineered for commercial and residential solar EPC contractors. Interactive monthly electricity bill savings calculators, net-metering guides, and subsidy paperwork funnels.",
  "targetAudience": [
    "Commercial & industrial rooftop solar EPC contractors (50kW–1MW)",
    "Residential on-grid net-metered solar installation companies",
    "Agricultural solar water pumping and off-grid microgrid providers",
    "Solar battery energy storage system (BESS) and backup specialists"
  ],
  "stats": [
    {
      "value": "Instant ROI",
      "label": "Interactive electricity bill savings calculator"
    },
    {
      "value": "0.6s LCP",
      "label": "Sub-second mobile quote configuration"
    },
    {
      "value": "7 Days",
      "label": "Kickoff to live production deployment"
    },
    {
      "value": "Tier-1 Only",
      "label": "Hardware specification & subsidy transparency"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Property owners don’t understand solar jargon (kW, kWh, bifacial, inverter efficiency) and delay purchasing.",
      "solution": "Simple, visual ROI calculator converting current monthly electricity bills into exact 25-year financial savings.",
      "metric": "Turn complex engineering into clear money saved"
    },
    {
      "num": "02",
      "problem": "Homeowners are confused by state DISCOM net-metering policies and central government solar subsidies.",
      "solution": "Step-by-step subsidy eligibility checker detailing exact government grant amounts and net-metering approvals.",
      "metric": "Eliminate bureaucratic hesitation"
    },
    {
      "num": "03",
      "problem": "Industrial buyers doubt engineering quality and fear roof leaks from amateur structural mounting.",
      "solution": "Technical showcase of aluminum mounting structures, wind-load certifications (up to 150 km/h), and leak-proof anchoring.",
      "metric": "Win high-margin multi-lakh commercial projects"
    }
  ],
  "conversionPillars": [
    {
      "title": "Monthly Electric Bill to Solar Savings Calculator",
      "desc": "Interactive slider calculating system kW required, roof area needed, payback period, and 25-year return on investment.",
      "deliverable": "Dynamic solar savings & ROI calculator"
    },
    {
      "title": "Tier-1 Hardware & Inverter Specification Guide",
      "desc": "Transparent comparison tables showcasing panel efficiency degradation curves, microinverters, and 25-year warranties.",
      "deliverable": "Technical solar specification directory"
    },
    {
      "title": "Free Rooftop Solar Survey Request Portal",
      "desc": "Site assessment booking form capturing roof type (flat RCC, metal sheet, tiled), monthly bill amount, and DISCOM provider.",
      "deliverable": "Pre-qualified solar site survey intake funnel"
    }
  ],
  "metaTitle": "Solar Company Website Design | Custom Rooftop Solar EPC Web Development",
  "metaDescription": "Engineering-grade, high-converting website design for solar EPC companies and rooftop solar installers. Electric bill savings calculators, subsidy guides, and survey booking.",
  "keywords": [
    "solar company website design",
    "website designer for solar epc contractors",
    "solar web design agency",
    "solar company website development",
    "custom website for solar installers",
    "rooftop solar website design company",
    "professional website for renewable energy",
    "solar website redesign",
    "commercial solar epc website design",
    "solar savings calculator web development"
  ]
},
  'bakeries-patisseries': {
  "key": "bakeries-patisseries",
  "projectId": "bakeries-patisseries",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · BAKERIES & PATISSERIES",
  "headline": "Websites for Artisanal Patisseries That Sell Out Pre-Orders and Masterclasses.",
  "subheadline": "Delectable, visual-first digital storefronts crafted for artisanal sourdough bakeries, luxury wedding cake studios, and French patisseries. Daily pre-order menus, custom cake order forms, and masterclass registration.",
  "targetAudience": [
    "French patisseries and luxury bespoke wedding cake studios",
    "Artisanal slow-fermented sourdough and viennoiserie bakeries",
    "Custom dessert bars, macaron boutiques, and chocolatiers",
    "Baking academies offering hands-on pastry and bread masterclasses"
  ],
  "stats": [
    {
      "value": "0.4s LCP",
      "label": "Mouthwatering 4K pastry photo load"
    },
    {
      "value": "Daily Drops",
      "label": "Real-time pre-order inventory counters"
    },
    {
      "value": "7 Days",
      "label": "Design sprint to live bakery storefront"
    },
    {
      "value": "100%",
      "label": "Direct guest order and allergy data capture"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Bespoke cake inquiries get buried in chaotic Instagram DMs, losing ₹5,000–₹25,000 celebration cake orders.",
      "solution": "Dedicated custom cake builder capturing guest count, flavor profile, design theme, and delivery date.",
      "metric": "Streamline custom cake commission intake"
    },
    {
      "num": "02",
      "problem": "Daily artisan sourdough and croissants sell out unpredictably, frustrating customers who arrive to empty shelves.",
      "solution": "Daily morning pre-order menu allowing customers to reserve bread loaves the night before with direct payment.",
      "metric": "Sell out 100% of daily inventory before baking"
    },
    {
      "num": "03",
      "problem": "Pastry academies struggle to fill weekend masterclasses without an automated seat reservation system.",
      "solution": "Interactive workshop calendar with live seat countdowns, ingredient kit lists, and instant ticket checkout.",
      "metric": "Fill 100% of pastry academy seats"
    }
  ],
  "conversionPillars": [
    {
      "title": "Bespoke Celebration Cake Customizer",
      "desc": "Interactive order form capturing serving counts, tier sizes, dietary restrictions (eggless, gluten-free), and reference photos.",
      "deliverable": "Custom cake design & order funnel"
    },
    {
      "title": "Daily Fresh Bake Pre-Order Counter",
      "desc": "Fast mobile checkout allowing neighborhood patrons to preorder morning croissants and sourdough baguettes.",
      "deliverable": "Fresh bake daily reservation engine"
    },
    {
      "title": "Pastry Masterclass & Workshop Portal",
      "desc": "Interactive class directory detailing curriculum, chef instructor credentials, and live seat ticketing.",
      "deliverable": "Baking academy workshop enrollment funnel"
    }
  ],
  "metaTitle": "Bakery Website Design Company | Custom Patisserie & Cake Shop Web Development",
  "metaDescription": "Mouthwatering, high-converting website design for artisanal bakeries, patisseries, and custom cake studios. Daily pre-order menus, cake customizers, and masterclass ticketing.",
  "keywords": [
    "bakery website design",
    "website designer for bakeries",
    "patisserie web design agency",
    "bakery website development",
    "custom website for cake shops",
    "bakery website design company",
    "professional website for artisanal bakeries",
    "bakery website redesign",
    "custom wedding cake website design",
    "pastry academy website development"
  ]
},
  'breweries-bars': {
  "key": "breweries-bars",
  "projectId": "breweries-bars",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · BREWERIES & NIGHTLIFE",
  "headline": "Websites for Craft Breweries & Taprooms That Pack Weekend Crowds and Promote Live Gigs.",
  "subheadline": "Atmospheric, high-energy digital platforms engineered for craft microbreweries, rooftop taprooms, and cocktail lounges. Live tap lists with IBU/ABV specs, weekend gig line-ups, and table reservation engines.",
  "targetAudience": [
    "Independent craft microbreweries with signature house brews",
    "Rooftop cocktail lounges and speakeasy cocktail bars",
    "Brewpubs with active live music, comedy, and screening events",
    "Multi-tap beer gardens and craft beverage tasting rooms"
  ],
  "stats": [
    {
      "value": "Live Taps",
      "label": "Real-time tap list with ABV & IBU metrics"
    },
    {
      "value": "0.4s LCP",
      "label": "Sub-second mobile drink menu open speed"
    },
    {
      "value": "7 Days",
      "label": "Kickoff to live production deployment"
    },
    {
      "value": "Zero OTA",
      "label": "Direct table booking without aggregator cuts"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Beer enthusiasts visit brewpubs only to find their favorite seasonal IPA or Stout is out of stock.",
      "solution": "Live digital tap list updating current house beers on tap with flavor profiles, tasting notes, ABV, and IBU.",
      "metric": "Build a loyal craft beer following"
    },
    {
      "num": "02",
      "problem": "Weekend live music gigs and comedy nights go half-empty because events are buried on social media algorithms.",
      "solution": "Prominent gig calendar with artist lineup video previews, cover charge ticketing, and table reservation.",
      "metric": "Pack 100% of weekend event tables"
    },
    {
      "num": "03",
      "problem": "Party organizers planning 50-person corporate mixers give up after calling busy landlines during loud bar hours.",
      "solution": "Corporate event and party package booking desk with transparent per-head food and beverage packages.",
      "metric": "Capture high-ticket corporate party buyouts"
    }
  ],
  "conversionPillars": [
    {
      "title": "Live Craft Beer Tapboard",
      "desc": "Interactive digital board displaying current draft beers with tasting notes, bitterness IBU, alcohol ABV, and brewing hops.",
      "deliverable": "Real-time microbrewery tap list viewer"
    },
    {
      "title": "Live Music & Event Gig Calendar",
      "desc": "Weekly entertainment lineup featuring artist previews, genre filters, and direct RSVP / table reservations.",
      "deliverable": "Taproom live event & gig calendar"
    },
    {
      "title": "Corporate Party & Group Buyout Desk",
      "desc": "Event booking funnel detailing tiered food & craft beverage packages, private section capacities, and AV setups.",
      "deliverable": "Group party and corporate buyout booking funnel"
    }
  ],
  "metaTitle": "Brewery Website Design Company | Custom Brewpub & Taproom Web Development",
  "metaDescription": "High-energy, high-converting website design for craft microbreweries, taprooms, and cocktail lounges. Live tap lists with IBU/ABV, event gig calendars, and table booking.",
  "keywords": [
    "brewery website design",
    "website designer for microbreweries",
    "brewpub web design agency",
    "brewery website development",
    "custom website for taprooms",
    "bar and pub website design company",
    "professional website for cocktail lounges",
    "brewery website redesign",
    "craft beer taproom website design",
    "nightlife event booking web development"
  ]
},
  'security-surveillance': {
  "key": "security-surveillance",
  "projectId": "security-surveillance",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · SECURITY & SURVEILLANCE",
  "headline": "Websites for Security Companies That Win Commercial Manned Guarding & CCTV Contracts.",
  "subheadline": "Commanding, high-trust digital platforms engineered for manned guarding agencies, electronic access control installers, and commercial CCTV surveillance contractors. PSARA compliance badges and security audit intake.",
  "targetAudience": [
    "Manned security guard agencies for tech parks, banks, and gated societies",
    "Commercial CCTV, biometric access control, and turnstile contractors",
    "Perimeter security, boom barrier, and intrusion alarm integrators",
    "VIP executive protection and armed escort security services"
  ],
  "stats": [
    {
      "value": "100% PSARA",
      "label": "Government security licensing compliance"
    },
    {
      "value": "24/7 Command",
      "label": "Central monitoring station showcase"
    },
    {
      "value": "7 Days",
      "label": "Brief to live verified production"
    },
    {
      "value": "0 Vulnerabilities",
      "label": "Static security architecture"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Corporate procurement managers reject security guard agencies that cannot prove valid PSARA licenses and police verifications.",
      "solution": "Prominent display of government PSARA licenses, guard training academy photos, and statutory PF/ESIC compliance badges.",
      "metric": "Prequalify for institutional facility tenders"
    },
    {
      "num": "02",
      "problem": "Gated community and factory managers get confused by complex camera specs (IP vs Analog, NVR channels, night vision range).",
      "solution": "Visual security system package builder detailing camera resolutions, perimeter tripwire AI, and storage days.",
      "metric": "Simplify enterprise surveillance purchasing"
    },
    {
      "num": "03",
      "problem": "Unqualified leads asking for cheap single-camera home repairs tie up senior commercial security engineers.",
      "solution": "Commercial site security audit questionnaire filtering inquiries by property typology, guard count, and camera requirements.",
      "metric": "Target ₹1L–₹10L/mo commercial guard contracts"
    }
  ],
  "conversionPillars": [
    {
      "title": "PSARA Licensing & Guard Verification Vault",
      "desc": "Directory of official security licenses, biometric guard attendance systems, and rigorous physical training curriculums.",
      "deliverable": "Security compliance & accreditation center"
    },
    {
      "title": "Commercial CCTV & Access Control Matrix",
      "desc": "Interactive selector matching facility types (Warehouses, Offices, Schools, Hospitals) with required surveillance architectures.",
      "deliverable": "Electronic security package configurator"
    },
    {
      "title": "Free On-Site Security Vulnerability Audit Desk",
      "desc": "Intake portal for facility directors to request a physical security vulnerability audit and manned guard proposal.",
      "deliverable": "Commercial security contract intake funnel"
    }
  ],
  "metaTitle": "Security Company Website Design | Custom Manned Guarding & CCTV Web Development",
  "metaDescription": "Commanding, high-trust website design for security guard agencies, CCTV installers, and access control contractors. PSARA licensing proof, camera packages, and security audits.",
  "keywords": [
    "security company website design",
    "website designer for security guard agencies",
    "cctv installation web design agency",
    "security service website development",
    "custom website for security companies",
    "surveillance company website design",
    "professional website for manned guarding",
    "security website redesign",
    "psara licensed security agency website",
    "commercial access control web development"
  ]
},
  'hvac-contractors': {
  "key": "hvac-contractors",
  "projectId": "hvac-contractors",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · HVAC & COOLING",
  "headline": "Websites for HVAC Contractors That Close Commercial VRV Projects & Maintenance AMCs.",
  "subheadline": "Engineered, high-conversion digital platforms hand-crafted for commercial HVAC contractors, centralized VRV/VRF installers, and industrial chiller technicians. CFM airflow sizing calculators, equipment specs, and AMC booking.",
  "targetAudience": [
    "Commercial VRV/VRF centralized air conditioning contractors",
    "Industrial process cooling, chiller plant, and cold room engineers",
    "Cleanroom ventilation, HEPA filtration, and hospital HVAC specialists",
    "High-volume residential and commercial AC repair and AMC providers"
  ],
  "stats": [
    {
      "value": "Tonnage Calc",
      "label": "Square-foot cooling tonnage estimator"
    },
    {
      "value": "0.5s LCP",
      "label": "Sub-second mobile emergency service dispatch"
    },
    {
      "value": "7 Days",
      "label": "Discovery to live operational launch"
    },
    {
      "value": "100% Authorized",
      "label": "Daikin, Mitsubishi & Carrier partner badges"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Office facility managers bounce off generic AC repair sites looking for enterprise VRV/VRF and chiller credentials.",
      "solution": "Dedicated commercial HVAC engineering section highlighting duct design, BIM coordination, and tonnage capacity.",
      "metric": "Win ₹10L–₹50L commercial air conditioning bids"
    },
    {
      "num": "02",
      "problem": "Clients delay decisions because they have no idea what capacity (Tonnage/TR) their office or penthouse requires.",
      "solution": "Interactive cooling tonnage calculator estimating TR requirements based on square footage, ceiling height, and sun exposure.",
      "metric": "Educate buyers and accelerate proposal acceptance"
    },
    {
      "num": "03",
      "problem": "Relying only on summer emergency breakdown repairs creates erratic, seasonal revenue dips during winter.",
      "solution": "Annual Maintenance Contract (AMC) subscription builder with transparent preventative maintenance checklists.",
      "metric": "Build predictable year-round AMC cash flow"
    }
  ],
  "conversionPillars": [
    {
      "title": "Cooling Tonnage & Airflow Sizing Calculator",
      "desc": "Interactive engineering widget estimating cooling tonnage (TR) and CFM airflow based on room volume and occupancy.",
      "deliverable": "Dynamic HVAC tonnage estimation tool"
    },
    {
      "title": "Commercial Brand Authorization Showcase",
      "desc": "Authorized dealer and system integrator badges for Daikin, Mitsubishi Electric, Blue Star, Carrier, and Voltas.",
      "deliverable": "OEM partnership credential directory"
    },
    {
      "title": "Commercial AMC Contract Proposal Desk",
      "desc": "Enterprise maintenance funnel capturing current equipment counts, tonnage, and preventative service frequencies.",
      "deliverable": "Commercial HVAC AMC proposal intake funnel"
    }
  ],
  "metaTitle": "HVAC Website Design Company | Custom Commercial AC & Chiller Web Development",
  "metaDescription": "Engineering-grade, high-converting website design for commercial HVAC contractors and VRV/VRF installers. Tonnage calculators, brand authorization proof, and AMC booking.",
  "keywords": [
    "hvac website design",
    "website designer for hvac contractors",
    "commercial ac web design agency",
    "hvac website development",
    "custom website for hvac companies",
    "air conditioning website design company",
    "professional website for chiller technicians",
    "hvac website redesign",
    "vrv vrf air conditioning website design",
    "commercial hvac amc web development"
  ]
},
  'pest-control': {
  "key": "pest-control",
  "projectId": "pest-control",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · PEST MANAGEMENT",
  "headline": "Websites for Pest Control Companies That Lock Annual Retainers & Urgent Dispatches.",
  "subheadline": "Clean, trust-focused digital platforms engineered for professional pest control operators and termite treatment specialists. Non-toxic chemical certifications, pre-construction reticulation diagrams, and online AMC booking.",
  "targetAudience": [
    "Residential termite, bed bug, and cockroach elimination specialists",
    "Commercial HACCP-compliant pest control for restaurants and hotels",
    "Pre-construction subterranean termite reticulation piping contractors",
    "Eco-friendly, child and pet-safe organic pest management services"
  ],
  "stats": [
    {
      "value": "100% Safe",
      "label": "CIB-approved non-toxic chemical badges"
    },
    {
      "value": "0.4s LCP",
      "label": "Sub-second mobile emergency dispatch"
    },
    {
      "value": "7 Days",
      "label": "Sprint start to live operational launch"
    },
    {
      "value": "5-Year Bond",
      "label": "Pre-construction termite warranty proof"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Families worry about hazardous chemical fumes harming infants, elderly parents, or household pets.",
      "solution": "Prominent safety badges highlighting odorless, CIB-approved Bayer chemicals with non-toxic certifications.",
      "metric": "Eliminate health and chemical toxicity fear"
    },
    {
      "num": "02",
      "problem": "Homeowners delay booking because they don’t know whether they need a one-off spray or an annual treatment plan.",
      "solution": "Interactive pest identification quiz guiding users to the exact treatment scope based on infestation signs.",
      "metric": "Double conversion from anxious homeowners"
    },
    {
      "num": "03",
      "problem": "Restaurants risk losing municipal food safety licenses without verified HACCP audit pest logs.",
      "solution": "Dedicated commercial F&B pest management section with compliance audit logs and digital service slips.",
      "metric": "Sign lucrative recurring restaurant AMCs"
    }
  ],
  "conversionPillars": [
    {
      "title": "Interactive Pest Diagnostic Selector",
      "desc": "Visual identification guide allowing customers to identify termites, bed bugs, or wood borers and view treatment roadmaps.",
      "deliverable": "Pest identification & treatment visualizer"
    },
    {
      "title": "Odorless Safety & Chemical Compliance Vault",
      "desc": "Verified list of government-approved chemical formulations, material safety data sheets (MSDS), and warranty terms.",
      "deliverable": "Chemical safety and licensing compliance badge"
    },
    {
      "title": "Residential & Commercial AMC Booking Engine",
      "desc": "Transparent pricing cards for quarterly pest maintenance and 5-year anti-termite warranties with instant WhatsApp dispatch.",
      "deliverable": "Annual pest control subscription booking funnel"
    }
  ],
  "metaTitle": "Pest Control Website Design | Custom Termite Treatment Web Development Agency",
  "metaDescription": "High-converting, trust-focused website design for pest control companies and termite specialists. Chemical safety badges, pest diagnostic quizzes, and annual AMC booking.",
  "keywords": [
    "pest control website design",
    "website designer for pest control companies",
    "pest control web design agency",
    "pest control website development",
    "custom website for termite treatment",
    "pest control company website design",
    "professional website for exterminators",
    "pest control website redesign",
    "commercial pest control website design",
    "termite reticulation piping web development"
  ]
},
  'packers-movers': {
  "key": "packers-movers",
  "projectId": "packers-movers",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · RELOCATION SERVICES",
  "headline": "Websites for Packers & Movers That Prove Reliability and Stop Fraud Suspicions.",
  "subheadline": "High-trust, conversion-engineered digital platforms hand-crafted for professional relocation companies and inter-state logistics fleets. Instant moving cost estimators, GPS fleet tracking proof, and transit insurance clarity.",
  "targetAudience": [
    "Inter-state household goods packing and relocation specialists",
    "Corporate office moving, server room relocation, and plant dismantling",
    "Luxury fine art, piano, and high-value antique movers",
    "Local intra-city tempo fleet and flat shifting service providers"
  ],
  "stats": [
    {
      "value": "Instant Cost",
      "label": "Dynamic relocation price estimator"
    },
    {
      "value": "100% Insured",
      "label": "Verified transit insurance partners"
    },
    {
      "value": "7 Days",
      "label": "Discovery to live operational launch"
    },
    {
      "value": "0 Hidden Fees",
      "label": "Transparent quotation breakdown"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Relocation is plagued by bait-and-switch operators who hold household goods hostage for surprise extra fees.",
      "solution": "Prominent \"Zero Hidden Charges\" guarantee, written fixed-price contracts, and IBA-approved transporter credentials.",
      "metric": "Establish total consumer integrity"
    },
    {
      "num": "02",
      "problem": "Customers waste hours on the phone describing furniture item by item just to get a ballpark moving quote.",
      "solution": "Interactive moving cost calculator allowing users to select BHK size, distance km, and major appliances for instant pricing.",
      "metric": "Capture 3x more qualified relocation leads"
    },
    {
      "num": "03",
      "problem": "Clients fear expensive damage to OLED TVs, double-door refrigerators, and solid wood furniture.",
      "solution": "Multi-layer packing methodology showcase (bubble wrap, corrugated sheets, wooden crating) and transit insurance policies.",
      "metric": "Eliminate moving damage anxiety"
    }
  ],
  "conversionPillars": [
    {
      "title": "Instant Relocation Cost Calculator",
      "desc": "Interactive estimator calculating costs based on origin city, destination, home size (1BHK to 5BHK), and vehicle transport.",
      "deliverable": "Dynamic moving quotation calculator"
    },
    {
      "title": "Multi-Layer Packing Technique Showcase",
      "desc": "Step-by-step visual demonstration of 5-layer packing protection, custom wooden crates, and hydraulic tail-lift loading.",
      "deliverable": "Packing methodology & safety proof module"
    },
    {
      "title": "Corporate Office Relocation Proposal Desk",
      "desc": "Specialized enterprise intake portal for HR heads and facility managers requesting weekend office moving proposals.",
      "deliverable": "Corporate relocation contract intake funnel"
    }
  ],
  "metaTitle": "Packers and Movers Website Design | Custom Relocation Web Development Agency",
  "metaDescription": "High-trust, conversion-focused website design for packers and movers and relocation companies. Instant moving cost calculators, IBA credentials, and corporate moving funnels.",
  "keywords": [
    "packers and movers website design",
    "website designer for packers and movers",
    "relocation company web design agency",
    "packers movers website development",
    "custom website for moving companies",
    "packers and movers website design company",
    "professional website for relocation services",
    "packers and movers website redesign",
    "interstate moving company website design",
    "office shifting services web development"
  ]
},
  'caterers': {
  "key": "caterers",
  "projectId": "caterers",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · GOURMET CATERING",
  "headline": "Websites for Gourmet Caterers That Showcase Live Stations and Book Grand Banquets.",
  "subheadline": "Delectable, high-conversion digital platforms engineered for luxury wedding caterers, corporate culinary teams, and banquet event specialists. Interactive menu curators, live station video reels, and per-plate cost estimators.",
  "targetAudience": [
    "Luxury destination wedding catering companies (500–3,000 guests)",
    "Corporate annual gala and tech summit culinary providers",
    "Artisanal cocktail catering and experiential live station curators",
    "Boutique institutional and private farm-to-table banquet caterers"
  ],
  "stats": [
    {
      "value": "0.6s LCP",
      "label": "High-res culinary photo & live reel speed"
    },
    {
      "value": "Per-Plate",
      "label": "Transparent menu package tiering"
    },
    {
      "value": "7 Days",
      "label": "Design kickoff to live verified deployment"
    },
    {
      "value": "100% Hygiene",
      "label": "FSSAI central food safety licensing"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Couples and corporate planners cannot evaluate taste and presentation from boring PDF text menus.",
      "solution": "Vibrant, high-resolution food photography, live counter video reels, and chef tasting appointment booking.",
      "metric": "Transform menus into mouthwatering experiences"
    },
    {
      "num": "02",
      "problem": "Hosts worry about food running out, unhygienic prep areas, or cold food served at large 1,000-guest weddings.",
      "solution": "Exhaustive hygiene protocol showcase (central commissary kitchen photos, chafing dish heating, live counters).",
      "metric": "Guarantee banquet execution excellence"
    },
    {
      "num": "03",
      "problem": "Lengthy phone negotiations about custom dietary requirements (Jain, Vegan, Gluten-Free) stall bookings.",
      "solution": "Interactive menu curator allowing hosts to build custom multi-cuisine menus and view instant per-plate pricing.",
      "metric": "Shorten booking decision cycle by 60%"
    }
  ],
  "conversionPillars": [
    {
      "title": "Interactive Multi-Cuisine Menu Curator",
      "desc": "Visual menu builder allowing clients to pick starters, main courses, live counters, and artisanal desserts with dietary filters.",
      "deliverable": "Dynamic catering menu builder component"
    },
    {
      "title": "Live Culinary Station & Presentation Showcase",
      "desc": "Video and photographic gallery of interactive chaat counters, wood-fired pizza ovens, and molecular gastronomy setups.",
      "deliverable": "Live banquet culinary station showcase"
    },
    {
      "title": "Grand Banquet Tasting Session Booking Desk",
      "desc": "High-intent booking funnel for wedding couples and corporate committees to schedule a formal chef tasting session.",
      "deliverable": "Wedding catering tasting appointment funnel"
    }
  ],
  "metaTitle": "Catering Website Design Company | Custom Wedding & Corporate Caterer Web Development",
  "metaDescription": "Mouthwatering, high-converting website design for wedding caterers and corporate banquet teams. Interactive menu builders, live culinary station galleries, and tasting session booking.",
  "keywords": [
    "catering website design",
    "website designer for caterers",
    "wedding catering web design agency",
    "catering website development",
    "custom website for catering companies",
    "catering company website design company",
    "professional website for banquet caterers",
    "catering website redesign",
    "corporate catering services website design",
    "luxury outdoor catering web development"
  ]
},
  'daycares-preschools': {
  "key": "daycares-preschools",
  "projectId": "daycares-preschools",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · EARLY CHILDHOOD",
  "headline": "Websites for Montessori Preschools That Comfort Parents and Fill Admissions.",
  "subheadline": "Nurturing, high-trust digital campuses hand-crafted for Montessori preschools, early learning academies, and corporate daycares. Live CCTV access assurances, curriculum philosophies, and campus tour scheduling.",
  "targetAudience": [
    "Authentic AMI-certified Montessori and Reggio Emilia preschools",
    "Corporate infant daycares and after-school activity centers",
    "Bilingual and progressive early childhood developmental academies",
    "Multi-branch premium preschool chains expanding admissions"
  ],
  "stats": [
    {
      "value": "1:5 Ratio",
      "label": "Strict child-to-educator ratio proof"
    },
    {
      "value": "100% Safe",
      "label": "CCTV streaming and childproof safety"
    },
    {
      "value": "7 Days",
      "label": "Sprint start to live admissions deployment"
    },
    {
      "value": "0.5s LCP",
      "label": "Fast mobile campus tour booking"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Anxious millennial parents won’t enroll their 2-year-olds without verifying child safety and teacher background checks.",
      "solution": "Prominent child safety charter detailing pediatric first-aid certifications, CCTV camera access, and sanitized play areas.",
      "metric": "Eliminate parental safety anxiety"
    },
    {
      "num": "02",
      "problem": "Parents cannot differentiate between genuine developmental learning and noisy unstructured play.",
      "solution": "Structured curriculum milestone guide explaining sensory exploration, motor skills, and phonics development.",
      "metric": "Establish educational developmental value"
    },
    {
      "num": "03",
      "problem": "Parents who want to visit the center abandon outdated contact forms that take 3 days for a callback.",
      "solution": "Automated campus tour scheduler letting parents pick morning observation slots with instant WhatsApp confirmation.",
      "metric": "Fill weekend preschool admissions tours"
    }
  ],
  "conversionPillars": [
    {
      "title": "Child Safety & Facility Security Charter",
      "desc": "Comprehensive showcase of biometric entry, rounded furniture, air purifiers, pediatric nurse presence, and parent CCTV apps.",
      "deliverable": "Early childhood safety and hygiene standard"
    },
    {
      "title": "Age-Appropriate Developmental Milestones",
      "desc": "Interactive roadmap detailing curriculum progression from Infant Care (6–18m) to Toddler and Kindergarten readiness.",
      "deliverable": "Preschool curriculum milestone framework"
    },
    {
      "title": "Instant Weekend Campus Tour Booking Desk",
      "desc": "Frictionless visit scheduler capturing child age, parent work location, and desired start term with calendar sync.",
      "deliverable": "Preschool admissions campus tour funnel"
    }
  ],
  "metaTitle": "Preschool Website Design Company | Custom Montessori Daycare Web Development",
  "metaDescription": "Nurturing, high-trust website design for Montessori preschools, daycares, and early learning centers. Safety charters, curriculum milestones, and campus tour booking.",
  "keywords": [
    "preschool website design",
    "website designer for preschools",
    "daycare web design agency",
    "preschool website development",
    "custom website for montessori schools",
    "daycare center website design company",
    "professional website for early learning",
    "preschool website redesign",
    "montessori preschool admissions website",
    "childcare daycare center web development"
  ]
},
  'driving-schools': {
  "key": "driving-schools",
  "projectId": "driving-schools",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · DRIVING ACADEMIES",
  "headline": "Websites for Motor Driving Schools That Fill Batches and Streamline Licensing.",
  "subheadline": "Clear, confidence-inspiring digital platforms engineered for motor driving schools and commercial driving academies. Dual-control vehicle fleet showcases, RTO licensing paperwork guides, and online slot booking.",
  "targetAudience": [
    "Modern motor driving training schools for nervous first-time drivers",
    "Women-focused driving academies with certified female instructors",
    "Commercial heavy transport vehicle (HTV) and bus driving institutes",
    "Advanced defensive driving and highway simulation training centers"
  ],
  "stats": [
    {
      "value": "Dual-Control",
      "label": "Modern certified dual-pedal training fleet"
    },
    {
      "value": "100% Pass",
      "label": "RTO test preparation and track training"
    },
    {
      "value": "7 Days",
      "label": "Discovery to live operational launch"
    },
    {
      "value": "Flexible",
      "label": "Morning 6 AM to evening 8 PM training slots"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Nervous learners fear harsh instructors, unsafe beat-up cars, and complicated manual clutch stalling.",
      "solution": "Fleet transparency showcasing modern dual-control AC hatchbacks and sedans, plus background-verified patient instructors.",
      "metric": "Build confidence in anxious beginners"
    },
    {
      "num": "02",
      "problem": "Learners get overwhelmed by RTO paperwork requirements (Learner License, biometric tests, permanent driving tests).",
      "solution": "Step-by-step RTO documentation checklist explaining age proofs, slot bookings, and test track tips.",
      "metric": "Eliminate bureaucratic RTO confusion"
    },
    {
      "num": "03",
      "problem": "Potential students call during driving sessions when instructors cannot answer the phone, losing signups.",
      "solution": "Interactive package selector allowing students to choose manual vs automatic, select batch timings, and enroll online.",
      "metric": "Capture 24/7 online driving course enrollments"
    }
  ],
  "conversionPillars": [
    {
      "title": "Modern Dual-Control Training Fleet",
      "desc": "Photographic catalog detailing dual-pedal safety vehicles, automatic vs manual transmission options, and dashcams.",
      "deliverable": "Training fleet and safety spec showcase"
    },
    {
      "title": "RTO Driving License Step-by-Step Roadmap",
      "desc": "Interactive guide outlining the journey from Learner’s License (LL) application to final RTO driving test track approval.",
      "deliverable": "RTO licensing process checklist"
    },
    {
      "title": "Driving Course Package & Timing Selector",
      "desc": "Course selector with transparent pricing for beginner, intermediate refresher, and commercial heavy vehicle modules.",
      "deliverable": "Driving course enrollment and slot booking funnel"
    }
  ],
  "metaTitle": "Driving School Website Design | Custom Motor Driving Academy Web Development",
  "metaDescription": "High-converting, confidence-inspiring website design for motor driving schools and academies. Dual-control fleet showcases, RTO licensing guides, and course enrollment.",
  "keywords": [
    "driving school website design",
    "website designer for driving schools",
    "driving academy web design agency",
    "driving school website development",
    "custom website for motor driving schools",
    "driving school website design company",
    "professional website for driving instructors",
    "driving school website redesign",
    "automatic car driving school website design",
    "motor driving training web development"
  ]
},
  'optometry-eyewear': {
  "key": "optometry-eyewear",
  "projectId": "optometry-eyewear",
  "heroBadge": "⚡ 7-DAY BESPOKE PRODUCTION SPRINT · OPTOMETRY & EYEWEAR",
  "headline": "Websites for Optometrists & Eyewear Boutiques That Book Eye Tests & Sell Frames.",
  "subheadline": "Visionary, high-precision digital storefronts crafted for independent optometry clinics and luxury designer eyewear boutiques. Digital prescription booking, frame shape visualizer guides, and luxury brand showcases.",
  "targetAudience": [
    "Independent optometry practices and clinical eye examination studios",
    "Luxury designer eyewear boutiques (Gucci, Tom Ford, Lindberg, Ray-Ban)",
    "Pediatric myopia control and orthokeratology specialty opticians",
    "High-performance sports eyewear and progressive lens specialists"
  ],
  "stats": [
    {
      "value": "4K Frames",
      "label": "High-res designer eyewear catalog"
    },
    {
      "value": "0.5s LCP",
      "label": "Sub-second eye test booking response"
    },
    {
      "value": "7 Days",
      "label": "Design sprint to live verified launch"
    },
    {
      "value": "Clinical Grade",
      "label": "Advanced digital eye exam equipment proof"
    }
  ],
  "problems": [
    {
      "num": "01",
      "problem": "Shoppers browse frames on discount e-commerce apps instead of visiting local independent opticians.",
      "solution": "Promote comprehensive clinical eye examinations (corneal topography, retinal imaging) that online stores cannot offer.",
      "metric": "Position eye health expertise over cheap frames"
    },
    {
      "num": "02",
      "problem": "Customers have no idea which frame shapes fit their face shape (oval, round, square), leading to shopping hesitation.",
      "solution": "Interactive face shape frame styling guide recommending matching geometries and lens thicknesses.",
      "metric": "Guide buyers to confident high-ticket choices"
    },
    {
      "num": "03",
      "problem": "Patients needing progressive lenses fear dizziness and adaptation issues from poor digital measurements.",
      "solution": "Showcase of 3D digital pupillary fitting technology, anti-fatigue lenses, and adaptation guarantees.",
      "metric": "Sell premium ₹15,000+ progressive lens packages"
    }
  ],
  "conversionPillars": [
    {
      "title": "Comprehensive 12-Step Eye Examination Showcase",
      "desc": "Visual walkthrough of computerized autorefractors, slit lamps, glaucoma tonometer testing, and dry eye assessments.",
      "deliverable": "Clinical optometry diagnostic workflow"
    },
    {
      "title": "Face Shape & Frame Styling Selector",
      "desc": "Interactive styling tool matching round, square, and heart face profiles with flattering designer frame silhouettes.",
      "deliverable": "Eyewear styling & frame fitting guide"
    },
    {
      "title": "Comprehensive Eye Exam & Styling Appointment Desk",
      "desc": "Online consultation scheduler capturing current prescription history, vision symptoms, and preferred time slots.",
      "deliverable": "Optometry eye test booking funnel"
    }
  ],
  "metaTitle": "Optometry Website Design Company | Custom Eyewear Boutique Web Development",
  "metaDescription": "Precision-engineered, high-converting website design for optometrists, eye clinics, and boutique optical stores. Eye test booking, frame styling guides, and lens showcases.",
  "keywords": [
    "optometry website design",
    "website designer for opticians",
    "eyewear boutique web design agency",
    "optical store website development",
    "custom website for optometrists",
    "eyewear website design company",
    "professional website for optical clinics",
    "optometry website redesign",
    "designer eyewear boutique website design",
    "eye examination booking web development"
  ]
},
};

export function getNicheLandingData(slugOrKey: string): NicheLandingConfig | undefined {
  const normalized = slugOrKey.toLowerCase().trim();
  // Direct key lookup
  if (normalized in NICHE_LANDING_DATA) {
    return NICHE_LANDING_DATA[normalized as keyof typeof NICHE_LANDING_DATA];
  }
  // Lookup by projectId
  for (const item of Object.values(NICHE_LANDING_DATA)) {
    if (item.projectId === normalized) {
      return item;
    }
  }
  // Lookup by common aliases
  const aliasMap: Record<string, keyof typeof NICHE_LANDING_DATA> = {
    'interior-design': 'interior-designers',
    'interiors': 'interior-designers',
    'property': 'real-estate',
    'dental': 'dental-clinics',
    'dentist': 'dental-clinics',
    'dentists': 'dental-clinics',
    'wedding': 'wedding-photographers',
    'wedding-photography': 'wedding-photographers',
    'renovation': 'home-renovation',
    'modular-kitchen': 'home-renovation',
    'home-services': 'home-services',
    'contractor': 'home-services',
    'contractors': 'home-services',
    'tank-cleaning': 'home-services',
    'water-tank-cleaning': 'home-services',
    'pool-cleaning': 'home-services',
    'swimming-pool-cleaning': 'home-services',
    'cleaning-services': 'home-services',
    'hvac': 'home-services',
    'pest-control': 'home-services',
    'plumbing': 'home-services',
    'coaching': 'coaches-consultants',
    'consultants': 'coaches-consultants',
    'coaching-academy': 'educational-academy',
    'academy': 'educational-academy',
    'education': 'educational-academy',
    'gym': 'gym-fitness-club',
    'fitness-club': 'gym-fitness-club',
    'gym-fitness': 'gym-fitness-club',
    'b2b': 'business-portfolio',
    'business': 'business-portfolio',
    'business-consulting': 'business-portfolio',
    'spa': 'spa-wellness',
    'wellness': 'spa-wellness',
    'salon': 'salon-beauty',
    'beauty': 'salon-beauty',
    'trainer': 'fitness-coach',
    'personal-trainer': 'fitness-coach',
    'yoga': 'yoga-meditation',
    'yoga-studio': 'yoga-meditation',
    'creative': 'creative-portfolio',
    'agency': 'creative-portfolio',
    'creative-agency': 'creative-portfolio',
    'pathology': 'healthcare-diagnostics',
    'diagnostics': 'healthcare-diagnostics',
    'diagnostics-pathology': 'healthcare-diagnostics',
    'polyclinic': 'clinic-polyclinic',
    'clinic': 'clinic-polyclinic',
    'doctor': 'doctor-specialist',
    'surgeon': 'doctor-specialist',
  };

  if (normalized in aliasMap) {
    return NICHE_LANDING_DATA[aliasMap[normalized]];
  }

  return undefined;
}
