import fs from 'fs';
import path from 'path';

const dir = 'public/demos';
let count = 0;

if (fs.existsSync(dir)) {
  fs.readdirSync(dir).filter(f => f.endsWith('.html')).forEach(file => {
    const p = path.join(dir, file);
    let c = fs.readFileSync(p, 'utf8');
    const original = c;
    c = c.replace(/href=["']\/portfolio["']/g, 'href="/portfolio/"');
    c = c.replace(/href=["']\/contact["']/g, 'href="/contact/"');
    if (c !== original) {
      fs.writeFileSync(p, c, 'utf8');
      count++;
      console.log('Fixed trailing slashes in:', file);
    }
  });
}

console.log(`\nSuccessfully updated ${count} demo files.`);
