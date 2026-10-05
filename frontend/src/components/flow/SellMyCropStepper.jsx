import React from "react";
import { useAgri } from "../../context/AgriContext";
import { CheckCircle2, ChevronRight } from "lucide-react";

export const SellMyCropStepper = () => {
  const { flowStep, setFlowStep, t, lang, selectedCrop, customLocation, customQty, marketIntelligence, selectedBuyer, activeOrderId } = useAgri();

  const steps = [
    { num: 1, label: "1. Crop" },
    { num: 2, label: "2. Market" },
    { num: 3, label: "3. Buyer" },
    { num: 4, label: "4. AI" },
    { num: 5, label: "5. Order" },
    { num: 6, label: "6. Logistics" },
  ];

  const currentStepNum = flowStep === "transport" ? 5.5 : flowStep;

  // Derive which steps are unlocked based on actual data presence
  const isStep1Valid = !!selectedCrop?.name && !!customLocation && Number(customQty) > 0;
  const isStep2Valid = isStep1Valid && !!marketIntelligence;
  const isStep3Valid = isStep2Valid && !!selectedBuyer;
  const isStep4Valid = isStep3Valid;
  const isStep5Valid = isStep4Valid && !!activeOrderId;

  const isStepUnlocked = (stepNum) => {
    if (stepNum === 1) return true;
    if (stepNum === 2) return isStep1Valid;
    if (stepNum === 3) return isStep2Valid;
    if (stepNum === 4) return isStep3Valid;
    if (stepNum === 5) return isStep4Valid;
    if (stepNum === 6) return isStep5Valid; // Logistics requires an active order
    return false;
  };

  return (
    <div className="bg-white border-t border-slate-200 md:border-t-0 md:border-b fixed bottom-0 left-0 right-0 md:sticky md:top-[56px] z-40 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] md:shadow-sm py-3 md:py-2">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        {/* Desktop Header Title - Hidden on mobile to save space */}
        <div className="hidden md:flex items-center space-x-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {"SELL CROP WORKFLOW"}
          </span>
        </div>

        {/* Stepper Tabs - Mobile touch targets increased */}
        <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0">
          {steps.map((s, idx) => {
            const unlocked = isStepUnlocked(s.num);
            const isPassed = currentStepNum > s.num;
            const isCurrent =
              currentStepNum === s.num ||
              (s.num === 5 && currentStepNum === 5.5);

            return (
              <React.Fragment key={s.num}>
                <button
                  onClick={() => {
                    if (unlocked) {
                      setFlowStep(s.num);
                    }
                  }}
                  disabled={!unlocked}
                  className={`px-4 py-2.5 md:px-3 md:py-1.5 rounded-lg md:rounded text-sm md:text-xs font-medium transition-colors flex items-center space-x-1.5 md:space-x-1 whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? "bg-emerald-600 text-white shadow-sm"
                      : unlocked
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer"
                        : "bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed"
                  }`}
                >
                  {isPassed && (
                    <CheckCircle2 className="w-4 h-4 md:w-3 md:h-3" />
                  )}
                  <span>{s.label}</span>
                </button>

                {idx < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 md:w-3 md:h-3 text-slate-300 shrink-0 hidden md:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
