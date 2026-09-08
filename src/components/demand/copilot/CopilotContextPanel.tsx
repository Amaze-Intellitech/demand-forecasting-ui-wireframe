import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  BarChart3,
  Box,
  AlertTriangle,
  Leaf,
  FileText,
  Sliders,
  Truck,
  Bell,
  ChevronRight,
  MessageSquare,
  X,
  CheckCircle2,
} from 'lucide-react';
import {
  RELEVANT_INSIGHTS,
  COPILOT_ACTION_LINKS,
  PAST_CONVERSATIONS,
} from '../../../data/demandCopilotMock';

interface CopilotContextPanelProps {
  onSelectQuery: (query: string) => void;
}

export const CopilotContextPanel: React.FC<CopilotContextPanelProps> = ({ onSelectQuery }) => {
  const navigate = useNavigate();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState('20');
  const [alertSaved, setAlertSaved] = useState(false);

  const getInsightIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
      case 'Box':
        return <Box className="w-4 h-4 text-emerald-600" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'Leaf':
        return <Leaf className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  const getInsightBg = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50';
      case 'blue':
        return 'bg-blue-50';
      case 'amber':
        return 'bg-amber-50';
      default:
        return 'bg-blue-50';
    }
  };

  const getActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-[#0062d2]" />;
      case 'Sliders':
        return <Sliders className="w-4 h-4 text-[#0062d2]" />;
      case 'Truck':
        return <Truck className="w-4 h-4 text-[#0062d2]" />;
      case 'Bell':
        return <Bell className="w-4 h-4 text-[#0062d2]" />;
      default:
        return <ChevronRight className="w-4 h-4 text-[#0062d2]" />;
    }
  };

  const handleActionClick = (item: (typeof COPILOT_ACTION_LINKS)[0]) => {
    if (item.id === 'act-alerts') {
      setShowAlertModal(true);
      setAlertSaved(false);
    } else {
      navigate(item.route);
    }
  };

  return (
    <div className="space-y-4 select-none">
      {/* 1. Relevant Insights Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0062d2] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Relevant Insights
          </h3>
        </div>

        <div className="space-y-2.5 pt-3">
          {RELEVANT_INSIGHTS.map((insight) => (
            <button
              key={insight.id}
              type="button"
              onClick={() => onSelectQuery(insight.relatedQuery)}
              className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group cursor-pointer"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${getInsightBg(
                  insight.color
                )}`}
              >
                {getInsightIcon(insight.iconName)}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0062d2] transition-colors truncate">
                  {insight.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {insight.subtext}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Actions You Can Take Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0062d2] flex items-center justify-center">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Actions You Can Take
          </h3>
        </div>

        <div className="space-y-1 pt-2">
          {COPILOT_ACTION_LINKS.map((act) => (
            <button
              key={act.id}
              type="button"
              onClick={() => handleActionClick(act)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50/40 text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {getActionIcon(act.iconName)}
                <span className="text-xs font-semibold text-slate-700 group-hover:text-[#0062d2] transition-colors">
                  {act.title}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0062d2] group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. Past Conversations Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0062d2] flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Past Conversations
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onSelectQuery('Summarize key actions I should take this quarter.')}
            className="text-[11px] font-semibold text-[#0062d2] hover:text-blue-700 cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-2.5 pt-3">
          {PAST_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => onSelectQuery(conv.query)}
              className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 group-hover:text-[#0062d2] transition-colors" />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-medium text-slate-800 group-hover:text-[#0062d2] transition-colors truncate">
                  {conv.title}
                </h4>
                <p className="text-[10.5px] text-slate-400 mt-0.5 font-mono">
                  {conv.timestamp}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Set Inventory Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0062d2] flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Set Inventory Alert</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowAlertModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!alertSaved ? (
              <div className="mt-3 space-y-3">
                <p className="text-xs text-slate-600">
                  Notify me when safety stock buffer falls below:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(e.target.value)}
                    className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold"
                  />
                  <span className="text-xs text-slate-600 font-medium">Days of Supply</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Applies to: HDPE Resin, LDPE Film, PP Copolymer at Columbus Plant #04.
                </p>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAlertModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertSaved(true)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0062d2] hover:bg-blue-700 rounded-lg shadow-xs"
                  >
                    Save Alert
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 text-center py-2 space-y-2">
                <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-slate-900 text-xs">Alert Trigger Configured</h5>
                <p className="text-[11px] text-slate-500">
                  You will receive in-app and email notifications if forward supply drops below {alertThreshold} days.
                </p>
                <button
                  type="button"
                  onClick={() => setShowAlertModal(false)}
                  className="mt-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0062d2] rounded-lg"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
