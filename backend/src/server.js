import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 8000;

// Connect Database (with graceful memory fallback)
await connectDB();

app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🌾 AgriLink AI Backend Server listening on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('====================================================');
});
