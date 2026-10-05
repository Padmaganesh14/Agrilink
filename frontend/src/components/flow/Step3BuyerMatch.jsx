import React, { useState } from "react";
import { useAgri } from "../../context/AgriContext";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  CheckCircle2,
  MapPin,
  ChevronDown,
  Phone,
  Package,
  IndianRupee,
} from "lucide-react";

export const Step3BuyerMatch = () => {
  const {
    t,
    lang,
    setFlowStep,
    selectedCrop,
    customQty,
    customLocation,
    selectedBuyer,
    setSelectedBuyer,
    marketIntelligence,
  } = useAgri();

  const intel = marketIntelligence || {};

  // Buyers come from Gemini AI response
  const buyers = intel.buyers || [];

  const [visibleCount, setVisibleCount] = useState(4);
  const visibleBuyers = buyers.slice(0, visibleCount);
  const hasMore = visibleCount < buyers.length;

  const handleSelectBuyer = (buyer) => {
    setSelectedBuyer(buyer);
  };

  const handleContinue = () => {
    if (!selectedBuyer) {
      alert("Please select a buyer to continue.");
      return;
    }
    setFlowStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-md text-base font-black mb-2 border border-emerald-200">
          <span>{t.step03Pill}</span>
          <span>•</span>
          <span>{"Step 3 of 6"}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
          {t.step03Title}
        </h1>
        <p className="text-base sm:text-lg font-bold text-emerald-700 mt-1">
          {selectedCrop.name} &bull; {Number(customQty).toLocaleString()} KG
          &bull; {customLocation}
        </p>
        {buyers.length > 0 && (
          <p className="text-sm text-slate-500 mt-1">
            {buyers.length} buyers matched for your crop
          </p>
        )}
      </div>

      {/* No buyers state */}
      {buyers.length === 0 && (
        <div className="bg-white rounded-lg p-8 border border-slate-200 text-center space-y-3">
          <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-base font-bold text-slate-600">
            No buyers found yet.
          </p>
          <p className="text-sm text-slate-400">
            Go back and generate market intelligence first.
          </p>
          <button
            onClick={() => setFlowStep(2)}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-bold text-sm"
          >
            Back to Market Analysis
          </button>
        </div>
      )}

      {/* Buyer Cards */}
      <div className="space-y-4">
        {visibleBuyers.map((buyer, idx) => {
          const buyerId = buyer.id || `buyer-${idx}`;
          const isSelected =
            selectedBuyer?.id === buyerId || selectedBuyer?.name === buyer.name;

          return (
            <div
              key={buyerId}
              onClick={() => handleSelectBuyer({ ...buyer, id: buyerId })}
              className={`bg-white rounded-lg p-6 border-2 cursor-pointer transition-all shadow-md ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                    <Building2 className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base sm:text-lg font-black text-[#0F172A]">
                        {buyer.name}
                      </h3>
                      {buyer.businessType && (
                        <span className="text-[9px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {buyer.businessType}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-500 font-semibold mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{buyer.address || buyer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Status + Select */}
                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span className="text-sm font-bold text-emerald-700 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active Requirement</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectBuyer({ ...buyer, id: buyerId });
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-black transition-all ${
                      isSelected
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {isSelected ? "✓ SELECTED" : t.selectBuyerBtn}
                  </button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-400 block">
                    Requirement
                  </span>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-slate-500" />
                    <span className="text-lg font-black text-slate-900">
                      {Number(buyer.requirementQty).toLocaleString()} KG
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <span className="text-base font-extrabold text-emerald-700">
                      ₹{buyer.targetPrice}/KG indicative rate
                    </span>
                  </div>
                  {buyer.contactType && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-500 font-semibold">
                        {buyer.contactType}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 block">
                    Match Criteria
                  </span>
                  {(
                    buyer.matchHighlights || [
                      "Volume compatible",
                      "Destination compatible",
                      "Crop requirement",
                    ]
                  ).map((h, hi) => (
                    <div
                      key={hi}
                      className="flex items-center space-x-2 text-sm font-bold text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                  {buyer.paymentTerms && (
                    <p className="text-xs text-slate-500 mt-2 border-t border-slate-200 pt-2">
                      {buyer.paymentTerms}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      {hasMore && (
        <button
          onClick={() => setVisibleCount((c) => c + 4)}
          className="w-full py-3 rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-400 text-slate-600 hover:text-emerald-700 font-bold text-sm flex items-center justify-center space-x-2 transition-all"
        >
          <ChevronDown className="w-4 h-4" />
          <span>
            Show {Math.min(4, buyers.length - visibleCount)} more buyers
          </span>
        </button>
      )}

      {/* Primary Action */}
      {buyers.length > 0 && (
        <div className="pt-2">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white font-black text-base shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>{t.selectAndPromoteBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setFlowStep(2)}
          className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>
        <button
          onClick={() => setFlowStep(4)}
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center space-x-2 transition-colors"
        >
          <span>Continue to AI Promotion</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
