import glob
import re
import os

NICHE_DATA = {
    'yoga-meditation': {
        'name': 'Yoga Shalas & Meditation Sanctuaries',
        'audience': 'practitioners, seekers, and aspiring teachers',
        'conversion_goal': 'class bookings, retreat registrations, and teacher training deposits'
    },
    'healthcare-diagnostics': {
        'name': 'Pathology Labs & Diagnostic Centers',
        'audience': 'patients, families, and referring physicians',
        'conversion_goal': 'direct home sample bookings, health checkup reservations, and test report access'
    },
    'creative-portfolio': {
        'name': 'Creative Studios & Design Agencies',
        'audience': 'venture-backed founders, CMOs, and enterprise brand leaders',
        'conversion_goal': 'high-retainer brand design and product design discovery calls'
    },
    'educational-academy': {
        'name': 'Educational Academies & Coaching Institutes',
        'audience': 'students, competitive exam aspirants, and parents',
        'conversion_goal': 'course admissions, demo class registrations, and batch enrollments'
    },
    'spa-wellness': {
        'name': 'Luxury Spas & Wellness Retreats',
        'audience': 'affluent urban professionals and wellness retreat travelers',
        'conversion_goal': 'treatment reservations, couples package bookings, and wellness gift card sales'
    },
    'fitness-coach': {
        'name': 'Private Fitness Coaches & Trainers',
        'audience': 'high-performing executives and transformation clients',
        'conversion_goal': '1-on-1 coaching applications and high-ticket retainer signups'
    },
    'business-portfolio': {
        'name': 'B2B Corporate Advisory & Management Consultancies',
        'audience': 'enterprise executives, board members, and corporate buyers',
        'conversion_goal': 'strategic advisory discovery calls and RFP shortlist inclusions'
    },
    'salon-beauty': {
        'name': 'Bridal Salons & Luxury Beauty Studios',
        'audience': 'brides-to-be, wedding families, and luxury hair/skin clients',
        'conversion_goal': 'bridal package lock-ins, studio consultations, and paid makeup trials'
    },
    'doctor-specialist': {
        'name': 'Super-Specialist Doctors & Surgeons',
        'audience': 'anxious patients seeking specialized surgical or clinical treatment',
        'conversion_goal': 'second opinion consultations and clinic OPD appointments'
    },
    'gym-fitness-club': {
        'name': 'Commercial Gyms & Fitness Clubs',
        'audience': 'fitness enthusiasts, neighborhood lifters, and corporate wellness seekers',
        'conversion_goal': 'free trial day pass requests and annual membership sales'
    },
    'clinic-polyclinic': {
        'name': 'Multi-Specialty Polyclinics & Outpatient Centers',
        'audience': 'patients needing multi-department consultations, diagnostics, and daycare care',
        'conversion_goal': 'specialist OPD bookings, family health checkup registrations, and direct WhatsApp consultations'
    }
}

def analyze_post(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    slug = os.path.basename(filepath).replace('.md', '')
    
    m_title = re.search(r'title:\s*["\']?(.*?)["\']?\n', content)
    title = m_title.group(1).strip(' "\'') if m_title else ''
    
    m_niche = re.search(r'niche:\s*["\']?(.*?)["\']?\n', content)
    niche = m_niche.group(1).strip(' "\'') if m_niche else 'business-portfolio'
    
    m_kw = re.search(r'keywords:\s*["\']?(.*?)["\']?\n', content)
    kw_str = m_kw.group(1).strip(' "\'') if m_kw else ''
    kws = [k.strip() for k in kw_str.split(',') if k.strip() and 'uncoded hub' not in k.lower()]
    
    m_ex = re.search(r'excerpt:\s*["\']?(.*?)["\']?\n', content)
    excerpt = m_ex.group(1).strip(' "\'') if m_ex else ''

    # Get short answer text if present
    sa_match = re.search(r'## The short answer\s*\n\s*([^\n#]+(?:\n[^\n#]+)*)', content)
    short_answer = sa_match.group(1).strip() if sa_match else ''

    return {
        'filepath': filepath,
        'slug': slug,
        'title': title,
        'niche': niche,
        'keywords': kws,
        'excerpt': excerpt,
        'short_answer': short_answer
    }
