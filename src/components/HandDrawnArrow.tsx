import React from 'react';

interface HandDrawnArrowProps {
  color?: string;
  className?: string;
}

export const HandDrawnArrow: React.FC<HandDrawnArrowProps> = ({
  color = '#FF5B23',
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      className={`w-12 h-8 overflow-visible pointer-events-none ${className}`}
    >
      <path
        d="M 52,8 C 42,16 28,26 12,24"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 22,16 C 16,21 11,24 8,25 C 13,28 19,32 24,35"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
