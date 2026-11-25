const fs = require('fs');
const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');

// Let's search for "by Deepak" or quotes or recurring patterns in title column
const rows = content.split('\n');
console.log('Searching for recurring quotes or signatures...');

const signatures = [];
rows.forEach(r => {
  if (r.includes('—') || r.includes('“') || r.includes('”') || r.includes('quote') || r.includes('founderdeepak') || r.includes('Deepak')) {
    // check
  }
});

// Let's inspect rows with multi-line content
const multiLineMatches = content.match(/\"([^\"]{50,1500})\"/g) || [];
console.log('Total multi-line blocks found:', multiLineMatches.length);
multiLineMatches.slice(0, 10).forEach((m, idx) => {
  console.log(`\n=== BLOCK ${idx+1} ===\n${m.substring(0, 300)}...`);
});
