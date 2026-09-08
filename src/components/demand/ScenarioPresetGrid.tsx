import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Coins,
  Tag,
  Sliders,
} from 'lucide-react';
import {
  SCENARIO_PRESETS,
  ScenarioPresetId,
} from '../../data/demandScenarioMock';

export interface ScenarioPresetGridProps {
  selectedPreset: ScenarioPresetId;
  onSelectPreset: (id: ScenarioPresetId) => void;
}

export const ScenarioPresetGrid: React.FC<ScenarioPresetGridProps> = ({
  selectedPreset,
  onSelectPreset,
}) => {
  const getIconAndStyle = (id: ScenarioPresetId) => {
    switch (id) {
      case 'base-case':
        return {
          icon: <BarChart3 className="w-5 h-5 text-[#0062d2]" />,
          iconBg: 'bg-blue-50 text-[#0062d2]',
        };
      case 'demand-surge':
        return {
          icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
          iconBg: 'bg-emerald-50 text-emerald-600',
        };
      case 'cost-inflation':
        return {
          icon: <Coins className="w-5 h-5 text-amber-600" />,
          iconBg: 'bg-amber-50 text-amber-600',
        };
      case 'price-shock':
        return {
          icon: <Tag className="w-5 h-5 text-rose-600" />,
          iconBg: 'bg-rose-50 text-rose-600',
        };
      case 'custom':
      default:
        return {
          icon: <Sliders className="w-5 h-5 text-[#0062d2]" />,
          iconBg: 'bg-blue-50 text-[#0062d2]',
        };
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 select-none">
      {SCENARIO_PRESETS.map((preset) => {
        const isSelected = selectedPreset === preset.id;
        const { icon, iconBg } = getIconAndStyle(preset.id);

        return (
          <div
            key={preset.id}
            onClick={() => onSelectPreset(preset.id)}
            className={`rounded-xl p-4 sm:p-5 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md ${
              isSelected
                ? 'bg-blue-50/30 border-2 border-[#0062d2]'
                : 'bg-white border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}
              >
                {icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight leading-tight truncate">
                  {preset.label}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  {preset.description}
                </p>
              </div>
            </div>

            {/* Right: Radio Selection Pill */}
            <div className="flex-shrink-0">
              <div
                className={`w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-2 border-[#0062d2]'
                    : 'border border-slate-300 bg-white'
                }`}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0062d2]" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
