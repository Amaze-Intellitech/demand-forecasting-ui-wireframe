import { Badge, Card, CardHead, Insight, DrillDown } from './CommonUI';

// Stage 5: how long money stays tied up, and WHICH leg of the cycle causes the delay (design bible §4 Stage 5).
// Fixed event sequence: Supplier PO → Material Arrival → Supplier Payment → Production Issue → FG Production → FG Sale → Customer Payment.
export const RMLC_EVENTS = ['Supplier PO', 'Material arrival', 'Supplier payment', 'Production issue', 'FG production', 'FG sale', 'Customer payment'];
export const RMLC_LEGS = [
  { key: 'lead', short: 'Supplier lead time', from: 0, to: 1 },
  { key: 'credit', short: 'Supplier credit period', from: 1, to: 2 },
  { key: 'store', short: 'Wait in stores', from: 2, to: 3 },
  { key: 'make', short: 'Production time', from: 3, to: 4 },
  { key: 'fg', short: 'Finished goods unsold', from: 4, to: 5 },
  { key: 'cust', short: 'Customer payment terms', from: 5, to: 6 },
];

// Days per leg, example data.
const MATERIALS = [
  { id: 'MAT-4120', name: 'Microcontroller', days: [6, 4, 5, 4, 10, 6], bottleneck: 'fg', why: 'Cycle is healthy; nothing stands out.' },
  { id: 'MAT-1082', name: 'Hydraulic Pump', days: [12, 10, 8, 6, 14, 20], bottleneck: 'cust', why: 'Customer payment terms lengthened from 30 to 45 days last quarter.' },
  { id: 'MAT-2041', name: 'Lithium Cell', days: [15, 9, 12, 8, 66, 30], bottleneck: 'fg', why: 'Finished goods are sitting unsold in the warehouse for 66 days.' },
];

export const RMLC_CYCLE_MATERIALS = MATERIALS;

const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

interface PersonaLegLens {
  label: string;
  legs: string[];
  sub: string;
  read: (f: any, own: number) => React.ReactNode;
}

const PERSONA_LEGS: Record<string, PersonaLegLens> = {
  supervisor: {
    label: 'Plant Supervisor', legs: ['lead', 'store'],
    sub: 'Highlighted: the two legs that decide whether material reaches the line on time.',
    read: (f, own) => `${f.id} spends ${f.days[0]} days in supplier lead time and ${f.days[2]} waiting in stores before it reaches the line — ${own} of its ${f.total} days.`,
  },
  warehouse: {
    label: 'Warehouse Manager', legs: ['store', 'fg'],
    sub: 'Highlighted: the legs where stock sits physically in your stores.',
    read: (f, own) => `${f.id} sits ${f.days[2]} days as raw material in stores and ${f.days[4]} days as unsold finished goods — ${own} of its ${f.total} days on your shelves.`,
  },
  planner: {
    label: 'Materials Planner', legs: ['store', 'make'],
    sub: 'Highlighted: the legs your plan controls, from stores issue through production.',
    read: (f, own) => `${f.id} waits ${f.days[2]} days in stores and takes ${f.days[3]} days to produce — ${own} of ${f.total} days sit between the plan and finished goods.`,
  },
  procurement: {
    label: 'Procurement Officer', legs: ['lead', 'credit'],
    sub: 'Highlighted: the legs you negotiate with the supplier.',
    read: (f, own) => `${f.id} has a ${f.days[0]}-day supplier lead time and ${f.days[1]} days of supplier credit — ${own} of ${f.total} days are set in the supplier agreement.`,
  },
  finance: {
    label: 'Finance Controller', legs: ['credit', 'fg', 'cust'],
    sub: 'Highlighted: the legs that decide how long cash stays out — supplier credit, unsold goods and customer terms.',
    read: (f, own) => `${f.id} ties up cash for ${f.total} days from PO to customer payment; ${own} of them come from supplier credit, unsold finished goods and customer terms.`,
  },
};

export interface RmlcLegsProps {
  selectedId?: string;
  persona?: string;
}

export function RmlcLegs({ selectedId, persona }: RmlcLegsProps) {
  const lens = persona ? PERSONA_LEGS[persona] : undefined;
  const owned = lens ? RMLC_LEGS.map((l) => lens.legs.includes(l.key)) : RMLC_LEGS.map(() => true);
  const rows = MATERIALS.map((m) => {
    const total = sum(m.days);
    const ownDays = m.days.map((d, i) => (owned[i] ? d : -1));
    const idx = m.days.indexOf(Math.max(...ownDays));
    return { ...m, total, bottleneckIdx: idx, ownTotal: sum(m.days.filter((_, i) => owned[i])) };
  });
  const scale = Math.max(...rows.map((r) => r.total));
  const focus = rows.find((r) => r.id === selectedId) || rows[rows.length - 1];
  const worst = rows[rows.length - 1];

  return (
    <div className="space-y-4 mb-6">
      <Insight key={persona} label={lens ? `${lens.label} Lens · Where the Days Go` : 'Cash cycle'}>
        {lens ? lens.read(focus, focus.ownTotal) : (
          <>
            <span className="metric font-semibold text-ink">{worst.id} · {worst.name}</span> takes <span className="metric font-semibold text-ink">{worst.total} days</span> to turn
            a purchase into cash, {(worst.total / rows[0].total).toFixed(0)}× longer than {rows[0].id}.{' '}
            {worst.days[worst.bottleneckIdx]} of those days ({Math.round((worst.days[worst.bottleneckIdx] / worst.total) * 100)}%) are
            spent in one place: <strong>{RMLC_LEGS[worst.bottleneckIdx].short.toLowerCase()}</strong>. Supplier and production
            timings are normal.
          </>
        )}
      </Insight>

      <Card className="mb-0">
        <CardHead
          title="Days from purchase order to customer payment"
          sub={lens ? lens.sub : 'Each bar is one material. Segments follow the fixed sequence of events; the longest leg is highlighted.'}
          right={<Badge tone={lens ? 'accent' : 'neutral'} shape={false}>{lens ? `${lens.label} view` : 'Example data'}</Badge>}
        />

        <ol className="rmlc-events flex flex-wrap gap-2 text-xs text-subtle mb-4 list-none p-0" aria-label="Event sequence">
          {RMLC_EVENTS.map((e, i) => (
            <li key={e} className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-muted-fill flex items-center justify-center text-[10px] font-bold text-subtle">{i + 1}</span>
              <span>{e}</span>
              {i < RMLC_EVENTS.length - 1 && <span className="text-border ml-1">→</span>}
            </li>
          ))}
        </ol>

        <div className="rmlc-bars space-y-3">
          {rows.map((r) => (
            <div key={r.id} className={`rmlc-row p-2 rounded-md ${r.id === focus.id ? 'rmlc-row--focus bg-muted-fill/50' : ''}`}>
              <div className="rmlc-row__label flex justify-between text-xs font-semibold text-ink mb-1">
                <strong>{r.id} · {r.name}</strong>
                <span className="rmlc-row__total num text-subtle">{lens ? `${r.ownTotal} of ${r.total} days` : `${r.total} days`}</span>
              </div>
              <div
                className="rmlc-row__bar flex h-5 rounded overflow-hidden bg-muted-fill"
                style={{ width: `${(r.total / scale) * 100}%` }}
                role="img"
                aria-label={`${r.id}: ${r.total} days in total`}
              >
                {r.days.map((d, i) => (
                  <span
                    key={RMLC_LEGS[i].key}
                    className={`rmlc-seg flex items-center justify-center text-[10px] font-bold text-white transition-opacity ${
                      i === r.bottleneckIdx ? 'rmlc-seg--hot bg-error' : 'bg-primary'
                    }`}
                    style={{ flexGrow: d, opacity: owned[i] ? 1 : 0.3 }}
                    title={`${RMLC_LEGS[i].short}: ${d} days`}
                  >
                    {d >= 8 ? d : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="chart-legend flex flex-wrap gap-4 text-xs text-subtle mt-4 pt-3 border-t border-border">
          <span className="flex items-center gap-1.5"><span className="legend-dot w-2 h-2 rounded-full bg-primary inline-block" /> Each leg (days)</span>
          <span className="flex items-center gap-1.5"><span className="legend-dot w-2 h-2 rounded-full bg-error inline-block" /> {lens ? 'Longest leg you can act on' : 'Longest leg, the bottleneck'}</span>
          {lens && <span className="flex items-center gap-1.5"><span className="legend-dot w-2 h-2 rounded-full bg-primary opacity-30 inline-block" /> Outside your remit</span>}
        </div>

        <div className="rmlc-why flex items-center gap-2 mt-3 p-2.5 rounded-md bg-warning-bg border border-warning/30 text-xs">
          <Badge tone="watch">{lens ? `Your bottleneck · ${focus.id}` : `Bottleneck · ${focus.id}`}</Badge>
          <span className="text-ink">
            <strong>{RMLC_LEGS[focus.bottleneckIdx].short}</strong> ({focus.days[focus.bottleneckIdx]} days). {focus.why}
          </span>
        </div>
      </Card>

      <DrillDown title="Leg-by-leg durations" hint="Days between events">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                {RMLC_LEGS.map((l, i) => <th key={l.key} className="num" style={{ opacity: owned[i] ? 1 : 0.45 }}>{l.short}</th>)}
                <th className="num">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><strong className="text-ink">{r.id}</strong> · {r.name}</td>
                  {r.days.map((d, i) => <td key={i} className="num" style={{ opacity: owned[i] ? 1 : 0.45, fontWeight: owned[i] && lens ? 700 : undefined }}>{d}</td>)}
                  <td className="num"><strong>{r.total}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote text-xs text-subtle mt-2">Computed directly from transaction timestamps; no model is fitted at this stage.</p>
      </DrillDown>
    </div>
  );
}

export default RmlcLegs;
