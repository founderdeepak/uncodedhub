import fs from 'fs';
import path from 'path';

const dirs = ['public/demos', 'Demo Website Template for 6 NIches', 'Demo Website Template for New Niches'];
let totalUnsafe = 0;
const affectedFiles = [];

dirs.forEach(d => {
  if (!fs.existsSync(d)) return;
  fs.readdirSync(d).filter(f => f.endsWith('.html')).forEach(file => {
    const full = path.join(d, file);
    const c = fs.readFileSync(full, 'utf8');
    const matches = [...c.matchAll(/<a\s+[^>]*target=["']_blank["'][^>]*>/gi)];
    let fileHasUnsafe = false;
    matches.forEach(m => {
      if (!m[0].includes('noopener') && !m[0].includes('noreferrer')) {
        totalUnsafe++;
        fileHasUnsafe = true;
      }
    });
    if (fileHasUnsafe) affectedFiles.push(path.join(d, file));
  });
});

console.log(`Total unsafe target="_blank" links: ${totalUnsafe} across ${affectedFiles.length} files:`);
affectedFiles.forEach(f => console.log(' ', f));
