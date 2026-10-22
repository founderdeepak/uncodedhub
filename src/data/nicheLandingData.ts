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
    metaTitle: 'Bespoke Websites for Interior Designers & Architects | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Hand-coded, sub-second web platforms for luxury interior architects & studios. 3D render-to-reality showcases, itemized procurement transparency, and zero WordPress bloat.',
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
    metaTitle: 'Bespoke Websites for Real Estate Advisors & Brokers | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Independent luxury web platforms for prime property consultants and brokerages. 14-point title verification audits, off-market vaults, and zero portal dependency.',
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
    metaTitle: 'Bespoke Websites for Dental Clinics & Aesthetic Practices | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Specialized web platforms for cosmetic dentists & clinics. Patient stop-signal protocols, upfront fee calculators, Class-B sterilisation proof, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Wedding Photographers & Filmmakers | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Luxury web platforms for destination wedding photographers & cinematographers. 0.7s LCP 4K galleries, HLS video streaming, and seasonal date booking funnels.',
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
    metaTitle: 'Bespoke Websites for Home Renovation & Modular Kitchens | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'High-converting web platforms for home remodelers & modular kitchen contractors. Material transparency disclosures, before/after sliders, and 7-day launch.',
    keywords: [
      'renovation contractor website design',
      'modular kitchen website',
      'home remodeling web platform',
      'renovation business website 7 days',
      'modular interior contractor portfolio',
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
    metaTitle: 'Bespoke Websites for Coaches & Consultants | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'High-authority web platforms for executive coaches & strategy consultants. Multi-step application funnels, proprietary framework showcases, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Educational Academies & Coaching | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'High-converting web platforms for educational institutes & coaching academies. Real-time batch navigators, verified ranker vaults, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Gyms & Fitness Clubs | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'High-energy web platforms for commercial gyms & strength clubs. Peak-hour capacity HUDs, upfront membership pricing, 1-day VIP passes, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Corporate Advisory & B2B Consulting | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Institutional web platforms for M&A advisors and corporate consultants. Deal tombstones, C-suite diagnostics, strict confidentiality, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Luxury Spas & Wellness Retreats | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Calming web platforms for luxury spas & Ayurvedic retreats. Tension-zone treatment builders, private suite previews, transparent menus, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Salons & Bridal Beauty Studios | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'High-fashion web platforms for luxury hair salons & bridal artists. Unretouched skin sliders, bridal quote estimators, 1-tap WhatsApp booking, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Private Fitness Coaches | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'High-converting web platforms for elite personal trainers & fitness coaches. Capped-roster intake audits, DEXA progress vaults, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Yoga Shalas & Meditation Sanctuaries | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Authentic web platforms for yoga shalas & meditation studios. Class capacity timetables, 200-hour TTC curriculum explorers, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Creative Studios & Design Agencies | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'High-performance web platforms for creative agencies & studios. 100/100 Lighthouse scores, interactive scope estimators, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Pathology & Diagnostic Labs | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Medical-grade web platforms for diagnostic labs & pathology centres. Home phlebotomy booking funnels, automated equipment showcases, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Multi-Specialty Polyclinics | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'High-converting web platforms for polyclinics & outpatient centres. Live doctor schedules, department navigators, zero-wait booking, and 7-day launch.',
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
    metaTitle: 'Bespoke Websites for Super-Specialist Doctors & Surgeons | Built in 7 Days — Uncoded Hub',
    metaDescription:
      'Prestige web platforms for specialist surgeons & physicians. Pre-consultation symptom screeners, transparent hospital fee guides, and 7-day launch.',
    keywords: [
      'doctor website design',
      'surgeon portfolio website',
      'specialist doctor web platform',
      'medical practice website 7 days',
      'orthopaedic surgeon website design',
    ],
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
