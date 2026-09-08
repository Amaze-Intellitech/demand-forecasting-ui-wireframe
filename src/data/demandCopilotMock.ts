// ─────────────────────────────────────────────────────────────
// AITEK Demand Intelligence — AI Decision Copilot Mock Data
// Screen 06 / 06: Interpretation + Question + Decision Layer
// ─────────────────────────────────────────────────────────────

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  iconName: 'BarChart3' | 'Box' | 'Truck' | 'AlertTriangle' | 'Lightbulb';
  colorTheme: 'blue' | 'emerald' | 'purple' | 'rose' | 'amber';
  defaultQuery: string;
}

export const COPILOT_QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: 'demand',
    title: 'Ask About Demand',
    description: 'Get insights on trends, forecast and drivers',
    iconName: 'BarChart3',
    colorTheme: 'blue',
    defaultQuery: 'What is the demand outlook for HDPE Resin over the next 12 months? Also, do we need to take any immediate action?',
  },
  {
    id: 'scenarios',
    title: 'Explore Scenarios',
    description: 'Test different business assumptions',
    iconName: 'Box',
    colorTheme: 'emerald',
    defaultQuery: 'How will a 10% price increase impact demand and revenue?',
  },
  {
    id: 'sourcing',
    title: 'Optimize Sourcing',
    description: 'Find the best supply strategy',
    iconName: 'Truck',
    colorTheme: 'purple',
    defaultQuery: 'Which suppliers can meet a 25% demand surge?',
  },
  {
    id: 'risk',
    title: 'Assess Risk',
    description: 'Identify and mitigate supply chain risks',
    iconName: 'AlertTriangle',
    colorTheme: 'rose',
    defaultQuery: 'What is the risk of stockout in the next 6 months?',
  },
  {
    id: 'recommendations',
    title: 'Get Recommendations',
    description: 'Turn insights into action',
    iconName: 'Lightbulb',
    colorTheme: 'amber',
    defaultQuery: 'Summarize key actions I should take this quarter.',
  },
];

// ── Suggested Questions ────────────────────────────────────────
export type QuestionCategory = 'All' | 'Demand' | 'Sourcing' | 'Risk' | 'Planning';

export interface SuggestedQuestionItem {
  id: string;
  category: Exclude<QuestionCategory, 'All'>;
  question: string;
}

export const SUGGESTED_QUESTIONS: SuggestedQuestionItem[] = [
  {
    id: 'q1',
    category: 'Demand',
    question: 'What is the demand outlook for HDPE Resin in Q3 2026?',
  },
  {
    id: 'q2',
    category: 'Demand',
    question: 'Why is demand increasing for Industrial Polymers?',
  },
  {
    id: 'q3',
    category: 'Planning',
    question: 'What happens to costs if input prices increase by 10%?',
  },
  {
    id: 'q4',
    category: 'Sourcing',
    question: 'Which suppliers can meet a 25% demand surge?',
  },
  {
    id: 'q5',
    category: 'Risk',
    question: 'What is the risk of stockout in the next 6 months?',
  },
  {
    id: 'q6',
    category: 'Sourcing',
    question: 'Recommend a sourcing strategy to reduce working capital.',
  },
  {
    id: 'q7',
    category: 'Planning',
    question: 'How will a 10% price increase impact demand and revenue?',
  },
  {
    id: 'q8',
    category: 'Planning',
    question: 'Summarize key actions I should take this quarter.',
  },
];

// ── Forecast Chart Points (Jan 2025 to Dec 2026) ───────────────
export interface CopilotForecastPoint {
  month: string;
  label: string;
  actual?: number;
  forecast?: number;
  confUpper?: number;
  confLower?: number;
  isToday?: boolean;
}

export const COPILOT_FORECAST_DATA: CopilotForecastPoint[] = [
  { month: '2025-01', label: 'Jan 2025', actual: 16.2 },
  { month: '2025-03', label: 'Mar 2025', actual: 18.0 },
  { month: '2025-05', label: 'May 2025', actual: 20.4 },
  { month: '2025-07', label: 'Jul 2025', actual: 22.1, isToday: true },
  { month: '2025-09', label: 'Sep 2025', forecast: 24.5, confLower: 22.0, confUpper: 27.0 },
  { month: '2025-11', label: 'Nov 2025', forecast: 26.8, confLower: 23.5, confUpper: 30.1 },
  { month: '2026-01', label: 'Jan 2026', forecast: 28.5, confLower: 24.8, confUpper: 32.2 },
  { month: '2026-03', label: 'Mar 2026', forecast: 31.0, confLower: 26.5, confUpper: 35.5 },
  { month: '2026-05', label: 'May 2026', forecast: 33.4, confLower: 28.0, confUpper: 38.8 },
  { month: '2026-07', label: 'Jul 2026', forecast: 36.2, confLower: 30.1, confUpper: 42.3 },
  { month: '2026-09', label: 'Sep 2026', forecast: 38.0, confLower: 31.5, confUpper: 44.5 },
  { month: '2026-11', label: 'Nov 2026', forecast: 39.8, confLower: 32.8, confUpper: 46.8 },
];

// ── Chat Message & Block Models ────────────────────────────────
export interface CopilotKpiCard {
  title: string;
  value: string;
  subtext: string;
  color: 'emerald' | 'blue' | 'amber';
  iconType: 'trend' | 'bar' | 'shield';
}

export interface CopilotDriverItem {
  name: string;
  percentage: string;
  description: string;
}

export interface CopilotSupplierItem {
  name: string;
  allocation: string;
  reliability: string;
  unitCost: string;
}

export interface CopilotResponseBlocks {
  summary: string;
  kpis?: CopilotKpiCard[];
  hasForecastChart?: boolean;
  drivers?: CopilotDriverItem[];
  suppliers?: CopilotSupplierItem[];
  keyTakeaways?: string[];
  recommendation?: string;
  cta?: {
    label: string;
    route: string;
  };
  followUps?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  timestamp: string;
  text?: string;
  blocks?: CopilotResponseBlocks;
}

// ── Mock Answers Library ──────────────────────────────────────
export const MOCK_RESPONSES: Record<string, CopilotResponseBlocks> = {
  // 1. Demand Outlook (Default Loaded Message)
  demandOutlook: {
    summary:
      'Based on the latest forecast and demand signals, here is the outlook for HDPE Resin over the next 12 months:',
    kpis: [
      {
        title: 'Forecast Demand',
        value: '128.4K units',
        subtext: '+7.4% vs. last year',
        color: 'emerald',
        iconType: 'trend',
      },
      {
        title: 'Peak Period',
        value: 'Q3 2026',
        subtext: 'Highest requirement',
        color: 'blue',
        iconType: 'bar',
      },
      {
        title: 'Service Level',
        value: '97.8%',
        subtext: 'Within target range',
        color: 'emerald',
        iconType: 'shield',
      },
    ] as CopilotKpiCard[],
    hasForecastChart: true,
    keyTakeaways: [
      'Demand is expected to grow by 7.4% over the next 12 months.',
      'Q3 2026 will be the peak demand period.',
      'Current inventory levels are sufficient for the base forecast.',
      'Consider increasing safety stock by approximately 770 units to cover high-growth scenarios.',
    ],
    recommendation:
      'Increase safety stock by approximately 770 units if planning for a high-growth scenario.',
    cta: {
      label: 'View Detailed Forecast',
      route: '/solutions/demand-intelligence/forecast',
    },
    followUps: [
      'Why is demand increasing for Industrial Polymers?',
      'How will a 10% price increase impact demand and revenue?',
      'Which suppliers can meet a 25% demand surge?',
    ],
  },

  // 2. Demand Drivers
  demandDrivers: {
    summary:
      'Demand is being driven primarily by price elasticity and downstream industrial construction, with strong seasonal compounding contributing to the Q3 peak.',
    drivers: [
      { name: 'Price & Contract Tiers', percentage: '87.1%', description: 'Strongest demand driver across accounts' },
      { name: 'Closing Inventory Stock', percentage: '5.3%', description: 'Distributor re-stocking cycles' },
      { name: 'Logistics Lead Time', percentage: '4.6%', description: 'Lead time compression in domestic routes' },
      { name: 'Marketing & Rebates', percentage: '2.0%', description: 'Regional promotional incentives' },
      { name: 'Supplier Reliability', percentage: '1.1%', description: 'OTIF fulfillment compliance' },
    ] as CopilotDriverItem[],
    kpis: [
      {
        title: 'Primary Driver',
        value: 'Price Sensitivity',
        subtext: '87.1% relative weight',
        color: 'blue',
        iconType: 'bar',
      },
      {
        title: 'Signal Confidence',
        value: '94.2%',
        subtext: 'High statistical power',
        color: 'emerald',
        iconType: 'shield',
      },
      {
        title: 'Seasonality Index',
        value: '1.24x',
        subtext: 'Peaks July–September',
        color: 'emerald',
        iconType: 'trend',
      },
    ] as CopilotKpiCard[],
    keyTakeaways: [
      'Price adjustments have 16x more demand leverage than marketing rebates.',
      'Regional inventory drawdown in Midwest plants will accelerate early Q3 order volumes.',
      'Downstream automotive resin substitution creates an additional +3.2% lift.',
    ],
    recommendation:
      'Monitor pricing behavior closely and incorporate price sensitivity elasticity (-0.42) into the next monthly planning cycle.',
    cta: {
      label: 'View Demand Signals',
      route: '/solutions/demand-intelligence/signals',
    },
    followUps: [
      'How will a 10% price increase impact demand and revenue?',
      'What happens to costs if input prices increase by 10%?',
    ],
  },

  // 3. Price Increase Scenario
  priceIncrease: {
    summary:
      'A 10% price increase will partially offset input-cost pressure and expand gross margins, but demand is projected to soften by 4.2% due to price elasticity.',
    kpis: [
      {
        title: 'Price Adjustment',
        value: '+10.0%',
        subtext: 'All polymer grades',
        color: 'blue',
        iconType: 'bar',
      },
      {
        title: 'Net Revenue Impact',
        value: '+$1.84M',
        subtext: '+5.4% net revenue expansion',
        color: 'emerald',
        iconType: 'trend',
      },
      {
        title: 'Demand Volume Impact',
        value: '-5,390 units',
        subtext: '-4.2% demand volume contraction',
        color: 'amber',
        iconType: 'shield',
      },
    ] as CopilotKpiCard[],
    keyTakeaways: [
      'Price elasticity of -0.42 cushions the top-line; revenue expands despite volume contraction.',
      'Gross margin increases from 28.4% to 31.2% across key SKUs.',
      'Working capital requirement decreases by $180K due to lower inventory holding.',
    ],
    recommendation:
      'Stress-test the price increase across customer segments in Scenario Studio before finalizing commercial price books.',
    cta: {
      label: 'Explore in Scenario Studio',
      route: '/solutions/demand-intelligence/scenarios',
    },
    followUps: [
      'What should I tell the board?',
      'Where can we release working capital?',
    ],
  },

  // 4. Supplier Surge / Sourcing
  supplierSurge: {
    summary:
      'Supplier A and Supplier B provide the best balance of contracted capacity, cost efficiency, and reliability for a +25% surge scenario.',
    suppliers: [
      { name: 'Supplier A', allocation: '48.2K units', reliability: '99.0%', unitCost: '$92/unit' },
      { name: 'Supplier B', allocation: '36.1K units', reliability: '97.0%', unitCost: '$102/unit' },
      { name: 'Supplier C', allocation: '24.3K units', reliability: '96.0%', unitCost: '$110/unit' },
    ] as CopilotSupplierItem[],
    kpis: [
      {
        title: 'Max Surge Capacity',
        value: '148.5K units',
        subtext: '+28.2% headroom buffer',
        color: 'emerald',
        iconType: 'trend',
      },
      {
        title: 'Weighted Unit Cost',
        value: '$98.40',
        subtext: '-6.2% vs. current baseline',
        color: 'blue',
        iconType: 'bar',
      },
      {
        title: 'Fulfillment Risk',
        value: 'Low',
        subtext: 'Diversified across 3 plants',
        color: 'emerald',
        iconType: 'shield',
      },
    ] as CopilotKpiCard[],
    keyTakeaways: [
      'Supplier A can absorb up to 50K units without bottlenecking lead time.',
      'Supplier B guarantees 97% on-time delivery under surge contractual clauses.',
      'Retaining 20% allocation with Supplier C prevents dangerous single-source concentration.',
    ],
    recommendation:
      'Shift incremental demand toward Supplier A and B while locking in volume rebate tiers for H2.',
    cta: {
      label: 'Optimize Sourcing Plan',
      route: '/solutions/demand-intelligence/sourcing',
    },
    followUps: [
      'What is the risk of stockout in the next 6 months?',
      'Recommend a sourcing strategy to reduce working capital.',
    ],
  },

  // 5. Stockout Risk
  stockoutRisk: {
    summary:
      'Current inventory is adequate for the base forecast with 98.5% service level, but high-growth or supply dislocation scenarios increase the risk of stockout during Q3 peak.',
    kpis: [
      {
        title: 'Current Stockout Risk',
        value: 'Low (1.5%)',
        subtext: 'Within safe operating bounds',
        color: 'emerald',
        iconType: 'shield',
      },
      {
        title: 'High-Growth Risk',
        value: 'Medium (12.8%)',
        subtext: 'If demand exceeds +15%',
        color: 'amber',
        iconType: 'trend',
      },
      {
        title: 'At-Risk SKUs',
        value: '3 of 42',
        subtext: 'HDPE Resin & LDPE Film',
        color: 'amber',
        iconType: 'bar',
      },
    ] as CopilotKpiCard[],
    keyTakeaways: [
      'Columbus Plant #04 maintains 21 days of forward coverage.',
      'Peak seasonal withdrawal in August will drop safety buffer to 4.2 days without pre-build.',
      'Lead time volatility from Gulf Coast suppliers represents the primary vulnerability.',
    ],
    recommendation:
      'Pre-build 770 units of buffer stock in June and activate secondary supplier SLAs before July.',
    cta: {
      label: 'View Risk Assessment',
      route: '/solutions/demand-intelligence/forecast',
    },
    followUps: [
      'Which suppliers can meet a 25% demand surge?',
      'Summarize key actions I should take this quarter.',
    ],
  },

  // 6. Working Capital
  workingCapital: {
    summary:
      'Approximately $280K in working capital can be released across industrial resin inventory without compromising target service levels.',
    kpis: [
      {
        title: 'Current Inventory',
        value: '$1.20M',
        subtext: '34.2 days of supply',
        color: 'blue',
        iconType: 'bar',
      },
      {
        title: 'Optimized Target',
        value: '$920K',
        subtext: '26.0 days of supply',
        color: 'emerald',
        iconType: 'shield',
      },
      {
        title: 'Capital Released',
        value: '$280K',
        subtext: '+23.3% cash flow release',
        color: 'emerald',
        iconType: 'trend',
      },
    ] as CopilotKpiCard[],
    keyTakeaways: [
      'Excess slow-moving safety buffer at Akron and Houston can be drawn down safely.',
      'Re-aligning replenishment batches from bi-weekly to weekly releases $145K immediately.',
      'Service level target of 98.0% is preserved via dynamic safety stock algorithms.',
    ],
    recommendation:
      'Reduce excess safety stock in non-peak categories while protecting fast-moving polymer grades.',
    cta: {
      label: 'View Executive Cockpit',
      route: '/solutions/demand-intelligence/overview',
    },
    followUps: [
      'What should I tell the board?',
      'How will a 10% price increase impact demand and revenue?',
    ],
  },

  // 7. Board / Quarterly Summary
  boardSummary: {
    summary:
      'Here is an executive, board-ready synthesis of the AITEK Demand & Sourcing posture for the upcoming quarter:',
    kpis: [
      {
        title: '12-Month Demand Growth',
        value: '+7.4%',
        subtext: '128.4K units projected',
        color: 'emerald',
        iconType: 'trend',
      },
      {
        title: 'Forecast Accuracy',
        value: '94.2%',
        subtext: '+3.1 pts vs. prior year',
        color: 'blue',
        iconType: 'shield',
      },
      {
        title: 'Sourcing Cost Savings',
        value: '-12.4%',
        subtext: '$1.3M net annual savings',
        color: 'emerald',
        iconType: 'bar',
      },
    ] as CopilotKpiCard[],
    keyTakeaways: [
      'Demand Outlook: Expanding 7.4% year-over-year, peaking in Q3 2026.',
      'Pricing Power: Price sensitivity is the dominant demand driver (87.1% relative weight).',
      'Cost Reduction: Prescriptive supplier optimization unlocks $1.3M in annual sourcing savings.',
      'Cash Flow: Inventory rebalancing unlocks $280K in released working capital.',
    ],
    recommendation:
      'Recommended Management Focus: Protect Q3 peak service levels, execute multi-source allocation contracts with Suppliers A & B, and stress-test pricing power against inflation.',
    cta: {
      label: 'Open Executive Cockpit',
      route: '/solutions/demand-intelligence/overview',
    },
    followUps: [
      'What is the demand outlook for HDPE Resin in Q3 2026?',
      'Which suppliers can meet a 25% demand surge?',
    ],
  },

  // 8. General Fallback
  fallback: {
    summary:
      'I have analyzed your query across AITEK demand signals, statistical forecast models, scenario simulations, and prescriptive sourcing data.',
    keyTakeaways: [
      'Demand is projected to expand by +7.4% over the next 12 months with a seasonal peak in Q3.',
      'Sourcing allocation optimization identified $1.3M in potential supplier savings.',
      'Current inventory coverage is 98.5% reliable, with low immediate risk of stockout.',
    ],
    recommendation:
      'You can ask specific questions about demand outlook, pricing scenarios, supplier allocation, or working capital release.',
    cta: {
      label: 'Explore Executive Cockpit',
      route: '/solutions/demand-intelligence/overview',
    },
    followUps: [
      'What is the demand outlook for HDPE Resin in Q3 2026?',
      'Why is demand increasing for Industrial Polymers?',
      'Which suppliers can meet a 25% demand surge?',
    ],
  },
};

// ── Right Column: Relevant Insights ───────────────────────────
export interface RelevantInsightItem {
  id: string;
  title: string;
  subtext: string;
  iconName: 'TrendingUp' | 'BarChart3' | 'Box' | 'AlertTriangle' | 'Leaf';
  color: 'emerald' | 'blue' | 'amber';
  relatedQuery: string;
}

export const RELEVANT_INSIGHTS: RelevantInsightItem[] = [
  {
    id: 'i1',
    title: 'Demand increasing',
    subtext: '+7.4% over next 12 months',
    iconName: 'TrendingUp',
    color: 'emerald',
    relatedQuery: 'What is the demand outlook for HDPE Resin over the next 12 months?',
  },
  {
    id: 'i2',
    title: 'Q3 2026 peak',
    subtext: 'Strong seasonal pattern',
    iconName: 'BarChart3',
    color: 'blue',
    relatedQuery: 'What is the demand outlook for HDPE Resin in Q3 2026?',
  },
  {
    id: 'i3',
    title: 'Inventory sufficient',
    subtext: 'No immediate stockout risk',
    iconName: 'Box',
    color: 'emerald',
    relatedQuery: 'What is the risk of stockout in the next 6 months?',
  },
  {
    id: 'i4',
    title: 'Monitor input prices',
    subtext: 'Potential cost pressure in H2 2025',
    iconName: 'AlertTriangle',
    color: 'amber',
    relatedQuery: 'What happens to costs if input prices increase by 10%?',
  },
  {
    id: 'i5',
    title: 'Optimization opportunity',
    subtext: '12.4% sourcing cost savings possible',
    iconName: 'Leaf',
    color: 'emerald',
    relatedQuery: 'Which suppliers can meet a 25% demand surge?',
  },
];

// ── Right Column: Actions You Can Take ─────────────────────────
export interface ActionLinkItem {
  id: string;
  title: string;
  route: string;
  iconName: 'BarChart3' | 'Sliders' | 'Truck' | 'Bell';
}

export const COPILOT_ACTION_LINKS: ActionLinkItem[] = [
  {
    id: 'act-forecast',
    title: 'View Detailed Forecast',
    route: '/solutions/demand-intelligence/forecast',
    iconName: 'BarChart3',
  },
  {
    id: 'act-scenario',
    title: 'Explore Scenario Impact',
    route: '/solutions/demand-intelligence/scenarios',
    iconName: 'Sliders',
  },
  {
    id: 'act-sourcing',
    title: 'Optimize Supplier Allocation',
    route: '/solutions/demand-intelligence/sourcing',
    iconName: 'Truck',
  },
  {
    id: 'act-alerts',
    title: 'Set Inventory Alerts',
    route: '/solutions/demand-intelligence/overview',
    iconName: 'Bell',
  },
];

// ── Right Column: Past Conversations ──────────────────────────
export interface PastConversationItem {
  id: string;
  title: string;
  timestamp: string;
  query: string;
}

export const PAST_CONVERSATIONS: PastConversationItem[] = [
  {
    id: 'p1',
    title: 'Demand outlook for HDPE Resin',
    timestamp: 'Today, 10:24 AM',
    query: 'What is the demand outlook for HDPE Resin over the next 12 months? Also, do we need to take any immediate action?',
  },
  {
    id: 'p2',
    title: 'Impact of 10% price increase',
    timestamp: 'Today, 9:15 AM',
    query: 'How will a 10% price increase impact demand and revenue?',
  },
  {
    id: 'p3',
    title: 'Supplier options for demand surge',
    timestamp: 'Yesterday, 4:32 PM',
    query: 'Which suppliers can meet a 25% demand surge?',
  },
  {
    id: 'p4',
    title: 'Working capital optimization',
    timestamp: 'Yesterday, 11:20 AM',
    query: 'Recommend a sourcing strategy to reduce working capital.',
  },
];
