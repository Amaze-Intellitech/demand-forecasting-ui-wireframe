import { RiskException } from '../types/domain/riskExceptionCenter';

// Rows evt-101..evt-105 correspond 1:1 to RECENT_PLANNING_EVENTS_MOCK in executiveCommandCenterMock.ts,
// so a Recent Activity "View" click and a Risk & Exception Center deep link resolve to the same incident.
export const RISK_EXCEPTIONS_MOCK: RiskException[] = [
  {
    id: 'evt-101',
    title: 'Supplier C capacity constraint detected',
    description:
      'Supplier C capacity utilization is operating at 96.4%, above the 85% stability threshold, putting Q3 polymer manufacturing service levels at risk of disruption.',
    severity: 'critical',
    category: 'Supply Risk',
    affectedPlant: 'Plant A',
    affectedRegion: 'North America',
    detectedAt: 'Today, 10:24 AM',
    status: 'Open',
    owner: 'Sourcing Ops — M. Alvarez',
    underlyingSignals: [
      'Supplier capacity utilization: 96.4% (threshold 85%)',
      'Lead time variance: +5 days over trailing 4 weeks',
      'Secondary supplier headroom: 22% available capacity',
    ],
    recommendedActions: [
      'Shift 14% of volume allocation to Supplier A and secondary verified partners',
      'Review Supplier Allocation Matrix in Supply & Capacity Optimization',
    ],
  },
  {
    id: 'evt-102',
    title: 'Packaging demand up 18% in APAC',
    description:
      'Rapid acceleration in regional industrial packaging and e-commerce distribution orders is outpacing the current forecast baseline for the Singapore regional distribution center.',
    severity: 'high',
    category: 'Demand Surge',
    affectedPlant: 'Plant B',
    affectedRegion: 'Asia Pacific',
    detectedAt: 'Today, 08:17 AM',
    status: 'In Review',
    owner: 'Demand Planning — R. Chen',
    underlyingSignals: [
      'POS sell-through +18% vs. 8-week rolling average',
      'Distributor reorder frequency up 2.1x',
      'Regional inventory cover down to 9 days',
    ],
    recommendedActions: [
      'Increase buffer inventory targets by 1,200 MT to mitigate stockout risk',
      'Open Forecast Intelligence to re-baseline the APAC horizon',
    ],
  },
  {
    id: 'evt-103',
    title: 'Inventory risk increasing in Plant D',
    description:
      'Intermediate compound replenishment lead time has been delayed by 4 business days, raising the near-term stockout probability at the Houston production hub.',
    severity: 'medium',
    category: 'Inventory',
    affectedPlant: 'Plant D',
    affectedRegion: 'North America',
    detectedAt: 'Yesterday, 4:32 PM',
    status: 'Open',
    owner: 'Inventory Control — J. Okafor',
    underlyingSignals: [
      'Replenishment lead time: +4 business days vs. plan',
      'Days of supply: 11 days (target 18 days)',
      'Safety stock buffer utilization: 78%',
    ],
    recommendedActions: [
      'Trigger expedited replenishment from regional auxiliary safety stock',
      'Inspect Inventory Cover Analysis for downstream SKUs',
    ],
  },
  {
    id: 'evt-104',
    title: 'Resin prices increased by 12%',
    description:
      'Global upstream ethylene and propylene feedstock spot quotes have spiked, affecting enterprise purchasing and finished-goods pricing assumptions.',
    severity: 'medium',
    category: 'Market Signal',
    affectedRegion: 'Global',
    detectedAt: 'Yesterday, 1:15 PM',
    status: 'Monitoring',
    owner: 'Commercial Finance — T. Ibrahim',
    underlyingSignals: [
      'Gulf Coast feedstock benchmark index: +12.3%',
      'Contract price escalation clause utilization: 3 of 9 tier-2 contracts',
    ],
    recommendedActions: [
      'Recalculate pricing elasticity thresholds',
      'Assess Cost-Volume Elasticity Model before adjusting list prices',
    ],
  },
  {
    id: 'evt-105',
    title: 'New cost optimization opportunity identified',
    description:
      'Contract volume consolidation thresholds have been unlocked across regional vendors, creating a tier-1 tariff opportunity across all operating plants.',
    severity: 'low',
    category: 'Sourcing',
    affectedRegion: 'Global',
    detectedAt: 'Jan 14, 2025, 9:08 AM',
    status: 'Open',
    owner: 'Procurement — L. Novak',
    underlyingSignals: [
      'Aggregate raw polymer volume crosses tier-1 tariff threshold',
      'Estimated savings: $2.8M annualized',
    ],
    recommendedActions: [
      'Consolidate auxiliary raw polymer volumes under renegotiated tier-1 tariffs',
      'Execute plan from Supply & Capacity Optimization',
    ],
  },
  {
    id: 'rx-201',
    title: 'HDPE Resin (SKU-9021) stockout risk in APAC',
    description:
      'HDPE Resin at the Singapore regional distribution center has dropped to 12 days of cover against an 18-day safety threshold.',
    severity: 'critical',
    category: 'Inventory',
    affectedSku: 'SKU-9021',
    affectedPlant: 'Plant B',
    affectedRegion: 'Asia Pacific',
    detectedAt: 'Today, 07:02 AM',
    status: 'Open',
    owner: 'Inventory Control — R. Chen',
    underlyingSignals: [
      'Days of supply: 12 days (target 18 days)',
      'Inbound replenishment ETA slipped by 3 days',
    ],
    recommendedActions: [
      'Expedite inbound shipment from Plant A',
      'Review Inventory Health by SKU in Inventory Intelligence',
    ],
  },
  {
    id: 'rx-202',
    title: 'Competitor price cut in LLDPE segment',
    description:
      'A key competitor reduced list prices by 6% in the LLDPE segment across North America, creating share-of-wallet risk on mid-tier accounts.',
    severity: 'high',
    category: 'Market Signal',
    affectedRegion: 'North America',
    detectedAt: 'Yesterday, 11:40 AM',
    status: 'In Review',
    owner: 'Commercial Finance — T. Ibrahim',
    underlyingSignals: [
      'Competitor list price index: -6.0%',
      'Mid-tier account churn risk score: elevated',
    ],
    recommendedActions: [
      'Run a price/promotion scenario in Driver & Causal Intelligence',
      'Evaluate targeted account-level pricing response',
    ],
  },
  {
    id: 'rx-203',
    title: 'Weather disruption at Gulf Coast port',
    description:
      'A tropical storm advisory is forecast to affect Gulf Coast port operations for 48-72 hours, with potential inbound feedstock delays.',
    severity: 'high',
    category: 'Supply Risk',
    affectedRegion: 'North America',
    detectedAt: '2 days ago',
    status: 'Monitoring',
    owner: 'Sourcing Ops — M. Alvarez',
    underlyingSignals: [
      'NOAA advisory: 60% landfall probability within 72 hours',
      'Port throughput forecast: -35% during advisory window',
    ],
    recommendedActions: [
      'Pre-position 5 days of buffer feedstock at Plant A and Plant D',
      'Monitor port status and update Risk Analysis panel in Supply & Capacity Optimization',
    ],
  },
  {
    id: 'rx-204',
    title: 'PET Resin demand surge from new account',
    description:
      'A newly onboarded distributor account has placed orders 3.4x above initial forecast, concentrated in the PET Resin category.',
    severity: 'medium',
    category: 'Demand Surge',
    affectedPlant: 'Plant C',
    affectedRegion: 'Europe',
    detectedAt: '3 days ago',
    status: 'Resolved',
    owner: 'Demand Planning — H. Fischer',
    underlyingSignals: [
      'New account order volume: 3.4x initial forecast',
      'Forecast has been re-baselined and confirmed stable for 2 consecutive weeks',
    ],
    recommendedActions: [
      'Re-baseline forecast for the account (completed)',
      'Continue monitoring for one additional cycle',
    ],
  },
  {
    id: 'rx-205',
    title: 'Safety stock breach at Plant E',
    description:
      'PP Resin safety stock at Plant E fell below the minimum threshold for 6 consecutive hours before replenishment cleared the constraint.',
    severity: 'low',
    category: 'Inventory',
    affectedSku: 'SKU-4410',
    affectedPlant: 'Plant E',
    affectedRegion: 'Latin America',
    detectedAt: '4 days ago',
    status: 'Resolved',
    owner: 'Inventory Control — J. Okafor',
    underlyingSignals: [
      'Safety stock breach duration: 6 hours',
      'Replenishment cleared the constraint within SLA',
    ],
    recommendedActions: [
      'No further action required — resolved within standard replenishment SLA',
    ],
  },
  {
    id: 'rx-206',
    title: 'Secondary supplier certification lapse',
    description:
      'Supplier B\'s ISO 9001 certification lapsed pending renewal, temporarily reducing qualified secondary sourcing capacity.',
    severity: 'medium',
    category: 'Sourcing',
    affectedRegion: 'North America',
    detectedAt: '5 days ago',
    status: 'Open',
    owner: 'Procurement — L. Novak',
    underlyingSignals: [
      'Certification status: lapsed, renewal in progress',
      'Qualified secondary capacity: reduced by 8%',
    ],
    recommendedActions: [
      'Follow up on renewal timeline with Supplier B',
      'Temporarily route overflow volume to Supplier A',
    ],
  },
  {
    id: 'rx-207',
    title: 'Anomalous order pattern flagged',
    description:
      'An automated anomaly detector flagged an unusual order cadence from a distributor in the Middle East & Africa region, inconsistent with historical seasonality.',
    severity: 'low',
    category: 'Market Signal',
    affectedRegion: 'Middle East & Africa',
    detectedAt: '6 days ago',
    status: 'Monitoring',
    owner: 'Demand Planning — H. Fischer',
    underlyingSignals: [
      'Order cadence deviation: 2.8 standard deviations from seasonal baseline',
      'No corresponding promotional or macro event identified',
    ],
    recommendedActions: [
      'Confirm order legitimacy with distributor account manager',
      'Continue monitoring for a recurring pattern',
    ],
  },
];
