import { analyzeMarketOpportunity } from "../services/marketService.js";
import { triggerN8nMasterWorkflow } from "../services/n8nService.js";

export async function analyzeMarket(req, res, next) {
  try {
    const { crop, quantity, quantityKg, location, expectedPrice, quality } =
      req.body;
    const qty = Number(quantityKg || quantity) || 2000;

    const payload = {
      crop: crop || "Tomato",
      quantityKg: qty,
      location: location || "Trichy",
      expectedPrice: Number(expectedPrice) || 28,
      quality: quality || "Grade A",
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
