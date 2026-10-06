import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper } from './CommonUI';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import aitekLogo from '@/assets/aitek_logo.png';

export const ONBOARDING_STEPS = ['Material', 'Parameters', 'Data sources', 'Ingestion'];
// Route of each step, in order. Completed steps in the progress bar link back to these.
export const ONBOARDING_ROUTES = [
  '/solutions/inventory-intelligence/data-foundation/materials',
  '/solutions/inventory-intelligence/data-foundation/parameters',
  '/solutions/inventory-intelligence/data-foundation/connections',
  '/solutions/inventory-intelligence/data-foundation/ingestion',
];

export interface OnboardingShellProps {
  current?: number;
  children: React.ReactNode;
}

// Shared frame for the steps that come after sign-in: brand header, four-step progress (when `current` is set), content.
export function OnboardingShell({ current, children }: OnboardingShellProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="h-16 bg-surface border-b border-border shrink-0">
        <div className="page-wrap h-full flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/solutions')}
            className="flex items-center gap-3 text-left focus:outline-none hover:opacity-90 transition-opacity"
            title="Return to Solution Hub"
          >
            <img src={aitekLogo} alt="AITEK Logo" className="h-[42px] w-auto object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-xl font-bold text-ink tracking-tight">AITEK</span>
              <span className="text-xs font-medium text-primary">Inventory Modelling</span>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/solutions')}
              className="text-xs font-medium text-subtle hover:text-ink px-2 py-1 rounded transition-colors hidden sm:inline"
            >
              Solutions Hub
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="page-wrap py-8">
        {current ? (
          <div className="max-w-xl mx-auto mb-5">
            <Stepper
              steps={ONBOARDING_STEPS}
              current={current}
              className="mb-0"
              onStepClick={(n) => navigate(ONBOARDING_ROUTES[n - 1])}
            />
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}

export default OnboardingShell;
