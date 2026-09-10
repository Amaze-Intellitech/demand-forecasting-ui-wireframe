import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-lg border border-border bg-bg shadow-lg', className)}
    {...props}
  />
));
Card.displayName = 'Card';

export type FeatureCardAccent = 'primary' | 'success' | 'warning' | 'error';

const accentColor: Record<FeatureCardAccent, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
};

export interface FeatureCardProps extends CardProps {
  accent?: FeatureCardAccent;
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, accent = 'primary', children, ...props }, ref) => (
    <div ref={ref} className={cn('relative overflow-hidden rounded-lg border border-border bg-bg shadow-lg', className)} {...props}>
      <div className={cn('absolute inset-x-0 top-0 h-1', accentColor[accent])} />
      {children}
    </div>
  )
);
FeatureCard.displayName = 'FeatureCard';
