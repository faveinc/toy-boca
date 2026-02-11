'use client';
import * as React from "react";
import { useEffect } from 'react';
import { CardItem } from '@/lib/mocks/travelCards'
import TravelCard from '@/src/components/TravelCard'

type Props = {
    cardList: CardItem[];
    selectedId: number[]; //선택한 카드 id 배열
    onSelect: (id: number) => void;//onSelect
};

const TravelCardList = ({ cardList , selectedId , onSelect }: Props) => {

    useEffect(() => {
        console.log('클릭된 카드 !:', selectedId,onSelect);
    }, [selectedId,onSelect]); // cardList가 바뀔 때마다 호출됨

    return (
        <div className="travel-card-list flex flex-wrap gap-8 justify-center">
            {cardList.map((card) => (
                <TravelCard key={card.id} cardItem={card} isSelected={selectedId.includes(card.id)} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default TravelCardList;
