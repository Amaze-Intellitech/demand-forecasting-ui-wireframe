import React, { useState, useMemo } from 'react';
import { CustomFieldItem } from '../../../types';
import { MOCK_VARIABLES } from '../../../data/dataSelectionMock';
import {
  Lock,
  CheckCircle2,
  Plus,
  Search,
  Sparkles,
  Trash2,
  FolderTree
} from 'lucide-react';

interface VariablesSelectionStepProps {
  selectedVariableIds: string[];
  onToggleVariable: (id: string) => void;
  onSelectRecommended: () => void;
  customFields: CustomFieldItem[];
  onAddCustomField: (field: CustomFieldItem) => void;
  onRemoveCustomField: (id: string) => void;
}

export const VariablesSelectionStep: React.FC<VariablesSelectionStepProps> = ({
  selectedVariableIds,
  onToggleVariable,
  onSelectRecommended,
  customFields,
  onAddCustomField,
  onRemoveCustomField,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Custom Field Form State
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldDesc, setNewFieldDesc] = useState('');
  const [newSourceSystem, setNewSourceSystem] = useState('SAP S/4HANA');
  const [newDirectoryOrPath, setNewDirectoryOrPath] = useState('/sftp/inbound/custom_feeds/');
  const [newTable, setNewTable] = useState('ZCUSTOM_TELEMETRY');
  const [newColumn, setNewColumn] = useState('SENSOR_VAL_AVG');
  const [newDataType, setNewDataType] = useState('DECIMAL(11,3)');

  const CATEGORIES: string[] = [
    'All',
    'Commercial & Pricing',
    'Quality & Specifications',
    'Seasonality & Calendar',
    'Market & Substitution',
    'Supply Chain & Sourcing',
    'Promotions & Orders',
    'Custom Fields',
  ];

  // Filter variables
  const filteredVariables = useMemo(() => {
    return MOCK_VARIABLES.filter((v) => {
      // Stock is handled in the top pinned card
      if (v.isMandatory) return false;

      const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.defaultSourceSystem.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Mandatory stock variable
  const stockVariable = MOCK_VARIABLES.find((v) => v.id === 'stock_level')!;

  const handleCreateCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;

    const item: CustomFieldItem = {
      id: `custom_${Date.now()}`,
      fieldName: newFieldName.trim(),
      description: newFieldDesc.trim() || 'User-defined operational field',
      sourceSystem: newSourceSystem,
      directoryOrPath: newDirectoryOrPath.trim() || '/',
      tableOrEndpoint: newTable.trim() || 'CUSTOM_TABLE',
      fieldOrColumn: newColumn.trim() || 'CUSTOM_COL',
      dataType: newDataType,
    };

    onAddCustomField(item);
    setIsAddModalOpen(false);
    setNewFieldName('');
    setNewFieldDesc('');
  };

  const totalSelectedCount = selectedVariableIds.length + customFields.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="border border-border/80 bg-surface/70 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                Screen 05 · Variables Selection
              </span>
              <span className="text-xs text-subtle">&bull; ~50 Canonical & Independent Variables</span>
            </div>
            <h2 className="text-lg font-bold text-deep tracking-tight">
              Select Variables from the Column List
            </h2>
            <p className="text-xs text-body max-w-2xl leading-relaxed">
              <strong>Stock</strong> is the mandatory dependent variable. Choose independent variables (price, quality, seasonality, substitution) and optionally add custom directory fields.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={onSelectRecommended}
              className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-primary/90 shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Select Recommended Set</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pinned Mandatory Dependent Variable Card (Stock) */}
      <div className="border-2 border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-deep">
                  {stockVariable.name}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  Mandatory Dependent Variable
                </span>
              </div>
              <p className="text-xs text-body mt-0.5">
                {stockVariable.description} &bull; Default Source: <span className="font-mono text-deep font-semibold">{stockVariable.defaultSourceSystem} &rarr; {stockVariable.defaultTable}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300 self-end sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Permanently Enforced</span>
          </div>
        </div>
      </div>

      {/* Toolbar: Category Filters, Search, Add Custom Field */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-subtle absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter variables by name, keyword, or source..."
              className="w-full bg-white dark:bg-slate-900 border border-border rounded-lg pl-9 pr-3 py-2 text-xs text-deep placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 justify-between sm:justify-end">
            <span className="text-xs font-mono text-body">
              <strong>{totalSelectedCount}</strong> fields selected
            </span>

            {/* Add Custom Field Trigger */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-border hover:border-primary/50 text-deep text-xs font-semibold px-3 py-2 rounded-lg shadow-xs transition-all hover:bg-muted"
            >
              <Plus className="w-3.5 h-3.5 text-primary" />
              <span>Add Custom Field</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-primary text-white font-semibold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-border text-body hover:text-deep hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Variables Checkbox Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
        {filteredVariables.map((v) => {
          const isChecked = selectedVariableIds.includes(v.id);
          return (
            <div
              key={v.id}
              onClick={() => onToggleVariable(v.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                isChecked
                  ? 'border-primary/60 bg-primary/5 shadow-xs'
                  : 'border-border bg-white dark:bg-slate-900 hover:border-border/90 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary/20 shrink-0 cursor-pointer"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-deep truncate">
                      {v.name}
                    </span>
                    {v.recommended && (
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold px-1.5 py-0.2 rounded">
                        Key Driver
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-body line-clamp-2 leading-relaxed">
                    {v.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-subtle font-mono">
                    <span className="bg-muted px-1.5 py-0.5 rounded border border-border/60">
                      {v.defaultSourceSystem}
                    </span>
                    <span>&bull;</span>
                    <span className="truncate">{v.defaultField}</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-subtle shrink-0">
                {v.category.split('&')[0].trim()}
              </span>
            </div>
          );
        })}
      </div>

      {/* User-Added Custom Fields Section */}
      {customFields.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-deep flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-primary" />
              Custom Additional Fields ({customFields.length})
            </h4>
            <span className="text-[11px] text-subtle">
              Configured with custom source & directory path
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {customFields.map((cf) => (
              <div
                key={cf.id}
                className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 flex items-start justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-deep font-mono">
                      {cf.fieldName}
                    </span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded font-semibold">
                      Custom Field
                    </span>
                  </div>
                  <p className="text-[11px] text-body truncate">
                    {cf.description}
                  </p>
                  <div className="text-[10px] font-mono text-subtle space-y-0.5 pt-1">
                    <div>Source: <strong className="text-deep">{cf.sourceSystem}</strong></div>
                    <div className="truncate">Directory: <span className="text-primary">{cf.directoryOrPath}</span></div>
                    <div>Target: {cf.tableOrEndpoint}.{cf.fieldOrColumn}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveCustomField(cf.id)}
                  className="p-1.5 text-subtle hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                  title="Remove custom field"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Additional Fields (PDF: "Add the additional fields. Give the source and the directory for each.") */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-deep">
                  Add Additional Field Beyond List
                </h3>
                <p className="text-xs text-subtle">
                  Specify field details, external source system, and server directory / path
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-subtle hover:text-deep text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateCustomField} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-deep mb-1">
                  Field Variable Name *
                </label>
                <input
                  type="text"
                  required
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  placeholder="e.g. ambient_kiln_temperature, raw_quarry_index"
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-deep mb-1">
                  Description / Business Purpose
                </label>
                <input
                  type="text"
                  value={newFieldDesc}
                  onChange={(e) => setNewFieldDesc(e.target.value)}
                  placeholder="e.g. Daily average thermocouple sensor feed from Line 2"
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-deep mb-1">
                    Source System *
                  </label>
                  <select
                    value={newSourceSystem}
                    onChange={(e) => setNewSourceSystem(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="SAP S/4HANA">SAP S/4HANA</option>
                    <option value="Oracle Fusion ERP">Oracle Fusion ERP</option>
                    <option value="SFTP / File Store">SFTP / Secure FTP File Store</option>
                    <option value="PostgreSQL LIMS">PostgreSQL / LIMS</option>
                    <option value="Snowflake Data Cloud">Snowflake Data Cloud</option>
                    <option value="Public Domain API">Public Domain / REST API</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-deep mb-1">
                    Data Type
                  </label>
                  <select
                    value={newDataType}
                    onChange={(e) => setNewDataType(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
                  >
                    <option value="DECIMAL(11,3)">DECIMAL(11,3)</option>
                    <option value="INTEGER">INTEGER</option>
                    <option value="VARCHAR(64)">VARCHAR(64)</option>
                    <option value="BOOLEAN">BOOLEAN</option>
                    <option value="TIMESTAMP">TIMESTAMP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-deep mb-1">
                  Source Directory or Endpoint Path *
                </label>
                <input
                  type="text"
                  required
                  value={newDirectoryOrPath}
                  onChange={(e) => setNewDirectoryOrPath(e.target.value)}
                  placeholder="e.g. /sftp/incoming/sensor_logs/ or https://api.gov/weather"
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-deep mb-1">
                    Table / Sheet / Object
                  </label>
                  <input
                    type="text"
                    value={newTable}
                    onChange={(e) => setNewTable(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-deep mb-1">
                    Field / Column Name
                  </label>
                  <input
                    type="text"
                    value={newColumn}
                    onChange={(e) => setNewColumn(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-subtle hover:text-deep hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-lg font-semibold shadow-xs hover:bg-primary/90 transition-all"
                >
                  Add Field to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
