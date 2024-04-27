import Decimal from "break_eternity.js";
import { Human } from "./humans";
import { Totaler } from "./utils";

export class Game {
  public humans = new Human();
  public research = Totaler.Zero;

  private last_update = Date.now();

  public get human_rate() {
    return Decimal.dOne.plus(this.humans.humans.v.div(100));
  }

  public get research_rate() {
    return this.humans.humans.v.div(100);
  }

  public constructor() {
    setInterval(() => {
      const dt = (Date.now() - this.last_update) / 1000;
      this.last_update = Date.now();

      this.humans.humans = this.humans.humans.v.add(this.human_rate.mul(dt));
      this.research.v = this.research.v.add(this.research_rate.mul(dt));
    });
  }
}

export const game = new Game();
