import glob, os, re
from collections import defaultdict

files = [f for f in glob.glob('src/content/blog/*.md') if '## FAQ: Frequently asked questions' in open(f, encoding='utf-8').read()]
by_niche = defaultdict(list)
for f in files:
    c = open(f, encoding='utf-8').read()
    m_niche = re.search(r'niche:\s*["\']?(.*?)["\']?\n', c)
    n = m_niche.group(1) if m_niche else 'unknown'
    by_niche[n].append(os.path.basename(f).replace('.md', ''))

for n in ['business-portfolio', 'clinic-polyclinic']:
    print(f"\n{n} ({len(by_niche[n])} files):")
    for s in sorted(by_niche[n]):
        print(f"  '{s}',")
