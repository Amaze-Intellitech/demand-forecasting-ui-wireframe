import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { HierarchyFilters } from '../components/demand/HierarchyFilters';
import { KpiRow } from '../components/demand/KpiRow';
import { DemandOutlookChart } from '../components/demand/DemandOutlookChart';
import { AitekIntelligencePanel } from '../components/demand/AitekIntelligencePanel';
import { BottomValuePanels } from '../components/demand/BottomValuePanels';
import {
  DetailedForecastModal,
  AtRiskSkusModal,
  SourcingOptimizationModal,
} from '../components/demand/DemandModals';
import {
  MONTHLY_DEMAND_OUTLOOK,
  QUARTERLY_DEMAND_OUTLOOK,
} from '../data/demandIntelligenceMock';

export const ExecutiveCockpit: React.FC = () => {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');
  const [chartPeriod, setChartPeriod] = useState<'monthly' | 'quarterly'>('monthly');

  // Hierarchy filter state with default mock values matching reference
  const [filters, setFilters] = useState({
    enterprise: 'Global Industrial Materials Corp',
    division: 'Advanced Materials',
    plant: 'Columbus #04',
    category: 'Industrial Polymers',
    sku: 'HDPE Resin (SKU-9021)',
  });

  // Modal display states
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);
  const [isAtRiskModalOpen, setIsAtRiskModalOpen] = useState(false);
  const [isSourcingModalOpen, setIsSourcingModalOpen] = useState(false);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const chartData = useMemo(() => {
    return chartPeriod === 'monthly' ? MONTHLY_DEMAND_OUTLOOK : QUARTERLY_DEMAND_OUTLOOK;
  }, [chartPeriod]);

  return (
    <div className="min-h-screen w-full flex bg-[#f8fafc] text-slate-900 font-sans select-none overflow-x-hidden">
      
      {/* ── Left Navigation Rail ── */}
      <DemandIntelligenceSidebar
        activeTab={activeTab}
        onSelectTab={(tabId) => {
          setActiveTab(tabId);
          if (tabId === 'forecast') setIsForecastModalOpen(true);
          if (tabId === 'sourcing') setIsSourcingModalOpen(true);
        }}
      />

      {/* ── Main App Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top App Bar */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Main Workspace */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-6 max-w-[1680px] w-full mx-auto">
          
          {/* Breadcrumb Row */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/solutions" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Demand Intelligence</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">Executive Cockpit</span>
          </nav>

          {/* Page Title & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
              Executive Cockpit
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Demand outlook, business risk and value at a glance.
            </p>
          </div>

          {/* Compact Hierarchy Filter Row */}
          <HierarchyFilters
            enterprise={filters.enterprise}
            division={filters.division}
            plant={filters.plant}
            category={filters.category}
            sku={filters.sku}
            onChange={handleFilterChange}
          />

          {/* Executive KPI Row (4 Cards) */}
          <KpiRow />

          {/* Main Analytical Section: 12-Month Outlook (Left) + AITEK Intelligence Panel (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left 12-Month Outlook Chart (7.5 cols on desktop) */}
            <div className="lg:col-span-8 flex flex-col">
              <DemandOutlookChart
                data={chartData}
                period={chartPeriod}
                onPeriodChange={setChartPeriod}
              />
            </div>

            {/* Right AITEK Intelligence Narrative Panel (4.5 cols on desktop) */}
            <div className="lg:col-span-4 flex flex-col">
              <AITEKIntelligencePanelWrapper
                onViewDetailedForecast={() => setIsForecastModalOpen(true)}
              />
            </div>
          </div>

          {/* Bottom Value Panels (3 Cards: Working Capital, Service Risk, Procurement Opportunity) */}
          <BottomValuePanels
            onViewAtRiskSkus={() => setIsAtRiskModalOpen(true)}
            onViewSourcingOptimization={() => setIsSourcingModalOpen(true)}
          />

        </main>
      </div>

      {/* ── Interactive Modals ── */}
      <DetailedForecastModal
        isOpen={isForecastModalOpen}
        onClose={() => setIsForecastModalOpen(false)}
      />

      <AtRiskSkusModal
        isOpen={isAtRiskModalOpen}
        onClose={() => setIsAtRiskModalOpen(false)}
      />

      <SourcingOptimizationModal
        isOpen={isSourcingModalOpen}
        onClose={() => setIsSourcingModalOpen(false)}
      />

    </div>
  );
};

// Internal wrapper to pass panel cleanly
const AITEKIntelligencePanelWrapper: React.FC<{ onViewDetailedForecast: () => void }> = ({
  onViewDetailedForecast,
}) => {
  return <AitekIntelligencePanel onViewDetailedForecast={onViewDetailedForecast} />;
};

export default ExecutiveCockpit;
