import glob
import re
import os

files = [f for f in glob.glob('src/content/blog/*.md') if not f.endswith('README.md')]

h3_blogs = []
for f in files:
    content = open(f, encoding='utf-8', errors='ignore').read()
    if re.search(r'###\s*[^#\n]+\?', content):
        h3_blogs.append(f)

print(f'Total blogs using H3 FAQ format (the 198 blogs): {len(h3_blogs)}')

# Group the questions to see if they are unique or duplicated template
unique_question_sets = {}
all_questions = []

for f in h3_blogs:
    content = open(f, encoding='utf-8', errors='ignore').read()
    title_m = re.search(r'title:\s*["\']?([^"\n\r]+)["\']?', content)
    title = title_m.group(1).strip() if title_m else os.path.basename(f)
    
    faq_match = re.search(r'##\s*(?:FAQ(?:[:\s-]+Frequently\s+asked\s+questions)?|Frequently\s+asked\s+questions)[\s\S]*?(?=\n##\s(?!#)|$)', content, re.IGNORECASE)
    qs = []
    if faq_match:
        sec = faq_match.group(0)
        qs = [q.strip() for q in re.findall(r'###\s*([^\n#]+?\?)', sec)]
    
    q_tuple = tuple(qs)
    all_questions.extend(qs)
    if q_tuple not in unique_question_sets:
        unique_question_sets[q_tuple] = []
    unique_question_sets[q_tuple].append((os.path.basename(f), title))

print(f'Number of unique question sets among the 198 blogs: {len(unique_question_sets)}')
print('\nSample 6 different sets of questions:')
for i, (qs, matched_files) in enumerate(list(unique_question_sets.items())[:6]):
    print(f'\n--- Set {i+1} (used in {len(matched_files)} posts) ---')
    print(f'Sample post: {matched_files[0][0]} | Title: {matched_files[0][1]}')
    for q in qs:
        print(f'  Q: {q}')
