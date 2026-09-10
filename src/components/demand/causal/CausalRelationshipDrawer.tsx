import React from 'react';
import {
  X,
  Network,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertCircle,
  Sliders,
} from 'lucide-react';
import { CausalNetworkNode } from '../../../types/domain/causalIntelligence';

interface CausalRelationshipDrawerProps {
  node: CausalNetworkNode | null;
  isOpen: boolean;
  onClose: () => void;
  onSimulateScenario: (nodeName: string) => void;
}

export const CausalRelationshipDrawer: React.FC<CausalRelationshipDrawerProps> = ({
  node,
  isOpen,
  onClose,
  onSimulateScenario,
}) => {
  if (!isOpen || !node) return null;

  const isNegative = node.direction === 'Negative';
  const cleanName = node.label.replace('\n', ' ');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  Causal Edge
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    isNegative
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {node.impactValue} Effect
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-2.5 leading-snug">
              {cleanName} → Demand
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <Network className="w-3.5 h-3.5 text-slate-400" />
              <span>Directed Causal Relationship</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Impact & Confidence */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  {isNegative ? (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                  ) : (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  <span>Estimated Impact</span>
                </div>
                <div className={`text-xl font-extrabold font-mono ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {node.impactValue}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Attribution Confidence</span>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900">
                  {node.confidence}%
                </div>
              </div>
            </div>

            {/* Evidence Window */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-800 text-xs">
                Empirical Evidence Window
              </div>
              <div className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-200/80">
                <div className="flex justify-between">
                  <span className="text-slate-400">Analysis Horizon:</span>
                  <span className="font-medium text-slate-800">Jan 2020 – Dec 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Operating Facility:</span>
                  <span className="font-medium text-slate-800">Columbus Plant #04</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Segment:</span>
                  <span className="font-medium text-slate-800">HDPE Resin Wholesale</span>
                </div>
              </div>
            </div>

            {/* Methodology Note */}
            <div className="p-3.5 bg-info-bg border border-border rounded-xl space-y-1.5">
              <div className="text-[11px] font-bold text-deep flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#0062d2]" />
                <span>Modeled Causal Estimate</span>
              </div>
              <p className="text-[11px] text-deep leading-relaxed">
                Relationship derived using structural causal modeling with instrumental variables to isolate counterfactual treatment effects from simple observational correlations.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onSimulateScenario(cleanName);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulate in Scenario Studio</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
