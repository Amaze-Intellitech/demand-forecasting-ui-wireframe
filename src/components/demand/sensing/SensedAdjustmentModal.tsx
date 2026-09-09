import React from 'react';
import { X, CheckCircle2, TrendingUp, ShieldCheck, Undo2 } from 'lucide-react';
import { SensedAdjustmentRecommendation } from '../../../types/domain/demandSensing';

interface SensedAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: SensedAdjustmentRecommendation;
  isApplied: boolean;
  onApply: () => void;
  onUndo: () => void;
}

export const SensedAdjustmentModal: React.FC<SensedAdjustmentModalProps> = ({
  isOpen,
  onClose,
  recommendation,
  isApplied,
  onApply,
  onUndo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0062d2] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Apply Sensed Demand Adjustment
              </h3>
              <p className="text-[11px] text-slate-500">
                Short-term baseline synchronization
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Applied Alert if active */}
        {isApplied && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-bold">Sensed Adjustment Active</span>
                <div className="text-[11px] text-emerald-700">
                  Adjusted Forecast: {recommendation.adjustedForecast} (+8.5%)
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onUndo}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <Undo2 className="w-3 h-3" />
              Undo
            </button>
          </div>
        )}

        {/* Comparison Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
            <div className="text-slate-400 font-medium text-[11px]">Baseline Forecast</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
              {recommendation.baselineForecast}
            </div>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-200/80 rounded-xl text-center">
            <div className="text-[#0062d2] font-medium text-[11px]">Sensed Demand</div>
            <div className="text-lg font-bold font-mono text-[#0062d2] mt-0.5">
              {recommendation.sensedDemand}
            </div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
              {recommendation.adjustmentPct}
            </div>
          </div>
        </div>

        {/* Recommendation Details */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">
              Recommended Near-Term Adjustment
            </span>
            <span className="font-bold font-mono text-emerald-600">
              {recommendation.recommendedPct}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Signal Agreement Confidence: {recommendation.confidence}</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px] pt-1 border-t border-slate-200/60">
            {recommendation.reason}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          {!isApplied ? (
            <button
              type="button"
              onClick={() => {
                onApply();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#0062d2] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Apply Adjustment</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onUndo();
                onClose();
              }}
              className="px-4 py-2 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs shadow-xs transition-all"
            >
              Undo Adjustment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
