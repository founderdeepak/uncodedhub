import glob, re
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

with open('scripts/all_titles_by_niche.txt', 'w', encoding='utf-8') as out:
    for n, posts in sorted(by_niche.items()):
        out.write(f"\n==================== {n.upper()} ({len(posts)}) ====================\n")
        for p, t in sorted(posts, key=lambda x: x[1]):
            out.write(f"- {t}\n")

print("Written to scripts/all_titles_by_niche.txt")
