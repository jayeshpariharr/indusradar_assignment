import React, { useState } from 'react';
import {
  X,
  Swords,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { Company } from '../types';

interface SalesBattlecardModalProps {
  company: Company;
  onClose: () => void;
}

export const SalesBattlecardModal: React.FC<SalesBattlecardModalProps> = ({
  company,
  onClose,
}) => {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const battle = company.battlecard;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(battle.winningPitchAngle);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none">
        
        {/* Top Action Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                1-Click Executive Sales Battlecard
              </h2>
              <p className="text-[11px] text-slate-400">
                Prepared by IndusRadar AI Competitive Engine • Updated Daily
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              title="Print Battlecard or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Battlecard Content */}
        <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-6 print:p-8">
          
          {/* Matchup Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <span>Head-to-Head Positioning Matrix</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-3">
                <span>{company.name}</span>
                <span className="text-sm font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">
                  VS
                </span>
                <span className="text-slate-600">{battle.primaryRival}</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Primary Rival Profile: <strong className="text-slate-700">{battle.rivalType}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Statutory Verified Win-Rate</span>
              </span>
            </div>
          </div>

          {/* Winning Pitch Angle Banner */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50/50 to-slate-50 p-5 rounded-xl border border-amber-200/90 shadow-subtle flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>The Winning Pitch Angle (C-Level Hook)</span>
              </div>
              <button
                onClick={handleCopyPitch}
                className="print:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-950 px-2 py-0.5 rounded bg-white/80 border border-amber-200"
              >
                {copiedPitch ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Pitch</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
              "{battle.winningPitchAngle}"
            </p>
          </div>

          {/* Strengths vs Exploitable Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Our Core Strengths */}
            <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Our Core Strengths & Advantages</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-700">
                {battle.ourStrengths.map((st, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rival's Exploitable Weaknesses */}
            <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-200 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Rival's Exploitable Weaknesses</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-700">
                {battle.rivalWeaknesses.map((wk, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      !
                    </span>
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Objection Handling Playbook */}
          <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Real-Time Objection Handling Scripts</span>
            </div>

            <div className="flex flex-col gap-3">
              {battle.objectionHandling.map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-subtle flex flex-col gap-2">
                  <div className="flex items-start gap-2 text-xs font-semibold text-rose-900">
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-rose-50 border border-rose-200 text-rose-700">
                      When Prospect Says
                    </span>
                    <span className="italic">"{item.objection}"</span>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-700 pl-2 border-l-2 border-emerald-500">
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex-shrink-0">
                      Winning Counter
                    </span>
                    <span className="leading-relaxed font-medium text-slate-800">{item.counter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Landmines & Procurement Traps */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-slate-700 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Key Landmines & Pitfalls to Avoid in the RFP</span>
            </div>
            <ul className="flex flex-col gap-1.5 pl-2">
              {battle.keyLandmines.map((lm, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-slate-700">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{lm}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
