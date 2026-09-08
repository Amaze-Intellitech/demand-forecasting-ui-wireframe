import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { AI_FORECAST_INSIGHT } from '../../data/demandForecastMock';

export const ForecastAiInsightCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0062d2]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            AI Insight
          </h3>
        </div>

        {/* High Confidence Badge */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{AI_FORECAST_INSIGHT.badge}</span>
        </span>
      </div>

      {/* Narrative Body */}
      <div className="pt-3">
        <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
          {AI_FORECAST_INSIGHT.narrative}
        </p>
      </div>

      {/* Footnote */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Sensing Model: Ensemble Blended</span>
        <span>Telemetry: Real-time Synchronized</span>
      </div>
    </div>
  );
};
