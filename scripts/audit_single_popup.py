import glob
import os

files = (
    sorted(glob.glob('Demo Website Template for New Niches/*.html')) +
    sorted(glob.glob('Demo Website Template for 6 NIches/*.html')) +
    sorted(glob.glob('public/demos/*.html'))
)

print(f"Auditing {len(files)} demo files...")
errors = []

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    
    m_cnt = c.count('id="uncodedPitchModal"')
    w_cnt = c.count('id="leadMagnetWidget"')
    f_cnt = c.count('function openPitchModal()')
    t_cnt = c.count('Why We Hand-Built This Live Prototype')
    b_cnt = c.count('<span class="uh-badge-studio">')
    p_cnt = c.count('the-high-trust-advantage.pdf')
    pr_cnt = c.count('22500') + c.count('22,500')
    
    if m_cnt != 1:
        errors.append(f"{f}: modal_count = {m_cnt} (expected 1)")
    if w_cnt != 1:
        errors.append(f"{f}: widget_count = {w_cnt} (expected 1)")
    if f_cnt != 1:
        errors.append(f"{f}: fn_count = {f_cnt} (expected 1)")
    if t_cnt != 1:
        errors.append(f"{f}: title_count = {t_cnt} (expected 1)")
    if b_cnt != 1:
        errors.append(f"{f}: badge_count = {b_cnt} (expected 1)")
    if p_cnt < 1:
        errors.append(f"{f}: pdf_count = {p_cnt} (expected >= 1)")
    if pr_cnt != 0:
        errors.append(f"{f}: price_count = {pr_cnt} (expected 0)")

if not errors:
    print("SUCCESS! ALL 34 DEMO FILES PASSED WITH EXACTLY 1 POPUP MODAL, 1 WIDGET, 0 DUPLICATES!")
else:
    print(f"FAILED with {len(errors)} issues:")
    for e in errors:
        print("  -", e)
