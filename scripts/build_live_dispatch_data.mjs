import fs from 'fs';
import path from 'path';

const inputCsvPath = 'c:/Users/LENOVO/Downloads/uncoded-hub/linkedIn_Master/Deepak_Connections/Connections.csv';
const outputDir = 'c:/Users/LENOVO/Downloads/uncoded-hub/public/linkedin-dispatch';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function cleanFirstName(rawFirst, rawLast, position = '', company = '') {
  if (!rawFirst) return 'there';
  let name = rawFirst.trim();
  
  // Remove emojis & unicode symbols
  name = name.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '');
  
  // Remove parenthesis or bracket annotations e.g. "Bijith Kumar (Interra Spaces)" or "🔜 PAX"
  name = name.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '');
  
  // Detect Doctor
  const isDr = /^Dr\.?\s+/i.test(name) || /^Dr\.?\s+/i.test(rawFirst) || /\b(Doctor|Physician|Surgeon)\b/i.test(position);
  name = name.replace(/^Dr\.?\s+/i, '');
  
  // Clean non-letter characters
  name = name.replace(/[^a-zA-Z\s'-]/g, ' ').trim();
  
  // Get first name token
  const tokens = name.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 'there';
  
  let first = tokens[0];
  first = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  
  if (isDr && !first.toLowerCase().startsWith('dr')) {
    return `Dr. ${first}`;
  }
  return first;
}

function cleanCompany(rawCompany) {
  if (!rawCompany) return '';
  let comp = rawCompany.trim();
  comp = comp.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '');
  comp = comp.replace(/\s+(Pvt\.?|Private|Ltd\.?|Limited|LLP|Inc\.?|Corporation|Co\.|GmbH)\b.*/gi, '').trim();
  comp = comp.replace(/\s*[-–—•|].*$/, '').trim();
  if (comp.length > 35) {
    comp = comp.slice(0, 32).trim() + '...';
  }
  return comp;
}

function classifyPersona(position = '', company = '', rawFirst = '') {
  const p = (position || '').toLowerCase();
  const c = (company || '').toLowerCase();
  const combo = `${p} ${c}`;

  // 1. Healthcare / Doctors
  if (/^dr\.?\s+/i.test(rawFirst) || /\b(doctor|dr\.|physician|surgeon|dentist|clinic|hospital|psychologist|therapist|ayurveda|cataract|retina|ophthalm|medical|pharma|pediatrician|dermatolog)\b/i.test(combo)) {
    return 'HEALTHCARE';
  }

  // 2. Founders / C-Suite / Owners
  if (/\b(founder|co-founder|ceo|managing director|proprietor|partner|chief executive|owner|director|president|co-owner)\b/i.test(p)) {
    return 'FOUNDER';
  }

  // 3. Tech & Engineering
  if (/\b(developer|software|engineer|architect|full stack|frontend|backend|ai|data|cto|qa|devops|programmer|tech lead|coder|systems|machine learning)\b/i.test(p)) {
    return 'TECH';
  }

  // 4. Real Estate & Architecture / Interior
  if (/\b(interior|real estate|builder|property|realty|architect|decor|infrastructure|construction)\b/i.test(combo)) {
    return 'REALESTATE';
  }

  // 5. Creative & Media & Marketing
  if (/\b(creative|art director|designer|ui|ux|graphic|video|editor|photographer|videographer|motion|media|animator|producer|cinematographer|content|branding|brand|marketing|seo|growth)\b/i.test(combo)) {
    return 'CREATIVE';
  }

  // 6. Fitness & Wellness & Coaching
  if (/\b(fitness|trainer|coach|gym|yoga|wellness|nutrition|wellness coach|bodybuilding|pilates)\b/i.test(combo)) {
    return 'FITNESS';
  }

  // 7. General Professional / Business
  return 'PROFESSIONAL';
}

function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

const raw = fs.readFileSync(inputCsvPath, 'utf8');
const allLines = raw.split(/\r?\n/);
const headerIdx = allLines.findIndex(l => l.startsWith('First Name,Last Name'));
const dataLines = allLines.slice(headerIdx + 1).filter(l => l.trim().length > 0);

console.log(`Processing ${dataLines.length} connections for live dispatch...`);

const rows = [];
const stats = {
  TOTAL: dataLines.length,
  FOUNDER: 0,
  TECH: 0,
  CREATIVE: 0,
  HEALTHCARE: 0,
  REALESTATE: 0,
  FITNESS: 0,
  PROFESSIONAL: 0
};

for (let i = 0; i < dataLines.length; i++) {
  const [firstName, lastName, url, email, company, position, connectedOn] = parseCSVLine(dataLines[i]);
  const cleanName = cleanFirstName(firstName, lastName, position, company);
  const cleanComp = cleanCompany(company);
  const persona = classifyPersona(position, company, firstName);
  const variant = i % 3;

  stats[persona] = (stats[persona] || 0) + 1;

  // Compact entry: [cleanName, lastName, cleanComp, position, persona, url, connectedOn, variant]
  rows.push([
    cleanName,
    (lastName || '').replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim(),
    cleanComp,
    (position || '').replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim(),
    persona,
    url || '',
    connectedOn || '',
    variant
  ]);
}

const payload = {
  stats,
  rows
};

const jsOutputPath = path.join(outputDir, 'dispatch_data.js');
fs.writeFileSync(jsOutputPath, 'window.DISPATCH_DATA = ' + JSON.stringify(payload) + ';', 'utf8');

console.log('✅ Generated dispatch_data.js at:', jsOutputPath);
console.log('File size:', (fs.statSync(jsOutputPath).size / (1024 * 1024)).toFixed(2), 'MB');
console.log('Stats:', stats);

