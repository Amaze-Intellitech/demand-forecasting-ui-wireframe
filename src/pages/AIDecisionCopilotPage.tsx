import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DemandIntelligenceSidebar } from '../components/demand/DemandIntelligenceSidebar';
import { DemandTopbar } from '../components/demand/DemandTopbar';
import { CopilotQuickActions } from '../components/demand/copilot/CopilotQuickActions';
import { SuggestedQuestionsPanel } from '../components/demand/copilot/SuggestedQuestionsPanel';
import { CopilotConversationWorkspace } from '../components/demand/copilot/CopilotConversationWorkspace';
import { CopilotContextPanel } from '../components/demand/copilot/CopilotContextPanel';
import {
  ChatMessage,
  MOCK_RESPONSES,
} from '../data/demandCopilotMock';

export const AIDecisionCopilotPage: React.FC = () => {
  // Topbar date range
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Jan 2025 – Dec 2026');

  // Initial Demo Conversation
  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      role: 'user',
      timestamp: '10:24 AM',
      text: 'What is the demand outlook for HDPE Resin over the next 12 months? Also, do we need to take any immediate action?',
    },
    {
      id: 'msg-2',
      role: 'assistant',
      timestamp: '10:24 AM',
      blocks: MOCK_RESPONSES.demandOutlook,
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isThinking, setIsThinking] = useState(false);

  // Send message engine
  const handleSendMessage = (queryText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      timestamp: 'Just now',
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    // Simulate short intelligent response delay (550ms)
    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let responseBlock = MOCK_RESPONSES.fallback;

      if (lower.includes('price') || lower.includes('margin') || lower.includes('elasticity')) {
        responseBlock = MOCK_RESPONSES.priceIncrease;
      } else if (
        lower.includes('driver') ||
        lower.includes('why is demand') ||
        lower.includes('increasing for')
      ) {
        responseBlock = MOCK_RESPONSES.demandDrivers;
      } else if (
        lower.includes('surge') ||
        lower.includes('supplier') ||
        lower.includes('capacity')
      ) {
        responseBlock = MOCK_RESPONSES.supplierSurge;
      } else if (
        lower.includes('stockout') ||
        lower.includes('risk') ||
        lower.includes('shortage')
      ) {
        responseBlock = MOCK_RESPONSES.stockoutRisk;
      } else if (
        lower.includes('working capital') ||
        lower.includes('capital') ||
        lower.includes('cash')
      ) {
        responseBlock = MOCK_RESPONSES.workingCapital;
      } else if (
        lower.includes('board') ||
        lower.includes('actions i should take') ||
        lower.includes('quarter')
      ) {
        responseBlock = MOCK_RESPONSES.boardSummary;
      } else if (
        lower.includes('outlook') ||
        lower.includes('forecast') ||
        lower.includes('demand') ||
        lower.includes('hdpe')
      ) {
        responseBlock = MOCK_RESPONSES.demandOutlook;
      }

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        timestamp: 'Just now',
        blocks: responseBlock,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 600);
  };

  const handleResetConversation = () => {
    setMessages(initialMessages);
    setIsThinking(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-hidden select-none">
      {/* 1. Left Navigation Rail (AI Decision Copilot Active) */}
      <DemandIntelligenceSidebar activeTab="copilot" />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <DemandTopbar
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-7 space-y-4">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/solutions" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              to="/solutions/demand-intelligence/executive"
              className="hover:text-slate-800 transition-colors"
            >
              Demand Intelligence
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">AI Decision Copilot</span>
          </nav>

          {/* Page Header */}
          <div className="pb-0.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Decision Copilot
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Ask. Analyze. Decide. Your AI partner for demand and supply decisions.
            </p>
          </div>

          {/* Top 5 Quick Action Prompt Starter Cards */}
          <CopilotQuickActions onSelectAction={handleSendMessage} />

          {/* Three-Column Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch min-h-[620px]">
            {/* Left Column: Suggested Questions (Col Span 3 ~25%) */}
            <div className="lg:col-span-3 flex flex-col">
              <SuggestedQuestionsPanel
                onSelectQuestion={handleSendMessage}
                onResetConversation={handleResetConversation}
              />
            </div>

            {/* Center Column: Conversation Workspace (Col Span 6 ~50%) */}
            <div className="lg:col-span-6 flex flex-col min-h-[540px]">
              <CopilotConversationWorkspace
                messages={messages}
                onSendMessage={handleSendMessage}
                isThinking={isThinking}
                onResetConversation={handleResetConversation}
              />
            </div>

            {/* Right Column: Insights + Actions + Past Conversations (Col Span 3 ~25%) */}
            <div className="lg:col-span-3 flex flex-col">
              <CopilotContextPanel onSelectQuery={handleSendMessage} />
            </div>
          </div>

          {/* Bottom Spacer */}
          <div className="h-2" />
        </main>
      </div>
    </div>
  );
};
