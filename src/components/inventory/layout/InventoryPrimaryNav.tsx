import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PIPELINE_STAGES } from '../PipelineStrip';

// The five top-level destinations. The nine analytical stages live behind "Analysis" as tabs (PipelineStrip).
const ITEMS = [
  { to: '/solutions/inventory-intelligence/overview', label: 'Overview', end: true },
  { to: '/solutions/inventory-intelligence/data-foundation', label: 'Data Foundation' },
  { to: '/solutions/inventory-intelligence/descriptive/univariate', label: 'Analysis', matchesStages: true },
  { to: '/solutions/inventory-intelligence/liquidation', label: 'Liquidation' },
  { to: '/solutions/inventory-intelligence/prevention', label: 'Prevention' },
];

export const InventoryPrimaryNav: React.FC = () => {
  const { pathname } = useLocation();
  const onStage = PIPELINE_STAGES.some((s) => s.to === pathname);

  return (
    <nav className="primary-nav" aria-label="Primary">
      {ITEMS.map(({ to, label, end, matchesStages }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => ((matchesStages ? onStage : isActive) ? 'active' : '')}
          aria-current={(matchesStages ? onStage : pathname === to) ? 'page' : undefined}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default InventoryPrimaryNav;
