import React from 'react';
import { TrendingUp } from 'lucide-react';
import { ForecastQuantilesDec } from '../../../types/domain/demandForecast';

interface ForecastQuantilePanelProps {
  quantiles: ForecastQuantilesDec;
  activeQuantile?: string;
  onSelectQuantile?: (q: string) => void;
}

export const ForecastQuantilePanel: React.FC<ForecastQuantilePanelProps> = ({
  quantiles,
  activeQuantile,
  onSelectQuantile,
}) => {
  const items = [
    { label: 'P95', value: quantiles.p95, desc: 'Extreme high planning case' },
    { label: 'P90', value: quantiles.p90, desc: 'High demand coverage case' },
    { label: 'P80', value: quantiles.p80, desc: 'Elevated demand buffer' },
    { label: 'P50', value: quantiles.p50, desc: 'Median expected demand', isPrimary: true },
    { label: 'P10', value: quantiles.p10, desc: 'Conservative lower boundary' },
  ];

  return (
    <div className="w-full lg:w-48 xl:w-52 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pl-0 lg:pl-5 pt-4 lg:pt-0 select-none">
      <div>
        <div className="text-xs font-bold text-slate-800 pb-2.5 mb-1.5 border-b border-slate-100 flex items-center justify-between">
          <span>Forecast Quantiles</span>
          <span className="text-[11px] font-normal text-slate-400 font-mono">Dec 2025</span>
        </div>

        {/* Quantile List */}
        <div className="space-y-1.5">
          {items.map((item) => {
            const isSelected = activeQuantile === item.label;
            const isP50 = item.isPrimary;

            return (
              <div
                key={item.label}
                onClick={() => onSelectQuantile?.(item.label)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isP50
                    ? 'bg-info-bg text-[#0062d2] font-bold border border-border shadow-2xs'
                    : isSelected
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                title={item.desc}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono ${isP50 ? 'text-[#0062d2] font-bold' : 'text-slate-500 font-semibold'}`}>
                    {item.label}
                  </span>
                </div>
                <span className={`text-xs font-mono font-bold ${isP50 ? 'text-[#0062d2]' : 'text-slate-800'}`}>
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expected Demand Box */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Expected Demand
        </div>
        <div className="text-xl sm:text-[22px] font-extrabold text-slate-900 tracking-tight font-mono mt-0.5">
          {quantiles.expectedDemand}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
          <TrendingUp className="w-3 h-3 text-emerald-600" />
          <span>{quantiles.expectedGrowth}</span>
        </div>
      </div>
    </div>
  );
};
