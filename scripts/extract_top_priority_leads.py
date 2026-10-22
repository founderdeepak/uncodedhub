import csv
import json
import os
import re

"""
    UNCODED HUB — PROSPECTING & LEAD QUALIFICATION ENGINE
    Parses Google Maps intelligence data from local_map_outreach/gmaps_data.js
    Filters, qualifies, scores, and personalizes high-priority leads with:
    - Zero Website (+3) or Social-only (+2)
    - Strong Reviews & High Rating (up to +2)
    - Prime Commercial Localities in Bengaluru & Chennai (+2)
    - Direct Mobile / Phone Number
    
    Generates:
    1. local_map_outreach/UncodedHub_Priority_Outreach_Pipeline.csv
    2. local_map_outreach/UncodedHub_Top50_Immediate_Outreach.csv
"""

PREMIUM_LOCALITIES = [
    "indiranagar", "koramangala", "hsr layout", "whitefield", "jayanagar", "jp nagar", 
    "sadashivanagar", "mg road", "lavelle road", "hebbal", "marathahalli",
    "adyar", "anna nagar", "t nagar", "velachery", "omr", "ecr", "nungambakkam", 
    "alwarpet", "mylapore", "kilpauk"
]

NICHE_CONFIG = {
    "01_interior_designers": {
        "niche_name": "Interior Designers & Architects",
        "demo_link": "https://uncodedhub.com/web-design/interior-designers/",
        "pitch_hook": "showcase 3D renders vs built site photography, interactive quotation estimators, and project lookbooks"
    },
    "03_dental_aesthetic_clinics": {
        "niche_name": "Dental Clinics & Aesthetic Centers",
        "demo_link": "https://uncodedhub.com/web-design/dental-clinics/",
        "pitch_hook": "allow anxious patients to book appointments in 2 taps, view treatment pricing transparently, and see verified smile makeover results"
    },
    "05_home_renovation_modular_kitchens": {
        "niche_name": "Home Renovation & Modular Kitchens",
        "demo_link": "https://uncodedhub.com/web-design/interior-designers/",
        "pitch_hook": "showcase kitchen finish catalogues, 3D layouts, and instant quote booking for homeowners"
    },
    "02_real_estate_agents": {
        "niche_name": "Luxury Real Estate Brokers",
        "demo_link": "https://uncodedhub.com/web-design/real-estate/",
        "pitch_hook": "showcase exclusive property walkthroughs, floorplans, and capture high-net-worth investor inquiries directly"
    }
}

def extract_locality(address):
    addr_lower = (address or "").lower()
    for loc in PREMIUM_LOCALITIES:
        if loc in addr_lower:
            return loc.title()
    # Check for road names
    if "100 feet" in addr_lower:
        return "Indiranagar"
    if "sir thyagaraya" in addr_lower:
        return "T Nagar"
    return ""

def score_lead(website, rating_str, reviews_num, address):
    score = 0
    reasons = []

    # 1. Website Status
    web = (website or "").strip().lower()
    has_web = bool(web and web not in ['none', 'n/a', 'http://', 'https://'])
    
    if not has_web:
        score += 3
        reasons.append("No independent website (+3)")
    elif any(bad in web for bad in ['instagram.com', 'facebook.com', 'justdial.com', 'indiamart.com', 'wa.me']):
        score += 2
        reasons.append("Social/Chat/Directory link only (+2)")
    else:
        score += 0

    # 2. Reviews & Rating
    try:
        r = float(rating_str) if rating_str else 0.0
        rev = int(reviews_num) if reviews_num else 0
        if r >= 4.0 and rev >= 15:
            score += 2
            reasons.append(f"Strong Google reputation ({r}★, {rev} reviews) (+2)")
        elif r >= 4.0:
            score += 1
            reasons.append(f"High Google rating ({r}★) (+1)")
    except Exception:
        pass

    # 3. Premium Locality
    locality = extract_locality(address)
    if locality:
        score += 2
        reasons.append(f"Prime commercial locality: {locality} (+2)")

    # 4. Inactive check
    addr_lower = (address or "").lower()
    if "permanently closed" in addr_lower or "temporarily closed" in addr_lower:
        score -= 5
        reasons.append("Inactive/Closed (-5)")

    return score, locality, "; ".join(reasons)

def build_whatsapp_pitch(biz_name, niche_name, city, locality, demo_link, pitch_hook):
    loc_phrase = f"in {locality}, {city}" if locality else f"in {city}"
    return (
        f"Hi {biz_name} Team,\n\n"
        f"I came across your business while researching reputable {niche_name.lower()} {loc_phrase} on Google.\n\n"
        f"You have a great reputation on Google, but I noticed you don't have an independent, high-speed website to {pitch_hook}.\n\n"
        f"At Uncoded Hub (Bengaluru), we build bespoke, sub-second business websites delivered in exactly 7 working days — backed by a written guarantee: on time, or the build is 100% free.\n\n"
        f"We've actually engineered a live, interactive 7-day specimen for your industry that you can test right here on mobile:\n"
        f"{demo_link}\n\n"
        f"Would you be open to a quick 5-minute look to see how a custom platform could bring you qualified, pre-sold client inquiries?\n\n"
        f"Best regards,\n"
        f"Deepak & Geetha\n"
        f"Co-Founders, Uncoded Hub\n"
        f"https://uncodedhub.com · WhatsApp: +91 87784 27958"
    )

def build_phone_script(biz_name, niche_name, city, phone, demo_link):
    return (
        f"1. OPENING: 'Hi, am I speaking with the owner or practice manager of {biz_name}? My name is Deepak, co-founder of Uncoded Hub here in {city}.'\n"
        f"2. REASON: 'I was looking at top-rated {niche_name.lower()} in {city} on Google Maps and came across your profile. You have excellent reviews, but I noticed you don't have an independent mobile-optimized website linked — which means patients/clients searching on their phones cannot easily view your full work, transparent pricing, or book appointments directly.'\n"
        f"3. THE HOOK: 'Rather than pitching you blindly, our studio built a live interactive working specimen specifically for {niche_name.lower()} with sub-second speed and a 7-day delivery sprint guarantee: on time, or it's 100% free.'\n"
        f"4. CALL TO ACTION: 'I just sent the live demo link to your WhatsApp on this number ({phone}). Could you open it while we're on the line? It takes just 15 seconds to look at.'"
    )

def main():
    print("Running Uncoded Hub Priority Lead Extractor from gmaps_data.js...")
    
    js_path = "local_map_outreach/gmaps_data.js"
    if not os.path.exists(js_path):
        print(f"Error: {js_path} not found.")
        return

    with open(js_path, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"window\.GMAPS_LEADS\s*=\s*(\{.*\});?", content, re.DOTALL)
    if not match:
        print("Error: Could not parse window.GMAPS_LEADS JSON.")
        return

    raw_data = json.loads(match.group(1))
    
    all_qualified_leads = []
    
    # Priority order of niches to process:
    # 1. Interior Designers (01)
    # 2. Dental Clinics (03)
    # 3. Home Renovation (05)
    # 4. Real Estate (02)
    process_order = [
        "01_interior_designers",
        "03_dental_aesthetic_clinics",
        "05_home_renovation_modular_kitchens",
        "02_real_estate_agents"
    ]
    
    lead_counter = 1001

    seen_phones = set()
    seen_names = set()
    
    # Exclude massive national conglomerates/franchises where local manager has no website buying authority
    EXCLUDED_CHAINS = ["nobroker", "ifb point", "livspace", "homelane"]

    for niche_key in process_order:
        items = raw_data.get(niche_key, [])
        config = NICHE_CONFIG.get(niche_key, {
            "niche_name": niche_key,
            "demo_link": "https://uncodedhub.com",
            "pitch_hook": "showcase services and capture customer inquiries directly"
        })
        
        for item in items:
            name = (item.get("name") or "").strip()
            phone = (item.get("phone") or "").strip()
            website = (item.get("website") or "").strip()
            rating = (item.get("rating") or "").strip()
            reviews = item.get("parsed_reviews") or 0
            address = (item.get("address") or "").strip()
            city = (item.get("city") or "Bengaluru").strip()
            maps_link = (item.get("maps_link") or "").strip()
            target_category = item.get("target_category", "")

            # Filter: must have a phone number, and must be Target 1 (No website or Social only)
            is_target_1 = "TARGET 1" in target_category or not website or any(s in website.lower() for s in ['instagram.com', 'facebook.com', 'wa.me'])
            
            if not is_target_1 or not phone or len(phone) < 7:
                continue

            # Skip national conglomerates
            name_lower = name.lower()
            if any(chain in name_lower for chain in EXCLUDED_CHAINS):
                continue

            # Format clean phone number
            clean_phone = phone.replace("+91", "").strip()
            clean_name_key = re.sub(r'[^a-zA-Z0-9]', '', name_lower)

            if clean_phone in seen_phones or clean_name_key in seen_names:
                continue

            seen_phones.add(clean_phone)
            seen_names.add(clean_name_key)

            score, locality, reasons = score_lead(website, rating, reviews, address)
            
            # Build pitch and call scripts
            wa_pitch = build_whatsapp_pitch(name, config["niche_name"], city, locality, config["demo_link"], config["pitch_hook"])
            phone_script = build_phone_script(name, config["niche_name"], city, clean_phone, config["demo_link"])
            
            web_status_display = "No Website (Gold Lead)" if not website else f"Social/Subdomain Only ({website[:35]}...)"

            all_qualified_leads.append({
                "Lead ID": f"UH-{lead_counter}",
                "Business Name": name,
                "Niche": config["niche_name"],
                "City": city,
                "Locality": locality or "Central Hub",
                "Phone / WhatsApp": clean_phone,
                "Google Rating": f"{rating}★" if rating else "N/A",
                "Google Reviews": reviews,
                "Website Status": web_status_display,
                "Lead Score": score,
                "Scoring Breakdown": reasons,
                "Google Maps Link": maps_link,
                "Personalized WhatsApp Pitch": wa_pitch,
                "Phone Call Script": phone_script,
                "Demo Link Sent": config["demo_link"],
                "Outreach Status": "Ready to Contact",
                "Contact Date": "",
                "Response / Outcome": "",
                "Follow-up Date": "",
                "Meeting / Demo Booked": ""
            })
            lead_counter += 1

    print(f"Total Target 1 Leads Processed with Phone: {len(all_qualified_leads)}")
    
    # Sort by Lead Score descending, then by Google Reviews descending
    all_qualified_leads.sort(key=lambda x: (x["Lead Score"], int(x["Google Reviews"]) if isinstance(x["Google Reviews"], int) else 0), reverse=True)

    # Save Master Priority Pipeline CSV
    pipeline_csv = "local_map_outreach/UncodedHub_Priority_Outreach_Pipeline.csv"
    if all_qualified_leads:
        keys = list(all_qualified_leads[0].keys())
        with open(pipeline_csv, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=keys)
            writer.writeheader()
            writer.writerows(all_qualified_leads)
        print(f"Saved {len(all_qualified_leads)} leads to: {pipeline_csv}")

    # Create Top 50 Immediate Action Batch:
    # Balanced selection:
    # 25 Interior Designers & Modular Kitchens
    # 25 Dental Clinics & Healthcare
    interiors = [l for l in all_qualified_leads if "Interior" in l["Niche"] or "Home Renovation" in l["Niche"]][:25]
    dentals = [l for l in all_qualified_leads if "Dental" in l["Niche"]][:25]
    
    top_50 = interiors + dentals
    # If less than 50, pad with top remaining
    if len(top_50) < 50:
        remaining = [l for l in all_qualified_leads if l not in top_50]
        top_50.extend(remaining[:(50 - len(top_50))])
    
    top_50_csv = "local_map_outreach/UncodedHub_Top50_Immediate_Outreach.csv"
    with open(top_50_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(top_50)
    print(f"Saved Top 50 Immediate Action Batch to: {top_50_csv}")

if __name__ == "__main__":
    main()
