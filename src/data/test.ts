export interface TestOption {
  text: string;
  competencyId: string; // '01' ~ '07'
}

export interface TestQuestion {
  id: number;
  questionNumber: string; // "01" ~ "07"
  question: string;
  options: TestOption[];
}

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    questionNumber: '01',
    question: '새로운 AI 도구가 출시되었다는 소식을 들었을 때 나의 첫 행동은?',
    options: [
      { text: '직접 사용해 보며 어디서 오류나 한계가 생기는지 먼저 확인한다', competencyId: '01' },
      { text: '이번 주 안에 주요 기능을 정리하여 나만의 학습 노트를 작성한다', competencyId: '07' },
      { text: '우리 동네 사장님들이 실무에 바로 활용할 수 있을지 먼저 가늠해 본다', competencyId: '05' }
    ]
  },
  {
    id: 2,
    questionNumber: '02',
    question: '수강생 사장님이 같은 질문을 세 번째 반복해서 하신다면?',
    options: [
      { text: '이전 설명과 다른 친근한 일상 비유를 들어 다시 차근차근 설명한다', competencyId: '03' },
      { text: '혹시 조급하거나 불안하신 것은 아닌지 수강생의 표정을 먼저 살핀다', competencyId: '06' },
      { text: '옆자리 짝꿍과 함께 짝을 지어 직접 해보실 수 있도록 돕는다', competencyId: '04' }
    ]
  },
  {
    id: 3,
    questionNumber: '03',
    question: '강의 자료를 준비할 때 내가 가장 엄격하게 신경 쓰는 부분은?',
    options: [
      { text: '교안에 인용된 모든 통계와 수치에 명확한 출처와 근거가 있는가', competencyId: '01' },
      { text: '실습용 샘플 데이터에 고객의 실제 개인정보가 포함되지 않았는가', competencyId: '02' },
      { text: '사장님들이 운영하시는 가게의 현장 이야기로 바로 연결되는가', competencyId: '05' }
    ]
  },
  {
    id: 4,
    questionNumber: '04',
    question: '강의 당일 아침, 교육장에 도착하여 가장 먼저 챙기는 일은?',
    options: [
      { text: '교육장 환경에서 사전 리허설을 진행하고 만약의 사태를 위한 플랜 B를 점검한다', competencyId: '04' },
      { text: '사용할 AI 도구의 화면이나 최신 인터페이스에 변경 사항이 없는지 확인한다', competencyId: '07' },
      { text: '오늘 참석하시는 수강생분들의 업종과 매장 현황 리스트를 다시 훑어본다', competencyId: '05' }
    ]
  },
  {
    id: 5,
    questionNumber: '05',
    question: '수강생이 "AI가 결국 우리 일자리를 빼앗는 건 아닌가요?"라고 묻는다면?',
    options: [
      { text: '"그런 걱정이 드시는 게 당연합니다"라며 두려운 마음에 먼저 깊이 공감한다', competencyId: '06' },
      { text: '반복되는 잡무 시간을 획기적으로 줄여주는 실용적인 실습을 직접 보여준다', competencyId: '03' },
      { text: 'AI가 잘하는 영역과 사람만이 할 수 있는 고유한 가치를 명확히 짚어준다', competencyId: '01' }
    ]
  },
  {
    id: 6,
    questionNumber: '06',
    question: '수강생이 AI로 만든 홍보 이미지가 유명 상업 캐릭터와 지나치게 닮았다면?',
    options: [
      { text: '상업적으로 사용할 경우 저작권 침해 위험이 있음을 안내하고 다시 제작한다', competencyId: '02' },
      { text: '왜 이러한 유사 이미지가 생성되었는지 AI 학습 원리와 한계를 설명한다', competencyId: '01' },
      { text: '해당 매장만의 독창적인 스토리를 담은 브랜드 이미지로 함께 수정해 본다', competencyId: '03' }
    ]
  },
  {
    id: 7,
    questionNumber: '07',
    question: '모든 강의 일정이 성공적으로 끝난 뒤 나의 마무리 루틴은?',
    options: [
      { text: '수강생분들께 따뜻한 감사 인사와 함께 복습용 추가 자료를 챙겨 보낸다', competencyId: '06' },
      { text: '실습 과정에서 전달받은 수강생들의 파일과 개인정보를 즉시 안전하게 파기한다', competencyId: '02' },
      { text: '오늘 수업 중 막혔던 부분을 꼼꼼히 기록하여 다음 교안을 즉각 보완한다', competencyId: '07' }
    ]
  }
];
