import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { ForecastFilterBar } from '../components/demand/ForecastFilterBar';
import { ForecastKpiGrid } from '../components/demand/ForecastKpiGrid';
import { HistoricalForecastChart } from '../components/demand/HistoricalForecastChart';
import { ForecastModelPanel } from '../components/demand/ForecastModelPanel';
import { ForecastAiInsightCard } from '../components/demand/ForecastAiInsightCard';
import { QuarterlyForecastChart } from '../components/demand/QuarterlyForecastChart';
import { MonthlyForecastTable } from '../components/demand/MonthlyForecastTable';
import { KeyTakeawaysCard } from '../components/demand/KeyTakeawaysCard';
import {
  DEFAULT_FORECAST_FILTERS,
  ForecastFilterState,
} from '../data/demandForecastMock';

export const DemandForecastPage: React.FC = () => {
  // Date Range state matching image: "Jan 2025 – Dec 2026"
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');

  // Forecast Filters state
  const [filters, setFilters] = useState<ForecastFilterState>(DEFAULT_FORECAST_FILTERS);

  const handleFilterChange = (field: keyof ForecastFilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-hidden select-none">
      
      {/* 1. Left Navigation Rail (Demand Forecast Active) */}
      <DemandIntelligenceSidebar activeTab="forecast" />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-7 lg:p-8 space-y-5">
          
          {/* Breadcrumb Row */}
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
              Demand Forecast
            </span>
          </nav>

          {/* Page Header: Title & Subtitle */}
          <div className="pb-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Demand Forecast
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              See what demand is likely to look like before it happens.
            </p>
          </div>

          {/* Forecast Filter Bar (5 Compact Dropdowns) */}
          <ForecastFilterBar
            filters={filters}
            onChange={handleFilterChange}
          />

          {/* Forecast KPI Grid (5 Health & Quality Cards) */}
          <ForecastKpiGrid />

          {/* Main Hero Row: Historical & Forecast (68%) + Model & AI Insight (32%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Historical Demand and Forecast Chart (Col Span 8) */}
            <div className="lg:col-span-8 flex flex-col">
              <HistoricalForecastChart />
            </div>

            {/* Right: Forecast Model Panel + AI Insight Panel (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <ForecastModelPanel />
              <ForecastAiInsightCard />
            </div>
          </div>

          {/* Second Planning Row: Forecast by Quarter + Monthly Table + Key Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
            {/* Forecast by Quarter (Col Span 5) */}
            <div className="lg:col-span-5 flex flex-col">
              <QuarterlyForecastChart />
            </div>

            {/* Monthly Forecast Table (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col">
              <MonthlyForecastTable />
            </div>

            {/* Key Takeaways & CTA (Col Span 3) */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col">
              <KeyTakeawaysCard />
            </div>
          </div>

          {/* Bottom Spacer */}
          <div className="h-4" />

        </main>
      </div>
    </div>
  );
};
