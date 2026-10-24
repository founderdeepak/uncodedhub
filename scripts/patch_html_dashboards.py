import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGETS = [
    os.path.join(BASE_DIR, "public", "team-outreach", "index.html"),
    os.path.join(BASE_DIR, "local_map_outreach", "dashboard.html")
]

ALL_17_NICHES_JS = """    const NICHES = {
      "01_interior_designers": {
        id: "01_interior_designers",
        name: "Interior Designers & Architects",
        icon: "🎨",
        demo_name: "Meridian Interiors Demo",
        demo_file: "interior-design.html",
        demo_url: "https://uncodedhub.com/demos/interior-design.html",
        hook: "high-end visual before/after project showcase, 3D floor plan explorer, and instant client inquiry capture"
      },
      "02_real_estate_agents": {
        id: "02_real_estate_agents",
        name: "Real Estate Agents & Realtors",
        icon: "🏢",
        demo_name: "Marlow Realty Demo",
        demo_file: "real-estate.html",
        demo_url: "https://uncodedhub.com/demos/real-estate.html",
        hook: "verified property listings, virtual walkthrough requests, neighborhood guides, and instant WhatsApp booking"
      },
      "03_dental_aesthetic_clinics": {
        id: "03_dental_aesthetic_clinics",
        name: "Dental & Aesthetic Clinics",
        icon: "🦷",
        demo_name: "Willowmere Dental Clinic",
        demo_file: "dental-clinic.html",
        demo_url: "https://uncodedhub.com/demos/dental-clinic.html",
        hook: "instant patient appointment scheduling, before/after smile transformations, and doctor credential profiles"
      },
      "04_wedding_photographers": {
        id: "04_wedding_photographers",
        name: "Wedding Photographers & Videographers",
        icon: "📷",
        demo_name: "Alder & Wren Photography",
        demo_file: "wedding-photography.html",
        demo_url: "https://uncodedhub.com/demos/wedding-photography.html",
        hook: "full-bleed photo galleries, 4K wedding films reel, package pricing guides, and live date availability checker"
      },
      "05_home_renovation_modular_kitchens": {
        id: "05_home_renovation_modular_kitchens",
        name: "Home Renovation & Modular Kitchens",
        icon: "🔨",
        demo_name: "Halbrook Renovation Studio",
        demo_file: "home-renovation.html",
        demo_url: "https://uncodedhub.com/demos/home-renovation.html",
        hook: "kitchen & wardrobe material visualizer, instant renovation cost estimator, and site inspection booking"
      },
      "06_coaches_consultants": {
        id: "06_coaches_consultants",
        name: "Coaches & Business Consultants",
        icon: "🎯",
        demo_name: "Naomi Reyes Coaching",
        demo_file: "executive-coaching.html",
        demo_url: "https://uncodedhub.com/demos/executive-coaching.html",
        hook: "1-on-1 strategy call booking, client transformation case studies, program frameworks, and free lead magnet funnel"
      },
      "07_educational_academies": {
        id: "07_educational_academies",
        name: "Educational Academies & Coaching",
        icon: "🎓",
        demo_name: "Vanguard Academy Demo",
        demo_file: "educational-academy.html",
        demo_url: "https://uncodedhub.com/demos/educational-academy.html",
        hook: "exam ranker results showcase, batch seat countdown timer, interactive curriculum explorer, and WhatsApp counseling triage"
      },
      "08_commercial_gyms": {
        id: "08_commercial_gyms",
        name: "Commercial Gyms & Fitness Clubs",
        icon: "🏋️",
        demo_name: "Titan Strength Club Demo",
        demo_file: "gym-fitness-club.html",
        demo_url: "https://uncodedhub.com/demos/gym-fitness-club.html",
        hook: "instant 1-tap workout trial pass, interactive class timetable, virtual equipment tour, and membership calculator"
      },
      "09_b2b_corporate_advisory": {
        id: "09_b2b_corporate_advisory",
        name: "Enterprise B2B & Corporate Advisory",
        icon: "💼",
        demo_name: "Meridian Advisory Demo",
        demo_file: "business-portfolio.html",
        demo_url: "https://uncodedhub.com/demos/business-portfolio.html",
        hook: "executive credentials showcase, B2B diagnostic assessment, confidential case studies, and C-level inquiry intake"
      },
      "10_luxury_spas_wellness": {
        id: "10_luxury_spas_wellness",
        name: "Luxury Spas & Wellness Retreats",
        icon: "🌿",
        demo_name: "Elysian Sanctuary Spa Demo",
        demo_file: "spa-wellness.html",
        demo_url: "https://uncodedhub.com/demos/spa-wellness.html",
        hook: "interactive treatment ritual menu, couple retreat calculator, botanical ingredient transparency, and VIP advance reservation"
      },
      "11_salons_bridal_beauty": {
        id: "11_salons_bridal_beauty",
        name: "Salons & Bridal Beauty Studios",
        icon: "💄",
        demo_name: "Aura Bridal Atelier Demo",
        demo_file: "salon-beauty.html",
        demo_url: "https://uncodedhub.com/demos/salon-beauty.html",
        hook: "before/after bridal beauty slider, high-res lookbook, wedding date availability engine, and trial booking funnel"
      },
      "12_fitness_coaches": {
        id: "12_fitness_coaches",
        name: "Private Fitness Coaches & Trainers",
        icon: "🏃",
        demo_name: "Apex Athletic Coaching Demo",
        demo_file: "fitness-coach.html",
        demo_url: "https://uncodedhub.com/demos/fitness-coach.html",
        hook: "1-on-1 transformation application funnel, verified DEXA case studies, and macro calculator lead magnet"
      },
      "13_yoga_meditation": {
        id: "13_yoga_meditation",
        name: "Yoga Shalas & Meditation Sanctuaries",
        icon: "🧘",
        demo_name: "Prana Yoga Shala Demo",
        demo_file: "yoga-meditation.html",
        demo_url: "https://uncodedhub.com/demos/yoga-meditation.html",
        hook: "weekly class timetable grid, 200-hour TTC curriculum breakdown, teacher lineage philosophy, and drop-in trial pass"
      },
      "14_creative_studios": {
        id: "14_creative_studios",
        name: "Creative Studios & Design Agencies",
        icon: "🚀",
        demo_name: "Kroma Creative Agency Demo",
        demo_file: "creative-portfolio.html",
        demo_url: "https://uncodedhub.com/demos/creative-portfolio.html",
        hook: "interactive case studies, brand identity before/after slider, deliverable pricing bands, and sub-second visual portfolio"
      },
      "15_pathology_diagnostic_labs": {
        id: "15_pathology_diagnostic_labs",
        name: "Pathology Labs & Diagnostic Centers",
        icon: "🔬",
        demo_name: "Precision Pathology Demo",
        demo_file: "healthcare-diagnostics.html",
        demo_url: "https://uncodedhub.com/demos/healthcare-diagnostics.html",
        hook: "1-click home sample collection booking, transparent test price menu, turnaround time guarantees, and WhatsApp report delivery"
      },
      "16_polyclinics_outpatient": {
        id: "16_polyclinics_outpatient",
        name: "Multi-Specialty Polyclinics",
        icon: "🏥",
        demo_name: "MetroCare Polyclinic Demo",
        demo_file: "clinic-polyclinic.html",
        demo_url: "https://uncodedhub.com/demos/clinic-polyclinic.html",
        hook: "department symptom triage, multi-doctor OPD schedules, cashless insurance guides, and emergency triage speed"
      },
      "17_doctor_specialists": {
        id: "17_doctor_specialists",
        name: "Super-Specialist Doctors & Surgeons",
        icon: "🩺",
        demo_name: "Dr. Christopher Vance Demo",
        demo_file: "doctor-specialist.html",
        demo_url: "https://uncodedhub.com/demos/doctor-specialist.html",
        hook: "surgical case volume proof, ethical patient recovery guides, second-opinion teleconsultations, and NMC compliance"
      }
    };"""

for file_path in TARGETS:
    if not os.path.exists(file_path):
        print("Skipping non-existent:", file_path)
        continue

    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Update Subtitle
    html = re.sub(
        r'<p>Live 2-Way Sync between Deepak & Geetha · \d+ High-Ticket Niches</p>',
        '<p>Live 2-Way Sync between Deepak & Geetha · 17 High-Ticket Niches (17,000 Social DMs · 3,400 Google Maps Leads)</p>',
        html
    )
    html = re.sub(
        r'<p>High-Ticket Lead Generation Engine: \d+ Niches.*?</p>',
        '<p>High-Ticket Lead Generation Engine: 17 Niches (17,000 Social DMs · 3,400 Google Maps Leads) in Bengaluru & Chennai</p>',
        html
    )

    # 2. Update Engine Button labels
    html = re.sub(
        r'<span>📱</span>\s*Social Cold DMs\s*\([^<]+\)',
        '<span>📱</span> Social Cold DMs (17,000 Leads · 17 Niches)',
        html
    )
    html = re.sub(
        r'<span>📍</span>\s*Google Maps (?:Scraper|Leads)\s*\([^<]+\)',
        '<span>📍</span> Google Maps Leads (3,400 Leads · 17 Niches)',
        html
    )

    # 3. Update NICHES definition in JS
    html = re.sub(
        r'const NICHES = \{[\s\S]*?\n    \};',
        ALL_17_NICHES_JS.strip(),
        html
    )

    # 4. Update Kickoff Date to Oct 24, 2026 (Month index 9 is October)
    html = re.sub(
        r'const KICKOFF_DATE = new Date\(2026, \d+, \d+\);',
        'const KICKOFF_DATE = new Date(2026, 9, 24); // Saturday, Oct 24, 2026',
        html
    )

    # 5. Update Kickoff Text
    html = re.sub(
        r'🚀 Day 01 Kickoff: [^<]+',
        '🚀 Day 01 Kickoff: Sat, Oct 24, 2026',
        html
    )

    # 6. Update PIN authentication to accept 2026 or 9940 or 19835
    if 'const VALID_PINS' not in html:
        html = html.replace(
            'const CORRECT_PIN = "2026";',
            'const VALID_PINS = ["2026", "9940", "19835"];\n    const CORRECT_PIN = "2026";'
        )
        html = html.replace(
            'if (val === CORRECT_PIN) {',
            'if (VALID_PINS.includes(val) || val === CORRECT_PIN) {'
        )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Patched successfully: {file_path}")
