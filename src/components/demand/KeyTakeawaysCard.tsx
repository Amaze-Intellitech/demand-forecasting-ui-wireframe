import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { KEY_TAKEAWAYS } from '../../data/demandForecastMock';

export const KeyTakeawaysCard: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreScenarios = () => {
    navigate('/solutions/demand-intelligence/scenarios');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <FileText className="w-4 h-4 text-[#0062d2]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Key Takeaways
          </h3>
        </div>

        {/* Numbered Takeaways List */}
        <div className="py-3.5 space-y-3">
          {KEY_TAKEAWAYS.map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {/* Number Circle Badge */}
              <div className="w-5.5 h-5.5 rounded-full bg-sky-100 text-[#0062d2] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </div>

              {/* Text */}
              <p className="text-xs sm:text-[12.5px] text-slate-700 leading-snug font-medium">
                {takeaway}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleExploreScenarios}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#0062d2] hover:bg-[#0051b3] active:bg-[#004294] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-sm shadow-blue-900/10 transition-all cursor-pointer"
        >
          <span>Explore Scenarios</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
