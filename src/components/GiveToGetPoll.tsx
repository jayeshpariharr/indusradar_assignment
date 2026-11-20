import React, { useState } from 'react';
import { Gift, CheckCircle2, Sparkles, Award, ArrowRight } from 'lucide-react';
import { GiveToGetPoll } from '../types';
import confetti from 'canvas-confetti';

interface GiveToGetPollWidgetProps {
  poll: GiveToGetPoll;
  onVoteComplete: (creditsEarned: number) => void;
}

export const GiveToGetPollWidget: React.FC<GiveToGetPollWidgetProps> = ({
  poll,
  onVoteComplete,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Simulated crowdsourced community percentages after vote
  const mockVotePercentages = [18, 54, 21, 7];

  const handleVote = (index: number) => {
    if (hasVoted) return;
    setSelectedOption(index);
    setHasVoted(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {
      // Confetti fallback
    }

    onVoteComplete(poll.rewardCredits);
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-subtle flex flex-col gap-3">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Gift className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 leading-none">
              Give-to-Get Verification
            </h4>
            <span className="text-[10px] text-slate-500">Crowdsourced B2B Poll</span>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          +{poll.rewardCredits} Credits Reward
        </span>
      </div>

      {/* Question */}
      <div>
        <p className="text-xs font-bold text-slate-800 leading-snug">
          {poll.question}
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Answer anonymously to unlock +{poll.rewardCredits} free full profile deep-dives.
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-1.5 mt-0.5">
        {poll.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const percentage = mockVotePercentages[idx] || 25;

          return (
            <button
              key={idx}
              disabled={hasVoted}
              onClick={() => handleVote(idx)}
              className={`relative overflow-hidden text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold'
                  : hasVoted
                  ? 'border-slate-200 bg-slate-50 text-slate-700'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
              }`}
            >
              {/* Animated percentage background when voted */}
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                    isSelected ? 'bg-blue-200/50' : 'bg-slate-200/40'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 text-[10px] ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </span>
                  <span>{option}</span>
                </span>
                {hasVoted && (
                  <span className="text-[11px] font-mono text-slate-600 font-bold">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Reward Status Banner */}
      {hasVoted ? (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800 animate-fade-in">
          <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">Insight recorded! +{poll.rewardCredits} profile credits added.</span>
        </div>
      ) : (
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <span>1-click instant credit</span>
          <span>142 verified responses</span>
        </div>
      )}
    </div>
  );
};
