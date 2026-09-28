import os
import glob
import re
from collections import defaultdict

blog_dir = "src/content/blog"
files = glob.glob(os.path.join(blog_dir, "*.md"))

posts = []
for f in files:
    if f.endswith("README.md"):
        continue
    with open(f, "r", encoding="utf-8") as fh:
        text = fh.read()
    
    # parse frontmatter
    fm_match = re.search(r"^---\s*(.*?)\s*---", text, re.DOTALL)
    if fm_match:
        fm = fm_match.group(1)
        title_m = re.search(r'^title:\s*["\']?(.*?)["\']?$', fm, re.MULTILINE)
        niche_m = re.search(r'^niche:\s*["\']?(.*?)["\']?$', fm, re.MULTILINE)
        date_m = re.search(r'^date:\s*["\']?(.*?)["\']?$', fm, re.MULTILINE)
        
        title = title_m.group(1).strip() if title_m else os.path.splitext(os.path.basename(f))[0]
        niche = niche_m.group(1).strip() if niche_m else "general"
        slug = os.path.splitext(os.path.basename(f))[0]
        
        # calculate approximate reading time (200 wpm)
        words = len(text.split())
        read_time = f"{max(3, round(words / 200))} min read"
        
        posts.append({
            "slug": slug,
            "title": title,
            "niche": niche,
            "read_time": read_time,
            "file": os.path.basename(f)
        })

niche_display_map = {
    "interior-designers": "Interior Designers & Architects",
    "real-estate": "Real Estate & High-Value Builders",
    "dental-clinics": "Dental & Aesthetic Cosmetic Clinics",
    "wedding-photographers": "Luxury Wedding & Editorial Photographers",
    "home-renovation": "Home Renovation & Modular Kitchen Specialists",
    "coaches-consultants": "Executive Coaches & Strategic Consultants",
    "studio": "Core Web Architecture & Performance",
    "general": "Core Web Architecture & Performance"
}

groups = defaultdict(list)
for p in posts:
    silo_name = niche_display_map.get(p["niche"], p["niche"])
    groups[silo_name].append(p)

print("Group counts:")
for k, v in groups.items():
    print(f"  {k}: {len(v)}")



output_lines = [
    "# Uncoded Hub — 140 Blog Titles Queue for Canva Bulk Creation",
    "",
    "Use this document to rapidly copy and paste titles into your Canva Brand Templates.",
    f"**Total Articles Loaded**: {len(posts)}",
    "",
    "---",
    ""
]

niche_meta = {
    "Interior Designers & Architects": {
        "eyebrow": "INTERIOR ARCHITECTURE • LUXURY RESIDENTIAL",
        "icon": "golden-ratio.svg",
        "sublabel": "ARCH.GOLDEN-RATIO.V1",
        "accent": "#B8860B"
    },
    "Real Estate & High-Value Builders": {
        "eyebrow": "REAL ESTATE ARCHITECTURE • HIGH-VALUE BROKERAGE",
        "icon": "cadastral-grid.svg",
        "sublabel": "RE.CADASTRAL-GRID.V2",
        "accent": "#0E7490"
    },
    "Dental & Aesthetic Cosmetic Clinics": {
        "eyebrow": "CLINICAL ARCHITECTURE • PATIENT ACQUISITION",
        "icon": "medical-crosshair.svg",
        "sublabel": "CLINIC.CROSSHAIR.V1",
        "accent": "#059669"
    },
    "Luxury Wedding & Editorial Photographers": {
        "eyebrow": "EDITORIAL PHOTOGRAPHY • LUXURY INQUIRIES",
        "icon": "aperture-blades.svg",
        "sublabel": "PHOTO.APERTURE.V1",
        "accent": "#7C3AED"
    },
    "Home Renovation & Modular Kitchen Specialists": {
        "eyebrow": "BESPOKE RENOVATION • MODULAR CRAFTSMANSHIP",
        "icon": "cabinet-joinery.svg",
        "sublabel": "CRAFT.JOINERY.V1",
        "accent": "#D97706"
    },
    "Executive Coaches & Strategic Consultants": {
        "eyebrow": "STRATEGIC ADVISORY • EXECUTIVE AUTHORITY",
        "icon": "decision-matrix.svg",
        "sublabel": "STRATEGY.MATRIX.V1",
        "accent": "#4F46E5"
    },
    "Core Web Architecture & Performance": {
        "eyebrow": "CORE WEB VITALS • HIGH-PERFORMANCE DIGITAL",
        "icon": "terminal-speed.svg",
        "sublabel": "STUDIO.SPEED-CORE.V1",
        "accent": "#FF3B00"
    }
}

for silo_name, group_posts in sorted(groups.items()):
    meta = niche_meta.get(silo_name, {
        "eyebrow": f"{silo_name.upper()} • DIGITAL ARCHITECTURE",
        "icon": "terminal-speed.svg",
        "sublabel": "UNCODED.SPEC.V1",
        "accent": "#FF3B00"
    })
    
    output_lines.append(f"## 🏛️ {silo_name} ({len(group_posts)} Articles)")
    output_lines.append(f"- **Recommended Eyebrow**: `{meta['eyebrow']}`")
    output_lines.append(f"- **Primary Accent Color**: `{meta['accent']}`")
    output_lines.append(f"- **Right Panel SVG Icon**: `{meta['icon']}`")
    output_lines.append(f"- **Right Panel Sub-Label**: `{meta['sublabel']}`")
    output_lines.append("")
    output_lines.append("| # | Article Headline | Reading Time | Slug / Target File |")
    output_lines.append("| :--- | :--- | :--- | :--- |")
    
    for idx, item in enumerate(sorted(group_posts, key=lambda x: x['title']), 1):
        clean_title = item['title'].replace("|", "-")
        output_lines.append(f"| {idx:02d} | **{clean_title}** | {item['read_time']} | `{item['slug']}` |")
    
    output_lines.append("")
    output_lines.append("---")
    output_lines.append("")

target_path = "CANVA_Business/03_Brand_Templates/140_Blog_Titles_Queue.md"
with open(target_path, "w", encoding="utf-8") as out:
    out.write("\n".join(output_lines))

print(f"Successfully generated {target_path} with {len(posts)} articles across {len(groups)} silos.")
