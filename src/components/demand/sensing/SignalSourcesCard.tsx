import React from 'react';
import {
  ShoppingCart,
  Monitor,
  Truck,
  Box,
  Tag,
  Megaphone,
  Globe,
  Coins,
  CloudRain,
  MessageSquare,
} from 'lucide-react';
import { SignalSource } from '../../../types/domain/demandSensing';

interface SignalSourcesCardProps {
  sources: SignalSource[];
  selectedSourceId?: string;
  onSelectSource: (source: SignalSource) => void;
}

export const SignalSourcesCard: React.FC<SignalSourcesCardProps> = ({
  sources,
  selectedSourceId,
  onSelectSource,
}) => {
  const getSourceIcon = (type: SignalSource['iconType']) => {
    switch (type) {
      case 'cart':
        return ShoppingCart;
      case 'pos':
        return Monitor;
      case 'truck':
        return Truck;
      case 'inventory':
        return Box;
      case 'tag':
        return Tag;
      case 'promotion':
        return Megaphone;
      case 'macro':
        return Globe;
      case 'coins':
        return Coins;
      case 'weather':
        return CloudRain;
      case 'social':
      default:
        return MessageSquare;
    }
  };

  const activeCount = sources.filter((s) => s.status === 'Active').length;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Signal Sources
        </h3>
        <span className="text-xs font-semibold text-[#0062d2]">
          {activeCount} of {sources.length} active
        </span>
      </div>

      {/* Sources List */}
      <div className="flex-1 divide-y divide-slate-100 mt-1 flex flex-col justify-between">
        {sources.map((src) => {
          const Icon = getSourceIcon(src.iconType);
          const isSelected = selectedSourceId === src.id;
          const isActive = src.status === 'Active';

          return (
            <div
              key={src.id}
              onClick={() => onSelectSource(src)}
              className={`py-1.5 px-2 flex items-center justify-between gap-2 rounded-lg cursor-pointer transition-all group ${
                isSelected
                  ? 'bg-sky-50/90 ring-1 ring-sky-300'
                  : 'hover:bg-slate-50'
              }`}
            >
              {/* Icon & Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className="w-3.5 h-3.5 text-[#0062d2] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0062d2] transition-colors truncate">
                  {src.name}
                </span>
              </div>

              {/* Status & Freshness */}
              <div className="flex items-center gap-3 flex-shrink-0 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  <span className={`font-medium ${isActive ? 'text-slate-700' : 'text-slate-400'}`}>
                    {src.status}
                  </span>
                </div>
                <span className="text-slate-400 font-mono w-16 text-right">
                  {src.freshness}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
