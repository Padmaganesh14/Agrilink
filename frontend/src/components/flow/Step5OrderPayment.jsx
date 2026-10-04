import React, { useState } from 'react';
import { useAgri } from '../../context/AgriContext';
import { getCropDisplayName, getLocationDisplayName } from '../../data/mockData';
import { 
  ArrowRight, 
  ArrowLeft, 
  MessageSquare, 
  MapPin, 
  Building2, 
  CreditCard,
  ExternalLink,
  Truck
} from 'lucide-react';

export const Step5OrderPayment = () => {
  const { 
    t, 
    lang, 
    setFlowStep, 
    selectedCrop, 
    customQty, 
    customLocation,
    selectedBuyer,
    order 
  } = useAgri();

  const [whatsappSent, setWhatsappSent] = useState(false);

  const pricePerKg = selectedBuyer?.targetPrice || selectedCrop.bestMarket?.price || selectedCrop.localPrice || 35;
  const totalValue = pricePerKg * customQty;
  const cropDisplay = getCropDisplayName(selectedCrop.name, lang);
  const locationDisplay = getLocationDisplayName(customLocation, lang);
  const buyerName = lang === 'ta' && selectedBuyer?.tamilName ? selectedBuyer.tamilName : (selectedBuyer?.name || 'Koyambedu Wholesale Mart');

  const handleOpenWhatsApp = () => {
    setWhatsappSent(true);
    const messageEn = `Hello ${buyerName}, this is Farmer Ramanathan via AgriLink AI regarding Order #${order.orderId} (${selectedCrop.name} - ${customQty.toLocaleString()} KG). Rate agreed at ₹${pricePerKg}/KG (Total ₹${totalValue.toLocaleString()}). Ready for payment coordination before vehicle dispatch.`;
    const messageTa = `வணக்கம் ${buyerName}, AgriLink AI தளம் மூலம் விவசாயி ராமநாதன் பேசுகிறேன். ஆர்டர் #${order.orderId} (${cropDisplay} - ${customQty.toLocaleString()} கிலோ) தொடர்பாக ஒப்புக்கொண்ட விலை ₹${pricePerKg}/கிலோ (மொத்தம் ₹${totalValue.toLocaleString()}). வாகனம் ஏற்றுவதற்கு முன் முன்பணம் ஒருங்கிணைப்பை உறுதிசெய்யவும்.`;
    const message = lang === 'ta' ? messageTa : messageEn;
    const waUrl = `https://wa.me/919443122810?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-agri-700 px-5 py-3 rounded-md text-base font-black  mb-2 border border-emerald-200">
          <span>{t.step05Pill}</span>
          <span>•</span>
          <span>{lang === 'ta' ? 'படி 5 / 6' : 'Step 5 of 6'}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight ">
          {t.step05Title}
        </h1>
        <p className="text-base sm:text-lg font-medium text-slate-500 mt-1">
          {lang === 'ta' ? 'B2B கொள்முதல் ஆர்டர் பதிவு செய்யப்பட்டது. வாகனம் புறப்படும் முன் முன்பண விதிமுறைகளை ஒருங்கிணைக்கவும்.' : 'B2B purchase order registered. Coordinate payment terms before vehicle dispatch.'}
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center space-x-3.5">
            <span className="text-4xl">{selectedCrop.icon}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-[#0F172A]">
                  {cropDisplay}
                </h2>
                <span className="px-4 py-2 rounded-md text-lg font-black  bg-emerald-100 text-agri-800 border border-emerald-200">
                  {lang === 'ta' ? 'ஆர்டர்' : 'ORDER'} #{order.orderId}
                </span>
              </div>
              <p className="text-base font-bold text-slate-500 mt-0.5">
                {customQty.toLocaleString()} {lang === 'ta' ? 'கிலோ' : 'KG'} • {lang === 'ta' ? 'விலை:' : 'Rate:'} ₹{pricePerKg} / {lang === 'ta' ? 'கிலோ' : 'KG'}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
            <p className="text-lg  font-bold text-slate-400">
              {lang === 'ta' ? 'மொத்த ஆர்டர் மதிப்பு' : 'Total Order Value'}
            </p>
            <p className="text-2xl sm:text-3xl font-black text-agri-600">
              ₹{totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Counterparty summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80">
            <div className="flex items-center space-x-1.5 text-slate-500 text-base font-bold  mb-1">
              <MapPin className="w-3.5 h-3.5 text-agri-500" />
              <span>{lang === 'ta' ? 'விற்பனையாளர் (தோட்டம்)' : 'Seller (Farm Gate)'}</span>
            </div>
            <p className="font-extrabold text-slate-900 text-lg">
              {lang === 'ta' ? 'ராமநாதன் (விவசாயி)' : 'Ramanathan'}
            </p>
            <p className="text-base text-slate-500 font-medium">
              {locationDisplay} {lang === 'ta' ? 'தோட்டம் • தமிழ்நாடு' : 'Farm • Tamil Nadu'}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80">
            <div className="flex items-center space-x-1.5 text-slate-500 text-base font-bold  mb-1">
              <Building2 className="w-3.5 h-3.5 text-ai-600" />
              <span>{lang === 'ta' ? 'மொத்த கொள்முதல் வியாபாரி' : 'Wholesale Buyer'}</span>
            </div>
            <p className="font-extrabold text-slate-900 text-lg">
              {buyerName}
            </p>
            <p className="text-base text-slate-500 font-medium">
              {lang === 'ta' ? 'இடம்' : 'Location'}: {getLocationDisplayName(selectedBuyer?.location || 'Chennai', lang)}
            </p>
          </div>
        </div>

        {/* Payment Coordination Card */}
        <div className="bg-amber-50/70 border-2 border-amber-300 rounded-lg p-6 space-y-4">
          
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-amber-700" />
              <h3 className="text-lg font-black  text-amber-950">
                {t.paymentCoordinationTitle}
              </h3>
            </div>
            <span className="text-lg font-black  px-2 py-0.5 rounded bg-amber-200 text-amber-900 border border-amber-300 font-mono">
              MVP WORKFLOW
            </span>
          </div>

          <div className="text-base text-amber-950 leading-relaxed font-medium">
            <p className="font-bold text-amber-950 text-lg mb-1">
              {t.currentMvpPaymentNotice}
            </p>
            <p className="text-amber-800">
              AgriLink AI facilitates direct coordination between farmer and buyer to confirm advance payment terms and vehicle loading schedules before transit.
            </p>
          </div>

          <div className="pt-1">
            <button
              onClick={handleOpenWhatsApp}
              className={`w-full py-3.5 px-4 rounded-lg font-black text-base  shadow-sm flex items-center justify-center space-x-2 transition-all ${
                whatsappSent
                  ? 'bg-agri-700 text-white'
                  : 'bg-[#166534] hover:bg-[#14532d] text-white border-2 border-[#14532d] text-white hover:scale-[1.01]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                {whatsappSent
                  ? '✓ WhatsApp Coordination Chat Opened'
                  : t.openWhatsAppPaymentBtn}
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>

          <div className="pt-2 border-t border-amber-200/60 flex items-center space-x-2 text-base text-amber-800 font-semibold">
            <CreditCard className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>{t.futureEscrowNotice}</span>
          </div>

        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setFlowStep('transport')}
            className="w-full py-4 px-6 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white border-2 border-[#14532d] text-white font-black text-base shadow-lg shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <Truck className="w-5 h-5 text-emerald-200" />
            <span>{t.confirmArrangeTransportBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setFlowStep(4)}
          className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          onClick={() => setFlowStep('transport')}
          className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center space-x-2 transition-colors"
        >
          <span>Continue to Arrange Transport</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

    </div>
  );
};
