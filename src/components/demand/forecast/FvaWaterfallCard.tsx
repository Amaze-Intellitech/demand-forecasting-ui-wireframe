import React, { useState } from 'react';
import { FvaStage } from '../../../types/domain/demandForecast';

interface FvaWaterfallCardProps {
  stages: FvaStage[];
  onSelectStage?: (stage: FvaStage) => void;
}

export const FvaWaterfallCard: React.FC<FvaWaterfallCardProps> = ({
  stages,
  onSelectStage,
}) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  // SVG Geometry
  const width = 440;
  const height = 240;
  const padding = { top: 30, right: 20, bottom: 45, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = 13; // Max WAPE scale ~13%
  const yTicks = [0, 3, 6, 9, 12];

  const getY = (val: number) => {
    return padding.top + innerHeight - (val / maxVal) * innerHeight;
  };

  const barWidth = 36;
  const getBarX = (index: number) => {
    const slot = innerWidth / stages.length;
    return padding.left + slot * index + (slot - barWidth) / 2;
  };

  const getBarColor = (item: FvaStage) => {
    switch (item.type) {
      case 'start':
        return '#334155'; // Slate 700
      case 'reduction':
        return '#f87171'; // Red / Coral delta reduction
      case 'end':
        return '#0062d2'; // AITEK Blue
      default:
        return '#64748b';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Forecast Value Added (FVA) Waterfall
        </h3>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          -5.0 pts Net Error Reduction
        </span>
      </div>

      {/* Waterfall Chart */}
      <div className="relative flex-1 mt-2 min-h-[200px] w-full">
        {/* Y Axis Label */}
        <div className="absolute left-1 top-0 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          WAPE (%)
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
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
                  x={padding.left - 6}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="#94a3b8"
                  className="font-mono"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Connectors between consecutive bars */}
          {stages.map((item, i) => {
            if (i === 0) return null;
            const prev = stages[i - 1];
            const prevX = getBarX(i - 1) + barWidth;
            const currentX = getBarX(i);
            const connectY = getY(prev.endVal);

            return (
              <line
                key={`fva-conn-${item.id}`}
                x1={prevX}
                y1={connectY}
                x2={currentX}
                y2={connectY}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Waterfall Bars */}
          {stages.map((item, i) => {
            const x = getBarX(i);
            const topVal = Math.max(item.startVal, item.endVal);
            const bottomVal = Math.min(item.startVal, item.endVal);
            const yTop = getY(topVal);
            const yBottom = getY(bottomVal);
            const barHeight = Math.max(yBottom - yTop, 4);

            const color = getBarColor(item);
            const isHovered = hoveredStage === item.id;

            return (
              <g
                key={item.id}
                onClick={() => onSelectStage?.(item)}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredStage(item.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* Metric Delta on Top */}
                <text
                  x={x + barWidth / 2}
                  y={yTop - 6}
                  textAnchor="middle"
                  fontSize="10"
                  className={`font-mono font-bold select-none ${
                    item.type === 'reduction'
                      ? 'fill-rose-600'
                      : item.type === 'end'
                      ? 'fill-[#0062d2]'
                      : 'fill-slate-800'
                  }`}
                >
                  {item.delta}
                </text>

                {/* Rectangle Bar */}
                <rect
                  x={x}
                  y={yTop}
                  width={barWidth}
                  height={barHeight}
                  rx="3"
                  fill={color}
                  fillOpacity={isHovered ? 0.9 : 1}
                  className="transition-all duration-150"
                />

                {/* X-Axis Label (2 lines) */}
                <text
                  x={x + barWidth / 2}
                  y={padding.top + innerHeight + 15}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="#475569"
                  fontWeight="600"
                  className="select-none"
                >
                  {item.stage.split(' ')[0]}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={padding.top + innerHeight + 27}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#64748b"
                  className="select-none"
                >
                  {item.stage.split(' ').slice(1).join(' ')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
