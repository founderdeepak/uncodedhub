import csv
import time
import requests

API_KEY = input("Paste your Zernio API key (starts with sk_): ").strip()
URL = "https://zernio.com/api/v1/posts"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

rows = []
seen = set()

def add(p):
    if p.get("_id") in seen:
        return
    seen.add(p["_id"])
    platforms = p.get("platforms") or [{}]
    items = (platforms[0].get("platformSpecificData") or {}).get("threadItems", [])
    text = "\n---\n".join(i.get("content", "") for i in items) or p.get("content", "")
    rows.append({
        "id": p.get("_id"),
        "title": p.get("title", ""),
        "status": p.get("status"),
        "scheduledFor": p.get("scheduledFor"),
        "thread": text,
    })

for status in ["published", "scheduled", "failed", "draft"]:
    page, empty_in_a_row, total_pages = 1, 0, None
    while True:
        r = requests.get(URL, headers=HEADERS,
                         params={"page": page, "limit": 100, "status": status})
        if r.status_code != 200:
            print(status, "error", r.status_code, r.text[:300])
            break
        data = r.json()
        pg = data.get("pagination") or {}
        if page == 1:
            print(status, "pagination:", pg)
            total_pages = pg.get("pages") or pg.get("totalPages")
        posts = data.get("posts") or []
        before = len(rows)
        for p in posts:
            add(p)
        print(status, "page", page, "new:", len(rows) - before, "total:", len(rows))
        if not posts:
            break
        empty_in_a_row = empty_in_a_row + 1 if len(rows) == before else 0
        if total_pages and page >= total_pages:
            break
        if empty_in_a_row >= 3:
            break
        page += 1
        time.sleep(0.3)

if rows:
    with open("zernio_posts.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    print(len(rows), "posts saved to zernio_posts.csv")