import type {Marketing} from "./marketing.ts";

export interface Carrier {
  marketing: Marketing[]
  operationType: string
}