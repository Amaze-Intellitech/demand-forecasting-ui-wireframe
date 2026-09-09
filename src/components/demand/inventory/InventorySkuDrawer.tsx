import React from 'react';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  Layers,
  Building,
  Package,
} from 'lucide-react';
import { InventorySkuItem } from '../../../types/domain/inventoryIntelligence';

interface InventorySkuDrawerProps {
  sku: InventorySkuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onViewForecast: (sku: string) => void;
  onViewRisk: (sku: string) => void;
}

export const InventorySkuDrawer: React.FC<InventorySkuDrawerProps> = ({
  sku,
  isOpen,
  onClose,
  onViewForecast,
  onViewRisk,
}) => {
  if (!isOpen || !sku) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-black text-slate-900">
                {sku.sku}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  sku.status === 'At Risk'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : sku.status === 'Healthy'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : sku.status === 'Understocked'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}
              >
                {sku.status}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Package className="w-3 h-3 text-slate-400" />
                {sku.product}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" />
                {sku.plant}
              </span>
            </div>
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
        <div className="p-6 space-y-6 flex-1 text-xs">
          {/* Inventory Stock Position */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Stock Position
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-slate-500 text-[11px]">On-Hand Inventory</div>
                <div className="font-mono text-xl font-black text-slate-900 mt-0.5">
                  {sku.onHand}K units
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-slate-500 text-[11px]">Target Inventory</div>
                <div className="font-mono text-xl font-black text-slate-900 mt-0.5">
                  {sku.target}K units
                </div>
              </div>
            </div>

            {/* Target comparison bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Coverage Ratio</span>
                <span className="font-mono font-bold text-slate-700">
                  {Math.round((sku.onHand / sku.target) * 100)}% of Target
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    sku.status === 'At Risk'
                      ? 'bg-rose-500'
                      : sku.status === 'Healthy'
                      ? 'bg-emerald-500'
                      : sku.status === 'Understocked'
                      ? 'bg-amber-500'
                      : 'bg-purple-500'
                  }`}
                  style={{ width: `${Math.min(100, (sku.onHand / sku.target) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Operational Metrics */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Operational Metrics
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-slate-400 text-[10px]">Days of Supply</div>
                <div className="font-mono font-black text-slate-800 text-sm mt-0.5">
                  {sku.daysOfSupply}d
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-slate-400 text-[10px]">Service Level</div>
                <div className="font-mono font-black text-emerald-700 text-sm mt-0.5">
                  {sku.serviceLevel}%
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-slate-400 text-[10px]">Stockout Risk</div>
                <div
                  className={`font-mono font-black text-sm mt-0.5 ${
                    sku.stockoutRiskProb > 10 ? 'text-rose-600' : 'text-slate-700'
                  }`}
                >
                  {sku.stockoutRiskProb}%
                </div>
              </div>
            </div>
          </div>

          {/* Policy Recommendations */}
          <div className="space-y-3 p-4 bg-blue-50/40 border border-blue-100 rounded-xl">
            <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Safety Stock & Capital Impact</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 text-[11px]">Recommended Buffer:</span>
                <div className="font-mono font-bold text-slate-900 mt-0.5">
                  {sku.recommendedSafetyStock}K units
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[11px]">Capital Variance:</span>
                <div className="font-mono font-bold text-blue-700 mt-0.5 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{sku.workingCapitalImpact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Prescriptive Action */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Recommended Action</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {sku.recommendedAction}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewForecast(sku.sku)}
            className="flex-1 py-2 px-3 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer text-center"
          >
            View Forecast
          </button>
          <button
            type="button"
            onClick={() => onViewRisk(sku.sku)}
            className="flex-1 py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>View Risk</span>
          </button>
        </div>
      </div>
    </div>
  );
};
