import React, { useState } from 'react';
import { X, Gift, Sparkles, CheckCircle2, Award, ShieldAlert, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreditUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockCredits: (creditsToAdd: number) => void;
}

export const CreditUnlockModal: React.FC<CreditUnlockModalProps> = ({
  isOpen,
  onClose,
  onUnlockCredits,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isOpen) return null;

  const question = "Crowdsource Verification: Confirm which CRM Razorpay's mid-market merchant acquisition team actively uses:";
  const options = [
    'Salesforce Enterprise Cloud',
    'Zoho CRM Ultimate (India Edition)',
    'HubSpot Sales Hub Professional',
    'LeadSquared India Banking Suite',
  ];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    setIsUnlocked(true);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Confetti fallback
    }

    setTimeout(() => {
      onUnlockCredits(5);
      onClose();
      setIsUnlocked(false);
      setSelectedOption(null);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Give-to-Get: Unlock Free Deep-Dives</h3>
              <p className="text-[11px] text-slate-400">Zero Paywall • Verified Community Exchange</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">You've unlocked maximum free deep-dives!</span>
              <p className="mt-0.5 text-amber-800 text-[11px] leading-relaxed">
                IndusRadar is built on a "Give-to-Get" model. Answer 1 quick statutory or tech-stack verification question to immediately unlock <strong>+5 Full Company Deep-Dive Views</strong>.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2 leading-relaxed">
              {question}
            </h4>

            <div className="flex flex-col gap-2">
              {options.map((opt, i) => {
                const isSelected = selectedOption === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={isUnlocked}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {isUnlocked && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800 animate-bounce">
              🎉 Verification logged! +5 Deep-Dives Credited to your session.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <span>100% Anonymous Crowdsourced Data</span>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 font-semibold"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
