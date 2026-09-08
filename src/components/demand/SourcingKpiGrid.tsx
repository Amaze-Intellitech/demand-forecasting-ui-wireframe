import React from 'react';
import {
  DollarSign,
  Coins,
  ShieldCheck,
  Leaf,
  Clock,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { SOURCING_KPIS, SourcingKpiItem } from '../../data/demandSourcingMock';

export const SourcingKpiGrid: React.FC = () => {
  const getIconAndStyle = (type: SourcingKpiItem['type']) => {
    switch (type) {
      case 'cost':
        return {
          icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
          bgClass: 'bg-emerald-50 text-emerald-600',
        };
      case 'suppliers':
        return {
          icon: <Coins className="w-5 h-5 text-[#0062d2]" />,
          bgClass: 'bg-blue-50 text-[#0062d2]',
        };
      case 'reliability':
        return {
          icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
          bgClass: 'bg-emerald-50 text-emerald-600',
        };
      case 'emissions':
        return {
          icon: <Leaf className="w-5 h-5 text-emerald-600" />,
          bgClass: 'bg-emerald-50 text-emerald-600',
        };
      case 'risk':
      default:
        return {
          icon: <Clock className="w-5 h-5 text-amber-600" />,
          bgClass: 'bg-amber-50 text-amber-600',
        };
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 select-none">
      {SOURCING_KPIS.map((kpi) => {
        const { icon, bgClass } = getIconAndStyle(kpi.type);

        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Top Row: Icon + Label */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgClass}`}
              >
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

            {/* Subtext */}
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              {kpi.type === 'reliability' ? (
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              ) : kpi.type === 'risk' ? (
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              <span>{kpi.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
