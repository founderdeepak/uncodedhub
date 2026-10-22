import glob, re

count = 0
for f in glob.glob('src/content/blog/*.md'):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if '## FAQ: Frequently asked questions' not in c and re.search(r'##\s*(FAQ|Frequently Asked Questions)', c, re.IGNORECASE):
        idx = re.search(r'##\s*(FAQ|Frequently Asked Questions)', c, re.IGNORECASE)
        section = c[idx.start():idx.start()+1500]
        if 'critical for growing a modern' not in section:
            m_title = re.search(r'title:\s*["\']?(.*?)["\']?\n', c)
            title = m_title.group(1) if m_title else ''
            print('='*60)
            print('FILE:', f)
            print('TITLE:', title)
            print(section[:600])
            count += 1
            if count >= 4:
                break
