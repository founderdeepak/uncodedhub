const fs = require('fs');

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

const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');
const rows = parseCSV(content);
const headers = rows[0];
const data = rows.slice(1);

function parseMetricVal(str) {
  if (!str) return 0;
  str = str.trim();
  if (str.endsWith('K') || str.endsWith('k')) return parseFloat(str) * 1000;
  if (str.endsWith('M') || str.endsWith('m')) return parseFloat(str) * 1000000;
  return parseFloat(str) || 0;
}

let totalViews = 0;
let totalLikes = 0;
let totalComments = 0;
let totalReposts = 0;

const posts = data.map(r => {
  const page = r[0];
  const sortBy = r[1];
  const publishedAt = r[2];
  const author = r[3];
  const title = r[4] || '';
  const status = r[5];
  const idPrefix = r[6];
  const raw = (r[7] || '').trim().split(/\s+/);

  let likes = 0, comments = 0, reposts = 0, views = 0;
  if (raw.length === 5) {
    likes = parseMetricVal(raw[0]);
    comments = parseMetricVal(raw[1]);
    reposts = parseMetricVal(raw[2]);
    views = parseMetricVal(raw[3]);
  } else if (raw.length === 4) {
    likes = parseMetricVal(raw[0]);
    comments = parseMetricVal(raw[1]);
    views = parseMetricVal(raw[2]);
  } else if (raw.length === 3) {
    likes = parseMetricVal(raw[0]);
    views = parseMetricVal(raw[1]);
  } else if (raw.length > 0) {
    views = parseMetricVal(raw[raw.length - 1]);
  }

  totalViews += views;
  totalLikes += likes;
  totalComments += comments;
  totalReposts += reposts;

  return { title, publishedAt, likes, comments, reposts, views, raw: r[7] };
});

console.log('=== AUDIENCE & ENGAGEMENT OVERVIEW ===');
console.log('Total analyzed top posts:', posts.length);
console.log('Total Views across top posts:', Math.round(totalViews).toLocaleString());
console.log('Total Likes:', Math.round(totalLikes).toLocaleString());
console.log('Average Views per Post:', Math.round(totalViews / posts.length).toLocaleString());

// Sort by views
const sortedByViews = [...posts].sort((a,b) => b.views - a.views);

console.log('\n=== TOP 20 MOST VIRAL THREADS ===');
sortedByViews.slice(0, 20).forEach((p, i) => {
  const cleanTitle = p.title.replace(/\r?\n/g, ' ').substring(0, 80);
  console.log(`${i+1}. [Views: ${p.views.toLocaleString()} | Likes: ${p.likes}] ${cleanTitle}`);
});

// Category classification
const categories = {
  "Crush & Catching Feelings (Signs & Psychology)": [],
  "Flirting & Texting Scripts (DMs, Goodnights, Sweet Texts)": [],
  "Hidden Attraction & Body Language (Coworkers, Friends, Secret Signs)": [],
  "Building Chemistry & Deep Connection (Compliments, Emotional intimacy)": [],
  "Red Flags, Green Flags & Heartbreak (Exes, Mixed signals, Kill attraction)": []
};

posts.forEach(p => {
  const t = p.title.toLowerCase();
  if (t.includes('text') || t.includes('flirt') || t.includes('message') || t.includes('compliment')) {
    categories["Flirting & Texting Scripts (DMs, Goodnights, Sweet Texts)"].push(p);
  } else if (t.includes('coworker') || t.includes('friend') || t.includes('public') || t.includes('hide') || t.includes('hiding') || t.includes('quietly')) {
    categories["Hidden Attraction & Body Language (Coworkers, Friends, Secret Signs)"].push(p);
  } else if (t.includes('chemistry') || t.includes('real feelings') || t.includes('love') || t.includes('deeper') || t.includes('wanted')) {
    categories["Building Chemistry & Deep Connection (Compliments, Emotional intimacy)"].push(p);
  } else if (t.includes('ex') || t.includes('kill attraction') || t.includes('scared') || t.includes('doubt') || t.includes('wrong')) {
    categories["Red Flags, Green Flags & Heartbreak (Exes, Mixed signals, Kill attraction)"].push(p);
  } else {
    categories["Crush & Catching Feelings (Signs & Psychology)"].push(p);
  }
});

console.log('\n=== CONTENT CLUSTER BREAKDOWN ===');
for (const [cat, items] of Object.entries(categories)) {
  const catViews = items.reduce((sum, item) => sum + item.views, 0);
  console.log(`- ${cat}: ${items.length} posts | Total Views: ${Math.round(catViews).toLocaleString()}`);
}
