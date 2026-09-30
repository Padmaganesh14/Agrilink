# 🔨 GORDON: BUILD AGRILINK BACKEND NOW

## PRE-BUILD CHECKLIST FOR GORDON

Before you start implementation:

1. ✅ Inspect the existing AgriLink codebase completely
2. ✅ Do not rebuild or replace the existing React frontend
3. ✅ Preserve all existing 6-step UI and Tamil/English functionality
4. ✅ Preserve arbitrary crop support
5. ✅ Preserve the existing market intelligence fallback
6. ✅ Create backend/ as a NEW directory (not modifying src/)
7. ✅ Do not delete databases, Docker volumes, or project files
8. ✅ Do not create multiple n8n workflows
9. ✅ Implement ONE MASTER n8n workflow
10. ✅ Clearly distinguish LIVE, DEMO, and AI ESTIMATE states
11. ✅ Do not fake Instagram, YouTube, payment, buyer, transport, or delivery success
12. ✅ After each major phase, test before moving forward

---

## IMPORTANT: IF YOU ASK FOR PERMISSION

🛑 **STOP YOUR BUILD AND ASK THE USER FIRST** before doing any of these:

- Delete files or directories
- Drop databases or reset MongoDB
- Remove Docker volumes
- Overwrite existing files in src/
- Reset or prune the project state
- Make destructive changes

**The user will send a screenshot. Wait for approval before proceeding.**

---

## NOW READ THIS ENTIRE PROMPT AND BUILD IT

Use the implementation guide from **GORDON_BUILD_PROMPT.md**.

It has all the code for every file you need to create.

Follow these phases exactly:

**PHASE 1-2:** Backend Foundation  
**PHASE 3-9:** Core Logic & Models  
**PHASE 10-11:** Routes & Server  
**PHASE 12-13:** Docker & Integration  
**PHASE 14+:** Testing  

---

## HERE IS YOUR IMPLEMENTATION GUIDE

[BEGIN PASTING GORDON_BUILD_PROMPT.md CONTENT BELOW]

---

Insert full GORDON_BUILD_PROMPT.md here

---

## AFTER BUILD: CRITICAL TEST

Before the user does any demo, verify this exact 14-step chain works:

1. **Tomato** → Input crop name
2. **2000 KG** → Input quantity
3. **Trichy** → Input location
4. **Grade A** → Input quality
5. **Market Intelligence** → Backend responds with 4 markets
6. **Buyer Match** → Shows 2-3 matched buyers
7. **AI Explanation** → Generated explanation appears
8. **Upload Video** → Can upload any .mp4 file
9. **PROMOTE MY CROP** → Calls n8n workflow
10. **Promotion Result** → Instagram/YouTube show Live or Demo (honest labels)
11. **Order** → Creates order with unique ID (e.g., AG1024)
12. **Transport** → Shows demo transport partners
13. **Map** → Displays Leaflet route from Trichy to Chennai
14. **Tracking** → Shows 7-stage timeline (Order → Buyer Confirmed → Payment → Logistics → In Transit → Delivered → Settlement)

**If all 14 steps work:** Report "✅ BUILD SUCCESSFUL — MVP IS EXPO-READY"

---

## WHEN YOU FINISH

Report:
- Exact files created
- Exact files modified
- Any errors encountered (with solutions)
- Startup command verification
- The 14-step test result (pass/fail)

Then say: "Build complete. User can now start Docker and test the full flow."
