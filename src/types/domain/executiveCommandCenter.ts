import { AutonomyTier, PlanningEventSeverity, PlanningEventStatus, PlanningCategory } from './demandIntelligence';

export interface ExecutiveKpi {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  subtext: string;
  trendDirection: 'up' | 'down' | 'neutral';
  trendValue: string;
  semanticIntent: 'positive' | 'negative' | 'neutral' | 'critical' | 'attention';
  iconType: 'demand' | 'revenue' | 'inventory' | 'service' | 'exceptions' | 'sourcing';
  priority: number;
}

export interface EnterpriseSummary {
  totalDemand: string;
  revenueOpportunity: string;
  inventoryValue: string;
  serviceLevel: string;
  activeExceptionsCount: number;
  criticalExceptionsCount: number;
  highExceptionsCount: number;
  sourcingSavings: string;
}

export interface DemandSupplyPoint {
  period: string; // e.g. "Jan 2025"
  monthShort: string; // "Jan"
  year: number; // 2025
  quarter: string; // "Q1 2025"
  demandForecast: number; // in K units
  supplyPlan: number; // in K units
  p10: number; // in K units (confidence band lower)
  p90: number; // in K units (confidence band upper)
  isToday?: boolean;
}

export interface RegionalDemand {
  id: string;
  region: string;
  volume: string;
  volumeNumeric: number;
  growth: string;
  growthDirection: 'up' | 'down';
  riskStatus: 'healthy' | 'attention' | 'critical';
  riskLabel?: string;
  coordinates: { x: number; y: number }; // Relative SVG percentage coords
}

export interface ExecutiveInsight {
  id: string;
  title: string;
  summary: string;
  category: 'Demand' | 'Seasonality' | 'Inventory' | 'Supply' | 'Sourcing';
  severity: 'critical' | 'high' | 'medium' | 'info';
  iconType: 'trend' | 'chart' | 'warning' | 'supplier' | 'savings';
  route: string;
}

export interface WorkingCapitalWaterfallPoint {
  id: string;
  label: string;
  sublabel?: string;
  value: string; // e.g. "$124.6M", "($28.4M)", "($18.7M)", "$77.5M"
  numericValue: number; // in Millions
  type: 'start' | 'reduction' | 'opportunity' | 'target';
  startVal: number;
  endVal: number;
}

export interface PlantServiceLevel {
  plantId: string;
  plantName: string;
  serviceLevel: number; // e.g. 99.2
  status: 'healthy' | 'attention' | 'critical';
  target: number; // 95.0
}

export interface ProductCategoryDemand {
  id: string;
  categoryName: string;
  sharePercent: number; // 38.6
  volume: string;
  color: string;
}

export interface PlanningEvent {
  id: string;
  time: string; // e.g. "Today, 10:24 AM"
  event: string; // e.g. "Supplier C capacity constraint detected"
  category: PlanningCategory;
  impact: 'High' | 'Medium' | 'Low';
  status: PlanningEventStatus;
  detectedAt: string;
  rootCause: string;
  affectedArea: string;
  recommendation: string;
  nextBestAction: string;
  targetWorkspaceRoute: string;
}

export interface DecisionRecommendation {
  summary: string;
  serviceImpact: string;
  costImpact: string;
  riskImpact: string;
}

export interface DecisionTrigger {
  id: string;
  title: string;
  subtitle: string;
  category: 'Supply Risk' | 'Demand Surge' | 'Pricing' | 'Working Capital';
  severity: PlanningEventSeverity;
  impact: string;
  evidence: string;
  recommendation: DecisionRecommendation;
  status: 'pendingApproval' | 'approved' | 'rejected' | 'modified';
  autonomyTier: AutonomyTier;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  modificationNotes?: string;
  /** Agent Control Center agent id this trigger's recommendation traces back to. */
  relatedAgentId?: string;
}

export interface ExecutiveFilterOptions {
  plants: string[];
  products: string[];
  regions: string[];
  dateRanges: string[];
}
