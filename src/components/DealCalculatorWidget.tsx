import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, DollarSign, CheckCircle2 } from 'lucide-react';

interface DealCalculatorWidgetProps {
  onPushToCRM: (dealTitle: string, estimatedValue: string) => void;
}

export const DealCalculatorWidget: React.FC<DealCalculatorWidgetProps> = ({ onPushToCRM }) => {
  const [headcount, setHeadcount] = useState<number>(2400);
  const [sector, setSector] = useState<'saas' | 'fintech' | 'logistics' | 'retail'>('saas');

  const getMultiplier = () => {
    switch (sector) {
      case 'fintech':
        return 220;
      case 'saas':
        return 180;
      case 'logistics':
        return 130;
      case 'retail':
        return 110;
    }
  };

  const estimatedAcvLakhs = Math.round((headcount * getMultiplier()) / 10000);
  const estimatedMinCr = (estimatedAcvLakhs * 0.85) / 100;
  const estimatedMaxCr = (estimatedAcvLakhs * 1.25) / 100;

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-subtle flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-blue-600" />
          <span>Enterprise Deal Estimator</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-semibold">
          ACV Sizing
        </span>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed">
        Estimate software deal ARR based on prospect company headcount and Indian vertical benchmark:
      </p>

      {/* Headcount Slider */}
      <div className="flex flex-col gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">Prospect Headcount:</span>
          <span className="font-bold font-mono text-slate-900">{headcount.toLocaleString()} seats</span>
        </div>
        <input
          type="range"
          min="200"
          max="15000"
          step="100"
          value={headcount}
          onChange={(e) => setHeadcount(parseInt(e.target.value, 10))}
          className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>200</span>
          <span>5,000</span>
          <span>15,000+</span>
        </div>
      </div>

      {/* Sector Pills */}
      <div className="grid grid-cols-4 gap-1 text-[10px] font-semibold text-center">
        {(['saas', 'fintech', 'logistics', 'retail'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSector(s)}
            className={`py-1 rounded capitalize transition-all ${
              sector === s
                ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
                : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Calculated Deal Size Output */}
      <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">
            Projected Enterprise ACV
          </span>
          <div className="text-sm font-black text-slate-900 mt-0.5 font-mono">
            ₹{estimatedMinCr.toFixed(2)} Cr – ₹{estimatedMaxCr.toFixed(2)} Cr
          </div>
          <span className="text-[10px] text-slate-500">
            (~₹{estimatedAcvLakhs} Lakhs ARR annual tier)
          </span>
        </div>
        <button
          onClick={() =>
            onPushToCRM(
              `${sector.toUpperCase()} Sizing Quote (${headcount} seats)`,
              `₹${estimatedMinCr.toFixed(2)} - ₹${estimatedMaxCr.toFixed(2)} Cr`
            )
          }
          className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-md transition-colors flex items-center gap-1 shadow-sm flex-shrink-0"
        >
          <Sparkles className="w-3 h-3" />
          <span>Save Quote</span>
        </button>
      </div>
    </div>
  );
};
