import React from 'react';
import { X, Check, ShieldCheck, Zap, Sparkles, Network, Radio, Compass, ArrowRight } from 'lucide-react';
import { PrimeLogo, LogoVariant } from './PrimeLogo';

interface LogoPhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeVariant: LogoVariant;
  onSelectVariant: (variant: LogoVariant) => void;
}

export const LogoPhilosophyModal: React.FC<LogoPhilosophyModalProps> = ({
  isOpen,
  onClose,
  activeVariant,
  onSelectVariant,
}) => {
  if (!isOpen) return null;

  const concepts = [
    {
      id: 'radar-graph' as LogoVariant,
      title: 'The Radar-Graph (Active Flagship)',
      subtitle: 'Market Network Mesh + Early-Warning Trigger Radar + Statutory Core',
      howItRepresentsYourWork: [
        {
          element: 'Concentric Radar Arcs (Electric Blue)',
          meaning: 'Continuous 24/7 market scanning for sales triggers (tender wins, funding announcements, executive shifts).',
          icon: Radio,
          color: 'text-blue-600',
        },
        {
          element: 'Interconnected Graph Nodes',
          meaning: 'Visualizes corporate competitor networks, shared directors, and B2B supply chains.',
          icon: Network,
          color: 'text-indigo-600',
        },
        {
          element: 'Emerald Core Pulse Node',
          meaning: '100% verified Indian statutory data directly synced with MCA-21 & RoC records.',
          icon: ShieldCheck,
          color: 'text-emerald-600',
        },
        {
          element: 'Saffron Forward Arrow',
          meaning: 'Sales velocity, deal qualification, and revenue expansion for enterprise sales teams.',
          icon: Zap,
          color: 'text-amber-500',
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Brand Logo & Work Representation
              </h3>
              <p className="text-xs text-slate-400">
                Visual anatomy: How this mark represents B2B Intelligence & Statutory Signals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          
          {/* Active Logo Hero Card (Clean, high-contrast, without any 'PRIME MARK' badge) */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                <PrimeLogo size="lg" showText={false} variant={activeVariant} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-slate-900">
                    Indus<span className="text-blue-600">Radar</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-md leading-relaxed">
                  Engineered to instantly signal <strong>market surveillance</strong>, <strong>corporate data networks</strong>, and <strong>statutory authenticity</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 text-right">
              <span className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Official Logo Mark
              </span>
            </div>
          </div>

          {/* How It Represents Your Work */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Visual Design Anatomy:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concepts[0].howItRepresentsYourWork.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-subtle text-xs">
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0 mt-0.5">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <strong className="text-slate-900 font-bold block text-xs">
                        {item.element}
                      </strong>
                      <span className="text-slate-600 text-[11px] leading-relaxed block mt-0.5">
                        {item.meaning}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
