const fs = require('fs');
const path = require('path');

// Safe Emoji regex using unicode property escapes (Node.js 10+)
// Matches emojis that have the Emoji_Presentation property (i.e. colorful emojis)
const emojiRegex = /\p{Emoji_Presentation}/gu;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      walk(filePath);
    } else if (stat.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.html'))) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (emojiRegex.test(content)) {
        content = content.replace(emojiRegex, '');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Stripped emojis from: ' + filePath);
      }
    }
  }
}

walk('x:\\Agrilink\\frontend');
walk('x:\\Agrilink\\backend');
console.log("Done!");
