import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { LiveSignalFeedItem } from '../../../types/domain/demandSensing';

interface LiveSignalFeedProps {
  items: LiveSignalFeedItem[];
  activeSourceFilter?: string;
  onClearSourceFilter?: () => void;
  onViewAll?: () => void;
}

export const LiveSignalFeed: React.FC<LiveSignalFeedProps> = ({
  items,
  activeSourceFilter,
  onClearSourceFilter,
  onViewAll,
}) => {
  const getImpactColor = (impact: LiveSignalFeedItem['impact']) => {
    switch (impact) {
      case 'High':
        return 'text-rose-600 font-bold';
      case 'Medium':
        return 'text-amber-600 font-medium';
      case 'Low':
      default:
        return 'text-emerald-600 font-medium';
    }
  };

  const renderConfidenceMeter = (bars: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-2 rounded-xs transition-colors ${
              i === 1 ? 'w-2.5' : i === 2 ? 'w-3' : i === 3 ? 'w-3.5' : 'w-4'
            } ${i <= bars ? 'bg-emerald-500' : 'bg-slate-200'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Live Signal Feed
          </h3>
          {activeSourceFilter && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-[#0062d2] border border-sky-200">
              <span>Source: {activeSourceFilter}</span>
              <button
                type="button"
                onClick={onClearSourceFilter}
                className="hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
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

      {/* Table */}
      <div className="overflow-x-auto mt-2 flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
              <th className="py-2.5 px-3 font-normal">Time</th>
              <th className="py-2.5 px-3 font-normal">Source</th>
              <th className="py-2.5 px-3 font-normal">Signal</th>
              <th className="py-2.5 px-3 font-normal text-right">Change</th>
              <th className="py-2.5 px-3 font-normal">Confidence</th>
              <th className="py-2.5 px-3 font-normal text-right">Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-500 whitespace-nowrap font-mono text-[11px]">
                  {item.time}
                </td>
                <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                  {item.source}
                </td>
                <td className="py-2.5 px-3 text-slate-700">
                  {item.signal}
                </td>
                <td className="py-2.5 px-3 text-right font-bold font-mono whitespace-nowrap text-emerald-600">
                  {item.change}
                </td>
                <td className="py-2.5 px-3">
                  {renderConfidenceMeter(item.confidenceBars)}
                </td>
                <td className={`py-2.5 px-3 text-right whitespace-nowrap ${getImpactColor(item.impact)}`}>
                  {item.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
