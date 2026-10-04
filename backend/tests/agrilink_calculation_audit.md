# Agrilink Calculation Audit & Math Correctness Report

## 1. Audit Scope & Changes Made

### 1.1 Market Service (`marketService.js`)
**Issue:** Allowed Gemini LLM to hallucinate calculations for market advantage and opportunity which broke mathematical correctness.
**Fix:** The backend now intercepts the LLM response and strictly recalculates:
- `modalPriceQuintal = modalPricePerKg * 100`
- `netAdvantagePerKg = (modalPricePerKg - localModalPricePerKg) - estimatedTransportPerKg`
- `totalOpportunity = netAdvantagePerKg * quantityKg`
- `estimatedCost = ratePerKg * quantityKg` (for transport)
This algebraically guarantees perfect consistency.

### 1.2 Transport Selection & Cost (`transportController.js`)
**Issue:** Hardcoded default distance to `330km` and estimated `6` hours for transit, breaking ETA and cost metrics.
**Fix:** Integrated `axios` and `https://nominatim.openstreetmap.org/search` along with OSRM `router.project-osrm.org` to:
- Geocode string origins and destinations.
- Fetch real road-route driving distance and duration.
- Cost formula strictly computed as `Math.round(baseRateKm * actualDistanceKm)`.
- If tracking service is unavailable, it fails gracefully (`503`) rather than displaying fabricated GPS points or values.

### 1.3 Order Totals & Stock Deduction (`orderController.js` & `Step4PromotionN8N.jsx`)
**Issue:** Stock wasn't being correctly reduced during order creation; total values weren't fully verified.
**Fix:**
- Updated frontend to persist the generated `crop.id` in `Step1AddCrop.jsx` and pass it down the flow.
- Added strict atomic reduction logic in `/api/order/create` that ensures `quantityAvailable` is reduced precisely by the ordered quantity, setting status to `sold` if inventory hits 0.
- Order `totalValue` is computed centrally as `Math.round(qty * rate)`.

### 1.4 Dashboard Aggregations (`CommandCenterDashboard.jsx` & `statsRoutes.js`)
**Issue:** The Farmer's Dashboard visually hallucinated hardcoded values like `12 Buyers`, `03 Orders`, and `01 Active Delivery`.
**Fix:** 
- Created a new strictly verified `/api/stats/farmer/:id` endpoint.
- Now queries Supabase using `.select('*', { count: 'exact', head: true })` for orders, buyers, and active trackings.
- The UI binds to `stats.buyers`, `stats.orders`, and `stats.activeDeliveries`.

## 2. Mandatory Tests Run & Passed
Created a `backend/tests/calculation_tests.js` suite enforcing the following:
1. **Order Math**: Verified `qty * rate` combinations handles rounding issues securely.
2. **Market Advantage**: Ensured the net profit opportunity perfectly reflects gross differential minus freight costs.
3. **Unit Conversions**: Validated ton/kg/quintal unit parity and algebraic sanity.
4. **Transport Cost**: Ensured the `baseRate * distance` matches precise integers.

**Test Run Output:**
```
Testing Order Calculations...
Order Calculations OK
Testing Market Advantage...
Market Advantage OK
Testing Unit Conversions...
Unit Conversions OK
Testing Transport Cost...
Transport Cost OK
All calculation tests passed successfully.
```

## 3. Completion Checklist
- [x] Searched entire codebase for math operations.
- [x] Documented formula enforcement (above).
- [x] Verified consistent logic across UI and API.
- [x] Automated tests ran natively in node.
- [x] Confirmed invalid or offline routing returns strict `503 Unavailable` instead of falling back to fake 330km/6h.
