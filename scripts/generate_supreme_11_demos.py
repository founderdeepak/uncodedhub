import os
import json

output_dir = "Demo Website Template for New Niches"
os.makedirs(output_dir, exist_ok=True)

def generate_supreme_demo(data):
    filename = data['filename']
    title = data['title']
    niche_label = data['niche_label']
    brand_name = data['brand_name']
    brand_tagline = data['brand_tagline']
    hero_badge = data['hero_badge']
    h1 = data['h1']
    subtitle = data['subtitle']
    primary_cta = data['primary_cta']
    secondary_cta = data['secondary_cta']
    hero_img = data['hero_img']
    stats = data['stats']
    trust_logos = data['trust_logos']
    services_head = data['services_head']
    services_sub = data['services_sub']
    services = data['services']
    interactive_head = data['interactive_head']
    interactive_sub = data['interactive_sub']
    interactive_html = data['interactive_html']
    interactive_js = data['interactive_js']
    process_head = data['process_head']
    process_sub = data['process_sub']
    process_steps = data['process_steps']
    gallery_head = data['gallery_head']
    gallery_sub = data['gallery_sub']
    gallery_items = data['gallery_items']
    reviews_head = data['reviews_head']
    reviews_sub = data['reviews_sub']
    reviews = data['reviews']
    faqs_head = data['faqs_head']
    faqs = data['faqs']
    form_head = data['form_head']
    form_sub = data['form_sub']
    form_fields = data['form_fields']
    themes = data['themes'] # [theme1, theme2, theme3]

    t1, t2, t3 = themes

    # CSS for 3 Themes
    theme_css = f"""
    /* Theme 1: {t1['name']} */
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
      --accent-light: {t1['accent_light']};
      --badge-bg: {t1['badge_bg']};
      --badge-text: {t1['badge_text']};
      --radius: {t1['radius']};
      --font-heading: '{t1['font_heading']}', serif;
      --font-body: '{t1['font_body']}', sans-serif;
      --header-bg: {t1['header_bg']};
      --shadow: {t1['shadow']};
    }}

    /* Theme 2: {t2['name']} */
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
      --accent-light: {t2['accent_light']};
      --badge-bg: {t2['badge_bg']};
      --badge-text: {t2['badge_text']};
      --radius: {t2['radius']};
      --font-heading: '{t2['font_heading']}', serif;
      --font-body: '{t2['font_body']}', sans-serif;
      --header-bg: {t2['header_bg']};
      --shadow: {t2['shadow']};
    }}

    /* Theme 3: {t3['name']} */
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
      --accent-light: {t3['accent_light']};
      --badge-bg: {t3['badge_bg']};
      --badge-text: {t3['badge_text']};
      --radius: {t3['radius']};
      --font-heading: '{t3['font_heading']}', sans-serif;
      --font-body: '{t3['font_body']}', sans-serif;
      --header-bg: {t3['header_bg']};
      --shadow: {t3['shadow']};
    }}
    """

    fonts_needed = set()
    for t in themes:
        fonts_needed.add(t['font_heading'])
        fonts_needed.add(t['font_body'])
    fonts_url = "https://fonts.googleapis.com/css2?" + "&".join([f"family={f.replace(' ', '+')}:ital,wght@0,400;0,600;0,700;0,800;1,400" for f in fonts_needed]) + "&display=swap"

    stats_html = "".join([f'''
      <div class="stat-card">
        <div class="stat-val">{val}</div>
        <div class="stat-lbl">{lbl}</div>
      </div>''' for val, lbl in stats])

    logos_html = "".join([f'<span class="trust-logo">{l}</span>' for l in trust_logos])

    services_html = "".join([f'''
      <div class="srv-card">
        <div class="srv-img-wrap"><img src="{img}" alt="{stitle}" loading="lazy" class="srv-img"></div>
        <div class="srv-body">
          <div class="srv-badge">{tag}</div>
          <h3>{stitle}</h3>
          <p>{sdesc}</p>
          <div class="srv-pricing">
            <span>Starting from</span>
            <strong>{price}</strong>
          </div>
          <button class="btn btn-secondary srv-btn" onclick="scrollToForm('{stitle}')">Inquire Details &rarr;</button>
        </div>
      </div>''' for stitle, sdesc, price, tag, img in services])

    process_html = "".join([f'''
      <div class="step-card">
        <div class="step-num">{num}</div>
        <h4>{phead}</h4>
        <p>{pdesc}</p>
      </div>''' for num, phead, pdesc in process_steps])

    gallery_html = "".join([f'''
      <div class="gal-card">
        <img src="{gimg}" alt="{gtitle}" loading="lazy" class="gal-img">
        <div class="gal-overlay">
          <span class="gal-tag">{gtag}</span>
          <h4>{gtitle}</h4>
          <p>{gdesc}</p>
        </div>
      </div>''' for gtitle, gtag, gdesc, gimg in gallery_items])

    reviews_html = "".join([f'''
      <div class="rev-card">
        <div class="rev-stars">★★★★★</div>
        <p class="rev-text">"{rtext}"</p>
        <div class="rev-author">
          <div class="rev-avatar">{rname[0]}</div>
          <div>
            <strong>{rname}</strong>
            <small>{rtag}</small>
          </div>
        </div>
      </div>''' for rname, rtag, rtext in reviews])

    faqs_html = "".join([f'''
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          <span>{q}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-a">
          <p>{a}</p>
        </div>
      </div>''' for q, a in faqs])

    form_fields_html = "".join([f'''
      <div class="form-group">
        <label>{flabel}</label>
        {finput}
      </div>''' for flabel, finput in form_fields])

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{subtitle}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="{fonts_url}" rel="stylesheet">
  <style>
    {theme_css}
    
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
      letter-spacing: -0.02em;
    }}
    p {{ color: var(--text-muted); margin-bottom: 1rem; }}
    a {{ color: inherit; text-decoration: none; }}
    img {{ max-width: 100%; height: auto; display: block; object-fit: cover; }}

    .wrap {{ max-width: 1240px; margin: 0 auto; padding: 0 24px; }}
    
    /* Top Persistent Demo Bar */
    .uncoded-demo-bar {{
      position: fixed; top: 0; left: 0; right: 0; height: 48px;
      background: #090d16; border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 24px; font-size: 13px; z-index: 9999;
    }}
    .demo-pill {{
      background: #2563eb; color: #fff; padding: 4px 10px; border-radius: 99px;
      font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;
    }}
    .demo-claim-btn {{
      background: #10b981; color: #fff; padding: 6px 14px; border-radius: 6px;
      font-weight: 600; font-size: 12px; transition: 0.2s;
    }}
    .demo-claim-btn:hover {{ background: #059669; transform: scale(1.02); }}

    /* Site Navigation */
    .site-nav {{
      position: sticky; top: 48px; z-index: 1000;
      background: var(--header-bg); backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-color);
      padding: 16px 0;
    }}
    .nav-inner {{ display: flex; align-items: center; justify-content: space-between; }}
    .brand-logo {{ font-family: var(--font-heading); font-size: 24px; font-weight: 800; letter-spacing: -0.03em; }}
    .brand-sub {{ font-size: 11px; font-family: var(--font-body); color: var(--text-muted); display: block; }}
    .nav-links {{ display: flex; align-items: center; gap: 28px; font-weight: 500; font-size: 15px; }}
    .nav-links a:hover {{ color: var(--accent); }}

    /* Buttons */
    .btn {{
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 14px 28px; border-radius: var(--radius); font-weight: 600; font-size: 15px;
      cursor: pointer; border: none; transition: 0.25s ease;
    }}
    .btn-primary {{
      background: var(--accent); color: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }}
    .btn-primary:hover {{ filter: brightness(1.1); transform: translateY(-2px); }}
    .btn-secondary {{
      background: var(--bg-card); color: var(--text-primary);
      border: 1px solid var(--border-color);
    }}
    .btn-secondary:hover {{ background: var(--bg-card-hover); }}

    /* Hero Section */
    .hero {{ padding: 80px 0 60px; }}
    .hero-grid {{ display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 48px; align-items: center; }}
    .hero-tag {{
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; font-size: 12px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.05em; background: var(--badge-bg); color: var(--badge-text);
      border-radius: 99px; margin-bottom: 20px;
    }}
    .hero h1 {{ font-size: clamp(36px, 4.5vw, 56px); margin-bottom: 20px; }}
    .hero p {{ font-size: clamp(16px, 1.6vw, 19px); color: var(--text-muted); margin-bottom: 32px; }}
    .hero-actions {{ display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 32px; }}
    .hero-img-box {{
      border-radius: var(--radius); overflow: hidden;
      box-shadow: var(--shadow); border: 1px solid var(--border-color);
      position: relative; max-height: 480px;
    }}
    .hero-img-box img {{ width: 100%; height: 100%; object-fit: cover; }}

    /* Stats Banner */
    .stat-banner {{
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px; padding: 40px 0; border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color); margin: 60px 0 40px; text-align: center;
    }}
    .stat-val {{ font-size: 38px; font-weight: 800; color: var(--accent); font-family: var(--font-heading); }}
    .stat-lbl {{ font-size: 14px; color: var(--text-muted); font-weight: 500; }}

    /* Trust Logos */
    .trust-strip {{
      display: flex; justify-content: center; align-items: center; gap: 40px;
      flex-wrap: wrap; padding: 24px 0 60px; font-size: 14px; color: var(--text-subtle); font-weight: 600;
    }}

    /* Section Headings */
    .sec-head {{ text-align: center; margin-bottom: 48px; }}
    .sec-head h2 {{ font-size: clamp(28px, 3.5vw, 42px); margin-bottom: 12px; }}
    .sec-head p {{ color: var(--text-muted); max-width: 650px; margin: 0 auto; }}

    /* Services Grid */
    .srv-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 28px; margin-bottom: 80px; }}
    .srv-card {{
      background: var(--bg-card); border: 1px solid var(--border-color);
      border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column;
      box-shadow: var(--shadow);
    }}
    .srv-card:hover {{ transform: translateY(-4px); border-color: var(--accent); }}
    .srv-img-wrap {{ height: 210px; overflow: hidden; }}
    .srv-img {{ width: 100%; height: 100%; object-fit: cover; transition: 0.4s; }}
    .srv-card:hover .srv-img {{ transform: scale(1.04); }}
    .srv-body {{ padding: 28px; flex: 1; display: flex; flex-direction: column; }}
    .srv-badge {{
      display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase;
      color: var(--accent); margin-bottom: 10px;
    }}
    .srv-body h3 {{ font-size: 22px; margin-bottom: 12px; }}
    .srv-body p {{ font-size: 14px; flex: 1; }}
    .srv-pricing {{
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 0; border-top: 1px solid var(--border-color); margin-top: 14px;
      font-size: 13px; color: var(--text-muted);
    }}
    .srv-pricing strong {{ font-size: 18px; color: var(--text-primary); }}
    .srv-btn {{ width: 100%; margin-top: 12px; font-size: 14px; padding: 12px; }}

    /* Interactive Box */
    .interactive-wrap {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 48px; margin-bottom: 80px;
      box-shadow: var(--shadow);
    }}
    .form-group {{ margin-bottom: 20px; }}
    .form-group label {{ display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; }}
    .form-ctrl {{
      width: 100%; padding: 14px 16px; border-radius: var(--radius);
      border: 1px solid var(--border-color); background: var(--bg-card);
      color: var(--text-primary); font-size: 15px; outline: none;
    }}
    .form-ctrl:focus {{ border-color: var(--accent); }}

    /* Process Steps */
    .step-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 80px; }}
    .step-card {{
      background: var(--bg-card); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 32px 24px; position: relative;
    }}
    .step-num {{
      font-size: 32px; font-weight: 800; color: var(--accent); font-family: var(--font-heading);
      margin-bottom: 12px;
    }}
    .step-card h4 {{ font-size: 19px; margin-bottom: 10px; }}
    .step-card p {{ font-size: 14px; margin: 0; }}

    /* Gallery Showcase */
    .gal-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 80px; }}
    .gal-card {{
      height: 320px; border-radius: var(--radius); overflow: hidden;
      position: relative; border: 1px solid var(--border-color);
    }}
    .gal-img {{ width: 100%; height: 100%; object-fit: cover; transition: 0.4s; }}
    .gal-card:hover .gal-img {{ transform: scale(1.05); }}
    .gal-overlay {{
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
      padding: 24px; display: flex; flex-direction: column; justify-content: flex-end;
      color: #fff;
    }}
    .gal-tag {{ font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }}
    .gal-overlay h4 {{ font-size: 18px; color: #fff; margin-bottom: 4px; }}
    .gal-overlay p {{ font-size: 13px; color: rgba(255,255,255,0.8); margin: 0; }}

    /* Reviews */
    .rev-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 80px; }}
    .rev-card {{
      background: var(--bg-card); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 28px;
    }}
    .rev-stars {{ color: #f59e0b; margin-bottom: 12px; font-size: 16px; }}
    .rev-text {{ font-size: 15px; font-style: italic; margin-bottom: 20px; }}
    .rev-author {{ display: flex; align-items: center; gap: 12px; }}
    .rev-avatar {{
      width: 44px; height: 44px; border-radius: 50%; background: var(--accent);
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-weight: 700;
    }}
    .rev-author strong {{ display: block; font-size: 14px; }}
    .rev-author small {{ font-size: 12px; color: var(--text-subtle); }}

    /* FAQ */
    .faq-wrap {{ max-width: 820px; margin: 0 auto 80px; }}
    .faq-item {{ border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 12px; overflow: hidden; }}
    .faq-q {{
      width: 100%; padding: 18px 24px; background: var(--bg-card); color: var(--text-primary);
      border: none; text-align: left; font-size: 16px; font-weight: 600; cursor: pointer;
      display: flex; justify-content: space-between; align-items: center;
    }}
    .faq-a {{ padding: 0 24px 18px; background: var(--bg-card); display: none; font-size: 14px; color: var(--text-muted); }}
    .faq-item.active .faq-a {{ display: block; }}
    .faq-item.active .faq-icon {{ transform: rotate(45deg); }}

    /* Form Section */
    .form-section {{
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius); padding: 56px 48px; margin-bottom: 80px;
    }}
    .form-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }}

    /* Footer */
    footer {{
      background: var(--bg-surface); border-top: 1px solid var(--border-color);
      padding: 60px 0 30px; font-size: 14px; color: var(--text-muted);
    }}
    .ft-grid {{ display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }}

    /* Floating WhatsApp */
    .floating-wa-btn {{
      position: fixed; bottom: 90px; right: 24px; background: #25d366; color: #fff;
      padding: 14px 22px; border-radius: 99px; font-weight: 700; font-size: 14px;
      display: flex; align-items: center; gap: 10px; box-shadow: 0 8px 30px rgba(37,211,102,0.4);
      z-index: 998; transition: 0.25s;
    }}
    .floating-wa-btn:hover {{ transform: scale(1.05); }}

    /* ==========================================================================
       BOTTOM FLOATING 3-THEME SWITCHER DOCK
       ========================================================================== */
    .theme-dock {{
      position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
      background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 99px; padding: 6px 10px; display: flex; align-items: center; gap: 8px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6); z-index: 9999;
    }}
    .dock-label {{ font-size: 12px; font-weight: 700; color: #94a3b8; padding: 0 10px; }}
    .dock-btn {{
      background: transparent; color: #e2e8f0; border: none; padding: 8px 16px;
      border-radius: 99px; font-size: 13px; font-weight: 600; cursor: pointer;
      display: flex; align-items: center; gap: 6px; transition: 0.2s;
    }}
    .dock-btn.active {{
      background: #2563eb; color: #ffffff; box-shadow: 0 4px 12px rgba(37,99,235,0.4);
    }}

    @media (max-width: 900px) {{
      .hero-grid, .form-grid {{ grid-template-columns: 1fr; }}
      .nav-links {{ display: none; }}
      .ft-grid {{ grid-template-columns: 1fr; }}
      .form-section {{ padding: 32px 20px; }}
      .theme-dock {{ width: 92%; justify-content: space-around; }}
      .dock-label {{ display: none; }}
    }}
  </style>
</head>
<body>

  <!-- Persistent Client Sprint Demo Bar -->
  <div class="uncoded-demo-bar">
    <div style="display:flex; align-items:center; gap:12px;">
      <span class="demo-pill">{niche_label}</span>
      <span style="color:#cbd5e1; font-weight:500;">Interactive 7-Day Sprint Prototype • Delivered for ₹22,500 Flat</span>
    </div>
    <a href="https://wa.me/919999999999?text=Hi%20Uncoded%20Hub,%20I%20want%20this%20exact%20{niche_label.replace(' ', '%20')}%20website%20for%20my%20business" class="demo-claim-btn">Claim This Website For My Business</a>
  </div>

  <!-- Navigation -->
  <header class="site-nav">
    <div class="wrap nav-inner">
      <div>
        <span class="brand-logo">{brand_name}</span>
        <span class="brand-sub">{brand_tagline}</span>
      </div>
      <nav class="nav-links">
        <a href="#services">Services</a>
        <a href="#interactive">Estimator</a>
        <a href="#process">Protocol</a>
        <a href="#gallery">Showcase</a>
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
        <div class="hero-tag">{hero_badge}</div>
        <h1>{h1}</h1>
        <p>{subtitle}</p>
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="scrollToInteractive()">{primary_cta}</button>
          <button class="btn btn-secondary" onclick="openWhatsApp()">{secondary_cta}</button>
        </div>
        <div style="font-size:13px; color:var(--text-subtle); display:flex; align-items:center; gap:8px;">
          <span style="color:#f59e0b;">★★★★★</span> Rated 4.9/5 from 450+ verified local clients
        </div>
      </div>
      <div class="hero-img-box">
        <img src="{hero_img}" alt="{brand_name}" loading="eager">
      </div>
    </div>
  </section>

  <!-- Stat Banner -->
  <div class="wrap">
    <div class="stat-banner">
      {stats_html}
    </div>
    <div class="trust-strip">
      <span style="font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:var(--accent);">TRUSTED STANDARDS:</span>
      {logos_html}
    </div>
  </div>

  <!-- Services Grid -->
  <section id="services" style="padding: 40px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>{services_head}</h2>
        <p>{services_sub}</p>
      </div>
      <div class="srv-grid">
        {services_html}
      </div>
    </div>
  </section>

  <!-- Interactive Component Section -->
  <section id="interactive" style="padding: 20px 0;">
    <div class="wrap">
      <div class="interactive-wrap">
        <div class="sec-head" style="margin-bottom: 32px;">
          <h2>{interactive_head}</h2>
          <p>{interactive_sub}</p>
        </div>
        {interactive_html}
      </div>
    </div>
  </section>

  <!-- 4-Step Process -->
  <section id="process" style="padding: 40px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>{process_head}</h2>
        <p>{process_sub}</p>
      </div>
      <div class="step-grid">
        {process_html}
      </div>
    </div>
  </section>

  <!-- Gallery Showcase -->
  <section id="gallery" style="padding: 40px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>{gallery_head}</h2>
        <p>{gallery_sub}</p>
      </div>
      <div class="gal-grid">
        {gallery_html}
      </div>
    </div>
  </section>

  <!-- Reviews -->
  <section id="reviews" style="padding: 40px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>{reviews_head}</h2>
        <p>{reviews_sub}</p>
      </div>
      <div class="rev-grid">
        {reviews_html}
      </div>
    </div>
  </section>

  <!-- FAQs -->
  <section id="faq" style="padding: 40px 0;">
    <div class="wrap">
      <div class="sec-head">
        <h2>{faqs_head}</h2>
        <p>Direct answers to questions prospective clients frequently ask before booking.</p>
      </div>
      <div class="faq-wrap">
        {faqs_html}
      </div>
    </div>
  </section>

  <!-- Form Reservation -->
  <section id="inquiry-form" style="padding: 40px 0;">
    <div class="wrap">
      <div class="form-section">
        <div class="form-grid">
          <div>
            <span class="hero-tag">Direct Scheduling</span>
            <h2>{form_head}</h2>
            <p>{form_sub}</p>
            <div style="margin-top:24px; font-size:14px; color:var(--text-muted); line-height:1.8;">
              ✓ Instant WhatsApp Confirmation<br>
              ✓ Zero Spam Policy<br>
              ✓ Senior Practitioner Consultation
            </div>
          </div>
          <div>
            <form onsubmit="handleFormSubmit(event)">
              {form_fields_html}
              <button type="submit" class="btn btn-primary" style="width:100%; font-size:16px;">Confirm Reservation &rarr;</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="wrap">
      <div class="ft-grid">
        <div>
          <div class="brand-logo" style="margin-bottom:8px;">{brand_name}</div>
          <p>{subtitle}</p>
          <p style="font-size:13px; color:var(--text-subtle);">Location: 82 Lavelle Road, Central Business District, Bangalore</p>
        </div>
        <div>
          <h4 style="margin-bottom:14px; font-size:16px;">Direct Contact</h4>
          <p style="font-size:14px; margin-bottom:6px;">Direct Phone: +91 98765 43210</p>
          <p style="font-size:14px; margin-bottom:6px;">WhatsApp: Immediate Response</p>
          <p style="font-size:14px;">Hours: 7:00 AM – 9:00 PM (Daily)</p>
        </div>
        <div>
          <h4 style="margin-bottom:14px; font-size:16px;">Architecture</h4>
          <p style="font-size:13px;">Bespoke prototype engineered by <a href="https://uncodedhub.com" style="color:var(--accent); font-weight:700;">Uncoded Hub</a> for local business growth.</p>
        </div>
      </div>
      <div style="border-top: 1px solid var(--border-color); padding-top:24px; text-align:center; font-size:12px; color:var(--text-subtle);">
        © 2026 {brand_name}. All rights reserved. Sub-second performance benchmark verified.
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp -->
  <a href="javascript:void(0)" onclick="openWhatsApp()" class="floating-wa-btn">
    <span>💬 WhatsApp Us</span>
  </a>

  <!-- ==========================================================================
       BOTTOM FLOATING 3-STYLE INTERACTIVE PREVIEW SWITCHER
       ========================================================================== -->
  <div class="theme-dock" role="region" aria-label="Visual Theme Switcher">
    <span class="dock-label">🎨 3 STYLES:</span>
    <button class="dock-btn active" data-theme="{t1['id']}" onclick="applyTheme('{t1['id']}', this)">
      <span>{t1['icon']} {t1['name']}</span>
    </button>
    <button class="dock-btn" data-theme="{t2['id']}" onclick="applyTheme('{t2['id']}', this)">
      <span>{t2['icon']} {t2['name']}</span>
    </button>
    <button class="dock-btn" data-theme="{t3['id']}" onclick="applyTheme('{t3['id']}', this)">
      <span>{t3['icon']} {t3['name']}</span>
    </button>
  </div>

  <script>
    function applyTheme(themeId, btn) {{
      document.body.setAttribute('data-theme', themeId);
      document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      try {{ localStorage.setItem('uncoded_theme_{filename}', themeId); }} catch(e) {{}}
    }}
    try {{
      const saved = localStorage.getItem('uncoded_theme_{filename}');
      if (saved) {{
        const b = document.querySelector(`.dock-btn[data-theme="${{saved}}"]`);
        if (b) applyTheme(saved, b);
      }}
    }} catch(e) {{}}

    function toggleFaq(btn) {{
      const item = btn.parentElement;
      item.classList.toggle('active');
    }}
    function scrollToInteractive() {{
      document.getElementById('interactive').scrollIntoView({{ behavior: 'smooth' }});
    }}
    function scrollToForm(serviceName) {{
      document.getElementById('inquiry-form').scrollIntoView({{ behavior: 'smooth' }});
      if (serviceName) {{
        const select = document.querySelector('#inquiry-form select');
        if (select) select.value = serviceName;
      }}
    }}
    function handleFormSubmit(e) {{
      e.preventDefault();
      alert('Thank you! Your inquiry has been confirmed. Our team will WhatsApp you within 15 minutes.');
    }}
    function openWhatsApp() {{
      alert('This button automatically opens WhatsApp with pre-filled inquiries directly to your business phone!');
    }}
    {interactive_js}
  </script>
</body>
</html>
"""
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated Supreme Demo: {filepath} ({len(html)} bytes)")

print("Supreme generator core loaded!")
