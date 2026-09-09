import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ForecastModelResult } from '../../../types/domain/demandForecast';
import { ModelTournamentTable } from './ModelTournamentTable';

interface ModelTournamentCardProps {
  models: ForecastModelResult[];
  selectedModelId?: string;
  onSelectModel: (model: ForecastModelResult) => void;
  onViewComparison: () => void;
}

export const ModelTournamentCard: React.FC<ModelTournamentCardProps> = ({
  models,
  selectedModelId,
  onSelectModel,
  onViewComparison,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Model Performance Tournament
          </h3>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            6 Models Active
          </span>
        </div>

        {/* Table */}
        <div className="mt-1">
          <ModelTournamentTable
            models={models}
            selectedModelId={selectedModelId}
            onSelectModel={onSelectModel}
          />
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <button
          type="button"
          onClick={onViewComparison}
          className="text-xs font-semibold text-[#0062d2] hover:text-blue-700 flex items-center gap-1 transition-colors group cursor-pointer"
        >
          <span>View Detailed Model Comparison</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
