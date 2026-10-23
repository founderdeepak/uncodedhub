import fs from 'fs';
import path from 'path';

const dir = 'Demo Website Template for New Niches';
const originalBlock = `    // Auto-open for first-time visitors after 15 seconds
    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        if (!localStorage.getItem('uncoded_pitch_viewed')) {
          openPitchModal();
        }
      }, 15000);
    });`;

let count = 0;
if (fs.existsSync(dir)) {
  fs.readdirSync(dir).filter(f => f.endsWith('.html')).forEach(file => {
    const p = path.join(dir, file);
    let c = fs.readFileSync(p, 'utf8');
    const targetRegex = /\/\/\s*\[HELD FOR VIDEO RENDERING\][\s\S]*?\*\/;?/;
    if (targetRegex.test(c)) {
      c = c.replace(targetRegex, originalBlock);
      fs.writeFileSync(p, c, 'utf8');
      count++;
      console.log(`[RESTORED] ${file}`);
    }
  });
}

console.log(`\nSuccessfully restored all ${count} files in ${dir}.`);
