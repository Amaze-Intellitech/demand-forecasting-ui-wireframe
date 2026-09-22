import React from 'react';
import { ColumnMappingConfig } from '../../../types';
import { Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface FieldMappingStepProps {
  mappings: ColumnMappingConfig[];
  onUpdateMapping: (id: string, updates: Partial<ColumnMappingConfig>) => void;
  onAutoMapAll: () => void;
}

export const FieldMappingStep: React.FC<FieldMappingStepProps> = ({
  mappings,
  onUpdateMapping,
  onAutoMapAll,
}) => {
  const SOURCE_SYSTEMS = [
    'SAP S/4HANA',
    'Oracle Fusion ERP',
    'Microsoft Dynamics 365',
    'PostgreSQL / LIMS',
    'Snowflake Analytics',
    'SFTP / File Store',
    'Public Domain Feed',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="border border-border/80 bg-surface/70 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                Screen 06 · Source & Field Mapping
              </span>
              <span className="text-xs text-subtle">&bull; Specify Source System, Table & Field</span>
            </div>
            <h2 className="text-lg font-bold text-deep tracking-tight">
              Map Every Selected Column to Source System
            </h2>
            <p className="text-xs text-body max-w-2xl leading-relaxed">
              For each chosen variable, specify where the data originates (e.g. price from an SAP table field <code className="text-primary font-mono">VBAP.NETPR</code>).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={onAutoMapAll}
              className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-primary/90 shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Map from Canonical Connectors</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mapping Configuration Table */}
      <div className="border border-border bg-white dark:bg-slate-900 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/60 border-b border-border text-subtle font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Variable / Column</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Source System</th>
                <th className="py-3 px-3">Source Table / Endpoint</th>
                <th className="py-3 px-3">Source Field / Column</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-sans">
              {mappings.map((m) => {
                const isDependent = m.role === 'Dependent Variable';
                const isCustom = m.role === 'Custom Variable';

                return (
                  <tr
                    key={m.id}
                    className={`hover:bg-muted/30 transition-colors ${
                      isDependent ? 'bg-emerald-50/20 dark:bg-emerald-950/10' : ''
                    }`}
                  >
                    {/* Column Name */}
                    <td className="py-3 px-4 font-semibold text-deep">
                      <div className="flex items-center gap-2">
                        {isDependent ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        ) : isCustom ? (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                        )}
                        <span>{m.columnName}</span>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          isDependent
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : isCustom
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                            : 'bg-muted text-body'
                        }`}
                      >
                        {m.role}
                      </span>
                    </td>

                    {/* Source System Dropdown */}
                    <td className="py-3 px-3">
                      <select
                        value={m.sourceSystem}
                        onChange={(e) => onUpdateMapping(m.id, { sourceSystem: e.target.value })}
                        className="bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-deep font-sans focus:outline-none focus:ring-1 focus:ring-primary w-full max-w-[180px]"
                      >
                        {SOURCE_SYSTEMS.map((sys) => (
                          <option key={sys} value={sys}>
                            {sys}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Source Table */}
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={m.sourceTable}
                        onChange={(e) => onUpdateMapping(m.id, { sourceTable: e.target.value })}
                        placeholder="e.g. VBAP"
                        className="bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs font-mono text-deep focus:outline-none focus:ring-1 focus:ring-primary w-full"
                      />
                    </td>

                    {/* Source Field */}
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={m.sourceField}
                        onChange={(e) => onUpdateMapping(m.id, { sourceField: e.target.value })}
                        placeholder="e.g. NETPR"
                        className="bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs font-mono text-primary font-semibold focus:outline-none focus:ring-1 focus:ring-primary w-full"
                      />
                    </td>

                    {/* Data Type */}
                    <td className="py-3 px-3 font-mono text-[11px] text-subtle">
                      {m.dataType}
                    </td>

                    {/* Validation Status */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      {m.sourceTable && m.sourceField ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold text-[11px]">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info strip */}
        <div className="p-3 bg-muted/40 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-subtle gap-2">
          <span>Total Mappings Configured: <strong>{mappings.length} columns</strong></span>
          <span className="font-mono text-[11px]">Canonical Data Contract &bull; Zero Transformation Overhead</span>
        </div>
      </div>
    </div>
  );
};
