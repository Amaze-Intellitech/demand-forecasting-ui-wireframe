import { Agent, AgentDecisionLogEntry, DecisionOutcome, AgentFilterOptions } from '../../types/domain/agentControlCenter';
import { AGENTS_MOCK, AGENT_DECISION_LOG_MOCK } from '../../data/agentControlCenterMock';

export interface AgentDecisionLogFilterParams {
  agentId?: string | 'all';
  outcome?: DecisionOutcome | 'all';
}

export class AgentControlCenterRepository {
  public getAgents(): Agent[] {
    return [...AGENTS_MOCK];
  }

  public getAgentById(agentId: string): Agent | undefined {
    return AGENTS_MOCK.find((agent) => agent.id === agentId);
  }

  public getDecisionLog(filters?: AgentDecisionLogFilterParams): AgentDecisionLogEntry[] {
    return AGENT_DECISION_LOG_MOCK.filter((entry) => {
      if (filters?.agentId && filters.agentId !== 'all' && entry.agentId !== filters.agentId) {
        return false;
      }
      if (filters?.outcome && filters.outcome !== 'all' && entry.outcome !== filters.outcome) {
        return false;
      }
      return true;
    });
  }

  public getFilterOptions(): AgentFilterOptions {
    return {
      agentIds: AGENTS_MOCK.map((agent) => agent.id),
      outcomes: ['pending', 'approved', 'rejected', 'modified'],
    };
  }
}

export const mockAgentControlCenterRepository = new AgentControlCenterRepository();
