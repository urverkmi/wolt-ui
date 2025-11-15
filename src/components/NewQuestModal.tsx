import { useState } from 'react';
import { ChevronLeft, RefreshCw, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from '../imports/svg-ctym3pa70f';

interface Quest {
  id: number;
  title: string;
  deadline: string;
  reward: string;
  type: 'general' | 'daytrip';
  restaurants: {
    id: number;
    name: string;
    image: string;
    mealType: string;
    photos: string[];
  }[];
}

interface NewQuestModalProps {
  onClose: () => void;
  onAcceptQuest: (quest: Quest) => void;
}

export function NewQuestModal({ onClose, onAcceptQuest }: NewQuestModalProps) {
  const [questType, setQuestType] = useState<'general' | 'daytrip'>('general');

  const generalQuests: Quest[] = [
    {
      id: 3,
      title: 'Try 3 Asian Restaurants',
      deadline: 'Nov 15, 25',
      reward: '€20 coupon',
      type: 'general',
      restaurants: [],
    },
  ];

  const dayTripQuests: Quest[] = [
    {
      id: 4,
      title: 'Day Trip Food Adventure',
      deadline: 'Nov 15, 25',
      reward: '€20 coupon',
      type: 'daytrip',
      restaurants: [
        {
          id: 2,
          name: 'Ninnes Cafe',
          image: 'coffee shop breakfast',
          mealType: 'Breakfast',
          photos: ['coffee latte art', 'croissant pastry', 'avocado toast', 'pancakes'],
        },
        {
          id: 9,
          name: 'Ravintola Nepal',
          image: 'nepalese food',
          mealType: 'Lunch',
          photos: ['nepalese curry', 'momo dumplings', 'dal bhat', 'tandoori'],
        },
        {
          id: 10,
          name: 'Ravintola Lilla Sten',
          image: 'fine dining restaurant',
          mealType: 'Afternoon tea',
          photos: ['afternoon tea', 'scones', 'tea sandwiches', 'macarons'],
        },
      ],
    },
  ];

  const currentQuests = questType === 'general' ? generalQuests : dayTripQuests;
  const quest = currentQuests[0];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col" style={{ fontFamily: "'Baloo Tammudu 2', sans-serif" }}>
      {/* Map Background */}
      <div className="absolute left-0 right-0 top-0 bottom-0 mix-blend-luminosity pointer-events-none">
        <div className="absolute inset-0 opacity-80 overflow-hidden">
          <img 
            alt="Map" 
            className="absolute left-0 top-0 w-full h-[149%] max-w-none object-cover" 
            src="maps.png" 
          />
        </div>
      </div>

      {/* Top gradient overlay */}
      <div 
        className="absolute left-0 top-0 w-full h-[145px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, #FAFAFA 17.361%, rgba(250, 250, 250, 0) 70.833%)'
        }}
      />

      {/* Header with City Name */}
      <div className="absolute top-[58px] left-[24px] z-20">
        <h1 className="text-[30px] text-black" style={{ fontFamily: "'Baloo Tammudu', sans-serif" }}>
          New York
        </h1>
        <div className="flex items-center text-[12px] text-black mt-1">
          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 12 17">
            <path d={svgPaths.p2e671300} stroke="black" />
            <path d={svgPaths.pb022900} stroke="black" />
          </svg>
          <span>5 visits (ahead of 30% of users)</span>
        </div>
      </div>

      {/* Wrapped Button */}
      <div className="absolute top-[72px] right-[95px] z-20 pointer-events-auto">
        <div className="bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] h-[36px] px-[12px] flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 17 16">
            <path d={svgPaths.p23a92b00} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[12px] text-black">Wrapped</span>
        </div>
      </div>

      {/* Right side buttons */}
      <div className="absolute top-[120px] right-[19px] z-20 flex flex-col gap-3 pointer-events-auto">
        <button className="bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] w-[36px] h-[36px] flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 38 38">
            <path d={svgPaths.p21ba8600} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] w-[36px] h-[36px] flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 38 38">
            <path d={svgPaths.p2f6a7de0} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] w-[36px] h-[36px] flex items-center justify-center">
          <svg className="w-4 h-4" fill="black" viewBox="0 0 20 20">
            <path d={svgPaths.p17ddb280} />
          </svg>
        </button>
      </div>

      {/* Bottom Sheet - spans from top to bottom nav */}
      <div className="absolute top-0 left-0 right-0 bottom-[84px] bg-white rounded-t-[20px] z-30 overflow-hidden flex flex-col">
        {/* Handle */}
        <div className="w-[59px] h-[6px] bg-[#d9d9d9] rounded-full mx-auto mt-[5px] flex-shrink-0" />

        {/* Header with back button */}
        <div className="flex items-center px-[24px] pt-[18px] pb-[10px] flex-shrink-0 relative z-40">
          <button onClick={onClose} className="mr-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-[20px] flex-1">New Quests</h2>
          
          {/* Toggle */}
          <div className="relative inline-flex items-center bg-[#edf6fd] rounded-[5px] h-[26px] z-50">
            <button
              onClick={() => setQuestType('general')}
              className={`px-[20px] h-full rounded-[5px] text-[12px] transition-all relative z-50 ${
                questType === 'general'
                  ? 'bg-white text-[#009de0] shadow-sm'
                  : 'text-[#009de0]'
              }`}
              style={{ fontFamily: "'Baloo Tammudu 2', sans-serif", fontWeight: 600 }}
            >
              General
            </button>
            <svg className="w-3 h-3 mx-1 pointer-events-none" fill="none" viewBox="0 0 14 12">
              <path d={svgPaths.p3f627000} stroke="#009DE0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <button
              onClick={() => setQuestType('daytrip')}
              className={`px-[20px] h-full rounded-[5px] text-[12px] transition-all relative z-50 ${
                questType === 'daytrip'
                  ? 'bg-white text-[#009de0] shadow-sm'
                  : 'text-[#009de0]'
              }`}
              style={{ fontFamily: "'Baloo Tammudu 2', sans-serif", fontWeight: 600 }}
            >
              Day Trip
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-[24px] pb-[80px]">
          {/* Quest Card */}
          <div className="border border-[#d8d8d8] rounded-[12px] p-4 mb-4">
            {/* Deadline and Reward */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 bg-[#edf6fd] rounded-[100px] px-3 py-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p3f7b9ec0} stroke="#009DE0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p11785900} stroke="#009DE0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
                <span className="text-[14px] text-[#009de0]">
                  <span className="text-[0px]">dealine on </span>
                  {quest.deadline}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[20px]">🎁</span>
                <span className="text-[16px] text-[#009de0]" style={{ fontWeight: 600 }}>
                  {quest.reward}
                </span>
              </div>
            </div>

            {/* Timeline for Day Trip */}
            {quest.type === 'daytrip' && quest.restaurants.length > 0 && (
              <div className="relative">
                {/* Vertical blue line on the right */}
                <div className="absolute right-[5px] top-[18px] bottom-[18px] w-[5px] bg-[#009de0] rounded-full" />
                
                <div className="space-y-0">
                  {quest.restaurants.map((restaurant, idx) => (
                    <div key={restaurant.id}>
                      {/* Meal Type Badge */}
                      <div className="flex items-center mb-2">
                        <div className="w-[18px] h-[18px] relative mr-2">
                          <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="9" stroke="#009DE0" strokeDasharray="4 4" strokeWidth="2" />
                          </svg>
                        </div>
                        <div className="bg-[#009de0] h-[14px] rounded-[2px] px-[5px] flex items-center">
                          <span className="text-[10px] text-white">{restaurant.mealType}</span>
                        </div>
                      </div>

                      {/* Restaurant Card */}
                      <div className="mb-4 relative">
                        {/* Connecting line (except for last item) */}
                        {idx < quest.restaurants.length - 1 && (
                          <div className="absolute left-[9px] top-[60px] w-0 h-[112px] border-l-2 border-[#009de0]" />
                        )}
                        
                        <div className="flex items-start gap-3">
                          {/* Restaurant Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-[16px] text-black">{restaurant.name}</h3>
                              <button className="text-[10px] text-[#029ddf] underline whitespace-nowrap ml-2">
                                Show On Map
                              </button>
                            </div>

                            {/* Food Photos */}
                            <div className="bg-[#edf6fd] rounded-[2px] h-[49px] flex items-center gap-2 px-2">
                              {restaurant.photos.map((photo, photoIdx) => (
                                <div key={photoIdx} className="w-[35px] h-[35px] rounded-[5px] overflow-hidden flex-shrink-0">
                                  <ImageWithFallback
                                    src={`https://source.unsplash.com/200x200/?${photo}`}
                                    alt={`${restaurant.name} dish`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Quest (no restaurants) */}
            {quest.type === 'general' && (
              <div className="py-4">
                <p className="text-[12px] text-[#717374]">
                  Explore and try three different Asian restaurants in your city to complete this quest.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
          <button
            onClick={() => {/* Refresh quests */}}
            className="flex items-center justify-center gap-2 text-[#009de0]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 17 20">
              <path d={svgPaths.p2af8e060} stroke="#009DE0" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
              <path d={svgPaths.p261f5580} stroke="#009DE0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="text-[14px]">Refresh</span>
          </button>
          <button
            onClick={() => {
              onAcceptQuest(quest);
              onClose();
            }}
            className="flex-1 bg-[#009de0] text-white rounded-[1000px] shadow-[0px_1px_1px_0.1px_rgba(0,157,224,0.25)] h-[40px] flex items-center justify-center text-[14px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}