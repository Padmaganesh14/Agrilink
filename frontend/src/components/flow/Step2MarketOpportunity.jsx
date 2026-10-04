import React from 'react';
import { useAgri } from '../../context/AgriContext';
import {
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Truck,
  Database,
  RefreshCw,
  MapPin,
  Loader2,
} from 'lucide-react';

export const Step2MarketOpportunity = () => {
  const {
    t,
    lang,
    setFlowStep,
    selectedCrop,
    customQty,
    customLocation,
    expectedPrice,
    marketIntelligence,
    isMarketIntelLoading,
    refreshMarketIntelligence,
  } = useAgri();

  const intel = marketIntelligence || {};
  const best = intel.bestMarket || intel.recommendedMarket || {};
  const mandis = intel.mandis || intel.marketComparison || [];
  const whyReasons = intel.aiInsight?.whyReasons || intel.whyReasons || [];
  const farmerExp = Number(expectedPrice) > 0 ? Number(expectedPrice) : (intel.farmerExpectedPrice || 0);

  const grossDiff = best.grossDiffPerKg !== undefined
    ? best.grossDiffPerKg
    : (best.modalPricePerKg - farmerExp);
  const transportPerKg = best.estimatedTransportPerKg || 0;
  const netAdvantage = best.netAdvantagePerKg !== undefined
    ? best.netAdvantagePerKg
    : Math.max(0, grossDiff - transportPerKg);
  const totalOpp = best.totalOpportunity ?? best.totalOpportunityAmount ?? Math.round(netAdvantage * Number(customQty));

  // The "best" mandi shortName for highlighting
  const bestCity = (best.location || '').toUpperCase();

  if (isMarketIntelLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center space-y-4 min-h-[400px]">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-base font-bold text-slate-600">Analyzing market data with AI...</p>
        <p className="text-sm text-slate-400">Fetching live APMC mandi prices for {selectedCrop.name}</p>
      </div>
    );
  }

  if (!best.location && !best.market) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center space-y-4 min-h-[400px]">
        <AlertCircle className="w-10 h-10 text-amber-500" />
        <p className="text-base font-bold text-slate-700">Market data unavailable.</p>
        <button
          onClick={() => refreshMarketIntelligence()}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-md text-base font-black mb-2 border border-emerald-200">
          <span>{t.step02Pill}</span>
          <span>•</span>
          <span>{lang === 'ta' ? 'படி 2 / 6' : 'Step 2 of 6'}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
          {t.step02Title}
        </h1>
        <p className="text-base sm:text-lg font-medium text-slate-500 mt-1">
          {lang === 'ta'
            ? 'AI சந்தை நுண்ணறிவு மூலம் உங்கள் பயிருக்கான சிறந்த சந்தை வாய்ப்பு.'
            : 'AI-powered market intelligence with real APMC mandi prices.'}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-6 relative overflow-hidden">

        {/* Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-black text-emerald-700">AGRILINK AI MARKET INTELLIGENCE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
              {selectedCrop.name} &bull; Best Market Opportunity
            </h2>
            <p className="text-sm font-bold text-slate-500 mt-0.5">
              {Number(customQty).toLocaleString()} KG &bull; {customLocation} &bull; Farmer Expected: <b className="text-slate-800">₹{farmerExp}/kg</b>
            </p>
          </div>
          <button
            onClick={() => refreshMarketIntelligence()}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* ====================================================== */}
        {/* BEST MARKET SPOTLIGHT                                   */}
        {/* ====================================================== */}
        <div className="bg-[#0F172A] text-white rounded-lg p-6 sm:p-8 relative shadow-2xl overflow-hidden space-y-5 border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full pointer-events-none" />

          {/* Badge */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-sm font-black text-emerald-400">BEST MARKET OPPORTUNITY</span>
            </div>
            <span className="text-sm font-black bg-emerald-950 text-emerald-300 px-4 py-2 rounded-md border border-emerald-500/30">
              Highest Net Advantage
            </span>
          </div>

          {/* Destination + Price */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {best.location || best.market}
              </h3>
              <p className="text-base font-bold text-slate-400 mt-0.5">{best.marketFullName}</p>
              <p className="text-sm text-slate-500 mt-1 flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5" />
                <span>{best.distanceKm} KM &bull; {best.transitHours || ''} &bull; {best.transitCorridor || ''}</span>
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-4xl sm:text-6xl font-black text-emerald-400 tracking-tight">
                ₹{best.modalPricePerKg}
                <span className="text-lg sm:text-2xl font-bold text-slate-400"> / KG</span>
              </div>
              <p className="text-sm font-bold text-slate-400">
                (₹{best.modalPriceQuintal?.toLocaleString()} / quintal)
              </p>
            </div>
          </div>

          {/* Calculation Breakdown */}
          <div className="bg-slate-900/70 rounded-lg p-4 sm:p-5 border border-slate-700/80 space-y-2.5 font-mono text-sm">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-sans font-bold flex items-center space-x-1.5">
                <span className="text-emerald-400">+</span>
                <span>Gross price difference:</span>
              </span>
              <span className="font-black text-emerald-400">
                +₹{Number(grossDiff).toFixed(1)}/kg (₹{best.modalPricePerKg} market - ₹{farmerExp} expected)
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-sans font-bold flex items-center space-x-1.5">
                <span className="text-amber-400">-</span>
                <span>Estimated transport:</span>
              </span>
              <span className="font-black text-amber-300">
                -₹{Number(transportPerKg).toFixed(1)}/kg ({customLocation} to {best.location || best.market}, {best.distanceKm} KM)
              </span>
            </div>
            <div className="border-t border-slate-700 pt-2 flex items-center justify-between font-black text-base">
              <span className="font-sans text-emerald-300">Estimated net advantage:</span>
              <span className="text-emerald-400">+₹{Number(netAdvantage).toFixed(1)}/kg</span>
            </div>
            <div className="bg-emerald-950/80 rounded-lg p-3 border border-emerald-500/40 flex items-center justify-between text-emerald-200">
              <span className="font-sans font-black text-sm tracking-wider">
                Estimated additional opportunity ({Number(customQty).toLocaleString()} KG):
              </span>
              <span className="text-xl font-black text-emerald-400 tracking-tight">
                +₹{Number(totalOpp).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* MANDI COMPARISON GRID                                   */}
        {/* ====================================================== */}
        {mandis.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-700 flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nearby APMC Mandi Price Comparison</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">Agmarknet / AI Estimate</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mandis.map((m) => {
                const mCity = (m.city || m.shortName || '').toUpperCase();
                const isBest = mCity === bestCity || m.market === best.marketFullName;
                return (
                  <div
                    key={m.shortName || m.market}
                    className={`p-3.5 rounded-lg border text-center transition-all ${
                      isBest
                        ? 'bg-emerald-50 border-emerald-400 shadow-sm ring-2 ring-emerald-500/20'
                        : m.isLocal
                        ? 'bg-slate-50 border-slate-300'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
                      isBest
                        ? 'bg-emerald-600 text-white'
                        : m.isLocal
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isBest ? 'BEST' : m.isLocal ? 'LOCAL' : m.tag || 'NEARBY'}
                    </span>
                    <p className="text-sm font-black text-slate-900 mt-2">{m.city || m.shortName}</p>
                    <p className="text-xs text-slate-500 font-medium truncate">{m.market}</p>
                    <div className="text-xl font-black text-slate-900 my-1">
                      ₹{m.modalPricePerKg || m.pricePerKg}
                      <span className="text-sm font-normal text-slate-500">/kg</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">₹{m.modalPriceQuintal}/qntl</p>
                    {m.distanceKm > 0 && (
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-center space-x-1">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{m.distanceKm} KM</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* WHY THIS MARKET?                                        */}
        {/* ====================================================== */}
        {whyReasons.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-3">
            <h3 className="text-base font-black text-slate-800 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Why {best.location || best.market} has the Best Opportunity?</span>
            </h3>
            <div className="space-y-2 text-sm font-bold text-slate-700">
              {whyReasons.map((reason, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{typeof reason === 'object' ? reason.en : reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Source Note */}
        <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-200/90 text-amber-950 text-sm">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span className="font-semibold">
              {intel?.aiInsight?.disclaimer || "AI estimate based on Agmarknet APMC data — not a guaranteed selling price. Final contract is confirmed directly with the buyer."}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={() => setFlowStep(1)}
            className="px-5 py-3.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>
          <button
            onClick={() => setFlowStep(3)}
            className="flex-1 py-4 px-6 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white font-black text-base shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>CONNECT VERIFIED BUYERS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
