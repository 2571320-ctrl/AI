import React, { useState } from 'react';
import { COURSE_DATA } from '../data/course.ts';
import { ChevronDown, Calendar, MapPin, Users, Award, DollarSign, CheckCircle2 } from 'lucide-react';

export const CourseSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full flex flex-col gap-12">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Course Overview Specs & Instructor Intro */}
        <div className="lg:col-span-6 space-y-6">
          {/* Overview Specs Card */}
          <div className="sinbi-card p-6 sm:p-7 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="font-mono-plex text-xs font-bold text-blue-700 tracking-wider uppercase block">
                  COURSE SPECIFICATION
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  모집 요강 요약
                </h3>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full font-bold text-xs">
                천안시 100% 지원
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 p-3 bg-slate-50/70 rounded-xl">
                <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 block">교육 일정</span>
                  <p className="text-[15px] font-bold text-slate-900">{COURSE_DATA.schedule}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50/70 rounded-xl">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 block">교육 장소</span>
                  <p className="text-[15px] font-bold text-slate-900">{COURSE_DATA.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50/70 rounded-xl">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 block">모집 대상</span>
                  <p className="text-[15px] font-bold text-slate-900">{COURSE_DATA.targetAudience}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
                  <span className="text-xs font-bold text-blue-700 block">모집 정원</span>
                  <p className="text-[16px] font-bold text-slate-900 mt-0.5">{COURSE_DATA.capacity}</p>
                </div>
                <div className="p-3 bg-orange-50/60 border border-orange-100 rounded-xl">
                  <span className="text-xs font-bold text-[#FF5B23] block">수강료</span>
                  <p className="text-[16px] font-bold text-[#FF5B23] mt-0.5">{COURSE_DATA.tuition}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Intro Block */}
          <div className="sinbi-card p-6 bg-white border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono-plex text-xs font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                INSTRUCTOR
              </span>
              <span className="text-lg font-bold text-slate-900">
                실전 현장 강사 소개
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0">
                {COURSE_DATA.instructor.initial}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xl font-bold text-slate-900">
                    {COURSE_DATA.instructor.name}
                  </h4>
                  <span className="font-mono-plex text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                    MASTER LECTURER
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {COURSE_DATA.instructor.bio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Week Curriculum Timeline */}
        <div className="lg:col-span-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="font-mono-plex text-xs font-bold px-2.5 py-1 bg-blue-600 text-white rounded-full">
                CURRICULUM
              </span>
              <span className="text-xl font-bold text-slate-900">
                4주 완성 실전 커리큘럼
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              (총 4회차 16시간)
            </span>
          </div>

          <div className="relative pl-7 space-y-4 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-blue-200">
            {COURSE_DATA.curriculum.map((item) => (
              <div key={item.session} className="relative">
                {/* Circle Node */}
                <div className="absolute -left-7 top-2 w-6 h-6 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm">
                  {item.session}
                </div>

                <div className="sinbi-card p-5 bg-white border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono-plex text-xs font-bold text-blue-700">
                      WEEK 0{item.session}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      4시간 실습
                    </span>
                  </div>
                  <h4 className="text-[17px] font-bold text-slate-900 mb-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="font-mono-plex text-xs font-bold text-blue-700 tracking-wider uppercase block mb-1">
              FAQ
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              자주 묻는 질문
            </h3>
          </div>
          <span className="text-sm text-slate-500 hidden sm:block">
            궁금한 점을 확인해 보세요
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {COURSE_DATA.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-bold text-slate-900 leading-snug">
                    Q. {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-blue-100 text-blue-700' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50">
                    <p className="text-[15px] font-medium text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
