import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const localitiesPath = path.join(root, 'src', 'data', 'bangaloreLocalities.json');
const existingData = JSON.parse(fs.readFileSync(localitiesPath, 'utf8'));

// 1. Upgrade existing 26 localities to 6 niches each
const upgradeExisting = {
  indiranagar: {
    nicheKey: 'business-portfolio',
    name: 'B2B Tech Studios & Boutique Agencies',
    icon: '💼',
    headline: 'High-Impact Digital Agency & B2B Websites in Indiranagar',
    subheadline: 'Sub-second portfolio speed, client trust credentials, and zero WordPress bloat.',
    localHook: 'Helping high-growth technology agencies and boutique advisory firms across 100 Feet Road win enterprise contracts.',
    statBadge: '0.6s LCP · Enterprise Authority',
    targetPrice: '₹55,000'
  },
  koramangala: {
    nicheKey: 'salon-beauty',
    name: 'Luxury Salons & Bridal Makeover Studios',
    icon: '✨',
    headline: 'Luxury Salon & Bridal Studio Websites in Koramangala',
    subheadline: 'Mobile booking triage, high-res bridal portfolios, and instant WhatsApp inquiry routing.',
    localHook: 'Attracting premium bridal styling and skincare clients across 5th Block and 80 Feet Road.',
    statBadge: '1-Tap Booking · 4K Lookbook',
    targetPrice: '₹45,000'
  },
  whitefield: {
    nicheKey: 'dental-clinics',
    name: 'Aesthetic Dental & Implant Clinics',
    icon: '🦷',
    headline: 'High-Converting Dental & Implant Websites in Whitefield',
    subheadline: 'Sub-second mobile patient triage, interactive smile makeover sliders, and zero WordPress bloat.',
    localHook: 'Positioning multi-specialty dental practices for IT executives across EPIP Zone and Hope Farm.',
    statBadge: '0.7s LCP · 2-Tap Booking',
    targetPrice: '₹50,000'
  },
  'hsr-layout': {
    nicheKey: 'dental-clinics',
    name: 'Aesthetic Dental & Implant Clinics',
    icon: '🦷',
    headline: 'High-Converting Dental Websites in HSR Layout',
    subheadline: 'Sub-second patient appointment booking, interactive smile galleries, and frictionless intake.',
    localHook: 'Attracting tech founders and families across 27th Main and Sector 1 for high-ticket dental implants.',
    statBadge: '0.8s LCP · Mobile Triage',
    targetPrice: '₹48,000'
  },
  marathahalli: {
    nicheKey: 'business-portfolio',
    name: 'B2B Trade Suppliers & IT Service Providers',
    icon: '🏢',
    headline: 'High-Performance B2B Corporate Websites in Marathahalli',
    subheadline: 'Instant quotation funnels, corporate credential showcases, and zero WordPress maintenance drag.',
    localHook: 'Helping logistics and IT service vendors along the Outer Ring Road close high-value corporate retainers.',
    statBadge: 'Enterprise Specs · Instant RFQ',
    targetPrice: '₹45,000'
  },
  domlur: {
    nicheKey: 'dental-clinics',
    name: 'Aesthetic Dental & Implant Clinics',
    icon: '🦷',
    headline: 'High-Converting Dental Websites in Domlur',
    subheadline: 'Sub-second appointment scheduling, clear pricing transparency, and zero WordPress lag.',
    localHook: 'Attracting corporate executives from EGL (Embassy GolfLinks) for cosmetic dental procedures.',
    statBadge: '0.7s LCP · 2-Tap Booking',
    targetPrice: '₹50,000'
  },
  hal: {
    nicheKey: 'interior-designers',
    name: 'Luxury Interior Designers & Architects',
    icon: '📐',
    headline: 'Bespoke Interior Design Websites in HAL Old Airport Road',
    subheadline: 'Showcase 4K project galleries without mobile lag, transparent design fee estimators, and instant consultation funnels.',
    localHook: 'Positioning boutique residential architects for heritage bungalows and luxury apartments on Old Airport Road.',
    statBadge: '4K Portfolios · 0.8s Speed',
    targetPrice: '₹55,000'
  },
  'mg-road': {
    nicheKey: 'interior-designers',
    name: 'Luxury Interior Architecture & Commercial Fit-Out',
    icon: '📐',
    headline: 'Commercial Interior Architecture Websites in MG Road CBD',
    subheadline: 'High-res commercial fit-out galleries, corporate RFP gateways, and sub-second performance.',
    localHook: 'Helping commercial architectural firms win flagship headquarters and luxury retail fit-outs in Bangalore CBD.',
    statBadge: 'Corporate RFP · 4K Monograph',
    targetPrice: '₹60,000'
  },
  halasuru: {
    nicheKey: 'business-portfolio',
    name: 'Bespoke Trade Ateliers & Corporate Advisory',
    icon: '💼',
    headline: 'Authority B2B Websites in Halasuru & Ulsoor',
    subheadline: 'Clean Swiss typography, institutional credibility, and frictionless client intake.',
    localHook: 'Positioning heritage luxury brands and corporate advisors near Ulsoor Lake.',
    statBadge: 'Editorial Speed · Zero Bloat',
    targetPrice: '₹50,000'
  },
  bellandur: {
    nicheKey: 'coaches-consultants',
    name: 'Executive Leadership & Tech Advisors',
    icon: '🎯',
    headline: 'Executive Leadership Consulting Websites in Bellandur',
    subheadline: 'Convert high-ticket enterprise retainers with clean editorial typography and frictionless discovery booking.',
    localHook: 'Helping C-level leadership advisors and tech consultants win corporate mandates along the ORR tech corridor.',
    statBadge: 'Frictionless Booking · Authority',
    targetPrice: '₹50,000'
  },
  jayanagar: {
    nicheKey: 'home-services',
    name: 'Commercial Contractors & Trade Services',
    icon: '⚙️',
    headline: 'Specialist Contracting & Trade Websites in Jayanagar',
    subheadline: 'Transparent rate cards, verified credential showcases, and instant WhatsApp booking.',
    localHook: 'Showcasing licensed electrical, plumbing, and structural contractors across 4th Block and 7th Block.',
    statBadge: '1-Tap Booking · Local Trust',
    targetPrice: '₹45,000'
  },
  'jp-nagar': {
    nicheKey: 'business-portfolio',
    name: 'B2B Trade Suppliers & Consulting Practices',
    icon: '🏢',
    headline: 'Corporate B2B Websites in JP Nagar',
    subheadline: 'Sub-second speed, verified client track records, and automated lead capture.',
    localHook: 'Helping corporate services and commercial equipment suppliers across JP Nagar Phases 1 to 7.',
    statBadge: 'Enterprise Specs · Instant RFQ',
    targetPrice: '₹48,000'
  },
  'electronic-city-phase-1': {
    nicheKey: 'coaches-consultants',
    name: 'Technology Advisory & Agile Coaches',
    icon: '🎯',
    headline: 'Enterprise Tech Advisory Websites in Electronic City Phase 1',
    subheadline: 'High-trust C-suite presentation, corporate workshop booking, and zero CMS bloat.',
    localHook: 'Helping boutique IT advisors and enterprise agile coaches win retainers across major tech campuses.',
    statBadge: 'Zero Bloat · C-Level Funnel',
    targetPrice: '₹50,000'
  },
  'electronic-city-phase-2': {
    nicheKey: 'business-portfolio',
    name: 'Industrial Hardware & Electronics Manufacturing',
    icon: '⚡',
    headline: 'Electronics Manufacturing & B2B Websites in Electronic City Phase 2',
    subheadline: 'Sub-second technical specification sheets, 1-tap WhatsApp RFQs, and ISO compliance proof.',
    localHook: 'Engineered for hardware OEM suppliers, PCB assembly units, and tech contractors in Phase 2.',
    statBadge: '0.7s LCP · Instant RFQ',
    targetPrice: '₹50,000'
  },
  'richmond-town': {
    nicheKey: 'coaches-consultants',
    name: 'Corporate Legal & Financial Advisory',
    icon: '⚖️',
    headline: 'Corporate Legal & Financial Advisory Websites in Richmond Town',
    subheadline: 'Institutional authority, regulatory compliance transparency, and encrypted client intake.',
    localHook: 'Positioning high-end advocates, chartered accountants, and M&A advisors in Central Bangalore.',
    statBadge: 'Institutional Trust · Zero Ads',
    targetPrice: '₹55,000'
  },
  sadashivanagar: {
    nicheKey: 'dental-clinics',
    name: 'Aesthetic Dental & VIP Clinics',
    icon: '🦷',
    headline: 'VIP Aesthetic Dental Clinic Websites in Sadashivanagar',
    subheadline: 'Private patient intake, high-res smile makeover visualizers, and sub-second mobile access.',
    localHook: 'Attracting elite HNW families and corporate leaders in North Bangalore’s premier residential enclave.',
    statBadge: 'VIP Confidentiality · 0.6s LCP',
    targetPrice: '₹60,000'
  },
  malleshwaram: {
    nicheKey: 'coaches-consultants',
    name: 'Chartered Accountants & Legal Advisors',
    icon: '📋',
    headline: 'CA & Corporate Advisory Websites in Malleshwaram',
    subheadline: 'High-trust professional presentation, statutory compliance checklists, and secure client intake.',
    localHook: 'Helping heritage audit firms and legal consultancies across Margosa and Sampige Road.',
    statBadge: 'Regulatory Trust · Fast Intake',
    targetPrice: '₹48,000'
  },
  'sarjapur-road': {
    nicheKey: 'business-portfolio',
    name: 'B2B Industrial & Commercial Supply Hubs',
    icon: '🏢',
    headline: 'B2B Trade & Equipment Websites on Sarjapur Road',
    subheadline: 'Sub-second product catalog loading, 1-tap WhatsApp RFQ quotation funnels, and verified credentials.',
    localHook: 'Showcasing commercial suppliers and equipment dealers serving the massive residential growth corridor.',
    statBadge: '0.7s LCP · Instant RFQ',
    targetPrice: '₹50,000'
  },
  'btm-layout': {
    nicheKey: 'coaches-consultants',
    name: 'Management & Technology Consultants',
    icon: '🎯',
    headline: 'Management Consulting Websites in BTM Layout',
    subheadline: 'Convert corporate advisory retainers with clean editorial typography and frictionless booking.',
    localHook: 'Positioning independent corporate trainers and tech consultants near Bannerghatta-Hosur link road.',
    statBadge: 'Frictionless Funnel · Authority',
    targetPrice: '₹45,000'
  },
  'bannerghatta-road': {
    nicheKey: 'business-portfolio',
    name: 'Commercial Equipment & Trade Suppliers',
    icon: '⚡',
    headline: 'Commercial Equipment & Supplier Websites on Bannerghatta Road',
    subheadline: 'Sub-second mobile speed, technical specification downloads, and automated inquiry capture.',
    localHook: 'Engineered for commercial dealers and B2B distributors along the South Bangalore arterial corridor.',
    statBadge: '0.7s LCP · Instant RFQ',
    targetPrice: '₹48,000'
  },
  'kalyan-nagar': {
    nicheKey: 'business-portfolio',
    name: 'Commercial Services & Creative Studios',
    icon: '💼',
    headline: 'Commercial Studio & B2B Websites in Kalyan Nagar',
    subheadline: 'Sub-second portfolio speed, client trust credentials, and zero WordPress bloat.',
    localHook: 'Helping growing agencies and commercial service firms along CMR Road capture corporate clients.',
    statBadge: '0.6s LCP · Fast Intake',
    targetPrice: '₹45,000'
  },
  hebbal: {
    nicheKey: 'dental-clinics',
    name: 'Aesthetic Dental & Implant Clinics',
    icon: '🦷',
    headline: 'High-Converting Dental Websites in Hebbal',
    subheadline: 'Sub-second mobile patient triage, interactive smile makeover sliders, and zero WordPress bloat.',
    localHook: 'Attracting families and tech executives from Manyata Tech Park and Bellary Road.',
    statBadge: '0.8s LCP · 2-Tap Booking',
    targetPrice: '₹50,000'
  },
  'cunningham-road': {
    nicheKey: 'coaches-consultants',
    name: 'Chartered Accountants & Legal Advisors',
    icon: '⚖️',
    headline: 'Corporate Legal & Financial Advisory Websites on Cunningham Road',
    subheadline: 'Institutional authority, regulatory compliance transparency, and encrypted client intake.',
    localHook: 'Positioning elite law chambers and audit partners in Bangalore CBD.',
    statBadge: 'Institutional Trust · Fast Intake',
    targetPrice: '₹55,000'
  },
  'frazer-town': {
    nicheKey: 'business-portfolio',
    name: 'Heritage Trade & Commercial Studios',
    icon: '🏢',
    headline: 'Commercial Trade & Studio Websites in Frazer Town',
    subheadline: 'Clean typography, sub-second product loading, and instant WhatsApp inquiry routing.',
    localHook: 'Helping boutique commercial businesses and heritage traders across Coles Road and Mosque Road.',
    statBadge: '0.7s LCP · Local Trust',
    targetPrice: '₹48,000'
  },
  'vasanth-nagar': {
    nicheKey: 'coaches-consultants',
    name: 'Corporate Advisors & Executive Coaches',
    icon: '🎯',
    headline: 'Corporate Advisory Websites in Vasanth Nagar',
    subheadline: 'Institutional authority, regulatory compliance transparency, and encrypted client intake.',
    localHook: 'Positioning management consultants and senior advisors near Palace Road and Millers Road.',
    statBadge: 'Institutional Trust · Zero Ads',
    targetPrice: '₹55,000'
  },
  jigani: [
    {
      nicheKey: 'dental-clinics',
      name: 'Industrial Workforce & Family Dental Clinics',
      icon: '🦷',
      headline: 'Dental Clinic Websites in Jigani & Anekal',
      subheadline: 'Sub-second mobile appointment booking, clear treatment pricing, and emergency WhatsApp routing.',
      localHook: 'Attracting factory leadership, technical staff, and local families across Jigani and Bommasandra.',
      statBadge: '0.8s LCP · 2-Tap Booking',
      targetPrice: '₹40,000'
    },
    {
      nicheKey: 'real-estate',
      name: 'Industrial Land & Commercial Property Brokers',
      icon: '🏭',
      headline: 'Industrial Real Estate & Warehouse Broker Websites in Jigani',
      subheadline: 'Industrial plot listings, warehouse floor specifications, and direct investor WhatsApp triage.',
      localHook: 'Showcasing industrial plots, factory sheds, and commercial godowns across Jigani Industrial Phases 1 & 2.',
      statBadge: 'Industrial Specs · Direct WhatsApp',
      targetPrice: '₹50,000'
    }
  ]
};

// Apply upgrades to existing 26
for (const [slug, addition] of Object.entries(upgradeExisting)) {
  if (existingData[slug]) {
    if (Array.isArray(addition)) {
      for (const item of addition) {
        if (!existingData[slug].niches.some(n => n.nicheKey === item.nicheKey)) {
          existingData[slug].niches.push(item);
        }
      }
    } else {
      if (!existingData[slug].niches.some(n => n.nicheKey === addition.nicheKey)) {
        existingData[slug].niches.push(addition);
      }
    }
  }
}

console.log('Successfully upgraded existing 26 localities to 6 niches!');

// Write the file to disk
fs.writeFileSync(localitiesPath, JSON.stringify(existingData, null, 2), 'utf8');
