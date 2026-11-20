import React from 'react';
import { X, Check, Zap, ShieldCheck, Database, Award, ArrowRight } from 'lucide-react';

interface PlanComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeToPro: () => void;
}

export const PlanComparisonModal: React.FC<PlanComparisonModalProps> = ({
  isOpen,
  onClose,
  onUpgradeToPro,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
                Subscription & Access Tiers
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Community vs. Enterprise Pro Access
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Modeled after Owler's Give-to-Get Community & Pro sales intelligence framework
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50">
          
          {/* Tier 1: Community (Active Free Tier) */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Community Tier
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active
                </span>
              </div>
              <h4 className="text-xl font-black text-slate-900">₹0 / Free Forever</h4>
              <p className="text-xs text-slate-500 mt-1">
                For sales reps, founders & SDRs following up to 5 core target accounts.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>5 Free Company Deep-Dives per session</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Give-to-Get data unlocks (+2 credits per poll)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Morning Chai Daily Trigger Feed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>1-Click WhatsApp B2B sales summaries</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-4 text-center font-bold">✕</span>
                  <span>Automated Zoho / HubSpot 2-way CRM sync</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
            >
              Current Active Tier
            </button>
          </div>

          {/* Tier 2: Pro (Enterprise Sales Teams) */}
          <div className="p-5 rounded-xl bg-white border-2 border-blue-600 shadow-card flex flex-col justify-between gap-4 relative">
            <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
              Recommended for Teams
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                  Enterprise Pro
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Full Power
                </span>
              </div>
              <h4 className="text-xl font-black text-slate-900">₹3,999 / user / mo</h4>
              <p className="text-xs text-slate-500 mt-1">
                For high-velocity outbound teams needing unlimited signals and instant CRM pipeline sync.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-slate-900">Unlimited Company Deep-Dive Profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Real-time MCA-21 RoC Filing alerts (Auto-Sync)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Printable 1-Click Executive Sales Battlecards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Direct Webhook to Zoho CRM, HubSpot & Salesforce</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Priority GeM & PSU Tender Win Notifications</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onUpgradeToPro();
                onClose();
              }}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Upgrade to IndusRadar Pro</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          <span>Enterprise invoices with 18% GST input credit available for Indian registered businesses.</span>
        </div>

      </div>
    </div>
  );
};
