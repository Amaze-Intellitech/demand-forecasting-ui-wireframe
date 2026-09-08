import React, { useState } from 'react';
import { Settings, ChevronDown, Check } from 'lucide-react';
import {
  FORECAST_MODELS,
  ForecastModelInfo,
} from '../../data/demandForecastMock';

export const ForecastModelPanel: React.FC = () => {
  const [selectedModelKey, setSelectedModelKey] = useState<string>('xgboost');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const currentModel: ForecastModelInfo =
    FORECAST_MODELS[selectedModelKey] || FORECAST_MODELS['xgboost'];

  const modelOptions = [
    { key: 'xgboost', label: 'XGBoost (Selected)' },
    { key: 'prophet', label: 'Prophet' },
    { key: 'holt-winters', label: 'Holt-Winters' },
    { key: 'naive', label: 'Naive Baseline' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between relative">
      {/* Header with Selector */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 relative">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#0062d2]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Forecast Model
          </h3>
        </div>

        {/* Model Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>{currentModel.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Popover */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              {modelOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setSelectedModelKey(opt.key);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    selectedModelKey === opt.key
                      ? 'bg-blue-50 text-[#0062d2] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedModelKey === opt.key && (
                    <Check className="w-3.5 h-3.5 text-[#0062d2]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Model Spec Table */}
      <div className="py-2.5 divide-y divide-slate-100 text-xs">
        <div className="py-2 flex items-center justify-between">
          <span className="text-slate-500 font-medium">Model Type</span>
          <span className="font-semibold text-slate-900 font-mono text-right">{currentModel.modelType}</span>
        </div>

        <div className="py-2 flex items-center justify-between">
          <span className="text-slate-500 font-medium">Training Period</span>
          <span className="font-semibold text-slate-800 text-right">{currentModel.trainingPeriod}</span>
        </div>

        <div className="py-2 flex items-center justify-between">
          <span className="text-slate-500 font-medium">Forecast Horizon</span>
          <span className="font-semibold text-slate-800 text-right">{currentModel.horizon}</span>
        </div>

        <div className="py-2 flex items-start justify-between gap-2">
          <span className="text-slate-500 font-medium flex-shrink-0">Key Drivers</span>
          <span className="font-medium text-slate-800 text-right leading-tight max-w-[200px]">
            {currentModel.keyDrivers}
          </span>
        </div>

        <div className="py-2 flex items-center justify-between">
          <span className="text-slate-500 font-medium">Last Trained</span>
          <span className="font-semibold text-slate-800 text-right font-mono">{currentModel.lastTrained}</span>
        </div>

        <div className="py-2 flex items-center justify-between">
          <span className="text-slate-500 font-medium">Model Status</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{currentModel.status}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
