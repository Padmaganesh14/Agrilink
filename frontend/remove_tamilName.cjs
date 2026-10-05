const fs = require('fs');

const files = [
  'x:/Agrilink/frontend/src/data/mockData.js',
  'x:/Agrilink/backend/src/config/seedDB.js',
  'x:/Agrilink/frontend/src/components/flow/Step1AddCrop.jsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove tamilName fields completely
  content = content.replace(/tamilName:\s*['"].*?['"],?\s*/g, '');
  content = content.replace(/tamilName:\s*[\w.]+,\s*/g, '');
  content = content.replace(/,\s*tamilName/g, '');
  
  fs.writeFileSync(file, content);
}
console.log('Removed tamilName from scripts');
