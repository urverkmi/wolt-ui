import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import svgPaths from "../imports/svg-ctym3pa70f";

type QuestType = "general" | "daytrip";

type GeneralQuest = {
  id: number;
  title: string;
  deadline: string;
  reward: string;
};

type DayTripRestaurant = {
  id: number;
  name: string;
  mealType: string;
  photos: string[];
};

type DayTripQuest = {
  id: number;
  deadline: string;
  reward: string;
  restaurants: DayTripRestaurant[];
};

interface NewQuestModalProps {
  onClose: () => void;
  onAcceptQuest: (quest: GeneralQuest | DayTripQuest) => void;
}

export function NewQuestModal({ onClose, onAcceptQuest }: NewQuestModalProps) {
  const [questType, setQuestType] = useState<QuestType>("general");

  const generalQuests: GeneralQuest[] = [
    {
      id: 1,
      title: "Visit 3 Pet-Friendly Cafes",
      deadline: "deadline on Nov 15, 25",
      reward: "€10 coupon",
    },
    {
      id: 2,
      title: "Visit 3 Pet-Friendly Cafes",
      deadline: "deadline on Nov 16, 25",
      reward: "€15 coupon",
    },
    {
      id: 3,
      title: "Visit 3 Pet-Friendly Cafes",
      deadline: "deadline on Nov 17, 25",
      reward: "€21 coupon",
    },
    {
      id: 4,
      title: "Visit 3 Pet-Friendly Cafes",
      deadline: "deadline on Nov 20, 25",
      reward: "€27 coupon",
    },
  ];

  const dayTripQuests: DayTripQuest[] = [
    {
      id: 5,
      deadline: "deadline on Nov 15, 25",
      reward: "€20 coupon",
      restaurants: [
        {
          id: 1,
          name: "Ninnes Cafe",
          mealType: "Breakfast",
          photos: [
            "coffee latte art",
            "cappuccino",
            "espresso",
            "croissant",
            "pancakes",
          ],
        },
        {
          id: 2,
          name: "Ravintola Nepal",
          mealType: "Lunch",
          photos: ["nepalese curry", "momo dumplings", "dal bhat", "naan"],
        },
        {
          id: 3,
          name: "Ravintola Lilla Sten",
          mealType: "Afternoon tea",
          photos: ["afternoon tea", "scones", "macarons", "dessert"],
        },
      ],
    },
  ];

  const currentQuests = questType === "general" ? generalQuests : dayTripQuests;

  return (
    <div
      className="absolute inset-0 bg-white z-50 overflow-hidden w-full h-full"
      style={{ fontFamily: "'Baloo Tammudu 2', sans-serif" }}
    >
      {/* MAP BACKGROUND */}
      <div className="absolute inset-0 mix-blend-luminosity pointer-events-none">
        <img
          src="maps.png"
          alt="Map"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
      </div>

      {/* HEADER TOP GRADIENT */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[145px] w-full"
        style={{
          background:
            "linear-gradient(180deg, #FAFAFA 17%, rgba(250,250,250,0) 70%)",
        }}
      />

      {/* CITY HEADER */}
      <div className="absolute left-[24px] top-[58px] z-20">
        <h1
          className="text-[30px] text-black"
          style={{ fontFamily: "'Baloo Tammudu', sans-serif" }}
        >
          Espoo
        </h1>
        <div className="mt-1 flex items-center text-[12px] text-black">
          <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 12 17">
            <path d={svgPaths.p2e671300} stroke="black" />
            <path d={svgPaths.pb022900} stroke="black" />
          </svg>
          <span>5 visits (ahead of 30% of users)</span>
        </div>
      </div>

      {/* WRAPPED BUTTON */}
      <div className="pointer-events-auto absolute right-[95px] top-[72px] z-20">
        <div className="flex h-[36px] items-center gap-2 rounded-full bg-white px-[12px] shadow-[0px_0px_0.5px_0.5px_#d8d8d8]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 17 16">
            <path
              d={svgPaths.p23a92b00}
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] text-black">Wrapped</span>
        </div>
      </div>

      {/* RIGHT FLOATING BUTTONS */}
      <div className="pointer-events-auto absolute right-[19px] top-[120px] z-20 flex flex-col gap-3">
        <button className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white shadow-[0px_0px_0.5px_0.5px_#d8d8d8]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 38 38">
            <path
              d={svgPaths.p21ba8600}
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white shadow-[0px_0px_0.5px_0.5px_#d8d8d8]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 38 38">
            <path
              d={svgPaths.p2f6a7de0}
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* BOTTOM SHEET */}
      <div className="absolute inset-x-0 bottom-0 top-[180px] z-30 flex flex-col rounded-t-[20px] bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
        {/* drag handle */}
        <div className="mx-auto mt-[5px] h-[6px] w-[59px] rounded-full bg-[#d9d9d9]" />

        {/* HEADER ROW */}
        <div className="flex items-center px-6 pt-4 pb-3">
          <button onClick={onClose} className="mr-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="flex-1 text-[20px] font-bold text-black">
            New Quests
          </h2>

          {/* TOGGLE: General / A Day Trip */}
          <div className="inline-flex h-[28px] items-center rounded-full bg-[#edf6fd] p-[2px]">
            <button
              onClick={() => setQuestType("general")}
              className={`flex h-full items-center justify-center rounded-full px-4 text-[12px] transition-colors ${
                questType === "general"
                  ? "bg-white text-[#009de0] shadow-sm"
                  : "text-[#009de0]"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setQuestType("daytrip")}
              className={`flex h-full items-center justify-center rounded-full px-4 text-[12px] transition-colors ${
                questType === "daytrip"
                  ? "bg-white text-[#009de0] shadow-sm"
                  : "text-[#009de0]"
              }`}
            >
              A Day Trip
            </button>
          </div>
        </div>

        {/* CONTENT AREA – same spacing/roundness vibe as Active Quests */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {/* GENERAL LIST */}
          {questType === "general" && (
            <div className="space-y-3">
              {generalQuests.map((q) => (
                <div
                  key={q.id}
                  className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
                >
                  {/* top row: deadline + reward */}
                  <div className="mb-3 flex items-start justify-between">
                    {/* deadline pill */}
                    <div className="flex items-center gap-2 rounded-full bg-[#edf6fd] px-3 py-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          d={svgPaths.p3f7b9ec0}
                          stroke="#009DE0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          d={svgPaths.p11785900}
                          stroke="#009DE0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span className="text-[12px] text-[#009de0]">
                        {q.deadline}
                      </span>
                    </div>

                    {/* reward */}
                    <div className="flex items-center gap-1 text-[#009de0]">
                      <span className="text-[16px]">🎁</span>
                      <span className="text-[16px] font-semibold">
                        {q.reward}
                      </span>
                    </div>
                  </div>

                  <p className="mb-2 text-[16px] text-[#141414]">{q.title}</p>

                  <button className="text-[12px] text-[#029ddf] underline">
                    Show Qualified Spots
                  </button>

                  {/* pill-shaped accept button */}
                  <button
                    onClick={() => {
                      onAcceptQuest(q);
                      onClose();
                    }}
                    className="mt-3 w-full h-[40px] rounded-full border border-[#009de0] bg-white text-sm font-medium text-[#009de0]"
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* DAY TRIP CARD */}
          {questType === "daytrip" && (
            <div className="space-y-3">
              {dayTripQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
                >
                  {/* deadline + reward */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-2 rounded-full bg-[#edf6fd] px-3 py-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          d={svgPaths.p3f7b9ec0}
                          stroke="#009DE0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          d={svgPaths.p11785900}
                          stroke="#009DE0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span className="text-[12px] text-[#009de0]">
                        {quest.deadline}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#009de0]">
                      <span className="text-[16px]">🎁</span>
                      <span className="text-[16px] font-semibold">
                        {quest.reward}
                      </span>
                    </div>
                  </div>

                  {/* vertical timeline */}
                  <div className="relative">
                    {/* vertical line */}
                    <div className="absolute left-[10px] top-[30px] bottom-[10px] w-[2px] bg-[#d8e8f7]" />

                    <div className="space-y-6">
                      {quest.restaurants.map((r, idx) => (
                        <div key={r.id} className="flex gap-4">
                          {/* dot + meal tag */}
                          <div className="flex flex-col items-center gap-2">
                            {/* small dashed circle */}
                            <div className="h-5 w-5 rounded-full border-2 border-dashed border-[#009DE0] bg-white" />

                            {/* meal label */}
                            <div className="flex h-[18px] items-center rounded-[4px] bg-[#009de0] px-[6px]">
                              <span className="text-[10px] text-white">{r.mealType}</span>
                            </div>
                          </div>

                          {/* restaurant content */}
                          <div className="flex-1">
                            <div className="mb-2 flex items-start justify-between">
                              <h3 className="text-[16px] text-black">
                                {r.name}
                              </h3>
                              <button className="ml-2 whitespace-nowrap text-[10px] text-[#029ddf] underline">
                                Show On Map
                              </button>
                            </div>

                            <div className="flex h-[49px] items-center gap-2 rounded-[6px] bg-[#edf6fd] px-2">
                              {r.photos.map((p, i) => (
                                <div
                                  key={i}
                                  className="h-[35px] w-[35px] flex-shrink-0 overflow-hidden rounded-[6px]"
                                >
                                  <ImageWithFallback
                                    src={`https://source.unsplash.com/200x200/?${encodeURIComponent(
                                      p
                                    )}`}
                                    alt={p}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>

                            {idx === quest.restaurants.length - 1 && (
                              <div className="h-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* bottom row: Refresh + pill Accept */}
                  <div className="mt-4 flex items-center justify-between">
                    <button className="flex items-center gap-2 text-[#009de0]">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 17 20"
                      >
                        <path
                          d={svgPaths.p2af8e060}
                          stroke="#009DE0"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        />
                        <path
                          d={svgPaths.p261f5580}
                          stroke="#009DE0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <span className="text-[14px]">Refresh</span>
                    </button>

                    <button
                      onClick={() => {
                        onAcceptQuest(quest);
                        onClose();
                      }}
                      className="ml-4 flex h-[40px] flex-1 items-center justify-center rounded-full bg-[#009de0] text-[14px] font-medium text-white"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
