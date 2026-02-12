'use client';
import * as React from "react";
import { useEffect } from 'react';
// import { CardItem } from '@/lib/mocks/travelCards'
import TravelCard from '@/src/components/TravelCard'
import { TravelCardApi } from '@/types/travel';


type Props = {
    cardList: TravelCardApi[];
    selectedId: number[];// 선택된 카드 id 배열
    onSelect: (id: number) => void;
    activeRegion: string; // 활성화된 region 필터
};

const TravelCardList = ({ cardList , selectedId , onSelect, activeRegion }: Props) => {


    return (
        <div className="travel-card-list flex flex-wrap gap-8 justify-center">
            {cardList.map((cardItem, index) => (
                <TravelCard 
                    key={index} 
                    index={index} 
                    cardItem={cardItem}  
                    isSelected={selectedId.includes(index)} 
                    onSelect={onSelect} 
                />
            ))}
        </div>
    );
};

export default TravelCardList;
