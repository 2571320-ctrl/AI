import React, { useRef, useState } from 'react';
import { COMPETENCIES } from '../data/competencies.ts';
import { ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, MessageSquare, Wrench, MapPin, Heart, BookOpen } from 'lucide-react';

interface CompetencyCarouselProps {
  layoutMode?: 'carousel' | 'grid';
}

const ICONS = [
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Wrench,
  MapPin,
  Heart,
  BookOpen,
];

export const CompetencyCarousel: React.FC<CompetencyCarouselProps> = ({
  layoutMode = 'grid',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    const itemWidth = clientWidth * 0.82;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(Math.max(0, index), COMPETENCIES.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const itemWidth = containerRef.current.clientWidth * 0.82;
    containerRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(COMPETENCIES.length - 1, activeIndex + 1));
  };

  if (layoutMode === 'grid') {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {COMPETENCIES.map((comp, idx) => {
            const Icon = ICONS[idx] || CheckCircle2;
            return (
              <div
                key={comp.id}
                className="sinbi-card p-6 bg-white flex flex-col justify-between min-h-[290px] border border-slate-200/90 group"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-plex text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                      소양 0{comp.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#FF5B23] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                    {comp.name}
                  </h3>

                  <p className="text-[16px] font-semibold text-slate-700 leading-snug">
                    {comp.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 bg-slate-50/70 p-3 rounded-xl">
                  <span className="font-mono-plex text-[11px] font-bold text-[#FF5B23] tracking-wide block mb-1">
                    천안 현장 실무 적용
                  </span>
                  <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                    {comp.scene}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Scrollable Container with Snap */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 px-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {COMPETENCIES.map((comp, idx) => {
          const Icon = ICONS[idx] || CheckCircle2;
          return (
            <div
              key={comp.id}
              className="flex-shrink-0 w-[84%] max-w-[320px] snap-center"
            >
              <div className="sinbi-card p-6 bg-white flex flex-col justify-between h-[300px] border border-slate-200">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-plex text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                      소양 0{comp.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                    {comp.name}
                  </h3>

                  <p className="text-[16px] font-semibold text-slate-700 leading-snug">
                    {comp.tagline}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 bg-slate-50/70 p-3 rounded-xl">
                  <span className="font-mono-plex text-[11px] font-bold text-[#FF5B23] tracking-wide block mb-0.5">
                    천안 현장 실무 적용
                  </span>
                  <p className="text-[14px] text-slate-600 leading-snug font-medium">
                    {comp.scene}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots indicator & Next/Prev arrows */}
      <div className="flex items-center justify-between px-4 mt-3">
        <div className="flex gap-1.5 items-center">
          {COMPETENCIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`transition-all duration-200 rounded-full ${
                activeIndex === idx
                  ? 'w-6 h-2 bg-[#1E40AF]'
                  : 'w-2 h-2 bg-slate-300'
              }`}
              aria-label={`슬라이드 ${idx + 1}로 이동`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-lg border border-slate-300 bg-white disabled:opacity-30 flex items-center justify-center hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
            aria-label="이전 카드"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === COMPETENCIES.length - 1}
            className="w-8 h-8 rounded-lg border border-slate-300 bg-white disabled:opacity-30 flex items-center justify-center hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
            aria-label="다음 카드"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
