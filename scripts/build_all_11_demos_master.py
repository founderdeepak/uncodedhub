"""
Complete Master Runner for all 11 Supreme Niche Demos.
Includes niches 01 through 11 with complete Questionnaire and Customer Saga alignment.
"""

from generate_all_11_supreme_demos_master import render_page, OUT_DIR
import os

all_niches = []

# 01. EDUCATIONAL ACADEMY
all_niches.append({
    "key": "edu",
    "filename": "01_educational_academy_demo.html",
    "title": "Apex International Academy | STEM, Olympiad & Competitive Board Rankers",
    "meta_desc": "Small 15-student smart batches, daily doubt clearing, AI-driven test analytics, and concept-first faculty from top IITs and Medical institutions.",
    "niche_label": "Education & Coaching Academy",
    "brand_name": "APEX ACADEMY",
    "brand_tagline": "ACADEMIC MASTERY & STEM EXCELLENCE",
    "hero_badge": "🏆 Ranked #1 Academic Coaching Academy for Classes 8–12",
    "h1": "Where Ambitious Students Become National Rankers",
    "subtitle": "Small 15-student smart batches, daily 1-on-1 doubt counters, AI test analytics, and concept-first faculty from IITs and Medical institutions. Escape crowded 100-student factories.",
    "primary_cta": "📊 Calculate Tuition & Scholarship",
    "secondary_cta": "Book Free 1-Day Demo Class",
    "hero_img": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    "stats": [("98.6%", "Board Exam Top 5% Rate"), ("1:15", "Student-to-Teacher Ratio"), ("480+", "NEET & JEE Selections"), ("15 Yrs", "Academic Track Record")],
    "trust_badges": ["CBSE & ICSE AFFILIATED", "IITian & DOCTOR FACULTY", "DAILY 1-ON-1 DOUBT DESK", "AI PROGRESS TRACKER APP"],
    "services_head": "Comprehensive Academic Programs",
    "services_sub": "Engineered for conceptual depth, rapid numerical problem-solving, and disciplined exam temperament.",
    "services": [
        ("Class 10th Board Intensive", "Complete NCERT exemplar mastery, weekly board simulation tests, and personalized weak-area revision.", "₹38,000 / year", "Secondary School", "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"),
        ("IIT-JEE Main & Advanced Integrated", "Advanced mechanics, calculus, organic reaction maps, daily practice problem sets, and All-India test benchmarking.", "₹68,000 / year", "Engineering Entrance", "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"),
        ("NEET-UG Medical Excellence", "Complete NCERT line-by-line biology diagrams, chemical bonding mastery, and 3-hour speed test marathons.", "₹72,000 / year", "Medical Entrance", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"),
        ("Foundation & Olympiads (Class 8–9)", "Mathematical reasoning, NTSE aptitude, robotics, and early conceptual grounding without rote memorization.", "₹32,000 / year", "Junior Foundation", "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Smart Tuition & Scholarship Eligibility Calculator",
    "interactive_sub": "Select your child's current grade, target stream, and previous percentage to see recommended batches and eligible fee concessions.",
    "interactive_html": """
      <div style="max-width: 580px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Target Class / Standard</label>
          <select id="eduGrade" class="form-ctrl" onchange="calcEduFee()">
            <option value="10">Class 10th Boards (CBSE / ICSE)</option>
            <option value="11-jee" selected>Class 11th - JEE Main & Advanced</option>
            <option value="11-neet">Class 11th - NEET Medical</option>
            <option value="12-jee">Class 12th - JEE Crash Course</option>
          </select>
        </div>
        <div class="form-group">
          <label>Previous Year Score Range (%)</label>
          <select id="eduScore" class="form-ctrl" onchange="calcEduFee()">
            <option value="95">95% and above (Eligible for 25% Merit Scholarship)</option>
            <option value="85" selected>85% - 94% (Eligible for 15% Academic Concession)</option>
            <option value="75">75% - 84% (Standard Enrollment)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Batch Preference</label>
          <select id="eduBatch" class="form-ctrl" onchange="calcEduFee()">
            <option value="morning">Morning Fast-Track (06:30 AM – 08:30 AM)</option>
            <option value="evening" selected>Evening Regular (04:30 PM – 07:30 PM)</option>
            <option value="weekend">Weekend Intensive (Saturday & Sunday)</option>
          </select>
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); text-align: center; margin-top: 20px;">
          <div style="font-size: 13px; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">ESTIMATED ANNUAL FEE AFTER SCHOLARSHIP</div>
          <div id="eduResult" style="font-size: 32px; font-weight: 800; color: var(--accent); font-family: var(--font-heading); margin: 6px 0;">₹57,800 / year</div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">Includes printed study modules, daily practice sheets, test series & 1-on-1 doubt counters.</p>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('Scholarship Counseling Booking')">Lock In Scholarship & Book Demo Seat</button>
      </div>""",
    "interactive_js": """
      function calcEduFee() {
        const grade = document.getElementById('eduGrade').value;
        const score = document.getElementById('eduScore').value;
        let base = 68000;
        if (grade === '10') base = 38000;
        if (grade === '11-neet') base = 72000;
        if (grade === '12-jee') base = 75000;
        
        let discount = 0;
        if (score === '95') discount = 0.25;
        else if (score === '85') discount = 0.15;
        
        const finalFee = Math.round(base * (1 - discount));
        document.getElementById('eduResult').innerText = "₹" + finalFee.toLocaleString('en-IN') + " / year";
      }""",
    "process_head": "The 4-Step Academic Blueprint",
    "process_sub": "How we take students from conceptual confusion to confident top rankers without academic burnout.",
    "process_steps": [
        ("01", "Diagnostic Assessment", "Comprehensive 45-minute baseline test to identify core physics, math, and chemistry conceptual gaps."),
        ("02", "15-Student Micro Batching", "Personalized placement in curated smart classrooms where every student has direct eye contact with senior mentors."),
        ("03", "Daily Practice & Doubt Desk", "Solving 30 Daily Practice Problems (DPPs) daily, with mandatory 1-on-1 faculty doubt clearance."),
        ("04", "Simulated Ranker Benchmarking", "Weekly computer-based mock tests with All-India ranking analytics and parent progress reports.")
    ],
    "reviews_head": "Verified Parent & Ranker Testimonials",
    "reviews_sub": "Real feedback from students and families who achieved their dream college admissions.",
    "reviews": [
        ("Dr. Rajeshwar Sharma", "Parent of NEET AIR 412", "We pulled our daughter out of a corporate coaching factory of 120 students. Apex Academy gave her personal faculty attention, and she cleared NEET in her first attempt with 682/720."),
        ("Aditya Vardhan", "JEE Advanced AIR 890", "The doubt-clearing counter is unmatched. Whenever I was stuck in electrodynamics or organic synthesis, the teachers sat with me until the concept clicked."),
        ("Sunita Mehra", "Mother of Class 10 CBSE 98.4%", "The small batch size of 15 made all the difference. My son was never shy to ask questions, and his board exam confidence was phenomenal.")
    ],
    "faqs": [
        ("What is your student-to-teacher batch ratio?", "We enforce a strict maximum cap of 15 to 18 students per classroom. Unlike corporate coaching centers with 100+ students, every student is known personally by faculty."),
        ("Do teachers change mid-term?", "No. All our core faculty are full-time permanent IITians and senior postgraduates who teach the batch continuously from Day 1 to final examinations."),
        ("What happens if my child misses a class due to illness?", "Every smart lecture is recorded in high definition and accessible on our student portal, followed by an in-person catch-up session at our doubt desk."),
        ("Can we attend a free trial class before enrolling?", "Yes. We offer a 1-day complimentary diagnostic lecture and campus tour for prospective students and parents.")
    ],
    "form_head": "Schedule Your Free Campus Tour & Counseling",
    "form_sub": "Meet our senior faculty, tour the smart classrooms, and receive a customized 12-month study roadmap for your child.",
    "default_service_inquiry": "Class 11th - JEE Main & Advanced",
    "themes": [
        {
            "id": "oxford-academic-navy",
            "name": "Oxford Collegiate",
            "icon": "🎓",
            "bg_primary": "#F8FAFC",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F1F5F9",
            "text_primary": "#0F172A",
            "text_muted": "#334155",
            "text_subtle": "#64748B",
            "border_color": "#E2E8F0",
            "accent": "#1E40AF",
            "accent_hover": "#1D4ED8",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(30, 64, 175, 0.12)",
            "badge_bg": "#DBEAFE",
            "badge_text": "#1E40AF",
            "radius": "10px",
            "font_heading": "Cormorant Garamond",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(248, 250, 252, 0.95)",
            "shadow": "0 10px 30px rgba(15, 23, 42, 0.08)"
        },
        {
            "id": "cyber-stem-dark",
            "name": "Cyber STEM",
            "icon": "⚡",
            "bg_primary": "#070D18",
            "bg_surface": "#0E1726",
            "bg_card": "#142033",
            "bg_card_hover": "#1B2C45",
            "text_primary": "#F1F5F9",
            "text_muted": "#CBD5E1",
            "text_subtle": "#94A3B8",
            "border_color": "rgba(56, 189, 248, 0.2)",
            "accent": "#0284C7",
            "accent_hover": "#38BDF8",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(2, 132, 199, 0.15)",
            "badge_bg": "rgba(2, 132, 199, 0.18)",
            "badge_text": "#7DD3FC",
            "radius": "6px",
            "font_heading": "Space Grotesk",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(7, 13, 24, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.7)"
        },
        {
            "id": "campus-clarity-emerald",
            "name": "Campus Emerald",
            "icon": "🌿",
            "bg_primary": "#FAFAF9",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F5F5F4",
            "text_primary": "#1C1917",
            "text_muted": "#44403C",
            "text_subtle": "#78716C",
            "border_color": "#E7E5E4",
            "accent": "#059669",
            "accent_hover": "#047857",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(5, 150, 105, 0.12)",
            "badge_bg": "#D1FAE5",
            "badge_text": "#065F46",
            "radius": "16px",
            "font_heading": "Syne",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(250, 250, 249, 0.95)",
            "shadow": "0 8px 24px rgba(0,0,0,0.06)"
        }
    ]
})

# 02. GYM & FITNESS CLUB
all_niches.append({
    "key": "gym",
    "filename": "02_gym_fitness_club_demo.html",
    "title": "IronVault Athletic Club | 24/7 Strength, Conditioning & Recovery",
    "meta_desc": "14,000 sq.ft of competition Eleiko plates, Hammer Strength rigs, 40m sprint turf, and cold plunge recovery suites. Bangalore's premier fitness destination.",
    "niche_label": "Gym & Fitness Club",
    "brand_name": "IRONVAULT",
    "brand_tagline": "ATHLETIC CLUB & RECOVERY",
    "hero_badge": "⚡ Bangalore's Premier 24/7 Strength Facility",
    "h1": "Built For Serious Lifters & Everyday Athletes",
    "subtitle": "Competition Eleiko plates, 40-meter indoor sprint turf, infrared sauna suites, and certified strength coaches. Escape crowded commercial budget gyms.",
    "primary_cta": "🎟️ Claim 1-Day Free VIP Pass",
    "secondary_cta": "View Membership Plans",
    "hero_img": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    "stats": [("14,000", "Sq.Ft Training Floor"), ("24/7", "Biometric Member Access"), ("12", "Competition Power Racks"), ("4.9 ★", "Over 650+ Reviews")],
    "trust_badges": ["ELEIKO CERTIFIED", "HAMMER STRENGTH OFFICIAL", "CROSSFIT AFFILIATE", "CONTRAST THERAPY SUITE"],
    "services_head": "Engineered Training Zones & Facilities",
    "services_sub": "Zero bottleneck floor planning with dedicated zones for powerlifting, HYROX, sprint conditioning, and luxury sauna recovery.",
    "services": [
        ("Heavy Strength & Power Racks", "Calibrated steel plates, Texas power bars, chalk stations, and deadlift drop platforms.", "₹2,500 / mo", "Strength Floor", "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"),
        ("40m Functional Turf Track", "Weighted sled pushes, kettlebells, Plyo boxes, rowing ergs, and high-intensity conditioning.", "Included", "Conditioning", "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80"),
        ("Contrast Therapy & Cold Plunge", "Finnish cedarwood saunas and sub-5°C ice plunges for accelerated central nervous system recovery.", "₹1,200 / session", "Recovery Suite", "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"),
        ("1-on-1 Elite Biomechanics Coaching", "Custom periodization, movement screening, and direct nutritional macro prescription.", "₹8,000 / mo", "Personal Training", "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Instant 1-Day VIP Workout Pass Generator",
    "interactive_sub": "Enter your name and preferred training slot to generate an instant QR barcode guest pass for your phone.",
    "interactive_html": """
      <div style="max-width: 550px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
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
        <button class="btn btn-primary" style="width:100%; margin-top: 10px;" onclick="genGymPass()">Generate Barcode Guest Pass</button>
        <div id="gResult" style="display:none; margin-top:20px; background:var(--bg-surface); border:1px dashed var(--accent); padding:20px; border-radius:var(--radius); text-align:center;">
          <span style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:var(--accent); font-weight:700;">DIGITAL PASS ACTIVATED</span>
          <div style="font-size:26px; font-weight:800; letter-spacing:3px; margin:8px 0; color:var(--text-primary); font-family:var(--font-heading);" id="gCode">IV-7892-PASS</div>
          <p style="font-size:13px; margin:0; color:var(--text-muted);">Valid for 48 hours. Present at front reception for complimentary locker, towel, and training floor access.</p>
        </div>
      </div>""",
    "interactive_js": """
      function genGymPass() {
        const code = "IV-" + Math.floor(1000 + Math.random() * 9000) + "-VIP";
        document.getElementById('gCode').innerText = code;
        document.getElementById('gResult').style.display = 'block';
      }""",
    "process_head": "The IronVault Member Experience",
    "process_sub": "How we guide our members from day one to consistent, long-term personal records.",
    "process_steps": [
        ("01", "Biometric & Movement Scan", "InBody 770 body composition analysis combined with joint mobility and squat mechanics screening."),
        ("02", "Target Periodization Plan", "Structured 8-week progressive overload block matched directly to your current strength baseline."),
        ("03", "Form Execution & Nutrition", "Real-time lifting technique adjustments and personalized non-restrictive macronutrient targets."),
        ("04", "Recovery & PR Benchmarking", "Weekly contrast sauna recovery sessions and monthly rep-max strength benchmarking testing.")
    ],
    "reviews_head": "Verified Member Reviews",
    "reviews_sub": "Real feedback from powerlifters, desk workers, and everyday athletes.",
    "reviews": [
        ("Karan Deshmukh", "Member for 2 Years", "Cleanest gym in Bangalore by a mile. The equipment is competition-grade, chalk is encouraged, and the atmosphere makes you want to lift heavy."),
        ("Priya Nambiar", "CrossFit & HYROX Athlete", "The turf track and cold plunge combination changed my recovery completely. Never waiting for a squat rack even at 7:00 PM."),
        ("Anand Kulkarni", "Senior Software Architect", "Lost 14kg of pure fat in 6 months with their trainer protocol. Zero fluff, pure science and consistency.")
    ],
    "faqs": [
        ("Are you open 24 hours including public holidays?", "Yes. Members have 24/7 biometric access 365 days a year with security personnel on site at all times."),
        ("Is training floor chalk permitted?", "Yes, liquid and block chalk are provided free at all lifting stations and platforms."),
        ("How does the 1-Day Free Guest Pass work?", "Generate your pass online, show the code at the front reception, and enjoy complete facility access including lockers and sauna."),
        ("Do you offer freeze options if I travel for work?", "Yes, members on quarterly and annual memberships can freeze up to 60 days without penalty.")
    ],
    "form_head": "Claim Your Free Consultation & Studio Tour",
    "form_sub": "Schedule an in-person facility walkthrough and complimentary body composition scan with our head coach.",
    "default_service_inquiry": "Annual Strength Membership",
    "themes": [
        {
            "id": "raw-iron-stealth",
            "name": "Stealth Dark",
            "icon": "⚡",
            "bg_primary": "#09090B",
            "bg_surface": "#121215",
            "bg_card": "#18181B",
            "bg_card_hover": "#27272A",
            "text_primary": "#FAFAFA",
            "text_muted": "#A1A1AA",
            "text_subtle": "#71717A",
            "border_color": "rgba(255, 255, 255, 0.12)",
            "accent": "#E11D48",
            "accent_hover": "#F43F5E",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(225, 29, 72, 0.15)",
            "badge_bg": "rgba(225, 29, 72, 0.15)",
            "badge_text": "#FB7185",
            "radius": "8px",
            "font_heading": "Syne",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(9, 9, 11, 0.94)",
            "shadow": "0 20px 40px rgba(0,0,0,0.7)"
        },
        {
            "id": "nordic-athletic-slate",
            "name": "Nordic Slate",
            "icon": "🏔️",
            "bg_primary": "#F4F6F9",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F1F5F9",
            "text_primary": "#0F172A",
            "text_muted": "#334155",
            "text_subtle": "#64748B",
            "border_color": "#CBD5E1",
            "accent": "#0284C7",
            "accent_hover": "#0369A1",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(2, 132, 199, 0.12)",
            "badge_bg": "#E2E8F0",
            "badge_text": "#0369A1",
            "radius": "12px",
            "font_heading": "Space Grotesk",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(244, 246, 249, 0.95)",
            "shadow": "0 10px 30px rgba(15, 23, 42, 0.08)"
        },
        {
            "id": "cyber-volt-black",
            "name": "Cyber Volt",
            "icon": "🔋",
            "bg_primary": "#000000",
            "bg_surface": "#0A0A0A",
            "bg_card": "#111111",
            "bg_card_hover": "#1A1A1A",
            "text_primary": "#FFFFFF",
            "text_muted": "#9CA3AF",
            "text_subtle": "#6B7280",
            "border_color": "#222222",
            "accent": "#84CC16",
            "accent_hover": "#A3E635",
            "accent_contrast": "#000000",
            "accent_light": "rgba(132, 204, 22, 0.15)",
            "badge_bg": "#1E293B",
            "badge_text": "#BEF264",
            "radius": "0px",
            "font_heading": "Syne",
            "font_body": "Space Grotesk",
            "header_bg": "rgba(0, 0, 0, 0.95)",
            "shadow": "4px 4px 0px #84CC16"
        }
    ]
})

# 03. B2B & CORPORATE BUSINESS PORTFOLIO
all_niches.append({
    "key": "b2b",
    "filename": "03_business_portfolio_demo.html",
    "title": "Vektor Enterprise Solutions | B2B Engineering, Cloud & Logistics Architecture",
    "meta_desc": "Enterprise digital transformation, ISO 27001 certified cloud infrastructure, and industrial automation for Fortune 500 and high-growth corporations.",
    "niche_label": "B2B & Corporate Portfolio",
    "brand_name": "VEKTOR CORP",
    "brand_tagline": "ENTERPRISE SYSTEMS & CLOUD ARCHITECTURE",
    "hero_badge": "🛡️ ISO 9001 & ISO 27001 Certified Enterprise Partner",
    "h1": "Mission-Critical Systems Built For Enterprise Scale",
    "subtitle": "Turnkey cloud engineering, logistics optimization, and industrial automation backed by 99.98% SLA guarantees. Zero junior handoffs, delivered by senior enterprise partners.",
    "primary_cta": "📄 Request RFP & Capabilities Deck",
    "secondary_cta": "Schedule Executive Consultation",
    "hero_img": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "stats": [("99.98%", "System Uptime SLA"), ("₹140 Cr+", "Client Operational Savings"), ("45+", "Active Enterprise Retainers"), ("18 Yrs", "Industrial Track Record")],
    "trust_badges": ["ISO 27001 CERTIFIED", "SOC 2 TYPE II COMPLIANT", "DUN & BRADSTREET REGISTERED", "PAN-INDIA DEPLOYMENT"],
    "services_head": "Core Enterprise Capabilities",
    "services_sub": "Rigorous engineering frameworks designed to eliminate operational friction and modernize legacy business workflows.",
    "services": [
        ("Cloud Infrastructure Modernization", "High-throughput microservices, AWS/Azure hybrid migration, and automated zero-downtime CI/CD pipelines.", "₹4.5L / engagement", "Cloud Systems", "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"),
        ("Supply Chain & Logistics Telematics", "IoT fleet tracking, real-time warehouse route optimization, and automated inventory sync architectures.", "₹6.0L / deployment", "Supply Chain", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"),
        ("Enterprise ERP & SAP Integration", "Seamless bi-directional data pipelines bridging legacy ERPs with modern cloud reporting dashboards.", "₹3.8L / project", "Enterprise Data", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"),
        ("24/7 Managed NOC & Security Operations", "Proactive intrusion detection, automated threat isolation, and 15-minute emergency incident escalation.", "₹1.8L / mo", "Managed Services", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Enterprise Scope & SLA Configurator",
    "interactive_sub": "Select your organizational parameters to generate an instant estimate of project scope, SLA tier, and implementation timeline.",
    "interactive_html": """
      <div style="max-width: 600px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Primary Transformation Scope</label>
          <select id="bScope" class="form-ctrl" onchange="calcB2B()">
            <option value="cloud">Cloud Migration & Multi-Region Resiliency</option>
            <option value="erp" selected>Legacy ERP Integration & Automated Pipelines</option>
            <option value="noc">24/7 Managed NOC & SOC Operations</option>
          </select>
        </div>
        <div class="form-group">
          <label>User / Endpoint Scale</label>
          <select id="bScale" class="form-ctrl" onchange="calcB2B()">
            <option value="sme">Mid-Market (500 – 2,500 active employees)</option>
            <option value="ent" selected>Enterprise (2,500 – 15,000 active employees)</option>
            <option value="corp">Global Corporation (15,000+ endpoints)</option>
          </select>
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); margin-top: 20px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">RECOMMENDED ENGAGEMENT SPRINT</div>
          <div id="bResult" style="font-size: 26px; font-weight: 800; color: var(--accent); font-family: var(--font-heading); margin: 6px 0;">8-Week Turnkey Enterprise Sprint</div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">Includes architectural blueprint, full migration staging, penetration testing & 24/7 dedicated lead engineer.</p>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('Enterprise RFP Inquiry')">Submit Scope For Official Formal RFP Proposal</button>
      </div>""",
    "interactive_js": """
      function calcB2B() {
        const scope = document.getElementById('bScope').value;
        const scale = document.getElementById('bScale').value;
        let res = "6-Week Fast-Track Sprint";
        if (scale === 'ent') res = "8-Week Turnkey Enterprise Sprint";
        if (scale === 'corp') res = "12-Week Multi-Phase Modernization";
        document.getElementById('bResult').innerText = res;
      }""",
    "process_head": "Enterprise Governance Lifecycle",
    "process_sub": "Strict operational compliance with zero disruption to active business operations.",
    "process_steps": [
        ("01", "NDA & Architecture Discovery", "Comprehensive audit of legacy infrastructure, compliance parameters, and security vulnerabilities."),
        ("02", "Solution Blueprint & SLA Lock", "Fixed-price commercial agreement with documented uptime, response time, and penalty guarantees."),
        ("03", "Parallel Staging Deployment", "Testing deployment in isolated sandbox worktrees with zero downtime to production workflows."),
        ("04", "Production Handoff & 24/7 SLA", "Formal operational handover, internal team training, and continuous 24/7 monitoring oversight.")
    ],
    "reviews_head": "Corporate Partner Endorsements",
    "reviews_sub": "Feedback from CTOs, procurement directors, and industrial operations heads.",
    "reviews": [
        ("Siddharth Nambiar", "VP of Engineering, Logistics Unicorn", "Vektor modernized our freight allocation engine in 7 weeks flat. We achieved 99.99% availability during festive peak shipping volumes with zero downtime."),
        ("Meera Singhania", "Chief Information Officer, Auto Components", "Their senior engineers don't hide behind account managers. Clean code, rigorous documentation, and total adherence to SOC 2 compliance."),
        ("Arunachalam V.", "Director of Supply Chain, FMCG Major", "Saved our operations ₹1.8 Crore in annual AWS server waste while doubling our reporting pipeline throughput.")
    ],
    "faqs": [
        ("Do you work under strict mutual non-disclosure agreements (NDAs)?", "Yes. We execute comprehensive legal NDAs prior to accessing any architectural specifications or enterprise repositories."),
        ("Can we migrate legacy databases without taking our operations offline?", "Yes, we deploy real-time change data capture (CDC) pipelines that sync data continuously until cutover, resulting in zero business downtime."),
        ("What are your enterprise support SLAs?", "Our master service agreement guarantees 15-minute initial response times for Critical P1 incidents with dedicated senior escalation engineers on duty 24/7.")
    ],
    "form_head": "Initiate Enterprise Procurement Review",
    "form_sub": "Share your project parameters to receive a detailed technical proposal, compliance pack, and executive consultation within 24 hours.",
    "default_service_inquiry": "Enterprise Cloud & Systems Modernization",
    "themes": [
        {
            "id": "blue-chip-corporate-navy",
            "name": "Corporate Navy",
            "icon": "🏢",
            "bg_primary": "#F8FAFC",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F1F5F9",
            "text_primary": "#0A192F",
            "text_muted": "#334155",
            "text_subtle": "#64748B",
            "border_color": "#E2E8F0",
            "accent": "#0A2540",
            "accent_hover": "#2563EB",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(37, 99, 235, 0.12)",
            "badge_bg": "#E2E8F0",
            "badge_text": "#0A2540",
            "radius": "8px",
            "font_heading": "Plus Jakarta Sans",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(248, 250, 252, 0.95)",
            "shadow": "0 10px 30px rgba(10, 25, 47, 0.08)"
        },
        {
            "id": "obsidian-enterprise-dark",
            "name": "Obsidian Dark",
            "icon": "💎",
            "bg_primary": "#0B0F17",
            "bg_surface": "#111827",
            "bg_card": "#182234",
            "bg_card_hover": "#202E46",
            "text_primary": "#F9FAFB",
            "text_muted": "#D1D5DB",
            "text_subtle": "#9CA3AF",
            "border_color": "rgba(255, 255, 255, 0.12)",
            "accent": "#E5C378",
            "accent_hover": "#F2D998",
            "accent_contrast": "#0B0F17",
            "accent_light": "rgba(229, 195, 120, 0.15)",
            "badge_bg": "rgba(229, 195, 120, 0.16)",
            "badge_text": "#F2D998",
            "radius": "6px",
            "font_heading": "Cinzel",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(11, 15, 23, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.7)"
        },
        {
            "id": "swiss-minimalist-monochrome",
            "name": "Swiss Mono",
            "icon": "📐",
            "bg_primary": "#FFFFFF",
            "bg_surface": "#F8FAFC",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F1F5F9",
            "text_primary": "#050505",
            "text_muted": "#262626",
            "text_subtle": "#525252",
            "border_color": "#050505",
            "accent": "#0F52BA",
            "accent_hover": "#0A3B85",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(15, 82, 186, 0.12)",
            "badge_bg": "#050505",
            "badge_text": "#FFFFFF",
            "radius": "0px",
            "font_heading": "Space Grotesk",
            "font_body": "Space Grotesk",
            "header_bg": "#FFFFFF",
            "shadow": "4px 4px 0px #050505"
        }
    ]
})

# 04. SPA & LUXURY WELLNESS SANCTUARY
all_niches.append({
    "key": "spa",
    "filename": "04_spa_wellness_sanctuary_demo.html",
    "title": "Elysian Serenity & Botanical Sanctuary | Luxury Day Spa & Couple Suites",
    "meta_desc": "Private steam couple suites, certified Balinese & Ayurvedic healers, 100% cold-pressed organic botanical oils. Escape urban exhaustion in Jubilee Hills.",
    "niche_label": "Spa & Luxury Wellness Sanctuary",
    "brand_name": "ELYSIAN SPA",
    "brand_tagline": "BOTANICAL WELLNESS & REJUVENATION",
    "hero_badge": "🌿 Rated Best Luxury Day Spa Sanctuary 2026",
    "h1": "Restore Inner Stillness In A World That Never Stops",
    "subtitle": "Private heated couple suites, authentic Ayurvedic Shirodhara, and therapeutic Balinese deep tissue bodywork using pure cold-pressed botanicals. Escape corporate exhaustion.",
    "primary_cta": "🌸 Customize Your Relaxation Ritual",
    "secondary_cta": "Reserve via WhatsApp Concierge",
    "hero_img": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "stats": [("100%", "Cold-Pressed Botanical Oils"), ("8", "Private Soundproof Suites"), ("12+", "Certified Master Healers"), ("4.95 ★", "420+ Discerning Guests")],
    "trust_badges": ["ORGANIC ECO-CERTIFIED OILS", "PRIVATE COUPLE SUITES", "HEATED MARBLE STEAM SUITES", "ZERO COMMERCIAL UPSELLING"],
    "services_head": "Signature Restorative Rituals",
    "services_sub": "Curated by master healers to melt chronic muscular tension and induce deep neurological calm.",
    "services": [
        ("Balinese Deep Tissue Tension Melt", "Warm organic coconut oil, acupressure palm rolling, and rhythmic muscular release for chronic lower back and shoulder knots.", "₹3,800 / 75 min", "Signature Bodywork", "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"),
        ("Royal Ayurvedic Shirodhara & Abhyanga", "Continuous stream of warm medicated herbal oil over the third eye, accompanied by synchronised full-body circulation massage.", "₹5,200 / 90 min", "Traditional Ayurveda", "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80"),
        ("Couple Sanctuary Romance Ritual", "Private dual therapy suite, eucalyptus steam shower, Himalayan rose salt body polish, and rose petal jacuzzi soak.", "₹9,500 / 120 min", "Private Couple Suite", "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80"),
        ("Tibetan Sound Healing & Detox Scrub", "Handcrafted singing bowls acoustic vibration therapy combined with wild lemongrass sea salt exfoliating skin polish.", "₹4,200 / 75 min", "Holistic Healing", "https://images.unsplash.com/photo-1512290900672-1f41d017a584?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Bespoke Aromatherapy & Ritual Builder",
    "interactive_sub": "Select your tension zone and preferred essential oil blend to preview your tailored therapy journey.",
    "interactive_html": """
      <div style="max-width: 580px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Primary Tension / Decompression Focus</label>
          <select id="spaTension" class="form-ctrl" onchange="calcSpa()">
            <option value="neck">Upper Back, Cervical Neck & Migraine Relief</option>
            <option value="insomnia" selected>Deep Nervous System Reset & Insomnia Relief</option>
            <option value="body">Full Body Athletic Soreness & Lymphatic Detox</option>
          </select>
        </div>
        <div class="form-group">
          <label>Organic Botanical Essential Oil Infusion</label>
          <select id="spaOil" class="form-ctrl" onchange="calcSpa()">
            <option value="lav">French Lavender & Himalayan Cedarwood (Sedative & Calming)</option>
            <option value="lem" selected>Wild Lemongrass & Bergamot (Revitalising & Mood Lift)</option>
            <option value="sand">Mysore Sandalwood & Cold-Pressed Sesame (Grounding & Royal)</option>
          </select>
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); margin-top: 20px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">RECOMMENDED TAILORED EXPERIENCE</div>
          <div id="spaResult" style="font-size: 24px; font-weight: 800; color: var(--accent); font-family: var(--font-heading); margin: 6px 0;">90-Min Neurological Reset Ritual</div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">Includes botanical foot cleansing, private eucalyptus steam, and customized pressure bodywork.</p>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('Aromatherapy Ritual Booking')">Reserve This Ritual via Private Concierge</button>
      </div>""",
    "interactive_js": """
      function calcSpa() {
        const tension = document.getElementById('spaTension').value;
        let res = "90-Min Neurological Reset Ritual";
        if (tension === 'neck') res = "75-Min Cervical Decompression & Warm Compress";
        if (tension === 'body') res = "120-Min Deep Lymphatic Drainage & Steam";
        document.getElementById('spaResult').innerText = res;
      }""",
    "process_head": "The Elysian Guest Journey",
    "process_sub": "Designed from the first step to insulate you from outside noise, rush, and stress.",
    "process_steps": [
        ("01", "Botanical Welcome Elixir", "Arrive to cold lemongrass towels and a chilled blue-pea herbal infusion in our tranquil reception lounge."),
        ("02", "Sensory Aroma Consultation", "Select your custom therapeutic oil blend, pressure intensity, and music preference with your master therapist."),
        ("03", "Private Suite Sanctuary", "Step into heated Egyptian cotton treatment tables with private ensuite steam and soundproof acoustics."),
        ("04", "Detox Herbal Tea Decompression", "Re-emerge gently with warm ginger-honey infusions and freshly roasted nuts in our private garden patio.")
    ],
    "reviews_head": "Guest Reflections & Experiences",
    "reviews_sub": "Unsolicited words from our regular guests and traveling wellness seekers.",
    "reviews": [
        ("Rohit & Ananya Varma", "Couple Suite Anniversary Guest", "The most romantic and genuinely relaxing spa experience in the city. The private jacuzzi and eucalyptus steam bath were heavenly."),
        ("Dr. Deepali Sen", "Senior Neurologist", "As a physician under constant stress, Elysian is my sacred Sunday sanctuary. The therapist’s touch is respectful, knowledgeable, and intensely healing."),
        ("Vikramaditya Roy", "Managing Partner, Private Equity", "Total silence. No pushy product sales, no cheap lotions. Real cold-pressed sandalwood oil and museum-grade hygiene.")
    ],
    "faqs": [
        ("What hygiene standards are followed between guest appointments?", "Every therapy suite undergoes a 30-minute medical-grade sanitation cycle with fresh 100% Egyptian cotton linens and sterilized ceramic amenities."),
        ("Can we request specific therapist genders for couple rituals?", "Yes. Guests may request male or female certified therapists with complete discretion and professional respect."),
        ("Do you offer corporate wellness gift vouchers?", "Yes, we issue physical embossed gold-foil gift certificates as well as digital instant WhatsApp vouchers for celebrations.")
    ],
    "form_head": "Reserve Your Private Sanctuary Slot",
    "form_sub": "Select your preferred date, therapy, and suite requirements for an instant personal booking confirmation.",
    "default_service_inquiry": "Royal Couple Sanctuary Ritual",
    "themes": [
        {
            "id": "bali-botanical-sand",
            "name": "Botanical Sand",
            "icon": "🌿",
            "bg_primary": "#F7F4EE",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F0EDE4",
            "text_primary": "#1F2421",
            "text_muted": "#4B554F",
            "text_subtle": "#6E7A73",
            "border_color": "#DDD6C8",
            "accent": "#5B7065",
            "accent_hover": "#46574E",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(91, 112, 101, 0.12)",
            "badge_bg": "#E5E1D5",
            "badge_text": "#394840",
            "radius": "14px",
            "font_heading": "Cormorant Garamond",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(247, 244, 238, 0.95)",
            "shadow": "0 10px 30px rgba(31, 36, 33, 0.06)"
        },
        {
            "id": "midnight-sanctuary-dark",
            "name": "Midnight Sanctuary",
            "icon": "🕯️",
            "bg_primary": "#0E0C0A",
            "bg_surface": "#161310",
            "bg_card": "#1E1A16",
            "bg_card_hover": "#26221D",
            "text_primary": "#F5EFE6",
            "text_muted": "#C7BDB1",
            "text_subtle": "#91877A",
            "border_color": "rgba(217, 119, 6, 0.2)",
            "accent": "#D97706",
            "accent_hover": "#F59E0B",
            "accent_contrast": "#0E0C0A",
            "accent_light": "rgba(217, 119, 6, 0.15)",
            "badge_bg": "rgba(217, 119, 6, 0.18)",
            "badge_text": "#FBBF24",
            "radius": "8px",
            "font_heading": "Cinzel",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(14, 12, 10, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.8)"
        },
        {
            "id": "rose-quartz-elegance",
            "name": "Rose Quartz",
            "icon": "🌸",
            "bg_primary": "#FFF8F8",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#FFF0F0",
            "text_primary": "#271216",
            "text_muted": "#5C353D",
            "text_subtle": "#855861",
            "border_color": "#F3D8DC",
            "accent": "#9F1239",
            "accent_hover": "#881337",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(159, 18, 57, 0.1)",
            "badge_bg": "#FFE4E6",
            "badge_text": "#9F1239",
            "radius": "20px",
            "font_heading": "Playfair Display",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(255, 248, 248, 0.95)",
            "shadow": "0 8px 24px rgba(159, 18, 57, 0.06)"
        }
    ]
})

# 05. SALON, BEAUTY & BRIDAL STUDIO
all_niches.append({
    "key": "salon",
    "filename": "05_salon_beauty_studio_demo.html",
    "title": "Maison De Glow | Haute Couture Bridal Artistry & Luxury Hair Aesthetics",
    "meta_desc": "South Indian, North Indian and Christian bridal looks using Charlotte Tilbury, Dior & MAC. Sweat-proof HD airbrush makeup and luxury hair spa.",
    "niche_label": "Salon & Bridal Studio",
    "brand_name": "MAISON DE GLOW",
    "brand_tagline": "HAUTE COUTURE BRIDAL & BEAUTY",
    "hero_badge": "👑 Voted Best Luxury Bridal Makeup Artist 2026",
    "h1": "Timeless Elegance That Glows Under Every Light",
    "subtitle": "Unfiltered bridal excellence using Charlotte Tilbury, Dior, and Tom Ford. 16-hour sweat-proof HD makeup, master saree draping, and luxury hair aesthetics for modern royalty.",
    "primary_cta": "📅 Check Wedding Date Availability",
    "secondary_cta": "Explore Real Bride Lookbook",
    "hero_img": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    "stats": [("450+", "Brides Styled Flawlessly"), ("16 Hrs", "Sweat-Proof Longevity"), ("100%", "Luxury Cosmetic Kits (Dior/MAC)"), ("4.98 ★", "WedMeGood Top Rated")],
    "trust_badges": ["CHARLOTTE TILBURY OFFICIAL KIT", "AIRBRUSH CERTIFIED ARTIST", "DESTINATION WEDDING TRAVEL READY", "ZERO CAKEY GUARANTEE"],
    "services_head": "Haute Couture Bridal & Salon Services",
    "services_sub": "Meticulously crafted for camera-ready perfection, natural skin radiance, and seamless wedding day timelines.",
    "services": [
        ("Royal Muhurtham HD Bridal", "Waterproof sweat-resistant base, intricate South Indian temple jewelry setting, and precision saree pleating.", "₹25,000 / event", "Bridal Signature", "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"),
        ("Airbrush Reception Glam", "Ultra-fine silicone airbrush mist application for a featherlight glass-skin finish that stays flawless until dawn.", "₹28,000 / event", "Airbrush Glam", "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"),
        ("Balayage & Bond Repair Hair Spa", "French freehand hair contouring, Kérastase caviar deep conditioning, and Olaplex molecular bond restoration.", "₹7,500 / session", "Salon Aesthetics", "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"),
        ("Mother & Bridesmaid Party Styling", "Coordinated elegant hair updos, soft dewy event makeup, and traditional draping for the bridal inner circle.", "₹8,500 / person", "Bridal Entourage", "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Muhurtham Wedding Date Availability Checker",
    "interactive_sub": "Select your auspicious wedding dates and ceremony city to verify our senior bridal team's booking availability.",
    "interactive_html": """
      <div style="max-width: 580px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Wedding / Muhurtham Date</label>
          <input type="date" id="bDate" class="form-ctrl" value="2026-11-20" onchange="checkDate()">
        </div>
        <div class="form-group">
          <label>Wedding Venue City / Location</label>
          <input type="text" id="bCity" class="form-ctrl" placeholder="e.g. Bangalore, Hyderabad, Goa Destination" value="Bangalore">
        </div>
        <div class="form-group">
          <label>Number of Functions / Events</label>
          <select id="bEvents" class="form-ctrl" onchange="checkDate()">
            <option>1 Event (Muhurtham / Reception Only)</option>
            <option selected>2 Events (Muhurtham + Grand Reception)</option>
            <option>3+ Events (Sangeet, Haldi, Muhurtham & Reception)</option>
          </select>
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); margin-top: 20px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">CALENDAR AVAILABILITY STATUS</div>
          <div id="bStatus" style="font-size: 22px; font-weight: 800; color: #16a34a; font-family: var(--font-heading); margin: 6px 0;">✓ Senior Team Available on Your Date</div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">Wedding season dates book 4–6 months in advance. Lock in your trial consultation to hold this slot.</p>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('Bridal Date Reservation')">Reserve Date & Book In-Person Trial</button>
      </div>""",
    "interactive_js": """
      function checkDate() {
        document.getElementById('bStatus').innerText = "✓ Senior Team Available on Your Date";
        document.getElementById('bStatus').style.color = "#16a34a";
      }""",
    "process_head": "The Maison Bridal Journey",
    "process_sub": "How we guarantee breathtaking, calm, and punctual bridal mornings.",
    "process_steps": [
        ("01", "Skin & Jewelry Consultation", "We evaluate your lehenga embroidery tones, lighting temperature, and skin hydration 6 weeks prior."),
        ("02", "In-Studio Trial Masterclass", "Complete test makeup and hair styling trial to lock in your exact lip shade, lash volume, and contour."),
        ("03", "On-Location Venue Punctuality", "Our senior artists arrive at your wedding suite with 5500K vanity lights 3 hours before muhurtham."),
        ("04", "Final Dupatta & Veil Pinning", "Setting jewelry, waist belt, floral jada, and tear-proof setting spray for effortless royal walking.")
    ],
    "reviews_head": "Words From Our Glowing Brides",
    "reviews_sub": "Unfiltered reviews from brides and families who trusted us with their once-in-a-lifetime moments.",
    "reviews": [
        ("Keerthi Reddy", "Bangalore Palace Bride", "Zero cakey feel! My makeup lasted through 6 hours of hot stage lights, emotional vidai tears, and dancing without a single smudge. Everyone praised my glow."),
        ("Aishwarya Iyer", "Traditional South Indian Bride", "The saree draping was pure architectural perfection. The pleats did not move an inch during the entire 4-hour homam ceremony."),
        ("Natasha Fernandez", "Goa Destination Bride", "Flewed the team to Goa for our 3-day wedding. They styled 12 people on time every morning with calm, smiling professionalism.")
    ],
    "faqs": [
        ("What luxury cosmetic brands do you use in your kit?", "We use 100% authentic, unexpired products from Charlotte Tilbury, Dior Backstage, MAC Cosmetics, Huda Beauty, NARS, and Tom Ford."),
        ("Do you offer in-person makeup trials before booking?", "Yes, we conduct comprehensive 2-hour bridal trial sessions where we test two variations of your desired look."),
        ("Can your team travel for outstation or destination weddings?", "Yes, our senior team travels globally for destination weddings across India, UAE, and Southeast Asia.")
    ],
    "form_head": "Book Your Private Bridal Trial",
    "form_sub": "Share your wedding dates, venue, and styling requirements to receive our complete bridal lookbook and rates.",
    "default_service_inquiry": "Royal Muhurtham HD Bridal Package",
    "themes": [
        {
            "id": "royal-champagne-ivory",
            "name": "Champagne Ivory",
            "icon": "👑",
            "bg_primary": "#FAF6F0",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F4EFE6",
            "text_primary": "#1A150E",
            "text_muted": "#4A3F33",
            "text_subtle": "#736453",
            "border_color": "#E5DCCE",
            "accent": "#C5A059",
            "accent_hover": "#B38C44",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(197, 160, 89, 0.15)",
            "badge_bg": "#F0E7D8",
            "badge_text": "#75561E",
            "radius": "12px",
            "font_heading": "Playfair Display",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(250, 246, 240, 0.95)",
            "shadow": "0 10px 30px rgba(26, 21, 14, 0.06)"
        },
        {
            "id": "noir-editorial-chic",
            "name": "Editorial Noir",
            "icon": "💄",
            "bg_primary": "#0D0D0D",
            "bg_surface": "#141414",
            "bg_card": "#1C1C1C",
            "bg_card_hover": "#252525",
            "text_primary": "#FAFAFA",
            "text_muted": "#D4D4D4",
            "text_subtle": "#A3A3A3",
            "border_color": "rgba(251, 113, 133, 0.25)",
            "accent": "#FB7185",
            "accent_hover": "#FDA4AF",
            "accent_contrast": "#0D0D0D",
            "accent_light": "rgba(251, 113, 133, 0.15)",
            "badge_bg": "rgba(251, 113, 133, 0.18)",
            "badge_text": "#FECDD3",
            "radius": "4px",
            "font_heading": "Cinzel",
            "font_body": "Space Grotesk",
            "header_bg": "rgba(13, 13, 13, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.8)"
        },
        {
            "id": "modern-blush-velvet",
            "name": "Blush Velvet",
            "icon": "🌸",
            "bg_primary": "#FFF1F2",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#FFE4E6",
            "text_primary": "#2D0C15",
            "text_muted": "#5C2836",
            "text_subtle": "#854354",
            "border_color": "#FECDD3",
            "accent": "#E11D48",
            "accent_hover": "#BE123C",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(225, 29, 72, 0.12)",
            "badge_bg": "#FFE4E6",
            "badge_text": "#BE123C",
            "radius": "16px",
            "font_heading": "Syne",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(255, 241, 242, 0.95)",
            "shadow": "0 8px 24px rgba(225, 29, 72, 0.08)"
        }
    ]
})

# 06. FITNESS COACH & PERSONAL TRAINER
all_niches.append({
    "key": "coach",
    "filename": "06_fitness_coach_trainer_demo.html",
    "title": "Alex Vance | High-Performance Body Recomposition & Lifestyle Coaching",
    "meta_desc": "1-on-1 science-backed transformation mentorship for executives, founders & busy professionals. Sustainable nutrition with real Indian food and zero fad diets.",
    "niche_label": "Fitness Coach & Personal Trainer",
    "brand_name": "ALEX VANCE",
    "brand_tagline": "EXECUTIVE RECOMPOSITION & LONGEVITY",
    "hero_badge": "🔥 Certified CSCS & Precision Nutrition Master Coach",
    "h1": "Elite Body Recomposition Without Starvation Diets",
    "subtitle": "Customized 1-on-1 mentorship for high-performing founders and corporate leaders. Drop 10–15kg of stubborn fat, eliminate joint pain, and eat home food with zero guilt.",
    "primary_cta": "⚡ Check Transformation Timeline",
    "secondary_cta": "Apply For 1-on-1 Mentorship",
    "hero_img": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    "stats": [("380+", "Successful Transformations"), ("-3,400 kg", "Collective Fat Dropped"), ("94%", "Long-Term Habit Retention"), ("10 Yrs", "Coaching Mastery")],
    "trust_badges": ["CSCS CERTIFIED", "PRECISION NUTRITION LEVEL 2", "ZERO CRASH DIET PROTOCOL", "24/7 WHATSAPP ACCESS"],
    "services_head": "Targeted Mentorship Pathways",
    "services_sub": "Engineered around busy travel schedules, board meetings, and real-world dining out.",
    "services": [
        ("The 12-Week Executive Recomposition", "Lose 8–12kg pure visceral fat, build lean athletic muscle, and optimize testosterone/hormonal vitality.", "₹24,000 / 12 wks", "Signature Mentorship", "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"),
        ("Women's Hormonal & PCOS Reset", "Endocrinologist-aligned strength periodization, insulin sensitivity coaching, and stress cortisol management.", "₹22,000 / 12 wks", "Women's Health", "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"),
        ("Spinal Posture & Joint Rehabilitation", "Targeted corrective exercises to eliminate chronic lower back, sciatica, and cervical desk worker pain permanently.", "₹18,000 / 8 wks", "Mobility & Rehab", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"),
        ("Private In-Person 1-on-1 Training", "Direct floor coaching in our private boutique studio or at your residence gym with dedicated biomechanics supervision.", "₹35,000 / mo", "VIP In-Person", "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Body Recomposition Timeline Estimator",
    "interactive_sub": "Select your current baseline and target goal to calculate your realistic science-backed transformation roadmap.",
    "interactive_html": """
      <div style="max-width: 580px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Primary Transformation Objective</label>
          <select id="fitGoal" class="form-ctrl" onchange="calcCoach()">
            <option value="fat" selected>Drop 10-15kg Fat & Reveal Athletic Abs</option>
            <option value="muscle">Lean Bulking & Muscle Hypertrophy</option>
            <option value="rehab">Eliminate Chronic Back Pain & Build Core Strength</option>
          </select>
        </div>
        <div class="form-group">
          <label>Weekly Available Workout Days</label>
          <select id="fitDays" class="form-ctrl" onchange="calcCoach()">
            <option value="3">3 Days / Week (45-min High Efficiency Splits)</option>
            <option value="4" selected>4 Days / Week (Upper / Lower Periodization)</option>
            <option value="5">5 Days / Week (Advanced Push / Pull / Legs)</option>
          </select>
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); margin-top: 20px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">PREDICTED MILESTONE TIMELINE</div>
          <div id="fitResult" style="font-size: 26px; font-weight: 800; color: var(--accent); font-family: var(--font-heading); margin: 6px 0;">12-Week Structured Sprint</div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">Expected outcome: -11kg body fat, +2.5kg muscle density, zero dietary deprivation.</p>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('1-on-1 Coaching Application')">Apply For Alex's Private Mentorship Roster</button>
      </div>""",
    "interactive_js": """
      function calcCoach() {
        const goal = document.getElementById('fitGoal').value;
        let res = "12-Week Structured Sprint";
        if (goal === 'muscle') res = "16-Week Hypertrophy Architecture";
        if (goal === 'rehab') res = "8-Week Biomechanical Recovery Block";
        document.getElementById('fitResult').innerText = res;
      }""",
    "process_head": "The 4-Pillar Coaching System",
    "process_sub": "Rigorous science-backed methodology ensuring results become your permanent identity.",
    "process_steps": [
        ("01", "Metabolic & Bloodwork Audit", "Review of lipid panel, fasting insulin, HbA1c, and movement screening via video assessment."),
        ("02", "Custom Macro & Meal Framework", "Calorie and protein targets customized around your family meals, dining out, and travel."),
        ("03", "Weekly Video Check-in & Form Review", "Every Sunday we analyze your lifting recordings, body measurements, and biofeedback metrics."),
        ("04", "Metabolic Graduation", "Reverse dieting protocol to maintain your new physique effortlessly for the rest of your life.")
    ],
    "reviews_head": "Client Transformation Stories",
    "reviews_sub": "Real results from busy founders, executives, and working mothers.",
    "reviews": [
        ("Vivek Chawla", "Tech Founder & CEO", "Lost 14kg in 12 weeks while working 60-hour weeks and traveling across 3 time zones. Alex’s travel eating guide was a game-changer."),
        ("Sneha Kulkarni", "VP of Product, Managing PCOS", "Reversed my pre-diabetes, regulated my cycles, and dropped 3 dress sizes without ever eating boiled bland food."),
        ("Dr. Arvind Rao", "Consultant Radiologist", "My chronic lower back pain vanished in 6 weeks. The exercise video form corrections prevented injuries I suffered with earlier trainers.")
    ],
    "faqs": [
        ("Do I have to eat boiled chicken and give up Indian home food?", "Absolutely not. We design your macronutrients around dal, roti, rice, paneer, eggs, and normal family meals with simple portion controls."),
        ("I travel frequently for work. Can this work for me?", "Yes. 70% of my clients travel extensively. You receive customized hotel room bodyweight workouts and dining-out restaurant guides."),
        ("How do you review my exercise form remotely?", "You upload short video clips of your core lifts (squat, deadlift, press) directly to our private coaching WhatsApp chat for real-time biomechanical feedback.")
    ],
    "form_head": "Apply For Alex's Private Roster",
    "form_sub": "Due to intense 1-on-1 involvement, mentorship is strictly capped at 20 active clients. Apply below to secure an onboarding slot.",
    "default_service_inquiry": "The 12-Week Executive Recomposition",
    "themes": [
        {
            "id": "executive-stealth-dark",
            "name": "Stealth Dark",
            "icon": "⚡",
            "bg_primary": "#0A0A0A",
            "bg_surface": "#141414",
            "bg_card": "#1C1C1C",
            "bg_card_hover": "#252525",
            "text_primary": "#FAFAFA",
            "text_muted": "#A3A3A3",
            "text_subtle": "#737373",
            "border_color": "rgba(255, 85, 0, 0.2)",
            "accent": "#FF5500",
            "accent_hover": "#FF7733",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(255, 85, 0, 0.15)",
            "badge_bg": "rgba(255, 85, 0, 0.16)",
            "badge_text": "#FFAA80",
            "radius": "8px",
            "font_heading": "Syne",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(10, 10, 10, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.8)"
        },
        {
            "id": "clinical-biomechanics-grey",
            "name": "Biomechanics Slate",
            "icon": "🔬",
            "bg_primary": "#F1F5F9",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#E2E8F0",
            "text_primary": "#0F172A",
            "text_muted": "#334155",
            "text_subtle": "#64748B",
            "border_color": "#CBD5E1",
            "accent": "#2563EB",
            "accent_hover": "#1D4ED8",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(37, 99, 235, 0.12)",
            "badge_bg": "#DBEAFE",
            "badge_text": "#1E40AF",
            "radius": "10px",
            "font_heading": "Space Grotesk",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(241, 245, 249, 0.95)",
            "shadow": "0 10px 30px rgba(15, 23, 42, 0.08)"
        },
        {
            "id": "cyber-athletic-black",
            "name": "Cyber Volt",
            "icon": "🔋",
            "bg_primary": "#000000",
            "bg_surface": "#0A0A0A",
            "bg_card": "#111111",
            "bg_card_hover": "#1A1A1A",
            "text_primary": "#FFFFFF",
            "text_muted": "#A1A1AA",
            "text_subtle": "#71717A",
            "border_color": "#27272A",
            "accent": "#A3E635",
            "accent_hover": "#BEF264",
            "accent_contrast": "#000000",
            "accent_light": "rgba(163, 230, 53, 0.15)",
            "badge_bg": "#1E293B",
            "badge_text": "#BEF264",
            "radius": "0px",
            "font_heading": "Space Grotesk",
            "font_body": "Space Grotesk",
            "header_bg": "#000000",
            "shadow": "4px 4px 0px #A3E635"
        }
    ]
})

# 07. YOGA & MEDITATION STUDIO
all_niches.append({
    "key": "yoga",
    "filename": "07_yoga_meditation_studio_demo.html",
    "title": "Prana Shala | Traditional Classical Hatha Yoga & Tibetan Sound Sanctuary",
    "meta_desc": "Sunlit teakwood shala in Indiranagar. Yoga Alliance certified RYT-500 teachers, morning 6:00 AM asana flows, and restorative Tibetan singing bowl sound baths.",
    "niche_label": "Yoga & Meditation Studio",
    "brand_name": "PRANA SHALA",
    "brand_tagline": "CLASSICAL HATHA & SOUND SANCTUARY",
    "hero_badge": "🕉️ Yoga Alliance USA & AYUSH Accredited Shala",
    "h1": "Anchor Your Breath. Reconnect With Inner Peace.",
    "subtitle": "Traditional Classical Hatha, dynamic Ashtanga Vinyasa, and restorative Tibetan sound baths in a sunlit teakwood sanctuary. Guided with reverence for all levels.",
    "primary_cta": "🗓️ View Weekly Class Timetable",
    "secondary_cta": "Reserve Free Trial Mat Pass",
    "hero_img": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    "stats": [("15 Yrs", "Traditional Lineage"), ("28", "Weekly Shala Classes"), ("650+", "Active Practitioners"), ("4.97 ★", "380+ Community Reviews")],
    "trust_badges": ["YOGA ALLIANCE RYS-200", "NATURAL TEAKWOOD FLOORING", "PROPS & BLOCKS PROVIDED", "COMMUNITY HERBAL TEA LOUNGE"],
    "services_head": "Mindful Practice Disciplines",
    "services_sub": "Rooted in authentic tradition to build flexible strength, calm breathing, and grounded spiritual awareness.",
    "services": [
        ("Morning Classical Hatha Flow", "Surya Namaskar sequences, sustained asana holds, and nadi shodhana pranayama to ignite physical vitality.", "₹3,500 / mo", "Daily Morning", "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"),
        ("Ashtanga Vinyasa Primary Series", "Dynamic breath-synchronized movement, bandhas activation, and core internal heat building for stamina.", "₹4,000 / mo", "Dynamic Strength", "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80"),
        ("Candlelight Yin & Tibetan Sound Bath", "Slow meditative connective tissue release supported by bolsters, followed by 30 minutes of singing bowl vibrations.", "₹1,200 / session", "Evening Restorative", "https://images.unsplash.com/photo-1512290900672-1f41d017a584?auto=format&fit=crop&w=800&q=80"),
        ("200-Hour Yoga Teacher Training (TTC)", "Comprehensive immersion in Yoga Sutras, anatomy, alignment adjustments, and teaching methodology.", "₹45,000 / course", "Yoga Alliance Cert", "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Interactive Shala Class Timetable Filter",
    "interactive_sub": "Filter by time of day or practice style to find the perfect session for your schedule.",
    "interactive_html": """
      <div style="max-width: 600px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div style="display: flex; gap: 10px; margin-bottom: 20px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" id="btnAll" onclick="filterYoga('all')" style="padding: 8px 16px; font-size: 13px;">All Classes</button>
          <button class="btn btn-secondary" id="btnMorn" onclick="filterYoga('morning')" style="padding: 8px 16px; font-size: 13px;">Morning (6:00 – 9:00 AM)</button>
          <button class="btn btn-secondary" id="btnEve" onclick="filterYoga('evening')" style="padding: 8px 16px; font-size: 13px;">Evening (6:00 – 8:30 PM)</button>
        </div>
        <div id="yogaScheduleList" style="display: flex; flex-direction: column; gap: 12px;">
          <div class="yoga-slot" style="background: var(--bg-surface); padding: 16px; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 700; color: var(--text-primary);">06:30 AM – 07:45 AM • Classical Hatha Flow</div>
              <div style="font-size: 12px; color: var(--text-subtle);">Lead Teacher: Acharya Sundaram • All Levels</div>
            </div>
            <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="scrollToForm('06:30 AM Hatha Class')">Reserve Mat</button>
          </div>
          <div class="yoga-slot" style="background: var(--bg-surface); padding: 16px; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 700; color: var(--text-primary);">08:00 AM – 09:15 AM • Ashtanga Vinyasa Series</div>
              <div style="font-size: 12px; color: var(--text-subtle);">Lead Teacher: Meera Swaminathan • Intermediate</div>
            </div>
            <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="scrollToForm('08:00 AM Ashtanga Class')">Reserve Mat</button>
          </div>
          <div class="yoga-slot" style="background: var(--bg-surface); padding: 16px; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 700; color: var(--text-primary);">06:30 PM – 07:45 PM • Candlelight Yin & Sound Bath</div>
              <div style="font-size: 12px; color: var(--text-subtle);">Lead Teacher: Ananya Rao • Restorative</div>
            </div>
            <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="scrollToForm('06:30 PM Sound Bath')">Reserve Mat</button>
          </div>
        </div>
      </div>""",
    "interactive_js": """
      function filterYoga(type) {
        // Simple visual toggle feedback
        document.querySelectorAll('#btnAll, #btnMorn, #btnEve').forEach(b => {
          b.className = 'btn btn-secondary';
          b.style.padding = '8px 16px';
          b.style.fontSize = '13px';
        });
        if (type === 'all') document.getElementById('btnAll').className = 'btn btn-primary';
        if (type === 'morning') document.getElementById('btnMorn').className = 'btn btn-primary';
        if (type === 'evening') document.getElementById('btnEve').className = 'btn btn-primary';
      }""",
    "process_head": "The Shala Practice Journey",
    "process_sub": "How we welcome seekers from complete beginner stiffness to lifelong grounded practice.",
    "process_steps": [
        ("01", "Quiet Arrival & Prop Pick", "Remove shoes, switch off phones, and select your organic cork mat, wooden blocks, and cotton strap."),
        ("02", "Pranayama & Centering", "Begin each session with gentle nadi shodhana breathwork and mindful awareness of the present moment."),
        ("03", "Aligned Asana Guidance", "Experience gentle hands-on anatomical adjustments that honor your body's unique skeletal boundaries."),
        ("04", "Deep Savasana Meditation", "Absorb the practice in guided stillness with Tibetan singing bowls and warm herbal tea afterwards.")
    ],
    "reviews_head": "Reflections From Our Community",
    "reviews_sub": "Words from practitioners who found calm and physical alignment on our mats.",
    "reviews": [
        ("Pooja Nair", "Software Architect & Practitioner", "I used to think yoga wasn't for me because I couldn't touch my toes. Prana Shala taught me that yoga is about breath, not acrobatics. My work stress has plummeted."),
        ("Girish Menon", "Daily 6:30 AM Hatha Student", "The natural teakwood floor, gentle morning sun, and authentic teachers make this shala sacred. It is the best hour of my entire day."),
        ("Dr. Radhika Sen", "Graduate, 200-Hour TTC", "The teacher training course changed my life. Authentic philosophy, rigorous anatomical science, and loving spiritual mentorship.")
    ],
    "faqs": [
        ("I am completely inflexible and have never done yoga. Can I join?", "Yes! Yoga is for creating mobility and peace, not for showing off flexibility. 80% of our new students start with zero experience."),
        ("Are mats and props provided at the shala?", "Yes, premium sanitized organic cork mats, wooden blocks, cotton straps, and bolsters are complimentary for all students."),
        ("Can I freeze my monthly pass if I travel?", "Yes, monthly members can freeze their pass for up to 14 days per calendar year with prior WhatsApp notification.")
    ],
    "form_head": "Reserve Your Free Trial Mat Pass",
    "form_sub": "Step into our sunlit shala for your first complimentary class. All props provided.",
    "default_service_inquiry": "06:30 AM Classical Hatha Flow",
    "themes": [
        {
            "id": "sunlit-teakwood-saffron",
            "name": "Teak & Saffron",
            "icon": "🕉️",
            "bg_primary": "#FDFBF7",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F7F3EA",
            "text_primary": "#261E14",
            "text_muted": "#544636",
            "text_subtle": "#7D6B57",
            "border_color": "#E8DEC9",
            "accent": "#D97706",
            "accent_hover": "#B45309",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(217, 119, 6, 0.12)",
            "badge_bg": "#FEF3C7",
            "badge_text": "#92400E",
            "radius": "12px",
            "font_heading": "Cormorant Garamond",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(253, 251, 247, 0.95)",
            "shadow": "0 10px 30px rgba(38, 30, 20, 0.06)"
        },
        {
            "id": "celestial-moonlit-dark",
            "name": "Moonlit Cosmic",
            "icon": "🌙",
            "bg_primary": "#0A0B14",
            "bg_surface": "#121320",
            "bg_card": "#181A2D",
            "bg_card_hover": "#20233B",
            "text_primary": "#F1F5F9",
            "text_muted": "#CBD5E1",
            "text_subtle": "#94A3B8",
            "border_color": "rgba(255, 255, 255, 0.12)",
            "accent": "#818CF8",
            "accent_hover": "#A5B4FC",
            "accent_contrast": "#0A0B14",
            "accent_light": "rgba(129, 140, 248, 0.15)",
            "badge_bg": "rgba(129, 140, 248, 0.16)",
            "badge_text": "#C7D2FE",
            "radius": "8px",
            "font_heading": "Cinzel",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(10, 11, 20, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.8)"
        },
        {
            "id": "mindful-sage-minimal",
            "name": "Sage Minimal",
            "icon": "🍃",
            "bg_primary": "#F4F7F4",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#EAF0EA",
            "text_primary": "#1A241A",
            "text_muted": "#3D4F3D",
            "text_subtle": "#667D66",
            "border_color": "#D3E0D3",
            "accent": "#15803D",
            "accent_hover": "#166534",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(21, 128, 61, 0.12)",
            "badge_bg": "#DCFCE7",
            "badge_text": "#166534",
            "radius": "16px",
            "font_heading": "Plus Jakarta Sans",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(244, 247, 244, 0.95)",
            "shadow": "0 8px 24px rgba(21, 128, 61, 0.06)"
        }
    ]
})

# 08. CREATIVE AGENCY & DESIGN PORTFOLIO
all_niches.append({
    "key": "creative",
    "filename": "08_creative_portfolio_demo.html",
    "title": "Studio Kroma | High-Stakes Brand Identity & Digital Product Design",
    "meta_desc": "Bespoke brand identities, design systems, and Webflow digital experiences for venture-backed tech startups and luxury lifestyle brands.",
    "niche_label": "Creative Agency & Portfolio",
    "brand_name": "STUDIO KROMA",
    "brand_tagline": "BRAND IDENTITY & DIGITAL ARCHITECTURE",
    "hero_badge": "⚡ Awwwards & FWA Featured Independent Design Studio",
    "h1": "Visual Taste That Converts Venture-Backed Ambition",
    "subtitle": "Bespoke brand design systems, interactive 3D product experiences, and award-grade Webflow websites. We partner with founders building category-defining brands.",
    "primary_cta": "📐 Configure Brand Sprint Scope",
    "secondary_cta": "Book Executive Discovery Call",
    "hero_img": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
    "stats": [("42+", "Brands Designed & Launched"), ("$120M+", "Client Venture Funding Raised"), ("14", "Design Awards & Accolades"), ("4 Wks", "Sprint Turnaround Time")],
    "trust_badges": ["AWWWARDS SITE OF THE DAY", "BEHANCE CURATED", "FULL FIGMA SYSTEM HANDOFF", "100% IP TRANSFER"],
    "services_head": "Strategic Design Disciplines",
    "services_sub": "Rigorous aesthetic systems that give innovative startups immediate institutional authority.",
    "services": [
        ("Brand Identity & Typography System", "Complete visual architecture: master logo, bespoke wordmarks, color mathematics, and 120-page brand guidelines.", "₹1.5L / sprint", "Brand Identity", "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"),
        ("UI/UX & Mobile Design Systems", "Component-driven Figma token architectures, interactive micro-prototypes, and developer-ready design specs.", "₹2.2L / sprint", "Product Design", "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"),
        ("3D Product Visualization & Motion", "Photorealistic 3D product renders, exploded mechanical animations, and kinetic typography showreels.", "₹1.8L / project", "3D & Motion", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"),
        ("Award-Grade Webflow / Code Engineering", "Lightning-fast semantic builds with buttery smooth GSAP animations, responsive grids, and 98+ PageSpeed scores.", "₹2.5L / build", "Digital Flagship", "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Brand Design Sprint Scope Estimator",
    "interactive_sub": "Select your deliverables to view estimated sprint duration, team composition, and source file deliverables.",
    "interactive_html": """
      <div style="max-width: 580px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Company Growth Stage</label>
          <select id="crStage" class="form-ctrl" onchange="calcCreative()">
            <option value="seed" selected>Seed / Pre-Launch Startup (Foundational Identity)</option>
            <option value="seriesA">Series A / Growth Scaleup (Full Rebrand & Digital Flagship)</option>
            <option value="luxury">Luxury / D2C Consumer Brand (Identity, 3D & Packaging)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Primary Deliverable Scope</label>
          <select id="crScope" class="form-ctrl" onchange="calcCreative()">
            <option value="brand">Brand Identity + Typography + Guidelines</option>
            <option value="full" selected>Complete Brand + UI/UX System + Web Flagship</option>
          </select>
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); margin-top: 20px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">RECOMMENDED SPRINT ARCHITECTURE</div>
          <div id="crResult" style="font-size: 26px; font-weight: 800; color: var(--accent); font-family: var(--font-heading); margin: 6px 0;">4-Week Turnkey Brand Sprint</div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">Includes weekly Figma review sessions, complete vector source handoff & commercial IP transfer.</p>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('Brand Sprint Inquiry')">Book Discovery Call To Lock Sprint Slot</button>
      </div>""",
    "interactive_js": """
      function calcCreative() {
        const stage = document.getElementById('crStage').value;
        let res = "4-Week Turnkey Brand Sprint";
        if (stage === 'seriesA') res = "6-Week Full Transformation Architecture";
        if (stage === 'luxury') res = "5-Week Packaging & 3D Identity Sprint";
        document.getElementById('crResult').innerText = res;
      }""",
    "process_head": "The 4-Week Creative Sprint",
    "process_sub": "Rigorous milestone delivery without endless agency bureaucracy or junior handoffs.",
    "process_steps": [
        ("01", "Strategic Narrative Lock", "Deep-dive workshop defining your brand archetype, competitor whitespace, and core visual moodboards."),
        ("02", "Core System Presentation", "We present two diametrically opposed, fully executed visual directions applied across real-world collateral."),
        ("03", "Component Tokenization", "Engineering all icons, color variables, typography scales, and responsive components inside Figma."),
        ("04", "Master Asset Handoff", "Full transfer of vector source files, production guidelines, and launch assets with 100% IP ownership.")
    ],
    "reviews_head": "Founder & Client Reflections",
    "reviews_sub": "Words from startup founders and creative marketing leaders.",
    "reviews": [
        ("Kabir Mehta", "Co-Founder & CEO, FinTech Unicorn", "Studio Kroma elevated our brand from looking like a weekend project to looking like an established institutional leader. We closed our $8M Series A within 60 days of launch."),
        ("Tanya Alvares", "Creative Director, D2C Lifestyle", "Zero fluff, incredible taste level. They delivered a design system that our internal developers implemented with joy."),
        ("Devrath Khurana", "Founder, AI Compute Platform", "Their dark-mode aesthetics and micro-interactions set us completely apart from the generic SaaS crowd.")
    ],
    "faqs": [
        ("Do we own 100% of the raw source files and copyrights?", "Yes. Upon project completion and final milestone release, all vector assets, Figma files, 3D models, and commercial copyrights are legally transferred to your company."),
        ("How many feedback rounds are included in a sprint?", "Each sprint includes two structured milestone review cycles where we consolidate feedback directly inside Figma before final production."),
        ("Can your team also code the website?", "Yes. We are full-stack design engineers capable of taking Figma designs directly into production-grade HTML/CSS, Webflow, or React builds.")
    ],
    "form_head": "Book Your Studio Discovery Call",
    "form_sub": "Share your vision, timelines, and scope to discuss your project directly with our principal design directors.",
    "default_service_inquiry": "Complete Brand Identity + Web Flagship Sprint",
    "themes": [
        {
            "id": "avant-garde-noir",
            "name": "Avant-Garde Noir",
            "icon": "⚡",
            "bg_primary": "#080808",
            "bg_surface": "#121212",
            "bg_card": "#181818",
            "bg_card_hover": "#222222",
            "text_primary": "#FFFFFF",
            "text_muted": "#A3A3A3",
            "text_subtle": "#737373",
            "border_color": "rgba(255, 255, 255, 0.12)",
            "accent": "#8B5CF6",
            "accent_hover": "#A78BFA",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(139, 92, 246, 0.15)",
            "badge_bg": "rgba(139, 92, 246, 0.16)",
            "badge_text": "#C4B5FD",
            "radius": "4px",
            "font_heading": "Syne",
            "font_body": "Space Grotesk",
            "header_bg": "rgba(8, 8, 8, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.85)"
        },
        {
            "id": "editorial-swiss-white",
            "name": "Swiss Editorial",
            "icon": "📐",
            "bg_primary": "#FFFFFF",
            "bg_surface": "#F8FAFC",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F1F5F9",
            "text_primary": "#0A0A0A",
            "text_muted": "#262626",
            "text_subtle": "#525252",
            "border_color": "#0A0A0A",
            "accent": "#0A0A0A",
            "accent_hover": "#262626",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(10, 10, 10, 0.1)",
            "badge_bg": "#0A0A0A",
            "badge_text": "#FFFFFF",
            "radius": "0px",
            "font_heading": "Space Grotesk",
            "font_body": "Space Grotesk",
            "header_bg": "#FFFFFF",
            "shadow": "4px 4px 0px #0A0A0A"
        },
        {
            "id": "cyberpunk-neon-gradient",
            "name": "Neon Horizon",
            "icon": "🌐",
            "bg_primary": "#050B14",
            "bg_surface": "#0C1524",
            "bg_card": "#111E33",
            "bg_card_hover": "#172A47",
            "text_primary": "#F0F9FF",
            "text_muted": "#BAE6FD",
            "text_subtle": "#7DD3FC",
            "border_color": "rgba(6, 182, 212, 0.25)",
            "accent": "#06B6D4",
            "accent_hover": "#22D3EE",
            "accent_contrast": "#050B14",
            "accent_light": "rgba(6, 182, 212, 0.15)",
            "badge_bg": "rgba(6, 182, 212, 0.18)",
            "badge_text": "#67E8F9",
            "radius": "12px",
            "font_heading": "Syne",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(5, 11, 20, 0.95)",
            "shadow": "0 0 30px rgba(6, 182, 212, 0.2)"
        }
    ]
})

# 09. HEALTHCARE, PATHOLOGY & DIAGNOSTICS LAB
all_niches.append({
    "key": "diag",
    "filename": "09_healthcare_diagnostics_demo.html",
    "title": "ApexCare Diagnostics | NABL Accredited Pathology & Doorstep Home Collection",
    "meta_desc": "NABL & ISO certified automated diagnostics. Doorstep home sample collection from 6:30 AM, dual-pathologist verification, and WhatsApp reports within 6 hours.",
    "niche_label": "Healthcare & Diagnostics Lab",
    "brand_name": "APEXCARE LABS",
    "brand_tagline": "NABL ACCREDITED PATHOLOGY & IMAGING",
    "hero_badge": "🔬 100% NABL Accredited & Barcoded Precision",
    "h1": "Accurate Diagnostics You Can Trust With Your Life",
    "subtitle": "Automated Roche and Siemens multi-analyzers, sterile single-use vacutainers, morning 6:30 AM doorstep home collection, and verified digital reports delivered on WhatsApp within 6 hours.",
    "primary_cta": "🩸 Book Doorstep Blood Collection",
    "secondary_cta": "View Full-Body Health Packages",
    "hero_img": "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    "stats": [("NABL", "Accredited Laboratory"), ("6:30 AM", "Home Pickup Available"), ("6 Hours", "Digital Report Turnaround"), ("4.92 ★", "1,200+ Verified Patient Reviews")],
    "trust_badges": ["NABL ISO 15189 CERTIFIED", "BARCODED SAMPLE TRACKING", "COLD-CHAIN VACUTAINER KITS", "MD PATHOLOGIST VERIFIED"],
    "services_head": "Comprehensive Diagnostic Investigations",
    "services_sub": "Calibrated precision testing for routine preventative health and advanced clinical conditions.",
    "services": [
        ("Comprehensive Senior Citizen Health Panel", "85 parameters including CBC, Lipid, HbA1c, Liver & Kidney profiles, Vitamin D/B12, and Cardiac risk markers.", "₹2,499", "Preventive Panel", "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"),
        ("Executive Master Full-Body Checkup", "102 vital biomarkers including Thyroid 3-panel, Iron studies, complete urine examination, and doctor consultation.", "₹3,800", "Executive Wellness", "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=800&q=80"),
        ("Diabetes & Glycemic Monitoring Panel", "Fasting blood sugar, Postprandial, HbA1c 3-month average, microalbuminuria, and estimated average glucose.", "₹850", "Chronic Care", "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"),
        ("Fever & Infectious Disease Panel", "CBC with automated differential, Dengue NS1 antigen, Malaria smear, Typhoid Widal, and CRP inflammatory marker.", "₹1,450", "Acute Care", "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Health Checkup Package Comparer",
    "interactive_sub": "Select your age profile to compare biomarkers and choose the right preventive health panel for your family.",
    "interactive_html": """
      <div style="max-width: 580px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Target Age & Health Profile</label>
          <select id="diagProfile" class="form-ctrl" onchange="calcDiag()">
            <option value="adult" selected>Working Adults (25 – 45 yrs) • Stress & Lifestyle Panel</option>
            <option value="senior">Senior Citizens (50+ yrs) • Comprehensive Vital Organ Panel</option>
            <option value="diabetic">Chronic Diabetes & Thyroid Management</option>
          </select>
        </div>
        <div class="form-group">
          <label>Sample Collection Mode</label>
          <select id="diagMode" class="form-ctrl">
            <option selected>Doorstep Home Collection (06:30 AM – 10:30 AM)</option>
            <option>Walk-In to Central Diagnostic Center</option>
          </select>
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); margin-top: 20px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">RECOMMENDED CLINICAL PACKAGE</div>
          <div id="diagResult" style="font-size: 26px; font-weight: 800; color: var(--accent); font-family: var(--font-heading); margin: 6px 0;">Executive Lifestyle Panel (85 Tests)</div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">₹2,499 (50% Off Walk-In MRP). Fasting 10–12 hours required. WhatsApp report in 6 hrs.</p>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('Home Collection Request')">Book Home Phlebotomist For Tomorrow Morning</button>
      </div>""",
    "interactive_js": """
      function calcDiag() {
        const prof = document.getElementById('diagProfile').value;
        let res = "Executive Lifestyle Panel (85 Tests)";
        if (prof === 'senior') res = "Master Senior Citizen Wellness (102 Tests)";
        if (prof === 'diabetic') res = "Comprehensive Diabetic & Renal Health Panel";
        document.getElementById('diagResult').innerText = res;
      }""",
    "process_head": "Safe Doorstep Phlebotomy Protocol",
    "process_sub": "Medical cold-chain security from your arm to automated laboratory analyzers.",
    "process_steps": [
        ("01", "Doorstep Arrival (6:30–10:30 AM)", "Vaccinated, certified phlebotomist arrives with sterile single-use vacuum collection tubes."),
        ("02", "Single-Prick Gentle Draw", "Barcoded tube labeling in front of you ensures zero possibility of sample mix-ups."),
        ("03", "Cold-Chain Laboratory Transport", "Samples are sealed in temperature-monitored cooler boxes and transported directly to our central lab."),
        ("04", "WhatsApp Report in 6 Hours", "Dual MD Pathologist verification followed by automated encrypted PDF dispatch to your WhatsApp.")
    ],
    "reviews_head": "Patient Experiences & Reviews",
    "reviews_sub": "Feedback from families who rely on our diagnostic precision.",
    "reviews": [
        ("Subhash Chandra Bose", "Senior Citizen (71 yrs)", "The phlebotomist was incredibly gentle with my fragile veins. Only one painless prick, and the digital report arrived on my son’s WhatsApp by 2:00 PM."),
        ("Dr. Malini Iyer", "Consultant Physician", "I send all my clinical diagnostic investigations to ApexCare. Their calibration standards and quality controls match premier tertiary hospitals."),
        ("Gautam Singhania", "Corporate Executive", "Booked home collection at 7:00 AM on WhatsApp. Clean kit, prompt arrival, and very reasonable package pricing.")
    ],
    "faqs": [
        ("Is 10 to 12 hours fasting strictly required for health checkups?", "Yes, for accurate lipid profiles (cholesterol) and fasting glucose, water is allowed but food and tea/coffee must be avoided for 10–12 hours."),
        ("How do barcoded tubes prevent sample mix-ups?", "Every vacutainer tube is barcoded with your unique patient ID and scanned digitally before and after blood collection."),
        ("Can I consult a doctor to explain abnormal test results?", "Yes, every comprehensive health checkup package includes a complimentary telephonic doctor review to explain your test report.")
    ],
    "form_head": "Book Doorstep Sample Collection",
    "form_sub": "Enter your address and preferred morning time slot. Our phlebotomist will confirm via WhatsApp.",
    "default_service_inquiry": "Executive Lifestyle Panel (85 Tests) - Home Pickup",
    "themes": [
        {
            "id": "clinical-trust-sapphire",
            "name": "Clinical Sapphire",
            "icon": "🔬",
            "bg_primary": "#F8FAFC",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F1F5F9",
            "text_primary": "#0F172A",
            "text_muted": "#334155",
            "text_subtle": "#64748B",
            "border_color": "#E2E8F0",
            "accent": "#0284C7",
            "accent_hover": "#0369A1",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(2, 132, 199, 0.12)",
            "badge_bg": "#E0F2FE",
            "badge_text": "#0369A1",
            "radius": "10px",
            "font_heading": "Plus Jakarta Sans",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(248, 250, 252, 0.95)",
            "shadow": "0 10px 30px rgba(15, 23, 42, 0.08)"
        },
        {
            "id": "modern-biotech-dark",
            "name": "Bio-Tech Dark",
            "icon": "🧬",
            "bg_primary": "#060D17",
            "bg_surface": "#0C1726",
            "bg_card": "#122033",
            "bg_card_hover": "#1A2C45",
            "text_primary": "#F0FDF4",
            "text_muted": "#CBD5E1",
            "text_subtle": "#94A3B8",
            "border_color": "rgba(20, 184, 166, 0.25)",
            "accent": "#14B8A6",
            "accent_hover": "#2DD4BF",
            "accent_contrast": "#060D17",
            "accent_light": "rgba(20, 184, 166, 0.15)",
            "badge_bg": "rgba(20, 184, 166, 0.18)",
            "badge_text": "#5EEAD4",
            "radius": "6px",
            "font_heading": "Space Grotesk",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(6, 13, 23, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.8)"
        },
        {
            "id": "family-health-emerald",
            "name": "Health Emerald",
            "icon": "🏥",
            "bg_primary": "#F0FDF4",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#DCFCE7",
            "text_primary": "#14532D",
            "text_muted": "#166534",
            "text_subtle": "#15803D",
            "border_color": "#BBF7D0",
            "accent": "#059669",
            "accent_hover": "#047857",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(5, 150, 105, 0.12)",
            "badge_bg": "#DCFCE7",
            "badge_text": "#166534",
            "radius": "14px",
            "font_heading": "Plus Jakarta Sans",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(240, 253, 244, 0.95)",
            "shadow": "0 8px 24px rgba(5, 150, 105, 0.08)"
        }
    ]
})

# 10. CLINIC & MULTI-SPECIALTY POLYCLINIC
all_niches.append({
    "key": "clinic",
    "filename": "10_clinic_polyclinic_demo.html",
    "title": "CarePoint Multi-Specialty Family Polyclinic | Pediatrics, OB-GYN & Medicine",
    "meta_desc": "Compassionate neighborhood polyclinic. Senior specialist doctors, guaranteed under-15-minute wait times, in-house pharmacy & diagnostic testing under one roof.",
    "niche_label": "Clinic & Multi-Specialty Polyclinic",
    "brand_name": "CAREPOINT CLINIC",
    "brand_tagline": "FAMILY HEALTH & SPECIALIST CARE",
    "hero_badge": "🏥 Trusted Neighborhood Multi-Specialty Clinic",
    "h1": "Compassionate Healthcare With Zero Hospital Chaos",
    "subtitle": "Senior specialist doctors in Pediatrics, Gynecology, Orthopedics, and Internal Medicine. Guaranteed under-15-minute waiting room times, in-house pharmacy, and same-day diagnostics.",
    "primary_cta": "👨‍⚕️ View Doctor OPD Timetable",
    "secondary_cta": "Book WhatsApp Appointment",
    "hero_img": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    "stats": [("15 Min", "Maximum Wait Guarantee"), ("12", "Specialist OPD Doctors"), ("45,000+", "Families Treated"), ("4.94 ★", "850+ Verified Google Reviews")],
    "trust_badges": ["SENIOR MD/MS DOCTORS", "IN-HOUSE PHARMACY", "ON-SITE DIGITAL X-RAY & LAB", "WHEELCHAIR ACCESSIBLE"],
    "services_head": "Specialist Outpatient Departments",
    "services_sub": "Experienced senior consultants dedicated to unhurried, patient-centered healing.",
    "services": [
        ("Pediatrics & Child Immunization", "Newborn developmental screening, vaccination schedules, pediatric asthma, and growth monitoring by senior MD pediatricians.", "₹700 consultation", "Child Health", "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80"),
        ("Obstetrics, Gynecology & Fertility", "Prenatal care, ultrasound Doppler scans, PCOS hormonal management, and menopausal wellness counseling.", "₹850 consultation", "Women's Health", "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"),
        ("Internal Medicine & Diabetology", "Comprehensive chronic illness care for hypertension, thyroid disorders, fatty liver, and geriatric wellness.", "₹750 consultation", "Family Medicine", "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"),
        ("Orthopedics & Joint Care", "Non-surgical joint pain management, osteoarthritis therapy, fracture splinting, and physical rehabilitation.", "₹800 consultation", "Bone & Joint", "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Live Specialist Doctor OPD Schedule",
    "interactive_sub": "Select a medical department to view attending senior specialists, consultation timings, and next available slots.",
    "interactive_html": """
      <div style="max-width: 600px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Select Clinical Department</label>
          <select id="clDept" class="form-ctrl" onchange="calcClinic()">
            <option value="pedia" selected>Pediatrics & Child Care (Dr. Meenakshi Sundaram, MD)</option>
            <option value="gyn">Obstetrics & Gynecology (Dr. Sunita Kulkarni, MS)</option>
            <option value="ortho">Orthopedics & Sports Medicine (Dr. Vikramaditya Rao, MS)</option>
            <option value="med">General Medicine & Diabetes (Dr. Rajesh Sharma, MD)</option>
          </select>
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
            <span style="font-weight: 700; color: var(--text-primary); font-size: 16px;" id="clDocName">Dr. Meenakshi Sundaram, MD (AIIMS)</span>
            <span style="font-size: 13px; color: var(--accent); font-weight: 700;" id="clFee">₹700 Consultation</span>
          </div>
          <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">OPD Timings: Monday – Saturday (10:00 AM – 01:00 PM &amp; 05:30 PM – 08:30 PM)</div>
          <div style="font-size: 12px; color: #16a34a; font-weight: 700;">● Next Slot Available Today at 06:15 PM (Wait time &lt; 10 mins)</div>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('Doctor OPD Appointment Booking')">Book Confirmed Chamber Appointment</button>
      </div>""",
    "interactive_js": """
      function calcClinic() {
        const dept = document.getElementById('clDept').value;
        if (dept === 'gyn') {
          document.getElementById('clDocName').innerText = "Dr. Sunita Kulkarni, MS (OB-GYN)";
          document.getElementById('clFee').innerText = "₹850 Consultation";
        } else if (dept === 'ortho') {
          document.getElementById('clDocName').innerText = "Dr. Vikramaditya Rao, MS (Ortho)";
          document.getElementById('clFee').innerText = "₹800 Consultation";
        } else if (dept === 'med') {
          document.getElementById('clDocName').innerText = "Dr. Rajesh Sharma, MD (General Med)";
          document.getElementById('clFee').innerText = "₹750 Consultation";
        } else {
          document.getElementById('clDocName').innerText = "Dr. Meenakshi Sundaram, MD (AIIMS)";
          document.getElementById('clFee').innerText = "₹700 Consultation";
        }
      }""",
    "process_head": "The CarePoint Patient Experience",
    "process_sub": "Designed to eliminate waiting room exhaustion and treat your family like our own.",
    "process_steps": [
        ("01", "Frictionless Slot Booking", "Book online or via WhatsApp with instant appointment confirmation and zero telephone waiting."),
        ("02", "Under-15-Min Reception Triage", "Vital signs recorded promptly (BP, SpO2, temperature) with minimal waiting room stay."),
        ("03", "Unhurried Clinical Consultation", "A full 15–20 minutes with your senior specialist doctor who listens with empathy and care."),
        ("04", "Pharmacy & Diagnostic Handover", "Collect prescribed medicines from our in-house pharmacy or complete blood tests on-site in 5 minutes.")
    ],
    "reviews_head": "Patient & Family Trust",
    "reviews_sub": "Words from neighborhood families who make CarePoint their first healthcare call.",
    "reviews": [
        ("Kavita Radhakrishnan", "Mother of 2", "When my toddler had a sudden high fever at 7:00 PM, CarePoint saw us in 10 minutes. Dr. Meenakshi was so soothing and did not prescribe unnecessary antibiotics."),
        ("S. Narayanaswamy", "Senior Resident (68 yrs)", "Clean, calm, and wheelchair friendly. The pharmacy is fully stocked and the staff always escort me with kindness."),
        ("Abhishek Banerjee", "IT Project Lead", "Saved me 3 hours of waiting at a corporate hospital. Highly qualified doctors without corporate billing games.")
    ],
    "faqs": [
        ("What happens if I arrive without an appointment?", "While pre-booked appointments have priority, our triage desk accommodates walk-in patients and medical urgencies promptly."),
        ("Are diagnostic blood tests and pharmacy available on-site?", "Yes, our central testing laboratory and pharmacy operate from 7:30 AM to 9:30 PM daily under the same roof."),
        ("Can we consult doctors online via telemedicine?", "Yes, established patients can book follow-up video consultations for report reviews and prescription renewals.")
    ],
    "form_head": "Book Your Doctor Consultation",
    "form_sub": "Select doctor, date, and preferred morning or evening timing for instant WhatsApp confirmation.",
    "default_service_inquiry": "Pediatric Consultation - Dr. Meenakshi Sundaram",
    "themes": [
        {
            "id": "compassionate-sky-blue",
            "name": "Compassionate Sky",
            "icon": "💙",
            "bg_primary": "#F8FAFC",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F1F5F9",
            "text_primary": "#0F172A",
            "text_muted": "#334155",
            "text_subtle": "#64748B",
            "border_color": "#E2E8F0",
            "accent": "#0EA5E9",
            "accent_hover": "#0284C7",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(14, 165, 233, 0.12)",
            "badge_bg": "#E0F2FE",
            "badge_text": "#0369A1",
            "radius": "12px",
            "font_heading": "Plus Jakarta Sans",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(248, 250, 252, 0.95)",
            "shadow": "0 10px 30px rgba(15, 23, 42, 0.08)"
        },
        {
            "id": "executive-clinic-slate",
            "name": "Urban Slate",
            "icon": "🏢",
            "bg_primary": "#0F172A",
            "bg_surface": "#1E293B",
            "bg_card": "#243248",
            "bg_card_hover": "#2D3E59",
            "text_primary": "#F8FAFC",
            "text_muted": "#CBD5E1",
            "text_subtle": "#94A3B8",
            "border_color": "rgba(13, 148, 136, 0.25)",
            "accent": "#0D9488",
            "accent_hover": "#14B8A6",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(13, 148, 136, 0.15)",
            "badge_bg": "rgba(13, 148, 136, 0.18)",
            "badge_text": "#5EEAD4",
            "radius": "8px",
            "font_heading": "Space Grotesk",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(15, 23, 42, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.8)"
        },
        {
            "id": "holistic-family-mint",
            "name": "Family Mint",
            "icon": "🌱",
            "bg_primary": "#F7FAF7",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#EDF5ED",
            "text_primary": "#1A2E1A",
            "text_muted": "#3D573D",
            "text_subtle": "#5D7A5D",
            "border_color": "#D5E5D5",
            "accent": "#16A34A",
            "accent_hover": "#15803D",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(22, 163, 74, 0.12)",
            "badge_bg": "#DCFCE7",
            "badge_text": "#15803D",
            "radius": "16px",
            "font_heading": "Playfair Display",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(247, 250, 247, 0.95)",
            "shadow": "0 8px 24px rgba(22, 163, 74, 0.08)"
        }
    ]
})

# 11. DOCTOR SPECIALIST & SENIOR CONSULTANT
all_niches.append({
    "key": "doctor",
    "filename": "11_doctor_specialist_demo.html",
    "title": "Dr. Arvind Swaminathan | Senior Robotic Joint Replacement & Orthopedic Surgeon",
    "meta_desc": "MBBS, MS (Ortho), MCh, FRCS (UK). Pioneer in sub-millimeter robotic knee and hip replacements with 24-hour walking protocols. Consulting across premier tertiary hospitals.",
    "niche_label": "Doctor Specialist & Senior Consultant",
    "brand_name": "DR. ARVIND SWAMINATHAN",
    "brand_tagline": "ROBOTIC JOINT REPLACEMENT & ORTHOPEDIC SURGEON",
    "hero_badge": "👨‍⚕️ MBBS, MS (Ortho), MCh, FRCS (Glasgow) • 22+ Years Surgical Excellence",
    "h1": "Pioneering Robotic Precision In Joint Reconstruction",
    "subtitle": "Sub-millimeter robotic knee and hip replacements, minimally invasive arthroscopic keyhole surgery, and 24-hour walking recovery protocols. Restoring pain-free mobility to over 6,500 patients.",
    "primary_cta": "📋 Request Surgical Second Opinion",
    "secondary_cta": "Locate Hospital Chambers",
    "hero_img": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    "stats": [("6,500+", "Surgeries Performed"), ("22 Yrs", "Surgical Experience"), ("24 Hours", "Post-Op Walking Protocol"), ("99.2%", "Patient Recommendation Score")],
    "trust_badges": ["FRCS (GLASGOW) FELLOW", "ROBOTIC SURGERY CERTIFIED", "NABH TERTIARY HOSPITAL AFFILIATIONS", "CASHLESS MEDICLAIM DESK"],
    "services_head": "Super-Specialty Surgical Disciplines",
    "services_sub": "World-class surgical precision coupled with compassionate, unhurried patient counseling.",
    "services": [
        ("Robotic Total Knee Replacement", "Sub-millimeter CT-guided robotic bone resection, personalized implant alignment, and zero muscle cutting for rapid 24-hour walking.", "₹1,80,000 surgical package", "Robotic Knee", "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"),
        ("Minimally Invasive Total Hip Arthroplasty", "Direct anterior muscle-sparing approach ensuring minimal blood loss, no dislocation risk, and rapid return to driving.", "₹2,10,000 surgical package", "Hip Arthroplasty", "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"),
        ("Arthroscopic Sports Keyhole Ligament Surgery", "Pinhole ACL/PCL ligament reconstruction and meniscus preservation with rapid return to competitive athletics.", "₹1,20,000 surgical package", "Sports Medicine", "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"),
        ("Second Opinion & Complex Revision Surgery", "Expert radiological re-evaluation of failed joint implants, bone cement loosening, and revision reconstructive planning.", "₹1,500 consultation", "Expert Second Opinion", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80")
    ],
    "interactive_head": "Remote Surgical Second-Opinion Portal",
    "interactive_sub": "Upload previous MRI/X-Ray reports for Dr. Swaminathan's personal clinical evaluation before deciding on surgery.",
    "interactive_html": """
      <div style="max-width: 600px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border-color);">
        <div class="form-group">
          <label>Joint Affected / Chief Complaint</label>
          <select id="docJoint" class="form-ctrl">
            <option>Severe Knee Osteoarthritis (Advised Knee Replacement)</option>
            <option>Hip Joint Avascular Necrosis (AVN) / Osteoarthritis</option>
            <option>Sports Injury / ACL Tear / Meniscus Damage</option>
            <option>Painful Previous Joint Surgery (Revision Case)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Duration of Pain & Symptoms</label>
          <select id="docDur" class="form-ctrl">
            <option>&gt; 1 Year with Severe Mobility Loss</option>
            <option>6 Months – 1 Year (Pain on Climbing Stairs)</option>
            <option>Acute Recent Injury (&lt; 3 Months)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Upload X-Ray / MRI Scan Report (PDF / Image)</label>
          <input type="file" class="form-ctrl" id="docFile" style="padding: 8px;">
        </div>
        <div style="background: var(--bg-surface); padding: 20px; border-radius: var(--radius); border: 1px dashed var(--accent); margin-top: 20px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">SECOND OPINION PROTOCOL</div>
          <div style="font-size: 22px; font-weight: 800; color: var(--accent); font-family: var(--font-heading); margin: 6px 0;">Comprehensive Surgical Review in 24 Hrs</div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">Dr. Swaminathan personally reviews scan angles to evaluate if conservative non-surgical care is possible.</p>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 18px;" onclick="scrollToForm('Surgical Second Opinion')">Submit Reports For Personal Doctor Review</button>
      </div>""",
    "interactive_js": """
      // Second opinion upload placeholder
    """,
    "process_head": "The Surgical Healing Protocol",
    "process_sub": "From pre-operative optimization to pain-free 24-hour walking independence.",
    "process_steps": [
        ("01", "3D CT-Scan Bone Mapping", "Pre-operative digital planning creating a millimeter-precise 3D digital twin of your unique joint anatomy."),
        ("02", "Robotic Sub-Millimeter Surgery", "Robotic arm assists surgeon in preserving bone, balancing collateral ligaments, and eliminating human error."),
        ("03", "24-Hour Walking Protocol", "Multimodal pain management allowing patients to stand and take first steps within 24 hours of surgery."),
        ("04", "Dedicated Physiotherapy Handoff", "Structured home exercise regimen ensuring complete range of motion and return to active life in 3 weeks.")
    ],
    "reviews_head": "Patient Recovery Reflections",
    "reviews_sub": "Words from grateful patients who reclaimed pain-free movement.",
    "reviews": [
        ("S. Kalyanasundaram", "Retired Wing Commander (74 yrs)", "I was terrified of knee replacement for 5 years. Dr. Swaminathan performed bilateral robotic surgery, and I was walking without a stick in 3 weeks. An absolute master surgeon."),
        ("Anuradha Sen", "School Principal (58 yrs)", "His bedside manner is so calm and reassuring. He took 20 minutes to draw diagrams and explain why robotic surgery preserves more of my natural bone."),
        ("Rohan Bhatt", "Marathon Runner (34 yrs)", "Reconstructed my torn ACL after a football tackle. Back to running half-marathons in 7 months. Eternally grateful.")
    ],
    "faqs": [
        ("How is robotic joint replacement superior to conventional manual surgery?", "Robotic systems provide sub-millimeter precision in bone cuts and ligament balancing, resulting in significantly less tissue trauma, lower pain, and faster 24-hour walking recovery."),
        ("Which hospitals does Dr. Swaminathan operate in?", "Dr. Swaminathan performs surgeries exclusively in JCI and NABH-accredited tertiary hospital OTs equipped with modern laminar airflow systems."),
        ("Is cashless health insurance mediclaim supported?", "Yes, our clinical coordinator liaises directly with all major insurance TPAs to handle cashless pre-authorization with zero hassle to the family.")
    ],
    "form_head": "Consult Dr. Arvind Swaminathan",
    "form_sub": "Schedule an in-person chamber consultation or remote second opinion. Our clinical secretary will confirm via WhatsApp.",
    "default_service_inquiry": "Robotic Knee Replacement Consultation",
    "themes": [
        {
            "id": "eminent-surgical-navy",
            "name": "Eminent Navy",
            "icon": "👨‍⚕️",
            "bg_primary": "#071529",
            "bg_surface": "#0C213E",
            "bg_card": "#132D54",
            "bg_card_hover": "#1B3B6D",
            "text_primary": "#F8FAFC",
            "text_muted": "#CBD5E1",
            "text_subtle": "#94A3B8",
            "border_color": "rgba(212, 175, 55, 0.25)",
            "accent": "#D4AF37",
            "accent_hover": "#F3CE5E",
            "accent_contrast": "#071529",
            "accent_light": "rgba(212, 175, 55, 0.15)",
            "badge_bg": "rgba(212, 175, 55, 0.18)",
            "badge_text": "#F5D87F",
            "radius": "10px",
            "font_heading": "Cormorant Garamond",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(7, 21, 41, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.8)"
        },
        {
            "id": "robotic-precision-dark",
            "name": "Robotic Slate",
            "icon": "🤖",
            "bg_primary": "#0A0F1D",
            "bg_surface": "#121A2E",
            "bg_card": "#1A2540",
            "bg_card_hover": "#233154",
            "text_primary": "#F0F9FF",
            "text_muted": "#BAE6FD",
            "text_subtle": "#7DD3FC",
            "border_color": "rgba(56, 189, 248, 0.25)",
            "accent": "#38BDF8",
            "accent_hover": "#7DD3FC",
            "accent_contrast": "#0A0F1D",
            "accent_light": "rgba(56, 189, 248, 0.15)",
            "badge_bg": "rgba(56, 189, 248, 0.18)",
            "badge_text": "#BAE6FD",
            "radius": "6px",
            "font_heading": "Space Grotesk",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(10, 15, 29, 0.95)",
            "shadow": "0 20px 48px rgba(0, 0, 0, 0.8)"
        },
        {
            "id": "patient-compassion-pearl",
            "name": "Clinical Pearl",
            "icon": "🩺",
            "bg_primary": "#FBFBFB",
            "bg_surface": "#FFFFFF",
            "bg_card": "#FFFFFF",
            "bg_card_hover": "#F4F4F5",
            "text_primary": "#18181B",
            "text_muted": "#3F3F46",
            "text_subtle": "#71717A",
            "border_color": "#E4E4E7",
            "accent": "#1E293B",
            "accent_hover": "#0F172A",
            "accent_contrast": "#FFFFFF",
            "accent_light": "rgba(30, 41, 59, 0.1)",
            "badge_bg": "#F4F4F5",
            "badge_text": "#18181B",
            "radius": "14px",
            "font_heading": "Playfair Display",
            "font_body": "Plus Jakarta Sans",
            "header_bg": "rgba(251, 251, 251, 0.95)",
            "shadow": "0 8px 24px rgba(0, 0, 0, 0.06)"
        }
    ]
})

print(f"Total niches ready for supreme generation: {len(all_niches)}")

for niche_data in all_niches:
    html_content = render_page(niche_data)
    out_path = os.path.join(OUT_DIR, niche_data["filename"])
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[OK] Generated: {niche_data['filename']} ({len(html_content)} bytes)")

print("\nALL 11 SUPREME NICHE DEMOS SUCCESSFULLY GENERATED & SAVED!")
