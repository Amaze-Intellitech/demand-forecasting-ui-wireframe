import React from 'react';
import { Trophy } from 'lucide-react';
import { ForecastModelResult, ModelStatus } from '../../../types/domain/demandForecast';

interface ModelTournamentTableProps {
  models: ForecastModelResult[];
  selectedModelId?: string;
  onSelectModel: (model: ForecastModelResult) => void;
}

export const ModelTournamentTable: React.FC<ModelTournamentTableProps> = ({
  models,
  selectedModelId,
  onSelectModel,
}) => {
  const getStatusBadge = (status: ModelStatus) => {
    switch (status) {
      case 'Champion':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Trophy className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Champion</span>
          </span>
        );
      case 'Challenger':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-info-bg text-[#0062d2] border border-border">
            Challenger
          </span>
        );
      case 'Baseline':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
            Baseline
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs select-none">
        <thead>
          <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
            <th className="py-2.5 px-2.5 font-normal">Model</th>
            <th className="py-2.5 px-2.5 font-normal text-right">WAPE ↓</th>
            <th className="py-2.5 px-2.5 font-normal text-right">Bias</th>
            <th className="py-2.5 px-2.5 font-normal text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {models.map((model) => {
            const isSelected = selectedModelId === model.modelId;
            const isChampion = model.status === 'Champion';

            return (
              <tr
                key={model.modelId}
                onClick={() => onSelectModel(model)}
                className={`transition-colors cursor-pointer group ${
                  isSelected
                    ? 'bg-info-bg'
                    : isChampion
                    ? 'bg-emerald-50/30 hover:bg-emerald-50/60'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                <td className="py-2 px-2.5 font-medium text-slate-800 group-hover:text-[#0062d2] transition-colors whitespace-nowrap">
                  {model.modelName}
                </td>
                <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                  {model.wape}
                </td>
                <td className="py-2 px-2.5 text-right font-mono text-slate-600 whitespace-nowrap">
                  {model.bias}
                </td>
                <td className="py-2 px-2.5 text-right whitespace-nowrap">
                  {getStatusBadge(model.status)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
