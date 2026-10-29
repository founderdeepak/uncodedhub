import csv
import os

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub\Google SEO Report"
cov_oct27 = os.path.join(base_dir, "coverage-oct27")
perf_oct27 = os.path.join(base_dir, "performance-oct27")
cov_oct23 = os.path.join(base_dir, "coverage-oct23")
perf_oct23 = os.path.join(base_dir, "performance-oct23")

print("==========================================")
print("1. COVERAGE & INDEXATION EVOLUTION")
print("==========================================")

# Check Chart.csv from coverage-oct27
chart_cov = os.path.join(cov_oct27, "Chart.csv")
with open(chart_cov, "r", encoding="utf-8-sig") as f:
    r = list(csv.reader(f))
    header = r[0]
    print(f"Coverage Header: {header}")
    # print last 10 dates
    print("Recent Coverage Progression:")
    for row in r[-10:]:
        print(f"Date: {row[0]} | Not Indexed: {row[1]} | Indexed: {row[2]} | Impressions: {row[3]}")

# Issues comparison
crit_23_path = os.path.join(cov_oct23, "Critical issues.csv")
crit_27_path = os.path.join(cov_oct27, "Critical issues.csv")

def read_issues(path):
    d = {}
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                d[row["Reason"]] = {
                    "Source": row.get("Source", ""),
                    "Validation": row.get("Validation", ""),
                    "Pages": int(row.get("Pages", "0"))
                }
    return d

issues_23 = read_issues(crit_23_path)
issues_27 = read_issues(crit_27_path)

print("\n--- ISSUE BY ISSUE DELTA ---")
all_reasons = set(issues_23.keys()) | set(issues_27.keys())
for reason in sorted(all_reasons):
    p23 = issues_23.get(reason, {}).get("Pages", 0)
    p27 = issues_27.get(reason, {}).get("Pages", 0)
    v27 = issues_27.get(reason, {}).get("Validation", "")
    delta = p27 - p23
    sign = f"+{delta}" if delta > 0 else str(delta)
    print(f"* {reason}: {p23} -> {p27} ({sign}) | Status: {v27}")

print("\n==========================================")
print("2. PERFORMANCE & SEARCH TRAFFIC SNAPSHOT")
print("==========================================")

def get_totals(perf_folder):
    chart_path = os.path.join(perf_folder, "Chart.csv")
    total_clicks = 0
    total_impressions = 0
    with open(chart_path, "r", encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if len(row) >= 3 and row[1] and row[2]:
                total_clicks += int(row[1])
                total_impressions += int(row[2])
    return total_clicks, total_impressions

c23, i23 = get_totals(perf_oct23)
c27, i27 = get_totals(perf_oct27)
print(f"Total Clicks: {c23} (Oct 23) -> {c27} (Oct 27) [+{c27-c23} clicks]")
print(f"Total Impressions: {i23} (Oct 23) -> {i27} (Oct 27) [+{i27-i23} impressions]")

# Pages
with open(os.path.join(perf_oct27, "Pages.csv"), "r", encoding="utf-8-sig") as f:
    pages_27 = list(csv.DictReader(f))

with open(os.path.join(perf_oct23, "Pages.csv"), "r", encoding="utf-8-sig") as f:
    pages_23 = list(csv.DictReader(f))

print(f"\nUnique Ranking URLs in Google Search: {len(pages_23)} (Oct 23) -> {len(pages_27)} (Oct 27) [+{len(pages_27)-len(pages_23)} new ranking pages!]")

print("\nTop 15 Pages by Clicks & Impressions (Oct 27):")
for i, p in enumerate(pages_27[:15], 1):
    print(f"{i:2d}. {p['Top pages']}")
    print(f"    Clicks: {p['Clicks']} | Impressions: {p['Impressions']} | CTR: {p['CTR']} | Avg Position: {p['Position']}")

# Queries
with open(os.path.join(perf_oct27, "Queries.csv"), "r", encoding="utf-8-sig") as f:
    queries_27 = list(csv.DictReader(f))

with open(os.path.join(perf_oct23, "Queries.csv"), "r", encoding="utf-8-sig") as f:
    queries_23 = list(csv.DictReader(f))

print(f"\nTracked Search Queries: {len(queries_23)} (Oct 23) -> {len(queries_27)} (Oct 27) [+{len(queries_27)-len(queries_23)} new queries ranking!]")

print("\nTop 15 Queries by Impressions / Clicks (Oct 27):")
for i, q in enumerate(queries_27[:15], 1):
    print(f"{i:2d}. \"{q['Top queries']}\" -> Clicks: {q['Clicks']}, Imp: {q['Impressions']}, CTR: {q['CTR']}, Pos: {q['Position']}")

# Find high-potential queries in Striking Distance (Position 4 to 20 with impressions)
striking = []
for q in queries_27:
    try:
        pos = float(q['Position'])
        imp = int(q['Impressions'])
        if 3.0 <= pos <= 20.0 and imp >= 5:
            striking.append((imp, pos, q['Clicks'], q['Top queries']))
    except:
        pass

striking.sort(key=lambda x: x[0], reverse=True)
print(f"\nTop High-Potential Striking Distance Queries (Pos 3-20, >=5 impressions): {len(striking)} queries found")
for imp, pos, clicks, query in striking[:15]:
    print(f"   * \"{query}\": {imp} imp | Pos {pos:.1f} | {clicks} clicks")

# Countries
with open(os.path.join(perf_oct27, "Countries.csv"), "r", encoding="utf-8-sig") as f:
    countries_27 = list(csv.DictReader(f))

print("\nTop Countries (Oct 27):")
for c in countries_27[:8]:
    print(f"   * {c['Country']}: {c['Clicks']} clicks, {c['Impressions']} impressions, CTR: {c['CTR']}")

# Devices
with open(os.path.join(perf_oct27, "Devices.csv"), "r", encoding="utf-8-sig") as f:
    devices = list(csv.DictReader(f))
print("\nDevices Breakdown:")
for d in devices:
    print(f"   * {d['Device']}: {d['Clicks']} clicks, {d['Impressions']} impressions, CTR: {d['CTR']}")
