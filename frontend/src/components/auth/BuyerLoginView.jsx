import React, { useState } from 'react';
import { useAgri } from '../../context/AgriContext';
import { Building2, ArrowRight, Sparkles, Globe, ArrowLeft } from 'lucide-react';

export const BuyerLoginView = () => {
  const { t, lang, toggleLang, setCurrentView, loginAsDemoBuyer } = useAgri();
  const [buyerNumber, setBuyerNumber] = useState('+91 94440 12890');
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Top bar */}
      <div className="max-w-md mx-auto w-full px-4 flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center space-x-1.5 text-base font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </button>

        <button
          onClick={toggleLang}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-slate-300 text-base font-bold text-slate-700 hover:bg-white transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-ai-600" />
          <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        
        <div className="bg-white py-8 px-6 sm:px-10 rounded-lg border border-slate-200/90 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-lg bg-[#0F172A] text-white flex items-center justify-center mx-auto shadow-md">
              <Building2 className="w-6 h-6 text-indigo-300" />
            </div>

            <div className="text-lg font-black st text-ai-600">
              AGRILINK AI
            </div>

            <h2 className="text-2xl font-black text-[#0F172A] tracking-tight ">
              {t.buyerLoginHeader}
            </h2>

            <p className="text-base text-slate-500 font-medium">
              "{t.buyerLoginSubtitle}"
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-base font-bold  text-slate-600 mb-1.5">
                {t.businessNumberLabel}
              </label>
              <input
                type="tel"
                value={buyerNumber}
                onChange={(e) => setBuyerNumber(e.target.value)}
                placeholder="+91 94440 12890"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 font-bold text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-ai-500"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setOtpSent(true);
                setTimeout(() => loginAsDemoBuyer(), 600);
              }}
              className="w-full py-3.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base  shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <span>{otpSent ? 'VERIFYING...' : t.sendOtpBtn}</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-lg font-bold  text-slate-400">
              DEMO ACCESS
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Single-Click Demo Buyer Button */}
          <div>
            <button
              type="button"
              onClick={loginAsDemoBuyer}
              className="w-full py-3.5 px-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border-2 border-indigo-400/40 font-black text-base  shadow-xs flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-ai-600" />
              <span>{t.continueDemoBuyerBtn}</span>
            </button>
            <p className="text-base text-center text-slate-500 mt-2 font-medium">
              {t.demoBuyerInfo}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
