import React from 'react';
import { DECISION_ROWS, RMLC_STAGES, RMLC_CYCLE_MATERIALS, RMLC_LEGS } from './mockData';
import { PersonaKey, PersonaPlan, RmlcStageKey } from '@/types/inventory';

// Content for the "Understand & Plan" section on Overview.
const M: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="metric font-semibold text-ink">{children}</span>
);

const HORIZON_DAYS = 30;
const SLIP_DAYS = 7;
const DEMAND_UPLIFT = 0.15;
const WEEKS = 12;

const short = (r: { id: string; name: string }) => `${r.id} ${r.name.split(' ')[0]}`;
const days = (v: number) => `${Math.round(v)} d`;
const pct = (v: number) => `${Math.round(v)}%`;
const mill = (v: number) => `$${v.toFixed(2)}M`;
const kilo = (v: number) => `$${Math.round(v / 1000).toLocaleString()}K`;
const fix = (n: number, d = 0) => Number(n).toLocaleString(undefined, { maximumFractionDigits: d });
const decision = (id: string) => DECISION_ROWS.find((d) => d.id === id);

// ---- Plant Supervisor: which materials could stop a line ----
export function supervisorPlan(rows: any[]): PersonaPlan {
  const sorted = [...rows].sort((a, b) => a.daysOfSupply - b.daysOfSupply).slice(0, 5);
  const first = sorted[0] || {
    id: 'MAT-4120',
    name: 'Microcontroller MCU-64',
    daysOfSupply: 14,
    leadTimeDays: 60,
    downstreamLines: 'Line 1 & Line 3',
  };
  const exposed = rows.filter((r) => r.daysOfSupply < r.leadTimeDays);
  const gap = Math.max(Math.round(first.leadTimeDays - first.daysOfSupply), 0);
  const d1 = decision('d1');

  return {
    title: 'Which materials could stop a line',
    insight: (
      <>
        <M>{exposed.length} of the {rows.length} listed materials</M> cover fewer days of production than their supplier takes to
        replenish. <M>{first.id}</M> has <M>{fix(first.daysOfSupply, 1)} days</M> of cover against a {first.leadTimeDays}-day
        lead time, so it runs out about <M>{gap} days</M> before a normal order could arrive. It feeds {first.downstreamLines || 'Assembly Line 1'}.
      </>
    ),
    chart: {
      kind: 'bars',
      label: 'Days of cover today and in 30 days, against replenishment lead time',
      unit: 'days of cover',
      fmt: days,
      markerLabel: 'Replenishment lead time',
      projectedLabel: { nothing: 'In 30 days, no new stock', act: 'In 30 days, with an expedited receipt' },
      tableColumns: ['Material', 'Today', 'In 30 days, no action', 'In 30 days, act', 'Lead time'],
      rows: sorted.map((r) => {
        const later = Math.max(r.daysOfSupply - HORIZON_DAYS, 0);
        return { label: short(r), now: r.daysOfSupply, nothing: later, act: r.daysOfSupply < r.leadTimeDays ? later + 25 : later, marker: r.leadTimeDays };
      }),
    },
    outcome: {
      nothing: {
        tone: 'risk',
        headline: `${first.id} runs out in about ${Math.round(first.daysOfSupply)} days`,
        detail: `Lines fed by it stop until stock arrives, roughly ${gap} days later. ${exposed.length > 1 ? `${exposed.length - 1} more listed material${exposed.length > 2 ? 's' : ''} sit below their lead time too.` : 'It is the only listed material in this position.'}`,
      },
      act: {
        tone: 'ok',
        headline: 'The stoppage is avoided if an expedited receipt lands in time',
        detail: `Only an expedited order can arrive before the stock runs out; a normal order takes ${first.leadTimeDays} days. Illustrative: the expedited receipt adds about 25 days of cover.`,
      },
    },
    actions: [
      { title: `Authorize the expedited PO for ${first.id}`, owner: 'Procurement Officer', due: 'Within 3 days', effect: d1?.impact ?? 'Line stoppage avoided', handoff: 'procurement', compare: first.id },
      { title: `Check other plants for spare ${first.name?.split(' ')[0] ?? 'material'} stock`, owner: 'Warehouse Manager', due: 'This week', effect: 'Bridges part of the gap without a purchase', handoff: 'warehouse' },
      { title: `Run lines that do not use ${first.id} first`, owner: 'Materials Planner', due: 'Within 2 days', effect: 'Buys a few days while the order arrives', handoff: 'planner' },
    ],
  };
}

// ---- Warehouse Manager: physical stock that is ageing or in excess ----
const AGEING: Record<RmlcStageKey, { nothing: number; act: number }> = {
  accumulation: { nothing: -0.7, act: -0.7 },
  active: { nothing: 0, act: 0.7 },
  atrisk: { nothing: 0.1, act: -1.04 },
  liquidation: { nothing: 0.6, act: -1.2 },
};

export function warehousePlan(): PersonaPlan {
  const rows = RMLC_STAGES.map((s) => ({
    label: s.label,
    now: s.value,
    nothing: s.value + AGEING[s.key].nothing,
    act: s.value + AGEING[s.key].act,
  }));
  const byKey: Record<string, { now: number; nothing: number; act: number }> = Object.fromEntries(
    RMLC_STAGES.map((s, i) => [s.key, rows[i]])
  );
  const stuck = (byKey.atrisk?.now ?? 0) + (byKey.liquidation?.now ?? 0);
  const stuckSkus = RMLC_STAGES.filter((s) => s.key === 'atrisk' || s.key === 'liquidation').reduce((n, s) => n + s.count, 0);
  const released = rows.reduce((n, r) => n + r.now, 0) - rows.reduce((n, r) => n + r.act, 0);
  const d4 = decision('d4');

  return {
    title: 'How much stock is ageing, and what clearing it releases',
    insight: (
      <>
        <M>{mill(stuck)}</M> of stock across <M>{stuckSkus} SKUs</M> has gone 90 days or more without being used, and{' '}
        <M>{mill(byKey.accumulation?.now ?? 0)}</M> more is building faster than it is consumed. Without action, about{' '}
        <M>{mill(AGEING.liquidation.nothing)}</M> more crosses the 180-day line within 90 days.
      </>
    ),
    chart: {
      kind: 'bars',
      label: 'Stock value by lifecycle stage, today and in 90 days',
      unit: '$M',
      fmt: mill,
      projectedLabel: { nothing: 'In 90 days, no action', act: 'In 90 days, after clearing' },
      tableColumns: ['Stage', 'Today', 'In 90 days, no action', 'In 90 days, act'],
      rows,
    },
    outcome: {
      nothing: {
        tone: 'risk',
        headline: `Stock past 180 days grows from ${mill(byKey.liquidation?.now ?? 0)} to ${mill(byKey.liquidation?.nothing ?? 0)}`,
        detail: 'It becomes harder to sell or return the longer it sits, and storage cost keeps running. Illustrative: assumes the current ageing pace.',
      },
      act: {
        tone: 'ok',
        headline: `About ${mill(released)} is released`,
        detail: `Stock past 180 days falls to ${mill(byKey.liquidation?.act ?? 0)} and at-risk stock to ${mill(byKey.atrisk?.act ?? 0)}, by returning, transferring or selling it.`,
      },
    },
    actions: [
      { title: 'Transfer MAT-5501 to Plant 2 before it expires', owner: 'Warehouse Manager', due: 'Before expiry', effect: d4?.impact ?? 'Salvage value recovered', handoff: 'planner' },
      { title: `Return or sell the ${mill(byKey.liquidation?.now ?? 0)} of stock past 180 days`, owner: 'Warehouse Manager', due: 'Within 30 days', effect: `${mill((byKey.liquidation?.now ?? 0) - (byKey.liquidation?.act ?? 0))} released`, handoff: 'finance' },
      { title: `Cycle-count the ${RMLC_STAGES.find((s) => s.key === 'atrisk')?.count ?? 76} at-risk SKUs`, owner: 'Warehouse Manager', due: 'Within 2 weeks', effect: 'Confirms the stock is really there before any sale' },
    ],
  };
}

// ---- Materials Planner: cover against the production plan and demand swings ----
export function plannerPlan(rows: any[]): PersonaPlan {
  const focus = rows.find((r) => r.id === 'MAT-1082') ?? rows[0] ?? {
    id: 'MAT-1082',
    name: 'Hydraulic Pump',
    dailyConsumption: 16,
    leadTimeDays: 60,
    currentBatchQty: 600,
    qty: 930,
    safetyStock: 300,
    uom: 'EA',
  };
  const weekly = (focus.dailyConsumption || 16) * 7;
  const receiptWeek = Math.floor((focus.leadTimeDays || 60) / 7);
  const receipt = focus.currentBatchQty || 600;
  const weeks = Array.from({ length: WEEKS + 1 }, (_, i) => (i === 0 ? 'Now' : `W${i}`));

  const run = (uplift: number, withOrder: boolean) => {
    let stock = focus.qty || 930;
    return weeks.map((_, w) => {
      if (w > 0) stock = Math.max(stock - weekly * (1 + uplift), 0);
      if (withOrder && w === receiptWeek) stock += receipt;
      return Math.round(stock);
    });
  };

  const plan = run(0, false);
  const high = run(DEMAND_UPLIFT, false);
  const planAct = run(0, true);
  const highAct = run(DEMAND_UPLIFT, true);
  const firstBelow = (s: number[]) => s.findIndex((v) => v < (focus.safetyStock || 300));
  const firstZero = (s: number[]) => s.findIndex((v) => v === 0);
  const wPlan = firstBelow(plan);
  const wHigh = firstBelow(high);
  const zero = firstZero(high);
  const minAct = Math.min(...planAct, ...highAct);
  const dipAct = firstBelow(highAct);

  const table = {
    columns: ['Week', 'Plan demand', `Demand +${DEMAND_UPLIFT * 100}%`, 'Plan + order now', `+${DEMAND_UPLIFT * 100}% + order now`],
    rows: weeks.map((w, i) => [w, fix(plan[i]), fix(high[i]), fix(planAct[i]), fix(highAct[i])]),
  };

  return {
    title: `Cover against the production plan, ${focus.id}`,
    insight: (
      <>
        At plan demand, <M>{focus.id}</M> drops below its safety stock in week <M>{wPlan < 0 ? `${WEEKS}+` : wPlan}</M>. If demand runs{' '}
        <M>{DEMAND_UPLIFT * 100}% high</M> it does so in week <M>{wHigh < 0 ? `${WEEKS}+` : wHigh}</M>, before an order placed today (
        {focus.leadTimeDays}-day lead time) could arrive in week {receiptWeek}.
      </>
    ),
    chart: {
      kind: 'runway',
      label: `${focus.id} stock over ${WEEKS} weeks`,
      unit: focus.uom || 'EA',
      weeks,
      threshold: { label: `Safety stock (${fix(focus.safetyStock || 300)} ${focus.uom || 'EA'})`, value: focus.safetyStock || 300 },
      table,
      series: {
        nothing: [
          { label: 'Plan demand', color: 'var(--s1)', values: plan },
          { label: `Demand +${DEMAND_UPLIFT * 100}%`, color: 'var(--s2)', values: high, dash: true },
        ],
        act: [
          { label: 'Plan demand, order now', color: 'var(--s1)', values: planAct },
          { label: `Demand +${DEMAND_UPLIFT * 100}%, order now`, color: 'var(--s2)', values: highAct, dash: true },
        ],
      },
    },
    outcome: {
      nothing: {
        tone: 'risk',
        headline: zero >= 0 ? `Stock-out in week ${zero} if demand runs ${DEMAND_UPLIFT * 100}% high` : `Below safety stock in week ${wHigh} if demand runs ${DEMAND_UPLIFT * 100}% high`,
        detail: `Nothing is on order yet. Illustrative: a flat weekly draw of ${fix(weekly)} ${focus.uom || 'EA'} at plan, ${fix(weekly * (1 + DEMAND_UPLIFT))} ${focus.uom || 'EA'} in the high case.`,
      },
      act: {
        tone: minAct >= (focus.safetyStock || 300) ? 'ok' : 'watch',
        headline: minAct >= (focus.safetyStock || 300)
          ? `Stays above safety stock through week ${WEEKS} in both cases`
          : `Still dips below safety stock in week ${dipAct}`,
        detail: `Ordering the ${fix(receipt)} ${focus.uom || 'EA'} batch now lands it in week ${receiptWeek}, after the ${focus.leadTimeDays}-day lead time.`,
      },
    },
    actions: [
      { title: `Place the full ${fix(receipt)} ${focus.uom || 'EA'} batch order now`, owner: 'Procurement Officer', due: 'Today', effect: `Cover holds through week ${WEEKS} in both cases`, handoff: 'procurement' },
      { title: 'Confirm the production plan for the next 10 weeks', owner: 'Materials Planner', due: 'This week', effect: `Narrows the ${DEMAND_UPLIFT * 100}% demand uncertainty`, handoff: 'supervisor' },
      { title: `Review the BOM usage rate for ${focus.id}`, owner: 'Materials Planner', due: 'Within 2 weeks', effect: 'Fixes the "Risk" BOM coverage flag' },
    ],
  };
}

// ---- Procurement Officer: reorder position, supplier delay and sourcing risk ----
export function procurementPlan(rows: any[]): PersonaPlan {
  const position = (r: any, extra: number, slip: number) =>
    (((r.qty || 0) + extra - slip * (r.dailyConsumption || 1)) / (r.reorderPoint || 1)) * 100;
  const sorted = [...rows].sort((a, b) => (a.qty || 0) / (a.reorderPoint || 1) - (b.qty || 0) / (b.reorderPoint || 1)).slice(0, 5);
  const first = sorted[0] || {
    id: 'MAT-4120',
    name: 'Microcontroller',
    qty: 920,
    reorderPoint: 1500,
    calibratedEOQ: 3000,
    dailyConsumption: 40,
    supplier: 'SiliconFoundry International',
    sourcingType: 'Single Source',
    uom: 'EA',
  };
  const below = rows.filter((r) => (r.qty || 0) < (r.reorderPoint || 1));
  const nowPct = ((first.qty || 0) / (first.reorderPoint || 1)) * 100;
  const slipPct = position(first, 0, SLIP_DAYS);
  const actPct = position(first, first.calibratedEOQ || 3000, SLIP_DAYS);
  const d1 = decision('d1');
  const d2 = decision('d2');

  return {
    title: 'Reorder position and supplier risk',
    insight: (
      <>
        <M>{below.length} of the {rows.length} listed materials</M> are already below their reorder point (
        <M>{below.map((r) => r.id).join(' and ') || 'MAT-4120'}</M>). <M>{first.id}</M> holds <M>{pct(nowPct)}</M> of its reorder point and comes
        from {first.supplier || 'Primary Supplier'} on {(first.sourcingType || 'Sole Source').toLowerCase()} terms, so a delay there has no fallback.
      </>
    ),
    chart: {
      kind: 'bars',
      label: 'Stock as a percentage of reorder point, today and after a 7-day supplier delay',
      unit: '% of reorder point',
      fmt: pct,
      markerLabel: 'Reorder point (100%)',
      projectedLabel: { nothing: 'After a 7-day supplier delay', act: 'Inventory position with an order placed now' },
      tableColumns: ['Material', 'Today', 'After a 7-day delay', 'With an order placed now', 'Reorder point'],
      rows: sorted.map((r) => ({
        label: short(r),
        now: ((r.qty || 0) / (r.reorderPoint || 1)) * 100,
        nothing: Math.max(position(r, 0, SLIP_DAYS), 0),
        act: Math.max(position(r, r.calibratedEOQ || 1000, SLIP_DAYS), 0),
        marker: 100,
      })),
    },
    outcome: {
      nothing: {
        tone: 'risk',
        headline: `A ${SLIP_DAYS}-day delay pushes ${first.id} from ${pct(nowPct)} to ${pct(Math.max(slipPct, 0))} of its reorder point`,
        detail: `${below.length} listed material${below.length === 1 ? ' is' : 's are'} below the line already. Illustrative: the delay is applied to the current daily consumption.`,
      },
      act: {
        tone: actPct >= 100 ? 'ok' : 'watch',
        headline: `Ordering ${fix(first.calibratedEOQ || 3000)} ${first.uom || 'EA'} lifts ${first.id} to ${pct(actPct)}`,
        detail: actPct >= 100
          ? 'That clears the reorder point even with the delay.'
          : 'That is still short of the reorder point, so ask for expedited delivery as well.',
      },
    },
    actions: [
      { title: d1?.title ?? `Authorize an expedited PO for ${first.id}`, owner: 'Procurement Officer', due: 'Within 3 days', effect: d1?.impact ?? 'Stock-out avoided', handoff: 'finance', compare: first.id },
      { title: d2?.title ?? 'Recalibrate lot sizes for Class A materials', owner: 'Procurement Officer', due: 'This month', effect: d2?.impact ?? 'Working capital released', handoff: 'finance' },
      { title: 'Qualify a second source for sole and allocated materials', owner: 'Procurement Officer', due: 'This quarter', effect: 'Removes the single-supplier exposure' },
    ],
  };
}

// ---- Finance Controller: where cash is stuck in the cycle ----
const CYCLE_SHIFT: Record<string, { nothing: number; act: number }> = {
  fg: { nothing: 9, act: -31 },
  cust: { nothing: 0, act: -5 },
};
const EXCESS_TOTAL = '$4.2M';

export function financePlan(rows: any[]): PersonaPlan {
  const mat = RMLC_CYCLE_MATERIALS.find((m) => m.id === 'MAT-2041') ?? RMLC_CYCLE_MATERIALS[0];
  const full = rows.find((r) => r.id === mat.id);
  const legs = RMLC_LEGS.map((l, i) => {
    const shift = CYCLE_SHIFT[l.key] ?? { nothing: 0, act: 0 };
    return {
      label: l.short,
      key: l.key,
      now: mat.days[i],
      nothing: mat.days[i] + shift.nothing,
      act: mat.days[i] + shift.act,
    };
  });
  const total = (k: 'now' | 'nothing' | 'act') => legs.reduce((n, l) => n + (l as any)[k], 0);
  const perDay = full?.annualConsumptionValue ? full.annualConsumptionValue / 365 : 2000;
  const fg = legs.find((l) => l.key === 'fg') ?? { now: 66, act: 35 };
  const freed = (total('now') - total('act')) * perDay;
  const locked = (total('nothing') - total('now')) * perDay;

  return {
    title: `Where cash is stuck, ${mat.id}`,
    insight: (
      <>
        Cash is tied up for <M>{total('now')} days</M> between paying the supplier and being paid by the customer for {mat.id}, and{' '}
        <M>{fg.now} of them</M> are finished goods sitting unsold. Fixing that one leg is worth about <M>{kilo(freed)}</M> here; the{' '}
        <M>{EXCESS_TOTAL}</M> of excess stock across the portfolio is the larger prize.
      </>
    ),
    chart: {
      kind: 'bars',
      label: `Days in each leg of the cash cycle, ${mat.id}`,
      unit: 'days',
      fmt: days,
      projectedLabel: { nothing: 'Next quarter, no action', act: 'Next quarter, after acting' },
      tableColumns: ['Leg', 'Today', 'Next quarter, no action', 'Next quarter, act'],
      rows: legs,
    },
    outcome: {
      nothing: {
        tone: 'risk',
        headline: `The cycle stretches to ${total('nothing')} days`,
        detail: `About ${kilo(locked)} more cash is locked in ${mat.id}. Illustrative: unsold finished goods keep building at the current pace.`,
      },
      act: {
        tone: 'ok',
        headline: `The cycle shortens to ${total('act')} days, freeing about ${kilo(freed)}`,
        detail: 'Illustrative: finished goods wait 35 days instead of 66, and customer payment terms come down by 5 days.',
      },
    },
    actions: [
      { title: `Clear the ${EXCESS_TOTAL} of excess stock through the three transfer options`, owner: 'Warehouse Manager', due: 'This quarter', effect: `${EXCESS_TOTAL} released`, handoff: 'warehouse' },
      { title: `Cut ${mat.id} finished-goods wait from ${fg.now} to ${fg.now + (CYCLE_SHIFT.fg?.act ?? -31)} days`, owner: 'Materials Planner', due: 'This quarter', effect: `${kilo(-(CYCLE_SHIFT.fg?.act ?? -31) * perDay)} freed`, handoff: 'planner' },
      { title: 'Negotiate shorter customer payment terms', owner: 'Finance Controller', due: 'Next quarter', effect: `${kilo(-(CYCLE_SHIFT.cust?.act ?? -5) * perDay)} freed` },
    ],
  };
}

export function buildPlan(persona: PersonaKey, rows: any[]): PersonaPlan {
  switch (persona) {
    case 'warehouse':
      return warehousePlan();
    case 'planner':
      return plannerPlan(rows);
    case 'procurement':
      return procurementPlan(rows);
    case 'finance':
      return financePlan(rows);
    default:
      return supervisorPlan(rows);
  }
}
