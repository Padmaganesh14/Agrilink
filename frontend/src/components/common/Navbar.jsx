import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { Sprout, Globe, Bell, LayoutDashboard, Sparkles, Building2, LogOut, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const { 
    lang, 
    t, 
    toggleLang, 
    userRole, 
    currentView, 
    setCurrentView, 
    startSellMyCrop,
    jumpToFlowStep 
  } = useAgri();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs h-[70px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          
          {/* Logo & Platform Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none" 
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-agri-500 flex items-center justify-center text-white shadow-md shadow-agri-500/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight text-[#0F172A]">
                  AGRILINK AI
                </span>
                <span className="text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded-md bg-emerald-50 text-agri-600 border border-emerald-200">
                  AI MVP
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block font-bold uppercase tracking-wider">
                {t.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          {currentView === 'landing' || currentView === 'farmer-login' || currentView === 'buyer-login' ? (
            /* LANDING NAVIGATION */
            <nav className="hidden md:flex items-center space-x-6 text-xs font-bold text-slate-600">
              <a href="#how-it-works" className="hover:text-agri-600 transition-colors">
                {t.navHowItWorks}
              </a>
              <a href="#market-intelligence" className="hover:text-agri-600 transition-colors">
                {t.navMarketIntel}
              </a>
              <button
                onClick={() => setCurrentView('farmer-login')}
                className="hover:text-agri-600 font-extrabold transition-colors"
              >
                {t.navForFarmers}
              </button>
              <button
                onClick={() => setCurrentView('buyer-login')}
                className="hover:text-ai-600 font-extrabold transition-colors"
              >
                {t.navForBuyers}
              </button>
            </nav>
          ) : userRole === 'farmer' ? (
            /* FARMER NAVIGATION */
            <nav className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setCurrentView('command-center')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 ${
                  currentView === 'command-center'
                    ? 'bg-slate-100 text-agri-600 font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{lang === 'ta' ? 'கட்டுப்பாட்டு மையம்' : 'Command Center'}</span>
              </button>

              <button
                onClick={() => startSellMyCrop()}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 ${
                  currentView === 'flow'
                    ? 'bg-emerald-50 text-agri-700 border border-emerald-300 font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-agri-500" />
                <span>{lang === 'ta' ? 'பயிரை விற்க' : 'Sell My Crop'}</span>
              </button>
            </nav>
          ) : (
            /* BUYER NAVIGATION */
            <nav className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setCurrentView('buyer-marketplace')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 ${
                  currentView === 'buyer-marketplace'
                    ? 'bg-indigo-50 text-ai-700 font-black border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-4 h-4 text-ai-600" />
                <span>{lang === 'ta' ? 'வாங்குபவர் சந்தை' : 'Buyer Market'}</span>
              </button>

              <button
                onClick={() => jumpToFlowStep(6)}
                className="px-3.5 py-2 text-xs font-bold rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center space-x-1.5"
              >
                <span>{lang === 'ta' ? 'நேரலை சரக்கு கண்காணிப்பு' : 'Live Freight Tracking'}</span>
              </button>
            </nav>
          )}

          {/* Right Action Area */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-300 hover:border-agri-500 bg-slate-50 text-slate-700 hover:bg-white transition-all shadow-xs"
              title="Toggle English / தமிழ்"
            >
              <Globe className="w-3.5 h-3.5 text-agri-500" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Landing page logins */}
            {(currentView === 'landing' || currentView === 'farmer-login' || currentView === 'buyer-login') && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentView('farmer-login')}
                  className="px-3 py-1.5 rounded-xl border border-agri-500/40 text-agri-700 hover:bg-agri-50 font-bold text-xs transition-colors"
                >
                  {t.navFarmerLogin}
                </button>
                <button
                  onClick={() => setCurrentView('buyer-login')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  {t.navBuyerLogin}
                </button>
              </div>
            )}

            {/* If in app view, show notifications and user badge */}
            {currentView !== 'landing' && currentView !== 'farmer-login' && currentView !== 'buyer-login' && (
              <>
                <div className="relative p-2 text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-agri-500 rounded-full animate-pulse"></span>
                </div>

                <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-black text-xs border border-slate-200">
                    {userRole === 'farmer' ? 'R' : 'K'}
                  </div>
                  <div className="hidden lg:block text-left text-xs">
                    <p className="font-black text-slate-800 leading-none">
                      {userRole === 'farmer' ? (lang === 'ta' ? 'ராமநாதன்' : 'Ramanathan') : (lang === 'ta' ? 'கோயம்பேடு மார்ட்' : 'Koyambedu Mart')}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      {userRole === 'farmer' ? (lang === 'ta' ? 'திருச்சி விவசாயி' : 'Trichy Farmer') : (lang === 'ta' ? 'சென்னை வாங்குபவர்' : 'Chennai Buyer')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentView('landing')}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                  title="Return to Landing"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
