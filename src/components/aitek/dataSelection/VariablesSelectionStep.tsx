import React, { useState, useMemo } from 'react';
import { CustomFieldItem, ColumnMappingConfig, VariableColumnItem } from '../../../types';
import { MOCK_VARIABLES } from '../../../data/dataSelectionMock';
import {
  Lock,
  CheckCircle2,
  Plus,
  Search,
  Sparkles,
  Trash2,
  FolderTree,
  GripVertical,
  X,
  Layers,
  ArrowRight,
  Settings2,
  Database,
  Table
} from 'lucide-react';

interface VariablesSelectionStepProps {
  selectedVariableIds: string[];
  onToggleVariable: (id: string) => void;
  onSelectRecommended: () => void;
  customFields: CustomFieldItem[];
  onAddCustomField: (field: CustomFieldItem) => void;
  onRemoveCustomField: (id: string) => void;
  mappings: ColumnMappingConfig[];
  onUpdateMapping: (id: string, updates: Partial<ColumnMappingConfig>) => void;
  onAddMappedVariable: (variableId: string, mapping: Partial<ColumnMappingConfig>) => void;
}

export const VariablesSelectionStep: React.FC<VariablesSelectionStepProps> = ({
  selectedVariableIds,
  onToggleVariable,
  onSelectRecommended,
  customFields,
  onAddCustomField,
  onRemoveCustomField,
  mappings,
  onUpdateMapping,
  onAddMappedVariable,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedVariableId, setDraggedVariableId] = useState<string | null>(null);

  // Field Mapping Dialog State
  const [mappingModalTarget, setMappingModalTarget] = useState<VariableColumnItem | null>(null);
  const [mapSourceSystem, setMapSourceSystem] = useState('SAP S/4HANA');
  const [mapSourceTable, setMapSourceTable] = useState('');
  const [mapSourceField, setMapSourceField] = useState('');
  const [mapDataType, setMapDataType] = useState('');
  const [isEditingExisting, setIsEditingExisting] = useState(false);

  // New Custom Field Modal State
  const [isAddCustomModalOpen, setIsAddCustomModalOpen] = useState(false);
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
  ];

  const SOURCE_SYSTEMS = [
    'SAP S/4HANA',
    'Oracle Fusion ERP',
    'Microsoft Dynamics 365',
    'PostgreSQL / LIMS',
    'Snowflake Analytics',
    'SFTP / File Store',
    'Public Domain Feed',
  ];

  // Available catalog variables on left menu (excluding mandatory stock which is pinned on right)
  const availableVariables = useMemo(() => {
    return MOCK_VARIABLES.filter((v) => {
      if (v.isMandatory) return false;
      const matchesCat = selectedCategory === 'All' || v.category === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.defaultSourceSystem.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Mandatory dependent variables definitions
  const demandVariable = MOCK_VARIABLES.find((v) => v.id === 'demand_sales')!;
  const stockVariable = MOCK_VARIABLES.find((v) => v.id === 'stock_level')!;

  // Selected independent variables currently in the active pipeline
  const activeSelectedVariables = useMemo(() => {
    return selectedVariableIds
      .filter((id) => id !== 'stock_level' && id !== 'demand_sales')
      .map((id) => MOCK_VARIABLES.find((v) => v.id === id))
      .filter(Boolean) as typeof MOCK_VARIABLES;
  }, [selectedVariableIds]);

  // Open Field Mapping Dialog for a variable
  const openMappingDialogForVariable = (variable: VariableColumnItem, isEditing = false) => {
    const existingMapping = mappings.find((m) => m.id === variable.id);

    setMappingModalTarget(variable);
    setIsEditingExisting(isEditing);
    setMapSourceSystem(existingMapping?.sourceSystem || variable.defaultSourceSystem);
    setMapSourceTable(existingMapping?.sourceTable || variable.defaultTable);
    setMapSourceField(existingMapping?.sourceField || variable.defaultField);
    setMapDataType(existingMapping?.dataType || variable.dataType);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'copy';
    setDraggedVariableId(id);
  };

  const handleDragEnd = () => {
    setDraggedVariableId(null);
    setIsDraggingOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDraggingOver) setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDraggingOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    setDraggedVariableId(null);
    const varId = e.dataTransfer.getData('text/plain');
    if (!varId) return;

    const variable = MOCK_VARIABLES.find((v) => v.id === varId);
    if (!variable) return;

    if (!selectedVariableIds.includes(varId)) {
      // User dropped a new variable -> immediately open Field Mapping Dialog!
      openMappingDialogForVariable(variable, false);
    } else {
      // Already in pipeline -> open mapping dialog to edit
      openMappingDialogForVariable(variable, true);
    }
  };

  // When user clicks "+ Add" on a variable card in left menu
  const handleClickAddVariable = (variable: VariableColumnItem) => {
    openMappingDialogForVariable(variable, false);
  };

  // Submit Field Mapping Modal
  const handleConfirmMapping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mappingModalTarget) return;

    const mappingUpdates: Partial<ColumnMappingConfig> = {
      sourceSystem: mapSourceSystem,
      sourceTable: mapSourceTable.trim() || mappingModalTarget.defaultTable,
      sourceField: mapSourceField.trim() || mappingModalTarget.defaultField,
      dataType: mapDataType,
      status: 'valid',
    };

    if (isEditingExisting) {
      onUpdateMapping(mappingModalTarget.id, mappingUpdates);
    } else {
      onAddMappedVariable(mappingModalTarget.id, mappingUpdates);
    }

    setMappingModalTarget(null);
  };

  // Reset modal values to default canonical
  const handleResetToDefaults = () => {
    if (!mappingModalTarget) return;
    setMapSourceSystem(mappingModalTarget.defaultSourceSystem);
    setMapSourceTable(mappingModalTarget.defaultTable);
    setMapSourceField(mappingModalTarget.defaultField);
    setMapDataType(mappingModalTarget.dataType);
  };

  // Custom Field Form Submit
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
    setIsAddCustomModalOpen(false);
    setNewFieldName('');
    setNewFieldDesc('');
  };

  const totalSelectedCount = selectedVariableIds.length + customFields.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info Banner */}
      <div className="border border-border/80 bg-surface/70 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                Screen 05 · Drag &amp; Drop + Instant Field Mapping
              </span>
              <span className="text-xs text-subtle">&bull; Streamlined Unified Flow</span>
            </div>
            <h2 className="text-lg font-bold text-deep tracking-tight">
              Select Variables &amp; Configure Field Mappings
            </h2>
            <p className="text-xs text-body max-w-2xl leading-relaxed">
              Drag and drop any variable from the left menu into the pipeline on the right. When dropped, a <strong>Field Mapping dialog</strong> immediately appears to assign the enterprise source table and field.
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

      {/* Main Two-Column Drag & Drop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: Variables Catalog Menu (Menu of Variables)     */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-border rounded-2xl shadow-xs flex flex-col h-[650px] overflow-hidden">
          {/* Menu Header */}
          <div className="p-4 border-b border-border bg-muted/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold text-deep uppercase tracking-wider">
                  Variables Menu Catalog
                </h3>
              </div>
              <span className="text-[11px] font-mono text-subtle">
                {availableVariables.length} available
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-subtle absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search variables by name or source..."
                className="w-full bg-white dark:bg-slate-800 border border-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-deep placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Category Filter Pills in Left Menu */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-primary text-white font-semibold shadow-xs'
                        : 'bg-white dark:bg-slate-800 border border-border/80 text-body hover:text-deep hover:bg-muted'
                    }`}
                  >
                    {cat.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Draggable Items List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 divide-y divide-border/40">
            {availableVariables.length === 0 ? (
              <div className="p-8 text-center text-xs text-subtle space-y-1">
                <p>No variables found matching &ldquo;{searchTerm}&rdquo;.</p>
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="text-primary hover:underline text-[11px]"
                >
                  Clear search
                </button>
              </div>
            ) : (
              availableVariables.map((v) => {
                const isAlreadySelected = selectedVariableIds.includes(v.id);
                const isDragging = draggedVariableId === v.id;

                return (
                  <div
                    key={v.id}
                    draggable={!isAlreadySelected}
                    onDragStart={(e) => handleDragStart(e, v.id)}
                    onDragEnd={handleDragEnd}
                    className={`pt-2 first:pt-0 group relative p-3 rounded-xl border transition-all select-none ${
                      isAlreadySelected
                        ? 'bg-muted/40 border-border/60 opacity-60'
                        : isDragging
                        ? 'opacity-40 border-primary border-dashed bg-primary/5'
                        : 'bg-surface hover:bg-white dark:hover:bg-slate-800/80 border-border/80 hover:border-primary/50 hover:shadow-xs cursor-grab active:cursor-grabbing'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-start gap-2 min-w-0">
                        {/* Drag Handle Icon */}
                        <div className="mt-0.5 text-subtle group-hover:text-primary transition-colors shrink-0">
                          <GripVertical className="w-4 h-4" />
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-deep group-hover:text-primary transition-colors">
                              {v.name}
                            </span>
                            {v.recommended && (
                              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-1.5 py-0.2 rounded">
                                Key Driver
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-body line-clamp-2 leading-relaxed">
                            {v.description}
                          </p>

                          <div className="flex items-center gap-2 text-[10px] text-subtle font-mono pt-0.5">
                            <span className="bg-muted px-1.5 py-0.5 rounded border border-border/60">
                              {v.defaultSourceSystem}
                            </span>
                            <span>&bull;</span>
                            <span className="truncate">{v.defaultField}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action: Quick Add / Already In Pipeline */}
                      <div className="shrink-0">
                        {isAlreadySelected ? (
                          <div className="flex items-center gap-1">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" />
                              Mapped
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleClickAddVariable(v)}
                            className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 border border-border hover:border-primary text-deep hover:text-primary text-[11px] font-semibold px-2 py-1 rounded-lg shadow-2xs hover:bg-primary/5 transition-all"
                            title="Configure mapping & add to pipeline"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Left Menu Footer: Add Custom Field Action */}
          <div className="p-3 bg-muted/40 border-t border-border flex items-center justify-between">
            <span className="text-[11px] text-subtle">
              Need fields outside standard list?
            </span>
            <button
              type="button"
              onClick={() => setIsAddCustomModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-border hover:border-primary text-deep hover:text-primary text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-primary" />
              <span>Add Custom Variable</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Active Ingestion Pipeline (Drop Zone)          */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Top Pinned Card: Mandatory Dependent Variables (Demand Target + Stock) */}
          <div className="border-2 border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-emerald-200/60 dark:border-emerald-800/60">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                  Mandatory Dependent Target Variables (2 Pinned)
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono font-medium">
                Core Forecast &amp; Inventory Targets
              </span>
            </div>

            {/* 1. Demand / Sales Target */}
            <div className="flex items-start sm:items-center justify-between gap-3 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
              <div className="flex items-start sm:items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs text-xs font-bold font-mono">
                  Y1
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xs font-bold text-deep">
                      {demandVariable.name}
                    </h3>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                      Primary Forecast Target
                    </span>
                  </div>
                  <div className="text-[11px] text-body mt-0.5">
                    {(() => {
                      const demandMap = mappings.find((m) => m.id === 'demand_sales');
                      return (
                        <span className="font-mono text-deep font-semibold bg-emerald-100/70 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          {demandMap?.sourceSystem || demandVariable.defaultSourceSystem} &rarr; {demandMap?.sourceTable || demandVariable.defaultTable}.{demandMap?.sourceField || demandVariable.defaultField}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => openMappingDialogForVariable(demandVariable, true)}
                  className="p-1.5 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold border border-emerald-300 dark:border-emerald-800"
                  title="Configure demand source mapping"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Configure Source</span>
                </button>
              </div>
            </div>

            {/* 2. Stock Level Target */}
            <div className="flex items-start sm:items-center justify-between gap-3 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
              <div className="flex items-start sm:items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-2xs text-xs font-bold font-mono">
                  Y2
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xs font-bold text-deep">
                      {stockVariable.name}
                    </h3>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-700 text-white shadow-2xs">
                      Inventory Balance Target
                    </span>
                  </div>
                  <div className="text-[11px] text-body mt-0.5">
                    {(() => {
                      const stockMap = mappings.find((m) => m.id === 'stock_level');
                      return (
                        <span className="font-mono text-deep font-semibold bg-emerald-100/70 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          {stockMap?.sourceSystem || stockVariable.defaultSourceSystem} &rarr; {stockMap?.sourceTable || stockVariable.defaultTable}.{stockMap?.sourceField || stockVariable.defaultField}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => openMappingDialogForVariable(stockVariable, true)}
                  className="p-1.5 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold border border-emerald-300 dark:border-emerald-800"
                  title="Configure stock source mapping"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Configure Source</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Pipeline Drop Zone Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 rounded-2xl bg-white dark:bg-slate-900 shadow-xs flex flex-col h-[555px] overflow-hidden transition-all duration-200 ${
              isDraggingOver
                ? 'border-primary ring-4 ring-primary/20 bg-primary/5 shadow-md border-dashed'
                : 'border-border'
            }`}
          >
            {/* Drop Zone Header */}
            <div className="p-4 border-b border-border bg-muted/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <h3 className="text-xs font-bold text-deep uppercase tracking-wider">
                  Active Ingestion Pipeline ({activeSelectedVariables.length} Independent Drivers Mapped)
                </h3>
              </div>

              <span className="text-[11px] font-mono text-primary font-semibold">
                2 Dependent &bull; {activeSelectedVariables.length} Independent &bull; {customFields.length} Custom
              </span>
            </div>

            {/* Drag Guidance Banner */}
            <div className="px-4 py-2 bg-primary/5 border-b border-primary/10 text-[11px] text-primary flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                Drag &amp; drop any variable here to open its Field Mapping Dialog
              </span>
              <span className="text-subtle font-mono text-[10px]">
                Drop Zone Ready
              </span>
            </div>

            {/* Dropped Variables Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {activeSelectedVariables.length === 0 && customFields.length === 0 ? (
                /* Empty Drop Zone State */
                <div
                  className={`h-full min-h-[300px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center transition-colors ${
                    isDraggingOver
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/80 text-subtle'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Layers className="w-6 h-6 text-subtle" />
                  </div>
                  <h4 className="text-sm font-bold text-deep">
                    No Independent Variables Added Yet
                  </h4>
                  <p className="text-xs text-body max-w-sm mt-1 leading-relaxed">
                    Drag and drop variables from the menu on the left to immediately configure their source table &amp; field in the popup dialog.
                  </p>
                  <button
                    type="button"
                    onClick={onSelectRecommended}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Load Recommended Canonical Set</span>
                  </button>
                </div>
              ) : (
                /* List of Dropped Independent Variables */
                <>
                  {activeSelectedVariables.map((v, index) => {
                    const currentMap = mappings.find((m) => m.id === v.id);

                    return (
                      <div
                        key={v.id}
                        className="p-3.5 rounded-xl border border-border bg-surface hover:bg-muted/30 transition-all flex items-center justify-between gap-3 shadow-2xs group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Index numbering badge */}
                          <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {index + 1}
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-deep truncate">
                                {v.name}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-muted text-subtle shrink-0">
                                {v.category.split('&')[0]}
                              </span>
                            </div>

                            {/* Active Mapped Source Info */}
                            <div className="flex items-center gap-2 text-[10px] font-mono text-subtle flex-wrap">
                              <span className="text-deep font-semibold bg-muted px-1.5 py-0.2 rounded">
                                {currentMap?.sourceSystem || v.defaultSourceSystem}
                              </span>
                              <span>&rarr;</span>
                              <span className="text-primary font-bold">
                                {currentMap?.sourceTable || v.defaultTable}.{currentMap?.sourceField || v.defaultField}
                              </span>
                              <span>&bull;</span>
                              <span>{currentMap?.dataType || v.dataType}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Actions: Edit Mapping + Remove */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => openMappingDialogForVariable(v, true)}
                            className="p-1.5 text-subtle hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit field mapping"
                          >
                            <Settings2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleVariable(v.id)}
                            className="p-1.5 text-subtle hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                            title="Remove variable from pipeline"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Custom Fields Section */}
                  {customFields.length > 0 && (
                    <div className="pt-3 space-y-2 border-t border-border">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-subtle uppercase tracking-wider">
                        <span className="flex items-center gap-1.5 text-primary">
                          <FolderTree className="w-3.5 h-3.5" />
                          Custom User Variables ({customFields.length})
                        </span>
                      </div>

                      {customFields.map((cf) => (
                        <div
                          key={cf.id}
                          className="p-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex items-center justify-between gap-3 shadow-2xs"
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-deep font-mono">
                                {cf.fieldName}
                              </span>
                              <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-semibold px-1.5 py-0.2 rounded">
                                Custom
                              </span>
                            </div>
                            <div className="text-[10px] font-mono text-subtle truncate">
                              Source: <strong className="text-deep">{cf.sourceSystem}</strong> &bull; Path: <span className="text-primary">{cf.directoryOrPath}</span> &bull; {cf.tableOrEndpoint}.{cf.fieldOrColumn}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveCustomField(cf.id)}
                            className="p-1.5 text-subtle hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors shrink-0"
                            title="Remove custom field"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Pipeline Summary Bar */}
            <div className="p-3 bg-muted/40 border-t border-border flex items-center justify-between text-xs text-subtle">
              <span>Ready for Review: <strong>{totalSelectedCount} Total Attributes Mapped</strong></span>
              <span className="font-mono text-[11px] text-primary">All Columns Stage-Ready</span>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* MODAL: FIELD MAPPING DIALOG (Appears on Add or Drag & Drop) */}
      {/* ============================================================ */}
      {mappingModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-border gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Field Mapping Configuration
                  </span>
                  <span className="text-[11px] text-subtle font-mono">
                    {mappingModalTarget.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-deep mt-1 flex items-center gap-2">
                  <Table className="w-4 h-4 text-primary" />
                  <span>Configure Mapping: {mappingModalTarget.name}</span>
                </h3>
                <p className="text-xs text-subtle mt-0.5">
                  {mappingModalTarget.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMappingModalTarget(null)}
                className="text-subtle hover:text-deep text-lg font-bold p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmMapping} className="space-y-4 text-xs">
              
              {/* Source System */}
              <div>
                <label className="block font-semibold text-deep mb-1">
                  Source Enterprise System *
                </label>
                <select
                  value={mapSourceSystem}
                  onChange={(e) => setMapSourceSystem(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                >
                  {SOURCE_SYSTEMS.map((sys) => (
                    <option key={sys} value={sys}>
                      {sys}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Source Table */}
                <div>
                  <label className="block font-semibold text-deep mb-1">
                    Source Table / View / Endpoint *
                  </label>
                  <input
                    type="text"
                    required
                    value={mapSourceTable}
                    onChange={(e) => setMapSourceTable(e.target.value)}
                    placeholder="e.g. VBAP or public.orders_historical"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <span className="text-[10px] text-subtle mt-0.5 block font-mono">
                    Canonical default: {mappingModalTarget.defaultTable.split(' ')[0]}
                  </span>
                </div>

                {/* Source Field */}
                <div>
                  <label className="block font-semibold text-deep mb-1">
                    Source Column / Attribute Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={mapSourceField}
                    onChange={(e) => setMapSourceField(e.target.value)}
                    placeholder="e.g. NETPR or unit_price"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-primary font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <span className="text-[10px] text-subtle mt-0.5 block font-mono">
                    Canonical default: {mappingModalTarget.defaultField.split(' ')[0]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Data Type */}
                <div>
                  <label className="block font-semibold text-deep mb-1">
                    Attribute Data Type
                  </label>
                  <select
                    value={mapDataType}
                    onChange={(e) => setMapDataType(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="DECIMAL(11,2)">DECIMAL(11,2) — Currency / Pricing</option>
                    <option value="DECIMAL(13,3)">DECIMAL(13,3) — Stock / Volume</option>
                    <option value="DECIMAL(6,3)">DECIMAL(6,3) — Rate / Index</option>
                    <option value="INTEGER">INTEGER — Counts / Days</option>
                    <option value="VARCHAR(64)">VARCHAR(64) — Text Code</option>
                    <option value="BOOLEAN">BOOLEAN — 0 / 1 Flag</option>
                    <option value="TIMESTAMP">TIMESTAMP — Datetime</option>
                  </select>
                </div>

                {/* Reset to Canonical Button */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleResetToDefaults}
                    className="w-full bg-muted hover:bg-muted/80 text-deep border border-border rounded-lg px-3 py-2 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Database className="w-3.5 h-3.5 text-primary" />
                    <span>Reset to ERP Canonical Defaults</span>
                  </button>
                </div>
              </div>

              {/* Informational Guidance */}
              <div className="p-3 bg-muted/40 border border-border rounded-lg text-[11px] text-subtle">
                <span>The AITEK Ingestion engine will bind this source field directly during the time-scoped sync phase. No intermediate ETL required.</span>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setMappingModalTarget(null)}
                  className="px-4 py-2 rounded-lg text-subtle hover:text-deep hover:bg-muted transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-semibold shadow-xs transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isEditingExisting ? 'Update Mapping' : 'Confirm & Add to Pipeline'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD ADDITIONAL CUSTOM FIELDS                         */}
      {/* ============================================================ */}
      {isAddCustomModalOpen && (
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
                onClick={() => setIsAddCustomModalOpen(false)}
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
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-deep focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
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
                  onClick={() => setIsAddCustomModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-subtle hover:text-deep hover:bg-muted transition-colors font-medium"
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
