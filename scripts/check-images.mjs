import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('public/demos/ayyanar-sirpa-kalai.html', 'utf8');
const regex = /<img[^>]+src=["']([^"']+)["']/g;
let match;
const sources = [];
while ((match = regex.exec(html)) !== null) {
  sources.push(match[1]);
}
console.log('Found image sources:', sources);

const ayyanarDir = path.resolve('public/demos/ayyanar');
console.log('Files in public/demos/ayyanar:');
fs.readdirSync(ayyanarDir).forEach(f => {
  const stat = fs.statSync(path.join(ayyanarDir, f));
  console.log(` - ${f} (${stat.size} bytes)`);
});
