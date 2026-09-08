import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  DEMAND_BY_SEGMENT,
  TOTAL_SEGMENT_VOLUME,
  SegmentShare,
} from '../../data/demandSignalsMock';

export const SegmentDonutChart: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<string>('Product Category');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [hoveredSegment, setHoveredSegment] = useState<SegmentShare | null>(null);

  const dimensionOptions = ['Product Category', 'Customer Tier', 'Geographic Region'];

  // Donut geometry constants
  const size = 190;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke-dasharray and stroke-dashoffset for each segment
  let accumulatedPercent = 0;
  const segmentArcs = DEMAND_BY_SEGMENT.map((seg) => {
    const strokeDasharray = `${(seg.sharePct / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += seg.sharePct;
    return {
      ...seg,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between relative">
      {/* Card Header & Selector */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 relative">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Demand by Segment
        </h3>

        {/* Dimension Selector Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>{selectedDimension}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Selector Menu Popover */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              {dimensionOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSelectedDimension(opt);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    selectedDimension === opt
                      ? 'bg-blue-50 text-[#0062d2] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedDimension === opt && <Check className="w-3.5 h-3.5 text-[#0062d2]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Donut Chart & Legend Flex Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        {/* SVG Donut */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90 select-none overflow-visible"
          >
            {/* Background Track Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {/* Segment Arcs */}
            {segmentArcs.map((arc) => {
              const isHovered = hoveredSegment?.id === arc.id;
              return (
                <circle
                  key={arc.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={arc.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={arc.strokeDasharray}
                  strokeDashoffset={arc.strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredSegment(arc)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              );
            })}
          </svg>

          {/* Center Stat Labels */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              {TOTAL_SEGMENT_VOLUME.value}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
              {TOTAL_SEGMENT_VOLUME.units}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 w-full sm:w-auto space-y-2 select-none">
          {DEMAND_BY_SEGMENT.map((seg) => {
            const isHovered = hoveredSegment?.id === seg.id;
            return (
              <div
                key={seg.id}
                onMouseEnter={() => setHoveredSegment(seg)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`flex items-center justify-between text-xs px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  isHovered ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'
                }`}
              >
                {/* Colored Dot + Segment Name */}
                <div className="flex items-center gap-2 truncate pr-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-slate-700 font-medium truncate">{seg.name}</span>
                </div>

                {/* Percentage Share */}
                <span className="font-mono font-bold text-slate-900 flex-shrink-0">
                  {seg.sharePct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Hover Note */}
      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          Concentration:{' '}
          <strong>
            {hoveredSegment
              ? `${hoveredSegment.name} (${hoveredSegment.volumeUnits.toLocaleString()} units)`
              : 'HDPE & LDPE dominate (66%)'}
          </strong>
        </span>
        <span className="font-mono text-slate-400">Total: 5 SKUs</span>
      </div>
    </div>
  );
};
