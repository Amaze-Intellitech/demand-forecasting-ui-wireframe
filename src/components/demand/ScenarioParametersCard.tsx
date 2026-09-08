import React from 'react';
import {
  Sliders,
  Package,
  Calendar,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { ScenarioParametersState } from '../../data/demandScenarioMock';

export interface ScenarioParametersCardProps {
  params: ScenarioParametersState;
  onChangeParam: (field: keyof ScenarioParametersState, val: number) => void;
  onReset: () => void;
}

export const ScenarioParametersCard: React.FC<ScenarioParametersCardProps> = ({
  params,
  onChangeParam,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] select-none">
      {/* Header */}
      <div className="pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Scenario Parameters
        </h3>
      </div>

      {/* Sliders & Reset Button Row */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-center">
        
        {/* 1. Price Change (-20% to +20%) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0062d2] flex items-center justify-center">
                <Sliders className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Price Change</span>
            </div>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              {params.priceChange > 0 ? `+${params.priceChange}%` : `${params.priceChange}%`}
            </span>
          </div>

          {/* Slider input */}
          <input
            type="range"
            min="-20"
            max="20"
            step="1"
            value={params.priceChange}
            onChange={(e) => onChangeParam('priceChange', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0062d2]"
          />

          {/* Ticks */}
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>-20%</span>
            <span>0%</span>
            <span>+20%</span>
          </div>
        </div>

        {/* 2. Demand Change (-20% to +50%) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Demand Change</span>
            </div>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              {params.demandChange > 0 ? `+${params.demandChange}%` : `${params.demandChange}%`}
            </span>
          </div>

          <input
            type="range"
            min="-20"
            max="50"
            step="1"
            value={params.demandChange}
            onChange={(e) => onChangeParam('demandChange', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0062d2]"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>-20%</span>
            <span>0%</span>
            <span>+50%</span>
          </div>
        </div>

        {/* 3. Seasonality Adjustment (-20% to +20%) */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 truncate">Seasonality</span>
            </div>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              {params.seasonalityAdjustment > 0
                ? `+${params.seasonalityAdjustment}%`
                : `${params.seasonalityAdjustment}%`}
            </span>
          </div>

          <input
            type="range"
            min="-20"
            max="20"
            step="1"
            value={params.seasonalityAdjustment}
            onChange={(e) => onChangeParam('seasonalityAdjustment', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0062d2]"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>-20%</span>
            <span>0%</span>
            <span>+20%</span>
          </div>
        </div>

        {/* 4. Target Service Level (80% to 99%) */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0062d2] flex items-center justify-center">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 truncate">Service Level</span>
            </div>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              {params.targetServiceLevel}%
            </span>
          </div>

          <input
            type="range"
            min="80"
            max="99"
            step="1"
            value={params.targetServiceLevel}
            onChange={(e) => onChangeParam('targetServiceLevel', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0062d2]"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>80%</span>
            <span>90%</span>
            <span>95%</span>
            <span>99%</span>
          </div>
        </div>

        {/* 5. Reset to Base Case Box */}
        <div className="lg:col-span-2 flex justify-center lg:justify-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-sky-200/90 bg-sky-50/50 hover:bg-sky-100/70 text-[#0062d2] text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#0062d2]" />
            <span className="text-[11px] font-bold">Reset to Base Case</span>
          </button>
        </div>

      </div>
    </div>
  );
};
