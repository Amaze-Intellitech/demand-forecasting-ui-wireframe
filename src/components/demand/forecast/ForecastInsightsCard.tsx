import React from 'react';
import {
  Lightbulb,
  BarChart2,
  TrendingUp,
  AlertTriangle,
  Target,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { ForecastInsight } from '../../../types/domain/demandForecast';

interface ForecastInsightsCardProps {
  insights: ForecastInsight[];
  onSelectInsight?: (insight: ForecastInsight) => void;
}

export const ForecastInsightsCard: React.FC<ForecastInsightsCardProps> = ({
  insights,
  onSelectInsight,
}) => {
  const getIconConfig = (type: ForecastInsight['iconType']) => {
    switch (type) {
      case 'peak':
        return {
          icon: BarChart2,
          color: 'text-[#0062d2] bg-info-bg border-border',
        };
      case 'packaging':
        return {
          icon: TrendingUp,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        };
      case 'uncertainty':
        return {
          icon: AlertTriangle,
          color: 'text-rose-600 bg-rose-50 border-rose-100',
        };
      case 'fva':
        return {
          icon: Target,
          color: 'text-[#0062d2] bg-info-bg border-border',
        };
      case 'signals':
      default:
        return {
          icon: Activity,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Key Forecast Insights
          </h3>
        </div>

        {/* Insights Stack */}
        <div className="divide-y divide-slate-100 mt-1">
          {insights.map((item) => {
            const { icon: Icon, color } = getIconConfig(item.iconType);

            return (
              <div
                key={item.id}
                onClick={() => onSelectInsight?.(item)}
                className="py-2.5 px-2 flex items-start gap-3 rounded-lg hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                {/* Icon Badge */}
                <div className={`w-7 h-7 rounded-md flex items-center justify-center border flex-shrink-0 mt-0.5 ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#0062d2] transition-colors leading-snug">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {item.summary}
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#0062d2] transition-all -ml-1 mt-1 flex-shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
