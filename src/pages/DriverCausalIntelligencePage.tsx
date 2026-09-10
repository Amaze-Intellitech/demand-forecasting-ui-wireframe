import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemandFilters } from '../hooks/useDemandFilters';
import { ChevronRight, Info } from 'lucide-react';

import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { Tooltip } from '../components/ui/Tooltip';

import { CausalKpiCard } from '../components/demand/causal/CausalKpiCard';
import { CausalFilters } from '../components/demand/causal/CausalFilters';
import { DriverImpactCard } from '../components/demand/causal/DriverImpactCard';
import { CausalNetworkCard } from '../components/demand/causal/CausalNetworkCard';
import { CausalImpactOverTimeCard } from '../components/demand/causal/CausalImpactOverTimeCard';
import { CausalInsightsTable } from '../components/demand/causal/CausalInsightsTable';
import { ScenarioSimulationCard } from '../components/demand/causal/ScenarioSimulationCard';
import { KeyTakeawaysCard } from '../components/demand/causal/KeyTakeawaysCard';
import { DriverEventsCard } from '../components/demand/causal/DriverEventsCard';
import { AIInterpretationCard } from '../components/demand/causal/AIInterpretationCard';

import { DriverDetailDrawer } from '../components/demand/causal/DriverDetailDrawer';
import { CausalRelationshipDrawer } from '../components/demand/causal/CausalRelationshipDrawer';
import { DriverEventDrawer } from '../components/demand/causal/DriverEventDrawer';

import { mockCausalIntelligenceRepository } from '../repositories/mock/causalIntelligenceRepository';
import {
  TopDemandDriver,
  CausalNetworkNode,
  DriverBreakEvent,
} from '../types/domain/causalIntelligence';

export const DriverCausalIntelligencePage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation & Date Range state
  const [activeTab, setActiveTab] = useState<string>('drivers');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');

  // Filter Bar state
  const {
    plant: selectedPlant,
    product: selectedProduct,
    region: selectedRegion,
    setPlant: setSelectedPlant,
    setProduct: setSelectedProduct,
    setRegion: setSelectedRegion,
  } = useDemandFilters();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('FY 2025');

  // Interactive selectors
  const [selectedDriverForChart, setSelectedDriverForChart] = useState<string>('Price Index');
  const [selectedDriverForScenario, setSelectedDriverForScenario] = useState<string>('Price Index');
  const [insightsFilter, setInsightsFilter] = useState<string>('All Drivers');

  // Drawers state
  const [selectedDriver, setSelectedDriver] = useState<TopDemandDriver | null>(null);
  const [isDriverDrawerOpen, setIsDriverDrawerOpen] = useState<boolean>(false);

  const [selectedNetworkNode, setSelectedNetworkNode] = useState<CausalNetworkNode | null>(null);
  const [isNetworkDrawerOpen, setIsNetworkDrawerOpen] = useState<boolean>(false);

  const [selectedEvent, setSelectedEvent] = useState<DriverBreakEvent | null>(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState<boolean>(false);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Repository-driven data with contextual filters
  const filterOptions = useMemo(() => mockCausalIntelligenceRepository.getFilterOptions(), []);

  const kpis = useMemo(() => {
    return mockCausalIntelligenceRepository.getCausalKpis({
      plant: selectedPlant,
      product: selectedProduct,
      region: selectedRegion,
      period: selectedPeriod,
    });
  }, [selectedPlant, selectedProduct, selectedRegion, selectedPeriod]);

  const topDrivers = useMemo(() => {
    return mockCausalIntelligenceRepository.getTopDemandDrivers();
  }, []);

  const causalNetwork = useMemo(() => {
    return mockCausalIntelligenceRepository.getCausalNetwork();
  }, []);

  const timeSeriesData = useMemo(() => {
    return mockCausalIntelligenceRepository.getCausalImpactOverTime(selectedDriverForChart);
  }, [selectedDriverForChart]);

  const insightsTable = useMemo(() => {
    return mockCausalIntelligenceRepository.getCausalInsightsTable(insightsFilter);
  }, [insightsFilter]);

  const scenarioSimulation = useMemo(() => {
    return mockCausalIntelligenceRepository.getScenarioSimulation(selectedDriverForScenario);
  }, [selectedDriverForScenario]);

  const keyTakeaways = useMemo(() => {
    return mockCausalIntelligenceRepository.getKeyTakeaways();
  }, []);

  const driverEvents = useMemo(() => {
    return mockCausalIntelligenceRepository.getDriverBreakEvents();
  }, []);

  const aiInterpretation = useMemo(() => {
    return mockCausalIntelligenceRepository.getAIInterpretation(selectedDriverForScenario);
  }, [selectedDriverForScenario]);

  // Handlers
  const handleSelectDriver = (driver: TopDemandDriver) => {
    setSelectedDriver(driver);
    setIsDriverDrawerOpen(true);
  };

  const handleSelectDriverByName = (name: string) => {
    const found = topDrivers.find((d) => d.name.toLowerCase().includes(name.toLowerCase())) || topDrivers[0];
    if (found) {
      setSelectedDriver(found);
      setIsDriverDrawerOpen(true);
    }
  };

  const handleSelectNode = (node: CausalNetworkNode) => {
    setSelectedNetworkNode(node);
    setIsNetworkDrawerOpen(true);
  };

  const handleSelectEvent = (evt: DriverBreakEvent) => {
    setSelectedEvent(evt);
    setIsEventDrawerOpen(true);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f8fafc] text-slate-900 font-sans select-none overflow-x-hidden">
      {/* ── 1. Left Navigation Rail ── */}
      <DemandIntelligenceSidebar
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* ── 2. Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Main Workspace */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8 space-y-5 max-w-[1780px] w-full mx-auto">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/solutions" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Demand Intelligence</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Driver & Causal Intelligence</span>
          </nav>

          {/* Page Header & Global Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight flex items-center gap-2">
                Driver & Causal Intelligence
                <Tooltip content={`Causal impact is estimated with a structural time-series model that separates each driver's independent effect on demand from correlation with other drivers — distinguishing "moves with demand" from "changes demand."`}>
                  <button
                    type="button"
                    aria-label="What does 'causal' mean here?"
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-slate-300 text-slate-400 hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </Tooltip>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Understand what drives demand. From correlation to causation.
              </p>
            </div>

            {/* Filter Bar & Action */}
            <CausalFilters
              options={filterOptions}
              selectedPlant={selectedPlant}
              selectedProduct={selectedProduct}
              selectedRegion={selectedRegion}
              selectedPeriod={selectedPeriod}
              onPlantChange={setSelectedPlant}
              onProductChange={setSelectedProduct}
              onRegionChange={setSelectedRegion}
              onPeriodChange={setSelectedPeriod}
              onRunAnalysis={handleRunAnalysis}
              isRunning={isAnalyzing}
            />
          </div>

          {/* Section 1: Executive KPI Strip (6 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {kpis.map((kpi) => (
              <CausalKpiCard
                key={kpi.id}
                kpi={kpi}
                onClick={
                  kpi.id === 'kpi-drivers'
                    ? () => {
                        const top = topDrivers[0];
                        if (top) handleSelectDriver(top);
                      }
                    : undefined
                }
              />
            ))}
          </div>

          {/* Section 2: Main Analytical Row (Top Drivers / Causal Network / Impact Over Time) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-3 gap-5 items-stretch">
            {/* Column 1: Top Demand Drivers (Causal Impact) */}
            <div className="lg:col-span-12 xl:col-auto flex flex-col min-w-0">
              <DriverImpactCard
                drivers={topDrivers}
                selectedDriverId={selectedDriver?.id}
                onSelectDriver={handleSelectDriver}
              />
            </div>

            {/* Column 2: Causal Network Map */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <CausalNetworkCard
                nodes={causalNetwork.nodes}
                edges={causalNetwork.edges}
                selectedNodeId={selectedNetworkNode?.id}
                onSelectNode={handleSelectNode}
              />
            </div>

            {/* Column 3: Causal Impact Over Time */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <CausalImpactOverTimeCard
                data={timeSeriesData}
                selectedDriver={selectedDriverForChart}
                onDriverChange={setSelectedDriverForChart}
                availableDrivers={filterOptions.drivers}
              />
            </div>
          </div>

          {/* Section 3: Second Analytical Row (Insights Table / Scenario Simulation / Key Takeaways) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-[40fr_30fr_30fr] gap-5 items-stretch">
            {/* Column 1: Causal Insights by Driver */}
            <div className="lg:col-span-12 xl:col-auto flex flex-col min-w-0">
              <CausalInsightsTable
                insights={insightsTable}
                selectedFilter={insightsFilter}
                onFilterChange={setInsightsFilter}
                onSelectDriver={handleSelectDriverByName}
                driverOptions={filterOptions.drivers}
              />
            </div>

            {/* Column 2: Scenario Simulation */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <ScenarioSimulationCard
                scenarios={scenarioSimulation}
                selectedDriver={selectedDriverForScenario}
                onDriverChange={setSelectedDriverForScenario}
                availableDrivers={['Price Index', 'Promotions', 'Economic Activity']}
                onSelectScenario={() => navigate('/solutions/demand-intelligence/scenarios')}
              />
            </div>

            {/* Column 3: Key Takeaways */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <KeyTakeawaysCard
                takeaways={keyTakeaways}
                onSelectTakeaway={(t) => handleSelectDriverByName(t.title)}
              />
            </div>
          </div>

          {/* Section 4: Bottom Analytical Row (Driver Events ~65%, AI Interpretation ~35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Column: Driver Events & Structural Breaks (65%) */}
            <div className="lg:col-span-8 flex flex-col min-w-0">
              <DriverEventsCard
                events={driverEvents}
                onSelectEvent={handleSelectEvent}
                onViewAll={() => {
                  const firstEvt = driverEvents[0];
                  if (firstEvt) handleSelectEvent(firstEvt);
                }}
              />
            </div>

            {/* Right Column: AI Interpretation (35%) */}
            <div className="lg:col-span-4 flex flex-col min-w-0">
              <AIInterpretationCard
                interpretation={aiInterpretation}
                onExploreScenario={(route) => navigate(route)}
                onViewPricing={(route) => navigate(route)}
              />
            </div>
          </div>

        </main>
      </div>

      {/* ── Drawers ── */}
      <DriverDetailDrawer
        driver={selectedDriver}
        isOpen={isDriverDrawerOpen}
        onClose={() => setIsDriverDrawerOpen(false)}
        onSimulateScenario={() => navigate('/solutions/demand-intelligence/scenarios')}
      />

      <CausalRelationshipDrawer
        node={selectedNetworkNode}
        isOpen={isNetworkDrawerOpen}
        onClose={() => setIsNetworkDrawerOpen(false)}
        onSimulateScenario={() => navigate('/solutions/demand-intelligence/scenarios')}
      />

      <DriverEventDrawer
        event={selectedEvent}
        isOpen={isEventDrawerOpen}
        onClose={() => setIsEventDrawerOpen(false)}
        onNavigateToScenarios={() => navigate('/solutions/demand-intelligence/scenarios')}
      />

    </div>
  );
};

export default DriverCausalIntelligencePage;
