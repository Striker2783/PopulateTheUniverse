import type { DecimalSource } from "break_eternity.js";

export type ResourceCost = {
  [Key in ResourceNames]?: DecimalSource;
};

export type ResourceData = {
  cost?: ResourceCost;
  default_value?: DecimalSource;
};

export type ResourceNames = "wood" | "stone" | "food";

export const Resources: { [key in ResourceNames]: ResourceData } = {
  wood: {},
  stone: {},
  food: {
    default_value: 100,
  },
};
