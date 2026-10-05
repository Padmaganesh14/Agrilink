import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAgri } from "../../context/AgriContext";
import { api } from "../../services/api";
import { useLocation } from "../../hooks/useLocation";
import {
  Search,
  MapPin,
  Scale,
  Building2,
  ArrowRight,
  TrendingUp,
  X,
  Sprout,
  Truck,
  ChevronRight,
  ShoppingCart,
  Package,
  User,
} from "lucide-react";

export const BuyerMarketplaceView = () => {
  const { t, lang, user, setActiveOrderId, setCurrentView } = useAgri();

  const [crops, setCrops] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [myDemands, setMyDemands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [activeModalCrop, setActiveModalCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("marketplace"); // 'marketplace' or 'purchases'
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [demandForm, setDemandForm] = useState({
    cropName: "",
    grade: "Grade A",
    quantityRequired: "",
    targetPrice: "",
    deliveryLocation: user?.location || "",
  });
  const [isPostingDemand, setIsPostingDemand] = useState(false);

  const { location: geoLoc, loading: geoLocLoading } = useLocation();

  useEffect(() => {
    if (geoLoc && !demandForm.deliveryLocation && !geoLocLoading) {
      setDemandForm((prev) => ({
        ...prev,
        deliveryLocation: geoLoc.split(" • ")[0],
      }));
    }
  }, [geoLoc, geoLocLoading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          (import.meta.env.VITE_API_URL ||
            "https://agrilink-backend.onrender.com") + "/api/crops",
        );
        if (res.data.success) {
          setCrops(res.data.data);
        }

        if (user && user.name) {
          const orderRes = await axios.get(
            `${import.meta.env.VITE_API_URL || "https://agrilink-backend.onrender.com"}/api/order/buyer/${user.name}`,
          );
          if (orderRes.data.success) {
            setMyOrders(orderRes.data.data);
          }
        }

        if (user && user.id) {
          const demandRes = await axios.get(
            (import.meta.env.VITE_API_URL ||
              "https://agrilink-backend.onrender.com") + "/api/demands",
          );
          if (demandRes.data.success) {
            setMyDemands(
              demandRes.data.demands.filter((d) => d.buyerId === user.id),
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const filteredCrops = crops.filter((c) => {
    const cropName = c.cropName || "";
    const matchesSearch = cropName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDistrict =
      selectedDistrict === "All" || c.location === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handlePlaceOrderClick = (crop) => {
    setActiveModalCrop(crop);
    setPurchaseQuantity("");
    setIsCheckoutModalOpen(true);
  };

  const confirmBuyerOrder = async () => {
    if (
      !purchaseQuantity ||
      isNaN(purchaseQuantity) ||
      Number(purchaseQuantity) <= 0
    ) {
      alert("Please enter a valid quantity");
      return;
    }

    try {
      setIsPlacingOrder(true);
      const orderData = {
        cropId: activeModalCrop.id,
        crop: activeModalCrop.cropName,
        quantityKg: Number(purchaseQuantity),
        ratePerKg: activeModalCrop.pricePerKg,
        buyer: {
          name: user?.name || "Buyer",
          location: user?.location || "Chennai",
        },
        pickupLocation: activeModalCrop.location,
        deliveryLocation: user?.location || "Chennai",
        sellerId: activeModalCrop.sellerId,
      };

      const result = await api.createOrder(orderData);
      if (result.success) {
        alert("Order placed successfully! The farmer has been notified.");
        setIsCheckoutModalOpen(false);
        setActiveModalCrop(null);
        // Refresh orders
        if (user && user.name) {
          const orderRes = await axios.get(
            `${import.meta.env.VITE_API_URL || "https://agrilink-backend.onrender.com"}/api/order/buyer/${user.name}`,
          );
          if (orderRes.data.success) {
            setMyOrders(orderRes.data.data);
          }
        }
        setActiveTab("purchases");
      } else {
        alert("Failed to place order.");
      }
    } catch (e) {
      console.error(e);
      alert("Error placing order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-lg p-4 sm:p-6 border border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-emerald-400 text-[10px] sm:text-xs font-semibold mb-1 uppercase tracking-wide">
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="truncate">
                {user?.name || "Buyer"} • {user?.location || "India"}
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
              {t.buyerDashboardHeroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
              {t.buyerDashboardSubtitle}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-md p-2.5 sm:p-3 text-center w-full sm:w-auto sm:min-w-[150px]">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Available Lots
            </p>
            <p className="text-lg sm:text-xl font-bold text-indigo-300 mt-0.5 leading-none">
              {crops.length} Lots
            </p>
            <p className="text-[9px] sm:text-[10px] text-emerald-400 font-medium mt-1 uppercase tracking-wide">
              100% Inspected
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 sm:space-x-4 border-b border-slate-200 px-1">
        <button
          onClick={() => setActiveTab("marketplace")}
          className={`flex items-center space-x-2 py-3 px-2 sm:px-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "marketplace"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{"Marketplace"}</span>
        </button>
        <button
          onClick={() => setActiveTab("purchases")}
          className={`flex items-center space-x-2 py-3 px-2 sm:px-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "purchases"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{"My Purchases"}</span>
        </button>
        <button
          onClick={() => setActiveTab("demands")}
          className={`flex items-center space-x-2 py-3 px-2 sm:px-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "demands"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{"My Demands"}</span>
        </button>
      </div>

      {activeTab === "marketplace" ? (
        <>
          {/* Search & Filter Bar */}
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search crops..."
                className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 rounded-md bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
              />
            </div>

            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
              >
                <option value="All">All Districts</option>
                <option value="Trichy">Trichy</option>
                <option value="Madurai">Madurai</option>
                <option value="Coimbatore">Coimbatore</option>
              </select>
            </div>
          </div>

          {/* Available Crops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {loading ? (
              <div className="col-span-full py-12 text-center text-slate-500">
                Loading crops...
              </div>
            ) : filteredCrops.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500">
                No crops found matching your criteria.
              </div>
            ) : (
              filteredCrops.map((crop) => (
                <div
                  key={crop._id || crop.id}
                  className="bg-white rounded-lg p-3.5 sm:p-5 border border-slate-200 shadow-sm hover:shadow transition-shadow flex flex-col justify-between space-y-3 sm:space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between border-b border-slate-100 pb-2 sm:pb-3 mb-2 sm:mb-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-xl sm:text-2xl leading-none">
                          {crop.icon || ""}
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                            {crop.cropName}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">
                            {crop.grade}
                          </p>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide whitespace-nowrap">
                        Ready
                      </span>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-slate-100">
                        <span className="flex items-center space-x-1 sm:space-x-1.5 font-medium">
                          <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                          <span>Qty</span>
                        </span>
                        <span className="font-semibold text-slate-900">
                          {crop.quantityAvailable?.toLocaleString()} KG
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-slate-100">
                        <span className="flex items-center space-x-1 sm:space-x-1.5 font-medium">
                          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                          <span>Loc</span>
                        </span>
                        <span className="font-semibold text-slate-900 truncate max-w-[100px] sm:max-w-none text-right">
                          {crop.location}
                        </span>
                      </div>

                      {crop.users?.name && (
                        <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-slate-100">
                          <span className="flex items-center space-x-1 sm:space-x-1.5 font-medium">
                            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                            <span>Farm</span>
                          </span>
                          <span className="font-semibold text-slate-900 truncate max-w-[120px] text-right">
                            {crop.users.name}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-slate-100">
                        <span className="flex items-center space-x-1 sm:space-x-1.5 font-medium">
                          <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                          <span>Price</span>
                        </span>
                        <span className="font-bold text-emerald-700">
                          ₹{crop.pricePerKg}/KG
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalCrop(crop)}
                    className="w-full py-1.5 sm:py-2 px-3 sm:px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>{t.viewLotBtn}</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      ) : activeTab === "purchases" ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 mt-6 mb-4">
            {"My Purchases"}
          </h2>
          {myOrders.length === 0 ? (
            <div className="py-12 text-center text-slate-500 bg-white rounded-lg border border-slate-200 shadow-sm">
              {"You haven't placed any orders yet."}
            </div>
          ) : (
            myOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-0.5">
                      {order.crop} • {order.quantityKg} KG
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">
                      {order.pickupLocation} → {order.deliveryLocation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  <div className="bg-slate-50 border border-slate-100 rounded-md px-4 py-2 text-center w-full sm:w-auto">
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                      Total Value
                    </span>
                    <span className="block font-bold text-slate-900">
                      ₹{order.totalValue?.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveOrderId(order.orderId);
                      setCurrentView("tracking");
                    }}
                    className="px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center space-x-2 w-full sm:w-auto shrink-0 transition-colors"
                  >
                    <span>{t.trackDeliveryBtn || "Track Delivery"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : activeTab === "demands" ? (
        <div className="space-y-6 mt-6">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Post a New Demand
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsPostingDemand(true);
                try {
                  const isValidUUID =
                    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                      user?.id,
                    );
                  const validBuyerId = isValidUUID
                    ? user.id
                    : "93f26166-c1ff-4846-b2a4-52c78d20d05a"; // Fallback to 'vj' buyer if unauthenticated/dummy

                  const res = await axios.post(
                    (import.meta.env.VITE_API_URL ||
                      "https://agrilink-backend.onrender.com") + "/api/demands",
                    {
                      ...demandForm,
                      buyerId: validBuyerId,
                    },
                  );
                  if (res.data.success) {
                    setMyDemands([res.data.demand, ...myDemands]);
                    setDemandForm({
                      cropName: "",
                      grade: "Grade A",
                      quantityRequired: "",
                      targetPrice: "",
                      deliveryLocation: user?.location || "",
                    });
                    alert(
                      "Demand posted successfully! Farmers can now see and fulfill your demand.",
                    );
                  }
                } catch (err) {
                  console.error(err);
                  alert("Failed to post demand.");
                } finally {
                  setIsPostingDemand(false);
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Crop Name
                </label>
                <input
                  type="text"
                  required
                  value={demandForm.cropName}
                  onChange={(e) =>
                    setDemandForm({ ...demandForm, cropName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 text-sm"
                  placeholder="e.g. Tomato"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Quantity (KG)
                </label>
                <input
                  type="number"
                  required
                  value={demandForm.quantityRequired}
                  onChange={(e) =>
                    setDemandForm({
                      ...demandForm,
                      quantityRequired: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 text-sm"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Target Price (₹/KG)
                </label>
                <input
                  type="number"
                  required
                  value={demandForm.targetPrice}
                  onChange={(e) =>
                    setDemandForm({
                      ...demandForm,
                      targetPrice: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 text-sm"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Delivery City
                </label>
                <input
                  type="text"
                  required
                  value={demandForm.deliveryLocation}
                  onChange={(e) =>
                    setDemandForm({
                      ...demandForm,
                      deliveryLocation: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isPostingDemand}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded text-sm transition-colors disabled:opacity-50"
                >
                  {isPostingDemand ? "Posting..." : "Post Demand"}
                </button>
              </div>
            </form>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4">
            My Active Demands
          </h2>
          {myDemands.length === 0 ? (
            <div className="py-12 text-center text-slate-500 bg-white rounded-lg border border-slate-200 shadow-sm">
              You haven't posted any demands yet.
            </div>
          ) : (
            <div className="space-y-3">
              {myDemands.map((d) => {
                const getCropImage = (name) => {
                  const n = name.toLowerCase();
                  if (n.includes("onion"))
                    return "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=150&q=80";
                  if (n.includes("toma") || n.includes("tama"))
                    return "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80";
                  if (n.includes("corn"))
                    return "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=150&q=80";
                  if (n.includes("coco"))
                    return "https://images.unsplash.com/photo-1526362879555-5f9037c72477?w=150&q=80";
                  return "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=150&q=80";
                };

                return (
                  <div
                    key={d.id}
                    className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={getCropImage(d.cropName)}
                        alt={d.cropName}
                        className="w-14 h-14 rounded-full object-cover shadow-sm border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg capitalize">
                          {d.cropName}{" "}
                          <span className="text-sm font-medium text-slate-500 ml-1">
                            • {d.quantityRequired} KG
                          </span>
                        </h4>
                        <p className="text-sm text-slate-500 mt-0.5">
                          Target:{" "}
                          <span className="font-bold text-emerald-600">
                            ₹{d.targetPrice}/KG
                          </span>{" "}
                          • To: {d.deliveryLocation}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${d.status === "open" ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {d.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : null}

      {/* Lot Details Modal */}
      {activeModalCrop && !isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 space-y-4 sm:space-y-5 border border-slate-200 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalCrop(null)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 sm:space-x-3 border-b border-slate-100 pb-3 sm:pb-4 pr-6">
              <span className="text-2xl sm:text-3xl leading-none">
                {activeModalCrop.icon || ""}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {activeModalCrop.cropName}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-emerald-700 mt-0.5">
                  {activeModalCrop.quantityAvailable?.toLocaleString()} KG •
                  Farm Lot
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium block mb-0.5 truncate">
                  Farm Origin
                </span>
                <span className="font-semibold text-slate-900 break-words">
                  {activeModalCrop.location}
                </span>
              </div>

              <div className="p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium block mb-0.5 truncate">
                  Quality Grade
                </span>
                <span className="font-semibold text-slate-900 break-words">
                  {activeModalCrop.grade}
                </span>
              </div>

              <div className="p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium block mb-0.5 truncate">
                  Availability
                </span>
                <span className="font-semibold text-slate-900 break-words">
                  Immediate
                </span>
              </div>

              <div className="p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium block mb-0.5 truncate">
                  Target Benchmark
                </span>
                <span className="font-bold text-emerald-700 break-words">
                  ₹{activeModalCrop.pricePerKg}/KG
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs sm:text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span className="font-medium text-emerald-800">
                Est. Order Value
              </span>
              <span className="font-bold text-emerald-900 text-base sm:text-base mt-0.5 sm:mt-0">
                ₹
                {(
                  activeModalCrop.pricePerKg * activeModalCrop.quantityAvailable
                ).toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => handlePlaceOrderClick(activeModalCrop)}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-colors shadow-sm"
            >
              <span>{t.placeOrderBtn || "Buy Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && activeModalCrop && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-6 border border-slate-200 shadow-xl relative">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Confirm Purchase
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Specify quantity and delivery location
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center space-x-3">
              <span className="text-3xl leading-none">
                {activeModalCrop.icon}
              </span>
              <div>
                <p className="font-bold text-slate-900">
                  {activeModalCrop.cropName}
                </p>
                <p className="text-xs text-slate-500">
                  {activeModalCrop.location} • ₹{activeModalCrop.pricePerKg}/kg
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Required Quantity (KG)
                </label>
                <input
                  type="number"
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(e.target.value)}
                  placeholder={`Max available: ${activeModalCrop.quantityAvailable}`}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Delivery Location
                </label>
                <input
                  type="text"
                  value={user?.location || "Chennai"}
                  disabled
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-md"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={confirmBuyerOrder}
                disabled={isPlacingOrder}
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-colors shadow-sm disabled:opacity-70"
              >
                {isPlacingOrder ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Confirm Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
