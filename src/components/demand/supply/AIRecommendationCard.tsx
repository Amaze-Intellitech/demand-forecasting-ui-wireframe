import React from 'react';
import { Sparkles, ArrowRight, FileText } from 'lucide-react';
import { SupplyAiRecommendation } from '../../../types/domain/supplyCapacityOptimization';

interface AIRecommendationCardProps {
  recommendation: SupplyAiRecommendation;
  onApplyRecommendation: () => void;
  onViewDetailedPlan: () => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  recommendation,
  onApplyRecommendation,
  onViewDetailedPlan,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-100" />
          <span>AI Recommendation</span>
          <span className="ml-auto text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {recommendation.confidenceScore}% Confidence
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-sm font-bold text-slate-900 leading-snug tracking-tight mb-2">
          {recommendation.title}
        </h3>

        {/* Body Description */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {recommendation.summary}
        </p>

        {/* Highlights badges */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px]">
          <div className="flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-100">
            <span className="text-slate-500">Demand Fulfillment:</span>
            <span className="font-bold text-emerald-600">
              {recommendation.expectedBenefits.fulfillmentGain}
            </span>
          </div>
          <div className="flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-100">
            <span className="text-slate-500">Supply Cost:</span>
            <span className="font-bold text-emerald-600">
              {recommendation.expectedBenefits.costReduction}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={onApplyRecommendation}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
        >
          <span>Apply Recommendation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onViewDetailedPlan}
          className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-all focus:outline-none cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>View Detailed Plan</span>
        </button>
      </div>
    </div>
  );
};
