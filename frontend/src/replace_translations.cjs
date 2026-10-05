const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, files);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      files.push(filePath);
    }
  }
  return files;
}

const files = walk('x:/Agrilink/frontend/src');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Pattern 1: {lang === "ta" ? "Tamil" : "English"}
  // We want to replace it with "English" or just the english part.
  // Because Prettier might have broken them to multiple lines, let's use a simpler approach.
  
  // Actually, we can use a regex that captures the string after the colon.
  // Match `lang === "ta" ? "tamil" : "english"` or `lang === "ta" ? \n "tamil" \n : \n "english"`
  // Let's use AST transformation or a robust regex.
  // Regex for `lang === "ta"\s*\?\s*("[^"]+"|'[^']+'|`[^`]+`|\w+)\s*:\s*("[^"]+"|'[^']+'|`[^`]+`|[\w.()]+)`
  const simpleTernary = /lang\s*===\s*["']ta["']\s*\?\s*(?:["'][^"']*["']|`[^`]*`)\s*:\s*(["'][^"']*["']|`[^`]*`|[\w.()]+)/g;
  
  content = content.replace(simpleTernary, (match, p1) => {
    return p1; // Replace with just the English string
  });
  
  // Pattern 2: lang === "ta" && activeCrop.tamilName ? activeCrop.tamilName : activeCrop.cropName
  const propTernary = /lang\s*===\s*["']ta["']\s*&&\s*[\w.]+\s*\?\s*[\w.]+\s*:\s*([\w.]+)/g;
  content = content.replace(propTernary, (match, p1) => {
    return p1;
  });

  if (content !== original) {
    console.log(`Updated ${file}`);
    fs.writeFileSync(file, content);
  }
}
