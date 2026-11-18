import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/data/projects.ts', 'utf8');
const startIndex = content.indexOf('export const PROJECTS: Project[] = [');
const arrayPart = content.slice(startIndex).replace('export const PROJECTS: Project[] =', 'export const PROJECTS =');

fs.writeFileSync('scripts/temp-projects.mjs', arrayPart, 'utf8');
const { PROJECTS } = await import('./temp-projects.mjs');
fs.unlinkSync('scripts/temp-projects.mjs');

const baseDir = path.resolve('UncodedHub Projects');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

function formatFolderName(num, id) {
  const cleanNum = String(num).padStart(2, '0');
  const words = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_');
  return `Demo_${cleanNum}_${words}`;
}

const masterRows = [];

for (const p of PROJECTS) {
  const folderName = formatFolderName(p.num, p.id);
  const targetDir = path.join(baseDir, folderName);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Create subfolder for clean asset dropping
  const assetsDir = path.join(targetDir, 'Assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const themesSummary = p.themes && p.themes.length > 0
    ? p.themes.map((t, idx) => `  ${idx + 1}. **${t.name}** (${t.style}) — Accent: \`${t.accentHex}\` | Palette: ${t.palette.join(', ')}`).join('\n')
    : '  * Standard High-Conversion Minimal Theme';

  const briefContent = `# ${folderName} — Asset & Upgrade Brief

**Client / Brand**: ${p.client}
**Sector**: ${p.sector}
**Category**: ${p.category}
**Demo File**: [${p.url.replace('/demos/', '')}](file:///c:/Users/LENOVO/Downloads/uncoded-hub/public${p.url})
**Live Local URL**: \`http://localhost:3000${p.url}\`
**Live Production URL**: \`https://uncodedhub.com${p.url}\`

---

## 1. Core Conversion Engine & Positioning
* **Brand Summary**: ${p.summary}
* **Core Conversion Engine**: **${p.conversionEngine}**
* **Key Business Result**: ${p.result}

### Visual Themes in this Demo:
${themesSummary}

---

## 2. Required Images Checklist (Drop Here in \`Assets/\`)

To achieve the unslop gold standard (like Sri Ayyanar Sirpa Kalai), please add **high-resolution authentic images** to this folder or the \`Assets/\` subfolder:

| File Name | Slot & Purpose | Recommended Aspect & Resolution | Description |
| :--- | :--- | :--- | :--- |
| \`01_Hero_Showcase.png\` | Hero Banner / Focal Center | 16:9 (1920×1080) or 4:5 (1200×1500) | Dramatic, aspirational hero image representing the pinnacle of this craft. |
| \`02_Work_01.png\` | Portfolio Feature 1 | 4:5 (1080×1350) or 16:10 | Flagship completed project / case study #1. |
| \`03_Work_02.png\` | Portfolio Feature 2 | 4:5 (1080×1350) or 16:10 | Flagship completed project / case study #2. |
| \`04_Work_03.png\` | Portfolio Feature 3 | 4:5 (1080×1350) or 16:10 | Flagship completed project / case study #3. |
| \`05_Work_04.png\` | Portfolio Feature 4 | 4:5 (1080×1350) or 16:10 | Flagship completed project / case study #4. |
| \`06_Work_05.png\` | Portfolio Feature 5 | 4:5 (1080×1350) or 16:10 | Flagship completed project / case study #5. |
| \`07_Before_Raw.png\` | Comparison Slider (Left) | 16:10 (1200×750) | Raw / unpolished / initial stage (e.g. bare shell, untreated, blueprint). |
| \`08_After_Finished.png\`| Comparison Slider (Right)| 16:10 (1200×750) | Finished, pristine, luxury outcome (e.g. furnished sanctuary, polished result). |
| \`09_Founder_Or_Expert.png\`| Master / Founder Portrait| 1:1 or 4:5 Portrait | Authentic studio / clinic / workshop portrait of the principal expert. |
| \`10_Process_Detail.png\`| Craftsmanship / Studio | 16:9 or 4:3 | Micro-detail of materials, tools, operatory, or on-site craftsmanship. |

---

## 3. Unslop Design Standard Rules
1. **No Purple AI Gradients**: Use editorial dark midnight navy, museum bronze, stone, or warm earth palettes.
2. **Character-Rich Typography**: High-contrast editorial display font for headings; clean neutral body text.
3. **Strict Word Integrity**: No split words on mobile (\`word-break: keep-all; overflow-wrap: normal\`).
4. **Authentic Chiaroscuro Lighting**: High contrast, moody shadows, realistic depth. Zero cheesy smiling stock photos.
5. **Direct High-Intent CTAs**: One-tap WhatsApp consult with pre-filled shastric/project details + interactive timeline estimator.
`;

  fs.writeFileSync(path.join(targetDir, 'IMAGE_BRIEF.md'), briefContent, 'utf8');

  masterRows.push(`| **${p.num}** | \`${folderName}\` | **${p.client}** | ${p.sector} | \`${p.url.replace('/demos/', '')}\` | [Brief](file:///c:/Users/LENOVO/Downloads/uncoded-hub/UncodedHub%20Projects/${encodeURIComponent(folderName)}/IMAGE_BRIEF.md) |`);
}

// Master Index Markdown
const masterIndexContent = `# Uncoded Hub — 50 Master Demo Upgrade Directory

This directory contains dedicated asset intake folders for every single one of Uncoded Hub's **50 High-Converting Demo Websites**.

Whenever you want to upgrade a demo with authentic images, simply open its corresponding folder below, drop the images into \`Assets/\`, and let the AI agent sync and elevate the demo to the gold standard.

---

### Client Showcase (Established Reference Benchmark)
* **001 · Sri Ayyanar Sirpa Kalai**: Traditional Chozha Temple Architecture & Sculptors
  * Folder: [\`UncodedHub Projects/001_Sri_Ayyanar_Sirpa_Kalai\`](file:///c:/Users/LENOVO/Downloads/uncoded-hub/UncodedHub%20Projects/001_Sri_Ayyanar_Sirpa_Kalai/)
  * Demo: [ayyanar-sirpa-kalai.html](https://uncodedhub.com/demos/ayyanar-sirpa-kalai.html)

---

### The 50 Master Commercial Demos Directory

| # | Project Folder | Client / Brand Name | Sector & Niche | Target Demo File | Asset Brief |
| :-: | :--- | :--- | :--- | :--- | :--- |
${masterRows.join('\n')}

---

### Quick Asset Checklist for Every Demo
* \`01_Hero_Showcase\` (Hero visual)
* \`02_Work_01\` to \`06_Work_05\` (5 Portfolio items)
* \`07_Before_Raw\` & \`08_After_Finished\` (Interactive comparison slider pair)
* \`09_Founder_Or_Expert\` (Principal doctor / architect / founder portrait)
* \`10_Process_Detail\` (Equipment / studio / behind-the-scenes detail)
`;

fs.writeFileSync(path.join(baseDir, '000_MASTER_DEMO_INDEX.md'), masterIndexContent, 'utf8');
console.log('Successfully generated all 50 demo folders and 000_MASTER_DEMO_INDEX.md!');
