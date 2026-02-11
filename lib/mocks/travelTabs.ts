export type TabItem = {
    id: string; 
    label: string; 
    region?: 'Asia' | 'Europe' | 'Africa' | 'America'; 
};
  
  export const TRAVEL_TABS: TabItem[] = [
    { id: 'all', label: '전체' },
    { id: 'asia', label: '아시아', region: 'Asia' },
    { id: 'europe', label: '유럽', region: 'Europe' },
    { id: 'africa', label: '아프리카', region: 'Africa' },
    { id: 'america', label: '아메리카', region: 'America' },
  ];
  