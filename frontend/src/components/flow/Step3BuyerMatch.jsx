import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { getCropDisplayName, getLocationDisplayName } from '../../data/mockData';
import { 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  MapPin
} from 'lucide-react';

export const Step3BuyerMatch = () => {
  const { 
    t, 
    lang, 
    setFlowStep, 
    selectedCrop, 
    customQty, 
    customLocation, 
    selectedBuyer, 
    setSelectedBuyer 
  } = useAgri();
  
  const crop = selectedCrop;
  const buyers = crop.matchedBuyers;

  const handleSelectBuyer = (buyer) => {
    setSelectedBuyer(buyer);
  };

  const handleContinue = () => {
    setFlowStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-agri-700 px-5 py-3 rounded-md text-base font-black  mb-2 border border-emerald-200">
          <span>{t.step03Pill}</span>
          <span>•</span>
          <span>Step 3 of 6</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight ">
          {t.step03Title}
        </h1>
        <p className="text-base sm:text-lg font-bold text-agri-700 mt-1">
          {crop.icon} {getCropDisplayName(crop.name, lang)} • {customQty.toLocaleString()} {lang === 'ta' ? 'கிலோ இருப்பு' : 'KG Available'} •  {getLocationDisplayName(customLocation, lang)}
        </p>
      </div>

      {/* Buyer Cards List */}
      <div className="space-y-4">
        {buyers.map((buyer) => {
          const isSelected = selectedBuyer?.id === buyer.id;

          return (
            <div
              key={buyer.id}
              onClick={() => handleSelectBuyer(buyer)}
              className={`bg-white rounded-lg p-6 border-2 cursor-pointer transition-all shadow-md ${
                isSelected
                  ? 'border-agri-500 bg-emerald-50/20 ring-1 ring-agri-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <Building2 className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base sm:text-lg font-black text-[#0F172A]">
                        {lang === 'ta' && buyer.tamilName ? buyer.tamilName : buyer.name}
                      </h3>
                      <span className="text-[9px] font-black  px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                        {t.demoBuyerBadge}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-base text-slate-500 font-semibold mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lang === 'ta' ? 'இடம்' : 'Location'}: {lang === 'ta' && buyer.tamilLocation ? buyer.tamilLocation : getLocationDisplayName(buyer.location, lang)}</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span className="text-base font-bold text-agri-700 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-agri-500 animate-pulse"></span>
                    <span>{lang === 'ta' ? 'தேவை உள்ளது' : 'Requirement Available'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectBuyer(buyer);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-base font-black  transition-all ${
                      isSelected
                        ? 'bg-agri-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (lang === 'ta' ? '✓ தேர்ந்தெடுக்கப்பட்டது' : '✓ SELECTED') : t.selectBuyerBtn}
                  </button>
                </div>
              </div>

              {/* Requirement & Transparent Matching Factors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <span className="text-lg  font-bold text-slate-400 block mb-1">
                    {lang === 'ta' ? 'தேவைப்படும் அளவு' : 'Required Quantity'}
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl font-black text-slate-900">
                      {buyer.requirementQty.toLocaleString()}
                    </span>
                    <span className="text-base font-bold text-slate-500">
                      {lang === 'ta' ? 'கிலோ தேவை' : 'KG Required'}
                    </span>
                  </div>
                  <p className="text-base text-agri-600 font-extrabold mt-1">
                    {lang === 'ta' ? 'உத்தேச விலை:' : 'Indicative Rate:'} ₹{buyer.targetPrice || 34}/{lang === 'ta' ? 'கிலோ' : 'KG'}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-1.5">
                  <span className="text-lg  font-bold text-slate-400 block mb-1">
                    {lang === 'ta' ? 'வெளிப்படையான பொருத்தம் அளவுகோல்கள்' : 'Transparent Matching Criteria'}
                  </span>
                  
                  <div className="flex items-center space-x-2 text-base font-bold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-agri-500 shrink-0" />
                    <span>{t.matchFactor1}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-base font-bold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-agri-500 shrink-0" />
                    <span>{t.matchFactor2}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-base font-bold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-agri-500 shrink-0" />
                    <span>{t.matchFactor3}</span>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white border-2 border-[#14532d] text-white font-black text-base shadow-lg shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
        >
          <span>{t.selectAndPromoteBtn}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setFlowStep(2)}
          className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          onClick={() => setFlowStep(4)}
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center space-x-2 transition-colors"
        >
          <span>{lang === 'ta' ? 'AI + n8n விளம்பரத்திற்கு செல்லவும்' : 'Continue to AI + n8n Promotion'}</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

    </div>
  );
};
