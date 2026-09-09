import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DriverBreakEvent } from '../../../types/domain/causalIntelligence';

interface DriverEventsCardProps {
  events: DriverBreakEvent[];
  onSelectEvent: (event: DriverBreakEvent) => void;
  onViewAll?: () => void;
}

export const DriverEventsCard: React.FC<DriverEventsCardProps> = ({
  events,
  onSelectEvent,
  onViewAll,
}) => {
  const getTypeBadge = (type: DriverBreakEvent['type']) => {
    switch (type) {
      case 'Market Event':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Business Event':
        return 'bg-sky-50 text-[#0062d2] border-sky-200';
      case 'External Event':
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Driver Events & Structural Breaks
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#0062d2] hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto mt-1 flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
              <th className="py-2.5 px-3 font-normal">Date</th>
              <th className="py-2.5 px-3 font-normal">Event</th>
              <th className="py-2.5 px-3 font-normal">Driver</th>
              <th className="py-2.5 px-3 font-normal text-right">Impact</th>
              <th className="py-2.5 px-3 font-normal text-right">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {events.map((evt) => {
              const isPositive = evt.impactNum > 0;

              return (
                <tr
                  key={evt.id}
                  onClick={() => onSelectEvent(evt)}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <td className="py-2.5 px-3 font-medium text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {evt.date}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900 group-hover:text-[#0062d2] transition-colors whitespace-nowrap">
                    {evt.event}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {evt.driver}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold whitespace-nowrap">
                    <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>
                      {evt.impact}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${getTypeBadge(evt.type)}`}>
                      {evt.type}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
