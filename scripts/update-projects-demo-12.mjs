import fs from 'node:fs';

let content = fs.readFileSync('src/data/projects.ts', 'utf8');
const oldStr = "image: '/demos/thumbnails/fitness-coach-theme1.webp',";
const newStr = "image: '/demos/assets/demo-12-fitness-coach/01_Hero_Showcase.png',";

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  content = content.replace("name: 'Performance Orange',", "name: 'Stealth Obsidian & Kinetic Blaze',");
  content = content.replace("style: 'High-Energy Kinetic Studio',", "style: 'Executive Kinesiology & Lab',");
  content = content.replace("palette: ['#0D0D0E', '#F97316', '#F4F4F5'],", "palette: ['#0B0D11', '#141820', '#F97316'],");
  content = content.replace("accentHex: '#F97316',", "accentHex: '#F97316',");
  fs.writeFileSync('src/data/projects.ts', content, 'utf8');
  console.log('Successfully updated projects.ts for Demo 12');
} else {
  console.error('Target string not found');
}
