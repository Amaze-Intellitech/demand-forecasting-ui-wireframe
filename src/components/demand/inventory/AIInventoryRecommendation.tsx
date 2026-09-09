import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Sliders,
  Grid3X3,
  Network,
} from 'lucide-react';
import { AIInventoryRecommendation as AIRecommendationType } from '../../../types/domain/inventoryIntelligence';

interface AIInventoryRecommendationProps {
  recommendation: AIRecommendationType;
  onViewOptimizationPlan: () => void;
  onOpenSafetyStock: () => void;
  onOpenAbcXyz: () => void;
  onOpenNetwork: () => void;
}

export const AIInventoryRecommendation: React.FC<AIInventoryRecommendationProps> = ({
  recommendation,
  onViewOptimizationPlan,
  onOpenSafetyStock,
  onOpenAbcXyz,
  onOpenNetwork,
}) => {
  return (
    <div className="bg-gradient-to-br from-emerald-50/40 via-white to-white rounded-xl border border-emerald-200/80 p-5 shadow-xs flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative accent element */}
      <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-emerald-100/50 rounded-full blur-xl pointer-events-none" />

      {/* Content */}
      <div>
        {/* Header */}
        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>AI Recommendation</span>
        </div>

        {/* Title */}
        <h4 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug mb-2.5">
          {recommendation.title}
        </h4>

        {/* Narrative */}
        <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
          {recommendation.narrative}
        </p>
      </div>

      {/* Action Triggers */}
      <div className="space-y-2.5 pt-2 border-t border-emerald-100/60">
        {/* Primary CTA */}
        <button
          type="button"
          onClick={onViewOptimizationPlan}
          className="w-full flex items-center justify-between bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs py-2 px-3 rounded-lg shadow-2xs transition-all hover:shadow-xs cursor-pointer group"
        >
          <span>View Optimization Plan</span>
          <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Secondary Modal Triggers */}
        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={onOpenSafetyStock}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium border border-slate-200/70 transition-colors cursor-pointer"
            title="Safety Stock Buffer Simulator"
          >
            <Sliders className="w-3 h-3 text-slate-500" />
            <span className="truncate">Safety Stock</span>
          </button>

          <button
            type="button"
            onClick={onOpenAbcXyz}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium border border-slate-200/70 transition-colors cursor-pointer"
            title="ABC / XYZ Segmentation Matrix"
          >
            <Grid3X3 className="w-3 h-3 text-slate-500" />
            <span className="truncate">ABC / XYZ</span>
          </button>

          <button
            type="button"
            onClick={onOpenNetwork}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium border border-slate-200/70 transition-colors cursor-pointer"
            title="Multi-Echelon Inventory Network"
          >
            <Network className="w-3 h-3 text-slate-500" />
            <span className="truncate">Network</span>
          </button>
        </div>
      </div>
    </div>
  );
};
