import React, { useState } from 'react';
import { TEST_QUESTIONS } from '../data/test.ts';
import { X } from 'lucide-react';

interface TestModalProps {
  onClose: () => void;
  onFinish: (winnerTypeId: string, scores: Record<string, number>) => void;
}

export const TestModal: React.FC<TestModalProps> = ({ onClose, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ qIdx: number; compId: string }[]>([]);

  const question = TEST_QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx + 1) / TEST_QUESTIONS.length) * 100;

  const handleSelect = (optIdx: number) => {
    if (selectedOptIdx !== null) return; // prevent double clicks during auto advance
    setSelectedOptIdx(optIdx);

    const chosenCompId = question.options[optIdx].competencyId;
    const newAnswers = [...answers, { qIdx: currentIdx, compId: chosenCompId }];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIdx < TEST_QUESTIONS.length - 1) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedOptIdx(null);
      } else {
        // Calculate result
        // Score counts for each competency 01..07
        const scores: Record<string, number> = {
          '01': 0,
          '02': 0,
          '03': 0,
          '04': 0,
          '05': 0,
          '06': 0,
          '07': 0,
        };

        newAnswers.forEach((a) => {
          scores[a.compId] = (scores[a.compId] || 0) + 1;
        });

        // Determine winner: highest score, tie-breaker: last question selected
        let maxScore = -1;
        let winnerId = '01';

        // Check each comp score
        const candidates: string[] = [];
        for (const [id, sc] of Object.entries(scores)) {
          if (sc > maxScore) {
            maxScore = sc;
            candidates.length = 0;
            candidates.push(id);
          } else if (sc === maxScore) {
            candidates.push(id);
          }
        }

        if (candidates.length === 1) {
          winnerId = candidates[0];
        } else {
          // Tie-breaker: look backwards from last answer to find which candidate was chosen most recently
          for (let i = newAnswers.length - 1; i >= 0; i--) {
            if (candidates.includes(newAnswers[i].compId)) {
              winnerId = newAnswers[i].compId;
              break;
            }
          }
        }

        onFinish(winnerId, scores);
      }
    }, 300);
  };

  // Keyboard shortcuts for desktop users (1, 2, 3, Escape)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '1' && question.options[0]) {
        handleSelect(0);
      } else if (e.key === '2' && question.options[1]) {
        handleSelect(1);
      } else if (e.key === '3' && question.options[2]) {
        handleSelect(2);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, selectedOptIdx, answers]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-0 sm:p-4">
      {/* Container fits mobile width or expands nicely on desktop */}
      <div className="w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-[540px] bg-white text-slate-900 border-0 sm:border sm:border-slate-200 sm:rounded-2xl sm:shadow-2xl flex flex-col justify-between overflow-hidden relative">
        {/* Top Header */}
        <div className="p-5 pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono-plex font-bold text-sm tracking-wider text-blue-700">
                DIAGNOSTIC TEST {question.questionNumber}/07
              </span>
              <span className="hidden sm:inline-block font-mono-plex text-[11px] font-medium text-slate-400">
                (숫자 1, 2, 3번 키로도 선택 가능)
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer text-slate-600"
              aria-label="테스트 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Indigo-blue progress bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-[#FF5B23] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
          <div className="mb-3">
            <span className="font-mono-plex text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full">
              QUESTION 0{currentIdx + 1}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug tracking-tight mb-8 break-keep">
            {question.question}
          </h2>

          {/* Options (3 buttons, vertically arranged) */}
          <div className="flex flex-col gap-3">
            {question.options.map((opt, optIdx) => {
              const isSelected = selectedOptIdx === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-150 flex items-start gap-4 cursor-pointer select-none min-h-[64px] ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md translate-y-0.5'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50/60 hover:border-blue-300'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono-plex font-bold text-xs flex-shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'bg-white text-blue-600 border-white' : 'bg-white text-slate-600 border-slate-300'
                    }`}
                  >
                    0{optIdx + 1}
                  </span>
                  <span className="text-[16px] sm:text-[17px] font-bold leading-snug break-keep">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 pt-3 text-center border-t border-slate-100 bg-slate-50 text-xs font-mono-plex text-slate-400">
          CHEONAN AI INSTRUCTOR TYPE ASSESSMENT · AI 발전연구소
        </div>
      </div>
    </div>
  );
};
