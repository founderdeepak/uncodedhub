"""
Master Supreme Generator for the 11 New Outreach Niches
Mapped directly to Customer Saga 07–17 and Questionnaire 09–19.
Produces 11 standalone, self-contained, ultra-premium HTML demos with:
- 3 Distinct Visual Design Varieties / Themes (Switchable dynamically via floating dock with localStorage)
- Interactive Niche Tools (Calculators, Schedulers, Timetables, Triage)
- High-resolution photography
- Complete conversion copy from Customer Saga
"""

import os

OUT_DIR = r"c:\Users\LENOVO\Downloads\uncoded-hub\Demo Website Template for New Niches"
os.makedirs(OUT_DIR, exist_ok=True)

# Shared HTML Generator Template
def render_page(data):
    t1, t2, t3 = data["themes"]

    # Generate CSS for 3 Themes
    theme_css = f"""
    /* ==========================================================================
       THEME 1: {t1['name']}
       ========================================================================== */
    :root, body[data-theme="{t1['id']}"] {{
      --bg-primary: {t1['bg_primary']};
      --bg-surface: {t1['bg_surface']};
      --bg-card: {t1['bg_card']};
      --bg-card-hover: {t1['bg_card_hover']};
      --text-primary: {t1['text_primary']};
      --text-muted: {t1['text_muted']};
      --text-subtle: {t1['text_subtle']};
      --border-color: {t1['border_color']};
      --accent: {t1['accent']};
      --accent-hover: {t1['accent_hover']};
      --accent-contrast: {t1['accent_contrast']};
      --accent-light: {t1['accent_light']};
      --badge-bg: {t1['badge_bg']};
      --badge-text: {t1['badge_text']};
      --radius: {t1['radius']};
      --font-heading: '{t1['font_heading']}', serif;
      --font-body: '{t1['font_body']}', sans-serif;
      --header-bg: {t1['header_bg']};
      --shadow: {t1['shadow']};
      --btn-radius: {t1['radius']};
    }}

    /* ==========================================================================
       THEME 2: {t2['name']}
       ========================================================================== */
    body[data-theme="{t2['id']}"] {{
      --bg-primary: {t2['bg_primary']};
      --bg-surface: {t2['bg_surface']};
      --bg-card: {t2['bg_card']};
      --bg-card-hover: {t2['bg_card_hover']};
      --text-primary: {t2['text_primary']};
      --text-muted: {t2['text_muted']};
      --text-subtle: {t2['text_subtle']};
      --border-color: {t2['border_color']};
      --accent: {t2['accent']};
      --accent-hover: {t2['accent_hover']};
      --accent-contrast: {t2['accent_contrast']};
      --accent-light: {t2['accent_light']};
      --badge-bg: {t2['badge_bg']};
      --badge-text: {t2['badge_text']};
      --radius: {t2['radius']};
      --font-heading: '{t2['font_heading']}', serif;
      --font-body: '{t2['font_body']}', sans-serif;
      --header-bg: {t2['header_bg']};
      --shadow: {t2['shadow']};
      --btn-radius: {t2['radius']};
    }}

    /* ==========================================================================
       THEME 3: {t3['name']}
       ========================================================================== */
    body[data-theme="{t3['id']}"] {{
      --bg-primary: {t3['bg_primary']};
      --bg-surface: {t3['bg_surface']};
      --bg-card: {t3['bg_card']};
      --bg-card-hover: {t3['bg_card_hover']};
      --text-primary: {t3['text_primary']};
      --text-muted: {t3['text_muted']};
      --text-subtle: {t3['text_subtle']};
      --border-color: {t3['border_color']};
      --accent: {t3['accent']};
      --accent-hover: {t3['accent_hover']};
      --accent-contrast: {t3['accent_contrast']};
      --accent-light: {t3['accent_light']};
      --badge-bg: {t3['badge_bg']};
      --badge-text: {t3['badge_text']};
      --radius: {t3['radius']};
      --font-heading: '{t3['font_heading']}', sans-serif;
      --font-body: '{t3['font_body']}', sans-serif;
      --header-bg: {t3['header_bg']};
      --shadow: {t3['shadow']};
      --btn-radius: {t3['radius']};
    }}
    """

    font_families = set([
        t1['font_heading'], t1['font_body'],
        t2['font_heading'], t2['font_body'],
        t3['font_heading'], t3['font_body']
    ])
    font_query = "&".join([f"family={f.replace(' ', '+')}:ital,wght@0,400;0,600;0,700;0,800;1,400" for f in font_families])

    # Stats HTML
    stats_html = "".join([f"""
      <div class="stat-card">
        <div class="stat-val">{val}</div>
        <div class="stat-lbl">{lbl}</div>
      </div>""" for val, lbl in data["stats"]])

    # Trust Badges
    trust_html = "".join([f'<span class="trust-logo">{t}</span>' for t in data["trust_badges"]])

    # Services HTML
    services_html = "".join([f"""
      <div class="srv-card">
        <div class="srv-img-wrap"><img src="{img}" alt="{title}" loading="lazy" class="srv-img"></div>
        <div class="srv-body">
          <div class="srv-badge">{badge}</div>
          <h3>{title}</h3>
          <p>{desc}</p>
          <div class="srv-pricing">
            <span>Starting from</span>
            <strong>{price}</strong>
          </div>
          <button class="btn btn-secondary srv-btn" onclick="scrollToForm('{title}')">Inquire Details &rarr;</button>
        </div>
      </div>""" for title, desc, price, badge, img in data["services"]])

    # Process Steps HTML
    steps_html = "".join([f"""
      <div class="proc-step">
        <div class="proc-num">{num}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>""" for num, title, desc in data["process_steps"]])

    # Reviews HTML
    reviews_html = "".join([f"""
      <div class="rev-card">
        <div class="rev-stars">★★★★★</div>
        <p class="rev-txt">"{txt}"</p>
        <div class="rev-author">
          <div class="rev-avatar">{name[0]}</div>
          <div>
            <div class="rev-name">{name}</div>
            <div class="rev-role">{role} • Verified Client</div>
          </div>
        </div>
      </div>""" for name, role, txt in data["reviews"]])

    # FAQ HTML
    faqs_html = "".join([f"""
      <details class="faq-item">
        <summary class="faq-q">{q} <span class="faq-icon">+</span></summary>
        <div class="faq-a">{a}</div>
      </details>""" for q, a in data["faqs"]])

    # Full HTML Document
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{data['title']}</title>
  <meta name="description" content="{data['meta_desc']}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?{font_query}&display=swap" rel="stylesheet">
  <style>
    {theme_css}

    /* Reset & Core Setup */
    *, *::before, *::after {{
      box-sizing: border-box; margin: 0; padding: 0;
      transition: background-color 0.25s ease, border-color 0.25s ease, color 0.2s ease, box-shadow 0.25s ease;
    }}
    html {{ scroll-behavior: smooth; }}
    body {{
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 16px;
      line-height: 1.65;
      padding-top: 48px;
      padding-bottom: 90px;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }}
    h1, h2, h3, h4, h5 {{
      font-family: var(--font-heading);
      color: var(--text-primary);
      line-height: 1.2;
      font-weight: 700;
      letter-spacing: -0.015em;
    }}
    p {{ color: var(--text-muted); margin-bottom: 1rem; }}
    a {{ color: inherit; text-decoration: none; }}
    img {{ max-width: 100%; height: auto; display: block; }}
    .wrap {{ max-width: 1200px; margin: 0 auto; padding: 0 24px; }}

    /* Top Persistent Sprint Bar */
    .uncoded-demo-bar {{
      position: fixed; top: 0; left: 0; right: 0; height: 48px;
      background: #0f172a; color: #fff; z-index: 1000;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 24px; font-size: 13px; font-family: -apple-system, sans-serif;
      border-bottom: 1px solid rgba(255,255,255,0.12);
    }}
    .demo-pill {{
      background: #3b82f6; color: #fff; font-weight: 700;
      padding: 4px 10px; border-radius: 20px; font-size: 11px;
      letter-spacing: 0.05em; text-transform: uppercase;
    }}
    .demo-claim-btn {{
      background: #22c55e; color: #0f172a; font-weight: 700;
      padding: 6px 14px; border-radius: 6px; font-size: 12px;
      transition: all 0.2s ease;
    }}
    .demo-claim-btn:hover {{ background: #4ade80; transform: translateY(-1px); }}
    .demo-pitch-btn {{
      background: rgba(59, 130, 246, 0.22); color: #93c5fd; border: 1px solid rgba(96, 165, 250, 0.4);
      font-weight: 700; padding: 5px 12px; border-radius: 6px; font-size: 11.5px;
      cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px;
    }}
    .demo-pitch-btn:hover {{ background: rgba(59, 130, 246, 0.38); color: #ffffff; border-color: #93c5fd; }}

    /* Founder Pitch / Strategy Cover Letter Pop-up Modal */
    .pitch-modal-backdrop {{
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(10, 15, 29, 0.82);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      z-index: 100000; display: none; align-items: center; justify-content: center;
      padding: 20px; opacity: 0; transition: opacity 0.3s ease;
    }}
    .pitch-modal-backdrop.active {{
      display: flex; opacity: 1;
    }}
    .pitch-modal-card {{
      background: #0f172a; color: #f8fafc;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 20px; max-width: 780px; width: 100%; max-height: 88vh;
      overflow-y: auto; padding: 36px; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
      position: relative; transform: translateY(20px) scale(0.97);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }}
    .pitch-modal-backdrop.active .pitch-modal-card {{
      transform: translateY(0) scale(1);
    }}
    .pitch-close-btn {{
      position: absolute; top: 20px; right: 20px;
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff; font-size: 18px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s ease;
    }}
    .pitch-close-btn:hover {{ background: rgba(255, 255, 255, 0.22); transform: scale(1.08); }}
    .pitch-badge {{
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 12px; border-radius: 30px; font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em;
      background: rgba(59, 130, 246, 0.18); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3);
      margin-bottom: 14px;
    }}
    .pitch-h2 {{
      font-size: 26px; line-height: 1.3; font-weight: 800; color: #ffffff;
      margin-bottom: 12px; font-family: var(--font-heading);
    }}
    .pitch-author-bar {{
      display: flex; align-items: center; gap: 12px; margin-bottom: 22px; padding-bottom: 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }}
    .pitch-author-avatar {{
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #06b6d4);
      display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; color: #fff;
    }}
    .pitch-author-name {{ font-weight: 700; font-size: 14px; color: #f1f5f9; }}
    .pitch-author-title {{ font-size: 12px; color: #94a3b8; }}
    .pitch-body {{
      font-size: 15px; line-height: 1.7; color: #cbd5e1; display: flex; flex-direction: column; gap: 16px;
    }}
    .pitch-body strong {{ color: #ffffff; }}
    .pitch-highlight-box {{
      background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px; padding: 18px 20px; margin: 4px 0;
    }}
    .pitch-actions {{
      display: flex; align-items: center; gap: 14px; margin-top: 26px; padding-top: 22px;
      border-top: 1px solid rgba(255, 255, 255, 0.12); flex-wrap: wrap;
    }}
    .pitch-cta-wa {{
      background: #22c55e; color: #0b1c11; font-weight: 800; font-size: 14px;
      padding: 13px 26px; border-radius: 10px; text-decoration: none; display: inline-flex;
      align-items: center; gap: 8px; transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(34, 197, 94, 0.35);
    }}
    .pitch-cta-wa:hover {{ background: #4ade80; transform: translateY(-2px); }}
    .pitch-cta-dismiss {{
      background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: #cbd5e1;
      padding: 12px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer;
      transition: all 0.2s ease;
    }}
    .pitch-cta-dismiss:hover {{ background: rgba(255, 255, 255, 0.08); color: #fff; }}

    /* Site Navigation */
    .site-nav {{
      position: sticky; top: 48px; z-index: 900;
      background: var(--header-bg); backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      padding: 16px 0;
    }}
    .nav-inner {{ display: flex; align-items: center; justify-content: space-between; }}
    .brand-logo {{
      font-family: var(--font-heading); font-size: 22px; font-weight: 800;
      letter-spacing: -0.02em; color: var(--text-primary);
    }}
    .brand-sub {{
      font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em;
      color: var(--accent); font-weight: 700; display: block; margin-top: 2px;
    }}
    .nav-links {{ display: flex; gap: 24px; align-items: center; font-size: 14px; font-weight: 600; }}
    .nav-links a:hover {{ color: var(--accent); }}

    /* Buttons */
    .btn {{
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 12px 26px; font-size: 15px; font-weight: 700;
      border-radius: var(--btn-radius); cursor: pointer; border: none;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }}
    .btn-primary {{
      background: var(--accent); color: var(--accent-contrast);
      box-shadow: 0 4px 14px var(--accent-light);
    }}
    .btn-primary:hover {{ background: var(--accent-hover); transform: translateY(-2px); }}
    .btn-secondary {{
      background: var(--bg-card); color: var(--text-primary);
      border: 1px solid var(--border-color);
    }}
    .btn-secondary:hover {{ background: var(--bg-card-hover); border-color: var(--accent); }}

    /* Hero Section */
    .hero {{ padding: 60px 0 50px; position: relative; }}
    .hero-grid {{
      display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 50px;
      align-items: center;
    }}
    .hero-tag {{
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; border-radius: 30px; font-size: 12px;
      font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
      background: var(--badge-bg); color: var(--badge-text);
      margin-bottom: 20px;
    }}
    .hero h1 {{ font-size: clamp(34px, 4.4vw, 56px); margin-bottom: 18px; }}
    .hero p {{ font-size: 18px; line-height: 1.6; color: var(--text-muted); margin-bottom: 28px; }}
    .hero-actions {{ display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 28px; }}
    .hero-img-box {{
      position: relative; border-radius: var(--radius); overflow: hidden;
      box-shadow: var(--shadow); border: 1px solid var(--border-color);
    }}
    .hero-img-box img {{ width: 100%; height: 460px; object-fit: cover; }}

    /* Stats Banner */
    .stat-banner {{
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
      margin: 20px 0 60px;
    }}
    .stat-card {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 22px; text-align: center;
      box-shadow: var(--shadow);
    }}
    .stat-val {{
      font-family: var(--font-heading); font-size: 34px; font-weight: 800;
      color: var(--accent); margin-bottom: 4px; line-height: 1;
    }}
    .stat-lbl {{ font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }}

    .trust-strip {{
      display: flex; gap: 24px; align-items: center; justify-content: center;
      flex-wrap: wrap; padding: 18px; border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color); margin-bottom: 60px;
    }}
    .trust-logo {{
      font-size: 13px; font-weight: 800; letter-spacing: 0.06em;
      color: var(--text-subtle); display: flex; align-items: center; gap: 6px;
    }}

    /* Section Headers */
    .sec-head {{ text-align: center; max-width: 680px; margin: 0 auto 46px; }}
    .sec-head h2 {{ font-size: 36px; margin-bottom: 12px; }}
    .sec-head p {{ font-size: 16px; color: var(--text-muted); }}

    /* Services Grid */
    .srv-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 80px; }}
    .srv-card {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column;
      box-shadow: var(--shadow);
    }}
    .srv-card:hover {{ transform: translateY(-4px); border-color: var(--accent); }}
    .srv-img-wrap {{ height: 180px; overflow: hidden; }}
    .srv-img {{ width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }}
    .srv-card:hover .srv-img {{ transform: scale(1.05); }}
    .srv-body {{ padding: 22px; display: flex; flex-direction: column; flex-grow: 1; }}
    .srv-badge {{
      align-self: flex-start; font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.06em;
      background: var(--badge-bg); color: var(--badge-text);
      padding: 3px 8px; border-radius: 4px; margin-bottom: 10px;
    }}
    .srv-body h3 {{ font-size: 20px; margin-bottom: 8px; }}
    .srv-body p {{ font-size: 14px; color: var(--text-muted); margin-bottom: 16px; flex-grow: 1; }}
    .srv-pricing {{
      display: flex; justify-content: space-between; align-items: baseline;
      padding-top: 14px; border-top: 1px solid var(--border-color); margin-bottom: 16px;
    }}
    .srv-pricing span {{ font-size: 12px; color: var(--text-subtle); }}
    .srv-pricing strong {{ font-size: 18px; color: var(--text-primary); font-family: var(--font-heading); }}
    .srv-btn {{ width: 100%; font-size: 14px; padding: 10px; }}

    /* Interactive Niche Tool Section */
    .interactive-sec {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 48px; margin-bottom: 80px;
      box-shadow: var(--shadow);
    }}
    .form-group {{ margin-bottom: 18px; text-align: left; }}
    .form-group label {{ display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary); }}
    .form-ctrl {{
      width: 100%; padding: 12px 16px; border: 1px solid var(--border-color);
      border-radius: var(--btn-radius); background: var(--bg-card);
      color: var(--text-primary); font-family: var(--font-body); font-size: 15px; outline: none;
    }}
    .form-ctrl:focus {{ border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }}

    /* Process Blueprint */
    .proc-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 24px; margin-bottom: 80px; }}
    .proc-step {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 28px; position: relative;
    }}
    .proc-num {{
      font-family: var(--font-heading); font-size: 40px; font-weight: 800;
      color: var(--accent); line-height: 1; margin-bottom: 12px; opacity: 0.9;
    }}
    .proc-step h3 {{ font-size: 19px; margin-bottom: 8px; }}
    .proc-step p {{ font-size: 14px; color: var(--text-muted); margin: 0; }}

    /* Testimonials */
    .rev-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 80px; }}
    .rev-card {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 26px; display: flex; flex-direction: column;
    }}
    .rev-stars {{ color: #f59e0b; font-size: 16px; margin-bottom: 12px; }}
    .rev-txt {{ font-size: 15px; font-style: italic; color: var(--text-muted); margin-bottom: 18px; flex-grow: 1; }}
    .rev-author {{ display: flex; align-items: center; gap: 12px; }}
    .rev-avatar {{
      width: 42px; height: 42px; border-radius: 50%;
      background: var(--accent); color: var(--accent-contrast);
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 15px;
    }}
    .rev-name {{ font-weight: 700; font-size: 14px; }}
    .rev-role {{ font-size: 12px; color: var(--text-subtle); }}

    /* FAQ Accordion */
    .faq-list {{ max-width: 800px; margin: 0 auto 80px; display: flex; flex-direction: column; gap: 12px; }}
    .faq-item {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); overflow: hidden;
    }}
    .faq-q {{
      padding: 18px 24px; font-weight: 700; font-size: 16px; cursor: pointer;
      display: flex; justify-content: space-between; align-items: center;
      list-style: none;
    }}
    .faq-q::-webkit-details-marker {{ display: none; }}
    .faq-a {{ padding: 0 24px 20px; font-size: 15px; color: var(--text-muted); line-height: 1.6; }}
    .faq-icon {{ font-size: 20px; color: var(--accent); transition: transform 0.2s ease; }}
    .faq-item[open] .faq-icon {{ transform: rotate(45deg); }}

    /* Intake Contact Section */
    .contact-sec {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 50px; margin-bottom: 80px;
    }}
    .contact-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }}

    /* Footer */
    .site-footer {{
      border-top: 1px solid var(--border-color); padding: 50px 0 20px;
      font-size: 14px; color: var(--text-subtle); text-align: center;
    }}

    /* Floating 3-Theme Switcher Dock */
    .theme-dock {{
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.94); backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 40px; padding: 6px 12px;
      display: flex; align-items: center; gap: 8px; z-index: 2000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }}
    .theme-dock-lbl {{
      color: #94a3b8; font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em; padding: 0 8px;
    }}
    .theme-opt-btn {{
      background: transparent; border: 1px solid transparent; color: #f1f5f9;
      font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 30px;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      transition: all 0.2s ease;
    }}
    .theme-opt-btn:hover {{ background: rgba(255,255,255,0.1); }}
    .theme-opt-btn.active {{
      background: #3b82f6; color: #fff; border-color: #60a5fa;
      box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
    }}

    /* Mobile Responsive */
    @media (max-width: 900px) {{
      .hero-grid {{ grid-template-columns: 1fr; gap: 32px; }}
      .hero-img-box img {{ height: 320px; }}
      .stat-banner {{ grid-template-columns: repeat(2, 1fr); }}
      .contact-grid {{ grid-template-columns: 1fr; gap: 32px; }}
      .interactive-sec {{ padding: 24px; }}
      .nav-links {{ display: none; }}
      .theme-dock {{ width: 92%; justify-content: center; }}
      .theme-dock-lbl {{ display: none; }}
      .theme-opt-btn {{ font-size: 11px; padding: 6px 10px; }}
    }}
  </style>
</head>
<body data-theme="{t1['id']}">

  <!-- Persistent Client Sprint Demo Bar -->
  <div class="uncoded-demo-bar">
    <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
      <span class="demo-pill">{data['niche_label']}</span>
      <span style="color:#cbd5e1; font-weight:500;">Interactive 7-Day Sprint Prototype • Built Exclusively by Uncoded Hub</span>
      <button class="demo-pitch-btn" onclick="openPitchModal()">✨ Why We Built This Demo</button>
    </div>
    <a href="https://wa.me/918660819023?text=Hi%20Uncoded%20Hub,%20I%20want%20to%20claim%20this%20exact%20{data['niche_label']}%20website%20for%20my%20business" class="demo-claim-btn" target="_blank">Claim This Website For My Business</a>
  </div>

  <!-- Navigation -->
  <header class="site-nav">
    <div class="wrap nav-inner">
      <div>
        <span class="brand-logo">{data['brand_name']}</span>
        <span class="brand-sub">{data['brand_tagline']}</span>
      </div>
      <nav class="nav-links">
        <a href="#services">Services</a>
        <a href="#interactive">Interactive Tool</a>
        <a href="#process">Process</a>
        <a href="#reviews">Reviews</a>
        <a href="#faq">FAQ</a>
      </nav>
      <button class="btn btn-primary" onclick="scrollToForm()">Book Consultation</button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <div class="hero-tag">{data['hero_badge']}</div>
        <h1>{data['h1']}</h1>
        <p>{data['subtitle']}</p>
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="scrollToInteractive()">{data['primary_cta']}</button>
          <button class="btn btn-secondary" onclick="openWhatsApp()">{data['secondary_cta']}</button>
        </div>
        <div style="font-size:13px; color:var(--text-subtle); display:flex; align-items:center; gap:8px;">
          <span style="color:#f59e0b;">★★★★★</span> Rated 4.9/5 from 450+ verified local clients
        </div>
      </div>
      <div class="hero-img-box">
        <img src="{data['hero_img']}" alt="{data['brand_name']}" loading="eager">
      </div>
    </div>
  </section>

  <!-- Stat Banner -->
  <div class="wrap">
    <div class="stat-banner">
      {stats_html}
    </div>
    <div class="trust-strip">
      <span style="font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:var(--accent);">TRUSTED ACCREDITATIONS:</span>
      {trust_html}
    </div>
  </div>

  <!-- Services Grid -->
  <section id="services" style="padding: 20px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>{data['services_head']}</h2>
        <p>{data['services_sub']}</p>
      </div>
      <div class="srv-grid">
        {services_html}
      </div>
    </div>
  </section>

  <!-- Interactive Niche Tool -->
  <section id="interactive" style="padding: 20px 0;">
    <div class="wrap">
      <div class="interactive-sec">
        <div class="sec-head" style="margin-bottom:30px;">
          <h2>{data['interactive_head']}</h2>
          <p>{data['interactive_sub']}</p>
        </div>
        {data['interactive_html']}
      </div>
    </div>
  </section>

  <!-- Process Blueprint -->
  <section id="process" style="padding: 20px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>{data['process_head']}</h2>
        <p>{data['process_sub']}</p>
      </div>
      <div class="proc-grid">
        {steps_html}
      </div>
    </div>
  </section>

  <!-- Reviews & Social Proof -->
  <section id="reviews" style="padding: 20px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>{data['reviews_head']}</h2>
        <p>{data['reviews_sub']}</p>
      </div>
      <div class="rev-grid">
        {reviews_html}
      </div>
    </div>
  </section>

  <!-- FAQ Accordion -->
  <section id="faq" style="padding: 20px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about our standards, timelines, fees, and booking guarantee.</p>
      </div>
      <div class="faq-list">
        {faqs_html}
      </div>
    </div>
  </section>

  <!-- Intake Form Section -->
  <section id="contact" style="padding: 20px 0;">
    <div class="wrap">
      <div class="contact-sec">
        <div class="contact-grid">
          <div>
            <div class="hero-tag" style="margin-bottom:12px;">Direct Inbound Booking</div>
            <h2 style="font-size:32px; margin-bottom:16px;">{data['form_head']}</h2>
            <p style="font-size:15px; margin-bottom:24px;">{data['form_sub']}</p>
            <div style="font-size:14px; color:var(--text-muted); display:flex; flex-direction:column; gap:12px;">
              <div>📍 <strong>Location:</strong> Prime Central Corridor • Dedicated Parking Available</div>
              <div>⚡ <strong>Response Time:</strong> Instant WhatsApp Confirmation in &lt; 15 mins</div>
              <div>🛡️ <strong>Guarantee:</strong> 100% Confidentiality &amp; Certified Standards</div>
            </div>
          </div>
          <div>
            <form onsubmit="handleFormSubmit(event)" style="background:var(--bg-card); padding:28px; border-radius:var(--radius); border:1px solid var(--border-color);">
              <div class="form-group">
                <label>Your Full Name</label>
                <input type="text" class="form-ctrl" id="fName" placeholder="e.g. Vikramaditya Rao" required>
              </div>
              <div class="form-group">
                <label>Phone / WhatsApp Number</label>
                <input type="tel" class="form-ctrl" id="fPhone" placeholder="+91 98765 43210" required>
              </div>
              <div class="form-group">
                <label>Service or Consultation Requirement</label>
                <input type="text" class="form-ctrl" id="fService" placeholder="Select or type service..." value="{data['default_service_inquiry']}">
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:8px;">Submit Consultation Request</button>
              <div id="formSuccess" style="display:none; margin-top:14px; color:#22c55e; font-weight:700; text-align:center; font-size:14px;">
                ✓ Request received! Opening WhatsApp confirmation...
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="wrap">
      <div style="font-family:var(--font-heading); font-size:20px; font-weight:800; margin-bottom:8px;">{data['brand_name']}</div>
      <p style="font-size:13px; max-width:500px; margin:0 auto 20px;">Dedicated flagship presence crafted for local authority. Built with sub-1.5s mobile speed, zero bloated plugins, and 100% code ownership.</p>
      <div style="font-size:12px; opacity:0.7;">© 2026 {data['brand_name']}. Prototype designed by Uncoded Hub 7-Day Sprint.</div>
    </div>
  </footer>

  <!-- Floating 3-Theme Switcher Dock -->
  <div class="theme-dock">
    <span class="theme-dock-lbl">Design Theme:</span>
    <button class="theme-opt-btn active" id="btn-{t1['id']}" onclick="setTheme('{t1['id']}')">
      <span>{t1['icon']}</span> {t1['name']}
    </button>
    <button class="theme-opt-btn" id="btn-{t2['id']}" onclick="setTheme('{t2['id']}')">
      <span>{t2['icon']}</span> {t2['name']}
    </button>
    <button class="theme-opt-btn" id="btn-{t3['id']}" onclick="setTheme('{t3['id']}')">
      <span>{t3['icon']}</span> {t3['name']}
    </button>
  </div>

  <!-- Founder Pitch & Strategy Cover Letter Modal -->
  <div class="pitch-modal-backdrop" id="uncodedPitchModal" onclick="handleBackdropClick(event)">
    <div class="pitch-modal-card">
      <button class="pitch-close-btn" onclick="closePitchModal()" title="Close dialog">✕</button>
      <div class="pitch-badge">Confidential Founder Pitch • 7-Day Sprint Specimen</div>
      <h2 class="pitch-h2">Why We Hand-Built This Prototype For Your Business Before Asking For A Rupee</h2>
      
      <div class="pitch-author-bar">
        <div class="pitch-author-avatar">UH</div>
        <div>
          <div class="pitch-author-name">Deepak &amp; Geetha</div>
          <div class="pitch-author-title">Founders &amp; Principal Engineers, Uncoded Hub (Bangalore, India)</div>
        </div>
      </div>

      <div class="pitch-body">
        <p>Dear Business Owner / Practice Director,</p>
        <p>Most digital agencies pitch generic 40-page PDF decks, throw around buzzwords like "bespoke omni-channel synergy", and demand ₹1.5L–₹3L before proving they understand a single thing about your real customers. <strong>We do the opposite: we do the work first.</strong></p>

        <div class="pitch-highlight-box">
          <h4 style="color:#60a5fa; margin-bottom:6px; font-size:15px;">1. The Invisible Systems Leak (The Art of Thinking in Systems)</h4>
          <p style="margin:0; font-size:14px; color:#cbd5e1;">In systems thinking, your customer acquisition operates on stocks and flows. You invest money into Google Maps, local SEO, Instagram, or referrals. That is your <em>inflow</em>. But when a prospective client arrives on a slow WordPress site that takes 4+ seconds to load or has confusing navigation, <strong>over 70% bounce silently</strong>. That is your invisible <em>outflow</em>. Pouring more ad spend into a leaking bucket never fixes the problem—re-engineering the conversion asset does.</p>
        </div>

        <div class="pitch-highlight-box">
          <h4 style="color:#60a5fa; margin-bottom:6px; font-size:15px;">2. Direct-Response Conversion Science (Making Websites Win)</h4>
          <p style="margin:0; font-size:14px; color:#cbd5e1;">This website is engineered with DiPS (Diagnose-Problem-Solution) architecture: sub-1.5s mobile speed, upfront treatment/service clarity, interactive self-qualification tools, and direct 1-tap WhatsApp consultation. It resolves your prospect's unvoiced fears within 50 milliseconds so they reach out to you instead of checking your competitors.</p>
        </div>

        <div class="pitch-highlight-box">
          <h4 style="color:#60a5fa; margin-bottom:6px; font-size:15px;">3. Distinct Strategic Identity (Designing Brand Identity)</h4>
          <p style="margin:0; font-size:14px; color:#cbd5e1;">A brand is the gut feeling a customer has about your business. Notice the floating theme dock at the bottom of this page: you can switch between <strong>3 complete aesthetic directions</strong> in real-time. We craft a distinctive visual language that commands premium pricing and local category leadership.</p>
        </div>

        <p><strong>Our 7-Day Sprint Guarantee:</strong> You work directly with us (Deepak &amp; Geetha). In 7 working days, we replace all demo content with your real logo, photos, pricing, and phone number, connect your WhatsApp funnel, and hand you 100% code ownership with zero monthly platform lock-ins.</p>
      </div>

      <div class="pitch-actions">
        <a href="https://wa.me/918660819023?text=Hi%20Deepak%20%26%20Geetha,%20I%20am%20viewing%20the%20{data['niche_label']}%20demo%20and%20want%20to%20discuss%20claiming%20it%20for%20my%20business." class="pitch-cta-wa" target="_blank">
          Claim This Website on WhatsApp (+91 8660819023) →
        </a>
        <button class="pitch-cta-dismiss" onclick="closePitchModal()">Explore Live Demo Specimen ↓</button>
      </div>
    </div>
  </div>

  <script>
    // Theme Switcher Logic
    function setTheme(themeId) {{
      document.body.setAttribute('data-theme', themeId);
      localStorage.setItem('uncoded_theme_{data["key"]}', themeId);
      document.querySelectorAll('.theme-opt-btn').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById('btn-' + themeId);
      if (activeBtn) activeBtn.classList.add('active');
    }}

    // Restore saved theme on load
    (function() {{
      const saved = localStorage.getItem('uncoded_theme_{data["key"]}');
      if (saved) {{
        setTheme(saved);
      }}
    }})();

    // Navigation & Form helpers
    function scrollToForm(serviceName) {{
      if (serviceName) {{
        document.getElementById('fService').value = serviceName;
      }}
      document.getElementById('contact').scrollIntoView({{ behavior: 'smooth' }});
    }}

    function scrollToInteractive() {{
      document.getElementById('interactive').scrollIntoView({{ behavior: 'smooth' }});
    }}

    function openWhatsApp() {{
      window.open("https://wa.me/918660819023?text=" + encodeURIComponent("Hi {data['brand_name']}, I would like to inquire about your services."), "_blank");
    }}

    function handleFormSubmit(e) {{
      e.preventDefault();
      const name = document.getElementById('fName').value;
      const phone = document.getElementById('fPhone').value;
      const srv = document.getElementById('fService').value;
      document.getElementById('formSuccess').style.display = 'block';
      setTimeout(() => {{
        window.open("https://wa.me/918660819023?text=" + encodeURIComponent("Hello! Name: " + name + " | Phone: " + phone + " | Requirement: " + srv), "_blank");
      }}, 800);
    }}

    // Founder Pitch Modal Functions
    function openPitchModal() {{
      const modal = document.getElementById('uncodedPitchModal');
      if (modal) {{
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }}
    }}

    function closePitchModal() {{
      const modal = document.getElementById('uncodedPitchModal');
      if (modal) {{
        modal.classList.remove('active');
        document.body.style.overflow = '';
        localStorage.setItem('uncoded_pitch_viewed', 'true');
      }}
    }}

    function handleBackdropClick(e) {{
      if (e.target.id === 'uncodedPitchModal') {{
        closePitchModal();
      }}
    }}

    document.addEventListener('keydown', function(e) {{
      if (e.key === 'Escape') {{
        closePitchModal();
      }}
    }});

    // Gentle auto-open for first-time visitors after 2.5s delay
    window.addEventListener('DOMContentLoaded', function() {{
      setTimeout(function() {{
        if (!localStorage.getItem('uncoded_pitch_viewed')) {{
          openPitchModal();
        }}
      }}, 2500);
    }});

    {data['interactive_js']}
  </script>
</body>
</html>"""
    return html

print("Loaded generator function render_page successfully.")
