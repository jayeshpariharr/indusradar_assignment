import React from 'react';
import { Swords, ChevronRight, Award } from 'lucide-react';
import { Company } from '../types';

interface QuickBattlecardPillsProps {
  companies: Company[];
  onOpenBattlecard: (company: Company) => void;
}

export const QuickBattlecardPills: React.FC<QuickBattlecardPillsProps> = ({
  companies,
  onOpenBattlecard,
}) => {
  const topMatchups = [
    { companyId: 'razorpay', vs: 'Cashfree Payments', label: 'Payment Gateway Duopoly' },
    { companyId: 'darwinbox', vs: 'Workday & SAP', label: 'Enterprise HCM Displacement' },
    { companyId: 'zoho', vs: 'Salesforce & Freshworks', label: 'CRM & Cloud Suite TCO' },
    { companyId: 'zepto', vs: 'Blinkit & Instamart', label: 'Quick Commerce Duopoly' },
    { companyId: 'browserstack', vs: 'Sauce Labs', label: 'Cloud Device Testing' },
  ];

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-subtle flex flex-col gap-3">
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Swords className="w-3.5 h-3.5 text-amber-500" />
          <span>Top Sales Battlecards</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">1-Click Launch</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {topMatchups.map((m, idx) => {
          const comp = companies.find((c) => c.id === m.companyId);
          if (!comp) return null;

          return (
            <button
              key={idx}
              onClick={() => onOpenBattlecard(comp)}
              className="w-full text-left p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-between group"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  <span className="truncate">{comp.name.split(' ')[0]}</span>
                  <span className="text-[10px] font-mono text-slate-400">vs</span>
                  <span className="text-slate-600 truncate">{m.vs.split(' ')[0]}</span>
                </div>
                <span className="text-[10px] text-slate-400 block truncate">{m.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
