import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';
import { SOURCING_NEXT_STEPS } from '../../data/demandSourcingMock';

export const SourcingNextStepsCard: React.FC = () => {
  const [showImplementModal, setShowImplementModal] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsDone(true);
    }, 1500);
  };

  const handleClose = () => {
    setShowImplementModal(false);
    setIsExecuting(false);
    setIsDone(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Next Steps
        </h3>
        <span className="text-xs text-slate-400 font-mono">4 Pending Actions</span>
      </div>

      {/* Numbered Steps & CTA Grid */}
      <div className="my-3 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Numbered List */}
        <div className="lg:col-span-8 space-y-2.5">
          {SOURCING_NEXT_STEPS.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                {idx + 1}
              </span>
              <span className="leading-5 font-medium">{step}</span>
            </div>
          ))}
        </div>

        {/* CTA Button Box */}
        <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-4">
          <button
            type="button"
            onClick={() => setShowImplementModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all transform active:scale-98 cursor-pointer group"
          >
            <span>Implement Plan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[10px] text-slate-400 mt-1.5 text-center lg:text-right">
            Dispatches allocations to SAP / Oracle ERP
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Approval Workflow: <strong>Procurement VP Sign-Off</strong></span>
        <span>Auto-sync with Ingestion Pipeline</span>
      </div>

      {/* Implement Plan Confirmation Modal */}
      {showImplementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0062d2]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Implement Sourcing Plan</h4>
                  <p className="text-xs text-slate-500">Commit allocations across selected suppliers</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isDone ? (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  You are about to approve and commit the optimized procurement mix for{' '}
                  <strong className="text-slate-900">HDPE Resin (SKU-9021)</strong> at{' '}
                  <strong className="text-slate-900">Columbus Plant #04</strong>:
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Supplier A:</span>
                    <strong className="font-mono text-slate-900">48,200 units ($4.43M)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Supplier B:</span>
                    <strong className="font-mono text-slate-900">36,100 units ($3.68M)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Supplier C:</span>
                    <strong className="font-mono text-slate-900">24,300 units ($2.67M)</strong>
                  </div>
                  <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-slate-900">
                    <span>Total Sourcing Commitment:</span>
                    <span className="text-[#0062d2] font-mono">$10.78M</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60 text-[11px] text-blue-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0062d2] shrink-0 mt-0.5" />
                  <span>
                    Contract negotiation draft and EDI purchase requisition payloads will be
                    automatically generated and queued.
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    disabled={isExecuting}
                    onClick={handleClose}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isExecuting}
                    onClick={handleExecute}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0062d2] hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    {isExecuting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting to ERP...</span>
                      </>
                    ) : (
                      <span>Confirm & Execute Plan</span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Plan Dispatched Successfully</h5>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Procurement allocations have been synced to SAP S/4HANA with confirmation ID #PR-88291-TX.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#0062d2] hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
