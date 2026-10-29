import fs from 'node:fs';
import path from 'node:path';
import { optimizeTitle } from './test_title_optimizer2.mjs';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;

for (const f of files) {
  const filePath = path.join(blogDir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const m = content.match(/title:\s*["']?([^"'\r\n]+)/);
  if (m) {
    let raw = m[1].trim();
    if (raw.endsWith('"') || raw.endsWith("'")) raw = raw.slice(0, -1).trim();
    
    if (raw.length > 65) {
      const opt = optimizeTitle(raw, f.replace('.md', ''));
      if (opt && opt !== raw) {
        // Replace in frontmatter
        const newContent = content.replace(
          /title:\s*["']?[^"'\r\n]+["']?/,
          `title: "${opt}"`
        );
        fs.writeFileSync(filePath, newContent, 'utf8');
        updatedCount++;
      }
    }
  }
}

console.log(`Successfully updated ${updatedCount} blog titles to high-CTR, sub-65-character standards.`);

