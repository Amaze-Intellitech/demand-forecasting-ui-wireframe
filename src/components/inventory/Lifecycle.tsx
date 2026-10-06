import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Badge, Card, CardHead } from './CommonUI';
import { cn } from '@/lib/utils';

export interface LifecyclePhase {
  id: string;
  n: number;
  title: string;
  question: string;
  status: 'done' | 'attention' | 'watch';
  detail: string;
  to: string;
  group: 'green' | 'stay';
}

// The five-phase business lifecycle (design bible §3.3), summarised for executives as "Get to Green → Stay Green".
// Statuses are illustrative mock data for the wireframe.
export const LIFECYCLE_PHASES: LifecyclePhase[] = [
  {
    id: 'select',
    n: 1,
    title: 'Material Selection',
    question: 'Which materials justify full modelling?',
    status: 'done',
    detail: '3 tiers assigned · 142 Class A SKUs in scope',
    to: '/solutions/inventory-intelligence/abc',
    group: 'green',
  },
  {
    id: 'level',
    n: 2,
    title: 'Desired Stock Level',
    question: 'What is the target stock position?',
    status: 'done',
    detail: 'EOQ calibrated · order size moved +11% since 2025',
    to: '/solutions/inventory-intelligence/eoq',
    group: 'green',
  },
  {
    id: 'accumulate',
    n: 3,
    title: 'Accumulation',
    question: 'Why did stock build up?',
    status: 'attention',
    detail: 'Production volume and lead time explain most of the build-up',
    to: '/solutions/inventory-intelligence/requirements',
    group: 'green',
  },
  {
    id: 'liquidate',
    n: 4,
    title: 'Liquidation',
    question: 'How do we clear excess and ageing stock?',
    status: 'attention',
    detail: '$4.2M above optimal · 3 transfer opportunities',
    to: '/solutions/inventory-intelligence/liquidation',
    group: 'green',
  },
  {
    id: 'prevent',
    n: 5,
    title: 'Prevention',
    question: 'How do we keep it green?',
    status: 'watch',
    detail: '4 early-warning alerts · monitoring armed on 2 of 3 rules',
    to: '/solutions/inventory-intelligence/prevention',
    group: 'stay',
  },
];

const STATUS: Record<string, { tone: 'success' | 'watch' | 'accent'; label: string }> = {
  done: { tone: 'success', label: 'Complete' },
  attention: { tone: 'watch', label: 'Needs attention' },
  watch: { tone: 'accent', label: 'Monitoring' },
};

export interface LifecycleStripProps {
  className?: string;
  defaultOpen?: boolean;
}

// Collapsed by default to a single row of phase chips; "Show details" opens the full phase cards.
export function LifecycleStrip({ className, defaultOpen = false }: LifecycleStripProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className={cn('mb-0', className)}>
      <CardHead
        className={open ? undefined : 'mb-2.5'}
        title="Get to Green → Stay Green"
        sub="Where each raw material portfolio stands across the five lifecycle phases."
        right={
          <div className="flex items-center gap-2">
            <Badge tone="neutral" shape={false}>Example data</Badge>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs font-semibold text-primary hover:bg-muted-fill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {open ? 'Hide details' : 'Show details'}
              <ChevronDown size={13} aria-hidden="true" className={cn('transition-transform', open && 'rotate-180')} />
            </button>
          </div>
        }
      />
      {!open && (
        <ol className="lifecycle-compact flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Inventory lifecycle phases">
          {LIFECYCLE_PHASES.map((p) => {
            const s = STATUS[p.status] || STATUS.watch;
            return (
              <li key={p.id} className="flex-1 min-w-[150px]">
                <button
                  type="button"
                  className="lifecycle-compact__chip w-full flex items-center justify-between gap-2 p-2 rounded-md bg-bg border border-border text-xs font-medium text-ink transition-colors hover:border-primary"
                  onClick={() => navigate(p.to)}
                  title={`${p.question} ${p.detail}`}
                >
                  <span className={cn('lifecycle__num w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-muted-fill text-subtle', p.status === 'done' && 'lifecycle__num--done bg-success text-white')}>
                    {p.status === 'done' ? <Check size={12} aria-hidden="true" /> : p.n}
                  </span>
                  <span className="lifecycle-compact__title truncate font-semibold">{p.title}</span>
                  <Badge tone={s.tone}>{s.label}</Badge>
                </button>
              </li>
            );
          })}
        </ol>
      )}
      {open && (
        <>
          <ol className="lifecycle grid grid-cols-1 md:grid-cols-5 gap-3 list-none p-0 m-0" aria-label="Inventory lifecycle phases">
            {LIFECYCLE_PHASES.map((p, i) => {
              const s = STATUS[p.status] || STATUS.watch;
              return (
                <li key={p.id} className={cn('lifecycle__item flex flex-col', `lifecycle__item--${p.group}`)}>
                  <button
                    type="button"
                    className="lifecycle__card w-full h-full text-left p-3.5 rounded-md bg-bg border border-border flex flex-col justify-between transition-colors hover:border-primary"
                    onClick={() => navigate(p.to)}
                  >
                    <div>
                      <span className="lifecycle__head flex items-center gap-2 mb-2">
                        <span className={cn('lifecycle__num w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-muted-fill text-subtle', p.status === 'done' && 'lifecycle__num--done bg-success text-white')}>
                          {p.status === 'done' ? <Check size={12} aria-hidden="true" /> : p.n}
                        </span>
                        <span className="lifecycle__title text-xs font-bold text-ink">{p.title}</span>
                      </span>
                      <span className="lifecycle__q text-xs font-medium text-subtle block mb-2">{p.question}</span>
                      <Badge tone={s.tone}>{s.label}</Badge>
                      <span className="lifecycle__detail text-[11px] text-body-c block mt-2">{p.detail}</span>
                    </div>
                    <span className="lifecycle__go text-xs font-semibold text-primary mt-3 flex items-center gap-1">
                      Open <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </button>
                  {i < LIFECYCLE_PHASES.length - 1 && <span className="lifecycle__link hidden" aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
          <div className="lifecycle__legend flex items-center gap-4 text-xs text-subtle mt-3 pt-2 border-t border-border">
            <span className="flex items-center gap-1.5"><span className="lifecycle__bar lifecycle__bar--green w-2.5 h-2.5 rounded-full bg-success inline-block" /> Get to Green — phases 1–4</span>
            <span className="flex items-center gap-1.5"><span className="lifecycle__bar lifecycle__bar--stay w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Stay Green — phase 5</span>
          </div>
        </>
      )}
    </Card>
  );
}

export default LifecycleStrip;
