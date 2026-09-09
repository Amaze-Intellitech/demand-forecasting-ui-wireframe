import React, { useState } from 'react';
import { InventoryCategoryShare } from '../../../types/domain/inventoryIntelligence';

interface InventoryByCategoryProps {
  categories: InventoryCategoryShare[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const InventoryByCategory: React.FC<InventoryByCategoryProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Donut geometry
  const size = 190;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke offsets
  let accumulatedPercent = 0;
  const slices = categories.map((cat, index) => {
    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += cat.percentage;
    return {
      ...cat,
      index,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Inventory by Product Category
        </h3>
        <p className="text-xs text-slate-500">
          Distribution of stock across primary polymer product families
        </p>
      </div>

      {/* Donut and Legend Layout */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-auto pt-3">
        {/* Donut Chart */}
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            {slices.map((slice) => {
              const isHovered = hoveredIndex === slice.index;
              const isSelected = selectedCategory === slice.name;

              return (
                <circle
                  key={slice.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered || isSelected ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(slice.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onSelectCategory?.(slice.name)}
                />
              );
            })}
          </svg>

          {/* Donut Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight leading-none">
              862K
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1">units</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full sm:w-44 space-y-2 text-xs">
          {categories.map((cat, i) => {
            const isHovered = hoveredIndex === i;
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory?.(cat.name)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex items-center justify-between p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isHovered || isSelected ? 'bg-slate-50 font-bold' : 'hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-slate-700 truncate">{cat.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900 ml-2">
                  {cat.percentage.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
