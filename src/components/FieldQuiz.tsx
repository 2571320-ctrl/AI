import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quiz.ts';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';

export const FieldQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isFlipped) return;
    setSelectedAnswer(idx);
    setIsFlipped(true);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedAnswer(null);
    setCurrentIdx((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const selectQuestion = (idx: number) => {
    setIsFlipped(false);
    setSelectedAnswer(null);
    setCurrentIdx(idx);
  };

  const isUserCorrect =
    selectedAnswer !== null && currentQ.options[selectedAnswer]?.isCorrect;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Sidebar: Situation Selector */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-3">
          <span className="font-mono-plex text-xs font-bold text-blue-300 uppercase tracking-wider">
            SITUATION SIMULATION LIST
          </span>
          {QUIZ_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => selectQuestion(idx)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                currentIdx === idx
                  ? 'bg-white text-slate-900 border-white shadow-lg'
                  : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`font-mono-plex text-xs font-bold px-2 py-0.5 rounded-full ${
                    currentIdx === idx
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  CASE 0{q.id}
                </span>
                {currentIdx === idx && (
                  <span className="text-xs font-bold text-[#FF5B23]">진행 중</span>
                )}
              </div>
              <p className="text-sm font-semibold line-clamp-2 leading-snug">
                {q.situation}
              </p>
            </button>
          ))}
        </div>

        {/* Main Interactive Card */}
        <div className="lg:col-span-8 w-full">
          <div className="relative min-h-[360px]">
            {!isFlipped ? (
              // Front Card: Question & Options
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 text-slate-900 flex flex-col justify-between min-h-[360px]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full font-mono-plex text-xs font-bold">
                      CASE 0{currentIdx + 1} · 현장 돌발 상황
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      (가장 적절한 행동을 선택하세요)
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-6">
                    {currentQ.situation}
                  </h4>
                </div>

                {/* Options list */}
                <div className="flex flex-col gap-3">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(idx)}
                      className="w-full text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/70 hover:border-blue-300 active:bg-blue-100 transition-all flex items-center gap-3.5 cursor-pointer select-none group min-h-[56px]"
                    >
                      <span className="w-8 h-8 rounded-full border border-slate-300 bg-white group-hover:bg-[#1E40AF] group-hover:text-white group-hover:border-[#1E40AF] flex items-center justify-center font-mono-plex font-bold text-sm text-slate-700 transition-colors flex-shrink-0">
                        {opt.label}
                      </span>
                      <span className="text-[16px] font-semibold text-slate-800 leading-snug group-hover:text-blue-900">
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Back Card: Result & Explanation
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 text-slate-900 flex flex-col justify-between min-h-[360px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-plex text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                      CASE 0{currentIdx + 1} 해설
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 font-bold text-sm px-3 py-1 rounded-full ${
                        isUserCorrect
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {isUserCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>정답입니다!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>다시 확인해 보세요</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl mb-4">
                    <span className="text-xs font-bold text-blue-700 block mb-1">
                      모범 강사 대응 가이드
                    </span>
                    <p className="text-[17px] font-bold text-slate-900 leading-snug">
                      {currentQ.options.find((o) => o.isCorrect)?.text}
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50/60 border border-orange-200/60 rounded-xl">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF5B23] mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>현장 전문가 TIP</span>
                    </div>
                    <p className="text-[15px] font-medium text-slate-700 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={handleNext}
                    className="sinbi-btn sinbi-btn-blue flex-1 py-3.5 text-[16px] flex items-center justify-center gap-2"
                  >
                    <span>
                      {currentIdx < QUIZ_QUESTIONS.length - 1
                        ? '다음 상황 풀기'
                        : '처음 상황으로 다시 보기'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
