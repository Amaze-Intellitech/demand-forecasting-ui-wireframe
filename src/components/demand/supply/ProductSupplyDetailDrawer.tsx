import React from 'react';
import { X, Layers, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { ProductSupplyPlanRow } from '../../../types/domain/supplyCapacityOptimization';

interface ProductSupplyDetailDrawerProps {
  product: ProductSupplyPlanRow | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPlant?: (plantName: string) => void;
}

export const ProductSupplyDetailDrawer: React.FC<ProductSupplyDetailDrawerProps> = ({
  product,
  isOpen,
  onClose,
  onNavigateToPlant,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{product.product}</h2>
              <p className="text-xs text-slate-500">
                Supply Plan & Capacity Allocation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Demand vs. Plan
              </span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">
                {product.demandK}K / {product.supplyPlanK}K
              </div>
              <span className="text-[11px] text-slate-500">
                Fulfillment Target: 100%
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Plant Capacity
              </span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">
                {product.capacityK}K units
              </div>
              <span className="text-[11px] font-semibold text-slate-700">
                {product.utilizationPercent}% Utilization
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Expected Service Level
              </span>
              <div className="text-lg font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{product.serviceLevelPercent}%</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Unfulfilled Backlog Risk
              </span>
              <div
                className={`text-lg font-bold mt-0.5 flex items-center gap-1 ${
                  product.backlogRiskK > 0 ? 'text-rose-600' : 'text-slate-700'
                }`}
              >
                {product.backlogRiskK > 0 && <AlertTriangle className="w-4 h-4" />}
                <span>{product.backlogRiskK}K units</span>
              </div>
            </div>
          </div>

          {/* Sourcing Plants */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Primary Sourcing Facilities
            </h3>
            <div className="space-y-2">
              {product.primaryPlants.map((plantName, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <span className="text-xs font-semibold text-slate-800">
                    {plantName}
                  </span>
                  <button
                    onClick={() => {
                      if (onNavigateToPlant) onNavigateToPlant(plantName);
                      onClose();
                    }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Site Schedule</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation Recommendation */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-lg p-3.5 text-xs text-indigo-950">
            <h4 className="font-bold text-indigo-900 mb-1">
              Linear Optimization Strategy
            </h4>
            <p className="leading-relaxed">
              For {product.product}, the solver prioritizes continuous runs on high-efficiency lines
              to avoid washouts. Recommended buffer stock stands at 14 days of forward cover.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
