import glob
import re
import urllib.request
import ssl

ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

demos_6 = [
    ("Meridian Interiors", "Demo Website Template for 6 NIches/meridian-interiors-demo.html"),
    ("Marlow Realty", "Demo Website Template for 6 NIches/marlow-realty-demo.html"),
    ("Willowmere Dental", "Demo Website Template for 6 NIches/willowmere-dental-demo.html"),
    ("Alder & Wren Photography", "Demo Website Template for 6 NIches/alder-wren-photography-demo.html"),
    ("Halbrook Renovation", "Demo Website Template for 6 NIches/halbrook-renovation-demo.html"),
    ("Naomi Reyes Coaching", "Demo Website Template for 6 NIches/naomi-reyes-coaching-demo.html"),
]

demos_11 = [
    ("Apex Educational Academy", "Demo Website Template for New Niches/01_educational_academy_demo.html"),
    ("IronVault Fitness Club", "Demo Website Template for New Niches/02_gym_fitness_club_demo.html"),
    ("Vanguard Business Advisory", "Demo Website Template for New Niches/03_business_portfolio_demo.html"),
    ("SereneSanctuary Spa", "Demo Website Template for New Niches/04_spa_wellness_sanctuary_demo.html"),
    ("LuxeAura Salon", "Demo Website Template for New Niches/05_salon_beauty_studio_demo.html"),
    ("ForgePro Fitness Coach", "Demo Website Template for New Niches/06_fitness_coach_trainer_demo.html"),
    ("PranaPulse Yoga", "Demo Website Template for New Niches/07_yoga_meditation_studio_demo.html"),
    ("AuraGrid Creative Studio", "Demo Website Template for New Niches/08_creative_portfolio_demo.html"),
    ("ApexPulse Diagnostics", "Demo Website Template for New Niches/09_healthcare_diagnostics_demo.html"),
    ("OmniCare Polyclinic", "Demo Website Template for New Niches/10_clinic_polyclinic_demo.html"),
    ("Dr. Alistair Vance Specialist", "Demo Website Template for New Niches/11_doctor_specialist_demo.html"),
]

all_17 = demos_6 + demos_11

print(f"Total Demos in full set: {len(all_17)}")

image_report = {}
all_urls = set()

for title, path in all_17:
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Extract images
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    bg_imgs = re.findall(r'background(?:-image)?:\s*url\(["\']?([^"\'\)]+)["\']?\)', html)
    combined = list(dict.fromkeys(imgs + bg_imgs))
    
    image_report[title] = {
        "path": path,
        "count": len(combined),
        "urls": combined,
        "has_price_22500": "22500" in html or "22,500" in html,
        "has_wa_dummy": "919999999999" in html
    }
    for u in combined:
        if u.startswith("http"):
            all_urls.add(u)

print("\n--- AUDIT SUMMARY ---")
for title, data in image_report.items():
    print(f"[{title}] - Images: {data['count']}, Has 22,500 Price: {data['has_price_22500']}, Has Dummy WA (9999999999): {data['has_wa_dummy']}")

print(f"\nTotal unique external HTTP image URLs to verify: {len(all_urls)}")

# Quick HEAD/GET test on sample or all URLs
broken = []
for u in sorted(list(all_urls)):
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        req.get_method = lambda: 'HEAD'
        with urllib.request.urlopen(req, timeout=5, context=ssl_context) as resp:
            if resp.status >= 400:
                broken.append((u, resp.status))
    except Exception as e:
        # Fallback to GET with Range 0-10
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0', 'Range': 'bytes=0-10'})
            with urllib.request.urlopen(req, timeout=5, context=ssl_context) as resp:
                if resp.status >= 400:
                    broken.append((u, str(e)))
        except Exception as e2:
            broken.append((u, str(e2)))

if broken:
    print(f"\n[WARNING] Broken URLs found ({len(broken)}):")
    for b in broken:
        print(f"  - {b[0]} -> {b[1]}")
else:
    print(f"\n[SUCCESS] All {len(all_urls)} external image URLs verified successfully and return valid HTTP status (200 OK)!")
