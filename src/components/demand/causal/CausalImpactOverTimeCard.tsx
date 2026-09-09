import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CausalImpactTimePoint } from '../../../types/domain/causalIntelligence';

interface CausalImpactOverTimeCardProps {
  data: CausalImpactTimePoint[];
  selectedDriver: string;
  onDriverChange: (driver: string) => void;
  availableDrivers: string[];
}

export const CausalImpactOverTimeCard: React.FC<CausalImpactOverTimeCardProps> = ({
  data,
  selectedDriver,
  onDriverChange,
  availableDrivers,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Chart Geometry
  const width = 450;
  const height = 240;
  const padding = { top: 30, right: 25, bottom: 40, left: 45 };

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

  // Paths
  const actualPoints = data.map((d, i) => `${getX(i)},${getY(d.actual)}`);
  const actualPath = `M ${actualPoints.join(' L ')}`;

  const withDriverPoints = data.map((d, i) => `${getX(i)},${getY(d.predictedWithDriver)}`);
  const withDriverPath = `M ${withDriverPoints.join(' L ')}`;

  const withoutDriverPoints = data.map((d, i) => `${getX(i)},${getY(d.predictedWithoutDriver)}`);
  const withoutDriverPath = `M ${withoutDriverPoints.join(' L ')}`;

  // Shaded highlight box in Q3/Q4 (Aug to Dec: index 7 to 11)
  const highlightX1 = getX(7);
  const highlightX2 = getX(11) + 15;
  const highlightWidth = highlightX2 - highlightX1;

  // Active hover point
  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : null;
  const activeX = hoveredIndex !== null ? getX(hoveredIndex) : null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header & Controls */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Causal Impact Over Time
        </h3>

        {/* Driver Selector Dropdown */}
        <div className="relative">
          <select
            value={selectedDriver}
            onChange={(e) => onDriverChange(e.target.value)}
            className="h-7 pl-2.5 pr-6 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
          >
            {availableDrivers.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0062d2]" />
          <span className="text-[11px] font-medium text-slate-700">Actual Demand</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-[#10b981] inline-block" />
          <span className="text-[11px] font-medium text-slate-700">Predicted (with driver)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-[#7dd3fc] inline-block" />
          <span className="text-[11px] font-medium text-slate-500">Predicted (without driver)</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative flex-1 mt-2 min-h-[190px] w-full min-w-0">
        <div className="absolute left-1 top-0 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Demand (K units)
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Horizontal Gridlines */}
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
                  fontSize="9.5"
                  fill="#94a3b8"
                  className="font-mono"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Shaded Callout Box in Q3/Q4 */}
          <rect
            x={highlightX1}
            y={padding.top}
            width={highlightWidth}
            height={innerHeight}
            fill="rgba(240, 249, 255, 0.65)"
            stroke="#bae6fd"
            strokeWidth="1"
            strokeDasharray="3 3"
            rx="4"
          />
          <text
            x={highlightX1 + 8}
            y={padding.top + 14}
            fontSize="9"
            fill="#0369a1"
            fontWeight="600"
          >
            Driver impact increases
          </text>
          <text
            x={highlightX1 + 8}
            y={padding.top + 25}
            fontSize="9"
            fill="#0369a1"
            fontWeight="600"
          >
            in Q3
          </text>

          {/* Predicted Without Driver (Dashed light blue) */}
          <path
            d={withoutDriverPath}
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Predicted With Driver (Dashed Green) */}
          <path
            d={withDriverPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Actual Demand Line (Solid Blue) */}
          <path
            d={actualPath}
            fill="none"
            stroke="#0062d2"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Actual Markers */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.actual);
            return (
              <circle
                key={`act-${d.period}`}
                cx={cx}
                cy={cy}
                r="3"
                fill="#ffffff"
                stroke="#0062d2"
                strokeWidth="2"
              />
            );
          })}

          {/* X Axis Labels */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = padding.top + innerHeight + 16;
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
                  fontSize="9.5"
                  fill="#64748b"
                  fontWeight="500"
                >
                  {d.period}
                </text>
              </g>
            );
          })}

          {/* Hover Hitboxes */}
          {data.map((_, i) => {
            const x = getX(i);
            const colWidth = innerWidth / (data.length - 1);
            return (
              <rect
                key={`hit-${i}`}
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

          {/* Crosshair */}
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
            className="absolute z-30 pointer-events-none bg-slate-900/95 backdrop-blur-sm text-white rounded-lg shadow-xl px-3 py-2 text-xs border border-slate-700/80"
            style={{
              left: `${Math.min(Math.max(activeX - 60, 30), width - 170)}px`,
              top: '10px',
            }}
          >
            <div className="font-bold text-[11px] text-slate-300 pb-1 border-b border-slate-700 mb-1">
              Month of {activePoint.period} 2025
            </div>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Actual Demand:</span>
                <span className="font-bold text-sky-400 font-mono">{activePoint.actual}K</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[10px]">
                <span className="text-emerald-400">With {selectedDriver}:</span>
                <span className="font-bold text-emerald-400 font-mono">{activePoint.predictedWithDriver}K</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[10px]">
                <span className="text-slate-400">Without driver:</span>
                <span className="font-mono text-slate-300">{activePoint.predictedWithoutDriver}K</span>
              </div>
              <div className="pt-0.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-emerald-300 font-semibold">
                <span>Causal Lift:</span>
                <span>+{activePoint.predictedWithDriver - activePoint.predictedWithoutDriver}K units</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
