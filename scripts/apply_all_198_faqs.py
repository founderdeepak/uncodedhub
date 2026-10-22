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

combined_faqs = {}
for m in [hd_faqs, ym_faqs, ea_faqs, cp_faqs, sw_faqs, fc_faqs, bp_faqs, sb_faqs, ds_faqs, gf_faqs, cp2_faqs]:
    combined_faqs.update(m)

print(f"Loaded {len(combined_faqs)} bespoke FAQ sets.")

target_files = [f for f in glob.glob('src/content/blog/*.md') if '## FAQ: Frequently asked questions' in open(f, encoding='utf-8').read()]
print(f"Target files to update: {len(target_files)}")

updated_count = 0

for filepath in target_files:
    slug = os.path.basename(filepath).replace('.md', '')
    if slug not in combined_faqs:
        print(f"WARNING: Slug {slug} not found in bespoke FAQs!")
        continue
    
    faq_data = combined_faqs[slug]
    q1, a1 = faq_data['q1'], faq_data['a1']
    q2, a2 = faq_data['q2'], faq_data['a2']
    q3, a3 = faq_data['q3'], faq_data['a3']

    replacement = (
        f"## Frequently asked questions\n\n"
        f"**{q1}**  \n"
        f"{a1}\n\n"
        f"**{q2}**  \n"
        f"{a2}\n\n"
        f"**{q3}**  \n"
        f"{a3}\n\n"
    )

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the FAQ section up to the Continued Reading divider
    pattern = r'## FAQ: Frequently asked questions[\s\S]+?(?=---\s*\r?\n\s*### Continued Reading|\Z)'
    
    if not re.search(pattern, content):
        print(f"WARNING: Could not find FAQ pattern in {slug}")
        continue
    
    new_content = re.sub(pattern, replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    updated_count += 1

print(f"Successfully updated {updated_count} / {len(target_files)} blog posts with bespoke topic-specific FAQs!")
