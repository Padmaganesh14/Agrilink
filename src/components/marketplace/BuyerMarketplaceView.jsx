import React, { useState } from 'react';
import { useAgri } from '../../context/AgriContext';
import { defaultCrops } from '../../data/mockData';
import { 
  Search, 
  MapPin, 
  Scale, 
  Building2, 
  ArrowRight, 
  TrendingUp, 
  X
} from 'lucide-react';

export const BuyerMarketplaceView = () => {
  const { t, lang, setFlowStep, setSelectedCrop, setSelectedBuyer, jumpToFlowStep } = useAgri();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [activeModalCrop, setActiveModalCrop] = useState(null);

  const filteredCrops = defaultCrops.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.tamilName.includes(searchTerm);
    const matchesDistrict = selectedDistrict === 'All' || c.defaultLocation === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handlePlaceOrder = (crop) => {
    setSelectedCrop(crop);
    if (crop.matchedBuyers && crop.matchedBuyers.length > 0) {
      setSelectedBuyer(crop.matchedBuyers[0]);
    }
    setActiveModalCrop(null);
    setFlowStep(5);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
      
      {/* Header */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-ai-400 text-xs font-black uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Koyambedu Wholesale Mart • Chennai</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {t.buyerDashboardHeroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-medium">
              {t.buyerDashboardSubtitle}
            </p>
          </div>

          <div className="bg-slate-850 border border-slate-700 rounded-2xl p-4 text-center sm:min-w-[170px]">
            <p className="text-[10px] uppercase font-bold text-slate-400">Available Farm Lots</p>
            <p className="text-2xl font-black text-indigo-300 mt-0.5">38 Lots</p>
            <p className="text-[10px] text-emerald-400 font-bold">100% Quality Inspected</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Tomato, Rice, Onion..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-ai-500 font-semibold"
            />
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-ai-500 font-semibold"
            >
              <option value="All">All Tamil Nadu Districts</option>
              <option value="Trichy">Trichy Region</option>
              <option value="Madurai">Madurai Region</option>
              <option value="Coimbatore">Coimbatore Region</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredCrops.map(crop => (
          <div
            key={crop.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center space-x-2.5">
                  <span className="text-3xl">{crop.icon}</span>
                  <div>
                    <h3 className="font-black text-[#0F172A] text-lg">
                      {lang === 'ta' ? crop.tamilName : crop.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold">
                      {crop.grade}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-agri-700">
                  Ready to Ship
                </span>
              </div>

              <div className="space-y-2 text-xs mb-3 font-semibold">
                <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="flex items-center space-x-1 font-bold">
                    <Scale className="w-3.5 h-3.5 text-slate-400" />
                    <span>Quantity:</span>
                  </span>
                  <span className="font-extrabold text-slate-900">{crop.defaultQty.toLocaleString()} KG</span>
                </div>

                <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="flex items-center space-x-1 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Farm Location:</span>
                  </span>
                  <span className="font-extrabold text-slate-900">{crop.defaultLocation} (Tamil Nadu)</span>
                </div>

                <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="flex items-center space-x-1 font-bold">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                    <span>Wholesale Benchmark:</span>
                  </span>
                  <span className="font-black text-agri-600 text-sm">₹{crop.bestMarket.price} / KG</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModalCrop(crop)}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>{t.viewLotBtn}</span>
              <ArrowRight className="w-4 h-4 text-ai-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Lot Details Modal */}
      {activeModalCrop && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setActiveModalCrop(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <span className="text-4xl">{activeModalCrop.icon}</span>
              <div>
                <h3 className="text-xl font-black text-[#0F172A]">
                  {lang === 'ta' ? activeModalCrop.tamilName : activeModalCrop.name}
                </h3>
                <p className="text-xs font-bold text-agri-700">
                  {activeModalCrop.defaultQty.toLocaleString()} KG • Farm Gate Lot
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Farm Origin</span>
                <span className="font-extrabold text-slate-800">{activeModalCrop.defaultLocation} Region</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Quality Grade</span>
                <span className="font-extrabold text-slate-800">{activeModalCrop.grade}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Expected Availability</span>
                <span className="font-extrabold text-slate-800">Immediate</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Target Mandi Benchmark</span>
                <span className="font-black text-agri-600">₹{activeModalCrop.bestMarket.price} / KG</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-semibold text-agri-800">
              Estimated Order Value: ₹{(activeModalCrop.bestMarket.price * activeModalCrop.defaultQty).toLocaleString()}
            </div>

            <button
              onClick={() => handlePlaceOrder(activeModalCrop)}
              className="w-full py-4 px-6 rounded-2xl bg-agri-500 hover:bg-agri-600 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl shadow-agri-500/25"
            >
              <span>{t.placeOrderBtn} (₹{(activeModalCrop.bestMarket.price * activeModalCrop.defaultQty).toLocaleString()})</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
