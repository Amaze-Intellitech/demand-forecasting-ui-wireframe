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
          classes: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60',
          dot: 'bg-emerald-400 animate-pulse',
        };
      case 'available':
        return {
          label: 'Available',
          classes: 'bg-sky-950/70 text-sky-400 border-sky-800/60',
          dot: 'bg-sky-400',
        };
      case 'coming_soon':
        return {
          label: 'Coming Soon',
          classes: 'bg-slate-800/80 text-slate-400 border-slate-700/60',
          dot: 'bg-slate-500',
        };

      // Connection States
      case 'connected':
        return {
          label: 'Connected',
          classes: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60',
          dot: 'bg-emerald-400',
        };
      case 'connecting':
        return {
          label: 'Connecting...',
          classes: 'bg-amber-950/70 text-amber-300 border-amber-800/60',
          dot: 'bg-amber-400 animate-ping',
        };
      case 'syncing':
        return {
          label: 'Syncing Data...',
          classes: 'bg-sky-950/70 text-sky-300 border-sky-800/60',
          dot: 'bg-sky-400 animate-spin',
        };
      case 'sync_complete':
        return {
          label: 'Sync Completed',
          classes: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/70',
          dot: 'bg-emerald-400',
        };
      case 'validation_error':
        return {
          label: 'Validation Issue',
          classes: 'bg-rose-950/70 text-rose-300 border-rose-800/60',
          dot: 'bg-rose-400',
        };
      case 'not_connected':
      default:
        return {
          label: 'Not Connected',
          classes: 'bg-slate-900/90 text-slate-400 border-slate-800',
          dot: 'bg-slate-600',
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
