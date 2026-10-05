import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAgri } from "../../context/AgriContext";
import {
  Users,
  Package,
  MapPin,
  Truck,
  ChevronRight,
  TrendingUp,
  Sprout,
} from "lucide-react";
import { useLocation } from "../../hooks/useLocation";

export const CommandCenterDashboard = () => {
  const {
    t,
    lang,
    user,
    startSellMyCrop,
    jumpToFlowStep,
    fulfillDemandFlow,
    selectedTransport,
    flowStep,
    setActiveOrderId,
  } = useAgri();

  const [myCrops, setMyCrops] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [buyerDemands, setBuyerDemands] = useState([]);
  const [stats, setStats] = useState({
    buyers: 0,
    orders: 0,
    activeDeliveries: 0,
  });
  const [loading, setLoading] = useState(true);

  const [currentLocation, setCurrentLocation] = useState(t.locationHeader);

  const { location: geoLoc, loading: geoLocLoading } = useLocation();

  useEffect(() => {
    if (geoLoc && !geoLocLoading) {
      setCurrentLocation(geoLoc);
    }
  }, [geoLoc, geoLocLoading]);

  useEffect(() => {
    const fetchMyCrops = async () => {
      if (user && user.id) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL || "https://agrilink-backend.onrender.com"}/api/crops?sellerId=${user.id}`,
          );
          if (res.data.success) {
            setMyCrops(res.data.data);
          }

          const orderRes = await axios.get(
            `${import.meta.env.VITE_API_URL || "https://agrilink-backend.onrender.com"}/api/order/seller/${user.id}`,
          );
          if (orderRes.data.success) {
            setMyOrders(orderRes.data.data);
          }

          const statRes = await axios.get(
            `${import.meta.env.VITE_API_URL || "https://agrilink-backend.onrender.com"}/api/stats/farmer/${user.id}`,
          );
          if (statRes.data.success) {
            setStats(statRes.data.stats);
          }
          
          // Fetch open demands
          const demandRes = await axios.get((import.meta.env.VITE_API_URL || "https://agrilink-backend.onrender.com") + "/api/demands?status=open");
          if (demandRes.data.success) {
            setBuyerDemands(demandRes.data.demands);
          }
        } catch (error) {
          console.error("Failed to fetch my crops", error);
        }
      }
      setLoading(false);
    };
    fetchMyCrops();
  }, [user]);

  const activeCrop = myCrops.length > 0 ? myCrops[0] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <div>
          <div className="text-emerald-600 font-semibold mb-1 flex items-center space-x-1.5 text-sm">
            <Sprout className="w-4 h-4" />
            <span>FARMER DASHBOARD</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{t.greeting}</h1>
          <div className="flex items-center space-x-1.5 text-sm text-slate-500 mt-1">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{currentLocation}</span>
          </div>
        </div>

        <button
          onClick={() => startSellMyCrop()}
          className="px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-sm flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto"
        >
          <Sprout className="w-4 h-4" />
          <span>{"SELL NEW CROP"}</span>
        </button>
      </div>

      {/* Main Hero: YOUR NEXT SALE */}
      <div className="bg-slate-900 text-white rounded-lg p-6 shadow-md border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-semibold text-emerald-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.yourNextSale}</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium bg-slate-800 px-2.5 py-1 rounded-md">
            {"Farm Listing"}
          </span>
        </div>

        {/* Demands Section (For Farmers) */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Open Buyer Demands</span>
            </h2>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-100 px-2.5 py-1 rounded-md uppercase">
              {buyerDemands.length} Active
            </span>
          </div>
          
          {buyerDemands.length === 0 ? (
            <div className="py-6 text-center text-slate-500">
              No active buyer demands found.
            </div>
          ) : (
            <div className="space-y-3">
              {buyerDemands.map(d => (
                <div key={d.id} className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{d.cropName} • {d.quantityRequired} KG</h4>
                    <p className="text-sm text-slate-500">Target: ₹{d.targetPrice}/KG • To: {d.deliveryLocation}</p>
                    {d.buyer && <p className="text-xs text-indigo-600 font-medium mt-1">Requested by: {d.buyer.farmName || d.buyer.name}</p>}
                  </div>
                  <button
                    onClick={() => fulfillDemandFlow(d)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors w-full sm:w-auto"
                  >
                    Fulfill Demand
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {activeCrop ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center space-x-4">
              <span className="text-4xl"></span>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {activeCrop.cropName}
                </h2>
                <p className="text-emerald-300 text-sm font-medium">
                  {activeCrop.quantityAvailable?.toLocaleString()}{" "}
                  {"KG • READY"}
                </p>
              </div>
            </div>

            {/* Best Market Callout */}
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                {"TARGET PRICE"}
              </p>
              <div className="text-2xl font-bold text-white mb-2">
                ₹{activeCrop.pricePerKg}{" "}
                <span className="text-sm text-slate-400 font-normal">
                  {"/ kg"}
                </span>
              </div>
              <p className="text-sm text-slate-300 flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>{activeCrop.location}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400">
            {"No recent crops listed."}
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => jumpToFlowStep(flowStep)}
            className="px-5 py-2.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-medium text-sm transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <span>{t.continueSellingBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">
              {stats.buyers}
            </h3>
            <p className="text-xs font-medium text-slate-500 uppercase">
              {t.statBuyers}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">
              {stats.orders}
            </h3>
            <p className="text-xs font-medium text-slate-500 uppercase">
              {t.statOrders}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">
              {stats.activeDeliveries}
            </h3>
            <p className="text-xs font-medium text-slate-500 uppercase">
              {t.statActiveDelivery}
            </p>
          </div>
        </div>
      </div>

      {/* ACTIVE SALE Card */}
      {myOrders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 mt-6">
            {"Active Orders"}
          </h3>
          {myOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-emerald-50 rounded-lg p-5 border border-emerald-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm shrink-0 border border-emerald-100">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-900 mb-0.5">
                    {order.crop} • {order.quantityKg} KG
                  </h4>
                  <p className="text-sm text-emerald-700 font-medium mb-1">
                    Buyer: {order.buyerName} ({order.buyerLocation})
                  </p>
                  <p className="text-xs text-emerald-600/80 font-medium">
                    {`Vehicle: ${order.transportName || "Pending"} • ${order.pickupLocation} → ${order.deliveryLocation}`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveOrderId(order.orderId);
                  jumpToFlowStep(6);
                }}
                className="px-5 py-2.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm flex items-center justify-center space-x-2 w-full sm:w-auto shrink-0"
              >
                <span>{t.trackDeliveryBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* My Listings */}
      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm mt-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          {"My Listings"}
        </h3>

        {loading ? (
          <div className="py-8 text-center text-slate-400">Loading...</div>
        ) : myCrops.length > 0 ? (
          <div className="space-y-3">
            {myCrops.map((crop) => (
              <div
                key={crop.id}
                className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {crop.cropName}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">
                      {crop.quantityAvailable} KG • ₹{crop.pricePerKg}/kg
                    </p>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this crop?",
                      )
                    ) {
                      try {
                        const res = await axios.delete(
                          `${import.meta.env.VITE_API_URL || "https://agrilink-backend.onrender.com"}/api/crops/${crop.id}`,
                        );
                        if (res.data.success) {
                          setMyCrops((prev) =>
                            prev.filter((c) => c.id !== crop.id),
                          );
                        }
                      } catch (err) {
                        console.error("Failed to delete crop", err);
                        alert("Error deleting crop");
                      }
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400">
            {"No crops listed yet."}
          </div>
        )}
      </div>
    </div>
  );
};
