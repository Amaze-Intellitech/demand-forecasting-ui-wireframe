import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AitekProvider, useAitek } from './context/AitekContext';
import { ThemeProvider } from './context/ThemeContext';
import { PlatformLogin } from './pages/PlatformLogin';
import { SolutionHub } from './pages/SolutionHub';
import { DataIngestion } from './pages/DataIngestion';
import { ExecutiveCommandCenterPage } from './pages/ExecutiveCommandCenterPage';
import { DemandSensingPage } from './pages/DemandSensingPage';
import { DemandForecastPage } from './pages/DemandForecastPage';
import { DriverCausalIntelligencePage } from './pages/DriverCausalIntelligencePage';
import { InventoryIntelligencePage } from './pages/InventoryIntelligencePage';
import { ScenarioDecisionTwinPage } from './pages/ScenarioDecisionTwinPage';
import { SupplyCapacityOptimizationPage } from './pages/SupplyCapacityOptimizationPage';
import { AIDecisionCopilotPage } from './pages/AIDecisionCopilotPage';
import { RiskExceptionCenterPage } from './pages/RiskExceptionCenterPage';
import { AgentControlCenterPage } from './pages/AgentControlCenterPage';

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

      {/* Screen 3: Data Ingestion / Enterprise Connectivity (Protected) */}
      <Route
        path="/solutions/:solutionId/data-ingestion"
        element={
          <RequirePlatformAuth>
            <DataIngestion />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Executive Command Center */}
      <Route
        path="/solutions/demand-intelligence/executive"
        element={
          <RequirePlatformAuth>
            <ExecutiveCommandCenterPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/executive"
        element={
          <RequirePlatformAuth>
            <ExecutiveCommandCenterPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Demand Sensing */}
      <Route
        path="/solutions/demand-intelligence/demand-sensing"
        element={
          <RequirePlatformAuth>
            <DemandSensingPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/demand-sensing"
        element={
          <RequirePlatformAuth>
            <DemandSensingPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Forecast Intelligence */}
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
            <DriverCausalIntelligencePage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/drivers"
        element={
          <RequirePlatformAuth>
            <DriverCausalIntelligencePage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Inventory Intelligence */}
      <Route
        path="/solutions/demand-intelligence/inventory"
        element={
          <RequirePlatformAuth>
            <InventoryIntelligencePage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/inventory"
        element={
          <RequirePlatformAuth>
            <InventoryIntelligencePage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Scenario & Decision Twin */}
      <Route
        path="/solutions/demand-intelligence/scenarios"
        element={
          <RequirePlatformAuth>
            <ScenarioDecisionTwinPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/scenarios"
        element={
          <RequirePlatformAuth>
            <ScenarioDecisionTwinPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Supply & Capacity Optimization */}
      <Route
        path="/solutions/demand-intelligence/supply-capacity"
        element={
          <RequirePlatformAuth>
            <SupplyCapacityOptimizationPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/supply-capacity"
        element={
          <RequirePlatformAuth>
            <SupplyCapacityOptimizationPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Risk & Exception Center */}
      <Route
        path="/solutions/demand-intelligence/risk-exceptions"
        element={
          <RequirePlatformAuth>
            <RiskExceptionCenterPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/risk-exceptions"
        element={
          <RequirePlatformAuth>
            <RiskExceptionCenterPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: AI Decision Copilot */}
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
        path="/solutions/demand-intelligence/agent-control"
        element={
          <RequirePlatformAuth>
            <AgentControlCenterPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/agent-control"
        element={
          <RequirePlatformAuth>
            <AgentControlCenterPage />
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
    <ThemeProvider>
      <AitekProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AitekProvider>
    </ThemeProvider>
  );
};

export default App;
