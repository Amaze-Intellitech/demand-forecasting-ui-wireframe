export type AgentStatus = 'active' | 'paused';

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  lastAction: string;
  lastActionAt: string;
  confidence: number; // 0-100
}

export type DecisionOutcome = 'approved' | 'rejected' | 'modified' | 'pending';

export interface AgentDecisionLogEntry {
  id: string;
  agentId: string;
  agentName: string;
  recommendation: string;
  recommendedAt: string;
  outcome: DecisionOutcome;
  decidedBy?: string;
  decidedAt?: string;
  notes?: string;
  relatedRoute?: string;
}

export interface AgentFilterOptions {
  agentIds: string[];
  outcomes: DecisionOutcome[];
}
