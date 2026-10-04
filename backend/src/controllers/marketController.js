import { analyzeMarketOpportunity } from "../services/marketService.js";
import { triggerN8nMasterWorkflow } from "../services/n8nService.js";

export async function analyzeMarket(req, res, next) {
  try {
    const { crop, quantity, quantityKg, location, expectedPrice, quality } = req.body;
    const qty = Number(quantityKg || quantity);

    if (!crop || !qty || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: crop, quantityKg, and location are required."
      });
    }

    const payload = {
      crop: crop,
      quantityKg: qty,
      location: location,
      expectedPrice: expectedPrice ? Number(expectedPrice) : null, // AI can handle null or we omit
      quality: quality || "Standard",
    };

    // Attempt n8n master workflow first
    const n8nResult = await triggerN8nMasterWorkflow(payload);
    if (n8nResult && n8nResult.recommendedMarket) {
      return res.json({
        success: true,
        source: "n8n_master_workflow",
        ...n8nResult,
      });
    }

    const aiResult = await analyzeMarketOpportunity(payload);
    res.json({
      success: true,
      source: "gemini_ai_engine",
      ...aiResult,
    });
  } catch (err) {
    console.warn("Market analysis failed:", err.message);
    res.json({
      success: false,
      message: err.message || "AI engine failed to analyze market",
    });
  }
}
