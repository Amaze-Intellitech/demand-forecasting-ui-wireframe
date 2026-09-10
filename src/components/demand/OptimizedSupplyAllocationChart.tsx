import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  ALLOCATION_BY_QUARTER,
  QuarterAllocation,
  SUPPLIER_PALETTE,
} from '../../data/demandSourcingMock';

export const OptimizedSupplyAllocationChart: React.FC = () => {
  const [viewBy, setViewBy] = useState<'By Supplier' | 'By Quarter'>('By Supplier');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredQuarter, setHoveredQuarter] = useState<QuarterAllocation | null>(null);

  // SVG coordinate dimensions
  const width = 560;
  const height = 270;
  const padding = { top: 35, right: 110, bottom: 40, left: 55 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Max value: 140K
  const maxY = 140;
  const getY = (val: number) => padding.top + plotHeight - (val / maxY) * plotHeight;

  // Y-axis ticks: 0, 20K, 40K, 60K, 80K, 100K, 120K, 140K
  const yTicks = [0, 20, 40, 60, 80, 100, 120, 140];

  const totalBars = ALLOCATION_BY_QUARTER.length;
  const barWidth = 48;
  const gap = (plotWidth - totalBars * barWidth) / (totalBars + 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none relative">
      {/* Header & Dropdown */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 relative">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Optimized Supply Allocation
        </h3>

        {/* View By Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>{viewBy}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              {(['By Supplier', 'By Quarter'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setViewBy(mode);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    viewBy === mode
                      ? 'bg-blue-50 text-[#0062d2] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{mode}</span>
                  {viewBy === mode && <Check className="w-3.5 h-3.5 text-[#0062d2]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Stacked Bar Chart */}
      <div className="relative w-full overflow-hidden pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-pointer"
        >
          {/* Horizontal Grid lines */}
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
                  className="fill-slate-500 font-mono text-[9.5px]"
                >
                  {tick === 0 ? '0' : `${tick}K`}
                </text>
              </g>
            );
          })}

          {/* Left Y-axis Label */}
          <text
            x={-(padding.top + plotHeight / 2)}
            y={14}
            transform="rotate(-90)"
            textAnchor="middle"
            className="fill-slate-500 font-semibold text-[10px] tracking-wide"
          >
            Volume (Units)
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

          {/* Stacked Bars for each Quarter */}
          {ALLOCATION_BY_QUARTER.map((q, idx) => {
            const x = padding.left + gap + idx * (barWidth + gap);
            const isHovered = hoveredQuarter?.quarter === q.quarter;

            // Stack heights calculation from bottom to top
            // 1. Supplier A (bottom)
            const hA = (q.supplierA / maxY) * plotHeight;
            const yA = padding.top + plotHeight - hA;

            // 2. Supplier B
            const hB = (q.supplierB / maxY) * plotHeight;
            const yB = yA - hB;

            // 3. Supplier C
            const hC = (q.supplierC / maxY) * plotHeight;
            const yC = yB - hC;

            // 4. Supplier D (top)
            const hD = (q.supplierD / maxY) * plotHeight;
            const yD = yC - hD;

            return (
              <g
                key={q.quarter}
                onMouseEnter={() => setHoveredQuarter(q)}
                onMouseLeave={() => setHoveredQuarter(null)}
                className="transition-transform duration-100"
              >
                {/* Total Volume Label Above Bar */}
                <text
                  x={x + barWidth / 2}
                  y={yD - 6}
                  textAnchor="middle"
                  className="font-mono text-[10.5px] font-extrabold fill-slate-900"
                >
                  {q.totalLabel}
                </text>

                {/* Segment D (Top - Light Gray) */}
                <rect
                  x={x}
                  y={yD}
                  width={barWidth}
                  height={hD}
                  rx="3"
                  fill={SUPPLIER_PALETTE.supplierD.color}
                  className={`transition-opacity ${isHovered ? 'opacity-90 ring-1 ring-slate-300' : ''}`}
                />

                {/* Segment C (Mint Green) */}
                <rect
                  x={x}
                  y={yC}
                  width={barWidth}
                  height={hC}
                  fill={SUPPLIER_PALETTE.supplierC.color}
                  className={`transition-opacity ${isHovered ? 'opacity-90' : ''}`}
                />

                {/* Segment B (Sky Blue) */}
                <rect
                  x={x}
                  y={yB}
                  width={barWidth}
                  height={hB}
                  fill={SUPPLIER_PALETTE.supplierB.color}
                  className={`transition-opacity ${isHovered ? 'opacity-90' : ''}`}
                />

                {/* Segment A (Bottom - Deep Blue) */}
                <rect
                  x={x}
                  y={yA}
                  width={barWidth}
                  height={hA}
                  fill={SUPPLIER_PALETTE.supplierA.color}
                  className={`transition-opacity ${isHovered ? 'opacity-90' : ''}`}
                />

                {/* Quarter Label */}
                <text
                  x={x + barWidth / 2}
                  y={padding.top + plotHeight + 16}
                  textAnchor="middle"
                  className="fill-slate-600 font-mono text-[10px] font-medium"
                >
                  {q.quarter}
                </text>
              </g>
            );
          })}

          {/* Right Side Legend */}
          <g transform={`translate(${width - padding.right + 16}, ${padding.top + 15})`}>
            {Object.entries(SUPPLIER_PALETTE).map(([key, item], idx) => (
              <g key={key} transform={`translate(0, ${idx * 22})`}>
                <rect
                  x={0}
                  y={-9}
                  width={10}
                  height={10}
                  rx={2}
                  fill={item.color}
                />
                <text
                  x={16}
                  y={0}
                  className="fill-slate-700 font-medium text-[10px]"
                >
                  {item.name}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Hover Tooltip */}
        {hoveredQuarter && (
          <div className="absolute top-2 left-1/3 pointer-events-none bg-slate-900/95 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs backdrop-blur-xs flex flex-col gap-1 z-30 min-w-[170px]">
            <div className="flex items-center justify-between border-b border-slate-700 pb-1 font-bold text-blue-400">
              <span>{hoveredQuarter.quarter} Allocation</span>
              <span>{hoveredQuarter.totalLabel}</span>
            </div>
            <div className="space-y-0.5 text-[11px] font-mono pt-1">
              <div className="flex justify-between">
                <span className="text-slate-300">Supplier A:</span>
                <strong className="text-primary">{hoveredQuarter.supplierA}K units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Supplier B:</span>
                <strong className="text-primary">{hoveredQuarter.supplierB}K units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Supplier C:</span>
                <strong className="text-emerald-300">{hoveredQuarter.supplierC}K units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Supplier D:</span>
                <strong className="text-slate-300">{hoveredQuarter.supplierD}K units</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footnote */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Allocation Baseline: <strong>Diversified Primary & Secondary</strong></span>
        <span>Lead Time Target: &le; 10 Days</span>
      </div>
    </div>
  );
};
