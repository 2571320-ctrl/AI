import React from 'react';

interface StampBadgeProps {
  size?: number;
  className?: string;
  color?: string;
}

export const StampBadge: React.FC<StampBadgeProps> = ({
  size = 84,
  className = '',
  color = '#FF5B23',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer rotating SVG with circular text */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full spin-slow"
        style={{ color }}
      >
        <defs>
          <path
            id="stampPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>

        {/* Outer and inner borders */}
        <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2.5 2" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />

        <text
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="9.4"
          fontWeight="700"
          fill="currentColor"
          letterSpacing="2.8"
        >
          <textPath href="#stampPath" startOffset="0%">
            CHEONAN · AI TEACHER · 2026 ·
          </textPath>
        </text>
      </svg>

      {/* Static center "천안" text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ color }}
      >
        <span
          className="font-black text-xs tracking-tight"
          style={{ fontFamily: "'Pretendard Variable', sans-serif" }}
        >
          천안
        </span>
      </div>
    </div>
  );
};
