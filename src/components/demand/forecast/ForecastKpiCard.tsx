import React from 'react';
import {
  TrendingDown,
  TrendingUp,
  BarChart2,
  Box,
  Layers,
  FileCheck,
  AlertTriangle,
  Trophy,
} from 'lucide-react';
import { ForecastKpi } from '../../../types/domain/demandForecast';

interface ForecastKpiCardProps {
  kpi: ForecastKpi;
  onClick?: () => void;
}

export const ForecastKpiCard: React.FC<ForecastKpiCardProps> = ({ kpi, onClick }) => {
  const getIconConfig = () => {
    switch (kpi.iconType) {
      case 'accuracy':
        return {
          icon: BarChart2,
          color: 'bg-info-bg text-[#0062d2] border border-border',
        };
      case 'fva':
        return {
          icon: Layers,
          color: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        };
      case 'demand':
        return {
          icon: Box,
          color: 'bg-info-bg text-[#0062d2] border border-border',
        };
      case 'service':
        return {
          icon: FileCheck,
          color: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        };
      case 'uncertainty':
        return {
          icon: AlertTriangle,
          color: 'bg-rose-50 text-rose-600 border border-rose-100',
        };
      case 'champion':
        return {
          icon: Trophy,
          color: 'bg-amber-50 text-amber-600 border border-amber-100',
        };
      default:
        return {
          icon: BarChart2,
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
        
        <div className={`tracking-tight leading-tight mt-0.5 ${
          kpi.iconType === 'champion'
            ? 'text-lg sm:text-xl font-bold text-slate-900 font-sans'
            : 'text-xl sm:text-[22px] font-bold text-slate-900 font-mono'
        }`}>
          {kpi.value}
        </div>

        {/* Subtext with semantic indicators */}
        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium">
          {kpi.iconType === 'accuracy' ? (
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingDown className="w-3 h-3 text-emerald-600" />
              {kpi.subtext}
            </span>
          ) : kpi.iconType === 'uncertainty' ? (
            <span className="flex items-center gap-1 text-rose-600 font-semibold">
              <TrendingUp className="w-3 h-3 text-rose-600" />
              {kpi.subtext}
            </span>
          ) : kpi.iconType === 'champion' ? (
            <span className="text-slate-500 font-normal">
              {kpi.subtext}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              {kpi.subtext}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
