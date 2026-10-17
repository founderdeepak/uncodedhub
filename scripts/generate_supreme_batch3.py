import os
from generate_supreme_11_demos import generate_supreme_demo

# ==============================================================================
# 8. CREATIVE DESIGN PORTFOLIO
# ==============================================================================
creative_data = {
    'filename': '08_creative_portfolio_demo.html',
    'title': 'Kavya Studio | High-End Brand Identity, Editorial Direction & Packaging Systems',
    'niche_label': 'Creative Portfolio Niche Demo',
    'brand_name': 'KAVYA STUDIO',
    'brand_tagline': 'INDEPENDENT BRAND & DIGITAL DIRECTION',
    'hero_badge': '✦ International Design Awards & Editorial Distinction',
    'h1': 'We Engineer Iconic Brands That Command High-Ticket Pricing',
    'subtitle': 'Strategic visual identity, tactile packaging, and high-converting editorial digital experiences for founders, luxury lifestyle labels, and cultural innovators.',
    'primary_cta': '📂 View Selected Works',
    'secondary_cta': 'Initiate Project Sprint',
    'hero_img': 'https://images.unsplash.com/photo-1542744094-3a3172722183?auto=format&fit=crop&w=1200&q=80',
    'stats': [('48+', 'Brand Identities Launched'), ('7', 'Global Design Distinctions'), ('100%', 'Bespoke Vector Typography'), ('14 Days', 'Rapid Sprint Delivery')],
    'trust_logos': ['AWWWARDS NOMINEE', 'BRAND NEW FEATURED', 'TYPE DIRECTORS CLUB', 'PENTWARDS SHORTLIST'],
    'services_head': 'Creative Disciplines & Deliverables',
    'services_sub': 'Bridging timeless European typography with modern, high-conversion commercial art direction.',
    'services': [
        ('Holistic Visual Identity Systems', 'Primary logomarks, secondary seals, proprietary color hierarchies, and master brand guidelines.', '₹65,000 / sprint', 'Identity Design', 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80'),
        ('Luxury Tactile Packaging Architecture', 'Custom die-lines, foil embossing specs, unboxing ergonomics, and sustainable material curation.', '₹45,000 / collection', 'Packaging Suite', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'),
        ('Bespoke Editorial Web UI/UX', 'Art-directed digital storefronts with micro-interactions, clean code, and sub-second load times.', '₹75,000 / platform', 'Digital Design', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'),
        ('Creative Direction & Campaign Launch', 'Full editorial campaign styling, photography shot-lists, and social launch monographs.', '₹50,000 / campaign', 'Art Direction', 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Interactive Project Scope & Timeline Configurator',
    'interactive_sub': 'Select your required creative scope to view estimated deliverables and sprint scheduling.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Project Scope</label>
          <select id="crScope" class="form-ctrl" onchange="calcCreatEst()">
            <option value="Brand">Complete Visual Identity & Typography Suite</option>
            <option value="Packaging">Luxury Packaging Suite (Die-Lines & Print Specs)</option>
            <option value="Web">Bespoke Editorial Web Platform (React/UI)</option>
            <option value="Full">360° Brand Overhaul (Identity + Packaging + Web)</option>
          </select>
        </div>
        <div id="crBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">ESTIMATED SPRINT WINDOW:</div>
          <div style="font-size:26px; font-weight:800; margin:6px 0;" id="crTimeText">10 to 14 Working Days</div>
          <div style="font-size:13px; color:var(--text-muted);">Includes full intellectual property transfer, vector source files, and brand stylebook.</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('Creative Consultation')">Book 20-Minute Creative Discovery Call</button>
      </div>''',
    'interactive_js': '''
      function calcCreatEst() {
        const s = document.getElementById('crScope').value;
        let t = s === "Full" ? "3 to 4 Weeks" : (s === "Web" ? "14 Working Days" : "10 Working Days");
        document.getElementById('crTimeText').innerText = t;
      }''',
    'process_head': 'The Studio Sprint Methodology',
    'process_sub': 'Zero endless design committee meetings. Rapid, high-conviction creative execution.',
    'process_steps': [
        ('01', 'Immersion & Market White-Space', 'Deep dive into your competitive landscape to pinpoint the exact visual aesthetic your rivals are ignoring.'),
        ('02', 'Two Master Creative Directions', 'Complete prototype presentation showing the logo, typography, packaging, and digital UI in real context.'),
        ('03', 'Refinement & Production Detailing', 'Polishing vector curves, kerning pairs, and preparing print production files with pantone swatches.'),
        ('04', 'Asset Delivery & Brand Book', 'Complete Google Drive handoff of all vector formats, Figma components, and commercial license certificates.')
    ],
    'gallery_head': 'Selected Studio Works',
    'gallery_sub': 'Every project is built from scratch with zero generic templates.',
    'gallery_items': [
        ('Maison Botanique', 'Packaging', 'Luxury cold-pressed perfume bottle packaging.', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=700&q=80'),
        ('Nordic Oak Furnishings', 'Brand Identity', 'Minimalist timber studio typography and marks.', 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=700&q=80'),
        ('Aura Skincare Lab', 'Digital UI/UX', 'Sub-second luxury skincare ecommerce architecture.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80'),
        ('Vesper Lounge', 'Editorial Art', 'Cocktail menu monograph with copper foil details.', 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'Founder Collaborations',
    'reviews_sub': 'Direct reviews from founders who elevated their market valuation with Kavya Studio.',
    'reviews': [
        ('Liam O\'Connor', 'Founder, Artisan Gin Distillery', 'Kavya Studio turned our spirit into an award-winning collector’s bottle. Our retail shelf velocity tripled in the first month after the redesign.'),
        ('Siddharth Roy', 'CEO, Architectural Lighting', 'Every design agency gave us generic tech templates. Kavya delivered an editorial identity that landed us in international architectural magazines.'),
        ('Elena Rossi', 'Creative Director, Milan', 'Exquisite typographic restraint and unmatched project velocity. The cleanest agency collaboration we have ever experienced.')
    ],
    'faqs_head': 'Studio Engagement Details',
    'faqs': [
        ('Do you work with startups or established brands?', 'Both. We work with ambitious founders launching their first flagship product and established companies undergoing strategic visual rebrands.'),
        ('Do I own the full intellectual property rights?', 'Yes. Upon final invoice settlement, 100% of all copyright, font licenses, and vector source files transfer to your business in perpetuity.'),
        ('How many revisions are included in a sprint?', 'We work in dedicated iterative sprint feedback loops. We refine the chosen direction until you are 100% confident in market launch.')
    ],
    'form_head': 'Initiate Project Discovery',
    'form_sub': 'Book a private discovery call to discuss your creative deliverables and target launch date.',
    'form_fields': [
        ('Your Name & Title', '<input type="text" class="form-ctrl" placeholder="Your name" required>'),
        ('Brand / Company Website', '<input type="text" class="form-ctrl" placeholder="https://yourbrand.com" required>'),
        ('Estimated Timeline & Scope', '<select class="form-ctrl"><option>Complete Visual Identity (2 Weeks)</option><option>Packaging Design Suite</option><option>Editorial Digital Platform</option></select>')
    ],
    'themes': [
        {
            'id': 'editorial-brutalist-cream',
            'name': 'Editorial Brutalist',
            'icon': '✦',
            'bg_primary': '#f4f0ea',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#eae4d9',
            'text_primary': '#0a0a0a',
            'text_muted': '#333333',
            'text_subtle': '#666666',
            'border_color': '#d8d0c2',
            'accent': '#ec4899',
            'accent_hover': '#db2777',
            'accent_light': '#fce7f3',
            'badge_bg': '#0a0a0a',
            'badge_text': '#ffffff',
            'radius': '0px',
            'font_heading': 'Syne',
            'font_body': 'Space Grotesk',
            'header_bg': 'rgba(244, 240, 234, 0.95)',
            'shadow': '6px 6px 0px #0a0a0a'
        },
        {
            'id': 'tokyo-gallery-noir',
            'name': 'Tokyo Noir',
            'icon': '🖤',
            'bg_primary': '#08080a',
            'bg_surface': '#101014',
            'bg_card': '#15151b',
            'bg_card_hover': '#1e1e26',
            'text_primary': '#fafafa',
            'text_muted': '#a1a1aa',
            'text_subtle': '#71717a',
            'border_color': 'rgba(255, 255, 255, 0.1)',
            'accent': '#a3e635',
            'accent_hover': '#bef264',
            'accent_light': 'rgba(163, 230, 53, 0.15)',
            'badge_bg': 'rgba(163, 230, 53, 0.18)',
            'badge_text': '#d9f99d',
            'radius': '10px',
            'font_heading': 'Space Grotesk',
            'font_body': 'Space Grotesk',
            'header_bg': 'rgba(8, 8, 10, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'bauhaus-clean-white',
            'name': 'Bauhaus Clean',
            'icon': '📐',
            'bg_primary': '#ffffff',
            'bg_surface': '#fafafa',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f4f4f5',
            'text_primary': '#18181b',
            'text_muted': '#3f3f46',
            'text_subtle': '#71717a',
            'border_color': '#e4e4e7',
            'accent': '#2563eb',
            'accent_hover': '#1d4ed8',
            'accent_light': '#eff6ff',
            'badge_bg': '#dbeafe',
            'badge_text': '#1e40af',
            'radius': '8px',
            'font_heading': 'Outfit',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(255, 255, 255, 0.95)',
            'shadow': '0 8px 24px rgba(0,0,0,0.06)'
        }
    ]
}

generate_supreme_demo(creative_data)

# ==============================================================================
# 9. HEALTHCARE & DIAGNOSTICS LAB
# ==============================================================================
health_data = {
    'filename': '09_healthcare_diagnostics_demo.html',
    'title': 'CarePath Advanced Diagnostics | NABL Accredited Pathology & Home Sample Pickup',
    'niche_label': 'Healthcare & Diagnostics Demo',
    'brand_name': 'CAREPATH DIAGNOSTICS',
    'brand_tagline': 'NABL ACCREDITED MOLECULAR LABS',
    'hero_badge': '🔬 100% Vacuum Barcoded Collection • 6-Hour Digital Reports',
    'h1': 'Accurate Diagnostics With Doorstep Sample Collection',
    'subtitle': 'Comprehensive full-body wellness panels, specialized cardiac markers, and hormonal screenings. Barcoded vacuum phlebotomy and MD pathologist review.',
    'primary_cta': '🩸 Book Home Sample Pickup',
    'secondary_cta': 'Download Master Test Directory',
    'hero_img': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    'stats': [('100%', 'NABL & ICMR Certified'), ('60 Mins', 'Home Phlebotomist Arrival'), ('350+', 'Clinical Blood & Imaging Tests'), ('6 Hours', 'Digital WhatsApp Reports')],
    'trust_logos': ['NABL CERTIFIED LABORATORY', 'ROCHE GERMAN AUTOMATED ANALYZERS', '100% VACUTAINER BARCODE SAFETY', 'FREE MD DOCTOR CONSULTATION'],
    'services_head': 'Preventative & Specialized Health Panels',
    'services_sub': 'Automated robotic analyzers ensuring zero manual handling errors and precise reference range accuracy.',
    'services': [
        ('Comprehensive Full Body Profile (84 Parameters)', 'Complete hemogram, lipid profile, liver function, renal function, thyroid, and blood sugar HbA1c.', '₹2,499 (50% Off)', 'Popular Package', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'),
        ('Executive Cardiac & Vascular Risk Panel', 'High-sensitivity CRP, lipid fractions, Apolipoprotein B, and homocysteine cardiovascular markers.', '₹3,800', 'Heart Health', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'),
        ('Advanced Hormonal & Thyroid Profile', 'Free T3, Free T4, Ultrasensitive TSH, Cortisol, Vitamin D3, and Vitamin B12 active levels.', '₹2,899', 'Endocrine Lab', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80'),
        ('Senior Citizen Vitality Screen (With Urine)', 'Kidney filtration eGFR, bone calcium, iron studies, and comprehensive arthritis rheumatoid screen.', '₹3,200', 'Senior Wellness', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Search Health Package & Instant Doorstep Booking',
    'interactive_sub': 'Select your checkup requirements to view exact parameters and choose your home collection time.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Select Health Checkup Package</label>
          <select id="hPack" class="form-ctrl" onchange="calcHealthEst()">
            <option value="Basic">Vital Basic Health Screen (62 Parameters) • ₹1,499</option>
            <option value="Comprehensive" selected>Comprehensive Full Body Profile (84 Parameters) • ₹2,499</option>
            <option value="Executive">Master Cardiac & Diabetic Screen (102 Parameters) • ₹3,800</option>
            <option value="Senior">Senior Citizen Comprehensive Panel (88 Parameters) • ₹3,200</option>
          </select>
        </div>
        <div class="form-group">
          <label>Preferred Home Collection Slot</label>
          <select class="form-ctrl">
            <option>Tomorrow Morning (06:30 AM – 08:30 AM) • Fasting Required</option>
            <option>Tomorrow Morning (08:30 AM – 10:30 AM) • Fasting Required</option>
            <option>Today Afternoon (Urgent Routine Non-Fasting)</option>
          </select>
        </div>
        <div id="hBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">PACKAGE PRICING:</div>
          <div style="font-size:26px; font-weight:800; margin:6px 0;" id="hPriceText">₹2,499 (Zero Home Visit Fee)</div>
          <div style="font-size:13px; color:var(--text-muted);">Includes certified phlebotomist visit, vacuum tubes, and digital WhatsApp report by 4:00 PM.</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('Home Collection')">Confirm Home Sample Pickup</button>
      </div>''',
    'interactive_js': '''
      function calcHealthEst() {
        const p = document.getElementById('hPack').value;
        let pr = p === "Basic" ? "₹1,499" : (p === "Comprehensive" ? "₹2,499" : (p === "Executive" ? "₹3,800" : "₹3,200"));
        document.getElementById('hPriceText').innerText = pr + " (Zero Home Visit Fee)";
      }''',
    'process_head': 'The CarePath Sterile Sample Journey',
    'process_sub': 'Medical-grade cold-chain transport ensuring 100% analytical test validity.',
    'process_steps': [
        ('01', 'Painless Doorstep Collection', 'Certified phlebotomists arrive on time with sterile butterfly needles and barcode scanner.'),
        ('02', 'Vacuum Tube Sealing', 'Samples sealed immediately in BD Vacutainers with unique patient QR codes on site.'),
        ('03', 'Cold-Chain Mobile Logistics', 'Temperature-controlled thermoelectric transport boxes maintaining 4°C directly to our central lab.'),
        ('04', 'Automated German Testing', 'Testing on Roche Cobas analyzers with double sign-off by MD Pathologists before digital dispatch.')
    ],
    'gallery_head': 'Inside The NABL Automated Lab',
    'gallery_sub': 'Advanced molecular diagnostics infrastructure operating 24 hours a day.',
    'gallery_items': [
        ('Automated Roche Analyzer', 'Robotics', 'Zero manual pipetting error analyzers.', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=700&q=80'),
        ('Sterile Phlebotomy Kit', 'Safety', 'Single-use vacuum tubes with tamper seals.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80'),
        ('Molecular Genetics Unit', 'Genetics', 'RT-PCR and specialized hormonal testing.', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=700&q=80'),
        ('Digital Pathology Review', 'MD Review', 'Senior doctor verification on every abnormal report.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'Patient Experiences',
    'reviews_sub': 'Read authentic reviews from families who rely on CarePath for timely diagnostics.',
    'reviews': [
        ('Col. Satish Bakshi', 'Senior Citizen Patient', 'The phlebotomist was on time at 6:45 AM, took the blood sample completely painlessly, and I had my full report on WhatsApp by 2 PM!'),
        ('Dr. Priya Sundaram', 'Consultant Physician', 'I send all my clinical patients to CarePath. Their lipid and thyroid test values are remarkably consistent with hospital benchmarks.'),
        ('Deepak Chaddha', 'Annual Checkup User', 'Clear pricing, polite staff, and clean reports. Much more reliable than online aggregator apps.')
    ],
    'faqs_head': 'Frequently Asked Questions',
    'faqs': [
        ('Is 10 to 12 hours of fasting mandatory for full body tests?', 'Yes, for accurate fasting blood sugar and lipid profiles, a 10 to 12-hour overnight water-only fast is required.'),
        ('How will I receive my diagnostic reports?', 'Your reports are delivered as a password-protected PDF directly on your WhatsApp and email as soon as certified by our pathologist.'),
        ('Are home sample collection charges extra?', 'No. Home collection is 100% free across Bangalore for all standard checkup packages.')
    ],
    'form_head': 'Schedule Doorstep Blood Collection',
    'form_sub': 'Our phlebotomist team will call you within 10 minutes to confirm your street address and arrival window.',
    'form_fields': [
        ('Patient Full Name', '<input type="text" class="form-ctrl" placeholder="Patient name" required>'),
        ('WhatsApp Phone Number', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Select Test / Package', '<select class="form-ctrl"><option>Comprehensive Full Body Profile (₹2,499)</option><option>Executive Cardiac Panel (₹3,800)</option><option>Vital Basic Health Screen (₹1,499)</option></select>')
    ],
    'themes': [
        {
            'id': 'clean-cyan-clinical',
            'name': 'Clinical Cyan',
            'icon': '🔬',
            'bg_primary': '#f8fafc',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f1f5f9',
            'text_primary': '#0f172a',
            'text_muted': '#334155',
            'text_subtle': '#64748b',
            'border_color': '#e2e8f0',
            'accent': '#0891b2',
            'accent_hover': '#0e7490',
            'accent_light': '#cffafe',
            'badge_bg': '#e0f2fe',
            'badge_text': '#0369a1',
            'radius': '10px',
            'font_heading': 'Space Grotesk',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(248, 250, 252, 0.95)',
            'shadow': '0 8px 30px rgba(15, 23, 42, 0.08)'
        },
        {
            'id': 'bio-informatics-dark',
            'name': 'Bio-Tech Dark',
            'icon': '🧬',
            'bg_primary': '#040d12',
            'bg_surface': '#0c1820',
            'bg_card': '#11222c',
            'bg_card_hover': '#19303e',
            'text_primary': '#ecfeff',
            'text_muted': '#a5f3fc',
            'text_subtle': '#67e8f9',
            'border_color': 'rgba(6, 182, 212, 0.25)',
            'accent': '#06b6d4',
            'accent_hover': '#22d3ee',
            'accent_light': 'rgba(6, 182, 212, 0.15)',
            'badge_bg': 'rgba(6, 182, 212, 0.18)',
            'badge_text': '#67e8f9',
            'radius': '12px',
            'font_heading': 'Space Grotesk',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(4, 13, 18, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'hospital-family-teal',
            'name': 'Medical Teal',
            'icon': '🏥',
            'bg_primary': '#ffffff',
            'bg_surface': '#f0fdfa',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f0fdfa',
            'text_primary': '#134e4a',
            'text_muted': '#115e59',
            'text_subtle': '#0f766e',
            'border_color': '#ccfbf1',
            'accent': '#0f766e',
            'accent_hover': '#115e59',
            'accent_light': '#e6fffa',
            'badge_bg': '#ccfbf1',
            'badge_text': '#115e59',
            'radius': '8px',
            'font_heading': 'Plus Jakarta Sans',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(255, 255, 255, 0.95)',
            'shadow': '0 6px 20px rgba(15, 118, 110, 0.08)'
        }
    ]
}

generate_supreme_demo(health_data)

# ==============================================================================
# 10. CLINIC & POLYCLINIC
# ==============================================================================
clinic_data = {
    'filename': '10_clinic_polyclinic_demo.html',
    'title': 'Zenith Multi-Specialty Clinic & Advanced Physiotherapy Center',
    'niche_label': 'Clinic & Polyclinic Demo',
    'brand_name': 'ZENITH CLINIC',
    'brand_tagline': 'MULTI-SPECIALTY FAMILY MEDICINE & REHAB',
    'hero_badge': '🏥 Orthopedics • Physiotherapy • Pediatrics • Dental Care',
    'h1': 'Comprehensive Outpatient Healthcare With Zero Hospital Delays',
    'subtitle': 'Consult senior visiting consultants across Orthopedics, Pain Management, Pediatrics, and Dentistry under one roof with digital token queues.',
    'primary_cta': '📅 Book Doctor Appointment',
    'secondary_cta': 'View Visiting Doctors Schedule',
    'hero_img': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    'stats': [('14+', 'Super-Specialist Consultants'), ('Zero', 'Waiting Room Queues'), ('18,000+', 'Outpatients Treated'), ('4.9 ★', 'Over 680+ Google Reviews')],
    'trust_logos': ['NABH CERTIFIED OUTPATIENT CLINIC', 'DIGITAL X-RAY & ULTRASOUND SUITE', 'CLASS-B AUTOCLAVE STERILIZATION', 'DIRECT PHARMACY & LAB'],
    'services_head': 'Clinical Departments & Specialties',
    'services_sub': 'Experienced medical consultants providing ethical diagnostics and compassionate patient care.',
    'services': [
        ('Advanced Physiotherapy & Spine Rehab', 'Laser pain relief, dry needling, ultrasound therapy, and post-surgical sports rehabilitation.', '₹700 / session', 'Physiotherapy Suite', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'),
        ('Orthopedics & Joint Pain Management', 'Arthritis diagnosis, joint lubrication injections, fracture casting, and non-surgical knee care.', '₹800 / consult', 'Orthopedic Care', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'),
        ('Pediatric Care & Painless Vaccinations', 'Growth milestone tracking, newborn care, allergy management, and painless vaccination schedules.', '₹600 / consult', 'Pediatric Wing', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'),
        ('Cosmetic Dentistry & Root Canal Therapy', 'Digital intraoral scanning, invisible aligners, tooth-colored restorations, and single-visit root canals.', '₹800 / consult', 'Dental Clinic', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Select Department & Book Immediate Token Slot',
    'interactive_sub': 'Choose your required clinical department to view available visiting hours and consultation fees.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Select Clinical Department</label>
          <select id="clDept" class="form-ctrl" onchange="calcClinicEst()">
            <option value="Physio">Advanced Physiotherapy & Sports Rehabilitation</option>
            <option value="Ortho">Orthopedics & Joint Pain Clinic</option>
            <option value="Pedia">Pediatrics & Vaccination Center</option>
            <option value="Dental">Dentistry & Implantology</option>
          </select>
        </div>
        <div id="clBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">CONSULTING SCHEDULE TODAY:</div>
          <div style="font-size:24px; font-weight:800; margin:6px 0;" id="clTimeText">Evening 05:00 PM – 08:30 PM</div>
          <div style="font-size:13px; color:var(--text-muted);" id="clDocText">Dr. Rajeshwari Nair (BPT, MPT Ortho • 14 Yrs Experience) • Fee: ₹700</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('Clinic Token')">Reserve Immediate Consultation Token</button>
      </div>''',
    'interactive_js': '''
      function calcClinicEst() {
        const d = document.getElementById('clDept').value;
        if (d === "Ortho") {
          document.getElementById('clTimeText').innerText = "Evening 06:00 PM – 09:00 PM";
          document.getElementById('clDocText').innerText = "Dr. Vinay Murthy (MS Ortho • 18 Yrs Experience) • Fee: ₹800";
        } else if (d === "Pedia") {
          document.getElementById('clTimeText').innerText = "Morning 10:00 AM – 01:00 PM";
          document.getElementById('clDocText').innerText = "Dr. Shalini Prasad (MD Pediatrics • 12 Yrs Experience) • Fee: ₹600";
        } else if (d === "Dental") {
          document.getElementById('clTimeText').innerText = "Daily 10:00 AM – 08:00 PM";
          document.getElementById('clDocText').innerText = "Dr. Sameer Alvi (BDS, MDS Orthodontics) • Fee: ₹800";
        } else {
          document.getElementById('clTimeText').innerText = "Evening 05:00 PM – 08:30 PM";
          document.getElementById('clDocText').innerText = "Dr. Rajeshwari Nair (BPT, MPT Ortho) • Fee: ₹700";
        }
      }''',
    'process_head': 'The Patient Care Journey',
    'process_sub': 'Zero hospital chaos. Direct appointments with digital prescription records.',
    'process_steps': [
        ('01', 'Digital Token Check-In', 'Reserve your appointment time online and receive a digital token code with zero wait room delay.'),
        ('02', 'Comprehensive Consultation', 'Dedicated 20-minute private consultation with the specialist to discuss underlying root causes.'),
        ('03', 'On-Site Diagnostic Support', 'Immediate digital X-rays, ECG, and blood investigations in our certified outpatient lab.'),
        ('04', 'Digital Prescription & WhatsApp Care', 'All prescriptions, therapy schedules, and follow-up guidance sent directly to your phone.')
    ],
    'gallery_head': 'Our Clinical Facilities',
    'gallery_sub': 'Modern sterile suites designed for compassionate outpatient healing.',
    'gallery_items': [
        ('Physiotherapy Rehabilitation Gym', 'Rehab Wing', 'Equipped with parallel bars, lasers, and ultrasound.', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80'),
        ('Orthopedic Examination Suite', 'Orthopedics', 'Equipped with high-resolution digital X-ray monitors.', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=80'),
        ('Child-Friendly Pediatric Care', 'Pediatrics', 'Calming colorful environment that reduces child anxiety.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=80'),
        ('Sterile Dental Operatory', 'Dentistry', 'Class-B European autoclave sterilized instruments.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'Patient Reviews',
    'reviews_sub': 'Read genuine feedback from patients treated at Zenith Clinic.',
    'reviews': [
        ('Geeta Krishnan', 'Physiotherapy Patient', 'I suffered from chronic cervical spondylosis for a year. Dr. Rajeshwari’s dry needling and exercise therapy cured my neck pain in just 10 sessions!'),
        ('Rajesh Varma', 'Parent', 'Dr. Shalini is the kindest pediatrician. Never prescribes unnecessary antibiotics and always available on WhatsApp for emergencies.'),
        ('Anand Rao', 'Orthopedic Patient', 'Prompt, professional, and ethical. The doctor explained my knee X-ray clearly without rushing me to surgery. Highly recommended.')
    ],
    'faqs_head': 'Frequently Asked Questions',
    'faqs': [
        ('Do I need to wait long after booking an appointment?', 'No. We operate on a strict digital token system where patients are seen within 10 to 15 minutes of their reserved slot.'),
        ('Is parking available at the clinic?', 'Yes. Dedicated valet and surface parking is available right in front of our clinic building.'),
        ('Can I get blood tests and X-rays done during my visit?', 'Yes. Our clinical laboratory and digital imaging units operate simultaneously with doctor consultation hours.')
    ],
    'form_head': 'Book Your Specialist Token',
    'form_sub': 'Our reception will confirm your token number via WhatsApp within 10 minutes.',
    'form_fields': [
        ('Patient Full Name', '<input type="text" class="form-ctrl" placeholder="Patient name" required>'),
        ('WhatsApp Phone Number', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Select Specialty & Doctor', '<select class="form-ctrl"><option>Advanced Physiotherapy (Dr. Rajeshwari Nair)</option><option>Orthopedics (Dr. Vinay Murthy)</option><option>Pediatrics (Dr. Shalini Prasad)</option><option>Dental Surgery</option></select>')
    ],
    'themes': [
        {
            'id': 'hospital-royal-blue',
            'name': 'Royal Hospital',
            'icon': '🏥',
            'bg_primary': '#f8fafc',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f1f5f9',
            'text_primary': '#0f172a',
            'text_muted': '#334155',
            'text_subtle': '#64748b',
            'border_color': '#e2e8f0',
            'accent': '#2563eb',
            'accent_hover': '#1d4ed8',
            'accent_light': '#eff6ff',
            'badge_bg': '#dbeafe',
            'badge_text': '#1d4ed8',
            'radius': '10px',
            'font_heading': 'Plus Jakarta Sans',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(248, 250, 252, 0.95)',
            'shadow': '0 8px 30px rgba(15, 23, 42, 0.08)'
        },
        {
            'id': 'gentle-care-mint',
            'name': 'Gentle Mint',
            'icon': '🌿',
            'bg_primary': '#f0fdf4',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#dcfce7',
            'text_primary': '#14532d',
            'text_muted': '#166534',
            'text_subtle': '#15803d',
            'border_color': '#bbf7d0',
            'accent': '#16a34a',
            'accent_hover': '#15803d',
            'accent_light': '#dcfce7',
            'badge_bg': '#dcfce7',
            'badge_text': '#14532d',
            'radius': '12px',
            'font_heading': 'Plus Jakarta Sans',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(240, 253, 244, 0.95)',
            'shadow': '0 10px 25px rgba(22, 163, 74, 0.08)'
        },
        {
            'id': 'dark-clinical-suite',
            'name': 'Clinical Dark',
            'icon': '🩺',
            'bg_primary': '#060d17',
            'bg_surface': '#0d1827',
            'bg_card': '#122236',
            'bg_card_hover': '#192e47',
            'text_primary': '#f8fafc',
            'text_muted': '#cbd5e1',
            'text_subtle': '#94a3b8',
            'border_color': 'rgba(59, 130, 246, 0.25)',
            'accent': '#3b82f6',
            'accent_hover': '#60a5fa',
            'accent_light': 'rgba(59, 130, 246, 0.15)',
            'badge_bg': 'rgba(59, 130, 246, 0.18)',
            'badge_text': '#93c5fd',
            'radius': '12px',
            'font_heading': 'Space Grotesk',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(6, 13, 23, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        }
    ]
}

generate_supreme_demo(clinic_data)

# ==============================================================================
# 11. DOCTOR SPECIALIST
# ==============================================================================
doctor_data = {
    'filename': '11_doctor_specialist_demo.html',
    'title': 'Dr. Arvind Rao, MD, DM, FACC | Senior Interventional Cardiologist & Heart Specialist',
    'niche_label': 'Doctor Specialist Demo',
    'brand_name': 'DR. ARVIND RAO',
    'brand_tagline': 'MD, DM CARDIOLOGY (AIIMS) • FACC (USA)',
    'hero_badge': '🩺 Senior Consultant Interventional Cardiologist • 20+ Years Experience',
    'h1': 'Evidence-Based Cardiology, Ethical Second Opinions & Preventive Heart Care',
    'subtitle': 'Specializing in complex radial angioplasty, hypertension management, echocardiography, and ethical second opinions on coronary stents and bypass surgery.',
    'primary_cta': '📝 Book Clinic Consultation',
    'secondary_cta': 'Request Virtual Second Opinion',
    'hero_img': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
    'stats': [('8,500+', 'Successful Angioplasties'), ('20+ Yrs', 'Clinical Leadership'), ('AIIMS', 'Gold Medalist & Fellow'), ('99.6%', 'Procedural Safety Score')],
    'trust_logos': ['FELLOW AMERICAN COLLEGE OF CARDIOLOGY (FACC)', 'EX-PROFESSOR OF CARDIOLOGY', 'AIIMS NEW DELHI ALUMNUS', 'TRANSPARENT SECOND OPINIONS'],
    'services_head': 'Specialized Clinical Focus',
    'services_sub': 'Ethical, patient-centric cardiology prioritizing non-invasive medical management whenever stents can be safely avoided.',
    'services': [
        ('Coronary Angiography & Stenting Second Opinion', 'Unbiased CD and angiogram film review to confirm whether stents or bypass surgery are genuinely mandatory.', '₹1,500 / review', 'Second Opinion', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'),
        ('Wrist-Entry Transradial Angioplasty', 'Modern painless radial artery interventions allowing patients to walk within hours without groin hematomas.', 'In-Hospital Procedure', 'Interventional Lab', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'),
        ('Preventive Executive Heart Risk Assessment', 'Coronary calcium scoring, 2D strain echo, lipid fraction analysis, and lifelong plaque prevention.', '₹3,500 / protocol', 'Preventive Cardiology', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'),
        ('Hypertension & Heart Failure Optimization', 'Advanced drug titration, diuretic management, and remote blood pressure monitoring for heart failure.', '₹1,200 / consult', 'Chronic Heart Clinic', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Interactive Consultation & Second Opinion Scheduler',
    'interactive_sub': 'Select consultation format to see direct availability at clinic or hospital chambers.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Consultation Format</label>
          <select id="docMode" class="form-ctrl" onchange="calcDocEst()">
            <option value="Clinic">In-Clinic Comprehensive Cardiac Consult (Indiranagar Chamber)</option>
            <option value="Hospital">Hospital Chamber Visit (Apollo Specialty Hospital)</option>
            <option value="SecondOpinion">Digital Angiogram & Stent Second Opinion (Upload CD)</option>
            <option value="Tele">Virtual Video Consultation (Out-of-Town Patients)</option>
          </select>
        </div>
        <div id="docBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">CHAMBER TIMINGS & FEE:</div>
          <div style="font-size:24px; font-weight:800; margin:6px 0;" id="docFeeText">Evening 05:00 PM – 08:30 PM • Fee: ₹1,200</div>
          <div style="font-size:13px; color:var(--text-muted);" id="docSubText">Indiranagar Heart Clinic • Includes in-clinic 12-lead ECG review and detailed report discussion.</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('Doctor Consult')">Confirm Priority Appointment Token</button>
      </div>''',
    'interactive_js': '''
      function calcDocEst() {
        const m = document.getElementById('docMode').value;
        if (m === "Hospital") {
          document.getElementById('docFeeText').innerText = "Morning 09:30 AM – 01:00 PM • Fee: ₹1,500";
          document.getElementById('docSubText').innerText = "Apollo Specialty Hospital Chambers • Priority token assigned on WhatsApp.";
        } else if (m === "SecondOpinion") {
          document.getElementById('docFeeText').innerText = "Digital Angiogram Review • Fee: ₹1,500";
          document.getElementById('docSubText').innerText = "Upload your CD films or WhatsApp hospital discharge summary for Dr. Rao's written verdict.";
        } else if (m === "Tele") {
          document.getElementById('docFeeText').innerText = "Video Tele-Consultation • Fee: ₹1,000";
          document.getElementById('docSubText').innerText = "Dedicated 20-minute Zoom video consultation with Dr. Rao for outstation patients.";
        } else {
          document.getElementById('docFeeText').innerText = "Evening 05:00 PM – 08:30 PM • Fee: ₹1,200";
          document.getElementById('docSubText').innerText = "Indiranagar Heart Clinic • Includes in-clinic 12-lead ECG review and detailed discussion.";
        }
      }''',
    'process_head': 'The Clinical Consultation Standard',
    'process_sub': 'Every patient receives thorough, unhurried time with Dr. Rao without being rushed through assembly line appointments.',
    'process_steps': [
        ('01', 'Prior Records & History Review', 'Thorough examination of your past ECGs, lipid panels, coronary angiograms, and family history.'),
        ('02', 'Clinical & Hemodynamic Exam', 'Careful stethoscope auscultation, peripheral pulse analysis, and in-clinic 12-lead digital ECG.'),
        ('03', 'Transparent Visual Explanation', 'Dr. Rao draws and explains your coronary anatomy on paper so you understand the exact blockage percentage.'),
        ('04', 'Conservative Prescription Plan', 'Optimizing medical therapy, diet, and lifestyle first—recommending procedures only when strictly life-saving.')
    ],
    'gallery_head': 'Clinical Chambers & Cath Lab',
    'gallery_sub': 'State-of-the-art radial cardiac intervention and non-invasive echo laboratories.',
    'gallery_items': [
        ('Advanced Radial Cath Lab', 'Intervention', 'Philips Azurion cardiac angiography suite.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=700&q=80'),
        ('2D Strain Echocardiography', 'Diagnostics', 'GE Vivid E95 cardiac ultrasound scanner.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80'),
        ('Private Consultation Suite', 'Chamber', 'Unhurried, private clinical discussion space.', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80'),
        ('Preventive TMT Lab', 'Stress Lab', 'Computerized treadmill stress test facility.', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'Patient Testimonials',
    'reviews_sub': 'Real experiences from cardiac patients and families treated by Dr. Arvind Rao.',
    'reviews': [
        ('N. Ramachandran', 'Cardiac Patient (Age 64)', 'Another hospital pressured me to get 3 stents immediately. Dr. Rao reviewed my CD calmly, found the lesions were stable, and managed me on medication. 3 years later, I walk 5km daily with zero pain!'),
        ('Savita Mehta', 'Daughter of Heart Patient', 'Dr. Rao’s bedside manner is unmatched. He drew a diagram of the heart on paper and explained everything patiently to my 72-year-old mother until her fear vanished.'),
        ('Prateek Jain', 'Executive Checkup', 'The most thorough cardiac evaluation I have ever had. He spent 30 minutes evaluating my work stress, sleep, and calcium score.')
    ],
    'faqs_head': 'Patient Questions Answered',
    'faqs': [
        ('How do I submit angiogram films for a second opinion?', 'You can upload the DICOM files or WhatsApp photos of the angiogram report. Dr. Rao personally reviews the images and provides a clear written verdict.'),
        ('What is wrist-entry transradial angioplasty?', 'It is an advanced technique where the stent catheter enters through the wrist instead of the groin. It eliminates bleeding risk and allows you to walk within 2 hours.'),
        ('Does Dr. Rao perform emergency procedures?', 'Yes. Dr. Rao leads the 24/7 emergency primary angioplasty team at Apollo Specialty Hospital for acute heart attacks.')
    ],
    'form_head': 'Book Priority Consultation with Dr. Rao',
    'form_sub': 'Dr. Rao’s clinical coordinator will call to confirm your appointment token within 15 minutes.',
    'form_fields': [
        ('Patient Full Name', '<input type="text" class="form-ctrl" placeholder="Patient name" required>'),
        ('WhatsApp Contact', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Select Consultation Reason', '<select class="form-ctrl"><option>In-Clinic Evaluation (Indiranagar Chamber)</option><option>Hospital Chamber (Apollo Specialty)</option><option>Angiogram / Stent Second Opinion</option><option>Virtual Video Consultation</option></select>')
    ],
    'themes': [
        {
            'id': 'harley-medical-navy',
            'name': 'Harley Navy',
            'icon': '🩺',
            'bg_primary': '#f8fafc',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f1f5f9',
            'text_primary': '#0f172a',
            'text_muted': '#334155',
            'text_subtle': '#64748b',
            'border_color': '#e2e8f0',
            'accent': '#0284c7',
            'accent_hover': '#0369a1',
            'accent_light': '#e0f2fe',
            'badge_bg': '#e0f2fe',
            'badge_text': '#0369a1',
            'radius': '10px',
            'font_heading': 'Cormorant Garamond',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(248, 250, 252, 0.95)',
            'shadow': '0 8px 30px rgba(15, 23, 42, 0.08)'
        },
        {
            'id': 'executive-clinical-dark',
            'name': 'Executive Dark',
            'icon': '🖤',
            'bg_primary': '#070f1a',
            'bg_surface': '#0e1c2e',
            'bg_card': '#14273f',
            'bg_card_hover': '#1b3453',
            'text_primary': '#f0f9ff',
            'text_muted': '#bae6fd',
            'text_subtle': '#7dd3fc',
            'border_color': 'rgba(56, 189, 248, 0.25)',
            'accent': '#38bdf8',
            'accent_hover': '#7dd3fc',
            'accent_light': 'rgba(56, 189, 248, 0.15)',
            'badge_bg': 'rgba(56, 189, 248, 0.18)',
            'badge_text': '#bae6fd',
            'radius': '12px',
            'font_heading': 'Cinzel',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(7, 15, 26, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'swiss-medical-clean',
            'name': 'Swiss Surgical',
            'icon': '🏥',
            'bg_primary': '#ffffff',
            'bg_surface': '#f8fafc',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f1f5f9',
            'text_primary': '#0f172a',
            'text_muted': '#334155',
            'text_subtle': '#64748b',
            'border_color': '#cbd5e1',
            'accent': '#0f766e',
            'accent_hover': '#115e59',
            'accent_light': '#ccfbf1',
            'badge_bg': '#ccfbf1',
            'badge_text': '#115e59',
            'radius': '6px',
            'font_heading': 'Plus Jakarta Sans',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(255, 255, 255, 0.95)',
            'shadow': '0 6px 20px rgba(0,0,0,0.06)'
        }
    ]
}

generate_supreme_demo(doctor_data)
print("Creative, Healthcare, Clinic, and Doctor supreme demos generated!")
