import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { 
  Users, 
  Package, 
  MapPin, 
  Sparkles, 
  Truck, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { getCropDisplayName, getLocationDisplayName } from '../../data/mockData';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-wider text-agri-600 mb-1">
            <span>AGRILINK AI</span>
            <span>•</span>
            <span>FARMER COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            {t.greeting}
          </h1>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 mt-1">
            <MapPin className="w-4 h-4 text-agri-500 shrink-0" />
            <span>{t.locationHeader}</span>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => startSellMyCrop(selectedCrop)}
          className="self-start sm:self-auto px-6 py-3.5 rounded-2xl bg-agri-500 hover:bg-agri-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-agri-500/25 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>{lang === 'ta' ? 'பயிரை விற்க' : 'SELL MY CROP'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Hero: YOUR NEXT SALE */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden space-y-6">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-agri-400 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-agri-400">
              {t.yourNextSale}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-bold bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
            {lang === 'ta' ? 'திருச்சி பண்ணை வாயில் தொகுப்பு' : 'Trichy Farm Gate Lot'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-3.5">
            <span className="text-4xl">{selectedCrop.icon}</span>
            <div>
              <h2 className="text-2xl font-black text-white uppercase">
                {getCropDisplayName(selectedCrop.name, lang)}
              </h2>
              <p className="text-agri-300 text-xs font-bold">
                {lang === 'ta' ? '2,000 கிலோ • திருச்சி' : '2,000 KG • TRICHY'}
              </p>
            </div>
          </div>

          {/* Best Market Callout */}
          <div className="bg-slate-850/90 border border-slate-700 rounded-2xl p-4 sm:min-w-[200px] text-right">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
              {lang === 'ta' ? 'சிறந்த சந்தை: சென்னை' : 'BEST MARKET: CHENNAI'}
            </p>
            <div className="text-3xl font-black text-agri-400 my-0.5">
              ₹34 <span className="text-xs font-semibold text-slate-400">{lang === 'ta' ? '/ கிலோ' : '/ kg'}</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">
              {lang === 'ta' ? 'திருச்சி:' : 'Trichy:'} <span className="text-slate-200 font-bold">₹28 {lang === 'ta' ? '/ கிலோ' : '/ kg'}</span>
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-medium">
            {lang === 'ta' ? 'சந்தைகளுக்கு இடையே ₹6/கிலோ கூடுதல் மொத்த விலை கண்டறியப்பட்டது.' : '+₹6/kg gross price difference identified between mandis.'}
          </span>

          <button
            onClick={() => jumpToFlowStep(2)}
            className="px-6 py-3 rounded-xl bg-agri-500 hover:bg-agri-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>{t.continueSellingBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-black text-[#0F172A]">12</h3>
            <p className="text-xs font-black uppercase tracking-wider text-slate-400 mt-1">
              {t.statBuyers}
            </p>
            <p className="text-[11px] font-bold text-agri-600 mt-0.5">
              {lang === 'ta' ? 'சென்னை & மண்டல சந்தைகள்' : 'Chennai & Regional Mandis'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-black text-[#0F172A]">03</h3>
            <p className="text-xs font-black uppercase tracking-wider text-slate-400 mt-1">
              {t.statOrders}
            </p>
            <p className="text-[11px] font-bold text-amber-600 mt-0.5">
              {lang === 'ta' ? `ஆர்டர் #${order.orderId} செயலில் உள்ளது` : `Order #${order.orderId} Active`}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-black text-agri-600">01</h3>
            <p className="text-xs font-black uppercase tracking-wider text-slate-400 mt-1">
              {t.statActiveDelivery}
            </p>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5">
              {lang === 'ta' ? 'NH45 • விழுப்புரம் (52 கி.மீ/ம)' : 'NH45 • Villupuram (52 km/h)'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-agri-600 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* ACTIVE SALE Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-agri-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {t.activeSaleHeader}
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                🟢 {t.transportConfirmedBadge}
              </span>
            </div>
            <h4 className="text-sm font-black text-[#0F172A] mt-0.5">
              {t.activeSaleRoute}
            </h4>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {lang === 'ta' ? `வாங்குபவர்: கோயம்பேடு மொத்த சந்தை • போக்குவரத்து: ${selectedTransport.name}` : `Buyer: Koyambedu Wholesale Mart • Transport: ${selectedTransport.name}`}
            </p>
          </div>
        </div>

        <button
          onClick={() => jumpToFlowStep(6)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 self-start sm:self-auto transition-colors"
        >
          <span>{t.trackDeliveryBtn}</span>
          <ChevronRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

    </div>
  );
};
