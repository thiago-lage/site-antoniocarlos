
const fs = require('fs');
let text = fs.readFileSync('src/components/TrajectorySection.tsx', 'utf8');

text = text.replace(
  /<div id="trajectory-track" className="flex items-stretch/g,
  '<div id="trajectory-track" className="relative flex items-stretch'
);

fs.writeFileSync('src/components/TrajectorySection.tsx', text, 'utf8');

