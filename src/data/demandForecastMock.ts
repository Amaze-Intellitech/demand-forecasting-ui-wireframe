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
  ForecastSettings,
} from '../types/domain/demandForecast';

// ─────────────────────────────────────────────────────────────
// AITEK Demand Intelligence — Screen 03: Forecast Intelligence
// Primary Mock Datasets (Matching Reference UI Image)
// ─────────────────────────────────────────────────────────────

// ── 1. Forecast Health KPIs (6 Strip Cards) ────────────────────
export const FORECAST_KPIS_MOCK: ForecastKpi[] = [
  {
    id: 'kpi-wape',
    label: 'Forecast Accuracy (WAPE)',
    value: '5.8%',
    subtext: '-32% vs. baseline',
    direction: 'down',
    isPositive: true, // lower error is positive
    iconType: 'accuracy',
    status: 'Champion Model (TFT)',
    benchmark: 'Baseline: 8.5%',
  },
  {
    id: 'kpi-fva',
    label: 'Forecast Value Added',
    value: '18.4%',
    subtext: '+6.2% vs. last cycle',
    direction: 'up',
    isPositive: true,
    iconType: 'fva',
    status: 'High Value Add',
    benchmark: 'Prior Cycle: 12.2%',
  },
  {
    id: 'kpi-demand',
    label: 'Total Forecast Demand',
    value: '1.28M units',
    subtext: '+7.4% vs. last year',
    direction: 'up',
    isPositive: true,
    iconType: 'demand',
    status: 'Above 2024 Actuals',
    benchmark: 'Prior Year: 1.19M',
  },
  {
    id: 'kpi-service',
    label: 'Service Level (Projected)',
    value: '97.8%',
    subtext: '+0.6% vs. last quarter',
    direction: 'up',
    isPositive: true,
    iconType: 'service',
    status: 'Target: 97.0%',
    benchmark: 'Safety Buffer: 98.2%',
  },
  {
    id: 'kpi-uncertainty',
    label: 'High Uncertainty SKUs',
    value: '28',
    subtext: '+8 vs. last month',
    direction: 'up',
    isPositive: false, // more high uncertainty is a risk indicator
    iconType: 'uncertainty',
    status: 'Requires Attention',
    benchmark: 'Threshold: 20 SKUs',
  },
  {
    id: 'kpi-champion',
    label: 'Champion Model',
    value: 'Temporal Fusion',
    subtext: 'Best overall performance',
    direction: 'up',
    isPositive: true,
    iconType: 'champion',
    status: 'TFT v3.4 Active',
    benchmark: 'Runner-up: XGBoost',
  },
];

// ── 2. Probabilistic Forecast (12 Months Fan Chart) ───────────
// Historical: Jan to May (Actual points with solid dark line)
// Forecast: Jun to Dec (Fan with P10, P50, P80, P90, P95)
export const PROBABILISTIC_FORECAST_MOCK: ProbabilisticForecastPoint[] = [
  { period: 'Jan', monthNumber: 1,  isForecast: false, actual: 70,  p10: 70,  p50: 70,  p80: 70,  p90: 70,  p95: 70 },
  { period: 'Feb', monthNumber: 2,  isForecast: false, actual: 78,  p10: 78,  p50: 78,  p80: 78,  p90: 78,  p95: 78 },
  { period: 'Mar', monthNumber: 3,  isForecast: false, actual: 82,  p10: 82,  p50: 82,  p80: 82,  p90: 82,  p95: 82 },
  { period: 'Apr', monthNumber: 4,  isForecast: false, actual: 80,  p10: 80,  p50: 80,  p80: 80,  p90: 80,  p95: 80 },
  { period: 'May', monthNumber: 5,  isForecast: false, actual: 86,  p10: 86,  p50: 86,  p80: 86,  p90: 86,  p95: 86 },
  { period: 'Jun', monthNumber: 6,  isForecast: true,  actual: null, p10: 92,  p50: 96,  p80: 104, p90: 110, p95: 116 },
  { period: 'Jul', monthNumber: 7,  isForecast: true,  actual: null, p10: 95,  p50: 104, p80: 114, p90: 122, p95: 130 },
  { period: 'Aug', monthNumber: 8,  isForecast: true,  actual: null, p10: 98,  p50: 112, p80: 126, p90: 136, p95: 146 },
  { period: 'Sep', monthNumber: 9,  isForecast: true,  actual: null, p10: 101, p50: 118, p80: 136, p90: 148, p95: 160 },
  { period: 'Oct', monthNumber: 10, isForecast: true,  actual: null, p10: 104, p50: 126, p80: 148, p90: 160, p95: 172 },
  { period: 'Nov', monthNumber: 11, isForecast: true,  actual: null, p10: 106, p50: 134, p80: 156, p90: 171, p95: 184 },
  { period: 'Dec', monthNumber: 12, isForecast: true,  actual: null, p10: 108, p50: 142, p80: 165, p90: 182, p95: 196 },
];

// ── 3. Forecast Quantiles for Dec 2025 Sub-Panel ───────────────
export const FORECAST_QUANTILES_DEC_MOCK: ForecastQuantilesDec = {
  p95: '196K',
  p90: '182K',
  p80: '165K',
  p50: '142K',
  p10: '108K',
  expectedDemand: '142K units',
  expectedGrowth: '+11.2% vs. Jun 2025',
};

// ── 4. Model Performance Tournament ───────────────────────────
export const MODEL_TOURNAMENT_MOCK: ForecastModelResult[] = [
  {
    modelId: 'naive',
    modelName: 'Naïve (Last Year)',
    wape: '10.8%',
    wapeNum: 10.8,
    bias: '+2.1%',
    status: 'Baseline',
    complexity: 'Low',
    strengths: 'Zero computational overhead; simple benchmark for baseline comparison.',
    limitations: 'Cannot respond to market disruptions, trends, promotions, or seasonality shifts.',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    forecastHorizon: '12 Months',
    architectureType: 'Historical Carryover',
  },
  {
    modelId: 'prophet',
    modelName: 'Prophet',
    wape: '7.4%',
    wapeNum: 7.4,
    bias: '+1.5%',
    status: 'Challenger',
    complexity: 'Moderate',
    strengths: 'Decomposes complex holidays and multi-period seasonality seamlessly.',
    limitations: 'Slower adaptation to sudden macro commodity price shocks.',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    forecastHorizon: '12 Months',
    architectureType: 'Additive Seasonality Regressor',
  },
  {
    modelId: 'xgboost',
    modelName: 'XGBoost',
    wape: '5.8%',
    wapeNum: 5.8,
    bias: '+1.3%',
    status: 'Challenger',
    complexity: 'Moderate',
    strengths: 'Superb non-linear causal interaction capture with lead-time and price inputs.',
    limitations: 'Requires rolling lag feature regeneration across multi-step horizons.',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    forecastHorizon: '12 Months',
    architectureType: 'Gradient Boosted Decision Trees',
  },
  {
    modelId: 'tft',
    modelName: 'Temporal Fusion',
    wape: '5.4%',
    wapeNum: 5.4,
    bias: '+0.9%',
    status: 'Champion',
    complexity: 'High',
    strengths: 'State-of-the-art multi-horizon attention mechanism with interpretable variable selection.',
    limitations: 'Higher computational complexity and GPU training latency.',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    forecastHorizon: '12 Months',
    architectureType: 'Temporal Fusion Transformer (TFT)',
  },
  {
    modelId: 'arima',
    modelName: 'ARIMA',
    wape: '6.8%',
    wapeNum: 6.8,
    bias: '+1.8%',
    status: 'Challenger',
    complexity: 'Low',
    strengths: 'Statistically rigorous autoregressive time-series foundation.',
    limitations: 'Linear structural assumptions degrade during multi-echelon supply disruptions.',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    forecastHorizon: '12 Months',
    architectureType: 'Autoregressive Integrated Moving Average',
  },
  {
    modelId: 'lightgbm',
    modelName: 'LightGBM',
    wape: '6.1%',
    wapeNum: 6.1,
    bias: '+1.2%',
    status: 'Challenger',
    complexity: 'Moderate',
    strengths: 'High training throughput and leaf-wise tree growth efficiency.',
    limitations: 'Can overfit on short-horizon seasonal SKU anomalies.',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    forecastHorizon: '12 Months',
    architectureType: 'Histogram GBDT',
  },
];

// ── 5. Key Forecast Insights (5 Cards on Right) ────────────────
export const KEY_FORECAST_INSIGHTS_MOCK: ForecastInsight[] = [
  {
    id: 'insight-1',
    title: 'Q3 2025 peak expected',
    summary: 'Demand 18% above average',
    iconType: 'peak',
    severity: 'info',
    route: '/solutions/demand-intelligence/overview',
  },
  {
    id: 'insight-2',
    title: 'Packaging demand strong',
    summary: '+22% growth in APAC',
    iconType: 'packaging',
    severity: 'positive',
    route: '/solutions/demand-intelligence/sensing',
  },
  {
    id: 'insight-3',
    title: 'Higher uncertainty in Q4',
    summary: '28 SKUs require attention',
    iconType: 'uncertainty',
    severity: 'warning',
    route: '/solutions/demand-intelligence/inventory',
  },
  {
    id: 'insight-4',
    title: 'Forecast value added improved',
    summary: '+6.2% vs. last cycle',
    iconType: 'fva',
    severity: 'positive',
    route: '/solutions/demand-intelligence/forecast',
  },
  {
    id: 'insight-5',
    title: 'External signals positive',
    summary: 'Pricing and market conditions supportive',
    iconType: 'signals',
    severity: 'positive',
    route: '/solutions/demand-intelligence/drivers',
  },
];

// ── 6. Forecast Value Added (FVA) Waterfall ────────────────────
export const FVA_WATERFALL_MOCK: FvaStage[] = [
  {
    id: 'fva-naive',
    stage: 'Naïve Forecast',
    wape: '10.8%',
    wapeValue: 10.8,
    delta: '10.8%',
    startVal: 0,
    endVal: 10.8,
    type: 'start',
    description: 'Prior-year carryover baseline error before statistical modeling.',
  },
  {
    id: 'fva-stat',
    stage: 'Statistical Model',
    wape: '8.7%',
    wapeValue: -2.1,
    delta: '-2.1%',
    startVal: 10.8,
    endVal: 8.7,
    type: 'reduction',
    description: 'Time-series decomposition, Holt-Winters, and seasonality smoothing.',
  },
  {
    id: 'fva-ml',
    stage: 'Machine Learning',
    wape: '6.9%',
    wapeValue: -1.8,
    delta: '-1.8%',
    startVal: 8.7,
    endVal: 6.9,
    type: 'reduction',
    description: 'Temporal Fusion Transformer with causal market indicators and POS data.',
  },
  {
    id: 'fva-planner',
    stage: 'Planner Adjustment',
    wape: '5.8%',
    wapeValue: -1.1,
    delta: '-1.1%',
    startVal: 6.9,
    endVal: 5.8,
    type: 'reduction',
    description: 'Demand manager overrides incorporating contract shifts and regional quotas.',
  },
  {
    id: 'fva-final',
    stage: 'Final Forecast',
    wape: '5.8%',
    wapeValue: 5.8,
    delta: '5.8%',
    startVal: 0,
    endVal: 5.8,
    type: 'end',
    description: 'Final published operational forecast driving S&OP and material planning.',
  },
];

// ── 7. Forecast by Product Category ───────────────────────────
export const FORECAST_BY_CATEGORY_MOCK: ForecastCategoryDistribution[] = [
  { id: 'cat-hdpe', name: 'HDPE Resin', percent: 38.6, volume: '494K units', color: '#0062d2' },
  { id: 'cat-pp',   name: 'PP Resin',   percent: 24.3, volume: '311K units', color: '#38bdf8' },
  { id: 'cat-lldpe', name: 'LLDPE',     percent: 16.8, volume: '215K units', color: '#10b981' },
  { id: 'cat-pet',  name: 'PET Resin',  percent: 11.2, volume: '143K units', color: '#f59e0b' },
  { id: 'cat-other', name: 'Others',    percent: 9.1,  volume: '117K units', color: '#94a3b8' },
];

// ── 8. Forecast by Region ─────────────────────────────────────
export const FORECAST_BY_REGION_MOCK: ForecastRegionalGrowth[] = [
  { id: 'reg-apac',  region: 'Asia Pacific',        demand: '412K', demandVal: 412, growthYoY: '+11.8%', color: '#0062d2' },
  { id: 'reg-na',    region: 'North America',       demand: '342K', demandVal: 342, growthYoY: '+6.1%',  color: '#0d9488' },
  { id: 'reg-eu',    region: 'Europe',              demand: '281K', demandVal: 281, growthYoY: '+5.3%',  color: '#f59e0b' },
  { id: 'reg-latam', region: 'Latin America',       demand: '138K', demandVal: 138, growthYoY: '+4.7%',  color: '#8b5cf6' },
  { id: 'reg-mea',   region: 'Middle East & Africa', demand: '102K', demandVal: 102, growthYoY: '+3.9%',  color: '#94a3b8' },
];

// ── 9. Top SKUs by Forecast Change ────────────────────────────
export const TOP_SKU_FORECAST_CHANGES_MOCK: ForecastSkuChange[] = [
  {
    id: 'sku-hdpe-001',
    sku: 'HDPE-001',
    product: 'HDPE Resin',
    currentForecast: '182K',
    priorForecast: '142K',
    changeVsPrior: '+28%',
    numericChange: 28,
    confidenceBars: 4,
    confidence: 'High',
    status: 'High',
    championModel: 'Temporal Fusion',
    keyDrivers: 'Packaging demand surge & APAC distributor reorders',
    recommendedAction: 'Review raw polymer buffer and evaluate Plant #04 line capacity.',
  },
  {
    id: 'sku-pp-204',
    sku: 'PP-204',
    product: 'PP Resin',
    currentForecast: '145K',
    priorForecast: '119K',
    changeVsPrior: '+22%',
    numericChange: 22,
    confidenceBars: 3,
    confidence: 'High',
    status: 'High',
    championModel: 'Temporal Fusion',
    keyDrivers: 'Automotive and rigid packaging orders expansion',
    recommendedAction: 'Secure secondary supplier allocation for high-melt monomer.',
  },
  {
    id: 'sku-lldpe-118',
    sku: 'LLDPE-118',
    product: 'LLDPE',
    currentForecast: '112K',
    priorForecast: '95K',
    changeVsPrior: '+18%',
    numericChange: 18,
    confidenceBars: 3,
    confidence: 'Medium',
    status: 'Medium',
    championModel: 'XGBoost',
    keyDrivers: 'Agricultural greenhouse film seasonality pull-forward',
    recommendedAction: 'Coordinate fulfillment schedules with regional distribution centers.',
  },
  {
    id: 'sku-pet-332',
    sku: 'PET-332',
    product: 'PET Resin',
    currentForecast: '98K',
    priorForecast: '85K',
    changeVsPrior: '+15%',
    numericChange: 15,
    confidenceBars: 2,
    confidence: 'Medium',
    status: 'Medium',
    championModel: 'Prophet',
    keyDrivers: 'Beverage bottle pre-summer bottling expansion',
    recommendedAction: 'Monitor ethylene glycol spot price volatility.',
  },
  {
    id: 'sku-hdpe-077',
    sku: 'HDPE-077',
    product: 'HDPE Resin',
    currentForecast: '76K',
    priorForecast: '86K',
    changeVsPrior: '-12%',
    numericChange: -12,
    confidenceBars: 1,
    confidence: 'Low',
    status: 'Low',
    championModel: 'LightGBM',
    keyDrivers: 'Competitor promotional discounting in Midwest corridor',
    recommendedAction: 'Review customer pricing floor and evaluate margin preservation.',
  },
];

// ── 10. Forecast Scenario Comparison ──────────────────────────
export const FORECAST_SCENARIOS_MOCK: ForecastScenario[] = [
  {
    id: 'scen-base',
    name: 'Base Case',
    totalDemand: '1.28M',
    changeVsBase: '—',
    changeNum: 0,
    serviceLevel: '97.8%',
    isBase: true,
    description: 'Current macroeconomic consensus and firm commercial order book.',
  },
  {
    id: 'scen-high-growth',
    name: 'High Growth',
    totalDemand: '1.52M',
    changeVsBase: '+18.8%',
    changeNum: 18.8,
    serviceLevel: '96.4%',
    isBase: false,
    description: 'Accelerated APAC infrastructure spending and rigid packaging demand surge.',
  },
  {
    id: 'scen-commodity-shock',
    name: 'Commodity Shock',
    totalDemand: '1.21M',
    changeVsBase: '-5.5%',
    changeNum: -5.5,
    serviceLevel: '98.1%',
    isBase: false,
    description: 'Crude oil & ethylene feedstock surge dampens downstream converter purchasing.',
  },
  {
    id: 'scen-supply-disrupt',
    name: 'Supply Disruption',
    totalDemand: '1.14M',
    changeVsBase: '-10.9%',
    changeNum: -10.9,
    serviceLevel: '93.2%',
    isBase: false,
    description: 'Maritime shipping bottlenecks restrict catalyst and precursor availability.',
  },
];

// ── 11. AI Recommendation ─────────────────────────────────────
export const FORECAST_AI_RECOMMENDATION_MOCK: ForecastAIRecommendation = {
  title: 'Maintain upward forecast adjustment',
  narrative:
    'Current signals suggest a 11–15% near-term demand uplift, led by Packaging products in APAC. Consider increasing production planning and reviewing inventory positions.',
  ctaText: 'Explore in Scenario Studio →',
  ctaRoute: '/solutions/demand-intelligence/scenarios',
};

// ── 12. Filter Options ─────────────────────────────────────────
export const FORECAST_FILTER_OPTIONS_MOCK: ForecastFilterOptions = {
  plants: [
    'All Plants',
    'Columbus Plant #04',
    'Düsseldorf Plant #01',
    'Jurong Island Facility',
    'Shanghai Plant #09',
  ],
  products: [
    'All Products',
    'HDPE Resin',
    'PP Resin',
    'LLDPE',
    'PET Resin',
  ],
  regions: [
    'All Regions',
    'North America',
    'Europe',
    'Asia Pacific',
    'Latin America',
    'Middle East & Africa',
  ],
  planningPeriods: [
    'FY 2025',
    'FY 2026',
    'Last 12 Months',
  ],
  horizons: [
    '6 Months',
    '12 Months',
    '18 Months',
  ],
};

// ── 13. Forecast Settings ──────────────────────────────────────
export const FORECAST_SETTINGS_MOCK: ForecastSettings = {
  forecastHorizon: '12 Months',
  planningQuantile: 'P90',
  primaryModel: 'Temporal Fusion',
  refreshFrequency: 'Daily',
  forecastCalendar: 'Monthly',
};

// ─────────────────────────────────────────────────────────────
// Backward Compatibility / Legacy Exports (To protect other views)
// ─────────────────────────────────────────────────────────────
export interface ForecastFilterState {
  plant: string;
  category: string;
  sku: string;
  horizon: string;
  planningView: string;
}

export const DEFAULT_FORECAST_FILTERS: ForecastFilterState = {
  plant: 'Columbus Plant #04',
  category: 'Industrial Polymers',
  sku: 'HDPE Resin (SKU-9021)',
  horizon: '12 Months',
  planningView: 'Monthly',
};

export const FORECAST_FILTER_OPTIONS = {
  plants: [
    'Columbus Plant #04',
    'Akron Plant #02',
    'Houston Plant #07',
    'Düsseldorf Plant #01',
  ],
  categories: [
    'Industrial Polymers',
    'Specialty Composites',
    'Thermoplastics',
    'Elastomer Blends',
  ],
  skus: [
    'HDPE Resin (SKU-9021)',
    'LDPE Film Grade (SKU-4487)',
    'PP Copolymer (SKU-7763)',
    'Linear Low Density (SKU-1029)',
  ],
  horizons: ['3 Months', '6 Months', '12 Months', '24 Months'],
  planningViews: ['Monthly', 'Quarterly'],
};

export interface ForecastKpiItem {
  id: string;
  title: string;
  value: string;
  subtext?: string;
  isPositive?: boolean;
  statusBadge?: string;
  type: 'accuracy' | 'mape' | 'rmse' | 'r2' | 'bias';
}

export const FORECAST_KPIS: ForecastKpiItem[] = [
  {
    id: 'accuracy',
    title: 'Forecast Accuracy',
    value: '94.2%',
    subtext: '+3.1% vs. last year',
    isPositive: true,
    type: 'accuracy',
  },
  {
    id: 'mape',
    title: 'MAPE',
    value: '5.8%',
    subtext: '-1.2% vs. last year',
    isPositive: true,
    type: 'mape',
  },
  {
    id: 'rmse',
    title: 'RMSE',
    value: '14.7',
    subtext: '-8.6% vs. last year',
    isPositive: true,
    type: 'rmse',
  },
  {
    id: 'r2',
    title: 'R² (Model Fit)',
    value: '0.93',
    subtext: '+0.04 vs. last year',
    isPositive: true,
    type: 'r2',
  },
  {
    id: 'bias',
    title: 'Forecast Bias',
    value: '+1.3%',
    statusBadge: 'Within acceptable range',
    type: 'bias',
  },
];

export interface ForecastTimelinePoint {
  index: number;
  dateStr: string;
  month: string;
  year: number;
  actual: number | null;
  forecast: number | null;
  ciLower: number | null;
  ciUpper: number | null;
  isToday?: boolean;
  yoy?: string;
}

export const HISTORICAL_AND_FORECAST_SERIES: ForecastTimelinePoint[] = [
  { index: 0,  dateStr: 'Jan 2025', month: 'Jan', year: 2025, actual: 10200, forecast: null, ciLower: null, ciUpper: null, yoy: '+4.2%' },
  { index: 1,  dateStr: 'Feb 2025', month: 'Feb', year: 2025, actual: 12400, forecast: null, ciLower: null, ciUpper: null, yoy: '+5.1%' },
  { index: 2,  dateStr: 'Mar 2025', month: 'Mar', year: 2025, actual: 14800, forecast: null, ciLower: null, ciUpper: null, yoy: '+5.8%' },
  { index: 3,  dateStr: 'Apr 2025', month: 'Apr', year: 2025, actual: 15200, forecast: null, ciLower: null, ciUpper: null, yoy: '+6.0%' },
  { index: 4,  dateStr: 'May 2025', month: 'May', year: 2025, actual: 13900, forecast: null, ciLower: null, ciUpper: null, yoy: '+4.9%' },
  { index: 5,  dateStr: 'Jun 2025', month: 'Jun', year: 2025, actual: 15600, forecast: null, ciLower: null, ciUpper: null, yoy: '+6.2%' },
  { index: 6,  dateStr: 'Jul 2025', month: 'Jul', year: 2025, actual: 17200, forecast: null, ciLower: null, ciUpper: null, yoy: '+6.9%' },
  { index: 7,  dateStr: 'Aug 2025', month: 'Aug', year: 2025, actual: 18100, forecast: null, ciLower: null, ciUpper: null, yoy: '+7.1%' },
  { index: 8,  dateStr: 'Sep 2025', month: 'Sep', year: 2025, actual: 19800, forecast: 19800, ciLower: 19800, ciUpper: 19800, isToday: true, yoy: '+7.4%' },
  { index: 9,  dateStr: 'Oct 2025', month: 'Oct', year: 2025, actual: null, forecast: 20900, ciLower: 19400, ciUpper: 22400, yoy: '+7.6%' },
  { index: 10, dateStr: 'Nov 2025', month: 'Nov', year: 2025, actual: null, forecast: 21800, ciLower: 20000, ciUpper: 23600, yoy: '+7.8%' },
  { index: 11, dateStr: 'Dec 2025', month: 'Dec', year: 2025, actual: null, forecast: 22600, ciLower: 20600, ciUpper: 24600, yoy: '+8.0%' },
  { index: 12, dateStr: 'Jan 2026', month: 'Jan', year: 2026, actual: null, forecast: 23800, ciLower: 21400, ciUpper: 26200, yoy: '+6.2%' },
  { index: 13, dateStr: 'Feb 2026', month: 'Feb', year: 2026, actual: null, forecast: 24900, ciLower: 22300, ciUpper: 27500, yoy: '+6.8%' },
  { index: 14, dateStr: 'Mar 2026', month: 'Mar', year: 2026, actual: null, forecast: 26100, ciLower: 23200, ciUpper: 29000, yoy: '+7.1%' },
  { index: 15, dateStr: 'Apr 2026', month: 'Apr', year: 2026, actual: null, forecast: 27400, ciLower: 24200, ciUpper: 30600, yoy: '+8.4%' },
  { index: 16, dateStr: 'May 2026', month: 'May', year: 2026, actual: null, forecast: 28900, ciLower: 25400, ciUpper: 32400, yoy: '+9.1%' },
  { index: 17, dateStr: 'Jun 2026', month: 'Jun', year: 2026, actual: null, forecast: 30400, ciLower: 26600, ciUpper: 34200, yoy: '+9.8%' },
  { index: 18, dateStr: 'Jul 2026', month: 'Jul', year: 2026, actual: null, forecast: 32600, ciLower: 28400, ciUpper: 36800, yoy: '+10.2%' },
  { index: 19, dateStr: 'Aug 2026', month: 'Aug', year: 2026, actual: null, forecast: 34200, ciLower: 29600, ciUpper: 38800, yoy: '+10.6%' },
  { index: 20, dateStr: 'Sep 2026', month: 'Sep', year: 2026, actual: null, forecast: 36100, ciLower: 31000, ciUpper: 41200, yoy: '+11.0%' },
  { index: 21, dateStr: 'Oct 2026', month: 'Oct', year: 2026, actual: null, forecast: 36800, ciLower: 31400, ciUpper: 42200, yoy: '+10.4%' },
  { index: 22, dateStr: 'Nov 2026', month: 'Nov', year: 2026, actual: null, forecast: 37400, ciLower: 31800, ciUpper: 43000, yoy: '+9.9%' },
  { index: 23, dateStr: 'Dec 2026', month: 'Dec', year: 2026, actual: null, forecast: 38200, ciLower: 32200, ciUpper: 44200, yoy: '+9.5%' },
];

export interface ForecastModelInfo {
  id: string;
  name: string;
  modelType: string;
  trainingPeriod: string;
  horizon: string;
  keyDrivers: string;
  lastTrained: string;
  status: 'Active' | 'Candidate' | 'Benchmark';
}

export const FORECAST_MODELS: Record<string, ForecastModelInfo> = {
  'xgboost': {
    id: 'xgboost',
    name: 'XGBoost (Selected)',
    modelType: 'XGBoost Regressor',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    horizon: '12 Months',
    keyDrivers: 'Price, Closing Stock, Lead Time, Marketing',
    lastTrained: 'Jan 15, 2025',
    status: 'Active',
  },
  'prophet': {
    id: 'prophet',
    name: 'Prophet',
    modelType: 'Additive Seasonality Regressor',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    horizon: '12 Months',
    keyDrivers: 'Trend, Weekly/Yearly Seasonality',
    lastTrained: 'Jan 15, 2025',
    status: 'Candidate',
  },
  'holt-winters': {
    id: 'holt-winters',
    name: 'Holt-Winters',
    modelType: 'Triple Exponential Smoothing',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    horizon: '12 Months',
    keyDrivers: 'Level, Trend, Multiplicative Seasonality',
    lastTrained: 'Jan 15, 2025',
    status: 'Candidate',
  },
  'naive': {
    id: 'naive',
    name: 'Naive Baseline',
    modelType: 'Prior Period Carryover',
    trainingPeriod: 'Jan 2020 – Dec 2024',
    horizon: '12 Months',
    keyDrivers: 'Prior 12M Volume',
    lastTrained: 'Jan 15, 2025',
    status: 'Benchmark',
  },
};

export const AI_FORECAST_INSIGHT = {
  badge: 'High Confidence',
  narrative:
    'Demand is expected to grow by 7.4% over the next 12 months, with the highest demand in Q3 2026. Seasonal patterns and price sensitivity are the key drivers. Current inventory levels are sufficient for the base forecast.',
};

export interface QuarterBarItem {
  quarter: string;
  volumeLabel: string;
  volumeValue: number;
  type: 'actual' | 'forecast';
}

export const QUARTERLY_FORECAST_BARS: QuarterBarItem[] = [
  { quarter: 'Q1 2025', volumeLabel: '62.1K', volumeValue: 62.1, type: 'actual' },
  { quarter: 'Q2 2025', volumeLabel: '68.4K', volumeValue: 68.4, type: 'actual' },
  { quarter: 'Q3 2025', volumeLabel: '71.2K', volumeValue: 71.2, type: 'actual' },
  { quarter: 'Q4 2025', volumeLabel: '78.6K', volumeValue: 78.6, type: 'actual' },
  { quarter: 'Q1 2026', volumeLabel: '82.4K', volumeValue: 82.4, type: 'forecast' },
  { quarter: 'Q2 2026', volumeLabel: '89.1K', volumeValue: 89.1, type: 'forecast' },
  { quarter: 'Q3 2026', volumeLabel: '96.8K', volumeValue: 96.8, type: 'forecast' },
  { quarter: 'Q4 2026', volumeLabel: '102.3K', volumeValue: 102.3, type: 'forecast' },
];

export interface MonthlyTableRow {
  month: string;
  forecast: number;
  lowerBound: number;
  upperBound: number;
  yoyChange: string;
}

export const MONTHLY_FORECAST_TABLE_DATA: MonthlyTableRow[] = [
  { month: 'Jan 2026', forecast: 30400, lowerBound: 26800, upperBound: 34000, yoyChange: '+6.2%' },
  { month: 'Feb 2026', forecast: 31200, lowerBound: 27500, upperBound: 34900, yoyChange: '+6.8%' },
  { month: 'Mar 2026', forecast: 32100, lowerBound: 28300, upperBound: 35900, yoyChange: '+7.1%' },
  { month: 'Apr 2026', forecast: 33400, lowerBound: 29600, upperBound: 37200, yoyChange: '+8.4%' },
  { month: 'May 2026', forecast: 34800, lowerBound: 30900, upperBound: 38700, yoyChange: '+9.1%' },
  { month: 'Jun 2026', forecast: 36100, lowerBound: 32000, upperBound: 40200, yoyChange: '+9.8%' },
  { month: 'Jul 2026', forecast: 38500, lowerBound: 34100, upperBound: 42900, yoyChange: '+10.2%' },
  { month: 'Aug 2026', forecast: 40200, lowerBound: 35500, upperBound: 44900, yoyChange: '+10.6%' },
  { month: 'Sep 2026', forecast: 42100, lowerBound: 37000, upperBound: 47200, yoyChange: '+11.0%' },
  { month: 'Oct 2026', forecast: 39400, lowerBound: 34200, upperBound: 44600, yoyChange: '+10.4%' },
  { month: 'Nov 2026', forecast: 37800, lowerBound: 32600, upperBound: 43000, yoyChange: '+9.9%' },
  { month: 'Dec 2026', forecast: 36500, lowerBound: 31200, upperBound: 41800, yoyChange: '+9.5%' },
];

export const KEY_TAKEAWAYS: string[] = [
  'Demand is projected to grow 7.4% in the next 12 months.',
  'Q3 2026 is the peak demand period (+10.1% vs. Q3 2025).',
  'Forecast accuracy remains above 90% across all products.',
  'Price and market conditions are the top demand drivers.',
  'Plan inventory and sourcing to avoid constraint in Q3 2026.',
];
