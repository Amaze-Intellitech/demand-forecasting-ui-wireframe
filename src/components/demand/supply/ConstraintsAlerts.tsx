import React from 'react';
import { SupplyConstraintAlert } from '../../../types/domain/supplyCapacityOptimization';
import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';

interface ConstraintsAlertsProps {
  alerts: SupplyConstraintAlert[];
  onSelectAlert: (alert: SupplyConstraintAlert) => void;
  onViewAll?: () => void;
}

export const ConstraintsAlerts: React.FC<ConstraintsAlertsProps> = ({
  alerts,
  onSelectAlert,
  onViewAll,
}) => {
  const getSeverityBadge = (severity: SupplyConstraintAlert['severity']) => {
    switch (severity) {
      case 'High':
        return (
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
            Medium
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            Low
          </span>
        );
    }
  };

  const getAlertIcon = (severity: SupplyConstraintAlert['severity']) => {
    switch (severity) {
      case 'High':
        return (
          <div className="w-7 h-7 rounded-md bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
        );
      case 'Medium':
        return (
          <div className="w-7 h-7 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
        );
      case 'Low':
      default:
        return (
          <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4 text-blue-600" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">
          Constraints & Alerts
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* Alerts list */}
      <div className="space-y-2.5 my-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => onSelectAlert(alert)}
            className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200/60"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {getAlertIcon(alert.severity)}
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-800 truncate leading-snug">
                  {alert.title}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5 leading-none">
                  {alert.subtext}
                </div>
              </div>
            </div>

            <div className="shrink-0">
              {getSeverityBadge(alert.severity)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>2 High Criticality</span>
        <span className="text-slate-500">Autonomous resolution active</span>
      </div>
    </div>
  );
};
