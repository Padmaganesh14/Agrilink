import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const SellMyCropStepper = () => {
  const { flowStep, setFlowStep, t, lang } = useAgri();

  const steps = [
    { num: 1, label: t.step01Pill },
    { num: 2, label: t.step02Pill },
    { num: 3, label: t.step03Pill },
    { num: 4, label: t.step04Pill },
    { num: 5, label: t.step05Pill },
    { num: 6, label: t.step06Pill },
  ];

  const currentStepNum = flowStep === 'transport' ? 5.5 : flowStep;

  return (
    <div className="bg-white border-b border-slate-200 sticky top-[70px] z-30 shadow-sm py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Header Title */}
          <div className="flex items-center space-x-3">
            <span className="w-4 h-4 rounded-full bg-emerald-600"></span>
            <span className="text-xl font-bold text-slate-900">
              {lang === 'ta' ? 'பயிரை விற்க' : 'SELL CROP'}
            </span>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {steps.map((s, idx) => {
              const isPassed = currentStepNum > s.num;
              const isCurrent = currentStepNum === s.num || (s.num === 5 && currentStepNum === 5.5);

              return (
                <React.Fragment key={s.num}>
                  <button
                    onClick={() => setFlowStep(s.num)}
                    className={`px-6 py-3 rounded-lg text-lg font-bold transition-colors flex items-center space-x-2 whitespace-nowrap ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-md'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isPassed && <CheckCircle2 className="w-5 h-5" />}
                    <span>{s.label}</span>
                  </button>

                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

