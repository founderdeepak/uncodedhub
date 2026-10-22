import os
import re

OUTREACH_DIR = os.path.abspath("Outreach_System")
AVATARS_DIR = os.path.join(OUTREACH_DIR, "Client_Avatars")
os.makedirs(AVATARS_DIR, exist_ok=True)
MASTER_FILE = os.path.join(OUTREACH_DIR, "01_CLIENT_AVATARS_MASTER_PLAYBOOK.md")

# Complete Data for all 17 Client Avatars
AVATARS = [
    {
        "num": "01",
        "niche": "Educational Academies & Coaching Institutes",
        "file_prefix": "01_Educational_Academies_Avatar.md",
        "archetype": "The Devoted Academic Director / Institute Founder",
        "name_example": "Prof. S. Radhakrishnan / R.K. Verma",
        "age": "42 – 55",
        "locations": "Bengaluru (Jayanagar, Malleswaram, HSR) & Chennai (Anna Nagar, T Nagar, Adyar)",
        "biz_model": "Competitive entrance coaching (NEET, JEE, CA, UPSC) & premier foundation batches. ₹30,000 – ₹85,000 annual fee per student; 150 – 500 enrolled students. Annual revenue ₹60 Lakhs – ₹3.5 Crores.",
        "team": "4-8 Senior Subject Faculty, 2 Academic Counselors, 1 Front Desk Coordinator.",
        "daily_reality": "Arrives at 8:30 AM to supervise morning test batches. Teaches 3-4 hours of high-stakes syllabus. Spends afternoons dealing with anxious parents asking about cutoffs and comparing fees to cheap online edtech. Stressed by admission seasonality: if the April–June batch doesn't fill up, the institute operates at a loss for 10 months.",
        "pride_point": "Their genuine track record of producing top 100 ranks through rigorous classroom mentoring without corporate marketing gimmicks.",
        "big_bad": "Corporate Coaching Factories (Allen, Aakash, FIITJEE) who outmuscle them on Google with massive ad budgets, and cheap edtech apps (PW, Unacademy) that commoditize quality faculty.",
        "past_scars": "Paid ₹50,000 to an amateur agency for a WordPress site that crashed on NEET result day, has broken PDF brochure links, and requires calling the developer for minor timetable changes.",
        "symptoms": [
            ("Parents choose massive corporate brands despite worse personal attention", "Outmuscled & Frustrated"),
            ("Receptionist answers the same 20 questions about fees, timings, and syllabus on every call", "Drained & Inefficient"),
            ("Parents ask for heavy discounts, treating experienced faculty like neighborhood tutors", "Devalued & Insulted"),
            ("Recent top exam ranks and student selections are buried on paper noticeboards", "Invisible & Forgotten"),
            ("Website crashes during peak board/entrance result declaration season", "Embarrassed & Damaged"),
            ("Prospective students miss admission deadlines due to broken online registration", "Lost Revenue")
        ],
        "jargon_use": ["Rankers gallery", "AIR cutoff", "foundation batch", "mock test analysis", "faculty pedigree", "parent orientation", "seat matrix", "doubt-clearing ratio"],
        "jargon_avoid": ["tuition class", "study package", "coaching shop", "discount fee", "mass batch"],
        "flaw_breakdown": "Zero website or using an unorganized Linktree with 8 static PDF brochures. When anxious parents search on Google Maps from their smartphone, they find no faculty credentials, no verified topper marks, and no 1-tap WhatsApp trial class booking. 45% bounce straight to corporate competitors.",
        "phone_hook": "Hi Prof. [Last Name], this is Deepak from Uncoded Hub here in Bengaluru/Chennai. I saw your institute's 4.8-star reputation on Google Maps in [Locality], but noticed you don't have a mobile admission portal to showcase your recent rankers and allow parents to book trial sessions in 2 taps. Rather than pitching you, we built an interactive 7-day specimen for coaching academies with sub-second speed and a 7-day delivery guarantee: on time, or 100% free. Can I send the mobile link to your WhatsApp?",
        "wa_voice_hook": "Hello Prof. [Last Name], Deepak here from Uncoded Hub. I was just reviewing your academy on Google Maps. Your rankers and parent reviews are top tier, but parents researching on their phones can't view your faculty pedigree or download syllabus directly without calling the desk. We engineer custom 1-second admission platforms that double trial seat bookings in 7 days guaranteed. Sending a 30-second mobile specimen below—take a look when you're between batches!",
        "email_subject": "Quick question regarding [Academy Name] admissions on mobile",
        "objection_rebuttals": [
            ("We get all students by word of mouth", "Word of mouth gets parents to hear about you, but the very next thing they do is search you on Google. If they find no official website or a broken link, they assume you are a small-scale tutor rather than a premier academy, and you lose the highest-paying parents to corporate brands."),
            ("We already have a Facebook/Instagram page", "Social media is great for posts, but serious parents making a ₹60,000 education decision will never enroll their child through an Instagram DM. They require an official institutional portal with verified scorecards, faculty degrees, and transparent batch schedules."),
            ("Websites take months and cost too much", "Traditional agencies take 3 months of meetings. Uncoded Hub works on a contractual 7-Day Sprint. You give us your topper list and faculty details, and within 7 days your sub-second portal is live. If we are late by even one hour, the entire build is 100% free.")
        ],
        "closing_deal": "₹50,000 – ₹85,000 (Includes automated WhatsApp admission lead capture, topper showcase, and interactive syllabus portal)."
    },
    {
        "num": "02",
        "niche": "Commercial Gyms & Fitness Clubs",
        "file_prefix": "02_Commercial_Gyms_Avatar.md",
        "archetype": "The High-Energy Commercial Gym Owner / Fitness Director",
        "name_example": "Vikramaditya Rao / Karthik Reddy",
        "age": "32 – 46",
        "locations": "Bengaluru (Indiranagar, Koramangala, HSR) & Chennai (T Nagar, Anna Nagar, Velachery)",
        "biz_model": "Multi-floor strength and conditioning facility, premium cardio zone, and group class studio. Membership ₹2,500 – ₹6,000/month (₹22,000 – ₹45,000 annual). 300 – 1,200 active members. Annual turnover ₹75 Lakhs – ₹3 Crores.",
        "team": "1 General Manager, 6-12 Floor Trainers, 2 Receptionists, 2 Housekeeping staff.",
        "daily_reality": "Starts at 6:00 AM on the gym floor checking equipment maintenance and trainer punctuality. Spends afternoons stressed about member retention, managing Cult/ClassPass commission payouts (losing 25% on every booking), and dealing with front-desk staff who fail to follow up on walk-in trial leads.",
        "pride_point": "Their imported biomechanical equipment (Hammer Strength, Life Fitness), locker room hygiene, and genuine member body transformations.",
        "big_bad": "Aggregator Platforms (Cult.fit, ClassPass) who commoditize their brand and take 20-30% cuts, plus budget 24/7 franchise gyms (Anytime Fitness) competing on low-ball pricing.",
        "past_scars": "Spent ₹40,000 on a heavy WordPress site with an unoptimized video banner that takes 8 seconds to load on mobile 4G and crashes whenever prospects try to view the group timetable.",
        "symptoms": [
            ("Paying 25% commissions to aggregators because direct member signups are weak", "Exploited & Dependent"),
            ("Heavy video header taking 7 seconds to load on phone, causing 60% visitor bounce", "Embarrassed"),
            ("Walk-in leads don't sign up because there is no 1-tap day pass or trial booking engine", "Lost Revenue"),
            ("No locker room hygiene proof or equipment showcase, so prospects assume it's an ordinary iron gym", "Undervalued"),
            ("Front desk staff misses phone inquiries during peak evening rush (6 PM - 9 PM)", "Frustrated"),
            ("Losing high-paying personal training clients to freelance trainers working under the table", "Undermined")
        ],
        "jargon_use": ["Biomechanical equipment", "Hammer Strength", "day pass engine", "LCP speed", "annual retention", "group class timetable", "DEXA scan", "peak-hour floor capacity"],
        "jargon_avoid": ["cheap gym", "exercise room", "fitness shop", "gym discount", "weight club"],
        "flaw_breakdown": "Zero website or using an Instagram bio with a raw WhatsApp link. When working professionals search 'best gym near me' on Google Maps, they cannot see locker room photos, equipment brands, trainer credentials, or book a 1-day pass. They default to Cult.",
        "phone_hook": "Hi [Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I saw your gym's great reviews on Google Maps in [Locality], but noticed you don't have an independent mobile site with a 1-tap day pass engine, which means prospective members searching on their phones either call the busy front desk or go through Cult and cost you 25% commissions. We engineered an interactive mobile platform specifically for commercial gyms with sub-second speed and a 7-day guarantee: on time, or 100% free. Can I WhatsApp you the demo link?",
        "wa_voice_hook": "Hey [Name], Deepak from Uncoded Hub. Was just looking at your gym profile on Maps. Your equipment setup and member reviews are fantastic, but you're losing hundreds of direct memberships to Cult because there's no 1-tap trial pass booking on mobile. We build custom 1-second platforms that capture direct annual memberships without aggregator cuts. Sending a quick mobile demo below—check it out between sets!",
        "email_subject": "Stopping the 25% Cult cut at [Gym Name] — 1-tap direct day pass",
        "objection_rebuttals": [
            ("We get enough members through walk-ins and Instagram", "Walk-ins only capture people who literally walk past your street. The high-earning corporate crowd Googles 'gyms in [Locality]' at work. If you don't have a sub-second site with equipment specs and transparent day passes, they join Cult or an aggregator where you lose 25% of your margin."),
            ("Cult/Fitternity gives us all our footfall", "Aggregators give you footfall today so they can control your client database tomorrow. The moment they change their payout algorithm or promote a competitor 200m away, your revenue drops. A direct high-speed website lets you own your members directly with 100% profit margin."),
            ("Gym websites don't convert; people just want to see the gym", "People DO want to see the gym—and that's why an unoptimized site fails. Our 1-second specimen gives them a 4K visual walkthrough, locker room hygiene proof, and a 1-tap day pass directly into your WhatsApp in under 15 seconds.")
        ],
        "closing_deal": "₹45,000 – ₹75,000 (Includes 1-tap trial day pass engine, interactive class schedule, and trainer showcase)."
    },
    {
        "num": "03",
        "niche": "Interior Designers & Architects",
        "file_prefix": "03_Interior_Designers_Architects_Avatar.md",
        "archetype": "The Elite Principal Architect & Design Studio Founder",
        "name_example": "Ar. Varun Somani / Ar. Arvind Swaminathan",
        "age": "34 – 52",
        "locations": "Bengaluru (Indiranagar, Koramangala, Lavelle Road) & Chennai (Adyar, Alwarpet, Anna Nagar)",
        "biz_model": "High-end residential villas, penthouses, bespoke apartments, and commercial boutique offices. Turnkey project ticket size: ₹25 Lakhs to ₹2 Crores+. Takes 4–12 projects annually. Studio turnover ₹1.5 Crores – ₹10 Crores.",
        "team": "2-4 Junior Architects, 2 3D Visualizers, 3 Site Supervisors, trusted carpentry/vendor ecosystem.",
        "daily_reality": "Splits day between drafting revisions on CAD/Revit, reviewing Italian marble selections at quarries, and supervising joinery on site. Deeply frustrated by homeowners who demand free 3D conceptual drawings before signing contracts, or who compare their bespoke architectural joinery to cheap factory modular quotes.",
        "pride_point": "Their spatial storytelling, attention to lighting temperatures, bespoke furniture joinery, and design awards.",
        "big_bad": "VC-funded Modular Giants (Livspace, HomeLane) who lure clients with misleading '₹5 Lakh full-home interior' ads, and cheap local contractors claiming to be 'designers'.",
        "past_scars": "Hired an agency that uploaded uncompressed 45MB 3D project photos onto a WordPress theme. The site takes 9 seconds to load on mobile and crashes iPhones, causing prospective luxury homeowners to bounce immediately.",
        "symptoms": [
            ("Homeowners demand free 3D concepts before committing to a consultation fee", "Exploited & Devalued"),
            ("Losing 50L villa interior contracts silently to studios with sleek websites", "Frustrated & Baffled"),
            ("Best completed penthouses only live on phone camera rolls, uncatalogued", "Stifled & Invisible"),
            ("High mobile bounce rate because heavy portfolio photos crash mobile browsers", "Embarrassed"),
            ("Referral clients check the website to validate a recommendation and get unimpressed", "Sabotaged"),
            ("Spending weekends answering DM questions about minor decor rather than closing turnkey villas", "Exhausted")
        ],
        "jargon_use": ["Turnkey handover", "millimeter joinery", "spatial storytelling", "LCP mobile speed", "Italian marble casework", "lighting temperature", "concept-to-execution", "per-sqft rate leakage"],
        "jargon_avoid": ["cheap decor", "interior package", "room painting", "budget woodwork", "furnishing deal"],
        "flaw_breakdown": "Zero standalone site or relying purely on an Instagram grid with a Linktree. High-net-worth homeowners ready to spend ₹40 Lakhs to ₹1.5 Crores will not sign a contract over an Instagram DM. They require an editorial-grade, lightning-fast digital portfolio that validates the architect's design fees.",
        "phone_hook": "Hi Ar. [Last Name], Deepak here, co-founder of Uncoded Hub in Bengaluru/Chennai. I was admiring your residential project portfolio on Maps in [Locality]. You have exceptional execution quality, but I noticed you don't have an independent high-speed mobile portfolio linked—which means homeowners investing 40 Lakhs in a luxury villa can't view your material casework or process breakdown. We engineered an editorial-grade 7-day specimen specifically for interior architects that loads in sub-1 second with a 100% on-time guarantee. May I share the mobile link on your WhatsApp?",
        "wa_voice_hook": "Good afternoon Ar. [Last Name], Deepak from Uncoded Hub. I was reviewing your firm's work on Google Maps. Your completed residential spaces are stunning, but when luxury villa clients search on mobile, heavy photos buffer and there's no transparent 'concept to handover' process guide. We build bespoke sub-second digital platforms for architects that position you above Livspace in 7 days flat. Sending a 30-second mobile link below—let me know what you think of the casework sliders!",
        "email_subject": "Editorial digital portfolio for [Studio Name] (sub-second mobile casework)",
        "objection_rebuttals": [
            ("We get all our projects via builder referrals and word-of-mouth", "Word-of-mouth is your greatest asset, but every single HNI referral immediately Googles your firm before calling. If they find an outdated site or an amateur Linktree, their excitement cools down and they start questioning your design fees. An editorial portfolio pre-sells them before you even pick up the phone."),
            ("Instagram is enough for our portfolio", "Instagram is an ephemeral feed where your work is placed next to reels and discount furniture ads. High-ticket homeowners spending 50 Lakhs want to see project case studies: before/after photos, floorplans, material palettes, and your turnkey process."),
            ("Architectural websites take 4-6 months to build properly", "Traditional web agencies don't understand architecture, so they drag the project for months asking you for content. We work with a dedicated 7-Day Sprint. You give us your project photography, and in 7 days your editorial platform is live, backed by our 100% on-time or free guarantee.")
        ],
        "closing_deal": "₹50,000 – ₹85,000 (Includes high-res casework sliders, turnkey process blueprint, and budget qualification intake form)."
    },
    {
        "num": "04",
        "niche": "Real Estate & Property Consultants",
        "file_prefix": "04_Real_Estate_Property_Consultants_Avatar.md",
        "archetype": "The Luxury Channel Partner & Commercial Property Advisor",
        "name_example": "Sameer Kochhar / Pranav Hegde",
        "age": "36 – 54",
        "locations": "Bengaluru (Whitefield, Koramangala, Hebbal) & Chennai (OMR, ECR, Anna Nagar)",
        "biz_model": "Exclusive developer mandate marketing, luxury villa sales, and commercial leasing advisory. Transaction ticket sizes: ₹1.2 Crores to ₹15 Crores+. Commission: 1% – 3% per transaction (₹1.5 Lakhs – ₹15 Lakhs+ per deal). Annual turnover ₹1 Crore – ₹8 Crores.",
        "team": "4-10 Investment Consultants, 2 Tele-sales Executives, 1 Digital Marketer, trusted legal advisor.",
        "daily_reality": "Constantly on calls coordinating site visits for HNIs, negotiating with tier-1 developers (Prestige, Sobha, Brigade, Casagrand), and sifting through dozens of junk portal leads. Frustrated by spending ₹1 Lakh/month on 99acres and MagicBricks only to receive shared, recycled leads that 10 other brokers are calling simultaneously.",
        "pride_point": "Their direct access to pre-launch allocations, legal due-diligence expertise, and personal trust with high-net-worth investors.",
        "big_bad": "Real Estate Portals (99acres, MagicBricks, NoBroker) that sell the same buyer lead to 15 different agents and push brokers into price wars.",
        "past_scars": "Spent money on a generic real estate WordPress template with broken IDX search iframes that took 6 seconds to load and captured zero investor inquiries.",
        "symptoms": [
            ("Paying ₹80k/month to property portals for recycled, low-quality leads", "Exploited & Dependent"),
            ("HNIs view them as an ordinary broker rather than an exclusive asset advisor", "Devalued"),
            ("Competitors close luxury NRI villa deals because their digital property showcase looks institutional", "Outclassed"),
            ("Unverified buyers waste weekend site visit slots without budget qualification", "Exhausted"),
            ("No digital property landing page for ₹5 Cr+ exclusive mandates", "Unprofessional"),
            ("Slow mobile layout causes impatient NRI buyers to abandon property walkthroughs", "Lost Revenue")
        ],
        "jargon_use": ["Channel partner allocation", "rental yield", "pre-launch mandate", "capital appreciation", "SPV lease", "RERA compliance", "NRI concierge", "HNW investor deck"],
        "jargon_avoid": ["brokerage fee", "cheap flats", "broker commission", "budget plot", "small house"],
        "flaw_breakdown": "Zero website or using an unbranded WhatsApp catalog with compressed JPEG floorplans. HNI and NRI investors looking to park ₹3–10 Crores in Bengaluru/Chennai real estate require an institutional property advisory portal that proves legal due diligence, rental yields, and high-res masterplans.",
        "phone_hook": "Hi Mr. [Last Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I saw your luxury property mandates in [Locality] on Google Maps. You have fantastic client reviews, but I noticed you don't have an exclusive mobile property portal to showcase your high-ticket villa and commercial assets directly to NRI and HNI investors without losing them to 99acres. We build sub-second investment platforms with an on-time 7-day sprint guarantee: on time, or 100% free. Can I share our interactive specimen on your WhatsApp?",
        "wa_voice_hook": "Hello Mr. [Last Name], Deepak from Uncoded Hub. Was reviewing your consultancy's presence on Maps. With the massive NRI buyer interest in [City], relying on portal leads costs thousands in shared broker fees. We engineer custom 1-second luxury real estate platforms that capture direct, exclusive buyer leads with rental yield calculators and RERA verification. Sending a 30-second mobile specimen below—take a look when you're between site visits!",
        "email_subject": "Direct HNI & NRI buyer capture for [Company Name] (No portal leakage)",
        "objection_rebuttals": [
            ("All our leads come from 99acres and developer tie-ups", "Portal leads are shared with 10 other agents the minute they register, turning your business into a race to the bottom. A dedicated luxury portal lets you run targeted ads to NRI investors who contact only you, preserving your full brokerage margin."),
            ("Real estate is closed in person, not on a website", "The contract is signed in person, but the site visit is decided online. An HNI investing ₹4 Crores inspects your digital presence first to see if you are a credible advisor or just another middleman. Our platform pre-qualifies their budget before you spend 2 hours driving to the site."),
            ("Building a property portal is too complex and requires MLS feeds", "You don't need a bloated MLS database with 10,000 irrelevant listings. You need a razor-sharp curated showcase of your top 8 exclusive luxury mandates with masterplans, walkthrough videos, and 1-tap WhatsApp consultation scheduling. We launch it in 7 days flat.")
        ],
        "closing_deal": "₹55,000 – ₹90,000 (Includes RERA-compliant property showcases, interactive rental yield calculators, and NRI lead capture)."
    },
    {
        "num": "05",
        "niche": "Dental & Aesthetic Clinics",
        "file_prefix": "05_Dental_Aesthetic_Clinics_Avatar.md",
        "archetype": "The Chief Dental Surgeon & Aesthetic Center Director",
        "name_example": "Dr. Rohan Merchant, MDS / Dr. Priya Ranganathan",
        "age": "35 – 52",
        "locations": "Bengaluru (Indiranagar, Koramangala, Jayanagar) & Chennai (T Nagar, Anna Nagar, Adyar)",
        "biz_model": "Multispecialty dental, dental implantology, clear aligners (Invisalign), and facial aesthetics. High-ticket procedures: Implants (₹35,000 – ₹60,000/tooth), Full mouth rehabilitation (₹2 Lakhs – ₹6 Lakhs), Aligners (₹80,000 – ₹2.5 Lakhs). Practice turnover ₹80 Lakhs – ₹4 Crores.",
        "team": "2 Associate Dentists, 1 Visiting Implantologist, 3 Dental Assistants, 2 Front Desk Coordinators.",
        "daily_reality": "Spends 8 hours chairside performing root canals, surgical crown placements, and smile makeovers. Constantly frustrated by patients who cancel consultations at the last minute or who demand discounts comparing hospital-grade sterile implants to neighborhood budget clinics. Annoyed by paying Practo high commissions only to see competitor ads on their profile.",
        "pride_point": "Their international fellowship credentials, sterile operating protocols, digital intraoral scanners, and life-changing smile makeover transformations.",
        "big_bad": "Healthcare Aggregators (Practo, Lybrate) that run competitor ads on their profile, and budget dental chains (Clove Dental) marketing cheap tooth cleanings to pull walk-ins.",
        "past_scars": "Paid an agency that set up a generic WordPress clinic theme filled with stock photos of Caucasian models that looked completely fake and had no transparent procedure pricing or WhatsApp triage.",
        "symptoms": [
            ("Anxious patients cancel appointments or avoid booking due to opaque procedure pricing", "Lost Revenue"),
            ("Patients compare hospital-grade implantology to cheap single-chair clinics", "Insulted & Devalued"),
            ("Practo plasters competing clinics right next to their doctor profile", "Exploited"),
            ("Front desk phone is constantly engaged during peak hours, missing high-ticket calls", "Chaotic & Drained"),
            ("Smile makeover before/after proof is buried in clinic photo albums", "Invisible"),
            ("Patients from overseas (dental tourism) cannot verify clinic sterilization standards", "Skeptical")
        ],
        "jargon_use": ["CBCT 3D imaging", "intraoral scanner", "clear aligner triage", "immediate load implants", "smile makeover", "autoclave sterilization", "chairside triage", "painless laser dentistry"],
        "jargon_avoid": ["cheap dental", "tooth pulling", "discount braces", "dental deal", "teeth shop"],
        "flaw_breakdown": "Zero website or using an unverified Google Maps listing with a mobile number. Patients needing ₹1.5 Lakh dental implants or Invisalign will not book blindly through a Justdial listing. They demand doctor credentials, clinical case proof, sterilization badges, and 1-tap WhatsApp triage.",
        "phone_hook": "Good morning Dr. [Last Name], Deepak here, co-founder of Uncoded Hub in Bengaluru/Chennai. I was looking at your clinic's fantastic patient reviews on Google Maps in [Locality]. You have exceptional clinical credibility, but I noticed you don't have an independent mobile platform with 1-tap WhatsApp triage and smile makeover galleries—which means high-ticket implant and aligner patients are booking elsewhere. We build custom sub-second clinical platforms delivered in 7 days guaranteed: on time, or 100% free. May I send you the mobile specimen?",
        "wa_voice_hook": "Hello Dr. [Last Name], Deepak from Uncoded Hub. I was just reviewing your clinic on Google Maps. Your patient reviews are stellar, but patients searching on mobile can't see your sterilization protocols, doctor degrees, or transparent implant pricing. We build bespoke 1-second dental portals that eliminate Practo commissions and book high-ticket procedures in 7 days flat. Sending a 30-second mobile link below—take a look between patients!",
        "email_subject": "Eliminating Practo commission fees for [Clinic Name] (Direct 1-tap booking)",
        "objection_rebuttals": [
            ("We get enough patients from Practo and local footfall", "Practo charges you recurring listing fees and places competitor ads directly below your doctor bio. Every patient who books via Practo is Practo's customer, not yours. A custom platform gives you 100% patient ownership with direct WhatsApp booking."),
            ("Patients don't like booking dental treatments online", "They don't book the surgery online—they book the consultation. Anxious patients search at 10:30 PM when your front desk is closed. If your site lets them ask a confidential WhatsApp question or view before/after aligner results in 2 taps, you win the patient before morning."),
            ("Medical websites have too many compliance issues", "We specifically engineer our healthcare platforms to comply with Indian Medical Council guidelines: zero misleading claims, verified doctor registration numbers, and transparent clinical disclaimers. We deliver the entire compliant platform in 7 days.")
        ],
        "closing_deal": "₹45,000 – ₹75,000 (Includes smile makeover sliders, transparent procedure guides, and 1-tap WhatsApp OPD triage)."
    },
    {
        "num": "06",
        "niche": "Wedding Photographers & Event Planners",
        "file_prefix": "06_Wedding_Photographers_Event_Planners_Avatar.md",
        "archetype": "The Acclaimed Creative Director & Wedding Cinematographer",
        "name_example": "Karan Malhotra / Rahul Menon",
        "age": "28 – 44",
        "locations": "Bengaluru (Indiranagar, Koramangala) & Chennai (ECR, Besant Nagar, T Nagar)",
        "biz_model": "Luxury destination and multi-day traditional wedding coverage (Mehendi, Sangeet, Muhurtham, Reception). Ticket size: ₹2.5 Lakhs to ₹15 Lakhs+ per wedding. Covers 15–35 weddings per season. Studio turnover ₹50 Lakhs – ₹3 Crores.",
        "team": "2 Lead Cinematographers, 2 Candid Photographers, 2 Traditional Shooters, 2 Drone Pilots, 3 In-house Editors.",
        "daily_reality": "Shoots 14-hour marathon wedding days on weekends. Spends weekdays in the edit bay color-grading 4K LOG footage, syncing audio, and managing 20TB NAS storage. Deeply exhausted by endless Instagram DM inquiries asking 'Bro price please?' only to ghost when quoted ₹4 Lakhs.",
        "pride_point": "Their visual color grading, emotional storytelling, cinematic drone captures, and publication in WeddingSutra/WedMeGood.",
        "big_bad": "Aggregator Directories (WedMeGood, ShaadiSaga) taking listing fees, and Instagram algorithm changes that hide their posts unless they post daily reels.",
        "past_scars": "Hired a developer who created a website with heavy unoptimized 4K Vimeo/YouTube embeds that take 8 seconds to load on mobile 4G and stutter, ruining the cinematic luxury feel.",
        "symptoms": [
            ("Over-reliance on Instagram algorithm changes causes sudden drops in booking inquiries", "Anxious & Vulnerable"),
            ("High-budget couples ghost after asking for prices in Instagram DMs", "Exhausted & Frustrated"),
            ("Unoptimized 4K wedding films buffer and stutter on prospective clients' mobile screens", "Embarrassed"),
            ("WedMeGood takes hefty commissions while promoting discount competitors", "Exploited"),
            ("No automated wedding date availability checker, causing endless repetitive messaging", "Inefficient"),
            ("Function-wise portfolio (Muhurtham vs Sangeet) is unorganized on cloud drives", "Unprofessional")
        ],
        "jargon_use": ["Color grading (LOG/LUTs)", "Sangeet teaser", "Muhurtham traditional", "cinematic drone reel", "package tiering", "date availability checker", "wedding film stream speed", "deliverables timeline"],
        "jargon_avoid": ["cheap photo", "candid package deal", "camera guy", "discount video", "photo booth"],
        "flaw_breakdown": "Relying 100% on Instagram or using a Linktree with broken Google Drive links. High-budget wedding couples and parents spending ₹5 Lakhs on wedding media will not hire a studio that shares raw Drive folders. They expect a full-bleed, cinematic mobile cinema that streams instant 4K reels.",
        "phone_hook": "Hi [Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I was watching your incredible wedding films on Instagram. Your cinematic grading is top tier, but I noticed you don't have an independent mobile theater with an instant wedding date checker—which means couples looking for ₹4L+ luxury coverage are dropping off in your DMs. We build sub-second full-bleed mobile video portals delivered in 7 days guaranteed: on time, or 100% free. Can I share the mobile link on your WhatsApp?",
        "wa_voice_hook": "Hey [Name], Deepak from Uncoded Hub. Love your wedding cinematography work. When couples search for luxury wedding studios in [City], sending them to an Instagram bio or Google Drive link causes 40% drop-off. We engineer custom 1-second video platforms that stream full-bleed 4K wedding films without buffering and qualify dates instantly. Sending a quick mobile demo below—check it out between edits!",
        "email_subject": "Eliminating 'Bro price please?' DMs for [Studio Name] (Instant Date Checker)",
        "objection_rebuttals": [
            ("Instagram is our entire portfolio; that's where brides hang out", "Brides discover you on Instagram, but when it's time to justify a ₹4 Lakh budget to their fiancé or parents, an Instagram DM link looks unprofessional. They need an official portfolio portal to showcase the full wedding film, gear list, and package inclusions."),
            ("Video websites are too slow and expensive to host", "That's because amateur developers dump uncompressed 4K files on basic shared servers. We use global edge CDN video streaming that starts playing in under 400 milliseconds on 4G mobile without buffering."),
            ("Wedding season is too busy; we don't have time to create a website", "That is exactly why our 7-Day Sprint exists. You send us links to your top 4 wedding reels and deliverables sheet. We handle all design, compression, and deployment in 7 days flat.")
        ],
        "closing_deal": "₹40,000 – ₹65,000 (Includes 4K full-bleed mobile video theater, interactive date availability checker, and package comparison matrix)."
    },
    {
        "num": "07",
        "niche": "Home Renovation & Modular Kitchens",
        "file_prefix": "07_Home_Renovation_Modular_Kitchens_Avatar.md",
        "archetype": "The Turnkey Modular Contractor & Studio Managing Director",
        "name_example": "Sandeep Nair / Nilesh Patil",
        "age": "36 – 52",
        "locations": "Bengaluru (HSR Layout, Whitefield, Koramangala) & Chennai (T Nagar, Velachery, Anna Nagar)",
        "biz_model": "Turnkey modular kitchens, custom wardrobes, and full apartment renovation. Ticket sizes: Kitchens (₹2.5 Lakhs – ₹8 Lakhs), Full Flat Renovation (₹12 Lakhs – ₹45 Lakhs). Turnover ₹1.2 Crores – ₹6 Crores.",
        "team": "1 Studio Manager, 2 CAD Draftsmen, 4 Site Supervisors, dedicated carpentry & factory assembly team.",
        "daily_reality": "Spends mornings coordinating factory board-cutting and edge-banding, afternoons inspecting site plumbing and electrical conduits, and evenings meeting flat owners. Stressed by homeowners who are terrified of contractor delays and fraud, or who compare genuine marine-ply Hafele kitchens to particle-board discount brands.",
        "pride_point": "Their factory finish quality, 10-year warranty compliance, branded hardware (Hafele, Blum, Hettich), and on-time handover record.",
        "big_bad": "Venture-funded Modular Portals (Livspace, HomeLane) with celebrity TV ads, and fly-by-night local carpenters who take cash advances and abandon unfinished flats.",
        "past_scars": "Lost multiple ₹15 Lakh renovation projects because their digital presence looked like a shady unorganized contractor while the client hired a corporate modular studio with a sleek 3D kitchen visualizer.",
        "symptoms": [
            ("Homeowners assume they are an unvetted local contractor rather than an established studio", "Mistrusted"),
            ("Losing turnkey renovation contracts to Livspace's glossy 3D marketing", "Cheated & Outmuscled"),
            ("Clients demand endless revisions without understanding hardware price differences", "Drained"),
            ("No digital warranty certificate or delay penalty guarantee to reassure anxious buyers", "Hesitant Leads"),
            ("Finished modular kitchen photos look amateurish on WhatsApp chats", "Unimpressive"),
            ("No 3D finish selector or transparent cost calculator on mobile", "High Bounce Rate")
        ],
        "jargon_use": ["Marine ply (BWP 710)", "Hafele Blum hardware", "acrylic vs PU finish", "turnkey handover", "delay penalty guarantee", "edge-banding quality", "modular carcass warranty", "society demolition NOC"],
        "jargon_avoid": ["cheap carpentry", "discount woodwork", "repair guy", "plumber contractor", "kitchen fix"],
        "flaw_breakdown": "Zero website or using a basic Facebook page / Justdial profile. Flat owners spending ₹5–20 Lakhs on a modular kitchen or full flat makeover are terrified of delays and poor materials. Without an official studio website showing hardware specs, factory photos, and delay penalty guarantees, they default to Livspace.",
        "phone_hook": "Hi [Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I saw your modular kitchen studio on Google Maps in [Locality]. You have fantastic customer reviews, but I noticed you don't have an independent mobile site showing your Hafele/Blum hardware specs, factory photos, and an instant cost estimator—which means flat owners are booking Livspace instead. We build custom sub-second modular platforms delivered in 7 days guaranteed: on time, or 100% free. Can I WhatsApp you the live mobile specimen?",
        "wa_voice_hook": "Hello [Name], Deepak from Uncoded Hub. I was reviewing your kitchen studio on Maps. Homeowners in [City] are terrified of contractor delays, and when they search on mobile, an unbranded listing makes them hesitant. We engineer bespoke 1-second platforms with finish calculators and delay penalty guarantee badges that beat Livspace in 7 days flat. Sending a 30-second mobile link below—check it out when you're off-site!",
        "email_subject": "Winning turnkey renovation leads over Livspace for [Studio Name]",
        "objection_rebuttals": [
            ("Livspace spends crores on TV ads; a website won't help us beat them", "Livspace spends crores on ads, but their online customer reviews are filled with delay complaints and poor sub-contractor stories. When homeowners search locally in [Locality], they prefer an authentic local studio—IF your website shows verified factory quality, branded hardware, and a written delay guarantee."),
            ("Kitchens need to be seen in the showroom, not online", "They visit the showroom ONLY after they verify your credibility online. If they search your studio and find no website, they never step into your showroom. Our platform acts as a digital front door that books the physical showroom walkthrough."),
            ("We can't quote kitchen prices online because every home is custom", "You don't give a final quote online—you provide an interactive budget estimator (e.g. L-Shape Acrylic vs U-Shape PU). It qualifies their budget tier before your designer spends 2 hours doing free measurements.")
        ],
        "closing_deal": "₹45,000 – ₹75,000 (Includes interactive finish selector, material transparency matrix, and showroom visit booking)."
    },
    {
        "num": "08",
        "niche": "Coaches & Business Consultants",
        "file_prefix": "08_Coaches_Business_Consultants_Avatar.md",
        "archetype": "The High-Ticket Executive Coach & Management Consultant",
        "name_example": "Saurabh Bhandari / Keerthana L.",
        "age": "38 – 56",
        "locations": "Bengaluru (Koramangala, Indiranagar, HSR) & Chennai (Nungambakkam, Alwarpet, Guindy)",
        "biz_model": "C-suite executive coaching, business transformation advisory, and corporate leadership workshops. Retainer ticket size: ₹1.5 Lakhs – ₹8 Lakhs per client or ₹50,000/day for corporate workshops. Practice turnover ₹40 Lakhs – ₹2 Crores.",
        "team": "Solo consultant with 1 Executive Assistant, 1 Research Associate, and outsourced design/PR.",
        "daily_reality": "Spends days running board meetings, 1-on-1 executive coaching sessions, and conducting corporate diagnostic workshops. Deeply frustrated by having to explain their credibility repeatedly, dealing with tire-kickers on Calendly, or looking like an amateur online with a generic Linktree bio.",
        "pride_point": "Their corporate track record, Ivy League/IIM pedigree, and measurable revenue impact delivered for enterprise clients.",
        "big_bad": "Commoditized 'Life Coaches' on LinkedIn who sell ₹999 ebooks and devalue professional executive consulting, plus major consulting firms (McKinsey, BCG) dominating enterprise retainers.",
        "past_scars": "Used a generic Canva template or standard Linktree that made their ₹5 Lakh advisory service look like a ₹2,000 digital course.",
        "symptoms": [
            ("Relying on generic Linktree in bio, looking like an amateur to enterprise procurement heads", "Embarrassed"),
            ("Spending hours on introductory calls with unqualified prospects who have no budget", "Exhausted"),
            ("No published case studies breaking down exact revenue lift and problem-to-outcome ROI", "Invisible Value"),
            ("Selling commoditized hourly sessions instead of high-ticket ₹3L+ strategic retainers", "Underpaid"),
            ("Enterprise HR heads reject their proposals during procurement background checks", "Disqualified"),
            ("Calendar chaos with back-to-back unvetted calls that lead nowhere", "Overwhelmed")
        ],
        "jargon_use": ["Strategic retainer", "C-suite diagnostic", "revenue lift", "leadership roadmap", "application funnel", "procurement due-diligence", "organizational scale", "boardroom advisory"],
        "jargon_avoid": ["life coaching", "hourly session", "motivation tips", "cheap webinar", "mindset guru"],
        "flaw_breakdown": "Using a generic Linktree with 6 buttons or no website at all. When corporate directors and founders consider hiring a ₹3 Lakh executive consultant, they conduct background due diligence. An amateur link-in-bio immediately disqualifies the consultant from high-ticket enterprise contracts.",
        "phone_hook": "Hi [Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I came across your executive coaching presence in [City]. You have an outstanding professional reputation, but I noticed you don't have an independent authority portal with structured case studies and an application funnel—relying instead on a basic link. We engineer bespoke, sub-second authority platforms that position consultants for high-ticket retainers with a contractual 7-day guarantee: on time, or 100% free. Can I share our mobile specimen on WhatsApp?",
        "wa_voice_hook": "Hello [Name], Deepak from Uncoded Hub. I was reviewing your consulting profile. Enterprise founders ready to pay ₹3L+ retainers expect an institutional authority portal showing your diagnostic framework and client ROI. We build custom 1-second advisory platforms that filter out tire-kickers and book qualified discovery calls in 7 days flat. Sending a 30-second mobile link below—check it out when you have a moment!",
        "email_subject": "Replacing Linktree with an enterprise authority portal for [Name]",
        "objection_rebuttals": [
            ("LinkedIn is my primary channel; I don't need a standalone site", "LinkedIn is rented land where algorithm shifts determine your reach. When a corporate client wants to hire you, procurement requires an official domain for background validation. An authority site anchors your intellectual property and justifies 3x higher retainers."),
            ("I already have a Calendly link for bookings", "A bare Calendly link attracts tire-kickers who waste 30 minutes of your time. Our authority platforms use a 3-step application funnel that pre-qualifies their revenue and exact problem before they ever get access to your calendar."),
            ("My consulting frameworks are too complex for a website", "That's why our design framework exists. We translate your proprietary methodology into clear visual diagrams, client ROI benchmarks, and institutional case studies that make your value obvious in 15 seconds.")
        ],
        "closing_deal": "₹35,000 – ₹60,000 (Includes structured methodology breakdown, client ROI case study showcase, and qualified application funnel)."
    },
    {
        "num": "09",
        "niche": "Enterprise B2B & Corporate Advisory",
        "file_prefix": "09_Enterprise_B2B_Corporate_Advisory_Avatar.md",
        "archetype": "The Managing Partner & Corporate Governance Advisor",
        "name_example": "Adv. Sameer Singhania / M. Balakrishnan",
        "age": "44 – 62",
        "locations": "Bengaluru (MG Road, Lavelle Road, Richmond Town) & Chennai (Nungambakkam, Alwarpet, Guindy)",
        "biz_model": "Corporate legal advisory, M&A due diligence, ESG compliance, and risk management. Retainers: ₹1 Lakh – ₹5 Lakhs/month or project fees ₹10 Lakhs – ₹50 Lakhs+. Annual practice turnover ₹2 Crores – ₹15 Crores.",
        "team": "4 Senior Partners, 8 Associates, 3 Paralegals, dedicated compliance audit desk.",
        "daily_reality": "Advises boardrooms on regulatory filings, cross-border M&A contracts, and enterprise compliance. Highly sensitive to confidentiality and institutional credibility. Frustrated that their firm's website was built in 2016, looks outdated on modern screens, and fails corporate procurement audits by international clients.",
        "pride_point": "Their legal precision, landmark arbitration victories, and trusted counsel to enterprise founders.",
        "big_bad": "Tier-1 Global Consultancies (Big 4, Amarchand) who capture Fortune 500 mandates purely on glossy brand dominance, despite having junior teams execute the actual work.",
        "past_scars": "Paid ₹1.5 Lakhs to a slow corporate agency that took 6 months of endless committee meetings, delivered an uneditable CMS, and forgot mobile optimization.",
        "symptoms": [
            ("Legacy 2016 website fails enterprise vendor onboarding due-diligence checks", "Disqualified & Lost Deals"),
            ("Non-responsive PDF capability decks that look terrible on mobile screens", "Outdated"),
            ("International and out-of-state corporate clients cannot verify practice credentials", "Mistrusted"),
            ("Junior associates at Big 4 win mandates simply because their web branding looks institutional", "Outclassed"),
            ("Generic 'Contact Us' form with 0% conversion rate among corporate general counsels", "Ineffective"),
            ("No published thought leadership or whitepaper downloads to anchor authority", "Invisible Expertise")
        ],
        "jargon_use": ["Procurement audit", "vendor onboarding", "governance matrix", "M&A due diligence", "regulatory compliance", "partner credentials", "institutional capability deck", "SLA security"],
        "jargon_avoid": ["cheap legal", "quick consultation", "discount lawyer", "b2b deal", "law shop"],
        "flaw_breakdown": "An outdated, non-responsive 2016 corporate website or no website at all. Enterprise procurement teams and general counsels vetting legal and management partners require an institutional, sub-second digital portal that proves compliance, partner credentials, and confidentiality standards.",
        "phone_hook": "Good afternoon Mr. [Last Name], Deepak here, co-founder of Uncoded Hub in Bengaluru/Chennai. I was researching established corporate advisory firms in [Locality]. Your practice has an impeccable reputation, but your digital platform doesn't reflect your enterprise caliber on mobile—which can create friction during corporate procurement audits. We engineer bespoke, sub-second institutional platforms delivered in 7 days with a contractual guarantee: on time, or 100% free. May I share our executive specimen with your office?",
        "wa_voice_hook": "Hello Mr. [Last Name], Deepak from Uncoded Hub. I was reviewing your firm's advisory presence. When enterprise enterprise boards and multinational general counsels evaluate partners, an outdated web presence creates unnecessary hesitation. We build bespoke sub-second institutional platforms that clear corporate procurement audits in 7 days flat. Sending a 30-second mobile link below—take a look when you have a moment!",
        "email_subject": "Modernizing enterprise digital due-diligence for [Firm Name]",
        "objection_rebuttals": [
            ("Our corporate clients come through personal relationships, not online searches", "Relationships initiate the deal, but enterprise compliance and procurement teams perform mandatory digital due-diligence before signing the Master Services Agreement. If your digital presence looks 10 years old, it creates delays and red flags in vendor onboarding."),
            ("We cannot share client names or transaction details due to confidentiality", "You never share confidential details. Our institutional framework showcases problem-to-resolution capability matrices, anonymized transaction deal sizes, and regulatory domain expertise without compromising client privacy."),
            ("Corporate websites take months because of partnership approvals", "That is why traditional agencies fail you. Our 7-Day Sprint uses senior founders only—no junior account managers. We present a finalized, turnkey prototype based on your practice areas within 72 hours.")
        ],
        "closing_deal": "₹65,000 – ₹1,20,000 (Includes institutional capability showcase, practice area whitepaper portal, and partner credential matrices)."
    },
    {
        "num": "10",
        "niche": "Luxury Spas & Wellness Retreats",
        "file_prefix": "10_Luxury_Spas_Wellness_Retreats_Avatar.md",
        "archetype": "The Holistic Wellness Director & Luxury Spa Founder",
        "name_example": "Ananya Sundaram / Soma Sen",
        "age": "34 – 50",
        "locations": "Bengaluru (Indiranagar, Whitefield, Sadashivanagar) & Chennai (ECR, Nungambakkam, Alwarpet)",
        "biz_model": "Ayurvedic panchakarma, Swedish & Balinese therapies, hydrotherapy, and holistic weekend wellness retreats. Average treatment ticket size: ₹3,500 – ₹15,000/session; retreat packages ₹45,000 – ₹1.5 Lakhs. Annual turnover ₹60 Lakhs – ₹2.5 Crores.",
        "team": "1 Spa Manager, 8-16 Certified Therapists, 1 Ayurvedic Doctor, 2 Front Desk Hosts.",
        "daily_reality": "Oversees the sensory ambiance (essential oils, linen quality, soundscapes), manages therapist rosters, and ensures strict hygiene. Stressed by empty weekday appointment slots, high aggregator cuts (losing 20% to Urban Company or spa portals), and front desk staff who fail to explain treatment menus over the phone.",
        "pride_point": "Their botanical organic products, authentic Ayurvedic lineages, serene architectural sanctuary, and client stress relief.",
        "big_bad": "Commercial discount massage parlors and aggregator apps (Urban Company) that commoditize therapeutic bodywork into cheap services.",
        "past_scars": "Hired an agency that installed an ugly third-party booking iframe that broke the serene luxury feel of the brand and failed to process mobile gift card payments.",
        "symptoms": [
            ("Clunky booking widgets clash with their serene luxury aesthetic", "Embarrassed"),
            ("High-earning urban professionals call and ask for 'cheap massage deals'", "Devalued & Insulted"),
            ("Losing weekday morning appointment slots, leading to idle staff overhead", "Lost Margin"),
            ("No digital gift voucher checkout engine for anniversaries and corporate gifting", "Lost Revenue"),
            ("Therapist certifications and Ayurvedic herb purities are invisible online", "Unappreciated"),
            ("Clients drop off because treatment menus are buried in unreadable PDF files", "Frustrated")
        ],
        "jargon_use": ["Panchakarma protocol", "Balinese therapy", "hydrotherapy suite", "sensory ambiance", "botanical purity", "weekend retreat booking", "gift voucher engine", "aromatherapy menu"],
        "jargon_avoid": ["cheap massage", "discount spa", "body rub", "parlor deal", "quick massage"],
        "flaw_breakdown": "Zero website or using an Instagram bio with a raw phone number. Luxury wellness clients paying ₹8,000 for a weekend hydrotherapy session expect a serene, sensorial mobile website that showcases treatment menus, therapist credentials, and 1-tap booking.",
        "phone_hook": "Hi [Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I was looking at your sanctuary on Google Maps in [Locality]. Your ambiance and client reviews are breathtaking, but I noticed you don't have an independent mobile spa menu and gift voucher booking portal—relying on a phone number or PDF. We build serene, sub-second wellness portals delivered in 7 days guaranteed: on time, or 100% free. May I share our mobile specimen on WhatsApp?",
        "wa_voice_hook": "Hello [Name], Deepak from Uncoded Hub. I was just reviewing your spa's presence on Maps. Your client reviews are extraordinary, but urban professionals looking for luxury weekend retreats drop off when they have to call reception to see treatment menus. We build 1-second sensory portals that book high-ticket spa therapies directly. Sending a 30-second mobile link below—take a look when you have a free minute!",
        "email_subject": "Direct gift voucher & treatment booking for [Spa Name]",
        "objection_rebuttals": [
            ("Clients prefer calling reception to book appointments", "They call during the day, but high-earning corporate clients plan their weekend retreats at 10 PM in bed. If they can't browse your treatment menu or book a voucher in 2 taps, they postpone the idea and you lose the booking."),
            ("We already post our spa menus on Instagram", "Instagram stories expire, and highlight covers are messy to read on phones. An official sensory portal lets clients buy gift cards, choose their therapist, and read about your organic botanical ingredients in high definition."),
            ("Setting up an online booking engine is too technical for our staff", "We don't force complicated software on your desk. Our system sends confirmed appointment details directly into your front desk WhatsApp in clean, formatted text with zero technical friction.")
        ],
        "closing_deal": "₹45,000 – ₹75,000 (Includes sensory treatment menu visualizer, digital gift voucher checkout, and 1-tap WhatsApp booking)."
    },
    {
        "num": "11",
        "niche": "Salons & Bridal Beauty",
        "file_prefix": "11_Salons_Bridal_Beauty_Avatar.md",
        "archetype": "The Celebrity Makeup Artist & Bridal Beauty Atelier Owner",
        "name_example": "Zoya Khan / Simran Bedi",
        "age": "27 – 42",
        "locations": "Bengaluru (Indiranagar, Koramangala, Lavelle Road) & Chennai (T Nagar, Anna Nagar, Alwarpet)",
        "biz_model": "Luxury bridal hair & makeup, HD/Airbrush artistry, pre-bridal skin prep, and celebrity styling. Bridal package ticket size: ₹25,000 – ₹1.5 Lakhs per bride; pre-bridal packages ₹15,000 – ₹45,000. Annual turnover ₹45 Lakhs – ₹1.8 Crores.",
        "team": "1 Studio Manager, 4 Hair & Draping Stylists, 2 Junior Makeup Artists, 1 Booking Coordinator.",
        "daily_reality": "Works 4:00 AM bridal prep calls on wedding dates. Spends weekdays doing client trials, managing makeup kit inventories (Dior, Charlotte Tilbury, MAC), and filming Instagram reels. Completely swamped by dozens of Instagram DMs asking 'Price for muhurtham?' and answering the same questions about travel charges and trial dates.",
        "pride_point": "Their flawless skin finish that doesn't look cakey in 4K cameras, hair draping precision, and bride emotional satisfaction.",
        "big_bad": "Instagram DM fatigue, ghosting brides, and budget home-salon aggregators (Urban Company) commoditizing makeup services.",
        "past_scars": "Lost multiple high-budget destination brides because their booking contract was sent as a messy WhatsApp text and they had no official website with high-res skin texture proof.",
        "symptoms": [
            ("100% dependency on Instagram DMs, losing inquiries during peak wedding season chaos", "Overwhelmed & Frustrated"),
            ("Brides ghost after asking for pricing in DMs because they don't understand the value", "Devalued"),
            ("Using Linktree with broken links, giving an amateur impression to wealthy brides", "Embarrassed"),
            ("No peak-season bridal date availability checker, causing endless repetitive scheduling", "Inefficient"),
            ("High-res skin finish photos get compressed and look blurry on social media feeds", "Invisible Artistry"),
            ("Brides haggle over trial charges because there is no transparent policy portal", "Insulted")
        ],
        "jargon_use": ["Airbrush vs HD makeup", "real skin texture (no filters)", "Muhurtham draping", "trial session booking", "destination wedding kit", "pre-bridal countdown", "Charlotte Tilbury kit", "peak-season date checker"],
        "jargon_avoid": ["cheap parlour", "beauty package", "face painting", "discount makeup", "local salon"],
        "flaw_breakdown": "Relying 100% on Instagram DMs with a Linktree bio. Brides spending ₹50,000 to ₹1.5 Lakhs on wedding makeup need to zoom into unfiltered skin texture, verify the cosmetic brand kit (Dior/MAC), check date availability, and sign an official booking agreement.",
        "phone_hook": "Hi [Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I was admiring your bridal makeup portfolio on Instagram. Your skin finish and draping work are stunning, but I noticed you don't have an independent mobile atelier with an instant bridal date checker and unfiltered skin sliders—forcing you to answer repetitive pricing DMs all day. We build sub-second bridal portals with a 7-day sprint guarantee: on time, or 100% free. Can I WhatsApp you the demo link?",
        "wa_voice_hook": "Hey [Name], Deepak from Uncoded Hub. Loved your recent bridal transformations. Wedding season is crazy, and answering 50 DMs a day asking for Muhurtham pricing is exhausting. We engineer custom 1-second bridal platforms that filter out price-shoppers, show real skin texture sliders, and book paid trials automatically. Sending a 30-second mobile link below—take a look between brides!",
        "email_subject": "Automating bridal date booking for [Studio Name] (Zero DM fatigue)",
        "objection_rebuttals": [
            ("All my brides come through Instagram; I don't need a website", "Brides find you on Instagram, but when they want to show your work to their mother or groom to approve a ₹60,000 booking, an Instagram link gets lost in the feed. An official atelier site anchors your brand, allows them to book a paid trial, and eliminates price haggling."),
            ("Bridal makeup is too custom to put pricing online", "You don't publish a flat rate; you showcase your tiered experiences (e.g., HD Signature vs Airbrush Couture) with inclusions (hair draping, lashes, trial). It pre-qualifies their budget so you stop wasting hours on brides with ₹5,000 expectations."),
            ("I don't have time to manage a website during wedding season", "Our platforms are zero-maintenance. We set up the entire site in 7 days, link it to your existing WhatsApp, and automate your date qualification so your phone rings only with serious brides ready to pay deposits.")
        ],
        "closing_deal": "₹40,000 – ₹65,000 (Includes unfiltered before/after skin sliders, interactive bridal date checker, and paid trial booking funnel)."
    },
    {
        "num": "12",
        "niche": "Private Fitness Coaches & Personal Trainers",
        "file_prefix": "12_Private_Fitness_Coaches_Personal_Trainers_Avatar.md",
        "archetype": "The High-Ticket Transformation Coach & Executive Trainer",
        "name_example": "Capt. Dennis D'Souza / Ritika Sharma",
        "age": "28 – 42",
        "locations": "Bengaluru (Indiranagar, Koramangala, Whitefield) & Chennai (Adyar, Alwarpet, ECR)",
        "biz_model": "1-on-1 private executive personal training, online body recomposition cohorts, and corporate wellness advisory. Retainer ticket size: ₹15,000 – ₹45,000/month or ₹75,000 for 12-week transformation programs. Practice turnover ₹30 Lakhs – ₹1.2 Crores.",
        "team": "Solo coach with 1 Remote Nutritionist and 1 Video Editor.",
        "daily_reality": "Trains HNI clients in luxury apartment gyms from 6 AM to 10 AM, conducts online check-ins from 11 AM to 2 PM, and trains evening clients from 5 PM to 8 PM. Completely sick of people in Instagram DMs asking for 'free diet charts' or comparing their specialized rehabilitation coaching to ₹1,500/month gym trainers.",
        "pride_point": "Their clinical transformation case studies (DEXA scan proof, blood panel reversal of diabetes/PCOS), athletic certifications, and client retention.",
        "big_bad": "Generic fitness influencers selling ₹499 generic PDF workout plans, and commercial gym floor trainers charging low hourly rates.",
        "past_scars": "Used a Linktree with 7 links to Google Forms that had a 70% abandonment rate and made them look like an amateur fitness creator rather than an elite executive transformation coach.",
        "symptoms": [
            ("Relying on Linktree in bio, looking like an amateur to high-paying executive clients", "Embarrassed"),
            ("Selling commoditized hourly sessions instead of high-ticket ₹50k+ 12-week retainers", "Underpaid & Exhausted"),
            ("Giving away free nutrition advice in DMs to people who never convert", "Drained & Exploited"),
            ("Client transformation proof (DEXA scans, blood markers) is buried in phone albums", "Invisible Authority"),
            ("Potential corporate clients reject proposals because there is no official portal", "Disqualified"),
            ("Managing client progress via scattered WhatsApp chats and chaotic PDF check-ins", "Chaotic")
        ],
        "jargon_use": ["DEXA scan proof", "metabolic flexibility", "12-week transformation roadmap", "hypertrophy bio-mechanics", "blood panel reversal", "executive posture rehabilitation", "application intake funnel", "macro adherence"],
        "jargon_avoid": ["cheap trainer", "diet plan", "gym instructor", "weight loss discount", "workout buddy"],
        "flaw_breakdown": "Using a generic Linktree with broken links or Google Forms. Wealthy executives, founders, and professionals ready to invest ₹60,000 in personal training will not fill out a generic Google Form. They demand an elite coaching portal that showcases clinical transformation case studies and an application funnel.",
        "phone_hook": "Hi [Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I saw your transformation results on Instagram in [City]. Your client results and certifications are top tier, but I noticed you're using a basic Linktree in your bio—which makes an elite coach look like an amateur creator and costs you high-ticket executive retainers. We build sub-second transformation portals with an application funnel in 7 days guaranteed: on time, or 100% free. Can I send the mobile specimen to your WhatsApp?",
        "wa_voice_hook": "Hey [Name], Deepak from Uncoded Hub. Love your transformation case studies. When high-earning tech founders and executives look for a coach in [City], sending them to a Linktree or Google Form causes 60% drop-off. We engineer custom 1-second authority portals with DEXA before/after sliders and application qualification in 7 days flat. Sending a 30-second mobile link below—check it out between clients!",
        "email_subject": "Replacing Linktree with a high-ticket transformation portal for [Name]",
        "objection_rebuttals": [
            ("I get enough clients through Instagram and word of mouth", "Word of mouth gets you clients at your current rates. An elite authority portal lets you 2x your pricing to ₹60k–₹80k retainers because corporate executives view you as a high-performance specialist rather than an hourly gym trainer."),
            ("A Google Form is enough to onboard my clients", "Google Forms feel like school surveys and have a 65% drop-off rate. A custom application portal asks qualifying questions seamlessly while reinforcing your methodology, so clients arrive on your discovery call ready to invest."),
            ("I don't have time to create content for a website", "You don't need a blog. You need a razor-sharp single-page authority platform showcasing your top 6 client transformations, your 12-week roadmap, and your application form. We build the entire thing in 7 days.")
        ],
        "closing_deal": "₹35,000 – ₹55,000 (Includes interactive DEXA before/after slider, 12-week roadmap visualizer, and qualified application intake funnel)."
    },
    {
        "num": "13",
        "niche": "Traditional Yoga Shalas & Meditation Sanctuaries",
        "file_prefix": "13_Traditional_Yoga_Shalas_Meditation_Sanctuaries_Avatar.md",
        "archetype": "The Revered Yoga Acharya & Shala Founder",
        "name_example": "Acharya Krishna Chaitanya / Radhika Shastri",
        "age": "36 – 58",
        "locations": "Bengaluru (Malleshwaram, Indiranagar, Jayanagar) & Chennai (Mylapore, Besant Nagar, Adyar)",
        "biz_model": "Traditional Mysore-style Ashtanga, Classical Hatha Yoga, Pranayama, and 200/300-hour Yoga Teacher Training Courses (TTC). Monthly shala membership: ₹3,500 – ₹8,000; TTC courses: ₹85,000 – ₹2.5 Lakhs (with international students). Shala turnover ₹40 Lakhs – ₹1.8 Crores.",
        "team": "1 Acharya, 3-6 Certified Yoga Teachers, 1 Shala Coordinator, visiting philosophy scholars.",
        "daily_reality": "Opens the shala at 5:00 AM for Mysore-style self-practice and hands-on adjustments. Spends afternoons preparing teacher training study materials and managing international student visa/accommodation queries. Deeply pained by commercial gym 'hot yoga' trends that reduce an ancient spiritual tradition to a superficial sweat session.",
        "pride_point": "Their direct lineage (Parampara), adherence to Patanjali's Yoga Sutras, sacred chantings, and student spiritual transformation.",
        "big_bad": "Commercialized Western fitness studios and wellness aggregators who commoditize authentic yoga into quick gym workouts.",
        "past_scars": "Used an ugly third-party Mindbody widget that felt cold, corporate, and clashed with the spiritual sanctity of their traditional shala.",
        "symptoms": [
            ("Clunky Mindbody widgets clashing with their sacred, serene brand aesthetic", "Embarrassed"),
            ("International students drop off TTC enrollment pages due to opaque lodging fees", "Lost Revenue"),
            ("Static PNG image timetables that cannot be read on mobile phones", "Inefficient"),
            ("Prospective students confuse authentic traditional yoga with commercial gym yoga", "Misunderstood"),
            ("No digital 3-class trial pass booking engine, leading to chaotic drop-in visits", "Disorganized"),
            ("Generational lineage and philosophical teachings are uncatalogued online", "Forgotten Heritage")
        ],
        "jargon_use": ["Parampara lineage", "Mysore-style Ashtanga", "Yoga Sutras of Patanjali", "Pranayama breathwork", "200-hour TTC certification", "hands-on adjustment protocol", "shala sanctuary", "mindfulness timetable"],
        "jargon_avoid": ["hot yoga burn", "yoga workout deal", "gym yoga", "cheap stretching", "fitness yoga"],
        "flaw_breakdown": "Using an unreadable PNG timetable on an Instagram post or no website. International and high-caliber domestic students looking to invest ₹1 Lakh in a Teacher Training Course or dedicated Ashtanga practice expect an authentic, serene digital sanctuary that documents the lineage, daily shala rules, and trial passes.",
        "phone_hook": "Namaste Acharya [Last Name], Deepak here from Uncoded Hub in Bengaluru/Chennai. I was reading about your shala's traditional practice on Google Maps in [Locality]. Your lineage and student reverence are exceptional, but your digital presence currently lacks a serene mobile shala timetable and international TTC enrollment portal. We engineer bespoke, sub-second digital sanctuaries delivered in 7 days guaranteed: on time, or 100% free. May I share our mobile specimen on WhatsApp?",
        "wa_voice_hook": "Namaste [Name], Deepak from Uncoded Hub. I was admiring your shala's commitment to authentic Parampara yoga. Modern students searching on mobile often get confused by gym yoga because traditional shalas share static image timetables that buffer on phones. We build 1-second serene shala platforms that honor your lineage and enroll serious practitioners in 7 days flat. Sending a 30-second mobile link below—take a look when you have a quiet moment!",
        "email_subject": "Preserving lineage & automating TTC admissions for [Shala Name]",
        "objection_rebuttals": [
            ("Yoga is a spiritual practice; we don't believe in commercial marketing", "We completely agree. That is why we don't build commercial, flashy sales funnels. We build digital sanctuaries: calm, serene, fast platforms that document your sacred lineage and help serious practitioners find an authentic teacher instead of a commercial gym."),
            ("Our students know our timings through word of mouth", "Local students know, but international students and new residents in [City] searching for authentic Ashtanga find modern corporate yoga studios instead. A clean timetable and lineage page brings you dedicated, respectful students."),
            ("We tried software like Mindbody and it was too clunky", "Mindbody is built for American corporate gyms, not Indian yoga shalas. Our custom platforms have zero third-party software clutter—your students view the live timetable and book a trial pass directly into your shala's WhatsApp.")
        ],
        "closing_deal": "₹40,000 – ₹65,000 (Includes serene lineage archive, mobile-responsive interactive timetable, and TTC admission portal)."
    },
    {
        "num": "14",
        "niche": "Creative Studios & Design Agencies",
        "file_prefix": "14_Creative_Studios_Design_Agencies_Avatar.md",
        "archetype": "The Visionary Creative Director & Agency Founder",
        "name_example": "Kabir Bedi / Tanvi Shah",
        "age": "29 – 45",
        "locations": "Bengaluru (Koramangala, Indiranagar, HSR) & Chennai (Alwarpet, Besant Nagar, OMR)",
        "biz_model": "Brand identity, UI/UX product design, high-end packaging, and full-stack creative campaigns. Retainer ticket size: ₹1.5 Lakhs – ₹6 Lakhs/month or project fees ₹3 Lakhs – ₹25 Lakhs+. Agency turnover ₹80 Lakhs – ₹5 Crores.",
        "team": "1 Managing Director, 4 Product Designers, 2 Brand Strategists, 2 Copywriters, 2 Motion Designers.",
        "daily_reality": "Spends days pitching VC-funded startups and enterprise brands, conducting design sprints, and reviewing Figma prototypes. Deeply frustrated by having their Webflow site stutter at 35fps on mobile, or having enterprise clients reject proposals because their portfolio looks like pretty Behance eye-candy without business ROI metrics.",
        "pride_point": "Their typography craft, design system precision, Awwwards recognition, and commercial brand transformations.",
        "big_bad": "Legacy slow agency conglomerates (Ogilvy) winning enterprise contracts on size, and cheap freelance platforms (Fiverr/Upwork) commoditizing logo design.",
        "past_scars": "Built a bloated Webflow/Framer site with heavy JavaScript animations that scores 28/100 on Google PageSpeed Insights and loses enterprise procurement contracts.",
        "symptoms": [
            ("Webflow/Framer site stutters at 35fps and scores poorly on mobile Google PageSpeed", "Embarrassed"),
            ("Enterprise procurement teams reject proposals because case studies lack commercial ROI data", "Disqualified"),
            ("Behance grid shows pretty mockups without explaining the strategic business problem solved", "Commoditized"),
            ("Clients demand endless scope creep because there is no transparent retainer matrix", "Exhausted"),
            ("Inbound brief intake form is too long, leading to 70% abandonment by busy startup founders", "Lost Leads"),
            ("Losing international design retainers to studios with sub-second portfolio engineering", "Outclassed")
        ],
        "jargon_use": ["Sub-second LCP", "60fps micro-interactions", "design system tokens", "commercial ROI lift", "procurement-ready casework", "retainer scope matrix", "Figma-to-production", "Awwwards-level craft"],
        "jargon_avoid": ["cheap logo", "graphic design package", "banner design", "discount agency", "creative shop"],
        "flaw_breakdown": "Using an image-only Behance profile, an Instagram grid, or a stuttering Webflow site that takes 6 seconds to load on mobile. High-growth startup founders and enterprise CMOs hiring a ₹10 Lakh design agency judge their technical rigor by their website's load speed and interactive performance.",
        "phone_hook": "Hi [Name], Deepak here, co-founder of Uncoded Hub in Bengaluru/Chennai. I was admiring your agency's brand design portfolio. Your aesthetic craft is world-class, but I noticed your mobile site suffers from animation lag and heavy LCP—which hurts you during enterprise procurement and CMO reviews. We engineer sub-second, bespoke React platforms for design studios that run at a locked 60fps with a 7-day guarantee: on time, or 100% free. Can I share our specimen on WhatsApp?",
        "wa_voice_hook": "Hey [Name], Deepak from Uncoded Hub. Huge fan of your agency's visual identity work. When enterprise CMOs and tech founders evaluate creative agencies, heavy Webflow sites that stutter on mobile create doubt about technical execution. We build sub-second custom code portfolios that showcase commercial ROI at 60fps in 7 days flat. Sending a 30-second mobile link below—check out the case study transitions!",
        "email_subject": "Locked 60fps mobile speed for [Agency Name] portfolio (Sub-1s LCP)",
        "objection_rebuttals": [
            ("We are a design agency; we can build our own website in-house", "You have the talent, but agency client work always takes priority. Your in-house redesign has likely been sitting in Figma for 6 months while paying clients consume your team's hours. Uncoded Hub acts as your dedicated sprint partner—we take your Figma designs and turn them into locked 60fps code in 7 days."),
            ("Webflow is good enough for our agency", "Webflow is easy to build on, but it carries 1.5MB of bloated vendor runtime that stutters on mobile phones and scores 30 on PageSpeed. Enterprise enterprise procurement teams run automated audits—our bespoke code gives you 99+ PageSpeed scores that prove your engineering rigor."),
            ("We don't need a website; we get clients through Twitter/Behance", "Behance showcases visuals, but enterprise clients hiring for ₹5 Lakh/month retainers need to read strategic case studies: problem, business constraints, and commercial lift. An owned high-speed portal closes enterprise deals that Behance can't.")
        ],
        "closing_deal": "₹50,000 – ₹85,000 (Includes locked 60fps interactive casework, enterprise ROI metrics breakdown, and brief intake UX)."
    },
    {
        "num": "15",
        "niche": "Pathology Labs & Diagnostic Centers",
        "file_prefix": "15_Pathology_Labs_Diagnostic_Centers_Avatar.md",
        "archetype": "The Chief Pathologist & Diagnostic Center Managing Director",
        "name_example": "Dr. Satish Kulkarni, MD Path / Dr. Balan",
        "age": "42 – 60",
        "locations": "Bengaluru (Jayanagar, HSR, Malleswaram) & Chennai (T Nagar, Anna Nagar, Kilpauk)",
        "biz_model": "Automated pathology, molecular diagnostics, biochemistry, and preventive full-body health packages. Test ticket sizes: Routine blood tests (₹500 – ₹2,500), Executive packages (₹4,500 – ₹12,000), Molecular/Genomic scans (₹15,000 – ₹45,000). Turnover ₹1 Crore – ₹8 Crores.",
        "team": "2 Pathologists, 1 Biochemist, 8 Phlebotomists, 4 Lab Technicians, 2 Sample Dispatch Coordinators.",
        "daily_reality": "Supervises automated analyzer calibration (Roche, Beckman Coulter), signs off on critical pathology reports, and coordinates morning home sample collection logistics. Constantly squeezed by aggregator apps (1mg, PharmEasy, Healthians) that take 30% commission cuts and commoditize precision diagnostic medicine.",
        "pride_point": "Their NABL accreditation, Roche/Siemens automated equipment accuracy, and cold-chain sample integrity.",
        "big_bad": "Online Medicine Aggregators (Tata 1mg, Apollo 24/7) that undercut testing prices and burn investor cash to monopolize home sample bookings.",
        "past_scars": "Hired an agency that set up a slow WordPress site where test report downloads failed constantly, resulting in hundreds of angry patient phone calls to the lab desk.",
        "symptoms": [
            ("Losing 30% margin on home sample collections to health aggregators (1mg/PharmEasy)", "Exploited & Dependent"),
            ("Patients call the lab repeatedly because online test report download is broken", "Chaotic & Drained"),
            ("Patients arrive for blood tests unprepared (not fasting) due to missing pre-test guides", "Frustrated"),
            ("No automated WhatsApp test report retrieval engine, slowing down front desk", "Inefficient"),
            ("State-of-the-art Roche/Siemens analyzer equipment is invisible to patients", "Undervalued"),
            ("Local doctors send referrals elsewhere because the digital referral portal doesn't exist", "Lost Revenue")
        ],
        "jargon_use": ["NABL accreditation", "Roche automated analyzer", "fasting protocol guide", "home phlebotomy engine", "cold-chain integrity", "WhatsApp report retrieval", "preventive health packages", "doctor referral portal"],
        "jargon_avoid": ["cheap blood test", "discount lab", "test shop", "quick blood test", "sample pickup guy"],
        "flaw_breakdown": "Zero website or an unmaintained portal with broken report download links. When families in [Locality] need urgent blood work or executive full-body checkups, they search Google Maps. Without an instant home collection booking engine and WhatsApp report retrieval, they default to 1mg.",
        "phone_hook": "Good morning Dr. [Last Name], Deepak here, co-founder of Uncoded Hub in Bengaluru/Chennai. I was reviewing your diagnostic center's outstanding reputation on Google Maps in [Locality]. You have top-tier NABL credibility, but I noticed you don't have an independent 1-click home sample collection booking and WhatsApp report engine—meaning you're losing high-margin health packages to 1mg. We build sub-second diagnostic platforms delivered in 7 days guaranteed: on time, or 100% free. May I share our mobile specimen on WhatsApp?",
        "wa_voice_hook": "Hello Dr. [Last Name], Deepak from Uncoded Hub. Was reviewing your lab on Maps. When families need urgent blood tests or home sample collection, an outdated site forces them to 1mg where you lose 30% commission. We build custom 1-second diagnostic platforms with automated WhatsApp report delivery and pre-test fasting guides in 7 days flat. Sending a 30-second mobile link below—check it out when you have a moment!",
        "email_subject": "Stopping the 30% 1mg aggregator cut for [Lab Name] (Direct home collection)",
        "objection_rebuttals": [
            ("Patients just call our front desk for home sample collection", "They call during business hours, but working professionals book health checkups for elderly parents late at night. An instant 1-click home sample booking engine captures those high-ticket corporate packages while your desk is sleeping."),
            ("We already use laboratory software (LIMS) for reports", "LIMS software is great for internal machines, but its patient-facing web portal is notoriously clunky, ugly, and frustrating to use on phones. Our platform integrates seamlessly: clean frontend, 1-tap WhatsApp report delivery, and zero patient friction."),
            ("Aggregators give us massive volume that we can't get on our own", "Aggregators give you volume while taking 30% of your margin and controlling the patient relationship. Every patient who books through your own high-speed site is 100% your customer, with zero commission leakage and higher lifetime repeat value.")
        ],
        "closing_deal": "₹50,000 – ₹80,000 (Includes 1-click home phlebotomy booking, automated WhatsApp report retrieval, and preventive health package selector)."
    },
    {
        "num": "16",
        "niche": "Multi-Specialty Polyclinics & Outpatient Centers",
        "file_prefix": "16_Multi_Specialty_Polyclinics_Outpatient_Centers_Avatar.md",
        "archetype": "The Polyclinic Medical Director & Managing Trustee",
        "name_example": "Dr. Pradeep Kumar / Dr. Alka Malhotra",
        "age": "44 – 64",
        "locations": "Bengaluru (HSR Layout, Whitefield, Jayanagar) & Chennai (Anna Nagar, Adyar, Kilpauk)",
        "biz_model": "Outpatient consultations across 8-15 specialties (Pediatrics, Gynecology, Ortho, Cardiology, Dermatology) with day-care procedures and in-house pharmacy. Daily footfall: 80 – 250 OPD patients. Polyclinic turnover ₹1.5 Crores – ₹7 Crores.",
        "team": "1 Medical Director, 12-25 Visiting Consultants, 4 Duty Doctors, 6 Nurses, 3 Front Desk Staff, 2 Pharmacy Technicians.",
        "daily_reality": "Coordinates complex visiting doctor schedules, manages crowded reception waiting rooms, and resolves patient queue complaints. Stressed by phone lines constantly ringing busy, doctors arriving late without notification, and patients walking out because they didn't know doctor availability.",
        "pride_point": "Their neighborhood community trust, multi-specialty convenience, and patient-first medical ethics.",
        "big_bad": "Corporate Hospital Chains (Apollo, Fortis, Manipal) that drain local outpatient volumes with heavy brand dominance, and Practo charging fees to list their own doctors.",
        "past_scars": "Purchased an over-engineered hospital management system with an unusable website that patient families couldn't navigate on mobile phones.",
        "symptoms": [
            ("Front desk phone lines constantly engaged, leading to angry patients and missed bookings", "Chaotic & Drained"),
            ("Patients wait 45 minutes in waiting rooms because OPD timings were outdated online", "Embarrassed"),
            ("Families cannot see specialty doctor schedules (e.g. Pediatrician vs Dermatologist) on mobile", "Lost Patients"),
            ("Corporate hospital chains steal neighborhood OPD footfall due to slick mobile booking", "Outmuscled"),
            ("No automated WhatsApp symptom-based OPD triage to guide patients to the right specialist", "Inefficient"),
            ("Opaque consultation fee schedules cause friction at the front payment desk", "Disputed")
        ],
        "jargon_use": ["OPD schedule matrix", "specialty triage", "day-care procedure", "pediatric vaccination calendar", "TPA insurance desk", "visiting consultant roster", "token queue visibility", "WhatsApp OPD desk"],
        "jargon_avoid": ["cheap doctor", "clinic discount", "medical shop", "bargain healthcare", "quick doctor"],
        "flaw_breakdown": "Zero website or an unmaintained medical WordPress blog with outdated doctor timings. When a mother in [Locality] needs an emergency pediatrician or a family needs a cardiologist visit, they search on Google Maps. If the doctor roster isn't crystal clear with 1-tap WhatsApp booking, they rush to Apollo.",
        "phone_hook": "Good afternoon Dr. [Last Name], Deepak here, co-founder of Uncoded Hub in Bengaluru/Chennai. I was looking at your polyclinic on Google Maps in [Locality]. You have exceptional neighborhood trust, but I noticed your visiting doctor schedules and OPD timings aren't accessible on mobile—which causes front-desk phone congestion and sends patients to corporate hospitals. We build custom sub-second clinical platforms delivered in 7 days guaranteed: on time, or 100% free. May I share our mobile specimen on WhatsApp?",
        "wa_voice_hook": "Hello Dr. [Last Name], Deepak from Uncoded Hub. I was reviewing your polyclinic's presence on Maps. When families need a specialist in [Locality], engaged phone lines cause them to go to Apollo. We build 1-second polyclinic platforms with live doctor rosters, pediatric vaccination calendars, and 1-tap WhatsApp triage in 7 days flat. Sending a 30-second mobile link below—check it out when you have a moment!",
        "email_subject": "Eliminating front-desk phone congestion for [Polyclinic Name] (Live OPD Roster)",
        "objection_rebuttals": [
            ("Our visiting doctors change schedules frequently; updating a website is too hard", "That's why our system is engineered specifically for clinics. You don't call a developer; your front desk coordinator updates timings in 10 seconds via a simple Google Sheet or dashboard that syncs instantly to mobile."),
            ("Patients in our neighborhood know us and just walk in", "Walk-ins work for coughs and colds, but high-margin specialty consultations (Orthopedics, Gynecology, Dermatology) are researched by families online. A clear specialty roster captures those lucrative consultations before they go to corporate hospitals."),
            ("We can't afford expensive hospital software", "We don't charge corporate hospital software rates. Our 7-Day Sprint delivers a turnkey, high-speed web platform for a single flat fee with zero monthly software subscription traps.")
        ],
        "closing_deal": "₹55,000 – ₹85,000 (Includes live visiting consultant schedule matrix, pediatric vaccination tracker, and 1-tap WhatsApp OPD booking)."
    },
    {
        "num": "17",
        "niche": "Super-Specialist Doctors & Surgeons",
        "file_prefix": "17_Super_Specialist_Doctors_Surgeons_Avatar.md",
        "archetype": "The Super-Specialist Surgeon & Clinical Authority",
        "name_example": "Dr. Arvind Ranganathan, FRCS / Dr. Meera Vasudevan, MS",
        "age": "42 – 62",
        "locations": "Bengaluru (Indiranagar, Koramangala, Sadashivanagar) & Chennai (Greams Road, Anna Nagar, Adyar)",
        "biz_model": "Advanced super-speciality surgery (Robotic joint replacement, Laparoscopic oncology, Spine surgery, Bariatric surgery). Surgical procedure ticket sizes: ₹1.8 Lakhs – ₹12 Lakhs per surgery. Performs 100 – 350 major surgeries annually. Personal practice revenue ₹1.5 Crores – ₹6 Crores.",
        "team": "1 Senior Surgeon, 1 Junior Surgical Fellow, 1 Practice Coordinator, 1 Patient Counseling Manager.",
        "daily_reality": "Performs complex surgeries from 7 AM to 2 PM at partner hospitals. Conducts post-op rounds, reviews MRI/CT scan reports, and sees private consultation patients until 8 PM. Deeply frustrated by being trapped on Practo where competitor ads appear on their profile, and losing outstation/NRI second-opinion surgeries because their personal surgical credentials are not showcased properly.",
        "pride_point": "Their surgical case volume (2,500+ successful operations), international fellowships, low complication rates, and academic research papers.",
        "big_bad": "Healthcare Platforms (Practo, Justdial) that commoditize senior surgeons, and massive hospital PR machines that market the hospital brand while ignoring the surgeon's personal authority.",
        "past_scars": "Paid a generic digital agency that built a generic clinic website filled with amateur medical stock photos and zero surgical case logbooks.",
        "symptoms": [
            ("Trapped on Practo where competitor ads are plastered on the surgeon's own profile page", "Exploited & Insulted"),
            ("High surgical case volume (2,500+ procedures) is uncatalogued online", "Invisible Authority"),
            ("Outstation and NRI second-opinion patients cannot securely upload DICOM/CT scans", "Lost Surgeries"),
            ("Patients cancel surgeries due to fear because there are no downloadable recovery guides", "Frustrated"),
            ("Hospital PR takes credit for landmark surgeries while the surgeon remains hidden", "Overshadowed"),
            ("Front desk staff lacks clinical expertise to triage anxious second-opinion inquiries", "Inefficient")
        ],
        "jargon_use": ["Surgical volume logbook", "minimally invasive robotic procedure", "second-opinion scan portal", "pre-op recovery protocol", "fellowship credentials", "complication rate transparency", "international patient concierge", "clinical case audit"],
        "jargon_avoid": ["cheap surgery", "discount doctor", "operation deal", "surgeon discount", "medical shop"],
        "flaw_breakdown": "Zero personal website or relying purely on a Practo profile or hospital directory. Patients facing a ₹4 Lakh robotic knee replacement or oncology procedure search extensively for the surgeon's personal track record. Without a dedicated personal surgical authority portal, they seek second opinions elsewhere.",
        "phone_hook": "Good evening Dr. [Last Name], Deepak here, co-founder of Uncoded Hub in Bengaluru/Chennai. I was reading about your surgical contributions in [Specialty]. You have extraordinary clinical authority, but I noticed you don't have an independent personal surgical portal with a secure second-opinion scan upload funnel—leaving your online presence tied to Practo where competitor ads appear. We engineer bespoke, sub-second surgical authority portals delivered in 7 days guaranteed: on time, or 100% free. May I share our specialist specimen with your practice coordinator?",
        "wa_voice_hook": "Hello Dr. [Last Name], Deepak from Uncoded Hub. I was admiring your surgical volume in [City]. Senior surgeons performing high-stakes procedures lose dozens of NRI and outstation second-opinion surgeries because hospital directories bury personal credentials. We build custom 1-second surgical authority platforms with secure scan upload funnels and recovery handbooks in 7 days flat. Sending a 30-second mobile link below—check it out between surgical rounds!",
        "email_subject": "Independent surgical authority portal for Dr. [Last Name] (Second-Opinion Funnel)",
        "objection_rebuttals": [
            ("I already have a profile on my hospital's website", "The hospital website promotes the hospital brand, not you. If you ever change hospitals or operate across multiple centers, your patient reviews and authority stay trapped on their server. A personal surgeon portal belongs 100% to you and travels with your career."),
            ("Practo gives me all the consultation appointments I need", "Practo gives you routine consultations, but plasters competing doctors on your page. When a patient needs a ₹5 Lakh robotic surgery, they want to verify your personal case volume, fellowship training, and peer-reviewed papers. A personal portal closes the surgery; Practo only books the OPD visit."),
            ("Super-specialist doctors shouldn't advertise or look commercial", "We strictly uphold medical ethics. Our platforms are educational, dignified, and academic: documenting surgical case volume, peer publications, patient recovery timelines, and hospital affiliations without commercial hype.")
        ],
        "closing_deal": "₹60,000 – ₹95,000 (Includes surgical case volume logbook, secure second-opinion scan upload portal, and pre/post-op patient recovery handbooks)."
    }
]

def generate_individual_avatars():
    print("Generating 17 Individual Client Avatar Dossiers...")
    for av in AVATARS:
        path = os.path.join(AVATARS_DIR, av["file_prefix"])
        content = f"""# 👤 Client Avatar Dossier: {av['niche']}
### Uncoded Hub Strategic Client Acquisition Blueprint | Executive Intelligence Dossier
*Designed for Deepak & Geetha to master the psychology, vocabulary, and objections of this client before making a single call or sending an email.*

---

## 1. Persona Identity & Professional Demographics

| Attribute | Profile Details |
| :--- | :--- |
| **Archetype** | **{av['archetype']}** |
| **Representative Name** | {av['name_example']} |
| **Age Range** | {av['age']} |
| **Prime Localities** | {av['locations']} |
| **Business Model & Tickets** | {av['biz_model']} |
| **Team Structure** | {av['team']} |
| **Closing Deal Target** | **{av['closing_deal']}** |

---

## 2. Daily Reality & Internal Monologue

### A Day in Their Life:
{av['daily_reality']}

### Their Core Source of Pride:
> *"{av['pride_point']}"*

---

## 3. The "Big Bad" Villain & Industry Traps

### Who is Stealing Their Business?
{av['big_bad']}

### Past Agency Scars & Skepticism:
> *"{av['past_scars']}"*

---

## 4. Psychology: Symptoms & Negative Emotions

| Specific Real-World Symptom | Associated Negative Emotion |
| :--- | :--- |
"""
        for sym, emo in av["symptoms"]:
            content += f"| {sym} | **{emo}** |\n"

        content += f"""
---

## 5. Industry Insiders' Vocabulary & Trigger Words

### ✅ Words & Concepts You MUST Drop Casually:
"""
        for j in av["jargon_use"]:
            content += f"- **`{j}`**\n"

        content += f"""
### ❌ Words That Instantly Disqualify You (NEVER SAY THESE):
"""
        for ja in av["jargon_avoid"]:
            content += f"- ~~{ja}~~\n"

        content += f"""
---

## 6. Why Their Current Setup (No Website / Linktree / WhatsApp) is Bleeding Money

{av['flaw_breakdown']}

---

## 7. Pre-Call Battle-Tested Outreach Scripts

### 📞 45-Second Cold Call Opening Hook:
> *"{av['phone_hook']}"*

### 🎙️ 35-Second WhatsApp Voice Note Script:
> *"{av['wa_voice_hook']}"*

### ✉️ Personalized Cold Email Subject Line:
> **Subject:** `{av['email_subject']}`

---

## 8. The 3 Biggest Objections & Bulletproof Rebuttals

"""
        for obj, reb in av["objection_rebuttals"]:
            content += f"### 🔴 Objection: *\"{obj}\"*\n"
            content += f"**🟢 Uncoded Hub Rebuttal:**\n> *\"{reb}\"*\n\n"

        content += f"""---

## 9. The Uncoded Hub 7-Day Sprint Closing Angle

When closing {av['niche']} owners, always anchor our 4 contractual advantages:
1. **7-Day Delivery Sprint:** No 4-month agency delays. Deployed in 7 working days.
2. **On Time Or Free Guarantee:** Contractual guarantee: on time, or the build is 100% free.
3. **Sub-Second Code Rigor:** Custom React architecture, sub-second LCP, zero WordPress bloat.
4. **Senior Founder Execution:** Handcrafted directly by founders Deepak & Geetha.

---
"""
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Generated: {path}")

def generate_master_dossier():
    print("Generating Master Client Avatars Dossier...")
    master_content = """# 🎯 Uncoded Hub: Master Client Avatar Dossier (All 17 Niches)
### The Complete Psychological, Tactical & Commercial Field Manual for Deepak & Geetha
*Engineered to turn cold outreach into closed high-ticket clients across Bengaluru & Chennai.*

---

## 📑 Executive Quick-Reference Index

| # | Niche | Archetype | Target Ticket | Prime Pitch Angle | Dossier Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
"""
    for av in AVATARS:
        master_content += f"| **{av['num']}** | **{av['niche']}** | {av['archetype']} | {av['closing_deal']} | {av['email_subject']} | [View Avatar](file:///c:/Users/LENOVO/Downloads/uncoded-hub/Outreach_System/Client_Avatars/{av['file_prefix']}) |\n"

    master_content += """
---

## 🧠 Master Psychology Framework: How to Read Any Client in 10 Seconds

Every business owner in these 17 niches falls into one of three core psychological traps:

```mermaid
graph TD
    A["Prospect's Current State"] --> B["Trap 1: The Aggregator Squeeze"]
    A --> C["Trap 2: The Amateur Linktree Trap"]
    A --> D["Trap 3: The Bad Agency Scar"]
    
    B --> E["Paying 20-30% cuts to Practo, Cult, 99acres, Livspace"]
    C --> F["Using raw WhatsApp link or Linktree in bio losing HNW buyers"]
    D --> G["Burned by ₹50k WordPress freelancer who took 4 months"]
    
    E --> H["Uncoded Hub Solution: 100% Client Ownership & Zero Commission"]
    F --> I["Uncoded Hub Solution: Sub-Second Editorial/Clinical Authority Portal"]
    G --> J["Uncoded Hub Solution: Contractual 7-Day Sprint (On Time or 100% Free)"]
```

---

"""
    # Append all 17 dossiers into master
    for av in AVATARS:
        master_content += f"""
# ═══════════════════════════════════════════════════════════════════════════════
# NICHE {av['num']}: {av['niche'].upper()}
# ═══════════════════════════════════════════════════════════════════════════════

## 1. Persona Profile
- **Archetype:** {av['archetype']}
- **Representative Profile:** {av['name_example']} (Age {av['age']})
- **Prime Localities:** {av['locations']}
- **Business Scale:** {av['biz_model']}
- **Team Size:** {av['team']}
- **Deal Value Target:** **{av['closing_deal']}**

## 2. Daily Reality & Inner Frustrations
{av['daily_reality']}

> **Core Pride:** *"{av['pride_point']}"*  
> **The 'Big Bad':** {av['big_bad']}  
> **Past Scars:** *"{av['past_scars']}"*

## 3. Symptoms & Emotional States
"""
        for sym, emo in av["symptoms"]:
            master_content += f"- **{sym}** → *Emotion: {emo}*\n"

        master_content += f"""
## 4. Trigger Vocabulary & Slang
- **MUST USE:** {', '.join([f'`{j}`' for j in av['jargon_use']])}
- **NEVER SAY:** {', '.join([f'~~{ja}~~' for ja in av['jargon_avoid']])}

## 5. Why Their Current Setup Is Bleeding Money
{av['flaw_breakdown']}

## 6. Outreach Battle Scripts
- **45s Phone Opener:** *"{av['phone_hook']}"*
- **35s Voice Note:** *"{av['wa_voice_hook']}"*
- **Email Subject:** `{av['email_subject']}`

## 7. Objection Busting
"""
        for obj, reb in av["objection_rebuttals"]:
            master_content += f"### Q: *\"{obj}\"*\n"
            master_content += f"> **A:** *\"{reb}\"*\n\n"

        master_content += "---\n"

    with open(MASTER_FILE, "w", encoding="utf-8") as f:
        f.write(master_content)
    print(f"Generated Master Dossier: {MASTER_FILE}")

def main():
    print("=" * 80)
    print("UNCODED HUB — CLIENT AVATAR GENERATION SYSTEM")
    print("Generating comprehensive psychological & tactical avatars for all 17 niches...")
    print("=" * 80)
    generate_individual_avatars()
    generate_master_dossier()
    print("=" * 80)
    print("ALL 17 AVATARS FULLY GENERATED!")
    print(f"Dossiers folder: {AVATARS_DIR}")
    print(f"Master Playbook: {MASTER_FILE}")
    print("=" * 80)

if __name__ == "__main__":
    main()
