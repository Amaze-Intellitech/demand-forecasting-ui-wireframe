import React from 'react';
import {
  ChevronRight,
  Box,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { RecentScenarioItem } from '../../../types/domain/scenarioDecisionTwin';

interface RecentScenariosCardProps {
  items: RecentScenarioItem[];
  onSelectScenario: (scenarioName: string) => void;
  onViewAll: () => void;
}

export const RecentScenariosCard: React.FC<RecentScenariosCardProps> = ({
  items,
  onSelectScenario,
  onViewAll,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cube':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Box className="w-4 h-4" />
          </div>
        );
      case 'alert':
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
        );
      case 'trend':
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Recent Scenarios
          </h3>
          <p className="text-xs text-slate-500">
            Historical portfolio analysis runs
          </p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-2.5 my-auto">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectScenario(item.name)}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50/80 border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {getIcon(item.iconName)}
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {item.name}
                </div>
                <div className="text-[11px] text-slate-500">{item.date}</div>
              </div>
            </div>

            <div className="flex-shrink-0">
              {item.status === 'Recommended' ? (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Recommended
                </span>
              ) : (
                <span className="text-[11px] font-bold text-deep bg-info-bg border border-border px-2 py-0.5 rounded-md">
                  Analyzed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
