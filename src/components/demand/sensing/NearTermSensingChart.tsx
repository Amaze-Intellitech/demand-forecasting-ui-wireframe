import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SensedForecastPoint } from '../../../types/domain/demandSensing';

interface NearTermSensingChartProps {
  data: SensedForecastPoint[];
  selectedHorizon: string;
  onHorizonChange: (horizon: string) => void;
}

export const NearTermSensingChart: React.FC<NearTermSensingChartProps> = ({
  data,
  selectedHorizon,
  onHorizonChange,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Chart Geometry
  const width = 760;
  const height = 280;
  const padding = { top: 35, right: 30, bottom: 45, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxY = 250;
  const yTicks = [0, 50, 100, 150, 200, 250];

  const getX = (index: number) => {
    if (data.length <= 1) return padding.left;
    return padding.left + (index / (data.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(0, Math.min(maxY, val));
    return padding.top + innerHeight - (clamped / maxY) * innerHeight;
  };

  // Build SVG Paths
  const sensedPoints = data.map((d, i) => `${getX(i)},${getY(d.sensed)}`);
  const sensedLinePath = `M ${sensedPoints.join(' L ')}`;

  const baselinePoints = data.map((d, i) => `${getX(i)},${getY(d.baseline)}`);
  const baselineLinePath = `M ${baselinePoints.join(' L ')}`;

  // Confidence Interval Area
  const upperPoints = data.map((d, i) => `${getX(i)},${getY(d.upperBound)}`);
  const lowerPointsRev = [...data].reverse().map((d, i) => {
    const origIndex = data.length - 1 - i;
    return `${getX(origIndex)},${getY(d.lowerBound)}`;
  });
  const confidenceAreaPath = `M ${upperPoints.join(' L ')} L ${lowerPointsRev.join(' L ')} Z`;

  // Active hover point
  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : null;
  const activeX = hoveredIndex !== null ? getX(hoveredIndex) : null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Sensed Demand vs. Baseline Forecast
          </h3>
        </div>

        {/* Horizon Dropdown */}
        <div className="relative">
          <select
            value={selectedHorizon}
            onChange={(e) => onHorizonChange(e.target.value)}
            className="h-7 pl-2.5 pr-6 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="Last 4 Weeks">Last 4 Weeks</option>
            <option value="Last 8 Weeks">Last 8 Weeks</option>
            <option value="Last 12 Weeks">Last 12 Weeks</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#0062d2] rounded-full inline-block" />
          <span className="w-2 h-2 rounded-full bg-[#0062d2] -ml-2 mr-0.5 inline-block" />
          <span className="font-medium text-slate-700">Sensed Demand</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-[#10b981] inline-block" />
          <span className="w-2 h-2 rounded-full bg-[#10b981] -ml-2 mr-0.5 inline-block" />
          <span className="font-medium text-slate-700">Baseline Forecast</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2.5 bg-info-bg rounded-xs border border-border inline-block" />
          <span className="text-slate-500">Confidence Range</span>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative flex-1 mt-2 min-h-[220px] w-full">
        {/* Y-Axis Label */}
        <div className="absolute left-1 top-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
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

          {/* Confidence Interval Ribbon */}
          <path d={confidenceAreaPath} fill="rgba(186, 230, 253, 0.45)" />

          {/* Baseline Forecast Line (Dashed Green) */}
          <path
            d={baselineLinePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sensed Demand Line (Solid Blue) */}
          <path
            d={sensedLinePath}
            fill="none"
            stroke="#0062d2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Markers */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cySensed = getY(d.sensed);
            const cyBaseline = getY(d.baseline);

            return (
              <g key={d.period}>
                <circle
                  cx={cx}
                  cy={cyBaseline}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <circle
                  cx={cx}
                  cy={cySensed}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#0062d2"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* X Axis Ticks */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = padding.top + innerHeight + 16;
            return (
              <g key={`xtick-${d.period}`}>
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
                  fill="#64748b"
                  className="font-medium"
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

          {/* Active Hover Crosshair Line */}
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
              left: `${Math.min(Math.max(activeX - 60, 40), width - 160)}px`,
              top: '15px',
            }}
          >
            <div className="font-bold text-[11px] text-slate-300 pb-1 border-b border-slate-700 mb-1">
              Week of {activePoint.period}
            </div>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Sensed Demand:</span>
                <span className="font-bold text-primary font-mono">{activePoint.sensed}K</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Baseline Forecast:</span>
                <span className="font-bold text-emerald-400 font-mono">{activePoint.baseline}K</span>
              </div>
              <div className="flex items-center justify-between gap-3 pt-0.5 border-t border-slate-800 text-[10px]">
                <span className="text-slate-400">Delta Uplift:</span>
                <span className="font-semibold text-emerald-400 font-mono">
                  +{Math.round(((activePoint.sensed - activePoint.baseline) / activePoint.baseline) * 100)}%
                </span>
              </div>
              <div className="text-[9.5px] text-slate-500 pt-0.5">
                Confidence: {activePoint.confidencePct}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
