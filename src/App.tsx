import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AitekProvider, useAitek } from './context/AitekContext';
import { PlatformLogin } from './pages/PlatformLogin';
import { SolutionHub } from './pages/SolutionHub';
import { SolutionLogin } from './pages/SolutionLogin';
import { DataIngestion } from './pages/DataIngestion';
import { ExecutiveCockpit } from './pages/ExecutiveCockpit';
import { DemandSignalsPage } from './pages/DemandSignalsPage';

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

      {/* Demand Intelligence: Executive Cockpit (Screen 1) */}
      <Route
        path="/solutions/demand-intelligence/overview"
        element={
          <RequirePlatformAuth>
            <ExecutiveCockpit />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/overview"
        element={
          <RequirePlatformAuth>
            <ExecutiveCockpit />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Demand Signals (Screen 2) */}
      <Route
        path="/solutions/demand-intelligence/signals"
        element={
          <RequirePlatformAuth>
            <DemandSignalsPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/signals"
        element={
          <RequirePlatformAuth>
            <DemandSignalsPage />
          </RequirePlatformAuth>
        }
      />

      {/* Demand Intelligence: Demand Forecast (Screen 3 Placeholder) */}
      <Route
        path="/solutions/demand-intelligence/forecast"
        element={
          <RequirePlatformAuth>
            <DemandSignalsPage />
          </RequirePlatformAuth>
        }
      />
      <Route
        path="/solutions/:solutionId/forecast"
        element={
          <RequirePlatformAuth>
            <DemandSignalsPage />
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
