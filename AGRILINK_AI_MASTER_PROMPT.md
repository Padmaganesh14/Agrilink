# 🚀 MASTER PROMPT — AGRILINK AI + ONE MASTER n8n WORKFLOW

## Overview

You are a senior full-stack engineer, AI/ML engineer, n8n automation architect, and product designer.

Building: **AGRILINK AI** — SMART AGRICULTURAL MARKET INTELLIGENCE

**Tagline:** "You Grow. We Find the Market."

**Goal:** Create a farmer-first agricultural marketplace connecting:

```
Farmer → Crop Input → AI Market Intelligence → B2B Buyer Matching 
→ AI Crop Promotion → Buyer Order → Payment Coordination 
→ Transport Selection → Delivery Tracking → Settlement
```

---

## 1. PROJECT OBJECTIVE

Build an end-to-end AgriLink AI system where a farmer enters:

- Crop name
- Quantity
- Farm location
- Crop quality/grade
- Expected harvest date
- Optional expected price

The system should intelligently process and provide:

1. Market intelligence
2. Current/observed market price comparison
3. Demand insight
4. Price/demand forecast (where historical data exists)
5. Buyer matching
6. Expected-return calculation
7. AI explanation of recommendation
8. AI-generated crop promotion content
9. Video promotion workflow
10. Instagram/YouTube publishing (Demo Mode if APIs unavailable)
11. Buyer order workflow
12. Temporary WhatsApp payment coordination for MVP
13. Transport matching
14. Route and distance calculation using OpenStreetMap + OSRM
15. Delivery tracking
16. Settlement status
17. Final unified response to frontend

**Critical:** Do not fabricate real-world data. Distinguish between:
- Real API data
- Government/reference data
- Demo data
- AI estimates
- Simulated workflow steps

---

## 2. TECHNOLOGY STACK

**Frontend:**
- React.js
- Tailwind CSS
- JavaScript
- Axios/fetch

**Backend:**
- Node.js
- Express.js
- MongoDB

**AI/ML:**
- Python
- FastAPI
- scikit-learn
- Optional forecasting: Linear Regression, ARIMA, Random Forest

**Automation:**
- n8n (self-hosted in Docker)

**Market Data:**
- Government mandi/reference data
- Agmarknet/data.gov.in
- GitHub mandi CSV dataset for demo

**Media:**
- Cloudinary free tier for demo video hosting

**Maps:**
- OpenStreetMap + OSRM

**Communication:**
- WhatsApp coordination for MVP

**Social Promotion:**
- Instagram Graph API (Demo Mode if unavailable)
- YouTube API (Demo Mode if unavailable)

---

## 3. CORE PRODUCT FLOW

The frontend must show one continuous journey:

```
① CROP
↓
② MARKET
↓
③ BUYER
↓
④ AI + n8n
↓
⑤ ORDER
↓
⑥ LOGISTICS & TRACK
```

The farmer should never feel these are separate applications.

**Demo Navigator:**
```
[DEMO MODE]
① CROP → ② MARKET → ③ BUYER → ④ AI + n8n → ⑤ ORDER → ⑥ TRACK
```

---

## 4. ONE MASTER n8n WORKFLOW

**Create ONLY ONE main n8n workflow.**

DO NOT split Market Intelligence, Buyer Matching, Promotion, Order and Logistics into separate workflows.

**Conceptual Flow:**

```
Webhook
↓
Validate Farmer Input
↓
Normalize Crop Data
↓
Fetch Market Data
↓
Parse Market Dataset
↓
Filter Crop
↓
Filter Location / Relevant Markets
↓
Normalize Prices
↓
Market Price Analysis
↓
Demand Analysis
↓
Price/Demand Forecast
↓
Buyer Matching
↓
Transport Estimation
↓
Expected Return Calculation
↓
Opportunity Scoring
↓
AI Explanation
↓
AI Promotion Content
↓
Video Processing
↓
Social Publishing
↓
Order State
↓
Payment Coordination
↓
Transport Matching
↓
OSRM Route Calculation
↓
Logistics Status
↓
Final Unified Response
```

**Every stage must remain inside this ONE n8n workflow.**

---

## 5. WEBHOOK INPUT

**Endpoint:** `POST /webhook/agrilink`

**Frontend sends:**
```json
{
  "action": "analyze_crop",
  "farmerId": "FARMER001",
  "crop": "Tomato",
  "quantityKg": 2000,
  "location": "Trichy",
  "state": "Tamil Nadu",
  "quality": "Grade A",
  "harvestDate": "2026-10-05",
  "expectedPricePerKg": 28
}
```

**Crop field must accept ANY crop:**
- Tomato, Banana, Coconut, Cotton, Sugarcane, Groundnut, Chilli, Potato, Carrot, Brinjal, Mango, etc.

**If crop not in dataset:**
```json
{
  "success": false,
  "error": "Market data unavailable for this crop in the current dataset."
}
```

---

## 6. INPUT VALIDATION

Validate:
- crop exists
- quantityKg > 0
- location exists
- state exists
- quality optional
- harvestDate optional
- expectedPrice optional

**Error response:**
```json
{
  "success": false,
  "error": "Quantity must be greater than zero"
}
```

---

## 7. MARKET DATA

**Preferred source:**
- Government/reference mandi data from Agmarknet, data.gov.in
- Downloaded/local CSV or GitHub-hosted CSV for reliable demo

**Expected CSV fields:**
```
date, state, district, market, commodity, variety, grade, 
min_price, max_price, modal_price
```

Prices typically in ₹/quintal.

**Normalization:**
```
pricePerKg = modal_price / 100
```

**Never call agricultural market prices "MRP".**

Use:
- Market Price
- Modal Price
- Minimum Price
- Maximum Price

---

## 8. MARKET ANALYSIS

For requested crop:

1. Find matching records
2. Normalize commodity names
3. Filter relevant state/district
4. Identify available markets
5. Calculate:
   - Minimum price
   - Maximum price
   - Modal price
   - Average observed price
   - Price difference between markets

**Example response:**
```json
{
  "market": "Example Market",
  "modalPricePerKg": 34,
  "minPricePerKg": 30,
  "maxPricePerKg": 38
}
```

**DO NOT invent these numbers.**

---

## 9. MARKET OPPORTUNITY

DO NOT simply choose the market with highest price.

**Consider:**
- Observed market price
- Distance
- Estimated transportation cost
- Buyer availability
- Quantity match
- Demand
- Expected return

**Calculate:**
```
Gross Revenue = marketPricePerKg × quantityKg

Estimated Transport Cost = distance × estimated transport rate

Estimated Net Return = Gross Revenue - Transportation Cost 
                       - Loading/Unloading - Other costs
```

**All calculations must be clearly labelled as ESTIMATES.**

---

## 10. DEMAND INTELLIGENCE

Analyze demand using available data.

**Possible signals:**
- Historical market observations
- Buyer requirements
- Quantity requested
- Repeated market demand
- Recent price movement

**Return:** High / Medium / Low

**Important:** Do not claim demand is real-time unless actually connected.

If inferred from historical data:
```
"Demand indication based on available market/buyer data."
```

---

## 11. PRICE / DEMAND FORECASTING

If enough historical data exists:

Use Python/scikit-learn or supported forecasting approach.

**Possible models:**
- Linear Regression
- Random Forest Regression
- ARIMA

**Example output:**
```json
{
  "forecast": {
    "estimatedPricePerKg": 32,
    "trend": "Increasing",
    "basis": "Historical market observations"
  }
}
```

**Important:**
- Never present forecast as guaranteed
- Always display: "AI forecast — estimate, not a guaranteed market price."
- If insufficient historical data: `forecastAvailable = false`
- Do not fabricate a forecast

---

## 12. BUYER MATCHING

Create buyer matching inside the SAME n8n workflow.

**Buyer fields:**
```
buyerId, buyerName, location, requiredCrop, requiredQuantityKg, 
qualityRequired, offerPrice, status
```

**Match based on:**
1. Crop
2. Quantity
3. Quality
4. Location
5. Offer price
6. Buyer availability

**Example:**
```json
{
  "buyer": "Example B2B Buyer",
  "matchScore": 91,
  "quantityMatch": true,
  "qualityMatch": true
}
```

**Note:** Use "Demo Buyer" for demo data. Do not call unverified buyers "verified."

---

## 13. EXPECTED RETURN ANALYSIS

For each promising market/buyer combination:

```
Expected Revenue
- Estimated Transport
- Other known costs
= Estimated Net Return

Also: Estimated Net Return Per Kg
```

**Example:**
```json
{
  "expectedRevenue": 68000,
  "estimatedTransportCost": 3600,
  "estimatedNetReturn": 64400
}
```

**Numbers must be calculated from actual workflow input/data.**

---

## 14. OPPORTUNITY SCORE

Create an explainable opportunity score.

**Name it:** "AgriLink Opportunity Score"

**Weighted factors:**
- Market price
- Buyer match
- Demand indication
- Transport efficiency
- Quantity match
- Expected return

**Return:**
```json
{
  "score": 84,
  "factors": [
    "Higher observed market price",
    "Buyer quantity requirement matches",
    "Transport route available"
  ]
}
```

---

## 15. AI EXPLANATION

Use AI model node/API inside n8n.

**Prompt:**
```
You are AgriLink AI, an agricultural market decision-support assistant.

Explain why the selected market/buyer opportunity is relevant 
using ONLY the supplied structured data.

Mention:
- Observed market price
- Buyer requirement
- Quantity match
- Estimated transport cost
- Estimated net return
- Demand indication

Do not invent facts.
Do not guarantee future prices.
Do not claim a buyer is verified unless verified=true.
Use simple farmer-friendly language.
```

**Return:**
```
whyThisMarket
whyThisBuyer
riskNotes
farmerFriendlyExplanation
```

---

## 16. AI CROP PROMOTION

After market/buyer analysis, generate promotional content.

**Input:**
```
crop, quantity, quality, location, harvest date, 
buyer requirement, market opportunity
```

**Generate:**
1. Instagram caption
2. YouTube title
3. YouTube description
4. Short promotional text
5. Hashtags
6. Tamil caption
7. English caption

**Example:**
```json
{
  "promotion": {
    "instagramCaption": "...",
    "youtubeTitle": "...",
    "youtubeDescription": "...",
    "hashtags": [],
    "tamilCaption": "...",
    "englishCaption": "..."
  }
}
```

**Important:** DO NOT claim organic, pesticide-free, certified, guaranteed price, or guaranteed quality unless explicitly supplied.

---

## 17. VIDEO UPLOAD

Farmer must be able to upload ANY crop promotion video.

**Frontend:**
```
[ Upload Crop Video ]
```

**Accept:** .mp4, .webm, .mov (reasonable demo file size)

Send binary to n8n.

---

## 18. CLOUDINARY

Upload video to Cloudinary for public HTTPS URL.

**Workflow:**
```
Video Binary
↓
Cloudinary
↓
Public HTTPS URL
↓
Social API
```

**Never expose Cloudinary secrets in React.**

Store credentials securely in n8n.

**On failure:**
```json
{
  "success": false,
  "stage": "media_upload",
  "message": "Video upload failed"
}
```

---

## 19. INSTAGRAM PROMOTION

If Meta/Instagram API credentials available:

```
Create Reel Media Container
↓
Check Processing Status
↓
Publish Media Container
```

**Return:**
```
instagram.status
instagram.mediaId
instagram.permalink (if available)
```

**Important:** Never fake successful publishing.

**If API unavailable:**
```json
{
  "status": "demo",
  "message": "Instagram publishing is configured for Demo Mode."
}
```

Frontend shows: 🟡 **Instagram Publishing — Demo Mode**

---

## 20. YOUTUBE PROMOTION

If YouTube API credentials configured:

Upload video using:
- AI-generated title
- AI-generated description
- AI-generated tags

**If not configured:**

```
YouTube Publishing — Demo Mode
```

Do not fabricate YouTube URL.

---

## 21. SOCIAL MEDIA RESULT

**Return:**
```json
{
  "promotion": {
    "videoUploaded": true,
    "instagram": {
      "status": "published"
    },
    "youtube": {
      "status": "demo"
    }
  }
}
```

Frontend displays actual status.

---

## 22. ORDER WORKFLOW

When buyer accepts:

**Order fields:**
```
orderId, farmerId, buyerId, crop, quantityKg, 
agreedPrice, estimatedValue, status
```

**Initial status:** `ORDER_PLACED` → `BUYER_CONFIRMED`

---

## 23. PAYMENT

**MVP:** WhatsApp payment coordination.

DO NOT pretend live in-app payment exists unless configured.

**Display:**
```
"Payment coordination through WhatsApp"
```

---

## 24. TRANSPORT MATCHING

After order confirmation, show demo transport partners.

**Transport fields:**
```
partnerId, partnerName, vehicleType, capacityKg, route, 
estimatedCost, estimatedETA, status
```

**Example:**
```
Demo Transport Partner
Tamil Nadu Agro Logistics
14 FT Cargo
Capacity: 2500 KG
Route: Trichy → Chennai
Estimated Cost: ₹3600
```

**Important:** Label demo data clearly. Do not claim company/vehicle availability unless real data connected.

---

## 25. ROUTE CALCULATION

Use OpenStreetMap + OSRM.

**Calculate:**
- Distance
- Estimated travel time
- Route

**Important:** OSRM calculates route/distance. Transport company data comes from database/demo.

---

## 26. LOGISTICS TRACKING

**Timeline:**
```
1. Order Placed
2. Buyer Confirmed
3. Payment Coordination
4. Logistics Assigned
5. In Transit
6. Delivered
7. Settlement
```

Frontend shows unified timeline.

---

## 27. SINGLE RESPONSE OBJECT

End of ONE n8n workflow returns:

```json
{
  "success": true,
  "farmer": {},
  "crop": {},
  "marketIntelligence": {
    "markets": [],
    "recommendedMarket": {},
    "demand": {},
    "forecast": {},
    "opportunityScore": {}
  },
  "buyerMatching": {
    "matches": []
  },
  "expectedReturn": {},
  "aiExplanation": {},
  "promotion": {
    "caption": {},
    "video": {},
    "instagram": {},
    "youtube": {}
  },
  "order": {},
  "payment": {},
  "transport": {},
  "logistics": {},
  "tracking": {}
}
```

---

## 28. FRONTEND UX

### STEP 1: WHAT ARE YOU SELLING TODAY?

```
[ Search or enter any crop ]

Examples:
Tomato, Banana, Coconut, Cotton, Sugarcane, Groundnut

Fields:
- Crop Name
- Quantity KG
- Farm Location
- Quality / Grade
- Expected Harvest Date
- Expected Price

Button: [FIND MARKET →]
```

### STEP 2: AI MARKET INTELLIGENCE

```
Show:
- Crop
- Quantity
- Location

Market comparison cards:
- Market
- Modal Price
- Min
- Max
- Demand indication
- Estimated transport
- Estimated net advantage

WHY THIS MARKET?
Show AI explanation.

Button: [FIND BUYERS →]
```

### STEP 3: B2B BUYER MATCHING

```
Show:
- Buyer
- Required Quantity
- Quality
- Offer
- Match Score

Button: [SELECT BUYER & PROMOTE →]
```

### STEP 4: AI + n8n PROMOTION

```
Show:
- AI-generated caption
- Tamil caption
- YouTube title
- Hashtags

[UPLOAD CROP VIDEO]

Button: [🚀 PROMOTE MY CROP]

On click:
React → n8n Webhook → media upload → AI content 
→ social publishing → response

Visual automation animation showing:
AgriLink
↓
AI Content
↓
n8n
↓
Cloudinary
↓
Instagram
↓
YouTube
↓
Success
```

### STEP 5: BUYER ORDER

```
Show:
- Crop
- Quantity
- Agreed Price
- Order Value

Payment: WhatsApp Coordination

Button: [CONFIRM & TRACK LOGISTICS →]
```

### STEP 6: LOGISTICS & TRACKING

```
Show:
- Transport partner
- Vehicle
- Cost
- Route
- Distance
- ETA

Map: OpenStreetMap + OSRM

Timeline:
Order
→ Buyer Confirmed
→ Payment
→ Transport
→ In Transit
→ Delivered
→ Settlement
```

---

## 29. TAMIL LANGUAGE SUPPORT

When Tamil mode selected, all farmer-facing UI must be Tamil.

**Examples:**
```
Crop Details → பயிர் விவரங்கள்
Crop Name → பயிரின் பெயர்
Quantity → அளவு
Farm Location → பண்ணை அமைந்துள்ள இடம்
Quality → தரம்
Expected Harvest Date → எதிர்பார்க்கப்படும் அறுவடை தேதி
Expected Price → எதிர்பார்க்கப்படும் விலை
Market Intelligence → சந்தை நுண்ணறிவு
Find Market → சந்தையைக் கண்டறி
Find Buyers → வாங்குபவர்களைக் கண்டறி
Promote My Crop → எனது பயிரை விளம்பரப்படுத்து
Order → ஆர்டர்
Transport → போக்குவரத்து
Track Delivery → விநியோகத்தைக் காணக்கணி
```

**Important:** Keep internal identifiers in English.

```json
{
  "crop": "Tomato",
  "displayTamil": "தக்காளி"
}
```

---

## 30. DEMO MODE

Create DEMO MODE for reliability during judging.

Use clearly labelled demo data where real APIs unavailable.

**Badges:**
```
LIVE
GOVERNMENT DATA
DEMO DATA
AI ESTIMATE
API NOT CONFIGURED
```

Never silently present demo data as live.

---

## 31. ERROR HANDLING

Every stage must handle failures:
- Market API unavailable
- CSV unavailable
- Unknown crop
- No market records
- AI API unavailable
- Cloudinary upload failed
- Instagram API unavailable
- YouTube API unavailable
- OSRM unavailable
- MongoDB unavailable

**Workflow must continue gracefully.**

Example:
- Instagram unavailable ≠ destroy market intelligence

**Return:**
```
market intelligence = success
buyer matching = success
promotion generation = success
Instagram = demo/unavailable
```

---

## 32. SECURITY

**Never expose:**
- Meta access tokens
- Instagram secrets
- YouTube credentials
- Cloudinary API secrets
- AI API keys
- MongoDB credentials

**Store in:**
- n8n Credentials
- Environment variables
- Backend environment configuration

Never hardcode secrets into React.

---

## 33. DATABASE

Use MongoDB for:
- Farmers
- Buyers
- Crops
- Orders
- Transport Partners
- Promotion Logs
- Tracking
- Market analysis history

**Collections:**
```
farmers
buyers
crops
orders
transportPartners
promotions
trackingEvents
marketAnalysis
```

---

## 34. API DESIGN

**Backend endpoints:**
```
POST /api/market/analyze
POST /api/buyers/match
POST /api/promotion/create
POST /api/promotion/upload
POST /api/order/create
POST /api/transport/match
POST /api/tracking/start
GET /api/order/:id
GET /api/tracking/:id
```

**Flow:**
```
React → Node/Express → n8n Webhook → MASTER WORKFLOW 
→ Node/Express → React
```

Do not put secret API keys in frontend.

---

## 35. N8N WEBHOOK INTEGRATION

**Recommended architecture:**
```
React
↓
Node/Express
↓
n8n Webhook
↓
MASTER WORKFLOW
↓
Node/Express
↓
React
```

For MVP, React may call n8n webhook through backend.

**Prefer backend → n8n for production security.**

---

## 36. N8N VISUAL DESIGN

Organize workflow horizontally. Use groups/colors if supported.

**DO NOT create separate workflows.**

**Suggested labels:**
```
INPUT
MARKET INTELLIGENCE
AI ANALYSIS
BUYER MATCHING
PROMOTION
ORDER
LOGISTICS
RESPONSE
```

**Main visual:**
```
WEBHOOK
→ VALIDATE
→ MARKET DATA
→ MARKET ANALYSIS
→ FORECAST
→ BUYER MATCH
→ TRANSPORT
→ RETURN ANALYSIS
→ AI EXPLANATION
→ AI PROMOTION
→ VIDEO
→ INSTAGRAM
→ YOUTUBE
→ ORDER
→ PAYMENT
→ LOGISTICS
→ OSRM
→ TRACKING
→ RESPONSE
```

---

## 37. AI AGENT RULES

AI acts as decision-support assistant.

**AI must:**
- Use supplied data
- Explain recommendations
- Generate promotional content
- Support Tamil
- Avoid fabricated prices
- Avoid fabricated buyers
- Avoid fabricated transporters
- Avoid guaranteed predictions
- Clearly identify estimates

**AI must NOT:**
- Invent government data
- Invent API responses
- Claim social media publication without API success
- Claim payments completed without confirmation
- Claim transport assigned without assignment
- Claim delivery completed without tracking event
- Guarantee market prices

---

## 38. JUDGE-FRIENDLY EXPLANATION

**"What is n8n doing?"**

"n8n is our orchestration layer. It connects the farmer's request to market data, AI analysis, buyer matching, crop promotion, social publishing, order processing and logistics services through one automated workflow."

**"Is n8n the AI?"**

"No. n8n is the automation and orchestration layer. AI/ML models provide forecasting, matching insights, explanations and promotional content, while n8n connects those capabilities into one end-to-end workflow."

**"Can this work for any crop?"**

"Yes. The crop input is dynamic. The system is not restricted to predefined crops. If the requested crop exists in the connected market dataset, the workflow analyzes it. If data unavailable, the system explicitly reports that instead of fabricating."

**"Is Instagram actually live?"**

Answer honestly based on API configuration.

If configured: "Yes, the workflow publishes through the Instagram API."

If not: "The automation is implemented in Demo Mode because production social publishing requires the appropriate Meta API permissions and credentials."

---

## 39. FINAL REQUIREMENT

Build this as a REAL working MVP.

**DO NOT create fake buttons that do nothing.**

Every available feature should either:
1. **Actually work**, OR
2. **Clearly display Demo Mode / API Not Configured**

Do not remove existing AgriLink features.

Do not redesign into completely different product.

Preserve farmer-first concept.

Preserve continuous flow:
```
CROP → MARKET → BUYER → AI + n8n → ORDER → LOGISTICS → SETTLEMENT
```

**Most importantly: ONE MASTER n8n WORKFLOW.**

Do not create separate n8n workflows for each feature.

---

## 40. IMPLEMENTATION STRATEGY

**Before making changes:**
1. Identify frontend
2. Identify backend
3. Identify existing AI code
4. Identify existing API endpoints
5. Identify existing n8n integration
6. Identify existing database models

**Then:** Implement missing pieces.

**Prefer:** Modify existing code instead of unnecessary rebuild.

---

## 41. STRONGEST DEMO FLOW

```
👨‍🌾 FARMER
    ↓
Add Any Crop
    ↓
🧠 AI MARKET INTELLIGENCE
    ↓
👥 BUYER MATCH
    ↓
🎬 AI PROMOTION
    ↓
⚙️ ONE n8n WORKFLOW
    ↓
┌──────┴──────┐
↓             ↓
Instagram   YouTube
↓             ↓
└──────┬──────┘
       ↓
📦 ORDER
       ↓
💬 PAYMENT
       ↓
🚚 TRANSPORT
       ↓
🗺️ OSRM ROUTE
       ↓
📍 TRACKING
       ↓
💰 SETTLEMENT
```

---

**End of Master Prompt**
