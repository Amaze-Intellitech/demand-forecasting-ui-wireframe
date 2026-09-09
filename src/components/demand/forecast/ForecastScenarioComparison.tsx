import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ForecastScenario } from '../../../types/domain/demandForecast';

interface ForecastScenarioComparisonProps {
  scenarios: ForecastScenario[];
  onSelectScenario?: (scenario: ForecastScenario) => void;
  onViewAll?: () => void;
}

export const ForecastScenarioComparison: React.FC<ForecastScenarioComparisonProps> = ({
  scenarios,
  onSelectScenario,
  onViewAll,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Forecast Scenario Comparison
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#0062d2] hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-1 flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
              <th className="py-2.5 px-3 font-normal">Scenario</th>
              <th className="py-2.5 px-3 font-normal text-right">Total Demand</th>
              <th className="py-2.5 px-3 font-normal text-right">Change vs. Base</th>
              <th className="py-2.5 px-3 font-normal text-right">Service Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {scenarios.map((scen) => {
              const isBase = scen.isBase;
              const isPositive = scen.changeNum > 0;

              return (
                <tr
                  key={scen.id}
                  onClick={() => onSelectScenario?.(scen)}
                  className={`hover:bg-slate-50/80 transition-colors group cursor-pointer ${
                    isBase ? 'bg-slate-50/40 font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-medium text-slate-800 group-hover:text-[#0062d2] transition-colors whitespace-nowrap">
                    {scen.name}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                    {scen.totalDemand}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono whitespace-nowrap">
                    {isBase ? (
                      <span className="text-slate-400">—</span>
                    ) : (
                      <span className={`font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {scen.changeVsBase}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-800 whitespace-nowrap">
                    {scen.serviceLevel}
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
