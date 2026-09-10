import { PlanningCategory, PlanningEventSeverity, PlanningEventStatus } from './demandIntelligence';

export type ExceptionSeverity = PlanningEventSeverity;
export type ExceptionCategory = PlanningCategory;
export type ExceptionStatus = PlanningEventStatus;

export interface RiskException {
  id: string;
  title: string;
  description: string;
  severity: ExceptionSeverity;
  category: ExceptionCategory;
  affectedSku?: string;
  affectedPlant?: string;
  affectedRegion?: string;
  detectedAt: string;
  status: ExceptionStatus;
  owner: string;
  underlyingSignals: string[];
  recommendedActions: string[];
}

export interface ExceptionSeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface ExceptionFilterOptions {
  severities: ExceptionSeverity[];
  categories: ExceptionCategory[];
  statuses: ExceptionStatus[];
}
