export interface Dish {
    id: number;
    restaurant_id: number;
    name: string;
    description: string;
    ingredient_ids: number[];
  }

  export interface Recommendation {
    dish: Dish;
    score: number;
  }

  export interface Restaurant {
    id: number;
    name: string;
    lat: number;
    lon: number;
    type: string;
  }

  export interface FoodLocation {
    id: number;
    name: string;
    type: string;
    lat: number;
    lng: number;
    photo: string;
    visited: boolean;
    tags?: string[];
    cuisine?: string;
    visitCount?: number;
    mapPosition;
    dishes?: string[];
  }

  export interface Quest {
    id: number;
    title: string;
    progress?: number;
    total?: number;
    reward: string;
    targetLocations?: number[];
  }

  export type PlaceType = "restaurant" | "cafe" | "bar" | "store";
