import React, { useState } from 'react';
import { ForecastCategoryDistribution } from '../../../types/domain/demandForecast';

interface ForecastByCategoryProps {
  categories: ForecastCategoryDistribution[];
  onSelectCategory?: (category: ForecastCategoryDistribution) => void;
}

export const ForecastByCategory: React.FC<ForecastByCategoryProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // SVG Donut geometry
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const slices = categories.map((cat) => {
    const strokeDasharray = `${(cat.percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += cat.percent;
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
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Forecast by Product Category
        </h3>
      </div>

      {/* Donut & Legend Container */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        {/* Donut Visual */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {/* Background Track */}
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
              const isHovered = hoveredCategory === slice.name;

              return (
                <circle
                  key={slice.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="butt"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredCategory(slice.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => onSelectCategory?.(slice)}
                />
              );
            })}
          </svg>

          {/* Center Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none font-mono">
              1.28M
            </span>
            <span className="text-[10px] font-medium text-slate-500 mt-0.5">
              units
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 w-full space-y-1.5 pl-1 sm:pl-2">
          {categories.map((cat) => {
            const isHovered = hoveredCategory === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory?.(cat)}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition-all ${
                  isHovered ? 'bg-slate-50' : ''
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs font-semibold text-slate-800 truncate">
                    {cat.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 text-xs">
                  <span className="font-bold font-mono text-slate-900">
                    {cat.percent.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
