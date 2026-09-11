import React from 'react';
import {
  X,
  CheckCircle,
  Copy,
  DollarSign,
  Percent,
  ShieldCheck,
  Box,
  Coins,
} from 'lucide-react';
import { ScenarioPreset } from '../../../types/domain/scenarioDecisionTwin';

interface ScenarioDetailDrawerProps {
  scenario: ScenarioPreset | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  onDuplicate: (id: string) => void;
  onApplyToPlanning: (id: string) => void;
}

export const ScenarioDetailDrawer: React.FC<ScenarioDetailDrawerProps> = ({
  scenario,
  isOpen,
  onClose,
  onSelect,
  onDuplicate,
  onApplyToPlanning,
}) => {
  if (!isOpen || !scenario) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-black text-slate-900">
                {scenario.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-info-bg text-deep border border-border">
                {scenario.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {scenario.subtitle} • Created {scenario.createdAt}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 flex-1 text-xs">
          {/* Description */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="font-bold text-slate-800 text-xs">Strategic Thesis</div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {scenario.description}
            </p>
          </div>

          {/* Key Outcomes Grid */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Simulated Outcomes
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <DollarSign className="w-3 h-3 text-blue-600" />
                  <span>Projected Revenue</span>
                </div>
                <div className="font-mono font-bold text-slate-900 text-base mt-0.5">
                  {scenario.outcomes.revenue}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Percent className="w-3 h-3 text-emerald-600" />
                  <span>Gross Margin</span>
                </div>
                <div className="font-mono font-bold text-slate-900 text-base mt-0.5">
                  {scenario.outcomes.grossMargin}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Service Level</span>
                </div>
                <div className="font-mono font-bold text-slate-900 text-base mt-0.5">
                  {scenario.outcomes.serviceLevel}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Coins className="w-3 h-3 text-blue-600" />
                  <span>Working Capital</span>
                </div>
                <div className="font-mono font-bold text-slate-900 text-base mt-0.5">
                  {scenario.outcomes.workingCapital}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Box className="w-3 h-3 text-blue-600" />
                  <span>Inventory Need</span>
                </div>
                <div className="font-mono font-bold text-slate-900 text-base mt-0.5">
                  {scenario.outcomes.inventoryNeed}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <span>Variance vs. Base</span>
                </div>
                <div
                  className={`font-mono font-bold text-base mt-0.5 ${
                    scenario.outcomes.varianceVsBaseNumeric >= 0
                      ? 'text-emerald-600'
                      : 'text-rose-600'
                  }`}
                >
                  {scenario.outcomes.varianceVsBase}
                </div>
              </div>
            </div>
          </div>

          {/* Assumption Parameter Values */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Configured Assumption Levers
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-600 font-sans">Demand Shift:</span>
                <span className="font-bold">
                  {scenario.assumptions.demandChangePct >= 0 ? '+' : ''}
                  {scenario.assumptions.demandChangePct}%
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-600 font-sans">Price Adjust:</span>
                <span className="font-bold">
                  {scenario.assumptions.priceChangePct >= 0 ? '+' : ''}
                  {scenario.assumptions.priceChangePct}%
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-600 font-sans">Raw Material:</span>
                <span className="font-bold">
                  {scenario.assumptions.rawMaterialChangePct >= 0 ? '+' : ''}
                  {scenario.assumptions.rawMaterialChangePct}%
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-600 font-sans">Supply Avail:</span>
                <span className="font-bold">
                  {scenario.assumptions.supplyAvailabilityPct}%
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-600 font-sans">Capacity Rate:</span>
                <span className="font-bold">
                  {scenario.assumptions.capacityChangePct}%
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-600 font-sans">Promo Spend:</span>
                <span className="font-bold">
                  {scenario.assumptions.promotionChangePct >= 0 ? '+' : ''}
                  {scenario.assumptions.promotionChangePct}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onDuplicate(scenario.id);
              onClose();
            }}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Duplicate</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onApplyToPlanning(scenario.id);
              onClose();
            }}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Apply to Planning</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelect(scenario.id);
              onClose();
            }}
            className="flex-1 py-2 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs cursor-pointer text-center"
          >
            Make Active Scenario
          </button>
        </div>
      </div>
    </div>
  );
};
