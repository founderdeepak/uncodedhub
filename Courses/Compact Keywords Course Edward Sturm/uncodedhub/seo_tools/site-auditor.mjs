#!/usr/bin/env node

/**
 * Uncoded Hub — Free Defensive Site Auditor
 * Based on Edward Sturm's Screaming Frog & Technical SEO Framework
 *
 * Usage:
 *   node site-auditor.mjs --dist "dist" --output "audit-report.csv"
 *   node site-auditor.mjs --urls "https://uncodedhub.com/,https://uncodedhub.com/services/,https://uncodedhub.com/about/"
 */

import fs from 'fs';
import path from 'path';

function parseArgs() {
  const args = process.argv.slice(2);
  let dist = '';
  let urls = '';
  let output = 'site-audit-report.csv';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dist' && args[i + 1]) dist = args[++i];
    if (args[i] === '--urls' && args[i + 1]) urls = args[++i];
    if (args[i] === '--output' && args[i + 1]) output = args[++i];
  }

  return { dist, urls: urls ? urls.split(',').map(u => u.trim()) : [], output };
}

function cleanText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function auditHtml(html, identifier) {
  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Meta Description
  const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDesc = metaMatch ? metaMatch[1].trim() : '';

  // H1s
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1s = h1Matches.map(m => cleanText(m[1]));

  // H2s
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  const h2s = h2Matches.map(m => cleanText(m[1]));

  // Image alts
  const imgMatches = [...html.matchAll(/<img\b([^>]*)>/gi)];
  let imagesWithoutAlt = 0;
  for (const img of imgMatches) {
    if (!/alt=["'][^"']+["']/i.test(img[1])) {
      imagesWithoutAlt++;
    }
  }

  // Word count
  const bodyText = cleanText(html);
  const words = bodyText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Issues checklist
  const issues = [];
  if (!title) issues.push('Missing <title>');
  else if (title.length > 60) issues.push(`Title too long (${title.length} chars)`);

  if (!metaDesc) issues.push('Missing Meta Description');
  else if (metaDesc.length > 160) issues.push(`Meta Desc too long (${metaDesc.length} chars)`);

  if (h1s.length === 0) issues.push('Missing <h1>');
  else if (h1s.length > 1) issues.push(`Multiple <h1> tags (${h1s.length})`);

  if (imagesWithoutAlt > 0) issues.push(`${imagesWithoutAlt} images missing alt text`);
  if (wordCount < 200) issues.push(`Thin content (${wordCount} words)`);

  return {
    url: identifier,
    title,
    titleLength: title.length,
    metaDesc,
    metaLength: metaDesc.length,
    h1Count: h1s.length,
    primaryH1: h1s[0] || '',
    h2Count: h2s.length,
    primaryH2: h2s[0] || '',
    wordCount,
    imagesCount: imgMatches.length,
    imagesWithoutAlt,
    status: issues.length === 0 ? 'HEALTHY' : 'NEEDS_ATTENTION',
    issues: issues.join('; ')
  };
}

async function main() {
  const { dist, urls, output } = parseArgs();

  console.log(`\n════════════════════════════════════════════════════════════════`);
  console.log(`🛠️ UNCODED HUB — DEFENSIVE SITE AUDITOR`);
  console.log(`════════════════════════════════════════════════════════════════`);

  const results = [];

  if (urls.length > 0) {
    console.log(`Scanning ${urls.length} remote URLs...`);
    for (const u of urls) {
      try {
        const res = await fetch(u, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) UncodedHub-SiteAuditor/1.0' }
        });
        const html = await res.text();
        results.push(auditHtml(html, u));
      } catch (err) {
        results.push({
          url: u,
          status: 'ERROR',
          issues: err.message,
          title: '', titleLength: 0, metaDesc: '', metaLength: 0,
          h1Count: 0, primaryH1: '', h2Count: 0, primaryH2: '',
          wordCount: 0, imagesCount: 0, imagesWithoutAlt: 0
        });
      }
    }
  } else {
    // Scan local HTML files
    const scanDir = dist || 'dist';
    if (!fs.existsSync(scanDir)) {
      console.error(`❌ Directory "${scanDir}" does not exist. Specify --dist or build first.`);
      process.exit(1);
    }

    console.log(`Scanning local HTML files in "${scanDir}"...`);
    function getHtmlFiles(dir) {
      let files = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files = files.concat(getHtmlFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
          files.push(fullPath);
        }
      }
      return files;
    }

    const htmlFiles = getHtmlFiles(scanDir).slice(0, 100); // Audit up to 100 pages
    console.log(`Found ${htmlFiles.length} HTML pages to audit.`);

    for (const f of htmlFiles) {
      const html = fs.readFileSync(f, 'utf8');
      const relativePath = path.relative(scanDir, f).replace(/\\/g, '/');
      results.push(auditHtml(html, '/' + relativePath));
    }
  }

  // Print Summary
  let healthy = 0;
  let flagged = 0;
  results.forEach(r => {
    if (r.status === 'HEALTHY') healthy++;
    else flagged++;
  });

  console.log(`\nAudit Complete: ${results.length} total pages scanned.`);
  console.log(`✅ Healthy Pages: ${healthy}`);
  console.log(`⚠️ Flagged Pages: ${flagged}`);
  console.log(`────────────────────────────────────────────────────────────────`);

  // Write CSV Report
  const headers = [
    'URL',
    'Status',
    'Word Count',
    'Page Title',
    'Title Length',
    'Meta Description',
    'Meta Length',
    'H1 Count',
    'Primary H1',
    'H2 Count',
    'Primary H2',
    'Images Without Alt',
    'Issues'
  ];

  const csvRows = [headers.join(',')];
  for (const r of results) {
    const row = [
      `"${r.url}"`,
      `"${r.status}"`,
      r.wordCount,
      `"${(r.title || '').replace(/"/g, '""')}"`,
      r.titleLength,
      `"${(r.metaDesc || '').replace(/"/g, '""')}"`,
      r.metaLength,
      r.h1Count,
      `"${(r.primaryH1 || '').replace(/"/g, '""')}"`,
      r.h2Count,
      `"${(r.primaryH2 || '').replace(/"/g, '""')}"`,
      r.imagesWithoutAlt,
      `"${(r.issues || '').replace(/"/g, '""')}"`
    ];
    csvRows.push(row.join(','));
  }

  const outPath = path.isAbsolute(output) ? output : path.join(process.cwd(), output);
  fs.writeFileSync(outPath, csvRows.join('\n'), 'utf8');
  console.log(`📄 Full CSV Report saved to: ${outPath}\n`);
}

main().catch(err => console.error('Site auditor failed:', err));

