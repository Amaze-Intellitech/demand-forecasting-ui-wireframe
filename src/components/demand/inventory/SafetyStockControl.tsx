import React, { useState } from 'react';
import { X, Sliders, ShieldCheck, DollarSign, Activity } from 'lucide-react';
import { SafetyStockScenario } from '../../../types/domain/inventoryIntelligence';
import { mockInventoryRepository } from '../../../repositories/mock/inventoryIntelligenceRepository';

interface SafetyStockControlProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyStockControl: React.FC<SafetyStockControlProps> = ({
  isOpen,
  onClose,
}) => {
  const [bufferPct, setBufferPct] = useState<number>(100);

  if (!isOpen) return null;

  const currentScenario: SafetyStockScenario =
    mockInventoryRepository.getSafetyStockScenarioByBuffer(bufferPct);

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Optimal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Moderate Risk':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Elevated Risk':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Conservative':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Safety Stock Buffer Optimization
              </h3>
              <p className="text-xs text-slate-500">
                Simulate service level availability vs. working capital exposure
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

        {/* Trade-off Concept Explainer */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 space-y-1">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Operational Trade-Off Principle</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Higher buffer enhances fill rate and resilience during demand spikes but ties up capital. Lower buffer releases cash but elevates stockout risk.
          </p>
        </div>

        {/* Slider Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Safety Stock Policy Buffer</span>
            <span className="font-mono text-base font-bold text-blue-600">
              {bufferPct}%
            </span>
          </div>
          <input
            type="range"
            min="80"
            max="130"
            step="10"
            value={bufferPct}
            onChange={(e) => setBufferPct(Number(e.target.value))}
            className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>80% (Aggressive)</span>
            <span>100% (Baseline)</span>
            <span>130% (High Resilience)</span>
          </div>
        </div>

        {/* Live Simulation Results Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Safety Stock
            </div>
            <div className="text-xl font-mono font-black text-slate-900 mt-1">
              {currentScenario.safetyStock}K
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Units required</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Service Level</span>
            </div>
            <div className="text-xl font-mono font-black text-emerald-700 mt-1">
              {currentScenario.serviceLevel}%
            </div>
            <div className="text-[10px] text-emerald-600 mt-0.5">Projected fill rate</div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/60">
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>Working Capital</span>
            </div>
            <div className="text-xl font-mono font-black text-blue-700 mt-1">
              ${currentScenario.workingCapital}B
            </div>
            <div className="text-[10px] text-blue-600 mt-0.5">Inventory value</div>
          </div>
        </div>

        {/* Policy Description & Risk Classification */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <span className="text-slate-600 text-[11px] font-medium leading-relaxed">
            {currentScenario.description}
          </span>
          <span
            className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-bold border ${getRiskBadgeColor(
              currentScenario.riskLevel
            )}`}
          >
            {currentScenario.riskLevel}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
          >
            Apply Simulation Buffer
          </button>
        </div>
      </div>
    </div>
  );
};
