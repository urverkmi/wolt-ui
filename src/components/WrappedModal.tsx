import { X } from 'lucide-react';
import svgPaths from '../imports/svg-wse56h9g1m';

interface WrappedModalProps {
  onClose: () => void;
  cityName: string;
  stats: {
    totalVisits: number;
    topPlace: {
      name: string;
      visitCount: number;
    } | null;
    questsCompleted: number;
    totalCoupons: number;
  };
}

export function WrappedModal({ onClose, cityName, stats }: WrappedModalProps) {
  const visitedPlaces = ['Starbucks', 'Ravintola Nepal', 'Nanan Grilli', 'Burger King', 'Cafe Fyyri'];
  
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto" style={{ fontFamily: "'Baloo Tammudu 2', sans-serif" }}>
      {/* Background Cards */}
      <div className="absolute left-1/2 top-[119px] -translate-x-1/2 w-[390px] h-[306px] bg-white opacity-20 rounded-[10px] border-2 border-[#d8d8d8]" />
      <div className="absolute left-1/2 top-[450px] -translate-x-1/2 w-[390px] h-[148px] bg-white opacity-20 rounded-[10px] border-2 border-[#d8d8d8]" />
      <div className="absolute left-1/2 top-[613px] -translate-x-1/2 w-[390px] h-[148px] bg-white opacity-20 rounded-[10px] border-2 border-[#d8d8d8]" />
      
      {/* Map Background */}
      <div className="absolute left-1/2 top-[119px] -translate-x-1/2 w-[325px] h-[185px] mix-blend-luminosity rounded-[10px] overflow-hidden">
        <div className="absolute inset-0 opacity-80">
          <img 
            alt="Map" 
            className="absolute left-0 top-0 w-full h-[149%] max-w-none object-cover" 
            src="maps.png" 
          />
        </div>
      </div>

      {/* Blue location dots on map */}
      <div className="absolute left-[120px] top-[185px] w-[7px] h-[7px]">
        <svg className="w-full h-full" fill="none" viewBox="0 0 23 23">
          <g filter="url(#filter0_d_62_769)">
            <circle cx="11.1357" cy="10.1965" fill="#009DE0" r="3.5" />
            <circle cx="11.1357" cy="10.1965" r="4.5" stroke="white" strokeWidth="2" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22.2715" id="filter0_d_62_769" width="22.2715" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="0.939291" />
              <feGaussianBlur stdDeviation="2.81787" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_62_769" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_62_769" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Location labels */}
      <div className="absolute left-[100px] top-[189px] bg-white h-[12px] rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] px-[6px] flex items-center">
        <span className="text-[8px] text-black">Starbucks</span>
      </div>
      <div className="absolute left-[190px] top-[183px] bg-white h-[13px] rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] px-[4px] flex items-center">
        <span className="text-[8px] text-black">Ravintola Nepal</span>
      </div>
      <div className="absolute left-[212px] top-[211px] bg-white h-[13px] rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] px-[5px] flex items-center">
        <span className="text-[8px] text-black">Nanan Grilli</span>
      </div>
      <div className="absolute left-[81px] top-[246px] bg-white h-[13px] rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] px-[5px] flex items-center">
        <span className="text-[8px] text-black">Burger King</span>
      </div>
      <div className="absolute left-[224px] top-[285px] bg-white h-[13px] rounded-full shadow-[0px_0px_0.5px_0.5px_#d8d8d8] px-[6px] flex items-center">
        <span className="text-[8px] text-black">Cafe Fyyri</span>
      </div>

      {/* Header */}
      <div className="absolute top-[58px] left-[24px]">
        <h1 className="text-[30px] text-black" style={{ fontFamily: "'Baloo Tammudu', sans-serif" }}>
          {cityName} Wrapped
        </h1>
      </div>

      {/* Back Button */}
      <button 
        onClick={onClose}
        className="absolute top-[70px] right-[43px] text-[16px] text-[#717275]"
      >
        Back
      </button>

      {/* Stats Text */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[355px] w-[281px] text-center">
        <p className="text-[16px] text-black">
          You've explored <span className="text-[20px]">{stats.totalVisits}</span> places in {cityName}
        </p>
        <p className="text-[16px] text-[#009de0] mt-2">
          Ahead of 30% of users!
        </p>
      </div>

      {/* Favorite Spot Section */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[459px] w-[281px] text-center">
        <p className="text-[16px] text-[#989898] mb-2">Your favorite Spot</p>
        
        {/* Restaurant Image */}
        <div className="flex flex-col items-center mb-2">
          <img 
            src="restaurant.png" 
            alt={stats.topPlace?.name} 
            className="w-[70px] h-[70px] object-cover"
          />
          <p className="text-[20px] text-black mt-2">{stats.topPlace?.name || 'Starbucks'}</p>
        </div>
        
        <p className="text-[16px] text-[#009de0]">{stats.topPlace?.visitCount || 3} visits</p>
      </div>

      {/* Quests Completed Section */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[623px] w-[281px] text-center">
        <p className="text-[16px] text-[#989898] mb-2">Quests Completed</p>
        
        {/* Badge */}
        <div className="flex flex-col items-center mb-2">
          <div className="relative w-[50px] h-[50px]">
            <img 
              src="badge.png" 
              alt="Quest badge" 
              className="w-full h-full object-cover"
            />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px] text-black">
              {stats.questsCompleted}
            </p>
          </div>
        </div>
        
        <p className="text-[16px] text-[#009de0]">
          You've won a total of €{stats.totalCoupons} in coupons!
        </p>
      </div>

      {/* Share Button */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[791px]">
        <button className="bg-[#029ddf] h-[33px] w-[99px] rounded-full flex items-center justify-center">
          <span className="text-[12px] text-white">Share</span>
        </button>
      </div>

      {/* Blue progress bar on right */}
      <div className="absolute right-[15px] top-[120px] w-[6px] h-[268px] bg-[#009de0] rounded-full" />

      {/* Bottom Navigation (same as main app) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white h-[84px] flex items-center justify-center px-[12px] pb-[20px] pt-[12px] gap-2">
        <div className="basis-0 flex flex-col gap-[6px] grow items-center">
          <svg className="w-[19.19px] h-[19.19px]" fill="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p13704880} fill="#717374" fillRule="evenodd" />
          </svg>
          <p className="text-[10px] text-[#717374]">Discovery</p>
        </div>
        <div className="basis-0 flex flex-col gap-[6px] grow items-center">
          <svg className="w-[19.19px] h-[19.19px]" fill="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p2f13ed00} fill="#717374" fillRule="evenodd" />
          </svg>
          <p className="text-[10px] text-[#717374]">Restaurants</p>
        </div>
        <div className="basis-0 flex flex-col gap-[6px] grow items-center">
          <svg className="w-[19.19px] h-[19.19px]" fill="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p2ff0c200} fill="#717275" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p1b388100} fill="#717275" fillRule="evenodd" />
            <path d={svgPaths.p9f86b00} fill="#717275" />
          </svg>
          <p className="text-[10px] text-[#717374]">Stores</p>
        </div>
        <div className="basis-0 flex flex-col gap-[6px] grow items-center">
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
            <path d={svgPaths.p273a4b80} fill="#009DE0" />
          </svg>
          <p className="text-[10px] text-[#009de0]">City</p>
        </div>
        <div className="basis-0 flex flex-col gap-[6px] grow items-center">
          <svg className="w-[19px] h-[19px]" fill="none" viewBox="0 0 19 19">
            <path clipRule="evenodd" d={svgPaths.pe145700} fill="#717374" fillRule="evenodd" />
          </svg>
          <p className="text-[10px] text-[#717374]">Profile</p>
        </div>
      </div>
    </div>
  );
}