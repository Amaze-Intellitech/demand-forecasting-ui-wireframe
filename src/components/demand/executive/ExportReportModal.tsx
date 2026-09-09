import React, { useState } from 'react';
import { X, Download, FileText, Check } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantContext: string;
  productContext: string;
  dateRange: string;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  plantContext,
  productContext,
  dateRange,
}) => {
  const [format, setFormat] = useState<'pdf' | 'xlsx' | 'pptx'>('pdf');
  const [sections, setSections] = useState({
    demandOutlook: true,
    workingCapital: true,
    serviceLevels: true,
    sourcingSavings: true,
    exceptions: true,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const toggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1600);
    }, 1000);
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
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0062d2] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Export Executive Report
              </h3>
              <p className="text-[11px] text-slate-500">
                Prepared for C-suite and leadership briefing
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

        {/* Scope Summary */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span>Planning Window:</span>
            <span className="font-semibold text-slate-900">{dateRange}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Plant Scope:</span>
            <span className="font-semibold text-slate-900">{plantContext}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Product Focus:</span>
            <span className="font-semibold text-slate-900">{productContext}</span>
          </div>
        </div>

        {/* Sections Selection */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-800">
            Include Report Sections
          </div>
          <div className="space-y-1.5 text-xs text-slate-700">
            {[
              { key: 'demandOutlook', label: 'Demand vs. Supply Outlook (Forecast & Range)' },
              { key: 'workingCapital', label: 'Working Capital Risk Waterfall & Cash Traps' },
              { key: 'serviceLevels', label: 'Service Level Performance by Plant' },
              { key: 'sourcingSavings', label: 'Sourcing Optimization Opportunities' },
              { key: 'exceptions', label: 'Active Critical Exceptions & Decision Triggers' },
            ].map(({ key, label }) => {
              const checked = sections[key as keyof typeof sections];
              return (
                <label
                  key={key}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSection(key as keyof typeof sections)}
                    className="w-4 h-4 rounded text-[#0062d2] focus:ring-sky-500 border-slate-300"
                  />
                  <span className="font-medium text-slate-700">{label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Format Selector */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-800">Export Format</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { id: 'pdf', label: 'Executive PDF' },
              { id: 'xlsx', label: 'Excel Workbook' },
              { id: 'pptx', label: 'Slides Deck' },
            ].map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setFormat(fmt.id as any)}
                className={`py-2 px-3 rounded-lg border text-center font-semibold transition-all ${
                  format === fmt.id
                    ? 'border-[#0062d2] bg-sky-50 text-[#0062d2] shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isDone ? (
            <div className="w-full py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              Executive report generated & downloaded!
            </div>
          ) : (
            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownload}
              className="w-full py-2.5 rounded-xl bg-[#0062d2] hover:bg-blue-700 disabled:opacity-75 text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Preparing Executive Report...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Report ({format.toUpperCase()})</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
