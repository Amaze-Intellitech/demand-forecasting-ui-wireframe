import React, { useState } from 'react';
import { TradeoffScenarioPoint } from '../../../types/domain/supplyCapacityOptimization';

interface CostServiceTradeoffProps {
  scenarios: TradeoffScenarioPoint[];
  onSelectScenario?: (scenario: TradeoffScenarioPoint) => void;
}

export const CostServiceTradeoff: React.FC<CostServiceTradeoffProps> = ({
  scenarios,
  onSelectScenario,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<TradeoffScenarioPoint | null>(null);

  // SVG Chart Dimensions
  const width = 340;
  const height = 200;
  const paddingLeft = 36;
  const paddingRight = 45;
  const paddingTop = 20;
  const paddingBottom = 26;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const minX = 1.5;
  const maxX = 2.7;
  const xTicks = [1.5, 1.8, 2.1, 2.4, 2.7];

  const minY = 80;
  const maxY = 100;
  const yTicks = [80, 85, 90, 95, 100];

  const getX = (val: number) => {
    return paddingLeft + ((val - minX) / (maxX - minX)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">
          Cost vs. Service Trade-off
        </h2>
        <span className="text-[10px] text-slate-400 font-medium">
          Pareto Efficient Frontier
        </span>
      </div>

      {/* SVG Scatter Chart */}
      <div className="relative w-full overflow-hidden my-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Y Axis Grid & Labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight + 20}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="0.8"
                  strokeDasharray={tick === 80 ? 'none' : '2 2'}
                />
                <text
                  x={paddingLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fontWeight="500"
                  fill="#94A3B8"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {xTicks.map((tick) => {
            const x = getX(tick);
            return (
              <g key={tick}>
                <line
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={paddingTop + chartHeight}
                  stroke="#F1F5F9"
                  strokeWidth="0.8"
                />
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="500"
                  fill="#94A3B8"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Axis Titles */}
          <text
            x={10}
            y={paddingTop + chartHeight / 2}
            fontSize="9"
            fontWeight="500"
            fill="#64748B"
            transform={`rotate(-90 10, ${paddingTop + chartHeight / 2})`}
            textAnchor="middle"
          >
            Service Level (%)
          </text>

          <text
            x={paddingLeft + chartWidth / 2}
            y={height}
            fontSize="9"
            fontWeight="500"
            fill="#64748B"
            textAnchor="middle"
          >
            Supply Cost ($B)
          </text>

          {/* Pareto Frontier Smooth Guide Line */}
          <path
            d={`M ${getX(1.72)} ${getY(85)} Q ${getX(1.95)} ${getY(97)} ${getX(2.42)} ${getY(99.5)}`}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.6"
          />

          {/* Points & Labels */}
          {scenarios.map((pt) => {
            const cx = getX(pt.supplyCostBillion);
            const cy = getY(pt.serviceLevelPercent);
            const isHovered = hoveredPoint?.id === pt.id;

            // Offset label dynamically so it doesn't collide
            const labelXOffset = pt.name === 'Optimized Plan' ? -4 : pt.name === 'Low Cost' ? 10 : 8;
            const labelYOffset = pt.name === 'Optimized Plan' ? -10 : pt.name === 'High Service' ? -6 : 3;
            const textAnchor = pt.name === 'Optimized Plan' ? 'end' : 'start';

            return (
              <g
                key={pt.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => onSelectScenario && onSelectScenario(pt)}
              >
                {/* Glow ring on hover */}
                {isHovered && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={9}
                    fill={pt.color}
                    opacity="0.25"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 5.5 : 4.5}
                  fill={pt.color}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className="transition-transform duration-200"
                />

                {/* Label on chart */}
                <text
                  x={cx + labelXOffset}
                  y={cy + labelYOffset}
                  textAnchor={textAnchor}
                  fontSize="8.5"
                  fontWeight={pt.name === 'Optimized Plan' ? '700' : '600'}
                  fill={pt.name === 'Optimized Plan' ? '#047857' : '#334155'}
                >
                  {pt.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div className="absolute z-20 top-1 right-2 pointer-events-none bg-slate-900/95 text-white p-2 rounded-lg shadow-lg border border-slate-700/50 text-[10px] leading-tight max-w-[190px]">
            <div className="font-bold text-slate-100 flex items-center gap-1.5 mb-1">
              <span
                className="w-2 h-2 rounded-full inline-block shrink-0"
                style={{ backgroundColor: hoveredPoint.color }}
              />
              <span>{hoveredPoint.name}</span>
            </div>
            <div className="flex justify-between text-slate-300 mb-0.5">
              <span>Cost:</span>
              <span className="font-semibold text-white">${hoveredPoint.supplyCostBillion}B</span>
            </div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Service:</span>
              <span className="font-semibold text-emerald-400">{hoveredPoint.serviceLevelPercent}%</span>
            </div>
            <p className="text-[9px] text-slate-400 italic">
              {hoveredPoint.tradeoffHighlight}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
