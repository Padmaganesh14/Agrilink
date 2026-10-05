const fs = require('fs');

// 1. mockData.js
let md = fs.readFileSync('x:/Agrilink/frontend/src/data/mockData.js', 'utf8');
md = md.replace(/\|\|\s*\(c\.tamilName && c\.tamilName\.includes\(cleanName\)\)/g, '');
fs.writeFileSync('x:/Agrilink/frontend/src/data/mockData.js', md);

// 2. BuyerMarketplaceView.jsx
let bmv = fs.readFileSync('x:/Agrilink/frontend/src/components/marketplace/BuyerMarketplaceView.jsx', 'utf8');
bmv = bmv.replace(/const tamilName = c\.tamilName \|\| "";\n\s*return[\s\S]*?tamilName\.includes\(searchTerm\);/g, 'return cropName.includes(searchTerm);');
fs.writeFileSync('x:/Agrilink/frontend/src/components/marketplace/BuyerMarketplaceView.jsx', bmv);

// 3. Step5_5TransportSelection.jsx
let tsv = fs.readFileSync('x:/Agrilink/frontend/src/components/flow/Step5_5TransportSelection.jsx', 'utf8');
tsv = tsv.replace(/\{lang === "ta" \? partner\.tamilName : partner\.name\}/g, '{partner.name}');
fs.writeFileSync('x:/Agrilink/frontend/src/components/flow/Step5_5TransportSelection.jsx', tsv);

// 4. Step1AddCrop.jsx
let ac = fs.readFileSync('x:/Agrilink/frontend/src/components/flow/Step1AddCrop.jsx', 'utf8');
ac = ac.replace(/\|\|\s*\(c\.tamilName && c\.tamilName\.includes\(q\)\)/g, '');
ac = ac.replace(/\|\|\s*\(c\.tamilName && c\.tamilName\.trim\(\) === searchQuery\.trim\(\)\)/g, '');
ac = ac.replace(/\|\|\s*\(c\.tamilName && c\.tamilName === cleanInput\)/g, '');
ac = ac.replace(/\{lang === "ta" \? c\.tamilName : c\.name\}/g, '{c.name}');
ac = ac.replace(/<p className="text-xs text-slate-500">[\s\S]*?\{lang === "ta" \? c\.name : c\.tamilName\}[\s\S]*?<\/p>/g, '');
ac = ac.replace(/\{lang === "ta" \? chip\.tamilName : chip\.name\}/g, '{chip.name}');
fs.writeFileSync('x:/Agrilink/frontend/src/components/flow/Step1AddCrop.jsx', ac);

console.log("Cleanup complete");
