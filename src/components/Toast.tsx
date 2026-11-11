import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all animate-bounce">
      <div className="px-5 py-3 bg-[#141414] text-[#F3EEE3] border-2 border-[#F3EEE3] rounded-xl shadow-[4px_4px_0px_#FF5B23] flex items-center gap-2">
        <span className="font-mono-plex text-sm font-bold text-[#FFD45C]">✓</span>
        <span className="text-[16px] font-bold tracking-tight">{message}</span>
      </div>
    </div>
  );
};
