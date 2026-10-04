import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { Sprout, Globe, Bell, LayoutDashboard, Sparkles, Building2, LogOut, Truck } from 'lucide-react';

export const Navbar = () => {
  const { 
    lang, 
    toggleLang, 
    userRole, 
    currentView, 
    setCurrentView, 
    startSellMyCrop,
    jumpToFlowStep 
  } = useAgri();

  // Hide the navbar on the new standalone LandingPage (it has its own header)
  if (currentView === 'landing') return null;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm h-[80px] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer select-none" 
          onClick={() => setCurrentView('landing')}
        >
          <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Sprout className="w-8 h-8" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-2xl text-slate-900 leading-tight">AgriLink</h1>
            <p className="text-sm text-slate-500 font-medium">Farmer-Buyer Platform</p>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {userRole === 'farmer' ? (
            <>
              <button
                onClick={() => setCurrentView('command-center')}
                className={`px-4 py-2.5 rounded-lg font-bold flex items-center space-x-2 transition-colors ${
                  currentView === 'command-center'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>{lang === 'ta' ? 'முகப்பு' : 'Dashboard'}</span>
              </button>

              <button
                onClick={() => startSellMyCrop()}
                className={`px-4 py-2.5 rounded-lg font-bold flex items-center space-x-2 transition-colors ${
                  currentView === 'flow'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Sprout className="w-5 h-5" />
                <span>{lang === 'ta' ? 'பயிரை விற்க' : 'Sell Crop'}</span>
              </button>
            </>
          ) : userRole === 'buyer' ? (
            <>
              <button
                onClick={() => setCurrentView('buyer-marketplace')}
                className={`px-4 py-2.5 rounded-lg font-bold flex items-center space-x-2 transition-colors ${
                  currentView === 'buyer-marketplace'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>{lang === 'ta' ? 'சந்தை' : 'Marketplace'}</span>
              </button>

              <button
                onClick={() => jumpToFlowStep(6)}
                className="px-4 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-100 flex items-center space-x-2"
              >
                <Truck className="w-5 h-5" />
                <span>{lang === 'ta' ? 'கண்காணிப்பு' : 'Track Cargo'}</span>
              </button>
            </>
          ) : null}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          
          <button
            onClick={toggleLang}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
          >
            <Globe className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {userRole && (
            <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="font-bold text-slate-900 text-base">
                  {userRole === 'farmer' ? (lang === 'ta' ? 'ராமநாதன்' : 'Ramanathan') : 'Koyambedu Mart'}
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  {userRole === 'farmer' ? 'Trichy Farmer' : 'Chennai Buyer'}
                </p>
              </div>
              <button
                onClick={() => setCurrentView('landing')}
                className="p-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

