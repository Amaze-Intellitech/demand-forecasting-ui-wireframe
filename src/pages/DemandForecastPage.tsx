import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemandFilters } from '../hooks/useDemandFilters';
import { ChevronRight } from 'lucide-react';

import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';

import { ForecastKpiCard } from '../components/demand/forecast/ForecastKpiCard';
import { ForecastFilters } from '../components/demand/forecast/ForecastFilters';
import { ProbabilisticFanChart } from '../components/demand/forecast/ProbabilisticFanChart';
import { ModelTournamentCard } from '../components/demand/forecast/ModelTournamentCard';
import { ForecastInsightsCard } from '../components/demand/forecast/ForecastInsightsCard';
import { FvaWaterfallCard } from '../components/demand/forecast/FvaWaterfallCard';
import { ForecastByCategory } from '../components/demand/forecast/ForecastByCategory';
import { ForecastByRegion } from '../components/demand/forecast/ForecastByRegion';
import { TopSkuForecastChanges } from '../components/demand/forecast/TopSkuForecastChanges';
import { ForecastScenarioComparison } from '../components/demand/forecast/ForecastScenarioComparison';
import { AIRecommendationCard } from '../components/demand/forecast/AIRecommendationCard';

import { ModelDetailDrawer } from '../components/demand/forecast/ModelDetailDrawer';
import { SkuForecastDrawer } from '../components/demand/forecast/SkuForecastDrawer';
import { ExportForecastModal } from '../components/demand/forecast/ExportForecastModal';
import { ExpandableCard } from '../components/ui/ExpandableCard';

import { mockDemandForecastRepository } from '../repositories/mock/demandForecastRepository';
import {
  ForecastModelResult,
  ForecastSkuChange,
  ForecastInsight,
} from '../types/domain/demandForecast';

export const DemandForecastPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation & Date Range state
  const [activeTab, setActiveTab] = useState<string>('forecast');
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

  // Granularity state
  const [granularity, setGranularity] = useState<'Monthly' | 'Quarterly'>('Monthly');

  // Interactive Drawers & Modals state
  const [selectedModel, setSelectedModel] = useState<ForecastModelResult | null>(null);
  const [isModelDrawerOpen, setIsModelDrawerOpen] = useState<boolean>(false);
  const [activePlanningModelId, setActivePlanningModelId] = useState<string>('tft');

  const [selectedSku, setSelectedSku] = useState<ForecastSkuChange | null>(null);
  const [isSkuDrawerOpen, setIsSkuDrawerOpen] = useState<boolean>(false);

  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Repository-driven data with contextual filters
  const filterOptions = useMemo(() => mockDemandForecastRepository.getFilterOptions(), []);

  const kpis = useMemo(() => {
    return mockDemandForecastRepository.getForecastKpis({
      plant: selectedPlant,
      product: selectedProduct,
      region: selectedRegion,
      planningPeriod: selectedPeriod,
    });
  }, [selectedPlant, selectedProduct, selectedRegion, selectedPeriod]);

  const probabilisticData = useMemo(() => {
    return mockDemandForecastRepository.getProbabilisticForecast(granularity);
  }, [granularity]);

  const quantilesDec = useMemo(() => {
    return mockDemandForecastRepository.getForecastQuantilesDec();
  }, []);

  const modelTournament = useMemo(() => {
    return mockDemandForecastRepository.getModelTournament();
  }, []);

  const forecastInsights = useMemo(() => {
    return mockDemandForecastRepository.getForecastInsights();
  }, []);

  const fvaStages = useMemo(() => {
    return mockDemandForecastRepository.getFvaWaterfall();
  }, []);

  const categoryDistribution = useMemo(() => {
    return mockDemandForecastRepository.getCategoryDistribution();
  }, []);

  const regionalGrowth = useMemo(() => {
    return mockDemandForecastRepository.getRegionalGrowth();
  }, []);

  const topSkuChanges = useMemo(() => {
    return mockDemandForecastRepository.getTopSkuChanges();
  }, []);

  const scenarioComparison = useMemo(() => {
    return mockDemandForecastRepository.getScenarioComparison();
  }, []);

  const aiRecommendation = useMemo(() => {
    return mockDemandForecastRepository.getAIRecommendation(selectedRegion, selectedProduct);
  }, [selectedRegion, selectedProduct]);

  // Handlers
  const handleSelectModel = (model: ForecastModelResult) => {
    setSelectedModel(model);
    setIsModelDrawerOpen(true);
  };

  const handleSelectSku = (sku: ForecastSkuChange) => {
    setSelectedSku(sku);
    setIsSkuDrawerOpen(true);
  };

  const handleSelectInsight = (insight: ForecastInsight) => {
    if (insight.route) {
      navigate(insight.route);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f8fafc] text-slate-900 font-sans select-none overflow-x-hidden">
      {/* ── 1. Left Navigation Rail ── */}
      <DemandIntelligenceSidebar
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* ── 2. Main Content Workspace ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8 space-y-5 max-w-[1780px] w-full mx-auto">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/solutions" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Demand Forecasting</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Forecast Intelligence</span>
          </nav>

          {/* Page Header & Global Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Forecast Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Smarter forecasts. Higher confidence. Greater value.
              </p>
            </div>

            {/* Filter Bar & Export Action */}
            <ForecastFilters
              options={filterOptions}
              selectedPlant={selectedPlant}
              selectedProduct={selectedProduct}
              selectedRegion={selectedRegion}
              selectedPeriod={selectedPeriod}
              onPlantChange={setSelectedPlant}
              onProductChange={setSelectedProduct}
              onRegionChange={setSelectedRegion}
              onPeriodChange={setSelectedPeriod}
              onExportForecast={() => setIsExportModalOpen(true)}
            />
          </div>

          {/* Section 1: Forecast KPI Strip (6 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {kpis.map((kpi) => (
              <ForecastKpiCard
                key={kpi.id}
                kpi={kpi}
                onClick={
                  kpi.id === 'kpi-champion'
                    ? () => {
                        const tft = modelTournament.find((m) => m.modelId === 'tft');
                        if (tft) handleSelectModel(tft);
                      }
                    : kpi.id === 'kpi-uncertainty'
                    ? () => navigate('/solutions/demand-intelligence/inventory')
                    : undefined
                }
              />
            ))}
          </div>

          {/* Section 2: Primary Forecast Grid (48% / 30% / 22% Proportions) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-[48fr_30fr_22fr] gap-5 items-stretch">
            {/* Column 1: Probabilistic Demand Forecast (48%) */}
            <div className="lg:col-span-12 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Probabilistic Demand Forecast"
                subtitle="P10, P50, and P90 confidence intervals across forward horizon"
                className="h-full"
              >
                <ProbabilisticFanChart
                  data={probabilisticData}
                  quantiles={quantilesDec}
                  granularity={granularity}
                  onGranularityChange={setGranularity}
                />
              </ExpandableCard>
            </div>

            {/* Column 2: Model Performance Tournament (30%) */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Model Performance Tournament"
                subtitle="Continuous algorithmic bake-off and accuracy benchmarking"
                className="h-full"
              >
                <ModelTournamentCard
                  models={modelTournament}
                  selectedModelId={selectedModel?.modelId}
                  onSelectModel={handleSelectModel}
                  onViewComparison={() => {
                    const champion = modelTournament.find((m) => m.status === 'Champion') || modelTournament[0];
                    handleSelectModel(champion);
                  }}
                />
              </ExpandableCard>
            </div>

            {/* Column 3: Key Forecast Insights (22%) */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Key Forecast Insights"
                subtitle="Automated drivers, risks, and anomaly detections"
                className="h-full"
              >
                <ForecastInsightsCard
                  insights={forecastInsights}
                  onSelectInsight={handleSelectInsight}
                />
              </ExpandableCard>
            </div>
          </div>

          {/* Section 3: Forecast Analysis Grid (Waterfall / Donut / Region) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-3 gap-5 items-stretch">
            {/* Column 1: Forecast Value Added (FVA) Waterfall */}
            <div className="lg:col-span-12 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Forecast Value Added (FVA) Waterfall"
                subtitle="Stage-by-stage accuracy contribution and human touch impact"
                className="h-full"
              >
                <FvaWaterfallCard stages={fvaStages} />
              </ExpandableCard>
            </div>

            {/* Column 2: Forecast by Product Category */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Forecast by Product Category"
                subtitle="Volume distribution across active product portfolios"
                className="h-full"
              >
                <ForecastByCategory
                  categories={categoryDistribution}
                  onSelectCategory={(cat) => setSelectedProduct(cat.name)}
                />
              </ExpandableCard>
            </div>

            {/* Column 3: Forecast by Region */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Forecast by Region"
                subtitle="Geographic demand distribution and projected growth"
                className="h-full"
              >
                <ForecastByRegion
                  regions={regionalGrowth}
                  onSelectRegion={(reg) => setSelectedRegion(reg.region)}
                />
              </ExpandableCard>
            </div>
          </div>

          {/* Section 4: Forecast Details Grid (SKU Changes / Scenarios / AI Recommendation) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-3 gap-5 items-stretch">
            {/* Column 1: Top SKUs by Forecast Change */}
            <div className="lg:col-span-12 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Top SKUs by Forecast Change"
                subtitle="Items with highest volume variance vs. baseline plan"
                className="h-full"
              >
                <TopSkuForecastChanges
                  skus={topSkuChanges}
                  onSelectSku={handleSelectSku}
                  onViewAll={() => {
                    const firstSku = topSkuChanges[0];
                    if (firstSku) handleSelectSku(firstSku);
                  }}
                />
              </ExpandableCard>
            </div>

            {/* Column 2: Forecast Scenario Comparison */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Forecast Scenario Comparison"
                subtitle="Base vs. upside, downside, and supply-constrained scenarios"
                className="h-full"
              >
                <ForecastScenarioComparison
                  scenarios={scenarioComparison}
                  onSelectScenario={() => navigate('/solutions/demand-intelligence/scenarios')}
                  onViewAll={() => navigate('/solutions/demand-intelligence/scenarios')}
                />
              </ExpandableCard>
            </div>

            {/* Column 3: AI Recommendation Card */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <ExpandableCard
                title="Autonomous AI Recommendation"
                subtitle="High-confidence consensus adjustment advice"
                className="h-full"
              >
                <AIRecommendationCard
                  recommendation={aiRecommendation}
                  onExplore={(route) => navigate(route)}
                />
              </ExpandableCard>
            </div>
          </div>

        </main>
      </div>

      {/* ── Drawers & Modals ── */}
      <ModelDetailDrawer
        model={selectedModel}
        isOpen={isModelDrawerOpen}
        onClose={() => setIsModelDrawerOpen(false)}
        activePlanningModelId={activePlanningModelId}
        onSetPlanningModel={(modelId) => setActivePlanningModelId(modelId)}
      />

      <SkuForecastDrawer
        sku={selectedSku}
        isOpen={isSkuDrawerOpen}
        onClose={() => setIsSkuDrawerOpen(false)}
        onNavigateToInventory={() => navigate('/solutions/demand-intelligence/inventory')}
        onNavigateToSensing={() => navigate('/solutions/demand-intelligence/demand-sensing')}
      />

      <ExportForecastModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        planningPeriod={selectedPeriod}
      />

    </div>
  );
};

export default DemandForecastPage;
