import React, { useState } from 'react';
import {
  X,
  Network,
  Factory,
  Warehouse,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { InventoryNode } from '../../../types/domain/inventoryIntelligence';

interface NetworkDrawerProps {
  nodes: InventoryNode[];
  isOpen: boolean;
  onClose: () => void;
}

export const NetworkDrawer: React.FC<NetworkDrawerProps> = ({
  nodes,
  isOpen,
  onClose,
}) => {
  const [selectedNode, setSelectedNode] = useState<InventoryNode | null>(nodes[0] || null);

  if (!isOpen) return null;

  // Group by primary plant networks
  const networks = [
    {
      name: 'North America Network',
      plant: nodes.find((n) => n.id === 'node-columbus'),
      dc: nodes.find((n) => n.id === 'node-savannah'),
      hub: nodes.find((n) => n.id === 'node-southeast'),
    },
    {
      name: 'Europe Network',
      plant: nodes.find((n) => n.id === 'node-dusseldorf'),
      dc: nodes.find((n) => n.id === 'node-frankfurt'),
      hub: nodes.find((n) => n.id === 'node-dach'),
    },
    {
      name: 'Asia Pacific Network',
      plant: nodes.find((n) => n.id === 'node-jurong'),
      dc: nodes.find((n) => n.id === 'node-singapore'),
      hub: nodes.find((n) => n.id === 'node-apac'),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Multi-Echelon Inventory Network
              </h3>
              <p className="text-xs text-slate-500">
                Plant to Distribution Center to Regional Market synchronization
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Echelon Flow Diagram */}
        <div className="space-y-4">
          {networks.map((net) => (
            <div key={net.name} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {net.name}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                {/* Plant Node */}
                {net.plant && (
                  <div
                    onClick={() => setSelectedNode(net.plant!)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedNode?.id === net.plant.id
                        ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                      <Factory className="w-3.5 h-3.5 text-blue-600" />
                      <span className="truncate">{net.plant.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{net.plant.location}</div>
                    <div className="flex justify-between items-center mt-2 text-xs font-mono">
                      <span className="text-slate-600 font-sans text-[10px]">Stock:</span>
                      <span className="font-bold text-slate-900">{net.plant.inventory}K</span>
                    </div>
                  </div>
                )}

                {/* DC Node */}
                {net.dc && (
                  <div
                    onClick={() => setSelectedNode(net.dc!)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedNode?.id === net.dc.id
                        ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                      <Warehouse className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate">{net.dc.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{net.dc.location}</div>
                    <div className="flex justify-between items-center mt-2 text-xs font-mono">
                      <span className="text-slate-600 font-sans text-[10px]">Stock:</span>
                      <span className="font-bold text-slate-900">{net.dc.inventory}K</span>
                    </div>
                  </div>
                )}

                {/* Regional Hub Node */}
                {net.hub && (
                  <div
                    onClick={() => setSelectedNode(net.hub!)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedNode?.id === net.hub.id
                        ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                      <Globe className="w-3.5 h-3.5 text-purple-600" />
                      <span className="truncate">{net.hub.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{net.hub.location}</div>
                    <div className="flex justify-between items-center mt-2 text-xs font-mono">
                      <span className="text-slate-600 font-sans text-[10px]">Stock:</span>
                      <span className="font-bold text-slate-900">{net.hub.inventory}K</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  {selectedNode.type} Node Details
                </span>
                <div className="text-sm font-bold text-slate-100">{selectedNode.name}</div>
              </div>
              <div className="text-xs text-slate-400">{selectedNode.location}</div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-800/80">
                <div className="text-slate-400 text-[10px]">On-Hand</div>
                <div className="font-mono font-bold text-white mt-0.5">{selectedNode.inventory}K</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80">
                <div className="text-slate-400 text-[10px]">Coverage</div>
                <div className="font-mono font-bold text-white mt-0.5">{selectedNode.daysOfSupply}d</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80">
                <div className="text-slate-400 text-[10px]">Service</div>
                <div className="font-mono font-bold text-emerald-400 mt-0.5">{selectedNode.serviceLevel}%</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80">
                <div className="text-slate-400 text-[10px]">At-Risk SKUs</div>
                <div className="font-mono font-bold text-rose-400 mt-0.5">{selectedNode.atRiskSkus}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <RefreshCw className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>
                <strong>Rebalance Recommendation:</strong> {selectedNode.potentialRebalance}
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Network View
          </button>
        </div>
      </div>
    </div>
  );
};
