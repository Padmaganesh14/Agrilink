import React, { useState } from "react";
import { useAgri } from "../../context/AgriContext";
import {
  getCropDisplayName,
  getLocationDisplayName,
} from "../../data/mockData";
import { api } from "../../services/api";
import {
  ArrowRight,
  ArrowLeft,
  Zap,
  Cpu,
  FileText,
  Send,
  MessageSquare,
  CheckCircle2,
  Copy,
  Sparkles,
  Layers,
  Terminal,
  RefreshCw,
  Database,
  Truck,
  Code2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const Step4PromotionN8N = () => {
  const {
    t,
    lang,
    setFlowStep,
    selectedCrop,
    customQty,
    customLocation,
    cropQuality,
    harvestDate,
    selectedBuyer,
    n8nStatus,
    n8nActiveNode,
    n8nLogs,
    triggerN8nWorkflow,
    marketIntelligence,
    setActiveOrderId,
    user,
  } = useAgri();

  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const [copied, setCopied] = useState(false);
  const [showJsonPayload, setShowJsonPayload] = useState(false);
  const crop = selectedCrop;

  const cropIcon = crop.icon || "";
  const cropName = crop.name;
  const priceDisplay = selectedBuyer?.targetPrice || crop.expectedPrice || 35;
  const promoCopy = `${cropIcon} Fresh ${cropQuality} ${cropName}\n Quantity: ${customQty.toLocaleString()} KG\n Farm-origin: ${customLocation}, Tamil Nadu\n Indicative Market Rate: ₹${priceDisplay} / KG\n Available for verified B2B purchase via AgriLink AI.\n#AgriLinkAI #${cropName.replace(/\s+/g, "")} #B2BAgriculture #TamilNadu`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nodes = [
    {
      id: 1,
      name:
        "01 WEBHOOK & VALIDATE",
      title: "FARMER INGESTION",
      desc:
        `Payload parsed: ${cropName} (${customQty.toLocaleString()} KG @ ${customLocation})`,
      icon: <Zap className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 2,
      name: "02 MANDI DATASET",
      title: "AGMARKNET FEED",
      desc:
        "data.gov.in / GitHub Mandi Data normalized (1 Quintal = 100 KG)",
      icon: <Database className="w-5 h-5 text-blue-400" />,
    },
    {
      id: 3,
      name: "03 MARKET OPPORTUNITY",
      title: "MANDI SPREAD",
      desc:
        "Chennai ₹35 vs Trichy ₹28 (+₹7 gross − ₹2 transport = +₹5 net)",
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
    },
    {
      id: 4,
      name: "04 BUYER & LOGISTICS",
      title: "CORRIDOR MATCH",
      desc:
        "Koyambedu Wholesale Mart & NH45 corridor (~330 KM Eicher 14FT)",
      icon: <Truck className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 5,
      name: "05 UNIFIED RESPONSE",
      title: "MASTER EXECUTION",
      desc:
        "Bilingual Promo + WhatsApp Order Escrow + Live Telemetry Active",
      icon: <Layers className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 text-ai-700 px-5 py-3 rounded-md text-base font-black  mb-2 border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5 text-ai-600" />
          <span>{t.step04Pill}</span>
          <span>•</span>
          <span>{"Step 4 of 6"}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight ">
          {"Single-Layer n8n Master Workflow"}
        </h1>
        <p className="text-base sm:text-lg font-medium text-slate-500 mt-1">
          {"One unified orchestration pipeline: Farmer Ingestion ➔ Mandi Analysis ➔ Buyer Matching ➔ Freight ➔ WhatsApp Order ➔ Logistics."}
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <h2 className="text-lg font-black text-slate-900">
              {"Automated Smart Promotion"}
            </h2>
          </div>

          <button
            onClick={triggerN8nWorkflow}
            disabled={n8nStatus === "running"}
            className={`px-5 py-2.5 rounded-lg font-black text-base shadow-sm flex items-center space-x-2 transition-all ${
              n8nStatus === "running"
                ? "bg-emerald-100 text-emerald-700 cursor-not-allowed animate-pulse"
                : "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 active:scale-95"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>
              {n8nStatus === "running"
                ? "Generating Promotion..."
                : t.promoteMyCropBtn}
            </span>
          </button>
        </div>

        {n8nStatus === "running" && (
          <div className="py-8 text-center text-slate-500 animate-pulse">
            {"Finding best buyers and drafting promotion..."}
          </div>
        )}

        {n8nStatus === "completed" && (
          <div className="py-4 flex items-center justify-center space-x-2 text-emerald-600 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {"Promotion Drafted!"}
            </span>
          </div>
        )}
      </div>

      {/* Generated Content Card */}
      <div className="bg-white rounded-lg p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl"></span>
            <h3 className="text-lg font-black text-slate-900 ">
              {"Buyer-Facing Promotional Output"}
            </h3>
          </div>
          <span className="text-base font-bold text-slate-400">
            {"Auto-formatted via AgriLink AI"}
          </span>
        </div>

        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 relative font-medium text-base sm:text-lg text-slate-800 whitespace-pre-line leading-relaxed">
          {promoCopy}

          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-agri-500 transition-colors shadow-xs"
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-agri-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                alert("New promotional copy variations synthesized.")
              }
              className="px-6 py-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-base flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Regenerate</span>
            </button>

            <button
              onClick={() => {
                const url = `https://wa.me/?text=${encodeURIComponent(promoCopy)}`;
                window.open(url, "_blank");
              }}
              className="px-6 py-4 rounded-lg bg-emerald-50 text-agri-800 border border-emerald-300 hover:bg-emerald-100 font-bold text-base flex items-center space-x-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-agri-500" />
              <span>Share to WhatsApp</span>
            </button>
          </div>

          <button
            onClick={async () => {
              try {
                setIsCreatingOrder(true);
                const orderData = {
                  cropId: selectedCrop.id,
                  crop: selectedCrop.name,
                  quantityKg: customQty,
                  ratePerKg: priceDisplay,
                  buyer: {
                    name: selectedBuyer?.name || "Koyambedu Wholesale Mart",
                    location: selectedBuyer?.location || "Chennai",
                  },
                  pickupLocation: customLocation,
                  deliveryLocation: selectedBuyer?.location || "Chennai",
                  sellerId: user?.id,
                };
                const result = await api.createOrder(orderData);
                if (result.success && result.order) {
                  setActiveOrderId(result.order.orderId);
                  setFlowStep(5);
                } else {
                  alert(
                    "Failed to create order",
                  );
                }
              } catch (e) {
                alert(
                  "Error creating order",
                );
                console.error(e);
              } finally {
                setIsCreatingOrder(false);
              }
            }}
            disabled={isCreatingOrder}
            className="px-6 py-3.5 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white border-2 border-[#14532d] font-black text-base shadow-lg shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
          >
            <span>
              {isCreatingOrder
                ? "Creating..."
                : t.proceedToOrderBtn}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setFlowStep(3)}
          className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          onClick={async () => {
            try {
              setIsCreatingOrder(true);
              const orderData = {
                cropId: selectedCrop.id,
                crop: selectedCrop.name,
                quantityKg: customQty,
                ratePerKg: priceDisplay,
                buyer: {
                  name: selectedBuyer?.name || "Koyambedu Wholesale Mart",
                  location: selectedBuyer?.location || "Chennai",
                },
                pickupLocation: customLocation,
                deliveryLocation: selectedBuyer?.location || "Chennai",
                sellerId: user?.id,
              };
              const result = await api.createOrder(orderData);
              if (result.success && result.order) {
                setActiveOrderId(result.order.orderId);
                setFlowStep(5);
              } else {
                alert(
                  "Failed to create order",
                );
              }
            } catch (e) {
              alert("Error creating order");
              console.error(e);
            } finally {
              setIsCreatingOrder(false);
            }
          }}
          disabled={isCreatingOrder}
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center space-x-2 transition-colors disabled:opacity-70"
        >
          <span>
            {isCreatingOrder
              ? "Creating..."
              : "Continue to Order Confirmed"}
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
