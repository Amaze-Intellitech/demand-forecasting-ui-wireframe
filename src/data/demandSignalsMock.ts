// ─────────────────────────────────────────────────────────────
// AITEK Demand Intelligence — Demand Signals Mock Data
// Screen 02 / 06: Signal Interpretation Layer
// ─────────────────────────────────────────────────────────────

export interface HierarchyOption {
  id: string;
  label: string;
}

export interface HierarchyState {
  enterprise: string;
  division: string;
  plant: string;
  category: string;
  sku: string;
}

export const DEFAULT_HIERARCHY: HierarchyState = {
  enterprise: 'Global Industrial Materials Corp',
  division: 'Advanced Materials',
  plant: 'Columbus #04',
  category: 'Industrial Polymers',
  sku: 'HDPE Resin (SKU-9021)',
};

export const ENTERPRISE_OPTIONS: HierarchyOption[] = [
  { id: 'gimc', label: 'Global Industrial Materials Corp' },
  { id: 'apex', label: 'Apex Materials Holding' },
  { id: 'omni', label: 'OmniChem Global' },
  { id: 'titan', label: 'Titan Industrial Group' },
];

export const DIVISION_OPTIONS: HierarchyOption[] = [
  { id: 'adv-mat', label: 'Advanced Materials' },
  { id: 'perf-poly', label: 'Performance Polymers' },
  { id: 'basic-chem', label: 'Basic Chemicals' },
  { id: 'spec-add', label: 'Specialty Additives' },
];

export const PLANT_OPTIONS: HierarchyOption[] = [
  { id: 'columbus-04', label: 'Columbus #04' },
  { id: 'akron-02', label: 'Akron #02' },
  { id: 'houston-07', label: 'Houston #07' },
  { id: 'dusseldorf-01', label: 'Dusseldorf #01' },
];

export const CATEGORY_OPTIONS: HierarchyOption[] = [
  { id: 'ind-polymers', label: 'Industrial Polymers' },
  { id: 'eng-resins', label: 'Engineering Resins' },
  { id: 'polyolefins', label: 'Polyolefins' },
  { id: 'elastomers', label: 'Elastomers' },
];

export const SKU_OPTIONS: HierarchyOption[] = [
  { id: 'sku-9021', label: 'HDPE Resin (SKU-9021)' },
  { id: 'sku-8840', label: 'LDPE Film (SKU-8840)' },
  { id: 'sku-7731', label: 'PP Copolymer (SKU-7731)' },
  { id: 'sku-6612', label: 'Linear Low Density (SKU-6612)' },
];

// ── 5 Signal Summary Cards ────────────────────────────────────
export interface SignalCardItem {
  id: string;
  title: string;
  value: string;
  supporting: string;
  type: 'trend' | 'seasonality' | 'volatility' | 'price' | 'forecast';
}

export const SIGNAL_SUMMARY_CARDS: SignalCardItem[] = [
  {
    id: 'trend',
    title: 'Demand Trend',
    value: 'Increasing',
    supporting: '+7.4% CAGR (2020–2025)',
    type: 'trend',
  },
  {
    id: 'seasonality',
    title: 'Seasonality',
    value: 'Strong',
    supporting: 'Q3 peak consistently',
    type: 'seasonality',
  },
  {
    id: 'volatility',
    title: 'Volatility',
    value: 'Moderate',
    supporting: 'CV: 18.6%',
    type: 'volatility',
  },
  {
    id: 'price',
    title: 'Price Sensitivity',
    value: 'High',
    supporting: 'Elasticity: -1.32',
    type: 'price',
  },
  {
    id: 'forecastability',
    title: 'Forecastability',
    value: 'High',
    supporting: 'Model R²: 0.93',
    type: 'forecast',
  },
];

// ── Historical Demand Trend Time Series (2020 - 2025) ──────────
export interface HistoricalDataPoint {
  index: number;
  year: number;
  month: number;
  monthName: string;
  dateStr: string;
  actualDemand: number;
  movingAverage: number;
}

export interface KeyEventZone {
  id: string;
  label: string;
  sublabel?: string;
  startMonthIndex: number; // 0 to 71
  endMonthIndex: number;
  indicatorIndex: number;
}

export const KEY_EVENT_ZONES: KeyEventZone[] = [
  {
    id: 'covid-shock',
    label: 'Demand Shock',
    sublabel: '(COVID-19)',
    startMonthIndex: 2,  // Mar 2020
    endMonthIndex: 7,    // Aug 2020
    indicatorIndex: 4,   // May 2020
  },
  {
    id: 'recovery',
    label: 'Market Recovery',
    startMonthIndex: 35, // Dec 2022
    endMonthIndex: 41,   // Jun 2023
    indicatorIndex: 38,  // Mar 2023
  },
  {
    id: 'new-regime',
    label: 'New Growth Regime',
    startMonthIndex: 59, // Dec 2024
    endMonthIndex: 64,   // May 2025
    indicatorIndex: 61,  // Feb 2025
  },
];

// 72 monthly points from Jan 2020 to Dec 2025 with realistic seasonal and macroeconomic variation
export const HISTORICAL_DEMAND_SERIES: HistoricalDataPoint[] = [
  // 2020: Baseline & Shock
  { index: 0, year: 2020, month: 1, monthName: 'Jan', dateStr: 'Jan 2020', actualDemand: 13200, movingAverage: 12900 },
  { index: 1, year: 2020, month: 2, monthName: 'Feb', dateStr: 'Feb 2020', actualDemand: 12800, movingAverage: 12950 },
  { index: 2, year: 2020, month: 3, monthName: 'Mar', dateStr: 'Mar 2020', actualDemand: 10800, movingAverage: 12600 },
  { index: 3, year: 2020, month: 4, monthName: 'Apr', dateStr: 'Apr 2020', actualDemand: 8900,  movingAverage: 12100 },
  { index: 4, year: 2020, month: 5, monthName: 'May', dateStr: 'May 2020', actualDemand: 11200, movingAverage: 11900 },
  { index: 5, year: 2020, month: 6, monthName: 'Jun', dateStr: 'Jun 2020', actualDemand: 12600, movingAverage: 11800 },
  { index: 6, year: 2020, month: 7, monthName: 'Jul', dateStr: 'Jul 2020', actualDemand: 14800, movingAverage: 11950 },
  { index: 7, year: 2020, month: 8, monthName: 'Aug', dateStr: 'Aug 2020', actualDemand: 15400, movingAverage: 12100 },
  { index: 8, year: 2020, month: 9, monthName: 'Sep', dateStr: 'Sep 2020', actualDemand: 14200, movingAverage: 12250 },
  { index: 9, year: 2020, month: 10, monthName: 'Oct', dateStr: 'Oct 2020', actualDemand: 12400, movingAverage: 12300 },
  { index: 10, year: 2020, month: 11, monthName: 'Nov', dateStr: 'Nov 2020', actualDemand: 11600, movingAverage: 12350 },
  { index: 11, year: 2020, month: 12, monthName: 'Dec', dateStr: 'Dec 2020', actualDemand: 9800,  movingAverage: 12310 },

  // 2021: Gradual Rebound
  { index: 12, year: 2021, month: 1, monthName: 'Jan', dateStr: 'Jan 2021', actualDemand: 11500, movingAverage: 12170 },
  { index: 13, year: 2021, month: 2, monthName: 'Feb', dateStr: 'Feb 2021', actualDemand: 10900, movingAverage: 12010 },
  { index: 14, year: 2021, month: 3, monthName: 'Mar', dateStr: 'Mar 2021', actualDemand: 13400, movingAverage: 12230 },
  { index: 15, year: 2021, month: 4, monthName: 'Apr', dateStr: 'Apr 2021', actualDemand: 14900, movingAverage: 12730 },
  { index: 16, year: 2021, month: 5, monthName: 'May', dateStr: 'May 2021', actualDemand: 16800, movingAverage: 13200 },
  { index: 17, year: 2021, month: 6, monthName: 'Jun', dateStr: 'Jun 2021', actualDemand: 18200, movingAverage: 13660 },
  { index: 18, year: 2021, month: 7, monthName: 'Jul', dateStr: 'Jul 2021', actualDemand: 21200, movingAverage: 14200 },
  { index: 19, year: 2021, month: 8, monthName: 'Aug', dateStr: 'Aug 2021', actualDemand: 22600, movingAverage: 14800 },
  { index: 20, year: 2021, month: 9, monthName: 'Sep', dateStr: 'Sep 2021', actualDemand: 19400, movingAverage: 15230 },
  { index: 21, year: 2021, month: 10, monthName: 'Oct', dateStr: 'Oct 2021', actualDemand: 17100, movingAverage: 15620 },
  { index: 22, year: 2021, month: 11, monthName: 'Nov', dateStr: 'Nov 2021', actualDemand: 15800, movingAverage: 15970 },
  { index: 23, year: 2021, month: 12, monthName: 'Dec', dateStr: 'Dec 2021', actualDemand: 13900, movingAverage: 16310 },

  // 2022: Strong Seasonal Expansion
  { index: 24, year: 2022, month: 1, monthName: 'Jan', dateStr: 'Jan 2022', actualDemand: 15600, movingAverage: 16650 },
  { index: 25, year: 2022, month: 2, monthName: 'Feb', dateStr: 'Feb 2022', actualDemand: 16400, movingAverage: 17110 },
  { index: 26, year: 2022, month: 3, monthName: 'Mar', dateStr: 'Mar 2022', actualDemand: 19200, movingAverage: 17590 },
  { index: 27, year: 2022, month: 4, monthName: 'Apr', dateStr: 'Apr 2022', actualDemand: 21500, movingAverage: 18140 },
  { index: 28, year: 2022, month: 5, monthName: 'May', dateStr: 'May 2022', actualDemand: 24100, movingAverage: 18750 },
  { index: 29, year: 2022, month: 6, monthName: 'Jun', dateStr: 'Jun 2022', actualDemand: 26800, movingAverage: 19470 },
  { index: 30, year: 2022, month: 7, monthName: 'Jul', dateStr: 'Jul 2022', actualDemand: 29400, movingAverage: 20150 },
  { index: 31, year: 2022, month: 8, monthName: 'Aug', dateStr: 'Aug 2022', actualDemand: 30200, movingAverage: 20780 },
  { index: 32, year: 2022, month: 9, monthName: 'Sep', dateStr: 'Sep 2022', actualDemand: 26100, movingAverage: 21340 },
  { index: 33, year: 2022, month: 10, monthName: 'Oct', dateStr: 'Oct 2022', actualDemand: 22800, movingAverage: 21820 },
  { index: 34, year: 2022, month: 11, monthName: 'Nov', dateStr: 'Nov 2022', actualDemand: 19600, movingAverage: 22130 },
  { index: 35, year: 2022, month: 12, monthName: 'Dec', dateStr: 'Dec 2022', actualDemand: 16200, movingAverage: 22330 },

  // 2023: Volatility & Market Recovery
  { index: 36, year: 2023, month: 1, monthName: 'Jan', dateStr: 'Jan 2023', actualDemand: 17800, movingAverage: 22510 },
  { index: 37, year: 2023, month: 2, monthName: 'Feb', dateStr: 'Feb 2023', actualDemand: 18900, movingAverage: 22720 },
  { index: 38, year: 2023, month: 3, monthName: 'Mar', dateStr: 'Mar 2023', actualDemand: 22400, movingAverage: 22990 },
  { index: 39, year: 2023, month: 4, monthName: 'Apr', dateStr: 'Apr 2023', actualDemand: 25100, movingAverage: 23290 },
  { index: 40, year: 2023, month: 5, monthName: 'May', dateStr: 'May 2023', actualDemand: 27900, movingAverage: 23610 },
  { index: 41, year: 2023, month: 6, monthName: 'Jun', dateStr: 'Jun 2023', actualDemand: 30800, movingAverage: 23940 },
  { index: 42, year: 2023, month: 7, monthName: 'Jul', dateStr: 'Jul 2023', actualDemand: 34200, movingAverage: 24340 },
  { index: 43, year: 2023, month: 8, monthName: 'Aug', dateStr: 'Aug 2023', actualDemand: 34900, movingAverage: 24730 },
  { index: 44, year: 2023, month: 9, monthName: 'Sep', dateStr: 'Sep 2023', actualDemand: 29800, movingAverage: 25040 },
  { index: 45, year: 2023, month: 10, monthName: 'Oct', dateStr: 'Oct 2023', actualDemand: 26500, movingAverage: 25350 },
  { index: 46, year: 2023, month: 11, monthName: 'Nov', dateStr: 'Nov 2023', actualDemand: 23100, movingAverage: 25640 },
  { index: 47, year: 2023, month: 12, monthName: 'Dec', dateStr: 'Dec 2023', actualDemand: 20400, movingAverage: 25990 },

  // 2024: Sustained Growth
  { index: 48, year: 2024, month: 1, monthName: 'Jan', dateStr: 'Jan 2024', actualDemand: 22100, movingAverage: 26350 },
  { index: 49, year: 2024, month: 2, monthName: 'Feb', dateStr: 'Feb 2024', actualDemand: 23400, movingAverage: 26720 },
  { index: 50, year: 2024, month: 3, monthName: 'Mar', dateStr: 'Mar 2024', actualDemand: 26800, movingAverage: 27090 },
  { index: 51, year: 2024, month: 4, monthName: 'Apr', dateStr: 'Apr 2024', actualDemand: 29600, movingAverage: 27460 },
  { index: 52, year: 2024, month: 5, monthName: 'May', dateStr: 'May 2024', actualDemand: 32500, movingAverage: 27850 },
  { index: 53, year: 2024, month: 6, monthName: 'Jun', dateStr: 'Jun 2024', actualDemand: 35900, movingAverage: 28270 },
  { index: 54, year: 2024, month: 7, monthName: 'Jul', dateStr: 'Jul 2024', actualDemand: 38800, movingAverage: 28650 },
  { index: 55, year: 2024, month: 8, monthName: 'Aug', dateStr: 'Aug 2024', actualDemand: 39600, movingAverage: 29040 },
  { index: 56, year: 2024, month: 9, monthName: 'Sep', dateStr: 'Sep 2024', actualDemand: 34100, movingAverage: 29400 },
  { index: 57, year: 2024, month: 10, monthName: 'Oct', dateStr: 'Oct 2024', actualDemand: 30800, movingAverage: 29760 },
  { index: 58, year: 2024, month: 11, monthName: 'Nov', dateStr: 'Nov 2024', actualDemand: 27500, movingAverage: 30120 },
  { index: 59, year: 2024, month: 12, monthName: 'Dec', dateStr: 'Dec 2024', actualDemand: 24200, movingAverage: 30440 },

  // 2025: New Regime Peak
  { index: 60, year: 2025, month: 1, monthName: 'Jan', dateStr: 'Jan 2025', actualDemand: 26800, movingAverage: 30830 },
  { index: 61, year: 2025, month: 2, monthName: 'Feb', dateStr: 'Feb 2025', actualDemand: 28500, movingAverage: 31250 },
  { index: 62, year: 2025, month: 3, monthName: 'Mar', dateStr: 'Mar 2025', actualDemand: 32200, movingAverage: 31700 },
  { index: 63, year: 2025, month: 4, monthName: 'Apr', dateStr: 'Apr 2025', actualDemand: 35800, movingAverage: 32220 },
  { index: 64, year: 2025, month: 5, monthName: 'May', dateStr: 'May 2025', actualDemand: 38900, movingAverage: 32750 },
  { index: 65, year: 2025, month: 6, monthName: 'Jun', dateStr: 'Jun 2025', actualDemand: 42100, movingAverage: 33270 },
  { index: 66, year: 2025, month: 7, monthName: 'Jul', dateStr: 'Jul 2025', actualDemand: 45200, movingAverage: 33800 },
  { index: 67, year: 2025, month: 8, monthName: 'Aug', dateStr: 'Aug 2025', actualDemand: 46100, movingAverage: 34340 },
  { index: 68, year: 2025, month: 9, monthName: 'Sep', dateStr: 'Sep 2025', actualDemand: 40800, movingAverage: 34900 },
  { index: 69, year: 2025, month: 10, monthName: 'Oct', dateStr: 'Oct 2025', actualDemand: 36500, movingAverage: 35380 },
  { index: 70, year: 2025, month: 11, monthName: 'Nov', dateStr: 'Nov 2025', actualDemand: 32400, movingAverage: 35790 },
  { index: 71, year: 2025, month: 12, monthName: 'Dec', dateStr: 'Dec 2025', actualDemand: 29800, movingAverage: 36260 },
];

// ── Top Demand Drivers ─────────────────────────────────────────
export type DriverMetricType = 'importance' | 'correlation' | 'impact';

export interface DemandDriverItem {
  id: string;
  name: string;
  importancePct: number;
  correlation: number;
  impactLabel: string;
}

export const TOP_DEMAND_DRIVERS: DemandDriverItem[] = [
  {
    id: 'price',
    name: 'Price',
    importancePct: 87.1,
    correlation: -0.84,
    impactLabel: '$4.2M demand shift',
  },
  {
    id: 'closing-stock',
    name: 'Closing Stock',
    importancePct: 5.3,
    correlation: 0.32,
    impactLabel: '$480K buffer variance',
  },
  {
    id: 'lead-time',
    name: 'Lead Time',
    importancePct: 4.6,
    correlation: -0.28,
    impactLabel: '$390K delay impact',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    importancePct: 2.0,
    correlation: 0.19,
    impactLabel: '$180K campaign lift',
  },
  {
    id: 'supplier-reliability',
    name: 'Supplier Reliability',
    importancePct: 1.1,
    correlation: 0.15,
    impactLabel: '$95K fulfillment variance',
  },
];

// ── 10-Year Seasonality Heatmap Matrix (2016-2025) ─────────────
export const HEATMAP_YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
export const HEATMAP_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Intensity scale: 1 (Lowest, pale sky blue) to 5 (Peak, deep cobalt blue)
// Q3 (Jul, Aug, Sep) consistently shows highest intensity (4-5) across years
export const SEASONALITY_HEATMAP_DATA: Record<number, number[]> = {
  2016: [1, 1, 2, 2, 3, 3, 4, 5, 4, 3, 2, 1],
  2017: [1, 2, 2, 2, 3, 4, 5, 5, 4, 3, 2, 1],
  2018: [1, 1, 2, 2, 3, 4, 5, 5, 4, 3, 2, 2],
  2019: [1, 2, 2, 3, 3, 4, 5, 5, 4, 3, 2, 1],
  2020: [1, 1, 1, 1, 2, 3, 4, 4, 3, 2, 2, 1], // COVID shock suppression
  2021: [1, 1, 2, 2, 3, 4, 5, 5, 4, 3, 2, 2],
  2022: [2, 2, 2, 3, 4, 4, 5, 5, 5, 3, 2, 2],
  2023: [2, 2, 3, 3, 4, 5, 5, 5, 4, 3, 3, 2],
  2024: [2, 2, 3, 3, 4, 5, 5, 5, 5, 4, 3, 2],
  2025: [2, 3, 3, 4, 4, 5, 5, 5, 5, 4, 3, 3],
};

// ── Structural Changes Timeline ────────────────────────────────
export interface StructuralEvent {
  year: number;
  label: string;
  isAccent?: boolean;
}

export const STRUCTURAL_EVENTS: StructuralEvent[] = [
  { year: 2019, label: 'Stable Demand' },
  { year: 2021, label: 'Demand Shock' },
  { year: 2023, label: 'Recovery', isAccent: true },
  { year: 2025, label: 'New Regime' },
];

export const STRUCTURAL_INSIGHT = {
  title: 'What changed?',
  description:
    'A structural demand shift was detected in Q3 2023, followed by a sustained growth regime. Price sensitivity has increased significantly over the last two years.',
};

// ── Demand by Segment Donut Data ───────────────────────────────
export interface SegmentShare {
  id: string;
  name: string;
  sharePct: number;
  color: string;
  volumeUnits: number;
}

export const DEMAND_BY_SEGMENT: SegmentShare[] = [
  { id: 'hdpe', name: 'HDPE Resin', sharePct: 42, color: '#0062d2', volumeUnits: 53928 },
  { id: 'ldpe', name: 'LDPE Resin', sharePct: 24, color: '#38bdf8', volumeUnits: 30816 },
  { id: 'pp', name: 'PP Resin', sharePct: 18, color: '#22d3ee', volumeUnits: 23112 },
  { id: 'other-polymers', name: 'Other Polymers', sharePct: 10, color: '#5eead4', volumeUnits: 12840 },
  { id: 'spec-chem', name: 'Specialty Chemicals', sharePct: 6, color: '#cbd5e1', volumeUnits: 7704 },
];

export const TOTAL_SEGMENT_VOLUME = {
  value: '128.4K',
  units: 'Units',
};

// ── Business Interpretation ───────────────────────────────────
export const BUSINESS_INTERPRETATION = {
  title: 'Business Interpretation',
  description:
    'Demand is on a clear upward trajectory, driven by higher prices and improving market conditions. Seasonality remains strong with a Q3 peak, and recent structural changes indicate a higher long-term growth regime.',
  ctaLabel: 'View Forecast →',
  ctaRoute: '/solutions/demand-intelligence/forecast',
};
