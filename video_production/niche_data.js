// Video Production Configuration for all 17 Niches + Master Intro
export const NICHES_VIDEO_CONFIG = [
  {
    key: 'interior-designers',
    nicheName: 'Interior Designers & Architects',
    demoFile: 'Demo Website Template for 6 NIches/meridian-interiors-demo.html',
    brandName: 'Meridian Interiors',
    hookProblem: 'Generic portfolio sites kill 65% of high-ticket interior design inquiries before discovery.',
    heroMetric: '₹15L - ₹80L Client Engagements',
    speedMetric: '0.8s Gallery Load',
    themes: [
      { id: 'warm-heritage', label: 'Warm Heritage', font: 'Cormorant Garamond', vibe: 'Organic linen, warm brass, tactile architecture' },
      { id: 'obsidian-luxe', label: 'Obsidian Luxe', font: 'Cinzel + Gold', vibe: 'Midnight black, 24K gold accents, ultra-prime residential' },
      { id: 'avant-garde', label: 'Avant-Garde Minimal', font: 'Editorial Serif', vibe: 'Museum-grade editorial layout with bold monochrome' }
    ],
    features: ['3D Render vs Reality Slider', 'Itemized Trade Estimate Calculator', 'Client Intake Questionnaire'],
    ctaText: 'Get your bespoke interior studio website live in 7 days.'
  },
  {
    key: 'real-estate',
    nicheName: 'Real Estate Brokers & Developers',
    demoFile: 'Demo Website Template for 6 NIches/marlow-realty-demo.html',
    brandName: 'Marlow Realty Group',
    hookProblem: 'Property portals hold your brand hostage with lead competition and 3.5% commission fees.',
    heroMetric: '100% Direct Buyer Retainage',
    speedMetric: '0.6s Instant Listing Search',
    themes: [
      { id: 'heritage-navy', label: 'Royal Atlantic Navy', font: 'Playfair + Outfit', vibe: 'Institutional trust, high net worth real estate' },
      { id: 'manhattan-dark', label: 'Manhattan Midnight', font: 'Space Grotesk', vibe: 'Sleek luxury penthouse aesthetic with neon accents' },
      { id: 'coastal-minimal', label: 'Coastal Minimal', font: 'Inter Display', vibe: 'Sunlit modern architecture and clean property grids' }
    ],
    features: ['Instant EMI & Mortgage Calculator', 'Interactive Floorplan Viewer', 'VIP WhatsApp Showing Booking'],
    ctaText: 'Own your digital property storefront. Live in 7 days.'
  },
  {
    key: 'wedding-photographers',
    nicheName: 'Luxury Wedding Photographers',
    demoFile: 'Demo Website Template for 6 NIches/alder-wren-photography-demo.html',
    brandName: 'Alder & Wren Fine Art',
    hookProblem: 'Instagram algorithms compress your 4K bridal albums and bury your booking packages.',
    heroMetric: '₹3L - ₹12L Multi-Day Bookings',
    speedMetric: '0.9s Full-Bleed 4K Rendering',
    themes: [
      { id: 'editorial-linen', label: 'Editorial Linen', font: 'Cormorant Garamond', vibe: 'Fine-art editorial magazine framing with warm tones' },
      { id: 'cinematic-noir', label: 'Cinematic Noir', font: 'Cinzel Decorative', vibe: 'Deep romantic shadow contrasts for dramatic wedding stories' },
      { id: 'tuscany-sun', label: 'Tuscany Sunburst', font: 'Playfair Display', vibe: 'Sun-drenched destination wedding warmth' }
    ],
    features: ['Multi-Day Itinerary Package Builder', 'Real Bride Testimonial Reel', 'Availability Date Checker'],
    ctaText: 'Turn bridal inquiries into high-ticket bookings in 7 days.'
  },
  {
    key: 'coaches-consultants',
    nicheName: 'Executive Coaches & Consultants',
    demoFile: 'Demo Website Template for 6 NIches/naomi-reyes-coaching-demo.html',
    brandName: 'Naomi Reyes Advisory',
    hookProblem: 'Low-ticket Linktree pages and Canva PDFs make 7-figure founders pass on your advisory.',
    heroMetric: '$10k - $50k Advisory Retainers',
    speedMetric: '100/100 Core Web Vitals',
    themes: [
      { id: 'executive-slate', label: 'Executive Slate', font: 'Inter + Outfit', vibe: 'Clean Wall-Street clarity, zero fluff, pure authority' },
      { id: 'summit-dark', label: 'Summit Dark', font: 'Plus Jakarta Sans', vibe: 'High-focus dark mode designed for tech and C-suite leaders' },
      { id: 'sage-clarity', label: 'Sage Mindset', font: 'DM Serif Display', vibe: 'Calm transformational psychology and leadership balance' }
    ],
    features: ['Vetted Assessment Funnel', 'Client ROI & Impact Dashboard', 'Calendar Booking Integration'],
    ctaText: 'Command high-ticket consulting retainers. Built in 7 days.'
  },
  {
    key: 'dental-clinics',
    nicheName: 'Dental Clinics & Implant Centers',
    demoFile: 'Demo Website Template for 6 NIches/willowmere-dental-demo.html',
    brandName: 'Willowmere Dental & Smile Studio',
    hookProblem: 'Scary medical jargon and dated doctor directories drive cosmetic patients to competitors.',
    heroMetric: '₹50k - ₹3L Smile Makeovers',
    speedMetric: '0.7s Fast Mobile Intake',
    themes: [
      { id: 'clinical-sky', label: 'Clinical Sky Clarity', font: 'Plus Jakarta Sans', vibe: 'Pristine, hygienic, anxiety-reducing soft medical blue' },
      { id: 'smilestudio-luxe', label: 'Cosmetic Studio Luxe', font: 'Syne Serif', vibe: 'High-end aesthetic dental boutique with gold accents' },
      { id: 'emerald-care', label: 'Botanical Wellness', font: 'Outfit', vibe: 'Gentle organic holistic family dentistry' }
    ],
    features: ['Invisalign & Implant Cost Estimator', 'Interactive Before/After Smile Slider', 'Instant Emergency Booking'],
    ctaText: 'Fill your dental appointment book with high-ticket patients in 7 days.'
  },
  {
    key: 'home-renovation',
    nicheName: 'Home Renovation & Modular Builders',
    demoFile: 'Demo Website Template for 6 NIches/halbrook-renovation-demo.html',
    brandName: 'Halbrook Renovation & Design',
    hookProblem: 'Contractor ghosting and hidden variation fees make homeowners terrified to start remodeling.',
    heroMetric: '₹8L - ₹45L Turnkey Remodels',
    speedMetric: '0.8s Interactive Estimator',
    themes: [
      { id: 'craft-slate', label: 'Master Builder Slate', font: 'Plus Jakarta Sans', vibe: 'Precision engineering, architectural steel, robust trust' },
      { id: 'warm-terracotta', label: 'Artisan Terracotta', font: 'DM Serif Display', vibe: 'Warm natural timber, kitchen craftsmanship, home warmth' },
      { id: 'modern-graphite', label: 'Modern Graphite', font: 'Space Grotesk', vibe: 'Contemporary smart-home remodeling with crisp geometry' }
    ],
    features: ['Room-by-Room Renovation Calculator', 'Milestone Payment Transparency', 'Live 3D Project Tracking'],
    ctaText: 'Build homeowner trust that wins big contracts. Live in 7 days.'
  },
  {
    key: 'educational-academy',
    nicheName: 'Educational Academies & Institutes',
    demoFile: 'Demo Website Template for New Niches/01_educational_academy_demo.html',
    brandName: 'Apex International Academy',
    hookProblem: 'Cluttered PDF brochures and sluggish sites make ambitious parents doubt your academic quality.',
    heroMetric: 'Top 1% Board & Olympiad Ranks',
    speedMetric: '0.7s Parent Portal Speed',
    themes: [
      { id: 'oxford-academic-navy', label: 'Oxford Academic Navy', font: 'Cormorant Garamond', vibe: 'Ivy League heritage, prestigious faculty, serious scholarship' },
      { id: 'cyber-stem-dark', label: 'Cyber STEM Dark', font: 'Space Grotesk', vibe: 'Futuristic AI test analytics and competitive coding academy' },
      { id: 'campus-clarity-emerald', label: 'Campus Clarity Emerald', font: 'Syne Sans', vibe: 'Vibrant modern campus, holistic student growth' }
    ],
    features: ['Merit Scholarship Fee Calculator', 'Faculty Credential Showcase', 'Batch Seat Availability Tracker'],
    ctaText: 'Attract serious parents and top students. Built in 7 days.'
  },
  {
    key: 'gym-fitness-club',
    nicheName: 'Premium Gyms & Fitness Clubs',
    demoFile: 'Demo Website Template for New Niches/02_gym_fitness_club_demo.html',
    brandName: 'IronForge Athletic Club',
    hookProblem: 'Instagram gym accounts never convert casual scrollers into recurring annual memberships.',
    heroMetric: '3.4x Annual Membership Signups',
    speedMetric: '0.6s Instant Pass Checkout',
    themes: [
      { id: 'forge-industrial-black', label: 'Forge Industrial Black', font: 'Barlow Condensed', vibe: 'Raw steel, high-performance training, aggressive energy' },
      { id: 'neon-kinetic-amber', label: 'Neon Kinetic Amber', font: 'Syne Display', vibe: 'Electrifying HIIT nightclub workout atmosphere' },
      { id: 'nordic-strength-ice', label: 'Nordic Strength Ice', font: 'Plus Jakarta Sans', vibe: 'Clean minimalist Scandinavian functional fitness' }
    ],
    features: ['Interactive BMI & Body Fat Calculator', 'Daily Class Schedule Timetable', '1-Day Free Pass Claim Funnel'],
    ctaText: 'Pack your gym floor with loyal members. Launched in 7 days.'
  },
  {
    key: 'business-portfolio',
    nicheName: 'B2B Companies & Enterprise Portfolios',
    demoFile: 'Demo Website Template for New Niches/03_business_portfolio_demo.html',
    brandName: 'Vanguard Industrial Technologies',
    hookProblem: 'Outdated legacy corporate websites disqualify your enterprise bids before the RFP review.',
    heroMetric: '₹50L - ₹5Cr Enterprise Contracts',
    speedMetric: '100% Zero-Vulnerability Build',
    themes: [
      { id: 'corporate-steel', label: 'Corporate Titanium', font: 'Plus Jakarta Sans', vibe: 'Enterprise reliability, Fortune-500 trust, clean data tables' },
      { id: 'dark-cyber-ops', label: 'Dark Cyber Operations', font: 'Space Grotesk', vibe: 'Defense and deep-tech precision engineering' },
      { id: 'clean-emerald-b2b', label: 'Venture Clean Slate', font: 'Inter Display', vibe: 'High-growth B2B SaaS and venture-backed elegance' }
    ],
    features: ['Enterprise ROI Value Calculator', 'Client Case Study Sliders', 'NDA Request & RFP Intake Form'],
    ctaText: 'Win enterprise procurement and commercial bids. Ready in 7 days.'
  },
  {
    key: 'spa-wellness',
    nicheName: 'Luxury Spas & Wellness Sanctuaries',
    demoFile: 'Demo Website Template for New Niches/04_spa_wellness_sanctuary_demo.html',
    brandName: 'Aura Sanctuary & Thermal Spa',
    hookProblem: 'Chaotic booking sites ruin the peaceful relaxation experience before guests even arrive.',
    heroMetric: 'High-Yield Couples Rituals',
    speedMetric: '0.8s Serene Smooth Scroll',
    themes: [
      { id: 'botanical-zen', label: 'Botanical Zen Earth', font: 'Cormorant Garamond', vibe: 'Warm eucalyptus, hot stone therapy, tranquil earth tones' },
      { id: 'midnight-hydrotherapy', label: 'Midnight Hydrotherapy', font: 'Cinzel Luxe', vibe: 'Private candlelit luxury suites and thermal pools' },
      { id: 'minimal-aloe', label: 'Minimal Aloe Pure', font: 'DM Sans', vibe: 'Clean clinical dermatology and organic holistic retreat' }
    ],
    features: ['Ritual Customizer & Cost Estimator', 'Therapist Bio & Specialty Picker', 'Seamless Instant Gift Card Buy'],
    ctaText: 'Turn relaxation seekers into booked sanctuary guests in 7 days.'
  },
  {
    key: 'salon-beauty',
    nicheName: 'High-End Salons & Beauty Studios',
    demoFile: 'Demo Website Template for New Niches/05_salon_beauty_studio_demo.html',
    brandName: 'Maison Glow Hair & Beauty',
    hookProblem: 'Lost DMs and disorganized phone bookings cause thousands in lost bridal and color appointments.',
    heroMetric: 'Zero Double-Bookings Guaranteed',
    speedMetric: '0.5s Mobile Stylist Picker',
    themes: [
      { id: 'haute-couture-rose', label: 'Haute Couture Rose', font: 'Playfair Display', vibe: 'Parisian fashion week glamor, rose champagne luxury' },
      { id: 'soho-minimal-dark', label: 'SoHo Studio Dark', font: 'Syne Display', vibe: 'Edgy downtown salon, neon mirrors, modern hair artistry' },
      { id: 'clean-aesthetician', label: 'Clean Aesthetician Ivory', font: 'Plus Jakarta Sans', vibe: 'Organic hair care, dermatological treatments, soft glow' }
    ],
    features: ['Bridal Makeover Package Builder', 'Senior Stylist Portfolio Showcase', 'Real-Time Appointment Calendar'],
    ctaText: 'Keep your salon chairs booked weeks in advance. Live in 7 days.'
  },
  {
    key: 'fitness-coach',
    nicheName: 'Online Fitness Coaches & Personal Trainers',
    demoFile: 'Demo Website Template for New Niches/06_fitness_coach_trainer_demo.html',
    brandName: 'Kaelen Vance Peak Physique',
    hookProblem: 'Cookie-cutter coaching forms make busy professionals question your program quality.',
    heroMetric: '12-Week High-Ticket Transformations',
    speedMetric: '0.7s Fast Mobile Application',
    themes: [
      { id: 'iron-grit-dark', label: 'Iron Grit Performance', font: 'Barlow Heavy', vibe: 'Aggressive fat loss, heavy strength, relentless accountability' },
      { id: 'kinetic-volt', label: 'Kinetic Volt Electric', font: 'Space Grotesk', vibe: 'High-energy athletic conditioning and macro tracking' },
      { id: 'vitality-clean', label: 'Vitality Longevity', font: 'Outfit Sans', vibe: 'Executive posture, fat loss, sustainable healthy longevity' }
    ],
    features: ['Macro & Calorie Target Calculator', 'Verified Client Transformation Sliders', 'Application Intake Screening'],
    ctaText: 'Scale your high-ticket online coaching roster in 7 days.'
  },
  {
    key: 'yoga-meditation',
    nicheName: 'Yoga Studios & Meditation Retreats',
    demoFile: 'Demo Website Template for New Niches/07_yoga_meditation_studio_demo.html',
    brandName: 'Prana Veda Holistic Shala',
    hookProblem: 'Cluttered gym-style portals disrupt the spiritual calm and sacred intention of practice.',
    heroMetric: 'Sold-Out Weekend Immersions',
    speedMetric: '0.8s Breathing Transition Speed',
    themes: [
      { id: 'sacred-terracotta', label: 'Sacred Terracotta Clay', font: 'Cormorant Garamond', vibe: 'Vedic roots, warm morning clay, authentic tradition' },
      { id: 'zen-bamboo-stone', label: 'Zen Bamboo & Moss', font: 'DM Serif Display', vibe: 'Japanese rock garden tranquility and sound therapy' },
      { id: 'lotus-minimal-light', label: 'Lotus Minimalist Light', font: 'Plus Jakarta Sans', vibe: 'Airy sunlit studio, mindful breathwork and clarity' }
    ],
    features: ['Shala Class Level Guide', 'Teacher Training (TTC) Curriculum', 'Pass & Drop-in Reservation'],
    ctaText: 'Inspire dedicated practitioners to join your shala in 7 days.'
  },
  {
    key: 'creative-portfolio',
    nicheName: 'Creative Directors, Artists & Photographers',
    demoFile: 'Demo Website Template for New Niches/08_creative_portfolio_demo.html',
    brandName: 'Studio Mono Creative Works',
    hookProblem: 'Standard Squarespace templates make world-class art directors look like amateur students.',
    heroMetric: 'Commercial Agency Commisions',
    speedMetric: '0.6s High-FPS Visual Motion',
    themes: [
      { id: 'gallery-brutalism', label: 'Gallery Brutalism', font: 'Syne ExtraBold', vibe: 'High-fashion kinetic typography, bold contrast, raw edge' },
      { id: 'curator-mono', label: 'Curator Monochrome', font: 'Space Mono', vibe: 'Minimal Swiss typography and clean architectural grid' },
      { id: 'neon-surrealist', label: 'Neon Surrealist Dark', font: 'Outfit', vibe: 'Immersive dark canvas for 3D CGI and brand visual effects' }
    ],
    features: ['Full-Screen Lightbox Showcase', 'Brand Client Credit Reel', 'Direct Commission Inquiry Vault'],
    ctaText: 'Showcase your creative genius without template limitations. In 7 days.'
  },
  {
    key: 'healthcare-diagnostics',
    nicheName: 'Diagnostics Labs & Pathology Centers',
    demoFile: 'Demo Website Template for New Niches/09_healthcare_diagnostics_demo.html',
    brandName: 'AccuCheck Molecular Diagnostics',
    hookProblem: 'Confusing test lists and broken report download portals force patients to rival hospitals.',
    heroMetric: 'NABL-Accredited Accuracy',
    speedMetric: '0.6s Home Sample Booking',
    themes: [
      { id: 'clinical-trust-navy', label: 'Molecular Trust Navy', font: 'Plus Jakarta Sans', vibe: 'Accredited clinical authority, sterile precision' },
      { id: 'biotech-cyan-dark', label: 'Biotech Cyber Cyan', font: 'Space Grotesk', vibe: 'Advanced genetic testing, automated pathology labs' },
      { id: 'family-health-warm', label: 'Family Preventive Care', font: 'Outfit', vibe: 'Warm accessible wellness checks for parents and seniors' }
    ],
    features: ['Home Blood Collection Slot Picker', 'Test Package Price Comparison', 'Instant 1-Click Report Download'],
    ctaText: 'Simplify lab testing and win patient trust in 7 days.'
  },
  {
    key: 'clinic-polyclinic',
    nicheName: 'Multi-Specialty Clinics & Healthcare Centers',
    demoFile: 'Demo Website Template for New Niches/10_clinic_polyclinic_demo.html',
    brandName: 'MetroCare Polyclinic & Surgical Center',
    hookProblem: 'Endless hold music and confusing reception lines push anxious families away.',
    heroMetric: '15+ Medical Specialties Under One Roof',
    speedMetric: '0.7s Fast Doctor Finder',
    themes: [
      { id: 'metro-medical-teal', label: 'Metro Medical Teal', font: 'Plus Jakarta Sans', vibe: 'Modern hospital care, compassionate reassurance' },
      { id: 'premier-physician-navy', label: 'Premier Physician Navy', font: 'Cormorant Garamond', vibe: 'Super-specialist surgical prestige and clinical renown' },
      { id: 'pediatric-wellness-soft', label: 'Community Wellness Soft', font: 'Outfit', vibe: 'Gentle family medicine and friendly outpatient care' }
    ],
    features: ['Department & Specialty Directory', 'Doctor OPD Schedule Checker', 'Zero-Wait Token Booking'],
    ctaText: 'Elevate your polyclinic into the area’s premier healthcare choice in 7 days.'
  },
  {
    key: 'doctor-specialist',
    nicheName: 'Super-Specialist Doctors & Surgeons',
    demoFile: 'Demo Website Template for New Niches/11_doctor_specialist_demo.html',
    brandName: 'Dr. Alistair Sterling, Senior Neurosurgeon',
    hookProblem: 'Generic hospital directory blurbs fail to communicate your specialized surgical excellence.',
    heroMetric: '20+ Years Surgical Renown',
    speedMetric: 'Sub-Second Private Patient Intake',
    themes: [
      { id: 'oxford-surgeon-blue', label: 'Oxford Surgical Navy', font: 'Cormorant Garamond', vibe: 'World-renowned medical fellowship and academic authority' },
      { id: 'precision-slate-dark', label: 'Precision Tech Dark', font: 'Space Grotesk', vibe: 'Minimally invasive robotic surgery and cutting-edge tech' },
      { id: 'compassionate-ivory', label: 'Consultation Room Warmth', font: 'Plus Jakarta Sans', vibe: 'Empathetic patient clarity for complex diagnoses' }
    ],
    features: ['Second Opinion Teleconsult Portal', 'Surgical Outcome Statistics', 'Verified Patient Recovery Stories'],
    ctaText: 'Position your medical specialization with unquestioned authority in 7 days.'
  }
];

export const MASTER_INTRO_CONFIG = {
  title: 'UNCODED HUB: The Sovereign Web Standard',
  durationSeconds: 120,
  tagline: 'Your Handcrafted, Zero-Bloat Digital Flagship Live in 7 Days — Or It’s 100% Free.',
  keyPillars: [
    { title: 'Handcrafted React Architecture', desc: 'Zero WordPress. Zero Elementor. Sub-second 100/100 Lighthouse performance.' },
    { title: '17 Dedicated Industry Silos', desc: 'Each industry gets a bespoke conversion engine tailored to its buyers.' },
    { title: '3 Curated Design Themes Per Niche', desc: 'Never look like a generic template. Bespoke typography, palettes, and styling.' },
    { title: 'Zero-Vendor Lock-in', desc: '100% code ownership. Zero recurring agency maintenance fees.' },
    { title: 'Guaranteed 7-Day Handover', desc: 'Late means FREE. Clear day-by-day sprint roadmap.' }
  ],
  contact: {
    website: 'https://uncodedhub.com',
    contactPage: 'https://uncodedhub.com/contact',
    phone: '+91 93602 93902',
    email: 'deepak@uncodedhub.com'
  }
};
