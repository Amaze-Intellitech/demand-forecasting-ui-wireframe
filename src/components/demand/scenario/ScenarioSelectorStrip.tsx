import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Activity,
  AlertTriangle,
  Settings,
  Plus,
  MoreVertical,
  Copy,
  Trash2,
} from 'lucide-react';
import { ScenarioPreset } from '../../../types/domain/scenarioDecisionTwin';

interface ScenarioSelectorStripProps {
  scenarios: ScenarioPreset[];
  selectedScenarioId: string;
  onSelectScenario: (id: string) => void;
  onAddScenario: () => void;
  onDuplicateScenario?: (id: string) => void;
  onDeleteScenario?: (id: string) => void;
}

export const ScenarioSelectorStrip: React.FC<ScenarioSelectorStripProps> = ({
  scenarios,
  selectedScenarioId,
  onSelectScenario,
  onAddScenario,
  onDuplicateScenario,
  onDeleteScenario,
}) => {
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);

  const getIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = 'w-5 h-5';
    switch (iconName) {
      case 'barChart':
        return (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
            }`}
          >
            <BarChart3 className={iconClass} />
          </div>
        );
      case 'trendingUp':
        return (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            <TrendingUp className={iconClass} />
          </div>
        );
      case 'activity':
        return (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isSelected ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'
            }`}
          >
            <Activity className={iconClass} />
          </div>
        );
      case 'alertTriangle':
        return (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isSelected ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600'
            }`}
          >
            <AlertTriangle className={iconClass} />
          </div>
        );
      case 'settings':
      default:
        return (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isSelected ? 'bg-white/20 text-white' : 'bg-sky-50 text-sky-600'
            }`}
          >
            <Settings className={iconClass} />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 select-none">
      {scenarios.map((scenario) => {
        const isSelected = scenario.id === selectedScenarioId;

        return (
          <div
            key={scenario.id}
            onClick={() => onSelectScenario(scenario.id)}
            className={`relative rounded-xl p-3.5 transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
              isSelected
                ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-md shadow-sky-600/20'
                : 'bg-white text-slate-900 border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            {/* Top Row: Icon & Status Indicator / Options */}
            <div className="flex items-start justify-between">
              {getIcon(scenario.iconName, isSelected)}

              <div className="flex items-center gap-1.5">
                {/* Active Indicator Dot */}
                {isSelected ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-white/20 animate-pulse" />
                ) : scenario.status === 'Recommended' ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Rec
                  </span>
                ) : null}

                {/* More options menu button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === scenario.id ? null : scenario.id);
                    }}
                    className={`p-1 rounded-md transition-colors ${
                      isSelected
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>

                  {/* Context dropdown menu */}
                  {activeMenuId === scenario.id && (
                    <div
                      className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-30 text-xs text-slate-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onDuplicateScenario?.(scenario.id);
                          setActiveMenuId(null);
                        }}
                        className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Duplicate</span>
                      </button>
                      {scenario.id !== 'scenario-base' && (
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteScenario?.(scenario.id);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-rose-50 text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Row: Name & Subtitle */}
            <div className="mt-3">
              <div
                className={`text-sm font-bold tracking-tight truncate ${
                  isSelected ? 'text-white' : 'text-slate-900'
                }`}
              >
                {scenario.name}
              </div>
              <div
                className={`text-xs mt-0.5 truncate font-medium ${
                  isSelected ? 'text-sky-100' : 'text-slate-500'
                }`}
              >
                {scenario.subtitle}
              </div>
            </div>
          </div>
        );
      })}

      {/* Add Scenario Card */}
      <div
        onClick={onAddScenario}
        className="rounded-xl p-3.5 border-2 border-dashed border-slate-200/90 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[96px] text-blue-600 group"
      >
        <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
          <Plus className="w-4 h-4 text-blue-600" />
        </div>
        <span className="text-xs font-bold tracking-tight text-blue-600">
          + Add Scenario
        </span>
      </div>
    </div>
  );
};
