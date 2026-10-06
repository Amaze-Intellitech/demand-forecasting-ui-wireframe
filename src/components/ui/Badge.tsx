import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-semibold rounded-full select-none leading-normal transition-colors whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'bg-neutral-bg text-body-c border border-border',
        accent: 'bg-info-bg text-info-tx border border-transparent',
        success: 'bg-success-bg text-success-tx border border-transparent',
        watch: 'bg-warning-bg text-warning-tx border border-transparent',
        warning: 'bg-warning-bg text-warning-tx border border-transparent',
        risk: 'bg-error-bg text-error-tx border border-transparent',
        error: 'bg-error-bg text-error-tx border border-transparent',
        info: 'bg-info-bg text-info-tx border border-transparent',
        ai: 'bg-ai-bg text-ai-tx border border-transparent',
        navy: 'bg-deep text-white border border-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-1 text-xs',
        default: 'px-2 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      tone: 'neutral',
      size: 'default',
    },
  }
);

// Tone to shape mapping for status-driven accessibility
const TONE_SHAPE: Record<string, string> = {
  success: 'circle',
  watch: 'triangle',
  warning: 'triangle',
  risk: 'diamond',
  error: 'diamond',
  accent: 'square',
  info: 'square',
};

const dotColor: Record<string, string> = {
  success: 'bg-success',
  watch: 'bg-warning',
  warning: 'bg-warning',
  risk: 'bg-error',
  error: 'bg-error',
  accent: 'bg-primary',
  info: 'bg-primary',
  ai: 'bg-ai',
  neutral: 'bg-subtle',
  navy: 'bg-white',
};

export function StatusShape({ shape }: { shape: string }) {
  if (shape === 'triangle') {
    return (
      <span aria-hidden="true" className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-current opacity-80" />
    );
  }
  if (shape === 'diamond') {
    return (
      <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rotate-45 bg-current opacity-80" />
    );
  }
  if (shape === 'square') {
    return (
      <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-[1px] bg-current opacity-80" />
    );
  }
  return (
    <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-80" />
  );
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  tone?: 'neutral' | 'accent' | 'success' | 'watch' | 'warning' | 'risk' | 'error' | 'info' | 'ai' | 'navy';
  variant?: 'neutral' | 'accent' | 'success' | 'watch' | 'warning' | 'risk' | 'error' | 'info' | 'ai' | 'navy';
  shape?: string | boolean;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  tone,
  variant,
  size,
  shape,
  dot,
  children,
  ...props
}) => {
  const resolvedTone = tone || variant || 'neutral';
  const resolvedShape =
    shape === false
      ? null
      : typeof shape === 'string'
      ? shape
      : shape === true
      ? TONE_SHAPE[resolvedTone] || 'circle'
      : dot
      ? 'circle'
      : TONE_SHAPE[resolvedTone] || null;

  return (
    <span
      className={cn(
        badgeVariants({ tone: resolvedTone as any, size: size as any }),
        className
      )}
      {...props}
    >
      {resolvedShape ? (
        dot ? (
          <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColor[resolvedTone] || 'bg-subtle')} />
        ) : (
          <StatusShape shape={resolvedShape} />
        )
      ) : null}
      <span>{children}</span>
    </span>
  );
};

export { badgeVariants };
