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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <div>
          <div className="text-emerald-600 font-semibold mb-1 flex items-center space-x-1.5 text-sm">
            <Sprout className="w-4 h-4" />
            <span>FARMER DASHBOARD</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {t.greeting}
          </h1>
          <div className="flex items-center space-x-1.5 text-sm text-slate-500 mt-1">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{t.locationHeader}</span>
          </div>
        </div>

        <button
          onClick={() => startSellMyCrop(selectedCrop)}
          className="px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-sm flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto"
        >
          <Sprout className="w-4 h-4" />
          <span>{lang === 'ta' ? 'புதிய பயிரை விற்க' : 'SELL NEW CROP'}</span>
        </button>
      </div>

      {/* Main Hero: YOUR NEXT SALE */}
      <div className="bg-slate-900 text-white rounded-lg p-6 shadow-md border border-slate-800 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-semibold text-emerald-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.yourNextSale}</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium bg-slate-800 px-2.5 py-1 rounded-md">
            {lang === 'ta' ? 'திருச்சி பண்ணை' : 'Trichy Farm'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{selectedCrop.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {getCropDisplayName(selectedCrop.name, lang)}
              </h2>
              <p className="text-emerald-300 text-sm font-medium">
                {lang === 'ta' ? '2,000 கிலோ • தயார்' : '2,000 KG • READY'}
              </p>
            </div>
          </div>

          {/* Best Market Callout */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wide">
              {lang === 'ta' ? 'பரிந்துரைக்கப்பட்ட சந்தை: சென்னை' : 'RECOMMENDED: CHENNAI'}
            </p>
            <div className="text-2xl font-bold text-white mb-2">
              ₹34 <span className="text-sm text-slate-400 font-normal">{lang === 'ta' ? '/ கிலோ' : '/ kg'}</span>
            </div>
            <p className="text-sm text-slate-300 flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'ta' ? 'திருச்சியை விட ₹6/கிலோ லாபம்' : '₹6/kg higher than Trichy'}
              </span>
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => jumpToFlowStep(2)}
            className="px-5 py-2.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-medium text-sm transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <span>{t.continueSellingBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">12</h3>
            <p className="text-xs font-medium text-slate-500 uppercase">{t.statBuyers}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">03</h3>
            <p className="text-xs font-medium text-slate-500 uppercase">{t.statOrders}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">01</h3>
            <p className="text-xs font-medium text-slate-500 uppercase">{t.statActiveDelivery}</p>
          </div>
        </div>

      </div>

      {/* ACTIVE SALE Card */}
      <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm shrink-0 border border-emerald-100">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-emerald-900 mb-0.5">
              {t.activeSaleRoute}
            </h4>
            <p className="text-sm text-emerald-700 font-medium">
              {lang === 'ta' ? `வாகனம்: ${selectedTransport.name} • செல்கிறது: சென்னை` : `Vehicle: ${selectedTransport.name} • En route to Chennai`}
            </p>
          </div>
        </div>

        <button
          onClick={() => jumpToFlowStep(6)}
          className="px-5 py-2.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <span>{t.trackDeliveryBtn}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

