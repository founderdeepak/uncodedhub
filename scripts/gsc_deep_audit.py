import csv
import os
import json

def read_csv(path):
    if not os.path.exists(path):
        return []
    with open(path, mode='r', encoding='utf-8') as f:
        return list(csv.DictReader(f))

def main():
    extracted_oct11 = 'Google SEO Report/extracted-oct11'
    pages = read_csv(os.path.join(extracted_oct11, 'Pages.csv'))
    queries = read_csv(os.path.join(extracted_oct11, 'Queries.csv'))
    chart = read_csv(os.path.join(extracted_oct11, 'Chart.csv'))
    countries = read_csv(os.path.join(extracted_oct11, 'Countries.csv'))
    devices = read_csv(os.path.join(extracted_oct11, 'Devices.csv'))
    
    cov_path = 'Google SEO Report/uncodedhub.com-Coverage-2026-10-07'
    cov_chart = read_csv(os.path.join(cov_path, 'Chart.csv'))
    cov_crit = read_csv(os.path.join(cov_path, 'Critical issues.csv'))
    
    print("=" * 60)
    print("GOOGLE SEARCH CONSOLE DEEP PERFORMANCE AUDIT")
    print("=" * 60)
    
    tot_clicks = sum(int(r.get('Clicks', 0)) for r in chart if r.get('Clicks'))
    tot_impressions = sum(int(r.get('Impressions', 0)) for r in chart if r.get('Impressions'))
    avg_ctr = (tot_clicks / tot_impressions * 100) if tot_impressions else 0
    
    print(f"\n[1] LIFETIME PERFORMANCE SUMMARY:")
    print(f"Total Clicks:        {tot_clicks:,}")
    print(f"Total Impressions:   {tot_impressions:,}")
    print(f"Average CTR:         {avg_ctr:.2f}%")
    print(f"Indexed Pages in GSC: {len(pages)}")
    print(f"Tracked Queries:     {len(queries)}")
    
    # 2. Top Performing Pages
    pages_sorted_clicks = sorted(pages, key=lambda x: int(x.get('Clicks', 0)), reverse=True)
    print(f"\n[2] TOP 10 PAGES BY CLICKS:")
    for p in pages_sorted_clicks[:10]:
        print(f"  - {p.get('Top pages')}: {p.get('Clicks')} clicks | {p.get('Impressions')} imp | CTR: {p.get('CTR')} | Pos: {float(p.get('Position', 0)):.1f}")
        
    pages_sorted_imp = sorted(pages, key=lambda x: int(x.get('Impressions', 0)), reverse=True)
    print(f"\n[3] TOP 10 PAGES BY IMPRESSIONS (Search Demand):")
    for p in pages_sorted_imp[:10]:
        print(f"  - {p.get('Top pages')}: {p.get('Impressions')} imp | {p.get('Clicks')} clicks | Pos: {float(p.get('Position', 0)):.1f}")

    # 3. Striking Distance Opportunities (Positions 4 to 20 with impressions)
    striking = []
    for q in queries:
        pos = float(q.get('Position', 100))
        imp = int(q.get('Impressions', 0))
        clk = int(q.get('Clicks', 0))
        ctr = q.get('CTR', '0%')
        term = q.get('Top queries', '')
        if 3.0 <= pos <= 20.0 and imp >= 5:
            striking.append({'term': term, 'imp': imp, 'pos': pos, 'clk': clk, 'ctr': ctr})
            
    striking.sort(key=lambda x: x['imp'], reverse=True)
    print(f"\n[4] TOP STRIKING-DISTANCE KEYWORDS (Position 3-20 with >=5 impressions - QUICK WINS):")
    for s in striking[:20]:
        print(f"  - \"{s['term']}\" -> {s['imp']} imp | Pos: {s['pos']:.1f} | {s['clk']} clicks (CTR {s['ctr']})")
        
    # 4. Device and Country Breakdown
    print(f"\n[5] TRAFFIC BY COUNTRY (TOP 5):")
    for c in countries[:5]:
        print(f"  - {c.get('Country')}: {c.get('Clicks')} clicks | {c.get('Impressions')} imp")

    print(f"\n[6] TRAFFIC BY DEVICE:")
    for d in devices:
        print(f"  - {d.get('Device')}: {d.get('Clicks')} clicks | {d.get('Impressions')} imp")
        
    # 5. Coverage / Indexing status
    print(f"\n[7] INDEXING COVERAGE AUDIT:")
    if cov_chart:
        latest_cov = cov_chart[-1]
        print(f"  Latest Date: {latest_cov.get('Date')}")
        print(f"  Valid Indexed Pages: {latest_cov.get('Valid', 'N/A')}")
        print(f"  Excluded/Not Indexed: {latest_cov.get('Excluded', 'N/A')}")
        print(f"  Errors: {latest_cov.get('Error', '0')}")
    if cov_crit:
        print(f"  Critical Issues ({len(cov_crit)}):")
        for cr in cov_crit:
            print(f"    * {cr}")

if __name__ == '__main__':
    main()
