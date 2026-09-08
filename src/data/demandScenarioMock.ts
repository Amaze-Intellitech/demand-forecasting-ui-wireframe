// ─────────────────────────────────────────────────────────────
// AITEK Demand Intelligence — Scenario Studio Mock Data
// Screen 04 / 06: Decision Stress-Testing & Prescriptive Simulation
// ─────────────────────────────────────────────────────────────

export type ScenarioPresetId =
  | 'base-case'
  | 'demand-surge'
  | 'cost-inflation'
  | 'price-shock'
  | 'custom';

export interface ScenarioParametersState {
  priceChange: number;          // -20% to +20%
  demandChange: number;         // -20% to +50%
  seasonalityAdjustment: number;// -20% to +20%
  targetServiceLevel: number;   // 80% to 99%
}

export interface ScenarioPreset {
  id: ScenarioPresetId;
  label: string;
  description: string;
  defaultParams: ScenarioParametersState;
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'base-case',
    label: 'Base Case',
    description: 'Current trajectory',
    defaultParams: {
      priceChange: 0,
      demandChange: 0,
      seasonalityAdjustment: 0,
      targetServiceLevel: 95,
    },
  },
  {
    id: 'demand-surge',
    label: 'Demand Surge',
    description: '+25% demand',
    defaultParams: {
      priceChange: 0,
      demandChange: 25,
      seasonalityAdjustment: 0,
      targetServiceLevel: 95,
    },
  },
  {
    id: 'cost-inflation',
    label: 'Cost Inflation',
    description: '+12% input costs',
    defaultParams: {
      priceChange: 0,
      demandChange: 0,
      seasonalityAdjustment: 0,
      targetServiceLevel: 95,
    },
  },
  {
    id: 'price-shock',
    label: 'Price Shock',
    description: '+10% selling price',
    defaultParams: {
      priceChange: 10,
      demandChange: -3,
      seasonalityAdjustment: 0,
      targetServiceLevel: 95,
    },
  },
  {
    id: 'custom',
    label: 'Custom Scenario',
    description: 'Build your own',
    defaultParams: {
      priceChange: 5,
      demandChange: 15,
      seasonalityAdjustment: 5,
      targetServiceLevel: 96,
    },
  },
];

// ── Impact Table Metrics ──────────────────────────────────────
export interface ScenarioImpactRow {
  metric: string;
  baseCase: string;
  scenario: string;
  impact: string;
  impactType: 'neutral' | 'positive' | 'negative' | 'none';
}

export interface ScenarioOutcomeData {
  summary: string;
  impactRows: ScenarioImpactRow[];
  waterfall: {
    baseRevenue: number;     // e.g. 16.1
    demandChange: number;    // e.g. +3.2
    costChange: number;      // e.g. -1.1
    priceChange: number;     // e.g. +0.8
    scenarioRevenue: number; // e.g. 19.0
  };
  keyInsights: {
    icon: 'lightbulb' | 'barchart' | 'shield' | 'alert';
    text: string;
  }[];
  recommendedActions: string[];
}

export const PRESET_OUTCOMES: Record<ScenarioPresetId, ScenarioOutcomeData> = {
  'base-case': {
    summary:
      'Under the current base case, demand is expected to grow 7.4% over the next 12 months with manageable inventory requirements.',
    impactRows: [
      { metric: 'Demand (Units)', baseCase: '128,400', scenario: '128,400', impact: '0%', impactType: 'neutral' },
      { metric: 'Revenue', baseCase: '$16.1M', scenario: '$16.1M', impact: '0%', impactType: 'neutral' },
      { metric: 'Gross Profit', baseCase: '$4.2M', scenario: '$4.2M', impact: '0%', impactType: 'neutral' },
      { metric: 'Inventory Requirement', baseCase: '2,350', scenario: '2,350', impact: '0%', impactType: 'neutral' },
      { metric: 'Working Capital', baseCase: '$1.2M', scenario: '$1.2M', impact: '0%', impactType: 'neutral' },
      { metric: 'Service Level', baseCase: '95%', scenario: '95%', impact: '-', impactType: 'none' },
      { metric: 'Stockout Risk', baseCase: 'Low', scenario: 'Low', impact: '-', impactType: 'none' },
    ],
    waterfall: {
      baseRevenue: 16.1,
      demandChange: 3.2,
      costChange: -1.1,
      priceChange: 0.8,
      scenarioRevenue: 19.0,
    },
    keyInsights: [
      { icon: 'lightbulb', text: 'Demand is expected to grow 7.4% over the next 12 months under stable operating conditions.' },
      { icon: 'barchart', text: 'Gross margin remains stable at 26.1% with current supplier pricing agreements.' },
      { icon: 'shield', text: 'Service levels remain above 95% with baseline safety stock allocations.' },
      { icon: 'alert', text: 'Q3 seasonal peak requires capacity verification by end of Q1.' },
    ],
    recommendedActions: [
      'Maintain current safety stock targets across primary polymer SKUs.',
      'Lock in raw material allocation contracts through Q3 2025.',
      'Monitor monthly demand deviations beyond ±3.5% threshold.',
      'Evaluate secondary supplier qualification for Columbus Plant #04.',
      'Review pricing tiers ahead of mid-year contract renewals.',
    ],
  },

  'demand-surge': {
    summary:
      'A 25% demand surge materially increases revenue but requires additional 770 units of safety stock to prevent medium stockout risk.',
    impactRows: [
      { metric: 'Demand (Units)', baseCase: '128,400', scenario: '160,500', impact: '+25.0%', impactType: 'positive' },
      { metric: 'Revenue', baseCase: '$16.1M', scenario: '$20.1M', impact: '+$4.0M', impactType: 'positive' },
      { metric: 'Gross Profit', baseCase: '$4.2M', scenario: '$5.0M', impact: '+$0.8M', impactType: 'positive' },
      { metric: 'Inventory Requirement', baseCase: '2,350', scenario: '3,120', impact: '+32.8%', impactType: 'negative' },
      { metric: 'Working Capital', baseCase: '$1.2M', scenario: '$1.5M', impact: '+$0.3M', impactType: 'negative' },
      { metric: 'Service Level', baseCase: '95%', scenario: '92%', impact: '-3.0%', impactType: 'negative' },
      { metric: 'Stockout Risk', baseCase: 'Low', scenario: 'Medium', impact: 'Elevated', impactType: 'negative' },
    ],
    waterfall: {
      baseRevenue: 16.1,
      demandChange: 4.8,
      costChange: -1.4,
      priceChange: 0.6,
      scenarioRevenue: 20.1,
    },
    keyInsights: [
      { icon: 'lightbulb', text: 'A 25% demand surge could increase revenue by approximately $4.0M across key accounts.' },
      { icon: 'barchart', text: 'Additional safety stock of approximately 770 units would be required to protect fill rates.' },
      { icon: 'shield', text: 'Service level may dip to 92% without expedited supplier raw resin replenishment.' },
      { icon: 'alert', text: 'Working capital commitment expands by $300K, requiring short-term credit facility clearance.' },
    ],
    recommendedActions: [
      'Build inventory buffer of 770 units for demand surge scenario.',
      'Engage secondary suppliers to secure 20% additional production allocation.',
      'Establish expedited freight lanes for high-demand HDPE SKUs.',
      'Implement tiered order prioritization for Tier-1 contract customers.',
      'Use scenario insights to finalize procurement strategy.',
    ],
  },

  'cost-inflation': {
    summary:
      'A 12% cost inflation scenario compresses gross profit by 8.3% and requires pricing adjustments or supplier optimization to protect margin.',
    impactRows: [
      { metric: 'Demand (Units)', baseCase: '128,400', scenario: '128,400', impact: '0%', impactType: 'neutral' },
      { metric: 'Revenue', baseCase: '$16.1M', scenario: '$16.1M', impact: '0%', impactType: 'neutral' },
      { metric: 'Gross Profit', baseCase: '$4.2M', scenario: '$3.85M', impact: '-8.3%', impactType: 'negative' },
      { metric: 'Inventory Requirement', baseCase: '2,350', scenario: '2,350', impact: '0%', impactType: 'neutral' },
      { metric: 'Working Capital', baseCase: '$1.2M', scenario: '$1.34M', impact: '+$140K', impactType: 'negative' },
      { metric: 'Service Level', baseCase: '95%', scenario: '95%', impact: '-', impactType: 'none' },
      { metric: 'Stockout Risk', baseCase: 'Low', scenario: 'Low', impact: '-', impactType: 'none' },
    ],
    waterfall: {
      baseRevenue: 16.1,
      demandChange: 1.2,
      costChange: -2.3,
      priceChange: 0.4,
      scenarioRevenue: 15.4,
    },
    keyInsights: [
      { icon: 'lightbulb', text: 'Cost inflation of 12% reduces gross profit by 8.3% if not offset through pricing or sourcing.' },
      { icon: 'barchart', text: 'Margin compression is heaviest in commoditized HDPE extrusion grades.' },
      { icon: 'shield', text: 'Inventory holding value increases by 11.6%, raising carrying costs by $42K annually.' },
      { icon: 'alert', text: 'Supplier price renegotiations and indexed contracts can recover up to 45% of margin loss.' },
    ],
    recommendedActions: [
      'Evaluate supplier allocation to mitigate cost inflation impact.',
      'Consider 5–10% price adjustment if input costs increase.',
      'Shift 15% procurement volume to lower-cost regional vendors.',
      'Implement fuel and chemical feedstock index surcharges on commercial quotes.',
      'Accelerate inventory turns to reduce holding value exposure.',
    ],
  },

  'price-shock': {
    summary:
      'A 10% price increase partially offsets input-cost pressure while reducing baseline volume by 2.8%, generating a net $1.6M revenue expansion.',
    impactRows: [
      { metric: 'Demand (Units)', baseCase: '128,400', scenario: '124,800', impact: '-2.8%', impactType: 'negative' },
      { metric: 'Revenue', baseCase: '$16.1M', scenario: '$17.7M', impact: '+$1.6M', impactType: 'positive' },
      { metric: 'Gross Profit', baseCase: '$4.2M', scenario: '$4.4M', impact: '+$200K', impactType: 'positive' },
      { metric: 'Inventory Requirement', baseCase: '2,350', scenario: '2,290', impact: '-2.5%', impactType: 'positive' },
      { metric: 'Working Capital', baseCase: '$1.2M', scenario: '$1.18M', impact: '-$20K', impactType: 'positive' },
      { metric: 'Service Level', baseCase: '95%', scenario: '96%', impact: '+1.0%', impactType: 'positive' },
      { metric: 'Stockout Risk', baseCase: 'Low', scenario: 'Low', impact: '-', impactType: 'none' },
    ],
    waterfall: {
      baseRevenue: 16.1,
      demandChange: -0.5,
      costChange: -0.9,
      priceChange: 3.0,
      scenarioRevenue: 17.7,
    },
    keyInsights: [
      { icon: 'lightbulb', text: 'A 10% price increase partially offsets cost inflation, maintaining gross margins.' },
      { icon: 'barchart', text: 'Demand elasticity indicates moderate volume contraction (-2.8%) with net positive revenue.' },
      { icon: 'shield', text: 'Service levels improve slightly due to reduced strain on plant line capacities.' },
      { icon: 'alert', text: 'Price increases should be phased to minimize spot buyer attrition.' },
    ],
    recommendedActions: [
      'Implement phased 10% price increase across non-contractual volume.',
      'Protect high-volume contracted accounts with quarterly rebates.',
      'Monitor competitor price benchmarks in North America region.',
      'Reallocate newly available line capacity to higher-margin specialty polymers.',
      'Align sales incentive structures with gross margin targets.',
    ],
  },

  'custom': {
    summary:
      'Custom simulation configured: parameters stress-test combined price and volume elasticity with service target buffer.',
    impactRows: [
      { metric: 'Demand (Units)', baseCase: '128,400', scenario: '147,660', impact: '+15.0%', impactType: 'positive' },
      { metric: 'Revenue', baseCase: '$16.1M', scenario: '$18.9M', impact: '+$2.8M', impactType: 'positive' },
      { metric: 'Gross Profit', baseCase: '$4.2M', scenario: '$4.8M', impact: '+$600K', impactType: 'positive' },
      { metric: 'Inventory Requirement', baseCase: '2,350', scenario: '2,820', impact: '+20.0%', impactType: 'negative' },
      { metric: 'Working Capital', baseCase: '$1.2M', scenario: '$1.38M', impact: '+$180K', impactType: 'negative' },
      { metric: 'Service Level', baseCase: '95%', scenario: '96%', impact: '+1.0%', impactType: 'positive' },
      { metric: 'Stockout Risk', baseCase: 'Low', scenario: 'Low-Med', impact: 'Stable', impactType: 'neutral' },
    ],
    waterfall: {
      baseRevenue: 16.1,
      demandChange: 2.6,
      costChange: -1.2,
      priceChange: 1.4,
      scenarioRevenue: 18.9,
    },
    keyInsights: [
      { icon: 'lightbulb', text: 'User-defined parameters show a net positive revenue lift of $2.8M.' },
      { icon: 'barchart', text: 'Elevated 96% service target requires an additional 470 inventory units.' },
      { icon: 'shield', text: 'Working capital commitment expands by $180K to maintain fill rate commitments.' },
      { icon: 'alert', text: 'Supplier lead times must remain under 12 days to support the higher throughput.' },
    ],
    recommendedActions: [
      'Review customized demand profile with plant operations heads.',
      'Evaluate lead-time compression agreements with key freight carriers.',
      'Run sensitivity analysis on raw resin supply elasticity.',
      'Prepare quarterly CAPEX plan for packaging line expansion.',
      'Schedule executive alignment meeting before deploying parameters.',
    ],
  },
};

// ── 12-Month Comparison Chart Data (Jan 2025 to Dec 2025) ─────
export interface ScenarioChartPoint {
  month: string;
  year: number;
  baseCase: number;
  demandSurge: number;
  costInflation: number;
  priceShock: number;
  isToday?: boolean;
}

export const SCENARIO_FORECAST_SERIES: ScenarioChartPoint[] = [
  { month: 'Jan', year: 2025, baseCase: 9800,  demandSurge: 9800,  costInflation: 9800,  priceShock: 9800 },
  { month: 'Feb', year: 2025, baseCase: 12200, demandSurge: 12400, costInflation: 11900, priceShock: 11500 },
  { month: 'Mar', year: 2025, baseCase: 13900, demandSurge: 14200, costInflation: 13400, priceShock: 12800 },
  { month: 'Apr', year: 2025, baseCase: 14400, demandSurge: 15100, costInflation: 13800, priceShock: 13200 },
  { month: 'May', year: 2025, baseCase: 15800, demandSurge: 16900, costInflation: 15100, priceShock: 14500 },
  { month: 'Jun', year: 2025, baseCase: 18900, demandSurge: 20400, costInflation: 18200, priceShock: 17200 },
  { month: 'Jul', year: 2025, baseCase: 21500, demandSurge: 24200, costInflation: 20400, priceShock: 19100, isToday: true },
  { month: 'Aug', year: 2025, baseCase: 24200, demandSurge: 28800, costInflation: 22100, priceShock: 20800 },
  { month: 'Sep', year: 2025, baseCase: 26800, demandSurge: 33400, costInflation: 23600, priceShock: 21900 },
  { month: 'Oct', year: 2025, baseCase: 29100, demandSurge: 37200, costInflation: 24500, priceShock: 22600 },
  { month: 'Nov', year: 2025, baseCase: 31400, demandSurge: 40900, costInflation: 25100, priceShock: 23400 },
  { month: 'Dec', year: 2025, baseCase: 33200, demandSurge: 43800, costInflation: 25800, priceShock: 24100 },
];
