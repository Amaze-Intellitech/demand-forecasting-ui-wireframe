import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAitek } from '../context/AitekContext';
import {
  MaterialMasterItem,
  DataPeriodConfig,
  ColumnMappingConfig,
  CustomFieldItem,
  DataSelectionSession
} from '../types';
import {
  MOCK_MATERIALS,
  MOCK_VARIABLES,
  DEFAULT_SELECTED_VARIABLE_IDS,
  computePeriodDates
} from '../data/dataSelectionMock';
import { MaterialSelectionStep } from '../components/aitek/dataSelection/MaterialSelectionStep';
import { PeriodSelectionStep } from '../components/aitek/dataSelection/PeriodSelectionStep';
import { VariablesSelectionStep } from '../components/aitek/dataSelection/VariablesSelectionStep';
import { FieldMappingStep } from '../components/aitek/dataSelection/FieldMappingStep';
import { ReviewAndSaveStep } from '../components/aitek/dataSelection/ReviewAndSaveStep';
import { IngestionRunningStep } from '../components/aitek/dataSelection/IngestionRunningStep';
import { WorkbenchLaunchStep } from '../components/aitek/dataSelection/WorkbenchLaunchStep';
import {
  Eye,
  Database,
  Network,
  TableProperties,
  History,
  Settings,
  LogOut,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import aitekLogo from '../assets/aitek_logo.png';
import { ThemeToggle } from '../components/ui/ThemeToggle';

const STORAGE_KEY = 'aitek_data_selection_session';

export const DataIngestion: React.FC = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const navigate = useNavigate();
  const {
    solutions,
    selectedSolution,
    selectSolution,
    updateConnectorStatus,
    logout
  } = useAitek();

  const activeSolution =
    solutions.find((s) => s.id === solutionId) || selectedSolution || solutions[0];

  useEffect(() => {
    if (solutionId && solutionId !== selectedSolution?.id) {
      selectSolution(solutionId);
    }
  }, [solutionId, selectedSolution, selectSolution]);

  // Sidebar navigation state
  const [activeNav, setActiveNav] = useState<'overview' | 'ingestion' | 'connections' | 'mapping' | 'history' | 'settings'>('ingestion');

  // Stepper state: 1 (Material) -> 2 (Period) -> 3 (Variables) -> 4 (Mapping) -> 5 (Review) -> 6 (Ingestion) -> 7 (Workbench)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Core Data Selection Wizard State
  const [material, setMaterial] = useState<MaterialMasterItem>(MOCK_MATERIALS[0]);
  const [period, setPeriod] = useState<DataPeriodConfig>(() => computePeriodDates('3'));
  const [selectedVariableIds, setSelectedVariableIds] = useState<string[]>(DEFAULT_SELECTED_VARIABLE_IDS);
  const [customFields, setCustomFields] = useState<CustomFieldItem[]>([]);
  const [isConfigSaved, setIsConfigSaved] = useState<boolean>(false);
  const [hasLoadedSavedConfig, setHasLoadedSavedConfig] = useState<boolean>(false);

  // Build initial or updated mappings based on selected variables and custom fields
  const generateMappings = useCallback(
    (varIds: string[], cFields: CustomFieldItem[], existingMappings: ColumnMappingConfig[] = []): ColumnMappingConfig[] => {
      const existingMap = new Map(existingMappings.map((m) => [m.id, m]));
      const result: ColumnMappingConfig[] = [];

      // 1. Mandatory stock variable
      const stockVar = MOCK_VARIABLES.find((v) => v.id === 'stock_level')!;
      const existingStock = existingMap.get(stockVar.id);
      result.push(
        existingStock || {
          id: stockVar.id,
          columnName: stockVar.name,
          role: 'Dependent Variable',
          dataType: stockVar.dataType,
          sourceSystem: stockVar.defaultSourceSystem,
          sourceTable: stockVar.defaultTable,
          sourceField: stockVar.defaultField,
          status: 'valid',
          unit: stockVar.unit,
        }
      );

      // 2. Selected independent variables
      varIds.forEach((id) => {
        if (id === 'stock_level') return;
        const v = MOCK_VARIABLES.find((item) => item.id === id);
        if (!v) return;

        const existing = existingMap.get(id);
        result.push(
          existing || {
            id: v.id,
            columnName: v.name,
            role: 'Independent Variable',
            dataType: v.dataType,
            sourceSystem: v.defaultSourceSystem,
            sourceTable: v.defaultTable,
            sourceField: v.defaultField,
            status: 'valid',
            unit: v.unit,
          }
        );
      });

      // 3. Custom fields added by user
      cFields.forEach((cf) => {
        const existing = existingMap.get(cf.id);
        result.push(
          existing || {
            id: cf.id,
            columnName: cf.fieldName,
            role: 'Custom Variable',
            dataType: cf.dataType,
            sourceSystem: cf.sourceSystem,
            sourceTable: cf.tableOrEndpoint,
            sourceField: cf.fieldOrColumn,
            status: 'custom',
          }
        );
      });

      return result;
    },
    []
  );

  const [mappings, setMappings] = useState<ColumnMappingConfig[]>(() =>
    generateMappings(DEFAULT_SELECTED_VARIABLE_IDS, [])
  );

  // Load saved configuration on mount if present in localStorage (PDF Screen 6: "Reloaded at next login")
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: DataSelectionSession = JSON.parse(raw);
        if (saved.material) setMaterial(saved.material);
        if (saved.selectedVariableIds) setSelectedVariableIds(saved.selectedVariableIds);
        if (saved.customFields) setCustomFields(saved.customFields);
        if (saved.mappings) setMappings(saved.mappings);
        setIsConfigSaved(true);
        setHasLoadedSavedConfig(true);
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Sync mappings whenever variables or custom fields change
  const handleToggleVariable = (id: string) => {
    if (id === 'stock_level') return; // Mandatory
    setSelectedVariableIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      setMappings((currentMappings) => generateMappings(next, customFields, currentMappings));
      return next;
    });
  };

  const handleSelectRecommended = () => {
    setSelectedVariableIds(DEFAULT_SELECTED_VARIABLE_IDS);
    setMappings((currentMappings) =>
      generateMappings(DEFAULT_SELECTED_VARIABLE_IDS, customFields, currentMappings)
    );
  };

  const handleAddCustomField = (newField: CustomFieldItem) => {
    const updatedCustom = [...customFields, newField];
    setCustomFields(updatedCustom);
    setMappings((currentMappings) =>
      generateMappings(selectedVariableIds, updatedCustom, currentMappings)
    );
  };

  const handleRemoveCustomField = (id: string) => {
    const updatedCustom = customFields.filter((f) => f.id !== id);
    setCustomFields(updatedCustom);
    setMappings((currentMappings) =>
      generateMappings(selectedVariableIds, updatedCustom, currentMappings)
    );
  };

  const handleUpdateMapping = (id: string, updates: Partial<ColumnMappingConfig>) => {
    setMappings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates, status: 'valid' } : m))
    );
  };

  const handleAutoMapAll = () => {
    setMappings((prev) =>
      prev.map((m) => {
        const v = MOCK_VARIABLES.find((item) => item.id === m.id);
        if (v) {
          return {
            ...m,
            sourceSystem: v.defaultSourceSystem,
            sourceTable: v.defaultTable,
            sourceField: v.defaultField,
            status: 'valid',
          };
        }
        return m;
      })
    );
  };

  const handleToggleSaveConfig = (saved: boolean) => {
    setIsConfigSaved(saved);
    if (saved) {
      const sessionData: DataSelectionSession = {
        material,
        period,
        selectedVariableIds,
        customFields,
        mappings,
        isConfigSaved: true,
        savedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      } catch {
        // ignore storage error
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const handleStartIngestion = () => {
    setCurrentStep(6);
  };

  const handleIngestionComplete = () => {
    // Notify AitekContext that data is connected
    updateConnectorStatus('sap-erp', 'connected', 1428500);
    setCurrentStep(7);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  // Stepper definition matching im_saas_user_flow.pdf Screens 3 to 7
  const STEPS = [
    { num: 1, label: '1. Material', shortDesc: 'Customer Master Data' },
    { num: 2, label: '2. Data Period', shortDesc: 'From & To Window' },
    { num: 3, label: '3. Variables', shortDesc: 'Stock & 50 Columns' },
    { num: 4, label: '4. Field Mapping', shortDesc: 'Source System & Table' },
    { num: 5, label: '5. Review & Save', shortDesc: 'Verify & Config Save' },
    { num: 6, label: '6. Ingestion', shortDesc: 'Time-Scoped Pipeline' },
    { num: 7, label: '7. Workbench', shortDesc: 'Analytics Components' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-surface text-deep font-sans select-none overflow-x-hidden">
      {/* Top Flex Container: Sidebar + Main Content */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 lg:w-68 bg-bg border-r border-border flex flex-col justify-between p-5 z-20 shrink-0">
          <div>
            {/* Top Logo */}
            <div className="pt-2 pb-6 px-1 flex items-center justify-start">
              <Link to="/solutions">
                <img
                  src={aitekLogo}
                  alt="AITEK"
                  className="h-20 sm:h-24 w-auto object-contain hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 pt-2">
              {/* Overview */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav('overview');
                  navigate(`/solutions/${solutionId || 'demand-intelligence'}/executive`);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'overview'
                    ? 'bg-primary text-white font-semibold'
                    : 'text-body hover:text-deep hover:bg-muted'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Overview</span>
              </button>

              {/* Data Ingestion (Active) */}
              <button
                type="button"
                onClick={() => setActiveNav('ingestion')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeNav === 'ingestion'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-body hover:text-deep hover:bg-muted'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Data Ingestion</span>
              </button>

              {/* Connections */}
              <button
                type="button"
                onClick={() => setActiveNav('connections')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'connections'
                    ? 'bg-primary text-white font-semibold'
                    : 'text-body hover:text-deep hover:bg-muted'
                }`}
              >
                <Network className="w-4 h-4" />
                <span>Connections</span>
              </button>

              {/* Data Mapping */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav('mapping');
                  setCurrentStep(4);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'mapping'
                    ? 'bg-primary text-white font-semibold'
                    : 'text-body hover:text-deep hover:bg-muted'
                }`}
              >
                <TableProperties className="w-4 h-4" />
                <span>Data Mapping</span>
              </button>

              {/* Sync History */}
              <button
                type="button"
                onClick={() => setActiveNav('history')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'history'
                    ? 'bg-primary text-white font-semibold'
                    : 'text-body hover:text-deep hover:bg-muted'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Sync History</span>
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => setActiveNav('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'settings'
                    ? 'bg-primary text-white font-semibold'
                    : 'text-body hover:text-deep hover:bg-muted'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Bottom Sign Out */}
          <div className="pt-6 border-t border-border flex items-center justify-between">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2.5 text-xs text-subtle hover:text-deep transition-colors p-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
            <ThemeToggle />
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div className="space-y-6 max-w-6xl mx-auto w-full">
            {/* Top Header: Title & Subtitle + Solution Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">
                    AITEK Data Selection Pipeline
                  </span>
                  {hasLoadedSavedConfig && (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full border border-primary/20">
                      <BookmarkCheck className="w-3 h-3" />
                      Saved Session Loaded
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep mt-1">
                  Data Selection &amp; Ingestion Wizard
                </h1>
                <p className="text-xs sm:text-sm text-subtle mt-0.5">
                  Select master material, define historical period, specify dependent &amp; independent variables, map sources, and run time-scoped ingestion.
                </p>
              </div>

              {/* Solution Name Badge */}
              <div className="self-start sm:self-auto">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary font-semibold px-4 py-1.5 rounded-full text-xs shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>{activeSolution.name}</span>
                </div>
              </div>
            </div>

            {/* 7-Step Stepper Progress Indicator matching im_saas_user_flow.pdf */}
            <div className="py-2.5 px-1 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[700px] relative">
                {/* Background Connecting Track Line */}
                <div className="absolute top-4 left-6 right-6 h-[2px] bg-border -z-0" />
                <div
                  className="absolute top-4 left-6 h-[2px] bg-primary -z-0 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step) => {
                  const isActive = step.num === currentStep;
                  const isDone = step.num < currentStep;

                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => {
                        // Allow jumping back to earlier steps or completed steps
                        if (step.num <= currentStep || isDone) {
                          setCurrentStep(step.num);
                        }
                      }}
                      className="flex flex-col items-center gap-1.5 z-10 group text-center cursor-pointer disabled:cursor-not-allowed"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-primary text-white shadow-md ring-4 ring-primary/20'
                            : isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white dark:bg-slate-900 border-2 border-border text-subtle group-hover:border-primary/40'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                      </div>
                      <div className="flex flex-col items-center">
                        <span
                          className={`text-[11px] whitespace-nowrap transition-colors ${
                            isActive
                              ? 'font-bold text-primary'
                              : isDone
                              ? 'font-medium text-deep'
                              : 'font-normal text-subtle'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Step Body View */}
            <div className="pt-2">
              {/* STEP 1: MATERIAL SELECTION (Screen 3) */}
              {currentStep === 1 && (
                <MaterialSelectionStep
                  selectedMaterial={material}
                  onSelectMaterial={setMaterial}
                />
              )}

              {/* STEP 2: DATA PERIOD SELECTION (Screen 4) */}
              {currentStep === 2 && (
                <PeriodSelectionStep
                  period={period}
                  onPeriodChange={setPeriod}
                  material={material}
                />
              )}

              {/* STEP 3: VARIABLES SELECTION (Screen 5) */}
              {currentStep === 3 && (
                <VariablesSelectionStep
                  selectedVariableIds={selectedVariableIds}
                  onToggleVariable={handleToggleVariable}
                  onSelectRecommended={handleSelectRecommended}
                  customFields={customFields}
                  onAddCustomField={handleAddCustomField}
                  onRemoveCustomField={handleRemoveCustomField}
                />
              )}

              {/* STEP 4: FIELD MAPPING (Screen 6) */}
              {currentStep === 4 && (
                <FieldMappingStep
                  mappings={mappings}
                  onUpdateMapping={handleUpdateMapping}
                  onAutoMapAll={handleAutoMapAll}
                />
              )}

              {/* STEP 5: REVIEW & SAVE (Screen 6 Review) */}
              {currentStep === 5 && (
                <ReviewAndSaveStep
                  material={material}
                  period={period}
                  mappings={mappings}
                  isConfigSaved={isConfigSaved}
                  onToggleSaveConfig={handleToggleSaveConfig}
                  onGoBack={() => setCurrentStep(3)}
                  onStartIngestion={handleStartIngestion}
                />
              )}

              {/* STEP 6: INGESTION PIPELINE (Section D) */}
              {currentStep === 6 && (
                <IngestionRunningStep
                  material={material}
                  period={period}
                  mappings={mappings}
                  onComplete={handleIngestionComplete}
                />
              )}

              {/* STEP 7: WORKBENCH LAUNCHPAD (Section E) */}
              {currentStep === 7 && (
                <WorkbenchLaunchStep
                  material={material}
                  period={period}
                  mappings={mappings}
                  onRestartPeriod={() => setCurrentStep(2)}
                  solutionId={solutionId || 'demand-intelligence'}
                />
              )}
            </div>

            {/* Bottom Stepper Controls (Visible on steps 1 to 4) */}
            {currentStep < 5 && (
              <div className="flex items-center justify-between pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-border hover:bg-muted text-body hover:text-deep text-xs font-semibold px-5 py-2.5 rounded-lg shadow-xs transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 active:bg-primary/95 text-white font-bold text-xs px-7 py-2.5 rounded-lg shadow-xs transition-all"
                >
                  <span>
                    {currentStep === 1 && 'Next: Select Data Period'}
                    {currentStep === 2 && 'Next: Select Variables'}
                    {currentStep === 3 && 'Next: Map Source Fields'}
                    {currentStep === 4 && 'Next: Review & Save Configuration'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="h-6" />
        </main>
      </div>

      {/* Bottom Docked Presentation Strip: 04 DATA INGESTION */}
      <div className="relative z-30 w-full bg-deep border-t border-border px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-white">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-white font-bold text-xs tracking-wider">
            04
          </div>
          <div>
            <span className="font-bold text-xs text-white tracking-wider mr-2 uppercase">
              DATA SELECTION &amp; INGESTION
            </span>
            <span className="text-xs text-white/60 hidden sm:inline">
              Selected Material: {material.description.split('(')[0]} ({material.code}) &bull; {mappings.length} Fields
            </span>
          </div>
        </div>

        <div className="text-xs text-white/60 flex items-center gap-3 self-end sm:self-auto">
          <span>Your data. Our intelligence. Greater outcomes.</span>
          <div className="w-16 h-[1px] bg-white/20 hidden md:block" />
        </div>
      </div>
    </div>
  );
};
