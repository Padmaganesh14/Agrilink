const fs = require('fs');
const files = [
  'x:/Agrilink/frontend/src/context/AgriContext.jsx',
  'x:/Agrilink/frontend/src/components/settings/SettingsView.jsx',
  'x:/Agrilink/frontend/src/components/marketplace/BuyerMarketplaceView.jsx',
  'x:/Agrilink/frontend/src/components/dashboard/CommandCenterDashboard.jsx',
  'x:/Agrilink/frontend/src/components/auth/BuyerLoginView.jsx',
  'x:/Agrilink/frontend/src/components/auth/FarmerLoginView.jsx',
  'x:/Agrilink/frontend/src/components/landing/LandingPage.jsx',
  'x:/Agrilink/frontend/src/components/flow/Step1AddCrop.jsx',
  'x:/Agrilink/frontend/src/components/flow/Step3BuyerMatch.jsx',
  'x:/Agrilink/frontend/src/components/flow/Step6LogisticsTracking.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const PROD_URL = "https://agrilink-backend.onrender.com";
  
  // Replace template literals: `http://localhost:8000/api/...`
  content = content.replace(/`http:\/\/localhost:8000([^`]*)`/g, '`${import.meta.env.VITE_API_URL || "' + PROD_URL + '"}$1`');
  
  // Replace double quote strings: "http://localhost:8000/api/..."
  content = content.replace(/"http:\/\/localhost:8000([^"]*)"/g, '(import.meta.env.VITE_API_URL || "' + PROD_URL + '") + "$1"');

  fs.writeFileSync(file, content);
}
