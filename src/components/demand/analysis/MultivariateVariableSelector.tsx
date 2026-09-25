import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Sliders } from 'lucide-react';
import { ParameterMetadata } from '../../../types/analysisConfig';

interface MultivariateVariableSelectorProps {
  dependentId: string;
  independentIds: string[];
  onDependentChange: (id: string) => void;
  onIndependentChange: (ids: string[]) => void;
  dependentOptions: ParameterMetadata[];
  independentOptions: ParameterMetadata[];
  disabled?: boolean;
}

export const MultivariateVariableSelector: React.FC<MultivariateVariableSelectorProps> = ({
  dependentId,
  independentIds,
  onDependentChange,
  onIndependentChange,
  dependentOptions,
  independentOptions,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleDriver = (driverId: string) => {
    if (independentIds.includes(driverId)) {
      onIndependentChange(independentIds.filter((id) => id !== driverId));
    } else {
      onIndependentChange([...independentIds, driverId]);
    }
  };

  const handleSelectAll = () => {
    onIndependentChange(independentOptions.map((p) => p.id));
  };

  const handleClearAll = () => {
    // Keep at least the first driver or let validation handle empty
    onIndependentChange([]);
  };

  const allSelected = independentIds.length === independentOptions.length;

  return (
    <div className="flex flex-wrap items-center gap-3" ref={containerRef}>
      {/* 1. Dependent Variable (Y Target) */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span>Dependent Target (Y):</span>
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

      {/* 2. Independent Variables Multi-Select (X Explanatory Covariates) */}
      <div className="flex items-center gap-2 relative">
        <label className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-sky-600" />
          <span>Explanatory Drivers (X):</span>
        </label>

        {/* Multi-Select Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-label="Toggle Independent Variables Multi-select Menu"
          className="h-9 px-3.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer min-w-[200px] justify-between transition-colors"
        >
          <span className="truncate max-w-[190px]">
            {independentIds.length === 0 ? (
              <span className="text-amber-600 font-bold">No drivers selected</span>
            ) : allSelected ? (
              <span className="text-slate-800 font-bold">All Drivers ({independentIds.length})</span>
            ) : (
              <span>
                {independentIds.length} driver{independentIds.length > 1 ? 's' : ''} active
              </span>
            )}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Popover Menu */}
        {isOpen && (
          <div className="absolute top-10 left-0 sm:left-auto right-0 sm:right-auto z-50 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 mt-1 space-y-2.5 animate-in fade-in zoom-in-95 duration-100">
            {/* Popover Header & Fast Actions */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <span className="font-bold text-slate-900">
                Active Drivers ({independentIds.length}/{independentOptions.length})
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Scrollable Checkbox List */}
            <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
              {independentOptions.map((p) => {
                const isSelected = independentIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleToggleDriver(p.id)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-sky-50 text-sky-950 font-semibold'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate">{p.name}</span>
                    </div>
                    {p.unit && (
                      <span className="text-[10px] text-slate-400 font-normal flex-shrink-0">
                        {p.unit}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Done Action */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {independentIds.length} factors in model
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Driver Count Pill Badges */}
      <div className="hidden lg:flex items-center gap-1.5 flex-wrap">
        {independentIds.length === 0 ? (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            ⚠ Model requires at least 1 driver
          </span>
        ) : allSelected ? (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            Full Multivariate Covariate Vector (Active)
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Reduced Driver Subset ({independentIds.length})
          </span>
        )}
      </div>
    </div>
  );
};
