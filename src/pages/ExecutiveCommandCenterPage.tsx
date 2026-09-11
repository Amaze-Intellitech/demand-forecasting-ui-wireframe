import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Download,
  ChevronDown,
} from 'lucide-react';

import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';

import { ExecutiveKpiCard } from '../components/demand/executive/ExecutiveKpiCard';
import { CriticalExceptionBanner } from '../components/demand/executive/CriticalExceptionBanner';
import { DemandSupplyOutlook } from '../components/demand/executive/DemandSupplyOutlook';
import { RegionalDemand } from '../components/demand/executive/RegionalDemand';
import { ExecutiveInsights } from '../components/demand/executive/ExecutiveInsights';
import { WorkingCapitalWaterfall } from '../components/demand/executive/WorkingCapitalWaterfall';
import { PlantServiceLevels } from '../components/demand/executive/PlantServiceLevels';
import { ProductMix } from '../components/demand/executive/ProductMix';
import { RecentActivity } from '../components/demand/executive/RecentActivity';
import { DecisionTriggers, QuickActionsCard } from '../components/demand/executive/DecisionTriggers';
import { DecisionApprovalDrawer } from '../components/demand/executive/DecisionApprovalDrawer';
import { ExceptionDetailDrawer } from '../components/demand/executive/ExceptionDetailDrawer';
import { ExportReportModal } from '../components/demand/executive/ExportReportModal';

import { mockExecutiveRepository } from '../repositories/mock/executiveCommandCenterRepository';
import {
  DecisionTrigger,
  PlanningEvent,
  ExecutiveInsight,
} from '../types/domain/executiveCommandCenter';
import { useDemandFilters } from '../hooks/useDemandFilters';

export const ExecutiveCommandCenterPage: React.FC = () => {
  const navigate = useNavigate();

  // Filter state — shared across Demand Intelligence pages via the URL
  const { plant: selectedPlant, product: selectedProduct, region: selectedRegion, setPlant: setSelectedPlant, setProduct: setSelectedProduct, setRegion: setSelectedRegion } = useDemandFilters();

  // Filter state
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');
  const [chartPeriod, setChartPeriod] = useState<'monthly' | 'quarterly'>('monthly');

  // Interactive drawer & modal states
  const [activeDecisionTrigger, setActiveDecisionTrigger] = useState<DecisionTrigger | null>(null);
  const [isDecisionDrawerOpen, setIsDecisionDrawerOpen] = useState<boolean>(false);

  const [activeEvent, setActiveEvent] = useState<PlanningEvent | null>(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState<boolean>(false);

  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Local state for decision triggers so users can approve/modify/reject them interactively
  const [decisionTriggers, setDecisionTriggers] = useState<DecisionTrigger[]>(() =>
    mockExecutiveRepository.getDecisionTriggers()
  );

  // Local state for recent events
  const [recentEvents, setRecentEvents] = useState<PlanningEvent[]>(() =>
    mockExecutiveRepository.getRecentEvents()
  );

  // Repository-driven data with contextual filters
  const filterOptions = useMemo(() => mockExecutiveRepository.getFilterOptions(), []);

  const kpiData = useMemo(() => {
    return mockExecutiveRepository.getExecutiveKpis({
      plant: selectedPlant,
      product: selectedProduct,
      region: selectedRegion,
    });
  }, [selectedPlant, selectedProduct, selectedRegion]);

  const demandSupplyData = useMemo(() => {
    return mockExecutiveRepository.getDemandSupplySeries(chartPeriod);
  }, [chartPeriod]);

  const regionalDemandData = useMemo(() => {
    return mockExecutiveRepository.getRegionalDemand();
  }, []);

  const executiveInsights = useMemo(() => {
    return mockExecutiveRepository.getExecutiveInsights();
  }, []);

  const workingCapitalData = useMemo(() => {
    return mockExecutiveRepository.getWorkingCapitalWaterfall();
  }, []);

  const plantServiceData = useMemo(() => {
    return mockExecutiveRepository.getPlantServiceLevels();
  }, []);

  const productMixData = useMemo(() => {
    return mockExecutiveRepository.getProductCategoryMix();
  }, []);

  // Handlers for Decision Triggers
  const handleOpenDecisionTrigger = (trigger: DecisionTrigger) => {
    // Look up latest trigger state
    const current = decisionTriggers.find((t) => t.id === trigger.id) || trigger;
    setActiveDecisionTrigger(current);
    setIsDecisionDrawerOpen(true);
  };

  const handleApproveDecision = (triggerId: string) => {
    setDecisionTriggers((prev) =>
      prev.map((t) => {
        if (t.id === triggerId) {
          return {
            ...t,
            status: 'approved',
            approvedBy: 'Siddhartha M',
            approvedAt: 'Just now',
          };
        }
        return t;
      })
    );
    if (activeDecisionTrigger?.id === triggerId) {
      setActiveDecisionTrigger((prev) =>
        prev
          ? {
              ...prev,
              status: 'approved',
              approvedBy: 'Siddhartha M',
              approvedAt: 'Just now',
            }
          : null
      );
    }
  };

  const handleRejectDecision = (triggerId: string, reason?: string) => {
    setDecisionTriggers((prev) =>
      prev.map((t) => {
        if (t.id === triggerId) {
          return {
            ...t,
            status: 'rejected',
            rejectionReason: reason,
          };
        }
        return t;
      })
    );
    if (activeDecisionTrigger?.id === triggerId) {
      setActiveDecisionTrigger((prev) =>
        prev
          ? {
              ...prev,
              status: 'rejected',
              rejectionReason: reason,
            }
          : null
      );
    }
  };

  const handleModifyDecision = (triggerId: string, notes: string) => {
    setDecisionTriggers((prev) =>
      prev.map((t) => {
        if (t.id === triggerId) {
          return {
            ...t,
            status: 'approved',
            modificationNotes: notes,
            approvedBy: 'Siddhartha M (Modified)',
            approvedAt: 'Just now',
          };
        }
        return t;
      })
    );
    if (activeDecisionTrigger?.id === triggerId) {
      setActiveDecisionTrigger((prev) =>
        prev
          ? {
              ...prev,
              status: 'approved',
              modificationNotes: notes,
              approvedBy: 'Siddhartha M (Modified)',
              approvedAt: 'Just now',
            }
          : null
      );
    }
  };

  const handleUndoDecision = (triggerId: string) => {
    setDecisionTriggers((prev) =>
      prev.map((t) => {
        if (t.id === triggerId) {
          return {
            ...t,
            status: 'pendingApproval',
            approvedBy: undefined,
            approvedAt: undefined,
            rejectionReason: undefined,
            modificationNotes: undefined,
          };
        }
        return t;
      })
    );
    if (activeDecisionTrigger?.id === triggerId) {
      setActiveDecisionTrigger((prev) =>
        prev
          ? {
              ...prev,
              status: 'pendingApproval',
              approvedBy: undefined,
              approvedAt: undefined,
              rejectionReason: undefined,
              modificationNotes: undefined,
            }
          : null
      );
    }
  };

  // Handlers for Events
  const handleOpenEvent = (event: PlanningEvent) => {
    setActiveEvent(event);
    setIsEventDrawerOpen(true);
  };

  const handleDismissEvent = (eventId: string) => {
    setRecentEvents((prev) => prev.filter((e) => e.id !== eventId));
    setIsEventDrawerOpen(false);
  };

  const handleOpenWorkspace = (route: string) => {
    setIsEventDrawerOpen(false);
    navigate(route);
  };

  const handleSelectInsight = (insight: ExecutiveInsight) => {
    navigate(insight.route);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f8fafc] text-slate-900 font-sans select-none overflow-x-hidden">
      {/* ── Left Navigation Rail ── */}
      <DemandIntelligenceSidebar activeTab="executive" />

      {/* ── Main App Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Application Bar */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Main Workspace */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8 space-y-5 max-w-[1780px] w-full mx-auto">
          
          {/* Breadcrumb Row */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/solutions" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Demand Intelligence</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Executive Command Center</span>
          </nav>

          {/* Page Header & Top Level Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Executive Command Center
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Enterprise view. Real-time insights. Confident decisions.
              </p>
            </div>

            {/* Top-Right Controls Strip */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Plant Selector */}
              <div className="relative">
                <select
                  value={selectedPlant}
                  onChange={(e) => setSelectedPlant(e.target.value)}
                  className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {filterOptions.plants.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>

              {/* Product Selector */}
              <div className="relative">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="h-9 pl-3.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {filterOptions.products.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>

              {/* Export Report Action */}
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="h-9 px-4 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Section 1: Executive KPI Strip (6 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {kpiData.map((kpi) => (
              <ExecutiveKpiCard
                key={kpi.id}
                kpi={kpi}
                onClick={
                  kpi.id === 'kpi-exceptions'
                    ? () => navigate('/solutions/demand-intelligence/risk-exceptions')
                    : undefined
                }
              />
            ))}
          </div>

          {/* Section 2: Critical Exception Banner */}
          <CriticalExceptionBanner
            criticalCount={3}
            onViewExceptions={() => navigate('/solutions/demand-intelligence/risk-exceptions?severity=critical')}
          />

          {/* Section 3: Main Analytical Row (3 Columns: 40% / 28% / 32%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[10fr_7fr_8fr] gap-5 items-stretch">
            {/* Column 1: Demand vs. Supply Outlook (40% on desktop) */}
            <div className="flex flex-col min-w-0">
              <DemandSupplyOutlook
                data={demandSupplyData}
                period={chartPeriod}
                onPeriodChange={setChartPeriod}
              />
            </div>

            {/* Column 2: Demand by Region (28% on desktop) */}
            <div className="flex flex-col min-w-0">
              <RegionalDemand
                regions={regionalDemandData}
                selectedRegion={selectedRegion}
                onSelectRegion={(regId) => {
                  setSelectedRegion(regId);
                }}
              />
            </div>

            {/* Column 3: Top Executive Insights (32% on desktop) */}
            <div className="flex flex-col min-w-0">
              <ExecutiveInsights
                insights={executiveInsights}
                onSelectInsight={handleSelectInsight}
              />
            </div>
          </div>

          {/* Section 4: Second Analytical Row (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* Column 1: Working Capital Risk Waterfall */}
            <div className="flex flex-col">
              <WorkingCapitalWaterfall data={workingCapitalData} />
            </div>

            {/* Column 2: Service Level by Plant */}
            <div className="flex flex-col">
              <PlantServiceLevels
                plants={plantServiceData}
                selectedPlant={selectedPlant}
                onSelectPlant={(plant) => setSelectedPlant(plant)}
              />
            </div>

            {/* Column 3: Demand by Product Category */}
            <div className="flex flex-col">
              <ProductMix
                categories={productMixData}
                selectedCategory={selectedProduct}
                onSelectCategory={(cat) => setSelectedProduct(cat)}
              />
            </div>
          </div>

          {/* Section 5: Events, Decisions & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left/Center Column: Recent Activity & Key Events (~68% on desktop) */}
            <div className="lg:col-span-8 flex flex-col">
              <RecentActivity
                events={recentEvents}
                onSelectEvent={handleOpenEvent}
                onViewAll={() => navigate('/solutions/demand-intelligence/risk-exceptions')}
              />
            </div>

            {/* Right Column: C-Suite Decision Triggers & Quick Actions (~32% on desktop) */}
            <div className="lg:col-span-4 flex flex-col space-y-5">
              <DecisionTriggers
                triggers={decisionTriggers}
                onSelectTrigger={handleOpenDecisionTrigger}
              />
              <QuickActionsCard
                onNavigate={(route) => navigate(route)}
              />
            </div>
          </div>

        </main>
      </div>

      {/* ── Drawers & Modals ── */}
      <DecisionApprovalDrawer
        trigger={activeDecisionTrigger}
        isOpen={isDecisionDrawerOpen}
        onClose={() => setIsDecisionDrawerOpen(false)}
        onApprove={handleApproveDecision}
        onReject={handleRejectDecision}
        onModify={handleModifyDecision}
        onUndo={handleUndoDecision}
        onOpenAuditLog={(agentId) => navigate(`/solutions/demand-intelligence/agent-control?agentId=${agentId}`)}
      />

      <ExceptionDetailDrawer
        event={activeEvent}
        isOpen={isEventDrawerOpen}
        onClose={() => setIsEventDrawerOpen(false)}
        onOpenWorkspace={handleOpenWorkspace}
        onDismiss={handleDismissEvent}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        plantContext={selectedPlant}
        productContext={selectedProduct}
        dateRange={selectedDateRange}
      />
    </div>
  );
};

export default ExecutiveCommandCenterPage;
