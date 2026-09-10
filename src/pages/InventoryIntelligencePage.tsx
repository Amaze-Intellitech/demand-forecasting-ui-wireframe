import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemandFilters } from '../hooks/useDemandFilters';
import { ChevronRight } from 'lucide-react';

import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';

import { InventoryKpiCard } from '../components/demand/inventory/InventoryKpiCard';
import { InventoryFilters } from '../components/demand/inventory/InventoryFilters';
import { InventoryPositionChart } from '../components/demand/inventory/InventoryPositionChart';
import { InventoryByCategory } from '../components/demand/inventory/InventoryByCategory';
import { InventoryByPlant } from '../components/demand/inventory/InventoryByPlant';
import { InventoryHealthTable } from '../components/demand/inventory/InventoryHealthTable';
import { InventoryCoverageChart } from '../components/demand/inventory/InventoryCoverageChart';
import { InventoryRisks } from '../components/demand/inventory/InventoryRisks';
import { InventoryOpportunities } from '../components/demand/inventory/InventoryOpportunities';
import { ServiceLevelForecast } from '../components/demand/inventory/ServiceLevelForecast';
import { AIInventoryRecommendation } from '../components/demand/inventory/AIInventoryRecommendation';

import { InventorySkuDrawer } from '../components/demand/inventory/InventorySkuDrawer';
import { InventoryRiskDrawer } from '../components/demand/inventory/InventoryRiskDrawer';
import { OptimizationDecisionDrawer } from '../components/demand/inventory/OptimizationDecisionDrawer';
import { SafetyStockControl } from '../components/demand/inventory/SafetyStockControl';
import { AbcXyzDrawer } from '../components/demand/inventory/AbcXyzDrawer';
import { NetworkDrawer } from '../components/demand/inventory/NetworkDrawer';

import { mockInventoryRepository } from '../repositories/mock/inventoryIntelligenceRepository';
import {
  InventorySkuItem,
  InventoryRisk,
  InventoryOpportunity,
  ApprovalStatus,
} from '../types/domain/inventoryIntelligence';

export const InventoryIntelligencePage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation & Date Range
  const [activeTab, setActiveTab] = useState<string>('inventory');
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

  // Local view controls
  const [positionGranularity, setPositionGranularity] = useState<string>('Monthly');
  const [selectedCategory, setSelectedCategory] = useState<string>('HDPE Resin');
  const [plantMetric, setPlantMetric] = useState<'Units' | 'Value' | 'Days of Supply'>('Units');
  const [skuTab, setSkuTab] = useState<string>('All SKUs');
  const [coverageHorizon, setCoverageHorizon] = useState<string>('Next 6 Months');

  // Interactive Drawers and Modals state
  const [selectedSku, setSelectedSku] = useState<InventorySkuItem | null>(null);
  const [isSkuDrawerOpen, setIsSkuDrawerOpen] = useState<boolean>(false);

  const [selectedRisk, setSelectedRisk] = useState<InventoryRisk | null>(null);
  const [isRiskDrawerOpen, setIsRiskDrawerOpen] = useState<boolean>(false);

  const [selectedOpportunity, setSelectedOpportunity] = useState<InventoryOpportunity | null>(null);
  const [isOpportunityDrawerOpen, setIsOpportunityDrawerOpen] = useState<boolean>(false);

  const [isSafetyStockOpen, setIsSafetyStockOpen] = useState<boolean>(false);
  const [isAbcXyzOpen, setIsAbcXyzOpen] = useState<boolean>(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState<boolean>(false);

  // Dynamic Repository Data Queries
  const filterOptions = useMemo(() => mockInventoryRepository.getFilterOptions(), []);

  const kpis = useMemo(() => {
    return mockInventoryRepository.getInventoryKpis({
      plant: selectedPlant,
      product: selectedProduct,
      region: selectedRegion,
    });
  }, [selectedPlant, selectedProduct, selectedRegion]);

  const positionSeries = useMemo(() => {
    return mockInventoryRepository.getInventoryPosition(positionGranularity);
  }, [positionGranularity]);

  const categoryShare = useMemo(() => {
    return mockInventoryRepository.getInventoryByCategory();
  }, []);

  const plantShare = useMemo(() => {
    return mockInventoryRepository.getInventoryByPlant(plantMetric);
  }, [plantMetric]);

  const skuList = useMemo(() => {
    return mockInventoryRepository.getInventoryHealth(skuTab);
  }, [skuTab]);

  const coverageData = useMemo(() => {
    return mockInventoryRepository.getInventoryCoverage(coverageHorizon);
  }, [coverageHorizon]);

  const riskList = useMemo(() => {
    return mockInventoryRepository.getInventoryRisks();
  }, []);

  const [opportunities, setOpportunities] = useState<InventoryOpportunity[]>(() =>
    mockInventoryRepository.getInventoryOpportunities()
  );

  const serviceForecast = useMemo(() => {
    return mockInventoryRepository.getServiceLevelForecast();
  }, []);

  const networkNodes = useMemo(() => {
    return mockInventoryRepository.getNetworkNodes();
  }, []);

  const abcXyzSegments = useMemo(() => {
    return mockInventoryRepository.getAbcXyzSegments();
  }, []);

  const aiRecommendation = useMemo(() => {
    return mockInventoryRepository.getAIRecommendation(skuTab);
  }, [skuTab]);

  // Handlers
  const handleSelectSku = (sku: InventorySkuItem) => {
    setSelectedSku(sku);
    setIsSkuDrawerOpen(true);
  };

  const handleSelectRisk = (risk: InventoryRisk) => {
    setSelectedRisk(risk);
    setIsRiskDrawerOpen(true);
  };

  const handleSelectOpportunity = (opp: InventoryOpportunity) => {
    setSelectedOpportunity(opp);
    setIsOpportunityDrawerOpen(true);
  };

  const handleUpdateApproval = (oppId: string, status: ApprovalStatus) => {
    const updated = mockInventoryRepository.updateOpportunityApproval(oppId, status, 'Siddhartha M');
    setOpportunities([...updated]);
    if (selectedOpportunity && selectedOpportunity.id === oppId) {
      setSelectedOpportunity({
        ...selectedOpportunity,
        approvalStatus: status,
        approvedBy: 'Siddhartha M',
        approvedAt: 'Just now',
      });
    }
  };

  const handleNavigateToScenarios = () => {
    navigate('/solutions/demand-intelligence/scenarios');
  };

  const handleNavigateToExceptions = () => {
    navigate('/solutions/demand-intelligence/risk-exceptions?category=Inventory');
  };

  const handleNavigateToForecast = () => {
    navigate('/solutions/demand-intelligence/forecast');
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
            <span className="text-slate-900 font-bold">Inventory Intelligence</span>
          </nav>

          {/* Page Header & Global Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Inventory Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Optimize inventory. Ensure service. Reduce working capital.
              </p>
            </div>

            {/* Filter Bar & Action */}
            <InventoryFilters
              options={filterOptions}
              selectedPlant={selectedPlant}
              selectedProduct={selectedProduct}
              selectedRegion={selectedRegion}
              selectedPeriod={selectedPeriod}
              onPlantChange={setSelectedPlant}
              onProductChange={setSelectedProduct}
              onRegionChange={setSelectedRegion}
              onPeriodChange={setSelectedPeriod}
              onViewScenarios={handleNavigateToScenarios}
            />
          </div>

          {/* Section 1: Executive Inventory KPI Strip (6 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {kpis.map((kpi) => (
              <InventoryKpiCard
                key={kpi.id}
                kpi={kpi}
                onClick={
                  kpi.id === 'kpi-at-risk-skus'
                    ? () => setSkuTab('At Risk')
                    : kpi.id === 'kpi-working-capital'
                    ? () => setIsSafetyStockOpen(true)
                    : undefined
                }
              />
            ))}
          </div>

          {/* Section 2: Main Inventory Outlook (Three Column: 50% / 28% / 22%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 50%: Inventory Position vs Target */}
            <div className="lg:col-span-6">
              <InventoryPositionChart
                data={positionSeries}
                period={positionGranularity}
                onPeriodChange={setPositionGranularity}
              />
            </div>

            {/* Center 28%: Inventory by Product Category */}
            <div className="lg:col-span-3">
              <InventoryByCategory
                categories={categoryShare}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Right 22%: Inventory by Plant */}
            <div className="lg:col-span-3">
              <InventoryByPlant
                plants={plantShare}
                selectedPlant={selectedPlant}
                onSelectPlant={setSelectedPlant}
                metric={plantMetric}
                onMetricChange={setPlantMetric}
              />
            </div>
          </div>

          {/* Section 3: Second Analytical Row (Three Column: 48% / 27% / 25%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 48%: Inventory Health by SKU */}
            <div className="lg:col-span-6">
              <InventoryHealthTable
                skus={skuList}
                activeTab={skuTab}
                onSelectTab={setSkuTab}
                onSelectSku={handleSelectSku}
                onViewAll={() => setSkuTab('All SKUs')}
              />
            </div>

            {/* Center 27%: Projected Inventory Coverage */}
            <div className="lg:col-span-3">
              <InventoryCoverageChart
                data={coverageData}
                horizon={coverageHorizon}
                onHorizonChange={setCoverageHorizon}
              />
            </div>

            {/* Right 25%: Inventory Risks & Exceptions */}
            <div className="lg:col-span-3">
              <InventoryRisks
                risks={riskList}
                onSelectRisk={handleSelectRisk}
                onViewAll={handleNavigateToExceptions}
              />
            </div>
          </div>

          {/* Section 4: Third Analytical Row (Three Column: 45% / 28% / 27%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 45%: Inventory Optimization Opportunities */}
            <div className="lg:col-span-5">
              <InventoryOpportunities
                opportunities={opportunities}
                onSelectOpportunity={handleSelectOpportunity}
              />
            </div>

            {/* Center 28%: Service Level Forecast */}
            <div className="lg:col-span-4">
              <ServiceLevelForecast data={serviceForecast} />
            </div>

            {/* Right 27%: AI Recommendation */}
            <div className="lg:col-span-3">
              <AIInventoryRecommendation
                recommendation={aiRecommendation}
                onViewOptimizationPlan={() => {
                  if (opportunities.length > 0) {
                    handleSelectOpportunity(opportunities[0]);
                  }
                }}
                onOpenSafetyStock={() => setIsSafetyStockOpen(true)}
                onOpenAbcXyz={() => setIsAbcXyzOpen(true)}
                onOpenNetwork={() => setIsNetworkOpen(true)}
              />
            </div>
          </div>

        </main>
      </div>

      {/* ── Drawers & Interactive Modals ── */}
      <InventorySkuDrawer
        sku={selectedSku}
        isOpen={isSkuDrawerOpen}
        onClose={() => setIsSkuDrawerOpen(false)}
        onViewForecast={handleNavigateToForecast}
        onViewRisk={handleNavigateToExceptions}
      />

      <InventoryRiskDrawer
        risk={selectedRisk}
        isOpen={isRiskDrawerOpen}
        onClose={() => setIsRiskDrawerOpen(false)}
        onOpenExceptionsCenter={handleNavigateToExceptions}
      />

      <OptimizationDecisionDrawer
        opportunity={selectedOpportunity}
        isOpen={isOpportunityDrawerOpen}
        onClose={() => setIsOpportunityDrawerOpen(false)}
        onUpdateApproval={handleUpdateApproval}
      />

      <SafetyStockControl
        isOpen={isSafetyStockOpen}
        onClose={() => setIsSafetyStockOpen(false)}
      />

      <AbcXyzDrawer
        segments={abcXyzSegments}
        isOpen={isAbcXyzOpen}
        onClose={() => setIsAbcXyzOpen(false)}
      />

      <NetworkDrawer
        nodes={networkNodes}
        isOpen={isNetworkOpen}
        onClose={() => setIsNetworkOpen(false)}
      />
    </div>
  );
};

export default InventoryIntelligencePage;
