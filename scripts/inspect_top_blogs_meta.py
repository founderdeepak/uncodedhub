import os
import csv
import json

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub"
db_path = os.path.join(base_dir, "Google SEO Report", "all_blogs_audit_database.json")
with open(db_path, "r", encoding="utf-8") as f:
    db = json.load(f)

blogs = db["blogs"]
ranked_blogs = [b for b in blogs if b["gsc"] and b["gsc"]["impressions"] > 0]
ranked_blogs.sort(key=lambda x: (x["gsc"]["clicks"], x["gsc"]["impressions"]), reverse=True)

print(f"Total ranked blogs: {len(ranked_blogs)}")
print("\nTop 25 Ranked Blogs & Their Current Meta:")
for i, b in enumerate(ranked_blogs[:25], 1):
    g = b["gsc"]
    print(f"\n#{i:02d}. [{b['niche']}] {b['title']}")
    print(f"    URL: https://uncodedhub.com/blog/{b['slug']}/")
    print(f"    GSC Stats: Clicks={g['clicks']} | Imp={g['impressions']} | CTR={g['ctr']} | Avg Pos={g['position']:.1f}")
    print(f"    Target Keywords: {b['target_keywords']}")
    print(f"    Meta Description: {b['metaDescription']}")
