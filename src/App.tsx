/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COURSE_DATA } from './data/course.ts';
import { INSTRUCTOR_TYPES } from './data/types.ts';
import { CompetencyCarousel } from './components/CompetencyCarousel.tsx';
import { FieldQuiz } from './components/FieldQuiz.tsx';
import { CourseSection } from './components/CourseSection.tsx';
import { TestModal } from './components/TestModal.tsx';
import { ResultView } from './components/ResultView.tsx';
import { BottomBar } from './components/BottomBar.tsx';
import { FloatingQuickMenu } from './components/FloatingQuickMenu.tsx';
import { Toast } from './components/Toast.tsx';
import lecturerImage from './assets/images/korean_ai_lecturer_1794379477005.jpg';
import {
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  X,
  Store,
  Compass,
  Lightbulb,
} from 'lucide-react';

export default function App() {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [resultState, setResultState] = useState<{
    typeId: string;
    scores: Record<string, number>;
    isShared: boolean;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Show Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // URL Query Param check: ?type=03
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    if (typeParam && INSTRUCTOR_TYPES[typeParam]) {
      setResultState({
        typeId: typeParam,
        scores: {
          '01': typeParam === '01' ? 3 : 1,
          '02': typeParam === '02' ? 3 : 1,
          '03': typeParam === '03' ? 3 : 1,
          '04': typeParam === '04' ? 3 : 1,
          '05': typeParam === '05' ? 3 : 1,
          '06': typeParam === '06' ? 3 : 1,
          '07': typeParam === '07' ? 3 : 1,
        },
        isShared: true,
      });
    }
  }, []);

  const handleStartTest = () => {
    setResultState(null);
    setIsTestOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishTest = (winnerTypeId: string, scores: Record<string, number>) => {
    setIsTestOpen(false);
    setResultState({
      typeId: winnerTypeId,
      scores,
      isShared: false,
    });
    const newUrl = `${window.location.pathname}?type=${winnerTypeId}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetest = () => {
    const cleanUrl = window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    setResultState(null);
    setIsTestOpen(true);
  };

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative antialiased">
      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Floating Quick Menu (Sinbiweb Signature on Desktop) */}
      <FloatingQuickMenu
        onStartTest={handleStartTest}
        onApply={handleApply}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. STICKY GNB HEADER (Sinbiweb Agency Navigation Bar)
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2.5 text-slate-900 no-underline cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                AI
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight leading-none text-slate-900">
                  AI 발전연구소
                </span>
                <span className="text-[11px] font-bold text-blue-700 tracking-wider font-mono-plex mt-0.5">
                  천안 AI 강사 양성 과정
                </span>
              </div>
            </a>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-600">
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              과정 소개
            </button>
            <button
              onClick={() => scrollToSection('competencies')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              7대 핵심 소양
            </button>
            <button
              onClick={handleStartTest}
              className="hover:text-[#FF5B23] transition-colors cursor-pointer flex items-center gap-1 font-bold text-[#FF5B23]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>유형 진단</span>
            </button>
            <button
              onClick={() => scrollToSection('quiz')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              현장 퀴즈
            </button>
            <button
              onClick={() => scrollToSection('curriculum')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              커리큘럼
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              자주 묻는 질문
            </button>
          </nav>

          {/* Right Action: Direct Phone & Apply Button */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${COURSE_DATA.contact.phone}`}
              className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-blue-700 transition-colors no-underline px-3 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>{COURSE_DATA.contact.phone}</span>
            </a>
            <button
              onClick={handleApply}
              className="sinbi-btn sinbi-btn-primary px-4 py-2 text-xs sm:text-sm font-bold shadow-sm"
            >
              간편 수강 신청
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA
         ───────────────────────────────────────────────────────────── */}
      <main className="flex-1">
        {/* Result View Overlay Mode if test finished or opened with ?type= */}
        {resultState ? (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="font-mono-plex text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                  DIAGNOSTIC REPORT
                </span>
                <span className="font-bold text-lg text-slate-900">
                  천안 AI 강사 유형 분석 결과 리포트
                </span>
              </div>
              <button
                onClick={() => setResultState(null)}
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                소개 페이지로 돌아가기 ✕
              </button>
            </div>

            <ResultView
              typeId={resultState.typeId}
              scores={resultState.scores}
              onRetest={handleRetest}
              onApply={handleApply}
              showToast={showToast}
              isSharedView={resultState.isShared}
            />
          </div>
        ) : (
          /* Normal Landing Page Sections */
          <>
            {/* ═══════════════════════════════════════════════════════════
                [HERO MAIN VISUAL] (Sinbiweb Agency Hero Banner)
               ═══════════════════════════════════════════════════════════ */}
            <section className="sinbi-hero-gradient text-white pt-12 pb-16 sm:pt-20 sm:pb-24 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  {/* Left Column: Hero Copy & CTA */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Top Status Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-md text-blue-200">
                      <span className="w-2 h-2 rounded-full bg-[#FF5B23] animate-pulse"></span>
                      <span>천안시 소상공인 특화 맞춤 교육</span>
                      <span className="text-white/40">|</span>
                      <span className="text-white font-bold">{COURSE_DATA.recruitmentPeriod}</span>
                    </div>

                    {/* Master Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.16] text-white">
                      천안의 소상공인과 함께 성장할<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-[#FF8A65]">
                        실전형 AI 전문 강사
                      </span>
                      , 당신입니다
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal">
                      AI를 잘 다루는 사람은 많지만, 우리 동네 사장님의 눈높이에 맞춰 알기 쉽게 가르칠 사람은 아직 부족합니다. 7문항 진단으로 나만의 강의 스타일과 핵심 강점을 지금 바로 확인해 보세요.
                    </p>

                    {/* Dual CTA Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3.5 sm:items-center">
                      <button
                        onClick={handleStartTest}
                        className="sinbi-btn sinbi-btn-primary text-[17px] py-4 px-8 shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <Sparkles className="w-5 h-5 text-amber-200" />
                        <span className="font-extrabold">3분 AI 강사 유형 진단하기</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                      <button
                        onClick={() => scrollToSection('curriculum')}
                        className="sinbi-btn sinbi-btn-outline-white text-[16px] py-4 px-7 cursor-pointer"
                      >
                        교육과정 상세 안내 ↓
                      </button>
                    </div>

                    <p className="text-xs font-mono-plex text-slate-400">
                      * 총 7문항 · 소요 시간 약 3분 · 진단 결과 카드 다운로드 제공 · 수강료 전액 무료
                    </p>
                  </div>

                  {/* Right Column: Professional AI Lecturer Photo in Modern Agency Frame */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-md lg:max-w-none">
                      {/* Decorative ambient background glow */}
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-[#FF5B23] rounded-3xl blur-xl opacity-35"></div>

                      {/* Photo Container */}
                      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-slate-900/80 shadow-2xl group">
                        <img
                          src={lecturerImage}
                          alt="소상공인 AI 실전 강의를 진행하는 전문 여성 강사"
                          className="w-full h-[400px] sm:h-[480px] lg:h-[500px] object-cover object-top transition-transform duration-500 group-hover:scale-102"
                        />

                        {/* Bottom Gradient Overlay for text readability */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 sm:p-6 pt-16">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 bg-[#FF5B23] text-white text-[11px] font-bold rounded-full">
                              현장 실무 강의
                            </span>
                            <span className="text-xs text-blue-200 font-mono-plex">
                              CHEONAN AI LECTURER
                            </span>
                          </div>
                          <p className="text-white font-bold text-base sm:text-lg leading-snug">
                            "사장님의 매장 사정을 깊이 이해하는 따뜻하고 전문적인 AI 강의"
                          </p>
                          <p className="text-xs text-slate-300 mt-1">
                            천안시 소상공인 맞춤형 프롬프트 & 생성형 AI 실무 교육
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Trust Metrics Strip (Sinbiweb Signature Feature Strip) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs font-mono-plex text-blue-300 mb-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>CAPACITY</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white">
                      선착순 20명 마감
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">밀착 실습 소수 정예</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs font-mono-plex text-blue-300 mb-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>TUITION</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-[#FF8A65]">
                      전액 무료 지원
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">천안시 100% 예산 지원</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs font-mono-plex text-blue-300 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>PERIOD</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white">
                      4주 16시간 완성
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">매주 토요일 14:00~18:00</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs font-mono-plex text-blue-300 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>BENEFIT</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white">
                      천안 상권 강사 인력풀
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">수료 시 현장 출강 연계</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                [SECTION 1: ABOUT] WHY CHEONAN NEEDS AI INSTRUCTORS
               ═══════════════════════════════════════════════════════════ */}
            <section id="about" className="py-20 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="font-mono-plex text-xs font-bold text-blue-700 tracking-wider uppercase block mb-2">
                    LOCAL EDUCATION INSIGHT
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    왜 지금, 천안에 현장형 AI 강사가 필요한가?
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 mt-3">
                    소상공인 사장님들께 필요한 것은 복잡한 이론이 아닌, 내 매장 매출을 실질적으로 돕는 현장 실무 언어입니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="sinbi-card p-8 bg-white border border-slate-200 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform">
                      <Store className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-blue-600 font-mono-plex uppercase block mb-1">
                      REALITY 01
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      사장님들은 AI가 진심으로 궁금합니다
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      SNS 마케팅, 메뉴판 사진, 고객 리뷰 답글까지 AI가 편리하다는 이야기는 많이 듣지만, 어디서부터 설치하고 시작해야 할지 막막해하십니다.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="sinbi-card p-8 bg-white border border-slate-200 group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 mb-6 group-hover:scale-110 transition-transform">
                      <Compass className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-indigo-600 font-mono-plex uppercase block mb-1">
                      REALITY 02
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      쉬운 생활 언어로 풀어줄 전문가가 필요합니다
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      '프롬프트 엔지니어링', 'LLM' 같은 낯선 전문 용어 대신 'AI에게 보내는 주문서 작성법'처럼 눈높이에 맞게 풀어줄 사람이 부족합니다.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="sinbi-card p-8 bg-white border border-slate-200 group">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5B23] mb-6 group-hover:scale-110 transition-transform">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#FF5B23] font-mono-plex uppercase block mb-1">
                      REALITY 03
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      천안 골목 상권을 꿰뚫고 있는 강사
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      두정동 먹자골목, 신부동 카페거리, 천안 중앙시장 상인회까지 각 골목 상권의 특성에 맞춘 실습 예시를 제시할 수 있어야 합니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                [SECTION 2: COMPETENCIES] 7 CORE COMPETENCIES
               ═══════════════════════════════════════════════════════════ */}
            <section id="competencies" className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="font-mono-plex text-xs font-bold text-blue-700 tracking-wider uppercase block mb-2">
                    EXCELLENCE STANDARDS
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    기술보다 먼저, 검증된 7가지 강사 소양
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 mt-3">
                    천안시 소상공인들이 신뢰하고 만족하는 검증된 AI 강사의 7대 핵심 소양입니다.
                  </p>
                </div>

                <CompetencyCarousel layoutMode="grid" />
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                [SECTION 3: CTA BANNER] TYPE TEST PROMOTION
               ═══════════════════════════════════════════════════════════ */}
            <section id="test" className="py-16 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
                <span className="font-mono-plex text-xs font-bold px-3 py-1 bg-white/10 border border-white/20 rounded-full text-blue-300 uppercase tracking-widest inline-block">
                  FIND YOUR TEACHING STYLE
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  7가지 소양 중 당신만의 진짜 무기는 무엇일까요?
                </h3>
                <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
                  단 7문항 3분 진단으로 나의 대표 강점과 천안 소상공인 현장에 맞는 강의 스타일을 확인해 보세요.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleStartTest}
                    className="sinbi-btn sinbi-btn-primary text-lg py-4 px-8 shadow-2xl inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>3분 AI 강사 유형 진단 시작하기</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                [SECTION 4: SIMULATION QUIZ] REAL FIELD SITUATION
               ═══════════════════════════════════════════════════════════ */}
            <section id="quiz" className="py-20 bg-slate-900 text-white border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="font-mono-plex text-xs font-bold text-blue-400 tracking-wider uppercase block mb-2">
                    INTERACTIVE CASE STUDY
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    당신이 강사라면? 현장 돌발 상황 시뮬레이션
                  </h2>
                  <p className="text-base sm:text-lg text-slate-400 mt-3">
                    실제 천안 교육 현장에서 자주 일어나는 3가지 돌발 상황을 직접 해결해 보세요.
                  </p>
                </div>

                <FieldQuiz />
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                [SECTION 5: CURRICULUM & SPECS] COURSE OVERVIEW
               ═══════════════════════════════════════════════════════════ */}
            <section id="curriculum" className="py-20 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="font-mono-plex text-xs font-bold text-blue-700 tracking-wider uppercase block mb-2">
                    EDUCATION PROGRAM
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    천안 AI 강사 양성 과정 상세 안내
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 mt-3">
                    이론에서 끝나지 않고 현장 실습과 모의 강의 피드백을 통해 실전 강사로 데뷔할 수 있도록 전액 무료로 지원합니다.
                  </p>
                </div>

                <CourseSection />
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                [SECTION 6: FINAL APPLY] CONSULTATION & REGISTRATION
               ═══════════════════════════════════════════════════════════ */}
            <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-6 text-center max-w-2xl mx-auto">
                    <span className="font-mono-plex text-xs font-bold px-3 py-1 bg-white/10 border border-white/20 rounded-full text-blue-300 uppercase">
                      2026 SPRING ENROLLMENT
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      천안 사장님들 곁에 설 AI 전문 강사,<br />
                      <span className="text-[#FF8A65]">이번에는 당신 차례입니다</span>
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      선착순 20명 정원으로 마감됩니다. 천안시 소상공인들의 든든한 AI 멘토로 첫발을 내디뎌 보세요.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={handleApply}
                        className="sinbi-btn sinbi-btn-primary text-base py-3.5 px-8 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>온라인 수강 신청하기</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <a
                        href={COURSE_DATA.contact.kakaoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sinbi-btn sinbi-btn-outline-white text-base py-3.5 px-6 flex items-center justify-center gap-2 no-underline cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>카카오톡 상담 문의</span>
                      </a>
                    </div>

                    <div className="pt-4 border-t border-white/15 text-xs text-slate-300">
                      전화 문의: <span className="font-bold text-white">{COURSE_DATA.contact.phone}</span> (평일 09:00~18:00)
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          AGENCY STANDARD FOOTER (Sinbiweb Style Corporate Footer)
         ───────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 text-slate-300 font-medium">
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                과정 소개
              </button>
              <button
                onClick={() => scrollToSection('competencies')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                7대 핵심 소양
              </button>
              <button
                onClick={handleStartTest}
                className="hover:text-white transition-colors cursor-pointer"
              >
                AI 강사 유형 진단
              </button>
              <button
                onClick={() => scrollToSection('curriculum')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                커리큘럼
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                자주 묻는 질문
              </button>
            </div>
            <span className="font-mono-plex text-slate-500">
              CHEONAN LOCAL AI LECTURER
            </span>
          </div>

          {/* Corporate Information */}
          <div className="space-y-1.5 leading-relaxed">
            <p>
              <strong className="text-slate-300">천안시 소상공인 AI 강사 양성 과정</strong> | 주최: {COURSE_DATA.contact.hostOrg} | 제작: {COURSE_DATA.contact.producer}
            </p>
            <p>
              교육장소: {COURSE_DATA.location} | 문의전화: {COURSE_DATA.contact.phone} | 카카오톡 채널: {COURSE_DATA.contact.kakaoChannel}
            </p>
            <p className="text-slate-500 pt-2 font-mono-plex">
              Copyright © AI 발전연구소 & Cheonan City. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          STICKY BOTTOM FLOATING BAR (Mobile Only)
         ───────────────────────────────────────────────────────────── */}
      <BottomBar
        onStartTest={handleStartTest}
        onApply={handleApply}
        isVisible={!isTestOpen && !resultState}
      />

      {/* ─────────────────────────────────────────────────────────────
          FULLSCREEN TEST MODAL
         ───────────────────────────────────────────────────────────── */}
      {isTestOpen && (
        <TestModal
          onClose={() => setIsTestOpen(false)}
          onFinish={handleFinishTest}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          APPLY MODAL DIALOG
         ───────────────────────────────────────────────────────────── */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
          <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-7 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="font-mono-plex text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                ONLINE APPLICATION
              </span>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center cursor-pointer text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              수강 신청 안내
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              천안시 소상공인 AI 강사 양성 과정은 선착순 20명 정원으로 마감됩니다. 아래 구글 폼 링크를 통해 지원해 주세요.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-5 space-y-2 text-sm text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium"><strong>일정:</strong> {COURSE_DATA.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium"><strong>수강료:</strong> {COURSE_DATA.tuition}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium"><strong>문의:</strong> {COURSE_DATA.contact.phone}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href={COURSE_DATA.contact.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsApplyModalOpen(false)}
                className="sinbi-btn sinbi-btn-primary w-full text-[16px] py-3.5 flex items-center justify-center gap-2 no-underline cursor-pointer"
              >
                <span>신청 폼 바로가기 (Google Form) →</span>
              </a>

              <a
                href={COURSE_DATA.contact.kakaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sinbi-btn sinbi-btn-outline w-full text-[15px] py-3 flex items-center justify-center gap-2 no-underline cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-amber-500" />
                <span>카카오톡 채널 상담</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
