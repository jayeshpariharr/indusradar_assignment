import React from 'react';
import {
  Share2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Database,
  Send,
  MessageCircle,
  LayoutGrid,
  Columns,
  Maximize2,
} from 'lucide-react';
import { TriggerSignal, Company } from '../types';

interface TriggerFeedProps {
  triggers: TriggerSignal[];
  companies: Company[];
  isExpandedView?: boolean;
  onToggleExpandedView?: () => void;
  onSelectCompany: (company: Company) => void;
  onPushToCRM: (trigger: TriggerSignal) => void;
  onShareWhatsApp: (trigger: TriggerSignal) => void;
}

export const TriggerFeed: React.FC<TriggerFeedProps> = ({
  triggers,
  companies,
  isExpandedView = false,
  onToggleExpandedView,
  onSelectCompany,
  onPushToCRM,
  onShareWhatsApp,
}) => {
  const getBadgeStyle = (style: string) => {
    switch (style) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'sky':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-4">
      {/* Feed Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Morning Chai Competitive Feed</h2>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live RoC Feed
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {triggers.length} Active Triggers
          </span>

          {/* Layout Mode Toggle */}
          {onToggleExpandedView && (
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={onToggleExpandedView}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  !isExpandedView
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="3-Column View with Right Rail Tools"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sidebar View</span>
              </button>
              <button
                onClick={onToggleExpandedView}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  isExpandedView
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Full-Width Focus Stream (Utilizes full screen width)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Full Width</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trigger Cards Container: Grid in expanded mode, fluid list in standard full-screen mode */}
      {triggers.length > 0 ? (
        <div className={`grid gap-4 ${isExpandedView ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {triggers.map((trigger) => {
            const company = companies.find((c) => c.id === trigger.companyId);

            return (
              <div
                key={trigger.id}
                className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-slate-300 transition-all duration-200 flex flex-col justify-between gap-3 group"
              >
                <div className="flex flex-col gap-3">
                  {/* Top Row: Company badge, Signal Type, Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {company && (
                        <button
                          onClick={() => onSelectCompany(company)}
                          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm"
                            style={{ backgroundColor: company.brandColor }}
                          >
                            {company.name.slice(0, 2)}
                          </div>
                          <span className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                            {company.name}
                          </span>
                        </button>
                      )}
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">{trigger.companySector}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${getBadgeStyle(
                          trigger.badgeStyle
                        )}`}
                      >
                        {trigger.badgeLabel}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {trigger.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3
                    onClick={() => company && onSelectCompany(company)}
                    className="text-base font-semibold text-slate-900 group-hover:text-blue-900 transition-colors cursor-pointer leading-snug"
                  >
                    {trigger.headline}
                  </h3>

                  {/* "Why this matters for Sales" 2-bullet summary */}
                  <div className="bg-slate-50/80 rounded-lg p-3.5 border border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Why This Matters for Sales:</span>
                    </div>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-600">
                      {trigger.summaryBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-emerald-500 font-bold mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Source & Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs mt-1">
                  
                  {/* Verified Source Ref */}
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-mono text-[11px] text-slate-500 truncate max-w-[200px]">
                      {trigger.sourceDocRef || 'RoC MCA-21 Verified'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Share on WhatsApp */}
                    <button
                      onClick={() => onShareWhatsApp(trigger)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 transition-all shadow-subtle"
                      title="Preview formatted WhatsApp summary"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </button>

                    {/* Push to CRM */}
                    <button
                      onClick={() => onPushToCRM(trigger)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 transition-all shadow-subtle group"
                      title="Sync deal alert directly to Zoho CRM or HubSpot"
                    >
                      <Database className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600" />
                      <span>Push to CRM</span>
                    </button>

                    {/* View Deep-Dive */}
                    {company && (
                      <button
                        onClick={() => onSelectCompany(company)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        <span>Battlecard</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">No triggers in this filter category</h3>
          <p className="text-xs text-slate-500 mt-1">Try selecting "All Signals" to see the full competitive feed.</p>
        </div>
      )}
    </div>
  );
};
