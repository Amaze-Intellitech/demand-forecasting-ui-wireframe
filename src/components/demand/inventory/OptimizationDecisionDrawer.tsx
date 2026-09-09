import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Users,
} from 'lucide-react';
import {
  InventoryOpportunity,
  ApprovalStatus,
} from '../../../types/domain/inventoryIntelligence';

interface OptimizationDecisionDrawerProps {
  opportunity: InventoryOpportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateApproval: (oppId: string, status: ApprovalStatus) => void;
}

export const OptimizationDecisionDrawer: React.FC<OptimizationDecisionDrawerProps> = ({
  opportunity,
  isOpen,
  onClose,
  onUpdateApproval,
}) => {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  if (!isOpen || !opportunity) return null;

  const handleAction = (status: ApprovalStatus) => {
    onUpdateApproval(opportunity.id, status);
    setFeedbackMessage(`Opportunity ${status.toLowerCase()} successfully.`);
    setTimeout(() => {
      setFeedbackMessage(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                {opportunity.action} Workflow
              </span>
              {opportunity.approvalStatus === 'Approved' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Approved</span>
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-2">
              {opportunity.opportunity}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 flex-1 text-xs">
          {/* Key Impact Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-emerald-50/40 border border-emerald-200/60 rounded-xl">
              <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>Financial Impact</span>
              </div>
              <div className="font-mono text-xl font-black text-emerald-700 mt-1">
                {opportunity.potentialImpact}
              </div>
              <div className="text-[10px] text-emerald-600 mt-0.5">
                {opportunity.isServiceProtection ? 'Service revenue protection' : 'Working capital release'}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Scope of SKUs</span>
              </div>
              <div className="font-mono text-xl font-black text-slate-900 mt-1">
                {opportunity.affectedSkus}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Active product lines</div>
            </div>
          </div>

          {/* Service Impact Analysis */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Projected Service Impact</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {opportunity.serviceImpact}
            </p>
          </div>

          {/* Recommendation Narrative */}
          <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl space-y-1.5">
            <div className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Prescriptive Recommendation</span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed">
              {opportunity.recommendation}
            </p>
          </div>

          {/* Audit trail if approved */}
          {opportunity.approvalStatus === 'Approved' && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
              <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-bold">Approved by {opportunity.approvedBy || 'Siddhartha M'}</span>
                <div className="text-[11px] text-emerald-600">{opportunity.approvedAt || 'Just now'} • Execution batch queued</div>
              </div>
            </div>
          )}

          {feedbackMessage && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-center font-bold text-xs animate-in fade-in">
              {feedbackMessage}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2">
          {opportunity.approvalStatus !== 'Approved' ? (
            <>
              <button
                type="button"
                onClick={() => handleAction('Rejected')}
                className="py-2 px-3 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200 cursor-pointer flex items-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
              <button
                type="button"
                onClick={() => handleAction('Modified')}
                className="py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              >
                Modify
              </button>
              <button
                type="button"
                onClick={() => handleAction('Approved')}
                className="flex-1 py-2 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve & Execute</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
