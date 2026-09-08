import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { ScenarioPresetGrid } from '../components/demand/ScenarioPresetGrid';
import { ScenarioParametersCard } from '../components/demand/ScenarioParametersCard';
import { ScenarioForecastChart } from '../components/demand/ScenarioForecastChart';
import { ScenarioImpactCard } from '../components/demand/ScenarioImpactCard';
import { RevenueWaterfallChart } from '../components/demand/RevenueWaterfallChart';
import { ScenarioKeyInsightsCard } from '../components/demand/ScenarioKeyInsightsCard';
import { ScenarioRecommendedActionsCard } from '../components/demand/ScenarioRecommendedActionsCard';
import {
  SCENARIO_PRESETS,
  PRESET_OUTCOMES,
  ScenarioPresetId,
  ScenarioParametersState,
} from '../data/demandScenarioMock';

export const ScenarioStudioPage: React.FC = () => {
  // Date Range state
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');

  // Scenario Preset selection state
  const [selectedPreset, setSelectedPreset] = useState<ScenarioPresetId>('base-case');

  // Scenario Parameters state
  const [params, setParams] = useState<ScenarioParametersState>(
    SCENARIO_PRESETS[0].defaultParams
  );

  // Switch preset
  const handleSelectPreset = (id: ScenarioPresetId) => {
    setSelectedPreset(id);
    const targetPreset = SCENARIO_PRESETS.find((p) => p.id === id);
    if (targetPreset) {
      setParams(targetPreset.defaultParams);
    }
  };

  // User moves slider
  const handleChangeParam = (field: keyof ScenarioParametersState, val: number) => {
    setParams((prev) => ({
      ...prev,
      [field]: val,
    }));
    // Auto-switch to custom if user manipulates sliders manually
    if (selectedPreset !== 'custom') {
      setSelectedPreset('custom');
    }
  };

  // Reset to Base Case
  const handleReset = () => {
    setSelectedPreset('base-case');
    setParams(SCENARIO_PRESETS[0].defaultParams);
  };

  const currentOutcome = PRESET_OUTCOMES[selectedPreset] || PRESET_OUTCOMES['base-case'];

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-hidden select-none">
      
      {/* 1. Left Navigation Rail (Scenario Studio Active) */}
      <DemandIntelligenceSidebar activeTab="scenarios" />

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
            <span className="font-bold text-slate-900">
              Scenario Studio
            </span>
          </nav>

          {/* Page Header: Title & Subtitle */}
          <div className="pb-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Scenario Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Stress-test the demand plan before making the decision.
            </p>
          </div>

          {/* Scenario Preset Selector (5 Cards) */}
          <ScenarioPresetGrid
            selectedPreset={selectedPreset}
            onSelectPreset={handleSelectPreset}
          />

          {/* Scenario Parameters Slider Card */}
          <ScenarioParametersCard
            params={params}
            onChangeParam={handleChangeParam}
            onReset={handleReset}
          />

          {/* Main Scenario Comparison Row: Chart (68%) + Impact Table (32%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Demand Forecast Comparison Chart (Col Span 8) */}
            <div className="lg:col-span-8 flex flex-col">
              <ScenarioForecastChart
                selectedPreset={selectedPreset}
                params={params}
              />
            </div>

            {/* Right: Scenario Impact Summary & Outcome (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col">
              <ScenarioImpactCard outcome={currentOutcome} />
            </div>
          </div>

          {/* Second Analysis Row: Revenue Waterfall + Key Insights + Recommended Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
            {/* Revenue Impact (Waterfall) (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col">
              <RevenueWaterfallChart waterfall={currentOutcome.waterfall} />
            </div>

            {/* Key Insights (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col">
              <ScenarioKeyInsightsCard insights={currentOutcome.keyInsights} />
            </div>

            {/* Recommended Actions (Col Span 4) */}
            <div className="md:col-span-2 lg:col-span-4 flex flex-col">
              <ScenarioRecommendedActionsCard
                actions={currentOutcome.recommendedActions}
              />
            </div>
          </div>

          {/* Bottom Spacer */}
          <div className="h-4" />

        </main>
      </div>
    </div>
  );
};
