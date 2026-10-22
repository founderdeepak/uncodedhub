import os
import glob
import re

import sys
sys.path.append(os.path.abspath('scripts'))

from faq_generators.healthcare_diagnostics import FAQS as hd_faqs
from faq_generators.yoga_meditation import FAQS as ym_faqs
from faq_generators.educational_academy import FAQS as ea_faqs
from faq_generators.creative_portfolio import FAQS as cp_faqs
from faq_generators.spa_wellness import FAQS as sw_faqs
from faq_generators.fitness_coach import FAQS as fc_faqs
from faq_generators.business_portfolio import FAQS as bp_faqs
from faq_generators.salon_beauty import FAQS as sb_faqs
from faq_generators.doctor_specialist import FAQS as ds_faqs
from faq_generators.gym_fitness_club import FAQS as gf_faqs
from faq_generators.clinic_polyclinic import FAQS as cp2_faqs

all_modules = [
    ('healthcare-diagnostics', hd_faqs),
    ('yoga-meditation', ym_faqs),
    ('educational-academy', ea_faqs),
    ('creative-portfolio', cp_faqs),
    ('spa-wellness', sw_faqs),
    ('fitness-coach', fc_faqs),
    ('business-portfolio', bp_faqs),
    ('salon-beauty', sb_faqs),
    ('doctor-specialist', ds_faqs),
    ('gym-fitness-club', gf_faqs),
    ('clinic-polyclinic', cp2_faqs)
]

total_faqs = 0
for name, m in all_modules:
    print(f"{name}: {len(m)} bespoke FAQ sets")
    total_faqs += len(m)

print(f"\nTotal bespoke FAQ sets defined: {total_faqs} / 198")

# Verify against the actual 198 files in src/content/blog/
target_files = [f for f in glob.glob('src/content/blog/*.md') if '## FAQ: Frequently asked questions' in open(f, encoding='utf-8').read()]
print(f"Total target files in blog directory: {len(target_files)}")

combined_faqs = {}
for name, m in all_modules:
    combined_faqs.update(m)

missing = []
for f in target_files:
    slug = os.path.basename(f).replace('.md', '')
    if slug not in combined_faqs:
        missing.append(slug)

if missing:
    print(f"ERROR: {len(missing)} files missing bespoke FAQs:")
    for m in missing:
        print(f"  - {m}")
else:
    print("\nSUCCESS! Every single one of the 198 blogs has a dedicated, bespoke FAQ set!")
