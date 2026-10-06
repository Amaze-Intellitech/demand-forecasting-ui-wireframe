import { useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from './CommonUI';
import { useInventory } from '@/context/InventoryContext';
import { buildSourcingComparison, formatMoney } from '@/data/inventory/sourcingOptions';
import { personaLabel } from '@/data/inventory/personas';
import { cn } from '@/lib/utils';
import { PersonaKey, SourcingScoredOption } from '@/types/inventory';

// Which column each persona should read first. Same table for everyone; the emphasis moves.
const EMPHASIS: Record<string, string[]> = {
  supervisor: ['arrives', 'risk'],
  planner: ['arrives'],
  procurement: ['extra'],
  warehouse: ['option'],
  finance: ['total'],
};

const RISK_TONE: Record<string, 'success' | 'watch' | 'risk'> = {
  Low: 'success',
  Medium: 'watch',
  High: 'risk',
};

export interface SourcingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  row?: any;
  focusId?: string;
}

// Side-by-side comparison of ways to close a shortfall: move stock in from another plant, or buy it.
// It only proposes; approving records the decision for this session and nothing is executed.
export function SourcingDialog({ open, onOpenChange, row, focusId }: SourcingDialogProps) {
  const { persona, setPersona, resolveFocus } = useInventory();
  const comparison = useMemo(() => (row ? buildSourcingComparison(row) : null), [row]);
  if (!comparison) return null;

  const emph = EMPHASIS[persona] ?? [];
  const cell = (key: string) => cn(emph.includes(key) && 'sourcing__emph');
  const best = comparison.options.find((o: SourcingScoredOption) => o.key === comparison.recommended);
  const nextPersona: PersonaKey = persona === 'procurement' ? 'warehouse' : 'procurement';

  const approve = () => {
    if (best) {
      resolveFocus(focusId ?? `F-SRC-${comparison.materialId}`, 'approved');
      toast.success(`Proposal approved: ${best.label} for ${comparison.materialId}`);
    }
    onOpenChange(false);
  };

  const handOff = () => {
    setPersona(nextPersona);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[880px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2">
            Close the gap on {comparison.materialId} at {comparison.plant}
            <Badge tone="ai" shape={false}>Proposal · pending review</Badge>
          </DialogTitle>
          <DialogDescription>
            {Math.round(comparison.cover)} days of cover against a {comparison.leadTimeDays}-day lead time leaves about{' '}
            {comparison.need.toLocaleString()} {comparison.uom} to bring in. Compare moving stock from another plant with buying it.
          </DialogDescription>
        </DialogHeader>

        <div className="table-wrap sourcing" role="region" aria-label="Sourcing options" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th className={cell('option')}>Option</th>
                <th className={cn('num', cell('arrives'))}>Arrives</th>
                <th className={cn('num', cell('extra'))}>Extra cost</th>
                <th className={cell('risk')}>Stock-out risk</th>
                <th>Watch out for</th>
                <th className={cn('num', cell('total'))}>Total cost</th>
              </tr>
            </thead>
            <tbody>
              {comparison.options.map((o: SourcingScoredOption) => (
                <tr key={o.key} className={cn(o.key === comparison.recommended && 'sourcing__best')}>
                  <td className={cell('option')}>
                    <strong className="text-ink">{o.label}</strong>
                    {o.key === comparison.recommended && <Badge tone="success" className="ml-2">Recommended</Badge>}
                    <span className="sourcing__sub block text-xs text-subtle mt-0.5">{o.detail}</span>
                  </td>
                  <td className={cn('num', cell('arrives'))}>{o.arrives == null ? 'n/a' : `${o.arrives} d`}</td>
                  <td className={cn('num', cell('extra'))}>{o.extra ? formatMoney(o.extra) : 'none'}</td>
                  <td className={cell('risk')}><Badge tone={RISK_TONE[o.risk] || 'neutral'}>{o.risk}</Badge></td>
                  <td className="sourcing__watch">{o.watch}</td>
                  <td className={cn('num', cell('total'))}><strong>{formatMoney(o.total)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[13px] text-body-c leading-relaxed m-0" role="status">
          <strong className="text-ink">Why this one:</strong> {comparison.reason}
        </p>
        <p className="footnote m-0 text-xs text-subtle">
          Total cost = extra cost (freight, price change, qualification) + carrying cost + expected lost production. Plant and vendor
          terms are illustrative values.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={handOff} className="gap-1.5">
              Hand off to {personaLabel(nextPersona)} <ArrowRight size={14} aria-hidden="true" />
            </Button>
            {best && (
              <Button onClick={approve} className="gap-1.5">
                <Check size={14} aria-hidden="true" /> Approve {best.label.toLowerCase()}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SourcingDialog;
