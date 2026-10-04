import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/i18n";
import {
  defaultCrops,
  defaultOrder,
  demoTransportPartners,
  findOrBuildCrop,
} from "../data/mockData";
import { calculateMarketIntelligence } from "../data/governmentMarketData";
import { fetchMarketIntelligence } from "../services/marketIntelligenceService";
import confetti from "canvas-confetti";

const AgriContext = createContext();

export const AgriProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("agri_lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("agri_lang", lang);
  }, [lang]);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("agri_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("agri_userRole") || "farmer";
  });

  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("agri_view") || "landing";
  });

  useEffect(() => {
    if (user) localStorage.setItem("agri_user", JSON.stringify(user));
    else localStorage.removeItem("agri_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("agri_userRole", userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem("agri_view", currentView);
  }, [currentView]);

  const logout = () => {
    setUser(null);
    setUserRole("farmer");
    setCurrentView("landing");
    localStorage.clear();
  };

  // 6 Core Steps of "Sell My Crop":
  // 1: Crop
  // 2: Market Opportunity
  // 3: Buyer Match
  // 4: AI + n8n Promotion
  // 5: Order Confirmed
  // 'transport': Arrange Transport (between Order and Track)
  // 6: Logistics & Track
  const [flowStep, setFlowStep] = useState(1);

  const [selectedCrop, setSelectedCrop] = useState(defaultCrops[0]);
  const [customQty, setCustomQty] = useState(2000);
  const [customLocation, setCustomLocation] = useState("Trichy");
  const [cropQuality, setCropQuality] = useState("Grade A");
  const [harvestDate, setHarvestDate] = useState("2026-10-05");
  const [expectedPrice, setExpectedPrice] = useState("");

  const [selectedBuyer, setSelectedBuyer] = useState(
    defaultCrops[0].matchedBuyers[0],
  );
  const [selectedTransport, setSelectedTransport] = useState(
    demoTransportPartners[0],
  );
  const [transportConfirmed, setTransportConfirmed] = useState(false);

  const [order, setOrder] = useState({
    ...defaultOrder,
    transport: demoTransportPartners[0],
  });

  // Auth state
  const [isFarmerAuth, setIsFarmerAuth] = useState(false);
  const [isBuyerAuth, setIsBuyerAuth] = useState(false);

  // n8n workflow execution simulation
  const [n8nStatus, setN8nStatus] = useState("idle"); // 'idle' | 'running' | 'completed'
  const [n8nActiveNode, setN8nActiveNode] = useState(0);
  const [n8nLogs, setN8nLogs] = useState([]);

  // Market Intelligence state (driven by government Agmarknet dataset / n8n webhook)
  const [marketIntelligence, setMarketIntelligence] = useState(() =>
    calculateMarketIntelligence({
      cropName: "Tomato",
      quantityKg: 2000,
      farmLocation: "Trichy",
      expectedPrice: 28,
      quality: "Grade A",
    }),
  );
  const [isMarketIntelLoading, setIsMarketIntelLoading] = useState(false);
  const [n8nWebhookMode, setN8nWebhookMode] = useState("local"); // 'local' | 'n8n_live'

  const refreshMarketIntelligence = async (overrideParams = {}) => {
    setIsMarketIntelLoading(true);
    const cropName = overrideParams.cropName || selectedCrop.name || "Tomato";
    const qty =
      overrideParams.quantityKg !== undefined
        ? overrideParams.quantityKg
        : customQty || 2000;
    const loc = overrideParams.farmLocation || customLocation || "Trichy";
    const exp =
      overrideParams.expectedPrice !== undefined
        ? overrideParams.expectedPrice
        : expectedPrice || 28;
    const qual = overrideParams.quality || cropQuality || "Grade A";

    try {
      const result = await fetchMarketIntelligence({
        cropName,
        quantityKg: qty,
        farmLocation: loc,
        expectedPrice: exp,
        quality: qual,
        forceLocalMode: n8nWebhookMode === "local",
      });
      setMarketIntelligence(result);
    } catch (e) {
      console.warn("Market intelligence computation notice:", e);
    } finally {
      setIsMarketIntelLoading(false);
    }
  };

  // If hi or te, fall back to English so Google Translate translates from English correctly
  const baseLangForI18n = lang === "hi" || lang === "te" ? "en" : lang;
  const t = translations[baseLangForI18n] || translations.en;

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "ta" : "en"));
  };

  const authenticateUser = (userData, role) => {
    setUser(userData);
    setUserRole(role);
    if (role === "farmer") {
      setIsFarmerAuth(true);
      setCurrentView("command-center");
    } else {
      setIsBuyerAuth(true);
      setCurrentView("buyer-marketplace");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setArbitraryCrop = ({
    name,
    quantity,
    location,
    quality = "Grade A",
    harvestDate = "2026-10-05",
    expectedPrice = "",
  }) => {
    const qty = Number(quantity) || 2000;
    const loc = location || "Trichy";
    const qual = quality || "Grade A";
    const date = harvestDate || "2026-10-05";

    const cropObj = findOrBuildCrop({
      cropName: name,
      quantityKg: qty,
      location: loc,
      quality: qual,
      harvestDate: date,
      expectedPrice: expectedPrice ? Number(expectedPrice) : null,
    });

    setSelectedCrop(cropObj);
    setCustomQty(qty);
    setCustomLocation(loc);
    setCropQuality(qual);
    setHarvestDate(date);
    setExpectedPrice(expectedPrice || "");

    const buyer =
      cropObj.matchedBuyers && cropObj.matchedBuyers.length > 0
        ? cropObj.matchedBuyers[0]
        : null;
    setSelectedBuyer(buyer);

    const pricePerKg = cropObj.bestMarket
      ? cropObj.bestMarket.price
      : buyer?.targetPrice || Number(expectedPrice) || 35;
    setOrder((prev) => ({
      ...prev,
      crop: cropObj.name,
      tamilCrop: cropObj.tamilName || cropObj.name,
      icon: cropObj.icon || "",
      quantityKg: qty,
      ratePerKg: pricePerKg,
      totalValue: Math.round(pricePerKg * qty),
      pickup: {
        ...prev.pickup,
        name: `${loc} Farm Gate`,
      },
    }));

    refreshMarketIntelligence({
      cropName: name,
      quantityKg: qty,
      farmLocation: loc,
      expectedPrice: expectedPrice ? Number(expectedPrice) : 28,
      quality: qual,
    });

    return cropObj;
  };

  const startSellMyCrop = (crop = defaultCrops[0]) => {
    setArbitraryCrop({
      name: crop.name,
      quantity: crop.defaultQty,
      location: crop.defaultLocation,
      quality: crop.grade || "Grade A",
      harvestDate: crop.harvestDate || "2026-10-05",
      expectedPrice: crop.localPrice || "",
    });
    setFlowStep(1);
    setCurrentView("flow");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const jumpToFlowStep = (step) => {
    setFlowStep(step);
    setCurrentView("flow");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseTransport = (partner) => {
    setSelectedTransport(partner);
    setTransportConfirmed(true);
    setOrder((prev) => ({
      ...prev,
      transport: partner,
    }));
  };

  const resetDemo = () => {
    setSelectedCrop(defaultCrops[0]);
    setCustomQty(2000);
    setCustomLocation("Trichy");
    setCropQuality("Grade A");
    setHarvestDate("2026-10-05");
    setExpectedPrice("");
    setSelectedBuyer(defaultCrops[0].matchedBuyers[0]);
    setSelectedTransport(demoTransportPartners[0]);
    setTransportConfirmed(false);
    setOrder({
      ...defaultOrder,
      transport: demoTransportPartners[0],
    });
    setN8nStatus("idle");
    setN8nActiveNode(0);
    setN8nLogs([]);
    setFlowStep(1);
    setCurrentView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Trigger n8n interactive simulation with animated sequential node stepping
  // Supports dynamic arbitrary crops without hardcoded conditionals
  const triggerN8nWorkflow = () => {
    if (n8nStatus === "running") return;
    setN8nStatus("running");
    setN8nActiveNode(1);

    const cropName = selectedCrop.name;
    const qtyFormatted = customQty.toLocaleString();
    const payloadJson = JSON.stringify({
      crop: cropName,
      quantityKg: customQty,
      location: customLocation,
      quality: cropQuality,
      harvestDate: harvestDate,
    });

    setN8nLogs([
      `10:42:01 ✓ Node ① Webhook & Input Validation: Ingested ${cropName} (${qtyFormatted} KG, ${customLocation} Farm Gate, Expected: ₹${expectedPrice || 28}/kg)`,
    ]);

    setTimeout(() => {
      setN8nActiveNode(2);
      setN8nLogs((prev) => [
        ...prev,
        `10:42:02 ✓ Node ② Mandi Dataset Ingestion: data.gov.in / GitHub Agmarknet feed normalized (₹3,500/qntl ➔ ₹35/kg)`,
      ]);
    }, 700);

    setTimeout(() => {
      setN8nActiveNode(3);
      setN8nLogs((prev) => [
        ...prev,
        `10:42:03 ✓ Node ③ Market Opportunity Scored: Chennai (+₹7 gross − ₹2 transport = +₹5 net advantage ➔ +₹10,000 net)`,
      ]);
    }, 1400);

    setTimeout(() => {
      setN8nActiveNode(4);
      setN8nLogs((prev) => [
        ...prev,
        `10:42:04 ✓ Node ④ Buyer & Transport Matching: Koyambedu Wholesale Mart (2,000 KG) & NH45 corridor (~330 KM)`,
      ]);
    }, 2100);

    setTimeout(() => {
      setN8nActiveNode(5);
      setN8nLogs((prev) => [
        ...prev,
        `10:42:05 ✓ Node ⑤ Master Response Ready: Bilingual WhatsApp Broadcast, Payment Escrow & Live Tracking Specs generated`,
      ]);
    }, 2800);

    setTimeout(() => {
      setN8nStatus("completed");
      setN8nLogs((prev) => [
        ...prev,
        `10:42:06 ✦ Master n8n Execution Complete: Single unified payload delivered to AgriLink AI UI.`,
      ]);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }, 3900);
  };

  // Allows presenter to step through the order stages live during the demo
  const advanceOrderStage = () => {
    setOrder((prev) => {
      const currentIdx = prev.stages.findIndex((s) => s.current);
      if (currentIdx === -1 || currentIdx >= prev.stages.length - 1) {
        try {
          confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.5 },
          });
        } catch (e) {}
        return prev;
      }

      const newStages = prev.stages.map((stage, idx) => {
        if (idx < currentIdx + 1)
          return { ...stage, done: true, current: false };
        if (idx === currentIdx + 1)
          return { ...stage, done: false, current: true };
        return { ...stage, done: false, current: false };
      });

      if (currentIdx + 1 === prev.stages.length - 1) {
        try {
          confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.4 },
          });
        } catch (e) {}
      }

      return {
        ...prev,
        stages: newStages,
      };
    });
  };

  return (
    <AgriContext.Provider
      value={{
        lang,
        t,
        setLang,
        toggleLang,
        user,
        setUser,
        logout,
        authenticateUser,
        userRole,
        setUserRole,
        currentView,
        setCurrentView,
        flowStep,
        setFlowStep,
        jumpToFlowStep,
        selectedCrop,
        setSelectedCrop,
        customQty,
        setCustomQty,
        customLocation,
        setCustomLocation,
        cropQuality,
        setCropQuality,
        harvestDate,
        setHarvestDate,
        expectedPrice,
        setExpectedPrice,
        setArbitraryCrop,
        selectedBuyer,
        setSelectedBuyer,
        selectedTransport,
        chooseTransport,
        transportConfirmed,
        order,
        setOrder,
        isFarmerAuth,
        isBuyerAuth,
        startSellMyCrop,
        n8nStatus,
        n8nActiveNode,
        n8nLogs,
        triggerN8nWorkflow,
        advanceOrderStage,
        resetDemo,
        marketIntelligence,
        isMarketIntelLoading,
        refreshMarketIntelligence,
        n8nWebhookMode,
        setN8nWebhookMode,
      }}
    >
      {children}
    </AgriContext.Provider>
  );
};

export const useAgri = () => {
  const context = useContext(AgriContext);
  if (!context) {
    throw new Error("useAgri must be used within an AgriProvider");
  }
  return context;
};
