import fs from 'node:fs';
import path from 'node:path';

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

console.log('=== REACT PAGES SEO AUDIT ===');
const pageResults = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'DYNAMIC/HELMET';
  
  const descMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) 
                 || content.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const desc = descMatch ? descMatch[1] : 'DYNAMIC/HELMET';
  
  const h1Matches = content.match(/<h1[\s>]/g) || [];
  const h2Matches = content.match(/<h2[\s>]/g) || [];
  const h3Matches = content.match(/<h3[\s>]/g) || [];
  const h4Matches = content.match(/<h4[\s>]/g) || [];
  const h5Matches = content.match(/<h5[\s>]/g) || [];
  const h6Matches = content.match(/<h6[\s>]/g) || [];

  pageResults.push({
    file,
    title,
    titleLen: title.length,
    desc,
    descLen: desc.length,
    h1Count: h1Matches.length,
    h2Count: h2Matches.length,
    h3Count: h3Matches.length,
    h4Count: h4Matches.length,
    h5Count: h5Matches.length,
    h6Count: h6Matches.length,
  });
}

console.table(pageResults.map(p => ({
  file: p.file,
  h1s: p.h1Count,
  h2s: p.h2Count,
  h3s: p.h3Count,
  titleLen: p.titleLen,
  descLen: p.descLen,
  titleWarning: p.titleLen < 30 || p.titleLen > 65 ? (p.titleLen > 65 ? 'TOO_LONG' : 'TOO_SHORT') : 'OK',
  descWarning: p.descLen < 120 || p.descLen > 165 ? (p.descLen > 165 ? 'TOO_LONG' : 'TOO_SHORT') : 'OK',
  h1Warning: p.h1Count !== 1 ? (p.h1Count === 0 ? 'MISSING_H1' : 'MULTIPLE_H1') : 'OK'
})));

// Now audit blog posts
console.log('\n=== BLOG POSTS SEO AUDIT (538 Markdown Files) ===');
const blogDir = 'src/content/blog';
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let blogTitleTooLong = 0;
let blogTitleTooShort = 0;
let blogDescTooLong = 0;
let blogDescTooShort = 0;
let blogMissingDesc = 0;
let blogMissingTitle = 0;
let blogH1InMarkdown = 0;

const sampleBlogIssues = [];

for (const bf of blogFiles) {
  const content = fs.readFileSync(path.join(blogDir, bf), 'utf8');
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  
  if (!frontmatterMatch) continue;
  const fm = frontmatterMatch[1];
  
  const titleM = fm.match(/^title:\s*["']?(.*?)["']?$/m);
  const descM = fm.match(/^description:\s*["']?(.*?)["']?$/m);
  
  const title = titleM ? titleM[1].trim() : '';
  const desc = descM ? descM[1].trim() : '';
  
  // Check if markdown body contains # H1 (which would create a 2nd H1 if BlogView also renders <h1>)
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const bodyH1 = (body.match(/^#\s+[^\n]+/gm) || []).length;
  
  if (bodyH1 > 0) blogH1InMarkdown++;
  
  if (!title) blogMissingTitle++;
  else if (title.length > 65) blogTitleTooLong++;
  else if (title.length < 30) blogTitleTooShort++;
  
  if (!desc) blogMissingDesc++;
  else if (desc.length > 165) blogDescTooLong++;
  else if (desc.length < 115) blogDescTooShort++;

  if (sampleBlogIssues.length < 10 && (desc.length > 165 || desc.length < 115 || bodyH1 > 0)) {
    sampleBlogIssues.push({
      file: bf,
      titleLen: title.length,
      descLen: desc.length,
      bodyH1s: bodyH1,
      desc: desc.slice(0, 60) + '...'
    });
  }
}

console.log({
  totalBlogs: blogFiles.length,
  blogTitleTooLong,
  blogTitleTooShort,
  blogMissingTitle,
  blogDescTooLong,
  blogDescTooShort,
  blogMissingDesc,
  blogH1InMarkdown,
});

console.log('\nSample Blog Issues:');
console.table(sampleBlogIssues);

