import React from 'react';
import { ScenarioComparisonRow } from '../../../types/domain/scenarioDecisionTwin';

interface ScenarioImpactSummaryTableProps {
  rows: ScenarioComparisonRow[];
  selectedScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
}

export const ScenarioImpactSummaryTable: React.FC<ScenarioImpactSummaryTableProps> = ({
  rows,
  selectedScenarioId,
  onSelectScenario,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Scenario Impact Summary
        </h3>
        <p className="text-xs text-slate-500">
          Cross-dimensional financial, operational and customer service scorecard
        </p>
      </div>

      {/* Scorecard Table */}
      <div className="overflow-x-auto my-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3 font-semibold">Scenario</th>
              <th className="pb-3 font-semibold text-right">Total Demand</th>
              <th className="pb-3 font-semibold text-right">Revenue</th>
              <th className="pb-3 font-semibold text-right">Gross Margin</th>
              <th className="pb-3 font-semibold text-right">Service Level</th>
              <th className="pb-3 font-semibold text-right">Inventory Need</th>
              <th className="pb-3 font-semibold text-right">Working Capital</th>
              <th className="pb-3 font-semibold text-right">Vs. Base</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {rows.map((row) => {
              const isSelected = row.scenarioId === selectedScenarioId;

              return (
                <tr
                  key={row.scenarioId}
                  onClick={() => onSelectScenario(row.scenarioId)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                    isSelected ? 'bg-info-bg font-semibold' : ''
                  }`}
                >
                  {/* Scenario Name */}
                  <td className="py-3 font-bold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      )}
                      <span className={isSelected ? 'text-blue-700' : 'text-slate-900'}>
                        {row.scenarioName}
                      </span>
                    </div>
                  </td>

                  {/* Total Demand */}
                  <td className="py-3 font-mono text-slate-800 text-right">
                    {row.totalDemand}
                  </td>

                  {/* Revenue */}
                  <td className="py-3 font-mono font-bold text-slate-900 text-right">
                    {row.revenue}
                  </td>

                  {/* Gross Margin */}
                  <td
                    className={`py-3 font-mono font-bold text-right ${
                      row.marginPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {row.grossMargin}
                  </td>

                  {/* Service Level */}
                  <td
                    className={`py-3 font-mono font-bold text-right ${
                      row.servicePositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {row.serviceLevel}
                  </td>

                  {/* Inventory Need */}
                  <td className="py-3 font-mono text-slate-700 text-right">
                    {row.inventoryNeed}
                  </td>

                  {/* Working Capital */}
                  <td className="py-3 font-mono text-slate-800 text-right">
                    {row.workingCapital}
                  </td>

                  {/* Vs. Base */}
                  <td
                    className={`py-3 font-mono font-black text-right ${
                      row.vsBaseType === 'positive'
                        ? 'text-emerald-600'
                        : row.vsBaseType === 'negative'
                        ? 'text-rose-600'
                        : 'text-slate-400 font-normal'
                    }`}
                  >
                    {row.vsBase}
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
