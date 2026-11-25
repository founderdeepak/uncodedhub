const fs = require('fs');
const { execSync } = require('child_process');

const testHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    body { font-family: sans-serif; color: #111; }
    h1 { color: #d4af37; }
  </style>
</head>
<body>
  <h1>Test PDF Generation</h1>
  <p>Testing print-to-pdf via Microsoft Edge.</p>
</body>
</html>`;

fs.writeFileSync('test.html', testHtml, 'utf8');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="test.pdf" "${__dirname}\\test.html"`;

console.log('Running cmd:', cmd);
try {
  execSync(cmd, { stdio: 'pipe' });
  console.log('PDF generated! Size:', fs.statSync('test.pdf').size, 'bytes');
} catch (err) {
  console.error('Error:', err.message);
}
