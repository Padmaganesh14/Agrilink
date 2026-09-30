# 🌾 AgriLink AI
### *Smart Agricultural Market Intelligence*

[![GitHub Repository](https://img.shields.io/badge/GitHub-Padmaganesh14%2FAgrilink-181717?style=flat&logo=github)](https://github.com/Padmaganesh14/Agrilink)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=flat&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?style=flat&logo=express)](https://expressjs.com/)
[![n8n](https://img.shields.io/badge/n8n-Workflow_Automation-EA4B71?style=flat&logo=n8n)](https://n8n.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🚀 Overview

**AgriLink AI** is an end-to-end intelligent agricultural marketplace and market intelligence platform designed to eliminate middleman exploitation for Indian farmers. 

The entire platform is centered around **one dominant, end-to-end mission**:

$$\mathbf{Sell\ My\ Crop}$$

A farmer enters their crop details &rarr; AgriLink AI identifies the highest net-yield mandi using normalized Agmarknet data &rarr; connects verified B2B buyers &rarr; triggers an automated n8n workflow for WhatsApp promotion & buyer outreach &rarr; coordinates instant advance payouts &rarr; tracks live GPS delivery from farm gate to market.

---

## 🏗️ Monorepo Architecture

```
agrilink-monorepo/
├── frontend/                     # React 18 + Vite + Tailwind CSS Client
│   ├── src/
│   │   ├── components/           # Navigation, Hero, Flow Steps, Map, Language Switcher
│   │   ├── context/              # State Management (Crop, Market, Order, Language)
│   │   ├── data/                 # Agmarknet dataset, Tamil translations, mock buyers
│   │   ├── services/             # Centralized Axios API client & fallback engine
│   │   ├── App.jsx               # Main App Shell & Master Journey
│   │   └── main.jsx
│   ├── public/                   # Static assets & icons
│   ├── index.html
│   ├── package.json              # Independent client package
│   ├── vite.config.js            # Port 5173 configuration
│   ├── tailwind.config.js
│   ├── .env.example
│   └── .env
│
├── backend/                      # Node.js + Express API Service
│   ├── src/
│   │   ├── config/               # MongoDB connection (with in-memory fallback)
│   │   ├── controllers/          # Market analysis, promotion, orders, transport, tracking
│   │   ├── middleware/           # Centralized error handler, request logger
│   │   ├── models/               # Mongoose schemas (MarketRecord, Order, Tracking)
│   │   ├── routes/               # Modular Express REST API routes
│   │   ├── services/             # Agmarknet normalization & n8n webhook triggers
│   │   ├── app.js                # Express app setup & CORS configuration
│   │   └── server.js             # Server entry point (Port 8000)
│   ├── Dockerfile                # Container definition
│   ├── package.json              # Independent backend package
│   ├── .env.example
│   └── .env
│
├── n8n-workflows/                # Autonomous Workflow Automation
│   ├── agrilink-master-workflow.json             # Single master continuous Sell My Crop pipeline
│   └── agrilink_market_intelligence_workflow.json # Mandi intelligence workflow
│
├── docker-compose.yml            # Multi-container orchestration (Backend + MongoDB + n8n)
├── package.json                  # Root monorepo workspace runner
├── .gitignore                    # Comprehensive monorepo gitignore
└── README.md                     # Monorepo technical documentation
```

---

## ⚡ The 6-Step "Sell My Crop" Core Flow

```
① CROP INPUT  ➔  ② MARKET MATCH  ➔  ③ BUYER CONNECT  ➔  ④ AI + n8n  ➔  ⑤ ORDER SECURED  ➔  ⑥ LIVE TRACKING
 (Trichy Gate)     (Koyambedu/Mandi)    (Verified B2B)    (Automation)    (WhatsApp / Payout)   (GPS NH45 Route)
```

1. **Crop Selection**: Dynamic searchable combobox supporting any crop (Tomato, Coconut, Banana, Turmeric, etc.) with Tamil Nadu presets.
2. **Mandi Arbitrage Engine**: Compares prices across Trichy, Madurai, Chennai Koyambedu, Coimbatore, and Salem with automatic logistics deduction.
3. **Verified Buyer Matching**: Matched with pre-screened institutional buyers, hypermarkets, and agri-processors.
4. **Autonomous n8n Workflow**: Single continuous webhook pipeline executing mandi filtering, deal packaging, WhatsApp alerts, and logistics coordination.
5. **Contract & Escrow Payout**: Digital invoice generation, WhatsApp payment receipts, and smart settlement.
6. **Real-time GPS Tracking**: Interactive Leaflet OSM map tracking transport along the NH38/NH45 corridor.

---

## 🛠️ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ or v20+
- [Docker & Docker Compose](https://www.docker.com/) (optional, for containerized stack)

### 1. Local Development (Standard)

```bash
# Clone the repository
git clone https://github.com/Padmaganesh14/Agrilink.git
cd Agrilink

# Install all dependencies (Frontend + Backend)
npm run install:all

# Run Frontend (Vite on http://localhost:5173)
npm run dev:frontend

# In a separate terminal, run Backend (Express on http://localhost:8000)
npm run dev:backend
```

### 2. Full Stack with Docker Compose

To run MongoDB, n8n, and the Backend API simultaneously:

```bash
docker-compose up -d
```

- **Backend API**: `http://localhost:8000/api/health`
- **n8n Automation Console**: `http://localhost:5678`
- **MongoDB**: `localhost:27017`

---

## 🌐 Environment Variables Configuration

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/sell-my-crop-master
```

### Backend (`backend/.env`)
```env
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/agrilink
N8N_WEBHOOK_URL=http://localhost:5678/webhook/sell-my-crop-master
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check |
| `POST` | `/api/market/analyze` | Mandi price comparison & logistics arbitrage |
| `POST` | `/api/promotion/broadcast` | Triggers n8n buyer broadcast & WhatsApp alert |
| `POST` | `/api/orders/create` | Creates verified farmer-buyer contract & escrow |
| `GET` | `/api/orders/:id` | Fetches order & escrow status |
| `POST` | `/api/transport/match` | Matches verified logistics partners for corridor |
| `POST` | `/api/tracking/start` | Initiates real-time GPS transit tracking |
| `GET` | `/api/tracking/:id` | Fetches live transit telemetry and checkpoints |

---

## 🚢 Deployment Playbook

- **Frontend**: Deploy `frontend/` folder directly to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/) with build command `npm run build` and output directory `dist`. Set `VITE_API_URL` to your production backend URL.
- **Backend**: Deploy `backend/` folder to [Render](https://render.com/), [Railway](https://railway.app/), or [Fly.io](https://fly.io/) as a Web Service running `npm start`.
- **n8n**: Import `n8n-workflows/agrilink-master-workflow.json` into any hosted n8n instance or Docker container.

---

## 🛡️ Multi-Tier Resilience Guarantee
AgriLink AI includes automated client-side failover:
1. **Tier 1**: Express Backend API (`http://localhost:8000`)
2. **Tier 2**: Direct n8n Webhook (`http://localhost:5678`)
3. **Tier 3**: Local Agmarknet Normalization & Deterministic Simulation Engine

*Even in offline demo environments with zero external network connectivity, all 6 steps execute flawlessly.*
