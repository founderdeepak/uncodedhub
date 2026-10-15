import os, glob

blogs = glob.glob('src/content/blog/*.md')
niches = {}
posts = []

for b in blogs:
    slug = os.path.basename(b).replace('.md', '')
    with open(b, 'r', encoding='utf-8') as f:
        content = f.read()
    
    niche = 'studio'
    title = ''
    meta_desc = ''
    excerpt = ''
    date = ''
    
    # parse frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            fm = parts[1]
            for line in fm.split('\n'):
                line = line.strip()
                if line.startswith('title:'):
                    title = line.split(':', 1)[1].strip().strip('\'"')
                elif line.startswith('niche:'):
                    niche = line.split(':', 1)[1].strip().strip('\'"')
                elif line.startswith('metaDescription:'):
                    meta_desc = line.split(':', 1)[1].strip().strip('\'"')
                elif line.startswith('excerpt:'):
                    excerpt = line.split(':', 1)[1].strip().strip('\'"')
                elif line.startswith('date:'):
                    date = line.split(':', 1)[1].strip().strip('\'"')

    niches[niche] = niches.get(niche, 0) + 1
    posts.append({
        'slug': slug,
        'title': title,
        'niche': niche,
        'meta_desc': meta_desc,
        'excerpt': excerpt,
        'date': date
    })

print(f"Total blogs: {len(blogs)}")
print("Niches distribution:")
for k, v in sorted(niches.items(), key=lambda x: -x[1]):
    print(f"  {k}: {v}")

print("\nSample posts:")
for p in posts[:3]:
    print(p)
