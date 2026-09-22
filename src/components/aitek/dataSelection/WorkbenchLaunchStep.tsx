import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialMasterItem, DataPeriodConfig, ColumnMappingConfig } from '../../../types';
import {
  LineChart,
  BrainCircuit,
  Sliders,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface WorkbenchLaunchStepProps {
  material: MaterialMasterItem;
  period: DataPeriodConfig;
  mappings: ColumnMappingConfig[];
  onRestartPeriod: () => void;
  solutionId?: string;
}

export const WorkbenchLaunchStep: React.FC<WorkbenchLaunchStepProps> = ({
  material,
  period,
  mappings,
  onRestartPeriod,
  solutionId = 'demand-intelligence',
}) => {
  const navigate = useNavigate();

  // 4 Components matching Section E in im_saas_user_flow.pdf
  const COMPONENTS = [
    {
      id: 'exploratory',
      title: 'Exploratory & Descriptive Analysis',
      subtitle: 'Univariate & Bivariate statistical feature distributions',
      description: 'Analyze data distributions, cross-variable correlation heatmaps, missing value imputation, and price elasticity curves.',
      icon: <LineChart className="w-5 h-5 text-blue-500" />,
      tag: 'Statistical Component',
      route: `/solutions/${solutionId}/drivers`,
      actionLabel: 'Launch Exploratory Workbench',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300',
    },
    {
      id: 'predictive',
      title: 'Predictive Modeling & Forecast',
      subtitle: 'Multivariate ML demand prediction & probabilistic quantiles',
      description: 'Train TFT, LightGBM, and MLR models on the ingested time-scoped records. Generates P10/P50/P90 probabilistic fan forecasts.',
      icon: <BrainCircuit className="w-5 h-5 text-indigo-500" />,
      tag: 'Machine Learning Component',
      route: `/solutions/${solutionId}/forecast`,
      actionLabel: 'Run Predictive Models',
      badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300',
    },
    {
      id: 'prescriptive',
      title: 'Prescriptive Optimizer',
      subtitle: 'Mathematical optimization & safety stock calibration',
      description: 'Run constraint-based multi-plant allocation, inventory safety stock buffer optimization, and supply risk trade-offs.',
      icon: <Sliders className="w-5 h-5 text-emerald-500" />,
      tag: 'Optimization Component',
      route: `/solutions/${solutionId}/supply-capacity`,
      actionLabel: 'Open Prescriptive Optimizer',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
    },
    {
      id: 'dashboard',
      title: 'Executive Command Center',
      subtitle: 'Unified operational monitoring & C-suite decision triggers',
      description: 'Real-time telemetry, service level health, working capital impact, open exceptions, and one-click planner approvals.',
      icon: <LayoutDashboard className="w-5 h-5 text-amber-500" />,
      tag: 'Executive Cockpit',
      route: `/solutions/${solutionId}/executive`,
      actionLabel: 'Go to Executive Dashboard',
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Completion Header */}
      <div className="border border-emerald-300 dark:border-emerald-800 bg-gradient-to-r from-emerald-50/50 via-surface to-surface dark:from-emerald-950/20 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Ingestion Complete
              </span>
              <span className="text-xs font-mono text-subtle">
                Section E &bull; Analysis Workbench Gateway
              </span>
            </div>
            <h2 className="text-xl font-bold text-deep tracking-tight">
              Data Ready: Choose Your Analytics Components
            </h2>
            <p className="text-xs text-body max-w-2xl leading-relaxed">
              Successfully ingested <strong>{mappings.length} columns</strong> for <strong>{material.description}</strong> ({material.code}) across the period <span className="font-mono text-deep font-semibold">{period.startDate} &rarr; {period.endDate}</span>. Choose which component to run now.
            </p>
          </div>

          {/* Action to repeat or change period */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={onRestartPeriod}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-body hover:text-deep bg-white dark:bg-slate-900 border border-border px-3.5 py-2 rounded-lg hover:bg-muted shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-subtle" />
              <span>Change Period / Fields</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Component Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMPONENTS.map((comp) => (
          <div
            key={comp.id}
            className="border border-border bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border/80">
                    {comp.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-deep group-hover:text-primary transition-colors">
                      {comp.title}
                    </h3>
                    <p className="text-[11px] text-primary font-medium mt-0.5">
                      {comp.subtitle}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${comp.badgeColor}`}>
                  {comp.tag}
                </span>
              </div>

              <p className="text-xs text-body leading-relaxed pt-1">
                {comp.description}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-subtle font-mono">
                Model: AITEK v2.4 Canonical
              </span>
              <button
                type="button"
                onClick={() => navigate(comp.route)}
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-xs transition-all group-hover:translate-x-0.5"
              >
                <span>{comp.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Persistent Note on Reusable Configurations */}
      <div className="p-4 bg-muted/40 border border-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-subtle gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <span>
            Next visit: Log in again and change the period as needed, then repeat from the period step. More usage generates higher forecast reliability.
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/solutions/${solutionId}/executive`)}
          className="text-primary hover:underline font-semibold whitespace-nowrap self-end sm:self-auto"
        >
          Skip to Executive Center &rarr;
        </button>
      </div>
    </div>
  );
};
