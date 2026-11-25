const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const buf = fs.readFileSync(path.join(__dirname, 'test_page_margins.pdf'));
const str = buf.toString('latin1');

// Extract all streams
const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
let match;
let streamIndex = 0;

while ((match = streamRegex.exec(str)) !== null) {
  streamIndex++;
  const rawStream = Buffer.from(match[1], 'latin1');
  try {
    const decompressed = zlib.inflateSync(rawStream).toString('utf8');
    console.log(`--- STREAM ${streamIndex} (Length: ${decompressed.length}) ---`);
    const lines = decompressed.split('\n').filter(l => l.includes(' re') || l.includes(' cm') || l.includes('Tj') || l.includes('TJ'));
    console.log(lines.slice(0, 15).join('\n'));
  } catch (e) {
    // Not deflate compressed or failed
  }
}
