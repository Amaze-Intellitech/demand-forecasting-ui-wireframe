import React from 'react';
import { TopDemandDriver } from '../../../types/domain/causalIntelligence';

interface DriverImpactCardProps {
  drivers: TopDemandDriver[];
  selectedDriverId?: string;
  onSelectDriver: (driver: TopDemandDriver) => void;
}

export const DriverImpactCard: React.FC<DriverImpactCardProps> = ({
  drivers,
  selectedDriverId,
  onSelectDriver,
}) => {
  const maxImpact = Math.max(...drivers.map((d) => Math.abs(d.impactNum)), 32);

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-1.5">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Top Demand Drivers (Causal Impact)
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 pb-3 border-b border-slate-100">
          Relative impact on demand (causal, not just correlation)
        </p>

        {/* Drivers Bar List */}
        <div className="space-y-2 mt-2">
          {drivers.map((driver) => {
            const isNegative = driver.isNegative;
            const barWidthPct = Math.round((Math.abs(driver.impactNum) / maxImpact) * 100);
            const isSelected = selectedDriverId === driver.id;

            return (
              <div
                key={driver.id}
                onClick={() => onSelectDriver(driver)}
                className={`py-1 px-2 rounded-lg cursor-pointer transition-all flex items-center justify-between gap-3 text-xs group ${
                  isSelected ? 'bg-info-bg ring-1 ring-primary' : 'hover:bg-slate-50'
                }`}
              >
                {/* Driver Name */}
                <span className="w-36 font-medium text-slate-700 group-hover:text-[#0062d2] transition-colors truncate">
                  {driver.name}
                </span>

                {/* Bar */}
                <div className="flex-1 h-3.5 bg-slate-100 rounded-md overflow-hidden mx-1">
                  <div
                    className={`h-full rounded-md transition-all duration-300 ${
                      isNegative ? 'bg-rose-500' : 'bg-[#0062d2]'
                    }`}
                    style={{ width: `${barWidthPct}%` }}
                  />
                </div>

                {/* Percentage Impact */}
                <span
                  className={`w-14 text-right font-mono font-bold whitespace-nowrap ${
                    isNegative ? 'text-rose-600' : 'text-[#0062d2]'
                  }`}
                >
                  {driver.impact}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
