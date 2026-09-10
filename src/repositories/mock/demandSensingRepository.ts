import {
  SensingKpi,
  SensedForecastPoint,
  SignalSource,
  DemandEvent,
  ShortTermAdjustmentPoint,
  SkuDemandChange,
  ChannelDemand,
  LiveSignalFeedItem,
  SensingAIInsight,
  SensedAdjustmentRecommendation,
  SensingFilterOptions,
} from '../../types/domain/demandSensing';

import {
  SENSING_KPIS_MOCK,
  SENSED_DEMAND_SERIES_8W_MOCK,
  SENSED_DEMAND_SERIES_4W_MOCK,
  SENSED_DEMAND_SERIES_12W_MOCK,
  SIGNAL_SOURCES_MOCK,
  DEMAND_EVENTS_MOCK,
  SHORT_TERM_ADJUSTMENT_WATERFALL_MOCK,
  SKU_DEMAND_CHANGES_MOCK,
  CHANNEL_DEMAND_MOCK,
  LIVE_SIGNAL_FEED_MOCK,
  SENSING_AI_INSIGHT_MOCK,
  SENSED_ADJUSTMENT_RECOMMENDATION_MOCK,
  SENSING_FILTER_OPTIONS_MOCK,
} from '../../data/demandSensingMock';

export interface SensingFilterParams {
  plant?: string;
  product?: string;
  region?: string;
  horizon?: string;
  sourceFilter?: string;
  eventSeverity?: 'All' | 'High' | 'Medium' | 'Low';
}

export class DemandSensingRepository {
  public getSensingKpis(params?: SensingFilterParams): SensingKpi[] {
    const isFiltered = params?.plant && params.plant !== 'All Plants';
    if (!isFiltered) {
      return [...SENSING_KPIS_MOCK];
    }
    // Contextual variation for single plant
    return SENSING_KPIS_MOCK.map((kpi) => {
      if (kpi.id === 'kpi-index') {
        return { ...kpi, value: '109.8', subtext: '+6.2% vs. baseline' };
      }
      if (kpi.id === 'kpi-events') {
        return { ...kpi, value: '3', subtext: '1 high, 2 medium' };
      }
      if (kpi.id === 'kpi-atRisk') {
        return { ...kpi, value: '7', subtext: '+1 vs. last week' };
      }
      return kpi;
    });
  }

  public getSensedForecast(horizon: string = 'Last 8 Weeks'): SensedForecastPoint[] {
    if (horizon === 'Last 4 Weeks') return [...SENSED_DEMAND_SERIES_4W_MOCK];
    if (horizon === 'Last 12 Weeks') return [...SENSED_DEMAND_SERIES_12W_MOCK];
    return [...SENSED_DEMAND_SERIES_8W_MOCK];
  }

  public getSignalSources(sortBy: 'freshest' | 'oldest' | 'status' = 'freshest'): SignalSource[] {
    const list = [...SIGNAL_SOURCES_MOCK];
    if (sortBy === 'oldest') {
      return list.sort((a, b) => b.freshnessMin - a.freshnessMin);
    }
    if (sortBy === 'status') {
      return list.sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status === 'Active' ? -1 : 1;
      });
    }
    return list.sort((a, b) => a.freshnessMin - b.freshnessMin);
  }

  public getDemandEvents(severityFilter: 'All' | 'High' | 'Medium' | 'Low' = 'All'): DemandEvent[] {
    if (severityFilter === 'All') return [...DEMAND_EVENTS_MOCK];
    return DEMAND_EVENTS_MOCK.filter((e) => e.severity === severityFilter);
  }

  public getShortTermAdjustment(): ShortTermAdjustmentPoint[] {
    return [...SHORT_TERM_ADJUSTMENT_WATERFALL_MOCK];
  }

  public getSkuDemandChanges(): SkuDemandChange[] {
    return [...SKU_DEMAND_CHANGES_MOCK];
  }

  public getChannelDemand(): ChannelDemand[] {
    return [...CHANNEL_DEMAND_MOCK];
  }

  public getLiveSignalFeed(sourceFilter?: string): LiveSignalFeedItem[] {
    if (!sourceFilter || sourceFilter === 'All') {
      return [...LIVE_SIGNAL_FEED_MOCK];
    }
    return LIVE_SIGNAL_FEED_MOCK.filter((item) =>
      item.source.toLowerCase().includes(sourceFilter.toLowerCase())
    );
  }

  public getAIInsight(region?: string, product?: string): SensingAIInsight {
    if (region === 'North America') {
      return {
        title: 'North America commercial promotion lift',
        narrative:
          'Retail POS signals demonstrate a 14% demand surge for HDPE resin across Midwest distributors. Recommend advancing Columbus plant production run.',
        route: '/solutions/demand-intelligence/forecast',
        targetText: 'Explore in Forecast Intelligence',
      };
    }
    if (product && product !== 'All Products') {
      return {
        title: `${product} near-term volatility alert`,
        narrative: `High order concentration detected for ${product} with supply lead time variance. Recommend adjusting buffer allocation in nearest hub.`,
        route: '/solutions/demand-intelligence/supply-capacity',
        targetText: 'Inspect Sourcing Allocation',
      };
    }
    return { ...SENSING_AI_INSIGHT_MOCK };
  }

  public getAdjustmentRecommendation(): SensedAdjustmentRecommendation {
    return { ...SENSED_ADJUSTMENT_RECOMMENDATION_MOCK };
  }

  public getFilterOptions(): SensingFilterOptions {
    return { ...SENSING_FILTER_OPTIONS_MOCK };
  }
}

export const mockDemandSensingRepository = new DemandSensingRepository();
