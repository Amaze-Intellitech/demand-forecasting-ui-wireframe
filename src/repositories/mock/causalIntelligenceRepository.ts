import {
  CausalKpi,
  TopDemandDriver,
  CausalNetworkNode,
  CausalNetworkEdge,
  CausalImpactTimePoint,
  CausalInsightDriver,
  ScenarioSimulationRow,
  CausalKeyTakeaway,
  DriverBreakEvent,
  CausalAIInterpretation,
  CausalFilterOptions,
  CausalFilterParams,
} from '../../types/domain/causalIntelligence';
import {
  CAUSAL_KPIS_MOCK,
  TOP_DEMAND_DRIVERS_MOCK,
  CAUSAL_NETWORK_NODES_MOCK,
  CAUSAL_NETWORK_EDGES_MOCK,
  CAUSAL_IMPACT_OVER_TIME_MOCK,
  CAUSAL_INSIGHTS_TABLE_MOCK,
  SCENARIO_SIMULATIONS_BY_DRIVER,
  CAUSAL_KEY_TAKEAWAYS_MOCK,
  DRIVER_BREAK_EVENTS_MOCK,
  CAUSAL_AI_INTERPRETATION_MOCK,
  CAUSAL_FILTER_OPTIONS_MOCK,
} from '../../data/causalIntelligenceMock';

export class CausalIntelligenceRepository {
  public getCausalKpis(params?: CausalFilterParams): CausalKpi[] {
    if (!params || (params.plant === 'All Plants' && params.product === 'All Products' && params.region === 'All Regions')) {
      return [...CAUSAL_KPIS_MOCK];
    }

    return CAUSAL_KPIS_MOCK.map((kpi) => {
      if (params.product === 'HDPE Resin') {
        if (kpi.id === 'kpi-r2') return { ...kpi, value: '82.1%', subtext: '+8.2% vs. last model' };
        if (kpi.id === 'kpi-drivers') return { ...kpi, value: '9', subtext: 'significant causal factors' };
      }
      if (params.region === 'Asia Pacific') {
        if (kpi.id === 'kpi-r2') return { ...kpi, value: '79.6%', subtext: '+7.4% vs. last model' };
        if (kpi.id === 'kpi-positive') return { ...kpi, value: '8', subtext: 'increase demand' };
      }
      return kpi;
    });
  }

  public getTopDemandDrivers(): TopDemandDriver[] {
    return [...TOP_DEMAND_DRIVERS_MOCK];
  }

  public getCausalNetwork(): { nodes: CausalNetworkNode[]; edges: CausalNetworkEdge[] } {
    return {
      nodes: [...CAUSAL_NETWORK_NODES_MOCK],
      edges: [...CAUSAL_NETWORK_EDGES_MOCK],
    };
  }

  public getCausalImpactOverTime(_driver?: string): CausalImpactTimePoint[] {
    return [...CAUSAL_IMPACT_OVER_TIME_MOCK];
  }

  public getCausalInsightsTable(filter?: string): CausalInsightDriver[] {
    if (!filter || filter === 'All Drivers') {
      return [...CAUSAL_INSIGHTS_TABLE_MOCK];
    }
    return CAUSAL_INSIGHTS_TABLE_MOCK.filter((item) => item.driver.toLowerCase().includes(filter.toLowerCase()));
  }

  public getScenarioSimulation(driver: string = 'Price Index'): ScenarioSimulationRow[] {
    const list = SCENARIO_SIMULATIONS_BY_DRIVER[driver];
    if (list) return [...list];
    return [...SCENARIO_SIMULATIONS_BY_DRIVER['Price Index']];
  }

  public getKeyTakeaways(): CausalKeyTakeaway[] {
    return [...CAUSAL_KEY_TAKEAWAYS_MOCK];
  }

  public getDriverBreakEvents(): DriverBreakEvent[] {
    return [...DRIVER_BREAK_EVENTS_MOCK];
  }

  public getAIInterpretation(driver?: string): CausalAIInterpretation {
    if (driver === 'Promotions') {
      return {
        title: 'Promotions drive short-term demand expansion',
        narrative:
          'Promotional depth >20% yields a +18.7% modeled demand uplift, strongest in packaging accounts in APAC. Coordinate with plant scheduling to ensure inventory availability.',
        ctaScenarioText: 'Simulate Promotion Scenarios →',
        ctaScenarioRoute: '/solutions/demand-intelligence/scenarios',
        ctaPricingText: 'View Trade Spend Analysis →',
        ctaPricingRoute: '/solutions/demand-intelligence/scenarios',
      };
    }
    if (driver === 'Economic Activity') {
      return {
        title: 'Macroeconomic tailwinds supporting baseline growth',
        narrative:
          'Industrial manufacturing PMI and GDP growth account for 12.3% of demand variance. Monitor leading regional macro indices for early cycle inflection signals.',
        ctaScenarioText: 'Explore Macro Scenarios →',
        ctaScenarioRoute: '/solutions/demand-intelligence/scenarios',
        ctaPricingText: 'View Macro Indicators →',
        ctaPricingRoute: '/solutions/demand-intelligence/drivers',
      };
    }
    return { ...CAUSAL_AI_INTERPRETATION_MOCK };
  }

  public getFilterOptions(): CausalFilterOptions {
    return { ...CAUSAL_FILTER_OPTIONS_MOCK };
  }
}

export const mockCausalIntelligenceRepository = new CausalIntelligenceRepository();
