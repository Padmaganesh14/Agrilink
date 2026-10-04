import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAgri } from "../../context/AgriContext";
import {
  Search,
  MapPin,
  Scale,
  Building2,
  ArrowRight,
  TrendingUp,
  X,
  Sprout,
} from "lucide-react";

export const BuyerMarketplaceView = () => {
  const {
    t,
    lang,
    setFlowStep,
    setSelectedCrop,
    setSelectedBuyer,
    jumpToFlowStep,
  } = useAgri();

  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [activeModalCrop, setActiveModalCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        // Change to dynamic endpoint, e.g., process.env.VITE_API_URL or localhost
        const res = await axios.get("http://localhost:8000/api/crops");
        if (res.data.success) {
          setCrops(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch crops", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const filteredCrops = crops.filter((c) => {
    const cropName = c.cropName || "";
    const tamilName = c.tamilName || "";
    const matchesSearch =
      cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tamilName.includes(searchTerm);
    const matchesDistrict =
      selectedDistrict === "All" || c.location === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handlePlaceOrder = (crop) => {
    setSelectedCrop(crop);
    // In a real app we'd trigger an order creation logic here
    if (crop.matchedBuyers && crop.matchedBuyers.length > 0) {
      setSelectedBuyer(crop.matchedBuyers[0]);
    }
    setActiveModalCrop(null);
    setFlowStep(5);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-lg p-4 sm:p-6 border border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-emerald-400 text-[10px] sm:text-xs font-semibold mb-1 uppercase tracking-wide">
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="truncate">
                Koyambedu Wholesale Mart • Chennai
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
              {t.buyerDashboardHeroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
              {t.buyerDashboardSubtitle}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-md p-2.5 sm:p-3 text-center w-full sm:w-auto sm:min-w-[150px]">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Available Lots
            </p>
            <p className="text-lg sm:text-xl font-bold text-indigo-300 mt-0.5 leading-none">
              38 Lots
            </p>
            <p className="text-[9px] sm:text-[10px] text-emerald-400 font-medium mt-1 uppercase tracking-wide">
              100% Inspected
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search crops..."
              className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 rounded-md bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
            />
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
            >
              <option value="All">All Districts</option>
              <option value="Trichy">Trichy</option>
              <option value="Madurai">Madurai</option>
              <option value="Coimbatore">Coimbatore</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-500">Loading crops...</div>
        ) : filteredCrops.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">No crops found matching your criteria.</div>
        ) : filteredCrops.map((crop) => (
          <div
            key={crop._id || crop.id}
            className="bg-white rounded-lg p-3.5 sm:p-5 border border-slate-200 shadow-sm hover:shadow transition-shadow flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div>
              <div className="flex items-start justify-between border-b border-slate-100 pb-2 sm:pb-3 mb-2 sm:mb-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xl sm:text-2xl leading-none">
                    {crop.icon || "🌾"}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {lang === "ta" && crop.tamilName ? crop.tamilName : crop.cropName}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">
                      {crop.grade}
                    </p>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide whitespace-nowrap">
                  Ready
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-slate-100">
                  <span className="flex items-center space-x-1 sm:space-x-1.5 font-medium">
                    <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                    <span>Qty</span>
                  </span>
                  <span className="font-semibold text-slate-900">
                    {crop.quantityAvailable?.toLocaleString()} KG
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-slate-100">
                  <span className="flex items-center space-x-1 sm:space-x-1.5 font-medium">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                    <span>Loc</span>
                  </span>
                  <span className="font-semibold text-slate-900 truncate max-w-[100px] sm:max-w-none text-right">
                    {crop.location}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-slate-100">
                  <span className="flex items-center space-x-1 sm:space-x-1.5 font-medium">
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                    <span>Price</span>
                  </span>
                  <span className="font-bold text-emerald-700">
                    ₹{crop.pricePerKg}/KG
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModalCrop(crop)}
              className="w-full py-1.5 sm:py-2 px-3 sm:px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>{t.viewLotBtn}</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Lot Details Modal */}
      {activeModalCrop && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 space-y-4 sm:space-y-5 border border-slate-200 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalCrop(null)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 sm:space-x-3 border-b border-slate-100 pb-3 sm:pb-4 pr-6">
              <span className="text-2xl sm:text-3xl leading-none">
                {activeModalCrop.icon || "🌾"}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {lang === "ta" && activeModalCrop.tamilName
                    ? activeModalCrop.tamilName
                    : activeModalCrop.cropName}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-emerald-700 mt-0.5">
                  {activeModalCrop.quantityAvailable?.toLocaleString()} KG • Farm Lot
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium block mb-0.5 truncate">
                  Farm Origin
                </span>
                <span className="font-semibold text-slate-900 break-words">
                  {activeModalCrop.location}
                </span>
              </div>

              <div className="p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium block mb-0.5 truncate">
                  Quality Grade
                </span>
                <span className="font-semibold text-slate-900 break-words">
                  {activeModalCrop.grade}
                </span>
              </div>

              <div className="p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium block mb-0.5 truncate">
                  Availability
                </span>
                <span className="font-semibold text-slate-900 break-words">
                  Immediate
                </span>
              </div>

              <div className="p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium block mb-0.5 truncate">
                  Target Benchmark
                </span>
                <span className="font-bold text-emerald-700 break-words">
                  ₹{activeModalCrop.pricePerKg}/KG
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs sm:text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span className="font-medium text-emerald-800">
                Est. Order Value
              </span>
              <span className="font-bold text-emerald-900 text-base sm:text-base mt-0.5 sm:mt-0">
                ₹
                {(
                  activeModalCrop.pricePerKg * activeModalCrop.quantityAvailable
                ).toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => handlePlaceOrder(activeModalCrop)}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-colors shadow-sm"
            >
              <span>{t.placeOrderBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
