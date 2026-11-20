import React from 'react';

export type LogoVariant = 'radar-graph' | 'compass-prism' | 'shield-signal';

interface PrimeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: LogoVariant;
  onClick?: () => void;
}

export const PrimeLogo: React.FC<PrimeLogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'radar-graph',
  onClick,
}) => {
  const dim =
    size === 'sm'
      ? 'w-8 h-8'
      : size === 'lg'
      ? 'w-11 h-11'
      : size === 'xl'
      ? 'w-14 h-14'
      : 'w-10 h-10';

  const textClass =
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
      ? 'text-2xl'
      : size === 'xl'
      ? 'text-3xl'
      : 'text-xl';

  const subTextClass =
    size === 'sm'
      ? 'text-[10px]'
      : size === 'lg'
      ? 'text-xs'
      : size === 'xl'
      ? 'text-sm'
      : 'text-[11px]';

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''}`}
      title={onClick ? 'IndusRadar B2B Intelligence' : undefined}
    >
      {/* High-Contrast, Bold, Recognizable Logo Icon */}
      <div
        className={`relative ${dim} rounded-xl bg-gradient-to-tr from-slate-900 via-blue-950 to-blue-900 flex items-center justify-center shadow-md ring-1 ring-blue-500/20 p-2 flex-shrink-0 overflow-hidden transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg`}
      >
        {/* Crisp, Bold Vector Emblem */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          {/* Outer high-contrast radar sweep arc */}
          <path
            d="M8 20 A12 12 0 1 1 32 20"
            stroke="#60A5FA"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Inner radar arc */}
          <path
            d="M13 20 A7 7 0 1 1 27 20"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Connected Network Nodes (Competitors / Market Graph) */}
          <line x1="8" y1="20" x2="20" y2="20" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="32" y1="20" x2="20" y2="20" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="20" y1="8" x2="20" y2="32" stroke="#60A5FA" strokeWidth="1.5" />

          {/* Node Points */}
          <circle cx="8" cy="20" r="2.2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="32" cy="20" r="2.2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />

          {/* Forward Trajectory Arrow (Saffron - Deal Velocity & Growth) */}
          <polygon
            points="20,4 24,12 20,10 16,12"
            fill="#F59E0B"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />

          {/* Central Verified Statutory Core (MCA RoC Emerald Pulse) */}
          <circle cx="20" cy="20" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="6" stroke="#10B981" strokeWidth="1" className="animate-ping opacity-60 origin-center" />
        </svg>

        {/* Gloss highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-xl" />
      </div>

      {/* Clean Brand Wordmark (No "PRIME MARK" badges) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`${textClass} font-black tracking-tight text-slate-900 leading-none`}>
              Indus<span className="text-blue-600">Radar</span>
            </span>
          </div>
          <span className={`${subTextClass} font-medium text-slate-500 leading-none flex items-center gap-1.5 mt-1`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>B2B Market Intelligence & Sales Triggers</span>
          </span>
        </div>
      )}
    </div>
  );
};
