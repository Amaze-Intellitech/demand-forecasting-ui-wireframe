import React from 'react';
import {
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Clock,
  Info,
} from 'lucide-react';
import { InventoryRisk } from '../../../types/domain/inventoryIntelligence';

interface InventoryRisksProps {
  risks: InventoryRisk[];
  onSelectRisk: (risk: InventoryRisk) => void;
  onViewAll: () => void;
}

export const InventoryRisks: React.FC<InventoryRisksProps> = ({
  risks,
  onSelectRisk,
  onViewAll,
}) => {
  const getRiskIcon = (severity: string, index: number) => {
    if (severity === 'High') {
      return (
        <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100 flex-shrink-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
      );
    }
    if (severity === 'Medium') {
      if (index === 3) {
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        );
      }
      return (
        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 flex-shrink-0">
          <AlertCircle className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100 flex-shrink-0">
        <Info className="w-4 h-4" />
      </div>
    );
  };

  const getSeverityBadge = (severity: string) => {
    if (severity === 'High') {
      return (
        <span className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-md">
          High
        </span>
      );
    }
    if (severity === 'Medium') {
      return (
        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
          Medium
        </span>
      );
    }
    return (
      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
        Low
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Inventory Risks & Exceptions
          </h3>
          <p className="text-xs text-slate-500">
            Active exposure and supply chain disruptions
          </p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Risk Items List */}
      <div className="space-y-2.5 my-auto">
        {risks.slice(0, 5).map((risk, index) => (
          <div
            key={risk.id}
            onClick={() => onSelectRisk(risk)}
            className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-slate-50/80 border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {getRiskIcon(risk.severity, index)}
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {risk.title}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {risk.summary}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              {getSeverityBadge(risk.severity)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
