import { GoogleGenAI } from '@google/genai';

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
      "GEMINI_API_KEY is not set in the environment variables. Please set it to enable the AI Market Intelligence engine.",
    );
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
  You are an expert Agricultural Market Intelligence AI for India (especially Tamil Nadu).
  A farmer in ${location} is looking to sell ${quantityKg} KG of ${crop} (Quality: ${quality}).
  They are hoping for a price of ₹${expectedPrice} per KG.
  
  Please analyze the current market conditions and return a JSON object with:
  1. recommendedMarket: The best wholesale market (e.g. Chennai Koyambedu) and its current modal price per KG.
  2. marketComparison: An array of 4 different markets comparing prices.
  3. buyer: A realistic B2B buyer in the recommended market who would buy this quantity.
  4. transport: Estimated logistics from ${location} to the recommended market.
  5. aiInsight: Your summary of the opportunity.
  
  Use realistic current market prices for ${crop}. Transport costs should be roughly ₹1.5 to ₹3 per KM per Ton.
  `;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      crop: { type: "STRING" },
      quantityKg: { type: "INTEGER" },
      farmerLocation: { type: "STRING" },
      farmerExpectedPrice: { type: "NUMBER" },
      recommendedMarket: {
        type: "OBJECT",
        properties: {
          market: { type: "STRING" },
          marketFullName: { type: "STRING" },
          modalPricePerKg: { type: "NUMBER" },
          modalPriceQuintal: { type: "NUMBER" },
          demand: { type: "STRING" },
          grossDiffPerKg: { type: "NUMBER" },
          estimatedTransportPerKg: { type: "NUMBER" },
          netAdvantagePerKg: { type: "NUMBER" },
          totalOpportunityAmount: { type: "NUMBER" },
          transitCorridor: { type: "STRING" },
        },
      },
      marketComparison: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            market: { type: "STRING" },
            shortName: { type: "STRING" },
            pricePerKg: { type: "NUMBER" },
            modalPriceQuintal: { type: "NUMBER" },
            note: { type: "STRING" },
            isLocal: { type: "BOOLEAN" },
          },
        },
      },
      buyer: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          name: { type: "STRING" },
          requiredQuantityKg: { type: "NUMBER" },
          targetPrice: { type: "NUMBER" },
        },
      },
      transport: {
        type: "OBJECT",
        properties: {
          partner: { type: "STRING" },
          vehicle: { type: "STRING" },
          estimatedCost: { type: "NUMBER" },
          distanceKm: { type: "NUMBER" },
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
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.2,
    },
  });

  if (response.text) {
    try {
      const data = JSON.parse(response.text);
      return data;
    } catch (e) {
      console.error("Failed to parse Gemini output", e);
      throw new Error("AI engine returned malformed JSON");
    }
  } else {
    throw new Error("AI engine failed to generate a response");
  }
}
