import React from 'react';
import { Info } from 'lucide-react';
import { ScenarioTradeoff } from '../../../types/domain/scenarioDecisionTwin';

interface ScenarioTradeoffsCardProps {
  tradeoffs: ScenarioTradeoff[];
}

export const ScenarioTradeoffsCard: React.FC<ScenarioTradeoffsCardProps> = ({
  tradeoffs,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Scenario Trade-offs
        </h3>
        <p className="text-xs text-slate-500">
          Tension between service, working capital and operational costs
        </p>
      </div>

      {/* Trade-off Sliders / Indicators */}
      <div className="space-y-4 my-auto pt-1">
        {tradeoffs.map((item) => (
          <div key={item.dimension} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">{item.dimension}</span>
              <span className="font-mono font-bold text-slate-900">{item.value}</span>
            </div>

            {/* Slider track with position thumb indicator */}
            <div className="relative w-full h-2 bg-slate-100 rounded-full">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${item.progress}%`,
                  backgroundColor: item.color,
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs"
                style={{
                  left: `calc(${item.progress}% - 7px)`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Explainer Callout */}
      <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 flex items-start gap-2.5 mt-3">
        <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs text-sky-900 leading-relaxed font-medium">
          Higher demand increases revenue but requires additional inventory and supply capacity. Service level may be at risk if supply is constrained.
        </p>
      </div>
    </div>
  );
};
