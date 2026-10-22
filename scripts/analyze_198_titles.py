import glob
import re
from collections import defaultdict

files = []
for f in glob.glob('src/content/blog/*.md'):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if '## FAQ: Frequently asked questions' in c:
        files.append(f)

by_niche = defaultdict(list)
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    m_niche = re.search(r'niche:\s*["\']?(.*?)["\']?\n', c)
    niche = m_niche.group(1) if m_niche else 'unknown'
    m_title = re.search(r'title:\s*["\']?(.*?)["\']?\n', c)
    title = m_title.group(1) if m_title else ''
    by_niche[niche].append((f, title))

print(f"Total niches: {len(by_niche)}")
for n, post_list in by_niche.items():
    print(f"\n--- Niche: {n} ({len(post_list)} posts) ---")
    for path, title in post_list[:3]:
        print(f"  • {title}")
