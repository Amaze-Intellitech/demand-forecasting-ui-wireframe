import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { InventoryPositionSeriesPoint } from '../../../types/domain/inventoryIntelligence';

interface InventoryPositionChartProps {
  data: InventoryPositionSeriesPoint[];
  period: string;
  onPeriodChange: (val: string) => void;
}

export const InventoryPositionChart: React.FC<InventoryPositionChartProps> = ({
  data,
  period,
  onPeriodChange,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Dimensions
  const width = 760;
  const height = 320;
  const padding = { top: 35, right: 30, bottom: 45, left: 55 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Max scale is 1200 K units
  const maxY = 1200;
  const minY = 0;

  const getX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
  };

  // Build points path
  const upperPoints = data.map((d, i) => `${getX(i)},${getY(d.upperLimit)}`);
  const lowerPointsRev = [...data].reverse().map((d, i) => {
    const origIdx = data.length - 1 - i;
    return `${getX(origIdx)},${getY(d.lowerLimit)}`;
  });
  const bandPolygon = [...upperPoints, ...lowerPointsRev].join(' ');

  const targetPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.target)}`)
    .join(' ');

  const onHandPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.onHand)}`)
    .join(' ');

  const upperLinePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.upperLimit)}`)
    .join(' ');

  const lowerLinePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.lowerLimit)}`)
    .join(' ');

  // Forecast vertical line index (Aug = index 7)
  const forecastIndex = data.findIndex((d) => d.isForecast);
  const forecastX = forecastIndex !== -1 ? getX(forecastIndex) : getX(7);

  // Y-axis ticks
  const yTicks = [0, 200, 400, 600, 800, 1000, 1200];

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between relative">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Inventory Position vs. Target
          </h3>
          <p className="text-xs text-slate-500">
            Operating range and forecast trajectory against policy thresholds
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Monthly / Quarterly Selector */}
          <div className="relative">
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value)}
              aria-label="Select granularity"
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Legend Row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#2563eb] inline-block border-2 border-white shadow-2xs" />
          <span className="font-semibold text-slate-800">On-Hand Inventory</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0 border-t-2 border-dashed border-[#10b981] inline-block" />
          <span className="font-semibold text-slate-800">Target Inventory</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] inline-block" />
          <span>Upper Limit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] inline-block" />
          <span>Lower Limit</span>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full h-[260px] sm:h-[300px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="operatingBandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Y-axis label */}
          <text
            x={-height / 2}
            y="16"
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-[11px] fill-slate-400 font-semibold uppercase tracking-wider"
          >
            Inventory (K units)
          </text>

          {/* Horizontal Grid lines & Y-ticks */}
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
                  className="text-[10px] fill-slate-400 font-mono"
                >
                  {tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Shaded Range Band (Lower to Upper Limit) */}
          <polygon points={bandPolygon} fill="url(#operatingBandGradient)" />

          {/* Upper Limit Line */}
          <path
            d={upperLinePath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />

          {/* Lower Limit Line */}
          <path
            d={lowerLinePath}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />

          {/* Target Inventory Line (Dashed Green) */}
          <path
            d={targetPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="5 5"
          />

          {/* Forecast Period Boundary Line */}
          <line
            x1={forecastX}
            y1={padding.top}
            x2={forecastX}
            y2={height - padding.bottom}
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={forecastX + 8}
            y={padding.top + 14}
            className="text-[11px] font-bold fill-slate-700 select-none"
          >
            Forecast Period →
          </text>

          {/* On-Hand Inventory Line (Solid Blue) */}
          <path
            d={onHandPath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.onHand);
            const isHovered = hoverIndex === i;

            return (
              <g key={d.monthShort}>
                {/* Upper limit dot */}
                <circle cx={cx} cy={getY(d.upperLimit)} r="2" fill="#38bdf8" />
                {/* Lower limit dot */}
                <circle cx={cx} cy={getY(d.lowerLimit)} r="2" fill="#60a5fa" />

                {/* On-Hand dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#2563eb"
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-150"
                />

                {/* X-axis Label */}
                <text
                  x={cx}
                  y={height - padding.bottom + 18}
                  textAnchor="middle"
                  className={`text-[11px] ${
                    isHovered ? 'fill-slate-900 font-bold' : 'fill-slate-500 font-medium'
                  }`}
                >
                  {d.monthShort}
                </text>

                {/* Invisible hover hitbox */}
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

          {/* Hover Crosshair */}
          {hoverIndex !== null && (
            <line
              x1={getX(hoverIndex)}
              y1={padding.top}
              x2={getX(hoverIndex)}
              y2={height - padding.bottom}
              stroke="#2563eb"
              strokeWidth="1"
              strokeDasharray="2 2"
              pointerEvents="none"
            />
          )}
        </svg>

        {/* Floating Tooltip */}
        {activePoint && hoverIndex !== null && (
          <div
            className="absolute z-20 bg-slate-900/95 backdrop-blur-xs text-white text-xs rounded-lg shadow-xl px-3.5 py-2.5 pointer-events-none transition-all duration-75 border border-slate-800"
            style={{
              left: `${(getX(hoverIndex) / width) * 100}%`,
              top: `${(getY(activePoint.onHand) / height) * 100}%`,
              transform: 'translate(-50%, -115%)',
            }}
          >
            <div className="font-bold text-slate-200 border-b border-slate-700/60 pb-1 mb-1.5 flex items-center justify-between gap-3">
              <span>{activePoint.month}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                  activePoint.status === 'On Target'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : activePoint.status === 'Below Target'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}
              >
                {activePoint.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] font-mono">
              <span className="text-blue-300 font-sans font-medium">On-Hand:</span>
              <span className="text-right font-bold">{activePoint.onHand}K</span>

              <span className="text-emerald-300 font-sans font-medium">Target:</span>
              <span className="text-right">{activePoint.target}K</span>

              <span className="text-sky-300 font-sans font-medium">Upper:</span>
              <span className="text-right">{activePoint.upperLimit}K</span>

              <span className="text-slate-300 font-sans font-medium">Lower:</span>
              <span className="text-right">{activePoint.lowerLimit}K</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
