import React from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { ParameterMetadata } from '../../../types/analysisConfig';

interface AnalysisParameterSelectProps {
  label?: string;
  selectedId: string;
  onChange: (id: string) => void;
  parameters: ParameterMetadata[];
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const AnalysisParameterSelect: React.FC<AnalysisParameterSelectProps> = ({
  label,
  selectedId,
  onChange,
  parameters,
  disabled = false,
  className = '',
  id = 'analysis-param-select',
}) => {
  // Group parameters by category
  const categories = Array.from(new Set(parameters.map((p) => p.category)));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
          <span>{label}:</span>
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-slate-300 transition-colors cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed max-w-[280px] truncate"
        >
          {categories.map((category) => (
            <optgroup key={category} label={category}>
              {parameters
                .filter((p) => p.category === category)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.unit ? `(${p.unit})` : ''}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
      </div>
    </div>
  );
};
