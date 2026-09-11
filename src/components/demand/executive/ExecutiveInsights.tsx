import React from 'react';
import {
  Lightbulb,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  Layers,
  Coins,
} from 'lucide-react';
import { ExecutiveInsight } from '../../../types/domain/executiveCommandCenter';

interface ExecutiveInsightsProps {
  insights: ExecutiveInsight[];
  onSelectInsight: (insight: ExecutiveInsight) => void;
}

export const ExecutiveInsights: React.FC<ExecutiveInsightsProps> = ({
  insights,
  onSelectInsight,
}) => {
  const getIcon = (type: ExecutiveInsight['iconType'], severity: ExecutiveInsight['severity']) => {
    switch (type) {
      case 'trend':
        return {
          icon: TrendingUp,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        };
      case 'chart':
        return {
          icon: BarChart3,
          color: 'text-primary bg-info-bg border-border',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-rose-600 bg-rose-50 border-rose-100',
        };
      case 'supplier':
        return {
          icon: Layers,
          color:
            severity === 'critical'
              ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
              : 'text-primary bg-info-bg border-border',
        };
      case 'savings':
        return {
          icon: Coins,
          color: 'text-amber-600 bg-amber-50 border-amber-100',
        };
      default:
        return {
          icon: Lightbulb,
          color: 'text-primary bg-info-bg border-border',
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#0062d2]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Top Executive Insights
          </h3>
        </div>
      </div>

      {/* Insights List */}
      <div className="flex-1 divide-y divide-slate-100 mt-1 flex flex-col justify-between">
        {insights.map((item) => {
          const { icon: Icon, color } = getIcon(item.iconType, item.severity);

          return (
            <div
              key={item.id}
              onClick={() => onSelectInsight(item)}
              className="py-2.5 px-2 flex items-center gap-3 group cursor-pointer hover:bg-slate-50/80 rounded-lg transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 group-hover:text-[#0062d2] transition-colors leading-snug truncate">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5 leading-tight">
                  {item.summary}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
