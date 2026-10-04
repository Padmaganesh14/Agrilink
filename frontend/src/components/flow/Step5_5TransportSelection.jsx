import React from "react";
import { useAgri } from "../../context/AgriContext";
import {
  transportPartners,
  getCropDisplayName,
  getLocationDisplayName,
} from "../../data/mockData";
import {
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export const Step5_5TransportSelection = () => {
  const {
    t,
    lang,
    setFlowStep,
    selectedCrop,
    customQty,
    customLocation,
    selectedBuyer,
    selectedTransport,
    chooseTransport,
  } = useAgri();

  const handleSelectPartner = (partner) => {
    chooseTransport(partner);
  };

  const handleConfirmAndTrack = () => {
    setFlowStep(6);
  };

  const cropDisplay = getCropDisplayName(selectedCrop.name, lang);
  const locationDisplay = getLocationDisplayName(customLocation, lang);
  const buyerLocation = getLocationDisplayName(
    selectedBuyer?.location || "Chennai",
    lang,
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-agri-700 px-5 py-3 rounded-md text-base font-black  mb-2 border border-emerald-200">
          <Truck className="w-3.5 h-3.5 text-agri-500" />
          <span>
            {lang === "ta"
              ? "போக்குவரத்து நிறுவன தேர்வு"
              : "Transport Partner Selection"}
          </span>
          <span>•</span>
          <span>{lang === "ta" ? "படி 5B / 6" : "Step 5B of 6"}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight ">
          {t.arrangeTransportTitle}
        </h1>
        <p className="text-base sm:text-lg font-bold text-slate-500 mt-1">
          {cropDisplay} • {customQty.toLocaleString()}{" "}
          {lang === "ta" ? "கிலோ" : "KG"} | {locationDisplay} &rarr;{" "}
          {buyerLocation}
        </p>
      </div>

      {/* 3 Transport Cards */}
      <div className="space-y-4">
        {transportPartners.map((partner) => {
          const isSelected = selectedTransport?.id === partner.id;

          return (
            <div
              key={partner.id}
              onClick={() => handleSelectPartner(partner)}
              className={`bg-white rounded-lg p-6 border-2 cursor-pointer transition-all shadow-md ${
                isSelected
                  ? "border-agri-500 bg-emerald-50/20 ring-1 ring-agri-500/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                    <Truck className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-black text-[#0F172A]">
                        {lang === "ta" ? partner.tamilName : partner.name}
                      </h3>
                    </div>
                    <p className="text-base text-slate-500 font-bold mt-0.5">
                      {partner.vehicle} • {partner.capacityText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span className="text-base font-bold text-agri-600 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-agri-500 animate-pulse"></span>
                    <span> {lang === "ta" ? "கிடைக்கும்" : "Available"}</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPartner(partner);
                    }}
                    className={`px-6 py-4 rounded-lg text-base font-black  transition-all ${
                      isSelected
                        ? "bg-agri-500 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {isSelected
                      ? lang === "ta"
                        ? "✓ தேர்ந்தெடுக்கப்பட்டது"
                        : "✓ SELECTED"
                      : t.selectTransportBtn}
                  </button>
                </div>
              </div>

              {/* Specs & Pricing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-base">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-lg  font-bold block">
                    {lang === "ta" ? "வாகனம்" : "Vehicle"}
                  </span>
                  <span className="font-extrabold text-slate-800">
                    {partner.vehicle}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-lg  font-bold block">
                    {lang === "ta" ? "கொள்ளளவு" : "Capacity"}
                  </span>
                  <span className="font-extrabold text-slate-800">
                    {partner.capacityKg.toLocaleString()}{" "}
                    {lang === "ta" ? "கிலோ" : "KG"}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-lg  font-bold block">
                    {t.estimatedTransportCostLabel}
                  </span>
                  <span className="font-black text-agri-600">
                    ₹{partner.estimatedCost.toLocaleString()}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-lg  font-bold block">
                    {lang === "ta" ? "பயண நேரம்" : "ETA"}
                  </span>
                  <span className="font-extrabold text-slate-800">
                    {lang === "ta"
                      ? "~6 மணிநேரம் (NH45 வழித்தடம்)"
                      : partner.eta}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Transport Summary Confirmation Card */}
      {selectedTransport && (
        <div className="bg-emerald-50/90 border-2 border-agri-500 rounded-lg p-6 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 text-agri-800 border-b border-emerald-200 pb-3">
            <CheckCircle2 className="w-5 h-5 text-agri-600 shrink-0" />
            <h3 className="text-lg font-black ">{t.transportSelectedBanner}</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-base text-agri-950 font-bold">
            <div>
              <span className="text-agri-600 text-lg  block">
                {lang === "ta" ? "போக்குவரத்து நிறுவனம்" : "Carrier"}
              </span>
              <span>
                {lang === "ta" && selectedTransport.tamilName
                  ? selectedTransport.tamilName
                  : selectedTransport.name}
              </span>
            </div>
            <div>
              <span className="text-agri-600 text-lg  block">
                {lang === "ta" ? "வாகனம்" : "Vehicle"}
              </span>
              <span>{selectedTransport.vehicle}</span>
            </div>
            <div>
              <span className="text-agri-600 text-lg  block">
                {lang === "ta" ? "உத்தேச கட்டணம்" : "Estimated Freight"}
              </span>
              <span className="text-agri-800 font-black">
                ₹{selectedTransport.estimatedCost.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-agri-600 text-lg  block">
                {lang === "ta" ? "புறப்பாடு / சேருமிடம்" : "Pickup / Delivery"}
              </span>
              <span>
                {locationDisplay} {lang === "ta" ? "தோட்டம்" : "Farm"} ➔{" "}
                {buyerLocation}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirmAndTrack}
            className="w-full py-4 px-6 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white border-2 border-[#14532d] text-white font-black text-base shadow-lg shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>{t.confirmStartTrackingBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setFlowStep(5)}
          className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          onClick={handleConfirmAndTrack}
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center space-x-2 transition-colors"
        >
          <span>Continue to Logistics & Track</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
