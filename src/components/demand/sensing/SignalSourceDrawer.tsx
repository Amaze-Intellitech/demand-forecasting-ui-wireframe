import React from 'react';
import {
  X,
  Radio,
  Clock,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { SignalSource } from '../../../types/domain/demandSensing';

interface SignalSourceDrawerProps {
  source: SignalSource | null;
  isOpen: boolean;
  onClose: () => void;
  onFilterBySource?: (sourceName: string) => void;
}

export const SignalSourceDrawer: React.FC<SignalSourceDrawerProps> = ({
  source,
  isOpen,
  onClose,
  onFilterBySource,
}) => {
  if (!isOpen || !source) return null;

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
                  {source.id}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    source.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  ● {source.status}
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
              {source.name}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Updated {source.freshness}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {source.affectedRegion}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Current Signal Telemetry */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Active Telemetry & Signal
              </div>
              <div className="p-3.5 bg-sky-50/60 border border-sky-200/80 rounded-lg flex items-start gap-2.5 text-sky-950 font-medium">
                <Radio className="w-4 h-4 text-[#0062d2] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Current Velocity</div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {source.currentSignal}
                  </p>
                </div>
              </div>
            </div>

            {/* Signal Metrics Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#0062d2]" />
                  <span>Impact Magnitude</span>
                </div>
                <div className="text-sm font-bold text-slate-900 font-mono">
                  {source.impact} Impact
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Signal Confidence</span>
                </div>
                <div className="text-sm font-bold text-emerald-600 font-mono">
                  {source.confidence}%
                </div>
              </div>
            </div>

            {/* Feed Association */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-800 text-xs">
                Signal Stream Integration
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                This signal stream is actively weighted into the short-term sensed demand adjustment model.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onFilterBySource?.(source.name);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Filter Live Feed</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
