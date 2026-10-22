import os
import re
import csv
import json
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Set up paths
WORKSPACE_DIR = os.path.abspath(".")
OUTREACH_DIR = os.path.join(WORKSPACE_DIR, "Outreach_System")
NICHES_DIR = os.path.join(OUTREACH_DIR, "17_Niches_Outreach_Sheets")
MASTER_JSON = os.path.join(WORKSPACE_DIR, "local_map_outreach", "targeted_outreach_ready", "00_MASTER_OUTREACH_TARGETS_ALL_NICHES.json")

OUTPUT_XLSX = os.path.join(OUTREACH_DIR, "TOP_120_BANGALORE_CHENNAI_PRIORITY_LEADS.xlsx")
OUTPUT_CSV = os.path.join(OUTREACH_DIR, "TOP_120_BANGALORE_CHENNAI_PRIORITY_LEADS.csv")

PREMIUM_LOCALITIES = {
    # Bengaluru
    "indiranagar": "Indiranagar",
    "koramangala": "Koramangala",
    "hsr layout": "HSR Layout",
    "hsr": "HSR Layout",
    "whitefield": "Whitefield",
    "jayanagar": "Jayanagar",
    "jp nagar": "JP Nagar",
    "sadashivanagar": "Sadashivanagar",
    "mg road": "MG Road",
    "lavelle road": "Lavelle Road",
    "hebbal": "Hebbal",
    "marathahalli": "Marathahalli",
    "bellandur": "Bellandur",
    "sarjapur": "Sarjapur Road",
    "electronic city": "Electronic City",
    "banashankari": "Banashankari",
    "malleswaram": "Malleswaram",
    "rajajinagar": "Rajajinagar",
    "frazer town": "Frazer Town",
    "richmond town": "Richmond Town",
    "vasanth nagar": "Vasanth Nagar",
    "ulsoor": "Ulsoor",
    "hal": "HAL / Old Airport Rd",
    "kalyan nagar": "Kalyan Nagar",
    
    # Chennai
    "t nagar": "T Nagar",
    "thyagaraya": "T Nagar",
    "anna nagar": "Anna Nagar",
    "adyar": "Adyar",
    "velachery": "Velachery",
    "nungambakkam": "Nungambakkam",
    "alwarpet": "Alwarpet",
    "mylapore": "Mylapore",
    "kilpauk": "Kilpauk",
    "omr": "OMR (IT Corridor)",
    "ecr": "ECR",
    "besant nagar": "Besant Nagar",
    "egmore": "Egmore",
    "chetpet": "Chetpet",
    "gopalapuram": "Gopalapuram",
    "vadapalani": "Vadapalani",
    "ashok nagar": "Ashok Nagar",
    "kk nagar": "KK Nagar",
    "sholinganallur": "Sholinganallur",
    "thiruvanmiyur": "Thiruvanmiyur",
    "guindy": "Guindy",
    "teynampet": "Teynampet",
    "perungudi": "Perungudi",
    "chromepet": "Chromepet",
    "tambaram": "Tambaram"
}

NICHE_METADATA = {
    "Interior Designers & Architects": {
        "niche_id": "3",
        "folder_name": "3. Interior Designers & Architects.xlsx",
        "demo_link": "https://uncodedhub.com/web-design/interior-designers/",
        "deal_value": "₹45,000 - ₹75,000",
        "pitch_hook": "showcase 3D renders vs built site photography, interactive quotation estimators, and project lookbooks"
    },
    "Real Estate Agents & Realtors": {
        "niche_id": "4",
        "folder_name": "4. Real Estate & Property Consultants.xlsx",
        "demo_link": "https://uncodedhub.com/web-design/real-estate/",
        "deal_value": "₹50,000 - ₹85,000",
        "pitch_hook": "showcase exclusive property walkthroughs, floorplans, and capture high-net-worth investor inquiries directly without 99acres brokerage leakage"
    },
    "Dental & Aesthetic Clinics": {
        "niche_id": "5",
        "folder_name": "5. Dental & Aesthetic Clinics.xlsx",
        "demo_link": "https://uncodedhub.com/web-design/dental-clinics/",
        "deal_value": "₹40,000 - ₹65,000",
        "pitch_hook": "allow anxious patients to book appointments in 2 taps, view treatment pricing transparently, and see verified smile makeover results"
    },
    "Wedding Photographers & Videographers": {
        "niche_id": "6",
        "folder_name": "6. Wedding Photographers & Event Planners.xlsx",
        "demo_link": "https://uncodedhub.com/web-design/wedding-photographers/",
        "deal_value": "₹35,000 - ₹60,000",
        "pitch_hook": "stream 4K wedding films at sub-second speeds, allow couples to check wedding date availability, and package tier pricing"
    },
    "Home Renovation & Modular Kitchens": {
        "niche_id": "7",
        "folder_name": "7. Home Renovation & Modular Kitchens.xlsx",
        "demo_link": "https://uncodedhub.com/web-design/interior-designers/",
        "deal_value": "₹45,000 - ₹70,000",
        "pitch_hook": "showcase kitchen finish catalogues, 3D layouts, and instant quote booking for homeowners"
    },
    "Coaches & Consultants": {
        "niche_id": "8",
        "folder_name": "8. Coaches & Business Consultants.xlsx",
        "demo_link": "https://uncodedhub.com/web-design/coaches-consultants/",
        "deal_value": "₹35,000 - ₹55,000",
        "pitch_hook": "replace amateur Linktree bios with a high-converting authority portal, client testimonials, and 1-click consultation funnels"
    },
    "Educational Academies & Coaching Institutes": {
        "niche_id": "1",
        "folder_name": "1. Educational Academies & Coaching Institutes.xlsx",
        "demo_link": "https://uncodedhub.com/web-design/educational-academies/",
        "deal_value": "₹50,000 - ₹80,000",
        "pitch_hook": "automate student admissions, display ranker results with verified proof, and offer instant syllabus WhatsApp downloads"
    }
}

# Styling Constants (Navy Executive Theme)
FONT_FAMILY = "Segoe UI"
COLOR_PRIMARY = "0F172A"       # Slate 900
COLOR_HEADER_TEXT = "FFFFFF"   # White
COLOR_ACCENT = "2563EB"        # Blue 600
COLOR_ACCENT_LIGHT = "EFF6FF"  # Blue 50
COLOR_BORDER = "CBD5E1"        # Slate 300
COLOR_ZEBRA = "F8FAFC"         # Slate 50
COLOR_GOLD = "D97706"          # Amber 600
COLOR_GREEN = "16A34A"         # Emerald 600

font_title = Font(name=FONT_FAMILY, size=15, bold=True, color="0F172A")
font_subtitle = Font(name=FONT_FAMILY, size=10, italic=True, color="64748B")
font_section_header = Font(name=FONT_FAMILY, size=11, bold=True, color="FFFFFF")
font_table_header = Font(name=FONT_FAMILY, size=10, bold=True, color="FFFFFF")
font_data = Font(name=FONT_FAMILY, size=10, color="0F172A")
font_data_bold = Font(name=FONT_FAMILY, size=10, bold=True, color="0F172A")
font_lead_score = Font(name=FONT_FAMILY, size=11, bold=True, color="D97706")
font_phone = Font(name=FONT_FAMILY, size=10, bold=True, color="2563EB")
font_gold = Font(name=FONT_FAMILY, size=10, bold=True, color="D97706")
font_green = Font(name=FONT_FAMILY, size=10, bold=True, color="16A34A")

fill_header = PatternFill(start_color=COLOR_PRIMARY, end_color=COLOR_PRIMARY, fill_type="solid")
fill_accent = PatternFill(start_color=COLOR_ACCENT, end_color=COLOR_ACCENT, fill_type="solid")
fill_accent_light = PatternFill(start_color=COLOR_ACCENT_LIGHT, end_color=COLOR_ACCENT_LIGHT, fill_type="solid")
fill_zebra = PatternFill(start_color=COLOR_ZEBRA, end_color=COLOR_ZEBRA, fill_type="solid")
fill_gold_light = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid")
fill_kpi = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")

thin_border = Side(style="thin", color=COLOR_BORDER)
cell_border = Border(left=thin_border, right=thin_border, top=thin_border, bottom=thin_border)

align_center = Alignment(horizontal="center", vertical="center", wrap_text=True)
align_left = Alignment(horizontal="left", vertical="center", wrap_text=True)
align_right = Alignment(horizontal="right", vertical="center")

def extract_locality(address_text, raw_details):
    combined = f"{address_text or ''} {raw_details or ''}".lower()
    for key, val in PREMIUM_LOCALITIES.items():
        if key in combined:
            return val
    if "100 feet" in combined:
        return "Indiranagar"
    if "sir thyagaraya" in combined or "pondymarket" in combined:
        return "T Nagar"
    return "Central Commercial Hub"

def clean_address(address_text, raw_details):
    text = (address_text or raw_details or "").strip()
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    valid_lines = []
    for l in lines:
        if any(term in l.lower() for term in ["closed", "opens", "open 24", "reviews", "rating", "website", "directions"]):
            continue
        if re.search(r'^\d\.\d\(\d+\)', l):
            continue
        valid_lines.append(l)
    return " · ".join(valid_lines[:2]) if valid_lines else text[:100]

def clean_phone_number(phone_str):
    if not phone_str:
        return None, None
    digits = re.sub(r'\D', '', phone_str)
    if digits.startswith('91') and len(digits) == 12:
        digits = digits[2:]
    elif digits.startswith('0') and len(digits) == 11:
        digits = digits[1:]
    
    if len(digits) == 10:
        return f"+91 {digits[:5]} {digits[5:]}", digits
    return None, None

def calculate_lead_score(website, rating, reviews, locality, city):
    score = 0
    reasons = []
    
    w_lower = (website or "").strip().lower()
    if not w_lower or w_lower in ['none', 'n/a', 'http://', 'https://']:
        score += 3.5
        reasons.append("Zero Standalone Website (+3.5)")
    elif 'linktr.ee' in w_lower:
        score += 3.0
        reasons.append("Linktree in place of website (+3.0)")
    elif 'wa.me' in w_lower or 'whatsapp' in w_lower:
        score += 3.0
        reasons.append("WhatsApp direct link in place of website (+3.0)")
    elif 'instagram.com' in w_lower or 'facebook.com' in w_lower:
        score += 2.5
        reasons.append("Social profile in place of website (+2.5)")
    else:
        score += 1.0

    # Reviews
    if reviews >= 100:
        score += 3.0
        reasons.append(f"Strong Authority ({reviews} Google Reviews) (+3.0)")
    elif reviews >= 30:
        score += 2.0
        reasons.append(f"Solid Local Presence ({reviews} Google Reviews) (+2.0)")
    elif reviews >= 10:
        score += 1.0
        reasons.append(f"Established Business ({reviews} Google Reviews) (+1.0)")
    else:
        score += 0.5

    # Rating
    if rating >= 4.8:
        score += 2.0
        reasons.append(f"Outstanding Rating ({rating}★) (+2.0)")
    elif rating >= 4.4:
        score += 1.5
        reasons.append(f"High Quality Rating ({rating}★) (+1.5)")
    elif rating >= 4.0:
        score += 1.0
        reasons.append(f"Good Rating ({rating}★) (+1.0)")

    # Prime Locality
    if locality != "Central Commercial Hub":
        score += 1.5
        reasons.append(f"High-Net-Worth Catchment Area: {locality} (+1.5)")

    return round(score, 1), "; ".join(reasons)

def build_whatsapp_pitch(name, niche, city, locality, demo_link, pitch_hook, phone_raw):
    return (
        f"Hi {name} Team,\n\n"
        f"I came across your business while researching reputable {niche.lower()} in {locality}, {city} on Google.\n\n"
        f"You have fantastic reviews on Google, but I noticed you don't currently have an independent, mobile-optimized website to {pitch_hook}.\n\n"
        f"At Uncoded Hub ({city}), we build bespoke, sub-second business websites delivered in exactly 7 working days — backed by our written guarantee: on time, or the build is 100% free.\n\n"
        f"We've actually engineered a live, interactive 7-day specimen for your industry that you can test right here on mobile in 10 seconds:\n"
        f"{demo_link}\n\n"
        f"Would you be open to a quick 5-minute look to see how a dedicated web platform can convert more phone inquiries into confirmed bookings?\n\n"
        f"Best regards,\n"
        f"Deepak & Geetha\n"
        f"Co-Founders, Uncoded Hub\n"
        f"WhatsApp: +91 87784 27958 · https://uncodedhub.com"
    )

def build_phone_script(name, niche, city, locality, formatted_phone, demo_link):
    return (
        f"1. OPENING: 'Hi, am I speaking with the owner or director of {name}? My name is Deepak, co-founder of Uncoded Hub here in {city}.'\n"
        f"2. REASON: 'I was looking at reputable {niche.lower()} in {locality} on Google Maps and came across your profile. You have great customer reviews, but I noticed you don't have an official mobile website linked, which means clients searching on their phones can't view your portfolio or book directly.'\n"
        f"3. THE HOOK: 'Rather than pitching you blindly, our studio built an interactive live specimen specifically for {niche.lower()} with sub-second mobile speed and a 7-day delivery guarantee: on time, or the entire build is 100% free.'\n"
        f"4. CALL TO ACTION: 'I just sent the mobile demo link to your WhatsApp on this number ({formatted_phone}). Could you open it while we're on the line? It takes just 15 seconds to look at.'"
    )

def auto_fit_columns(ws, max_cols=20):
    for col in range(1, max_cols + 1):
        col_letter = get_column_letter(col)
        max_len = 0
        for row in range(5, min(ws.max_row + 1, 150)):
            val = ws.cell(row=row, column=col).value
            if val:
                val_str = str(val)
                lines = val_str.split("\n")
                longest_line = max(len(l) for l in lines)
                if longest_line > max_len:
                    max_len = longest_line
        ws.column_dimensions[col_letter].width = max(max_len + 3, 12)

def main():
    print("=" * 80)
    print("UNCODED HUB — PROSPECTING & LEAD QUALIFICATION ENGINE")
    print("Filtering Top Bangalore & Chennai Leads (Zero Website / Linktree / WhatsApp)")
    print("=" * 80)

    if not os.path.exists(MASTER_JSON):
        print(f"Error: {MASTER_JSON} not found!")
        return

    with open(MASTER_JSON, "r", encoding="utf-8") as f:
        master_targets = json.load(f)

    print(f"Loaded {len(master_targets)} records from master target database.")

    qualified_leads = []
    seen_phones = set()
    seen_names = set()

    for item in master_targets:
        raw_city = (item.get("city") or "").strip().lower()
        if "bengaluru" in raw_city or "bangalore" in raw_city:
            city = "Bengaluru"
        elif "chennai" in raw_city:
            city = "Chennai"
        else:
            continue

        raw_phone = (item.get("phone") or "").strip()
        formatted_phone, digits_10 = clean_phone_number(raw_phone)
        if not formatted_phone:
            continue

        name = (item.get("name") or "").strip()
        clean_name_key = re.sub(r'[^a-zA-Z0-9]', '', name.lower())

        if digits_10 in seen_phones or clean_name_key in seen_names:
            continue

        # Exclude national conglomerates where local managers have no purchasing authority
        excluded_chains = ["nobroker", "livspace", "homelane", "ifb point", "godrej interio", "apollo dental", "clove dental"]
        if any(c in name.lower() for c in excluded_chains):
            continue

        website = (item.get("website") or "").strip()
        w_lower = website.lower()

        # Check qualification: No website, Linktree, WhatsApp, or Social profile in place of website
        is_gold = False
        flaw_type = ""
        if not website or w_lower in ['none', 'n/a', 'http://', 'https://']:
            is_gold = True
            flaw_type = "Zero Website (Phone & Map Listing Only)"
        elif 'linktr.ee' in w_lower:
            is_gold = True
            flaw_type = f"Using Linktree ({website[:35]}...) instead of custom website"
        elif 'wa.me' in w_lower or 'whatsapp' in w_lower:
            is_gold = True
            flaw_type = f"Using WhatsApp Direct Link ({website[:35]}...) instead of website"
        elif 'instagram.com' in w_lower:
            is_gold = True
            flaw_type = f"Using Instagram Profile ({website[:35]}...) as primary link"
        elif 'facebook.com' in w_lower:
            is_gold = True
            flaw_type = f"Using Facebook Page ({website[:35]}...) as primary link"
        elif 'justdial' in w_lower or 'indiamart' in w_lower:
            is_gold = True
            flaw_type = f"Using Aggregator Directory ({website[:35]}...) instead of owned site"

        if not is_gold:
            continue

        seen_phones.add(digits_10)
        seen_names.add(clean_name_key)

        try:
            rating = float(item.get("rating") or 0.0)
        except:
            rating = 0.0

        try:
            reviews = int(item.get("parsed_reviews") or item.get("reviews") or 0)
        except:
            reviews = 0

        address_raw = item.get("address", "")
        raw_details = item.get("raw_details", "")
        locality = extract_locality(address_raw, raw_details)
        clean_addr = clean_address(address_raw, raw_details)
        niche = item.get("niche") or "Coaches & Consultants"

        # Check if niche config exists
        niche_meta = NICHE_METADATA.get(niche, NICHE_METADATA["Coaches & Consultants"])

        lead_score, score_reasons = calculate_lead_score(website, rating, reviews, locality, city)

        wa_pitch = build_whatsapp_pitch(name, niche, city, locality, niche_meta["demo_link"], niche_meta["pitch_hook"], digits_10)
        phone_script = build_phone_script(name, niche, city, locality, formatted_phone, niche_meta["demo_link"])

        qualified_leads.append({
            "name": name,
            "city": city,
            "locality": locality,
            "phone_formatted": formatted_phone,
            "phone_raw": digits_10,
            "website": website or "None (Gold Lead)",
            "flaw_type": flaw_type,
            "rating": rating,
            "reviews": reviews,
            "lead_score": lead_score,
            "score_reasons": score_reasons,
            "niche": niche,
            "niche_id": niche_meta["niche_id"],
            "deal_value": niche_meta["deal_value"],
            "demo_link": niche_meta["demo_link"],
            "address": clean_addr,
            "maps_link": item.get("maps_link", ""),
            "whatsapp_pitch": wa_pitch,
            "phone_script": phone_script,
            "email": item.get("email", ""),
            "instagram": item.get("instagram", "")
        })

    # Sort strictly by Lead Score descending, then by reviews descending
    qualified_leads.sort(key=lambda x: (x["lead_score"], x["reviews"], x["rating"]), reverse=True)

    print(f"Total Qualified Gold Leads Processed: {len(qualified_leads)}")
    print(f"Bengaluru Leads: {sum(1 for l in qualified_leads if l['city'] == 'Bengaluru')}")
    print(f"Chennai Leads: {sum(1 for l in qualified_leads if l['city'] == 'Chennai')}")

    # Assign Lead IDs
    for idx, l in enumerate(qualified_leads, start=1):
        l["lead_id"] = f"UH-GLD-{idx:03d}"

    # Take Top 120 Priority Call Batch
    top_120 = qualified_leads[:120]
    print(f"Selected Top 120 Priority Leads for Immediate Outreach (Min Score: {top_120[-1]['lead_score']}/10)")

    # -------------------------------------------------------------
    # 1. EXPORT MASTER CSV
    # -------------------------------------------------------------
    csv_headers = [
        "Lead ID", "Business Name", "City", "Locality", "Phone Number", "Google Rating", 
        "Review Count", "Website Status", "Primary Flaw Identified", "Lead Score (out of 10)", 
        "Scoring Breakdown", "Niche", "Estimated Deal Value", "Interactive Demo Link", 
        "Google Maps URL", "Clean Street Address", "WhatsApp Outreach Message", "Phone Cold Call Script"
    ]

    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(csv_headers)
        for l in qualified_leads:
            writer.writerow([
                l["lead_id"],
                l["name"],
                l["city"],
                l["locality"],
                l["phone_formatted"],
                f"{l['rating']}★" if l['rating'] else "N/A",
                l["reviews"],
                l["website"],
                l["flaw_type"],
                l["lead_score"],
                l["score_reasons"],
                l["niche"],
                l["deal_value"],
                l["demo_link"],
                l["maps_link"],
                l["address"],
                l["whatsapp_pitch"],
                l["phone_script"]
            ])

    print(f"Exported Master CSV with {len(qualified_leads)} leads to: {OUTPUT_CSV}")

    # -------------------------------------------------------------
    # 2. GENERATE MASTER HIGH-AESTHETIC EXCEL WORKBOOK
    # -------------------------------------------------------------
    wb = openpyxl.Workbook()
    wb.remove(wb.active) # Remove default sheet

    # TAB 1: EXECUTIVE KPI DASHBOARD
    ws_kpi = wb.create_sheet(title="📊 Executive KPI Dashboard")
    ws_kpi.views.sheetView[0].showGridLines = True

    # Title Block
    ws_kpi.merge_cells("A1:K2")
    ws_kpi["A1"] = "UNCODED HUB — BANGALORE & CHENNAI OUTREACH COMMAND CENTER"
    ws_kpi["A1"].font = font_title
    ws_kpi["A1"].alignment = align_left

    ws_kpi["A3"] = "Target: Close First 10 Custom Web Design Clients | Focus: Zero Website & High-Intent Social/WhatsApp Prospects"
    ws_kpi["A3"].font = font_subtitle

    # KPI Metric Boxes
    kpi_metrics = [
        ("Total Gold Leads", len(qualified_leads), "A5", "B6", COLOR_PRIMARY),
        ("Top Priority Batch", len(top_120), "C5", "D6", COLOR_ACCENT),
        ("Bengaluru Leads", sum(1 for l in qualified_leads if l['city'] == 'Bengaluru'), "E5", "F6", COLOR_GOLD),
        ("Chennai Leads", sum(1 for l in qualified_leads if l['city'] == 'Chennai'), "G5", "H6", COLOR_GREEN),
        ("First 10 Clients Target Revenue", "₹5,50,000", "I5", "K6", COLOR_PRIMARY),
    ]

    for label, val, top_left, bot_right, col in kpi_metrics:
        ws_kpi.merge_cells(f"{top_left}:{bot_right}")
        c = ws_kpi[top_left]
        c.value = f"{label}\n{val}"
        c.font = Font(name=FONT_FAMILY, size=13, bold=True, color=COLOR_HEADER_TEXT)
        c.fill = PatternFill(start_color=col, end_color=col, fill_type="solid")
        c.alignment = align_center
        c.border = cell_border

    # Conversion Funnel Math Section
    ws_kpi.cell(row=8, column=1, value="FIRST 10 CLIENTS ONBOARDING MATH & CONVERSION BENCHMARKS").font = font_data_bold
    ws_kpi.merge_cells("A8:K8")
    ws_kpi["A8"].fill = fill_accent
    ws_kpi["A8"].font = font_section_header
    ws_kpi["A8"].alignment = align_left

    funnel_rows = [
        ("Stage 1: Outbound WhatsApp & Phone Dials", f"{len(top_120)} contacts", "100% of Top 120 Priority Batch contacted over 4 days (30 dials/day)"),
        ("Stage 2: Positive Responses & Demo Views", "25 - 35 prospects", "20% - 30% view interactive 7-day mobile specimen"),
        ("Stage 3: 15-Minute Strategy & Scope Calls", "15 - 18 calls", "12% - 15% booking rate for live speed teardown & quote"),
        ("Stage 4: Scope Lock & 50% Advance Deposits", "10 - 12 deals closed", "8% - 10% closed at ₹45,000 - ₹75,000 avg contract value"),
        ("Stage 5: Expected Net Revenue", "₹4,50,000 - ₹7,50,000", "Cashflow in 7-14 days with zero ad spend")
    ]

    funnel_headers = ["Outreach Funnel Step", "Expected Numbers", "Execution Strategy & Daily Milestone"]
    for c_idx, h in enumerate(funnel_headers, start=1):
        c = ws_kpi.cell(row=9, column=c_idx if c_idx < 3 else 3, value=h)
        c.font = font_table_header
        c.fill = fill_header
        c.alignment = align_center
        c.border = cell_border
    ws_kpi.merge_cells("C9:K9")

    for idx, (step, nums, strat) in enumerate(funnel_rows, start=10):
        r = ws_kpi.cell(row=idx, column=1, value=step)
        r.font = font_data_bold
        r.border = cell_border
        r.alignment = align_left

        n = ws_kpi.cell(row=idx, column=2, value=nums)
        n.font = font_lead_score if "Closed" in step or "Revenue" in step else font_data_bold
        n.border = cell_border
        n.alignment = align_center

        ws_kpi.merge_cells(f"C{idx}:K{idx}")
        s = ws_kpi.cell(row=idx, column=3, value=strat)
        s.font = font_data
        s.border = cell_border
        s.alignment = align_left

        if idx % 2 == 0:
            ws_kpi.cell(row=idx, column=1).fill = fill_zebra
            ws_kpi.cell(row=idx, column=2).fill = fill_zebra
            ws_kpi.cell(row=idx, column=3).fill = fill_zebra

    # Niche Distribution Table
    ws_kpi.cell(row=17, column=1, value="NICHE BREAKDOWN OF QUALIFIED GOLD LEADS").font = font_data_bold
    ws_kpi.merge_cells("A17:K17")
    ws_kpi["A17"].fill = fill_header
    ws_kpi["A17"].font = font_section_header
    ws_kpi["A17"].alignment = align_left

    niche_headers = ["Niche / Industry", "Total Leads", "Bangalore", "Chennai", "Avg Deal Size", "Interactive Demo Link"]
    col_mapping = [1, 2, 3, 4, 5, 6]
    for c_idx, h in zip(col_mapping, niche_headers):
        c = ws_kpi.cell(row=18, column=c_idx, value=h)
        c.font = font_table_header
        c.fill = fill_accent
        c.alignment = align_center
        c.border = cell_border
    ws_kpi.merge_cells("F18:K18")

    from collections import Counter
    niche_counts = Counter(l["niche"] for l in qualified_leads)

    curr_row = 19
    for niche_name, meta in NICHE_METADATA.items():
        total_n = niche_counts.get(niche_name, 0)
        if total_n == 0:
            continue
        blr_n = sum(1 for l in qualified_leads if l["niche"] == niche_name and l["city"] == "Bengaluru")
        chn_n = sum(1 for l in qualified_leads if l["niche"] == niche_name and l["city"] == "Chennai")

        ws_kpi.cell(row=curr_row, column=1, value=niche_name).font = font_data_bold
        ws_kpi.cell(row=curr_row, column=2, value=total_n).font = font_data_bold
        ws_kpi.cell(row=curr_row, column=3, value=blr_n).font = font_data
        ws_kpi.cell(row=curr_row, column=4, value=chn_n).font = font_data
        ws_kpi.cell(row=curr_row, column=5, value=meta["deal_value"]).font = font_green
        
        ws_kpi.merge_cells(f"F{curr_row}:K{curr_row}")
        ws_kpi.cell(row=curr_row, column=6, value=meta["demo_link"]).font = font_data

        for c_idx in range(1, 7):
            ws_kpi.cell(row=curr_row, column=c_idx).border = cell_border
            if curr_row % 2 == 0:
                ws_kpi.cell(row=curr_row, column=c_idx).fill = fill_zebra
        curr_row += 1

    auto_fit_columns(ws_kpi, max_cols=11)

    # -------------------------------------------------------------
    # HELPER TO POPULATE LEAD TABLES
    # -------------------------------------------------------------
    lead_table_headers = [
        "Lead ID", "Priority Rank", "Business Name", "City", "Locality", 
        "Phone / Mobile", "Rating & Reviews", "Current Web / Link Status", 
        "Primary Flaw Identified", "Lead Score", "Niche / Industry", 
        "Outreach Status", "Initial Contact Date", "Channel Used", 
        "Follow-Up Due", "Interactive Demo Link", "Google Maps URL", "Street Address"
    ]

    def render_lead_sheet(ws, title_text, leads_data):
        ws.views.sheetView[0].showGridLines = True
        
        # Header block
        ws.merge_cells("A1:R2")
        ws["A1"] = title_text
        ws["A1"].font = font_title
        ws["A1"].alignment = align_left

        for col_idx, h in enumerate(lead_table_headers, start=1):
            c = ws.cell(row=5, column=col_idx, value=h)
            c.font = font_table_header
            c.fill = fill_header
            c.alignment = align_center
            c.border = cell_border

        for r_idx, lead in enumerate(leads_data, start=6):
            ws.cell(row=r_idx, column=1, value=lead["lead_id"]).font = font_data_bold
            ws.cell(row=r_idx, column=2, value=f"#{r_idx-5:03d}").font = font_data_bold
            ws.cell(row=r_idx, column=3, value=lead["name"]).font = font_data_bold
            ws.cell(row=r_idx, column=4, value=lead["city"]).font = font_data
            ws.cell(row=r_idx, column=5, value=lead["locality"]).font = font_data
            ws.cell(row=r_idx, column=6, value=lead["phone_formatted"]).font = font_phone
            ws.cell(row=r_idx, column=7, value=f"{lead['rating']}★ ({lead['reviews']} revs)").font = font_data
            ws.cell(row=r_idx, column=8, value=lead["website"]).font = font_gold if "None" in lead["website"] else font_data
            ws.cell(row=r_idx, column=9, value=lead["flaw_type"]).font = font_data
            ws.cell(row=r_idx, column=10, value=f"{lead['lead_score']} / 10").font = font_lead_score
            ws.cell(row=r_idx, column=11, value=lead["niche"]).font = font_data
            ws.cell(row=r_idx, column=12, value="Ready to Dial").font = font_data_bold
            ws.cell(row=r_idx, column=13, value="").font = font_data
            ws.cell(row=r_idx, column=14, value="Phone / WhatsApp").font = font_data
            ws.cell(row=r_idx, column=15, value="").font = font_data
            ws.cell(row=r_idx, column=16, value=lead["demo_link"]).font = font_data
            ws.cell(row=r_idx, column=17, value=lead["maps_link"]).font = font_data
            ws.cell(row=r_idx, column=18, value=lead["address"]).font = font_data

            for col in range(1, 19):
                cell = ws.cell(row=r_idx, column=col)
                cell.border = cell_border
                if r_idx % 2 == 0:
                    cell.fill = fill_zebra

        auto_fit_columns(ws, max_cols=18)

    # TAB 2: TOP 120 PRIORITY CALL LIST
    ws_top120 = wb.create_sheet(title="🏆 Top 120 Priority Call List")
    render_lead_sheet(ws_top120, "UNCODED HUB — TOP 120 HIGH-INTENT OUTREACH TARGETS (BANGALORE & CHENNAI)", top_120)

    # TAB 3: BANGALORE LEADS
    blr_leads = [l for l in qualified_leads if l["city"] == "Bengaluru"]
    ws_blr = wb.create_sheet(title="📍 Bangalore Verified Leads")
    render_lead_sheet(ws_blr, f"BANGALORE GOLD PROSPECTS ({len(blr_leads)} VERIFIED LEADS WITH ZERO WEBSITE / SOCIAL ONLY)", blr_leads)

    # TAB 4: CHENNAI LEADS
    chn_leads = [l for l in qualified_leads if l["city"] == "Chennai"]
    ws_chn = wb.create_sheet(title="📍 Chennai Verified Leads")
    render_lead_sheet(ws_chn, f"CHENNAI GOLD PROSPECTS ({len(chn_leads)} VERIFIED LEADS WITH ZERO WEBSITE / SOCIAL ONLY)", chn_leads)

    # TAB 5: BATTLE-TESTED SCRIPTS & PITCHES
    ws_scripts = wb.create_sheet(title="💬 Outreach & Closing Scripts")
    ws_scripts.views.sheetView[0].showGridLines = True
    ws_scripts.merge_cells("A1:H2")
    ws_scripts["A1"] = "BATTLE-TESTED OUTREACH SCRIPTS & 7-DAY GUARANTEE OBJECTION HANDLING"
    ws_scripts["A1"].font = font_title
    ws_scripts["A1"].alignment = align_left

    scripts_sections = [
        ("SCRIPT 1: COLD CALL 45-SECOND OPENER (Direct to Owner / Practice Manager)", [
            ("The Goal", "Get the owner to look at the interactive 7-day mobile specimen on their phone while on the call."),
            ("Opening", "Hi, am I speaking with the owner or principal partner of [Business Name]? My name is Deepak, co-founder of Uncoded Hub here in [Bengaluru / Chennai]."),
            ("The Reason", "I came across your profile on Google Maps in [Locality]. You have exceptional customer reviews, but I noticed you don't currently have an independent, mobile-optimized website linked — meaning high-budget clients searching on Google cannot see your full portfolio, package pricing, or book directly."),
            ("The Unfair Hook", "Rather than pitching you blindly, our studio built a live interactive working specimen specifically for [Industry] with sub-second mobile speed and a 7-day sprint guarantee: on time, or the entire build is 100% free."),
            ("Call To Action", "I just sent the mobile demo link directly to your WhatsApp on this number. Could you open it while we're on the line? It takes just 15 seconds to look at.")
        ]),
        ("SCRIPT 2: 1-TAP WHATSAPP AUDIT MESSAGE (High-Converting Copy)", [
            ("Subject / Hook", "Quick question regarding [Business Name] on Google Maps"),
            ("Body Text", 
                "Hi [Business Name] Team,\n\n"
                "I came across your business while researching reputable [Industry] in [Locality], [City] on Google.\n\n"
                "You have fantastic reviews on Google, but I noticed you don't have an independent, mobile-optimized website to showcase your work and capture direct client inquiries.\n\n"
                "At Uncoded Hub ([City]), we build bespoke, sub-second business websites delivered in exactly 7 working days — backed by our written guarantee: on time, or the build is 100% free.\n\n"
                "We've actually engineered a live, interactive 7-day specimen for your industry that you can test right here on mobile in 10 seconds:\n"
                "[Demo Link]\n\n"
                "Would you be open to a quick 5-minute look to see how a dedicated web platform can convert more phone inquiries into confirmed bookings?\n\n"
                "Best regards,\nDeepak & Geetha · Co-Founders, Uncoded Hub (+91 87784 27958)"
            )
        ]),
        ("OBJECTION HANDLING: THE 3 BIGGEST OBJECTIONS", [
            ("Objection 1: 'We get all our business from Instagram / Word of mouth.'",
             "Rebuttal: 'Instagram is incredible for discovery, but when high-net-worth clients want to spend ₹50,000 to ₹5,00,000, they Google you to check credibility, pricing, and exact service breakdown. Without an official website, up to 40% of those ready-to-buy clients drop off and call your competitor who has a verified custom domain. Our 7-day sprint simply captures the clients you are already losing.'"),
            ("Objection 2: 'Websites take 2-3 months and are too much headache.'",
             "Rebuttal: 'That is exactly why Uncoded Hub exists. Traditional agencies take 90 days of back-and-forth meetings. We work on a strict 7-Day Sprint. You give us your raw photos/services, and in 7 days your sub-second platform is live. If we are late by even one hour, you get the site 100% free. No financial risk on your side.'"),
            ("Objection 3: 'How much does it cost?'",
             "Rebuttal: 'Our complete turnkey packages range between ₹35,000 and ₹75,000 depending on features like booking calendars and quotation calculators. That includes 100% code ownership, zero monthly agency retainer traps, and sub-second load speeds. Let's do a quick 10-minute mobile walkthrough tomorrow at 11 AM.'")
        ])
    ]

    s_row = 4
    for section_title, bullets in scripts_sections:
        ws_scripts.cell(row=s_row, column=1, value=section_title).font = font_section_header
        ws_scripts.merge_cells(f"A{s_row}:H{s_row}")
        ws_scripts[f"A{s_row}"].fill = fill_accent
        ws_scripts[f"A{s_row}"].alignment = align_left
        s_row += 1

        for label, text in bullets:
            ws_scripts.cell(row=s_row, column=1, value=label).font = font_data_bold
            ws_scripts.cell(row=s_row, column=1).alignment = align_left
            ws_scripts.cell(row=s_row, column=1).border = cell_border

            ws_scripts.merge_cells(f"B{s_row}:H{s_row}")
            c = ws_scripts.cell(row=s_row, column=2, value=text)
            c.font = font_data
            c.alignment = align_left
            c.border = cell_border

            if s_row % 2 == 0:
                ws_scripts.cell(row=s_row, column=1).fill = fill_zebra
                ws_scripts.cell(row=s_row, column=2).fill = fill_zebra

            ws_scripts.row_dimensions[s_row].height = 45 if len(text) > 100 else 25
            s_row += 1
        s_row += 1

    auto_fit_columns(ws_scripts, max_cols=8)

    # TAB 6: DAILY 10-CLIENT CLOSING TRACKER
    ws_track = wb.create_sheet(title="🎯 10-Client Closing Tracker")
    ws_track.views.sheetView[0].showGridLines = True
    ws_track.merge_cells("A1:K2")
    ws_track["A1"] = "DAILY OUTREACH PIPELINE & 10-CLIENT ONBOARDING LOG"
    ws_track["A1"].font = font_title
    ws_track["A1"].alignment = align_left

    track_headers = [
        "Slot #", "Client Name", "City", "Agreed Niche", "Deal Value (INR)", 
        "50% Advance Received", "Project Kickoff Date", "7-Day Sprint Live Deadline", 
        "Balance Payment Date", "Client Testimonial Received", "Notes & Referrals"
    ]

    for col_idx, h in enumerate(track_headers, start=1):
        c = ws_track.cell(row=5, column=col_idx, value=h)
        c.font = font_table_header
        c.fill = fill_header
        c.alignment = align_center
        c.border = cell_border

    for i in range(1, 11):
        r = 5 + i
        ws_track.cell(row=r, column=1, value=f"CLIENT #{i:02d}").font = font_data_bold
        ws_track.cell(row=r, column=2, value="[Pending Close]").font = font_data
        ws_track.cell(row=r, column=3, value="Bengaluru / Chennai").font = font_data
        ws_track.cell(row=r, column=4, value="").font = font_data
        ws_track.cell(row=r, column=5, value="₹55,000").font = font_lead_score
        ws_track.cell(row=r, column=6, value="₹27,500").font = font_green
        ws_track.cell(row=r, column=7, value="").font = font_data
        ws_track.cell(row=r, column=8, value="Day 7 Guaranteed").font = font_data
        ws_track.cell(row=r, column=9, value="").font = font_data
        ws_track.cell(row=r, column=10, value="No").font = font_data
        ws_track.cell(row=r, column=11, value="").font = font_data

        for c in range(1, 12):
            cell = ws_track.cell(row=r, column=c)
            cell.border = cell_border
            if r % 2 == 0:
                cell.fill = fill_zebra

    # Total Row
    ws_track.cell(row=16, column=1, value="TOTALS").font = font_data_bold
    ws_track.cell(row=16, column=5, value="₹5,50,000").font = Font(name=FONT_FAMILY, size=11, bold=True, color=COLOR_GOLD)
    ws_track.cell(row=16, column=6, value="₹2,75,000").font = Font(name=FONT_FAMILY, size=11, bold=True, color=COLOR_GREEN)
    for c in range(1, 12):
        ws_track.cell(row=16, column=c).fill = fill_accent_light
        ws_track.cell(row=16, column=c).border = cell_border

    auto_fit_columns(ws_track, max_cols=11)

    wb.save(OUTPUT_XLSX)
    print(f"Successfully generated Master Priority Workbook: {OUTPUT_XLSX}")

    # -------------------------------------------------------------
    # 3. UPDATE INDIVIDUAL 17 NICHE SHEETS WITH REAL LEADS
    # -------------------------------------------------------------
    print("\nUpdating matching Niche Workbooks in Outreach_System/17_Niches_Outreach_Sheets/...")
    
    # Group leads by niche
    leads_by_niche = {}
    for l in qualified_leads:
        n = l["niche"]
        if n not in leads_by_niche:
            leads_by_niche[n] = []
        leads_by_niche[n].append(l)

    for niche_name, leads in leads_by_niche.items():
        meta = NICHE_METADATA.get(niche_name)
        if not meta:
            continue
        file_path = os.path.join(NICHES_DIR, meta["folder_name"])
        if not os.path.exists(file_path):
            print(f"Warning: {file_path} not found.")
            continue

        try:
            niche_wb = openpyxl.load_workbook(file_path)
            
            # Find Google Maps sheet
            gm_sheet_name = None
            for s in niche_wb.sheetnames:
                if "Google Maps" in s or "Maps" in s:
                    gm_sheet_name = s
                    break

            if gm_sheet_name:
                ws_niche_gm = niche_wb[gm_sheet_name]
                # Populate leads starting at row 6
                for idx, lead in enumerate(leads, start=6):
                    ws_niche_gm.cell(row=idx, column=1, value=lead["lead_id"]).font = font_data_bold
                    ws_niche_gm.cell(row=idx, column=2, value=lead["name"]).font = font_data_bold
                    ws_niche_gm.cell(row=idx, column=3, value=f"{lead['locality']}, {lead['city']}").font = font_data
                    ws_niche_gm.cell(row=idx, column=4, value=f"{lead['rating']} ★" if lead['rating'] else "N/A").font = font_data
                    ws_niche_gm.cell(row=idx, column=5, value=str(lead['reviews'])).font = font_data
                    ws_niche_gm.cell(row=idx, column=6, value=lead["phone_formatted"]).font = font_phone
                    ws_niche_gm.cell(row=idx, column=7, value=lead["website"]).font = font_data
                    ws_niche_gm.cell(row=idx, column=8, value=lead["flaw_type"]).font = font_data
                    ws_niche_gm.cell(row=idx, column=9, value="N/A (No Web)").font = font_data
                    ws_niche_gm.cell(row=idx, column=10, value="Founder / Principal").font = font_data
                    ws_niche_gm.cell(row=idx, column=11, value="2026-10-22").font = font_data
                    ws_niche_gm.cell(row=idx, column=12, value="Phone Call & WhatsApp").font = font_data
                    ws_niche_gm.cell(row=idx, column=13, value="Ready to Contact").font = font_data_bold
                    ws_niche_gm.cell(row=idx, column=14, value="2026-10-24").font = font_data
                    ws_niche_gm.cell(row=idx, column=15, value="7-Day Sprint Guarantee: On time or 100% Free").font = font_data
                    ws_niche_gm.cell(row=idx, column=16, value=f"Rating: {lead['rating']}★ ({lead['reviews']} revs). Prime locality: {lead['locality']}").font = font_data

                    for c in range(1, 17):
                        cell = ws_niche_gm.cell(row=idx, column=c)
                        cell.border = cell_border
                        if idx % 2 == 0:
                            cell.fill = fill_zebra
                
                auto_fit_columns(ws_niche_gm, max_cols=16)

            # Find WhatsApp sheet
            wa_sheet_name = None
            for s in niche_wb.sheetnames:
                if "WhatsApp" in s:
                    wa_sheet_name = s
                    break

            if wa_sheet_name:
                ws_niche_wa = niche_wb[wa_sheet_name]
                for idx, lead in enumerate(leads, start=6):
                    ws_niche_wa.cell(row=idx, column=1, value=lead["lead_id"]).font = font_data_bold
                    ws_niche_wa.cell(row=idx, column=2, value=lead["name"]).font = font_data_bold
                    ws_niche_wa.cell(row=idx, column=3, value="Owner / Practice Head").font = font_data
                    ws_niche_wa.cell(row=idx, column=4, value=lead["phone_formatted"]).font = font_phone
                    ws_niche_wa.cell(row=idx, column=5, value=f"{lead['locality']}, {lead['city']}").font = font_data
                    ws_niche_wa.cell(row=idx, column=6, value=lead["demo_link"]).font = font_data
                    ws_niche_wa.cell(row=idx, column=7, value="2026-10-22").font = font_data
                    ws_niche_wa.cell(row=idx, column=8, value="Custom WhatsApp Pitch & Mobile Demo").font = font_data
                    ws_niche_wa.cell(row=idx, column=9, value="Ready to Send").font = font_data
                    ws_niche_wa.cell(row=idx, column=10, value="Initial Outreach").font = font_data_bold
                    ws_niche_wa.cell(row=idx, column=11, value="2026-10-24").font = font_data
                    ws_niche_wa.cell(row=idx, column=12, value=meta["deal_value"]).font = font_green
                    ws_niche_wa.cell(row=idx, column=13, value=f"No website. Using: {lead['website']}").font = font_data

                    for c in range(1, 14):
                        cell = ws_niche_wa.cell(row=idx, column=c)
                        cell.border = cell_border
                        if idx % 2 == 0:
                            cell.fill = fill_zebra

                auto_fit_columns(ws_niche_wa, max_cols=13)

            niche_wb.save(file_path)
            print(f"Updated {file_path} with {len(leads)} verified leads.")
        except Exception as e:
            print(f"Error updating {file_path}: {e}")

    print("\n" + "=" * 80)
    print("ALL SHEETS FULLY UPDATED AND READY FOR TOMORROW'S OUTREACH!")
    print(f"Master Excel: {OUTPUT_XLSX}")
    print(f"Master CSV:   {OUTPUT_CSV}")
    print("=" * 80)

if __name__ == "__main__":
    main()
