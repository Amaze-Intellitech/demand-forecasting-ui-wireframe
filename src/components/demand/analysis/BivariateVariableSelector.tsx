import React from 'react';
import { ArrowRight, ChevronDown, Layers } from 'lucide-react';
import { ParameterMetadata } from '../../../types/analysisConfig';

interface BivariateVariableSelectorProps {
  dependentId: string;
  independentId: string; // 'all' or specific parameter id
  onDependentChange: (id: string) => void;
  onIndependentChange: (id: string) => void;
  dependentOptions: ParameterMetadata[];
  independentOptions: ParameterMetadata[];
  disabled?: boolean;
}

export const BivariateVariableSelector: React.FC<BivariateVariableSelectorProps> = ({
  dependentId,
  independentId,
  onDependentChange,
  onIndependentChange,
  dependentOptions,
  independentOptions,
  disabled = false,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 1. Dependent Variable (Y Target) */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span>Dependent Variable (Y):</span>
        </label>
        <div className="relative">
          <select
            value={dependentId}
            onChange={(e) => onDependentChange(e.target.value)}
            disabled={disabled}
            aria-label="Select Dependent Target Variable"
            className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-slate-300 transition-colors cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed max-w-[240px] truncate"
          >
            {dependentOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.unit ? `(${p.unit})` : ''}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Relationship Divider Icon */}
      <div className="hidden sm:flex items-center text-slate-400">
        <ArrowRight className="w-3.5 h-3.5" />
      </div>

      {/* 2. Independent Variable (X Driver) */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>Independent Variable (X):</span>
        </label>
        <div className="relative">
          <select
            value={independentId}
            onChange={(e) => onIndependentChange(e.target.value)}
            disabled={disabled}
            aria-label="Select Independent Explanatory Driver"
            className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 hover:border-slate-300 transition-colors cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed max-w-[270px] truncate"
          >
            <option value="all">
              ⚡ All Ingested Drivers ({independentOptions.length} Drivers &bull; Pairwise)
            </option>
            <optgroup label="Specific Drivers">
              {independentOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.unit ? `(${p.unit})` : ''}
                </option>
              ))}
            </optgroup>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Mode Badge indicator */}
      <div className="hidden md:flex items-center">
        {independentId === 'all' ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Analyzing All Pairwise Drivers
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Pairwise Focus Mode Active
          </span>
        )}
      </div>
    </div>
  );
};
