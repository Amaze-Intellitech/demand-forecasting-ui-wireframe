import React from 'react';
import {
  X,
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  FileSearch,
  CheckCircle,
} from 'lucide-react';
import { PlanningEvent } from '../../../types/domain/executiveCommandCenter';

interface ExceptionDetailDrawerProps {
  event: PlanningEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenWorkspace: (route: string) => void;
  onDismiss: (eventId: string) => void;
}

export const ExceptionDetailDrawer: React.FC<ExceptionDetailDrawerProps> = ({
  event,
  isOpen,
  onClose,
  onOpenWorkspace,
  onDismiss,
}) => {
  if (!isOpen || !event) return null;

  const isHigh = event.impact === 'High';
  const isMedium = event.impact === 'Medium';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {event.id}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    isHigh
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : isMedium
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {event.impact} Impact Exception
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-2.5 leading-snug">
              {event.event}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {event.category}
              </span>
            </div>
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Business Impact Card */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Business & SLA Impact
              </div>
              <div className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-lg flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">
                    High Operational Exposure
                  </div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Potential service disruption and delivery delay affecting Q3 operating schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* Root Cause Analysis */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Root Cause Analysis
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed font-medium">
                {event.rootCause}
              </div>
            </div>

            {/* Affected Area */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Affected Entity & Region
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-slate-800 font-semibold">
                <MapPin className="w-4 h-4 text-[#0062d2]" />
                <span>{event.affectedArea}</span>
              </div>
            </div>

            {/* AITEK Recommended Action */}
            <div className="p-4 bg-info-bg border border-border rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-deep font-bold text-xs">
                <FileSearch className="w-4 h-4 text-[#0062d2]" />
                <span>Recommended Prescriptive Action</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {event.recommendation}
              </p>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onDismiss(event.id)}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
            >
              Dismiss
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenWorkspace(`/solutions/demand-intelligence/risk-exceptions?eventId=${event.id}`)}
                className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
              >
                View in Risk & Exception Center
              </button>
              <button
                type="button"
                onClick={() => onOpenWorkspace(event.targetWorkspaceRoute)}
                className="px-4 py-2 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{event.nextBestAction}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
