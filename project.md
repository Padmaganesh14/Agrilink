# AgriLink — Project Context for Antigravity

> **Project:** AgriLink  
> **Tagline:** Turning Crops into Opportunities  
> **Team:** Coding Crew  
> **Event:** CresIgnite Project Expo 2K26  
> **Theme:** PS14 — Smart Agricultural Market Intelligence

This document explains the AgriLink idea, the problem it addresses, the proposed solution, its workflow, novelty, expected impact, and the technologies described in the project presentation. Use it as the high-level source of truth when helping with the prototype.

---

## 1. Project Overview

**AgriLink is a farmer-first agricultural market intelligence and trade coordination platform.** It aims to help farmers make better-informed selling decisions and connect the steps between understanding the market, finding buyers, placing orders, coordinating payment, arranging transport, and tracking delivery and settlement.

The key idea is not merely to create another crop-listing marketplace. AgriLink aims to connect **market intelligence before selling** with the **trade and logistics process after a buyer is found**.

The platform is designed with small and marginal farmers in mind, including users who may face language, literacy, or digital-adoption barriers.

## 2. Problem Statement

The project identifies these connected problems:

1. **Fragmented market information**  
   Crop prices and demand information are scattered across different sources, making it difficult for farmers to understand market conditions before selling.

2. **Buyer discovery gap**  
   Farmers may struggle to find reliable and suitable buyers for their produce.

3. **Disconnected selling process**  
   Orders, payment coordination, and transportation are often handled separately rather than as one connected workflow.

4. **Poor end-to-end visibility**  
   Farmers and buyers may have difficulty tracking order progress, delivery, payment, and final settlement in one place.

5. **Language and literacy barriers**  
   Digital platforms may be difficult for small farmers to use if the interface is not accessible in familiar languages or through voice-based interaction.

6. **Limited crop promotion**  
   Farmers may lack easy ways to create and distribute promotional content to reach potential buyers.

## 3. Proposed Solution

AgriLink proposes one connected workflow with the following modules.

### 3.1 Farmer Registration and Crop Input

Farmers enter the platform, provide crop details, and specify relevant information about the produce. Crop information becomes an input to the market-intelligence and buyer-matching processes.

### 3.2 AI Market Intelligence

The AgriLink AI Engine uses crop information and available market data to provide:

- Market price insights.
- Price and demand forecasts.
- Expected-return estimates.
- Information intended to help farmers decide when and how to sell.

Forecasts and expected returns should be presented as **estimates, not guaranteed prices or outcomes**. The quality of these insights depends on the availability, freshness, and reliability of the underlying data.

The presentation references government agricultural market information such as **Agmarknet** as a basis for market-price inputs, along with forecasting approaches such as time-series forecasting, ARIMA, regression, and machine-learning models.

### 3.3 Smart B2B Buyer Matching

AgriLink aims to connect farmers with suitable business buyers. The system can use available crop details, quantity, buyer requirements, and offer information to support matching and comparison.

The intended benefit is to make buyer discovery easier and help buyers compare available produce and offers in one place.

### 3.4 AI Crop Promotion and Automated Posting

AgriLink proposes generating promotional content for a farmer's crop and automating publication through **n8n workflows**. The presentation mentions social platforms such as Instagram and YouTube, with other platform icons also shown in the materials.

The goal is to improve crop visibility and help farmers reach potential buyers without requiring them to create and post every promotion manually.

### 3.5 Buyer Orders

After a buyer is identified, the platform supports an order flow, including order details and status. The order becomes the central record that connects payment coordination and delivery.

### 3.6 Payment Coordination and Settlement

The presentation describes order/payment coordination and temporary WhatsApp-based payment coordination. It also references payment-gateway technology such as Razorpay in the planned technology material.

**Important distinction:** Do not claim that AgriLink processes or securely holds money unless that is confirmed in the actual implementation. Payment coordination, payment-gateway integration, and settlement tracking are different capabilities.

### 3.7 Logistics, Routing, and Delivery Tracking

AgriLink proposes connecting orders to transport and delivery workflows. The materials reference:

- **OpenStreetMap** for map data.
- **OSRM (Open Source Routing Machine)** for routing and distance calculations.
- Transport matching and delivery-status tracking.

The intended benefit is clearer delivery coordination and better visibility into the journey from order to delivery and settlement.

### 3.8 Unified Tracking

The platform's broader goal is to give users one connected view of the trade lifecycle, including:

- Order status.
- Payment status.
- Transport and route information.
- Delivery status.
- Settlement status.

This unified view is a central part of the AgriLink concept.

### 3.9 Multilingual and Voice Access

The presentation proposes regional-language and voice-based access to make the platform easier to use for farmers who may have limited digital literacy or prefer interacting in a familiar language.

Treat this as a design goal unless the prototype's supported languages and voice capabilities have been verified.

---

## 4. End-to-End Workflow

The workflow described in the project materials can be summarized as follows:

1. **Farmer opens AgriLink.**
2. **Farmer enters crop details.**
3. Crop details are combined with processed crop data and market information.
4. The **AgriLink AI Engine** generates market and demand insights.
5. The platform supports three connected paths:
   - **Market and demand intelligence:** price/demand insights and expected-return estimates.
   - **B2B buyer matching:** identify suitable buyers and compare offers.
   - **Crop promotion:** generate promotional content and automate posting.
6. A buyer places or confirms an order.
7. Payment is coordinated.
8. Logistics and delivery are arranged and tracked.
9. Delivery and settlement are confirmed.
10. The platform aims to expose the order-to-settlement progress in one timeline.

The intended user journey is:

**Crop details → Market intelligence → Buyer matching / Crop promotion → Buyer order → Payment coordination → Logistics and delivery → Confirm and settle**

Not every branch must occur in every transaction. For example, promotion may help a farmer reach buyers before an order exists.

## 5. Novelty and Differentiation

AgriLink's proposed differentiation is the **combination** of these capabilities in one farmer-first workflow.

### 5.1 AI Before Selling

Instead of only listing produce for sale, AgriLink aims to provide price and demand insights and expected-return estimates before the farmer chooses how to sell.

### 5.2 Smart Buyer Matching

The platform aims to connect crop supply with B2B buyer requirements and make offers easier to compare.

### 5.3 Automated Crop Promotion

AI-generated promotional content and n8n-based automation aim to help farmers promote produce through social media.

### 5.4 One Connected Trade Workflow

Market insights, buyer matching, orders, payment coordination, logistics, delivery, and settlement are intended to work as connected stages instead of isolated tools.

### 5.5 Unified Order-to-Settlement Tracking

The platform aims to provide visibility across the trade lifecycle rather than stopping at a listing or order confirmation.

### 5.6 Multilingual and Voice-Oriented Accessibility

Regional-language and voice access are intended to make the platform more approachable for small and marginal farmers.

### 5.7 Low-Cost Technology Choices

The presentation references open-source or cost-conscious technologies, including OpenStreetMap, OSRM, and scikit-learn, to support a potentially affordable solution.

**Positioning note:** Avoid claiming that no existing platform offers any of these individual features. The project's materials compare AgriLink with e-NAM, Agmarknet, DeHaat, Ninjacart, and AgroStar, and position AgriLink's differentiation as its farmer-first combination of market intelligence, buyer matching, promotion, trade coordination, logistics, and tracking. Any stronger competitor claim should be independently verified.

## 6. Target Users and Expected Impact

### Farmers

- See price and demand information before selling.
- Discover potentially suitable buyers.
- Compare offers and make better-informed selling decisions.
- Promote their crops more easily.
- Track order, delivery, and settlement progress.
- Access the platform through familiar languages and voice-oriented interactions, where implemented.

### B2B Buyers

- Discover available produce.
- Compare supply and offers.
- Coordinate orders and delivery with better visibility.

### Transporters

- Connect transport availability with real produce loads.
- Support delivery coordination and route planning.
- Potentially reduce unnecessary or empty trips when matching and routing data are available.

### Expected Social Impact

Improved digital access for small and marginal farmers, especially through multilingual and voice-oriented design.

### Expected Economic Impact

Better-informed selling decisions, access to suitable buyers, and clearer order/payment coordination may support better price realization and more transparent transactions. These are intended benefits, not proven results unless measured.

### Expected Environmental Impact

Demand-aware selling may help reduce avoidable post-harvest waste, while route planning and vehicle matching may help reduce unnecessary travel and fuel use. These outcomes depend on real-world adoption and performance.

## 7. Technology and Architecture Referenced in the Presentation

The presentation materials describe the following technical direction. Confirm the current repository and implementation before changing or asserting the stack.

| Layer / purpose | Technologies mentioned |
|---|---|
| User interface | React.js, Tailwind CSS |
| Backend and APIs | Node.js, Express.js; FastAPI is also referenced in the technical references |
| Database | MongoDB |
| AI and machine learning | Python, scikit-learn; forecasting approaches such as ARIMA/regression |
| Market data | Agmarknet and other available market-data inputs |
| Maps and routing | OpenStreetMap, OSRM |
| Workflow automation | n8n |
| Payment-related references | WhatsApp coordination (described as temporary), Razorpay/payment gateway references |
| External integrations | Market-data, mapping, and social-platform integrations as available |

The presentation diagrams show a frontend, backend/API layer, database, AI engine, crop-data processing, knowledge/market data, buyer matching, promotion, order/payment, logistics, and integration/automation workflows.

## 8. Existing Platforms and the Gap Described

The presentation mentions these platforms in its gap analysis:

- **Agmarknet:** Government agricultural market information and commodity prices/arrivals.
- **e-NAM:** Electronic agricultural market/trading platform.
- **DeHaat, Ninjacart, and AgroStar:** Existing agricultural services or supply-chain platforms.

The project's stated gap is the lack of a single farmer-first workflow that brings together AI market insights before selling, buyer matching, crop promotion, order/payment coordination, logistics, and settlement visibility.

This is the project's positioning as described in the presentation, not a complete or independently verified competitor analysis.

## 9. Current Project Status: Treat as Unverified Until Checked

The final presentation states that the following areas have been developed or integrated:

- Farmer and buyer modules.
- AI market-intelligence, price/demand, and buyer-matching features.
- Order flow and temporary WhatsApp payment coordination.
- n8n workflows and AI-powered crop promotion.
- OpenStreetMap/OSRM-based routing and delivery tracking.

These are **claims in the presentation**. Before modifying the project or preparing the expo demo, inspect the actual source code and test each feature. Do not assume every listed module is fully functional or connected end to end.

For the expo prototype, distinguish clearly between:

- **Implemented and working:** demonstrable in the current build.
- **Partially implemented:** some parts work, but the full workflow is incomplete.
- **Simulated/demo data:** displayed for demonstration but not connected to a live service.
- **Planned:** described in the idea or architecture but not implemented.

Never invent working integrations, live data, AI accuracy, payment processing, or tracking capabilities.

## 10. Guidance for Antigravity When Working on This Project

When helping with AgriLink:

1. **Read the existing repository before making assumptions.** Identify the framework, folder structure, routes, components, API endpoints, data models, and existing functionality.
2. **Preserve working code and the current design direction** unless a change is needed or requested.
3. **Prioritize a reliable expo demo.** Prefer a small number of end-to-end flows that work over many unfinished modules.
4. **Keep data flow coherent.** Farmer crop input should connect logically to market insights, buyer matching, orders, and tracking wherever those features are implemented.
5. **Be transparent about data.** Label mock/sample data clearly. Do not present sample prices, forecasts, buyers, payments, or delivery statuses as live verified information.
6. **Do not fabricate AI.** If a forecast or matching feature uses rules or demo data rather than a trained model, describe it accurately.
7. **Handle integrations honestly.** Do not claim social posts were published, payments completed, or deliveries tracked unless the corresponding integration actually succeeded.
8. **Prefer graceful fallbacks.** If an external API, map service, or automation is unavailable, show a useful error or demo-safe fallback rather than breaking the entire flow.
9. **Avoid unnecessary rewrites.** Make focused changes and verify the application after each meaningful change.
10. **Keep farmer usability central.** Use clear labels, simple flows, accessible layouts, and multilingual/voice support only to the extent actually implemented.
11. **Keep security in mind.** Never expose API keys or secrets in frontend code or commit them to source control.
12. **For expo preparation, optimize for demonstration reliability.** Ensure the app can be started predictably, use prepared demo accounts/data where appropriate, and provide a repeatable path through the core workflow.

## 11. Suggested Core Demo Story

Use this as a possible demo narrative, adapting it to what the current prototype truly supports:

1. A farmer enters details for a crop and its quantity.
2. AgriLink displays available market information and any implemented price/demand insight.
3. The farmer views suitable buyer matches or compares offers.
4. The farmer can generate or view crop-promotion content, if this feature is functional.
5. A buyer order is created or selected.
6. Payment coordination and delivery status are shown using the actual implemented behavior.
7. The user views the order's progress through delivery and settlement.

A successful demo should make the value obvious: **AgriLink helps a farmer make a more informed selling decision and connects that decision to buyer discovery and the subsequent trade process.**

## 12. One-Sentence Summary

**AgriLink is a farmer-first agricultural market intelligence and trade coordination platform that combines AI-based price/demand insights, B2B buyer matching, automated crop promotion, order/payment coordination, logistics, and order-to-settlement visibility in one connected workflow.**

---

## Source Basis

This document is based on the team's uploaded project materials:

- `CresIgnite_Project_Expo_final.pptx` — primary project description, proposed solution, project status, novelty, expected impact, and references.
- `WORKFLOW_AGRILINK.pptx` — workflow diagram from farmer crop input through the AI engine, market intelligence, buyer matching, crop promotion, orders, payments, logistics, and settlement.
- `Agrilink_ppt_ver1.pptx` — earlier deck with problem statement, proposed solution, expected outcomes, novelty, and competitor positioning.

Where the slides describe planned technologies or claimed implementation status, this document preserves that distinction and does not treat those claims as independently verified facts.
