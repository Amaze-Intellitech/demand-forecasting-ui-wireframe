import React from 'react';
import { X, Factory, AlertCircle, Sliders } from 'lucide-react';
import { PlantCapacityItem } from '../../../types/domain/supplyCapacityOptimization';

interface PlantCapacityDrawerProps {
  plant: PlantCapacityItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSimulatePlant: (plantName: string) => void;
}

export const PlantCapacityDrawer: React.FC<PlantCapacityDrawerProps> = ({
  plant,
  isOpen,
  onClose,
  onSimulatePlant,
}) => {
  if (!isOpen || !plant) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{plant.name}</h2>
              <p className="text-xs text-slate-500">
                {plant.region} &bull; Plant Code: {plant.code}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Utilization
              </span>
              <div
                className={`text-lg font-bold mt-0.5 ${
                  plant.utilizationPercent >= 90
                    ? 'text-rose-600'
                    : plant.utilizationPercent >= 75
                    ? 'text-blue-600'
                    : 'text-emerald-600'
                }`}
              >
                {plant.utilizationPercent}%
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Total Capacity
              </span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">
                {plant.totalCapacityK}K
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Allocated Plan
              </span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">
                {plant.allocatedSupplyK}K
              </div>
            </div>
          </div>

          {/* Active Bottlenecks Alert */}
          {plant.bottlenecks.length > 0 && (
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 mb-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Identified Plant Bottlenecks</span>
              </div>
              <ul className="space-y-1 text-xs text-rose-700">
                {plant.bottlenecks.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Production Lines Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Production Lines ({plant.productionLines.length})
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">Shift Run Rate</span>
            </div>

            <div className="space-y-2.5">
              {plant.productionLines.map((line) => {
                const isLineConstrained = line.utilizationPercent >= 90;
                return (
                  <div
                    key={line.id}
                    className="p-3 bg-white border border-slate-200/80 rounded-lg shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-900">
                          {line.name}
                        </span>
                        {isLineConstrained ? (
                          <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded">
                            Constrained
                          </span>
                        ) : line.status === 'Maintenance' ? (
                          <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded">
                            Maintenance
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded">
                            Healthy
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {line.utilizationPercent}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full ${
                          isLineConstrained
                            ? 'bg-rose-500'
                            : line.status === 'Maintenance'
                            ? 'bg-amber-500'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${line.utilizationPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Rate: {line.outputRateUnitsPerHour} units/hr</span>
                      <span className="truncate max-w-[200px]">
                        SKUs: {line.assignedProducts.join(', ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Rebalancing Recommendation */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3.5">
            <h4 className="text-xs font-bold text-blue-900 mb-1">
              Autonomous Scheduling Recommendation
            </h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Adding a weekend shift to Line 1 & Line 3 can increase total capacity by +10%,
              eliminating the 28K unit projected supply deficit for Q3.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onSimulatePlant(plant.name);
              onClose();
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate +10% Capacity on this Plant</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
