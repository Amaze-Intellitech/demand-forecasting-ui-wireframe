import React from 'react';
import {
  X,
  Package,
  TrendingUp,
  ShieldCheck,
  Boxes,
  Radio,
  Cpu,
} from 'lucide-react';
import { ForecastSkuChange } from '../../../types/domain/demandForecast';

interface SkuForecastDrawerProps {
  sku: ForecastSkuChange | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToInventory: () => void;
  onNavigateToSensing: () => void;
}

export const SkuForecastDrawer: React.FC<SkuForecastDrawerProps> = ({
  sku,
  isOpen,
  onClose,
  onNavigateToInventory,
  onNavigateToSensing,
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
                  {sku.changeVsPrior} vs. Prior Cycle
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
              <span>SKU Master ID: {sku.sku}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Forecast Comparison Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-info-bg border border-border rounded-xl">
                <div className="text-[11px] text-[#0062d2] font-semibold mb-0.5">
                  Current Forecast (FY25)
                </div>
                <div className="text-xl font-extrabold font-mono text-[#0062d2]">
                  {sku.currentForecast}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                  {sku.changeVsPrior} growth
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5">
                  Prior Forecast
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-700">
                  {sku.priorForecast}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Previous planning baseline
                </div>
              </div>
            </div>

            {/* Model & Confidence Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#0062d2]" />
                  <span>Champion Model:</span>
                </span>
                <span className="font-semibold text-slate-900">{sku.championModel}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                <span className="text-slate-500 text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Confidence Rating:</span>
                </span>
                <span className="font-bold text-slate-800">{sku.confidence} ({sku.confidenceBars}/4)</span>
              </div>
            </div>

            {/* Key Drivers */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#0062d2]" />
                <span>Key Demand Drivers</span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
                {sku.keyDrivers}
              </p>
            </div>

            {/* Recommended Action */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Recommended Planning Action
              </div>
              <p className="text-emerald-950 leading-relaxed bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-200 text-xs font-medium">
                {sku.recommendedAction}
              </p>
            </div>
          </div>

          {/* Footer Actions with Cross-Workspace Links */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToInventory();
                }}
                className="py-2 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Boxes className="w-3.5 h-3.5 text-slate-500" />
                <span>View Inventory</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToSensing();
                }}
                className="py-2 px-3 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Demand Sensing</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
