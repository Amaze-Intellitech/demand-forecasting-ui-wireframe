import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { RegionalDemand as IRegionalDemand } from '../../../types/domain/executiveCommandCenter';

interface RegionalDemandProps {
  regions: IRegionalDemand[];
  selectedRegion?: string;
  onSelectRegion?: (regionId: string) => void;
}

export const RegionalDemand: React.FC<RegionalDemandProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getStatusDotColor = (status: 'healthy' | 'attention' | 'critical') => {
    switch (status) {
      case 'critical':
        return 'bg-rose-500 ring-rose-200';
      case 'attention':
        return 'bg-amber-500 ring-amber-200';
      case 'healthy':
      default:
        return 'bg-emerald-500 ring-emerald-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Demand by Region
        </h3>
      </div>

      {/* Main Container: Map (Left) + Region Breakdown List (Right) */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
        {/* World Map SVG Display (52% on desktop) */}
        <div className="w-full sm:w-[52%] relative flex items-center justify-center p-1 min-h-[170px]">
          <svg
            viewBox="0 0 380 200"
            className="w-full h-auto drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized Continent Silhouettes */}
            <g fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.75" strokeLinejoin="round">
              {/* North America */}
              <path d="M45,28 C55,22 80,24 95,20 C105,24 115,35 110,48 C102,58 92,62 82,75 C75,82 65,88 58,84 C52,78 40,68 38,55 C36,42 40,32 45,28 Z" />
              {/* Greenland */}
              <path d="M120,15 C132,12 145,18 140,28 C135,32 125,30 120,24 Z" />
              {/* Central & South America */}
              <path d="M82,88 C88,86 94,94 92,102 C88,115 95,130 92,148 C88,162 80,172 72,168 C68,155 70,135 72,120 C74,105 78,94 82,88 Z" />
              {/* Europe */}
              <path d="M175,32 C185,26 205,28 212,38 C210,46 198,54 188,56 C178,54 172,44 175,32 Z" />
              {/* Africa */}
              <path d="M178,68 C192,62 210,66 216,78 C222,96 220,118 212,135 C202,150 190,146 182,130 C175,115 172,92 178,68 Z" />
              {/* Asia */}
              <path d="M218,28 C238,22 285,25 305,38 C315,50 310,72 295,85 C278,92 258,85 245,80 C235,74 225,58 222,45 Z" />
              {/* India */}
              <path d="M248,82 C255,80 262,88 258,98 C252,108 245,105 242,96 Z" />
              {/* Australia & Oceania */}
              <path d="M285,125 C305,120 320,132 318,148 C312,160 295,162 285,152 C278,142 276,130 285,125 Z" />
              {/* Japan & Islands */}
              <path d="M322,50 C326,52 328,62 324,68 C320,68 318,60 322,50 Z" />
              <path d="M298,102 C308,105 315,112 308,118 C302,118 298,110 298,102 Z" />
            </g>

            {/* Pulsing and Static Region Marker Dots on Map */}
            {regions.map((reg) => {
              const cx = (reg.coordinates.x / 100) * 380;
              const cy = (reg.coordinates.y / 100) * 200;
              const isHovered = hoveredRegion === reg.id;
              const isSelected = selectedRegion === reg.id;

              const pinColor =
                reg.riskStatus === 'critical'
                  ? '#ef4444'
                  : reg.riskStatus === 'attention'
                  ? '#f59e0b'
                  : '#10b981';

              return (
                <g
                  key={reg.id}
                  className="cursor-pointer transition-transform duration-150"
                  onClick={() => onSelectRegion?.(reg.id)}
                  onMouseEnter={() => setHoveredRegion(reg.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  {/* Outer pulse circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered || isSelected ? '9' : '7'}
                    fill={pinColor}
                    fillOpacity={isHovered || isSelected ? '0.4' : '0.2'}
                    className="animate-pulse"
                  />
                  {/* Center solid pin */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered || isSelected ? '5' : '4'}
                    fill={pinColor}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Region Breakdown List (48% on desktop) */}
        <div className="w-full sm:w-[48%] space-y-1 sm:space-y-1.5 flex flex-col justify-center">
          {regions.map((reg) => {
            const isHovered = hoveredRegion === reg.id;
            const isSelected = selectedRegion === reg.id;
            const dotColorClass = getStatusDotColor(reg.riskStatus);

            return (
              <div
                key={reg.id}
                onClick={() => onSelectRegion?.(reg.id)}
                onMouseEnter={() => setHoveredRegion(reg.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-between gap-1.5 border ${
                  isSelected
                    ? 'bg-info-bg border-border shadow-xs'
                    : isHovered
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-transparent border-transparent'
                }`}
              >
                {/* Left: Indicator Dot & Region Name */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full ring-2 flex-shrink-0 ${dotColorClass}`}
                  />
                  <span className="text-xs font-semibold text-slate-800 truncate whitespace-nowrap">
                    {reg.region}
                  </span>
                </div>

                {/* Right: Volume & Growth stacked cleanly */}
                <div className="text-right flex-shrink-0 pl-1 leading-tight">
                  <div className="text-xs font-bold text-slate-900 font-mono">
                    {reg.volume}
                  </div>
                  <div className="text-[10px] font-medium text-emerald-600 flex items-center justify-end gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
                    <span>{reg.growth}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
