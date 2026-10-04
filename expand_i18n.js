const fs = require('fs');

const i18nPath = 'x:\\Agrilink\\frontend\\src\\data\\i18n.js';
let content = fs.readFileSync(i18nPath, 'utf8');

// Extract the en block
const enMatch = content.match(/en:\s*\{([\s\S]*?)\n  \},\n\n  ta:/);
if (!enMatch) {
  console.log('en block not found');
  process.exit(1);
}

const enBlock = enMatch[1];

// We will just append hi, te, kn, ml, mr blocks using the enBlock content, 
// so the keys exist, and they can be customized later.
// We'll replace a few obvious ones for Hindi and Telugu just to show it works.

let hiBlock = enBlock
  .replace(/"SELL YOUR CROP"/g, '"अपनी फसल बेचें"')
  .replace(/"AGRILINK AI"/g, '"एग्रीलिंक AI"')
  .replace(/"WHAT ARE YOU SELLING TODAY\?"/g, '"आज आप क्या बेच रहे हैं?"')
  .replace(/"Find the market. Find the buyer. Move the crop."/g, '"बाजार खोजें। खरीदार खोजें। फसल ले जाएँ।"');

let teBlock = enBlock
  .replace(/"SELL YOUR CROP"/g, '"మీ పంటను విక్రయించండి"')
  .replace(/"AGRILINK AI"/g, '"అగ్రిలింక్ AI"')
  .replace(/"WHAT ARE YOU SELLING TODAY\?"/g, '"ఈ రోజు మీరు ఏమి అమ్ముతున్నారు?"');

let knBlock = enBlock.replace(/"SELL YOUR CROP"/g, '"ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಮಾರಾಟ ಮಾಡಿ"');
let mlBlock = enBlock.replace(/"SELL YOUR CROP"/g, '"നിങ്ങളുടെ വിള വിൽക്കുക"');
let mrBlock = enBlock.replace(/"SELL YOUR CROP"/g, '"तुमचे पीक विका"');

const newContent = content.replace(
  /\n};\n?$/, 
  `,\n\n  hi: {\n${hiBlock}\n  },\n\n  te: {\n${teBlock}\n  },\n\n  kn: {\n${knBlock}\n  },\n\n  ml: {\n${mlBlock}\n  },\n\n  mr: {\n${mrBlock}\n  }\n};\n`
);

fs.writeFileSync(i18nPath, newContent, 'utf8');
console.log('Appended Indian languages to i18n.js!');
