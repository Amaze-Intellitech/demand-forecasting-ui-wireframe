import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDemandFilters } from '../hooks/useDemandFilters';
import { ChevronRight } from 'lucide-react';

import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';

import { ScenarioFilters } from '../components/demand/scenario/ScenarioFilters';
import { ScenarioSelectorStrip } from '../components/demand/scenario/ScenarioSelectorStrip';
import { ScenarioKpiStrip } from '../components/demand/scenario/ScenarioKpiStrip';
import { ScenarioDemandComparisonChart } from '../components/demand/scenario/ScenarioDemandComparisonChart';
import { ScenarioImpactSummaryTable } from '../components/demand/scenario/ScenarioImpactSummaryTable';
import { ScenarioDriversTable } from '../components/demand/scenario/ScenarioDriversTable';
import { ScenarioNetworkView } from '../components/demand/scenario/ScenarioNetworkView';
import { ScenarioTradeoffsCard } from '../components/demand/scenario/ScenarioTradeoffsCard';
import { WhatIfAnalysisCard } from '../components/demand/scenario/WhatIfAnalysisCard';
import { RecommendedScenarioCard } from '../components/demand/scenario/RecommendedScenarioCard';
import { RecentScenariosCard } from '../components/demand/scenario/RecentScenariosCard';

import { CreateScenarioDrawer } from '../components/demand/scenario/CreateScenarioDrawer';
import { ScenarioDetailDrawer } from '../components/demand/scenario/ScenarioDetailDrawer';
import { DriverAdjustmentDrawer } from '../components/demand/scenario/DriverAdjustmentDrawer';
import { RegionDetailDrawer } from '../components/demand/scenario/RegionDetailDrawer';
import { ApplyPlanningModal } from '../components/demand/scenario/ApplyPlanningModal';

import { mockScenarioDecisionTwinRepository } from '../repositories/mock/scenarioDecisionTwinRepository';
import {
  ScenarioPreset,
  ScenarioDriverRow,
  ScenarioRegionalImpact,
  WhatIfDriverOption,
} from '../types/domain/scenarioDecisionTwin';

export const ScenarioDecisionTwinPage: React.FC = () => {
  // Topbar and Shell State
  const [activeTab, setActiveTab] = useState<string>('scenarios');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');

  // Global Filters State
  const {
    plant: selectedPlant,
    product: selectedProduct,
    region: selectedRegion,
    setPlant: setSelectedPlant,
    setProduct: setSelectedProduct,
    setRegion: setSelectedRegion,
  } = useDemandFilters();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('FY 2025');

  // Scenario Presets State
  const [scenarios, setScenarios] = useState<ScenarioPreset[]>(() =>
    mockScenarioDecisionTwinRepository.getScenarioPresets()
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scenario-base');

  // Granularity & View States
  const [chartGranularity, setChartGranularity] = useState<'Monthly' | 'Quarterly'>('Monthly');
  const [driversScenarioId, setDriversScenarioId] = useState<string>('scenario-base');
  const [networkMetric, setNetworkMetric] = useState<string>('Demand Change');

  // What-if Simulation State
  const [whatIfOutcome, setWhatIfOutcome] = useState<WhatIfDriverOption>(() =>
    mockScenarioDecisionTwinRepository.getWhatIfOutcome('Price Index', '-10%')
  );
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Drawers and Modals State
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState<boolean>(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<ScenarioDriverRow | null>(null);
  const [isDriverDrawerOpen, setIsDriverDrawerOpen] = useState<boolean>(false);
  const [selectedRegionNode, setSelectedRegionNode] = useState<ScenarioRegionalImpact | null>(null);
  const [isRegionDrawerOpen, setIsRegionDrawerOpen] = useState<boolean>(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);

  const [driverOverrides, setDriverOverrides] = useState<Record<string, string>>({});

  // Derived Repository Data
  const filterOptions = useMemo(
    () => mockScenarioDecisionTwinRepository.getScenarioFilters(),
    []
  );

  const selectedScenario = useMemo(() => {
    return (
      scenarios.find((s) => s.id === selectedScenarioId) ||
      scenarios[0]
    );
  }, [scenarios, selectedScenarioId]);

  const trajectoryData = useMemo(() => {
    return mockScenarioDecisionTwinRepository.getScenarioForecastSeries(chartGranularity);
  }, [chartGranularity]);

  const comparisonRows = useMemo(() => {
    return mockScenarioDecisionTwinRepository.getScenarioComparisonRows();
  }, [scenarios]);

  const driverRows = useMemo(() => {
    const rows = mockScenarioDecisionTwinRepository.getScenarioDrivers(driversScenarioId);
    return rows.map((r) =>
      driverOverrides[`${driversScenarioId}:${r.id}`]
        ? { ...r, scenarioValue: driverOverrides[`${driversScenarioId}:${r.id}`] }
        : r
    );
  }, [driversScenarioId, driverOverrides]);

  const regionalData = useMemo(() => {
    return mockScenarioDecisionTwinRepository.getRegionalImpact(networkMetric);
  }, [networkMetric]);

  const tradeoffs = useMemo(() => {
    return mockScenarioDecisionTwinRepository.getScenarioTradeoffs(selectedScenarioId);
  }, [selectedScenarioId]);

  const recommendedData = useMemo(() => {
    return mockScenarioDecisionTwinRepository.getRecommendedScenario();
  }, []);

  const recentScenarios = useMemo(() => {
    return mockScenarioDecisionTwinRepository.getRecentScenarios();
  }, []);

  // Handlers
  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setDriversScenarioId(id);
  };

  const handleCreateScenario = (newScenario: Partial<ScenarioPreset>) => {
    const created = mockScenarioDecisionTwinRepository.createScenario(newScenario);
    setScenarios([...mockScenarioDecisionTwinRepository.getScenarioPresets()]);
    setSelectedScenarioId(created.id);
    setDriversScenarioId(created.id);
  };

  const handleDuplicateScenario = (id: string) => {
    const dup = mockScenarioDecisionTwinRepository.duplicateScenario(id);
    if (dup) {
      setScenarios([...mockScenarioDecisionTwinRepository.getScenarioPresets()]);
      setSelectedScenarioId(dup.id);
    }
  };

  const handleDeleteScenario = (id: string) => {
    mockScenarioDecisionTwinRepository.deleteScenario(id);
    setScenarios([...mockScenarioDecisionTwinRepository.getScenarioPresets()]);
    if (selectedScenarioId === id) {
      setSelectedScenarioId('scenario-base');
    }
  };

  const handleRunWhatIfSimulation = (driver: string, change: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      const result = mockScenarioDecisionTwinRepository.getWhatIfOutcome(driver, change);
      setWhatIfOutcome(result);
      setIsSimulating(false);
    }, 500);
  };

  const handleApplyPlanningConfirm = (scenarioId: string) => {
    mockScenarioDecisionTwinRepository.applyScenarioToPlanning(scenarioId);
    setScenarios([...mockScenarioDecisionTwinRepository.getScenarioPresets()]);
  };

  const handleDriverSelect = (driver: ScenarioDriverRow) => {
    setSelectedDriver(driver);
    setIsDriverDrawerOpen(true);
  };

  const handleDriverApply = (driverId: string, updatedVal: string) => {
    setDriverOverrides((prev) => ({
      ...prev,
      [`${driversScenarioId}:${driverId}`]: updatedVal,
    }));
  };

  const handleSelectRegion = (region: ScenarioRegionalImpact) => {
    setSelectedRegionNode(region);
    setIsRegionDrawerOpen(true);
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
            <span className="text-slate-900 font-bold">Scenario & Decision Twin</span>
          </nav>

          {/* Page Header & Global Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Scenario & Decision Twin
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Simulate scenarios. Quantify impact. Choose the best path.
              </p>
            </div>

            {/* Filter Bar & Action */}
            <ScenarioFilters
              options={filterOptions}
              selectedPlant={selectedPlant}
              selectedProduct={selectedProduct}
              selectedRegion={selectedRegion}
              selectedPeriod={selectedPeriod}
              onPlantChange={setSelectedPlant}
              onProductChange={setSelectedProduct}
              onRegionChange={setSelectedRegion}
              onPeriodChange={setSelectedPeriod}
              onCreateScenario={() => setIsCreateDrawerOpen(true)}
            />
          </div>

          {/* Section 1: Scenario Navigation Strip (6 Cards) */}
          <ScenarioSelectorStrip
            scenarios={scenarios}
            selectedScenarioId={selectedScenarioId}
            onSelectScenario={handleSelectScenario}
            onAddScenario={() => setIsCreateDrawerOpen(true)}
            onDuplicateScenario={handleDuplicateScenario}
            onDeleteScenario={handleDeleteScenario}
          />

          {/* Section 2: Executive KPI Strip (6 Cards) */}
          <ScenarioKpiStrip outcomes={selectedScenario.outcomes} />

          {/* Section 3: Main Comparison Row (Two Major Cards: 46% / 54%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 46%: Demand Comparison Across Scenarios */}
            <div className="lg:col-span-6 xl:col-span-5">
              <ScenarioDemandComparisonChart
                data={trajectoryData}
                selectedScenarioId={selectedScenarioId}
                granularity={chartGranularity}
                onGranularityChange={setChartGranularity}
              />
            </div>

            {/* Right 54%: Scenario Impact Summary Table */}
            <div className="lg:col-span-6 xl:col-span-7">
              <ScenarioImpactSummaryTable
                rows={comparisonRows}
                selectedScenarioId={selectedScenarioId}
                onSelectScenario={handleSelectScenario}
              />
            </div>
          </div>

          {/* Section 4: Analysis Row (Three Columns: 33% / 37% / 30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 33%: Key Drivers and Assumptions */}
            <div className="lg:col-span-4">
              <ScenarioDriversTable
                drivers={driverRows}
                scenarios={scenarios}
                activeScenarioId={driversScenarioId}
                onScenarioChange={setDriversScenarioId}
                onSelectDriver={handleDriverSelect}
              />
            </div>

            {/* Center 37%: Network View (Scenario: High Demand) */}
            <div className="lg:col-span-5">
              <ScenarioNetworkView
                scenarioName={selectedScenario.name}
                regionalData={regionalData}
                selectedMetric={networkMetric}
                onMetricChange={setNetworkMetric}
                onSelectRegion={handleSelectRegion}
              />
            </div>

            {/* Right 30%: Scenario Trade-offs */}
            <div className="lg:col-span-3">
              <ScenarioTradeoffsCard tradeoffs={tradeoffs} />
            </div>
          </div>

          {/* Section 5: Bottom Decision Row (Three Columns: 33% / 37% / 30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 33%: What-if Analysis */}
            <div className="lg:col-span-4">
              <WhatIfAnalysisCard
                currentOutcome={whatIfOutcome}
                onRunSimulation={handleRunWhatIfSimulation}
                isRunning={isSimulating}
              />
            </div>

            {/* Center 37%: Recommended Scenario */}
            <div className="lg:col-span-5">
              <RecommendedScenarioCard
                data={recommendedData}
                onApplyToPlanning={() => setIsApplyModalOpen(true)}
                onViewDetailedAnalysis={() => setIsDetailDrawerOpen(true)}
              />
            </div>

            {/* Right 30%: Recent Scenarios */}
            <div className="lg:col-span-3">
              <RecentScenariosCard
                items={recentScenarios}
                onSelectScenario={(name) => {
                  const match = scenarios.find((s) => s.name === name);
                  if (match) handleSelectScenario(match.id);
                }}
                onViewAll={() => setIsDetailDrawerOpen(true)}
              />
            </div>
          </div>

        </main>
      </div>

      {/* ── Drawers & Modals ── */}
      <CreateScenarioDrawer
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
        onCreate={handleCreateScenario}
      />

      <ScenarioDetailDrawer
        scenario={selectedScenario}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        onSelect={handleSelectScenario}
        onDuplicate={handleDuplicateScenario}
        onApplyToPlanning={handleApplyPlanningConfirm}
      />

      <DriverAdjustmentDrawer
        driver={selectedDriver}
        isOpen={isDriverDrawerOpen}
        onClose={() => setIsDriverDrawerOpen(false)}
        onApply={handleDriverApply}
      />

      <RegionDetailDrawer
        region={selectedRegionNode}
        isOpen={isRegionDrawerOpen}
        onClose={() => setIsRegionDrawerOpen(false)}
      />

      <ApplyPlanningModal
        scenario={selectedScenario}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onConfirm={handleApplyPlanningConfirm}
      />
    </div>
  );
};

export default ScenarioDecisionTwinPage;
