import fs from 'fs';
import path from 'path';

const dest = 'public/client/demo/assets/adflowerpoint';
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

// Copy products 6 to 10 from high-res wedding / decor sources
const mapping = [
  { src: 'public/demos/assets/demo-04-wedding-photography/02_Work_01.png', dest: 'prod_varmala_pair.jpg' },
  { src: 'public/demos/assets/demo-04-wedding-photography/04_Work_03.png', dest: 'prod_floral_jewellery.jpg' },
  { src: 'public/demos/assets/demo-04-wedding-photography/05_Work_04.png', dest: 'prod_lotus_hangings.jpg' },
  { src: 'public/demos/assets/demo-11-salon-beauty/03_Work_02.png', dest: 'prod_mogra_choti.jpg' },
  { src: 'public/demos/assets/demo-04-wedding-photography/01_Hero_Showcase.png', dest: 'prod_bulk_box.jpg' }
];

for (const m of mapping) {
  if (fs.existsSync(m.src)) {
    fs.copyFileSync(m.src, path.join(dest, m.dest));
    console.log(`Copied ${m.src} -> ${m.dest}`);
  } else {
    console.log(`Source missing: ${m.src}`);
  }
}
