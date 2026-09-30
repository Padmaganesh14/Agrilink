import React, { useEffect, useRef } from 'react';
import { useAgri } from '../../context/AgriContext';
import { routeCoordinates, getCropDisplayName, getLocationDisplayName } from '../../data/mockData';
import L from 'leaflet';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  ArrowLeft, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const Step6LogisticsTracking = () => {
  const { 
    t, 
    lang, 
    setCurrentView,
    setFlowStep, 
    order, 
    advanceOrderStage, 
    resetDemo, 
    selectedCrop,
    customQty,
    selectedTransport,
    selectedBuyer 
  } = useAgri();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const isFinalStage = order.stages[order.stages.length - 1].done;
  const transport = selectedTransport || order.transport;
  const buyer = selectedBuyer || { name: 'Koyambedu Wholesale Mart', location: 'Chennai' };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [11.93, 79.48],
        zoom: 7,
        zoomControl: false,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      // Route Polyline
      const polyline = L.polyline(routeCoordinates, {
        color: '#0B8F62',
        weight: 6,
        opacity: 0.9,
        dashArray: '10, 10'
      }).addTo(map);

      const createEmojiIcon = (emoji, bg) => L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background-color: ${bg}; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid white;">${emoji}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      // Trichy Origin Marker
      L.marker([10.7905, 78.7047], {
        icon: createEmojiIcon('📍', '#14532D')
      }).addTo(map).bindPopup('<b>Trichy Farm Gate</b><br>Origin');

      // Chennai Destination Marker
      L.marker([13.0694, 80.1948], {
        icon: createEmojiIcon('🏢', '#0F172A')
      }).addTo(map).bindPopup('<b>Chennai Koyambedu Terminal</b><br>Destination');

      // Moving Truck Marker
      L.marker([11.9398, 79.4897], {
        icon: createEmojiIcon('🚚', '#d97706')
      }).addTo(map).bindPopup(`<b>${transport.name}</b><br>Vehicle: ${transport.vehicle}<br>NH45 Highway`);

      map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

    } catch (err) {
      console.warn('Map initialization notice:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [transport]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-agri-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-emerald-200">
          <Truck className="w-3.5 h-3.5 text-agri-500" />
          <span>{t.step06Pill}</span>
          <span>•</span>
          <span>{lang === 'ta' ? 'படி 6 / 6' : 'Step 6 of 6'}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight uppercase">
          {t.step06Title}
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
          {lang === 'ta' ? 'திருச்சி பண்ணை முதல் சென்னை கோயம்பேடு வரையிலான நேரலை நெடுஞ்சாலை போக்குவரத்து கண்காணிப்பு.' : 'Real-time highway transit visualization from Trichy Farm Gate to Chennai Koyambedu.'}
        </p>
      </div>

      {/* Premium Split Layout: Left Map + Right Order Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: OpenStreetMap Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                {lang === 'ta' ? 'திருச்சி ➔ சென்னை வழித்தடம்' : 'TRICHY ➔ CHENNAI ROUTE'}
              </span>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                {t.simulatedDemoTrackingBadge}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-agri-700">
              🟢 {t.inTransitBadge}
            </span>
          </div>

          {/* Map Container */}
          <div className="relative h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
            <div ref={mapContainerRef} className="w-full h-full" />

            <div className="absolute top-3 left-3 z-[400] bg-[#0F172A]/90 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700 text-xs space-y-1">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-agri-400 animate-ping"></span>
                <span className="font-black text-agri-400 uppercase tracking-wider text-[10px]">
                  {lang === 'ta' ? 'நெடுஞ்சாலை தொலை அளவீடு' : 'Highway Telemetry'}
                </span>
              </div>
              <p className="font-bold text-slate-100 text-xs">
                {lang === 'ta' ? 'இணைப்பு மையம்: விழுப்புரம் (NH45)' : 'Node: Villupuram (NH45)'}
              </p>
              <p className="text-[10px] text-slate-400">
                {lang === 'ta' ? 'வழித்தடம்: 330 கி.மீ • ~6 மணிநேரம்' : 'Corridor: 330 KM • ~6 Hours'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
            <span>{lang === 'ta' ? 'தூரம்:' : 'Distance:'} <b className="text-slate-800">330 KM</b></span>
            <span>{lang === 'ta' ? 'நேரம்:' : 'Duration:'} <b className="text-slate-800">{lang === 'ta' ? '~6 மணிநேரம்' : '~6 Hours'}</b></span>
            <span>{lang === 'ta' ? 'வேகம்:' : 'Speed:'} <b className="text-agri-600">52 km/h</b></span>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Specs & 7-Stage Timeline */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {lang === 'ta' ? 'பரிவர்த்தனை' : 'Transaction'}
                </span>
                <h3 className="text-base font-black text-[#0F172A]">
                  {lang === 'ta' ? 'ஆர்டர்' : 'ORDER'} #{order.orderId}
                </h3>
              </div>

              <button
                onClick={advanceOrderStage}
                className="px-3 py-1.5 rounded-xl bg-agri-500 hover:bg-agri-600 text-white font-black text-[11px] uppercase tracking-wider shadow-xs flex items-center space-x-1.5 transition-all"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{t.advanceStageBtn}</span>
              </button>
            </div>

            {/* Spec lines */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-bold">{lang === 'ta' ? 'பயிர் விவரம்:' : 'Crop Lot:'}</span>
                <span className="font-black text-slate-900">{getCropDisplayName(selectedCrop.name, lang)} • {customQty.toLocaleString()} {lang === 'ta' ? 'கிலோ' : 'KG'}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-bold">{lang === 'ta' ? 'வாங்குபவர்:' : 'Buyer:'}</span>
                <span className="font-black text-slate-900">{buyer.name}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-bold">{lang === 'ta' ? 'போக்குவரத்து:' : 'Transport:'}</span>
                <span className="font-black text-agri-600">{transport.name} ({transport.vehicle})</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-bold">{lang === 'ta' ? 'சரக்கு கட்டணம்:' : 'Freight Fee:'}</span>
                <span className="font-black text-slate-900">₹{transport.estimatedCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Vertical 7-Stage Timeline */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                {lang === 'ta' ? 'ஆர்டர் வாழ்க்கைச் சுழற்சி காலவரிசை' : 'Order Lifecycle Timeline'}
              </span>

              {order.stages.map((stage) => {
                const label = t[stage.key] || stage.key;
                return (
                  <div
                    key={stage.id}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                      stage.done
                        ? 'bg-emerald-50 text-agri-800 font-bold'
                        : stage.current
                        ? 'bg-blue-50 text-blue-900 font-black ring-1 ring-blue-300'
                        : 'text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {stage.done ? (
                        <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0" />
                      ) : stage.current ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse ml-0.5 mr-1"></span>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300 ml-1 mr-1"></span>
                      )}
                      <span className="text-[11px] uppercase">{label}</span>
                    </div>

                    <span className="text-[10px] opacity-70 font-mono">{stage.time}</span>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* FINAL SUCCESS STATE: SALE IN MOTION Banner */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-black uppercase text-agri-400">
                {t.saleInMotionTitle}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-950 text-agri-300 border border-emerald-500/40">
                {lang === 'ta' ? 'சரிபார்க்கப்பட்ட B2B பரிமாற்றம்' : 'Verified B2B Transition'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t.saleInMotionSub}
            </p>
          </div>

          <button
            onClick={resetDemo}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors self-start sm:self-auto border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetDemoBtn}</span>
          </button>
        </div>

        {/* 4 Final Checkpoints */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 bg-slate-850/80 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">{lang === 'ta' ? 'வாங்குபவர் நிலை' : 'Buyer Status'}</span>
            <span className="font-black text-emerald-400 mt-1 block">{lang === 'ta' ? 'வாங்குபவர் உறுதி செய்தார் ✓' : 'Buyer Confirmed ✓'}</span>
          </div>

          <div className="p-3 bg-slate-850/80 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">{lang === 'ta' ? 'பணம் செலுத்தும் நிலை' : 'Payment Status'}</span>
            <span className="font-black text-amber-300 mt-1 block">{lang === 'ta' ? 'ஒருங்கிணைக்கப்பட்டது ✓' : 'Coordinated ✓'}</span>
          </div>

          <div className="p-3 bg-slate-850/80 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">{lang === 'ta' ? 'போக்குவரத்து நிலை' : 'Transport Status'}</span>
            <span className="font-black text-emerald-400 mt-1 block">{lang === 'ta' ? 'உறுதி செய்யப்பட்டது ✓' : 'Confirmed ✓'}</span>
          </div>

          <div className="p-3 bg-slate-850/80 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">{lang === 'ta' ? 'டெலிவரி நிலை' : 'Delivery Status'}</span>
            <span className="font-black text-blue-400 mt-1 block">{lang === 'ta' ? 'கண்காணிப்பு செயலில் உள்ளது ✓' : 'Tracking Active ✓'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setFlowStep('transport')}
          className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          onClick={() => setCurrentView('command-center')}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 transition-colors"
        >
          <span>{lang === 'ta' ? 'கட்டுப்பாட்டு மையத்திற்குத் திரும்பு' : 'Return to Command Center'}</span>
          <ChevronRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

    </div>
  );
};
