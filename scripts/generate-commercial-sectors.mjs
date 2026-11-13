import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const targetJson = path.join(root, 'src', 'data', 'commercialSectors.json');

const sectors = [
  // Category 1: Heavy Engineering & Industrial Manufacturing
  {
    id: 'industrial-electrical-switchgear',
    name: 'Industrial Electrical & Switchgear',
    category: 'Heavy Engineering & Industrial Manufacturing',
    icon: 'Zap',
    targetPrice: '₹50,000 - ₹95,000',
    typicalClient: 'Switchgear OEMs, control panel builders, cable harness manufacturers (Jigani, Bommasandra, Peenya)',
    primaryPainPoint: 'Heavy uncompressed PDF catalogs cause mobile lag and crashes; procurement engineers bounce within 3 seconds without downloading spec sheets.',
    bofuKeywords: [
      'custom switchgear website design bangalore',
      'b2b electrical manufacturer website',
      'industrial panel builder web development',
      'electrical equipment catalog website'
    ],
    conversionArchitecture: 'Instant PDF spec sheet viewer, interactive technical parameter filter, one-click WhatsApp procurement RFQ trigger',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'cnc-precision-machining',
    name: 'CNC Machining & Precision Engineering',
    category: 'Heavy Engineering & Industrial Manufacturing',
    icon: 'Cpu',
    targetPrice: '₹55,000 - ₹1,10,000',
    typicalClient: 'VMC job shops, aerospace precision component suppliers, multi-axis machining facilities',
    primaryPainPoint: 'Generic templates fail to demonstrate AS9100/ISO tolerances; international aerospace buyers cannot verify machine capability matrices.',
    bofuKeywords: [
      'precision engineering website design',
      'cnc machine shop web development',
      'aerospace component manufacturer website',
      'b2b machining services website bangalore'
    ],
    conversionArchitecture: 'Machine capacity matrix table, downloadable CMM inspection certification badges, secure CAD drawing upload intake form',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'sheet-metal-fabrication',
    name: 'Sheet Metal Fabrication & Laser Cutting',
    category: 'Heavy Engineering & Industrial Manufacturing',
    icon: 'Layers',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'Industrial enclosure builders, CNC laser cutting service bureaus, powder coating lines',
    primaryPainPoint: 'Lack of visual proof of enclosure finishing tolerances; buyers struggle to submit DXF/STEP files for instant quoting.',
    bofuKeywords: [
      'sheet metal fabrication website design',
      'laser cutting company web design',
      'industrial enclosure manufacturer website',
      'metal fabrication rfq website'
    ],
    conversionArchitecture: 'Instant RFQ estimator with file attachment, surface finish photo gallery with micro-zoom, ISO certificate verification',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'plastic-injection-moulding',
    name: 'Plastic Injection Moulding & Tooling',
    category: 'Heavy Engineering & Industrial Manufacturing',
    icon: 'Boxes',
    targetPrice: '₹50,000 - ₹90,000',
    typicalClient: 'Automotive plastic component moulders, medical device enclosure manufacturers, precision toolrooms',
    primaryPainPoint: 'Visitors cannot see tonnage capacity or cleanroom moulding standards; overseas buyers leave due to lack of export proof.',
    bofuKeywords: [
      'injection moulding company website design',
      'plastic mould manufacturer web development',
      'toolroom website design bangalore',
      'custom plastic components b2b website'
    ],
    conversionArchitecture: 'Tonnage capacity filter (50T to 1200T), cleanroom ISO class 8 gallery, direct engineering sample request flow',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'industrial-fasteners-hardware',
    name: 'Industrial Fasteners & Forging',
    category: 'Heavy Engineering & Industrial Manufacturing',
    icon: 'Wrench',
    targetPrice: '₹45,000 - ₹80,000',
    typicalClient: 'High-tensile fastener manufacturers, hot forged component makers, stainless steel bolt exporters',
    primaryPainPoint: 'Buyers need DIN/ISO standard lookups immediately; cluttered static sites force buyers to call instead of ordering in bulk.',
    bofuKeywords: [
      'industrial fasteners manufacturer website',
      'high tensile bolts exporter web design',
      'forging company website development',
      'b2b industrial hardware website'
    ],
    conversionArchitecture: 'Searchable DIN/ISO fastener specification directory, bulk MOQ price calculator, test certificate (MTC) download portal',
    demoSlug: 'business-portfolio.html'
  },

  // Category 2: Healthcare, Specialized Medical & Diagnostics
  {
    id: 'multispecialty-dental-clinics',
    name: 'Multispecialty Dental Clinics & Implant Centers',
    category: 'Healthcare, Specialized Medical & Diagnostics',
    icon: 'Activity',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'Cosmetic dentists, implantologists, clear aligner centers, pediatric dental clinics',
    primaryPainPoint: 'Slow mobile booking forms cause 70% patient drop-off; lack of before/after smile transformations hurts high-ticket implant trust.',
    bofuKeywords: [
      'dental clinic website design bangalore',
      'implantologist web development',
      'orthodontic clinic website designer',
      'dentist appointment booking website'
    ],
    conversionArchitecture: 'Sub-second mobile WhatsApp booking, interactive Before/After smile slider, Google verified patient review feeds',
    demoSlug: 'dental-clinic.html'
  },
  {
    id: 'diagnostic-labs-radiology',
    name: 'Diagnostic Centers & Pathology Labs',
    category: 'Healthcare, Specialized Medical & Diagnostics',
    icon: 'Stethoscope',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'NABL accredited pathology labs, CT/MRI scanning centers, corporate health checkup networks',
    primaryPainPoint: 'Patients struggle to find test preparation guidelines (fasting hours) and cannot book home blood collection easily.',
    bofuKeywords: [
      'diagnostic lab website design',
      'pathology center web development',
      'radiology scan booking website bangalore',
      'blood test home collection website'
    ],
    conversionArchitecture: 'Instant test search bar with fasting advice, 1-tap WhatsApp home blood collection booking, online report download link',
    demoSlug: 'healthcare-diagnostics.html'
  },
  {
    id: 'ivf-fertility-centers',
    name: 'IVF & Fertility Hospitals',
    category: 'Healthcare, Specialized Medical & Diagnostics',
    icon: 'Heart',
    targetPrice: '₹60,000 - ₹1,20,000',
    typicalClient: 'Senior embryologists, IVF chain centers, fertility specialists, surrogacy legal clinics',
    primaryPainPoint: 'Lack of discreet, empathetic consultation scheduling; clinical jargon overwhelms emotionally anxious patients.',
    bofuKeywords: [
      'ivf clinic website design bangalore',
      'fertility center web development',
      'embryologist website design',
      'reproductive medicine private consultation website'
    ],
    conversionArchitecture: '100% confidential private appointment scheduler, transparent success rate metrics by age group, empathetic video doctor introduction',
    demoSlug: 'clinic-polyclinic.html'
  },
  {
    id: 'cosmetic-dermatology-hair',
    name: 'Cosmetic Dermatology & Hair Restoration',
    category: 'Healthcare, Specialized Medical & Diagnostics',
    icon: 'Sparkles',
    targetPrice: '₹45,000 - ₹90,000',
    typicalClient: 'Aesthetic dermatologists, FUE hair transplant surgeons, laser skin clinics',
    primaryPainPoint: 'Generic aesthetics fail to convey clinical luxury; unverified Instagram testimonials do not convert high-ticket ₹1.5L+ procedures.',
    bofuKeywords: [
      'dermatologist website design bangalore',
      'hair transplant clinic web development',
      'skin laser aesthetic clinic website',
      'cosmetic surgery website designer'
    ],
    conversionArchitecture: 'Graft count pricing estimator, HD clinical case gallery with clinical timeline filters, direct doctor WhatsApp concierge',
    demoSlug: 'clinic-polyclinic.html'
  },
  {
    id: 'orthopedic-physiotherapy',
    name: 'Orthopedics & Sports Rehabilitation',
    category: 'Healthcare, Specialized Medical & Diagnostics',
    icon: 'Shield',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'Robotic joint replacement surgeons, sports injury physiotherapists, spine specialists',
    primaryPainPoint: 'Patients suffering acute mobility pain face confusing multi-step forms on slow WordPress templates.',
    bofuKeywords: [
      'orthopedic surgeon website design',
      'sports physiotherapy web development bangalore',
      'joint replacement doctor website',
      'physio home visit booking website'
    ],
    conversionArchitecture: 'Same-day emergency consultation triage, 3D anatomical condition explorer, verified hospital attachment credentials',
    demoSlug: 'doctor-specialist.html'
  },

  // Category 3: Architecture, Interiors & Real Estate
  {
    id: 'luxury-interior-designers',
    name: 'Luxury Residential Interior Designers',
    category: 'Architecture, Interiors & Real Estate',
    icon: 'Home',
    targetPrice: '₹50,000 - ₹95,000',
    typicalClient: 'Turnkey interior design studios, bespoke villa decorators, high-end apartment interior architects',
    primaryPainPoint: 'Slow unoptimized 4K portfolio images crash iOS Safari; homeowners leave before seeing signature villa work.',
    bofuKeywords: [
      'interior design website design bangalore',
      'luxury interior designer web development',
      'turnkey home interiors website',
      'architectural interior portfolio website'
    ],
    conversionArchitecture: 'WebP visual gallery loading in 0.6s, interactive 2BHK/3BHK cost estimator, floor plan consultation booking',
    demoSlug: 'interior-design.html'
  },
  {
    id: 'commercial-office-fitouts',
    name: 'Commercial Fit-outs & Office Architects',
    category: 'Architecture, Interiors & Real Estate',
    icon: 'Building',
    targetPrice: '₹60,000 - ₹1,20,000',
    typicalClient: 'Corporate workplace designers, co-working space contractors, tech park office fit-out agencies',
    primaryPainPoint: 'Facilities directors require square-footage capacity proof, LEED certification history, and safety audits before inviting bids.',
    bofuKeywords: [
      'commercial office interior website design',
      'corporate workspace fitout web development',
      'office interior contractors website bangalore',
      'turnkey corporate interiors website'
    ],
    conversionArchitecture: 'Per-sqft budget matrix calculator, past tech park case studies with client logos, project RFP specification intake',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'property-developers-builders',
    name: 'Real Estate Developers & Builders',
    category: 'Architecture, Interiors & Real Estate',
    icon: 'MapPin',
    targetPrice: '₹65,000 - ₹1,50,000',
    typicalClient: 'Gated community builders, villa plot developers, boutique apartment developers',
    primaryPainPoint: 'Landing pages fail RERA compliance checks; mobile lead forms suffer high drop-offs on 4G networks during marketing ad blitzes.',
    bofuKeywords: [
      'real estate builder website design bangalore',
      'property developer landing page development',
      'rera compliant real estate website',
      'villa project launch website designer'
    ],
    conversionArchitecture: 'Sub-second brochure download with instant phone OTP verification, live interactive unit availability plan, RERA statutory badge bar',
    demoSlug: 'real-estate.html'
  },
  {
    id: 'modular-kitchens-wardrobes',
    name: 'Modular Kitchens & Wardrobe Studios',
    category: 'Architecture, Interiors & Real Estate',
    icon: 'Grid',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'Factory-direct modular kitchen studios, European hardware dealers, custom wardrobe manufacturers',
    primaryPainPoint: 'Shoppers confuse factory-direct pricing with middleman showroom rates; lack of material transparency (BWP ply vs MDF).',
    bofuKeywords: [
      'modular kitchen website design bangalore',
      'wardrobe manufacturer web development',
      'custom modular furniture website',
      'kitchen studio showroom website'
    ],
    conversionArchitecture: 'L-shape/U-shape layout selector, hardware warranty guarantee seals (Blum/Hettich), instant 3D design consultation appointment',
    demoSlug: 'home-renovation.html'
  },
  {
    id: 'landscape-architecture-urban',
    name: 'Landscape Architects & Outdoor Living',
    category: 'Architecture, Interiors & Real Estate',
    icon: 'Compass',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'Villa landscape architects, commercial terrace garden specialists, sustainable urban landscape designers',
    primaryPainPoint: 'Prospective clients cannot visualize seasonal plant evolution or drip irrigation engineering from low-res pictures.',
    bofuKeywords: [
      'landscape architect website design',
      'outdoor living landscape designer web development',
      'terrace garden contractor website bangalore',
      'sustainable landscape architecture website'
    ],
    conversionArchitecture: 'Botanical curation filter, before-and-after greening transformations, corporate campus landscape portfolio viewer',
    demoSlug: 'creative-portfolio.html'
  },

  // Category 4: Professional, Legal & Corporate Advisory
  {
    id: 'corporate-law-firms',
    name: 'Corporate Law Firms & Legal Advisory',
    category: 'Professional, Legal & Corporate Advisory',
    icon: 'Briefcase',
    targetPrice: '₹55,000 - ₹1,10,000',
    typicalClient: 'M&A legal boutiques, venture financing counsels, IP dispute litigators, commercial contract lawyers',
    primaryPainPoint: 'Strict Bar Council advertising compliance constraints; corporate clients bounce from amateurish themes lacking institutional trust.',
    bofuKeywords: [
      'law firm website design bangalore',
      'corporate advocate web development',
      'bar council compliant legal website',
      'intellectual property law firm website'
    ],
    conversionArchitecture: 'Bar Council compliant disclaimer modal, distinguished partner profiles with matter experience summaries, confidential briefing intake',
    demoSlug: 'executive-coaching.html'
  },
  {
    id: 'chartered-accountants-tax',
    name: 'Chartered Accountants & Tax Advisors',
    category: 'Professional, Legal & Corporate Advisory',
    icon: 'Calculator',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'GST audit firms, cross-border transfer pricing specialists, startup financial controllers, forensic accountants',
    primaryPainPoint: 'Clients think the firm only files basic ITR; failure to highlight high-value virtual CFO and transaction advisory capabilities.',
    bofuKeywords: [
      'ca firm website design bangalore',
      'chartered accountant web development',
      'virtual cfo advisory website',
      'corporate tax audit consultant website'
    ],
    conversionArchitecture: 'Statutory compliance calendar widget, Virtual CFO retainer pricing tiers, secure client document portal link',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'patent-trademark-attorneys',
    name: 'Patent & Trademark Attorneys',
    category: 'Professional, Legal & Corporate Advisory',
    icon: 'FileText',
    targetPrice: '₹50,000 - ₹95,000',
    typicalClient: 'Patent prosecution agents, international trademark attorneys, deep-tech intellectual property strategists',
    primaryPainPoint: 'Startups fear their IP will be leaked; generic contact forms lack confidentiality assurances and NDA commitments.',
    bofuKeywords: [
      'patent attorney website design',
      'trademark registration agency website',
      'ip law firm web development bangalore',
      'patent filing consultancy website'
    ],
    conversionArchitecture: 'Instant trademark availability search assistant, automated mutual NDA generator, USPTO/EPO jurisdiction badges',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'executive-search-hr-firms',
    name: 'Executive Search & Staffing Consultancies',
    category: 'Professional, Legal & Corporate Advisory',
    icon: 'Users',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'C-suite headhunters, tech recruitment firms, global capability center (GCC) staffing partners',
    primaryPainPoint: 'Enterprise HR heads reject firms whose sites look like low-end placement agencies; candidates doubt recruiter credibility.',
    bofuKeywords: [
      'executive search firm website design',
      'recruitment agency web development bangalore',
      'tech staffing company website',
      'headhunter firm website designer'
    ],
    conversionArchitecture: 'Confidential executive vacancy board, GCC talent delivery track record metrics, hiring manager discovery call booking',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'iso-compliance-auditing',
    name: 'ISO Certification & ESG Advisory',
    category: 'Professional, Legal & Corporate Advisory',
    icon: 'CheckCircle',
    targetPrice: '₹45,000 - ₹80,000',
    typicalClient: 'ISO 9001/27001 consultants, ESG compliance advisors, CE/FDA certification readiness firms',
    primaryPainPoint: 'Manufacturers cannot determine which certifications apply to their export markets; confusing multi-page text walls.',
    bofuKeywords: [
      'iso certification consultant website',
      'esg audit consultancy website design',
      'iso 27001 compliance web development',
      'quality audit advisory website bangalore'
    ],
    conversionArchitecture: 'Compliance gap self-assessment quiz, interactive ISO standard selector, 48-hour audit readiness consultation hook',
    demoSlug: 'business-portfolio.html'
  },

  // Category 5: Technology, Electronics & Embedded Systems
  {
    id: 'b2b-enterprise-saas',
    name: 'B2B Enterprise SaaS & Cloud Platforms',
    category: 'Technology, Electronics & Embedded Systems',
    icon: 'Server',
    targetPrice: '₹65,000 - ₹1,40,000',
    typicalClient: 'Enterprise software founders, B2B workflow platforms, developer tool companies',
    primaryPainPoint: 'Complex technical value props are lost in bloated generic templates; demo conversion rates stagnate below 1.5%.',
    bofuKeywords: [
      'saas website design bangalore',
      'enterprise software web development',
      'b2b tech product landing page designer',
      'saas demo booking website design'
    ],
    conversionArchitecture: 'Interactive product capability tour, sub-second interactive pricing toggle, 1-click Cal.com demo booking embed',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'embedded-systems-iot',
    name: 'Embedded Systems & IoT Hardware',
    category: 'Technology, Electronics & Embedded Systems',
    icon: 'Radio',
    targetPrice: '₹55,000 - ₹1,10,000',
    typicalClient: 'IoT gateway builders, industrial telemetry device engineers, firmware development labs',
    primaryPainPoint: 'Prospective OEM partners cannot find hardware architecture block diagrams or pinout specifications easily.',
    bofuKeywords: [
      'iot hardware company website design',
      'embedded systems web development bangalore',
      'industrial telemetry devices website',
      'firmware engineering company website'
    ],
    conversionArchitecture: 'Interactive hardware architecture diagram, hardware spec sheet download portal, custom proof-of-concept request intake',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'electronics-manufacturing-ems',
    name: 'Electronics Manufacturing Services (EMS)',
    category: 'Technology, Electronics & Embedded Systems',
    icon: 'Cpu',
    targetPrice: '₹55,000 - ₹1,00,000',
    typicalClient: 'PCB assembly houses, SMT contract manufacturers, box-build electronic assemblers',
    primaryPainPoint: 'Global procurement heads need to verify SMT line capabilities (0201 component placement, BGA inspection) immediately.',
    bofuKeywords: [
      'ems company website design bangalore',
      'pcb assembly service web development',
      'electronics contract manufacturer website',
      'smt manufacturing facility website'
    ],
    conversionArchitecture: 'SMT line capacity specs (CPH ratings, AOI/X-Ray capabilities), turnkey BOM upload intake, RoHS/IPC class 3 compliance badges',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'cybersecurity-audit-firms',
    name: 'Cybersecurity Auditing & VAPT Services',
    category: 'Technology, Electronics & Embedded Systems',
    icon: 'Lock',
    targetPrice: '₹55,000 - ₹1,15,000',
    typicalClient: 'VAPT service providers, SOC 2 certification consultants, red team penetration testers',
    primaryPainPoint: 'If a cybersecurity firm’s own site has poor SSL headers, slow scripts, or third-party tracking bloat, CISOs dismiss them instantly.',
    bofuKeywords: [
      'cybersecurity firm website design',
      'vapt services web development bangalore',
      'soc 2 compliance consultant website',
      'penetration testing company website'
    ],
    conversionArchitecture: 'A+ security header proof score, interactive vulnerability sample report download, confidential scope assessment form',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'ai-data-engineering-consulting',
    name: 'AI & Data Engineering Consultancies',
    category: 'Technology, Electronics & Embedded Systems',
    icon: 'Terminal',
    targetPrice: '₹60,000 - ₹1,25,000',
    typicalClient: 'Enterprise GenAI development firms, data warehouse migration engineers, computer vision specialists',
    primaryPainPoint: 'Clients cannot distinguish genuine AI engineering capabilities from shallow wrapper marketing fluff.',
    bofuKeywords: [
      'ai consultancy website design bangalore',
      'data engineering firm web development',
      'machine learning solutions website',
      'enterprise genai agency website'
    ],
    conversionArchitecture: 'Live architectural benchmark comparisons, ROI cost reduction case metrics, data security & air-gapped deployment specs',
    demoSlug: 'business-portfolio.html'
  },

  // Category 6: Luxury Lifestyle, Hospitality & Creative
  {
    id: 'luxury-wedding-photography',
    name: 'Luxury Wedding & Destination Photography',
    category: 'Luxury Lifestyle, Hospitality & Creative',
    icon: 'Camera',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'Destination wedding photographers, cinematic wedding filmmakers, luxury portrait studios',
    primaryPainPoint: 'High-res photos freeze mobile browsers; brides and grooms bounce when 4K teaser reels buffer over 4G.',
    bofuKeywords: [
      'wedding photographer website design bangalore',
      'destination wedding photography web development',
      'cinematic wedding filmmaker website',
      'luxury photography portfolio website'
    ],
    conversionArchitecture: 'Butter-smooth mobile photo masonry with instant WebP loading, embedded Vimeo/HLS teaser reels, date availability checker',
    demoSlug: 'wedding-photography.html'
  },
  {
    id: 'boutique-resorts-getaways',
    name: 'Boutique Resorts & Heritage Getaways',
    category: 'Luxury Lifestyle, Hospitality & Creative',
    icon: 'Sun',
    targetPrice: '₹55,000 - ₹1,10,000',
    typicalClient: 'Coffee plantation estates (Coorg/Chikmagalur), luxury eco-resorts, wellness retreat lodges',
    primaryPainPoint: 'Paying 18-25% commission fees to MakeMyTrip/Booking.com because their direct website booking experience is clunky and slow.',
    bofuKeywords: [
      'resort website design bangalore',
      'boutique hotel web development',
      'luxury stay booking website',
      'heritage resort website designer'
    ],
    conversionArchitecture: 'Direct booking discount incentive bar, 360-degree room tour embed, interactive seasonal activity schedule',
    demoSlug: 'spa-wellness.html'
  },
  {
    id: 'luxury-spa-wellness-retreats',
    name: 'Luxury Spa & Ayurvedic Sanctuaries',
    category: 'Luxury Lifestyle, Hospitality & Creative',
    icon: 'Feather',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'Panchakarma Ayurvedic hospitals, day spas, sound healing centers, thermal hydrotherapy retreats',
    primaryPainPoint: 'Visitors cannot easily determine which treatment package fits their wellness goals; confusing PDF service menus.',
    bofuKeywords: [
      'spa website design bangalore',
      'ayurvedic retreat web development',
      'wellness sanctuary website design',
      'massage therapy booking website'
    ],
    conversionArchitecture: 'Interactive treatment recommendation quiz, therapist certification credentials, instant WhatsApp concierge booking',
    demoSlug: 'spa-wellness.html'
  },
  {
    id: 'fine-dining-event-catering',
    name: 'Premium Event Catering & Private Chefs',
    category: 'Luxury Lifestyle, Hospitality & Creative',
    icon: 'Coffee',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'High-end wedding caterers, corporate gala dining teams, artisanal bespoke culinary services',
    primaryPainPoint: 'Event hosts need to check per-plate pricing across cuisines (Chettinad, Coastal, Continental) without waiting days for quotes.',
    bofuKeywords: [
      'catering company website design bangalore',
      'wedding caterer web development',
      'corporate event catering website',
      'private chef booking website'
    ],
    conversionArchitecture: 'Interactive per-plate menu builder with instant price estimates, dietary preference filters (Jain/Vegan), tasting session booking',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'bespoke-couture-designer-wear',
    name: 'Bespoke Couture & Bridal Studios',
    category: 'Luxury Lifestyle, Hospitality & Creative',
    icon: 'Scissors',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'Bridal lehenga designers, bespoke menswear tailors, handcrafted silk saree boutiques',
    primaryPainPoint: 'Generic Shopify templates look cheap; brides seeking ₹2L+ outfits cannot book private salon fittings seamlessly.',
    bofuKeywords: [
      'bridal couture website design bangalore',
      'fashion designer web development',
      'bespoke tailoring studio website',
      'luxury apparel lookbook website'
    ],
    conversionArchitecture: 'High-resolution fabric weave zoom, VIP private fitting appointment scheduler, bride testimonial video reel',
    demoSlug: 'salon-beauty.html'
  },

  // Category 7: Education, Academies & EdTech
  {
    id: 'civil-services-ias-academy',
    name: 'Civil Services & UPSC Coaching Academies',
    category: 'Education, Academies & EdTech',
    icon: 'BookOpen',
    targetPrice: '₹50,000 - ₹95,000',
    typicalClient: 'UPSC/KPSC coaching institutes, judiciary exam academies, civil services test series portals',
    primaryPainPoint: 'Aspirants cannot find faculty credentials or historical ranker proofs; messy syllabus pages fail to drive trial class signups.',
    bofuKeywords: [
      'ias coaching website design bangalore',
      'upsc academy web development',
      'civil services coaching institute website',
      'competitive exam coaching website'
    ],
    conversionArchitecture: 'Hall of Fame ranker verification showcase, free demo lecture video access gate, batch schedule countdown timer',
    demoSlug: 'educational-academy.html'
  },
  {
    id: 'study-abroad-visa-consultants',
    name: 'Study Abroad & Overseas Education Consultancies',
    category: 'Education, Academies & EdTech',
    icon: 'Globe',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'US/UK/Germany study abroad agencies, IELTS coaching institutes, student visa counselors',
    primaryPainPoint: 'Parents are skeptical of fly-by-night operators; generic landing pages lack accredited partner university credentials.',
    bofuKeywords: [
      'study abroad consultancy website design',
      'overseas education web development bangalore',
      'student visa consultant website',
      'ielts coaching institute website'
    ],
    conversionArchitecture: 'Country-wise eligibility evaluation calculator, partner university acceptance letter showcase, 1-on-1 profile evaluation booking',
    demoSlug: 'educational-academy.html'
  },
  {
    id: 'preschool-montessori-chains',
    name: 'Preschool & Montessori Daycare Chains',
    category: 'Education, Academies & EdTech',
    icon: 'Smile',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'Montessori preschools, early childhood daycares, premium kindergarten chains',
    primaryPainPoint: 'Working parents researching daycare on mobile during lunch hours need immediate reassurance on safety, CCTV, and hygiene.',
    bofuKeywords: [
      'preschool website design bangalore',
      'montessori school web development',
      'daycare center website designer',
      'kindergarten admission website'
    ],
    conversionArchitecture: 'Campus safety virtual walkthrough, transparent age-group curriculum breakdown, instant weekend school tour booking',
    demoSlug: 'educational-academy.html'
  },
  {
    id: 'coding-bootcamp-skill-academies',
    name: 'Tech Bootcamps & Upskilling Academies',
    category: 'Education, Academies & EdTech',
    icon: 'Code',
    targetPrice: '₹50,000 - ₹95,000',
    typicalClient: 'Full-stack coding bootcamps, AI/ML upskilling centers, cloud DevOps training academies',
    primaryPainPoint: 'Students doubt salary placement claims; clumsy PDF syllabus downloads with mandatory marketing spam deter smart candidates.',
    bofuKeywords: [
      'coding bootcamp website design',
      'tech training institute web development',
      'data science academy website bangalore',
      'developer upskilling landing page'
    ],
    conversionArchitecture: 'Audited hiring partner salary breakdown, interactive curriculum milestone roadmap, instant syllabus download without gating phone numbers',
    demoSlug: 'educational-academy.html'
  },
  {
    id: 'executive-coaching-institutes',
    name: 'Executive Leadership & Public Speaking Coaching',
    category: 'Education, Academies & EdTech',
    icon: 'Award',
    targetPrice: '₹45,000 - ₹90,000',
    typicalClient: 'ICF certified executive coaches, CXO leadership mentors, corporate keynote speakers',
    primaryPainPoint: 'Coaches struggle to position their personal authority above amateur lifestyle influencers on LinkedIn.',
    bofuKeywords: [
      'executive coach website design bangalore',
      'leadership coaching web development',
      'cxo mentor website designer',
      'public speaking coach website'
    ],
    conversionArchitecture: 'Authority testimonial video strip with Fortune 500 leader quotes, keynote topic catalog, private discovery call intake',
    demoSlug: 'executive-coaching.html'
  },

  // Category 8: Automotive, Logistics & Supply Chain
  {
    id: 'third-party-logistics-3pl',
    name: '3PL Warehousing & Freight Forwarding',
    category: 'Automotive, Logistics & Supply Chain',
    icon: 'Truck',
    targetPrice: '₹55,000 - ₹1,10,000',
    typicalClient: '3PL warehouse operators, freight forwarders, container logistics firms (Hosakote, Nelamangala)',
    primaryPainPoint: 'Supply chain directors need to know pallet storage capacities, WMS system integrations, and bonded clearance status.',
    bofuKeywords: [
      'logistics company website design bangalore',
      '3pl warehousing web development',
      'freight forwarder website designer',
      'cold storage warehousing website'
    ],
    conversionArchitecture: 'Pallet storage space availability lookup, warehouse location map with highway connectivity radii, instant container freight rate RFQ',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'ev-fleet-charging-infra',
    name: 'Commercial EV Fleets & Charging Infrastructure',
    category: 'Automotive, Logistics & Supply Chain',
    icon: 'BatteryCharging',
    targetPrice: '₹55,000 - ₹1,15,000',
    typicalClient: 'Commercial EV fleet operators, DC fast-charging network developers, battery swapping station providers',
    primaryPainPoint: 'Corporate fleet managers cannot calculate total cost of ownership (TCO) savings compared to diesel fleets.',
    bofuKeywords: [
      'ev fleet website design bangalore',
      'ev charging station web development',
      'electric mobility company website',
      'fleet electrification consultancy website'
    ],
    conversionArchitecture: 'Interactive Diesel-vs-EV TCO savings calculator, live interactive charging station locator map, corporate fleet pilot booking form',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'automotive-component-makers',
    name: 'Tier-1 & Tier-2 Automotive Component Makers',
    category: 'Automotive, Logistics & Supply Chain',
    icon: 'Tool',
    targetPrice: '₹55,000 - ₹1,05,000',
    typicalClient: 'Automotive transmission gear makers, suspension component fabricators, braking system sub-suppliers',
    primaryPainPoint: 'IATF 16949 quality certifications are buried; procurement teams at OEMs cannot verify PPM defect rate standards.',
    bofuKeywords: [
      'automotive component manufacturer website',
      'tier 1 automotive supplier web development',
      'iatf 16949 certified manufacturing website',
      'auto parts exporter website bangalore'
    ],
    conversionArchitecture: 'IATF 16949 compliance verification center, OEM client tenure showcase, technical engineering inquiry router',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'luxury-auto-detailing-studios',
    name: 'Ceramic Coating & Luxury Auto Detailing Studios',
    category: 'Automotive, Logistics & Supply Chain',
    icon: 'ShieldCheck',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'TPU Paint Protection Film (PPF) installers, 9H ceramic coating studios, supercar detailing specialists',
    primaryPainPoint: 'Luxury car owners refuse to leave their ₹1 Cr+ vehicles with studios that look cheap or amateur online.',
    bofuKeywords: [
      'car detailing website design bangalore',
      'ceramic coating studio web development',
      'ppf installation website designer',
      'luxury car detailing website'
    ],
    conversionArchitecture: 'Interactive PPF package comparison matrix (Gloss vs Matte vs Self-healing), ultra-HD paint reflection gallery, slot booking with vehicle model lookup',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'cold-chain-pharmaceutical-logistics',
    name: 'Cold Chain & Temperature-Controlled Logistics',
    category: 'Automotive, Logistics & Supply Chain',
    icon: 'Thermometer',
    targetPrice: '₹55,000 - ₹1,10,000',
    typicalClient: 'Vaccine transport fleets, biologics cold room operators, reefer truck fleet logistics',
    primaryPainPoint: 'Pharma supply chain managers need proof of 2°C to 8°C continuous IoT temperature logging and backup power failovers.',
    bofuKeywords: [
      'cold chain logistics website design',
      'pharmaceutical transport web development',
      'temperature controlled warehousing website',
      'reefer fleet logistics website bangalore'
    ],
    conversionArchitecture: 'Live telemetry sensor architecture diagram, GDP (Good Distribution Practice) audit proofs, specialized route transit enquiry',
    demoSlug: 'business-portfolio.html'
  },

  // Category 9: Green Energy, CleanTech & Sustainability
  {
    id: 'rooftop-commercial-solar-epc',
    name: 'Commercial & Industrial Solar EPC Providers',
    category: 'Green Energy, CleanTech & Sustainability',
    icon: 'SunMedium',
    targetPrice: '₹55,000 - ₹1,10,000',
    typicalClient: 'Rooftop solar EPC contractors, industrial CAPEX/OPEX solar installers, solar water pumping engineers',
    primaryPainPoint: 'Factory owners are bombarded by solar sales reps; they need clear payback period calculations before requesting site surveys.',
    bofuKeywords: [
      'solar epc website design bangalore',
      'commercial solar installer web development',
      'industrial rooftop solar website',
      'solar energy company website designer'
    ],
    conversionArchitecture: 'Factory electricity bill to solar savings calculator, past industrial MWp installation case studies, free drone roof audit request',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'effluent-treatment-etp-stp',
    name: 'Industrial Effluent & Sewage Treatment (ETP/STP)',
    category: 'Green Energy, CleanTech & Sustainability',
    icon: 'Droplet',
    targetPrice: '₹50,000 - ₹95,000',
    typicalClient: 'Zero Liquid Discharge (ZLD) plant fabricators, commercial STP contractors, PCB pollution compliance engineers',
    primaryPainPoint: 'Industrial units facing KSPCB notices need rapid emergency compliance audits and clear BOD/COD reduction capability proof.',
    bofuKeywords: [
      'etp stp plant website design',
      'effluent treatment company web development',
      'zld plant manufacturer website bangalore',
      'water treatment engineering website'
    ],
    conversionArchitecture: 'KSPCB statutory compliance readiness guide, flow rate capacity selector (10 KLD to 5 MLD), emergency compliance hotline',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'industrial-energy-audits',
    name: 'BEE Energy Auditing & Carbon Advisory',
    category: 'Green Energy, CleanTech & Sustainability',
    icon: 'TrendingDown',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'BEE certified energy auditors, power quality specialists, harmonic distortion consultants',
    primaryPainPoint: 'Manufacturing plant heads do not know how much energy is wasted in boiler loops and air compressors; lack of quantifiable ROI proof.',
    bofuKeywords: [
      'energy audit company website design',
      'bee certified energy auditor website',
      'power quality consultancy web development',
      'carbon footprint advisory website bangalore'
    ],
    conversionArchitecture: 'Historical kWh energy savings counter, harmonic audit sample report download, preliminary energy walkthrough booking',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'biowaste-composting-recycling',
    name: 'Bio-Waste Processing & Circular Economy',
    category: 'Green Energy, CleanTech & Sustainability',
    icon: 'RefreshCw',
    targetPrice: '₹45,000 - ₹80,000',
    typicalClient: 'Organic waste converter (OWC) manufacturers, municipal composting contractors, plastic pyrolysis recyclers',
    primaryPainPoint: 'Apartment complexes and tech parks with bulk waste generator rules need automated OWC machinery specs without complex sales calls.',
    bofuKeywords: [
      'organic waste converter website design',
      'waste management company web development',
      'composting machine manufacturer website',
      'circular economy recycling website bangalore'
    ],
    conversionArchitecture: 'Daily waste tonnage to machine capacity matcher, BBMP bulk waste generator compliance checklist, live machinery demonstration booking',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'hvac-cleanroom-contractors',
    name: 'Cleanroom Engineering & Industrial HVAC',
    category: 'Green Energy, CleanTech & Sustainability',
    icon: 'Wind',
    targetPrice: '₹55,000 - ₹1,10,000',
    typicalClient: 'Pharmaceutical cleanroom builders, hospital modular OT contractors, industrial chiller ducting engineers',
    primaryPainPoint: 'Pharma and semiconductor clients cannot verify ISO Class 5 to Class 8 air change per hour (ACH) and HEPA validation track records.',
    bofuKeywords: [
      'cleanroom contractor website design',
      'industrial hvac company web development',
      'modular operation theatre website',
      'pharma cleanroom engineering website bangalore'
    ],
    conversionArchitecture: 'ISO cleanroom classification selector table, HEPA filter validation protocol showcase, turnkey project tender estimation form',
    demoSlug: 'business-portfolio.html'
  },

  // Category 10: Commercial Wholesale, Trade & Building Supplies
  {
    id: 'commercial-sanitaryware-tiles',
    name: 'Commercial Sanitaryware, Granite & Tiles',
    category: 'Commercial Wholesale, Trade & Building Supplies',
    icon: 'Square',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'Granite slab exporters (Jigani), wholesale tile distributors, luxury bathroom fittings distributors',
    primaryPainPoint: 'Architects and contractors need slab dimensions, finish textures (flamed/honed/polished), and live stock availability.',
    bofuKeywords: [
      'granite exporter website design jigani',
      'wholesale tiles dealer web development',
      'sanitaryware distributor website bangalore',
      'natural stone export website designer'
    ],
    conversionArchitecture: 'Slab texture visualizer, container export weight and FOB pricing calculator, sample box dispatch order form',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'industrial-pumps-valves',
    name: 'Industrial Pumps & Flow Control Valves',
    category: 'Commercial Wholesale, Trade & Building Supplies',
    icon: 'Activity',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'Centrifugal pump dealers, slurry pump manufacturers, industrial valve distributors',
    primaryPainPoint: 'Engineers need head height vs discharge capacity pump curve charts; PDFs fail on mobile.',
    bofuKeywords: [
      'industrial pump manufacturer website',
      'valve distributor web development bangalore',
      'slurry pump supplier website',
      'flow control equipment b2b website'
    ],
    conversionArchitecture: 'Interactive head vs flow rate pump sizing tool, chemical compatibility fluid selector, immediate engineering quote trigger',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'commercial-kitchen-equipment',
    name: 'Commercial Kitchen & Hotel Equipment',
    category: 'Commercial Wholesale, Trade & Building Supplies',
    icon: 'Utensils',
    targetPrice: '₹45,000 - ₹85,000',
    typicalClient: 'SS commercial kitchen fabricators, bakery equipment manufacturers, restaurant cold room suppliers',
    primaryPainPoint: 'Restaurateurs opening a new outlet need turnkey layout planning; failure to showcase custom fabrication capabilities.',
    bofuKeywords: [
      'commercial kitchen equipment website design',
      'hotel equipment manufacturer web development',
      'stainless steel kitchen fabrication website',
      'bakery equipment supplier website bangalore'
    ],
    conversionArchitecture: 'Restaurant seating capacity to kitchen equipment sizing guide, stainless steel grade certification (SS 304 food-grade), 2D kitchen layout consultation trigger',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'industrial-safety-ppe-supplies',
    name: 'Industrial Safety Equipment & PPE Wholesale',
    category: 'Commercial Wholesale, Trade & Building Supplies',
    icon: 'ShieldAlert',
    targetPrice: '₹40,000 - ₹75,000',
    typicalClient: 'Wholesale safety shoe distributors, flame-resistant boiler suit makers, fall protection harness suppliers',
    primaryPainPoint: 'EHS (Environmental Health and Safety) managers need bulk pricing with EN/IS standard compliance certifications attached to every item.',
    bofuKeywords: [
      'safety equipment supplier website design',
      'ppe manufacturer web development bangalore',
      'safety shoes wholesale website',
      'industrial safety gear b2b website'
    ],
    conversionArchitecture: 'EN/IS certification standard filtering, tiered volume discount matrix, fast annual rate contract (ARC) tender inquiry form',
    demoSlug: 'business-portfolio.html'
  },
  {
    id: 'specialty-industrial-chemicals',
    name: 'Specialty Chemicals & Industrial Lubricants',
    category: 'Commercial Wholesale, Trade & Building Supplies',
    icon: 'Beaker',
    targetPrice: '₹50,000 - ₹95,000',
    typicalClient: 'Industrial oil blenders, metalworking fluid distributors, specialty solvent chemical suppliers',
    primaryPainPoint: 'Plant maintenance managers cannot download MSDS (Material Safety Data Sheets) or Technical Data Sheets (TDS) without contacting sales reps.',
    bofuKeywords: [
      'industrial chemicals distributor website',
      'industrial lubricants manufacturer web development',
      'metalworking fluids supplier website bangalore',
      'specialty chemical exporter website'
    ],
    conversionArchitecture: 'Instant MSDS and TDS library search, oil viscosity and application matcher, bulk tanker and drum delivery quote request',
    demoSlug: 'business-portfolio.html'
  }
];

writeFileSync(targetJson, JSON.stringify(sectors, null, 2) + '\n', 'utf-8');
console.log(`Successfully generated ${sectors.length} commercial sectors in ${targetJson}`);
