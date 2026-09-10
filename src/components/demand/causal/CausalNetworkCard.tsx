import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import {
  CausalNetworkNode,
  CausalNetworkEdge,
} from '../../../types/domain/causalIntelligence';

interface CausalNetworkCardProps {
  nodes: CausalNetworkNode[];
  edges: CausalNetworkEdge[];
  onSelectNode: (node: CausalNetworkNode) => void;
  selectedNodeId?: string;
}

export const CausalNetworkCard: React.FC<CausalNetworkCardProps> = ({
  nodes,
  edges,
  onSelectNode,
  selectedNodeId,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // SVG Dimensions
  const width = 420;
  const height = 300;

  const getNodeCoordinates = (node: CausalNetworkNode) => {
    return {
      x: (node.x / 100) * width,
      y: (node.y / 100) * height,
    };
  };

  const centerNode = nodes.find((n) => n.id === 'demand') || nodes[0];
  const centerCoords = getNodeCoordinates(centerNode);

  const getEdgeColor = (type: CausalNetworkEdge['impactType']) => {
    switch (type) {
      case 'positive':
        return '#10b981'; // Emerald
      case 'negative':
        return '#f87171'; // Red / Coral
      case 'indirect':
      default:
        return '#38bdf8'; // Sky Blue
    }
  };

  const getNodeColor = (node: CausalNetworkNode) => {
    switch (node.impactType) {
      case 'positive':
        return {
          bg: '#ecfdf5',
          border: '#a7f3d0',
          text: '#065f46',
        };
      case 'negative':
        return {
          bg: '#fff1f2',
          border: '#fecdd3',
          text: '#9f1239',
        };
      case 'indirect':
        return {
          bg: '#f0f9ff',
          border: '#bae6fd',
          text: '#0369a1',
        };
      case 'center':
      default:
        return {
          bg: '#0062d2',
          border: '#004899',
          text: '#ffffff',
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-1.5">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Causal Network Map
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 pb-3 border-b border-slate-100">
          Key relationships between demand drivers
        </p>
      </div>

      {/* SVG Network Canvas */}
      <div className="relative flex-1 min-h-[220px] w-full flex items-center justify-center my-1">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            {/* Arrowhead Markers */}
            <marker
              id="arrow-pos"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
            <marker
              id="arrow-neg"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f87171" />
            </marker>
            <marker
              id="arrow-ind"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Directed Edges */}
          {edges.map((edge) => {
            const src = nodes.find((n) => n.id === edge.source);
            const tgt = nodes.find((n) => n.id === edge.target);
            if (!src || !tgt) return null;

            const p1 = getNodeCoordinates(src);
            const p2 = getNodeCoordinates(tgt);
            const isHighlighted = hoveredNodeId === edge.source || hoveredNodeId === edge.target;
            const edgeColor = getEdgeColor(edge.impactType);

            return (
              <line
                key={edge.id}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={edgeColor}
                strokeWidth={isHighlighted ? 2.5 : 1.5}
                strokeDasharray={edge.impactType === 'indirect' ? '4 3' : undefined}
                markerEnd={
                  edge.impactType === 'positive'
                    ? 'url(#arrow-pos)'
                    : edge.impactType === 'negative'
                    ? 'url(#arrow-neg)'
                    : 'url(#arrow-ind)'
                }
                className="transition-all duration-200"
              />
            );
          })}

          {/* Surrounding Nodes (Capsules) */}
          {nodes
            .filter((n) => n.id !== 'demand')
            .map((node) => {
              const coords = getNodeCoordinates(node);
              const color = getNodeColor(node);
              const isHovered = hoveredNodeId === node.id;
              const isSelected = selectedNodeId === node.id;

              const lines = node.label.split('\n');

              return (
                <g
                  key={node.id}
                  transform={`translate(${coords.x}, ${coords.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => onSelectNode(node)}
                >
                  {/* Capsule Background */}
                  <rect
                    x="-34"
                    y="-15"
                    width="68"
                    height="30"
                    rx="15"
                    fill={color.bg}
                    stroke={isSelected ? '#0062d2' : isHovered ? '#0284c7' : color.border}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                    className="transition-all duration-150 filter drop-shadow-2xs"
                  />

                  {/* Multi-line or single text */}
                  {lines.length === 1 ? (
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="600"
                      fill={color.text}
                      className="select-none pointer-events-none"
                    >
                      {lines[0]}
                    </text>
                  ) : (
                    <>
                      <text
                        x="0"
                        y="-1.5"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill={color.text}
                        className="select-none pointer-events-none"
                      >
                        {lines[0]}
                      </text>
                      <text
                        x="0"
                        y="8.5"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill={color.text}
                        className="select-none pointer-events-none"
                      >
                        {lines[1]}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

          {/* Center Hub Node (Demand) */}
          <g
            transform={`translate(${centerCoords.x}, ${centerCoords.y})`}
            className="cursor-pointer"
            onClick={() => onSelectNode(centerNode)}
          >
            {/* Outer Glow / Halo */}
            <circle r="27" fill="rgba(0, 98, 210, 0.12)" />
            {/* Solid Center Circle */}
            <circle r="22" fill="#0062d2" stroke="#ffffff" strokeWidth="2.5" className="shadow-lg" />
            {/* Center Icon & Label */}
            <foreignObject x="-14" y="-18" width="28" height="36">
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <BarChart2 className="w-4 h-4" />
                <span className="text-[8.5px] font-bold leading-none mt-0.5">Demand</span>
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-center gap-5 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-medium text-slate-700">Positive Impact</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="text-[11px] font-medium text-slate-700">Negative Impact</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-[11px] font-medium text-slate-700">Indirect Impact</span>
        </div>
      </div>
    </div>
  );
};
