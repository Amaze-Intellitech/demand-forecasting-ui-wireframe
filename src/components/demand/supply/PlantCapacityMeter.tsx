import React from 'react';
import { PlantCapacityItem } from '../../../types/domain/supplyCapacityOptimization';
import { ChevronRight, AlertCircle } from 'lucide-react';

interface PlantCapacityMeterProps {
  plants: PlantCapacityItem[];
  onSelectPlant: (plant: PlantCapacityItem) => void;
}

export const PlantCapacityMeter: React.FC<PlantCapacityMeterProps> = ({
  plants,
  onSelectPlant,
}) => {
  const getBarColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-rose-500'; // Constrained
    if (utilization >= 75) return 'bg-blue-600'; // Optimal
    return 'bg-emerald-500'; // Underutilized
  };

  const getTextColor = (utilization: number) => {
    if (utilization >= 90) return 'text-rose-600 font-bold';
    if (utilization >= 75) return 'text-slate-800 font-semibold';
    return 'text-emerald-700 font-semibold';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Capacity Utilization by Plant
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Click any site to drill into production line schedules
          </p>
        </div>
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
          Max Threshold 90%
        </span>
      </div>

      {/* Meter List */}
      <div className="space-y-3.5 my-auto">
        {plants.map((plant) => {
          const isConstrained = plant.utilizationPercent >= 90;

          return (
            <div
              key={plant.id}
              onClick={() => onSelectPlant(plant)}
              className="group cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {plant.name}
                  </span>
                  {isConstrained && (
                    <span
                      title="Bottleneck detected on Line 2"
                      className="inline-flex items-center text-rose-600"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({plant.region})
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs ${getTextColor(plant.utilizationPercent)}`}>
                    {plant.utilizationPercent}%
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden flex items-center p-0.5 relative">
                {/* 90% safe threshold marker */}
                <div
                  className="absolute top-0 bottom-0 w-[1px] bg-slate-300 z-10"
                  style={{ left: '90%' }}
                  title="90% threshold"
                />
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getBarColor(
                    plant.utilizationPercent
                  )}`}
                  style={{ width: `${Math.min(100, plant.utilizationPercent)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Legend / Hint */}
      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
            <span>&ge;90% Constrained</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
            <span>75-89% Optimal</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>&lt;75% Available</span>
          </span>
        </div>
      </div>
    </div>
  );
};
