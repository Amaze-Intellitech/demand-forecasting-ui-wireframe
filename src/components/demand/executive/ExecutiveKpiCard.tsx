import React from 'react';
import {
  BarChart2,
  Package,
  Box,
  ShieldCheck,
  AlertTriangle,
  Coins,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { ExecutiveKpi } from '../../../types/domain/executiveCommandCenter';

interface ExecutiveKpiCardProps {
  kpi: ExecutiveKpi;
  onClick?: () => void;
}

export const ExecutiveKpiCard: React.FC<ExecutiveKpiCardProps> = ({ kpi, onClick }) => {
  const getIcon = () => {
    switch (kpi.iconType) {
      case 'demand':
        return {
          icon: BarChart2,
          bgColor: 'bg-info-bg text-primary border border-border',
        };
      case 'revenue':
        return {
          icon: Package,
          bgColor: 'bg-emerald-50 text-emerald-600 border border-emerald-100/80',
        };
      case 'inventory':
        return {
          icon: Box,
          bgColor: 'bg-purple-50 text-purple-600 border border-purple-100/80',
        };
      case 'service':
        return {
          icon: ShieldCheck,
          bgColor: 'bg-info-bg text-primary border border-border',
        };
      case 'exceptions':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-rose-50 text-rose-600 border border-rose-100/80',
        };
      case 'sourcing':
        return {
          icon: Coins,
          bgColor: 'bg-amber-50 text-amber-600 border border-amber-100/80',
        };
      default:
        return {
          icon: BarChart2,
          bgColor: 'bg-slate-50 text-slate-600 border border-slate-100',
        };
    }
  };

  const { icon: Icon, bgColor } = getIcon();

  const isPositive = kpi.trendDirection === 'up' && kpi.semanticIntent !== 'critical';
  const isNegative = kpi.trendDirection === 'down' || kpi.semanticIntent === 'negative';
  const isCritical = kpi.semanticIntent === 'critical';

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/80 rounded-xl p-4 sm:p-4.5 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all flex items-start gap-3.5 select-none ${
        onClick ? 'cursor-pointer hover:bg-slate-50/50' : ''
      }`}
    >
      {/* Icon Badge */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgColor}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-[11px] sm:text-xs font-medium text-slate-500 truncate">
          {kpi.label}
        </div>
        <div className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
          {kpi.value}
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium">
          {isCritical ? (
            <span className="flex items-center gap-1 text-rose-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
              {kpi.subtext}
            </span>
          ) : isPositive ? (
            <span className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              {kpi.subtext}
            </span>
          ) : isNegative ? (
            <span className="flex items-center gap-1 text-rose-600">
              <TrendingDown className="w-3 h-3 text-rose-600" />
              {kpi.subtext}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-600">
              <ArrowRight className="w-3 h-3 text-emerald-600" />
              {kpi.subtext}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
