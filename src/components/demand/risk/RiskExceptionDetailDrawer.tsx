import React from 'react';
import { X, Clock, MapPin, ListChecks, Radio } from 'lucide-react';
import { RiskException } from '../../../types/domain/riskExceptionCenter';
import { Badge, BadgeProps } from '../../ui/Badge';

interface RiskExceptionDetailDrawerProps {
  exception: RiskException | null;
  isOpen: boolean;
  onClose: () => void;
}

const severityVariant: Record<RiskException['severity'], BadgeProps['variant']> = {
  critical: 'error',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

const statusVariant: Record<RiskException['status'], BadgeProps['variant']> = {
  Open: 'error',
  'In Review': 'warning',
  Monitoring: 'info',
  Resolved: 'success',
};

export const RiskExceptionDetailDrawer: React.FC<RiskExceptionDetailDrawerProps> = ({
  exception,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !exception) return null;

  const affected = [exception.affectedSku, exception.affectedPlant, exception.affectedRegion]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      <div className="fixed inset-0 bg-deep/40 backdrop-blur-xs transition-opacity duration-200" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-bg shadow-2xl border-l border-border flex flex-col justify-between animate-in slide-in-from-right duration-200">
          <div className="p-6 border-b border-border bg-surface">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-subtle bg-bg border border-border px-2 py-0.5 rounded">
                  {exception.id}
                </span>
                <Badge variant={severityVariant[exception.severity]} size="sm">
                  {exception.severity[0].toUpperCase() + exception.severity.slice(1)}
                </Badge>
                <Badge variant={statusVariant[exception.status]} size="sm" dot={false}>
                  {exception.status}
                </Badge>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center text-subtle hover:text-deep transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-deep mt-2.5 leading-snug">{exception.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-subtle mt-1.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {exception.detectedAt}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {exception.category}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-body">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-subtle mb-1">Description</div>
              <p className="p-3.5 bg-surface border border-border rounded-lg leading-relaxed font-medium text-body">
                {exception.description}
              </p>
            </div>

            {affected && (
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-subtle mb-1">
                  Affected Entity
                </div>
                <div className="p-3 bg-bg border border-border rounded-lg flex items-center gap-2 text-deep font-semibold">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{affected}</span>
                </div>
              </div>
            )}

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-subtle mb-1 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                Underlying Signals
              </div>
              <ul className="space-y-1.5">
                {exception.underlyingSignals.map((signal, idx) => (
                  <li key={idx} className="p-2.5 bg-surface border border-border rounded-lg text-body">
                    {signal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-info-bg border border-primary/20 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-info-tx font-bold text-xs">
                <ListChecks className="w-4 h-4" />
                <span>Recommended Next Actions</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-body font-medium">
                {exception.recommendedActions.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </div>

            <div className="text-[11px] text-subtle">
              Owner: <span className="font-semibold text-body">{exception.owner}</span>
            </div>
          </div>

          <div className="p-5 border-t border-border bg-surface flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-border bg-bg hover:bg-muted text-body text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
