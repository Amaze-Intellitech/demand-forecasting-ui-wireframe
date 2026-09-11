import React, { useState } from 'react';
import { COPILOT_FORECAST_DATA, CopilotForecastPoint } from '../../../data/demandCopilotMock';

export const EmbeddedDemandForecastChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<CopilotForecastPoint | null>(null);

  // SVG coordinate dimensions
  const width = 640;
  const height = 230;
  const padding = { top: 28, right: 25, bottom: 42, left: 55 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Max value: 50K
  const maxY = 50;
  const getY = (val: number) => padding.top + plotHeight - (val / maxY) * plotHeight;

  // Y-axis ticks: 0, 10K, 20K, 30K, 40K, 50K
  const yTicks = [0, 10, 20, 30, 40, 50];

  const totalPoints = COPILOT_FORECAST_DATA.length;
  const getX = (idx: number) => padding.left + (idx / (totalPoints - 1)) * plotWidth;

  // Today marker is at index 3 (Jul 2025)
  const todayIdx = 3;
  const todayX = getX(todayIdx);

  // Split into Actual points (indices 0..3) and Forecast points (indices 3..11)
  const actualPoints = COPILOT_FORECAST_DATA.slice(0, todayIdx + 1);
  const forecastPoints = COPILOT_FORECAST_DATA.slice(todayIdx);

  // 1. Confidence Range Polygon (from todayIdx to end)
  const upperPath = forecastPoints
    .map((pt, i) => {
      const idx = todayIdx + i;
      const x = getX(idx);
      const y = getY(pt.confUpper ?? pt.actual ?? 22.1);
      return `${x},${y}`;
    })
    .join(' L ');

  const lowerPath = [...forecastPoints]
    .reverse()
    .map((pt, i) => {
      const idx = totalPoints - 1 - i;
      const x = getX(idx);
      const y = getY(pt.confLower ?? pt.actual ?? 22.1);
      return `${x},${y}`;
    })
    .join(' L ');

  const confidencePolygon = `M ${upperPath} L ${lowerPath} Z`;

  // 2. Actuals Line (indices 0..3)
  const actualsLinePath = actualPoints
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.actual ?? 0)}`)
    .join(' ');

  // 3. Forecast Line (indices 3..11)
  const forecastLinePath = forecastPoints
    .map((pt, i) => {
      const idx = todayIdx + i;
      const val = pt.forecast ?? pt.actual ?? 0;
      return `${i === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(val)}`;
    })
    .join(' ');

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] select-none relative my-3">
      {/* Chart Title & Top Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
          Monthly Demand Forecast
        </h4>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10.5px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-[2.5px] bg-[#0062d2] rounded-full" />
            <span className="font-medium">Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-[2px] border-b-2 border-dashed border-[#0062d2]" />
            <span className="font-medium">Forecast</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2.5 bg-info-bg rounded-xs border border-border" />
            <span className="font-medium">Confidence Range</span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full overflow-hidden pt-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-pointer"
        >
          {/* Horizontal Grid lines */}
          {yTicks.map((tick) => {
            const y = getY(tick);
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
            className="fill-slate-500 font-semibold text-[9.5px] tracking-wide"
          >
            Demand (Units)
          </text>

          {/* Confidence Area Fill */}
          <path
            d={confidencePolygon}
            fill="#e0f2fe"
            fillOpacity="0.65"
            className="transition-opacity"
          />

          {/* Today Vertical Dashed Line */}
          <line
            x1={todayX}
            y1={padding.top}
            x2={todayX}
            y2={padding.top + plotHeight}
            stroke="#0062d2"
            strokeDasharray="3 3"
            strokeWidth="1.5"
          />
          {/* Today Label */}
          <text
            x={todayX}
            y={padding.top - 6}
            textAnchor="middle"
            className="fill-[#0062d2] font-mono text-[10px] font-bold"
          >
            Today
          </text>

          {/* Forecast Dashed Line */}
          <path
            d={forecastLinePath}
            fill="none"
            stroke="#0062d2"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Actuals Solid Line */}
          <path
            d={actualsLinePath}
            fill="none"
            stroke="#0062d2"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {COPILOT_FORECAST_DATA.map((pt, idx) => {
            const x = getX(idx);
            const val = pt.actual ?? pt.forecast ?? 0;
            const y = getY(val);
            const isActual = idx <= todayIdx;
            const isHovered = hoveredPoint?.label === pt.label;

            return (
              <g
                key={pt.label}
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer"
              >
                {/* Visible dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 5 : isActual ? 3.5 : 3}
                  fill={isActual ? '#0062d2' : '#ffffff'}
                  stroke="#0062d2"
                  strokeWidth={isActual ? 2 : 1.8}
                  className="transition-all"
                />

                {/* X-axis Label */}
                <text
                  x={x}
                  y={padding.top + plotHeight + 14}
                  textAnchor="middle"
                  className={`font-mono text-[8.5px] ${
                    pt.isToday ? 'fill-[#0062d2] font-bold' : 'fill-slate-500'
                  }`}
                >
                  {pt.label.split(' ')[0]}
                </text>
                <text
                  x={x}
                  y={padding.top + plotHeight + 24}
                  textAnchor="middle"
                  className={`font-mono text-[8px] ${
                    pt.isToday ? 'fill-[#0062d2] font-bold' : 'fill-slate-400'
                  }`}
                >
                  {pt.label.split(' ')[1]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip on Hover */}
        {hoveredPoint && (
          <div className="absolute top-2 right-8 pointer-events-none bg-slate-900/95 text-white p-2.5 rounded-lg shadow-xl border border-slate-700 text-xs backdrop-blur-xs flex flex-col gap-0.5 z-30 min-w-[150px]">
            <div className="flex items-center justify-between border-b border-slate-700 pb-1 font-bold text-blue-400 text-[11px]">
              <span>{hoveredPoint.label}</span>
              <span>{hoveredPoint.isToday ? 'Today' : hoveredPoint.actual ? 'Actual' : 'Forecast'}</span>
            </div>
            <div className="text-[11px] font-mono pt-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Demand:</span>
                <strong className="text-white">
                  {(hoveredPoint.actual ?? hoveredPoint.forecast ?? 0).toFixed(1)}K units
                </strong>
              </div>
              {hoveredPoint.confUpper && (
                <div className="flex justify-between text-[10px] text-slate-300">
                  <span className="text-slate-400">Range:</span>
                  <span>
                    {hoveredPoint.confLower}K – {hoveredPoint.confUpper}K
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
