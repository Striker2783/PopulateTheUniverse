import Decimal, { type DecimalSource } from "break_eternity.js";
import { Maxer } from "./maxer";
import { Observeable, Totaler } from "./utils";
import {
  Research,
  Researchs,
  sort_research_effects,
  type ResearchCosts,
  type ResearchEffects,
  type Unlocks,
} from "./research";

export type BuildNames = "farms" | "crude_homes";

export class Game {
  public humans = new Maxer();
  public land = new Maxer();
  public crude_homes = Totaler.Zero;
  public farms = Totaler.Zero;
  public research_points = Totaler.Zero;
  public researched: boolean[] = [];
  private researched_in_order: number[] = [];
  public unlocks: { [P in Unlocks]?: boolean } = {};
  private cost_mapped: { [P in ResearchCosts]: () => Observeable<Decimal> } = {
    humans: () => this.humans.v,
    research: () => this.research_points,
  };
  private build_mapped: { [P in BuildNames]: () => Observeable<Decimal> } = {
    crude_homes: () => this.crude_homes,
    farms: () => this.farms,
  };

  private last_update = Date.now();

  public constructor() {
    this.start_ticks();
  }

  public build(v: DecimalSource, n: BuildNames) {
    const building = this.build_mapped[n]();
    if (new Decimal(v).lessThan(0)) {
      v = new Decimal(v).abs();
      const max_remove = this.land.v.v.min(v).min(building.v);
      this.land.v = this.land.v.v.minus(max_remove);
      building.v = building.v.minus(max_remove);
    } else {
      const max_build = this.land.left.min(v);
      this.land.v = this.land.v.v.add(max_build);
      building.v = building.v.plus(max_build);
    }
  }

  private start_ticks() {
    setInterval(() => {
      const dt = ((Date.now() - this.last_update) / 1000) * 100;
      this.last_update = Date.now();

      this.humans.v = this.humans.v.v.add(this.human_rate.mul(dt));
      this.research_points.v = this.research_points.v.add(
        this.research_rate.mul(dt)
      );
      this.humans.m.v = this.human_max;
      this.land.m.v = this.land_max;
    });
  }

  public get human_max() {
    let total = Decimal.dTen.mul(this.land.left);
    total = total.plus(Decimal.dTen.mul(this.farms.v));
    total = this.calculate_research_effects(total, "max_humans");
    return total;
  }

  public get land_max() {
    let total = Decimal.dTen;
    total = this.calculate_research_effects(total, "land");
    return total;
  }

  private calculate_research_effects(total: Decimal, n: ResearchEffects) {
    for (const i of this.researched_in_order) {
      const researched = this.researched[i];
      if (!researched) continue;
      const research = Researchs[i];
      total = research.effect(total, game)[n] || total;
    }
    return total;
  }

  public get human_rate() {
    let total = Decimal.dOne.plus(this.humans.v.v.div(100));
    total = total.mul(Decimal.dOne.plus(this.farms.v.div(3)));
    total = this.calculate_research_effects(total, "humans");
    return total;
  }

  public get research_rate() {
    let total = this.humans.v.v.div(100);
    total = this.calculate_research_effects(total, "research");
    return total;
  }

  public can_afford(research: Research) {
    for (const [k, v] of Object.entries(research.cost)) {
      if (this.cost_mapped[k as ResearchCosts]().v.lessThan(v)) return false;
    }
    return true;
  }

  private no_check_buy(research: Research) {
    for (const [k, v] of Object.entries(research.cost)) {
      const current = this.cost_mapped[k as ResearchCosts]();
      current.v = current.v.minus(v);
    }
  }

  public research(i: number) {
    if (this.researched[i]) return;
    const research = Researchs[i];
    if (research === undefined) return;
    if (!this.can_afford(research)) return;
    this.no_check_buy(research);
    this.researched[i] = true;
    if (research.unlock) this.unlocks[research.unlock] = true;
    this.researched_in_order.push(i);
    this.researched_in_order.sort(sort_research_effects);
  }
}

export const game = new Game();
