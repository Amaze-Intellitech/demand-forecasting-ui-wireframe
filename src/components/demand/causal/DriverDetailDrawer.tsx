import React from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Sliders,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { TopDemandDriver } from '../../../types/domain/causalIntelligence';

interface DriverDetailDrawerProps {
  driver: TopDemandDriver | null;
  isOpen: boolean;
  onClose: () => void;
  onSimulateScenario: (driverName: string) => void;
}

export const DriverDetailDrawer: React.FC<DriverDetailDrawerProps> = ({
  driver,
  isOpen,
  onClose,
  onSimulateScenario,
}) => {
  if (!isOpen || !driver) return null;

  const isNegative = driver.isNegative;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {driver.category} Driver
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    isNegative
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {driver.impact} Modeled Impact
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-2.5 leading-snug">
              {driver.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {driver.description}
            </p>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Impact & Confidence Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  {isNegative ? (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                  ) : (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  <span>Causal Impact</span>
                </div>
                <div className={`text-xl font-extrabold font-mono ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {driver.impact}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Sensitivity: {driver.sensitivity}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Model Confidence</span>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900">
                  {driver.confidence}%
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                  High statistical backing
                </div>
              </div>
            </div>

            {/* Current Value & Historical Range */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-800 text-xs">
                Operating Parameters & Context
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] pt-1 border-t border-slate-200/80">
                <div>
                  <span className="text-slate-400">Current Value:</span>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{driver.currentValue}</div>
                </div>
                <div>
                  <span className="text-slate-400">Historical Range:</span>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{driver.historicalRange}</div>
                </div>
              </div>
            </div>

            {/* Causal Assumptions */}
            <div className="p-3.5 bg-sky-50/60 border border-sky-200 rounded-xl space-y-1.5">
              <div className="text-[11px] font-bold text-sky-950 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#0062d2]" />
                <span>Modeled Assumptions</span>
              </div>
              <p className="text-[11px] text-sky-900/80 leading-relaxed">
                Estimated impact reflects the selected product (HDPE Resin), Columbus facility, and historical multi-year customer purchase contracts under observed macro conditions.
              </p>
            </div>

            {/* Strategic Recommendation */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Executive Consideration</span>
              </div>
              <p className="text-emerald-950 leading-relaxed bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200 text-xs font-medium">
                {driver.recommendation}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onSimulateScenario(driver.name);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulate in Scenario Studio</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
