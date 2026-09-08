import React from 'react';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { SOURCING_RISK_DIMENSIONS } from '../../data/demandSourcingMock';

export const SourcingRiskAnalysisCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Risk Analysis
          </h3>
          <span className="text-xs text-slate-400 font-normal">
            (Multi-Factor Exposure Assessment)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Updated Hourly</span>
        </div>
      </div>

      {/* 3 Risk Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
        {SOURCING_RISK_DIMENSIONS.map((dim) => {
          const isLow = dim.status === 'Low';

          return (
            <div
              key={dim.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-2 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  {dim.title}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isLow
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  }`}
                >
                  {dim.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {dim.description}
              </p>

              <div className="pt-2 border-t border-slate-200/50 flex items-center gap-1.5 text-[10px] text-slate-400">
                {isLow ? (
                  <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                )}
                <span>
                  {isLow
                    ? 'Within safe tolerance threshold'
                    : 'Mitigation buffer recommended'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Aggregate Portfolio Risk: <strong className="text-emerald-600 font-semibold">Managed</strong></span>
        <span>Hedging Recommendation: <strong>Quarterly Collar</strong></span>
      </div>
    </div>
  );
};
