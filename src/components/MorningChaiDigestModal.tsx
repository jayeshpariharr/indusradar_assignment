import React, { useState } from 'react';
import { X, Coffee, Sparkles, Send, Copy, Check, ArrowRight, Share2 } from 'lucide-react';
import { mockChaiDigest } from '../data/mockTriggers';

interface MorningChaiDigestModalProps {
  onClose: () => void;
  onCopyDigest: () => void;
}

export const MorningChaiDigestModal: React.FC<MorningChaiDigestModalProps> = ({
  onClose,
  onCopyDigest,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `☕ *IndusRadar Morning Chai Digest* (${mockChaiDigest.date})\n\n${mockChaiDigest.intro}\n\n` +
      mockChaiDigest.highlights.map((h, i) => `${i + 1}. *${h.title}*\n• *Implication:* ${h.implication}\n• *Sales Action:* ${h.action}`).join('\n\n') +
      `\n\n_${mockChaiDigest.quoteOfTheDay}_`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopyDigest();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Banner with Warm Chai Glow */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Coffee className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                  {mockChaiDigest.date}
                </span>
                <span className="px-2 py-0.2 bg-amber-400/20 text-amber-200 rounded text-[10px] font-semibold border border-amber-400/30">
                  Morning Standup Intel
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">
                {mockChaiDigest.headline}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-100">
            {mockChaiDigest.intro}
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-3.5">
            {mockChaiDigest.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-subtle flex flex-col gap-2 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                </div>

                <div className="pl-8 flex flex-col gap-1.5 text-xs">
                  <div className="text-slate-600">
                    <strong className="text-slate-800 font-semibold">Strategic Implication:</strong>{' '}
                    {item.implication}
                  </div>
                  <div className="text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100 flex items-start gap-1.5 font-medium">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold">Sales Action:</strong> {item.action}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote of the Day */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-xs italic text-slate-600 font-medium">
              {mockChaiDigest.quoteOfTheDay}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 font-mono">
            Synced with RoC MCA-21 & GeM Portal
          </span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Morning Standup Brief</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
