export type AutonomyTier = 'L1' | 'L2' | 'L3' | 'L4';

export type PlanningEventSeverity = 'critical' | 'high' | 'medium' | 'low';

export type PlanningEventStatus = 'Open' | 'In Review' | 'Monitoring' | 'Resolved';

export type PlanningCategory = 
  | 'Supply Risk' 
  | 'Demand Surge' 
  | 'Inventory' 
  | 'Market Signal' 
  | 'Sourcing';

export interface PlantOption {
  id: string;
  name: string;
  region: string;
  targetServiceLevel: number;
}

export interface ProductCategoryOption {
  id: string;
  name: string;
  code: string;
}

export interface DateRangeOption {
  label: string;
  desc: string;
}

export interface FilterState {
  plant: string;
  product: string;
  region: string;
  dateRange: string;
}

export * from './demandForecast';
export * from './causalIntelligence';
export * from './inventoryIntelligence';
export * from './scenarioDecisionTwin';

