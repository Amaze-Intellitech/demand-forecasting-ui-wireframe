import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  SourcingFilterState,
  SOURCING_FILTER_OPTIONS,
} from '../../data/demandSourcingMock';

export interface SourcingFilterBarProps {
  filters: SourcingFilterState;
  onChange: (field: keyof SourcingFilterState, value: string) => void;
}

export const SourcingFilterBar: React.FC<SourcingFilterBarProps> = ({
  filters,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 select-none">
      {/* 1. Plant */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Plant
        </label>
        <div className="relative">
          <select
            value={filters.plant}
            onChange={(e) => onChange('plant', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer truncate"
          >
            {SOURCING_FILTER_OPTIONS.plants.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 2. Product Category */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Product Category
        </label>
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer truncate"
          >
            {SOURCING_FILTER_OPTIONS.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 3. Product / SKU */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Product / SKU
        </label>
        <div className="relative">
          <select
            value={filters.sku}
            onChange={(e) => onChange('sku', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer truncate"
          >
            {SOURCING_FILTER_OPTIONS.skus.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 4. Time Horizon */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Time Horizon
        </label>
        <div className="relative">
          <select
            value={filters.timeHorizon}
            onChange={(e) => onChange('timeHorizon', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer truncate"
          >
            {SOURCING_FILTER_OPTIONS.timeHorizons.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 5. Scenario */}
      <div className="space-y-1 col-span-2 sm:col-span-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Scenario
        </label>
        <div className="relative">
          <select
            value={filters.scenario}
            onChange={(e) => onChange('scenario', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer truncate"
          >
            {SOURCING_FILTER_OPTIONS.scenarios.map((sc) => (
              <option key={sc} value={sc}>
                {sc}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
