export type CardItem = {
    id: number; 
    imageUrl:string;
    destinationId:string;
    destinationName:string;
    dateStart:string;
    dateEnd:string;
    info:string;
    memo:string;
    region:string;
};
export const TRAVEL_CARDS: CardItem[] = [
    {
      id: 1,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'Japan',
      destinationName: 'Tokyo',
      dateStart: '2026-01-01',
      dateEnd: '2026-01-05',
      info: '도쿄 여행',
      memo: '임시 데이터',
      region: 'asia',
    },
    {
      id: 2,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'Japan',
      destinationName: 'Osaka',
      dateStart: '2026-02-10',
      dateEnd: '2026-02-15',
      info: '오사카 먹방 여행',
      memo: '타코야끼 필수',
      region: 'asia',
    },
    {
      id: 3,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'France',
      destinationName: 'Paris',
      dateStart: '2026-03-01',
      dateEnd: '2026-03-07',
      info: '파리 문화 여행',
      memo: '루브르 박물관',
      region: 'europe',
    },
    {
      id: 4,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'Italy',
      destinationName: 'Rome',
      dateStart: '2026-04-12',
      dateEnd: '2026-04-18',
      info: '로마 역사 여행',
      memo: '콜로세움',
      region: 'europe',
    },
    {
      id: 5,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'Egypt',
      destinationName: 'Cairo',
      dateStart: '2026-05-05',
      dateEnd: '2026-05-10',
      info: '이집트 피라미드 여행',
      memo: '사막 투어',
      region: 'africa',
    },
    {
      id: 6,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'South Africa',
      destinationName: 'Cape Town',
      dateStart: '2026-06-01',
      dateEnd: '2026-06-08',
      info: '자연 풍경 여행',
      memo: '테이블 마운틴',
      region: 'africa',
    },
    {
      id: 7,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'USA',
      destinationName: 'New York',
      dateStart: '2026-07-10',
      dateEnd: '2026-07-15',
      info: '뉴욕 시티 여행',
      memo: '타임스퀘어',
      region: 'america',
    },
    {
      id: 8,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'USA',
      destinationName: 'Los Angeles',
      dateStart: '2026-08-01',
      dateEnd: '2026-08-06',
      info: 'LA 자유 여행',
      memo: '할리우드',
      region: 'america',
    },
    {
      id: 9,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'Thailand',
      destinationName: 'Bangkok',
      dateStart: '2026-09-03',
      dateEnd: '2026-09-07',
      info: '방콕 휴양 여행',
      memo: '마사지 필수',
      region: 'asia',
    },
    {
      id: 10,
      imageUrl: '/images/temp-card.jpg',
      destinationId: 'Spain',
      destinationName: 'Barcelona',
      dateStart: '2026-10-10',
      dateEnd: '2026-10-16',
      info: '바르셀로나 예술 여행',
      memo: '가우디 투어',
      region: 'europe',
    },
  ];
  
  