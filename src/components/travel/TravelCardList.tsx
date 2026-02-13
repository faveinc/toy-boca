'use client';
import * as React from "react";
// import { CardItem } from '@/lib/mocks/travelCards'
import TravelCard from '@/src/components/travel/TravelCard'
import { TravelCardApi } from '@/lib/travel/types';


type Props = {
    cardList: TravelCardApi[];
    selectedId: number[];// 선택된 카드 id 배열
    onSelect: (id: number) => void;
    activeRegion: string; // 활성화된 region 필터
};

const TravelCardList = ({ cardList , selectedId , onSelect, activeRegion }: Props) => {

    //cardList의 데이터중 region과 activeRegion 이 일치하는것만 뿌려주기 
    let filterCardList = cardList;
    //근데 activeRegion 이 ALL 이면 모든 데이터를 뿌려주기 
    if (activeRegion === 'ALL') {
        filterCardList = cardList;
    } else {
        filterCardList = cardList.filter((cardItem) => cardItem.region === activeRegion);
    }

    return (
        <div className="travel-card-list flex flex-wrap gap-4 justify-center">
            {filterCardList.map((cardItem, index) => (
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
