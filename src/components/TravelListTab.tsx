'use client';
import { useEffect } from 'react';
import { TabItem } from '@/lib/mocks/travelTabs'


type Props = {
  tabList: TabItem[];
  activeRegion: string;
  onChange: (region: string) => void; //클릭할때마다 클릭도니 region으로 상위 전달
};

const TravelListTab = ({ tabList, activeRegion, onChange}: Props) => {
 
    useEffect(()=>{
        console.log(`tabList:`, tabList);
    },[tabList])
  return (
    <div className="travel-list-tab max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   
      <div className="tab-list flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
        <div className="ic-filter flex-shrink-0 mr-2 text-stone-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-funnel w-4 h-4" aria-hidden="true" data-id="element-52"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path></svg>
        </div>
        {tabList.map((tabItem) => (
          <button
            key={tabItem.region}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                text-stone-500 hover:text-stone-800 hover:bg-stone-100
                ${activeRegion === tabItem.region ? 'active text-white shadow-md' : ''}
              `}
            onClick={() => onChange(tabItem.region)}
          >
            <div className={`
                absolute inset-0 rounded-full" data-id="element-54
                ${activeRegion === tabItem.region ? 'bg-stone-800 rounded-full' : ''}
                `}  
                style={{transform: 'none',transformOrigin: '50% 50% 0px'}}></div>
            <span className="relative z-10" data-id="element-55">{tabItem.region}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TravelListTab;
