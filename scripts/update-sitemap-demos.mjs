import fs from 'fs';
import path from 'path';

const sitemapPath = path.resolve('public/sitemap.xml');
let content = fs.readFileSync(sitemapPath, 'utf8');

const demoDir = path.resolve('public/demos');
const demoFiles = fs.readdirSync(demoDir).filter(f => f.endsWith('.html'));

const today = new Date().toISOString().split('T')[0];

const demoEntries = demoFiles.map(file => `  <url>
    <loc>https://uncodedhub.com/demos/${file}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');

// Insert after the core contact page
const target = `<loc>https://uncodedhub.com/contact/</loc>
    <lastmod>2026-10-19</lastmod>
  </url>`;

const replacement = `${target}
  <!-- 17 Live Interactive Industry Demonstration Specimen Pages -->
${demoEntries}`;

if (!content.includes('https://uncodedhub.com/demos/')) {
  content = content.replace(target, replacement);
  fs.writeFileSync(sitemapPath, content, 'utf8');
  console.log(`Added ${demoFiles.length} demo URLs to public/sitemap.xml!`);
} else {
  console.log(`Demo URLs already present in sitemap.xml.`);
}

const totalUrls = [...content.matchAll(/<loc>/g)].length;
console.log(`Total URLs now in public/sitemap.xml: ${totalUrls}`);
