import csv
import json
import time
import requests

API_KEY = input("Paste your NEW Zernio API key (starts with sk_): ").strip()
PROFILE_ID = "6aa3cf71140c55ec71a9ce43"
URL = "https://zernio.com/api/v1/analytics"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

# One window is at most 366 days. Change FROM_DATE if your account is older.
FROM_DATE = "2026-05-01"
TO_DATE = "2026-11-30"

rows = []
seen = set()
page = 1
total_pages = None

while True:
    r = requests.get(
        URL,
        headers=HEADERS,
        params={
            "profileId": PROFILE_ID,
            "fromDate": FROM_DATE,
            "toDate": TO_DATE,
            "limit": 50,
            "page": page,
        },
    )
    if r.status_code != 200:
        print("Error", r.status_code, r.text[:500])
        break

    data = r.json()
    posts = data.get("posts") or []
    pg = data.get("pagination") or {}

    if page == 1:
        print("Overview:", data.get("overview"))
        print("Pagination:", pg)
        if posts:
            print("Fields in a post:", list(posts[0].keys()))
        total_pages = pg.get("pages") or pg.get("totalPages")

    before = len(rows)
    for p in posts:
        pid = p.get("_id") or p.get("postId") or json.dumps(p, sort_keys=True)[:200]
        if pid in seen:
            continue
        seen.add(pid)
        row = {}
        for k, v in p.items():
            row[k] = json.dumps(v, ensure_ascii=False) if isinstance(v, (dict, list)) else v
        rows.append(row)

    print("Page", page, "new:", len(rows) - before, "total:", len(rows))

    if not posts:
        break
    if total_pages and page >= total_pages:
        break
    page += 1
    time.sleep(0.3)

if rows:
    fields = []
    for row in rows:
        for k in row:
            if k not in fields:
                fields.append(k)
    with open("all_posts.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)
    print(len(rows), "posts saved to all_posts.csv")
else:
    print("No posts saved. Check the messages above.")
