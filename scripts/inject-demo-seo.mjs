import fs from 'fs';
import path from 'path';

const demoDir = path.resolve('public/demos');

// Industry niche mapping for crisp metadata
const NICHE_META = {
  'interior-design': {
    title: 'Meridian Interiors & Architecture | Live Interactive Demo Specimen',
    desc: 'Explore the bespoke residential interior design demo by Uncoded Hub. Instant theme switching, 3D render comparison slider, and itemized trade cost calculator.',
    niche: 'Interior Designers & Architects'
  },
  'real-estate': {
    title: 'Marlow Realty Group | Luxury Property Brokerage Demo Specimen',
    desc: 'Live real estate demo featuring instant mortgage & EMI calculator, interactive floorplan viewer, and VIP WhatsApp booking. Built by Uncoded Hub.',
    niche: 'Real Estate Brokers & Developers'
  },
  'wedding-photography': {
    title: 'Alder & Wren Fine Art | Luxury Wedding Photography Demo Specimen',
    desc: 'Fine-art editorial wedding photography studio demo. Full-bleed 4K gallery rendering, multi-day itinerary package builder, and availability date checker.',
    niche: 'Luxury Wedding Photographers'
  },
  'executive-coaching': {
    title: 'Naomi Reyes Advisory | Executive Leadership Coaching Demo Specimen',
    desc: 'High-ticket advisory platform demo with zero-bloat sub-second performance. Advisory retainers intake funnel and direct founder booking.',
    niche: 'Executive Coaches & Consultants'
  },
  'dental-clinic': {
    title: 'Willowmere Dental & Orthodontics | Private Clinical Demo Specimen',
    desc: 'Live interactive dental practice demo. Instant Invisalign smile assessment simulator, treatment pricing matrix, and automated emergency consultation scheduler.',
    niche: 'Dental Clinics & Implant Centers'
  },
  'home-renovation': {
    title: 'Halbrook Modular & Architectural Renovation | Live Demo Specimen',
    desc: 'Architectural renovation and modular kitchen contractor demo. Instant room-by-room renovation estimate calculator and material warranty spec sheets.',
    niche: 'Home Renovation & Modular Builders'
  },
  'educational-academy': {
    title: 'Vanguard Academy & EdTech | High-Impact Institute Demo Specimen',
    desc: 'Interactive higher education and competitive coaching demo. Merit fee calculator, faculty profiles, and course syllabus download intake.',
    niche: 'Educational Academies & Institutes'
  },
  'gym-fitness-club': {
    title: 'Apex Iron & Performance Club | Premium Gym & Fitness Demo Specimen',
    desc: 'High-energy fitness club digital platform. Live membership tier comparison, class schedule reservation, and PT coach portfolio.',
    niche: 'Premium Gyms & Fitness Clubs'
  },
  'business-portfolio': {
    title: 'Nexus Venture & Enterprise Advisory | Corporate Portfolio Demo Specimen',
    desc: 'Enterprise B2B digital storefront. Instant case study data metrics, partner advisory roster, and commercial RFP submission system.',
    niche: 'B2B Companies & Enterprise Portfolios'
  },
  'spa-wellness': {
    title: 'Soma Botanical Sanctuary | Luxury Day Spa & Wellness Demo Specimen',
    desc: 'Tranquil luxury day spa and holistic retreat demo. Treatment ritual visual menu, therapist availability checker, and VIP gift voucher booking.',
    niche: 'Luxury Spas & Wellness Sanctuaries'
  },
  'salon-beauty': {
    title: 'Maison Belle Salon & Studio | Haute Coiffure Beauty Demo Specimen',
    desc: 'Editorial luxury beauty and bridal salon demo. Stylist lookbook portfolio, service rate card, and instant bridal calendar consultation booking.',
    niche: 'High-End Salons & Beauty Studios'
  },
  'fitness-coach': {
    title: 'Valkyrie Elite Strength | Online Fitness Coach Demo Specimen',
    desc: 'High-ticket 1-on-1 personal trainer and fitness coach platform. Transformation gallery slider, caloric client intake, and training program checkout.',
    niche: 'Online Fitness Coaches & Personal Trainers'
  },
  'yoga-meditation': {
    title: 'Prana Sanctuary | Mindful Yoga & Meditation Studio Demo Specimen',
    desc: 'Serene yoga sanctuary digital space. Weekly class schedule viewer, sound bath retreat bookings, and private instructor introduction.',
    niche: 'Yoga Studios & Meditation Retreats'
  },
  'creative-portfolio': {
    title: 'Atelier Monochrome | Creative Director & Art Director Demo Specimen',
    desc: 'Museum-grade editorial portfolio demo. High-resolution typography specimen, full-bleed campaign reel, and brand collaboration inquiries.',
    niche: 'Creative Directors, Artists & Photographers'
  },
  'healthcare-diagnostics': {
    title: 'Aura Precision Pathology & Diagnostic Lab | Clinical Demo Specimen',
    desc: 'Diagnostic pathology and radiology digital platform. Preventive health checkup package selector, home sample collection request, and report portal entry.',
    niche: 'Diagnostics Labs & Pathology Centers'
  },
  'clinic-polyclinic': {
    title: 'St. Jude Polyclinic & Healthcare Hub | Multi-Specialty Demo Specimen',
    desc: 'Multi-specialty outpatient medical center demo. Department specialist doctor directory, OPD appointment slot reservation, and insurance empaneled list.',
    niche: 'Multi-Specialty Clinics & Polyclinics'
  },
  'doctor-specialist': {
    title: 'Dr. Alistair Vance, MS, MCh | Senior Specialist Surgeon Demo Specimen',
    desc: 'Authoritative private practice platform for senior medical specialists. Surgical fellowship credentials, patient education video library, and OPD consult booking.',
    niche: 'Specialist Doctors & Surgeons'
  }
};

let count = 0;

fs.readdirSync(demoDir).filter(f => f.endsWith('.html')).forEach(file => {
  const slug = file.replace('.html', '');
  const meta = NICHE_META[slug] || {
    title: `${slug.replace('-', ' ').toUpperCase()} | Live Interactive Demo Specimen | Uncoded Hub`,
    desc: `Interactive digital platform demonstration specimen designed and engineered by Uncoded Hub. Live theme switching and sub-second performance.`,
    niche: 'Turnkey Digital Web Specimen'
  };

  const fullPath = path.join(demoDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');

  const canonicalUrl = `https://uncodedhub.com/demos/${slug}.html`;
  const cleanUrl = `https://uncodedhub.com/demos/${slug}/`;
  const imageUrl = `https://uncodedhub.com/demos/thumbnails/${slug}-theme1.webp`;

  // Build clean SEO Head block
  const seoHeadBlock = `  <title>${meta.title}</title>
  <meta name="description" content="${meta.desc}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="en" href="${canonicalUrl}">
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}">

  <!-- OpenGraph Metadata -->
  <meta property="og:site_name" content="Uncoded Hub">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.desc}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">
  <meta property="og:image:alt" content="${meta.title}">
  <meta property="og:locale" content="en_US">

  <!-- Twitter Card Metadata -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@uncodedhub">
  <meta name="twitter:creator" content="@uncodedhub">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.desc}">
  <meta name="twitter:image" content="${imageUrl}">

  <!-- Schema.org JSON-LD Structured Data for Indexation & Rich Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "${canonicalUrl}",
        "url": "${canonicalUrl}",
        "name": "${meta.title}",
        "description": "${meta.desc}",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://uncodedhub.com/#website",
          "url": "https://uncodedhub.com/",
          "name": "Uncoded Hub",
          "publisher": {
            "@type": "Organization",
            "name": "Uncoded Hub",
            "url": "https://uncodedhub.com"
          }
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://uncodedhub.com/" },
            { "@type": "ListItem", "position": 2, "name": "Demos", "item": "https://uncodedhub.com/portfolio/" },
            { "@type": "ListItem", "position": 3, "name": "${meta.niche}", "item": "${canonicalUrl}" }
          ]
        }
      },
      {
        "@type": "CreativeWork",
        "name": "${meta.title}",
        "headline": "${meta.title}",
        "description": "${meta.desc}",
        "creator": {
          "@type": "Organization",
          "name": "Uncoded Hub",
          "url": "https://uncodedhub.com"
        },
        "image": "${imageUrl}"
      }
    ]
  }
  </script>`;

  // Replace existing title and description if present, or insert right after <head>
  if (content.includes('<title>')) {
    content = content.replace(/<title>[\s\S]*?<\/title>/i, '');
  }
  if (content.includes('<meta name="description"')) {
    content = content.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, '');
  }
  // Remove any previous canonical or robots
  content = content.replace(/<link\s+rel=["']canonical["'][\s\S]*?>/gi, '');
  content = content.replace(/<meta\s+name=["']robots["'][\s\S]*?>/gi, '');
  content = content.replace(/<meta\s+property=["']og:[\s\S]*?>/gi, '');
  content = content.replace(/<meta\s+name=["']twitter:[\s\S]*?>/gi, '');

  content = content.replace(/<head>/i, `<head>\n${seoHeadBlock}`);

  // Fix unsafe target="_blank"
  content = content.replace(/<a\s+([^>]*?)target=["']_blank["']([^>]*?)>/gi, (match, p1, p2) => {
    if (match.includes('noopener') || match.includes('noreferrer')) return match;
    return `<a ${p1}target="_blank" rel="noopener noreferrer"${p2}>`;
  });

  fs.writeFileSync(fullPath, content, 'utf8');
  count++;
  console.log(`[SEO Injected] ${file} -> canonical: ${canonicalUrl}`);
});

console.log(`\nSuccessfully injected SEO metadata & structured data into all ${count} demo files!`);
