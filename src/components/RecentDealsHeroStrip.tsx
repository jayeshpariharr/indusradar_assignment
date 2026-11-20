import React from 'react';
import { TrendingUp, Landmark, ArrowUpRight, Zap, Building } from 'lucide-react';
import { Company } from '../types';

interface RecentDealsHeroStripProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
}

export const RecentDealsHeroStrip: React.FC<RecentDealsHeroStripProps> = ({
  companies,
  onSelectCompany,
}) => {
  const fundedDeals = [
    {
      companyId: 'zepto',
      name: 'Zepto',
      badge: '$450M Pre-IPO',
      valuation: '$5.0B Val',
      investor: 'DST Global & StepStone',
    },
    {
      companyId: 'pinelabs',
      name: 'Pine Labs',
      badge: '₹800 Cr Facility',
      valuation: '$5.0B Val',
      investor: 'Kotak Mahindra Bank',
    },
    {
      companyId: 'darwinbox',
      name: 'Darwinbox',
      badge: '$140M Series D',
      valuation: '$1.0B Unicorn',
      investor: 'TCV & Salesforce Ventures',
    },
  ];

  const acquisitionsAndWins = [
    {
      companyId: 'shiprocket',
      name: 'Shiprocket',
      badge: 'M&A Merger',
      detail: 'Amalgamation with Omuni (Arvind Fashions SaaS)',
    },
    {
      companyId: 'darwinbox',
      name: 'Darwinbox',
      badge: 'Tender Win',
      detail: '35,000-seat HCM contract for Adani Enterprises',
    },
    {
      companyId: 'browserstack',
      name: 'BrowserStack',
      badge: 'PSU Mandate',
      detail: 'State Bank of India (SBI) digital banking testing',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
      {/* Card 1: Recently Funded Indian Companies (Owler Hero Style) */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-subtle flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recently Funded Indian Tech
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Q3 FY26 Live</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {fundedDeals.map((deal) => {
            const comp = companies.find((c) => c.id === deal.companyId);
            return (
              <button
                key={deal.companyId}
                onClick={() => comp && onSelectCompany(comp)}
                className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all text-left flex flex-col gap-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {deal.name}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded w-fit font-mono">
                  {deal.badge}
                </span>
                <span className="text-[10px] text-slate-400 truncate">{deal.valuation}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card 2: Recent M&A & Major Enterprise Wins (Owler Hero Style) */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-subtle flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center text-xs">
              <Landmark className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recent M&A & Major Contracts
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Verified RoC & GeM</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {acquisitionsAndWins.map((deal, idx) => {
            const comp = companies.find((c) => c.id === deal.companyId);
            return (
              <button
                key={idx}
                onClick={() => comp && onSelectCompany(comp)}
                className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all text-left flex flex-col gap-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {deal.name}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
                <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded w-fit">
                  {deal.badge}
                </span>
                <span className="text-[10px] text-slate-500 truncate" title={deal.detail}>
                  {deal.detail}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
