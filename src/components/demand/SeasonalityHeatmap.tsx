import React, { useState } from 'react';
import {
  HEATMAP_YEARS,
  HEATMAP_MONTHS,
  SEASONALITY_HEATMAP_DATA,
} from '../../data/demandSignalsMock';

export const SeasonalityHeatmap: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{
    year: number;
    month: string;
    intensity: number;
    monthIndex: number;
  } | null>(null);

  // Intensity color mapper matching reference image professional blue gradient
  const getCellColor = (intensity: number) => {
    switch (intensity) {
      case 5:
        return 'bg-[#1e40af] hover:bg-[#1d4ed8]'; // Deep cobalt peak
      case 4:
        return 'bg-[#2563eb] hover:bg-[#3b82f6]'; // Rich blue
      case 3:
        return 'bg-[#60a5fa] hover:bg-[#93c5fd]'; // Medium sky blue
      case 2:
        return 'bg-[#93c5fd] hover:bg-[#bfdbfe]'; // Soft blue
      case 1:
      default:
        return 'bg-[#dbeafe] hover:bg-[#eff6ff]'; // Lightest blue baseline
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Card Header */}
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          10-Year Demand Seasonality
        </h3>
        <span className="text-[11px] font-medium text-slate-400">Monthly Intensity Index</span>
      </div>

      {/* Heatmap Grid + Right Legend Container */}
      <div className="flex items-center gap-4 py-3 relative">
        {/* Heatmap Matrix */}
        <div className="flex-1 overflow-x-auto select-none">
          <div className="min-w-[320px]">
            {/* Heatmap Row by Year */}
            <div className="space-y-1">
              {HEATMAP_YEARS.map((year) => {
                const rowData = SEASONALITY_HEATMAP_DATA[year] || [];
                return (
                  <div key={year} className="flex items-center gap-1.5">
                    {/* Year Label */}
                    <span className="w-8 text-[11px] font-mono text-slate-500 text-right pr-1 flex-shrink-0">
                      {year}
                    </span>

                    {/* Month Cells */}
                    <div className="grid grid-cols-12 gap-1 flex-1">
                      {rowData.map((intensity, monthIdx) => {
                        const monthName = HEATMAP_MONTHS[monthIdx];
                        const isHovered =
                          hoveredCell?.year === year &&
                          hoveredCell?.monthIndex === monthIdx;

                        return (
                          <div
                            key={monthIdx}
                            onMouseEnter={() =>
                              setHoveredCell({
                                year,
                                month: monthName,
                                intensity,
                                monthIndex: monthIdx,
                              })
                            }
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`h-4.5 sm:h-5 rounded-xs transition-all cursor-pointer ${getCellColor(
                              intensity
                            )} ${isHovered ? 'ring-2 ring-blue-400 scale-105 z-10' : ''}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Month Labels */}
            <div className="flex items-center gap-1.5 pt-2">
              <span className="w-8" />
              <div className="grid grid-cols-12 gap-1 flex-1 text-center">
                {HEATMAP_MONTHS.map((m) => (
                  <span key={m} className="text-[10px] font-medium text-slate-400 truncate">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Vertical Legend */}
        <div className="flex flex-col items-center justify-between h-44 w-14 flex-shrink-0 py-1 select-none">
          <span className="text-[10px] font-semibold text-slate-500 text-center leading-tight">
            High<br />Demand
          </span>

          {/* Vertical Gradient Bar */}
          <div className="w-2.5 flex-1 my-1.5 rounded-full bg-gradient-to-b from-[#1e40af] via-[#3b82f6] to-[#dbeafe] shadow-inner" />

          <span className="text-[10px] font-semibold text-slate-500 text-center leading-tight">
            Low<br />Demand
          </span>
        </div>

        {/* Hover Tooltip */}
        {hoveredCell && (
          <div className="absolute top-1 left-28 z-20 pointer-events-none bg-slate-900/90 text-white px-2.5 py-1.5 rounded-md shadow-lg border border-slate-700 text-xs backdrop-blur-xs flex items-center gap-2">
            <span className="font-bold text-sky-400">
              {hoveredCell.month} {hoveredCell.year}
            </span>
            <span className="text-slate-400">|</span>
            <span className="font-medium text-slate-200">
              {hoveredCell.intensity >= 4
                ? 'Peak Q3 Demand Window'
                : hoveredCell.intensity >= 3
                ? 'Moderate Demand'
                : 'Baseline Demand'}
            </span>
          </div>
        )}
      </div>

      {/* Seasonal Insight Footnote */}
      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Persistent Seasonality: <strong>July &ndash; September Peak</strong></span>
        <span className="text-blue-600 font-semibold">+24% above baseline</span>
      </div>
    </div>
  );
};
