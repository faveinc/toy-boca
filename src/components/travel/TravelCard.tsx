'use client';
import Image from 'next/image';
import { useState } from 'react';
import { TravelCardApi } from '@/lib/travel/types';
import { getSafeImageUrl } from '@/lib/travel/utils';
import { DateRangeDisplay } from '../common/DateFormat';

type Props = {
  cardItem: TravelCardApi;
  index: number;         
  isSelected: boolean;
  onSelect: (id: number) => void;
};


  const TravelCard = ({ cardItem,index, isSelected, onSelect  }: Props) => {
    const [memo, setMemo] = useState(cardItem.memo || "");
    const imageUrl = getSafeImageUrl(cardItem.image_url);

    return (
      <article
        className={`travel-card group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ${
          isSelected 
            ? 'outline-2 outline-blue-500 shadow-md outline-2 outline-blue-200' 
            : 'outline-none'
        }`}
        onClick={() => onSelect(index)} 
      >
        <div className="img-wrap h-48 w-full relative overflow-hidden" style={{background: 'linear-gradient(135deg, rgb(75, 108, 183), rgb(24, 40, 72))'}}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={cardItem.destination_name || '여행지 이미지'}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
            </div>
          )}
        </div>
        <div className="txt-wrap p-5 flex-1 flex flex-col">
            <div className="destination mb-2">
                <h3 className='font-[`DM_Serif_Display`] text-2xl text-stone-900 leading-tight'>{cardItem.destination_name}</h3>
                <div className='flex items-center text-stone-500 text-sm mt-1 font-[`Nunito`]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-3.5 h-3.5 mr-1" aria-hidden="true" data-id="element-32"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {cardItem.country}
                </div>
            </div>
            {cardItem.description && (
                <p className="info text-stone-600 text-sm leading-relaxed mb-4 font-['Nunito'] line-clamp-2">{cardItem.description}</p>
            )}
            <DateRangeDisplay 
              startDate={cardItem.date_start} 
              endDate={cardItem.date_end}
              showIcon={true}
              separator=" ~ "
            />
            {/* <textarea
                className="w-full pt-2 mt-4 border-t border-stone-100 text-stone-500 placeholder:text-stone-300 resize-none"
                placeholder={cardItem.memo || "메모를 입력하세요..."}
                value={memo}     
                onChange={(e) => setMemo(e.target.value)}
            /> */}
        </div>
      </article>
    );
  };
  

export default TravelCard;
