import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

def create_rounded_image(img_path, size, radius, border_color=(255, 255, 255, 120), border_width=3):
    img = Image.open(img_path).convert('RGBA')
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    
    scale = 3
    mask_large = Image.new('L', (size * scale, size * scale), 0)
    draw_mask = ImageDraw.Draw(mask_large)
    draw_mask.rounded_rectangle([0, 0, size * scale, size * scale], radius=radius * scale, fill=255)
    mask = mask_large.resize((size, size), Image.Resampling.LANCZOS)
    
    rounded = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    rounded.paste(img, (0, 0))
    rounded.putalpha(mask)
    
    if border_width > 0:
        border_canvas = Image.new('RGBA', (size * scale, size * scale), (0, 0, 0, 0))
        draw_b = ImageDraw.Draw(border_canvas)
        draw_b.rounded_rectangle(
            [border_width * scale // 2, border_width * scale // 2, 
             size * scale - border_width * scale // 2, size * scale - border_width * scale // 2],
            radius=radius * scale,
            outline=border_color,
            width=border_width * scale
        )
        border = border_canvas.resize((size, size), Image.Resampling.LANCZOS)
        rounded = Image.alpha_composite(rounded, border)
        
    return rounded

def generate_banner(target_w, target_h, out_filename, platform_name="Social"):
    # 1. Base canvas: Warm ink #14130F
    canvas = Image.new('RGBA', (target_w, target_h), (20, 19, 15, 255))
    
    # 2. Hero image backdrop on right side
    hero = Image.open('public/hero-section.webp').convert('RGBA')
    hero_aspect = hero.width / hero.height
    new_h = int(target_h * 1.15)
    new_w = int(new_h * hero_aspect)
    hero_resized = hero.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    hero_layer = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    hero_x = target_w - new_w + int(target_w * 0.05)
    hero_y = (target_h - new_h) // 2
    hero_layer.paste(hero_resized, (hero_x, hero_y))
    
    # Fast vectorized gradient mask using numpy
    x_coords = np.linspace(0, 1, target_w)
    # 0 at left 38%, ramps up to 130 max at right edge
    alpha_curve = np.clip((x_coords - 0.38) / 0.62, 0, 1) * 140
    grad_arr = np.tile(alpha_curve.astype(np.uint8), (target_h, 1))
    grad_mask = Image.fromarray(grad_arr, mode='L')
    hero_layer.putalpha(grad_mask)
    canvas = Image.alpha_composite(canvas, hero_layer)
    
    # 3. Soft warm vignette & dark gradient over canvas
    dark_alpha = (248 - x_coords * 165).clip(0, 255).astype(np.uint8)
    dark_arr = np.zeros((target_h, target_w, 4), dtype=np.uint8)
    dark_arr[:, :, 0] = 18  # R
    dark_arr[:, :, 1] = 17  # G
    dark_arr[:, :, 2] = 13  # B
    dark_arr[:, :, 3] = np.tile(dark_alpha, (target_h, 1))
    dark_overlay = Image.fromarray(dark_arr, mode='RGBA')
    canvas = Image.alpha_composite(canvas, dark_overlay)
    
    # 4. Raspberry accent top bar
    draw = ImageDraw.Draw(canvas)
    top_bar_h = max(3, int(target_h * 0.008))
    draw.line([(0, top_bar_h // 2), (target_w, top_bar_h // 2)], fill=(199, 7, 75, 230), width=top_bar_h)
    
    # 5. Sizing & Scale factor
    scale_factor = target_h / 500.0
    
    # Right-side Founder Cards
    # In wide banners, cards are placed nicely on the right
    card_size = int(145 * scale_factor)
    card_radius = int(24 * scale_factor)
    
    border_w = max(2, int(2.5 * scale_factor))
    geetha_card = create_rounded_image('public/geetha.webp', card_size, card_radius, border_color=(255, 255, 255, 140), border_width=border_w)
    deepak_card = create_rounded_image('public/deepak.webp', card_size, card_radius, border_color=(255, 255, 255, 140), border_width=border_w)
    
    spacing = int(22 * scale_factor)
    cards_total_w = card_size * 2 + spacing
    right_margin = int(45 * scale_factor)
    cards_start_x = target_w - cards_total_w - right_margin
    cards_y = (target_h - card_size) // 2 - int(10 * scale_factor)
    
    # Soft card drop shadows
    shadow_pad = int(16 * scale_factor)
    shadow_mask = Image.new('RGBA', (card_size + shadow_pad * 2, card_size + shadow_pad * 2), (0, 0, 0, 0))
    draw_sh = ImageDraw.Draw(shadow_mask)
    draw_sh.rounded_rectangle([shadow_pad, shadow_pad, shadow_pad + card_size, shadow_pad + card_size], radius=card_radius, fill=(0, 0, 0, 190))
    shadow = shadow_mask.filter(ImageFilter.GaussianBlur(radius=8 * scale_factor))
    
    # Paste Geetha
    canvas.paste(shadow, (cards_start_x - shadow_pad, cards_y - shadow_pad), shadow)
    canvas.paste(geetha_card, (cards_start_x, cards_y), geetha_card)
    
    # Paste Deepak
    deepak_x = cards_start_x + card_size + spacing
    canvas.paste(shadow, (deepak_x - shadow_pad, cards_y - shadow_pad), shadow)
    canvas.paste(deepak_card, (deepak_x, cards_y), deepak_card)
    
    # Fonts
    h1_size = int(44 * scale_factor)
    h2_size = int(44 * scale_factor)
    eyebrow_size = int(12 * scale_factor)
    cta_size = int(14.5 * scale_factor)
    url_size = int(14 * scale_factor)
    name_size = int(12 * scale_factor)
    role_size = int(10 * scale_factor)
    
    font_headline = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', h1_size)
    font_headline_i = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', h2_size)
    font_eyebrow = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', eyebrow_size)
    font_cta = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', cta_size)
    font_url = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', url_size)
    font_name = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', name_size)
    font_role = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', role_size)
    
    # Founder Badges
    for (name, role, px) in [("Geetha", "Co-founder · Design", cards_start_x), ("Deepak", "Co-founder · Engineering", deepak_x)]:
        badge_y = cards_y + card_size + int(10 * scale_factor)
        draw.text((px + card_size // 2, badge_y), name, font=font_name, fill=(245, 243, 239, 245), anchor="mt")
        draw.text((px + card_size // 2, badge_y + int(17 * scale_factor)), role, font=font_role, fill=(212, 175, 55, 220), anchor="mt")
        
    # Left Content Positioning
    left_x = int(60 * scale_factor)
    
    # 6. Eyebrow badge with circle logo
    eyebrow_y = int(58 * scale_factor)
    logo = Image.open('public/favicon-32x32.png').convert('RGBA')
    logo_sz = int(24 * scale_factor)
    logo_resized = logo.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    canvas.paste(logo_resized, (left_x, eyebrow_y), logo_resized)
    
    eyebrow_text = "UNCODED HUB · 7-DAY WEB ARCHITECTURE"
    draw.text((left_x + logo_sz + int(10 * scale_factor), eyebrow_y + int(4 * scale_factor)), 
              eyebrow_text, font=font_eyebrow, fill=(212, 175, 55, 240))
    
    # 7. Headline
    line1 = "Let your website"
    line2 = "sell before you do."
    
    line1_y = eyebrow_y + int(40 * scale_factor)
    draw.text((left_x, line1_y), line1, font=font_headline, fill=(245, 243, 239, 255))
    
    line2_y = line1_y + int(52 * scale_factor)
    draw.text((left_x, line2_y), line2, font=font_headline_i, fill=(245, 215, 142, 255)) # Soft radiant gold
    
    # 8. Subtitle / Value Proposition
    sub_y = line2_y + int(58 * scale_factor)
    sub_font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', int(15 * scale_factor))
    draw.text((left_x, sub_y), "High-performance websites for architects, clinics & high-ticket services.", 
              font=sub_font, fill=(184, 179, 168, 240))
    draw.text((left_x, sub_y + int(24 * scale_factor)), "Fixed price · 100/100 Core Web Vitals · Late means free.", 
              font=sub_font, fill=(184, 179, 168, 210))
    
    # 9. CTA Button + URL
    cta_y = sub_y + int(64 * scale_factor)
    cta_text = "Book your 20-min call now  →"
    
    bbox = font_cta.getbbox(cta_text)
    txt_w = bbox[2] - bbox[0]
    txt_h = bbox[3] - bbox[1]
    
    btn_pad_x = int(22 * scale_factor)
    btn_pad_y = int(13 * scale_factor)
    btn_w = txt_w + btn_pad_x * 2
    btn_h = txt_h + btn_pad_y * 2
    btn_r = int(9 * scale_factor)
    
    # Button drop shadow
    btn_shadow = Image.new('RGBA', (btn_w + 20, btn_h + 20), (0, 0, 0, 0))
    draw_bs = ImageDraw.Draw(btn_shadow)
    draw_bs.rounded_rectangle([10, 10, 10 + btn_w, 10 + btn_h], radius=btn_r, fill=(199, 7, 75, 120))
    btn_shadow = btn_shadow.filter(ImageFilter.GaussianBlur(radius=6 * scale_factor))
    canvas.paste(btn_shadow, (left_x - 10, cta_y - 10), btn_shadow)
    
    # Raspberry Button Fill
    draw.rounded_rectangle([left_x, cta_y, left_x + btn_w, cta_y + btn_h], radius=btn_r, fill=(199, 7, 75, 255))
    draw.text((left_x + btn_pad_x, cta_y + btn_pad_y - 1), cta_text, font=font_cta, fill=(255, 255, 255, 255))
    
    # Brand URL beside the button
    url_x = left_x + btn_w + int(22 * scale_factor)
    url_y = cta_y + (btn_h - txt_h) // 2
    dot_r = max(2, int(3 * scale_factor))
    draw.ellipse([url_x, url_y + txt_h//2 - dot_r, url_x + dot_r*2, url_y + txt_h//2 + dot_r], fill=(212, 175, 55, 200))
    draw.text((url_x + int(12 * scale_factor), url_y - 1), "uncodedhub.com", font=font_url, fill=(245, 243, 239, 220))
    
    # Save output
    rgb_out = canvas.convert('RGB')
    rgb_out.save(out_filename, quality=95, optimize=True)
    print(f"Generated {platform_name} banner: {out_filename} ({target_w}x{target_h})")

# Generate all standard social platform cover dimensions
os.makedirs('social_banners', exist_ok=True)

# 1. X / Twitter (1500 x 500)
generate_banner(1500, 500, 'social_banners/01_X_Twitter_Header_1500x500.png', 'X (Twitter)')

# 2. LinkedIn Personal Profile / Executive (1584 x 396)
generate_banner(1584, 396, 'social_banners/02_LinkedIn_Personal_Cover_1584x396.png', 'LinkedIn Personal')

# 3. LinkedIn Company Page Cover (1128 x 191) - Wide strip format
generate_banner(1128, 280, 'social_banners/03_LinkedIn_Company_Cover_1128x280.png', 'LinkedIn Company')

# 4. Facebook Page Cover (1640 x 924)
generate_banner(1640, 924, 'social_banners/04_Facebook_Page_Cover_1640x924.png', 'Facebook Page')

# 5. YouTube Banner (2560 x 1440)
generate_banner(2560, 1440, 'social_banners/05_YouTube_Channel_Banner_2560x1440.png', 'YouTube')

# 6. Universal Web / OpenGraph Banner (1200 x 630)
generate_banner(1200, 630, 'social_banners/06_Universal_Cover_1200x630.png', 'Universal / OG')
print("All banners generated successfully!")
