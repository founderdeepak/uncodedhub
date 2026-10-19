import os
import io
import re
import glob
import zipfile
from PIL import Image, ImageDraw, ImageFont

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THUMBNAILS_DIR = os.path.join(ROOT_DIR, 'New 198 thumbnails')
PUBLIC_BLOG_DIR = os.path.join(ROOT_DIR, 'public', 'blog')
os.makedirs(PUBLIC_BLOG_DIR, exist_ok=True)

# User's exact Canva mapping: Left (Canva slide/png number) -> Right (Topic list 1-based index)
CANVA_TO_TOPIC = {
    1: 1,
    2: 13,
    3: 14,
    4: 15,
    5: 16,
    6: 17,
    7: 18,
    8: 7,
    9: 8,
    10: 9,
    11: 10,
    12: 11,
    13: 12,
    14: 2,
    15: 3,
    16: 4,
    17: 5,
    18: 6
}

# Load NICHES_DATA directly from scripts/generate_198_silo_master.py
def load_niches_data():
    master_script = os.path.join(ROOT_DIR, 'scripts', 'generate_198_silo_master.py')
    with open(master_script, 'r', encoding='utf-8') as f:
        code = f.read()
    
    # Extract NICHES_DATA block
    start = code.find('NICHES_DATA = [')
    end = code.find('# 5. Build Master Schedule Data')
    block = code[start:end]
    
    local_env = {}
    exec(block, {}, local_env)
    return local_env['NICHES_DATA']

ZIP_SPECS = [
    ('1. Academy website 18 blog thumbnails.zip', 'educational-academy', 'Educational Academies & Coaching'),
    ('2. Industrial gym 18 blog thumbnails.zip', 'gym-fitness-club', 'Commercial Gyms & Fitness Clubs'),
    ('3. B2B consulting 18 blog thumbnail series.zip', 'business-portfolio', 'Enterprise B2B Consulting'),
    ('4. Luxury spa 18 blog thumbnails.zip', 'spa-wellness', 'Luxury Spas & Wellness Retreats'),
    ('5. Bridal beauty 18 blog thumbnails.zip', 'salon-beauty', 'Bridal Studios & Luxury Salons'),
    ('6. Private Fitness Coach 18 Blog Thumbnails.zip', 'fitness-coach', 'Private Fitness Coaches'),
    ('7. Yoga shala 18 blog thumbnails.zip', 'yoga-meditation', 'Traditional Yoga Shalas & Mindfulness'),
    ('8. Creative agency 18 blog thumbnails.zip', 'creative-portfolio', 'Creative & Design Studios'),
    ('9. Diagnostic lab 18 blog thumbnails .zip', 'healthcare-diagnostics', 'Pathology & Diagnostic Centers'),
    ('10. Clinical website 18 blog thumbnails.zip', 'clinic-polyclinic', 'Multi-Specialty Polyclinics'),
    ('11.Surgical doctor website 18 blog thumbnails.zip', 'doctor-specialist', 'Surgical Specialists & Doctors'),
]

def generate_fallback_image(title, category_name, output_path):
    width, height = 1600, 900
    img = Image.new('RGB', (width, height), color=(36, 18, 24))
    draw = ImageDraw.Draw(img)
    
    # Elegant rose gold border and header
    draw.rectangle([0, 0, width, 14], fill=(244, 114, 182))
    draw.rectangle([50, 50, width - 50, height - 50], outline=(70, 35, 48), width=2)
    
    # Category tag
    draw.text((70, 80), f"UNCoded HUB  |  {category_name.upper()}", fill=(244, 114, 182))
    
    # Title lines
    words = title.split()
    lines = []
    curr = []
    for w in words:
        curr.append(w)
        if len(' '.join(curr)) > 36:
            lines.append(' '.join(curr[:-1]))
            curr = [w]
    if curr:
        lines.append(' '.join(curr))
    
    y = 260
    for line in lines:
        draw.text((70, y), line, fill=(255, 245, 248))
        y += 70
        
    draw.text((70, height - 100), "PREMIUM WEDDING CONVERSIONS  •  FAST JAMSTACK ARCHITECTURE", fill=(210, 150, 175))
    img.save(output_path, format='WEBP', quality=82, method=6)

def main():
    niches_data = load_niches_data()
    niche_dict = {n['key']: n for n in niches_data}
    
    print("=" * 80)
    print("UNCODED HUB: PRECISE CANVA-TO-BLOG THUMBNAIL SYNC")
    print("=" * 80)
    
    total_converted = 0
    total_fallbacks = 0
    missing_report = []
    
    for zip_filename, niche_key, niche_name in ZIP_SPECS:
        zip_path = os.path.join(THUMBNAILS_DIR, zip_filename)
        if not os.path.exists(zip_path):
            print(f"[ERROR] Missing zip: {zip_path}")
            continue
            
        niche_info = niche_dict.get(niche_key)
        if not niche_info:
            print(f"[ERROR] Niche key not found in master data: {niche_key}")
            continue
            
        topics = niche_info['topics'] # 18 topics
        zf = zipfile.ZipFile(zip_path)
        img_names = zf.namelist()
        
        print(f"\n>>> Processing: {niche_name} ({len(topics)} topics)")
        print(f"    Zip file: {zip_filename}")
        
        # Track which topics were satisfied
        satisfied_topics = set()
        
        for canva_num in range(1, 19):
            img_candidate = f"{canva_num}.png"
            if img_candidate not in img_names:
                # Check for alternate naming like canva_num with spaces or different extension
                found = False
                for f in img_names:
                    m = re.match(r'^(\d+)\.(png|jpg|jpeg)$', f.lower())
                    if m and int(m.group(1)) == canva_num:
                        img_candidate = f
                        found = True
                        break
                if not found:
                    topic_idx = CANVA_TO_TOPIC[canva_num]
                    missing_report.append({
                        'niche': niche_name,
                        'zip': zip_filename,
                        'canva_num': canva_num,
                        'topic_idx': topic_idx,
                        'topic_title': topics[topic_idx - 1][0],
                        'topic_slug': topics[topic_idx - 1][1]
                    })
                    continue
            
            topic_idx = CANVA_TO_TOPIC[canva_num]
            target_topic = topics[topic_idx - 1] # 0-indexed in array
            title = target_topic[0]
            slug = target_topic[1]
            satisfied_topics.add(topic_idx)
            
            # Read image, resize to 1600x900, compress to WebP
            img_bytes = zf.read(img_candidate)
            pil_img = Image.open(io.BytesIO(img_bytes))
            resized = pil_img.resize((1600, 900), Image.Resampling.LANCZOS)
            
            dest_webp = os.path.join(PUBLIC_BLOG_DIR, f"{slug}.webp")
            resized.save(dest_webp, format='WEBP', quality=82, method=6)
            size_kb = os.path.getsize(dest_webp) / 1024
            total_converted += 1
            
            print(f"    [OK] Canva #{canva_num:<2} -> Topic #{topic_idx:<2} | {slug}.webp ({size_kb:.1f} KB)")
        
        # Check if any topic in this niche had no image (e.g. Bridal Beauty 17 & 18)
        for t_idx in range(1, 19):
            if t_idx not in satisfied_topics:
                target_topic = topics[t_idx - 1]
                title = target_topic[0]
                slug = target_topic[1]
                dest_webp = os.path.join(PUBLIC_BLOG_DIR, f"{slug}.webp")
                generate_fallback_image(title, niche_name, dest_webp)
                size_kb = os.path.getsize(dest_webp) / 1024
                total_fallbacks += 1
                print(f"    [FALLBACK GENERATED] Topic #{t_idx:<2} | {slug}.webp ({size_kb:.1f} KB)")
                print(f"      Title: {title}")

    print("\n" + "=" * 80)
    print("CONVERSION & SYNC COMPLETED")
    print(f"Total Canva Images Converted to WebP: {total_converted}")
    print(f"Total Branded Fallbacks Generated   : {total_fallbacks}")
    print(f"Total WebP Images in public/blog/   : {total_converted + total_fallbacks} / 198")
    print("=" * 80)
    
    if missing_report:
        print("\nNOTE: The following slides were not present in the zip archives:")
        for m in missing_report:
            print(f"- {m['niche']}: Missing Canva slide #{m['canva_num']} (Topic #{m['topic_idx']}: '{m['topic_title']}' -> {m['topic_slug']}.webp)")
        print("  -> Branded high-aesthetic WebP fallback was generated for each so no 404s exist on the site.")

if __name__ == '__main__':
    main()
