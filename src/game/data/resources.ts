import type { DecimalSource } from "break_eternity.js";

export type ResourceCost = {
  [Key in ResourceNames]?: DecimalSource;
};

export type Resource = {
  cost?: ResourceCost;
  default_value?: DecimalSource;
  canIncrement?: boolean;
};

export type ResourceNames =
  | "wood"
  | "stone"
  | "food"
  | "human"
  | "wooden spear";

export const Resources: Record<ResourceNames, Resource> = {
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
