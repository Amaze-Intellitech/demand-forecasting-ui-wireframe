import React, { useState, useMemo } from 'react';
import { MaterialMasterItem } from '../../../types';
import { MOCK_MATERIALS } from '../../../data/dataSelectionMock';
import { Search, CheckCircle2, Package, MapPin, Clock, ShieldAlert, Sparkles, Building2 } from 'lucide-react';

interface MaterialSelectionStepProps {
  selectedMaterial: MaterialMasterItem;
  onSelectMaterial: (material: MaterialMasterItem) => void;
}

export const MaterialSelectionStep: React.FC<MaterialSelectionStepProps> = ({
  selectedMaterial,
  onSelectMaterial,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter materials based on search term matching description OR code
  const filteredMaterials = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return MOCK_MATERIALS;
    return MOCK_MATERIALS.filter(
      (m) =>
        m.description.toLowerCase().includes(term) ||
        m.code.toLowerCase().includes(term) ||
        m.category.toLowerCase().includes(term) ||
        m.plantName.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info Banner */}
      <div className="border border-border/80 bg-surface/70 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                Screen 03 · Enterprise Master Data
              </span>
              <span className="text-xs text-subtle">&bull; Customer Internal Catalog</span>
            </div>
            <h2 className="text-lg font-bold text-deep tracking-tight">
              Select Material to Model
            </h2>
            <p className="text-xs text-body max-w-2xl leading-relaxed">
              Choose the target SKU or material from your organization&apos;s internal master data. Users can search by natural product description or system code.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-muted/60 border border-border px-3 py-2 rounded-lg text-xs text-body">
            <Building2 className="w-4 h-4 text-primary shrink-0" />
            <span>Master Catalog: <strong className="text-deep font-mono">ABC Manufacturing SAP ERP</strong></span>
          </div>
        </div>
      </div>

      {/* Search and Dropdown Controls */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-deep uppercase tracking-wider">
          Search by Material Description or Code
        </label>
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-subtle absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="e.g. Type 'Polyethylene', 'Cement', 'Steel', or code 'MAT-HDPE-5049'..."
              className="w-full bg-white dark:bg-slate-900 border border-border rounded-xl pl-10 pr-10 py-3 text-sm text-deep placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all font-sans"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 text-xs text-subtle hover:text-deep bg-muted rounded px-1.5 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-border rounded-xl shadow-xl z-30 max-h-72 overflow-y-auto divide-y divide-border/60">
              <div className="p-2 bg-muted/40 text-[11px] font-semibold text-subtle flex items-center justify-between">
                <span>{filteredMaterials.length} Materials matching in master catalog</span>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-xs hover:text-deep"
                >
                  Close &times;
                </button>
              </div>

              {filteredMaterials.length === 0 ? (
                <div className="p-4 text-center text-xs text-subtle">
                  No material matches found for &ldquo;{searchTerm}&rdquo;. Try another term.
                </div>
              ) : (
                filteredMaterials.map((material) => {
                  const isSelected = selectedMaterial.code === material.code;
                  return (
                    <button
                      key={material.code}
                      type="button"
                      onClick={() => {
                        onSelectMaterial(material);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left p-3 flex items-start justify-between gap-3 transition-colors ${
                        isSelected
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted/60 text-deep'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted border border-border text-deep">
                            {material.code}
                          </span>
                          <span className="text-xs font-semibold text-deep truncate">
                            {material.description}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-body">
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3 text-subtle" />
                            {material.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-subtle" />
                            {material.plantName}
                          </span>
                          <span className="font-mono text-subtle">
                            UoM: {material.baseUom}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Quick Pick Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-subtle uppercase tracking-wider">Quick Suggestions:</span>
          {MOCK_MATERIALS.slice(0, 4).map((m) => (
            <button
              key={m.code}
              type="button"
              onClick={() => onSelectMaterial(m)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                selectedMaterial.code === m.code
                  ? 'bg-primary text-white border-primary shadow-xs font-semibold'
                  : 'bg-white dark:bg-slate-900 border-border text-body hover:text-deep hover:border-primary/40'
              }`}
            >
              {m.description.split('(')[0].trim()} ({m.code.split('-')[1]})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Material Detailed View Card */}
      <div className="border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-surface to-surface rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 font-semibold text-xs px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Material Selected for Modeling
              </span>
              <span className="text-xs font-mono bg-muted text-body px-2 py-0.5 rounded border border-border">
                ERP Sync Status: Live
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl font-bold text-deep font-sans">
                  {selectedMaterial.description}
                </h3>
              </div>
              <p className="text-xs font-mono text-primary font-semibold mt-1">
                Internal Master Code: {selectedMaterial.code}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/80 dark:bg-slate-900/80 border border-border/80 rounded-lg p-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle block">
                  Product Family
                </span>
                <span className="text-xs font-semibold text-deep block mt-0.5">
                  {selectedMaterial.category}
                </span>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 border border-border/80 rounded-lg p-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle block">
                  Target Production Plant
                </span>
                <span className="text-xs font-semibold text-deep block mt-0.5">
                  {selectedMaterial.plantName}
                </span>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 border border-border/80 rounded-lg p-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle block">
                  Standard UoM
                </span>
                <span className="text-xs font-semibold text-deep font-mono block mt-0.5">
                  {selectedMaterial.baseUom}
                </span>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 border border-border/80 rounded-lg p-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle block">
                  Replenishment Lead Time
                </span>
                <span className="text-xs font-semibold text-deep flex items-center gap-1 mt-0.5 font-mono">
                  <Clock className="w-3 h-3 text-primary" />
                  {selectedMaterial.leadTimeDays} Days
                </span>
              </div>
            </div>
          </div>

          {/* Right badge callout */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4 lg:w-72 shrink-0 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-deep">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Downstream Model Targeting</span>
            </div>
            <p className="text-[11px] text-body leading-relaxed">
              This material will anchor all time-series dependent variables, causal driver correlations, and multi-echelon safety stock calibrations in subsequent steps.
            </p>
            <div className="pt-1 text-[11px] text-subtle flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Material criticality: <strong>{selectedMaterial.criticality}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
