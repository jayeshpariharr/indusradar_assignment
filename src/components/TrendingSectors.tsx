import React from 'react';
import { TrendingUp, Flame, ArrowUpRight, BarChart3 } from 'lucide-react';
import { SectorTrend } from '../types';

interface TrendingSectorsProps {
  sectors: SectorTrend[];
  onSelectSector?: (sectorName: string) => void;
}

export const TrendingSectors: React.FC<TrendingSectorsProps> = ({ sectors, onSelectSector }) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-subtle flex flex-col gap-3">
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span>Trending Indian Sectors</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Q3 FY26</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {sectors.map((sec, idx) => (
          <div
            key={sec.id}
            onClick={() => onSelectSector && onSelectSector(sec.name)}
            className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center">
                  #{idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {sec.name}
                </span>
              </div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600">
                {sec.growth}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pl-7">
              <span className="truncate max-w-[140px] text-slate-400">
                Hot: <strong className="text-slate-700 font-medium">{sec.hotDeal}</strong>
              </span>
              <span className="font-mono text-slate-400">{sec.dealCount} deals</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
