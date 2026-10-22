import os
import glob
from PIL import Image

src_dir = 'OpenGraph Images'
out_dir = 'public/og'
os.makedirs(out_dir, exist_ok=True)

# Target dimensions for optimal OG display across WhatsApp, LinkedIn, X, FB
TARGET_WIDTH = 1200
TARGET_HEIGHT = 630

files = sorted(glob.glob(os.path.join(src_dir, '*.jpg')))
print(f"Processing {len(files)} OpenGraph images...")

for f in files:
    base = os.path.basename(f)
    img = Image.open(f).convert('RGB')
    orig_w, orig_h = img.size
    orig_size_kb = os.path.getsize(f) / 1024

    # Calculate center crop to 1.905:1 (1200x630)
    target_ratio = TARGET_WIDTH / TARGET_HEIGHT
    current_ratio = orig_w / orig_h

    if current_ratio > target_ratio:
        # Image is wider: crop left and right
        new_w = int(orig_h * target_ratio)
        left = (orig_w - new_w) // 2
        img_cropped = img.crop((left, 0, left + new_w, orig_h))
    else:
        # Image is taller: crop top and bottom
        new_h = int(orig_w / target_ratio)
        top = (orig_h - new_h) // 2
        img_cropped = img.crop((0, top, orig_w, top + new_h))

    # Resize with high quality Lanczos resampling
    img_resized = img_cropped.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)

    # Save optimized JPEG
    out_jpg = os.path.join(out_dir, base)
    img_resized.save(out_jpg, 'JPEG', quality=85, optimize=True, progressive=True)
    new_size_kb = os.path.getsize(out_jpg) / 1024

    # Also save modern WebP
    out_webp = os.path.join(out_dir, base.replace('.jpg', '.webp'))
    img_resized.save(out_webp, 'WEBP', quality=85, method=6)
    webp_size_kb = os.path.getsize(out_webp) / 1024

    print(f"[OK] {base}: {orig_w}x{orig_h} ({orig_size_kb:.0f}KB) -> 1200x630 JPG: {new_size_kb:.0f}KB | WebP: {webp_size_kb:.0f}KB")

print("\nAll 22 OpenGraph images successfully optimized into public/og/!")
