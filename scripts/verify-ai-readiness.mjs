import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

console.log('====================================================');
console.log('UNCODED HUB — AI READINESS & AGENT PROTOCOL AUDIT');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`✗ FAIL: ${name}`);
    console.error(`  Error: ${err.message}`);
    failed++;
  }
}

// ── Check 1: AI Crawlers in robots.txt ──────────────────────────────
test('1. AI crawlers explicitly allowed in robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot)', () => {
  const content = fs.readFileSync(path.join(root, 'public', 'robots.txt'), 'utf8');
  const requiredBots = [
    'GPTBot',
    'ClaudeBot',
    'PerplexityBot',
    'Google-Extended',
    'OAI-SearchBot',
    'ChatGPT-User',
    'Claude-SearchBot',
    'Applebot-Extended',
    'Meta-ExternalAgent'
  ];

  for (const bot of requiredBots) {
    const regex = new RegExp(`User-agent:\\s*${bot}[\\r\\n]+Allow:\\s*/`, 'i');
    if (!regex.test(content)) {
      throw new Error(`Bot ${bot} is not explicitly allowed in robots.txt`);
    }
  }

  // Ensure no Disallow: / matches any of these bots
  for (const bot of requiredBots) {
    const badRegex = new RegExp(`User-agent:\\s*${bot}[\\r\\n]+Disallow:\\s*/`, 'i');
    if (badRegex.test(content)) {
      throw new Error(`Bot ${bot} has a Disallow: / in robots.txt`);
    }
  }
});

// ── Check 2: Answer-first / question headings ─────────────────────
test('2. Answer-first / question headings in FAQ component & content', () => {
  const faqComponent = fs.readFileSync(path.join(root, 'src', 'components', 'ui', 'faq-accordion.tsx'), 'utf8');
  if (!faqComponent.includes('<h3')) {
    throw new Error('FAQ questions are not wrapped in semantic <h3> headings');
  }
  if (!faqComponent.includes('What is Uncoded Hub and what does the studio build?')) {
    throw new Error('Missing primary brand entity question in FAQ accordion');
  }
  if (!faqComponent.includes('How does the 50% "Late Means Free" Delivery Guarantee work?')) {
    throw new Error('Missing guarantee answer-first question in FAQ accordion');
  }

  const faqPage = fs.readFileSync(path.join(root, 'src', 'pages', 'Faq.tsx'), 'utf8');
  if (!faqPage.includes('faq-panel-${item.id}')) {
    throw new Error('Faq page does not maintain answers persistently in DOM');
  }
});

// ── Check 3: Organization / brand entity node ─────────────────────
test('3. Organization entity JSON-LD schema with name, url, logo, sameAs', () => {
  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if (!indexHtml.includes('"@type": ["Organization", "ProfessionalService"]') && !indexHtml.includes('"@type": "Organization"')) {
    throw new Error('index.html is missing explicit Organization schema @type');
  }
  if (!indexHtml.includes('https://uncodedhub.com/#organization')) {
    throw new Error('index.html is missing Organization @id');
  }
  if (!indexHtml.includes('"name": "Uncoded Hub"')) {
    throw new Error('index.html is missing Organization name');
  }
  if (!indexHtml.includes('"url": "https://uncodedhub.com"')) {
    throw new Error('index.html is missing Organization url');
  }
  if (!indexHtml.includes('"logo":')) {
    throw new Error('index.html is missing Organization logo');
  }
  if (!indexHtml.includes('"sameAs":')) {
    throw new Error('index.html is missing Organization sameAs links');
  }
});

// ── Check 4: MCP server card ──────────────────────────────────────
test('4. MCP server card exists at /.well-known/mcp/server-card.json', () => {
  const pPath = path.join(root, 'public', '.well-known', 'mcp', 'server-card.json');
  const dPath = path.join(root, 'dist', '.well-known', 'mcp', 'server-card.json');
  if (!fs.existsSync(pPath)) throw new Error('public/.well-known/mcp/server-card.json does not exist');
  if (!fs.existsSync(dPath)) throw new Error('dist/.well-known/mcp/server-card.json does not exist');
  
  const parsed = JSON.parse(fs.readFileSync(pPath, 'utf8'));
  if (!parsed.serverInfo || !parsed.serverInfo.name) throw new Error('serverInfo.name missing');
  if (!parsed.transport || !parsed.transport.type) throw new Error('transport.type missing');
  if (!parsed.capabilities || !parsed.tools || !parsed.tools.length) throw new Error('tools missing');
});

// ── Check 5: Agent Skills index ───────────────────────────────────
test('5. Agent Skills index exists at /.well-known/agent-skills/index.json', () => {
  const pPath = path.join(root, 'public', '.well-known', 'agent-skills', 'index.json');
  const dPath = path.join(root, 'dist', '.well-known', 'agent-skills', 'index.json');
  if (!fs.existsSync(pPath)) throw new Error('public/.well-known/agent-skills/index.json does not exist');
  if (!fs.existsSync(dPath)) throw new Error('dist/.well-known/agent-skills/index.json does not exist');

  const parsed = JSON.parse(fs.readFileSync(pPath, 'utf8'));
  if (!parsed.provider || !parsed.skills || !parsed.skills.length) throw new Error('skills array empty');
});

// ── Check 6: auth.md agent registration ───────────────────────────
test('6. Agent registration instructions exist at /auth.md', () => {
  const pPath = path.join(root, 'public', 'auth.md');
  const dPath = path.join(root, 'dist', 'auth.md');
  if (!fs.existsSync(pPath)) throw new Error('public/auth.md does not exist');
  if (!fs.existsSync(dPath)) throw new Error('dist/auth.md does not exist');

  const content = fs.readFileSync(pPath, 'utf8');
  if (!content.includes('Agent Registration & Authentication Policy')) {
    throw new Error('auth.md missing expected header');
  }
  if (!content.includes('Protected Actions')) {
    throw new Error('auth.md missing protected actions breakdown');
  }
});

// ── Check 7: OAuth protected-resource metadata ────────────────────
test('7. OAuth protected-resource metadata exists at /.well-known/oauth-protected-resource', () => {
  const pPath = path.join(root, 'public', '.well-known', 'oauth-protected-resource');
  const dPath = path.join(root, 'dist', '.well-known', 'oauth-protected-resource');
  if (!fs.existsSync(pPath)) throw new Error('public/.well-known/oauth-protected-resource missing');
  if (!fs.existsSync(dPath)) throw new Error('dist/.well-known/oauth-protected-resource missing');

  const parsed = JSON.parse(fs.readFileSync(pPath, 'utf8'));
  if (!parsed.resource || !parsed.scopes_supported) {
    throw new Error('Invalid OAuth protected-resource schema');
  }
});

// ── Check 8: Web Bot Auth (request signing) ───────────────────────
test('8. Web Bot Auth directory exists at /.well-known/http-message-signatures-directory', () => {
  const pPath = path.join(root, 'public', '.well-known', 'http-message-signatures-directory');
  const dPath = path.join(root, 'dist', '.well-known', 'http-message-signatures-directory');
  if (!fs.existsSync(pPath)) throw new Error('public/.well-known/http-message-signatures-directory missing');
  if (!fs.existsSync(dPath)) throw new Error('dist/.well-known/http-message-signatures-directory missing');

  const parsed = JSON.parse(fs.readFileSync(pPath, 'utf8'));
  if (!parsed.keys || !parsed.supported_algorithms) {
    throw new Error('Invalid http-message-signatures-directory schema');
  }
});

// ── Check 9: Discovery Signals (llms.txt, llms-full.txt, link tags)
test('9. Discovery Signals: llms.txt, llms-full.txt, and HTML link tags', () => {
  const llms = fs.readFileSync(path.join(root, 'public', 'llms.txt'), 'utf8');
  const llmsFull = fs.readFileSync(path.join(root, 'public', 'llms-full.txt'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  if (!llms.includes('llms-full.txt')) throw new Error('llms.txt does not link to llms-full.txt');
  if (!llmsFull.includes('28 Plain-English Answers')) throw new Error('llms-full.txt missing FAQ data');
  if (!indexHtml.includes('rel="agent-skills"')) throw new Error('index.html missing rel="agent-skills" tag');
  if (!indexHtml.includes('rel="mcp-server"')) throw new Error('index.html missing rel="mcp-server" tag');
  if (!indexHtml.includes('rel="alternate" type="text/markdown"')) throw new Error('index.html missing rel="alternate" for llms.txt');
});

console.log('\n----------------------------------------------------');
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('----------------------------------------------------');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL AUDIT CHECKS PASSED PERFECTLY! 🚀');
}
