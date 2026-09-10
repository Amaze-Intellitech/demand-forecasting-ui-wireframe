import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, ChevronDown, ShieldAlert } from 'lucide-react';

import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { RiskExceptionDetailDrawer } from '../components/demand/risk/RiskExceptionDetailDrawer';
import { Card } from '../components/ui/Card';
import { Badge, BadgeProps } from '../components/ui/Badge';
import { Table, TableWrap, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';

import { mockRiskExceptionCenterRepository } from '../repositories/mock/riskExceptionCenterRepository';
import { RiskException } from '../types/domain/riskExceptionCenter';

const severityVariant: Record<RiskException['severity'], BadgeProps['variant']> = {
  critical: 'error',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

const statusVariant: Record<RiskException['status'], BadgeProps['variant']> = {
  Open: 'error',
  'In Review': 'warning',
  Monitoring: 'info',
  Resolved: 'success',
};

export const RiskExceptionCenterPage: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeException, setActiveException] = useState<RiskException | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filterOptions = useMemo(() => mockRiskExceptionCenterRepository.getFilterOptions(), []);
  const severityCounts = useMemo(() => mockRiskExceptionCenterRepository.getSeverityCounts(), []);

  const severity = searchParams.get('severity') ?? 'all';
  const category = searchParams.get('category') ?? 'all';
  const status = searchParams.get('status') ?? 'all';
  const eventId = searchParams.get('eventId');

  const exceptions = useMemo(
    () =>
      mockRiskExceptionCenterRepository.getExceptions({
        severity: severity as RiskException['severity'] | 'all',
        category: category as RiskException['category'] | 'all',
        status: status as RiskException['status'] | 'all',
      }),
    [severity, category, status]
  );

  useEffect(() => {
    if (!eventId) return;
    const match = mockRiskExceptionCenterRepository.getExceptionById(eventId);
    if (match) {
      setActiveException(match);
      setIsDrawerOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

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

  const handleRowClick = (exception: RiskException) => {
    setActiveException(exception);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    if (eventId) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete('eventId');
        return next;
      });
    }
  };

  const summaryTiles: Array<{ key: keyof typeof severityCounts; label: string; variant: BadgeProps['variant'] }> = [
    { key: 'critical', label: 'Critical', variant: 'error' },
    { key: 'high', label: 'High', variant: 'warning' },
    { key: 'medium', label: 'Medium', variant: 'info' },
    { key: 'low', label: 'Low', variant: 'neutral' },
  ];

  return (
    <div className="min-h-screen w-full flex bg-surface text-deep font-sans select-none overflow-x-hidden">
      <DemandIntelligenceSidebar activeTab="risk-exceptions" />

      <div className="flex-1 flex flex-col min-w-0">
        <DemandTopbar selectedDateRange={selectedDateRange} onSelectDateRange={setSelectedDateRange} />

        <main className="flex-1 p-5 sm:p-7 lg:p-8 space-y-5 max-w-[1780px] w-full mx-auto">
          <nav className="flex items-center gap-2 text-xs text-subtle font-medium">
            <Link to="/solutions" className="hover:text-deep transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Demand Intelligence</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-deep font-bold">Risk & Exception Center</span>
          </nav>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-deep tracking-tight leading-tight">
              Risk & Exception Center
            </h1>
            <p className="text-xs sm:text-sm text-subtle font-normal">
              Every open exception across supply, demand, inventory, market, and sourcing signals — triaged in one place.
            </p>
          </div>

          {/* Summary strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {summaryTiles.map((tile) => (
              <Card key={tile.key} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-subtle">{tile.label}</span>
                  <Badge variant={tile.variant} size="sm">
                    {severityCounts[tile.key]}
                  </Badge>
                </div>
                <div className="text-2xl font-extrabold text-deep mt-1.5">{severityCounts[tile.key]}</div>
                <div className="text-[11px] text-subtle mt-0.5">open or in progress</div>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="p-4 flex flex-wrap items-center gap-3">
            <FilterSelect
              label="Severity"
              value={severity}
              options={['all', ...filterOptions.severities]}
              onChange={(v) => updateParam('severity', v)}
              format={(v) => (v === 'all' ? 'All Severities' : v[0].toUpperCase() + v.slice(1))}
            />
            <FilterSelect
              label="Category"
              value={category}
              options={['all', ...filterOptions.categories]}
              onChange={(v) => updateParam('category', v)}
              format={(v) => (v === 'all' ? 'All Categories' : v)}
            />
            <FilterSelect
              label="Status"
              value={status}
              options={['all', ...filterOptions.statuses]}
              onChange={(v) => updateParam('status', v)}
              format={(v) => (v === 'all' ? 'All Statuses' : v)}
            />
            <span className="text-xs text-subtle ml-auto">
              {exceptions.length} exception{exceptions.length === 1 ? '' : 's'}
            </span>
          </Card>

          {/* Table */}
          <TableWrap>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Exception</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Affected</TableHead>
                  <TableHead>Detected</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exceptions.map((exception) => (
                  <TableRow
                    key={exception.id}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(exception)}
                  >
                    <TableCell>
                      <Badge variant={severityVariant[exception.severity]} size="sm">
                        {exception.severity[0].toUpperCase() + exception.severity.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-deep max-w-xs truncate">{exception.title}</TableCell>
                    <TableCell>{exception.category}</TableCell>
                    <TableCell className="text-subtle">
                      {[exception.affectedSku, exception.affectedPlant, exception.affectedRegion]
                        .filter(Boolean)
                        .join(' · ') || '—'}
                    </TableCell>
                    <TableCell className="text-subtle">{exception.detectedAt}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[exception.status]} size="sm" dot={false}>
                        {exception.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-subtle">{exception.owner}</TableCell>
                  </TableRow>
                ))}
                {exceptions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-subtle py-8">
                      <div className="flex flex-col items-center gap-2">
                        <ShieldAlert className="w-6 h-6 text-subtle" />
                        No exceptions match the current filters.
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableWrap>
        </main>
      </div>

      <RiskExceptionDetailDrawer exception={activeException} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
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

export default RiskExceptionCenterPage;
