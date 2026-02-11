"use client";
import * as React from "react";
import { useState, useEffect } from 'react';
import TravelListTab from '@/src/components/TravelListTab';
import TravelCardList from '@/src/components/TravelCardList';
import SelectedCardList from '@/src/components/TravelSelectCardList';
import {TRAVEL_TABS} from '@/lib/mocks/travelTabs'
import {TRAVEL_CARDS} from '@/lib/mocks/travelCards'
import { getTravelApi } from '@/lib/api/travel';



export default function TripList() {

   const [activeRegion, setActiveRegion] = useState('all');//기본값으로 지정
   const [selectedId, setSelectedId] = useState<number[]>([]);//기본적으로 선택ID 없음

   const toggleSelectCard = (id: number) => {
    setSelectedId(prev =>
      prev.includes(id)
        ? prev.filter(v => v !== id)
        : [...prev, id]
    );
  };

  const [travelList, setTravelList] = useState([]);//배열형태

  useEffect(() => {
    const fetchData = async () => {
        const res = await getTravelApi();
        setTravelList(res.data)
    };
    fetchData();
  }, [],);


    return (
        <main className="min-h-screen w-full bg-[#fdfbf7] text-stone-800 font-['Nunito'] pb-20">
           <div className="ch-head pt-20 pb-12 px-6 text-center max-w-5xl mx-auto">
                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-3 block">Curated Travel Collection</span>
                <h1 className="text-5xl md:text-7xl text-[#1A1A1A] tracking-tight mb-6 font-serif">Discover Your Next Journey </h1>
                <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">Hand-picked destinations for the modern traveler. From hidden gems to iconic landmarks, explore the worlds most breathtaking places.</p>
           </div>
           <div className="ch-tab sticky top-0 z-20 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-stone-100 py-4 mb-12 shadow-sm">
                {/* 여행 스타일 분류 tab*/}
                <TravelListTab
                    tabList={travelList}
                    activeRegion={activeRegion}
                    onChange={setActiveRegion}
                />
                 {/*선택한 여행지 목록*/}
                 <SelectedCardList 
                    selectCard={selectedId} 
                    cardList={travelList}
                />
           </div>

           {/*여행지 리스트 목록*/}
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TravelCardList cardList={travelList} selectedId={selectedId} onSelect={toggleSelectCard}/>
           </div>

        </main>
    );
}