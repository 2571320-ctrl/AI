import React, { useState, useRef } from 'react';
import { INSTRUCTOR_TYPES } from '../data/types.ts';
import { COMPETENCIES } from '../data/competencies.ts';
import { COURSE_DATA } from '../data/course.ts';
import { StampBadge } from './StampBadge.tsx';
import { toPng } from 'html-to-image';
import { Download, Share2, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface ResultViewProps {
  typeId: string;
  scores: Record<string, number>;
  onRetest: () => void;
  onApply: () => void;
  showToast: (msg: string) => void;
  isSharedView?: boolean;
}

export const ResultView: React.FC<ResultViewProps> = ({
  typeId,
  scores,
  onRetest,
  onApply,
  showToast,
  isSharedView = false,
}) => {
  const [userName, setUserName] = useState('');
  const [aiComment, setAiComment] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const storyExportRef = useRef<HTMLDivElement>(null);
  const feedExportRef = useRef<HTMLDivElement>(null);

  const typeData = INSTRUCTOR_TYPES[typeId] || INSTRUCTOR_TYPES['01'];

  // Gemini AI Comment Handler
  const handleGetAiComment = async () => {
    setIsGeneratingAi(true);
    setAiError(null);
    try {
      const res = await fetch('/api/gemini/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          typeId: typeData.id,
          typeName: typeData.name,
          scores,
          userName: userName.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || '코멘트 생성에 실패했습니다.');
      }

      const data = await res.json();
      setAiComment(data.comment);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || '코멘트를 불러오지 못했습니다. 다시 시도해 주세요.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Image Export Handlers
  const handleExportImage = async (format: 'story' | 'feed') => {
    const targetRef = format === 'story' ? storyExportRef.current : feedExportRef.current;
    if (!targetRef) return;

    setIsExporting(format);
    try {
      // Temporarily ensure element is ready
      const dataUrl = await toPng(targetRef, {
        cacheBust: true,
        pixelRatio: 1, // Already sized 1080px wide
        quality: 0.95,
      });

      const link = document.createElement('a');
      link.download = `cheonan-ai-teacher-${format}-${typeData.id}.png`;
      link.href = dataUrl;
      link.click();
      showToast(format === 'story' ? '스토리용 이미지가 저장되었어요!' : '피드용 이미지가 저장되었어요!');
    } catch (err) {
      console.error('Failed to export image:', err);
      showToast('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(null);
    }
  };

  // Share Handler
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?type=${typeData.id}`;
    const shareTitle = `나는 [${typeData.name}] AI 강사래요. 당신은?`;
    const shareText = `천안 AI 강사 유형 테스트 결과: ${typeData.nickname} - 7문항 3분 테스트로 지금 확인해 보세요!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or unsupported
      }
    }

    // Fallback: Copy link
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('테스트 결과 링크가 복사되었어요!');
    } catch {
      showToast('링크 복사에 실패했습니다.');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner if shared view */}
      {isSharedView && (
        <div className="p-3 bg-[#FFD45C] border-2 border-[#141414] rounded-xl flex items-center justify-between shadow-[2px_2px_0px_#141414]">
          <span className="text-sm font-bold text-[#141414]">
            공유받은 결과 카드입니다!
          </span>
          <button
            onClick={onRetest}
            className="px-3 py-1 bg-[#141414] text-white rounded font-mono-plex text-xs font-bold hover:bg-[#FF5B23] transition-colors"
          >
            나도 테스트해보기 →
          </button>
        </div>
      )}

      {/* Stamp Slam Animation Header */}
      <div className="text-center pt-2">
        <span className="font-mono-plex text-xs font-bold tracking-widest text-[#FF5B23] uppercase block mb-1">
          ANALYSIS COMPLETE
        </span>
        <h2 className="text-2xl font-black text-[#141414] tracking-tight">
          당신의 AI 강사 유형은?
        </h2>
      </div>

      {/* Slamming Stamp Badge */}
      <div className="flex justify-center -my-2">
        <div className="animate-stamp">
          <div className="w-24 h-24 rounded-full border-4 border-[#FF5B23] bg-[#F3EEE3] flex flex-col items-center justify-center p-2 shadow-[4px_4px_0px_#141414]">
            <span className="font-mono-plex text-xs font-bold text-[#FF5B23]">
              TYPE {typeData.number}
            </span>
            <span className="text-base font-black text-[#141414] leading-tight">
              합격 유형
            </span>
            <span className="text-[10px] font-bold text-[#FF5B23]">천안 2026</span>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Container for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Ticket Card */}
        <div className="lg:col-span-7 space-y-4">
          {/* Name Input Box (Desktop/Mobile) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 font-mono-plex">
              성함 (진단 리포트 카드 표기용 - 선택 사항)
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="성함 또는 닉네임을 입력하세요 (예: 김철수)"
              maxLength={12}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-base font-bold bg-slate-50 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          {/* ─── MAIN RESULT TICKET CARD ─── */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl text-slate-900">
            {/* Ticket Top Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between">
              <div>
                <span className="font-mono-plex text-xs font-bold tracking-widest text-blue-300 block mb-0.5">
                  CHEONAN AI TEACHER ASSESSMENT REPORT
                </span>
                <span className="font-mono-plex text-2xl font-black text-[#FF5B23]">
                  TYPE NO. {typeData.number}
                </span>
              </div>

              <div className="w-14 h-14 rounded-full border border-white/20 bg-white/10 flex items-center justify-center font-bold text-xs text-blue-200">
                CHEONAN
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 space-y-4">
              <div>
                {userName.trim() && (
                  <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-bold text-xs mb-2">
                    {userName.trim()} 님의 분석 유형
                  </span>
                )}
                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  "{typeData.name}"
                </h3>
                <p className="text-[17px] font-bold text-blue-700 mt-1">
                  {typeData.nickname}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[16px] font-medium text-slate-700 leading-relaxed">
                  {typeData.description}
                </p>
              </div>

              {/* 7 Competency Scores Chart */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono-plex text-xs font-bold text-slate-700">
                    7대 핵심 소양 진단 밸런스
                  </span>
                  <span className="font-mono-plex text-xs font-bold text-blue-600">
                    DIAGNOSTIC SCORE
                  </span>
                </div>

                <div className="space-y-1.5">
                  {COMPETENCIES.map((comp) => {
                    const score = scores[comp.id] || (comp.id === typeData.id ? 2 : 1);
                    const widthPercent = Math.min(100, Math.max(15, (score / 3) * 100));
                    const isHighlight = comp.id === typeData.id;

                    return (
                      <div key={comp.id} className="flex items-center gap-2">
                        <span className="font-mono-plex text-xs font-bold w-6 text-slate-400">
                          {comp.number}
                        </span>
                        <span className="text-xs font-bold w-20 truncate text-slate-700">
                          {comp.name}
                        </span>
                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isHighlight ? 'bg-[#FF5B23]' : 'bg-blue-500'
                            }`}
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                        <span className="font-mono-plex text-xs font-bold w-4 text-right text-slate-600">
                          {score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Perforation Dashed Line */}
            <div className="ticket-divider my-2"></div>

            {/* Ticket Bottom Section */}
            <div className="p-6 pt-3 space-y-3 bg-slate-50/50">
              <div>
                <span className="font-mono-plex text-xs font-bold text-[#FF5B23] tracking-wide block mb-0.5">
                  나의 대표 강점 (WEAPON)
                </span>
                <p className="text-[18px] font-bold text-slate-900">
                  {typeData.weapon}
                </p>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="font-mono-plex text-xs font-bold text-slate-500 block mb-1">
                  추천 보완 소양 & 이번 주 실천 과제
                </span>
                <p className="text-[15px] font-medium text-slate-700">
                  <span className="text-blue-700 font-bold">{typeData.growth.targetName}</span>
                  {' — '}
                  {typeData.growth.action}
                </p>
              </div>

              <div>
                <span className="font-mono-plex text-xs font-bold text-slate-500 block mb-0.5">
                  가장 잘 맞는 현장 강의 분야
                </span>
                <p className="text-[16px] font-bold text-slate-900">
                  {typeData.bestScene}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Action Buttons, Gemini AI Comment Box, Apply */}
        <div className="lg:col-span-5 space-y-5">
          {/* ─── 3 ACTION BUTTONS (Insta Story, Feed, Share) ─── */}
          <div className="flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleExportImage('story')}
                disabled={isExporting !== null}
                className="sinbi-btn sinbi-btn-outline text-[14px] py-3.5 px-3 flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#FF5B23]" />
                <span>{isExporting === 'story' ? '저장 중...' : '인스타그램 스토리용 저장'}</span>
              </button>
              <button
                onClick={() => handleExportImage('feed')}
                disabled={isExporting !== null}
                className="sinbi-btn sinbi-btn-outline text-[14px] py-3.5 px-3 flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#FF5B23]" />
                <span>{isExporting === 'feed' ? '저장 중...' : '인스타그램 피드용 저장'}</span>
              </button>
            </div>
            <button
              onClick={handleShare}
              className="sinbi-btn sinbi-btn-blue text-[16px] py-3.5 w-full flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-white" />
              <span>진단 결과 링크 공유하기</span>
            </button>
          </div>

          {/* ─── GEMINI AI CUSTOM COMMENT BOX ─── */}
          <div className="sinbi-card-dark p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF5B23]" />
                <span className="font-mono-plex text-xs font-bold text-blue-300 tracking-wider uppercase">
                  AI FIELD MENTOR FEEDBACK
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                현장 3문장 맞춤 코멘트
              </span>
            </div>

            {!aiComment && !isGeneratingAi && (
              <div>
                <p className="text-[15px] text-slate-300 leading-relaxed mb-4">
                  천안 현장 강사 페르소나가 귀하의 7가지 소양 분석 결과를 바탕으로 소상공인 교육 현장에 최적화된 3문장 맞춤 피드백을 전달합니다.
                </p>
                <button
                  onClick={handleGetAiComment}
                  className="sinbi-btn sinbi-btn-primary w-full text-[16px] py-3.5 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI 맞춤 코멘트 받기</span>
                </button>
              </div>
            )}

            {isGeneratingAi && (
              <div className="py-6 text-center">
                <div className="inline-block w-8 h-8 border-2 border-[#FF5B23] border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-[16px] font-bold text-white">
                  현장 맞춤 코멘트를 작성하고 있습니다...
                </p>
                <span className="text-xs text-slate-400 font-mono-plex">
                  천안 소상공인 상권 분석 데이터 대조 중
                </span>
              </div>
            )}

            {aiComment && (
              <div className="space-y-3">
                <div className="p-4 bg-white/10 border border-white/20 rounded-xl text-slate-100 font-medium text-[15px] leading-relaxed backdrop-blur-sm">
                  {aiComment}
                </div>
                <button
                  onClick={handleGetAiComment}
                  className="text-xs text-blue-300 underline font-mono-plex hover:text-white transition-colors block text-right w-full"
                >
                  코멘트 다시 생성하기 ↺
                </button>
              </div>
            )}

            {aiError && (
              <div className="mt-2 text-center">
                <p className="text-xs text-rose-400 mb-2">{aiError}</p>
                <button
                  onClick={handleGetAiComment}
                  className="sinbi-btn sinbi-btn-outline text-xs py-2 px-4"
                >
                  다시 받기
                </button>
              </div>
            )}
          </div>

          {/* ─── BOTTOM BIG ACTION BUTTON: APPLY ─── */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onApply}
              className="sinbi-btn sinbi-btn-primary w-full text-[18px] py-4 shadow-lg flex items-center justify-center gap-2"
            >
              <span>이 강점으로 강사 지원하기 → 수강 신청</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="text-center">
              <button
                onClick={onRetest}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 underline font-mono-plex cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>테스트 처음부터 다시 하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          OFFSCREEN EXPORT TEMPLATES (1080x1920 Story & 1080x1350 Feed)
          These are positioned offscreen for high-fidelity html-to-image capture
         ══════════════════════════════════════════════════════════════════ */}
      <div style={{ position: 'fixed', left: -9999, top: 0 }}>
        {/* 1. INSTAGRAM STORY TEMPLATE (1080 x 1920 px) */}
        <div
          ref={storyExportRef}
          style={{
            width: 1080,
            height: 1920,
            backgroundColor: '#F3EEE3',
            color: '#141414',
            fontFamily: "'Pretendard Variable', sans-serif",
            padding: 80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            border: '24px solid #141414',
          }}
        >
          {/* Top Brand Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FFD45C',
                  border: '4px solid #141414',
                  borderRadius: 12,
                  padding: '10px 24px',
                  fontWeight: 900,
                  fontSize: 28,
                  marginBottom: 16,
                  transform: 'rotate(-2deg)',
                }}
              >
                천안 AI 강사 양성 과정 · 2026
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 32, color: '#FF5B23' }}>
                TYPE {typeData.number} / 07
              </div>
            </div>

            {/* Stamp on Export */}
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: '50%',
                border: '8px solid #FF5B23',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-10deg)',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: '#FF5B23', fontFamily: "'IBM Plex Mono', monospace" }}>
                CHEONAN
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: '#141414' }}>
                천안
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#FF5B23' }}>
                2026
              </div>
            </div>
          </div>

          {/* Center Main Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '6px solid #141414',
              borderRadius: 36,
              padding: 60,
              boxShadow: '16px 16px 0px #141414',
            }}
          >
            {userName.trim() && (
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FF5B23',
                  color: '#FFFFFF',
                  padding: '8px 20px',
                  borderRadius: 10,
                  fontSize: 32,
                  fontWeight: 800,
                  marginBottom: 20,
                }}
              >
                {userName.trim()} 님은
              </div>
            )}

            <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.15, marginBottom: 16 }}>
              "{typeData.name}"
            </div>

            <div style={{ fontSize: 38, fontWeight: 800, color: '#FF5B23', marginBottom: 40 }}>
              {typeData.nickname}
            </div>

            <div
              style={{
                backgroundColor: '#F3EEE3',
                border: '4px solid #141414',
                borderRadius: 20,
                padding: 36,
                fontSize: 32,
                fontWeight: 600,
                lineHeight: 1.5,
                marginBottom: 40,
              }}
            >
              {typeData.description}
            </div>

            {/* Weapon & Best Scene */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div
                style={{
                  backgroundColor: '#FFD45C',
                  border: '4px solid #141414',
                  borderRadius: 20,
                  padding: 24,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: '#141414', fontFamily: "'IBM Plex Mono', monospace" }}>
                  나의 무기
                </div>
                <div style={{ fontSize: 34, fontWeight: 900, color: '#141414', marginTop: 8 }}>
                  {typeData.weapon}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#F3EEE3',
                  border: '4px solid #141414',
                  borderRadius: 20,
                  padding: 24,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: '#141414', fontFamily: "'IBM Plex Mono', monospace" }}>
                  잘 맞는 강의
                </div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#141414', marginTop: 8 }}>
                  {typeData.bestScene}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA on Story */}
          <div
            style={{
              backgroundColor: '#141414',
              color: '#F3EEE3',
              borderRadius: 24,
              padding: '36px 48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 36, fontWeight: 900 }}>
                나도 어떤 AI 강사 유형인지 알아보기
              </div>
              <div style={{ fontSize: 24, color: '#FFD45C', marginTop: 8, fontFamily: "'IBM Plex Mono', monospace" }}>
                3-MINUTE CHEONAN AI TEACHER TEST
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#FF5B23',
                color: '#FFFFFF',
                padding: '16px 36px',
                borderRadius: 16,
                fontWeight: 900,
                fontSize: 28,
                border: '3px solid #FFFFFF',
              }}
            >
              테스트하기 →
            </div>
          </div>
        </div>

        {/* 2. INSTAGRAM FEED TEMPLATE (1080 x 1350 px) */}
        <div
          ref={feedExportRef}
          style={{
            width: 1080,
            height: 1350,
            backgroundColor: '#F3EEE3',
            color: '#141414',
            fontFamily: "'Pretendard Variable', sans-serif",
            padding: 70,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            border: '20px solid #141414',
          }}
        >
          {/* Top Brand Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: '#FFD45C',
                border: '4px solid #141414',
                borderRadius: 12,
                padding: '8px 20px',
                fontWeight: 900,
                fontSize: 26,
                transform: 'rotate(-2deg)',
              }}
            >
              천안 AI 강사 유형 테스트 · 2026
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 28, color: '#FF5B23' }}>
              TYPE {typeData.number} / 07
            </div>
          </div>

          {/* Main Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '5px solid #141414',
              borderRadius: 30,
              padding: 50,
              boxShadow: '12px 12px 0px #141414',
            }}
          >
            {userName.trim() && (
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FF5B23',
                  color: '#FFFFFF',
                  padding: '6px 18px',
                  borderRadius: 8,
                  fontSize: 28,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                {userName.trim()} 님은
              </div>
            )}

            <div style={{ fontSize: 62, fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.15, marginBottom: 12 }}>
              "{typeData.name}"
            </div>

            <div style={{ fontSize: 32, fontWeight: 800, color: '#FF5B23', marginBottom: 30 }}>
              {typeData.nickname}
            </div>

            <div
              style={{
                backgroundColor: '#F3EEE3',
                border: '3px solid #141414',
                borderRadius: 18,
                padding: 28,
                fontSize: 26,
                fontWeight: 600,
                lineHeight: 1.5,
                marginBottom: 30,
              }}
            >
              {typeData.description}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div
                style={{
                  backgroundColor: '#FFD45C',
                  border: '3px solid #141414',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 800, color: '#141414' }}>나의 무기</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#141414', marginTop: 4 }}>
                  {typeData.weapon}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#F3EEE3',
                  border: '3px solid #141414',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 800, color: '#141414' }}>잘 맞는 강의</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#141414', marginTop: 4 }}>
                  {typeData.bestScene}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '3px solid #141414',
              paddingTop: 24,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: '#141414' }}>
              천안시 소상공인 AI 강사 양성 과정 선착순 모집 중
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 700,
                fontSize: 20,
                color: '#FF5B23',
              }}
            >
              CHEONAN · 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
