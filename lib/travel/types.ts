// 여행지 지역 타입
export type TravelRegion = 'ASIA' | 'EUROPE' | 'AFRICA' | 'AMERICA';

export type TravelCardApi = {
    id?: string;
    region: TravelRegion;
    country: string;
    destination_name: string;
    date_start: string;
    date_end: string;
    memo?: string;
    description?: string;
    is_confirmed: boolean;
    image_url: string;
    createdat?: string;
  };

// 탭 아이템 타입 (필터링용 'ALL' 포함)
export type TabItem = {
    region: TravelRegion | 'ALL';
};

