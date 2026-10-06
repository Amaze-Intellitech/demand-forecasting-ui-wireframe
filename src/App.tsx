import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AitekProvider, useAitek } from './context/AitekContext';
import { ThemeProvider } from './context/ThemeContext';
import { InventoryProvider } from './context/InventoryContext';
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

// Inventory Intelligence Domain Pages
import { InventoryAppLayout } from './components/inventory/layout/InventoryAppLayout';
import MaterialSelection from './pages/inventory/MaterialSelection';
import ParameterMapping from './pages/inventory/ParameterMapping';
import DataSourceConnections from './pages/inventory/DataSourceConnections';
import Ingestion from './pages/inventory/Ingestion';
import DataFoundation from './pages/inventory/DataFoundation';
import Overview from './pages/inventory/Overview';
import Descriptive from './pages/inventory/Descriptive';
import Univariate from './pages/inventory/Univariate';
import Bivariate from './pages/inventory/Bivariate';
import AbcClassification from './pages/inventory/AbcClassification';
import EoqCalibration from './pages/inventory/EoqCalibration';
import RmlcLifecycle from './pages/inventory/RmlcLifecycle';
import RawMaterialRequirements from './pages/inventory/RawMaterialRequirements';
import Optimization from './pages/inventory/Optimization';
import WhatIf from './pages/inventory/WhatIf';
import DecisionIntelligence from './pages/inventory/DecisionIntelligence';
import Liquidation from './pages/inventory/Liquidation';
import Prevention from './pages/inventory/Prevention';

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

      {/* Demand Forecasting: Executive Command Center */}
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

      {/* Demand Forecasting: Demand Sensing */}
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

      {/* Demand Forecasting: Forecast Intelligence */}
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

      {/* Demand Forecasting: Driver & Causal Intelligence */}
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

      {/* Demand Forecasting: Inventory Intelligence */}
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

      {/* Demand Forecasting: Scenario & Decision Twin */}
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

      {/* Demand Forecasting: Supply & Capacity Optimization */}
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

      {/* Demand Forecasting: Risk & Exception Center */}
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

      {/* Demand Forecasting: AI Decision Copilot */}
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

      {/* Demand Forecasting: Agent Control Center */}
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

      {/* Short Alias Routes matching GEMINI.md & User Specs */}
      <Route path="/forecast" element={<Navigate to="/solutions/demand-intelligence/forecast" replace />} />
      <Route path="/drivers" element={<Navigate to="/solutions/demand-intelligence/drivers" replace />} />
      <Route path="/scenarios" element={<Navigate to="/solutions/demand-intelligence/scenarios" replace />} />
      <Route path="/demand-sensing" element={<Navigate to="/solutions/demand-intelligence/demand-sensing" replace />} />

      {/* ========================================================================= */}
      {/* INVENTORY MODELLING: Canonical Solution Routes                            */}
      {/* ========================================================================= */}
      <Route
        path="/solutions/inventory-intelligence"
        element={<Navigate to="/solutions/inventory-intelligence/overview" replace />}
      />

      {/* Inventory Onboarding Flow (Screen B, C, Data Sources, Ingestion) */}
      <Route
        path="/solutions/inventory-intelligence/data-foundation/materials"
        element={
          <RequirePlatformAuth>
            <MaterialSelection />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/inventory-intelligence/data-foundation/parameters"
        element={
          <RequirePlatformAuth>
            <ParameterMapping />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/inventory-intelligence/data-foundation/connections"
        element={
          <RequirePlatformAuth>
            <DataSourceConnections />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/inventory-intelligence/data-foundation/ingestion"
        element={
          <RequirePlatformAuth>
            <Ingestion />
          </RequirePlatformAuth>
        }
      />

      {/* Inventory Platform Shell: Persistent TopBar, Persona Switcher, PrimaryNav, Rail & Stage Tabs */}
      <Route
        element={
          <RequirePlatformAuth>
            <InventoryAppLayout />
          </RequirePlatformAuth>
        }
      >
        <Route path="/solutions/inventory-intelligence/overview" element={<Overview />} />
        <Route path="/solutions/inventory-intelligence/data-foundation" element={<DataFoundation />} />
        <Route path="/solutions/inventory-intelligence/descriptive" element={<Descriptive />} />
        <Route path="/solutions/inventory-intelligence/descriptive/univariate" element={<Univariate />} />
        <Route path="/solutions/inventory-intelligence/descriptive/bivariate" element={<Bivariate />} />
        <Route path="/solutions/inventory-intelligence/abc" element={<AbcClassification />} />
        <Route path="/solutions/inventory-intelligence/eoq" element={<EoqCalibration />} />
        <Route path="/solutions/inventory-intelligence/rmlc" element={<RmlcLifecycle />} />
        <Route path="/solutions/inventory-intelligence/requirements" element={<RawMaterialRequirements />} />
        <Route path="/solutions/inventory-intelligence/optimization" element={<Optimization />} />
        <Route path="/solutions/inventory-intelligence/what-if" element={<WhatIf />} />
        <Route path="/solutions/inventory-intelligence/decision-intelligence" element={<DecisionIntelligence />} />
        <Route path="/solutions/inventory-intelligence/liquidation" element={<Liquidation />} />
        <Route path="/solutions/inventory-intelligence/prevention" element={<Prevention />} />
      </Route>

      {/* Aliases */}
      <Route
        path="/solutions/inventory-intelligence/raw-materials"
        element={<Navigate to="/solutions/inventory-intelligence/requirements" replace />}
      />
      <Route
        path="/solutions/inventory-intelligence/decisions"
        element={<Navigate to="/solutions/inventory-intelligence/decision-intelligence" replace />}
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
        <InventoryProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </InventoryProvider>
      </AitekProvider>
    </ThemeProvider>
  );
};

export default App;
