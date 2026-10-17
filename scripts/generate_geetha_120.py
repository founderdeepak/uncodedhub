import os
import csv
from datetime import datetime, timedelta

output_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\geetha_120_instagram_campaign"
os.makedirs(output_dir, exist_ok=True)

start_date = datetime(2026, 10, 15)

# -------------------------------------------------------------
# SLOT 1: 10:00 AM - Editorial Typography & Visual Hierarchy (30 Days)
# Columns: Day,Date,Slot_Time,Slot_Pill,Rule_Header,Core_Headline,Diagnostic_Body,Golden_Takeaway,Footer
# -------------------------------------------------------------
slot1_data = [
    # Day 1
    ("RULE #01: THE 2-FONT CEILING",
     "Why Competing Fonts Destroy Luxury Credibility",
     "The fastest way to make a ₹50L architecture firm look like a ₹50k amateur is using 4 different fonts on your homepage. Never exceed 2 typefaces: one editorial serif for authority, one neutral geometric sans for reading.",
     "Typography is not decoration. It is the visual tone of your voice before you speak.",
     "@geetha.designs • uncodedhub.com"),
    # Day 2
    ("RULE #02: LINE-HEIGHT SUFFOCATION",
     "Tight Paragraphs Force High-Ticket Buyers to Bounce",
     "When body text line-height drops below 1.5, reading on mobile becomes visual manual labor. High-net-worth clients won't squint through cramped text—they close the tab in 3 seconds.",
     "Give your sentences room to breathe. Generous leading signals calm confidence.",
     "@geetha.designs • uncodedhub.com"),
    # Day 3
    ("RULE #03: THE TYPOGRAPHIC SCALE RATIO",
     "If Everything Shouts, Nothing Gets Heard",
     "When subheadings and body copy are nearly identical in size, the eye wanders without an anchor. High-converting executive design demands dramatic mathematical contrast: H1 (56px) -> H2 (32px) -> H3 (22px) -> Body (16px).",
     "Scale creates immediate hierarchy. Hierarchy dictates reading priority.",
     "@geetha.designs • uncodedhub.com"),
    # Day 4
    ("RULE #04: THE CURSE OF ALL-CAPS BODY TEXT",
     "Stop Shouting at High-Net-Worth Prospects",
     "ALL-CAPS sentences reduce reading speed by 38% because the eye loses recognizable letter ascenders and descenders. Reserve uppercase strictly for small 10-12px tracking pills and micro-kickers.",
     "Uppercase is for precision labels. Sentence case is for persuasion.",
     "@geetha.designs • uncodedhub.com"),
    # Day 5
    ("RULE #05: MAXIMUM MEASURE & LINE LENGTH",
     "Why Long Text Lines Kill Mobile Reading Flow",
     "The optimal line length for readability is 45 to 75 characters. When a line stretches across a wide desktop screen with 120 characters, the reader's eye gets lost tracking back to the next line.",
     "Constrain your text containers. Controlled reading width keeps attention locked.",
     "@geetha.designs • uncodedhub.com"),
    # Day 6
    ("RULE #06: CONTRAST RATIO RIGOR",
     "Low-Contrast Grey Text Is An Incompetence Signal",
     "Light grey text (#888888) on white backgrounds might look trendy on Dribbble, but it fails WCAG accessibility and frustrates mature decision-makers reading in direct sunlight.",
     "Luxury is never illegible. Enforce a minimum 7:1 contrast ratio on all core copy.",
     "@geetha.designs • uncodedhub.com"),
    # Day 7
    ("RULE #07: SERIF ANCHORS & SANS BODY",
     "The Editorial Pairing Used by Luxury Heritage Houses",
     "Pairing an evocative high-contrast serif (Fraunces or Playfair) with a hyper-clean sans-serif (Inter) creates instant boardroom gravitas. The serif delivers provenance; the sans delivers speed.",
     "Proven editorial pairing bridges centuries of craft with modern digital agility.",
     "@geetha.designs • uncodedhub.com"),
    # Day 8
    ("RULE #08: THE UNFORGIVABLE SCRIPT FONT",
     "Why Decorative Script Fonts Cheapen High-End Services",
     "Using ornate faux-calligraphy fonts for clinic or interior headers makes your firm look like a craft hobby shop. It signals amateur design templates bought for $19.",
     "If a client cannot read your headline in 400ms, your branding has failed.",
     "@geetha.designs • uncodedhub.com"),
    # Day 9
    ("RULE #09: TRACKING ON SUBTITLES",
     "Letter-Spacing on Small Headers Signals Intentionality",
     "Expanding tracking (letter-spacing: +0.08em) on small 12px uppercase category kickers creates immediate architectural order. It frames the content like a museum label.",
     "Letter-spacing small uppercase labels turns text into a precision badge.",
     "@geetha.designs • uncodedhub.com"),
    # Day 10
    ("RULE #10: VERTICAL RHYTHM IN SPACING",
     "Why Inconsistent Margins Cause Subconscious Anxiety",
     "When space above a heading is 40px and below is 15px, but the next section has 60px and 30px, the human brain registers cognitive disorder. Set an unbreakable 8px spacing grid across the entire page.",
     "Consistency in whitespace rhythm breeds subconscious trust before words register.",
     "@geetha.designs • uncodedhub.com"),
    # Day 11
    ("RULE #11: NUMBER VISUALIZATION IN TYPOGRAPHY",
     "Displaying Numbers with Monospace Precision",
     "When presenting metrics, pricing, or turnaround times, use tabular figures or a monospace accent. Numbers set in monospaced glyphs feel engineered, verified, and mathematically true.",
     "Tabular numbers convey institutional precision. Proportional numbers feel subjective.",
     "@geetha.designs • uncodedhub.com"),
    # Day 12
    ("RULE #12: THE ORPHAN WORD SIN",
     "Single Trailing Words Ruin Layout Symmetry",
     "A single word sitting on its own line at the end of a headline or paragraph creates an awkward visual gap that drags the eye down. Balance your headline breaks intentionally.",
     "Eliminate dangling orphans. Balanced paragraph blocks signal obsessive craftsmanship.",
     "@geetha.designs • uncodedhub.com"),
    # Day 13
    ("RULE #13: EMPHASIS RESTRAINT",
     "When You Bold Everything, Nothing Carries Weight",
     "Websites that bold every third word look like aggressive sales flyers. In executive design, bolding is reserved strictly for the core transformation phrase—never whole paragraphs.",
     "Bolding is a scalpel, not a paintbrush. Use it with surgical restraint.",
     "@geetha.designs • uncodedhub.com"),
    # Day 14
    ("RULE #14: HERO HEADLINE BREVITY",
     "The 7-Word Ceiling for Luxury First Impressions",
     "If your homepage hero headline is a 35-word run-on paragraph, the visitor's eye will skip it entirely. High-ticket authority is stated with supreme brevity: under 8 words, perfectly set.",
     "Brevity is the ultimate signal of confidence. Long explanations signal insecurity.",
     "@geetha.designs • uncodedhub.com"),
    # Day 15
    ("RULE #15: SYSTEM FONT FALLBACK SANITY",
     "The Hidden FOUT Glitch That Ruins First Visits",
     "When your custom serif takes 2 seconds to load, your visitor sees an unstyled Times New Roman flicker. Always subset your woff2 fonts and match fallback font metrics exactly.",
     "Invisible typography engineering prevents brand-destroying layout shifts.",
     "@geetha.designs • uncodedhub.com"),
    # Day 16
    ("RULE #16: CASE STUDY TITLING DISCIPLINE",
     "Transforming Boring Project Names Into Asset Titles",
     "Replacing 'Project Whitefield' with 'The ₹12Cr Whitefield Penthouse: Turnkey Materiality Teardown' commands 3x higher perceived competence before the client views the images.",
     "Contextual titling elevates a portfolio gallery into an institutional case study.",
     "@geetha.designs • uncodedhub.com"),
    # Day 17
    ("RULE #17: PULL QUOTE TYPOGRAPHIC ARCHITECTURE",
     "Testimonial Cards Must Look Like Architectural Inscriptions",
     "Standard quote marks look dated. Style pull-quotes in an enlarged, elegant serif with a subtle vertical hairline bar and author credentials set in clean tabular sans.",
     "A well-set pull-quote looks like a verified endorsement from an executive board.",
     "@geetha.designs • uncodedhub.com"),
    # Day 18
    ("RULE #18: THE 60-30-10 TYPOGRAPHY WEIGHT",
     "Balancing Regular, Medium, and SemiBold Across the Screen",
     "60% of your text should sit at regular weight (400), 30% at medium (500) for UI/labels, and 10% at bold/semibold (600) for focal hooks. Heavy weights across 50% of the screen feel suffocating.",
     "Weight contrast guides ocular navigation effortlessly down the conversion funnel.",
     "@geetha.designs • uncodedhub.com"),
    # Day 19
    ("RULE #19: PRICING CARD TYPOGRAPHIC HIERARCHY",
     "Why High-End Pricing Should Never Look Like an E-Commerce Tag",
     "Slashing a red price tag next to an inflated number screams discount warehouse. Elite services present investment parameters with quiet typography: structured tiers, exact inclusions, zero starbursts.",
     "Dignified pricing typography eliminates the urge to haggle.",
     "@geetha.designs • uncodedhub.com"),
    # Day 20
    ("RULE #20: THE MICRO-COPY PERFECTION TEST",
     "Form Field Labels and Button Copy Dictate Trust",
     "Replacing 'Submit' with 'Request Private Consultation' changes user psychology from feeling processed to feeling prioritized. Every micro-button copy must reflect executive deference.",
     "Micro-copy is where user friction either dissolves or converts into a lost lead.",
     "@geetha.designs • uncodedhub.com"),
    # Day 21
    ("RULE #21: MOBILE HEADER FONT BALANCING",
     "Why 48px Desktop Titles Break on iPhone Screens",
     "A title that looks commanding on a 27-inch monitor wraps into 5 awkward lines on an iPhone screen. Employ responsive fluid typography (clamp) so headlines never break into awkward fragments.",
     "Responsive typography ensures board-level visual poise on any pocket screen.",
     "@geetha.designs • uncodedhub.com"),
    # Day 22
    ("RULE #22: CAPITALIZATION DISCIPLINE ACROSS MENUS",
     "Inconsistent Navigation Capitalization Destroys Credibility",
     "Mixing 'About us', 'PORTFOLIO', and 'Contact Us' in the same navigation bar reveals sloppy attention to detail. Pick Title Case or Small Caps and lock it across all interactive chrome.",
     "Meticulous consistency across minor navigation points signals rigorous engineering.",
     "@geetha.designs • uncodedhub.com"),
    # Day 23
    ("RULE #23: THE BULLET POINT ELEVATION",
     "Standard Rounded Bullets Look Like 1998 Word Documents",
     "Replace standard browser bullets with delicate typographic dashes (—), custom micro-plus icons, or numbered tabular accents. It instantly modernizes your feature lists.",
     "Custom typographic list markers elevate simple bullet points into premium specifications.",
     "@geetha.designs • uncodedhub.com"),
    # Day 24
    ("RULE #24: THE SUBTLETY OF ITALICS",
     "Using True Italic Glyphs for Emotional Nuance",
     "Slanted faux-italics generated by browsers look distorted. Use fonts with designed true italics to highlight a single word of philosophy or quiet provenance.",
     "True italics add editorial warmth and intellectual texture to cold commercial copy.",
     "@geetha.designs • uncodedhub.com"),
    # Day 25
    ("RULE #25: HERO SUBTITLE PACING",
     "The 1.8 Line-Height Subtitle That Keeps Visitors Reading",
     "Your hero subtitle must be set at exactly 18-20px with 1.7 to 1.8 line-height. This creates a relaxed reading rhythm that guides the user directly into your primary proof point.",
     "A relaxed subtitle rhythm lowers cognitive resistance and keeps the thumb scrolling.",
     "@geetha.designs • uncodedhub.com"),
    # Day 26
    ("RULE #26: STATISTIC HIGHLIGHT SCALING",
     "Pairing Big Numbers with Micro-Labels",
     "When showcasing '₹45Cr' or '99.4%', scale the number to 64px in a bold serif and pair it with a 12px uppercase muted label below. The scale differential creates instant visual impact.",
     "Dramatic scale contrast between metrics and labels makes proof undeniable.",
     "@geetha.designs • uncodedhub.com"),
    # Day 27
    ("RULE #27: FOOTER TYPOGRAPHIC POISE",
     "The Final Scroll Must Look Like an Architectural Colophon",
     "Most footers are cluttered link dumps. Style your footer like an architectural monograph: discreet legal lines, quiet navigation columns, and a clean brand hallmark.",
     "A serene footer leaves the visitor with a lingering impression of institutional permanence.",
     "@geetha.designs • uncodedhub.com"),
    # Day 28
    ("RULE #28: AVOIDING CENTER-ALIGNED BODY TEXT",
     "Why Centered Long Copy Is A Visual Disaster",
     "Centering more than 3 lines of body text forces the reader's eye to hunt for a different starting point on every single line. Keep body text left-aligned with a hard, disciplined margin.",
     "Left alignment provides a rigid ocular anchor. Centered text creates reading fatigue.",
     "@geetha.designs • uncodedhub.com"),
    # Day 29
    ("RULE #29: TYPOGRAPHIC COLOR HARMONY",
     "Never Use Pure Black (#000000) on Pure White",
     "Pure black text on pure white creates harsh optical vibration. Use deep charcoal (#1A1917 or #141413) on warm off-white (#FBF9F5). It softens optical strain and feels luxurious.",
     "Editorial charcoal on warm bone is the signature palette of museum monographs.",
     "@geetha.designs • uncodedhub.com"),
    # Day 30
    ("RULE #30: THE ULTIMATE TYPOGRAPHIC LAW",
     "Design Is Complete Not When There Is Nothing More to Add",
     "Elite visual design is achieved when you can remove nothing further without compromising the message. Strip away every redundant font, drop shadow, and decorative line.",
     "Purity is the highest form of sophistication. Eliminate until only authority remains.",
     "@geetha.designs • uncodedhub.com"),
]

# -------------------------------------------------------------
# SLOT 2: 02:00 PM - Visual Teardown: Commodity Clutter vs Luxury Restraint (30 Days)
# Columns: Day,Date,Slot_Time,Slot_Pill,Niche_Target,Commodity_Mistake,Luxury_Standard,Pricing_Impact,Footer
# -------------------------------------------------------------
slot2_data = [
    # Day 1
    ("NICHE: HIGH-END INTERIOR ARCHITECTS",
     "6 small project photos crammed into a rotating carousel with 4 competing buttons.",
     "1 dominant full-bleed photograph of a flagship penthouse, 70% white space, 1 single CTA.",
     "Firm A gets haggled down on ₹3L design fees. Firm B commands ₹45L turnkey contracts.",
     "@geetha.designs • uncodedhub.com"),
    # Day 2
    ("NICHE: BOUTIQUE DENTAL & AESTHETIC CLINICS",
     "Smiling stock models with neon cyan banners screaming '20% OFF INVISALIGN THIS WEEK!'",
     "Architectural clinic photography, subdued medical credentials, serene consultation booking.",
     "Clinic A attracts price shoppers asking for discounts. Clinic B books ₹4L smile rehabilitations.",
     "@geetha.designs • uncodedhub.com"),
    # Day 3
    ("NICHE: LUXURY REAL ESTATE DEVELOPERS",
     "Cluttered PDF brochure downloads, flashing WhatsApp icons, unoptimized 18MB images.",
     "Curated digital monograph, floor plan interactivity, private VIP walkthrough request.",
     "Developer A deals with cold leads. Developer B pre-sells ₹12Cr penthouses to discreet HNWIs.",
     "@geetha.designs • uncodedhub.com"),
    # Day 4
    ("NICHE: BESPOKE WEDDING CINEMATOGRAPHERS",
     "A grid of 24 YouTube embeds auto-playing simultaneously on a black background.",
     "3 signature films with museum-grade typography, production stills, and bespoke inquiry form.",
     "Studio A struggles to cross ₹1.5L per wedding. Studio B commands ₹18L destination packages.",
     "@geetha.designs • uncodedhub.com"),
    # Day 5
    ("NICHE: EXECUTIVE COACHES & MANAGEMENT CONSULTANTS",
     "14 bullet points of certifications, dense paragraphs, generic corporate stock graphics.",
     "Clear 1-sentence diagnostic provocation, verified client EBITDA outcomes, private strategy invite.",
     "Coach A sells ₹15k hour packs on LinkedIn. Coach B signs ₹25L annual advisory retainers.",
     "@geetha.designs • uncodedhub.com"),
    # Day 6
    ("NICHE: MODULAR KITCHEN & BESPOKE CABINETRY STUDIOS",
     "Catalog dump of 100 3D CAD renders with pricing tags and discount badges.",
     "Editorial material gallery: European veneer textures, brass hardware close-ups, German engineering details.",
     "Studio A sells commoditized ₹4L particleboard. Studio B delivers ₹35L bespoke architectural kitchens.",
     "@geetha.designs • uncodedhub.com"),
    # Day 7
    ("NICHE: WEALTH MANAGEMENT & MULTI-FAMILY OFFICES",
     "Generic stock photos of city skylines and graphs pointing up with generic jargon.",
     "Quiet, editorial typography, clear capital preservation frameworks, discreet partner profiles.",
     "Firm A fights for retail ₹20L SIP accounts. Firm B onboards ₹50Cr private family mandates.",
     "@geetha.designs • uncodedhub.com"),
    # Day 8
    ("NICHE: BESPOKE JEWELRY ATELIERS",
     "Cluttered e-commerce add-to-cart buttons with free shipping badges and countdown timers.",
     "Single high-contrast jewelry macro photograph, provenance storytelling, private appointment salon.",
     "Brand A competes with generic silver sellers. Brand B sells ₹15L custom heirloom bridal suites.",
     "@geetha.designs • uncodedhub.com"),
    # Day 9
    ("NICHE: LANDSCAPE & OUTDOOR ARCHITECTS",
     "Small thumbnails of gardens taken on mobile phones during cloudy afternoons.",
     "Golden-hour twilight estate photography, master site plan schematics, botanical philosophy.",
     "Contractor A bids ₹2L lawn mowing jobs. Firm B designs ₹60L resort estate landscapes.",
     "@geetha.designs • uncodedhub.com"),
    # Day 10
    ("NICHE: CORPORATE LITIGATION & INTELLECTUAL PROPERTY LAW",
     "Gavel graphics, scales of justice clip art, 20-paragraph legal disclaimers on homepage.",
     "Crisp executive portraiture, landmark matter summaries, razor-sharp partner bios.",
     "Lawyer A charges standard hourly rates. Firm B commands ₹50L enterprise retainer defenses.",
     "@geetha.designs • uncodedhub.com"),
    # Day 11
    ("NICHE: LUXURY HOSPITALITY & BOUTIQUE RETREATS",
     "Booking engine widgets covering the entire screen with rate comparison popups.",
     "Immersive spatial video hero, sensory property narrative, seamless suite reservation suite.",
     "Resort A competes with generic OTAs. Resort B commands ₹85k/night private pool villa bookings.",
     "@geetha.designs • uncodedhub.com"),
    # Day 12
    ("NICHE: BESPOKE ARTISANAL LIGHTING STUDIOS",
     "Specification tables and wireframe technical drawings on a stark white background.",
     "Dramatic chiaroscuro photography showing hand-blown glass glow in a dark luxury penthouse.",
     "Studio A sells ₹12k commercial fixtures. Studio B commissions ₹18L custom brass chandeliers.",
     "@geetha.designs • uncodedhub.com"),
    # Day 13
    ("NICHE: DERMATOLOGY & PLASTIC SURGERY ATELIERS",
     "Graphic before/after medical clinic photos in harsh fluorescent clinical lighting.",
     "High-fashion editorial aesthetic, patient privacy focus, board-certified surgical mastery.",
     "Clinic A gets price-shopped for minor injectables. Atelier B books ₹8L surgical procedures.",
     "@geetha.designs • uncodedhub.com"),
    # Day 14
    ("NICHE: LUXURY YACHT & CHARTER EXPEDITIONS",
     "Cluttered marine equipment lists, pricing per gallon of diesel, unstyled tables.",
     "Cinematic oceanic imagery, private bespoke itinerary routes, high-touch concierge onboarding.",
     "Charters struggle at ₹50k/hour. Luxury operator books ₹35L Mediterranean week expeditions.",
     "@geetha.designs • uncodedhub.com"),
    # Day 15
    ("NICHE: HIGH-END COMMERCIAL INTERIORS",
     "Standard photos of empty cubicles and generic office chair installations.",
     "Teardown of workplace productivity metrics, acoustic engineering proof, tech headquarters case studies.",
     "Contractor A bids ₹1,200/sq.ft fitting. Firm B wins ₹15Cr corporate campus transformations.",
     "@geetha.designs • uncodedhub.com"),
    # Day 16
    ("NICHE: CUSTOM TAILORING & SAVILE ROW CLOTHIERS",
     "E-commerce grid of 200 suits with size drop-downs and discount codes.",
     "Macro photography of Super 180s wool weaves, horn button details, private bespoke fitting diary.",
     "Shop A sells ₹15k off-the-rack suits. Master tailor commands ₹2.5L handmade three-piece garments.",
     "@geetha.designs • uncodedhub.com"),
    # Day 17
    ("NICHE: PRIVATE CHEF & LUXURY CATERING COLLECTIVES",
     "Buffet tray photos under yellow halogen banquet hall lighting.",
     "Plating macro photography, organic farm provenance, private 7-course tasting menu request.",
     "Caterer A quotes ₹800 per plate. Collective B commands ₹5L per private estate dinner.",
     "@geetha.designs • uncodedhub.com"),
    # Day 18
    ("NICHE: STRATEGIC BRAND DESIGN AGENCIES",
     "Dribbble mockup screenshots of logos on coffee cups and tote bags.",
     "Enterprise market share transformation case studies with verified client revenue growth data.",
     "Designer A sells ₹25k logo packs. Strategic firm commands ₹18L corporate identity retainers.",
     "@geetha.designs • uncodedhub.com"),
    # Day 19
    ("NICHE: BESPOKE FURNITURE ATELIERS",
     "Dimension drawings, warehouse assembly line shots, particle board options.",
     "Solid teak wood grain macro, hand-chiseled mortise-and-tenon joints, limited heirloom editions.",
     "Workshop sells ₹30k dining tables. Atelier delivers ₹6L hand-carved solid walnut collector tables.",
     "@geetha.designs • uncodedhub.com"),
    # Day 20
    ("NICHE: LUXURY CAR STORAGE & CONCIERGE FACILITIES",
     "Photos of concrete garage floors with fluorescent tube lights.",
     "Climate-controlled obsidian vault presentation, biometric security proof, white-glove logistics portal.",
     "Facility A charges ₹5k/month parking. Concierge vault secures ₹45k/month collector fleet mandates.",
     "@geetha.designs • uncodedhub.com"),
    # Day 21
    ("NICHE: HIGH-END EVENT & WEDDING DESIGNERS",
     "Crowded collages of flower arrangements with flash glare and watermark stamps.",
     "Spatial stage architecture blueprints, lighting simulation videos, VIP production case studies.",
     "Planner A competes on ₹5L budgets. Designer B commands ₹75L luxury destination wedding setups.",
     "@geetha.designs • uncodedhub.com"),
    # Day 22
    ("NICHE: PRIVATE PILATES & WELLNESS STUDIOS",
     "Crowded group class timetables, price cut coupons, noisy gym photos.",
     "Sanctuary aesthetic, individual reformer biomechanics, bespoke wellness assessment booking.",
     "Studio A sells ₹3k monthly memberships. Private studio books ₹45k/month one-on-one protocols.",
     "@geetha.designs • uncodedhub.com"),
    # Day 23
    ("NICHE: LUXURY ACOUSTIC & HOME CINEMA BUILDERS",
     "Specs of amplifiers and speaker cables with messy rack wiring photos.",
     "Acoustic paneling seamlessly integrated into luxury decor, 4K Dolby Atmos theater renders, VIP demo invite.",
     "Installer A quotes ₹2L standard home theaters. Specialist builds ₹30L private acoustic screening rooms.",
     "@geetha.designs • uncodedhub.com"),
    # Day 24
    ("NICHE: SUSTAINABLE LUXURY RESIDENCE BUILDERS",
     "Complex engineering diagrams of solar panels and septic tanks on white paper.",
     "Architectural harmony between rammed earth, raw stone, and Net-Zero carbon living proof.",
     "Builder A sells commodity green tech. Specialist signs ₹18Cr eco-luxury estate projects.",
     "@geetha.designs • uncodedhub.com"),
    # Day 25
    ("NICHE: BOUTIQUE WINERY & DISTILLERY ATELIERS",
     "Standard e-commerce checkout with discount promos on 6-bottle packs.",
     "Vineyard terroir monograph, limited barrel allocation reservations, private cellar club.",
     "Winery sells ₹1,200 supermarket bottles. Atelier pre-allocates ₹18,000 collector reserve cases.",
     "@geetha.designs • uncodedhub.com"),
    # Day 26
    ("NICHE: LUXURY PET RESORTS & CANINE ACADEMIES",
     "Photos of wire cages, dog food bags, and crowded daycare yards.",
     "Individual climate-controlled suites, private grass paddocks, canine behavioral psychology pedigree.",
     "Kennel A charges ₹600/night boarding. Luxury retreat books ₹4,500/night executive suites.",
     "@geetha.designs • uncodedhub.com"),
    # Day 27
    ("NICHE: BESPOKE PERFUMERY & SCENT HOUSES",
     "Ingredients list in standard bullet points with discount bundles.",
     "Sensory formulation narrative, rare botanical extraction details, private olfactory bespoke session.",
     "Perfumer sells ₹2,500 commercial EDPs. House crafts ₹1.2L bespoke personal fragrance signatures.",
     "@geetha.designs • uncodedhub.com"),
    # Day 28
    ("NICHE: LUXURY SPA & AYURVEDIC HEALING SANCTUARIES",
     "List of 50 massage types with duration and prices in an unstyled table.",
     "Dosha diagnostic framework, heritage herbal garden provenance, 14-day rejuvenation protocol.",
     "Spa A sells ₹2,000 foot massages. Sanctuary books ₹1.8L therapeutic executive retreats.",
     "@geetha.designs • uncodedhub.com"),
    # Day 29
    ("NICHE: PRIVATE FAMILY DISPUTE MEDIATION",
     "Standard legal office photo with a generic contact form.",
     "Confidential governance frameworks, preservation of family legacy case studies, private consultation.",
     "Mediator charges standard hourly fees. Advisor handles ₹100Cr intergenerational asset resolutions.",
     "@geetha.designs • uncodedhub.com"),
    # Day 30
    ("NICHE: BESPOKE WATCH RESTORATION & HOROLOGY",
     "Photos of screwdrivers and disassembled movements on cluttered rubber mats.",
     "Macro horological loupe photography, heritage provenance verification, collector restoration registry.",
     "Repairman changes watch batteries for ₹500. Master horologist restores ₹80L vintage Patek Philippes.",
     "@geetha.designs • uncodedhub.com"),
]

# -------------------------------------------------------------
# SLOT 3: 06:00 PM - Spatial Theory & Curated Color Palettes (30 Days)
# Columns: Day,Date,Slot_Time,Slot_Pill,Palette_Name,Color_Hex_Codes,Spatial_Ratio,Psychological_Effect,Best_For_Niche,Footer
# -------------------------------------------------------------
slot3_data = [
    # Day 1
    ("PALETTE #01: THE AMAN ARCHITECT",
     "Cashmere #FBF9F5 • Ink #1A1917 • Brass #C5A880 • Warm Stone #7D7971",
     "70% Space • 20% Editorial Ink • 10% Brushed Brass",
     "Creates optical calm and signals timeless architectural heritage without cold minimalism.",
     "High-End Architecture, Luxury Residential Studios, Bespoke Builders",
     "@geetha.designs • uncodedhub.com"),
    # Day 2
    ("PALETTE #02: THE HARLEY STREET CLINICIAN",
     "Porcelain #F7F7F5 • Slate #2C3539 • Champagne Gold #D4AF37 • Mist #E5E7E6",
     "65% White Space • 25% Structural Slate • 10% Champagne",
     "Replaces cold clinical sterile white with comforting warmth while retaining surgical authority.",
     "Aesthetic Medicine, Boutique Dermatology, Advanced Dental Clinics",
     "@geetha.designs • uncodedhub.com"),
    # Day 3
    ("PALETTE #03: THE MAYFAIR WEALTH COUNSEL",
     "Deep Obsidian #0D0C0A • Ivory #F5F2EB • British Racing Green #1B3F2E • Gold #B89758",
     "60% Dark Ground • 30% Ivory Type • 10% Forest Accents",
     "Communicates generational wealth, sovereign permanence, and institutional discretion.",
     "Family Offices, Wealth Management, Private Equity Boutiques",
     "@geetha.designs • uncodedhub.com"),
    # Day 4
    ("PALETTE #04: THE MILANESE ATELIER",
     "Raw Silk #F4F1EA • Espresso #1F1916 • Terracotta #B85D3B • Bone #ECE7DE",
     "65% Raw Silk • 25% Rich Espresso • 10% Warm Terracotta",
     "Evokes artisanal Italian craftsmanship, natural materials, and tactile luxury.",
     "Bespoke Furniture, Handcrafted Cabinetry, Artisanal Ceramics",
     "@geetha.designs • uncodedhub.com"),
    # Day 5
    ("PALETTE #05: THE KENSINGTON TOWNHOUSE",
     "Alabaster #F9F8F6 • Charcoal #222222 • Muted Sage #6C7D68 • Taupe #9E9689",
     "70% Alabaster • 20% Deep Charcoal • 10% Garden Sage",
     "Blends classical residential grandeur with contemporary organic calmness.",
     "Luxury Real Estate Agencies, Historic Restorations, Prime Urban Estates",
     "@geetha.designs • uncodedhub.com"),
    # Day 6
    ("PALETTE #06: THE MONOGRAPH PUBLISHER",
     "Crisp Cream #FCFBF7 • Pitch Charcoal #121212 • Vermilion #D83A2A • Warm Grey #A8A59E",
     "75% Space • 20% Black Ink • 5% Vermilion Focal Punch",
     "Pure Swiss typography aesthetics. Commands uncompromising intellectual authority.",
     "Executive Advisory, Strategic Design Studios, High-Stakes Consulting",
     "@geetha.designs • uncodedhub.com"),
    # Day 7
    ("PALETTE #07: THE SAVILE ROW BESPOKE",
     "Midnight Navy #0F172A • Chalk #F8FAFC • Camel Tan #C19A6B • Steel #64748B",
     "60% Midnight Base • 30% Chalk Type • 10% Camel Accents",
     "Signals hand-tailored precision, bespoke tailoring heritage, and sharp structural discipline.",
     "Custom Tailoring, Luxury Apparel, Executive Personal Branding",
     "@geetha.designs • uncodedhub.com"),
    # Day 8
    ("PALETTE #08: THE KYOTO TEA SANCTUARY",
     "Washi Rice #F7F5F0 • Sumi Ink #1C1D1F • Bamboo Olive #5C6246 • Clay #A39B8B",
     "70% Washi Base • 22% Sumi Ink • 8% Bamboo Accent",
     "Rooted in wabi-sabi philosophy: profound restraint, organic texture, and serene contemplation.",
     "Holistic Wellness Sanctuaries, High-End Tea Houses, Minimalist Architecture",
     "@geetha.designs • uncodedhub.com"),
    # Day 9
    ("PALETTE #09: THE PROVENCE WINERY ESTATE",
     "Limestone #F5F3EC • Dark Truffle #231C18 • Deep Burgundy #5B1E28 • Olive #756D56",
     "65% Limestone • 25% Truffle Type • 10% Rich Burgundy",
     "Captures soil provenance, sun-drenched stone, and aged vintage luxury.",
     "Boutique Vineyards, Artisanal Distilleries, Fine Dining Destination Restaurants",
     "@geetha.designs • uncodedhub.com"),
    # Day 10
    ("PALETTE #10: THE NORDIC LIGHTING STUDIO",
     "Chalk White #FAF9F6 • Carbon #18191A • Warm Amber #D9822B • Smoked Glass #8A8D8F",
     "70% Space • 20% Carbon Struct • 10% Glowing Amber",
     "Balances cold Scandinavian minimalism with the comforting golden warmth of luminaire glow.",
     "Architectural Lighting, Scandinavian Furniture, Modern Industrial Design",
     "@geetha.designs • uncodedhub.com"),
    # Day 11
    ("PALETTE #11: THE LAKE COMO VILLA",
     "Stucco #F2EFE9 • Deep Spruce #1A2E26 • Sunkissed Ochre #C99738 • Lake Blue #3B5249",
     "65% Warm Stucco • 25% Dark Spruce • 10% Antique Ochre",
     "The quintessence of Mediterranean summer luxury: historic stone villas and evergreen waters.",
     "Destination Wedding Cinematography, Luxury Villa Rentals, Waterfront Estates",
     "@geetha.designs • uncodedhub.com"),
    # Day 12
    ("PALETTE #12: THE BIOMETRIC VAULT",
     "Obsidian #090A0C • Brushed Titanium #A2A7AB • Signal Azure #2563EB • Graphite #1E2229",
     "65% Deep Dark • 25% Titanium Grid • 10% Precision Azure",
     "High-security precision engineering that feels impenetrable, sovereign, and military-grade.",
     "Private Vaults, Crypto Security Custody, Executive Protection Services",
     "@geetha.designs • uncodedhub.com"),
    # Day 13
    ("PALETTE #13: THE HAUTE HORLOGERIE",
     "Matte Onyx #111111 • Rose Gold #B76E79 • Silver Grain #D1D5DB • Smoked Quartz #2D2727",
     "60% Matte Onyx • 30% Metallic Silver • 10% Rose Gold Pointers",
     "Evokes Swiss horological complications, hand-finished bevels, and micro-mechanical luxury.",
     "Watch Restoration Ateliers, High Jewelry Collectives, Collector Portals",
     "@geetha.designs • uncodedhub.com"),
    # Day 14
    ("PALETTE #14: THE TUSCAN VINEYARD RESORT",
     "Terra Cotta #E8E1D5 • Cypress Green #2D3E33 • Rich Leather #6E3B24 • Siena #BA7343",
     "65% Soft Terra • 25% Cypress Type • 10% Hand-Stitched Leather",
     "Warm earth, aromatic cypress groves, and hand-patinated Italian saddle leather.",
     "Eco-Resorts, Heritage Bed & Breakfasts, Luxury Equestrian Stables",
     "@geetha.designs • uncodedhub.com"),
    # Day 15
    ("PALETTE #15: THE COCO CHANEL ARCHIVE",
     "Pure Bone #F8F7F2 • Jet Black #050505 • Crimson #9E1B22 • Pearl #EBE7DF",
     "75% Pure Bone • 20% Pitch Jet • 5% Crimson Seal",
     "The immortal Parisian luxury high-contrast statement: unapologetic, stark, and iconic.",
     "High Fashion Maisons, Editorial Photography Portfolios, Luxury Personal Styling",
     "@geetha.designs • uncodedhub.com"),
    # Day 16
    ("PALETTE #16: THE MALDIVES ATOLL ESCAPE",
     "Fine Coral Sand #F7F4EB • Deep Lagoon #0D2C34 • Aqua Pale #7AC5C1 • Driftwood #8B8378",
     "70% Sand Ground • 20% Deep Lagoon • 10% Aqua Shimmer",
     "Breathtaking ocean serenity that lowers pulse rates and stimulates escapist daydreams.",
     "Overwater Resorts, Luxury Yacht Charters, Bespoke Island Travel Concierge",
     "@geetha.designs • uncodedhub.com"),
    # Day 17
    ("PALETTE #17: THE SOHO DESIGN LAB",
     "Industrial Grey #E5E5E5 • Dark Slate #16181D • Hazard Orange #FF5A1F • Steel #71717A",
     "65% Raw Grey • 25% Dark Slate • 10% Energetic Orange",
     "Raw architectural grit combined with hyper-modern product design innovation.",
     "Industrial Product Design, Creative Tech Studios, Digital Hardware Labs",
     "@geetha.designs • uncodedhub.com"),
    # Day 18
    ("PALETTE #18: THE HIGHLAND SINGLE MALT",
     "Peat Smoke #1A1715 • Amber Gold #D48817 • Tartan Wool #2E382E • Bone #F0ECE1",
     "60% Peat Base • 30% Aged Amber • 10% Tartan Green",
     "Rich oak barrels, smoky highland peat, and golden honeyed warmth aged over decades.",
     "Private Spirits Clubs, Members-Only Cigar Lounges, Bespoke Bar Builders",
     "@geetha.designs • uncodedhub.com"),
    # Day 19
    ("PALETTE #19: THE BAVARIAN AUTO ATELIER",
     "Brushed Aluminum #E0E2E5 • Anthracite #1C1E24 • Bavarian Blue #0066B2 • Charcoal #2B2D33",
     "65% Aluminum Ground • 25% Anthracite Type • 10% Precision Blue",
     "Precision automotive engineering, track-tuned dynamics, and cold technological perfection.",
     "Restomod Ateliers, Luxury Performance Tuning, Supercar Track Clubs",
     "@geetha.designs • uncodedhub.com"),
    # Day 20
    ("PALETTE #20: THE BOTANICAL PERFUMERY",
     "Linen #F6F4ED • Dark Moss #242E21 • Velvet Rose #8C3B4D • Petal #E0D3D1",
     "68% Raw Linen • 22% Deep Moss • 10% Botanical Rose",
     "Subtle organic luxury: petals crushed in distilled spring water on sun-dried linen.",
     "Artisanal Fragrance Houses, Organic Skincare Labs, Bespoke Scent Curators",
     "@geetha.designs • uncodedhub.com"),
    # Day 21
    ("PALETTE #21: THE ST. MORITZ CHALET",
     "Alpine Snow #FAFAFA • Timber Pine #2F261E • Glacier Slate #4E6172 • Warm Hearth #C47A47",
     "70% Snow Space • 20% Timber Wood • 10% Hearth Fire",
     "Crisp mountain air, frosted pine needle scents, and crackling fireside luxury.",
     "Luxury Ski Chalets, Alpine Lodges, High-Altitude Wellness Spas",
     "@geetha.designs • uncodedhub.com"),
    # Day 22
    ("PALETTE #22: THE MEDITERRANEAN POTTER",
     "Sunbaked Clay #EDE5DC • Burnt Umber #3B2B20 • Terracotta Warm #C46845 • Chalk #F7F3EE",
     "65% Clay Ground • 25% Burnt Umber • 10% Terracotta Accent",
     "Tactile, grounding, and honest. Signals pieces thrown by hand on a pottery wheel.",
     "Ceramic Studios, Artisanal Tableware, Handcrafted Tile Manufacturers",
     "@geetha.designs • uncodedhub.com"),
    # Day 23
    ("PALETTE #23: THE MARBLE QUARRY ARCHITECT",
     "Carrara White #F8F8F9 • Nero Marquina #0C0D0E • Vein Gold #C5A059 • Ash #7D8085",
     "72% Carrara Stone • 20% Nero Black • 8% Fine Gold Veining",
     "Commands the permanence of solid stone quarried from Italian mountainsides.",
     "Stone Importers, Luxury Kitchen Island Craftsmen, Bespoke Fireplace Builders",
     "@geetha.designs • uncodedhub.com"),
    # Day 24
    ("PALETTE #24: THE PRIVATE JET HANGAR",
     "Carbon Graphite #131417 • Pearl White #F3F4F6 • Aeronautical Red #DC2626 • Silver #9CA3AF",
     "60% Carbon Dark • 30% Pearl Type • 10% Aviation Red",
     "Aerodynamic speed, luxury aviation standards, and zero-compromise charter execution.",
     "Private Aviation Charters, Aircraft Sales, FBO Executive Lounges",
     "@geetha.designs • uncodedhub.com"),
    # Day 25
    ("PALETTE #25: THE ART DECO JAZZ CLUB",
     "Midnight Velvet #0B0B0E • Gilded Brass #D4AF37 • Peacock Teal #114B5F • Ivory #F7F4EB",
     "62% Midnight Base • 26% Brass Geometric • 12% Peacock Teal",
     "Opulent 1920s geometry, glamorous speakeasy lighting, and rich velvet acoustic drapery.",
     "Bespoke Event Spaces, Luxury Cocktail Bars, Private Dining Clubs",
     "@geetha.designs • uncodedhub.com"),
    # Day 26
    ("PALETTE #26: THE DESERT MODERNIST",
     "Sedona Sand #F2ECE1 • Saguaro Clay #4A3C31 • Desert Copper #B36A42 • Sun Bleach #E0D4C3",
     "68% Sedona Sand • 22% Saguaro Type • 10% Desert Copper",
     "Palm Springs and Frank Lloyd Wright aesthetics: low horizontal profiles and earth-toned mastery.",
     "Desert Architecture, Mid-Century Modern Restorations, Organic Glamping Retreats",
     "@geetha.designs • uncodedhub.com"),
    # Day 27
    ("PALETTE #27: THE RAW SILK WEAVER",
     "Mulberry Silk #F9F7F2 • Charcoal Bark #1F1E1C • Saffron Gold #D99B26 • Raw Flax #DDD7CD",
     "70% Silk Base • 20% Charcoal Type • 10% Saffron Highlights",
     "Tactile heritage textiles, hand-spun fibers, and the delicate rustle of fine silk.",
     "Heirloom Textile Maisons, Bespoke Drapery Studios, Hand-Knotted Rug Galleries",
     "@geetha.designs • uncodedhub.com"),
    # Day 28
    ("PALETTE #28: THE CONTEMPORARY ART GALLERY",
     "Museum White #FEFEFE • Ink #0A0A0A • Gallery Grey #999999 • Cobalt Accent #0047AB",
     "80% Void White • 15% Ink Text • 5% Curatorial Cobalt",
     "The ultimate blank gallery wall that disappears to let the art commanding all human focus.",
     "Fine Art Galleries, Contemporary Sculptors, Private Art Advisory",
     "@geetha.designs • uncodedhub.com"),
    # Day 29
    ("PALETTE #29: THE BIOPHILIC URBAN SANCTUARY",
     "Calm Bone #F6F5F0 • Deep Forest #1E281E • Sprout Green #4E6E4A • Earth Grey #787D75",
     "66% Bone Base • 24% Forest Type • 10% Organic Foliage Green",
     "Brings living botanical ecosystems directly into concrete urban penthouses.",
     "Vertical Garden Builders, Biophilic Interior Designers, Sustainable Landscape Studios",
     "@geetha.designs • uncodedhub.com"),
    # Day 30
    ("PALETTE #30: THE UNCODED HUB SIGNATURE",
     "Warm Cashmere #FBF9F5 • Deep Obsidian #0D0C0A • Raspberry Velvet #E30B5D • Brushed Brass #C5A880",
     "68% Cashmere • 22% Deep Obsidian • 10% Signature Raspberry",
     "Our studio hallmark: ruthless engineering rigor paired with unapologetic editorial luxury.",
     "Uncoded Hub Digital Architecture, Bespoke Engineering Platforms, Elite Service Portals",
     "@geetha.designs • uncodedhub.com"),
]

# -------------------------------------------------------------
# SLOT 4: 08:00 PM - Ex-McKinsey Boardroom Notes & Lead Hand-Raiser (30 Days)
# Columns: Day,Date,Slot_Time,Slot_Pill,Boardroom_Insight,Executive_Reality,The_Fix,Hand_Raiser_CTA,Footer
# -------------------------------------------------------------
slot4_data = [
    # Day 1
    ("What Fortune 500 CEOs Evaluate in the First 3 Seconds",
     "At McKinsey, a senior partner once threw my presentation slide deck back across the desk before reading a single paragraph. His diagnosis was brutal: 'If the visual margins are sloppy, the CEO assumes our data is sloppy.'",
     "Your prospective ₹50L client does the exact same calculation on their phone. When your layout is cluttered, they subconsciously assume your service operations will be chaotic.",
     "Comment 'AUDIT' and I'll send you a 60-second visual hierarchy breakdown of your homepage.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 2
    ("The 'Whitespace as Wealth' Principle",
     "Mass brands shout because they are terrified of being ignored. They cram every square millimeter with badges, neon discount tags, and countdown timers. Luxury brands leave 70% of the screen empty because they don't beg.",
     "Whitespace is the digital equivalent of prime real estate. It signals that your work is confident enough to breathe.",
     "Comment 'RESTRAINT' for our 1-page High-Ticket Visual Design Checklist.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 3
    ("Why We Banned Generic Stock Photos in Boardrooms",
     "You can spot a stock photo in 200 milliseconds. When an executive sees smiling models in suits that were clearly shot in a studio, trust drops to zero. They think: 'If their imagery is fake, what else are they hiding?'",
     "Replace stock models with authentic behind-the-scenes photographs: unpolished construction site meetings, actual clinic rooms, raw material swatches.",
     "Comment 'AUTHENTIC' to get our 5-point iPhone Photography Protocol for founders.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 4
    ("Cognitive Load: The Silent Killer of Inbound Leads",
     "The human brain doesn't process more information when overwhelmed with visual stimuli—it shuts down. Popups, floating bars, autoplay video, and competing columns cause micro-stress. The visitor closes the tab.",
     "Every single pixel on your website must earn its right to exist. If an element doesn't actively build trust or guide the eye, delete it immediately.",
     "Comment 'DECLUTTER' for our 3-step Cognitive De-Frictioning Framework.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 5
    ("The 1-Sentence Provocation Test",
     "If a Fortune 500 CEO couldn't understand our slide's core recommendation in 5 seconds, we failed. Most websites open with: 'We provide innovative, end-to-end bespoke solutions.' It means absolutely nothing.",
     "Open with an unmistakable diagnostic provocation: name the exact high-ticket problem you solve for the exact client you serve.",
     "Comment 'HEADLINE' and I'll rewrite your hero copy in one authoritative sentence.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 6
    ("The Ocular Scanning Physics of High-Net-Worth Buyers",
     "Eye-tracking research proves high-net-worth buyers scan mobile screens along a disciplined vertical spine. If your proof points are buried in horizontal carousels or low-contrast cards, they are completely invisible.",
     "Align your core proof points directly along the primary thumb-scroll axis with high-contrast typographic anchors.",
     "Comment 'EYE' and I'll map the exact visual attention path of your homepage.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 7
    ("Why Neon Buttons Signal Desperation",
     "Discount coupon sites use neon green and bright red because high-saturation triggers impulsive panic. Private banking and heritage luxury rely on deep slate, cashmere, and brushed metallic accents.",
     "Your button should never scream. Restrain your interactive accent to a single sophisticated tone used only for primary conversion actions.",
     "Comment 'PALETTE' for our curated 10-Color Luxury Tone Cheat Sheet.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 8
    ("The 'Presentation Narrative' vs The 'Catalog Dump'",
     "A great boardroom presentation isn't a collection of slides—it's an emotional journey: Context -> Conflict -> Proprietary Framework -> Empirical Proof -> Clear Action. Most websites are just chaotic catalog dumps.",
     "Structure your homepage like a 5-part executive story that resolves every buyer objection before they even think to ask.",
     "Comment 'STORY' for our 5-Fold High-Ticket Narrative Wireframe.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 9
    ("Why 'About Us' Pages Fail in 8 Seconds",
     "Clients don't care about your origin story, your childhood passion, or your mission statement until they believe you can solve their ₹50L problem today. Most 'About Us' pages are self-indulgent essays.",
     "Flip your About page: 80% should highlight your operational standard, client outcomes, and technical team rigor; 20% your personal pedigree.",
     "Comment 'ORIGIN' to receive our Executive Pedigree Bio Template.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 10
    ("The Architecture of the 'Late Means Free' Guarantee",
     "When we pitch high-stakes enterprise projects, uncertainty is the enemy. Clients fear delayed timelines and bloated budgets. A strong visual presentation must frame the de-risking guarantee with total visual prominence.",
     "Position your performance guarantee not in legal fine print, but as a bold, beautifully framed centerpiece of operational pride.",
     "Comment 'GUARANTEE' for our High-Ticket Risk-Reversal Framework.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 11
    ("Why PDF Portfolios Are Losing You ₹20L Deals",
     "Sending a 45MB PDF attachment over WhatsApp to an executive traveling through an airport is a deal-breaker. The file stalls, their storage fills up, and they hire someone with an instant web link.",
     "Replace heavy attachments with a private, lightning-fast digital client showcase that loads in 400 milliseconds on any mobile phone.",
     "Comment 'PORTAL' to see how we build private digital presentation showcases.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 12
    ("The Power of the Architectural Floor Plan Aesthetic",
     "In boardroom decks, clean schematics beat decorative illustrations every time. When you present your service as a structured engineering blueprint with distinct phases, clients stop asking for discounts.",
     "Package your creative process into a 4-phase proprietary methodology with clean numbered steps and timeline milestones.",
     "Comment 'BLUEPRINT' for our 4-Phase Service Architecture Template.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 13
    ("Why Bad Kerning Makes You Look Incompetent",
     "Kerning is the spacing between individual letters. When the space between 'T' and 'o' is visibly wider than between 'o' and 'p' in your logo, trained eyes spot the amateur execution instantly.",
     "High-ticket clients may not know the word 'kerning', but their subconscious registers the lack of polish as amateur craftsmanship.",
     "Comment 'KERNING' and I'll inspect your brand logo's typographic precision.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 14
    ("The Single-CTA Rule for High-Ticket Services",
     "Websites that give visitors 5 competing choices ('Download Brochure', 'Read Blog', 'Follow Instagram', 'Call Office', 'Book Call') suffer from analysis paralysis. When presented with 5 choices, the user chooses none.",
     "Eliminate secondary distraction buttons. Guide 100% of qualified attention toward one singular, high-value conversation request.",
     "Comment 'CONVERT' for our High-Ticket Hero CTA Optimization Guide.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 15
    ("How to Visually Frame Testimonials for Maximum Believability",
     "Generic quotes like 'Great service! Highly recommended!' signed by 'Rahul S.' look completely fabricated. They actually decrease buyer trust.",
     "Pair every client endorsement with their verified executive title, company, headshot, and a specific quantified metric of transformation.",
     "Comment 'PROOF' for our High-Trust Testimonial Display Layout.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 16
    ("The Mobile First-Fold Hierarchy Audit",
     "Over 75% of your high-ticket inquiries happen on an iPhone screen during transit or late at night. Yet 90% of business owners only review their website on their large office desktop.",
     "Open your site on your phone right now. Can you read your core value proposition and book a call without scrolling? If not, you are losing 40% of leads.",
     "Comment 'MOBILE' and I will record a 45-second screen review of your mobile first-fold.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 17
    ("Why Complex Navigation Bars Repel Executive Decision-Makers",
     "Mega-menus with 24 dropdown sub-links resemble clunky government portals. High-net-worth clients want frictionless navigation that respects their finite time.",
     "Limit your primary header navigation to maximum 4 items: Services, Case Studies, Philosophy, and Book Call.",
     "Comment 'NAV' for our 4-Link Executive Navigation Architecture.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 18
    ("The Psychology of the Dark-Mode Boardroom Deck",
     "Dark-mode presentations (#0D0C0A) with fine golden hairlines command dramatic gravitas in dim boardroom settings. They reduce glare and frame imagery like artworks in an evening museum gallery.",
     "Consider a sophisticated dark editorial aesthetic if your niche caters to ultra-luxury, nocturnal executives, or avant-garde architecture.",
     "Comment 'DARKMODE' for our Dark Luxury Color & Contrast Tokens.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 19
    ("Why Animation Without Purpose Degrades Brand Credibility",
     "Spinning icons, bouncing buttons, and text flying in from all angles scream 'amateur web designer playing with plugins'. It distracts from your core message.",
     "Reserve micro-animations strictly for purposeful UI feedback: subtle fades, smooth accordion reveals, and sub-second hover transitions.",
     "Comment 'MOTION' for our Subtle Motion Engineering Guidelines.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 20
    ("The Power of the 'Client Self-Qualification' Grid",
     "High-ticket service firms waste dozens of hours every month talking to unqualified leads who cannot afford their fees. Your presentation should filter gracefully.",
     "Include a clean 'Who This Is For / Who This Is NOT For' comparative matrix. It repels bargain hunters while reassuring serious buyers.",
     "Comment 'FILTER' for our Client Qualification Matrix Layout.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 21
    ("Why Form Design Dictates Deal Velocity",
     "A contact form asking for 12 required fields (including fax, full postal address, and project budget dropdowns) causes an 80% abandonment rate.",
     "Reduce initial inquiry friction to 3 essential fields: Name, Phone/WhatsApp, and What are you building? Deep qualification happens on the discovery call.",
     "Comment 'FORMS' for our High-Converting Contact Form Blueprint.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 22
    ("The Luxury Monograph Portfolio Layout",
     "Treating your portfolio like an endless masonry grid makes your best work look like an uncurated Pinterest board. High-end craft demands editorial pacing.",
     "Present only your 4 absolute finest projects with full case study storytelling: The Brief, The Architectural Solution, The Material Selection, and The Final Living Space.",
     "Comment 'CASESTUDY' for our 4-Step Editorial Project Presentation Template.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 23
    ("How Typography Solves the 'Too Expensive' Objection",
     "When a client says 'Your quote is too expensive', they aren't complaining about money—they are saying your perceived value doesn't justify the investment.",
     "When your digital presentation looks like an executive publication from McKinsey or Monocle, your premium price tag feels completely natural and justified.",
     "Comment 'VALUE' for our 5-Point Perceived Value Maximization Checklist.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 24
    ("The Danger of Cookie Banners That Cover the Screen",
     "A massive cookie banner blocking the bottom 40% of the mobile screen combined with a floating chat widget creates immediate visual claustrophobia. The user bounces before reading.",
     "Use ultra-minimalist, single-line compliance bars that never obstruct the primary value statement or hero navigation.",
     "Comment 'AUDIT' to see if your mobile chrome is suffocating your visitors.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 25
    ("Why Client Logos Need Monochromatic Discipline",
     "A wall of full-color client logos with clashing reds, blues, and yellows looks like a messy NASCAR racing car sticker sheet. It ruptures your brand's aesthetic unity.",
     "Render all client and press logos in a single muted tone (slate #71717A or warm grey #9CA3AF) with 50% opacity. It integrates seamlessly into luxury layouts.",
     "Comment 'LOGOS' for our High-End Social Proof Styling Guide.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 26
    ("The 'Late Night Mobile Scroller' Personas",
     "Most high-ticket decisions aren't made at 10 AM at an office desk. They are made at 11:30 PM in bed when a tired founder or homeowner is scrolling on their phone seeking a solution.",
     "Design for low-light, tired eyes: soothing color contrasts, instant tap targets, and frictionless 1-tap WhatsApp consultation triggers.",
     "Comment 'WHATSAPP' for our High-Ticket WhatsApp Conversion Funnel Setup.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 27
    ("The Role of White Glove Micro-Copy in Client Onboarding",
     "The moment a prospect clicks 'Submit', seeing a generic green box that says 'Message sent' abruptly breaks the luxury illusion.",
     "Redirect them to a custom VIP confirmation page detailing: exactly what happens in the next 4 hours, who will contact them, and what to prepare for the call.",
     "Comment 'ONBOARD' for our VIP Post-Submission Protocol.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 28
    ("The Mathematical Grid: Why Your Eyes Relax on Great Sites",
     "You may not understand the golden ratio or an 8px grid system, but your optical nerves crave mathematical symmetry. When elements are misaligned by even 6px, your brain registers disorder.",
     "Enforce an unbreakable structural grid across every layout fold to induce optical harmony and calm confidence.",
     "Comment 'GRID' for our 8-Point Visual Layout Grid Rules.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 29
    ("Why Bespoke Web Engineering Beats Off-the-Shelf Templates",
     "WordPress templates carry 400KB of bloated JavaScript and clunky third-party plugins that drag mobile load times down to 6 seconds. Luxury buyers don't wait.",
     "Bespoke, handcrafted code loads in 400 milliseconds, achieves 100/100 Google Core Web Vitals, and communicates flawless technological pedigree.",
     "Comment 'BESPOKE' to see our custom edge-rendered engineering benchmarks.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
    # Day 30
    ("The Final Design Doctrine: Restraint Is Power",
     "In a world where everyone is shouting with animated banners and frantic sales pitches, the brand that speaks with quiet, immaculate restraint commands the entire room.",
     "Elevate your visual presentation to match the extraordinary caliber of your actual work. You have earned the right to command high-ticket fees.",
     "Comment 'TRANSFORM' and let's craft an executive digital presence for your firm in 7 days.",
     "Geetha // Co-Founder & Design Director, Uncoded Hub"),
]

# Write CSV 1
with open(os.path.join(output_dir, "01_slot_10am_editorial_typography_30.csv"), "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["Day", "Date", "Slot_Time", "Slot_Pill", "Rule_Header", "Core_Headline", "Diagnostic_Body", "Golden_Takeaway", "Footer"])
    for i, row in enumerate(slot1_data, 1):
        dt = (start_date + timedelta(days=i-1)).strftime("%Y-%m-%d")
        pill = f"TYPOGRAPHY PROTOCOL // 10:00 AM"
        writer.writerow([i, dt, "10:00", pill, row[0], row[1], row[2], row[3], row[4]])

# Write CSV 2
with open(os.path.join(output_dir, "02_slot_02pm_visual_teardown_30.csv"), "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["Day", "Date", "Slot_Time", "Slot_Pill", "Niche_Target", "Commodity_Mistake", "Luxury_Standard", "Pricing_Impact", "Footer"])
    for i, row in enumerate(slot2_data, 1):
        dt = (start_date + timedelta(days=i-1)).strftime("%Y-%m-%d")
        pill = f"VISUAL TEARDOWN // 02:00 PM"
        writer.writerow([i, dt, "14:00", pill, row[0], row[1], row[2], row[3], row[4]])

# Write CSV 3
with open(os.path.join(output_dir, "03_slot_06pm_luxury_palette_spatial_30.csv"), "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["Day", "Date", "Slot_Time", "Slot_Pill", "Palette_Name", "Color_Hex_Codes", "Spatial_Ratio", "Psychological_Effect", "Best_For_Niche", "Footer"])
    for i, row in enumerate(slot3_data, 1):
        dt = (start_date + timedelta(days=i-1)).strftime("%Y-%m-%d")
        pill = f"PALETTE & SPATIAL THEORY // 06:00 PM"
        writer.writerow([i, dt, "18:00", pill, row[0], row[1], row[2], row[3], row[4], row[5]])

# Write CSV 4
with open(os.path.join(output_dir, "04_slot_08pm_mckinsey_design_notes_30.csv"), "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["Day", "Date", "Slot_Time", "Slot_Pill", "Boardroom_Insight", "Executive_Reality", "The_Fix", "Hand_Raiser_CTA", "Footer"])
    for i, row in enumerate(slot4_data, 1):
        dt = (start_date + timedelta(days=i-1)).strftime("%Y-%m-%d")
        pill = f"MCKINSEY BOARDROOM NOTES // 08:00 PM"
        writer.writerow([i, dt, "20:00", pill, row[0], row[1], row[2], row[3], row[4]])

print("Successfully generated all 4 segregated Canva CSVs for Geetha!")
