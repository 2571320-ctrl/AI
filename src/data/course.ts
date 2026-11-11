export interface CourseInfo {
  recruitmentPeriod: string;
  schedule: string;
  location: string;
  targetAudience: string;
  capacity: string;
  tuition: string;
  curriculum: {
    session: number;
    title: string;
    description: string;
  }[];
  instructor: {
    name: string;
    initial: string;
    bio: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  contact: {
    phone: string;
    kakaoChannel: string;
    kakaoUrl: string;
    applyUrl: string;
    hostOrg: string;
    producer: string;
  };
}

export const COURSE_DATA: CourseInfo = {
  // [모집 기간]
  recruitmentPeriod: '2026 봄 학기 선착순 모집 중',

  // [일정]
  schedule: '2026. 4. 4.(토) ~ 4. 25.(토) 매주 토요일 14:00~18:00 (4주간 총 16시간)',

  // [장소]
  location: '천안 타운홀 스마트 혁신공간 (천안역 1번 출구 도보 5분)',

  // [대상]
  targetAudience: '소상공인·자영업자 대상 실무 AI 강의에 관심 있는 천안 시민 및 예비 강사',

  // [정원]
  capacity: '선착순 20명 마감',

  // [수강료]
  tuition: '전액 무료 (교재비 및 실습비 전액 지원)',

  // 커리큘럼 세로 타임라인 [1회차~4회차 주제]
  curriculum: [
    {
      session: 1,
      title: '소상공인이 진짜 묻는 AI 질문과 프롬프트 기초',
      description: '전문 용어 없이 우리 가게 주문서 쓰듯 AI와 대화하는 법'
    },
    {
      session: 2,
      title: '가게 사진·홍보물 제작과 개인정보·저작권 안전 수칙',
      description: '손님 사진·연락처는 철저히 지키고 저작권 걱정 없는 이미지 만들기'
    },
    {
      session: 3,
      title: '천안 상권 데이터 분석과 맞춤 메뉴판·리뷰 답글 실습',
      description: '두정동·신부동·원도심 등 상권별 맞춤 예시로 실습 구성하기'
    },
    {
      session: 4,
      title: '돌발 상황 대처 시연과 모의 강의 피드백 클리닉',
      description: '와이파이 장애·로그인 오류 대비 플랜 B와 수강생 눈높이 코칭'
    }
  ],

  // 강사 소개 블록 [강사명], [강사 소개 한 줄]
  instructor: {
    name: '김민수',
    initial: '민수',
    bio: '천안 8개 전통시장 및 대학가 상권 AI 교육 120회 진행 현장 전문가'
  },

  // 자주 묻는 질문
  faqs: [
    {
      question: '컴퓨터를 잘 다루지 못해도 수강할 수 있나요?',
      answer: '스마트폰으로 메일이나 카카오톡을 사용하실 수 있다면 충분합니다. 첫 시간에 앱 설치부터 차근차근 함께 진행합니다.'
    },
    {
      question: '개인 노트북이 반드시 필요한가요?',
      answer: '개인 노트북 지참을 권장하며, 노트북이 없으신 경우 현장 실습용 기기 대여를 무상으로 지원합니다.'
    },
    {
      question: '수료 후에는 어떤 활동을 하게 되나요?',
      answer: '수료증 발급과 함께 2026년 하반기 천안시 소상공인 디지털 교육 현장 강사 및 보조 강사 매칭 인력풀에 정식 등록됩니다.'
    }
  ],

  // 문의 및 신청 [신청 링크 URL], [전화번호], [카카오톡 채널 링크], [주최 기관]
  contact: {
    phone: '041-550-2026',
    kakaoChannel: '@천안AI강사',
    kakaoUrl: 'https://pf.kakao.com',
    applyUrl: 'https://forms.gle/cheonan-ai-teacher',
    hostOrg: '천안시',
    producer: 'AI 발전연구소'
  }
};
