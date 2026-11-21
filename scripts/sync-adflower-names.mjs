import fs from 'fs';
import path from 'path';

const dir = 'public/client/demo/assets/adflowerpoint';
const copyMap = [
  { src: 'poster_square.jpg', dest: '01_Hero_Showcase.png' },
  { src: 'prod_haar.jpg', dest: '02_Product_Haar_01.png' },
  { src: 'prod_varmala_pair.jpg', dest: '03_Product_Haar_02.png' },
  { src: 'prod_latkan.jpg', dest: '04_Product_Latkan_01.png' },
  { src: 'prod_gajara.jpg', dest: '05_Product_Gajra_01.png' },
  { src: 'prod_mogra_choti.jpg', dest: '06_Product_Gajra_02.png' },
  { src: 'prod_haldiset.jpg', dest: '07_Product_Haldiset_01.png' },
  { src: 'prod_floral_jewellery.jpg', dest: '08_Product_Haldiset_02.png' },
  { src: 'prod_toran.jpg', dest: '09_Product_Toran_01.png' },
  { src: 'prod_lotus_hangings.jpg', dest: '10_Product_Toran_02.png' },
  { src: 'prod_bulk_box.jpg', dest: '11_Product_Bulkbox_01.png' },
  { src: 'prod_haar.jpg', dest: '12_Factory_Craft.png' }
];

for (const m of copyMap) {
  const s = path.join(dir, m.src);
  const d = path.join(dir, m.dest);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    console.log(`Synced ${m.src} -> ${m.dest}`);
  }
}
