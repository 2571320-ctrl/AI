import React, { useEffect, useState } from 'react';

interface HandDrawnCircleProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const HandDrawnCircle: React.FC<HandDrawnCircleProps> = ({
  children,
  color = '#FF5B23',
  className = '',
}) => {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDrawn(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={`relative inline-block px-1 z-10 ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -inset-x-2.5 -inset-y-1.5 w-[calc(100%+20px)] h-[calc(100%+14px)] pointer-events-none z-0 overflow-visible"
        viewBox="0 0 120 60"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 12,32 C 10,14 35,6 68,7 C 102,8 114,20 112,36 C 110,50 82,56 46,54 C 18,52 6,42 8,26 C 9,18 24,11 48,10"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 380,
            strokeDashoffset: drawn ? 0 : 380,
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>
    </span>
  );
};
