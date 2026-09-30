import React from 'react';
import { useAgri } from '../../context/AgriContext';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const SellMyCropStepper = () => {
  const { flowStep, setFlowStep, t } = useAgri();

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
    <div className="bg-white border-b border-slate-200 sticky top-[70px] z-30 shadow-2xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          
          {/* Header Title */}
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-agri-500"></span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-900">
              {t.sellMyCropHeader}
            </span>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-0.5">
            {steps.map((s, idx) => {
              const isPassed = currentStepNum > s.num;
              const isCurrent = currentStepNum === s.num || (s.num === 5 && currentStepNum === 5.5);

              return (
                <React.Fragment key={s.num}>
                  <button
                    onClick={() => setFlowStep(s.num)}
                    className={`px-3 py-1 rounded-full text-[11px] font-black transition-all flex items-center space-x-1 whitespace-nowrap ${
                      isCurrent
                        ? 'bg-agri-500 text-white shadow-xs'
                        : isPassed
                        ? 'bg-emerald-50 text-agri-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {isPassed && <CheckCircle2 className="w-3 h-3 text-agri-600" />}
                    <span>{s.label}</span>
                  </button>

                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-slate-300 shrink-0 hidden sm:inline" />
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
