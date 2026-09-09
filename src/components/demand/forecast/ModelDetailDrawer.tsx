import React from 'react';
import {
  X,
  Trophy,
  Cpu,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sliders,
} from 'lucide-react';
import { ForecastModelResult } from '../../../types/domain/demandForecast';

interface ModelDetailDrawerProps {
  model: ForecastModelResult | null;
  isOpen: boolean;
  onClose: () => void;
  onSetPlanningModel: (modelId: string) => void;
  activePlanningModelId: string;
}

export const ModelDetailDrawer: React.FC<ModelDetailDrawerProps> = ({
  model,
  isOpen,
  onClose,
  onSetPlanningModel,
  activePlanningModelId,
}) => {
  if (!isOpen || !model) return null;

  const isCurrentPlanning = activePlanningModelId === model.modelId;
  const isChampion = model.status === 'Champion';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {model.modelId}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                    isChampion
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-sky-50 text-[#0062d2] border-sky-200'
                  }`}
                >
                  {isChampion && <Trophy className="w-3 h-3 text-amber-500 fill-amber-500" />}
                  {model.status}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-2.5 leading-snug">
              {model.modelName}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1.5">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                {model.architectureType}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Horizon: {model.forecastHorizon}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Accuracy & Bias Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5">
                  Forecast WAPE
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900">
                  {model.wape}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                  Lowest error across 12M
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5">
                  Forecast Bias
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900">
                  {model.bias}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Within ±2% threshold
                </div>
              </div>
            </div>

            {/* Model Architecture & Specs */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="font-bold text-slate-800 text-xs">
                Tournament Evaluation Details
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/80">
                <div>
                  <span className="text-slate-400">Training Period:</span>
                  <div className="font-medium text-slate-700">{model.trainingPeriod}</div>
                </div>
                <div>
                  <span className="text-slate-400">Model Complexity:</span>
                  <div className="font-medium text-slate-700">{model.complexity}</div>
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Model Strengths</span>
              </div>
              <p className="text-slate-600 leading-relaxed bg-emerald-50/40 p-3 rounded-lg border border-emerald-100 text-xs">
                {model.strengths}
              </p>
            </div>

            {/* Limitations */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Operational Limitations</span>
              </div>
              <p className="text-slate-600 leading-relaxed bg-amber-50/40 p-3 rounded-lg border border-amber-100 text-xs">
                {model.limitations}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onSetPlanningModel(model.modelId);
                onClose();
              }}
              disabled={isCurrentPlanning}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5 ${
                isCurrentPlanning
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#0062d2] hover:bg-blue-700 text-white cursor-pointer'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isCurrentPlanning ? 'Current Planning Model' : 'Use as Planning Model'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
