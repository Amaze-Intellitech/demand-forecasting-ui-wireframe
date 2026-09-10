import React from 'react';
import {
  Activity,
  Boxes,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { SensingKpi } from '../../../types/domain/demandSensing';

interface SensingKpiCardProps {
  kpi: SensingKpi;
  onClick?: () => void;
}

export const SensingKpiCard: React.FC<SensingKpiCardProps> = ({ kpi, onClick }) => {
  const getIconConfig = () => {
    switch (kpi.iconType) {
      case 'index':
        return {
          icon: Activity,
          color: 'bg-info-bg text-[#0062d2] border border-border',
        };
      case 'coverage':
        return {
          icon: Boxes,
          color: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        };
      case 'events':
        return {
          icon: AlertTriangle,
          color: 'bg-rose-50 text-rose-600 border border-rose-100',
        };
      case 'uplift':
        return {
          icon: TrendingUp,
          color: 'bg-info-bg text-[#0062d2] border border-border',
        };
      case 'confidence':
        return {
          icon: ShieldCheck,
          color: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        };
      case 'atRisk':
        return {
          icon: Package,
          color: 'bg-rose-50 text-rose-600 border border-rose-100',
        };
      default:
        return {
          icon: Activity,
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
      {/* Left Icon Badge */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Right Content */}
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium text-slate-500 truncate">
          {kpi.label}
        </div>
        <div className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight mt-0.5 font-mono">
          {kpi.value}
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium">
          {kpi.iconType === 'events' ? (
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-rose-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                3 high
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                4 medium
              </span>
            </span>
          ) : kpi.iconType === 'atRisk' ? (
            <span className="flex items-center gap-1 text-rose-600 font-semibold">
              <TrendingUp className="w-3 h-3 text-rose-600" />
              {kpi.subtext}
            </span>
          ) : kpi.iconType === 'index' ? (
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              {kpi.subtext}
            </span>
          ) : kpi.iconType === 'confidence' ? (
            <span className="text-emerald-600 font-semibold">
              {kpi.subtext}
            </span>
          ) : (
            <span className="text-slate-500">
              {kpi.subtext}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
