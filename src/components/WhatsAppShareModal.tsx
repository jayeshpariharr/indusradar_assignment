import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, MessageCircle, Send } from 'lucide-react';
import { TriggerSignal } from '../types';

interface WhatsAppShareModalProps {
  trigger: TriggerSignal;
  onClose: () => void;
  onCopySuccess: () => void;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  trigger,
  onClose,
  onCopySuccess,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trigger.whatsappSnippet);
    setCopied(true);
    onCopySuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedText = encodeURIComponent(trigger.whatsappSnippet);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#075E54] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Share Trigger via WhatsApp</h3>
              <p className="text-[11px] text-white/80">Formatted for instant B2B sales group dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Preview Surface */}
        <div className="p-6 bg-[#ECE5DD] flex flex-col gap-4">
          <div className="text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white/70 text-slate-600 shadow-sm uppercase tracking-wider">
              Preview Message
            </span>
          </div>

          {/* WhatsApp Chat Bubble */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 self-start max-w-md relative text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line">
            {trigger.whatsappSnippet}
            
            <div className="text-right mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-end gap-1">
              <span>{trigger.timestamp}</span>
              <span className="text-[#34B7F1] font-bold">✓✓</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-2 shadow-subtle"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Formatted Text</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Open in WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
