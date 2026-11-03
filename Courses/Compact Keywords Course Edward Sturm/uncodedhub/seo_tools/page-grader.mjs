#!/usr/bin/env node

/**
 * Uncoded Hub — Free Moz-Style On-Page Grader & Keyword Auditor
 * Based on Edward Sturm's Compact Keywords Framework
 *
 * Usage:
 *   node page-grader.mjs --url "https://uncodedhub.com/services/" --kw "hand coded website design agency"
 *   node page-grader.mjs --file "public/demos/shutter-bug-studioz.html" --kw "photography studio bangalore"
 */

import fs from 'fs';
import path from 'path';

function parseArgs() {
  const args = process.argv.slice(2);
  let url = '';
  let file = '';
  let kw = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) url = args[++i];
    if (args[i] === '--file' && args[i + 1]) file = args[++i];
    if (args[i] === '--kw' && args[i + 1]) kw = args[++i];
  }

  return { url, file, kw: kw.trim().toLowerCase() };
}

async function getHtml(url, filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, 'utf8');
  }
  if (url) {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) UncodedHub-SEO-Grader/1.0',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.text();
  }
  throw new Error('Please provide either --url or --file');
}

function cleanText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function gradePage(html, keyword) {
  const kw = keyword.toLowerCase();
  const kwWords = kw.split(/\s+/).filter(Boolean);

  // 1. Title extraction
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const titleLower = title.toLowerCase();

  // 2. Meta description
  const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDesc = metaMatch ? metaMatch[1].trim() : '';
  const metaDescLower = metaDesc.toLowerCase();

  // 3. H1 extraction
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1Texts = h1Matches.map(m => cleanText(m[1]));
  const primaryH1 = h1Texts[0] || '';
  const primaryH1Lower = primaryH1.toLowerCase();

  // 4. H2 extraction
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  const h2Texts = h2Matches.map(m => cleanText(m[1]));

  // 5. Image Alts
  const imgAltMatches = [...html.matchAll(/<img[^>]*alt=["']([^"']*)["']/gi)];
  const alts = imgAltMatches.map(m => m[1].toLowerCase());

  // 6. Body words & First Sentence
  const bodyText = cleanText(html);
  const words = bodyText.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // First paragraph / first 200 characters of content
  const first150Words = words.slice(0, 150).join(' ').toLowerCase();

  // Keyword occurrences
  const regexKw = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const kwOccurrences = (bodyText.match(regexKw) || []).length;
  const kwDensity = wordCount > 0 ? ((kwOccurrences * kwWords.length) / wordCount) * 100 : 0;

  // SCORING ENGINE (Moz-style 0 - 100)
  const checklist = [];
  let score = 0;

  // A. Exact keyword in Title (Weight: 25)
  if (titleLower.includes(kw)) {
    const isEarly = titleLower.indexOf(kw) < 20;
    score += isEarly ? 25 : 20;
    checklist.push({
      item: 'Exact keyword in <title>',
      status: 'PASS',
      points: isEarly ? 25 : 20,
      detail: `Found in title: "${title}"`
    });
  } else {
    checklist.push({
      item: 'Exact keyword in <title>',
      status: 'FAIL',
      points: 0,
      detail: `Missing. Title is: "${title || 'NONE'}"`
    });
  }

  // Title length check (Penalty if > 60 chars)
  if (title.length > 60) {
    score -= 3;
    checklist.push({
      item: 'Title length under 60 chars',
      status: 'WARN',
      points: -3,
      detail: `${title.length} characters (may be truncated on Google SERP)`
    });
  }

  // B. Exact keyword in H1 (Weight: 20)
  if (h1Matches.length === 1 && primaryH1Lower.includes(kw)) {
    score += 20;
    checklist.push({
      item: 'Exact keyword in single <h1>',
      status: 'PASS',
      points: 20,
      detail: `H1 matches: "${primaryH1}"`
    });
  } else if (h1Matches.length === 0) {
    checklist.push({
      item: 'Single <h1> tag present',
      status: 'FAIL',
      points: 0,
      detail: 'No <h1> tag found on the page'
    });
  } else if (h1Matches.length > 1) {
    score += 10;
    checklist.push({
      item: 'Single <h1> tag rule',
      status: 'WARN',
      points: 10,
      detail: `Found ${h1Matches.length} <h1> tags! Edward Sturm rule: Exactly ONE H1.`
    });
  } else {
    checklist.push({
      item: 'Exact keyword in <h1>',
      status: 'FAIL',
      points: 0,
      detail: `H1 does not contain keyword: "${primaryH1}"`
    });
  }

  // C. Exact keyword in Meta Description (Weight: 15)
  if (metaDescLower.includes(kw)) {
    score += 15;
    checklist.push({
      item: 'Keyword in Meta Description',
      status: 'PASS',
      points: 15,
      detail: `Found in description (${metaDesc.length} chars)`
    });
  } else {
    checklist.push({
      item: 'Keyword in Meta Description',
      status: 'FAIL',
      points: 0,
      detail: `Missing from meta description: "${metaDesc || 'NONE'}"`
    });
  }

  // Meta description length
  if (metaDesc.length > 160) {
    score -= 2;
    checklist.push({
      item: 'Meta Description length ≤ 160 chars',
      status: 'WARN',
      points: -2,
      detail: `${metaDesc.length} chars (Google will truncate)`
    });
  }

  // D. Keyword near beginning of first sentence (Weight: 15)
  if (first150Words.includes(kw)) {
    score += 15;
    checklist.push({
      item: 'Keyword near start of first paragraph',
      status: 'PASS',
      points: 15,
      detail: 'Keyword found within the opening text.'
    });
  } else {
    checklist.push({
      item: 'Keyword near start of first paragraph',
      status: 'FAIL',
      points: 0,
      detail: 'Keyword missing in opening paragraph/sentence.'
    });
  }

  // E. Keyword in Image Alt Attribute (Weight: 10)
  const hasAltKw = alts.some(a => a.includes(kw));
  if (hasAltKw) {
    score += 10;
    checklist.push({
      item: 'Keyword in image alt attribute',
      status: 'PASS',
      points: 10,
      detail: 'Found keyword in at least one image alt tag.'
    });
  } else {
    checklist.push({
      item: 'Keyword in image alt attribute',
      status: 'WARN',
      points: 0,
      detail: `No image alt tag contains the exact keyword. (${alts.length} images checked)`
    });
  }

  // F. Word Count & Search Intent Depth (Weight: 15)
  // Edward Sturm Note: 415 words proved that even short pages rank #1 when intent is fulfilled.
  // Comprehensive pages with 1,000–2,500+ words are equally rewarded if intent is deeply answered.
  if (wordCount >= 300) {
    score += 15;
    checklist.push({
      item: 'Word Count & Depth (300+ words)',
      status: 'PASS',
      points: 15,
      detail: `${wordCount} words (Fulfills intent depth; compact baseline is ~415 words).`
    });
  } else if (wordCount >= 200 && wordCount < 300) {
    score += 10;
    checklist.push({
      item: 'Word Count (Concise)',
      status: 'INFO',
      points: 10,
      detail: `${wordCount} words (Ultra-compact; consider adding 1 concise section if needed).`
    });
  } else {
    score += 5;
    checklist.push({
      item: 'Word Count (Thin Content)',
      status: 'WARN',
      points: 5,
      detail: `${wordCount} words (Under 200 words; risk of thin-content penalty).`
    });
  }

  // G. Keyword Density / Over-Optimization Penalty (Moz Sweet Spot: 96-98, NOT 100)
  if (kwDensity > 3.0) {
    score -= 10;
    checklist.push({
      item: 'Anti-Keyword Stuffing Defense',
      status: 'WARN',
      points: -10,
      detail: `High density (${kwDensity.toFixed(1)}%). Appears ${kwOccurrences} times. Reduce mentions to avoid spam flags!`
    });
  } else if (kwOccurrences >= 2 && kwOccurrences <= 5) {
    checklist.push({
      item: 'Natural Keyword Distribution',
      status: 'PASS',
      points: 0,
      detail: `Mentioned ${kwOccurrences} times naturally (${kwDensity.toFixed(2)}% density).`
    });
  }

  // Clamp score between 0 and 100
  const finalScore = Math.max(0, Math.min(100, score));

  return {
    targetKeyword: keyword,
    title,
    primaryH1,
    h1Count: h1Matches.length,
    h2Count: h2Texts.length,
    wordCount,
    kwOccurrences,
    kwDensity: Number(kwDensity.toFixed(2)),
    score: finalScore,
    isSweetSpot: finalScore >= 94 && finalScore <= 98,
    checklist
  };
}

// CLI Execution
async function main() {
  const { url, file, kw } = parseArgs();

  if (!kw || (!url && !file)) {
    console.log(`
════════════════════════════════════════════════════════════════
🎯 UNCODED HUB — MOZ-STYLE ON-PAGE GRADER (COMPACT KEYWORDS)
════════════════════════════════════════════════════════════════
Usage:
  node page-grader.mjs --url <URL> --kw "<TARGET_KEYWORD>"
  node page-grader.mjs --file <PATH_TO_HTML> --kw "<TARGET_KEYWORD>"

Examples:
  node page-grader.mjs --url "https://uncodedhub.com/services/" --kw "hand coded website design agency"
  node page-grader.mjs --file "public/demos/shutter-bug-studioz.html" --kw "photography studio bangalore"
════════════════════════════════════════════════════════════════
`);
    process.exit(1);
  }

  console.log(`\n🔍 Fetching and analyzing content for keyword: "${kw}"...`);
  try {
    const html = await getHtml(url, file);
    const result = gradePage(html, kw);

    console.log(`\n════════════════════════════════════════════════════════════════`);
    console.log(`📊 ON-PAGE GRADE REPORT`);
    console.log(`════════════════════════════════════════════════════════════════`);
    console.log(`🎯 Target Keyword:       "${result.targetKeyword}"`);
    console.log(`📄 Page Title:           "${result.title}"`);
    console.log(`🏷️ Primary H1:           "${result.primaryH1}" (H1 Count: ${result.h1Count})`);
    console.log(`📝 Word Count:           ${result.wordCount} words (Target: ~415 words)`);
    console.log(`🔢 Keyword Mentions:     ${result.kwOccurrences} times (${result.kwDensity}% density)`);
    console.log(`────────────────────────────────────────────────────────────────`);
    console.log(`🏆 OVERALL ON-PAGE SCORE: ${result.score} / 100`);
    if (result.isSweetSpot) {
      console.log(`⭐ STATUS: PERFECT SWEET SPOT (94–98)! High ranking potential without over-optimization.`);
    } else if (result.score === 100) {
      console.log(`⚠️ STATUS: SCORE 100. Edward Sturm Rule: De-optimize slightly to avoid algorithmic penalty!`);
    } else if (result.score >= 80) {
      console.log(`🟡 STATUS: GOOD (80–93). Address the checklist below to reach the 96–98 sweet spot.`);
    } else {
      console.log(`❌ STATUS: NEEDS IMPROVEMENT (<80). Critical on-page factors are missing.`);
    }
    console.log(`────────────────────────────────────────────────────────────────`);
    console.log(`📋 DETAILED FACTOR BREAKDOWN:`);
    result.checklist.forEach(c => {
      const icon = c.status === 'PASS' ? '✅' : c.status === 'WARN' ? '⚠️' : c.status === 'INFO' ? 'ℹ️' : '❌';
      console.log(`  ${icon} [${c.status}] ${c.item} (+${c.points} pts)`);
      console.log(`     └─ ${c.detail}`);
    });
    console.log(`════════════════════════════════════════════════════════════════\n`);
  } catch (err) {
    console.error(`❌ Audit failed: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('page-grader.mjs')) {
  main();
}

