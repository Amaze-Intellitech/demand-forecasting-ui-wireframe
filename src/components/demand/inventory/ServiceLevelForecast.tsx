import React, { useState } from 'react';
import { ServiceLevelForecastPoint } from '../../../types/domain/inventoryIntelligence';

interface ServiceLevelForecastProps {
  data: ServiceLevelForecastPoint[];
}

export const ServiceLevelForecast: React.FC<ServiceLevelForecastProps> = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 360;
  const height = 210;
  const padding = { top: 25, right: 15, bottom: 35, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scale: 80% to 100%
  const minY = 80;
  const maxY = 100;
  const yTicks = [80, 85, 90, 95, 100];

  const getX = (i: number) => {
    return padding.left + (i / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
  };

  const baseLinePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.baseCase)}`)
    .join(' ');

  const optimizedLinePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.optimizedPlan)}`)
    .join(' ');

  const targetY = getY(95.0);

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Service Level Forecast
        </h3>
        <p className="text-xs text-slate-500">
          Simulated order fulfillment & on-time in-full (OTIF) rate
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 text-xs text-slate-600 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] inline-block" />
          <span className="font-semibold text-slate-800">Base Case</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block" />
          <span className="font-semibold text-slate-800">Optimized Plan</span>
        </div>
      </div>

      {/* SVG Multi-Line Chart */}
      <div className="relative w-full h-[180px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Y-axis Label */}
          <text
            x={-height / 2}
            y="12"
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-[10px] fill-slate-400 font-semibold uppercase tracking-wider"
          >
            Service Level (%)
          </text>

          {/* Grid lines and Y ticks */}
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
                  x={padding.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-slate-400 font-mono"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Subtle Target Line (95%) */}
          <line
            x1={padding.left}
            y1={targetY}
            x2={width - padding.right}
            y2={targetY}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Base Case Line */}
          <path
            d={baseLinePath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Optimized Plan Line */}
          <path
            d={optimizedLinePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Points */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cyBase = getY(d.baseCase);
            const cyOpt = getY(d.optimizedPlan);
            const isHovered = hoverIndex === i;

            return (
              <g key={d.month}>
                <circle
                  cx={cx}
                  cy={cyBase}
                  r={isHovered ? 4.5 : 3}
                  fill="#2563eb"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <circle
                  cx={cx}
                  cy={cyOpt}
                  r={isHovered ? 4.5 : 3}
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* X Axis Label */}
                <text
                  x={cx}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  className={`text-[10px] ${
                    isHovered ? 'fill-slate-900 font-bold' : 'fill-slate-500 font-medium'
                  }`}
                >
                  {d.month}
                </text>

                {/* Hitbox */}
                <rect
                  x={cx - chartWidth / (data.length * 2)}
                  y={padding.top}
                  width={chartWidth / data.length}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {activePoint && hoverIndex !== null && (
          <div
            className="absolute z-20 bg-slate-900/95 backdrop-blur-xs text-white text-xs rounded-lg shadow-xl px-3 py-2 pointer-events-none border border-slate-800"
            style={{
              left: `${(getX(hoverIndex) / width) * 100}%`,
              top: `${(getY(activePoint.optimizedPlan) / height) * 100}%`,
              transform: 'translate(-50%, -110%)',
            }}
          >
            <div className="font-bold text-slate-200 border-b border-slate-700/60 pb-1 mb-1">
              {activePoint.month} Forecast
            </div>
            <div className="space-y-0.5 text-[11px] font-mono">
              <div className="flex justify-between gap-3 text-blue-300">
                <span>Base Case:</span>
                <span>{activePoint.baseCase.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between gap-3 text-emerald-400 font-bold">
                <span>Optimized Plan:</span>
                <span>{activePoint.optimizedPlan.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between gap-3 text-slate-400 text-[10px] font-sans pt-0.5 border-t border-slate-800">
                <span>Delta:</span>
                <span className="text-emerald-300 font-semibold">
                  +{(activePoint.optimizedPlan - activePoint.baseCase).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
