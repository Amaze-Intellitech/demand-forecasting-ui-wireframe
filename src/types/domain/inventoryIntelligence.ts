export type InventorySkuStatus = 'Healthy' | 'At Risk' | 'Overstocked' | 'Understocked';

export type InventoryRiskSeverity = 'High' | 'Medium' | 'Low';

export type InventoryOpportunityAction = 'Review' | 'Reallocate' | 'Plan' | 'Update';

export type ApprovalStatus = 'Pending' | 'Approved' | 'Modified' | 'Rejected';

export interface InventoryKpi {
  id: string;
  title: string;
  value: string;
  unit?: string;
  subtext: string;
  subtextColor: 'emerald' | 'rose' | 'slate' | 'amber';
  trendDirection: 'up' | 'down' | 'neutral';
  iconName: 'box' | 'coins' | 'target' | 'alert' | 'clock' | 'barChart';
}

export interface InventoryPositionSeriesPoint {
  month: string;
  monthShort: string;
  onHand: number;
  target: number;
  upperLimit: number;
  lowerLimit: number;
  isForecast: boolean;
  status: 'Below Target' | 'On Target' | 'Above Target' | 'Projected In-Range';
}

export interface InventoryCategoryShare {
  name: string;
  percentage: number;
  units: number; // in K
  color: string;
  fill: string;
}

export interface InventoryPlantShare {
  plant: string;
  units: number; // in K
  value: string;
  daysOfSupply: number;
  color: string;
  percentage: number;
}

export interface InventorySkuItem {
  sku: string;
  product: string;
  plant: string;
  onHand: number; // in K
  target: number; // in K
  status: InventorySkuStatus;
  daysOfSupply: number;
  serviceLevel: number;
  stockoutRiskProb: number;
  recommendedSafetyStock: number;
  workingCapitalImpact: string;
  recommendedAction: string;
}

export interface InventoryCoveragePoint {
  month: string;
  baseCase: number;
  highDemandScenario: number;
  variance: number;
}

export interface InventoryRisk {
  id: string;
  severity: InventoryRiskSeverity;
  title: string;
  summary: string;
  sku: string;
  plant: string;
  currentInventory: string;
  expectedDemand: string;
  riskProbability: number;
  timeToRisk: string;
  rootCause: string;
  recommendedAction: string;
  status: string;
}

export interface InventoryOpportunity {
  id: string;
  opportunity: string;
  potentialImpact: string;
  impactNumeric: number; // in Millions $
  isServiceProtection: boolean;
  affectedSkus: number;
  action: InventoryOpportunityAction;
  serviceImpact: string;
  recommendation: string;
  approvalStatus: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ServiceLevelForecastPoint {
  month: string;
  baseCase: number;
  optimizedPlan: number;
  target: number;
}

export interface SafetyStockScenario {
  bufferPct: number; // 80% to 130%
  safetyStock: number; // in K units
  serviceLevel: number; // in %
  workingCapital: number; // in $B
  riskLevel: 'Elevated Risk' | 'Moderate Risk' | 'Optimal' | 'Conservative' | 'Capital Intensive';
  description: string;
}

export interface InventoryNode {
  id: string;
  name: string;
  type: 'Plant' | 'Distribution Center' | 'Regional Hub' | 'Market';
  location: string;
  inventory: number; // K units
  daysOfSupply: number;
  serviceLevel: number;
  atRiskSkus: number;
  potentialRebalance: string;
  parent?: string;
}

export interface AbcXyzSegment {
  segment: 'AX' | 'AY' | 'AZ' | 'BX' | 'BY' | 'BZ' | 'CX' | 'CY' | 'CZ';
  skuCount: number;
  valueDescription: 'High value' | 'Medium value' | 'Low value';
  variabilityDescription: 'Stable demand' | 'Variable demand' | 'High variability / Intermittent';
  status: 'Healthy' | 'Monitor' | 'High uncertainty' | 'Low priority';
  color: string;
}

export interface AIInventoryRecommendation {
  title: string;
  narrative: string;
  targetService: number;
  potentialCashRelease: string;
  excessSkuPercentage: number;
  variant: string;
}

export interface InventoryFilterOptions {
  plants: string[];
  products: string[];
  regions: string[];
  periods: string[];
}
