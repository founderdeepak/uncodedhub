import os
import csv
from datetime import datetime, timedelta

output_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\geetha_120_instagram_campaign"
os.makedirs(output_dir, exist_ok=True)

start_date = datetime(2026, 10, 15)

# -------------------------------------------------------------
# SLOT 2: 02:00 PM - Quiet Luxury & Perception Psychology (30 Days)
# Columns: Day,Date,Slot_Time,Slot_Pill,Concept_Title,Core_Principle,Psychological_Insight,Application_For_Founders,Footer
# -------------------------------------------------------------
slot2_quiet_luxury = [
    # Day 1
    ("THE CODE OF VISUAL SILENCE",
     "Loud Brands Sell Commodities. Silent Brands Command Fortunes.",
     "Mass-market brands scream with starbursts and urgency badges because they fear being overlooked. True luxury operates like an exclusive private club: minimal signage, generous white space, and quiet self-assurance.",
     "Strip every non-essential badge and floating popup from your site. Let generous negative space signal institutional strength.",
     "@geetha.designs • uncodedhub.com"),
    # Day 2
    ("THE AMAN RESORT PARADOX",
     "Why High-Net-Worth Buyers Gravitate Toward Understated Design",
     "Aman Resorts never posts discounted package deals. Their digital presence features unhurried photography, muted earth tones, and tranquil layouts. The lack of commercial aggression induces immediate subconscious trust.",
     "Replace salesy countdown timers with serene, editorial case studies that allow your work to speak for itself.",
     "@geetha.designs • uncodedhub.com"),
    # Day 3
    ("UNBRANDED CONFIDENCE",
     "The Psychology of Tiny, Subtle Logos",
     "Luxury fashion houses like The Row and Loro Piana rarely display prominent logos. Prominent branding is for mass aspiration; subtle branding is for those who already belong.",
     "Reduce your logo size by 30% in the header navigation. When your work is exceptional, you don't need a massive billboard to prove you exist.",
     "@geetha.designs • uncodedhub.com"),
    # Day 4
    ("THE ILLUSION OF SCARCITY",
     "How Visual Restraint Protects Your Pricing Power",
     "Listing 45 different service packages makes your firm look like a frantic utility catalog. True specialists showcase 2 or 3 signature mandates with uncompromising selectivity.",
     "Condense your offerings into three clearly defined, high-ticket engagements. Selectivity signals immense market demand.",
     "@geetha.designs • uncodedhub.com"),
    # Day 5
    ("THE COGNITIVE COMFORT OF SYMMETRY",
     "Why Orderly Layouts Reduce Buyer Anxiety",
     "When an executive visits a website during a stressful workday, visual disorder spikes their cortisol. Balanced visual proportions and strict grid alignment create instant optical calm.",
     "Align all page elements to a strict 8-point layout grid. Visual order is subconsciously interpreted as operational reliability.",
     "@geetha.designs • uncodedhub.com"),
    # Day 6
    ("THE PERCEIVED VALUE OF MATERIAL TEXTURE",
     "Bringing Physical Craftsmanship Into the Digital Realm",
     "Flat, generic vector graphics feel disposable. Luxury brands photograph tactile textures: hand-spun raw linen, brushed aged brass, fluted oak, and chiseled stone.",
     "Incorporate macro photography of your actual materials and tools. Tactile depth elevates digital interfaces into sensory experiences.",
     "@geetha.designs • uncodedhub.com"),
    # Day 7
    ("THE LUXURY OF BEING HARD TO REACH",
     "Why Instant Calendly Links Can Hurt High-End Positioning",
     "Publicly displaying an open calendar with 30 available slots signals an empty pipeline. Luxury advisors and bespoke architects require an introductory qualification brief before granting access.",
     "Replace open calendar booking with a refined private consultation request form that protects your calendar and builds anticipation.",
     "@geetha.designs • uncodedhub.com"),
    # Day 8
    ("THE ART OF THE UNHURRIED HEADLINE",
     "Why Confident Brands Speak in Short, Measured Sentences",
     "Desperate websites pack 40 buzzwords into their hero headline. Elite studios state their premise in 5 to 7 words, allowing the typography to command the canvas.",
     "Edit your homepage hero headline down to one undeniable statement of truth. Brevity is the hallmark of genuine mastery.",
     "@geetha.designs • uncodedhub.com"),
    # Day 9
    ("THE PATINA OF PROVENANCE",
     "Communicating Heritage in Modern Digital Spaces",
     "Patek Philippe doesn't just sell timepieces; they sell multi-generational stewardship. High-ticket service providers must frame their methodology as an enduring philosophy, not a quick service.",
     "Feature your design ethos and standard operating principles on your homepage. Prove that your standards are rooted in timeless craft.",
     "@geetha.designs • uncodedhub.com"),
    # Day 10
    ("OPTICAL CONTRAST & DIGNITY",
     "Why Harsh Pure Black (#000000) Feels Cheap Compared to Deep Charcoal",
     "Pure black on pure white creates severe optical vibration that tires the human eye. Deep obsidian (#0D0C0A) on cashmere (#FBF9F5) feels warm, organic, and editorial.",
     "Softened dark tones mimic ink on archival paper. Fine adjustments to color temperature dramatically enhance luxury perception.",
     "@geetha.designs • uncodedhub.com"),
    # Day 11
    ("THE CURATOR’S EYE",
     "Why Showing Less Work Makes You Look 10x More Capable",
     "An endless gallery of 50 projects looks like a student portfolio dump. True masters display only their top 4 flagship case studies, treated like curated museum monographs.",
     "Remove 70% of your portfolio images. Showcase only the engagements that represent the caliber of clients you want next.",
     "@geetha.designs • uncodedhub.com"),
    # Day 12
    ("THE SUBTLETY OF MICRO-SPACING",
     "How a 12px Margin Shift Changes Buyer Perception",
     "When text clings too tightly to image borders, the page feels cramped and budget-constrained. Expanding internal padding creates an aura of effortless elegance.",
     "Audit your layout cards: increase padding by 40%. Generous internal space makes every element feel deliberate and high-end.",
     "@geetha.designs • uncodedhub.com"),
    # Day 13
    ("THE MONOCHROMATIC DISCIPLINE",
     "Why Too Many Accent Colors Ruin Luxury Authority",
     "Color overload confuses the brain's ocular hierarchy. The most enduring luxury brands restrict themselves to a single signature accent color applied with surgical restraint.",
     "Pick one signature brand accent (such as brushed brass, velvet emerald, or deep raspberry) and reserve it solely for primary focal points.",
     "@geetha.designs • uncodedhub.com"),
    # Day 14
    ("THE PSYCHOLOGY OF THE COLOURED BACKDROP",
     "Using Cashmere and Warm Bone to Warm Digital Screens",
     "Sterile stark-white screens feel clinical and impersonal. Warm cashmere backdrops (#FBF9F5) evoke physical art paper, creating an inviting, tactile digital atmosphere.",
     "Transition your primary canvas background from cold pure white (#FFFFFF) to warm architectural parchment.",
     "@geetha.designs • uncodedhub.com"),
    # Day 15
    ("THE 'NO-DISCOUNT' SIGNALLING SYSTEM",
     "How Design Aesthetics Pre-empt Price Negotiations",
     "When your digital presentation looks like a high-end publication, prospects arrive at your discovery call already expecting a premium investment.",
     "Elite typography and layout discipline eliminate the urge to haggle before contract terms are even discussed.",
     "@geetha.designs • uncodedhub.com"),
    # Day 16
    ("THE ARCHITECTURAL PROPORTION",
     "Applying the Golden Ratio to Digital Grid Layouts",
     "For centuries, classical architects used proportional ratios to evoke awe and permanence. When web layouts adopt these ratios, visitors experience subconscious optical harmony.",
     "Structure your page sections using the 1:1.618 ratio between primary visual content and supporting editorial copy.",
     "@geetha.designs • uncodedhub.com"),
    # Day 17
    ("AUTHENTIC IMPERFECTION",
     "Why Raw Film Grain and Textures Beat Plastic Vector Polish",
     "Over-processed vector illustrations look like generic tech corporate art. Natural film grain, hand-drawn schematics, and candid photography communicate authentic human soul.",
     "Incorporate subtle hand-sketched process diagrams and real site photography to highlight genuine artisanal dedication.",
     "@geetha.designs • uncodedhub.com"),
    # Day 18
    ("THE VALUE OF THE UNWRITTEN WORD",
     "Why What You Leave Out Defines What You Charge",
     "Amateur service firms write 2,000 words explaining every granular step of their process. Luxury firms convey supreme competence through editorial conciseness.",
     "Cut your website copy in half. Confident specialists summarize complex processes into clear, decisive phases.",
     "@geetha.designs • uncodedhub.com"),
    # Day 19
    ("THE SENSORY PACING OF SCROLLING",
     "Treating the Webpage as an Architectural Promenade",
     "Walking through an Aman hotel is an intentional sensory sequence of courtyards, shadows, and vistas. A website should guide the user's thumb with the same graceful cadence.",
     "Pace your sections with intentional rhythm: an impactful hero, followed by spacious whitespace, leading smoothly into focused case studies.",
     "@geetha.designs • uncodedhub.com"),
    # Day 20
    ("THE POWER OF EDITORIAL CREDENTIALS",
     "Positioning Awards and Press with Dignified Understatement",
     "Plastering 15 full-color media badges across the top fold looks needy. Luxury brands mention press coverage in small, monochromatic typography at the base of the page.",
     "Render all press mentions in muted monochromatic slate. Dignified placement signals that recognition is a standard byproduct of your excellence.",
     "@geetha.designs • uncodedhub.com"),
    # Day 21
    ("THE 'NEVER-EXPLAIN' PRINCIPLE",
     "Confidence Never Pleads for Validation",
     "Phrases like 'We are passionate about design' or 'We always put clients first' are empty platitudes. Luxury brands never describe their integrity—they demonstrate it through visual proof.",
     "Replace emotional self-descriptions with concrete, verifiable project outcomes and high-resolution visual evidence.",
     "@geetha.designs • uncodedhub.com"),
    # Day 22
    ("THE BEAUTY OF INVISIBLE NAVIGATION",
     "Letting Content Take Center Stage Without Visual Clutter",
     "Sticky navigation bars with heavy drop shadows and 10 dropdown menus constantly obstruct the reading experience. Modern luxury navigation remains quiet, light, and unobtrusive.",
     "Use a slim, semi-transparent navigation bar with a subtle border. Navigation should support the work, never distract from it.",
     "@geetha.designs • uncodedhub.com"),
    # Day 23
    ("THE DARK LUXURY STATEMENT",
     "When Deep Obsidian (#0D0C0A) Commands Complete Authority",
     "In nocturnal settings or avant-garde design niches, dark editorial themes evoke the intimacy of a luxury private lounge or a twilight gallery exhibition.",
     "If your brand serves avant-garde architects, private nightlife, or ultra-luxury collectors, embrace a deeply tailored obsidian palette.",
     "@geetha.designs • uncodedhub.com"),
    # Day 24
    ("THE DIGNIFIED FAQ SECTION",
     "Answering Tough Buyer Questions with Executive Poise",
     "Most FAQs read like defensive excuses. A high-ticket FAQ should read like an executive briefing: addressing budget parameters, timeline non-negotiables, and mutual fit.",
     "Style your FAQ with clean accordion dividers and unapologetic, transparent answers regarding investment and timelines.",
     "@geetha.designs • uncodedhub.com"),
    # Day 25
    ("THE ART OF THE ANNOTATED SPECIFICATION",
     "Why Technical Details Enhance Luxury Perception",
     "Patek Philippe highlights micro-mechanical tolerances in microns. Highlighting your exacting technical standards (e.g. sub-second load times, bespoke joinery) proves your fee is justified.",
     "Add subtle technical annotations to your case study images detailing materials, dimensions, and engineering parameters.",
     "@geetha.designs • uncodedhub.com"),
    # Day 26
    ("THE PSYCHOLOGY OF EXCLUSIVE ACCESS",
     "Creating VIP Client Portals That Validate the Investment",
     "When high-paying clients log in to review deliverables, they shouldn't be handed a messy Google Drive folder. A branded, private client portal reinforces luxury service at every touchpoint.",
     "Design a private digital client portal for active projects. White-glove presentation during delivery ensures referrals and repeat retainers.",
     "@geetha.designs • uncodedhub.com"),
    # Day 27
    ("THE 'NO JARGON' RULE OF AUTHORITY",
     "Why Complex Words Reveal Insecurity in Design",
     "Inexperienced agencies hide behind terms like 'synergistic paradigm transformations.' True masters explain complex architectural and design concepts in plain, evocative English.",
     "Strip every corporate buzzword from your digital copy. Clarity is the ultimate luxury.",
     "@geetha.designs • uncodedhub.com"),
    # Day 28
    ("THE BALANCE OF WARMTH AND RIGOR",
     "How to Look Prestigious Without Looking Cold",
     "Hyper-minimalist design can sometimes feel sterile and unapproachable. Pairing strict structural grids with warm photography and true italic typography adds human warmth.",
     "Soften rigorous geometric layouts with warm natural lighting in photography and thoughtful, human editorial copywriting.",
     "@geetha.designs • uncodedhub.com"),
    # Day 29
    ("THE RESTRAINT OF INTERACTION DESIGN",
     "Why Micro-Animations Should Whisper, Not Dance",
     "Excessive bouncing buttons and parallax spin tricks make a website look like a carnival game. Luxury micro-interactions operate at sub-second speeds with natural physical friction.",
     "Restrict UI animations to subtle 200ms opacity fades and smooth transitions. Motion should feel like heavy velvet drapery.",
     "@geetha.designs • uncodedhub.com"),
    # Day 30
    ("THE ENDURING STANDARD",
     "Designing for Decades Rather Than Chasing Fleeting Trends",
     "Chasing annual design fads guarantees your website will look outdated in 18 months. Grounding your digital presence in timeless typography and classical balance ensures permanent relevance.",
     "Build your digital assets on timeless typographic foundations and disciplined spatial harmony. True luxury never goes out of style.",
     "@geetha.designs • uncodedhub.com"),
]

# -------------------------------------------------------------
# SLOT 4: 08:00 PM - High-Ticket Conversion Architecture (30 Days)
# Columns: Day,Date,Slot_Time,Slot_Pill,Framework_Name,Strategic_Objective,Architectural_Execution,Action_Step_CTA,Footer
# -------------------------------------------------------------
slot4_conversion_arch = [
    # Day 1
    ("THE PRIVATE CONSULTATION FUNNEL",
     "Eliminating Buyer Resistance on ₹10L+ Service Engagements",
     "Replace generic 'Contact Us' forms with a structured 3-part inquiry protocol: Current Project Scope -> Timeline Parameters -> Schedule Private Discovery.",
     "Comment 'FUNNEL' to receive our High-Ticket Private Consultation Blueprint.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 2
    ("THE 4-FOLD EDITORIAL CASE STUDY",
     "Transforming Portfolio Snapshots Into Deal-Closing Proof",
     "Structure every project into an editorial narrative: The Architectural Brief -> The Structural Friction -> The Bespoke Execution -> The Living Outcome.",
     "Comment 'CASESTUDY' for our 4-Fold High-Converting Project Layout.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 3
    ("THE 3-FIELD HIGH-TICKET FORM",
     "Slashing Inquiry Abandonment by 60% on Mobile",
     "High-net-worth clients won't fill out 14 form fields on an iPhone. Request only: Name, WhatsApp/Direct Phone, and Project Vision. Detailed discovery belongs on the call.",
     "Comment 'FORM' for our High-Ticket Mobile Inquiry Optimization Guide.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 4
    ("THE DE-RISKING PERFORMANCE GUARANTEE",
     "Framing Your Accountability as a Core Selling Feature",
     "Elevate your operational commitment (such as Uncoded Hub's 7-Day Sprint Guarantee) from fine print into a prominent, beautifully styled credibility badge.",
     "Comment 'GUARANTEE' to see how to visually present high-stakes service guarantees.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 5
    ("THE PRIVATE VIP CLIENT ONBOARDING PORTAL",
     "Turning Delivery Into Your #1 Source of Referrals",
     "Handing clients deliverables via messy WhatsApp threads damages credibility. Deliver work through a private, branded web dashboard with real-time milestones.",
     "Comment 'PORTAL' for our VIP Client Presentation Portal Wireframe.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 6
    ("THE CLIENT SELF-QUALIFICATION MATRIX",
     "Filtering Out Low-Budget Bargain Hunters Automatically",
     "Include an explicit 'Who We Are Built For / Who We Are Not For' comparison grid. It deters unqualified price-shoppers while reassuring elite buyers.",
     "Comment 'FILTER' for our High-Ticket Client Qualification Matrix.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 7
    ("THE HERO CONVERSION ANCHOR",
     "Directing 100% of Visitor Attention Toward One Action",
     "Websites with 4 competing buttons cause decision paralysis. Anchor your hero section with one clear, primary interactive trigger set in high-contrast typography.",
     "Comment 'HERO' and I'll audit the conversion anchor of your current first-fold.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 8
    ("THE PROPRIETARY METHODOLOGY BLUEPRINT",
     "Why Named Frameworks Eliminate Price Resistance",
     "When your process is presented as an engineered 4-step system (e.g. Audit -> Architecture -> Sprint Delivery -> Handover), clients stop questioning your pricing.",
     "Comment 'BLUEPRINT' for our 4-Step Methodology Architecture Template.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 9
    ("THE SUB-SECOND MOBILE SPEED MULTIPLIER",
     "How Page Speed Directly Drives High-Ticket Lead Volume",
     "Mobile bounce rates double when page load exceeds 3 seconds. Custom edge-rendered code loading in under 500ms captures high-net-worth buyers in real time.",
     "Comment 'SPEED' to receive our Mobile Speed Optimization Benchmark Report.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 10
    ("THE 'BEFORE & AFTER' VALUE PRESENTATION",
     "Visualizing Client Transformation Without Clutter",
     "Use interactive split-screens or clean side-by-side metric cards to demonstrate the exact transformation you deliver for high-value clients.",
     "Comment 'TRANSFORM' for our High-Impact Transformation Card Layout.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 11
    ("THE STICKY MOBILE CONVERSION BAR",
     "Capturing Leads Without Obstructing the Reading Experience",
     "A discreet, thumb-friendly sticky action bar at the base of mobile screens ensures the next step is always one tap away as clients read case studies.",
     "Comment 'STICKY' for our Mobile Persistent Conversion Bar Specifications.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 12
    ("THE EXECUTIVE CREDENTIALS STRIP",
     "Designing High-Trust Social Proof Without Visual Chaos",
     "Present partner backgrounds, publications, and landmark achievements in a clean, monochromatic tabular layout that reinforces quiet authority.",
     "Comment 'PROOF' for our Monochromatic Social Proof Display System.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 13
    ("THE WHATSAPP VIP CONCIERGE FUNNEL",
     "Frictionless Direct Booking for High-Net-Worth Decision Makers",
     "Many busy executives prefer messaging over filling forms. A discreet WhatsApp concierge trigger with pre-filled context accelerates deal velocity by 3x.",
     "Comment 'WHATSAPP' for our Executive Direct Messaging Architecture.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 14
    ("THE DIGNIFIED INVESTMENT TRANSPARENCY CARD",
     "Setting Clear Pricing Expectations Without E-Commerce Gimmicks",
     "Display starting investment tiers with clean typography, detailed scope parameters, and transparent deliverables to eliminate budget friction early.",
     "Comment 'PRICING' for our High-Ticket Investment Tier Presentation Blueprint.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 15
    ("THE ARCHITECTURAL PROPOSAL PORTAL",
     "Replacing Clunky PDF Decks with Interactive Digital Proposals",
     "Deliver project proposals as private, interactive web experiences with embedded visual mockups, scope toggles, and seamless digital approval.",
     "Comment 'PROPOSAL' for our Digital Client Proposal Wireframe.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 16
    ("THE 5-SECOND MOBILE CLARITY TEST",
     "Diagnosing Why First-Time Visitors Leave Without Inquiring",
     "If a first-time mobile visitor cannot identify who you are, what you build, and your proof in 5 seconds, your conversion funnel is broken.",
     "Comment 'TEST' and I will run a 5-second mobile hierarchy diagnostic on your site.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 17
    ("THE RESTRAINT OF CALL-TO-ACTION COPY",
     "Replacing Demanding Words with Executive Deference",
     "Swap aggressive verbs like 'Buy Now' or 'Submit' for refined invitations: 'Request Private Portfolio Review' or 'Schedule Studio Consultation.'",
     "Comment 'COPY' for our High-Ticket Micro-Copy Conversion Cheat Sheet.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 18
    ("THE TESTIMONIAL ATTRIBUTION STANDARD",
     "Maximizing Believability on Client Endorsements",
     "Anchor every testimonial with verified executive titles, project scope metrics, and authentic high-resolution photography. Vague quotes damage trust.",
     "Comment 'ENDORSE' for our High-Credibility Testimonial Card Framework.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 19
    ("THE VIP INTAKE CONFIRMATION PAGE",
     "Building Anticipation Immediately After Form Submission",
     "Redirect prospects to a custom confirmation experience detailing what happens during the next 4 hours, what to prepare, and team credentials.",
     "Comment 'ONBOARD' for our High-Trust VIP Intake Confirmation Layout.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 20
    ("THE INTERACTIVE SCOPE ESTIMATOR",
     "Engaging Serious Buyers with Interactive Cost Transparency",
     "Allow prospects to configure their project scope interactively (e.g. square footage, design tier) to self-qualify their investment appetite.",
     "Comment 'ESTIMATOR' for our Bespoke Project Scope Calculator Layout.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 21
    ("THE ACCORDION FAQ DE-RISKING MATRIX",
     "Resolving Critical Buyer Objections Before the Discovery Call",
     "Structure FAQs around timeline control, revision policies, and IP ownership so prospects enter sales conversations with complete peace of mind.",
     "Comment 'OBJECTION' for our High-Ticket Objection Resolution Template.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 22
    ("THE FOUNDER EDITORIAL STATEMENT",
     "Connecting With Prospects Through Leadership Philosophy",
     "A 3-paragraph letter from the design director explaining the firm's non-negotiable standards builds deeper connection than any corporate mission statement.",
     "Comment 'FOUNDER' for our Design Director Executive Bio Framework.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 23
    ("THE SINGLE-PAGE CONVERSION ARCHITECTURE",
     "Why Focused Single-Page Landers Outperform 20-Page Mazes",
     "For specific campaign pushes, a tightly orchestrated single-page narrative converts at 3x the rate of a complex corporate website.",
     "Comment 'LANDER' for our High-Ticket Single-Page Conversion Wireframe.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 24
    ("THE MATERIAL SPECIFICATION SHOWCASE",
     "Proving Superior Craft Through Granular Details",
     "Presenting exact technical specifications (joinery tolerances, lighting lux levels, code benchmarks) proves your service belongs in the top 1%.",
     "Comment 'SPECS' for our Architectural Specification Presentation Layout.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 25
    ("THE DIGNIFIED EXIT CONVERSION TRIGGER",
     "Capturing Departing Visitors Without Obnoxious Popups",
     "Instead of flashing modal overlays, offer an unobtrusive, high-value editorial guide (such as an Architectural Investment Checklist) in the footer.",
     "Comment 'ASSET' for our High-Value Lead Magnet Delivery System.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 26
    ("THE 'INVITATION ONLY' WAITLIST SYSTEM",
     "Leveraging Capacity Constraints to Drive Urgent Action",
     "When your studio operates on strict client intake quotas, displaying available quarterly onboarding slots creates ethical, authentic urgency.",
     "Comment 'WAITLIST' for our Studio Capacity Display Framework.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 27
    ("THE OMNI-CHANNEL CONSISTENCY AUDIT",
     "Aligning Your Instagram Grid with Your Web Presentation",
     "If your Instagram looks like Vogue but your website looks like a WordPress template, high-ticket trust instantly evaporates at the URL transition.",
     "Comment 'ALIGN' and I will audit your brand consistency across social and web.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 28
    ("THE CLIENT RE-ENGAGEMENT MONOGRAPH",
     "Retaining High-Value Retainers Long After Initial Delivery",
     "Keep past clients engaged with quarterly private design trend monographs and architectural updates that position your firm as an enduring advisor.",
     "Comment 'RETAIN' for our High-Ticket Client Lifecycle Retention Strategy.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 29
    ("THE METRIC-DRIVEN PORTFOLIO TEARDOWN",
     "Quantifying Aesthetic Impact on Client Revenue",
     "Frame design improvements in tangible business metrics: increased lead velocity, elevated average order value, and higher closing rates.",
     "Comment 'METRICS' for our ROI-Driven Design Case Study Template.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 30
    ("THE SEAMLESS DISCOVERY CALL ENGINE",
     "Crafting the Perfect Bridge from Web Traffic to Paid Client",
     "The complete conversion sequence: Targeted Aesthetic -> Frictionless Qualification -> Private Concierge Confirmation -> High-Closing Discovery Call.",
     "Comment 'ENGINE' to review our complete High-Ticket Client Acquisition Protocol.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
]

# Write Slot 2 (Quiet Luxury)
slot2_path = os.path.join(output_dir, "02_slot_02pm_quiet_luxury_psychology_30.csv")
with open(slot2_path, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["Day", "Date", "Slot_Time", "Slot_Pill", "Concept_Title", "Core_Principle", "Psychological_Insight", "Application_For_Founders", "Footer"])
    for i, row in enumerate(slot2_quiet_luxury, 1):
        dt = (start_date + timedelta(days=i-1)).strftime("%Y-%m-%d")
        pill = "QUIET LUXURY // 02:00 PM"
        writer.writerow([i, dt, "14:00", pill, row[0], row[1], row[2], row[3], row[4]])

# Write Slot 4 (Conversion Architecture)
slot4_path = os.path.join(output_dir, "04_slot_08pm_conversion_architecture_30.csv")
with open(slot4_path, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["Day", "Date", "Slot_Time", "Slot_Pill", "Framework_Name", "Strategic_Objective", "Architectural_Execution", "Action_Step_CTA", "Footer"])
    for i, row in enumerate(slot4_conversion_arch, 1):
        dt = (start_date + timedelta(days=i-1)).strftime("%Y-%m-%d")
        pill = "CONVERSION ARCHITECTURE // 08:00 PM"
        writer.writerow([i, dt, "20:00", pill, row[0], row[1], row[2], row[3], row[4]])

# Remove the old unwanted CSV files if they exist
old_files = [
    os.path.join(output_dir, "02_slot_02pm_visual_teardown_30.csv"),
    os.path.join(output_dir, "04_slot_08pm_mckinsey_design_notes_30.csv")
]
for of in old_files:
    if os.path.exists(of):
        os.remove(of)
        print(f"Removed deprecated file: {of}")

# Regenerate master Zernio schedule
zernio_template = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\deepak_180_instagram_campaign\master_deepak_180_zernio_schedule.csv"
with open(zernio_template, "r", encoding="utf-8-sig") as f:
    headers = next(csv.reader(f))

# Read the 4 current slot CSVs
slot1_file = os.path.join(output_dir, "01_slot_10am_editorial_typography_30.csv")
slot2_file = slot2_path
slot3_file = os.path.join(output_dir, "03_slot_06pm_luxury_palette_spatial_30.csv")
slot4_file = slot4_path

with open(slot1_file, "r", encoding="utf-8-sig") as f: s1_data = list(csv.DictReader(f))
with open(slot2_file, "r", encoding="utf-8-sig") as f: s2_data = list(csv.DictReader(f))
with open(slot3_file, "r", encoding="utf-8-sig") as f: s3_data = list(csv.DictReader(f))
with open(slot4_file, "r", encoding="utf-8-sig") as f: s4_data = list(csv.DictReader(f))

profile_id = "6ac91e8c0b80c7bfcba45e7a"
zernio_rows = []

for i in range(30):
    day_num = i + 1
    
    # Slot 1: 10:00 AM Typography
    r1 = s1_data[i]
    c1 = f"[{r1['Slot_Pill']}]\n\n{r1['Rule_Header']}: {r1['Core_Headline']}\n\n{r1['Diagnostic_Body']}\n\nGolden Takeaway:\n{r1['Golden_Takeaway']}\n\n#TypographyDesign #VisualHierarchy #EditorialDesign #LuxuryBranding #UncodedHub"
    time1 = f"{r1['Date']} 10:00"
    img1 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_10AM_Typography.png"
    row1 = ["" for _ in headers]
    row1[0], row1[1], row1[2], row1[3], row1[16], row1[17] = c1, "instagram,facebook", profile_id, time1, "Asia/Kolkata", img1
    zernio_rows.append(row1)

    # Slot 2: 14:00 (02:00 PM) Quiet Luxury
    r2 = s2_data[i]
    c2 = f"[{r2['Slot_Pill']}]\n\n{r2['Concept_Title']}\n\nCore Principle:\n{r2['Core_Principle']}\n\nPsychological Insight:\n{r2['Psychological_Insight']}\n\nApplication for Founders:\n{r2['Application_For_Founders']}\n\n#QuietLuxury #DesignPsychology #HighTicketBranding #MinimalistAesthetics #UncodedHub"
    time2 = f"{r2['Date']} 14:00"
    img2 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_02PM_QuietLuxury.png"
    row2 = ["" for _ in headers]
    row2[0], row2[1], row2[2], row2[3], row2[16], row2[17] = c2, "instagram,facebook", profile_id, time2, "Asia/Kolkata", img2
    zernio_rows.append(row2)

    # Slot 3: 18:00 (06:00 PM) Color Palette & Spatial
    r3 = s3_data[i]
    c3 = f"[{r3['Slot_Pill']}]\n\n{r3['Palette_Name']}\n\nColor Tokens:\n{r3['Color_Hex_Codes']}\n\nSpatial Distribution:\n{r3['Spatial_Ratio']}\n\nPsychological Effect:\n{r3['Psychological_Effect']}\n\nRecommended For:\n{r3['Best_For_Niche']}\n\n#ColorPalette #LuxuryAesthetics #DesignSystem #SpatialDesign #BrandIdentity"
    time3 = f"{r3['Date']} 18:00"
    img3 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_06PM_Palette.png"
    row3 = ["" for _ in headers]
    row3[0], row3[1], row3[2], row3[3], row3[16], row3[17] = c3, "instagram,facebook", profile_id, time3, "Asia/Kolkata", img3
    zernio_rows.append(row3)

    # Slot 4: 20:00 (08:00 PM) Conversion Architecture
    r4 = s4_data[i]
    c4 = f"[{r4['Slot_Pill']}]\n\n{r4['Framework_Name']}\n\nStrategic Objective:\n{r4['Strategic_Objective']}\n\nArchitectural Execution:\n{r4['Architectural_Execution']}\n\nAction Step:\n{r4['Action_Step_CTA']}\n\n#ConversionDesign #HighTicketSales #UXArchitecture #ClientAcquisition #GeethaDesigns"
    time4 = f"{r4['Date']} 20:00"
    img4 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_08PM_ConversionArch.png"
    row4 = ["" for _ in headers]
    row4[0], row4[1], row4[2], row4[3], row4[16], row4[17] = c4, "instagram,facebook", profile_id, time4, "Asia/Kolkata", img4
    zernio_rows.append(row4)

master_file = os.path.join(output_dir, "master_geetha_120_zernio_schedule.csv")
with open(master_file, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for r in zernio_rows:
        writer.writerow(r)

print(f"Successfully generated new Slot 2 & Slot 4 CSVs and rebuilt master Zernio schedule ({len(zernio_rows)} rows)!")
