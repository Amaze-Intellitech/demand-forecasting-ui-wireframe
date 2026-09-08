import React, { useState } from 'react';
import { ArrowRight, X, DollarSign } from 'lucide-react';
import { COST_COMPARISON_WATERFALL, CostWaterfallItem } from '../../data/demandSourcingMock';

export const CostComparisonWaterfallChart: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<CostWaterfallItem | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // SVG dimensions
  const width = 520;
  const height = 270;
  const padding = { top: 35, right: 30, bottom: 45, left: 60 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Max value: 12M
  const maxY = 12;
  const getY = (val: number) => padding.top + plotHeight - (val / maxY) * plotHeight;

  // Y-axis ticks: 0, 2, 4, 6, 8, 10, 12 ($M)
  const yTicks = [0, 2, 4, 6, 8, 10, 12];

  const totalBars = COST_COMPARISON_WATERFALL.length;
  const barWidth = 44;
  const gap = (plotWidth - totalBars * barWidth) / (totalBars + 1);

  // Waterfall coordinate calculation
  // Bar 0: Current Plan (0 to 10.5)
  // Bar 1: Price Opt (-0.9) from 10.5 down to 9.6
  // Bar 2: Volume Alloc (-0.6) from 9.6 down to 9.0
  // Bar 3: Contract Terms (+0.2 or bridge to 9.2) - let's set bridge from 9.0 to 9.2 or show floating bar
  // To match $10.5M -> -$0.9M -> -$0.6M -> +$0.2M adjustment / -$0.7M term discount -> $9.2M
  const waterfallLayout = [
    { ...COST_COMPARISON_WATERFALL[0], bottom: 0, top: 10.5, color: '#94a3b8' }, // Slate Gray
    { ...COST_COMPARISON_WATERFALL[1], bottom: 9.6, top: 10.5, color: '#10b981' }, // Emerald / Green
    { ...COST_COMPARISON_WATERFALL[2], bottom: 9.0, top: 9.6, color: '#10b981' }, // Emerald / Green
    { ...COST_COMPARISON_WATERFALL[3], bottom: 8.3, top: 9.0, color: '#10b981' }, // Emerald / Green
    { ...COST_COMPARISON_WATERFALL[4], bottom: 0, top: 9.2, color: '#0062d2' }, // Vibrant AITEK Blue
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none relative">
      {/* Header with Title & Action */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Cost Comparison
          </h3>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            -$1.3M Total Net Savings
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowDetailsModal(true)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0062d2] hover:text-blue-700 transition-colors group cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* SVG Waterfall Chart */}
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
                  ${tick}M
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
            Cost (USD)
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

          {/* Waterfall Connector Dotted Lines */}
          <line
            x1={padding.left + gap + barWidth}
            y1={getY(10.5)}
            x2={padding.left + gap * 2 + barWidth}
            y2={getY(10.5)}
            stroke="#94a3b8"
            strokeDasharray="2 2"
            strokeWidth="1"
          />
          <line
            x1={padding.left + gap * 2 + barWidth * 2}
            y1={getY(9.6)}
            x2={padding.left + gap * 3 + barWidth * 2}
            y2={getY(9.6)}
            stroke="#94a3b8"
            strokeDasharray="2 2"
            strokeWidth="1"
          />
          <line
            x1={padding.left + gap * 3 + barWidth * 3}
            y1={getY(9.0)}
            x2={padding.left + gap * 4 + barWidth * 3}
            y2={getY(9.0)}
            stroke="#94a3b8"
            strokeDasharray="2 2"
            strokeWidth="1"
          />

          {/* Waterfall Bars */}
          {waterfallLayout.map((item, idx) => {
            const x = padding.left + gap + idx * (barWidth + gap);
            const yTop = getY(item.top);
            const yBottom = getY(item.bottom);
            const barH = Math.max(yBottom - yTop, 4);
            const isHovered = hoveredItem?.label === item.label;

            return (
              <g
                key={item.label}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                className="transition-opacity"
              >
                {/* Value displayed above/below bar */}
                <text
                  x={x + barWidth / 2}
                  y={yTop - 6}
                  textAnchor="middle"
                  className={`font-mono text-[10px] font-extrabold ${
                    item.type === 'savings'
                      ? 'fill-emerald-600'
                      : item.type === 'final'
                      ? 'fill-[#0062d2]'
                      : 'fill-slate-800'
                  }`}
                >
                  {item.displayVal}
                </text>

                {/* Rect Bar */}
                <rect
                  x={x}
                  y={yTop}
                  width={barWidth}
                  height={barH}
                  rx="3"
                  fill={item.color}
                  className={`transition-all duration-150 ${
                    isHovered ? 'brightness-90 filter drop-shadow-sm' : ''
                  }`}
                />

                {/* X-axis Label */}
                <text
                  x={x + barWidth / 2}
                  y={padding.top + plotHeight + 14}
                  textAnchor="middle"
                  className="fill-slate-600 font-medium text-[9px]"
                >
                  {item.label.length > 13 ? item.label.split(' ')[0] : item.label}
                </text>
                {item.label.length > 13 && (
                  <text
                    x={x + barWidth / 2}
                    y={padding.top + plotHeight + 25}
                    textAnchor="middle"
                    className="fill-slate-500 font-medium text-[8.5px]"
                  >
                    {item.label.split(' ').slice(1).join(' ')}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredItem && (
          <div className="absolute top-2 right-6 pointer-events-none bg-slate-900/95 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs backdrop-blur-xs flex flex-col gap-1 z-30 min-w-[170px]">
            <div className="flex items-center justify-between border-b border-slate-700 pb-1 font-bold text-sky-400">
              <span>{hoveredItem.label}</span>
              <span>{hoveredItem.displayVal}</span>
            </div>
            <div className="text-[11px] text-slate-300 pt-1">
              {hoveredItem.type === 'initial' && 'Baseline procurement budget for 12 months.'}
              {hoveredItem.type === 'savings' && 'Direct unit price and volume rebate savings.'}
              {hoveredItem.type === 'final' && 'Prescribed optimal procurement expenditure.'}
            </div>
          </div>
        )}
      </div>

      {/* Footnote */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Optimization Engine: <strong>AITEK Mixed-Integer LP</strong></span>
        <span>Target Budget: <strong>$9.5M Max</strong></span>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0062d2]">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Cost Optimization Breakdown</h4>
                  <p className="text-xs text-slate-500">Analysis of savings drivers vs. Current Baseline</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-600">Current Plan Spend</span>
                  <p className="text-xs text-slate-400">Unoptimized historical allocation</p>
                </div>
                <span className="font-mono text-base font-bold text-slate-900">$10,500,000</span>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-900">Price Optimization Levers</span>
                  <p className="text-xs text-emerald-700">Contractual tier renegotiation on Supplier A & B</p>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-700">-$900,000</span>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-900">Volume Allocation Shift</span>
                  <p className="text-xs text-emerald-700">Shifting 16K units from high-cost Supplier D to Supplier A</p>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-700">-$600,000</span>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-900">Payment & Freight Terms</span>
                  <p className="text-xs text-emerald-700">FOB destination rebate and 60-day early settlement</p>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-700">-$700,000</span>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-950">AITEK Prescribed Plan Total</span>
                  <p className="text-xs text-blue-700">Delivering -12.4% Net Savings</p>
                </div>
                <span className="font-mono text-base font-extrabold text-[#0062d2]">$9,200,000</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0062d2] hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
