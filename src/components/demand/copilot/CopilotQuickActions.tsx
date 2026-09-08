import React from 'react';
import { BarChart3, Box, Truck, AlertTriangle, Lightbulb } from 'lucide-react';
import { COPILOT_QUICK_ACTIONS } from '../../../data/demandCopilotMock';

interface CopilotQuickActionsProps {
  onSelectAction: (query: string) => void;
}

export const CopilotQuickActions: React.FC<CopilotQuickActionsProps> = ({ onSelectAction }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'Box':
        return <Box className="w-5 h-5 text-emerald-600" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-amber-500" />;
      default:
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgClass = (theme: string) => {
    switch (theme) {
      case 'blue':
        return 'bg-blue-50/80';
      case 'emerald':
        return 'bg-emerald-50/80';
      case 'purple':
        return 'bg-purple-50/80';
      case 'rose':
        return 'bg-red-50/80';
      case 'amber':
        return 'bg-amber-50/80';
      default:
        return 'bg-blue-50/80';
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 select-none">
      {COPILOT_QUICK_ACTIONS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelectAction(item.defaultQuery)}
          className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 text-left shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-blue-300 hover:shadow-xs transition-all group cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${getBgClass(
                item.colorTheme
              )}`}
            >
              {getIcon(item.iconName)}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0062d2] transition-colors leading-tight">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
