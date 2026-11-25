const fs = require('fs');
const path = require('path');

const md15 = fs.readFileSync(path.join(__dirname, 'ebooks', '15_the_jealousy_and_mixed_signals_antidote.md'), 'utf8');
const md23 = fs.readFileSync(path.join(__dirname, 'ebooks', '23_the_modern_romance_encyclopedia.md'), 'utf8');

console.log('--- BOOK 15 HEADINGS & BREAKS ---');
md15.split('\n').forEach((l, idx) => {
  if (l.startsWith('## ') || l.startsWith('---')) console.log(`${idx + 1}: ${l}`);
});

console.log('\n--- BOOK 23 HEADINGS & BREAKS ---');
md23.split('\n').forEach((l, idx) => {
  if (l.startsWith('## ') || l.startsWith('---')) console.log(`${idx + 1}: ${l}`);
});
