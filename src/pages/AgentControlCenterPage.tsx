import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, ChevronDown, Bot, Pause, Play, ArrowRight } from 'lucide-react';

import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { Card } from '../components/ui/Card';
import { Badge, BadgeProps } from '../components/ui/Badge';
import { Table, TableWrap, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';

import { mockAgentControlCenterRepository } from '../repositories/mock/agentControlCenterRepository';
import { DecisionOutcome } from '../types/domain/agentControlCenter';

const outcomeVariant: Record<DecisionOutcome, BadgeProps['variant']> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  modified: 'info',
};

export const AgentControlCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');
  const [searchParams, setSearchParams] = useSearchParams();

  const filterOptions = useMemo(() => mockAgentControlCenterRepository.getFilterOptions(), []);
  const agents = useMemo(() => mockAgentControlCenterRepository.getAgents(), []);

  const agentId = searchParams.get('agentId') ?? 'all';
  const outcome = searchParams.get('outcome') ?? 'all';

  const decisionLog = useMemo(
    () =>
      mockAgentControlCenterRepository.getDecisionLog({
        agentId,
        outcome: outcome as DecisionOutcome | 'all',
      }),
    [agentId, outcome]
  );

  const updateParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === 'all') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-surface text-deep font-sans select-none overflow-x-hidden">
      <DemandIntelligenceSidebar activeTab="agent-control" />

      <div className="flex-1 flex flex-col min-w-0">
        <DemandTopbar selectedDateRange={selectedDateRange} onSelectDateRange={setSelectedDateRange} />

        <main className="flex-1 p-5 sm:p-7 lg:p-8 space-y-6 max-w-[1780px] w-full mx-auto">
          <nav className="flex items-center gap-2 text-xs text-subtle font-medium">
            <Link to="/solutions" className="hover:text-deep transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Demand Intelligence</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-deep font-bold">Agent Control Center</span>
          </nav>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-deep tracking-tight leading-tight">
              Agent Control Center
            </h1>
            <p className="text-xs sm:text-sm text-subtle font-normal">
              The platform's AI agents, their current status, and a full audit trail of every recommendation and human decision.
            </p>
          </div>

          {/* Agent registry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-info-bg text-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-deep leading-tight">{agent.name}</h3>
                  </div>
                  <Badge variant={agent.status === 'active' ? 'success' : 'neutral'} size="sm">
                    {agent.status === 'active' ? (
                      <span className="flex items-center gap-1">
                        <Play className="w-2.5 h-2.5" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Pause className="w-2.5 h-2.5" /> Paused
                      </span>
                    )}
                  </Badge>
                </div>
                <p className="text-xs text-subtle leading-relaxed">{agent.description}</p>
                <div className="text-xs text-body border-t border-border pt-2.5">
                  <div className="font-semibold">{agent.lastAction}</div>
                  <div className="text-[11px] text-subtle mt-0.5">{agent.lastActionAt}</div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-subtle">Confidence</span>
                  <span className="font-bold text-deep">{agent.confidence}%</span>
                </div>
                <button
                  type="button"
                  onClick={() => updateParam('agentId', agentId === agent.id ? 'all' : agent.id)}
                  className="text-[11px] font-semibold text-primary hover:text-deep flex items-center gap-1 self-start"
                >
                  {agentId === agent.id ? 'Clear filter' : 'View audit log'}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Card>
            ))}
          </div>

          {/* Audit / decision log */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-deep">Audit & Decision Log</h2>
              <div className="flex flex-wrap items-center gap-3">
                <FilterSelect
                  label="Agent"
                  value={agentId}
                  options={['all', ...filterOptions.agentIds]}
                  onChange={(v) => updateParam('agentId', v)}
                  format={(v) => (v === 'all' ? 'All Agents' : agents.find((a) => a.id === v)?.name ?? v)}
                />
                <FilterSelect
                  label="Outcome"
                  value={outcome}
                  options={['all', ...filterOptions.outcomes]}
                  onChange={(v) => updateParam('outcome', v)}
                  format={(v) => (v === 'all' ? 'All Outcomes' : v[0].toUpperCase() + v.slice(1))}
                />
              </div>
            </div>

            <TableWrap>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Recommendation</TableHead>
                    <TableHead>Recommended</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Decided By</TableHead>
                    <TableHead>Decided</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {decisionLog.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-semibold text-deep whitespace-nowrap">{entry.agentName}</TableCell>
                      <TableCell className="max-w-sm">{entry.recommendation}</TableCell>
                      <TableCell className="text-subtle whitespace-nowrap">{entry.recommendedAt}</TableCell>
                      <TableCell>
                        <Badge variant={outcomeVariant[entry.outcome]} size="sm">
                          {entry.outcome[0].toUpperCase() + entry.outcome.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-subtle whitespace-nowrap">{entry.decidedBy ?? '—'}</TableCell>
                      <TableCell className="text-subtle whitespace-nowrap">{entry.decidedAt ?? '—'}</TableCell>
                      <TableCell className="text-subtle max-w-xs">{entry.notes ?? '—'}</TableCell>
                      <TableCell>
                        {entry.relatedRoute && (
                          <button
                            type="button"
                            onClick={() => navigate(entry.relatedRoute!)}
                            className="text-[11px] font-semibold text-primary hover:text-deep flex items-center gap-1 whitespace-nowrap"
                          >
                            Open <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {decisionLog.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-subtle py-8">
                        No decision log entries match the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableWrap>
          </div>
        </main>
      </div>
    </div>
  );
};

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  format?: (value: string) => string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange, format }) => (
  <div className="relative">
    <label className="sr-only">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 pl-3.5 pr-8 bg-bg border border-border rounded-md text-xs font-semibold text-body appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {format ? format(opt) : opt}
        </option>
      ))}
    </select>
    <ChevronDown className="w-3.5 h-3.5 text-subtle absolute right-2.5 top-3 pointer-events-none" />
  </div>
);

export default AgentControlCenterPage;
