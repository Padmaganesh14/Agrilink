import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { 
  Users, 
  Package, 
  MapPin, 
  Truck, 
  ChevronRight,
  TrendingUp,
  Sprout
} from 'lucide-react';
import { getCropDisplayName } from '../../data/mockData';

export const CommandCenterDashboard = () => {
  const { 
    t, 
    lang, 
    startSellMyCrop, 
    jumpToFlowStep, 
    selectedCrop, 
    selectedTransport,
    order 
  } = useAgri();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-28 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="text-emerald-600 font-bold mb-2 flex items-center space-x-2">
            <Sprout className="w-5 h-5" />
            <span>FARMER DASHBOARD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {t.greeting}
          </h1>
          <div className="flex items-center space-x-2 text-lg text-slate-600 mt-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>{t.locationHeader}</span>
          </div>
        </div>

        <button
          onClick={() => startSellMyCrop(selectedCrop)}
          className="px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl shadow-md flex items-center justify-center space-x-3 transition-colors w-full sm:w-auto"
        >
          <Sprout className="w-6 h-6" />
          <span>{lang === 'ta' ? 'புதிய பயிரை விற்க' : 'SELL NEW CROP'}</span>
        </button>
      </div>

      {/* Main Hero: YOUR NEXT SALE */}
      <div className="bg-slate-900 text-white rounded-xl p-8 shadow-lg border border-slate-800 space-y-8">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-emerald-400 flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.yourNextSale}</span>
          </h2>
          <span className="text-slate-400 font-medium bg-slate-800 px-4 py-2 rounded-lg">
            {lang === 'ta' ? 'திருச்சி பண்ணை' : 'Trichy Farm'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex items-center space-x-6">
            <span className="text-6xl">{selectedCrop.icon}</span>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {getCropDisplayName(selectedCrop.name, lang)}
              </h2>
              <p className="text-emerald-300 text-xl font-medium">
                {lang === 'ta' ? '2,000 கிலோ • தயார்' : '2,000 KG • READY'}
              </p>
            </div>
          </div>

          {/* Best Market Callout */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 font-bold mb-2 uppercase tracking-wide">
              {lang === 'ta' ? 'பரிந்துரைக்கப்பட்ட சந்தை: சென்னை' : 'RECOMMENDED: CHENNAI'}
            </p>
            <div className="text-4xl font-bold text-white mb-4">
              ₹34 <span className="text-xl text-slate-400 font-normal">{lang === 'ta' ? '/ கிலோ' : '/ kg'}</span>
            </div>
            <p className="text-lg text-slate-300 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>
                {lang === 'ta' ? 'திருச்சியை விட ₹6/கிலோ லாபம்' : '₹6/kg higher than Trichy'}
              </span>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => jumpToFlowStep(2)}
            className="px-8 py-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold text-xl transition-colors flex items-center justify-center space-x-3 w-full sm:w-auto"
          >
            <span>{t.continueSellingBtn}</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-4xl font-bold text-slate-900">12</h3>
            <p className="text-lg font-medium text-slate-500">{t.statBuyers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-4xl font-bold text-slate-900">03</h3>
            <p className="text-lg font-medium text-slate-500">{t.statOrders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-4xl font-bold text-slate-900">01</h3>
            <p className="text-lg font-medium text-slate-500">{t.statActiveDelivery}</p>
          </div>
        </div>

      </div>

      {/* ACTIVE SALE Card */}
      <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-emerald-900 mb-2">
              {t.activeSaleRoute}
            </h4>
            <p className="text-lg text-emerald-700 font-medium">
              {lang === 'ta' ? `வாகனம்: ${selectedTransport.name} • செல்கிறது: சென்னை` : `Vehicle: ${selectedTransport.name} • En route to Chennai`}
            </p>
          </div>
        </div>

        <button
          onClick={() => jumpToFlowStep(6)}
          className="px-8 py-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xl flex items-center justify-center space-x-3 w-full sm:w-auto"
        >
          <span>{t.trackDeliveryBtn}</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};

