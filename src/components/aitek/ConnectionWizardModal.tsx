import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Connector, FieldMapping } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { PasswordInput } from '../ui/PasswordInput';
import {
  X,
  CheckCircle2,
  Server,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  RefreshCw,
  Database,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ConnectionWizardModalProps {
  connector: Connector;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (connectorId: string, recordCount: number) => void;
}

type StepKey = 'select' | 'auth' | 'data' | 'mapping' | 'validate' | 'sync' | 'ready';

interface StepDef {
  key: StepKey;
  label: string;
  shortDesc: string;
}

const STEPS: StepDef[] = [
  { key: 'select', label: '1. Select Source', shortDesc: 'Compatibility' },
  { key: 'auth', label: '2. Authenticate', shortDesc: 'Credentials' },
  { key: 'data', label: '3. Select Data', shortDesc: 'Entities & Tables' },
  { key: 'mapping', label: '4. Map Fields', shortDesc: 'Schema Transform' },
  { key: 'validate', label: '5. Validate', shortDesc: 'Integrity Check' },
  { key: 'sync', label: '6. Sync', shortDesc: 'Ingest Pipeline' },
  { key: 'ready', label: '7. Ready', shortDesc: 'Connected' },
];

export const ConnectionWizardModal: React.FC<ConnectionWizardModalProps> = ({
  connector,
  isOpen,
  onClose,
  onComplete,
}) => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isTestingAuth, setIsTestingAuth] = useState(false);
  const [authSuccess, setAuthSuccess] = useState<boolean | null>(null);

  // Form State
  const [hostUrl, setHostUrl] = useState(connector.defaultHost || 'gateway.enterprise.corp.com:8443');
  const [tenantId, setTenantId] = useState('TENANT_US_PROD_8842');
  const [authMethod, setAuthMethod] = useState<'oauth' | 'basic' | 'service_account'>('oauth');
  const [clientId, setClientId] = useState('aitek_ingest_svc_usr');
  const [clientSecret, setClientSecret] = useState('••••••••••••••••');

  // Selected Entities
  const [selectedEntities, setSelectedEntities] = useState<string[]>(connector.entities);

  // Mappings State
  const [mappings, setMappings] = useState<FieldMapping[]>(connector.mappings);

  // Sync Progress State
  const [syncProgress, setSyncProgress] = useState(0);
  const [ingestedRows, setIngestedRows] = useState(0);

  // Reset or initialize on modal open
  useEffect(() => {
    if (isOpen) {
      // Always walk the full 6-step wizard in order, regardless of prior connection state.
      setCurrentStepIndex(0);
      setAuthSuccess(null);
      setMappings(connector.mappings);
      setSelectedEntities(connector.entities);
      setSyncProgress(0);
      setIngestedRows(0);
    }
  }, [isOpen, connector]);

  // Handle Sync progression simulation
  useEffect(() => {
    if (STEPS[currentStepIndex]?.key === 'sync') {
      const interval = setInterval(() => {
        setSyncProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setCurrentStepIndex(6); // Step 'ready'
              onComplete(connector.id, 1428500);
            }, 600);
            return 100;
          }
          const next = prev + Math.floor(Math.random() * 18) + 12;
          const capped = Math.min(next, 100);
          setIngestedRows(Math.round((capped / 100) * 1428500));
          return capped;
        });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [currentStepIndex, connector.id, onComplete]);

  if (!isOpen) return null;

  const currentStep = STEPS[currentStepIndex];

  const handleTestConnection = async () => {
    setIsTestingAuth(true);
    setAuthSuccess(null);
    await new Promise((res) => setTimeout(res, 800));
    setIsTestingAuth(false);
    setAuthSuccess(true);
  };

  const handleToggleEntity = (entity: string) => {
    setSelectedEntities((prev) =>
      prev.includes(entity) ? prev.filter((e) => e !== entity) : [...prev, entity]
    );
  };

  const handleMappingChange = (id: string, newSourceField: string) => {
    setMappings((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              sourceField: newSourceField,
              status: newSourceField ? 'valid' : 'unmapped',
            }
          : m
      )
    );
  };

  const handleAutoMapAll = () => {
    setMappings((prev) =>
      prev.map((m) => ({
        ...m,
        status: 'valid',
      }))
    );
  };

  const handleNext = () => {
    if (currentStep.key === 'auth' && !authSuccess) {
      // Require the user to test the connection before advancing past Authenticate.
      return;
    }
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base font-semibold text-white flex items-center gap-2">
                Enterprise Connection Pipeline: <span className="text-blue-400">{connector.name}</span>
              </h2>
              <p className="text-xs text-slate-400">
                AITEK Certified Ingestion Connector &bull; Zero-Data-Loss Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="px-6 py-3 border-b border-slate-800/70 bg-slate-950/30 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] gap-2">
            {STEPS.map((step, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className="flex items-center gap-2"
                >
                  <div
                    className={cn(
                      'flex items-center gap-2 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors',
                      isCurrent && 'bg-primary/10 text-primary border border-primary/30 font-semibold',
                      isDone && 'text-emerald-400',
                      !isCurrent && !isDone && 'text-slate-500'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono',
                        isDone && 'bg-emerald-950 text-emerald-400 border border-emerald-800',
                        isCurrent && 'bg-primary text-white font-bold',
                        !isCurrent && !isDone && 'bg-slate-800 text-slate-500 border border-slate-700'
                      )}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <span>{step.label.replace(/^\d+\.\s*/, '')}</span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={cn('h-0.5 w-4', isDone ? 'bg-emerald-600/60' : 'bg-slate-800')} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: SELECT SOURCE */}
          {currentStep.key === 'select' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-4">
                <div className="p-2.5 rounded-md bg-primary/10 border border-primary/30 text-primary">
                  <Database className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-slate-100">{connector.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{connector.description}</p>
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60">
                      Category: {connector.category}
                    </span>
                    <span
                      className="text-[11px] font-mono bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/60"
                      title="Data is replicated in its native format via change-data-capture and transformed only at query time, rather than pre-transformed by a separate ETL pipeline."
                    >
                      Zero ETL Architecture
                    </span>
                    <span className="text-[11px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/30">
                      CDC Stream Ready
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/40">
                <h4 className="text-sm font-semibold text-slate-200 mb-2">Ingestion Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Authentication Protocol:</span>
                    <span className="text-slate-200 font-mono">OAuth 2.0 / Mutual TLS / SASL</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Compression:</span>
                    <span className="text-slate-200 font-mono">Snappy / Zstandard</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Target Schema Model:</span>
                    <span className="text-slate-200 font-mono">AITEK Canonical Demand/Ops v2</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Network Transit:</span>
                    <span className="text-slate-200 font-mono">Encrypted TLS 1.3 / VPC Peering</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AUTHENTICATE */}
          {currentStep.key === 'auth' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Enterprise Credentials & Endpoint</h3>
                  <p className="text-xs text-slate-400">Configure secure mutual handshake with your enterprise source</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AES-256 Vault Encryption</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Source Endpoint Host / Gateway
                  </label>
                  <Input
                    value={hostUrl}
                    onChange={(e) => setHostUrl(e.target.value)}
                    placeholder="e.g. host.prod.internal.enterprise.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Organization Tenant / Domain
                  </label>
                  <Input
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    placeholder="e.g. TENANT_US_PROD"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Authentication Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthMethod('oauth')}
                    className={cn(
                      'p-2.5 rounded-md border text-xs font-medium text-left transition-colors',
                      authMethod === 'oauth'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    )}
                  >
                    OAuth 2.0 / Client Credentials
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('service_account')}
                    className={cn(
                      'p-2.5 rounded-md border text-xs font-medium text-left transition-colors',
                      authMethod === 'service_account'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    )}
                  >
                    Service Account Key (JSON)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('basic')}
                    className={cn(
                      'p-2.5 rounded-md border text-xs font-medium text-left transition-colors',
                      authMethod === 'basic'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    )}
                  >
                    Standard User / Secure Token
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Service Principal / Client ID
                  </label>
                  <Input
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Secret Key / Token
                  </label>
                  <PasswordInput
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleTestConnection}
                    isLoading={isTestingAuth}
                    leftIcon={<Activity className="w-3.5 h-3.5 text-blue-400" />}
                  >
                    Test Connection Handshake
                  </Button>
                  {authSuccess && (
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Handshake Verified (24ms latency)
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 font-mono">TLS 1.3 Certified</span>
              </div>
            </div>
          )}

          {/* STEP 3: SELECT DATA */}
          {currentStep.key === 'data' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Select Enterprise Data Entities</h3>
                  <p className="text-xs text-slate-400">Choose tables, views, or endpoints to replicate into AITEK</p>
                </div>
                <div className="text-xs text-blue-400 font-mono">
                  {selectedEntities.length} of {connector.entities.length} selected
                </div>
              </div>

              <div className="space-y-2">
                {connector.entities.map((entity) => {
                  const isChecked = selectedEntities.includes(entity);
                  return (
                    <div
                      key={entity}
                      onClick={() => handleToggleEntity(entity)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors',
                        isChecked
                          ? 'border-primary/50 bg-primary/10'
                          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded border-slate-700 text-primary focus:ring-primary bg-slate-900"
                        />
                        <div>
                          <div className="text-sm font-mono text-slate-200 font-medium">{entity}</div>
                          <div className="text-[11px] text-slate-400">Replication mode: Incremental CDC</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                        Compatible
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: MAP FIELDS */}
          {currentStep.key === 'mapping' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Canonical Field Mapping</h3>
                  <p className="text-xs text-slate-400">
                    Transform raw source attributes to AITEK standardized operational schema
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAutoMapAll}
                  className="text-xs"
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-blue-400" />}
                >
                  Auto-Map Fields
                </Button>
              </div>
              <p className="text-[11px] text-slate-500 -mt-4">
                Auto-mapping matches source column names against the AITEK canonical schema using exact and fuzzy name matching; fields still marked "Pending" below need manual review.
              </p>

              <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                      <th className="py-2.5 px-3">Target AITEK Field</th>
                      <th className="py-2.5 px-3">Source Column / Expression</th>
                      <th className="py-2.5 px-3">Data Type</th>
                      <th className="py-2.5 px-3">Validation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 font-mono">
                    {mappings.map((mapping) => (
                      <tr key={mapping.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-3 text-slate-200 font-semibold font-sans">
                          {mapping.aitekField}
                          {mapping.required && (
                            <span className="ml-1 text-red-400 font-mono">*</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <input
                            type="text"
                            value={mapping.sourceField}
                            onChange={(e) => handleMappingChange(mapping.id, e.target.value)}
                            className="bg-slate-950 border border-slate-700/80 rounded px-2 py-1 text-xs text-blue-300 w-full font-mono focus:outline-none focus:border-primary"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">
                          {mapping.dataType}
                        </td>
                        <td className="py-2.5 px-3">
                          {mapping.status === 'valid' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-medium font-sans">
                              <CheckCircle2 className="w-3 h-3" />
                              Mapped
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-400 text-[11px] font-medium font-sans">
                              <AlertTriangle className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary flex items-center justify-between">
                <span>All required canonical columns have satisfied schema constraints.</span>
                <span className="font-mono text-slate-400">Canonical Model v2.4</span>
              </div>
            </div>
          )}

          {/* STEP 5: VALIDATE */}
          {currentStep.key === 'validate' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-slate-100">Automated Pipeline Validation</h3>
                <p className="text-xs text-slate-400">
                  Pre-flight schema and data sanity verification before continuous replication
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Schema Integrity</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 100% Passed
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    0 type mismatches, checked against AITEK Canonical Model v2.4
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Null Constraint Check</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 0 Violations
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Required fields verified against a sample of the source data; primary keys intact
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Estimated Row Count</div>
                  <div className="text-lg font-bold text-blue-400 mt-1">
                    ~1,428,500
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Estimated sync: 12 seconds</div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-lg p-4 bg-slate-950/40 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Connection latency handshake:</span>
                  <span className="font-mono text-emerald-400">18 ms</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Historical lookback window:</span>
                  <span className="font-mono text-slate-200">730 Days (24 Months)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Deduplication index:</span>
                  <span className="font-mono text-slate-200">Automatic SHA-256</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: SYNC PROGRESS */}
          {currentStep.key === 'sync' && (
            <div className="py-8 space-y-6 text-center animate-in fade-in duration-150">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto text-primary animate-pulse">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">Replicating Enterprise Records</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ingesting and transforming data from {connector.name} into AITEK Canonical Store
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>{ingestedRows.toLocaleString()} / 1,428,500 records</span>
                  <span className="text-blue-400 font-semibold">{syncProgress}%</span>
                </div>

                {/* Progress bar */}
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${syncProgress}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 pt-1 font-mono">
                  <span>Throughput: ~124,000 rows/sec</span>
                  <span title="Each batch is verified against a SHA-256 checksum of the source extract before being marked ingested.">
                    Zero-Loss Checksum Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: READY / COMPLETION */}
          {currentStep.key === 'ready' && (
            <div className="py-6 space-y-5 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">Pipeline Activated Successfully</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  {connector.name} is now connected with active real-time synchronization powering your solution models.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/50 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 font-semibold">Active Replication</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ingested Records:</span>
                  <span className="text-slate-200 font-mono">1,428,500 items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Scheduled Sweep:</span>
                  <span className="text-slate-200 font-mono">Continuous CDC &bull; Sub-second</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <div>
            {currentStepIndex > 0 && currentStep.key !== 'sync' && currentStep.key !== 'ready' && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleBack}
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep.key !== 'ready' && currentStep.key !== 'sync' && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                Cancel
              </Button>
            )}

            {currentStep.key === 'select' && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Proceed to Authentication
              </Button>
            )}

            {currentStep.key === 'auth' && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={!authSuccess}
                title={!authSuccess ? 'Test the connection handshake before continuing' : undefined}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Configure Entities
              </Button>
            )}

            {currentStep.key === 'data' && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Review Canonical Mappings
              </Button>
            )}

            {currentStep.key === 'mapping' && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Run Validation Checks
              </Button>
            )}

            {currentStep.key === 'validate' && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                rightIcon={<Zap className="w-3.5 h-3.5" />}
              >
                Start Replication Sync
              </Button>
            )}

            {currentStep.key === 'ready' && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  Done
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    navigate('/solutions/demand-intelligence/executive');
                  }}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Go to Executive Command Center
                </Button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
