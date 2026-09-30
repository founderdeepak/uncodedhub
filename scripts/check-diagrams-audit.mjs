import fs from 'node:fs';
import path from 'node:path';

const distBlogDir = 'dist/blog';
const subdirs = fs.readdirSync(distBlogDir).filter(f => fs.statSync(path.join(distBlogDir, f)).isDirectory());

let totalSvgs = 0;
let postsWithSvg = [];
let preCodeBlocks = 0;
let postsWithPre = [];

for (const sub of subdirs) {
  const htmlPath = path.join(distBlogDir, sub, 'index.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const svgMatches = html.split('<div class="diagram-container').length - 1;
    if (svgMatches > 0) {
      totalSvgs += svgMatches;
      postsWithSvg.push({ slug: sub, count: svgMatches });
    }
    const preMatches = html.split('<pre class="code-block"').length - 1;
    if (preMatches > 0) {
      preCodeBlocks += preMatches;
      postsWithPre.push({ slug: sub, count: preMatches });
    }
  }
}

console.log('Posts in dist with custom SVG diagram-design:', postsWithSvg.length);
console.log('Total SVG diagrams rendered across all blog posts:', totalSvgs);
console.log('Remaining raw code blocks in dist:', preCodeBlocks);
if (postsWithPre.length > 0) {
  console.log('Posts with raw code blocks:', postsWithPre);
}
