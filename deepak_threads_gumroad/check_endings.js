const fs = require('fs');
const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');

function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let inQuotes = false;
  let currentToken = '';

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        currentToken += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      currentRow.push(currentToken);
      currentToken = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      currentRow.push(currentToken);
      currentToken = '';
      if (currentRow.length > 1) rows.push(currentRow);
      currentRow = [];
    } else {
      currentToken += c;
    }
  }
  if (currentToken || currentRow.length) {
    currentRow.push(currentToken);
    rows.push(currentRow);
  }
  return rows;
}

const rows = parseCSV(content);
const posts = rows.slice(1).map(r => r[4] || '');

// Check the last line of multi-line posts
const lastLines = {};
posts.forEach(p => {
  const lines = p.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length > 1) {
    const last = lines[lines.length - 1];
    lastLines[last] = (lastLines[last] || 0) + 1;
  }
});

const sorted = Object.entries(lastLines).sort((a,b) => b[1] - a[1]);
console.log('Most common final lines in posts:');
sorted.slice(0, 20).forEach(([line, count]) => {
  console.log(`[${count}x] ${line}`);
});
