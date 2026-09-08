import React, { useState } from 'react';
import {
  QUARTERLY_FORECAST_BARS,
  QuarterBarItem,
} from '../../data/demandForecastMock';

export const QuarterlyForecastChart: React.FC = () => {
  const [hoveredQuarter, setHoveredQuarter] = useState<QuarterBarItem | null>(null);

  // SVG dimensions
  const width = 460;
  const height = 240;
  const padding = { top: 32, right: 20, bottom: 42, left: 50 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Max scale to fit 102.3K
  const maxVal = 110;
  const barWidth = 26;
  const totalBars = QUARTERLY_FORECAST_BARS.length;
  const gap = (plotWidth - totalBars * barWidth) / (totalBars + 1);

  // Y-axis grid ticks: 0, 10K, 20K, 30K, 40K, 50K matching image
  const yTicks = [0, 10, 20, 30, 40, 50];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Forecast by Quarter
        </h3>
        <span className="text-[11px] font-medium text-slate-400">Quarterly Aggregation</span>
      </div>

      {/* SVG Bar Chart */}
      <div className="relative w-full overflow-hidden pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-pointer"
        >
          {/* Horizontal Grid lines */}
          {yTicks.map((tick) => {
            const y = padding.top + plotHeight - (tick / 50) * plotHeight;
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-slate-500 font-mono text-[9.5px]"
                >
                  {tick === 0 ? '0' : `${tick}K`}
                </text>
              </g>
            );
          })}

          {/* Left Y-axis Label */}
          <text
            x={-(padding.top + plotHeight / 2)}
            y={14}
            transform="rotate(-90)"
            textAnchor="middle"
            className="fill-slate-500 font-semibold text-[10px] tracking-wide"
          >
            Demand (Units)
          </text>

          {/* X-axis baseline */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={width - padding.right}
            y2={padding.top + plotHeight}
            stroke="#e2e8f0"
            strokeWidth="1"
          />

          {/* Bars */}
          {QUARTERLY_FORECAST_BARS.map((item, idx) => {
            const x = padding.left + gap + idx * (barWidth + gap);
            // Scale bar height: value from 62.1 to 102.3 mapped visually
            const normalizedHeight = (item.volumeValue / maxVal) * plotHeight;
            const y = padding.top + plotHeight - normalizedHeight;
            const isHovered = hoveredQuarter?.quarter === item.quarter;
            const isForecast = item.type === 'forecast';

            return (
              <g
                key={item.quarter}
                onMouseEnter={() => setHoveredQuarter(item)}
                onMouseLeave={() => setHoveredQuarter(null)}
                className="transition-transform duration-100"
              >
                {/* Value Label on Top of Bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  className={`font-mono text-[10px] font-bold ${
                    isForecast ? 'fill-slate-900' : 'fill-slate-700'
                  }`}
                >
                  {item.volumeLabel}
                </text>

                {/* Bar Rect */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={normalizedHeight}
                  rx="3"
                  className={`transition-all duration-200 ${
                    isForecast
                      ? 'fill-[#0062d2] hover:fill-[#0052b3]'
                      : 'fill-[#7dd3fc] hover:fill-[#38bdf8]'
                  } ${isHovered ? 'ring-2 ring-blue-300' : ''}`}
                />

                {/* Quarter Label */}
                <text
                  x={x + barWidth / 2}
                  y={padding.top + plotHeight + 14}
                  textAnchor="middle"
                  className="fill-slate-600 font-mono text-[9.5px] font-medium"
                >
                  {item.quarter.split(' ')[0]}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={padding.top + plotHeight + 25}
                  textAnchor="middle"
                  className="fill-slate-400 font-mono text-[8.5px]"
                >
                  {item.quarter.split(' ')[1]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredQuarter && (
          <div className="absolute top-2 right-4 pointer-events-none bg-slate-900/90 text-white px-2.5 py-1.5 rounded-md shadow-lg border border-slate-700 text-xs backdrop-blur-xs flex items-center gap-2 z-20">
            <span className="font-bold text-sky-400">{hoveredQuarter.quarter}</span>
            <span className="text-slate-400">|</span>
            <span className="font-mono text-white">{hoveredQuarter.volumeLabel} units</span>
            <span className="text-[10px] uppercase font-bold text-emerald-400">
              {hoveredQuarter.type}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Centered Legend */}
      <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#7dd3fc] rounded-xs" />
          <span className="text-slate-600 font-medium">Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#0062d2] rounded-xs" />
          <span className="text-slate-600 font-medium">Forecast</span>
        </div>
      </div>
    </div>
  );
};
