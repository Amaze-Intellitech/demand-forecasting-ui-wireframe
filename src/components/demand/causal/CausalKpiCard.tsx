import React from 'react';
import {
  Network,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { CausalKpi } from '../../../types/domain/causalIntelligence';

interface CausalKpiCardProps {
  kpi: CausalKpi;
  onClick?: () => void;
}

export const CausalKpiCard: React.FC<CausalKpiCardProps> = ({ kpi, onClick }) => {
  const getIconConfig = () => {
    switch (kpi.iconType) {
      case 'drivers':
        return {
          icon: Network,
          color: 'bg-sky-50 text-[#0062d2] border border-sky-100',
        };
      case 'variance':
        return {
          icon: BarChart2,
          color: 'bg-sky-50 text-[#0062d2] border border-sky-100',
        };
      case 'positive':
        return {
          icon: TrendingUp,
          color: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        };
      case 'negative':
        return {
          icon: TrendingDown,
          color: 'bg-rose-50 text-rose-600 border border-rose-100',
        };
      case 'structural':
        return {
          icon: Activity,
          color: 'bg-sky-50 text-[#0062d2] border border-sky-100',
        };
      case 'confidence':
        return {
          icon: ShieldCheck,
          color: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        };
      default:
        return {
          icon: Network,
          color: 'bg-slate-50 text-slate-600 border border-slate-100',
        };
    }
  };

  const { icon: Icon, color } = getIconConfig();

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all flex items-start gap-3.5 select-none ${
        onClick ? 'cursor-pointer hover:bg-slate-50/50' : ''
      }`}
    >
      {/* Icon Badge */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium text-slate-500 truncate">
          {kpi.label}
        </div>

        <div className="text-xl sm:text-[22px] font-bold text-slate-900 font-mono tracking-tight leading-tight mt-0.5">
          {kpi.value}
        </div>

        {/* Subtext */}
        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium">
          {kpi.direction === 'up' && kpi.id === 'kpi-r2' ? (
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              {kpi.subtext}
            </span>
          ) : kpi.id === 'kpi-confidence' ? (
            <span className="text-emerald-600 font-semibold">
              {kpi.subtext}
            </span>
          ) : (
            <span className="text-slate-500 font-normal truncate">
              {kpi.subtext}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
