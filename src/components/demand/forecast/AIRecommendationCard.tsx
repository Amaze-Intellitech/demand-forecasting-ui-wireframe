import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ForecastAIRecommendation } from '../../../types/domain/demandForecast';

interface AIRecommendationCardProps {
  recommendation: ForecastAIRecommendation;
  onExplore: (route: string) => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  recommendation,
  onExplore,
}) => {
  return (
    <div className="bg-[#f0fdf4]/50 border border-emerald-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header & Content */}
      <div>
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-3">
          <div className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span>AI Recommendation</span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
          {recommendation.title}
        </h4>

        <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
          {recommendation.narrative}
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-4 mt-2">
        <button
          type="button"
          onClick={() => onExplore(recommendation.ctaRoute)}
          className="w-full py-2 px-3.5 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
        >
          <span>{recommendation.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
        </button>
      </div>
    </div>
  );
};
