import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DemandEvent } from '../../../types/domain/demandSensing';

interface DemandEventsCardProps {
  events: DemandEvent[];
  onSelectEvent: (event: DemandEvent) => void;
  onViewAll?: () => void;
}

export const DemandEventsCard: React.FC<DemandEventsCardProps> = ({
  events,
  onSelectEvent,
  onViewAll,
}) => {
  const getSeverityStyle = (severity: DemandEvent['severity']) => {
    switch (severity) {
      case 'High':
        return {
          bar: 'bg-rose-500',
          badge: 'bg-rose-50 text-rose-700 border-rose-200',
        };
      case 'Medium':
        return {
          bar: 'bg-amber-500',
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'Low':
      default:
        return {
          bar: 'bg-emerald-500',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Recent Demand Events
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#0062d2] hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Events Stack */}
      <div className="flex-1 space-y-2 mt-2 flex flex-col justify-between">
        {events.map((evt) => {
          const { bar, badge } = getSeverityStyle(evt.severity);

          return (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="p-2.5 rounded-lg border border-slate-100/90 hover:border-slate-200 hover:bg-slate-50/70 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              {/* Severity Pill & Content */}
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Colored Vertical Accent Pill */}
                <span className={`w-1 h-7 rounded-full flex-shrink-0 ${bar}`} />

                {/* Severity Badge */}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex-shrink-0 ${badge}`}>
                  {evt.severity}
                </span>

                {/* Event Details */}
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#0062d2] transition-colors truncate">
                    {evt.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {evt.impact}
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <span className="text-[11px] text-slate-400 font-mono flex-shrink-0 text-right">
                {evt.timeAgo}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
