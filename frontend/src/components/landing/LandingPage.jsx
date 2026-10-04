import React from "react";
import { useAgri } from "../../context/AgriContext";
import {
  Sprout,
  Building2,
  TrendingUp,
  Users,
  Truck,
  ArrowRight,
} from "lucide-react";

export const LandingPage = () => {
  const { t, lang, setCurrentView, startSellMyCrop, jumpToFlowStep } =
    useAgri();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* HEADER SECTION */}
      <header className="bg-white border-b border-slate-200 py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AgriLink</h1>
              <p className="text-sm text-slate-500 font-medium">
                Direct Farmer-to-Buyer
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN HERO & CALL TO ACTION */}
      <section className="py-12 px-4 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              {lang === "ta"
                ? "உங்கள் விளைபொருட்களை நேரடியாக விற்கவும்"
                : "Sell Your Crops Directly to Buyers"}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {lang === "ta"
                ? "இடைத்தரகர்கள் இல்லை. நியாயமான விலை. எளிதான விற்பனை."
                : "No middlemen. Fair prices. Easy tracking from farm to delivery."}
            </p>
          </div>

          {/* TWO MASSIVE BUTTONS FOR FARMER VS BUYER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* FARMER ACTION */}
            <button
              onClick={() => startSellMyCrop()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg p-8 shadow-md flex flex-col items-center text-center transition-colors border-2 border-emerald-700"
            >
              <div className="bg-emerald-500 p-4 rounded-lg mb-6">
                <Sprout className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {lang === "ta" ? "நான் ஒரு விவசாயி" : "I am a Farmer"}
              </h2>
              <p className="text-emerald-100 text-lg mb-6">
                {lang === "ta" ? "பயிரை விற்க" : "Click here to sell your crop"}
              </p>
              <div className="flex items-center space-x-2 text-white font-semibold text-lg bg-emerald-800 px-6 py-3 rounded-lg w-full justify-center">
                <span>{lang === "ta" ? "தொடங்கு" : "Start Now"}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>

            {/* BUYER ACTION */}
            <button
              onClick={() => setCurrentView("buyer-marketplace")}
              className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg p-8 shadow-md flex flex-col items-center text-center transition-colors border-2 border-slate-900"
            >
              <div className="bg-slate-700 p-4 rounded-lg mb-6">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {lang === "ta" ? "நான் ஒரு வியாபாரி" : "I am a Buyer"}
              </h2>
              <p className="text-slate-300 text-lg mb-6">
                {lang === "ta"
                  ? "பயிர்களை வாங்க"
                  : "Click here to buy fresh crops"}
              </p>
              <div className="flex items-center space-x-2 text-white font-semibold text-lg bg-slate-700 px-6 py-3 rounded-lg w-full justify-center">
                <span>{lang === "ta" ? "தொடங்கு" : "Start Now"}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - SIMPLIFIED */}
      <section className="bg-white py-12 px-4 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
            {lang === "ta" ? "எப்படி செயல்படுகிறது" : "How It Works"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                1. Find Prices
              </h3>
              <p className="text-slate-600 text-lg">
                Check the best market prices near you.
              </p>
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                2. Match Buyer
              </h3>
              <p className="text-slate-600 text-lg">
                We find verified buyers ready to pay.
              </p>
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                3. Ship & Earn
              </h3>
              <p className="text-slate-600 text-lg">
                Book transport and get paid safely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
