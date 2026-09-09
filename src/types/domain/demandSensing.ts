export interface SensingKpi {
  id: string;
  label: string;
  value: string;
  subtext: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  semanticIntent: 'positive' | 'negative' | 'neutral' | 'critical' | 'attention';
  iconType: 'index' | 'coverage' | 'events' | 'uplift' | 'confidence' | 'atRisk';
}

export interface SensedForecastPoint {
  period: string; // e.g. 'Jan 5', 'Jan 12'
  weekNumber: number;
  baseline: number; // in K units
  sensed: number; // in K units
  lowerBound: number;
  upperBound: number;
  confidencePct: number;
}

export type FreshnessCategory = 'fresh' | 'recent' | 'aging' | 'inactive';

export interface SignalSource {
  id: string;
  name: string;
  iconType: 'cart' | 'pos' | 'truck' | 'inventory' | 'tag' | 'promotion' | 'macro' | 'coins' | 'weather' | 'social';
  status: 'Active' | 'Inactive';
  freshness: string; // e.g. '5 min ago', '1 hour ago', '—'
  freshnessMin: number;
  freshnessCategory: FreshnessCategory;
  currentSignal: string;
  impact: 'High' | 'Medium' | 'Low';
  confidence: number;
  affectedRegion: string;
}

export interface DemandEvent {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  impact: string;
  timeAgo: string;
  detectedAt: string;
  signalSource: string;
  supportingSignals: string[];
  estimatedImpact: string;
  confidence: number;
  affectedArea: string;
  recommendedAction: string;
}

export interface ShortTermAdjustmentPoint {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  type: 'start' | 'increase' | 'decrease' | 'end';
  startVal: number;
  endVal: number;
}

export interface SkuDemandChange {
  id: string;
  sku: string;
  product: string;
  changePct: string;
  numericChange: number;
  signalStrength: 'High' | 'Medium' | 'Low';
  strengthBars: number; // 1 to 4
  direction: 'up' | 'down';
  primarySignal: string;
  confidence: number;
  recommendedAction: string;
}

export interface ChannelDemand {
  id: string;
  name: string;
  percent: number;
  volume: string;
  color: string;
}

export interface LiveSignalFeedItem {
  id: string;
  time: string;
  source: string;
  signal: string;
  change: string;
  confidence: 'High' | 'Medium' | 'Low';
  confidenceBars: number;
  impact: 'High' | 'Medium' | 'Low';
}

export interface SensingAIInsight {
  title: string;
  narrative: string;
  route: string;
  targetText: string;
}

export interface SensedAdjustmentRecommendation {
  baselineForecast: string;
  sensedDemand: string;
  adjustmentPct: string;
  confidence: string;
  recommendedPct: string;
  adjustedForecast: string;
  reason: string;
}

export interface SensingFilterOptions {
  plants: string[];
  products: string[];
  regions: string[];
  horizons: string[];
}
