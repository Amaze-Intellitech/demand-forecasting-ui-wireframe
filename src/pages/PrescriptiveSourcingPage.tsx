import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { SourcingFilterBar } from '../components/demand/SourcingFilterBar';
import { SourcingKpiGrid } from '../components/demand/SourcingKpiGrid';
import { OptimizedSupplyAllocationChart } from '../components/demand/OptimizedSupplyAllocationChart';
import { CostComparisonWaterfallChart } from '../components/demand/CostComparisonWaterfallChart';
import { SupplierRecommendationsTable } from '../components/demand/SupplierRecommendationsTable';
import { SourcingAiRecommendationCard } from '../components/demand/SourcingAiRecommendationCard';
import { SourcingRiskAnalysisCard } from '../components/demand/SourcingRiskAnalysisCard';
import { SourcingNextStepsCard } from '../components/demand/SourcingNextStepsCard';
import { DEFAULT_SOURCING_FILTERS, SourcingFilterState } from '../data/demandSourcingMock';

export const PrescriptiveSourcingPage: React.FC = () => {
  // Topbar date range
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');

  // Filter state
  const [filters, setFilters] = useState<SourcingFilterState>(DEFAULT_SOURCING_FILTERS);

  // Simulated optimization run state
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationStatus, setOptimizationStatus] = useState<string | null>(null);

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setOptimizationStatus('Computing integer LP constraints & tier volumes...');
    setTimeout(() => {
      setOptimizationStatus('Converged: 12.4% Net Savings identified');
      setIsOptimizing(false);
      setTimeout(() => {
        setOptimizationStatus(null);
      }, 3500);
    }, 1400);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-hidden select-none">
      {/* 1. Left Navigation Rail (Prescriptive Sourcing Active) */}
      <DemandIntelligenceSidebar activeTab="sourcing" />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-7 lg:p-8 space-y-5">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/solutions" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              to="/solutions/demand-intelligence/overview"
              className="hover:text-slate-800 transition-colors"
            >
              Demand Intelligence
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">Prescriptive Sourcing</span>
          </nav>

          {/* Page Header: Title, Subtitle, and Run Optimization Action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Prescriptive Sourcing
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Optimize supplier strategy to meet demand at the best total cost.
              </p>
            </div>

            {/* Run Optimization Button */}
            <div className="flex items-center gap-2.5">
              {optimizationStatus && (
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{optimizationStatus}</span>
                </div>
              )}

              <button
                type="button"
                disabled={isOptimizing}
                onClick={handleRunOptimization}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-2xs transition-all cursor-pointer disabled:opacity-60"
              >
                {isOptimizing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0062d2]" />
                    <span>Optimizing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Run Optimization</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sourcing Filter Dropdowns Strip */}
          <SourcingFilterBar
            filters={filters}
            onChange={(field, val) =>
              setFilters((prev) => ({
                ...prev,
                [field]: val,
              }))
            }
          />

          {/* Sourcing Outcome KPIs Strip (5 Cards) */}
          <SourcingKpiGrid />

          {/* Primary Analytical Row: Supply Allocation Stacked Bar (60%) + Cost Waterfall (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Optimized Supply Allocation Stacked Chart */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
              <OptimizedSupplyAllocationChart />
            </div>

            {/* Right: Cost Comparison Waterfall Chart */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
              <CostComparisonWaterfallChart />
            </div>
          </div>

          {/* Secondary Analytical Row: Supplier Recommendations Table (60%) + AI Recommendation (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Supplier Recommendations Table */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
              <SupplierRecommendationsTable />
            </div>

            {/* Right: AI Recommendation Card */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
              <SourcingAiRecommendationCard />
            </div>
          </div>

          {/* Bottom Row: Risk Analysis (50%) + Next Steps (50%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Risk Analysis Card */}
            <div className="lg:col-span-6 flex flex-col">
              <SourcingRiskAnalysisCard />
            </div>

            {/* Right: Next Steps Card */}
            <div className="lg:col-span-6 flex flex-col">
              <SourcingNextStepsCard />
            </div>
          </div>

          {/* Bottom Spacer */}
          <div className="h-4" />
        </main>
      </div>
    </div>
  );
};
