import { useEffect, useState } from 'react';
import { MapPin, Coffee, UtensilsCrossed, ShoppingBag, Camera, Share2, Award, Sparkles, ChevronDown, ChevronUp, Filter, Navigation } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NewQuestModal } from './NewQuestModal';
import { OrderConfirmation } from './OrderConfirmation';
import { FoodLocation, PlaceType } from '../types.ts'
import { fetchFoodLocations } from "../services/locations";

import mapImage from '../assets/map.png';
import cafeIcon from '../assets/cafe.png';
import restaurantIcon from '../assets/restaurant.png';
import badgeIcon from '../assets/badge.png';


const iconMap: Record<string, string> = {
  restaurant: restaurantIcon,
  cafe: cafeIcon
};


export function CityView() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showWrapped, setShowWrapped] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'quests' | null>(null);
  const [highlightedQuestId, setHighlightedQuestId] = useState<number | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<PlaceType[]>(['restaurant', 'cafe', 'bar', 'store']);
  const [showNewQuestModal, setShowNewQuestModal] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderLocation, setOrderLocation] = useState<FoodLocation | null>(null);

  const cityName = 'New York';
  
  // fetching restaurants
  const [foodLocations, setLocations] = useState<FoodLocation[]>([]);
  const userId = 1;  // or get from auth

  useEffect(() => {
    fetchFoodLocations(userId, 1.0, 1.0, 5.0)
      .then(setLocations)
      .catch(err => console.error(err));
  }, []);

  const activeQuests = [
    {
      id: 1,
      title: 'Try a Locally-Owned Business',
      progress: 0,
      total: 1,
      reward: '15% off',
      targetLocations: [1, 2],
    },
    {
      id: 2,
      title: 'Visit 3 Pet-Friendly Cafes',
      progress: 1,
      total: 3,
      reward: '$10 coupon',
      targetLocations: [2],
    },
  ];

  const visitedLocations = foodLocations.filter(loc => loc.visited);
  
  const questTargetLocations = highlightedQuestId 
    ? foodLocations.filter(loc => 
        activeQuests.find(q => q.id === highlightedQuestId)?.targetLocations.includes(loc.id)
      )
    : [];
  
  const displayedLocations = [
    ...visitedLocations.filter(loc => selectedTypes.includes(loc.type)),
    ...questTargetLocations.filter(loc => 
      !loc.visited && selectedTypes.includes(loc.type)
    ),
    ...foodLocations
  ];

  console.log(displayedLocations);

  const toggleType = (type: PlaceType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const wrappedStats = {
    totalVisits: visitedLocations.length,
    topPlace: visitedLocations.sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0))[0],
    totalPhotos: 24,
  };

  return (
    <div
      className="relative w-full h-full bg-white"
      style={{ fontFamily: "'Baloo Tammudu 2', sans-serif" }}
    >
      {/* Keyframe animation for breathing effect */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.3; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      {/* Map Background */}
      <div className="absolute left-0 right-0 top-0 bottom-[150px] mix-blend-luminosity">
        <div className="absolute inset-0 opacity-80 overflow-hidden">
          <img
            alt="Map"
            className="absolute left-0 top-0 w-full h-[149%] max-w-none object-cover"
            src={mapImage}
          />
        </div>
      </div>

      {/* Top gradient overlay */}
      <div
        className="absolute left-0 top-0 w-full h-[145px] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, #FAFAFA 17.361%, rgba(250, 250, 250, 0) 70.833%)',
        }}
      />

      {/* City Name Header */}
      <div className="absolute top-[58px] left-[24px] z-20">
          <h1 className="text-[30px] text-black" style={{ fontFamily: "'Baloo Tammudu 2', sans-serif" }}>
            {cityName}
          </h1>
          {/* <div className="flex items-center text-[12px] text-black mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{visitedLocations.length} visits (ahead of 30% of users)</span>
          </div> */}
        </div>

      {/* Right side buttons */}
      <div className="absolute top-[72px] right-[19px] z-20 flex flex-col items-end gap-3">
        {/* Wrapped button */}
        <button
          onClick={() => setShowWrapped(true)}
          className="bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] h-[36px] px-[12px] flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[12px] text-black">Wrapped</span>
        </button>

        {/* Share button */}
        <button className="bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] w-[36px] h-[36px] flex items-center justify-center">
          <Share2 className="w-4 h-4" />
        </button>

        {/* Filter button */}
        <button className="bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] w-[36px] h-[36px] flex items-center justify-center">
          <Filter className="w-4 h-4" />
        </button>

        {/* Location button */}
        <button className="bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] w-[36px] h-[36px] flex items-center justify-center">
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Restaurant Icons on Map */}
      <div className="absolute inset-0 z-10">
        {displayedLocations.map((location) => {
          if (!location.mapPosition) return null;
          const isQuestTarget = questTargetLocations.some(
            (q) => q.id === location.id,
          );

          return (
            <div
              key={location.id}
              className="absolute"
              style={{
                top: location.mapPosition.top,
                left: location.mapPosition.left,
              }}
            >
              <button
                onClick={() => setSelectedLocation(location.id)}
                className="relative"
              >
                {/* Breathing yellow rings for quest targets */}
                {isQuestTarget && (
                  <>
                    <div
                      className="absolute w-32 h-32 border-4 border-yellow-400 rounded-full pointer-events-none"
                      style={{
                        animation: 'breathe 2s ease-in-out infinite',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                    <div
                      className="absolute w-32 h-32 border-4 border-yellow-400 rounded-full pointer-events-none"
                      style={{
                        animation: 'breathe 2s ease-in-out infinite 1s',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </>
                )}

                {/* Restaurant Icon */}
                {location.type && (
                  <img
                    src={iconMap[location.type]}
                    alt={location.name}
                    className="w-[94px] h-[94px] object-cover relative z-10"
                  />
                )}

                {/* Visit count badge */}
                {location.visitCount && location.visitCount > 1 && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] w-[16px] h-[16px] flex items-center justify-center z-20">
                    <span className="text-[12px] text-black font-bold">
                      {location.visitCount}
                    </span>
                  </div>
                )}
              </button>

              {/* Restaurant name label */}
              <div className="absolute top-[-16px] left-1/2 transform -translate-x-1/2
                bg-white rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8]
                px-3 py-[3px] flex items-center justify-center whitespace-nowrap">
                <span className="text-[12px] text-black leading-[21px]">{location.name}</span>
              </div>
            </div>
          );
        })}

        {/* Current location indicator */}
        <div
          className="absolute"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative w-[24px] h-[24px]">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-[#009DE0] opacity-30" />
            {/* Inner dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#009DE0] border-2 border-white shadow-lg" />
          </div>
        </div>
      </div>

      {/* Bottom Sheet – just above the bottom of CityView area; nav is in App */}
      <div className="absolute left-0 right-0 bottom-0 z-20">
        <div
          className="bg-white rounded-t-[20px] shadow-[0px_-2px_8px_rgba(0,0,0,0.1)] mx-4"
          style={{ height: '150px' }}
        >
          {/* Handle */}
          <div className="w-[59px] h-[6px] bg-[#d9d9d9] rounded-full mx-auto mt-[5px]" />

          <div className="px-[18px] pt-4">
            {/* Active Quests Section */}
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === 'quests' ? null : 'quests',
                )
              }
              className="w-full bg-white opacity-20 rounded-[16px] shadow-[0px_2px_4px_1px_rgba(0,0,0,0.2)] h-[58px] relative"
            />
            <div
              className="absolute left-[18px] right-[18px] flex items-center justify-between h-[58px]"
              style={{ top: 'calc(5px + 16px + 12px)' }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={badgeIcon}
                  alt="Badge"
                  className="w-[39px] h-[39px] ml-[10px]"
                />
                <span className="text-[20px] text-black font-bold">
                  Active Quests ({activeQuests.length})
                </span>
              </div>
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === 'quests' ? null : 'quests',
                  )
                }
              >
                {expandedSection === 'quests' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Active Quests */}
      {expandedSection === 'quests' && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto pb-20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                Active Quests ({activeQuests.length})
              </h2>
              <button onClick={() => setExpandedSection(null)}>
                <ChevronUp className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {activeQuests.map((quest) => {
                return (
                  <div
                    key={quest.id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="mb-1 text-[#141414]">{quest.title}</h3>
                        <div className="text-xs text-[#009de0]">
                          🎁 {quest.reward}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {quest.progress}/{quest.total}
                      </div>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-[#009de0] rounded-full transition-all"
                        style={{
                          width: `${(quest.progress / quest.total) * 100}%`,
                        }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        setHighlightedQuestId(
                          highlightedQuestId === quest.id ? null : quest.id,
                        );
                        setExpandedSection(null);
                      }}
                      className={`w-full py-2 px-4 rounded-lg text-sm transition-colors ${
                        highlightedQuestId === quest.id
                          ? 'bg-[#009de0] text-white'
                          : 'bg-white text-[#009de0] border border-[#009de0]'
                      }`}
                    >
                      {highlightedQuestId === quest.id
                        ? 'Hide on Map'
                        : 'Show Qualified Places on Map'}
                    </button>
                  </div>
                );
              })}

              <button
                onClick={() => {
                  setExpandedSection(null);
                  setShowNewQuestModal(true);
                }}
                className="w-full bg-[#009de0] text-white py-4 rounded-xl flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Explore for New Quest</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Details Modal */}
      {selectedLocation && (
        <div
          className="fixed inset-0 bg-black/60 flex items-end z-50"
          onClick={() => setSelectedLocation(null)}
        >
          <div
            className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const location = foodLocations.find(
                (loc) => loc.id === selectedLocation,
              );
              if (!location) return null;

              return (
                <>
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 z-50" />

                  {location.visited && (
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-200">
                      <ImageWithFallback
                        src={`https://source.unsplash.com/800x600/?${location.photo}`}
                        alt={location.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2 z-50">
                      <h3 className="text-2xl text-[#141414]">
                        {location.name}
                      </h3>
                      {location.visitCount && (
                        <div className="bg-[#009de0] text-white px-3 py-1 rounded-full text-sm">
                          {location.visitCount} visits
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                      <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
                        <span className="capitalize">{location.type}</span>
                      </div>
                      {location.cuisine && (
                        <span className="bg-[#009de0] text-white px-2 py-1 rounded text-sm">
                          {location.cuisine}
                        </span>
                      )}
                      {location.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setOrderLocation(location);
                        setSelectedLocation(null);
                        setShowOrderConfirmation(true);
                      }}
                      className="flex-1 bg-[#009de0] text-white py-3 rounded-xl"
                    >
                      Order Now
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl flex items-center justify-center space-x-2">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* New Quest Modal */}
      {showNewQuestModal && (
        <NewQuestModal
          onClose={() => setShowNewQuestModal(false)}
          onAcceptQuest={(quest) => {
            console.log('Quest accepted:', quest);
            // In a real app, this would add the quest to activeQuests
          }}
        />
      )}

      {/* Order Confirmation Modal */}
      {showOrderConfirmation && orderLocation && (
        <OrderConfirmation
          restaurant={orderLocation}
          onClose={() => {
            setShowOrderConfirmation(false);
            setOrderLocation(null);
          }}
          onConfirmOrder={(orderDetails) => {
            console.log('Order confirmed:', orderDetails);
            // In a real app, this would mark location as visited and award coupons
            setShowOrderConfirmation(false);
            setOrderLocation(null);
          }}
        />
      )}

      {/* Wrapped Modal */}
      {showWrapped && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#009de0] to-[#141414] z-50 overflow-y-auto">
          <div className="min-h-screen p-6 flex flex-col">
            <button
              onClick={() => setShowWrapped(false)}
              className="self-end text-white mb-4 text-2xl"
            >
              ✕
            </button>

            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl mb-2 text-white">
                  Your {cityName}
                </h1>
                <p className="text-2xl text-gray-200">Food Wrapped 🐺</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl space-y-6">
                <div className="text-center">
                  <div className="text-7xl mb-2 text-[#141414]">
                    {wrappedStats.totalVisits}
                  </div>
                  <div className="text-xl text-gray-600">Places Explored</div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">
                    Your favorite spot
                  </div>
                  <div className="text-3xl mb-2 text-[#141414]">
                    {wrappedStats.topPlace?.name}
                  </div>
                  <div className="text-[#009de0]">
                    {wrappedStats.topPlace?.visitCount} visits
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-gray-50 rounded-xl p-4">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-[#009de0]" />
                    <div className="text-2xl mb-1 text-[#141414]">
                      {wrappedStats.totalPhotos}
                    </div>
                    <div className="text-xs text-gray-600">Food Photos</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-xl p-4">
                    <Award className="w-8 h-8 mx-auto mb-2 text-[#009de0]" />
                    <div className="text-2xl mb-1 text-[#141414]">8</div>
                    <div className="text-xs text-gray-600">Quests Done</div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-[#141414] py-4 rounded-xl flex items-center justify-center space-x-2 text-lg shadow-lg">
                <Share2 className="w-5 h-5" />
                <span>Share to Social Media</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}