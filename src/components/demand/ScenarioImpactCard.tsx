import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  ScenarioOutcomeData,
} from '../../data/demandScenarioMock';

export interface ScenarioImpactCardProps {
  outcome: ScenarioOutcomeData;
}

export const ScenarioImpactCard: React.FC<ScenarioImpactCardProps> = ({ outcome }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
      {/* Header */}
      <div className="pb-2.5 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Scenario Impact Summary
        </h3>
      </div>

      {/* Impact Table */}
      <div className="py-2 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
              <th className="py-2 pr-2">Metric</th>
              <th className="py-2 px-2 text-right">Base Case</th>
              <th className="py-2 px-2 text-right">Scenario</th>
              <th className="py-2 pl-2 text-right">Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 font-mono">
            {outcome.impactRows.map((row) => {
              let impactColor = 'text-slate-500';
              if (row.impactType === 'positive') impactColor = 'text-emerald-600 font-bold';
              else if (row.impactType === 'negative') impactColor = 'text-rose-600 font-bold';
              else if (row.impact === '0%') impactColor = 'text-emerald-600 font-bold';

              return (
                <tr key={row.metric} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 pr-2 font-sans font-medium text-slate-700">
                    {row.metric}
                  </td>
                  <td className="py-2 px-2 text-right text-slate-600">
                    {row.baseCase}
                  </td>
                  <td className="py-2 px-2 text-right font-bold text-slate-900">
                    {row.scenario}
                  </td>
                  <td className={`py-2 pl-2 text-right ${impactColor}`}>
                    {row.impact}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Highlighted Scenario Outcome Box */}
      <div className="mt-2 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-emerald-700 mt-0.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-emerald-900 tracking-tight">
            Scenario Outcome
          </h4>
          <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5 font-normal">
            {outcome.summary}
          </p>
        </div>
      </div>
    </div>
  );
};
