import {
  ExecutiveKpi,
  EnterpriseSummary,
  DemandSupplyPoint,
  RegionalDemand,
  ExecutiveInsight,
  WorkingCapitalWaterfallPoint,
  PlantServiceLevel,
  ProductCategoryDemand,
  PlanningEvent,
  DecisionTrigger,
  ExecutiveFilterOptions,
} from '../../types/domain/executiveCommandCenter';

import {
  EXECUTIVE_SUMMARY_MOCK,
  EXECUTIVE_KPIS_MOCK,
  DEMAND_SUPPLY_SERIES_MONTHLY_MOCK,
  DEMAND_SUPPLY_SERIES_QUARTERLY_MOCK,
  REGIONAL_DEMAND_MOCK,
  EXECUTIVE_INSIGHTS_MOCK,
  WORKING_CAPITAL_WATERFALL_MOCK,
  PLANT_SERVICE_LEVELS_MOCK,
  PRODUCT_CATEGORY_MIX_MOCK,
  RECENT_PLANNING_EVENTS_MOCK,
  DECISION_TRIGGERS_MOCK,
  EXECUTIVE_FILTER_OPTIONS_MOCK,
} from '../../data/executiveCommandCenterMock';

export interface ExecutiveRepositoryFilterParams {
  plant?: string;
  product?: string;
  region?: string;
  period?: 'monthly' | 'quarterly';
}

export class ExecutiveCommandCenterRepository {
  /**
   * Retrieves high-level enterprise summary KPIs
   */
  public getExecutiveSummary(filters?: ExecutiveRepositoryFilterParams): EnterpriseSummary {
    if (!filters?.plant || filters.plant === 'All Plants') {
      return { ...EXECUTIVE_SUMMARY_MOCK };
    }

    // Contextual adjustment for single-plant rollup drilldown
    const plant = filters.plant;
    const plantFactors: Record<string, { demand: string; rev: string; inv: string; sla: string; exc: number; crit: number }> = {
      'Plant A': { demand: '310K units', rev: '$44.5M', inv: '$18.2M', sla: '99.2%', exc: 1, crit: 0 },
      'Plant B': { demand: '290K units', rev: '$41.8M', inv: '$19.4M', sla: '97.8%', exc: 2, crit: 0 },
      'Plant C': { demand: '260K units', rev: '$37.2M', inv: '$21.1M', sla: '95.1%', exc: 3, crit: 1 },
      'Plant D': { demand: '220K units', rev: '$32.1M', inv: '$17.5M', sla: '92.4%', exc: 4, crit: 1 },
      'Plant E': { demand: '200K units', rev: '$28.6M', inv: '$16.2M', sla: '89.7%', exc: 2, crit: 1 },
    };

    const factor = plantFactors[plant] || { demand: '250K units', rev: '$36.0M', inv: '$18.0M', sla: '96.0%', exc: 2, crit: 1 };

    return {
      totalDemand: factor.demand,
      revenueOpportunity: factor.rev,
      inventoryValue: factor.inv,
      serviceLevel: factor.sla,
      activeExceptionsCount: factor.exc,
      criticalExceptionsCount: factor.crit,
      highExceptionsCount: factor.exc - factor.crit,
      sourcingSavings: '$2.8M',
    };
  }

  /**
   * Retrieves the 6 executive KPI cards with contextual styling and values
   */
  public getExecutiveKpis(filters?: ExecutiveRepositoryFilterParams): ExecutiveKpi[] {
    const summary = this.getExecutiveSummary(filters);
    const isFiltered = filters?.plant && filters.plant !== 'All Plants';

    return EXECUTIVE_KPIS_MOCK.map((kpi) => {
      if (kpi.id === 'kpi-demand') {
        return { ...kpi, value: summary.totalDemand, subtext: isFiltered ? `Plant contribution: 24.2%` : '+7.4% vs. last year' };
      }
      if (kpi.id === 'kpi-revenue') {
        return { ...kpi, value: summary.revenueOpportunity, subtext: isFiltered ? 'Localized revenue target' : '+6.8% vs. last year' };
      }
      if (kpi.id === 'kpi-inventory') {
        return { ...kpi, value: summary.inventoryValue, subtext: isFiltered ? 'Site inventory footprint' : '-12.3% vs. last year' };
      }
      if (kpi.id === 'kpi-service') {
        return { ...kpi, value: summary.serviceLevel, subtext: isFiltered ? `Site SLA target: 95.0%` : '+0.6% vs. last quarter' };
      }
      if (kpi.id === 'kpi-exceptions') {
        return {
          ...kpi,
          value: String(summary.activeExceptionsCount),
          subtext: `${summary.criticalExceptionsCount} critical, ${summary.highExceptionsCount} high`,
        };
      }
      if (kpi.id === 'kpi-sourcing') {
        return { ...kpi, value: summary.sourcingSavings, subtext: isFiltered ? 'Plant procurement potential' : '+12.4% opportunity' };
      }
      return kpi;
    });
  }

  /**
   * Retrieves Demand vs Supply time series (Monthly or Quarterly)
   */
  public getDemandSupplySeries(period: 'monthly' | 'quarterly' = 'monthly'): DemandSupplyPoint[] {
    return period === 'monthly' ? DEMAND_SUPPLY_SERIES_MONTHLY_MOCK : DEMAND_SUPPLY_SERIES_QUARTERLY_MOCK;
  }

  /**
   * Retrieves regional demand breakdown
   */
  public getRegionalDemand(): RegionalDemand[] {
    return [...REGIONAL_DEMAND_MOCK];
  }

  /**
   * Retrieves top executive insights
   */
  public getExecutiveInsights(): ExecutiveInsight[] {
    return [...EXECUTIVE_INSIGHTS_MOCK];
  }

  /**
   * Retrieves the 4-bar working capital risk waterfall points
   */
  public getWorkingCapitalWaterfall(): WorkingCapitalWaterfallPoint[] {
    return [...WORKING_CAPITAL_WATERFALL_MOCK];
  }

  /**
   * Retrieves plant service levels
   */
  public getPlantServiceLevels(): PlantServiceLevel[] {
    return [...PLANT_SERVICE_LEVELS_MOCK];
  }

  /**
   * Retrieves product category mix
   */
  public getProductCategoryMix(): ProductCategoryDemand[] {
    return [...PRODUCT_CATEGORY_MIX_MOCK];
  }

  /**
   * Retrieves recent planning events & activities
   */
  public getRecentEvents(): PlanningEvent[] {
    return [...RECENT_PLANNING_EVENTS_MOCK];
  }

  /**
   * Retrieves C-suite decision triggers
   */
  public getDecisionTriggers(): DecisionTrigger[] {
    return [...DECISION_TRIGGERS_MOCK];
  }

  /**
   * Retrieves filter options for plants, products, regions, horizons
   */
  public getFilterOptions(): ExecutiveFilterOptions {
    return { ...EXECUTIVE_FILTER_OPTIONS_MOCK };
  }
}

export const mockExecutiveRepository = new ExecutiveCommandCenterRepository();
