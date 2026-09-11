import React, { useState } from 'react';
import { MessageSquare, RotateCcw } from 'lucide-react';
import {
  QuestionCategory,
  SUGGESTED_QUESTIONS,
} from '../../../data/demandCopilotMock';

interface SuggestedQuestionsPanelProps {
  onSelectQuestion: (question: string) => void;
  onResetConversation?: () => void;
}

export const SuggestedQuestionsPanel: React.FC<SuggestedQuestionsPanelProps> = ({
  onSelectQuestion,
  onResetConversation,
}) => {
  const [activeTab, setActiveTab] = useState<QuestionCategory>('All');

  const categories: QuestionCategory[] = ['All', 'Demand', 'Sourcing', 'Risk', 'Planning'];

  const filteredQuestions =
    activeTab === 'All'
      ? SUGGESTED_QUESTIONS
      : SUGGESTED_QUESTIONS.filter((q) => q.category === activeTab);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full select-none">
      <div>
        {/* Header with Title & Reset Icon */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Suggested Questions
          </h3>
          <button
            type="button"
            title="Reset conversation"
            onClick={onResetConversation}
            className="p-1 rounded-lg text-primary hover:bg-info-bg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 text-xs font-semibold pt-2 pb-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`pb-1.5 px-1.5 transition-colors whitespace-nowrap cursor-pointer relative ${
                activeTab === cat
                  ? 'text-[#0062d2] font-bold border-b-2 border-[#0062d2]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-2.5 pt-3">
          {filteredQuestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectQuestion(item.question)}
              className="w-full text-left p-3 rounded-xl border border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-start gap-2.5 group cursor-pointer shadow-2xs"
            >
              <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:text-[#0062d2] transition-colors" />
              <span className="text-xs text-slate-700 group-hover:text-slate-900 font-medium leading-snug">
                {item.question}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 mt-3 flex items-center justify-between">
        <span>Curated Enterprise Prompts</span>
        <span className="text-primary font-medium">{filteredQuestions.length} Available</span>
      </div>
    </div>
  );
};
