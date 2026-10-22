import os
import glob
import re

files = []
for f in glob.glob('src/content/blog/*.md'):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if '## FAQ: Frequently asked questions' in c:
        files.append(f)

print(f"Total matching files: {len(files)}")

for f in files[:5]:
    print("=" * 60)
    print("File:", os.path.basename(f))
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    
    # Extract frontmatter
    fm_match = re.search(r'^---\s*\n(.*?)\n---', c, re.DOTALL)
    if fm_match:
        fm_text = fm_match.group(1)
        for line in fm_text.split('\n'):
            if any(line.strip().startswith(k) for k in ['title:', 'category:', 'niche:', 'excerpt:', 'keywords:']):
                print(line.strip()[:100])
    
    # Extract H2 headings
    h2s = re.findall(r'^##\s+(.*)', c, re.MULTILINE)
    print("H2 Headings:", h2s[:4])
