import { API_BASE } from "../lib/api";
import { Recommendation, Restaurant, FoodLocation } from "../types";

export async function fetchFoodLocations(
  userId: number,
  lat: number,
  lon: number,
  radiusKm: number
): Promise<FoodLocation[]> {
  // 1. Fetch recommendations
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    radius_km: "5",
  });
  const recRes = await fetch(`${API_BASE}/users/${userId}/recommendations?${params}`);
  if (!recRes.ok) throw new Error("Failed to fetch recommendations");

  const recommendations: Recommendation[] = await recRes.json();

  // 2. Fetch restaurant details for each dish
  // Example: nicely spread positions on the map (tune as you like)
  const PRESET_MAP_POSITIONS: { top: string; left: string }[] = [
      { top: '22%', left: '13%' },
      { top: '30%', left: '22%' },
      { top: '48%', left: '65%' },
      { top: '46%', left: '28%' },
      { top: '52%', left: '55%' },
      { top: '26%', left: '75%' },
      { top: '34%', left: '10%' },
      { top: '44%', left: '85%' },
      { top: '58%', left: '35%' },
      { top: '60%', left: '70%' },
  ];
  const locations: FoodLocation[] = await Promise.all(
    recommendations.map(async (rec) => {
      const { dish, score } = rec;

      const restRes = await fetch(`${API_BASE}/restaurants/${dish.restaurant_id}`);
      if (!restRes.ok) throw new Error("Failed to fetch restaurant");

      const restaurant: Restaurant = await restRes.json();
  
      const location: FoodLocation = {
        id: restaurant.id,
        name: restaurant.name,
        type: "restaurant",
        lat: restaurant.lat,
        lng: restaurant.lon,
        photo: "./assets/placeholder.png",
        visited: false,
        tags: [],
        cuisine: undefined,
        visitCount: undefined,
        mapPosition: PRESET_MAP_POSITIONS[restaurant.id]
      };

      return location;
    })
  );

  const uniqueLocations = Array.from(
    new Map(locations.map(loc => [loc.id, loc])).values()
  );

  return uniqueLocations;
}