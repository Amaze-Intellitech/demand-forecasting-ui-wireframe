import React, { useState } from 'react';
import { toast } from 'sonner';
import { Badge, Card, CardHead, Insight, AlertBar } from './CommonUI';
import { Button } from '@/components/ui/Button';

// Stage 7: the objective and the full constraint set are confirmed BEFORE a solver is chosen (design bible §4 Stage 7).
// Three modes must stay distinguishable: Static, Dynamic and On-the-fly.
const OBJECTIVES = [
  { id: 'inv', label: 'Minimise inventory', desc: 'Hold as little stock as the constraints allow.' },
  { id: 'cost', label: 'Minimise inventory cost', desc: 'Lowest combined ordering, carrying and shortage cost.' },
  { id: 'service', label: 'Hold service level', desc: 'Protect production and delivery commitments first.' },
  { id: 'wc', label: 'Optimise working capital', desc: 'Free up cash while keeping cover above the floor.' },
  { id: 'proc', label: 'Optimise procurement quantities', desc: 'Best order sizes and timing per supplier.' },
];

const CONSTRAINTS = [
  { id: 'prod', label: 'Production requirements', on: true },
  { id: 'cons', label: 'Raw-material consumption', on: true },
  { id: 'scap', label: 'Supplier capacity', on: true },
  { id: 'slt', label: 'Supplier lead time', on: true },
  { id: 'stor', label: 'Storage capacity', on: true },
  { id: 'pcost', label: 'Procurement cost', on: false },
  { id: 'price', label: 'Price', on: false },
  { id: 'qty', label: 'Quantity limits', on: true },
];

const MODES = [
  { id: 'static', label: 'Static', desc: 'One point-in-time run.' },
  { id: 'dynamic', label: 'Dynamic', desc: 'Re-optimises as conditions change over the same horizon, e.g. a shipment due in 3–6 days instead of a fixed 5.' },
  { id: 'live', label: 'On-the-fly', desc: 'Takes a new constraint mid-execution without restarting the plan.' },
];

interface PersonaSetupLens {
  objective: string;
  key: string[];
  extraOn: string[];
  label: string;
  read: (gap: number, f: string, o: string, u: string, m: string) => React.ReactNode;
}

// What each plant persona optimises for first, the constraints they own, and the one sentence that frames the result.
const PERSONA_SETUP: Record<string, PersonaSetupLens> = {
  supervisor: {
    objective: 'service', key: ['prod', 'cons', 'slt'], extraOn: [], label: 'Plant Supervisor',
    read: (_gap, f, o, u, m) => <>For {m}, the line-first position is about <span className="metric font-semibold text-ink">{o} {u}</span> against <span className="metric font-semibold text-ink">{f} {u}</span> expected. Objective starts at <strong>hold service level</strong>, with production, consumption and lead time as your key constraints.</>,
  },
  warehouse: {
    objective: 'inv', key: ['stor', 'qty', 'cons'], extraOn: [], label: 'Warehouse Manager',
    read: (gap, f, o, u, m) => <>For {m}, the shelf-friendly position is about <span className="metric font-semibold text-ink">{o} {u}</span> against <span className="metric font-semibold text-ink">{f} {u}</span> expected{gap > 0 ? <>, which clears about <span className="metric font-semibold text-ink">{Math.abs(gap).toLocaleString(undefined, { maximumFractionDigits: 0 })} {u}</span> of surplus</> : null}. Objective starts at <strong>minimise inventory</strong>, with storage capacity as your key constraint.</>,
  },
  planner: {
    objective: 'cost', key: ['prod', 'cons', 'qty'], extraOn: [], label: 'Materials Planner',
    read: (_gap, f, o, u, m) => <>For {m}, the plan-aligned position is about <span className="metric font-semibold text-ink">{o} {u}</span> against <span className="metric font-semibold text-ink">{f} {u}</span> expected. Objective starts at <strong>minimise inventory cost</strong>; production requirements and quantity limits keep it consistent with the build plan.</>,
  },
  procurement: {
    objective: 'proc', key: ['scap', 'slt', 'pcost', 'price'], extraOn: ['pcost', 'price'], label: 'Procurement Officer',
    read: (_gap, f, o, u, m) => <>For {m}, the best order position is about <span className="metric font-semibold text-ink">{o} {u}</span> against <span className="metric font-semibold text-ink">{f} {u}</span> expected. Objective starts at <strong>optimise procurement quantities</strong>, with supplier capacity, lead time, cost and price switched on.</>,
  },
  finance: {
    objective: 'wc', key: ['pcost', 'price', 'qty'], extraOn: ['pcost'], label: 'Finance Controller',
    read: (gap, f, o, u, m) => <>For {m}, the capital-efficient position is about <span className="metric font-semibold text-ink">{o} {u}</span> against <span className="metric font-semibold text-ink">{f} {u}</span> expected{gap > 0 ? <>, releasing the cash tied up in about <span className="metric font-semibold text-ink">{Math.abs(gap).toLocaleString(undefined, { maximumFractionDigits: 0 })} {u}</span></> : null}. Objective starts at <strong>optimise working capital</strong>, with procurement cost in scope.</>,
  },
};

export interface OptimizationSetupProps {
  expected: number;
  optimal: number;
  uom?: string;
  material: string;
  persona?: string;
}

export function OptimizationSetup({ expected, optimal, uom = 'EA', material, persona }: OptimizationSetupProps) {
  const lens = persona ? PERSONA_SETUP[persona] : undefined;
  const [objective, setObjective] = useState(lens?.objective || 'wc');
  const [constraints, setConstraints] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CONSTRAINTS.map((c) => [c.id, c.on || !!lens?.extraOn.includes(c.id)]))
  );
  const [mode, setMode] = useState('static');
  const [confirmed, setConfirmed] = useState(false);
  const [extra, setExtra] = useState(false);

  const active = Object.values(constraints).filter(Boolean).length + (extra ? 1 : 0);
  const objectiveObj = OBJECTIVES.find((o) => o.id === objective);
  const objectiveLabel = objectiveObj ? objectiveObj.label.toLowerCase() : objective;
  const fmt = (v: number | undefined) => (typeof v === 'number' ? v.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—');

  const touch = <T extends (...args: any[]) => void>(fn: T) => (...args: Parameters<T>) => {
    setConfirmed(false);
    fn(...args);
  };

  return (
    <div className="space-y-4 mb-6">
      <Insight label={lens ? `${lens.label} Lens · Expected vs Optimal` : 'Expected vs optimal'}>
        {lens ? lens.read(expected - optimal, fmt(expected), fmt(optimal), uom, material) : (
          <>
            The Multivariate stage expects about <span className="metric font-semibold text-ink">{fmt(expected)} {uom}</span> of {material} on hand. Given your
            objective and constraints, the best position is about <span className="metric font-semibold text-ink">{fmt(optimal)} {uom}</span>. Confirm what
            you are optimising for and what limits apply, then run the optimizer.
          </>
        )}
      </Insight>

      <Card className="mb-0">
        <CardHead
          title="Set up the optimization"
          sub="Step 1 objective, step 2 constraints, step 3 mode. The solver is chosen only after you confirm."
          right={<Badge tone={confirmed ? 'success' : 'watch'}>{confirmed ? 'Confirmed' : 'Not confirmed'}</Badge>}
        />

        <div className="opt-setup grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <fieldset className="opt-setup__col p-3 rounded-md bg-bg border border-border">
            <legend className="eyebrow text-xs font-semibold uppercase tracking-wider text-subtle px-1 mb-2">1 · Objective</legend>
            <div className="space-y-2">
              {OBJECTIVES.map((o) => (
                <label key={o.id} className={`opt-option flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${objective === o.id ? 'bg-surface border border-primary' : 'border border-transparent'}`}>
                  <input type="radio" name="objective" checked={objective === o.id} onChange={touch(() => setObjective(o.id))} className="mt-1" />
                  <span className="flex flex-col">
                    <strong className="text-xs font-semibold text-ink">{o.label}</strong>
                    <span className="text-[11px] text-subtle">{o.desc}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="opt-setup__col p-3 rounded-md bg-bg border border-border">
            <legend className="eyebrow text-xs font-semibold uppercase tracking-wider text-subtle px-1 mb-2">2 · Constraints ({active} active)</legend>
            <div className="space-y-2">
              {CONSTRAINTS.map((c) => (
                <label key={c.id} className="opt-check flex items-center justify-between gap-2 text-xs text-ink cursor-pointer p-1">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked={Boolean(constraints[c.id])} onChange={touch(() => setConstraints((p) => ({ ...p, [c.id]: !p[c.id] })))} />
                    {c.label}
                  </span>
                  {lens?.key.includes(c.id) && <Badge tone="accent" shape={false}>key for you</Badge>}
                </label>
              ))}
              {extra && (
                <label className="opt-check flex items-center justify-between gap-2 text-xs text-ink p-1">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly />
                    Expedited freight capped at 2 trucks
                  </span>
                  <Badge tone="ai" shape={false}>added live</Badge>
                </label>
              )}
            </div>
          </fieldset>

          <fieldset className="opt-setup__col p-3 rounded-md bg-bg border border-border">
            <legend className="eyebrow text-xs font-semibold uppercase tracking-wider text-subtle px-1 mb-2">3 · Mode</legend>
            <div className="space-y-2">
              {MODES.map((m) => (
                <label key={m.id} className={`opt-option flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${mode === m.id ? 'bg-surface border border-primary' : 'border border-transparent'}`}>
                  <input type="radio" name="mode" checked={mode === m.id} onChange={touch(() => setMode(m.id))} className="mt-1" />
                  <span className="flex flex-col">
                    <strong className="text-xs font-semibold text-ink">{m.label}</strong>
                    <span className="text-[11px] text-subtle">{m.desc}</span>
                  </span>
                </label>
              ))}
              {mode === 'live' && confirmed && !extra && (
                <Button size="sm" variant="outline" className="mt-2 w-full text-xs" onClick={() => { setExtra(true); toast.success('Constraint added without restarting the plan'); }}>
                  Add a constraint mid-run
                </Button>
              )}
            </div>
          </fieldset>
        </div>

        {confirmed ? (
          <AlertBar tone="success" title="Objective and constraints confirmed">
            Optimising to <strong>{objectiveLabel}</strong> with {active} constraints in <strong>{mode === 'live' ? 'on-the-fly' : mode}</strong> mode.
            A linear-programming solver has been selected for this problem.
          </AlertBar>
        ) : (
          <AlertBar tone="info" title="Nothing has run yet">
            Confirm the setup to select a solver and produce the plan below.
          </AlertBar>
        )}
        <div className="flex gap-2 mt-3 pt-2">
          <Button onClick={() => { setConfirmed(true); toast.success('Setup confirmed'); }} disabled={confirmed}>
            {confirmed ? 'Setup confirmed' : 'Confirm and run'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default OptimizationSetup;
