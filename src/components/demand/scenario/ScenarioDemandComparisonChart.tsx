import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScenarioTrajectoryPoint } from '../../../types/domain/scenarioDecisionTwin';

interface ScenarioDemandComparisonChartProps {
  data: ScenarioTrajectoryPoint[];
  selectedScenarioId: string;
  granularity: 'Monthly' | 'Quarterly';
  onGranularityChange: (val: 'Monthly' | 'Quarterly') => void;
}

export const ScenarioDemandComparisonChart: React.FC<ScenarioDemandComparisonChartProps> = ({
  data,
  selectedScenarioId,
  granularity,
  onGranularityChange,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // SVG dimensions
  const width = 720;
  const height = 310;
  const padding = { top: 35, right: 30, bottom: 45, left: 55 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Max scale is 250 K units
  const maxY = 250;
  const minY = 0;

  const getX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
  };

  // Build path strings
  const basePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.baseCase)}`)
    .join(' ');

  const highDemandPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.highDemand)}`)
    .join(' ');

  const commodityPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.commodityShock)}`)
    .join(' ');

  const supplyPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.supplyDisruption)}`)
    .join(' ');

  const pricingPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.pricingOptimization)}`)
    .join(' ');

  // Base area under base case line
  const baseAreaPath = `${basePath} L ${getX(data.length - 1)} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  // Forecast vertical line index (Aug = index 7)
  const forecastIndex = data.findIndex((d) => d.isForecast);
  const forecastX = forecastIndex !== -1 ? getX(forecastIndex) : getX(7);

  // Y-axis ticks
  const yTicks = [0, 50, 100, 150, 200, 250];

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;

  // Determine which scenario value to compare against base case in tooltip
  const getSelectedValue = (point: ScenarioTrajectoryPoint) => {
    switch (selectedScenarioId) {
      case 'scenario-high-demand':
        return { name: 'High Demand', val: point.highDemand, color: '#10b981' };
      case 'scenario-commodity-shock':
        return { name: 'Commodity Shock', val: point.commodityShock, color: '#f97316' };
      case 'scenario-supply-disruption':
        return { name: 'Supply Disruption', val: point.supplyDisruption, color: '#ef4444' };
      case 'scenario-pricing-opt':
        return { name: 'Pricing Opt', val: point.pricingOptimization, color: '#0284c7' };
      default:
        return { name: 'Base Case', val: point.baseCase, color: '#0284c7' };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full relative">
      {/* Header & Granularity Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Demand Comparison Across Scenarios
          </h3>
          <p className="text-xs text-slate-500">
            Multi-trajectory projected unit demand under simulated operating assumptions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={granularity}
              onChange={(e) => onGranularityChange(e.target.value as 'Monthly' | 'Quarterly')}
              aria-label="Granularity"
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
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] inline-block shadow-2xs" />
          <span className="font-semibold text-slate-800">Base Case</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-0 border-t-2 border-dashed border-[#10b981] inline-block" />
          <span className="font-semibold text-slate-800">High Demand</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] inline-block" />
          <span>Commodity Shock</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-0 border-t-2 border-dashed border-[#ef4444] inline-block" />
          <span>Supply Disruption</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full h-[250px] sm:h-[280px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="baseAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Y-axis Label */}
          <text
            x={-height / 2}
            y="16"
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-[11px] fill-slate-400 font-semibold uppercase tracking-wider"
          >
            Demand (K units)
          </text>

          {/* Grid lines and Ticks */}
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
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Base Area Shading */}
          <path d={baseAreaPath} fill="url(#baseAreaGradient)" />

          {/* Forecast Divider Line */}
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

          {/* Lines */}
          {/* Commodity Shock (Orange) */}
          <path
            d={commodityPath}
            fill="none"
            stroke="#f97316"
            strokeWidth={selectedScenarioId === 'scenario-commodity-shock' ? 3 : 1.8}
            strokeOpacity={selectedScenarioId === 'scenario-commodity-shock' ? 1 : 0.75}
          />

          {/* Supply Disruption (Red dashed) */}
          <path
            d={supplyPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth={selectedScenarioId === 'scenario-supply-disruption' ? 3 : 1.8}
            strokeDasharray="4 4"
            strokeOpacity={selectedScenarioId === 'scenario-supply-disruption' ? 1 : 0.75}
          />

          {/* High Demand (Green dashed) */}
          <path
            d={highDemandPath}
            fill="none"
            stroke="#10b981"
            strokeWidth={selectedScenarioId === 'scenario-high-demand' ? 3 : 2}
            strokeDasharray="4 4"
            strokeOpacity={selectedScenarioId === 'scenario-high-demand' ? 1 : 0.85}
          />

          {/* Pricing Optimization (if selected or active) */}
          {selectedScenarioId === 'scenario-pricing-opt' && (
            <path
              d={pricingPath}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth={2.8}
              strokeLinecap="round"
            />
          )}

          {/* Base Case (Solid Blue) */}
          <path
            d={basePath}
            fill="none"
            stroke="#0284c7"
            strokeWidth={selectedScenarioId === 'scenario-base' ? 3.2 : 2.5}
            strokeLinecap="round"
          />

          {/* Data Points */}
          {data.map((d, i) => {
            const cx = getX(i);
            const isHovered = hoverIndex === i;

            return (
              <g key={d.monthShort}>
                {/* Dots on Base Case */}
                <circle
                  cx={cx}
                  cy={getY(d.baseCase)}
                  r={isHovered ? 5 : 3}
                  fill="#0284c7"
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2 : 1}
                />

                {/* Dots on High Demand */}
                <circle
                  cx={cx}
                  cy={getY(d.highDemand)}
                  r={isHovered ? 4.5 : 2.5}
                  fill="#10b981"
                />

                {/* Dots on Commodity Shock */}
                <circle
                  cx={cx}
                  cy={getY(d.commodityShock)}
                  r={isHovered ? 4 : 2}
                  fill="#f97316"
                />

                {/* Dots on Supply Disruption */}
                <circle
                  cx={cx}
                  cy={getY(d.supplyDisruption)}
                  r={isHovered ? 4 : 2}
                  fill="#ef4444"
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

                {/* Invisible Hover Hitbox */}
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
              stroke="#0284c7"
              strokeWidth="1"
              strokeDasharray="2 2"
              pointerEvents="none"
            />
          )}
        </svg>

        {/* Hover Tooltip */}
        {activePoint && hoverIndex !== null && (
          <div
            className="absolute z-20 bg-slate-900/95 backdrop-blur-xs text-white text-xs rounded-lg shadow-xl px-3.5 py-2.5 pointer-events-none border border-slate-800"
            style={{
              left: `${(getX(hoverIndex) / width) * 100}%`,
              top: '25%',
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="font-bold text-slate-200 border-b border-slate-700/60 pb-1 mb-1.5 flex items-center justify-between gap-3">
              <span>{activePoint.month}</span>
              {activePoint.isForecast && (
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-primary text-primary">
                  Forecast
                </span>
              )}
            </div>

            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between gap-4 text-primary">
                <span className="font-sans">Base Case:</span>
                <span className="font-bold">{activePoint.baseCase}K</span>
              </div>

              {selectedScenarioId !== 'scenario-base' && (
                <div
                  className="flex justify-between gap-4 font-bold"
                  style={{ color: getSelectedValue(activePoint).color }}
                >
                  <span className="font-sans">{getSelectedValue(activePoint).name}:</span>
                  <span>{getSelectedValue(activePoint).val}K</span>
                </div>
              )}

              {selectedScenarioId !== 'scenario-base' && (
                <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-[10px] font-sans">
                  <span className="text-slate-400">Variance:</span>
                  <span
                    className={`font-semibold ${
                      getSelectedValue(activePoint).val >= activePoint.baseCase
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {(
                      ((getSelectedValue(activePoint).val - activePoint.baseCase) /
                        activePoint.baseCase) *
                      100
                    ).toFixed(1)}
                    %
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
