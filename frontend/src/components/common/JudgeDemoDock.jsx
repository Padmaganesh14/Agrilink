import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { RotateCcw, Home, LayoutDashboard } from 'lucide-react';

export const JudgeDemoDock = () => {
  const { 
    currentView, 
    setCurrentView, 
    flowStep, 
    jumpToFlowStep, 
    resetDemo, 
    lang, 
    toggleLang, 
    t 
  } = useAgri();

  const demoSteps = lang === 'ta' ? [
    { num: 1, label: '01 பயிர்' },
    { num: 2, label: '02 சந்தை' },
    { num: 3, label: '03 வாங்குபவர்' },
    { num: 4, label: '04 AI+n8n' },
    { num: 5, label: '05 ஆர்டர்' },
    { num: 6, label: '06 போக்குவரத்து' },
  ] : [
    { num: 1, label: '01 CROP' },
    { num: 2, label: '02 MARKET' },
    { num: 3, label: '03 BUYER' },
    { num: 4, label: '04 AI+n8n' },
    { num: 5, label: '05 ORDER' },
    { num: 6, label: '06 LOGISTICS' },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw]">
      <div className="bg-[#0F172A]/95 backdrop-blur-md text-white px-3 sm:px-4 py-2 rounded-full shadow-2xl border border-slate-700/80 flex items-center space-x-1.5 sm:space-x-2">
        
        {/* Badge */}
        <div className="flex items-center space-x-1 pl-1 pr-1.5 border-r border-slate-700">
          <span className="w-2 h-2 rounded-full bg-agri-400 animate-ping"></span>
          <span className="text-[10px] font-black tracking-wider text-agri-400 uppercase hidden sm:inline">
            ✦ {t.demoModeLabel}
          </span>
          <span className="text-[9px] font-black text-agri-400 sm:hidden">
            DEMO
          </span>
        </div>

        {/* Landing Shortcut */}
        <button
          onClick={() => setCurrentView('landing')}
          className={`p-1.5 rounded-full transition-all ${
            currentView === 'landing'
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Landing Page"
        >
          <Home className="w-3.5 h-3.5" />
        </button>

        {/* Dashboard Shortcut */}
        <button
          onClick={() => setCurrentView('command-center')}
          className={`p-1.5 rounded-full transition-all ${
            currentView === 'command-center'
              ? 'bg-agri-500 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Command Center"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
        </button>

        <div className="h-3 w-px bg-slate-700"></div>

        {/* 6 Demo Steps (01 CROP -> 06 LOGISTICS) */}
        <div className="flex items-center space-x-1">
          {demoSteps.map((step) => {
            const isActive = currentView === 'flow' && (flowStep === step.num || (step.num === 5 && flowStep === 'transport'));

            return (
              <button
                key={step.num}
                onClick={() => jumpToFlowStep(step.num)}
                className={`px-2 sm:px-2.5 py-1 text-[11px] font-black rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-agri-500 text-white shadow-xs scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-3 w-px bg-slate-700"></div>

        {/* Reset Demo button */}
        <button
          onClick={resetDemo}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          title={t.resetDemoBtn}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Compact Language Toggle */}
        <button
          onClick={toggleLang}
          className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          title="Toggle Language"
        >
          {lang === 'en' ? 'தமிழ்' : 'EN'}
        </button>

      </div>
    </div>
  );
};
