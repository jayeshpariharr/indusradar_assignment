import React from 'react';
import {
  Bookmark,
  Building,
  Filter,
  CheckCircle2,
  Plus,
  Trash2,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Company, SignalType } from '../types';

interface SidebarWatchlistProps {
  companies: Company[];
  selectedFilter: SignalType;
  onSelectFilter: (filter: SignalType) => void;
  onSelectCompany: (company: Company) => void;
  onToggleFollow: (companyId: string) => void;
  signalCounts: Record<SignalType, number>;
}

export const SidebarWatchlist: React.FC<SidebarWatchlistProps> = ({
  companies,
  selectedFilter,
  onSelectFilter,
  onSelectCompany,
  onToggleFollow,
  signalCounts,
}) => {
  const followedCompanies = companies.filter((c) => c.isFollowing);
  const otherCompanies = companies.filter((c) => !c.isFollowing);

  const filterOptions: { id: SignalType; label: string; icon: any }[] = [
    { id: 'all', label: 'All Signals', icon: Layers },
    { id: 'funding', label: 'Funding & M&A', icon: TrendingUp },
    { id: 'leadership', label: 'Leadership Moves', icon: Activity },
    { id: 'mca', label: 'MCA / Regulatory', icon: CheckCircle2 },
    { id: 'tender', label: 'Tender Wins', icon: Sparkles },
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-6">
      
      {/* Feed Filters */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3 px-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Signal Filters</span>
        </div>
        <nav className="flex flex-col gap-1">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedFilter === opt.id;
            const count = signalCounts[opt.id] || 0;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectFilter(opt.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span>{opt.label}</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* My Watchlist */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-subtle">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5 text-slate-400" />
            <span>My Watchlist ({followedCompanies.length})</span>
          </div>
        </div>

        {followedCompanies.length > 0 ? (
          <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto pr-1">
            {followedCompanies.map((company) => (
              <div
                key={company.id}
                className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                onClick={() => onSelectCompany(company)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ backgroundColor: company.brandColor }}
                  >
                    {company.name.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">₹{company.estimatedArrCr} Cr ARR</p>
                  </div>
                </div>
                <button
                  type="button"
                  title="Remove from Watchlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFollow(company.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 px-2 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <p className="text-xs text-slate-500">No companies followed yet.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Click + below to track key competitors</p>
          </div>
        )}

        {/* Quick Add from Catalog */}
        {otherCompanies.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="text-[11px] font-medium text-slate-400 block mb-2 px-1">
              Suggested to Follow:
            </span>
            <div className="flex flex-col gap-1">
              {otherCompanies.slice(0, 3).map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => onToggleFollow(comp.id)}
                  className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-50 text-left text-xs text-slate-700 transition-colors group"
                >
                  <span className="truncate max-w-[140px] text-[11px] font-medium">{comp.name}</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-blue-600 font-semibold opacity-80 group-hover:opacity-100">
                    <Plus className="w-3 h-3" /> Follow
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Statutory Reliability Indicator */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-200/60 text-xs">
        <div className="flex items-center gap-2 text-emerald-800 font-semibold mb-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Statutory Data Integrity</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Directly synced with RoC Bangalore, Mumbai & Chennai, MCA-21 v3 Portal and GSTN Master Repository.
        </p>
        <div className="mt-2 pt-2 border-t border-emerald-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>MCA Gateway: Connected</span>
          <span className="text-emerald-700 font-semibold">99.9% Verified</span>
        </div>
      </div>

    </aside>
  );
};
