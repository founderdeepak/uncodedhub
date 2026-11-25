const fs = require('fs');

const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');

// Let's parse CSV properly
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

// Find recurring sentences / phrases across posts
const lineCount = {};
posts.forEach(p => {
  const lines = p.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 5);
  lines.forEach(line => {
    // Check if line looks like a signature or recurring quote
    lineCount[line] = (lineCount[line] || 0) + 1;
  });
});

const sortedLines = Object.entries(lineCount).sort((a,b) => b[1] - a[1]);
console.log('Top repeated lines/quotes across posts:');
sortedLines.slice(0, 30).forEach(([line, count]) => {
  if (count > 1) {
    console.log(`[Count: ${count}] ${line}`);
  }
});
