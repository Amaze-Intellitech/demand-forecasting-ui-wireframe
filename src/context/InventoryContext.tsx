import React, { createContext, useContext, useState } from 'react';
import {
  InventoryRole,
  PersonaKey,
  InventoryMaterial,
  ParameterSelection,
  InventoryContextType,
} from '@/types/inventory';
import { ROLE_CONTEXT, DEFAULT_ROLE, MATERIALS } from '@/data/inventory/mockData';
import { LEGACY_LENS } from '@/data/inventory/personas';
import { defaultParameterSelection, requiredConnectors } from '@/data/inventory/parameterCatalog';

export const InventoryContext = createContext<InventoryContextType | null>(null);

// Whether this user has already loaded their data. First-time users go through onboarding once;
// returning users are sent straight to the dashboard. It survives sign-out (it describes the user's data, not the session).
const ONBOARDED_KEY = 'aitek-onboarded';

// The user's data setup: which parameters they chose (and the source declared for each), and which data
// sources are connected. It survives sign-out for the same reason as the flag above.
const PARAMS_KEY = 'aitek-parameters';
const CONNECTED_KEY = 'aitek-connected-sources';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage can be blocked; the setup then lasts for this session only
  }
}

function readParameterSelection(): ParameterSelection {
  const stored = readJson<ParameterSelection | null>(PARAMS_KEY, null);
  const base = defaultParameterSelection();
  if (!stored || !stored.rows) return base;
  // keep any parameter added to the catalogue since the selection was stored
  return {
    fromYear: stored.fromYear || base.fromYear,
    toYear: stored.toYear || base.toYear,
    rows: { ...base.rows, ...stored.rows },
  };
}

function readOnboarded(): boolean {
  try {
    return localStorage.getItem(ONBOARDED_KEY) === 'true';
  } catch {
    return false;
  }
}

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<InventoryRole>(DEFAULT_ROLE);
  const [scope, setScope] = useState<string>(ROLE_CONTEXT[DEFAULT_ROLE].scope);
  const [persona, setPersonaState] = useState<PersonaKey>(ROLE_CONTEXT[DEFAULT_ROLE].persona);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('MAT-1082');
  // Focus items the user has approved or snoozed this session (in memory only; sign-out clears it).
  const [resolvedFocus, setResolvedFocus] = useState<Record<string, string>>({});
  const [onboarded, setOnboardedState] = useState<boolean>(readOnboarded);
  const [parameterSelection, setParameterSelectionState] = useState<ParameterSelection>(readParameterSelection);
  const [connectedSources, setConnectedSourcesState] = useState<string[]>(() => readJson<string[]>(CONNECTED_KEY, []));

  function setParameterSelection(next: ParameterSelection) {
    setParameterSelectionState(next);
    writeJson(PARAMS_KEY, next);
  }

  function setConnectedSources(next: string[]) {
    setConnectedSourcesState(next);
    writeJson(CONNECTED_KEY, next);
  }

  // Prototype helpers: a first-time user has chosen and connected nothing yet;
  // a returning user has a complete setup (default parameters, every required source connected).
  function resetSetup() {
    setParameterSelection(defaultParameterSelection());
    setConnectedSources([]);
  }

  function seedReturningSetup() {
    const selection = defaultParameterSelection();
    setParameterSelection(selection);
    setConnectedSources(requiredConnectors(selection.rows).map((c) => c.id));
  }

  function setOnboarded(next: boolean) {
    setOnboardedState(next);
    try {
      localStorage.setItem(ONBOARDED_KEY, String(next));
    } catch {
      // storage can be blocked; the flag then lasts for this session only
    }
  }

  const selectedMaterial: InventoryMaterial =
    MATERIALS.find((m) => m.id === selectedMaterialId) || MATERIALS[0];

  // Changing role in the header updates department/scope and sets a
  // sensible default persona lens — the user can still override the
  // lens manually afterward via the persona switch.
  function setRole(nextRole: InventoryRole) {
    setRoleState(nextRole);
    const ctx = ROLE_CONTEXT[nextRole];
    if (ctx) {
      setScope(ctx.scope);
      setPersonaState(ctx.persona);
    }
  }

  // The persona tabs also move the plant scope: plant-floor roles see their own plant, procurement and finance see all plants.
  function choosePersona(key: PersonaKey) {
    setPersonaState(key);
    const ctx = Object.values(ROLE_CONTEXT).find((c) => c.persona === key);
    if (ctx) setScope(ctx.scope);
  }

  function resolveFocus(id: string, status: string) {
    setResolvedFocus((prev) => ({ ...prev, [id]: status }));
  }

  function resetSession() {
    setRoleState(DEFAULT_ROLE);
    const ctx = ROLE_CONTEXT[DEFAULT_ROLE];
    if (ctx) {
      setScope(ctx.scope);
      setPersonaState(ctx.persona);
    }
    setSelectedMaterialId('MAT-1082');
    setResolvedFocus({});
  }

  const department = ROLE_CONTEXT[role]?.dept ?? '';

  const value: InventoryContextType = {
    role,
    setRole,
    scope,
    setScope,
    persona,
    setPersona: choosePersona,
    legacyPersona: LEGACY_LENS[persona] ?? 'analyst',
    department,
    resetSession,
    resolvedFocus,
    resolveFocus,
    selectedMaterialId,
    setSelectedMaterialId,
    selectedMaterial,
    onboarded,
    setOnboarded,
    parameterSelection,
    setParameterSelection,
    connectedSources,
    setConnectedSources,
    resetSetup,
    seedReturningSetup,
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

export function useInventory(): InventoryContextType {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within an InventoryProvider');
  return ctx;
}

// Backwards-compatible aliases for legacy Inventory component imports
export const PlatformProvider = InventoryProvider;
export const usePlatform = useInventory;

// Convenience wrapper for persona-gated content, e.g.:
//   <ForPersona allow={['supervisor', 'planner']}><CoverRunway /></ForPersona>
export interface ForPersonaProps {
  allow: PersonaKey[];
  children: React.ReactNode;
}

export const ForPersona: React.FC<ForPersonaProps> = ({ allow, children }) => {
  const { persona } = useInventory();
  if (!allow.includes(persona)) return null;
  return <>{children}</>;
};
