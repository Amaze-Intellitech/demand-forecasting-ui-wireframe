import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScenarioRegionalImpact } from '../../../types/domain/scenarioDecisionTwin';

interface ScenarioNetworkViewProps {
  scenarioName: string;
  regionalData: ScenarioRegionalImpact[];
  selectedMetric: string;
  onMetricChange: (metric: string) => void;
  onSelectRegion: (region: ScenarioRegionalImpact) => void;
}

export const ScenarioNetworkView: React.FC<ScenarioNetworkViewProps> = ({
  scenarioName,
  regionalData,
  selectedMetric,
  onMetricChange,
  onSelectRegion,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // SVG dimensions
  const width = 560;
  const height = 270;

  // Connection curves between regions
  const connections = [
    { from: 'North America', to: 'Europe', color: '#38bdf8' },
    { from: 'Europe', to: 'APAC', color: '#f97316' },
    { from: 'North America', to: 'Latin America', color: '#818cf8' },
    { from: 'Europe', to: 'MEA', color: '#34d399' },
    { from: 'MEA', to: 'APAC', color: '#fb923c' },
  ];

  const getRegionCoords = (name: string) => {
    const reg = regionalData.find((r) => r.region === name);
    if (!reg) return { x: 0, y: 0 };
    return {
      x: (reg.coordinates.x / 100) * width,
      y: (reg.coordinates.y / 100) * height,
    };
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full relative">
      {/* Header & Metric Selector */}
      <div className="flex items-center justify-between gap-3 mb-1">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>Network View</span>
            <span className="text-xs font-normal text-slate-500">
              (Scenario: {scenarioName})
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Regional propagation, bottlenecks and supply strain
          </p>
        </div>

        <div className="relative">
          <select
            value={selectedMetric}
            onChange={(e) => onMetricChange(e.target.value)}
            aria-label="Select network dimension"
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
          >
            <option value="Demand Change">Demand Change</option>
            <option value="Inventory Need">Inventory Need</option>
            <option value="Service Risk">Service Risk</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Stylized Network Canvas */}
      <div className="relative w-full h-[210px] my-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* World landmass silhouette placeholder */}
            <linearGradient id="mapSilhouetteGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>

          {/* Abstract landmass silhouettes */}
          <path
            d="M 60 40 Q 140 20 180 60 Q 200 110 160 140 Q 110 120 70 80 Z"
            fill="#f1f5f9"
            opacity="0.8"
          />
          <path
            d="M 130 160 Q 190 170 170 230 Q 130 250 110 200 Z"
            fill="#f1f5f9"
            opacity="0.8"
          />
          <path
            d="M 270 30 Q 340 25 360 70 Q 320 100 270 90 Z"
            fill="#f1f5f9"
            opacity="0.8"
          />
          <path
            d="M 310 120 Q 370 120 350 200 Q 300 190 290 150 Z"
            fill="#f1f5f9"
            opacity="0.8"
          />
          <path
            d="M 400 60 Q 500 40 510 120 Q 460 180 390 120 Z"
            fill="#f1f5f9"
            opacity="0.8"
          />

          {/* Flow Connection Lines */}
          {connections.map((conn, idx) => {
            const p1 = getRegionCoords(conn.from);
            const p2 = getRegionCoords(conn.to);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2 - 25;

            return (
              <g key={idx}>
                <path
                  d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.65"
                />
              </g>
            );
          })}

          {/* Region Nodes */}
          {regionalData.map((reg) => {
            const pos = getRegionCoords(reg.region);
            const isHovered = hoveredRegion === reg.region;

            return (
              <g
                key={reg.region}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredRegion(reg.region)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => onSelectRegion(reg)}
              >
                {/* Pulse Ring if At Risk */}
                {reg.status === 'At Risk' && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHovered ? 18 : 14}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="animate-ping"
                  />
                )}

                {/* Outer halo */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered ? 14 : 10}
                  fill={reg.color}
                  fillOpacity="0.2"
                />

                {/* Inner solid center dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered ? 6.5 : 5}
                  fill={reg.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />

                {/* Region Label Pill */}
                <g transform={`translate(${pos.x + 12}, ${pos.y - 12})`}>
                  <rect
                    x="-4"
                    y="-12"
                    width={reg.region.length * 7 + 42}
                    height="20"
                    rx="4"
                    fill="#ffffff"
                    fillOpacity="0.95"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    className="shadow-2xs"
                  />
                  <text
                    x="2"
                    y="1"
                    className="text-[10px] font-bold fill-slate-800 select-none"
                  >
                    {reg.region}
                  </text>
                  <text
                    x={reg.region.length * 7 + 8}
                    y="1"
                    className="text-[10px] font-mono font-bold select-none"
                    fill={reg.color}
                  >
                    {reg.demandChange}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend Row */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block" />
          <span>Increased Demand</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] inline-block" />
          <span>Moderate Increase</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] inline-block" />
          <span className="font-semibold text-slate-800">At Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] inline-block" />
          <span>Stable</span>
        </div>
      </div>
    </div>
  );
};
