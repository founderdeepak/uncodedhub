#!/usr/bin/env node

/**
 * Uncoded Hub — Free Competitor Keyword Scraper & BOFU Gap Analyzer
 * Based on Edward Sturm's Competitor Reverse-Engineering Methodology
 *
 * Usage:
 *   node competitor-scraper.mjs --url "https://example.com/competitor-service-page"
 */

import fs from 'fs';

function parseArgs() {
  const args = process.argv.slice(2);
  let url = '';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) url = args[++i];
  }
  return { url };
}

function cleanText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractNGrams(words, n) {
  const ngrams = {};
  const stopWords = new Set([
    'the', 'and', 'a', 'to', 'of', 'in', 'is', 'for', 'that', 'on', 'with', 'as', 'by',
    'at', 'an', 'be', 'this', 'which', 'or', 'from', 'but', 'not', 'are', 'your', 'all',
    'have', 'new', 'more', 'was', 'we', 'will', 'home', 'about', 'contact', 'privacy'
  ]);

  for (let i = 0; i <= words.length - n; i++) {
    const slice = words.slice(i, i + n);
    if (stopWords.has(slice[0]) || stopWords.has(slice[slice.length - 1])) continue;
    const phrase = slice.join(' ');
    if (phrase.length > 5) {
      ngrams[phrase] = (ngrams[phrase] || 0) + 1;
    }
  }

  return Object.entries(ngrams)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
}

async function scrapeCompetitor(url) {
  console.log(`\n🔍 Fetching competitor page: ${url}...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const html = await res.text();

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'None';

  // Meta Description
  const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDesc = metaMatch ? metaMatch[1].trim() : 'None';

  // H1s
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1s = h1Matches.map(m => cleanText(m[1]));

  // H2s
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  const h2s = h2Matches.map(m => cleanText(m[1]));

  // Clean body words
  const bodyText = cleanText(html).toLowerCase();
  const rawWords = bodyText.replace(/[^a-z0-9\s-]/g, '').split(/\s+/).filter(w => w.length > 2);

  // Key phrases
  const twoGrams = extractNGrams(rawWords, 2);
  const threeGrams = extractNGrams(rawWords, 3);

  return {
    url,
    title,
    metaDesc,
    h1s,
    h2s: h2s.slice(0, 10),
    wordCount: rawWords.length,
    topPhrases2: twoGrams,
    topPhrases3: threeGrams
  };
}

async function main() {
  const { url } = parseArgs();
  if (!url) {
    console.log(`
Usage:
  node competitor-scraper.mjs --url "https://competitor.com/service-page"
`);
    process.exit(1);
  }

  try {
    const data = await scrapeCompetitor(url);

    console.log(`\n════════════════════════════════════════════════════════════════`);
    console.log(`🕵️ COMPETITOR REVERSE-ENGINEERING REPORT`);
    console.log(`════════════════════════════════════════════════════════════════`);
    console.log(`🔗 Target URL:         ${data.url}`);
    console.log(`📄 Page Title:         "${data.title}"`);
    console.log(`📝 Meta Description:   "${data.metaDesc}"`);
    console.log(`🏷️ Primary H1:         "${data.h1s[0] || 'NONE'}" (Total H1s: ${data.h1s.length})`);
    console.log(`📊 Word Count:         ${data.wordCount} words`);
    console.log(`────────────────────────────────────────────────────────────────`);
    console.log(`📌 Primary H2 Sections (${data.h2s.length} shown):`);
    data.h2s.forEach((h, i) => console.log(`   ${i + 1}. ${h}`));
    console.log(`────────────────────────────────────────────────────────────────`);
    console.log(`🔑 Top 2-Word Target Phrases:`);
    data.topPhrases2.slice(0, 8).forEach(p => console.log(`   • "${p[0]}" (x${p[1]} mentions)`));
    console.log(`────────────────────────────────────────────────────────────────`);
    console.log(`🎯 Top 3-Word Long-Tail Intent Phrases:`);
    data.topPhrases3.slice(0, 8).forEach(p => console.log(`   • "${p[0]}" (x${p[1]} mentions)`));
    console.log(`────────────────────────────────────────────────────────────────`);
    console.log(`💡 EDWARD STURM STRATEGIC COUNTER-PLAY:`);
    if (data.wordCount > 1500) {
      console.log(`  1. Competitor is bloated (${data.wordCount} words). A focused 415-word BOFU page directly addressing the purchase intent will out-convert and out-rank this page.`);
    }
    if (data.h1s.length > 1) {
      console.log(`  2. Competitor has multiple H1s (${data.h1s.length}). Their on-page architecture is broken—our clean single H1 gives an immediate crawl advantage.`);
    }
    console.log(`  3. Extract their top 3-word intent phrase and build a dedicated Uncoded Hub page using the 415-word canvas.`);
    console.log(`════════════════════════════════════════════════════════════════\n`);
  } catch (err) {
    console.error(`❌ Scraping failed: ${err.message}`);
    process.exit(1);
  }
}

main();

