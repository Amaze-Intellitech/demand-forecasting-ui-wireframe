import React, { useState } from 'react';
import { ProductSupplyPlanRow } from '../../../types/domain/supplyCapacityOptimization';

interface ProductSupplyPlanProps {
  products: ProductSupplyPlanRow[];
  onSelectProduct: (product: ProductSupplyPlanRow) => void;
}

export const ProductSupplyPlan: React.FC<ProductSupplyPlanProps> = ({
  products,
  onSelectProduct,
}) => {
  const [unitMode, setUnitMode] = useState<'Units' | 'Currency'>('Units');

  const getStatusBadge = (status: ProductSupplyPlanRow['status']) => {
    switch (status) {
      case 'Constrained':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            Constrained
          </span>
        );
      case 'At Risk':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            At Risk
          </span>
        );
      case 'Healthy':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            Healthy
          </span>
        );
    }
  };

  const formatVal = (valK: number) => {
    if (unitMode === 'Currency') {
      // Approximate $1.4M per 100K units
      return `$${((valK * 1.4) / 10).toFixed(1)}M`;
    }
    return valK.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">
          Supply & Capacity Plan by Product
        </h2>

        <div className="relative">
          <select
            value={unitMode}
            onChange={(e) => setUnitMode(e.target.value as 'Units' | 'Currency')}
            className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-md px-2.5 py-1 pr-6 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs cursor-pointer"
          >
            <option value="Units">Units</option>
            <option value="Currency">Currency ($)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-left text-xs text-slate-600">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
              <th className="pb-2 font-medium">Product</th>
              <th className="pb-2 font-medium text-right">
                {unitMode === 'Units' ? 'Demand (K)' : 'Demand'}
              </th>
              <th className="pb-2 font-medium text-right">
                {unitMode === 'Units' ? 'Supply Plan (K)' : 'Plan'}
              </th>
              <th className="pb-2 font-medium text-right">
                {unitMode === 'Units' ? 'Capacity (K)' : 'Capacity'}
              </th>
              <th className="pb-2 font-medium text-right">Utilization</th>
              <th className="pb-2 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelectProduct(row)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-2.5 font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {row.product}
                </td>
                <td className="py-2.5 text-right font-medium text-slate-700">
                  {formatVal(row.demandK)}
                </td>
                <td className="py-2.5 text-right font-medium text-slate-700">
                  {formatVal(row.supplyPlanK)}
                </td>
                <td className="py-2.5 text-right font-medium text-slate-700">
                  {formatVal(row.capacityK)}
                </td>
                <td className="py-2.5 text-right font-semibold text-slate-800">
                  {row.utilizationPercent}%
                </td>
                <td className="py-2.5 text-center">
                  {getStatusBadge(row.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>5 Active Core Product Families</span>
        <span className="text-blue-600 hover:underline cursor-pointer">
          View full SKU breakdown &rarr;
        </span>
      </div>
    </div>
  );
};
