import os
from generate_supreme_11_demos import generate_supreme_demo

# ==============================================================================
# 3. SALON & BEAUTY LOUNGE
# ==============================================================================
salon_data = {
    'filename': '05_salon_beauty_studio_demo.html',
    'title': 'Maison De Luxe | Haute Hair, Couture Bridal & Luxury Beauty Lounge',
    'niche_label': 'Salon & Beauty Niche Demo',
    'brand_name': 'MAISON DE LUXE',
    'brand_tagline': 'HAUTE COIFFURE & BRIDAL LOUNGE',
    'hero_badge': '✨ Bangalore\'s Award-Winning Luxury Hair & Bridal Suite',
    'h1': 'Couture Hair Artistry & Radiant Bridal Luxury',
    'subtitle': 'French Balayage masters, bespoke Keratin smoothing, Kérastase Fusio-Dose rituals, and HD airbrush bridal suites. Tailored to your personal elegance.',
    'primary_cta': '💄 Reserve VIP Styling Chair',
    'secondary_cta': 'View Bridal Lookbook 2026',
    'hero_img': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    'stats': [('1,800+', 'Couture Brides Styled'), ('100%', 'Kérastase & Dyson Pro Lab'), ('16', 'Artistic Directors'), ('4.9 ★', 'Over 780+ Reviews')],
    'trust_logos': ['L\'ORÉAL PROFESSIONNEL PARIS', 'KÉRASTASE OFFICIAL SALON', 'DYSON PRO STYLING LAB', 'MAC BRIDAL PRO'],
    'services_head': 'Haute Salon Services & Rituals',
    'services_sub': 'Customized hair coloring, scalp treatments, and couture bridal glam executed by European-trained master stylists.',
    'services': [
        ('French Dimensional Balayage', 'Hand-painted sun-kissed gradients tailored to your facial contours with Olaplex bond repair.', '₹9,500 onwards', 'Hair Color Lab', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'),
        ('Airbrush HD Bridal Suite', 'Water-resistant, 18-hour HD bridal makeup with luxury hair styling, saree draping, and jewelry setting.', '₹24,000 onwards', 'Bridal Couture', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'),
        ('Kérastase Caviar Hair Chronologiste', 'Total scalp and hair revitalization combining biomimetic caviar pearls and hyaluronic acid.', '₹4,800 / ritual', 'Scalp Spa', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80'),
        ('Precision Creative Cut & Blowout', 'Face-framing bespoke haircut finished with Dyson supersonic high-gloss blowout.', '₹2,200 onwards', 'Styling Suite', 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Interactive Bridal & Service Rate Estimator',
    'interactive_sub': 'Select your hair, skin, or bridal preferences to see real-time investment and stylist tier matching.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Desired Transformation</label>
          <select id="salCat" class="form-ctrl" onchange="calcSalonEst()">
            <option value="Balayage">French Balayage & Root Melt (Full Head)</option>
            <option value="Bridal">Signature HD Airbrush Bridal Glam + Draping</option>
            <option value="Keratin">Brazilian Keratin Smoothing & Gloss Treatment</option>
            <option value="Haircut">Creative Director Haircut & Kérastase Ritual</option>
          </select>
        </div>
        <div class="form-group">
          <label>Stylist Experience Tier</label>
          <select id="salTier" class="form-ctrl" onchange="calcSalonEst()">
            <option value="Senior">Senior Stylist (5+ Years Experience)</option>
            <option value="Artistic">Artistic Director / Celebrity Specialist</option>
          </select>
        </div>
        <div id="salResultBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">ESTIMATED SERVICE RATE:</div>
          <div style="font-size:28px; font-weight:800; margin:6px 0;" id="salPriceText">₹9,500</div>
          <div style="font-size:13px; color:var(--text-muted);">Includes diagnostic scalp consultation, shampoo, and gourmet espresso.</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('Salon Appointment')">Lock In Preferred Stylist Slot</button>
      </div>''',
    'interactive_js': '''
      function calcSalonEst() {
        const cat = document.getElementById('salCat').value;
        const tier = document.getElementById('salTier').value;
        let p = 9500;
        if (cat === "Bridal") p = tier === "Senior" ? 24000 : 36000;
        else if (cat === "Balayage") p = tier === "Senior" ? 9500 : 13500;
        else if (cat === "Keratin") p = tier === "Senior" ? 7500 : 10500;
        else p = tier === "Senior" ? 2200 : 3500;
        document.getElementById('salPriceText').innerText = "₹" + p.toLocaleString();
      }''',
    'process_head': 'The Maison De Luxe Experience',
    'process_sub': 'From the moment you step in, every detail is crafted around personalized luxury.',
    'process_steps': [
        ('01', 'Digital Strand Diagnostic', 'Micro-camera inspection of hair elasticity, porosity, and previous chemical history.'),
        ('02', 'Bespoke Color Formulation', 'Custom color bowl mixing in our open laboratory matching your exact skin tone undertones.'),
        ('03', 'Precision Artisan Application', 'Meticulous foil placement and balayage sweeping for soft, dimensional grow-out.'),
        ('04', 'Dyson Finish & Homecare Plan', 'Sealing the cuticle with cold shot blowout and prescription homecare regimen.')
    ],
    'gallery_head': 'Client Transformations Lookbook',
    'gallery_sub': 'Real clients, real lighting, zero deceptive filters. Crafted by our master colorists.',
    'gallery_items': [
        ('Hazelnut Balayage', 'Hair Color', 'Soft caramel ribbons on rich espresso base.', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80'),
        ('Royal Reception Glam', 'Bridal', 'Luminous skin with classic winged eyeliner.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80'),
        ('Glass Hair Gloss', 'Keratin', 'Ultra-reflective silky mirror finish.', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80'),
        ('Textured Modern Bob', 'Haircut', 'Weightless movement with precision perimeter.', 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'Words From Our Guests',
    'reviews_sub': 'Read feedback from brides, professionals, and long-time salon regulars.',
    'reviews': [
        ('Rhea Mukherjee', 'Couture Bride', 'Maison De Luxe did my bridal hair and makeup for 3 wedding functions. Not a single smudge after 14 hours of continuous celebrations!'),
        ('Pooja Chawla', 'Balayage Regular', 'I travel from Indiranagar just for their color directors. The grow-out on their balayage lasts 6 months without any brassy tones.'),
        ('Deepika Nair', 'Corporate Leader', 'The salon feels like a private luxury club. Polite staff, pristine hygiene, and the best scalp massage in Bangalore.')
    ],
    'faqs_head': 'Frequently Asked Questions',
    'faqs': [
        ('Do you offer bridal makeup trials?', 'Yes. We offer complete pre-bridal trials where we test hair textures, airbrush shades, and jewelry placement.'),
        ('Which hair care brands do you use in salon?', 'We exclusively formulate with L\'Oréal Professionnel Metal Detox, Kérastase Paris, and Olaplex bond builders.'),
        ('How long does a full balayage session take?', 'A full transformation with Olaplex bond repair, toning gloss, and blowout takes approximately 3.5 to 4.5 hours.')
    ],
    'form_head': 'Reserve Your Styling Chair',
    'form_sub': 'Our concierge will confirm your stylist slot via WhatsApp within 15 minutes.',
    'form_fields': [
        ('Your Name', '<input type="text" class="form-ctrl" placeholder="Your full name" required>'),
        ('WhatsApp Number', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Service Required', '<select class="form-ctrl"><option>French Balayage Transformation</option><option>Bridal Consultation & Trial</option><option>Keratin Smoothing Treatment</option><option>Creative Cut & Blowout</option></select>')
    ],
    'themes': [
        {
            'id': 'parisian-rose-cream',
            'name': 'Parisian Rose',
            'icon': '🌸',
            'bg_primary': '#fdfbf7',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f7f2eb',
            'text_primary': '#1c1917',
            'text_muted': '#57534e',
            'text_subtle': '#78716c',
            'border_color': '#e7e2d8',
            'accent': '#c026d3',
            'accent_hover': '#a21caf',
            'accent_light': '#fae8ff',
            'badge_bg': '#f5d0fe',
            'badge_text': '#86198f',
            'radius': '16px',
            'font_heading': 'Cormorant Garamond',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(253, 251, 247, 0.95)',
            'shadow': '0 12px 32px rgba(192, 38, 211, 0.08)'
        },
        {
            'id': 'velvet-noir-gold',
            'name': 'Velvet Noir',
            'icon': '✨',
            'bg_primary': '#0d0910',
            'bg_surface': '#15101a',
            'bg_card': '#1c1523',
            'bg_card_hover': '#261e30',
            'text_primary': '#fdf4ff',
            'text_muted': '#e9d5ff',
            'text_subtle': '#c084fc',
            'border_color': 'rgba(217, 70, 239, 0.25)',
            'accent': '#d946ef',
            'accent_hover': '#e879f9',
            'accent_light': 'rgba(217, 70, 239, 0.15)',
            'badge_bg': 'rgba(217, 70, 239, 0.18)',
            'badge_text': '#f0abfc',
            'radius': '12px',
            'font_heading': 'Cinzel',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(13, 9, 16, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'clean-aesthetic-porcelain',
            'name': 'Clean Porcelain',
            'icon': '🤍',
            'bg_primary': '#ffffff',
            'bg_surface': '#fafafa',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f4f4f5',
            'text_primary': '#09090b',
            'text_muted': '#27272a',
            'text_subtle': '#52525b',
            'border_color': '#e4e4e7',
            'accent': '#09090b',
            'accent_hover': '#27272a',
            'accent_light': '#f4f4f5',
            'badge_bg': '#09090b',
            'badge_text': '#ffffff',
            'radius': '6px',
            'font_heading': 'Syne',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(255, 255, 255, 0.95)',
            'shadow': '0 10px 25px rgba(0,0,0,0.06)'
        }
    ]
}

generate_supreme_demo(salon_data)

# ==============================================================================
# 4. EDUCATIONAL & COACHING ACADEMY
# ==============================================================================
edu_data = {
    'filename': '01_educational_academy_demo.html',
    'title': 'Apex International Academy | STEM, Olympiad & Competitive Board Rankers',
    'niche_label': 'Education & Academy Demo',
    'brand_name': 'APEX ACADEMY',
    'brand_tagline': 'ACADEMIC MASTERY & STEM EXCELLENCE',
    'hero_badge': '🏆 Ranked #1 Academic Coaching Academy for Classes 8–12',
    'h1': 'Where Ambitious Students Become National Rankers',
    'subtitle': 'Small 15-student smart batches, daily doubt clearing, AI-driven test analytics, and concept-first faculty from top engineering and medical institutions.',
    'primary_cta': '📥 Download 2026-27 Syllabus & Fees',
    'secondary_cta': 'Book Free Diagnostic Test',
    'hero_img': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    'stats': [('98.6%', 'Board Exam Top 5% Rate'), ('1:15', 'Teacher-Student Ratio'), ('480+', 'IIT-JEE & NEET Selections'), ('15 Yrs', 'Academic Excellence')],
    'trust_logos': ['CBSE & ICSE AFFILIATED CURRICULUM', 'SMART CLASSROOM CERTIFIED', 'DAILY LIVE DOUBT PORTAL', 'AI PARENT PROGRESS APP'],
    'services_head': 'Comprehensive Academic Programs',
    'services_sub': 'Structured courses engineered to build conceptual clarity, high-speed problem solving, and disciplined exam temperament.',
    'services': [
        ('Class 10th Board Intensive Program', 'Complete NCERT mastery, exemplar solutions, weekly mock board simulations, and parent progress tracking.', '₹42,000 / year', 'Secondary School', 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80'),
        ('IIT-JEE Main & Advanced Integrated', '2-year rigorous STEM foundation covering physics intuition, calculus depth, and advanced test endurance.', '₹85,000 / year', 'Engineering Wing', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'),
        ('NEET Medical Biology & Physics Cohort', 'NCERT line-by-line bio mastery, diagram drills, and high-yield chemistry problem sets.', '₹80,000 / year', 'Medical Wing', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'),
        ('Junior STEM & Olympiad Foundation', 'Classes 8 & 9 conceptual training for NTSE, Maths Olympiads (RMO), and robotics competitions.', '₹36,000 / year', 'Junior League', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Smart Curriculum & Fee Structure Estimator',
    'interactive_sub': 'Select your child’s grade and target exam to receive an instant curriculum breakdown and fee structure.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Student Current Class</label>
          <select id="eClass" class="form-ctrl" onchange="calcEduEst()">
            <option value="8">Class 8th Junior Foundation</option>
            <option value="9">Class 9th High School</option>
            <option value="10">Class 10th Board Intensive</option>
            <option value="11">Class 11th Science (JEE / NEET)</option>
            <option value="12">Class 12th Board & Competitive Ranker</option>
          </select>
        </div>
        <div class="form-group">
          <label>Target Curriculum / Examination</label>
          <select id="eExam" class="form-ctrl" onchange="calcEduEst()">
            <option value="CBSE">CBSE / ICSE Board 95%+ Target</option>
            <option value="JEE">IIT-JEE (Main + Advanced)</option>
            <option value="NEET">NEET Medical Specialist Cohort</option>
          </select>
        </div>
        <div id="eBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">RECOMMENDED COURSE PROGRAM:</div>
          <div style="font-size:26px; font-weight:800; margin:6px 0;" id="ePriceText">₹36,000 / year</div>
          <div style="font-size:13px; color:var(--text-muted);" id="eBatchText">Batch: Morning 7:30 AM • 15 Students Max • Printed Study Modules Included</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="alert('Instant Course Brochure & Fee PDF sent to your WhatsApp!')">Download Full Course Brochure PDF</button>
      </div>''',
    'interactive_js': '''
      function calcEduEst() {
        const c = document.getElementById('eClass').value;
        const ex = document.getElementById('eExam').value;
        let fee = 36000;
        if (c === "10") fee = 42000;
        else if (c === "11" || c === "12") fee = ex === "CBSE" ? 48000 : 85000;
        document.getElementById('ePriceText').innerText = "₹" + fee.toLocaleString() + " / year";
        document.getElementById('eBatchText').innerText = `Class ${c} (${ex} Batch) • Flexible Quarterly Installments Available`;
      }''',
    'process_head': 'The Apex Academic Triad',
    'process_sub': 'A structured ecosystem designed to turn hesitation into academic mastery.',
    'process_steps': [
        ('01', 'Diagnostic Assessment', 'A 45-minute baseline test evaluating conceptual grasp versus rote memorization gaps.'),
        ('02', 'Micro-Batch Interactive Sprints', '15 students per batch ensuring no child is invisible. Daily active blackboard solving.'),
        ('03', 'Same-Day Doubt Clearance', 'Dedicated 4:00 PM to 6:30 PM teacher cabins where students solve homework hurdles immediately.'),
        ('04', 'Bi-Weekly Computerized Testing', 'Real-time test analysis ranking speed, accuracy, and negative marking patterns on the Parent App.')
    ],
    'gallery_head': 'Inside The Apex Campus',
    'gallery_sub': 'Ergonomic smart classrooms, quiet study cubicles, and science experimentation labs.',
    'gallery_items': [
        ('Smart Interactive Classrooms', 'Technology', '4K interactive digital screens with session recording.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80'),
        ('Doubt Clearing Pods', 'Mentorship', '1-on-1 private teacher guidance pods.', 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=700&q=80'),
        ('Physics & Chemistry Labs', 'Experimentation', 'Experiential conceptual science demonstrations.', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=700&q=80'),
        ('Quiet Study Library', 'Self-Study', 'Soundproof individual cabins for deep focus.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'What Parents & Students Say',
    'reviews_sub': 'Read authentic reviews from families whose children transformed their academic ranks.',
    'reviews': [
        ('Dr. Rajesh Sharma', 'Parent of Class 12 Ranker', 'My son cleared JEE Advanced with an AIR of 1,240. The personal mentorship and small batch focus at Apex made all the difference.'),
        ('Kavita Ramanathan', 'Parent of Class 10 Student', 'Apex eliminated the anxiety of board exams. The weekly app updates kept us completely aware of her math and science strengths.'),
        ('Arjun Mehta', 'NEET Student (Score: 685/720)', 'The biology faculty at Apex explains every single NCERT diagram with crystal clarity. Best coaching decision I ever made.')
    ],
    'faqs_head': 'Parent Inquiries Answered',
    'faqs': [
        ('What is the maximum batch size at Apex?', 'Strictly 15 students per batch. We never operate 80-student lecture halls because personal attention is non-negotiable.'),
        ('Are recorded lectures available if a student misses class?', 'Yes. All smart classroom lectures are automatically recorded in 1080p and uploaded to the student portal within 2 hours.'),
        ('How are parents kept updated on progress?', 'Parents receive weekly attendance logs, bi-weekly test analytics, and quarterly in-person mentorship conferences.')
    ],
    'form_head': 'Register for Complimentary Diagnostic Test',
    'form_sub': 'Book a free conceptual evaluation and course consultation with our Academic Director.',
    'form_fields': [
        ('Parent Full Name', '<input type="text" class="form-ctrl" placeholder="Your name" required>'),
        ('WhatsApp Contact', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Student Grade & Target', '<select class="form-ctrl"><option>Class 10th Board Intensive</option><option>Class 11th IIT-JEE / NEET</option><option>Class 8th / 9th Foundation</option></select>')
    ],
    'themes': [
        {
            'id': 'oxford-academic-navy',
            'name': 'Oxford Navy',
            'icon': '🏛️',
            'bg_primary': '#f8f9fa',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f1f5f9',
            'text_primary': '#0f172a',
            'text_muted': '#334155',
            'text_subtle': '#64748b',
            'border_color': '#e2e8f0',
            'accent': '#1e40af',
            'accent_hover': '#1d4ed8',
            'accent_light': '#eff6ff',
            'badge_bg': '#dbeafe',
            'badge_text': '#1e40af',
            'radius': '10px',
            'font_heading': 'Plus Jakarta Sans',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(248, 249, 250, 0.95)',
            'shadow': '0 10px 30px rgba(15, 23, 42, 0.08)'
        },
        {
            'id': 'modern-stem-dark',
            'name': 'Cyber STEM',
            'icon': '🔬',
            'bg_primary': '#070d18',
            'bg_surface': '#0e1726',
            'bg_card': '#142033',
            'bg_card_hover': '#1b2c45',
            'text_primary': '#f1f5f9',
            'text_muted': '#cbd5e1',
            'text_subtle': '#94a3b8',
            'border_color': 'rgba(56, 189, 248, 0.2)',
            'accent': '#0284c7',
            'accent_hover': '#38bdf8',
            'accent_light': 'rgba(2, 132, 199, 0.15)',
            'badge_bg': 'rgba(2, 132, 199, 0.18)',
            'badge_text': '#7dd3fc',
            'radius': '12px',
            'font_heading': 'Space Grotesk',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(7, 13, 24, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'high-clarity-emerald',
            'name': 'Campus Green',
            'icon': '🌱',
            'bg_primary': '#fafaf9',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f5f5f4',
            'text_primary': '#1c1917',
            'text_muted': '#44403c',
            'text_subtle': '#78716c',
            'border_color': '#e7e5e4',
            'accent': '#059669',
            'accent_hover': '#047857',
            'accent_light': '#ecfdf5',
            'badge_bg': '#d1fae5',
            'badge_text': '#065f46',
            'radius': '6px',
            'font_heading': 'Plus Jakarta Sans',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(250, 250, 249, 0.95)',
            'shadow': '0 8px 24px rgba(0,0,0,0.06)'
        }
    ]
}

generate_supreme_demo(edu_data)
print("Salon and Educational supreme demos generated!")
