import {
  ForecastKpi,
  ProbabilisticForecastPoint,
  ForecastQuantilesDec,
  ForecastModelResult,
  FvaStage,
  ForecastInsight,
  ForecastCategoryDistribution,
  ForecastRegionalGrowth,
  ForecastSkuChange,
  ForecastScenario,
  ForecastAIRecommendation,
  ForecastFilterOptions,
  ForecastFilterParams,
  ForecastSettings,
  ModelStatus,
} from '../../types/domain/demandForecast';
import {
  FORECAST_KPIS_MOCK,
  PROBABILISTIC_FORECAST_MOCK,
  FORECAST_QUANTILES_DEC_MOCK,
  MODEL_TOURNAMENT_MOCK,
  FVA_WATERFALL_MOCK,
  KEY_FORECAST_INSIGHTS_MOCK,
  FORECAST_BY_CATEGORY_MOCK,
  FORECAST_BY_REGION_MOCK,
  TOP_SKU_FORECAST_CHANGES_MOCK,
  FORECAST_SCENARIOS_MOCK,
  FORECAST_AI_RECOMMENDATION_MOCK,
  FORECAST_FILTER_OPTIONS_MOCK,
  FORECAST_SETTINGS_MOCK,
} from '../../data/demandForecastMock';

export class DemandForecastRepository {
  public getForecastKpis(params?: ForecastFilterParams): ForecastKpi[] {
    if (!params || (params.plant === 'All Plants' && params.product === 'All Products' && params.region === 'All Regions')) {
      return [...FORECAST_KPIS_MOCK];
    }

    // Contextual variation based on selected filter
    return FORECAST_KPIS_MOCK.map((kpi) => {
      if (params.region === 'Asia Pacific') {
        if (kpi.id === 'kpi-demand') return { ...kpi, value: '412K units', subtext: '+11.8% vs. last year' };
        if (kpi.id === 'kpi-fva') return { ...kpi, value: '21.2%', subtext: '+8.4% vs. last cycle' };
        if (kpi.id === 'kpi-wape') return { ...kpi, value: '4.9%', subtext: '-38% vs. baseline' };
      }
      if (params.product === 'HDPE Resin') {
        if (kpi.id === 'kpi-demand') return { ...kpi, value: '494K units', subtext: '+9.2% vs. last year' };
        if (kpi.id === 'kpi-uncertainty') return { ...kpi, value: '12', subtext: '+2 vs. last month' };
      }
      return kpi;
    });
  }

  public getProbabilisticForecast(
    granularity: 'Monthly' | 'Quarterly' = 'Monthly',
    horizon: string = '12 Months'
  ): ProbabilisticForecastPoint[] {
    const data = [...PROBABILISTIC_FORECAST_MOCK];

    if (horizon === '6 Months') {
      // Slice from Jan to Jun (6 months)
      return data.slice(0, 6);
    }

    if (granularity === 'Quarterly') {
      // Aggregate into 4 quarters
      return [
        { period: 'Q1', monthNumber: 1, isForecast: false, actual: 77, p10: 77, p50: 77, p80: 77, p90: 77, p95: 77 },
        { period: 'Q2', monthNumber: 2, isForecast: false, actual: 82, p10: 82, p50: 82, p80: 82, p90: 82, p95: 82 },
        { period: 'Q3', monthNumber: 3, isForecast: true,  actual: null, p10: 98, p50: 111, p80: 125, p90: 135, p95: 145 },
        { period: 'Q4', monthNumber: 4, isForecast: true,  actual: null, p10: 106, p50: 134, p80: 156, p90: 171, p95: 184 },
      ];
    }

    return data;
  }

  public getForecastQuantilesDec(): ForecastQuantilesDec {
    return { ...FORECAST_QUANTILES_DEC_MOCK };
  }

  public getModelTournament(
    filter: 'All' | ModelStatus = 'All',
    sortBy: 'wape' | 'bias' | 'status' = 'wape'
  ): ForecastModelResult[] {
    let list = [...MODEL_TOURNAMENT_MOCK];

    if (filter !== 'All') {
      list = list.filter((m) => m.status === filter);
    }

    if (sortBy === 'wape') {
      list.sort((a, b) => a.wapeNum - b.wapeNum);
    } else if (sortBy === 'bias') {
      list.sort((a, b) => parseFloat(a.bias) - parseFloat(b.bias));
    } else if (sortBy === 'status') {
      const order: Record<ModelStatus, number> = { Champion: 1, Challenger: 2, Baseline: 3 };
      list.sort((a, b) => order[a.status] - order[b.status]);
    }

    return list;
  }

  public getFvaWaterfall(): FvaStage[] {
    return [...FVA_WATERFALL_MOCK];
  }

  public getForecastInsights(): ForecastInsight[] {
    return [...KEY_FORECAST_INSIGHTS_MOCK];
  }

  public getCategoryDistribution(): ForecastCategoryDistribution[] {
    return [...FORECAST_BY_CATEGORY_MOCK];
  }

  public getRegionalGrowth(): ForecastRegionalGrowth[] {
    return [...FORECAST_BY_REGION_MOCK];
  }

  public getTopSkuChanges(): ForecastSkuChange[] {
    return [...TOP_SKU_FORECAST_CHANGES_MOCK];
  }

  public getScenarioComparison(): ForecastScenario[] {
    return [...FORECAST_SCENARIOS_MOCK];
  }

  public getAIRecommendation(region?: string, product?: string): ForecastAIRecommendation {
    if (region === 'Asia Pacific') {
      return {
        title: 'Capitalize on APAC packaging surge',
        narrative:
          'APAC demand growth is accelerating at +11.8% YoY with high model certainty (P50: 412K). Allocate additional resin throughput from Shanghai Plant #09 to protect SLA.',
        ctaText: 'Explore in Scenario Studio →',
        ctaRoute: '/solutions/demand-intelligence/scenarios',
      };
    }
    if (product === 'HDPE Resin') {
      return {
        title: 'Maintain buffer for HDPE packaging surge',
        narrative:
          'HDPE Resin accounts for 38.6% of overall demand. Model forecast suggests +28% uplift in SKU-001. Review supplier allocation for monomer precursor.',
        ctaText: 'Explore in Scenario Studio →',
        ctaRoute: '/solutions/demand-intelligence/scenarios',
      };
    }
    return { ...FORECAST_AI_RECOMMENDATION_MOCK };
  }

  public getFilterOptions(): ForecastFilterOptions {
    return { ...FORECAST_FILTER_OPTIONS_MOCK };
  }

  public getForecastSettings(): ForecastSettings {
    return { ...FORECAST_SETTINGS_MOCK };
  }
}

export const mockDemandForecastRepository = new DemandForecastRepository();
