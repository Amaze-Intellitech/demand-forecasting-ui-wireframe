export interface CausalKpi {
  id: string;
  label: string;
  value: string;
  subtext: string;
  direction: 'up' | 'down' | 'neutral';
  isPositive: boolean;
  iconType: 'drivers' | 'variance' | 'positive' | 'negative' | 'structural' | 'confidence';
}

export interface TopDemandDriver {
  id: string;
  name: string;
  category: 'Economic' | 'Commercial' | 'Operational' | 'Market' | 'External' | 'Seasonal';
  impact: string;
  impactNum: number;
  isNegative: boolean;
  description: string;
  sensitivity: 'High' | 'Medium' | 'Low';
  confidence: number;
  currentValue: string;
  historicalRange: string;
  recommendation: string;
}

export interface CausalNetworkNode {
  id: string;
  label: string;
  impactType: 'center' | 'positive' | 'negative' | 'indirect';
  impactValue: string;
  confidence: number;
  direction: 'Positive' | 'Negative' | 'Indirect';
  x: number;
  y: number;
}

export interface CausalNetworkEdge {
  id: string;
  source: string;
  target: string;
  impactType: 'positive' | 'negative' | 'indirect';
  strength: number;
  label?: string;
}

export interface CausalImpactTimePoint {
  period: string;
  actual: number;
  predictedWithDriver: number;
  predictedWithoutDriver: number;
  isForecast: boolean;
}

export interface CausalInsightDriver {
  id: string;
  driver: string;
  impactOnDemand: string;
  impactNum: number;
  significance: 'High' | 'Medium' | 'Low';
  direction: 'up' | 'down';
  insight: string;
  category: string;
  confidence: number;
}

export interface ScenarioSimulationRow {
  id: string;
  scenario: string;
  changeValue: string;
  projectedDemand: string;
  impact: string;
  impactNum: number;
  isBase: boolean;
}

export interface CausalKeyTakeaway {
  id: string;
  title: string;
  description: string;
  iconType: 'price' | 'promotion' | 'macro' | 'competitor' | 'weather';
  driverId: string;
}

export interface DriverBreakEvent {
  id: string;
  date: string;
  event: string;
  driver: string;
  impact: string;
  impactNum: number;
  type: 'Market Event' | 'Business Event' | 'External Event';
  confidence: number;
  observedChange: string;
  businessContext: string;
  recommendation: string;
}

export interface CausalAIInterpretation {
  title: string;
  narrative: string;
  ctaScenarioText: string;
  ctaScenarioRoute: string;
  ctaPricingText: string;
  ctaPricingRoute: string;
}

export interface CausalFilterOptions {
  plants: string[];
  products: string[];
  regions: string[];
  periods: string[];
  drivers: string[];
}

export interface CausalFilterParams {
  plant?: string;
  product?: string;
  region?: string;
  period?: string;
  selectedDriver?: string;
}
