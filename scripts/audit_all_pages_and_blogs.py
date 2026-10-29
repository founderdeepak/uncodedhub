import os
import csv
import re
import json

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub"
blog_dir = os.path.join(base_dir, "src", "content", "blog")
gsc_pages_path = os.path.join(base_dir, "Google SEO Report", "performance-oct27", "Pages.csv")
gsc_queries_path = os.path.join(base_dir, "Google SEO Report", "performance-oct27", "Queries.csv")

# 1. Load GSC Pages data
gsc_pages = {}
if os.path.exists(gsc_pages_path):
    with open(gsc_pages_path, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row["Top pages"].strip()
            gsc_pages[url] = {
                "clicks": int(row.get("Clicks", 0)),
                "impressions": int(row.get("Impressions", 0)),
                "ctr": row.get("CTR", "0%"),
                "position": float(row.get("Position", 0.0))
            }

print(f"Loaded {len(gsc_pages)} pages from GSC Pages.csv")

# 2. Parse all blogs
blogs = []
blog_files = [f for f in os.listdir(blog_dir) if f.endswith(".md")]
print(f"Found {len(blog_files)} markdown files in src/content/blog/")

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
        colon_idx = line.find(":")
        if colon_idx != -1:
            key = line[:colon_idx].strip()
            val = line[colon_idx+1:].strip()
            # strip quotes
            if val.startswith('"') and val.endswith('"'):
                val = val[1:-1]
            elif val.startswith("'") and val.endswith("'"):
                val = val[1:-1]
            meta[key] = val
    return meta, body

for f in blog_files:
    slug = f[:-3]
    file_path = os.path.join(blog_dir, f)
    meta, body = parse_frontmatter(file_path)
    
    url = f"https://uncodedhub.com/blog/{slug}/"
    url_no_slash = f"https://uncodedhub.com/blog/{slug}"
    
    # check if in GSC
    gsc_data = gsc_pages.get(url) or gsc_pages.get(url_no_slash)
    
    blogs.append({
        "slug": slug,
        "file": f,
        "title": meta.get("title", ""),
        "niche": meta.get("niche", "general"),
        "target_keywords": meta.get("keywords", ""),
        "metaDescription": meta.get("metaDescription", ""),
        "has_cta": "7-day" in body.lower() or "uncoded hub" in body.lower() or "book" in body.lower() or "audit" in body.lower(),
        "word_count": len(body.split()),
        "gsc": gsc_data
    })

# 3. Analyze niches breakdown
niche_stats = {}
for b in blogs:
    n = b["niche"]
    if n not in niche_stats:
        niche_stats[n] = {
            "total_blogs": 0,
            "ranked_blogs": 0,
            "total_impressions": 0,
            "total_clicks": 0,
            "top_posts": []
        }
    niche_stats[n]["total_blogs"] += 1
    if b["gsc"]:
        niche_stats[n]["ranked_blogs"] += 1
        niche_stats[n]["total_impressions"] += b["gsc"]["impressions"]
        niche_stats[n]["total_clicks"] += b["gsc"]["clicks"]
        niche_stats[n]["top_posts"].append({
            "slug": b["slug"],
            "title": b["title"],
            "clicks": b["gsc"]["clicks"],
            "impressions": b["gsc"]["impressions"],
            "position": b["gsc"]["position"],
            "keywords": b["target_keywords"]
        })

print("\n=== NICHE BY NICHE PERFORMANCE BREAKDOWN ===")
for n, data in sorted(niche_stats.items(), key=lambda x: x[1]["total_impressions"], reverse=True):
    print(f"Niche: {n:25s} | Blogs: {data['total_blogs']:2d} | Ranked: {data['ranked_blogs']:2d} | Imp: {data['total_impressions']:4d} | Clicks: {data['total_clicks']:2d}")

# 4. Check core pages
core_pages = [
    "https://uncodedhub.com/",
    "https://uncodedhub.com/about/",
    "https://uncodedhub.com/contact/",
    "https://uncodedhub.com/portfolio/",
    "https://uncodedhub.com/blog/",
    "https://uncodedhub.com/audit-checklist/",
    "https://uncodedhub.com/privacy/",
    "https://uncodedhub.com/terms/",
    "https://uncodedhub.com/faq/"
]

print("\n=== CORE PAGES PERFORMANCE ===")
for cp in core_pages:
    cp_no_slash = cp.rstrip("/")
    data = gsc_pages.get(cp) or gsc_pages.get(cp_no_slash)
    if data:
        print(f"URL: {cp:35s} | Clicks: {data['clicks']:2d} | Imp: {data['impressions']:4d} | Pos: {data['position']:.1f}")
    else:
        print(f"URL: {cp:35s} | Not ranking yet")

# 5. Check 17 Niche Landing Pages
print("\n=== 17 NICHE LANDING PAGES PERFORMANCE ===")
niche_landing_slugs = [
    'interior-designers', 'real-estate', 'dental-clinics', 'wedding-photographers',
    'home-renovation', 'coaches-consultants', 'educational-academy', 'gym-fitness-club',
    'business-portfolio', 'spa-wellness', 'salon-beauty', 'fitness-coach',
    'yoga-meditation', 'creative-portfolio', 'healthcare-diagnostics',
    'clinic-polyclinic', 'doctor-specialist'
]

for n in niche_landing_slugs:
    nl_url = f"https://uncodedhub.com/web-design/{n}/"
    nl_url_no_slash = f"https://uncodedhub.com/web-design/{n}"
    data = gsc_pages.get(nl_url) or gsc_pages.get(nl_url_no_slash)
    if data:
        print(f"Landing Page: {nl_url:50s} | Clicks: {data['clicks']:2d} | Imp: {data['impressions']:4d} | Pos: {data['position']:.1f}")
    else:
        print(f"Landing Page: {nl_url:50s} | In index, pending impression trigger")

# 6. Overall Summary Stats
blogs_with_impressions = [b for b in blogs if b["gsc"] and b["gsc"]["impressions"] > 0]
blogs_with_clicks = [b for b in blogs if b["gsc"] and b["gsc"]["clicks"] > 0]
print(f"\nTotal Blogs: {len(blogs)}")
print(f"Blogs currently generating impressions: {len(blogs_with_impressions)}")
print(f"Blogs currently generating clicks: {len(blogs_with_clicks)}")

# Save full audit JSON for deep lookup
with open(os.path.join(base_dir, "Google SEO Report", "all_blogs_audit_database.json"), "w", encoding="utf-8") as f:
    json.dump({
        "blogs": blogs,
        "niche_stats": niche_stats
    }, f, indent=2)

print("\nSaved all_blogs_audit_database.json successfully.")
