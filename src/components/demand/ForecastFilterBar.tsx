import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ForecastFilterState,
  FORECAST_FILTER_OPTIONS,
} from '../../data/demandForecastMock';

export interface ForecastFilterBarProps {
  filters: ForecastFilterState;
  onChange: (field: keyof ForecastFilterState, value: string) => void;
}

export const ForecastFilterBar: React.FC<ForecastFilterBarProps> = ({
  filters,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 select-none">
      {/* 1. Plant Filter */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Plant
        </label>
        <div className="relative">
          <select
            value={filters.plant}
            onChange={(e) => onChange('plant', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {FORECAST_FILTER_OPTIONS.plants.map((p) => (
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
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {FORECAST_FILTER_OPTIONS.categories.map((c) => (
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
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {FORECAST_FILTER_OPTIONS.skus.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 4. Forecast Horizon */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Forecast Horizon
        </label>
        <div className="relative">
          <select
            value={filters.horizon}
            onChange={(e) => onChange('horizon', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {FORECAST_FILTER_OPTIONS.horizons.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 5. Planning View */}
      <div className="space-y-1 col-span-2 sm:col-span-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Planning View
        </label>
        <div className="relative">
          <select
            value={filters.planningView}
            onChange={(e) => onChange('planningView', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {FORECAST_FILTER_OPTIONS.planningViews.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
