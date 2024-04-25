import type { DecimalSource } from "break_eternity.js";

export type ResourceCost = {
  [Key in ResourceNames]?: DecimalSource;
};

export type ResourceData = {
  cost?: ResourceCost;
  default_value?: DecimalSource;
};

export type ResourceNames =
  | "wood"
  | "stone"
  | "food"
  | "human"
  | "wooden spear";

export const Resources: { [key in ResourceNames]: ResourceData } = {
  wood: {},
  stone: {},
  food: {},
  human: {
    cost: {
      food: 10,
    },
  },
  "wooden spear": {
    cost: {
      wood: 10,
      stone: 10,
    },
  },
};
