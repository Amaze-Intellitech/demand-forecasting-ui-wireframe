import React from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import { CausalInsightDriver } from '../../../types/domain/causalIntelligence';

interface CausalInsightsTableProps {
  insights: CausalInsightDriver[];
  selectedFilter: string;
  onFilterChange: (f: string) => void;
  onSelectDriver: (driverName: string) => void;
  driverOptions: string[];
}

export const CausalInsightsTable: React.FC<CausalInsightsTableProps> = ({
  insights,
  selectedFilter,
  onFilterChange,
  onSelectDriver,
  driverOptions,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Causal Insights by Driver
        </h3>

        {/* Filter dropdown */}
        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-7 pl-2.5 pr-6 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="All Drivers">All Drivers</option>
            {driverOptions.map((d) => (
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
              <th className="py-2.5 px-2.5 font-normal">Driver</th>
              <th className="py-2.5 px-2.5 font-normal text-right">Impact on Demand</th>
              <th className="py-2.5 px-2.5 font-normal text-center">Significance</th>
              <th className="py-2.5 px-2.5 font-normal text-center">Direction</th>
              <th className="py-2.5 px-2.5 font-normal">Insight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {insights.map((item) => {
              const isPositive = item.direction === 'up';

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectDriver(item.driver)}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <td className="py-2 px-2.5 font-medium text-slate-800 group-hover:text-[#0062d2] transition-colors whitespace-nowrap">
                    {item.driver}
                  </td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold whitespace-nowrap">
                    <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>
                      {item.impactOnDemand}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                        item.significance === 'High'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {item.significance}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 text-center">
                    {isPositive ? (
                      <ArrowUp className="w-3.5 h-3.5 text-emerald-600 inline-block font-bold" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5 text-rose-600 inline-block font-bold" />
                    )}
                  </td>
                  <td className="py-2 px-2.5 text-slate-600 text-[11px] truncate max-w-[200px]">
                    {item.insight}
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
