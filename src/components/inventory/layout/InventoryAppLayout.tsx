import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import InventoryRail from './InventoryRail';
import InventoryTopBar from './InventoryTopBar';
import PipelineStrip from '../PipelineStrip';

// Shell for every screen inside the Inventory Modelling platform (post-onboarding).
// The TopBar carries the primary navigation; the Rail is the small-screen drawer.
// <Outlet/> swaps the active page.
export const InventoryAppLayout: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [railOpen, setRailOpen] = useState(false);

  // Close the mobile navigation after every route change.
  useEffect(() => {
    setRailOpen(false);
  }, [location.pathname]);

  return (
    <div className="app min-h-screen bg-bg text-ink">
      <InventoryRail open={railOpen} onClose={() => setRailOpen(false)} />
      <div
        className={`rail-backdrop${railOpen ? ' open' : ''}`}
        onClick={() => setRailOpen(false)}
        aria-hidden="true"
      />
      <InventoryTopBar onMenu={() => setRailOpen((o) => !o)} />
      <main className="main">
        <motion.div
          key={location.pathname}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="w-full max-w-7xl mx-auto"
        >
          <PipelineStrip />
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default InventoryAppLayout;
