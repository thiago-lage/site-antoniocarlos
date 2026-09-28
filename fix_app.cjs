
const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');

text = text.replace(
  /const getScrollAmount = \(\) => {[\s\S]*?return Math\.max\(0, maxScroll\);\s*};/,
  'const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);'
);

fs.writeFileSync('src/App.tsx', text, 'utf8');

