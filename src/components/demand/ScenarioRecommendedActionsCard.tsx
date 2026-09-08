import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ScenarioRecommendedActionsCardProps {
  actions: string[];
}

export const ScenarioRecommendedActionsCard: React.FC<ScenarioRecommendedActionsCardProps> = ({
  actions,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
        <div>
          {/* Header */}
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Recommended Actions
            </h3>
          </div>

          {/* Numbered Actions List */}
          <div className="py-2.5 space-y-2.5">
            {actions.map((action, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {/* Number Circle Badge in Blue */}
                <div className="w-5.5 h-5.5 rounded-full bg-[#0062d2] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-[12.5px] text-slate-700 leading-snug font-medium">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action CTA */}
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0062d2] hover:bg-[#0051b3] active:bg-[#004294] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-sm shadow-blue-900/10 transition-all cursor-pointer"
          >
            <span>Run Advanced Scenario Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Analysis Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0062d2] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#0062d2]" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Scenario Execution Ready
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  The scenario simulation profile has been validated against enterprise constraints. Proceed to Prescriptive Sourcing to optimize procurement allocations.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-left space-y-1.5 font-mono text-slate-700 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Simulated Iterations:</span>
                  <strong>10,000 Monte Carlo Runs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Confidence Level:</span>
                  <strong className="text-emerald-600">95% VaR Certified</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Next Pipeline Step:</span>
                  <strong className="text-[#0062d2]">Prescriptive Sourcing</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate('/solutions/demand-intelligence/sourcing');
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#0062d2] text-white text-xs font-semibold hover:bg-[#0052b3] transition-colors"
                >
                  Proceed to Sourcing →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
