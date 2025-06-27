
export interface FlightSearchParams {
  trip: "one_way" | "round_trip" | "multi_city";
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate: string;
  cabinClass: "economy" | "business" | "first" | "premium_economy";
  adults: number;
  children: number;
  infants: number;
  sortBy?: 'best' | 'price_high' | 'fastest' | 'outbound_take_off_time' | 'outbound_landing_time' | 'return_take_off_time' | 'return_landing_time';
  currency?: 'USD',
  market?: 'en-US',
  countryCode?: 'US'
}