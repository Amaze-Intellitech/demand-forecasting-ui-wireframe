import React from 'react';
import { PlantServiceLevel } from '../../../types/domain/executiveCommandCenter';

interface PlantServiceLevelsProps {
  plants: PlantServiceLevel[];
  selectedPlant?: string;
  onSelectPlant?: (plantName: string) => void;
}

export const PlantServiceLevels: React.FC<PlantServiceLevelsProps> = ({
  plants,
  selectedPlant,
  onSelectPlant,
}) => {
  const getBarColor = (status: PlantServiceLevel['status']) => {
    switch (status) {
      case 'critical':
        return 'bg-rose-500';
      case 'attention':
        return 'bg-amber-500';
      case 'healthy':
      default:
        return 'bg-emerald-500';
    }
  };

  const getStatusBadge = (status: PlantServiceLevel['status']) => {
    switch (status) {
      case 'critical':
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'attention':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'healthy':
      default:
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Service Level by Plant
        </h3>
        <span className="text-[11px] font-medium text-slate-400">
          Target: 95.0%
        </span>
      </div>

      {/* Horizontal Bars List */}
      <div className="flex-1 flex flex-col justify-center space-y-3.5 py-1">
        {plants.map((item) => {
          const isSelected = selectedPlant === item.plantName;
          const barBg = getBarColor(item.status);
          const badgeClass = getStatusBadge(item.status);

          return (
            <div
              key={item.plantId}
              onClick={() => onSelectPlant?.(item.plantName)}
              className={`group cursor-pointer rounded-lg p-1.5 transition-all ${
                isSelected ? 'bg-sky-50/80 ring-1 ring-sky-300' : 'hover:bg-slate-50'
              }`}
            >
              {/* Row Top: Plant Name & Value */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 group-hover:text-[#0062d2] transition-colors">
                    {item.plantName}
                  </span>
                  {item.status === 'critical' && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold border ${badgeClass}`}>
                      Below Target
                    </span>
                  )}
                </div>
                <span className="font-bold text-slate-900 font-mono text-xs">
                  {item.serviceLevel.toFixed(1)}%
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                {/* Target marker notch at 95% */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-400/80 z-10"
                  style={{ left: '95%' }}
                  title="Target SLA: 95%"
                />
                <div
                  className={`h-full rounded-full transition-all duration-300 ${barBg}`}
                  style={{ width: `${Math.min(100, item.serviceLevel)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
