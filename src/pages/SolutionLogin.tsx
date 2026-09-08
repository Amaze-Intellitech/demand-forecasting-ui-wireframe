import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAitek } from '../context/AitekContext';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ArrowLeft,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import aitekLogo from '../assets/aitek_logo.png';
import solutionLoginBg from '../assets/solution_login_bg.jpg';

interface SolutionPillar {
  title: string;
  icon: React.ReactNode;
}

interface SolutionThemeProfile {
  title: string;
  tagline: string;
  workspaceTitle: string;
  pillars: SolutionPillar[];
}

// Creative, domain-specific profiles intelligently tailored for each solution
// with primary focus on Demand Forecasting / Demand Intelligence
const SOLUTION_THEMES: Record<string, SolutionThemeProfile> = {
  'demand-intelligence': {
    title: 'DEMAND INTELLIGENCE',
    tagline: 'Turn demand volatility into predictive certainty',
    workspaceTitle: 'Demand Intelligence workspace',
    pillars: [
      {
        title: 'Superior forecast accuracy',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        ),
      },
      {
        title: 'Zero stockouts & overages',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ),
      },
      {
        title: 'Autonomous demand sensing',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M4.93 4.93l2.83 2.83" />
            <path d="M16.24 16.24l2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="M4.93 19.07l2.83-2.83" />
            <path d="M16.24 7.76l2.83-2.83" />
          </svg>
        ),
      },
    ],
  },
  'inventory-intelligence': {
    title: 'INVENTORY INTELLIGENCE',
    tagline: 'Turn inventory into opportunity',
    workspaceTitle: 'Inventory Intelligence workspace',
    pillars: [
      {
        title: 'Higher service levels',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ),
      },
      {
        title: 'Lower working capital',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        ),
      },
      {
        title: 'Smarter decisions with AI',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
          </svg>
        ),
      },
    ],
  },
  'manufacturing-excellence': {
    title: 'MANUFACTURING EXCELLENCE',
    tagline: 'Transform plant telemetry into operational uptime',
    workspaceTitle: 'Manufacturing Excellence workspace',
    pillars: [
      {
        title: 'Zero unplanned downtime',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ),
      },
      {
        title: 'Continuous OEE uplift',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        ),
      },
      {
        title: 'Predictive root-cause triage',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
          </svg>
        ),
      },
    ],
  },
  'cement-intelligence': {
    title: 'CEMENT INTELLIGENCE',
    tagline: 'Optimize kiln operations & reduce carbon footprint',
    workspaceTitle: 'Cement Intelligence workspace',
    pillars: [
      {
        title: '28-day clinker strength prediction',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m16 12-4-4-4 4" />
          </svg>
        ),
      },
      {
        title: 'Alternative fuel mix optimization',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
      },
      {
        title: 'Scope-1 thermal emissions reduction',
        icon: (
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4" />
          </svg>
        ),
      },
    ],
  },
};

export const SolutionLogin: React.FC = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const navigate = useNavigate();
  const {
    solutions,
    selectedSolution,
    selectSolution,
    loginSolution,
    user
  } = useAitek();

  // Find solution based on route param or default to demand-intelligence
  const activeSolution =
    solutions.find((s) => s.id === solutionId) || selectedSolution || solutions[0];

  const currentTheme =
    SOLUTION_THEMES[activeSolution.id] || SOLUTION_THEMES['demand-intelligence'];

  useEffect(() => {
    if (solutionId && solutionId !== selectedSolution?.id) {
      selectSolution(solutionId);
    }
  }, [solutionId, selectedSolution, selectSolution]);

  // Form State
  const [selectedOrg, setSelectedOrg] = useState(user?.orgName || 'ABC Manufacturing');
  const [workspaceUser, setWorkspaceUser] = useState(
    user?.email || 'siddhartha.m@aitek.ai'
  );
  const [workspacePassword, setWorkspacePassword] = useState('DemandForecast2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceUser.trim()) {
      setError('Solution User ID is required');
      return;
    }
    if (!workspacePassword) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await loginSolution(activeSolution.id, workspaceUser);
      navigate(`/solutions/${activeSolution.id}/data`);
    } catch {
      setError('Authentication failed. Please verify your workspace key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 font-sans select-none">
      
      {/* Background with Industrial Facility and Dark Moody Cinematic Vignette */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url(${solutionLoginBg})`,
        }}
      >
        {/* Soft gradient blend for text clarity on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-12 flex flex-col justify-between">
        
        {/* Top Header: Logo + Back link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={aitekLogo}
              alt="AITEK"
              className="h-20 sm:h-24 lg:h-28 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            />
          </div>

          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 rounded-lg shadow-sm backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
            <span>Back to Solutions</span>
          </Link>
        </div>

        {/* Center Section: Left Hero + Right Login Card with subtle vertical divider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-10 relative">
          
          {/* Left Column: Solution Identity & Three Value Pillars */}
          <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-6 relative">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.12] uppercase">
                {currentTheme.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-md pt-2">
                {currentTheme.tagline}
              </p>
            </div>

            {/* Three Value Pillars */}
            <div className="space-y-4 pt-2 max-w-md">
              {currentTheme.pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full border border-sky-400/30 bg-sky-950/40 flex items-center justify-center text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)] flex-shrink-0">
                    {pillar.icon}
                  </div>
                  <span className="text-sm sm:text-base text-slate-200 font-medium tracking-wide">
                    {pillar.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Thin Decorative Vertical Divider Visible on Large Screens */}
            <div className="hidden lg:block absolute -right-6 top-4 bottom-4 w-[1px] bg-slate-700/50" />
          </div>

          {/* Right Column: Floating White Solution Login Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[430px] rounded-3xl bg-white text-slate-900 p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-slate-100">
              
              {/* Card Header */}
              <div className="space-y-1 mb-7">
                <h2 className="text-[24px] sm:text-[26px] font-bold text-slate-900 tracking-tight leading-snug">
                  Secure access to your<br />
                  <span className="text-slate-900">{currentTheme.workspaceTitle}</span>
                </h2>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Organization Select Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Organization
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={selectedOrg}
                      onChange={(e) => setSelectedOrg(e.target.value)}
                      className="w-full h-11 px-3.5 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="ABC Manufacturing">ABC Manufacturing</option>
                      <option value="Global Supply Enterprise">Global Supply Enterprise</option>
                      <option value="Acme Industrial Operations">Acme Industrial Operations</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* Solution User ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Solution User ID
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your user ID"
                      value={workspaceUser}
                      onChange={(e) => setWorkspaceUser(e.target.value)}
                      className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={workspacePassword}
                      onChange={(e) => setWorkspacePassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-0.5 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Sign In Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-lg bg-[#0062d2] hover:bg-[#0051b3] active:bg-[#004294] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                  >
                    {isLoading ? (
                      <span>Authorizing...</span>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Protected by AITEK Platform Note */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>Protected by AITEK Platform</span>
                </div>

              </form>

            </div>
          </div>

        </div>

        {/* Bottom Bar: 03 SOLUTION LOGIN Presentation Strip */}
        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#0062d2] flex items-center justify-center text-white font-bold text-xs tracking-wider">
              03
            </div>
            <div>
              <span className="font-bold text-xs text-white tracking-wider mr-2 uppercase">
                SOLUTION LOGIN
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Access your solution environment
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-3 self-end sm:self-auto">
            <span>Same platform. Deeper possibilities.</span>
            <div className="w-16 h-[1px] bg-slate-700 hidden md:block" />
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 text-slate-900 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Workspace Password Help</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Solution-level credentials for <strong>{currentTheme.title}</strong> are provisioned by your <strong>{selectedOrg}</strong> Workspace Administrator.
            </p>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
              Admin Helpdesk: admin@{selectedOrg.toLowerCase().replace(/\s+/g, '')}.com
            </div>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full h-9 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
