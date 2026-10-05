import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

console.log('[SYNC] Starting synchronization of AI agent assets to dist...');

// 1. Recursive copy helper
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 2. Copy .well-known
console.log('Copying .well-known directory...');
copyRecursive(path.join(publicDir, '.well-known'), path.join(distDir, '.well-known'));

// 3. Copy root protocol files
const filesToSync = [
  'robots.txt',
  'llms.txt',
  'llms-full.txt',
  'auth.md',
  '.htaccess',
  'sitemap.xml',
  'rss.xml'
];

for (const file of filesToSync) {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Synced ${file}`);
  }
}

// 4. Update dist/index.html with new head discovery tags and Organization schema
const distIndex = path.join(distDir, 'index.html');
if (fs.existsSync(distIndex)) {
  let html = fs.readFileSync(distIndex, 'utf8');

  // Add discovery links if not present
  if (!html.includes('rel="agent-skills"')) {
    const discoveryLinks = `
    <!-- ═══════════════════════════════════════════════════════
         AI ENGINE & AGENT PROTOCOL DISCOVERY (AEO / GEO)
    ═══════════════════════════════════════════════════════ -->
    <link rel="alternate" type="text/markdown" title="Uncoded Hub LLM Summary" href="https://uncodedhub.com/llms.txt" />
    <link rel="alternate" type="text/markdown" title="Uncoded Hub Comprehensive Knowledge Base" href="https://uncodedhub.com/llms-full.txt" />
    <link rel="agent-skills" type="application/json" href="https://uncodedhub.com/.well-known/agent-skills/index.json" />
    <link rel="mcp-server" type="application/json" href="https://uncodedhub.com/.well-known/mcp/server-card.json" />
    <link rel="authorization-server" href="https://uncodedhub.com/.well-known/oauth-protected-resource" />
`;
    html = html.replace('<link rel="preload" href="/fonts/fraunces.woff2"', `${discoveryLinks}\n    <link rel="preload" href="/fonts/fraunces.woff2"`);
  }

  // Update Organization schema
  if (html.includes('"@type": "ProfessionalService"')) {
    html = html.replace(
      '"@type": "ProfessionalService"',
      '"@type": ["Organization", "ProfessionalService"]'
    );
  }

  if (html.includes('"name": "Uncoded Hub",\n      "alternateName": "UncodedHub",')) {
    html = html.replace(
      '"name": "Uncoded Hub",\n      "alternateName": "UncodedHub",',
      '"name": "Uncoded Hub",\n      "legalName": "Uncoded Hub",\n      "alternateName": ["UncodedHub", "Uncoded Hub Studio"],'
    );
  }

  if (html.includes('"sameAs": [\n        "https://www.linkedin.com/company/uncodedhub/",')) {
    html = html.replace(
      'https://www.threads.com/@uncodedhub',
      'https://www.threads.net/@uncodedhub'
    );
  }

  fs.writeFileSync(distIndex, html, 'utf8');
  console.log('✓ Updated dist/index.html with Organization schema & agent discovery tags');
}

console.log('[SYNC] Successfully completed!');
