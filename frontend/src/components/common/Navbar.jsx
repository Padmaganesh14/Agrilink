import React from "react";
import { useAgri } from "../../context/AgriContext";
import {
  Sprout,
  Globe,
  LayoutDashboard,
  Building2,
  LogOut,
  Truck,
} from "lucide-react";

export const Navbar = () => {
  const {
    lang,
    toggleLang,
    userRole,
    currentView,
    setCurrentView,
    startSellMyCrop,
    jumpToFlowStep,
  } = useAgri();

  // Hide the navbar on the new standalone LandingPage (it has its own header)
  if (currentView === "landing") return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm h-14 flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer select-none"
          onClick={() => setCurrentView("landing")}
        >
          <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Sprout className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg text-slate-900 leading-none">
              AgriLink
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              FARMER-BUYER PLATFORM
            </p>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center space-x-1 mx-2">
          {userRole === "farmer" ? (
            <>
              <button
                onClick={() => setCurrentView("command-center")}
                className={`p-2 md:px-3 md:py-1.5 rounded-md text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                  currentView === "command-center"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                title="Dashboard"
              >
                <LayoutDashboard className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:inline">
                  {lang === "ta" ? "முகப்பு" : "Dashboard"}
                </span>
              </button>

              <button
                onClick={() => startSellMyCrop()}
                className={`p-2 md:px-3 md:py-1.5 rounded-md text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                  currentView === "flow"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                }`}
                title="Sell Crop"
              >
                <Sprout className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:inline">
                  {lang === "ta" ? "பயிரை விற்க" : "Sell Crop"}
                </span>
              </button>
            </>
          ) : userRole === "buyer" ? (
            <>
              <button
                onClick={() => setCurrentView("buyer-marketplace")}
                className={`p-2 md:px-3 md:py-1.5 rounded-md text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                  currentView === "buyer-marketplace"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                title="Marketplace"
              >
                <Building2 className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:inline">
                  {lang === "ta" ? "சந்தை" : "Marketplace"}
                </span>
              </button>

              <button
                onClick={() => jumpToFlowStep(6)}
                className="p-2 md:px-3 md:py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 flex items-center space-x-1.5"
                title="Track Cargo"
              >
                <Truck className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:inline">
                  {lang === "ta" ? "கண்காணிப்பு" : "Track Cargo"}
                </span>
              </button>
            </>
          ) : null}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleLang}
            className="flex items-center space-x-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === "en" ? "தமிழ்" : "English"}</span>
          </button>

          {userRole && (
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="font-semibold text-slate-900 text-sm leading-none">
                  {userRole === "farmer"
                    ? lang === "ta"
                      ? "ராமநாதன்"
                      : "Ramanathan"
                    : "Koyambedu Mart"}
                </p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wide">
                  {userRole === "farmer" ? "Trichy Farmer" : "Chennai Buyer"}
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentView("landing");
                }}
                className="p-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
