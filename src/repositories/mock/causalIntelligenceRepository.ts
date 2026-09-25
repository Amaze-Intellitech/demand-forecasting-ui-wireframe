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
import { parameterMetadataService } from '../../services/parameterMetadataService';

export class CausalIntelligenceRepository {
  public getCausalKpis(
    params?: CausalFilterParams,
    dependentVar: string = 'demand_sales',
    independentVar: string = 'all'
  ): CausalKpi[] {
    const isInventoryTarget = dependentVar.includes('stock') || dependentVar.includes('inventory');

    if (isInventoryTarget) {
      return [
        {
          id: 'kpi-drivers',
          label: 'Key Inventory Drivers',
          value: '8',
          subtext: 'significant causal factors',
          direction: 'neutral',
          isPositive: true,
          iconType: 'drivers',
        },
        {
          id: 'kpi-r2',
          label: 'Explained Variance (R²)',
          value: '81.2%',
          subtext: '+4.5% vs. prior model',
          direction: 'up',
          isPositive: true,
          iconType: 'variance',
        },
        {
          id: 'kpi-positive',
          label: 'Buffer Building Drivers',
          value: '5',
          subtext: 'increase inventory',
          direction: 'up',
          isPositive: true,
          iconType: 'positive',
        },
        {
          id: 'kpi-negative',
          label: 'Depletion Drivers',
          value: '3',
          subtext: 'deplete inventory',
          direction: 'down',
          isPositive: true,
          iconType: 'negative',
        },
        {
          id: 'kpi-structural',
          label: 'Lead Time Shifts',
          value: '2',
          subtext: 'detected in supply lanes',
          direction: 'neutral',
          isPositive: true,
          iconType: 'structural',
        },
        {
          id: 'kpi-confidence',
          label: 'Causal Confidence',
          value: '91%',
          subtext: 'High confidence',
          direction: 'up',
          isPositive: true,
          iconType: 'confidence',
        },
      ];
    }

    if (independentVar !== 'all') {
      const driverParam = parameterMetadataService.getParameterById(independentVar);
      const driverName = driverParam ? driverParam.name : independentVar;
      return [
        {
          id: 'kpi-drivers',
          label: 'Active Driver Pair',
          value: '1 vs 1',
          subtext: `${driverName.slice(0, 16)}`,
          direction: 'neutral',
          isPositive: true,
          iconType: 'drivers',
        },
        {
          id: 'kpi-r2',
          label: 'Pairwise R² Contribution',
          value: driverName.includes('Price') ? '28.4%' : driverName.includes('Promo') ? '18.7%' : '12.3%',
          subtext: 'isolated bivariate fit',
          direction: 'up',
          isPositive: true,
          iconType: 'variance',
        },
        {
          id: 'kpi-positive',
          label: 'Impact Direction',
          value: driverName.includes('Competitor') || driverName.includes('Raw') ? 'Negative (-)' : 'Positive (+)',
          subtext: 'statistically significant',
          direction: driverName.includes('Competitor') || driverName.includes('Raw') ? 'down' : 'up',
          isPositive: !(driverName.includes('Competitor') || driverName.includes('Raw')),
          iconType: 'positive',
        },
        {
          id: 'kpi-negative',
          label: 'Causal Elasticity',
          value: driverName.includes('Price') ? '-0.80' : driverName.includes('Promo') ? '+0.64' : '+0.42',
          subtext: 'percent volume responsiveness',
          direction: 'neutral',
          isPositive: true,
          iconType: 'negative',
        },
        {
          id: 'kpi-structural',
          label: 'Structural Breaks',
          value: '1',
          subtext: 'shift detected in cycle',
          direction: 'neutral',
          isPositive: true,
          iconType: 'structural',
        },
        {
          id: 'kpi-confidence',
          label: 'Statistical Confidence',
          value: '92%',
          subtext: 'p-value < 0.001',
          direction: 'up',
          isPositive: true,
          iconType: 'confidence',
        },
      ];
    }

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

  public getTopDemandDrivers(
    dependentVar: string = 'demand_sales',
    independentVar: string = 'all'
  ): TopDemandDriver[] {
    const isInventory = dependentVar.includes('stock') || dependentVar.includes('inventory');

    if (isInventory) {
      return [
        {
          id: 'driver-lead-time',
          name: 'Supplier Replenishment Lead Time',
          category: 'Operational',
          impact: '+32.4%',
          impactNum: 32.4,
          isNegative: false,
          description: 'Longer vendor lead times require larger pipeline stock and dock safety buffers.',
          sensitivity: 'High',
          confidence: 94,
          currentValue: '21 Days Lead Time',
          historicalRange: '14 – 35 Days',
          recommendation: 'Negotiate vendor-managed inventory agreements with key monomer suppliers.',
        },
        {
          id: 'driver-plant-oee',
          name: 'Plant Production Yield / OEE',
          category: 'Operational',
          impact: '+24.1%',
          impactNum: 24.1,
          isNegative: false,
          description: 'High extrusion line output directly replenishes finished goods storage silos.',
          sensitivity: 'High',
          confidence: 91,
          currentValue: '84.6% OEE',
          historicalRange: '76% – 88%',
          recommendation: 'Balance line speed with scheduled maintenance to avoid batch surges.',
        },
        {
          id: 'driver-sales-draw',
          name: 'Customer Order Draw (Demand)',
          category: 'Commercial',
          impact: '-18.6%',
          impactNum: -18.6,
          isNegative: true,
          description: 'Customer order shipments directly deplete on-hand finished goods inventory.',
          sensitivity: 'High',
          confidence: 96,
          currentValue: '1.28M Units/Mo',
          historicalRange: '0.9M – 1.4M',
          recommendation: 'Calibrate inventory reorder thresholds to sensed demand shifts.',
        },
        {
          id: 'driver-safety-policy',
          name: 'Safety Stock Policy Target',
          category: 'Operational',
          impact: '+14.2%',
          impactNum: 14.2,
          isNegative: false,
          description: 'Target days-of-supply inventory policy set across regional distribution centers.',
          sensitivity: 'Medium',
          confidence: 88,
          currentValue: '18 Days Supply',
          historicalRange: '14 – 24 Days',
          recommendation: 'Dynamically reduce safety stock in hubs with high forecast accuracy.',
        },
        {
          id: 'driver-raw-price',
          name: 'Feedstock Supply Allocation',
          category: 'Market',
          impact: '-8.1%',
          impactNum: -8.1,
          isNegative: true,
          description: 'Raw material procurement constraints capping production batch sizes.',
          sensitivity: 'Medium',
          confidence: 82,
          currentValue: '$1,120/MT',
          historicalRange: '$920 – $1,340/MT',
          recommendation: 'Hedge feedstock supply through quarterly forward contracts.',
        },
      ];
    }

    const eligibleIndep = parameterMetadataService.getEligibleIndependentVariables();

    // Map each eligible ingested driver to a TopDemandDriver card
    const activeDrivers: TopDemandDriver[] = eligibleIndep.map((param, index) => {
      const matched = TOP_DEMAND_DRIVERS_MOCK.find(
        (m) =>
          m.id === param.id ||
          (param.id.includes('price') && m.id === 'driver-price') ||
          (param.id.includes('promo') && m.id === 'driver-promo') ||
          (param.id.includes('pmi') && m.id === 'driver-gdp') ||
          (param.id.includes('season') && m.id === 'driver-seasonality') ||
          (param.id.includes('competitor') && m.id === 'driver-competitor') ||
          (param.id.includes('temp') && m.id === 'driver-weather')
      );

      if (matched && index < 6) {
        return {
          ...matched,
          id: param.id,
          name: param.name,
        };
      }

      const baseImpact = Number(Math.max(5.2, 28.0 - index * 2.3).toFixed(1));
      const isNegative =
        param.id.includes('discount') ||
        param.id.includes('lead') ||
        param.id.includes('competitor') ||
        param.id.includes('defect');

      let cat: 'Economic' | 'Commercial' | 'Operational' | 'Market' | 'External' | 'Seasonal' = 'Operational';
      const pCat = param.category || '';
      if (pCat.includes('Commercial') || pCat.includes('Pricing') || pCat.includes('Promotions')) {
        cat = 'Commercial';
      } else if (pCat.includes('Market') || pCat.includes('Substitution')) {
        cat = 'Market';
      } else if (pCat.includes('Seasonality') || pCat.includes('Calendar')) {
        cat = 'Seasonal';
      } else if (pCat.includes('Weather') || pCat.includes('External')) {
        cat = 'External';
      } else if (pCat.includes('Economic') || pCat.includes('Macro')) {
        cat = 'Economic';
      }

      return {
        id: param.id,
        name: param.name,
        category: cat,
        impact: `${isNegative ? '-' : '+'}${baseImpact}%`,
        impactNum: isNegative ? -baseImpact : baseImpact,
        isNegative,
        description: param.description || `Verified causal driver from ingested enterprise data pipeline.`,
        sensitivity: index < 3 ? 'High' : index < 7 ? 'Medium' : 'Low',
        confidence: Math.max(76, 94 - index * 2),
        currentValue: `Ingested ${param.unit || 'Factor'}`,
        historicalRange: `Historical Sensor Range`,
        recommendation: `Monitor ${param.name} elasticity in weekly operations reviews.`,
      };
    });

    if (independentVar !== 'all') {
      const selected = activeDrivers.find(
        (d) => d.id === independentVar || d.name.toLowerCase().includes(independentVar.toLowerCase())
      );
      if (selected) {
        return [
          selected,
          ...activeDrivers.filter((d) => d.id !== selected.id),
        ];
      }
    }

    return activeDrivers.length > 0 ? activeDrivers : [...TOP_DEMAND_DRIVERS_MOCK];
  }

  public getCausalNetwork(): { nodes: CausalNetworkNode[]; edges: CausalNetworkEdge[] } {
    return {
      nodes: [...CAUSAL_NETWORK_NODES_MOCK],
      edges: [...CAUSAL_NETWORK_EDGES_MOCK],
    };
  }

  public getCausalImpactOverTime(driver: string = 'Price Index', _dependentVar: string = 'demand_sales'): CausalImpactTimePoint[] {
    const lower = driver.toLowerCase();

    if (lower.includes('promo')) {
      return [
        { period: 'Jan', actual: 70,  predictedWithDriver: 74,  predictedWithoutDriver: 70,  isForecast: false },
        { period: 'Feb', actual: 78,  predictedWithDriver: 82,  predictedWithoutDriver: 76,  isForecast: false },
        { period: 'Mar', actual: 82,  predictedWithDriver: 86,  predictedWithoutDriver: 78,  isForecast: false },
        { period: 'Apr', actual: 80,  predictedWithDriver: 84,  predictedWithoutDriver: 78,  isForecast: false },
        { period: 'May', actual: 86,  predictedWithDriver: 92,  predictedWithoutDriver: 81,  isForecast: false },
        { period: 'Jun', actual: 96,  predictedWithDriver: 106, predictedWithoutDriver: 85,  isForecast: false },
        { period: 'Jul', actual: 104, predictedWithDriver: 118, predictedWithoutDriver: 88,  isForecast: false },
        { period: 'Aug', actual: 112, predictedWithDriver: 132, predictedWithoutDriver: 92,  isForecast: false },
        { period: 'Sep', actual: 118, predictedWithDriver: 146, predictedWithoutDriver: 96,  isForecast: true  },
        { period: 'Oct', actual: 126, predictedWithDriver: 158, predictedWithoutDriver: 100, isForecast: true  },
        { period: 'Nov', actual: 134, predictedWithDriver: 164, predictedWithoutDriver: 102, isForecast: true  },
        { period: 'Dec', actual: 142, predictedWithDriver: 172, predictedWithoutDriver: 104, isForecast: true  },
      ];
    }

    if (lower.includes('gdp') || lower.includes('economic') || lower.includes('pmi')) {
      return [
        { period: 'Jan', actual: 70,  predictedWithDriver: 71,  predictedWithoutDriver: 70,  isForecast: false },
        { period: 'Feb', actual: 78,  predictedWithDriver: 79,  predictedWithoutDriver: 76,  isForecast: false },
        { period: 'Mar', actual: 82,  predictedWithDriver: 83,  predictedWithoutDriver: 79,  isForecast: false },
        { period: 'Apr', actual: 80,  predictedWithDriver: 81,  predictedWithoutDriver: 78,  isForecast: false },
        { period: 'May', actual: 86,  predictedWithDriver: 88,  predictedWithoutDriver: 82,  isForecast: false },
        { period: 'Jun', actual: 96,  predictedWithDriver: 99,  predictedWithoutDriver: 88,  isForecast: false },
        { period: 'Jul', actual: 104, predictedWithDriver: 108, predictedWithoutDriver: 92,  isForecast: false },
        { period: 'Aug', actual: 112, predictedWithDriver: 118, predictedWithoutDriver: 96,  isForecast: false },
        { period: 'Sep', actual: 118, predictedWithDriver: 126, predictedWithoutDriver: 100, isForecast: true  },
        { period: 'Oct', actual: 126, predictedWithDriver: 136, predictedWithoutDriver: 104, isForecast: true  },
        { period: 'Nov', actual: 134, predictedWithDriver: 145, predictedWithoutDriver: 108, isForecast: true  },
        { period: 'Dec', actual: 142, predictedWithDriver: 155, predictedWithoutDriver: 110, isForecast: true  },
      ];
    }

    if (lower.includes('competitor')) {
      return [
        { period: 'Jan', actual: 70,  predictedWithDriver: 69,  predictedWithoutDriver: 71,  isForecast: false },
        { period: 'Feb', actual: 78,  predictedWithDriver: 76,  predictedWithoutDriver: 80,  isForecast: false },
        { period: 'Mar', actual: 82,  predictedWithDriver: 80,  predictedWithoutDriver: 84,  isForecast: false },
        { period: 'Apr', actual: 80,  predictedWithDriver: 78,  predictedWithoutDriver: 82,  isForecast: false },
        { period: 'May', actual: 86,  predictedWithDriver: 83,  predictedWithoutDriver: 88,  isForecast: false },
        { period: 'Jun', actual: 96,  predictedWithDriver: 91,  predictedWithoutDriver: 98,  isForecast: false },
        { period: 'Jul', actual: 104, predictedWithDriver: 98,  predictedWithoutDriver: 108, isForecast: false },
        { period: 'Aug', actual: 112, predictedWithDriver: 104, predictedWithoutDriver: 116, isForecast: false },
        { period: 'Sep', actual: 118, predictedWithDriver: 110, predictedWithoutDriver: 124, isForecast: true  },
        { period: 'Oct', actual: 126, predictedWithDriver: 116, predictedWithoutDriver: 132, isForecast: true  },
        { period: 'Nov', actual: 134, predictedWithDriver: 122, predictedWithoutDriver: 140, isForecast: true  },
        { period: 'Dec', actual: 142, predictedWithDriver: 128, predictedWithoutDriver: 146, isForecast: true  },
      ];
    }

    // Default: Price Index
    return [...CAUSAL_IMPACT_OVER_TIME_MOCK];
  }

  public getCausalInsightsTable(filter?: string): CausalInsightDriver[] {
    if (!filter || filter === 'All Drivers') {
      return [...CAUSAL_INSIGHTS_TABLE_MOCK];
    }
    return CAUSAL_INSIGHTS_TABLE_MOCK.filter((item) =>
      item.driver.toLowerCase().includes(filter.toLowerCase())
    );
  }

  public getScenarioSimulation(driver: string = 'Price Index'): ScenarioSimulationRow[] {
    const list = SCENARIO_SIMULATIONS_BY_DRIVER[driver];
    if (list) return [...list];

    // Check alias
    if (driver.toLowerCase().includes('promo')) {
      return [...SCENARIO_SIMULATIONS_BY_DRIVER['Promotions']];
    }
    if (driver.toLowerCase().includes('gdp') || driver.toLowerCase().includes('economic')) {
      return [...SCENARIO_SIMULATIONS_BY_DRIVER['Economic Activity']];
    }

    return [...SCENARIO_SIMULATIONS_BY_DRIVER['Price Index']];
  }

  public getKeyTakeaways(): CausalKeyTakeaway[] {
    return [...CAUSAL_KEY_TAKEAWAYS_MOCK];
  }

  public getDriverBreakEvents(): DriverBreakEvent[] {
    return [...DRIVER_BREAK_EVENTS_MOCK];
  }

  public getAIInterpretation(driver?: string, _dependentVar?: string): CausalAIInterpretation {
    if (driver && driver.toLowerCase().includes('promo')) {
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
    if (driver && (driver.toLowerCase().includes('economic') || driver.toLowerCase().includes('gdp'))) {
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
    if (driver && driver.toLowerCase().includes('competitor')) {
      return {
        title: 'Competitor discounting poses short-term volume risk',
        narrative:
          'Regional competitor price cuts divert estimated 8.9% volume. Counter with contract volume rebates rather than matching spot prices to defend margin.',
        ctaScenarioText: 'Explore Competitive Scenarios →',
        ctaScenarioRoute: '/solutions/demand-intelligence/scenarios',
        ctaPricingText: 'Review Pricing Strategy →',
        ctaPricingRoute: '/solutions/demand-intelligence/scenarios',
      };
    }

    return { ...CAUSAL_AI_INTERPRETATION_MOCK };
  }

  public getFilterOptions(): CausalFilterOptions {
    return { ...CAUSAL_FILTER_OPTIONS_MOCK };
  }
}

export const mockCausalIntelligenceRepository = new CausalIntelligenceRepository();
