import React from 'react';
import { X, Globe, ShieldCheck, Box } from 'lucide-react';
import { ScenarioRegionalImpact } from '../../../types/domain/scenarioDecisionTwin';

interface RegionDetailDrawerProps {
  region: ScenarioRegionalImpact | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RegionDetailDrawer: React.FC<RegionDetailDrawerProps> = ({
  region,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !region) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {region.region} Regional Impact
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  region.status === 'At Risk'
                    ? 'bg-orange-50 text-orange-700 border-orange-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {region.status}
              </span>
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

        {/* Body */}
        <div className="p-6 space-y-5 flex-1 text-xs">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">
                Demand Shift
              </span>
              <div className="font-mono text-base font-bold text-slate-900 mt-1">
                {region.demandChange}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">
                Inventory Delta
              </span>
              <div className="font-mono text-base font-bold text-blue-600 mt-1">
                {region.inventoryNeed}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">
                Service Risk
              </span>
              <div
                className={`font-mono text-base font-bold mt-1 ${
                  region.serviceRisk === 'At Risk'
                    ? 'text-rose-600'
                    : region.serviceRisk === 'Medium'
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {region.serviceRisk}
              </div>
            </div>
          </div>

          {/* Network Flow Description */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
              <Box className="w-4 h-4 text-blue-600" />
              <span>Network Pressure Summary</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Under this scenario, {region.region} experiences a {region.demandChange} shift in projected order intake. Regional fulfillment hubs must adjust reorder points to prevent service degradation.
            </p>
          </div>

          {/* Recommended Response */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Recommended Operational Response</span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed">
              {region.recommendedResponse}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
