const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('http://localhost:8000')) {
        // We use import.meta.env.VITE_API_URL or fallback
        // But since many URLs are inside quotes like "http://localhost:8000/api/...", we should replace the base URL string.
        // Replace "http://localhost:8000" with (import.meta.env.VITE_API_URL || "http://localhost:8000")
        // But doing it blindly might break template literals.
        // A safer way is to use a global api config!
      }
    }
  }
}
// wait, the app already has src/services/api.js! Let's check it.
