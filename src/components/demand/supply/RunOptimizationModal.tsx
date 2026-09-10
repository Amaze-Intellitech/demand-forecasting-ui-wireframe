import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sliders, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

interface RunOptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyResults: () => void;
}

export const RunOptimizationModal: React.FC<RunOptimizationModalProps> = ({
  isOpen,
  onClose,
  onApplyResults,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsCompleted(false);
      return;
    }

    // Step sequence simulation
    const t1 = setTimeout(() => setCurrentStep(1), 500);
    const t2 = setTimeout(() => setCurrentStep(2), 1200);
    const t3 = setTimeout(() => setCurrentStep(3), 1900);
    const t4 = setTimeout(() => {
      setCurrentStep(4);
      setIsCompleted(true);
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    { label: 'Ingesting unconstrained demand forecasts & order book', sub: 'Aggregated 1.46M units across 5 global regions' },
    { label: 'Auditing 5 plant capacity envelopes & line limits', sub: 'Identified 3 active bottleneck lines at Columbus and Antwerp' },
    { label: 'Running multi-echelon linear optimization solver', sub: 'Simulating 4,200 sourcing & allocation permutations' },
    { label: 'Generating optimal Pareto allocation schedule', sub: 'Found global optimum at 99.1% service with -$44M cost reduction' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Supply Network Optimization Engine
              </h3>
              <p className="text-xs text-slate-500">
                Linear Programming & Capacity Balancing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="space-y-3">
            {steps.map((step, idx) => {
              const isFinished = currentStep > idx;
              const isRunning = currentStep === idx && !isCompleted;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all ${
                    isFinished
                      ? 'bg-emerald-50/50 border-emerald-200/70'
                      : isRunning
                      ? 'bg-blue-50/50 border-blue-200/80 shadow-xs'
                      : 'bg-slate-50 border-slate-200/50 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isFinished ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isRunning ? (
                        <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-medium">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-800">
                        {step.label}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {step.sub}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results preview banner when completed */}
          {isCompleted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 animate-in fade-in duration-300">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Global Optimum Found & Validated</span>
              </div>
              <p className="text-xs text-emerald-800">
                The solver has resolved Columbus line constraints and allocated 84K units to Jurong Island.
                Demand fulfillment rises to <strong>99.1%</strong> with a <strong>-$44M</strong> net cost reduction.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onApplyResults();
              onClose();
            }}
            disabled={!isCompleted}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            <span>Review S&OP Sign-Off</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
