/**
 * Uncoded Hub — Editorial Diagram Design Compiler
 * Based on the diagram-design skill (github.com/cathrynlavery/diagram-design)
 * Tailored to Uncoded Hub design system (Fraunces + Inter, #F3F0EA, #17161A, #C21E56)
 */

interface DiagramMeta {
  title: string;
  category?: string;
  desc?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cleanText(str: string): string {
  return str
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Common SVG Defs & Markers
 */
function getSvgDefs(): string {
  return `
    <defs>
      <marker id="dd-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#6B6860"/>
      </marker>
      <marker id="dd-arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#C21E56"/>
      </marker>
      <marker id="dd-arrow-link" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#2E5AA8"/>
      </marker>
    </defs>
  `;
}

/**
 * 1. Matrix / Table Schematics (e.g. Head-to-Head Benchmarks, Comparisons)
 */
export function renderMatrixDiagram(
  slug: string,
  title: string,
  headers: string[],
  rows: string[][],
  meta?: { subtitle?: string; focalCol?: number }
): string {
  const colCount = headers.length;
  const colWidth = colCount === 2 ? 360 : colCount === 3 ? 245 : 185;
  const tableWidth = colWidth * colCount;
  const startX = Math.max(30, Math.round((800 - tableWidth) / 2));
  const rowHeight = 44;
  const headerHeight = 46;
  const titleHeight = 70;
  const legendHeight = 50;
  const totalHeight = titleHeight + headerHeight + rows.length * rowHeight + legendHeight + 20;
  const viewBoxW = 860;
  const focalCol = meta?.focalCol ?? (colCount > 1 ? colCount - 1 : -1);

  let rowsSvg = '';
  rows.forEach((row, rIdx) => {
    const y = titleHeight + headerHeight + rIdx * rowHeight;
    const isEven = rIdx % 2 === 0;
    const bgFill = isEven ? '#FFFFFF' : '#F9F8F5';

    rowsSvg += `
      <rect x="${startX}" y="${y}" width="${tableWidth}" height="${rowHeight}" fill="${bgFill}" />
      <line x1="${startX}" y1="${y + rowHeight}" x2="${startX + tableWidth}" y2="${y + rowHeight}" stroke="#DEDAD1" stroke-width="0.8" />
    `;

    row.forEach((cell, cIdx) => {
      const cellX = startX + cIdx * colWidth + 16;
      const isFocal = cIdx === focalCol;
      const textFill = isFocal ? '#C21E56' : cIdx === 0 ? '#17161A' : '#45433E';
      const weight = isFocal || cIdx === 0 ? '600' : '400';
      const cleanCell = escapeHtml(cleanText(cell));

      rowsSvg += `
        <text x="${cellX}" y="${y + 27}" font-family="'Inter', -apple-system, sans-serif" font-size="12" font-weight="${weight}" fill="${textFill}">
          ${cleanCell}
        </text>
      `;
    });
  });

  let headersSvg = '';
  headers.forEach((h, cIdx) => {
    const cellX = startX + cIdx * colWidth + 16;
    const isFocal = cIdx === focalCol;
    const textFill = isFocal ? '#C21E56' : '#17161A';
    headersSvg += `
      <text x="${cellX}" y="${titleHeight + 28}" font-family="'Inter', -apple-system, sans-serif" font-size="11.5" font-weight="600" letter-spacing="0.02em" fill="${textFill}">
        ${escapeHtml(cleanText(h))}
      </text>
    `;
  });

  const legendY = totalHeight - 32;

  return `
<div class="diagram-container" role="region" aria-label="${escapeHtml(title)} Diagram">
  <svg role="img" aria-labelledby="${slug}-title ${slug}-desc" viewBox="0 0 ${viewBoxW} ${totalHeight}">
    <title id="${slug}-title">${escapeHtml(title)}</title>
    <desc id="${slug}-desc">Architectural matrix comparison: ${escapeHtml(title)}.</desc>
    ${getSvgDefs()}
    <rect width="100%" height="100%" fill="#F3F0EA" rx="14" />
    <rect x="${startX}" y="${titleHeight}" width="${tableWidth}" height="${headerHeight + rows.length * rowHeight}" rx="10" fill="#FFFFFF" stroke="#DEDAD1" stroke-width="1.2" />
    
    <!-- Title & Eyebrow -->
    <rect x="${startX}" y="20" width="80" height="18" rx="4" fill="#F4D9E2" />
    <text x="${startX + 40}" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#C21E56" letter-spacing="0.04em">BENCHMARK</text>
    <text x="${startX}" y="56" font-family="'Fraunces', Georgia, serif" font-size="19" font-weight="500" fill="#17161A">${escapeHtml(title)}</text>
    
    <!-- Header Row -->
    <rect x="${startX}" y="${titleHeight}" width="${tableWidth}" height="${headerHeight}" fill="#EFECE6" rx="10" />
    <line x1="${startX}" y1="${titleHeight + headerHeight}" x2="${startX + tableWidth}" y2="${titleHeight + headerHeight}" stroke="#DEDAD1" stroke-width="1.2" />
    ${headersSvg}
    
    <!-- Data Rows -->
    ${rowsSvg}

    <!-- Bottom Legend -->
    <line x1="${startX}" y1="${legendY - 12}" x2="${startX + tableWidth}" y2="${legendY - 12}" stroke="rgba(23,22,26,0.1)" stroke-width="0.8" />
    <text x="${startX}" y="${legendY}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="0.06em" fill="#6B6860">VERIFIED ENGINEERING SPECIFICATION · UNCODED HUB SYSTEM</text>
  </svg>
</div>`;
}

/**
 * 2. Sequential Process / Flowchart (e.g. 7-Day Sprint, Conversions, Pipelines)
 */
export function renderProcessFlowDiagram(
  slug: string,
  title: string,
  steps: { number: string; title: string; desc?: string; focal?: boolean }[]
): string {
  const count = steps.length;
  const isHorizontal = count <= 5;
  const viewBoxW = 860;
  
  if (isHorizontal) {
    const nodeW = Math.min(180, Math.floor((760 - (count - 1) * 36) / Math.max(1, count)));
    const gap = count > 1 ? Math.floor((760 - count * nodeW) / (count - 1)) : 0;
    const startX = count === 1 ? Math.floor((860 - nodeW) / 2) : 50;
    const startY = 86;
    const nodeH = 110;
    const totalH = 240;

    let nodesSvg = '';
    let arrowsSvg = '';

    steps.forEach((s, i) => {
      const x = startX + i * (nodeW + gap);
      const isFocal = s.focal || i === count - 1;
      const stroke = isFocal ? '#C21E56' : '#DEDAD1';
      const strokeW = isFocal ? '1.5' : '1';
      const fill = isFocal ? '#FFFFFF' : '#FFFFFF';
      const badgeBg = isFocal ? '#C21E56' : '#EFECE6';
      const badgeText = isFocal ? '#FFFFFF' : '#6B6860';

      nodesSvg += `
        <!-- Step ${s.number} -->
        <rect x="${x}" y="${startY}" width="${nodeW}" height="${nodeH}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}" />
        <rect x="${x + 12}" y="${startY + 12}" width="28" height="18" rx="4" fill="${badgeBg}" />
        <text x="${x + 26}" y="${startY + 24}" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="700" fill="${badgeText}">${escapeHtml(s.number)}</text>
        <text x="${x + 12}" y="${startY + 48}" font-family="'Fraunces', Georgia, serif" font-size="13.5" font-weight="500" fill="#17161A">${escapeHtml(s.title)}</text>
        ${s.desc ? `<text x="${x + 12}" y="${startY + 68}" font-family="'Inter', sans-serif" font-size="10" fill="#6B6860">${escapeHtml(s.desc)}</text>` : ''}
      `;

      if (i < count - 1) {
        const arrowStart = x + nodeW;
        const arrowEnd = x + nodeW + gap;
        const arrowY = startY + nodeH / 2;
        arrowsSvg += `
          <line x1="${arrowStart + 4}" y1="${arrowY}" x2="${arrowEnd - 4}" y2="${arrowY}" stroke="${isFocal ? '#C21E56' : '#6B6860'}" stroke-width="1.2" marker-end="url(#dd-arrow${isFocal ? '-accent' : ''})" />
        `;
      }
    });

    return `
<div class="diagram-container" role="region" aria-label="${escapeHtml(title)} Flow">
  <svg role="img" aria-labelledby="${slug}-title ${slug}-desc" viewBox="0 0 ${viewBoxW} ${totalH}">
    <title id="${slug}-title">${escapeHtml(title)}</title>
    <desc id="${slug}-desc">Sequential process diagram: ${escapeHtml(title)}.</desc>
    ${getSvgDefs()}
    <rect width="100%" height="100%" fill="#F3F0EA" rx="14" />
    <rect x="50" y="20" width="60" height="18" rx="4" fill="#F4D9E2" />
    <text x="80" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#C21E56" letter-spacing="0.04em">PROCESS</text>
    <text x="50" y="58" font-family="'Fraunces', Georgia, serif" font-size="19" font-weight="500" fill="#17161A">${escapeHtml(title)}</text>
    ${arrowsSvg}
    ${nodesSvg}
    <line x1="50" y1="${totalH - 24}" x2="810" y2="${totalH - 24}" stroke="rgba(23,22,26,0.1)" stroke-width="0.8" />
    <text x="50" y="${totalH - 12}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="0.06em" fill="#6B6860">SEQUENTIAL STAGE PROGRESSION · UNCODED HUB</text>
  </svg>
</div>`;
  }

  // Vertical layout for longer workflows (6-10 steps)
  const nodeW = 680;
  const startX = 90;
  const startY = 80;
  const stepH = 50;
  const totalH = startY + count * (stepH + 16) + 50;

  let nodesSvg = '';
  steps.forEach((s, i) => {
    const y = startY + i * (stepH + 16);
    const isFocal = s.focal || i === count - 1;
    const stroke = isFocal ? '#C21E56' : '#DEDAD1';
    const badgeBg = isFocal ? '#C21E56' : '#F4D9E2';
    const badgeText = isFocal ? '#FFFFFF' : '#C21E56';

    nodesSvg += `
      <rect x="${startX}" y="${y}" width="${nodeW}" height="${stepH}" rx="8" fill="#FFFFFF" stroke="${stroke}" stroke-width="${isFocal ? '1.5' : '1'}" />
      <rect x="${startX + 12}" y="${y + 13}" width="42" height="24" rx="4" fill="${badgeBg}" />
      <text x="${startX + 33}" y="${y + 29}" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="${badgeText}">${escapeHtml(s.number)}</text>
      <text x="${startX + 68}" y="${y + 28}" font-family="'Fraunces', Georgia, serif" font-size="14" font-weight="500" fill="#17161A">${escapeHtml(s.title)}</text>
      ${s.desc ? `<text x="${startX + 68}" y="${y + 42}" font-family="'Inter', sans-serif" font-size="10.5" fill="#6B6860">${escapeHtml(s.desc)}</text>` : ''}
    `;

    if (i < count - 1) {
      const nextY = y + stepH;
      nodesSvg += `
        <line x1="${startX + 33}" y1="${nextY}" x2="${startX + 33}" y2="${nextY + 16}" stroke="#C21E56" stroke-width="1.2" marker-end="url(#dd-arrow-accent)" />
      `;
    }
  });

  return `
<div class="diagram-container" role="region" aria-label="${escapeHtml(title)} Workflow">
  <svg role="img" aria-labelledby="${slug}-title ${slug}-desc" viewBox="0 0 ${viewBoxW} ${totalH}">
    <title id="${slug}-title">${escapeHtml(title)}</title>
    <desc id="${slug}-desc">Workflow diagram: ${escapeHtml(title)}.</desc>
    ${getSvgDefs()}
    <rect width="100%" height="100%" fill="#F3F0EA" rx="14" />
    <rect x="${startX}" y="20" width="70" height="18" rx="4" fill="#F4D9E2" />
    <text x="${startX + 35}" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#C21E56" letter-spacing="0.04em">WORKFLOW</text>
    <text x="${startX}" y="56" font-family="'Fraunces', Georgia, serif" font-size="19" font-weight="500" fill="#17161A">${escapeHtml(title)}</text>
    ${nodesSvg}
    <line x1="${startX}" y1="${totalH - 24}" x2="${startX + nodeW}" y2="${totalH - 24}" stroke="rgba(23,22,26,0.1)" stroke-width="0.8" />
    <text x="${startX}" y="${totalH - 12}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="0.06em" fill="#6B6860">VERIFIED EXECUTION PIPELINE · UNCODED HUB</text>
  </svg>
</div>`;
}

/**
 * 3. Tree / Architecture / Component Blueprint (e.g. Sitemaps, Layer Stacks)
 */
export function renderTreeDiagram(
  slug: string,
  title: string,
  rootLabel: string,
  branches: { label: string; desc?: string; badge?: string }[]
): string {
  const viewBoxW = 860;
  const startX = 60;
  const startY = 80;
  const rootW = 220;
  const rootH = 50;
  const branchW = 480;
  const branchH = 46;
  const count = branches.length;
  const totalH = Math.max(260, startY + count * (branchH + 12) + 50);

  const rootCenterX = startX + rootW;
  const rootCenterY = startY + rootH / 2;

  let branchesSvg = '';
  branches.forEach((b, i) => {
    const by = startY + i * (branchH + 12);
    const bx = startX + rootW + 60;
    const isFocal = i === 0;

    // Orthogonal rounded connector from root to branch
    const branchMidY = by + branchH / 2;
    branchesSvg += `
      <path d="M ${rootCenterX} ${rootCenterY} L ${rootCenterX + 30} ${rootCenterY} Q ${rootCenterX + 45} ${rootCenterY} ${rootCenterX + 45} ${branchMidY > rootCenterY ? rootCenterY + 8 : rootCenterY - 8} L ${rootCenterX + 45} ${branchMidY > rootCenterY ? branchMidY - 8 : branchMidY + 8} Q ${rootCenterX + 45} ${branchMidY} ${rootCenterX + 55} ${branchMidY} L ${bx} ${branchMidY}"
            fill="none" stroke="#6B6860" stroke-width="1.2" marker-end="url(#dd-arrow)" />
      
      <rect x="${bx}" y="${by}" width="${branchW}" height="${branchH}" rx="8" fill="#FFFFFF" stroke="${isFocal ? '#C21E56' : '#DEDAD1'}" stroke-width="${isFocal ? '1.4' : '1'}" />
      <text x="${bx + 16}" y="${by + 22}" font-family="'Fraunces', Georgia, serif" font-size="13" font-weight="500" fill="#17161A">${escapeHtml(b.label)}</text>
      ${b.desc ? `<text x="${bx + 16}" y="${by + 36}" font-family="'Inter', sans-serif" font-size="10.5" fill="#6B6860">${escapeHtml(b.desc)}</text>` : ''}
      ${b.badge ? `
        <rect x="${bx + branchW - 90}" y="${by + 14}" width="76" height="18" rx="4" fill="#F4D9E2" />
        <text x="${bx + branchW - 52}" y="${by + 26}" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="600" fill="#C21E56">${escapeHtml(b.badge)}</text>
      ` : ''}
    `;
  });

  return `
<div class="diagram-container" role="region" aria-label="${escapeHtml(title)} Architecture">
  <svg role="img" aria-labelledby="${slug}-title ${slug}-desc" viewBox="0 0 ${viewBoxW} ${totalH}">
    <title id="${slug}-title">${escapeHtml(title)}</title>
    <desc id="${slug}-desc">Architecture tree diagram: ${escapeHtml(title)}.</desc>
    ${getSvgDefs()}
    <rect width="100%" height="100%" fill="#F3F0EA" rx="14" />
    <rect x="${startX}" y="20" width="85" height="18" rx="4" fill="#F4D9E2" />
    <text x="${startX + 42.5}" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#C21E56" letter-spacing="0.04em">ARCHITECTURE</text>
    <text x="${startX}" y="56" font-family="'Fraunces', Georgia, serif" font-size="19" font-weight="500" fill="#17161A">${escapeHtml(title)}</text>

    <!-- Root Node -->
    <rect x="${startX}" y="${startY}" width="${rootW}" height="${rootH}" rx="10" fill="#17161A" />
    <text x="${startX + 20}" y="${startY + 25}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="0.06em" fill="#C21E56">ROOT HUB</text>
    <text x="${startX + 20}" y="${startY + 41}" font-family="'Fraunces', Georgia, serif" font-size="14.5" font-weight="500" fill="#FFFFFF">${escapeHtml(rootLabel)}</text>

    <!-- Branch Nodes & Connectors -->
    ${branchesSvg}

    <line x1="${startX}" y1="${totalH - 24}" x2="${startX + rootW + 60 + branchW}" y2="${totalH - 24}" stroke="rgba(23,22,26,0.1)" stroke-width="0.8" />
    <text x="${startX}" y="${totalH - 12}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="0.06em" fill="#6B6860">STRUCTURED INFORMATION ARCHITECTURE · UNCODED HUB</text>
  </svg>
</div>`;
}

/**
 * 4. Card / Blueprint Schematics (e.g. Media Hub Card Layout, Application Filter, Treatment Card)
 */
export function renderCardBlueprintDiagram(
  slug: string,
  title: string,
  items: { label?: string; value: string; isAction?: boolean }[]
): string {
  const viewBoxW = 860;
  const startX = 70;
  const cardW = 720;
  const startY = 80;
  const rowH = 38;
  const totalH = startY + items.length * rowH + 60;

  let itemsSvg = '';
  items.forEach((item, i) => {
    const y = startY + i * rowH;
    const isLast = i === items.length - 1;
    if (item.isAction) {
      itemsSvg += `
        <rect x="${startX + 20}" y="${y + 6}" width="160" height="26" rx="13" fill="#C21E56" />
        <text x="${startX + 100}" y="${y + 23}" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="#FFFFFF">${escapeHtml(item.value)}</text>
      `;
    } else {
      itemsSvg += `
        <line x1="${startX + 20}" y1="${y}" x2="${startX + cardW - 20}" y2="${y}" stroke="#DEDAD1" stroke-width="0.8" />
        ${item.label ? `
          <text x="${startX + 20}" y="${y + 24}" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#6B6860">${escapeHtml(item.label)}</text>
          <text x="${startX + 240}" y="${y + 24}" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#17161A">${escapeHtml(item.value)}</text>
        ` : `
          <text x="${startX + 20}" y="${y + 24}" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#17161A">${escapeHtml(item.value)}</text>
        `}
      `;
    }
  });

  return `
<div class="diagram-container" role="region" aria-label="${escapeHtml(title)} Specimen">
  <svg role="img" aria-labelledby="${slug}-title ${slug}-desc" viewBox="0 0 ${viewBoxW} ${totalH}">
    <title id="${slug}-title">${escapeHtml(title)}</title>
    <desc id="${slug}-desc">Card blueprint schematic: ${escapeHtml(title)}.</desc>
    ${getSvgDefs()}
    <rect width="100%" height="100%" fill="#F3F0EA" rx="14" />
    <rect x="${startX}" y="20" width="85" height="18" rx="4" fill="#F4D9E2" />
    <text x="${startX + 42.5}" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#C21E56" letter-spacing="0.04em">BLUEPRINT</text>
    <text x="${startX}" y="56" font-family="'Fraunces', Georgia, serif" font-size="19" font-weight="500" fill="#17161A">${escapeHtml(title)}</text>

    <!-- Outer Card Blueprint -->
    <rect x="${startX}" y="${startY - 10}" width="${cardW}" height="${items.length * rowH + 20}" rx="12" fill="#FFFFFF" stroke="#DEDAD1" stroke-width="1.2" />
    ${itemsSvg}

    <line x1="${startX}" y1="${totalH - 24}" x2="${startX + cardW}" y2="${totalH - 24}" stroke="rgba(23,22,26,0.1)" stroke-width="0.8" />
    <text x="${startX}" y="${totalH - 12}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="0.06em" fill="#6B6860">INTERACTIVE CARD SPECIFICATION · UNCODED HUB</text>
  </svg>
</div>`;
}

/**
 * 5. Branching Inflow / Webhook / Decision Diagrams
 */
export function renderBranchingDiagram(
  slug: string,
  title: string,
  inputStep: { title: string; subtitle?: string },
  branches: { title: string; desc: string; isUrgent?: boolean }[]
): string {
  const viewBoxW = 860;
  const startX = 60;
  const startY = 80;
  const inputW = 740;
  const inputH = 54;
  const branchCount = branches.length;
  const branchW = Math.floor((inputW - (branchCount - 1) * 20) / branchCount);
  const branchH = 120;
  const totalH = startY + inputH + 60 + branchH + 50;

  let branchNodesSvg = '';
  branches.forEach((b, i) => {
    const bx = startX + i * (branchW + 20);
    const by = startY + inputH + 50;
    const isUrgent = b.isUrgent;
    const stroke = isUrgent ? '#C21E56' : '#DEDAD1';
    const tagBg = isUrgent ? '#F4D9E2' : '#EFECE6';
    const tagText = isUrgent ? '#C21E56' : '#6B6860';

    // Connector from input to branch
    const branchMidX = bx + branchW / 2;
    branchNodesSvg += `
      <path d="M 430 ${startY + inputH} L 430 ${startY + inputH + 25} L ${branchMidX} ${startY + inputH + 25} L ${branchMidX} ${by}"
            fill="none" stroke="${isUrgent ? '#C21E56' : '#6B6860'}" stroke-width="1.2" marker-end="url(#dd-arrow${isUrgent ? '-accent' : ''})" />
      
      <rect x="${bx}" y="${by}" width="${branchW}" height="${branchH}" rx="10" fill="#FFFFFF" stroke="${stroke}" stroke-width="${isUrgent ? '1.5' : '1'}" />
      <rect x="${bx + 14}" y="${by + 12}" width="${isUrgent ? '72' : '62'}" height="18" rx="4" fill="${tagBg}" />
      <text x="${bx + 14 + (isUrgent ? 36 : 31)}" y="${by + 24}" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="700" fill="${tagText}">${isUrgent ? 'URGENT PATH' : 'STANDARD'}</text>
      <text x="${bx + 14}" y="${by + 52}" font-family="'Fraunces', Georgia, serif" font-size="14.5" font-weight="500" fill="#17161A">${escapeHtml(b.title)}</text>
      <text x="${bx + 14}" y="${by + 72}" font-family="'Inter', sans-serif" font-size="11" fill="#6B6860">${escapeHtml(b.desc)}</text>
    `;
  });

  return `
<div class="diagram-container" role="region" aria-label="${escapeHtml(title)} Flow">
  <svg role="img" aria-labelledby="${slug}-title ${slug}-desc" viewBox="0 0 ${viewBoxW} ${totalH}">
    <title id="${slug}-title">${escapeHtml(title)}</title>
    <desc id="${slug}-desc">Branching decision workflow: ${escapeHtml(title)}.</desc>
    ${getSvgDefs()}
    <rect width="100%" height="100%" fill="#F3F0EA" rx="14" />
    <rect x="${startX}" y="20" width="75" height="18" rx="4" fill="#F4D9E2" />
    <text x="${startX + 37.5}" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#C21E56" letter-spacing="0.04em">DECISION</text>
    <text x="${startX}" y="56" font-family="'Fraunces', Georgia, serif" font-size="19" font-weight="500" fill="#17161A">${escapeHtml(title)}</text>

    <!-- Top Trigger Node -->
    <rect x="${startX}" y="${startY}" width="${inputW}" height="${inputH}" rx="10" fill="#17161A" />
    <text x="${startX + 20}" y="${startY + 23}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="0.06em" fill="#C21E56">SYSTEM TRIGGER</text>
    <text x="${startX + 20}" y="${startY + 41}" font-family="'Fraunces', Georgia, serif" font-size="15" font-weight="500" fill="#FFFFFF">${escapeHtml(inputStep.title)}</text>

    ${branchNodesSvg}

    <line x1="${startX}" y1="${totalH - 24}" x2="${startX + inputW}" y2="${totalH - 24}" stroke="rgba(23,22,26,0.1)" stroke-width="0.8" />
    <text x="${startX}" y="${totalH - 12}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="0.06em" fill="#6B6860">AUTOMATED EVENT TRIAGE PROTOCOL · UNCODED HUB</text>
  </svg>
</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PARSER & COMPILER (Compiles ASCII/Markdown Diagrams to Responsive SVG)
// ─────────────────────────────────────────────────────────────────────────────

interface MatrixDiagramModel {
  type: 'matrix';
  title: string;
  headers: string[];
  rows: string[][];
  meta?: { subtitle?: string; focalCol?: number };
}

interface FlowchartDiagramModel {
  type: 'flowchart';
  title: string;
  steps: { number: string; title: string; desc?: string; focal?: boolean }[];
}

interface TreeDiagramModel {
  type: 'tree' | 'inflow-funnel';
  title: string;
  rootLabel: string;
  branches: { label: string; desc?: string; badge?: string }[];
}

interface CardDiagramModel {
  type: 'card';
  title: string;
  items: { label?: string; value: string; isAction?: boolean }[];
}

interface BranchingDiagramModel {
  type: 'branching';
  title: string;
  inputStep: { title: string; subtitle?: string };
  branches: { title: string; desc: string; isUrgent?: boolean }[];
}

type ParsedDiagram =
  | MatrixDiagramModel
  | FlowchartDiagramModel
  | TreeDiagramModel
  | CardDiagramModel
  | BranchingDiagramModel
  | { type: 'unknown'; body: string };

export function parseAsciiDiagram(rawCode: string): ParsedDiagram {
  const body = rawCode.replace(/^```\w*\r?\n/, '').replace(/\r?\n```$/, '').trim();
  const rawLines = body.split(/\r?\n/).map(l => l.trimEnd());
  const lines = rawLines.filter(Boolean);

  // 1. Box Table Matrix (┌───┬───┐)
  if (body.includes('┌') && body.includes('┬')) {
    let title = 'Engineering Specification';
    const dataGroups: string[][][] = [];
    let currentGroup: string[][] = [];

    for (const line of rawLines) {
      if (line.includes('┌') || line.includes('└')) continue;
      if (line.includes('├') || line.includes('┼')) {
        if (currentGroup.length > 0) {
          dataGroups.push(currentGroup);
          currentGroup = [];
        }
        continue;
      }
      if (line.includes('│')) {
        const parts = line.split('│').slice(1, -1).map(s => s.trim());
        currentGroup.push(parts);
      }
    }
    if (currentGroup.length > 0) dataGroups.push(currentGroup);

    // Extract title if first group is single column
    if (dataGroups.length > 0 && dataGroups[0][0] && dataGroups[0][0].length === 1) {
      title = dataGroups[0].map(r => r[0]).join(' ').trim();
      dataGroups.shift();
    }

    let headers: string[] = [];
    const rows: string[][] = [];

    // Special case: 10-Point Forensic Diagnostic Matrix
    if (body.includes('10-Point Forensic')) {
      title = '10-Point Forensic Website Diagnostic Matrix';
      headers = ['#', 'Diagnostic Dimension', 'The Passing Benchmark'];
      const g = dataGroups[1] || [];
      let cur: string[] | null = null;
      for (const r of g) {
        if (r[0] && /^\d+$/.test(r[0])) {
          if (cur) rows.push(cur);
          cur = [r[0], r[1] || '', r[2] || ''];
        } else if (cur) {
          if (r[1]) cur[1] += ' ' + r[1];
          if (r[2]) cur[2] += ' ' + r[2];
        }
      }
      if (cur) rows.push(cur);
      return { type: 'matrix', title, headers, rows };
    }

    // Special case: Tiered Implant Breakdown
    if (body.includes('Tiered Implant Breakdown')) {
      title = 'Tiered Implant Breakdown: Brand, Material, Warranty';
      headers = ['Korean Systems (Osstem / Dentium)', 'European / Swiss Systems (Straumann / Nobel)'];
      return {
        type: 'matrix',
        title,
        headers,
        rows: [
          ['Price Range', '₹28,000 – ₹38,000', '₹55,000 – ₹75,000'],
          ['Warranty Term', '10-Year Warranty', 'Lifetime Global Warranty'],
          ['Bone Clinical Fit', 'High-Density Bone Fit', 'Immediate Loading / Thin Bone'],
        ],
      };
    }

    // Special case: Authentic Studio Warranty Shield
    if (body.includes('Authentic Studio Warranty Shield')) {
      title = 'Authentic Studio Warranty Shield';
      headers = ['Component Scope', 'Warranty Commitment'];
      return {
        type: 'matrix',
        title,
        headers,
        rows: [
          ['Moving Hardware (Hinges, Runners)', '10-Year Replacement'],
          ['Core Carcass (BWP Marine Plywood)', '25-Year Warranty'],
          ['Acrylic / PU Surface Finishing', '5-Year Adhesion'],
          ['Quartz / Granite Countertop', '10-Year Stain Resistance'],
        ],
      };
    }

    // Special case: Interactive Before / After Production Slider
    if (body.includes('Interactive Before / After Production Slider')) {
      title = 'Interactive Before / After Production Slider';
      headers = ['Stage View', 'Production Deliverable'];
      return {
        type: 'matrix',
        title,
        headers,
        rows: [
          ['Left View: 3D CAD Render', 'Initial structural render showing floral trussing and seating layout'],
          ['Right View: Real Event', 'Live photograph with full lighting, florals, and real guests in attendance'],
        ],
      };
    }

    // Standard matrix group merging
    const parsedRows: string[][] = [];
    for (const group of dataGroups) {
      let currentRow: string[] | null = null;
      for (const lineParts of group) {
        const hasFirstCol = lineParts[0] && lineParts[0].trim().length > 0;
        if (!currentRow || hasFirstCol) {
          if (currentRow) parsedRows.push(currentRow);
          currentRow = lineParts.map(s => s.trim());
        } else {
          for (let c = 0; c < lineParts.length; c++) {
            if (lineParts[c] && lineParts[c].trim()) {
              currentRow[c] = (currentRow[c] ? currentRow[c] + ' ' : '') + lineParts[c].trim();
            }
          }
        }
      }
      if (currentRow) parsedRows.push(currentRow);
    }

    const cleanedRows = parsedRows.map(row =>
      row.map(s => s.replace(/\s+/g, ' ').replace(/-\s+/g, '').trim())
    );

    if (cleanedRows.length === 2 && cleanedRows[1].some(c => c.includes('•'))) {
      headers = cleanedRows[0];
      const bulletCols = cleanedRows[1].map(c => c.split('•').map(s => s.trim()).filter(Boolean));
      const maxBullets = Math.max(...bulletCols.map(b => b.length));
      for (let b = 0; b < maxBullets; b++) {
        rows.push(bulletCols.map(col => col[b] || ''));
      }
    } else if (cleanedRows.length >= 2) {
      const firstRow = cleanedRows[0];
      const isHeader = /Metric|Tier|Brand|Vertical|System|Threat|Direct|Cluttered|Left|Scope|Day 1|Stage/i.test(firstRow.join(' '));
      if (isHeader) {
        headers = firstRow;
        rows.push(...cleanedRows.slice(1));
      } else {
        headers = ['Phase / Component', 'Specification Details'];
        rows.push(...cleanedRows);
      }
    } else if (cleanedRows.length === 1) {
      headers = ['Specification', 'Value'];
      rows.push(cleanedRows[0]);
    }

    if (headers.length === 0) headers = ['Component', 'Details'];
    if (rows.length === 0) rows.push(['Feature', 'Benchmark Specification']);

    return { type: 'matrix', title, headers, rows };
  }

  // 2. Branching Decision / Webhook Flow
  if (body.includes('├── Option A:') || body.includes('Option A: Severe Pain') || (body.includes('▼') && body.includes('Option B:'))) {
    return {
      type: 'branching',
      title: 'WhatsApp Emergency Clinical Triage Protocol',
      inputStep: { title: 'Patient Taps "WhatsApp Emergency Triage" on Website' },
      branches: [
        { title: 'Urgent Emergency Path', desc: 'Severe pain / swelling inquiry forwarded instantly to on-call duty dentist via SMS & phone alert.', isUrgent: true },
        { title: 'Standard Routine Inquiries', desc: 'Automated treatment selector (aligners, implants, cleaning) with real-time calendar slot reservation.', isUrgent: false },
      ],
    };
  }

  if (body.includes('Instant WhatsApp Lead Capture Flow') || body.includes("To the Prospect's Phone")) {
    return {
      type: 'branching',
      title: 'Instant WhatsApp Dual-Channel Lead Capture Architecture',
      inputStep: { title: 'Visitor Submits Inquiry Form (Name, Phone, Scope) ➔ Serverless Webhook' },
      branches: [
        { title: "To Prospect's WhatsApp", desc: 'Instant personal greeting with 2026 Lookbook sent within 3 seconds while they browse.', isUrgent: false },
        { title: 'To Sales VIP Phone Alert', desc: 'Direct phone notification with budget, floor plan, and 1-tap dial action button.', isUrgent: true },
      ],
    };
  }

  if (body.includes('Norwood Scale Visual Selector')) {
    return {
      type: 'branching',
      title: 'Interactive Norwood Scale Visual Triage Funnel',
      inputStep: { title: 'Candidate Selects Hair Thinning Stage (Norwood 1 to 7)' },
      branches: [
        { title: 'Stages 1–4: Frontal & Crown', desc: '1,000–2,800 Grafts · Targeted hairline dense-packing & temple reconstruction.', isUrgent: false },
        { title: 'Stages 5–7: Advanced Coverage', desc: '3,500–4,500+ Grafts · Combined scalp & beard donor harvest with megasession protocol.', isUrgent: true },
      ],
    };
  }

  // 3. Tree Hierarchy (├── or └──)
  if (body.includes('├──') || body.includes('└──')) {
    let title = 'System Hierarchy';
    let rootLabel = 'Primary Architecture';
    const titleMatch = body.match(/^\[(.*?)\]/m) || body.match(/^(.*?):/m);
    if (titleMatch) {
      title = titleMatch[1].trim();
      rootLabel = title;
    }

    const branches: { label: string; desc?: string; badge?: string }[] = [];
    for (const l of lines) {
      if (l.includes('├──') || l.includes('└──')) {
        const rawItem = l.replace(/^.*?[├└]──\s*/, '').trim();
        const parts = rawItem.split(/:\s*(.*)/);
        const label = parts[0].trim();
        const desc = parts[1] ? parts[1].trim() : '';
        branches.push({ label, desc });
      }
    }
    if (branches.length === 0) {
      branches.push({ label: 'Core Module', desc: 'Standard architecture component' });
    }
    return { type: 'tree', title, rootLabel, branches };
  }

  // 4. Inflow Hub Funnel
  if (body.includes('The Sovereign Content Funnel') || body.includes('https://yourname.com')) {
    return {
      type: 'inflow-funnel',
      title: 'The Sovereign Owned-Domain Content Funnel',
      rootLabel: 'https://yourname.com (Primary Sovereign Hub)',
      branches: [
        { label: 'Full Case Studies & Application Funnels', desc: 'Qualified high-ticket conversions and consultation bookings' },
        { label: 'Core Service Retainer Architecture', desc: 'Fixed-price scopes, guarantees, and direct client onboarding' },
        { label: 'Substack & LinkedIn Syndication', desc: 'Weekly dispatches driving qualified inbound readers to primary domain', badge: 'INFLOW ENGINE' },
      ],
    };
  }

  // 5. Special Multi-Step Architecture Models
  if (body.includes('[Open Calendly Dynamic]') || body.includes('[Curated Application Dynamic]')) {
    return {
      type: 'matrix',
      title: 'Open Calendly vs Curated Application Posture',
      headers: ['Funnel Architecture', 'Client Mental Posture', 'Positioning Dynamic'],
      rows: [
        ['Open Calendly Link', '"I\'ll give them 15 minutes to see what they have to say."', 'Supplicant Posture (Coach auditions for client)'],
        ['Curated Application Funnel', '"I hope our company meets their qualification criteria."', 'Authority Posture (Client auditions for coach)'],
      ],
      meta: { focalCol: 2 },
    };
  }

  if (body.includes('The Agency Game of Telephone') || body.includes('Internal Jira Ticket')) {
    return {
      type: 'flowchart',
      title: 'The Agency Game of Telephone Breakdown',
      steps: [
        {
          number: '01',
          title: 'Client Operational Brief',
          desc: 'Client states: "Route aesthetic inquiries to WhatsApp and root canals to email."',
        },
        {
          number: '02',
          title: 'Internal Jira Ticket',
          desc: 'Account Manager interprets: "Client wants some WhatsApp button added."',
        },
        {
          number: '03',
          title: 'Executed Broken Result',
          desc: 'Junior Dev executes: Broken generic floating icon linking to empty chat.',
          focal: true,
        },
      ],
    };
  }

  if (body.includes('Lightweight WebP Poster Frame') || body.includes('[Dynamic Player Injection]')) {
    return {
      type: 'flowchart',
      title: 'High-Performance Video Facade Architecture',
      steps: [
        {
          number: '01',
          title: 'Initial Page Load (< 1.0s)',
          desc: 'Lightweight WebP Poster Frame (40KB) · Zero YouTube or video scripts loaded',
        },
        {
          number: '02',
          title: 'Dynamic Player Injection',
          desc: 'User taps play · Video player loads on-demand and begins streaming instantly',
          focal: true,
        },
      ],
    };
  }

  if (body.includes('Explore in 3D') || body.includes('[Dynamic Lazy Injection]')) {
    return {
      type: 'flowchart',
      title: 'Interactive 3D Virtual Tour Lazy-Load Architecture',
      steps: [
        {
          number: '01',
          title: 'Fast Initial Load (< 1.0s)',
          desc: 'High-Res WebP Snapshot (120KB) · Zero WebGL scripts or blocking iframes',
        },
        {
          number: '02',
          title: 'Dynamic Lazy Injection',
          desc: 'User clicks "Start 3D Tour" · Matterport/WebGL script loads on-demand in overlay',
          focal: true,
        },
      ],
    };
  }

  // 6. Vertical Flowchart (▼,  v , ➔)
  if (body.includes('▼') || body.includes('  v ') || body.includes('│\r\n') || body.includes('│\n') || body.includes('➔')) {
    let title = 'Conversion Flowchart';
    const titleMatch = body.match(/^\[(.*?)\]/m);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }

    const steps: { number: string; title: string; desc?: string; focal?: boolean }[] = [];
    const stepMatches = body.match(/\[(.*?)\]/g) || [];
    let sIdx = 1;
    for (const m of stepMatches) {
      const stepText = m.slice(1, -1).trim();
      if (stepText === title) continue;
      const parts = stepText.split(/:\s*(.*)/);
      const stepTitle = parts[0].trim();
      const stepDesc = parts[1] ? parts[1].trim() : '';
      steps.push({
        number: `0${sIdx++}`,
        title: stepTitle,
        desc: stepDesc,
      });
    }

    if (steps.length === 0) {
      const arrowParts = body.split(/➔|->/).map(s => s.trim()).filter(Boolean);
      arrowParts.forEach((p, idx) => {
        steps.push({
          number: `0${idx + 1}`,
          title: p,
        });
      });
    }

    if (steps.length === 0) {
      steps.push({ number: '01', title: 'System Phase 1' });
    }

    return { type: 'flowchart', title, steps };
  }

  // 6. Box Card Blueprint
  if (body.includes('┌') && body.includes('└')) {
    let title = 'Interactive Specimen Blueprint';
    const titleMatch = body.match(/│\s*([A-Za-z0-9\s:–-]+?)\s*│/);
    if (titleMatch && !titleMatch[1].includes(':')) {
      title = titleMatch[1].trim();
    }

    const items: { label?: string; value: string; isAction?: boolean }[] = [];
    for (const l of lines) {
      if (l.includes('┌') || l.includes('└') || l.includes('├')) continue;
      if (l.includes('│')) {
        const content = l.replace(/^│\s*/, '').replace(/\s*│$/, '').trim();
        if (content && content !== title) {
          const parts = content.split(/:\s*(.*)/);
          if (parts.length > 1) {
            items.push({ label: parts[0].trim(), value: parts[1].trim() });
          } else {
            items.push({ value: content });
          }
        }
      }
    }
    if (items.length === 0) items.push({ value: 'Standard Component Blueprint' });
    return { type: 'card', title, items };
  }

  // 7. Timeline Progression (Day 1..Day 7, Year 1..Year 3)
  if (/^Day \d:/m.test(body) || /^Year \d:/m.test(body)) {
    const title = body.includes('The 7-Day') ? 'The 7-Day Production Pipeline' : 'Organic Content Compounding Curve';
    const steps: { number: string; title: string; desc?: string; focal?: boolean }[] = [];
    for (const l of lines) {
      const match = l.match(/^(Day \d|Year \d):\s*(.*)/i);
      if (match) {
        steps.push({
          number: match[1],
          title: match[2].trim(),
        });
      }
    }
    if (steps.length === 0) steps.push({ number: 'Day 1', title: 'Sprint Kickoff' });
    return { type: 'flowchart', title, steps };
  }

  return { type: 'unknown', body };
}

export function compileAsciiToSvgDiagram(code: string, slug: string, index: number): string {
  const parsed = parseAsciiDiagram(code);
  const diagramSlug = `${slug}-diag-${index}`;

  switch (parsed.type) {
    case 'matrix':
      return renderMatrixDiagram(diagramSlug, parsed.title, parsed.headers, parsed.rows, parsed.meta);
    case 'flowchart':
      return renderProcessFlowDiagram(diagramSlug, parsed.title, parsed.steps);
    case 'tree':
    case 'inflow-funnel':
      return renderTreeDiagram(diagramSlug, parsed.title, parsed.rootLabel, parsed.branches);
    case 'branching':
      return renderBranchingDiagram(diagramSlug, parsed.title, parsed.inputStep, parsed.branches);
    case 'card':
      return renderCardBlueprintDiagram(diagramSlug, parsed.title, parsed.items);
    default:
      return `<pre class="code-block"><code class="font-mono text-xs text-stone-700">${escapeHtml(code)}</code></pre>`;
  }
}

