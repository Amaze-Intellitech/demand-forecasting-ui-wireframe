import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Radio,
  TrendingUp,
  Box,
  Boxes,
  SlidersHorizontal,
  Network,
  AlertTriangle,
  Sparkles,
  Cpu,
} from 'lucide-react';
import aitekLogo from '../../assets/aitek_logo.png';
import solutionLoginBg from '../../assets/solution_login_bg.jpg';

export interface DemandIntelligenceSidebarProps {
  activeTab: string;
  onSelectTab?: (tabId: string) => void;
}

export const DemandIntelligenceSidebar: React.FC<DemandIntelligenceSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    onSelectTab?.(id);
    const routeMap: Record<string, string> = {
      overview: '/solutions/demand-intelligence/overview',
      sensing: '/solutions/demand-intelligence/signals',
      signals: '/solutions/demand-intelligence/signals',
      forecast: '/solutions/demand-intelligence/forecast',
      drivers: '/solutions/demand-intelligence/signals',
      inventory: '/solutions/demand-intelligence/inventory',
      scenarios: '/solutions/demand-intelligence/scenarios',
      sourcing: '/solutions/demand-intelligence/sourcing',
      exceptions: '/solutions/demand-intelligence/exceptions',
      copilot: '/solutions/demand-intelligence/copilot',
      agents: '/solutions/demand-intelligence/copilot',
    };
    if (routeMap[id]) {
      navigate(routeMap[id]);
    }
  };

  const decisionIntelligenceItems = [
    { id: 'overview', label: 'Executive Command Center', icon: LayoutDashboard },
    { id: 'sensing', label: 'Demand Sensing', icon: Radio },
    { id: 'forecast', label: 'Forecast Intelligence', icon: TrendingUp },
    { id: 'drivers', label: 'Driver & Causal Intelligence', icon: Box },
    { id: 'inventory', label: 'Inventory Intelligence', icon: Boxes },
    { id: 'scenarios', label: 'Scenario & Decision Twin', icon: SlidersHorizontal },
    { id: 'sourcing', label: 'Supply & Capacity Optimization', icon: Network },
    { id: 'exceptions', label: 'Risk & Exception Center', icon: AlertTriangle },
    { id: 'copilot', label: 'AI Decision Copilot', icon: Sparkles },
  ];

  const operationsItems = [
    { id: 'agents', label: 'Agent Control Center', icon: Cpu },
  ];

  return (
    <aside className="w-full md:w-64 lg:w-68 bg-[#080e1a] border-r border-slate-800/80 flex flex-col justify-between z-20 flex-shrink-0 relative overflow-hidden select-none">
      {/* Background Silhouette Gradient at Bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 bg-cover bg-bottom opacity-15 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url(${solutionLoginBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080e1a] via-[#080e1a]/95 to-[#080e1a]/85 pointer-events-none" />

      {/* Top Header & Navigation Links */}
      <div className="relative z-10 p-5">
        {/* Top AITEK Logo */}
        <div className="pt-1 pb-5 px-1 flex items-center justify-start">
          <Link to="/solutions" className="block focus:outline-none">
            <img
              src={aitekLogo}
              alt="AITEK"
              className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-[0_0_18px_rgba(56,189,248,0.4)] hover:opacity-95 transition-opacity"
            />
          </Link>
        </div>

        {/* Primary Group: DECISION INTELLIGENCE */}
        <nav className="space-y-1 pt-1">
          {decisionIntelligenceItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeTab === item.id ||
              (item.id === 'overview' && (activeTab === 'overview' || activeTab === 'cockpit')) ||
              (item.id === 'sensing' && activeTab === 'signals');

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0062d2] text-white shadow-md shadow-blue-950/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate text-left">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Secondary Group Divider: OPERATIONS & GOVERNANCE */}
        <div className="pt-5 pb-1.5">
          <div className="h-[1px] bg-slate-800/80 mb-2.5" />
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Operations & Governance
          </span>
        </div>

        {/* Secondary Group Navigation */}
        <div className="space-y-1">
          {operationsItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0062d2] text-white shadow-md shadow-blue-950/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate text-left">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Brand Statement */}
      <div className="relative z-10 p-5 pt-3 border-t border-slate-800/60">
        <div className="w-7 h-[2px] bg-sky-400 mb-2.5" />
        <h4 className="text-sm font-bold text-white leading-tight tracking-tight">
          Turning<br />
          Data into<br />
          Decisions
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed font-normal mt-1.5">
          A Smarter,<br />
          More Resilient<br />
          Tomorrow
        </p>
      </div>
    </aside>
  );
};
