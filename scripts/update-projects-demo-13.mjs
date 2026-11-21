import fs from 'node:fs';

let content = fs.readFileSync('src/data/projects.ts', 'utf8');
const oldStr = "image: '/demos/thumbnails/yoga-meditation-theme1.webp',";
const newStr = "image: '/demos/assets/demo-13-yoga-meditation/01_Hero_Showcase.png',";

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  content = content.replace("name: 'Rishikesh Ochre',", "name: 'Rishikesh Ochre & Teakwood',");
  content = content.replace("style: 'Sacred Temple Teakwood',", "style: 'Sacred Himalayan Shala',");
  content = content.replace("palette: ['#F9F6F0', '#C27D38', '#382D24'],", "palette: ['#1A140F', '#241D17', '#C27D38'],");
  content = content.replace("accentHex: '#C27D38',", "accentHex: '#C27D38',");
  fs.writeFileSync('src/data/projects.ts', content, 'utf8');
  console.log('Successfully updated projects.ts for Demo 13');
} else {
  console.error('Target string not found');
}
