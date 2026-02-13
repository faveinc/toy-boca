'use client';
import * as React from "react";
import { TravelCardApi } from '@/lib/travel/types';
// import { CARD_API } from '@/lib/api/travel';
type Props = {
    selectCard: number[];
    cardList: TravelCardApi[];//데이터 가져옴
  };

const SelectedCardList = ({ selectCard, cardList }: Props) => {

    const selectedCards = React.useMemo(() => {
        // selectCard는 인덱스 배열이므로, 해당 인덱스의 카드들과 인덱스를 함께 반환
        return selectCard
          .map((index) => ({ card: cardList[index], index }))
          .filter((item) => item.card !== undefined); // undefined 제거
      }, [selectCard, cardList]);   

      return (
        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold mb-4">Travel Collection</h2>
    
          <ul className="space-y-3 flex gap-4">
            {selectedCards.map(({ card, index }) => (
              <li key={card.id || `selected-${index}`} className="p-4 border rounded-lg bg-stone-50"
              >
                <p className="font-medium">{card.destination_name}</p>
                <p className="text-sm text-stone-500">{card.country}</p>
                {/* <p className="text-xs text-stone-400">
                  {card.date_start} ~ {card.date_end}
                </p> */}
              </li>
            ))}
          </ul>
          <div></div>
        </div>
      );
  };
export default SelectedCardList;