import React from 'react';
import {
  X,
  TrendingUp,
  ShieldAlert,
  Settings2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  AT_RISK_SKUS,
  SUPPLIER_OPPORTUNITIES,
  MONTHLY_DEMAND_OUTLOOK,
} from '../../data/demandIntelligenceMock';

// ── 1. Detailed Forecast Modal ──
export const DetailedForecastModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-info-bg text-primary border border-border flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                12-Month Detailed Demand Projection
              </h3>
              <p className="text-xs text-slate-500">
                Multi-horizon ensemble backtested model telemetry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Statistical Quality KPIs */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-slate-400 text-[10px] font-semibold uppercase">Accuracy</div>
              <div className="text-lg font-bold text-emerald-600 mt-0.5">94.2%</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-slate-400 text-[10px] font-semibold uppercase">MAPE</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">5.8%</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-slate-400 text-[10px] font-semibold uppercase">RMSE</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">14.7</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-slate-400 text-[10px] font-semibold uppercase">R² Fit</div>
              <div className="text-lg font-bold text-primary mt-0.5">0.93</div>
            </div>
          </div>

          {/* Monthly Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 font-semibold text-slate-800 text-[11px] uppercase tracking-wide">
              Forward 6-Month Projected Schedule
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-2">Period</th>
                  <th className="px-4 py-2 text-center">Type</th>
                  <th className="px-4 py-2 text-center">Projected Volume</th>
                  <th className="px-4 py-2 text-right">95% Confidence Band</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {MONTHLY_DEMAND_OUTLOOK.slice(6).map((item) => (
                  <tr key={item.period} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-medium text-slate-800">{item.period}</td>
                    <td className="px-4 py-2 text-center">
                      <span className="px-2 py-0.5 bg-info-bg text-deep rounded-md text-[10px] font-semibold">
                        {item.isToday ? 'Today (Anchor)' : 'Forecast'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center font-bold text-slate-900">
                      {item.forecast}K units
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-slate-500 text-[11px]">
                      {item.ciLower}K – {item.ciUpper}K
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-xl bg-info-bg border border-border text-deep flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              Prophet ensemble model fitted with yearly seasonality. Q3 projected peak requirements require forward procurement orders 6–8 weeks in advance.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

// ── 2. At-Risk SKUs Modal ──
export const AtRiskSkusModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Service Risk: Critical SKU Inventory Cover
              </h3>
              <p className="text-xs text-slate-500">
                Products approaching or breaching the 21-day minimum safety stock threshold
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">SKU & Description</th>
                  <th className="px-3 py-2.5 text-center">Days Cover</th>
                  <th className="px-3 py-2.5 text-center">On-Hand Stock</th>
                  <th className="px-3 py-2.5 text-center">Reorder Target</th>
                  <th className="px-3 py-2.5 text-right">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {AT_RISK_SKUS.map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{item.sku}</div>
                      <div className="text-[11px] text-slate-500">{item.name}</div>
                    </td>
                    <td className="px-3 py-3 text-center font-bold text-slate-800">
                      {item.coverDays} days
                    </td>
                    <td className="px-3 py-3 text-center text-slate-600">
                      {item.stockOnHand}
                    </td>
                    <td className="px-3 py-3 text-center text-slate-600">
                      {item.reorderTarget}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.risk === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.risk === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
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

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              Immediate recommendation: Expedite batch production for <strong>HDPE-9021</strong> to avoid stockouts in customer manufacturing line within 12 days.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

// ── 3. Sourcing Optimization Modal ──
export const SourcingOptimizationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Prescriptive Supplier Allocation & Sourcing ROI
              </h3>
              <p className="text-xs text-slate-500">
                PuLP Linear Programming solver allocation across cost, SLA and speed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Key ROI Banner */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-emerald-900">
              <div className="text-[10px] font-semibold uppercase text-emerald-700">Annual Savings</div>
              <div className="text-xl font-bold text-emerald-700 mt-0.5">$142,500</div>
              <div className="text-[10px] text-emerald-600">12.4% cost reduction</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] font-semibold uppercase text-slate-400">Weighted Lead Time</div>
              <div className="text-xl font-bold text-slate-900 mt-0.5">7.8 Days</div>
              <div className="text-[10px] text-slate-500">-2.3 days faster</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] font-semibold uppercase text-slate-400">Weighted SLA</div>
              <div className="text-xl font-bold text-slate-900 mt-0.5">91.4%</div>
              <div className="text-[10px] text-emerald-600">+3.6% reliability</div>
            </div>
          </div>

          {/* Supplier Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Supplier</th>
                  <th className="px-3 py-2.5 text-center">Allocation Share</th>
                  <th className="px-3 py-2.5 text-center">Current</th>
                  <th className="px-3 py-2.5 text-center">Optimized</th>
                  <th className="px-3 py-2.5 text-center">Lead Time</th>
                  <th className="px-3 py-2.5 text-right">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SUPPLIER_OPPORTUNITIES.map((sup) => (
                  <tr key={sup.name} className="hover:bg-slate-50/70">
                    <td className="px-4 py-2.5 font-bold text-slate-900">{sup.name}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                        {sup.share}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center text-slate-500">{sup.currentCost}</td>
                    <td className="px-3 py-2.5 text-center font-semibold text-slate-800">{sup.optimizedCost}</td>
                    <td className="px-3 py-2.5 text-center text-slate-600">{sup.leadDays} days</td>
                    <td className="px-3 py-2.5 text-right font-bold text-emerald-600">{sup.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 leading-relaxed">
            Mathematical allocation eliminates single-vendor dependencies through a tri-sourcing strategy (45% Supplier A, 35% Supplier B, 20% Supplier C), locking in contract volume discounts.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
