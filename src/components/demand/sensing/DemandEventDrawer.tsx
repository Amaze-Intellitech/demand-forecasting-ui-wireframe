import React from 'react';
import {
  X,
  AlertTriangle,
  Clock,
  MapPin,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { DemandEvent } from '../../../types/domain/demandSensing';

interface DemandEventDrawerProps {
  event: DemandEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToForecast: () => void;
  onNavigateToInventory: () => void;
}

export const DemandEventDrawer: React.FC<DemandEventDrawerProps> = ({
  event,
  isOpen,
  onClose,
  onNavigateToForecast,
  onNavigateToInventory,
}) => {
  if (!isOpen || !event) return null;

  const isHigh = event.severity === 'High';
  const isMedium = event.severity === 'Medium';

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
                  {event.id}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    isHigh
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : isMedium
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {event.severity} Severity Event
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-2.5 leading-snug">
              {event.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Detected {event.detectedAt}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {event.signalSource}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Impact Summary */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Estimated Operational Impact
              </div>
              <div className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-lg flex items-start gap-2.5 text-rose-950 font-medium">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">{event.impact}</div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {event.estimatedImpact}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#0062d2]" />
                  <span>Signal Source</span>
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {event.signalSource}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Signal Confidence</span>
                </div>
                <div className="text-sm font-bold text-emerald-600 font-mono">
                  {event.confidence}%
                </div>
              </div>
            </div>

            {/* Supporting Signals List */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Corroborating Signal Feeds
              </div>
              <div className="space-y-1.5">
                {event.supportingSignals.map((sig) => (
                  <div
                    key={sig}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-800"
                  >
                    <span>{sig}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action */}
            <div className="p-4 bg-info-bg border border-border rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-deep font-bold text-xs">
                <TrendingDown className="w-3.5 h-3.5 text-[#0062d2]" />
                <span>Recommended Prescriptive Response</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed text-[11px]">
                {event.recommendedAction}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToInventory();
                }}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-xs flex items-center gap-1"
              >
                <span>View Inventory</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToForecast();
                }}
                className="px-3.5 py-2 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>View Forecast</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
