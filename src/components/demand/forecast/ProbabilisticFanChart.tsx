import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ProbabilisticForecastPoint,
  ForecastQuantilesDec,
} from '../../../types/domain/demandForecast';
import { ForecastQuantilePanel } from './ForecastQuantilePanel';

interface ProbabilisticFanChartProps {
  data: ProbabilisticForecastPoint[];
  quantiles: ForecastQuantilesDec;
  granularity: 'Monthly' | 'Quarterly';
  onGranularityChange: (g: 'Monthly' | 'Quarterly') => void;
}

export const ProbabilisticFanChart: React.FC<ProbabilisticFanChartProps> = ({
  data,
  quantiles,
  granularity,
  onGranularityChange,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeQuantile, setActiveQuantile] = useState<string>('All');

  // SVG Chart Geometry
  const width = 560;
  const height = 270;
  const padding = { top: 35, right: 20, bottom: 40, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxY = 240;
  const yTicks = [0, 40, 80, 120, 160, 200, 240];

  const getX = (index: number) => {
    if (data.length <= 1) return padding.left;
    return padding.left + (index / (data.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(0, Math.min(maxY, val));
    return padding.top + innerHeight - (clamped / maxY) * innerHeight;
  };

  // Historical Actuals Line (Jan to May, index 0 to 4)
  const historicalPoints = data
    .filter((d) => !d.isForecast && d.actual !== null)
    .map((d, i) => `${getX(i)},${getY(d.actual as number)}`);
  const historicalPath = `M ${historicalPoints.join(' L ')}`;

  // Forecast Fan points (Starts from May at index 4, through index 11)
  const mayPoint = data[4] || data[0];
  const mayActual = mayPoint.actual ?? 86;
  const forecastSeries = data.slice(5);

  const p95Points = [`${getX(4)},${getY(mayActual)}`, ...forecastSeries.map((d, i) => `${getX(i + 5)},${getY(d.p95)}`)];
  const p90Points = [`${getX(4)},${getY(mayActual)}`, ...forecastSeries.map((d, i) => `${getX(i + 5)},${getY(d.p90)}`)];
  const p80Points = [`${getX(4)},${getY(mayActual)}`, ...forecastSeries.map((d, i) => `${getX(i + 5)},${getY(d.p80)}`)];
  const p50Points = [`${getX(4)},${getY(mayActual)}`, ...forecastSeries.map((d, i) => `${getX(i + 5)},${getY(d.p50)}`)];
  const p10Points = [`${getX(4)},${getY(mayActual)}`, ...forecastSeries.map((d, i) => `${getX(i + 5)},${getY(d.p10)}`)];

  // Outer Shaded Band: P10 to P95
  const p10PointsRev = [...p10Points].reverse();
  const fanOuterPath = `M ${p95Points.join(' L ')} L ${p10PointsRev.join(' L ')} Z`;

  // Mid Shaded Band: P10 to P80
  const fanMidPath = `M ${p80Points.join(' L ')} L ${p10PointsRev.join(' L ')} Z`;

  // Paths
  const p50Path = `M ${p50Points.join(' L ')}`;
  const p90Path = `M ${p90Points.join(' L ')}`;
  const p10Path = `M ${p10Points.join(' L ')}`;

  // Transition vertical line between May and Jun
  const transitionX = (getX(4) + getX(5)) / 2;

  // Active hover point
  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : null;
  const activeX = hoveredIndex !== null ? getX(hoveredIndex) : null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Probabilistic Demand Forecast ({granularity})
          </h3>
        </div>

        {/* Legend & Granularity */}
        <div className="flex items-center gap-3">
          {/* Legend Toggles */}
          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-[#1e293b]" />
              <span className="text-[11px] font-medium text-slate-700">Actual</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-sky-300" />
              <span className="text-[11px] font-medium text-slate-600">P10</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-[#0062d2]" />
              <span className="text-[11px] font-bold text-[#0062d2]">P50</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="w-2.5 h-2 bg-sky-100 border border-sky-300 rounded-xs" />
              <span className="text-[11px] font-medium text-slate-600">P80</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="w-2.5 h-2 bg-sky-200/60 border border-sky-400 rounded-xs" />
              <span className="text-[11px] font-medium text-slate-600">P90</span>
            </div>
          </div>

          {/* Granularity Selector */}
          <div className="relative">
            <select
              value={granularity}
              onChange={(e) => onGranularityChange(e.target.value as 'Monthly' | 'Quarterly')}
              className="h-7 pl-2.5 pr-6 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Area: Chart (Left) + Quantiles Panel (Right) */}
      <div className="flex flex-col lg:flex-row gap-5 mt-2 flex-1 items-stretch">
        
        {/* SVG Chart Container */}
        <div className="relative flex-1 min-h-[220px] w-full min-w-0">
          {/* Y Axis Label */}
          <div className="absolute left-1 top-0 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Demand (K units)
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Horizontal Gridlines & Y Ticks */}
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
                    fontSize="10"
                    fill="#94a3b8"
                    className="font-mono"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Vertical Boundary Line (Actual vs Forecast) */}
            <line
              x1={transitionX}
              y1={padding.top}
              x2={transitionX}
              y2={padding.top + innerHeight}
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Divider Labels */}
            <text
              x={transitionX - 18}
              y={padding.top + 8}
              fontSize="9.5"
              fill="#64748b"
              fontWeight="600"
              textAnchor="middle"
            >
              Actual
            </text>
            <text
              x={transitionX + 22}
              y={padding.top + 8}
              fontSize="9.5"
              fill="#0062d2"
              fontWeight="600"
              textAnchor="middle"
            >
              Forecast
            </text>

            {/* Shaded Probabilistic Fan Bands */}
            <path d={fanOuterPath} fill="rgba(224, 242, 254, 0.45)" />
            <path d={fanMidPath} fill="rgba(186, 230, 253, 0.45)" />

            {/* P90 Upper Boundary Line */}
            <path
              d={p90Path}
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* P10 Lower Boundary Line */}
            <path
              d={p10Path}
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* P50 Median Forecast Line (Solid Blue) */}
            <path
              d={p50Path}
              fill="none"
              stroke="#0062d2"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Historical Actual Line (Dark Slate) */}
            <path
              d={historicalPath}
              fill="none"
              stroke="#1e293b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Historical Markers */}
            {data
              .filter((d) => !d.isForecast && d.actual !== null)
              .map((d, i) => {
                const cx = getX(i);
                const cy = getY(d.actual as number);
                return (
                  <circle
                    key={`actual-${d.period}`}
                    cx={cx}
                    cy={cy}
                    r="3.5"
                    fill="#ffffff"
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                );
              })}

            {/* Forecast Markers on P50 */}
            {forecastSeries.map((d, i) => {
              const cx = getX(i + 5);
              const cy = getY(d.p50);
              return (
                <circle
                  key={`p50-${d.period}`}
                  cx={cx}
                  cy={cy}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#0062d2"
                  strokeWidth="2"
                />
              );
            })}

            {/* X-Axis Ticks */}
            {data.map((d, i) => {
              const x = getX(i);
              const y = padding.top + innerHeight + 16;
              const isFcast = d.isForecast;

              return (
                <g key={`x-${d.period}`}>
                  <line
                    x1={x}
                    y1={padding.top + innerHeight}
                    x2={x}
                    y2={padding.top + innerHeight + 4}
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isFcast ? '#0062d2' : '#64748b'}
                    fontWeight={isFcast ? '600' : '500'}
                  >
                    {d.period}
                  </text>
                </g>
              );
            })}

            {/* Interactive Hover Hitboxes */}
            {data.map((_, i) => {
              const x = getX(i);
              const colWidth = innerWidth / (data.length - 1);
              return (
                <rect
                  key={`hitbox-${i}`}
                  x={x - colWidth / 2}
                  y={padding.top}
                  width={colWidth}
                  height={innerHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredIndex(i)}
                />
              );
            })}

            {/* Active Hover Crosshair */}
            {activeX !== null && (
              <line
                x1={activeX}
                y1={padding.top}
                x2={activeX}
                y2={padding.top + innerHeight}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 2"
                pointerEvents="none"
              />
            )}
          </svg>

          {/* Floating Tooltip */}
          {activePoint && activeX !== null && (
            <div
              className="absolute z-30 pointer-events-none bg-slate-900/95 backdrop-blur-sm text-white rounded-lg shadow-xl px-3 py-2 text-xs border border-slate-700/80 transition-transform duration-75"
              style={{
                left: `${Math.min(Math.max(activeX - 60, 40), width - 180)}px`,
                top: '15px',
              }}
            >
              <div className="font-bold text-[11px] text-slate-300 pb-1 border-b border-slate-700 mb-1 flex items-center justify-between gap-2">
                <span>{activePoint.period} 2025</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activePoint.isForecast ? 'bg-sky-900 text-sky-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {activePoint.isForecast ? 'Forecast' : 'Actual'}
                </span>
              </div>

              {!activePoint.isForecast && activePoint.actual !== null ? (
                <div className="space-y-0.5 text-[11px]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400">Actual Demand:</span>
                    <span className="font-bold text-white font-mono">{activePoint.actual}K</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-0.5 text-[11px]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400">P50 (Median):</span>
                    <span className="font-bold text-sky-400 font-mono">{activePoint.p50}K</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[10px] text-slate-300">
                    <span className="text-slate-400">P90 / P80:</span>
                    <span className="font-mono">{activePoint.p90}K / {activePoint.p80}K</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[10px] text-slate-300">
                    <span className="text-slate-400">P10 (Lower):</span>
                    <span className="font-mono">{activePoint.p10}K</span>
                  </div>
                  <div className="pt-1 border-t border-slate-800 flex items-center justify-between gap-2 text-[9.5px] text-slate-400">
                    <span>Uncertainty Range:</span>
                    <span className="font-mono text-emerald-400">±{activePoint.p90 - activePoint.p50}K</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quantile Right Sub-Panel */}
        <ForecastQuantilePanel
          quantiles={quantiles}
          activeQuantile={activeQuantile}
          onSelectQuantile={setActiveQuantile}
        />
      </div>
    </div>
  );
};
