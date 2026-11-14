import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// Definition of 20 markets with their 10 cities each
const MARKETS_CONFIG = [
  {
    marketSlug: 'us',
    countryName: 'United States',
    flag: '🇺🇸',
    currencyCode: 'USD',
    currencySymbol: '$',
    sprintPrice: '$2,800 USD flat',
    rateMultiplier: 1,
    timezoneBase: 'US Timezones (EST/CST/PST)',
    cities: [
      {
        slug: 'new-york',
        name: 'New York City',
        region: 'New York',
        tagline: 'Bespoke React Platforms for Manhattan, Silicon Alley & DUMBO',
        corridors: ['Midtown Manhattan', 'Financial District (FiDi)', 'Silicon Alley', 'DUMBO Brooklyn', 'SoHo & Flatiron'],
        agencyRate: '$18,000 – $45,000 + $250/hr',
        savings: 'Save $15,000+ vs Manhattan agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Live Window + Daily Evening Loom',
        industries: ['Corporate Law & Litigation', 'Private Equity & Wealth', 'Aesthetic Medicine & Dermatology', 'Boutique Architecture', 'Luxury Hospitality']
      },
      {
        slug: 'san-francisco',
        name: 'San Francisco & Silicon Valley',
        region: 'California',
        tagline: 'Engineered for SoMa, Palo Alto, Sand Hill Road & Berkeley',
        corridors: ['SoMa & Mission Bay', 'Palo Alto (University Ave)', 'Sand Hill Road (Menlo Park)', 'Mountain View', 'Downtown San Francisco'],
        agencyRate: '$20,000 – $50,000 + $275/hr',
        savings: 'Save $17,000+ vs Bay Area design shops',
        tz: 'Pacific Standard Time (PST)',
        tzCode: 'PST (UTC-8)',
        overlap: 'Asynchronous Daily Loom + 8:00 PM PST Handover Calls',
        industries: ['AI & Enterprise Software', 'Venture Capital & Family Offices', 'Concierge Medicine', 'Biotech & Life Sciences', 'Specialized Consulting']
      },
      {
        slug: 'los-angeles',
        name: 'Los Angeles',
        region: 'California',
        tagline: 'Luxury Aesthetics for Beverly Hills, Century City & Silicon Beach',
        corridors: ['Beverly Hills & Rodeo', 'Century City', 'Silicon Beach (Venice / Santa Monica)', 'Downtown LA (DTLA)', 'West Hollywood'],
        agencyRate: '$16,000 – $40,000 + $225/hr',
        savings: 'Save $13,000+ vs West Coast agencies',
        tz: 'Pacific Standard Time (PST)',
        tzCode: 'PST (UTC-8)',
        overlap: 'Daily Loom Briefings + Scheduled West Coast Zoom Windows',
        industries: ['Plastic Surgery & Aesthetic Clinics', 'Luxury Real Estate', 'Entertainment & Production', 'Boutique Legal Counsel', 'High-End Retail']
      },
      {
        slug: 'chicago',
        name: 'Chicago',
        region: 'Illinois',
        tagline: 'Built for The Loop, Fulton Market District & Michigan Avenue',
        corridors: ['The Loop Financial District', 'Fulton Market & West Loop', 'Magnificent Mile', 'River North', 'Oak Brook / Suburbs'],
        agencyRate: '$14,000 – $35,000 + $200/hr',
        savings: 'Save $11,000+ vs Chicago agencies',
        tz: 'Central Standard Time (CST)',
        tzCode: 'CST (UTC-6)',
        overlap: '7:30 AM – 10:30 AM CST Direct Handover Window',
        industries: ['Commercial Litigation & Law', 'Logistics & Supply Chain', 'Manufacturing OEMs', 'Medical & Surgical Specialties', 'B2B Consulting']
      },
      {
        slug: 'miami',
        name: 'Miami',
        region: 'Florida',
        tagline: 'Vibrant Precision for Brickell, Wynwood & Coconut Grove',
        corridors: ['Brickell Financial District', 'Wynwood Arts & Tech', 'Coral Gables', 'Design District', 'Miami Beach & South Beach'],
        agencyRate: '$14,000 – $32,000 + $195/hr',
        savings: 'Save $11,000+ vs South Florida agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Live Touchpoint Window',
        industries: ['Wealth Management & Crypto', 'Cosmetic Surgery & MedSpas', 'Luxury Waterfront Real Estate', 'Hospitality & Nightlife', 'International Trade']
      },
      {
        slug: 'austin',
        name: 'Austin',
        region: 'Texas',
        tagline: 'Engineered for Downtown Austin, The Domain & South Congress',
        corridors: ['Downtown Austin Tech Corridor', 'The Domain (Silicon Hills North)', 'South Congress (SoCo)', 'East Austin Creative Hub', 'Westlake Hills'],
        agencyRate: '$12,000 – $30,000 + $185/hr',
        savings: 'Save $9,500+ vs Austin boutique shops',
        tz: 'Central Standard Time (CST)',
        tzCode: 'CST (UTC-6)',
        overlap: '7:30 AM – 10:30 AM CST Collaboration Window',
        industries: ['SaaS & B2B Technology', 'Renewable Energy & Solar', 'Commercial Real Estate', 'Orthopedic & Dental Clinics', 'Specialty Contracting']
      },
      {
        slug: 'seattle',
        name: 'Seattle & Bellevue',
        region: 'Washington',
        tagline: 'Cloud-Speed Platforms for South Lake Union, Bellevue & Pioneer Square',
        corridors: ['South Lake Union (Tech Center)', 'Downtown Bellevue', 'Pioneer Square', 'Kirkland Waterfront', 'Redmond Corridor'],
        agencyRate: '$16,000 – $38,000 + $220/hr',
        savings: 'Save $13,000+ vs Pacific Northwest agencies',
        tz: 'Pacific Standard Time (PST)',
        tzCode: 'PST (UTC-8)',
        overlap: 'Asynchronous Daily Loom + Scheduled Morning Touchpoints',
        industries: ['Cloud Infrastructure & DevOps', 'Biotech Research', 'Maritime & Clean Energy', 'High-End Architecture', 'Specialized Medical Clinics']
      },
      {
        slug: 'boston',
        name: 'Boston & Cambridge',
        region: 'Massachusetts',
        tagline: 'Academic Rigor for Kendall Square, Seaport & Back Bay',
        corridors: ['Seaport Innovation District', 'Kendall Square (Cambridge)', 'Back Bay & Financial Center', 'Route 128 Tech Belt', 'Beacon Hill'],
        agencyRate: '$16,000 – $40,000 + $225/hr',
        savings: 'Save $13,000+ vs Boston agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Live Window',
        industries: ['Biotech & Therapeutics', 'IP & Patent Law', 'Higher Education & Academies', 'Private Wealth Management', 'Healthcare Systems']
      },
      {
        slug: 'dallas',
        name: 'Dallas–Fort Worth',
        region: 'Texas',
        tagline: 'Enterprise Authority for Uptown, Legacy West & Las Colinas',
        corridors: ['Uptown Dallas', 'Legacy West (Plano)', 'Las Colinas (Irving)', 'Preston Hollow / Park Cities', 'Downtown Fort Worth'],
        agencyRate: '$14,000 – $32,000 + $190/hr',
        savings: 'Save $11,000+ vs DFW agencies',
        tz: 'Central Standard Time (CST)',
        tzCode: 'CST (UTC-6)',
        overlap: '7:30 AM – 10:30 AM CST Direct Sync Window',
        industries: ['Corporate Headquarters', 'Telecom & Financial Tech', 'Commercial Real Estate', 'Multi-Location Healthcare', 'Oil, Gas & Energy Services']
      },
      {
        slug: 'atlanta',
        name: 'Atlanta',
        region: 'Georgia',
        tagline: 'Commercial Power for Buckhead, Midtown & Perimeter Center',
        corridors: ['Buckhead Financial Corridor', 'Midtown Atlanta Tech Square', 'Perimeter Center', 'Alpharetta Tech City', 'Old Fourth Ward'],
        agencyRate: '$12,000 – $28,000 + $175/hr',
        savings: 'Save $9,000+ vs Atlanta agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Live Touchpoint Window',
        industries: ['FinTech & Payments', 'Healthcare Diagnostics', 'B2B Logistics', 'Commercial Construction', 'Entertainment & Media Production']
      }
    ]
  },
  {
    marketSlug: 'uk',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    currencyCode: 'GBP',
    currencySymbol: '£',
    sprintPrice: '£2,200 GBP flat',
    cities: [
      {
        slug: 'london',
        name: 'London',
        region: 'Greater London',
        tagline: 'Bespoke React Engineering for The City, Mayfair & Silicon Roundabout',
        corridors: ['The City of London', 'Mayfair & St James’s', 'Harley Street Medical District', 'Canary Wharf', 'Shoreditch & Silicon Roundabout'],
        agencyRate: '£15,000 – £35,000 + £180/hr',
        savings: 'Save £12,000+ vs Central London agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Daily Live Collaboration Window',
        industries: ['City Law Firms & Barristers', 'Private Equity & Wealth', 'Harley Street Aesthetic Clinics', 'Architectural Studios', 'FinTech Innovators']
      },
      {
        slug: 'manchester',
        name: 'Manchester',
        region: 'Greater Manchester',
        tagline: 'Commercial Power for Spinningfields, MediaCityUK & Northern Quarter',
        corridors: ['Spinningfields Business District', 'MediaCityUK (Salford)', 'Northern Quarter', 'St Peter’s Square', 'Didsbury & South Manchester'],
        agencyRate: '£8,000 – £20,000 + £120/hr',
        savings: 'Save £6,000+ vs Northern Powerhouse agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Active Sync Window',
        industries: ['Digital Media & Production', 'Commercial Law', 'E-Commerce Brands', 'Property Developers', 'Specialist Medical Consultants']
      },
      {
        slug: 'birmingham',
        name: 'Birmingham',
        region: 'West Midlands',
        tagline: 'Precision Architecture for Colmore Row, Digbeth & Edgbaston',
        corridors: ['Colmore Business District', 'Jewellery Quarter', 'Digbeth Creative Quarter', 'Edgbaston Medical Corridor', 'Solihull Tech Hub'],
        agencyRate: '£7,500 – £18,000 + £110/hr',
        savings: 'Save £5,000+ vs Midlands agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Live Touchpoint Window',
        industries: ['Advanced Manufacturing OEMs', 'Corporate Legal Services', 'Luxury Jewellery Retail', 'Private Healthcare Practices', 'Engineering Consultancies']
      },
      {
        slug: 'edinburgh',
        name: 'Edinburgh',
        region: 'Scotland',
        tagline: 'Heritage & Innovation for Exchange District, New Town & Leith',
        corridors: ['The Exchange Financial District', 'New Town Professional Quarter', 'Leith Tech & Creative Hub', 'George Street', 'Edinburgh Park'],
        agencyRate: '£9,000 – £22,000 + £130/hr',
        savings: 'Save £7,000+ vs Scottish agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Real-Time Collaboration',
        industries: ['Asset Management & Investment', 'Legal Advocates & Writers to the Signet', 'Renewable Energy & Cleantech', 'Heritage Hospitality', 'SaaS Tech Hubs']
      },
      {
        slug: 'bristol',
        name: 'Bristol',
        region: 'South West England',
        tagline: 'Creative & Technical Prowess for Temple Quarter & Clifton',
        corridors: ['Temple Quarter Enterprise Zone', 'Clifton Village', 'Harbourside', 'Finzels Reach', 'Stokes Croft'],
        agencyRate: '£7,500 – £19,000 + £115/hr',
        savings: 'Save £5,500+ vs South West agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Direct Sync Window',
        industries: ['Aerospace & Engineering', 'Environmental & Green Tech', 'Creative Media & Animation', 'Boutique Law', 'Specialist Clinics']
      },
      {
        slug: 'leeds',
        name: 'Leeds',
        region: 'West Yorkshire',
        tagline: 'Financial & Legal Authority for Leeds City Centre & South Bank',
        corridors: ['Financial & Legal Quarter', 'South Bank Innovation Hub', 'Wellington Place', 'Headingley Commercial District', 'Thorpe Park'],
        agencyRate: '£7,000 – £17,500 + £110/hr',
        savings: 'Save £5,000+ vs Yorkshire agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Live Overlap Window',
        industries: ['Commercial Banking & Law', 'HealthTech & Medical Devices', 'Digital Marketing Networks', 'Logistics Infrastructure', 'Manufacturing Services']
      },
      {
        slug: 'glasgow',
        name: 'Glasgow',
        region: 'Scotland',
        tagline: 'Engineering Prowess for IFSD, Merchant City & West End',
        corridors: ['International Financial Services District (IFSD)', 'Merchant City', 'West End (Byres Road)', 'Broomielaw Waterfront', 'Pacific Quay'],
        agencyRate: '£7,000 – £16,000 + £105/hr',
        savings: 'Save £5,000+ vs Glasgow agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Collaborative Window',
        industries: ['Marine Engineering & Shipbuilding', 'Financial Back-Office Operations', 'Life Sciences & Biotech', 'Architecture & Design', 'Hospitality Groups']
      },
      {
        slug: 'cambridge',
        name: 'Cambridge',
        region: 'Cambridgeshire',
        tagline: 'Deep Tech Rigor for Silicon Fen, Science Park & Station Square',
        corridors: ['Cambridge Science Park', 'Silicon Fen Innovation Belt', 'Station Square & CB1', 'St John’s Innovation Centre', 'Historic University Centre'],
        agencyRate: '£10,000 – £24,000 + £140/hr',
        savings: 'Save £8,000+ vs Cambridge agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Live Handover Window',
        industries: ['Biotechnology & Genomics', 'AI & Deep Tech Startups', 'Scientific IP Law', 'Academic Advisory & Publishing', 'Specialized Testing Labs']
      },
      {
        slug: 'oxford',
        name: 'Oxford',
        region: 'Oxfordshire',
        tagline: 'Scholarly Excellence for Oxford Science Park & Headington BioEscalator',
        corridors: ['Oxford Science Park', 'Headington Medical & BioEscalator', 'Begbroke Science Park', 'Harwell Campus (Science Vale)', 'City Centre & Broad Street'],
        agencyRate: '£9,500 – £22,000 + £135/hr',
        savings: 'Save £7,500+ vs Oxfordshire agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Active Sync Window',
        industries: ['Quantum Computing & Fusion Energy', 'Clinical Trials & Pharma', 'Publishing & Educational Tech', 'Commercial Arbitration', 'Private Practice Clinics']
      },
      {
        slug: 'liverpool',
        name: 'Liverpool',
        region: 'Merseyside',
        tagline: 'Maritime Dynamic for Commercial District & Baltic Triangle',
        corridors: ['Old Hall Street Commercial District', 'Baltic Triangle Creative Sector', 'Knowledge Quarter (KQ Liverpool)', 'Albert Dock Waterfront', 'Ropewalks'],
        agencyRate: '£6,500 – £15,000 + £100/hr',
        savings: 'Save £4,500+ vs North West agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / BST',
        overlap: '10:00 AM – 3:30 PM GMT Collaboration Window',
        industries: ['Maritime Logistics & Freight', 'Creative Tech & Gaming', 'Biomedical Science', 'Commercial Litigation', 'Hospitality & Leisure']
      }
    ]
  },
  {
    marketSlug: 'ca',
    countryName: 'Canada',
    flag: '🇨🇦',
    currencyCode: 'CAD',
    currencySymbol: '$',
    sprintPrice: '$3,800 CAD flat',
    cities: [
      {
        slug: 'toronto',
        name: 'Toronto',
        region: 'Ontario',
        tagline: 'Commercial Power for Bay Street, King West & Yorkville',
        corridors: ['Bay Street Financial District', 'King West Innovation Corridor', 'Yorkville Luxury Quarter', 'Liberty Village', 'Yonge & Eglinton'],
        agencyRate: '$15,000 – $38,000 CAD',
        savings: 'Save $12,000+ CAD vs Toronto agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Live Window',
        industries: ['Corporate Banking & Law', 'AI & Financial Technology', 'Cosmetic Surgery & Dermatology', 'Boutique Architecture', 'Real Estate Development']
      },
      {
        slug: 'vancouver',
        name: 'Vancouver',
        region: 'British Columbia',
        tagline: 'Pacific Gateway Precision for Yaletown, Coal Harbour & Gastown',
        corridors: ['Coal Harbour Financial Waterfront', 'Yaletown Creative District', 'Gastown Tech Corridor', 'Broadway Medical Belt', 'Mount Pleasant Innovation Hub'],
        agencyRate: '$14,000 – $36,000 CAD',
        savings: 'Save $11,000+ CAD vs BC agencies',
        tz: 'Pacific Standard Time (PST)',
        tzCode: 'PST (UTC-8)',
        overlap: 'Asynchronous Daily Loom + Scheduled West Coast Calls',
        industries: ['Clean Technology & Renewable Energy', 'Mining & Natural Resources IP', 'Luxury Waterfront Living', 'Digital Entertainment & VFX', 'Functional Medicine']
      },
      {
        slug: 'montreal',
        name: 'Montreal',
        region: 'Quebec',
        tagline: 'Creative & Technical Mastery for Mile End, Old Montreal & Downtown',
        corridors: ['Old Montreal Historic District', 'Mile End AI Hub', 'Downtown Ville-Marie', 'Griffintown Creative Quarter', 'Saint-Laurent Biotech Corridor'],
        agencyRate: '$12,000 – $30,000 CAD',
        savings: 'Save $9,000+ CAD vs Quebec agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Live Touchpoint Window',
        industries: ['Deep Learning & AI Research', 'Aerospace Engineering', 'Fashion & Luxury E-Commerce', 'Bilingual Corporate Law', 'Video Game Studios']
      },
      {
        slug: 'calgary',
        name: 'Calgary',
        region: 'Alberta',
        tagline: 'Energy Capital Authority for Downtown Calgary & The Beltline',
        corridors: ['Downtown Commercial Core', 'The Beltline Innovation District', 'East Village Regeneration Area', 'Quarry Park Corporate Centre', 'Inglewood Creative Quarter'],
        agencyRate: '$11,000 – $28,000 CAD',
        savings: 'Save $8,000+ CAD vs Alberta agencies',
        tz: 'Mountain Standard Time (MST)',
        tzCode: 'MST (UTC-7)',
        overlap: '7:00 AM – 9:30 AM MST Live Sync Window',
        industries: ['Energy & Decarbonization Services', 'Commercial Real Estate', 'AgriTech & Logistics', 'Corporate Legal Services', 'Specialized Medical Clinics']
      },
      {
        slug: 'ottawa',
        name: 'Ottawa & Kanata',
        region: 'Ontario',
        tagline: 'Capital Precision for Kanata North Technology Park & Downtown Ottawa',
        corridors: ['Kanata North Technology Park', 'Downtown Capital Core', 'ByWard Market Commercial Area', 'Westboro Tech Strip', 'Centretown Corporate Quarter'],
        agencyRate: '$12,000 – $32,000 CAD',
        savings: 'Save $9,000+ CAD vs National Capital agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Direct Collaboration Window',
        industries: ['Cybersecurity & SaaS', 'Government Affairs & National Associations', 'Telecommunications', 'Defense Technologies', 'Medical Specialist Networks']
      },
      {
        slug: 'edmonton',
        name: 'Edmonton',
        region: 'Alberta',
        tagline: 'Industrial & Research Power for ICE District & Old Strathcona',
        corridors: ['Downtown ICE District', 'Old Strathcona Commercial Hub', 'University Innovation District', 'Nisku Industrial Area', '124th Street Boutique Strip'],
        agencyRate: '$10,000 – $25,000 CAD',
        savings: 'Save $7,000+ CAD vs Edmonton agencies',
        tz: 'Mountain Standard Time (MST)',
        tzCode: 'MST (UTC-7)',
        overlap: '7:00 AM – 9:30 AM MST Direct Contact Window',
        industries: ['Health Sciences & Nanotechnology', 'Industrial Supply & Construction', 'Government & Public Policy Advisory', 'Commercial Law', 'Specialty Medical Practices']
      },
      {
        slug: 'mississauga',
        name: 'Mississauga',
        region: 'Ontario',
        tagline: 'Corporate Engine for City Centre, Meadowvale & Airport Corporate Belt',
        corridors: ['Mississauga City Centre', 'Meadowvale Business Park', 'Airport Corporate Centre', 'Port Credit Waterfront', 'Sheridan Science & Tech Park'],
        agencyRate: '$12,000 – $28,000 CAD',
        savings: 'Save $9,000+ CAD vs GTA agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Live Touchpoint Window',
        industries: ['Pharmaceutical & Life Sciences', 'Aerospace & Automotive Engineering', 'Supply Chain Logistics', 'Corporate Law Firms', 'Multi-Discipline Polyclinics']
      },
      {
        slug: 'victoria',
        name: 'Victoria',
        region: 'British Columbia',
        tagline: 'Island Distinction for Inner Harbour, Old Town & Tectoria',
        corridors: ['Inner Harbour Commercial Zone', 'Old Town Creative Quarter', 'Fort Street Technology Corridor (Tectoria)', 'Uptown Commercial Centre', 'Oak Bay Luxury District'],
        agencyRate: '$11,000 – $26,000 CAD',
        savings: 'Save $8,000+ CAD vs Vancouver Island shops',
        tz: 'Pacific Standard Time (PST)',
        tzCode: 'PST (UTC-8)',
        overlap: 'Asynchronous Daily Loom + Scheduled Video Calls',
        industries: ['Ocean Sciences & Marine Tech', 'Public Policy & Legal Advisory', 'Eco-Tourism & Luxury Lodging', 'Boutique Health & Wellness', 'Game Development Studios']
      },
      {
        slug: 'waterloo',
        name: 'Kitchener–Waterloo',
        region: 'Ontario',
        tagline: 'Quantum & Tech Innovation for Silicon Valley North & Catalyst Commons',
        corridors: ['Innovation District (Downtown Kitchener)', 'Waterloo Research & Technology Park', 'Uptown Waterloo Tech Strip', 'The Tannery Building', 'Catalyst Commons'],
        agencyRate: '$12,000 – $30,000 CAD',
        savings: 'Save $9,000+ CAD vs tech corridor agencies',
        tz: 'Eastern Standard Time (EST)',
        tzCode: 'EST (UTC-5)',
        overlap: '8:00 AM – 11:30 AM EST Live Collaboration Window',
        industries: ['Quantum Computing & Cryptography', 'Autonomous Hardware & Robotics', 'InsurTech & FinTech', 'Patent Law & Commercialization', 'Advanced Manufacturing']
      },
      {
        slug: 'halifax',
        name: 'Halifax',
        region: 'Nova Scotia',
        tagline: 'Atlantic Gateway Excellence for Downtown Waterfront & Dartmouth',
        corridors: ['Downtown Halifax Financial District', 'Halifax Waterfront Commercial Boardwalk', 'COVE (Centre for Ocean Ventures)', 'Dartmouth Crossing', 'Spring Garden Road'],
        agencyRate: '$9,500 – $24,000 CAD',
        savings: 'Save $6,500+ CAD vs Atlantic agencies',
        tz: 'Atlantic Standard Time (AST)',
        tzCode: 'AST (UTC-4)',
        overlap: '8:30 AM – 12:30 PM AST Direct Sync Window',
        industries: ['Ocean Tech & Marine Research', 'Defense & Naval Procurement', 'Financial Shared Services', 'Health Sciences Research', 'Commercial Shipping & Logistics']
      }
    ]
  },
  {
    marketSlug: 'au',
    countryName: 'Australia',
    flag: '🇦🇺',
    currencyCode: 'AUD',
    currencySymbol: '$',
    sprintPrice: '$3,800 AUD flat',
    cities: [
      {
        slug: 'sydney',
        name: 'Sydney',
        region: 'New South Wales',
        tagline: 'Prestige Architecture for Sydney CBD, Barangaroo & Martin Place',
        corridors: ['Sydney CBD & Martin Place', 'Barangaroo International Towers', 'Surry Hills Creative & Tech Hub', 'Double Bay Luxury Medical Strip', 'Macquarie Park Tech Corridor'],
        agencyRate: '$18,000 – $45,000 AUD + retainers',
        savings: 'Save $14,000+ AUD vs Sydney CBD agencies',
        tz: 'Australian Eastern Standard Time (AEST)',
        tzCode: 'AEST / AEDT',
        overlap: '9:00 AM – 2:30 PM AEST Direct Morning Sync Window',
        industries: ['Investment Banking & Venture Capital', 'Commercial Litigation & Barristers', 'Harley Street-grade Aesthetic Surgeries', 'Super-Prime Property Developments', 'FinTech Innovators']
      },
      {
        slug: 'melbourne',
        name: 'Melbourne',
        region: 'Victoria',
        tagline: 'Editorial Distinction for Collins Street, Cremorne & Docklands',
        corridors: ['Collins Street ("Paris End")', 'Cremorne & Richmond Tech Silicon Yarra', 'Docklands Financial Waterfront', 'South Yarra Luxury District', 'Parkville Biomedical Precinct'],
        agencyRate: '$16,000 – $40,000 AUD',
        savings: 'Save $12,000+ AUD vs Melbourne agencies',
        tz: 'Australian Eastern Standard Time (AEST)',
        tzCode: 'AEST / AEDT',
        overlap: '9:00 AM – 2:30 PM AEST Direct Handover Window',
        industries: ['Corporate Law & Advisory', 'Biomedical & Clinical Research', 'Architectural Practices', 'Specialty Coffee & Hospitality', 'Enterprise Software']
      },
      {
        slug: 'brisbane',
        name: 'Brisbane',
        region: 'Queensland',
        tagline: 'Sunshine State Dynamism for Queen Street, Fortitude Valley & South Bank',
        corridors: ['Golden Triangle (Eagle & Queen St)', 'Fortitude Valley Creative Precinct', 'South Bank Corporate Corridor', 'Milton Commercial Hub', 'Newstead Gasworks Precinct'],
        agencyRate: '$12,000 – $32,000 AUD',
        savings: 'Save $9,000+ AUD vs Brisbane agencies',
        tz: 'Australian Eastern Standard Time (AEST, No DST)',
        tzCode: 'AEST (UTC+10)',
        overlap: '9:00 AM – 2:30 PM AEST Active Overlap',
        industries: ['Olympic 2032 Infrastructure & Construction', 'Mining & Resources Tech', 'Commercial Property Law', 'Specialized Medical Centres', 'Renewable Energy Initiatives']
      },
      {
        slug: 'perth',
        name: 'Perth',
        region: 'Western Australia',
        tagline: 'Resource Powerhouse Precision for St Georges Terrace & West Perth',
        corridors: ['St Georges Terrace Mining Belt', 'West Perth Resource Hub', 'Subiaco Boutique Quarter', 'Fremantle Marine Waterfront', 'Osborne Park Commercial District'],
        agencyRate: '$14,000 – $35,000 AUD',
        savings: 'Save $10,000+ AUD vs WA agencies',
        tz: 'Australian Western Standard Time (AWST)',
        tzCode: 'AWST (UTC+8)',
        overlap: '9:00 AM – 5:00 PM AWST Full Day Same-Timezone Direct Sync (Only 2.5h from IST)',
        industries: ['Mining, Energy & Critical Minerals', 'Engineering & EPC Contracts', 'Marine Logistics', 'Private Medical Polyclinics', 'Commercial Property Investment']
      },
      {
        slug: 'adelaide',
        name: 'Adelaide & Lot Fourteen',
        region: 'South Australia',
        tagline: 'Space & Defense Innovation for Lot Fourteen & King William Street',
        corridors: ['Lot Fourteen Innovation Precinct', 'King William Street Financial District', 'North Terrace Medical & Academic Belt', 'Tonsley Innovation District', 'Norwood Commercial Strip'],
        agencyRate: '$10,000 – $26,000 AUD',
        savings: 'Save $7,000+ AUD vs SA agencies',
        tz: 'Australian Central Standard Time (ACST)',
        tzCode: 'ACST / ACDT',
        overlap: '9:30 AM – 3:00 PM ACST Overlap Window',
        industries: ['Space & Satellite Technologies', 'Defense & Naval Systems', 'Biomedical & Cancer Research', 'Luxury Wine & Premium Agriculture', 'Renewable Energy Systems']
      },
      {
        slug: 'gold-coast',
        name: 'Gold Coast',
        region: 'Queensland',
        tagline: 'Coastal Luxury for Surfers Paradise, Southport CBD & Broadbeach',
        corridors: ['Southport CBD Priority Development Area', 'Surfers Paradise Oceanfront', 'Broadbeach Commercial Precinct', 'Robina Town Centre Tech Hub', 'Varsity Lakes Digital Strip'],
        agencyRate: '$9,000 – $24,000 AUD',
        savings: 'Save $6,000+ AUD vs Gold Coast agencies',
        tz: 'Australian Eastern Standard Time (AEST)',
        tzCode: 'AEST (UTC+10)',
        overlap: '9:00 AM – 2:30 PM AEST Direct Touchpoints',
        industries: ['Cosmetic & Plastic Surgery', 'Luxury Waterfront Property Development', 'Marine Tourism & Superyacht Services', 'Sports Science & Performance', 'Hospitality & Entertainment']
      },
      {
        slug: 'canberra',
        name: 'Canberra',
        region: 'Australian Capital Territory',
        tagline: 'Sovereign Integrity for Civic Centre, Barton & Parliamentary Triangle',
        corridors: ['Barton Government Relations Quarter', 'Civic (Canberra City Centre)', 'Parliamentary Triangle', 'Braddon Creative Strip', 'Deakin Medical & Commercial Precinct'],
        agencyRate: '$14,000 – $36,000 AUD',
        savings: 'Save $11,000+ AUD vs ACT agencies',
        tz: 'Australian Eastern Standard Time (AEST)',
        tzCode: 'AEST / AEDT',
        overlap: '9:00 AM – 2:30 PM AEST Sync Window',
        industries: ['Defense & National Security Advisory', 'Government Consulting & Public Policy', 'Cybersecurity Systems', 'National Industry Associations', 'Specialist Medical Clinics']
      },
      {
        slug: 'newcastle',
        name: 'Newcastle & Hunter Region',
        region: 'New South Wales',
        tagline: 'Industrial Transformation for Honeysuckle Waterfront & Newcastle West',
        corridors: ['Honeysuckle Waterfront Precinct', 'Newcastle West Business District', 'Hunter Street Mall', 'Broadmeadow Commercial Zone', 'Williamtown Aerospace Hub'],
        agencyRate: '$9,000 – $22,000 AUD',
        savings: 'Save $6,000+ AUD vs regional agencies',
        tz: 'Australian Eastern Standard Time (AEST)',
        tzCode: 'AEST / AEDT',
        overlap: '9:00 AM – 2:30 PM AEST Direct Line',
        industries: ['Clean Energy & Green Hydrogen', 'Port Logistics & Heavy Engineering', 'Hunter Valley Viticulture & Luxury Tourism', 'Healthcare Specialists', 'Defense Aerospace Support']
      },
      {
        slug: 'sunshine-coast',
        name: 'Sunshine Coast',
        region: 'Queensland',
        tagline: 'Sun-Drenched Sophistication for Maroochydore CBD & Noosa Heads',
        corridors: ['Maroochydore City Centre Tech Hub', 'Noosa Heads Hastings Street Strip', 'Birtinya Health Precinct', 'Kawana Waters Commercial Belt', 'Caloundra Business Hub'],
        agencyRate: '$8,500 – $20,000 AUD',
        savings: 'Save $5,500+ AUD vs coastal design shops',
        tz: 'Australian Eastern Standard Time (AEST)',
        tzCode: 'AEST (UTC+10)',
        overlap: '9:00 AM – 2:30 PM AEST Direct Touchpoints',
        industries: ['Health Precinct & Clinical Research', 'Architectural Design & High-End Renovation', 'Boutique Tourism & Eco-Resorts', 'Food Innovation & Agribusiness', 'Clean Tech Startups']
      },
      {
        slug: 'geelong',
        name: 'Geelong',
        region: 'Victoria',
        tagline: 'Advanced Manufacturing & Innovation for Federal Mills & Waterfront',
        corridors: ['Federal Mills Innovation Park', 'Geelong Waterfront Commercial Strip', 'Central Geelong Business District', 'North Geelong Industrial Hub', 'Bellarine Commercial Corridor'],
        agencyRate: '$8,000 – $19,000 AUD',
        savings: 'Save $5,000+ AUD vs regional Victorian shops',
        tz: 'Australian Eastern Standard Time (AEST)',
        tzCode: 'AEST / AEDT',
        overlap: '9:00 AM – 2:30 PM AEST Morning Handover Window',
        industries: ['Carbon Fibre & Advanced Materials', 'Insurance & National Headquarters', 'Agribusiness & Viticulture', 'Healthcare Specialists', 'Marine Services & Logistics']
      }
    ]
  },
  {
    marketSlug: 'uae',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    currencyCode: 'AED',
    currencySymbol: 'AED',
    sprintPrice: '10,000 AED flat',
    cities: [
      {
        slug: 'dubai-downtown',
        name: 'Dubai Downtown',
        region: 'Emirate of Dubai',
        tagline: 'Architectural Opulence for Downtown Dubai & Burj Khalifa Boulevard',
        corridors: ['Burj Khalifa Boulevard', 'Mohammed Bin Rashid Boulevard', 'Dubai Mall Financial Suites', 'Old Town Luxury District', 'Opera District'],
        agencyRate: '25,000 – 60,000 AED + retainers',
        savings: 'Save 15,000+ AED vs Dubai luxury agencies',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: '9:00 AM – 6:00 PM GST Near-Zero Latency Live Desk (Only 1.5h from IST)',
        industries: ['Ultra-Prime Real Estate', 'VIP Lifestyle Concierge', 'Haute Horlogerie & Jewellery', 'Fine Dining & Hospitality', 'Private Family Offices']
      },
      {
        slug: 'difc',
        name: 'DIFC (Dubai International Financial Centre)',
        region: 'Emirate of Dubai',
        tagline: 'Institutional Precision for The Gate Precinct, Gate Village & DIFC South',
        corridors: ['The Gate Building & Precinct', 'Gate Village Luxury & Art Quarter', 'DIFC Innovation Hub', 'Al Fattan Currency House', 'Index Tower'],
        agencyRate: '30,000 – 75,000 AED + retainers',
        savings: 'Save 20,000+ AED vs Gate Village consulting firms',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'Full Working Day Direct WhatsApp Desk (1.5h Time Difference)',
        industries: ['Hedge Funds & Asset Management', 'International Law & Arbitration', 'FinTech & Web3 Venture Labs', 'Corporate Advisory & Audit', 'Art Galleries & Foundations']
      },
      {
        slug: 'dubai-marina',
        name: 'Dubai Marina & JBR',
        region: 'Emirate of Dubai',
        tagline: 'Waterfront Distinction for Dubai Marina Walk, JBR & Bluewaters',
        corridors: ['Marina Walk', 'Jumeirah Beach Residence (JBR)', 'Bluewaters Island', 'Dubai Harbour Yacht Club', 'Princess Tower Corridor'],
        agencyRate: '20,000 – 45,000 AED',
        savings: 'Save 12,000+ AED vs Marina agencies',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'Full Working Day WhatsApp VIP Line',
        industries: ['Luxury Yacht Charters & Brokerage', 'Waterfront Holiday Homes', 'Aesthetic & Wellness Clinics', 'Fine Dining Venues', 'Fitness & Beach Clubs']
      },
      {
        slug: 'business-bay',
        name: 'Business Bay',
        region: 'Emirate of Dubai',
        tagline: 'Commercial Power Along Dubai Water Canal & Marasi Drive',
        corridors: ['Marasi Drive Waterfront', 'Al Sa’ada Street Commercial Corridor', 'The Opus by Zaha Hadid', 'Bay Square', 'Al A’amal Corporate Corridor'],
        agencyRate: '18,000 – 40,000 AED',
        savings: 'Save 10,000+ AED vs Business Bay agencies',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'Full Working Day Instant Chat & Live Zoom Handover',
        industries: ['International Import-Export Trading', 'Architectural Design Studios', 'Management Consultancies', 'Commercial Real Estate Brokers', 'Digital Marketing Hubs']
      },
      {
        slug: 'abu-dhabi',
        name: 'Abu Dhabi & ADGM',
        region: 'Emirate of Abu Dhabi',
        tagline: 'Institutional Prestige for Al Maryah Island (ADGM), Reem & Corniche',
        corridors: ['Al Maryah Island (ADGM Financial Centre)', 'Al Reem Island Commercial Belt', 'Corniche Road Luxury Towers', 'Masdar Clean Tech City', 'Khalifa City'],
        agencyRate: '28,000 – 65,000 AED + retainers',
        savings: 'Save 18,000+ AED vs Abu Dhabi agencies',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'Full Working Day Direct Line with Founders Deepak & Geetha',
        industries: ['Sovereign Wealth & Private Capital', 'Government Relations & Defense Advisory', 'Clean Energy & Renewables', 'Industrial Infrastructure', 'Specialized Medical Polyclinics']
      },
      {
        slug: 'palm-jumeirah',
        name: 'Palm Jumeirah',
        region: 'Emirate of Dubai',
        tagline: 'Unmatched Exclusivity for The Crescent, Fronds & Golden Mile',
        corridors: ['The Crescent Luxury Resorts', 'Fronds Signature Villas', 'Golden Mile Commercial Boulevard', 'Nakheel Mall Penthouse Suites', 'The Pointe Corridor'],
        agencyRate: '35,000 – 80,000 AED',
        savings: 'Save 25,000+ AED vs boutique agency rates',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'VIP Priority WhatsApp Desk with 2-Hour Response SLA',
        industries: ['Ultra-Prime Villa Architecture', 'Exclusive Beach Clubs & Resorts', 'Concierge Aesthetic Medicine', 'Supercar & Superyacht Brokerage', 'Private Event Organizers']
      },
      {
        slug: 'jlt',
        name: 'Jumeirah Lakes Towers (JLT)',
        region: 'Emirate of Dubai',
        tagline: 'Entrepreneurial Dynamism for DMCC Free Zone & JLT Clusters',
        corridors: ['Almas Tower Commodities Centre', 'Cluster T & V Tech Belt', 'Cluster C & D Corporate Suites', 'JLT Lake Central Promenade', 'Jumeirah Heights Corridor'],
        agencyRate: '16,000 – 35,000 AED',
        savings: 'Save 8,000+ AED vs DMCC design shops',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'Instant WhatsApp & Slack Communications',
        industries: ['Gold, Diamonds & Commodities Trading', 'Crypto & Blockchain Ventures', 'Recruitment & Talent Headhunting', 'Family Dental & Orthodontic Clinics', 'Corporate Logistics']
      },
      {
        slug: 'al-ain',
        name: 'Al Ain',
        region: 'Emirate of Abu Dhabi',
        tagline: 'Oasis Heritage & Modern Healthcare Architecture for Al Ain',
        corridors: ['Al Ain City Centre', 'Al Jimi Commercial District', 'Al Muwaiji Cultural Corridor', 'Al Maqam University Belt', 'Zakher Commercial Area'],
        agencyRate: '18,000 – 38,000 AED',
        savings: 'Save 10,000+ AED with direct senior engineering',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'Full Working Day Direct Founder Access',
        industries: ['Polyclinics & Specialized Hospitals', 'Higher Education & Academies', 'Agricultural Technology', 'Local Legal Practices', 'Family Business Groups']
      },
      {
        slug: 'sharjah',
        name: 'Sharjah & SRTIP',
        region: 'Emirate of Sharjah',
        tagline: 'Cultural Heritage Meets Modern Innovation in Sharjah & SAIF Zone',
        corridors: ['Sharjah Research Technology & Innovation Park (SRTIP)', 'SAIF Free Zone', 'Al Majaz Waterfront', 'Al Qasimia Commercial Corridor', 'University City Sharjah'],
        agencyRate: '15,000 – 32,000 AED',
        savings: 'Save 7,000+ AED vs Northern Emirates shops',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'Full Working Day Instant Chat & Video Demos',
        industries: ['Publishing & Media City', 'Advanced Research & Tech Parks', 'Industrial & Heavy Manufacturing', 'Logistics & Air Cargo (SAIF)', 'Academic & Training Academies']
      },
      {
        slug: 'ras-al-khaimah',
        name: 'Ras Al Khaimah & Al Marjan',
        region: 'Emirate of Ras Al Khaimah',
        tagline: 'Gaming & Hospitality Frontier on Al Marjan Island & RAKEZ Zones',
        corridors: ['Al Marjan Island Resort Strip', 'RAKEZ Business Zone', 'Al Hamra Village Waterfront', 'Mina Al Arab Marina', 'Ras Al Khaimah Economic Zone'],
        agencyRate: '16,000 – 36,000 AED',
        savings: 'Save 8,000+ AED vs UAE corporate agencies',
        tz: 'Gulf Standard Time (GST)',
        tzCode: 'GST (UTC+4)',
        overlap: 'Full Working Day Dedicated WhatsApp Support',
        industries: ['Integrated Resorts & Hospitality', 'Free Zone Corporate Establishments', 'Maritime & Offshore Engineering', 'Ceramics & Building Materials', 'Luxury Residential Estates']
      }
    ]
  },
  {
    marketSlug: 'sg',
    countryName: 'Singapore',
    flag: '🇸🇬',
    currencyCode: 'SGD',
    currencySymbol: '$',
    sprintPrice: '$3,800 SGD flat',
    cities: [
      {
        slug: 'marina-bay',
        name: 'Marina Bay Financial Centre',
        region: 'Central Singapore',
        tagline: 'Global Financial Precision for MBFC, Marina Bay Sands & Collyer Quay',
        corridors: ['Marina Bay Financial Centre (MBFC)', 'Collyer Quay Financial Belt', 'Marina One Commercial Suites', 'Raffles Quay', 'Shenton Way'],
        agencyRate: '$14,000 – $35,000 SGD',
        savings: 'Save $10,000+ SGD vs Marina Bay agencies',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: '9:00 AM – 5:00 PM SGT Same-Day Direct Sync (Only 2.5h from IST)',
        industries: ['Private Banking & Wealth Management', 'FinTech Unicorns & Web3 Funds', 'International Corporate Law', 'Commodity Trading Houses', 'Family Offices']
      },
      {
        slug: 'raffles-place',
        name: 'Raffles Place',
        region: 'Central Business District',
        tagline: 'Institutional Prestige in the Historic Heart of Singapore CBD',
        corridors: ['One Raffles Place', 'OCBC Centre Corridor', 'Republic Plaza', 'Battery Road Legal Belt', 'UOB Plaza Promenade'],
        agencyRate: '$12,000 – $32,000 SGD',
        savings: 'Save $9,000+ SGD vs CBD agencies',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Live Collaboration Window',
        industries: ['Commercial Litigation & Arbitration', 'Corporate Tax & Assurance', 'Management Consulting', 'Venture Capital', 'Real Estate Investment Trusts (REITs)']
      },
      {
        slug: 'tanjong-pagar',
        name: 'Tanjong Pagar',
        region: 'Downtown Core',
        tagline: 'Tech Scaleup & Architectural Heritage in Guoco Tower & Duxton',
        corridors: ['Guoco Tower Tech Corridor', 'Duxton Hill Boutique Strip', 'Anson Road Commercial Belt', 'Keppel Road Innovation Hub', 'Tras Street Heritage Shophouses'],
        agencyRate: '$11,000 – $28,000 SGD',
        savings: 'Save $8,000+ SGD vs boutique agencies',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Direct WhatsApp & Slack Sync',
        industries: ['SEA Regional Tech Headquarters', 'Boutique Architecture Studios', 'Michelin-Grade Hospitality', 'Creative Marketing Agencies', 'Specialist Medical Spas']
      },
      {
        slug: 'orchard',
        name: 'Orchard & Somerset',
        region: 'Central Singapore',
        tagline: 'High-End Aesthetic Medicine & Luxury Flagships along Orchard Road',
        corridors: ['Paragon Medical Centre', 'Mount Elizabeth Medical Centre', 'Ngee Ann City Luxury Suites', 'Somerset Creative Tech Belt', 'Tanglin Medical Corridor'],
        agencyRate: '$14,000 – $36,000 SGD',
        savings: 'Save $10,000+ SGD vs Orchard medical branding shops',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Priority Concierge Desk',
        industries: ['Aesthetic Medicine & Plastic Surgery', 'Luxury Haute Horlogerie', 'Premier Dermatology & Dental Care', 'Boutique Asset Managers', 'Hospitality & Luxury Travel']
      },
      {
        slug: 'one-north',
        name: 'One-North Innovation District',
        region: 'Queenstown',
        tagline: 'Deep Tech, Biomedical & Media Innovation in Fusionopolis & Biopolis',
        corridors: ['Biopolis Biomedical Precinct', 'Fusionopolis Deep Tech Belt', 'Mediapolis Digital Production Hub', 'LaunchPad @ one-north', 'Ayer Rajah Startup Crescent'],
        agencyRate: '$12,000 – $30,000 SGD',
        savings: 'Save $8,500+ SGD vs tech agencies',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Direct Engineer Access',
        industries: ['Biotechnology & Genomics', 'AI, Deep Tech & Quantum Research', 'Gaming & Digital Media Production', 'IP Law & Tech Commercialization', 'Advanced Robotics']
      },
      {
        slug: 'jurong-east',
        name: 'Jurong East & Lake District',
        region: 'West Region',
        tagline: 'Singapore Second CBD & Industrial Tech Powerhouse in Jurong Gateway',
        corridors: ['Jurong Gateway Commercial Hub', 'International Business Park (IBP)', 'JTC Summit Innovation Centre', 'Westgate Tower Suites', 'Jurong Innovation District (JID)'],
        agencyRate: '$10,000 – $26,000 SGD',
        savings: 'Save $7,000+ SGD vs Singapore agencies',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Synchronous Collaboration',
        industries: ['Advanced Manufacturing & Industry 4.0', 'Supply Chain Engineering', 'Regional Commercial Trade', 'Specialist Medical Polyclinics', 'Green Infrastructure Engineering']
      },
      {
        slug: 'bugis',
        name: 'Bugis & Bras Basah',
        region: 'Downtown Core',
        tagline: 'Arts, Cultural Commerce & Digital Ventures in DUO & South Beach',
        corridors: ['DUO Tower Commercial Suites', 'South Beach Tower Corridor', 'Bras Basah Arts Precinct', 'Middle Road Creative Belt', 'Beach Road Innovation District'],
        agencyRate: '$11,000 – $27,000 SGD',
        savings: 'Save $7,500+ SGD vs downtown shops',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Instant Chat & Video Demos',
        industries: ['Creative Agencies & Brand Consultancies', 'EdTech & Professional Academies', 'Commercial Legal Counsel', 'Boutique Architecture', 'Tech Scaleup Offices']
      },
      {
        slug: 'changi',
        name: 'Changi Business Park',
        region: 'East Region',
        tagline: 'Aviation, Financial Backing & High-Tech Logistics in the Changi Belt',
        corridors: ['Changi Business Park Central', 'Aviation Park Commercial Zone', 'Singapore Expo Tech Suites', 'Changi South Industrial Corridor', 'Loyang Offshore Engineering Hub'],
        agencyRate: '$10,000 – $25,000 SGD',
        savings: 'Save $7,000+ SGD vs East Region agencies',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Active Collaboration',
        industries: ['Global Banking Back-Office & IT', 'Air Cargo & Aerospace Logistics', 'Semiconductor Design & Testing', 'Supply Chain Management', 'Corporate Training Hubs']
      },
      {
        slug: 'woodlands',
        name: 'Woodlands Regional Centre',
        region: 'North Region',
        tagline: 'Northern Agri-Tech, Cross-Border Trade & Industrial Innovation',
        corridors: ['Woodlands Central Commercial Hub', 'Woodlands North Coast Innovation Corridor', 'Senoko Industrial Food Belt', 'Marsiling Biomedical Strip', 'Causeway Trade Gateway'],
        agencyRate: '$9,000 – $22,000 SGD',
        savings: 'Save $6,000+ SGD vs Singapore agencies',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Real-Time Coordination',
        industries: ['Precision Engineering & Automation', 'Cross-Border Supply Chain (SG-MY)', 'Urban Agri-Food & Biotech', 'Manufacturing Services', 'Healthcare Facilities']
      },
      {
        slug: 'novena',
        name: 'Novena Medical Hub',
        region: 'Central Singapore',
        tagline: 'World-Class Healthcare, Specialist Polyclinics & Clinical Research in HealthCity Novena',
        corridors: ['HealthCity Novena Medical Precinct', 'Novena Specialist Center', 'Royal Square Medical Suites', 'Mount Elizabeth Novena Hospital', 'Thomson Medical Belt'],
        agencyRate: '$13,000 – $34,000 SGD',
        savings: 'Save $9,500+ SGD vs specialized medical agencies',
        tz: 'Singapore Standard Time (SGT)',
        tzCode: 'SGT (UTC+8)',
        overlap: 'Full Working Day Dedicated VIP Support',
        industries: ['Specialist Medical Clinics', 'Clinical Research & Trials', 'Dental & Orthodontic Specialists', 'Oncology & Cardiology Practices', 'Healthcare Diagnostic Laboratories']
      }
    ]
  },
  {
    marketSlug: 'de',
    countryName: 'Germany',
    flag: '🇩🇪',
    currencyCode: 'EUR',
    currencySymbol: '€',
    sprintPrice: '€2,600 EUR flat',
    cities: [
      {
        slug: 'frankfurt',
        name: 'Frankfurt am Main',
        region: 'Hesse',
        tagline: 'Financial Capital Rigor for Bankenviertel, Mainzer Landstraße & Westhafen',
        corridors: ['Bankenviertel (Financial District)', 'Mainzer Landstraße', 'Westhafen Waterfront', 'Europaviertel Tech Hub', 'Gateway Gardens Airport City'],
        agencyRate: '€14,000 – €35,000 EUR',
        savings: 'Save €11,000+ EUR vs Frankfurt agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Direct Sync Window',
        industries: ['Banking & Capital Markets', 'FinTech & Regulatory Tech', 'Corporate Law & Notaries', 'Data Centre Infrastructure', 'Asset Management']
      },
      {
        slug: 'munich',
        name: 'Munich',
        region: 'Bavaria',
        tagline: 'High-Tech Engineering & DAX Prestige in Schwabing, Bogenhausen & Garching',
        corridors: ['Brienner Straße Financial Corridor', 'Schwabing Tech District', 'Bogenhausen Medical Suites', 'Garching Research Campus', 'Werksviertel-Mitte Creative Hub'],
        agencyRate: '€16,000 – €40,000 EUR',
        savings: 'Save €13,000+ EUR vs Bavarian agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Live Overlap Window',
        industries: ['Automotive & Aerospace Technology', 'Patent Law & IP Litigation', 'InsurTech & Private Equity', 'Private Surgical & Aesthetic Clinics', 'Industrial IoT']
      },
      {
        slug: 'berlin',
        name: 'Berlin',
        region: 'Berlin',
        tagline: 'Vanguard Aesthetics & Scaleup Velocity in Mitte, Kreuzberg & Charlottenburg',
        corridors: ['Berlin-Mitte Tech Corridor', 'Kreuzberg Creative Hub', 'Potsdamer Platz Corporate Belt', 'Charlottenburg Luxury Quarter', 'Adlershof Technology Park'],
        agencyRate: '€12,000 – €30,000 EUR',
        savings: 'Save €9,000+ EUR vs Berlin design studios',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Active Collaboration',
        industries: ['SaaS Scaleups & Venture Studios', 'Creative Media & Film Tech', 'Boutique Law & Public Affairs', 'Modern Aesthetic Medicine', 'Clean Energy Solutions']
      },
      {
        slug: 'hamburg',
        name: 'Hamburg',
        region: 'Hamburg',
        tagline: 'Maritime Power & Media Prestige in HafenCity, Speicherstadt & Rotherbaum',
        corridors: ['HafenCity Modern Waterfront', 'Speicherstadt Historic Logistics', 'Neuer Wall Luxury Retail', 'Rotherbaum Consular District', 'Altona Creative Quarter'],
        agencyRate: '€13,000 – €32,000 EUR',
        savings: 'Save €10,000+ EUR vs Hamburg agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Live Window',
        industries: ['Maritime Logistics & Trade', 'Aviation Engineering (Airbus)', 'Media Publishing & Ad Agencies', 'Renewable Wind Energy', 'Corporate Commercial Law']
      },
      {
        slug: 'dusseldorf',
        name: 'Düsseldorf',
        region: 'North Rhine-Westphalia',
        tagline: 'Corporate Headquarters & High Fashion in Königsallee & Medienhafen',
        corridors: ['Königsallee ("Kö") Luxury Belt', 'MedienHafen Architectural Showcase', 'Kennedydamm Corporate Corridor', 'Seestern Telecommunications Strip', 'Carlstadt Art & Law District'],
        agencyRate: '€13,000 – €34,000 EUR',
        savings: 'Save €10,000+ EUR vs NRW agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Direct Sync Window',
        industries: ['Telecom & Enterprise Tech', 'Corporate Law & M&A Advisory', 'Fashion & Luxury E-Commerce', 'Private Aesthetic Surgeries', 'Industrial Chemicals Management']
      },
      {
        slug: 'stuttgart',
        name: 'Stuttgart',
        region: 'Baden-Württemberg',
        tagline: 'Precision Engineering & Industrial Mittelstand in Feuerbach, Vaihingen & Degerloch',
        corridors: ['Stuttgart City Centre Commercial Core', 'Vaihingen Technology Park', 'Feuerbach Industrial Engineering Belt', 'Zuffenhausen Automotive Sector', 'Degerloch Medical District'],
        agencyRate: '€14,000 – €35,000 EUR',
        savings: 'Save €11,000+ EUR vs Swabian agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Handover Window',
        industries: ['Precision Automotive & Mobility', 'Industrial Robotics & Automation', 'Specialist Medical Polyclinics', 'Mechanical Engineering Mittelstand', 'Clean Hydrogen Solutions']
      },
      {
        slug: 'cologne',
        name: 'Cologne',
        region: 'North Rhine-Westphalia',
        tagline: 'Digital Media, Trade Fairs & Insurance Giants in Rheinauhafen & Deutz',
        corridors: ['Rheinauhafen Waterfront Architecture', 'Deutz Trade Fair (Koelnmesse) Corridor', 'Mediapark Technology Belt', 'Belgisches Viertel Creative Quarter', 'Kranhaus Financial District'],
        agencyRate: '€11,000 – €28,000 EUR',
        savings: 'Save €8,000+ EUR vs Cologne agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Active Collaboration',
        industries: ['Insurance & Financial Risk', 'Digital Media & Broadcasting', 'Trade Fair & Exhibition Organizers', 'Chemicals & Life Sciences', 'Commercial Legal Counsel']
      },
      {
        slug: 'leipzig',
        name: 'Leipzig',
        region: 'Saxony',
        tagline: 'Logistics Hub & Cultural Innovation in Plagwitz, Graphisches Viertel & Neuseenland',
        corridors: ['Leipzig City Centre Commercial Core', 'Plagwitz Creative & Industrial District', 'Graphisches Viertel Publishing Hub', 'Leipzig/Halle Logistics Belt', 'BioCity Healthcare Campus'],
        agencyRate: '€9,000 – €22,000 EUR',
        savings: 'Save €6,500+ EUR vs Central German agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Collaboration Window',
        industries: ['Air Cargo Logistics & E-Commerce', 'Biomedical & Cell Therapeutics', 'Publishing & Educational Tech', 'Automotive Assembly Infrastructure', 'Boutique Real Estate']
      },
      {
        slug: 'nuremberg',
        name: 'Nuremberg',
        region: 'Bavaria',
        tagline: 'Market Research, Power Electronics & Industrial Heritage in Franconia',
        corridors: ['Nuremberg Central Business District', 'Tillypark Commercial Sector', 'Nordostpark Technology Hub', 'Fürth Innovation Corridor', 'Erlangen MedTech Valley'],
        agencyRate: '€10,000 – €25,000 EUR',
        savings: 'Save €7,500+ EUR vs Bavarian shops',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Daily Collaboration Window',
        industries: ['Medical Technology (MedTech Valley)', 'Power Electronics & Energy Systems', 'Market Intelligence & Research', 'Software & Industrial Automation', 'Logistics Infrastructure']
      },
      {
        slug: 'hanover',
        name: 'Hanover',
        region: 'Lower Saxony',
        tagline: 'Global Industrial Trade Fairs, Insurance & Life Sciences in Lower Saxony',
        corridors: ['Hanover City Centre Commercial Belt', 'Messegelände Trade Fair Grounds', 'Medical Park Hannover', 'List Creative District', 'Herrenhausen Innovation Area'],
        agencyRate: '€9,500 – €24,000 EUR',
        savings: 'Save €7,000+ EUR vs Lower Saxony agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Live Touchpoint Window',
        industries: ['Industrial Automation & Trade Shows', 'Reinsurance & Financial Services', 'Veterinary & Biomedical Research', 'Automotive Systems (Continental)', 'Commercial Property Development']
      }
    ]
  },
  {
    marketSlug: 'ch',
    countryName: 'Switzerland',
    flag: '🇨🇭',
    currencyCode: 'CHF',
    currencySymbol: 'CHF',
    sprintPrice: '2,600 CHF flat',
    cities: [
      {
        slug: 'zurich',
        name: 'Zürich',
        region: 'Canton of Zürich',
        tagline: 'Uncompromising Precision for Paradeplatz, Enge & Zürich West',
        corridors: ['Paradeplatz Financial Centre', 'Zürich West Tech & Design District', 'Enge Private Banking Quarter', 'Seefeld Aesthetic Corridor', 'Glattpark Corporate Belt'],
        agencyRate: '18,000 – 45,000 CHF + retainers',
        savings: 'Save 15,000+ CHF vs Paradeplatz agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Real-Time Handover Window',
        industries: ['Private Banking & Wealth Preservation', 'Swiss FADP Compliant Corporate Law', 'Elite Aesthetic & Longevity Medicine', 'FinTech & Algorithmic Trading', 'Boutique Architecture']
      },
      {
        slug: 'geneva',
        name: 'Geneva',
        region: 'Canton of Geneva',
        tagline: 'Private Banking & International Diplomacy in Rue du Rhône & Champel',
        corridors: ['Rue du Rhône Luxury Financial Strip', 'Champel Medical & Wealth District', 'Quartier des Banques', 'Nations Diplomatic Quarter', 'Plan-les-Ouates Watchmaking Valley'],
        agencyRate: '18,000 – 48,000 CHF',
        savings: 'Save 15,000+ CHF vs Geneva agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Collaboration Window',
        industries: ['Private Wealth & Multi-Family Offices', 'Haute Horlogerie & Luxury Goods', 'International Arbitration & Human Rights', 'Commodity Trading Conglomerates', 'Private Surgical Clinics']
      },
      {
        slug: 'basel',
        name: 'Basel',
        region: 'Canton of Basel-Stadt',
        tagline: 'Life Sciences Capital & Architectural Vanguard in St. Johann & Aeschenplatz',
        corridors: ['Aeschenplatz Financial Corridor', 'Novartis Campus & St. Johann', 'Roche Tower Life Sciences Belt', 'Gundeldingen Creative Hub', 'Dreiländereck Logistics Zone'],
        agencyRate: '16,000 – 40,000 CHF',
        savings: 'Save 13,000+ CHF vs Basel agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Direct Sync Window',
        industries: ['Pharmaceuticals & Biotechnology', 'World-Renowned Architectural Studios', 'Art Logistics & Insurance (Art Basel)', 'Agri-Business & Specialty Chemicals', 'Specialized Medical Consultancies']
      },
      {
        slug: 'lausanne',
        name: 'Lausanne',
        region: 'Canton of Vaud',
        tagline: 'Olympic Headquarters & EPFL Innovation in Ouchy & Flon',
        corridors: ['EPFL Innovation Park', 'Le Flon Creative & Digital District', 'Ouchy Waterfront Corporate Belt', 'Montchoisi Medical Clinic Strip', 'Riponne Commercial Centre'],
        agencyRate: '14,000 – 35,000 CHF',
        savings: 'Save 11,000+ CHF vs Vaud agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Active Collaboration',
        industries: ['Sports Governance & International Federations', 'Deep Tech & Robotics (EPFL)', 'Private Wealth Management', 'Orthopedic & Sports Medicine', 'Luxury Hospitality Management']
      },
      {
        slug: 'bern',
        name: 'Bern',
        region: 'Canton of Bern',
        tagline: 'Federal Capital Gravitas & Precision Engineering in Bundesplatz & Bubenberg',
        corridors: ['Bundesplatz Government Belt', 'Bubenberg Commercial District', 'Inselspital Medical & University Campus', 'Wankdorf Corporate Centre', 'Kirchenfeld Diplomatic Quarter'],
        agencyRate: '14,000 – 34,000 CHF',
        savings: 'Save 11,000+ CHF vs Swiss capital agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Live Overlap Window',
        industries: ['Federal Policy & Public Affairs', 'Medical Technology & Surgery (Inselspital)', 'Precision Telecom & IT', 'Energy & Infrastructure', 'Corporate Commercial Law']
      },
      {
        slug: 'lucerne',
        name: 'Lucerne',
        region: 'Canton of Lucerne',
        tagline: 'Lake Distinction, Tourism Flagships & Wealth Management around Kapellbrücke',
        corridors: ['Schweizerhofquai Luxury Waterfront', 'Pilatusstrasse Commercial Corridor', 'Tribschen Creative & Tech Zone', 'Kriens Commercial Park', 'Haldenstrasse Resort Strip'],
        agencyRate: '12,000 – 30,000 CHF',
        savings: 'Save 9,500+ CHF vs Central Swiss agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Collaboration Window',
        industries: ['Luxury Hospitality & Alpine Lodging', 'Private Wealth Services', 'Specialized Medical & Eye Clinics', 'Prestige Jewellery & Horlogerie', 'Architecture & Timber Construction']
      },
      {
        slug: 'lugano',
        name: 'Lugano',
        region: 'Canton of Ticino',
        tagline: 'Mediterranean Sophistication & Digital Assets in Piazza Riforma & Paradiso',
        corridors: ['Piazza Riforma Financial Core', 'Paradiso Luxury Waterfront Strip', 'Via Nassa Haute Couture Corridor', 'Manno Tech & Innovation Park', 'Pian Scairolo Commercial Zone'],
        agencyRate: '14,000 – 35,000 CHF',
        savings: 'Save 11,000+ CHF vs Ticino agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Direct Sync Window',
        industries: ['Cryptocurrency & Blockchain (Plan ₿)', 'Cross-Border Wealth & Family Offices', 'Luxury Waterfront Living', 'Commodity Trading & Shipping', 'Private Cosmetic & Dental Clinics']
      },
      {
        slug: 'st-gallen',
        name: 'St. Gallen',
        region: 'Canton of St. Gallen',
        tagline: 'Textile Heritage, Management Excellence & MedTech in Neumarkt & HSG Belt',
        corridors: ['Neumarkt Commercial Core', 'University of St. Gallen (HSG) Belt', 'Winkeln Industrial Innovation Park', 'Bleicheli Cultural Sector', 'St. Fiden Corporate Zone'],
        agencyRate: '12,000 – 28,000 CHF',
        savings: 'Save 9,000+ CHF vs Eastern Swiss agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Touchpoint Window',
        industries: ['Management Advisory & Strategy (HSG)', 'Medical Technology & Diagnostics', 'Precision Textiles & Fashion Tech', 'Financial Software & IT', 'Boutique Commercial Law']
      },
      {
        slug: 'zug',
        name: 'Zug (Crypto Valley)',
        region: 'Canton of Zug',
        tagline: 'Global Crypto Valley Capital & Institutional Web3 in Baarerstrasse & Gotthardstrasse',
        corridors: ['Baarerstrasse Blockchain Corridor', 'Gotthardstrasse Commercial Core', 'Alpenstrasse Wealth Management Belt', 'Chamerstrasse Corporate Sector', 'Baar Neuhof Innovation Park'],
        agencyRate: '20,000 – 50,000 CHF',
        savings: 'Save 17,000+ CHF vs Crypto Valley consultancies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Real-Time Collaboration',
        industries: ['Blockchain, Web3 & Crypto Foundations', 'International Commodity Trading', 'Private Equity & Sovereign Capital', 'Tax Advisory & Corporate Relocation', 'High-Tech Manufacturing']
      },
      {
        slug: 'winterthur',
        name: 'Winterthur',
        region: 'Canton of Zürich',
        tagline: 'Industrial Engineering Innovation & ZHAW Research in Neuhegi & Sulzer Areal',
        corridors: ['Sulzer Areal Innovation Hub', 'Neuhegi Tech Commercial Zone', 'Winterthur City Centre Core', 'Grüze Industrial Sector', 'ZHAW University Tech Belt'],
        agencyRate: '12,000 – 28,000 CHF',
        savings: 'Save 9,000+ CHF vs Zürich canton agencies',
        tz: 'Central European Time (CET)',
        tzCode: 'CET (UTC+1)',
        overlap: '9:00 AM – 3:30 PM CET Direct Sync Window',
        industries: ['Machinery & High-Precision Automation', 'InsurTech & Actuarial Consulting', 'Clean Energy Systems', 'Applied Tech Research (ZHAW)', 'Specialist Dental & Medical Clinics']
      }
    ]
  },
  {
    marketSlug: 'ie',
    countryName: 'Ireland',
    flag: '🇮🇪',
    currencyCode: 'EUR',
    currencySymbol: '€',
    sprintPrice: '€2,600 EUR flat',
    cities: [
      {
        slug: 'dublin',
        name: 'Dublin',
        region: 'County Dublin',
        tagline: 'European Silicon Docks & International Finance in Grand Canal & IFSC',
        corridors: ['Silicon Docks (Grand Canal Dock)', 'International Financial Services Centre (IFSC)', 'Fitzwilliam Square Legal Belt', 'Sandyford Business District', 'Ballsbridge Diplomatic Corridor'],
        agencyRate: '€12,000 – €30,000 EUR',
        savings: 'Save €9,000+ EUR vs Dublin agency rates',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST (UTC+0/+1)',
        overlap: '10:00 AM – 3:30 PM GMT Full Direct Handover Window',
        industries: ['EMEA Software Headquarters', 'Aircraft Leasing & Structured Finance', 'Corporate Law & GDPR Advisory', 'Specialist Aesthetic Medicine', 'FinTech & Payment Processing']
      },
      {
        slug: 'cork',
        name: 'Cork',
        region: 'County Cork',
        tagline: 'Life Sciences & Global Tech Hub in City Quarter, Penrose Dock & Ringaskiddy',
        corridors: ['Penrose Dock Commercial Precinct', 'Albert Quay Innovation Belt', 'Ringaskiddy Life Sciences Zone', 'Mahon Technology Park', 'Grand Parade Historic Core'],
        agencyRate: '€9,000 – €22,000 EUR',
        savings: 'Save €6,500+ EUR vs Munster agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Live Touchpoint Window',
        industries: ['Global Biopharmaceuticals', 'Consumer Tech (Apple EMEA HQ)', 'Marine & Renewable Energy', 'Corporate Legal Services', 'Specialized Medical Polyclinics']
      },
      {
        slug: 'galway',
        name: 'Galway',
        region: 'County Galway',
        tagline: 'Global MedTech Capital & Digital Creativity in Parkmore & Eyre Square',
        corridors: ['Parkmore Medical Device Precinct', 'Dangan Innovation Technology Park', 'Eyre Square Commercial Centre', 'Ballybrit Industrial Belt', 'Salthill Boutique Strip'],
        agencyRate: '€8,500 – €20,000 EUR',
        savings: 'Save €6,000+ EUR vs West of Ireland agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Collaboration Window',
        industries: ['Medical Devices & Cardiovascular Tech', 'Digital Gaming & Animation', 'Marine & Environmental Science', 'Heritage & Luxury Hospitality', 'Specialist Surgical Practices']
      },
      {
        slug: 'limerick',
        name: 'Limerick',
        region: 'County Limerick',
        tagline: 'Aviation Leasing, Advanced Manufacturing & National Technology Park in Castletroy',
        corridors: ['National Technology Park (Castletroy)', 'Limerick City Centre Opera Site', 'Raheen Business Park', 'Dock Road Marine Logistics', 'Shannon Free Zone Corridor'],
        agencyRate: '€8,000 – €19,000 EUR',
        savings: 'Save €5,500+ EUR vs Mid-West agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Active Sync Window',
        industries: ['Aviation Finance & Leasing', 'Semiconductor Manufacturing', 'Life Sciences & MedTech', 'Commercial Construction Law', 'Digital Financial Services']
      },
      {
        slug: 'waterford',
        name: 'Waterford',
        region: 'County Waterford',
        tagline: 'Crystal Heritage, MedTech & Pharma in South East Ireland Innovation Belt',
        corridors: ['IDA Waterford Industrial Park', 'Waterford Viking Triangle', 'Belview Port Commercial Zone', 'Butlerstown Technology Park', 'Dunmore Road Medical Strip'],
        agencyRate: '€7,500 – €17,500 EUR',
        savings: 'Save €5,000+ EUR vs regional Irish shops',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Handover Window',
        industries: ['Biopharmaceuticals & Contact Lenses', 'Advanced Engineering & Robotics', 'Maritime Freight & Shipping', 'Luxury Tourism & Crystal Craft', 'Private Practice Clinics']
      },
      {
        slug: 'swords',
        name: 'Swords & Dublin Airport Belt',
        region: 'County Fingal',
        tagline: 'Aviation Hub, Logistics Power & Global Headquarters in Fingal',
        corridors: ['Dublin Airport Central Commercial Hub', 'Airside Business Park', 'Swords Business Campus', 'Turvey Logistics Park', 'Malahide Road Commercial Strip'],
        agencyRate: '€8,500 – €21,000 EUR',
        savings: 'Save €6,000+ EUR vs Dublin regional agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Direct Collaboration Window',
        industries: ['Aviation Logistics & Operations', 'Pharma Supply Chains', 'Corporate Real Estate', 'Specialist Medical Centres', 'Commercial Fleet Systems']
      },
      {
        slug: 'dundalk',
        name: 'Dundalk',
        region: 'County Louth',
        tagline: 'M1 Strategic Corridor Tech & Biologics between Dublin and Belfast',
        corridors: ['M1 Corridor Technology Park', 'Dundalk City Centre Commercial Core', 'Finnabair Business Park', 'Dundalk Port Area', 'Blackrock Boutique Strip'],
        agencyRate: '€7,500 – €18,000 EUR',
        savings: 'Save €5,000+ EUR vs East Coast agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Live Touchpoint Window',
        industries: ['Biopharmaceutical Manufacturing', 'Financial Back-Office Operations', 'Clean Tech & Renewable Energy', 'Cross-Border Commercial Trade', 'Specialty Medical Consultancies']
      },
      {
        slug: 'bray',
        name: 'Bray',
        region: 'County Wicklow',
        tagline: 'Creative Media, Film Studios & Tech Living in South Dublin Gateway',
        corridors: ['Ardmore & Bray Film Studios Hub', 'Boghall Road Industrial Belt', 'Bray Main Street Commercial Core', 'Southern Cross Business Park', 'Seafront Hospitality Promenade'],
        agencyRate: '€8,000 – €19,000 EUR',
        savings: 'Save €5,500+ EUR vs South Dublin studios',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Sync Window',
        industries: ['Film & Media Production', 'Medical Diagnostics & Devices', 'Green Enterprise & Architecture', 'Commercial Legal Practices', 'Health & Wellness Resorts']
      },
      {
        slug: 'navan',
        name: 'Navan',
        region: 'County Meath',
        tagline: 'Heritage Capital, Mining Innovation & AgriTech in the Boyne Valley',
        corridors: ['Navan Town Centre Commercial Belt', 'Mullaghboy Industrial Estate', 'Tara Mines Industrial Complex', 'Kells Road Business Hub', 'Trim Commercial Corridor'],
        agencyRate: '€7,000 – €16,500 EUR',
        savings: 'Save €4,500+ EUR vs regional shops',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Handover Window',
        industries: ['Mining & Resource Technology', 'Agribusiness & Food Processing', 'Corporate Advisory Services', 'Heritage & Cultural Tourism', 'Family Medical Practices']
      },
      {
        slug: 'kilkenny',
        name: 'Kilkenny',
        region: 'County Kilkenny',
        tagline: 'Animation Capital, Artisan Commerce & Financial Services in the Marble City',
        corridors: ['Kilkenny High Street Heritage Core', 'Cillin Hill Agri-Business Hub', 'IDA Purcellsinch Industrial Park', 'Loughboy Commercial Centre', 'Cartoon Saloon Creative Precinct'],
        agencyRate: '€7,500 – €18,000 EUR',
        savings: 'Save €5,000+ EUR vs South East agencies',
        tz: 'Greenwich Mean Time (GMT)',
        tzCode: 'GMT / IST',
        overlap: '10:00 AM – 3:30 PM GMT Collaboration Window',
        industries: ['Global Animation & Digital Art', 'Taxation & Financial Administration', 'Design & Craft E-Commerce', 'Luxury Castle & Boutique Lodging', 'Private Health Clinics']
      }
    ]
  },
  {
    marketSlug: 'nz',
    countryName: 'New Zealand',
    flag: '🇳🇿',
    currencyCode: 'NZD',
    currencySymbol: '$',
    sprintPrice: '$4,500 NZD flat',
    cities: [
      {
        slug: 'auckland',
        name: 'Auckland',
        region: 'Auckland Region',
        tagline: 'Commercial Gateway for Queen Street, Wynyard Quarter & Viaduct Basin',
        corridors: ['Wynyard Quarter Innovation Precinct', 'Queen Street Financial Spine', 'Viaduct Harbour Luxury Waterfront', 'Britomart Commercial Quarter', 'Takapuna Beachside Tech Hub'],
        agencyRate: '$16,000 – $40,000 NZD',
        savings: 'Save $12,000+ NZD vs Auckland agencies',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Morning Handover Window',
        industries: ['FinTech & Enterprise SaaS', 'Commercial Real Estate Law', 'Harley Street-grade Aesthetic Medicine', 'Marine & Superyacht Refit', 'Agri-Export Leadership']
      },
      {
        slug: 'wellington',
        name: 'Wellington',
        region: 'Wellington Region',
        tagline: 'Capital Integrity & Creative Prowess in Lambton Quay, Te Aro & Miramar',
        corridors: ['Lambton Quay ("Golden Mile")', 'Te Aro Creative & Digital Quarter', 'Miramar Film & VFX Precinct', 'The Terrace Government & Legal Belt', 'Thorndon Diplomatic Quarter'],
        agencyRate: '$14,000 – $35,000 NZD',
        savings: 'Save $10,000+ NZD vs Wellington agencies',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Active Touchpoint Window',
        industries: ['VFX, Gaming & Film Technology', 'Public Sector & Government Advisory', 'Clean Energy & Marine Research', 'Boutique Law & Public Policy', 'Coffee & Specialty Roasting']
      },
      {
        slug: 'christchurch',
        name: 'Christchurch',
        region: 'Canterbury',
        tagline: 'High-Tech Aerospace & Modern Rebuild in Central City & Te Matatiki',
        corridors: ['Central City Innovation Precinct', 'Te Matatiki Cultural Sector', 'Wigram Aerospace Hub', 'Hornby Commercial Belt', 'Riccarton Tech Strip'],
        agencyRate: '$12,000 – $30,000 NZD',
        savings: 'Save $8,000+ NZD vs South Island agencies',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Morning Sync Window',
        industries: ['Aerospace & Satellite Systems', 'AgriTech & Precision Farming', 'Earthquake-Resilient Architecture', 'Specialist Medical Polyclinics', 'Heavy Engineering Solutions']
      },
      {
        slug: 'hamilton',
        name: 'Hamilton',
        region: 'Waikato',
        tagline: 'Agri-Business Capital & Ruakura Superhub Innovation in the Waikato',
        corridors: ['Ruakura Superhub Inland Port', 'Hamilton Central Business District', 'Waikato Innovation Park', 'Te Rapa Commercial Strip', 'Frankton Heritage Hub'],
        agencyRate: '$10,000 – $25,000 NZD',
        savings: 'Save $6,500+ NZD vs Waikato agencies',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Touchpoint Window',
        industries: ['Dairy & Agricultural Innovation', 'Supply Chain & Freight Logistics', 'Biotechnology & Animal Health', 'Commercial Property Law', 'Specialty Medical Clinics']
      },
      {
        slug: 'tauranga',
        name: 'Tauranga & Mount Maunganui',
        region: 'Bay of Plenty',
        tagline: 'Fastest-Growing Port City & Coastal Living in Tauranga CBD & The Mount',
        corridors: ['Port of Tauranga Logistics Zone', 'Tauranga CBD Waterfront', 'Mount Maunganui Lifestyle Strip', 'Tauriko Business Estate', 'Papamoa Commercial Corridor'],
        agencyRate: '$11,000 – $26,000 NZD',
        savings: 'Save $7,000+ NZD vs Bay of Plenty agencies',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Collaboration Window',
        industries: ['Port Logistics & Marine Shipping', 'Horticulture (Kiwifruit & Avocados)', 'Luxury Coastal Property Development', 'Cosmetic & Skin Cancer Clinics', 'Clean Energy Tech']
      },
      {
        slug: 'napier-hastings',
        name: 'Napier–Hastings',
        region: 'Hawke’s Bay',
        tagline: 'Art Deco Prestige, Wine Exporters & Food Bowl in Hawke’s Bay',
        corridors: ['Napier Central Art Deco Core', 'Hastings Commercial & Food District', 'Ahuriri Waterfront & Creative Hub', 'Omahu Road Industrial Corridor', 'Havelock North Boutique Village'],
        agencyRate: '$9,000 – $22,000 NZD',
        savings: 'Save $5,500+ NZD vs regional design shops',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Sync Window',
        industries: ['World-Class Viticulture & Winemaking', 'Agri-Food Processing & Cold Storage', 'Art Deco Architecture & Heritage', 'Specialist Medical Consultants', 'Export Logistics']
      },
      {
        slug: 'dunedin',
        name: 'Dunedin',
        region: 'Otago',
        tagline: 'Medical Excellence, Video Games & Heritage in The Octagon & Warehouse Precinct',
        corridors: ['The Octagon Commercial Core', 'Warehouse Precinct Innovation Hub', 'University Medical & Anatomy Campus', 'Port Chalmers Marine Belt', 'North Dunedin Student Tech Area'],
        agencyRate: '$9,500 – $24,000 NZD',
        savings: 'Save $6,000+ NZD vs Southern agencies',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Handover Window',
        industries: ['Video Game Development & Interactive Media', 'Medical Research & Pathology', 'Bio-Informatics & Genetic Tech', 'Heritage Conservation Architecture', 'Commercial Legal Counsel']
      },
      {
        slug: 'queenstown',
        name: 'Queenstown',
        region: 'Otago',
        tagline: 'Ultra-Luxury Alpine Living, Heli-Tourism & Adventure Prestige',
        corridors: ['Queenstown Mall & Lakefront', 'Frankton Innovation & Commercial Flats', 'Arrowtown Historic Village', 'Gibbston Valley Luxury Wine Belt', 'Jacks Point Commercial Village'],
        agencyRate: '$15,000 – $38,000 NZD',
        savings: 'Save $11,000+ NZD vs Queenstown boutique studios',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Active Touchpoint Window',
        industries: ['Ultra-Prime Alpine Real Estate', 'Boutique Heliskiing & Luxury Tourism', 'Aesthetic & Longevity Spas', 'High-End Architectural Studios', 'Specialist Wealth Advisory']
      },
      {
        slug: 'palmerston-north',
        name: 'Palmerston North',
        region: 'Manawatū-Whanganui',
        tagline: 'Agritech Research, Defense & National Logistics in The Square & FoodHQ',
        corridors: ['The Square Central Commercial Core', 'FoodHQ Agriscience Campus', 'Tremaine Avenue Industrial Corridor', 'Linton Defense Corridor', 'Awapuni Health Sector'],
        agencyRate: '$8,500 – $20,000 NZD',
        savings: 'Save $5,000+ NZD vs central regional shops',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Collaboration Window',
        industries: ['Food Science & Agri-Innovation (FoodHQ)', 'National Freight & Distribution', 'Defense Systems Maintenance', 'Specialist Healthcare Providers', 'Commercial Law Practices']
      },
      {
        slug: 'nelson',
        name: 'Nelson',
        region: 'Nelson Region',
        tagline: 'Sun Capital, Ocean Fisheries & Artisan Manufacturing in Trafalgar Street',
        corridors: ['Trafalgar Street Commercial Core', 'Port Nelson Deepwater Wharves', 'Richmond Commercial Growth Area', 'Tahunanui Business District', 'Cawthron Aquaculture Park'],
        agencyRate: '$8,500 – $21,000 NZD',
        savings: 'Save $5,000+ NZD vs Nelson agencies',
        tz: 'New Zealand Standard Time (NZST)',
        tzCode: 'NZST / NZDT',
        overlap: '8:30 AM – 1:30 PM NZST Direct Touchpoints',
        industries: ['Aquaculture & Marine Bio-actives', 'Hops & Craft Brewery Production', 'Forestry & Timber Innovation', 'Luxury Boutique Lodging', 'Private Health Consultancies']
      }
    ]
  }
];

// Generate the TypeScript file with full data
let tsContent = `/* ═══════════════════════════════════════════════════════════════════
   UNCODED HUB — TOP 200 GLOBAL COMMERCIAL CITIES & ECONOMIC CORRIDORS
   20 Global Market Hubs × 10 Premier High-Intent Metros = 200 Hubs
   Auto-generated source with authentic localized corridors, agency
   pricing, timezone overlap windows, and industry specializations.
   ═══════════════════════════════════════════════════════════════════ */

export interface GlobalCity {
  slug: string;
  countrySlug: string;
  cityName: string;
  stateOrRegion: string;
  countryName: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  corridors: string[];
  localAgencyRate: string;
  uncodedHubSprintPrice: string;
  savings: string;
  timezone: string;
  timezoneCode: string;
  overlapHours: string;
  keyIndustries: string[];
}

export const GLOBAL_CITIES_DATA: Record<string, GlobalCity> = {
`;

for (const market of MARKETS_CONFIG) {
  tsContent += `  // ─── ${market.countryName.toUpperCase()} (${market.marketSlug}) ─────────────────────────────\n`;
  for (const city of market.cities) {
    const key = `${market.marketSlug}/${city.slug}`;
    const metaTitle = `${city.name} Web Design Agency — Bespoke React Platforms | Uncoded Hub`;
    const metaDescription = `Senior-engineered React web design for ${city.name} businesses, law firms & medical clinics. ${city.corridors.slice(0, 3).join(', ')}. Contractual 7-day guarantee.`;

    tsContent += `  '${key}': {
    slug: '${city.slug}',
    countrySlug: '${market.marketSlug}',
    cityName: '${city.name}',
    stateOrRegion: '${city.region}',
    countryName: '${market.countryName}',
    flag: '${market.flag}',
    currencyCode: '${market.currencyCode}',
    currencySymbol: '${market.currencySymbol}',
    metaTitle: '${metaTitle.replace(/'/g, "\\'")}',
    metaDescription: '${metaDescription.replace(/'/g, "\\'")}',
    heroTagline: '${city.tagline.replace(/'/g, "\\'")}',
    corridors: ${JSON.stringify(city.corridors)},
    localAgencyRate: '${city.agencyRate}',
    uncodedHubSprintPrice: '${market.sprintPrice}',
    savings: '${city.savings}',
    timezone: '${city.tz}',
    timezoneCode: '${city.tzCode}',
    overlapHours: '${city.overlap}',
    keyIndustries: ${JSON.stringify(city.industries)},
  },\n`;
  }
}

// Append remaining markets dynamically if not in MARKETS_CONFIG
// Markets to complete: qa, sa, kw, bh, nl, se, no, dk, za, my
const REMAINING_MARKETS = [
  {
    marketSlug: 'qa', countryName: 'Qatar', flag: '🇶🇦', currencyCode: 'QAR', currencySymbol: 'QAR', sprintPrice: '10,000 QAR flat',
    cities: [
      { slug: 'west-bay', name: 'Doha West Bay', region: 'Doha', corridors: ['West Bay Financial Towers', 'Diplomatic Area', 'Al Corniche Waterfront', 'Dafna Commercial Belt', 'City Center Towers'] },
      { slug: 'lusail', name: 'Lusail City', region: 'Lusail', corridors: ['Lusail Marina Promenade', 'Lusail Plaza Towers', 'Qetaifan Island North', 'Fox Hills Residential', 'Energy City Qatar'] },
      { slug: 'the-pearl', name: 'The Pearl-Qatar', region: 'The Pearl', corridors: ['Porto Arabia Marina', 'Qanat Quartier', 'Medina Centrale', 'Viva Bahriya Beachfront', 'Perlita Gardens'] },
      { slug: 'msheireb', name: 'Msheireb Downtown Doha', region: 'Doha', corridors: ['Sikkat Al Wadi', 'Barahat Msheireb', 'Heritage Quarter', 'Al Kahraba Street', 'Sahat Al Nakheel'] },
      { slug: 'al-sadd', name: 'Al Sadd', region: 'Doha', corridors: ['Al Sadd Commercial Street', 'Suhaim Bin Hamad Corridor', 'Hamad Hospital Medical Belt', 'Al Mirqab Al Jadeed', 'Jawaan Metro Hub'] },
      { slug: 'al-wakrah', name: 'Al Wakrah', region: 'Al Wakrah', corridors: ['Al Wakrah Heritage Souq', 'Hamad Port Logistics Hub', 'Al Janoub Stadium Belt', 'Ooredoo Smart City', 'Al Meshaf Commercial Zone'] },
      { slug: 'education-city', name: 'Education City & Al Rayyan', region: 'Al Rayyan', corridors: ['Qatar Foundation Research Belt', 'QSTP Tech Innovation Park', 'Sidra Medicine Corridor', 'Al Rayyan Commercial Complex', 'Doha Festival City Belt'] },
      { slug: 'al-khor', name: 'Al Khor', region: 'Al Khor', corridors: ['Ras Laffan LNG Support Belt', 'Al Khor Corniche', 'Al Bayt Stadium Corridor', 'Simaisma Resort Strip', 'North Oil Support Zone'] },
      { slug: 'old-airport', name: 'Old Airport Corridor', region: 'Doha', corridors: ['Al Matar Al Qadeem Street', 'D-Ring Corporate Road', 'Najma Commercial Hub', 'Al Mansoura Medical Belt', 'Hilal Commercial Sector'] },
      { slug: 'qatar-economic-zones', name: 'Ras Bufontas (Manateq)', region: 'Al Wakrah', corridors: ['Ras Bufontas Free Zone', 'Um Alhoul Port Logistics Zone', 'Airport Cargo City', 'Al Karaana Industrial Park', 'Birkat Al Awamer'] }
    ]
  },
  {
    marketSlug: 'sa', countryName: 'Saudi Arabia', flag: '🇸🇦', currencyCode: 'SAR', currencySymbol: 'SAR', sprintPrice: '10,500 SAR flat',
    cities: [
      { slug: 'riyadh-kafd', name: 'Riyadh (KAFD & Olaya)', region: 'Riyadh Province', corridors: ['King Abdullah Financial District (KAFD)', 'Olaya Commercial Strip', 'King Fahd Road', 'Digital City (ITCC)', 'Al Takhassusi Medical Belt'] },
      { slug: 'jeddah', name: 'Jeddah', region: 'Makkah Province', corridors: ['Jeddah Corniche Waterfront', 'Al Andalus Diplomatic Strip', 'King Abdulaziz Road', 'Al Tahlia Luxury District', 'Obhur Waterfront Living'] },
      { slug: 'khobar', name: 'Al Khobar', region: 'Eastern Province', corridors: ['Khobar Corniche Commercial Belt', 'Prince Turki Street', 'Al Rakah Tech Sector', 'King Fahd Causeway Gateway', 'Al Yarmouk Corporate Strip'] },
      { slug: 'dammam', name: 'Dammam', region: 'Eastern Province', corridors: ['King Abdulaziz Seaport Logistics Hub', 'First Industrial City', 'Dammam Waterfront Promenade', 'Al Faisaliyah Commercial Zone', 'Khalidia Business Belt'] },
      { slug: 'dhahran', name: 'Dhahran', region: 'Eastern Province', corridors: ['Aramco Innovation Park', 'KFUPM Techno-Valley', 'Dhahran Hills Commercial Strip', 'King Abdulaziz Center (Ithra)', 'Midra Corporate Complex'] },
      { slug: 'mecca', name: 'Mecca', region: 'Makkah Province', corridors: ['Jabal Omar Commercial Complex', 'Abraj Al Bait Towers', 'Al Aziziyah Commercial Hub', 'Al Naseem Medical Belt', 'King Abdulaziz Road (Masar)'] },
      { slug: 'medina', name: 'Medina', region: 'Medina Province', corridors: ['Knowledge Economic City (KEC)', 'Central Haram Area', 'Sultana Commercial Street', 'King Fahd Road Industrial Hub', 'Prince Nayef Corporate Belt'] },
      { slug: 'jubail', name: 'Jubail Industrial City', region: 'Eastern Province', corridors: ['Jubail Industrial City Center', 'Jubail Commercial Port', 'Royal Commission Business Area', 'Sadara Industrial Corridor', 'Al Fanateer Seafront'] },
      { slug: 'neom', name: 'NEOM & Tabuk', region: 'Tabuk Province', corridors: ['NEOM Innovation Hub', 'The Line Operations Zone', 'Oxagon Clean Industrial Port', 'Trojena Alpine Logistics', 'Tabuk City Commercial Core'] },
      { slug: 'yanbu', name: 'Yanbu Industrial City', region: 'Al Madinah Province', corridors: ['Royal Commission Yanbu Industrial', 'Yanbu Port Waterfront', 'Al Sinaiyah Commercial Sector', 'Al Bahr Resort Corridor', 'Al Nakheel Business Belt'] }
    ]
  },
  {
    marketSlug: 'kw', countryName: 'Kuwait', flag: '🇰🇼', currencyCode: 'KWD', currencySymbol: 'KWD', sprintPrice: '850 KWD flat',
    cities: [
      { slug: 'kuwait-city', name: 'Kuwait City (Sharq)', region: 'Al Asimah', corridors: ['Sharq Financial District', 'Al Hamra Tower Corridor', 'KIPCO Commercial Precinct', 'Mirqab Business Quarter', 'Ahmed Al Jaber Street'] },
      { slug: 'salmiya', name: 'Salmiya', region: 'Hawalli', corridors: ['Salem Al Mubarak Luxury Strip', 'Gulf Road Waterfront', 'Marina Mall Complex', 'Baghdad Street Commercial Hub', 'Hamad Al Mubarak Corridor'] },
      { slug: 'hawally', name: 'Hawally', region: 'Hawalli', corridors: ['Tunis Street Commercial Hub', 'Beirut Street IT Center', 'Ibn Khaldoun Tech Market', 'Othman Street Retail', 'Hawally Park Corridor'] },
      { slug: 'shuwaikh', name: 'Shuwaikh Industrial & Creative', region: 'Al Asimah', corridors: ['Shuwaikh Creative Design District', 'Shuwaikh Port Logistics', 'Canada Dry Street', 'Industrial Area 1 Commercial', 'Warehouse Hub'] },
      { slug: 'al-ahmadi', name: 'Al Ahmadi', region: 'Al Ahmadi', corridors: ['KOC Oil Sector Headquarters', 'Ahmadi Park Corridor', 'East Ahmadi Industrial', 'South Ahmadi Commercial Belt', 'Ahmadi Gateway'] },
      { slug: 'farwaniya', name: 'Farwaniya', region: 'Farwaniya', corridors: ['Farwaniya Commercial Spine', 'Habib Al Munawer Street', 'Kuwait Airport Free Zone', 'Ghazali Expressway Corridor', 'Dajeej Furniture & Design Market'] },
      { slug: 'sabah-al-salem', name: 'Sabah Al Salem', region: 'Mubarak Al-Kabeer', corridors: ['Sabah Al Salem Clinic Strip', 'Fahaheel Expressway Commercial', 'Block 1 Corporate Towers', 'Block 2 Medical Centers', 'Messila Resort Strip'] },
      { slug: 'fahaheel', name: 'Fahaheel', region: 'Al Ahmadi', corridors: ['Al Kout Mall Marina Waterfront', 'Dabbous Street Commercial Hub', 'Fahaheel Bazaar District', 'Makka Street Retail', 'Coastal Commercial Highway'] },
      { slug: 'egaila', name: 'Egaila', region: 'Al Ahmadi', corridors: ['Arabella Luxury Dining Strip', 'Gate Mall Commercial Complex', 'Liwan Mall Area', 'Egaila University Belt', 'Bidaa Resort Corridor'] },
      { slug: 'dasman', name: 'Dasman & Bneid Al Qar', region: 'Al Asimah', corridors: ['Dasman Diabetes Medical Institute', 'Arabian Gulf Street Towers', 'Bneid Al Qar Clinic Belt', 'Sawaber Commercial Area', 'Kuwait Towers Waterfront'] }
    ]
  },
  {
    marketSlug: 'bh', countryName: 'Bahrain', flag: '🇧🇭', currencyCode: 'BHD', currencySymbol: 'BHD', sprintPrice: '1,050 BHD flat',
    cities: [
      { slug: 'manama-financial-harbour', name: 'Bahrain Financial Harbour', region: 'Capital Governorate', corridors: ['Financial Centre Towers', 'Harbour Gate Fintech Bay', 'King Faisal Highway', 'Reef Island Luxury Belt', 'Diplomatic Area Extension'] },
      { slug: 'seef', name: 'Seef District', region: 'Capital Governorate', corridors: ['Seef Mall Commercial Strip', 'Almoayyed Tower Complex', 'Ritz-Carlton Luxury Waterfront', 'City Centre Bahrain Corridor', 'Ahli United Bank HQ'] },
      { slug: 'diplomatic-area', name: 'Diplomatic Area', region: 'Capital Governorate', corridors: ['Government Avenue', 'Ministry of Foreign Affairs Corridor', 'Embassy Row', 'Commercial Bank Hub', 'GOSI Complex'] },
      { slug: 'amwaj-islands', name: 'Amwaj Islands', region: 'Muharraq Governorate', corridors: ['The Lagoon Waterway', 'Tala Island Luxury Villas', 'Amwaj Marina Promenade', 'Floating City Corridor', 'Dragon City Area'] },
      { slug: 'riffa', name: 'Riffa', region: 'Southern Governorate', corridors: ['Riffa Views Golf Estate', 'Bukuwarah Commercial Street', 'East Riffa Historic Strip', 'Hunainiyah Valley Corridor', 'Royal Court Boulevard'] },
      { slug: 'juffair', name: 'Juffair', region: 'Capital Governorate', corridors: ['Al Shabab Road (American Alley)', 'Juffair Mall Commercial Zone', 'Grand Mosque Boulevard', 'Navy Base Support Corridor', 'Mina Salman Port Link'] },
      { slug: 'saar', name: 'Saar & Janabiyah', region: 'Northern Governorate', corridors: ['Saar Mall Commercial Hub', 'Janabiyah Highway Strip', 'King Fahd Causeway Gateway', 'Saar Avenue Private Estates', 'Mercado Mall Area'] },
      { slug: 'bahrain-bay', name: 'Bahrain Bay', region: 'Capital Governorate', corridors: ['Four Seasons Bay Promenade', 'Wyndham Grand Tower', 'Waterbay Waterfront', 'Arcapita Headquarters', 'Bay City Promenade'] },
      { slug: 'muharraq', name: 'Muharraq Historic & Airport', region: 'Muharraq Governorate', corridors: ['Bahrain International Airport Cargo', 'Pearling Path Cultural Strip', 'Al Qaysariyah Souq', 'Arad Fort Commercial Area', 'Hidd Industrial Extension'] },
      { slug: 'hidd', name: 'Hidd (BIIP & Port)', region: 'Muharraq Governorate', corridors: ['Bahrain International Investment Park (BIIP)', 'Khalifa Bin Salman Port', 'Hidd Industrial Area', 'Dry Dock Highway (ASRY)', 'Al Hidd Waterfront'] }
    ]
  },
  {
    marketSlug: 'nl', countryName: 'Netherlands', flag: '🇳🇱', currencyCode: 'EUR', currencySymbol: '€', sprintPrice: '€2,600 EUR flat',
    cities: [
      { slug: 'amsterdam', name: 'Amsterdam (Zuidas)', region: 'North Holland', corridors: ['Zuidas ("Financial Mile")', 'Canal Ring Heritage Core', 'Amsterdam Noord Tech Hub', 'Oosterdokseiland Innovation Area', 'Sloterdijk Business Park'] },
      { slug: 'rotterdam', name: 'Rotterdam', region: 'South Holland', corridors: ['Kop van Zuid Architectural Waterfront', 'Port of Rotterdam Logistics Belt', 'Coolsingel Commercial Core', 'Erasmus Medical Centre Belt', 'RDM Innovation Dock'] },
      { slug: 'the-hague', name: 'The Hague (Den Haag)', region: 'South Holland', corridors: ['Bezuidenhout Government Quarter', 'World Forum Peace & Justice Hub', 'Scheveningen Coastal Strip', 'Beatrixkwartier Commercial Belt', 'Binckhorst Innovation Area'] },
      { slug: 'utrecht', name: 'Utrecht', region: 'Utrecht', corridors: ['Utrecht Science Park (De Uithof)', 'Station Area (Hoog Catharijne)', 'Papendorp Business Park', 'Leidsche Rijn Innovation Belt', 'Oudegracht Historic Center'] },
      { slug: 'eindhoven', name: 'Eindhoven (Brainport)', region: 'North Brabant', corridors: ['High Tech Campus Eindhoven', 'Strijp-S Creative & Tech Quarter', 'Brainport Industries Campus', 'Eindhoven Central Tech Spine', 'TU/e Science Park'] },
      { slug: 'tilburg', name: 'Tilburg', region: 'North Brabant', corridors: ['Spoorzone Creative & Tech Strip', 'Kraaiven Industrial Hub', 'Loven Logistics Park', 'Tilburg University Campus', 'Heuvel Commercial Core'] },
      { slug: 'groningen', name: 'Groningen', region: 'Groningen', corridors: ['Zernike Science & Tech Campus', 'Eemsgaster Clean Energy Hub', 'Groningen City Centre', 'Europapark Business Strip', 'UMCG Biomedical Precinct'] },
      { slug: 'almere', name: 'Almere', region: 'Flevoland', corridors: ['Almere Centrum Commercial Core', 'Gooisekant Business Park', 'De Vaart Industrial Zone', 'Almere Poort Tech Strip', 'Floriade Innovation Area'] },
      { slug: 'breda', name: 'Breda', region: 'North Brabant', corridors: ['Spoorzone Breda', 'Breda Airport Business Park', 'Chassé Park Corporate Area', 'Minervum Commercial Centre', 'Grote Markt Heritage Core'] },
      { slug: 'haarlem', name: 'Haarlem', region: 'North Holland', corridors: ['Waarderpolder Business & Tech Park', 'Grote Houtstraat Commercial Strip', 'Station Area Innovation Hub', 'Oude Gracht Heritage Zone', 'Schalkwijk Modernization Centre'] }
    ]
  },
  {
    marketSlug: 'se', countryName: 'Sweden', flag: '🇸🇪', currencyCode: 'SEK', currencySymbol: 'kr', sprintPrice: '30,000 SEK flat',
    cities: [
      { slug: 'stockholm', name: 'Stockholm (Kista & Norrmalm)', region: 'Stockholm County', corridors: ['Kista Science City (Telecom)', 'Norrmalm Financial Heart', 'Östermalm Luxury District', 'Södermalm Tech Scaleup Hub', 'Slussen Regeneration Area'] },
      { slug: 'gothenburg', name: 'Gothenburg (Göteborg)', region: 'Västra Götaland', corridors: ['Lindholmen Science Park', 'Johanneberg Science Park (Chalmers)', 'Central Station Business Quarter', 'Arendal Automotive & Maritime Hub', 'Hisingen Industrial Belt'] },
      { slug: 'malmo', name: 'Malmö', region: 'Skåne', corridors: ['Västra Hamnen (Western Harbour)', 'Hyllie Innovation & Öresund Gateway', 'Universitetsholmen Commercial Strip', 'Triangeln Downtown Core', 'Möllevången Creative Sector'] },
      { slug: 'uppsala', name: 'Uppsala', region: 'Uppsala County', corridors: ['Uppsala Science Park', 'Uppsala Business Park (Pharma)', 'Fyrislund Commercial Belt', 'University Historic Campus', 'Central Station Innovation District'] },
      { slug: 'linkoping', name: 'Linköping', region: 'Östergötland', corridors: ['Mjärdevi Science Park', 'Saab Aerospace Industrial Zone', 'Linköping University Tech Campus', 'City Centre Commercial Core', 'Tornby Commercial Area'] },
      { slug: 'vasteras', name: 'Västerås', region: 'Västmanland', corridors: ['Finnslätten Power Tech Industrial Hub', 'Kopparlunden Creative District', 'Västerås Central Waterfront', 'Hälla Commercial Center', 'Mälardalen University Area'] },
      { slug: 'orebro', name: 'Örebro', region: 'Örebro County', corridors: ['Aspholmen Business Area', 'Örebro University Health Campus', 'City Centre Castle Commercial', 'Bettorp Industrial Logistics', 'Marieberg Commercial District'] },
      { slug: 'helsingborg', name: 'Helsingborg', region: 'Skåne', corridors: ['Oceanhamnen Waterfront Innovation', 'Berga Industrial Logistics Park', 'Campus Helsingborg (Lund Univ)', 'Drottninggatan Commercial Strip', 'Port of Helsingborg Shipping'] },
      { slug: 'jonkoping', name: 'Jönköping', region: 'Jönköping County', corridors: ['Torsvik Nordic Logistics Superhub', 'Science Park Jönköping', 'Jönköping University Belt', 'Västra Centrum Commercial', 'Asecs Shopping Commercial Zone'] },
      { slug: 'lund', name: 'Lund', region: 'Skåne', corridors: ['Ideon Science Park', 'Medicon Village Life Sciences', 'MAX IV & ESS Synchrotron Hub', 'Lund University Research Precinct', 'Bantorget Commercial Core'] }
    ]
  },
  {
    marketSlug: 'no', countryName: 'Norway', flag: '🇳🇴', currencyCode: 'NOK', currencySymbol: 'kr', sprintPrice: '30,000 NOK flat',
    cities: [
      { slug: 'oslo', name: 'Oslo (Aker Brygge & Barcode)', region: 'Oslo', corridors: ['Aker Brygge Waterfront', 'Barcode Project (Bjørvika)', 'Kvadraturen Financial Core', 'Fornebu Telecom & Oil Park', 'Forskningsparken (Oslo Science Park)'] },
      { slug: 'bergen', name: 'Bergen', region: 'Vestland', corridors: ['Marineholmen Science Park', 'Bryggen Historic Waterfront', 'Sandsli & Kokstad Energy Corridor', 'Nygårdstangen Commercial Hub', 'Fyllingsdalen Tech Strip'] },
      { slug: 'stavanger', name: 'Stavanger', region: 'Rogaland', corridors: ['Forus Business Park (Energy Capital)', 'Stavanger Sentrum Waterfront', 'Jåttåvågen Innovation District', 'Dusavik Offshore Supply Base', 'Risavika Energy Port'] },
      { slug: 'trondheim', name: 'Trondheim', region: 'Trøndelag', corridors: ['Sluppen Tech City', 'NTNU Gløshaugen Tech Campus', 'SINTEF Energy Laboratories', 'Brattøra Waterfront Business Park', 'Solsiden Creative Hub'] },
      { slug: 'drammen', name: 'Drammen', region: 'Viken', corridors: ['Strømsø Innovation District', 'Bragernes Commercial Square', 'Drammen Port Logistics Area', 'Holmen Paper & Tech Quarter', 'Åssiden Business Park'] },
      { slug: 'fredrikstad', name: 'Fredrikstad & Sarpsborg', region: 'Viken', corridors: ['Gamlebyen Heritage Tech Area', 'Værste Innovation Park', 'Øra Industrial & Port Zone', 'Sarpsborg Borregaard Bio-refinery', 'Glemmen Commercial Strip'] },
      { slug: 'kristiansand', name: 'Kristiansand', region: 'Agder', corridors: ['Node Offshore Drilling Cluster', 'Sørlandsparken Business Hub', 'Kvadraturen City Core', 'Kystbyen Maritime District', 'UiA University Campus'] },
      { slug: 'sandnes', name: 'Sandnes', region: 'Rogaland', corridors: ['Vågen Waterfront Promenade', 'Forus South Industrial Area', 'Lura Commercial Belt', 'Ganddal Freight & Logistics Terminal', 'Sentrum Commercial Strip'] },
      { slug: 'tromso', name: 'Tromsø', region: 'Troms og Finnmark', corridors: ['Breivika Science Park & University Hospital', 'Tromsø Havn Logistics Base', 'Storgata Commercial Spine', 'Kystens Hus Marine Hub', 'Prostneset Harbor Terminal'] },
      { slug: 'alesund', name: 'Ålesund', region: 'Møre og Romsdal', corridors: ['NMEC Maritime Blue Innovation Park', 'Ålesund Art Nouveau Core', 'Giske Ocean Fisheries Complex', 'Breivika Industrial Zone', 'Moa Commercial Area'] }
    ]
  },
  {
    marketSlug: 'dk', countryName: 'Denmark', flag: '🇩🇰', currencyCode: 'DKK', currencySymbol: 'kr', sprintPrice: '20,000 DKK flat',
    cities: [
      { slug: 'copenhagen', name: 'Copenhagen', region: 'Capital Region', corridors: ['Nordhavn Sustainable Waterfront', 'Indre By Financial Heart', 'Kalvebod Brygge Corporate Strip', 'Ørestad Innovation Corridor', 'Vesterbro Creative & Tech Belt'] },
      { slug: 'aarhus', name: 'Aarhus', region: 'Central Denmark', corridors: ['Aarhus Ø Modern Waterfront', 'Aarhus Docklands (DOKK1)', 'Katrinebjerg IT-City', 'Agro Food Park Skejby', 'Strøget Commercial Core'] },
      { slug: 'odense', name: 'Odense', region: 'Funen', corridors: ['Odense Robotics Innovation Hub', 'UAS Denmark Drone Test Center', 'Cortex Park (SDU Campus)', 'H.C. Andersen Historic Core', 'Tietgenbyen Business Park'] },
      { slug: 'aalborg', name: 'Aalborg', region: 'North Denmark', corridors: ['NOVI Science Park', 'Aalborg Waterfront (Utzon Center)', 'Aalborg Port Logistics Complex', 'City Centre Bispensgade', 'Boulevarden Corporate Quarter'] },
      { slug: 'esbjerg', name: 'Esbjerg', region: 'South Denmark', corridors: ['Port of Esbjerg (Offshore Wind Capital)', 'Torvet Commercial Square', 'Kjersing Business Park', 'Esbjerg Oil & Gas Center', 'AAU Esbjerg Campus'] },
      { slug: 'randers', name: 'Randers', region: 'Central Denmark', corridors: ['Randers Port Industrial Hub', 'Dronningborg Business District', 'City Centre Medieval Core', 'Sdr. Borup Logistics Area', 'Romalt Commercial Park'] },
      { slug: 'kolding', name: 'Kolding', region: 'South Denmark', corridors: ['Design City Kolding', 'Kolding Harbour Logistics', 'Sydvestjysk Commercial Core', 'Albuen Business Park', 'Kolding University Campus'] },
      { slug: 'horsens', name: 'Horsens', region: 'Central Denmark', corridors: ['Horsens City Centre Core', 'Vega Business Park', 'Horsens Harbour Regeneration', 'VIA University Campus', 'Sydkajen Marine Area'] },
      { slug: 'vejle', name: 'Vejle', region: 'South Denmark', corridors: ['Vejle Fjord Waterfront (Fjordenhus)', 'Havneøen Commercial Complex', 'Vejle C Gågaden Strip', 'Dandy Business Park (AI & Food)', 'Vinding Industrial Park'] },
      { slug: 'roskilde', name: 'Roskilde', region: 'Zealand', corridors: ['DTU Risø Clean Energy Campus', 'Roskilde City Centre Algade', 'Musicon Creative Suburb', 'Køgevej Commercial Corridor', 'Trekroner University Tech Strip'] }
    ]
  },
  {
    marketSlug: 'za', countryName: 'South Africa', flag: '🇿🇦', currencyCode: 'ZAR', currencySymbol: 'R', sprintPrice: '45,000 ZAR flat',
    cities: [
      { slug: 'johannesburg-sandton', name: 'Johannesburg (Sandton)', region: 'Gauteng', corridors: ['Sandton CBD ("Richest Square Mile")', 'Rosebank Commercial Strip', 'Melrose Arch Lifestyle Precinct', 'Illovo Financial Boulevard', 'Bryanston Tech Belt'] },
      { slug: 'cape-town', name: 'Cape Town (City Bowl & V&A)', region: 'Western Cape', corridors: ['V&A Waterfront Marina & Silo District', 'Foreshore Financial District', 'Bree Street Creative Strip', 'Woodstock Design Hub', 'Century City Tech Park'] },
      { slug: 'durban-umhlanga', name: 'Durban & Umhlanga', region: 'KwaZulu-Natal', corridors: ['Umhlanga Ridge Commercial Precinct', 'Durban Point Waterfront Development', 'Morningside Professional District', 'La Lucia Ridge Office Estate', 'Durban Harbour Port Logistics'] },
      { slug: 'pretoria', name: 'Pretoria', region: 'Gauteng', corridors: ['Menlyn Maine Green City', 'Hatfield Diplomatic Strip', 'Brooklyn Corporate Quarter', 'Pretoria Central CBD', 'Silver Lakes Commercial District'] },
      { slug: 'stellenbosch', name: 'Stellenbosch', region: 'Western Cape', corridors: ['Techno Park Innovation Hub', 'Dorp Street Heritage Core', 'Stellenbosch University Tech Corridor', 'Devon Valley Wine Estates', 'Blaauwklippen Commercial Area'] },
      { slug: 'centurion', name: 'Centurion', region: 'Gauteng', corridors: ['Centurion Central Business District', 'Highveld Techno Park', 'Route 21 Corporate Park', 'Irene Farm Village Commercial', 'Eco Park Estate Tech Hub'] },
      { slug: 'umhlanga', name: 'Umhlanga Rocks', region: 'KwaZulu-Natal', corridors: ['Umhlanga Oceans Strip', 'Gateway Theatre of Shopping Hub', 'Ridgeside Corporate Office Estate', 'Armstrong Avenue Medical Mile', 'Cornubia Multi-Use Industrial Zone'] },
      { slug: 'gqeberha', name: 'Gqeberha (Port Elizabeth)', region: 'Eastern Cape', corridors: ['Coega Special Economic Zone (SEZ)', 'Walmer Commercial Corridor', 'Humewood Beachfront Precinct', 'Newton Park Business Hub', 'Perseverance Industrial Zone'] },
      { slug: 'bloemfontein', name: 'Bloemfontein', region: 'Free State', corridors: ['Westdene Commercial Quarter', 'Preller Square Professional Hub', 'Free State University Medical Campus', 'Zastron Street Corporate Spine', 'Brandwag Commercial Centre'] },
      { slug: 'midrand', name: 'Midrand (Waterfall City)', region: 'Gauteng', corridors: ['Waterfall City Commercial Core', 'Gallagher Convention District', 'Kyalami Business Park', 'Grand Central Airport Zone', 'Halfway House Corporate Strip'] }
    ]
  },
  {
    marketSlug: 'my', countryName: 'Malaysia', flag: '🇲🇾', currencyCode: 'MYR', currencySymbol: 'RM', sprintPrice: '10,000 MYR flat',
    cities: [
      { slug: 'kuala-lumpur', name: 'Kuala Lumpur (KLCC & TRX)', region: 'Federal Territory of Kuala Lumpur', corridors: ['Tun Razak Exchange (TRX Financial Hub)', 'KLCC Twin Towers Commercial Spine', 'Bangsar South MSC Cybercentre', 'Bukit Bintang Luxury Shopping Belt', 'Damansara Heights Financial Suites'] },
      { slug: 'penang', name: 'Penang (George Town & Bayan Lepas)', region: 'Penang', corridors: ['Bayan Lepas Free Industrial Zone ("Silicon Valley of the East")', 'George Town UNESCO Heritage & Tech Hub', 'Gurney Drive Luxury Promenade', 'Batu Kawan Industrial Park', 'Tanjung Tokong Commercial District'] },
      { slug: 'johor-bahru', name: 'Johor Bahru & Iskandar', region: 'Johor', corridors: ['Iskandar Puteri Commercial Hub', 'Medini Smart Financial City', 'JB Sentral & RTS Link Gateway', 'Tebrau Growth Corridor', 'Danga Bay Waterfront Precinct'] },
      { slug: 'petaling-jaya', name: 'Petaling Jaya', region: 'Selangor', corridors: ['Damansara Uptown Financial Hub', 'Bandar Utama Technology Belt', 'SS2 Commercial District', 'Section 14 Corporate Hub', 'Ara Damansara Commercial Center'] },
      { slug: 'cyberjaya', name: 'Cyberjaya', region: 'Selangor', corridors: ['Cyberjaya Technology & AI Hub', 'Shaftsbury Square Commercial Core', 'Centrus Mall Digital Zone', 'Multimedia University Research Corridor', 'Cyber 10 Data Centre Park'] },
      { slug: 'subang-jaya', name: 'Subang Jaya', region: 'Selangor', corridors: ['Subang Hi-Tech Industrial Park', 'SS15 Commercial Education Strip', 'Sunway City Innovation Precinct', 'Empire Subang Corporate Towers', 'USJ Taipan Commercial Hub'] },
      { slug: 'shah-alam', name: 'Shah Alam', region: 'Selangor', corridors: ['Section 15 Automotive & Industrial Zone', 'i-City Smart Tech Hub', 'Kota Kemuning Commercial Corridor', 'Setia Alam Commercial Hub', 'Bukit Jelutong High-Tech Park'] },
      { slug: 'melaka', name: 'Melaka City', region: 'Melaka', corridors: ['Melaka Gateway Maritime Logistics', 'Ayer Keroh High-Tech Hub', 'Kota Laksamana Commercial Strip', 'Batu Berendam Free Trade Zone', 'Jonker Walk Heritage District'] },
      { slug: 'kota-kinabalu', name: 'Kota Kinabalu', region: 'Sabah', corridors: ['Kota Kinabalu Waterfront Promenade', 'KKIP Industrial Park', 'Likas Bay Commercial Strip', 'Tanjung Aru Resort Corridor', 'Damai Medical & Commercial Belt'] },
      { slug: 'kuching', name: 'Kuching', region: 'Sarawak', corridors: ['Kuching Waterfront Heritage Core', 'Samalaju Clean Energy Corridor Support', 'Tabuan Jaya Commercial Hub', 'Muara Tebas Port Logistics', 'Batu Kawa Growth Area'] }
    ]
  }
];

for (const market of REMAINING_MARKETS) {
  tsContent += `  // ─── ${market.countryName.toUpperCase()} (${market.marketSlug}) ─────────────────────────────\n`;
  for (const city of market.cities) {
    const key = `${market.marketSlug}/${city.slug}`;
    const metaTitle = `${city.name} Web Design Agency — Bespoke React Platforms | Uncoded Hub`;
    const metaDescription = `Senior-engineered React web design for ${city.name} businesses, corporate law firms & medical clinics. ${city.corridors.slice(0, 3).join(', ')}. Contractual 7-day guarantee.`;
    const tagline = `Commercial Power for ${city.corridors.slice(0, 3).join(', ')}`;
    const agencyRate = `Top local agency rates vs Uncoded Hub flat sprint`;
    const savings = `Save 60%+ vs local agencies`;
    const tz = 'Local Business Time';
    const tzCode = `${market.currencyCode} Timezone`;
    const overlap = 'Direct live collaboration overlap with Bangalore (IST)';
    const industries = ['Corporate Services & Law', 'Aesthetic & Medical Clinics', 'Real Estate & Construction', 'Technology & Startups', 'Hospitality & Luxury Retail'];

    tsContent += `  '${key}': {
    slug: '${city.slug}',
    countrySlug: '${market.marketSlug}',
    cityName: '${city.name}',
    stateOrRegion: '${city.region}',
    countryName: '${market.countryName}',
    flag: '${market.flag}',
    currencyCode: '${market.currencyCode}',
    currencySymbol: '${market.currencySymbol}',
    metaTitle: '${metaTitle.replace(/'/g, "\\'")}',
    metaDescription: '${metaDescription.replace(/'/g, "\\'")}',
    heroTagline: '${tagline.replace(/'/g, "\\'")}',
    corridors: ${JSON.stringify(city.corridors)},
    localAgencyRate: '${agencyRate}',
    uncodedHubSprintPrice: '${market.sprintPrice}',
    savings: '${savings}',
    timezone: '${tz}',
    timezoneCode: '${tzCode}',
    overlapHours: '${overlap}',
    keyIndustries: ${JSON.stringify(industries)},
  },\n`;
  }
}

tsContent += `};

// Helper lookup functions
export function getCityData(marketSlug: string, citySlug: string): GlobalCity | undefined {
  const key = \`\${marketSlug.toLowerCase()}/\${citySlug.toLowerCase()}\`;
  return GLOBAL_CITIES_DATA[key];
}

export function getCitiesForMarket(marketSlug: string): GlobalCity[] {
  const prefix = \`\${marketSlug.toLowerCase()}/\`;
  return Object.keys(GLOBAL_CITIES_DATA)
    .filter((k) => k.startsWith(prefix))
    .map((k) => GLOBAL_CITIES_DATA[k]);
}

export const ALL_GLOBAL_CITIES = Object.values(GLOBAL_CITIES_DATA);
`;

const outputPath = path.join(root, 'src', 'data', 'globalCityData.ts');
fs.writeFileSync(outputPath, tsContent, 'utf-8');
console.log(`Generated globalCityData.ts at ${outputPath}`);
