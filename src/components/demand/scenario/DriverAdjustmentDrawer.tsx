import React, { useState, useEffect } from 'react';
import { X, Sliders, ShieldCheck } from 'lucide-react';
import { ScenarioDriverRow } from '../../../types/domain/scenarioDecisionTwin';

interface DriverAdjustmentDrawerProps {
  driver: ScenarioDriverRow | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (driverId: string, updatedValue: string) => void;
}

export const DriverAdjustmentDrawer: React.FC<DriverAdjustmentDrawerProps> = ({
  driver,
  isOpen,
  onClose,
  onApply,
}) => {
  const [val, setVal] = useState<string>('');

  useEffect(() => {
    if (driver) {
      setVal(driver.scenarioValue);
    }
  }, [driver]);

  if (!isOpen || !driver) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Adjust Driver Assumption
              </h3>
              <p className="text-xs text-slate-500">{driver.driver}</p>
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

        {/* Body */}
        <div className="p-6 space-y-5 flex-1 text-xs">
          {/* Values Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Baseline Parameter
              </span>
              <div className="font-mono text-base font-bold text-slate-700 mt-1">
                {driver.baseValue}
              </div>
            </div>

            <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl">
              <span className="text-[10px] text-blue-700 uppercase font-semibold">
                Scenario Assumption
              </span>
              <div className="font-mono text-base font-bold text-blue-900 mt-1">
                {val}
              </div>
            </div>
          </div>

          {/* Input field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Edit Assumption Value
            </label>
            <input
              type="text"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 font-mono font-bold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Expected Demand Impact & Confidence */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Expected Demand Impact:</span>
              <span className="font-mono font-bold text-slate-900">
                {driver.impactOnDemand}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200/60">
              <span className="text-slate-600 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Statistical Confidence:</span>
              </span>
              <span className="font-bold text-emerald-700">{driver.confidence}</span>
            </div>
          </div>

          {/* Business Context */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-700">Business Rationale</span>
            <p className="text-slate-600 text-xs leading-relaxed">
              {driver.businessContext}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setVal(driver.baseValue)}
            className="py-2 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Reset to Base
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(driver.id, val);
              onClose();
            }}
            className="py-2 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Apply Assumption
          </button>
        </div>
      </div>
    </div>
  );
};
