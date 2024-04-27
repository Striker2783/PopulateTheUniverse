import Decimal from "break_eternity.js";
import { Human } from "./humans";
import { Observeable, Totaler } from "./utils";
import {
  Research,
  Researchs,
  type ResearchCosts,
  type ResearchEffects,
} from "./research";

export class Game {
  public humans = new Human();
  public research_points = Totaler.Zero;
  public researched: boolean[] = [];
  private mapped: { [P in ResearchCosts]: () => Observeable<Decimal> } = {
    humans: () => this.humans.humans,
    research: () => this.research_points,
  };

  private last_update = Date.now();

  public get human_max() {
    let total = Decimal.dTen.pow(2);
    total = this.calculate_research_effects(total, "max_humans");
    return total;
  }

  private calculate_research_effects(total: Decimal, n: ResearchEffects) {
    for (let index = 0; index < this.researched.length; index++) {
      const researched = this.researched[index];
      if (!researched) continue;
      const research = Researchs[index];
      total = research.effect(total, game)[n] || total;
    }
    return total;
  }

  public get human_rate() {
    let total = Decimal.dOne.plus(this.humans.humans.v.div(100));
    total = this.calculate_research_effects(total, "humans");
    return total;
  }

  public get research_rate() {
    let total = this.humans.humans.v.div(100);
    total = this.calculate_research_effects(total, "research");
    return total;
  }

  private can_afford(research: Research) {
    for (const [k, v] of Object.entries(research.cost)) {
      if (this.mapped[k as ResearchCosts]().v.lessThan(v)) return false;
    }
    return true;
  }

  private no_check_buy(research: Research) {
    for (const [k, v] of Object.entries(research.cost)) {
      const current = this.mapped[k as ResearchCosts]();
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
  }

  public constructor() {
    setInterval(() => {
      const dt = (Date.now() - this.last_update) / 1000;
      this.last_update = Date.now();

      this.humans.humans = this.humans.humans.v.add(this.human_rate.mul(dt));
      this.research_points.v = this.research_points.v.add(
        this.research_rate.mul(dt)
      );
      this.humans.max.v = this.human_max;
    });
  }
}

export const game = new Game();
