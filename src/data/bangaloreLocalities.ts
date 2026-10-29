export interface LocalNicheConfig {
  nicheKey: string;
  name: string;
  icon: string;
  headline: string;
  subheadline: string;
  localHook: string;
  statBadge: string;
  targetPrice: string;
}

export interface BangaloreLocality {
  slug: string;
  name: string;
  kannadaName: string;
  zone: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  metroLine: string;
  keyLandmarks: string[];
  techParksAndHubs: string[];
  commercialProfile: string;
  painPointHook: string;
  niches: LocalNicheConfig[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const BANGALORE_LOCALITIES: Record<string, BangaloreLocality> = {
  indiranagar: {
    slug: "indiranagar",
    name: "Indiranagar",
    kannadaName: "ಇಂದಿರಾನಗರ",
    zone: "East Bengaluru",
    pincode: "560038",
    coordinates: {
      lat: 12.9784,
      lng: 77.6408
    },
    metroLine: "Purple Line (Indiranagar & CMH Road Stations)",
    keyLandmarks: [
      "100 Feet Road",
      "12th Main",
      "CMH Road",
      "Defense Colony",
      "Indiranagar Club"
    ],
    techParksAndHubs: [
      "Bagmane Tech Park Corridor",
      "Old Airport Road Executive Strip"
    ],
    commercialProfile: "Bengaluru’s premier high-street retail, aesthetic healthcare, and lifestyle district. Packed with high-ticket dental clinics, boutique interior architecture firms, and upscale bridal salons competing for affluent local residents.",
    painPointHook: "Patients and high-net-worth clients along 100 Feet Road and 12th Main browse exclusively on flagship smartphones. If your clinic or studio website takes more than 1.5 seconds to load or feels like a dated WordPress template, they immediately bounce to a competitor.",
    niches: [
      {
        nicheKey: "dental-clinics",
        name: "Aesthetic Dental & Implant Clinics",
        icon: "🦷",
        headline: "High-Converting Dental Clinic Websites in Indiranagar",
        subheadline: "Sub-second mobile patient booking, interactive smile makeover sliders, and zero WordPress bloat.",
        localHook: "Attracting high-ticket Invisalign, veneer, and dental implant patients across 100 Feet Road and Defense Colony.",
        statBadge: "0.8s LCP · 2-Tap Booking",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Luxury Interior Designers & Architects",
        icon: "📐",
        headline: "Bespoke Interior Design Websites in Indiranagar",
        subheadline: "Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.",
        localHook: "Positioning boutique residential architects for luxury villas in Defense Colony and contemporary apartments in East Bengaluru.",
        statBadge: "Sub-second 4K Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "coaches-consultants",
        name: "Executive Coaches & Leadership Advisors",
        icon: "🎯",
        headline: "Authority Websites for Consultants in Indiranagar",
        subheadline: "Convert high-ticket corporate advisory retainers with clean editorial typography and frictionless discovery booking.",
        localHook: "Helping boutique business consultants and C-suite leadership advisors win enterprise clients across Bengaluru tech hubs.",
        statBadge: "Zero Funnel Friction",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "salon-beauty",
        name: "Luxury Salons & Bridal Makeover Studios",
        icon: "✨",
        headline: "Luxury Salon & Bridal Styling Websites in Indiranagar",
        subheadline: "Sensory bridal package portfolios, verified before-and-after skin galleries, and direct WhatsApp concierge triage.",
        localHook: "Winning high-margin bridal party bookings and premium hair spa retainers on 100 Feet Road and CMH Road.",
        statBadge: "Instant WhatsApp Inquiries",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "yoga-meditation",
        name: "Holistic Yoga & Mindfulness Sanctuaries",
        icon: "🧘",
        headline: "Boutique Yoga & Mindfulness Websites in Indiranagar",
        subheadline: "Class batch schedules, teacher training enrollment funnels, and frictionless WhatsApp trial registration.",
        localHook: "Attracting mindful professionals and wellness seekers across Defense Colony and 100 Feet Road.",
        statBadge: "Class Schedule Matrices",
        targetPrice: "₹40,000"
      }
    ],
    faqs: [
      {
        question: "Can we meet Deepak & Geetha in Indiranagar before starting our website build?",
        answer: "Yes. We operate directly in Bengaluru and regularly meet founders and clinic directors across 100 Feet Road and 12th Main for an in-person discovery coffee, or we can conduct our rapid 20-minute architecture teardown via Google Meet."
      },
      {
        question: "How does Uncoded Hub deliver a complete custom website in just 7 days?",
        answer: "We do not juggle 40 client accounts or outsource your project to junior developers. Deepak hand-codes clean React architecture while Geetha designs your bespoke interface. One dedicated sprint, locked scope, and launch on Day 7."
      },
      {
        question: "What happens if our Indiranagar website build is not launched on Day 7?",
        answer: "We operate with a contractual Late-Means-Free guarantee. If your website is not delivered and live within 7 business days from project kickoff, the entire build is 100% free of charge."
      },
      {
        question: "Do you provide local Karnataka GST invoices for tax compliance?",
        answer: "Yes. All projects receive formal corporate tax invoices with our registered Karnataka GSTIN, allowing full input tax credit (ITC) for your registered business."
      }
    ]
  },
  koramangala: {
    slug: "koramangala",
    name: "Koramangala",
    kannadaName: "ಕೋರಮಂಗಲ",
    zone: "South-East Bengaluru",
    pincode: "560034",
    coordinates: {
      lat: 12.9352,
      lng: 77.6245
    },
    metroLine: "Yellow Line (Koramangala Station under development / Silk Board corridor)",
    keyLandmarks: [
      "Sony World Signal",
      "80 Feet Road",
      "Forum Mall",
      "Koramangala Club",
      "5th Block Commercial Strip"
    ],
    techParksAndHubs: [
      "Koramangala Industrial Layout",
      "BHIVE & WeWork Tech Hubs"
    ],
    commercialProfile: "India’s startup capital. Home to venture-backed tech unicorns, high-growth SaaS firms, premier dental specialists, and elite functional fitness clubs.",
    painPointHook: "Koramangala tech founders and discerning consumers expect Silicon Valley-grade digital polish. A generic agency WordPress site with 35 plugins will destroy your brand credibility before your first discovery call starts.",
    niches: [
      {
        nicheKey: "business-portfolio",
        name: "Venture-Backed Startups & SaaS Firms",
        icon: "💼",
        headline: "High-Impact Startup Websites in Koramangala",
        subheadline: "Fast, investor-ready web architecture built with clean React & Tailwind. Sub-second performance that converts enterprise leads.",
        localHook: "Positioning seed-stage and Series-A tech ventures in Koramangala 4th, 5th, and 8th Blocks for global credibility.",
        statBadge: "99/100 Performance Score",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "dental-clinics",
        name: "Advanced Cosmetic & Dental Clinics",
        icon: "🦷",
        headline: "Modern Dental Practice Websites in Koramangala",
        subheadline: "Two-tap appointment booking, clear procedure pricing, and verified patient reviews built for tech-savvy residents.",
        localHook: "Capturing busy tech professionals and founders seeking smile makeovers and dental implants on 80 Feet Road.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Bespoke Residential Interior Designers",
        icon: "📐",
        headline: "Interior Architecture Portfolios in Koramangala",
        subheadline: "Fluid image streaming for high-ticket residential transformations, modular kitchen showcases, and client intake forms.",
        localHook: "Winning luxury villa and penthouse design mandates across Koramangala 3rd Block and ST Bed Layout.",
        statBadge: "0.8s LCP Portfolio",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "gym-fitness-club",
        name: "Functional Fitness Studios & Gym Clubs",
        icon: "⚡",
        headline: "High-Converting Fitness Club Websites in Koramangala",
        subheadline: "Membership tiering calculators, class timetable schedulers, and zero-friction WhatsApp trial pass funnels.",
        localHook: "Driving packed member enrollments for boutique strength, CrossFit, and personal training studios.",
        statBadge: "Instant WhatsApp Trials",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "coaches-consultants",
        name: "Startup Advisors & Leadership Mentors",
        icon: "🎯",
        headline: "Executive Coaching & Advisory Websites in Koramangala",
        subheadline: "Convert enterprise consulting retainers with clean editorial typography and frictionless discovery booking.",
        localHook: "Helping angel investors, executive mentors, and strategy consultants win clients across Koramangala tech hubs.",
        statBadge: "Discovery Booking Flow",
        targetPrice: "₹45,000"
      }
    ],
    faqs: [
      {
        question: "Why choose custom React over Webflow or WordPress for a Koramangala startup?",
        answer: "WordPress relies on 30+ plugins that constantly break, lag on mobile, and create security holes. Webflow locks you into perpetual recurring monthly platform fees. Our custom React architecture delivers sub-second load times, 100% code ownership, and zero monthly lock-in fees."
      },
      {
        question: "Can you integrate our custom booking system or CRM into the website?",
        answer: "Yes. We seamlessly connect HubSpot, Zoho, Google Calendar, Calendly, WhatsApp Business API, and Supabase database webhooks directly during the 7-day sprint."
      },
      {
        question: "Can we meet in Koramangala for a technical discussion?",
        answer: "Absolutely. We frequently meet clients across 80 Feet Road and 5th Block co-working hubs or cafes to review requirements in detail."
      },
      {
        question: "How do you handle hosting and DNS deployment?",
        answer: "We deploy to high-speed global CDN edge networks (Cloudflare, Vercel, or Netlify) with sub-30ms response times in Bengaluru. You retain full administrative access and git repository ownership."
      }
    ]
  },
  whitefield: {
    slug: "whitefield",
    name: "Whitefield",
    kannadaName: "ವೈಟ್‌ಫೀಲ್ಡ್",
    zone: "East Bengaluru",
    pincode: "560066",
    coordinates: {
      lat: 12.9698,
      lng: 77.7499
    },
    metroLine: "Purple Line (ITPL, Hopefarm, and Kadugodi Tree Park Stations)",
    keyLandmarks: [
      "ITPL (International Tech Park)",
      "Prestige Shantiniketan",
      "Hope Farm Junction",
      "Forum Shantiniketan",
      "EPIP Zone"
    ],
    techParksAndHubs: [
      "ITPL",
      "EPIP Industrial Area",
      "Bagmane Constellation",
      "Sigma Tech Park"
    ],
    commercialProfile: "Bengaluru’s primary multinational IT capital and luxury residential villa belt. Home to massive tech conglomerates, luxury real estate developers, multi-specialty polyclinics, and high-end home renovation centers.",
    painPointHook: "Whitefield clients are senior tech executives and NRI property investors. Slow, generic websites with broken mobile navigation immediately fail their expectations. You need clean, sub-second web architecture that converts high-ticket inquiries.",
    niches: [
      {
        nicheKey: "real-estate",
        name: "Luxury Real Estate Brokers & Villa Developers",
        icon: "🏛️",
        headline: "Luxury Real Estate Websites in Whitefield",
        subheadline: "High-net-worth property showcase portals, interactive floorplans, RERA compliance badges, and private lead gates.",
        localHook: "Marketing ₹3 Cr+ luxury villas and penthouses around Palm Meadows, Prestige Shantiniketan, and Kadugodi.",
        statBadge: "HNW Buyer Funnels",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Multi-Specialty Polyclinics & Centers",
        icon: "🏥",
        headline: "Modern Polyclinic & Clinic Websites in Whitefield",
        subheadline: "Doctor schedule matrices, 2-tap OPD appointment booking, and emergency WhatsApp routing for local families.",
        localHook: "Capturing corporate employee healthcare consultations across ITPL and surrounding gated communities.",
        statBadge: "Real-Time OPD Intake",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Enterprise IT & B2B Tech Consultancies",
        icon: "💼",
        headline: "Enterprise B2B Tech Websites in Whitefield",
        subheadline: "Clean architecture diagrams, NDA case studies, and corporate RFP lead capture for global technology firms.",
        localHook: "Positioning software engineering and AI consultancy firms operating out of EPIP Zone and ITPL.",
        statBadge: "Enterprise RFP Funnels",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "home-renovation",
        name: "Turnkey Home Renovation & Modular Studios",
        icon: "🔨",
        headline: "Modular Kitchen & Renovation Websites in Whitefield",
        subheadline: "Interactive modular kitchen cost estimators, 3D factory tour streaming, and society-specific package pages.",
        localHook: "Winning full-apartment interiors and villa refurbishment contracts in high-rise communities along Whitefield Main Road.",
        statBadge: "Interactive Cost Estimators",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "educational-academy",
        name: "International Academies & Training Centers",
        icon: "🎓",
        headline: "Educational Academy Websites in Whitefield",
        subheadline: "Curriculum syllabus gateways, admission inquiry funnels, and upcoming batch countdown schedules.",
        localHook: "Enrolling students for international foundation programs, STEM academies, and professional upskilling in East Bengaluru.",
        statBadge: "Admissions Funnel Engine",
        targetPrice: "₹40,000"
      }
    ],
    faqs: [
      {
        question: "Do your real estate websites handle RERA registration and floorplan downloads?",
        answer: "Yes. We build compliant real estate landing experiences complete with RERA registration disclosures, lightweight PDF brochure downloads, and interactive unit floorplan viewers."
      },
      {
        question: "How do you guarantee sub-second speed for heavy image galleries?",
        answer: "We use modern AVIF/WebP image compression, responsive srcset attributes, and edge CDN caching. Your 4K architectural photos load crisply in 0.8 seconds without draining mobile data."
      },
      {
        question: "Are there any recurring monthly charges from Uncoded Hub?",
        answer: "Zero. We hand over 100% of your source code and assets on Day 7. You own your website completely with zero monthly agency lock-in."
      },
      {
        question: "Can you meet at our Whitefield office or tech park?",
        answer: "Yes, we regularly travel along the Purple Metro Line to meet clients near ITPL, Forum Shantiniketan, and EPIP Zone."
      }
    ]
  },
  "hsr-layout": {
    slug: "hsr-layout",
    name: "HSR Layout",
    kannadaName: "ಹೆಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್",
    zone: "South Bengaluru",
    pincode: "560102",
    coordinates: {
      lat: 12.9121,
      lng: 77.6446
    },
    metroLine: "Silk Board & Agara Metro Hubs (upcoming Pink/Yellow interchange)",
    keyLandmarks: [
      "27th Main",
      "Agara Lake",
      "Sector 1 to Sector 7",
      "BDA Complex HSR",
      "Club HSR"
    ],
    techParksAndHubs: [
      "BHIVE Workspace Sector 6",
      "Startup Corridor 27th Main"
    ],
    commercialProfile: "Bengaluru’s fastest-growing venture capital and early-stage startup district. Blends high-density venture studios, premium fitness gyms, modern modular renovation studios, and specialized healthcare practices.",
    painPointHook: "The competitive density on 27th Main is intense. If your digital presence looks like an outdated generic template, prospects immediately assume your service quality is just as outdated.",
    niches: [
      {
        nicheKey: "business-portfolio",
        name: "Early-Stage Startups & AI Ventures",
        icon: "💼",
        headline: "Modern Startup Websites in HSR Layout",
        subheadline: "Crisp product positioning, investor proof points, and lightning-fast lead funnels built for rapid fundraising.",
        localHook: "Helping seed and bootstrapped ventures along 27th Main and Sector 1 stand out to global customers and VCs.",
        statBadge: "0.7s Global Edge Speed",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "gym-fitness-club",
        name: "Commercial Gyms & Strength Clubs",
        icon: "⚡",
        headline: "High-Impact Fitness Club Websites in HSR Layout",
        subheadline: "Class schedule matrices, certified trainer profiles, and instant WhatsApp 1-day pass booking funnels.",
        localHook: "Packing gym floor memberships and personal training rosters in Sector 2, 3, and 7.",
        statBadge: "Trial Pass Inquiries",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "home-renovation",
        name: "Modular Interiors & Renovation Contractors",
        icon: "🔨",
        headline: "Modular Kitchen & Renovation Websites in HSR",
        subheadline: "Instant price calculator widgets, material transparency specs, and verified before-and-after renovation sliders.",
        localHook: "Winning turnkey interior contracts for new apartments across HSR Layout and Haralur Road.",
        statBadge: "Instant Price Calculators",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "doctor-specialist",
        name: "Specialist Doctors & Surgical Clinics",
        icon: "🩺",
        headline: "Doctor & Specialist Practice Websites in HSR",
        subheadline: "Surgical credentials, ethical NMC-compliant proof, second-opinion video consults, and OPD schedule triage.",
        localHook: "Building patient trust for orthopedic, pediatric, and dermatologic specialists across Sector 1 to 6.",
        statBadge: "Ethical Medical UX",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "coaches-consultants",
        name: "Product & Startup Advisory Consultants",
        icon: "🎯",
        headline: "Consulting & Advisory Websites in HSR Layout",
        subheadline: "Editorial typography, thought leadership gateways, and direct discovery call scheduling for tech advisors.",
        localHook: "Helping product leaders, fractional executives, and business mentors on 27th Main win advisory retainers.",
        statBadge: "Discovery Booking Flow",
        targetPrice: "₹45,000"
      }
    ],
    faqs: [
      {
        question: "How fast can our HSR startup website be deployed for an upcoming launch?",
        answer: "Exactly 7 business days from asset intake. If you have an upcoming demo day or product launch, we lock the scope on Day 1 and push live on Day 7."
      },
      {
        question: "Do you write the website copy or do we need to provide it?",
        answer: "We handle the technical positioning, structure, and conversion copywriting based on your discovery call. You review and approve the text on Day 4."
      },
      {
        question: "Can we integrate WhatsApp Business chat and calendar links?",
        answer: "Yes. Every website includes direct WhatsApp click-to-chat triggers with pre-filled messages and embedded Google Meet/Calendly booking widgets."
      },
      {
        question: "What is included in the post-launch handover?",
        answer: "You receive full GitHub repository ownership, DNS handover, admin credentials, and a personalized 15-minute video walkthrough showing you how to edit content effortlessly."
      }
    ]
  },
  marathahalli: {
    slug: "marathahalli",
    name: "Marathahalli",
    kannadaName: "ಮಾರತಹಳ್ಳಿ",
    zone: "East Bengaluru",
    pincode: "560037",
    coordinates: {
      lat: 12.9569,
      lng: 77.7011
    },
    metroLine: "Upcoming Blue Line (Outer Ring Road Metro Corridor)",
    keyLandmarks: [
      "Marathahalli Bridge",
      "Kalamandir Junction",
      "Outer Ring Road Strip",
      "Multiplex Corridor",
      "AECS Layout Link"
    ],
    techParksAndHubs: [
      "Prestige Tech Park",
      "Cessna Business Park Corridor",
      "Embassy TechVillage Link"
    ],
    commercialProfile: "High-energy Outer Ring Road transit and commercial hub. Packed with coaching academies, diagnostic testing laboratories, modular interior studios, and wedding event photography vendors.",
    painPointHook: "Thousands of corporate commuters pass through Marathahalli daily searching on mobile for local services. If your site is sluggish or doesn’t give instant WhatsApp contact options, they pick the next listing on Google.",
    niches: [
      {
        nicheKey: "home-renovation",
        name: "Modular Kitchens & Renovation Studios",
        icon: "🔨",
        headline: "Modular Kitchen Websites in Marathahalli",
        subheadline: "Transparent modular interior pricing calculators, factory finish showcases, and quick estimate intake forms.",
        localHook: "Capturing apartment buyers moving into Panathur, Kadubeesanahalli, and ORR residential projects.",
        statBadge: "Estimate Intake Engine",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "healthcare-diagnostics",
        name: "Diagnostic Pathology & Imaging Centers",
        icon: "🔬",
        headline: "Diagnostic Center & Pathology Lab Websites in Marathahalli",
        subheadline: "Health checkup package comparisons, 2-tap home sample collection booking, and instant WhatsApp report retrieval.",
        localHook: "Serving tech park employees and resident families requiring rapid turnaround blood work and health checks.",
        statBadge: "Home Sample Booking Flow",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "educational-academy",
        name: "Professional Training & Upskilling Academies",
        icon: "🎓",
        headline: "Educational Academy Websites in Marathahalli",
        subheadline: "Syllabus downloads, placement record showcases, student video reviews, and batch enrollment countdown funnels.",
        localHook: "Winning tech training enrollments (Data Science, Cloud, DevOps) from aspiring engineers across Bengaluru.",
        statBadge: "Syllabus Download Funnels",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "wedding-photographers",
        name: "Wedding & Event Photography Studios",
        icon: "📷",
        headline: "Wedding Photography Websites in Marathahalli",
        subheadline: "Cinematic 4K teaser reels streamed without mobile buffer lag, transparent package tiers, and date availability checkers.",
        localHook: "Booking luxury wedding photography and reception film packages for couples across East Bengaluru.",
        statBadge: "Sub-second 4K Video Reels",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "dental-clinics",
        name: "Family Dental & Orthodontic Practices",
        icon: "🦷",
        headline: "Modern Dental Practice Websites in Marathahalli",
        subheadline: "Instant 2-tap appointment booking, transparent procedure fees, and smile correction galleries for families.",
        localHook: "Attracting working professionals and residential families living along the Outer Ring Road corridor.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can your diagnostic lab websites handle online home sample collection bookings?",
        answer: "Yes. We build clean, anti-spam booking forms with instant WhatsApp and email notifications sent directly to your collection phlebotomist team."
      },
      {
        question: "How do you ensure 4K video portfolios load fast on mobile devices?",
        answer: "We stream optimized video embeds with lazy loading and lightweight poster frames, ensuring your videos play smoothly without slowing down the page."
      },
      {
        question: "Is SEO included for Marathahalli search terms?",
        answer: "Yes. Local Schema markup, OpenGraph metadata, localized headings, and XML sitemaps are coded directly into the build on Day 5."
      },
      {
        question: "What is the investment for a complete 7-day custom build?",
        answer: "Our transparent pricing ranges from ₹30,000 to ₹55,000 all-inclusive depending on functionality. Zero hidden fees, zero ongoing retainer requirements."
      }
    ]
  },
  domlur: {
    slug: "domlur",
    name: "Domlur",
    kannadaName: "ದೊಮ್ಲೂರು",
    zone: "Central-East Bengaluru",
    pincode: "560071",
    coordinates: {
      lat: 12.9609,
      lng: 77.6387
    },
    metroLine: "Purple Line (Near Indiranagar & Trinity Stations)",
    keyLandmarks: [
      "Embassy Golf Links (EGL)",
      "Domlur Flyover",
      "Doopanahalli",
      "Inner Ring Road",
      "KGA Golf Course"
    ],
    techParksAndHubs: [
      "Embassy Golf Links Business Park",
      "Dell & IBM Corporate Campuses"
    ],
    commercialProfile: "Prestigious business district anchored by Embassy Golf Links (EGL). High concentration of multinational corporate headquarters, creative design agencies, senior consultants, and executive health clinics.",
    painPointHook: "Corporate decision-makers at EGL and multinational firms have zero tolerance for amateur websites. Your digital presence must reflect institutional trust, editorial elegance, and sub-second technical speed.",
    niches: [
      {
        nicheKey: "creative-portfolio",
        name: "Creative Studios & Branding Agencies",
        icon: "🎨",
        headline: "Creative Agency Portfolios in Domlur",
        subheadline: "Sub-second editorial case studies, visual craft showcases, and frictionless B2B client inquiry intake.",
        localHook: "Helping boutique design and branding practices in Domlur win enterprise retainer clients.",
        statBadge: "Award-Winning Speed & Polish",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "coaches-consultants",
        name: "Management & Strategy Consultants",
        icon: "🎯",
        headline: "B2B Consulting Websites in Domlur",
        subheadline: "Authority white-paper gateways, client case studies under NDA, and direct executive discovery call booking.",
        localHook: "Winning advisory contracts with multinational corporations operating across Embassy Golf Links.",
        statBadge: "Enterprise Discovery Flow",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Executive Health Suites & Polyclinics",
        icon: "🏥",
        headline: "Executive Clinic Websites in Domlur",
        subheadline: "Corporate health screening packages, doctor OPD schedules, and seamless 2-tap appointment booking.",
        localHook: "Serving executive corporate staff and residents living in Domlur and the Golf Course corridor.",
        statBadge: "Executive OPD Triage",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Commercial & Workplace Interior Architects",
        icon: "📐",
        headline: "Commercial Workspace Design Websites in Domlur",
        subheadline: "High-resolution office fit-out portfolios, ergonomics case studies, and fast corporate tender downloads.",
        localHook: "Positioning commercial interior contractors for new office buildouts in EGL and Central Bengaluru.",
        statBadge: "Commercial Tender Gateways",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Enterprise Tech & B2B Software Firms",
        icon: "💼",
        headline: "Enterprise B2B Software Websites in Domlur",
        subheadline: "Sub-second performance, security certification proof, and corporate RFP consultation gates.",
        localHook: "Positioning software development and cloud consulting firms operating near Embassy Golf Links.",
        statBadge: "Enterprise RFP Funnels",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Do you build confidential NDA-compliant case studies for consultants?",
        answer: "Yes. We design anonymized enterprise case studies that showcase measurable business outcomes, ROI, and methodology without disclosing protected client identities."
      },
      {
        question: "Can you deliver the site within our corporate quarter deadline?",
        answer: "Our sprint runs on an immutable 7-business-day timeline. Day 1 kickoff to Day 7 live deployment, backed by our late-means-free guarantee."
      },
      {
        question: "Can we meet at Embassy Golf Links (EGL) for an in-person briefing?",
        answer: "Yes, we regularly meet corporate clients at EGL, nearby hotels, or over Google Meet."
      },
      {
        question: "Is the code fully proprietary and portable?",
        answer: "Yes. You receive clean React source code hosted on your own GitHub account. Zero proprietary builder lock-in."
      }
    ]
  },
  hal: {
    slug: "hal",
    name: "HAL & Old Airport Road",
    kannadaName: "ಹೆಚ್‌ಎಎಲ್",
    zone: "East Bengaluru",
    pincode: "560017",
    coordinates: {
      lat: 12.9614,
      lng: 77.6565
    },
    metroLine: "Purple Line Link (Indiranagar / Swami Vivekananda Rd Stations)",
    keyLandmarks: [
      "The Leela Palace",
      "HAL Heritage Centre",
      "Manipal Hospital Corridor",
      "Kodihalli",
      "Wind Tunnel Road"
    ],
    techParksAndHubs: [
      "HAL Aerospace Complex",
      "Old Airport Road Executive Strip"
    ],
    commercialProfile: "Historic high-value corridor blending world-renowned super-specialty hospitals (Manipal), luxury heritage hotels (Leela Palace), luxury real estate developments, and premium day spas.",
    painPointHook: "Medical patients and luxury travelers expect impeccable bedside manner and instant answers. An unclear, slow website destroys patient confidence before they ever step into your OPD.",
    niches: [
      {
        nicheKey: "doctor-specialist",
        name: "Super-Specialist Surgeons & Consultants",
        icon: "🩺",
        headline: "Medical Practice Websites on Old Airport Road",
        subheadline: "Surgical credentials, ethical patient education guides, second-opinion booking, and hospital privileges proof.",
        localHook: "Attracting private second-opinion and international surgical patients along Old Airport Road.",
        statBadge: "NMC-Compliant Trust UX",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "real-estate",
        name: "Heritage & Luxury Property Consultants",
        icon: "🏛️",
        headline: "Luxury Real Estate Portals on Old Airport Road",
        subheadline: "High-net-worth property presentations, discreet inquiry screening, and floorplan viewers.",
        localHook: "Showcasing luxury residences and prime plots around Leela Palace and Kodihalli.",
        statBadge: "HNW Buyer Protection",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "spa-wellness",
        name: "Luxury Day Spas & Ayurvedic Centers",
        icon: "🌿",
        headline: "Luxury Wellness & Spa Websites in HAL",
        subheadline: "Sensory treatment ritual menus, couple retreat package calculators, and instant WhatsApp concierge booking.",
        localHook: "Attracting high-margin spa memberships and wellness tourists around luxury hospitality hubs.",
        statBadge: "Instant Concierge Booking",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Aerospace & Industrial Engineering Advisory",
        icon: "💼",
        headline: "Engineering & Industrial Advisory Websites in HAL",
        subheadline: "Technical capability matrix, defense & aerospace certifications, and secure corporate inquiry gates.",
        localHook: "Positioning engineering consultancies and defense suppliers near the HAL aerospace complex.",
        statBadge: "ISO/AS9100 Trust Proof",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Specialized Outpatient & Family Clinics",
        icon: "🏥",
        headline: "Family Polyclinic Websites on Old Airport Road",
        subheadline: "Doctor OPD schedules, 2-tap appointment booking, and emergency WhatsApp routing for local residents.",
        localHook: "Serving families and executives living along the Old Airport Road and Leela Palace corridor.",
        statBadge: "Instant OPD Schedules",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Are your doctor websites compliant with National Medical Commission (NMC) guidelines?",
        answer: "Yes. We strictly adhere to medical advertising ethics: verified qualifications, transparent OPD hours, educational symptom guides, and zero misleading commercial discount claims."
      },
      {
        question: "Can patients book video consultations directly through the website?",
        answer: "Yes. We integrate secure Google Meet and WhatsApp video consultation scheduling flows with automated reminder confirmations."
      },
      {
        question: "How do you handle high-resolution photos of spa facilities without lag?",
        answer: "We use next-generation WebP compression and browser-level lazy loading so your luxury images look crystal clear while loading in under 0.8 seconds."
      },
      {
        question: "Can we track how many inquiries come from Google search?",
        answer: "Yes. We configure privacy-friendly event tracking for WhatsApp clicks, phone call taps, and form submissions with zero tracking bloat."
      }
    ]
  },
  "mg-road": {
    slug: "mg-road",
    name: "MG Road & CBD",
    kannadaName: "ಎಂ.ಜಿ. ರಸ್ತೆ",
    zone: "Central Bengaluru",
    pincode: "560001",
    coordinates: {
      lat: 12.9756,
      lng: 77.6066
    },
    metroLine: "Purple Line (MG Road & Trinity Stations)",
    keyLandmarks: [
      "MG Road Boulevard",
      "Brigade Road",
      "Trinity Circle",
      "Commercial Street",
      "Cubbon Park"
    ],
    techParksAndHubs: [
      "Barton Centre",
      "Raheja Towers",
      "Canara Bank HQ Corridor",
      "UB City Link"
    ],
    commercialProfile: "The historic Central Business District (CBD) of Bengaluru. The power center for legacy corporate law firms, commercial real estate developers, senior medical specialists, and luxury wedding event planners.",
    painPointHook: "Institutional clients visiting an MG Road firm expect timeless prestige and flawless execution. A cheap WordPress theme makes an established 25-year practice look like an unverified amateur.",
    niches: [
      {
        nicheKey: "doctor-specialist",
        name: "Senior Medical Specialists & Surgeons",
        icon: "🩺",
        headline: "Senior Specialist Practice Websites on MG Road",
        subheadline: "Distinguished surgical case volume proof, clinical credentials, and international second-opinion portals.",
        localHook: "Building authority for leading doctors with private consulting chambers in the Central Business District.",
        statBadge: "Senior Clinician Authority",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "real-estate",
        name: "Commercial Real Estate & Grade-A Offices",
        icon: "🏛️",
        headline: "Commercial Real Estate Websites in Central Bengaluru",
        subheadline: "Grade-A office leasing portals, technical floorplate specs, and discreet investor inquiry funnels.",
        localHook: "Marketing prime commercial real estate and retail assets on MG Road and Brigade Road.",
        statBadge: "Commercial Lease Gateways",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Corporate Law Firms & Financial Advisory",
        icon: "💼",
        headline: "Corporate Law & Advisory Websites on MG Road",
        subheadline: "Bar Council compliant credentials, partner biographies, industry white-papers, and secure client contact.",
        localHook: "Establishing institutional credibility for established legal, private wealth, and audit practices.",
        statBadge: "Institutional Trust Design",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "wedding-photographers",
        name: "Couture Wedding Photographers & Filmmakers",
        icon: "📷",
        headline: "Luxury Wedding Filmmaker Websites in Central Bengaluru",
        subheadline: "High-bandwidth 4K video teaser streaming, bridal portfolio galleries, and transparent package guides.",
        localHook: "Booking luxury 5-star wedding celebrations at Taj West End, The Leela, and Bangalore Palace.",
        statBadge: "Sub-second 4K Video Reels",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Executive Polyclinics & Consultation Suites",
        icon: "🏥",
        headline: "Executive Health Polyclinic Websites on MG Road",
        subheadline: "Corporate health screening packages, doctor OPD schedules, and seamless 2-tap appointment booking.",
        localHook: "Serving executive corporate staff and Central Business District professionals.",
        statBadge: "Executive OPD Triage",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can you comply with Bar Council regulations for law firm websites?",
        answer: "Yes. We design clean, informational directories with partner credentials, practice areas, and thought leadership that respect Bar Council advertising rules."
      },
      {
        question: "How quickly can our CBD practice launch a new website?",
        answer: "In exactly 7 business days. We handle everything from typography to live hosting, backed by our contractual late-means-free guarantee."
      },
      {
        question: "Do you provide in-person meetings around MG Road?",
        answer: "Yes, we can meet at your MG Road chambers or at any quiet Central Bengaluru venue for an initial scoping session."
      },
      {
        question: "Will our website work seamlessly on mobile phones and Apple iPads?",
        answer: "Yes. Every screen is custom designed by Geetha for fluid responsiveness across iPhones, iPads, and high-resolution Retina displays."
      }
    ]
  },
  halasuru: {
    slug: "halasuru",
    name: "Halasuru (Ulsoor)",
    kannadaName: "ಹಲಸೂರು",
    zone: "Central-East Bengaluru",
    pincode: "560008",
    coordinates: {
      lat: 12.9817,
      lng: 77.6284
    },
    metroLine: "Purple Line (Halasuru & Trinity Stations)",
    keyLandmarks: [
      "Ulsoor Lake",
      "Kensington Road",
      "Someshwara Temple",
      "Bazaar Street",
      "Sivanchetti Gardens"
    ],
    techParksAndHubs: [
      "MG Road-CBD Link Corridor",
      "Murphy Town Business Belt"
    ],
    commercialProfile: "Historic, culturally rich central district famous for Ulsoor Lake, luxury Ayurvedic day spas, boutique interior design firms, bespoke wedding event vendors, and multi-specialty medical clinics.",
    painPointHook: "Ulsoor is where traditional Bengaluru heritage meets modern luxury living. A cookie-cutter website fails to communicate the sensory craftsmanship and heritage trust of your service.",
    niches: [
      {
        nicheKey: "spa-wellness",
        name: "Ayurvedic Retreats & Luxury Day Spas",
        icon: "🌿",
        headline: "Ayurvedic & Luxury Spa Websites in Halasuru",
        subheadline: "Authentic treatment menus, therapist lineage transparency, and instant WhatsApp booking concierge.",
        localHook: "Attracting affluent locals and international wellness tourists seeking rejuvenation near Ulsoor Lake.",
        statBadge: "Sensory Ritual Menus",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Multi-Specialty Polyclinics & Centers",
        icon: "🏥",
        headline: "Polyclinic & Family Healthcare Websites in Halasuru",
        subheadline: "Family doctor schedule matrices, diagnostic booking, and immediate WhatsApp medical helpline access.",
        localHook: "Serving multi-generational families and residents across Halasuru, Cox Town, and Kensington Road.",
        statBadge: "Instant OPD Schedules",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Heritage & Modern Interior Designers",
        icon: "📐",
        headline: "Bespoke Interior Design Websites in Halasuru",
        subheadline: "Showcase artisanal woodcraft, heritage renovation, and modern apartment transformations with 0.8s load speed.",
        localHook: "Winning high-end restoration and contemporary home interior projects in Central Bengaluru.",
        statBadge: "Sub-second Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "wedding-photographers",
        name: "Traditional & Modern Wedding Photographers",
        icon: "📷",
        headline: "Wedding Photography Websites in Halasuru",
        subheadline: "Rich cultural wedding galleries, 4K reception video streaming, and transparent ceremony package pricing.",
        localHook: "Capturing South Indian traditional weddings and grand banquet celebrations across Central Bengaluru.",
        statBadge: "Zero Buffer Video Reels",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "yoga-meditation",
        name: "Yoga Shalas & Mindfulness Sanctuaries",
        icon: "🧘",
        headline: "Yoga Studio & Meditation Websites in Halasuru",
        subheadline: "Class batch schedules, teacher training enrollment funnels, and seamless WhatsApp trial registration.",
        localHook: "Attracting yoga practitioners and wellness seekers around Ulsoor Lake and Kensington Road.",
        statBadge: "Class Schedule Matrices",
        targetPrice: "₹40,000"
      }
    ],
    faqs: [
      {
        question: "Can our spa take advance deposits for appointment bookings online?",
        answer: "Yes. We integrate secure UPI, Razorpay, or Stripe gateways so guests can book treatments or purchase experience gift vouchers instantly."
      },
      {
        question: "How do you ensure our website ranks in Halasuru and nearby central areas?",
        answer: "We embed schema markup with Halasuru pincode (560008), local landmark tags, and optimized meta tags so local searchers find your practice first."
      },
      {
        question: "Who builds the website at Uncoded Hub?",
        answer: "Deepak codes the clean React front-end and Geetha crafts the bespoke visual design. You deal directly with the senior founders from start to finish."
      },
      {
        question: "What is your delivery guarantee?",
        answer: "7 business days. If we do not deliver your complete website on time, the entire build is completely free."
      }
    ]
  },
  bellandur: {
    slug: "bellandur",
    name: "Bellandur",
    kannadaName: "ಬೆಳ್ಳಂದೂರು",
    zone: "South-East Bengaluru",
    pincode: "560103",
    coordinates: {
      lat: 12.9298,
      lng: 77.6748
    },
    metroLine: "Upcoming Blue Line (ORR Metro Corridor)",
    keyLandmarks: [
      "RMZ Ecospace",
      "RMZ EcoWorld",
      "Bellandur Lake",
      "Outer Ring Road (ORR)",
      "Devarabeesanahalli"
    ],
    techParksAndHubs: [
      "RMZ Ecospace",
      "RMZ EcoWorld",
      "Prestige Tech Park Link",
      "Intel & Cisco Campuses"
    ],
    commercialProfile: "Bengaluru’s highest-density corporate tech ecosystem. Over 100,000 engineers and corporate leaders work along this strip daily, driving immense demand for corporate fitness clubs, B2B SaaS, and diagnostic healthcare.",
    painPointHook: "Tech employees in Bellandur live on their phones and demand immediate digital efficiency. If booking an appointment or checking prices requires 5 clicks and a slow loading page, they move on within 3 seconds.",
    niches: [
      {
        nicheKey: "gym-fitness-club",
        name: "Corporate Gyms & Elite Fitness Clubs",
        icon: "⚡",
        headline: "High-Converting Fitness Club Websites in Bellandur",
        subheadline: "Corporate membership tiering, after-work class schedules, and instant WhatsApp trial day passes.",
        localHook: "Signing up corporate employees from RMZ Ecospace, EcoWorld, and tech park campuses.",
        statBadge: "Corporate Member Funnels",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "B2B SaaS & Tech Product Studios",
        icon: "💼",
        headline: "Modern B2B Tech Websites in Bellandur",
        subheadline: "High-converting interactive product demos, security white-papers, and sub-second performance.",
        localHook: "Positioning software development firms and SaaS companies on the Outer Ring Road for global enterprise sales.",
        statBadge: "99/100 Core Web Vitals",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "healthcare-diagnostics",
        name: "Diagnostic Pathology & Health Screenings",
        icon: "🔬",
        headline: "Diagnostic Center Websites in Bellandur",
        subheadline: "Corporate health checkup packages, online sample collection booking, and instant PDF report delivery.",
        localHook: "Delivering rapid health screening and pathology services to busy corporate tech teams.",
        statBadge: "Rapid OPD Booking Flow",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "real-estate",
        name: "High-End Apartment & Villa Brokers",
        icon: "🏛️",
        headline: "Luxury Real Estate Portals in Bellandur",
        subheadline: "Gated community walkthroughs, high-earner rental intake funnels, and verified floorplans.",
        localHook: "Marketing premium apartments and villas to tech leaders across Bellandur and Marathahalli-Sarjapur ORR.",
        statBadge: "HNW Buyer Lead Gates",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Walk-In Polyclinics & Corporate Health Suites",
        icon: "🏥",
        headline: "Polyclinic & Health Center Websites in Bellandur",
        subheadline: "After-work OPD consultation schedules, 2-tap appointment booking, and emergency WhatsApp medical helpline.",
        localHook: "Providing rapid primary healthcare access for tech workers and families living near RMZ Ecospace.",
        statBadge: "Instant OPD Schedules",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can our gym website offer corporate membership discount codes for tech parks?",
        answer: "Yes. We can build custom corporate discount intake flows where employees from Ecospace and EcoWorld select their company to claim special corporate rates."
      },
      {
        question: "Why is sub-second speed so important for Bellandur businesses?",
        answer: "Corporate employees frequently browse on mobile during commute breaks. A site that loads in 0.8s converts over 3x higher than a sluggish WordPress site that lags."
      },
      {
        question: "Do you take care of Google Search Console and local SEO indexing?",
        answer: "Yes. We submit your verified sitemap to Google Search Console and code local JSON-LD schema so your business ranks across Bellandur and ORR."
      },
      {
        question: "How do we get started?",
        answer: "Book a 20-minute discovery call with Deepak & Geetha. We review your goals, lock your fixed scope, and launch your site in 7 days."
      }
    ]
  },
  jayanagar: {
    slug: "jayanagar",
    name: "Jayanagar",
    kannadaName: "ಜಯನಗರ",
    zone: "South Bengaluru",
    pincode: "560041",
    coordinates: {
      lat: 12.9308,
      lng: 77.5838
    },
    metroLine: "Green Line (Jayanagar, South End Circle, and Rashtreeya Vidyalaya Road Stations)",
    keyLandmarks: [
      "4th Block Shopping Complex",
      "11th Main",
      "South End Circle",
      "Madhavan Park",
      "Cosmopolitan Club"
    ],
    techParksAndHubs: [
      "Bannerghatta Road Corridor Link",
      "South End Corporate Strip"
    ],
    commercialProfile: "South Bengaluru’s most established and affluent traditional enclave. Known for multi-generational wealth, renowned wedding photographers, elite cosmetic dental clinics, and high-end residential interior designers.",
    painPointHook: "Jayanagar residents value trust, heritage reputation, and immaculate presentation. A cluttered, amateur website immediately raises doubts about your professional standards.",
    niches: [
      {
        nicheKey: "wedding-photographers",
        name: "Luxury Wedding Photographers & Cinematographers",
        icon: "📷",
        headline: "Luxury Wedding Photography Websites in Jayanagar",
        subheadline: "Rich cultural wedding portfolios, streaming 4K wedding films, and transparent ceremony package calculators.",
        localHook: "Booking grand wedding and reception celebrations for families in Jayanagar, Basavanagudi, and JP Nagar.",
        statBadge: "Sub-second 4K Video Reels",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "dental-clinics",
        name: "Cosmetic Dentistry & Implant Centers",
        icon: "🦷",
        headline: "Advanced Dental Clinic Websites in Jayanagar",
        subheadline: "Anxious patient UX, smile makeover sliders, 2-tap appointment booking, and transparent procedure fees.",
        localHook: "Attracting dental implant, crown, and clear aligner patients across Jayanagar 3rd, 4th, and 9th Blocks.",
        statBadge: "2-Tap Booking Flow",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Residential Interior Designers & Decorators",
        icon: "📐",
        headline: "Luxury Interior Design Websites in Jayanagar",
        subheadline: "Sub-second project photo galleries, traditional woodcraft showcases, and transparent design fee calculators.",
        localHook: "Winning luxury bungalow renovation and contemporary apartment interior mandates in South Bengaluru.",
        statBadge: "0.8s LCP Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Chartered Accountants & Legal Advisors",
        icon: "💼",
        headline: "Professional Advisory Websites in Jayanagar",
        subheadline: "Clean institutional typography, practice credentials, client tax guides, and frictionless consultation booking.",
        localHook: "Establishing authority for established audit, corporate tax, and legal firms in South Bengaluru.",
        statBadge: "Institutional Trust Design",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "doctor-specialist",
        name: "Senior Surgeons & Medical Specialists",
        icon: "🩺",
        headline: "Senior Specialist Practice Websites in Jayanagar",
        subheadline: "Surgical credentials, ethical patient education guides, second-opinion booking, and hospital privileges proof.",
        localHook: "Building patient trust for leading orthopedic, pediatric, and surgical doctors in South Bengaluru.",
        statBadge: "Senior Clinician Trust",
        targetPrice: "₹55,000"
      }
    ],
    faqs: [
      {
        question: "Can wedding photographers show their 4K video reels without mobile buffering?",
        answer: "Yes. We use high-performance HLS streaming and lightweight poster frames so your cinematic wedding films stream instantly on any mobile network."
      },
      {
        question: "How do you handle patient trust for Jayanagar dental practices?",
        answer: "We showcase real before-and-after smile transformations, doctor degrees, sterilization standards, and verified Google reviews in a clean, ethical interface."
      },
      {
        question: "Can we meet in Jayanagar to review our website brief?",
        answer: "Yes, we frequently meet clients around 4th Block Complex, 11th Main, or over a quick video call."
      },
      {
        question: "Is the 7-day launch guarantee real?",
        answer: "Yes. It is a legally binding commitment in our project agreement. If we fail to deliver on Day 7, you owe us nothing."
      }
    ]
  },
  "jp-nagar": {
    slug: "jp-nagar",
    name: "JP Nagar",
    kannadaName: "ಜೆ.ಪಿ. ನಗರ",
    zone: "South Bengaluru",
    pincode: "560078",
    coordinates: {
      lat: 12.9063,
      lng: 77.5857
    },
    metroLine: "Green Line (Banashankari & JP Nagar Stations)",
    keyLandmarks: [
      "Brigade Millennium",
      "Ranga Shankara",
      "15th Cross",
      "24th Main",
      "Delmia Circle"
    ],
    techParksAndHubs: [
      "Bannerghatta Road Corridor",
      "Kalyani Magnum Tech Park Link"
    ],
    commercialProfile: "Vibrant South Bengaluru residential and cultural hub. High density of luxury apartment complexes, modern home renovation studios, cosmetic dental clinics, and mindful yoga centers.",
    painPointHook: "Residents in JP Nagar 2nd through 8th Phase research services extensively online before booking. If your website lacks transparent pricing, mobile speed, and direct WhatsApp contact, they immediately choose another provider.",
    niches: [
      {
        nicheKey: "interior-designers",
        name: "Luxury Residential Interior Designers",
        icon: "📐",
        headline: "Bespoke Interior Design Websites in JP Nagar",
        subheadline: "Fast 4K photo galleries, custom furniture showcases, and transparent square-foot cost estimators.",
        localHook: "Winning high-end apartment interior mandates in Brigade Millennium, Elita Promenade, and JP Nagar villas.",
        statBadge: "0.8s LCP Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "dental-clinics",
        name: "Modern Dental & Orthodontic Clinics",
        icon: "🦷",
        headline: "Modern Dental Practice Websites in JP Nagar",
        subheadline: "Instant appointment booking, transparent fee schedules, and smile correction galleries designed for families.",
        localHook: "Attracting cosmetic, implant, and pediatric dental patients along 24th Main and 15th Cross.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "home-renovation",
        name: "Turnkey Home Renovation & Kitchen Studios",
        icon: "🔨",
        headline: "Modular Kitchen & Renovation Websites in JP Nagar",
        subheadline: "Interactive price estimator calculators, waterproof carpentry specs, and 3D virtual tour walk-throughs.",
        localHook: "Capturing apartment refurbishment and modular kitchen renovation contracts across JP Nagar phases.",
        statBadge: "Interactive Price Calculators",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "yoga-meditation",
        name: "Yoga Shalas & Mindfulness Sanctuaries",
        icon: "🧘",
        headline: "Yoga Studio & Meditation Websites in JP Nagar",
        subheadline: "Class batch schedules, teacher training enrollment funnels, and seamless WhatsApp trial registration.",
        localHook: "Inspiring yoga practitioners and wellness seekers around Ranga Shankara and Sarakki Lake.",
        statBadge: "Class Schedule Matrices",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "gym-fitness-club",
        name: "Commercial Gyms & Strength Clubs",
        icon: "⚡",
        headline: "Fitness Club Websites in JP Nagar",
        subheadline: "Class schedule matrices, certified trainer profiles, and instant WhatsApp 1-day pass booking funnels.",
        localHook: "Packing gym floor memberships and personal training rosters across JP Nagar phases.",
        statBadge: "Instant WhatsApp Passes",
        targetPrice: "₹40,000"
      }
    ],
    faqs: [
      {
        question: "Can you build interactive modular kitchen price calculators for our renovation firm?",
        answer: "Yes. We build responsive cost calculators where homeowners choose layout (L-shaped, U-shaped), material finishes (acrylic, laminate), and get an instant estimated range."
      },
      {
        question: "Do you optimize websites for local voice search (Google Assistant, Siri)?",
        answer: "Yes. We include Speakable schema and conversational FAQs so your practice answers voice searches like \"best dentist near me in JP Nagar\"."
      },
      {
        question: "What do we need to provide before the 7-day sprint starts?",
        answer: "Just your logo, photos of your team/work, and a brief discovery chat. We take care of layout, copywriting, coding, SEO, and deployment."
      },
      {
        question: "How do you guarantee our website loads in under 1 second?",
        answer: "We write clean, semantic React code with zero heavy plugins and host your site on global edge servers with local Bangalore caching nodes."
      }
    ]
  },
  "electronic-city-phase-1": {
    slug: "electronic-city-phase-1",
    name: "Electronic City Phase 1",
    kannadaName: "ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಹಂತ ೧",
    zone: "South Bengaluru",
    pincode: "560100",
    coordinates: {
      lat: 12.8452,
      lng: 77.6602
    },
    metroLine: "Yellow Line (Electronic City Metro Station)",
    keyLandmarks: [
      "Infosys Campus",
      "Wipro Corporate HQ",
      "Cyber Park",
      "Velankani Tech Park",
      "Hosur Road Elevated Flyover"
    ],
    techParksAndHubs: [
      "Infosys SEZ",
      "Wipro Campus",
      "Velankani Tech Park"
    ],
    commercialProfile: "India’s landmark electronics and software hub. Thousands of corporate IT specialists work here, driving strong commercial demand for corporate diagnostic health screening, commercial real estate, fitness clubs, and B2B tech services.",
    painPointHook: "IT professionals in Electronic City will immediately spot low-quality code or sluggish templates. A slow website destroys your credibility with tech-savvy buyers.",
    niches: [
      {
        nicheKey: "healthcare-diagnostics",
        name: "Diagnostic Pathology & Health Screening Labs",
        icon: "🔬",
        headline: "Diagnostic Center Websites in Electronic City Ph 1",
        subheadline: "Annual executive health packages, online home collection booking, and instant PDF report retrieval.",
        localHook: "Serving corporate tech staff across Infosys, Wipro, and surrounding corporate campuses.",
        statBadge: "Corporate Health Package Triage",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "real-estate",
        name: "Gated Community Real Estate & Villa Portals",
        icon: "🏛️",
        headline: "Real Estate & Villa Websites in Electronic City",
        subheadline: "Interactive master plans, 3D walkthroughs, and verified buyer inquiry lead capture funnels.",
        localHook: "Marketing high-rise apartments and luxury villas near Neeladri Road and Bettadasanapura.",
        statBadge: "High-Intent Buyer Funnels",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "B2B Software & Embedded Engineering Firms",
        icon: "💼",
        headline: "B2B Tech & Engineering Websites in Electronic City",
        subheadline: "Product architecture breakdowns, enterprise security certifications, and global RFP inquiry funnels.",
        localHook: "Positioning software engineering and IoT development firms for international client contracts.",
        statBadge: "99/100 Core Web Vitals",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "gym-fitness-club",
        name: "Corporate Gyms & Modern Strength Studios",
        icon: "⚡",
        headline: "Fitness Club Websites in Electronic City Ph 1",
        subheadline: "Flexible shift-friendly class schedules, corporate pass rates, and frictionless WhatsApp trial funnels.",
        localHook: "Attracting tech workers looking for before-work and evening workout sessions.",
        statBadge: "Instant WhatsApp Passes",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Corporate Walk-In Clinics & Family Centers",
        icon: "🏥",
        headline: "Family Polyclinic Websites in Electronic City Ph 1",
        subheadline: "Doctor OPD schedules, 2-tap appointment booking, and emergency WhatsApp routing for tech workers.",
        localHook: "Serving tech professionals and apartment communities near Neeladri Road and Infosys SEZ.",
        statBadge: "Instant OPD Schedules",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can our website integrate with our diagnostic laboratory software (LIMS)?",
        answer: "Yes. We can integrate secure patient report download portals and API webhooks directly into your diagnostic website."
      },
      {
        question: "Why do you code in React rather than WordPress for tech companies?",
        answer: "React provides sub-second performance, bulletproof security, and complete structural control, ensuring your technology company looks modern and reliable."
      },
      {
        question: "How does your 7-day sprint work?",
        answer: "Day 1 architecture blueprint, Day 2 bespoke design, Day 3-5 clean code and integrations, Day 6 testing, Day 7 launch and full code transfer."
      },
      {
        question: "Do you charge any monthly maintenance fees?",
        answer: "No. We transfer complete code ownership and hosting access to you on launch. Zero mandatory ongoing fees."
      }
    ]
  },
  "electronic-city-phase-2": {
    slug: "electronic-city-phase-2",
    name: "Electronic City Phase 2",
    kannadaName: "ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಹಂತ ೨",
    zone: "South Bengaluru",
    pincode: "560100",
    coordinates: {
      lat: 12.8398,
      lng: 77.6778
    },
    metroLine: "Yellow Line (Hebbagodi & Huskur Road Stations)",
    keyLandmarks: [
      "Tech Mahindra SEZ",
      "TCS Campus",
      "NeoTown",
      "Huskur Gate",
      "Doddathogur"
    ],
    techParksAndHubs: [
      "Tech Mahindra Campus",
      "TCS Think Campus",
      "Schneider Electric Hub"
    ],
    commercialProfile: "Massive tech and manufacturing zone with rapid residential apartment expansion. High demand for career training academies, family polyclinics, modular home renovation, and personal fitness coaches.",
    painPointHook: "Growing businesses in Phase 2 often get trapped in expensive, delayed website contracts with freelance agencies that take 3 months and deliver broken templates.",
    niches: [
      {
        nicheKey: "educational-academy",
        name: "Tech Upskilling & Professional Academies",
        icon: "🎓",
        headline: "Professional Training Academy Websites in Phase 2",
        subheadline: "Curriculum syllabus gateways, student placement proof, and upcoming batch countdown enrollment funnels.",
        localHook: "Enrolling engineering professionals seeking certifications in AI, Full Stack, and Cloud computing.",
        statBadge: "Batch Enrollment Engine",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Family Polyclinics & Primary Healthcare",
        icon: "🏥",
        headline: "Family Polyclinic Websites in Electronic City Phase 2",
        subheadline: "Doctor OPD schedules, 2-tap appointment booking, and instant WhatsApp emergency triage.",
        localHook: "Providing trusted primary healthcare access for families living in NeoTown and Doddathogur.",
        statBadge: "Instant OPD Schedules",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "home-renovation",
        name: "Modular Interiors & Apartment Refurbishment",
        icon: "🔨",
        headline: "Modular Kitchen & Renovation Websites in Phase 2",
        subheadline: "Apartment package pricing, material warranty guides, and quick quote consultation forms.",
        localHook: "Winning turnkey interior contracts for new homeowners moving into high-rise societies.",
        statBadge: "Quick Quote Intake Engine",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "fitness-coach",
        name: "Personal Fitness Coaches & Nutritionists",
        icon: "🏋️",
        headline: "Personal Trainer & Coach Websites in Phase 2",
        subheadline: "Verified client transformation galleries, 12-week roadmap breakdowns, and 1-on-1 consultation booking.",
        localHook: "Helping private fitness coaches sign up high-ticket corporate personal training clients.",
        statBadge: "Transformation Case Studies",
        targetPrice: "₹35,000"
      },
      {
        nicheKey: "dental-clinics",
        name: "Family Dental & Orthodontic Practices",
        icon: "🦷",
        headline: "Family Dental Practice Websites in Phase 2",
        subheadline: "Anxious patient UX, smile makeover sliders, 2-tap appointment booking, and transparent procedure fees.",
        localHook: "Attracting dental patients living across NeoTown, Huskur Road, and surrounding societies.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can our academy showcase course syllabi with lead capture before download?",
        answer: "Yes. Prospective students enter their name and WhatsApp number to instantly receive the PDF syllabus, providing you with warm qualified leads."
      },
      {
        question: "How reliable is your 7-day launch guarantee?",
        answer: "It is 100% legally binding. If we do not deliver your website ready for launch on Day 7, you pay nothing."
      },
      {
        question: "Can you accept international student or client payments?",
        answer: "Yes. We integrate Stripe, PayPal, or Razorpay international processing so clients from any country can pay seamlessly."
      },
      {
        question: "Will our website be easy to update later?",
        answer: "Yes. We include a personalized video walkthrough showing you how to update text, photos, and blog posts effortlessly."
      }
    ]
  },
  "richmond-town": {
    slug: "richmond-town",
    name: "Richmond Town & Lavelle Road",
    kannadaName: "ರಿಚ್ಮಂಡ್ ಟೌನ್",
    zone: "Central Bengaluru",
    pincode: "560025",
    coordinates: {
      lat: 12.9644,
      lng: 77.6015
    },
    metroLine: "Purple Line (MG Road Station)",
    keyLandmarks: [
      "UB City",
      "Lavelle Road",
      "Richmond Park",
      "Vittal Mallya Road",
      "Bangalore Club corridor"
    ],
    techParksAndHubs: [
      "UB City Luxury Business Towers",
      "Concorde Towers"
    ],
    commercialProfile: "Bengaluru’s ultra-high-net-worth commercial and luxury district. Home to private equity firms, bespoke architecture studios, elite cosmetic surgeons, and high-end creative agencies.",
    painPointHook: "Ultra-HNW clients in Richmond Town judge quality within 100 milliseconds. A generic web template with stock photos destroys your credibility with high-ticket clients.",
    niches: [
      {
        nicheKey: "doctor-specialist",
        name: "Aesthetic Surgeons & Elite Specialists",
        icon: "🩺",
        headline: "Private Aesthetic Practice Websites on Lavelle Road",
        subheadline: "Subtle luxury aesthetics, ethical procedure transparency, and discreet private consultation booking.",
        localHook: "Attracting discerning private aesthetic and surgical patients across Central Bengaluru.",
        statBadge: "Bespoke Luxury Medical UX",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "studio",
        name: "Bespoke Architecture & Design Studios",
        icon: "📐",
        headline: "Luxury Architecture Studio Portfolios in Richmond Town",
        subheadline: "Sub-second 4K architectural galleries, editorial typography, and private commission intake funnels.",
        localHook: "Positioning award-winning architects for luxury residential estates and commercial developments.",
        statBadge: "Editorial Portfolio Design",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Private Wealth & Family Office Advisory",
        icon: "💼",
        headline: "Wealth Management & Family Office Websites in UB City",
        subheadline: "Understated institutional elegance, investment frameworks, and discreet consultation gates.",
        localHook: "Establishing institutional authority for wealth management and venture capital advisory practices.",
        statBadge: "Institutional Trust Polish",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "creative-portfolio",
        name: "High-End Creative & Brand Strategy Studios",
        icon: "🎨",
        headline: "Luxury Brand Strategy Portfolios in Central Bengaluru",
        subheadline: "Fluid micro-interactions, award-winning case studies, and enterprise retainer booking flows.",
        localHook: "Attracting global and national luxury brands seeking bespoke brand identity and design direction.",
        statBadge: "Award-Calibre Craft",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Luxury Residential Interior Architects",
        icon: "📐",
        headline: "Luxury Interior Design Websites on Lavelle Road",
        subheadline: "Sub-second 4K estate galleries, bespoke furniture showcases, and private design commission intake.",
        localHook: "Winning ultra-luxury penthouse and estate interior design mandates in Central Bengaluru.",
        statBadge: "0.8s Luxury Portfolios",
        targetPrice: "₹55,000"
      }
    ],
    faqs: [
      {
        question: "Do you create custom editorial typography for luxury brands?",
        answer: "Yes. Geetha crafts bespoke typographic hierarchies with carefully selected editorial typefaces and curated color palettes that convey luxury without visual clutter."
      },
      {
        question: "Can you guarantee complete privacy for private wealth advisory firms?",
        answer: "Yes. We build zero-tracking, privacy-first websites without third-party ad pixels or unauthorized data sharing."
      },
      {
        question: "Can we meet at UB City or Lavelle Road for an initial consultation?",
        answer: "Yes, we regularly meet clients across Lavelle Road, UB City, or private offices in Central Bengaluru."
      },
      {
        question: "What is your timeline guarantee?",
        answer: "7 business days. If we do not launch your bespoke website on time, your build is 100% free."
      }
    ]
  },
  sadashivanagar: {
    slug: "sadashivanagar",
    name: "Sadashivanagar",
    kannadaName: "ಸದಾಶಿವನಗರ",
    zone: "North-Central Bengaluru",
    pincode: "560080",
    coordinates: {
      lat: 13.0068,
      lng: 77.5813
    },
    metroLine: "Green Line (Sampige Road / Kuvempu Road link)",
    keyLandmarks: [
      "Sankey Tank",
      "Bellary Road Corridor",
      "Sadashivanagar Club",
      "CV Raman Road",
      "Mekhri Circle Link"
    ],
    techParksAndHubs: [
      "IISc Academic Corridor Link",
      "Manyata Corridor Connector"
    ],
    commercialProfile: "Bengaluru’s most prestigious legacy residential enclave. Home to top politicians, business barons, senior specialist medical doctors, boutique residential architects, and private yoga shalas.",
    painPointHook: "High-profile clients in Sadashivanagar expect absolute discretion, refined aesthetics, and effortless communication. An amateur website with popups and generic stock photos immediately fails their test.",
    niches: [
      {
        nicheKey: "doctor-specialist",
        name: "Senior Surgeons & Super-Specialist Clinics",
        icon: "🩺",
        headline: "Private Medical Specialist Websites in Sadashivanagar",
        subheadline: "Discreet second-opinion intake, distinguished surgical credentials, and private OPD consultation booking.",
        localHook: "Serving high-net-worth families seeking premier medical expertise in North-Central Bengaluru.",
        statBadge: "Distinguished Clinical UX",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Luxury Bungalow Interior Architects",
        icon: "📐",
        headline: "Bespoke Interior Design Websites in Sadashivanagar",
        subheadline: "Sub-second 4K estate galleries, heritage restoration case studies, and private commission request forms.",
        localHook: "Winning multi-crore bungalow architecture and interior mandates across Sadashivanagar and Dollars Colony.",
        statBadge: "0.8s Luxury Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "yoga-meditation",
        name: "Holistic Wellness Masters & Private Shalas",
        icon: "🧘",
        headline: "Private Yoga & Mindfulness Websites in Sadashivanagar",
        subheadline: "Private 1-on-1 session booking, lineage credentials, and serene aesthetic design reflecting mindful clarity.",
        localHook: "Attracting discerning private yoga clients seeking bespoke holistic guidance near Sankey Tank.",
        statBadge: "Mindful Serene UX",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Family Office & Private Equity Advisory",
        icon: "💼",
        headline: "Family Office & Advisory Websites in Sadashivanagar",
        subheadline: "Timeless typographic elegance, discreet leadership profiles, and secure contact gateways.",
        localHook: "Establishing understated institutional presence for generational family offices and investment funds.",
        statBadge: "Institutional Trust Design",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "studio",
        name: "Bespoke Architecture & Design Studios",
        icon: "📐",
        headline: "Architecture Studio Portfolios in Sadashivanagar",
        subheadline: "Sub-second 4K architectural galleries, editorial typography, and private commission intake funnels.",
        localHook: "Positioning award-winning architects for luxury residential estates and private bungalows.",
        statBadge: "Editorial Portfolio Design",
        targetPrice: "₹55,000"
      }
    ],
    faqs: [
      {
        question: "How do you ensure discretion and privacy for high-profile clients?",
        answer: "We do not install intrusive marketing pixels, third-party trackers, or public client lists unless explicitly authorized. Your website is private, fast, and secure."
      },
      {
        question: "Can you showcase 4K architectural estate walkthroughs without lag?",
        answer: "Yes. We use cutting-edge image and video compression so your high-resolution estate photos load in under 0.8 seconds on mobile."
      },
      {
        question: "Can we meet in Sadashivanagar to discuss requirements?",
        answer: "Yes, we can meet at your private office or nearby venue for an in-person discovery discussion."
      },
      {
        question: "What is your delivery policy?",
        answer: "Locked scope, 7 business days delivery, and a contractual late-means-free guarantee."
      }
    ]
  },
  malleshwaram: {
    slug: "malleshwaram",
    name: "Malleshwaram",
    kannadaName: "ಮಲ್ಲೇಶ್ವರಂ",
    zone: "North-West Bengaluru",
    pincode: "560003",
    coordinates: {
      lat: 13.0031,
      lng: 77.5643
    },
    metroLine: "Green Line (Sampige Road & Srirampura Stations)",
    keyLandmarks: [
      "Sampige Road",
      "Margosa Road",
      "8th Cross Market",
      "Kadu Malleshwara Temple",
      "MES College Corridor"
    ],
    techParksAndHubs: [
      "World Trade Center (WTC) Brigade Gateway Link",
      "Rajajinagar IT corridor connector"
    ],
    commercialProfile: "One of Bengaluru’s most storied cultural and commercial centers. Known for thriving legacy dental practices, bridal beauty studios, modular home renovation firms, and prestigious coaching academies.",
    painPointHook: "Malleshwaram customers value multi-generational trust and direct accountability. A generic, faceless corporate template makes you look like an untrustworthy third-party aggregator.",
    niches: [
      {
        nicheKey: "dental-clinics",
        name: "Family Dental & Orthodontic Practices",
        icon: "🦷",
        headline: "Modern Dental Practice Websites in Malleshwaram",
        subheadline: "Ethical patient education, transparent procedure pricing, and instant 2-tap WhatsApp appointment booking.",
        localHook: "Attracting multi-generational families and students across Sampige Road and Margosa Road.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "salon-beauty",
        name: "Bridal Makeover Artists & Beauty Salons",
        icon: "✨",
        headline: "Bridal Beauty & Salon Websites in Malleshwaram",
        subheadline: "Verified bridal transformation sliders, ceremony package calculators, and direct WhatsApp booking concierge.",
        localHook: "Booking traditional bridal makeover and festive grooming packages for weddings in West Bengaluru.",
        statBadge: "Instant WhatsApp Booking",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "home-renovation",
        name: "Turnkey Home Renovation & Kitchen Centers",
        icon: "🔨",
        headline: "Modular Kitchen & Renovation Websites in Malleshwaram",
        subheadline: "Instant price calculator widgets, heritage home renovation case studies, and warranty disclosures.",
        localHook: "Winning renovation and modular interior contracts for independent homes and apartments.",
        statBadge: "Renovation Price Calculators",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "educational-academy",
        name: "Coaching & Academic Training Institutes",
        icon: "🎓",
        headline: "Coaching Academy Websites in Malleshwaram",
        subheadline: "Course syllabus downloads, ranker student result showcases, and upcoming batch enrollment funnels.",
        localHook: "Enrolling ambitious students for competitive exams, engineering, and academic preparation.",
        statBadge: "Batch Enrollment Engine",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "doctor-specialist",
        name: "Senior Medical Specialists & Surgeons",
        icon: "🩺",
        headline: "Medical Specialist Practice Websites in Malleshwaram",
        subheadline: "Ethical patient education, surgical case volume proof, second-opinion video consults, and OPD triage.",
        localHook: "Serving multi-generational families seeking senior medical consultation near Margosa Road.",
        statBadge: "NMC-Compliant Trust UX",
        targetPrice: "₹55,000"
      }
    ],
    faqs: [
      {
        question: "Can our bridal salon display real before-and-after photos without skin smoothing filters?",
        answer: "Yes. We design high-honesty comparison sliders that celebrate authentic texture, bridal glow, and hair artistry, building immense trust with prospective brides."
      },
      {
        question: "Do you build websites in both English and Kannada if requested?",
        answer: "Yes. We can incorporate bilingual navigation or key Kannada headlines to deeply connect with your local Malleshwaram community."
      },
      {
        question: "How quickly can our clinic website go live?",
        answer: "In exactly 7 business days from project kickoff, backed by our late-means-free guarantee."
      },
      {
        question: "Will our website work fast on slow mobile connections?",
        answer: "Yes. Our custom React build loads in 0.8 seconds even on modest 4G connections, ensuring no patient drops off."
      }
    ]
  },
  "sarjapur-road": {
    slug: "sarjapur-road",
    name: "Sarjapur Road",
    kannadaName: "ಸರ್ಜಾಪುರ ರಸ್ತೆ",
    zone: "South-East Bengaluru",
    pincode: "560035",
    coordinates: {
      lat: 12.9103,
      lng: 77.6835
    },
    metroLine: "Upcoming Sarjapur-Hebbal Metro Line",
    keyLandmarks: [
      "Wipro Corporate Office",
      "Carmelaram Railway Station",
      "Decathlon Sarjapur",
      "Kaikondrahalli Lake",
      "RBD Shelter"
    ],
    techParksAndHubs: [
      "Wipro SEZ",
      "RGA Tech Park",
      "Prestige Ferns Galaxy"
    ],
    commercialProfile: "Massive tech corridor and booming residential villa belt. Home to hundreds of gated communities, luxury modular interior contractors, polyclinics, and high-end residential real estate brokerages.",
    painPointHook: "New homeowners and tech families along Sarjapur Road search primarily on mobile phones. If your renovation firm or clinic website takes 4 seconds to load or has broken forms, they instantly pick the next recommendation on Google.",
    niches: [
      {
        nicheKey: "home-renovation",
        name: "Modular Kitchen & Villa Interior Studios",
        icon: "🔨",
        headline: "Modular Kitchen Websites on Sarjapur Road",
        subheadline: "Interactive renovation cost estimators, factory virtual walkthroughs, and society-specific design packages.",
        localHook: "Capturing villa and high-rise interior contracts across gated communities on Sarjapur Road.",
        statBadge: "Cost Estimator Calculators",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "real-estate",
        name: "Luxury Villa & Gated Community Portals",
        icon: "🏛️",
        headline: "Real Estate & Villa Websites on Sarjapur Road",
        subheadline: "Villa walkthrough video streaming, community master plans, and high-net-worth lead gates.",
        localHook: "Marketing ₹2.5 Cr+ luxury villas and residential plots along the Sarjapur-Carmelaram corridor.",
        statBadge: "HNW Buyer Lead Gates",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Bespoke Residential Interior Architects",
        icon: "📐",
        headline: "Interior Architecture Portfolios on Sarjapur Road",
        subheadline: "High-speed 4K project galleries, transparent design fee estimators, and quick consultation intake.",
        localHook: "Positioning luxury interior designers for upcoming handovers in premium gated societies.",
        statBadge: "0.8s LCP Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Multi-Specialty Family Polyclinics",
        icon: "🏥",
        headline: "Polyclinic & Family Clinic Websites on Sarjapur Road",
        subheadline: "Pediatric and family OPD schedules, 2-tap doctor appointment booking, and emergency WhatsApp routing.",
        localHook: "Serving tech families living in high-density apartments near Wipro and RGA Tech Park.",
        statBadge: "Instant OPD Schedules",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "dental-clinics",
        name: "Multi-Chair Cosmetic & Dental Clinics",
        icon: "🦷",
        headline: "Cosmetic Dental Practice Websites on Sarjapur Road",
        subheadline: "Interactive smile makeover sliders, 2-tap appointment booking, and transparent procedure fee schedules.",
        localHook: "Attracting young tech families and villa residents seeking clear aligners and pediatric dentistry.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can homeowners calculate their modular interior budget directly on our website?",
        answer: "Yes. We build responsive cost calculators that give homeowners an instant estimate based on their 2BHK, 3BHK, or villa configuration."
      },
      {
        question: "How do you ensure our real estate listings load instantly on mobile?",
        answer: "We use responsive picture tags and modern WebP compression so your high-resolution villa photos load in under 0.8 seconds."
      },
      {
        question: "Do you provide local SEO targeting Sarjapur Road?",
        answer: "Yes. We configure complete Schema.org LocalBusiness markup, localized keywords, and canonical URLs for Sarjapur Road and nearby hubs."
      },
      {
        question: "What is your delivery timeline?",
        answer: "7 business days. If we do not launch your custom website on time, the entire build is free of charge."
      }
    ]
  },
  "btm-layout": {
    slug: "btm-layout",
    name: "BTM Layout",
    kannadaName: "ಬಿಟಿಎಂ ಲೇಔಟ್",
    zone: "South Bengaluru",
    pincode: "560068",
    coordinates: {
      lat: 12.9166,
      lng: 77.6101
    },
    metroLine: "Yellow Line (Jayadeva Interchange & Central Silk Board Stations)",
    keyLandmarks: [
      "Udupi Garden Junction",
      "BTM 2nd Stage Commercial Strip",
      "Madiwala Lake",
      "Outer Ring Road Link",
      "Tavarekere Link"
    ],
    techParksAndHubs: [
      "Silk Board Tech Corridor Link",
      "Koramangala 4th Block Link"
    ],
    commercialProfile: "High-density commercial transit hub connecting Koramangala, Bannerghatta, and Silk Board. Prominent center for competitive coaching academies, family dental clinics, modular renovation centers, and personal fitness coaches.",
    painPointHook: "High foot traffic and young professionals demand fast, clear mobile experiences. A website that takes 4 seconds to load loses customers to local competitors within seconds.",
    niches: [
      {
        nicheKey: "educational-academy",
        name: "Competitive Exam & Upskilling Academies",
        icon: "🎓",
        headline: "Coaching Academy Websites in BTM Layout",
        subheadline: "Syllabus PDF gateways, student success ranker showcases, and upcoming batch seat booking funnels.",
        localHook: "Enrolling competitive exam candidates and software upskilling students across BTM 1st and 2nd Stage.",
        statBadge: "Batch Enrollment Engine",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "dental-clinics",
        name: "Family Dental & Aligners Practices",
        icon: "🦷",
        headline: "Modern Dental Practice Websites in BTM Layout",
        subheadline: "Instant 2-tap appointment booking, clear procedure fees, and verified patient reviews for families.",
        localHook: "Capturing clear aligner, root canal, and cleaning appointments along BTM 2nd Stage.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "home-renovation",
        name: "Modular Interiors & Renovation Studios",
        icon: "🔨",
        headline: "Modular Kitchen & Renovation Websites in BTM Layout",
        subheadline: "Transparent renovation price calculators, material comparison guides, and quick estimate forms.",
        localHook: "Winning residential renovation and kitchen remodel projects in South Bengaluru.",
        statBadge: "Estimate Intake Engine",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "fitness-coach",
        name: "Personal Fitness Coaches & Strength Trainers",
        icon: "🏋️",
        headline: "Personal Trainer & Coach Websites in BTM Layout",
        subheadline: "Verified transformation case studies, 12-week workout plans, and direct 1-on-1 WhatsApp consultation intake.",
        localHook: "Helping fitness coaches sign up high-ticket personal training clients across BTM and Madiwala.",
        statBadge: "Transformation Case Studies",
        targetPrice: "₹35,000"
      },
      {
        nicheKey: "gym-fitness-club",
        name: "Commercial Gyms & Strength Centers",
        icon: "⚡",
        headline: "Fitness Club Websites in BTM Layout",
        subheadline: "Class schedule matrices, membership pricing calculators, and instant WhatsApp 1-day pass booking.",
        localHook: "Driving member enrollments for commercial gyms and CrossFit studios in BTM 2nd Stage.",
        statBadge: "Instant WhatsApp Passes",
        targetPrice: "₹40,000"
      }
    ],
    faqs: [
      {
        question: "Can prospective students download our academy prospectus automatically?",
        answer: "Yes. We build smooth lead-capture gates where students enter their contact details and instantly receive your prospectus via PDF and WhatsApp."
      },
      {
        question: "How fast can our BTM business website go live?",
        answer: "7 business days. We handle architecture, design, code, SEO, and launch under our late-means-free guarantee."
      },
      {
        question: "Do you charge monthly retainers or fees?",
        answer: "Zero monthly retainers. You own 100% of your website, domain, and code upon project completion."
      },
      {
        question: "Can you integrate local WhatsApp chat buttons?",
        answer: "Yes. Every page includes clean, floating WhatsApp buttons that route inquiries directly to your team."
      }
    ]
  },
  "bannerghatta-road": {
    slug: "bannerghatta-road",
    name: "Bannerghatta Road",
    kannadaName: "ಬನ್ನೇರುಘಟ್ಟ ರಸ್ತೆ",
    zone: "South Bengaluru",
    pincode: "560076",
    coordinates: {
      lat: 12.8988,
      lng: 77.5996
    },
    metroLine: "Pink Line (IIMB, Hulimavu, and Kalena Agrahara Stations)",
    keyLandmarks: [
      "IIM Bangalore",
      "Fortis Hospital",
      "Apollo Hospital",
      "Meenakshi Mall",
      "Vega City Mall"
    ],
    techParksAndHubs: [
      "Kalyani Magnum Infotech Park",
      "Honeywell Campus",
      "Divyasree Towers"
    ],
    commercialProfile: "Premier healthcare and residential education highway. Home to major hospital chains, high-volume dental centers, international schools, commercial gym clubs, and sprawling residential high-rises.",
    painPointHook: "Families and healthcare patients along Bannerghatta Road expect clear, calm, reliable information. A slow website with broken mobile layouts creates immediate anxiety.",
    niches: [
      {
        nicheKey: "dental-clinics",
        name: "Multi-Chair Dental & Pediatric Clinics",
        icon: "🦷",
        headline: "Multi-Specialty Dental Websites on Bannerghatta Road",
        subheadline: "Family dental checkup booking, pediatric smile care guides, and clear procedure fee schedules.",
        localHook: "Attracting families and tech executives living around IIMB and Hulimavu.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "real-estate",
        name: "High-Rise Residential & Villa Brokers",
        icon: "🏛️",
        headline: "Real Estate & Villa Websites on Bannerghatta Road",
        subheadline: "High-resolution apartment tours, RERA disclosures, and high-intent buyer inquiry funnels.",
        localHook: "Marketing luxury high-rise residences and gated villas near Meenakshi Mall and Gottigere.",
        statBadge: "HNW Buyer Lead Gates",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "educational-academy",
        name: "International Academies & Entrance Coaching",
        icon: "🎓",
        headline: "Educational Academy Websites on Bannerghatta Road",
        subheadline: "Admissions inquiry funnels, student faculty profiles, and downloadable curriculum prospectuses.",
        localHook: "Enrolling students for competitive exams and international foundation programs.",
        statBadge: "Admissions Funnel Engine",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "gym-fitness-club",
        name: "Commercial Gyms & Fitness Centers",
        icon: "⚡",
        headline: "Fitness Club Websites on Bannerghatta Road",
        subheadline: "Group class timetables, membership pricing calculators, and instant WhatsApp 1-day free pass booking.",
        localHook: "Driving member sign-ups for gyms serving apartment communities in South Bengaluru.",
        statBadge: "Instant WhatsApp Passes",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Multi-Specialty Polyclinics & Centers",
        icon: "🏥",
        headline: "Polyclinic & Family Clinic Websites on Bannerghatta Road",
        subheadline: "Doctor OPD schedules, 2-tap appointment booking, and emergency WhatsApp routing for local families.",
        localHook: "Providing rapid primary healthcare access for families living near Meenakshi Mall and IIMB.",
        statBadge: "Instant OPD Schedules",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can patients book appointments with different doctors in a multi-specialty clinic?",
        answer: "Yes. We build doctor selection matrices where patients pick the specialty, choose their doctor, view available timings, and book in 2 taps."
      },
      {
        question: "How do you ensure Core Web Vitals pass on mobile phones?",
        answer: "We write lightweight React code without bloatware, pre-render static HTML, and optimize all images for 99+ Lighthouse performance."
      },
      {
        question: "Can we meet along Bannerghatta Road before starting?",
        answer: "Yes, we can meet near IIMB, Vega City Mall, or over Google Meet for a discovery briefing."
      },
      {
        question: "What is your guarantee on project timing?",
        answer: "Exactly 7 business days. If we miss the deadline, your entire website build is 100% free."
      }
    ]
  },
  "kalyan-nagar": {
    slug: "kalyan-nagar",
    name: "Kalyan Nagar & HRBR",
    kannadaName: "ಕಲ್ಯಾಣ ನಗರ",
    zone: "North-East Bengaluru",
    pincode: "560043",
    coordinates: {
      lat: 13.0285,
      lng: 77.6432
    },
    metroLine: "Pink / Blue Line Link Corridor (Nagavara Station link)",
    keyLandmarks: [
      "Kammanahalli Main Road",
      "CMR Road",
      "HRBR Layout 1st-3rd Block",
      "Jalanidhi Park",
      "BBMP Ground"
    ],
    techParksAndHubs: [
      "Manyata Tech Park Link Corridor",
      "Banaswadi Commercial Belt"
    ],
    commercialProfile: "Cosmopolitan dining, healthcare, and lifestyle district of North-East Bengaluru. High concentration of modern dental clinics, boutique interior architecture firms, personal fitness trainers, and consultants.",
    painPointHook: "The young, cosmopolitan population along CMR Road and Kammanahalli judges businesses strictly on their mobile presentation. A slow, dated template makes your service look second-tier.",
    niches: [
      {
        nicheKey: "dental-clinics",
        name: "Cosmetic Dentistry & Implant Clinics",
        icon: "🦷",
        headline: "Cosmetic Dental Practice Websites in Kalyan Nagar",
        subheadline: "Interactive smile makeover sliders, transparent procedure fees, and instant WhatsApp appointment booking.",
        localHook: "Capturing clear aligner and cosmetic dental patients across HRBR Layout and Kammanahalli.",
        statBadge: "2-Tap Booking Engine",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Bespoke Residential Interior Designers",
        icon: "📐",
        headline: "Interior Architecture Portfolios in Kalyan Nagar",
        subheadline: "Sub-second 4K photo galleries, custom furniture showcases, and transparent design fee calculators.",
        localHook: "Winning luxury villa and apartment interior projects across North-East Bengaluru.",
        statBadge: "0.8s LCP Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "coaches-consultants",
        name: "Career & Executive Leadership Consultants",
        icon: "🎯",
        headline: "Consulting & Advisory Websites in Kalyan Nagar",
        subheadline: "Editorial typography, thought leadership gateways, and direct discovery call scheduling.",
        localHook: "Helping executive coaches and advisors win high-ticket corporate contracts across Bengaluru tech parks.",
        statBadge: "Discovery Booking Flow",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "fitness-coach",
        name: "Elite Personal Trainers & Strength Coaches",
        icon: "🏋️",
        headline: "Personal Trainer & Coach Websites in Kalyan Nagar",
        subheadline: "Verified client transformation galleries, 12-week program roadmaps, and 1-on-1 consultation booking.",
        localHook: "Attracting private strength training and body recomposition clients in HRBR Layout.",
        statBadge: "Transformation Case Studies",
        targetPrice: "₹35,000"
      },
      {
        nicheKey: "salon-beauty",
        name: "Luxury Salons & Bridal Makeover Studios",
        icon: "✨",
        headline: "Bridal Beauty & Salon Websites in Kalyan Nagar",
        subheadline: "Sensory bridal package portfolios, verified before-and-after skin galleries, and direct WhatsApp concierge triage.",
        localHook: "Winning high-margin bridal party bookings and premium hair spa retainers on Kammanahalli Main Road.",
        statBadge: "Instant WhatsApp Inquiries",
        targetPrice: "₹40,000"
      }
    ],
    faqs: [
      {
        question: "Can our interior design portfolio load 4K images instantly without lag?",
        answer: "Yes. We compress images using next-gen WebP formats and stream them using lazy loading, keeping load times under 0.8 seconds."
      },
      {
        question: "How do you help our dental clinic rank in Kalyan Nagar Google searches?",
        answer: "We implement schema markup with Kalyan Nagar pincode (560043), localized title tags, and Google Search Console indexing on Day 5."
      },
      {
        question: "Who will we work with during the project?",
        answer: "Deepak & Geetha directly. We are senior founders who code and design every screen ourselves. Zero junior handoffs."
      },
      {
        question: "What is your delivery guarantee?",
        answer: "7 business days. If we do not launch your custom website on time, you pay nothing."
      }
    ]
  },
  hebbal: {
    slug: "hebbal",
    name: "Hebbal",
    kannadaName: "ಹೆಬ್ಬಾಳ",
    zone: "North Bengaluru",
    pincode: "560024",
    coordinates: {
      lat: 13.0358,
      lng: 77.597
    },
    metroLine: "Blue Line (Upcoming Airport Metro Corridor)",
    keyLandmarks: [
      "Hebbal Flyover",
      "Hebbal Lake",
      "Manyata Tech Park Gateway",
      "Bellary Road",
      "Esteem Mall"
    ],
    techParksAndHubs: [
      "Manyata Embassy Business Park",
      "Kirloskar Business Park"
    ],
    commercialProfile: "Gateway to North Bengaluru and Kempegowda International Airport. Epicenter of massive IT employment (Manyata Tech Park), luxury penthouses, diagnostic pathology networks, and bespoke interior design firms.",
    painPointHook: "North Bengaluru executives and airport corridor residents have high standards. If your website takes 5 seconds to load or feels like an outdated template, they immediately bounce to a competitor.",
    niches: [
      {
        nicheKey: "real-estate",
        name: "North Bengaluru Luxury High-Rise & Villas",
        icon: "🏛️",
        headline: "Luxury Real Estate Websites in Hebbal",
        subheadline: "High-resolution penthouse video walkthroughs, RERA proof disclosures, and high-net-worth lead gates.",
        localHook: "Marketing ₹3 Cr+ luxury high-rise apartments and villa estates along the airport highway.",
        statBadge: "HNW Buyer Funnels",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "healthcare-diagnostics",
        name: "Diagnostic Pathology & Imaging Networks",
        icon: "🔬",
        headline: "Diagnostic Center Websites in Hebbal",
        subheadline: "Executive health checkup packages, home sample collection booking, and instant PDF report retrieval.",
        localHook: "Serving corporate tech professionals across Manyata Tech Park and residential communities.",
        statBadge: "Rapid Sample Booking Flow",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Enterprise IT & Cloud Engineering Firms",
        icon: "💼",
        headline: "B2B Tech & Cloud Consulting Websites in Hebbal",
        subheadline: "Sub-second performance, cloud architecture case studies, and enterprise RFP consultation gates.",
        localHook: "Positioning software engineering and IT firms operating in Manyata and Kirloskar Business Parks.",
        statBadge: "Enterprise RFP Funnels",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Luxury Residential Interior Architects",
        icon: "📐",
        headline: "Interior Architecture Portfolios in Hebbal",
        subheadline: "4K penthouse project showcases, transparent fee calculators, and quick consultation booking funnels.",
        localHook: "Winning luxury interior contracts for high-rise residential towers around Hebbal Lake.",
        statBadge: "0.8s LCP Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Executive Polyclinics & Outpatient Suites",
        icon: "🏥",
        headline: "Polyclinic & Health Center Websites in Hebbal",
        subheadline: "Corporate health screening packages, doctor OPD schedules, and seamless 2-tap appointment booking.",
        localHook: "Serving corporate tech professionals across Manyata Tech Park and residential communities.",
        statBadge: "Executive OPD Triage",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can your real estate websites handle high-resolution video tours of penthouses?",
        answer: "Yes. We stream optimized 4K video clips with instant playback on mobile devices without any buffering lag."
      },
      {
        question: "How do you target corporate employees working in Manyata Tech Park?",
        answer: "We craft localized landing pages with Manyata keywords, corporate health package triage, and rapid WhatsApp contact buttons."
      },
      {
        question: "Can we meet in Hebbal for a discovery session?",
        answer: "Yes, we can meet near Manyata Tech Park or along Bellary Road for an initial in-person scoping meeting."
      },
      {
        question: "What is your delivery guarantee?",
        answer: "7 business days. If we do not deliver on time, your complete website build is 100% free."
      }
    ]
  },
  "cunningham-road": {
    slug: "cunningham-road",
    name: "Cunningham Road",
    kannadaName: "ಕನ್ನಿಂಗ್ಹ್ಯಾಮ್ ರಸ್ತೆ",
    zone: "Central Bengaluru",
    pincode: "560052",
    coordinates: {
      lat: 12.9866,
      lng: 77.5958
    },
    metroLine: "Purple Line (Cubbon Park / Vidhana Soudha link)",
    keyLandmarks: [
      "Chandrika Hotel",
      "Sigma Mall",
      "High Grounds",
      "Millers Road link",
      "Palace Road link"
    ],
    techParksAndHubs: [
      "Prestige Meridian Link",
      "Central Financial Corridor"
    ],
    commercialProfile: "Elite central commercial enclave. Renowned for senior medical specialists, distinguished architecture studios, corporate legal consultancies, and private diagnostic centers.",
    painPointHook: "Patients and corporate clients visiting Cunningham Road firms expect dignified professional standards. An amateur website with generic stock photos destroys your credibility with high-ticket clients.",
    niches: [
      {
        nicheKey: "doctor-specialist",
        name: "Senior Surgeons & Specialist Practices",
        icon: "🩺",
        headline: "Medical Specialist Practice Websites on Cunningham Road",
        subheadline: "Distinguished surgical credentials, ethical patient education guides, and private second-opinion consult booking.",
        localHook: "Attracting private second-opinion and international surgical patients in Central Bengaluru.",
        statBadge: "Distinguished Clinical UX",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "studio",
        name: "Bespoke Architecture & Design Studios",
        icon: "📐",
        headline: "Architecture Studio Portfolios on Cunningham Road",
        subheadline: "Sub-second 4K estate galleries, editorial typography, and private commission intake funnels.",
        localHook: "Positioning award-winning architects for luxury residential estates and commercial developments.",
        statBadge: "Editorial Portfolio Design",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "business-portfolio",
        name: "Corporate Legal & Financial Advisory",
        icon: "💼",
        headline: "Corporate Legal & Advisory Websites on Cunningham Road",
        subheadline: "Bar Council compliant credentials, partner biographies, industry white-papers, and secure client contact.",
        localHook: "Establishing institutional authority for established legal, private wealth, and audit practices.",
        statBadge: "Institutional Trust Design",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Multi-Specialty Polyclinics & Centers",
        icon: "🏥",
        headline: "Executive Health Polyclinic Websites on Cunningham Road",
        subheadline: "Doctor OPD schedules, 2-tap appointment booking, and emergency WhatsApp routing for local families.",
        localHook: "Serving executive corporate staff and residents living in High Grounds and Central Bengaluru.",
        statBadge: "Executive OPD Triage",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Luxury Interior Architects & Decorators",
        icon: "📐",
        headline: "Bespoke Interior Design Websites on Cunningham Road",
        subheadline: "Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.",
        localHook: "Positioning boutique commercial and luxury residential interior architects in Central Bengaluru.",
        statBadge: "0.8s LCP Portfolios",
        targetPrice: "₹55,000"
      }
    ],
    faqs: [
      {
        question: "Are your doctor websites compliant with medical ethics regulations?",
        answer: "Yes. We strictly adhere to National Medical Commission guidelines: verified qualifications, transparent OPD hours, and zero deceptive claims."
      },
      {
        question: "How quickly can our Cunningham Road practice go live?",
        answer: "In exactly 7 business days from project kickoff, backed by our contractual late-means-free guarantee."
      },
      {
        question: "Can we meet on Cunningham Road for an initial briefing?",
        answer: "Yes, we regularly meet clients across Cunningham Road, High Grounds, or over Google Meet."
      },
      {
        question: "Will our website work seamlessly on mobile phones and iPads?",
        answer: "Yes. Every screen is custom designed by Geetha for fluid responsiveness across iPhones, iPads, and high-resolution Retina displays."
      }
    ]
  },
  "frazer-town": {
    slug: "frazer-town",
    name: "Frazer Town (Pulikeshi Nagar)",
    kannadaName: "ಫ್ರೇಜರ್ ಟೌನ್",
    zone: "Central-East Bengaluru",
    pincode: "560005",
    coordinates: {
      lat: 12.9972,
      lng: 77.6144
    },
    metroLine: "Pink Line (Upcoming Cantonment & Pottery Town Stations)",
    keyLandmarks: [
      "Coles Road",
      "Mosque Road",
      "Pulikeshi Nagar",
      "Richards Town link",
      "Cooke Town link"
    ],
    techParksAndHubs: [
      "MG Road CBD Link",
      "Cantonment Commercial Belt"
    ],
    commercialProfile: "Charming, culturally vibrant historic residential neighborhood. High concentration of bridal salons, cosmetic dental practices, turnkey modular home renovation contractors, and independent management consultants.",
    painPointHook: "Discerning families across Frazer Town and Richards Town value genuine craftsmanship and personal attention. A generic website looks like a faceless marketing agency.",
    niches: [
      {
        nicheKey: "salon-beauty",
        name: "Luxury Salons & Bridal Makeover Studios",
        icon: "✨",
        headline: "Bridal Beauty & Salon Websites in Frazer Town",
        subheadline: "Sensory bridal package portfolios, verified before-and-after skin galleries, and direct WhatsApp concierge triage.",
        localHook: "Winning high-margin bridal party bookings and premium hair spa retainers on Coles Road and Mosque Road.",
        statBadge: "Instant WhatsApp Inquiries",
        targetPrice: "₹40,000"
      },
      {
        nicheKey: "dental-clinics",
        name: "Family Dental & Cosmetic Clinics",
        icon: "🦷",
        headline: "Family Dental Clinic Websites in Frazer Town",
        subheadline: "Anxious patient UX, smile makeover sliders, 2-tap appointment booking, and transparent procedure fees.",
        localHook: "Attracting multi-generational families and bridal patients across Frazer Town and Cooke Town.",
        statBadge: "2-Tap Booking Flow",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "home-renovation",
        name: "Heritage Renovation & Kitchen Centers",
        icon: "🔨",
        headline: "Home Renovation Websites in Frazer Town",
        subheadline: "Colonial home restoration showcases, modern modular kitchen cost estimators, and warranty transparency.",
        localHook: "Winning heritage renovation and contemporary apartment refurbishment contracts in East Bengaluru.",
        statBadge: "Estimate Intake Engine",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "coaches-consultants",
        name: "Executive Mentors & Advisory Practices",
        icon: "🎯",
        headline: "Consulting & Advisory Websites in Frazer Town",
        subheadline: "Clean editorial typography, thought leadership gateways, and direct discovery call scheduling.",
        localHook: "Helping senior advisors win high-ticket corporate contracts across Bengaluru tech hubs.",
        statBadge: "Discovery Booking Flow",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Family Polyclinics & Primary Healthcare",
        icon: "🏥",
        headline: "Family Polyclinic Websites in Frazer Town",
        subheadline: "Doctor OPD schedules, 2-tap appointment booking, and emergency WhatsApp routing for local families.",
        localHook: "Serving multi-generational families and residents across Coles Road and Mosque Road.",
        statBadge: "Instant OPD Schedules",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can bridal salons take appointment bookings with advance UPI deposits?",
        answer: "Yes. We integrate secure UPI and Razorpay payment links directly into your booking confirmation flow."
      },
      {
        question: "How do you ensure our website loads fast on mobile networks?",
        answer: "We write clean, semantic React code and compress all images to modern WebP formats, achieving sub-0.8s load times."
      },
      {
        question: "Who handles the design and development at Uncoded Hub?",
        answer: "Geetha designs every interface and Deepak hand-codes the React application. Zero junior developer handoffs."
      },
      {
        question: "What is your delivery guarantee?",
        answer: "7 business days. If we do not deliver on time, your entire website build is 100% free."
      }
    ]
  },
  "vasanth-nagar": {
    slug: "vasanth-nagar",
    name: "Vasanth Nagar",
    kannadaName: "ವಸಂತ ನಗರ",
    zone: "Central Bengaluru",
    pincode: "560051",
    coordinates: {
      lat: 12.9892,
      lng: 77.5891
    },
    metroLine: "Purple Line (Cubbon Park Station Link)",
    keyLandmarks: [
      "Mount Carmel College",
      "Millers Road",
      "Cantonment Railway Station",
      "Palace Grounds link",
      "Shangri-La Hotel"
    ],
    techParksAndHubs: [
      "High Grounds Corporate Hub",
      "CBD Fringe Corridor"
    ],
    commercialProfile: "Prestigious central residential and commercial pocket. High density of corporate legal advisory practices, private medical specialists, bespoke interior designers, and boutique creative studios.",
    painPointHook: "High-profile clients in Vasanth Nagar expect understated elegance and immediate responsiveness. A slow, cluttered website immediately damages professional reputation.",
    niches: [
      {
        nicheKey: "business-portfolio",
        name: "Corporate Legal & Financial Advisory",
        icon: "💼",
        headline: "Corporate Legal & Advisory Websites in Vasanth Nagar",
        subheadline: "Bar Council compliant credentials, partner biographies, industry white-papers, and secure client contact.",
        localHook: "Establishing institutional authority for established legal, private wealth, and audit practices.",
        statBadge: "Institutional Trust Design",
        targetPrice: "₹50,000"
      },
      {
        nicheKey: "doctor-specialist",
        name: "Senior Surgeons & Specialist Practices",
        icon: "🩺",
        headline: "Medical Practice Websites in Vasanth Nagar",
        subheadline: "Surgical credentials, ethical patient education guides, second-opinion booking, and hospital privileges proof.",
        localHook: "Attracting private second-opinion and international surgical patients along Millers Road.",
        statBadge: "NMC-Compliant Trust UX",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "interior-designers",
        name: "Bespoke Residential Interior Designers",
        icon: "📐",
        headline: "Interior Architecture Portfolios in Vasanth Nagar",
        subheadline: "Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.",
        localHook: "Positioning boutique residential architects for luxury apartments and estates in Central Bengaluru.",
        statBadge: "Sub-second 4K Portfolios",
        targetPrice: "₹55,000"
      },
      {
        nicheKey: "creative-portfolio",
        name: "Boutique Design & Brand Studios",
        icon: "🎨",
        headline: "Creative Studio Portfolios in Vasanth Nagar",
        subheadline: "Sub-second editorial case studies, visual craft showcases, and frictionless B2B client inquiry intake.",
        localHook: "Helping boutique design and branding practices in Central Bengaluru win enterprise retainer clients.",
        statBadge: "Award-Winning Speed & Polish",
        targetPrice: "₹45,000"
      },
      {
        nicheKey: "clinic-polyclinic",
        name: "Executive Medical Polyclinics & Suites",
        icon: "🏥",
        headline: "Medical Polyclinic Websites in Vasanth Nagar",
        subheadline: "Doctor OPD schedules, 2-tap appointment booking, and emergency WhatsApp routing for central residents.",
        localHook: "Serving executive corporate staff and families living along Millers Road and Cantonment.",
        statBadge: "Executive OPD Triage",
        targetPrice: "₹50,000"
      }
    ],
    faqs: [
      {
        question: "Can you build Bar Council compliant websites for legal firms?",
        answer: "Yes. We design clean, professional informational portals with partner credentials and thought leadership that respect Bar Council regulations."
      },
      {
        question: "How fast will our website load on smartphones?",
        answer: "Under 0.8 seconds. Our hand-coded React architecture achieves 99+ on Google PageSpeed Insights."
      },
      {
        question: "Can we meet in Vasanth Nagar for a kickoff discussion?",
        answer: "Yes, we can meet along Millers Road, Palace Road, or over Google Meet."
      },
      {
        question: "What is your delivery guarantee?",
        answer: "7 business days. If we do not launch your website on Day 7, you pay nothing."
      }
    ]
  }
};

export const LOCALITY_SLUGS = Object.keys(BANGALORE_LOCALITIES);
