import React from 'react';
import { Connector } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import {
  Database,
  FileSpreadsheet,
  Server,
  Cloud,
  Layers,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  TableProperties
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ConnectorCardProps {
  connector: Connector;
  onConnect: (connector: Connector) => void;
  onManage?: (connector: Connector) => void;
}

export const ConnectorCard: React.FC<ConnectorCardProps> = ({
  connector,
  onConnect,
  onManage,
}) => {
  const isConnected = connector.state === 'connected' || connector.state === 'sync_complete';
  const isSyncing = connector.state === 'syncing' || connector.state === 'connecting';

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ERP':
        return <Server className="w-5 h-5 text-sky-400" />;
      case 'Databases':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'Cloud/Data platforms':
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'Files':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'APIs':
      default:
        return <Layers className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border p-5 flex flex-col justify-between transition-all duration-200 bg-slate-900/60 hover:bg-slate-900/90',
        isConnected
          ? 'border-emerald-900/50 bg-slate-900/80 ring-1 ring-emerald-900/30'
          : 'border-slate-800 hover:border-slate-700'
      )}
    >
      <div>
        {/* Top bar: Category + Status */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700/60 flex items-center justify-center">
              {getCategoryIcon(connector.category)}
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
              {connector.category}
            </span>
          </div>
          <StatusBadge status={connector.state} size="sm" />
        </div>

        {/* Title */}
        <h4 className="text-base font-semibold text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
          {connector.name}
          {connector.popular && (
            <span className="text-[10px] bg-sky-950 text-sky-400 border border-sky-800/60 px-1.5 py-0.2 rounded font-sans font-medium">
              Enterprise Ready
            </span>
          )}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
          {connector.description}
        </p>

        {/* Connected state telemetry */}
        {isConnected && connector.lastSync && (
          <div className="mt-4 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs flex items-center justify-between text-emerald-300">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {connector.recordCount ? `${connector.recordCount.toLocaleString()} records ingested` : 'Live connection active'}
            </span>
            <span className="text-[11px] text-emerald-400/80 font-mono">
              Synced {connector.lastSync}
            </span>
          </div>
        )}

        {/* Entity preview */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
          <TableProperties className="w-3 h-3 text-slate-400" />
          <span className="truncate">
            {connector.entities.length} schema entities ({connector.entities[0].split(' ')[0]}...)
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-500 font-mono">
          {connector.mappings.length} mapping targets
        </span>

        {isConnected ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManage ? onManage(connector) : onConnect(connector)}
              className="text-xs border-emerald-800/50 hover:bg-emerald-950/40 text-emerald-200"
              leftIcon={<RefreshCw className="w-3 h-3 text-emerald-400" />}
            >
              Re-Sync & Map
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onConnect(connector)}
            isLoading={isSyncing}
            rightIcon={<ArrowRight className="w-3 h-3" />}
          >
            Connect Source
          </Button>
        )}
      </div>
    </div>
  );
};
