import React from 'react';
import {
  TrendingUp,
  BarChart2,
  TrendingDown,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { CausalKeyTakeaway } from '../../../types/domain/causalIntelligence';

interface KeyTakeawaysCardProps {
  takeaways: CausalKeyTakeaway[];
  onSelectTakeaway?: (takeaway: CausalKeyTakeaway) => void;
}

export const KeyTakeawaysCard: React.FC<KeyTakeawaysCardProps> = ({
  takeaways,
  onSelectTakeaway,
}) => {
  const getIconConfig = (type: CausalKeyTakeaway['iconType']) => {
    switch (type) {
      case 'price':
      case 'promotion':
        return {
          icon: TrendingUp,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        };
      case 'macro':
        return {
          icon: BarChart2,
          color: 'text-[#0062d2] bg-info-bg border-border',
        };
      case 'competitor':
        return {
          icon: TrendingDown,
          color: 'text-rose-600 bg-rose-50 border-rose-100',
        };
      case 'weather':
      default:
        return {
          icon: Settings,
          color: 'text-[#0062d2] bg-info-bg border-border',
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Key Takeaways
          </h3>
        </div>

        {/* Takeaways Stack */}
        <div className="divide-y divide-slate-100 mt-1">
          {takeaways.map((item) => {
            const { icon: Icon, color } = getIconConfig(item.iconType);

            return (
              <div
                key={item.id}
                onClick={() => onSelectTakeaway?.(item)}
                className="py-2.5 px-2 flex items-center justify-between gap-3 rounded-lg hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                {/* Icon & Description */}
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center border flex-shrink-0 mt-0.5 ${color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#0062d2] transition-colors leading-snug">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </div>

                {/* Chevron */}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0062d2] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
