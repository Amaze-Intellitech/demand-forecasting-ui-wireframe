import React, { useState } from 'react';
import {
  Play,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
} from 'lucide-react';
import { WhatIfDriverOption } from '../../../types/domain/scenarioDecisionTwin';

interface WhatIfAnalysisCardProps {
  currentOutcome: WhatIfDriverOption;
  onRunSimulation: (driver: string, change: string) => void;
  isRunning?: boolean;
}

export const WhatIfAnalysisCard: React.FC<WhatIfAnalysisCardProps> = ({
  currentOutcome,
  onRunSimulation,
  isRunning = false,
}) => {
  const [selectedDriver, setSelectedDriver] = useState<string>('Price Index');
  const [selectedChange, setSelectedChange] = useState<string>('-10%');

  const driverOptions = [
    'Price Index',
    'Promotion Spend',
    'Raw Material Price',
    'Supply Availability',
  ];

  const changeOptions = [
    '-30%',
    '-20%',
    '-10%',
    '-5%',
    '+5%',
    '+10%',
    '+20%',
    '+30%',
  ];

  const handleRun = () => {
    onRunSimulation(selectedDriver, selectedChange);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          What-if Analysis
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          Instant sensitivity testing on single assumption variations
        </p>

        {/* Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          {/* Driver Selector */}
          <div className="relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Driver
            </label>
            <div className="relative">
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                aria-label="What-if Driver"
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-7 py-2 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
              >
                {driverOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Change Selector */}
          <div className="relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Change
            </label>
            <div className="relative">
              <select
                value={selectedChange}
                onChange={(e) => setSelectedChange(e.target.value)}
                aria-label="What-if Change"
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-7 py-2 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
              >
                {changeOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Run Action Button */}
          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className="w-full flex items-center justify-center gap-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75"
            >
              {isRunning ? (
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white" />
              )}
              <span>Run Simulation</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Outcome Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {/* Projected Demand */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-semibold text-slate-500 uppercase">
            Projected Demand
          </span>
          <div className="mt-1">
            <div className="font-mono text-base font-black text-slate-900 flex items-center gap-1">
              <span>{currentOutcome.projectedDemand}</span>
              {currentOutcome.demandDirection === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-600 inline" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-600 inline" />
              )}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              {currentOutcome.projectedDemandUnits}
            </div>
          </div>
        </div>

        {/* Revenue Impact */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-semibold text-slate-500 uppercase">
            Revenue Impact
          </span>
          <div className="mt-1">
            <div className="font-mono text-base font-black text-slate-900 flex items-center gap-1">
              <span>{currentOutcome.revenueImpact}</span>
              {currentOutcome.revenueDirection === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-600 inline" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-600 inline" />
              )}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              {currentOutcome.revenueImpactDollars}
            </div>
          </div>
        </div>

        {/* Margin Impact */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-semibold text-slate-500 uppercase">
            Margin Impact
          </span>
          <div className="mt-1">
            <div className="font-mono text-base font-black text-rose-600 flex items-center gap-1">
              <span>{currentOutcome.marginImpact}</span>
              {currentOutcome.marginDirection === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-600 inline" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-600 inline" />
              )}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              {currentOutcome.marginPoints}
            </div>
          </div>
        </div>

        {/* Service Level */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-semibold text-slate-500 uppercase">
            Service Level
          </span>
          <div className="mt-1">
            <div className="font-mono text-base font-black text-slate-900 flex items-center gap-1">
              <span>{currentOutcome.serviceLevel}</span>
              {currentOutcome.serviceDirection === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-600 inline" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-600 inline" />
              )}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              {currentOutcome.servicePoints}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
