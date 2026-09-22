import React from 'react';
import { DataPeriodConfig, MaterialMasterItem } from '../../../types';
import { computePeriodDates } from '../../../data/dataSelectionMock';
import { Calendar, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface PeriodSelectionStepProps {
  period: DataPeriodConfig;
  onPeriodChange: (newPeriod: DataPeriodConfig) => void;
  material: MaterialMasterItem;
}

export const PeriodSelectionStep: React.FC<PeriodSelectionStepProps> = ({
  period,
  onPeriodChange,
  material,
}) => {
  const PRESETS: {
    id: '1' | '3' | '5' | '10';
    title: string;
    subtitle: string;
    badge: string;
    recommended?: boolean;
  }[] = [
    {
      id: '1',
      title: '1 Year Window',
      subtitle: 'Fastest pipeline ingest · Near-term demand sensing',
      badge: '365 Days',
    },
    {
      id: '3',
      title: '3 Years Window',
      subtitle: 'Captures full seasonal cycles & structural trends',
      badge: '1,096 Days',
      recommended: true,
    },
    {
      id: '5',
      title: '5 Years Window',
      subtitle: 'Multi-cycle macroeconomic shifts & supply shocks',
      badge: '1,826 Days',
    },
    {
      id: '10',
      title: '10 Years Window',
      subtitle: 'Long-horizon strategic baseline training',
      badge: '3,652 Days',
    },
  ];

  const handleSelectPreset = (preset: '1' | '3' | '5' | '10') => {
    const updated = computePeriodDates(preset);
    onPeriodChange(updated);
  };

  const handleCustomDateChange = (field: 'startDate' | 'endDate', value: string) => {
    onPeriodChange({
      ...period,
      presetYears: 'custom',
      [field]: value,
    });
  };

  // Calculate day difference
  const start = new Date(period.startDate);
  const end = new Date(period.endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const approxYears = (diffDays / 365.25).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="border border-border/80 bg-surface/70 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                Screen 04 · Ingestion Window
              </span>
              <span className="text-xs text-subtle">&bull; Chosen Fresh in Every Session</span>
            </div>
            <h2 className="text-lg font-bold text-deep tracking-tight">
              Select Data Ingestion Period
            </h2>
            <p className="text-xs text-body max-w-2xl leading-relaxed">
              Define the historical lookback range. The period is chosen fresh each session because the right window depends on the forecast horizon and accuracy you need for <strong>{material.description}</strong>.
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 text-primary px-3 py-2 rounded-lg text-xs flex items-center gap-2 self-start md:self-auto">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Target Accuracy: <strong>WAPE &le; 6.5%</strong></span>
          </div>
        </div>
      </div>

      {/* Preset Duration Cards Grid */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-deep uppercase tracking-wider">
          Quick Horizon Presets
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PRESETS.map((preset) => {
            const isSelected = period.presetYears === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-sm'
                    : 'border-border bg-white dark:bg-slate-900 hover:border-primary/40 hover:shadow-xs'
                }`}
              >
                {preset.recommended && (
                  <span className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    Recommended
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-deep">
                      {preset.title}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-xs text-body mt-1.5 leading-snug">
                    {preset.subtitle}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs">
                  <span className={`text-[11px] font-medium ${isSelected ? 'text-primary font-bold' : 'text-subtle'}`}>
                    {isSelected ? 'Active Selection' : 'Click to select'}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Date Pickers for Custom / Precise Control */}
      <div className="border border-border bg-white dark:bg-slate-900 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border gap-2">
          <div>
            <h3 className="text-sm font-bold text-deep flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Ingestion Date Boundary
            </h3>
            <p className="text-xs text-subtle">
              Adjust exact start and end dates as needed for your analysis session
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-body bg-muted px-3 py-1 rounded-lg">
            <span>Duration: <strong>{diffDays} days</strong> (~{approxYears} yrs)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-deep mb-1.5">
              From Date (Historical Start)
            </label>
            <input
              type="date"
              value={period.startDate}
              onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-xs text-deep font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <span className="text-[11px] text-subtle mt-1 block">
              Earliest observation record to ingest
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-deep mb-1.5">
              To Date (Cutoff / Baseline Date)
            </label>
            <input
              type="date"
              value={period.endDate}
              onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-xs text-deep font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <span className="text-[11px] text-subtle mt-1 block">
              Cutoff point for historical training vs forward test
            </span>
          </div>
        </div>

        {/* Rule Highlight Box */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg p-3.5 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Time-Scoped Pipeline Guarantee</span>
            <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-400">
              The ingestion engine enforces strict temporal filtering at query time. A 1-year selection pulls <strong>exactly 1 year</strong>; a 3-year selection pulls <strong>exactly 3 years</strong>. No excess memory is consumed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
