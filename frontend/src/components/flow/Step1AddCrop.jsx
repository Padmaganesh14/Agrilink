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
    refreshMarketIntelligence,
  } = useAgri();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchContainerRef = useRef(null);

  const [locQuery, setLocQuery] = useState("");
  const [locSuggestions, setLocSuggestions] = useState([]);
  const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);
  const locContainerRef = useRef(null);

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
      if (
        locContainerRef.current &&
        !locContainerRef.current.contains(e.target)
      ) {
        setIsLocDropdownOpen(false);
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
    return c.name.toLowerCase().includes(q);
  });

  const exactMatchExists = allKnownCrops.some(
    (c) => c.name.toLowerCase() === searchQuery.toLowerCase().trim(),
  );

  // Apply a known or custom crop
  const handleApplyCrop = (cropInput) => {
    const cleanInput = cropInput.trim();
    const canonicalName =
      reverseCropTamil[cleanInput.toLowerCase()] || cleanInput;

    const found = allKnownCrops.find(
      (c) => c.name.toLowerCase() === canonicalName.toLowerCase(),
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

  // Handle location change with real-time Nominatim fetching
  const handleLocationChange = async (e) => {
    const typed = e.target.value;
    setCustomLocation(typed);
    setLocQuery(typed);
    if (typed.length > 2) {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(typed)}`,
        );
        setLocSuggestions(res.data);
        setIsLocDropdownOpen(true);
      } catch (err) {
        console.warn("Location fetch error", err);
      }
    } else {
      setIsLocDropdownOpen(false);
    }
  };

  const handleSelectLocSuggestion = (s) => {
    const fullAddress = s.display_name;
    setCustomLocation(fullAddress);
    setLocQuery(fullAddress);
    setIsLocDropdownOpen(false);
  };

  const handleContinue = async () => {
    const cropName = selectedCrop.name.trim();

    if (!cropName) {
      alert("Please enter a crop name.");
      return;
    }
    if (!customLocation.trim()) {
      alert("Please enter your farm location.");
      return;
    }
    if (!customQty || Number(customQty) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (user && user.id) {
      try {
        setIsSubmitting(true);
        const res = await axios.post("http://localhost:8000/api/crops", {
          cropName: selectedCrop.name,
          grade: cropQuality,
          location: customLocation,
          quantityAvailable: customQty,
          pricePerKg: expectedPrice ? Number(expectedPrice) : null,
          sellerId: user.id,
        });

        const createdCropId = res.data?.data?.id;

        setSelectedCrop({
          ...selectedCrop,
          id: createdCropId,
        });

        refreshMarketIntelligence({
          cropName: cropName,
          quantityKg: Number(customQty),
          farmLocation: customLocation,
          expectedPrice: expectedPrice ? Number(expectedPrice) : null,
          quality: cropQuality,
        });
        setFlowStep(2);
      } catch (err) {
        console.error("Failed to list crop", err);
        alert("Failed to save crop to database. Check backend logs.");
      } finally {
        setIsSubmitting(false);
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
          <span>{"Step 1 of 6"}</span>
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
              {"Crop-Agnostic Engine"}
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
                        + {`Add "${searchQuery}" as Custom Crop`}
                      </span>
                    </div>
                    <span className="text-lg font-bold px-2 py-0.5 rounded-md bg-white border border-emerald-200">
                      {"Arbitrary Crop"}
                    </span>
                  </div>
                )}

                {/* Filtered known crops */}
                <div className="p-2 space-y-1">
                  <p className="text-lg font-black  text-slate-400 px-5 py-3">
                    {`Suggested Agricultural Commodities (${filteredSuggestions.length})`}
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
                            {c.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {c.grade || "Standard"}
                      </span>
                    </div>
                  ))}
                  {filteredSuggestions.length === 0 && !searchQuery.trim() && (
                    <p className="text-base text-slate-400 p-3 text-center">
                      {"Type any agricultural crop name above."}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Popular Crops Quick Chips */}
          <div className="pt-2">
            <p className="text-sm font-semibold text-slate-400 mb-3 tracking-wide">
              {t.popularCropsLabel}
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {popularCropChips.map((chip) => {
                const isActive =
                  selectedCrop.name.toLowerCase() === chip.name.toLowerCase();
                return (
                  <button
                    key={chip.name}
                    type="button"
                    onClick={() => handleApplyCrop(chip.name)}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-gray-900 text-white shadow-md shadow-agri-500/30 scale-105"
                        : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
                    }`}
                  >
                    <span>{chip.icon}</span>
                    <span>{chip.name}</span>
                  </button>
                );
              })}

              <div className="w-px h-6 bg-slate-200 mx-1"></div>

              {/* Add Custom Crop Quick Trigger */}
              <button
                type="button"
                onClick={() => {
                  const promptMsg =
                    "Enter any crop name (e.g. Coconut, Cardamom, Drumstick, Tapioca):";
                  const customName = prompt(promptMsg, "Coconut");
                  if (customName && customName.trim()) {
                    handleApplyCrop(customName);
                  }
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-bold text-agri-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.addCustomCropBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: CROP DETAILS (Fully Editable Form)             */}
        {/* Exact Layout Matching Specification                      */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-lg font-black  text-slate-800 flex items-center space-x-2">
              <span className="text-lg"></span>
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
                    {selectedCrop.icon || ""}
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
              {/* Farm Location Autocomplete */}
              <div ref={locContainerRef} className="relative">
                <label className="block text-base font-bold  text-slate-700 mb-1.5 flex items-center space-x-1.5">
                  <span className="text-lg"></span>
                  <span>{t.locationLabel}</span>
                </label>
                <input
                  type="text"
                  value={locQuery || displayLocation}
                  onChange={handleLocationChange}
                  onFocus={() => {
                    if (locSuggestions.length > 0) setIsLocDropdownOpen(true);
                  }}
                  placeholder={t.locationPlaceholder}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white font-black text-slate-900 text-lg focus:outline-none focus:border-agri-500 transition-all"
                />
                {isLocDropdownOpen && locSuggestions.length > 0 && (
                  <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {locSuggestions.map((s, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSelectLocSuggestion(s)}
                        className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-sm font-medium text-slate-700 border-b border-slate-100 last:border-0"
                      >
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
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
                <span className="text-lg"></span>
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
                  <span className="text-lg"></span>
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
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-lg ${isSubmitting ? "bg-slate-400 cursor-not-allowed border-slate-400" : "bg-[#166534] hover:bg-[#14532d] border-[#14532d] hover:scale-[1.01] active:scale-95"} text-white border-2 text-white font-black text-base shadow-lg shadow-md flex items-center justify-center space-x-2 transition-all`}
          >
            <span>{isSubmitting ? "Processing..." : t.findMarketBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
