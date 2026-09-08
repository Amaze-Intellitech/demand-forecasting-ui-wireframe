import React, { useState } from 'react';
import { Check, Plus, Sparkles } from 'lucide-react';
import {
  INITIAL_SUPPLIER_RECOMMENDATIONS,
  SupplierRecommendation,
} from '../../data/demandSourcingMock';

export const SupplierRecommendationsTable: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierRecommendation[]>(
    INITIAL_SUPPLIER_RECOMMENDATIONS
  );

  const toggleSelect = (id: string) => {
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const selectedCount = suppliers.filter((s) => s.selected).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Table Header with status */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Supplier Recommendations
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0062d2] border border-blue-200/60">
            {selectedCount} Selected
          </span>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Optimal Mix: Top 3
        </span>
      </div>

      {/* Table responsive container */}
      <div className="overflow-x-auto my-2">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold tracking-wider uppercase text-[10px]">
              <th className="py-2.5 px-3 font-semibold">Supplier</th>
              <th className="py-2.5 px-3 font-semibold text-right">Recommended Allocation</th>
              <th className="py-2.5 px-3 font-semibold text-right">Unit Cost</th>
              <th className="py-2.5 px-3 font-semibold text-right">Total Cost</th>
              <th className="py-2.5 px-3 font-semibold text-right">Savings vs. Current</th>
              <th className="py-2.5 px-3 font-semibold text-right">Reliability</th>
              <th className="py-2.5 px-3 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {suppliers.map((s) => (
              <tr
                key={s.id}
                className={`transition-colors duration-100 ${
                  s.selected ? 'bg-blue-50/20 hover:bg-blue-50/40' : 'hover:bg-slate-50/60 opacity-80'
                }`}
              >
                {/* Supplier Name with Colored Dot */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: s.colorDot }}
                    />
                    <span>{s.name}</span>
                  </div>
                </td>

                {/* Recommended Allocation */}
                <td className="py-3 px-3 text-right font-mono text-slate-700 font-medium">
                  {s.recommendedAllocation.toLocaleString()} units
                </td>

                {/* Unit Cost */}
                <td className="py-3 px-3 text-right font-mono text-slate-600">
                  ${s.unitCost}
                </td>

                {/* Total Cost */}
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                  {s.totalCost}
                </td>

                {/* Savings vs Current */}
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center font-mono font-semibold text-emerald-600 text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50">
                    {s.savingsVsCurrent}
                  </span>
                </td>

                {/* Reliability with mini bar */}
                <td className="py-3 px-3 text-right">
                  <div className="inline-flex items-center gap-2 justify-end">
                    <span className="font-mono font-bold text-slate-700 text-xs">
                      {s.reliability}%
                    </span>
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                      <div
                        className={`h-full rounded-full ${
                          s.reliability >= 97
                            ? 'bg-emerald-500'
                            : s.reliability >= 95
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${s.reliability}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Action button */}
                <td className="py-3 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => toggleSelect(s.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      s.selected
                        ? 'bg-[#0062d2] text-white shadow-xs hover:bg-blue-700'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {s.selected ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Select</span>
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-[#0062d2]" />
          <span>Recommendations synthesized across 24 contractual and capacity constraints.</span>
        </div>
        <span className="font-mono text-slate-500">
          Selected Spend: <strong>${suppliers.filter(s=>s.selected).length === 3 ? '10.78M' : suppliers.filter(s=>s.selected).length === 4 ? '12.78M' : '8.11M'}</strong>
        </span>
      </div>
    </div>
  );
};
