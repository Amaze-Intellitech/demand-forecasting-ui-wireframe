import React from 'react';
import {
  Sliders,
  DollarSign,
  Percent,
  ShieldCheck,
  Box,
  Coins,
} from 'lucide-react';
import { ScenarioOutcome } from '../../../types/domain/scenarioDecisionTwin';

interface ScenarioKpiStripProps {
  outcomes: ScenarioOutcome;
}

export const ScenarioKpiStrip: React.FC<ScenarioKpiStripProps> = ({ outcomes }) => {
  const kpis = [
    {
      id: 'kpi-demand',
      title: 'TOTAL DEMAND',
      value: outcomes.totalDemand,
      icon: Sliders,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      border: 'border-blue-100/60',
    },
    {
      id: 'kpi-revenue',
      title: 'REVENUE',
      value: outcomes.revenue,
      icon: DollarSign,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      border: 'border-blue-100/60',
    },
    {
      id: 'kpi-margin',
      title: 'GROSS MARGIN',
      value: outcomes.grossMargin,
      icon: Percent,
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      border: 'border-emerald-100/60',
    },
    {
      id: 'kpi-service',
      title: 'SERVICE LEVEL',
      value: outcomes.serviceLevel,
      icon: ShieldCheck,
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      border: 'border-emerald-100/60',
    },
    {
      id: 'kpi-inventory',
      title: 'INVENTORY NEED',
      value: outcomes.inventoryNeed,
      icon: Box,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      border: 'border-blue-100/60',
    },
    {
      id: 'kpi-working-capital',
      title: 'WORKING CAPITAL',
      value: outcomes.workingCapital,
      icon: Coins,
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      border: 'border-emerald-100/60',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 select-none">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 transition-all duration-200 hover:shadow-md hover:border-slate-300"
          >
            {/* Rounded Square Icon Box */}
            <div
              className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center ${kpi.iconColor} border ${kpi.border} shadow-2xs flex-shrink-0`}
            >
              <Icon className="w-5 h-5" />
            </div>

            {/* Metric Label & Figures */}
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
                {kpi.title}
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mt-0.5 font-mono truncate">
                {kpi.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
