import React, { useState } from 'react';
import { Play, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import {
  WhatIfSupplyParams,
  WhatIfSupplyResult,
} from '../../../types/domain/supplyCapacityOptimization';

interface WhatIfSupplyAnalysisProps {
  initialResult: WhatIfSupplyResult;
  onSimulate: (params: WhatIfSupplyParams) => WhatIfSupplyResult;
}

export const WhatIfSupplyAnalysis: React.FC<WhatIfSupplyAnalysisProps> = ({
  initialResult,
  onSimulate,
}) => {
  const [adjustment, setAdjustment] = useState<string>('Increase Capacity');
  const [plant, setPlant] = useState<string>('Columbus #04');
  const [changePercent, setChangePercent] = useState<string>('+10%');
  const [result, setResult] = useState<WhatIfSupplyResult>(initialResult);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleRun = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const outcome = onSimulate({ adjustment, plant, changePercent });
      setResult(outcome);
      setIsSimulating(false);
    }, 280);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">
          What-if Analysis
        </h2>
        <span className="text-[11px] text-slate-500 font-medium">
          Real-time Capacity Twin
        </span>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3.5">
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Adjustment
          </label>
          <div className="relative">
            <select
              value={adjustment}
              onChange={(e) => setAdjustment(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-2.5 py-1.5 pr-6 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="Increase Capacity">Increase Capacity</option>
              <option value="Shift Production">Shift Production</option>
              <option value="Raw Material Delay">Raw Material Delay</option>
              <option value="Maintenance Outage">Maintenance Outage</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Plant
          </label>
          <div className="relative">
            <select
              value={plant}
              onChange={(e) => setPlant(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-2.5 py-1.5 pr-6 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="Columbus #04">Columbus #04</option>
              <option value="Düsseldorf #01">Düsseldorf #01</option>
              <option value="Jurong Island">Jurong Island</option>
              <option value="Houston #03">Houston #03</option>
              <option value="Antwerp #02">Antwerp #02</option>
              <option value="All Plants">All Plants</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Change
          </label>
          <div className="relative">
            <select
              value={changePercent}
              onChange={(e) => setChangePercent(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-2.5 py-1.5 pr-6 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="+5%">+5%</option>
              <option value="+10%">+10%</option>
              <option value="+15%">+15%</option>
              <option value="+20%">+20%</option>
              <option value="-10%">-10%</option>
              <option value="-20%">-20%</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleRun}
            disabled={isSimulating}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer disabled:opacity-75"
          >
            {isSimulating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isSimulating ? 'Simulating' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Outcome 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Demand Fulfillment */}
        <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-200/70 flex flex-col justify-between">
          <span className="text-[10px] font-medium text-slate-500 leading-tight">
            Demand Fulfillment
          </span>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold text-emerald-600 tracking-tight">
              {result.demandFulfillment.value}
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        {/* Incremental Supply */}
        <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-200/70 flex flex-col justify-between">
          <span className="text-[10px] font-medium text-slate-500 leading-tight">
            Incremental Supply
          </span>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold text-emerald-600 tracking-tight">
              {result.incrementalSupply.value}
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        {/* Supply Cost Impact */}
        <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-200/70 flex flex-col justify-between">
          <span className="text-[10px] font-medium text-slate-500 leading-tight">
            Supply Cost Impact
          </span>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold text-rose-600 tracking-tight">
              {result.supplyCostImpact.value}
            </span>
            <TrendingDown className="w-4 h-4 text-rose-500" />
          </div>
        </div>

        {/* Service Level */}
        <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-200/70 flex flex-col justify-between">
          <span className="text-[10px] font-medium text-slate-500 leading-tight">
            Service Level
          </span>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold text-emerald-600 tracking-tight">
              {result.serviceLevel.value}
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
