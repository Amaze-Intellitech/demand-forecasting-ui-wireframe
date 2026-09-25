import { VariableColumnItem } from './index';

export type AnalysisMode = 'univariate' | 'bivariate' | 'multivariate';

export type AnalysisStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface AnalysisConfig {
  mode: AnalysisMode;
  dependentVariable: string; // Column ID (default: 'demand_sales')
  independentVariable?: string; // Column ID or 'all' for bivariate
  independentVariables?: string[]; // Array of Column IDs for multivariate
  selectionScope?: 'selected' | 'all';
}

export interface ParameterMetadata extends VariableColumnItem {
  isEligible: boolean; // Continuous/numeric parameter eligible for quantitative analytics
  isTarget?: boolean;
}

export interface AnalysisValidation {
  isValid: boolean;
  message?: string;
  severity?: 'warning' | 'error';
}
