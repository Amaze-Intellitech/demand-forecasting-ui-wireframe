import React, { useState } from 'react';
import { X, Download, CheckCircle2, FileSpreadsheet, FileText, Check } from 'lucide-react';

interface ExportForecastModalProps {
  isOpen: boolean;
  onClose: () => void;
  planningPeriod: string;
}

export const ExportForecastModal: React.FC<ExportForecastModalProps> = ({
  isOpen,
  onClose,
  planningPeriod,
}) => {
  const [format, setFormat] = useState<'excel' | 'csv' | 'pdf'>('excel');
  const [isExported, setIsExported] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExported(true);
    setTimeout(() => {
      setIsExported(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-info-bg text-[#0062d2] flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Export Forecast Intelligence
              </h3>
              <p className="text-[11px] text-slate-500">
                Planning Cycle: {planningPeriod}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Included Checklist */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-slate-800">
            Package Contents Included
          </div>
          <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px] pt-1">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Probabilistic Fan (P10–P95)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Model Tournament (6 models)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>FVA Error Decomposition</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Regional & Category Mix</span>
            </div>
          </div>
        </div>

        {/* Format Selector */}
        <div>
          <label className="text-xs font-bold text-slate-800 mb-2 block">
            Choose Export Format
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setFormat('excel')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                format === 'excel'
                  ? 'border-[#0062d2] bg-info-bg text-[#0062d2] shadow-2xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              <span>Excel (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat('csv')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                format === 'csv'
                  ? 'border-[#0062d2] bg-info-bg text-[#0062d2] shadow-2xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <span>CSV (.csv)</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat('pdf')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                format === 'pdf'
                  ? 'border-[#0062d2] bg-info-bg text-[#0062d2] shadow-2xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <FileText className="w-5 h-5 text-rose-500" />
              <span>Executive PDF</span>
            </button>
          </div>
        </div>

        {/* Status or Button */}
        {isExported ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Forecast Package Generated Successfully</span>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-5 py-2 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Forecast Package</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
