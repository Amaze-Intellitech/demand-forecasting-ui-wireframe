import React from 'react';
import {
  Lightbulb,
  BarChart3,
  Shield,
  AlertTriangle,
} from 'lucide-react';

export interface ScenarioKeyInsightsCardProps {
  insights: {
    icon: 'lightbulb' | 'barchart' | 'shield' | 'alert';
    text: string;
  }[];
}

export const ScenarioKeyInsightsCard: React.FC<ScenarioKeyInsightsCardProps> = ({
  insights,
}) => {
  const renderIconBox = (type: 'lightbulb' | 'barchart' | 'shield' | 'alert') => {
    switch (type) {
      case 'lightbulb':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
        );
      case 'barchart':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0062d2] border border-blue-200/80 flex items-center justify-center flex-shrink-0 mt-0.5">
            <BarChart3 className="w-4 h-4" />
          </div>
        );
      case 'shield':
        return (
          <div className="w-8 h-8 rounded-lg bg-info-bg text-primary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-4 h-4" />
          </div>
        );
      case 'alert':
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
      {/* Header */}
      <div className="pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Key Insights
        </h3>
      </div>

      {/* Insights List */}
      <div className="py-2.5 space-y-3 flex-1 flex flex-col justify-center">
        {insights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            {renderIconBox(item.icon)}
            <p className="text-xs sm:text-[12.5px] text-slate-700 leading-snug font-medium pt-0.5">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footnote */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Scenario Sensitivity: High</span>
        <span>AITEK AI Engine</span>
      </div>
    </div>
  );
};
