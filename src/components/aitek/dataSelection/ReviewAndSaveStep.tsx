import React from 'react';
import { MaterialMasterItem, DataPeriodConfig, ColumnMappingConfig } from '../../../types';
import {
  CheckCircle2,
  BookmarkCheck,
  Calendar,
  Package,
  Layers,
  Database,
  ArrowLeft,
  Zap
} from 'lucide-react';

interface ReviewAndSaveStepProps {
  material: MaterialMasterItem;
  period: DataPeriodConfig;
  mappings: ColumnMappingConfig[];
  isConfigSaved: boolean;
  onToggleSaveConfig: (saved: boolean) => void;
  onGoBack: () => void;
  onStartIngestion: () => void;
}

export const ReviewAndSaveStep: React.FC<ReviewAndSaveStepProps> = ({
  material,
  period,
  mappings,
  isConfigSaved,
  onToggleSaveConfig,
  onGoBack,
  onStartIngestion,
}) => {
  // Days calculation
  const start = new Date(period.startDate);
  const end = new Date(period.endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const dependentCount = mappings.filter((m) => m.role === 'Dependent Variable').length;
  const independentCount = mappings.filter((m) => m.role === 'Independent Variable').length;
  const customCount = mappings.filter((m) => m.role === 'Custom Variable').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="border border-border/80 bg-surface/70 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                Screen 06 · Review & Configuration Save
              </span>
              <span className="text-xs text-subtle">&bull; Verify All Mappings Together</span>
            </div>
            <h2 className="text-lg font-bold text-deep tracking-tight">
              Review Pipeline Mappings & Save Configuration
            </h2>
            <p className="text-xs text-body max-w-2xl leading-relaxed">
              Verify that all required columns, source tables, and period boundaries are accurate before triggering time-scoped ingestion.
            </p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All {mappings.length} Mappings Validated</span>
          </div>
        </div>
      </div>

      {/* Scope Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Material Card */}
        <div className="border border-border bg-white dark:bg-slate-900 rounded-xl p-4 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-subtle font-semibold uppercase">
            <Package className="w-3.5 h-3.5 text-primary" />
            <span>Target Material</span>
          </div>
          <div className="text-sm font-bold text-deep truncate">
            {material.description}
          </div>
          <div className="text-[11px] font-mono text-primary font-semibold">
            {material.code} &bull; {material.plantName}
          </div>
        </div>

        {/* Period Card */}
        <div className="border border-border bg-white dark:bg-slate-900 rounded-xl p-4 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-subtle font-semibold uppercase">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Ingestion Time Horizon</span>
          </div>
          <div className="text-sm font-bold text-deep">
            {diffDays} Days ({period.presetYears !== 'custom' ? `${period.presetYears} Years` : 'Custom'})
          </div>
          <div className="text-[11px] font-mono text-body">
            {period.startDate} &rarr; {period.endDate}
          </div>
        </div>

        {/* Variables Breakdown Card */}
        <div className="border border-border bg-white dark:bg-slate-900 rounded-xl p-4 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-subtle font-semibold uppercase">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>Selected Variables ({mappings.length})</span>
          </div>
          <div className="text-sm font-bold text-deep">
            {dependentCount} Dependent &bull; {independentCount} Independent
          </div>
          <div className="text-[11px] text-body">
            {customCount > 0 ? `+ ${customCount} Custom Field(s)` : '0 Custom Fields'} &bull; 100% Mapped
          </div>
        </div>
      </div>

      {/* Unified Review Table */}
      <div className="border border-border bg-white dark:bg-slate-900 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 bg-muted/40 border-b border-border flex items-center justify-between">
          <h3 className="text-xs font-bold text-deep uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            Consolidated Ingestion Map
          </h3>
          <span className="text-xs text-subtle">
            Every selected column with its source and table
          </span>
        </div>

        <div className="overflow-x-auto max-h-72">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/20 border-b border-border text-subtle font-mono text-[11px]">
                <th className="py-2.5 px-4">Column Name</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Source System</th>
                <th className="py-2.5 px-3">Table / Object</th>
                <th className="py-2.5 px-3">Field / Attribute</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-sans">
              {mappings.map((m) => (
                <tr key={m.id} className="hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-deep">
                    {m.columnName}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        m.role === 'Dependent Variable'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : m.role === 'Custom Variable'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                          : 'bg-muted text-body'
                      }`}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-body font-medium">
                    {m.sourceSystem}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-deep">
                    {m.sourceTable}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-primary font-semibold">
                    {m.sourceField}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-subtle">
                    {m.dataType}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Passed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Configuration Box (PDF Screen 6: "Save this configuration? Optional, the user decides.") */}
      <div className="border border-border bg-gradient-to-r from-muted/60 via-surface to-muted/60 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-bold text-deep">
                Save this Pipeline Configuration?
              </h4>
            </div>
            <p className="text-xs text-body leading-relaxed max-w-2xl">
              Columns, sources, and tables will be saved and automatically reloaded on your next login. The period can still be changed fresh each session.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={isConfigSaved}
              onChange={(e) => onToggleSaveConfig(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            <span className="ml-3 text-xs font-semibold text-deep">
              {isConfigSaved ? 'Configuration Saved' : 'Save for Next Login'}
            </span>
          </label>
        </div>

        {isConfigSaved && (
          <div className="mt-3 pt-3 border-t border-border/60 text-[11px] text-emerald-800 dark:text-emerald-300 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Saved to Local Storage cache &bull; Will reload automatically on next login</span>
          </div>
        )}
      </div>

      {/* Decision Actions Bar (PDF: "All mappings complete and correct? No: go back. Yes: Ingestion starts") */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onGoBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-body hover:text-deep bg-white dark:bg-slate-900 border border-border px-4 py-2.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>No, Go Back & Adjust Fields</span>
        </button>

        <button
          type="button"
          onClick={onStartIngestion}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:bg-primary/95 text-white font-bold text-xs px-7 py-3 rounded-lg shadow-sm transition-all"
        >
          <Zap className="w-4 h-4 text-white" />
          <span>All Correct &rarr; Start Time-Scoped Ingestion</span>
        </button>
      </div>
    </div>
  );
};
