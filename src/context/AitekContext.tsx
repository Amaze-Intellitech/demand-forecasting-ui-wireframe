import React, { createContext, useContext, useState, useEffect } from 'react';
import { Solution, Connector, ConnectionState, UserSession } from '../types';
import { INITIAL_SOLUTIONS, INITIAL_CONNECTORS } from '../data/mockData';

// Helper to automatically derive a clean user display name from email credentials
export const deriveNameFromEmail = (input: string): string => {
  if (!input || !input.trim()) return 'Siddhartha M';
  
  // Extract user handle before '@'
  let handle = input.includes('@') ? input.split('@')[0] : input;
  
  // Replace symbols (dots, underscores, hyphens, plus) with spaces
  handle = handle.replace(/[._\-+]+/g, ' ').trim();
  
  // Capitalize each word
  const words = handle.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'Siddhartha M';
  
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

interface AitekContextType {
  // User Session
  user: UserSession | null;
  login: (email: string) => Promise<boolean>;
  updateUserName: (name: string) => void;
  logout: () => void;
  
  // Solutions
  solutions: Solution[];
  selectedSolution: Solution | null;
  selectSolution: (id: string) => void;
  
  // Solution Auth
  solutionAuthMap: Record<string, boolean>;
  loginSolution: (solutionId: string, solutionUser: string) => Promise<boolean>;
  isSolutionAuthenticated: (solutionId: string) => boolean;

  // Connectors
  connectors: Connector[];
  updateConnectorStatus: (id: string, state: ConnectionState, recordCount?: number) => void;
  resetConnector: (id: string) => void;
}

const DEFAULT_USER: UserSession = {
  email: 'siddhartha.m@aitek.ai',
  name: 'Siddhartha M',
  orgName: 'ABC Manufacturing',
  orgId: 'ORG-8842-ENTERPRISE',
  role: 'Operations Director',
  isAuthenticated: true,
};

const AitekContext = createContext<AitekContextType | undefined>(undefined);

export const AitekProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    // Check if previously logged in for smooth navigation
    const saved = sessionStorage.getItem('aitek_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(() => {
    return sessionStorage.getItem('aitek_selected_solution') || 'demand-intelligence';
  });

  const [solutionAuthMap, setSolutionAuthMap] = useState<Record<string, boolean>>(() => {
    const saved = sessionStorage.getItem('aitek_solution_auths');
    return saved ? JSON.parse(saved) : {};
  });

  const [connectors, setConnectors] = useState<Connector[]>(() => {
    const saved = sessionStorage.getItem('aitek_connectors');
    return saved ? JSON.parse(saved) : INITIAL_CONNECTORS;
  });

  // Keep session storage synced
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('aitek_auth_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('aitek_auth_user');
    }
  }, [user]);

  useEffect(() => {
    sessionStorage.setItem('aitek_selected_solution', selectedSolutionId);
  }, [selectedSolutionId]);

  useEffect(() => {
    sessionStorage.setItem('aitek_solution_auths', JSON.stringify(solutionAuthMap));
  }, [solutionAuthMap]);

  useEffect(() => {
    sessionStorage.setItem('aitek_connectors', JSON.stringify(connectors));
  }, [connectors]);

  const login = async (email: string): Promise<boolean> => {
    // Mock network latency for realistic enterprise auth UX
    await new Promise((resolve) => setTimeout(resolve, 600));
    const detectedName = deriveNameFromEmail(email);
    setUser({
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: detectedName,
    });
    return true;
  };

  const updateUserName = (newName: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        name: newName.trim() || prev.name,
      };
      sessionStorage.setItem('aitek_auth_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setSolutionAuthMap({});
    sessionStorage.clear();
  };

  const selectSolution = (id: string) => {
    setSelectedSolutionId(id);
  };

  const loginSolution = async (solutionId: string, _solutionUser: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSolutionAuthMap((prev) => ({
      ...prev,
      [solutionId]: true,
    }));
    return true;
  };

  const isSolutionAuthenticated = (solutionId: string): boolean => {
    return !!solutionAuthMap[solutionId];
  };

  const updateConnectorStatus = (id: string, state: ConnectionState, recordCount?: number) => {
    setConnectors((prev) =>
      prev.map((conn) => {
        if (conn.id === id) {
          return {
            ...conn,
            state,
            lastSync: state === 'connected' ? 'Just now' : conn.lastSync,
            recordCount: recordCount ?? conn.recordCount,
          };
        }
        return conn;
      })
    );
  };

  const resetConnector = (id: string) => {
    setConnectors((prev) =>
      prev.map((conn) => {
        if (conn.id === id) {
          return {
            ...conn,
            state: 'not_connected',
            lastSync: undefined,
          };
        }
        return conn;
      })
    );
  };

  const selectedSolution =
    INITIAL_SOLUTIONS.find((s) => s.id === selectedSolutionId) || INITIAL_SOLUTIONS[0];

  return (
    <AitekContext.Provider
      value={{
        user,
        login,
        updateUserName,
        logout,
        solutions: INITIAL_SOLUTIONS,
        selectedSolution,
        selectSolution,
        solutionAuthMap,
        loginSolution,
        isSolutionAuthenticated,
        connectors,
        updateConnectorStatus,
        resetConnector,
      }}
    >
      {children}
    </AitekContext.Provider>
  );
};

export const useAitek = () => {
  const context = useContext(AitekContext);
  if (!context) {
    throw new Error('useAitek must be used within an AitekProvider');
  }
  return context;
};
