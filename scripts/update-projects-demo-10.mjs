import fs from 'node:fs';

let content = fs.readFileSync('src/data/projects.ts', 'utf8');
const oldStr = "image: '/demos/thumbnails/spa-wellness-theme1.webp',";
const newStr = "image: '/demos/assets/demo-10-spa-wellness/01_Hero_Showcase.png',";

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  content = content.replace("palette: ['#F7F5EE', '#4A6B53', '#C48A54'],", "palette: ['#121A16', '#22302A', '#C48A54'],");
  content = content.replace("accentHex: '#4A6B53',", "accentHex: '#C48A54',");
  fs.writeFileSync('src/data/projects.ts', content, 'utf8');
  console.log('Successfully updated projects.ts for Demo 10');
} else {
  console.error('Target string not found');
}
