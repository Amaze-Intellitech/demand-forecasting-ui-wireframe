import React from 'react';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import { RecommendedScenarioData } from '../../../types/domain/scenarioDecisionTwin';

interface RecommendedScenarioCardProps {
  data: RecommendedScenarioData;
  onApplyToPlanning: () => void;
  onViewDetailedAnalysis: () => void;
}

export const RecommendedScenarioCard: React.FC<RecommendedScenarioCardProps> = ({
  data,
  onApplyToPlanning,
  onViewDetailedAnalysis,
}) => {
  return (
    <div className="bg-emerald-50/40 rounded-xl border border-emerald-200/90 p-5 shadow-xs flex flex-col justify-between h-full relative overflow-hidden">
      {/* Soft gradient accent */}
      <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-emerald-100/50 rounded-full blur-xl pointer-events-none" />

      {/* Header & Star Icon */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
          </div>
          <h3 className="text-base font-extrabold text-emerald-900 tracking-tight">
            {data.headline}
          </h3>
        </div>

        {/* Narrative */}
        <p className="text-xs text-slate-700 leading-relaxed font-normal mb-4">
          {data.narrative}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={onApplyToPlanning}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Apply to Planning</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onViewDetailedAnalysis}
          className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-lg border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
        >
          <span>View Detailed Analysis</span>
        </button>
      </div>
    </div>
  );
};
