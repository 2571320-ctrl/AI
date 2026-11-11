export interface Competency {
  id: string; // '01' ~ '07'
  number: string;
  name: string;
  tagline: string;
  scene: string;
}

export const COMPETENCIES: Competency[] = [
  {
    id: '01',
    number: '01',
    name: 'AI 리터러시',
    tagline: 'AI의 오류와 한계를 정확히 짚어내는 역량',
    scene: 'AI가 제시한 유동인구 통계 수치, 공식 공공 데이터 출처부터 먼저 대조합니다.'
  },
  {
    id: '02',
    number: '02',
    name: '윤리·개인정보',
    tagline: '고객과 매장의 소중한 정보를 철저히 지키는 역량',
    scene: '손님의 연락처가 적힌 엑셀 파일은 업로드하기 전 반드시 비식별화 처리를 거칩니다.'
  },
  {
    id: '03',
    number: '03',
    name: '눈높이 설명',
    tagline: '어려운 전문 용어를 친근한 일상 언어로 바꾸는 역량',
    scene: "'프롬프트 엔지니어링' 대신 'AI에게 보내는 상세한 주문서 작성법'으로 설명합니다."
  },
  {
    id: '04',
    number: '04',
    name: '실습 진행',
    tagline: '예기치 못한 돌발 상황에도 흔들림 없는 수업 역량',
    scene: '강의실 와이파이가 끊겨도 준비해둔 오프라인 대체 교안으로 차질 없이 수업을 이어갑니다.'
  },
  {
    id: '05',
    number: '05',
    name: '지역 이해',
    tagline: '천안 골목골목 상권 생태계를 꿰뚫어 보는 역량',
    scene: '두정동 대학가 카페와 원도심 전통시장은 수강생의 관심사와 실습 예시가 전혀 다릅니다.'
  },
  {
    id: '06',
    number: '06',
    name: '소통·공감',
    tagline: '수강생의 막연한 불안과 두려움을 먼저 경청하는 역량',
    scene: '"AI가 제 일자리를 빼앗는 건 아닐까요?"라는 사장님의 두려움에 깊은 공감부터 건넵니다.'
  },
  {
    id: '07',
    number: '07',
    name: '지속 학습',
    tagline: '급변하는 AI 최신 트렌드를 매달 발 빠르게 습득하는 역량',
    scene: '지난달 메뉴 인터페이스 위치가 이번 달 업데이트로 변경되어도 즉각 교안에 반영합니다.'
  }
];
