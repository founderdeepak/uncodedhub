import fs from 'node:fs';

let content = fs.readFileSync('src/data/projects.ts', 'utf8');
const oldStr = "image: '/demos/thumbnails/salon-beauty-theme1.webp',";
const newStr = "image: '/demos/assets/demo-11-salon-beauty/01_Hero_Showcase.png',";

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  content = content.replace("name: 'Rose Gold Glam',", "name: 'Paris Noir Haute Couture',");
  content = content.replace("style: 'Opulent Bridal Aesthetics',", "style: 'Parisian Balayage & Bridal',");
  content = content.replace("palette: ['#FAF5F5', '#BE7C7D', '#582C35'],", "palette: ['#0F1115', '#1F252E', '#D4AF37'],");
  content = content.replace("accentHex: '#BE7C7D',", "accentHex: '#D4AF37',");
  fs.writeFileSync('src/data/projects.ts', content, 'utf8');
  console.log('Successfully updated projects.ts for Demo 11');
} else {
  console.error('Target string not found');
}
