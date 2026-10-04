import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAgri } from "../../context/AgriContext";
import {
  defaultCrops,
  popularCropsCatalog,
  popularCropChips,
  cropTamilMap,
  locationTamilMap,
  getCropDisplayName,
  getLocationDisplayName,
} from "../../data/mockData";
import {
  Scale,
  MapPin,
  ArrowRight,
  Search,
  PlusCircle,
  Calendar,
  Tag,
  CheckCircle2,
  Cpu,
  Layers,
  ChevronDown,
  Coins,
} from "lucide-react";

export const Step1AddCrop = () => {
  const {
    user,
    t,
    lang,
    setFlowStep,
    selectedCrop,
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
    refreshMarketIntelligence,
  } = useAgri();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Reverse mapping from Tamil display name to canonical English name
  const reverseCropTamil = Object.entries(cropTamilMap).reduce(
    (acc, [en, ta]) => {
      acc[ta.toLowerCase()] = en;
      return acc;
    },
    {},
  );

  const reverseLocationTamil = Object.entries(locationTamilMap).reduce(
    (acc, [en, ta]) => {
      acc[ta.toLowerCase()] = en;
      return acc;
    },
    {},
  );

  // Display crop name and location according to current language
  const displayCropName = getCropDisplayName(selectedCrop.name, lang);
  const displayLocation = getLocationDisplayName(customLocation, lang);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter crops across default and popular catalog
  const allKnownCrops = [...defaultCrops, ...popularCropsCatalog];
  const filteredSuggestions = allKnownCrops.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      (c.tamilName && c.tamilName.includes(q))
    );
  });

  const exactMatchExists = allKnownCrops.some(
    (c) =>
      c.name.toLowerCase() === searchQuery.toLowerCase().trim() ||
      (c.tamilName && c.tamilName.trim() === searchQuery.trim()),
  );

  // Apply a known or custom crop
  const handleApplyCrop = (cropInput) => {
    const cleanInput = cropInput.trim();
    const canonicalName =
      reverseCropTamil[cleanInput.toLowerCase()] || cleanInput;

    const found = allKnownCrops.find(
      (c) =>
        c.name.toLowerCase() === canonicalName.toLowerCase() ||
        (c.tamilName && c.tamilName === cleanInput),
    );

    if (found) {
      setArbitraryCrop({
        name: found.name,
        quantity: customQty || found.defaultQty,
        location: customLocation || found.defaultLocation,
        quality: found.grade || cropQuality,
        harvestDate: harvestDate,
        expectedPrice: expectedPrice || found.localPrice || "",
      });
    } else {
      setArbitraryCrop({
        name: canonicalName,
        quantity: customQty,
        location: customLocation,
        quality: cropQuality,
        harvestDate: harvestDate,
        expectedPrice: expectedPrice,
      });
    }
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  // Quick Demo Crop preset selection
  const handleSelectDemoPreset = (presetCrop) => {
    setArbitraryCrop({
      name: presetCrop.name,
      quantity: presetCrop.defaultQty,
      location: presetCrop.defaultLocation,
      quality: presetCrop.grade,
      harvestDate: "2026-10-05",
      expectedPrice: presetCrop.localPrice,
    });
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  // Handle direct crop name edit in the Crop Details form
  const handleNameChange = (e) => {
    const typed = e.target.value;
    const canonical = reverseCropTamil[typed.toLowerCase().trim()] || typed;
    setArbitraryCrop({
      name: canonical,
      quantity: customQty,
      location: customLocation,
      quality: cropQuality,
      harvestDate: harvestDate,
      expectedPrice: expectedPrice,
    });
  };

  // Handle location change with Tamil translation support
  const handleLocationChange = (e) => {
    const typed = e.target.value;
    const canonical = reverseLocationTamil[typed.toLowerCase().trim()] || typed;
    setCustomLocation(canonical);
  };

  const handleContinue = async () => {
    const cropName = selectedCrop.name.trim() || "Tomato";
    if (!selectedCrop.name.trim()) {
      handleApplyCrop("Tomato");
    }

    if (user && user.id) {
      try {
        await axios.post("http://localhost:8000/api/crops", {
          cropName: cropName,
          tamilName: cropTamilMap[cropName] || cropName,
          grade: cropQuality,
          location: customLocation,
          quantityAvailable: customQty,
          pricePerKg: expectedPrice ? Number(expectedPrice) : 28,
          sellerId: user.id,
        });
        
        refreshMarketIntelligence({
          cropName: cropName,
          quantityKg: customQty,
          farmLocation: customLocation,
          expectedPrice: expectedPrice ? Number(expectedPrice) : 28,
          quality: cropQuality,
        });
        setFlowStep(2);
      } catch (err) {
        console.error("Failed to list crop", err);
        alert("Failed to save crop to database. Check backend logs.");
      }
    } else {
      alert("User not logged in!");
      setFlowStep(1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-agri-700 px-5 py-3 rounded-md text-base font-black  mb-2 border border-emerald-200">
          <span>{t.step01Pill}</span>
          <span>•</span>
          <span>{lang === "ta" ? "படி 1 / 6" : "Step 1 of 6"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight ">
          {t.step01Title}
        </h1>
        <p className="text-base sm:text-lg font-medium text-slate-500 mt-1 max-w-xl mx-auto">
          {t.step01Subtitle}
        </p>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        {/* ========================================================= */}
        {/* SECTION 1: SEARCH OR ENTER ANY CROP (Combobox + Custom)   */}
        {/* ========================================================= */}
        <div className="space-y-3" ref={searchContainerRef}>
          <div className="flex items-center justify-between">
            <label className="text-base font-black  text-slate-700 flex items-center space-x-1.5">
              <Search className="w-3.5 h-3.5 text-agri-600" />
              <span>{t.chooseYourCrop}</span>
            </label>
            <span className="text-base font-bold text-agri-700 bg-emerald-50 px-4 py-2 rounded-md border border-emerald-200">
              {lang === "ta"
                ? "அனைத்து பயிர்களுக்கும் பொருந்தும்"
                : "Crop-Agnostic Engine"}
            </span>
          </div>

          {/* Searchable Combobox Input */}
          <div className="relative">
            <div className="flex items-center w-full px-4 py-3.5 rounded-lg border-2 border-slate-200 focus-within:border-agri-500 focus-within:ring-2 focus-within:ring-agri-500/20 bg-slate-50/50 transition-all">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    handleApplyCrop(searchQuery);
                  }
                }}
                placeholder={t.searchCropPlaceholder}
                className="w-full bg-transparent font-black text-slate-900 text-lg focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
              />
              {selectedCrop.icon && (
                <span className="text-2xl ml-2">{selectedCrop.icon}</span>
              )}
            </div>

            {/* Dropdown Suggestions Menu */}
            {isDropdownOpen && (
              <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-lg border border-slate-200 shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
                {/* Custom add action if typed text doesn't exist */}
                {searchQuery.trim() && !exactMatchExists && (
                  <div
                    onClick={() => handleApplyCrop(searchQuery)}
                    className="p-3.5 bg-emerald-50/80 hover:bg-emerald-100/80 border-b border-emerald-100 cursor-pointer flex items-center justify-between text-agri-800 transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <PlusCircle className="w-4 h-4 text-agri-600" />
                      <span className="text-base font-black">
                        +{" "}
                        {lang === "ta"
                          ? `"${searchQuery}" பயிரைச் சேர்`
                          : `Add "${searchQuery}" as Custom Crop`}
                      </span>
                    </div>
                    <span className="text-lg font-bold px-2 py-0.5 rounded-md bg-white border border-emerald-200">
                      {lang === "ta" ? "புதிய பயிர்" : "Arbitrary Crop"}
                    </span>
                  </div>
                )}

                {/* Filtered known crops */}
                <div className="p-2 space-y-1">
                  <p className="text-lg font-black  text-slate-400 px-5 py-3">
                    {lang === "ta"
                      ? `பரிந்துரைக்கப்பட்ட பயிர்கள் (${filteredSuggestions.length})`
                      : `Suggested Agricultural Commodities (${filteredSuggestions.length})`}
                  </p>
                  {filteredSuggestions.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleApplyCrop(c.name)}
                      className="px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xl">{c.icon}</span>
                        <div>
                          <p className="text-base font-black text-slate-900">
                            {lang === "ta" ? c.tamilName : c.name}
                          </p>
                          <p className="text-lg font-bold text-slate-400">
                            {lang === "ta" ? c.name : c.tamilName}
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {lang === "ta" && c.grade === "Grade A"
                          ? "கிரேடு A"
                          : c.grade || "Standard"}
                      </span>
                    </div>
                  ))}
                  {filteredSuggestions.length === 0 && !searchQuery.trim() && (
                    <p className="text-base text-slate-400 p-3 text-center">
                      {lang === "ta"
                        ? "பயிரின் பெயரை மேலே தட்டச்சு செய்யவும்."
                        : "Type any agricultural crop name above."}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Popular Crops Quick Chips */}
          <div className="pt-1">
            <p className="text-lg font-black  text-slate-400 mb-2">
              {t.popularCropsLabel}
            </p>
            <div className="flex flex-wrap gap-1.5 items-center">
              {popularCropChips.map((chip) => {
                const isActive =
                  selectedCrop.name.toLowerCase() === chip.name.toLowerCase();
                return (
                  <button
                    key={chip.name}
                    type="button"
                    onClick={() => handleApplyCrop(chip.name)}
                    className={`inline-flex items-center space-x-1.5 px-5 py-3.5 rounded-lg text-base font-bold transition-all ${
                      isActive
                        ? "bg-agri-500 text-white shadow-xs scale-105"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60"
                    }`}
                  >
                    <span>{chip.icon}</span>
                    <span>{lang === "ta" ? chip.tamilName : chip.name}</span>
                  </button>
                );
              })}

              <span className="text-base text-slate-400 font-semibold mx-1">
                {t.orLabel}
              </span>

              {/* Add Custom Crop Quick Trigger */}
              <button
                type="button"
                onClick={() => {
                  const promptMsg =
                    lang === "ta"
                      ? "எந்தப் பயிரின் பெயரையும் உள்ளிடவும் (எ.கா. தேங்காய், ஏலக்காய், முருங்கை, மரவள்ளிக்கிழங்கு):"
                      : "Enter any crop name (e.g. Coconut, Cardamom, Drumstick, Tapioca):";
                  const customName = prompt(
                    promptMsg,
                    lang === "ta" ? "தேங்காய்" : "Coconut",
                  );
                  if (customName && customName.trim()) {
                    handleApplyCrop(customName);
                  }
                }}
                className="inline-flex items-center space-x-1 px-5 py-3.5 rounded-lg text-base font-black text-agri-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{t.addCustomCropBtn}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100"></div>

        {/* ========================================================= */}
        {/* SECTION 2: QUICK DEMO CROPS (3 Established Presets)       */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <label className="text-base font-black  text-slate-700 block">
                {t.quickDemoCropsLabel}
              </label>
              <p className="text-base text-slate-400 font-medium">
                {t.quickDemoCropsSubtitle}
              </p>
            </div>
            <span className="text-lg font-bold text-slate-400 st">
              {t.oneClickFillBadge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {defaultCrops.map((c) => {
              const isSelected = selectedCrop.id === c.id;
              const cropTitle = lang === "ta" ? c.tamilName : c.name;
              const locationTitle =
                lang === "ta"
                  ? locationTamilMap[c.defaultLocation] || c.defaultLocation
                  : c.defaultLocation;
              const gradeTitle =
                lang === "ta" && c.grade === "Grade A" ? "கிரேடு A" : c.grade;

              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectDemoPreset(c)}
                  className={`p-3.5 rounded-lg border-2 text-left cursor-pointer transition-all ${
                    isSelected
                      ? "border-agri-500 bg-emerald-50/50 ring-2 ring-agri-500/20 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{c.icon}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-agri-600" />
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-base font-black text-slate-900">
                      {cropTitle}
                    </p>
                    <p className="text-base text-slate-500 font-bold mt-0.5">
                      {c.defaultQty.toLocaleString()}{" "}
                      {lang === "ta" ? "கிலோ" : "KG"} • {locationTitle}
                    </p>
                    <span className="inline-block mt-1.5 text-[9px] font-black  px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {gradeTitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-slate-100"></div>

        {/* ========================================================= */}
        {/* SECTION 3: CROP DETAILS (Fully Editable Form)             */}
        {/* Exact Layout Matching Specification                      */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-lg font-black  text-slate-800 flex items-center space-x-2">
              <span className="text-lg">🌱</span>
              <span>{t.cropDetailsHeader}</span>
            </h3>
            <span className="text-base font-black text-slate-400 tracking-wider">
              {t.editableParamsLabel}
            </span>
          </div>

          {/* Form Rows */}
          <div className="space-y-4">
            {/* ROW 1: Crop Name + Quantity (KG) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Crop Name */}
              <div>
                <label className="block text-base font-bold  text-slate-700 mb-1.5">
                  {t.cropNameLabel}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={displayCropName}
                    onChange={handleNameChange}
                    placeholder={t.cropNamePlaceholder}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white font-black text-slate-900 text-lg focus:outline-none focus:border-agri-500 transition-all pr-12"
                  />
                  <span className="absolute right-3.5 top-3 text-xl">
                    {selectedCrop.icon || "🌱"}
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-base font-bold  text-slate-700 mb-1.5 flex items-center space-x-1.5">
                  <span className="text-lg">⚖</span>
                  <span>{t.quantityLabel}</span>
                </label>
                <input
                  type="number"
                  value={customQty}
                  onChange={(e) => setCustomQty(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white font-black text-slate-900 text-lg focus:outline-none focus:border-agri-500 transition-all"
                />
              </div>
            </div>

            {/* ROW 2: Farm Location + Grade / Quality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Farm Location */}
              <div>
                <label className="block text-base font-bold  text-slate-700 mb-1.5 flex items-center space-x-1.5">
                  <span className="text-lg">📍</span>
                  <span>{t.locationLabel}</span>
                </label>
                <input
                  type="text"
                  value={displayLocation}
                  onChange={handleLocationChange}
                  placeholder={t.locationPlaceholder}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white font-black text-slate-900 text-lg focus:outline-none focus:border-agri-500 transition-all"
                />
              </div>

              {/* Grade / Quality */}
              <div>
                <label className="block text-base font-bold  text-slate-700 mb-1.5 flex items-center space-x-1.5">
                  <span className="text-lg">🏷</span>
                  <span>{t.qualityLabel}</span>
                </label>
                <div className="relative">
                  <select
                    value={cropQuality}
                    onChange={(e) => setCropQuality(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white font-black text-slate-900 text-lg focus:outline-none focus:border-agri-500 appearance-none transition-all"
                  >
                    <option value="Grade A">{t.gradeAStandard}</option>
                    <option value="Grade B">{t.gradeB}</option>
                    <option value="Premium / Export Quality">
                      {t.premiumExport}
                    </option>
                    <option value="Organic Certified">
                      {t.organicCertified}
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ROW 3: Expected Harvest Date */}
            <div>
              <label className="block text-base font-bold  text-slate-700 mb-1.5 flex items-center space-x-1.5">
                <span className="text-lg">📅</span>
                <span>{t.harvestDateLabel}</span>
              </label>
              <input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white font-black text-slate-900 text-lg focus:outline-none focus:border-agri-500 transition-all"
              />
            </div>

            {/* ROW 4: Expected Price (Optional) */}
            <div>
              <div className="mb-1.5">
                <label className="block text-base font-bold  text-slate-700 flex items-center space-x-1.5">
                  <span className="text-lg">💰</span>
                  <span>{t.expectedPriceLabel}</span>
                </label>
                <span className="text-base text-slate-500 font-bold block ml-5">
                  {t.expectedPriceSub}
                </span>
              </div>
              <input
                type="number"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                placeholder={t.expectedPricePlaceholder}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white font-black text-slate-900 text-lg focus:outline-none focus:border-agri-500 transition-all placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>



        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white border-2 border-[#14532d] text-white font-black text-base shadow-lg shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-95"
          >
            <span>{t.findMarketBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
