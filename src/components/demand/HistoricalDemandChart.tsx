import React, { useState, useMemo } from 'react';
import {
  HISTORICAL_DEMAND_SERIES,
  KEY_EVENT_ZONES,
  HistoricalDataPoint,
} from '../../data/demandSignalsMock';

export const HistoricalDemandChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<HistoricalDataPoint | null>(null);

  // Chart coordinate space setup
  const width = 880;
  const height = 310;
  const padding = { top: 38, right: 30, bottom: 40, left: 65 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Max value: 50K units, Min value: 0
  const minY = 0;
  const maxY = 50000;
  const totalPoints = HISTORICAL_DEMAND_SERIES.length;

  const getX = (index: number) => padding.left + (index / (totalPoints - 1)) * plotWidth;
  const getY = (val: number) => padding.top + plotHeight - ((val - minY) / (maxY - minY)) * plotHeight;

  // Build SVG Path for Actual Demand (solid vibrant blue)
  const actualPath = useMemo(() => {
    return HISTORICAL_DEMAND_SERIES.reduce((acc, pt, idx) => {
      const x = getX(idx);
      const y = getY(pt.actualDemand);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, []);

  // Build SVG Path for 12-Month Moving Average (dashed teal)
  const movingAvgPath = useMemo(() => {
    return HISTORICAL_DEMAND_SERIES.reduce((acc, pt, idx) => {
      const x = getX(idx);
      const y = getY(pt.movingAverage);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, []);

  // Y-axis grid ticks: 0, 10K, 20K, 30K, 40K, 50K
  const yTicks = [0, 10000, 20000, 30000, 40000, 50000];

  // Year tick markers for X-axis (every 12 months)
  const yearTicks = [
    { year: 2020, index: 0 },
    { year: 2021, index: 12 },
    { year: 2022, index: 24 },
    { year: 2023, index: 36 },
    { year: 2024, index: 48 },
    { year: 2025, index: 60 },
  ];

  // Hover detection handler
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;

    if (svgX < padding.left || svgX > width - padding.right) {
      setHoveredPoint(null);
      return;
    }

    const relX = svgX - padding.left;
    const index = Math.round((relX / plotWidth) * (totalPoints - 1));
    const clampedIndex = Math.max(0, Math.min(totalPoints - 1, index));
    setHoveredPoint(HISTORICAL_DEMAND_SERIES[clampedIndex]);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Card Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Historical Demand Trend
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Actual Demand */}
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#0062d2] rounded-full" />
            <span className="text-slate-600 font-medium">Actual Demand</span>
          </div>

          {/* 12-Month Moving Average */}
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-[#0d9488]" />
            <span className="text-slate-600 font-medium">12-Month Moving Average</span>
          </div>

          {/* Key Events */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 bg-rose-100 border border-rose-300/80 rounded-xs" />
            <span className="text-slate-600 font-medium">Key Events</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden pt-2 select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Defs for subtle gradients */}
          <defs>
            <linearGradient id="eventPinkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fee2e2" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#fee2e2" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Key Event Shaded Columns & Labels */}
          {KEY_EVENT_ZONES.map((event) => {
            const startX = getX(event.startMonthIndex);
            const endX = getX(event.endMonthIndex);
            const eventWidth = Math.max(16, endX - startX);
            const midX = getX(event.indicatorIndex);

            return (
              <g key={event.id}>
                {/* Shaded vertical column */}
                <rect
                  x={startX}
                  y={padding.top}
                  width={eventWidth}
                  height={plotHeight}
                  fill="url(#eventPinkGrad)"
                />

                {/* Vertical indicator center line */}
                <line
                  x1={midX}
                  y1={padding.top}
                  x2={midX}
                  y2={padding.top + plotHeight}
                  stroke="#f87171"
                  strokeWidth="1.2"
                  strokeDasharray="3,3"
                  opacity="0.8"
                />

                {/* Event Label at Top */}
                <text
                  x={midX}
                  y={padding.top - 18}
                  textAnchor="middle"
                  className="fill-slate-800 font-bold text-[11px]"
                >
                  {event.label}
                </text>
                {event.sublabel && (
                  <text
                    x={midX}
                    y={padding.top - 6}
                    textAnchor="middle"
                    className="fill-slate-600 font-medium text-[10px]"
                  >
                    {event.sublabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Horizontal Grid lines & Y-axis labels */}
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
                  strokeWidth="1.2"
                />
                <text
                  x={padding.left - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-slate-500 font-mono text-[10px]"
                >
                  {tick === 0 ? '0' : `${tick / 1000}K`}
                </text>
              </g>
            );
          })}

          {/* Left Y-axis Label: "Demand (Units)" */}
          <text
            x={-(padding.top + plotHeight / 2)}
            y={16}
            transform="rotate(-90)"
            textAnchor="middle"
            className="fill-slate-500 font-semibold text-[11px] tracking-wide"
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

          {/* X-axis Year ticks */}
          {yearTicks.map((yt) => {
            const x = getX(yt.index);
            return (
              <g key={yt.year}>
                <line
                  x1={x}
                  y1={padding.top + plotHeight}
                  x2={x}
                  y2={padding.top + plotHeight + 5}
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                />
                <text
                  x={x}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  className="fill-slate-600 font-mono text-[11px]"
                >
                  {yt.year}
                </text>
              </g>
            );
          })}

          {/* 12-Month Moving Average (dashed teal curve) */}
          <path
            d={movingAvgPath}
            fill="none"
            stroke="#0d9488"
            strokeWidth="2"
            strokeDasharray="5,4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Actual Demand Path (solid vibrant blue curve) */}
          <path
            d={actualPath}
            fill="none"
            stroke="#0062d2"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Hover Point & Guideline */}
          {hoveredPoint && (
            <g className="transition-all duration-75">
              {/* Vertical line indicator */}
              <line
                x1={getX(hoveredPoint.index)}
                y1={padding.top}
                x2={getX(hoveredPoint.index)}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* Actual Demand Circle */}
              <circle
                cx={getX(hoveredPoint.index)}
                cy={getY(hoveredPoint.actualDemand)}
                r="4.5"
                fill="#0062d2"
                stroke="#ffffff"
                strokeWidth="2"
                className="drop-shadow-sm"
              />

              {/* Moving Average Circle */}
              <circle
                cx={getX(hoveredPoint.index)}
                cy={getY(hoveredPoint.movingAverage)}
                r="4"
                fill="#0d9488"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-30 pointer-events-none bg-slate-900/95 text-white p-2.5 rounded-lg shadow-xl border border-slate-700 text-xs backdrop-blur-xs transition-all duration-75 min-w-[170px]"
            style={{
              left: `${Math.min(
                Math.max(20, (getX(hoveredPoint.index) / width) * 100 - 10),
                75
              )}%`,
              top: '12%',
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-1.5">
              <span className="font-bold text-sky-400">{hoveredPoint.dateStr}</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {hoveredPoint.year}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0062d2]" />
                  Actual Demand:
                </span>
                <span className="font-mono font-semibold text-white">
                  {hoveredPoint.actualDemand.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
                  Moving Avg (12M):
                </span>
                <span className="font-mono font-semibold text-teal-300">
                  {hoveredPoint.movingAverage.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
