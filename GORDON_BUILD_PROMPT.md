# 🔥 GORDON — AGRILINK AI IMPLEMENTATION (SAFE MODE)

## ⚠️ CRITICAL SAFETY INSTRUCTIONS

**BEFORE ANY MODIFICATIONS:**
1. ✅ Check if file exists with `list_directory` or `read_file`
2. ✅ If modifying existing file, READ IT FIRST
3. ✅ Use `edit_file` to change specific sections only
4. ✅ NEVER use `write_file` to overwrite existing files unless explicitly told to
5. ✅ ASK before running: `rm`, `docker volume rm`, `docker system prune`, database drops
6. ✅ Create `/backend` as NEW directory—frontend stays untouched

**PRESERVE AT ALL COSTS:**
- ❌ DO NOT modify `src/App.jsx`, `src/components/`, `src/context/`, `src/data/`, `src/services/`
- ❌ DO NOT delete `package.json` (existing frontend)
- ❌ DO NOT touch `vite.config.js` unless adding proxy (safe edit)
- ❌ DO NOT remove `tailwind.config.js`
- ❌ DO NOT delete `index.html`
- ❌ DO NOT remove `src/index.css`
- ❌ DO NOT touch `n8n-workflows/` unless updating workflow JSON

**SAFE MODIFICATIONS ONLY:**
- ✅ ADD backend/ directory
- ✅ EDIT vite.config.js to add proxy (safe edit_file, not full rewrite)
- ✅ EDIT .gitignore to add backend/.env
- ✅ CREATE backend/.env from .env.example
- ✅ CREATE docker-compose.yml
- ✅ CREATE Dockerfile for backend

---

## WHAT EXISTS (DO NOT REBUILD)

✅ React 18.3 + Vite 6 frontend  
✅ Tailwind CSS + custom agri colors  
✅ 6-step farmer workflow (Crop → Market → Buyer → AI+n8n → Order → Logistics)  
✅ React Context state management  
✅ English + Tamil bilingual UI  
✅ Dynamic arbitrary crop support  
✅ Government mandi CSV data  
✅ Local market intelligence fallback  
✅ Buyer matching logic  
✅ Expected return calculations  
✅ Demo transport partners  
✅ Leaflet map + route visualization  
✅ n8n master workflow JSON skeleton  

**You must preserve ALL of this. Do not remove, replace, or redesign.**

---

## PHASE 1: PRE-BUILD INSPECTION

**FIRST: Understand the existing structure**

Before creating ANY new files:

1. List existing project structure
2. Read key files to understand architecture
3. Identify entry points
4. Identify existing API/service patterns
5. Understand React Context flow

**Then: Create a detailed implementation plan**

**Only after inspection is complete: Begin implementation**

---

## PHASE 2: BACKEND CREATION (NEW DIRECTORY)

Create `/backend/` as a completely separate Node.js application.

This must NOT touch the existing frontend.

Structure:

```
D:\coding crew\
├── src/                    ← EXISTING FRONTEND (DO NOT TOUCH)
├── n8n-workflows/          ← EXISTING (PRESERVE)
├── node_modules/           ← EXISTING FRONTEND (DO NOT TOUCH)
├── package.json            ← EXISTING FRONTEND (DO NOT TOUCH)
├── vite.config.js          ← EXISTING (SAFE TO ADD PROXY)
├── tailwind.config.js      ← EXISTING (DO NOT TOUCH)
├── index.html              ← EXISTING (DO NOT TOUCH)
├── postcss.config.js       ← EXISTING (DO NOT TOUCH)
├── dist/                   ← EXISTING BUILD OUTPUT (DO NOT TOUCH)
│
├── backend/                ← NEW DIRECTORY
│   ├── src/
│   │   ├── server.js
│   │   ├── app.js
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   ├── market.js
│   │   │   ├── promotion.js
│   │   │   ├── order.js
│   │   │   ├── transport.js
│   │   │   └── tracking.js
│   │   ├── controllers/
│   │   │   ├── marketController.js
│   │   │   ├── promotionController.js
│   │   │   ├── orderController.js
│   │   │   ├── transportController.js
│   │   │   └── trackingController.js
│   │   ├── models/
│   │   │   ├── Order.js
│   │   │   ├── Promotion.js
│   │   │   └── TrackingEvent.js
│   │   ├── services/
│   │   │   ├── n8nWebhookService.js
│   │   │   ├── cloudinaryService.js
│   │   │   └── instagramService.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── cors.js
│   │   └── utils/
│   │       └── logger.js
│   ├── .env.example        ← NEW
│   ├── .env                ← NEW (FROM .env.example, not committed)
│   ├── package.json        ← NEW
│   ├── Dockerfile          ← NEW
│   └── .gitignore          ← NEW
│
├── docker-compose.yml      ← NEW (at project root)
└── ...
```

---

## PHASE 3: BACKEND PACKAGE.JSON

**CREATE** `backend/package.json`:

```json
{
  "name": "agrilink-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "echo 'Tests pending'"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "axios": "^1.6.0",
    "cloudinary": "^1.41.0",
    "multer": "^1.4.5-lts.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**THEN:** Run `npm install` in `/backend`

---

## PHASE 4: ENVIRONMENT CONFIGURATION

**CREATE** `backend/.env.example`:

```
# Server
PORT=8000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://mongodb:27017/agrilink

# n8n
N8N_WEBHOOK_URL=http://n8n:5678/webhook/sell-my-crop-master
N8N_MASTER_WORKFLOW_ID=agrilink-master

# Cloudinary (Optional - Demo Mode if missing)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Instagram API (Optional - Demo Mode if missing)
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_BUSINESS_ACCOUNT_ID=

# YouTube API (Optional - Demo Mode if missing)
YOUTUBE_API_KEY=

# AI/LLM (Optional - Fallback to deterministic if missing)
OPENAI_API_KEY=
```

**CREATE** `backend/.env` from `.env.example`:

```
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://mongodb:27017/agrilink
N8N_WEBHOOK_URL=http://n8n:5678/webhook/sell-my-crop-master
N8N_MASTER_WORKFLOW_ID=agrilink-master
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_BUSINESS_ACCOUNT_ID=
YOUTUBE_API_KEY=
OPENAI_API_KEY=
```

**ALSO CREATE** `backend/.gitignore`:

```
node_modules/
.env
*.log
dist/
build/
```

---

## PHASE 5: CONFIG FILES

**CREATE** `backend/src/config/env.js`:

```javascript
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/agrilink'
  },
  n8n: {
    webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/sell-my-crop-master',
    workflowId: process.env.N8N_MASTER_WORKFLOW_ID || 'agrilink-master'
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    isConfigured: !!process.env.CLOUDINARY_CLOUD_NAME
  },
  instagram: {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    businessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID,
    isConfigured: !!process.env.INSTAGRAM_ACCESS_TOKEN
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY,
    isConfigured: !!process.env.YOUTUBE_API_KEY
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    isConfigured: !!process.env.OPENAI_API_KEY
  }
};

export default config;
```

**CREATE** `backend/src/config/database.js`:

```javascript
import mongoose from 'mongoose';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

export async function connectDatabase() {
  try {
    await mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('MongoDB connected:', config.mongodb.uri);
  } catch (err) {
    logger.error('MongoDB connection failed:', err.message);
    logger.warn('Continuing in DEMO MODE without MongoDB persistence');
  }
}

export function getDatabase() {
  return mongoose.connection;
}
```

---

## PHASE 6: UTILITIES & MIDDLEWARE

**CREATE** `backend/src/utils/logger.js`:

```javascript
export const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} ${msg}`),
  error: (msg, err) => console.error(`[ERROR] ${new Date().toISOString()} ${msg}`, err || '')
};
```

**CREATE** `backend/src/middleware/errorHandler.js`:

```javascript
import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    error: err.message,
    timestamp: new Date().toISOString()
  });
};
```

---

## PHASE 7: MODELS

**CREATE** `backend/src/models/Order.js`:

```javascript
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  farmerId: { type: String, required: true },
  buyerId: { type: String, required: true },
  crop: { type: String, required: true },
  tamilCrop: String,
  quantityKg: { type: Number, required: true },
  agreedPrice: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  quality: String,
  market: String,
  estimatedNetReturn: Number,
  status: {
    type: String,
    enum: ['ORDER_PLACED', 'BUYER_CONFIRMED', 'PAYMENT_COORDINATION', 'LOGISTICS_ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'SETTLEMENT'],
    default: 'ORDER_PLACED'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'COORDINATION', 'VERIFIED'],
    default: 'PENDING'
  },
  transport: {
    partnerId: String,
    partnerName: String,
    vehicleType: String,
    estimatedCost: Number,
    eta: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
```

**CREATE** `backend/src/models/Promotion.js`:

```javascript
import mongoose from 'mongoose';

const PromotionSchema = new mongoose.Schema({
  promotionId: { type: String, required: true, unique: true },
  orderId: String,
  crop: String,
  quantity: Number,
  content: {
    instagramCaption: String,
    tamilCaption: String,
    youtubeTitle: String,
    youtubeDescription: String,
    hashtags: [String]
  },
  video: {
    originalName: String,
    size: Number,
    mimeType: String,
    uploadedAt: Date
  },
  cloudinary: {
    publicId: String,
    secureUrl: String,
    uploadStatus: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' }
  },
  instagram: {
    status: { type: String, enum: ['demo', 'published', 'failed', 'not_configured'], default: 'demo' },
    mediaId: String,
    permalink: String
  },
  youtube: {
    status: { type: String, enum: ['demo', 'published', 'failed', 'not_configured'], default: 'demo' },
    videoId: String,
    url: String
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Promotion', PromotionSchema);
```

**CREATE** `backend/src/models/TrackingEvent.js`:

```javascript
import mongoose from 'mongoose';

const TrackingEventSchema = new mongoose.Schema({
  trackingId: { type: String, required: true },
  orderId: { type: String, required: true },
  event: {
    type: String,
    enum: ['ORDER_PLACED', 'BUYER_CONFIRMED', 'PAYMENT_COORDINATION', 'LOGISTICS_ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'SETTLEMENT']
  },
  timestamp: { type: Date, default: Date.now },
  location: String,
  notes: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  }
});

export default mongoose.model('TrackingEvent', TrackingEventSchema);
```

---

## PHASE 8: SERVICES

**CREATE** `backend/src/services/n8nWebhookService.js`:

```javascript
import axios from 'axios';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const n8nWebhookService = {
  callMasterWorkflow: async (payload) => {
    try {
      logger.info(`Calling n8n master workflow at ${config.n8n.webhookUrl}`);

      const response = await axios.post(config.n8n.webhookUrl, payload, {
        timeout: 5000,
        headers: { 'Content-Type': 'application/json' }
      });

      logger.info('n8n workflow completed successfully');
      return {
        ...response.data,
        source: 'n8n_docker_webhook'
      };
    } catch (err) {
      logger.warn(`n8n webhook failed: ${err.message}. Falling back to local engine.`);

      return {
        success: true,
        data: {
          crop: payload.crop,
          location: payload.location,
          quantityKg: payload.quantityKg,
          marketIntelligence: {
            status: 'demo_fallback',
            note: 'n8n unavailable. Using local government data engine.'
          }
        },
        source: 'local_government_agmarknet'
      };
    }
  }
};
```

**CREATE** `backend/src/services/cloudinaryService.js`:

```javascript
import cloudinary from 'cloudinary';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

if (config.cloudinary.isConfigured) {
  cloudinary.v2.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
  });
}

export const cloudinaryService = {
  uploadVideo: async (file) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'video', folder: 'agrilink' },
        (err, result) => {
          if (err) {
            logger.error('Cloudinary upload failed:', err.message);
            reject(err);
          } else {
            logger.info(`Cloudinary upload success: ${result.public_id}`);
            resolve(result);
          }
        }
      );
      stream.end(file.buffer);
    });
  }
};
```

---

## PHASE 9: CONTROLLERS

**CREATE** `backend/src/controllers/marketController.js`:

```javascript
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { n8nWebhookService } from '../services/n8nWebhookService.js';

export const marketController = {
  analyzeMarket: async (req, res) => {
    try {
      const {
        crop,
        quantityKg,
        location,
        quality,
        expectedPrice,
        harvestDate
      } = req.body;

      if (!crop || !quantityKg || quantityKg <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid input: crop and quantityKg required, quantityKg must be > 0'
        });
      }

      logger.info(`Market analysis requested: ${crop}, ${quantityKg}kg, ${location}`);

      const n8nPayload = {
        action: 'analyze_crop',
        crop,
        quantityKg: Number(quantityKg),
        location: location || 'Trichy',
        quality: quality || 'Grade A',
        expectedPrice: expectedPrice ? Number(expectedPrice) : 28,
        harvestDate: harvestDate || '2026-10-05',
        timestamp: new Date().toISOString()
      };

      const n8nResult = await n8nWebhookService.callMasterWorkflow(n8nPayload);

      logger.info(`n8n result source: ${n8nResult.source}`);

      res.json({
        success: true,
        data: n8nResult,
        source: n8nResult.source
      });
    } catch (err) {
      logger.error('Market analysis error:', err.message);
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
};
```

**CREATE** `backend/src/controllers/promotionController.js`:

```javascript
import { v4 as uuid } from 'uuid';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { cloudinaryService } from '../services/cloudinaryService.js';

function generatePromotionalContent({ crop, quantity, location, quality, market, buyer }) {
  return {
    english: {
      instagramCaption: `🌾 Fresh ${crop} from ${location}! 🥕\n\n${quantity}kg of premium ${quality} ${crop} now available.\n\nDirect from farm to your table. 🚚\n\n#AgriLink #FarmFresh #${crop}`,
      youtubeTitle: `Fresh ${crop} Harvest - Premium Quality from ${location}`,
      youtubeDescription: `${quantity}kg of premium quality ${crop} directly from ${location} farms.\n\nQuality: ${quality}\nLocation: ${location}\n\nAgriLink connects farmers to buyers. 🌱`,
      hashtags: ['#AgriLink', '#FarmFresh', `#${crop}`, '#SupportLocal', '#AgricultureAI']
    },
    tamil: {
      instagramCaption: `🌾 தமிழ்நாடு ${crop} விதை 🥕\n\n${quantity}கிலோ ${quality} மேம்பட்ட ${crop}\n\nவயலில் இருந்து நேரடியாக உங்கள் மேசைக்கு! 🚚\n\n#AgriLink #நெல் #${crop}`,
      youtubeTitle: `${location}இலிருந்து தரமான ${crop} சாகம் - AgriLink`,
      youtubeDescription: `${location} விவசாயிகளிடமிருந்து ${quantity}கிலோ தரமான ${crop}`
    }
  };
}

export const promotionController = {
  createPromotion: async (req, res) => {
    try {
      const { crop, quantity, location, quality, market, buyer } = req.body;

      logger.info(`Creating promotion for ${crop}`);

      const content = generatePromotionalContent({
        crop,
        quantity,
        location,
        quality,
        market,
        buyer
      });

      res.json({
        success: true,
        promotionId: uuid(),
        content,
        source: config.openai.isConfigured ? 'ai_generated' : 'deterministic_fallback'
      });
    } catch (err) {
      logger.error('Promotion creation error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  uploadVideo: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No video file provided' });
      }

      logger.info(`Video upload: ${req.file.originalname}, ${req.file.size} bytes`);

      if (config.cloudinary.isConfigured) {
        const cloudinaryResult = await cloudinaryService.uploadVideo(req.file);
        res.json({
          success: true,
          videoId: uuid(),
          videoUrl: cloudinaryResult.secure_url,
          source: 'cloudinary_live'
        });
      } else {
        res.json({
          success: true,
          videoId: uuid(),
          videoUrl: `demo://video/${req.file.originalname}`,
          source: 'demo_mode',
          message: 'Cloudinary not configured. Video upload simulated.'
        });
      }
    } catch (err) {
      logger.error('Video upload error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
```

**CREATE** `backend/src/controllers/orderController.js`:

```javascript
import Order from '../models/Order.js';
import { logger } from '../utils/logger.js';

export const orderController = {
  createOrder: async (req, res) => {
    try {
      const { farmerId, buyerId, crop, quantityKg, agreedPrice, quality, market } = req.body;

      if (!crop || !quantityKg || !agreedPrice) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: crop, quantityKg, agreedPrice'
        });
      }

      const orderId = `AG${Date.now()}`;
      const totalValue = quantityKg * agreedPrice;

      const orderData = {
        orderId,
        farmerId: farmerId || 'FARMER_DEMO',
        buyerId: buyerId || 'BUYER_DEMO',
        crop,
        quantityKg,
        agreedPrice,
        totalValue,
        quality: quality || 'Grade A',
        market,
        status: 'ORDER_PLACED',
        paymentStatus: 'PENDING'
      };

      try {
        const order = new Order(orderData);
        await order.save();
        logger.info(`Order created: ${orderId}`);
      } catch (dbErr) {
        logger.warn('MongoDB save failed, using in-memory demo:', dbErr.message);
      }

      res.json({
        success: true,
        order: orderData,
        paymentCoordinationLink: `whatsapp://send?text=Hello%2C%20I%20would%20like%20to%20coordinate%20payment%20for%20Order%20%23${orderId}`,
        persistence: 'mongodb'
      });
    } catch (err) {
      logger.error('Order creation error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      let order = null;

      try {
        order = await Order.findOne({ orderId });
      } catch (dbErr) {
        logger.warn('MongoDB query failed:', dbErr.message);
      }

      if (order) {
        res.json({ success: true, order });
      } else {
        res.json({
          success: true,
          order: { orderId, status: 'ORDER_PLACED', source: 'demo' }
        });
      }
    } catch (err) {
      logger.error('Get order error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      try {
        const order = await Order.findOneAndUpdate(
          { orderId },
          { status, updatedAt: new Date() },
          { new: true }
        );
        res.json({ success: true, order });
      } catch (dbErr) {
        logger.warn('MongoDB update failed:', dbErr.message);
        res.json({ success: true, order: { orderId, status, source: 'demo' } });
      }
    } catch (err) {
      logger.error('Update order error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
```

**CREATE** `backend/src/controllers/transportController.js`:

```javascript
import { logger } from '../utils/logger.js';

const demoTransportPartners = [
  {
    id: 'transport-tn-agro',
    name: 'Tamil Nadu Agro Logistics',
    vehicle: '14 FT Tata 407',
    capacityKg: 2500,
    route: 'Trichy → Chennai',
    estimatedCost: 3600,
    eta: '~6 Hours',
    status: 'Available'
  },
  {
    id: 'transport-greenroute',
    name: 'GreenRoute Transport',
    vehicle: '17 FT Cargo Eicher',
    capacityKg: 4000,
    route: 'Trichy → Chennai',
    estimatedCost: 4800,
    eta: '~6 Hours',
    status: 'Available'
  },
  {
    id: 'transport-trichy-fresh',
    name: 'Trichy Fresh Cargo',
    vehicle: '14 FT Multi-axle',
    capacityKg: 3000,
    route: 'Trichy → Chennai',
    estimatedCost: 3900,
    eta: '~6 Hours',
    status: 'Available'
  }
];

export const transportController = {
  matchTransport: async (req, res) => {
    try {
      const { quantityKg, location, destination } = req.body;

      logger.info(`Transport matching: ${quantityKg}kg from ${location}`);

      const matched = demoTransportPartners.filter(t => t.capacityKg >= quantityKg);

      res.json({
        success: true,
        partners: matched.length > 0 ? matched : demoTransportPartners,
        source: 'demo_transport_partners'
      });
    } catch (err) {
      logger.error('Transport matching error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
```

**CREATE** `backend/src/controllers/trackingController.js`:

```javascript
import { v4 as uuid } from 'uuid';
import TrackingEvent from '../models/TrackingEvent.js';
import { logger } from '../utils/logger.js';

export const trackingController = {
  startTracking: async (req, res) => {
    try {
      const { orderId, transportId, startLocation, destination } = req.body;

      const trackingId = `TRACK${Date.now()}`;

      const trackingData = {
        trackingId,
        orderId,
        transportId,
        startLocation,
        destination,
        stages: [
          { id: 1, event: 'ORDER_PLACED', timestamp: new Date(), status: 'done' },
          { id: 2, event: 'BUYER_CONFIRMED', timestamp: new Date(), status: 'done' },
          { id: 3, event: 'PAYMENT_COORDINATION', timestamp: new Date(), status: 'done' },
          { id: 4, event: 'LOGISTICS_ASSIGNED', timestamp: new Date(), status: 'current' },
          { id: 5, event: 'IN_TRANSIT', timestamp: null, status: 'pending' },
          { id: 6, event: 'DELIVERED', timestamp: null, status: 'pending' },
          { id: 7, event: 'SETTLEMENT', timestamp: null, status: 'pending' }
        ]
      };

      try {
        const event = new TrackingEvent({
          trackingId,
          orderId,
          event: 'LOGISTICS_ASSIGNED'
        });
        await event.save();
        logger.info(`Tracking started: ${trackingId}`);
      } catch (dbErr) {
        logger.warn('MongoDB save failed:', dbErr.message);
      }

      res.json({
        success: true,
        tracking: trackingData,
        source: 'tracking_initialized'
      });
    } catch (err) {
      logger.error('Tracking start error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getTracking: async (req, res) => {
    try {
      const { trackingId } = req.params;

      try {
        const events = await TrackingEvent.find({ trackingId });
        res.json({ success: true, events });
      } catch (dbErr) {
        logger.warn('MongoDB query failed:', dbErr.message);
        res.json({ success: true, events: [], source: 'demo' });
      }
    } catch (err) {
      logger.error('Get tracking error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
```

---

## PHASE 10: ROUTES

**CREATE** `backend/src/routes/market.js`:

```javascript
import express from 'express';
import { marketController } from '../controllers/marketController.js';

const router = express.Router();

router.post('/analyze', marketController.analyzeMarket);

export default router;
```

**CREATE** `backend/src/routes/promotion.js`:

```javascript
import express from 'express';
import multer from 'multer';
import { promotionController } from '../controllers/promotionController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', promotionController.createPromotion);
router.post('/upload-video', upload.single('video'), promotionController.uploadVideo);

export default router;
```

**CREATE** `backend/src/routes/order.js`:

```javascript
import express from 'express';
import { orderController } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', orderController.createOrder);
router.get('/:orderId', orderController.getOrder);
router.patch('/:orderId/status', orderController.updateOrderStatus);

export default router;
```

**CREATE** `backend/src/routes/transport.js`:

```javascript
import express from 'express';
import { transportController } from '../controllers/transportController.js';

const router = express.Router();

router.post('/match', transportController.matchTransport);

export default router;
```

**CREATE** `backend/src/routes/tracking.js`:

```javascript
import express from 'express';
import { trackingController } from '../controllers/trackingController.js';

const router = express.Router();

router.post('/start', trackingController.startTracking);
router.get('/:trackingId', trackingController.getTracking);

export default router;
```

---

## PHASE 11: EXPRESS APP

**CREATE** `backend/src/app.js`:

```javascript
import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';

import marketRoutes from './routes/market.js';
import promotionRoutes from './routes/promotion.js';
import orderRoutes from './routes/order.js';
import transportRoutes from './routes/transport.js';
import trackingRoutes from './routes/tracking.js';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', '*'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'Backend healthy', timestamp: new Date().toISOString() });
});

app.use('/api/market', marketRoutes);
app.use('/api/promotion', promotionRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/tracking', trackingRoutes);

app.get('/', (req, res) => {
  res.json({
    service: 'AgriLink AI Backend',
    status: 'ready',
    endpoints: [
      'POST /api/market/analyze',
      'POST /api/promotion/create',
      'POST /api/order/create',
      'GET /api/order/:id',
      'POST /api/transport/match',
      'POST /api/tracking/start',
      'GET /api/tracking/:id'
    ]
  });
});

app.use(errorHandler);

export default app;
```

**CREATE** `backend/src/server.js`:

```javascript
import app from './app.js';
import { config } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  try {
    await connectDatabase();
    logger.info('✓ MongoDB connection attempted');

    app.listen(config.port, () => {
      logger.info(`✓ Backend listening on http://localhost:${config.port}`);
      logger.info(`✓ n8n webhook at ${config.n8n.webhookUrl}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
```

---

## PHASE 12: DOCKER

**CREATE** `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
```

**CREATE** `docker-compose.yml` at project root:

```yaml
version: '3.9'

services:
  mongodb:
    image: mongo:7
    container_name: agrilink-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: agrilink
    volumes:
      - mongodb_data:/data/db
    networks:
      - agrilink-network

  n8n:
    image: n8nio/n8n:latest
    container_name: agrilink-n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - NODE_ENV=production
      - WEBHOOK_TUNNEL_URL=http://localhost:5678/
    volumes:
      - n8n_data:/home/node/.n8n
    networks:
      - agrilink-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: agrilink-backend
    ports:
      - "8000:8000"
    environment:
      - PORT=8000
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongodb:27017/agrilink
      - N8N_WEBHOOK_URL=http://n8n:5678/webhook/sell-my-crop-master
    depends_on:
      - mongodb
      - n8n
    networks:
      - agrilink-network
    command: npm run dev

networks:
  agrilink-network:
    driver: bridge

volumes:
  mongodb_data:
  n8n_data:
```

---

## PHASE 13: FRONTEND INTEGRATION (SAFE EDIT)

**EDIT** `vite.config.js` to add proxy (do NOT overwrite entire file):

Find the existing `server` config section and add proxy:

```javascript
server: {
  port: 3000,
  open: true,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true
    }
  }
}
```

**CREATE** `.env` at project root:

```
VITE_BACKEND_URL=http://localhost:8000
```

---

## STARTUP COMMANDS

### Option 1: Terminal by Terminal

```bash
# Terminal 1: Start backend
cd backend
npm install
npm run dev

# Terminal 2: Start frontend (existing)
npm run dev

# Terminal 3: Start Docker (MongoDB + n8n)
docker-compose up
```

### Option 2: All at Once (Development)

```bash
# Start Docker
docker-compose up -d

# Start backend (new terminal)
cd backend && npm install && npm run dev

# Start frontend (new terminal)
npm run dev

# Frontend at: http://localhost:5173
# Backend at: http://localhost:8000
# n8n at: http://localhost:5678
# MongoDB at: mongodb://localhost:27017
```

---

## IMMEDIATE PRIORITIES (BUILD IN THIS ORDER)

### Phase 1-6: Backend Setup
1. Create `/backend` directory structure
2. Install dependencies
3. Create environment config
4. Create utilities & middleware

### Phase 7-9: Core Models & Controllers
5. Create MongoDB models
6. Create service layer
7. Create controllers

### Phase 10-11: Routes & App
8. Create all routes
9. Create Express app
10. Create server entry point

### Phase 12-13: Docker & Frontend
11. Create Dockerfile
12. Create docker-compose.yml
13. Update vite.config.js with proxy
14. Create .env files

### Final: Testing
15. Start Docker
16. Start backend
17. Start frontend
18. Test complete flow

---

## SUCCESS CRITERIA

After implementation:

```
👨‍🌾 Farmer enters ANY crop (e.g., "Carrot", 1500kg)
    ↓
📊 Backend calls n8n (or local fallback)
    ↓
🧠 Market intelligence returned
    ↓
👥 Buyer matching displayed
    ↓
🎬 AI promotion content generated
    ↓
📹 Video upload works
    ↓
📱 Instagram shows "Live" or "Demo Mode"
    ↓
📦 Order created with unique ID
    ↓
🚚 Transport partners shown
    ↓
🗺️ Leaflet map displays route
    ↓
📍 Tracking timeline shown
    ↓
✅ Complete end-to-end flow working
```

---

## SAFETY CHECKS

Before running any destructive command, verify:

1. ✅ Have I read the existing file?
2. ✅ Do I understand what I'm changing?
3. ✅ Am I using `edit_file` not `write_file` for existing files?
4. ✅ Have I asked the user before `rm`, `docker volume rm`, or db drops?
5. ✅ Am I preserving the frontend completely?

---

## BUILD NOW

**DO NOT ANALYZE FURTHER.**

Follow this implementation plan exactly.

Create each file in sequence.

Test after Phase 13.

Report errors immediately.

Do not skip steps.
