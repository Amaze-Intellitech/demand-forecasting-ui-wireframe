import React, { useState } from 'react';
import { DemandSupplyPoint } from '../../../types/domain/executiveCommandCenter';

interface DemandSupplyOutlookProps {
  data: DemandSupplyPoint[];
  period: 'monthly' | 'quarterly';
  onPeriodChange: (period: 'monthly' | 'quarterly') => void;
}

export const DemandSupplyOutlook: React.FC<DemandSupplyOutlookProps> = ({
  data,
  period,
  onPeriodChange,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Chart Dimensions
  const width = 760;
  const height = 280;
  const padding = { top: 35, right: 30, bottom: 45, left: 48 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Max scale value is 200 for monthly (in K units), or 550 for quarterly
  const maxY = period === 'monthly' ? 200 : 550;
  const yTicks = period === 'monthly' ? [0, 40, 80, 120, 160, 200] : [0, 100, 200, 300, 400, 500];

  const getX = (index: number) => {
    if (data.length <= 1) return padding.left;
    return padding.left + (index / (data.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(0, Math.min(maxY, val));
    return padding.top + innerHeight - (clamped / maxY) * innerHeight;
  };

  // Find index of 'Today' marker
  const todayIndex = data.findIndex((d) => d.isToday);
  const todayX = todayIndex !== -1 ? getX(todayIndex) : null;

  // Build SVG path strings
  const demandPoints = data.map((d, i) => `${getX(i)},${getY(d.demandForecast)}`);
  const demandLinePath = `M ${demandPoints.join(' L ')}`;

  const supplyPoints = data.map((d, i) => `${getX(i)},${getY(d.supplyPlan)}`);
  const supplyLinePath = `M ${supplyPoints.join(' L ')}`;

  // Area between P10 and P90 for confidence band
  const p90Points = data.map((d, i) => `${getX(i)},${getY(d.p90)}`);
  const p10PointsRev = [...data].reverse().map((d, i) => {
    const origIndex = data.length - 1 - i;
    return `${getX(origIndex)},${getY(d.p10)}`;
  });
  const confidenceAreaPath = `M ${p90Points.join(' L ')} L ${p10PointsRev.join(' L ')} Z`;

  // Active hover point data
  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : null;
  const activeX = hoveredIndex !== null ? getX(hoveredIndex) : null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Demand vs. Supply Outlook
          </h3>
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold text-slate-600 flex-shrink-0">
            <button
              type="button"
              onClick={() => onPeriodChange('monthly')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                period === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => onPeriodChange('quarterly')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                period === 'quarterly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              Quarterly
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-3 h-0.5 bg-[#0062d2] rounded-full inline-block" />
            <span className="w-2 h-2 rounded-full bg-[#0062d2] -ml-2 mr-0.5 inline-block" />
            <span className="font-medium text-slate-700">Demand Forecast</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-3 h-0.5 bg-[#10b981] rounded-full inline-block" />
            <span className="w-2 h-2 rounded-full bg-[#10b981] -ml-2 mr-0.5 inline-block" />
            <span className="font-medium text-slate-700">Supply Plan</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-3 h-2.5 bg-info-bg rounded-xs border border-border inline-block" />
            <span className="text-slate-500">Demand Range (P10–P90)</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative flex-1 mt-2 min-h-[260px] w-full">
        {/* Y-Axis Label */}
        <div className="absolute left-1 top-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Volume (K units)
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Horizontal Gridlines & Y-Axis Ticks */}
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

          {/* Today Vertical Dashed Line */}
          {todayX !== null && (
            <g>
              <line
                x1={todayX}
                y1={padding.top - 6}
                x2={todayX}
                y2={padding.top + innerHeight}
                stroke="#0062d2"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <rect
                x={todayX - 22}
                y={padding.top - 20}
                width="44"
                height="16"
                rx="4"
                fill="#0062d2"
              />
              <text
                x={todayX}
                y={padding.top - 8}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="9.5"
                fontWeight="700"
                className="select-none tracking-wide"
              >
                Today
              </text>
            </g>
          )}

          {/* Confidence Interval Ribbon (P10 - P90) */}
          <path d={confidenceAreaPath} fill="rgba(186, 230, 253, 0.45)" />

          {/* Supply Plan Line (Solid Teal/Green) */}
          <path
            d={supplyLinePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Demand Forecast Line (Solid Blue) */}
          <path
            d={demandLinePath}
            fill="none"
            stroke="#0062d2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points on Lines */}
          {data.map((d, i) => {
            // In monthly mode, only render visible dots for alternate or specific points to avoid clutter, or all points
            const showDot = period === 'quarterly' || i % 2 === 0 || d.isToday;
            if (!showDot) return null;
            const cx = getX(i);
            const cyDemand = getY(d.demandForecast);
            const cySupply = getY(d.supplyPlan);

            return (
              <g key={d.period}>
                <circle
                  cx={cx}
                  cy={cySupply}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <circle
                  cx={cx}
                  cy={cyDemand}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#0062d2"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* X-Axis Ticks and Labels */}
          {data.map((d, i) => {
            // For monthly, show every 2 months to match reference image (Jan, Mar, May, Jul, Sep, Nov)
            const showTick = period === 'quarterly' || i % 2 === 0;
            if (!showTick) return null;

            const x = getX(i);
            const y = padding.top + innerHeight + 16;
            const y2 = y + 12;

            return (
              <g key={d.period}>
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
                  className="font-medium"
                >
                  {d.monthShort}
                </text>
                <text
                  x={x}
                  y={y2}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="#94a3b8"
                >
                  {d.year}
                </text>
              </g>
            );
          })}

          {/* Interactive Hover Vertical Line & Cursor Hitboxes */}
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
              left: `${Math.min(Math.max(activeX - 60, 40), width - 150)}px`,
              top: '25px',
            }}
          >
            <div className="font-bold text-[11px] text-slate-300 pb-1 border-b border-slate-700 mb-1 flex items-center justify-between gap-3">
              <span>{activePoint.period}</span>
              {activePoint.isToday && (
                <span className="text-[9px] bg-primary text-primary px-1 py-0.5 rounded">
                  Current
                </span>
              )}
            </div>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Demand:</span>
                <span className="font-bold text-primary">{activePoint.demandForecast}K</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Supply Plan:</span>
                <span className="font-bold text-emerald-400">{activePoint.supplyPlan}K</span>
              </div>
              <div className="flex items-center justify-between gap-3 pt-0.5 border-t border-slate-800 text-[10px]">
                <span className="text-slate-400">Supply Gap:</span>
                <span
                  className={`font-semibold ${
                    activePoint.demandForecast > activePoint.supplyPlan
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {activePoint.demandForecast > activePoint.supplyPlan
                    ? `-${activePoint.demandForecast - activePoint.supplyPlan}K deficit`
                    : `+${activePoint.supplyPlan - activePoint.demandForecast}K surplus`}
                </span>
              </div>
              <div className="text-[9.5px] text-slate-500 pt-0.5">
                Range: {activePoint.p10}K – {activePoint.p90}K (P10–P90)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
