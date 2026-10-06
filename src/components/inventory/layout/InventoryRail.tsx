import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Database,
  LineChart,
  ScatterChart,
  PieChart,
  BarChart3,
  RefreshCcw,
  TrendingUp,
  SlidersHorizontal,
  Settings2,
  Bot,
  PackageMinus,
  ShieldCheck,
  X,
} from 'lucide-react';
import aitekLogo from '@/assets/aitek_logo.png';

// Small-screen navigation drawer (the header carries the navigation on desktop).
// Follows the canonical pipeline (design bible §4): stage numbers 1–9 match the stage tabs.
const GROUPS = [
  {
    label: 'Understand',
    items: [
      { to: '/solutions/inventory-intelligence/overview', label: 'Overview', icon: LayoutGrid, end: true },
      { to: '/solutions/inventory-intelligence/data-foundation', label: 'Data Foundation', icon: Database },
      { to: '/solutions/inventory-intelligence/descriptive/univariate', label: 'Univariate Analysis', icon: LineChart, stage: 1 },
      { to: '/solutions/inventory-intelligence/descriptive/bivariate', label: 'Bivariate Analysis', icon: ScatterChart, stage: 2 },
    ],
  },
  {
    label: 'Detect & Explain',
    items: [
      { to: '/solutions/inventory-intelligence/abc', label: 'ABC Classification', icon: PieChart, stage: 3 },
      { to: '/solutions/inventory-intelligence/eoq', label: 'EOQ Analysis', icon: BarChart3, stage: 4 },
      { to: '/solutions/inventory-intelligence/rmlc', label: 'RMLC Lifecycle', icon: RefreshCcw, stage: 5 },
    ],
  },
  {
    label: 'Predict & Optimize',
    items: [
      { to: '/solutions/inventory-intelligence/requirements', label: 'Multivariate Forecast', icon: TrendingUp, stage: 6 },
      { to: '/solutions/inventory-intelligence/optimization', label: 'Optimization Plan', icon: Settings2, stage: 7 },
      { to: '/solutions/inventory-intelligence/what-if', label: 'What-If Simulation', icon: SlidersHorizontal, stage: 8 },
    ],
  },
  {
    label: 'Get to Green · Stay Green',
    items: [
      { to: '/solutions/inventory-intelligence/liquidation', label: 'Liquidation', icon: PackageMinus },
      { to: '/solutions/inventory-intelligence/prevention', label: 'Prevention', icon: ShieldCheck },
    ],
  },
  {
    label: 'Decide & Act',
    items: [{ to: '/solutions/inventory-intelligence/decision-intelligence', label: 'Inventory Agent', icon: Bot, stage: 9 }],
  },
];

export interface InventoryRailProps {
  open?: boolean;
  onClose?: () => void;
}

export const InventoryRail: React.FC<InventoryRailProps> = ({ open = false, onClose }) => {
  return (
    <nav className={`rail${open ? ' open' : ''}`} aria-label="Main Navigation">
      <div className="rail__brand flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={aitekLogo}
            alt="AITEK Logo"
            className="h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(21,93,252,0.4)]"
          />
          <div className="rail__brand-text">
            <span className="rail__brand-name">AITEK</span>
            <span className="rail__brand-sub">Inventory Modelling</span>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors md:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="rail__groups">
        {GROUPS.map((group) => (
          <div className="rail__group" key={group.label}>
            <div className="rail__group-label">{group.label}</div>
            {group.items.map(({ to, label, icon: Icon, end, stage }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `rail__item transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary${isActive ? ' active' : ''}`
                }
              >
                <Icon size={16} className="shrink-0" />
                <span className="rail__label truncate">{label}</span>
                {stage && <span className="rail__stage" aria-label={`Stage ${stage}`}>{stage}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div className="rail__footer">
        <span className="text-xs text-slate-400 tracking-wide">Enterprise Suite v3.1</span>
      </div>
    </nav>
  );
};

export default InventoryRail;
