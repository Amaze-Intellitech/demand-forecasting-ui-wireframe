import React from 'react';
import { ChevronDown, Sliders } from 'lucide-react';
import { InventoryFilterOptions } from '../../../types/domain/inventoryIntelligence';

interface InventoryFiltersProps {
  options: InventoryFilterOptions;
  selectedPlant: string;
  selectedProduct: string;
  selectedRegion: string;
  selectedPeriod: string;
  onPlantChange: (val: string) => void;
  onProductChange: (val: string) => void;
  onRegionChange: (val: string) => void;
  onPeriodChange: (val: string) => void;
  onViewScenarios: () => void;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  options,
  selectedPlant,
  selectedProduct,
  selectedRegion,
  selectedPeriod,
  onPlantChange,
  onProductChange,
  onRegionChange,
  onPeriodChange,
  onViewScenarios,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Plant Selector */}
      <div className="relative">
        <select
          value={selectedPlant}
          onChange={(e) => onPlantChange(e.target.value)}
          aria-label="Filter by Plant"
          className="appearance-none bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 shadow-2xs hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {options.plants.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Product Selector */}
      <div className="relative">
        <select
          value={selectedProduct}
          onChange={(e) => onProductChange(e.target.value)}
          aria-label="Filter by Product"
          className="appearance-none bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 shadow-2xs hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {options.products.map((pr) => (
            <option key={pr} value={pr}>
              {pr}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Region Selector */}
      <div className="relative">
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          aria-label="Filter by Region"
          className="appearance-none bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 shadow-2xs hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {options.regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Planning Period Selector */}
      <div className="relative">
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          aria-label="Filter by Planning Period"
          className="appearance-none bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 shadow-2xs hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {options.periods.map((pe) => (
            <option key={pe} value={pe}>
              {pe}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* View Scenarios Action Button */}
      <button
        type="button"
        onClick={onViewScenarios}
        className="flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
      >
        <Sliders className="w-3.5 h-3.5" />
        <span>View Scenarios</span>
      </button>
    </div>
  );
};
