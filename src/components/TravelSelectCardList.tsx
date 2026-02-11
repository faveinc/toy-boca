'use client';
import * as React from "react";
import { CardItem } from '@/lib/mocks/travelCards'
// import { CARD_API } from '@/lib/api/travel';
type Props = {
    selectCard: number[];
    cardList: CardItem[];//데이터 가져옴
  };

const SelectedCardList = ({ selectCard, cardList }: Props) => {

    const selectedCards = React.useMemo(() => {
        return cardList.filter((card) => selectCard.includes(card.id));
      }, [selectCard, cardList]);

      return (
        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold mb-4">Travel Collection</h2>
    
          <ul className="space-y-3 flex gap-4">
            {selectedCards.map((card) => (
              <li key={card.id}className="p-4 border rounded-lg bg-stone-50"
              >
                <p className="font-medium">{card.destinationName}</p>
                <p className="text-sm text-stone-500 ">{card.info}</p>
                {/* <p className="text-xs text-stone-400">
                  {card.dateStart} ~ {card.dateEnd}
                </p> */}
              </li>
            ))}
          </ul>
        </div>
      );
  };
export default SelectedCardList;