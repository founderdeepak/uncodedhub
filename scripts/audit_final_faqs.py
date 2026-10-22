import glob
import re

all_blogs = glob.glob('src/content/blog/*.md')
print(f"Total markdown files in blog directory: {len(all_blogs)}")

faq_counts = {}
unique_questions = set()
posts_with_faqs = 0
posts_without_faqs = []

for f in all_blogs:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    
    # Check for bold question format
    bold_matches = re.findall(r'\*\*(.+?\?)\*\*', c)
    if bold_matches:
        posts_with_faqs += 1
        faq_counts[f] = len(bold_matches)
        for q in bold_matches:
            unique_questions.add(q.strip())
    else:
        # Check if README or draft
        if 'README.md' not in f:
            posts_without_faqs.append(f)

print(f"Posts with bold FAQ questions: {posts_with_faqs}")
print(f"Total unique FAQ questions across the site: {len(unique_questions)}")
print(f"Posts without FAQs: {posts_without_faqs}")

# Sample 5 updated posts to inspect
sample_updated = [
    'src/content/blog/200-hour-and-300-hour-yoga-teacher-training-curriculum-pages.md',
    'src/content/blog/advanced-automated-analyzers-equipment-showcase.md',
    'src/content/blog/alumni-results-and-exam-ranker-showcase.md',
    'src/content/blog/ambient-visual-micro-interactions-without-speed-lag.md',
    'src/content/blog/before-after-bridal-beauty-sliders-skin-texture-honesty.md'
]

for p in sample_updated:
    print("=" * 60)
    print("FILE:", p)
    with open(p, 'r', encoding='utf-8') as fp:
        c = fp.read()
    idx = c.find('## Frequently asked questions')
    if idx != -1:
        print(c[idx:idx + 600])
