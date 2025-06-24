export interface FlightSearchParams {
  trip: "one_way" | "round_trip" | "multi_city";
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: number | null;
  destinationEntityId: number | null;
  date: string | null;
  returnDate?: string;
  cabinClass: "economy" | "business" | "first" | "premium_economy";
  adults: number;
  children: number;
  infants: number;
}