import React from 'react';
import {
  TrendingUp,
  BarChart3,
  Activity,
  Tag,
  Crosshair,
} from 'lucide-react';
import { SIGNAL_SUMMARY_CARDS, SignalCardItem } from '../../data/demandSignalsMock';

export const SignalSummaryGrid: React.FC = () => {
  const getIconAndTheme = (type: SignalCardItem['type']) => {
    switch (type) {
      case 'trend':
        return {
          icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
          bgClass: 'bg-emerald-50 text-emerald-700',
        };
      case 'seasonality':
        return {
          icon: <BarChart3 className="w-4 h-4 text-blue-600" />,
          bgClass: 'bg-blue-50 text-blue-700',
        };
      case 'volatility':
        return {
          icon: <Activity className="w-4 h-4 text-primary" />,
          bgClass: 'bg-info-bg text-deep',
        };
      case 'price':
        return {
          icon: <Tag className="w-4 h-4 text-amber-600" />,
          bgClass: 'bg-amber-50 text-amber-700',
        };
      case 'forecast':
        return {
          icon: <Crosshair className="w-4 h-4 text-primary" />,
          bgClass: 'bg-info-bg text-deep',
        };
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {SIGNAL_SUMMARY_CARDS.map((card) => {
        const { icon, bgClass } = getIconAndTheme(card.type);
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-slate-200/80 p-4 flex items-start gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
          >
            {/* Icon Pill */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgClass}`}>
              {icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                {card.title}
              </span>
              <div className="text-base font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                {card.value}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                {card.supporting}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
