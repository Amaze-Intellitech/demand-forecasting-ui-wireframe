import React from 'react';
import { X, Grid3X3, Layers } from 'lucide-react';
import { AbcXyzSegment } from '../../../types/domain/inventoryIntelligence';

interface AbcXyzDrawerProps {
  segments: AbcXyzSegment[];
  isOpen: boolean;
  onClose: () => void;
}

export const AbcXyzDrawer: React.FC<AbcXyzDrawerProps> = ({
  segments,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const rows = ['A', 'B', 'C'] as const;
  const cols = ['X', 'Y', 'Z'] as const;

  const getSegment = (row: string, col: string) => {
    const key = `${row}${col}`;
    return segments.find((s) => s.segment === key);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                ABC / XYZ Inventory Segmentation
              </h3>
              <p className="text-xs text-slate-500">
                Value-volume concentration (ABC) vs. demand predictability (XYZ)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Strategic Definition Summary */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="font-bold text-slate-800 mb-1">ABC Dimension (Capital Exposure)</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              <strong className="text-slate-900">A:</strong> Top 70% revenue/value • <strong className="text-slate-900">B:</strong> Next 20% value • <strong className="text-slate-900">C:</strong> Bottom 10% value.
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="font-bold text-slate-800 mb-1">XYZ Dimension (Volatility)</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              <strong className="text-slate-900">X:</strong> Constant, low CV (&lt;0.5) • <strong className="text-slate-900">Y:</strong> Variable demand • <strong className="text-slate-900">Z:</strong> Intermittent, erratic.
            </p>
          </div>
        </div>

        {/* 3x3 Matrix Grid */}
        <div className="space-y-2">
          {/* Header Row: X, Y, Z */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-slate-400">
            <div></div>
            <div className="py-1">X (Stable)</div>
            <div className="py-1">Y (Variable)</div>
            <div className="py-1">Z (Volatile)</div>
          </div>

          {/* Rows: A, B, C */}
          {rows.map((r) => (
            <div key={r} className="grid grid-cols-4 gap-2">
              {/* Row Label */}
              <div className="flex items-center justify-center font-bold text-slate-700 text-xs bg-slate-50 rounded-xl border border-slate-200">
                Class {r}
              </div>

              {/* Matrix Cells */}
              {cols.map((c) => {
                const seg = getSegment(r, c);
                if (!seg) return null;

                return (
                  <div
                    key={`${r}${c}`}
                    className="p-3.5 rounded-xl border transition-all hover:shadow-xs cursor-pointer"
                    style={{
                      backgroundColor: `${seg.color}0a`,
                      borderColor: `${seg.color}30`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-black text-sm text-slate-900">
                        {seg.segment}
                      </span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${seg.color}20`,
                          color: seg.color,
                        }}
                      >
                        {seg.status}
                      </span>
                    </div>
                    <div className="font-mono text-base font-black text-slate-800">
                      {seg.skuCount} <span className="text-[10px] font-normal text-slate-500 font-sans">SKUs</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 truncate">
                      {seg.valueDescription}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Strategic Takeaway */}
        <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-2.5 text-xs">
          <Layers className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-slate-700 text-[11px] leading-relaxed">
            <strong>Key Insight:</strong> 182 SKUs in <strong>Class AX</strong> account for 54% of working capital with stable demand; safety stock can be trimmed by 4 days to release cash. Conversely, 42 SKUs in <strong>AZ</strong> require probabilistic buffer protection.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
