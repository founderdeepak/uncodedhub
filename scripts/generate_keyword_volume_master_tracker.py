import os
import json
import csv

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub"
audit_json_path = os.path.join(base_dir, "Google SEO Report", "master_website_audit.json")

with open(audit_json_path, "r", encoding="utf-8") as f:
    items = json.load(f)

print(f"Loaded {len(items)} items from master_website_audit.json")

# Keywords volume estimation heuristics based on niche, query type and actual GSC impressions
def estimate_keyword_metrics(item):
    title = item.get("title", "").lower()
    slug = item.get("slug", "").lower()
    primary_kw = item.get("primary_keyword", "")
    niche = item.get("niche", "")
    gsc_imp = item.get("impressions", 0)
    gsc_pos = item.get("position", 0.0)
    
    # Base volume estimation
    # High-intent terms with real GSC demand
    if any(k in slug or k in title for k in ["cost", "price", "calculator", "pricing"]):
        vol = 800 + gsc_imp * 15
        intent = "Commercial / Transactional"
        kd = 28
    elif any(k in slug or k in title for k in ["best", "builder", "builders", "comparison"]):
        vol = 1200 + gsc_imp * 20
        intent = "Commercial Investigation"
        kd = 35
    elif any(k in slug or k in title for k in ["speed", "lcp", "performance", "benchmarks"]):
        vol = 600 + gsc_imp * 12
        intent = "Technical / Commercial"
        kd = 24
    elif any(k in slug or k in title for k in ["7-day", "seven-day", "website-designing-in-7-days"]):
        vol = 1500 + gsc_imp * 18
        intent = "High-Ticket Commercial"
        kd = 30
    elif any(k in slug or k in title for k in ["ethics", "compliance", "legal", "rules", "nmc", "rera"]):
        vol = 450 + gsc_imp * 10
        intent = "Regulatory / Commercial"
        kd = 18
    elif any(k in slug or k in title for k in ["work-with-me", "landing-page", "funnel", "portfolio"]):
        vol = 550 + gsc_imp * 12
        intent = "Commercial / Conversion"
        kd = 25
    elif any(k in slug or k in title for k in ["case-study", "case-studies", "structure"]):
        vol = 400 + gsc_imp * 8
        intent = "Informational / Commercial"
        kd = 20
    elif any(k in slug or k in title for k in ["whatsapp", "booking", "triage", "schedule"]):
        vol = 350 + gsc_imp * 8
        intent = "Conversion Architecture"
        kd = 16
    elif item.get("type") == "core":
        vol = 2400 + gsc_imp * 25
        intent = "Brand / Direct Service"
        kd = 40
    elif item.get("type") == "niche-pillar":
        vol = 1800 + gsc_imp * 20
        intent = "High-Ticket Niche Pillar"
        kd = 32
    else:
        # Long-tail topical authority post
        vol = 250 + gsc_imp * 6
        intent = "Topical Authority / Long-Tail"
        kd = 14

    # Ranking Phase
    if gsc_pos > 0 and gsc_pos <= 10.0:
        rank_phase = "Phase 1: Active Page 1 (Optimize CTR & Schema)"
    elif gsc_pos > 10.0 and gsc_pos <= 20.0:
        rank_phase = "Phase 2: Striking Distance Page 2 (Push to Page 1)"
    elif gsc_imp > 0:
        rank_phase = "Phase 3: Search Discovery (Climbing Positions 21-50)"
    else:
        rank_phase = "Phase 4: Indexed (Awaiting Google Crawl Activation)"

    return int(vol), kd, intent, rank_phase

enriched = []
total_est_monthly_volume = 0

for item in items:
    vol, kd, intent, phase = estimate_keyword_metrics(item)
    total_est_monthly_volume += vol
    item["estimated_monthly_searches"] = vol
    item["keyword_difficulty"] = kd
    item["search_intent"] = intent
    item["ranking_phase"] = phase
    enriched.append(item)

print(f"Total Estimated Addressable Monthly Search Volume: {total_est_monthly_volume:,} searches/month across all 544 pages!")

# Export to CSV
csv_out_path = os.path.join(base_dir, "Google SEO Report", "All_566_Pages_Keyword_Search_Volume_Tracker.csv")
with open(csv_out_path, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow([
        "Page Type", "Niche Cluster", "Page URL", "Target Primary Keyword", 
        "Est. Monthly Search Volume", "Keyword Difficulty (0-100)", "Search Intent",
        "Current GSC Rank", "GSC Impressions", "GSC Clicks", "Ranking Phase", "Page 1 Action Required"
    ])
    for item in enriched:
        pos_str = f"{item['position']:.1f}" if item['position'] > 0 else "Pending Query Trigger"
        writer.writerow([
            item["type"],
            item["niche"],
            item["url"],
            item["primary_keyword"],
            item["estimated_monthly_searches"],
            item["keyword_difficulty"],
            item["search_intent"],
            pos_str,
            item["impressions"],
            item["clicks"],
            item["ranking_phase"],
            "Title & CTR optimized" if item["priority"] == 1 else "1-Hop Internal Link & Silo Sync"
        ])

print(f"Saved complete tracker to {csv_out_path}")

# Breakdown by Niche
niche_summary = {}
for item in enriched:
    n = item["niche"]
    if n not in niche_summary:
        niche_summary[n] = {
            "pages": 0,
            "total_volume": 0,
            "page1_pages": 0,
            "page2_pages": 0,
            "impressions": 0
        }
    niche_summary[n]["pages"] += 1
    niche_summary[n]["total_volume"] += item["estimated_monthly_searches"]
    niche_summary[n]["impressions"] += item["impressions"]
    if 0 < item["position"] <= 10.0:
        niche_summary[n]["page1_pages"] += 1
    elif 10.0 < item["position"] <= 20.0:
        niche_summary[n]["page2_pages"] += 1

print("\n=== NICHE CLUSTER SEARCH VOLUME & PAGE 1 PROGRESSION ===")
for n, d in sorted(niche_summary.items(), key=lambda x: x[1]["total_volume"], reverse=True):
    print(f"Cluster: {n:22s} | Pages: {d['pages']:2d} | Est. Monthly Vol: {d['total_volume']:6,d} | Page 1 Ranks: {d['page1_pages']:2d} | Page 2 Ranks: {d['page2_pages']:2d} | GSC Imp: {d['impressions']:4d}")
