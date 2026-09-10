import React from 'react';
import { ChevronRight, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SupplyFilterOptions } from '../../../types/domain/supplyCapacityOptimization';

interface SupplyFiltersProps {
  filterOptions: SupplyFilterOptions;
  selectedPlant: string;
  onPlantChange: (plant: string) => void;
  selectedProduct: string;
  onProductChange: (product: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  onRunOptimization: () => void;
}

export const SupplyFilters: React.FC<SupplyFiltersProps> = ({
  filterOptions,
  selectedPlant,
  onPlantChange,
  selectedProduct,
  onProductChange,
  selectedRegion,
  onRegionChange,
  selectedPeriod,
  onPeriodChange,
  onRunOptimization,
}) => {
  return (
    <div className="mb-5 space-y-3">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
        <Link to="/solutions" className="hover:text-slate-800 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/solutions/demand-intelligence/executive" className="hover:text-slate-800 transition-colors">
          Demand Intelligence
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-600 font-semibold">Supply & Capacity Optimization</span>
      </nav>

      {/* Main Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-[28px] font-bold text-slate-900 tracking-tight leading-none">
            Supply & Capacity Optimization
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 font-normal">
            Optimize supply, capacity and network to meet demand efficiently.
          </p>
        </div>

        {/* Filters and CTA */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Plant Selector */}
          <div className="relative">
            <select
              value={selectedPlant}
              onChange={(e) => onPlantChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg px-3 py-2 pr-7 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs cursor-pointer"
            >
              {filterOptions.plants.map((plant) => (
                <option key={plant} value={plant}>
                  {plant}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Product Selector */}
          <div className="relative">
            <select
              value={selectedProduct}
              onChange={(e) => onProductChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg px-3 py-2 pr-7 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs cursor-pointer"
            >
              {filterOptions.products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Region Selector */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg px-3 py-2 pr-7 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs cursor-pointer"
            >
              {filterOptions.regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Period Selector */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg px-3 py-2 pr-7 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs cursor-pointer"
            >
              {filterOptions.periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Run Optimization Button */}
          <button
            type="button"
            onClick={onRunOptimization}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-100" />
            <span>Run Optimization</span>
          </button>
        </div>
      </div>
    </div>
  );
};
