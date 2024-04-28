import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import type { Game } from "./game";

export type ResearchEffects = "humans" | "research" | "max_humans" | "land";
export type ResearchCosts = "humans" | "research";
export type Unlocks = "CrudeHouse" | "BasicAgriculture" | "ResearchFacility";

export type Effect = { [P in ResearchEffects]?: Decimal };
export type Cost = { [P in ResearchCosts]?: DecimalSource };

interface ResearchData {
  readonly cost: Cost;
  readonly name: string;
  readonly description: string;
  readonly effect: (v: Decimal, g: Game) => Effect;
  readonly unlock?: Unlocks;
  readonly effect_priority?: number;
}

export class Research implements ResearchData {
  public readonly cost: Cost;
  public readonly name: string;
  public readonly description: string;
  public readonly effect: (v: Decimal, g: Game) => Effect;
  public readonly unlock?: Unlocks;
  public readonly effect_priority?: number;

  public constructor(data: ResearchData) {
    this.cost = data.cost;
    this.name = data.name;
    this.description = data.description;
    this.effect = data.effect;
    this.unlock = data.unlock;
    this.effect_priority = data.effect_priority;
  }
  private uppercase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  public get cost_display() {
    let c = "";
    for (const [k, v] of Object.entries(this.cost)) {
      c += this.uppercase(k) + ": " + v;
    }
    return c.trimEnd();
  }
}

export const Researchs = [
  new Research({
    cost: { research: 100 },
    name: "Communication",
    description: "Humans Communicating!!! Wow!!!",
    effect: (v, g) => {
      return {
        max_humans: v.mul(2),
        research: v.mul(1.5),
      };
    },
  }),
  new Research({
    cost: { research: 200 },
    name: "Fire",
    description: "Lightning Goes BURRRR!",
    effect: (v, g) => {
      return {
        max_humans: v.mul(3),
        humans: v.mul(1.5),
      };
    },
  }),
  new Research({
    cost: { research: 1000 },
    name: "Crude Hut",
    description: "Weak Housing",
    effect: (v, g) => {
      return {
        max_humans: v.plus(g.crude_homes.v.mul(30)),
        humans: v.plus(g.crude_homes.v),
      };
    },
    unlock: "CrudeHouse",
    effect_priority: -1,
  }),
  new Research({
    cost: { research: 2500 },
    name: "Basic Agriculture",
    description: "Farming but everyone is an idiot",
    effect: (v, g) => {
      return {
        max_humans: v.plus(300).plus(Decimal.dTen.mul(g.farms.v)),
        humans: v.plus(10),
        research: v.plus(5),
      };
    },
    unlock: "BasicAgriculture",
    effect_priority: -1,
  }),
  new Research({
    cost: { research: 50000 },
    name: "Research Facility",
    description: "A facility to facilitate research",
    effect: (v, g) => {
      return {
        research: v.plus(g.research_facility.v.mul(10)),
      };
    },
    unlock: "ResearchFacility",
    effect_priority: -1,
  }),
];

export const sort_research_effects = (a: number, b: number): number => {
  return (
    (Researchs[a].effect_priority || 0) - (Researchs[b].effect_priority || 0)
  );
};
