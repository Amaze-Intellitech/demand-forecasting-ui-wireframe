// ─────────────────────────────────────────────────────────────
// AITEK Demand Intelligence — Demand Forecast Mock Data
// Screen 03 / 06: Forward Planning & Confidence Layer
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

// ── 5 Forecast Quality KPIs ───────────────────────────────────
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
    isPositive: true, // lower is better
    type: 'mape',
  },
  {
    id: 'rmse',
    title: 'RMSE',
    value: '14.7',
    subtext: '-8.6% vs. last year',
    isPositive: true, // lower is better
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

// ── Historical & Forecast Time Series (24 Months: Jan 2025 - Dec 2026) ──
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
  // Historical Actuals (Jan 2025 - Sep 2025)
  { index: 0,  dateStr: 'Jan 2025', month: 'Jan', year: 2025, actual: 10200, forecast: null, ciLower: null, ciUpper: null, yoy: '+4.2%' },
  { index: 1,  dateStr: 'Feb 2025', month: 'Feb', year: 2025, actual: 12400, forecast: null, ciLower: null, ciUpper: null, yoy: '+5.1%' },
  { index: 2,  dateStr: 'Mar 2025', month: 'Mar', year: 2025, actual: 14800, forecast: null, ciLower: null, ciUpper: null, yoy: '+5.8%' },
  { index: 3,  dateStr: 'Apr 2025', month: 'Apr', year: 2025, actual: 15200, forecast: null, ciLower: null, ciUpper: null, yoy: '+6.0%' },
  { index: 4,  dateStr: 'May 2025', month: 'May', year: 2025, actual: 13900, forecast: null, ciLower: null, ciUpper: null, yoy: '+4.9%' },
  { index: 5,  dateStr: 'Jun 2025', month: 'Jun', year: 2025, actual: 15600, forecast: null, ciLower: null, ciUpper: null, yoy: '+6.2%' },
  { index: 6,  dateStr: 'Jul 2025', month: 'Jul', year: 2025, actual: 17200, forecast: null, ciLower: null, ciUpper: null, yoy: '+6.9%' },
  { index: 7,  dateStr: 'Aug 2025', month: 'Aug', year: 2025, actual: 18100, forecast: null, ciLower: null, ciUpper: null, yoy: '+7.1%' },
  { index: 8,  dateStr: 'Sep 2025', month: 'Sep', year: 2025, actual: 19800, forecast: 19800, ciLower: 19800, ciUpper: 19800, isToday: true, yoy: '+7.4%' },

  // Projected Forecast Horizon (Oct 2025 - Dec 2026)
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

// ── Forecast Models Configuration ──────────────────────────────
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

// ── AI Insight Narrative ───────────────────────────────────────
export const AI_FORECAST_INSIGHT = {
  badge: 'High Confidence',
  narrative:
    'Demand is expected to grow by 7.4% over the next 12 months, with the highest demand in Q3 2026. Seasonal patterns and price sensitivity are the key drivers. Current inventory levels are sufficient for the base forecast.',
};

// ── Forecast by Quarter (8 Quarters) ───────────────────────────
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

// ── Monthly Forecast Table Rows (2026 Forward Horizon) ─────────
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
  // Additional rows for the modal/expanded view
  { month: 'Jul 2026', forecast: 38500, lowerBound: 34100, upperBound: 42900, yoyChange: '+10.2%' },
  { month: 'Aug 2026', forecast: 40200, lowerBound: 35500, upperBound: 44900, yoyChange: '+10.6%' },
  { month: 'Sep 2026', forecast: 42100, lowerBound: 37000, upperBound: 47200, yoyChange: '+11.0%' },
  { month: 'Oct 2026', forecast: 39400, lowerBound: 34200, upperBound: 44600, yoyChange: '+10.4%' },
  { month: 'Nov 2026', forecast: 37800, lowerBound: 32600, upperBound: 43000, yoyChange: '+9.9%' },
  { month: 'Dec 2026', forecast: 36500, lowerBound: 31200, upperBound: 41800, yoyChange: '+9.5%' },
];

// ── Key Takeaways ──────────────────────────────────────────────
export const KEY_TAKEAWAYS: string[] = [
  'Demand is projected to grow 7.4% in the next 12 months.',
  'Q3 2026 is the peak demand period (+10.1% vs. Q3 2025).',
  'Forecast accuracy remains above 90% across all products.',
  'Price and market conditions are the top demand drivers.',
  'Plan inventory and sourcing to avoid constraint in Q3 2026.',
];
