import React from 'react';
import {
  X,
  Package,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { SkuDemandChange } from '../../../types/domain/demandSensing';

interface SkuDetailDrawerProps {
  sku: SkuDemandChange | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToForecast: () => void;
  onNavigateToInventory: () => void;
}

export const SkuDetailDrawer: React.FC<SkuDetailDrawerProps> = ({
  sku,
  isOpen,
  onClose,
  onNavigateToForecast,
  onNavigateToInventory,
}) => {
  if (!isOpen || !sku) return null;

  const isPositive = sku.numericChange > 0;

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
                  {sku.sku}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    isPositive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {sku.changePct} Sensed Change
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
              {sku.product}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <Package className="w-3.5 h-3.5 text-slate-400" />
              <span>SKU Identifier: {sku.sku}</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Primary Driver */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Primary Driving Signal
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{sku.primarySignal}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Signal Strength: {sku.signalStrength}
                  </div>
                </div>
                {isPositive ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-rose-600" />
                )}
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5">
                  Sensed Delta
                </div>
                <div
                  className={`text-lg font-bold font-mono ${
                    isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {sku.changePct}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Signal Confidence</span>
                </div>
                <div className="text-lg font-bold text-emerald-600 font-mono">
                  {sku.confidence}%
                </div>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-xl space-y-1.5">
              <div className="font-bold text-sky-900 text-xs">
                Recommended Action
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {sku.recommendedAction}
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
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
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
