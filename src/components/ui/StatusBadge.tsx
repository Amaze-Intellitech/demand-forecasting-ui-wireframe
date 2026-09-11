import React from 'react';
import { cn } from '../../lib/utils';
import { SolutionStatus, ConnectionState } from '../../types';

interface StatusBadgeProps {
  status: SolutionStatus | ConnectionState;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      // Solution Statuses
      case 'active':
        return {
          label: 'Active Solution',
          classes: 'bg-success-bg text-success-tx border-success/20',
          dot: 'bg-success animate-pulse',
        };
      case 'available':
        return {
          label: 'Available',
          classes: 'bg-info-bg text-info-tx border-primary/20',
          dot: 'bg-primary',
        };
      case 'coming_soon':
        return {
          label: 'Coming Soon',
          classes: 'bg-neutral-bg text-neutral-tx border-border',
          dot: 'bg-subtle',
        };

      // Connection States
      case 'connected':
        return {
          label: 'Connected',
          classes: 'bg-success-bg text-success-tx border-success/20',
          dot: 'bg-success',
        };
      case 'connecting':
        return {
          label: 'Connecting...',
          classes: 'bg-warning-bg text-warning-tx border-warning/20',
          dot: 'bg-warning animate-ping',
        };
      case 'syncing':
        return {
          label: 'Syncing Data...',
          classes: 'bg-info-bg text-info-tx border-primary/20',
          dot: 'bg-primary animate-spin',
        };
      case 'sync_complete':
        return {
          label: 'Sync Completed',
          classes: 'bg-success-bg text-success-tx border-success/20',
          dot: 'bg-success',
        };
      case 'validation_error':
        return {
          label: 'Validation Issue',
          classes: 'bg-error-bg text-error-tx border-error/20',
          dot: 'bg-error',
        };
      case 'not_connected':
      default:
        return {
          label: 'Not Connected',
          classes: 'bg-neutral-bg text-neutral-tx border-border',
          dot: 'bg-subtle',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border rounded-full select-none',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        config.classes,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', config.dot)} />
      <span>{config.label}</span>
    </span>
  );
};
