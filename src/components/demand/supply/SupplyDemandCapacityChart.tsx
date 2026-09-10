import React, { useState } from 'react';
import { SupplyDemandPoint } from '../../../types/domain/supplyCapacityOptimization';

interface SupplyDemandCapacityChartProps {
  data: SupplyDemandPoint[];
  granularity: 'Monthly' | 'Quarterly';
  onGranularityChange: (g: 'Monthly' | 'Quarterly') => void;
}

export const SupplyDemandCapacityChart: React.FC<SupplyDemandCapacityChartProps> = ({
  data,
  granularity,
  onGranularityChange,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Chart Dimensions
  const width = 640;
  const height = 240;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxY = 250;
  const yTicks = [0, 50, 100, 150, 200, 250];

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - (val / maxY) * chartHeight;
  };

  // Build SVG Path strings
  const buildPath = (key: 'demand' | 'supplyPlan' | 'availableCapacity') => {
    return data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(d[key]).toFixed(1)}`)
      .join(' ');
  };

  const demandPath = buildPath('demand');
  const supplyPlanPath = buildPath('supplyPlan');
  const availableCapacityPath = buildPath('availableCapacity');

  // Find index where forecast starts
  const forecastStartIndex = data.findIndex((d) => d.isForecastPeriod);
  const forecastDividerX =
    forecastStartIndex > 0
      ? (getX(forecastStartIndex - 1) + getX(forecastStartIndex)) / 2
      : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header with Title, Legend & Granularity */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">
          Supply vs. Demand & Capacity
        </h2>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block ring-2 ring-blue-100" />
              <span>Demand</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ring-2 ring-emerald-100" />
              <span>Supply Plan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block ring-2 ring-primary" />
              <span>Available Capacity</span>
            </div>
          </div>

          {/* Granularity Dropdown */}
          <div className="relative">
            <select
              value={granularity}
              onChange={(e) => onGranularityChange(e.target.value as 'Monthly' | 'Quarterly')}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-md px-2.5 py-1 pr-6 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs cursor-pointer"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Multi-Line Chart Container */}
      <div className="relative w-full overflow-hidden mt-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Y Axis Gridlines and Labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? 'none' : '3 3'}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fontWeight="500"
                  fill="#94A3B8"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Y Axis Unit Label */}
          <text
            x={12}
            y={paddingTop - 10}
            fontSize="10"
            fontWeight="500"
            fill="#64748B"
            transform={`rotate(-90 12, ${paddingTop - 10})`}
            textAnchor="end"
          >
            Units (K)
          </text>

          {/* Forecast Background Area */}
          {forecastDividerX && (
            <rect
              x={forecastDividerX}
              y={paddingTop}
              width={width - paddingRight - forecastDividerX}
              height={chartHeight}
              fill="#F8FAFC"
              opacity="0.8"
            />
          )}

          {/* Forecast Divider Line and Label */}
          {forecastDividerX && (
            <g>
              <line
                x1={forecastDividerX}
                y1={paddingTop}
                x2={forecastDividerX}
                y2={paddingTop + chartHeight}
                stroke="#94A3B8"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text
                x={forecastDividerX + 8}
                y={paddingTop + 14}
                fontSize="10"
                fontWeight="600"
                fill="#475569"
              >
                Forecast Period &rarr;
              </text>
            </g>
          )}

          {/* Lines */}
          {/* Available Capacity Line (Sky Blue) */}
          <path
            d={availableCapacityPath}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Supply Plan Line (Emerald Dashed) */}
          <path
            d={supplyPlanPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.2"
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Demand Line (Blue Solid) */}
          <path
            d={demandPath}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points and Hover Triggers */}
          {data.map((d, i) => {
            const x = getX(i);
            const yDemand = getY(d.demand);
            const ySupply = getY(d.supplyPlan);
            const yCap = getY(d.availableCapacity);
            const isHovered = hoveredIndex === i;

            return (
              <g key={d.period}>
                {/* Vertical hover indicator */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingTop}
                    x2={x}
                    y2={paddingTop + chartHeight}
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Available Capacity Dot */}
                <circle
                  cx={x}
                  cy={yCap}
                  r={isHovered ? 4.5 : 3}
                  fill="#38BDF8"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* Supply Plan Dot */}
                <circle
                  cx={x}
                  cy={ySupply}
                  r={isHovered ? 4.5 : 3}
                  fill="#10B981"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* Demand Dot */}
                <circle
                  cx={x}
                  cy={yDemand}
                  r={isHovered ? 5 : 3.5}
                  fill="#2563EB"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* X Axis Label */}
                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={d.isForecastPeriod ? '600' : '500'}
                  fill={isHovered ? '#0F172A' : d.isForecastPeriod ? '#475569' : '#94A3B8'}
                >
                  {d.period}
                </text>

                {/* Invisible hover area */}
                <rect
                  x={x - 18}
                  y={paddingTop}
                  width={36}
                  height={chartHeight + 20}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIndex !== null && data[hoveredIndex] && (
          <div
            className="absolute z-20 pointer-events-none bg-slate-900/95 text-white p-2.5 rounded-lg shadow-xl border border-slate-700/50 text-[11px] leading-relaxed transition-all"
            style={{
              left: `${Math.min(
                Math.max(
                  (getX(hoveredIndex) / width) * 100,
                  18
                ),
                82
              )}%`,
              top: '15px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-semibold text-slate-200 border-b border-slate-700 pb-1 mb-1.5 flex items-center justify-between gap-4">
              <span>{data[hoveredIndex].period} 2025</span>
              {data[hoveredIndex].isForecastPeriod && (
                <span className="text-[9px] bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded">
                  Forecast
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <span className="text-slate-400">Demand:</span>
              <span className="font-semibold text-blue-400 text-right">
                {data[hoveredIndex].demand}K units
              </span>

              <span className="text-slate-400">Supply Plan:</span>
              <span className="font-semibold text-emerald-400 text-right">
                {data[hoveredIndex].supplyPlan}K units
              </span>

              <span className="text-slate-400">Capacity:</span>
              <span className="font-semibold text-primary text-right">
                {data[hoveredIndex].availableCapacity}K units
              </span>

              {data[hoveredIndex].supplyGap && (
                <>
                  <span className="text-rose-400 font-medium">Supply Gap:</span>
                  <span className="font-bold text-rose-400 text-right">
                    +{data[hoveredIndex].supplyGap}K units (Deficit)
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
