import React from 'react';
import { FileEdit, ArrowRight } from 'lucide-react';
import { PlanningEvent } from '../../../types/domain/executiveCommandCenter';

interface RecentActivityProps {
  events: PlanningEvent[];
  onSelectEvent: (event: PlanningEvent) => void;
  onViewAll?: () => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  events,
  onSelectEvent,
  onViewAll,
}) => {
  const getCategoryDot = (category: PlanningEvent['category']) => {
    switch (category) {
      case 'Supply Risk':
        return 'bg-rose-500';
      case 'Demand Surge':
        return 'bg-sky-500';
      case 'Inventory':
        return 'bg-amber-500';
      case 'Market Signal':
        return 'bg-teal-500';
      case 'Sourcing':
        return 'bg-emerald-500';
      default:
        return 'bg-slate-400';
    }
  };

  const getImpactColor = (impact: PlanningEvent['impact']) => {
    switch (impact) {
      case 'High':
        return 'text-rose-600 font-bold';
      case 'Medium':
        return 'text-amber-600 font-medium';
      case 'Low':
        return 'text-emerald-600 font-medium';
      default:
        return 'text-slate-600';
    }
  };

  const getStatusBadge = (status: PlanningEvent['status']) => {
    switch (status) {
      case 'Open':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'In Review':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Monitoring':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Resolved':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <FileEdit className="w-4 h-4 text-[#0062d2]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Recent Activity & Key Events
          </h3>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#0062d2] hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Event</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">Impact</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {events.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                onClick={() => onSelectEvent(item)}
              >
                <td className="py-2.5 px-3 font-medium text-slate-500 whitespace-nowrap">
                  {item.time}
                </td>
                <td className="py-2.5 px-3 font-semibold text-slate-900 group-hover:text-[#0062d2] transition-colors">
                  {item.event}
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${getCategoryDot(item.category)}`} />
                    <span className="font-medium text-slate-700">{item.category}</span>
                  </span>
                </td>
                <td className={`py-2.5 px-3 whitespace-nowrap ${getImpactColor(item.impact)}`}>
                  {item.impact}
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(item);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0062d2] hover:text-blue-800 transition-colors"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
