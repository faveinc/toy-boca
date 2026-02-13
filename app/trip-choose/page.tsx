"use client";
import * as React from "react";
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import TravelListTab from '@/src/components/travel/TravelListTab';
import TravelCardList from '@/src/components/travel/TravelCardList';
import SelectedCardList from '@/src/components/travel/TravelSelectCardList';
import Link from 'next/link';
import { DateRangeDisplay } from '@/src/components/common/DateFormat';
import { getTravelApi } from '@/lib/travel/api';
import { TravelCardApi, TabItem, TravelRegion } from '@/lib/travel/types';
import { isDateRangeOverlapping } from '@/lib/travel/utils';



export default function TripList() {
   const searchParams = useSearchParams();
   
   // URL에서 날짜 파라미터 가져오기
   const startDate = searchParams.get('startDate');
   const endDate = searchParams.get('endDate');

   const [activeRegion, setActiveRegion] = useState('ALL');//tab 기본값으로 지정 | 자식으로부터 변경시 업데이트 
   const [selectedId, setSelectedId] = useState<number[]>([]);//기본적으로 선택ID 없음
   const [travelList, setTravelList] = useState<TravelCardApi[]>([]);//배열형태

   // TravelRegion 타입의 모든 값으로 탭 리스트 생성
   const tabList = useMemo<TabItem[]>(() => {
     const regions: TravelRegion[] = ['ASIA', 'EUROPE', 'AFRICA', 'AMERICA'];
     return [
       { region: 'ALL' },
       ...regions.map(region => ({ region }))
     ];
   }, []);

   // 선택한 날짜 기간에 맞는 여행지만 필터링
   const filteredTravelList = useMemo<TravelCardApi[]>(() => {
     if (!startDate || !endDate) {
       // 날짜가 선택되지 않았으면 전체 리스트 반환
       return travelList;
     }

     return travelList.filter(travel => {
       if (!travel.date_start || !travel.date_end) return false;
       return isDateRangeOverlapping(
         travel.date_start,
         travel.date_end,
         startDate,
         endDate
       );
     });
   }, [travelList, startDate, endDate]);

   const toggleSelectCard = (id: number) => {
    setSelectedId(prev =>
      prev.includes(id)
        ? prev.filter(v => v !== id)
        : [...prev, id]
    );
  };

  // trip-manage 페이지로 이동할 URL 생성
  const getTripManageUrl = () => {
    const params = new URLSearchParams();
    
    // 선택된 인덱스 전달
    if (selectedId.length > 0) {
      params.set('selectedIds', selectedId.join(','));
    }
    
    // 날짜 정보도 함께 전달
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    
    return `/trip-manage?${params.toString()}`;
  };



  useEffect(() => {
    const fetchData = async () => {
        const res = await getTravelApi();
        if (res && res.data) {
          setTravelList(res.data);
        } else if (Array.isArray(res)) {
          // API가 직접 배열을 반환하는 경우
          setTravelList(res);
        }
    };
    fetchData();
  }, []);


    return (
        <main className="min-h-screen w-full bg-[#fdfbf7] text-stone-800 font-['Nunito'] pb-20">
           <div className="ch-head pt-20 pb-12 px-6 text-center max-w-5xl mx-auto">
                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-3 block">Curated Travel Collection</span>
                <h1 className="text-5xl md:text-7xl text-[#1A1A1A] tracking-tight mb-6 font-serif">Discover Your Next Journey </h1>
                <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">Hand-picked destinations for the modern traveler. From hidden gems to iconic landmarks, explore the worlds most breathtaking places.</p>
                {startDate && endDate && (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="text-stone-600 text-sm">선택한 여행 기간:</div>
                    <DateRangeDisplay 
                      startDate={startDate} 
                      endDate={endDate}
                      showIcon={false}
                      separator=" ~ "
                      className="text-stone-700"
                    />
                    <Link 
                      href="/trip-calendar"
                      className="ml-2 text-blue-600 hover:text-blue-700 text-sm underline underline-offset-2 transition-colors"
                    >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="lucide lucide-calendar w-3.5 h-3.5 mr-1.5 text-stone-400"
                        aria-hidden="true"
                        >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                        </svg>
                    </Link>
                  </div>
                )}
           </div>
           <div className="ch-tab sticky top-0 z-20 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-stone-100 py-4 mb-12 shadow-sm">
                {/* 여행 스타일 분류 tab*/}
                <TravelListTab
                    tabList={tabList}
                    activeRegion={activeRegion}
                    onChange={setActiveRegion}
                />
                 {/*선택한 여행지 목록*/}
                 <SelectedCardList 
                    selectCard={selectedId}//
                    cardList={filteredTravelList}
                 />
                 {selectedId.length > 0 && (
                   <div className="mt-4 text-center">
                     <Link 
                       href={getTripManageUrl()}
                       className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                     >
                       여행 일정 바로가기 ({selectedId.length})
                     </Link>
                   </div>
                 )}
           </div>

           {/*여행지 리스트 목록*/}
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TravelCardList 
                cardList={filteredTravelList} 
                selectedId={selectedId} //선택한 아이디 selectedId로 전달
                onSelect={toggleSelectCard} 
                activeRegion={activeRegion}/>
           </div>

        </main>
    );
}