import csv
import os

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub\Google SEO Report"
perf_oct27 = os.path.join(base_dir, "performance-oct27")

with open(os.path.join(perf_oct27, "Pages.csv"), "r", encoding="utf-8-sig") as f:
    pages = list(csv.DictReader(f))

no_slash = []
slash = []
for p in pages:
    url = p['Top pages']
    if url == "https://uncodedhub.com/":
        continue
    if url.endswith("/"):
        slash.append(p)
    else:
        no_slash.append(p)

print(f"Total ranking URLs in Pages.csv: {len(pages)}")
print(f"URLs with trailing slash: {len(slash)}")
print(f"URLs without trailing slash: {len(no_slash)}")
print("\nSample URLs without trailing slash that Google is serving:")
for p in no_slash[:15]:
    print(f"Clicks: {p['Clicks']} | Imp: {p['Impressions']} | Pos: {p['Position']} | URL: {p['Top pages']}")
