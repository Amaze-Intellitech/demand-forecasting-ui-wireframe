import { useMemo, useState } from 'react';
import { ArrowRight, Scale } from 'lucide-react';
import { Badge, Card, CardHead, Chip, Insight } from './CommonUI';
import { CompareBars, RunwayLines } from './PersonaCharts';
import SourcingDialog from './SourcingDialog';
import { hasSourcingData } from '@/data/inventory/sourcingOptions';
import { useInventory } from '@/context/InventoryContext';
import { buildPlan } from '@/data/inventory/personaPlans';
import { personaLabel } from '@/data/inventory/personas';

const MODES = [
  { key: 'nothing', label: 'Do nothing' },
  { key: 'act', label: 'Act on the plan' },
];

const OUTCOME_TONE: Record<string, 'risk' | 'watch' | 'success'> = {
  risk: 'risk',
  watch: 'watch',
  ok: 'success',
};

export interface UnderstandAndPlanProps {
  rows: any[];
}

// Three steps for the active persona: what is happening, what could happen (do nothing vs act),
// and what to do next. Actions can hand the item to another persona, which switches the lens.
export function UnderstandAndPlan({ rows }: UnderstandAndPlanProps) {
  const { persona, setPersona } = useInventory();
  const [mode, setMode] = useState<'nothing' | 'act'>('nothing');
  const [compareId, setCompareId] = useState<string | null>(null);
  const plan = useMemo(() => buildPlan(persona, rows), [persona, rows]);
  const { chart, outcome } = plan;
  const result = outcome[mode];

  return (
    <Card className="mb-0">
      <CardHead
        title="Understand & plan"
        sub={`${plan.title}. Read what is happening, compare doing nothing with acting, then pick the next step. Projections use illustrative assumptions.`}
        right={<Badge tone="neutral" shape={false}>{personaLabel(persona)}</Badge>}
      />

      <div className="uap">
        <section aria-labelledby="uap-1">
          <h3 id="uap-1" className="uap__step"><span>1</span> What&apos;s happening</h3>
          <Insight key={persona} label={plan.title} defaultOpen>
            {plan.insight}
          </Insight>
        </section>

        <section aria-labelledby="uap-2">
          <div className="uap__step-row flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 id="uap-2" className="uap__step m-0"><span>2</span> What could happen</h3>
            <div role="group" aria-label="Scenario" className="uap__modes flex gap-1.5">
              {MODES.map((m) => (
                <Chip key={m.key} active={mode === m.key} onClick={() => setMode(m.key as 'nothing' | 'act')} className="!py-1 !px-3 !text-xs">
                  {m.label}
                </Chip>
              ))}
            </div>
          </div>
          {chart.kind === 'runway' && chart.weeks && chart.series && chart.threshold ? (
            <RunwayLines
              label={chart.label}
              unit={chart.unit}
              weeks={chart.weeks}
              series={chart.series[mode] || []}
              threshold={chart.threshold}
              table={chart.table}
            />
          ) : (
            <CompareBars
              label={chart.label}
              rows={chart.rows || []}
              mode={mode}
              fmt={chart.fmt || ((v: number) => String(v))}
              unit={chart.unit}
              markerLabel={chart.markerLabel}
              projectedLabel={chart.projectedLabel || { nothing: 'Nothing', act: 'Act' }}
              tableColumns={chart.tableColumns || []}
            />
          )}
          <div className="uap__result mt-3 p-3 rounded-md bg-surface border border-border flex items-start gap-2.5" role="status">
            <Badge tone={OUTCOME_TONE[result.tone] || 'neutral'}>{mode === 'act' ? 'If you act' : 'If nothing changes'}</Badge>
            <div>
              <strong className="text-ink text-sm block">{result.headline}</strong>
              <p className="uap__detail text-xs text-body-c mt-0.5 m-0 leading-relaxed">{result.detail}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="uap-3" className="mt-4">
          <h3 id="uap-3" className="uap__step"><span>3</span> What to do next</h3>
          <ol className="uap__actions space-y-2 mt-2">
            {plan.actions.map((a, i) => (
              <li key={a.title} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-md bg-surface border border-border">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="uap__rank w-5 h-5 rounded-full bg-muted-fill border border-border flex items-center justify-center text-xs font-bold text-subtle shrink-0" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="uap__body">
                    <strong className="text-ink text-sm block">{a.title}</strong>
                    <span className="uap__meta flex flex-wrap items-center gap-2 text-xs text-subtle mt-0.5">
                      <Badge tone="neutral" shape={false}>{a.owner}</Badge>
                      <span>{a.due}</span>
                      <span className="uap__effect text-primary font-medium">{a.effect}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {a.compare && hasSourcingData(a.compare) && (
                    <button type="button" className="btn btn-secondary btn-sm uap__handoff flex items-center gap-1.5" onClick={() => setCompareId(a.compare || null)}>
                      <Scale size={13} aria-hidden="true" />
                      Compare sourcing options
                    </button>
                  )}
                  {a.handoff && a.handoff !== persona && (
                    <button type="button" className="btn btn-ghost btn-sm uap__handoff flex items-center gap-1.5" onClick={() => setPersona(a.handoff as any)}>
                      Hand off to {personaLabel(a.handoff)}
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <SourcingDialog open={Boolean(compareId)} onOpenChange={(v) => !v && setCompareId(null)} row={rows.find((r) => r.id === compareId)} />
    </Card>
  );
}

export default UnderstandAndPlan;
