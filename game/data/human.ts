import type { DecimalSource } from "break_eternity.js";
import type { ResourceNames } from "./resources";

const base_collection: { [P in ResourceNames]?: DecimalSource } = {
  food: 1,
  stone: 1,
  wood: 1,
};

export const HUMANS = {
  default: 5,
  cost: 10,
  consume: 0.5,
  base_max: 100,
  reproduction: 0.1,
  collection: base_collection,
};
