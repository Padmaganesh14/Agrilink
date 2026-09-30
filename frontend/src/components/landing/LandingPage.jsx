import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { 
  Sprout, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Zap, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  ShieldAlert,
  Building2,
  Package,
  Layers,
  Flame,
  Scale
} from 'lucide-react';

export const LandingPage = () => {
  const { t, lang, setCurrentView, startSellMyCrop, loginAsDemoFarmer, loginAsDemoBuyer, jumpToFlowStep } = useAgri();

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Balanced Two-Column Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-slate-200/90 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Pitch, Hero Headings, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-agri-700 text-xs font-black tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-agri-500 animate-pulse"></span>
                <span>{t.heroBadge}</span>
              </div>

              {/* Large Heading */}
              <h1 className="text-4xl sm:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.08] uppercase">
                {t.heroHeadingMain} <br />
                <span className="text-agri-500">{t.heroHeadingHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                {t.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => startSellMyCrop()}
                  className="px-7 py-4 rounded-2xl bg-agri-500 hover:bg-agri-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-agri-500/25 flex items-center justify-center space-x-2.5 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Sprout className="w-4 h-4" />
                  <span>{t.heroPrimaryBtn}</span>
                </button>

                <button
                  onClick={() => setCurrentView('buyer-marketplace')}
                  className="px-6 py-4 rounded-2xl bg-[#0F172A] hover:bg-slate-900 text-white font-bold text-sm uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>{t.heroSecondaryBtn}</span>
                </button>
              </div>

              {/* Small Footnote */}
              <p className="text-xs text-slate-400 font-bold tracking-wide">
                {t.heroFooterTag}
              </p>

            </div>

            {/* RIGHT COLUMN: AI MARKET OPPORTUNITY CARD (Visual WOW Component) */}
            <div className="lg:col-span-5">
              <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-800 relative overflow-hidden space-y-5">
                
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-agri-400 text-xs">✦</span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                      AGRILINK AI
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">• {t.heroCardTitle}</span>
                  </div>

                  <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
                    {t.demoDataBadge}
                  </span>
                </div>

                {/* Crop Item Banner */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🍅</span>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase">
                        {lang === 'ta' ? 'தக்காளி' : 'TOMATO'}
                      </h3>
                      <p className="text-xs font-bold text-slate-400">
                        2,000 KG • TRICHY
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    BEST MARKET
                  </span>
                </div>

                {/* Price Display */}
                <div className="bg-slate-850/80 rounded-2xl p-4 border border-slate-800 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        CHENNAI KOYAMBEDU
                      </p>
                      <div className="text-3xl sm:text-4xl font-black text-agri-400">
                        ₹34 <span className="text-xs font-semibold text-slate-400">/ kg</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">
                        {t.localPriceLabel}
                      </p>
                      <p className="text-lg font-black text-slate-300">
                        ₹28 <span className="text-xs font-normal text-slate-500">/ kg</span>
                      </p>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-emerald-300 font-extrabold flex items-center space-x-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{t.grossDiffText}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      Arbitrage Verified
                    </span>
                  </div>
                </div>

                {/* 3 Indicators Pill Bar */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80">
                    <span className="flex items-center justify-center space-x-1 font-black text-amber-400 text-[10px] uppercase">
                      <Flame className="w-3 h-3" />
                      <span>{t.highDemandTag}</span>
                    </span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80">
                    <span className="flex items-center justify-center space-x-1 font-black text-blue-400 text-[10px] uppercase">
                      <Users className="w-3 h-3" />
                      <span>{t.buyersReadyTag}</span>
                    </span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80">
                    <span className="flex items-center justify-center space-x-1 font-black text-slate-300 text-[10px] uppercase">
                      <Truck className="w-3 h-3 text-slate-400" />
                      <span>{t.distanceTag}</span>
                    </span>
                  </div>
                </div>

                {/* Card Button */}
                <button
                  onClick={() => jumpToFlowStep(3)}
                  className="w-full py-3.5 px-4 rounded-xl bg-agri-500 hover:bg-agri-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <span>FIND BUYERS →</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. ONE CROP. ONE CONNECTED JOURNEY. (Timeline Section) */}
      <section id="how-it-works" className="py-14 sm:py-18 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-1.5 mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] uppercase tracking-tight">
            {t.journeyTitle}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            {t.journeySub}
          </p>
        </div>

        {/* 6 Connected Steps */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-agri-600 flex items-center justify-center font-black text-xs">
              <Sprout className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-xs uppercase">{t.j01Title}</h3>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{t.j01Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-xs uppercase">{t.j02Title}</h3>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{t.j02Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-xs uppercase">{t.j03Title}</h3>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{t.j03Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-ai-600 flex items-center justify-center font-black text-xs">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-xs uppercase">{t.j04Title}</h3>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{t.j04Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-agri-600 flex items-center justify-center font-black text-xs">
              <Package className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-xs uppercase">{t.j05Title}</h3>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{t.j05Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-black text-xs">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-xs uppercase">{t.j06Title}</h3>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{t.j06Desc}</p>
          </div>

        </div>

      </section>

      {/* 3. Farmer & Buyer Role Entry Cards */}
      <section className="py-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Farmer Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-agri-600 font-black text-xs uppercase tracking-wider">
                <Sprout className="w-4 h-4" />
                <span>{t.forFarmersTitle}</span>
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">
                {t.forFarmersDesc}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Enter your crop, evaluate transparent mandi arbitrage, match B2B buyers, and track dispatch.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('farmer-login')}
              className="w-full sm:w-auto self-start px-5 py-3 rounded-xl bg-agri-500 hover:bg-agri-600 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center space-x-2 transition-all"
            >
              <span>{t.startSellingBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Buyer Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-ai-600 font-black text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>{t.forBuyersTitle}</span>
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">
                {t.forBuyersDesc}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Browse verified farm-gate lots with certified volume, mandi benchmark pricing, and direct logistics.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('buyer-login')}
              className="w-full sm:w-auto self-start px-5 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center space-x-2 transition-all"
            >
              <span>{t.exploreCropsBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. AI MARKET INTELLIGENCE SECTION */}
      <section id="market-intelligence" className="py-14 sm:py-18 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">
                  {t.marketIntelSectionTitle}
                </h2>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {t.demoMarketDataBadge}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {t.marketIntelSectionSubtitle}
              </p>
            </div>

            <span className="text-[11px] text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-bold self-start sm:self-auto">
              {t.aiDisclaimerText}
            </span>
          </div>

          {/* 3 Compact Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Tomato Card */}
            <div className="bg-[#F5F7F6] rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🍅</span>
                  <h3 className="font-black text-slate-900 text-sm uppercase">Tomato</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-agri-700">
                  High Demand
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Chennai</span>
                  <span className="font-black text-agri-600 text-sm">₹34/kg</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Trichy</span>
                  <span className="font-bold text-slate-700 text-sm">₹28/kg</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-semibold">
                Delta: +₹6/kg gross arbitrage to Chennai
              </p>
            </div>

            {/* Ponni Rice Card */}
            <div className="bg-[#F5F7F6] rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🌾</span>
                  <h3 className="font-black text-slate-900 text-sm uppercase">Ponni Rice</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-700">
                  Medium Demand
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Chennai</span>
                  <span className="font-black text-agri-600 text-sm">₹52/kg</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Trichy</span>
                  <span className="font-bold text-slate-700 text-sm">₹48/kg</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-semibold">
                Delta: +₹4/kg gross arbitrage to Chennai
              </p>
            </div>

            {/* Onion Card */}
            <div className="bg-[#F5F7F6] rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🧅</span>
                  <h3 className="font-black text-slate-900 text-sm uppercase">Small Onion</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-agri-700">
                  High Demand
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Chennai</span>
                  <span className="font-black text-agri-600 text-sm">₹64/kg</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Trichy</span>
                  <span className="font-bold text-slate-700 text-sm">₹58/kg</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-semibold">
                Delta: +₹6/kg gross arbitrage to Chennai
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0F172A] text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-agri-500 flex items-center justify-center text-white text-xs font-black">
              🌱
            </div>
            <span className="font-extrabold text-white text-sm">AGRILINK AI</span>
            <span className="text-slate-500">| {t.brandSubtitle}</span>
          </div>
          <p className="text-slate-400 font-medium">
            "{t.mainTagline}"
          </p>
        </div>
      </footer>

    </div>
  );
};
