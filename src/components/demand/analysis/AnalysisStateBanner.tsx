import React from 'react';
import { Loader2, AlertCircle, Info } from 'lucide-react';
import { AnalysisStatus } from '../../../types/analysisConfig';

interface AnalysisStateBannerProps {
  status: AnalysisStatus;
  parameterName?: string;
  errorMessage?: string;
  emptyMessage?: string;
  className?: string;
}

export const AnalysisStateBanner: React.FC<AnalysisStateBannerProps> = ({
  status,
  parameterName = 'selected parameter',
  errorMessage,
  emptyMessage,
  className = '',
}) => {
  if (status === 'idle' || status === 'success') {
    return null;
  }

  if (status === 'loading') {
    return (
      <div
        className={`bg-blue-50/80 border border-blue-200/90 rounded-lg px-3.5 py-2 flex items-center gap-2.5 text-xs text-blue-800 animate-in fade-in duration-150 ${className}`}
      >
        <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin flex-shrink-0" />
        <span className="font-medium">
          Running analytical recomputation for <span className="font-bold">{parameterName}</span>...
        </span>
      </div>
    );
  }

  if (status === 'error' || errorMessage) {
    return (
      <div
        className={`bg-rose-50 border border-rose-200 rounded-lg px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in duration-150 ${className}`}
      >
        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Analysis Parameter Validation:</span>{' '}
          <span>{errorMessage || 'Unable to run analysis with the selected parameter combination. Please verify your selection.'}</span>
        </div>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div
        className={`bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-amber-800 animate-in fade-in duration-150 ${className}`}
      >
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Insufficient Data:</span>{' '}
          <span>{emptyMessage || `No sufficient historical records are available for ${parameterName} within the selected filter context.`}</span>
        </div>
      </div>
    );
  }

  return null;
};
