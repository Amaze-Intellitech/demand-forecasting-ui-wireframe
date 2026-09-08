import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, RotateCcw } from 'lucide-react';
import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { HierarchyFilters } from '../components/demand/HierarchyFilters';
import { SignalSummaryGrid } from '../components/demand/SignalSummaryGrid';
import { HistoricalDemandChart } from '../components/demand/HistoricalDemandChart';
import { DemandDriversChart } from '../components/demand/DemandDriversChart';
import { SeasonalityHeatmap } from '../components/demand/SeasonalityHeatmap';
import { StructuralChangesCard } from '../components/demand/StructuralChangesCard';
import { SegmentDonutChart } from '../components/demand/SegmentDonutChart';
import { BusinessInterpretationCard } from '../components/demand/BusinessInterpretationCard';
import {
  DEFAULT_HIERARCHY,
  HierarchyState,
} from '../data/demandSignalsMock';

export const DemandSignalsPage: React.FC = () => {
  // Navigation & View state
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2020 – Dec 2025');

  // Business Hierarchy Filter State
  const [hierarchy, setHierarchy] = useState<HierarchyState>(DEFAULT_HIERARCHY);

  const handleFilterChange = (field: string, value: string) => {
    setHierarchy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setHierarchy(DEFAULT_HIERARCHY);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-hidden select-none">
      
      {/* 1. Left Persistent Navigation Sidebar */}
      <DemandIntelligenceSidebar activeTab="signals" />

      {/* 2. Main Application Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-7 lg:p-8 space-y-6">
          
          {/* Breadcrumbs Row */}
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
            <span className="font-bold text-slate-900">
              Demand Signals
            </span>
          </nav>

          {/* Page Header: Title, Subtitle, Reset Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Demand Signals
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Understand what is changing demand — and why.
              </p>
            </div>

            {/* Reset Filters Action Button */}
            <div className="flex-shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 active:bg-slate-100 text-xs font-semibold text-slate-700 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Business Hierarchy Filter Row (5 Aligned Controls) */}
          <HierarchyFilters
            enterprise={hierarchy.enterprise}
            division={hierarchy.division}
            plant={hierarchy.plant}
            category={hierarchy.category}
            sku={hierarchy.sku}
            onChange={handleFilterChange}
          />

          {/* Signal Summary Strip (5 Executive Behavior Cards) */}
          <SignalSummaryGrid />

          {/* Main Analytical Row: Historical Demand (68%) + Top Demand Drivers (32%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Historical Demand Trend (Col Span 8) */}
            <div className="lg:col-span-8 flex flex-col">
              <HistoricalDemandChart />
            </div>

            {/* Right: Top Demand Drivers (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col">
              <DemandDriversChart />
            </div>
          </div>

          {/* Second Analytical Row: Seasonality (42%) + Structural Changes (33%) + Segment Mix (25%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
            {/* 10-Year Demand Seasonality Heatmap (Col Span 5) */}
            <div className="lg:col-span-5 flex flex-col">
              <SeasonalityHeatmap />
            </div>

            {/* Structural Changes Timeline (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col">
              <StructuralChangesCard />
            </div>

            {/* Demand by Segment Donut Chart (Col Span 3) */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col">
              <SegmentDonutChart />
            </div>
          </div>

          {/* Full-Width Bottom Business Interpretation Panel */}
          <BusinessInterpretationCard />

          {/* Subtle Bottom Spacer */}
          <div className="h-4" />

        </main>
      </div>
    </div>
  );
};
