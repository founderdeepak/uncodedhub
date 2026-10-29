import os
from PIL import Image

out_dir = os.path.abspath('public/demos/assets/dhananjay-joshi')
os.makedirs(out_dir, exist_ok=True)
src_dir = os.path.abspath('Client Database/1. Client one - photography/extracted_slides')

# Slide 2: Portrait of Dhananjay Joshi
im2 = Image.open(os.path.join(src_dir, 'slide_02.webp'))
w, h = im2.size
portrait = im2.crop((int(w * 0.65), int(h * 0.25), int(w * 0.95), int(h * 0.85)))
portrait.save(os.path.join(out_dir, 'dhananjay-portrait.webp'), 'WEBP', quality=90)
print('Saved portrait')

# Slide 1 & 2: Logo signature
logo = im2.crop((int(w * 0.35), int(h * 0.05), int(w * 0.66), int(h * 0.25)))
logo.save(os.path.join(out_dir, 'dj-signature-logo.webp'), 'WEBP', quality=90)
print('Saved logo')

# Crop photos from grid slides
def crop_grid_2x3(slide_name, prefix):
    im = Image.open(os.path.join(src_dir, slide_name))
    W, H = im.size
    col_w = int((1350 - 90) / 3)
    row_h = int((800 - 150) / 2)
    idx = 1
    for r in range(2):
        for c in range(3):
            box = (
                90 + c * col_w + 6,
                150 + r * row_h + 6,
                90 + (c + 1) * col_w - 6,
                150 + (r + 1) * row_h - 6
            )
            crop = im.crop(box)
            fname = f'{prefix}_{idx}.webp'
            crop.save(os.path.join(out_dir, fname), 'WEBP', quality=88)
            idx += 1

crop_grid_2x3('slide_10.webp', 'wildlife_s10')
crop_grid_2x3('slide_15.webp', 'wildlife_s15')
crop_grid_2x3('slide_20.webp', 'wildlife_s20')
print('Cropped grid photos successfully!')
