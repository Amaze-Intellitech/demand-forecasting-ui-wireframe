import React from 'react';
import {
  Target,
  ShieldCheck,
  Package,
  Layers,
  Banknote,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Zap,
  BarChart3,
  GitBranch,
  AlertTriangle,
  Truck,
  MessageSquare,
} from 'lucide-react';
import { DecisionTrigger } from '../../../types/domain/executiveCommandCenter';

interface DecisionTriggersProps {
  triggers: DecisionTrigger[];
  onSelectTrigger: (trigger: DecisionTrigger) => void;
}

export const DecisionTriggers: React.FC<DecisionTriggersProps> = ({
  triggers,
  onSelectTrigger,
}) => {
  const getTriggerIcon = (category: DecisionTrigger['category']) => {
    switch (category) {
      case 'Supply Risk':
        return ShieldCheck;
      case 'Demand Surge':
        return Package;
      case 'Pricing':
        return Layers;
      case 'Working Capital':
        return Banknote;
      default:
        return Target;
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#0062d2]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            C-Suite Decision Triggers
          </h3>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          Action Required
        </span>
      </div>

      {/* Triggers List */}
      <div className="divide-y divide-slate-100 mt-1">
        {triggers.map((item) => {
          const Icon = getTriggerIcon(item.category);
          const isApproved = item.status === 'approved';
          const isRejected = item.status === 'rejected';

          return (
            <div
              key={item.id}
              onClick={() => onSelectTrigger(item)}
              className="py-3 px-1.5 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/70 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                    isApproved
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : isRejected
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-sky-50 border-sky-100 text-[#0062d2]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#0062d2] transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {isApproved ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Approved
                  </span>
                ) : isRejected ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                    <XCircle className="w-3 h-3 text-rose-600" />
                    Rejected
                  </span>
                ) : null}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface QuickActionsProps {
  onNavigate: (route: string) => void;
}

export const QuickActionsCard: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const actions = [
    {
      label: 'View Detailed Forecast',
      icon: BarChart3,
      route: '/solutions/demand-intelligence/forecast',
    },
    {
      label: 'Explore Scenario Impact',
      icon: GitBranch,
      route: '/solutions/demand-intelligence/scenarios',
    },
    {
      label: 'Open Risk & Exception Center',
      icon: AlertTriangle,
      route: '/solutions/demand-intelligence/exceptions',
    },
    {
      label: 'Optimize Supplier Allocation',
      icon: Truck,
      route: '/solutions/demand-intelligence/sourcing',
    },
    {
      label: 'Chat with AI Decision Copilot',
      icon: MessageSquare,
      route: '/solutions/demand-intelligence/copilot',
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#0062d2]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Quick Actions
          </h3>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          Direct Workspaces
        </span>
      </div>

      {/* Actions List */}
      <div className="divide-y divide-slate-100 mt-1">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.label}
              onClick={() => onNavigate(act.route)}
              className="py-2.5 px-1.5 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/70 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-sky-50/70 border border-sky-100/80 flex items-center justify-center flex-shrink-0 text-[#0062d2]">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0062d2] transition-colors truncate">
                  {act.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
