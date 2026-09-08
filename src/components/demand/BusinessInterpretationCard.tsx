import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, ArrowRight } from 'lucide-react';
import { BUSINESS_INTERPRETATION } from '../../data/demandSignalsMock';

export const BusinessInterpretationCard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateForecast = () => {
    navigate(BUSINESS_INTERPRETATION.ctaRoute);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 select-none">
      {/* Left Icon + Text Content */}
      <div className="flex items-center gap-4 flex-1">
        {/* Blue Circular Icon Badge */}
        <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-[#0062d2] shadow-xs">
          <LineChart className="w-5 h-5" />
        </div>

        {/* Narrative Copy */}
        <div className="space-y-0.5">
          <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            {BUSINESS_INTERPRETATION.title}
          </h4>
          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-4xl font-normal">
            {BUSINESS_INTERPRETATION.description}
          </p>
        </div>
      </div>

      {/* Right Action Button */}
      <div className="flex-shrink-0 self-end md:self-center">
        <button
          type="button"
          onClick={handleNavigateForecast}
          className="inline-flex items-center gap-2 bg-[#0062d2] hover:bg-[#0051b3] active:bg-[#004294] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-sm shadow-blue-900/10 transition-all cursor-pointer"
        >
          <span>View Forecast</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
