import React from 'react';
import { X, AlertTriangle, AlertCircle, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { SupplyConstraintAlert } from '../../../types/domain/supplyCapacityOptimization';

interface ConstraintDetailDrawerProps {
  alert: SupplyConstraintAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyMitigation?: (alertId: string) => void;
}

export const ConstraintDetailDrawer: React.FC<ConstraintDetailDrawerProps> = ({
  alert,
  isOpen,
  onClose,
  onApplyMitigation,
}) => {
  if (!isOpen || !alert) return null;

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
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                alert.severity === 'High'
                  ? 'bg-rose-50 text-rose-600 border border-rose-100'
                  : alert.severity === 'Medium'
                  ? 'bg-amber-50 text-amber-600 border border-amber-100'
                  : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
            >
              {alert.severity === 'High' ? (
                <AlertTriangle className="w-5 h-5" />
              ) : alert.severity === 'Medium' ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 leading-none">
                  {alert.title}
                </h2>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    alert.severity === 'High'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : alert.severity === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {alert.severity} Severity
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{alert.subtext}</p>
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
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Disruption Impact Assessment
            </span>
            <div className="text-sm font-semibold text-slate-900 mt-1">
              {alert.impactEstimate}
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
              <span>Location: <strong>{alert.plantOrRegion}</strong></span>
              <span>Status: <strong className="text-blue-600">{alert.status}</strong></span>
            </div>
          </div>

          {/* Affected Product Lines */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Affected Products ({alert.affectedProducts.length})
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {alert.affectedProducts.map((p, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-md border border-slate-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Mitigation */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recommended Operational Mitigation</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed font-normal">
              {alert.recommendedMitigation}
            </p>
          </div>

          {/* Resolution Timeline */}
          <div className="p-4 bg-slate-50/70 border border-slate-200/70 rounded-lg text-xs space-y-2">
            <div className="font-semibold text-slate-700">Autonomous Resolution Playbook</div>
            <div className="flex items-start gap-2 text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span>S&OP solver calculates dual-sourcing rebalancing schedule.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span>Auto-generates shift scheduling proposal for plant operations.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span>Tracks fulfillment SLA risk across customer contracts daily.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (onApplyMitigation) onApplyMitigation(alert.id);
              onClose();
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <span>Execute Mitigation Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
