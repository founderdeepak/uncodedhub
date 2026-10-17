import os
from generate_supreme_11_demos import generate_supreme_demo

# ==============================================================================
# 5. B2B BUSINESS PORTFOLIO
# ==============================================================================
b2b_data = {
    'filename': '03_business_portfolio_demo.html',
    'title': 'Vanguard Industrial Technologies | Precision CNC & OEM Component Manufacturing',
    'niche_label': 'B2B & Business Portfolio Demo',
    'brand_name': 'VANGUARD INDUSTRIAL',
    'brand_tagline': 'PRECISION ENGINEERING & OEM MANUFACTURING',
    'hero_badge': '⚙️ ISO 9001:2015 & AS9100D Certified Global Partner',
    'h1': 'High-Tolerance Machining For Aerospace & Automotive Tier-1s',
    'subtitle': '5-axis CNC milling, precision sheet metal forming, and automated cleanroom assembly. Sub-micron tolerance verification for global industrial leaders.',
    'primary_cta': '📑 Request Production Quotation (RFQ)',
    'secondary_cta': 'Download Plant Capability Deck',
    'hero_img': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    'stats': [('0.003mm', 'CMM Machining Tolerance'), ('220,000', 'Monthly Precision Units'), ('18+', 'Global Export Nations'), ('99.96%', 'Zero-Defect Quality Score')],
    'trust_logos': ['ZEISS CMM INSPECTION', 'AS9100D AEROSPACE CERTIFIED', 'ROHS & REACH COMPLIANT', 'LIGHTS-OUT CNC CAPACITY'],
    'services_head': 'Core Industrial Capabilities',
    'services_sub': 'End-to-end contract manufacturing from rapid functional prototyping to mass multi-thousand batch production.',
    'services': [
        ('5-Axis Continuous CNC Milling', 'High-speed complex geometry milling on titanium, Inconel, and aerospace aluminum alloys.', '₹1,500 / hr CNC time', 'Machining Division', 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'),
        ('Precision Sheet Metal Fabrication', 'Fiber laser cutting, CNC hydraulic press-brake bending, and robotic TIG/MIG welding cells.', 'Batch Estimations', 'Fabrication Division', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'),
        ('Turnkey Electro-Mechanical Assembly', 'Cleanroom component integration, wiring harness routing, and automated pressure testing.', 'Custom OEM Sprints', 'Assembly Division', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'),
        ('Metrology & Zeiss CMM Certification', 'First-article inspection (FAI) reports, material test certificates, and full traceability logs.', 'Included with Batches', 'Quality Laboratory', 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Instant B2B RFQ & Production Capacity Estimator',
    'interactive_sub': 'Select your manufacturing process and order quantity to receive immediate technical feasibility and lead-time window.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Required Manufacturing Process</label>
          <select id="bProc" class="form-ctrl" onchange="calcB2BEst()">
            <option value="5-Axis CNC">5-Axis CNC Milling & Turning</option>
            <option value="Sheet Metal">Fiber Laser Cutting & Precision Bending</option>
            <option value="Assembly">Turnkey Electro-Mechanical Assembly</option>
          </select>
        </div>
        <div class="form-group">
          <label>Annual Batch Requirement</label>
          <select id="bVol" class="form-ctrl" onchange="calcB2BEst()">
            <option value="Proto">Rapid Prototype (1 – 50 Units)</option>
            <option value="Pilot">Pilot Batch (100 – 1,000 Units)</option>
            <option value="Mass">Mass Production (5,000+ Units)</option>
          </select>
        </div>
        <div id="bBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">ESTIMATED PRODUCTION WINDOW:</div>
          <div style="font-size:26px; font-weight:800; margin:6px 0;" id="bLeadText">5 to 7 Working Days</div>
          <div style="font-size:13px; color:var(--text-muted);">Includes Zeiss CMM Dimensional Inspection & Mill Test Certificate (MTR).</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('B2B RFQ')">Upload CAD Files (.STEP / .IGES) For Formal Quote</button>
      </div>''',
    'interactive_js': '''
      function calcB2BEst() {
        const vol = document.getElementById('bVol').value;
        let t = vol === "Proto" ? "5 to 7 Working Days" : (vol === "Pilot" ? "12 to 16 Working Days" : "3 to 4 Weeks Delivery");
        document.getElementById('bLeadText').innerText = t;
      }''',
    'process_head': 'The Zero-Defect Manufacturing Pipeline',
    'process_sub': 'Disciplined aerospace quality protocols ensuring zero assembly line stoppages for OEM partners.',
    'process_steps': [
        ('01', 'DFM CAD Analysis', 'Our tool design engineers review draft angles, wall thicknesses, and tool paths within 4 hours of drawing upload.'),
        ('02', 'First Article Inspection (FAI)', 'Single unit run subjected to full coordinate measuring machine (CMM) verification before batch kickoff.'),
        ('03', 'Lights-Out Automated Run', 'High-throughput CNC and robotic fabrication running continuously with statistical process control (SPC).'),
        ('04', 'Vacuum Packaging & Traceability', 'VCI anti-corrosion barrier packing with QR serial batch tracking shipped directly to OEM plants.')
    ],
    'gallery_head': 'Manufacturing Infrastructure',
    'gallery_sub': 'Inside our 65,000 sq.ft state-of-the-art climate-controlled industrial facility.',
    'gallery_items': [
        ('5-Axis Machining Center', 'CNC Hub', 'DMG Mori high-precision milling cells.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=700&q=80'),
        ('Robotic Laser Cutter', 'Fabrication', '4kW Trumpf fiber laser with automated sheet loader.', 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=80'),
        ('Cleanroom Sub-Assembly', 'Cleanroom', 'ISO Class 7 assembly bays for medical & defense.', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=700&q=80'),
        ('Zeiss Metrology Lab', 'Quality Lab', 'Sub-micron coordinate measuring machines.', 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'OEM Partner Endorsements',
    'reviews_sub': 'Trusted by supply chain directors across Europe, Japan, and India.',
    'reviews': [
        ('Marcus Vance', 'VP Supply Chain, Tier-1 Auto Supplier', 'Vanguard delivered 60,000 transmission shafts with zero line defects. Their engineering team caught a tolerance conflict before metal was cut.'),
        ('Sunil Kulkarni', 'Operations Director, Industrial Robotics', 'The fastest turnaround on aerospace-grade prototype aluminum housings in South Asia. CMM reports match our internal audits perfectly.'),
        ('Erika Lindqvist', 'Procurement Manager, Stockholm', 'Reliable, transparent, and prompt. We have outsourced precision medical components to Vanguard for 4 years with 100% on-time delivery.')
    ],
    'faqs_head': 'B2B Technical Queries',
    'faqs': [
        ('What file formats do you accept for quotes?', 'We accept .STEP, .IGES, .SLDPRT, and native SolidWorks files along with 2D engineering PDF drawings with geometric tolerances (GD&T).'),
        ('What materials do you maintain in stock?', 'We stock aircraft-grade 6061-T6 and 7075 aluminum, SS304, SS316L, 17-4PH stainless steel, brass, titanium, PEEK, and Delrin.'),
        ('Can you support NDA agreements before drawing transmission?', 'Yes. We routinely execute mutual NDAs within 2 business hours before CAD file upload.')
    ],
    'form_head': 'Initiate Technical Project Review',
    'form_sub': 'Our engineering procurement team will review your specifications and contact you with a formal quote.',
    'form_fields': [
        ('Company Name & Contact', '<input type="text" class="form-ctrl" placeholder="Your name and company" required>'),
        ('Official Corporate Email', '<input type="email" class="form-ctrl" placeholder="procurement@company.com" required>'),
        ('Project Scope & Estimated Quantity', '<select class="form-ctrl"><option>CNC Machining (100 - 1,000 units)</option><option>Sheet Metal & Enclosures</option><option>Turnkey OEM Production (5,000+ units)</option></select>')
    ],
    'themes': [
        {
            'id': 'industrial-steel-slate',
            'name': 'Industrial Steel',
            'icon': '⚙️',
            'bg_primary': '#f1f5f9',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#e2e8f0',
            'text_primary': '#0f172a',
            'text_muted': '#334155',
            'text_subtle': '#64748b',
            'border_color': '#cbd5e1',
            'accent': '#0284c7',
            'accent_hover': '#0369a1',
            'accent_light': '#e0f2fe',
            'badge_bg': '#e2e8f0',
            'badge_text': '#0369a1',
            'radius': '8px',
            'font_heading': 'Space Grotesk',
            'font_body': 'Space Grotesk',
            'header_bg': 'rgba(241, 245, 249, 0.95)',
            'shadow': '0 8px 25px rgba(15, 23, 42, 0.08)'
        },
        {
            'id': 'tungsten-defense-dark',
            'name': 'Tungsten Dark',
            'icon': '🛡️',
            'bg_primary': '#080d15',
            'bg_surface': '#101724',
            'bg_card': '#151e2e',
            'bg_card_hover': '#1d2a3f',
            'text_primary': '#f8fafc',
            'text_muted': '#cbd5e1',
            'text_subtle': '#94a3b8',
            'border_color': 'rgba(56, 189, 248, 0.22)',
            'accent': '#38bdf8',
            'accent_hover': '#7dd3fc',
            'accent_light': 'rgba(56, 189, 248, 0.15)',
            'badge_bg': 'rgba(56, 189, 248, 0.16)',
            'badge_text': '#bae6fd',
            'radius': '10px',
            'font_heading': 'Syne',
            'font_body': 'Space Grotesk',
            'header_bg': 'rgba(8, 13, 21, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'clean-corporate-blue',
            'name': 'Corporate Navy',
            'icon': '🏢',
            'bg_primary': '#ffffff',
            'bg_surface': '#f8fafc',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f1f5f9',
            'text_primary': '#0f172a',
            'text_muted': '#334155',
            'text_subtle': '#64748b',
            'border_color': '#e2e8f0',
            'accent': '#1d4ed8',
            'accent_hover': '#1e40af',
            'accent_light': '#eff6ff',
            'badge_bg': '#dbeafe',
            'badge_text': '#1e40af',
            'radius': '6px',
            'font_heading': 'Plus Jakarta Sans',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(255, 255, 255, 0.95)',
            'shadow': '0 6px 20px rgba(0,0,0,0.06)'
        }
    ]
}

generate_supreme_demo(b2b_data)

# ==============================================================================
# 6. FITNESS COACH & PERSONAL TRAINER
# ==============================================================================
coach_data = {
    'filename': '06_fitness_coach_trainer_demo.html',
    'title': 'Coach Vikram Rathore | 12-Week High-Performance Transformation Mentorship',
    'niche_label': 'Fitness Coach Niche Demo',
    'brand_name': 'VIKRAM RATHORE',
    'brand_tagline': 'HUMAN PHYSIQUE & METABOLIC SPECIALIST',
    'hero_badge': '🔥 Over 500+ Busy Founders & Executives Transformed',
    'h1': 'Drop 8–12kg Of Stubborn Fat Without Starvation Diets',
    'subtitle': 'Science-based progressive resistance, flexible macronutrient protocols, and direct WhatsApp voice check-ins. Built for high-demand careers.',
    'primary_cta': '🎯 Apply for 12-Week Mentorship',
    'secondary_cta': 'View Transformation Proof',
    'hero_img': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    'stats': [('520+', 'Successful Transformations'), ('100%', 'Natural Evidence-Based'), ('9.4kg', 'Average Fat Loss'), ('8 Yrs', 'Coaching Legacy')],
    'trust_logos': ['NSCA-CSCS CERTIFIED', 'PRECISION NUTRITION LEVEL 2', 'OVER 10,000 COACHING HOURS', 'DIRECT FOUNDER ACCESS'],
    'services_head': 'Mentorship Programs',
    'services_sub': 'Zero cookie-cutter PDFs. Every meal plan and lifting cycle is custom-written around your work travel and restaurant schedule.',
    'services': [
        ('The 12-Week Executive Recomposition', 'Lose visceral belly fat while preserving lean muscle mass with 3 hyper-efficient 45-minute weekly lifts.', '₹24,000 / 12 wks', 'Flagship Program', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'),
        ('Hypertrophy & Strength Architecture', 'Advanced periodization for intermediate lifters aiming to add 4-6kg of dense lean muscle.', '₹28,000 / 12 wks', 'Muscle Hypertrophy', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'),
        ('VIP 1-on-1 Daily WhatsApp Access', 'Real-time dining menu selections, form critique videos, and weekly Zoom video strategy calls.', '₹12,000 / month', 'Concierge Mentorship', 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80'),
        ('Postpartum Core & Hormonal Reset', 'Physiotherapist-approved diastasis recti repair, pelvic stability, and gentle metabolic conditioning.', '₹22,000 / 12 wks', 'Women\'s Wellness', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': '12-Week Fat Loss & Muscle Roadmap Calculator',
    'interactive_sub': 'Enter your current weight and goals to receive an instant projected timeline and metabolic target.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Current Body Weight (kg)</label>
          <input type="number" id="cWeight" class="form-ctrl" value="84" onchange="calcCoachEst()">
        </div>
        <div class="form-group">
          <label>Primary Transformation Objective</label>
          <select id="cGoal" class="form-ctrl" onchange="calcCoachEst()">
            <option value="Fat Loss">Aggressive Fat Loss (Drop 2-3 Waist Sizes)</option>
            <option value="Recomp">Body Recomposition (Lose Fat & Build Definition)</option>
            <option value="Muscle">Lean Muscle Mass & Athletic Strength</option>
          </select>
        </div>
        <div id="cBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">YOUR 12-WEEK REALISTIC TARGET:</div>
          <div style="font-size:26px; font-weight:800; margin:6px 0;" id="cTargetText">~7.8 kg Fat Loss</div>
          <div style="font-size:13px; color:var(--text-muted);">Estimated daily caloric intake: 1,950 kcal with 150g protein target.</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('Coaching Application')">Apply for Next Month\'s 10-Spot Cohort</button>
      </div>''',
    'interactive_js': '''
      function calcCoachEst() {
        const w = parseFloat(document.getElementById('cWeight').value) || 80;
        const loss = (w * 0.095).toFixed(1);
        document.getElementById('cTargetText').innerText = `~${loss} kg Pure Fat Loss`;
      }''',
    'process_head': 'The Apex Coaching Protocol',
    'process_sub': 'How we take busy individuals from frustrated dieters to permanent peak physical condition.',
    'process_steps': [
        ('01', 'Metabolic & Lifestyle Audit', 'Detailed audit of your sleep quality, daily steps, work stressors, and food preferences.'),
        ('02', 'Target Caloric & Macro Blueprint', 'Custom daily calorie and protein targets that fit your social dining and travel requirements.'),
        ('03', 'Compound Progressive Training', '3 to 4 days of 45-minute lifts with exercise video guides and direct WhatsApp form review.'),
        ('04', 'Sunday Metric & Adjustment Call', 'Weekly review of weight trends, waist measurements, and adjustments to prevent plateaus.')
    ],
    'gallery_head': 'Client Case Studies & Proof',
    'gallery_sub': 'Verified before/after transformations from doctors, founders, and professionals.',
    'gallery_items': [
        ('Down 14kg in 16 Weeks', 'Founder Recomp', 'Lost 4 inches on waist while increasing bench press.', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80'),
        ('Executive Busy Travel Protocol', '12 Weeks', 'Maintained consistency through 4 international flights.', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80'),
        ('Postpartum Strength Regained', 'Core Repair', 'Healed lower back pain and built functional stamina.', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80'),
        ('From 24% to 12% Body Fat', 'Lean Hypertrophy', 'Gained 3.5kg lean muscle with zero supplements.', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'Client Testimonials',
    'reviews_sub': 'Real voices from students who broke their lifelong weight plateaus.',
    'reviews': [
        ('Sameer Malhotra', 'Fintech Founder (Lost 13kg)', 'Vikram’s protocol was the first time I did not feel like I was on a diet. I had dinner with investors, drank a glass of wine, and still shredded body fat.'),
        ('Dr. Arvind Krishnan', 'Surgeon (Lost 10.5kg)', 'With 10-hour surgical days, standard gym memberships failed me. Vikram structured 40-minute workouts that gave me more energy than I had in my 20s.'),
        ('Neha Gupta', 'Managing Director (Lost 8kg)', 'No starvation. No crash detoxes. Just clear science, daily accountability, and a coach who actually listens.')
    ],
    'faqs_head': 'Frequently Asked Questions',
    'faqs': [
        ('Do I need access to a full gym?', 'Gym access is recommended for maximum results, but we also design high-resistance dumbbell and bands programs for home lifters.'),
        ('How is accountability enforced?', 'You log your meals and weight in our private tracking portal. Vikram provides weekly Loom video critiques and direct daily WhatsApp access.'),
        ('Can I follow this if I am a strict vegetarian?', 'Yes! Over 40% of Vikram\'s clients are pure vegetarians. We design rich protein profiles utilizing paneer, tofu, lentils, whey, and Greek yogurt.')
    ],
    'form_head': 'Apply for Coaching Intake',
    'form_sub': 'Vikram accepts only 10 new clients per month to ensure dedicated 1-on-1 attention.',
    'form_fields': [
        ('Your Full Name', '<input type="text" class="form-ctrl" placeholder="Your name" required>'),
        ('WhatsApp Number', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Current Weight & Primary Goal', '<input type="text" class="form-ctrl" placeholder="e.g. 84kg, want to drop 10kg fat" required>')
    ],
    'themes': [
        {
            'id': 'apex-metabolic-carbon',
            'name': 'Metabolic Carbon',
            'icon': '🔥',
            'bg_primary': '#0c0a09',
            'bg_surface': '#141210',
            'bg_card': '#1c1917',
            'bg_card_hover': '#292524',
            'text_primary': '#fafaf9',
            'text_muted': '#a8a29e',
            'text_subtle': '#78716c',
            'border_color': 'rgba(249, 115, 22, 0.25)',
            'accent': '#f97316',
            'accent_hover': '#fb923c',
            'accent_light': 'rgba(249, 115, 22, 0.15)',
            'badge_bg': 'rgba(249, 115, 22, 0.18)',
            'badge_text': '#fdba74',
            'radius': '12px',
            'font_heading': 'Syne',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(12, 10, 9, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'athletic-chalk-white',
            'name': 'Chalk White',
            'icon': '⚡',
            'bg_primary': '#f4f4f5',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#e4e4e7',
            'text_primary': '#18181b',
            'text_muted': '#3f3f46',
            'text_subtle': '#71717a',
            'border_color': '#d4d4d8',
            'accent': '#ea580c',
            'accent_hover': '#c2410c',
            'accent_light': '#ffedd5',
            'badge_bg': '#ffedd5',
            'badge_text': '#9a3412',
            'radius': '8px',
            'font_heading': 'Space Grotesk',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(244, 244, 245, 0.95)',
            'shadow': '0 10px 30px rgba(0,0,0,0.06)'
        },
        {
            'id': 'underground-stealth-black',
            'name': 'Stealth Red',
            'icon': '🩸',
            'bg_primary': '#000000',
            'bg_surface': '#0a0a0a',
            'bg_card': '#121212',
            'bg_card_hover': '#1a1a1a',
            'text_primary': '#ffffff',
            'text_muted': '#a3a3a3',
            'text_subtle': '#525252',
            'border_color': '#262626',
            'accent': '#ef4444',
            'accent_hover': '#f87171',
            'accent_light': 'rgba(239, 68, 68, 0.15)',
            'badge_bg': '#1f1315',
            'badge_text': '#fca5a5',
            'radius': '4px',
            'font_heading': 'Syne',
            'font_body': 'Space Grotesk',
            'header_bg': 'rgba(0, 0, 0, 0.95)',
            'shadow': '0 0 35px rgba(239, 68, 68, 0.15)'
        }
    ]
}

generate_supreme_demo(coach_data)

# ==============================================================================
# 7. YOGA & MEDITATION SHALA
# ==============================================================================
yoga_data = {
    'filename': '07_yoga_meditation_studio_demo.html',
    'title': 'Prana & Stillness | Authentic Yoga Shala, Pranayama & Sound Healing',
    'niche_label': 'Yoga & Meditation Niche Demo',
    'brand_name': 'PRANA & STILLNESS',
    'brand_tagline': 'AUTHENTIC YOGA SHALA & BREATHWORK',
    'hero_badge': '🧘 Traditional Lineage • Teakwood Sanctuary in Indiranagar',
    'h1': 'Find Strength In Breath & Grace In Movement',
    'subtitle': 'Dynamic Ashtanga Vinyasa, restorative Yin Yoga, therapeutic sound bath meditation, and certified pranayama. Small 12-mat shalas led by traditional masters.',
    'primary_cta': '🌿 Book Complimentary Trial Mat',
    'secondary_cta': 'View Class Schedule',
    'hero_img': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    'stats': [('12', 'Students Max Per Shala'), ('100%', 'Yoga Alliance Certified'), ('8', 'Daily Practice Batches'), ('4.9 ★', 'Over 480+ Reviews')],
    'trust_logos': ['YOGA ALLIANCE CERTIFIED RYT-500', 'NATURAL TEAKWOOD FLOORING', 'AIR-PURIFIED PLANT SHALAS', 'PROPS & MATS INCLUDED'],
    'services_head': 'Mindful Movement Disciplines',
    'services_sub': 'Whether building physical agility, clearing chronic desk tension, or deepening your meditative state.',
    'services': [
        ('Dynamic Ashtanga Vinyasa', 'Synchronized breath-movement sequences building core heat, joint flexibility, and cardiovascular stamina.', '₹3,800 / month', 'Morning Flow', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'),
        ('Restorative Yin & Sound Immersion', 'Passive floor postures held for 3–5 minutes paired with Tibetan singing bowls for deep fascial release.', '₹4,200 / month', 'Evening Recovery', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'),
        ('Breathwork & Pranayama Mastery', 'Ancient yogic breath techniques to balance the nervous system, lower cortisol, and sharpen focus.', '₹2,800 / month', 'Pranayama Suite', 'https://images.unsplash.com/photo-1552196563-552342340578?auto=format&fit=crop&w=800&q=80'),
        ('1-on-1 Therapeutic Yoga Coaching', 'Custom postural correction, spine realignment, and gentle rehabilitation for desk workers.', '₹8,500 / 8 sessions', 'Private Coaching', 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Interactive Weekly Class Timetable & Mat Booking',
    'interactive_sub': 'Filter by practice style to view today’s available studio mats.',
    'interactive_html': '''
      <div style="max-width: 600px; margin: 0 auto;">
        <div class="form-group">
          <label>Select Practice Style</label>
          <select id="yStyle" class="form-ctrl" onchange="filterYogaTable()">
            <option value="All">All Daily Batches</option>
            <option value="Vinyasa">Morning Ashtanga Vinyasa (06:30 AM)</option>
            <option value="Hatha">Gentle Hatha & Pranayama (08:30 AM)</option>
            <option value="Yin">Evening Restorative Yin & Sound Bath (06:30 PM)</option>
          </select>
        </div>
        <div id="yBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border-color);">
            <div><strong>06:30 AM – 07:45 AM</strong><br><small style="color:var(--text-muted);">Ashtanga Vinyasa • Master Ananya</small></div>
            <span style="color:var(--accent); font-weight:700; font-size:13px;">3 Mats Left</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border-color);">
            <div><strong>08:30 AM – 09:30 AM</strong><br><small style="color:var(--text-muted);">Hatha Alignment & Pranayama</small></div>
            <span style="color:var(--accent); font-weight:700; font-size:13px;">5 Mats Left</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0;">
            <div><strong>06:30 PM – 07:45 PM</strong><br><small style="color:var(--text-muted);">Yin Yoga & Tibetan Singing Bowls</small></div>
            <span style="color:var(--accent); font-weight:700; font-size:13px;">2 Mats Left</span>
          </div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('Trial Mat')">Reserve Free Trial Mat</button>
      </div>''',
    'interactive_js': '''
      function filterYogaTable() {
        const s = document.getElementById('yStyle').value;
        alert('Showing live batch openings for: ' + s);
      }''',
    'process_head': 'The Shala Experience',
    'process_sub': 'Step away from commercial gym yoga into a space devoted solely to mindfulness and physical restoration.',
    'process_steps': [
        ('01', 'Shoe-Free Teakwood Entry', 'Enter a quiet, acoustic shala naturally scented with pure camphor and organic sandalwood.'),
        ('02', 'Alignment & Breath Grounding', 'Initial 10 minutes focused on nadi shodhana pranayama and spine mobilization.'),
        ('03', 'Guided Asana Practice', 'Hands-on gentle adjustments from certified masters respecting your natural anatomical range.'),
        ('04', 'Deep Savasana with Singing Bowls', 'Complete relaxation under acoustic Himalayan bell frequencies and organic herbal tea.')
    ],
    'gallery_head': 'The Studio Sanctuary',
    'gallery_sub': 'Natural sunlight, certified cork mats, and peaceful garden views.',
    'gallery_items': [
        ('Teakwood Main Shala', 'Practice Space', '1,800 sq.ft of natural teakwood flooring.', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=700&q=80'),
        ('Morning Asana Practice', 'Vinyasa', 'Sunrise sun salutations with mindful breath.', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80'),
        ('Sound Healing Bowls', 'Meditation', 'Hand-hammered singing bowls from Nepal.', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80'),
        ('Verandah Tea Lounge', 'Community', 'Post-class herbal infusions and quiet reading.', 'https://images.unsplash.com/photo-1552196563-552342340578?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'What Practitioners Say',
    'reviews_sub': 'Real experiences from practitioners across all levels of flexibility.',
    'reviews': [
        ('Shweta Balakrishnan', 'Member for 3 Years', 'Prana Shala is the purest yoga studio in Bangalore. No gimmicks or loud gym music. Just true alignment, deep peace, and brilliant teachers.'),
        ('Naveen Reddy', 'Tech Executive', 'I sit 10 hours a day and suffered from severe sciatica. 3 months of evening Yin Yoga restored my mobility completely.'),
        ('Maya Sen', 'Yoga Teacher Trainee', 'The depth of anatomy and pranayama taught here is unmatched. It feels like practicing in a peaceful ashram in Rishikesh.')
    ],
    'faqs_head': 'Frequently Asked Questions',
    'faqs': [
        ('I am not flexible at all. Can I still attend?', 'Absolutely! Yoga is not about touching your toes; it is about clearing stiffness and breathing properly. Beginners are gently supported with blocks and straps.'),
        ('Do I need to bring my own yoga mat?', 'We provide premium Manduka cork mats and organic cotton straps free of charge. You are also welcome to bring your personal mat.'),
        ('What are your monthly membership options?', 'We offer unlimited monthly passes (₹4,800/mo) and flexible 10-class packs (₹3,500, valid for 60 days).')
    ],
    'form_head': 'Reserve Your Complimentary Trial Mat',
    'form_sub': 'Experience your first class for free. We will WhatsApp you studio location and guidelines.',
    'form_fields': [
        ('Your Full Name', '<input type="text" class="form-ctrl" placeholder="Your name" required>'),
        ('WhatsApp Contact', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Preferred Practice Style & Time', '<select class="form-ctrl"><option>Morning Vinyasa (06:30 AM)</option><option>Evening Yin & Sound Bath (06:30 PM)</option><option>Gentle Hatha (08:30 AM)</option></select>')
    ],
    'themes': [
        {
            'id': 'raw-teak-sandalwood',
            'name': 'Raw Teakwood',
            'icon': '🪵',
            'bg_primary': '#f6f2ea',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#eee6d8',
            'text_primary': '#261e17',
            'text_muted': '#5c4e3f',
            'text_subtle': '#877562',
            'border_color': '#ddd2c0',
            'accent': '#965239',
            'accent_hover': '#7b3e2a',
            'accent_light': '#f5eae4',
            'badge_bg': '#ede2d5',
            'badge_text': '#6e3926',
            'radius': '14px',
            'font_heading': 'Cormorant Garamond',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(246, 242, 234, 0.95)',
            'shadow': '0 10px 30px rgba(50, 35, 20, 0.07)'
        },
        {
            'id': 'prana-indigo-dark',
            'name': 'Prana Indigo',
            'icon': '🧘',
            'bg_primary': '#070f14',
            'bg_surface': '#0e1c24',
            'bg_card': '#132630',
            'bg_card_hover': '#1b3442',
            'text_primary': '#f0fdfa',
            'text_muted': '#99f6e4',
            'text_subtle': '#5eead4',
            'border_color': 'rgba(20, 184, 166, 0.25)',
            'accent': '#14b8a6',
            'accent_hover': '#2dd4bf',
            'accent_light': 'rgba(20, 184, 166, 0.15)',
            'badge_bg': 'rgba(20, 184, 166, 0.18)',
            'badge_text': '#a7f3d0',
            'radius': '12px',
            'font_heading': 'Cinzel',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(7, 15, 20, 0.95)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'minimal-zen-paper',
            'name': 'Zen Paper',
            'icon': '🌿',
            'bg_primary': '#fafaf9',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f5f5f4',
            'text_primary': '#1c1917',
            'text_muted': '#57534e',
            'text_subtle': '#78716c',
            'border_color': '#e7e5e4',
            'accent': '#0d9488',
            'accent_hover': '#0f766e',
            'accent_light': '#ccfbf1',
            'badge_bg': '#ccfbf1',
            'badge_text': '#115e59',
            'radius': '8px',
            'font_heading': 'Outfit',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(250, 250, 249, 0.95)',
            'shadow': '0 8px 24px rgba(0,0,0,0.06)'
        }
    ]
}

generate_supreme_demo(yoga_data)
print("B2B, Fitness Coach, and Yoga supreme demos generated!")
