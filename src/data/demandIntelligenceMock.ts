export interface DemandPoint {
  period: string; // e.g. "Jan 2025" or "Q1 2025"
  monthShort: string;
  year: string;
  actual: number | null; // e.g. 13.2
  forecast: number | null; // e.g. 24.2
  ciLower: number | null;
  ciUpper: number | null;
  isToday?: boolean;
}

export interface AtRiskSku {
  sku: string;
  name: string;
  coverDays: number;
  risk: 'High' | 'Medium' | 'Low';
  stockOnHand: string;
  reorderTarget: string;
}

export interface SupplierOpportunity {
  name: string;
  currentCost: string;
  optimizedCost: string;
  savings: string;
  share: string;
  reliability: string;
  leadDays: number;
}

export interface HierarchyOption {
  enterprise: string;
  division: string;
  plant: string;
  category: string;
  sku: string;
}

export const HIERARCHY_OPTIONS = {
  enterprises: [
    'Global Industrial Materials Corp',
    'Apex Manufacturing Holdings',
    'Vanguard Industrial Operations',
  ],
  divisions: [
    'Advanced Materials',
    'Chemicals & Additives',
    'Engineered Resins',
  ],
  plants: [
    'Columbus #04',
    'Düsseldorf #01',
    'Jurong Island #02',
    'Savannah #03',
  ],
  productCategories: [
    'Industrial Polymers',
    'Specialty Composites',
    'Thermoplastics',
    'Elastomer Blends',
  ],
  skus: [
    'HDPE Resin (SKU-9021)',
    'LDPE Film Grade (SKU-4487)',
    'PP Copolymer (SKU-7763)',
    'Engineering LLDPE (SKU-1029)',
  ],
};

export const MONTHLY_DEMAND_OUTLOOK: DemandPoint[] = [
  { period: 'Jan 2025', monthShort: 'Jan', year: '2025', actual: 13.2, forecast: null, ciLower: null, ciUpper: null },
  { period: 'Feb 2025', monthShort: 'Feb', year: '2025', actual: 14.8, forecast: null, ciLower: null, ciUpper: null },
  { period: 'Mar 2025', monthShort: 'Mar', year: '2025', actual: 16.5, forecast: null, ciLower: null, ciUpper: null },
  { period: 'Apr 2025', monthShort: 'Apr', year: '2025', actual: 18.9, forecast: null, ciLower: null, ciUpper: null },
  { period: 'May 2025', monthShort: 'May', year: '2025', actual: 19.4, forecast: null, ciLower: null, ciUpper: null },
  { period: 'Jun 2025', monthShort: 'Jun', year: '2025', actual: 21.0, forecast: null, ciLower: null, ciUpper: null },
  { period: 'Jul 2025', monthShort: 'Jul', year: '2025', actual: 24.2, forecast: 24.2, ciLower: 21.8, ciUpper: 26.6, isToday: true },
  { period: 'Aug 2025', monthShort: 'Aug', year: '2025', actual: null, forecast: 27.5, ciLower: 24.5, ciUpper: 30.5 },
  { period: 'Sep 2025', monthShort: 'Sep', year: '2025', actual: null, forecast: 29.8, ciLower: 26.2, ciUpper: 33.4 },
  { period: 'Oct 2025', monthShort: 'Oct', year: '2025', actual: null, forecast: 31.4, ciLower: 27.5, ciUpper: 35.3 },
  { period: 'Nov 2025', monthShort: 'Nov', year: '2025', actual: null, forecast: 32.8, ciLower: 28.6, ciUpper: 37.0 },
  { period: 'Dec 2025', monthShort: 'Dec', year: '2025', actual: null, forecast: 34.5, ciLower: 29.8, ciUpper: 39.2 },
];

export const QUARTERLY_DEMAND_OUTLOOK: DemandPoint[] = [
  { period: 'Q1 2025', monthShort: 'Q1', year: '2025', actual: 44.5, forecast: null, ciLower: null, ciUpper: null },
  { period: 'Q2 2025', monthShort: 'Q2', year: '2025', actual: 59.3, forecast: null, ciLower: null, ciUpper: null },
  { period: 'Q3 2025', monthShort: 'Q3', year: '2025', actual: 24.2, forecast: 81.5, ciLower: 72.5, ciUpper: 90.5, isToday: true },
  { period: 'Q4 2025', monthShort: 'Q4', year: '2025', actual: null, forecast: 98.7, ciLower: 85.9, ciUpper: 111.5 },
];

export const TOP_DEMAND_SIGNALS = [
  { id: '1', title: 'Increasing trend', direction: 'up', type: 'trend' },
  { id: '2', title: 'Strong seasonality (Q3 peak)', direction: 'season', type: 'seasonality' },
  { id: '3', title: 'High price sensitivity', direction: 'elasticity', type: 'elasticity' },
];

export const AT_RISK_SKUS: AtRiskSku[] = [
  { sku: 'HDPE-9021', name: 'High-Density Polyethylene Resin', coverDays: 12, risk: 'High', stockOnHand: '4,200 kg', reorderTarget: '12,500 kg' },
  { sku: 'LDPE-4487', name: 'Low-Density Film Polyethylene', coverDays: 18, risk: 'Medium', stockOnHand: '8,400 kg', reorderTarget: '16,000 kg' },
  { sku: 'PP-7763', name: 'Polypropylene Copolymer Pellets', coverDays: 20, risk: 'Medium', stockOnHand: '11,200 kg', reorderTarget: '19,500 kg' },
  { sku: 'LLDPE-1029', name: 'Linear Low-Density Polyethylene', coverDays: 24, risk: 'Low', stockOnHand: '15,800 kg', reorderTarget: '21,000 kg' },
  { sku: 'PET-5502', name: 'Polyethylene Terephthalate Flakes', coverDays: 28, risk: 'Low', stockOnHand: '22,400 kg', reorderTarget: '25,000 kg' },
];

export const SUPPLIER_OPPORTUNITIES: SupplierOpportunity[] = [
  { name: 'Supplier A', currentCost: '$100', optimizedCost: '$92', savings: '8.0%', share: '45%', reliability: '94%', leadDays: 7 },
  { name: 'Supplier B', currentCost: '$115', optimizedCost: '$102', savings: '11.3%', share: '35%', reliability: '87%', leadDays: 10 },
  { name: 'Supplier C', currentCost: '$128', optimizedCost: '$110', savings: '14.1%', share: '20%', reliability: '82%', leadDays: 14 },
  { name: 'Supplier D', currentCost: '$108', optimizedCost: '$98', savings: '9.3%', share: '0%', reliability: '91%', leadDays: 5 },
  { name: 'Supplier E', currentCost: '$135', optimizedCost: '$118', savings: '12.6%', share: '0%', reliability: '78%', leadDays: 18 },
];

export const DATE_RANGE_OPTIONS = [
  { label: 'Jan 2020 – Dec 2025', desc: '5-Year Historical & Multi-Regime Analysis (Default for Signals)' },
  { label: 'Jan 2025 – Dec 2026', desc: 'Standard 24-Month Operating Window' },
  { label: 'Next 12 Months (Jul 2025 – Jun 2026)', desc: 'Forward Rolling Planning Horizon' },
  { label: 'Current Fiscal Year 2025', desc: 'FY25 Budget Target Assessment' },
  { label: 'Historical 2024 vs Projected 2025', desc: 'YoY Comparative Benchmark' },
];
