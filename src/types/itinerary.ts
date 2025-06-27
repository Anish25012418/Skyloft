import type {Leg} from "./leg.ts";
import type {Price} from "./price.ts";

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
}