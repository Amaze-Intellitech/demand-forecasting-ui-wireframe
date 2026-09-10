import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SupplyPlanApprovalState } from '../../../types/domain/supplyCapacityOptimization';

interface SupplyPlanApprovalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  approvalState: SupplyPlanApprovalState;
  onApprovePlan: (notes: string) => void;
}

export const SupplyPlanApprovalDrawer: React.FC<SupplyPlanApprovalDrawerProps> = ({
  isOpen,
  onClose,
  approvalState,
  onApprovePlan,
}) => {
  const [notes, setNotes] = useState<string>(approvalState.notes || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checklist, setChecklist] = useState({
    laborAgreement: true,
    feedstockSecured: true,
    transitBuffer: true,
    carbonCeiling: true,
  });

  if (!isOpen) return null;

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onApprovePlan(notes);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

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
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                S&OP Plan Executive Sign-off
              </h2>
              <p className="text-xs text-slate-500">
                Human-in-the-Loop Supply Rebalancing
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
          {/* Plan Meta */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900">
                Optimized Multi-Echelon Schedule
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Ready for Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Implements 10% Columbus capacity extension and shifts 84K units of PP Resin production
              to Jurong Island.
            </p>
          </div>

          {/* Impact Comparison Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Expected Plan Outcomes
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3 text-left font-medium">Metric</th>
                    <th className="py-2 px-3 text-right font-medium">Current Baseline</th>
                    <th className="py-2 px-3 text-right font-medium">Optimized Plan</th>
                    <th className="py-2 px-3 text-right font-medium">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-800">Demand Fulfillment</td>
                    <td className="py-2 px-3 text-right text-slate-500">98.2%</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-600">99.1%</td>
                    <td className="py-2 px-3 text-right text-emerald-600 font-semibold">+0.9%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-800">Supply Cost</td>
                    <td className="py-2 px-3 text-right text-slate-500">$1.84B</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-600">$1.80B</td>
                    <td className="py-2 px-3 text-right text-emerald-600 font-semibold">-$44M</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-800">Capacity Constraints</td>
                    <td className="py-2 px-3 text-right text-rose-500">3 Bottlenecks</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-600">0 Active</td>
                    <td className="py-2 px-3 text-right text-emerald-600 font-semibold">Resolved</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-800">CO₂ Footprint</td>
                    <td className="py-2 px-3 text-right text-slate-500">-10.2%</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-600">-12.4%</td>
                    <td className="py-2 px-3 text-right text-emerald-600 font-semibold">-2.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pre-flight Governance Checklist */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Pre-Flight Operational Validation
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.laborAgreement}
                  onChange={(e) =>
                    setChecklist({ ...checklist, laborAgreement: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700">
                  Columbus weekend shift labor availability confirmed by plant manager
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.feedstockSecured}
                  onChange={(e) =>
                    setChecklist({ ...checklist, feedstockSecured: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700">
                  Jurong Island monomer supply contracts validated for +84K volume
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.transitBuffer}
                  onChange={(e) =>
                    setChecklist({ ...checklist, transitBuffer: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700">
                  Customer delivery lead-time tolerances remain within contracted SLAs
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.carbonCeiling}
                  onChange={(e) =>
                    setChecklist({ ...checklist, carbonCeiling: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700">
                  Network carbon intensity meets corporate ESG compliance threshold
                </span>
              </label>
            </div>
          </div>

          {/* S&OP Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Executive Sign-Off Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add sign-off commentary for the ERP production dispatch..."
              className="w-full text-xs p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={handleApprove}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-75"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing Plan...' : 'Approve & Publish to ERP'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
