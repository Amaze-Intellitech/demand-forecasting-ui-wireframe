import React, { useState } from 'react';
import { ProductCategoryDemand } from '../../../types/domain/executiveCommandCenter';

interface ProductMixProps {
  categories: ProductCategoryDemand[];
  selectedCategory?: string;
  onSelectCategory?: (categoryName: string) => void;
}

export const ProductMix: React.FC<ProductMixProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // SVG Donut geometry
  const size = 170;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute strokeDasharray and strokeDashoffset for each slice
  let accumulatedPercent = 0;
  const slices = categories.map((cat) => {
    const strokeDasharray = `${(cat.sharePercent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += cat.sharePercent;
    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Demand by Product Category
        </h3>
        <span className="text-[11px] font-medium text-slate-400">
          Portfolio Mix
        </span>
      </div>

      {/* Main Content: Donut (Left) + Legend (Right) */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        {/* Donut Visual with Center Metric */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {/* Slices */}
            {slices.map((slice) => {
              const isHovered = hoveredCategory === slice.categoryName;
              const isSelected = selectedCategory === slice.categoryName;

              return (
                <circle
                  key={slice.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered || isSelected ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="butt"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredCategory(slice.categoryName)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => onSelectCategory?.(slice.categoryName)}
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none">
              1.28M
            </span>
            <span className="text-[11px] font-medium text-slate-500 mt-0.5">
              units
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 w-full space-y-1.5 pl-1 sm:pl-2">
          {categories.map((cat) => {
            const isHovered = hoveredCategory === cat.categoryName;
            const isSelected = selectedCategory === cat.categoryName;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory?.(cat.categoryName)}
                onMouseEnter={() => setHoveredCategory(cat.categoryName)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-info-bg ring-1 ring-primary'
                    : isHovered
                    ? 'bg-slate-50'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs font-semibold text-slate-700 truncate">
                    {cat.categoryName}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 font-mono flex-shrink-0">
                  {cat.sharePercent.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
