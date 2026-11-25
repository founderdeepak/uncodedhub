const fs = require('fs');

const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');

// Let's print out all lines in the CSV that have a dash (-) or quote or specific signature
const lines = content.split(/\r?\n/);
console.log('Total lines:', lines.length);

const candidateQuotes = new Set();
lines.forEach(l => {
  // check for quotes
  if (l.includes('”') || l.includes('“') || l.includes('—') || l.includes('- Deepak') || l.includes('~')) {
    candidateQuotes.add(l.trim());
  }
});

console.log('Candidates found with special quote symbols:');
Array.from(candidateQuotes).slice(0, 30).forEach(c => console.log('->', c));
