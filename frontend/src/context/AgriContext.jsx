import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/i18n";

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

  const [selectedCrop, setSelectedCrop] = useState({
    name: "",
    icon: "",
    defaultQty: "",
    defaultLocation: "",
    grade: "",
    localPrice: "",
    matchedBuyers: [],
  });
  const [customQty, setCustomQty] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [cropQuality, setCropQuality] = useState("Grade A");
  const [harvestDate, setHarvestDate] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");

  const [selectedBuyer, setSelectedBuyer] = useState(
    defaultCrops[0].matchedBuyers[0],
  );
  const [selectedTransport, setSelectedTransport] = useState(
    transportPartners[0],
  );
  const [transportConfirmed, setTransportConfirmed] = useState(false);

  const [activeOrderId, setActiveOrderId] = useState(null);

  // Auth state
  const [isFarmerAuth, setIsFarmerAuth] = useState(false);
  const [isBuyerAuth, setIsBuyerAuth] = useState(false);

  // Market Intelligence state
  const [marketIntelligence, setMarketIntelligence] = useState(null);
  const [isMarketIntelLoading, setIsMarketIntelLoading] = useState(false);

  const refreshMarketIntelligence = async (overrideParams = {}) => {
    setIsMarketIntelLoading(true);
    const cropName = overrideParams.cropName || selectedCrop.name || "";
    const qty =
      overrideParams.quantityKg !== undefined
        ? overrideParams.quantityKg
        : customQty || 0;
    const loc = overrideParams.farmLocation || customLocation || "";
    const exp =
      overrideParams.expectedPrice !== undefined
        ? overrideParams.expectedPrice
        : expectedPrice || 0;
    const qual = overrideParams.quality || cropQuality || "Grade A";

    try {
      const result = await fetchMarketIntelligence({
        cropName,
        quantityKg: qty,
        farmLocation: loc,
        expectedPrice: exp,
        quality: qual,
      });
      setMarketIntelligence(result);
    } catch (e) {
      console.warn("Market intelligence error:", e);
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

    const cropObj = {
      name,
      quantityKg: qty,
      location: loc,
      quality: qual,
      harvestDate: date,
      expectedPrice: expectedPrice ? Number(expectedPrice) : null,
    };

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

    refreshMarketIntelligence({
      cropName: name,
      quantityKg: qty,
      farmLocation: loc,
      expectedPrice: expectedPrice ? Number(expectedPrice) : 28,
      quality: qual,
    });

    return cropObj;
  };

  const startSellMyCrop = (crop = {}) => {
    setArbitraryCrop({
      name: crop.name || "Tomato",
      quantity: crop.defaultQty || 2000,
      location: crop.defaultLocation || "Trichy",
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
  };

  const resetDemo = () => {
    // Deprecated
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
        activeOrderId,
        setActiveOrderId,
        isFarmerAuth,
        isBuyerAuth,
        startSellMyCrop,

        marketIntelligence,
        isMarketIntelLoading,
        refreshMarketIntelligence,
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
