export interface ForecastKpi {
  id: string;
  label: string;
  value: string;
  subtext: string;
  direction: 'up' | 'down';
  isPositive: boolean;
  iconType: 'accuracy' | 'fva' | 'demand' | 'service' | 'uncertainty' | 'champion';
  status?: string;
  benchmark?: string;
}

export interface ProbabilisticForecastPoint {
  period: string; // e.g. 'Jan', 'Feb', ..., 'Dec'
  monthNumber: number; // 1 to 12
  isForecast: boolean; // false for Jan-May, true for Jun-Dec
  actual: number | null; // actual value in K units (Jan-May)
  p10: number; // K units
  p50: number; // Median forecast K units
  p80: number; // Upper 80% boundary
  p90: number; // High-demand 90% boundary
  p95: number; // Extreme 95% boundary
}

export interface ForecastQuantilesDec {
  p95: string;
  p90: string;
  p80: string;
  p50: string;
  p10: string;
  expectedDemand: string;
  expectedGrowth: string;
}

export type ModelStatus = 'Champion' | 'Challenger' | 'Baseline';

export interface ForecastModelResult {
  modelId: string;
  modelName: string;
  wape: string;
  wapeNum: number;
  bias: string;
  status: ModelStatus;
  complexity: 'Low' | 'Moderate' | 'High';
  strengths: string;
  limitations: string;
  trainingPeriod: string;
  forecastHorizon: string;
  architectureType: string;
}

export interface FvaStage {
  id: string;
  stage: string;
  wape: string;
  wapeValue: number;
  delta: string;
  startVal: number;
  endVal: number;
  type: 'start' | 'reduction' | 'end';
  description: string;
}

export interface ForecastInsight {
  id: string;
  title: string;
  summary: string;
  iconType: 'peak' | 'packaging' | 'uncertainty' | 'fva' | 'signals';
  severity: 'info' | 'positive' | 'warning';
  route: string;
}

export interface ForecastCategoryDistribution {
  id: string;
  name: string;
  percent: number;
  volume: string;
  color: string;
}

export interface ForecastRegionalGrowth {
  id: string;
  region: string;
  demand: string;
  demandVal: number;
  growthYoY: string;
  color: string;
}

export interface ForecastSkuChange {
  id: string;
  sku: string;
  product: string;
  currentForecast: string;
  priorForecast: string;
  changeVsPrior: string;
  numericChange: number;
  confidenceBars: number;
  confidence: 'High' | 'Medium' | 'Low';
  status: 'High' | 'Medium' | 'Low';
  championModel: string;
  keyDrivers: string;
  recommendedAction: string;
}

export interface ForecastScenario {
  id: string;
  name: string;
  totalDemand: string;
  changeVsBase: string;
  changeNum: number;
  serviceLevel: string;
  isBase: boolean;
  description: string;
}

export interface ForecastAIRecommendation {
  title: string;
  narrative: string;
  ctaText: string;
  ctaRoute: string;
}

export interface ForecastFilterOptions {
  plants: string[];
  products: string[];
  regions: string[];
  planningPeriods: string[];
  horizons: string[];
}

export interface ForecastFilterParams {
  plant?: string;
  product?: string;
  region?: string;
  planningPeriod?: string;
  horizon?: string;
}

export interface ForecastSettings {
  forecastHorizon: string;
  planningQuantile: string;
  primaryModel: string;
  refreshFrequency: string;
  forecastCalendar: string;
}
