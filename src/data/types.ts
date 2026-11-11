export interface InstructorType {
  id: string; // '01' ~ '07'
  number: string;
  name: string;
  nickname: string;
  description: string;
  weapon: string;
  growth: {
    targetCompetencyId: string;
    targetName: string;
    action: string;
  };
  bestScene: string;
}

export const INSTRUCTOR_TYPES: Record<string, InstructorType> = {
  '01': {
    id: '01',
    number: '01',
    name: '검증하는 탐정형',
    nickname: 'AI의 거짓말을 잡아내는 강사',
    description: 'AI의 답변을 그대로 믿지 않고 출처와 근거를 꼼꼼히 확인합니다. 사장님들이 잘못된 정보로 손해 보지 않도록 든든하게 지켜주는 강사입니다.',
    weapon: '철저한 검증 습관',
    growth: {
      targetCompetencyId: '06',
      targetName: '06 소통·공감',
      action: '틀린 점을 짚을 때 "좋은 시도였어요"라는 격려를 먼저 건네보기'
    },
    bestScene: '상권 데이터 분석 및 메뉴 가격 결정 강의'
  },
  '02': {
    id: '02',
    number: '02',
    name: '든든한 수문장형',
    nickname: '사장님과 고객의 정보를 지키는 강사',
    description: '일의 편리함보다 보안과 안전을 먼저 챙깁니다. 고객 개인정보 유출과 저작권 침해 사고를 사전에 차단해 주는 믿음직한 강사입니다.',
    weapon: '사전 위험 감지력',
    growth: {
      targetCompetencyId: '03',
      targetName: '03 눈높이 설명',
      action: "주의사항을 '금지' 대신 '이렇게 하면 안전해요'로 바꿔 말하기"
    },
    bestScene: '매장 홍보물 제작 및 고객 관리 실무 강의'
  },
  '03': {
    id: '03',
    number: '03',
    name: '친절한 번역가형',
    nickname: '어려운 AI를 우리말로 바꾸는 강사',
    description: '어려운 기술 전문 용어를 일상 속 친근한 비유로 풀어냅니다. 수강생들의 "아, 그게 바로 그거였군요!" 하는 감탄과 이해를 이끌어내는 강사입니다.',
    weapon: '친근한 비유와 실전 예시',
    growth: {
      targetCompetencyId: '01',
      targetName: '01 AI 리터러시',
      action: '쉬운 설명 속에서도 AI의 한계와 주의점을 한 줄씩 짚어주기'
    },
    bestScene: 'AI를 처음 접하는 소상공인 입문 기초 강의'
  },
  '04': {
    id: '04',
    number: '04',
    name: '현장 해결사형',
    nickname: '어떤 돌발 상황도 수업으로 바꾸는 강사',
    description: '강의실 와이파이가 끊기거나 로그인이 막혀도 당황하지 않습니다. 미리 준비한 꼼꼼한 플랜 B로 수업의 흐름을 든든하게 지켜냅니다.',
    weapon: '현장 위기 대응력',
    growth: {
      targetCompetencyId: '07',
      targetName: '07 지속 학습',
      action: '매주 30분씩 최신 AI 도구 업데이트 확인 시간 정해두기'
    },
    bestScene: '수강 인원이 많고 실습 비중이 높은 집합 강의'
  },
  '05': {
    id: '05',
    number: '05',
    name: '천안 토박이형',
    nickname: '우리 동네 골목 상권을 꿰뚫는 강사',
    description: '신부동 카페거리, 두정동 먹자골목, 원도심 전통시장의 장사 방식이 어떻게 다른지 잘 압니다. 같은 기능도 사장님 매장에 꼭 맞는 예시로 맞춤 제안합니다.',
    weapon: '지역 상권 공감 감각',
    growth: {
      targetCompetencyId: '02',
      targetName: '02 윤리·개인정보',
      action: '매장별 실습용 가상 데이터를 사전에 안전하게 준비해두기'
    },
    bestScene: '상인회 및 업종별 맞춤형 특화 강의'
  },
  '06': {
    id: '06',
    number: '06',
    name: '마음 여는 상담가형',
    nickname: '막연한 두려움을 자신감으로 바꾸는 강사',
    description: '질문하기를 주저하는 사장님들의 마음을 편안하게 열어주고, 작은 성공도 함께 기뻐합니다. "나도 할 수 있네!"라는 성취감을 선물하는 강사입니다.',
    weapon: '따뜻한 공감과 경청',
    growth: {
      targetCompetencyId: '04',
      targetName: '04 실습 진행',
      action: '강의 시작 전 수강생 기기와 동일한 환경으로 사전 리허설하기'
    },
    bestScene: '시니어 소상공인 및 디지털 초보자 대상 강의'
  },
  '07': {
    id: '07',
    number: '07',
    name: '늘 배우는 탐험가형',
    nickname: '매달 새로운 실무 팁으로 발전하는 강사',
    description: '새롭게 업데이트되는 AI 기능을 누구보다 먼저 연구하고 교안에 반영합니다. 수강생 사장님들께 항상 지금 당장 쓸 수 있는 가장 유용한 팁을 알려줍니다.',
    weapon: '발 빠른 최신 트렌드 습득력',
    growth: {
      targetCompetencyId: '05',
      targetName: '05 지역 이해',
      action: '새로운 기능을 익힐 때마다 천안 지역 매장 적용 사례를 하나씩 연구해보기'
    },
    bestScene: '최신 AI 도구 활용 심화 실습 강의'
  }
};
