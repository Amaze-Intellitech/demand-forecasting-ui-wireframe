import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  TOP_DEMAND_DRIVERS,
  DriverMetricType,
} from '../../data/demandSignalsMock';

export const DemandDriversChart: React.FC = () => {
  const [metricType, setMetricType] = useState<DriverMetricType>('importance');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null);

  const options: { id: DriverMetricType; label: string }[] = [
    { id: 'importance', label: 'Feature Importance' },
    { id: 'correlation', label: 'Correlation' },
    { id: 'impact', label: 'Business Impact' },
  ];

  const currentLabel = options.find((o) => o.id === metricType)?.label || 'Feature Importance';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between relative">
      {/* Card Header & Metric Dropdown */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 relative">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Top Demand Drivers
        </h3>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>{currentLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Dropdown Menu Popover */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setMetricType(opt.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    metricType === opt.id
                      ? 'bg-blue-50 text-[#0062d2] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt.label}</span>
                  {metricType === opt.id && <Check className="w-3.5 h-3.5 text-[#0062d2]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Bar Chart List */}
      <div className="flex-1 flex flex-col justify-center py-4 space-y-4">
        {TOP_DEMAND_DRIVERS.map((driver) => {
          // Relative bar width calculation
          let barPct = 0;
          let displayValue = '';

          if (metricType === 'importance') {
            barPct = driver.importancePct;
            displayValue = `${driver.importancePct}%`;
          } else if (metricType === 'correlation') {
            barPct = Math.abs(driver.correlation) * 100;
            displayValue = `${driver.correlation > 0 ? '+' : ''}${driver.correlation}`;
          } else {
            barPct = driver.importancePct; // proportional representation
            displayValue = driver.impactLabel.split(' ')[0]; // e.g. "$4.2M"
          }

          const isHovered = hoveredDriver === driver.id;

          return (
            <div
              key={driver.id}
              className="group flex items-center gap-3 text-xs"
              onMouseEnter={() => setHoveredDriver(driver.id)}
              onMouseLeave={() => setHoveredDriver(null)}
            >
              {/* Driver Label */}
              <div className="w-32 sm:w-36 text-right font-medium text-slate-700 truncate">
                {driver.name}
              </div>

              {/* Bar Track & Fill */}
              <div className="flex-1 h-6 bg-slate-100/80 rounded-md overflow-hidden p-0.5 flex items-center">
                <div
                  className={`h-full rounded transition-all duration-500 flex items-center ${
                    driver.id === 'price'
                      ? 'bg-[#0062d2] hover:bg-[#0052b3]'
                      : 'bg-[#0062d2]/90 hover:bg-[#0062d2]'
                  } ${isHovered ? 'ring-2 ring-blue-300' : ''}`}
                  style={{
                    width: `${Math.max(barPct, 2)}%`,
                  }}
                />
              </div>

              {/* Percentage / Metric Value */}
              <div className="w-14 text-right font-mono font-bold text-slate-800 tracking-tight">
                {displayValue}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle Bottom Note */}
      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Dominant Driver: <strong>Price (87.1%)</strong></span>
        <span>Model: Random Forest / Shapley</span>
      </div>
    </div>
  );
};
