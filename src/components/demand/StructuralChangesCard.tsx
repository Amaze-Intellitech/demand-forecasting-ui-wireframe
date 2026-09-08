import React from 'react';
import { Lightbulb } from 'lucide-react';
import {
  STRUCTURAL_EVENTS,
  STRUCTURAL_INSIGHT,
} from '../../data/demandSignalsMock';

export const StructuralChangesCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Card Header */}
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Structural Changes
        </h3>
        <span className="text-[11px] font-medium text-slate-400">Regime Detection</span>
      </div>

      {/* Horizontal Timeline */}
      <div className="py-6 px-2">
        <div className="relative flex items-center justify-between">
          {/* Connecting Line */}
          <div className="absolute left-6 right-6 top-3 h-[2px] bg-slate-200 z-0" />

          {STRUCTURAL_EVENTS.map((evt) => {
            return (
              <div
                key={evt.year}
                className="relative z-10 flex flex-col items-center group cursor-default"
              >
                {/* Year at Top */}
                <span className="text-xs font-mono font-bold text-slate-700 mb-1.5">
                  {evt.year}
                </span>

                {/* Node Dot */}
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                    evt.isAccent
                      ? 'bg-emerald-500 border-emerald-200 ring-4 ring-emerald-50'
                      : 'bg-[#0062d2] border-white ring-2 ring-slate-200'
                  }`}
                />

                {/* Event Label Below */}
                <span
                  className={`text-[11px] font-medium mt-2 text-center max-w-[75px] leading-tight ${
                    evt.isAccent ? 'text-emerald-700 font-bold' : 'text-slate-600'
                  }`}
                >
                  {evt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* What Changed? Callout Container */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3">
        {/* Lightbulb Icon Badge */}
        <div className="w-8 h-8 rounded-lg bg-amber-100/90 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-amber-700 shadow-xs">
          <Lightbulb className="w-4 h-4" />
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-900 tracking-tight">
            {STRUCTURAL_INSIGHT.title}
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
            {STRUCTURAL_INSIGHT.description}
          </p>
        </div>
      </div>
    </div>
  );
};
