import fs from 'node:fs';
import path from 'node:path';

function getHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const distFiles = getHtmlFiles('dist');
console.log(`Processing ${distFiles.length} HTML files in dist/...`);

let cleanedCount = 0;
let singleDescVerifiedCount = 0;
const errorFiles = [];

for (const file of distFiles) {
  // Never touch 404 or raw index if it's the root fallback
  const isRootIndex = file === path.join('dist', 'index.html');
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Check if multiple meta description exist
  const descMatches = [...content.matchAll(/<meta[^>]+name="description"[^>]+content="([^"]*)"[^>]*>/gi)];

  if (descMatches.length > 1) {
    // Strip the static template fallback
    content = content.replace(/<meta[^>]+name="description"[^>]+content="Custom high-performance business websites designed and launched in 7 days[^"]*"[^>]*>\s*/gi, '');
    content = content.replace(/<meta[^>]+property="og:description"[^>]+content="A web design and development studio[^"]*"[^>]*>\s*/gi, '');
    content = content.replace(/<meta[^>]+name="twitter:description"[^>]+content="A web design and development studio[^"]*"[^>]*>\s*/gi, '');
    content = content.replace(/<meta[^>]+property="og:title"[^>]+content="Uncoded Hub — Business Websites, Built in Seven Days"[^>]*>\s*/gi, '');
    content = content.replace(/<meta[^>]+name="twitter:title"[^>]+content="Uncoded Hub — Business Websites, Built in Seven Days"[^>]*>\s*/gi, '');
    content = content.replace(/<meta[^>]+property="og:url"[^>]+content="https:\/\/uncodedhub\.com\/"[^>]*>\s*/gi, '');
    content = content.replace(/<meta[^>]+property="og:image"[^>]+content="https:\/\/uncodedhub\.com\/og-image\.jpg"[^>]*>\s*/gi, '');
    content = content.replace(/<meta[^>]+property="og:image:alt"[^>]+content="Uncoded Hub — web design and development studio"[^>]*>\s*/gi, '');
    content = content.replace(/<meta[^>]+name="twitter:image"[^>]+content="https:\/\/uncodedhub\.com\/og-image\.jpg"[^>]*>\s*/gi, '');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    cleanedCount++;
  }

  // Verification: ensure exactly 1 meta description now
  const remainingDesc = [...content.matchAll(/<meta[^>]+name="description"[^>]+content="([^"]*)"[^>]*>/gi)];
  if (remainingDesc.length === 1) {
    singleDescVerifiedCount++;
  } else {
    errorFiles.push({ file, count: remainingDesc.length });
  }
}

console.log('--- SANITIZATION COMPLETE ---');
console.log(`Cleaned files: ${cleanedCount}`);
console.log(`Verified files with exactly 1 meta description: ${singleDescVerifiedCount}/${distFiles.length}`);
if (errorFiles.length > 0) {
  console.error(`Files with issue (!= 1 description): ${errorFiles.length}`);
  console.error(errorFiles.slice(0, 10));
} else {
  console.log('✅ 100% of HTML files now have exactly 1 meta description!');
}
