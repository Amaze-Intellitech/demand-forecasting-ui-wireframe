// ─────────────────────────────────────────────────────────────
// AITEK Demand Intelligence — Prescriptive Sourcing Mock Data
// Screen 05 / 06: Sourcing Optimization & Trade-Off Layer
// ─────────────────────────────────────────────────────────────

export interface SourcingFilterState {
  plant: string;
  category: string;
  sku: string;
  timeHorizon: string;
  scenario: string;
}

export const DEFAULT_SOURCING_FILTERS: SourcingFilterState = {
  plant: 'Columbus Plant #04',
  category: 'Industrial Polymers',
  sku: 'HDPE Resin (SKU-9021)',
  timeHorizon: 'Next 12 Months',
  scenario: 'Base Case',
};

export const SOURCING_FILTER_OPTIONS = {
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
  timeHorizons: ['Next 6 Months', 'Next 12 Months', 'Next 24 Months'],
  scenarios: ['Base Case', 'Demand Surge (+25%)', 'Cost Inflation (+12%)', 'Price Shock (+10%)'],
};

// ── 5 Sourcing KPI Cards ──────────────────────────────────────
export interface SourcingKpiItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
  type: 'cost' | 'suppliers' | 'reliability' | 'emissions' | 'risk';
}

export const SOURCING_KPIS: SourcingKpiItem[] = [
  {
    id: 'cost',
    title: 'Total Sourcing Cost',
    value: '$9.2M',
    subtext: '-12.4% vs. current plan',
    type: 'cost',
  },
  {
    id: 'suppliers',
    title: 'Supplier Count',
    value: '3',
    subtext: '-1 supplier',
    type: 'suppliers',
  },
  {
    id: 'reliability',
    title: 'Supply Reliability',
    value: '98.5%',
    subtext: '+3.8 pts',
    type: 'reliability',
  },
  {
    id: 'emissions',
    title: 'CO₂e Emissions',
    value: '12.6K tons',
    subtext: '-18.7%',
    type: 'emissions',
  },
  {
    id: 'risk',
    title: 'Risk Exposure',
    value: 'Low',
    subtext: 'Improved from Medium',
    type: 'risk',
  },
];

// ── Optimized Supply Allocation (Stacked Bar Data) ───────────
export interface QuarterAllocation {
  quarter: string;
  totalLabel: string;
  totalUnits: number;
  supplierA: number; // Deep blue
  supplierB: number; // Sky blue
  supplierC: number; // Mint green
  supplierD: number; // Light gray
}

export const ALLOCATION_BY_QUARTER: QuarterAllocation[] = [
  {
    quarter: 'Q1 2025',
    totalLabel: '88.4K',
    totalUnits: 88.4,
    supplierA: 36.2,
    supplierB: 26.4,
    supplierC: 16.8,
    supplierD: 9.0,
  },
  {
    quarter: 'Q2 2025',
    totalLabel: '102.1K',
    totalUnits: 102.1,
    supplierA: 42.5,
    supplierB: 31.0,
    supplierC: 20.6,
    supplierD: 8.0,
  },
  {
    quarter: 'Q3 2025',
    totalLabel: '118.7K',
    totalUnits: 118.7,
    supplierA: 49.8,
    supplierB: 37.2,
    supplierC: 24.7,
    supplierD: 7.0,
  },
  {
    quarter: 'Q4 2025',
    totalLabel: '124.6K',
    totalUnits: 124.6,
    supplierA: 54.1,
    supplierB: 40.5,
    supplierC: 24.0,
    supplierD: 6.0,
  },
];

export const SUPPLIER_PALETTE = {
  supplierA: { name: 'Supplier A', color: '#0062d2' }, // Vibrant Blue
  supplierB: { name: 'Supplier B', color: '#38bdf8' }, // Sky Blue
  supplierC: { name: 'Supplier C', color: '#34d399' }, // Mint Green
  supplierD: { name: 'Supplier D', color: '#cbd5e1' }, // Light Gray
};

// ── Cost Comparison Waterfall Data ────────────────────────────
export interface CostWaterfallItem {
  label: string;
  displayVal: string;
  val: number;
  type: 'initial' | 'savings' | 'final';
}

export const COST_COMPARISON_WATERFALL: CostWaterfallItem[] = [
  { label: 'Current Plan', displayVal: '$10.5M', val: 10.5, type: 'initial' },
  { label: 'Price Optimization', displayVal: '-$0.9M', val: -0.9, type: 'savings' },
  { label: 'Volume Allocation', displayVal: '-$0.6M', val: -0.6, type: 'savings' },
  { label: 'Contract Terms', displayVal: '-$0.7M', val: -0.7, type: 'savings' },
  { label: 'Optimized Plan', displayVal: '$9.2M', val: 9.2, type: 'final' },
];

// ── Supplier Recommendations Table ─────────────────────────────
export interface SupplierRecommendation {
  id: string;
  name: string;
  colorDot: string;
  recommendedAllocation: number; // e.g. 48200
  unitCost: number; // e.g. 92
  totalCost: string; // "$4.43M"
  savingsVsCurrent: string; // "-8.0%"
  reliability: number; // 99%
  selected: boolean;
}

export const INITIAL_SUPPLIER_RECOMMENDATIONS: SupplierRecommendation[] = [
  {
    id: 'supp-a',
    name: 'Supplier A',
    colorDot: '#0062d2',
    recommendedAllocation: 48200,
    unitCost: 92,
    totalCost: '$4.43M',
    savingsVsCurrent: '-8.0%',
    reliability: 99,
    selected: true,
  },
  {
    id: 'supp-b',
    name: 'Supplier B',
    colorDot: '#38bdf8',
    recommendedAllocation: 36100,
    unitCost: 102,
    totalCost: '$3.68M',
    savingsVsCurrent: '-11.3%',
    reliability: 97,
    selected: true,
  },
  {
    id: 'supp-c',
    name: 'Supplier C',
    colorDot: '#34d399',
    recommendedAllocation: 24300,
    unitCost: 110,
    totalCost: '$2.67M',
    savingsVsCurrent: '-14.1%',
    reliability: 96,
    selected: true,
  },
  {
    id: 'supp-d',
    name: 'Supplier D',
    colorDot: '#cbd5e1',
    recommendedAllocation: 16000,
    unitCost: 125,
    totalCost: '$2.00M',
    savingsVsCurrent: '-5.4%',
    reliability: 92,
    selected: false,
  },
];

// ── AI Recommendation Narrative & Considerations ──────────────
export const SOURCING_AI_RECOMMENDATION = {
  badge: 'High Confidence',
  headline:
    'Allocate 48.2K units to Supplier A and 36.1K units to Supplier B to achieve 12.4% cost savings while maintaining supply reliability above 97%.',
  keyConsiderations: [
    'Supplier A offers the best cost-reliability balance.',
    'Diversify 20% volume to Supplier C to reduce concentration risk.',
    'Lock in contract terms for H2 2025 to mitigate price volatility.',
    'Monitor Supplier D for capacity constraints.',
  ],
};

// ── Risk Analysis Dimensions ──────────────────────────────────
export interface RiskDimension {
  id: string;
  title: string;
  status: 'Low' | 'Moderate' | 'Medium' | 'High';
  statusColor: 'emerald' | 'amber' | 'rose';
  description: string;
}

export const SOURCING_RISK_DIMENSIONS: RiskDimension[] = [
  {
    id: 'concentration',
    title: 'Supply Concentration',
    status: 'Moderate',
    statusColor: 'amber',
    description: 'Top 2 suppliers account for 68% of volume.',
  },
  {
    id: 'geopolitical',
    title: 'Geopolitical Risk',
    status: 'Low',
    statusColor: 'emerald',
    description: 'No immediate concerns.',
  },
  {
    id: 'volatility',
    title: 'Price Volatility',
    status: 'Medium',
    statusColor: 'amber',
    description: 'Monitor crude oil price trends.',
  },
];

// ── Next Steps ────────────────────────────────────────────────
export const SOURCING_NEXT_STEPS: string[] = [
  'Review and approve supplier allocation plan.',
  'Initiate contract negotiations with selected suppliers.',
  'Set up ongoing monitoring and alerts.',
  'Revisit allocation in next forecast cycle.',
];
