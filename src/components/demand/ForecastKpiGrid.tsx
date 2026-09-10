import React from 'react';
import {
  TrendingUp,
  Target,
  BarChart3,
  Share2,
  Scale,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { FORECAST_KPIS, ForecastKpiItem } from '../../data/demandForecastMock';

export const ForecastKpiGrid: React.FC = () => {
  const getIconAndTheme = (type: ForecastKpiItem['type']) => {
    switch (type) {
      case 'accuracy':
        return {
          icon: <TrendingUp className="w-5 h-5 text-[#0062d2]" />,
          bgClass: 'bg-info-bg text-[#0062d2]',
        };
      case 'mape':
        return {
          icon: <Target className="w-5 h-5 text-[#0062d2]" />,
          bgClass: 'bg-info-bg text-[#0062d2]',
        };
      case 'rmse':
        return {
          icon: <BarChart3 className="w-5 h-5 text-[#0062d2]" />,
          bgClass: 'bg-info-bg text-[#0062d2]',
        };
      case 'r2':
        return {
          icon: <Share2 className="w-5 h-5 text-[#0062d2]" />,
          bgClass: 'bg-info-bg text-[#0062d2]',
        };
      case 'bias':
        return {
          icon: <Scale className="w-5 h-5 text-emerald-600" />,
          bgClass: 'bg-emerald-50 text-emerald-700',
        };
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 select-none">
      {FORECAST_KPIS.map((kpi) => {
        const { icon, bgClass } = getIconAndTheme(kpi.type);
        const isDownBetter = kpi.type === 'mape' || kpi.type === 'rmse';

        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Top Row: Icon + Label */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgClass}`}>
                {icon}
              </div>
              <span className="text-xs font-semibold text-slate-700 tracking-tight leading-tight">
                {kpi.title}
              </span>
            </div>

            {/* Primary Value */}
            <div className="mt-3.5 mb-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {kpi.value}
              </span>
            </div>

            {/* Subtext or Badge */}
            <div>
              {kpi.statusBadge ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                  {kpi.statusBadge}
                </span>
              ) : (
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  {isDownBetter ? (
                    <ArrowDownRight className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                  )}
                  <span>{kpi.subtext}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
