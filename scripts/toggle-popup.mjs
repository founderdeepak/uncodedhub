import fs from 'fs';
import path from 'path';

const dirs = [
  'Demo Website Template for 6 NIches',
  'Demo Website Template for New Niches'
];

const action = process.argv[2]; // 'hold' or 'revert'

if (!action || (action !== 'hold' && action !== 'revert')) {
  console.log('Usage: node scripts/toggle-popup.mjs [hold|revert]');
  process.exit(1);
}

let modifiedCount = 0;

dirs.forEach(dir => {
  const dirPath = path.resolve(dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.html')).forEach(file => {
    const fullPath = path.join(dirPath, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    if (action === 'hold') {
      const regex = /(\/\/\s*(Gentle\s+)?auto-open for first-time visitors after 15 seconds[\r\n\s]+)(window\.addEventListener\('DOMContentLoaded',\s*function\(\)\s*\{[\r\n\s]+setTimeout\(function\(\)\s*\{[\r\n\s]+if\s*\(!localStorage\.getItem\('uncoded_pitch_viewed'\)\)\s*\{[\r\n\s]+openPitchModal\(\);[\r\n\s]+\}[\r\n\s]+\},\s*15000\);[\r\n\s]+\};?)/i;
      
      if (regex.test(content)) {
        content = content.replace(regex, '    // [HELD FOR VIDEO RENDERING] auto-open for first-time visitors after 15 seconds\n    /*\n$2\n    */');
        fs.writeFileSync(fullPath, content, 'utf8');
        modifiedCount++;
        console.log(`[HELD] ${file}`);
      }
    } else if (action === 'revert') {
      const heldRegex = /\/\/\s*\[HELD FOR VIDEO RENDERING\][^\n\r]*[\r\n\s]+\/\*[\r\n\s]+(window\.addEventListener\('DOMContentLoaded',\s*function\(\)\s*\{[\r\n\s]+setTimeout\(function\(\)\s*\{[\r\n\s]+if\s*\(!localStorage\.getItem\('uncoded_pitch_viewed'\)\)\s*\{[\r\n\s]+openPitchModal\(\);[\r\n\s]+\}[\r\n\s]+\},\s*15000\);[\r\n\s]+\};?)[\r\n\s]+\*\//;

      if (heldRegex.test(content)) {
        content = content.replace(heldRegex, '    // Auto-open for first-time visitors after 15 seconds\n    $1');
        fs.writeFileSync(fullPath, content, 'utf8');
        modifiedCount++;
        console.log(`[REVERTED] ${file}`);
      }
    }
  });
});

console.log(`\nSuccess: ${modifiedCount} files updated with action: ${action}`);
