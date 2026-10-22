import glob
import re

files = []
for f in glob.glob('src/content/blog/*.md'):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if '## FAQ: Frequently asked questions' in c:
        files.append(f)

print(f"Total target files: {len(files)}")

with open('scripts/all_198_titles.txt', 'w', encoding='utf-8') as out:
    for f in sorted(files):
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
        m_title = re.search(r'title:\s*["\']?(.*?)["\']?\n', c)
        m_kw = re.search(r'keywords:\s*["\']?(.*?)["\']?\n', c)
        m_niche = re.search(r'niche:\s*["\']?(.*?)["\']?\n', c)
        title = m_title.group(1) if m_title else ''
        kw = m_kw.group(1) if m_kw else ''
        niche = m_niche.group(1) if m_niche else ''
        out.write(f"{f} || {niche} || {title} || {kw}\n")

print("Saved to scripts/all_198_titles.txt")
