import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SensingAIInsight as ISensingAIInsight } from '../../../types/domain/demandSensing';

interface SensingAIInsightProps {
  insight: ISensingAIInsight;
  onExplore: (route: string) => void;
}

export const SensingAIInsight: React.FC<SensingAIInsightProps> = ({
  insight,
  onExplore,
}) => {
  return (
    <div className="bg-[#f0fdf4]/50 border border-emerald-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>AI Insight</span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
          {insight.title}
        </h4>

        <p className="text-xs text-slate-600 leading-relaxed mt-2">
          {insight.narrative}
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-4 mt-2">
        <button
          type="button"
          onClick={() => onExplore(insight.route)}
          className="w-full py-2 px-3.5 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <span>{insight.targetText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
        </button>
      </div>
    </div>
  );
};
