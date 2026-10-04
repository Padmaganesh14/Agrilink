import React, { useState } from 'react';
import { useAgri } from '../../context/AgriContext';
import { getCropDisplayName, getLocationDisplayName } from '../../data/mockData';
import { 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Truck,
  Database,
  Radio,
  Sparkles,
  Server,
  Zap,
  Info,
  RefreshCw
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
    n8nWebhookMode,
    setN8nWebhookMode
  } = useAgri();

  const [activeTab, setActiveTab] = useState('opportunity'); // 'opportunity' | 'mandis'

  const crop = selectedCrop;
  const intel = marketIntelligence || {};
  const best = intel.bestMarket || {
    location: 'Chennai',
    marketFullName: 'Chennai Koyambedu Wholesale Mart',
    tamilLocation: 'சென்னை',
    tamilMarketName: 'சென்னை கோயம்பேடு மொத்த சந்தை',
    marketPricePerKg: 35,
    modalPriceQuintal: 3500,
    grossDiffPerKg: 7,
    estimatedTransportPerKg: 2.0,
    netAdvantagePerKg: 5.0,
    totalOpportunity: 10000,
    distanceKm: 330,
    transitHours: '~6 Hours',
    activeBuyersCount: 2,
    buyerNames: ['Koyambedu Wholesale Mart', 'FreshBasket Logistics Chennai']
  };

  const farmerExp = Number(expectedPrice) > 0 ? Number(expectedPrice) : (intel.farmerExpectedPrice || 28);
  const grossDiff = best.grossDiffPerKg !== undefined ? best.grossDiffPerKg : (best.marketPricePerKg - farmerExp);
  const transportPerKg = best.estimatedTransportPerKg || 2.0;
  const netAdvantage = best.netAdvantagePerKg !== undefined ? best.netAdvantagePerKg : Math.max(0, grossDiff - transportPerKg);
  const totalOpp = best.totalOpportunity !== undefined ? best.totalOpportunity : Math.round(netAdvantage * customQty);

  const mandis = intel.mandis || [
    { shortName: 'TRICHY', market: 'Trichy Gandhi Market', modalPricePerKg: 28, modalPriceQuintal: 2800, tag: 'Local Base', isLocal: true },
    { shortName: 'CHENNAI', market: 'Chennai Koyambedu Mart', modalPricePerKg: 35, modalPriceQuintal: 3500, tag: 'Best Market', isLocal: false },
    { shortName: 'COIMBATORE', market: 'Coimbatore APMC', modalPricePerKg: 32, modalPriceQuintal: 3200, tag: 'Alternative', isLocal: false },
    { shortName: 'MADURAI', market: 'Madurai Mattuthavani', modalPricePerKg: 27, modalPriceQuintal: 2700, tag: 'Southern Hub', isLocal: false }
  ];

  const handleToggleEngine = async () => {
    const nextMode = n8nWebhookMode === 'local' ? 'n8n_live' : 'local';
    setN8nWebhookMode(nextMode);
    await refreshMarketIntelligence();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-agri-700 px-5 py-3 rounded-md text-base font-black  mb-2 border border-emerald-200">
          <span>{t.step02Pill}</span>
          <span>•</span>
          <span>{lang === 'ta' ? 'படி 2 / 6' : 'Step 2 of 6'}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight ">
          {t.step02Title}
        </h1>
        <p className="text-base sm:text-lg font-medium text-slate-500 mt-1">
          {lang === 'ta' 
            ? 'அரசு அக்மார்க்நெட் தரவு & n8n நுண்ணறிவு மூலம் உங்கள் பயிருக்கான சந்தை வாய்ப்பு கணக்கீடு.'
            : 'Government Agmarknet mandi data & n8n decision-support intelligence.'}
        </p>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border-2 border-agri-500/40 shadow-xl space-y-6 relative overflow-hidden">
        
        {/* Top Header with Crop Specs & Execution Engine Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3.5">
            <span className="text-4xl">{crop.icon || ''}</span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black  text-agri-600">
                  ✦ {lang === 'ta' ? 'AGRILINK AI சந்தை நுண்ணறிவு' : 'AGRILINK AI MARKET INTELLIGENCE'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] ">
                {lang === 'ta' 
                  ? `உங்கள் ${getCropDisplayName(crop.name, lang)} பயிருக்கு சிறந்த சந்தை`
                  : `${getCropDisplayName(crop.name, lang)} • Best Market Opportunity`}
              </h2>
              <p className="text-base font-bold text-slate-500 mt-0.5">
                {customQty.toLocaleString()} {lang === 'ta' ? 'கிலோ' : 'KG'} •  {getLocationDisplayName(customLocation, lang).toUpperCase()} • {lang === 'ta' ? 'விவசாயி எதிர்பார்ப்பு:' : 'Farmer Expected:'} <b className="text-slate-800">₹{farmerExp}/{lang === 'ta' ? 'கிலோ' : 'kg'}</b>
              </p>
            </div>
          </div>

          {/* Engine Status Toggle (n8n Webhook vs Government Dataset) - REMOVED */}
          <div className="flex flex-col items-end space-y-1">
            <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-bold bg-emerald-50 text-agri-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{lang === 'ta' ? 'நிகழ்நேர சந்தை தரவு' : 'Live Market Engine'}</span>
            </span>
            <span className="text-[9px] font-bold text-slate-400">
              {lang === 'ta' ? '1 குவிண்டால் = 100 கிலோ' : '1 Quintal = 100 KG'}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* WOW CARD: MARKET OPPORTUNITY SPOTLIGHT                   */}
        {/* ======================================================== */}
        <div className="bg-[#0F172A] text-white rounded-lg p-6 sm:p-8 relative shadow-2xl overflow-hidden space-y-5 border border-slate-800">
          
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full hidden pointer-events-none" />

          {/* Badge & City Name */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-agri-400 animate-ping"></span>
              <span className="text-base font-black st text-agri-400">
                {lang === 'ta' ? 'சிறந்த சந்தை வாய்ப்பு' : 'MARKET OPPORTUNITY'}
              </span>
            </div>
            <span className="text-lg font-black  bg-emerald-950 text-agri-300 px-5 py-3 rounded-md border border-emerald-500/30">
              {lang === 'ta' ? 'அதிக நிகர வருமானம்' : 'Highest Net Advantage'}
            </span>
          </div>

          {/* Big Destination and Price */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-white  tracking-tight">
                {lang === 'ta' ? best.tamilLocation : best.location}
              </h3>
              <p className="text-base font-bold text-slate-400 mt-0.5">
                {lang === 'ta' ? best.tamilMarketName : best.marketFullName}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-4xl sm:text-6xl font-black text-agri-400 tracking-tight">
                ₹{best.marketPricePerKg}
                <span className="text-lg sm:text-2xl font-bold text-slate-400"> / {lang === 'ta' ? 'கிலோ' : 'KG'}</span>
              </div>
              <p className="text-base font-bold text-slate-400">
                (₹{best.modalPriceQuintal?.toLocaleString()} / {lang === 'ta' ? 'குவிண்டால்' : 'quintal'})
              </p>
            </div>
          </div>

          {/* OPPORTUNITY CALCULATION BREAKDOWN (User Specification) */}
          <div className="bg-slate-850/90 rounded-lg p-4 sm:p-5 border border-slate-700/80 space-y-2.5 font-mono text-base">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-sans font-bold flex items-center space-x-1.5">
                <span className="text-emerald-400">↑</span>
                <span>{lang === 'ta' ? 'மொத்த விலை வித்தியாசம்:' : 'Gross price difference:'}</span>
              </span>
              <span className="font-black text-emerald-400">
                +₹{grossDiff}/kg ({lang === 'ta' ? `₹${best.marketPricePerKg} சந்தை - ₹${farmerExp} எதிர்பார்ப்பு` : `₹${best.marketPricePerKg} market - ₹${farmerExp} expected`})
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="font-sans font-bold flex items-center space-x-1.5">
                <span className="text-amber-400">−</span>
                <span>{lang === 'ta' ? 'உத்தேச சரக்கு கட்டணம்:' : 'Estimated transport:'}</span>
              </span>
              <span className="font-black text-amber-300">
                −₹{transportPerKg.toFixed(1)}/kg ({lang === 'ta' ? 'திருச்சி ➔ சென்னை ~330 கி.மீ' : 'Trichy ➔ Chennai ~330 KM'})
              </span>
            </div>

            <div className="border-t border-slate-700 pt-2 flex items-center justify-between font-black text-lg">
              <span className="font-sans text-agri-300 ">
                {lang === 'ta' ? 'உத்தேச நிகர சாதகம்:' : 'Estimated net advantage:'}
              </span>
              <span className="text-agri-400 text-base">
                +₹{netAdvantage}/kg
              </span>
            </div>

            <div className="bg-emerald-950/80 rounded-lg p-3 border border-emerald-500/40 flex items-center justify-between text-agri-200">
              <span className="font-sans font-black  text-base tracking-wider">
                {lang === 'ta' ? 'மொத்த கூடுதல் வருமான வாய்ப்பு:' : 'Estimated additional opportunity:'}
              </span>
              <span className="text-xl font-black text-agri-400 tracking-tight">
                ≈ +₹{totalOpp.toLocaleString()}
              </span>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* MANDI COMPARISON GRID (Tamil Nadu APMCs)                 */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black  text-slate-700 flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-agri-600" />
              <span>{lang === 'ta' ? 'தமிழ்நாடு APMC சந்தை விலை ஒப்பீடு' : 'Tamil Nadu APMC Mandi Price Comparison'}</span>
            </h3>
            <span className="text-lg font-bold text-slate-400">
              {lang === 'ta' ? 'தரவுதளம்: அக்மார்க்நெட் DMI' : 'Feed: Agmarknet DMI'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mandis.map((m) => {
              const isBest = m.shortName === 'CHENNAI';
              const isLocalMandi = m.isLocal;

              return (
                <div 
                  key={m.shortName}
                  className={`p-3.5 rounded-lg border text-center transition-all ${
                    isBest 
                      ? 'bg-emerald-50 border-emerald-400 shadow-xs ring-2 ring-emerald-500/20'
                      : isLocalMandi
                      ? 'bg-slate-50 border-slate-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <span className={`text-[9px] font-black  px-2 py-0.5 rounded-md ${
                    isBest 
                      ? 'bg-emerald-600 text-white'
                      : isLocalMandi
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {lang === 'ta' && isBest ? 'சிறந்தது' : lang === 'ta' && isLocalMandi ? 'உள்ளூர்' : m.tag}
                  </span>

                  <p className="text-base font-black text-slate-900 mt-2 ">
                    {lang === 'ta' && m.shortName === 'TRICHY' ? 'திருச்சி' :
                     lang === 'ta' && m.shortName === 'CHENNAI' ? 'சென்னை' :
                     lang === 'ta' && m.shortName === 'COIMBATORE' ? 'கோவை' :
                     lang === 'ta' && m.shortName === 'MADURAI' ? 'மதுரை' : m.shortName}
                  </p>

                  <div className="text-xl font-black text-slate-900 my-0.5">
                    ₹{m.modalPricePerKg}
                    <span className="text-lg font-normal text-slate-500"> / {lang === 'ta' ? 'கிலோ' : 'kg'}</span>
                  </div>

                  <p className="text-lg text-slate-400 font-mono">
                    ₹{m.modalPriceQuintal} / qntl
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* WHY CHENNAI? DECISION SUPPORT SECTION                    */}
        {/* ======================================================== */}
        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
            <HelpCircle className="w-4 h-4 text-agri-600" />
            <h3 className="text-base font-black  text-slate-800">
              {lang === 'ta' ? 'சென்னை ஏன் சிறந்த சந்தை?' : 'Why Chennai has the Best Estimated Opportunity?'}
            </h3>
          </div>

          <div className="space-y-2 text-base font-bold text-slate-700">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0" />
              <span>
                {lang === 'ta' 
                  ? `விவசாயியின் எதிர்பார்ப்பை விட அதிக மொத்த மண்டி விலை (+₹${grossDiff}/கிலோ கூடுதல்)`
                  : `Higher indicative wholesale APMC price (+₹${grossDiff}/kg gross difference)`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0" />
              <span>
                {lang === 'ta' 
                  ? `அதிக B2B வாங்குபவர் தேவை (2 சரிபார்க்கப்பட்ட வாங்குபவர்கள்: கோயம்பேடு மொத்த சந்தை & ஃபிரெஷ்பாஸ்கெட்)`
                  : `High B2B institutional demand (2 verified buyers active: Koyambedu Wholesale Mart & FreshBasket)`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0" />
              <span>
                {lang === 'ta' 
                  ? `சரியான அளவு பொருத்தம்: ${customQty.toLocaleString()} கிலோ மொத்த சரக்கு தேவை`
                  : `Suitable buyer requirement matching ${customQty.toLocaleString()} KG volume`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0" />
              <span>
                {lang === 'ta' 
                  ? 'நேரடி தேசிய நெடுஞ்சாலை போக்குவரத்து பாதை வசதி (~330 கி.மீ NH38 / NH45 வழித்தடம்)'
                  : 'Direct express transit corridor available (~330 KM via NH38 / NH45)'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0" />
              <span>
                {lang === 'ta' 
                  ? `குறைந்தபட்ச போக்குவரத்து செலவு கழிக்கப்பட்டு கணக்கிடப்பட்டது (~₹${transportPerKg}/கிலோ சரக்கு கட்டணம்)`
                  : `Estimated transport accounted for (~₹${transportPerKg}/kg freight deduction)`}
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* GOVERNMENT MARKET DATA PROVENANCE & DISCLAIMER           */}
        {/* ======================================================== */}
        <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-200/90 text-amber-950 space-y-2 text-base">
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-1.5">
            <div className="flex items-center space-x-1.5 font-black  text-base text-amber-900">
              <Database className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {lang === 'ta' ? 'அரசு சந்தை தரவு ஆதாரம் (GOVERNMENT DATA PROVENANCE)' : 'GOVERNMENT MARKET DATA PROVENANCE'}
              </span>
            </div>
            <span className="text-lg font-mono font-bold text-amber-800">
              data.gov.in • Agmarknet
            </span>
          </div>

          <p className="font-semibold text-amber-900 leading-relaxed text-base">
            {lang === 'ta' 
              ? 'மத்திய வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகத்தின் சந்தைப்படுத்தல் & ஆய்வு இயக்குநரகம் (DMI) வெளியிட்டுள்ள தமிழ்நாடு மண்டிகளின் அதிகாரப்பூர்வ தினசரி விலை தரவுதளம்.'
              : 'Official daily mandi wholesale price feed from Directorate of Marketing & Inspection (DMI), Ministry of Agriculture & Farmers Welfare, Government of India.'}
          </p>

          <div className="flex items-start space-x-2 pt-1 text-base font-bold text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              {lang === 'ta' 
                ? '⚠ AI மதிப்பீடு — உத்தரவாதமான விலை அல்ல. சரிபார்க்கப்பட்ட வாங்குபவருடன் நேரடி ஒப்பந்தத்தின் மூலம் இறுதி விலை உறுதிசெய்யப்படும்.'
                : '⚠ AI estimate — not a guaranteed selling price. Final contract is confirmed directly with verified buyer upon vehicle dispatch.'}
            </span>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={() => setFlowStep(1)}
            className="px-5 py-3.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>

          <button
            onClick={() => setFlowStep(3)}
            className="flex-1 py-4 px-6 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white border-2 border-[#14532d] text-white font-black text-lg  shadow-lg shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>{lang === 'ta' ? 'வாங்குபவர் பொருத்தத்திற்கு செல் →' : 'CONNECT VERIFIED BUYERS →'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
