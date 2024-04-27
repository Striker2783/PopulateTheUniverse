import type Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import type { Game } from "./game";

export type ResearchEffects = "humans" | "research" | "max_humans";
export type ResearchCosts = "humans" | "research";

export type Effect = { [P in ResearchEffects]?: Decimal };
export type Cost = { [P in ResearchCosts]?: DecimalSource };

export class Research {
  public constructor(
    public readonly cost: Cost,
    public readonly name: string,
    public readonly description: string,
    public readonly effect: (v: Decimal, g: Game) => Effect
  ) {}
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
  new Research(
    { research: 100 },
    "Communication",
    "Humans Communicating!!! Wow!!!",
    (v, g) => {
      return {
        max_humans: v.mul(2),
        research: v.mul(1.5),
      };
    }
  ),
  new Research({ research: 200 }, "Fire", "Lightning Goes BURRRR!", (v, g) => {
    return {
      max_humans: v.mul(3),
      humans: v.mul(1.5),
    };
  }),
  new Research({ research: 1000 }, "Crude Hut", "Weak Housing", (v, g) => {
    return {
      max_humans: v.mul(5),
      humans: v.mul(1.5),
    };
  }),
  new Research(
    { research: 1e4 },
    "Basic Agriculture",
    "Farming but everyone is an idiot",
    (v, g) => {
      return {
        max_humans: v.mul(1.5),
        humans: v.mul(1.2),
        research: v.mul(1.3),
      };
    }
  ),
];
