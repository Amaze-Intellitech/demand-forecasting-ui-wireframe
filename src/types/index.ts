export type SolutionStatus = 'active' | 'available' | 'coming_soon';

export interface Solution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'operations' | 'manufacturing' | 'supply_chain';
  status: SolutionStatus;
  version: string;
  leadTime: string;
  keyMetrics?: { label: string; value: string }[];
  accentColor?: string;
}

export type ConnectorCategory = 'ERP' | 'Databases' | 'Cloud/Data platforms' | 'Files' | 'APIs';

export type ConnectionState = 
  | 'not_connected' 
  | 'connecting' 
  | 'connected' 
  | 'validation_error'
  | 'syncing' 
  | 'sync_complete';

export interface FieldMapping {
  id: string;
  aitekField: string;
  sourceField: string;
  dataType: string;
  required: boolean;
  sampleValue?: string;
  status: 'valid' | 'warning' | 'unmapped';
}

export interface Connector {
  id: string;
  name: string;
  category: ConnectorCategory;
  description: string;
  state: ConnectionState;
  popular?: boolean;
  docsUrl?: string;
  defaultHost?: string;
  entities: string[];
  mappings: FieldMapping[];
  lastSync?: string;
  recordCount?: number;
}

export interface UserSession {
  email: string;
  name: string;
  orgName: string;
  orgId: string;
  role: string;
  isAuthenticated: boolean;
}

export interface SolutionSession {
  solutionId: string;
  workspaceUser: string;
  orgContext: string;
  authenticatedAt: string;
}

// SaaS Data Selection Wizard Types (Screens 3 to 7)
export interface MaterialMasterItem {
  code: string;
  description: string;
  category: string;
  baseUom: string;
  plantId: string;
  plantName: string;
  leadTimeDays: number;
  criticality: 'High' | 'Medium' | 'Low';
  lastUpdated: string;
}

export interface DataPeriodConfig {
  presetYears: '1' | '3' | '5' | '10' | 'custom';
  startDate: string;
  endDate: string;
}

export type VariableCategory =
  | 'Dependent Variable'
  | 'Commercial & Pricing'
  | 'Quality & Specifications'
  | 'Seasonality & Calendar'
  | 'Market & Substitution'
  | 'Supply Chain & Sourcing'
  | 'Promotions & Orders'
  | 'Custom Fields';

export interface VariableColumnItem {
  id: string;
  name: string;
  description: string;
  category: VariableCategory;
  isDependent: boolean;
  isMandatory: boolean;
  dataType: string;
  defaultSourceSystem: string;
  defaultTable: string;
  defaultField: string;
  unit?: string;
  recommended?: boolean;
}

export interface CustomFieldItem {
  id: string;
  fieldName: string;
  description: string;
  sourceSystem: string;
  directoryOrPath: string;
  tableOrEndpoint: string;
  fieldOrColumn: string;
  dataType: string;
}

export interface ColumnMappingConfig {
  id: string;
  columnName: string;
  role: 'Dependent Variable' | 'Independent Variable' | 'Custom Variable';
  dataType: string;
  sourceSystem: string;
  sourceTable: string;
  sourceField: string;
  status: 'valid' | 'pending' | 'custom';
  unit?: string;
}

export interface DataSelectionSession {
  material: MaterialMasterItem;
  period: DataPeriodConfig;
  selectedVariableIds: string[];
  customFields: CustomFieldItem[];
  mappings: ColumnMappingConfig[];
  isConfigSaved: boolean;
  savedAt?: string;
}

