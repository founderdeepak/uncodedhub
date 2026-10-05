import fs from 'fs';
import path from 'path';

const TIME_SLOTS = [
  '08:00:00+05:30', // 8:00 AM
  '10:00:00+05:30', // 10:00 AM
  '11:00:00+05:30', // 11:00 AM
  '14:00:00+05:30', // 2:00 PM
  '16:00:00+05:30', // 4:00 PM
  '19:00:00+05:30', // 7:00 PM
  '21:00:00+05:30'  // 9:00 PM
];

const blogDir = './src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') && f !== 'README.md');

const startDate = new Date('2026-03-13T00:00:00+05:30');
const endDate = new Date('2026-10-05T00:00:00+05:30');
const dayMs = 24 * 60 * 60 * 1000;
const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / dayMs) + 1; // 207 days

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Separate pillars from spokes so foundational pillars come out first
const PILLAR_SLUGS = [
  'what-an-interior-designers-website-should-include',
  'what-a-real-estate-agents-website-should-include',
  'what-a-dental-clinics-website-should-include',
  'what-a-wedding-photographers-website-should-include',
  'what-a-modular-kitchen-renovation-website-should-include',
  'what-a-coachs-website-should-include',
  'how-much-should-a-small-business-website-cost-in-india'
];

const pillars = [];
const spokes = [];

files.forEach(f => {
  const slug = f.replace(/\.md$/, '');
  if (PILLAR_SLUGS.includes(slug)) {
    pillars.push(f);
  } else {
    spokes.push(f);
  }
});

spokes.sort((a, b) => a.localeCompare(b));
const queue = [...pillars, ...spokes];

const daysUsed = new Map();
let updatedCount = 0;

queue.forEach((file, index) => {
  // Distribute over the 207 days
  const dayIndex = Math.min(totalDays - 1, Math.floor((index / queue.length) * totalDays));
  const postDate = new Date(startDate.getTime() + dayIndex * dayMs);
  const yyyy = postDate.getFullYear();
  const mm = String(postDate.getMonth() + 1).padStart(2, '0');
  const dd = String(postDate.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  if (!daysUsed.has(dateStr)) {
    daysUsed.set(dateStr, []);
  }
  const usedSlots = daysUsed.get(dateStr);
  const availableSlots = TIME_SLOTS.filter(s => !usedSlots.includes(s));
  const pickIndex = hashCode(file) % (availableSlots.length || TIME_SLOTS.length);
  const chosenSlot = availableSlots.length ? availableSlots[pickIndex] : TIME_SLOTS[pickIndex];
  usedSlots.push(chosenSlot);

  const isoTimestamp = `${dateStr}T${chosenSlot}`;

  // Update file frontmatter
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace date: "..." or date: YYYY-MM-DD
  if (/date:\s*["']?[^"'\r\n]+["']?/.test(content)) {
    content = content.replace(/date:\s*["']?[^"'\r\n]+["']?/, `date: "${isoTimestamp}"`);
  } else {
    // If not found, add after title:
    content = content.replace(/(title:\s*["'][^"']+["'])/, `$1\ndate: "${isoTimestamp}"`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
});

console.log(`Successfully updated ${updatedCount} blog posts with realistic dates and randomized publishing times!`);
console.log(`Earliest post: ${startDate.toISOString().slice(0, 10)}`);
console.log(`Latest post: ${endDate.toISOString().slice(0, 10)}`);
console.log(`Randomized time slots used: 8:00 AM, 10:00 AM, 11:00 AM, 2:00 PM, 4:00 PM, 7:00 PM, 9:00 PM`);
