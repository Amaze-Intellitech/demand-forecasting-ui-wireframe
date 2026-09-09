import React from 'react';
import { ChevronRight } from 'lucide-react';
import { InventorySkuItem, InventorySkuStatus } from '../../../types/domain/inventoryIntelligence';

interface InventoryHealthTableProps {
  skus: InventorySkuItem[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onSelectSku: (sku: InventorySkuItem) => void;
  onViewAll: () => void;
}

export const InventoryHealthTable: React.FC<InventoryHealthTableProps> = ({
  skus,
  activeTab,
  onSelectTab,
  onSelectSku,
  onViewAll,
}) => {
  const tabs = [
    { id: 'All SKUs', label: 'All SKUs (1,240)' },
    { id: 'At Risk', label: 'At Risk (46)' },
    { id: 'Overstocked', label: 'Overstocked (72)' },
    { id: 'Understocked', label: 'Understocked (38)' },
  ];

  const getStatusBadge = (status: InventorySkuStatus) => {
    switch (status) {
      case 'At Risk':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200/80">
            At Risk
          </span>
        );
      case 'Healthy':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/80">
            Healthy
          </span>
        );
      case 'Understocked':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
            Understocked
          </span>
        );
      case 'Overstocked':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-purple-600 border border-purple-200/80">
            Overstocked
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header & Tabs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Inventory Health by SKU
            </h3>
            <p className="text-xs text-slate-500">
              Operational buffer and stockout risk monitoring
            </p>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-2.5 font-semibold">SKU</th>
              <th className="pb-2.5 font-semibold">Product</th>
              <th className="pb-2.5 font-semibold">Plant</th>
              <th className="pb-2.5 font-semibold text-right">On-Hand</th>
              <th className="pb-2.5 font-semibold text-right">Target</th>
              <th className="pb-2.5 font-semibold text-center">Status</th>
              <th className="pb-2.5 font-semibold text-right">Days of Supply</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {skus.slice(0, 5).map((sku) => (
              <tr
                key={sku.sku}
                onClick={() => onSelectSku(sku)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-2.5 font-mono font-bold text-slate-900 group-hover:text-blue-600">
                  {sku.sku}
                </td>
                <td className="py-2.5 text-slate-600">{sku.product}</td>
                <td className="py-2.5 text-slate-600">{sku.plant}</td>
                <td className="py-2.5 font-mono font-semibold text-slate-900 text-right">
                  {sku.onHand}K
                </td>
                <td className="py-2.5 font-mono text-slate-500 text-right">
                  {sku.target}K
                </td>
                <td className="py-2.5 text-center">{getStatusBadge(sku.status)}</td>
                <td className="py-2.5 font-mono font-bold text-slate-900 text-right">
                  {sku.daysOfSupply}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
