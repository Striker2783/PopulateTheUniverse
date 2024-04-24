import type { DecimalSource } from "break_eternity.js";
import type { ResourceNames } from "./resources";

export type AutomatorNames = "human";

export type AutomatorData = {
  resources: { [key in ResourceNames]?: DecimalSource };
};

export const Automators: Record<AutomatorNames, AutomatorData> = {
  human: {
    resources: {
      food: 1,
      stone: 1,
      wood: 1,
      human: 0.1,
      "wooden spear": 0.5,
    },
  },
};
