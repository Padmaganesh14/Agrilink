import React, { useEffect, useRef, useState } from "react";
import { useAgri } from "../../context/AgriContext";
import {
  getCropDisplayName,
  getLocationDisplayName,
} from "../../data/mockData";
import { api } from "../../services/api";
import L from "leaflet";
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
  ShieldAlert,
} from "lucide-react";

export const Step6LogisticsTracking = () => {
  const {
    t,
    lang,
    setCurrentView,
    setFlowStep,
    customLocation,
    selectedTransport,
    selectedBuyer,
    activeOrderId,
    userRole,
  } = useAgri();

  const [orderData, setOrderData] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeOrderId) {
      setIsLoading(true);
      Promise.all([
        api.getOrder(activeOrderId).catch(() => ({ success: false })),
        api.getTracking(activeOrderId).catch(() => ({ success: false })),
      ]).then(([orderRes, trackRes]) => {
        if (orderRes.success) setOrderData(orderRes.order);
        if (trackRes.success) {
          setTrackingData(trackRes.tracking);
        } else if (orderRes.success) {
          // If order exists but no tracking, farmer hasn't assigned transport yet
          setTrackingData({
            status: "Awaiting Dispatch",
            origin: orderRes.order.pickupLocation,
            destination: orderRes.order.deliveryLocation,
            currentCheckpoint: "Farm",
            distanceKm: 0,
            etaHours: 0,
          });
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [activeOrderId]);

  const transport = {
    name: orderData?.transportName || selectedTransport?.name || "Transport",
    vehicle:
      orderData?.transportVehicle || selectedTransport?.vehicle || "Vehicle",
    estimatedCost:
      orderData?.transportCost || selectedTransport?.estimatedCost || 0,
  };
  const buyer = {
    name: orderData?.buyerName || selectedBuyer?.name || "Buyer",
    location: orderData?.buyerLocation || selectedBuyer?.location || "Chennai",
  };

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initMap = async () => {
      try {
        const map = L.map(mapContainerRef.current, {
          center: [11.1271, 78.6569], // Tamil Nadu center
          zoom: 7,
          zoomControl: false,
          attributionControl: false,
        });

        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
        }).addTo(map);

        const createEmojiIcon = (emoji, bg) =>
          L.divIcon({
            className: "custom-map-pin",
            html: `<div style="background-color: ${bg}; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid white;">${emoji}</div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          });

        // 1. Geocode Origin and Destination
        const fetchCoordinates = async (query) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ", Tamil Nadu, India")}&format=json&limit=1`,
            );
            const data = await res.json();
            if (data && data.length > 0) {
              return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            }
          } catch (e) {
            console.warn("Geocoding failed for", query);
          }
          return null;
        };

        const origin = customLocation || "Trichy";
        const destination = buyer.location || "Chennai";

        const [originCoords, destCoords] = await Promise.all([
          fetchCoordinates(origin),
          fetchCoordinates(destination),
        ]);

        const oCoords = originCoords || [10.7905, 78.7047]; // fallback Trichy
        const dCoords = destCoords || [13.0694, 80.1948]; // fallback Chennai

        // Origin Marker
        L.marker(oCoords, {
          icon: createEmojiIcon("", "#14532D"),
        })
          .addTo(map)
          .bindPopup(`<b>${origin} Farm Gate</b><br>Origin`);

        // Destination Marker
        L.marker(dCoords, {
          icon: createEmojiIcon("", "#0F172A"),
        })
          .addTo(map)
          .bindPopup(`<b>${buyer.name}</b><br>Destination`);

        // 2. Fetch Route from OSRM
        try {
          // OSRM format: lon,lat
          const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${oCoords[1]},${oCoords[0]};${dCoords[1]},${dCoords[0]}?overview=full&geometries=geojson`;
          const routeRes = await fetch(osrmUrl);
          const routeData = await routeRes.json();

          if (routeData.routes && routeData.routes.length > 0) {
            const coords = routeData.routes[0].geometry.coordinates.map((c) => [
              c[1],
              c[0],
            ]); // GeoJSON is lon,lat -> Leaflet needs lat,lon

            const polyline = L.polyline(coords, {
              color: "#0B8F62",
              weight: 6,
              opacity: 0.9,
              dashArray: "10, 10",
            }).addTo(map);

            map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

            // Place truck in the middle of the route
            const midIndex = Math.floor(coords.length / 2);
            const truckCoords = coords[midIndex];

            L.marker(truckCoords, {
              icon: createEmojiIcon("", "#d97706"),
            })
              .addTo(map)
              .bindPopup(
                `<b>${transport.name}</b><br>Vehicle: ${transport.vehicle}<br>En route`,
              );
          }
        } catch (e) {
          console.warn("Routing failed", e);
        }
      } catch (err) {
        console.warn("Map initialization notice:", err);
      }
    };

    if (!isLoading && orderData) {
      initMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [
    transport.name,
    transport.vehicle,
    buyer.name,
    buyer.location,
    customLocation,
    isLoading,
    orderData,
  ]);

  if (isLoading) {
    return (
      <div className="text-center py-20 text-slate-500 font-bold">
        Loading Tracking Details...
      </div>
    );
  }

  if (!orderData || !trackingData) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Failed to load tracking data. Please return to the previous step.
        <br />
        <button
          onClick={() => {
            if (userRole === "buyer") {
              setCurrentView("buyer-marketplace");
            } else {
              setFlowStep(5);
            }
          }}
          className="mt-4 px-4 py-2 bg-slate-200 text-slate-800 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-agri-700 px-5 py-3 rounded-md text-base font-black  mb-2 border border-emerald-200">
          <Truck className="w-3.5 h-3.5 text-agri-500" />
          <span>{t.step06Pill}</span>
          <span>•</span>
          <span>{lang === "ta" ? "படி 6 / 6" : "Step 6 of 6"}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight ">
          {t.step06Title}
        </h1>
        <p className="text-base sm:text-lg font-medium text-slate-500 mt-1">
          {lang === "ta"
            ? "திருச்சி பண்ணை முதல் சென்னை கோயம்பேடு வரையிலான நேரலை நெடுஞ்சாலை போக்குவரத்து கண்காணிப்பு."
            : "Real-time highway transit visualization from Trichy Farm Gate to Chennai Koyambedu."}
        </p>
      </div>

      {/* Premium Split Layout: Left Map + Right Order Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: OpenStreetMap Card */}
        <div className="lg:col-span-7 bg-white rounded-lg p-5 border border-slate-200/90 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-base font-black text-slate-800 ">
                {lang === "ta"
                  ? "திருச்சி ➔ சென்னை வழித்தடம்"
                  : "TRICHY ➔ CHENNAI ROUTE"}
              </span>
              <span className="text-[9px] font-black  px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                {t.simulatedDemoTrackingBadge}
              </span>
            </div>
            <span className="px-4 py-2 rounded-md text-lg font-black  bg-emerald-100 text-agri-700">
              {t.inTransitBadge}
            </span>
          </div>

          {/* Map Container */}
          <div className="relative h-80 w-full rounded-lg overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
            <div ref={mapContainerRef} className="w-full h-full" />

            <div className="absolute top-3 left-3 z-[400] bg-[#0F172A]/90 backdrop-blur-md text-white p-3 rounded-lg border border-slate-700 text-base space-y-1">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-agri-400 animate-ping"></span>
                <span className="font-black text-agri-400  text-lg">
                  {lang === "ta"
                    ? "நெடுஞ்சாலை தொலை அளவீடு"
                    : "Highway Telemetry"}
                </span>
              </div>
              <p className="font-bold text-slate-100 text-base">
                {lang === "ta"
                  ? "இணைப்பு மையம்: விழுப்புரம் (NH45)"
                  : "Node: Villupuram (NH45)"}
              </p>
              <p className="text-lg text-slate-400">
                {lang === "ta"
                  ? "வழித்தடம்: 330 கி.மீ • ~6 மணிநேரம்"
                  : "Corridor: 330 KM • ~6 Hours"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-base text-slate-500 font-medium pt-1">
            <span>
              {lang === "ta" ? "தூரம்:" : "Distance:"}{" "}
              <b className="text-slate-800">330 KM</b>
            </span>
            <span>
              {lang === "ta" ? "நேரம்:" : "Duration:"}{" "}
              <b className="text-slate-800">
                {lang === "ta" ? "~6 மணிநேரம்" : "~6 Hours"}
              </b>
            </span>
            <span>
              {lang === "ta" ? "வேகம்:" : "Speed:"}{" "}
              <b className="text-agri-600">52 km/h</b>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Specs & 7-Stage Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-lg p-6 border border-slate-200/90 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-lg font-black  text-slate-400">
                  {lang === "ta" ? "பரிவர்த்தனை" : "Transaction"}
                </span>
                <h3 className="text-base font-black text-[#0F172A]">
                  {lang === "ta" ? "ஆர்டர்" : "ORDER"} #{activeOrderId}
                </h3>
              </div>
            </div>

            {/* Spec lines (Invoice Details) */}
            <div className="space-y-2 text-base">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-bold">
                  {lang === "ta" ? "பயிர் விவரம்:" : "Crop Lot:"}
                </span>
                <span className="font-black text-slate-900 text-right">
                  {getCropDisplayName(orderData.crop, lang)} •{" "}
                  {orderData.quantityKg.toLocaleString()}{" "}
                  {lang === "ta" ? "கிலோ" : "KG"}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-bold">
                  {lang === "ta" ? "பயிர் மதிப்பு:" : "Crop Value:"}
                </span>
                <span className="font-black text-slate-900">
                  ₹{orderData.totalValue?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-bold">
                  {lang === "ta" ? "வாங்குபவர்:" : "Buyer:"}
                </span>
                <span className="font-black text-slate-900 text-right">
                  {buyer.name}
                  <br />
                  <span className="text-[10px] text-slate-500 uppercase">
                    {buyer.location}
                  </span>
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-bold">
                  {lang === "ta" ? "விற்பனையாளர்:" : "Seller:"}
                </span>
                <span className="font-black text-slate-900 text-right">
                  {orderData.pickupLocation} Farm
                  <br />
                  <span className="text-[10px] text-slate-500 uppercase">
                    {orderData.pickupLocation}
                  </span>
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-bold">
                  {lang === "ta" ? "போக்குவரத்து:" : "Transport:"}
                </span>
                <span className="font-black text-agri-600 text-right">
                  {transport.name}
                  <br />
                  <span className="text-[10px] uppercase">
                    Vehicle: {transport.vehicle}
                  </span>
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-bold">
                  {lang === "ta" ? "சரக்கு கட்டணம்:" : "Freight Fee:"}
                </span>
                <span className="font-black text-slate-900">
                  ₹{transport.estimatedCost?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-2 mt-2 bg-slate-50 px-3 rounded-lg border border-slate-200">
                <span className="text-slate-800 font-black">
                  {lang === "ta" ? "மொத்த தொகை:" : "Grand Total:"}
                </span>
                <span className="font-black text-emerald-700 text-xl">
                  ₹
                  {(
                    (orderData.totalValue || 0) + (transport.estimatedCost || 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Vertical Dynamic Timeline */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <span className="text-lg font-black text-slate-400 block mb-2">
                {lang === "ta" ? "ஆர்டர் நிலை" : "Order Status Timeline"}
              </span>

              {[
                {
                  id: "s1",
                  label: "Order Placed",
                  done: true,
                  current: false,
                },
                {
                  id: "s2",
                  label: "Transport Assigned",
                  done: trackingData.status !== "Awaiting Dispatch",
                  current: trackingData.status === "Awaiting Dispatch",
                },
                {
                  id: "s3",
                  label: "In Transit",
                  done: trackingData.status === "Delivered",
                  current: trackingData.status === "In Transit",
                },
                {
                  id: "s4",
                  label: "Delivered",
                  done: trackingData.status === "Delivered",
                  current: trackingData.status === "Delivered",
                },
              ].map((stage) => (
                <div
                  key={stage.id}
                  className={`flex items-center justify-between p-2 rounded-lg text-base transition-all ${
                    stage.done
                      ? "bg-emerald-50 text-agri-800 font-bold"
                      : stage.current
                        ? "bg-blue-50 text-blue-900 font-black ring-1 ring-blue-300"
                        : "text-slate-400"
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
                    <span className="text-base ">{stage.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FINAL SUCCESS STATE: SALE IN MOTION Banner */}
      <div className="bg-[#0F172A] text-white rounded-lg p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-black  text-agri-400">
                {t.saleInMotionTitle}
              </h3>
              <span className="px-4 py-2 rounded-md text-lg font-black bg-emerald-950 text-agri-300 border border-emerald-500/40">
                {lang === "ta"
                  ? "சரிபார்க்கப்பட்ட B2B பரிமாற்றம்"
                  : "Verified B2B Transition"}
              </span>
            </div>
            <p className="text-base text-slate-400 mt-1">{t.saleInMotionSub}</p>
          </div>
        </div>

        {/* 4 Final Checkpoints */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-base pt-1">
          <div className="p-3 bg-slate-850/80 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-lg font-bold  block">
              {lang === "ta" ? "வாங்குபவர் நிலை" : "Buyer Status"}
            </span>
            <span className="font-black text-emerald-400 mt-1 block">
              {lang === "ta"
                ? "வாங்குபவர் உறுதி செய்தார் ✓"
                : "Buyer Confirmed ✓"}
            </span>
          </div>

          <div className="p-3 bg-slate-850/80 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-lg font-bold  block">
              {lang === "ta" ? "பணம் செலுத்தும் நிலை" : "Payment Status"}
            </span>
            <span className="font-black text-amber-300 mt-1 block">
              {lang === "ta" ? "ஒருங்கிணைக்கப்பட்டது ✓" : "Coordinated ✓"}
            </span>
          </div>

          <div className="p-3 bg-slate-850/80 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-lg font-bold  block">
              {lang === "ta" ? "போக்குவரத்து நிலை" : "Transport Status"}
            </span>
            <span className="font-black text-emerald-400 mt-1 block">
              {lang === "ta" ? "உறுதி செய்யப்பட்டது ✓" : "Confirmed ✓"}
            </span>
          </div>

          <div className="p-3 bg-slate-850/80 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-lg font-bold  block">
              {lang === "ta" ? "டெலிவரி நிலை" : "Delivery Status"}
            </span>
            <span className="font-black text-blue-400 mt-1 block">
              {lang === "ta"
                ? "கண்காணிப்பு செயலில் உள்ளது ✓"
                : "Tracking Active ✓"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        {userRole === "farmer" ? (
          <button
            onClick={() => setFlowStep("transport")}
            className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentView("buyer-marketplace")}
            className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>
        )}

        <button
          onClick={() =>
            setCurrentView(
              userRole === "buyer" ? "buyer-marketplace" : "command-center",
            )
          }
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center space-x-2 transition-colors"
        >
          <span>
            {userRole === "buyer"
              ? lang === "ta"
                ? "சந்தைக்குத் திரும்பு"
                : "Return to Marketplace"
              : lang === "ta"
                ? "கட்டுப்பாட்டு மையத்திற்குத் திரும்பு"
                : "Return to Command Center"}
          </span>
          <ChevronRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
