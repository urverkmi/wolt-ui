import { useState } from 'react';
import { X, RefreshCw, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
    cuisine: string;
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
      reward: '€15 coupon',
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
          name: 'Ravintola Nepal',
          image: 'nepalese food',
          cuisine: 'Nepalese',
        },
        {
          id: 9,
          name: 'Ninnes Cafe',
          image: 'cafe coffee pastries',
          cuisine: 'Coffee & Pastries',
        },
      ],
    },
  ];

  const currentQuests = questType === 'general' ? generalQuests : dayTripQuests;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto" style={{ fontFamily: "'Baloo Tammudu 2', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center">
        <button onClick={onClose} className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl flex-1">New Quests</h2>
        
        {/* Toggle */}
        <div className="relative inline-flex items-center bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setQuestType('general')}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              questType === 'general'
                ? 'bg-white text-[#009de0] shadow-sm'
                : 'text-gray-600'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setQuestType('daytrip')}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              questType === 'daytrip'
                ? 'bg-white text-[#009de0] shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Day Trip
          </button>
        </div>
      </div>

      {/* Quest Cards */}
      <div className="p-4 space-y-4">
        {currentQuests.map((quest, index) => (
          <div key={quest.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            {/* Quest Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#009de0]/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-xl">⏰</span>
                </div>
                <div>
                  <p className="text-sm text-[#009de0] mb-1">deadline on {quest.deadline}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🎁</span>
                    <span className="text-lg text-[#009de0]">{quest.reward}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Path - Only for Day Trip */}
            {quest.type === 'daytrip' && quest.restaurants.length > 0 && (
              <div className="mb-4 relative">
                {/* Connecting Line */}
                <div className="absolute left-[34px] top-[60px] bottom-[60px] w-0.5 border-l-2 border-dashed border-[#009de0]" />
                
                <div className="space-y-6">
                  {quest.restaurants.map((restaurant, idx) => (
                    <div key={restaurant.id} className="relative">
                      <div className="flex items-start space-x-4">
                        {/* Checkpoint Circle */}
                        <div className="relative z-10 w-[68px] h-[68px] border-4 border-dashed border-[#009de0] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={`https://source.unsplash.com/200x200/?${restaurant.image}`}
                              alt={restaurant.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Restaurant Details */}
                        <div className="flex-1 bg-gray-50 rounded-xl p-3 mt-2">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-10 h-10 rounded-lg overflow-hidden">
                                <img 
                                  src="restaurant.png" 
                                  alt={restaurant.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-bold">{restaurant.name}</h3>
                                <p className="text-xs text-gray-600">{restaurant.cuisine}</p>
                              </div>
                            </div>
                            <button className="text-xs text-[#009de0]">Show On Map</button>
                          </div>

                          {/* Food Photos */}
                          <div className="flex space-x-2 overflow-x-auto">
                            {[1, 2, 3, 4].map((photoIdx) => (
                              <div key={photoIdx} className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <ImageWithFallback
                                  src={`https://source.unsplash.com/200x200/?${restaurant.cuisine} food dish ${photoIdx}`}
                                  alt={`${restaurant.name} dish`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* End Checkpoint */}
                  <div className="relative z-10 w-[68px] h-[68px] border-4 border-dashed border-[#009de0] rounded-full bg-white ml-0" />
                </div>
              </div>
            )}

            {/* General Quest Description */}
            {quest.type === 'general' && (
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">{quest.title}</h3>
                <p className="text-sm text-gray-600">
                  Explore and try three different Asian restaurants in your city to complete this quest.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex space-x-3">
        <button
          onClick={() => {/* Refresh quests */}}
          className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-[#009de0] text-[#009de0]"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Refresh</span>
        </button>
        <button
          onClick={() => {
            onAcceptQuest(currentQuests[0]);
            onClose();
          }}
          className="flex-1 bg-[#009de0] text-white py-3 rounded-xl"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
