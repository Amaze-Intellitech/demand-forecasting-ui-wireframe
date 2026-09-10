import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Paperclip,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  Loader2,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import aitekLogo from '../../../assets/aitek_logo.png';
import { EmbeddedDemandForecastChart } from './EmbeddedDemandForecastChart';
import {
  ChatMessage,
  MOCK_RESPONSES,
  CopilotKpiCard,
  CopilotResponseBlocks,
} from '../../../data/demandCopilotMock';

interface CopilotConversationWorkspaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isThinking: boolean;
  onResetConversation: () => void;
}

export const CopilotConversationWorkspace: React.FC<CopilotConversationWorkspaceProps> = ({
  messages,
  onSendMessage,
  isThinking,
  onResetConversation,
}) => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    const query = inputText.trim();
    setInputText('');
    onSendMessage(query);
  };

  const getKpiIcon = (type: CopilotKpiCard['iconType']) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'bar':
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      default:
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
    }
  };

  const getKpiBg = (color: CopilotKpiCard['color']) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700';
      case 'blue':
        return 'bg-blue-50 text-[#0062d2]';
      case 'amber':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-blue-50 text-[#0062d2]';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full select-none overflow-hidden">
      {/* Top Bar with Clear / Status */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-700">AITEK Demand Copilot</span>
          <span className="text-slate-400">|</span>
          <span className="text-[11px] text-slate-400">Context: Columbus Plant #04 &bull; HDPE Resin</span>
        </div>
        <button
          type="button"
          onClick={onResetConversation}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => {
          if (msg.role === 'user') {
            return (
              <div key={msg.id} className="flex justify-end gap-3 items-start animate-in fade-in duration-200">
                <div className="max-w-xl">
                  <div className="bg-blue-50/70 border border-blue-100/90 rounded-2xl rounded-tr-xs p-3.5 sm:p-4 text-xs sm:text-sm text-slate-900 leading-relaxed font-normal shadow-2xs">
                    {msg.text}
                  </div>
                  <div className="text-right text-[10px] text-slate-400 font-mono mt-1 pr-1">
                    {msg.timestamp}
                  </div>
                </div>
                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#0062d2] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  SM
                </div>
              </div>
            );
          }

          // Assistant Message
          const blocks: CopilotResponseBlocks = msg.blocks || MOCK_RESPONSES.demandOutlook;

          return (
            <div key={msg.id} className="flex gap-3 items-start animate-in fade-in duration-200">
              {/* AITEK Logo Avatar */}
              <div className="w-8 h-8 rounded-full bg-[#080e1a] p-1 flex items-center justify-center shrink-0 shadow-xs border border-slate-700">
                <img src={aitekLogo} alt="AITEK" className="w-full h-auto object-contain" />
              </div>

              {/* Response Body */}
              <div className="flex-1 max-w-2xl bg-white rounded-2xl p-1 text-xs sm:text-sm space-y-3">
                {/* Summary Intro */}
                <p className="text-slate-800 leading-relaxed font-normal">
                  {blocks.summary}
                </p>

                {/* 3 Metric / KPI Row */}
                {blocks.kpis && blocks.kpis.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3">
                    {blocks.kpis.map((kpi, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50/60 border border-slate-100 rounded-xl p-3 flex items-start gap-2.5"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getKpiBg(
                            kpi.color
                          )}`}
                        >
                          {getKpiIcon(kpi.iconType)}
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10.5px] font-semibold text-slate-500 uppercase tracking-tight truncate">
                            {kpi.title}
                          </span>
                          <span className="block text-sm sm:text-base font-extrabold text-slate-900 tracking-tight font-mono">
                            {kpi.value}
                          </span>
                          <span
                            className={`block text-[10.5px] font-semibold ${
                              kpi.color === 'emerald'
                                ? 'text-emerald-600'
                                : kpi.color === 'amber'
                                ? 'text-amber-600'
                                : 'text-slate-500'
                            }`}
                          >
                            {kpi.subtext}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Embedded Forecast Chart (if present in block) */}
                {blocks.hasForecastChart && <EmbeddedDemandForecastChart />}

                {/* Demand Drivers List (if present) */}
                {blocks.drivers && blocks.drivers.length > 0 && (
                  <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3.5 space-y-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Demand Signal Decomposition:
                    </span>
                    <div className="space-y-1.5">
                      {blocks.drivers.map((drv, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0062d2]" />
                            <span className="font-semibold text-slate-800">{drv.name}</span>
                            <span className="text-[11px] text-slate-400 hidden sm:inline">({drv.description})</span>
                          </div>
                          <span className="font-mono font-bold text-[#0062d2]">{drv.percentage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supplier Surge Allocation (if present) */}
                {blocks.suppliers && blocks.suppliers.length > 0 && (
                  <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3.5 space-y-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Surge Capacity Allocation:
                    </span>
                    <div className="space-y-1.5 font-mono text-xs">
                      {blocks.suppliers.map((supp, i) => (
                        <div key={i} className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-slate-100">
                          <span className="font-semibold text-slate-900 font-sans">{supp.name}</span>
                          <span className="text-slate-600">{supp.allocation}</span>
                          <span className="text-emerald-600 font-bold">{supp.reliability} Rel.</span>
                          <span className="text-slate-500">{supp.unitCost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Takeaways Callout Box */}
                {blocks.keyTakeaways && blocks.keyTakeaways.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      <span>Key Takeaways</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {blocks.keyTakeaways.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0062d2] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendation & Direct Action CTA Button */}
                {blocks.cta && (
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    {blocks.recommendation && (
                      <p className="text-xs text-slate-600 italic">
                        <strong className="text-slate-800 font-semibold not-italic">Recommendation: </strong>
                        {blocks.recommendation}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => navigate(blocks.cta!.route)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100/80 text-[#0062d2] text-xs font-bold rounded-lg border border-blue-200 transition-colors shrink-0 cursor-pointer self-start sm:self-auto group"
                    >
                      <span>{blocks.cta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                {/* Interactive Suggested Follow-Up Chips */}
                {blocks.followUps && blocks.followUps.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Suggested Follow-Ups:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {blocks.followUps.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => onSendMessage(chip)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#0062d2] hover:border-blue-200 border border-slate-200/70 text-[11px] text-slate-600 transition-all cursor-pointer font-medium"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp & Confidence Footer */}
                <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>High Confidence &bull; Synthesized across 12 statistical models</span>
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex gap-3 items-center animate-in fade-in duration-150">
            <div className="w-8 h-8 rounded-full bg-[#080e1a] p-1 flex items-center justify-center shrink-0 border border-slate-700">
              <img src={aitekLogo} alt="AITEK" className="w-full h-auto object-contain" />
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 text-xs text-slate-600">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0062d2]" />
              <span>Analyzing demand intelligence models...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Composer Container */}
      <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50/50">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200/90 px-3 py-2 shadow-xs focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
            <button
              type="button"
              title="Attach context file"
              className="text-slate-400 hover:text-slate-600 p-1 transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question or request an analysis..."
              className="flex-1 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="w-8 h-8 rounded-lg bg-[#0062d2] hover:bg-blue-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <p className="text-[10px] text-slate-400 text-center mt-2">
          AI responses are powered by AITEK&apos;s demand intelligence models. Please validate critical decisions.
        </p>
      </div>
    </div>
  );
};
