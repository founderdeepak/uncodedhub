import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const localitiesPath = path.join(root, 'src', 'data', 'bangaloreLocalities.json');
const data = JSON.parse(fs.readFileSync(localitiesPath, 'utf8'));

// The 37 New Wave 1 Localities Definitions
const NEW_37_LOCALITIES = {
  peenya: {
    slug: 'peenya',
    name: 'Peenya Industrial Area',
    kannadaName: 'ಪೀಣ್ಯ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ',
    zone: 'West Bengaluru',
    pincode: '560058',
    coordinates: { lat: 13.0285, lng: 77.5195 },
    metroLine: 'Green Line (Peenya & Peenya Industry Stations)',
    keyLandmarks: ['Peenya 1st Stage', 'Peenya 2nd Stage', 'Peenya 3rd Stage', 'Peenya 4th Phase', 'Tumkur Road Expressway'],
    techParksAndHubs: ['Peenya Industrial Association Hub', 'Small Industries Development Hub', 'NTTF Technology Center'],
    commercialProfile: 'Asia’s largest industrial cluster with over 5,000 active engineering, CNC machining, tool & die, laser cutting, and sheet metal fabrication factories.',
    painPointHook: 'Industrial procurement officers and OEM project managers from across India search suppliers online. If your Peenya machine shop or fabrication unit lacks a high-speed mobile catalog and instant WhatsApp RFQ, purchase managers instantly bounce to competitors.',
    niches: [
      {
        nicheKey: 'business-portfolio',
        name: 'CNC Machining & Precision Engineering',
        icon: '⚙️',
        headline: 'B2B CNC Machining & Engineering Websites in Peenya',
        subheadline: 'Sub-second machinery fleet loading, 1-tap WhatsApp RFQ quotation funnels, and ISO/AS9100 quality credentials.',
        localHook: 'Helping precision machine shops and tooling fabricators across Peenya Stages 1–4 win high-value corporate OEM purchase contracts.',
        statBadge: '0.6s LCP · Instant WhatsApp RFQ',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'home-services',
        name: 'Sheet Metal & Fiber Laser Cutting Services',
        icon: '⚡',
        headline: 'Sheet Metal Laser Cutting Websites in Peenya',
        subheadline: 'Interactive material thickness matrices, instant CAD file upload gateways, and zero WordPress lag.',
        localHook: 'Positioning fiber laser and CNC bending specialists along Tumkur Road for corporate production runs.',
        statBadge: 'CAD Upload · Instant RFQ',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'home-renovation',
        name: 'Commercial PEB & Industrial Steel Structures',
        icon: '🏛️',
        headline: 'PEB Industrial Steel Structure Websites in Peenya',
        subheadline: 'Showcase heavy factory sheds, structural engineering certifications, and turnkey factory build capabilities.',
        localHook: 'Showcasing pre-engineered building fabricators to national developers and warehouse operators.',
        statBadge: 'Structural Proof · 4K Drone Reels',
        targetPrice: '₹55,000'
      },
      {
        nicheKey: 'coaches-consultants',
        name: 'Industrial Safety, ISO & Factory Compliance Advisors',
        icon: '📋',
        headline: 'Industrial Compliance & Safety Consulting Websites in Peenya',
        subheadline: 'High-trust corporate presentation, statutory EHS compliance checklists, and factory audit booking.',
        localHook: 'Positioning ISO auditors, factory safety inspectors, and environmental consultants across Peenya.',
        statBadge: 'Verified Retainers · Corporate Trust',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'dental-clinics',
        name: 'Occupational & Industrial Workforce Dental Clinics',
        icon: '🦷',
        headline: 'Workforce & Family Dental Clinic Websites in Peenya',
        subheadline: 'Sub-second mobile appointment booking, clear treatment pricing, and emergency WhatsApp routing.',
        localHook: 'Attracting factory leadership, engineering staff, and local families across Peenya and Jalahalli.',
        statBadge: '0.8s LCP · 2-Tap Booking',
        targetPrice: '₹40,000'
      },
      {
        nicheKey: 'real-estate',
        name: 'Industrial Shed & Factory Land Brokers',
        icon: '🏭',
        headline: 'Industrial Property & Warehouse Broker Websites in Peenya',
        subheadline: 'Power capacity specs, crane height listings, and direct WhatsApp buyer triage.',
        localHook: 'Showcasing industrial sheds, warehouse godowns, and industrial plots across Peenya Stages 1–4.',
        statBadge: 'Industrial Specs · Direct WhatsApp',
        targetPrice: '₹50,000'
      }
    ],
    faqs: [
      {
        question: 'Can you visit our factory or machine shop in Peenya before starting?',
        answer: 'Yes. We are based in Bengaluru and regularly meet factory owners, general managers, and tooling heads across Peenya Stages 1 to 4 for on-site discovery and machinery workflow capture.'
      },
      {
        question: 'How do your websites help Peenya manufacturers win corporate OEM contracts?',
        answer: 'Corporate purchase managers demand technical credibility. We build sub-second React platforms with downloadable PDF capacity charts, machinery fleet specs (VMC, CNC, wire EDM), ISO certificates, and instant 1-tap WhatsApp RFQ gateways.'
      },
      {
        question: 'What is your contractual 7-day launch guarantee for Peenya businesses?',
        answer: 'If your industrial website is not live on your domain with 100/100 performance scores within 7 business days from kickoff, the entire build is 100% free under our strict Late-Means-Free contract.'
      },
      {
        question: 'Do you provide Karnataka GST tax invoices for business accounting?',
        answer: 'Yes. All contracts receive official corporate tax invoices with our registered Karnataka GSTIN, providing full input tax credit (ITC) for your company.'
      }
    ]
  },

  bommasandra: {
    slug: 'bommasandra',
    name: 'Bommasandra Industrial Area',
    kannadaName: 'ಬೊಮ್ಮಸಂದ್ರ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ',
    zone: 'South Bengaluru',
    pincode: '560099',
    coordinates: { lat: 12.8164, lng: 77.6917 },
    metroLine: 'Yellow Line (Bommasandra Metro Terminal)',
    keyLandmarks: ['Bommasandra Industrial Estate', 'Hosur Road Expressway', 'Biocon Park Corridor', 'Narayana Hrudayalaya Medical Strip'],
    techParksAndHubs: ['Biotech Corridor', 'Bommasandra Industrial Association Hub', 'Electronic City South Corridor'],
    commercialProfile: 'South Bengaluru’s powerhouse industrial district housing global biopharma giants, heavy electrical suppliers, precision auto OEM components, and warehouse logistics hubs.',
    painPointHook: 'Procurement heads and international pharmaceutical buyers expect instant mobile spec sheets. If your Bommasandra business website takes 4 seconds to load on phone or looks like an abandoned template, buyers immediately order from competitors.',
    niches: [
      {
        nicheKey: 'business-portfolio',
        name: 'Industrial Electrical & OEM Suppliers',
        icon: '⚡',
        headline: 'Industrial Electrical & OEM Supplier Websites in Bommasandra',
        subheadline: 'Sub-second B2B catalogue loading, 1-tap WhatsApp RFQ quotation funnels, and interactive industrial product specs.',
        localHook: 'Engineered for switchgear distributors, industrial cable wholesalers, and auto electrical suppliers in Bommasandra.',
        statBadge: '0.7s LCP · Instant WhatsApp RFQ',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'healthcare-diagnostics',
        name: 'Biopharma, Clinical Research & Testing Labs',
        icon: '🔬',
        headline: 'Biopharma & Clinical Testing Lab Websites in Bommasandra',
        subheadline: 'US-FDA/NABL credential showcases, technical testing capabilities, and secure B2B client sample intake portals.',
        localHook: 'Helping diagnostic testing laboratories and pharma service providers near Biocon Park capture corporate research contracts.',
        statBadge: 'NABL Specs · Secure Intake',
        targetPrice: '₹55,000'
      },
      {
        nicheKey: 'home-services',
        name: 'Precision Engineering & Tooling Fabricators',
        icon: '⚙️',
        headline: 'Precision Tooling & Fabrication Websites in Bommasandra',
        subheadline: 'Showcase CNC machinery, ISO quality certifications, and client spec sheets with zero mobile lag.',
        localHook: 'Helping precision tooling shops near Hosur Road expressway capture corporate OEM supply contracts.',
        statBadge: 'ISO Showcase · Specification UX',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'coaches-consultants',
        name: 'Industrial Safety & Regulatory EHS Advisors',
        icon: '📋',
        headline: 'Industrial EHS & Regulatory Compliance Websites in Bommasandra',
        subheadline: 'High-trust corporate presentation, statutory environmental audit checklists, and corporate advisory booking.',
        localHook: 'Positioning industrial safety auditors and factory compliance specialists across South Bengaluru.',
        statBadge: 'Verified Retainers · Corporate Trust',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'clinic-polyclinic',
        name: 'Occupational Health & Family Polyclinics',
        icon: '🏥',
        headline: 'Occupational Healthcare & Polyclinic Websites in Bommasandra',
        subheadline: 'Sub-second mobile patient booking, corporate health checkup packages, and emergency ambulance routing.',
        localHook: 'Attracting industrial plant workers, corporate executives, and local families near Narayana Health City.',
        statBadge: '0.8s LCP · Corporate Health',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'real-estate',
        name: 'Industrial Warehousing & Commercial Land Brokers',
        icon: '🏭',
        headline: 'Industrial Warehouse & Logistics Property Websites in Bommasandra',
        subheadline: 'Dock height specifications, industrial plot listings, and direct WhatsApp buyer triage.',
        localHook: 'Showcasing Grade-A industrial sheds and freight godowns along the Hosur Road transit corridor.',
        statBadge: 'Logistics Specs · Direct WhatsApp',
        targetPrice: '₹50,000'
      }
    ],
    faqs: [
      {
        question: 'Can you visit our plant in Bommasandra Industrial Area before starting?',
        answer: 'Yes. We are based in Bengaluru and regularly visit industrial facilities and corporate offices across Bommasandra and Jigani for on-site discovery and product review.'
      },
      {
        question: 'How do your websites help Bommasandra suppliers generate B2B orders?',
        answer: 'We eliminate bloated page builders and code custom React platforms with instant WhatsApp RFQs, downloadable PDF spec sheets, and clear technical specifications that corporate procurement managers trust.'
      },
      {
        question: 'What is your contractual 7-day delivery guarantee?',
        answer: 'If your website is not live on your domain with 100/100 performance scores within 7 business days from kickoff, the entire build is 100% free of charge under our strict Late-Means-Free contract.'
      },
      {
        question: 'Do you provide GST tax invoices for business accounting?',
        answer: 'Yes. All contracts receive official corporate tax invoices with our registered Karnataka GSTIN, providing full input tax credit (ITC) for your company.'
      }
    ]
  },

  rajajinagar: {
    slug: 'rajajinagar',
    name: 'Rajajinagar',
    kannadaName: 'ರಾಜಾಜಿನಗರ',
    zone: 'West Bengaluru',
    pincode: '560010',
    coordinates: { lat: 12.9982, lng: 77.553 },
    metroLine: 'Green Line (Rajajinagar, Mahakavi Kuvempu Road & Rajajinagar 1st Block Stations)',
    keyLandmarks: ['Dr. Rajkumar Road', 'Orion Mall & Brigade Gateway', 'Navrang Theatre Circle', 'Chord Road', 'ESI Hospital Strip'],
    techParksAndHubs: ['World Trade Center Bengaluru (WTC)', 'Brigade Gateway Commercial Strip'],
    commercialProfile: 'West Bengaluru’s premier commercial and healthcare hub blending corporate multinational offices at WTC with multi-generational wholesale trade, auto dealerships, and super-specialty hospitals.',
    painPointHook: 'Patients along Chord Road and Dr. Rajkumar Road browse exclusively on smartphones. If your clinic, showroom, or consultancy takes more than 1.5 seconds to load or feels like an outdated template, they bounce to a competitor.',
    niches: [
      {
        nicheKey: 'clinic-polyclinic',
        name: 'Multi-Specialty & Super-Specialty Clinics',
        icon: '🏥',
        headline: 'Multi-Specialty Clinic Websites in Rajajinagar',
        subheadline: 'Sub-second mobile patient triage, doctor timetable visualizers, and instant WhatsApp booking.',
        localHook: 'Attracting patients seeking expert cardiology, orthopedics, and pediatrics near Dr. Rajkumar Road.',
        statBadge: '0.7s LCP · 2-Tap Booking',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'dental-clinics',
        name: 'Aesthetic Dental & Implant Clinics',
        icon: '🦷',
        headline: 'High-Converting Dental Websites in Rajajinagar',
        subheadline: 'Sub-second appointment scheduling, clear pricing transparency, and interactive smile makeover sliders.',
        localHook: 'Positioning aesthetic dental practices for families and executives across 1st Block to 6th Block.',
        statBadge: '0.8s LCP · 2-Tap Booking',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'interior-designers',
        name: 'Luxury Residential Interior Designers',
        icon: '📐',
        headline: 'Bespoke Interior Design Websites in Rajajinagar',
        subheadline: 'Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.',
        localHook: 'Positioning boutique interior architects for premium apartments at Brigade Gateway and heritage homes on Chord Road.',
        statBadge: '4K Portfolios · 0.8s Speed',
        targetPrice: '₹55,000'
      },
      {
        nicheKey: 'coaches-consultants',
        name: 'Chartered Accountants & Corporate Advisors',
        icon: '📋',
        headline: 'CA & Corporate Advisory Websites in Rajajinagar',
        subheadline: 'High-trust professional presentation, statutory compliance checklists, and secure client intake.',
        localHook: 'Helping established audit firms and corporate advocates near Navrang Circle close corporate retainers.',
        statBadge: 'Regulatory Trust · Fast Intake',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'business-portfolio',
        name: 'Commercial Equipment & Trade Suppliers',
        icon: '🏢',
        headline: 'Commercial Trade & Supplier Websites in Rajajinagar',
        subheadline: 'Sub-second product catalog loading, 1-tap WhatsApp RFQs, and automated inquiry capture.',
        localHook: 'Engineered for commercial equipment distributors and trade wholesalers serving West Bangalore.',
        statBadge: '0.7s LCP · Instant RFQ',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'salon-beauty',
        name: 'Bridal Makeover & Luxury Salons',
        icon: '✨',
        headline: 'Bridal Studio & Luxury Salon Websites in Rajajinagar',
        subheadline: 'Mobile lookbook sliders, bridal package transparency, and instant WhatsApp date booking.',
        localHook: 'Attracting bridal makeup and skin treatment clients across Rajajinagar and Basaveshwaranagar.',
        statBadge: '4K Lookbook · 1-Tap Booking',
        targetPrice: '₹42,000'
      }
    ],
    faqs: [
      {
        question: 'Can we meet Deepak & Geetha in Rajajinagar before starting our website build?',
        answer: 'Yes. We are based in Bengaluru and regularly meet founders, clinic directors, and business owners near Orion Mall or along Dr. Rajkumar Road for an in-person discovery session.'
      },
      {
        question: 'How do your websites help Rajajinagar businesses rank higher on Google?',
        answer: 'We build ultra-fast semantic React code with schema markup for your exact Rajajinagar pincode (560010) and landmarks (Dr. Rajkumar Road, Chord Road), ensuring Google ranks you in top local results.'
      },
      {
        question: 'What is your 7-day launch guarantee?',
        answer: 'If your custom website is not live on your domain with 100/100 performance scores within 7 business days from kickoff, the entire build is 100% free under our strict Late-Means-Free contract.'
      },
      {
        question: 'Do you provide GST tax invoices?',
        answer: 'Yes. All contracts receive official corporate tax invoices with our registered Karnataka GSTIN, providing full input tax credit (ITC) for your company.'
      }
    ]
  },

  basavanagudi: {
    slug: 'basavanagudi',
    name: 'Basavanagudi',
    kannadaName: 'ಬಸವನಗುಡಿ',
    zone: 'South Bengaluru',
    pincode: '560004',
    coordinates: { lat: 12.9431, lng: 77.5739 },
    metroLine: 'Green Line (National College & Lalbagh Metro Stations)',
    keyLandmarks: ['DVG Road', 'Bull Temple', 'Gandhi Bazaar', 'National College Circle', 'Bugle Rock Park'],
    techParksAndHubs: ['South Bengaluru Heritage Commercial Corridor', 'Kanakapura Road IT Link'],
    commercialProfile: 'Bengaluru’s revered cultural and heritage commercial district with high concentrations of distinguished legal advocates, chartered accountancy firms, legacy jewelers, and specialty medical clinics.',
    painPointHook: 'Affluent South Bengaluru families and business owners value dignity, trust, and speed. A flashy, cheap-looking website with broken links or slow mobile loading destroys decades of established goodwill.',
    niches: [
      {
        nicheKey: 'coaches-consultants',
        name: 'Corporate Law Chambers & Chartered Accountants',
        icon: '⚖️',
        headline: 'Legal Chambers & CA Advisory Websites in Basavanagudi',
        subheadline: 'Institutional authority, regulatory compliance transparency, and encrypted client intake.',
        localHook: 'Positioning senior advocates and audit partners on DVG Road and Gandhi Bazaar for corporate retainers.',
        statBadge: 'Institutional Trust · Zero Ads',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'dental-clinics',
        name: 'Aesthetic Dental & Family Implant Clinics',
        icon: '🦷',
        headline: 'Family Dental & Implant Websites in Basavanagudi',
        subheadline: 'Sub-second mobile patient booking, clear treatment pricing, and interactive smile galleries.',
        localHook: 'Attracting multi-generational families and professionals across Bull Temple Road and Netkallappa Circle.',
        statBadge: '0.8s LCP · 2-Tap Booking',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'interior-designers',
        name: 'Heritage Home & Contemporary Interior Architects',
        icon: '📐',
        headline: 'Heritage & Modern Interior Design Websites in Basavanagudi',
        subheadline: 'Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.',
        localHook: 'Positioning residential architects for luxury heritage bungalow restorations and modern apartments.',
        statBadge: '4K Portfolios · 0.8s Speed',
        targetPrice: '₹55,000'
      },
      {
        nicheKey: 'business-portfolio',
        name: 'Heritage Jewellers & Luxury Ateliers',
        icon: '💎',
        headline: 'Fine Jewellery & Luxury Atelier Websites in Basavanagudi',
        subheadline: 'Editorial typography, high-res gold and polki craftsmanship galleries, and private appointment scheduling.',
        localHook: 'Helping legacy jewelers and bespoke craft ateliers across Gandhi Bazaar reach modern buyers.',
        statBadge: 'Editorial Craft · Private Booking',
        targetPrice: '₹55,000'
      },
      {
        nicheKey: 'clinic-polyclinic',
        name: 'Ayurvedic Wellness & Specialist Polyclinics',
        icon: '🌿',
        headline: 'Ayurvedic Wellness & Specialist Clinic Websites in Basavanagudi',
        subheadline: 'Sub-second patient appointment booking, holistic treatment pricing, and emergency WhatsApp routing.',
        localHook: 'Showcasing classical Ayurvedic doctors and polyclinics near Bugle Rock Park.',
        statBadge: '0.7s LCP · 2-Tap Booking',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'wedding-photographers',
        name: 'Traditional & Fine-Art Wedding Photographers',
        icon: '📷',
        headline: 'Fine-Art Wedding Photography Websites in Basavanagudi',
        subheadline: 'Full-bleed responsive photo monographs, wedding story walkthroughs, and instant date inquiry triage.',
        localHook: 'Attracting South Indian heritage wedding photography clients across South Bengaluru.',
        statBadge: '4K Monograph · Fast Intake',
        targetPrice: '₹45,000'
      }
    ],
    faqs: [
      {
        question: 'Can you meet us in Basavanagudi for a project discussion?',
        answer: 'Yes. We are based in Bengaluru and regularly meet practice heads, advocates, and founders along DVG Road or near National College for an in-person discovery coffee.'
      },
      {
        question: 'How do your websites respect the professional dignity of CA and law firms in Basavanagudi?',
        answer: 'We never use cheap marketing gimmicks, popups, or flash animations. We craft dignified Swiss editorial typography with clean legal disclaimers, partner credential storytelling, and secure client intake.'
      },
      {
        question: 'What is your 7-day launch guarantee?',
        answer: 'If your custom website is not live on your domain with 100/100 performance scores within 7 business days from kickoff, the entire build is 100% free under our strict Late-Means-Free contract.'
      },
      {
        question: 'Do you provide GST tax invoices?',
        answer: 'Yes. All contracts receive official corporate tax invoices with our registered Karnataka GSTIN, providing full input tax credit (ITC) for your company.'
      }
    ]
  },

  banashankari: {
    slug: 'banashankari',
    name: 'Banashankari',
    kannadaName: 'ಬನಶಂಕರಿ',
    zone: 'South Bengaluru',
    pincode: '560050',
    coordinates: { lat: 12.9255, lng: 77.5468 },
    metroLine: 'Green Line (Banashankari Metro Station & Bus Hub)',
    keyLandmarks: ['Banashankari Amma Temple', '100 Feet Ring Road', 'Kadirenahalli Underpass', 'Deve Gowda Petrol Bunk Circle', 'BSK 2nd & 3rd Stages'],
    techParksAndHubs: ['South Ring Road Commercial Corridor', 'Kanakapura Metro Tech Link'],
    commercialProfile: 'Bengaluru’s largest residential and commercial neighborhood spanning 6 distinct stages, densely populated with multi-specialty polyclinics, coaching academies, interior design studios, and retail showrooms.',
    painPointHook: 'Families across Banashankari Stages 1 to 6 search for doctors, designers, and tutors on smartphones. If your website is slow or clumsy on mobile, they immediately switch to a rival practice.',
    niches: [
      {
        nicheKey: 'interior-designers',
        name: 'Modular Interiors & Residential Architects',
        icon: '📐',
        headline: 'Modular Interior & Architecture Websites in Banashankari',
        subheadline: 'Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.',
        localHook: 'Positioning interior designers for apartments and independent villas across BSK 2nd, 3rd, and 6th Stages.',
        statBadge: '4K Portfolios · 0.8s Speed',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'dental-clinics',
        name: 'Family Dental & Smile Makeover Clinics',
        icon: '🦷',
        headline: 'Family Dental Clinic Websites in Banashankari',
        subheadline: 'Sub-second mobile patient booking, interactive smile makeover sliders, and emergency WhatsApp routing.',
        localHook: 'Attracting patients for dental implants, root canals, and invisible aligners across BSK 2nd & 3rd Stages.',
        statBadge: '0.8s LCP · 2-Tap Booking',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'educational-academy',
        name: 'Competitive Exam & Skill Coaching Academies',
        icon: '🎓',
        headline: 'Coaching Institute & Academy Websites in Banashankari',
        subheadline: 'Course syllabus breakdowns, verified topper ranker showcases, and automated batch enrollment gateways.',
        localHook: 'Helping NEET, JEE, and professional training institutes near Banashankari TTMC fill student batches.',
        statBadge: 'Batch Triage · High Trust',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'clinic-polyclinic',
        name: 'Multi-Specialty Polyclinics & Diagnostic Labs',
        icon: '🏥',
        headline: 'Multi-Specialty Clinic Websites in Banashankari',
        subheadline: 'Sub-second mobile patient triage, doctor timetable visualizers, and instant WhatsApp booking.',
        localHook: 'Attracting patients seeking expert pediatrics, gynecology, and cardiology along 100 Feet Ring Road.',
        statBadge: '0.7s LCP · 2-Tap Booking',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'salon-beauty',
        name: 'Luxury Salons & Bridal Makeover Studios',
        icon: '✨',
        headline: 'Bridal Makeover & Luxury Salon Websites in Banashankari',
        subheadline: 'Mobile lookbook sliders, bridal package transparency, and instant WhatsApp date booking.',
        localHook: 'Attracting bridal makeup and skincare clients across Banashankari and Padmanabhanagar.',
        statBadge: '4K Lookbook · 1-Tap Booking',
        targetPrice: '₹42,000'
      },
      {
        nicheKey: 'business-portfolio',
        name: 'Commercial Contractors & Trade Dealers',
        icon: '🏢',
        headline: 'Commercial Contractor & B2B Websites in Banashankari',
        subheadline: 'Sub-second speed, verified client track records, and automated lead capture.',
        localHook: 'Helping hardware distributors, electrical contractors, and trade specialists across South Bengaluru.',
        statBadge: '0.7s LCP · Instant RFQ',
        targetPrice: '₹45,000'
      }
    ],
    faqs: [
      {
        question: 'Can you meet us in Banashankari before starting our website build?',
        answer: 'Yes. We are based in Bengaluru and regularly meet founders, doctors, and institute heads across BSK 2nd and 3rd Stages for an in-person discovery coffee.'
      },
      {
        question: 'How do your websites help Banashankari businesses capture local leads?',
        answer: 'We build ultra-fast semantic React code with schema markup for your exact Banashankari pincode (560050) and arterial roads, ensuring Google ranks you in top local search results.'
      },
      {
        question: 'What is your 7-day launch guarantee?',
        answer: 'If your custom website is not live on your domain with 100/100 performance scores within 7 business days from kickoff, the entire build is 100% free under our strict Late-Means-Free contract.'
      },
      {
        question: 'Do you provide GST tax invoices?',
        answer: 'Yes. All contracts receive official corporate tax invoices with our registered Karnataka GSTIN, providing full input tax credit (ITC) for your company.'
      }
    ]
  },

  'yelahanka-new-town': {
    slug: 'yelahanka-new-town',
    name: 'Yelahanka New Town',
    kannadaName: 'ಯಲಹಂಕ ನ್ಯೂ ಟೌನ್',
    zone: 'North Bengaluru',
    pincode: '560064',
    coordinates: { lat: 13.0998, lng: 77.5855 },
    metroLine: 'Blue Line (Upcoming Airport Metro Yelahanka Station)',
    keyLandmarks: ['Major Sandeep Unnikrishnan Road', 'Seshadripuram College Campus', 'Rail Wheel Factory Corridor', 'Yelahanka Lake', 'Mini Vidhana Soudha'],
    techParksAndHubs: ['Airport Highway IT Corridor', 'Bagalur Aerospace Park Link', 'KIAL Aerotropolis Zone'],
    commercialProfile: 'North Bengaluru’s booming aerospace and educational residential hub connecting the city to Kempegowda International Airport, dense with private academies, modern clinics, luxury real estate, and automotive studios.',
    painPointHook: 'Airport corridor professionals, pilots, and tech executives expect sleek, instant mobile websites. A slow WordPress site with broken forms guarantees they book with a rival.',
    niches: [
      {
        nicheKey: 'educational-academy',
        name: 'Aviation, Design & Professional Academies',
        icon: '✈️',
        headline: 'Aviation Academy & Professional Institute Websites in Yelahanka',
        subheadline: 'Course syllabus breakdowns, flight training simulator specs, and automated student enrollment gateways.',
        localHook: 'Positioning aviation training, design, and engineering institutes in North Bangalore’s educational hub.',
        statBadge: 'Aviation Specs · High Trust',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'dental-clinics',
        name: 'Aesthetic Dental & Implant Clinics',
        icon: '🦷',
        headline: 'High-Converting Dental Websites in Yelahanka New Town',
        subheadline: 'Sub-second mobile patient booking, interactive smile makeover sliders, and emergency WhatsApp routing.',
        localHook: 'Attracting airport staff, defense personnel, and residential families across Yelahanka New Town.',
        statBadge: '0.8s LCP · 2-Tap Booking',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'real-estate',
        name: 'Luxury Airport Corridor Real Estate Brokers',
        icon: '🏡',
        headline: 'Luxury Airport Corridor Property Broker Websites in Yelahanka',
        subheadline: '4K project galleries, airport connectivity maps, and direct investor WhatsApp triage.',
        localHook: 'Showcasing luxury gated communities and airport highway villas in North Bengaluru.',
        statBadge: '4K Tours · Direct WhatsApp',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'interior-designers',
        name: 'Turnkey Villa & Apartment Interior Designers',
        icon: '📐',
        headline: 'Turnkey Interior Design Websites in Yelahanka New Town',
        subheadline: 'Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.',
        localHook: 'Helping residential interior architects capture luxury villa fit-outs along the airport corridor.',
        statBadge: '4K Portfolios · 0.8s Speed',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'home-services',
        name: 'Luxury Auto Detailing & PPF Studios',
        icon: '🚗',
        headline: 'Luxury Car Detailing & PPF Websites in Yelahanka',
        subheadline: 'High-gloss 4K reflections, self-healing PPF micron matrices, and instant WhatsApp booking.',
        localHook: 'Attracting luxury European car owners along the International Airport Highway corridor.',
        statBadge: '4K Gloss · 1-Tap Booking',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'clinic-polyclinic',
        name: 'Multi-Specialty Healthcare & Diagnostics',
        icon: '🏥',
        headline: 'Multi-Specialty Clinic & Lab Websites in Yelahanka New Town',
        subheadline: 'Sub-second mobile patient triage, doctor timetable visualizers, and instant WhatsApp booking.',
        localHook: 'Attracting patients seeking expert pediatrics, gynecology, and diagnostics near Seshadripuram Campus.',
        statBadge: '0.7s LCP · 2-Tap Booking',
        targetPrice: '₹48,000'
      }
    ],
    faqs: [
      {
        question: 'Can you meet us in Yelahanka New Town for a discovery meeting?',
        answer: 'Yes. We are based in Bengaluru and regularly meet founders, clinic heads, and academy directors along Major Sandeep Unnikrishnan Road or near Yelahanka Lake.'
      },
      {
        question: 'How do your websites help Yelahanka businesses capture airport corridor clients?',
        answer: 'We build ultra-fast semantic React code with schema markup for your exact Yelahanka pincode (560064) and airport transit corridors, ensuring Google ranks you in top local search results.'
      },
      {
        question: 'What is your 7-day delivery guarantee?',
        answer: 'If your custom website is not live on your domain with 100/100 performance scores within 7 business days from kickoff, the entire build is 100% free under our strict Late-Means-Free contract.'
      },
      {
        question: 'Do you provide GST tax invoices?',
        answer: 'Yes. All contracts receive official corporate tax invoices with our registered Karnataka GSTIN, providing full input tax credit (ITC) for your company.'
      }
    ]
  }
};

// Generate template for the remaining 31 Wave 1 localities
const REMAINING_WAVE1_DEFS = [
  { slug: 'yelahanka-old-town', name: 'Yelahanka Old Town', kannada: 'ಯಲಹಂಕ ಹಳೇ ಪೇಟೆ', zone: 'North Bengaluru', pin: '560064', lat: 13.1025, lng: 77.5960, metro: 'Blue Line Airport Corridor', landmarks: ['Kogilu Cross', 'Old Town Market Street', 'Santhe Circle', 'Yelahanka Railway Junction'], profile: 'Historic commercial and wholesale trading hub with hardware suppliers, fabrication workshops, family clinics, and trade distributors.' },
  { slug: 'bellandur-east', name: 'Bellandur East', kannada: 'ಬೆಳ್ಳಂದೂರು ಪೂರ್ವ', zone: 'East Bengaluru', pin: '560103', lat: 12.9304, lng: 77.6784, metro: 'Blue Line ORR Metro', landmarks: ['Ecospace Business Park', 'EcoWorld Tech Campus', 'Devarabisanahalli Flyover', 'Bellandur Lake Road'], profile: 'High-density IT corridor housing Fortune 500 tech campuses, executive leadership consultancies, corporate fitness centers, and luxury clinics.' },
  { slug: 'hoodi', name: 'Hoodi', kannada: 'ಹೂಡಿ', zone: 'East Bengaluru', pin: '560048', lat: 12.9918, lng: 77.7163, metro: 'Purple Line (Hoodi Metro Station)', landmarks: ['ITPL Main Road', 'Hoodi Circle', 'Industrial Export Park', 'Whitefield Railway Station Link'], profile: 'Rapidly expanding tech and industrial corridor connecting Whitefield to Mahadevapura, packed with warehouse suppliers, dental practices, and residential apartments.' },
  { slug: 'kadugodi', name: 'Kadugodi', kannada: 'ಕಾಡುಗೋಡಿ', zone: 'East Bengaluru', pin: '560067', lat: 12.9983, lng: 77.7609, metro: 'Purple Line (Whitefield Kadugodi Terminal)', landmarks: ['Kadugodi Tree Park', 'Whitefield Metro Depot', 'Channasandra Main Road', 'Hoskote Link Road'], profile: 'Eastern gateway of Bengaluru housing RMC concrete batching plants, building materials wholesalers, international schools, and gated residential communities.' },
  { slug: 'brookefield', name: 'Brookefield', kannada: 'ಬ್ರೂಕ್‌ಫೀಲ್ಡ್', zone: 'East Bengaluru', pin: '560037', lat: 12.9654, lng: 77.7183, metro: 'Purple Line Kundalahalli Link', landmarks: ['ITPL Road', 'Kundalahalli Gate', 'AECS Layout Strip', 'Brookefield Mall'], profile: 'Established residential and commercial IT enclave filled with boutique bridal salons, aesthetic dental clinics, luxury interior design studios, and corporate coaches.' },
  { slug: 'varthur', name: 'Varthur', kannada: 'ವರ್ತೂರು', zone: 'East Bengaluru', pin: '560087', lat: 12.9406, lng: 77.7468, metro: 'Purple Line Hope Farm Link', landmarks: ['Varthur Lake', 'Gunjur-Varthur Main Road', 'Whitefield-Sarjapur Link Road', 'Balagere Road'], profile: 'High-growth luxury villa and managed farmland corridor between Whitefield and Sarjapur, popular with tech executives building bespoke residential homes.' },
  { slug: 'panathur', name: 'Panathur', kannada: 'ಪಣತ್ತೂರು', zone: 'East Bengaluru', pin: '560103', lat: 12.9348, lng: 77.7011, metro: 'Blue Line Kadubeesanahalli Link', landmarks: ['Panathur Main Road', 'Balagere Road', 'Silverwood Regency Strip', 'Outer Ring Road Underpass'], profile: 'Dense residential growth corridor for ORR tech professionals, with high demand for modular kitchens, pediatric clinics, preschools, and bridal styling.' },
  { slug: 'doddanekundi', name: 'Doddanekundi', kannada: 'ದೊಡ್ಡನೆಕ್ಕುಂದಿ', zone: 'East Bengaluru', pin: '560037', lat: 12.9719, lng: 77.6975, metro: 'Purple Line Seetharampalya Link', landmarks: ['Ferns City', 'Bagmane Constellation Park', 'Outer Ring Road Flyover', 'Doddanekundi Industrial Area'], profile: 'Key tech park and light engineering zone housing multinational corporate offices, commercial fit-out contractors, and specialized B2B suppliers.' },
  { slug: 'kr-puram', name: 'KR Puram', kannada: 'ಕೆ ಆರ್ ಪುರಂ', zone: 'East Bengaluru', pin: '560036', lat: 13.0075, lng: 77.6959, metro: 'Purple Line & Blue Line (KR Puram Interchange)', landmarks: ['Hanging Cable Bridge', 'Old Madras Road', 'KR Puram Railway Station', 'Deenabandhu Road'], profile: 'Major eastern transit and commercial gateway dominated by building materials wholesale, hardware distribution, polyclinics, and automotive workshops.' },
  { slug: 'cv-raman-nagar', name: 'CV Raman Nagar', kannada: 'ಸಿ ವಿ ರಾಮನ್ ನಗರ', zone: 'East Bengaluru', pin: '560093', lat: 12.9855, lng: 77.6639, metro: 'Purple Line Baiyappanahalli Link', landmarks: ['Bagmane Tech Park', 'DRDO Complex', 'Bennigana Halli Lake', 'Kaggadasapura Main Road'], profile: 'Prestigious defense and technology research corridor with affluent resident families, high-ticket dental clinics, deep-tech studios, and executive advisors.' },
  { slug: 'mahadevapura', name: 'Mahadevapura', kannada: 'ಮಹದೇವಪುರ', zone: 'East Bengaluru', pin: '560048', lat: 12.9915, lng: 77.6875, metro: 'Purple Line (Garudacharpalya Metro Station)', landmarks: ['Outer Ring Road IT Corridor', 'Phoenix Marketcity Strip', 'Bagmane World Technology Centre', 'RHB Colony'], profile: 'High-velocity commercial corridor packed with corporate IT headquarters, diagnostics laboratories, high-end gyms, and commercial real estate brokerages.' },
  { slug: 'ramamurthy-nagar', name: 'Ramamurthy Nagar', kannada: 'ರಾಮಮೂರ್ತಿ ನಗರ', zone: 'East Bengaluru', pin: '560016', lat: 13.0163, lng: 77.6785, metro: 'Blue Line Kasturinagar Link', landmarks: ['Ramamurthy Nagar Main Road', 'Kowdenahalli Lake', 'TC Palya Road', 'B Channasandra Circle'], profile: 'Thriving residential neighborhood with high demand for turnkey home construction, modular interiors, dental clinics, and educational coaching institutes.' },
  { slug: 'kasavanahalli', name: 'Kasavanahalli', kannada: 'ಕಸವನಹಳ್ಳಿ', zone: 'South Bengaluru', pin: '560035', lat: 12.9094, lng: 77.6744, metro: 'Blue Line Bellandur Link', landmarks: ['Kasavanahalli Lake', 'Sarjapur Road Link', 'Central Jail Road', 'Play Arena Strip'], profile: 'Affluent tech residential belt along Sarjapur Road packed with luxury apartment communities, bespoke interior designers, private fitness coaches, and dental clinics.' },
  { slug: 'kaikondrahalli', name: 'Kaikondrahalli', kannada: 'ಕೈಕೊಂಡ್ರಹಳ್ಳಿ', zone: 'South Bengaluru', pin: '560035', lat: 12.9158, lng: 77.6711, metro: 'Blue Line Carmelaram Link', landmarks: ['Kaikondrahalli Lake', 'Sarjapur Main Road', 'Mother Sanctuary Strip', 'Carmelaram Railway Station Link'], profile: 'Eco-conscious residential corridor with high-net-worth tech families seeking pediatric clinics, sports physiotherapy recovery, and bespoke architecture.' },
  { slug: 'sarjapur-town', name: 'Sarjapur Town', kannada: 'ಸರ್ಜಾಪುರ ಟೌನ್', zone: 'South Bengaluru', pin: '562125', lat: 12.8604, lng: 77.7865, metro: 'Upcoming Sarjapur Metro Line', landmarks: ['Sarjapur Circle', 'Confident Anekal Link Road', 'Chikka Tirupati Road', 'Bagalur Border Corridor'], profile: 'The epicenter of Bengaluru’s luxury villa developments, managed farmland estates, construction supplies, and international boarding schools.' },
  { slug: 'gunjur', name: 'Gunjur', kannada: 'ಗುಂಜೂರು', zone: 'East Bengaluru', pin: '560087', lat: 12.9234, lng: 77.7315, metro: 'Purple Line Kadugodi Link', landmarks: ['Gunjur Main Road', 'Varthur-Gunjur Road', 'Panathur Link', 'Balagere Road'], profile: 'Rapidly transforming residential villa zone connecting Whitefield to Sarjapur, popular for turnkey construction materials, schools, and dental practices.' },
  { slug: 'bidadi', name: 'Bidadi Industrial Area', kannada: 'ಬಿದದಿ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ', zone: 'West Bengaluru', pin: '562109', lat: 12.7975, lng: 77.3827, metro: 'Mysore Expressway Corridor', landmarks: ['Toyota Kirloskar Auto Plant', 'Bidadi KIADB Industrial Area', 'Bengaluru-Mysuru Expressway', 'Bosch Plant Strip'], profile: 'Heavy automotive and industrial manufacturing corridor housing Tier-1 auto OEMs, sheet metal fabrication, industrial switchgear, and warehouse logistics.' },
  { slug: 'hoskote', name: 'Hoskote Industrial Area', kannada: 'ಹೊಸಕೋಟೆ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ', zone: 'East Bengaluru', pin: '562114', lat: 13.0712, lng: 77.7981, metro: 'Chennai Expressway Corridor', landmarks: ['Hoskote KIADB Industrial Area', 'Old Madras Road NH 75', 'Auto Cluster Corridor', 'Hoskote Lake'], profile: 'Heavy auto manufacturing and freight logistics hub housing Volvo, logistics warehousing parks, cold chain operators, and commercial fabrication plants.' },
  { slug: 'dobbspet', name: 'Dobbspet Industrial Area', kannada: 'ದಾಬಸ್‌ಪೇಟೆ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ', zone: 'West Bengaluru', pin: '562111', lat: 13.2354, lng: 77.2412, metro: 'Tumkur Highway NH 48', landmarks: ['Dobbspet KIADB Industrial Area', 'Shivagange Hill Road', 'Tumkur Road Toll Plaza', 'Steel Rolling Mills Corridor'], profile: 'Heavy engineering, steel rolling mills, transformer manufacturing, and large-scale pre-engineered building (PEB) fabrication plants.' },
  { slug: 'attibele', name: 'Attibele', kannada: 'ಅತ್ತಿಬೆಲೆ', zone: 'South Bengaluru', pin: '562107', lat: 12.7785, lng: 77.7712, metro: 'Hosur Border Corridor', landmarks: ['Attibele Toll Plaza', 'KIADB Industrial Area', 'Hosur Border Highway', 'Anekal-Attibele Road'], profile: 'Strategic border logistics and industrial hub housing cold storage parks, chemical pumps, packaging automation, and building material suppliers.' },
  { slug: 'chandapura', name: 'Chandapura', kannada: 'ಚಂದಾಪುರ', zone: 'South Bengaluru', pin: '560099', lat: 12.7932, lng: 77.7015, metro: 'Yellow Line Bommasandra Extension', landmarks: ['Chandapura Circle', 'Anekal Road', 'Surya City Township', 'Hosur Highway Junction'], profile: 'Key manufacturing and residential suburb near Bommasandra, filled with affordable housing developments, polyclinics, diagnostic labs, and hardware trade.' },
  { slug: 'anekal', name: 'Anekal Industrial Corridor', kannada: 'ಆನೇಕಲ್', zone: 'South Bengaluru', pin: '562106', lat: 12.7108, lng: 77.6963, metro: 'South Transit Ring', landmarks: ['Anekal Town Circle', 'Thally Road', 'Jigani-Anekal Link Road', 'Muthyala Maduvu Strip'], profile: 'Heavy machinery, granite processing, agro-equipment, and industrial electrical corridor linking Jigani to the Tamil Nadu border.' },
  { slug: 'thanisandra', name: 'Thanisandra', kannada: 'ಥಣಿಸಂದ್ರ', zone: 'North Bengaluru', pin: '560077', lat: 13.0548, lng: 77.6325, metro: 'Blue Line Manyata Station Link', landmarks: ['Thanisandra Main Road', 'Manyata Embassy Business Park', 'Bhartiya City Township', 'Rashtrotthana Vidya Kendra'], profile: 'Fastest-growing tech residential corridor in North Bangalore, housing IT leadership, luxury penthouses, aesthetic dental clinics, and corporate coaches.' },
  { slug: 'jakkur', name: 'Jakkur', kannada: 'ಜಕ್ಕೂರು', zone: 'North Bengaluru', pin: '560064', lat: 13.0768, lng: 77.6074, metro: 'Blue Line Airport Metro Jakkur Station', landmarks: ['Jakkur Aerodrome & Flying Club', 'Jakkur Lake', 'Bellary Road NH 44', 'Government Flying Training School (GFTS)'], profile: 'North Bengaluru’s aviation and high-net-worth enclave home to commercial flight training academies, luxury farm villas, sports academies, and turnkey architects.' },
  { slug: 'sahakar-nagar', name: 'Sahakar Nagar', kannada: 'ಸಹಕಾರ ನಗರ', zone: 'North Bengaluru', pin: '560092', lat: 13.0625, lng: 77.5912, metro: 'Blue Line Kodigehalli Link', landmarks: ['Sahakar Nagar Main Road', 'Bellary Road Highway', 'Kodigehalli Railway Link', 'Judicial Layout Strip'], profile: 'Affluent North Bangalore residential district preferred by senior executives and retired judges, packed with aesthetic dental practices, boutique interiors, and legal chambers.' },
  { slug: 'vidyaranyapura', name: 'Vidyaranyapura', kannada: 'ವಿದ್ಯಾರಣ್ಯಪುರ', zone: 'North Bengaluru', pin: '560097', lat: 13.0785, lng: 77.5582, metro: 'Green Line Jalahalli Link', landmarks: ['BEL Circle Link', 'Vidyaranyapura Post Office Road', 'Thindlu Lake', 'HMT Township Corridor'], profile: 'Established residential and defense township with high demand for multi-specialty polyclinics, coaching academies, residential interior design, and salons.' },
  { slug: 'rt-nagar', name: 'RT Nagar', kannada: 'ಆರ್ ಟಿ ನಗರ', zone: 'North Bengaluru', pin: '560032', lat: 13.0185, lng: 77.5925, metro: 'CBI Road Central Link', landmarks: ['Dinnur Main Road', 'HMT Layout', 'Ganga Nagar Market', 'CBI Road'], profile: 'High-density commercial high-street populated with specialist doctor clinics, corporate legal advisors, bridal salons, chartered accountants, and realtors.' },
  { slug: 'sanjaynagar', name: 'Sanjaynagar', kannada: 'ಸಂಜಯನಗರ', zone: 'North Bengaluru', pin: '560094', lat: 13.0365, lng: 77.5765, metro: 'Hebbal Flyover Link', landmarks: ['New BEL Road Strip', 'Vaishnavi Nakshatra Corridor', 'CPRI Road', 'Geddalahalli Circle'], profile: 'Upscale residential neighborhood adjoining New BEL Road, dense with boutique healthcare clinics, CA tax advisors, modular interiors, and beauty salons.' },
  { slug: 'dollars-colony', name: 'Dollars Colony', kannada: 'ಡಾಲರ್ಸ್ ಕಾಲೋನಿ', zone: 'North Bengaluru', pin: '560094', lat: 13.0315, lng: 77.5742, metro: 'RMV 2nd Stage Link', landmarks: ['RMV Extension 2nd Stage', 'Sanjaynagar Main Road Link', 'Judges Colony', 'Hebbal Lake Link'], profile: 'Ultra-luxury residential enclave of business magnates, ministers, and top doctors, demanding bespoke private wealth advisory, cosmetic surgery, and villa architecture.' },
  { slug: 'kammanahalli', name: 'Kammanahalli', kannada: 'ಕಮ್ಮನಹಳ್ಳಿ', zone: 'East Bengaluru', pin: '560084', lat: 13.0125, lng: 77.6385, metro: 'Pink Line Banaswadi Link', landmarks: ['Kammanahalli Main Road (Cosmopolitan Strip)', 'Kalyan Nagar 80 Feet Road', 'St. Thomas Town', 'Banaswadi Railway Station Link'], profile: 'Cosmopolitan high-street retail, dining, and lifestyle capital of East Bengaluru, packed with aesthetic dermatology clinics, bridal salons, and fitness clubs.' },
  { slug: 'hennur-road', name: 'Hennur Road', kannada: 'ಹೆಣ್ಣೂರು ರಸ್ತೆ', zone: 'North Bengaluru', pin: '560043', lat: 13.0355, lng: 77.6435, metro: 'Blue Line HRBR Link', landmarks: ['Hennur Cross', 'Bio-diversity Park', 'Kothanur Junction', 'Geddalahalli Strip'], profile: 'Booming North-East arterial corridor home to luxury gated villa enclaves, turnkey residential architects, sports recovery centers, and international schools.' }
];

// Helper to create 6 tailored niches for any locality based on zone
function getTailoredNiches(item) {
  const isIndustrial = item.slug.includes('industrial') || ['peenya', 'bommasandra', 'jigani', 'bidadi', 'hoskote', 'dobbspet', 'attibele', 'anekal'].includes(item.slug);

  if (isIndustrial) {
    return [
      {
        nicheKey: 'business-portfolio',
        name: 'Industrial Manufacturers & OEM Suppliers',
        icon: '⚙️',
        headline: `B2B Industrial & Manufacturing Websites in ${item.name}`,
        subheadline: 'Sub-second machinery fleet loading, 1-tap WhatsApp RFQ quotation funnels, and ISO/AS9100 quality credentials.',
        localHook: `Helping precision engineering shops and OEM suppliers across ${item.name} capture corporate purchase orders.`,
        statBadge: '0.6s LCP · Instant WhatsApp RFQ',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'home-services',
        name: 'Sheet Metal, Tooling & Fabrication Works',
        icon: '⚡',
        headline: `Sheet Metal & Tooling Fabrication Websites in ${item.name}`,
        subheadline: 'Interactive material thickness matrices, instant CAD file upload gateways, and zero WordPress lag.',
        localHook: `Showcasing laser cutting and fabrication plants in ${item.name} for corporate production runs.`,
        statBadge: 'CAD Upload · Instant RFQ',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'home-renovation',
        name: 'Commercial PEB & Industrial Steel Structures',
        icon: '🏛️',
        headline: `PEB Industrial Steel Structure Websites in ${item.name}`,
        subheadline: 'Showcase heavy factory sheds, structural engineering certifications, and turnkey factory build capabilities.',
        localHook: `Showcasing pre-engineered building fabricators in ${item.name} to national developers and warehouse operators.`,
        statBadge: 'Structural Proof · 4K Drone Reels',
        targetPrice: '₹55,000'
      },
      {
        nicheKey: 'coaches-consultants',
        name: 'Industrial Safety, ISO & Factory Compliance Advisors',
        icon: '📋',
        headline: `Industrial Compliance & Safety Consulting Websites in ${item.name}`,
        subheadline: 'High-trust corporate presentation, statutory EHS compliance checklists, and factory audit booking.',
        localHook: `Positioning ISO auditors, factory safety inspectors, and environmental consultants across ${item.name}.`,
        statBadge: 'Verified Retainers · Corporate Trust',
        targetPrice: '₹45,000'
      },
      {
        nicheKey: 'dental-clinics',
        name: 'Workforce Healthcare & Family Dental Clinics',
        icon: '🦷',
        headline: `Dental Clinic Websites in ${item.name}`,
        subheadline: 'Sub-second mobile appointment booking, clear treatment pricing, and emergency WhatsApp routing.',
        localHook: `Attracting factory leadership, engineering staff, and local families across ${item.name}.`,
        statBadge: '0.8s LCP · 2-Tap Booking',
        targetPrice: '₹40,000'
      },
      {
        nicheKey: 'real-estate',
        name: 'Industrial Warehousing & Land Brokers',
        icon: '🏭',
        headline: `Industrial Property & Warehouse Broker Websites in ${item.name}`,
        subheadline: 'Power capacity specs, crane height listings, and direct WhatsApp buyer triage.',
        localHook: `Showcasing industrial sheds, warehouse godowns, and industrial plots across ${item.name}.`,
        statBadge: 'Industrial Specs · Direct WhatsApp',
        targetPrice: '₹50,000'
      }
    ];
  } else {
    // Commercial, IT & Residential Enclaves
    return [
      {
        nicheKey: 'dental-clinics',
        name: 'Aesthetic Dental & Implant Clinics',
        icon: '🦷',
        headline: `High-Converting Dental & Implant Websites in ${item.name}`,
        subheadline: 'Sub-second mobile patient triage, interactive smile makeover sliders, and zero WordPress bloat.',
        localHook: `Attracting high-ticket Invisalign, veneer, and dental implant patients across ${item.name}.`,
        statBadge: '0.7s LCP · 2-Tap Booking',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'interior-designers',
        name: 'Luxury Residential Interior Designers',
        icon: '📐',
        headline: `Bespoke Interior Design Websites in ${item.name}`,
        subheadline: 'Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.',
        localHook: `Positioning boutique interior architects for premium apartments and villas in ${item.name}.`,
        statBadge: '4K Portfolios · 0.8s Speed',
        targetPrice: '₹55,000'
      },
      {
        nicheKey: 'coaches-consultants',
        name: 'Chartered Accountants, Legal & Corporate Advisors',
        icon: '⚖️',
        headline: `Corporate Legal & CA Advisory Websites in ${item.name}`,
        subheadline: 'Institutional authority, regulatory compliance transparency, and encrypted client intake.',
        localHook: `Helping established audit firms, corporate advocates, and executive advisors in ${item.name}.`,
        statBadge: 'Institutional Trust · Fast Intake',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'business-portfolio',
        name: 'B2B Tech Studios & Commercial Trade Hubs',
        icon: '💼',
        headline: `High-Impact B2B & Studio Websites in ${item.name}`,
        subheadline: 'Sub-second portfolio speed, client trust credentials, and zero WordPress bloat.',
        localHook: `Helping high-growth technology agencies and commercial trade vendors in ${item.name} win enterprise clients.`,
        statBadge: '0.6s LCP · Enterprise Authority',
        targetPrice: '₹50,000'
      },
      {
        nicheKey: 'clinic-polyclinic',
        name: 'Specialist Medical Clinics & Diagnostics',
        icon: '🏥',
        headline: `Specialist Clinic & Healthcare Websites in ${item.name}`,
        subheadline: 'Sub-second mobile patient booking, doctor timetable visualizers, and instant WhatsApp booking.',
        localHook: `Attracting patients seeking expert healthcare specialists across ${item.name}.`,
        statBadge: '0.7s LCP · 2-Tap Booking',
        targetPrice: '₹48,000'
      },
      {
        nicheKey: 'salon-beauty',
        name: 'Luxury Bridal Salons & Makeup Studios',
        icon: '✨',
        headline: `Bridal Studio & Luxury Salon Websites in ${item.name}`,
        subheadline: 'Mobile lookbook sliders, bridal package transparency, and instant WhatsApp date booking.',
        localHook: `Attracting bridal makeup and skincare clients across ${item.name}.`,
        statBadge: '4K Lookbook · 1-Tap Booking',
        targetPrice: '₹42,000'
      }
    ];
  }
}

function getTailoredFaqs(item) {
  return [
    {
      question: `Can you meet us in ${item.name} for an in-person discovery discussion?`,
      answer: `Yes. We are based in Bengaluru and regularly meet founders, clinic directors, and business leaders across ${item.name} for an in-person discovery coffee or on-site facility review.`
    },
    {
      question: `How do your websites help businesses in ${item.name} rank on Google?`,
      answer: `We build ultra-fast semantic React code with schema markup for your exact ${item.name} pincode (${item.pin}) and local arterial landmarks, ensuring Google ranks you in top local search results.`
    },
    {
      question: 'What is your 7-day delivery guarantee?',
      answer: 'If your custom website is not live on your domain with 100/100 performance scores within 7 business days from kickoff, the entire build is 100% free under our strict Late-Means-Free contract.'
    },
    {
      question: 'Do you provide GST tax invoices for business accounting?',
      answer: 'Yes. All contracts receive official corporate tax invoices with our registered Karnataka GSTIN, providing full input tax credit (ITC) for your company.'
    }
  ];
}

// 2. Add the custom defined localities (Peenya, Bommasandra, Rajajinagar, Basavanagudi, Banashankari, Yelahanka New Town)
for (const [k, v] of Object.entries(NEW_37_LOCALITIES)) {
  data[k] = v;
}

// 3. Add the remaining 31 Wave 1 localities
for (const item of REMAINING_WAVE1_DEFS) {
  data[item.slug] = {
    slug: item.slug,
    name: item.name,
    kannadaName: item.kannada,
    zone: item.zone,
    pincode: item.pin,
    coordinates: { lat: item.lat, lng: item.lng },
    metroLine: item.metro,
    keyLandmarks: item.landmarks,
    techParksAndHubs: [`${item.name} Commercial Corridor`],
    commercialProfile: item.profile,
    painPointHook: `Business owners and clients in ${item.name} search services directly on smartphones. If your website takes more than 1.5 seconds to load or feels like an outdated template, they bounce to a competitor.`,
    niches: getTailoredNiches(item),
    faqs: getTailoredFaqs(item)
  };
}

fs.writeFileSync(localitiesPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully updated ${localitiesPath}. Total localities count is now: ${Object.keys(data).length}`);
