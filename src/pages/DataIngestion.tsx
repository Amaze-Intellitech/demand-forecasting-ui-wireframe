import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAitek } from '../context/AitekContext';
import { ConnectionWizardModal } from '../components/aitek/ConnectionWizardModal';
import {
  Eye,
  Database,
  Network,
  TableProperties,
  History,
  Settings,
  LogOut,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import aitekLogo from '../assets/aitek_logo.png';

interface SourceConnectorItem {
  id: string;
  name: string;
  category: 'ERP' | 'Databases' | 'Cloud' | 'Files' | 'APIs';
  logo: React.ReactNode;
}

export const DataIngestion: React.FC = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const navigate = useNavigate();
  const {
    solutions,
    selectedSolution,
    selectSolution,
    connectors,
    updateConnectorStatus,
    logout
  } = useAitek();

  const activeSolution =
    solutions.find((s) => s.id === solutionId) || selectedSolution || solutions[0];

  React.useEffect(() => {
    if (solutionId && solutionId !== selectedSolution?.id) {
      selectSolution(solutionId);
    }
  }, [solutionId, selectedSolution, selectSolution]);

  // Sidebar navigation state
  const [activeNav, setActiveNav] = useState<'overview' | 'ingestion' | 'connections' | 'mapping' | 'history' | 'settings'>('ingestion');

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ERP' | 'Databases' | 'Cloud' | 'Files' | 'APIs'>('all');

  // Stepper current state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected source card
  const [selectedSourceId, setSelectedSourceId] = useState<string>('sap');

  // Connection Wizard Modal state
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // 12 Authentic Enterprise Source Connectors
  const ALL_SOURCES: SourceConnectorItem[] = [
    {
      id: 'sap',
      name: 'SAP',
      category: 'ERP',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <div
            className="bg-[#0070d2] text-white font-black text-sm px-3 py-1 rounded tracking-tight shadow-xs"
            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
          >
            SAP
          </div>
        </div>
      ),
    },
    {
      id: 'oracle',
      name: 'Oracle',
      category: 'ERP',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <span className="text-[#f80000] font-black text-base tracking-widest font-sans">
            ORACLE
          </span>
        </div>
      ),
    },
    {
      id: 'ms-dynamics',
      name: 'Microsoft Dynamics',
      category: 'ERP',
      logo: (
        <div className="h-10 flex items-center justify-center gap-0.5">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <path d="M4 8l10-4v10l-10 4V8z" fill="#F25022" />
            <path d="M16 4l12 5v10l-12-5V4z" fill="#7FBA00" />
            <path d="M16 16l12 5v7l-12-5v-7z" fill="#00A4EF" />
            <path d="M4 20l10 4v7l-10-4v-7z" fill="#FFB900" />
          </svg>
        </div>
      ),
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Databases',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 15c-18 0-32 14-32 32 0 10 5 19 12 25v12l10-5c3 1 7 2 10 2 18 0 32-14 32-32S68 15 50 15z"
              stroke="#336791"
              strokeWidth="5"
              fill="#4a7da8"
            />
            <circle cx="42" cy="40" r="3.5" fill="white" />
          </svg>
        </div>
      ),
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Databases',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <svg className="w-9 h-9 text-[#00758f]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 9.5c-.8-1.5-2.2-2.5-4-2.8 1.2-1 2.8-1.6 4.5-1.7-2.3-.5-4.8-.1-6.9 1.1-1.3.7-2.4 1.7-3.1 3-.7 1.2-1 2.6-1 4 0 2.2.8 4.3 2.3 5.8 1.5 1.5 3.6 2.3 5.7 2.3 2.5 0 4.9-1.1 6.5-3-1.6.8-3.4 1.1-5.2.8-1.7-.3-3.2-1.3-4.2-2.7-1-1.4-1.4-3.1-1.2-4.8.2-1.7 1.1-3.2 2.5-4.2.9-.6 1.9-1 3-1.1.8 1.1 1.3 2.3 1.1 3.5z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'sql-server',
      name: 'SQL Server',
      category: 'Databases',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#cc292b]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zm0 6c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zm0 6c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'snowflake',
      name: 'Snowflake',
      category: 'Cloud',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-6.5l-2.8 2.8m-7.4 7.4l-2.8 2.8m0-13l2.8 2.8m7.4 7.4l2.8 2.8"
              stroke="#29b5e8"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 'databricks',
      name: 'Databricks',
      category: 'Cloud',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L2 8l10 5 10-5-10-5z" fill="#FF3621" />
            <path d="M2 11l10 5 10-5" stroke="#FF3621" strokeWidth="2" />
            <path d="M2 15l10 5 10-5" stroke="#FF3621" strokeWidth="2" />
          </svg>
        </div>
      ),
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'Cloud',
      logo: (
        <div className="h-10 flex flex-col items-center justify-center">
          <span className="leading-none text-base font-black lowercase text-[#232f3e] tracking-tight">aws</span>
          <svg className="w-7 h-2 text-[#ff9900]" viewBox="0 0 40 10" fill="currentColor">
            <path d="M2 3c10 6 26 6 36 0-3 3-10 6-18 6S5 6 2 3z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'azure',
      name: 'Azure',
      category: 'Cloud',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M13.05 2.15L3.25 18.75h5.5l7.1-12.05z" fill="#0089D6" />
            <path d="M13.6 7.6L9.6 14.5l3.2 5.5h8L13.6 7.6z" fill="#0072C6" />
          </svg>
        </div>
      ),
    },
    {
      id: 'google-cloud',
      name: 'Google Cloud',
      category: 'Cloud',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
            <path
              d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
              fill="#4285F4"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 'upload-files',
      name: 'Upload Files',
      category: 'Files',
      logo: (
        <div className="h-10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#0066cc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="12" y2="17" />
          </svg>
        </div>
      ),
    },
  ];

  // Filtered source list
  const filteredSources = useMemo(() => {
    if (selectedCategory === 'all') return ALL_SOURCES;
    return ALL_SOURCES.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  // Stepper definition matching panel4.png
  const STEPS = [
    { num: 1, label: 'Select Source' },
    { num: 2, label: 'Connect' },
    { num: 3, label: 'Select Data' },
    { num: 4, label: 'Map Fields' },
    { num: 5, label: 'Validate' },
    { num: 6, label: 'Sync' },
  ];

  // Map to matching connector in store for wizard
  const currentConnector = useMemo(() => {
    return (
      connectors.find((c) => c.id.includes(selectedSourceId) || selectedSourceId.includes(c.id.split('-')[0])) ||
      connectors[0]
    );
  }, [connectors, selectedSourceId]);

  const handleNext = () => {
    // Open guided connection flow modal for the selected connector
    setIsWizardOpen(true);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleCompleteConnection = (connectorId: string, count: number) => {
    updateConnectorStatus(connectorId, 'connected', count);
    setCurrentStep(6);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#f4f6fa] text-slate-900 font-sans select-none overflow-x-hidden">
      
      {/* Top Flex Container: Sidebar + Main Content */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        
        {/* Left Dark Navigation Sidebar */}
        <aside className="w-full md:w-64 lg:w-68 bg-[#080e1a] border-r border-slate-800/80 flex flex-col justify-between p-5 z-20 flex-shrink-0">
          <div>
            {/* Top Logo */}
            <div className="pt-2 pb-6 px-1 flex items-center justify-start">
              <Link to="/solutions">
                <img
                  src={aitekLogo}
                  alt="AITEK"
                  className="h-20 sm:h-24 w-auto object-contain filter drop-shadow-[0_0_18px_rgba(56,189,248,0.4)] hover:opacity-95 transition-opacity"
                />
              </Link>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 pt-2">
              {/* Overview */}
              <button
                onClick={() => {
                  setActiveNav('overview');
                  navigate(`/solutions/${solutionId || 'demand-intelligence'}/overview`);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'overview'
                    ? 'bg-[#1053b8] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Overview</span>
              </button>

              {/* Data Ingestion (Active) */}
              <button
                onClick={() => setActiveNav('ingestion')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeNav === 'ingestion'
                    ? 'bg-[#1053b8] text-white shadow-md shadow-blue-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Data Ingestion</span>
              </button>

              {/* Connections */}
              <button
                onClick={() => setActiveNav('connections')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'connections'
                    ? 'bg-[#1053b8] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Network className="w-4 h-4" />
                <span>Connections</span>
              </button>

              {/* Data Mapping */}
              <button
                onClick={() => setActiveNav('mapping')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'mapping'
                    ? 'bg-[#1053b8] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <TableProperties className="w-4 h-4" />
                <span>Data Mapping</span>
              </button>

              {/* Sync History */}
              <button
                onClick={() => setActiveNav('history')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'history'
                    ? 'bg-[#1053b8] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Sync History</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => setActiveNav('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeNav === 'settings'
                    ? 'bg-[#1053b8] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Bottom Sign Out */}
          <div className="pt-6 border-t border-slate-800/60">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors p-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          
          <div className="space-y-6 max-w-6xl mx-auto w-full">
            
            {/* Top Header: Title & Subtitle + Top-Right Current Solution Name Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Connect Your Data
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Bring together the data that powers your AITEK solution.
                </p>
              </div>

              {/* Requirement: Top Right Current Solution Name Displayed */}
              <div className="self-start sm:self-auto">
                <div className="inline-flex items-center gap-2 bg-[#e9f2ff] border border-blue-200/90 text-[#0052b3] font-semibold px-4 py-1.5 rounded-full text-xs shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0062d2] animate-pulse" />
                  <span>{activeSolution.name}</span>
                </div>
              </div>
            </div>

            {/* Stepper Progress Indicator (6 Steps matching reference) */}
            <div className="py-3 px-2 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[560px] relative">
                {/* Connecting Track Line */}
                <div className="absolute top-4 left-6 right-6 h-[2px] bg-slate-200 -z-0" />
                <div
                  className="absolute top-4 left-6 h-[2px] bg-[#0062d2] -z-0 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step) => {
                  const isActive = step.num === currentStep;
                  const isDone = step.num < currentStep;

                  return (
                    <div
                      key={step.num}
                      onClick={() => setCurrentStep(step.num)}
                      className="flex flex-col items-center gap-1.5 z-10 cursor-pointer group"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#0062d2] text-white shadow-md shadow-blue-500/30 ring-4 ring-blue-100'
                            : isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                      </div>
                      <span
                        className={`text-[11px] whitespace-nowrap transition-colors ${
                          isActive
                            ? 'font-bold text-[#0062d2]'
                            : isDone
                            ? 'font-medium text-slate-700'
                            : 'font-normal text-slate-500'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Pills Toolbar */}
            <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
              {(['all', 'ERP', 'Databases', 'Cloud', 'Files', 'APIs'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1053b8] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Sources' : cat}
                </button>
              ))}
            </div>

            {/* 12 Connector Cards Grid (Matching reference 2 rows of 6) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 pt-2">
              {filteredSources.map((source) => {
                const isSelected = selectedSourceId === source.id;

                return (
                  <div
                    key={source.id}
                    onClick={() => setSelectedSourceId(source.id)}
                    className={`rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 min-h-[120px] bg-white border ${
                      isSelected
                        ? 'border-transparent ring-2 ring-[#0062d2] shadow-md shadow-blue-500/10 bg-blue-50/15'
                        : 'border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Brand Vector Logo */}
                    <div className="mb-2 transition-transform duration-200 hover:scale-105">
                      {source.logo}
                    </div>

                    {/* Source Name */}
                    <span className="text-xs font-semibold text-slate-800 tracking-tight mt-1">
                      {source.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Right Next Action Button */}
            <div className="flex items-center justify-end pt-4">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-[#0062d2] hover:bg-[#0051b3] active:bg-[#004294] text-white font-semibold text-sm px-7 py-2.5 rounded-lg shadow-sm transition-all"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Spacer */}
          <div className="h-6" />

        </main>
      </div>

      {/* Bottom Docked Presentation Strip: 04 DATA INGESTION */}
      <div className="relative z-30 w-full bg-[#080e1a] border-t border-slate-800/80 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-white">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#0062d2] flex items-center justify-center text-white font-bold text-xs tracking-wider">
            04
          </div>
          <div>
            <span className="font-bold text-xs text-white tracking-wider mr-2 uppercase">
              DATA INGESTION
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Connect, configure and activate your enterprise data
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-3 self-end sm:self-auto">
          <span>Your data. Our intelligence. Greater outcomes.</span>
          <div className="w-16 h-[1px] bg-slate-700 hidden md:block" />
        </div>
      </div>

      {/* Guided Multi-Step Connection Flow Wizard Modal */}
      {isWizardOpen && (
        <ConnectionWizardModal
          connector={currentConnector}
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          onComplete={handleCompleteConnection}
        />
      )}

    </div>
  );
};
