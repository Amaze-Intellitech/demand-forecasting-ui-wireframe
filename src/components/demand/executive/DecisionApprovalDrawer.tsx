import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Undo2,
} from 'lucide-react';
import { DecisionTrigger } from '../../../types/domain/executiveCommandCenter';

interface DecisionApprovalDrawerProps {
  trigger: DecisionTrigger | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (triggerId: string) => void;
  onReject: (triggerId: string, reason?: string) => void;
  onModify: (triggerId: string, notes: string) => void;
  onUndo: (triggerId: string) => void;
}

export const DecisionApprovalDrawer: React.FC<DecisionApprovalDrawerProps> = ({
  trigger,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onModify,
  onUndo,
}) => {
  const [isModifying, setIsModifying] = useState(false);
  const [volumeShift, setVolumeShift] = useState(14);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  if (!isOpen || !trigger) return null;

  const isApproved = trigger.status === 'approved';
  const isRejected = trigger.status === 'rejected';

  const handleApprove = () => {
    onApprove(trigger.id);
  };

  const handleSaveModification = () => {
    onModify(trigger.id, `Reallocated volume parameter set to ${volumeShift}%`);
    setIsModifying(false);
  };

  const handleConfirmReject = () => {
    onReject(trigger.id, rejectionReason || 'Rejected by executive leadership');
    setIsRejecting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          
          {/* Drawer Top Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {trigger.id}
                </span>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                  Tier {trigger.autonomyTier} Supervised
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-2.5 leading-snug">
              {trigger.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {trigger.subtitle}
            </p>

            {/* Status Alert if already acted upon */}
            {isApproved && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between gap-3 text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold">APPROVED</span> by {trigger.approvedBy || 'Siddhartha M'}
                    <div className="text-[10px] text-emerald-600">{trigger.approvedAt || 'Just now'}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onUndo(trigger.id)}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
                >
                  <Undo2 className="w-3 h-3" />
                  Undo
                </button>
              </div>
            )}

            {isRejected && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between gap-3 text-xs text-rose-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold">REJECTED</span> by Siddhartha M
                    <div className="text-[10px] text-rose-600">Decision marked as declined</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onUndo(trigger.id)}
                  className="text-[11px] font-semibold text-rose-700 hover:text-rose-900 underline flex items-center gap-1"
                >
                  Reopen
                </button>
              </div>
            )}
          </div>

          {/* Drawer Body Details */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700">
            {/* Issue Statement */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Detected Business Issue
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg font-medium text-slate-800">
                {trigger.impact}
              </div>
            </div>

            {/* Evidence & Telemetry */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Telemetry & Model Evidence
              </div>
              <p className="text-slate-600 leading-relaxed">
                {trigger.evidence}
              </p>
            </div>

            {/* AITEK Recommendation */}
            <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-sky-900 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-[#0062d2]" />
                <span>AITEK Strategic Recommendation</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {trigger.recommendation.summary}
              </p>
            </div>

            {/* Expected Impact KPI Strip */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Simulated Operational Impact
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mb-0.5">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>Service SLA</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-600 font-mono">
                    {trigger.recommendation.serviceImpact}
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mb-0.5">
                    <DollarSign className="w-3 h-3 text-amber-600" />
                    <span>Cost Delta</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800 font-mono">
                    {trigger.recommendation.costImpact}
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mb-0.5">
                    <ShieldCheck className="w-3 h-3 text-sky-600" />
                    <span>Risk Exposure</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-600">
                    {trigger.recommendation.riskImpact}
                  </div>
                </div>
              </div>
            </div>

            {/* Modification Mode Form */}
            {isModifying && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#0062d2]" />
                    Adjust Allocation Parameter
                  </span>
                  <span className="font-bold text-[#0062d2] font-mono text-xs">
                    {volumeShift}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={volumeShift}
                  onChange={(e) => setVolumeShift(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0062d2]"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Conservative (5%)</span>
                  <span>Recommended (14%)</span>
                  <span>Aggressive (35%)</span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModifying(false)}
                    className="px-2.5 py-1 text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveModification}
                    className="px-3 py-1 bg-[#0062d2] hover:bg-blue-700 text-white rounded font-semibold text-xs shadow-xs"
                  >
                    Apply Parameter & Approve
                  </button>
                </div>
              </div>
            )}

            {/* Reject Prompt Form */}
            {isRejecting && (
              <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
                <div className="font-bold text-rose-900 text-xs">
                  Decline Reason (Optional)
                </div>
                <input
                  type="text"
                  placeholder="e.g. Budget constraints, prioritizing Plant E..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-rose-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsRejecting(false)}
                    className="px-2.5 py-1 text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReject}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-semibold text-xs shadow-xs"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
            >
              Close
            </button>

            {!isApproved && !isRejected && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRejecting(true);
                    setIsModifying(false);
                  }}
                  className="px-3.5 py-2 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 text-xs font-semibold transition-colors shadow-xs"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModifying(true);
                    setIsRejecting(false);
                  }}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
                >
                  Modify
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="px-4 py-2 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve Decision</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
