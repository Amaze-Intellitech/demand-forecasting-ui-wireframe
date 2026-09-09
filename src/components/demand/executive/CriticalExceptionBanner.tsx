import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface CriticalExceptionBannerProps {
  criticalCount?: number;
  onViewExceptions: () => void;
}

export const CriticalExceptionBanner: React.FC<CriticalExceptionBannerProps> = ({
  criticalCount = 3,
  onViewExceptions,
}) => {
  return (
    <div className="w-full bg-rose-50/70 border border-rose-200/90 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-xs select-none">
      <div className="flex items-start sm:items-center gap-3">
        {/* Warning Icon Badge */}
        <div className="w-8 h-8 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center flex-shrink-0 text-rose-600 mt-0.5 sm:mt-0">
          <AlertTriangle className="w-4.5 h-4.5 text-rose-600" />
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-snug">
            {criticalCount} critical exceptions require executive attention
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            Supplier capacity constraint, demand surge in Packaging, and elevated inventory risk in APAC region.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewExceptions}
        className="self-end sm:self-center inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50/80 border border-rose-200 px-3.5 py-1.5 rounded-lg shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/20"
      >
        <span>View Exceptions</span>
        <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
      </button>
    </div>
  );
};
