import type {Carrier} from "./carrier.ts";
import type {Origin} from "./origin.ts";
import type {Destination} from "./destination.ts";

export interface Leg {
  id: string;
  origin: Origin;
  destination: Destination;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  stopCount: number;
  carriers: Carrier;
}