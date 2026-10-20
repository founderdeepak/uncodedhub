import glob
import os
import re

NEW_NICHES = [
    'educational-academy', 'gym-fitness-club', 'business-portfolio', 'spa-wellness',
    'salon-beauty', 'fitness-coach', 'yoga-meditation', 'creative-portfolio',
    'healthcare-diagnostics', 'clinic-polyclinic', 'doctor-specialist'
]

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
blog_files = glob.glob(os.path.join(ROOT, 'src', 'content', 'blog', '*.md'))

new_198_books = {}
new_198_words = []
old_blogs_books = {}
old_blogs_words = []

for f in blog_files:
    fname = os.path.basename(f)
    if fname == 'README.md': continue
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    
    m_niche = re.search(r'niche:\s*["\']?([^"\'\r\n]+)', c)
    niche = m_niche.group(1).strip() if m_niche else 'unknown'
    
    words = len(c.split())
    # find all goodreads book links or markdown citations
    books = re.findall(r'\[\*([^*]+)\*\]\((https?://[^\)]+)\)', c)
    
    if niche in NEW_NICHES:
        new_198_words.append(words)
        for b, url in books:
            new_198_books[b] = new_198_books.get(b, 0) + 1
    else:
        old_blogs_words.append(words)
        for b, url in books:
            old_blogs_books[b] = old_blogs_books.get(b, 0) + 1

print("=" * 60)
print("AUDIT: NEW 198 BLOGS")
print("=" * 60)
print(f"Total new posts: {len(new_198_words)}")
print(f"Average word count: {sum(new_198_words)/len(new_198_words):.1f} words")
print(f"Distinct book citations: {len(new_198_books)}")
print("Books cited in new 198:")
for b, count in sorted(new_198_books.items(), key=lambda x: x[1], reverse=True):
    print(f"  • {b}: {count} posts")

print("\n" + "=" * 60)
print("AUDIT: PREVIOUS 322 BLOGS")
print("=" * 60)
print(f"Total old posts: {len(old_blogs_words)}")
if old_blogs_words:
    print(f"Average word count: {sum(old_blogs_words)/len(old_blogs_words):.1f} words")
    print(f"Distinct book citations: {len(old_blogs_books)}")
    print("Top 10 books cited in previous blogs:")
    for b, count in sorted(old_blogs_books.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  • {b}: {count} posts")
