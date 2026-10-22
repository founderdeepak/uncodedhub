import glob
import re
import os

NICHE_NAMES = {
    'yoga-meditation': 'Yoga Shalas & Meditation Sanctuaries',
    'healthcare-diagnostics': 'Pathology Labs & Diagnostic Centers',
    'creative-portfolio': 'Creative Studios & Design Agencies',
    'educational-academy': 'Educational Academies & Coaching Institutes',
    'spa-wellness': 'Luxury Spas & Wellness Retreats',
    'fitness-coach': 'Private Fitness Coaches & Personal Trainers',
    'business-portfolio': 'Enterprise B2B Advisory & Management Consultancies',
    'salon-beauty': 'Bridal Salons & Luxury Beauty Studios',
    'doctor-specialist': 'Super-Specialist Doctors & Surgeons',
    'gym-fitness-club': 'Commercial Gyms & Fitness Clubs',
    'clinic-polyclinic': 'Multi-Specialty Polyclinics & Outpatient Centers'
}

def clean_title(title):
    # Remove quotes
    return title.strip(' "\'')

def generate_faqs_for_post(slug, title, niche, keywords, excerpt, body):
    niche_label = NICHE_NAMES.get(niche, niche.replace('-', ' ').title())
    kw_list = [k.strip() for k in keywords.split(',') if k.strip() and 'uncoded hub' not in k.lower()]
    primary_kw = kw_list[0] if kw_list else title.lower()
    secondary_kw = kw_list[1] if len(kw_list) > 1 else 'high-converting web architecture'
    
    # Split title if it has a colon
    if ':' in title:
        parts = title.split(':', 1)
        topic_head = parts[0].strip()
        topic_sub = parts[1].strip()
    else:
        topic_head = title
        topic_sub = title

    # Look for behavioral psychology thinker in body
    psy_match = re.search(r'Behavioral psychology:\s*([^#\n]+)', body)
    thinker_str = psy_match.group(1).strip() if psy_match else ''

    # We will build 3 bespoke, highly articulate questions tailored to this specific title
    # Question 1: Foundational "Why" or "How" of this exact topic
    # Question 2: The critical execution challenge or biggest mistake regarding this exact topic
    # Question 3: Technical architecture, SEO/AI search citation, or conversion delivery for this feature
    
    return {
        'slug': slug,
        'title': title,
        'niche': niche,
        'topic_head': topic_head,
        'topic_sub': topic_sub,
        'primary_kw': primary_kw,
        'secondary_kw': secondary_kw,
        'thinker': thinker_str
    }

# Test on 5 posts
test_files = glob.glob('src/content/blog/*.md')
target_files = [f for f in test_files if '## FAQ: Frequently asked questions' in open(f, encoding='utf-8').read()]

print(f"Total target files: {len(target_files)}")
for f in target_files[:5]:
    c = open(f, encoding='utf-8').read()
    m_title = re.search(r'title:\s*["\']?(.*?)["\']?\n', c)
    m_niche = re.search(r'niche:\s*["\']?(.*?)["\']?\n', c)
    m_kw = re.search(r'keywords:\s*["\']?(.*?)["\']?\n', c)
    m_ex = re.search(r'excerpt:\s*["\']?(.*?)["\']?\n', c)
    info = generate_faqs_for_post(
        os.path.basename(f),
        m_title.group(1) if m_title else '',
        m_niche.group(1) if m_niche else '',
        m_kw.group(1) if m_kw else '',
        m_ex.group(1) if m_ex else '',
        c
    )
    print(info)
