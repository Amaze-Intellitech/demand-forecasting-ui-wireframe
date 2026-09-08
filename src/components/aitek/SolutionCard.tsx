import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Solution } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import {
  TrendingUp,
  Package,
  Factory,
  Flame,
  Truck,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAitek } from '../../context/AitekContext';

interface SolutionCardProps {
  solution: Solution;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
  const navigate = useNavigate();
  const { selectSolution, isSolutionAuthenticated } = useAitek();

  const isComingSoon = solution.status === 'coming_soon';
  const isAuth = isSolutionAuthenticated(solution.id);

  const getSolutionIcon = (id: string) => {
    switch (id) {
      case 'demand-intelligence':
        return <TrendingUp className="w-5 h-5 text-sky-400" />;
      case 'inventory-intelligence':
        return <Package className="w-5 h-5 text-cyan-400" />;
      case 'manufacturing-excellence':
        return <Factory className="w-5 h-5 text-emerald-400" />;
      case 'cement-intelligence':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'supply-chain-intelligence':
        return <Truck className="w-5 h-5 text-indigo-400" />;
      default:
        return <Zap className="w-5 h-5 text-sky-400" />;
    }
  };

  const handleAction = () => {
    if (isComingSoon) return;
    selectSolution(solution.id);
    if (isAuth) {
      navigate(`/solutions/${solution.id}/data`);
    } else {
      navigate(`/solutions/${solution.id}/login`);
    }
  };

  return (
    <div
      className={cn(
        'group relative rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-black/40',
        isComingSoon && 'opacity-70 hover:border-slate-800 hover:bg-slate-900/60'
      )}
    >
      {/* Card Header: Icon + Status */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shadow-inner group-hover:border-sky-500/30 transition-colors">
            {getSolutionIcon(solution.id)}
          </div>
          <StatusBadge status={solution.status} />
        </div>

        {/* Title + Tagline */}
        <h3 className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors">
          {solution.name}
        </h3>
        <p className="text-xs font-medium text-sky-400/90 mt-0.5">
          {solution.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-400 mt-3 leading-relaxed">
          {solution.description}
        </p>

        {/* Metrics Grid */}
        {solution.keyMetrics && (
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800/80">
            {solution.keyMetrics.map((metric, idx) => (
              <div key={idx} className="bg-slate-950/40 rounded-md p-2 border border-slate-800/50">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 truncate">
                  {metric.label}
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-0.5">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata + Action */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>{solution.version}</span>
        </div>

        {isComingSoon ? (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="cursor-not-allowed border-slate-800 text-slate-500"
          >
            In Development
          </Button>
        ) : (
          <Button
            variant={isAuth ? 'subtle' : 'primary'}
            size="sm"
            onClick={handleAction}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {isAuth ? (
              <span className="flex items-center gap-1">
                Open Workspace
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Authenticate
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
