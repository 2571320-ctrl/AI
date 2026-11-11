import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface BottomBarProps {
  onStartTest: () => void;
  onApply: () => void;
  isVisible: boolean;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onStartTest,
  onApply,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 flex justify-center pointer-events-none xl:hidden">
      <div className="w-full max-w-lg px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg pointer-events-auto">
        <div className="flex gap-2.5 items-center">
          <button
            onClick={onStartTest}
            className="sinbi-btn sinbi-btn-outline flex-1 text-[15px] py-3.5 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#FF5B23]" />
            <span>3분 유형 진단</span>
          </button>

          <button
            onClick={onApply}
            className="sinbi-btn sinbi-btn-primary flex-1 text-[15px] py-3.5 flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>수강 신청하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
