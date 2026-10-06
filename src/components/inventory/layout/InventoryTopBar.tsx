import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePlatform } from '@/context/InventoryContext';
import { PERSONAS } from '@/data/inventory/personas';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import InventoryPrimaryNav from './InventoryPrimaryNav';
import aitekLogo from '@/assets/aitek_logo.png';

export interface InventoryTopBarProps {
  onMenu: () => void;
}

export const InventoryTopBar: React.FC<InventoryTopBarProps> = ({ onMenu }) => {
  const navigate = useNavigate();
  const { persona, setPersona, resetSession } = usePlatform();
  const shouldReduceMotion = useReducedMotion();

  function handleSignOut() {
    resetSession();
    navigate('/solutions');
  }

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar__menu-btn"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      <Link
        to="/solutions/inventory-intelligence/overview"
        className="topbar__brand"
        aria-label="AITEK Inventory Modelling, Overview"
      >
        <img
          src={aitekLogo}
          alt="AITEK"
          style={{ height: 28, width: 'auto', objectFit: 'contain' }}
        />
        <span className="topbar__brand-text">
          <span className="topbar__brand-name">AITEK</span>
          <span className="topbar__brand-sub">Inventory Modelling</span>
        </span>
      </Link>

      <InventoryPrimaryNav />

      <div className="topbar__spacer" />

      {/* Persona Lens Switcher */}
      <div
        className="persona-switch relative p-1 bg-bg rounded-full border border-border-strong flex gap-1 items-center"
        role="tablist"
        aria-label="Persona lens selection"
      >
        {PERSONAS.map((p) => {
          const isActive = persona === p.key;
          return (
            <button
              key={p.key}
              role="tab"
              aria-selected={isActive}
              className={`relative z-10 px-3 py-1 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive ? 'text-white font-bold' : 'text-body hover:text-ink'
              }`}
              onClick={() => setPersona(p.key)}
              aria-label={p.label}
              title={p.label}
            >
              {isActive && (
                <motion.div
                  layoutId={shouldReduceMotion ? undefined : 'activeInventoryPersonaPill'}
                  className="absolute inset-0 bg-[#0f172b] dark:bg-[#26385a] rounded-full -z-10 shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="persona-full">{p.label}</span>
              <span className="persona-medium">{p.medium || p.label}</span>
              <span className="persona-short" aria-hidden="true">{p.short}</span>
            </button>
          );
        })}
      </div>

      <ThemeToggle />

      <div className="topbar__divider" />

      <button
        type="button"
        className="btn btn-ghost btn-sm topbar__signout inline-flex items-center gap-1.5 text-subtle hover:text-error-tx hover:bg-error-bg transition-colors"
        onClick={handleSignOut}
        aria-label="Exit to solutions"
        title="Exit to Solutions"
      >
        <LogOut size={14} />
        <span className="hidden sm:inline">Exit</span>
      </button>
    </header>
  );
};

export default InventoryTopBar;
