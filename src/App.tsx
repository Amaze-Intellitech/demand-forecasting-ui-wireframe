import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AitekProvider, useAitek } from './context/AitekContext';
import { PlatformLogin } from './pages/PlatformLogin';
import { SolutionHub } from './pages/SolutionHub';
import { SolutionLogin } from './pages/SolutionLogin';
import { DataIngestion } from './pages/DataIngestion';
import { ExecutiveCockpit } from './pages/ExecutiveCockpit';
import { ExecutiveCommandCenterPage } from './pages/ExecutiveCommandCenterPage';
import { DemandSensingPage } from './pages/DemandSensingPage';
import { DemandSignalsPage } from './pages/DemandSignalsPage';
import { DemandForecastPage } from './pages/DemandForecastPage';
import { ScenarioStudioPage } from './pages/ScenarioStudioPage';
import { PrescriptiveSourcingPage } from './pages/PrescriptiveSourcingPage';
import { AIDecisionCopilotPage } from './pages/AIDecisionCopilotPage';

// Protected Route Guard
const RequirePlatformAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAitek();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Root index redirector
const RootRedirect: React.FC = () => {
  const { user } = useAitek();
  return <Navigate to={user ? "/solutions" : "/login"} replace />;
};

export const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />

      {/* Screen 1: Platform Login */}
      <Route path="/login" element={<PlatformLogin />} />

      {/* Screen 2: Solution Hub (Protected) */}
      <Route
        path="/solutions"
        element={
          <RequirePlatformAuth>
            <SolutionHub />
          </RequirePlatformAuth>
        }
      />

      {/* Screen 3: Solution-Specific Login (Protected) */}
      <Route
        path="/solutions/:solutionId/login"
        element={
          <RequirePlatformAuth>
            <SolutionLogin />
          </RequirePlatformAuth>
        }
      />

      {/* Screen 4: Data Ingestion / Enterprise Connectivity (Protected) */}
      <Route
        path="/solutions/:solutionId/data"
        element={
          <RequirePlatformAuth>
            <DataIngestion />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Executive Command Center (Screen 1 - P0) */}
      <Route
        path="/solutions/demand-intelligence/overview"
        element={
          <RequirePlatformAuth>
            <ExecutiveCommandCenterPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/overview"
        element={
          <RequirePlatformAuth>
            <ExecutiveCommandCenterPage />
          </RequirePlatformAuth>
        }
      />
      {/* Legacy Executive Cockpit route for backward compatibility */}
      <Route
        path="/solutions/demand-intelligence/cockpit"
        element={
          <RequirePlatformAuth>
            <ExecutiveCockpit />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Demand Sensing / Signals (Screen 2) */}
      <Route
        path="/solutions/demand-intelligence/sensing"
        element={
          <RequirePlatformAuth>
            <DemandSensingPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/demand-intelligence/signals"
        element={
          <RequirePlatformAuth>
            <DemandSensingPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/signals"
        element={
          <RequirePlatformAuth>
            <DemandSensingPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/sensing"
        element={
          <RequirePlatformAuth>
            <DemandSensingPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Demand Forecast (Screen 3) */}
      <Route
        path="/solutions/demand-intelligence/forecast"
        element={
          <RequirePlatformAuth>
            <DemandForecastPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/forecast"
        element={
          <RequirePlatformAuth>
            <DemandForecastPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Driver & Causal Intelligence */}
      <Route
        path="/solutions/demand-intelligence/drivers"
        element={
          <RequirePlatformAuth>
            <DemandSignalsPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/drivers"
        element={
          <RequirePlatformAuth>
            <DemandSignalsPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Inventory Intelligence */}
      <Route
        path="/solutions/demand-intelligence/inventory"
        element={
          <RequirePlatformAuth>
            <ExecutiveCommandCenterPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/inventory"
        element={
          <RequirePlatformAuth>
            <ExecutiveCommandCenterPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Scenario Studio (Screen 4) */}
      <Route
        path="/solutions/demand-intelligence/scenarios"
        element={
          <RequirePlatformAuth>
            <ScenarioStudioPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/scenarios"
        element={
          <RequirePlatformAuth>
            <ScenarioStudioPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Supply & Capacity Optimization / Sourcing (Screen 5) */}
      <Route
        path="/solutions/demand-intelligence/sourcing"
        element={
          <RequirePlatformAuth>
            <PrescriptiveSourcingPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/sourcing"
        element={
          <RequirePlatformAuth>
            <PrescriptiveSourcingPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Risk & Exception Center */}
      <Route
        path="/solutions/demand-intelligence/exceptions"
        element={
          <RequirePlatformAuth>
            <ExecutiveCommandCenterPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/exceptions"
        element={
          <RequirePlatformAuth>
            <ExecutiveCommandCenterPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: AI Decision Copilot (Screen 6) */}
      <Route
        path="/solutions/demand-intelligence/copilot"
        element={
          <RequirePlatformAuth>
            <AIDecisionCopilotPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/copilot"
        element={
          <RequirePlatformAuth>
            <AIDecisionCopilotPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Agent Control Center */}
      <Route
        path="/solutions/demand-intelligence/agents"
        element={
          <RequirePlatformAuth>
            <AIDecisionCopilotPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/agents"
        element={
          <RequirePlatformAuth>
            <AIDecisionCopilotPage />
          </RequirePlatformAuth>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <AitekProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AitekProvider>
  );
};

export default App;
