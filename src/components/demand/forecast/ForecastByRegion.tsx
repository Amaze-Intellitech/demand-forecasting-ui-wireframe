import React from 'react';
import { TrendingUp } from 'lucide-react';
import { ForecastRegionalGrowth } from '../../../types/domain/demandForecast';

interface ForecastByRegionProps {
  regions: ForecastRegionalGrowth[];
  selectedRegionId?: string;
  onSelectRegion?: (region: ForecastRegionalGrowth) => void;
}

export const ForecastByRegion: React.FC<ForecastByRegionProps> = ({
  regions,
  selectedRegionId,
  onSelectRegion,
}) => {
  const maxDemand = Math.max(...regions.map((r) => r.demandVal), 500);

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Forecast by Region
        </h3>
        <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-400 pr-1">
          <span>Demand</span>
          <span>YoY</span>
        </div>
      </div>

      {/* Regional Rows */}
      <div className="flex-1 space-y-3 mt-3 flex flex-col justify-between">
        {regions.map((item) => {
          const barWidthPct = Math.round((item.demandVal / maxDemand) * 100);
          const isSelected = selectedRegionId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectRegion?.(item)}
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                isSelected ? 'bg-info-bg ring-1 ring-primary' : 'hover:bg-slate-50/80'
              }`}
            >
              {/* Top Line: Region Name, Bar, Demand, YoY */}
              <div className="flex items-center justify-between gap-3 text-xs">
                {/* Region Label */}
                <span className="w-28 font-medium text-slate-700 truncate">
                  {item.region}
                </span>

                {/* Horizontal Progress Bar */}
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden mx-1">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${barWidthPct}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                {/* Demand Metric */}
                <span className="w-12 text-right font-mono font-bold text-slate-900">
                  {item.demand}
                </span>

                {/* YoY Growth */}
                <div className="w-14 flex items-center justify-end gap-0.5 text-right font-mono font-semibold text-emerald-600 text-[11px]">
                  <TrendingUp className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>{item.growthYoY}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
