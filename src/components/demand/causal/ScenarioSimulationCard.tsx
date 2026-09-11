import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ScenarioSimulationRow } from '../../../types/domain/causalIntelligence';

interface ScenarioSimulationCardProps {
  scenarios: ScenarioSimulationRow[];
  selectedDriver: string;
  onDriverChange: (driver: string) => void;
  availableDrivers: string[];
  onSelectScenario?: (scenario: ScenarioSimulationRow) => void;
}

export const ScenarioSimulationCard: React.FC<ScenarioSimulationCardProps> = ({
  scenarios,
  selectedDriver,
  onDriverChange,
  availableDrivers,
  onSelectScenario,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Scenario Simulation
        </h3>

        {/* Driver Selector */}
        <div className="relative">
          <select
            value={selectedDriver}
            onChange={(e) => onDriverChange(e.target.value)}
            className="h-7 pl-2.5 pr-6 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            {availableDrivers.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-1 flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
              <th className="py-2.5 px-3 font-normal">Scenario</th>
              <th className="py-2.5 px-3 font-normal text-right">{selectedDriver} Change</th>
              <th className="py-2.5 px-3 font-normal text-right">Projected Demand</th>
              <th className="py-2.5 px-3 font-normal text-right">Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {scenarios.map((row) => {
              const isBase = row.isBase;
              const isPositive = row.impactNum > 0;

              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectScenario?.(row)}
                  className={`hover:bg-slate-50/80 transition-colors group cursor-pointer ${
                    isBase ? 'bg-info-bg font-bold text-[#0062d2]' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-mono whitespace-nowrap">
                    {row.scenario}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono whitespace-nowrap">
                    {isBase ? (
                      <span className="text-slate-400">—</span>
                    ) : (
                      <span className={row.changeValue.startsWith('-') ? 'text-rose-600 font-semibold' : 'text-emerald-600 font-semibold'}>
                        {row.changeValue}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                    {row.projectedDemand}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono whitespace-nowrap">
                    {isBase ? (
                      <span className="text-slate-400">—</span>
                    ) : (
                      <span className={`font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {row.impact}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
