import React from 'react';
import {
  Coins,
  ShieldAlert,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { AT_RISK_SKUS, SUPPLIER_OPPORTUNITIES } from '../../data/demandIntelligenceMock';

export interface BottomValuePanelsProps {
  onViewAtRiskSkus: () => void;
  onViewSourcingOptimization: () => void;
}

export const BottomValuePanels: React.FC<BottomValuePanelsProps> = ({
  onViewAtRiskSkus,
  onViewSourcingOptimization,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 select-none">
      
      {/* ── CARD A: Working Capital ── */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
        <div>
          {/* Header Row: Badge, Title & Sparkline */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Working Capital
                </span>
                <span className="text-2xl font-bold text-slate-900 tracking-tight block mt-0.5">
                  $280K
                </span>
                <span className="text-[11px] text-slate-500 font-normal block">
                  Potential working capital release
                </span>
              </div>
            </div>

            {/* Green Sparkline Curve */}
            <div className="w-20 h-9 flex items-center justify-end">
              <svg viewBox="0 0 80 32" className="w-full h-full overflow-visible">
                <path
                  d="M 2 24 Q 18 20, 30 14 T 55 18 T 78 4"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 2 24 Q 18 20, 30 14 T 55 18 T 78 4 L 78 32 L 2 32 Z"
                  fill="rgba(16, 185, 129, 0.12)"
                />
              </svg>
            </div>
          </div>

          <div className="h-[1px] bg-slate-100 my-4" />

          {/* 3-Column Stats Row */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">
                Current Inventory
              </div>
              <div className="text-base font-bold text-slate-900">
                $1.2M
              </div>
            </div>

            <div className="space-y-1 border-x border-slate-100">
              <div className="text-[11px] text-slate-500 font-medium">
                Optimized Inventory
              </div>
              <div className="text-base font-bold text-slate-900">
                $920K
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">
                Potential Release
              </div>
              <div className="text-base font-bold text-emerald-600">
                $280K
              </div>
            </div>
          </div>
        </div>

        {/* Subtle spacing spacer */}
        <div className="h-4" />
      </div>

      {/* ── CARD B: Service Risk ── */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
        <div>
          {/* Header Row: Badge, Title & Sparkline */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Service Risk
                </span>
                <span className="text-2xl font-bold text-slate-900 tracking-tight block mt-0.5">
                  3 SKUs
                </span>
                <span className="text-[11px] text-slate-500 font-normal block">
                  Approaching stockout threshold
                </span>
              </div>
            </div>

            {/* Red Downward Sparkline Curve */}
            <div className="w-20 h-9 flex items-center justify-end">
              <svg viewBox="0 0 80 32" className="w-full h-full overflow-visible">
                <path
                  d="M 2 8 Q 20 10, 35 18 T 58 14 T 78 28"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 2 8 Q 20 10, 35 18 T 58 14 T 78 28 L 78 32 L 2 32 Z"
                  fill="rgba(239, 68, 68, 0.12)"
                />
              </svg>
            </div>
          </div>

          <div className="h-[1px] bg-slate-100 my-3" />

          {/* Compact Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider text-left border-b border-slate-100/80">
                  <th className="pb-1.5 font-medium">SKU</th>
                  <th className="pb-1.5 font-medium text-center">Current Cover (Days)</th>
                  <th className="pb-1.5 font-medium text-right">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {AT_RISK_SKUS.slice(0, 3).map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2 font-semibold text-slate-800">{item.sku}</td>
                    <td className="py-2 text-center text-slate-600 font-medium">{item.coverDays}</td>
                    <td className="py-2 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.risk === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {item.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA Link */}
        <div className="pt-3 border-t border-slate-100 mt-2">
          <button
            type="button"
            onClick={onViewAtRiskSkus}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            <span>View All At-Risk SKUs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── CARD C: Procurement Opportunity ── */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
        <div>
          {/* Header Row: Badge, Title & Sparkline */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Procurement Opportunity
                </span>
                <span className="text-2xl font-bold text-slate-900 tracking-tight block mt-0.5">
                  12.4%
                </span>
                <span className="text-[11px] text-slate-500 font-normal block">
                  Potential sourcing cost savings
                </span>
              </div>
            </div>

            {/* Green Ascending Mini Bar Sparkline */}
            <div className="w-16 h-8 flex items-end justify-end gap-1">
              <span className="w-1.5 h-2.5 bg-emerald-400/80 rounded-xs inline-block" />
              <span className="w-1.5 h-4 bg-emerald-400/90 rounded-xs inline-block" />
              <span className="w-1.5 h-5.5 bg-emerald-500 rounded-xs inline-block" />
              <span className="w-1.5 h-7 bg-emerald-500 rounded-xs inline-block" />
              <span className="w-1.5 h-8 bg-emerald-600 rounded-xs inline-block" />
            </div>
          </div>

          <div className="h-[1px] bg-slate-100 my-3" />

          {/* Compact Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider text-left border-b border-slate-100/80">
                  <th className="pb-1.5 font-medium">Supplier</th>
                  <th className="pb-1.5 font-medium text-center">Current Cost</th>
                  <th className="pb-1.5 font-medium text-center">Optimized Cost</th>
                  <th className="pb-1.5 font-medium text-right">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {SUPPLIER_OPPORTUNITIES.slice(0, 3).map((item) => (
                  <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2 font-semibold text-slate-800">{item.name}</td>
                    <td className="py-2 text-center text-slate-600">{item.currentCost}</td>
                    <td className="py-2 text-center text-slate-600">{item.optimizedCost}</td>
                    <td className="py-2 text-right font-bold text-emerald-600">{item.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA Link */}
        <div className="pt-3 border-t border-slate-100 mt-2">
          <button
            type="button"
            onClick={onViewSourcingOptimization}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            <span>View Sourcing Optimization</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
