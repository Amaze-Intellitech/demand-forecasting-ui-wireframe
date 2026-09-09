import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { InventoryOpportunity } from '../../../types/domain/inventoryIntelligence';

interface InventoryOpportunitiesProps {
  opportunities: InventoryOpportunity[];
  onSelectOpportunity: (opp: InventoryOpportunity) => void;
}

export const InventoryOpportunities: React.FC<InventoryOpportunitiesProps> = ({
  opportunities,
  onSelectOpportunity,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Inventory Optimization Opportunities
        </h3>
        <p className="text-xs text-slate-500">
          Identified policies to release capital and protect customer fill rates
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-2.5 font-semibold">Opportunity</th>
              <th className="pb-2.5 font-semibold text-right">Potential Impact</th>
              <th className="pb-2.5 font-semibold text-center">Affected SKUs</th>
              <th className="pb-2.5 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {opportunities.map((opp) => (
              <tr
                key={opp.id}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                onClick={() => onSelectOpportunity(opp)}
              >
                <td className="py-2.5 font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  <div className="flex items-center gap-1.5">
                    {opp.approvalStatus === 'Approved' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    )}
                    <span>{opp.opportunity}</span>
                  </div>
                </td>
                <td className="py-2.5 font-mono font-bold text-emerald-600 text-right">
                  {opp.potentialImpact}
                </td>
                <td className="py-2.5 font-mono text-slate-600 text-center font-semibold">
                  {opp.affectedSkus}
                </td>
                <td className="py-2.5 text-right">
                  {opp.approvalStatus === 'Approved' ? (
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Approved
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOpportunity(opp);
                      }}
                      className="px-3 py-1 rounded-md text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 transition-all cursor-pointer"
                    >
                      {opp.action}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
