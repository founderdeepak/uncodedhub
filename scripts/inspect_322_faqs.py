import glob
import re

files = []
for f in glob.glob('src/content/blog/*.md'):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if '## FAQ: Frequently asked questions' not in c and re.search(r'##\s*(FAQ|Frequently Asked Questions)', c, re.IGNORECASE):
        files.append(f)

print(f"Total 322 style files: {len(files)}")

for f in files[20:25]:
    print("=" * 60)
    print("File:", f)
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    
    # print title
    m = re.search(r'title:\s*["\']?(.*?)["\']?\n', c)
    if m:
        print("Title:", m.group(1))
    
    # print FAQ
    idx = re.search(r'##\s*(FAQ|Frequently Asked Questions)', c, re.IGNORECASE)
    if idx:
        print(c[idx.start():idx.start() + 1000])
