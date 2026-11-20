import React from 'react';
import { ShieldCheck, FileText, ArrowUpRight, Clock, Building2 } from 'lucide-react';
import { Company } from '../types';

interface StatutoryRoCTickerProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
}

export const StatutoryRoCTicker: React.FC<StatutoryRoCTickerProps> = ({
  companies,
  onSelectCompany,
}) => {
  const filings = [
    {
      id: 'filing-1',
      companyId: 'razorpay',
      companyName: 'Razorpay Software',
      form: 'Form MGT-7',
      type: 'Annual RoC Return',
      time: '12m ago',
      roc: 'RoC Bangalore',
      srn: 'SRN-F9281920',
      tag: 'Forex Volume +38%',
      status: 'Approved',
    },
    {
      id: 'filing-2',
      companyId: 'zepto',
      companyName: 'Zepto (Kiranakart)',
      form: 'Form PAS-3',
      type: 'Share Allotment Return',
      time: '34m ago',
      roc: 'RoC Mumbai',
      srn: 'SRN-P8192831',
      tag: 'Series G Allotment',
      status: 'Approved',
    },
    {
      id: 'filing-3',
      companyId: 'pinelabs',
      companyName: 'Pine Labs India',
      form: 'Form CHG-1',
      type: 'Creation of Charge',
      time: '1h ago',
      roc: 'RoC Delhi',
      srn: 'SRN-C7192801',
      tag: '₹800 Cr Kotak Line',
      status: 'Registered',
    },
    {
      id: 'filing-4',
      companyId: 'darwinbox',
      companyName: 'Darwinbox Digital',
      form: 'Form DIR-12',
      type: 'Director Appointment',
      time: '2h ago',
      roc: 'RoC Hyderabad',
      srn: 'SRN-D5192842',
      tag: 'DIN Verified',
      status: 'Approved',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-subtle flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live RoC Filing Stream</span>
          </h4>
        </div>
        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
          MCA-21 v3 Live
        </span>
      </div>

      {/* Filings List */}
      <div className="flex flex-col gap-2">
        {filings.map((f) => {
          const comp = companies.find((c) => c.id === f.companyId);

          return (
            <div
              key={f.id}
              onClick={() => comp && onSelectCompany(comp)}
              className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate max-w-[170px]">
                  {f.companyName}
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {f.time}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                    {f.form}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">{f.roc}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                  {f.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span>Ministry of Corporate Affairs</span>
        <span>Auto-sync: 60s</span>
      </div>
    </div>
  );
};
