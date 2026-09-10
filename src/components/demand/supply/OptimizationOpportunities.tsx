import React from 'react';
import { OptimizationOpportunityItem } from '../../../types/domain/supplyCapacityOptimization';

interface OptimizationOpportunitiesProps {
  opportunities: OptimizationOpportunityItem[];
  onSelectOpportunity: (opp: OptimizationOpportunityItem) => void;
}

export const OptimizationOpportunities: React.FC<OptimizationOpportunitiesProps> = ({
  opportunities,
  onSelectOpportunity,
}) => {
  const getComplexityBadge = (complexity: OptimizationOpportunityItem['complexity']) => {
    switch (complexity) {
      case 'Low':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            Low
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Medium
          </span>
        );
      case 'High':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            High
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">
          Optimization Opportunities
        </h2>
        <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
          5 Actionable Solvers
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-left text-xs text-slate-600">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
              <th className="pb-2 font-medium">Opportunity</th>
              <th className="pb-2 font-medium text-right">Impact</th>
              <th className="pb-2 font-medium text-center">Complexity</th>
              <th className="pb-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {opportunities.map((opp) => (
              <tr
                key={opp.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="py-2.5 font-medium text-slate-800 pr-2">
                  <div className="line-clamp-1" title={opp.title}>
                    {opp.title}
                  </div>
                </td>
                <td className="py-2.5 text-right font-bold text-emerald-600 shrink-0 whitespace-nowrap">
                  {opp.impactValue}
                </td>
                <td className="py-2.5 text-center">
                  {getComplexityBadge(opp.complexity)}
                </td>
                <td className="py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => onSelectOpportunity(opp)}
                    className="inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded transition-all cursor-pointer shadow-2xs"
                  >
                    {opp.actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Combined Potential: +$142M EBT</span>
        <span className="text-slate-500">Continuous linear solver active</span>
      </div>
    </div>
  );
};
