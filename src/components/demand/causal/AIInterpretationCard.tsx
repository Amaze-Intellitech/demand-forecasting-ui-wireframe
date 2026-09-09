import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CausalAIInterpretation } from '../../../types/domain/causalIntelligence';

interface AIInterpretationCardProps {
  interpretation: CausalAIInterpretation;
  onExploreScenario: (route: string) => void;
  onViewPricing: (route: string) => void;
}

export const AIInterpretationCard: React.FC<AIInterpretationCardProps> = ({
  interpretation,
  onExploreScenario,
  onViewPricing,
}) => {
  return (
    <div className="bg-[#f0fdf4]/50 border border-emerald-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header & Content */}
      <div>
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-3">
          <div className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span>AI Interpretation</span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
          {interpretation.title}
        </h4>

        <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
          {interpretation.narrative}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 mt-2 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => onExploreScenario(interpretation.ctaScenarioRoute)}
          className="flex-1 py-2 px-3.5 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer whitespace-nowrap"
        >
          <span>{interpretation.ctaScenarioText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
        </button>

        <button
          type="button"
          onClick={() => onViewPricing(interpretation.ctaPricingRoute)}
          className="py-2 px-3.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer whitespace-nowrap"
        >
          <span>{interpretation.ctaPricingText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </div>
  );
};
