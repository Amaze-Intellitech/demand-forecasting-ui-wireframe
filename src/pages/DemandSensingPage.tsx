import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemandFilters } from '../hooks/useDemandFilters';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';

import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';

import { SensingKpiCard } from '../components/demand/sensing/SensingKpiCard';
import { SensingFilters } from '../components/demand/sensing/SensingFilters';
import { NearTermSensingChart } from '../components/demand/sensing/NearTermSensingChart';
import { SignalSourcesCard } from '../components/demand/sensing/SignalSourcesCard';
import { DemandEventsCard } from '../components/demand/sensing/DemandEventsCard';
import { AdjustmentWaterfall } from '../components/demand/sensing/AdjustmentWaterfall';
import { SkuDemandChanges } from '../components/demand/sensing/SkuDemandChanges';
import { ChannelDemand } from '../components/demand/sensing/ChannelDemand';
import { LiveSignalFeed } from '../components/demand/sensing/LiveSignalFeed';
import { SensingAIInsight } from '../components/demand/sensing/SensingAIInsight';

import { SignalSourceDrawer } from '../components/demand/sensing/SignalSourceDrawer';
import { DemandEventDrawer } from '../components/demand/sensing/DemandEventDrawer';
import { SkuDetailDrawer } from '../components/demand/sensing/SkuDetailDrawer';
import { SensedAdjustmentModal } from '../components/demand/sensing/SensedAdjustmentModal';

import { mockDemandSensingRepository } from '../repositories/mock/demandSensingRepository';
import {
  SignalSource,
  DemandEvent,
  SkuDemandChange,
} from '../types/domain/demandSensing';

export const DemandSensingPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation & Horizon Filters
  const [activeTab, setActiveTab] = useState<string>('demand-sensing');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');

  const {
    plant: selectedPlant,
    product: selectedProduct,
    region: selectedRegion,
    setPlant: setSelectedPlant,
    setProduct: setSelectedProduct,
    setRegion: setSelectedRegion,
  } = useDemandFilters();
  const [selectedHorizon, setSelectedHorizon] = useState<string>('Last 8 Weeks');

  // Source filter for live feed
  const [activeSourceFilter, setActiveSourceFilter] = useState<string | undefined>(undefined);

  // Interactive drawers & modals state
  const [activeSource, setActiveSource] = useState<SignalSource | null>(null);
  const [isSourceDrawerOpen, setIsSourceDrawerOpen] = useState<boolean>(false);

  const [activeEvent, setActiveEvent] = useState<DemandEvent | null>(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState<boolean>(false);

  const [activeSku, setActiveSku] = useState<SkuDemandChange | null>(null);
  const [isSkuDrawerOpen, setIsSkuDrawerOpen] = useState<boolean>(false);

  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState<boolean>(false);
  const [isAdjustmentApplied, setIsAdjustmentApplied] = useState<boolean>(false);

  // Repository-driven data with contextual updates
  const filterOptions = useMemo(() => mockDemandSensingRepository.getFilterOptions(), []);

  const kpis = useMemo(() => {
    const baseKpis = mockDemandSensingRepository.getSensingKpis({
      plant: selectedPlant,
      product: selectedProduct,
      region: selectedRegion,
    });
    if (isAdjustmentApplied) {
      return baseKpis.map((k) => {
        if (k.id === 'kpi-uplift') {
          return { ...k, value: '+8.5%', subtext: 'Sensed adjustment active' };
        }
        return k;
      });
    }
    return baseKpis;
  }, [selectedPlant, selectedProduct, selectedRegion, isAdjustmentApplied]);

  const sensedSeries = useMemo(() => {
    return mockDemandSensingRepository.getSensedForecast(selectedHorizon);
  }, [selectedHorizon]);

  const signalSources = useMemo(() => {
    return mockDemandSensingRepository.getSignalSources('freshest');
  }, []);

  const demandEvents = useMemo(() => {
    return mockDemandSensingRepository.getDemandEvents('All');
  }, []);

  const shortTermAdjustmentData = useMemo(() => {
    return mockDemandSensingRepository.getShortTermAdjustment();
  }, []);

  const skuChanges = useMemo(() => {
    return mockDemandSensingRepository.getSkuDemandChanges();
  }, []);

  const channelDemand = useMemo(() => {
    return mockDemandSensingRepository.getChannelDemand();
  }, []);

  const liveSignalFeed = useMemo(() => {
    return mockDemandSensingRepository.getLiveSignalFeed(activeSourceFilter);
  }, [activeSourceFilter]);

  const aiInsight = useMemo(() => {
    return mockDemandSensingRepository.getAIInsight(selectedRegion, selectedProduct);
  }, [selectedRegion, selectedProduct]);

  const adjustmentRecommendation = useMemo(() => {
    return mockDemandSensingRepository.getAdjustmentRecommendation();
  }, []);

  // Handlers
  const handleSelectSource = (source: SignalSource) => {
    setActiveSource(source);
    setIsSourceDrawerOpen(true);
  };

  const handleSelectEvent = (event: DemandEvent) => {
    setActiveEvent(event);
    setIsEventDrawerOpen(true);
  };

  const handleSelectSku = (sku: SkuDemandChange) => {
    setActiveSku(sku);
    setIsSkuDrawerOpen(true);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f8fafc] text-slate-900 font-sans select-none overflow-x-hidden">
      {/* ── Left Navigation Rail ── */}
      <DemandIntelligenceSidebar
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* ── Main App Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Application Bar */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Main Workspace */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8 space-y-5 max-w-[1780px] w-full mx-auto">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/solutions" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Demand Intelligence</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Demand Sensing</span>
          </nav>

          {/* Page Header & Global Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Demand Sensing
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Detect changes early. Turn signals into action.
              </p>
            </div>

            {/* Filter Bar & Quick Action */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <SensingFilters
                options={filterOptions}
                selectedPlant={selectedPlant}
                selectedProduct={selectedProduct}
                selectedRegion={selectedRegion}
                selectedHorizon={selectedHorizon}
                onPlantChange={setSelectedPlant}
                onProductChange={setSelectedProduct}
                onRegionChange={setSelectedRegion}
                onHorizonChange={setSelectedHorizon}
              />

              {/* Apply Sensed Adjustment Trigger Button */}
              <button
                type="button"
                onClick={() => setIsAdjustmentModalOpen(true)}
                className={`h-9 px-3.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-2 focus:outline-none ${
                  isAdjustmentApplied
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                    : 'bg-[#0062d2] hover:bg-blue-700 text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{isAdjustmentApplied ? 'Sensed Active (+8.5%)' : 'Apply Adjustment'}</span>
              </button>
            </div>
          </div>

          {/* Section 1: Executive Sensing KPI Strip (6 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {kpis.map((kpi) => (
              <SensingKpiCard
                key={kpi.id}
                kpi={kpi}
                onClick={
                  kpi.id === 'kpi-events'
                    ? () => {
                        const topEvent = demandEvents[0];
                        if (topEvent) handleSelectEvent(topEvent);
                      }
                    : kpi.id === 'kpi-uplift'
                    ? () => setIsAdjustmentModalOpen(true)
                    : undefined
                }
              />
            ))}
          </div>

          {/* Section 2: Main Analytical Row (46% / 22% / 32% on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-[46fr_22fr_32fr] gap-5 items-stretch">
            {/* Column 1: Sensed Demand vs. Baseline Forecast (46%) */}
            <div className="lg:col-span-6 xl:col-auto flex flex-col min-w-0">
              <NearTermSensingChart
                data={sensedSeries}
                selectedHorizon={selectedHorizon}
                onHorizonChange={setSelectedHorizon}
              />
            </div>

            {/* Column 2: Signal Sources (22%) */}
            <div className="lg:col-span-3 xl:col-auto flex flex-col min-w-0">
              <SignalSourcesCard
                sources={signalSources}
                selectedSourceId={activeSource?.id}
                onSelectSource={handleSelectSource}
              />
            </div>

            {/* Column 3: Recent Demand Events (32%) */}
            <div className="lg:col-span-3 xl:col-auto flex flex-col min-w-0">
              <DemandEventsCard
                events={demandEvents}
                onSelectEvent={handleSelectEvent}
                onViewAll={() => navigate('/solutions/demand-intelligence/risk-exceptions')}
              />
            </div>
          </div>

          {/* Section 3: Second Analytical Row (40% / 33% / 27% on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-[40fr_33fr_27fr] gap-5 items-stretch">
            {/* Column 1: Short-Term Demand Adjustment Waterfall (40%) */}
            <div className="lg:col-span-5 xl:col-auto flex flex-col min-w-0">
              <AdjustmentWaterfall data={shortTermAdjustmentData} />
            </div>

            {/* Column 2: Top SKUs with Demand Change (33%) */}
            <div className="lg:col-span-4 xl:col-auto flex flex-col min-w-0">
              <SkuDemandChanges
                skus={skuChanges}
                onSelectSku={handleSelectSku}
                onViewAll={() => navigate('/solutions/demand-intelligence/forecast')}
              />
            </div>

            {/* Column 3: Demand by Channel Donut (27%) */}
            <div className="lg:col-span-3 xl:col-auto flex flex-col min-w-0">
              <ChannelDemand channels={channelDemand} />
            </div>
          </div>

          {/* Section 4: Live Signal Feed (Left ~68%) & AI Insight (Right ~32%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Column: Live Signal Feed (68%) */}
            <div className="lg:col-span-8 flex flex-col min-w-0">
              <LiveSignalFeed
                items={liveSignalFeed}
                activeSourceFilter={activeSourceFilter}
                onClearSourceFilter={() => setActiveSourceFilter(undefined)}
                onViewAll={() => navigate('/solutions/demand-intelligence/risk-exceptions')}
              />
            </div>

            {/* Right Column: AI Insight (32%) */}
            <div className="lg:col-span-4 flex flex-col min-w-0">
              <SensingAIInsight
                insight={aiInsight}
                onExplore={(route) => navigate(route)}
              />
            </div>
          </div>

        </main>
      </div>

      {/* ── Drawers & Modals ── */}
      <SignalSourceDrawer
        source={activeSource}
        isOpen={isSourceDrawerOpen}
        onClose={() => setIsSourceDrawerOpen(false)}
        onFilterBySource={(sourceName) => setActiveSourceFilter(sourceName)}
      />

      <DemandEventDrawer
        event={activeEvent}
        isOpen={isEventDrawerOpen}
        onClose={() => setIsEventDrawerOpen(false)}
        onNavigateToForecast={() => navigate('/solutions/demand-intelligence/forecast')}
        onNavigateToInventory={() => navigate('/solutions/demand-intelligence/inventory')}
      />

      <SkuDetailDrawer
        sku={activeSku}
        isOpen={isSkuDrawerOpen}
        onClose={() => setIsSkuDrawerOpen(false)}
        onNavigateToForecast={() => navigate('/solutions/demand-intelligence/forecast')}
        onNavigateToInventory={() => navigate('/solutions/demand-intelligence/inventory')}
      />

      <SensedAdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        recommendation={adjustmentRecommendation}
        isApplied={isAdjustmentApplied}
        onApply={() => setIsAdjustmentApplied(true)}
        onUndo={() => setIsAdjustmentApplied(false)}
      />

    </div>
  );
};

export default DemandSensingPage;
