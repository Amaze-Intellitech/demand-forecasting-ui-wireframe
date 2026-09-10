import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { SOURCING_AI_RECOMMENDATION } from '../../data/demandSourcingMock';

export const SourcingAiRecommendationCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0062d2] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            AI Recommendation
          </h3>
        </div>

        {/* High Confidence Badge */}
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>{SOURCING_AI_RECOMMENDATION.badge}</span>
        </span>
      </div>

      {/* Main Amber / Gold Narrative Box */}
      <div className="my-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs">
        {SOURCING_AI_RECOMMENDATION.headline}
      </div>

      {/* Key Considerations Section */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Key Considerations:
        </h4>
        <ul className="space-y-2 text-xs text-slate-700">
          {SOURCING_AI_RECOMMENDATION.keyConsiderations.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-snug">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0062d2] mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footnote / Model Confidence Indicator */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Reasoning Engine: <strong>AITEK Agentic Sourcing v2.4</strong></span>
        <span
          className="text-emerald-600 font-medium"
          title="Convergence measures the optimizer's objective-function stability across the final 50 iterations of the allocation solve."
        >
          99.2% Convergence
        </span>
      </div>
      <p className="text-[10px] text-slate-400 mt-1">
        Convergence reflects optimizer objective-function stability over the final 50 solve iterations, not a guarantee of outcome.
      </p>
    </div>
  );
};
