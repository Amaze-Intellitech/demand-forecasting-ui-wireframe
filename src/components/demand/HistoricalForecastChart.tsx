import React, { useState, useMemo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  HISTORICAL_AND_FORECAST_SERIES,
  ForecastTimelinePoint,
} from '../../data/demandForecastMock';

export const HistoricalForecastChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'Monthly' | 'Quarterly'>('Monthly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<ForecastTimelinePoint | null>(null);

  // SVG dimensions
  const width = 880;
  const height = 330;
  const padding = { top: 38, right: 28, bottom: 42, left: 62 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Scales
  const minY = 0;
  const maxY = 50000;
  const totalPoints = HISTORICAL_AND_FORECAST_SERIES.length;

  const getX = (index: number) => padding.left + (index / (totalPoints - 1)) * plotWidth;
  const getY = (val: number) => padding.top + plotHeight - ((val - minY) / (maxY - minY)) * plotHeight;

  // Today index (Sep 2025, index 8)
  const todayPoint = HISTORICAL_AND_FORECAST_SERIES.find((p) => p.isToday) || HISTORICAL_AND_FORECAST_SERIES[8];
  const todayX = getX(todayPoint.index);

  // Path for Actual Demand (Jan 2025 to Sep 2025)
  const actualPoints = useMemo(() => {
    return HISTORICAL_AND_FORECAST_SERIES.filter((p) => p.actual !== null);
  }, []);

  const actualPath = useMemo(() => {
    return actualPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.index);
      const y = getY(pt.actual!);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [actualPoints]);

  // Path for Forecast (Sep 2025 to Dec 2026)
  const forecastPoints = useMemo(() => {
    return HISTORICAL_AND_FORECAST_SERIES.filter((p) => p.forecast !== null);
  }, []);

  const forecastPath = useMemo(() => {
    return forecastPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.index);
      const y = getY(pt.forecast!);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [forecastPoints]);

  // Confidence Interval Polygon Area
  const confidenceAreaPath = useMemo(() => {
    const ciPoints = HISTORICAL_AND_FORECAST_SERIES.filter(
      (p) => p.ciLower !== null && p.ciUpper !== null
    );
    if (ciPoints.length === 0) return '';

    // Upper curve (left to right)
    const upperStr = ciPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.index);
      const y = getY(pt.ciUpper!);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');

    // Lower curve (right to left)
    const lowerStr = [...ciPoints].reverse().reduce((acc, pt) => {
      const x = getX(pt.index);
      const y = getY(pt.ciLower!);
      return `${acc} L ${x} ${y}`;
    }, '');

    return `${upperStr} ${lowerStr} Z`;
  }, []);

  // Y-axis ticks
  const yTicks = [0, 10000, 20000, 30000, 40000, 50000];

  // Mouse hover handler
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
    setHoveredPoint(HISTORICAL_AND_FORECAST_SERIES[clampedIndex]);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between relative">
      {/* Card Header & View Dropdown */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 relative">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Historical Demand and Forecast
        </h3>

        {/* View Mode Selector Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>{viewMode}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Popover */}
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

      {/* Main SVG Visualization */}
      <div className="relative w-full overflow-hidden pt-2 select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Subtle gradient for Confidence Band */}
          <defs>
            <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.25" />
            </linearGradient>
          </defs>

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

          {/* X-axis Monthly Tick Labels (24 Months) */}
          {HISTORICAL_AND_FORECAST_SERIES.map((pt) => {
            const x = getX(pt.index);
            const isEverySecond = pt.index % 2 === 0; // Alternating or compact
            return (
              <g key={pt.index}>
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
                  className="fill-slate-600 font-mono text-[9.5px]"
                >
                  {pt.month}
                </text>
                <text
                  x={x}
                  y={padding.top + plotHeight + 25}
                  textAnchor="middle"
                  className={`font-mono text-[8.5px] ${
                    isEverySecond ? 'fill-slate-400' : 'fill-slate-400/80'
                  }`}
                >
                  {pt.year}
                </text>
              </g>
            );
          })}

          {/* Confidence Area Band */}
          {confidenceAreaPath && (
            <path
              d={confidenceAreaPath}
              fill="url(#confidenceGrad)"
              stroke="#7dd3fc"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              opacity="0.9"
            />
          )}

          {/* Vertical "Today" Dashed Marker Line */}
          <line
            x1={todayX}
            y1={padding.top}
            x2={todayX}
            y2={padding.top + plotHeight}
            stroke="#0062d2"
            strokeWidth="1.6"
            strokeDasharray="4,4"
          />

          {/* "Today" Text Header Badge */}
          <text
            x={todayX}
            y={padding.top - 10}
            textAnchor="middle"
            className="fill-[#0062d2] font-bold text-[11px] tracking-wide"
          >
            Today
          </text>

          {/* Forecast Path (dashed blue line) */}
          <path
            d={forecastPath}
            fill="none"
            stroke="#0062d2"
            strokeWidth="2.4"
            strokeDasharray="5,4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Actual Demand Path (solid blue line) */}
          <path
            d={actualPath}
            fill="none"
            stroke="#0062d2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Actual Demand Data Points (solid blue dots) */}
          {actualPoints.map((pt) => {
            const x = getX(pt.index);
            const y = getY(pt.actual!);
            return (
              <circle
                key={pt.index}
                cx={x}
                cy={y}
                r="3.5"
                fill="#0062d2"
                stroke="#ffffff"
                strokeWidth="1.8"
                className="drop-shadow-xs"
              />
            );
          })}

          {/* Interactive Hover Point & Vertical Guideline */}
          {hoveredPoint && (
            <g className="transition-all duration-75">
              <line
                x1={getX(hoveredPoint.index)}
                y1={padding.top}
                x2={getX(hoveredPoint.index)}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* Point Circle */}
              <circle
                cx={getX(hoveredPoint.index)}
                cy={getY(
                  hoveredPoint.actual !== null
                    ? hoveredPoint.actual
                    : hoveredPoint.forecast || 20000
                )}
                r="5"
                fill={hoveredPoint.actual !== null ? '#0062d2' : '#0284c7'}
                stroke="#ffffff"
                strokeWidth="2"
                className="drop-shadow-md"
              />
            </g>
          )}
        </svg>

        {/* Hover Tooltip Popover */}
        {hoveredPoint && (
          <div
            className="absolute z-30 pointer-events-none bg-slate-900/95 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs backdrop-blur-xs transition-all duration-75 min-w-[185px]"
            style={{
              left: `${Math.min(
                Math.max(15, (getX(hoveredPoint.index) / width) * 100 - 10),
                75
              )}%`,
              top: '10%',
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
              <span className="font-bold text-primary">{hoveredPoint.dateStr}</span>
              <span className="text-[10px] text-slate-400 font-mono font-semibold">
                YoY: <strong className="text-emerald-400">{hoveredPoint.yoy}</strong>
              </span>
            </div>

            <div className="space-y-1.5">
              {hoveredPoint.actual !== null ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0062d2]" />
                    Actual Demand:
                  </span>
                  <span className="font-mono font-bold text-white">
                    {hoveredPoint.actual.toLocaleString()} units
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                      Forecast:
                    </span>
                    <span className="font-mono font-bold text-blue-400">
                      {hoveredPoint.forecast?.toLocaleString()} units
                    </span>
                  </div>
                  {hoveredPoint.ciLower && hoveredPoint.ciUpper && (
                    <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      <span>Confidence Range:</span>
                      <span className="font-mono text-slate-300">
                        {hoveredPoint.ciLower.toLocaleString()} &ndash; {hoveredPoint.ciUpper.toLocaleString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Chart Legend (Centered matching reference image) */}
      <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 text-xs">
        {/* Actual Demand */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-0.5 bg-[#0062d2] rounded-full" />
          <span className="text-slate-700 font-medium">Actual Demand</span>
        </div>

        {/* Forecast */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-0.5 border-t-2 border-dashed border-[#0062d2]" />
          <span className="text-slate-700 font-medium">Forecast</span>
        </div>

        {/* Confidence Range */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-3 bg-info-bg border border-border rounded-xs" />
          <span className="text-slate-700 font-medium">Confidence Range</span>
        </div>
      </div>
    </div>
  );
};
