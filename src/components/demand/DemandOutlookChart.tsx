import React, { useState } from 'react';
import { DemandPoint } from '../../data/demandIntelligenceMock';

interface DemandOutlookChartProps {
  data: DemandPoint[];
  period: 'monthly' | 'quarterly';
  onPeriodChange: (period: 'monthly' | 'quarterly') => void;
}

export const DemandOutlookChart: React.FC<DemandOutlookChartProps> = ({
  data,
  period,
  onPeriodChange,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Chart dimensions
  const width = 850;
  const height = 360;
  const paddingLeft = 55;
  const paddingRight = 30;
  const paddingTop = 45;
  const paddingBottom = 65;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const yMax = 50; // 50K max
  const yTicks = [0, 10, 20, 30, 40, 50];

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - (val / yMax) * chartHeight;
  };

  // Build SVG path for Actual line (Jan to Jul)
  const actualPoints: { x: number; y: number; val: number; item: DemandPoint; idx: number }[] = [];
  data.forEach((d, idx) => {
    if (d.actual !== null) {
      actualPoints.push({
        x: getX(idx),
        y: getY(d.actual),
        val: d.actual,
        item: d,
        idx,
      });
    }
  });

  const actualPathD = actualPoints.reduce((acc, pt, i) => {
    return `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }, '');

  // Build SVG path for Forecast line (Jul to Dec)
  const forecastPoints: { x: number; y: number; val: number; item: DemandPoint; idx: number }[] = [];
  data.forEach((d, idx) => {
    if (d.forecast !== null) {
      forecastPoints.push({
        x: getX(idx),
        y: getY(d.forecast),
        val: d.forecast,
        item: d,
        idx,
      });
    }
  });

  const forecastPathD = forecastPoints.reduce((acc, pt, i) => {
    return `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }, '');

  // Build Confidence Area path (Jul to Dec: upper curve then lower curve reversed)
  const ciPoints: { x: number; yUpper: number; yLower: number }[] = [];
  data.forEach((d, idx) => {
    if (d.ciUpper !== null && d.ciLower !== null) {
      ciPoints.push({
        x: getX(idx),
        yUpper: getY(d.ciUpper),
        yLower: getY(d.ciLower),
      });
    }
  });

  let ciAreaD = '';
  if (ciPoints.length > 0) {
    const forward = ciPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.yUpper}`).join(' ');
    const backward = [...ciPoints].reverse().map((pt) => `L ${pt.x} ${pt.yLower}`).join(' ');
    ciAreaD = `${forward} ${backward} Z`;
  }

  // Today marker index (Jul)
  const todayIdx = data.findIndex((d) => d.isToday);
  const todayX = todayIdx !== -1 ? getX(todayIdx) : null;

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
      
      {/* Chart Top Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          12-Month Demand Outlook
        </h3>

        {/* Period Selector Dropdown */}
        <div className="relative">
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value as 'monthly' | 'quarterly')}
            className="h-8 pl-3 pr-8 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all cursor-pointer shadow-xs appearance-none"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <svg
            className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[380px] overflow-visible"
        >
          {/* Subtle horizontal grid lines & Y-axis labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                  strokeDasharray={tick === 0 ? undefined : '2 3'}
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[11px] font-medium fill-slate-400 select-none"
                >
                  {tick === 0 ? '0' : `${tick}K`}
                </text>
              </g>
            );
          })}

          {/* Rotated Y-Axis Title */}
          <text
            x={-(paddingTop + chartHeight / 2)}
            y="18"
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-[11px] font-medium fill-slate-500 select-none tracking-wide"
          >
            Demand (Units)
          </text>

          {/* Translucent Confidence Range Area */}
          {ciAreaD && (
            <path
              d={ciAreaD}
              fill="#e0f2fe"
              fillOpacity="0.6"
              stroke="#bae6fd"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
          )}

          {/* Today Vertical Dashed Marker Line */}
          {todayX !== null && (
            <g>
              <line
                x1={todayX}
                y1={paddingTop - 12}
                x2={todayX}
                y2={paddingTop + chartHeight}
                stroke="#0062d2"
                strokeWidth="1.6"
                strokeDasharray="4 4"
              />
              <rect
                x={todayX - 22}
                y={paddingTop - 26}
                width="44"
                height="16"
                rx="4"
                fill="#ffffff"
                stroke="#0062d2"
                strokeWidth="1"
              />
              <text
                x={todayX}
                y={paddingTop - 14}
                textAnchor="middle"
                className="text-[10px] font-bold fill-[#0062d2] select-none"
              >
                Today
              </text>
            </g>
          )}

          {/* Forecast Dashed Curve */}
          {forecastPathD && (
            <path
              d={forecastPathD}
              fill="none"
              stroke="#0062d2"
              strokeWidth="2.4"
              strokeDasharray="5 4"
            />
          )}

          {/* Actual Solid Curve */}
          {actualPathD && (
            <path
              d={actualPathD}
              fill="none"
              stroke="#0062d2"
              strokeWidth="2.4"
            />
          )}

          {/* Data Points on Actual Demand */}
          {actualPoints.map((pt) => (
            <g key={pt.idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === pt.idx ? 5.5 : 4}
                fill="#0062d2"
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-150"
              />
            </g>
          ))}

          {/* Data Points on Forecast Demand */}
          {forecastPoints.map((pt) => (
            <g key={`fc-${pt.idx}`}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === pt.idx ? 5 : 3.5}
                fill="#ffffff"
                stroke="#0062d2"
                strokeWidth="1.8"
                className="transition-all duration-150"
              />
            </g>
          ))}

          {/* X-Axis Month & Year Labels */}
          {data.map((d, idx) => {
            const x = getX(idx);
            const isHovered = hoveredIdx === idx;
            return (
              <g key={idx} className="cursor-pointer">
                <text
                  x={x}
                  y={paddingTop + chartHeight + 20}
                  textAnchor="middle"
                  className={`text-[11px] select-none transition-colors ${
                    isHovered ? 'font-bold fill-sky-700' : 'font-medium fill-slate-600'
                  }`}
                >
                  {d.monthShort}
                </text>
                <text
                  x={x}
                  y={paddingTop + chartHeight + 34}
                  textAnchor="middle"
                  className="text-[10px] font-normal fill-slate-400 select-none"
                >
                  {d.year}
                </text>

                {/* Invisible Hover Hitbox */}
                <rect
                  x={x - chartWidth / (data.length * 2)}
                  y={paddingTop}
                  width={chartWidth / data.length}
                  height={chartHeight + 40}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}

          {/* Interactive Hover Guide Line */}
          {hoveredIdx !== null && (
            <line
              x1={getX(hoveredIdx)}
              y1={paddingTop}
              x2={getX(hoveredIdx)}
              y2={paddingTop + chartHeight}
              stroke="#94a3b8"
              strokeWidth="1"
              strokeDasharray="2 2"
              pointerEvents="none"
            />
          )}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredIdx !== null && data[hoveredIdx] && (
          <div
            className="absolute z-20 pointer-events-none bg-slate-900 text-white rounded-xl py-2 px-3 shadow-xl text-xs space-y-1 transform -translate-x-1/2 border border-slate-700 backdrop-blur-md"
            style={{
              left: `${(getX(hoveredIdx) / width) * 100}%`,
              top: '20px',
            }}
          >
            <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1 flex items-center justify-between gap-3">
              <span>{data[hoveredIdx].period}</span>
              {data[hoveredIdx].isToday && (
                <span className="text-[10px] px-1.5 py-0.2 bg-sky-500/20 text-sky-400 rounded">
                  Current Month
                </span>
              )}
            </div>
            {data[hoveredIdx].actual !== null && (
              <div className="flex items-center justify-between gap-4 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                  Actual Demand:
                </span>
                <span className="font-bold text-white">
                  {data[hoveredIdx].actual}K units
                </span>
              </div>
            )}
            {data[hoveredIdx].forecast !== null && (
              <div className="flex items-center justify-between gap-4 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full border border-sky-400 inline-block" />
                  Forecast:
                </span>
                <span className="font-bold text-sky-400">
                  {data[hoveredIdx].forecast}K units
                </span>
              </div>
            )}
            {data[hoveredIdx].ciUpper !== null && data[hoveredIdx].ciLower !== null && (
              <div className="flex items-center justify-between gap-4 text-slate-400 text-[10px] pt-0.5">
                <span>95% CI Range:</span>
                <span className="font-mono text-slate-300">
                  {data[hoveredIdx].ciLower}K – {data[hoveredIdx].ciUpper}K
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chart Legend */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium select-none">
        <div className="flex items-center gap-2">
          <span className="w-4 h-[2.5px] bg-[#0062d2] rounded-full inline-block" />
          <span>Actual Demand</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-[2px] border-b-2 border-dashed border-[#0062d2] inline-block" />
          <span>Forecast</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#e0f2fe] border border-[#bae6fd] rounded-xs inline-block" />
          <span>Confidence Range</span>
        </div>
      </div>

    </div>
  );
};
