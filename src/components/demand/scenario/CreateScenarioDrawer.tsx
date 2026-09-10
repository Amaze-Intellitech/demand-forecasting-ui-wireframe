import React, { useState } from 'react';
import { X, Sparkles, Sliders } from 'lucide-react';
import { ScenarioPreset } from '../../../types/domain/scenarioDecisionTwin';

interface CreateScenarioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newScenario: Partial<ScenarioPreset>) => void;
}

export const CreateScenarioDrawer: React.FC<CreateScenarioDrawerProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [demandChangePct, setDemandChangePct] = useState<number>(10);
  const [priceChangePct, setPriceChangePct] = useState<number>(0);
  const [rawMaterialChangePct, setRawMaterialChangePct] = useState<number>(0);
  const [supplyAvailabilityPct, setSupplyAvailabilityPct] = useState<number>(100);
  const [capacityChangePct, setCapacityChangePct] = useState<number>(100);
  const [promotionChangePct, setPromotionChangePct] = useState<number>(5);

  if (!isOpen) return null;

  // Dynamic preview calculations
  const projectedDemandNumeric = +(1.28 * (1 + demandChangePct / 100)).toFixed(2);
  const projectedRevenueNumeric = +(2.14 * (1 + (demandChangePct + priceChangePct) / 100)).toFixed(2);
  const projectedMarginNumeric = +(18.6 + priceChangePct * 0.4 - rawMaterialChangePct * 0.4).toFixed(1);
  const projectedServiceNumeric = +(97.8 - Math.max(0, demandChangePct - 10) * 0.2 - (100 - supplyAvailabilityPct) * 0.25).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      subtitle: `${demandChangePct >= 0 ? '+' : ''}${demandChangePct}% demand / ${priceChangePct >= 0 ? '+' : ''}${priceChangePct}% price`,
      description: description.trim() || 'Custom operational simulation.',
      assumptions: {
        demandChangePct,
        priceChangePct,
        rawMaterialChangePct,
        supplyAvailabilityPct,
        leadTimeChangeDays: 0,
        capacityChangePct,
        tariffChangePct: 0,
        promotionChangePct,
      },
      outcomes: {
        totalDemand: `${projectedDemandNumeric}M units`,
        totalDemandNumeric: projectedDemandNumeric,
        revenue: `$${projectedRevenueNumeric}B`,
        revenueNumeric: projectedRevenueNumeric,
        grossMargin: `${projectedMarginNumeric}%`,
        grossMarginNumeric: projectedMarginNumeric,
        serviceLevel: `${projectedServiceNumeric}%`,
        serviceLevelNumeric: projectedServiceNumeric,
        inventoryNeed: `${Math.round(862 * (1 + demandChangePct / 100))}K units`,
        inventoryNeedNumeric: Math.round(862 * (1 + demandChangePct / 100)),
        workingCapital: `$${(1.24 * (1 + demandChangePct / 150)).toFixed(2)}B`,
        workingCapitalNumeric: +(1.24 * (1 + demandChangePct / 150)).toFixed(2),
        costToServe: `$${(1.68 * (1 + demandChangePct / 120)).toFixed(2)}B`,
        emissionsChange: `${(demandChangePct * -0.1).toFixed(1)}%`,
        varianceVsBase: `${demandChangePct >= 0 ? '+' : ''}${demandChangePct.toFixed(1)}%`,
        varianceVsBaseNumeric: demandChangePct,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Create Scenario Twin
              </h3>
              <p className="text-xs text-slate-500">
                Define custom macro, pricing and supply assumptions
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 text-xs">
          {/* Identity */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Scenario Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q3 Packaging Surge with European Tariff"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Description & Thesis
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief executive thesis describing the rationale..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Assumption Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Driver Assumptions
            </span>

            {/* Demand Change */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Demand Change (%)</span>
                <span className="font-mono text-blue-600 font-bold">
                  {demandChangePct >= 0 ? `+${demandChangePct}` : demandChangePct}%
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="50"
                step="5"
                value={demandChangePct}
                onChange={(e) => setDemandChangePct(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Price Change */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Price Adjustment (%)</span>
                <span className="font-mono text-blue-600 font-bold">
                  {priceChangePct >= 0 ? `+${priceChangePct}` : priceChangePct}%
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                step="2"
                value={priceChangePct}
                onChange={(e) => setPriceChangePct(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Raw Material Cost Change */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Raw Material Inflation (%)</span>
                <span className="font-mono text-orange-600 font-bold">
                  {rawMaterialChangePct >= 0 ? `+${rawMaterialChangePct}` : rawMaterialChangePct}%
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="30"
                step="5"
                value={rawMaterialChangePct}
                onChange={(e) => setRawMaterialChangePct(Number(e.target.value))}
                className="w-full accent-orange-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Supply Availability */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Supply Availability (%)</span>
                <span className="font-mono text-slate-800 font-bold">
                  {supplyAvailabilityPct}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                step="5"
                value={supplyAvailabilityPct}
                onChange={(e) => setSupplyAvailabilityPct(Number(e.target.value))}
                className="w-full accent-slate-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Capacity Change */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Capacity Utilization Rate (%)</span>
                <span className="font-mono text-blue-600 font-bold">
                  {capacityChangePct}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                step="5"
                value={capacityChangePct}
                onChange={(e) => setCapacityChangePct(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Promotion Change */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Promotion Spend Change (%)</span>
                <span className="font-mono text-emerald-600 font-bold">
                  {promotionChangePct >= 0 ? `+${promotionChangePct}` : promotionChangePct}%
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="40"
                step="5"
                value={promotionChangePct}
                onChange={(e) => setPromotionChangePct(Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Simulated Outcomes Preview */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Simulated Twin Projection</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500">Projected Demand</span>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                  {projectedDemandNumeric}M units
                </div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500">Projected Revenue</span>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                  ${projectedRevenueNumeric}B
                </div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500">Gross Margin</span>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                  {projectedMarginNumeric}%
                </div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500">Service Level</span>
                <div className="font-mono font-bold text-emerald-700 text-sm mt-0.5">
                  {projectedServiceNumeric}%
                </div>
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              Create Scenario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
