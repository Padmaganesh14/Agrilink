const BACKEND_API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

/**
 * Fetch market intelligence from the backend (Gemini AI engine).
 * Falls back to the local government dataset engine if backend is unavailable.
 */
export async function fetchMarketIntelligence({
  cropName,
  quantityKg,
  farmLocation,
  expectedPrice,
  quality = "Grade A",
}) {
  const payload = {
    crop: cropName,
    quantity: Number(quantityKg) || 0,
    quantityKg: Number(quantityKg) || 0,
    location: farmLocation || "",
    quality: quality || "Grade A",
    expectedPrice: Number(expectedPrice) || 0,
    timestamp: new Date().toISOString(),
  };

  // Tier 1: Express Backend (Gemini AI Engine)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s for AI

    const backendRes = await fetch(`${BACKEND_API_URL}/api/market/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (backendRes.ok) {
      const data = await backendRes.json();
      if (data.success) {
        return {
          ...data,
          source: "gemini_ai",
        };
      } else {
        throw new Error(data.message || "AI engine failed");
      }
    } else {
      throw new Error(`HTTP ${backendRes.status}`);
    }
  } catch (err) {
    console.warn(
      "Backend AI unreachable, falling back to local dataset:",
      err.message,
    );
  }

  // Tier 2: Local government dataset fallback
  const { calculateMarketIntelligence } =
    await import("../data/governmentMarketData.js");
  const localResult = calculateMarketIntelligence({
    cropName,
    quantityKg,
    farmLocation,
    expectedPrice,
    quality,
  });
  return {
    ...localResult,
    source: "local_agmarknet",
  };
}
