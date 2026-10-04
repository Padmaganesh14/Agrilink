const fs = require("fs");

let c = fs.readFileSync("x:/Agrilink/frontend/src/data/i18n.js", "utf8");

let s = c.indexOf("en: {");
let e = c.indexOf("  ta: {");

if (s !== -1 && e !== -1) {
  let enBlock = c.substring(s + 5, e).trim();

  // Create hi block
  let hiBlock = enBlock
    .replace(/"SELL YOUR CROP"/g, '"अपनी फसल बेचें"')
    .replace(/"AGRILINK AI"/g, '"एग्रीलिंक AI"');

  // Create te block
  let teBlock = enBlock.replace(/"SELL YOUR CROP"/g, '"మీ పంటను విక్రయించండి"');

  // Find the last occurrence of '}'
  let lastIndex = c.lastIndexOf("};");
  if (lastIndex !== -1) {
    c =
      c.substring(0, lastIndex) + `,\n  hi: ${hiBlock}\n  te: ${teBlock}\n};\n`;
    fs.writeFileSync("x:/Agrilink/frontend/src/data/i18n.js", c);
    console.log("Success appended languages!");
  } else {
    console.log("Failed to find };");
  }
} else {
  console.log("Failed to find boundaries");
}
