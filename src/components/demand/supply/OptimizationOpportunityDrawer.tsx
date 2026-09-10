import React from 'react';
import { X, Sparkles, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { OptimizationOpportunityItem } from '../../../types/domain/supplyCapacityOptimization';

interface OptimizationOpportunityDrawerProps {
  opportunity: OptimizationOpportunityItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyOpportunity?: (id: string) => void;
}

export const OptimizationOpportunityDrawer: React.FC<OptimizationOpportunityDrawerProps> = ({
  opportunity,
  isOpen,
  onClose,
  onApplyOpportunity,
}) => {
  if (!isOpen || !opportunity) return null;

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
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {opportunity.title}
              </h2>
              <p className="text-xs text-slate-500">
                Target: {opportunity.targetPlant} &bull; {opportunity.targetProduct}
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
          {/* Key Impact Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-3.5">
              <span className="text-[10px] uppercase font-bold text-emerald-800">
                Operational Impact
              </span>
              <div className="text-xl font-bold text-emerald-700 mt-0.5">
                {opportunity.impactValue}
              </div>
              <span className="text-[11px] text-emerald-600">
                Net throughput unlocked
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Financial Gain
              </span>
              <div className="text-xl font-bold text-slate-900 mt-0.5">
                {opportunity.financialGain}
              </div>
              <span className="text-[11px] text-slate-500">
                Complexity: <strong>{opportunity.complexity}</strong>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Optimization Rationale
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
              {opportunity.description}
            </p>
          </div>

          {/* Recommended Action */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Prescriptive Implementation Step
            </h3>
            <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 leading-relaxed font-medium">
              {opportunity.recommendedAction}
            </div>
          </div>

          {/* Implementation Timeline */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Lead Time: <strong>{opportunity.estimatedLeadTime}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Status: <strong>{opportunity.status}</strong></span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (onApplyOpportunity) onApplyOpportunity(opportunity.id);
              onClose();
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <span>Incorporate into Supply Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
