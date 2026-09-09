import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { InventoryPlantShare } from '../../../types/domain/inventoryIntelligence';

interface InventoryByPlantProps {
  plants: InventoryPlantShare[];
  selectedPlant?: string;
  onSelectPlant?: (plant: string) => void;
  metric: 'Units' | 'Value' | 'Days of Supply';
  onMetricChange: (metric: 'Units' | 'Value' | 'Days of Supply') => void;
}

export const InventoryByPlant: React.FC<InventoryByPlantProps> = ({
  plants,
  selectedPlant,
  onSelectPlant,
  metric,
  onMetricChange,
}) => {
  const [hoveredPlant, setHoveredPlant] = useState<string | null>(null);

  const getMetricDisplay = (p: InventoryPlantShare) => {
    if (metric === 'Value') return p.value;
    if (metric === 'Days of Supply') return `${p.daysOfSupply}d`;
    return `${p.units}K`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header & Metric Selector */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Inventory by Plant
          </h3>
          <p className="text-xs text-slate-500">
            Regional manufacturing & hub inventory
          </p>
        </div>

        <div className="relative">
          <select
            value={metric}
            onChange={(e) => onMetricChange(e.target.value as 'Units' | 'Value' | 'Days of Supply')}
            aria-label="Select metric"
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
          >
            <option value="Units">Units</option>
            <option value="Value">Value</option>
            <option value="Days of Supply">Days of Supply</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Plant Bar List */}
      <div className="space-y-3.5 my-auto pt-1">
        {plants.map((p) => {
          const isHovered = hoveredPlant === p.plant;
          const isSelected = selectedPlant?.toLowerCase().includes(p.plant.split(' ')[0].toLowerCase());

          return (
            <div
              key={p.plant}
              onMouseEnter={() => setHoveredPlant(p.plant)}
              onMouseLeave={() => setHoveredPlant(null)}
              onClick={() => onSelectPlant?.(p.plant)}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                isHovered || isSelected ? 'bg-slate-50 shadow-2xs' : 'hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-800">{p.plant}</span>
                <span className="font-mono font-bold text-slate-900">
                  {getMetricDisplay(p)}
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(12, p.percentage)}%`,
                    backgroundColor: p.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
