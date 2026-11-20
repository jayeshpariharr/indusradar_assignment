import React from 'react';
import { Building2, ShieldCheck, Users, Network, TrendingUp, Sparkles } from 'lucide-react';

export const PlatformMetricsBar: React.FC = () => {
  const metrics = [
    {
      label: 'Verified Indian Entities',
      value: '4,200+',
      icon: Building2,
      subtext: 'MCA & RoC Active',
    },
    {
      label: 'Statutory Data Accuracy',
      value: '99.9%',
      icon: ShieldCheck,
      subtext: 'MCA-21 & GSTN Synced',
    },
    {
      label: 'Crowdsourced Insights',
      value: '140K+',
      icon: Users,
      subtext: 'Give-to-Get Verified',
    },
    {
      label: 'Competitive Graph Links',
      value: '12,500+',
      icon: Network,
      subtext: 'Direct & Indirect Rivals',
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-900 font-bold">India Enterprise Graph</span>
          <span className="text-slate-300">•</span>
          <span className="hidden md:inline text-slate-500">Live competitive intelligence benchmarked against RoC filings</span>
        </div>

        <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-slate-900 font-mono text-xs">{m.value}</span>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">{m.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
