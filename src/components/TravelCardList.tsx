'use client';
import * as React from "react";
import { useEffect } from 'react';
// import { CardItem } from '@/lib/mocks/travelCards'
import TravelCard from '@/src/components/TravelCard'

type CardItem = {
    destinationId: string;
    destinationName: string;
    dateStart: string;
    dateEnd: string;
    region: string;
    country: string;
    memo: string;
    description: string;
    isConfirmed: boolean;
    imageUrl: string;
    createdAt: string;
  };

type Props = {
    cardList: CardItem[];
    selectedId: number[];               // 선택된 카드 id 배열
    onSelect: (id: number) => void;
    // selectedId: number; //선택한 카드 id 배열
    // onSelect: (id: number) => void;//onSelect
};

const TravelCardList = ({ cardList , selectedId , onSelect }: Props) => {


    useEffect(()=>{
        cardList.map((item, index) => {
            console.log(`index ${index}:`, item);
            return null; // React에서는 반환값 필요, 콘솔만 찍을거면 null
          });

    },[cardList])

    return (
        <div className="travel-card-list flex flex-wrap gap-8 justify-center">
            {cardList.map((item,index) => (
                <TravelCard key={index} index={index} cardItem={item}  isSelected={selectedId.includes(index)} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default TravelCardList;
