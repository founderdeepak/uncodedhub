import fs from 'fs';
import path from 'path';

const dirs = ['Demo Website Template for 6 NIches', 'Demo Website Template for New Niches'];
let count = 0;

dirs.forEach(d => {
  if (!fs.existsSync(d)) return;
  fs.readdirSync(d).filter(f => f.endsWith('.html')).forEach(file => {
    const full = path.join(d, file);
    let c = fs.readFileSync(full, 'utf8');
    const original = c;
    c = c.replace(/<a\s+([^>]*?)target=["']_blank["']([^>]*?)>/gi, (match, p1, p2) => {
      if (match.includes('noopener') || match.includes('noreferrer')) return match;
      return `<a ${p1}target="_blank" rel="noopener noreferrer"${p2}>`;
    });
    if (c !== original) {
      fs.writeFileSync(full, c, 'utf8');
      count++;
      console.log(`[Fixed unsafe links] ${file}`);
    }
  });
});

console.log(`\nUpdated ${count} template files with safe rel attributes!`);
