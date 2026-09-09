import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ForecastSkuChange } from '../../../types/domain/demandForecast';

interface TopSkuForecastChangesProps {
  skus: ForecastSkuChange[];
  onSelectSku: (sku: ForecastSkuChange) => void;
  onViewAll?: () => void;
}

export const TopSkuForecastChanges: React.FC<TopSkuForecastChangesProps> = ({
  skus,
  onSelectSku,
  onViewAll,
}) => {
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

  const getConfidenceBadge = (confidence: ForecastSkuChange['confidence']) => {
    switch (confidence) {
      case 'High':
        return 'text-rose-600 font-semibold'; // Matching mock image label accent
      case 'Medium':
        return 'text-amber-600 font-semibold';
      case 'Low':
      default:
        return 'text-slate-400 font-medium';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Top SKUs by Forecast Change
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

      {/* Table */}
      <div className="overflow-x-auto mt-1 flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
              <th className="py-2 px-2.5 font-normal">SKU</th>
              <th className="py-2 px-2.5 font-normal">Product</th>
              <th className="py-2 px-2.5 font-normal text-right">Current Forecast</th>
              <th className="py-2 px-2.5 font-normal text-right">Change vs. Prior</th>
              <th className="py-2 px-2.5 font-normal text-center">Confidence</th>
              <th className="py-2 px-2.5 font-normal text-right">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {skus.map((item) => {
              const isPositive = item.numericChange > 0;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectSku(item)}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <td className="py-2 px-2.5 font-bold font-mono text-slate-800 group-hover:text-[#0062d2] transition-colors whitespace-nowrap">
                    {item.sku}
                  </td>
                  <td className="py-2 px-2.5 text-slate-600 truncate max-w-[100px]">
                    {item.product}
                  </td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                    {item.currentForecast}
                  </td>
                  <td className="py-2 px-2.5 text-right font-bold font-mono whitespace-nowrap">
                    <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>
                      {item.changeVsPrior}
                    </span>
                  </td>
                  <td className="py-2 px-2.5">
                    <div className="flex justify-center">
                      {renderConfidenceMeter(item.confidenceBars)}
                    </div>
                  </td>
                  <td className={`py-2 px-2.5 text-right text-[11px] whitespace-nowrap ${getConfidenceBadge(item.confidence)}`}>
                    {item.confidence}
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
