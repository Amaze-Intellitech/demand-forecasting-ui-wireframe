import { DECISION_ROWS } from './mockData';
import { hasSourcingData, formatMoney, STOPPAGE_COST_PER_DAY } from './sourcingOptions';
import { FocusItem, FocusItemKind, PersonaKey } from '@/types/inventory';

export const MAX_ITEMS = 3;

// Which personas should see each kind of item.
export const AUDIENCE: Record<FocusItemKind, PersonaKey[]> = {
  sourcing: ['supervisor', 'procurement', 'planner', 'finance'],
  reorder: ['procurement', 'planner'],
  transfer: ['warehouse', 'supervisor'],
  cash: ['finance', 'warehouse'],
};

export function buildFocusItems(
  persona: PersonaKey,
  rows: Array<{
    id: string;
    plant: string;
    daysOfSupply: number;
    leadTimeDays: number;
    qty: number;
    reorderPoint: number;
    calibratedEOQ: number;
    unitCost: number;
  }>,
  resolved: Record<string, string> = {}
): FocusItem[] {
  const items: FocusItem[] = [];

  rows.forEach((r) => {
    if (hasSourcingData(r.id) && r.daysOfSupply < r.leadTimeDays) {
      const stopDays = Math.round(r.leadTimeDays - r.daysOfSupply);
      items.push({
        id: `F-SRC-${r.id}`,
        kind: 'sourcing',
        severity: 'risk',
        materialId: r.id,
        title: `${r.id} at ${r.plant.split(' — ')[0]}: ${Math.round(r.daysOfSupply)} days of cover, ${r.leadTimeDays}-day lead time`,
        detail: 'Another plant or a vendor could close the gap. Compare cost and arrival.',
        value: stopDays * STOPPAGE_COST_PER_DAY,
        valueLabel: 'at risk',
        cta: 'Compare sourcing options',
      });
    } else if (r.qty < r.reorderPoint) {
      items.push({
        id: `F-ORD-${r.id}`,
        kind: 'reorder',
        severity: 'watch',
        materialId: r.id,
        title: `${r.id} is below its reorder point but has ${r.daysOfSupply.toFixed(0)} days of cover`,
        detail: 'Place the next order on time to keep it that way.',
        value: r.calibratedEOQ * r.unitCost,
        valueLabel: 'order value',
        cta: 'Review lot size',
        to: '/solutions/inventory-intelligence/eoq',
      });
    }
  });

  const d4 = DECISION_ROWS.find((d) => d.id === 'd4');
  if (d4) {
    items.push({
      id: 'F-XFER-MAT-5501',
      kind: 'transfer',
      severity: 'watch',
      materialId: 'MAT-5501',
      title: 'MAT-5501 has sat unused for 165 days: transfer it to Plant 2 before it expires',
      detail: d4.meta,
      value: 57_600,
      valueLabel: 'salvage',
      cta: 'Open Liquidation',
      to: '/solutions/inventory-intelligence/liquidation',
    });
  }
  items.push({
    id: 'F-CASH-EXCESS',
    kind: 'cash',
    severity: 'watch',
    title: '$4.2M of excess stock can move between plants instead of being written down',
    detail: 'Three transfer options are ready for review.',
    value: 4_200_000,
    valueLabel: 'excess',
    cta: 'Open Liquidation',
    to: '/solutions/inventory-intelligence/liquidation',
  });

  return items
    .filter((i) => AUDIENCE[i.kind].includes(persona) && !resolved[i.id])
    .sort((a, b) => b.value - a.value)
    .slice(0, MAX_ITEMS)
    .map((i) => ({ ...i, valueText: `${formatMoney(i.value)} ${i.valueLabel}` }));
}
