import fs from 'node:fs';

let content = fs.readFileSync('src/data/projects.ts', 'utf8');
const oldStr = "image: '/demos/thumbnails/business-portfolio-theme1.webp',";
const newStr = "image: '/demos/assets/demo-09-business-portfolio/01_Hero_Showcase.png',";

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  content = content.replace("palette: ['#F4F5F7', '#1E293B', '#475569'],", "palette: ['#0F172A', '#1E293B', '#D97706'],");
  content = content.replace("accentHex: '#1E293B',", "accentHex: '#D97706',");
  fs.writeFileSync('src/data/projects.ts', content, 'utf8');
  console.log('Successfully updated projects.ts for Demo 09');
} else {
  console.error('Target string not found');
}
