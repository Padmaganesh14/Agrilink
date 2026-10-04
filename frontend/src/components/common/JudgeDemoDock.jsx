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
    toggleLang 
  } = useAgri();

  const demoSteps = lang === 'ta' ? [
    { num: 1, label: '01 பயிர்' },
    { num: 2, label: '02 சந்தை' },
    { num: 3, label: '03 வாங்குபவர்' },
    { num: 4, label: '04 AI+n8n' },
    { num: 5, label: '05 ஆர்டர்' },
    { num: 6, label: '06 போக்குவரத்து' },
  ] : [
    { num: 1, label: '1. Crop' },
    { num: 2, label: '2. Market' },
    { num: 3, label: '3. Buyer' },
    { num: 4, label: '4. AI+n8n' },
    { num: 5, label: '5. Order' },
    { num: 6, label: '6. Logistics' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw]">
      {/* Floating pill dock */}
      <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl border border-slate-700 flex items-center justify-between space-x-4 overflow-x-auto hide-scrollbar">
        
        {/* Navigation Shortcuts */}
        <div className="flex items-center space-x-2 border-r border-slate-700 pr-4">
          <button
            onClick={() => setCurrentView('landing')}
            className={`p-2 rounded-full transition-colors ${
              currentView === 'landing' ? 'bg-slate-700' : 'hover:bg-slate-800'
            }`}
            title="Landing Page"
          >
            <Home className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentView('command-center')}
            className={`p-2 rounded-full transition-colors ${
              currentView === 'command-center' ? 'bg-emerald-600' : 'hover:bg-slate-800'
            }`}
            title="Farmer Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Demo Steps */}
        <div className="flex items-center space-x-2 pl-2">
          {demoSteps.map((step) => {
            const isActive = currentView === 'flow' && (flowStep === step.num || (step.num === 5 && flowStep === 'transport'));

            return (
              <button
                key={step.num}
                onClick={() => jumpToFlowStep(step.num)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500 text-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-3 border-l border-slate-700 pl-4">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-full text-sm font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            {lang === 'en' ? 'தமிழ்' : 'EN'}
          </button>
          
          <button
            onClick={resetDemo}
            className="p-2 text-slate-400 hover:text-white hover:bg-red-500 rounded-full transition-colors"
            title="Reset Data"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

