import React from 'react';
import {
  X,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingDown,
  Building,
  Package,
} from 'lucide-react';
import { InventoryRisk } from '../../../types/domain/inventoryIntelligence';

interface InventoryRiskDrawerProps {
  risk: InventoryRisk | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenExceptionsCenter: () => void;
}

export const InventoryRiskDrawer: React.FC<InventoryRiskDrawerProps> = ({
  risk,
  isOpen,
  onClose,
  onOpenExceptionsCenter,
}) => {
  if (!isOpen || !risk) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${
                  risk.severity === 'High'
                    ? 'bg-rose-50 text-rose-600'
                    : risk.severity === 'Medium'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                  risk.severity === 'High'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : risk.severity === 'Medium'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {risk.severity} Severity
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-2">
              {risk.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{risk.summary}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 flex-1 text-xs">
          {/* Affected Scope */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-slate-400" />
                <span>Affected SKU</span>
              </div>
              <div className="font-mono text-sm font-bold text-slate-900 mt-1">
                {risk.sku}
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" />
                <span>Manufacturing Plant</span>
              </div>
              <div className="font-medium text-sm text-slate-900 mt-1 truncate">
                {risk.plant}
              </div>
            </div>
          </div>

          {/* Probabilities & Timelines */}
          <div className="p-4 bg-rose-50/30 border border-rose-100 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Stockout Probability</span>
              <span className="font-mono font-black text-rose-600 text-base">
                {risk.riskProbability}%
              </span>
            </div>
            <div className="w-full bg-rose-100/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${Math.min(100, risk.riskProbability * 2)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-rose-100/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-rose-500" />
                <span>Expected Risk Horizon:</span>
              </span>
              <span className="font-bold text-slate-800">{risk.timeToRisk}</span>
            </div>
          </div>

          {/* Current vs Expected Demand */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Current Inventory
              </div>
              <div className="font-mono font-bold text-slate-800 text-sm mt-0.5">
                {risk.currentInventory}
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Expected Demand
              </div>
              <div className="font-mono font-bold text-slate-800 text-sm mt-0.5">
                {risk.expectedDemand}
              </div>
            </div>
          </div>

          {/* Root Cause Analysis */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-amber-500" />
              <span>Diagnosed Root Cause</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {risk.rootCause}
            </p>
          </div>

          {/* Recommended Mitigation */}
          <div className="p-4 bg-emerald-50/40 border border-emerald-200/70 rounded-xl space-y-1">
            <div className="font-bold text-emerald-900 text-xs">
              Recommended Mitigation Action
            </div>
            <p className="text-slate-700 text-xs leading-relaxed">
              {risk.recommendedAction}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={onOpenExceptionsCenter}
            className="flex-1 py-2 px-4 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Open Risk & Exception Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
