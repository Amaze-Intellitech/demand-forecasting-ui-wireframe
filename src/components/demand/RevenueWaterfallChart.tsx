import React, { useState } from 'react';

export interface RevenueWaterfallChartProps {
  waterfall: {
    baseRevenue: number;
    demandChange: number;
    costChange: number;
    priceChange: number;
    scenarioRevenue: number;
  };
}

export const RevenueWaterfallChart: React.FC<RevenueWaterfallChartProps> = ({
  waterfall,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG canvas
  const width = 450;
  const height = 250;
  const padding = { top: 35, right: 20, bottom: 45, left: 52 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Max value: 22M for headroom
  const maxY = 22;
  const getY = (val: number) => padding.top + plotHeight - (val / maxY) * plotHeight;

  // Y-axis ticks: 0, 5M, 10M, 15M, 20M
  const yTicks = [0, 5, 10, 15, 20];

  // Waterfall steps
  // 1: Base
  const baseVal = waterfall.baseRevenue;
  // 2: Demand
  const demandBottom = baseVal;
  const demandTop = baseVal + waterfall.demandChange;
  // 3: Cost
  const costTop = demandTop;
  const costBottom = demandTop + waterfall.costChange; // costChange is negative
  // 4: Price
  const priceBottom = costBottom;
  const priceTop = costBottom + waterfall.priceChange;
  // 5: Final Scenario
  const finalVal = waterfall.scenarioRevenue;

  const bars = [
    {
      label: 'Base Revenue',
      displayVal: `$${baseVal.toFixed(1)}M`,
      yStart: 0,
      yEnd: baseVal,
      color: '#0062d2',
      type: 'base',
    },
    {
      label: 'Demand Change',
      displayVal: `${waterfall.demandChange >= 0 ? '+' : ''}$${waterfall.demandChange.toFixed(1)}M`,
      yStart: Math.min(demandBottom, demandTop),
      yEnd: Math.max(demandBottom, demandTop),
      color: waterfall.demandChange >= 0 ? '#10b981' : '#f43f5e',
      type: 'delta',
    },
    {
      label: 'Cost Change',
      displayVal: `${waterfall.costChange >= 0 ? '+' : ''}$${waterfall.costChange.toFixed(1)}M`,
      yStart: Math.min(costBottom, costTop),
      yEnd: Math.max(costBottom, costTop),
      color: waterfall.costChange < 0 ? '#f43f5e' : '#10b981',
      type: 'delta',
    },
    {
      label: 'Price Change',
      displayVal: `${waterfall.priceChange >= 0 ? '+' : ''}$${waterfall.priceChange.toFixed(1)}M`,
      yStart: Math.min(priceBottom, priceTop),
      yEnd: Math.max(priceBottom, priceTop),
      color: waterfall.priceChange >= 0 ? '#10b981' : '#f43f5e',
      type: 'delta',
    },
    {
      label: 'Scenario Revenue',
      displayVal: `$${finalVal.toFixed(1)}M`,
      yStart: 0,
      yEnd: finalVal,
      color: '#0062d2',
      type: 'final',
    },
  ];

  const totalBars = bars.length;
  const barWidth = 38;
  const gap = (plotWidth - totalBars * barWidth) / (totalBars + 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Revenue Impact (Waterfall)
        </h3>
        <span className="text-[11px] font-medium text-slate-400">P&L Variance</span>
      </div>

      {/* SVG Waterfall */}
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
                  {tick === 0 ? '0' : `${tick}M`}
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
            Amount (USD)
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

          {/* Waterfall Bars */}
          {bars.map((bar, idx) => {
            const x = padding.left + gap + idx * (barWidth + gap);
            const yTop = getY(bar.yEnd);
            const yBottom = getY(bar.yStart);
            const barH = Math.max(3, Math.abs(yBottom - yTop));
            const yRect = Math.min(yTop, yBottom);
            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={bar.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Value Label Above Bar */}
                <text
                  x={x + barWidth / 2}
                  y={yRect - 6}
                  textAnchor="middle"
                  className="font-mono text-[10px] font-bold fill-slate-900"
                >
                  {bar.displayVal}
                </text>

                {/* Bar Rect */}
                <rect
                  x={x}
                  y={yRect}
                  width={barWidth}
                  height={barH}
                  rx="3"
                  fill={bar.color}
                  className={`transition-all duration-200 ${
                    isHovered ? 'opacity-90 ring-2 ring-blue-300' : ''
                  }`}
                />

                {/* X-axis Two-line Labels */}
                <text
                  x={x + barWidth / 2}
                  y={padding.top + plotHeight + 14}
                  textAnchor="middle"
                  className="fill-slate-600 font-medium text-[9.5px]"
                >
                  {bar.label.split(' ')[0]}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={padding.top + plotHeight + 25}
                  textAnchor="middle"
                  className="fill-slate-400 font-medium text-[8.5px]"
                >
                  {bar.label.split(' ')[1]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredIdx !== null && (
          <div className="absolute top-2 right-4 pointer-events-none bg-slate-900/90 text-white px-2.5 py-1.5 rounded-md shadow-lg border border-slate-700 text-xs backdrop-blur-xs flex items-center gap-2 z-20">
            <span className="font-bold text-sky-400">{bars[hoveredIdx].label}</span>
            <span className="text-slate-400">|</span>
            <span className="font-mono text-white">{bars[hoveredIdx].displayVal}</span>
          </div>
        )}
      </div>

      {/* Bottom Subtext */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Net Revenue Lift: <strong>${(waterfall.scenarioRevenue - waterfall.baseRevenue).toFixed(1)}M</strong></span>
        <span>EBITDA Protected</span>
      </div>
    </div>
  );
};
