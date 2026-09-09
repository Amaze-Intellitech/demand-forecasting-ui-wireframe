import React, { useState } from 'react';
import { WorkingCapitalWaterfallPoint } from '../../../types/domain/executiveCommandCenter';

interface WorkingCapitalWaterfallProps {
  data: WorkingCapitalWaterfallPoint[];
}

export const WorkingCapitalWaterfall: React.FC<WorkingCapitalWaterfallProps> = ({ data }) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // SVG dimensions
  const width = 420;
  const height = 240;
  const padding = { top: 35, right: 20, bottom: 45, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = 140; // Max scale $140M
  const yTicks = [0, 35, 70, 105, 140];

  const getY = (val: number) => {
    return padding.top + innerHeight - (val / maxVal) * innerHeight;
  };

  const barWidth = 44;
  const getBarX = (index: number) => {
    const slot = innerWidth / data.length;
    return padding.left + slot * index + (slot - barWidth) / 2;
  };

  const getBarColor = (item: WorkingCapitalWaterfallPoint) => {
    switch (item.type) {
      case 'start':
        return '#3b82f6'; // Blue
      case 'reduction':
        return '#ef4444'; // Red/Coral
      case 'opportunity':
        return '#10b981'; // Emerald Green
      case 'target':
        return '#0284c7'; // Cyan/Blue
      default:
        return '#64748b';
    }
  };

  const getTextTopColor = (item: WorkingCapitalWaterfallPoint) => {
    switch (item.type) {
      case 'reduction':
        return 'fill-rose-600 font-bold';
      case 'opportunity':
        return 'fill-emerald-600 font-bold';
      default:
        return 'fill-slate-900 font-bold';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Working Capital Risk Waterfall
        </h3>
        <span className="text-[11px] font-medium text-slate-400">
          Cash Liberation
        </span>
      </div>

      {/* Waterfall SVG */}
      <div className="relative flex-1 mt-2 min-h-[200px] w-full">
        {/* Y Axis Label */}
        <div className="absolute left-1 top-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Volume ($M)
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
                  {tick > 0 ? `$${tick}` : '0'}
                </text>
              </g>
            );
          })}

          {/* Connectors between waterfall stages */}
          {data.map((item, i) => {
            if (i === 0) return null;
            const prev = data[i - 1];
            const prevX = getBarX(i - 1) + barWidth;
            const currentX = getBarX(i);
            const connectY = getY(prev.endVal);

            return (
              <line
                key={`conn-${item.id}`}
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

          {/* Bars */}
          {data.map((item, i) => {
            const x = getBarX(i);
            const topVal = Math.max(item.startVal, item.endVal);
            const bottomVal = Math.min(item.startVal, item.endVal);
            const yTop = getY(topVal);
            const yBottom = getY(bottomVal);
            const barHeight = Math.max(yBottom - yTop, 4);

            const color = getBarColor(item);
            const isHovered = hoveredBar === item.id;

            return (
              <g
                key={item.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredBar(item.id)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Metric Value Label on Top of Bar */}
                <text
                  x={x + barWidth / 2}
                  y={yTop - 6}
                  textAnchor="middle"
                  fontSize="11"
                  className={`${getTextTopColor(item)} select-none`}
                >
                  {item.value}
                </text>

                {/* The Bar Rect */}
                <rect
                  x={x}
                  y={yTop}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill={color}
                  fillOpacity={isHovered ? 0.9 : 1}
                  className="transition-all duration-150"
                />

                {/* X Axis Label below Bar */}
                <text
                  x={x + barWidth / 2}
                  y={padding.top + innerHeight + 16}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="#475569"
                  fontWeight="600"
                  className="select-none"
                >
                  {item.label.split(' ')[0]}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={padding.top + innerHeight + 28}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#64748b"
                  className="select-none"
                >
                  {item.label.split(' ').slice(1).join(' ')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
