const fs = require('fs');
const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');

// Let's inspect the longest texts in zernio_top_500_engagement_posts.csv
const lines = content.split('\n');
console.log('Total lines:', lines.length);

// Let's find every cell that has quotes or multi-line text
const quotesFound = [];
lines.forEach(l => {
  if (l.includes('"') && l.length > 30) {
    // check
  }
});

// Let's search for words like "quote", "remember", "never", "love", "deepak", "founderdeepak", "threads"
const regex = /(?:“|")[^"”]{10,200}(?:”|")/g;
const m = content.match(regex) || [];
console.log('Total quoted phrases:', m.length);

const freq = {};
m.forEach(q => {
  const clean = q.trim();
  freq[clean] = (freq[clean] || 0) + 1;
});

const sorted = Object.entries(freq).sort((a,b) => b[1] - a[1]);
console.log('Most frequent quotes:');
sorted.slice(0, 25).forEach(([q, count]) => {
  console.log(`[${count}x] ${q}`);
});
