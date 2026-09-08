import React, { useState } from 'react';
import { ArrowRight, X, Download } from 'lucide-react';
import {
  MONTHLY_FORECAST_TABLE_DATA,
} from '../../data/demandForecastMock';

export const MonthlyForecastTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Visible rows on card (first 6 rows)
  const previewRows = MONTHLY_FORECAST_TABLE_DATA.slice(0, 6);

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
        {/* Header with View All */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Monthly Forecast Table
          </h3>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0062d2] hover:text-[#0052b3] transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto py-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                <th className="py-2 pr-2">Month</th>
                <th className="py-2 px-2 text-right">Forecast (Units)</th>
                <th className="py-2 px-2 text-right">Lower Bound</th>
                <th className="py-2 px-2 text-right">Upper Bound</th>
                <th className="py-2 pl-2 text-right">YoY Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {previewRows.map((row) => (
                <tr
                  key={row.month}
                  className="hover:bg-slate-50/80 transition-colors group font-mono"
                >
                  <td className="py-2 pr-2 font-sans font-medium text-slate-800">
                    {row.month}
                  </td>
                  <td className="py-2 px-2 text-right font-bold text-slate-900">
                    {row.forecast.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 text-right text-slate-500">
                    {row.lowerBound.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 text-right text-slate-500">
                    {row.upperBound.toLocaleString()}
                  </td>
                  <td className="py-2 pl-2 text-right font-bold text-emerald-600">
                    {row.yoyChange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Displaying H1 2026 Horizon</span>
          <span className="font-mono">P90 Confidence Interval</span>
        </div>
      </div>

      {/* Full 12-Month Detailed Forecast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Full 12-Month Projected Forecast
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed monthly volume predictions with 90% confidence bands and YoY variance
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Table Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 pr-3">Month</th>
                    <th className="py-2.5 px-3 text-right">Forecast (Units)</th>
                    <th className="py-2.5 px-3 text-right">Lower Bound</th>
                    <th className="py-2.5 px-3 text-right">Upper Bound</th>
                    <th className="py-2.5 pl-3 text-right">YoY Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {MONTHLY_FORECAST_TABLE_DATA.map((row) => (
                    <tr key={row.month} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-2.5 pr-3 font-sans font-semibold text-slate-800">
                        {row.month}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {row.forecast.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        {row.lowerBound.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        {row.upperBound.toLocaleString()}
                      </td>
                      <td className="py-2.5 pl-3 text-right font-bold text-emerald-600">
                        {row.yoyChange}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                12 Months &bull; Total Projected: <strong>438,800 Units</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0062d2] text-white text-xs font-semibold hover:bg-[#0052b3] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
