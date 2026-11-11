import React, { useState, useEffect } from 'react';
import { COURSE_DATA } from '../data/course.ts';
import { Sparkles, FileText, Phone, MessageCircle, ArrowUp } from 'lucide-react';

interface FloatingQuickMenuProps {
  onStartTest: () => void;
  onApply: () => void;
}

export const FloatingQuickMenu: React.FC<FloatingQuickMenuProps> = ({
  onStartTest,
  onApply,
}) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 pointer-events-auto"
      aria-label="빠른 서비스 메뉴"
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl quick-menu-shadow p-2 flex flex-col gap-1 w-[82px] text-center">
        {/* Top Tag */}
        <div className="bg-[#1E40AF] text-white text-[11px] font-bold py-1 px-1 rounded-lg mb-1 tracking-tight">
          QUICK
        </div>

        {/* 1. 유형 테스트 */}
        <button
          onClick={onStartTest}
          className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-orange-50 text-slate-700 hover:text-[#FF5B23] transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5B23] group-hover:scale-110 transition-transform mb-1">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold leading-tight">
            유형 진단
          </span>
        </button>

        <div className="h-px bg-slate-100 mx-1"></div>

        {/* 2. 수강 신청 */}
        <button
          onClick={onApply}
          className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-blue-50 text-slate-700 hover:text-[#1E40AF] transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-[#1E40AF] group-hover:scale-110 transition-transform mb-1">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold leading-tight">
            수강 신청
          </span>
        </button>

        <div className="h-px bg-slate-100 mx-1"></div>

        {/* 3. 전화 상담 */}
        <a
          href={`tel:${COURSE_DATA.contact.phone}`}
          className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 transition-colors group no-underline"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform mb-1">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold leading-tight">
            전화 상담
          </span>
        </a>

        <div className="h-px bg-slate-100 mx-1"></div>

        {/* 4. 카카오 상담 */}
        <a
          href={COURSE_DATA.contact.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-600 transition-colors group no-underline"
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform mb-1">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold leading-tight">
            카톡 상담
          </span>
        </a>
      </div>

      {/* 5. Scroll to Top button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="w-[82px] py-2 bg-slate-900 text-white rounded-xl shadow-md hover:bg-[#1E40AF] transition-all flex flex-col items-center justify-center text-[11px] font-bold cursor-pointer"
          aria-label="화면 상단으로 이동"
        >
          <ArrowUp className="w-3.5 h-3.5 mb-0.5" />
          <span>TOP</span>
        </button>
      )}
    </aside>
  );
};
