import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ShortTermAdjustmentPoint } from '../../../types/domain/demandSensing';

interface AdjustmentWaterfallProps {
  data: ShortTermAdjustmentPoint[];
}

export const AdjustmentWaterfall: React.FC<AdjustmentWaterfallProps> = ({ data }) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // SVG Geometry
  const width = 480;
  const height = 240;
  const padding = { top: 35, right: 20, bottom: 45, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = 220; // Scale up to 220K
  const yTicks = [0, 50, 100, 150, 200];

  const getY = (val: number) => {
    return padding.top + innerHeight - (val / maxVal) * innerHeight;
  };

  const barWidth = 38;
  const getBarX = (index: number) => {
    const slot = innerWidth / data.length;
    return padding.left + slot * index + (slot - barWidth) / 2;
  };

  const getBarColor = (item: ShortTermAdjustmentPoint) => {
    switch (item.type) {
      case 'start':
      case 'end':
        return '#0062d2'; // Blue
      case 'increase':
        return '#10b981'; // Emerald Green
      case 'decrease':
        return '#ef4444'; // Red
      default:
        return '#64748b';
    }
  };

  const getTextTopColor = (item: ShortTermAdjustmentPoint) => {
    switch (item.type) {
      case 'increase':
        return 'fill-emerald-600 font-bold';
      case 'decrease':
        return 'fill-rose-600 font-bold';
      default:
        return 'fill-slate-900 font-bold';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Short-Term Demand Adjustment
        </h3>
        <div className="relative">
          <select
            defaultValue="Next 8 Weeks"
            className="h-7 pl-2.5 pr-6 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 appearance-none focus:outline-none cursor-pointer"
          >
            <option value="Next 4 Weeks">Next 4 Weeks</option>
            <option value="Next 8 Weeks">Next 8 Weeks</option>
            <option value="Next 12 Weeks">Next 12 Weeks</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Waterfall SVG Chart */}
      <div className="relative flex-1 mt-2 min-h-[200px] w-full">
        {/* Y Axis Label */}
        <div className="absolute left-1 top-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Volume (K units)
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
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Connector Dashed Lines between bars */}
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

          {/* Waterfall Bars */}
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
                {/* Metric Value Label on Top */}
                <text
                  x={x + barWidth / 2}
                  y={yTop - 6}
                  textAnchor="middle"
                  fontSize="10.5"
                  className={`${getTextTopColor(item)} select-none`}
                >
                  {item.value}
                </text>

                {/* The Bar Rectangle */}
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

                {/* X Axis Label below Bar (2 lines) */}
                <text
                  x={x + barWidth / 2}
                  y={padding.top + innerHeight + 15}
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
                  y={padding.top + innerHeight + 27}
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
