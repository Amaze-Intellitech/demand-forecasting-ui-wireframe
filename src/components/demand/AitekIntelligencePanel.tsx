import React from 'react';
import {
  Sparkles,
  Lightbulb,
  Crosshair,
  TrendingUp,
  BarChart3,
  Compass,
  ArrowRight,
} from 'lucide-react';

export interface AitekIntelligencePanelProps {
  onViewDetailedForecast: () => void;
}

export const AitekIntelligencePanel: React.FC<AitekIntelligencePanelProps> = ({
  onViewDetailedForecast,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
      
      {/* Top Header: Title + High Confidence Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-500 fill-sky-500/20" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            AITEK Intelligence
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>High Confidence</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-4 py-4">
        
        {/* 1. Key Insight Block */}
        <div className="rounded-xl bg-amber-50/70 border border-amber-100/90 p-3.5 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-amber-100/80 text-amber-700 flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-950 tracking-tight">
              Key Insight
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed font-normal">
              Demand is expected to accelerate by <strong>7.4%</strong> over the next 12 months, with the strongest requirement in <strong>Q3 2025</strong>. Current inventory coverage is sufficient for the base forecast but becomes constrained under high-growth scenarios.
            </p>
          </div>
        </div>

        {/* 2. Recommended Action Block */}
        <div className="rounded-xl bg-emerald-50/70 border border-emerald-100/90 p-3.5 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-700 flex-shrink-0 mt-0.5">
            <Crosshair className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-emerald-950 tracking-tight">
              Recommended Action
            </h4>
            <p className="text-xs text-emerald-900/90 leading-relaxed font-normal">
              Increase safety stock by <strong>770 units</strong> and review supplier allocations for <strong>Q3 2025</strong>.
            </p>
          </div>
        </div>

        {/* 3. Top Demand Signals */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold text-slate-900 tracking-tight">
            Top Demand Signals
          </h4>
          
          <div className="space-y-2">
            {/* Signal 1: Trend */}
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Increasing trend</span>
            </div>

            {/* Signal 2: Seasonality */}
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <BarChart3 className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Strong seasonality (Q3 peak)</span>
            </div>

            {/* Signal 3: Price Elasticity */}
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <Compass className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>High price sensitivity</span>
            </div>
          </div>
        </div>

      </div>

      {/* Primary CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onViewDetailedForecast}
          className="w-full h-10 rounded-lg bg-[#0062d2] hover:bg-[#0051b3] active:bg-[#004294] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <span>View Detailed Forecast</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
