import React from 'react';
import {
  X,
  Calendar,
  Layers,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { DriverBreakEvent } from '../../../types/domain/causalIntelligence';

interface DriverEventDrawerProps {
  event: DriverBreakEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScenarios: () => void;
}

export const DriverEventDrawer: React.FC<DriverEventDrawerProps> = ({
  event,
  isOpen,
  onClose,
  onNavigateToScenarios,
}) => {
  if (!isOpen || !event) return null;

  const isPositive = event.impactNum > 0;

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
                  {event.type}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    isPositive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {event.impact} Demand Impact
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
              {event.event}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Driver: {event.driver}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Impact Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                  )}
                  <span>Modeled Effect</span>
                </div>
                <div className={`text-xl font-extrabold font-mono ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {event.impact}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Attribution Confidence</span>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900">
                  {event.confidence}%
                </div>
              </div>
            </div>

            {/* Observed Change */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Observed Variable Shift
              </div>
              <p className="text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs font-medium">
                {event.observedChange}
              </p>
            </div>

            {/* Business Context */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Business & Market Context
              </div>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
                {event.businessContext}
              </p>
            </div>

            {/* Actionable Consideration */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Actionable Recommendation
              </div>
              <p className="text-emerald-950 leading-relaxed bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200 text-xs font-medium">
                {event.recommendation}
              </p>
            </div>
          </div>

          {/* Footer */}
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
                onClose();
                onNavigateToScenarios();
              }}
              className="px-4 py-2 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore in Scenario Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
