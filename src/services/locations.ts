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

  const recommendations: Recommendation[] = (await recRes.json()).slice(0, 5);

  // 2. Fetch restaurant details for each dish
  // Example: nicely spread positions on the map (tune as you like)
  const PRESET_MAP_POSITIONS: { top: string; left: string }[] = [
      { top: '22%', left: '13%' },
      { top: '38%', left: '22%' },
      { top: '20%', left: '6%' },
      { top: '46%', left: '63%' },
      { top: '52%', left: '15%' },
      { top: '26%', left: '60%' },
      { top: '34%', left: '10%' },
      { top: '22%', left: '65%' },
      { top: '65%', left: '35%' },
      { top: '70%', left: '70%' },
  ];

  // Group recommendations by restaurant_id
    const recsByRestaurant = recommendations.reduce(
        (map, rec) => {
        const restaurantId = rec.dish.restaurant_id;
        if (!map.has(restaurantId)) {
            map.set(restaurantId, []);
        }
        map.get(restaurantId)!.push(rec);
        return map;
        },
        new Map<number, Recommendation[]>(),
    );
    
    // Fetch each restaurant once and build locations with dishes[]
    const locations: FoodLocation[] = await Promise.all(
        Array.from(recsByRestaurant.entries()).map(async ([restaurantId, recs]) => {
        const restRes = await fetch(`${API_BASE}/restaurants/${restaurantId}`);
        if (!restRes.ok) throw new Error("Failed to fetch restaurant");
    
        const restaurant: Restaurant = await restRes.json();
    
        const location: FoodLocation = {
            id: restaurant.id,
            name: restaurant.name,
            type: restaurant.type,
            lat: restaurant.lat,
            lng: restaurant.lon,
            photo: "./assets/placeholder.png",
            visited: false,
            tags: [],
            cuisine: undefined,
            visitCount: undefined,
            mapPosition: PRESET_MAP_POSITIONS[restaurant.id],
            dishes: recs.map((r) => r.dish.name),
        };
    
        return location;
        }),
    );
    console.log(locations);
    return locations;
}