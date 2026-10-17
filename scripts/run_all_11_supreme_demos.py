import os
from generate_supreme_11_demos import generate_supreme_demo

# ==============================================================================
# 1. GYM & FITNESS CLUB
# ==============================================================================
gym_data = {
    'filename': '02_gym_fitness_club_demo.html',
    'title': 'IronVault Athletic Club | 24/7 Strength, Conditioning & Recovery',
    'niche_label': 'Gym & Fitness Club Demo',
    'brand_name': 'IRONVAULT',
    'brand_tagline': 'ATHLETIC CLUB & RECOVERY',
    'hero_badge': '⚡ Bangalore\'s Premier 24/7 Strength Facility',
    'h1': 'Built For Serious Lifters & Everyday Athletes',
    'subtitle': 'Competition Eleiko plates, 40-meter indoor sprint turf, infrared sauna suites, and elite strength biomechanics. Escape crowded commercial budget gyms.',
    'primary_cta': '🎟️ Claim 1-Day Free VIP Pass',
    'secondary_cta': 'Chat on WhatsApp',
    'hero_img': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    'stats': [('14,000', 'Sq.Ft Training Floor'), ('24/7', 'Biometric Turnstiles'), ('12', 'Competition Power Racks'), ('4.9 ★', 'Over 650+ Reviews')],
    'trust_logos': ['ELEIKO CERTIFIED', 'HAMMER STRENGTH OFFICIAL', 'CROSSFIT AFFILIATE', 'CONTRAST THERAPY SUITE'],
    'services_head': 'Engineered Training Zones & Facilities',
    'services_sub': 'Zero bottleneck floor planning with dedicated zones for powerlifting, HYROX, sprint conditioning, and luxury sauna recovery.',
    'services': [
        ('Heavy Strength & Power Racks', 'Calibrated steel plates, Texas power bars, chalk stations, and deadlift drop platforms.', '₹2,500 / mo', 'Strength Floor', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'),
        ('40m Functional Turf Track', 'Weighted sled pushes, kettlebells, Plyo boxes, rowing ergs, and high-intensity conditioning.', 'Included', 'Conditioning', 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80'),
        ('Contrast Therapy & Cold Plunge', 'Finnish cedarwood saunas and sub-5°C ice plunges for accelerated central nervous system recovery.', '₹1,200 / session', 'Recovery Suite', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80'),
        ('1-on-1 Elite Biomechanics Coaching', 'Custom periodization, movement screening, and direct nutritional macro prescription.', '₹8,000 / mo', 'Personal Training', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Instant 1-Day VIP Workout Pass Generator',
    'interactive_sub': 'Enter your name and preferred training slot to generate an instant barcode entry pass for your phone.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Your Full Name</label>
          <input type="text" id="gName" class="form-ctrl" placeholder="e.g. Rahul Verma" value="Rahul Verma">
        </div>
        <div class="form-group">
          <label>Primary Training Goal</label>
          <select id="gGoal" class="form-ctrl">
            <option>Powerlifting & Maximum Strength</option>
            <option>Hypertrophy & Muscle Building</option>
            <option>HYROX & Athletic Conditioning</option>
            <option>Mobility & Contrast Recovery</option>
          </select>
        </div>
        <div class="form-group">
          <label>Preferred Visit Timing</label>
          <select id="gSlot" class="form-ctrl">
            <option>Morning (06:00 AM – 10:00 AM)</option>
            <option>Afternoon (12:00 PM – 04:00 PM)</option>
            <option>Evening (05:00 PM – 09:00 PM)</option>
          </select>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="genGymPass()">Generate Barcode Guest Pass</button>
        <div id="gResult" style="display:none; margin-top:20px; background:rgba(255,255,255,0.06); border:1px dashed var(--accent); padding:20px; border-radius:12px; text-align:center;">
          <span style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:var(--accent); font-weight:700;">DIGITAL PASS ACTIVATED</span>
          <div style="font-size:26px; font-weight:800; letter-spacing:3px; margin:8px 0; color:var(--text-primary);" id="gCode">IV-7892-PASS</div>
          <p style="font-size:13px; margin:0; color:var(--text-muted);">Valid for 48 hours. Present at front desk for complimentary locker, towel, and training floor access.</p>
        </div>
      </div>''',
    'interactive_js': '''
      function genGymPass() {
        const code = "IV-" + Math.floor(1000 + Math.random() * 9000) + "-VIP";
        document.getElementById('gCode').innerText = code;
        document.getElementById('gResult').style.display = 'block';
      }''',
    'process_head': 'The IronVault Athlete Journey',
    'process_sub': 'How we guide our members from day one to consistent, long-term personal records.',
    'process_steps': [
        ('01', 'Biometric & Movement Scan', 'InBody 770 body composition analysis combined with joint mobility and squat mechanics screening.'),
        ('02', 'Target Periodization Plan', 'Structured 8-week progressive overload block matched directly to your current strength baseline.'),
        ('03', 'Form Execution & Nutrition', 'Real-time lifting technique adjustments and personalized non-restrictive macronutrient targets.'),
        ('04', 'Recovery & PR Benchmarking', 'Weekly contrast sauna recovery sessions and monthly rep-max strength benchmarking testing.')
    ],
    'gallery_head': 'Inside The IronVault Floor',
    'gallery_sub': 'State-of-the-art European equipment, spacious lifting zones, and zero crowded machine queues.',
    'gallery_items': [
        ('Heavy Dumbbells to 60kg', 'Free Weights', 'Cast iron calibrated dumbbells and adjustable benches.', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80'),
        ('Sprint & Prowler Turf', 'Conditioning', 'Custom high-density turf for high-velocity metabolic sprints.', 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=700&q=80'),
        ('Contrast Sauna Suite', 'Recovery', 'Infrared Finnish sauna with zero-chlorine cold plunge tanks.', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=700&q=80'),
        ('Olympic Lifting Platforms', 'Powerlifting', 'Solid oak inset platforms with competition bumper sets.', 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'Verified Athlete Reviews',
    'reviews_sub': 'Real feedback from powerlifters, desk workers, and everyday athletes.',
    'reviews': [
        ('Karan Deshmukh', 'Member for 2 Years', 'Cleanest gym in Bangalore by a mile. The equipment is competition-grade, chalk is encouraged, and the atmosphere makes you want to lift heavy.'),
        ('Priya Nambiar', 'CrossFit & HYROX Athlete', 'The turf track and cold plunge combination changed my recovery completely. Never waiting for a squat rack even at 7:00 PM.'),
        ('Anand Kulkarni', 'Senior Software Architect', 'Lost 14kg of pure fat in 6 months with their trainer protocol. Zero fluff, pure science and consistency.')
    ],
    'faqs_head': 'Frequently Asked Questions',
    'faqs': [
        ('Are you open 24 hours including public holidays?', 'Yes. Members have 24/7 biometric access 365 days a year with security personnel on site at all times.'),
        ('Is training floor chalk permitted?', 'Yes, liquid and block chalk are provided free at all lifting stations and platforms.'),
        ('How does the 1-Day Free Guest Pass work?', 'Generate your pass online, show the code at the front reception, and enjoy complete facility access including lockers and sauna.')
    ],
    'form_head': 'Claim Your Free Consultation & Studio Tour',
    'form_sub': 'Schedule an in-person facility walkthrough and complimentary body composition scan with our head coach.',
    'form_fields': [
        ('Full Name', '<input type="text" class="form-ctrl" placeholder="Your full name" required>'),
        ('Phone Number / WhatsApp', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Interested Program', '<select class="form-ctrl"><option>Annual Strength Membership</option><option>1-on-1 Personal Coaching</option><option>HYROX Group Conditioning</option></select>')
    ],
    'themes': [
        {
            'id': 'raw-iron-stealth',
            'name': 'Stealth Dark',
            'icon': '⚡',
            'bg_primary': '#09090b',
            'bg_surface': '#121215',
            'bg_card': '#18181b',
            'bg_card_hover': '#27272a',
            'text_primary': '#fafafa',
            'text_muted': '#a1a1aa',
            'text_subtle': '#71717a',
            'border_color': 'rgba(255, 255, 255, 0.12)',
            'accent': '#e11d48',
            'accent_hover': '#f43f5e',
            'accent_light': 'rgba(225, 29, 72, 0.15)',
            'badge_bg': 'rgba(225, 29, 72, 0.15)',
            'badge_text': '#fb7185',
            'radius': '12px',
            'font_heading': 'Syne',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(9, 9, 11, 0.94)',
            'shadow': '0 20px 40px rgba(0,0,0,0.7)'
        },
        {
            'id': 'nordic-athletic-slate',
            'name': 'Nordic Light',
            'icon': '🏔️',
            'bg_primary': '#f4f6f9',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f1f5f9',
            'text_primary': '#0f172a',
            'text_muted': '#334155',
            'text_subtle': '#64748b',
            'border_color': '#cbd5e1',
            'accent': '#0284c7',
            'accent_hover': '#0369a1',
            'accent_light': '#e0f2fe',
            'badge_bg': '#e2e8f0',
            'badge_text': '#0369a1',
            'radius': '10px',
            'font_heading': 'Space Grotesk',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(244, 246, 249, 0.95)',
            'shadow': '0 10px 30px rgba(15, 23, 42, 0.08)'
        },
        {
            'id': 'cyber-volt-black',
            'name': 'Cyber Volt',
            'icon': '🔋',
            'bg_primary': '#000000',
            'bg_surface': '#0a0a0a',
            'bg_card': '#111111',
            'bg_card_hover': '#1a1a1a',
            'text_primary': '#ffffff',
            'text_muted': '#9ca3af',
            'text_subtle': '#6b7280',
            'border_color': '#222222',
            'accent': '#84cc16',
            'accent_hover': '#a3e635',
            'accent_light': 'rgba(132, 204, 22, 0.15)',
            'badge_bg': '#1e293b',
            'badge_text': '#bef264',
            'radius': '4px',
            'font_heading': 'Syne',
            'font_body': 'Space Grotesk',
            'header_bg': 'rgba(0, 0, 0, 0.95)',
            'shadow': '0 0 30px rgba(132, 204, 22, 0.12)'
        }
    ]
}

generate_supreme_demo(gym_data)

# ==============================================================================
# 2. SPA & WELLNESS SANCTUARY
# ==============================================================================
spa_data = {
    'filename': '04_spa_wellness_sanctuary_demo.html',
    'title': 'Aura Luxury Day Spa & Ayurvedic Sanctuary | Sensory Restoration',
    'niche_label': 'Spa & Wellness Niche Demo',
    'brand_name': 'AURA SANCTUARY',
    'brand_tagline': 'HOLISTIC BOTANICAL WELLNESS',
    'hero_badge': '🌿 Private Garden Spa Suites & Hydrotherapy',
    'h1': 'Sensory Wellness Rituals For Mind & Body Stillness',
    'subtitle': 'Authentic Kerala Abhyanga, Balinese warm stone body rituals, and clinical botanical facials in private soundproof bamboo garden suites.',
    'primary_cta': '🕯️ Reserve Treatment Suite',
    'secondary_cta': 'Chat on WhatsApp',
    'hero_img': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    'stats': [('100%', 'Cold-Pressed Herbal Extracts'), ('8', 'Soundproof Garden Suites'), ('14 Yrs', 'Master Ayurvedic Healers'), ('4.9 ★', 'Over 520+ Reviews')],
    'trust_logos': ['AUTHENTIC AYURVEDIC LINEAGE', '100% ORGANIC ESSENTIAL OILS', 'SOUNDPROOF PRIVATE SUITES', 'STEAM & JACUZZI INCLUDED'],
    'services_head': 'Holistic Treatment Rituals',
    'services_sub': 'Every treatment is preceded by a personalized dosha assessment and followed by herbal floral foot soaks.',
    'services': [
        ('Authentic Kerala Abhyanga', 'Rhythmic full-body warm herbal oil massage to balance doshas and flush lymphatic toxins.', '₹3,400 / 60m', 'Ayurvedic Therapy', 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80'),
        ('Heated Basalt Stone Ritual', 'Volcanic basalt river stones steeped in sandalwood oil to dissolve deep chronic muscular tension.', '₹4,600 / 90m', 'Deep Recovery', 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'),
        ('VIP Couple Wellness Sanctuary', 'Private twin suite with floral bath, aromatic body scrub, dual massage, and private jacuzzi.', '₹8,900 / couple', 'Signature Couple', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'),
        ('Pure Botanical Glow Facial', 'Antioxidant-rich wild rosehip and gold leaf serums to deeply rehydrate and brighten skin tone.', '₹3,800 / 75m', 'Facial Aesthetics', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80')
    ],
    'interactive_head': 'Bespoke Therapy & Duration Selector',
    'interactive_sub': 'Select your wellness objective and treatment duration to view exact pricing and inclusions.',
    'interactive_html': '''
      <div style="max-width: 550px; margin: 0 auto;">
        <div class="form-group">
          <label>Select Therapy Focus</label>
          <select id="sFocus" class="form-ctrl" onchange="calcSpaPrice()">
            <option value="Abhyanga">Kerala Abhyanga & Shirodhara (De-Stress & Sleep)</option>
            <option value="Stone">Balinese Heated Stone Therapy (Muscular Relief)</option>
            <option value="Facial">Botanical Gold Glow Facial & Eye Lymphatic Drain</option>
            <option value="Couple">VIP Couple Rejuvenation (Full Suite & Jacuzzi)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Session Duration</label>
          <select id="sDur" class="form-ctrl" onchange="calcSpaPrice()">
            <option value="60">60 Minutes Sanctuary Session</option>
            <option value="90" selected>90 Minutes Signature Extended Ritual</option>
            <option value="120">120 Minutes Master Rejuvenation Journey</option>
          </select>
        </div>
        <div id="sPriceBox" style="background:rgba(255,255,255,0.06); padding:20px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border-color);">
          <div style="font-size:12px; text-transform:uppercase; color:var(--accent); font-weight:700;">ESTIMATED THERAPY PACKAGE:</div>
          <div style="font-size:28px; font-weight:800; margin:6px 0;" id="sPriceText">₹4,600</div>
          <div style="font-size:13px; color:var(--text-muted);">Includes private steam suite, organic herbal tea, and organic shower amenities.</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="scrollToForm('Spa Reservation')">Reserve Selected Therapy Slot</button>
      </div>''',
    'interactive_js': '''
      function calcSpaPrice() {
        const foc = document.getElementById('sFocus').value;
        const dur = document.getElementById('sDur').value;
        let p = 3400;
        if (dur === "90") p = 4600;
        if (dur === "120") p = 6200;
        if (foc === "Couple") p = dur === "60" ? 6800 : (dur === "90" ? 8900 : 11500);
        document.getElementById('sPriceText').innerText = "₹" + p.toLocaleString();
      }''',
    'process_head': 'The Fourfold Sanctuary Experience',
    'process_sub': 'Designed to transition you seamlessly from mental noise into deep nervous system restoration.',
    'process_steps': [
        ('01', 'Floral Foot Cleansing', 'A warm foot soak with Himalayan pink salt, peppermint oils, and marigold petals.'),
        ('02', 'Dosha & Pressure Consultation', 'Brief assessment of your tension points and custom selection of heated botanical oils.'),
        ('03', 'Continuous Flow Therapy', 'Uninterrupted therapeutic touch in a temperature-controlled soundproof private suite.'),
        ('04', 'Herbal Steam & Floral Infusion', 'Private eucalyptus steam bath followed by warm organic ginger-lemongrass infusion.')
    ],
    'gallery_head': 'The Sanctuary Spaces',
    'gallery_sub': 'Private treatment suites immersed in natural stone, teak wood, and organic greenery.',
    'gallery_items': [
        ('Garden Therapy Suites', 'Private Suite', 'Soundproof walls with private garden views.', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80'),
        ('Ayurvedic Brass Bowls', 'Ancient Craft', 'Pure brass vessels for warm medicinal oil drizzles.', 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=700&q=80'),
        ('Hydration Jacuzzi', 'Hydrotherapy', 'Infused with magnesium salts and therapeutic blooms.', 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=700&q=80'),
        ('Relaxation Lounge', 'Tea Garden', 'Organic post-treatment herbal tea verandah.', 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=700&q=80')
    ],
    'reviews_head': 'Client Experiences',
    'reviews_sub': 'Read genuine feedback from guests who found stillness at Aura.',
    'reviews': [
        ('Ananya Sen', 'Monthly Member', 'The moment the door closes behind you, the noise of Bangalore disappears. The Ayurvedic Abhyanga completely cured my chronic neck migraine.'),
        ('Vikramaditya Roy', 'Couple Suite Guest', 'Booked the VIP suite for our anniversary. The cleanliness, aromatherapy scent, and therapists were better than 5-star hotel spas in Dubai.'),
        ('Tanvi Chawla', 'Senior Architect', 'I spend 10 hours a day on site visits. Their heated stone massage is the only thing that resets my spine and posture.')
    ],
    'faqs_head': 'Guest Queries Answered',
    'faqs': [
        ('Are all treatment suites completely private?', 'Yes. Every suite includes its own private changing room, steam shower, and treatment area with absolute acoustic privacy.'),
        ('What oils are used during therapies?', 'We use exclusively 100% cold-pressed organic sesame, virgin coconut, and medicinal herbs sourced from organic certified farms in Kerala.'),
        ('How far in advance should I book for weekends?', 'Weekend appointments typically fill 3 to 4 days in advance. We recommend reserving mid-week for guaranteed evening slots.')
    ],
    'form_head': 'Reserve Your Therapy Suite',
    'form_sub': 'Our spa concierge will contact you via WhatsApp within 10 minutes to confirm therapist availability and room setup.',
    'form_fields': [
        ('Guest Full Name', '<input type="text" class="form-ctrl" placeholder="Your name" required>'),
        ('WhatsApp Contact', '<input type="tel" class="form-ctrl" placeholder="+91 98765 43210" required>'),
        ('Preferred Treatment & Time', '<select class="form-ctrl"><option>Ayurvedic Abhyanga (90m)</option><option>Heated Stone Therapy (90m)</option><option>VIP Couple Sanctuary (120m)</option></select>')
    ],
    'themes': [
        {
            'id': 'zen-botanical-linen',
            'name': 'Botanical Zen',
            'icon': '🌿',
            'bg_primary': '#f7f5ee',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f0ebe1',
            'text_primary': '#191512',
            'text_muted': '#4a423a',
            'text_subtle': '#6e6459',
            'border_color': '#ddd4c4',
            'accent': '#1b4d3e',
            'accent_hover': '#13392e',
            'accent_light': '#e8f0ec',
            'badge_bg': '#e4ece8',
            'badge_text': '#1b4d3e',
            'radius': '16px',
            'font_heading': 'Cormorant Garamond',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(247, 245, 238, 0.94)',
            'shadow': '0 10px 30px rgba(50, 40, 25, 0.08)'
        },
        {
            'id': 'obsidian-spa-twilight',
            'name': 'Obsidian Twilight',
            'icon': '🕯️',
            'bg_primary': '#0b100d',
            'bg_surface': '#121a15',
            'bg_card': '#16201a',
            'bg_card_hover': '#1e2b23',
            'text_primary': '#f4fbf7',
            'text_muted': '#c4d7cc',
            'text_subtle': '#8da597',
            'border_color': 'rgba(16, 185, 129, 0.22)',
            'accent': '#10b981',
            'accent_hover': '#34d399',
            'accent_light': 'rgba(16, 185, 129, 0.15)',
            'badge_bg': 'rgba(16, 185, 129, 0.15)',
            'badge_text': '#6ee7b7',
            'radius': '12px',
            'font_heading': 'Cinzel',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(11, 16, 13, 0.94)',
            'shadow': '0 20px 48px rgba(0, 0, 0, 0.7)'
        },
        {
            'id': 'minimal-travertine-sand',
            'name': 'Nordic Sand',
            'icon': '🪵',
            'bg_primary': '#faf9f6',
            'bg_surface': '#ffffff',
            'bg_card': '#ffffff',
            'bg_card_hover': '#f4f2ec',
            'text_primary': '#1c1917',
            'text_muted': '#57534e',
            'text_subtle': '#78716c',
            'border_color': '#e7e5e4',
            'accent': '#d97706',
            'accent_hover': '#b45309',
            'accent_light': '#fef3c7',
            'badge_bg': '#fef3c7',
            'badge_text': '#92400e',
            'radius': '8px',
            'font_heading': 'Outfit',
            'font_body': 'Plus Jakarta Sans',
            'header_bg': 'rgba(250, 249, 246, 0.95)',
            'shadow': '0 12px 32px rgba(28, 25, 23, 0.06)'
        }
    ]
}

generate_supreme_demo(spa_data)
print("Gym and Spa supreme demos written!")
