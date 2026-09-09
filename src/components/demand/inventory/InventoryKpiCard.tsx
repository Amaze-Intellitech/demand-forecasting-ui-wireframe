import React from 'react';
import {
  Box,
  Coins,
  Target,
  AlertTriangle,
  Clock,
  BarChart3,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import { InventoryKpi } from '../../../types/domain/inventoryIntelligence';

interface InventoryKpiCardProps {
  kpi: InventoryKpi;
  onClick?: () => void;
}

export const InventoryKpiCard: React.FC<InventoryKpiCardProps> = ({ kpi, onClick }) => {
  const getIcon = () => {
    switch (kpi.iconName) {
      case 'box':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/60 shadow-xs">
            <Box className="w-5 h-5" />
          </div>
        );
      case 'coins':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/60 shadow-xs">
            <Coins className="w-5 h-5" />
          </div>
        );
      case 'target':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/60 shadow-xs">
            <Target className="w-5 h-5" />
          </div>
        );
      case 'alert':
        return (
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100/60 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
        );
      case 'clock':
        return (
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100/60 shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
        );
      case 'barChart':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/60 shadow-xs">
            <BarChart3 className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shadow-xs">
            <Box className="w-5 h-5" />
          </div>
        );
    }
  };

  const getSubtextColor = () => {
    switch (kpi.subtextColor) {
      case 'emerald':
        return 'text-emerald-600';
      case 'rose':
        return 'text-rose-600';
      case 'amber':
        return 'text-amber-600';
      default:
        return 'text-slate-500';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 transition-all duration-200 hover:shadow-md hover:border-slate-300 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Icon Square */}
      <div className="flex-shrink-0">{getIcon()}</div>

      {/* Metric Content */}
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider truncate">
          {kpi.title}
        </div>
        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mt-0.5 font-mono">
          {kpi.value}
        </div>
        <div className={`text-[11px] font-semibold flex items-center gap-1 mt-0.5 ${getSubtextColor()}`}>
          {kpi.trendDirection === 'down' ? (
            <ArrowDown className="w-3 h-3 inline flex-shrink-0" />
          ) : kpi.trendDirection === 'up' ? (
            <ArrowUp className="w-3 h-3 inline flex-shrink-0" />
          ) : null}
          <span className="truncate">{kpi.subtext.replace(/^[↓↑]\s*/, '')}</span>
        </div>
      </div>
    </div>
  );
};
