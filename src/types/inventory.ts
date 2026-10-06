import React from 'react';

// ---- Role & Scope Types ----
export type InventoryRole =
  | 'Plant Supervisor'
  | 'Warehouse Manager'
  | 'Materials Planner'
  | 'Procurement Officer'
  | 'Finance Controller';

export type PersonaKey = 'supervisor' | 'warehouse' | 'planner' | 'procurement' | 'finance';

export type LegacyPersona = 'analyst' | 'exec';

export interface RoleContextItem {
  dept: string;
  scope: string;
  persona: PersonaKey;
}

export interface PersonaDefinition {
  key: PersonaKey;
  label: string;
  medium?: string;
  short: string;
  sub: string;
}

// ---- Material & Inventory Item Types ----
export interface InventoryMaterial {
  id: string;
  name: string;
  category: 'Components' | 'Raw Materials' | 'Consumables' | string;
  plant: string;
  qty: number;
  uom: string;
  unitCost: number;
  value: number;
  abcClass: 'A' | 'B' | 'C';
}

export interface RawMaterialRow {
  id: string;
  name: string;
  qtyPerUnit: number;
  p1: number;
  p2: number;
  p3: number;
  coverage: 'risk' | 'watch' | 'ok';
}

// ---- RMLC (Raw Material Life Cycle) Types ----
export type RmlcStageKey = 'accumulation' | 'active' | 'atrisk' | 'liquidation';

export interface RmlcStageItem {
  key: RmlcStageKey;
  label: string;
  value: number;
  count: number;
  desc: string;
  rule: string;
  tone: 'watch' | 'ok' | 'risk';
}

export interface RmlcPlantStage {
  plant: string;
  name: string;
  stages: Record<RmlcStageKey, { value: number; count: number }>;
}

export type RmlcLegKey = 'lead' | 'credit' | 'store' | 'make' | 'fg' | 'cust';

export interface RmlcLeg {
  key: RmlcLegKey;
  short: string;
  from: number;
  to: number;
}

export interface RmlcCycleMaterial {
  id: string;
  name: string;
  days: number[];
  bottleneck: RmlcLegKey;
  why: string;
  total?: number;
}

export interface PersonaLegsDefinition {
  label: string;
  legs: RmlcLegKey[];
  sub: string;
  read: (f: RmlcCycleMaterial, ownDays: number) => string;
}

// ---- Decision Intelligence Types ----
export interface InventoryDecisionRow {
  id: string;
  tag: string;
  tone: 'risk' | 'accent' | 'watch' | 'neutral';
  title: string;
  meta: string;
  impact: string;
}

// ---- EOQ & Forecasting Types ----
export interface EoqInput {
  demand: number;
  currentBatchQty: number;
}

export interface ForecastInput {
  leadTimeDays: number;
  demandCV: number;
  trendPerWeek: number;
  modelR2: number;
  rmseRatio: number;
}

// ---- Parameter Catalog & Data Source Types ----
export interface ParameterCatalogItem {
  id: string;
  label: string;
  source: string;
  on: boolean;
  note?: string;
}

export interface ParameterCatalogCategory {
  category: string;
  items: ParameterCatalogItem[];
}

export interface ParameterRowSelection {
  on: boolean;
  source: string;
  from?: string;
  to?: string;
}

export interface ParameterSelection {
  rows: Record<string, ParameterRowSelection>;
  fromYear: string;
  toYear: string;
}

export interface RequiredConnector {
  id: string;
  label: string;
  count: number;
}

export interface EffectiveRange {
  from: string;
  to: string;
}

// ---- Focus & Daily Planner Types ----
export type FocusItemKind = 'sourcing' | 'reorder' | 'transfer' | 'cash';
export type FocusItemSeverity = 'risk' | 'watch' | 'ok';

export interface FocusItem {
  id: string;
  kind: FocusItemKind;
  severity: FocusItemSeverity;
  materialId?: string;
  title: string;
  detail: string;
  value: number;
  valueLabel: string;
  valueText?: string;
  cta: string;
  to?: string;
}

// ---- Sourcing Option Types ----
export interface SourcingDonor {
  plant: string;
  onHand: number;
  dailyUse: number;
  leadDays: number;
  transferDays: number;
  freightPerUnit: number;
  available?: number;
}

export interface SourcingVendorOption {
  vendor: string;
  days: number;
  priceDeltaPct: number;
  freightPerUnit: number;
  maxUnits?: number;
  note: string;
  qualified?: boolean;
  qualificationCost?: number;
}

export interface SourcingMaterialData {
  donors: SourcingDonor[];
  vendors: {
    expedite: SourcingVendorOption;
    alternate: SourcingVendorOption;
  };
}

export interface SourcingScoredOption {
  key: string;
  label: string;
  detail: string;
  arrives: number | null;
  delivered: number;
  extra: number;
  risk: string;
  watch: string;
  stopDays?: number;
  total: number;
  feasible: boolean;
}

export interface SourcingComparison {
  materialId: string;
  plant: string;
  cover: number;
  leadTimeDays: number;
  need: number;
  uom: string;
  options: SourcingScoredOption[];
  recommended: string | null;
  reason: string;
}

// ---- Persona Plans Types ----
export interface PersonaPlanAction {
  title: string;
  owner: string;
  due: string;
  effect: string;
  handoff?: string;
  compare?: string;
}

export interface PersonaPlanOutcome {
  tone: 'risk' | 'ok' | 'watch';
  headline: string;
  detail: string;
}

export interface PersonaPlan {
  title: string;
  insight: React.ReactNode;
  chart: {
    kind: 'bars' | 'runway';
    label: string;
    unit: string;
    fmt?: (v: number) => string;
    markerLabel?: string;
    projectedLabel?: { nothing: string; act: string };
    tableColumns?: string[];
    table?: { columns: string[]; rows: (string | number)[][] };
    rows?: any[];
    weeks?: string[];
    threshold?: { label: string; value: number };
    series?: {
      nothing: Array<{ label: string; color: string; values: number[]; dash?: boolean }>;
      act: Array<{ label: string; color: string; values: number[]; dash?: boolean }>;
    };
  };
  outcome: {
    nothing: PersonaPlanOutcome;
    act: PersonaPlanOutcome;
  };
  actions: PersonaPlanAction[];
}

// ---- Inventory Context State & Actions ----
export interface InventoryContextType {
  role: InventoryRole;
  setRole: (role: InventoryRole) => void;
  scope: string;
  setScope: (scope: string) => void;
  persona: PersonaKey;
  setPersona: (persona: PersonaKey) => void;
  legacyPersona: LegacyPersona;
  department: string;
  resetSession: () => void;
  resolvedFocus: Record<string, string>;
  resolveFocus: (id: string, status: string) => void;
  selectedMaterialId: string;
  setSelectedMaterialId: (id: string) => void;
  selectedMaterial: InventoryMaterial;
  onboarded: boolean;
  setOnboarded: (onboarded: boolean) => void;
  parameterSelection: ParameterSelection;
  setParameterSelection: (selection: ParameterSelection) => void;
  connectedSources: string[];
  setConnectedSources: (sources: string[]) => void;
  resetSetup: () => void;
  seedReturningSetup: () => void;
}
