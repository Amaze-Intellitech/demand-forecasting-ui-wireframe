import React, { useState, useEffect } from 'react';
import { MaterialMasterItem, DataPeriodConfig, ColumnMappingConfig } from '../../../types';
import { RefreshCw, CheckCircle2, Database, ArrowRight } from 'lucide-react';

interface IngestionRunningStepProps {
  material: MaterialMasterItem;
  period: DataPeriodConfig;
  mappings: ColumnMappingConfig[];
  onComplete: () => void;
}

export const IngestionRunningStep: React.FC<IngestionRunningStepProps> = ({
  material,
  period,
  mappings,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentConnector, setCurrentConnector] = useState('SAP S/4HANA');
  const [ingestedRows, setIngestedRows] = useState(0);

  // Compute exact expected rows from days
  const start = new Date(period.startDate);
  const end = new Date(period.endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const targetRows = totalDays;

  // Group unique source systems used
  const sourceSystems = Array.from(new Set(mappings.map((m) => m.sourceSystem)));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }

        const increment = Math.floor(Math.random() * 15) + 10;
        const next = Math.min(prev + increment, 100);

        // Update active connector name based on progress
        const connectorIdx = Math.min(
          Math.floor((next / 100) * sourceSystems.length),
          sourceSystems.length - 1
        );
        setCurrentConnector(sourceSystems[connectorIdx] || 'SAP S/4HANA');

        setIngestedRows(Math.round((next / 100) * targetRows));
        return next;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [targetRows, sourceSystems, onComplete]);

  const isDone = progress >= 100;

  return (
    <div className="space-y-6 py-6 animate-in fade-in duration-200">
      {/* Central Progress Visual Card */}
      <div className="border border-border bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm text-center max-w-2xl mx-auto space-y-6">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            {isDone ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-in zoom-in-75" />
            ) : (
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            )}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            {isDone ? 'Ingestion Pipeline Complete' : 'Executing Time-Scoped Pipeline'}
          </span>
          <h2 className="text-xl font-bold text-deep">
            {isDone ? 'Data Replicated & Validated' : `Ingesting from ${currentConnector}`}
          </h2>
          <p className="text-xs text-body max-w-md mx-auto leading-relaxed">
            Pulls <strong>only</strong> the {mappings.length} selected fields for the selected {totalDays}-day period ({period.startDate} &rarr; {period.endDate}).
          </p>
        </div>

        {/* Progress Bar & Row Count */}
        <div className="space-y-2 pt-2 text-left">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-body font-semibold">
              Replicated: <strong className="text-deep">{ingestedRows.toLocaleString()} / {targetRows.toLocaleString()} daily rows</strong>
            </span>
            <span className="text-primary font-bold text-sm">
              {progress}%
            </span>
          </div>

          <div className="h-3 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border/80">
            <div
              className="h-full bg-gradient-to-r from-primary via-blue-500 to-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-subtle font-mono pt-1">
            <span>Material: {material.code}</span>
            <span>Zero-Loss Checksum Active</span>
          </div>
        </div>

        {/* Multi-Connector Ingest Status Badges */}
        <div className="pt-4 border-t border-border space-y-2">
          <span className="text-[11px] font-semibold text-subtle uppercase tracking-wider block">
            Connector Pipeline Handshakes:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {sourceSystems.map((sys) => {
              const isFinished = progress > 50;
              return (
                <div
                  key={sys}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs text-deep font-mono"
                >
                  <Database className="w-3.5 h-3.5 text-primary" />
                  <span>{sys}</span>
                  {isFinished ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Message & Next Button */}
        {isDone && (
          <div className="pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Data successfully staged for Analysis Workbench
              </span>
              <button
                type="button"
                onClick={onComplete}
                className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-lg transition-colors text-xs"
              >
                <span>Launch Components</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
