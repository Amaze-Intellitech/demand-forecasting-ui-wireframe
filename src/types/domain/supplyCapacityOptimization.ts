export interface SupplyKpiItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
  deltaText: string;
  trend: 'up' | 'down' | 'neutral';
  tone: 'positive' | 'negative' | 'neutral' | 'attention';
  iconName: 'capacity' | 'utilization' | 'fulfillment' | 'constraints' | 'cost' | 'emissions';
}

export interface SupplyDemandPoint {
  period: string; // 'Jan', 'Feb', ... 'Dec'
  demand: number; // in thousands (K units)
  supplyPlan: number;
  availableCapacity: number;
  isForecastPeriod?: boolean;
  supplyGap?: number;
}

export interface PlantProductionLine {
  id: string;
  name: string;
  utilizationPercent: number;
  status: 'Constrained' | 'Healthy' | 'Maintenance';
  outputRateUnitsPerHour: number;
  assignedProducts: string[];
}

export interface PlantCapacityItem {
  id: string;
  name: string;
  code: string;
  region: string;
  utilizationPercent: number;
  status: 'Constrained' | 'Optimal' | 'Underutilized';
  totalCapacityK: number;
  allocatedSupplyK: number;
  unconstrainedDemandK: number;
  productionLines: PlantProductionLine[];
  bottlenecks: string[];
}

export interface ProductSupplyPlanRow {
  id: string;
  product: string;
  demandK: number;
  supplyPlanK: number;
  capacityK: number;
  utilizationPercent: number;
  status: 'Constrained' | 'Healthy' | 'At Risk';
  primaryPlants: string[];
  serviceLevelPercent: number;
  backlogRiskK: number;
}

export interface OptimizationOpportunityItem {
  id: string;
  title: string;
  impactValue: string;
  impactType: 'volume' | 'cost' | 'margin';
  complexity: 'Low' | 'Medium' | 'High';
  actionLabel: 'Evaluate' | 'Simulate' | 'Analyze' | 'Plan' | 'Review';
  description: string;
  recommendedAction: string;
  targetPlant: string;
  targetProduct: string;
  financialGain: string;
  estimatedLeadTime: string;
  status: 'Identified' | 'Simulated' | 'Approved' | 'In Progress';
}

export interface SupplyConstraintAlert {
  id: string;
  title: string;
  subtext: string;
  severity: 'High' | 'Medium' | 'Low';
  plantOrRegion: string;
  affectedProducts: string[];
  impactEstimate: string;
  recommendedMitigation: string;
  status: 'Active' | 'Mitigating' | 'Resolved';
}

export interface WhatIfSupplyParams {
  adjustment: string;
  plant: string;
  changePercent: string;
}

export interface WhatIfSupplyResult {
  demandFulfillment: { value: string; trend: 'up' | 'down'; isPositive: boolean };
  incrementalSupply: { value: string; trend: 'up' | 'down'; isPositive: boolean };
  supplyCostImpact: { value: string; trend: 'up' | 'down'; isPositive: boolean };
  serviceLevel: { value: string; trend: 'up' | 'down'; isPositive: boolean };
  summaryNarrative: string;
}

export interface TradeoffScenarioPoint {
  id: string;
  name: string;
  supplyCostBillion: number;
  serviceLevelPercent: number;
  color: string;
  description: string;
  tradeoffHighlight: string;
}

export interface SupplyAiRecommendation {
  title: string;
  summary: string;
  confidenceScore: number;
  expectedBenefits: {
    fulfillmentGain: string;
    costReduction: string;
    carbonReduction: string;
    serviceLevel: string;
  };
  actions: string[];
}

export interface SupplyPlanApprovalState {
  status: 'Draft' | 'Under Review' | 'Approved' | 'Rejected';
  approvedBy?: string;
  approvalTimestamp?: string;
  notes?: string;
}

export interface SupplyFilterOptions {
  plants: string[];
  products: string[];
  regions: string[];
  periods: string[];
  granularities: ('Monthly' | 'Quarterly')[];
  units: ('Units' | 'Currency')[];
}
