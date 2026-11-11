export interface QuizQuestion {
  id: number;
  questionNumber: string;
  situation: string;
  options: {
    label: string; // 'A', 'B', 'C'
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionNumber: '01',
    situation: '사장님이 고객 전화번호가 담긴 엑셀 명단을 통째로 AI에 업로드하려 합니다.',
    options: [
      { label: 'A', text: '작업의 편의를 위해 그대로 두도록 둔다', isCorrect: false },
      { label: 'B', text: '고객 이름과 연락처 등 개인정보를 반드시 지우고 업로드하도록 안내한다', isCorrect: true },
      { label: 'C', text: '보안 사고가 우려되므로 향후 모든 AI 도구 사용을 전면 금지한다', isCorrect: false }
    ],
    explanation: '무조건 사용을 막는 대신, 개인정보를 안전하게 보호하며 활용하는 실무 원칙을 현장에서 직접 보여주세요.'
  },
  {
    id: 2,
    questionNumber: '02',
    situation: '강의 시작 10분 만에 교육장 와이파이 인터넷 연결이 갑자기 끊어졌습니다.',
    options: [
      { label: 'A', text: '인터넷 연결이 다시 복구될 때까지 기다린다', isCorrect: false },
      { label: 'B', text: '미리 준비한 스마트폰 핫스팟, 시연 녹화 영상, 인쇄 실습지로 수업을 이어간다', isCorrect: true },
      { label: 'C', text: '진행이 어려우므로 오늘 강의를 다음 일정으로 연기한다', isCorrect: false }
    ],
    explanation: '돌발 상황에 대응할 수 있는 든든한 플랜 B는 사전에 철저히 준비한 강사만이 가동할 수 있습니다.'
  },
  {
    id: 3,
    questionNumber: '03',
    situation: 'AI가 작성해 준 "천안 최고 1위 맛집"이라는 문구를 전단지 인쇄물에 그대로 쓰려 합니다.',
    options: [
      { label: 'A', text: 'AI가 자동으로 작성해 준 내용이므로 그대로 써도 문제없다', isCorrect: false },
      { label: 'B', text: '객관적 근거 없는 최상급 표현은 과장 광고 소지가 있으므로 사실에 기반한 매장 스토리로 수정한다', isCorrect: true },
      { label: 'C', text: '법적 책임을 피하기 위해 하단 구석에 아주 작은 글씨로 표기한다', isCorrect: false }
    ],
    explanation: 'AI가 작성한 문구라 하더라도 법적·사회적 최종 책임은 게시자 본인에게 있으므로 정확한 사전 검증이 필수입니다.'
  }
];
