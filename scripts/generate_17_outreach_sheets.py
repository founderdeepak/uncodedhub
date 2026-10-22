import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

# Destination directory
OUTPUT_DIR = os.path.abspath("Outreach_System/17_Niches_Outreach_Sheets")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 17 Niches matching Uncoded Hub Master Taxonomy
NICHES = [
    {
        "num": "1",
        "title": "Educational Academies & Coaching Institutes",
        "folder_name": "1. Educational Academies & Coaching Institutes",
        "key": "educational-academy",
        "target_titles": "Founder, Director, Managing Trustee, Head of Admissions",
        "pain_points": "Coaching website crashes on result days, static PDF brochures, no real-time seat availability funnels, high student drop-offs",
        "sample_leads": [
            ("Apex IIT-JEE & NEET Academy", "Kota & Jaipur", "Director R.K. Verma", "+91 98290 12345", "http://apexiitjee-kota.in", "Slow WordPress, crashes during admission peaks", "rkverma@apexiitjee.in", "@apexiitacademy"),
            ("Ignite Medical & Foundation Institute", "Bangalore", "Dr. S. Radhakrishnan", "+91 98450 67890", "http://ignitemedical.co.in", "Generic template, static PDF syllabus, no WhatsApp trial booking", "admissions@ignitemedical.co.in", "@ignite_academy_blr"),
            ("Chanakya Law & Judicial Academy", "Delhi NCR", "Advocate M. Singhania", "+91 98110 34567", "http://chanakyalawacademy.com", "Broken mobile layout, zero exam ranker proof, outdated 2021 theme", "director@chanakyalaw.com", "@chanakyalaw")
        ]
    },
    {
        "num": "2",
        "title": "Commercial Gyms & Fitness Clubs",
        "folder_name": "2. Commercial Gyms & Fitness Clubs",
        "key": "gym-fitness-club",
        "target_titles": "Gym Owner, General Manager, Managing Partner, Fitness Director",
        "pain_points": "Paying 25% commissions to aggregators (Cult/ClassPass), heavy slow video backgrounds, missed phone inquiries at reception",
        "sample_leads": [
            ("Titan Iron & Performance Gym", "Mumbai (Bandra)", "Vikramaditya Rao", "+91 98200 11223", "http://titanirongym.com", "Heavy video header taking 6s to load on 4G, no 1-tap day pass engine", "management@titanirongym.com", "@titanirongym"),
            ("Olympus Strength & Conditioning", "Hyderabad", "Karthik Reddy", "+91 99890 22334", "http://olympusstrength.in", "Wix template with broken timetable, paying 25% aggregator cuts", "karthik@olympusstrength.in", "@olympus_fitness_hyd"),
            ("Pulse 24/7 Wellness Club", "Pune", "Sneha Kulkarni", "+91 98900 33445", "http://pulsewellnessclub.co.in", "No locker room hygiene proof, zero price transparency, clunky contact form", "info@pulsewellnessclub.co.in", "@pulse247gym")
        ]
    },
    {
        "num": "3",
        "title": "Interior Designers & Architects",
        "folder_name": "3. Interior Designers & Architects",
        "key": "interior-designers",
        "target_titles": "Principal Architect, Managing Partner, Design Director, Founder",
        "pain_points": "Heavy 3D renders causing 8s LCP on mobile, losing high-budget clients to Livspace/HomeLane, no budget transparency",
        "sample_leads": [
            ("Atelier Vistara Architecture & Interiors", "Bangalore", "Ar. Varun Somani", "+91 98451 12345", "http://ateliervistara.in", "High-res photos taking 7.8s to load on phones, no client onboarding portal", "varun@ateliervistara.in", "@ateliervistara"),
            ("Studio Morpheus Bespoke Spaces", "Delhi (South Ex)", "Meera Sen", "+91 98101 45678", "http://studiomorph.co.in", "Squarespace site with zero drawings or process proof, no transparent cost estimator", "meera@studiomorph.co.in", "@studiomorpheus_interiors"),
            ("Kavya & Associates Luxury Residential", "Chennai", "Ar. Arvind Swaminathan", "+91 98400 89123", "http://kavyaassociates.com", "Outdated 2018 WordPress theme, broken mobile project navigation", "arvind@kavyaassociates.com", "@kavya_architecture")
        ]
    },
    {
        "num": "4",
        "title": "Real Estate & Property Consultants",
        "folder_name": "4. Real Estate & Property Consultants",
        "key": "real-estate",
        "target_titles": "Managing Director, Luxury Property Consultant, Channel Partner Head",
        "pain_points": "Total dependency on 99acres & MagicBricks, slow third-party MLS/IDX iframes, unverified leads wasting broker time",
        "sample_leads": [
            ("Sovereign Prime Luxury Realty", "Gurugram (Golf Course Rd)", "Sameer Kochhar", "+91 98111 22334", "http://sovereignprimerealty.com", "Relying purely on 99acres leads, slow iframe property search, no WhatsApp routing", "sameer@sovereignprimerealty.com", "@sovereignprime_realty"),
            ("Coastal Blue Villa Consultants", "Goa & Alibaug", "Nadia Vaz", "+91 98221 67890", "http://coastalbluevillas.in", "Slow WordPress site, heavy drone videos without mobile compression, no buyer qualification", "nadia@coastalbluevillas.in", "@coastalbluegoa"),
            ("Meridian Commercial Asset Advisors", "Bangalore (Whitefield)", "Pranav Hegde", "+91 99000 44556", "http://meridiancommercial.co.in", "No fractional SPV or lease yield calculators, unverified contact forms", "pranav@meridiancommercial.co.in", "@meridianassets")
        ]
    },
    {
        "num": "5",
        "title": "Dental & Aesthetic Clinics",
        "folder_name": "5. Dental & Aesthetic Clinics",
        "key": "dental-clinics",
        "target_titles": "Chief Dental Surgeon, Clinical Director, Aesthetic Clinic Founder",
        "pain_points": "Cheap templates destroying high-ticket implant and aligner inquiries, no transparent procedure pricing, missing WhatsApp triage",
        "sample_leads": [
            ("Pearl Dental & Clear Aligner Studio", "Mumbai (Juhu)", "Dr. Rohan Merchant, MDS", "+91 98201 55667", "http://pearldentaljuhu.com", "No clear aligner cost calculator, generic stock photos, slow mobile speed", "drrohan@pearldentaljuhu.com", "@pearldental_juhu"),
            ("Zenith Implant & Laser Center", "Delhi (Vasant Vihar)", "Dr. Tanya Grover", "+91 98112 66778", "http://zenithdentalimplant.in", "Outdated clinical theme, no anxious patient phobia guide, missing WhatsApp booking", "contact@zenithdentalimplant.in", "@zenithdentalcenter"),
            ("Apex Smiles Multispecialty Clinic", "Hyderabad (Jubilee Hills)", "Dr. Abhinav Rao", "+91 99490 88990", "http://apexsmileshyd.com", "Missing dental tourism and international patient pricing packages", "info@apexsmileshyd.com", "@apexsmiles_hyd")
        ]
    },
    {
        "num": "6",
        "title": "Wedding Photographers & Event Planners",
        "folder_name": "6. Wedding Photographers & Event Planners",
        "key": "wedding-photographers",
        "target_titles": "Lead Cinematographer, Creative Director, Wedding Planning Founder",
        "pain_points": "Over-reliance on Instagram algorithm changes, unoptimized 4K wedding films buffering on phones, opaque package pricing",
        "sample_leads": [
            ("Eternal Frame Wedding Cinematography", "Udaipur & Mumbai", "Karan Malhotra", "+91 98210 99887", "http://eternalframecinemas.com", "4K video trailers crashing mobile browsers, no wedding date availability checker", "karan@eternalframecinemas.com", "@eternalframefilms"),
            ("The Velvet Mandap Luxury Events", "Jaipur & Delhi", "Divya Rathore", "+91 98291 44556", "http://thevelvetmandap.in", "Wix site with unorganized lookbooks, no destination wedding logistics breakdown", "divya@thevelvetmandap.in", "@thevelvetmandap"),
            ("South Lights Traditional Weddings", "Kochi & Chennai", "Rahul Menon", "+91 98470 33221", "http://southlightsweddings.co.in", "No function-wise portfolio categorization, no transparent equipment or drone permits info", "rahul@southlightsweddings.co.in", "@southlightsweddings")
        ]
    },
    {
        "num": "7",
        "title": "Home Renovation & Modular Kitchens",
        "folder_name": "7. Home Renovation & Modular Kitchens",
        "key": "home-renovation",
        "target_titles": "Turnkey Contractor, Modular Studio Founder, Renovation Managing Director",
        "pain_points": "Losing leads to Livspace, no delay penalty guarantee pages, unverified sub-contractor fears, vague price quotes",
        "sample_leads": [
            ("Vanguard Modular Kitchens & Wardrobes", "Bangalore", "Sandeep Nair", "+91 98860 11447", "http://vanguardmodular.in", "No Hafele/Blum hardware transparency, no virtual 3D consultation scheduler", "sandeep@vanguardmodular.in", "@vanguardkitchens"),
            ("Metrocraft Turnkey Flat Renovation", "Mumbai (Thane)", "Nilesh Patil", "+91 98202 77889", "http://metrocraftrenovations.com", "No society demolition guidelines or delay penalty page, slow WordPress theme", "nilesh@metrocraftrenovations.com", "@metrocraft_homes"),
            ("Heritage Restoration & Living Spaces", "Kolkata", "Anirban Ghosh", "+91 98310 55667", "http://heritagerenovate.co.in", "Zero before/after renovation sliders, missing turnkey square-foot pricing bands", "anirban@heritagerenovate.co.in", "@heritage_restoration_in")
        ]
    },
    {
        "num": "8",
        "title": "Coaches & Business Consultants",
        "folder_name": "8. Coaches & Business Consultants",
        "key": "coaches-consultants",
        "target_titles": "Executive Leadership Coach, Management Consultant, Keynote Speaker",
        "pain_points": "Generic open Calendly links that invite tire-kickers, no qualified application funnel, lack of measurable EBITDA case studies",
        "sample_leads": [
            ("Ascent Executive Leadership Advisory", "Gurugram", "Col. Sanjeev Dewan (Retd.)", "+91 98113 44556", "http://ascentexecutivecoach.com", "Generic Calendly link with no pre-qualification, zero Fortune 500 case study proof", "sanjeev@ascentexecutivecoach.com", "@sanjeevdewancoach"),
            ("ScaleX B2B SaaS Growth Advisory", "Bangalore", "Arun Chandrashekar", "+91 99011 88990", "http://scalexadvisory.co.in", "Substack/Medium only, no owned authority flagship, no fractional retainer tiers", "arun@scalexadvisory.co.in", "@arunscalex"),
            ("Quantum Career Transition Systems", "Pune", "Pooja Mirchandani", "+91 98901 22334", "http://quantumcareertransition.com", "Slow page builder, generic stock coaching imagery, no verified alumni placement proof", "pooja@quantumcareer.com", "@poojacareercoach")
        ]
    },
    {
        "num": "9",
        "title": "Enterprise B2B & Corporate Advisory",
        "folder_name": "9. Enterprise B2B & Corporate Advisory",
        "key": "business-portfolio",
        "target_titles": "Managing Partner, Senior Partner, Practice Head, Chief Strategy Officer",
        "pain_points": "Vulnerable WordPress CMS creating enterprise security red-flags, lack of SOC2/GDPR compliance, opaque engagement models",
        "sample_leads": [
            ("Apex Global Strategic Partners", "Mumbai (BKC)", "Cyrus Mistry Associates", "+91 98203 11224", "http://apexstrategypartners.com", "WordPress site with vulnerable plugins, no SOC2 compliance disclosures", "contact@apexstrategypartners.com", "@apexstrategyb2b"),
            ("Vanguard M&A Advisory Group", "Delhi", "Harsh Vardhan Singhal", "+91 98114 99887", "http://vanguardma.co.in", "Lacks quantified EBITDA transformation studies, no cross-border multi-currency portal", "hsinghal@vanguardma.co.in", "@vanguard_ma"),
            ("Beacon Boardroom Governance Advisors", "Singapore & Chennai", "R. Venkatraman", "+91 98401 77665", "http://beaconboardroom.com", "Missing partner-track recruitment chapter and keynote presentation archive", "venkat@beaconboardroom.com", "@beaconadvisory")
        ]
    },
    {
        "num": "10",
        "title": "Luxury Spas & Wellness Retreats",
        "folder_name": "10. Luxury Spas & Wellness Retreats",
        "key": "spa-wellness",
        "target_titles": "Spa Director, Resort Owner, Wellness Operations Head, General Manager",
        "pain_points": "Heavy video backgrounds causing booking bounce rates, third-party Fresha/Mindbody lock-in, missing digital gift card engine",
        "sample_leads": [
            ("Aura Santuário Ayurvedic Luxury Spa", "Coorg & Bangalore", "Maya Nambiar", "+91 98452 33445", "http://aurasantuario.in", "Buffering video background causing 4.5s lag, no interactive couple package calculator", "reservations@aurasantuario.in", "@aurasantuario_spa"),
            ("The Himalayan Salt & Sound Sanctuary", "Rishikesh", "Swami Anand Ved", "+91 98370 12345", "http://himalayansaltsanctuary.com", "Flat unreadable PDF treatment menu, no advance deposit payment gateway", "welcome@himalayansaltsanctuary.com", "@himalayansanctuary"),
            ("Nirvana Urban Hydrotherapy & Day Spa", "Mumbai (Colaba)", "Farah Contractor", "+91 98204 66778", "http://nirvanaspa-colaba.com", "Missing seasonal gift voucher engine, no therapist certification lineage page", "farah@nirvanaspa-colaba.com", "@nirvanadayspa")
        ]
    },
    {
        "num": "11",
        "title": "Salons & Bridal Beauty",
        "folder_name": "11. Salons & Bridal Beauty",
        "key": "salon-beauty",
        "target_titles": "Salon Founder, Celebrity Makeup Artist, Master Stylist, Managing Director",
        "pain_points": "Heavy Instagram dependency, brides unable to inspect real skin texture without airbrush blur, peak date double-booking panic",
        "sample_leads": [
            ("Zoya Celebrity Bridal Beauty Atelier", "Delhi (GK-2)", "Zoya Khan", "+91 98115 22334", "http://zoyabridalbeauty.com", "Relying 100% on Instagram DMs, no real skin texture before/after sliders", "bookings@zoyabridalbeauty.com", "@zoyakhan_bridal"),
            ("Glow & Grace Luxury Hair & Skin Lounge", "Chandigarh", "Simran Bedi", "+91 98760 55667", "http://glowandgracechandigarh.in", "No function-wise bridal lookbook, missing paid trial booking funnel", "simran@glowandgrace.in", "@glowandgrace_salon"),
            ("Blush Couture Bridal Studio", "Ahmedabad", "Kinjal Patel", "+91 98250 88990", "http://blushcouturestudio.com", "No peak-season date checker, zero pricing transparency between Airbrush vs HD", "kinjal@blushcouturestudio.com", "@blushcouture_bridal")
        ]
    },
    {
        "num": "12",
        "title": "Private Fitness Coaches & Personal Trainers",
        "folder_name": "12. Private Fitness Coaches & Personal Trainers",
        "key": "fitness-coach",
        "target_titles": "High-Performance Coach, Executive Personal Trainer, Transformation Specialist",
        "pain_points": "Looking like an amateur with Linktree, selling commoditized hourly rates instead of high-ticket retainers, zero DEXA scan proof",
        "sample_leads": [
            ("Rohan Varma Executive Transformation", "Mumbai & Dubai", "Rohan Varma", "+91 98205 33221", "http://rohanvarmafitness.com", "Linktree in bio, hourly session pricing, no qualified 12-week roadmap application funnel", "rohan@rohanvarmafitness.com", "@rohanvarma_fit"),
            ("Iron Core Functional Rehabilitation", "Bangalore (Indiranagar)", "Capt. Dennis D'Souza", "+91 98453 66778", "http://ironcorefunctional.in", "Missing clinical DEXA/blood panel transformation proof, clunky PDF check-in forms", "dennis@ironcorefunctional.in", "@ironcore_dennis"),
            ("Athena Elite Women's Strength Coaching", "Delhi", "Ritika Sharma", "+91 98116 88990", "http://athenaelitefitness.com", "No automated macro/TDEE calculator lead magnet, no corporate wellness pitch page", "ritika@athenaelite.com", "@ritika_athenacoach")
        ]
    },
    {
        "num": "13",
        "title": "Traditional Yoga Shalas & Meditation Sanctuaries",
        "folder_name": "13. Traditional Yoga Shalas & Meditation Sanctuaries",
        "key": "yoga-meditation",
        "target_titles": "Shala Founder, Acharya, Lead Yoga Teacher Trainer, Retreat Director",
        "pain_points": "Clunky Mindbody widgets clashing with serene brand, international students dropping off TTC pages, static timetable images",
        "sample_leads": [
            ("Prana Mandiram Traditional Ashtanga Shala", "Mysore & Rishikesh", "Acharya Krishna Chaitanya", "+91 98454 11223", "http://pranamandiramyoga.org", "Mindbody iframe lag, international students abandon TTC page due to opaque lodging fees", "shala@pranamandiram.org", "@pranamandiram_mysore"),
            ("Bodhi Vriksha Mindfulness & Sound Sanctuary", "Dharamshala", "Tenzin & Radhika", "+91 98160 44556", "http://bodhivrikshayoga.in", "Static PNG image timetables that cannot be read on phones, missing 3-class trial pass", "namaste@bodhivriksha.in", "@bodhivrikshasound"),
            ("Ananda Kuteer Hatha & Breathwork Shala", "Pune", "Guru Devendra Shastri", "+91 98902 77889", "http://anandakuteeryoga.com", "No lineage and philosophy documentation, zero corporate desk-yoga proposal assets", "devendra@anandakuteer.com", "@anandakuteer_yoga")
        ]
    },
    {
        "num": "14",
        "title": "Creative Studios & Design Agencies",
        "folder_name": "14. Creative Studios & Design Agencies",
        "key": "creative-portfolio",
        "target_titles": "Creative Director, Managing Director, Founder, Head of Design",
        "pain_points": "Webflow/Framer vendor lock-in, image-only Behance portfolios that fail enterprise procurement audits, slow mobile speeds",
        "sample_leads": [
            ("Monolith Brand & Digital Design Studio", "Mumbai & London", "Kabir Bedi & Siddharth Sen", "+91 98206 44556", "http://monolithdesign.co", "Behance-style imagery with zero problem-to-lift commercial ROI case study breakdown", "hello@monolithdesign.co", "@monolith_design"),
            ("Kroma Interactive Product & UI Atelier", "Bangalore (Koramangala)", "Tanvi Shah", "+91 99002 66778", "http://kromastudio.in", "Webflow site stuttering at 35fps on mobile, no transparent retainer scope matrix", "tanvi@kromastudio.in", "@kromastudio_in"),
            ("Vanguard Narrative Design & Identity", "Delhi", "Rishi Kapoor", "+91 98117 11223", "http://vanguardnarrative.com", "Missing white-label agency alliance page, generic brief intake contact form", "rishi@vanguardnarrative.com", "@vanguard_identity")
        ]
    },
    {
        "num": "15",
        "title": "Pathology Labs & Diagnostic Centers",
        "folder_name": "15. Pathology Labs & Diagnostic Centers",
        "key": "healthcare-diagnostics",
        "target_titles": "Managing Director, Chief Pathologist, Lab Operations Head, Medical Director",
        "pain_points": "30% aggregator commission fee trap (1mg/PharmEasy), no instant home sample engine, patient confusion on fasting rules",
        "sample_leads": [
            ("Metropolis Diagnostic & Molecular Lab", "Pune & Kolhapur", "Dr. Satish Kulkarni, MD Path", "+91 98903 55667", "http://metropolisdiagnostics.in", "Paying heavy commission to health aggregators, no direct 1-click home sample engine", "drkulkarni@metropolisdiag.in", "@metropolis_diag_pune"),
            ("Apex Automated Pathology & Genomics", "Ahmedabad", "Dr. Hiren Bhatt", "+91 98251 22334", "http://apexpathology.co.in", "No Roche/Siemens equipment showcase proof, missing pre-test fasting checklist UX", "hiren@apexpathology.co.in", "@apexpathology_lab"),
            ("CareFirst Multispecialty Diagnostic Center", "Bangalore", "Dr. Meenakshi Sundaram", "+91 98455 77889", "http://carefirstdiagnostics.com", "No automated WhatsApp test report retrieval, flat PDF health checkup brochures", "reports@carefirstdiag.com", "@carefirst_health")
        ]
    },
    {
        "num": "16",
        "title": "Multi-Specialty Polyclinics & Outpatient Centers",
        "folder_name": "16. Multi-Specialty Polyclinics & Outpatient Centers",
        "key": "clinic-polyclinic",
        "target_titles": "Medical Director, Polyclinic Managing Trustee, Chief Administrator",
        "pain_points": "Patient data security risks with generic WordPress themes, chaotic front desk phone bottlenecks, zero symptom-based triage",
        "sample_leads": [
            ("MedStar Integrated Polyclinic & Daycare", "Bangalore (HSR Layout)", "Dr. Pradeep Kumar", "+91 98456 88990", "http://medstarpolyclinic.in", "Generic medical WordPress theme with security vulnerabilities, no WhatsApp OPD triage", "director@medstarpolyclinic.in", "@medstar_polyclinic"),
            ("CityCare Outpatient & Diagnostic Center", "Delhi (Dwarka)", "Dr. Alka Malhotra", "+91 98118 44556", "http://citycareclinic.co.in", "No emergency one-tap directions, missing interactive pediatric vaccination calendar", "info@citycareclinic.co.in", "@citycare_dwarka"),
            ("Sanjeevani Family Healthcare & Day Surgery", "Mumbai (Mulund)", "Dr. Nitin Deshmukh", "+91 98207 99001", "http://sanjeevaniclinic.com", "Opaque consultation fee schedules causing desk friction, no TPA insurance guide", "admin@sanjeevaniclinic.com", "@sanjeevani_clinic")
        ]
    },
    {
        "num": "17",
        "title": "Super-Specialist Doctors & Surgeons",
        "folder_name": "17. Super-Specialist Doctors & Surgeons",
        "key": "doctor-specialist",
        "target_titles": "Super-Specialist Surgeon, Medical Consultant, Head of Surgical Oncology/Ortho",
        "pain_points": "Trapped on Practo/Justdial with competitor ads on doctor profile, missing surgical volume proof, no second-opinion scan upload funnel",
        "sample_leads": [
            ("Dr. Arvind Ranganathan (Robotic Joint Replacement)", "Chennai & Colombo", "Dr. Arvind Ranganathan, FRCS", "+91 98402 33445", "http://drarvindjointreplacement.com", "Trapped on Practo directory, no transparent surgical case volume logbook (2500+ cases)", "drarvind@drarvindjoints.com", "@drarvind_ortho"),
            ("Dr. Meera Vasudevan (Laparoscopic GI & Bariatric Surgery)", "Bangalore", "Dr. Meera Vasudevan, MS, FMAS", "+91 98457 11223", "http://drmeeralaparoscopy.in", "Generic clinic page, missing pre-op and post-op recovery downloadable handbooks", "meera@drmeerasurgery.com", "@drmeera_surgery"),
            ("Dr. Sameer Al-Mansoor (Advanced Surgical Oncology)", "Mumbai & Hyderabad", "Dr. Sameer Al-Mansoor, MCh", "+91 98208 55667", "http://drsameeroncology.com", "No international medical tourism or second-opinion scan upload portal for outstation patients", "secondopinion@drsameer.com", "@drsameer_oncology")
        ]
    }
]

# Styling Palette (Modern Navy Executive Theme)
FONT_FAMILY = "Segoe UI"
COLOR_PRIMARY = "0F172A"       # Slate 900
COLOR_HEADER_TEXT = "FFFFFF"   # White
COLOR_ACCENT = "2563EB"        # Blue 600
COLOR_ACCENT_LIGHT = "EFF6FF"  # Blue 50
COLOR_BORDER = "CBD5E1"        # Slate 300
COLOR_ZEBRA = "F8FAFC"         # Slate 50
COLOR_KPI_BOX = "F1F5F9"       # Slate 100

font_title = Font(name=FONT_FAMILY, size=15, bold=True, color="0F172A")
font_subtitle = Font(name=FONT_FAMILY, size=10, italic=True, color="64748B")
font_section_header = Font(name=FONT_FAMILY, size=11, bold=True, color="FFFFFF")
font_table_header = Font(name=FONT_FAMILY, size=10, bold=True, color="FFFFFF")
font_data = Font(name=FONT_FAMILY, size=10, color="0F172A")
font_data_bold = Font(name=FONT_FAMILY, size=10, bold=True, color="0F172A")
font_status = Font(name=FONT_FAMILY, size=10, bold=True)
font_kpi_label = Font(name=FONT_FAMILY, size=9, bold=True, color="475569")
font_kpi_value = Font(name=FONT_FAMILY, size=18, bold=True, color="0F172A")

fill_header = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
fill_channel_header = PatternFill(start_color="1E293B", end_color="1E293B", fill_type="solid")
fill_zebra = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
fill_kpi = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")

thin_side = Side(style='thin', color="CBD5E1")
cell_border = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
thick_bottom = Border(bottom=Side(style='medium', color="0F172A"), left=thin_side, right=thin_side, top=thin_side)

align_center = Alignment(horizontal="center", vertical="center", wrap_text=True)
align_left = Alignment(horizontal="left", vertical="center", wrap_text=True)
align_right = Alignment(horizontal="right", vertical="center")

def auto_fit_columns(ws, max_cols=25):
    for col in range(1, max_cols + 1):
        col_letter = get_column_letter(col)
        max_len = 0
        for row in range(1, ws.max_row + 1):
            cell = ws.cell(row=row, column=col)
            # ignore merged cells spanning multiple columns in length calc
            if cell.value:
                val_str = str(cell.value)
                if len(val_str) < 55:  # avoid gigantic text warping column width
                    max_len = max(max_len, len(val_str))
        ws.column_dimensions[col_letter].width = max(max_len + 4, 12)

def build_niche_workbook(niche_info):
    wb = openpyxl.Workbook()
    # remove default sheet
    wb.remove(wb.active)

    # 1. Dashboard Tab
    ws_dash = wb.create_sheet(title="📊 Outreach KPI Dashboard")
    ws_dash.views.sheetView[0].showGridLines = True
    
    # Title Block
    ws_dash.merge_cells("A1:H1")
    ws_dash["A1"] = f"{niche_info['num']}. {niche_info['title']} — Cold Outreach System"
    ws_dash["A1"].font = font_title
    ws_dash["A1"].alignment = align_left
    
    ws_dash.merge_cells("A2:H2")
    ws_dash["A2"] = f"Uncoded Hub 7-Day Sprint Client Acquisition Engine | Target Niche: {niche_info['key']}"
    ws_dash["A2"].font = font_subtitle
    ws_dash["A2"].alignment = align_left
    
    # KPI Cards Row
    kpis = [
        ("B4", "C5", "TOTAL LEADS SOURCED", "=COUNTA('📍 Google Maps'!A6:A100)+COUNTA('📸 Instagram'!A6:A100)+COUNTA('💼 LinkedIn'!A6:A100)+COUNTA('✉️ Cold Emails'!A6:A100)+COUNTA('💬 WhatsApp'!A6:A100)"),
        ("D4", "E5", "AUDITS DELIVERED", "=COUNTIF('📍 Google Maps'!M6:M100,\"*Audit*\")+COUNTIF('📸 Instagram'!J6:J100,\"*Audit*\")+COUNTIF('💼 LinkedIn'!M6:M100,\"*Audit*\")+COUNTIF('✉️ Cold Emails'!M6:M100,\"*Audit*\")+COUNTIF('💬 WhatsApp'!J6:J100,\"*Audit*\")"),
        ("F4", "G5", "STRATEGY CALLS BOOKED", "=COUNTIF('📍 Google Maps'!M6:M100,\"*Call*\")+COUNTIF('📸 Instagram'!J6:J100,\"*Call*\")+COUNTIF('💼 LinkedIn'!M6:M100,\"*Call*\")+COUNTIF('✉️ Cold Emails'!M6:M100,\"*Call*\")+COUNTIF('💬 WhatsApp'!J6:J100,\"*Call*\")"),
        ("H4", "I5", "DEALS WON (7-DAY SPRINT)", "=COUNTIF('📍 Google Maps'!M6:M100,\"*Won*\")+COUNTIF('📸 Instagram'!J6:J100,\"*Won*\")+COUNTIF('💼 LinkedIn'!M6:M100,\"*Won*\")+COUNTIF('✉️ Cold Emails'!M6:M100,\"*Won*\")+COUNTIF('💬 WhatsApp'!J6:J100,\"*Won*\")")
    ]
    
    for start_c, end_c, label, formula in kpis:
        ws_dash.merge_cells(f"{start_c}:{end_c}")
        top_cell = ws_dash[start_c]
        top_cell.value = f"{label}\n[Auto-Calculated]"
        top_cell.font = font_kpi_label
        top_cell.alignment = align_center
        top_cell.fill = fill_kpi
        top_cell.border = cell_border

    # Channel Performance Table Header
    ws_dash.merge_cells("A8:H8")
    ws_dash["A8"] = "CHANNEL BENCHMARK & EXECUTION BREAKDOWN"
    ws_dash["A8"].font = font_table_header
    ws_dash["A8"].fill = fill_header
    ws_dash["A8"].alignment = align_left

    chan_headers = ["Outreach Channel", "Daily Quota", "Primary Decision Maker", "Core Pain Point Addressed", "Best Performing Hook", "Expected Response Rate", "Target Bookings/Mo", "Channel Status"]
    for col_idx, h in enumerate(chan_headers, start=1):
        c = ws_dash.cell(row=9, column=col_idx, value=h)
        c.font = font_table_header
        c.fill = fill_channel_header
        c.alignment = align_center
        c.border = cell_border

    chan_rows = [
        ("📍 Google Maps", "15 Local Leads / Day", niche_info["target_titles"], "Outdated site / Broken mobile / Low speed", "Sub-second 99+ Core Web Vitals audit", "12% - 18%", "4 - 6 Calls", "Active"),
        ("📸 Instagram DMs", "20 Profiles / Day", "Founder / Creative Director", "Trapped in DMs / No automated booking engine", "45s Video Teardown of link-in-bio", "15% - 22%", "5 - 8 Calls", "Active"),
        ("💼 LinkedIn Outreach", "15 Connection / Day", niche_info["target_titles"], "Vendor lock-in / Opaque deliverables / Security", "EBITDA ROI Case Study & Clean React Code", "10% - 15%", "3 - 5 Calls", "Active"),
        ("✉️ Cold Emails", "30 Verified / Day", "Owner / Senior Executive", "Slow WordPress plugin bloat / High agency fees", "7-Day Sprint Guarantee: On Time Or Free", "8% - 12%", "4 - 6 Calls", "Active"),
        ("💬 WhatsApp Direct", "10 VIP Leads / Day", "Practice Owner / Managing Partner", "Immediate local patient/client inquiry loss", "1-minute voice note + visual bug screenshot", "35% - 45%", "6 - 10 Calls", "Primary Focus")
    ]

    for r_idx, row_vals in enumerate(chan_rows, start=10):
        for c_idx, val in enumerate(row_vals, start=1):
            cell = ws_dash.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_data_bold if c_idx == 1 else font_data
            cell.border = cell_border
            cell.alignment = align_center if c_idx in [2, 6, 7, 8] else align_left
            if r_idx % 2 == 0:
                cell.fill = fill_zebra

    # Niche Positioning & Pitch Cheat Sheet
    ws_dash.merge_cells("A17:H17")
    ws_dash["A17"] = f"NICHE STRATEGIC BLUEPRINT — {niche_info['title'].upper()}"
    ws_dash["A17"].font = font_table_header
    ws_dash["A17"].fill = fill_header
    ws_dash["A17"].alignment = align_left

    cheat_sheet = [
        ("Target Client Profile:", niche_info["target_titles"]),
        ("Primary Industry Pain Points:", niche_info["pain_points"]),
        ("Uncoded Hub Value Proposition:", "Custom-engineered React platform deployed in 7 business days. 99+ Lighthouse speed, zero WordPress bloat, direct founders Deepak & Geetha delivery, backed by 50% discount if late."),
        ("Recommended Discovery Offer:", "Free 60-Minute Architecture & Conversion Teardown: we show exactly where they are losing high-ticket clients and provide the 7-day sprint roadmap.")
    ]

    for idx, (label, desc) in enumerate(cheat_sheet, start=18):
        c1 = ws_dash.cell(row=idx, column=1, value=label)
        c1.font = font_data_bold
        c1.border = cell_border
        c1.fill = fill_kpi
        ws_dash.merge_cells(start_row=idx, start_column=2, end_row=idx, end_column=8)
        c2 = ws_dash.cell(row=idx, column=2, value=desc)
        c2.font = font_data
        c2.border = cell_border
        c2.alignment = align_left

    auto_fit_columns(ws_dash, max_cols=8)

    # 2. Google Maps Sheet
    ws_gm = wb.create_sheet(title="📍 Google Maps")
    ws_gm.views.sheetView[0].showGridLines = True
    gm_headers = [
        "Lead ID", "Business Name", "City / Locality", "Google Rating", "Review Count",
        "Phone / Mobile", "Current Website URL", "Primary Flaw Identified", "Mobile Speed Score",
        "Decision Maker Name", "Contact Date", "Channel Used", "Outreach Status",
        "Follow-Up Due", "Hook / Pitch Used", "Notes & Objections"
    ]
    for col_idx, h in enumerate(gm_headers, start=1):
        c = ws_gm.cell(row=5, column=col_idx, value=h)
        c.font = font_table_header
        c.fill = fill_header
        c.alignment = align_center
        c.border = cell_border
    ws_gm.merge_cells("A1:P2")
    ws_gm["A1"] = f"{niche_info['title']} — Google Maps Local Outreach Tracker"
    ws_gm["A1"].font = font_title
    ws_gm["A1"].alignment = align_left

    for i, lead in enumerate(niche_info["sample_leads"], start=6):
        ws_gm.cell(row=i, column=1, value=f"GM-{niche_info['num']}{i-5:02d}").font = font_data_bold
        ws_gm.cell(row=i, column=2, value=lead[0]).font = font_data_bold
        ws_gm.cell(row=i, column=3, value=lead[1]).font = font_data
        ws_gm.cell(row=i, column=4, value="4.8 ★").font = font_data
        ws_gm.cell(row=i, column=5, value="142").font = font_data
        ws_gm.cell(row=i, column=6, value=lead[3]).font = font_data
        ws_gm.cell(row=i, column=7, value=lead[4]).font = font_data
        ws_gm.cell(row=i, column=8, value=lead[5]).font = font_data
        ws_gm.cell(row=i, column=9, value="28 / 100").font = font_data
        ws_gm.cell(row=i, column=10, value=lead[2]).font = font_data
        ws_gm.cell(row=i, column=11, value="2026-10-22").font = font_data
        ws_gm.cell(row=i, column=12, value="WhatsApp Audio").font = font_data
        ws_gm.cell(row=i, column=13, value="Audit Sent").font = font_status
        ws_gm.cell(row=i, column=14, value="2026-10-24").font = font_data
        ws_gm.cell(row=i, column=15, value="Sub-second speed + 7-Day sprint guarantee").font = font_data
        ws_gm.cell(row=i, column=16, value="Interested in reviewing the 60s speed teardown").font = font_data
        for c in range(1, 17):
            ws_gm.cell(row=i, column=c).border = cell_border
            if i % 2 == 0:
                ws_gm.cell(row=i, column=c).fill = fill_zebra

    auto_fit_columns(ws_gm, max_cols=16)

    # 3. Instagram Sheet
    ws_ig = wb.create_sheet(title="📸 Instagram")
    ws_ig.views.sheetView[0].showGridLines = True
    ig_headers = [
        "Lead ID", "Instagram Handle", "Profile URL", "Follower Count", "Bio Link Type",
        "Target Owner / Stylist", "Identified Pain Point", "Initial DM Date", "DM Hook Type",
        "DM Status", "Follow-Up 1 Date", "Follow-Up 2 Date", "Live Demo Sent", "Notes & DM Summary"
    ]
    for col_idx, h in enumerate(ig_headers, start=1):
        c = ws_ig.cell(row=5, column=col_idx, value=h)
        c.font = font_table_header
        c.fill = fill_header
        c.alignment = align_center
        c.border = cell_border
    ws_ig.merge_cells("A1:N2")
    ws_ig["A1"] = f"{niche_info['title']} — Instagram DM Outreach Tracker"
    ws_ig["A1"].font = font_title
    ws_ig["A1"].alignment = align_left

    for i, lead in enumerate(niche_info["sample_leads"], start=6):
        ws_ig.cell(row=i, column=1, value=f"IG-{niche_info['num']}{i-5:02d}").font = font_data_bold
        ws_ig.cell(row=i, column=2, value=lead[7]).font = font_data_bold
        ws_ig.cell(row=i, column=3, value=f"https://instagram.com/{lead[7].replace('@','')}/").font = font_data
        ws_ig.cell(row=i, column=4, value="18.4K").font = font_data
        ws_ig.cell(row=i, column=5, value="Linktree (3 broken links)").font = font_data
        ws_ig.cell(row=i, column=6, value=lead[2]).font = font_data
        ws_ig.cell(row=i, column=7, value="Lost booking inquiries in DMs, no transparent pricing").font = font_data
        ws_ig.cell(row=i, column=8, value="2026-10-22").font = font_data
        ws_ig.cell(row=i, column=9, value="Story Reply + 45s Video Teardown").font = font_data
        ws_ig.cell(row=i, column=10, value="In Conversation").font = font_status
        ws_ig.cell(row=i, column=11, value="2026-10-24").font = font_data
        ws_ig.cell(row=i, column=12, value="2026-10-26").font = font_data
        ws_ig.cell(row=i, column=13, value=f"https://uncodedhub.com/web-design/{niche_info['key']}").font = font_data
        ws_ig.cell(row=i, column=14, value="Liked the video teardown. Requested a call for Friday.").font = font_data
        for c in range(1, 15):
            ws_ig.cell(row=i, column=c).border = cell_border
            if i % 2 == 0:
                ws_ig.cell(row=i, column=c).fill = fill_zebra

    auto_fit_columns(ws_ig, max_cols=14)

    # 4. LinkedIn Sheet
    ws_li = wb.create_sheet(title="💼 LinkedIn")
    ws_li.views.sheetView[0].showGridLines = True
    li_headers = [
        "Lead ID", "Prospect Full Name", "Job Title", "Company / Firm Name", "LinkedIn URL",
        "Company Website", "Company Size", "Metro / City", "Connection Request Date",
        "Connection Status", "Message 1 (Insight) Date", "Message 2 (Case Study) Date",
        "Outreach Status", "Pitch Angle Used", "Strategy Call Date", "Notes & Next Steps"
    ]
    for col_idx, h in enumerate(li_headers, start=1):
        c = ws_li.cell(row=5, column=col_idx, value=h)
        c.font = font_table_header
        c.fill = fill_header
        c.alignment = align_center
        c.border = cell_border
    ws_li.merge_cells("A1:P2")
    ws_li["A1"] = f"{niche_info['title']} — LinkedIn B2B Outreach Tracker"
    ws_li["A1"].font = font_title
    ws_li["A1"].alignment = align_left

    for i, lead in enumerate(niche_info["sample_leads"], start=6):
        ws_li.cell(row=i, column=1, value=f"LI-{niche_info['num']}{i-5:02d}").font = font_data_bold
        ws_li.cell(row=i, column=2, value=lead[2]).font = font_data_bold
        ws_li.cell(row=i, column=3, value=niche_info["target_titles"].split(",")[0]).font = font_data
        ws_li.cell(row=i, column=4, value=lead[0]).font = font_data_bold
        ws_li.cell(row=i, column=5, value=f"https://linkedin.com/in/{lead[2].lower().replace(' ','-').replace('.','')}/").font = font_data
        ws_li.cell(row=i, column=6, value=lead[4]).font = font_data
        ws_li.cell(row=i, column=7, value="11-50 employees").font = font_data
        ws_li.cell(row=i, column=8, value=lead[1]).font = font_data
        ws_li.cell(row=i, column=9, value="2026-10-22").font = font_data
        ws_li.cell(row=i, column=10, value="Connected").font = font_data
        ws_li.cell(row=i, column=11, value="2026-10-23").font = font_data
        ws_li.cell(row=i, column=12, value="2026-10-25").font = font_data
        ws_li.cell(row=i, column=13, value="Call Booked").font = font_status
        ws_li.cell(row=i, column=14, value="Enterprise Speed & Code Ownership (No WordPress)").font = font_data
        ws_li.cell(row=i, column=15, value="2026-10-27 11:30 AM").font = font_data
        ws_li.cell(row=i, column=16, value="Wants to evaluate a complete migration off their bloated CMS.").font = font_data
        for c in range(1, 17):
            ws_li.cell(row=i, column=c).border = cell_border
            if i % 2 == 0:
                ws_li.cell(row=i, column=c).fill = fill_zebra

    auto_fit_columns(ws_li, max_cols=16)

    # 5. Cold Emails Sheet
    ws_em = wb.create_sheet(title="✉️ Cold Emails")
    ws_em.views.sheetView[0].showGridLines = True
    em_headers = [
        "Lead ID", "First Name", "Last Name", "Company / Practice", "Verified Email",
        "Verification Status", "Website URL", "Personalized Icebreaker Line", "Subject Line Used",
        "Email 1 Date", "Email 2 Date", "Email 3 Date", "Email Status", "Meeting Date",
        "Campaign Tag", "Notes"
    ]
    for col_idx, h in enumerate(em_headers, start=1):
        c = ws_em.cell(row=5, column=col_idx, value=h)
        c.font = font_table_header
        c.fill = fill_header
        c.alignment = align_center
        c.border = cell_border
    ws_em.merge_cells("A1:P2")
    ws_em["A1"] = f"{niche_info['title']} — Cold Email Sequence Tracker"
    ws_em["A1"].font = font_title
    ws_em["A1"].alignment = align_left

    for i, lead in enumerate(niche_info["sample_leads"], start=6):
        names = lead[2].replace("Dr. ", "").replace("Ar. ", "").replace("Advocate ", "").split(" ")
        first_n = names[0]
        last_n = " ".join(names[1:]) if len(names) > 1 else ""
        ws_em.cell(row=i, column=1, value=f"EM-{niche_info['num']}{i-5:02d}").font = font_data_bold
        ws_em.cell(row=i, column=2, value=first_n).font = font_data
        ws_em.cell(row=i, column=3, value=last_n).font = font_data
        ws_em.cell(row=i, column=4, value=lead[0]).font = font_data_bold
        ws_em.cell(row=i, column=5, value=lead[6]).font = font_data
        ws_em.cell(row=i, column=6, value="Valid (ZeroBounce)").font = font_data
        ws_em.cell(row=i, column=7, value=lead[4]).font = font_data
        ws_em.cell(row=i, column=8, value=f"Noticed your recent expansion in {lead[1]} — congratulations!").font = font_data
        ws_em.cell(row=i, column=9, value=f"quick question regarding {lead[0]}").font = font_data
        ws_em.cell(row=i, column=10, value="2026-10-22").font = font_data
        ws_em.cell(row=i, column=11, value="2026-10-25").font = font_data
        ws_em.cell(row=i, column=12, value="—").font = font_data
        ws_em.cell(row=i, column=13, value="Replied - Interested").font = font_status
        ws_em.cell(row=i, column=14, value="2026-10-26 3:00 PM").font = font_data
        ws_em.cell(row=i, column=15, value=f"Q4_{niche_info['key']}_wave1").font = font_data
        ws_em.cell(row=i, column=16, value="Responded to Email 1 asking for our pricing and sprint guarantees.").font = font_data
        for c in range(1, 17):
            ws_em.cell(row=i, column=c).border = cell_border
            if i % 2 == 0:
                ws_em.cell(row=i, column=c).fill = fill_zebra

    auto_fit_columns(ws_em, max_cols=16)

    # 6. WhatsApp & Direct Phone Sheet
    ws_wa = wb.create_sheet(title="💬 WhatsApp")
    ws_wa.views.sheetView[0].showGridLines = True
    wa_headers = [
        "Lead ID", "Business / Clinic Name", "Decision Maker Name", "WhatsApp Number",
        "City / State", "Teardown Loom / Screenshot Link", "Sent Date", "Message Format",
        "Delivery Status", "Outreach Status", "Follow-Up Due", "Estimated Deal Value", "Notes & Voice Summary"
    ]
    for col_idx, h in enumerate(wa_headers, start=1):
        c = ws_wa.cell(row=5, column=col_idx, value=h)
        c.font = font_table_header
        c.fill = fill_header
        c.alignment = align_center
        c.border = cell_border
    ws_wa.merge_cells("A1:M2")
    ws_wa["A1"] = f"{niche_info['title']} — WhatsApp Direct VIP Outreach Tracker"
    ws_wa["A1"].font = font_title
    ws_wa["A1"].alignment = align_left

    for i, lead in enumerate(niche_info["sample_leads"], start=6):
        ws_wa.cell(row=i, column=1, value=f"WA-{niche_info['num']}{i-5:02d}").font = font_data_bold
        ws_wa.cell(row=i, column=2, value=lead[0]).font = font_data_bold
        ws_wa.cell(row=i, column=3, value=lead[2]).font = font_data
        ws_wa.cell(row=i, column=4, value=lead[3]).font = font_data
        ws_wa.cell(row=i, column=5, value=lead[1]).font = font_data
        ws_wa.cell(row=i, column=6, value=f"https://www.loom.com/share/uncodedhub-audit-{niche_info['key']}").font = font_data
        ws_wa.cell(row=i, column=7, value="2026-10-22").font = font_data
        ws_wa.cell(row=i, column=8, value="45s Personalized Voice Note + Audit Link").font = font_data
        ws_wa.cell(row=i, column=9, value="Read (Blue Ticks)").font = font_data
        ws_wa.cell(row=i, column=10, value="Discovery Call Scheduled").font = font_status
        ws_wa.cell(row=i, column=11, value="2026-10-24").font = font_data
        ws_wa.cell(row=i, column=12, value="₹1,25,000 / $1,800").font = font_data_bold
        ws_wa.cell(row=i, column=13, value="Listened to voice note immediately. Requested 15-min discovery sprint call.").font = font_data
        for c in range(1, 14):
            ws_wa.cell(row=i, column=c).border = cell_border
            if i % 2 == 0:
                ws_wa.cell(row=i, column=c).fill = fill_zebra

    auto_fit_columns(ws_wa, max_cols=13)

    # Save file
    safe_title = f"{niche_info['folder_name']}.xlsx"
    out_path = os.path.join(OUTPUT_DIR, safe_title)
    wb.save(out_path)
    return out_path

print("Starting workbook generation for all 17 niches...")
generated_paths = []
for n in NICHES:
    p = build_niche_workbook(n)
    generated_paths.append(p)
    print(f"Generated: {os.path.basename(p)}")

print(f"\nSuccessfully created {len(generated_paths)} out of 17 professional outreach workbooks in {OUTPUT_DIR}!")
