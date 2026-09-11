import React from 'react';
import { ChevronDown } from 'lucide-react';
import { HIERARCHY_OPTIONS } from '../../data/demandIntelligenceMock';

export interface HierarchyFiltersProps {
  enterprise: string;
  division: string;
  plant: string;
  category: string;
  sku: string;
  onChange: (field: string, value: string) => void;
}

export const HierarchyFilters: React.FC<HierarchyFiltersProps> = ({
  enterprise,
  division,
  plant,
  category,
  sku,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 select-none">
      
      {/* 1. Enterprise Filter */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Enterprise
        </label>
        <div className="relative">
          <select
            value={enterprise}
            onChange={(e) => onChange('enterprise', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {HIERARCHY_OPTIONS.enterprises.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 2. Division Filter */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Division
        </label>
        <div className="relative">
          <select
            value={division}
            onChange={(e) => onChange('division', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {HIERARCHY_OPTIONS.divisions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 3. Plant Filter */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Plant
        </label>
        <div className="relative">
          <select
            value={plant}
            onChange={(e) => onChange('plant', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {HIERARCHY_OPTIONS.plants.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 4. Product Category Filter */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Product Category
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {HIERARCHY_OPTIONS.productCategories.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 5. Product / SKU Filter */}
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
          Product / SKU
        </label>
        <div className="relative">
          <select
            value={sku}
            onChange={(e) => onChange('sku', e.target.value)}
            className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer truncate"
          >
            {HIERARCHY_OPTIONS.skus.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

    </div>
  );
};
