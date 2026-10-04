import { GoogleGenAI } from "@google/genai";
import { supabase } from "../config/supabase.js";

export async function analyzeMarketOpportunity({
  crop = "Tomato",
  quantityKg = 2000,
  location = "Trichy",
  expectedPrice = 28,
  quality = "Grade A",
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Please configure it to enable the AI Market Intelligence engine.",
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const { data: realBuyers } = await supabase
    .from("buyer_profiles")
    .select("*, users!inner(name, mobile)");

  const prompt = `
You are an expert Agricultural Market Intelligence AI for India.
A farmer in ${location} wants to sell ${quantityKg} KG of ${crop} (Quality: ${quality}), expecting ₹${expectedPrice}/KG.

Your task: return a comprehensive JSON analysis with REAL current market data for Indian APMC wholesale mandis.

Instructions:
1. mandis: Return 6 to 8 nearby APMC mandis relevant to the farmer's location (${location}) across the state. Include the local mandi as first entry (isLocal: true). Each mandi must have realistic current modal prices for ${crop}.
2. bestMarket: The single best mandi for maximum net advantage after transport cost.
3. buyers: Return a subset of the realistic B2B buyers provided below who are a good match for ${crop}.
   IMPORTANT: You MUST ONLY select buyers from the list of real buyers provided below. Do not invent buyers.
   For each selected buyer, populate 'id' with their 'id', 'name' with their 'users.name', 'targetPrice' with their 'targetPricePerKg', and 'requirementQty' with their 'maxVolumeKg'. Generate matchHighlights based on the crop and location.
4. transport: Estimated logistics from ${location} to the best market.
5. aiInsight: Clear, factual summary with at least 4 bullet reasons why that market is best.

REAL BUYERS IN THE SYSTEM:
${JSON.stringify(realBuyers || [], null, 2)}

IMPORTANT:
- All prices must be REALISTIC current Indian market prices for ${crop} in ₹/KG.
- Mandi prices must reflect actual seasonal variation.
- bestMarket.location must be the actual city name only.
- Return ONLY the JSON object. No markdown, no explanation.
`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      crop: { type: "STRING" },
      quantityKg: { type: "INTEGER" },
      farmerLocation: { type: "STRING" },
      farmerExpectedPrice: { type: "NUMBER" },
      mandis: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            market: { type: "STRING" },
            city: { type: "STRING" },
            shortName: { type: "STRING" },
            distanceKm: { type: "NUMBER" },
            modalPricePerKg: { type: "NUMBER" },
            modalPriceQuintal: { type: "NUMBER" },
            minPricePerKg: { type: "NUMBER" },
            maxPricePerKg: { type: "NUMBER" },
            demand: { type: "STRING" },
            transportPerKg: { type: "NUMBER" },
            netAdvantagePerKg: { type: "NUMBER" },
            isLocal: { type: "BOOLEAN" },
            tag: { type: "STRING" },
          },
          required: [
            "market",
            "city",
            "shortName",
            "distanceKm",
            "modalPricePerKg",
            "modalPriceQuintal",
            "demand",
            "transportPerKg",
            "isLocal",
            "tag",
          ],
        },
      },
      bestMarket: {
        type: "OBJECT",
        properties: {
          location: { type: "STRING" },
          marketFullName: { type: "STRING" },
          modalPricePerKg: { type: "NUMBER" },
          modalPriceQuintal: { type: "NUMBER" },
          demand: { type: "STRING" },
          grossDiffPerKg: { type: "NUMBER" },
          estimatedTransportPerKg: { type: "NUMBER" },
          netAdvantagePerKg: { type: "NUMBER" },
          totalOpportunity: { type: "NUMBER" },
          distanceKm: { type: "NUMBER" },
          transitHours: { type: "STRING" },
          transitCorridor: { type: "STRING" },
        },
        required: [
          "location",
          "marketFullName",
          "modalPricePerKg",
          "grossDiffPerKg",
          "estimatedTransportPerKg",
          "netAdvantagePerKg",
          "totalOpportunity",
          "distanceKm",
        ],
      },
      buyers: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING" },
            name: { type: "STRING" },
            businessType: { type: "STRING" },
            location: { type: "STRING" },
            address: { type: "STRING" },
            requirementQty: { type: "NUMBER" },
            targetPrice: { type: "NUMBER" },
            paymentTerms: { type: "STRING" },
            matchHighlights: {
              type: "ARRAY",
              items: { type: "STRING" },
            },
            contactType: { type: "STRING" },
          },
          required: [
            "id",
            "name",
            "businessType",
            "location",
            "requirementQty",
            "targetPrice",
            "paymentTerms",
          ],
        },
      },
      transport: {
        type: "OBJECT",
        properties: {
          partner: { type: "STRING" },
          vehicle: { type: "STRING" },
          estimatedCost: { type: "NUMBER" },
          ratePerKg: { type: "NUMBER" },
          distanceKm: { type: "NUMBER" },
          transitHours: { type: "STRING" },
          corridor: { type: "STRING" },
        },
      },
      aiInsight: {
        type: "OBJECT",
        properties: {
          recommendation: { type: "STRING" },
          summary: { type: "STRING" },
          whyReasons: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
          disclaimer: { type: "STRING" },
        },
      },
    },
    required: [
      "crop",
      "quantityKg",
      "farmerLocation",
      "farmerExpectedPrice",
      "mandis",
      "bestMarket",
      "buyers",
      "transport",
      "aiInsight",
    ],
  };

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.1,
    },
  });

  if (response.text) {
    try {
      const data = JSON.parse(response.text);

      // --- CRITICAL: Enforce Mathematical Correctness ---
      const localMandi =
        data.mandis?.find((m) => m.isLocal) || data.mandis?.[0];

      if (data.mandis) {
        data.mandis.forEach((mandi) => {
          mandi.modalPriceQuintal = mandi.modalPricePerKg * 100;
          // net advantage over local mandi after transport
          mandi.netAdvantagePerKg =
            mandi.modalPricePerKg -
            (localMandi?.modalPricePerKg || mandi.modalPricePerKg) -
            (mandi.transportPerKg || 0);
        });
      }

      if (data.bestMarket) {
        data.bestMarket.modalPriceQuintal =
          data.bestMarket.modalPricePerKg * 100;
        data.bestMarket.grossDiffPerKg =
          data.bestMarket.modalPricePerKg -
          (localMandi?.modalPricePerKg || data.bestMarket.modalPricePerKg);
        data.bestMarket.netAdvantagePerKg =
          data.bestMarket.grossDiffPerKg -
          (data.bestMarket.estimatedTransportPerKg || 0);
        data.bestMarket.totalOpportunity =
          data.bestMarket.netAdvantagePerKg * data.quantityKg;
      }

      if (data.transport) {
        data.transport.estimatedCost =
          data.transport.ratePerKg * data.quantityKg;
      }
      // ------------------------------------------------

      return data;
    } catch (e) {
      console.error("Failed to parse Gemini output:", e);
      throw new Error("AI engine returned malformed JSON");
    }
  } else {
    throw new Error("AI engine failed to generate a response");
  }
}
