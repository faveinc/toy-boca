export type TravelCardApi = {
    id?: string;
    region: 'ASIA' | 'EUROPE' | 'AFRICA' | 'AMERICA';
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
  
  export type TravelCardApiResponse = {
    success: boolean;
    data: TravelCardApi[];
  };
  