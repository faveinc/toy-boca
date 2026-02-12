'use client';
import Image from 'next/image';
import { useState } from 'react';
import { TravelCardApi } from '@/types/travel';

type Props = {
  cardItem: TravelCardApi;
  index: number;         
  isSelected: boolean;
  onSelect: (id: number) => void;
};


  const TravelCard = ({ cardItem,index, isSelected, onSelect  }: Props) => {
    const [memo, setMemo] = useState(cardItem.memo || "");

    return (
      <article
        className="travel-card group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-stone-100 flex flex-col h-full"
        onClick={() => onSelect(index)} 
      >
        <div className="img-wrap h-48 w-full relative overflow-hidden" style={{background: 'linear-gradient(135deg, rgb(75, 108, 183), rgb(24, 40, 72))'}}>
          {/* <Image
            src={cardItem.image_url}
            alt={''}
            width={300}
            height={200}
          /> */}
        </div>
        <div className="txt-wrap p-5 flex-1 flex flex-col">
            <div className="destination mb-2">
                <h3 className='font-[`DM_Serif_Display`] text-2xl text-stone-900 leading-tight'>{cardItem.country}</h3>
                <div className='flex items-center text-stone-500 text-sm mt-1 font-[`Nunito`]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-3.5 h-3.5 mr-1" aria-hidden="true" data-id="element-32"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {cardItem.country}
                </div>
            </div>
            {cardItem.description && (
                <p className="info text-stone-600 text-sm leading-relaxed mb-4 font-['Nunito'] line-clamp-2">{cardItem.description}</p>
            )}
            <div className="date flex items-center text-xs text-stone-500 font-semibold uppercase tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar w-3.5 h-3.5 mr-1.5 text-stone-400" aria-hidden="true" data-id="element-38"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                <div className="startDate">{cardItem.date_start}</div>
                <div className="endDate ml-4">{cardItem.date_end}</div>
            </div>
            <textarea
                className="w-full pt-2 mt-4 border-t border-stone-100 text-stone-500 placeholder:text-stone-300 resize-none"
                placeholder={cardItem.memo || "메모를 입력하세요..."}
                value={memo}     
                onChange={(e) => setMemo(e.target.value)}
            />
        </div>
      </article>
    );
  };
  

export default TravelCard;
