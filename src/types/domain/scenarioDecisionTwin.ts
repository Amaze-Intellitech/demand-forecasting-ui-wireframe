export type ScenarioStatus = 'Draft' | 'Analyzed' | 'Recommended' | 'Applied to Planning' | 'Archived';

export interface ScenarioAssumptions {
  demandChangePct: number;
  priceChangePct: number;
  rawMaterialChangePct: number;
  supplyAvailabilityPct: number;
  leadTimeChangeDays: number;
  capacityChangePct: number;
  tariffChangePct: number;
  promotionChangePct: number;
}

export interface ScenarioOutcome {
  totalDemand: string;
  totalDemandNumeric: number;
  revenue: string;
  revenueNumeric: number;
  grossMargin: string;
  grossMarginNumeric: number;
  serviceLevel: string;
  serviceLevelNumeric: number;
  inventoryNeed: string;
  inventoryNeedNumeric: number;
  workingCapital: string;
  workingCapitalNumeric: number;
  costToServe: string;
  emissionsChange: string;
  varianceVsBase: string;
  varianceVsBaseNumeric: number;
  summaryNote?: string;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  status: ScenarioStatus;
  iconName: 'barChart' | 'trendingUp' | 'activity' | 'alertTriangle' | 'settings' | 'plus';
  color: string;
  assumptions: ScenarioAssumptions;
  outcomes: ScenarioOutcome;
  createdAt: string;
  updatedAt?: string;
}

export interface ScenarioKpi {
  id: string;
  title: string;
  value: string;
  iconName: 'sliders' | 'dollar' | 'percent' | 'shield' | 'box' | 'coins';
  colorTheme: 'blue' | 'emerald';
}

export interface ScenarioComparisonRow {
  scenarioId: string;
  scenarioName: string;
  totalDemand: string;
  revenue: string;
  grossMargin: string;
  marginPositive: boolean;
  serviceLevel: string;
  servicePositive: boolean;
  inventoryNeed: string;
  workingCapital: string;
  vsBase: string;
  vsBaseType: 'positive' | 'negative' | 'neutral';
}

export interface ScenarioTrajectoryPoint {
  month: string;
  monthShort: string;
  baseCase: number;
  highDemand: number;
  commodityShock: number;
  supplyDisruption: number;
  pricingOptimization: number;
  isForecast: boolean;
}

export interface ScenarioDriverRow {
  id: string;
  driver: string;
  baseValue: string;
  scenarioValue: string;
  impactOnDemand: string;
  confidence: string;
  businessContext: string;
}

export interface ScenarioRegionalImpact {
  region: string;
  demandChange: string;
  demandChangePct: number;
  inventoryNeed: string;
  serviceRisk: 'Low' | 'Medium' | 'High' | 'At Risk';
  status: 'Increased Demand' | 'Moderate Increase' | 'At Risk' | 'Stable';
  color: string;
  coordinates: { x: number; y: number }; // percentage position for SVG/map canvas
  recommendedResponse: string;
}

export interface ScenarioTradeoff {
  dimension: string;
  value: string;
  progress: number; // 0-100%
  color: string;
}

export interface WhatIfDriverOption {
  driver: string;
  change: string;
  projectedDemand: string;
  projectedDemandUnits: string;
  demandDirection: 'up' | 'down';
  revenueImpact: string;
  revenueImpactDollars: string;
  revenueDirection: 'up' | 'down';
  marginImpact: string;
  marginPoints: string;
  marginDirection: 'up' | 'down';
  serviceLevel: string;
  servicePoints: string;
  serviceDirection: 'up' | 'down';
}

export interface RecommendedScenarioData {
  id: string;
  name: string;
  headline: string;
  narrative: string;
  demandGain: string;
  margin: string;
  service: string;
}

export interface RecentScenarioItem {
  id: string;
  name: string;
  date: string;
  status: 'Recommended' | 'Analyzed' | 'Draft';
  iconName: 'cube' | 'trend' | 'alert';
}

export interface ScenarioFilterOptions {
  plants: string[];
  products: string[];
  regions: string[];
  periods: string[];
}
