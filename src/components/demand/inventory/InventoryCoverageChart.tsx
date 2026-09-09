import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { InventoryCoveragePoint } from '../../../types/domain/inventoryIntelligence';

interface InventoryCoverageChartProps {
  data: InventoryCoveragePoint[];
  horizon: string;
  onHorizonChange: (val: string) => void;
}

export const InventoryCoverageChart: React.FC<InventoryCoverageChartProps> = ({
  data,
  horizon,
  onHorizonChange,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 360;
  const height = 220;
  const padding = { top: 25, right: 15, bottom: 35, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Max scale is 120 days
  const maxY = 120;
  const minY = 0;

  const yTicks = [0, 20, 50, 95, 100, 120];

  const getY = (val: number) => {
    return padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
  };

  const groupWidth = chartWidth / data.length;
  const barWidth = 10;
  const barGap = 3;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full relative">
      {/* Header & Horizon Selector */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Projected Inventory Coverage
          </h3>
          <p className="text-xs text-slate-500">
            Forward days of supply under demand scenarios
          </p>
        </div>

        <div className="relative">
          <select
            value={horizon}
            onChange={(e) => onHorizonChange(e.target.value)}
            aria-label="Select planning horizon"
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
          >
            <option value="Next 3 Months">Next 3 Months</option>
            <option value="Next 6 Months">Next 6 Months</option>
            <option value="Next 12 Months">Next 12 Months</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-slate-600 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
          <span className="font-semibold text-slate-800">Base Case</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa] inline-block" />
          <span>High Demand Scenario</span>
        </div>
      </div>

      {/* SVG Grouped Bar Chart */}
      <div className="relative w-full h-[190px]">
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
            Days of Supply
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
                  x={padding.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-slate-400 font-mono"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Grouped Bars */}
          {data.map((d, i) => {
            const groupX = padding.left + i * groupWidth + groupWidth / 2;
            const xBase = groupX - barWidth - barGap / 2;
            const xHigh = groupX + barGap / 2;

            const yBase = getY(d.baseCase);
            const yHigh = getY(d.highDemandScenario);
            const heightBase = padding.top + chartHeight - yBase;
            const heightHigh = padding.top + chartHeight - yHigh;

            const isHovered = hoverIndex === i;

            return (
              <g
                key={d.month}
                className="cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* Base Case Bar */}
                <rect
                  x={xBase}
                  y={yBase}
                  width={barWidth}
                  height={heightBase}
                  fill="#2563eb"
                  rx="2"
                  className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-90'}`}
                />

                {/* High Demand Bar */}
                <rect
                  x={xHigh}
                  y={yHigh}
                  width={barWidth}
                  height={heightHigh}
                  fill="#60a5fa"
                  rx="2"
                  className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-90'}`}
                />

                {/* Month Label */}
                <text
                  x={groupX}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  className={`text-[10px] ${
                    isHovered ? 'fill-slate-900 font-bold' : 'fill-slate-500 font-medium'
                  }`}
                >
                  {d.month}
                </text>

                {/* Hover Hitbox */}
                <rect
                  x={groupX - groupWidth / 2}
                  y={padding.top}
                  width={groupWidth}
                  height={chartHeight}
                  fill="transparent"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoverIndex !== null && data[hoverIndex] && (
          <div
            className="absolute z-20 bg-slate-900/95 backdrop-blur-xs text-white text-xs rounded-lg shadow-xl px-3 py-2 pointer-events-none border border-slate-800"
            style={{
              left: `${
                ((padding.left + hoverIndex * groupWidth + groupWidth / 2) / width) * 100
              }%`,
              top: '25%',
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="font-bold text-slate-200 border-b border-slate-700/60 pb-1 mb-1">
              {data[hoverIndex].month} Coverage
            </div>
            <div className="space-y-0.5 text-[11px] font-mono">
              <div className="flex justify-between gap-3 text-blue-300">
                <span>Base Case:</span>
                <span className="font-bold">{data[hoverIndex].baseCase} days</span>
              </div>
              <div className="flex justify-between gap-3 text-sky-300">
                <span>High Demand:</span>
                <span className="font-bold">{data[hoverIndex].highDemandScenario} days</span>
              </div>
              <div className="flex justify-between gap-3 text-emerald-400 pt-0.5 border-t border-slate-800 font-sans text-[10px]">
                <span>Variance:</span>
                <span>+{data[hoverIndex].variance} days</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
