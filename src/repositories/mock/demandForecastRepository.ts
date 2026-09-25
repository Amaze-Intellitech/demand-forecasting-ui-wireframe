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
  public getForecastKpis(params?: ForecastFilterParams, parameterId: string = 'demand_sales'): ForecastKpi[] {
    const isPrice = parameterId.includes('price');
    const isProduction = parameterId.includes('oee') || parameterId.includes('uptime') || parameterId.includes('production');
    const isInventory = parameterId.includes('stock') || parameterId.includes('inventory');

    if (isPrice) {
      return [
        {
          id: 'kpi-wape',
          label: 'Price Volatility (WAPE)',
          value: '4.1%',
          subtext: '-28% vs. baseline',
          direction: 'down',
          isPositive: true,
          iconType: 'accuracy',
          status: 'Champion Model (Prophet)',
          benchmark: 'Baseline: 6.8%',
        },
        {
          id: 'kpi-fva',
          label: 'Forecast Value Added',
          value: '14.2%',
          subtext: '+3.8% vs. last cycle',
          direction: 'up',
          isPositive: true,
          iconType: 'fva',
          status: 'High Value Add',
          benchmark: 'Prior Cycle: 10.4%',
        },
        {
          id: 'kpi-demand',
          label: 'Mean Realized Price',
          value: '$1,148 / MT',
          subtext: '+4.2% vs. last year',
          direction: 'up',
          isPositive: true,
          iconType: 'demand',
          status: 'Ahead of Target',
          benchmark: 'Baseline: $1,102/MT',
        },
        {
          id: 'kpi-service',
          label: 'Contract Price Realization',
          value: '98.4%',
          subtext: '+0.8% vs. prior quarter',
          direction: 'up',
          isPositive: true,
          iconType: 'service',
          status: 'Target: 97.5%',
          benchmark: 'Floor: 96.0%',
        },
        {
          id: 'kpi-uncertainty',
          label: 'High Volatility Contracts',
          value: '14',
          subtext: '-4 vs. last month',
          direction: 'down',
          isPositive: true,
          iconType: 'uncertainty',
          status: 'Stable Exposure',
          benchmark: 'Threshold: 20 SKUs',
        },
        {
          id: 'kpi-champion',
          label: 'Champion Model',
          value: 'Prophet (Trend)',
          subtext: 'Decomposes contract seasonality',
          direction: 'up',
          isPositive: true,
          iconType: 'champion',
          status: 'Prophet v2.1 Active',
          benchmark: 'Runner-up: ARIMA',
        },
      ];
    }

    if (isProduction) {
      return [
        {
          id: 'kpi-wape',
          label: 'OEE Forecast Error',
          value: '3.8%',
          subtext: '-18% vs. baseline',
          direction: 'down',
          isPositive: true,
          iconType: 'accuracy',
          status: 'Champion Model (XGBoost)',
          benchmark: 'Baseline: 5.2%',
        },
        {
          id: 'kpi-fva',
          label: 'Forecast Value Added',
          value: '16.5%',
          subtext: '+4.1% vs. prior cycle',
          direction: 'up',
          isPositive: true,
          iconType: 'fva',
          status: 'High Value Add',
          benchmark: 'Prior Cycle: 12.4%',
        },
        {
          id: 'kpi-demand',
          label: 'Mean Plant OEE / Yield',
          value: '84.6%',
          subtext: '+3.1% vs. plan target',
          direction: 'up',
          isPositive: true,
          iconType: 'demand',
          status: 'Target: 82.0%',
          benchmark: 'Standard: 80.0%',
        },
        {
          id: 'kpi-service',
          label: 'Uptime Reliability Index',
          value: '98.9%',
          subtext: '+0.5% vs. prior month',
          direction: 'up',
          isPositive: true,
          iconType: 'service',
          status: 'Normal Line Rate',
          benchmark: 'Target: 98.0%',
        },
        {
          id: 'kpi-uncertainty',
          label: 'Maintenance Risk Lines',
          value: '3',
          subtext: 'Scheduled overhaul Q3',
          direction: 'down',
          isPositive: true,
          iconType: 'uncertainty',
          status: 'Low Unplanned Risk',
          benchmark: 'Threshold: 5 Lines',
        },
        {
          id: 'kpi-champion',
          label: 'Champion Model',
          value: 'XGBoost Yield Net',
          subtext: 'Superior machine telemetry capture',
          direction: 'up',
          isPositive: true,
          iconType: 'champion',
          status: 'XGBoost v1.8 Active',
          benchmark: 'Runner-up: LightGBM',
        },
      ];
    }

    if (isInventory) {
      return [
        {
          id: 'kpi-wape',
          label: 'Inventory Forecast Error',
          value: '4.7%',
          subtext: '-22% vs. baseline',
          direction: 'down',
          isPositive: true,
          iconType: 'accuracy',
          status: 'Champion Model (TFT)',
          benchmark: 'Baseline: 6.9%',
        },
        {
          id: 'kpi-fva',
          label: 'Forecast Value Added',
          value: '15.8%',
          subtext: '+5.2% vs. last cycle',
          direction: 'up',
          isPositive: true,
          iconType: 'fva',
          status: 'High Value Add',
          benchmark: 'Prior Cycle: 10.6%',
        },
        {
          id: 'kpi-demand',
          label: 'Total Stock Level',
          value: '42.8K MT',
          subtext: '-5.2% vs. peak safety stock',
          direction: 'down',
          isPositive: true,
          iconType: 'demand',
          status: 'Healthy Coverage (18 Days)',
          benchmark: 'Target: 45.0K MT',
        },
        {
          id: 'kpi-service',
          label: 'Stock Availability SLA',
          value: '97.2%',
          subtext: '+0.4% vs. target',
          direction: 'up',
          isPositive: true,
          iconType: 'service',
          status: 'Target: 97.0%',
          benchmark: 'Safety Buffer: 98.0%',
        },
        {
          id: 'kpi-uncertainty',
          label: 'Stockout Risk SKUs',
          value: '16',
          subtext: '-6 vs. last month',
          direction: 'down',
          isPositive: true,
          iconType: 'uncertainty',
          status: 'Controlled Risk',
          benchmark: 'Threshold: 25 SKUs',
        },
        {
          id: 'kpi-champion',
          label: 'Champion Model',
          value: 'Temporal Fusion',
          subtext: 'Multi-echelon buffer prediction',
          direction: 'up',
          isPositive: true,
          iconType: 'champion',
          status: 'TFT v3.4 Active',
          benchmark: 'Runner-up: DeepAR',
        },
      ];
    }

    // Default: Demand / Sales KPIs with existing contextual filters
    if (!params || (params.plant === 'All Plants' && params.product === 'All Products' && params.region === 'All Regions')) {
      return [...FORECAST_KPIS_MOCK];
    }

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
    horizon: string = '12 Months',
    parameterId: string = 'demand_sales'
  ): ProbabilisticForecastPoint[] {
    const isPrice = parameterId.includes('price');
    const isProduction = parameterId.includes('oee') || parameterId.includes('uptime') || parameterId.includes('production');
    const isInventory = parameterId.includes('stock') || parameterId.includes('inventory');

    if (isPrice) {
      if (granularity === 'Quarterly') {
        return [
          { period: 'Q1', monthNumber: 1, isForecast: false, actual: 1076, p10: 1076, p50: 1076, p80: 1076, p90: 1076, p95: 1076 },
          { period: 'Q2', monthNumber: 2, isForecast: false, actual: 1130, p10: 1130, p50: 1130, p80: 1130, p90: 1130, p95: 1130 },
          { period: 'Q3', monthNumber: 3, isForecast: true,  actual: null, p10: 1128, p50: 1187, p80: 1232, p90: 1272, p95: 1312 },
          { period: 'Q4', monthNumber: 4, isForecast: true,  actual: null, p10: 1140, p50: 1215, p80: 1275, p90: 1328, p95: 1375 },
        ];
      }

      const priceSeries: ProbabilisticForecastPoint[] = [
        { period: 'Jan', monthNumber: 1,  isForecast: false, actual: 1050, p10: 1050, p50: 1050, p80: 1050, p90: 1050, p95: 1050 },
        { period: 'Feb', monthNumber: 2,  isForecast: false, actual: 1080, p10: 1080, p50: 1080, p80: 1080, p90: 1080, p95: 1080 },
        { period: 'Mar', monthNumber: 3,  isForecast: false, actual: 1100, p10: 1100, p50: 1100, p80: 1100, p90: 1100, p95: 1100 },
        { period: 'Apr', monthNumber: 4,  isForecast: false, actual: 1120, p10: 1120, p50: 1120, p80: 1120, p90: 1120, p95: 1120 },
        { period: 'May', monthNumber: 5,  isForecast: false, actual: 1140, p10: 1140, p50: 1140, p80: 1140, p90: 1140, p95: 1140 },
        { period: 'Jun', monthNumber: 6,  isForecast: true,  actual: null, p10: 1110, p50: 1150, p80: 1180, p90: 1210, p95: 1240 },
        { period: 'Jul', monthNumber: 7,  isForecast: true,  actual: null, p10: 1120, p50: 1170, p80: 1210, p90: 1245, p95: 1280 },
        { period: 'Aug', monthNumber: 8,  isForecast: true,  actual: null, p10: 1130, p50: 1190, p80: 1235, p90: 1275, p95: 1315 },
        { period: 'Sep', monthNumber: 9,  isForecast: true,  actual: null, p10: 1135, p50: 1200, p80: 1250, p90: 1295, p95: 1340 },
        { period: 'Oct', monthNumber: 10, isForecast: true,  actual: null, p10: 1140, p50: 1210, p80: 1265, p90: 1315, p95: 1360 },
        { period: 'Nov', monthNumber: 11, isForecast: true,  actual: null, p10: 1140, p50: 1215, p80: 1275, p90: 1330, p95: 1375 },
        { period: 'Dec', monthNumber: 12, isForecast: true,  actual: null, p10: 1140, p50: 1220, p80: 1285, p90: 1340, p95: 1390 },
      ];

      return horizon === '6 Months' ? priceSeries.slice(0, 6) : priceSeries;
    }

    if (isProduction) {
      if (granularity === 'Quarterly') {
        return [
          { period: 'Q1', monthNumber: 1, isForecast: false, actual: 82.5, p10: 82.5, p50: 82.5, p80: 82.5, p90: 82.5, p95: 82.5 },
          { period: 'Q2', monthNumber: 2, isForecast: false, actual: 84.1, p10: 84.1, p50: 84.1, p80: 84.1, p90: 84.1, p95: 84.1 },
          { period: 'Q3', monthNumber: 3, isForecast: true,  actual: null, p10: 81.2, p50: 85.0, p80: 86.8, p90: 88.0, p95: 89.1 },
          { period: 'Q4', monthNumber: 4, isForecast: true,  actual: null, p10: 80.5, p50: 85.4, p80: 87.2, p90: 88.5, p95: 89.6 },
        ];
      }

      const oeeSeries: ProbabilisticForecastPoint[] = [
        { period: 'Jan', monthNumber: 1,  isForecast: false, actual: 81.0, p10: 81.0, p50: 81.0, p80: 81.0, p90: 81.0, p95: 81.0 },
        { period: 'Feb', monthNumber: 2,  isForecast: false, actual: 82.5, p10: 82.5, p50: 82.5, p80: 82.5, p90: 82.5, p95: 82.5 },
        { period: 'Mar', monthNumber: 3,  isForecast: false, actual: 84.0, p10: 84.0, p50: 84.0, p80: 84.0, p90: 84.0, p95: 84.0 },
        { period: 'Apr', monthNumber: 4,  isForecast: false, actual: 83.5, p10: 83.5, p50: 83.5, p80: 83.5, p90: 83.5, p95: 83.5 },
        { period: 'May', monthNumber: 5,  isForecast: false, actual: 84.8, p10: 84.8, p50: 84.8, p80: 84.8, p90: 84.8, p95: 84.8 },
        { period: 'Jun', monthNumber: 6,  isForecast: true,  actual: null, p10: 82.0, p50: 85.1, p80: 86.5, p90: 87.8, p95: 88.5 },
        { period: 'Jul', monthNumber: 7,  isForecast: true,  actual: null, p10: 81.5, p50: 84.9, p80: 86.8, p90: 88.0, p95: 88.9 },
        { period: 'Aug', monthNumber: 8,  isForecast: true,  actual: null, p10: 81.0, p50: 84.6, p80: 86.5, p90: 87.5, p95: 88.4 },
        { period: 'Sep', monthNumber: 9,  isForecast: true,  actual: null, p10: 81.5, p50: 85.2, p80: 87.0, p90: 88.2, p95: 89.1 },
        { period: 'Oct', monthNumber: 10, isForecast: true,  actual: null, p10: 81.8, p50: 85.5, p80: 87.2, p90: 88.4, p95: 89.2 },
        { period: 'Nov', monthNumber: 11, isForecast: true,  actual: null, p10: 81.0, p50: 85.3, p80: 87.0, p90: 88.2, p95: 89.0 },
        { period: 'Dec', monthNumber: 12, isForecast: true,  actual: null, p10: 81.0, p50: 85.4, p80: 87.2, p90: 88.5, p95: 89.2 },
      ];

      return horizon === '6 Months' ? oeeSeries.slice(0, 6) : oeeSeries;
    }

    if (isInventory) {
      const invSeries: ProbabilisticForecastPoint[] = [
        { period: 'Jan', monthNumber: 1,  isForecast: false, actual: 44, p10: 44, p50: 44, p80: 44, p90: 44, p95: 44 },
        { period: 'Feb', monthNumber: 2,  isForecast: false, actual: 42, p10: 42, p50: 42, p80: 42, p90: 42, p95: 42 },
        { period: 'Mar', monthNumber: 3,  isForecast: false, actual: 40, p10: 40, p50: 40, p80: 40, p90: 40, p95: 40 },
        { period: 'Apr', monthNumber: 4,  isForecast: false, actual: 43, p10: 43, p50: 43, p80: 43, p90: 43, p95: 43 },
        { period: 'May', monthNumber: 5,  isForecast: false, actual: 45, p10: 45, p50: 45, p80: 45, p90: 45, p95: 45 },
        { period: 'Jun', monthNumber: 6,  isForecast: true,  actual: null, p10: 39, p50: 46, p80: 51, p90: 55, p95: 58 },
        { period: 'Jul', monthNumber: 7,  isForecast: true,  actual: null, p10: 38, p50: 48, p80: 54, p90: 58, p95: 62 },
        { period: 'Aug', monthNumber: 8,  isForecast: true,  actual: null, p10: 38, p50: 50, p80: 56, p90: 60, p95: 65 },
        { period: 'Sep', monthNumber: 9,  isForecast: true,  actual: null, p10: 39, p50: 51, p80: 57, p90: 62, p95: 66 },
        { period: 'Oct', monthNumber: 10, isForecast: true,  actual: null, p10: 39, p50: 52, p80: 58, p90: 63, p95: 67 },
        { period: 'Nov', monthNumber: 11, isForecast: true,  actual: null, p10: 38, p50: 52, p80: 58, p90: 63, p95: 67 },
        { period: 'Dec', monthNumber: 12, isForecast: true,  actual: null, p10: 38, p50: 52, p80: 58, p90: 64, p95: 68 },
      ];
      return horizon === '6 Months' ? invSeries.slice(0, 6) : invSeries;
    }

    // Default: Demand / Sales Series
    const data = [...PROBABILISTIC_FORECAST_MOCK];
    if (horizon === '6 Months') return data.slice(0, 6);
    if (granularity === 'Quarterly') {
      return [
        { period: 'Q1', monthNumber: 1, isForecast: false, actual: 77, p10: 77, p50: 77, p80: 77, p90: 77, p95: 77 },
        { period: 'Q2', monthNumber: 2, isForecast: false, actual: 82, p10: 82, p50: 82, p80: 82, p90: 82, p95: 82 },
        { period: 'Q3', monthNumber: 3, isForecast: true,  actual: null, p10: 98, p50: 111, p80: 125, p90: 135, p95: 145 },
        { period: 'Q4', monthNumber: 4, isForecast: true,  actual: null, p10: 106, p50: 134, p80: 156, p90: 171, p95: 184 },
      ];
    }
    return data;
  }

  public getForecastQuantilesDec(parameterId: string = 'demand_sales'): ForecastQuantilesDec {
    const isPrice = parameterId.includes('price');
    const isProduction = parameterId.includes('oee') || parameterId.includes('uptime') || parameterId.includes('production');
    const isInventory = parameterId.includes('stock') || parameterId.includes('inventory');

    if (isPrice) {
      return {
        p95: '$1,390/MT',
        p90: '$1,340/MT',
        p80: '$1,285/MT',
        p50: '$1,220/MT',
        p10: '$1,140/MT',
        expectedDemand: '$1,220 / MT',
        expectedGrowth: '+6.8% vs. Jun 2025',
      };
    }

    if (isProduction) {
      return {
        p95: '89.2%',
        p90: '88.5%',
        p80: '87.2%',
        p50: '85.4%',
        p10: '81.0%',
        expectedDemand: '85.4% OEE',
        expectedGrowth: '+0.7% vs. Jun 2025',
      };
    }

    if (isInventory) {
      return {
        p95: '68.0K MT',
        p90: '64.0K MT',
        p80: '58.0K MT',
        p50: '52.0K MT',
        p10: '38.0K MT',
        expectedDemand: '52.0K MT',
        expectedGrowth: '+13.0% vs. Jun 2025',
      };
    }

    return { ...FORECAST_QUANTILES_DEC_MOCK };
  }

  public getModelTournament(
    filter: 'All' | ModelStatus = 'All',
    sortBy: 'wape' | 'bias' | 'status' = 'wape',
    parameterId: string = 'demand_sales'
  ): ForecastModelResult[] {
    let list = [...MODEL_TOURNAMENT_MOCK];

    if (parameterId.includes('price')) {
      // For price, Prophet and ARIMA perform exceptionally well
      list = list.map((m) => {
        if (m.modelId === 'prophet') return { ...m, status: 'Champion', wape: '3.9%', wapeNum: 3.9 };
        if (m.modelId === 'tft') return { ...m, status: 'Challenger', wape: '4.2%', wapeNum: 4.2 };
        return m;
      });
    } else if (parameterId.includes('oee') || parameterId.includes('production')) {
      // For plant yield, XGBoost is champion
      list = list.map((m) => {
        if (m.modelId === 'xgboost') return { ...m, status: 'Champion', wape: '3.8%', wapeNum: 3.8 };
        if (m.modelId === 'tft') return { ...m, status: 'Challenger', wape: '4.4%', wapeNum: 4.4 };
        return m;
      });
    }

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

  public getForecastInsights(parameterId: string = 'demand_sales'): ForecastInsight[] {
    const isPrice = parameterId.includes('price');
    const isProduction = parameterId.includes('oee') || parameterId.includes('uptime');
    const isInventory = parameterId.includes('stock') || parameterId.includes('inventory');

    if (isPrice) {
      return [
        {
          id: 'ins-p-1',
          title: 'Contract Renewal Upside in Q3',
          summary: 'Forward price regression indicates +4.2% margin headroom on tier-1 distributor accounts.',
          iconType: 'peak',
          severity: 'positive',
          route: '/solutions/demand-intelligence/scenarios',
        },
        {
          id: 'ins-p-2',
          title: 'Feedstock Pass-Through Sensitivity',
          summary: '84% of resin pricing delta traces to upstream ethylene contract adjustments.',
          iconType: 'signals',
          severity: 'info',
          route: '/solutions/demand-intelligence/drivers',
        },
        {
          id: 'ins-p-3',
          title: 'Low Price Elasticity in Specialty Polymers',
          summary: 'PP Copolymer exhibits -0.32 price elasticity, supporting premium price indexing.',
          iconType: 'uncertainty',
          severity: 'positive',
          route: '/solutions/demand-intelligence/drivers',
        },
      ];
    }

    if (isProduction) {
      return [
        {
          id: 'ins-o-1',
          title: 'Line #04 Extruder Rate Above Benchmark',
          summary: 'Plant OEE trending at 85.2% (+3.2 pts vs plan); bottleneck shifted to packaging line.',
          iconType: 'peak',
          severity: 'positive',
          route: '/solutions/demand-intelligence/supply-capacity',
        },
        {
          id: 'ins-o-2',
          title: 'Preventive Overhaul Scheduled',
          summary: 'August scheduled maintenance window incorporated into forward line rate forecast.',
          iconType: 'signals',
          severity: 'info',
          route: '/solutions/demand-intelligence/supply-capacity',
        },
      ];
    }

    if (isInventory) {
      return [
        {
          id: 'ins-i-1',
          title: 'Buffer Normalization Across Regional Hubs',
          summary: 'Days of supply reduced from 22.4 to 18.0 without service level degradation.',
          iconType: 'positive' as any,
          severity: 'positive',
          route: '/solutions/demand-intelligence/inventory',
        },
        {
          id: 'ins-i-2',
          title: 'Pre-build for Seasonal Packaging Demand',
          summary: 'Forward stock simulation recommends +12% buffer in Midwest DC by end of May.',
          iconType: 'uncertainty',
          severity: 'info',
          route: '/solutions/demand-intelligence/inventory',
        },
      ];
    }

    return [...KEY_FORECAST_INSIGHTS_MOCK];
  }

  public getCategoryDistribution(parameterId: string = 'demand_sales'): ForecastCategoryDistribution[] {
    const isPrice = parameterId.includes('price');
    if (isPrice) {
      return [
        { id: 'cat-1', name: 'HDPE Resin', percent: 34, volume: '$1,180/MT', color: '#0062d2' },
        { id: 'cat-2', name: 'PP Resin', percent: 28, volume: '$1,120/MT', color: '#38bdf8' },
        { id: 'cat-3', name: 'LLDPE', percent: 22, volume: '$1,080/MT', color: '#818cf8' },
        { id: 'cat-4', name: 'PET Resin', percent: 16, volume: '$1,240/MT', color: '#c084fc' },
      ];
    }
    return [...FORECAST_BY_CATEGORY_MOCK];
  }

  public getRegionalGrowth(parameterId: string = 'demand_sales'): ForecastRegionalGrowth[] {
    const isPrice = parameterId.includes('price');
    if (isPrice) {
      return [
        { id: 'reg-na', region: 'North America', demand: '$1,165/MT', demandVal: 1165, growthYoY: '+3.8%', color: '#0062d2' },
        { id: 'reg-eu', region: 'Europe', demand: '$1,210/MT', demandVal: 1210, growthYoY: '+5.1%', color: '#38bdf8' },
        { id: 'reg-apac', region: 'Asia Pacific', demand: '$1,090/MT', demandVal: 1090, growthYoY: '+2.4%', color: '#10b981' },
        { id: 'reg-latam', region: 'Latin America', demand: '$1,130/MT', demandVal: 1130, growthYoY: '+4.0%', color: '#f59e0b' },
      ];
    }
    return [...FORECAST_BY_REGION_MOCK];
  }

  public getTopSkuChanges(): ForecastSkuChange[] {
    return [...TOP_SKU_FORECAST_CHANGES_MOCK];
  }

  public getScenarioComparison(): ForecastScenario[] {
    return [...FORECAST_SCENARIOS_MOCK];
  }

  public getAIRecommendation(
    region?: string,
    product?: string,
    parameterId: string = 'demand_sales'
  ): ForecastAIRecommendation {
    const isPrice = parameterId.includes('price');
    if (isPrice) {
      return {
        title: 'Optimize wholesale contract price adjustments',
        narrative:
          'Univariate price trajectory indicates sustained margin expansion (+4.2% YoY). Forward model recommends locking Q3 supply contracts before the forecasted index peak in December.',
        ctaText: 'Explore in Scenario Studio →',
        ctaRoute: '/solutions/demand-intelligence/scenarios',
      };
    }

    const isProduction = parameterId.includes('oee') || parameterId.includes('uptime');
    if (isProduction) {
      return {
        title: 'Calibrate line speed ahead of seasonal summer surge',
        narrative:
          'Extrusion plant yield is projected at 85.4% OEE. Pre-schedule turnaround maintenance at Columbus #04 to avert production bottlenecks during peak order periods.',
        ctaText: 'View Plant Capacity →',
        ctaRoute: '/solutions/demand-intelligence/supply-capacity',
      };
    }

    const isInventory = parameterId.includes('stock') || parameterId.includes('inventory');
    if (isInventory) {
      return {
        title: 'Execute safety buffer pre-build for Q3',
        narrative:
          'Finished goods inventory projected to tighten to 42.8K MT. Advance warehouse transfers to Midwest hubs to protect customer fill rates.',
        ctaText: 'View Inventory Health →',
        ctaRoute: '/solutions/demand-intelligence/inventory',
      };
    }

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
