import React from 'react';
import {
  BarChart3,
  Box,
  Shield,
  Coins,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const KpiRow: React.FC = () => {
  const cards = [
    {
      id: 'accuracy',
      label: 'Forecast Accuracy',
      value: '94.2%',
      unit: '',
      change: '+3.1% vs. last year',
      isPositive: true,
      icon: BarChart3,
      badgeBg: 'bg-sky-50 text-sky-600 border border-sky-100',
    },
    {
      id: 'demand',
      label: 'Forecast Demand\n(Next 12 Months)',
      value: '128.4K',
      unit: 'units',
      change: '+7.4% vs. last year',
      isPositive: true,
      icon: Box,
      badgeBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    {
      id: 'service',
      label: 'Service Level',
      value: '97.8%',
      unit: '',
      change: '+2.8 pts vs. last year',
      isPositive: true,
      icon: Shield,
      badgeBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    },
    {
      id: 'working-capital',
      label: 'Working Capital Risk',
      value: '$280K',
      unit: '',
      change: 'At risk (+12% vs. last year)',
      isPositive: false,
      isRisk: true,
      icon: Coins,
      badgeBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 select-none">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between"
          >
            {/* Top Row: Icon Badge + Metric Label */}
            <div className="flex items-start gap-3.5 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.badgeBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <span className="text-xs font-semibold text-slate-500 whitespace-pre-line leading-tight block">
                  {card.label}
                </span>
              </div>
            </div>

            {/* Bottom Row: Large Metric + Delta Indicator */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-[32px] font-bold text-slate-900 tracking-tight leading-none">
                  {card.value}
                </span>
                {card.unit && (
                  <span className="text-base sm:text-lg font-normal text-slate-500">
                    {card.unit}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold">
                {card.isRisk ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                    <span className="text-rose-600">{card.change}</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">{card.change}</span>
                  </>
                )}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};
