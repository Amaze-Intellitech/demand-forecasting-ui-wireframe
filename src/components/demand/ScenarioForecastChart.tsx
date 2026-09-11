import React, { useState, useMemo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  SCENARIO_FORECAST_SERIES,
  ScenarioChartPoint,
  ScenarioPresetId,
  ScenarioParametersState,
} from '../../data/demandScenarioMock';

export interface ScenarioForecastChartProps {
  selectedPreset: ScenarioPresetId;
  params: ScenarioParametersState;
}

export const ScenarioForecastChart: React.FC<ScenarioForecastChartProps> = ({
  selectedPreset,
  params,
}) => {
  const [viewMode, setViewMode] = useState<'Monthly' | 'Quarterly'>('Monthly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<ScenarioChartPoint | null>(null);

  // SVG dimensions
  const width = 880;
  const height = 330;
  const padding = { top: 38, right: 28, bottom: 42, left: 62 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Scales
  const minY = 0;
  const maxY = 50000;
  const totalPoints = SCENARIO_FORECAST_SERIES.length;

  const getX = (index: number) => padding.left + (index / (totalPoints - 1)) * plotWidth;
  const getY = (val: number) => padding.top + plotHeight - ((val - minY) / (maxY - minY)) * plotHeight;

  // Today marker index (Jul 2025, index 6)
  const todayIndex = 6;
  const todayX = getX(todayIndex);

  // Helper to build SVG path
  const buildPath = (accessor: (pt: ScenarioChartPoint) => number) => {
    return SCENARIO_FORECAST_SERIES.reduce((acc, pt, idx) => {
      const x = getX(idx);
      const y = getY(accessor(pt));
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  // Base Case Path (solid blue)
  const basePath = useMemo(() => buildPath((pt) => pt.baseCase), []);

  // Demand Surge Path (dashed red)
  const surgePath = useMemo(() => buildPath((pt) => pt.demandSurge), []);

  // Cost Inflation Path (dashed amber)
  const costPath = useMemo(() => buildPath((pt) => pt.costInflation), []);

  // Price Shock Path (dashed green)
  const pricePath = useMemo(() => buildPath((pt) => pt.priceShock), []);

  // Custom Scenario Path based on sliders
  const customPath = useMemo(() => {
    const demandMultiplier = 1 + params.demandChange / 100;
    const priceEffect = 1 - (params.priceChange * 0.28) / 100;
    return SCENARIO_FORECAST_SERIES.reduce((acc, pt, idx) => {
      const x = getX(idx);
      // Beyond today, apply custom multiplier
      const val =
        idx <= todayIndex
          ? pt.baseCase
          : Math.min(
              49000,
              Math.max(8000, pt.baseCase * demandMultiplier * priceEffect)
            );
      const y = getY(val);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [params]);

  // Soft red/pink shaded area envelope around Demand Surge beyond Today
  const surgeShadedPath = useMemo(() => {
    const futurePoints = SCENARIO_FORECAST_SERIES.slice(todayIndex);
    if (futurePoints.length === 0) return '';

    // Upper curve (surge)
    const upperStr = futurePoints.reduce((acc, pt, idx) => {
      const realIdx = todayIndex + idx;
      const x = getX(realIdx);
      const y = getY(pt.demandSurge);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');

    // Lower curve (base)
    const lowerStr = [...futurePoints].reverse().reduce((acc, pt, idx) => {
      const realIdx = todayIndex + futurePoints.length - 1 - idx;
      const x = getX(realIdx);
      const y = getY(pt.baseCase);
      return `${acc} L ${x} ${y}`;
    }, '');

    return `${upperStr} ${lowerStr} Z`;
  }, []);

  // Y-axis ticks
  const yTicks = [0, 10000, 20000, 30000, 40000, 50000];

  // Mouse hover
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
    setHoveredPoint(SCENARIO_FORECAST_SERIES[clampedIndex]);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between relative">
      {/* Header & Dropdown */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 relative">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Demand Forecast Comparison
        </h3>

        {/* View Mode Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>{viewMode}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              {(['Monthly', 'Quarterly'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setViewMode(mode);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    viewMode === mode
                      ? 'bg-blue-50 text-[#0062d2] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{mode}</span>
                  {viewMode === mode && <Check className="w-3.5 h-3.5 text-[#0062d2]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden pt-2 select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Defs */}
          <defs>
            <linearGradient id="surgePinkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
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

          {/* Left Y-axis Label */}
          <text
            x={-(padding.top + plotHeight / 2)}
            y={16}
            transform="rotate(-90)"
            textAnchor="middle"
            className="fill-slate-500 font-semibold text-[11px] tracking-wide"
          >
            Demand (Units)
          </text>

          {/* Baseline */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={width - padding.right}
            y2={padding.top + plotHeight}
            stroke="#e2e8f0"
            strokeWidth="1"
          />

          {/* X-axis Monthly Labels (12 Months) */}
          {SCENARIO_FORECAST_SERIES.map((pt, idx) => {
            const x = getX(idx);
            return (
              <g key={pt.month}>
                <line
                  x1={x}
                  y1={padding.top + plotHeight}
                  x2={x}
                  y2={padding.top + plotHeight + 4}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={padding.top + plotHeight + 14}
                  textAnchor="middle"
                  className="fill-slate-600 font-mono text-[10px]"
                >
                  {pt.month}
                </text>
                <text
                  x={x}
                  y={padding.top + plotHeight + 25}
                  textAnchor="middle"
                  className="fill-slate-400 font-mono text-[9px]"
                >
                  {pt.year}
                </text>
              </g>
            );
          })}

          {/* Shaded area for Surge */}
          {surgeShadedPath && (
            <path d={surgeShadedPath} fill="url(#surgePinkGrad)" />
          )}

          {/* Vertical Today Line at Jul 2025 */}
          <line
            x1={todayX}
            y1={padding.top}
            x2={todayX}
            y2={padding.top + plotHeight}
            stroke="#0062d2"
            strokeWidth="1.6"
            strokeDasharray="4,4"
          />
          <text
            x={todayX}
            y={padding.top - 10}
            textAnchor="middle"
            className="fill-[#0062d2] font-bold text-[11px] tracking-wide"
          >
            Today
          </text>

          {/* Price Shock Curve (dashed green) */}
          <path
            d={pricePath}
            fill="none"
            stroke="#10b981"
            strokeWidth={selectedPreset === 'price-shock' ? '3' : '2'}
            strokeDasharray="5,4"
            opacity={selectedPreset === 'price-shock' || selectedPreset === 'base-case' ? 1 : 0.45}
            strokeLinecap="round"
          />

          {/* Cost Inflation Curve (dashed amber) */}
          <path
            d={costPath}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={selectedPreset === 'cost-inflation' ? '3' : '2'}
            strokeDasharray="5,4"
            opacity={selectedPreset === 'cost-inflation' || selectedPreset === 'base-case' ? 1 : 0.45}
            strokeLinecap="round"
          />

          {/* Demand Surge Curve (dashed red) */}
          <path
            d={surgePath}
            fill="none"
            stroke="#f43f5e"
            strokeWidth={selectedPreset === 'demand-surge' ? '3.2' : '2.2'}
            strokeDasharray="5,4"
            opacity={selectedPreset === 'demand-surge' || selectedPreset === 'base-case' ? 1 : 0.5}
            strokeLinecap="round"
          />

          {/* Custom Scenario Curve (if custom active) */}
          {selectedPreset === 'custom' && (
            <path
              d={customPath}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3.2"
              strokeDasharray="4,3"
              strokeLinecap="round"
            />
          )}

          {/* Base Case Curve (solid blue) */}
          <path
            d={basePath}
            fill="none"
            stroke="#0062d2"
            strokeWidth={selectedPreset === 'base-case' ? '3' : '2.2'}
            strokeLinecap="round"
          />

          {/* Data Points on Base Case */}
          {SCENARIO_FORECAST_SERIES.map((pt, idx) => (
            <circle
              key={pt.month}
              cx={getX(idx)}
              cy={getY(pt.baseCase)}
              r="3.2"
              fill="#0062d2"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          ))}

          {/* Hover Crosshair & Dots */}
          {hoveredPoint && (
            <g>
              <line
                x1={getX(SCENARIO_FORECAST_SERIES.indexOf(hoveredPoint))}
                y1={padding.top}
                x2={getX(SCENARIO_FORECAST_SERIES.indexOf(hoveredPoint))}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </g>
          )}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-30 pointer-events-none bg-slate-900/95 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs backdrop-blur-xs transition-all duration-75 min-w-[200px]"
            style={{
              left: `${Math.min(
                Math.max(
                  15,
                  (getX(SCENARIO_FORECAST_SERIES.indexOf(hoveredPoint)) / width) * 100 - 10
                ),
                70
              )}%`,
              top: '12%',
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
              <span className="font-bold text-primary">
                {hoveredPoint.month} {hoveredPoint.year}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {hoveredPoint.isToday ? 'Today Marker' : 'Projected'}
              </span>
            </div>

            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5 font-sans">
                  <span className="w-2 h-2 rounded-full bg-[#0062d2]" />
                  Base Case:
                </span>
                <span className="font-bold text-white">
                  {hoveredPoint.baseCase.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5 font-sans">
                  <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                  Demand Surge:
                </span>
                <span className="font-bold text-rose-300">
                  {hoveredPoint.demandSurge.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5 font-sans">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  Cost Inflation:
                </span>
                <span className="font-bold text-amber-300">
                  {hoveredPoint.costInflation.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5 font-sans">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  Price Shock:
                </span>
                <span className="font-bold text-emerald-300">
                  {hoveredPoint.priceShock.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Centered Legend */}
      <div className="flex flex-wrap items-center justify-center gap-5 pt-3 border-t border-slate-100 text-xs select-none">
        {/* Base Case */}
        <div className="flex items-center gap-1.5">
          <span className="w-4.5 h-0.5 bg-[#0062d2] rounded-full" />
          <span className="text-slate-700 font-medium">Base Case</span>
        </div>

        {/* Demand Surge */}
        <div className="flex items-center gap-1.5">
          <span className="w-4.5 h-0.5 border-t-2 border-dashed border-[#f43f5e]" />
          <span className="text-slate-700 font-medium">Demand Surge (+25%)</span>
        </div>

        {/* Cost Inflation */}
        <div className="flex items-center gap-1.5">
          <span className="w-4.5 h-0.5 border-t-2 border-dashed border-[#f59e0b]" />
          <span className="text-slate-700 font-medium">Cost Inflation</span>
        </div>

        {/* Price Shock */}
        <div className="flex items-center gap-1.5">
          <span className="w-4.5 h-0.5 border-t-2 border-dashed border-[#10b981]" />
          <span className="text-slate-700 font-medium">Price Shock</span>
        </div>

        {/* Custom Scenario indicator if active */}
        {selectedPreset === 'custom' && (
          <div className="flex items-center gap-1.5">
            <span className="w-4.5 h-0.5 border-t-2 border-dashed border-[#8b5cf6]" />
            <span className="text-purple-700 font-bold">Custom Scenario</span>
          </div>
        )}
      </div>
    </div>
  );
};
