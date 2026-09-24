import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BarChart2,
  Package,
  Box,
  ShieldCheck,
  AlertTriangle,
  Coins,
  Sparkles,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { ExecutiveKpi } from '../../../types/domain/executiveCommandCenter';

interface KpiDetailModalProps {
  kpi: ExecutiveKpi | null;
  isOpen: boolean;
  onClose: () => void;
}

export const KpiDetailModal: React.FC<KpiDetailModalProps> = ({ kpi, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedHorizon, setSelectedHorizon] = useState<'12m' | '6m' | 'q4'>('12m');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !kpi) return null;

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const getKpiDetails = () => {
    switch (kpi.id) {
      case 'kpi-demand':
        return {
          icon: BarChart2,
          color: 'text-primary bg-info-bg border-border',
          category: 'Demand Operations',
          target: '1.24M units (103.2% of annual plan)',
          variance: '+7.4% (+88.2K units vs. prior year)',
          confidence: 'P10: 1.15M | P50: 1.28M | P90: 1.39M',
          trendSeries: [92, 98, 104, 107, 110, 115, 122, 128, 134, 140, 146, 152],
          periods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          breakdown: [
            { name: 'Industrial Polymers', value: '537.6K units (42%)', trend: '+8.1%', positive: true },
            { name: 'Automotive Compounds', value: '358.4K units (28%)', trend: '+6.4%', positive: true },
            { name: 'Industrial Packaging', value: '230.4K units (18%)', trend: '+14.2%', positive: true },
            { name: 'Consumer Products', value: '153.6K units (12%)', trend: '-1.8%', positive: false },
          ],
          regionalSplit: [
            { region: 'North America', share: '46%', volume: '588.8K units' },
            { region: 'Europe', share: '28%', volume: '358.4K units' },
            { region: 'Asia Pacific', share: '20%', volume: '256.0K units' },
            { region: 'Latin America', share: '6%', volume: '76.8K units' },
          ],
          aiDiagnosis:
            'Autonomous demand sensing has detected structural uplift across automotive tier-1 assembly and regional industrial packaging contracts. APAC order frequency is outpacing rolling averages by 18%, indicating sustained baseline demand expansion into Q4.',
          actionPath: '/solutions/demand-intelligence/forecast',
          actionLabel: 'Open Forecast Intelligence',
        };
      case 'kpi-revenue':
        return {
          icon: Package,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
          category: 'Commercial Finance',
          target: '$178.0M (103.5% of revenue plan)',
          variance: '+$11.8M vs. trailing baseline',
          confidence: 'Gross Margin Impact: 32.4% (+1.2% pts)',
          trendSeries: [12.4, 13.1, 14.2, 14.8, 15.5, 16.2, 16.9, 17.5, 18.2, 18.8, 19.4, 20.1],
          periods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          breakdown: [
            { name: 'Specialty Resins (High Margin)', value: '$77.4M (42%)', trend: '+12.4%', positive: true },
            { name: 'Standard Polymers', value: '$55.3M (30%)', trend: '+3.8%', positive: true },
            { name: 'High-Density Packaging', value: '$36.8M (20%)', trend: '+9.2%', positive: true },
            { name: 'Direct Customer Contracts', value: '$14.7M (8%)', trend: '-2.1%', positive: false },
          ],
          regionalSplit: [
            { region: 'North America', share: '48%', volume: '$88.4M' },
            { region: 'Europe', share: '29%', volume: '$53.4M' },
            { region: 'Asia Pacific', share: '18%', volume: '$33.2M' },
            { region: 'Latin America', share: '5%', volume: '$9.2M' },
          ],
          aiDiagnosis:
            'Revenue opportunity trajectory remains robust due to higher margin mix in specialty compounds and disciplined index-linked pricing. Price elasticity algorithms suggest further 2.2% margin headroom in select North American industrial accounts without triggering volume churn.',
          actionPath: '/solutions/demand-intelligence/drivers',
          actionLabel: 'Open Driver & Causal Pricing',
        };
      case 'kpi-inventory':
        return {
          icon: Box,
          color: 'text-purple-600 bg-purple-50 border-purple-200',
          category: 'Working Capital & Supply',
          target: '$90.0M (Within safety envelope)',
          variance: '-$13.0M (-12.3% YoY reduction)',
          confidence: 'Days of Supply: 32.4 days (Target: 30 days)',
          trendSeries: [105.4, 102.8, 99.5, 98.1, 96.4, 95.0, 94.2, 93.6, 92.8, 92.4, 91.5, 90.8],
          periods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          breakdown: [
            { name: 'Raw Material Feedstock', value: '$34.2M (37%)', trend: '-8.4%', positive: true },
            { name: 'Work in Progress (WIP)', value: '$18.5M (20%)', trend: '-14.1%', positive: true },
            { name: 'Finished Goods Inventory', value: '$39.7M (43%)', trend: '-13.2%', positive: true },
          ],
          regionalSplit: [
            { region: 'Plant A (North America)', share: '34%', volume: '$31.4M' },
            { region: 'Plant B (Asia Pacific)', share: '26%', volume: '$24.0M' },
            { region: 'Plant C (Europe)', share: '24%', volume: '$22.2M' },
            { region: 'Plant D & E', share: '16%', volume: '$14.8M' },
          ],
          aiDiagnosis:
            'Multi-echelon inventory optimization has reduced deadstock buffer by 18%, freeing $12.4M cash while preserving 97.8% customer service levels. Only one isolated SKU (HDPE Resin SKU-9021 in Singapore RDC) warrants replenishment acceleration.',
          actionPath: '/solutions/demand-intelligence/inventory',
          actionLabel: 'Open Inventory Intelligence',
        };
      case 'kpi-service':
        return {
          icon: ShieldCheck,
          color: 'text-primary bg-info-bg border-border',
          category: 'Customer Fulfillment',
          target: '97.0% SLA Benchmark',
          variance: '+0.8% above contract commitment',
          confidence: 'On-Time In-Full (OTIF): 96.2%',
          trendSeries: [96.2, 96.5, 96.8, 97.0, 97.2, 97.4, 97.5, 97.7, 97.8, 97.9, 98.0, 98.2],
          periods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          breakdown: [
            { name: 'Plant A — North America Hub', value: '98.4% OTIF', trend: '+1.1%', positive: true },
            { name: 'Plant C — Europe Mainline', value: '98.2% OTIF', trend: '+0.9%', positive: true },
            { name: 'Plant D — Houston Operations', value: '97.1% OTIF', trend: '+0.4%', positive: true },
            { name: 'Plant B — Asia Pacific Hub', value: '96.8% OTIF', trend: '-0.3%', positive: false },
          ],
          regionalSplit: [
            { region: 'Automotive Sector', share: '99.2% fulfillment', volume: 'Critical SLA' },
            { region: 'Industrial Sector', share: '98.0% fulfillment', volume: 'Standard SLA' },
            { region: 'Packaging Sector', share: '97.1% fulfillment', volume: 'Standard SLA' },
            { region: 'Auxiliary Distribution', share: '96.4% fulfillment', volume: 'Flexible' },
          ],
          aiDiagnosis:
            'Overall service level is performing well above the 97.0% enterprise SLA threshold. Plant B port throughput delay is the only localized drag on APAC deliveries. Routing supplemental finished stock from Plant A completely stabilizes regional fulfillment.',
          actionPath: '/solutions/demand-intelligence/supply-capacity',
          actionLabel: 'Open Supply & Capacity Optimization',
        };
      case 'kpi-exceptions':
        return {
          icon: AlertTriangle,
          color: 'text-rose-600 bg-rose-50 border-rose-200',
          category: 'Risk & Autonomous Governance',
          target: 'Threshold: < 5 High/Critical items',
          variance: '2 Critical items require immediate sign-off',
          confidence: 'Total Open Exceptions: 12 (4 High, 4 Medium, 2 Low)',
          trendSeries: [18, 16, 15, 14, 13, 14, 15, 13, 12, 12, 11, 10],
          periods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          breakdown: [
            { name: 'Supplier C capacity constraint (Utilization 96.4%)', value: 'Critical Severity', trend: 'Plant A affected', positive: false },
            { name: 'HDPE Resin SKU-9021 stockout risk (12 days cover)', value: 'Critical Severity', trend: 'Singapore RDC', positive: false },
            { name: 'Packaging demand surge (+18% above baseline)', value: 'High Severity', trend: 'Plant B APAC', positive: false },
            { name: 'Gulf Coast port weather disruption advisory', value: 'High Severity', trend: 'Houston Feedstock', positive: false },
          ],
          regionalSplit: [
            { region: 'Critical Exceptions', share: '2 items', volume: 'Requires Action' },
            { region: 'High Severity', share: '4 items', volume: 'In Triage' },
            { region: 'Medium Severity', share: '4 items', volume: 'Monitoring' },
            { region: 'Low Severity', share: '2 items', volume: 'Auto-mitigated' },
          ],
          aiDiagnosis:
            'Exactly 2 critical exceptions require executive sign-off: (1) Reallocating 14% polymer volume from constrained Supplier C to secondary approved suppliers, and (2) Expediting HDPE Resin replenishment to the Singapore distribution center before stock cover dips under 10 days.',
          actionPath: '/solutions/demand-intelligence/risk-exceptions?severity=critical',
          actionLabel: 'View Critical Exceptions (2 Active)',
        };
      case 'kpi-sourcing':
      default:
        return {
          icon: Coins,
          color: 'text-amber-600 bg-amber-50 border-amber-200',
          category: 'Procurement Efficiency',
          target: '$15.0M Enterprise Annual Goal',
          variance: '+$1.4M above run-rate plan',
          confidence: 'Realized YTD: $7.8M | Unlocked: $4.6M',
          trendSeries: [1.2, 2.1, 3.4, 4.6, 5.8, 6.9, 7.8, 8.9, 10.1, 11.2, 12.4, 13.6],
          periods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          breakdown: [
            { name: 'Tier-1 Contract Volume Tariff Consolidation', value: '$2.8M Annualized', trend: '+14.2%', positive: true },
            { name: 'Alternative Feedstock Index Optimization', value: '$1.9M Unlocked', trend: '+8.4%', positive: true },
            { name: 'Regional Freight Lane Renegotiation', value: '$1.6M Captured', trend: '+6.1%', positive: true },
            { name: 'Spot Buy Minimization Algorithms', value: '$1.5M Savings', trend: '+11.0%', positive: true },
          ],
          regionalSplit: [
            { region: 'Supplier A (North America)', share: '42%', volume: '$5.2M savings' },
            { region: 'Supplier B (Europe)', share: '32%', volume: '$4.0M savings' },
            { region: 'Auxiliary Spot Consolidation', share: '18%', volume: '$2.2M savings' },
            { region: 'Logistics Optimization', share: '8%', volume: '$1.0M savings' },
          ],
          aiDiagnosis:
            'Aggregated raw polymer volumes cross tier-1 tariff thresholds across all five operating hubs. Consolidating spot purchases into renegotiated master agreements is projected to unlock the remaining $4.6M sourcing pipeline ahead of schedule.',
          actionPath: '/solutions/demand-intelligence/supply-capacity',
          actionLabel: 'Open Sourcing & Capacity Plans',
        };
    }
  };

  const details = getKpiDetails();
  const Icon = details.icon;

  // SVG Chart Calculation
  const chartWidth = 680;
  const chartHeight = 170;
  const padding = { top: 20, right: 25, bottom: 30, left: 35 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  const minVal = Math.min(...details.trendSeries) * 0.92;
  const maxVal = Math.max(...details.trendSeries) * 1.08;

  const getPtX = (i: number) => padding.left + (i / (details.trendSeries.length - 1)) * innerW;
  const getPtY = (v: number) => padding.top + innerH - ((v - minVal) / (maxVal - minVal)) * innerH;

  const points = details.trendSeries.map((v, i) => `${getPtX(i)},${getPtY(v)}`);
  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `M ${points.join(' L ')} L ${getPtX(details.trendSeries.length - 1)},${padding.top + innerH} L ${getPtX(0)},${padding.top + innerH} Z`;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-7 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs ${details.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {details.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-semibold">
                  Maximized Detailed View
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {kpi.label}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Exported</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export Report</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors shadow-2xs"
              title="Close (Esc)"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
          {/* Key Metric Headline Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <div>
              <div className="text-xs text-slate-500 font-medium">Current Operational Value</div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-0.5">
                {kpi.value}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold">
                {kpi.semanticIntent === 'critical' ? (
                  <span className="text-rose-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                    {kpi.subtext}
                  </span>
                ) : kpi.trendDirection === 'up' ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {kpi.subtext}
                  </span>
                ) : (
                  <span className="text-rose-600 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    {kpi.subtext}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">Enterprise Target / Baseline</div>
              <div className="text-base font-bold text-slate-800 mt-1">{details.target}</div>
              <div className="text-xs text-slate-600 mt-0.5">{details.variance}</div>
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">Statistical Confidence & Range</div>
              <div className="text-xs font-semibold text-slate-800 mt-1 font-mono">{details.confidence}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Calculated across trailing 90-day telemetry</div>
            </div>
          </div>

          {/* Detailed SVG Horizon Chart */}
          <div className="rounded-xl border border-slate-200/80 p-5 bg-white shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Historical Trajectory & Projection</h4>
                <p className="text-xs text-slate-500">Trailing progression and forward planning trajectory</p>
              </div>

              <div className="flex items-center rounded-lg bg-slate-100 p-0.5 text-xs font-semibold text-slate-600">
                <button
                  type="button"
                  onClick={() => setSelectedHorizon('12m')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedHorizon === '12m' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  12-Month View
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHorizon('6m')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedHorizon === '6m' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  6-Month Trend
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHorizon('q4')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedHorizon === 'q4' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Q4 Outlook
                </button>
              </div>
            </div>

            <div className="w-full overflow-hidden">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                <defs>
                  <linearGradient id="kpiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#155dfc" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#155dfc" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Grid Lines */}
                {[0.2, 0.5, 0.8].map((ratio) => {
                  const y = padding.top + innerH * ratio;
                  return (
                    <line
                      key={ratio}
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Area and Line */}
                <path d={areaPath} fill="url(#kpiGrad)" />
                <path d={linePath} fill="none" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round" />

                {/* Points */}
                {details.trendSeries.map((v, i) => {
                  const cx = getPtX(i);
                  const cy = getPtY(v);
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="3.5" fill="#ffffff" stroke="#155dfc" strokeWidth="2" />
                      <text
                        x={cx}
                        y={chartHeight - 8}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#94a3b8"
                        className="font-medium"
                      >
                        {details.periods[i]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Breakdown & Segments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Category / Contribution Breakdown */}
            <div className="rounded-xl border border-slate-200/80 p-4.5 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Key Contributing Segments
              </h4>
              <div className="space-y-2.5">
                {details.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.value}</div>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        item.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {item.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional / Operational Footprint */}
            <div className="rounded-xl border border-slate-200/80 p-4.5 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Operational & Regional Distribution
              </h4>
              <div className="space-y-2.5">
                {details.regionalSplit.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{item.region}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.volume}</div>
                    </div>
                    <span className="font-bold text-slate-700 text-xs bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.share}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Autonomous AI Diagnostic Insight */}
          <div className="p-4.5 rounded-xl bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/70 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0062d2] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <span>Autonomous AI Diagnostic</span>
                <span className="text-[10px] font-normal text-blue-600 bg-white px-1.5 py-0.2 rounded border border-blue-200">
                  Live
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed mt-1 font-normal">
                {details.aiDiagnosis}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/80">
          <div className="text-xs text-slate-500">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px]">Esc</kbd> to minimize
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              Minimize View
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate(details.actionPath);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4.5 py-2 rounded-lg bg-[#0062d2] hover:bg-[#0051b3] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>{details.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
