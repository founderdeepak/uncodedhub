import os
import csv
import json
import re

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub"
blog_dir = os.path.join(base_dir, "src", "content", "blog")
gsc_pages_path = os.path.join(base_dir, "Google SEO Report", "performance-oct27", "Pages.csv")
gsc_queries_path = os.path.join(base_dir, "Google SEO Report", "performance-oct27", "Queries.csv")

# Load GSC pages
gsc_pages = {}
if os.path.exists(gsc_pages_path):
    with open(gsc_pages_path, "r", encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            url = r["Top pages"].strip()
            gsc_pages[url] = {
                "clicks": int(r.get("Clicks", 0)),
                "impressions": int(r.get("Impressions", 0)),
                "ctr": r.get("CTR", "0%"),
                "position": float(r.get("Position", 0.0))
            }

# Load GSC queries
gsc_queries = []
if os.path.exists(gsc_queries_path):
    with open(gsc_queries_path, "r", encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            gsc_queries.append({
                "query": r["Top queries"].strip(),
                "clicks": int(r.get("Clicks", 0)),
                "impressions": int(r.get("Impressions", 0)),
                "ctr": r.get("CTR", "0%"),
                "position": float(r.get("Position", 0.0))
            })

print(f"Loaded {len(gsc_pages)} pages and {len(gsc_queries)} queries.")

# Parse all blogs
blog_files = [f for f in os.listdir(blog_dir) if f.endswith(".md")]

def parse_frontmatter(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    fm_match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if not fm_match:
        return {}, content
    fm_text = fm_match.group(1)
    body = content[fm_match.end():]
    meta = {}
    for line in fm_text.split("\n"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        c_idx = line.find(":")
        if c_idx != -1:
            k = line[:c_idx].strip()
            v = line[c_idx+1:].strip()
            if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                v = v[1:-1]
            meta[k] = v
    return meta, body

all_items = []
for f in blog_files:
    slug = f[:-3]
    file_path = os.path.join(blog_dir, f)
    meta, body = parse_frontmatter(file_path)
    url_slash = f"https://uncodedhub.com/blog/{slug}/"
    url_no_slash = f"https://uncodedhub.com/blog/{slug}"
    
    g = gsc_pages.get(url_slash) or gsc_pages.get(url_no_slash)
    
    # primary target keyword
    raw_kw = meta.get("keywords", "")
    kw_list = [k.strip() for k in raw_kw.split(",") if k.strip()]
    primary_kw = kw_list[0] if kw_list else meta.get("title", slug)
    
    # find related queries in GSC
    related_queries = []
    slug_tokens = set(slug.replace("-", " ").lower().split())
    for q in gsc_queries:
        q_tokens = set(q["query"].lower().split())
        overlap = len(slug_tokens & q_tokens)
        if overlap >= 2 or q["query"].lower() in meta.get("title", "").lower():
            related_queries.append(q)
    
    related_queries.sort(key=lambda x: x["impressions"], reverse=True)
    
    clicks = g["clicks"] if g else 0
    impressions = g["impressions"] if g else 0
    pos = g["position"] if g else 0.0
    ctr = g["ctr"] if g else "0%"
    
    if g:
        if clicks > 0:
            status = "Winner (Generating Clicks)"
            priority = 1
        elif pos <= 10.0 and impressions >= 10:
            status = "Page 1 Striking Distance (0 Clicks - URGENT FIX)"
            priority = 1
        elif pos <= 20.0 and impressions >= 5:
            status = "Page 2 Striking Distance (Push to Page 1)"
            priority = 2
        else:
            status = "Emerging Impressions"
            priority = 3
    else:
        status = "Indexed (Wave 3 - Awaiting Query Impressions)"
        priority = 4
        
    all_items.append({
        "type": "blog",
        "slug": slug,
        "url": url_slash,
        "niche": meta.get("niche", "general"),
        "title": meta.get("title", ""),
        "metaDescription": meta.get("metaDescription", ""),
        "target_keywords": raw_kw,
        "primary_keyword": primary_kw,
        "clicks": clicks,
        "impressions": impressions,
        "position": pos,
        "ctr": ctr,
        "status": status,
        "priority": priority,
        "top_queries": related_queries[:3]
    })

# Add core pages
core_pages_meta = [
    {
        "url": "https://uncodedhub.com/",
        "slug": "home",
        "niche": "core",
        "title": "Uncoded Hub — Let Your Website Sell Before You Do",
        "target_keywords": "website designing in 7 days, 7 day website design, custom business websites, fast react website studio",
        "primary_keyword": "website designing in 7 days"
    },
    {
        "url": "https://uncodedhub.com/about/",
        "slug": "about",
        "niche": "core",
        "title": "Studio — Uncoded Hub",
        "target_keywords": "uncoded hub, boutique web design studio bangalore, deepak geetha web designers",
        "primary_keyword": "boutique web design studio"
    },
    {
        "url": "https://uncodedhub.com/portfolio/",
        "slug": "portfolio",
        "niche": "core",
        "title": "Work & Interactive Specimen Builds — Uncoded Hub",
        "target_keywords": "interactive website specimens, custom portfolio web design, high ticket web agency portfolio",
        "primary_keyword": "high ticket web agency portfolio"
    },
    {
        "url": "https://uncodedhub.com/contact/",
        "slug": "contact",
        "niche": "core",
        "title": "Contact Studio — Uncoded Hub",
        "target_keywords": "hire web design studio, book website sprint, custom website quote",
        "primary_keyword": "book website sprint"
    },
    {
        "url": "https://uncodedhub.com/blog/",
        "slug": "blog-hub",
        "niche": "core",
        "title": "Architectural Blueprints & Conversion Field Notes — Uncoded Hub",
        "target_keywords": "web design blueprints, local business conversion guide, high ticket website strategy",
        "primary_keyword": "web design blueprints"
    },
    {
        "url": "https://uncodedhub.com/audit-checklist/",
        "slug": "audit-checklist",
        "niche": "core",
        "title": "12-Point Website Audit Checklist — Uncoded Hub",
        "target_keywords": "website audit checklist, site performance audit, conversion rate optimization checklist",
        "primary_keyword": "website audit checklist"
    }
]

for cp in core_pages_meta:
    g = gsc_pages.get(cp["url"]) or gsc_pages.get(cp["url"].rstrip("/"))
    clicks = g["clicks"] if g else 0
    impressions = g["impressions"] if g else 0
    pos = g["position"] if g else 0.0
    ctr = g["ctr"] if g else "0%"
    status = "Core Authority Asset (Generating Clicks)" if clicks > 0 else "Core Page"
    all_items.append({
        "type": "core",
        "slug": cp["slug"],
        "url": cp["url"],
        "niche": "core",
        "title": cp["title"],
        "metaDescription": "",
        "target_keywords": cp["target_keywords"],
        "primary_keyword": cp["primary_keyword"],
        "clicks": clicks,
        "impressions": impressions,
        "position": pos,
        "ctr": ctr,
        "status": status,
        "priority": 1 if impressions > 30 else 2,
        "top_queries": []
    })

# Add 17 Niche Landing Pages
niche_pillars = [
    ('interior-designers', 'Interior Designers & Architects'),
    ('real-estate', 'Real Estate & Property Consultants'),
    ('dental-clinics', 'Dental & Aesthetic Clinics'),
    ('wedding-photographers', 'Wedding Photographers & Event Planners'),
    ('home-renovation', 'Home Renovation & Modular Kitchens'),
    ('coaches-consultants', 'Coaches & Consultants'),
    ('educational-academy', 'Educational Academies & Coaching'),
    ('gym-fitness-club', 'Commercial Gyms & Fitness Clubs'),
    ('business-portfolio', 'Enterprise B2B & Corporate Advisory'),
    ('spa-wellness', 'Luxury Spas & Wellness Retreats'),
    ('salon-beauty', 'Salons & Bridal Beauty'),
    ('fitness-coach', 'Private Fitness Coaches'),
    ('yoga-meditation', 'Yoga Shalas & Meditation Sanctuaries'),
    ('creative-portfolio', 'Creative Studios & Agencies'),
    ('healthcare-diagnostics', 'Pathology & Diagnostic Labs'),
    ('clinic-polyclinic', 'Multi-Specialty Polyclinics'),
    ('doctor-specialist', 'Super-Specialist Doctors & Surgeons')
]

for slug, name in niche_pillars:
    url = f"https://uncodedhub.com/web-design/{slug}/"
    g = gsc_pages.get(url) or gsc_pages.get(url.rstrip("/"))
    clicks = g["clicks"] if g else 0
    impressions = g["impressions"] if g else 0
    pos = g["position"] if g else 0.0
    ctr = g["ctr"] if g else "0%"
    all_items.append({
        "type": "niche-pillar",
        "slug": slug,
        "url": url,
        "niche": slug,
        "title": f"7-Day Custom Web Design for {name} — Uncoded Hub",
        "metaDescription": f"Bespoke high-performance websites for {name}. Launched in 7 days, zero WordPress bloat, built-in SEO.",
        "target_keywords": f"{slug} website design, web design for {name}, best website builder {name}",
        "primary_keyword": f"web design for {name}" if "web design" in name else f"{name} website design",
        "clicks": clicks,
        "impressions": impressions,
        "position": pos,
        "ctr": ctr,
        "status": "Niche Landing Pillar (Indexed in Wave 3)",
        "priority": 2,
        "top_queries": []
    })

# Save master analysis json
with open(os.path.join(base_dir, "Google SEO Report", "master_website_audit.json"), "w", encoding="utf-8") as f:
    json.dump(all_items, f, indent=2)

print(f"Total analyzed entities: {len(all_items)}")

# Print Top 15 Striking Distance / Urgent Fix Items
urgent_fixes = [item for item in all_items if item["priority"] == 1 and item["clicks"] == 0]
urgent_fixes.sort(key=lambda x: x["impressions"], reverse=True)

print(f"\nFound {len(urgent_fixes)} Urgent Page 1 Striking Distance Items (High Impressions, 0 Clicks):")
for u in urgent_fixes[:15]:
    print(f"* [{u['niche']}] {u['title'][:55]}...")
    print(f"   URL: {u['url']}")
    print(f"   Rank: {u['position']:.1f} | Impressions: {u['impressions']} | Clicks: {u['clicks']}")
    print(f"   Target Keyword: {u['primary_keyword']}")
