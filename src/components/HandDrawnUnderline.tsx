import React from 'react';

interface HandDrawnUnderlineProps {
  color?: string;
  className?: string;
}

export const HandDrawnUnderline: React.FC<HandDrawnUnderlineProps> = ({
  color = '#FF5B23',
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 200 16"
      fill="none"
      className={`w-full h-3 overflow-visible pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M 2,11 C 45,7 110,6 198,10"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 20,13 C 65,11 140,11 185,13"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
