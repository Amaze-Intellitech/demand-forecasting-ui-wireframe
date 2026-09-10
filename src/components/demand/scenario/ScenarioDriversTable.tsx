import React from 'react';
import { ChevronDown, Sliders } from 'lucide-react';
import {
  ScenarioDriverRow,
  ScenarioPreset,
} from '../../../types/domain/scenarioDecisionTwin';

interface ScenarioDriversTableProps {
  drivers: ScenarioDriverRow[];
  scenarios: ScenarioPreset[];
  activeScenarioId: string;
  onScenarioChange: (id: string) => void;
  onSelectDriver: (driver: ScenarioDriverRow) => void;
}

export const ScenarioDriversTable: React.FC<ScenarioDriversTableProps> = ({
  drivers,
  scenarios,
  activeScenarioId,
  onScenarioChange,
  onSelectDriver,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header & Scenario Selector */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Key Drivers and Assumptions
          </h3>
          <p className="text-xs text-slate-500">
            Baseline vs. scenario parameter levers
          </p>
        </div>

        <div className="relative">
          <select
            value={activeScenarioId}
            onChange={(e) => onScenarioChange(e.target.value)}
            aria-label="Inspect scenario assumptions"
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
          >
            {scenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto my-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-2.5 font-semibold">Driver</th>
              <th className="pb-2.5 font-semibold text-right">Base Value</th>
              <th className="pb-2.5 font-semibold text-right">Scenario Value</th>
              <th className="pb-2.5 font-semibold text-right">Impact on Demand</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {drivers.map((d) => (
              <tr
                key={d.id}
                onClick={() => onSelectDriver(d)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-2.5 font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <Sliders className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                    <span>{d.driver}</span>
                  </div>
                </td>
                <td className="py-2.5 font-mono text-slate-500 text-right">
                  {d.baseValue}
                </td>
                <td className="py-2.5 font-mono font-bold text-slate-900 text-right">
                  {d.scenarioValue}
                </td>
                <td className="py-2.5 font-mono font-semibold text-right text-slate-700">
                  {d.impactOnDemand}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
