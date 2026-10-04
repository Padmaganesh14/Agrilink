import React, { useState, useRef, useEffect } from "react";
import { useAgri } from "../../context/AgriContext";
import {
  Sprout,
  Globe,
  LayoutDashboard,
  Building2,
  LogOut,
  Truck,
  Settings,
} from "lucide-react";

export const Navbar = () => {
  const {
    lang,
    displayLang,
    setLang,
    userRole,
    user,
    logout,
    currentView,
    setCurrentView,
    startSellMyCrop,
  } = useAgri();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // On load: if ta/hi/te is stored, ensure googtrans cookie is set so GT auto-activates
  useEffect(() => {
    if (displayLang === "ta" || displayLang === "hi" || displayLang === "te") {
      const cookie = document.cookie;
      if (!cookie.includes(`googtrans=/en/${displayLang}`)) {
        document.cookie = `googtrans=/en/${displayLang}; path=/`;
        document.cookie = `googtrans=/en/${displayLang}; path=/; domain=${location.hostname}`;
        window.location.reload();
      }
    }
  }, []);

  const languages = [
    { code: "en", name: "English" },
    { code: "ta", name: "தமிழ்" },
    { code: "hi", name: "हिंदी" },
    { code: "te", name: "తెలుగు" },
  ];

  const handleLanguageSelect = (langCode) => {
    setIsLangOpen(false);
    if (langCode === "ta" || langCode === "hi" || langCode === "te") {
      // Save to localStorage first, then set cookie and reload
      localStorage.setItem("agri_lang", langCode);
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${location.hostname}`;
      window.location.reload();
    } else {
      // Clear googtrans cookie
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname}`;
      const prevLang = localStorage.getItem("agri_lang");
      setLang(langCode);
      // Reload only if switching away from a GT language
      if (prevLang === "ta" || prevLang === "hi" || prevLang === "te") {
        localStorage.setItem("agri_lang", langCode);
        window.location.reload();
      }
    }
  };

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
          {user && userRole === "farmer" ? (
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
          ) : user && userRole === "buyer" ? (
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
                onClick={() => setCurrentView("tracking")}
                className={`p-2 md:px-3 md:py-1.5 rounded-md text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                  currentView === "tracking"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
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
          {/* Native Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 transition-colors shadow-sm"
              title="Select Language"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold uppercase">
                {languages.find((l) => l.code === displayLang)?.name ||
                  displayLang}
              </span>
            </button>

            {isLangOpen && (
              <div
                className="notranslate absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
                translate="no"
              >
                <div className="py-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageSelect(l.code)}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between"
                    >
                      <span className="notranslate" translate="no">
                        {l.name}
                      </span>
                      <span
                        className="notranslate text-[10px] text-slate-400 uppercase font-bold"
                        translate="no"
                      >
                        {l.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {user && userRole && (
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="font-semibold text-slate-900 text-sm leading-none">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wide">
                  {userRole === "farmer" ? "Farmer" : "Buyer"}
                </p>
              </div>
              <button
                onClick={() => setCurrentView("settings")}
                className={`p-1.5 rounded transition-colors ${
                  currentView === "settings"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={logout}
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
