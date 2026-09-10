import React, { useState, useMemo } from 'react';
import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';

import { SupplyFilters } from '../components/demand/supply/SupplyFilters';
import { SupplyKpiStrip } from '../components/demand/supply/SupplyKpiStrip';
import { SupplyDemandCapacityChart } from '../components/demand/supply/SupplyDemandCapacityChart';
import { PlantCapacityMeter } from '../components/demand/supply/PlantCapacityMeter';
import { ProductSupplyPlan } from '../components/demand/supply/ProductSupplyPlan';
import { OptimizationOpportunities } from '../components/demand/supply/OptimizationOpportunities';
import { ConstraintsAlerts } from '../components/demand/supply/ConstraintsAlerts';
import { WhatIfSupplyAnalysis } from '../components/demand/supply/WhatIfSupplyAnalysis';
import { CostServiceTradeoff } from '../components/demand/supply/CostServiceTradeoff';
import { AIRecommendationCard } from '../components/demand/supply/AIRecommendationCard';

import { PlantCapacityDrawer } from '../components/demand/supply/PlantCapacityDrawer';
import { ProductSupplyDetailDrawer } from '../components/demand/supply/ProductSupplyDetailDrawer';
import { ConstraintDetailDrawer } from '../components/demand/supply/ConstraintDetailDrawer';
import { OptimizationOpportunityDrawer } from '../components/demand/supply/OptimizationOpportunityDrawer';
import { SupplyPlanApprovalDrawer } from '../components/demand/supply/SupplyPlanApprovalDrawer';
import { RunOptimizationModal } from '../components/demand/supply/RunOptimizationModal';

import { mockSupplyCapacityRepository } from '../repositories/mock/supplyCapacityRepository';
import {
  PlantCapacityItem,
  ProductSupplyPlanRow,
  SupplyConstraintAlert,
  OptimizationOpportunityItem,
  WhatIfSupplyParams,
  WhatIfSupplyResult,
} from '../types/domain/supplyCapacityOptimization';
import { CheckCircle2, X } from 'lucide-react';

export const SupplyCapacityOptimizationPage: React.FC = () => {
  // Topbar and Shell State
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');

  // Filter State
  const [selectedPlant, setSelectedPlant] = useState<string>('All Plants');
  const [selectedProduct, setSelectedProduct] = useState<string>('All Products');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('FY 2025');

  // Time series granularity
  const [granularity, setGranularity] = useState<'Monthly' | 'Quarterly'>('Monthly');

  // Drawers and Modals State
  const [selectedPlantItem, setSelectedPlantItem] = useState<PlantCapacityItem | null>(null);
  const [isPlantDrawerOpen, setIsPlantDrawerOpen] = useState<boolean>(false);

  const [selectedProductItem, setSelectedProductItem] = useState<ProductSupplyPlanRow | null>(null);
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState<boolean>(false);

  const [selectedAlertItem, setSelectedAlertItem] = useState<SupplyConstraintAlert | null>(null);
  const [isAlertDrawerOpen, setIsAlertDrawerOpen] = useState<boolean>(false);

  const [selectedOpportunityItem, setSelectedOpportunityItem] = useState<OptimizationOpportunityItem | null>(null);
  const [isOpportunityDrawerOpen, setIsOpportunityDrawerOpen] = useState<boolean>(false);

  const [isApprovalDrawerOpen, setIsApprovalDrawerOpen] = useState<boolean>(false);
  const [isRunModalOpen, setIsRunModalOpen] = useState<boolean>(false);

  // Success Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Repository Data
  const filterOptions = useMemo(
    () => mockSupplyCapacityRepository.getFilterOptions(),
    []
  );

  const kpiData = useMemo(
    () => mockSupplyCapacityRepository.getSupplyKpis(selectedPlant),
    [selectedPlant]
  );

  const timeSeriesData = useMemo(
    () => mockSupplyCapacityRepository.getSupplyDemandSeries(granularity),
    [granularity]
  );

  const plantList = useMemo(
    () => mockSupplyCapacityRepository.getPlantCapacityList(),
    []
  );

  const productList = useMemo(
    () => mockSupplyCapacityRepository.getProductSupplyPlan(selectedProduct),
    [selectedProduct]
  );

  const [opportunities, setOpportunities] = useState(() =>
    mockSupplyCapacityRepository.getOptimizationOpportunities()
  );

  const constraintsAlerts = useMemo(
    () => mockSupplyCapacityRepository.getSupplyConstraintsAlerts(),
    []
  );

  const tradeoffScenarios = useMemo(
    () => mockSupplyCapacityRepository.getTradeoffScenarios(),
    []
  );

  const aiRecommendation = useMemo(
    () => mockSupplyCapacityRepository.getAiRecommendation(),
    []
  );

  const [approvalState, setApprovalState] = useState(() =>
    mockSupplyCapacityRepository.getApprovalState()
  );

  // What-If Simulation Handler
  const handleSimulateWhatIf = (params: WhatIfSupplyParams): WhatIfSupplyResult => {
    return mockSupplyCapacityRepository.simulateWhatIf(params);
  };

  const initialWhatIf = useMemo(
    () =>
      mockSupplyCapacityRepository.simulateWhatIf({
        adjustment: 'Increase Capacity',
        plant: 'Columbus #04',
        changePercent: '+10%',
      }),
    []
  );

  // Drawer Open Handlers
  const handleSelectPlant = (plant: PlantCapacityItem) => {
    setSelectedPlantItem(plant);
    setIsPlantDrawerOpen(true);
  };

  const handleSelectProduct = (product: ProductSupplyPlanRow) => {
    setSelectedProductItem(product);
    setIsProductDrawerOpen(true);
  };

  const handleSelectAlert = (alert: SupplyConstraintAlert) => {
    setSelectedAlertItem(alert);
    setIsAlertDrawerOpen(true);
  };

  const handleSelectOpportunity = (opp: OptimizationOpportunityItem) => {
    setSelectedOpportunityItem(opp);
    setIsOpportunityDrawerOpen(true);
  };

  const handleApplyOpportunity = (id: string) => {
    const updated = mockSupplyCapacityRepository.updateOpportunityStatus(id, 'Approved');
    setOpportunities([...updated]);
    showToast('Optimization opportunity approved and integrated into S&OP draft.');
  };

  const handleApplyMitigation = (alertId: string) => {
    showToast(`Autonomous mitigation initiated for ${alertId}. Production rebalanced.`);
  };

  const handleApprovePlan = (notes: string) => {
    const updated = mockSupplyCapacityRepository.setApprovalState({
      status: 'Approved',
      approvedBy: 'Siddharth M (Executive VP Operations)',
      approvalTimestamp: new Date().toISOString(),
      notes,
    });
    setApprovalState(updated);
    showToast('S&OP Plan FY2025-Q3 successfully approved and published to enterprise ERP!');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-900 font-sans antialiased">
      {/* Sidebar navigation with activeTab = 'sourcing' */}
      <DemandIntelligenceSidebar activeTab="sourcing" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-[1600px] mx-auto space-y-5">
            {/* Header, Breadcrumb, Filters & Run CTA */}
            <SupplyFilters
              filterOptions={filterOptions}
              selectedPlant={selectedPlant}
              onPlantChange={setSelectedPlant}
              selectedProduct={selectedProduct}
              onProductChange={setSelectedProduct}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              onRunOptimization={() => setIsRunModalOpen(true)}
            />

            {/* Notification Toast Banner */}
            {toastMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{toastMessage}</span>
                </div>
                <button
                  onClick={() => setToastMessage(null)}
                  className="text-emerald-600 hover:text-emerald-800 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Executive KPI Strip (6 Cards) */}
            <SupplyKpiStrip
              kpis={kpiData}
              onKpiClick={(id) => {
                if (id === 'kpi-cap-constraints') {
                  setSelectedAlertItem(constraintsAlerts[0]);
                  setIsAlertDrawerOpen(true);
                } else if (id === 'kpi-cap-util') {
                  setSelectedPlantItem(plantList[0]);
                  setIsPlantDrawerOpen(true);
                }
              }}
            />

            {/* Analytical Row 1:
                - Supply vs. Demand & Capacity Chart (7 cols)
                - Capacity Utilization by Plant Meters (5 cols)
                Note: Per explicit prompt requirement, "Supply Network Overview" visualization card is omitted.
            */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 xl:col-span-7">
                <SupplyDemandCapacityChart
                  data={timeSeriesData}
                  granularity={granularity}
                  onGranularityChange={setGranularity}
                />
              </div>

              <div className="col-span-12 xl:col-span-5">
                <PlantCapacityMeter
                  plants={plantList}
                  onSelectPlant={handleSelectPlant}
                />
              </div>
            </div>

            {/* Analytical Row 2:
                - Supply & Capacity Plan by Product (4 cols)
                - Optimization Opportunities (4 cols)
                - Constraints & Alerts (4 cols)
            */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-4">
                <ProductSupplyPlan
                  products={productList}
                  onSelectProduct={handleSelectProduct}
                />
              </div>

              <div className="col-span-12 lg:col-span-4">
                <OptimizationOpportunities
                  opportunities={opportunities}
                  onSelectOpportunity={handleSelectOpportunity}
                />
              </div>

              <div className="col-span-12 lg:col-span-4">
                <ConstraintsAlerts
                  alerts={constraintsAlerts}
                  onSelectAlert={handleSelectAlert}
                  onViewAll={() => {
                    setSelectedAlertItem(constraintsAlerts[0]);
                    setIsAlertDrawerOpen(true);
                  }}
                />
              </div>
            </div>

            {/* Decision & What-If Row 3:
                - What-if Analysis (5 cols)
                - Cost vs. Service Trade-off (3 cols)
                - AI Recommendation (4 cols)
            */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-5">
                <WhatIfSupplyAnalysis
                  initialResult={initialWhatIf}
                  onSimulate={handleSimulateWhatIf}
                />
              </div>

              <div className="col-span-12 lg:col-span-3">
                <CostServiceTradeoff
                  scenarios={tradeoffScenarios}
                  onSelectScenario={(sc) => {
                    showToast(`Selected ${sc.name}: ${sc.tradeoffHighlight}`);
                  }}
                />
              </div>

              <div className="col-span-12 lg:col-span-4">
                <AIRecommendationCard
                  recommendation={aiRecommendation}
                  onApplyRecommendation={() => setIsApprovalDrawerOpen(true)}
                  onViewDetailedPlan={() => setIsApprovalDrawerOpen(true)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Drawers and Modals */}
      <PlantCapacityDrawer
        plant={selectedPlantItem}
        isOpen={isPlantDrawerOpen}
        onClose={() => setIsPlantDrawerOpen(false)}
        onSimulatePlant={(plantName) => {
          setSelectedPlant(plantName);
          showToast(`Simulated +10% capacity expansion on ${plantName}.`);
        }}
      />

      <ProductSupplyDetailDrawer
        product={selectedProductItem}
        isOpen={isProductDrawerOpen}
        onClose={() => setIsProductDrawerOpen(false)}
        onNavigateToPlant={(plantName) => {
          const plant = plantList.find((p) => p.name === plantName) || plantList[0];
          setSelectedPlantItem(plant);
          setIsPlantDrawerOpen(true);
        }}
      />

      <ConstraintDetailDrawer
        alert={selectedAlertItem}
        isOpen={isAlertDrawerOpen}
        onClose={() => setIsAlertDrawerOpen(false)}
        onApplyMitigation={handleApplyMitigation}
      />

      <OptimizationOpportunityDrawer
        opportunity={selectedOpportunityItem}
        isOpen={isOpportunityDrawerOpen}
        onClose={() => setIsOpportunityDrawerOpen(false)}
        onApplyOpportunity={handleApplyOpportunity}
      />

      <SupplyPlanApprovalDrawer
        isOpen={isApprovalDrawerOpen}
        onClose={() => setIsApprovalDrawerOpen(false)}
        approvalState={approvalState}
        onApprovePlan={handleApprovePlan}
      />

      <RunOptimizationModal
        isOpen={isRunModalOpen}
        onClose={() => setIsRunModalOpen(false)}
        onApplyResults={() => setIsApprovalDrawerOpen(true)}
      />
    </div>
  );
};
