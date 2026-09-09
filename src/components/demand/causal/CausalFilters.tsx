import React from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { CausalFilterOptions } from '../../../types/domain/causalIntelligence';

interface CausalFiltersProps {
  options: CausalFilterOptions;
  selectedPlant: string;
  selectedProduct: string;
  selectedRegion: string;
  selectedPeriod: string;
  onPlantChange: (plant: string) => void;
  onProductChange: (product: string) => void;
  onRegionChange: (region: string) => void;
  onPeriodChange: (period: string) => void;
  onRunAnalysis: () => void;
  isRunning?: boolean;
}

export const CausalFilters: React.FC<CausalFiltersProps> = ({
  options,
  selectedPlant,
  selectedProduct,
  selectedRegion,
  selectedPeriod,
  onPlantChange,
  onProductChange,
  onRegionChange,
  onPeriodChange,
  onRunAnalysis,
  isRunning,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 select-none">
      {/* Plant Selector */}
      <div className="relative">
        <select
          value={selectedPlant}
          onChange={(e) => onPlantChange(e.target.value)}
          className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer hover:border-slate-300 transition-colors"
        >
          {options.plants.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
      </div>

      {/* Product Selector */}
      <div className="relative">
        <select
          value={selectedProduct}
          onChange={(e) => onProductChange(e.target.value)}
          className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer hover:border-slate-300 transition-colors"
        >
          {options.products.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
      </div>

      {/* Region Selector */}
      <div className="relative">
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer hover:border-slate-300 transition-colors"
        >
          {options.regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
      </div>

      {/* Planning Period Selector */}
      <div className="relative">
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer hover:border-slate-300 transition-colors"
        >
          {options.periods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
      </div>

      {/* Run Causal Analysis Button */}
      <button
        type="button"
        onClick={onRunAnalysis}
        disabled={isRunning}
        className="h-9 px-3.5 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer disabled:opacity-75"
      >
        <Play className="w-3.5 h-3.5 fill-white" />
        <span>{isRunning ? 'Analyzing...' : 'Run Causal Analysis'}</span>
      </button>
    </div>
  );
};
