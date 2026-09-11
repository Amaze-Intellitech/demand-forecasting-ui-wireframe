import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { ScenarioPreset } from '../../../types/domain/scenarioDecisionTwin';

interface ApplyPlanningModalProps {
  scenario: ScenarioPreset | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (scenarioId: string) => void;
}

export const ApplyPlanningModal: React.FC<ApplyPlanningModalProps> = ({
  scenario,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !scenario) return null;

  const handleApply = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(scenario.id);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Apply Scenario to S&OP Planning
              </h3>
              <p className="text-xs text-slate-500">
                Promote simulated twin as active operational baseline
              </p>
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

        {/* Selected Scenario Context */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-semibold">Selected Scenario:</span>
            <span className="font-bold text-slate-900 text-sm">
              {scenario.name}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1 border-t border-slate-200/70">
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold">Demand</div>
              <div className="font-mono font-bold text-slate-900 mt-0.5">
                {scenario.outcomes.totalDemand}
              </div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold">Margin</div>
              <div className="font-mono font-bold text-emerald-700 mt-0.5">
                {scenario.outcomes.grossMargin}
              </div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold">Service</div>
              <div className="font-mono font-bold text-slate-900 mt-0.5">
                {scenario.outcomes.serviceLevel}
              </div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold">Inventory</div>
              <div className="font-mono font-bold text-slate-900 mt-0.5">
                {scenario.outcomes.inventoryNeed}
              </div>
            </div>
          </div>
        </div>

        {/* Warning / Confirmation Message */}
        <div className="p-3.5 bg-info-bg border border-border rounded-xl flex items-start gap-2.5 text-xs text-deep">
          <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            This will mark <strong>{scenario.name}</strong> as the official active consensus planning assumption for the demand forecasting and supply optimization twins.
          </p>
        </div>

        {/* Success Confirmation Animation */}
        {isSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2 animate-in fade-in">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Planning Scenario Successfully Activated!</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSuccess}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={isSuccess}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Confirm & Apply to Planning</span>
          </button>
        </div>
      </div>
    </div>
  );
};
