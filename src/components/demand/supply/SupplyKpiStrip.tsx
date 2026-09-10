import React from 'react';
import {
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Coins,
  Leaf,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { SupplyKpiItem } from '../../../types/domain/supplyCapacityOptimization';

interface SupplyKpiStripProps {
  kpis: SupplyKpiItem[];
  onKpiClick?: (kpiId: string) => void;
}

export const SupplyKpiStrip: React.FC<SupplyKpiStripProps> = ({ kpis, onKpiClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'capacity':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'utilization':
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'fulfillment':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'constraints':
        return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'cost':
        return <Coins className="w-5 h-5 text-emerald-600" />;
      case 'emissions':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
    }
  };

  const getContainerBg = (iconName: string) => {
    switch (iconName) {
      case 'capacity':
      case 'fulfillment':
      case 'cost':
      case 'emissions':
        return 'bg-emerald-50 border-emerald-100';
      case 'utilization':
        return 'bg-blue-50 border-blue-100';
      case 'constraints':
        return 'bg-rose-50 border-rose-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-5">
      {kpis.map((kpi) => {
        const isConstraint = kpi.iconName === 'constraints';
        const isCostOrEmission = kpi.iconName === 'cost' || kpi.iconName === 'emissions';

        return (
          <div
            key={kpi.id}
            onClick={() => onKpiClick && onKpiClick(kpi.id)}
            className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 ${getContainerBg(
                  kpi.iconName
                )}`}
              >
                {getIcon(kpi.iconName)}
              </div>
              <span className="text-[11px] font-medium text-slate-500 leading-snug text-right line-clamp-1">
                {kpi.title}
              </span>
            </div>

            <div className="mt-3">
              <div className="text-xl font-bold text-slate-900 tracking-tight">
                {kpi.value}
              </div>

              <div className="mt-1 flex items-center text-[11px] font-medium">
                {kpi.trend === 'up' ? (
                  <ArrowUp
                    className={`w-3 h-3 mr-0.5 shrink-0 ${
                      isConstraint ? 'text-rose-600' : kpi.iconName === 'utilization' ? 'text-amber-600' : 'text-emerald-600'
                    }`}
                  />
                ) : (
                  <ArrowDown
                    className={`w-3 h-3 mr-0.5 shrink-0 ${
                      isCostOrEmission ? 'text-emerald-600' : 'text-slate-500'
                    }`}
                  />
                )}
                <span
                  className={
                    isConstraint
                      ? 'text-rose-600 font-semibold'
                      : kpi.iconName === 'utilization'
                      ? 'text-amber-700 font-semibold'
                      : 'text-emerald-700 font-medium'
                  }
                >
                  {kpi.deltaText}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
