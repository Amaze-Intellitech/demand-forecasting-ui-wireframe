import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Badge } from './CommonUI';
import SourcingDialog from './SourcingDialog';
import { useInventory } from '@/context/InventoryContext';
import { buildFocusItems } from '@/data/inventory/focusItems';
import { FocusItem } from '@/types/inventory';

export interface FocusStripProps {
  rows: any[];
}

// The few things worth attention today for the active persona, most valuable first. At most three,
// and nothing at all when no decision is waiting.
export function FocusStrip({ rows }: FocusStripProps) {
  const navigate = useNavigate();
  const { persona, resolvedFocus, resolveFocus } = useInventory();
  const [open, setOpen] = useState<FocusItem | null>(null);
  const items = useMemo(() => buildFocusItems(persona, rows, resolvedFocus), [persona, rows, resolvedFocus]);
  const openRow = open ? rows.find((r) => r.id === open.materialId) : null;

  return (
    <>
      {items.length > 0 && (
        <section className="focus-strip" aria-label="Suggested focus today">
          <div className="focus-strip__head flex items-center gap-1.5 text-xs font-semibold text-ai-tx uppercase tracking-wider mb-2">
            <Sparkles size={12} aria-hidden="true" />
            <span>AI · Focus today</span>
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-md border border-border bg-surface">
                <div className="flex items-start gap-2.5 min-w-0">
                  <Badge tone={item.severity === 'risk' ? 'risk' : 'watch'}>
                    {item.severity === 'risk' ? 'Act now' : 'Watch'}
                  </Badge>
                  <div className="focus-strip__body">
                    <strong className="text-ink text-sm block">{item.title}</strong>
                    <span className="focus-strip__meta text-xs text-subtle">
                      {item.valueText}. {item.detail}
                    </span>
                  </div>
                </div>
                <div className="focus-strip__actions flex items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => (item.kind === 'sourcing' ? setOpen(item) : navigate(item.to || ''))}
                  >
                    {item.cta}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => resolveFocus(item.id, 'snoozed')}
                  >
                    Snooze
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <SourcingDialog
        open={Boolean(open)}
        onOpenChange={(v) => !v && setOpen(null)}
        row={openRow}
        focusId={open?.id}
      />
    </>
  );
}

export default FocusStrip;
