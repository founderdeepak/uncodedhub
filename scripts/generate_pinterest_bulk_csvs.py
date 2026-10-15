import os
import glob
import csv
import re
from datetime import datetime, timedelta

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(ROOT_DIR, 'src', 'content', 'blog')
OUTPUT_DIR = os.path.join(ROOT_DIR, 'pinterest_campaign')
PUBLIC_BLOG_DIR = os.path.join(ROOT_DIR, 'public', 'blog')

os.makedirs(OUTPUT_DIR, exist_ok=True)

RAW_GITHUB_BASE = "https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/public/blog"
FALLBACK_IMAGE = "https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/public/og-image.jpg"
SITE_URL = "https://uncodedhub.com"

# Niche mapping to professional Pinterest Board Names and SEO Keywords
NICHE_CONFIG = {
    'interior-designers': {
        'board': 'Interior Design Websites & Marketing',
        'keywords': 'interior design website, interior design portfolio, modular kitchen design, architecture marketing, luxury interior design, residential interior, turnkey interior, interior designer branding, interior leads'
    },
    'real-estate': {
        'board': 'Luxury Real Estate Websites & Lead Gen',
        'keywords': 'real estate website, luxury realtor marketing, real estate lead generation, property listing website, real estate agent branding, luxury homes marketing, real estate seo, broker landing page'
    },
    'dental-clinics': {
        'board': 'Dental Clinic Websites & Healthcare Marketing',
        'keywords': 'dental clinic website, dentist marketing, dental practice seo, healthcare website design, patient booking system, cosmetic dentistry marketing, dental leads, dental clinic branding'
    },
    'wedding-photographers': {
        'board': 'Wedding Photography Websites & Portfolios',
        'keywords': 'wedding photography website, photographer portfolio, luxury wedding photography, wedding photographer branding, wedding photography seo, client booking gallery, photography leads'
    },
    'home-renovation': {
        'board': 'Home Renovation & Builder Websites',
        'keywords': 'home renovation website, general contractor marketing, builder website design, remodel leads, kitchen renovation website, construction company branding, contractor seo'
    },
    'coaches-consultants': {
        'board': 'High-Ticket Coaching & Consulting Websites',
        'keywords': 'coach website design, consultant landing page, executive coaching marketing, high ticket coaching website, speaker website, consultation booking funnel, personal brand website'
    },
    'studio': {
        'board': 'Web Design, SEO & Conversion Optimization',
        'keywords': 'web design inspiration, high converting website, core web vitals, speed optimization, bespoke web development, custom website design, boutique agency web design, clean code website'
    }
}

def clean_text(text):
    if not text:
        return ""
    # remove markdown links, bold, italics, backticks
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = re.sub(r'[*_`#>]', '', text)
    return ' '.join(text.split())

def parse_markdown(filepath):
    slug = os.path.basename(filepath).replace('.md', '')
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    data = {
        'slug': slug,
        'title': '',
        'niche': 'studio',
        'meta_desc': '',
        'excerpt': '',
        'date': '2026-10-15',
        'body': ''
    }

    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            fm = parts[1]
            data['body'] = parts[2]
            for line in fm.split('\n'):
                line = line.strip()
                if line.startswith('title:'):
                    data['title'] = line.split(':', 1)[1].strip().strip('\'"')
                elif line.startswith('niche:'):
                    data['niche'] = line.split(':', 1)[1].strip().strip('\'"')
                elif line.startswith('metaDescription:'):
                    data['meta_desc'] = line.split(':', 1)[1].strip().strip('\'"')
                elif line.startswith('excerpt:'):
                    data['excerpt'] = line.split(':', 1)[1].strip().strip('\'"')
                elif line.startswith('date:'):
                    data['date'] = line.split(':', 1)[1].strip().strip('\'"')

    if not data['title']:
        data['title'] = slug.replace('-', ' ').title()

    return data

# Collect all posts
blog_files = glob.glob(os.path.join(BLOG_DIR, '*.md'))
posts = [parse_markdown(f) for f in blog_files]

# Sort posts by date descending, then slug
posts.sort(key=lambda p: (p['date'], p['slug']), reverse=True)

print(f"Total blog posts parsed: {len(posts)}")

# Pinterest Native Bulk CSV format:
# Title, Media URL, Pinterest board, Thumbnail, Description, Link, Publish date, Keywords
pinterest_rows = []
niche_rows = {n: [] for n in NICHE_CONFIG.keys()}

# Also prepare a scheduled timeline: 10 pins per day starting Oct 15, 2026
current_sched_time = datetime(2026, 10, 15, 9, 0, 0)
time_increment = timedelta(hours=2) # 5 pins per day (9am, 11am, 1pm, 3pm, 5pm)

for i, post in enumerate(posts):
    slug = post['slug']
    niche = post['niche'] if post['niche'] in NICHE_CONFIG else 'studio'
    conf = NICHE_CONFIG[niche]

    # Title: max 100 characters (Pinterest hard limit)
    raw_title = clean_text(post['title'])
    if len(raw_title) > 97:
        title = raw_title[:97].rstrip() + "..."
    else:
        title = raw_title

    # Media URL: Check if .jpg exists
    jpg_filename = f"{slug}.jpg"
    jpg_local = os.path.join(PUBLIC_BLOG_DIR, jpg_filename)
    if os.path.exists(jpg_local):
        media_url = f"{RAW_GITHUB_BASE}/{jpg_filename}"
    else:
        media_url = FALLBACK_IMAGE

    board = conf['board']
    thumbnail = "" # blank for images

    # Description: max 500 characters
    raw_desc = clean_text(post['meta_desc'] or post['excerpt'] or raw_title)
    cta = f" Discover conversion frameworks, UX benchmarks, and technical architecture at Uncoded Hub."
    available_len = 495 - len(cta)
    if len(raw_desc) > available_len:
        desc_body = raw_desc[:available_len].rstrip() + "..."
    else:
        desc_body = raw_desc
    description = (desc_body + cta).strip()
    if len(description) > 500:
        description = description[:497] + "..."

    link = f"{SITE_URL}/blog/{slug}"
    
    # Scheduled publish date (Pinterest format: YYYY-MM-DD HH:MM:SS)
    sched_str = current_sched_time.strftime("%Y-%m-%d %H:%M:%S")
    current_sched_time += timedelta(hours=2)
    # Roll over to next morning if past 21:00
    if current_sched_time.hour >= 21:
        current_sched_time = datetime(
            current_sched_time.year,
            current_sched_time.month,
            current_sched_time.day,
            9, 0, 0
        ) + timedelta(days=1)

    keywords = conf['keywords']

    pin_record = {
        'Title': title,
        'Media URL': media_url,
        'Pinterest board': board,
        'Thumbnail': thumbnail,
        'Description': description,
        'Link': link,
        'Publish date': sched_str,
        'Keywords': keywords
    }

    pinterest_rows.append(pin_record)
    niche_rows[niche].append(pin_record)

headers = ['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords']

# 1. Write Master Pinterest CSV
master_csv_path = os.path.join(OUTPUT_DIR, '00_master_pinterest_323_pins.csv')
with open(master_csv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(pinterest_rows)

print(f"Written Master Pinterest CSV: {master_csv_path} ({len(pinterest_rows)} pins)")

# 2. Write Niche-specific CSVs
niche_file_map = {
    'interior-designers': '01_pinterest_interior_designers_40.csv',
    'real-estate': '02_pinterest_real_estate_40.csv',
    'dental-clinics': '03_pinterest_dental_clinics_41.csv',
    'wedding-photographers': '04_pinterest_wedding_photographers_40.csv',
    'home-renovation': '05_pinterest_home_renovation_40.csv',
    'coaches-consultants': '06_pinterest_coaches_consultants_41.csv',
    'studio': '07_pinterest_studio_web_design_81.csv'
}

for niche, filename in niche_file_map.items():
    file_path = os.path.join(OUTPUT_DIR, filename)
    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(niche_rows[niche])
    print(f"Written {niche} CSV: {file_path} ({len(niche_rows[niche])} pins)")

# 3. Write Zernio Pinterest Schedule CSV (for multi-channel scheduling via Zernio)
zernio_headers = [
    'post_content', 'platforms', 'profiles', 'schedule_time',
    'schedule_time_twitter', 'schedule_time_instagram', 'schedule_time_facebook',
    'schedule_time_youtube', 'schedule_time_linkedin', 'schedule_time_tiktok',
    'schedule_time_threads', 'schedule_time_pinterest', 'schedule_time_reddit',
    'schedule_time_bluesky', 'schedule_time_googlebusiness', 'schedule_time_telegram',
    'tz', 'media_urls', 'is_draft', 'publish_now', 'use_queue', 'title', 'tags',
    'hashtags', 'visibility', 'mentions', 'crossposting_enabled', 'metadata',
    'pinterest_title', 'pinterest_link'
]

zernio_pinterest_rows = []
for pin in pinterest_rows:
    zernio_row = {
        'post_content': f"{pin['Title']}\n\n{pin['Description']}\n\nRead more: {pin['Link']}",
        'platforms': 'pinterest',
        'profiles': '6acfb8ce887284d03189ee8d', # Uncoded Hub profile
        'schedule_time': pin['Publish date'][:16], # YYYY-MM-DD HH:MM
        'schedule_time_twitter': '',
        'schedule_time_instagram': '',
        'schedule_time_facebook': '',
        'schedule_time_youtube': '',
        'schedule_time_linkedin': '',
        'schedule_time_tiktok': '',
        'schedule_time_threads': '',
        'schedule_time_pinterest': pin['Publish date'][:16],
        'schedule_time_reddit': '',
        'schedule_time_bluesky': '',
        'schedule_time_googlebusiness': '',
        'schedule_time_telegram': '',
        'tz': 'Asia/Kolkata',
        'media_urls': pin['Media URL'],
        'is_draft': 'false',
        'publish_now': 'false',
        'use_queue': 'false',
        'title': pin['Title'],
        'tags': '',
        'hashtags': '',
        'visibility': 'public',
        'mentions': '',
        'crossposting_enabled': 'false',
        'metadata': '',
        'pinterest_title': pin['Title'],
        'pinterest_link': pin['Link']
    }
    zernio_pinterest_rows.append(zernio_row)

zernio_path = os.path.join(OUTPUT_DIR, 'zernio_pinterest_schedule_323.csv')
with open(zernio_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=zernio_headers)
    writer.writeheader()
    writer.writerows(zernio_pinterest_rows)

print(f"Written Zernio Pinterest CSV: {zernio_path} ({len(zernio_pinterest_rows)} pins)")
print("\nALL PINTEREST CSVS GENERATED SUCCESSFULLY!")
