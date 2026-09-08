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
