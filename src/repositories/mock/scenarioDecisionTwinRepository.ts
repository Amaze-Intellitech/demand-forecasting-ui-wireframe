import {
  mockScenarioFilters,
  mockScenarioPresets,
  mockScenarioTrajectoryPoints,
  mockScenarioComparisonRows,
  mockScenarioDriversByScenario,
  mockRegionalScenarioImpacts,
  mockScenarioTradeoffs,
  mockWhatIfOptions,
  mockRecommendedScenario,
  mockRecentScenarios,
} from '../../data/scenarioDecisionTwinMock';
import {
  ScenarioFilterOptions,
  ScenarioPreset,
  ScenarioTrajectoryPoint,
  ScenarioComparisonRow,
  ScenarioDriverRow,
  ScenarioRegionalImpact,
  ScenarioTradeoff,
  WhatIfDriverOption,
  RecommendedScenarioData,
  RecentScenarioItem,
} from '../../types/domain/scenarioDecisionTwin';

export class ScenarioDecisionTwinRepository {
  private presets: ScenarioPreset[] = [...mockScenarioPresets];
  private comparisons: ScenarioComparisonRow[] = [...mockScenarioComparisonRows];

  getScenarioFilters(): ScenarioFilterOptions {
    return mockScenarioFilters;
  }

  getScenarioPresets(): ScenarioPreset[] {
    return this.presets;
  }

  getScenarioById(id: string): ScenarioPreset | undefined {
    return this.presets.find((p) => p.id === id);
  }

  getScenarioForecastSeries(granularity: 'Monthly' | 'Quarterly' = 'Monthly'): ScenarioTrajectoryPoint[] {
    if (granularity === 'Quarterly') {
      return [
        { month: 'Q1 2025', monthShort: 'Q1', baseCase: 92, highDemand: 102, commodityShock: 85, supplyDisruption: 89, pricingOptimization: 97, isForecast: false },
        { month: 'Q2 2025', monthShort: 'Q2', baseCase: 98, highDemand: 115, commodityShock: 89, supplyDisruption: 78, pricingOptimization: 108, isForecast: false },
        { month: 'Q3 2025', monthShort: 'Q3', baseCase: 115, highDemand: 150, commodityShock: 99, supplyDisruption: 65, pricingOptimization: 132, isForecast: true },
        { month: 'Q4 2025', monthShort: 'Q4', baseCase: 155, highDemand: 217, commodityShock: 117, supplyDisruption: 87, pricingOptimization: 177, isForecast: true },
      ];
    }
    return mockScenarioTrajectoryPoints;
  }

  getScenarioComparisonRows(): ScenarioComparisonRow[] {
    return this.comparisons;
  }

  getScenarioDrivers(scenarioId: string = 'scenario-base'): ScenarioDriverRow[] {
    return (
      mockScenarioDriversByScenario[scenarioId] ||
      mockScenarioDriversByScenario['scenario-base']
    );
  }

  getRegionalImpact(metric: string = 'Demand Change'): ScenarioRegionalImpact[] {
    if (metric === 'Inventory Need') {
      return mockRegionalScenarioImpacts.map((r) => ({
        ...r,
        demandChange: r.inventoryNeed,
      }));
    }
    if (metric === 'Service Risk') {
      return mockRegionalScenarioImpacts.map((r) => ({
        ...r,
        demandChange: r.serviceRisk,
      }));
    }
    return mockRegionalScenarioImpacts;
  }

  getScenarioTradeoffs(scenarioId: string = 'scenario-high-demand'): ScenarioTradeoff[] {
    const scenario = this.getScenarioById(scenarioId);
    if (!scenario) return mockScenarioTradeoffs;

    return [
      {
        dimension: 'Service Level',
        value: scenario.outcomes.serviceLevel,
        progress: Math.min(100, scenario.outcomes.serviceLevelNumeric),
        color: '#0284c7',
      },
      {
        dimension: 'Working Capital',
        value: scenario.outcomes.workingCapital,
        progress: Math.min(100, Math.round((scenario.outcomes.workingCapitalNumeric / 2.0) * 100)),
        color: '#0284c7',
      },
      {
        dimension: 'Cost to Serve',
        value: scenario.outcomes.costToServe,
        progress: Math.min(100, Math.round((parseFloat(scenario.outcomes.costToServe.replace(/[^\d.]/g, '')) / 2.5) * 100)),
        color: '#0284c7',
      },
      {
        dimension: 'CO₂ Emissions',
        value: scenario.outcomes.emissionsChange,
        progress: 60,
        color: '#10b981',
      },
    ];
  }

  getWhatIfOutcome(driver: string = 'Price Index', change: string = '-10%'): WhatIfDriverOption {
    const key = `${driver}:${change}`;
    if (mockWhatIfOptions[key]) {
      return mockWhatIfOptions[key];
    }
    // Fallback baseline dynamic estimate
    const isNegative = change.startsWith('-');
    return {
      driver,
      change,
      projectedDemand: isNegative ? '+6.2%' : '-5.4%',
      projectedDemandUnits: isNegative ? '(+79K units)' : '(-69K units)',
      demandDirection: isNegative ? 'up' : 'down',
      revenueImpact: isNegative ? '+4.8%' : '+1.2%',
      revenueImpactDollars: isNegative ? '(+102M)' : '(+26M)',
      revenueDirection: 'up',
      marginImpact: isNegative ? '-1.5%' : '+1.8%',
      marginPoints: isNegative ? '(-0.3 pts)' : '(+0.4 pts)',
      marginDirection: isNegative ? 'down' : 'up',
      serviceLevel: isNegative ? '96.4%' : '98.2%',
      servicePoints: isNegative ? '(-1.4 pts)' : '(+0.4 pts)',
      serviceDirection: isNegative ? 'down' : 'up',
    };
  }

  getRecommendedScenario(): RecommendedScenarioData {
    return mockRecommendedScenario;
  }

  getRecentScenarios(): RecentScenarioItem[] {
    return mockRecentScenarios;
  }

  createScenario(newScenario: Partial<ScenarioPreset>): ScenarioPreset {
    const id = `scenario-${Date.now()}`;
    const fullPreset: ScenarioPreset = {
      id,
      name: newScenario.name || 'New Custom Scenario',
      subtitle: newScenario.subtitle || 'Custom simulated scenario',
      description: newScenario.description || 'User-defined scenario assumptions and twin outputs.',
      status: 'Draft',
      iconName: 'settings',
      color: '#8b5cf6',
      assumptions: newScenario.assumptions || {
        demandChangePct: 5,
        priceChangePct: 0,
        rawMaterialChangePct: 0,
        supplyAvailabilityPct: 100,
        leadTimeChangeDays: 0,
        capacityChangePct: 100,
        tariffChangePct: 0,
        promotionChangePct: 0,
      },
      outcomes: newScenario.outcomes || {
        totalDemand: '1.34M units',
        totalDemandNumeric: 1.34,
        revenue: '$2.26B',
        revenueNumeric: 2.26,
        grossMargin: '18.9%',
        grossMarginNumeric: 18.9,
        serviceLevel: '97.2%',
        serviceLevelNumeric: 97.2,
        inventoryNeed: '884K units',
        inventoryNeedNumeric: 884,
        workingCapital: '$1.26B',
        workingCapitalNumeric: 1.26,
        costToServe: '$1.70B',
        emissionsChange: '-1.4%',
        varianceVsBase: '+4.7%',
        varianceVsBaseNumeric: 4.7,
      },
      createdAt: 'Just now',
    };

    this.presets.push(fullPreset);

    // Also add to comparison rows
    this.comparisons.push({
      scenarioId: fullPreset.id,
      scenarioName: fullPreset.name,
      totalDemand: fullPreset.outcomes.totalDemand.replace(' units', ''),
      revenue: fullPreset.outcomes.revenue,
      grossMargin: fullPreset.outcomes.grossMargin,
      marginPositive: fullPreset.outcomes.grossMarginNumeric >= 18.6,
      serviceLevel: fullPreset.outcomes.serviceLevel,
      servicePositive: fullPreset.outcomes.serviceLevelNumeric >= 96,
      inventoryNeed: fullPreset.outcomes.inventoryNeed.replace(' units', ''),
      workingCapital: fullPreset.outcomes.workingCapital,
      vsBase: fullPreset.outcomes.varianceVsBase,
      vsBaseType: fullPreset.outcomes.varianceVsBaseNumeric >= 0 ? 'positive' : 'negative',
    });

    return fullPreset;
  }

  duplicateScenario(id: string): ScenarioPreset | undefined {
    const existing = this.getScenarioById(id);
    if (!existing) return undefined;

    return this.createScenario({
      name: `${existing.name} — Copy`,
      subtitle: existing.subtitle,
      description: existing.description,
      assumptions: { ...existing.assumptions },
      outcomes: { ...existing.outcomes },
    });
  }

  deleteScenario(id: string): boolean {
    const initLen = this.presets.length;
    this.presets = this.presets.filter((p) => p.id !== id);
    this.comparisons = this.comparisons.filter((c) => c.scenarioId !== id);
    return this.presets.length < initLen;
  }

  applyScenarioToPlanning(id: string): boolean {
    this.presets = this.presets.map((p) => {
      if (p.id === id) {
        return { ...p, status: 'Applied to Planning' as const };
      }
      if (p.status === 'Applied to Planning') {
        return { ...p, status: 'Analyzed' as const };
      }
      return p;
    });
    return true;
  }
}

export const mockScenarioDecisionTwinRepository = new ScenarioDecisionTwinRepository();
