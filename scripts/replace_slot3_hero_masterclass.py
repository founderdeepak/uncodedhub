import os
import csv
from datetime import datetime, timedelta

output_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\geetha_120_instagram_campaign"
os.makedirs(output_dir, exist_ok=True)

start_date = datetime(2026, 10, 15)

# -------------------------------------------------------------
# SLOT 3: 06:00 PM - The Hero Section Masterclass (30 Days)
# Columns: Day,Date,Slot_Time,Slot_Pill,Archetype_Name,Layout_Geometry,First_Fold_Rule,Ideal_For_Niche,Footer
# -------------------------------------------------------------
slot3_hero_masterclass = [
    # Day 1
    ("ARCHETYPE #01: THE ASYMMETRIC MONOGRAPH",
     "60% full-bleed flagship project photography on left, 40% generous warm cashmere margin on right with high-contrast serif headline and single discreet inquiry trigger.",
     "Asymmetric weighting creates an immediate diagonal eye path: the eye enters on the visual transformation and lands naturally on your value statement.",
     "Boutique Architecture, Penthouse Developments, Bespoke Builders",
     "@geetha.designs • uncodedhub.com"),
    # Day 2
    ("ARCHETYPE #02: THE FULL-BLEED ATMOSPHERIC HERO",
     "100% immersive cinematic twilight photograph with a subtle 20% dark gradient scrim at the base. Headline set in pure bone typography floating in the bottom third.",
     "Eliminating borders dissolves the digital screen barrier, transporting the visitor directly inside the physical atmosphere of your work.",
     "Luxury Hospitality, Private Island Resorts, High-End Retreats",
     "@geetha.designs • uncodedhub.com"),
    # Day 3
    ("ARCHETYPE #03: THE EDITORIAL TYPOGRAPHIC MANIFESTO",
     "Zero imagery in the first fold. 70% void space with an unhurried, commanding 48px serif headline across 2 lines, anchored by a micro 12px uppercase category kicker.",
     "When you lead with sheer typographic confidence, you signal that your intellectual authority and reputation precede you.",
     "Executive Advisory, Strategic Management Counsel, Multi-Family Offices",
     "@geetha.designs • uncodedhub.com"),
    # Day 4
    ("ARCHETYPE #04: THE DUAL-TONE SPLIT CANVAS",
     "50/50 vertical division: Deep Obsidian (#0D0C0A) column for strategic positioning text, warm porcelain column showcasing an ultra-sharp architectural interior photograph.",
     "The hard boundary between deep ink and warm imagery establishes high-contrast tension that commands immediate focus.",
     "High-End Interior Architecture, Bespoke Cabinetry, Kitchen Ateliers",
     "@geetha.designs • uncodedhub.com"),
    # Day 5
    ("ARCHETYPE #05: THE MATERIALITY MACRO SHOWCASE",
     "Extreme close-up macro photography of raw materials (fluted marble, brushed brass joinery, raw Belgian linen) paired with minimalist technical annotations.",
     "Highlighting microscopic physical craft signals that you are an obsessive artisan, pre-empting commoditization and price haggling.",
     "Custom Furniture Craftsmen, Artisanal Lighting, Stone Importers",
     "@geetha.designs • uncodedhub.com"),
    # Day 6
    ("ARCHETYPE #06: THE MINIMALIST ARCHITECTURAL GRID",
     "A disciplined 3-column layout: Column 1 holds the firm provenance and founding year; Column 2 features the signature project image; Column 3 holds the primary consultation action.",
     "Dividing the first fold into clear structural bays induces cognitive order and mirrors physical blueprint discipline.",
     "Urban Planners, Landscape Architects, Commercial Design Studios",
     "@geetha.designs • uncodedhub.com"),
    # Day 7
    ("ARCHETYPE #07: THE FLOATING EDITORIAL CARD",
     "Full-width ambient background with an elevated off-center cashmere card containing the headline, credentials, and private consultation trigger.",
     "The layered card creates tactile depth, making the digital interface feel like an embossed executive invitation.",
     "Private Wealth Counsel, Boutique M&A Advisory, Estate Lawyers",
     "@geetha.designs • uncodedhub.com"),
    # Day 8
    ("ARCHETYPE #08: THE SINGLE-STATEMENT ANCHOR",
     "A single 6-word sentence centered on the screen with 120px margins on all sides. Subtitle set in 16px muted slate. One subtle scroll indicator at the base.",
     "Total visual silence forces the human brain to process every word with immense gravitational importance.",
     "Sovereign Family Advisory, Elite Private Banking, Venture Studios",
     "@geetha.designs • uncodedhub.com"),
    # Day 9
    ("ARCHETYPE #09: THE AMBIENT CINEMATIC CANVAS",
     "Slow-panning, 24fps atmospheric video background without sound or cuts, paired with high-contrast bone typography and a quiet WhatsApp concierge link.",
     "Subtle ambient motion creates breathing life on screen without triggering the cognitive irritation of aggressive promotional video.",
     "Destination Wedding Cinematographers, Luxury Charter Operators",
     "@geetha.designs • uncodedhub.com"),
    # Day 10
    ("ARCHETYPE #10: THE CHIAROSCURO GALLERY HERO",
     "Deep charcoal backdrop with dramatic, high-contrast spotlighting illuminating a single handcrafted masterpiece in the center of the viewport.",
     "The classical chiaroscuro lighting technique frames your product like an irreplaceable museum treasure.",
     "Bespoke Horology, Fine Jewelry Ateliers, Collector Car Restoration",
     "@geetha.designs • uncodedhub.com"),
    # Day 11
    ("ARCHETYPE #11: THE TABULAR EXECUTIVE BRIEF",
     "Headline accompanied by a structured 3-part telemetry table: Metric A (Turnaround: 7 Days), Metric B (Client LCP: 400ms), Metric C (Guarantee: 100%).",
     "Presenting core parameters in a verified tabular matrix conveys engineering certainty over vague marketing fluff.",
     "Uncoded Hub Digital Architecture, High-Stakes Tech Consultancies",
     "@geetha.designs • uncodedhub.com"),
    # Day 12
    ("ARCHETYPE #12: THE ASYMMETRIC HORIZON SPLIT",
     "A horizontal 70/30 split: the top 70% viewport holds a wide panoramic architectural estate image, while the bottom 30% baseline anchors the headline and CTA.",
     "A low visual horizon line mimics architectural landscape paintings, creating an expansive sense of luxury space.",
     "Luxury Real Estate Developers, Private Golf Resorts, Vineyard Estates",
     "@geetha.designs • uncodedhub.com"),
    # Day 13
    ("ARCHETYPE #13: THE VERTICAL SPINE HERO",
     "Content structured strictly along a 420px central vertical spine with expansive void margins on left and right. Optimized perfectly for mobile thumb-scrolling.",
     "A vertical spine layout ensures flawless 1-to-1 visual parity between desktop monitors and mobile devices.",
     "Aesthetic Medicine Clinics, High-End Dermatology, Plastic Surgeons",
     "@geetha.designs • uncodedhub.com"),
    # Day 14
    ("ARCHETYPE #14: THE DIPTYCH COMPARISON HERO",
     "Side-by-side dual frames: Frame A shows raw architectural blueprints; Frame B shows the completed, sunlit living space.",
     "The diptych format visually demonstrates your ability to bridge raw technical planning with breathtaking physical execution.",
     "Turnkey Contractors, Structural Engineers, Renovation Specialists",
     "@geetha.designs • uncodedhub.com"),
    # Day 15
    ("ARCHETYPE #15: THE CURATED MONOGRAPH HERO",
     "Framed photograph with generous 40px passe-partout white borders, mimicking a page from a limited-edition architectural coffee table book.",
     "The white mat border elevates commercial photos into framed fine art prints.",
     "Art Galleries, Editorial Photographers, High-Fashion Stylists",
     "@geetha.designs • uncodedhub.com"),
    # Day 16
    ("ARCHETYPE #16: THE SENSORY TEXTURE HERO",
     "High-resolution background capturing raw linen weave or aged Italian leather, paired with deep espresso typography and quiet brass CTA buttons.",
     "Digital screens are cold; sensory texture backgrounds inject tactile warmth and human craftsmanship.",
     "Bespoke Tailoring Maisons, Handcrafted Leather Ateliers",
     "@geetha.designs • uncodedhub.com"),
    # Day 17
    ("ARCHETYPE #17: THE BLUEPRINT SCHEMATIC HERO",
     "Light hairline grid lines (0.5px) in muted stone spanning the canvas, with architectural section markers and dimensional coordinates.",
     "Grid lines communicate mathematical rigor, precision engineering, and structured execution.",
     "Naval Architects, Industrial Product Designers, Custom Home Builders",
     "@geetha.designs • uncodedhub.com"),
    # Day 18
    ("ARCHETYPE #18: THE TIMELESS MONOCHROME HERO",
     "Strict black-and-white photography with extreme tonal contrast, paired with crisp sans-serif typography and zero color accents.",
     "Monochrome eliminates all chromatic distraction, focusing 100% of the viewer's attention on form, light, and geometry.",
     "Contemporary Art Advisory, High-End Event Curators, Creative Directors",
     "@geetha.designs • uncodedhub.com"),
    # Day 19
    ("ARCHETYPE #19: THE QUADRANT BALANCE HERO",
     "Viewport split into 4 equal quadrants: Q1 Headline, Q2 Micro-Proof, Q3 Hero Visual, Q4 Primary Action Button.",
     "Quadrant layouts provide perfect geometric balance, making every corner of the first fold feel intentional and weighted.",
     "Design Systems Consultancies, Luxury Brand Strategy Agencies",
     "@geetha.designs • uncodedhub.com"),
    # Day 20
    ("ARCHETYPE #20: THE GOLDEN-HOUR ARCHITECTURAL HERO",
     "Warm twilight photography of an illuminated residence against an indigo sky, with headline set in brushed champagne gold.",
     "Twilight architectural lighting induces feelings of sanctuary, warmth, and arriving home.",
     "High-End Residential Architects, Landscape Lighting Specialists",
     "@geetha.designs • uncodedhub.com"),
    # Day 21
    ("ARCHETYPE #21: THE NUMBER SCALE PROVOCATION",
     "A massive 84px statistic ('₹140Cr' or '100%') dominating the left third, paired with an explanatory editorial paragraph and consultation trigger.",
     "Leading with an undeniable scale metric shocks the visitor out of passive scrolling into focused engagement.",
     "Private Equity Portfolios, High-Stakes Legal Counsel, Commercial Brokers",
     "@geetha.designs • uncodedhub.com"),
    # Day 22
    ("ARCHETYPE #22: THE OVERLAPPING EDITORIAL HERO",
     "Headline text partially overlapping the edge of a high-res project image with razor-sharp contrast and perfect legibility.",
     "Subtle layering creates editorial depth, resembling the cover design of Architectural Digest or Monocle.",
     "Interior Decorators, Bespoke Furniture Designers, Editorial Publications",
     "@geetha.designs • uncodedhub.com"),
    # Day 23
    ("ARCHETYPE #23: THE TRANSLUCENT FROSTED HERO",
     "Full-bleed background image overlaid with a frosted glassmorphic navigation pill and streamlined inquiry card.",
     "Frosted glass finishes add modern technological sophistication without obscuring the underlying craftsmanship.",
     "Acoustic Theater Builders, Smart Home Automation Specialists",
     "@geetha.designs • uncodedhub.com"),
    # Day 24
    ("ARCHETYPE #24: THE PROVENANCE EMBLEM HERO",
     "A subtle, blind-debossed style brand hallmark centered at the top, followed by an elegant 3-line statement of studio philosophy.",
     "Emblem-led layouts communicate century-old heritage and uncompromising craft standards.",
     "Heirloom Jewelers, Private Distilleries, Heritage Restorers",
     "@geetha.designs • uncodedhub.com"),
    # Day 25
    ("ARCHETYPE #25: THE IMMERSIVE HORIZONTAL SLIDER",
     "A smooth, mouse-wheel controlled horizontal gallery showing 3 distinct interior perspectives with continuous typographic captions.",
     "Horizontal movement disrupts expected vertical scrolling patterns, forcing intentional visual focus.",
     "Luxury Penthouse Sales, Bespoke Yacht Charters, Custom Auto Restorers",
     "@geetha.designs • uncodedhub.com"),
    # Day 26
    ("ARCHETYPE #26: THE BIOPHILIC SANCTUARY HERO",
     "Warm sunlight filtering through lush botanical foliage, casting gentle natural leaf shadows across a minimalist cream layout.",
     "Biophilic shadows reduce visual digital fatigue and communicate restorative health and organic elegance.",
     "Holistic Wellness Sanctuaries, Biophilic Architects, Sustainable Spas",
     "@geetha.designs • uncodedhub.com"),
    # Day 27
    ("ARCHETYPE #27: THE DEEP OBSIDIAN ATELIER HERO",
     "Pure dark theme (#0D0C0A) with fine 1px golden framing lines and a single spotlight on a bespoke handcrafted creation.",
     "Dark atelier layouts evoke private evening viewing rooms for elite collectors and connoisseurs.",
     "Bespoke Watch Restorers, Haute Horlogerie Ateliers, Private Vaults",
     "@geetha.designs • uncodedhub.com"),
    # Day 28
    ("ARCHETYPE #28: THE CURATOR’S INDEX HERO",
     "A numbered table of contents listing 4 flagship completed projects, each revealing an instant image preview on pointer hover.",
     "Index layouts respect the visitor's intelligence, allowing them to explore projects at their own deliberate pace.",
     "Contemporary Art Galleries, Editorial Architecture Studios",
     "@geetha.designs • uncodedhub.com"),
    # Day 29
    ("ARCHETYPE #29: THE HARMONIC RATIO HERO",
     "A layout designed with exact 38.2% and 61.8% golden ratio divisions between negative space, image canvas, and typography.",
     "Golden ratio geometry creates instinctive optical calm that makes visitors linger 2x longer on the page.",
     "Fine Art Advisory, Classical Restoration Architects, Private Foundations",
     "@geetha.designs • uncodedhub.com"),
    # Day 30
    ("ARCHETYPE #30: THE UNCODED BESPOKE MASTERCLASS",
     "The signature Uncoded Hub architecture: sub-second edge rendering, flawless serif typography, 70% intentional breathing room, and 100/100 Core Web Vitals.",
     "The ultimate union of uncompromising aesthetic luxury and ruthless technical engineering.",
     "Uncoded Hub Digital Architecture, High-Ticket Service Founders",
     "@geetha.designs • uncodedhub.com"),
]

# Write Slot 3 CSV
slot3_file = os.path.join(output_dir, "03_slot_06pm_hero_section_masterclass_30.csv")
with open(slot3_file, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["Day", "Date", "Slot_Time", "Slot_Pill", "Archetype_Name", "Layout_Geometry", "First_Fold_Rule", "Ideal_For_Niche", "Footer"])
    for i, row in enumerate(slot3_hero_masterclass, 1):
        dt = (start_date + timedelta(days=i-1)).strftime("%Y-%m-%d")
        pill = "HERO MASTERCLASS // 06:00 PM"
        writer.writerow([i, dt, "18:00", pill, row[0], row[1], row[2], row[3], row[4]])

print(f"Generated {slot3_file}")

# Remove old Slot 3 file if exists
old_slot3 = os.path.join(output_dir, "03_slot_06pm_luxury_palette_spatial_30.csv")
if os.path.exists(old_slot3):
    os.remove(old_slot3)
    print(f"Removed deprecated file: {old_slot3}")

# Rebuild master Zernio schedule
zernio_template = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\deepak_180_instagram_campaign\master_deepak_180_zernio_schedule.csv"
with open(zernio_template, "r", encoding="utf-8-sig") as f:
    headers = next(csv.reader(f))

slot1_file = os.path.join(output_dir, "01_slot_10am_editorial_typography_30.csv")
slot2_file = os.path.join(output_dir, "02_slot_02pm_quiet_luxury_psychology_30.csv")
slot4_file = os.path.join(output_dir, "04_slot_08pm_conversion_architecture_30.csv")

with open(slot1_file, "r", encoding="utf-8-sig") as f: s1_data = list(csv.DictReader(f))
with open(slot2_file, "r", encoding="utf-8-sig") as f: s2_data = list(csv.DictReader(f))
with open(slot3_file, "r", encoding="utf-8-sig") as f: s3_data = list(csv.DictReader(f))
with open(slot4_file, "r", encoding="utf-8-sig") as f: s4_data = list(csv.DictReader(f))

profile_id = "6acfb8ce887284d03189ee8d"
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

    # Slot 3: 18:00 (06:00 PM) Hero Masterclass
    r3 = s3_data[i]
    c3 = f"[{r3['Slot_Pill']}]\n\n{r3['Archetype_Name']}\n\nLayout Geometry:\n{r3['Layout_Geometry']}\n\nFirst-Fold Rule:\n{r3['First_Fold_Rule']}\n\nBest Suited For:\n{r3['Ideal_For_Niche']}\n\n#HeroSection #WebDesignInspiration #UIUXDesign #DesignMasterclass #UncodedHub"
    time3 = f"{r3['Date']} 18:00"
    img3 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_06PM_HeroMasterclass.png"
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

print(f"Successfully rebuilt master Zernio schedule ({len(zernio_rows)} rows) at {master_file}!")
