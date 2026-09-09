import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { SensingFilterOptions } from '../../../types/domain/demandSensing';

interface SensingFiltersProps {
  options: SensingFilterOptions;
  selectedPlant: string;
  selectedProduct: string;
  selectedRegion: string;
  selectedHorizon: string;
  onPlantChange: (plant: string) => void;
  onProductChange: (product: string) => void;
  onRegionChange: (region: string) => void;
  onHorizonChange: (horizon: string) => void;
}

export const SensingFilters: React.FC<SensingFiltersProps> = ({
  options,
  selectedPlant,
  selectedProduct,
  selectedRegion,
  selectedHorizon,
  onPlantChange,
  onProductChange,
  onRegionChange,
  onHorizonChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 select-none">
      {/* Plant Selector */}
      <div className="relative">
        <select
          value={selectedPlant}
          onChange={(e) => onPlantChange(e.target.value)}
          className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
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
          className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
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
          className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
        >
          {options.regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
      </div>

      {/* Horizon Selector */}
      <div className="relative">
        <div className="absolute left-2.5 top-2.5 pointer-events-none text-slate-400">
          <Calendar className="w-4 h-4" />
        </div>
        <select
          value={selectedHorizon}
          onChange={(e) => onHorizonChange(e.target.value)}
          className="h-9 pl-8 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
        >
          {options.horizons.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
      </div>
    </div>
  );
};
